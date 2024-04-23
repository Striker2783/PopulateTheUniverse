import { Observer, Rater } from "@/utils/values";
import type { ResourceData } from "../data/resources";
import Decimal from "break_eternity.js";

export class Resource extends Rater {
  private readonly data;
  private _onDelay = new Observer(false);
  public get onDelay() {
    return this._onDelay;
  }
  public set onDelay(value) {
    this._onDelay = value;
  }
  public constructor(resource_data: ResourceData) {
    super(new Decimal(resource_data.default_value || 0));
    this.data = resource_data;
  }
}
