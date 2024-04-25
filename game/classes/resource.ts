import { Observer, Rater } from "game/utils/values";
import type { ResourceData, ResourceNames } from "../data/resources";
import Decimal, { type DecimalSource } from "break_eternity.js";

export class Resource extends Rater {
  // #region Properties (3)

  private readonly data;

  private _assigned_humans;

  public readonly name;

  // #endregion Properties (3)

  // #region Constructors (1)

  public constructor(resource_data: ResourceData, name: ResourceNames) {
    super(new Decimal(resource_data.default_value || 0));
    this.data = resource_data;
    this.name = name;
    this._assigned_humans = new Observer<Decimal>(Decimal.dZero);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (3)

  public get assigned_humans(): Observer<Decimal> {
    return this._assigned_humans;
  }

  public set assigned_humans(v: Decimal) {
    this._assigned_humans.value = v;
  }

  public get cost() {
    return this.data.cost || {};
  }

  // #endregion Public Getters And Setters (3)
}
