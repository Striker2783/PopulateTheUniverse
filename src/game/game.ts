import { Rater } from "@/utils/values";
import Decimal from "break_eternity.js";
import {
  Resources,
  type ResourceCost,
  type ResourceData,
  type ResourceNames,
} from "./data/resources";
import { Resource } from "./classes/resource";

export class Game {
  // #region Properties (2)

  private readonly _resources: Map<ResourceNames, Resource>;

  private current_gathering?: { name: ResourceNames; interval_id: number };

  // #endregion Properties (2)

  // #region Constructors (1)

  public constructor() {
    this._resources = new Map();
    for (const [key, resource] of Object.entries(Resources)) {
      this._resources.set(key as ResourceNames, new Resource(resource));
    }
    setInterval(() => {
      this.tick();
    }, 1000);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get resources() {
    return this._resources;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (1)

  public start_increment(resource_name: ResourceNames) {
    const resource = this.resources.get(resource_name)!;
    if (!resource.can_increment) return;

    if (this.current_gathering) {
      clearInterval(this.current_gathering.interval_id);
      this.current_gathering = undefined;
    }
    const interval = setInterval(() => {
      this.get_resource(resource_name);
    }, this.resources.get(resource_name)!.delay * 1000);
    this.current_gathering = {
      interval_id: interval,
      name: resource_name,
    };
  }

  // #endregion Public Methods (1)

  // #region Private Methods (2)

  private can_afford(amount: number, resource: Resource) {
    const cost = resource.cost;
    for (const [key, value] of Object.entries(cost)) {
      const resource = this.resources.get(key as ResourceNames)!;
      // Can afford single resource
      if (resource.value.div(amount).lessThan(value)) return false;
    }
    return true;
  }

  private no_check_buy_resource(resource: Resource, amount: number) {
    const cost = resource.cost;

    for (const [key, value] of Object.entries(cost)) {
      const needed_resource = this.resources.get(key as ResourceNames)!;
      needed_resource.value = needed_resource.value.minus(
        new Decimal(value).times(amount)
      );
    }
    resource.value = resource.value.add(amount);
  }

  private get_resource(resource_name: ResourceNames, amount: number = 1) {
    const resource = this.resources.get(resource_name)!;

    if (!this.can_afford(amount, resource)) return;
    this.no_check_buy_resource(resource, amount);
    resource.value = resource.value.add(amount);
  }

  private tick() {
    this._resources.forEach((field) => {
      field.tick();
    });
  }

  // #endregion Private Methods (2)
}

export default new Game();
