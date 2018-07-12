import { UIMeta } from './uimeta';
import { Rule } from './rule';
import { Meta } from './meta';
export interface RuleLoader {
    loadRules(meta: Meta, source: any, module: string, onRule: (rule: Rule) => void): void;
}
export declare class RuleLoaderService implements RuleLoader {
    private _uiMeta;
    constructor();
    uiMeta: UIMeta;
    loadRules(meta: Meta, source: any, module: string, onRule: (rule: Rule) => void): void;
    loadRulesWithReturn(source: any, module: string): Array<Rule>;
    private readRule(jsonRule, module);
    private resoveValue(type, value, module);
}
