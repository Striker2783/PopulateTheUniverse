import { Observer, Rater, Totaller } from "@/utils/values";
import Decimal from "break_eternity.js";

export class Game {
  private readonly _food: Rater = new Rater(Decimal.dZero);
  private readonly _humans: Rater = new Rater(Decimal.dZero);

  public constructor() {
    setInterval(() => this.tick(), 1000);
  }

  private tick() {
    this.food.tick();
    this.humans.tick();
  }

  public increment_food() {
    this.food = this.food.value.plus(1);
  }

  public get humans(): Rater {
    return this._humans;
  }

  public set humans(v: Decimal) {
    this._humans.value = v;
  }

  public set food(v: Decimal) {
    this._food.value = v;
  }

  public get food(): Rater {
    return this._food;
  }

  public increment_humans() {
    if (this.food.value.lessThanOrEqualTo(10)) return;
    this.humans = this.humans.value.plus(1);
    this.food = this.food.value.minus(1);
  }
}

export default new Game();
