import { Rater } from "@/utils/values";
import Decimal from "break_eternity.js";

export class Game {
  // #region Properties (4)

  private readonly _food: Rater = new Rater(Decimal.dZero);
  private readonly _humans: Rater = new Rater(Decimal.dZero);
  private readonly _stone = new Rater(Decimal.dZero);
  private readonly _wood = new Rater(Decimal.dZero);

  /**
   * Things to call tick()
   */
  private readonly raters = [this._food, this._humans, this._stone, this._wood];

  // #endregion Properties (4)

  // #region Constructors (1)

  public constructor() {
    setInterval(() => this.tick(), 1000);
  }

  // #endregion Constructors (1)

  // #region Public Getters And Setters (8)

  public get food(): Rater {
    return this._food;
  }

  public set food(v: Decimal) {
    this._food.value = v;
  }

  public get humans(): Rater {
    return this._humans;
  }

  public set humans(v: Decimal) {
    this._humans.value = v;
  }

  public get stone(): Rater {
    return this._stone;
  }

  public set stone(v: Decimal) {
    this.stone.value = v;
  }

  public get wood(): Rater {
    return this._wood;
  }

  public set wood(v: Decimal) {
    this._wood.value = v;
  }

  // #endregion Public Getters And Setters (8)

  // #region Public Methods (2)

  public increment_food() {
    this.food = this.food.value.plus(1);
  }

  public increment_humans() {
    if (this.food.value.lessThanOrEqualTo(10)) return;
    this.humans = this.humans.value.plus(1);
    this.food = this.food.value.minus(1);
  }

  public increment_wood() {
    this.wood = this.wood.value.plus(1);
  }

  public increment_stone() {
    this.stone = this.stone.value.plus(1);
  }

  // #endregion Public Methods (2)

  // #region Private Methods (1)

  private tick() {
    this.raters.forEach((field) => {
      field.tick();
    });
  }

  // #endregion Private Methods (1)
}

export default new Game();
