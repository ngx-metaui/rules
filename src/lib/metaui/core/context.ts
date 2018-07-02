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
import {
    assert,
    BooleanWrapper, className,
    Extensible,
    FieldPath,
    isArray,
    isBlank,
    isNumber,
    isPresent,
    isString,
    isStringMap,
    ListWrapper,
    MapWrapper,
    objectToName,
    print,
    StringJoiner
} from '@aribaui/core';
import {MatchResult, UnionMatchResult} from './match';
import {Meta, OverrideValue, PropertyManager, PropertyMap} from './meta';
import {ObjectMeta, ObjectMetaPropertyMap} from './object-meta';
import {UIMeta} from './uimeta';
import {NestedMap} from './nested-map';
import {
    DynamicPropertyValue,
    DynamicSettablePropertyValue,
    Expr,
    isDynamicSettable,
    StaticallyResolvable
} from './property-value';

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
export class Context extends Extensible {
    private static _CacheActivations: boolean = false;


    static _ExpensiveContextConsistencyChecksEnabled: boolean = false;
    static _DebugRuleMatches: boolean = false;
    static _Debug_SetsCount: number = 0;


    static MaxContextStackSize: number = 200;

    static EmptyMap: PropertyMap = null;
    static readonly EmptyRemoveMap: Map<any, any> = new Map<any, any>();

    private _values: Map<string, any> = new Map<string, any>();
    _entries: Array<Assignment> = [];
    private _frameStarts: number[] = [];
    protected _currentProperties: PropertyMap;
    protected _rootNode: Activation;
    private _currentActivation: Activation;
    private _recPool: Array<Assignment> = [];

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

    static getActivationTree(meta: Meta): Activation {
        // todo: check the syntax Actionvation contructor name.
        let name = objectToName(Activation);
        let root: Activation = meta.identityCache.getValue(name);
        if (isBlank(root)) {
            root = new Activation();
            meta.identityCache.setValue(name, root);
        }
        return root;
    }


    constructor(private _meta: Meta, private nested: boolean = false) {
        super();

        if (isBlank(Context.EmptyMap)) {
            Context.EmptyMap = new PropertyMap();
        }

        Context._Debug_SetsCount = 0;

        this._accessor = new PropertyAccessor(this);
        this._currentActivation = Context.getActivationTree(_meta);
        this._rootNode = this._currentActivation;

        this.isNested = nested;
    }


    push(): void {
        this._frameStarts.push(this._entries.length);
    }

    get meta(): Meta {
        return this._meta;
    }


    pop(): void {
        let size = this._frameStarts.length;
        assert(size > 0, 'Popping empty stack');

        let pos = this._frameStarts.pop();

        let entriesSize: number;
        while ((entriesSize = this._entries.length) > pos) {
            let recIdx = entriesSize - 1;
            let rec: Assignment = this._entries.splice(recIdx, 1)[0];

            if (rec.srec.lastAssignmentIdx === -1) {
                this._values.delete(rec.srec.key);
            } else {
                this._undoOverride(rec, recIdx);
            }

            this._currentActivation = (recIdx > 0)
                ? this._entries[recIdx - 1].srec.activation
                : this._rootNode;

            this.assertContextConsistent();

            // check rec back into pool for reuse
            rec.reset();
            this._recPool.push(rec);
        }

        this._currentProperties = null;
    }


    set(key: string, value: any): void {

        this._set(key, value, false, false);

        // implement default toString for our object so we can retrieve objectTitle
        if (key === ObjectMeta.KeyObject) {
            let toCheck = this._values.get(ObjectMeta.KeyObject);
            if (isBlank(toCheck['$toString'])) {
                toCheck['$toString'] = () => {
                    let clazz = this.values.get(ObjectMeta.KeyClass);
                    return UIMeta.beautifyClassName(clazz);
                };
            }
        }
    }


    merge(key: string, value: any): void {
        this._set(key, value, true, false);
    }

    setScopeKey(key: string) {
        assert(this._meta.keyData(key).isPropertyScope, key + ' is not a valid context key');
        let current: string = this._currentPropertyScopeKey();

        // Assert.that(current != null, 'Can't set %s as context key when no context key on stack',
        // key); TODO: if current key isChaining then we need to set again to get a non-chaining
        // assignment

        if (!(key === current)) {
            let val: any = this.values.get(key);
            // Assert.that(val != null, 'Can't set %s as context key when it has no value already
            // on the context', key);
            if (isBlank(val)) {
                val = Meta.KeyAny;
            }
            this.set(key, val);
        }
    }

    get values(): Map<string, any> {
        let propVals: Map<string, any>;
        return (ListWrapper.isEmpty(this._entries) ||
            isBlank(
                propVals = (ListWrapper.last<Assignment>(this._entries)).propertyLocalValues(
                    this))) ? this._values : propVals;
    }

    get properties(): any {
        return this._accessor;
    }


    propertyForKey(key: string): any {
        let val = this.allProperties().get(key);

        return this.resolveValue(val);
    }

    listPropertyForKey(key: string): Array<any> {
        let val = this.propertyForKey(key);
        return (isBlank(val)) ? [] : (isArray(val)) ? val : [val];
    }

    booleanPropertyForKey(key: string, defaultVal: boolean): boolean {
        let val = this.propertyForKey(key);
        return (isBlank(val)) ? defaultVal : BooleanWrapper.boleanValue(val);
    }


