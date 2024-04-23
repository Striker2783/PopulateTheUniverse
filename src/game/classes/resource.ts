import { Observer, Rater } from "@/utils/values";
import type { ResourceData } from "../data/resources";
import Decimal from "break_eternity.js";

export class Resource extends Rater {
  private readonly data;
  public constructor(resource_data: ResourceData) {
    super(new Decimal(resource_data.default_value || 0));
    this.data = resource_data;
  }

  public get delay() {
    return this.data.increment ? this.data.increment.delay || 1 : 1;
  }

  public get cost() {
    return this.data.cost || {};
  }

  public get can_increment() {
    if (!this.data.increment) return true;
    if (this.data.increment.can === undefined) return true;
    return this.data.increment.can;
  }
}
