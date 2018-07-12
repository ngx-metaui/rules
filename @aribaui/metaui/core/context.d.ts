/**
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
/**
 * Special import to be able to convert string to type using Collections[string type] => type
 */
import * as Collections from 'typescript-collections';
import { Extensible, FieldPath } from '@aribaui/core';
import { MatchResult } from './match';
import { Meta, PropertyMap } from './meta';
import { ObjectMeta } from './object-meta';
import { UIMeta } from './uimeta';
import { NestedMap } from './nested-map';
import { DynamicPropertyValue, StaticallyResolvable } from './property-value';
/**
 *
 * Context represents a stack of assignments (e.g. class=User, field=birthDay, operation=edit)
 *  The current set of assignments can be retrieved via values().
 *
 * The current values are run against the Meta rule set to compute the effective PropertyMap
 * (e.g. visible:true, editable:true, component:AWTextField).
 * Some rule evaluations result in *chaining* -- where additional assignments that are
 * 'implied' by the current assignments are applied, (resulting in a revised computation
 * of the current PropertyMap, and possible further chaining).
 * (e.g. field=birthDay may result in type=Date which may result in component:DatePicker)
 *
 * Assignments can be scoped and popped (push(), set(key, value); ...; pop()).
 *
 * The actual computation of rule matches is cached so once a 'path' down the context
 * tree has been exercized subsequent matching traversals (even by other threads/users)
 * is fast.
 *
 *
 * examples of property maps for different scope key
 *
 * <code>
 *     {
        'visible': true,
        'class_trait': 'fiveZones',
        'editable': true,
        'bindings': {
            'value': 'Default Title'
        },
        'field_trait': 'required',
        'label': 'Title',
        'type': 'string',
        'required': true,
        'editing': true,
        'valid': '{{(value && value.length > 0) ? true : \'Answer required\'}}',
        'component': 'InputFieldComponent',
        'field': 'title',
        'layout_trait': 'Form',
        'trait': 'required',
        'rank': 20,
        'after': 'zLeft',
        'class': 'CheckRequest1'
    }
 *
 * </code>
 *
 *
 *
 * <code>
 *     {
        'visible': true,
        'class_trait': 'fiveZones',
        'label': 'Check Request1',
        'zones': [
            'zLeft',
            'zRight',
            'zTop',
            'zBottom',
            'zDetail'
        ],
        'editing': true,
        'layout': '*',
        'component': 'MetaFormComponent',
        'layout_trait': 'Form',
        'fiveZoneLayout': true,
        'trait': 'fiveZones',
        'layoutsByZone': {

        },
        'class': 'CheckRequest1',
        'fieldsByZone': {
            'zLeft': [
                'title',
                'name'
            ],
            'zNone': [
                'fullName'
            ]
        }
    }
 *
 * </code>
 *
 *
 *
 */