    allProperties(): PropertyMap {
        if (isBlank(this._currentProperties)) {
            let m: MatchResult = this.lastMatch();
            if (isPresent(m)) {
                this._currentProperties = m.properties();

            }
        }
        return isPresent(this._currentProperties) ? this._currentProperties : Context.EmptyMap;
    }


    resolveValue(value: any | DynamicPropertyValue): any {
        let lastValue: any;
        while (value !== lastValue && isPresent(value) && value instanceof DynamicPropertyValue) {
            lastValue = value;

            let propValue: DynamicPropertyValue = value;
            if (propValue instanceof Expr) {
                propValue.addTypeToContext('UIMeta', UIMeta);
            }
            value = propValue.evaluate(this);
        }

        return value;
    }


    staticallyResolveValue(value: any | StaticallyResolvable): any {
        let lastValue: any = null;
        while (value !== lastValue && isPresent(value) && value instanceof StaticallyResolvable) {
            lastValue = value;
            value = value.evaluate(this);
        }
        return value;
    }

    pushAndResolveStatic(contextVals: Map<string, any>, propertyKey: string,
                         staticResolve: boolean): any {
        let scopeKey: string;
        this.push();

        MapWrapper.iterable(contextVals).forEach((value, key) => {
            if ('*' === value) {
                scopeKey = key;
            } else {
                this.set(key, value);
            }
        });

        if (isPresent(scopeKey)) {
            this.setScopeKey(scopeKey);
        }
        let val = this.allProperties().get(propertyKey);
        val = staticResolve ? this.staticallyResolveValue(val) : this.resolveValue(val);
        this.pop();

        return val;

    }

    pushAndResolve(contextVals: Map<string, any>, propertyKey: string): any {
        return this.pushAndResolveStatic(contextVals, propertyKey, false);
    }

    // a (usable) snapshot of the current state of the context
    snapshot(): Snapshot {
        return new Snapshot(this);
    }


    /**
     * Represent current active assignment list meaning it will not include any entries which
     * were overwritten by some late entry having the same key.
     *
     * It does not include entries that were pushed to stack from any Property -> Selector
     * propagation. This creates shell copy and ignoring all last Matches which could be from
     * some previous assignments that are now replaced with some new ones
     *
     */
    activeAssignments(): Array<AssignmentSnapshot> {

        let list: Array<AssignmentSnapshot> = new Array<AssignmentSnapshot>();

        for (let i = 0, c = this._entries.length; i < c; i++) {
            let rec: Assignment = this._entries[i];
            if (rec.maskedByIdx === 0 && !rec.srec.fromChaining) {
                let a: AssignmentSnapshot = new AssignmentSnapshot();
                a.key = rec.srec.key;
                a.value = rec.val;
                a.salience = rec.srec.salience;
                list.push(a);
            }
        }
        return list;
    }


    /**
     *
     * Similar as <code>activeAssignments</code> but do include also those that were replaced later
     * on with assignments having the same key.
     *
     * This is needed for cases where we need to have deep copy of current state along with
     * all properties.
     *
     */
    allAssignments(): Array<AssignmentSnapshot> {

        let list: Array<AssignmentSnapshot> = new Array<AssignmentSnapshot>();

        for (let i = 0, c = this._entries.length; i < c; i++) {
            let rec: Assignment = this._entries[i];
            if (!rec.srec.fromChaining) {
                let a: AssignmentSnapshot = new AssignmentSnapshot();
                a.key = rec.srec.key;
                a.value = rec.val;
                a.salience = rec.srec.salience;
                list.push(a);
            }
        }
        return list;
    }


    _set(key: string, value: any, merge: boolean, chaining: boolean): void {
        let sval = this._meta.transformValue(key, value);
        let didSet = false;

        let registry = (<UIMeta>this.meta).componentRegistry;
        if (key === ObjectMeta.KeyObject && isPresent(registry)) {
            registry.registerType(className(value), value.constructor);
        }

        let activation: Activation = this._currentActivation.getChildActivation(key, sval,
            chaining);

        if (isBlank(activation)) {
            didSet = this._createNewFrameForSet(key, sval, value, merge, chaining);
        }
        if (isPresent(activation)) {
            didSet = this._applyActivation(activation, value);
        }

        if (didSet) {
            this.awakeCurrentActivation();
        }
    }

    newContextRec(): Assignment {
        let count = this._recPool.length;
        return (count > 0) ? this._recPool.splice(count - 1, 1)[0] : new Assignment();
    }


    /**
     * Cached case: apply a previously computed Activation
     */
    _applyActivation(activation: Activation, firstVal: any): boolean {
        assert(activation._parent === this._currentActivation,
            'Attempt to apply activation on mismatched parent');

        if (this._entries.length !== activation._origEntryCount) {
            assert(false,
                'Mismatched context stack size (%s) from when activation was popped ' +
                this._entries.length + ' ' + activation._origEntryCount);
        }
        let count = activation._recs.length;
        if (count === 0) {
            return false;
        }
        for (let i = 0; i < count; i++) {
            let srec: StaticRec = activation._recs[i];
            let rec: Assignment = this.newContextRec();
            rec.srec = srec;

            // Apply masking for any property that we mask out
            if (srec.lastAssignmentIdx !== -1) {
                this._prepareForOverride(this._entries.length, srec.lastAssignmentIdx);
            }


            rec.val = (i === 0 && !this.meta.isNullMarker(firstVal)) ? firstVal : srec.val;
            this._values.set(srec.key, rec.val);
            this._entries.push(rec);
        }
        this._currentActivation = activation;
        this._currentProperties = null;

        return true;
    }


