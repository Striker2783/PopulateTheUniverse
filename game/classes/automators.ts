import { Observer } from "game/utils/values";
import { Resource } from "./resource";
import Decimal, { type DecimalSource } from "break_eternity.js";

export class Automators extends Resource {
    private readonly _assigned_automators = new Observer(Decimal.dZero);
    public get assigned_automators(): Observer<Decimal> {
        return this._assigned_automators;
    }
    public set assigned_automators(v: Decimal) {
        this._assigned_automators.value = v;
    }
    public can_assign(amount: DecimalSource = 1) {
        const diff = this.value.minus(this.assigned_automators.value);
        return diff.greaterThanOrEqualTo(amount);
    }
    public assign(amount: DecimalSource, resource: Resource) {
        //TODO
    }
}