export declare class Context extends Extensible {
    private _meta;
    private nested;
    private static _CacheActivations;
    static _ExpensiveContextConsistencyChecksEnabled: boolean;
    static _DebugRuleMatches: boolean;
    static _Debug_SetsCount: number;
    static MaxContextStackSize: number;
    static EmptyMap: PropertyMap;
    static readonly EmptyRemoveMap: Map<any, any>;
    private _values;
    _entries: Array<Assignment>;
    private _frameStarts;
    protected _currentProperties: PropertyMap;
    protected _rootNode: Activation;
    private _currentActivation;
    private _recPool;
    _accessor: PropertyAccessor;
    isNested: boolean;
    /**
     * Implementation notes:
     *
     * Context maintains a stack (_entries) of _ContextRecs (one per assignment) as well as
     * as _frameStack recording the stack positions for each push()/pop().

     * Performance through aggressive global caching of all statically computatble data:
     * - The static (reusable/immutable) part of a ContextRec is factored into _StaticRec
     * - StaticRecs represent individual assignments (context key = value) and cache the
     *      resulting Meta.MatchResult (and associated PropertyMap)
     * - The sub-stack (of forward chained) records associated with each external set()
     *      (or chained *dynamic* value) is recorded in an Activation.
     * - Process-global tree of Activations
     *      - each activation keeps list of its ContextKey/Value-keyed decended Activations
     *
     * Property Contexts.
     *      The notion of a 'PropertyContext' makes the going tricky...
     *       A 'PropertyContextKey' is a key for an 'entity' that properties describe.
     *       (e.g. class, field, action, and layout are property context keys, but editing,
     *       operation, ... are not)
     *       E.g. On an assignment stack with module=Admin class=Foo, field=name, editable=false,
     *       we want the property 'label' to be the label for the *field*, not the class or module
     *       -- i.e. the *top-most* assignment of a PropertyContextKey determines which property
     *       context rules are active.
     *
     *  These rules are activated via a synthetic context key of like 'field_p' or 'class_p'.
     *  Logically, after each assigment we need to figure of which context key should be in
     *  affect an set it on the context, but then automatically pop it off upon the next
     *  assignment (and then recompute again).
     *
     *  Of course, actually pushing and popping context key assignment on every set()
     *  would be expensive so instead we cache the 'propertyActivation' associated with
     *  each activation, and use its values and properties rather than those on the
     *  activation.
     */
    static getActivationTree(meta: Meta): Activation;
    constructor(_meta: Meta, nested?: boolean);
    push(): void;
    readonly meta: Meta;
    pop(): void;
    set(key: string, value: any): void;
    merge(key: string, value: any): void;
    setScopeKey(key: string): void;
    readonly values: Map<string, any>;
    readonly properties: any;
    propertyForKey(key: string): any;
    listPropertyForKey(key: string): Array<any>;
    booleanPropertyForKey(key: string, defaultVal: boolean): boolean;
    allProperties(): PropertyMap;
    resolveValue(value: any | DynamicPropertyValue): any;
    staticallyResolveValue(value: any | StaticallyResolvable): any;
    pushAndResolveStatic(contextVals: Map<string, any>, propertyKey: string, staticResolve: boolean): any;
    pushAndResolve(contextVals: Map<string, any>, propertyKey: string): any;
    snapshot(): Snapshot;
    /**
     * Represent current active assignment list meaning it will not include any entries which
     * were overwritten by some late entry having the same key.
     *
     * It does not include entries that were pushed to stack from any Property -> Selector
     * propagation. This creates shell copy and ignoring all last Matches which could be from
     * some previous assignments that are now replaced with some new ones
     *
     */
    activeAssignments(): Array<AssignmentSnapshot>;
    /**
     *
     * Similar as <code>activeAssignments</code> but do include also those that were replaced later
     * on with assignments having the same key.
     *
     * This is needed for cases where we need to have deep copy of current state along with
     * all properties.
     *
     */
    allAssignments(): Array<AssignmentSnapshot>;
    _set(key: string, value: any, merge: boolean, chaining: boolean): void;
    newContextRec(): Assignment;
    /**
     * Cached case: apply a previously computed Activation
     */
    _applyActivation(activation: Activation, firstVal: any): boolean;
    private awakeCurrentActivation();
    private applyDeferredAssignments(deferredAssignments);
    _inDeclare(): boolean;
    /**
     Non-cached access: create a new activation
     */
    _createNewFrameForSet(key: string, svalue: any, value: any, merge: boolean, chaining: any): boolean;
    /**
     * Called lazily to compute the property activation for this activation
     * Compute the static part of the property activation
     * we accumulate the property settings on a side activation off the main stack
     * and apply it virtually if our parent is not covered
     *  (that way we don't have to apply and unapply all the time)
     */
    _createNewPropertyContextActivation(parentActivation: Activation): Activation;
    _applyPropertyActivation(propActivation: Activation, rec: Assignment): void;
    _isNewValue(oldVal: any, newVal: any): boolean;
    isDeclare(): boolean;
    protected assertContextConsistent(): void;
    _set2(key: string, svalue: any, value: any, merge: boolean, isChaining: boolean): boolean;
    readonly frameStarts: number[];
    _undoRecValue(rec: Assignment): void;
    _prepareForOverride(overrideIndex: number, lastAssignmentIdx: number): number;
    _rematchForOverride(key: string, svalue: any, overrideIndex: number, firstAssignmentIdx: number): MatchResult;
    private _undoOverride(rec, recIdx);
    _checkMatch(match: MatchResult, key: string, value: any): void;
    findLastAssignmentOfKey(key: string): number;
    findLastAssignmentOfKeyWithValue(key: string, value: any): number;
    /**
     * Check if we have value mirroring (property to context) to do Dynamic property mirroring will
     * be added to the currentActivation deferredAssignment list
     *
     */
    _checkApplyProperties(): boolean;
    applyPropertyContextAndChain(): void;
    _currentPropertyScopeKey(): string;
    _checkPropertyContext(): boolean;
    debug(): void;
    debugString(): string;
    _logContext(): void;
    private writeProperties(buf, properties, level, singleLine);
    private lastMatchWithoutContextProps();
    private lastMatch();
    lastStaticRec(): StaticRec;
    readonly recPool: Array<Assignment>;
    readonly currentActivation: Activation;
    extendedFields(): Map<string, any>;
}
/**
 * A sharable/re-applicable block of setScopeKeyAssignment _StaticRecs.  An Activation contains
 * the list of assignment records resulting from (chaining from) a single original
 * assignment (as well as _DeferredAssignment records for dynamic values that cannot
 * be statically resolved to records).  Activations form a shared/cached tree, based
 * on context assignment paths previously traversed via assignments to some Context.
 * Subsequent traversals of these paths (likely by different Context instances)
 * are greatly optimized: an existing Activation is retrieved and its records appended
 * to the context's _entries stack; all of the traditional computation of rule match lookups,
 * chained assignments and override indexes is bypassed.
 * Activation gives special treatment to the 'propertyActivation', i.e. the activation
 * resulting from the application of the 'scopeKey' to the current context.  Property lookup
 * following and context assignment require application of the scopeKey, but then the scope key
 * must immediately be popped for the next context assignment.  To avoid this constant push/pop
 * on the bottom of the stack, _Activations cache a side activation (the propertyActivation)
 * for the result of applying the scopeKey to the current activation.  This stack (and its
 * properties) are cached on the side, and can be accessed without actually modifying the main
 * context stack.
 */