    private awakeCurrentActivation(): void {
        // See if this activation requires further chaining
        let currentActivation = this._currentActivation;
        let deferredAssignments: Array<DeferredAssignment> = currentActivation.deferredAssignments;
        if (isPresent(deferredAssignments)) {
            this.applyDeferredAssignments(deferredAssignments);
        }
    }

    private applyDeferredAssignments(deferredAssignments: Array<DeferredAssignment>): void {
        for (let da of  deferredAssignments) {
            // verify that deferred value still applies
            let currentPropValue = this.staticallyResolveValue(this.allProperties().get(da.key));

            if (da.value === currentPropValue) {

                let resolvedValue = this.resolveValue(da.value);

                this._set(da.key, resolvedValue, false, true);
            } else {
                // print('_set SKIPPING deferred assignment of derived value: %s <- %s --' +
                //     ' no longer matches property in context: %s' , da.key , da.value ,
                // currentPropValue);
            }
        }
    }


    _inDeclare(): boolean {
        let match: MatchResult = this.lastMatchWithoutContextProps();
        return isPresent(match) && (match._keysMatchedMask & this._meta.declareKeyMask) !== 0;
    }


    /**
     Non-cached access: create a new activation
     */
    _createNewFrameForSet(key: string, svalue: any, value: any, merge: boolean,
                          chaining: any): boolean {
        let lastActivation: Activation = this._currentActivation;
        let newActivation: Activation = new Activation(lastActivation);
        newActivation._origEntryCount = this._entries.length;
        this._currentActivation = newActivation;

        // set this value
        let didSet: boolean = this._set2(key, svalue, value, merge, chaining);
        // mirror properties
        if (didSet) {
            while (this._checkApplyProperties()) {
                /* repeat */
            }
        }

        // Remember for the future
        if (Context._CacheActivations) {
            lastActivation.cacheChildActivation(key, svalue, newActivation, chaining);
        }
        this._currentActivation = (didSet) ? newActivation : lastActivation;
        return this._currentActivation !== lastActivation;
    }


    /**
     * Called lazily to compute the property activation for this activation
     * Compute the static part of the property activation
     * we accumulate the property settings on a side activation off the main stack
     * and apply it virtually if our parent is not covered
     *  (that way we don't have to apply and unapply all the time)
     */
    _createNewPropertyContextActivation(parentActivation: Activation): Activation {

        this.push();
        let propActivation: Activation = new Activation(parentActivation);
        propActivation._origEntryCount = this._entries.length;

        this._currentActivation = propActivation;
        let origValues = this._values;

        let nestedMap: NestedMap<string, any> = new NestedMap<string, any>(origValues);
        this._values = nestedMap;
        this.applyPropertyContextAndChain();

        if (propActivation._recs.length > 0 || isPresent(propActivation.deferredAssignments)) {
            propActivation._nestedValues = nestedMap;
            this._values = Context.EmptyRemoveMap;  // hack -- empty map so that undo is noop --
                                                    // ((NestedMap)_values).dup();
        } else {
            propActivation = null;
        }
        this.pop();
        this._values = origValues;
        this._currentActivation = parentActivation;

        return propActivation;
    }

    _applyPropertyActivation(propActivation: Activation, rec: Assignment) {
        let propValues = this._values;
        if (isPresent(propActivation._nestedValues)) {
            propValues = propActivation._nestedValues.reparentedMap(propValues);
        }

        // set up propLocal results
        // Now, see if we need to compute a dynamic property activation as well
        if (isPresent(propActivation.deferredAssignments)) {
            this.push();
            // nest a dynamic nested map on our static nested map (which is on our last dynamic
            // nested map...)
            let origValues = this._values;
            this._values = new NestedMap<string, any>(propValues);
            this._applyActivation(propActivation, Meta.NullMarker);
            this.applyDeferredAssignments(propActivation.deferredAssignments);

            rec._propertyLocalValues = this._values;
            rec._propertyLocalSrec = ListWrapper.last(this._entries).srec;

            this._values = Context.EmptyRemoveMap;  // hack -- empty map so that undo is noop --
                                                    // ((NestedMap)_values).dup();
            this.pop();
            this._values = origValues;

        } else {
            // can use static versions
            rec._propertyLocalValues = propValues;
            rec._propertyLocalSrec = ListWrapper.last(propActivation._recs);
        }
    }

    // todo: any equals old va === new val
    _isNewValue(oldVal: any, newVal: any): boolean {
        return (oldVal !== newVal && (isPresent(oldVal) ||
            (!oldVal === newVal && (!isArray(oldVal)) || !(ListWrapper.contains(oldVal, newVal)))));
    }


    isDeclare(): boolean {
        return isPresent(this.propertyForKey(Meta.KeyDeclare));
    }


