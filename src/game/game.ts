import { Rater } from "@/utils/values";
import Decimal, { type DecimalSource } from "break_eternity.js";
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

  private current_gathering?: Resource;

  // #endregion Properties (2)

  // #region Constructors (1)

  public constructor() {
    this._resources = new Map();
    for (const [key, resource] of Object.entries(Resources)) {
      this._resources.set(
        key as ResourceNames,
        new Resource(resource, key as ResourceNames)
      );
    }
    setInterval(() => {
      this.tick();
    }, 1000);
    let last_update = Date.now();
    setInterval(() => {
      const dt = (Date.now() - last_update) / 1000;
      last_update = Date.now();
      this.resources.forEach((element) => {
        // element.value = element.value.plus(element.base_automate.mul(dt));
      });
      if (this.current_gathering) {
        this.buy_resource(
          this.current_gathering,
          Decimal.mul(this.current_gathering.increment, dt)
        );
      }
    }, 50);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get resources() {
    return this._resources;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (1)

  public add_humans(resource_name: ResourceNames, amount: DecimalSource = 1) {
    const resource = this.resources.get(resource_name)!;
  }

  public start_increment(resource_name: ResourceNames) {
    const resource = this.resources.get(resource_name)!;
    if (!resource.can_increment) return;

    this.current_gathering = resource;
  }

  // #endregion Public Methods (1)

  // #region Private Methods (2)

  private can_afford(amount: DecimalSource, resource: Resource) {
    const cost = resource.cost;
    for (const [key, value] of Object.entries(cost)) {
      const resource = this.resources.get(key as ResourceNames)!;
      // Can afford single resource
      if (resource.value.div(amount).lessThan(value)) return false;
    }
    return true;
  }

  private no_check_buy_resource(resource: Resource, amount: DecimalSource) {
    const cost = resource.cost;

    for (const [key, value] of Object.entries(cost)) {
      const needed_resource = this.resources.get(key as ResourceNames)!;
      needed_resource.value = needed_resource.value.minus(
        new Decimal(value).times(amount)
      );
    }
    resource.value = resource.value.add(amount);
  }

  private buy_resource(resource: Resource, amount: DecimalSource = 1) {
    if (!this.can_afford(amount, resource)) return;
    this.no_check_buy_resource(resource, amount);
  }

  private tick() {
    this._resources.forEach((field) => {
      field.tick();
    });
  }

  // #endregion Private Methods (2)
}

export default new Game();
