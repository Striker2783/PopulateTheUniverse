import { Observer } from "@/utils/values";
import Decimal from "break_eternity.js";

export class Game {
  private _food: Observer<Decimal> = new Observer(new Decimal(0));

  public increment() {
    this._food.value = new Decimal(this._food.value.plus(1));
  }

  public get food(): Decimal {
    return this._food.value;
  }

  public get food_observer(): Observer<Decimal> {
    return this._food;
  }
}

export default new Game();
