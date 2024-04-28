import Decimal from "break_eternity.js";
import { Observeable, Totaler } from "./utils";

export class Maxer {
  private readonly _value = Totaler.Zero;

  private readonly _max = new Observeable(Decimal.dTen.pow(2));

  public get m(): Observeable<Decimal> {
    return this._max;
  }

  public set m(v: Decimal) {
    this.m.v = v;
    this.v = this.v.v.min(this.m.v);
  }

  public get v(): Totaler {
    return this._value;
  }

  public set v(v: Decimal) {
    this.v.v = v.min(this.m.v);
  }

  public get left() {
    return this.m.v.minus(this.v.v);
  }
}