    protected assertContextConsistent(): void {
        if (!Context._ExpensiveContextConsistencyChecksEnabled) {
            return;
        }

        // Verify that each value in context has matching (enabled) context record


        MapWrapper.iterable(this._values).forEach((value, key) => {
            let lastAssignmentIdx = this.findLastAssignmentOfKey(key);
            assert(lastAssignmentIdx >= 0, 'Value in context but no assignment record found ' +
                key + ' = ' + value);

            let contextVal = this._entries[lastAssignmentIdx].val;

            assert(value === contextVal || (isPresent(value) && value === contextVal),
                'Value in context  doesnt match value on stack ' + value + ' / ' + contextVal);

        });

        // check entries for proper relationship with any previous records that they override
        for (let i = this._entries.length - 1; i >= 0; i--) {
            let r: Assignment = this._entries[i];
            let foundFirst = false;

            for (let j = i - 1; j >= 0; j--) {
                let pred: Assignment = this._entries[j];
                if (pred.srec.key === r.srec.key) {
                    // Predecessors must be masked
                    assert((!foundFirst && pred.maskedByIdx === i) ||
                        ((foundFirst || pred.srec.fromChaining) && pred.maskedByIdx > 0),

                        'Predecessor A does not have matching maskedByIdx B  for override C:' +
                        pred.srec.key + ' = ' + pred.val + ', ' + pred.maskedByIdx + ', ' +
                        i + ' = ' + r.val
                    );

                    assert(((!foundFirst && r.srec.lastAssignmentIdx === j) || foundFirst ||
                        pred.srec.fromChaining),

                        'Override A1=A2 does not have proper lastAssignmentIdx B1!=B2 ' +
                        'for predecessor C' +
                        pred.srec.key + ' = ' + pred.val + ', ' + r.srec.lastAssignmentIdx + ' = ' +
                        j + ', ' + pred.val);
                    foundFirst = true;
                }
            }
        }
    }


    _set2(key: string, svalue: any, value: any, merge: boolean, isChaining: boolean): boolean {

        Context._Debug_SetsCount++;
        // print('Setting key/vale onto stack: ' + key + '=' + value);
        let hasOldValue = this._values.has(key) && isPresent(this._values.get(key));
        let oldVal = hasOldValue ? this._values.get(key) : null;

        let isNewValue = !hasOldValue || this._isNewValue(oldVal, value);

        let matchingPropKeyAssignment = !isNewValue && !isChaining &&
            ((this._meta.keyData(key).isPropertyScope) &&
                key !== this._currentPropertyScopeKey());
        if (isNewValue || matchingPropKeyAssignment) {
            let lastMatch: MatchResult;
            let newMatch: MatchResult;

            let salience = this._frameStarts.length;
            let lastAssignmentIdx = -1;
            if (isBlank(oldVal)) {
                lastMatch = this.lastMatchWithoutContextProps();

            } else {
                // We recompute that match up to this point by recomputing forward
                // from the point of the last assignment to this key (skipping it), then
                // match against the array of our value and the old

                let recIdx = this._entries.length;
                lastAssignmentIdx = this.findLastAssignmentOfKey(key);
                assert(lastAssignmentIdx >= 0,
                    'Value in context but no assignment record found ' + key + ' = ' + oldVal);

                if (matchingPropKeyAssignment) {
                    // cheap version of masking for a matching set:
                    this._entries[lastAssignmentIdx].maskedByIdx = recIdx;
                    lastMatch = this.lastMatchWithoutContextProps();

                } else {
                    // be able to override a non-chaining assignment.  Our problem is, though, if
                    // the developer wanted to force a re-assignment in the new frame, we'd filter
                    // it out as a duplicate assignment above.  Now, we could allow that assignment
                    // through, but it would then break inletiants when searching back to mask a
                    // key (we wouldn't realize that we need to go further back to find the
                    // original one).

                    let oldRec: Assignment = this._entries[lastAssignmentIdx];

                    if (oldRec.srec.salience === salience) {
                        let prev = this.findLastAssignmentOfKeyWithValue(key, value);

                        if (prev !== -1 && this._entries[prev].srec.salience === salience) {
                            return false;
                        }
                    }

                    if (isChaining &&
                        (oldRec.srec.salience > salience || !oldRec.srec.fromChaining)) {
                        // print('Set of key skipped (salience %s <= %s)' + key + ', ' + oldVal +
                        // ', ' + value + ', ' + salience + ', ' + oldRec.srec.salience);
                        return false;
                    }
                    let firstAssignmentIdx = this._prepareForOverride(recIdx, lastAssignmentIdx);
                    newMatch = this._rematchForOverride(key, svalue, recIdx, firstAssignmentIdx);

                    if (merge) {
                        value = Meta.PropertyMerger_List.merge(oldVal, value, this.isDeclare());
                    }
                }
            }

            assert(this._entries.length <= Context.MaxContextStackSize,
                'MetaUI context stack exceeded max size -- likely infinite chaining: ' +
                this._entries.length
            );
            let srec: StaticRec = new StaticRec();
            srec.key = key;
            // todo: conversion
            srec.val = svalue;
            srec.lastAssignmentIdx = lastAssignmentIdx;
            srec.salience = salience;
            srec.fromChaining = isChaining;

            if (isBlank(newMatch)) {
                newMatch = (isPresent(value)) ? this._meta.match(key, svalue,
                    lastMatch) : lastMatch;
            }
            srec.match = newMatch;
            srec.activation = this._currentActivation;
            this._currentActivation._recs.push(srec);

            let rec = this.newContextRec();
            rec.srec = srec;
            rec.val = value;
            this._entries.push(rec);
            this._currentProperties = null;

            this._values.set(key, value);

            // console.log( this.debugName + ' => ' +
            //     'Push(' + key + ', ' + svalue + '): ' + 'Matches: ' + newMatch.matches().length
            //     + ', PropMap: ' + srec.properties().size);

            if (Context._DebugRuleMatches) {
                this._checkMatch(srec.match, key, value);
            }
            this.assertContextConsistent();
            return true;
        } else {

            // print('Context skipped assignment of matching property value %s = %s (isChaining ==
            // %s, isPropKey == %s)', key, value, isChaining,
            // (this._meta.keyData(key).isPropertyScope));

            if (!isChaining && this.meta.keyData(key).isPropertyScope) {
                // slam down a rec for property context
            }
        }
        return false;
    }


