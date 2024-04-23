import { Observer, Rater } from "@/utils/values";
import type { ResourceData, ResourceNames } from "../data/resources";
import Decimal, { type DecimalSource } from "break_eternity.js";
import type { AutomatorNames } from "../data/automators";

export class Resource extends Rater {
  private readonly data;
  public readonly name;

  public constructor(resource_data: ResourceData, name: ResourceNames) {
    super(new Decimal(resource_data.default_value || 0));
    this.data = resource_data;
    this.name = name;
  }

  public get delay() {
    return this.data.increment ? this.data.increment.v || 1 : 1;
  }

  public get cost() {
    return this.data.cost || {};
  }

  public get can_increment() {
    if (!this.data.increment) return true;
    if (this.data.increment.can === undefined) return true;
    return this.data.increment.can;
  }

  public get increment() {
    if (!this.data.increment) return 1;
    if (this.data.increment && !this.data.increment.can) return 0;
    return this.data.increment.v || 1;
  }
}
