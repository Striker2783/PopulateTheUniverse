import Decimal from "break_eternity.js";
import { Human } from "./humans";

export class Game {
  public humans = new Human();

  private last_update = Date.now();

  private get human_base() {
    return Decimal.dOne.plus(this.humans.human_count.div(100));
  }

  public get human_rate() {
    return this.human_base;
  }

  public constructor() {
    setInterval(() => {
      const dt = (Date.now() - this.last_update) / 1000;
      this.last_update = Date.now();

      this.humans.humans = this.humans.humans.v.value.add(
        this.human_base.mul(dt)
      );
    });
  }
}

export const game = new Game();
