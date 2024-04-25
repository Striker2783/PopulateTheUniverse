import { Observer, Rater } from "game/utils/values";
import type { ResourceData, ResourceNames } from "../data/resources";
import Decimal, { type DecimalSource } from "break_eternity.js";
import { HUMANS } from "game/data/human";

export class Resource extends Rater {
  // #region Properties (4)

  private readonly data;

  private _assigned_humans;
  private _progress = Decimal.dZero;

  public readonly name;

  // #endregion Properties (4)

  // #region Constructors (1)

  public constructor(resource_data: ResourceData, name: ResourceNames) {
    super(new Decimal(resource_data.default_value || 0));
    this.data = resource_data;
    this.name = name;
    this._assigned_humans = new Observer<Decimal>(Decimal.dZero);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (5)

  public get assigned_humans(): Observer<Decimal> {
    return this._assigned_humans;
  }

  public set assigned_humans(v: Decimal) {
    this._assigned_humans.value = v;
  }

  public get cost() {
    return this.data.cost || {};
  }

  public get progress() {
    return this._progress;
  }

  public set progress(value) {
    this._progress = value;
  }

  // #endregion Public Getters And Setters (5)

  // #region Public Methods (2)

  public add_progress(prog: Decimal) {
    this.progress = this.progress.plus(prog);
  }

  public add_resource(max: DecimalSource) {
    if (this.progress.lessThan(1)) return;
    this.value = this.value.plus(this.progress.floor().min(max));
    this.progress = this.progress.mod(1);
  }

  public reset_progress() {
    this.progress = Decimal.dZero;
  }

  // #endregion Public Methods (2)
}
