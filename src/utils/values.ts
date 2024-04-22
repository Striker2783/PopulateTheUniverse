type Listener<T> = (a: T) => void;

export class Observer<T> {
  private _value: T;
  private readonly listeners: Map<Listener<T>, boolean> = new Map();

  public constructor(value: T) {
    this._value = value;
  }

  public get value(): T {
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

  private callAll() {
    this.listeners.forEach((_, k) => {
      k(this._value);
    });
  }
}