    get frameStarts(): number[] {
        return this._frameStarts;
    }

    _undoRecValue(rec: Assignment): void {
        if (rec.srec.lastAssignmentIdx === -1 ||
            this._entries[rec.srec.lastAssignmentIdx].maskedByIdx > 0) {
            this._values.delete(rec.srec.key);
        } else {
            this._values.set(rec.srec.key, this._entries[rec.srec.lastAssignmentIdx].val);
        }
    }


    // Undoes and masks assignments invalidated by override of given record
    // Returns stack index for first assignment (i.e. where match recomputation must start)
    _prepareForOverride(overrideIndex: number, lastAssignmentIdx: number): number {
        // if we're overriding a prop context override of a matching value, back up further
        let lastLastIdx = 0;
        while (((lastLastIdx = this._entries[lastAssignmentIdx].srec.lastAssignmentIdx) !== -1) &&
        (this._entries[lastAssignmentIdx].maskedByIdx <= 0)) {
            // mark it! (we'll pick it up below...)
            this._entries[lastAssignmentIdx].maskedByIdx = -1;
            lastAssignmentIdx = lastLastIdx;
        }

        // undo all conflicting or dervied assignments (and mark them)
        for (let i = this._entries.length - 1; i >= lastAssignmentIdx; i--) {
            let r = this._entries[i];
            // we need to undo (and mask) any record that conflict or are derived
            // NOTE: We are skipping the remove all chained records, because this can result in
            // undoing derived state totally unrelated to this key.  Ideally we'd figure out what
            // depended on what...
            if (r.maskedByIdx <= 0 && (i === lastAssignmentIdx || r.maskedByIdx === -1)) {
                // || r.srec.fromChaining
                // mark and undo it
                r.maskedByIdx = overrideIndex;
                this._undoRecValue(r);
            }
        }
        return lastAssignmentIdx;
    }


    _rematchForOverride(key: string, svalue: any, overrideIndex: number,
                        firstAssignmentIdx: number): MatchResult {
        // start from the top down looking for that last unmasked record
        let lastMatch: MatchResult;
        let i = 0;
        for (; i < firstAssignmentIdx; i++) {
            let rec = this._entries[i];
            if (rec.maskedByIdx !== 0) {
                break;
            }
            lastMatch = rec.srec.match;
        }

        let overridesMatch: UnionMatchResult;

        // Rematch skipping over the last assignment of this property
        // and all assignments from chainging
        for (let end = this._entries.length; i < end; i++) {
            let r: Assignment = this._entries[i];
            // rematch on any unmasked records
            if (r.maskedByIdx === 0) {
                lastMatch = this._meta.match(r.srec.key, r.srec.val, lastMatch);
            } else {
                // accumulate masked ('_o') match
                overridesMatch = this._meta.unionOverrideMatch(r.srec.key, r.srec.val,
                    overridesMatch);
            }
        }

        if (isPresent(svalue) || isBlank(lastMatch)) {
            lastMatch = this._meta.match(key, svalue, lastMatch);
        }
        lastMatch.setOverridesMatch(overridesMatch);
        return lastMatch;
    }


    private _undoOverride(rec: Assignment, recIdx: number) {
        let lastAssignmentIdx = rec.srec.lastAssignmentIdx;
        let lastLastIdx: number;


        // bastick up further if necessary
        while (((lastLastIdx = this._entries[lastAssignmentIdx].srec.lastAssignmentIdx) !== -1) &&
        (this._entries[lastLastIdx].maskedByIdx === recIdx)) {
            lastAssignmentIdx = lastLastIdx;
        }

        for (let i = lastAssignmentIdx, c = this._entries.length; i < c; i++) {
            let r: Assignment = this._entries[i];

            if (r.maskedByIdx === recIdx) {
                this._values.set(r.srec.key, r.val);
                r.maskedByIdx = 0;
            }
        }
    }


    _checkMatch(match: MatchResult, key: string, value: any): void {
        match._checkMatch(this._values, this._meta);
    }

    findLastAssignmentOfKey(key: string): number {
        for (let i = this._entries.length - 1; i >= 0; i--) {
            let rec: Assignment = this._entries[i];
            if (rec.srec.key === key && rec.maskedByIdx === 0) {
                return i;
            }
        }
        return -1;
    }

    findLastAssignmentOfKeyWithValue(key: string, value: any): number {
        for (let i = this._entries.length - 1; i >= 0; i--) {
            let rec: Assignment = this._entries[i];
            if (rec.srec.key === key && !this._isNewValue(rec.val, value)) {
                return i;
            }
        }
        return -1;
    }


