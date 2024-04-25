import { Observer, Rater, Totaller } from "game/utils/values";
import { Resource } from "./resource";
import Decimal, { type DecimalSource } from "break_eternity.js";
import { HUMANS } from "game/data/human";

export class Humans {
  // #region Properties (3)

  private readonly _assigned: Observer<Decimal>;
  private readonly _current: Rater;
  private readonly _max: Observer<Decimal>;

  // #endregion Properties (3)

  // #region Constructors (1)

  public constructor() {
    this._max = new Observer(new Decimal(HUMANS.base_max));
    this._current = new Rater(new Decimal(HUMANS.default));
    this._assigned = new Observer(Decimal.dZero);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (4)

  public get assigned(): Observer<Decimal> {
    return this._assigned;
  }

  public get current(): Rater {
    return this._current;
  }

  public get max_humans(): Observer<Decimal> {
    return this._max;
  }

  public set max_humans(v: Decimal) {
    this._max.value = v;
  }

  // #endregion Public Getters And Setters (4)

  // #region Protected Getters And Setters (2)

  protected set assigned(v: Decimal) {
    this._assigned.value = v;
  }

  protected set current(v: Decimal) {
    this._current.value = v;
  }

  // #endregion Protected Getters And Setters (2)

  // #region Protected Methods (1)

  /**
   *
   * @param n Max
   * @returns Humans actually assigned
   */
  protected add_assigned(n: DecimalSource = 1) {
    if (new Decimal(n).lessThan(1)) throw new Error();
    const max_assign = this.current.value.minus(this.assigned.value).min(n);
    this.assigned = this.assigned.value.plus(max_assign);
    return max_assign;
  }

  // #endregion Protected Methods (1)
}
