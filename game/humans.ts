import Decimal from "break_eternity.js";
import { Observeable, Totaler } from "./utils";

export class Human {
  private readonly _humans = Totaler.Zero;

  public readonly max = new Observeable(Decimal.dTen.pow(1000));

  public get humans(): Totaler {
    return this._humans;
  }

  public set humans(v: Decimal) {
    if (v.greaterThan(this.max.v)) return;
    this.humans.v = v;
  }
}
