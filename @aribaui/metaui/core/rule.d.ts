import { KeyData, MatchValue, Meta, PropertyMap, RuleSet } from './meta';
/**
 * A Selector defines a sort of key/value predicate that must be satisfied for a
 * rule to apply.
 */
export declare class Selector {
    private _key;
    private _value;
    isDecl: boolean;
    private _matchArrayIdx;
    private _matchValue;
    static fromMap(values: Map<string, any>): Array<Selector>;
    constructor(_key: string, _value: any, isDecl?: boolean);
    readonly key: string;
    readonly value: any;
    bindToKeyData(keyData: KeyData): void;
    matches(matchArray: Array<MatchValue>): boolean;
    toString(): string;
}
/**
 * A Rule defines a map of properties that should apply in the event that a set of Selectors
 * are matched.  Given a rule base (Meta) and a set of asserted values (Context) a list of matching
 * rules can be computed (by matching their selectors against the values) and by successively (in
 * rank / priority order) applying (merging) their property maps a set of effective properties can
 * be computed.
 *
 */
export declare class Rule {
    _selectors: Array<Selector>;
    private _properties;
    private _rank;
    private _lineNumber;
    private _id;
    private _ruleSet;
    keyMatchesMask: number;
    keyIndexedMask: number;
    keyAntiMask: number;
    static merge(meta: Meta, src: Map<string, any>, dest: Map<string, any>, declareKey: string): number;
    constructor(_selectors: Array<Selector>, _properties?: Map<string, any>, _rank?: number, _lineNumber?: number);
    matches(matchArray: Array<MatchValue>): boolean;
    /**
     * returns context keys modified
     */
    apply(meta: Meta, properties: PropertyMap, declareKey: string): number;
    disable(): void;
    disabled(): boolean;
    lineNumber: number;
    location(): string;
    selectors: Array<Selector>;
    properties: Map<string, any>;
    rank: number;
    ruleSet: RuleSet;
    id: number;
    isEditable(): boolean;
    createDecl(): Rule;
    /**
     *  rewrite any selector of the form "layout=L1, class=c, layout=L2" to
     *  "layout_o=L1 class=c, layout=L2"
     */
    convertKeyOverrides(orig: Array<Selector>): Array<Selector>;
    toString(): string;
    _checkRule(values: Map<string, any>, meta: Meta): void;
}
export declare class RuleWrapper {
    rule: Rule;
    constructor(rule: Rule);
}
