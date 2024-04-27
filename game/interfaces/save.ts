export interface Saveable<T> {
  save(): T;
  load(v: T): void;
}
