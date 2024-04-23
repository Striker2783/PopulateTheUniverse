import { Rater } from "@/utils/values";
import Decimal from "break_eternity.js";
import {
  Resources,
  type ResourceData,
  type ResourceNames,
} from "./data/resources";
import { Resource } from "./classes/resource";

export class Game {
  // #region Properties (1)

  private readonly _resources: Map<ResourceNames, Resource>;

  // #endregion Properties (1)

  // #region Constructors (1)

  public constructor() {
    this._resources = new Map();
    for (const [key, resource] of Object.entries(Resources)) {
      this._resources.set(key as ResourceNames, new Resource(resource));
    }
    setInterval(() => this.tick(), 1000);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (1)

  public get resources() {
    return this._resources;
  }

  // #endregion Public Getters And Setters (1)

  // #region Public Methods (1)

  public increment(resource_name: ResourceNames) {
    const resource_data = Resources[resource_name];
    const resource = this.resources.get(resource_name)!;

    if (resource_data.increment !== undefined && !resource_data.increment.can)
      return;
    if (resource.onDelay.value) return;

    const delay =
      resource_data.increment === undefined
        ? 1
        : resource_data.increment!.delay || 1;
    const cost = resource_data.cost;
    if (cost === undefined) {
      resource.value = resource.value.plus(1);
    } else {
      for (const [key, value] of Object.entries(cost!)) {
        if (this.resources.get(key as ResourceNames)!.value.lessThan(value))
          return;
      }
      for (const [key, value] of Object.entries(cost!)) {
        const needed_resource = this.resources.get(key as ResourceNames)!;
        needed_resource.value = needed_resource.value.minus(value);
      }
      resource.value = resource.value.add(1);
    }

    if (delay == 0) return;
    resource.onDelay.value = true;
    setTimeout(() => {
      resource.onDelay.value = false;
    }, delay * 1000);
  }

  // #endregion Public Methods (1)

  // #region Private Methods (1)

  private tick() {
    this._resources.forEach((field) => {
      field.tick();
    });
  }

  // #endregion Private Methods (1)
}

export default new Game();
