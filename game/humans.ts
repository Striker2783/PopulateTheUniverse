import Decimal from "break_eternity.js";
import { Observeable, Totaler } from "./utils";

export class Human {
  private readonly _humans = Totaler.Zero;

  private readonly _max = new Observeable(Decimal.dTen.pow(2));

  public get max(): Observeable<Decimal> {
    return this._max;
  }

  public set max(v: Decimal) {
    this.max.v = v;
    this.humans = this.humans.v.min(this.max.v);
  }

  public get humans(): Totaler {
    return this._humans;
  }

  public set humans(v: Decimal) {
    this.humans.v = v.min(this.max.v);
  }
}
