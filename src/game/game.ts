import { Observer, Totaller } from "@/utils/values";
import Decimal from "break_eternity.js";

export class Game {
  private readonly _food: Totaller = new Totaller(Decimal.dZero);
  private readonly _humans: Observer<Decimal> = new Observer(new Decimal(0));

  public increment_food() {
    this.food = this.food.value.plus(1);
  }

  public get humans(): Observer<Decimal> {
    return this._humans;
  }

  public set humans(v: Decimal) {
    this._humans.value = v;
  }

  public set food(v: Decimal) {
    this._food.value = v;
  }

  public get food(): Totaller {
    return this._food;
  }

  public increment_humans() {
    if (this.food.value.lessThanOrEqualTo(10)) return;
    this.humans = this.humans.value.plus(1);
    this.food = this.food.value.minus(1);
  }
}

export default new Game();
