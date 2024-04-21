import { Observer } from "@/utils/values";
import Decimal from "break_eternity.js";
import { Statistics } from "./statistics";

export class Game {
  private readonly _food: Observer<Decimal> = new Observer(new Decimal(0));
  private readonly _humans: Observer<Decimal> = new Observer(new Decimal(0));

  public readonly statistics: Statistics = new Statistics();

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
    if (v.greaterThan(this._food.value))
      this.statistics.add_total_food(v.minus(this._food.value));
    this._food.value = v;
  }

  public get food(): Observer<Decimal> {
    return this._food;
  }

  public increment_humans() {
    if (this.food.value.lessThanOrEqualTo(10)) return;
    this.humans = this.humans.value.plus(1);
    this.food = this.food.value.minus(1);
  }
}

export default new Game();