    /**
     * Check if we have value mirroring (property to context) to do Dynamic property mirroring will
     * be added to the currentActivation deferredAssignment list
     *
     */
    _checkApplyProperties(): boolean {

        let didSet = false;
        let numEntries = 0;
        let lastSize = 0;
        let declareKey: string = this._inDeclare() ? this._values.get(Meta.KeyDeclare) : null;

        while ((numEntries = this._entries.length) > lastSize) {
            lastSize = numEntries;
            let rec: Assignment = this._entries[numEntries - 1];
            let properties: PropertyMap = rec.srec.properties();

            let contextKeys: Array<PropertyManager> = properties.contextKeysUpdated;

            if (isPresent(contextKeys)) {

                for (let i = 0, c = contextKeys.length; i < c; i++) {

                    let propMgr: PropertyManager = contextKeys[i];
                    let key: string = propMgr._name;
                    if (isPresent(declareKey) && key === declareKey) {
                        continue;
                    }
                    // ToDo: applying resolved value -- need to defer resolution on true dynamic
                    // values Suppress chained assignment if: 1) Our parent will assign this
                    // property (has a deferred activation for it), or 2) There's already a
                    // matching assignment with higher salience
                    let newVal = this.staticallyResolveValue(properties.get(key));
                    let prevProps: PropertyMap;

                    let suppress: boolean = (isPresent(prevProps) && prevProps.has(key)
                        && !this._isNewValue(this.staticallyResolveValue(prevProps.get(key)),
                            newVal)) ||
                        (this._currentActivation._parent.hasDeferredAssignmentForKey(key)
                            /* && this._values.containsKey(key) */);

                    if (!suppress) {
                        let mirrorKey = propMgr._keyDataToSet._key;
                        if (newVal instanceof DynamicPropertyValue) {
                            // print('(deferred) chaining key: ' , propMgr._keyDataToSet._key);


                            this._currentActivation.addDeferredAssignment(mirrorKey, newVal);
                        } else {
                            // compare this value to the value from the end of the last frame
                            // print('chaining key: ' , propMgr._keyDataToSet._key);
                            if (this._set2(mirrorKey, newVal, newVal, false, true)) {
                                didSet = true;
                            }
                        }
                    } else {
                        // print('SUPPRESSED chaining key: ' , propMgr._keyDataToSet._key);
                    }
                }
            }
        }
        return didSet;
    }


    applyPropertyContextAndChain(): void {
        if (this._checkPropertyContext()) {
            while (this._checkApplyProperties()) {
                /* repeat */
            }
        }
    }


    _currentPropertyScopeKey(): string {
        let foundKey: string;
        let foundActivation: Activation;

        for (let i = this._entries.length - 1; i >= 0; i--) {
            let rec: Assignment = this._entries[i];
            if (isPresent(foundActivation) && rec.srec.activation !== foundActivation) {
                break;
            }
            if (this._meta.keyData(rec.srec.key).isPropertyScope) {
                if (!rec.srec.fromChaining) {
                    return rec.srec.key;
                }
                // for chaining assignments, we keep looking until we exhaust the first
                // non-chaining activation Todo: broken -- disabling set of context key from
                // chaining if (foundKey === null) foundKey = scopeKey;
            }
            if (isPresent(foundKey) && !rec.srec.fromChaining) {
                foundActivation = rec.srec.activation;
            }
        }
        return foundKey;

    }


    // Apply a 'property context' property (e.g. field_p for field) to the context if necessary
    _checkPropertyContext(): boolean {
        assert(this._values instanceof NestedMap, 'Property assignment on base map?');
        let scopeKey: string = this._currentPropertyScopeKey();
        if (isPresent(scopeKey)) {
            return this._set2(Meta.ScopeKey, scopeKey, scopeKey, false, false);
        }
        return false;
    }


    debug(): void {
        // set debugger breakpoint here
        print('******  Debug Call ******');
        this._logContext();
    }


    debugString(): string {
        let buffer = new StringJoiner(['<b>Context:</b>&nbsp;']);

        buffer.add('(&nbsp;');
        buffer.add(this._entries.length + '');
        buffer.add(' entries');
        buffer.add('&nbsp;)<br/>');

        for (let i = 0, c = this._entries.length; i < c; i++) {
            let sp = i;
            while (sp-- > 0) {
                buffer.add('&nbsp;');
            }


            let r: Assignment = this._entries[i];

            buffer.add('&nbsp;');
            buffer.add(r.srec.key);
            buffer.add('&nbsp;&nbsp;:&nbsp;');
            buffer.add(r.srec.val);
            buffer.add((r.srec.fromChaining ? ' ^' : ''));
            buffer.add((r.maskedByIdx !== 0 ? ' X' : ''));
            buffer.add('<br/>');
        }

        let propertyActivation: Activation = this.currentActivation._propertyActivation;
        if (isPresent(propertyActivation)) {
            let srecs: Array<StaticRec> = propertyActivation._recs;

            buffer.add('&nbsp;&nbsp;&nbsp;<b>PropertyActivation...</b><br/>');

            for (let i = 0, c = srecs.length; i < c; i++) {
                let sp = i + this._entries.length + 1;

                while (sp-- > 0) {
                    buffer.add('&nbsp;&nbsp;');
                }
                let r: StaticRec = srecs[i];
                buffer.add(r.key);
                buffer.add('&nbsp;&nbsp;:&nbsp;');
                buffer.add(r.val);
                buffer.add((r.fromChaining ? '&nbsp;&nbsp;' : '&nbsp;&nbsp;!'));
                buffer.add('<br/>');
            }
        }
        buffer.add('&nbsp;<br/><b>Props:</b><br/>');
        this.writeProperties(buffer, this.allProperties(), 1, false);

        return buffer.toString();
    }

    _logContext(): void {
        let debugString: string = this.debugString();
        print(debugString);
        print('\n');
    }

