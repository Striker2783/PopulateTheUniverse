import { Rater } from "@/utils/values";
import Decimal from "break_eternity.js";
import { Resources, type Resource, type ResourceNames } from "./data/resources";

export class Game {
  // #region Properties (4)
  private readonly _resources: Map<ResourceNames, Rater>;

  private readonly _humans: Rater = new Rater(Decimal.dZero);

  // #endregion Properties (4)

  // #region Constructors (1)

  public constructor() {
    this._resources = new Map();
    for (const [key, resource] of Object.entries(Resources)) {
      this._resources.set(
        key as ResourceNames,
        new Rater(new Decimal(resource.default_value || 0))
      );
    }
    setInterval(() => this.tick(), 1000);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (8)

  public get humans(): Rater {
    return this._humans;
  }

  public set humans(v: Decimal) {
    this._humans.value = v;
  }

  public get resources() {
    return this._resources;
  }

  // #endregion Public Getters And Setters (8)

  // #region Public Methods (2)
  public increment(resource_name: ResourceNames) {
    const resource_data = Resources[resource_name];
    const resource = this.resources.get(resource_name)!;
    const cost = resource_data.cost;
    if (cost === undefined) {
      resource.value = resource.value.plus(1);
      return;
    }
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

  public increment_humans() {
    const food = this.resources.get("food")!;
    if (food.value.lessThanOrEqualTo(10)) return;
    this.humans = this.humans.value.plus(1);
    food.value = food.value.minus(1);
  }

  // #endregion Public Methods (2)

  // #region Private Methods (1)

  private tick() {
    this._resources.forEach((field) => {
      field.tick();
    });
  }

  // #endregion Private Methods (1)
}

export default new Game();
