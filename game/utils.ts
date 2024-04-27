import type Decimal from "break_eternity.js";
import { ref, type Ref, type UnwrapRef } from "vue";

export class Observeable<T> {
  protected readonly _v: Ref<UnwrapRef<T>>;

  public constructor(v: T) {
    this._v = ref(v);
  }

  public get v(): Ref<UnwrapRef<T>> {
    return this._v;
  }

  public set v(v: T) {
    this._v.value = v as UnwrapRef<T>;
  }
}

export class Totaler extends Observeable<Decimal> {
  protected readonly _t: Ref<Decimal>;

  public constructor(v: Decimal) {
    super(v);
    this._t = ref(v);
  }

  public get t(): Ref<Decimal> {
    return this._t;
  }

  public get v(): Ref<Decimal> {
    return this._v;
  }

  public set v(v: Decimal) {
    super.v = v;
    const diff = v.minus(super.v.value);
    if (diff.greaterThan(0)) this.t = this.t.value.add(v);
  }

  protected set t(t: Decimal) {
    this._t.value = t;
  }
}