    private writeProperties(buf: StringJoiner, properties: Map<string, any>, level: number,
                            singleLine: boolean): void {
        MapWrapper.iterable(properties).forEach((value, key) => {
            if (!singleLine) {
                while (level-- > 0) {
                    buf.add('&nbsp;&nbsp;&nbsp;');
                }
            }
            if (isBlank(value)) {
                buf.add(key);
                buf.add(' :null');
                buf.add(singleLine ? ';&nbsp;&nbsp;' : ';<br/>');

            } else {
                buf.add('&nbsp;&nbsp;&nbsp;');
                buf.add(key);
                buf.add(':');

                if (isString(value) || isNumber(value)) {
                    buf.add('&nbsp;&nbsp;');
                    buf.add(value);
                    buf.add('&nbsp;&nbsp;');

                } else if (isStringMap(value)) {
                    buf.add('{');
                    buf.add(value);
                    buf.add('}');

                } else if (value instanceof Expr) {
                    buf.add(value.toString());
                } else if (value instanceof Map) {
                    buf.add(MapWrapper.toString(value));
                } else if (isArray(value)) {
                    ListWrapper.toString(value);

                } else if (value instanceof OverrideValue) {
                    buf.add(value.toString());

                } else if (value instanceof FieldPath) {
                    buf.add('$');
                    buf.add(value.toString());
                }

                if (singleLine) {
                    buf.add(';');
                } else {
                    buf.add('<br/>');
                }
            }
        });
    }


    private lastMatchWithoutContextProps() {
        return ListWrapper.isEmpty(
            this._entries) ? null : this._entries[this._entries.length - 1].srec.match;
    }


    private lastMatch() {
        if (ListWrapper.isEmpty(this._entries)) {
            return null;
        }
        let match: MatchResult = ListWrapper.last<Assignment>(this._entries)
            .propertyLocalMatches(this);
        return (isPresent(match)) ? match : this.lastMatchWithoutContextProps();

    }

    lastStaticRec(): StaticRec {
        if (ListWrapper.isEmpty(this._entries)) {
            return null;
        }
        let rec: StaticRec = ListWrapper.last(this._entries).propertyLocalStaticRec(this);
        return isPresent(rec) ? rec : ListWrapper.last(this._entries).srec;
    }


    get recPool(): Array<Assignment> {
        return this._recPool;
    }


    get currentActivation(): Activation {
        return this._currentActivation;
    }


    extendedFields(): Map<string, any> {
        return this.values;
    }
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

export class Activation {

    _recs: Array<StaticRec> = new Array<StaticRec>();
    _origEntryCount: number = 0;
    _valueNodeMapByContextKey: Map<string, Collections.Dictionary<any, any>>;
    _valueNodeMapByContextKeyChaining: Map<string, Collections.Dictionary<any, any>>;

    _propertyActivation: Activation;
    _nestedValues: NestedMap<string, any>;
    deferredAssignments: Array<DeferredAssignment>;


    constructor(public _parent?: Activation) {

    }

    getChildActivation(contextKey: string, value: any, chaining: boolean): Activation {
        if (isBlank(value)) {
            value = Meta.NullMarker;
        }

        let byKey: Map<string, Collections.Dictionary<any, any>> = (chaining)
            ? this._valueNodeMapByContextKeyChaining :
            this._valueNodeMapByContextKey;

        if (isBlank(byKey)) {
            return null;
        }
        let byVal: Collections.Dictionary<any, any> = byKey.get(contextKey);
        return (isBlank(byVal)) ? null : byVal.getValue(value);
    }

    cacheChildActivation(contextKey: string, value: any, activation: Activation,
                         chaining: boolean): void {
        if (isBlank(value)) {
            value = Meta.NullMarker;
        }

        let byKey: Map<string, Collections.Dictionary<any, any>>;
        if (chaining) {
            if (isBlank((byKey = this._valueNodeMapByContextKeyChaining))) {
                byKey = this._valueNodeMapByContextKeyChaining
                    = new Map<string, Collections.Dictionary<any, any>>();
            }
        } else {
            if (isBlank((byKey = this._valueNodeMapByContextKey))) {
                byKey = this._valueNodeMapByContextKey
                    = new Map<string, Collections.Dictionary<any, any>>();
            }

        }

        let byVal: Collections.Dictionary<any, any> = byKey.get(contextKey);
        if (isBlank(byVal)) {
            byVal = new Collections.Dictionary<any, any>();
            byKey.set(contextKey, byVal);
        }
        byVal.setValue(value, activation);
    }

    addDeferredAssignment(key: string, value: DynamicPropertyValue): void {
        let newDa: DeferredAssignment;

        if (isBlank(this.deferredAssignments)) {
            this.deferredAssignments = new Array<DeferredAssignment>();

        } else {
            for (let da of this.deferredAssignments) {
                if (da.key === key) {
                    newDa = da;
                    break;
                }
            }
        }
        if (isBlank(newDa)) {
            newDa = new DeferredAssignment();
            newDa.key = key;
            this.deferredAssignments.push(newDa);
        }
        newDa.value = value;
    }

    hasDeferredAssignmentForKey(key: string): boolean {
        if (isPresent(this.deferredAssignments)) {
            for (let da of this.deferredAssignments) {
                if (da.key === key) {
                    return true;
                }
            }
        }
        return false;
    }

    propertyActivation(context: Context): Activation {
        assert(context.currentActivation === this,
            'PropertyActivation sought on non top of stack activation');

        if (isBlank(this._propertyActivation)) {
            this._propertyActivation = context._createNewPropertyContextActivation(this);

            if (isBlank(this._propertyActivation)) {
                this._propertyActivation = this;
            } // this as null marker
        }
        return this._propertyActivation !== this ? this._propertyActivation : null;
    }


    findExistingPropertyActivation(): Activation {
        let activation: Activation = this;
        while (isPresent(activation)) {

            let propertyActivation: Activation = activation._propertyActivation;

            if (isPresent(propertyActivation) && propertyActivation !== activation
                && !(isBlank(propertyActivation._recs) || ListWrapper.isEmpty(
                    propertyActivation._recs))) {

                return propertyActivation;
            }
            activation = activation._parent;
        }
        return null;
    }


