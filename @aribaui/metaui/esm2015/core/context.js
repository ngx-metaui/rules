/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Collections from 'typescript-collections';
import { assert, BooleanWrapper, className, Extensible, FieldPath, isArray, isBlank, isNumber, isPresent, isString, isStringMap, ListWrapper, MapWrapper, objectToName, print, StringJoiner } from '@aribaui/core';
import { Meta, OverrideValue, PropertyMap } from './meta';
import { ObjectMeta } from './object-meta';
import { UIMeta } from './uimeta';
import { NestedMap } from './nested-map';
import { DynamicPropertyValue, Expr, isDynamicSettable, StaticallyResolvable } from './property-value';
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
 * 'visible': true,
 * 'class_trait': 'fiveZones',
 * 'editable': true,
 * 'bindings': {
 * 'value': 'Default Title'
 * },
 * 'field_trait': 'required',
 * 'label': 'Title',
 * 'type': 'string',
 * 'required': true,
 * 'editing': true,
 * 'valid': '{{(value && value.length > 0) ? true : \'Answer required\'}}',
 * 'component': 'InputFieldComponent',
 * 'field': 'title',
 * 'layout_trait': 'Form',
 * 'trait': 'required',
 * 'rank': 20,
 * 'after': 'zLeft',
 * 'class': 'CheckRequest1'
 * }
 *
 * </code>
 *
 *
 *
 * <code>
 *     {
 * 'visible': true,
 * 'class_trait': 'fiveZones',
 * 'label': 'Check Request1',
 * 'zones': [
 * 'zLeft',
 * 'zRight',
 * 'zTop',
 * 'zBottom',
 * 'zDetail'
 * ],
 * 'editing': true,
 * 'layout': '*',
 * 'component': 'MetaFormComponent',
 * 'layout_trait': 'Form',
 * 'fiveZoneLayout': true,
 * 'trait': 'fiveZones',
 * 'layoutsByZone': {
 * },
 * 'class': 'CheckRequest1',
 * 'fieldsByZone': {
 * 'zLeft': [
 * 'title',
 * 'name'
 * ],
 * 'zNone': [
 * 'fullName'
 * ]
 * }
 * }
 *
 * </code>
 *
 *
 *
 */
