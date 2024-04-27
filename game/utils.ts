import Decimal from "break_eternity.js";
import { ref, type Ref, type UnwrapRef } from "vue";

export class Observeable<T> {
  private readonly _v: Ref<UnwrapRef<T>>;

  public constructor(v: T) {
    this._v = ref(v);
  }

  public get r(): Ref<UnwrapRef<T>> {
    return this._v;
  }

  public set v(v: T) {
    this._v.value = v as UnwrapRef<T>;
  }

  public get v(): T {
    return this._v.value as T;
  }
}

export class Totaler extends Observeable<Decimal> {
  private readonly _t: Ref<Decimal>;

  public static get Zero() {
    return new Totaler(Decimal.dZero);
  }

  public constructor(v: Decimal) {
    super(v);
    this._t = ref(v);
  }

  public get t(): Ref<Decimal> {
    return this._t;
  }

  public get r(): Ref<Decimal> {
    return super.r;
  }

  public get v() {
    return super.v;
  }

  public set v(v: Decimal) {
    super.v = v;
    const diff = v.minus(super.r.value);
    if (diff.greaterThan(0)) this.t = this.t.value.add(v);
  }

  protected set t(t: Decimal) {
    this._t.value = t;
  }
}
