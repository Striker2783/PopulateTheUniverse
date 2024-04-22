import { ref, type UnwrapRef } from "vue";
import { Observer } from "./values";

export class Listener<T> {
  public _value;
  private listener;

  public constructor(v: T, o: Observer<T>) {
    this._value = ref(v);
    this.listener = o.addListener((v) => {
      this._value.value = v as UnwrapRef<T>;
    });
  }
  public disconnect() {
    this.listener();
  }
  public get value() {
    return this._value.value;
  }
}
