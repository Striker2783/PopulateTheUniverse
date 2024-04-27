import Decimal from "break_eternity.js";
import { Observeable, Totaler } from "./utils";

export class Human {
  private readonly _humans = new Totaler(Decimal.dZero);

  public readonly max = new Observeable(Decimal.dTen.pow(1000));

  public get humans(): Totaler {
    return this._humans;
  }

  public get human_count() {
    return this.humans.v.value;
  }

  public set humans(v: Decimal) {
    if (v.greaterThan(this.max.v.value)) return;
    this.humans.v = v;
  }
}
