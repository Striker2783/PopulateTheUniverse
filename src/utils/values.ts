import Decimal from "break_eternity.js";

type Listener<T> = (a: T) => void;

export class Observer<T> {
  protected _value: T;
  private readonly listeners: Map<Listener<T>, boolean> = new Map();

  public constructor(value: T) {
    this._value = value;
  }

  public get value() {
    return this._value;
  }

  public set value(v: T) {
    this._value = v;
    this.callAll();
  }

  /**
   * Adds a listener and calls it.
   * @param listener Listener
   * @returns Disconnect function
   */
  public addListener(listener: Listener<T>): () => void {
    this.listeners.set(listener, true);
    listener(this._value);
    return () => this.removeListener(listener);
  }

  /**
   * Removes a listener
   * @param listener
   */
  public removeListener(listener: Listener<T>) {
    this.listeners.delete(listener);
  }

  protected callAll() {
    this.listeners.forEach((_, k) => {
      k(this._value);
    });
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
    this._value = v;
    this.callAll();
  }
  public get value() {
    return this._value;
  }
  public get total() {
    return this._total;
  }
}
