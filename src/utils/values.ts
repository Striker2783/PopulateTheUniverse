import Decimal from "break_eternity.js";
import { ref, type Ref, type UnwrapRef } from "vue";

type Listener<T> = (a: T) => void;

export class Observer<T> {
  protected _value: Ref<UnwrapRef<T>>;

  public constructor(value: T) {
    this._value = ref(value);
  }

  public get value(): UnwrapRef<T> {
    return this._value.value;
  }

  public set value(v: T) {
    this._value.value = v as UnwrapRef<T>;
  }
}

export class Totaller extends Observer<Decimal> {
  private _total = new Observer(Decimal.dZero);
  public constructor(v: Decimal) {
    super(v);
    this._total = new Observer(v);
  }
  public set value(v: Decimal) {
    if (v.greaterThan(this.value))
      this._total.value = this._total.value.add(v.minus(this.value));
    super.value = v;
  }
  public get value() {
    return this._value.value;
  }
  public get total() {
    return this._total;
  }
}

export class Rater extends Totaller {
  private _max_changes = 5;
  private values: Array<{ t: number; n: Decimal }> = [];
  private _rate = new Observer(Decimal.dZero);

  public tick() {
    if (this.values.length >= this._max_changes) this.values.shift();
    this.values.push({ t: Date.now(), n: this.value });
    this.update_rate();
  }

  private update_rate() {
    if (this.values.length <= 1) {
      this.rate.value = Decimal.dZero;
      return;
    }
    const sum_rates = this.values
      .slice(0, -1)
      .map((curr, index) => {
        const next = this.values[index + 1];
        const diff_time = (next.t - curr.t) / 1000;
        const diff_num = next.n.minus(curr.n);
        const rate = diff_num.div(diff_time);
        return rate;
      })
      .reduce((acc, c) => acc.plus(c), Decimal.dZero);
    this.rate.value = sum_rates.div(this.values.length - 1);
  }

  public get rate() {
    return this._rate;
  }

  public set max_changes(v: number) {
    this._max_changes = v;
  }
}