export declare class Activation {
    _parent: Activation;
    _recs: Array<StaticRec>;
    _origEntryCount: number;
    _valueNodeMapByContextKey: Map<string, Collections.Dictionary<any, any>>;
    _valueNodeMapByContextKeyChaining: Map<string, Collections.Dictionary<any, any>>;
    _propertyActivation: Activation;
    _nestedValues: NestedMap<string, any>;
    deferredAssignments: Array<DeferredAssignment>;
    constructor(_parent?: Activation);
    getChildActivation(contextKey: string, value: any, chaining: boolean): Activation;
    cacheChildActivation(contextKey: string, value: any, activation: Activation, chaining: boolean): void;
    addDeferredAssignment(key: string, value: DynamicPropertyValue): void;
    hasDeferredAssignmentForKey(key: string): boolean;
    propertyActivation(context: Context): Activation;
    findExistingPropertyActivation(): Activation;
    toString(): string;
}
export declare class DeferredAssignment {
    key: string;
    value: DynamicPropertyValue;
}
export declare class AssignmentSnapshot {
    key: string;
    value: any;
    salience: number;
}
export declare class Assignment {
    srec: StaticRec;
    val: Object;
    maskedByIdx: number;
    _didInitPropContext: boolean;
    _propertyLocalSrec: StaticRec;
    _propertyLocalValues: Map<string, any>;
    propertyLocalMatches(context: Context): MatchResult;
    propertyLocalStaticRec(context: Context): StaticRec;
    propertyLocalValues(context: Context): Map<string, any>;
    initPropContext(context: Context): void;
    reset(): void;
}
/**
 * The 'static' (sharable) part of a context value assignment record.
 * Theses are created by the first _Assignment that needs them
 * and then cached for re-application in their _Activation
 *  (which, in turn, is stored in the global activation tree)
 */
export declare class StaticRec {
    activation: Activation;
    private _key;
    private _val;
    match: MatchResult;
    salience: number;
    fromChaining: boolean;
    lastAssignmentIdx: number;
    properties(): PropertyMap;
    key: string;
    val: any;
}
export declare class PropertyAccessor {
    private context;
    constructor(context: Context);
    get(key: string): any;
    toString(): string;
}
/**
 * Snapshot is the way how to capture a current state of the context and then replay it back so.
 * for cases when we need to run some rule execution outside of the push/pop cycle
 */
export declare class Snapshot {
    private _context;
    _meta: Meta;
    _origClass: string;
    _assignments: Array<AssignmentSnapshot>;
    _allAssignments: Array<AssignmentSnapshot>;
    _isNested: boolean;
    constructor(_context: Context);
    hydrate(shellCopy?: boolean): Context;
}
export declare class ObjectMetaContext extends Context {
    static readonly DefaultLocale: string;
    private _formatters;
    constructor(_meta: ObjectMeta, nested?: boolean);
    value: any;
    readonly object: any;
    readonly formatters: Map<string, any>;
    fieldPath(): FieldPath;
    locale(): string;
    timezone(): number;
}
export declare class UIContext extends ObjectMetaContext {
    constructor(_meta: UIMeta, nested?: boolean);
    locale(): string;
    timezone(): number;
}
