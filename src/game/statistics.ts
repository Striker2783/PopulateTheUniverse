import { Observer } from "@/utils/values";
import Decimal from "break_eternity.js";

export class Statistics {
  private readonly _total_food: Observer<Decimal> = new Observer(Decimal.dZero);
  public get total_food(): Observer<Decimal> {
    return this._total_food;
  }

  public set total_food(v: Decimal) {
    this._total_food.value = v;
  }

  public add_total_food(v: Decimal) {
    this.total_food.value = this.total_food.value.plus(v);
  }
}