export class Context extends Extensible {
    /**
     * @param {?} _meta
     * @param {?=} nested
     */
    constructor(_meta, nested = false) {
        super();
        this._meta = _meta;
        this.nested = nested;
        this._values = new Map();
        this._entries = [];
        this._frameStarts = [];
        this._recPool = [];
        if (isBlank(Context.EmptyMap)) {
            Context.EmptyMap = new PropertyMap();
        }
        Context._Debug_SetsCount = 0;
        this._accessor = new PropertyAccessor(this);
        this._currentActivation = Context.getActivationTree(_meta);
        this._rootNode = this._currentActivation;
        this.isNested = nested;
    }
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
     * @param {?} meta
     * @return {?}
     */
    static getActivationTree(meta) {
        /** @type {?} */
        let name = objectToName(Activation);
        /** @type {?} */
        let root = meta.identityCache.getValue(name);
        if (isBlank(root)) {
            root = new Activation();
            meta.identityCache.setValue(name, root);
        }
        return root;
    }
    /**
     * @return {?}
     */
    push() {
        this._frameStarts.push(this._entries.length);
    }
    /**
     * @return {?}
     */
    get meta() {
        return this._meta;
    }
    /**
     * @return {?}
     */
    pop() {
        /** @type {?} */
        let size = this._frameStarts.length;
        assert(size > 0, 'Popping empty stack');
        /** @type {?} */
        let pos = this._frameStarts.pop();
        /** @type {?} */
        let entriesSize;
        while ((entriesSize = this._entries.length) > pos) {
            /** @type {?} */
            let recIdx = entriesSize - 1;
            /** @type {?} */
            let rec = this._entries.splice(recIdx, 1)[0];
            if (rec.srec.lastAssignmentIdx === -1) {
                this._values.delete(rec.srec.key);
            }
            else {
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
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        this._set(key, value, false, false);
        // implement default toString for our object so we can retrieve objectTitle
        if (key === ObjectMeta.KeyObject) {
            /** @type {?} */
            let toCheck = this._values.get(ObjectMeta.KeyObject);
            if (isBlank(toCheck['$toString'])) {
                toCheck['$toString'] = () => {
                    /** @type {?} */
                    let clazz = this.values.get(ObjectMeta.KeyClass);
                    return UIMeta.beautifyClassName(clazz);
                };
            }
        }
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    merge(key, value) {
        this._set(key, value, true, false);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    setScopeKey(key) {
        assert(this._meta.keyData(key).isPropertyScope, key + ' is not a valid context key');
        /** @type {?} */
        let current = this._currentPropertyScopeKey();
        // Assert.that(current != null, 'Can't set %s as context key when no context key on stack',
        // key); TODO: if current key isChaining then we need to set again to get a non-chaining
        // assignment
        if (!(key === current)) {
            /** @type {?} */
            let val = this.values.get(key);
            // Assert.that(val != null, 'Can't set %s as context key when it has no value already
            // on the context', key);
            if (isBlank(val)) {
                val = Meta.KeyAny;
            }
            this.set(key, val);
        }
    }
    /**
     * @return {?}
     */
    get values() {
        /** @type {?} */
        let propVals;
        return (ListWrapper.isEmpty(this._entries) ||
            isBlank(propVals = (ListWrapper.last(this._entries)).propertyLocalValues(this))) ? this._values : propVals;
    }
    /**
     * @return {?}
     */
    get properties() {
        return this._accessor;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    propertyForKey(key) {
        /** @type {?} */
        let val = this.allProperties().get(key);
        return this.resolveValue(val);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    listPropertyForKey(key) {
        /** @type {?} */
        let val = this.propertyForKey(key);
        return (isBlank(val)) ? [] : (isArray(val)) ? val : [val];
    }
    /**
     * @param {?} key
     * @param {?} defaultVal
     * @return {?}
     */
    booleanPropertyForKey(key, defaultVal) {
        /** @type {?} */
        let val = this.propertyForKey(key);
        return (isBlank(val)) ? defaultVal : BooleanWrapper.boleanValue(val);
    }
    /**
     * @return {?}
     */
    allProperties() {
        if (isBlank(this._currentProperties)) {
            /** @type {?} */
            let m = this.lastMatch();
            if (isPresent(m)) {
                this._currentProperties = m.properties();
            }
        }
        return isPresent(this._currentProperties) ? this._currentProperties : Context.EmptyMap;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resolveValue(value) {
        /** @type {?} */
        let lastValue;
        while (value !== lastValue && isPresent(value) && value instanceof DynamicPropertyValue) {
            lastValue = value;
            /** @type {?} */
            let propValue = value;
            if (propValue instanceof Expr) {
                propValue.addTypeToContext('UIMeta', UIMeta);
            }
            value = propValue.evaluate(this);
        }
        return value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    staticallyResolveValue(value) {
        /** @type {?} */
        let lastValue = null;
        while (value !== lastValue && isPresent(value) && value instanceof StaticallyResolvable) {
            lastValue = value;
            value = value.evaluate(this);
        }
        return value;
    }
    /**
     * @param {?} contextVals
     * @param {?} propertyKey
     * @param {?} staticResolve
     * @return {?}
     */
    pushAndResolveStatic(contextVals, propertyKey, staticResolve) {
        /** @type {?} */
        let scopeKey;
        this.push();
        MapWrapper.iterable(contextVals).forEach((value, key) => {
            if ('*' === value) {
                scopeKey = key;
            }
            else {
                this.set(key, value);
            }
        });
        if (isPresent(scopeKey)) {
            this.setScopeKey(scopeKey);
        }
        /** @type {?} */
        let val = this.allProperties().get(propertyKey);
        val = staticResolve ? this.staticallyResolveValue(val) : this.resolveValue(val);
        this.pop();
        return val;
    }
    /**
     * @param {?} contextVals
     * @param {?} propertyKey
     * @return {?}
     */
    pushAndResolve(contextVals, propertyKey) {
        return this.pushAndResolveStatic(contextVals, propertyKey, false);
    }
    /**
     * @return {?}
     */
    snapshot() {
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
     * @return {?}
     */
    activeAssignments() {
        /** @type {?} */
        let list = new Array();
        for (let i = 0, c = this._entries.length; i < c; i++) {
            /** @type {?} */
            let rec = this._entries[i];
            if (rec.maskedByIdx === 0 && !rec.srec.fromChaining) {
                /** @type {?} */
                let a = new AssignmentSnapshot();
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
     * @return {?}
     */
    allAssignments() {
        /** @type {?} */
        let list = new Array();
        for (let i = 0, c = this._entries.length; i < c; i++) {
            /** @type {?} */
            let rec = this._entries[i];
            if (!rec.srec.fromChaining) {
                /** @type {?} */
                let a = new AssignmentSnapshot();
                a.key = rec.srec.key;
                a.value = rec.val;
                a.salience = rec.srec.salience;
                list.push(a);
            }
        }
        return list;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} merge
     * @param {?} chaining
     * @return {?}
     */
    _set(key, value, merge, chaining) {
        /** @type {?} */
        let sval = this._meta.transformValue(key, value);
        /** @type {?} */
        let didSet = false;
        /** @type {?} */
        let registry = (/** @type {?} */ (this.meta)).componentRegistry;
        if (key === ObjectMeta.KeyObject && isPresent(registry)) {
            registry.registerType(className(value), value.constructor);
        }
        /** @type {?} */
        let activation = this._currentActivation.getChildActivation(key, sval, chaining);
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
    /**
     * @return {?}
     */
    newContextRec() {
        /** @type {?} */
        let count = this._recPool.length;
        return (count > 0) ? this._recPool.splice(count - 1, 1)[0] : new Assignment();
    }
    /**
     * Cached case: apply a previously computed Activation
     * @param {?} activation
     * @param {?} firstVal
     * @return {?}
     */
    _applyActivation(activation, firstVal) {
        assert(activation._parent === this._currentActivation, 'Attempt to apply activation on mismatched parent');
        if (this._entries.length !== activation._origEntryCount) {
            assert(false, 'Mismatched context stack size (%s) from when activation was popped ' +
                this._entries.length + ' ' + activation._origEntryCount);
        }
        /** @type {?} */
        let count = activation._recs.length;
        if (count === 0) {
            return false;
        }
        for (let i = 0; i < count; i++) {
            /** @type {?} */
            let srec = activation._recs[i];
            /** @type {?} */
            let rec = this.newContextRec();
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
    /**
     * @return {?}
     */
    awakeCurrentActivation() {
        /** @type {?} */
        let currentActivation = this._currentActivation;
        /** @type {?} */
        let deferredAssignments = currentActivation.deferredAssignments;
        if (isPresent(deferredAssignments)) {
            this.applyDeferredAssignments(deferredAssignments);
        }
    }
    /**
     * @param {?} deferredAssignments
     * @return {?}
     */
    applyDeferredAssignments(deferredAssignments) {
        for (let da of deferredAssignments) {
            /** @type {?} */
            let currentPropValue = this.staticallyResolveValue(this.allProperties().get(da.key));
            if (da.value === currentPropValue) {
                /** @type {?} */
                let resolvedValue = this.resolveValue(da.value);
                this._set(da.key, resolvedValue, false, true);
            }
            else {
                // print('_set SKIPPING deferred assignment of derived value: %s <- %s --' +
                //     ' no longer matches property in context: %s' , da.key , da.value ,
                // currentPropValue);
            }
        }
    }
    /**
     * @return {?}
     */
    _inDeclare() {
        /** @type {?} */
        let match = this.lastMatchWithoutContextProps();
        return isPresent(match) && (match._keysMatchedMask & this._meta.declareKeyMask) !== 0;
    }
    /**
     * Non-cached access: create a new activation
     * @param {?} key
     * @param {?} svalue
     * @param {?} value
     * @param {?} merge
     * @param {?} chaining
     * @return {?}
     */
    _createNewFrameForSet(key, svalue, value, merge, chaining) {
        /** @type {?} */
        let lastActivation = this._currentActivation;
        /** @type {?} */
        let newActivation = new Activation(lastActivation);
        newActivation._origEntryCount = this._entries.length;
        this._currentActivation = newActivation;
        /** @type {?} */
        let didSet = this._set2(key, svalue, value, merge, chaining);
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
     * @param {?} parentActivation
     * @return {?}
     */
    _createNewPropertyContextActivation(parentActivation) {
        this.push();
        /** @type {?} */
        let propActivation = new Activation(parentActivation);
        propActivation._origEntryCount = this._entries.length;
        this._currentActivation = propActivation;
        /** @type {?} */
        let origValues = this._values;
        /** @type {?} */
        let nestedMap = new NestedMap(origValues);
        this._values = nestedMap;
        this.applyPropertyContextAndChain();
        if (propActivation._recs.length > 0 || isPresent(propActivation.deferredAssignments)) {
            propActivation._nestedValues = nestedMap;
            this._values = Context.EmptyRemoveMap; // hack -- empty map so that undo is noop --
            // ((NestedMap)_values).dup();
        }
        else {
            propActivation = null;
        }
        this.pop();
        this._values = origValues;
        this._currentActivation = parentActivation;
        return propActivation;
    }
    /**
     * @param {?} propActivation
     * @param {?} rec
     * @return {?}
     */
    _applyPropertyActivation(propActivation, rec) {
        /** @type {?} */
        let propValues = this._values;
        if (isPresent(propActivation._nestedValues)) {
            propValues = propActivation._nestedValues.reparentedMap(propValues);
        }
        // set up propLocal results
        // Now, see if we need to compute a dynamic property activation as well
        if (isPresent(propActivation.deferredAssignments)) {
            this.push();
            /** @type {?} */
            let origValues = this._values;
            this._values = new NestedMap(propValues);
            this._applyActivation(propActivation, Meta.NullMarker);
            this.applyDeferredAssignments(propActivation.deferredAssignments);
            rec._propertyLocalValues = this._values;
            rec._propertyLocalSrec = ListWrapper.last(this._entries).srec;
            this._values = Context.EmptyRemoveMap; // hack -- empty map so that undo is noop --
            // ((NestedMap)_values).dup();
            this.pop();
            this._values = origValues;
        }
        else {
            // can use static versions
            rec._propertyLocalValues = propValues;
            rec._propertyLocalSrec = ListWrapper.last(propActivation._recs);
        }
    }
    /**
     * @param {?} oldVal
     * @param {?} newVal
     * @return {?}
     */
    _isNewValue(oldVal, newVal) {
        return (oldVal !== newVal && (isPresent(oldVal) ||
            (!oldVal === newVal && (!isArray(oldVal)) || !(ListWrapper.contains(oldVal, newVal)))));
    }
    /**
     * @return {?}
     */
    isDeclare() {
        return isPresent(this.propertyForKey(Meta.KeyDeclare));
    }
    /**
     * @return {?}
     */
    assertContextConsistent() {
        if (!Context._ExpensiveContextConsistencyChecksEnabled) {
            return;
        }
        // Verify that each value in context has matching (enabled) context record
        MapWrapper.iterable(this._values).forEach((value, key) => {
            /** @type {?} */
            let lastAssignmentIdx = this.findLastAssignmentOfKey(key);
            assert(lastAssignmentIdx >= 0, 'Value in context but no assignment record found ' +
                key + ' = ' + value);
            /** @type {?} */
            let contextVal = this._entries[lastAssignmentIdx].val;
            assert(value === contextVal || (isPresent(value) && value === contextVal), 'Value in context  doesnt match value on stack ' + value + ' / ' + contextVal);
        });
        // check entries for proper relationship with any previous records that they override
        for (let i = this._entries.length - 1; i >= 0; i--) {
            /** @type {?} */
            let r = this._entries[i];
            /** @type {?} */
            let foundFirst = false;
            for (let j = i - 1; j >= 0; j--) {
                /** @type {?} */
                let pred = this._entries[j];
                if (pred.srec.key === r.srec.key) {
                    // Predecessors must be masked
                    assert((!foundFirst && pred.maskedByIdx === i) ||
                        ((foundFirst || pred.srec.fromChaining) && pred.maskedByIdx > 0), 'Predecessor A does not have matching maskedByIdx B  for override C:' +
                        pred.srec.key + ' = ' + pred.val + ', ' + pred.maskedByIdx + ', ' +
                        i + ' = ' + r.val);
                    assert(((!foundFirst && r.srec.lastAssignmentIdx === j) || foundFirst ||
                        pred.srec.fromChaining), 'Override A1=A2 does not have proper lastAssignmentIdx B1!=B2 ' +
                        'for predecessor C' +
                        pred.srec.key + ' = ' + pred.val + ', ' + r.srec.lastAssignmentIdx + ' = ' +
                        j + ', ' + pred.val);
                    foundFirst = true;
                }
            }
        }
    }
    /**
     * @param {?} key
     * @param {?} svalue
     * @param {?} value
     * @param {?} merge
     * @param {?} isChaining
     * @return {?}
     */
    _set2(key, svalue, value, merge, isChaining) {
        Context._Debug_SetsCount++;
        /** @type {?} */
        let hasOldValue = this._values.has(key) && isPresent(this._values.get(key));
        /** @type {?} */
        let oldVal = hasOldValue ? this._values.get(key) : null;
        /** @type {?} */
        let isNewValue = !hasOldValue || this._isNewValue(oldVal, value);
        /** @type {?} */
        let matchingPropKeyAssignment = !isNewValue && !isChaining &&
            ((this._meta.keyData(key).isPropertyScope) &&
                key !== this._currentPropertyScopeKey());
        if (isNewValue || matchingPropKeyAssignment) {
            /** @type {?} */
            let lastMatch;
            /** @type {?} */
            let newMatch;
            /** @type {?} */
            let salience = this._frameStarts.length;
            /** @type {?} */
            let lastAssignmentIdx = -1;
            if (isBlank(oldVal)) {
                lastMatch = this.lastMatchWithoutContextProps();
            }
            else {
                /** @type {?} */
                let recIdx = this._entries.length;
                lastAssignmentIdx = this.findLastAssignmentOfKey(key);
                assert(lastAssignmentIdx >= 0, 'Value in context but no assignment record found ' + key + ' = ' + oldVal);
                if (matchingPropKeyAssignment) {
                    // cheap version of masking for a matching set:
                    this._entries[lastAssignmentIdx].maskedByIdx = recIdx;
                    lastMatch = this.lastMatchWithoutContextProps();
                }
                else {
                    /** @type {?} */
                    let oldRec = this._entries[lastAssignmentIdx];
                    if (oldRec.srec.salience === salience) {
                        /** @type {?} */
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
                    /** @type {?} */
                    let firstAssignmentIdx = this._prepareForOverride(recIdx, lastAssignmentIdx);
                    newMatch = this._rematchForOverride(key, svalue, recIdx, firstAssignmentIdx);
                    if (merge) {
                        value = Meta.PropertyMerger_List.merge(oldVal, value, this.isDeclare());
                    }
                }
            }
            assert(this._entries.length <= Context.MaxContextStackSize, 'MetaUI context stack exceeded max size -- likely infinite chaining: ' +
                this._entries.length);
            /** @type {?} */
            let srec = new StaticRec();
            srec.key = key;
            // todo: conversion
            srec.val = svalue;
            srec.lastAssignmentIdx = lastAssignmentIdx;
            srec.salience = salience;
            srec.fromChaining = isChaining;
            if (isBlank(newMatch)) {
                newMatch = (isPresent(value)) ? this._meta.match(key, svalue, lastMatch) : lastMatch;
            }
            srec.match = newMatch;
            srec.activation = this._currentActivation;
            this._currentActivation._recs.push(srec);
            /** @type {?} */
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
        }
        else {
            // print('Context skipped assignment of matching property value %s = %s (isChaining ==
            // %s, isPropKey == %s)', key, value, isChaining,
            // (this._meta.keyData(key).isPropertyScope));
            if (!isChaining && this.meta.keyData(key).isPropertyScope) {
                // slam down a rec for property context
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    get frameStarts() {
        return this._frameStarts;
    }
    /**
     * @param {?} rec
     * @return {?}
     */
    _undoRecValue(rec) {
        if (rec.srec.lastAssignmentIdx === -1 ||
            this._entries[rec.srec.lastAssignmentIdx].maskedByIdx > 0) {
            this._values.delete(rec.srec.key);
        }
        else {
            this._values.set(rec.srec.key, this._entries[rec.srec.lastAssignmentIdx].val);
        }
    }
    /**
     * @param {?} overrideIndex
     * @param {?} lastAssignmentIdx
     * @return {?}
     */
    _prepareForOverride(overrideIndex, lastAssignmentIdx) {
        /** @type {?} */
        let lastLastIdx = 0;
        while (((lastLastIdx = this._entries[lastAssignmentIdx].srec.lastAssignmentIdx) !== -1) &&
            (this._entries[lastAssignmentIdx].maskedByIdx <= 0)) {
            // mark it! (we'll pick it up below...)
            this._entries[lastAssignmentIdx].maskedByIdx = -1;
            lastAssignmentIdx = lastLastIdx;
        }
        // undo all conflicting or dervied assignments (and mark them)
        for (let i = this._entries.length - 1; i >= lastAssignmentIdx; i--) {
            /** @type {?} */
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
    /**
     * @param {?} key
     * @param {?} svalue
     * @param {?} overrideIndex
     * @param {?} firstAssignmentIdx
     * @return {?}
     */
    _rematchForOverride(key, svalue, overrideIndex, firstAssignmentIdx) {
        /** @type {?} */
        let lastMatch;
        /** @type {?} */
        let i = 0;
        for (; i < firstAssignmentIdx; i++) {
            /** @type {?} */
            let rec = this._entries[i];
            if (rec.maskedByIdx !== 0) {
                break;
            }
            lastMatch = rec.srec.match;
        }
        /** @type {?} */
        let overridesMatch;
        // Rematch skipping over the last assignment of this property
        // and all assignments from chainging
        for (let end = this._entries.length; i < end; i++) {
            /** @type {?} */
            let r = this._entries[i];
            // rematch on any unmasked records
            if (r.maskedByIdx === 0) {
                lastMatch = this._meta.match(r.srec.key, r.srec.val, lastMatch);
            }
            else {
                // accumulate masked ('_o') match
                overridesMatch = this._meta.unionOverrideMatch(r.srec.key, r.srec.val, overridesMatch);
            }
        }
        if (isPresent(svalue) || isBlank(lastMatch)) {
            lastMatch = this._meta.match(key, svalue, lastMatch);
        }
        lastMatch.setOverridesMatch(overridesMatch);
        return lastMatch;
    }
    /**
     * @param {?} rec
     * @param {?} recIdx
     * @return {?}
     */
    _undoOverride(rec, recIdx) {
        /** @type {?} */
        let lastAssignmentIdx = rec.srec.lastAssignmentIdx;
        /** @type {?} */
        let lastLastIdx;
        // bastick up further if necessary
        while (((lastLastIdx = this._entries[lastAssignmentIdx].srec.lastAssignmentIdx) !== -1) &&
            (this._entries[lastLastIdx].maskedByIdx === recIdx)) {
            lastAssignmentIdx = lastLastIdx;
        }
        for (let i = lastAssignmentIdx, c = this._entries.length; i < c; i++) {
            /** @type {?} */
            let r = this._entries[i];
            if (r.maskedByIdx === recIdx) {
                this._values.set(r.srec.key, r.val);
                r.maskedByIdx = 0;
            }
        }
    }
    /**
     * @param {?} match
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    _checkMatch(match, key, value) {
        match._checkMatch(this._values, this._meta);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    findLastAssignmentOfKey(key) {
        for (let i = this._entries.length - 1; i >= 0; i--) {
            /** @type {?} */
            let rec = this._entries[i];
            if (rec.srec.key === key && rec.maskedByIdx === 0) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    findLastAssignmentOfKeyWithValue(key, value) {
        for (let i = this._entries.length - 1; i >= 0; i--) {
            /** @type {?} */
            let rec = this._entries[i];
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
     * @return {?}
     */
    _checkApplyProperties() {
        /** @type {?} */
        let didSet = false;
        /** @type {?} */
        let numEntries = 0;
        /** @type {?} */
        let lastSize = 0;
        /** @type {?} */
        let declareKey = this._inDeclare() ? this._values.get(Meta.KeyDeclare) : null;
        while ((numEntries = this._entries.length) > lastSize) {
            lastSize = numEntries;
            /** @type {?} */
            let rec = this._entries[numEntries - 1];
            /** @type {?} */
            let properties = rec.srec.properties();
            /** @type {?} */
            let contextKeys = properties.contextKeysUpdated;
            if (isPresent(contextKeys)) {
                for (let i = 0, c = contextKeys.length; i < c; i++) {
                    /** @type {?} */
                    let propMgr = contextKeys[i];
                    /** @type {?} */
                    let key = propMgr._name;
                    if (isPresent(declareKey) && key === declareKey) {
                        continue;
                    }
                    /** @type {?} */
                    let newVal = this.staticallyResolveValue(properties.get(key));
                    /** @type {?} */
                    let prevProps;
                    /** @type {?} */
                    let suppress = (isPresent(prevProps) && prevProps.has(key)
                        && !this._isNewValue(this.staticallyResolveValue(prevProps.get(key)), newVal)) ||
                        (this._currentActivation._parent.hasDeferredAssignmentForKey(key));
                    if (!suppress) {
                        /** @type {?} */
                        let mirrorKey = propMgr._keyDataToSet._key;
                        if (newVal instanceof DynamicPropertyValue) {
                            // print('(deferred) chaining key: ' , propMgr._keyDataToSet._key);
                            this._currentActivation.addDeferredAssignment(mirrorKey, newVal);
                        }
                        else {
                            // compare this value to the value from the end of the last frame
                            // print('chaining key: ' , propMgr._keyDataToSet._key);
                            if (this._set2(mirrorKey, newVal, newVal, false, true)) {
                                didSet = true;
                            }
                        }
                    }
                    else {
                        // print('SUPPRESSED chaining key: ' , propMgr._keyDataToSet._key);
                    }
                }
            }
        }
        return didSet;
    }
    /**
     * @return {?}
     */
    applyPropertyContextAndChain() {
        if (this._checkPropertyContext()) {
            while (this._checkApplyProperties()) {
                /* repeat */
            }
        }
    }
    /**
     * @return {?}
     */
    _currentPropertyScopeKey() {
        /** @type {?} */
        let foundKey;
        /** @type {?} */
        let foundActivation;
        for (let i = this._entries.length - 1; i >= 0; i--) {
            /** @type {?} */
            let rec = this._entries[i];
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
    /**
     * @return {?}
     */
    _checkPropertyContext() {
        assert(this._values instanceof NestedMap, 'Property assignment on base map?');
        /** @type {?} */
        let scopeKey = this._currentPropertyScopeKey();
        if (isPresent(scopeKey)) {
            return this._set2(Meta.ScopeKey, scopeKey, scopeKey, false, false);
        }
        return false;
    }
    /**
     * @return {?}
     */
    debug() {
        // set debugger breakpoint here
        print('******  Debug Call ******');
        this._logContext();
    }
    /**
     * @return {?}
     */
    debugString() {
        /** @type {?} */
        let buffer = new StringJoiner(['<b>Context:</b>&nbsp;']);
        buffer.add('(&nbsp;');
        buffer.add(this._entries.length + '');
        buffer.add(' entries');
        buffer.add('&nbsp;)<br/>');
        for (let i = 0, c = this._entries.length; i < c; i++) {
            /** @type {?} */
            let sp = i;
            while (sp-- > 0) {
                buffer.add('&nbsp;');
            }
            /** @type {?} */
            let r = this._entries[i];
            buffer.add('&nbsp;');
            buffer.add(r.srec.key);
            buffer.add('&nbsp;&nbsp;:&nbsp;');
            buffer.add(r.srec.val);
            buffer.add((r.srec.fromChaining ? ' ^' : ''));
            buffer.add((r.maskedByIdx !== 0 ? ' X' : ''));
            buffer.add('<br/>');
        }
        /** @type {?} */
        let propertyActivation = this.currentActivation._propertyActivation;
        if (isPresent(propertyActivation)) {
            /** @type {?} */
            let srecs = propertyActivation._recs;
            buffer.add('&nbsp;&nbsp;&nbsp;<b>PropertyActivation...</b><br/>');
            for (let i = 0, c = srecs.length; i < c; i++) {
                /** @type {?} */
                let sp = i + this._entries.length + 1;
                while (sp-- > 0) {
                    buffer.add('&nbsp;&nbsp;');
                }
                /** @type {?} */
                let r = srecs[i];
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
    /**
     * @return {?}
     */
    _logContext() {
        /** @type {?} */
        let debugString = this.debugString();
        print(debugString);
        print('\n');
    }
    /**
     * @param {?} buf
     * @param {?} properties
     * @param {?} level
     * @param {?} singleLine
     * @return {?}
     */
    writeProperties(buf, properties, level, singleLine) {
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
            }
            else {
                buf.add('&nbsp;&nbsp;&nbsp;');
                buf.add(key);
                buf.add(':');
                if (isString(value) || isNumber(value)) {
                    buf.add('&nbsp;&nbsp;');
                    buf.add(value);
                    buf.add('&nbsp;&nbsp;');
                }
                else if (isStringMap(value)) {
                    buf.add('{');
                    buf.add(value);
                    buf.add('}');
                }
                else if (value instanceof Expr) {
                    buf.add(value.toString());
                }
                else if (value instanceof Map) {
                    buf.add(MapWrapper.toString(value));
                }
                else if (isArray(value)) {
                    ListWrapper.toString(value);
                }
                else if (value instanceof OverrideValue) {
                    buf.add(value.toString());
                }
                else if (value instanceof FieldPath) {
                    buf.add('$');
                    buf.add(value.toString());
                }
                if (singleLine) {
                    buf.add(';');
                }
                else {
                    buf.add('<br/>');
                }
            }
        });
    }
    /**
     * @return {?}
     */
    lastMatchWithoutContextProps() {
        return ListWrapper.isEmpty(this._entries) ? null : this._entries[this._entries.length - 1].srec.match;
    }
    /**
     * @return {?}
     */
    lastMatch() {
        if (ListWrapper.isEmpty(this._entries)) {
            return null;
        }
        /** @type {?} */
        let match = ListWrapper.last(this._entries)
            .propertyLocalMatches(this);
        return (isPresent(match)) ? match : this.lastMatchWithoutContextProps();
    }
    /**
     * @return {?}
     */
    lastStaticRec() {
        if (ListWrapper.isEmpty(this._entries)) {
            return null;
        }
        /** @type {?} */
        let rec = ListWrapper.last(this._entries).propertyLocalStaticRec(this);
        return isPresent(rec) ? rec : ListWrapper.last(this._entries).srec;
    }
    /**
     * @return {?}
     */
    get recPool() {
        return this._recPool;
    }
    /**
     * @return {?}
     */
    get currentActivation() {
        return this._currentActivation;
    }
    /**
     * @return {?}
     */
    extendedFields() {
        return this.values;
    }
}
Context._CacheActivations = false;
Context._ExpensiveContextConsistencyChecksEnabled = false;
Context._DebugRuleMatches = false;
Context._Debug_SetsCount = 0;
Context.MaxContextStackSize = 200;
Context.EmptyMap = null;
Context.EmptyRemoveMap = new Map();
if (false) {
    /** @type {?} */
    Context._CacheActivations;
    /** @type {?} */
    Context._ExpensiveContextConsistencyChecksEnabled;
    /** @type {?} */
    Context._DebugRuleMatches;
    /** @type {?} */
    Context._Debug_SetsCount;
    /** @type {?} */
    Context.MaxContextStackSize;
    /** @type {?} */
    Context.EmptyMap;
    /** @type {?} */
    Context.EmptyRemoveMap;
    /** @type {?} */
    Context.prototype._values;
    /** @type {?} */
    Context.prototype._entries;
    /** @type {?} */
    Context.prototype._frameStarts;
    /** @type {?} */
    Context.prototype._currentProperties;
    /** @type {?} */
    Context.prototype._rootNode;
    /** @type {?} */
    Context.prototype._currentActivation;
    /** @type {?} */
    Context.prototype._recPool;
    /** @type {?} */
    Context.prototype._accessor;
    /** @type {?} */
    Context.prototype.isNested;
    /** @type {?} */
    Context.prototype._meta;
    /** @type {?} */
    Context.prototype.nested;
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
    /**
     * @param {?=} _parent
     */
    constructor(_parent) {
        this._parent = _parent;
        this._recs = new Array();
        this._origEntryCount = 0;
    }
    /**
     * @param {?} contextKey
     * @param {?} value
     * @param {?} chaining
     * @return {?}
     */
    getChildActivation(contextKey, value, chaining) {
        if (isBlank(value)) {
            value = Meta.NullMarker;
        }
        /** @type {?} */
        let byKey = (chaining)
            ? this._valueNodeMapByContextKeyChaining :
            this._valueNodeMapByContextKey;
        if (isBlank(byKey)) {
            return null;
        }
        /** @type {?} */
        let byVal = byKey.get(contextKey);
        return (isBlank(byVal)) ? null : byVal.getValue(value);
    }
    /**
     * @param {?} contextKey
     * @param {?} value
     * @param {?} activation
     * @param {?} chaining
     * @return {?}
     */
    cacheChildActivation(contextKey, value, activation, chaining) {
        if (isBlank(value)) {
            value = Meta.NullMarker;
        }
        /** @type {?} */
        let byKey;
        if (chaining) {
            if (isBlank((byKey = this._valueNodeMapByContextKeyChaining))) {
                byKey = this._valueNodeMapByContextKeyChaining
                    = new Map();
            }
        }
        else {
            if (isBlank((byKey = this._valueNodeMapByContextKey))) {
                byKey = this._valueNodeMapByContextKey
                    = new Map();
            }
        }
        /** @type {?} */
        let byVal = byKey.get(contextKey);
        if (isBlank(byVal)) {
            byVal = new Collections.Dictionary();
            byKey.set(contextKey, byVal);
        }
        byVal.setValue(value, activation);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    addDeferredAssignment(key, value) {
        /** @type {?} */
        let newDa;
        if (isBlank(this.deferredAssignments)) {
            this.deferredAssignments = new Array();
        }
        else {
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
    /**
     * @param {?} key
     * @return {?}
     */
    hasDeferredAssignmentForKey(key) {
        if (isPresent(this.deferredAssignments)) {
            for (let da of this.deferredAssignments) {
                if (da.key === key) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    propertyActivation(context) {
        assert(context.currentActivation === this, 'PropertyActivation sought on non top of stack activation');
        if (isBlank(this._propertyActivation)) {
            this._propertyActivation = context._createNewPropertyContextActivation(this);
            if (isBlank(this._propertyActivation)) {
                this._propertyActivation = this;
            } // this as null marker
        }
        return this._propertyActivation !== this ? this._propertyActivation : null;
    }
    /**
     * @return {?}
     */
    findExistingPropertyActivation() {
        /** @type {?} */
        let activation = this;
        while (isPresent(activation)) {
            /** @type {?} */
            let propertyActivation = activation._propertyActivation;
            if (isPresent(propertyActivation) && propertyActivation !== activation
                && !(isBlank(propertyActivation._recs) || ListWrapper.isEmpty(propertyActivation._recs))) {
                return propertyActivation;
            }
            activation = activation._parent;
        }
        return null;
    }
    /**
     * @return {?}
     */
    toString() {
        return Collections.util.makeString(this);
    }
}
if (false) {
    /** @type {?} */
    Activation.prototype._recs;
    /** @type {?} */
    Activation.prototype._origEntryCount;
    /** @type {?} */
    Activation.prototype._valueNodeMapByContextKey;
    /** @type {?} */
    Activation.prototype._valueNodeMapByContextKeyChaining;
    /** @type {?} */
    Activation.prototype._propertyActivation;
    /** @type {?} */
    Activation.prototype._nestedValues;
    /** @type {?} */
    Activation.prototype.deferredAssignments;
    /** @type {?} */
    Activation.prototype._parent;
}
export class DeferredAssignment {
}
if (false) {
    /** @type {?} */
    DeferredAssignment.prototype.key;
    /** @type {?} */
    DeferredAssignment.prototype.value;
}
export class AssignmentSnapshot {
}
if (false) {
    /** @type {?} */
    AssignmentSnapshot.prototype.key;
    /** @type {?} */
    AssignmentSnapshot.prototype.value;
    /** @type {?} */
    AssignmentSnapshot.prototype.salience;
}
export class Assignment {
    constructor() {
        this.maskedByIdx = 0;
        this._didInitPropContext = false;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    propertyLocalMatches(context) {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return isPresent(this._propertyLocalSrec) ? this._propertyLocalSrec.match : null;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    propertyLocalStaticRec(context) {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return this._propertyLocalSrec;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    propertyLocalValues(context) {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return this._propertyLocalValues;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    initPropContext(context) {
        this._didInitPropContext = true;
        assert(!Context._ExpensiveContextConsistencyChecksEnabled || ListWrapper.last(context._entries) === this, 'initing prop context on record not on top of stack');
        /** @type {?} */
        let propActivation = (this.srec.activation.propertyActivation(context));
        if (isPresent(propActivation)) {
            context._applyPropertyActivation(propActivation, this);
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this.srec = null;
        this.val = null;
        this.maskedByIdx = 0;
        this._didInitPropContext = false;
        this._propertyLocalSrec = null;
        this._propertyLocalValues = null;
    }
}
if (false) {
    /** @type {?} */
    Assignment.prototype.srec;
    /** @type {?} */
    Assignment.prototype.val;
    /** @type {?} */
    Assignment.prototype.maskedByIdx;
    /** @type {?} */
    Assignment.prototype._didInitPropContext;
    /** @type {?} */
    Assignment.prototype._propertyLocalSrec;
    /** @type {?} */
    Assignment.prototype._propertyLocalValues;
}
/**
 * The 'static' (sharable) part of a context value assignment record.
 * Theses are created by the first _Assignment that needs them
 * and then cached for re-application in their _Activation
 *  (which, in turn, is stored in the global activation tree)
 */
export class StaticRec {
    constructor() {
        this.salience = 0;
        this.lastAssignmentIdx = 0;
    }
    /**
     * @return {?}
     */
    properties() {
        return (isPresent(this.match)) ? this.match.properties() : Context.EmptyMap;
    }
    /**
     * @return {?}
     */
    get key() {
        return this._key;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set key(value) {
        this._key = value;
    }
    /**
     * @return {?}
     */
    get val() {
        return this._val;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set val(value) {
        this._val = value;
    }
}
if (false) {
    /** @type {?} */
    StaticRec.prototype.activation;
    /** @type {?} */
    StaticRec.prototype._key;
    /** @type {?} */
    StaticRec.prototype._val;
    /** @type {?} */
    StaticRec.prototype.match;
    /** @type {?} */
    StaticRec.prototype.salience;
    /** @type {?} */
    StaticRec.prototype.fromChaining;
    /** @type {?} */
    StaticRec.prototype.lastAssignmentIdx;
}
export class PropertyAccessor {
    /**
     * @param {?} context
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.context.propertyForKey(key);
    }
    /**
     * @return {?}
     */
    toString() {
        return MapWrapper.toString(this.context.allProperties());
    }
}
if (false) {
    /** @type {?} */
    PropertyAccessor.prototype.context;
}
/**
 * Snapshot is the way how to capture a current state of the context and then replay it back so.
 * for cases when we need to run some rule execution outside of the push/pop cycle
 */
export class Snapshot {
    /**
     * @param {?} _context
     */
    constructor(_context) {
        this._context = _context;
        this._meta = _context.meta;
        this._origClass = _context.constructor.name;
        this._assignments = _context.activeAssignments();
        this._allAssignments = _context.allAssignments();
        this._isNested = _context.isNested;
    }
    /**
     * @param {?=} shellCopy
     * @return {?}
     */
    hydrate(shellCopy = true) {
        /** @type {?} */
        let assignments = (shellCopy) ? this._assignments : this._allAssignments;
        /** @type {?} */
        let newContext = this._meta.newContext();
        newContext.push();
        /** @type {?} */
        let lastCnxGeneration = 1;
        for (let a of assignments) {
            if (lastCnxGeneration < a.salience) {
                newContext.push();
            }
            newContext.set(a.key, a.value);
        }
        newContext.isNested = this._isNested;
        return newContext;
    }
}
if (false) {
    /** @type {?} */
    Snapshot.prototype._meta;
    /** @type {?} */
    Snapshot.prototype._origClass;
    /** @type {?} */
    Snapshot.prototype._assignments;
    /** @type {?} */
    Snapshot.prototype._allAssignments;
    /** @type {?} */
    Snapshot.prototype._isNested;
    /** @type {?} */
    Snapshot.prototype._context;
}
export class ObjectMetaContext extends Context {
    /**
     * @param {?} _meta
     * @param {?=} nested
     */
    constructor(_meta, nested = false) {
        super(_meta, nested);
    }
    /**
     * @return {?}
     */
    get value() {
        /** @type {?} */
        let obj = this.object;
        if (isBlank(obj)) {
            return null;
        }
        /** @type {?} */
        let fieldPath = this.fieldPath();
        return isPresent(fieldPath) ? fieldPath.getFieldValue(obj) : this.propertyForKey('value');
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        /** @type {?} */
        let fieldPath = this.fieldPath();
        if (isPresent(fieldPath)) {
            assert(isPresent(this.object), 'Call to setValue() with no current object');
            fieldPath.setFieldValue(this.object, val);
        }
        else {
            /** @type {?} */
            let value = this.allProperties().get(ObjectMeta.KeyValue);
            assert(isDynamicSettable(value), 'Cant set derived property: ' + value);
            /** @type {?} */
            let settable = value;
            ((/** @type {?} */ (value))).evaluateSet(this, val);
            settable.evaluateSet(this, val);
        }
    }
    /**
     * @return {?}
     */
    get object() {
        return this.values.get(ObjectMeta.KeyObject);
    }
    /**
     * @return {?}
     */
    get formatters() {
        if (isBlank(this._formatters)) {
            this._formatters = new Map();
        }
        return this._formatters;
    }
    /**
     * @return {?}
     */
    fieldPath() {
        /** @type {?} */
        let propMap = /** @type {?} */ (this.allProperties());
        return propMap.fieldPath;
    }
    /**
     * @return {?}
     */
    locale() {
        return ObjectMetaContext.DefaultLocale;
    }
    /**
     * @return {?}
     */
    timezone() {
        return new Date().getTimezoneOffset();
    }
}
ObjectMetaContext.DefaultLocale = 'en';
if (false) {
    /** @type {?} */
    ObjectMetaContext.DefaultLocale;
    /** @type {?} */
    ObjectMetaContext.prototype._formatters;
}
export class UIContext extends ObjectMetaContext {
    /**
     * @param {?} _meta
     * @param {?=} nested
     */
    constructor(_meta, nested = false) {
        super(_meta, nested);
    }
    /**
     * @return {?}
     */
    locale() {
        return super.locale();
    }
    /**
     * @return {?}
     */
    timezone() {
        return super.timezone();
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBc0JBLE9BQU8sS0FBSyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUNILE1BQU0sRUFDTixjQUFjLEVBQUUsU0FBUyxFQUN6QixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFdBQVcsRUFDWCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQW1CLFdBQVcsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUN6RSxPQUFPLEVBQUMsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUNILG9CQUFvQixFQUVwQixJQUFJLEVBQ0osaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUN2QixNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdGMUIsTUFBTSxjQUFlLFNBQVEsVUFBVTs7Ozs7SUEyRW5DLFlBQW9CLEtBQVcsRUFBVSxTQUFrQixLQUFLO1FBQzVELEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWlCO3VCQTdENUIsSUFBSSxHQUFHLEVBQWU7d0JBQzVCLEVBQUU7NEJBQ0MsRUFBRTt3QkFJRyxF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QyxDQUFDO1lBQy9ELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO0tBRUo7Ozs7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1YsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1NBQzdDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDM0I7Ozs7SUFFRCxTQUFTOztRQUNMLElBQUksT0FBTyxxQkFBa0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDO1FBQ2xGLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0tBQzVCOzs7O0lBR0QsTUFBTTtRQUNGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7S0FDMUM7Ozs7SUFFRCxRQUFRO1FBQ0osTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUV6Qzs7a0NBOUQrQixJQUFJOzs7Ozs7O0FBa0V4QyxNQUFNLGdCQUFpQixTQUFRLGlCQUFpQjs7Ozs7SUFHNUMsWUFBWSxLQUFhLEVBQUUsU0FBa0IsS0FBSztRQUM5QyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3hCOzs7O0lBSUQsTUFBTTtRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDekI7Ozs7SUFFRCxRQUFRO1FBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMzQjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG4vKipcbiAqIFNwZWNpYWwgaW1wb3J0IHRvIGJlIGFibGUgdG8gY29udmVydCBzdHJpbmcgdG8gdHlwZSB1c2luZyBDb2xsZWN0aW9uc1tzdHJpbmcgdHlwZV0gPT4gdHlwZVxuICovXG5pbXBvcnQgKiBhcyBDb2xsZWN0aW9ucyBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gICAgYXNzZXJ0LFxuICAgIEJvb2xlYW5XcmFwcGVyLCBjbGFzc05hbWUsXG4gICAgRXh0ZW5zaWJsZSxcbiAgICBGaWVsZFBhdGgsXG4gICAgaXNBcnJheSxcbiAgICBpc0JsYW5rLFxuICAgIGlzTnVtYmVyLFxuICAgIGlzUHJlc2VudCxcbiAgICBpc1N0cmluZyxcbiAgICBpc1N0cmluZ01hcCxcbiAgICBMaXN0V3JhcHBlcixcbiAgICBNYXBXcmFwcGVyLFxuICAgIG9iamVjdFRvTmFtZSxcbiAgICBwcmludCxcbiAgICBTdHJpbmdKb2luZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge01hdGNoUmVzdWx0LCBVbmlvbk1hdGNoUmVzdWx0fSBmcm9tICcuL21hdGNoJztcbmltcG9ydCB7TWV0YSwgT3ZlcnJpZGVWYWx1ZSwgUHJvcGVydHlNYW5hZ2VyLCBQcm9wZXJ0eU1hcH0gZnJvbSAnLi9tZXRhJztcbmltcG9ydCB7T2JqZWN0TWV0YSwgT2JqZWN0TWV0YVByb3BlcnR5TWFwfSBmcm9tICcuL29iamVjdC1tZXRhJztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuL3VpbWV0YSc7XG5pbXBvcnQge05lc3RlZE1hcH0gZnJvbSAnLi9uZXN0ZWQtbWFwJztcbmltcG9ydCB7XG4gICAgRHluYW1pY1Byb3BlcnR5VmFsdWUsXG4gICAgRHluYW1pY1NldHRhYmxlUHJvcGVydHlWYWx1ZSxcbiAgICBFeHByLFxuICAgIGlzRHluYW1pY1NldHRhYmxlLFxuICAgIFN0YXRpY2FsbHlSZXNvbHZhYmxlXG59IGZyb20gJy4vcHJvcGVydHktdmFsdWUnO1xuXG4vKipcbiAqXG4gKiBDb250ZXh0IHJlcHJlc2VudHMgYSBzdGFjayBvZiBhc3NpZ25tZW50cyAoZS5nLiBjbGFzcz1Vc2VyLCBmaWVsZD1iaXJ0aERheSwgb3BlcmF0aW9uPWVkaXQpXG4gKiAgVGhlIGN1cnJlbnQgc2V0IG9mIGFzc2lnbm1lbnRzIGNhbiBiZSByZXRyaWV2ZWQgdmlhIHZhbHVlcygpLlxuICpcbiAqIFRoZSBjdXJyZW50IHZhbHVlcyBhcmUgcnVuIGFnYWluc3QgdGhlIE1ldGEgcnVsZSBzZXQgdG8gY29tcHV0ZSB0aGUgZWZmZWN0aXZlIFByb3BlcnR5TWFwXG4gKiAoZS5nLiB2aXNpYmxlOnRydWUsIGVkaXRhYmxlOnRydWUsIGNvbXBvbmVudDpBV1RleHRGaWVsZCkuXG4gKiBTb21lIHJ1bGUgZXZhbHVhdGlvbnMgcmVzdWx0IGluICpjaGFpbmluZyogLS0gd2hlcmUgYWRkaXRpb25hbCBhc3NpZ25tZW50cyB0aGF0IGFyZVxuICogJ2ltcGxpZWQnIGJ5IHRoZSBjdXJyZW50IGFzc2lnbm1lbnRzIGFyZSBhcHBsaWVkLCAocmVzdWx0aW5nIGluIGEgcmV2aXNlZCBjb21wdXRhdGlvblxuICogb2YgdGhlIGN1cnJlbnQgUHJvcGVydHlNYXAsIGFuZCBwb3NzaWJsZSBmdXJ0aGVyIGNoYWluaW5nKS5cbiAqIChlLmcuIGZpZWxkPWJpcnRoRGF5IG1heSByZXN1bHQgaW4gdHlwZT1EYXRlIHdoaWNoIG1heSByZXN1bHQgaW4gY29tcG9uZW50OkRhdGVQaWNrZXIpXG4gKlxuICogQXNzaWdubWVudHMgY2FuIGJlIHNjb3BlZCBhbmQgcG9wcGVkIChwdXNoKCksIHNldChrZXksIHZhbHVlKTsgLi4uOyBwb3AoKSkuXG4gKlxuICogVGhlIGFjdHVhbCBjb21wdXRhdGlvbiBvZiBydWxlIG1hdGNoZXMgaXMgY2FjaGVkIHNvIG9uY2UgYSAncGF0aCcgZG93biB0aGUgY29udGV4dFxuICogdHJlZSBoYXMgYmVlbiBleGVyY2l6ZWQgc3Vic2VxdWVudCBtYXRjaGluZyB0cmF2ZXJzYWxzIChldmVuIGJ5IG90aGVyIHRocmVhZHMvdXNlcnMpXG4gKiBpcyBmYXN0LlxuICpcbiAqXG4gKiBleGFtcGxlcyBvZiBwcm9wZXJ0eSBtYXBzIGZvciBkaWZmZXJlbnQgc2NvcGUga2V5XG4gKlxuICogPGNvZGU+XG4gKiAgICAge1xuICAgICAgICAndmlzaWJsZSc6IHRydWUsXG4gICAgICAgICdjbGFzc190cmFpdCc6ICdmaXZlWm9uZXMnLFxuICAgICAgICAnZWRpdGFibGUnOiB0cnVlLFxuICAgICAgICAnYmluZGluZ3MnOiB7XG4gICAgICAgICAgICAndmFsdWUnOiAnRGVmYXVsdCBUaXRsZSdcbiAgICAgICAgfSxcbiAgICAgICAgJ2ZpZWxkX3RyYWl0JzogJ3JlcXVpcmVkJyxcbiAgICAgICAgJ2xhYmVsJzogJ1RpdGxlJyxcbiAgICAgICAgJ3R5cGUnOiAnc3RyaW5nJyxcbiAgICAgICAgJ3JlcXVpcmVkJzogdHJ1ZSxcbiAgICAgICAgJ2VkaXRpbmcnOiB0cnVlLFxuICAgICAgICAndmFsaWQnOiAne3sodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkgPyB0cnVlIDogXFwnQW5zd2VyIHJlcXVpcmVkXFwnfX0nLFxuICAgICAgICAnY29tcG9uZW50JzogJ0lucHV0RmllbGRDb21wb25lbnQnLFxuICAgICAgICAnZmllbGQnOiAndGl0bGUnLFxuICAgICAgICAnbGF5b3V0X3RyYWl0JzogJ0Zvcm0nLFxuICAgICAgICAndHJhaXQnOiAncmVxdWlyZWQnLFxuICAgICAgICAncmFuayc6IDIwLFxuICAgICAgICAnYWZ0ZXInOiAnekxlZnQnLFxuICAgICAgICAnY2xhc3MnOiAnQ2hlY2tSZXF1ZXN0MSdcbiAgICB9XG4gKlxuICogPC9jb2RlPlxuICpcbiAqXG4gKlxuICogPGNvZGU+XG4gKiAgICAge1xuICAgICAgICAndmlzaWJsZSc6IHRydWUsXG4gICAgICAgICdjbGFzc190cmFpdCc6ICdmaXZlWm9uZXMnLFxuICAgICAgICAnbGFiZWwnOiAnQ2hlY2sgUmVxdWVzdDEnLFxuICAgICAgICAnem9uZXMnOiBbXG4gICAgICAgICAgICAnekxlZnQnLFxuICAgICAgICAgICAgJ3pSaWdodCcsXG4gICAgICAgICAgICAnelRvcCcsXG4gICAgICAgICAgICAnekJvdHRvbScsXG4gICAgICAgICAgICAnekRldGFpbCdcbiAgICAgICAgXSxcbiAgICAgICAgJ2VkaXRpbmcnOiB0cnVlLFxuICAgICAgICAnbGF5b3V0JzogJyonLFxuICAgICAgICAnY29tcG9uZW50JzogJ01ldGFGb3JtQ29tcG9uZW50JyxcbiAgICAgICAgJ2xheW91dF90cmFpdCc6ICdGb3JtJyxcbiAgICAgICAgJ2ZpdmVab25lTGF5b3V0JzogdHJ1ZSxcbiAgICAgICAgJ3RyYWl0JzogJ2ZpdmVab25lcycsXG4gICAgICAgICdsYXlvdXRzQnlab25lJzoge1xuXG4gICAgICAgIH0sXG4gICAgICAgICdjbGFzcyc6ICdDaGVja1JlcXVlc3QxJyxcbiAgICAgICAgJ2ZpZWxkc0J5Wm9uZSc6IHtcbiAgICAgICAgICAgICd6TGVmdCc6IFtcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxuICAgICAgICAgICAgICAgICduYW1lJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICd6Tm9uZSc6IFtcbiAgICAgICAgICAgICAgICAnZnVsbE5hbWUnXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG4gKlxuICogPC9jb2RlPlxuICpcbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ29udGV4dCBleHRlbmRzIEV4dGVuc2libGUge1xuICAgIHByaXZhdGUgc3RhdGljIF9DYWNoZUFjdGl2YXRpb25zOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIHN0YXRpYyBfRXhwZW5zaXZlQ29udGV4dENvbnNpc3RlbmN5Q2hlY2tzRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHN0YXRpYyBfRGVidWdSdWxlTWF0Y2hlczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHN0YXRpYyBfRGVidWdfU2V0c0NvdW50OiBudW1iZXIgPSAwO1xuXG5cbiAgICBzdGF0aWMgTWF4Q29udGV4dFN0YWNrU2l6ZTogbnVtYmVyID0gMjAwO1xuXG4gICAgc3RhdGljIEVtcHR5TWFwOiBQcm9wZXJ0eU1hcCA9IG51bGw7XG4gICAgc3RhdGljIHJlYWRvbmx5IEVtcHR5UmVtb3ZlTWFwOiBNYXA8YW55LCBhbnk+ID0gbmV3IE1hcDxhbnksIGFueT4oKTtcblxuICAgIHByaXZhdGUgX3ZhbHVlczogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgX2VudHJpZXM6IEFycmF5PEFzc2lnbm1lbnQ+ID0gW107XG4gICAgcHJpdmF0ZSBfZnJhbWVTdGFydHM6IG51bWJlcltdID0gW107XG4gICAgcHJvdGVjdGVkIF9jdXJyZW50UHJvcGVydGllczogUHJvcGVydHlNYXA7XG4gICAgcHJvdGVjdGVkIF9yb290Tm9kZTogQWN0aXZhdGlvbjtcbiAgICBwcml2YXRlIF9jdXJyZW50QWN0aXZhdGlvbjogQWN0aXZhdGlvbjtcbiAgICBwcml2YXRlIF9yZWNQb29sOiBBcnJheTxBc3NpZ25tZW50PiA9IFtdO1xuXG4gICAgX2FjY2Vzc29yOiBQcm9wZXJ0eUFjY2Vzc29yO1xuXG4gICAgaXNOZXN0ZWQ6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG5vdGVzOlxuICAgICAqXG4gICAgICogQ29udGV4dCBtYWludGFpbnMgYSBzdGFjayAoX2VudHJpZXMpIG9mIF9Db250ZXh0UmVjcyAob25lIHBlciBhc3NpZ25tZW50KSBhcyB3ZWxsIGFzXG4gICAgICogYXMgX2ZyYW1lU3RhY2sgcmVjb3JkaW5nIHRoZSBzdGFjayBwb3NpdGlvbnMgZm9yIGVhY2ggcHVzaCgpL3BvcCgpLlxuXG4gICAgICogUGVyZm9ybWFuY2UgdGhyb3VnaCBhZ2dyZXNzaXZlIGdsb2JhbCBjYWNoaW5nIG9mIGFsbCBzdGF0aWNhbGx5IGNvbXB1dGF0YmxlIGRhdGE6XG4gICAgICogLSBUaGUgc3RhdGljIChyZXVzYWJsZS9pbW11dGFibGUpIHBhcnQgb2YgYSBDb250ZXh0UmVjIGlzIGZhY3RvcmVkIGludG8gX1N0YXRpY1JlY1xuICAgICAqIC0gU3RhdGljUmVjcyByZXByZXNlbnQgaW5kaXZpZHVhbCBhc3NpZ25tZW50cyAoY29udGV4dCBrZXkgPSB2YWx1ZSkgYW5kIGNhY2hlIHRoZVxuICAgICAqICAgICAgcmVzdWx0aW5nIE1ldGEuTWF0Y2hSZXN1bHQgKGFuZCBhc3NvY2lhdGVkIFByb3BlcnR5TWFwKVxuICAgICAqIC0gVGhlIHN1Yi1zdGFjayAob2YgZm9yd2FyZCBjaGFpbmVkKSByZWNvcmRzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIGV4dGVybmFsIHNldCgpXG4gICAgICogICAgICAob3IgY2hhaW5lZCAqZHluYW1pYyogdmFsdWUpIGlzIHJlY29yZGVkIGluIGFuIEFjdGl2YXRpb24uXG4gICAgICogLSBQcm9jZXNzLWdsb2JhbCB0cmVlIG9mIEFjdGl2YXRpb25zXG4gICAgICogICAgICAtIGVhY2ggYWN0aXZhdGlvbiBrZWVwcyBsaXN0IG9mIGl0cyBDb250ZXh0S2V5L1ZhbHVlLWtleWVkIGRlY2VuZGVkIEFjdGl2YXRpb25zXG4gICAgICpcbiAgICAgKiBQcm9wZXJ0eSBDb250ZXh0cy5cbiAgICAgKiAgICAgIFRoZSBub3Rpb24gb2YgYSAnUHJvcGVydHlDb250ZXh0JyBtYWtlcyB0aGUgZ29pbmcgdHJpY2t5Li4uXG4gICAgICogICAgICAgQSAnUHJvcGVydHlDb250ZXh0S2V5JyBpcyBhIGtleSBmb3IgYW4gJ2VudGl0eScgdGhhdCBwcm9wZXJ0aWVzIGRlc2NyaWJlLlxuICAgICAqICAgICAgIChlLmcuIGNsYXNzLCBmaWVsZCwgYWN0aW9uLCBhbmQgbGF5b3V0IGFyZSBwcm9wZXJ0eSBjb250ZXh0IGtleXMsIGJ1dCBlZGl0aW5nLFxuICAgICAqICAgICAgIG9wZXJhdGlvbiwgLi4uIGFyZSBub3QpXG4gICAgICogICAgICAgRS5nLiBPbiBhbiBhc3NpZ25tZW50IHN0YWNrIHdpdGggbW9kdWxlPUFkbWluIGNsYXNzPUZvbywgZmllbGQ9bmFtZSwgZWRpdGFibGU9ZmFsc2UsXG4gICAgICogICAgICAgd2Ugd2FudCB0aGUgcHJvcGVydHkgJ2xhYmVsJyB0byBiZSB0aGUgbGFiZWwgZm9yIHRoZSAqZmllbGQqLCBub3QgdGhlIGNsYXNzIG9yIG1vZHVsZVxuICAgICAqICAgICAgIC0tIGkuZS4gdGhlICp0b3AtbW9zdCogYXNzaWdubWVudCBvZiBhIFByb3BlcnR5Q29udGV4dEtleSBkZXRlcm1pbmVzIHdoaWNoIHByb3BlcnR5XG4gICAgICogICAgICAgY29udGV4dCBydWxlcyBhcmUgYWN0aXZlLlxuICAgICAqXG4gICAgICogIFRoZXNlIHJ1bGVzIGFyZSBhY3RpdmF0ZWQgdmlhIGEgc3ludGhldGljIGNvbnRleHQga2V5IG9mIGxpa2UgJ2ZpZWxkX3AnIG9yICdjbGFzc19wJy5cbiAgICAgKiAgTG9naWNhbGx5LCBhZnRlciBlYWNoIGFzc2lnbWVudCB3ZSBuZWVkIHRvIGZpZ3VyZSBvZiB3aGljaCBjb250ZXh0IGtleSBzaG91bGQgYmUgaW5cbiAgICAgKiAgYWZmZWN0IGFuIHNldCBpdCBvbiB0aGUgY29udGV4dCwgYnV0IHRoZW4gYXV0b21hdGljYWxseSBwb3AgaXQgb2ZmIHVwb24gdGhlIG5leHRcbiAgICAgKiAgYXNzaWdubWVudCAoYW5kIHRoZW4gcmVjb21wdXRlIGFnYWluKS5cbiAgICAgKlxuICAgICAqICBPZiBjb3Vyc2UsIGFjdHVhbGx5IHB1c2hpbmcgYW5kIHBvcHBpbmcgY29udGV4dCBrZXkgYXNzaWdubWVudCBvbiBldmVyeSBzZXQoKVxuICAgICAqICB3b3VsZCBiZSBleHBlbnNpdmUgc28gaW5zdGVhZCB3ZSBjYWNoZSB0aGUgJ3Byb3BlcnR5QWN0aXZhdGlvbicgYXNzb2NpYXRlZCB3aXRoXG4gICAgICogIGVhY2ggYWN0aXZhdGlvbiwgYW5kIHVzZSBpdHMgdmFsdWVzIGFuZCBwcm9wZXJ0aWVzIHJhdGhlciB0aGFuIHRob3NlIG9uIHRoZVxuICAgICAqICBhY3RpdmF0aW9uLlxuICAgICAqL1xuXG4gICAgc3RhdGljIGdldEFjdGl2YXRpb25UcmVlKG1ldGE6IE1ldGEpOiBBY3RpdmF0aW9uIHtcbiAgICAgICAgLy8gdG9kbzogY2hlY2sgdGhlIHN5bnRheCBBY3Rpb252YXRpb24gY29udHJ1Y3RvciBuYW1lLlxuICAgICAgICBsZXQgbmFtZSA9IG9iamVjdFRvTmFtZShBY3RpdmF0aW9uKTtcbiAgICAgICAgbGV0IHJvb3Q6IEFjdGl2YXRpb24gPSBtZXRhLmlkZW50aXR5Q2FjaGUuZ2V0VmFsdWUobmFtZSk7XG4gICAgICAgIGlmIChpc0JsYW5rKHJvb3QpKSB7XG4gICAgICAgICAgICByb290ID0gbmV3IEFjdGl2YXRpb24oKTtcbiAgICAgICAgICAgIG1ldGEuaWRlbnRpdHlDYWNoZS5zZXRWYWx1ZShuYW1lLCByb290KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21ldGE6IE1ldGEsIHByaXZhdGUgbmVzdGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayhDb250ZXh0LkVtcHR5TWFwKSkge1xuICAgICAgICAgICAgQ29udGV4dC5FbXB0eU1hcCA9IG5ldyBQcm9wZXJ0eU1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgQ29udGV4dC5fRGVidWdfU2V0c0NvdW50ID0gMDtcblxuICAgICAgICB0aGlzLl9hY2Nlc3NvciA9IG5ldyBQcm9wZXJ0eUFjY2Vzc29yKHRoaXMpO1xuICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbiA9IENvbnRleHQuZ2V0QWN0aXZhdGlvblRyZWUoX21ldGEpO1xuICAgICAgICB0aGlzLl9yb290Tm9kZSA9IHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uO1xuXG4gICAgICAgIHRoaXMuaXNOZXN0ZWQgPSBuZXN0ZWQ7XG4gICAgfVxuXG5cbiAgICBwdXNoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9mcmFtZVN0YXJ0cy5wdXNoKHRoaXMuX2VudHJpZXMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBnZXQgbWV0YSgpOiBNZXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21ldGE7XG4gICAgfVxuXG5cbiAgICBwb3AoKTogdm9pZCB7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy5fZnJhbWVTdGFydHMubGVuZ3RoO1xuICAgICAgICBhc3NlcnQoc2l6ZSA+IDAsICdQb3BwaW5nIGVtcHR5IHN0YWNrJyk7XG5cbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuX2ZyYW1lU3RhcnRzLnBvcCgpO1xuXG4gICAgICAgIGxldCBlbnRyaWVzU2l6ZTogbnVtYmVyO1xuICAgICAgICB3aGlsZSAoKGVudHJpZXNTaXplID0gdGhpcy5fZW50cmllcy5sZW5ndGgpID4gcG9zKSB7XG4gICAgICAgICAgICBsZXQgcmVjSWR4ID0gZW50cmllc1NpemUgLSAxO1xuICAgICAgICAgICAgbGV0IHJlYzogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXMuc3BsaWNlKHJlY0lkeCwgMSlbMF07XG5cbiAgICAgICAgICAgIGlmIChyZWMuc3JlYy5sYXN0QXNzaWdubWVudElkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMuZGVsZXRlKHJlYy5zcmVjLmtleSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VuZG9PdmVycmlkZShyZWMsIHJlY0lkeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uID0gKHJlY0lkeCA+IDApXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9lbnRyaWVzW3JlY0lkeCAtIDFdLnNyZWMuYWN0aXZhdGlvblxuICAgICAgICAgICAgICAgIDogdGhpcy5fcm9vdE5vZGU7XG5cbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0Q29udGV4dENvbnNpc3RlbnQoKTtcblxuICAgICAgICAgICAgLy8gY2hlY2sgcmVjIGJhY2sgaW50byBwb29sIGZvciByZXVzZVxuICAgICAgICAgICAgcmVjLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLl9yZWNQb29sLnB1c2gocmVjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRQcm9wZXJ0aWVzID0gbnVsbDtcbiAgICB9XG5cblxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuX3NldChrZXksIHZhbHVlLCBmYWxzZSwgZmFsc2UpO1xuXG4gICAgICAgIC8vIGltcGxlbWVudCBkZWZhdWx0IHRvU3RyaW5nIGZvciBvdXIgb2JqZWN0IHNvIHdlIGNhbiByZXRyaWV2ZSBvYmplY3RUaXRsZVxuICAgICAgICBpZiAoa2V5ID09PSBPYmplY3RNZXRhLktleU9iamVjdCkge1xuICAgICAgICAgICAgbGV0IHRvQ2hlY2sgPSB0aGlzLl92YWx1ZXMuZ2V0KE9iamVjdE1ldGEuS2V5T2JqZWN0KTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHRvQ2hlY2tbJyR0b1N0cmluZyddKSkge1xuICAgICAgICAgICAgICAgIHRvQ2hlY2tbJyR0b1N0cmluZyddID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2xhenogPSB0aGlzLnZhbHVlcy5nZXQoT2JqZWN0TWV0YS5LZXlDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVSU1ldGEuYmVhdXRpZnlDbGFzc05hbWUoY2xhenopO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG1lcmdlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NldChrZXksIHZhbHVlLCB0cnVlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgc2V0U2NvcGVLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX21ldGEua2V5RGF0YShrZXkpLmlzUHJvcGVydHlTY29wZSwga2V5ICsgJyBpcyBub3QgYSB2YWxpZCBjb250ZXh0IGtleScpO1xuICAgICAgICBsZXQgY3VycmVudDogc3RyaW5nID0gdGhpcy5fY3VycmVudFByb3BlcnR5U2NvcGVLZXkoKTtcblxuICAgICAgICAvLyBBc3NlcnQudGhhdChjdXJyZW50ICE9IG51bGwsICdDYW4ndCBzZXQgJXMgYXMgY29udGV4dCBrZXkgd2hlbiBubyBjb250ZXh0IGtleSBvbiBzdGFjaycsXG4gICAgICAgIC8vIGtleSk7IFRPRE86IGlmIGN1cnJlbnQga2V5IGlzQ2hhaW5pbmcgdGhlbiB3ZSBuZWVkIHRvIHNldCBhZ2FpbiB0byBnZXQgYSBub24tY2hhaW5pbmdcbiAgICAgICAgLy8gYXNzaWdubWVudFxuXG4gICAgICAgIGlmICghKGtleSA9PT0gY3VycmVudCkpIHtcbiAgICAgICAgICAgIGxldCB2YWw6IGFueSA9IHRoaXMudmFsdWVzLmdldChrZXkpO1xuICAgICAgICAgICAgLy8gQXNzZXJ0LnRoYXQodmFsICE9IG51bGwsICdDYW4ndCBzZXQgJXMgYXMgY29udGV4dCBrZXkgd2hlbiBpdCBoYXMgbm8gdmFsdWUgYWxyZWFkeVxuICAgICAgICAgICAgLy8gb24gdGhlIGNvbnRleHQnLCBrZXkpO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsodmFsKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IE1ldGEuS2V5QW55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlcygpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgbGV0IHByb3BWYWxzOiBNYXA8c3RyaW5nLCBhbnk+O1xuICAgICAgICByZXR1cm4gKExpc3RXcmFwcGVyLmlzRW1wdHkodGhpcy5fZW50cmllcykgfHxcbiAgICAgICAgICAgIGlzQmxhbmsoXG4gICAgICAgICAgICAgICAgcHJvcFZhbHMgPSAoTGlzdFdyYXBwZXIubGFzdDxBc3NpZ25tZW50Pih0aGlzLl9lbnRyaWVzKSkucHJvcGVydHlMb2NhbFZhbHVlcyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcykpKSA/IHRoaXMuX3ZhbHVlcyA6IHByb3BWYWxzO1xuICAgIH1cblxuICAgIGdldCBwcm9wZXJ0aWVzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY2Nlc3NvcjtcbiAgICB9XG5cblxuICAgIHByb3BlcnR5Rm9yS2V5KGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuYWxsUHJvcGVydGllcygpLmdldChrZXkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVWYWx1ZSh2YWwpO1xuICAgIH1cblxuICAgIGxpc3RQcm9wZXJ0eUZvcktleShrZXk6IHN0cmluZyk6IEFycmF5PGFueT4ge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5wcm9wZXJ0eUZvcktleShrZXkpO1xuICAgICAgICByZXR1cm4gKGlzQmxhbmsodmFsKSkgPyBbXSA6IChpc0FycmF5KHZhbCkpID8gdmFsIDogW3ZhbF07XG4gICAgfVxuXG4gICAgYm9vbGVhblByb3BlcnR5Rm9yS2V5KGtleTogc3RyaW5nLCBkZWZhdWx0VmFsOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLnByb3BlcnR5Rm9yS2V5KGtleSk7XG4gICAgICAgIHJldHVybiAoaXNCbGFuayh2YWwpKSA/IGRlZmF1bHRWYWwgOiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZSh2YWwpO1xuICAgIH1cblxuXG4gICAgYWxsUHJvcGVydGllcygpOiBQcm9wZXJ0eU1hcCB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2N1cnJlbnRQcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgbGV0IG06IE1hdGNoUmVzdWx0ID0gdGhpcy5sYXN0TWF0Y2goKTtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQobSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50UHJvcGVydGllcyA9IG0ucHJvcGVydGllcygpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9jdXJyZW50UHJvcGVydGllcykgPyB0aGlzLl9jdXJyZW50UHJvcGVydGllcyA6IENvbnRleHQuRW1wdHlNYXA7XG4gICAgfVxuXG5cbiAgICByZXNvbHZlVmFsdWUodmFsdWU6IGFueSB8IER5bmFtaWNQcm9wZXJ0eVZhbHVlKTogYW55IHtcbiAgICAgICAgbGV0IGxhc3RWYWx1ZTogYW55O1xuICAgICAgICB3aGlsZSAodmFsdWUgIT09IGxhc3RWYWx1ZSAmJiBpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlIGluc3RhbmNlb2YgRHluYW1pY1Byb3BlcnR5VmFsdWUpIHtcbiAgICAgICAgICAgIGxhc3RWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBsZXQgcHJvcFZhbHVlOiBEeW5hbWljUHJvcGVydHlWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIEV4cHIpIHtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWUuYWRkVHlwZVRvQ29udGV4dCgnVUlNZXRhJywgVUlNZXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gcHJvcFZhbHVlLmV2YWx1YXRlKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgc3RhdGljYWxseVJlc29sdmVWYWx1ZSh2YWx1ZTogYW55IHwgU3RhdGljYWxseVJlc29sdmFibGUpOiBhbnkge1xuICAgICAgICBsZXQgbGFzdFZhbHVlOiBhbnkgPSBudWxsO1xuICAgICAgICB3aGlsZSAodmFsdWUgIT09IGxhc3RWYWx1ZSAmJiBpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlIGluc3RhbmNlb2YgU3RhdGljYWxseVJlc29sdmFibGUpIHtcbiAgICAgICAgICAgIGxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5ldmFsdWF0ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVzaEFuZFJlc29sdmVTdGF0aWMoY29udGV4dFZhbHM6IE1hcDxzdHJpbmcsIGFueT4sIHByb3BlcnR5S2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljUmVzb2x2ZTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGxldCBzY29wZUtleTogc3RyaW5nO1xuICAgICAgICB0aGlzLnB1c2goKTtcblxuICAgICAgICBNYXBXcmFwcGVyLml0ZXJhYmxlKGNvbnRleHRWYWxzKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoJyonID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlS2V5ID0ga2V5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChzY29wZUtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2NvcGVLZXkoc2NvcGVLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmFsbFByb3BlcnRpZXMoKS5nZXQocHJvcGVydHlLZXkpO1xuICAgICAgICB2YWwgPSBzdGF0aWNSZXNvbHZlID8gdGhpcy5zdGF0aWNhbGx5UmVzb2x2ZVZhbHVlKHZhbCkgOiB0aGlzLnJlc29sdmVWYWx1ZSh2YWwpO1xuICAgICAgICB0aGlzLnBvcCgpO1xuXG4gICAgICAgIHJldHVybiB2YWw7XG5cbiAgICB9XG5cbiAgICBwdXNoQW5kUmVzb2x2ZShjb250ZXh0VmFsczogTWFwPHN0cmluZywgYW55PiwgcHJvcGVydHlLZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2hBbmRSZXNvbHZlU3RhdGljKGNvbnRleHRWYWxzLCBwcm9wZXJ0eUtleSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIGEgKHVzYWJsZSkgc25hcHNob3Qgb2YgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGNvbnRleHRcbiAgICBzbmFwc2hvdCgpOiBTbmFwc2hvdCB7XG4gICAgICAgIHJldHVybiBuZXcgU25hcHNob3QodGhpcyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXByZXNlbnQgY3VycmVudCBhY3RpdmUgYXNzaWdubWVudCBsaXN0IG1lYW5pbmcgaXQgd2lsbCBub3QgaW5jbHVkZSBhbnkgZW50cmllcyB3aGljaFxuICAgICAqIHdlcmUgb3ZlcndyaXR0ZW4gYnkgc29tZSBsYXRlIGVudHJ5IGhhdmluZyB0aGUgc2FtZSBrZXkuXG4gICAgICpcbiAgICAgKiBJdCBkb2VzIG5vdCBpbmNsdWRlIGVudHJpZXMgdGhhdCB3ZXJlIHB1c2hlZCB0byBzdGFjayBmcm9tIGFueSBQcm9wZXJ0eSAtPiBTZWxlY3RvclxuICAgICAqIHByb3BhZ2F0aW9uLiBUaGlzIGNyZWF0ZXMgc2hlbGwgY29weSBhbmQgaWdub3JpbmcgYWxsIGxhc3QgTWF0Y2hlcyB3aGljaCBjb3VsZCBiZSBmcm9tXG4gICAgICogc29tZSBwcmV2aW91cyBhc3NpZ25tZW50cyB0aGF0IGFyZSBub3cgcmVwbGFjZWQgd2l0aCBzb21lIG5ldyBvbmVzXG4gICAgICpcbiAgICAgKi9cbiAgICBhY3RpdmVBc3NpZ25tZW50cygpOiBBcnJheTxBc3NpZ25tZW50U25hcHNob3Q+IHtcblxuICAgICAgICBsZXQgbGlzdDogQXJyYXk8QXNzaWdubWVudFNuYXBzaG90PiA9IG5ldyBBcnJheTxBc3NpZ25tZW50U25hcHNob3Q+KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJlYzogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICBpZiAocmVjLm1hc2tlZEJ5SWR4ID09PSAwICYmICFyZWMuc3JlYy5mcm9tQ2hhaW5pbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgYTogQXNzaWdubWVudFNuYXBzaG90ID0gbmV3IEFzc2lnbm1lbnRTbmFwc2hvdCgpO1xuICAgICAgICAgICAgICAgIGEua2V5ID0gcmVjLnNyZWMua2V5O1xuICAgICAgICAgICAgICAgIGEudmFsdWUgPSByZWMudmFsO1xuICAgICAgICAgICAgICAgIGEuc2FsaWVuY2UgPSByZWMuc3JlYy5zYWxpZW5jZTtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNpbWlsYXIgYXMgPGNvZGU+YWN0aXZlQXNzaWdubWVudHM8L2NvZGU+IGJ1dCBkbyBpbmNsdWRlIGFsc28gdGhvc2UgdGhhdCB3ZXJlIHJlcGxhY2VkIGxhdGVyXG4gICAgICogb24gd2l0aCBhc3NpZ25tZW50cyBoYXZpbmcgdGhlIHNhbWUga2V5LlxuICAgICAqXG4gICAgICogVGhpcyBpcyBuZWVkZWQgZm9yIGNhc2VzIHdoZXJlIHdlIG5lZWQgdG8gaGF2ZSBkZWVwIGNvcHkgb2YgY3VycmVudCBzdGF0ZSBhbG9uZyB3aXRoXG4gICAgICogYWxsIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBhbGxBc3NpZ25tZW50cygpOiBBcnJheTxBc3NpZ25tZW50U25hcHNob3Q+IHtcblxuICAgICAgICBsZXQgbGlzdDogQXJyYXk8QXNzaWdubWVudFNuYXBzaG90PiA9IG5ldyBBcnJheTxBc3NpZ25tZW50U25hcHNob3Q+KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJlYzogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICBpZiAoIXJlYy5zcmVjLmZyb21DaGFpbmluZykge1xuICAgICAgICAgICAgICAgIGxldCBhOiBBc3NpZ25tZW50U25hcHNob3QgPSBuZXcgQXNzaWdubWVudFNuYXBzaG90KCk7XG4gICAgICAgICAgICAgICAgYS5rZXkgPSByZWMuc3JlYy5rZXk7XG4gICAgICAgICAgICAgICAgYS52YWx1ZSA9IHJlYy52YWw7XG4gICAgICAgICAgICAgICAgYS5zYWxpZW5jZSA9IHJlYy5zcmVjLnNhbGllbmNlO1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaChhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cblxuICAgIF9zZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIG1lcmdlOiBib29sZWFuLCBjaGFpbmluZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBsZXQgc3ZhbCA9IHRoaXMuX21ldGEudHJhbnNmb3JtVmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIGxldCBkaWRTZXQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgcmVnaXN0cnkgPSAoPFVJTWV0YT50aGlzLm1ldGEpLmNvbXBvbmVudFJlZ2lzdHJ5O1xuICAgICAgICBpZiAoa2V5ID09PSBPYmplY3RNZXRhLktleU9iamVjdCAmJiBpc1ByZXNlbnQocmVnaXN0cnkpKSB7XG4gICAgICAgICAgICByZWdpc3RyeS5yZWdpc3RlclR5cGUoY2xhc3NOYW1lKHZhbHVlKSwgdmFsdWUuY29uc3RydWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFjdGl2YXRpb246IEFjdGl2YXRpb24gPSB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbi5nZXRDaGlsZEFjdGl2YXRpb24oa2V5LCBzdmFsLFxuICAgICAgICAgICAgY2hhaW5pbmcpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKGFjdGl2YXRpb24pKSB7XG4gICAgICAgICAgICBkaWRTZXQgPSB0aGlzLl9jcmVhdGVOZXdGcmFtZUZvclNldChrZXksIHN2YWwsIHZhbHVlLCBtZXJnZSwgY2hhaW5pbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQoYWN0aXZhdGlvbikpIHtcbiAgICAgICAgICAgIGRpZFNldCA9IHRoaXMuX2FwcGx5QWN0aXZhdGlvbihhY3RpdmF0aW9uLCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlkU2V0KSB7XG4gICAgICAgICAgICB0aGlzLmF3YWtlQ3VycmVudEFjdGl2YXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5ld0NvbnRleHRSZWMoKTogQXNzaWdubWVudCB7XG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuX3JlY1Bvb2wubGVuZ3RoO1xuICAgICAgICByZXR1cm4gKGNvdW50ID4gMCkgPyB0aGlzLl9yZWNQb29sLnNwbGljZShjb3VudCAtIDEsIDEpWzBdIDogbmV3IEFzc2lnbm1lbnQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhY2hlZCBjYXNlOiBhcHBseSBhIHByZXZpb3VzbHkgY29tcHV0ZWQgQWN0aXZhdGlvblxuICAgICAqL1xuICAgIF9hcHBseUFjdGl2YXRpb24oYWN0aXZhdGlvbjogQWN0aXZhdGlvbiwgZmlyc3RWYWw6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBhc3NlcnQoYWN0aXZhdGlvbi5fcGFyZW50ID09PSB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbixcbiAgICAgICAgICAgICdBdHRlbXB0IHRvIGFwcGx5IGFjdGl2YXRpb24gb24gbWlzbWF0Y2hlZCBwYXJlbnQnKTtcblxuICAgICAgICBpZiAodGhpcy5fZW50cmllcy5sZW5ndGggIT09IGFjdGl2YXRpb24uX29yaWdFbnRyeUNvdW50KSB7XG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsXG4gICAgICAgICAgICAgICAgJ01pc21hdGNoZWQgY29udGV4dCBzdGFjayBzaXplICglcykgZnJvbSB3aGVuIGFjdGl2YXRpb24gd2FzIHBvcHBlZCAnICtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbnRyaWVzLmxlbmd0aCArICcgJyArIGFjdGl2YXRpb24uX29yaWdFbnRyeUNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnQgPSBhY3RpdmF0aW9uLl9yZWNzLmxlbmd0aDtcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3JlYzogU3RhdGljUmVjID0gYWN0aXZhdGlvbi5fcmVjc1tpXTtcbiAgICAgICAgICAgIGxldCByZWM6IEFzc2lnbm1lbnQgPSB0aGlzLm5ld0NvbnRleHRSZWMoKTtcbiAgICAgICAgICAgIHJlYy5zcmVjID0gc3JlYztcblxuICAgICAgICAgICAgLy8gQXBwbHkgbWFza2luZyBmb3IgYW55IHByb3BlcnR5IHRoYXQgd2UgbWFzayBvdXRcbiAgICAgICAgICAgIGlmIChzcmVjLmxhc3RBc3NpZ25tZW50SWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXBhcmVGb3JPdmVycmlkZSh0aGlzLl9lbnRyaWVzLmxlbmd0aCwgc3JlYy5sYXN0QXNzaWdubWVudElkeCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgcmVjLnZhbCA9IChpID09PSAwICYmICF0aGlzLm1ldGEuaXNOdWxsTWFya2VyKGZpcnN0VmFsKSkgPyBmaXJzdFZhbCA6IHNyZWMudmFsO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzLnNldChzcmVjLmtleSwgcmVjLnZhbCk7XG4gICAgICAgICAgICB0aGlzLl9lbnRyaWVzLnB1c2gocmVjKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbiA9IGFjdGl2YXRpb247XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQcm9wZXJ0aWVzID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYXdha2VDdXJyZW50QWN0aXZhdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy8gU2VlIGlmIHRoaXMgYWN0aXZhdGlvbiByZXF1aXJlcyBmdXJ0aGVyIGNoYWluaW5nXG4gICAgICAgIGxldCBjdXJyZW50QWN0aXZhdGlvbiA9IHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uO1xuICAgICAgICBsZXQgZGVmZXJyZWRBc3NpZ25tZW50czogQXJyYXk8RGVmZXJyZWRBc3NpZ25tZW50PiA9IGN1cnJlbnRBY3RpdmF0aW9uLmRlZmVycmVkQXNzaWdubWVudHM7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZGVmZXJyZWRBc3NpZ25tZW50cykpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlEZWZlcnJlZEFzc2lnbm1lbnRzKGRlZmVycmVkQXNzaWdubWVudHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseURlZmVycmVkQXNzaWdubWVudHMoZGVmZXJyZWRBc3NpZ25tZW50czogQXJyYXk8RGVmZXJyZWRBc3NpZ25tZW50Pik6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBkYSBvZiAgZGVmZXJyZWRBc3NpZ25tZW50cykge1xuICAgICAgICAgICAgLy8gdmVyaWZ5IHRoYXQgZGVmZXJyZWQgdmFsdWUgc3RpbGwgYXBwbGllc1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcm9wVmFsdWUgPSB0aGlzLnN0YXRpY2FsbHlSZXNvbHZlVmFsdWUodGhpcy5hbGxQcm9wZXJ0aWVzKCkuZ2V0KGRhLmtleSkpO1xuXG4gICAgICAgICAgICBpZiAoZGEudmFsdWUgPT09IGN1cnJlbnRQcm9wVmFsdWUpIHtcblxuICAgICAgICAgICAgICAgIGxldCByZXNvbHZlZFZhbHVlID0gdGhpcy5yZXNvbHZlVmFsdWUoZGEudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0KGRhLmtleSwgcmVzb2x2ZWRWYWx1ZSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwcmludCgnX3NldCBTS0lQUElORyBkZWZlcnJlZCBhc3NpZ25tZW50IG9mIGRlcml2ZWQgdmFsdWU6ICVzIDwtICVzIC0tJyArXG4gICAgICAgICAgICAgICAgLy8gICAgICcgbm8gbG9uZ2VyIG1hdGNoZXMgcHJvcGVydHkgaW4gY29udGV4dDogJXMnICwgZGEua2V5ICwgZGEudmFsdWUgLFxuICAgICAgICAgICAgICAgIC8vIGN1cnJlbnRQcm9wVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBfaW5EZWNsYXJlKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbWF0Y2g6IE1hdGNoUmVzdWx0ID0gdGhpcy5sYXN0TWF0Y2hXaXRob3V0Q29udGV4dFByb3BzKCk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQobWF0Y2gpICYmIChtYXRjaC5fa2V5c01hdGNoZWRNYXNrICYgdGhpcy5fbWV0YS5kZWNsYXJlS2V5TWFzaykgIT09IDA7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgTm9uLWNhY2hlZCBhY2Nlc3M6IGNyZWF0ZSBhIG5ldyBhY3RpdmF0aW9uXG4gICAgICovXG4gICAgX2NyZWF0ZU5ld0ZyYW1lRm9yU2V0KGtleTogc3RyaW5nLCBzdmFsdWU6IGFueSwgdmFsdWU6IGFueSwgbWVyZ2U6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluaW5nOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGxhc3RBY3RpdmF0aW9uOiBBY3RpdmF0aW9uID0gdGhpcy5fY3VycmVudEFjdGl2YXRpb247XG4gICAgICAgIGxldCBuZXdBY3RpdmF0aW9uOiBBY3RpdmF0aW9uID0gbmV3IEFjdGl2YXRpb24obGFzdEFjdGl2YXRpb24pO1xuICAgICAgICBuZXdBY3RpdmF0aW9uLl9vcmlnRW50cnlDb3VudCA9IHRoaXMuX2VudHJpZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbiA9IG5ld0FjdGl2YXRpb247XG5cbiAgICAgICAgLy8gc2V0IHRoaXMgdmFsdWVcbiAgICAgICAgbGV0IGRpZFNldDogYm9vbGVhbiA9IHRoaXMuX3NldDIoa2V5LCBzdmFsdWUsIHZhbHVlLCBtZXJnZSwgY2hhaW5pbmcpO1xuICAgICAgICAvLyBtaXJyb3IgcHJvcGVydGllc1xuICAgICAgICBpZiAoZGlkU2V0KSB7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5fY2hlY2tBcHBseVByb3BlcnRpZXMoKSkge1xuICAgICAgICAgICAgICAgIC8qIHJlcGVhdCAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtZW1iZXIgZm9yIHRoZSBmdXR1cmVcbiAgICAgICAgaWYgKENvbnRleHQuX0NhY2hlQWN0aXZhdGlvbnMpIHtcbiAgICAgICAgICAgIGxhc3RBY3RpdmF0aW9uLmNhY2hlQ2hpbGRBY3RpdmF0aW9uKGtleSwgc3ZhbHVlLCBuZXdBY3RpdmF0aW9uLCBjaGFpbmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24gPSAoZGlkU2V0KSA/IG5ld0FjdGl2YXRpb24gOiBsYXN0QWN0aXZhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uICE9PSBsYXN0QWN0aXZhdGlvbjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBsYXppbHkgdG8gY29tcHV0ZSB0aGUgcHJvcGVydHkgYWN0aXZhdGlvbiBmb3IgdGhpcyBhY3RpdmF0aW9uXG4gICAgICogQ29tcHV0ZSB0aGUgc3RhdGljIHBhcnQgb2YgdGhlIHByb3BlcnR5IGFjdGl2YXRpb25cbiAgICAgKiB3ZSBhY2N1bXVsYXRlIHRoZSBwcm9wZXJ0eSBzZXR0aW5ncyBvbiBhIHNpZGUgYWN0aXZhdGlvbiBvZmYgdGhlIG1haW4gc3RhY2tcbiAgICAgKiBhbmQgYXBwbHkgaXQgdmlydHVhbGx5IGlmIG91ciBwYXJlbnQgaXMgbm90IGNvdmVyZWRcbiAgICAgKiAgKHRoYXQgd2F5IHdlIGRvbid0IGhhdmUgdG8gYXBwbHkgYW5kIHVuYXBwbHkgYWxsIHRoZSB0aW1lKVxuICAgICAqL1xuICAgIF9jcmVhdGVOZXdQcm9wZXJ0eUNvbnRleHRBY3RpdmF0aW9uKHBhcmVudEFjdGl2YXRpb246IEFjdGl2YXRpb24pOiBBY3RpdmF0aW9uIHtcblxuICAgICAgICB0aGlzLnB1c2goKTtcbiAgICAgICAgbGV0IHByb3BBY3RpdmF0aW9uOiBBY3RpdmF0aW9uID0gbmV3IEFjdGl2YXRpb24ocGFyZW50QWN0aXZhdGlvbik7XG4gICAgICAgIHByb3BBY3RpdmF0aW9uLl9vcmlnRW50cnlDb3VudCA9IHRoaXMuX2VudHJpZXMubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uID0gcHJvcEFjdGl2YXRpb247XG4gICAgICAgIGxldCBvcmlnVmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuXG4gICAgICAgIGxldCBuZXN0ZWRNYXA6IE5lc3RlZE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTmVzdGVkTWFwPHN0cmluZywgYW55PihvcmlnVmFsdWVzKTtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gbmVzdGVkTWFwO1xuICAgICAgICB0aGlzLmFwcGx5UHJvcGVydHlDb250ZXh0QW5kQ2hhaW4oKTtcblxuICAgICAgICBpZiAocHJvcEFjdGl2YXRpb24uX3JlY3MubGVuZ3RoID4gMCB8fCBpc1ByZXNlbnQocHJvcEFjdGl2YXRpb24uZGVmZXJyZWRBc3NpZ25tZW50cykpIHtcbiAgICAgICAgICAgIHByb3BBY3RpdmF0aW9uLl9uZXN0ZWRWYWx1ZXMgPSBuZXN0ZWRNYXA7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBDb250ZXh0LkVtcHR5UmVtb3ZlTWFwOyAgLy8gaGFjayAtLSBlbXB0eSBtYXAgc28gdGhhdCB1bmRvIGlzIG5vb3AgLS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAoKE5lc3RlZE1hcClfdmFsdWVzKS5kdXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BBY3RpdmF0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcCgpO1xuICAgICAgICB0aGlzLl92YWx1ZXMgPSBvcmlnVmFsdWVzO1xuICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbiA9IHBhcmVudEFjdGl2YXRpb247XG5cbiAgICAgICAgcmV0dXJuIHByb3BBY3RpdmF0aW9uO1xuICAgIH1cblxuICAgIF9hcHBseVByb3BlcnR5QWN0aXZhdGlvbihwcm9wQWN0aXZhdGlvbjogQWN0aXZhdGlvbiwgcmVjOiBBc3NpZ25tZW50KSB7XG4gICAgICAgIGxldCBwcm9wVmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHByb3BBY3RpdmF0aW9uLl9uZXN0ZWRWYWx1ZXMpKSB7XG4gICAgICAgICAgICBwcm9wVmFsdWVzID0gcHJvcEFjdGl2YXRpb24uX25lc3RlZFZhbHVlcy5yZXBhcmVudGVkTWFwKHByb3BWYWx1ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHVwIHByb3BMb2NhbCByZXN1bHRzXG4gICAgICAgIC8vIE5vdywgc2VlIGlmIHdlIG5lZWQgdG8gY29tcHV0ZSBhIGR5bmFtaWMgcHJvcGVydHkgYWN0aXZhdGlvbiBhcyB3ZWxsXG4gICAgICAgIGlmIChpc1ByZXNlbnQocHJvcEFjdGl2YXRpb24uZGVmZXJyZWRBc3NpZ25tZW50cykpIHtcbiAgICAgICAgICAgIHRoaXMucHVzaCgpO1xuICAgICAgICAgICAgLy8gbmVzdCBhIGR5bmFtaWMgbmVzdGVkIG1hcCBvbiBvdXIgc3RhdGljIG5lc3RlZCBtYXAgKHdoaWNoIGlzIG9uIG91ciBsYXN0IGR5bmFtaWNcbiAgICAgICAgICAgIC8vIG5lc3RlZCBtYXAuLi4pXG4gICAgICAgICAgICBsZXQgb3JpZ1ZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IG5ldyBOZXN0ZWRNYXA8c3RyaW5nLCBhbnk+KHByb3BWYWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlBY3RpdmF0aW9uKHByb3BBY3RpdmF0aW9uLCBNZXRhLk51bGxNYXJrZXIpO1xuICAgICAgICAgICAgdGhpcy5hcHBseURlZmVycmVkQXNzaWdubWVudHMocHJvcEFjdGl2YXRpb24uZGVmZXJyZWRBc3NpZ25tZW50cyk7XG5cbiAgICAgICAgICAgIHJlYy5fcHJvcGVydHlMb2NhbFZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIHJlYy5fcHJvcGVydHlMb2NhbFNyZWMgPSBMaXN0V3JhcHBlci5sYXN0KHRoaXMuX2VudHJpZXMpLnNyZWM7XG5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IENvbnRleHQuRW1wdHlSZW1vdmVNYXA7ICAvLyBoYWNrIC0tIGVtcHR5IG1hcCBzbyB0aGF0IHVuZG8gaXMgbm9vcCAtLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICgoTmVzdGVkTWFwKV92YWx1ZXMpLmR1cCgpO1xuICAgICAgICAgICAgdGhpcy5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IG9yaWdWYWx1ZXM7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbiB1c2Ugc3RhdGljIHZlcnNpb25zXG4gICAgICAgICAgICByZWMuX3Byb3BlcnR5TG9jYWxWYWx1ZXMgPSBwcm9wVmFsdWVzO1xuICAgICAgICAgICAgcmVjLl9wcm9wZXJ0eUxvY2FsU3JlYyA9IExpc3RXcmFwcGVyLmxhc3QocHJvcEFjdGl2YXRpb24uX3JlY3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdG9kbzogYW55IGVxdWFscyBvbGQgdmEgPT09IG5ldyB2YWxcbiAgICBfaXNOZXdWYWx1ZShvbGRWYWw6IGFueSwgbmV3VmFsOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChvbGRWYWwgIT09IG5ld1ZhbCAmJiAoaXNQcmVzZW50KG9sZFZhbCkgfHxcbiAgICAgICAgICAgICghb2xkVmFsID09PSBuZXdWYWwgJiYgKCFpc0FycmF5KG9sZFZhbCkpIHx8ICEoTGlzdFdyYXBwZXIuY29udGFpbnMob2xkVmFsLCBuZXdWYWwpKSkpKTtcbiAgICB9XG5cblxuICAgIGlzRGVjbGFyZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnByb3BlcnR5Rm9yS2V5KE1ldGEuS2V5RGVjbGFyZSkpO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGFzc2VydENvbnRleHRDb25zaXN0ZW50KCk6IHZvaWQge1xuICAgICAgICBpZiAoIUNvbnRleHQuX0V4cGVuc2l2ZUNvbnRleHRDb25zaXN0ZW5jeUNoZWNrc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZlcmlmeSB0aGF0IGVhY2ggdmFsdWUgaW4gY29udGV4dCBoYXMgbWF0Y2hpbmcgKGVuYWJsZWQpIGNvbnRleHQgcmVjb3JkXG5cblxuICAgICAgICBNYXBXcmFwcGVyLml0ZXJhYmxlKHRoaXMuX3ZhbHVlcykuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgbGV0IGxhc3RBc3NpZ25tZW50SWR4ID0gdGhpcy5maW5kTGFzdEFzc2lnbm1lbnRPZktleShrZXkpO1xuICAgICAgICAgICAgYXNzZXJ0KGxhc3RBc3NpZ25tZW50SWR4ID49IDAsICdWYWx1ZSBpbiBjb250ZXh0IGJ1dCBubyBhc3NpZ25tZW50IHJlY29yZCBmb3VuZCAnICtcbiAgICAgICAgICAgICAgICBrZXkgKyAnID0gJyArIHZhbHVlKTtcblxuICAgICAgICAgICAgbGV0IGNvbnRleHRWYWwgPSB0aGlzLl9lbnRyaWVzW2xhc3RBc3NpZ25tZW50SWR4XS52YWw7XG5cbiAgICAgICAgICAgIGFzc2VydCh2YWx1ZSA9PT0gY29udGV4dFZhbCB8fCAoaXNQcmVzZW50KHZhbHVlKSAmJiB2YWx1ZSA9PT0gY29udGV4dFZhbCksXG4gICAgICAgICAgICAgICAgJ1ZhbHVlIGluIGNvbnRleHQgIGRvZXNudCBtYXRjaCB2YWx1ZSBvbiBzdGFjayAnICsgdmFsdWUgKyAnIC8gJyArIGNvbnRleHRWYWwpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNrIGVudHJpZXMgZm9yIHByb3BlciByZWxhdGlvbnNoaXAgd2l0aCBhbnkgcHJldmlvdXMgcmVjb3JkcyB0aGF0IHRoZXkgb3ZlcnJpZGVcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCByOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIGxldCBmb3VuZEZpcnN0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJlZDogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKHByZWQuc3JlYy5rZXkgPT09IHIuc3JlYy5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJlZGVjZXNzb3JzIG11c3QgYmUgbWFza2VkXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydCgoIWZvdW5kRmlyc3QgJiYgcHJlZC5tYXNrZWRCeUlkeCA9PT0gaSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICgoZm91bmRGaXJzdCB8fCBwcmVkLnNyZWMuZnJvbUNoYWluaW5nKSAmJiBwcmVkLm1hc2tlZEJ5SWR4ID4gMCksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICdQcmVkZWNlc3NvciBBIGRvZXMgbm90IGhhdmUgbWF0Y2hpbmcgbWFza2VkQnlJZHggQiAgZm9yIG92ZXJyaWRlIEM6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkLnNyZWMua2V5ICsgJyA9ICcgKyBwcmVkLnZhbCArICcsICcgKyBwcmVkLm1hc2tlZEJ5SWR4ICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBpICsgJyA9ICcgKyByLnZhbFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIGFzc2VydCgoKCFmb3VuZEZpcnN0ICYmIHIuc3JlYy5sYXN0QXNzaWdubWVudElkeCA9PT0gaikgfHwgZm91bmRGaXJzdCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZC5zcmVjLmZyb21DaGFpbmluZyksXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICdPdmVycmlkZSBBMT1BMiBkb2VzIG5vdCBoYXZlIHByb3BlciBsYXN0QXNzaWdubWVudElkeCBCMSE9QjIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnZm9yIHByZWRlY2Vzc29yIEMnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWQuc3JlYy5rZXkgKyAnID0gJyArIHByZWQudmFsICsgJywgJyArIHIuc3JlYy5sYXN0QXNzaWdubWVudElkeCArICcgPSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGogKyAnLCAnICsgcHJlZC52YWwpO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZEZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIF9zZXQyKGtleTogc3RyaW5nLCBzdmFsdWU6IGFueSwgdmFsdWU6IGFueSwgbWVyZ2U6IGJvb2xlYW4sIGlzQ2hhaW5pbmc6IGJvb2xlYW4pOiBib29sZWFuIHtcblxuICAgICAgICBDb250ZXh0Ll9EZWJ1Z19TZXRzQ291bnQrKztcbiAgICAgICAgLy8gcHJpbnQoJ1NldHRpbmcga2V5L3ZhbGUgb250byBzdGFjazogJyArIGtleSArICc9JyArIHZhbHVlKTtcbiAgICAgICAgbGV0IGhhc09sZFZhbHVlID0gdGhpcy5fdmFsdWVzLmhhcyhrZXkpICYmIGlzUHJlc2VudCh0aGlzLl92YWx1ZXMuZ2V0KGtleSkpO1xuICAgICAgICBsZXQgb2xkVmFsID0gaGFzT2xkVmFsdWUgPyB0aGlzLl92YWx1ZXMuZ2V0KGtleSkgOiBudWxsO1xuXG4gICAgICAgIGxldCBpc05ld1ZhbHVlID0gIWhhc09sZFZhbHVlIHx8IHRoaXMuX2lzTmV3VmFsdWUob2xkVmFsLCB2YWx1ZSk7XG5cbiAgICAgICAgbGV0IG1hdGNoaW5nUHJvcEtleUFzc2lnbm1lbnQgPSAhaXNOZXdWYWx1ZSAmJiAhaXNDaGFpbmluZyAmJlxuICAgICAgICAgICAgKCh0aGlzLl9tZXRhLmtleURhdGEoa2V5KS5pc1Byb3BlcnR5U2NvcGUpICYmXG4gICAgICAgICAgICAgICAga2V5ICE9PSB0aGlzLl9jdXJyZW50UHJvcGVydHlTY29wZUtleSgpKTtcbiAgICAgICAgaWYgKGlzTmV3VmFsdWUgfHwgbWF0Y2hpbmdQcm9wS2V5QXNzaWdubWVudCkge1xuICAgICAgICAgICAgbGV0IGxhc3RNYXRjaDogTWF0Y2hSZXN1bHQ7XG4gICAgICAgICAgICBsZXQgbmV3TWF0Y2g6IE1hdGNoUmVzdWx0O1xuXG4gICAgICAgICAgICBsZXQgc2FsaWVuY2UgPSB0aGlzLl9mcmFtZVN0YXJ0cy5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgbGFzdEFzc2lnbm1lbnRJZHggPSAtMTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKG9sZFZhbCkpIHtcbiAgICAgICAgICAgICAgICBsYXN0TWF0Y2ggPSB0aGlzLmxhc3RNYXRjaFdpdGhvdXRDb250ZXh0UHJvcHMoKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBXZSByZWNvbXB1dGUgdGhhdCBtYXRjaCB1cCB0byB0aGlzIHBvaW50IGJ5IHJlY29tcHV0aW5nIGZvcndhcmRcbiAgICAgICAgICAgICAgICAvLyBmcm9tIHRoZSBwb2ludCBvZiB0aGUgbGFzdCBhc3NpZ25tZW50IHRvIHRoaXMga2V5IChza2lwcGluZyBpdCksIHRoZW5cbiAgICAgICAgICAgICAgICAvLyBtYXRjaCBhZ2FpbnN0IHRoZSBhcnJheSBvZiBvdXIgdmFsdWUgYW5kIHRoZSBvbGRcblxuICAgICAgICAgICAgICAgIGxldCByZWNJZHggPSB0aGlzLl9lbnRyaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsYXN0QXNzaWdubWVudElkeCA9IHRoaXMuZmluZExhc3RBc3NpZ25tZW50T2ZLZXkoa2V5KTtcbiAgICAgICAgICAgICAgICBhc3NlcnQobGFzdEFzc2lnbm1lbnRJZHggPj0gMCxcbiAgICAgICAgICAgICAgICAgICAgJ1ZhbHVlIGluIGNvbnRleHQgYnV0IG5vIGFzc2lnbm1lbnQgcmVjb3JkIGZvdW5kICcgKyBrZXkgKyAnID0gJyArIG9sZFZhbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hpbmdQcm9wS2V5QXNzaWdubWVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVhcCB2ZXJzaW9uIG9mIG1hc2tpbmcgZm9yIGEgbWF0Y2hpbmcgc2V0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbnRyaWVzW2xhc3RBc3NpZ25tZW50SWR4XS5tYXNrZWRCeUlkeCA9IHJlY0lkeDtcbiAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoID0gdGhpcy5sYXN0TWF0Y2hXaXRob3V0Q29udGV4dFByb3BzKCk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBiZSBhYmxlIHRvIG92ZXJyaWRlIGEgbm9uLWNoYWluaW5nIGFzc2lnbm1lbnQuICBPdXIgcHJvYmxlbSBpcywgdGhvdWdoLCBpZlxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZGV2ZWxvcGVyIHdhbnRlZCB0byBmb3JjZSBhIHJlLWFzc2lnbm1lbnQgaW4gdGhlIG5ldyBmcmFtZSwgd2UnZCBmaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgb3V0IGFzIGEgZHVwbGljYXRlIGFzc2lnbm1lbnQgYWJvdmUuICBOb3csIHdlIGNvdWxkIGFsbG93IHRoYXQgYXNzaWdubWVudFxuICAgICAgICAgICAgICAgICAgICAvLyB0aHJvdWdoLCBidXQgaXQgd291bGQgdGhlbiBicmVhayBpbmxldGlhbnRzIHdoZW4gc2VhcmNoaW5nIGJhY2sgdG8gbWFzayBhXG4gICAgICAgICAgICAgICAgICAgIC8vIGtleSAod2Ugd291bGRuJ3QgcmVhbGl6ZSB0aGF0IHdlIG5lZWQgdG8gZ28gZnVydGhlciBiYWNrIHRvIGZpbmQgdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yaWdpbmFsIG9uZSkuXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFJlYzogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbbGFzdEFzc2lnbm1lbnRJZHhdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRSZWMuc3JlYy5zYWxpZW5jZSA9PT0gc2FsaWVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcmV2ID0gdGhpcy5maW5kTGFzdEFzc2lnbm1lbnRPZktleVdpdGhWYWx1ZShrZXksIHZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXYgIT09IC0xICYmIHRoaXMuX2VudHJpZXNbcHJldl0uc3JlYy5zYWxpZW5jZSA9PT0gc2FsaWVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDaGFpbmluZyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKG9sZFJlYy5zcmVjLnNhbGllbmNlID4gc2FsaWVuY2UgfHwgIW9sZFJlYy5zcmVjLmZyb21DaGFpbmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaW50KCdTZXQgb2Yga2V5IHNraXBwZWQgKHNhbGllbmNlICVzIDw9ICVzKScgKyBrZXkgKyAnLCAnICsgb2xkVmFsICtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICcsICcgKyB2YWx1ZSArICcsICcgKyBzYWxpZW5jZSArICcsICcgKyBvbGRSZWMuc3JlYy5zYWxpZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0QXNzaWdubWVudElkeCA9IHRoaXMuX3ByZXBhcmVGb3JPdmVycmlkZShyZWNJZHgsIGxhc3RBc3NpZ25tZW50SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3TWF0Y2ggPSB0aGlzLl9yZW1hdGNoRm9yT3ZlcnJpZGUoa2V5LCBzdmFsdWUsIHJlY0lkeCwgZmlyc3RBc3NpZ25tZW50SWR4KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWVyZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWV0YS5Qcm9wZXJ0eU1lcmdlcl9MaXN0Lm1lcmdlKG9sZFZhbCwgdmFsdWUsIHRoaXMuaXNEZWNsYXJlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhc3NlcnQodGhpcy5fZW50cmllcy5sZW5ndGggPD0gQ29udGV4dC5NYXhDb250ZXh0U3RhY2tTaXplLFxuICAgICAgICAgICAgICAgICdNZXRhVUkgY29udGV4dCBzdGFjayBleGNlZWRlZCBtYXggc2l6ZSAtLSBsaWtlbHkgaW5maW5pdGUgY2hhaW5pbmc6ICcgK1xuICAgICAgICAgICAgICAgIHRoaXMuX2VudHJpZXMubGVuZ3RoXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IHNyZWM6IFN0YXRpY1JlYyA9IG5ldyBTdGF0aWNSZWMoKTtcbiAgICAgICAgICAgIHNyZWMua2V5ID0ga2V5O1xuICAgICAgICAgICAgLy8gdG9kbzogY29udmVyc2lvblxuICAgICAgICAgICAgc3JlYy52YWwgPSBzdmFsdWU7XG4gICAgICAgICAgICBzcmVjLmxhc3RBc3NpZ25tZW50SWR4ID0gbGFzdEFzc2lnbm1lbnRJZHg7XG4gICAgICAgICAgICBzcmVjLnNhbGllbmNlID0gc2FsaWVuY2U7XG4gICAgICAgICAgICBzcmVjLmZyb21DaGFpbmluZyA9IGlzQ2hhaW5pbmc7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKG5ld01hdGNoKSkge1xuICAgICAgICAgICAgICAgIG5ld01hdGNoID0gKGlzUHJlc2VudCh2YWx1ZSkpID8gdGhpcy5fbWV0YS5tYXRjaChrZXksIHN2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoKSA6IGxhc3RNYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNyZWMubWF0Y2ggPSBuZXdNYXRjaDtcbiAgICAgICAgICAgIHNyZWMuYWN0aXZhdGlvbiA9IHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24uX3JlY3MucHVzaChzcmVjKTtcblxuICAgICAgICAgICAgbGV0IHJlYyA9IHRoaXMubmV3Q29udGV4dFJlYygpO1xuICAgICAgICAgICAgcmVjLnNyZWMgPSBzcmVjO1xuICAgICAgICAgICAgcmVjLnZhbCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fZW50cmllcy5wdXNoKHJlYyk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UHJvcGVydGllcyA9IG51bGw7XG5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5zZXQoa2V5LCB2YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCB0aGlzLmRlYnVnTmFtZSArICcgPT4gJyArXG4gICAgICAgICAgICAvLyAgICAgJ1B1c2goJyArIGtleSArICcsICcgKyBzdmFsdWUgKyAnKTogJyArICdNYXRjaGVzOiAnICsgbmV3TWF0Y2gubWF0Y2hlcygpLmxlbmd0aFxuICAgICAgICAgICAgLy8gICAgICsgJywgUHJvcE1hcDogJyArIHNyZWMucHJvcGVydGllcygpLnNpemUpO1xuXG4gICAgICAgICAgICBpZiAoQ29udGV4dC5fRGVidWdSdWxlTWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTWF0Y2goc3JlYy5tYXRjaCwga2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFzc2VydENvbnRleHRDb25zaXN0ZW50KCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gcHJpbnQoJ0NvbnRleHQgc2tpcHBlZCBhc3NpZ25tZW50IG9mIG1hdGNoaW5nIHByb3BlcnR5IHZhbHVlICVzID0gJXMgKGlzQ2hhaW5pbmcgPT1cbiAgICAgICAgICAgIC8vICVzLCBpc1Byb3BLZXkgPT0gJXMpJywga2V5LCB2YWx1ZSwgaXNDaGFpbmluZyxcbiAgICAgICAgICAgIC8vICh0aGlzLl9tZXRhLmtleURhdGEoa2V5KS5pc1Byb3BlcnR5U2NvcGUpKTtcblxuICAgICAgICAgICAgaWYgKCFpc0NoYWluaW5nICYmIHRoaXMubWV0YS5rZXlEYXRhKGtleSkuaXNQcm9wZXJ0eVNjb3BlKSB7XG4gICAgICAgICAgICAgICAgLy8gc2xhbSBkb3duIGEgcmVjIGZvciBwcm9wZXJ0eSBjb250ZXh0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgZ2V0IGZyYW1lU3RhcnRzKCk6IG51bWJlcltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lU3RhcnRzO1xuICAgIH1cblxuICAgIF91bmRvUmVjVmFsdWUocmVjOiBBc3NpZ25tZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChyZWMuc3JlYy5sYXN0QXNzaWdubWVudElkeCA9PT0gLTEgfHxcbiAgICAgICAgICAgIHRoaXMuX2VudHJpZXNbcmVjLnNyZWMubGFzdEFzc2lnbm1lbnRJZHhdLm1hc2tlZEJ5SWR4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzLmRlbGV0ZShyZWMuc3JlYy5rZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzLnNldChyZWMuc3JlYy5rZXksIHRoaXMuX2VudHJpZXNbcmVjLnNyZWMubGFzdEFzc2lnbm1lbnRJZHhdLnZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIFVuZG9lcyBhbmQgbWFza3MgYXNzaWdubWVudHMgaW52YWxpZGF0ZWQgYnkgb3ZlcnJpZGUgb2YgZ2l2ZW4gcmVjb3JkXG4gICAgLy8gUmV0dXJucyBzdGFjayBpbmRleCBmb3IgZmlyc3QgYXNzaWdubWVudCAoaS5lLiB3aGVyZSBtYXRjaCByZWNvbXB1dGF0aW9uIG11c3Qgc3RhcnQpXG4gICAgX3ByZXBhcmVGb3JPdmVycmlkZShvdmVycmlkZUluZGV4OiBudW1iZXIsIGxhc3RBc3NpZ25tZW50SWR4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICAvLyBpZiB3ZSdyZSBvdmVycmlkaW5nIGEgcHJvcCBjb250ZXh0IG92ZXJyaWRlIG9mIGEgbWF0Y2hpbmcgdmFsdWUsIGJhY2sgdXAgZnVydGhlclxuICAgICAgICBsZXQgbGFzdExhc3RJZHggPSAwO1xuICAgICAgICB3aGlsZSAoKChsYXN0TGFzdElkeCA9IHRoaXMuX2VudHJpZXNbbGFzdEFzc2lnbm1lbnRJZHhdLnNyZWMubGFzdEFzc2lnbm1lbnRJZHgpICE9PSAtMSkgJiZcbiAgICAgICAgKHRoaXMuX2VudHJpZXNbbGFzdEFzc2lnbm1lbnRJZHhdLm1hc2tlZEJ5SWR4IDw9IDApKSB7XG4gICAgICAgICAgICAvLyBtYXJrIGl0ISAod2UnbGwgcGljayBpdCB1cCBiZWxvdy4uLilcbiAgICAgICAgICAgIHRoaXMuX2VudHJpZXNbbGFzdEFzc2lnbm1lbnRJZHhdLm1hc2tlZEJ5SWR4ID0gLTE7XG4gICAgICAgICAgICBsYXN0QXNzaWdubWVudElkeCA9IGxhc3RMYXN0SWR4O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdW5kbyBhbGwgY29uZmxpY3Rpbmcgb3IgZGVydmllZCBhc3NpZ25tZW50cyAoYW5kIG1hcmsgdGhlbSlcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSBsYXN0QXNzaWdubWVudElkeDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgciA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHVuZG8gKGFuZCBtYXNrKSBhbnkgcmVjb3JkIHRoYXQgY29uZmxpY3Qgb3IgYXJlIGRlcml2ZWRcbiAgICAgICAgICAgIC8vIE5PVEU6IFdlIGFyZSBza2lwcGluZyB0aGUgcmVtb3ZlIGFsbCBjaGFpbmVkIHJlY29yZHMsIGJlY2F1c2UgdGhpcyBjYW4gcmVzdWx0IGluXG4gICAgICAgICAgICAvLyB1bmRvaW5nIGRlcml2ZWQgc3RhdGUgdG90YWxseSB1bnJlbGF0ZWQgdG8gdGhpcyBrZXkuICBJZGVhbGx5IHdlJ2QgZmlndXJlIG91dCB3aGF0XG4gICAgICAgICAgICAvLyBkZXBlbmRlZCBvbiB3aGF0Li4uXG4gICAgICAgICAgICBpZiAoci5tYXNrZWRCeUlkeCA8PSAwICYmIChpID09PSBsYXN0QXNzaWdubWVudElkeCB8fCByLm1hc2tlZEJ5SWR4ID09PSAtMSkpIHtcbiAgICAgICAgICAgICAgICAvLyB8fCByLnNyZWMuZnJvbUNoYWluaW5nXG4gICAgICAgICAgICAgICAgLy8gbWFyayBhbmQgdW5kbyBpdFxuICAgICAgICAgICAgICAgIHIubWFza2VkQnlJZHggPSBvdmVycmlkZUluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuX3VuZG9SZWNWYWx1ZShyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFzdEFzc2lnbm1lbnRJZHg7XG4gICAgfVxuXG5cbiAgICBfcmVtYXRjaEZvck92ZXJyaWRlKGtleTogc3RyaW5nLCBzdmFsdWU6IGFueSwgb3ZlcnJpZGVJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RBc3NpZ25tZW50SWR4OiBudW1iZXIpOiBNYXRjaFJlc3VsdCB7XG4gICAgICAgIC8vIHN0YXJ0IGZyb20gdGhlIHRvcCBkb3duIGxvb2tpbmcgZm9yIHRoYXQgbGFzdCB1bm1hc2tlZCByZWNvcmRcbiAgICAgICAgbGV0IGxhc3RNYXRjaDogTWF0Y2hSZXN1bHQ7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yICg7IGkgPCBmaXJzdEFzc2lnbm1lbnRJZHg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJlYyA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICBpZiAocmVjLm1hc2tlZEJ5SWR4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0TWF0Y2ggPSByZWMuc3JlYy5tYXRjaDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVycmlkZXNNYXRjaDogVW5pb25NYXRjaFJlc3VsdDtcblxuICAgICAgICAvLyBSZW1hdGNoIHNraXBwaW5nIG92ZXIgdGhlIGxhc3QgYXNzaWdubWVudCBvZiB0aGlzIHByb3BlcnR5XG4gICAgICAgIC8vIGFuZCBhbGwgYXNzaWdubWVudHMgZnJvbSBjaGFpbmdpbmdcbiAgICAgICAgZm9yIChsZXQgZW5kID0gdGhpcy5fZW50cmllcy5sZW5ndGg7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHI6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgLy8gcmVtYXRjaCBvbiBhbnkgdW5tYXNrZWQgcmVjb3Jkc1xuICAgICAgICAgICAgaWYgKHIubWFza2VkQnlJZHggPT09IDApIHtcbiAgICAgICAgICAgICAgICBsYXN0TWF0Y2ggPSB0aGlzLl9tZXRhLm1hdGNoKHIuc3JlYy5rZXksIHIuc3JlYy52YWwsIGxhc3RNYXRjaCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFjY3VtdWxhdGUgbWFza2VkICgnX28nKSBtYXRjaFxuICAgICAgICAgICAgICAgIG92ZXJyaWRlc01hdGNoID0gdGhpcy5fbWV0YS51bmlvbk92ZXJyaWRlTWF0Y2goci5zcmVjLmtleSwgci5zcmVjLnZhbCxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcnJpZGVzTWF0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChzdmFsdWUpIHx8IGlzQmxhbmsobGFzdE1hdGNoKSkge1xuICAgICAgICAgICAgbGFzdE1hdGNoID0gdGhpcy5fbWV0YS5tYXRjaChrZXksIHN2YWx1ZSwgbGFzdE1hdGNoKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0TWF0Y2guc2V0T3ZlcnJpZGVzTWF0Y2gob3ZlcnJpZGVzTWF0Y2gpO1xuICAgICAgICByZXR1cm4gbGFzdE1hdGNoO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfdW5kb092ZXJyaWRlKHJlYzogQXNzaWdubWVudCwgcmVjSWR4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGxhc3RBc3NpZ25tZW50SWR4ID0gcmVjLnNyZWMubGFzdEFzc2lnbm1lbnRJZHg7XG4gICAgICAgIGxldCBsYXN0TGFzdElkeDogbnVtYmVyO1xuXG5cbiAgICAgICAgLy8gYmFzdGljayB1cCBmdXJ0aGVyIGlmIG5lY2Vzc2FyeVxuICAgICAgICB3aGlsZSAoKChsYXN0TGFzdElkeCA9IHRoaXMuX2VudHJpZXNbbGFzdEFzc2lnbm1lbnRJZHhdLnNyZWMubGFzdEFzc2lnbm1lbnRJZHgpICE9PSAtMSkgJiZcbiAgICAgICAgKHRoaXMuX2VudHJpZXNbbGFzdExhc3RJZHhdLm1hc2tlZEJ5SWR4ID09PSByZWNJZHgpKSB7XG4gICAgICAgICAgICBsYXN0QXNzaWdubWVudElkeCA9IGxhc3RMYXN0SWR4O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGxhc3RBc3NpZ25tZW50SWR4LCBjID0gdGhpcy5fZW50cmllcy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcblxuICAgICAgICAgICAgaWYgKHIubWFza2VkQnlJZHggPT09IHJlY0lkeCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5zZXQoci5zcmVjLmtleSwgci52YWwpO1xuICAgICAgICAgICAgICAgIHIubWFza2VkQnlJZHggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBfY2hlY2tNYXRjaChtYXRjaDogTWF0Y2hSZXN1bHQsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIG1hdGNoLl9jaGVja01hdGNoKHRoaXMuX3ZhbHVlcywgdGhpcy5fbWV0YSk7XG4gICAgfVxuXG4gICAgZmluZExhc3RBc3NpZ25tZW50T2ZLZXkoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHJlYzogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICBpZiAocmVjLnNyZWMua2V5ID09PSBrZXkgJiYgcmVjLm1hc2tlZEJ5SWR4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGZpbmRMYXN0QXNzaWdubWVudE9mS2V5V2l0aFZhbHVlKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogbnVtYmVyIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCByZWM6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgaWYgKHJlYy5zcmVjLmtleSA9PT0ga2V5ICYmICF0aGlzLl9pc05ld1ZhbHVlKHJlYy52YWwsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHdlIGhhdmUgdmFsdWUgbWlycm9yaW5nIChwcm9wZXJ0eSB0byBjb250ZXh0KSB0byBkbyBEeW5hbWljIHByb3BlcnR5IG1pcnJvcmluZyB3aWxsXG4gICAgICogYmUgYWRkZWQgdG8gdGhlIGN1cnJlbnRBY3RpdmF0aW9uIGRlZmVycmVkQXNzaWdubWVudCBsaXN0XG4gICAgICpcbiAgICAgKi9cbiAgICBfY2hlY2tBcHBseVByb3BlcnRpZXMoKTogYm9vbGVhbiB7XG5cbiAgICAgICAgbGV0IGRpZFNldCA9IGZhbHNlO1xuICAgICAgICBsZXQgbnVtRW50cmllcyA9IDA7XG4gICAgICAgIGxldCBsYXN0U2l6ZSA9IDA7XG4gICAgICAgIGxldCBkZWNsYXJlS2V5OiBzdHJpbmcgPSB0aGlzLl9pbkRlY2xhcmUoKSA/IHRoaXMuX3ZhbHVlcy5nZXQoTWV0YS5LZXlEZWNsYXJlKSA6IG51bGw7XG5cbiAgICAgICAgd2hpbGUgKChudW1FbnRyaWVzID0gdGhpcy5fZW50cmllcy5sZW5ndGgpID4gbGFzdFNpemUpIHtcbiAgICAgICAgICAgIGxhc3RTaXplID0gbnVtRW50cmllcztcbiAgICAgICAgICAgIGxldCByZWM6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW251bUVudHJpZXMgLSAxXTtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0aWVzOiBQcm9wZXJ0eU1hcCA9IHJlYy5zcmVjLnByb3BlcnRpZXMoKTtcblxuICAgICAgICAgICAgbGV0IGNvbnRleHRLZXlzOiBBcnJheTxQcm9wZXJ0eU1hbmFnZXI+ID0gcHJvcGVydGllcy5jb250ZXh0S2V5c1VwZGF0ZWQ7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoY29udGV4dEtleXMpKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IGNvbnRleHRLZXlzLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wTWdyOiBQcm9wZXJ0eU1hbmFnZXIgPSBjb250ZXh0S2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleTogc3RyaW5nID0gcHJvcE1nci5fbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChkZWNsYXJlS2V5KSAmJiBrZXkgPT09IGRlY2xhcmVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFRvRG86IGFwcGx5aW5nIHJlc29sdmVkIHZhbHVlIC0tIG5lZWQgdG8gZGVmZXIgcmVzb2x1dGlvbiBvbiB0cnVlIGR5bmFtaWNcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFsdWVzIFN1cHByZXNzIGNoYWluZWQgYXNzaWdubWVudCBpZjogMSkgT3VyIHBhcmVudCB3aWxsIGFzc2lnbiB0aGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIHByb3BlcnR5IChoYXMgYSBkZWZlcnJlZCBhY3RpdmF0aW9uIGZvciBpdCksIG9yIDIpIFRoZXJlJ3MgYWxyZWFkeSBhXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoaW5nIGFzc2lnbm1lbnQgd2l0aCBoaWdoZXIgc2FsaWVuY2VcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1ZhbCA9IHRoaXMuc3RhdGljYWxseVJlc29sdmVWYWx1ZShwcm9wZXJ0aWVzLmdldChrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZQcm9wczogUHJvcGVydHlNYXA7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1cHByZXNzOiBib29sZWFuID0gKGlzUHJlc2VudChwcmV2UHJvcHMpICYmIHByZXZQcm9wcy5oYXMoa2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgIXRoaXMuX2lzTmV3VmFsdWUodGhpcy5zdGF0aWNhbGx5UmVzb2x2ZVZhbHVlKHByZXZQcm9wcy5nZXQoa2V5KSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl9jdXJyZW50QWN0aXZhdGlvbi5fcGFyZW50Lmhhc0RlZmVycmVkQXNzaWdubWVudEZvcktleShrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogJiYgdGhpcy5fdmFsdWVzLmNvbnRhaW5zS2V5KGtleSkgKi8pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3VwcHJlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaXJyb3JLZXkgPSBwcm9wTWdyLl9rZXlEYXRhVG9TZXQuX2tleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaW50KCcoZGVmZXJyZWQpIGNoYWluaW5nIGtleTogJyAsIHByb3BNZ3IuX2tleURhdGFUb1NldC5fa2V5KTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24uYWRkRGVmZXJyZWRBc3NpZ25tZW50KG1pcnJvcktleSwgbmV3VmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29tcGFyZSB0aGlzIHZhbHVlIHRvIHRoZSB2YWx1ZSBmcm9tIHRoZSBlbmQgb2YgdGhlIGxhc3QgZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmludCgnY2hhaW5pbmcga2V5OiAnICwgcHJvcE1nci5fa2V5RGF0YVRvU2V0Ll9rZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXQyKG1pcnJvcktleSwgbmV3VmFsLCBuZXdWYWwsIGZhbHNlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWRTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaW50KCdTVVBQUkVTU0VEIGNoYWluaW5nIGtleTogJyAsIHByb3BNZ3IuX2tleURhdGFUb1NldC5fa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlkU2V0O1xuICAgIH1cblxuXG4gICAgYXBwbHlQcm9wZXJ0eUNvbnRleHRBbmRDaGFpbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2NoZWNrUHJvcGVydHlDb250ZXh0KCkpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9jaGVja0FwcGx5UHJvcGVydGllcygpKSB7XG4gICAgICAgICAgICAgICAgLyogcmVwZWF0ICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIF9jdXJyZW50UHJvcGVydHlTY29wZUtleSgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgZm91bmRLZXk6IHN0cmluZztcbiAgICAgICAgbGV0IGZvdW5kQWN0aXZhdGlvbjogQWN0aXZhdGlvbjtcblxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHJlYzogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGZvdW5kQWN0aXZhdGlvbikgJiYgcmVjLnNyZWMuYWN0aXZhdGlvbiAhPT0gZm91bmRBY3RpdmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fbWV0YS5rZXlEYXRhKHJlYy5zcmVjLmtleSkuaXNQcm9wZXJ0eVNjb3BlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWMuc3JlYy5mcm9tQ2hhaW5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYy5zcmVjLmtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZm9yIGNoYWluaW5nIGFzc2lnbm1lbnRzLCB3ZSBrZWVwIGxvb2tpbmcgdW50aWwgd2UgZXhoYXVzdCB0aGUgZmlyc3RcbiAgICAgICAgICAgICAgICAvLyBub24tY2hhaW5pbmcgYWN0aXZhdGlvbiBUb2RvOiBicm9rZW4gLS0gZGlzYWJsaW5nIHNldCBvZiBjb250ZXh0IGtleSBmcm9tXG4gICAgICAgICAgICAgICAgLy8gY2hhaW5pbmcgaWYgKGZvdW5kS2V5ID09PSBudWxsKSBmb3VuZEtleSA9IHNjb3BlS2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChmb3VuZEtleSkgJiYgIXJlYy5zcmVjLmZyb21DaGFpbmluZykge1xuICAgICAgICAgICAgICAgIGZvdW5kQWN0aXZhdGlvbiA9IHJlYy5zcmVjLmFjdGl2YXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvdW5kS2V5O1xuXG4gICAgfVxuXG5cbiAgICAvLyBBcHBseSBhICdwcm9wZXJ0eSBjb250ZXh0JyBwcm9wZXJ0eSAoZS5nLiBmaWVsZF9wIGZvciBmaWVsZCkgdG8gdGhlIGNvbnRleHQgaWYgbmVjZXNzYXJ5XG4gICAgX2NoZWNrUHJvcGVydHlDb250ZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBhc3NlcnQodGhpcy5fdmFsdWVzIGluc3RhbmNlb2YgTmVzdGVkTWFwLCAnUHJvcGVydHkgYXNzaWdubWVudCBvbiBiYXNlIG1hcD8nKTtcbiAgICAgICAgbGV0IHNjb3BlS2V5OiBzdHJpbmcgPSB0aGlzLl9jdXJyZW50UHJvcGVydHlTY29wZUtleSgpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHNjb3BlS2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NldDIoTWV0YS5TY29wZUtleSwgc2NvcGVLZXksIHNjb3BlS2V5LCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIGRlYnVnKCk6IHZvaWQge1xuICAgICAgICAvLyBzZXQgZGVidWdnZXIgYnJlYWtwb2ludCBoZXJlXG4gICAgICAgIHByaW50KCcqKioqKiogIERlYnVnIENhbGwgKioqKioqJyk7XG4gICAgICAgIHRoaXMuX2xvZ0NvbnRleHQoKTtcbiAgICB9XG5cblxuICAgIGRlYnVnU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgU3RyaW5nSm9pbmVyKFsnPGI+Q29udGV4dDo8L2I+Jm5ic3A7J10pO1xuXG4gICAgICAgIGJ1ZmZlci5hZGQoJygmbmJzcDsnKTtcbiAgICAgICAgYnVmZmVyLmFkZCh0aGlzLl9lbnRyaWVzLmxlbmd0aCArICcnKTtcbiAgICAgICAgYnVmZmVyLmFkZCgnIGVudHJpZXMnKTtcbiAgICAgICAgYnVmZmVyLmFkZCgnJm5ic3A7KTxici8+Jyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwID0gaTtcbiAgICAgICAgICAgIHdoaWxlIChzcC0tID4gMCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5hZGQoJyZuYnNwOycpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGxldCByOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcblxuICAgICAgICAgICAgYnVmZmVyLmFkZCgnJm5ic3A7Jyk7XG4gICAgICAgICAgICBidWZmZXIuYWRkKHIuc3JlYy5rZXkpO1xuICAgICAgICAgICAgYnVmZmVyLmFkZCgnJm5ic3A7Jm5ic3A7OiZuYnNwOycpO1xuICAgICAgICAgICAgYnVmZmVyLmFkZChyLnNyZWMudmFsKTtcbiAgICAgICAgICAgIGJ1ZmZlci5hZGQoKHIuc3JlYy5mcm9tQ2hhaW5pbmcgPyAnIF4nIDogJycpKTtcbiAgICAgICAgICAgIGJ1ZmZlci5hZGQoKHIubWFza2VkQnlJZHggIT09IDAgPyAnIFgnIDogJycpKTtcbiAgICAgICAgICAgIGJ1ZmZlci5hZGQoJzxici8+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcGVydHlBY3RpdmF0aW9uOiBBY3RpdmF0aW9uID0gdGhpcy5jdXJyZW50QWN0aXZhdGlvbi5fcHJvcGVydHlBY3RpdmF0aW9uO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHByb3BlcnR5QWN0aXZhdGlvbikpIHtcbiAgICAgICAgICAgIGxldCBzcmVjczogQXJyYXk8U3RhdGljUmVjPiA9IHByb3BlcnR5QWN0aXZhdGlvbi5fcmVjcztcblxuICAgICAgICAgICAgYnVmZmVyLmFkZCgnJm5ic3A7Jm5ic3A7Jm5ic3A7PGI+UHJvcGVydHlBY3RpdmF0aW9uLi4uPC9iPjxici8+Jyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gc3JlY3MubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNwID0gaSArIHRoaXMuX2VudHJpZXMubGVuZ3RoICsgMTtcblxuICAgICAgICAgICAgICAgIHdoaWxlIChzcC0tID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIuYWRkKCcmbmJzcDsmbmJzcDsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHI6IFN0YXRpY1JlYyA9IHNyZWNzW2ldO1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5hZGQoci5rZXkpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5hZGQoJyZuYnNwOyZuYnNwOzombmJzcDsnKTtcbiAgICAgICAgICAgICAgICBidWZmZXIuYWRkKHIudmFsKTtcbiAgICAgICAgICAgICAgICBidWZmZXIuYWRkKChyLmZyb21DaGFpbmluZyA/ICcmbmJzcDsmbmJzcDsnIDogJyZuYnNwOyZuYnNwOyEnKSk7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmFkZCgnPGJyLz4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBidWZmZXIuYWRkKCcmbmJzcDs8YnIvPjxiPlByb3BzOjwvYj48YnIvPicpO1xuICAgICAgICB0aGlzLndyaXRlUHJvcGVydGllcyhidWZmZXIsIHRoaXMuYWxsUHJvcGVydGllcygpLCAxLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIGJ1ZmZlci50b1N0cmluZygpO1xuICAgIH1cblxuICAgIF9sb2dDb250ZXh0KCk6IHZvaWQge1xuICAgICAgICBsZXQgZGVidWdTdHJpbmc6IHN0cmluZyA9IHRoaXMuZGVidWdTdHJpbmcoKTtcbiAgICAgICAgcHJpbnQoZGVidWdTdHJpbmcpO1xuICAgICAgICBwcmludCgnXFxuJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3cml0ZVByb3BlcnRpZXMoYnVmOiBTdHJpbmdKb2luZXIsIHByb3BlcnRpZXM6IE1hcDxzdHJpbmcsIGFueT4sIGxldmVsOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlTGluZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBNYXBXcmFwcGVyLml0ZXJhYmxlKHByb3BlcnRpZXMpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICghc2luZ2xlTGluZSkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChsZXZlbC0tID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKCcmbmJzcDsmbmJzcDsmbmJzcDsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBidWYuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgYnVmLmFkZCgnIDpudWxsJyk7XG4gICAgICAgICAgICAgICAgYnVmLmFkZChzaW5nbGVMaW5lID8gJzsmbmJzcDsmbmJzcDsnIDogJzs8YnIvPicpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJyZuYnNwOyZuYnNwOyZuYnNwOycpO1xuICAgICAgICAgICAgICAgIGJ1Zi5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICBidWYuYWRkKCc6Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKCcmbmJzcDsmbmJzcDsnKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJyZuYnNwOyZuYnNwOycpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZ01hcCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCgneycpO1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCgnfScpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEV4cHIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCh2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoTWFwV3JhcHBlci50b1N0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIudG9TdHJpbmcodmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE92ZXJyaWRlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCh2YWx1ZS50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWVsZFBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCgnJCcpO1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzaW5nbGVMaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJzsnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKCc8YnIvPicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGxhc3RNYXRjaFdpdGhvdXRDb250ZXh0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5pc0VtcHR5KFxuICAgICAgICAgICAgdGhpcy5fZW50cmllcykgPyBudWxsIDogdGhpcy5fZW50cmllc1t0aGlzLl9lbnRyaWVzLmxlbmd0aCAtIDFdLnNyZWMubWF0Y2g7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGxhc3RNYXRjaCgpIHtcbiAgICAgICAgaWYgKExpc3RXcmFwcGVyLmlzRW1wdHkodGhpcy5fZW50cmllcykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtYXRjaDogTWF0Y2hSZXN1bHQgPSBMaXN0V3JhcHBlci5sYXN0PEFzc2lnbm1lbnQ+KHRoaXMuX2VudHJpZXMpXG4gICAgICAgICAgICAucHJvcGVydHlMb2NhbE1hdGNoZXModGhpcyk7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KG1hdGNoKSkgPyBtYXRjaCA6IHRoaXMubGFzdE1hdGNoV2l0aG91dENvbnRleHRQcm9wcygpO1xuXG4gICAgfVxuXG4gICAgbGFzdFN0YXRpY1JlYygpOiBTdGF0aWNSZWMge1xuICAgICAgICBpZiAoTGlzdFdyYXBwZXIuaXNFbXB0eSh0aGlzLl9lbnRyaWVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlYzogU3RhdGljUmVjID0gTGlzdFdyYXBwZXIubGFzdCh0aGlzLl9lbnRyaWVzKS5wcm9wZXJ0eUxvY2FsU3RhdGljUmVjKHRoaXMpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHJlYykgPyByZWMgOiBMaXN0V3JhcHBlci5sYXN0KHRoaXMuX2VudHJpZXMpLnNyZWM7XG4gICAgfVxuXG5cbiAgICBnZXQgcmVjUG9vbCgpOiBBcnJheTxBc3NpZ25tZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWNQb29sO1xuICAgIH1cblxuXG4gICAgZ2V0IGN1cnJlbnRBY3RpdmF0aW9uKCk6IEFjdGl2YXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEFjdGl2YXRpb247XG4gICAgfVxuXG5cbiAgICBleHRlbmRlZEZpZWxkcygpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgc2hhcmFibGUvcmUtYXBwbGljYWJsZSBibG9jayBvZiBzZXRTY29wZUtleUFzc2lnbm1lbnQgX1N0YXRpY1JlY3MuICBBbiBBY3RpdmF0aW9uIGNvbnRhaW5zXG4gKiB0aGUgbGlzdCBvZiBhc3NpZ25tZW50IHJlY29yZHMgcmVzdWx0aW5nIGZyb20gKGNoYWluaW5nIGZyb20pIGEgc2luZ2xlIG9yaWdpbmFsXG4gKiBhc3NpZ25tZW50IChhcyB3ZWxsIGFzIF9EZWZlcnJlZEFzc2lnbm1lbnQgcmVjb3JkcyBmb3IgZHluYW1pYyB2YWx1ZXMgdGhhdCBjYW5ub3RcbiAqIGJlIHN0YXRpY2FsbHkgcmVzb2x2ZWQgdG8gcmVjb3JkcykuICBBY3RpdmF0aW9ucyBmb3JtIGEgc2hhcmVkL2NhY2hlZCB0cmVlLCBiYXNlZFxuICogb24gY29udGV4dCBhc3NpZ25tZW50IHBhdGhzIHByZXZpb3VzbHkgdHJhdmVyc2VkIHZpYSBhc3NpZ25tZW50cyB0byBzb21lIENvbnRleHQuXG4gKiBTdWJzZXF1ZW50IHRyYXZlcnNhbHMgb2YgdGhlc2UgcGF0aHMgKGxpa2VseSBieSBkaWZmZXJlbnQgQ29udGV4dCBpbnN0YW5jZXMpXG4gKiBhcmUgZ3JlYXRseSBvcHRpbWl6ZWQ6IGFuIGV4aXN0aW5nIEFjdGl2YXRpb24gaXMgcmV0cmlldmVkIGFuZCBpdHMgcmVjb3JkcyBhcHBlbmRlZFxuICogdG8gdGhlIGNvbnRleHQncyBfZW50cmllcyBzdGFjazsgYWxsIG9mIHRoZSB0cmFkaXRpb25hbCBjb21wdXRhdGlvbiBvZiBydWxlIG1hdGNoIGxvb2t1cHMsXG4gKiBjaGFpbmVkIGFzc2lnbm1lbnRzIGFuZCBvdmVycmlkZSBpbmRleGVzIGlzIGJ5cGFzc2VkLlxuICogQWN0aXZhdGlvbiBnaXZlcyBzcGVjaWFsIHRyZWF0bWVudCB0byB0aGUgJ3Byb3BlcnR5QWN0aXZhdGlvbicsIGkuZS4gdGhlIGFjdGl2YXRpb25cbiAqIHJlc3VsdGluZyBmcm9tIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGUgJ3Njb3BlS2V5JyB0byB0aGUgY3VycmVudCBjb250ZXh0LiAgUHJvcGVydHkgbG9va3VwXG4gKiBmb2xsb3dpbmcgYW5kIGNvbnRleHQgYXNzaWdubWVudCByZXF1aXJlIGFwcGxpY2F0aW9uIG9mIHRoZSBzY29wZUtleSwgYnV0IHRoZW4gdGhlIHNjb3BlIGtleVxuICogbXVzdCBpbW1lZGlhdGVseSBiZSBwb3BwZWQgZm9yIHRoZSBuZXh0IGNvbnRleHQgYXNzaWdubWVudC4gIFRvIGF2b2lkIHRoaXMgY29uc3RhbnQgcHVzaC9wb3BcbiAqIG9uIHRoZSBib3R0b20gb2YgdGhlIHN0YWNrLCBfQWN0aXZhdGlvbnMgY2FjaGUgYSBzaWRlIGFjdGl2YXRpb24gKHRoZSBwcm9wZXJ0eUFjdGl2YXRpb24pXG4gKiBmb3IgdGhlIHJlc3VsdCBvZiBhcHBseWluZyB0aGUgc2NvcGVLZXkgdG8gdGhlIGN1cnJlbnQgYWN0aXZhdGlvbi4gIFRoaXMgc3RhY2sgKGFuZCBpdHNcbiAqIHByb3BlcnRpZXMpIGFyZSBjYWNoZWQgb24gdGhlIHNpZGUsIGFuZCBjYW4gYmUgYWNjZXNzZWQgd2l0aG91dCBhY3R1YWxseSBtb2RpZnlpbmcgdGhlIG1haW5cbiAqIGNvbnRleHQgc3RhY2suXG4gKi9cblxuZXhwb3J0IGNsYXNzIEFjdGl2YXRpb24ge1xuXG4gICAgX3JlY3M6IEFycmF5PFN0YXRpY1JlYz4gPSBuZXcgQXJyYXk8U3RhdGljUmVjPigpO1xuICAgIF9vcmlnRW50cnlDb3VudDogbnVtYmVyID0gMDtcbiAgICBfdmFsdWVOb2RlTWFwQnlDb250ZXh0S2V5OiBNYXA8c3RyaW5nLCBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55Pj47XG4gICAgX3ZhbHVlTm9kZU1hcEJ5Q29udGV4dEtleUNoYWluaW5nOiBNYXA8c3RyaW5nLCBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55Pj47XG5cbiAgICBfcHJvcGVydHlBY3RpdmF0aW9uOiBBY3RpdmF0aW9uO1xuICAgIF9uZXN0ZWRWYWx1ZXM6IE5lc3RlZE1hcDxzdHJpbmcsIGFueT47XG4gICAgZGVmZXJyZWRBc3NpZ25tZW50czogQXJyYXk8RGVmZXJyZWRBc3NpZ25tZW50PjtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIF9wYXJlbnQ/OiBBY3RpdmF0aW9uKSB7XG5cbiAgICB9XG5cbiAgICBnZXRDaGlsZEFjdGl2YXRpb24oY29udGV4dEtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBjaGFpbmluZzogYm9vbGVhbik6IEFjdGl2YXRpb24ge1xuICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gTWV0YS5OdWxsTWFya2VyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJ5S2V5OiBNYXA8c3RyaW5nLCBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55Pj4gPSAoY2hhaW5pbmcpXG4gICAgICAgICAgICA/IHRoaXMuX3ZhbHVlTm9kZU1hcEJ5Q29udGV4dEtleUNoYWluaW5nIDpcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlTm9kZU1hcEJ5Q29udGV4dEtleTtcblxuICAgICAgICBpZiAoaXNCbGFuayhieUtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBieVZhbDogQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4gPSBieUtleS5nZXQoY29udGV4dEtleSk7XG4gICAgICAgIHJldHVybiAoaXNCbGFuayhieVZhbCkpID8gbnVsbCA6IGJ5VmFsLmdldFZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBjYWNoZUNoaWxkQWN0aXZhdGlvbihjb250ZXh0S2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGFjdGl2YXRpb246IEFjdGl2YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5pbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IE1ldGEuTnVsbE1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBieUtleTogTWFwPHN0cmluZywgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4+O1xuICAgICAgICBpZiAoY2hhaW5pbmcpIHtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKChieUtleSA9IHRoaXMuX3ZhbHVlTm9kZU1hcEJ5Q29udGV4dEtleUNoYWluaW5nKSkpIHtcbiAgICAgICAgICAgICAgICBieUtleSA9IHRoaXMuX3ZhbHVlTm9kZU1hcEJ5Q29udGV4dEtleUNoYWluaW5nXG4gICAgICAgICAgICAgICAgICAgID0gbmV3IE1hcDxzdHJpbmcsIENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+PigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsoKGJ5S2V5ID0gdGhpcy5fdmFsdWVOb2RlTWFwQnlDb250ZXh0S2V5KSkpIHtcbiAgICAgICAgICAgICAgICBieUtleSA9IHRoaXMuX3ZhbHVlTm9kZU1hcEJ5Q29udGV4dEtleVxuICAgICAgICAgICAgICAgICAgICA9IG5ldyBNYXA8c3RyaW5nLCBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55Pj4oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJ5VmFsOiBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55PiA9IGJ5S2V5LmdldChjb250ZXh0S2V5KTtcbiAgICAgICAgaWYgKGlzQmxhbmsoYnlWYWwpKSB7XG4gICAgICAgICAgICBieVZhbCA9IG5ldyBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55PigpO1xuICAgICAgICAgICAgYnlLZXkuc2V0KGNvbnRleHRLZXksIGJ5VmFsKTtcbiAgICAgICAgfVxuICAgICAgICBieVZhbC5zZXRWYWx1ZSh2YWx1ZSwgYWN0aXZhdGlvbik7XG4gICAgfVxuXG4gICAgYWRkRGVmZXJyZWRBc3NpZ25tZW50KGtleTogc3RyaW5nLCB2YWx1ZTogRHluYW1pY1Byb3BlcnR5VmFsdWUpOiB2b2lkIHtcbiAgICAgICAgbGV0IG5ld0RhOiBEZWZlcnJlZEFzc2lnbm1lbnQ7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5kZWZlcnJlZEFzc2lnbm1lbnRzKSkge1xuICAgICAgICAgICAgdGhpcy5kZWZlcnJlZEFzc2lnbm1lbnRzID0gbmV3IEFycmF5PERlZmVycmVkQXNzaWdubWVudD4oKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgZGEgb2YgdGhpcy5kZWZlcnJlZEFzc2lnbm1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhID0gZGE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCbGFuayhuZXdEYSkpIHtcbiAgICAgICAgICAgIG5ld0RhID0gbmV3IERlZmVycmVkQXNzaWdubWVudCgpO1xuICAgICAgICAgICAgbmV3RGEua2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpcy5kZWZlcnJlZEFzc2lnbm1lbnRzLnB1c2gobmV3RGEpO1xuICAgICAgICB9XG4gICAgICAgIG5ld0RhLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaGFzRGVmZXJyZWRBc3NpZ25tZW50Rm9yS2V5KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kZWZlcnJlZEFzc2lnbm1lbnRzKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgZGEgb2YgdGhpcy5kZWZlcnJlZEFzc2lnbm1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJvcGVydHlBY3RpdmF0aW9uKGNvbnRleHQ6IENvbnRleHQpOiBBY3RpdmF0aW9uIHtcbiAgICAgICAgYXNzZXJ0KGNvbnRleHQuY3VycmVudEFjdGl2YXRpb24gPT09IHRoaXMsXG4gICAgICAgICAgICAnUHJvcGVydHlBY3RpdmF0aW9uIHNvdWdodCBvbiBub24gdG9wIG9mIHN0YWNrIGFjdGl2YXRpb24nKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9wcm9wZXJ0eUFjdGl2YXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0eUFjdGl2YXRpb24gPSBjb250ZXh0Ll9jcmVhdGVOZXdQcm9wZXJ0eUNvbnRleHRBY3RpdmF0aW9uKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9wcm9wZXJ0eUFjdGl2YXRpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvcGVydHlBY3RpdmF0aW9uID0gdGhpcztcbiAgICAgICAgICAgIH0gLy8gdGhpcyBhcyBudWxsIG1hcmtlclxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eUFjdGl2YXRpb24gIT09IHRoaXMgPyB0aGlzLl9wcm9wZXJ0eUFjdGl2YXRpb24gOiBudWxsO1xuICAgIH1cblxuXG4gICAgZmluZEV4aXN0aW5nUHJvcGVydHlBY3RpdmF0aW9uKCk6IEFjdGl2YXRpb24ge1xuICAgICAgICBsZXQgYWN0aXZhdGlvbjogQWN0aXZhdGlvbiA9IHRoaXM7XG4gICAgICAgIHdoaWxlIChpc1ByZXNlbnQoYWN0aXZhdGlvbikpIHtcblxuICAgICAgICAgICAgbGV0IHByb3BlcnR5QWN0aXZhdGlvbjogQWN0aXZhdGlvbiA9IGFjdGl2YXRpb24uX3Byb3BlcnR5QWN0aXZhdGlvbjtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChwcm9wZXJ0eUFjdGl2YXRpb24pICYmIHByb3BlcnR5QWN0aXZhdGlvbiAhPT0gYWN0aXZhdGlvblxuICAgICAgICAgICAgICAgICYmICEoaXNCbGFuayhwcm9wZXJ0eUFjdGl2YXRpb24uX3JlY3MpIHx8IExpc3RXcmFwcGVyLmlzRW1wdHkoXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5QWN0aXZhdGlvbi5fcmVjcykpKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHlBY3RpdmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWN0aXZhdGlvbiA9IGFjdGl2YXRpb24uX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIC8vIHRvZG86IGJldHRlciBiZXR0ZXIgdG8gc3RyaW5nIGZvciBoYXNoaW5nXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIENvbGxlY3Rpb25zLnV0aWwubWFrZVN0cmluZyh0aGlzKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIERlZmVycmVkQXNzaWdubWVudCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgdmFsdWU6IER5bmFtaWNQcm9wZXJ0eVZhbHVlO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBBc3NpZ25tZW50U25hcHNob3Qge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHZhbHVlOiBhbnk7XG4gICAgc2FsaWVuY2U6IG51bWJlcjtcblxufVxuXG5leHBvcnQgY2xhc3MgQXNzaWdubWVudCB7XG4gICAgc3JlYzogU3RhdGljUmVjO1xuICAgIHZhbDogT2JqZWN0O1xuXG4gICAgbWFza2VkQnlJZHg6IG51bWJlciA9IDA7XG4gICAgX2RpZEluaXRQcm9wQ29udGV4dDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIF9wcm9wZXJ0eUxvY2FsU3JlYzogU3RhdGljUmVjO1xuICAgIF9wcm9wZXJ0eUxvY2FsVmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG5cbiAgICBwcm9wZXJ0eUxvY2FsTWF0Y2hlcyhjb250ZXh0OiBDb250ZXh0KTogTWF0Y2hSZXN1bHQge1xuICAgICAgICBpZiAoIXRoaXMuX2RpZEluaXRQcm9wQ29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5pbml0UHJvcENvbnRleHQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9wcm9wZXJ0eUxvY2FsU3JlYykgPyB0aGlzLl9wcm9wZXJ0eUxvY2FsU3JlYy5tYXRjaCA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJvcGVydHlMb2NhbFN0YXRpY1JlYyhjb250ZXh0OiBDb250ZXh0KTogU3RhdGljUmVjIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kaWRJbml0UHJvcENvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFByb3BDb250ZXh0KGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eUxvY2FsU3JlYztcbiAgICB9XG5cbiAgICBwcm9wZXJ0eUxvY2FsVmFsdWVzKGNvbnRleHQ6IENvbnRleHQpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9kaWRJbml0UHJvcENvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFByb3BDb250ZXh0KGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eUxvY2FsVmFsdWVzO1xuICAgIH1cblxuXG4gICAgaW5pdFByb3BDb250ZXh0KGNvbnRleHQ6IENvbnRleHQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGlkSW5pdFByb3BDb250ZXh0ID0gdHJ1ZTtcbiAgICAgICAgYXNzZXJ0KCFDb250ZXh0Ll9FeHBlbnNpdmVDb250ZXh0Q29uc2lzdGVuY3lDaGVja3NFbmFibGVkIHx8IExpc3RXcmFwcGVyLmxhc3QoXG4gICAgICAgICAgICBjb250ZXh0Ll9lbnRyaWVzKSA9PT0gdGhpcyxcbiAgICAgICAgICAgICdpbml0aW5nIHByb3AgY29udGV4dCBvbiByZWNvcmQgbm90IG9uIHRvcCBvZiBzdGFjaycpO1xuXG4gICAgICAgIC8vIFRvZG86IGJhc2UgaXQgb24gd2hldGhlciB3ZSd2ZSB0cmllcyB5ZXQgdG8gcHJvY2VzcyB0aGVtLlxuXG4gICAgICAgIGxldCBwcm9wQWN0aXZhdGlvbjogQWN0aXZhdGlvbiA9ICh0aGlzLnNyZWMuYWN0aXZhdGlvbi5wcm9wZXJ0eUFjdGl2YXRpb24oY29udGV4dCkpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHByb3BBY3RpdmF0aW9uKSkge1xuICAgICAgICAgICAgY29udGV4dC5fYXBwbHlQcm9wZXJ0eUFjdGl2YXRpb24ocHJvcEFjdGl2YXRpb24sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcmVjID0gbnVsbDtcbiAgICAgICAgdGhpcy52YWwgPSBudWxsO1xuICAgICAgICB0aGlzLm1hc2tlZEJ5SWR4ID0gMDtcbiAgICAgICAgdGhpcy5fZGlkSW5pdFByb3BDb250ZXh0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Byb3BlcnR5TG9jYWxTcmVjID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcHJvcGVydHlMb2NhbFZhbHVlcyA9IG51bGw7XG4gICAgfVxuXG59XG5cbi8qKlxuICogVGhlICdzdGF0aWMnIChzaGFyYWJsZSkgcGFydCBvZiBhIGNvbnRleHQgdmFsdWUgYXNzaWdubWVudCByZWNvcmQuXG4gKiBUaGVzZXMgYXJlIGNyZWF0ZWQgYnkgdGhlIGZpcnN0IF9Bc3NpZ25tZW50IHRoYXQgbmVlZHMgdGhlbVxuICogYW5kIHRoZW4gY2FjaGVkIGZvciByZS1hcHBsaWNhdGlvbiBpbiB0aGVpciBfQWN0aXZhdGlvblxuICogICh3aGljaCwgaW4gdHVybiwgaXMgc3RvcmVkIGluIHRoZSBnbG9iYWwgYWN0aXZhdGlvbiB0cmVlKVxuICovXG5leHBvcnQgY2xhc3MgU3RhdGljUmVjIHtcbiAgICBhY3RpdmF0aW9uOiBBY3RpdmF0aW9uO1xuICAgIHByaXZhdGUgX2tleTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3ZhbDogYW55O1xuICAgIG1hdGNoOiBNYXRjaFJlc3VsdDtcbiAgICBzYWxpZW5jZTogbnVtYmVyID0gMDtcbiAgICBmcm9tQ2hhaW5pbmc6IGJvb2xlYW47XG4gICAgbGFzdEFzc2lnbm1lbnRJZHg6IG51bWJlciA9IDA7XG5cbiAgICBwcm9wZXJ0aWVzKCk6IFByb3BlcnR5TWFwIHtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQodGhpcy5tYXRjaCkpID8gdGhpcy5tYXRjaC5wcm9wZXJ0aWVzKCkgOiBDb250ZXh0LkVtcHR5TWFwO1xuICAgIH1cblxuICAgIGdldCBrZXkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcbiAgICB9XG5cbiAgICBzZXQga2V5KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fa2V5ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsO1xuICAgIH1cblxuICAgIHNldCB2YWwodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl92YWwgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUFjY2Vzc29yIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGV4dDogQ29udGV4dCkge1xuICAgIH1cblxuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoa2V5KTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gTWFwV3JhcHBlci50b1N0cmluZyh0aGlzLmNvbnRleHQuYWxsUHJvcGVydGllcygpKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBTbmFwc2hvdCBpcyB0aGUgd2F5IGhvdyB0byBjYXB0dXJlIGEgY3VycmVudCBzdGF0ZSBvZiB0aGUgY29udGV4dCBhbmQgdGhlbiByZXBsYXkgaXQgYmFjayBzby5cbiAqIGZvciBjYXNlcyB3aGVuIHdlIG5lZWQgdG8gcnVuIHNvbWUgcnVsZSBleGVjdXRpb24gb3V0c2lkZSBvZiB0aGUgcHVzaC9wb3AgY3ljbGVcbiAqL1xuZXhwb3J0IGNsYXNzIFNuYXBzaG90IHtcblxuICAgIF9tZXRhOiBNZXRhO1xuICAgIF9vcmlnQ2xhc3M6IHN0cmluZztcbiAgICBfYXNzaWdubWVudHM6IEFycmF5PEFzc2lnbm1lbnRTbmFwc2hvdD47XG4gICAgX2FsbEFzc2lnbm1lbnRzOiBBcnJheTxBc3NpZ25tZW50U25hcHNob3Q+O1xuICAgIF9pc05lc3RlZDogYm9vbGVhbjtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29udGV4dDogQ29udGV4dCkge1xuICAgICAgICB0aGlzLl9tZXRhID0gX2NvbnRleHQubWV0YTtcbiAgICAgICAgdGhpcy5fb3JpZ0NsYXNzID0gX2NvbnRleHQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdGhpcy5fYXNzaWdubWVudHMgPSBfY29udGV4dC5hY3RpdmVBc3NpZ25tZW50cygpO1xuICAgICAgICB0aGlzLl9hbGxBc3NpZ25tZW50cyA9IF9jb250ZXh0LmFsbEFzc2lnbm1lbnRzKCk7XG4gICAgICAgIHRoaXMuX2lzTmVzdGVkID0gX2NvbnRleHQuaXNOZXN0ZWQ7XG5cbiAgICB9XG5cblxuICAgIGh5ZHJhdGUoc2hlbGxDb3B5OiBib29sZWFuID0gdHJ1ZSk6IENvbnRleHQge1xuICAgICAgICBsZXQgYXNzaWdubWVudHMgPSAoc2hlbGxDb3B5KSA/IHRoaXMuX2Fzc2lnbm1lbnRzIDogdGhpcy5fYWxsQXNzaWdubWVudHM7XG4gICAgICAgIGxldCBuZXdDb250ZXh0OiBDb250ZXh0ID0gdGhpcy5fbWV0YS5uZXdDb250ZXh0KCk7XG4gICAgICAgIG5ld0NvbnRleHQucHVzaCgpO1xuICAgICAgICBsZXQgbGFzdENueEdlbmVyYXRpb24gPSAxO1xuICAgICAgICBmb3IgKGxldCBhIG9mICBhc3NpZ25tZW50cykge1xuICAgICAgICAgICAgaWYgKGxhc3RDbnhHZW5lcmF0aW9uIDwgYS5zYWxpZW5jZSkge1xuICAgICAgICAgICAgICAgIG5ld0NvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3Q29udGV4dC5zZXQoYS5rZXksIGEudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG5ld0NvbnRleHQuaXNOZXN0ZWQgPSB0aGlzLl9pc05lc3RlZDtcbiAgICAgICAgcmV0dXJuIG5ld0NvbnRleHQ7XG4gICAgfVxuXG59XG5cblxuZXhwb3J0IGNsYXNzIE9iamVjdE1ldGFDb250ZXh0IGV4dGVuZHMgQ29udGV4dCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IERlZmF1bHRMb2NhbGUgPSAnZW4nO1xuXG4gICAgcHJpdmF0ZSBfZm9ybWF0dGVyczogTWFwPHN0cmluZywgYW55PjtcblxuICAgIGNvbnN0cnVjdG9yKF9tZXRhOiBPYmplY3RNZXRhLCBuZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihfbWV0YSwgbmVzdGVkKTtcblxuICAgIH1cblxuXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIGxldCBvYmogPSB0aGlzLm9iamVjdDtcblxuICAgICAgICBpZiAoaXNCbGFuayhvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmllbGRQYXRoID0gdGhpcy5maWVsZFBhdGgoKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChmaWVsZFBhdGgpID8gZmllbGRQYXRoLmdldEZpZWxkVmFsdWUob2JqKSA6IHRoaXMucHJvcGVydHlGb3JLZXkoJ3ZhbHVlJyk7XG4gICAgfVxuXG5cbiAgICBzZXQgdmFsdWUodmFsOiBhbnkpIHtcbiAgICAgICAgbGV0IGZpZWxkUGF0aCA9IHRoaXMuZmllbGRQYXRoKCk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZmllbGRQYXRoKSkge1xuICAgICAgICAgICAgYXNzZXJ0KGlzUHJlc2VudCh0aGlzLm9iamVjdCksICdDYWxsIHRvIHNldFZhbHVlKCkgd2l0aCBubyBjdXJyZW50IG9iamVjdCcpO1xuICAgICAgICAgICAgZmllbGRQYXRoLnNldEZpZWxkVmFsdWUodGhpcy5vYmplY3QsIHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmFsbFByb3BlcnRpZXMoKS5nZXQoT2JqZWN0TWV0YS5LZXlWYWx1ZSk7XG4gICAgICAgICAgICBhc3NlcnQoaXNEeW5hbWljU2V0dGFibGUodmFsdWUpLCAnQ2FudCBzZXQgZGVyaXZlZCBwcm9wZXJ0eTogJyArIHZhbHVlKTtcblxuICAgICAgICAgICAgbGV0IHNldHRhYmxlOiBEeW5hbWljU2V0dGFibGVQcm9wZXJ0eVZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgICgoPER5bmFtaWNTZXR0YWJsZVByb3BlcnR5VmFsdWU+dmFsdWUpKS5ldmFsdWF0ZVNldCh0aGlzLCB2YWwpO1xuICAgICAgICAgICAgc2V0dGFibGUuZXZhbHVhdGVTZXQodGhpcywgdmFsKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0IG9iamVjdCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMuZ2V0KE9iamVjdE1ldGEuS2V5T2JqZWN0KTtcbiAgICB9XG5cbiAgICBnZXQgZm9ybWF0dGVycygpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fZm9ybWF0dGVycykpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm1hdHRlcnMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXR0ZXJzO1xuICAgIH1cblxuICAgIGZpZWxkUGF0aCgpOiBGaWVsZFBhdGgge1xuICAgICAgICBsZXQgcHJvcE1hcDogT2JqZWN0TWV0YVByb3BlcnR5TWFwID0gPE9iamVjdE1ldGFQcm9wZXJ0eU1hcD4gdGhpcy5hbGxQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHJldHVybiBwcm9wTWFwLmZpZWxkUGF0aDtcbiAgICB9XG5cblxuICAgIGxvY2FsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gT2JqZWN0TWV0YUNvbnRleHQuRGVmYXVsdExvY2FsZTtcbiAgICB9XG5cbiAgICB0aW1lem9uZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBVSUNvbnRleHQgZXh0ZW5kcyBPYmplY3RNZXRhQ29udGV4dCB7XG5cblxuICAgIGNvbnN0cnVjdG9yKF9tZXRhOiBVSU1ldGEsIG5lc3RlZDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKF9tZXRhLCBuZXN0ZWQpO1xuICAgIH1cblxuXG4gICAgLy8gdXNlciB2YWx1ZXMgZnJvbSB1c2VyIHNldHRpbmdzL2xvY2FsZXNcbiAgICBsb2NhbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmxvY2FsZSgpO1xuICAgIH1cblxuICAgIHRpbWV6b25lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzdXBlci50aW1lem9uZSgpO1xuICAgIH1cbn1cblxuXG5cblxuIl19