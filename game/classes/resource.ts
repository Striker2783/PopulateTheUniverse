import { Observer, Rater } from "game/utils/values";
import type { ResourceData, ResourceNames } from "../data/resources";
import Decimal, { type DecimalSource } from "break_eternity.js";

export class Resource extends Rater {
  private readonly data;
  public readonly name;

  public constructor(resource_data: ResourceData, name: ResourceNames) {
    super(new Decimal(resource_data.default_value || 0));
    this.data = resource_data;
    this.name = name;
  }

  public get cost() {
    return this.data.cost || {};
  }
}
