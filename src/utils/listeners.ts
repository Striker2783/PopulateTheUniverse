import { ref, type UnwrapRef } from "vue";
import { Observer } from "./values";
import Decimal from "break_eternity.js";

export class Listener<T> {
  public _value;
  private listener;

  public constructor(v: T, o: Observer<T>) {
    this._value = ref(v);
    this.listener = o.addListener((v) => {
      this._value.value = v as UnwrapRef<T>;
    });
  }
  public static new_decimal(o: Observer<Decimal>) {
    return new Listener(Decimal.dZero, o);
  }
  public disconnect() {
    this.listener();
  }
  public get value() {
    return this._value.value;
  }
}
