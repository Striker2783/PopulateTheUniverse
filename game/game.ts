import Decimal, { type DecimalSource } from "break_eternity.js";
import { Resources, type ResourceNames } from "./data/resources";
import { Resource } from "./classes/resource";
import { Humans } from "./classes/humans";

export class Game {
  // #region Properties (2)

  private readonly _humans: Humans;
  private readonly _resources: Map<ResourceNames, Resource> = new Map();

  // #endregion Properties (2)

  // #region Constructors (1)

  public constructor() {
    this._resources = new Map();
    this._humans = new Humans();
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
      this.resources.forEach((resource) => {
        if (!this.can_afford(resource)) {
          resource.reset_progress();
          return;
        }
        resource.add_progress(resource.assigned_humans.value.mul(dt));
        this.no_check_buy_resource(resource, 1);
      });
    }, 50);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (2)

  public get humans(): Humans {
    return this._humans;
  }

  public get resources() {
    return this._resources;
  }

  // #endregion Public Getters And Setters (2)

  // #region Public Methods (1)

  public add_humans(resource_name: ResourceNames, amount: DecimalSource = 1) {
    const resource = this.resources.get(resource_name)!;
    this.humans.assign_resource(resource, amount);
  }

  // #endregion Public Methods (1)

  // #region Private Methods (4)

  private can_afford(resource: Resource, amount: DecimalSource = 1) {
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
    resource.add_resource(amount);
  }

  private tick() {
    this._resources.forEach((field) => {
      field.tick();
    });
  }

  // #endregion Private Methods (4)
}

export default new Game();