    // todo: better better to string for hashing
    toString(): string {
        return Collections.util.makeString(this);
    }
}


export class DeferredAssignment {
    key: string;
    value: DynamicPropertyValue;
}


export class AssignmentSnapshot {
    key: string;
    value: any;
    salience: number;

}

export class Assignment {
    srec: StaticRec;
    val: Object;

    maskedByIdx: number = 0;
    _didInitPropContext: boolean = false;
    _propertyLocalSrec: StaticRec;
    _propertyLocalValues: Map<string, any>;


    propertyLocalMatches(context: Context): MatchResult {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return isPresent(this._propertyLocalSrec) ? this._propertyLocalSrec.match : null;
    }

    propertyLocalStaticRec(context: Context): StaticRec {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return this._propertyLocalSrec;
    }

    propertyLocalValues(context: Context): Map<string, any> {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return this._propertyLocalValues;
    }


    initPropContext(context: Context): void {
        this._didInitPropContext = true;
        assert(!Context._ExpensiveContextConsistencyChecksEnabled || ListWrapper.last(
            context._entries) === this,
            'initing prop context on record not on top of stack');

        // Todo: base it on whether we've tries yet to process them.

        let propActivation: Activation = (this.srec.activation.propertyActivation(context));
        if (isPresent(propActivation)) {
            context._applyPropertyActivation(propActivation, this);
        }
    }


    reset(): void {
        this.srec = null;
        this.val = null;
        this.maskedByIdx = 0;
        this._didInitPropContext = false;
        this._propertyLocalSrec = null;
        this._propertyLocalValues = null;
    }

}

/**
 * The 'static' (sharable) part of a context value assignment record.
 * Theses are created by the first _Assignment that needs them
 * and then cached for re-application in their _Activation
 *  (which, in turn, is stored in the global activation tree)
 */
export class StaticRec {
    activation: Activation;
    private _key: string;
    private _val: any;
    match: MatchResult;
    salience: number = 0;
    fromChaining: boolean;
    lastAssignmentIdx: number = 0;

    properties(): PropertyMap {
        return (isPresent(this.match)) ? this.match.properties() : Context.EmptyMap;
    }

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get val(): any {
        return this._val;
    }

    set val(value: any) {
        this._val = value;
    }
}

export class PropertyAccessor {

    constructor(private context: Context) {
    }

    get(key: string): any {
        return this.context.propertyForKey(key);
    }

    toString(): string {
        return MapWrapper.toString(this.context.allProperties());
    }

}

/**
 * Snapshot is the way how to capture a current state of the context and then replay it back so.
 * for cases when we need to run some rule execution outside of the push/pop cycle
 */
export class Snapshot {

    _meta: Meta;
    _origClass: string;
    _assignments: Array<AssignmentSnapshot>;
    _allAssignments: Array<AssignmentSnapshot>;
    _isNested: boolean;


    constructor(private _context: Context) {
        this._meta = _context.meta;
        this._origClass = _context.constructor.name;
        this._assignments = _context.activeAssignments();
        this._allAssignments = _context.allAssignments();
        this._isNested = _context.isNested;

    }


    hydrate(shellCopy: boolean = true): Context {
        let assignments = (shellCopy) ? this._assignments : this._allAssignments;
        let newContext: Context = this._meta.newContext();
        newContext.push();
        let lastCnxGeneration = 1;
        for (let a of  assignments) {
            if (lastCnxGeneration < a.salience) {
                newContext.push();
            }
            newContext.set(a.key, a.value);
        }
        newContext.isNested = this._isNested;
        return newContext;
    }

}


export class ObjectMetaContext extends Context {
    static readonly DefaultLocale = 'en';

    private _formatters: Map<string, any>;

    constructor(_meta: ObjectMeta, nested: boolean = false) {
        super(_meta, nested);

    }


    get value(): any {
        let obj = this.object;

        if (isBlank(obj)) {
            return null;
        }
        let fieldPath = this.fieldPath();
        return isPresent(fieldPath) ? fieldPath.getFieldValue(obj) : this.propertyForKey('value');
    }


    set value(val: any) {
        let fieldPath = this.fieldPath();
        if (isPresent(fieldPath)) {
            assert(isPresent(this.object), 'Call to setValue() with no current object');
            fieldPath.setFieldValue(this.object, val);
        } else {
            let value = this.allProperties().get(ObjectMeta.KeyValue);
            assert(isDynamicSettable(value), 'Cant set derived property: ' + value);

            let settable: DynamicSettablePropertyValue = value;

            ((<DynamicSettablePropertyValue>value)).evaluateSet(this, val);
            settable.evaluateSet(this, val);
        }

    }

    get object(): any {
        return this.values.get(ObjectMeta.KeyObject);
    }

    get formatters(): Map<string, any> {
        if (isBlank(this._formatters)) {
            this._formatters = new Map<string, any>();
        }
        return this._formatters;
    }

    fieldPath(): FieldPath {
        let propMap: ObjectMetaPropertyMap = <ObjectMetaPropertyMap> this.allProperties();
        return propMap.fieldPath;
    }


    locale(): string {
        return ObjectMetaContext.DefaultLocale;
    }

    timezone(): number {
        return new Date().getTimezoneOffset();

    }

}

export class UIContext extends ObjectMetaContext {


    constructor(_meta: UIMeta, nested: boolean = false) {
        super(_meta, nested);
    }


    // user values from user settings/locales
    locale(): string {
        return super.locale();
    }

    timezone(): number {
        return super.timezone();
    }
}




