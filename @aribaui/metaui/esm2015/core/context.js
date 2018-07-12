/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        // todo: check the syntax Actionvation contructor name.
        let /** @type {?} */ name = objectToName(Activation);
        let /** @type {?} */ root = meta.identityCache.getValue(name);
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
        let /** @type {?} */ size = this._frameStarts.length;
        assert(size > 0, 'Popping empty stack');
        let /** @type {?} */ pos = this._frameStarts.pop();
        let /** @type {?} */ entriesSize;
        while ((entriesSize = this._entries.length) > pos) {
            let /** @type {?} */ recIdx = entriesSize - 1;
            let /** @type {?} */ rec = this._entries.splice(recIdx, 1)[0];
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
            let /** @type {?} */ toCheck = this._values.get(ObjectMeta.KeyObject);
            if (isBlank(toCheck['$toString'])) {
                toCheck['$toString'] = () => {
                    let /** @type {?} */ clazz = this.values.get(ObjectMeta.KeyClass);
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
        let /** @type {?} */ current = this._currentPropertyScopeKey();
        // Assert.that(current != null, 'Can't set %s as context key when no context key on stack',
        // key); TODO: if current key isChaining then we need to set again to get a non-chaining
        // assignment
        if (!(key === current)) {
            let /** @type {?} */ val = this.values.get(key);
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
        let /** @type {?} */ propVals;
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
        let /** @type {?} */ val = this.allProperties().get(key);
        return this.resolveValue(val);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    listPropertyForKey(key) {
        let /** @type {?} */ val = this.propertyForKey(key);
        return (isBlank(val)) ? [] : (isArray(val)) ? val : [val];
    }
    /**
     * @param {?} key
     * @param {?} defaultVal
     * @return {?}
     */
    booleanPropertyForKey(key, defaultVal) {
        let /** @type {?} */ val = this.propertyForKey(key);
        return (isBlank(val)) ? defaultVal : BooleanWrapper.boleanValue(val);
    }
    /**
     * @return {?}
     */
    allProperties() {
        if (isBlank(this._currentProperties)) {
            let /** @type {?} */ m = this.lastMatch();
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
        let /** @type {?} */ lastValue;
        while (value !== lastValue && isPresent(value) && value instanceof DynamicPropertyValue) {
            lastValue = value;
            let /** @type {?} */ propValue = value;
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
        let /** @type {?} */ lastValue = null;
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
        let /** @type {?} */ scopeKey;
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
        let /** @type {?} */ val = this.allProperties().get(propertyKey);
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
        let /** @type {?} */ list = new Array();
        for (let /** @type {?} */ i = 0, /** @type {?} */ c = this._entries.length; i < c; i++) {
            let /** @type {?} */ rec = this._entries[i];
            if (rec.maskedByIdx === 0 && !rec.srec.fromChaining) {
                let /** @type {?} */ a = new AssignmentSnapshot();
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
        let /** @type {?} */ list = new Array();
        for (let /** @type {?} */ i = 0, /** @type {?} */ c = this._entries.length; i < c; i++) {
            let /** @type {?} */ rec = this._entries[i];
            if (!rec.srec.fromChaining) {
                let /** @type {?} */ a = new AssignmentSnapshot();
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
        let /** @type {?} */ sval = this._meta.transformValue(key, value);
        let /** @type {?} */ didSet = false;
        let /** @type {?} */ registry = (/** @type {?} */ (this.meta)).componentRegistry;
        if (key === ObjectMeta.KeyObject && isPresent(registry)) {
            registry.registerType(className(value), value.constructor);
        }
        let /** @type {?} */ activation = this._currentActivation.getChildActivation(key, sval, chaining);
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
        let /** @type {?} */ count = this._recPool.length;
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
        let /** @type {?} */ count = activation._recs.length;
        if (count === 0) {
            return false;
        }
        for (let /** @type {?} */ i = 0; i < count; i++) {
            let /** @type {?} */ srec = activation._recs[i];
            let /** @type {?} */ rec = this.newContextRec();
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
        // See if this activation requires further chaining
        let /** @type {?} */ currentActivation = this._currentActivation;
        let /** @type {?} */ deferredAssignments = currentActivation.deferredAssignments;
        if (isPresent(deferredAssignments)) {
            this.applyDeferredAssignments(deferredAssignments);
        }
    }
    /**
     * @param {?} deferredAssignments
     * @return {?}
     */
    applyDeferredAssignments(deferredAssignments) {
        for (let /** @type {?} */ da of deferredAssignments) {
            // verify that deferred value still applies
            let /** @type {?} */ currentPropValue = this.staticallyResolveValue(this.allProperties().get(da.key));
            if (da.value === currentPropValue) {
                let /** @type {?} */ resolvedValue = this.resolveValue(da.value);
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
        let /** @type {?} */ match = this.lastMatchWithoutContextProps();
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
        let /** @type {?} */ lastActivation = this._currentActivation;
        let /** @type {?} */ newActivation = new Activation(lastActivation);
        newActivation._origEntryCount = this._entries.length;
        this._currentActivation = newActivation;
        // set this value
        let /** @type {?} */ didSet = this._set2(key, svalue, value, merge, chaining);
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
        let /** @type {?} */ propActivation = new Activation(parentActivation);
        propActivation._origEntryCount = this._entries.length;
        this._currentActivation = propActivation;
        let /** @type {?} */ origValues = this._values;
        let /** @type {?} */ nestedMap = new NestedMap(origValues);
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
        let /** @type {?} */ propValues = this._values;
        if (isPresent(propActivation._nestedValues)) {
            propValues = propActivation._nestedValues.reparentedMap(propValues);
        }
        // set up propLocal results
        // Now, see if we need to compute a dynamic property activation as well
        if (isPresent(propActivation.deferredAssignments)) {
            this.push();
            // nest a dynamic nested map on our static nested map (which is on our last dynamic
            // nested map...)
            let /** @type {?} */ origValues = this._values;
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
            let /** @type {?} */ lastAssignmentIdx = this.findLastAssignmentOfKey(key);
            assert(lastAssignmentIdx >= 0, 'Value in context but no assignment record found ' +
                key + ' = ' + value);
            let /** @type {?} */ contextVal = this._entries[lastAssignmentIdx].val;
            assert(value === contextVal || (isPresent(value) && value === contextVal), 'Value in context  doesnt match value on stack ' + value + ' / ' + contextVal);
        });
        // check entries for proper relationship with any previous records that they override
        for (let /** @type {?} */ i = this._entries.length - 1; i >= 0; i--) {
            let /** @type {?} */ r = this._entries[i];
            let /** @type {?} */ foundFirst = false;
            for (let /** @type {?} */ j = i - 1; j >= 0; j--) {
                let /** @type {?} */ pred = this._entries[j];
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
        // print('Setting key/vale onto stack: ' + key + '=' + value);
        let /** @type {?} */ hasOldValue = this._values.has(key) && isPresent(this._values.get(key));
        let /** @type {?} */ oldVal = hasOldValue ? this._values.get(key) : null;
        let /** @type {?} */ isNewValue = !hasOldValue || this._isNewValue(oldVal, value);
        let /** @type {?} */ matchingPropKeyAssignment = !isNewValue && !isChaining &&
            ((this._meta.keyData(key).isPropertyScope) &&
                key !== this._currentPropertyScopeKey());
        if (isNewValue || matchingPropKeyAssignment) {
            let /** @type {?} */ lastMatch;
            let /** @type {?} */ newMatch;
            let /** @type {?} */ salience = this._frameStarts.length;
            let /** @type {?} */ lastAssignmentIdx = -1;
            if (isBlank(oldVal)) {
                lastMatch = this.lastMatchWithoutContextProps();
            }
            else {
                // We recompute that match up to this point by recomputing forward
                // from the point of the last assignment to this key (skipping it), then
                // match against the array of our value and the old
                let /** @type {?} */ recIdx = this._entries.length;
                lastAssignmentIdx = this.findLastAssignmentOfKey(key);
                assert(lastAssignmentIdx >= 0, 'Value in context but no assignment record found ' + key + ' = ' + oldVal);
                if (matchingPropKeyAssignment) {
                    // cheap version of masking for a matching set:
                    this._entries[lastAssignmentIdx].maskedByIdx = recIdx;
                    lastMatch = this.lastMatchWithoutContextProps();
                }
                else {
                    // be able to override a non-chaining assignment.  Our problem is, though, if
                    // the developer wanted to force a re-assignment in the new frame, we'd filter
                    // it out as a duplicate assignment above.  Now, we could allow that assignment
                    // through, but it would then break inletiants when searching back to mask a
                    // key (we wouldn't realize that we need to go further back to find the
                    // original one).
                    let /** @type {?} */ oldRec = this._entries[lastAssignmentIdx];
                    if (oldRec.srec.salience === salience) {
                        let /** @type {?} */ prev = this.findLastAssignmentOfKeyWithValue(key, value);
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
                    let /** @type {?} */ firstAssignmentIdx = this._prepareForOverride(recIdx, lastAssignmentIdx);
                    newMatch = this._rematchForOverride(key, svalue, recIdx, firstAssignmentIdx);
                    if (merge) {
                        value = Meta.PropertyMerger_List.merge(oldVal, value, this.isDeclare());
                    }
                }
            }
            assert(this._entries.length <= Context.MaxContextStackSize, 'MetaUI context stack exceeded max size -- likely infinite chaining: ' +
                this._entries.length);
            let /** @type {?} */ srec = new StaticRec();
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
            let /** @type {?} */ rec = this.newContextRec();
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
        // if we're overriding a prop context override of a matching value, back up further
        let /** @type {?} */ lastLastIdx = 0;
        while (((lastLastIdx = this._entries[lastAssignmentIdx].srec.lastAssignmentIdx) !== -1) &&
            (this._entries[lastAssignmentIdx].maskedByIdx <= 0)) {
            // mark it! (we'll pick it up below...)
            this._entries[lastAssignmentIdx].maskedByIdx = -1;
            lastAssignmentIdx = lastLastIdx;
        }
        // undo all conflicting or dervied assignments (and mark them)
        for (let /** @type {?} */ i = this._entries.length - 1; i >= lastAssignmentIdx; i--) {
            let /** @type {?} */ r = this._entries[i];
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
        // start from the top down looking for that last unmasked record
        let /** @type {?} */ lastMatch;
        let /** @type {?} */ i = 0;
        for (; i < firstAssignmentIdx; i++) {
            let /** @type {?} */ rec = this._entries[i];
            if (rec.maskedByIdx !== 0) {
                break;
            }
            lastMatch = rec.srec.match;
        }
        let /** @type {?} */ overridesMatch;
        // Rematch skipping over the last assignment of this property
        // and all assignments from chainging
        for (let /** @type {?} */ end = this._entries.length; i < end; i++) {
            let /** @type {?} */ r = this._entries[i];
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
        let /** @type {?} */ lastAssignmentIdx = rec.srec.lastAssignmentIdx;
        let /** @type {?} */ lastLastIdx;
        // bastick up further if necessary
        while (((lastLastIdx = this._entries[lastAssignmentIdx].srec.lastAssignmentIdx) !== -1) &&
            (this._entries[lastLastIdx].maskedByIdx === recIdx)) {
            lastAssignmentIdx = lastLastIdx;
        }
        for (let /** @type {?} */ i = lastAssignmentIdx, /** @type {?} */ c = this._entries.length; i < c; i++) {
            let /** @type {?} */ r = this._entries[i];
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
        for (let /** @type {?} */ i = this._entries.length - 1; i >= 0; i--) {
            let /** @type {?} */ rec = this._entries[i];
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
        for (let /** @type {?} */ i = this._entries.length - 1; i >= 0; i--) {
            let /** @type {?} */ rec = this._entries[i];
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
        let /** @type {?} */ didSet = false;
        let /** @type {?} */ numEntries = 0;
        let /** @type {?} */ lastSize = 0;
        let /** @type {?} */ declareKey = this._inDeclare() ? this._values.get(Meta.KeyDeclare) : null;
        while ((numEntries = this._entries.length) > lastSize) {
            lastSize = numEntries;
            let /** @type {?} */ rec = this._entries[numEntries - 1];
            let /** @type {?} */ properties = rec.srec.properties();
            let /** @type {?} */ contextKeys = properties.contextKeysUpdated;
            if (isPresent(contextKeys)) {
                for (let /** @type {?} */ i = 0, /** @type {?} */ c = contextKeys.length; i < c; i++) {
                    let /** @type {?} */ propMgr = contextKeys[i];
                    let /** @type {?} */ key = propMgr._name;
                    if (isPresent(declareKey) && key === declareKey) {
                        continue;
                    }
                    // ToDo: applying resolved value -- need to defer resolution on true dynamic
                    // values Suppress chained assignment if: 1) Our parent will assign this
                    // property (has a deferred activation for it), or 2) There's already a
                    // matching assignment with higher salience
                    let /** @type {?} */ newVal = this.staticallyResolveValue(properties.get(key));
                    let /** @type {?} */ prevProps;
                    let /** @type {?} */ suppress = (isPresent(prevProps) && prevProps.has(key)
                        && !this._isNewValue(this.staticallyResolveValue(prevProps.get(key)), newVal)) ||
                        (this._currentActivation._parent.hasDeferredAssignmentForKey(key));
                    if (!suppress) {
                        let /** @type {?} */ mirrorKey = propMgr._keyDataToSet._key;
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
        let /** @type {?} */ foundKey;
        let /** @type {?} */ foundActivation;
        for (let /** @type {?} */ i = this._entries.length - 1; i >= 0; i--) {
            let /** @type {?} */ rec = this._entries[i];
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
        let /** @type {?} */ scopeKey = this._currentPropertyScopeKey();
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
        let /** @type {?} */ buffer = new StringJoiner(['<b>Context:</b>&nbsp;']);
        buffer.add('(&nbsp;');
        buffer.add(this._entries.length + '');
        buffer.add(' entries');
        buffer.add('&nbsp;)<br/>');
        for (let /** @type {?} */ i = 0, /** @type {?} */ c = this._entries.length; i < c; i++) {
            let /** @type {?} */ sp = i;
            while (sp-- > 0) {
                buffer.add('&nbsp;');
            }
            let /** @type {?} */ r = this._entries[i];
            buffer.add('&nbsp;');
            buffer.add(r.srec.key);
            buffer.add('&nbsp;&nbsp;:&nbsp;');
            buffer.add(r.srec.val);
            buffer.add((r.srec.fromChaining ? ' ^' : ''));
            buffer.add((r.maskedByIdx !== 0 ? ' X' : ''));
            buffer.add('<br/>');
        }
        let /** @type {?} */ propertyActivation = this.currentActivation._propertyActivation;
        if (isPresent(propertyActivation)) {
            let /** @type {?} */ srecs = propertyActivation._recs;
            buffer.add('&nbsp;&nbsp;&nbsp;<b>PropertyActivation...</b><br/>');
            for (let /** @type {?} */ i = 0, /** @type {?} */ c = srecs.length; i < c; i++) {
                let /** @type {?} */ sp = i + this._entries.length + 1;
                while (sp-- > 0) {
                    buffer.add('&nbsp;&nbsp;');
                }
                let /** @type {?} */ r = srecs[i];
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
        let /** @type {?} */ debugString = this.debugString();
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
        let /** @type {?} */ match = ListWrapper.last(this._entries)
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
        let /** @type {?} */ rec = ListWrapper.last(this._entries).propertyLocalStaticRec(this);
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
function Context_tsickle_Closure_declarations() {
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
        let /** @type {?} */ byKey = (chaining)
            ? this._valueNodeMapByContextKeyChaining :
            this._valueNodeMapByContextKey;
        if (isBlank(byKey)) {
            return null;
        }
        let /** @type {?} */ byVal = byKey.get(contextKey);
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
        let /** @type {?} */ byKey;
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
        let /** @type {?} */ byVal = byKey.get(contextKey);
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
        let /** @type {?} */ newDa;
        if (isBlank(this.deferredAssignments)) {
            this.deferredAssignments = new Array();
        }
        else {
            for (let /** @type {?} */ da of this.deferredAssignments) {
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
            for (let /** @type {?} */ da of this.deferredAssignments) {
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
        let /** @type {?} */ activation = this;
        while (isPresent(activation)) {
            let /** @type {?} */ propertyActivation = activation._propertyActivation;
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
function Activation_tsickle_Closure_declarations() {
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
function DeferredAssignment_tsickle_Closure_declarations() {
    /** @type {?} */
    DeferredAssignment.prototype.key;
    /** @type {?} */
    DeferredAssignment.prototype.value;
}
export class AssignmentSnapshot {
}
function AssignmentSnapshot_tsickle_Closure_declarations() {
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
        // Todo: base it on whether we've tries yet to process them.
        let /** @type {?} */ propActivation = (this.srec.activation.propertyActivation(context));
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
function Assignment_tsickle_Closure_declarations() {
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
function StaticRec_tsickle_Closure_declarations() {
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
function PropertyAccessor_tsickle_Closure_declarations() {
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
        let /** @type {?} */ assignments = (shellCopy) ? this._assignments : this._allAssignments;
        let /** @type {?} */ newContext = this._meta.newContext();
        newContext.push();
        let /** @type {?} */ lastCnxGeneration = 1;
        for (let /** @type {?} */ a of assignments) {
            if (lastCnxGeneration < a.salience) {
                newContext.push();
            }
            newContext.set(a.key, a.value);
        }
        newContext.isNested = this._isNested;
        return newContext;
    }
}
function Snapshot_tsickle_Closure_declarations() {
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
        let /** @type {?} */ obj = this.object;
        if (isBlank(obj)) {
            return null;
        }
        let /** @type {?} */ fieldPath = this.fieldPath();
        return isPresent(fieldPath) ? fieldPath.getFieldValue(obj) : this.propertyForKey('value');
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        let /** @type {?} */ fieldPath = this.fieldPath();
        if (isPresent(fieldPath)) {
            assert(isPresent(this.object), 'Call to setValue() with no current object');
            fieldPath.setFieldValue(this.object, val);
        }
        else {
            let /** @type {?} */ value = this.allProperties().get(ObjectMeta.KeyValue);
            assert(isDynamicSettable(value), 'Cant set derived property: ' + value);
            let /** @type {?} */ settable = value;
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
        let /** @type {?} */ propMap = /** @type {?} */ (this.allProperties());
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
function ObjectMetaContext_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBc0JBLE9BQU8sS0FBSyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUNILE1BQU0sRUFDTixjQUFjLEVBQUUsU0FBUyxFQUN6QixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFdBQVcsRUFDWCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQW1CLFdBQVcsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUN6RSxPQUFPLEVBQUMsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUNILG9CQUFvQixFQUVwQixJQUFJLEVBQ0osaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUN2QixNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdGMUIsTUFBTSxjQUFlLFNBQVEsVUFBVTs7Ozs7SUEyRW5DLFlBQW9CLEtBQVcsRUFBVSxTQUFrQixLQUFLO1FBQzVELEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWlCO3VCQTdENUIsSUFBSSxHQUFHLEVBQWU7d0JBQzVCLEVBQUU7NEJBQ0MsRUFBRTt3QkFJRyxF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ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuLyoqXG4gKiBTcGVjaWFsIGltcG9ydCB0byBiZSBhYmxlIHRvIGNvbnZlcnQgc3RyaW5nIHRvIHR5cGUgdXNpbmcgQ29sbGVjdGlvbnNbc3RyaW5nIHR5cGVdID0+IHR5cGVcbiAqL1xuaW1wb3J0ICogYXMgQ29sbGVjdGlvbnMgZnJvbSAndHlwZXNjcmlwdC1jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBCb29sZWFuV3JhcHBlciwgY2xhc3NOYW1lLFxuICAgIEV4dGVuc2libGUsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc051bWJlcixcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgaXNTdHJpbmdNYXAsXG4gICAgTGlzdFdyYXBwZXIsXG4gICAgTWFwV3JhcHBlcixcbiAgICBvYmplY3RUb05hbWUsXG4gICAgcHJpbnQsXG4gICAgU3RyaW5nSm9pbmVyXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNYXRjaFJlc3VsdCwgVW5pb25NYXRjaFJlc3VsdH0gZnJvbSAnLi9tYXRjaCc7XG5pbXBvcnQge01ldGEsIE92ZXJyaWRlVmFsdWUsIFByb3BlcnR5TWFuYWdlciwgUHJvcGVydHlNYXB9IGZyb20gJy4vbWV0YSc7XG5pbXBvcnQge09iamVjdE1ldGEsIE9iamVjdE1ldGFQcm9wZXJ0eU1hcH0gZnJvbSAnLi9vYmplY3QtbWV0YSc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi91aW1ldGEnO1xuaW1wb3J0IHtOZXN0ZWRNYXB9IGZyb20gJy4vbmVzdGVkLW1hcCc7XG5pbXBvcnQge1xuICAgIER5bmFtaWNQcm9wZXJ0eVZhbHVlLFxuICAgIER5bmFtaWNTZXR0YWJsZVByb3BlcnR5VmFsdWUsXG4gICAgRXhwcixcbiAgICBpc0R5bmFtaWNTZXR0YWJsZSxcbiAgICBTdGF0aWNhbGx5UmVzb2x2YWJsZVxufSBmcm9tICcuL3Byb3BlcnR5LXZhbHVlJztcblxuLyoqXG4gKlxuICogQ29udGV4dCByZXByZXNlbnRzIGEgc3RhY2sgb2YgYXNzaWdubWVudHMgKGUuZy4gY2xhc3M9VXNlciwgZmllbGQ9YmlydGhEYXksIG9wZXJhdGlvbj1lZGl0KVxuICogIFRoZSBjdXJyZW50IHNldCBvZiBhc3NpZ25tZW50cyBjYW4gYmUgcmV0cmlldmVkIHZpYSB2YWx1ZXMoKS5cbiAqXG4gKiBUaGUgY3VycmVudCB2YWx1ZXMgYXJlIHJ1biBhZ2FpbnN0IHRoZSBNZXRhIHJ1bGUgc2V0IHRvIGNvbXB1dGUgdGhlIGVmZmVjdGl2ZSBQcm9wZXJ0eU1hcFxuICogKGUuZy4gdmlzaWJsZTp0cnVlLCBlZGl0YWJsZTp0cnVlLCBjb21wb25lbnQ6QVdUZXh0RmllbGQpLlxuICogU29tZSBydWxlIGV2YWx1YXRpb25zIHJlc3VsdCBpbiAqY2hhaW5pbmcqIC0tIHdoZXJlIGFkZGl0aW9uYWwgYXNzaWdubWVudHMgdGhhdCBhcmVcbiAqICdpbXBsaWVkJyBieSB0aGUgY3VycmVudCBhc3NpZ25tZW50cyBhcmUgYXBwbGllZCwgKHJlc3VsdGluZyBpbiBhIHJldmlzZWQgY29tcHV0YXRpb25cbiAqIG9mIHRoZSBjdXJyZW50IFByb3BlcnR5TWFwLCBhbmQgcG9zc2libGUgZnVydGhlciBjaGFpbmluZykuXG4gKiAoZS5nLiBmaWVsZD1iaXJ0aERheSBtYXkgcmVzdWx0IGluIHR5cGU9RGF0ZSB3aGljaCBtYXkgcmVzdWx0IGluIGNvbXBvbmVudDpEYXRlUGlja2VyKVxuICpcbiAqIEFzc2lnbm1lbnRzIGNhbiBiZSBzY29wZWQgYW5kIHBvcHBlZCAocHVzaCgpLCBzZXQoa2V5LCB2YWx1ZSk7IC4uLjsgcG9wKCkpLlxuICpcbiAqIFRoZSBhY3R1YWwgY29tcHV0YXRpb24gb2YgcnVsZSBtYXRjaGVzIGlzIGNhY2hlZCBzbyBvbmNlIGEgJ3BhdGgnIGRvd24gdGhlIGNvbnRleHRcbiAqIHRyZWUgaGFzIGJlZW4gZXhlcmNpemVkIHN1YnNlcXVlbnQgbWF0Y2hpbmcgdHJhdmVyc2FscyAoZXZlbiBieSBvdGhlciB0aHJlYWRzL3VzZXJzKVxuICogaXMgZmFzdC5cbiAqXG4gKlxuICogZXhhbXBsZXMgb2YgcHJvcGVydHkgbWFwcyBmb3IgZGlmZmVyZW50IHNjb3BlIGtleVxuICpcbiAqIDxjb2RlPlxuICogICAgIHtcbiAgICAgICAgJ3Zpc2libGUnOiB0cnVlLFxuICAgICAgICAnY2xhc3NfdHJhaXQnOiAnZml2ZVpvbmVzJyxcbiAgICAgICAgJ2VkaXRhYmxlJzogdHJ1ZSxcbiAgICAgICAgJ2JpbmRpbmdzJzoge1xuICAgICAgICAgICAgJ3ZhbHVlJzogJ0RlZmF1bHQgVGl0bGUnXG4gICAgICAgIH0sXG4gICAgICAgICdmaWVsZF90cmFpdCc6ICdyZXF1aXJlZCcsXG4gICAgICAgICdsYWJlbCc6ICdUaXRsZScsXG4gICAgICAgICd0eXBlJzogJ3N0cmluZycsXG4gICAgICAgICdyZXF1aXJlZCc6IHRydWUsXG4gICAgICAgICdlZGl0aW5nJzogdHJ1ZSxcbiAgICAgICAgJ3ZhbGlkJzogJ3t7KHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApID8gdHJ1ZSA6IFxcJ0Fuc3dlciByZXF1aXJlZFxcJ319JyxcbiAgICAgICAgJ2NvbXBvbmVudCc6ICdJbnB1dEZpZWxkQ29tcG9uZW50JyxcbiAgICAgICAgJ2ZpZWxkJzogJ3RpdGxlJyxcbiAgICAgICAgJ2xheW91dF90cmFpdCc6ICdGb3JtJyxcbiAgICAgICAgJ3RyYWl0JzogJ3JlcXVpcmVkJyxcbiAgICAgICAgJ3JhbmsnOiAyMCxcbiAgICAgICAgJ2FmdGVyJzogJ3pMZWZ0JyxcbiAgICAgICAgJ2NsYXNzJzogJ0NoZWNrUmVxdWVzdDEnXG4gICAgfVxuICpcbiAqIDwvY29kZT5cbiAqXG4gKlxuICpcbiAqIDxjb2RlPlxuICogICAgIHtcbiAgICAgICAgJ3Zpc2libGUnOiB0cnVlLFxuICAgICAgICAnY2xhc3NfdHJhaXQnOiAnZml2ZVpvbmVzJyxcbiAgICAgICAgJ2xhYmVsJzogJ0NoZWNrIFJlcXVlc3QxJyxcbiAgICAgICAgJ3pvbmVzJzogW1xuICAgICAgICAgICAgJ3pMZWZ0JyxcbiAgICAgICAgICAgICd6UmlnaHQnLFxuICAgICAgICAgICAgJ3pUb3AnLFxuICAgICAgICAgICAgJ3pCb3R0b20nLFxuICAgICAgICAgICAgJ3pEZXRhaWwnXG4gICAgICAgIF0sXG4gICAgICAgICdlZGl0aW5nJzogdHJ1ZSxcbiAgICAgICAgJ2xheW91dCc6ICcqJyxcbiAgICAgICAgJ2NvbXBvbmVudCc6ICdNZXRhRm9ybUNvbXBvbmVudCcsXG4gICAgICAgICdsYXlvdXRfdHJhaXQnOiAnRm9ybScsXG4gICAgICAgICdmaXZlWm9uZUxheW91dCc6IHRydWUsXG4gICAgICAgICd0cmFpdCc6ICdmaXZlWm9uZXMnLFxuICAgICAgICAnbGF5b3V0c0J5Wm9uZSc6IHtcblxuICAgICAgICB9LFxuICAgICAgICAnY2xhc3MnOiAnQ2hlY2tSZXF1ZXN0MScsXG4gICAgICAgICdmaWVsZHNCeVpvbmUnOiB7XG4gICAgICAgICAgICAnekxlZnQnOiBbXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcbiAgICAgICAgICAgICAgICAnbmFtZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAnek5vbmUnOiBbXG4gICAgICAgICAgICAgICAgJ2Z1bGxOYW1lJ1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuICpcbiAqIDwvY29kZT5cbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRleHQgZXh0ZW5kcyBFeHRlbnNpYmxlIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfQ2FjaGVBY3RpdmF0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBzdGF0aWMgX0V4cGVuc2l2ZUNvbnRleHRDb25zaXN0ZW5jeUNoZWNrc0VuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzdGF0aWMgX0RlYnVnUnVsZU1hdGNoZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzdGF0aWMgX0RlYnVnX1NldHNDb3VudDogbnVtYmVyID0gMDtcblxuXG4gICAgc3RhdGljIE1heENvbnRleHRTdGFja1NpemU6IG51bWJlciA9IDIwMDtcblxuICAgIHN0YXRpYyBFbXB0eU1hcDogUHJvcGVydHlNYXAgPSBudWxsO1xuICAgIHN0YXRpYyByZWFkb25seSBFbXB0eVJlbW92ZU1hcDogTWFwPGFueSwgYW55PiA9IG5ldyBNYXA8YW55LCBhbnk+KCk7XG5cbiAgICBwcml2YXRlIF92YWx1ZXM6IE1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIF9lbnRyaWVzOiBBcnJheTxBc3NpZ25tZW50PiA9IFtdO1xuICAgIHByaXZhdGUgX2ZyYW1lU3RhcnRzOiBudW1iZXJbXSA9IFtdO1xuICAgIHByb3RlY3RlZCBfY3VycmVudFByb3BlcnRpZXM6IFByb3BlcnR5TWFwO1xuICAgIHByb3RlY3RlZCBfcm9vdE5vZGU6IEFjdGl2YXRpb247XG4gICAgcHJpdmF0ZSBfY3VycmVudEFjdGl2YXRpb246IEFjdGl2YXRpb247XG4gICAgcHJpdmF0ZSBfcmVjUG9vbDogQXJyYXk8QXNzaWdubWVudD4gPSBbXTtcblxuICAgIF9hY2Nlc3NvcjogUHJvcGVydHlBY2Nlc3NvcjtcblxuICAgIGlzTmVzdGVkOiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBub3RlczpcbiAgICAgKlxuICAgICAqIENvbnRleHQgbWFpbnRhaW5zIGEgc3RhY2sgKF9lbnRyaWVzKSBvZiBfQ29udGV4dFJlY3MgKG9uZSBwZXIgYXNzaWdubWVudCkgYXMgd2VsbCBhc1xuICAgICAqIGFzIF9mcmFtZVN0YWNrIHJlY29yZGluZyB0aGUgc3RhY2sgcG9zaXRpb25zIGZvciBlYWNoIHB1c2goKS9wb3AoKS5cblxuICAgICAqIFBlcmZvcm1hbmNlIHRocm91Z2ggYWdncmVzc2l2ZSBnbG9iYWwgY2FjaGluZyBvZiBhbGwgc3RhdGljYWxseSBjb21wdXRhdGJsZSBkYXRhOlxuICAgICAqIC0gVGhlIHN0YXRpYyAocmV1c2FibGUvaW1tdXRhYmxlKSBwYXJ0IG9mIGEgQ29udGV4dFJlYyBpcyBmYWN0b3JlZCBpbnRvIF9TdGF0aWNSZWNcbiAgICAgKiAtIFN0YXRpY1JlY3MgcmVwcmVzZW50IGluZGl2aWR1YWwgYXNzaWdubWVudHMgKGNvbnRleHQga2V5ID0gdmFsdWUpIGFuZCBjYWNoZSB0aGVcbiAgICAgKiAgICAgIHJlc3VsdGluZyBNZXRhLk1hdGNoUmVzdWx0IChhbmQgYXNzb2NpYXRlZCBQcm9wZXJ0eU1hcClcbiAgICAgKiAtIFRoZSBzdWItc3RhY2sgKG9mIGZvcndhcmQgY2hhaW5lZCkgcmVjb3JkcyBhc3NvY2lhdGVkIHdpdGggZWFjaCBleHRlcm5hbCBzZXQoKVxuICAgICAqICAgICAgKG9yIGNoYWluZWQgKmR5bmFtaWMqIHZhbHVlKSBpcyByZWNvcmRlZCBpbiBhbiBBY3RpdmF0aW9uLlxuICAgICAqIC0gUHJvY2Vzcy1nbG9iYWwgdHJlZSBvZiBBY3RpdmF0aW9uc1xuICAgICAqICAgICAgLSBlYWNoIGFjdGl2YXRpb24ga2VlcHMgbGlzdCBvZiBpdHMgQ29udGV4dEtleS9WYWx1ZS1rZXllZCBkZWNlbmRlZCBBY3RpdmF0aW9uc1xuICAgICAqXG4gICAgICogUHJvcGVydHkgQ29udGV4dHMuXG4gICAgICogICAgICBUaGUgbm90aW9uIG9mIGEgJ1Byb3BlcnR5Q29udGV4dCcgbWFrZXMgdGhlIGdvaW5nIHRyaWNreS4uLlxuICAgICAqICAgICAgIEEgJ1Byb3BlcnR5Q29udGV4dEtleScgaXMgYSBrZXkgZm9yIGFuICdlbnRpdHknIHRoYXQgcHJvcGVydGllcyBkZXNjcmliZS5cbiAgICAgKiAgICAgICAoZS5nLiBjbGFzcywgZmllbGQsIGFjdGlvbiwgYW5kIGxheW91dCBhcmUgcHJvcGVydHkgY29udGV4dCBrZXlzLCBidXQgZWRpdGluZyxcbiAgICAgKiAgICAgICBvcGVyYXRpb24sIC4uLiBhcmUgbm90KVxuICAgICAqICAgICAgIEUuZy4gT24gYW4gYXNzaWdubWVudCBzdGFjayB3aXRoIG1vZHVsZT1BZG1pbiBjbGFzcz1Gb28sIGZpZWxkPW5hbWUsIGVkaXRhYmxlPWZhbHNlLFxuICAgICAqICAgICAgIHdlIHdhbnQgdGhlIHByb3BlcnR5ICdsYWJlbCcgdG8gYmUgdGhlIGxhYmVsIGZvciB0aGUgKmZpZWxkKiwgbm90IHRoZSBjbGFzcyBvciBtb2R1bGVcbiAgICAgKiAgICAgICAtLSBpLmUuIHRoZSAqdG9wLW1vc3QqIGFzc2lnbm1lbnQgb2YgYSBQcm9wZXJ0eUNvbnRleHRLZXkgZGV0ZXJtaW5lcyB3aGljaCBwcm9wZXJ0eVxuICAgICAqICAgICAgIGNvbnRleHQgcnVsZXMgYXJlIGFjdGl2ZS5cbiAgICAgKlxuICAgICAqICBUaGVzZSBydWxlcyBhcmUgYWN0aXZhdGVkIHZpYSBhIHN5bnRoZXRpYyBjb250ZXh0IGtleSBvZiBsaWtlICdmaWVsZF9wJyBvciAnY2xhc3NfcCcuXG4gICAgICogIExvZ2ljYWxseSwgYWZ0ZXIgZWFjaCBhc3NpZ21lbnQgd2UgbmVlZCB0byBmaWd1cmUgb2Ygd2hpY2ggY29udGV4dCBrZXkgc2hvdWxkIGJlIGluXG4gICAgICogIGFmZmVjdCBhbiBzZXQgaXQgb24gdGhlIGNvbnRleHQsIGJ1dCB0aGVuIGF1dG9tYXRpY2FsbHkgcG9wIGl0IG9mZiB1cG9uIHRoZSBuZXh0XG4gICAgICogIGFzc2lnbm1lbnQgKGFuZCB0aGVuIHJlY29tcHV0ZSBhZ2FpbikuXG4gICAgICpcbiAgICAgKiAgT2YgY291cnNlLCBhY3R1YWxseSBwdXNoaW5nIGFuZCBwb3BwaW5nIGNvbnRleHQga2V5IGFzc2lnbm1lbnQgb24gZXZlcnkgc2V0KClcbiAgICAgKiAgd291bGQgYmUgZXhwZW5zaXZlIHNvIGluc3RlYWQgd2UgY2FjaGUgdGhlICdwcm9wZXJ0eUFjdGl2YXRpb24nIGFzc29jaWF0ZWQgd2l0aFxuICAgICAqICBlYWNoIGFjdGl2YXRpb24sIGFuZCB1c2UgaXRzIHZhbHVlcyBhbmQgcHJvcGVydGllcyByYXRoZXIgdGhhbiB0aG9zZSBvbiB0aGVcbiAgICAgKiAgYWN0aXZhdGlvbi5cbiAgICAgKi9cblxuICAgIHN0YXRpYyBnZXRBY3RpdmF0aW9uVHJlZShtZXRhOiBNZXRhKTogQWN0aXZhdGlvbiB7XG4gICAgICAgIC8vIHRvZG86IGNoZWNrIHRoZSBzeW50YXggQWN0aW9udmF0aW9uIGNvbnRydWN0b3IgbmFtZS5cbiAgICAgICAgbGV0IG5hbWUgPSBvYmplY3RUb05hbWUoQWN0aXZhdGlvbik7XG4gICAgICAgIGxldCByb290OiBBY3RpdmF0aW9uID0gbWV0YS5pZGVudGl0eUNhY2hlLmdldFZhbHVlKG5hbWUpO1xuICAgICAgICBpZiAoaXNCbGFuayhyb290KSkge1xuICAgICAgICAgICAgcm9vdCA9IG5ldyBBY3RpdmF0aW9uKCk7XG4gICAgICAgICAgICBtZXRhLmlkZW50aXR5Q2FjaGUuc2V0VmFsdWUobmFtZSwgcm9vdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXRhOiBNZXRhLCBwcml2YXRlIG5lc3RlZDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoQ29udGV4dC5FbXB0eU1hcCkpIHtcbiAgICAgICAgICAgIENvbnRleHQuRW1wdHlNYXAgPSBuZXcgUHJvcGVydHlNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIENvbnRleHQuX0RlYnVnX1NldHNDb3VudCA9IDA7XG5cbiAgICAgICAgdGhpcy5fYWNjZXNzb3IgPSBuZXcgUHJvcGVydHlBY2Nlc3Nvcih0aGlzKTtcbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24gPSBDb250ZXh0LmdldEFjdGl2YXRpb25UcmVlKF9tZXRhKTtcbiAgICAgICAgdGhpcy5fcm9vdE5vZGUgPSB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbjtcblxuICAgICAgICB0aGlzLmlzTmVzdGVkID0gbmVzdGVkO1xuICAgIH1cblxuXG4gICAgcHVzaCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZnJhbWVTdGFydHMucHVzaCh0aGlzLl9lbnRyaWVzLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgZ2V0IG1ldGEoKTogTWV0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhO1xuICAgIH1cblxuXG4gICAgcG9wKCk6IHZvaWQge1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX2ZyYW1lU3RhcnRzLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0KHNpemUgPiAwLCAnUG9wcGluZyBlbXB0eSBzdGFjaycpO1xuXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLl9mcmFtZVN0YXJ0cy5wb3AoKTtcblxuICAgICAgICBsZXQgZW50cmllc1NpemU6IG51bWJlcjtcbiAgICAgICAgd2hpbGUgKChlbnRyaWVzU2l6ZSA9IHRoaXMuX2VudHJpZXMubGVuZ3RoKSA+IHBvcykge1xuICAgICAgICAgICAgbGV0IHJlY0lkeCA9IGVudHJpZXNTaXplIC0gMTtcbiAgICAgICAgICAgIGxldCByZWM6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzLnNwbGljZShyZWNJZHgsIDEpWzBdO1xuXG4gICAgICAgICAgICBpZiAocmVjLnNyZWMubGFzdEFzc2lnbm1lbnRJZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLmRlbGV0ZShyZWMuc3JlYy5rZXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91bmRvT3ZlcnJpZGUocmVjLCByZWNJZHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbiA9IChyZWNJZHggPiAwKVxuICAgICAgICAgICAgICAgID8gdGhpcy5fZW50cmllc1tyZWNJZHggLSAxXS5zcmVjLmFjdGl2YXRpb25cbiAgICAgICAgICAgICAgICA6IHRoaXMuX3Jvb3ROb2RlO1xuXG4gICAgICAgICAgICB0aGlzLmFzc2VydENvbnRleHRDb25zaXN0ZW50KCk7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIHJlYyBiYWNrIGludG8gcG9vbCBmb3IgcmV1c2VcbiAgICAgICAgICAgIHJlYy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVjUG9vbC5wdXNoKHJlYyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50UHJvcGVydGllcyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLl9zZXQoa2V5LCB2YWx1ZSwgZmFsc2UsIGZhbHNlKTtcblxuICAgICAgICAvLyBpbXBsZW1lbnQgZGVmYXVsdCB0b1N0cmluZyBmb3Igb3VyIG9iamVjdCBzbyB3ZSBjYW4gcmV0cmlldmUgb2JqZWN0VGl0bGVcbiAgICAgICAgaWYgKGtleSA9PT0gT2JqZWN0TWV0YS5LZXlPYmplY3QpIHtcbiAgICAgICAgICAgIGxldCB0b0NoZWNrID0gdGhpcy5fdmFsdWVzLmdldChPYmplY3RNZXRhLktleU9iamVjdCk7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayh0b0NoZWNrWyckdG9TdHJpbmcnXSkpIHtcbiAgICAgICAgICAgICAgICB0b0NoZWNrWyckdG9TdHJpbmcnXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXp6ID0gdGhpcy52YWx1ZXMuZ2V0KE9iamVjdE1ldGEuS2V5Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVUlNZXRhLmJlYXV0aWZ5Q2xhc3NOYW1lKGNsYXp6KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBtZXJnZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZXQoa2V5LCB2YWx1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHNldFNjb3BlS2V5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9tZXRhLmtleURhdGEoa2V5KS5pc1Byb3BlcnR5U2NvcGUsIGtleSArICcgaXMgbm90IGEgdmFsaWQgY29udGV4dCBrZXknKTtcbiAgICAgICAgbGV0IGN1cnJlbnQ6IHN0cmluZyA9IHRoaXMuX2N1cnJlbnRQcm9wZXJ0eVNjb3BlS2V5KCk7XG5cbiAgICAgICAgLy8gQXNzZXJ0LnRoYXQoY3VycmVudCAhPSBudWxsLCAnQ2FuJ3Qgc2V0ICVzIGFzIGNvbnRleHQga2V5IHdoZW4gbm8gY29udGV4dCBrZXkgb24gc3RhY2snLFxuICAgICAgICAvLyBrZXkpOyBUT0RPOiBpZiBjdXJyZW50IGtleSBpc0NoYWluaW5nIHRoZW4gd2UgbmVlZCB0byBzZXQgYWdhaW4gdG8gZ2V0IGEgbm9uLWNoYWluaW5nXG4gICAgICAgIC8vIGFzc2lnbm1lbnRcblxuICAgICAgICBpZiAoIShrZXkgPT09IGN1cnJlbnQpKSB7XG4gICAgICAgICAgICBsZXQgdmFsOiBhbnkgPSB0aGlzLnZhbHVlcy5nZXQoa2V5KTtcbiAgICAgICAgICAgIC8vIEFzc2VydC50aGF0KHZhbCAhPSBudWxsLCAnQ2FuJ3Qgc2V0ICVzIGFzIGNvbnRleHQga2V5IHdoZW4gaXQgaGFzIG5vIHZhbHVlIGFscmVhZHlcbiAgICAgICAgICAgIC8vIG9uIHRoZSBjb250ZXh0Jywga2V5KTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHZhbCkpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBNZXRhLktleUFueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2YWx1ZXMoKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGxldCBwcm9wVmFsczogTWFwPHN0cmluZywgYW55PjtcbiAgICAgICAgcmV0dXJuIChMaXN0V3JhcHBlci5pc0VtcHR5KHRoaXMuX2VudHJpZXMpIHx8XG4gICAgICAgICAgICBpc0JsYW5rKFxuICAgICAgICAgICAgICAgIHByb3BWYWxzID0gKExpc3RXcmFwcGVyLmxhc3Q8QXNzaWdubWVudD4odGhpcy5fZW50cmllcykpLnByb3BlcnR5TG9jYWxWYWx1ZXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMpKSkgPyB0aGlzLl92YWx1ZXMgOiBwcm9wVmFscztcbiAgICB9XG5cbiAgICBnZXQgcHJvcGVydGllcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWNjZXNzb3I7XG4gICAgfVxuXG5cbiAgICBwcm9wZXJ0eUZvcktleShrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmFsbFByb3BlcnRpZXMoKS5nZXQoa2V5KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlVmFsdWUodmFsKTtcbiAgICB9XG5cbiAgICBsaXN0UHJvcGVydHlGb3JLZXkoa2V5OiBzdHJpbmcpOiBBcnJheTxhbnk+IHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMucHJvcGVydHlGb3JLZXkoa2V5KTtcbiAgICAgICAgcmV0dXJuIChpc0JsYW5rKHZhbCkpID8gW10gOiAoaXNBcnJheSh2YWwpKSA/IHZhbCA6IFt2YWxdO1xuICAgIH1cblxuICAgIGJvb2xlYW5Qcm9wZXJ0eUZvcktleShrZXk6IHN0cmluZywgZGVmYXVsdFZhbDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5wcm9wZXJ0eUZvcktleShrZXkpO1xuICAgICAgICByZXR1cm4gKGlzQmxhbmsodmFsKSkgPyBkZWZhdWx0VmFsIDogQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUodmFsKTtcbiAgICB9XG5cblxuICAgIGFsbFByb3BlcnRpZXMoKTogUHJvcGVydHlNYXAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9jdXJyZW50UHJvcGVydGllcykpIHtcbiAgICAgICAgICAgIGxldCBtOiBNYXRjaFJlc3VsdCA9IHRoaXMubGFzdE1hdGNoKCk7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFByb3BlcnRpZXMgPSBtLnByb3BlcnRpZXMoKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5fY3VycmVudFByb3BlcnRpZXMpID8gdGhpcy5fY3VycmVudFByb3BlcnRpZXMgOiBDb250ZXh0LkVtcHR5TWFwO1xuICAgIH1cblxuXG4gICAgcmVzb2x2ZVZhbHVlKHZhbHVlOiBhbnkgfCBEeW5hbWljUHJvcGVydHlWYWx1ZSk6IGFueSB7XG4gICAgICAgIGxldCBsYXN0VmFsdWU6IGFueTtcbiAgICAgICAgd2hpbGUgKHZhbHVlICE9PSBsYXN0VmFsdWUgJiYgaXNQcmVzZW50KHZhbHVlKSAmJiB2YWx1ZSBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICBsYXN0VmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgbGV0IHByb3BWYWx1ZTogRHluYW1pY1Byb3BlcnR5VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBFeHByKSB7XG4gICAgICAgICAgICAgICAgcHJvcFZhbHVlLmFkZFR5cGVUb0NvbnRleHQoJ1VJTWV0YScsIFVJTWV0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZSA9IHByb3BWYWx1ZS5ldmFsdWF0ZSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIHN0YXRpY2FsbHlSZXNvbHZlVmFsdWUodmFsdWU6IGFueSB8IFN0YXRpY2FsbHlSZXNvbHZhYmxlKTogYW55IHtcbiAgICAgICAgbGV0IGxhc3RWYWx1ZTogYW55ID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKHZhbHVlICE9PSBsYXN0VmFsdWUgJiYgaXNQcmVzZW50KHZhbHVlKSAmJiB2YWx1ZSBpbnN0YW5jZW9mIFN0YXRpY2FsbHlSZXNvbHZhYmxlKSB7XG4gICAgICAgICAgICBsYXN0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuZXZhbHVhdGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHB1c2hBbmRSZXNvbHZlU3RhdGljKGNvbnRleHRWYWxzOiBNYXA8c3RyaW5nLCBhbnk+LCBwcm9wZXJ0eUtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1Jlc29sdmU6IGJvb2xlYW4pOiBhbnkge1xuICAgICAgICBsZXQgc2NvcGVLZXk6IHN0cmluZztcbiAgICAgICAgdGhpcy5wdXNoKCk7XG5cbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZShjb250ZXh0VmFscykuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKCcqJyA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzY29wZUtleSA9IGtleTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoc2NvcGVLZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNjb3BlS2V5KHNjb3BlS2V5KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmFsID0gdGhpcy5hbGxQcm9wZXJ0aWVzKCkuZ2V0KHByb3BlcnR5S2V5KTtcbiAgICAgICAgdmFsID0gc3RhdGljUmVzb2x2ZSA/IHRoaXMuc3RhdGljYWxseVJlc29sdmVWYWx1ZSh2YWwpIDogdGhpcy5yZXNvbHZlVmFsdWUodmFsKTtcbiAgICAgICAgdGhpcy5wb3AoKTtcblxuICAgICAgICByZXR1cm4gdmFsO1xuXG4gICAgfVxuXG4gICAgcHVzaEFuZFJlc29sdmUoY29udGV4dFZhbHM6IE1hcDxzdHJpbmcsIGFueT4sIHByb3BlcnR5S2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXNoQW5kUmVzb2x2ZVN0YXRpYyhjb250ZXh0VmFscywgcHJvcGVydHlLZXksIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBhICh1c2FibGUpIHNuYXBzaG90IG9mIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBjb250ZXh0XG4gICAgc25hcHNob3QoKTogU25hcHNob3Qge1xuICAgICAgICByZXR1cm4gbmV3IFNuYXBzaG90KHRoaXMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50IGN1cnJlbnQgYWN0aXZlIGFzc2lnbm1lbnQgbGlzdCBtZWFuaW5nIGl0IHdpbGwgbm90IGluY2x1ZGUgYW55IGVudHJpZXMgd2hpY2hcbiAgICAgKiB3ZXJlIG92ZXJ3cml0dGVuIGJ5IHNvbWUgbGF0ZSBlbnRyeSBoYXZpbmcgdGhlIHNhbWUga2V5LlxuICAgICAqXG4gICAgICogSXQgZG9lcyBub3QgaW5jbHVkZSBlbnRyaWVzIHRoYXQgd2VyZSBwdXNoZWQgdG8gc3RhY2sgZnJvbSBhbnkgUHJvcGVydHkgLT4gU2VsZWN0b3JcbiAgICAgKiBwcm9wYWdhdGlvbi4gVGhpcyBjcmVhdGVzIHNoZWxsIGNvcHkgYW5kIGlnbm9yaW5nIGFsbCBsYXN0IE1hdGNoZXMgd2hpY2ggY291bGQgYmUgZnJvbVxuICAgICAqIHNvbWUgcHJldmlvdXMgYXNzaWdubWVudHMgdGhhdCBhcmUgbm93IHJlcGxhY2VkIHdpdGggc29tZSBuZXcgb25lc1xuICAgICAqXG4gICAgICovXG4gICAgYWN0aXZlQXNzaWdubWVudHMoKTogQXJyYXk8QXNzaWdubWVudFNuYXBzaG90PiB7XG5cbiAgICAgICAgbGV0IGxpc3Q6IEFycmF5PEFzc2lnbm1lbnRTbmFwc2hvdD4gPSBuZXcgQXJyYXk8QXNzaWdubWVudFNuYXBzaG90PigpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gdGhpcy5fZW50cmllcy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByZWM6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgaWYgKHJlYy5tYXNrZWRCeUlkeCA9PT0gMCAmJiAhcmVjLnNyZWMuZnJvbUNoYWluaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGE6IEFzc2lnbm1lbnRTbmFwc2hvdCA9IG5ldyBBc3NpZ25tZW50U25hcHNob3QoKTtcbiAgICAgICAgICAgICAgICBhLmtleSA9IHJlYy5zcmVjLmtleTtcbiAgICAgICAgICAgICAgICBhLnZhbHVlID0gcmVjLnZhbDtcbiAgICAgICAgICAgICAgICBhLnNhbGllbmNlID0gcmVjLnNyZWMuc2FsaWVuY2U7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTaW1pbGFyIGFzIDxjb2RlPmFjdGl2ZUFzc2lnbm1lbnRzPC9jb2RlPiBidXQgZG8gaW5jbHVkZSBhbHNvIHRob3NlIHRoYXQgd2VyZSByZXBsYWNlZCBsYXRlclxuICAgICAqIG9uIHdpdGggYXNzaWdubWVudHMgaGF2aW5nIHRoZSBzYW1lIGtleS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgbmVlZGVkIGZvciBjYXNlcyB3aGVyZSB3ZSBuZWVkIHRvIGhhdmUgZGVlcCBjb3B5IG9mIGN1cnJlbnQgc3RhdGUgYWxvbmcgd2l0aFxuICAgICAqIGFsbCBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICovXG4gICAgYWxsQXNzaWdubWVudHMoKTogQXJyYXk8QXNzaWdubWVudFNuYXBzaG90PiB7XG5cbiAgICAgICAgbGV0IGxpc3Q6IEFycmF5PEFzc2lnbm1lbnRTbmFwc2hvdD4gPSBuZXcgQXJyYXk8QXNzaWdubWVudFNuYXBzaG90PigpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gdGhpcy5fZW50cmllcy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByZWM6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgaWYgKCFyZWMuc3JlYy5mcm9tQ2hhaW5pbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgYTogQXNzaWdubWVudFNuYXBzaG90ID0gbmV3IEFzc2lnbm1lbnRTbmFwc2hvdCgpO1xuICAgICAgICAgICAgICAgIGEua2V5ID0gcmVjLnNyZWMua2V5O1xuICAgICAgICAgICAgICAgIGEudmFsdWUgPSByZWMudmFsO1xuICAgICAgICAgICAgICAgIGEuc2FsaWVuY2UgPSByZWMuc3JlYy5zYWxpZW5jZTtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG5cbiAgICBfc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBtZXJnZTogYm9vbGVhbiwgY2hhaW5pbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgbGV0IHN2YWwgPSB0aGlzLl9tZXRhLnRyYW5zZm9ybVZhbHVlKGtleSwgdmFsdWUpO1xuICAgICAgICBsZXQgZGlkU2V0ID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHJlZ2lzdHJ5ID0gKDxVSU1ldGE+dGhpcy5tZXRhKS5jb21wb25lbnRSZWdpc3RyeTtcbiAgICAgICAgaWYgKGtleSA9PT0gT2JqZWN0TWV0YS5LZXlPYmplY3QgJiYgaXNQcmVzZW50KHJlZ2lzdHJ5KSkge1xuICAgICAgICAgICAgcmVnaXN0cnkucmVnaXN0ZXJUeXBlKGNsYXNzTmFtZSh2YWx1ZSksIHZhbHVlLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhY3RpdmF0aW9uOiBBY3RpdmF0aW9uID0gdGhpcy5fY3VycmVudEFjdGl2YXRpb24uZ2V0Q2hpbGRBY3RpdmF0aW9uKGtleSwgc3ZhbCxcbiAgICAgICAgICAgIGNoYWluaW5nKTtcblxuICAgICAgICBpZiAoaXNCbGFuayhhY3RpdmF0aW9uKSkge1xuICAgICAgICAgICAgZGlkU2V0ID0gdGhpcy5fY3JlYXRlTmV3RnJhbWVGb3JTZXQoa2V5LCBzdmFsLCB2YWx1ZSwgbWVyZ2UsIGNoYWluaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KGFjdGl2YXRpb24pKSB7XG4gICAgICAgICAgICBkaWRTZXQgPSB0aGlzLl9hcHBseUFjdGl2YXRpb24oYWN0aXZhdGlvbiwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpZFNldCkge1xuICAgICAgICAgICAgdGhpcy5hd2FrZUN1cnJlbnRBY3RpdmF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdDb250ZXh0UmVjKCk6IEFzc2lnbm1lbnQge1xuICAgICAgICBsZXQgY291bnQgPSB0aGlzLl9yZWNQb29sLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIChjb3VudCA+IDApID8gdGhpcy5fcmVjUG9vbC5zcGxpY2UoY291bnQgLSAxLCAxKVswXSA6IG5ldyBBc3NpZ25tZW50KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDYWNoZWQgY2FzZTogYXBwbHkgYSBwcmV2aW91c2x5IGNvbXB1dGVkIEFjdGl2YXRpb25cbiAgICAgKi9cbiAgICBfYXBwbHlBY3RpdmF0aW9uKGFjdGl2YXRpb246IEFjdGl2YXRpb24sIGZpcnN0VmFsOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgYXNzZXJ0KGFjdGl2YXRpb24uX3BhcmVudCA9PT0gdGhpcy5fY3VycmVudEFjdGl2YXRpb24sXG4gICAgICAgICAgICAnQXR0ZW1wdCB0byBhcHBseSBhY3RpdmF0aW9uIG9uIG1pc21hdGNoZWQgcGFyZW50Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2VudHJpZXMubGVuZ3RoICE9PSBhY3RpdmF0aW9uLl9vcmlnRW50cnlDb3VudCkge1xuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLFxuICAgICAgICAgICAgICAgICdNaXNtYXRjaGVkIGNvbnRleHQgc3RhY2sgc2l6ZSAoJXMpIGZyb20gd2hlbiBhY3RpdmF0aW9uIHdhcyBwb3BwZWQgJyArXG4gICAgICAgICAgICAgICAgdGhpcy5fZW50cmllcy5sZW5ndGggKyAnICcgKyBhY3RpdmF0aW9uLl9vcmlnRW50cnlDb3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvdW50ID0gYWN0aXZhdGlvbi5fcmVjcy5sZW5ndGg7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNyZWM6IFN0YXRpY1JlYyA9IGFjdGl2YXRpb24uX3JlY3NbaV07XG4gICAgICAgICAgICBsZXQgcmVjOiBBc3NpZ25tZW50ID0gdGhpcy5uZXdDb250ZXh0UmVjKCk7XG4gICAgICAgICAgICByZWMuc3JlYyA9IHNyZWM7XG5cbiAgICAgICAgICAgIC8vIEFwcGx5IG1hc2tpbmcgZm9yIGFueSBwcm9wZXJ0eSB0aGF0IHdlIG1hc2sgb3V0XG4gICAgICAgICAgICBpZiAoc3JlYy5sYXN0QXNzaWdubWVudElkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVwYXJlRm9yT3ZlcnJpZGUodGhpcy5fZW50cmllcy5sZW5ndGgsIHNyZWMubGFzdEFzc2lnbm1lbnRJZHgpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJlYy52YWwgPSAoaSA9PT0gMCAmJiAhdGhpcy5tZXRhLmlzTnVsbE1hcmtlcihmaXJzdFZhbCkpID8gZmlyc3RWYWwgOiBzcmVjLnZhbDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5zZXQoc3JlYy5rZXksIHJlYy52YWwpO1xuICAgICAgICAgICAgdGhpcy5fZW50cmllcy5wdXNoKHJlYyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24gPSBhY3RpdmF0aW9uO1xuICAgICAgICB0aGlzLl9jdXJyZW50UHJvcGVydGllcyA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGF3YWtlQ3VycmVudEFjdGl2YXRpb24oKTogdm9pZCB7XG4gICAgICAgIC8vIFNlZSBpZiB0aGlzIGFjdGl2YXRpb24gcmVxdWlyZXMgZnVydGhlciBjaGFpbmluZ1xuICAgICAgICBsZXQgY3VycmVudEFjdGl2YXRpb24gPSB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbjtcbiAgICAgICAgbGV0IGRlZmVycmVkQXNzaWdubWVudHM6IEFycmF5PERlZmVycmVkQXNzaWdubWVudD4gPSBjdXJyZW50QWN0aXZhdGlvbi5kZWZlcnJlZEFzc2lnbm1lbnRzO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGRlZmVycmVkQXNzaWdubWVudHMpKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RGVmZXJyZWRBc3NpZ25tZW50cyhkZWZlcnJlZEFzc2lnbm1lbnRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlEZWZlcnJlZEFzc2lnbm1lbnRzKGRlZmVycmVkQXNzaWdubWVudHM6IEFycmF5PERlZmVycmVkQXNzaWdubWVudD4pOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgZGEgb2YgIGRlZmVycmVkQXNzaWdubWVudHMpIHtcbiAgICAgICAgICAgIC8vIHZlcmlmeSB0aGF0IGRlZmVycmVkIHZhbHVlIHN0aWxsIGFwcGxpZXNcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvcFZhbHVlID0gdGhpcy5zdGF0aWNhbGx5UmVzb2x2ZVZhbHVlKHRoaXMuYWxsUHJvcGVydGllcygpLmdldChkYS5rZXkpKTtcblxuICAgICAgICAgICAgaWYgKGRhLnZhbHVlID09PSBjdXJyZW50UHJvcFZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVzb2x2ZWRWYWx1ZSA9IHRoaXMucmVzb2x2ZVZhbHVlKGRhLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldChkYS5rZXksIHJlc29sdmVkVmFsdWUsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcHJpbnQoJ19zZXQgU0tJUFBJTkcgZGVmZXJyZWQgYXNzaWdubWVudCBvZiBkZXJpdmVkIHZhbHVlOiAlcyA8LSAlcyAtLScgK1xuICAgICAgICAgICAgICAgIC8vICAgICAnIG5vIGxvbmdlciBtYXRjaGVzIHByb3BlcnR5IGluIGNvbnRleHQ6ICVzJyAsIGRhLmtleSAsIGRhLnZhbHVlICxcbiAgICAgICAgICAgICAgICAvLyBjdXJyZW50UHJvcFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgX2luRGVjbGFyZSgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG1hdGNoOiBNYXRjaFJlc3VsdCA9IHRoaXMubGFzdE1hdGNoV2l0aG91dENvbnRleHRQcm9wcygpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KG1hdGNoKSAmJiAobWF0Y2guX2tleXNNYXRjaGVkTWFzayAmIHRoaXMuX21ldGEuZGVjbGFyZUtleU1hc2spICE9PSAwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgIE5vbi1jYWNoZWQgYWNjZXNzOiBjcmVhdGUgYSBuZXcgYWN0aXZhdGlvblxuICAgICAqL1xuICAgIF9jcmVhdGVOZXdGcmFtZUZvclNldChrZXk6IHN0cmluZywgc3ZhbHVlOiBhbnksIHZhbHVlOiBhbnksIG1lcmdlOiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFpbmluZzogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBsYXN0QWN0aXZhdGlvbjogQWN0aXZhdGlvbiA9IHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uO1xuICAgICAgICBsZXQgbmV3QWN0aXZhdGlvbjogQWN0aXZhdGlvbiA9IG5ldyBBY3RpdmF0aW9uKGxhc3RBY3RpdmF0aW9uKTtcbiAgICAgICAgbmV3QWN0aXZhdGlvbi5fb3JpZ0VudHJ5Q291bnQgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24gPSBuZXdBY3RpdmF0aW9uO1xuXG4gICAgICAgIC8vIHNldCB0aGlzIHZhbHVlXG4gICAgICAgIGxldCBkaWRTZXQ6IGJvb2xlYW4gPSB0aGlzLl9zZXQyKGtleSwgc3ZhbHVlLCB2YWx1ZSwgbWVyZ2UsIGNoYWluaW5nKTtcbiAgICAgICAgLy8gbWlycm9yIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKGRpZFNldCkge1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuX2NoZWNrQXBwbHlQcm9wZXJ0aWVzKCkpIHtcbiAgICAgICAgICAgICAgICAvKiByZXBlYXQgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbWVtYmVyIGZvciB0aGUgZnV0dXJlXG4gICAgICAgIGlmIChDb250ZXh0Ll9DYWNoZUFjdGl2YXRpb25zKSB7XG4gICAgICAgICAgICBsYXN0QWN0aXZhdGlvbi5jYWNoZUNoaWxkQWN0aXZhdGlvbihrZXksIHN2YWx1ZSwgbmV3QWN0aXZhdGlvbiwgY2hhaW5pbmcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uID0gKGRpZFNldCkgPyBuZXdBY3RpdmF0aW9uIDogbGFzdEFjdGl2YXRpb247XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbiAhPT0gbGFzdEFjdGl2YXRpb247XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgbGF6aWx5IHRvIGNvbXB1dGUgdGhlIHByb3BlcnR5IGFjdGl2YXRpb24gZm9yIHRoaXMgYWN0aXZhdGlvblxuICAgICAqIENvbXB1dGUgdGhlIHN0YXRpYyBwYXJ0IG9mIHRoZSBwcm9wZXJ0eSBhY3RpdmF0aW9uXG4gICAgICogd2UgYWNjdW11bGF0ZSB0aGUgcHJvcGVydHkgc2V0dGluZ3Mgb24gYSBzaWRlIGFjdGl2YXRpb24gb2ZmIHRoZSBtYWluIHN0YWNrXG4gICAgICogYW5kIGFwcGx5IGl0IHZpcnR1YWxseSBpZiBvdXIgcGFyZW50IGlzIG5vdCBjb3ZlcmVkXG4gICAgICogICh0aGF0IHdheSB3ZSBkb24ndCBoYXZlIHRvIGFwcGx5IGFuZCB1bmFwcGx5IGFsbCB0aGUgdGltZSlcbiAgICAgKi9cbiAgICBfY3JlYXRlTmV3UHJvcGVydHlDb250ZXh0QWN0aXZhdGlvbihwYXJlbnRBY3RpdmF0aW9uOiBBY3RpdmF0aW9uKTogQWN0aXZhdGlvbiB7XG5cbiAgICAgICAgdGhpcy5wdXNoKCk7XG4gICAgICAgIGxldCBwcm9wQWN0aXZhdGlvbjogQWN0aXZhdGlvbiA9IG5ldyBBY3RpdmF0aW9uKHBhcmVudEFjdGl2YXRpb24pO1xuICAgICAgICBwcm9wQWN0aXZhdGlvbi5fb3JpZ0VudHJ5Q291bnQgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aDtcblxuICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbiA9IHByb3BBY3RpdmF0aW9uO1xuICAgICAgICBsZXQgb3JpZ1ZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICBsZXQgbmVzdGVkTWFwOiBOZXN0ZWRNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE5lc3RlZE1hcDxzdHJpbmcsIGFueT4ob3JpZ1ZhbHVlcyk7XG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9IG5lc3RlZE1hcDtcbiAgICAgICAgdGhpcy5hcHBseVByb3BlcnR5Q29udGV4dEFuZENoYWluKCk7XG5cbiAgICAgICAgaWYgKHByb3BBY3RpdmF0aW9uLl9yZWNzLmxlbmd0aCA+IDAgfHwgaXNQcmVzZW50KHByb3BBY3RpdmF0aW9uLmRlZmVycmVkQXNzaWdubWVudHMpKSB7XG4gICAgICAgICAgICBwcm9wQWN0aXZhdGlvbi5fbmVzdGVkVmFsdWVzID0gbmVzdGVkTWFwO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gQ29udGV4dC5FbXB0eVJlbW92ZU1hcDsgIC8vIGhhY2sgLS0gZW1wdHkgbWFwIHNvIHRoYXQgdW5kbyBpcyBub29wIC0tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKChOZXN0ZWRNYXApX3ZhbHVlcykuZHVwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9wQWN0aXZhdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3AoKTtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gb3JpZ1ZhbHVlcztcbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24gPSBwYXJlbnRBY3RpdmF0aW9uO1xuXG4gICAgICAgIHJldHVybiBwcm9wQWN0aXZhdGlvbjtcbiAgICB9XG5cbiAgICBfYXBwbHlQcm9wZXJ0eUFjdGl2YXRpb24ocHJvcEFjdGl2YXRpb246IEFjdGl2YXRpb24sIHJlYzogQXNzaWdubWVudCkge1xuICAgICAgICBsZXQgcHJvcFZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgaWYgKGlzUHJlc2VudChwcm9wQWN0aXZhdGlvbi5fbmVzdGVkVmFsdWVzKSkge1xuICAgICAgICAgICAgcHJvcFZhbHVlcyA9IHByb3BBY3RpdmF0aW9uLl9uZXN0ZWRWYWx1ZXMucmVwYXJlbnRlZE1hcChwcm9wVmFsdWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCB1cCBwcm9wTG9jYWwgcmVzdWx0c1xuICAgICAgICAvLyBOb3csIHNlZSBpZiB3ZSBuZWVkIHRvIGNvbXB1dGUgYSBkeW5hbWljIHByb3BlcnR5IGFjdGl2YXRpb24gYXMgd2VsbFxuICAgICAgICBpZiAoaXNQcmVzZW50KHByb3BBY3RpdmF0aW9uLmRlZmVycmVkQXNzaWdubWVudHMpKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2goKTtcbiAgICAgICAgICAgIC8vIG5lc3QgYSBkeW5hbWljIG5lc3RlZCBtYXAgb24gb3VyIHN0YXRpYyBuZXN0ZWQgbWFwICh3aGljaCBpcyBvbiBvdXIgbGFzdCBkeW5hbWljXG4gICAgICAgICAgICAvLyBuZXN0ZWQgbWFwLi4uKVxuICAgICAgICAgICAgbGV0IG9yaWdWYWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBuZXcgTmVzdGVkTWFwPHN0cmluZywgYW55Pihwcm9wVmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5QWN0aXZhdGlvbihwcm9wQWN0aXZhdGlvbiwgTWV0YS5OdWxsTWFya2VyKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlEZWZlcnJlZEFzc2lnbm1lbnRzKHByb3BBY3RpdmF0aW9uLmRlZmVycmVkQXNzaWdubWVudHMpO1xuXG4gICAgICAgICAgICByZWMuX3Byb3BlcnR5TG9jYWxWYWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgICAgICByZWMuX3Byb3BlcnR5TG9jYWxTcmVjID0gTGlzdFdyYXBwZXIubGFzdCh0aGlzLl9lbnRyaWVzKS5zcmVjO1xuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBDb250ZXh0LkVtcHR5UmVtb3ZlTWFwOyAgLy8gaGFjayAtLSBlbXB0eSBtYXAgc28gdGhhdCB1bmRvIGlzIG5vb3AgLS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAoKE5lc3RlZE1hcClfdmFsdWVzKS5kdXAoKTtcbiAgICAgICAgICAgIHRoaXMucG9wKCk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBvcmlnVmFsdWVzO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjYW4gdXNlIHN0YXRpYyB2ZXJzaW9uc1xuICAgICAgICAgICAgcmVjLl9wcm9wZXJ0eUxvY2FsVmFsdWVzID0gcHJvcFZhbHVlcztcbiAgICAgICAgICAgIHJlYy5fcHJvcGVydHlMb2NhbFNyZWMgPSBMaXN0V3JhcHBlci5sYXN0KHByb3BBY3RpdmF0aW9uLl9yZWNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRvZG86IGFueSBlcXVhbHMgb2xkIHZhID09PSBuZXcgdmFsXG4gICAgX2lzTmV3VmFsdWUob2xkVmFsOiBhbnksIG5ld1ZhbDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAob2xkVmFsICE9PSBuZXdWYWwgJiYgKGlzUHJlc2VudChvbGRWYWwpIHx8XG4gICAgICAgICAgICAoIW9sZFZhbCA9PT0gbmV3VmFsICYmICghaXNBcnJheShvbGRWYWwpKSB8fCAhKExpc3RXcmFwcGVyLmNvbnRhaW5zKG9sZFZhbCwgbmV3VmFsKSkpKSk7XG4gICAgfVxuXG5cbiAgICBpc0RlY2xhcmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5wcm9wZXJ0eUZvcktleShNZXRhLktleURlY2xhcmUpKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBhc3NlcnRDb250ZXh0Q29uc2lzdGVudCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFDb250ZXh0Ll9FeHBlbnNpdmVDb250ZXh0Q29uc2lzdGVuY3lDaGVja3NFbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWZXJpZnkgdGhhdCBlYWNoIHZhbHVlIGluIGNvbnRleHQgaGFzIG1hdGNoaW5nIChlbmFibGVkKSBjb250ZXh0IHJlY29yZFxuXG5cbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZSh0aGlzLl92YWx1ZXMpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBsYXN0QXNzaWdubWVudElkeCA9IHRoaXMuZmluZExhc3RBc3NpZ25tZW50T2ZLZXkoa2V5KTtcbiAgICAgICAgICAgIGFzc2VydChsYXN0QXNzaWdubWVudElkeCA+PSAwLCAnVmFsdWUgaW4gY29udGV4dCBidXQgbm8gYXNzaWdubWVudCByZWNvcmQgZm91bmQgJyArXG4gICAgICAgICAgICAgICAga2V5ICsgJyA9ICcgKyB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGxldCBjb250ZXh0VmFsID0gdGhpcy5fZW50cmllc1tsYXN0QXNzaWdubWVudElkeF0udmFsO1xuXG4gICAgICAgICAgICBhc3NlcnQodmFsdWUgPT09IGNvbnRleHRWYWwgfHwgKGlzUHJlc2VudCh2YWx1ZSkgJiYgdmFsdWUgPT09IGNvbnRleHRWYWwpLFxuICAgICAgICAgICAgICAgICdWYWx1ZSBpbiBjb250ZXh0ICBkb2VzbnQgbWF0Y2ggdmFsdWUgb24gc3RhY2sgJyArIHZhbHVlICsgJyAvICcgKyBjb250ZXh0VmFsKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVjayBlbnRyaWVzIGZvciBwcm9wZXIgcmVsYXRpb25zaGlwIHdpdGggYW55IHByZXZpb3VzIHJlY29yZHMgdGhhdCB0aGV5IG92ZXJyaWRlXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgcjogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICBsZXQgZm91bmRGaXJzdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZWQ6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChwcmVkLnNyZWMua2V5ID09PSByLnNyZWMua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZWRlY2Vzc29ycyBtdXN0IGJlIG1hc2tlZFxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoKCFmb3VuZEZpcnN0ICYmIHByZWQubWFza2VkQnlJZHggPT09IGkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoKGZvdW5kRmlyc3QgfHwgcHJlZC5zcmVjLmZyb21DaGFpbmluZykgJiYgcHJlZC5tYXNrZWRCeUlkeCA+IDApLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAnUHJlZGVjZXNzb3IgQSBkb2VzIG5vdCBoYXZlIG1hdGNoaW5nIG1hc2tlZEJ5SWR4IEIgIGZvciBvdmVycmlkZSBDOicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZC5zcmVjLmtleSArICcgPSAnICsgcHJlZC52YWwgKyAnLCAnICsgcHJlZC5tYXNrZWRCeUlkeCArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArICcgPSAnICsgci52YWxcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICBhc3NlcnQoKCghZm91bmRGaXJzdCAmJiByLnNyZWMubGFzdEFzc2lnbm1lbnRJZHggPT09IGopIHx8IGZvdW5kRmlyc3QgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWQuc3JlYy5mcm9tQ2hhaW5pbmcpLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAnT3ZlcnJpZGUgQTE9QTIgZG9lcyBub3QgaGF2ZSBwcm9wZXIgbGFzdEFzc2lnbm1lbnRJZHggQjEhPUIyICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvciBwcmVkZWNlc3NvciBDJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkLnNyZWMua2V5ICsgJyA9ICcgKyBwcmVkLnZhbCArICcsICcgKyByLnNyZWMubGFzdEFzc2lnbm1lbnRJZHggKyAnID0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBqICsgJywgJyArIHByZWQudmFsKTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRGaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBfc2V0MihrZXk6IHN0cmluZywgc3ZhbHVlOiBhbnksIHZhbHVlOiBhbnksIG1lcmdlOiBib29sZWFuLCBpc0NoYWluaW5nOiBib29sZWFuKTogYm9vbGVhbiB7XG5cbiAgICAgICAgQ29udGV4dC5fRGVidWdfU2V0c0NvdW50Kys7XG4gICAgICAgIC8vIHByaW50KCdTZXR0aW5nIGtleS92YWxlIG9udG8gc3RhY2s6ICcgKyBrZXkgKyAnPScgKyB2YWx1ZSk7XG4gICAgICAgIGxldCBoYXNPbGRWYWx1ZSA9IHRoaXMuX3ZhbHVlcy5oYXMoa2V5KSAmJiBpc1ByZXNlbnQodGhpcy5fdmFsdWVzLmdldChrZXkpKTtcbiAgICAgICAgbGV0IG9sZFZhbCA9IGhhc09sZFZhbHVlID8gdGhpcy5fdmFsdWVzLmdldChrZXkpIDogbnVsbDtcblxuICAgICAgICBsZXQgaXNOZXdWYWx1ZSA9ICFoYXNPbGRWYWx1ZSB8fCB0aGlzLl9pc05ld1ZhbHVlKG9sZFZhbCwgdmFsdWUpO1xuXG4gICAgICAgIGxldCBtYXRjaGluZ1Byb3BLZXlBc3NpZ25tZW50ID0gIWlzTmV3VmFsdWUgJiYgIWlzQ2hhaW5pbmcgJiZcbiAgICAgICAgICAgICgodGhpcy5fbWV0YS5rZXlEYXRhKGtleSkuaXNQcm9wZXJ0eVNjb3BlKSAmJlxuICAgICAgICAgICAgICAgIGtleSAhPT0gdGhpcy5fY3VycmVudFByb3BlcnR5U2NvcGVLZXkoKSk7XG4gICAgICAgIGlmIChpc05ld1ZhbHVlIHx8IG1hdGNoaW5nUHJvcEtleUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgIGxldCBsYXN0TWF0Y2g6IE1hdGNoUmVzdWx0O1xuICAgICAgICAgICAgbGV0IG5ld01hdGNoOiBNYXRjaFJlc3VsdDtcblxuICAgICAgICAgICAgbGV0IHNhbGllbmNlID0gdGhpcy5fZnJhbWVTdGFydHMubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGxhc3RBc3NpZ25tZW50SWR4ID0gLTE7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayhvbGRWYWwpKSB7XG4gICAgICAgICAgICAgICAgbGFzdE1hdGNoID0gdGhpcy5sYXN0TWF0Y2hXaXRob3V0Q29udGV4dFByb3BzKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgcmVjb21wdXRlIHRoYXQgbWF0Y2ggdXAgdG8gdGhpcyBwb2ludCBieSByZWNvbXB1dGluZyBmb3J3YXJkXG4gICAgICAgICAgICAgICAgLy8gZnJvbSB0aGUgcG9pbnQgb2YgdGhlIGxhc3QgYXNzaWdubWVudCB0byB0aGlzIGtleSAoc2tpcHBpbmcgaXQpLCB0aGVuXG4gICAgICAgICAgICAgICAgLy8gbWF0Y2ggYWdhaW5zdCB0aGUgYXJyYXkgb2Ygb3VyIHZhbHVlIGFuZCB0aGUgb2xkXG5cbiAgICAgICAgICAgICAgICBsZXQgcmVjSWR4ID0gdGhpcy5fZW50cmllcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbGFzdEFzc2lnbm1lbnRJZHggPSB0aGlzLmZpbmRMYXN0QXNzaWdubWVudE9mS2V5KGtleSk7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGxhc3RBc3NpZ25tZW50SWR4ID49IDAsXG4gICAgICAgICAgICAgICAgICAgICdWYWx1ZSBpbiBjb250ZXh0IGJ1dCBubyBhc3NpZ25tZW50IHJlY29yZCBmb3VuZCAnICsga2V5ICsgJyA9ICcgKyBvbGRWYWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoaW5nUHJvcEtleUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlYXAgdmVyc2lvbiBvZiBtYXNraW5nIGZvciBhIG1hdGNoaW5nIHNldDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW50cmllc1tsYXN0QXNzaWdubWVudElkeF0ubWFza2VkQnlJZHggPSByZWNJZHg7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IHRoaXMubGFzdE1hdGNoV2l0aG91dENvbnRleHRQcm9wcygpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYmUgYWJsZSB0byBvdmVycmlkZSBhIG5vbi1jaGFpbmluZyBhc3NpZ25tZW50LiAgT3VyIHByb2JsZW0gaXMsIHRob3VnaCwgaWZcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGRldmVsb3BlciB3YW50ZWQgdG8gZm9yY2UgYSByZS1hc3NpZ25tZW50IGluIHRoZSBuZXcgZnJhbWUsIHdlJ2QgZmlsdGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IG91dCBhcyBhIGR1cGxpY2F0ZSBhc3NpZ25tZW50IGFib3ZlLiAgTm93LCB3ZSBjb3VsZCBhbGxvdyB0aGF0IGFzc2lnbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhyb3VnaCwgYnV0IGl0IHdvdWxkIHRoZW4gYnJlYWsgaW5sZXRpYW50cyB3aGVuIHNlYXJjaGluZyBiYWNrIHRvIG1hc2sgYVxuICAgICAgICAgICAgICAgICAgICAvLyBrZXkgKHdlIHdvdWxkbid0IHJlYWxpemUgdGhhdCB3ZSBuZWVkIHRvIGdvIGZ1cnRoZXIgYmFjayB0byBmaW5kIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBvbmUpLlxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbGRSZWM6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2xhc3RBc3NpZ25tZW50SWR4XTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkUmVjLnNyZWMuc2FsaWVuY2UgPT09IHNhbGllbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJldiA9IHRoaXMuZmluZExhc3RBc3NpZ25tZW50T2ZLZXlXaXRoVmFsdWUoa2V5LCB2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9PSAtMSAmJiB0aGlzLl9lbnRyaWVzW3ByZXZdLnNyZWMuc2FsaWVuY2UgPT09IHNhbGllbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ2hhaW5pbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChvbGRSZWMuc3JlYy5zYWxpZW5jZSA+IHNhbGllbmNlIHx8ICFvbGRSZWMuc3JlYy5mcm9tQ2hhaW5pbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmludCgnU2V0IG9mIGtleSBza2lwcGVkIChzYWxpZW5jZSAlcyA8PSAlcyknICsga2V5ICsgJywgJyArIG9sZFZhbCArXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAnLCAnICsgdmFsdWUgKyAnLCAnICsgc2FsaWVuY2UgKyAnLCAnICsgb2xkUmVjLnNyZWMuc2FsaWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEFzc2lnbm1lbnRJZHggPSB0aGlzLl9wcmVwYXJlRm9yT3ZlcnJpZGUocmVjSWR4LCBsYXN0QXNzaWdubWVudElkeCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld01hdGNoID0gdGhpcy5fcmVtYXRjaEZvck92ZXJyaWRlKGtleSwgc3ZhbHVlLCByZWNJZHgsIGZpcnN0QXNzaWdubWVudElkeCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lcmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1ldGEuUHJvcGVydHlNZXJnZXJfTGlzdC5tZXJnZShvbGRWYWwsIHZhbHVlLCB0aGlzLmlzRGVjbGFyZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXNzZXJ0KHRoaXMuX2VudHJpZXMubGVuZ3RoIDw9IENvbnRleHQuTWF4Q29udGV4dFN0YWNrU2l6ZSxcbiAgICAgICAgICAgICAgICAnTWV0YVVJIGNvbnRleHQgc3RhY2sgZXhjZWVkZWQgbWF4IHNpemUgLS0gbGlrZWx5IGluZmluaXRlIGNoYWluaW5nOiAnICtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbnRyaWVzLmxlbmd0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGxldCBzcmVjOiBTdGF0aWNSZWMgPSBuZXcgU3RhdGljUmVjKCk7XG4gICAgICAgICAgICBzcmVjLmtleSA9IGtleTtcbiAgICAgICAgICAgIC8vIHRvZG86IGNvbnZlcnNpb25cbiAgICAgICAgICAgIHNyZWMudmFsID0gc3ZhbHVlO1xuICAgICAgICAgICAgc3JlYy5sYXN0QXNzaWdubWVudElkeCA9IGxhc3RBc3NpZ25tZW50SWR4O1xuICAgICAgICAgICAgc3JlYy5zYWxpZW5jZSA9IHNhbGllbmNlO1xuICAgICAgICAgICAgc3JlYy5mcm9tQ2hhaW5pbmcgPSBpc0NoYWluaW5nO1xuXG4gICAgICAgICAgICBpZiAoaXNCbGFuayhuZXdNYXRjaCkpIHtcbiAgICAgICAgICAgICAgICBuZXdNYXRjaCA9IChpc1ByZXNlbnQodmFsdWUpKSA/IHRoaXMuX21ldGEubWF0Y2goa2V5LCBzdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCkgOiBsYXN0TWF0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcmVjLm1hdGNoID0gbmV3TWF0Y2g7XG4gICAgICAgICAgICBzcmVjLmFjdGl2YXRpb24gPSB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uLl9yZWNzLnB1c2goc3JlYyk7XG5cbiAgICAgICAgICAgIGxldCByZWMgPSB0aGlzLm5ld0NvbnRleHRSZWMoKTtcbiAgICAgICAgICAgIHJlYy5zcmVjID0gc3JlYztcbiAgICAgICAgICAgIHJlYy52YWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2VudHJpZXMucHVzaChyZWMpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFByb3BlcnRpZXMgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMuc2V0KGtleSwgdmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyggdGhpcy5kZWJ1Z05hbWUgKyAnID0+ICcgK1xuICAgICAgICAgICAgLy8gICAgICdQdXNoKCcgKyBrZXkgKyAnLCAnICsgc3ZhbHVlICsgJyk6ICcgKyAnTWF0Y2hlczogJyArIG5ld01hdGNoLm1hdGNoZXMoKS5sZW5ndGhcbiAgICAgICAgICAgIC8vICAgICArICcsIFByb3BNYXA6ICcgKyBzcmVjLnByb3BlcnRpZXMoKS5zaXplKTtcblxuICAgICAgICAgICAgaWYgKENvbnRleHQuX0RlYnVnUnVsZU1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja01hdGNoKHNyZWMubWF0Y2gsIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hc3NlcnRDb250ZXh0Q29uc2lzdGVudCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIHByaW50KCdDb250ZXh0IHNraXBwZWQgYXNzaWdubWVudCBvZiBtYXRjaGluZyBwcm9wZXJ0eSB2YWx1ZSAlcyA9ICVzIChpc0NoYWluaW5nID09XG4gICAgICAgICAgICAvLyAlcywgaXNQcm9wS2V5ID09ICVzKScsIGtleSwgdmFsdWUsIGlzQ2hhaW5pbmcsXG4gICAgICAgICAgICAvLyAodGhpcy5fbWV0YS5rZXlEYXRhKGtleSkuaXNQcm9wZXJ0eVNjb3BlKSk7XG5cbiAgICAgICAgICAgIGlmICghaXNDaGFpbmluZyAmJiB0aGlzLm1ldGEua2V5RGF0YShrZXkpLmlzUHJvcGVydHlTY29wZSkge1xuICAgICAgICAgICAgICAgIC8vIHNsYW0gZG93biBhIHJlYyBmb3IgcHJvcGVydHkgY29udGV4dFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIGdldCBmcmFtZVN0YXJ0cygpOiBudW1iZXJbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZVN0YXJ0cztcbiAgICB9XG5cbiAgICBfdW5kb1JlY1ZhbHVlKHJlYzogQXNzaWdubWVudCk6IHZvaWQge1xuICAgICAgICBpZiAocmVjLnNyZWMubGFzdEFzc2lnbm1lbnRJZHggPT09IC0xIHx8XG4gICAgICAgICAgICB0aGlzLl9lbnRyaWVzW3JlYy5zcmVjLmxhc3RBc3NpZ25tZW50SWR4XS5tYXNrZWRCeUlkeCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5kZWxldGUocmVjLnNyZWMua2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5zZXQocmVjLnNyZWMua2V5LCB0aGlzLl9lbnRyaWVzW3JlYy5zcmVjLmxhc3RBc3NpZ25tZW50SWR4XS52YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBVbmRvZXMgYW5kIG1hc2tzIGFzc2lnbm1lbnRzIGludmFsaWRhdGVkIGJ5IG92ZXJyaWRlIG9mIGdpdmVuIHJlY29yZFxuICAgIC8vIFJldHVybnMgc3RhY2sgaW5kZXggZm9yIGZpcnN0IGFzc2lnbm1lbnQgKGkuZS4gd2hlcmUgbWF0Y2ggcmVjb21wdXRhdGlvbiBtdXN0IHN0YXJ0KVxuICAgIF9wcmVwYXJlRm9yT3ZlcnJpZGUob3ZlcnJpZGVJbmRleDogbnVtYmVyLCBsYXN0QXNzaWdubWVudElkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgLy8gaWYgd2UncmUgb3ZlcnJpZGluZyBhIHByb3AgY29udGV4dCBvdmVycmlkZSBvZiBhIG1hdGNoaW5nIHZhbHVlLCBiYWNrIHVwIGZ1cnRoZXJcbiAgICAgICAgbGV0IGxhc3RMYXN0SWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKCgobGFzdExhc3RJZHggPSB0aGlzLl9lbnRyaWVzW2xhc3RBc3NpZ25tZW50SWR4XS5zcmVjLmxhc3RBc3NpZ25tZW50SWR4KSAhPT0gLTEpICYmXG4gICAgICAgICh0aGlzLl9lbnRyaWVzW2xhc3RBc3NpZ25tZW50SWR4XS5tYXNrZWRCeUlkeCA8PSAwKSkge1xuICAgICAgICAgICAgLy8gbWFyayBpdCEgKHdlJ2xsIHBpY2sgaXQgdXAgYmVsb3cuLi4pXG4gICAgICAgICAgICB0aGlzLl9lbnRyaWVzW2xhc3RBc3NpZ25tZW50SWR4XS5tYXNrZWRCeUlkeCA9IC0xO1xuICAgICAgICAgICAgbGFzdEFzc2lnbm1lbnRJZHggPSBsYXN0TGFzdElkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVuZG8gYWxsIGNvbmZsaWN0aW5nIG9yIGRlcnZpZWQgYXNzaWdubWVudHMgKGFuZCBtYXJrIHRoZW0pXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gbGFzdEFzc2lnbm1lbnRJZHg7IGktLSkge1xuICAgICAgICAgICAgbGV0IHIgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB1bmRvIChhbmQgbWFzaykgYW55IHJlY29yZCB0aGF0IGNvbmZsaWN0IG9yIGFyZSBkZXJpdmVkXG4gICAgICAgICAgICAvLyBOT1RFOiBXZSBhcmUgc2tpcHBpbmcgdGhlIHJlbW92ZSBhbGwgY2hhaW5lZCByZWNvcmRzLCBiZWNhdXNlIHRoaXMgY2FuIHJlc3VsdCBpblxuICAgICAgICAgICAgLy8gdW5kb2luZyBkZXJpdmVkIHN0YXRlIHRvdGFsbHkgdW5yZWxhdGVkIHRvIHRoaXMga2V5LiAgSWRlYWxseSB3ZSdkIGZpZ3VyZSBvdXQgd2hhdFxuICAgICAgICAgICAgLy8gZGVwZW5kZWQgb24gd2hhdC4uLlxuICAgICAgICAgICAgaWYgKHIubWFza2VkQnlJZHggPD0gMCAmJiAoaSA9PT0gbGFzdEFzc2lnbm1lbnRJZHggfHwgci5tYXNrZWRCeUlkeCA9PT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgLy8gfHwgci5zcmVjLmZyb21DaGFpbmluZ1xuICAgICAgICAgICAgICAgIC8vIG1hcmsgYW5kIHVuZG8gaXRcbiAgICAgICAgICAgICAgICByLm1hc2tlZEJ5SWR4ID0gb3ZlcnJpZGVJbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLl91bmRvUmVjVmFsdWUocik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhc3RBc3NpZ25tZW50SWR4O1xuICAgIH1cblxuXG4gICAgX3JlbWF0Y2hGb3JPdmVycmlkZShrZXk6IHN0cmluZywgc3ZhbHVlOiBhbnksIG92ZXJyaWRlSW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0QXNzaWdubWVudElkeDogbnVtYmVyKTogTWF0Y2hSZXN1bHQge1xuICAgICAgICAvLyBzdGFydCBmcm9tIHRoZSB0b3AgZG93biBsb29raW5nIGZvciB0aGF0IGxhc3QgdW5tYXNrZWQgcmVjb3JkXG4gICAgICAgIGxldCBsYXN0TWF0Y2g6IE1hdGNoUmVzdWx0O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoOyBpIDwgZmlyc3RBc3NpZ25tZW50SWR4OyBpKyspIHtcbiAgICAgICAgICAgIGxldCByZWMgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgaWYgKHJlYy5tYXNrZWRCeUlkeCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdE1hdGNoID0gcmVjLnNyZWMubWF0Y2g7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3ZlcnJpZGVzTWF0Y2g6IFVuaW9uTWF0Y2hSZXN1bHQ7XG5cbiAgICAgICAgLy8gUmVtYXRjaCBza2lwcGluZyBvdmVyIHRoZSBsYXN0IGFzc2lnbm1lbnQgb2YgdGhpcyBwcm9wZXJ0eVxuICAgICAgICAvLyBhbmQgYWxsIGFzc2lnbm1lbnRzIGZyb20gY2hhaW5naW5nXG4gICAgICAgIGZvciAobGV0IGVuZCA9IHRoaXMuX2VudHJpZXMubGVuZ3RoOyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIC8vIHJlbWF0Y2ggb24gYW55IHVubWFza2VkIHJlY29yZHNcbiAgICAgICAgICAgIGlmIChyLm1hc2tlZEJ5SWR4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGFzdE1hdGNoID0gdGhpcy5fbWV0YS5tYXRjaChyLnNyZWMua2V5LCByLnNyZWMudmFsLCBsYXN0TWF0Y2gpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhY2N1bXVsYXRlIG1hc2tlZCAoJ19vJykgbWF0Y2hcbiAgICAgICAgICAgICAgICBvdmVycmlkZXNNYXRjaCA9IHRoaXMuX21ldGEudW5pb25PdmVycmlkZU1hdGNoKHIuc3JlYy5rZXksIHIuc3JlYy52YWwsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJyaWRlc01hdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoc3ZhbHVlKSB8fCBpc0JsYW5rKGxhc3RNYXRjaCkpIHtcbiAgICAgICAgICAgIGxhc3RNYXRjaCA9IHRoaXMuX21ldGEubWF0Y2goa2V5LCBzdmFsdWUsIGxhc3RNYXRjaCk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdE1hdGNoLnNldE92ZXJyaWRlc01hdGNoKG92ZXJyaWRlc01hdGNoKTtcbiAgICAgICAgcmV0dXJuIGxhc3RNYXRjaDtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX3VuZG9PdmVycmlkZShyZWM6IEFzc2lnbm1lbnQsIHJlY0lkeDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBsYXN0QXNzaWdubWVudElkeCA9IHJlYy5zcmVjLmxhc3RBc3NpZ25tZW50SWR4O1xuICAgICAgICBsZXQgbGFzdExhc3RJZHg6IG51bWJlcjtcblxuXG4gICAgICAgIC8vIGJhc3RpY2sgdXAgZnVydGhlciBpZiBuZWNlc3NhcnlcbiAgICAgICAgd2hpbGUgKCgobGFzdExhc3RJZHggPSB0aGlzLl9lbnRyaWVzW2xhc3RBc3NpZ25tZW50SWR4XS5zcmVjLmxhc3RBc3NpZ25tZW50SWR4KSAhPT0gLTEpICYmXG4gICAgICAgICh0aGlzLl9lbnRyaWVzW2xhc3RMYXN0SWR4XS5tYXNrZWRCeUlkeCA9PT0gcmVjSWR4KSkge1xuICAgICAgICAgICAgbGFzdEFzc2lnbm1lbnRJZHggPSBsYXN0TGFzdElkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBsYXN0QXNzaWdubWVudElkeCwgYyA9IHRoaXMuX2VudHJpZXMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcjogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG5cbiAgICAgICAgICAgIGlmIChyLm1hc2tlZEJ5SWR4ID09PSByZWNJZHgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMuc2V0KHIuc3JlYy5rZXksIHIudmFsKTtcbiAgICAgICAgICAgICAgICByLm1hc2tlZEJ5SWR4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgX2NoZWNrTWF0Y2gobWF0Y2g6IE1hdGNoUmVzdWx0LCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBtYXRjaC5fY2hlY2tNYXRjaCh0aGlzLl92YWx1ZXMsIHRoaXMuX21ldGEpO1xuICAgIH1cblxuICAgIGZpbmRMYXN0QXNzaWdubWVudE9mS2V5KGtleTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCByZWM6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgaWYgKHJlYy5zcmVjLmtleSA9PT0ga2V5ICYmIHJlYy5tYXNrZWRCeUlkeCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBmaW5kTGFzdEFzc2lnbm1lbnRPZktleVdpdGhWYWx1ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IG51bWJlciB7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgcmVjOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIGlmIChyZWMuc3JlYy5rZXkgPT09IGtleSAmJiAhdGhpcy5faXNOZXdWYWx1ZShyZWMudmFsLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB3ZSBoYXZlIHZhbHVlIG1pcnJvcmluZyAocHJvcGVydHkgdG8gY29udGV4dCkgdG8gZG8gRHluYW1pYyBwcm9wZXJ0eSBtaXJyb3Jpbmcgd2lsbFxuICAgICAqIGJlIGFkZGVkIHRvIHRoZSBjdXJyZW50QWN0aXZhdGlvbiBkZWZlcnJlZEFzc2lnbm1lbnQgbGlzdFxuICAgICAqXG4gICAgICovXG4gICAgX2NoZWNrQXBwbHlQcm9wZXJ0aWVzKCk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGxldCBkaWRTZXQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG51bUVudHJpZXMgPSAwO1xuICAgICAgICBsZXQgbGFzdFNpemUgPSAwO1xuICAgICAgICBsZXQgZGVjbGFyZUtleTogc3RyaW5nID0gdGhpcy5faW5EZWNsYXJlKCkgPyB0aGlzLl92YWx1ZXMuZ2V0KE1ldGEuS2V5RGVjbGFyZSkgOiBudWxsO1xuXG4gICAgICAgIHdoaWxlICgobnVtRW50cmllcyA9IHRoaXMuX2VudHJpZXMubGVuZ3RoKSA+IGxhc3RTaXplKSB7XG4gICAgICAgICAgICBsYXN0U2l6ZSA9IG51bUVudHJpZXM7XG4gICAgICAgICAgICBsZXQgcmVjOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tudW1FbnRyaWVzIC0gMV07XG4gICAgICAgICAgICBsZXQgcHJvcGVydGllczogUHJvcGVydHlNYXAgPSByZWMuc3JlYy5wcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgICAgIGxldCBjb250ZXh0S2V5czogQXJyYXk8UHJvcGVydHlNYW5hZ2VyPiA9IHByb3BlcnRpZXMuY29udGV4dEtleXNVcGRhdGVkO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGNvbnRleHRLZXlzKSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSBjb250ZXh0S2V5cy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcE1ncjogUHJvcGVydHlNYW5hZ2VyID0gY29udGV4dEtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXk6IHN0cmluZyA9IHByb3BNZ3IuX25hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoZGVjbGFyZUtleSkgJiYga2V5ID09PSBkZWNsYXJlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBUb0RvOiBhcHBseWluZyByZXNvbHZlZCB2YWx1ZSAtLSBuZWVkIHRvIGRlZmVyIHJlc29sdXRpb24gb24gdHJ1ZSBkeW5hbWljXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlcyBTdXBwcmVzcyBjaGFpbmVkIGFzc2lnbm1lbnQgaWY6IDEpIE91ciBwYXJlbnQgd2lsbCBhc3NpZ24gdGhpc1xuICAgICAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0eSAoaGFzIGEgZGVmZXJyZWQgYWN0aXZhdGlvbiBmb3IgaXQpLCBvciAyKSBUaGVyZSdzIGFscmVhZHkgYVxuICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaGluZyBhc3NpZ25tZW50IHdpdGggaGlnaGVyIHNhbGllbmNlXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWwgPSB0aGlzLnN0YXRpY2FsbHlSZXNvbHZlVmFsdWUocHJvcGVydGllcy5nZXQoa2V5KSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2UHJvcHM6IFByb3BlcnR5TWFwO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdXBwcmVzczogYm9vbGVhbiA9IChpc1ByZXNlbnQocHJldlByb3BzKSAmJiBwcmV2UHJvcHMuaGFzKGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICF0aGlzLl9pc05ld1ZhbHVlKHRoaXMuc3RhdGljYWxseVJlc29sdmVWYWx1ZShwcmV2UHJvcHMuZ2V0KGtleSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbCkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fY3VycmVudEFjdGl2YXRpb24uX3BhcmVudC5oYXNEZWZlcnJlZEFzc2lnbm1lbnRGb3JLZXkoa2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICYmIHRoaXMuX3ZhbHVlcy5jb250YWluc0tleShrZXkpICovKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN1cHByZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWlycm9yS2V5ID0gcHJvcE1nci5fa2V5RGF0YVRvU2V0Ll9rZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsIGluc3RhbmNlb2YgRHluYW1pY1Byb3BlcnR5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmludCgnKGRlZmVycmVkKSBjaGFpbmluZyBrZXk6ICcgLCBwcm9wTWdyLl9rZXlEYXRhVG9TZXQuX2tleSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uLmFkZERlZmVycmVkQXNzaWdubWVudChtaXJyb3JLZXksIG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhcmUgdGhpcyB2YWx1ZSB0byB0aGUgdmFsdWUgZnJvbSB0aGUgZW5kIG9mIHRoZSBsYXN0IGZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpbnQoJ2NoYWluaW5nIGtleTogJyAsIHByb3BNZ3IuX2tleURhdGFUb1NldC5fa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2V0MihtaXJyb3JLZXksIG5ld1ZhbCwgbmV3VmFsLCBmYWxzZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlkU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmludCgnU1VQUFJFU1NFRCBjaGFpbmluZyBrZXk6ICcgLCBwcm9wTWdyLl9rZXlEYXRhVG9TZXQuX2tleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZFNldDtcbiAgICB9XG5cblxuICAgIGFwcGx5UHJvcGVydHlDb250ZXh0QW5kQ2hhaW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9jaGVja1Byb3BlcnR5Q29udGV4dCgpKSB7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5fY2hlY2tBcHBseVByb3BlcnRpZXMoKSkge1xuICAgICAgICAgICAgICAgIC8qIHJlcGVhdCAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBfY3VycmVudFByb3BlcnR5U2NvcGVLZXkoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGZvdW5kS2V5OiBzdHJpbmc7XG4gICAgICAgIGxldCBmb3VuZEFjdGl2YXRpb246IEFjdGl2YXRpb247XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2VudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCByZWM6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChmb3VuZEFjdGl2YXRpb24pICYmIHJlYy5zcmVjLmFjdGl2YXRpb24gIT09IGZvdW5kQWN0aXZhdGlvbikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX21ldGEua2V5RGF0YShyZWMuc3JlYy5rZXkpLmlzUHJvcGVydHlTY29wZSkge1xuICAgICAgICAgICAgICAgIGlmICghcmVjLnNyZWMuZnJvbUNoYWluaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWMuc3JlYy5rZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZvciBjaGFpbmluZyBhc3NpZ25tZW50cywgd2Uga2VlcCBsb29raW5nIHVudGlsIHdlIGV4aGF1c3QgdGhlIGZpcnN0XG4gICAgICAgICAgICAgICAgLy8gbm9uLWNoYWluaW5nIGFjdGl2YXRpb24gVG9kbzogYnJva2VuIC0tIGRpc2FibGluZyBzZXQgb2YgY29udGV4dCBrZXkgZnJvbVxuICAgICAgICAgICAgICAgIC8vIGNoYWluaW5nIGlmIChmb3VuZEtleSA9PT0gbnVsbCkgZm91bmRLZXkgPSBzY29wZUtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoZm91bmRLZXkpICYmICFyZWMuc3JlYy5mcm9tQ2hhaW5pbmcpIHtcbiAgICAgICAgICAgICAgICBmb3VuZEFjdGl2YXRpb24gPSByZWMuc3JlYy5hY3RpdmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3VuZEtleTtcblxuICAgIH1cblxuXG4gICAgLy8gQXBwbHkgYSAncHJvcGVydHkgY29udGV4dCcgcHJvcGVydHkgKGUuZy4gZmllbGRfcCBmb3IgZmllbGQpIHRvIHRoZSBjb250ZXh0IGlmIG5lY2Vzc2FyeVxuICAgIF9jaGVja1Byb3BlcnR5Q29udGV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX3ZhbHVlcyBpbnN0YW5jZW9mIE5lc3RlZE1hcCwgJ1Byb3BlcnR5IGFzc2lnbm1lbnQgb24gYmFzZSBtYXA/Jyk7XG4gICAgICAgIGxldCBzY29wZUtleTogc3RyaW5nID0gdGhpcy5fY3VycmVudFByb3BlcnR5U2NvcGVLZXkoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChzY29wZUtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXQyKE1ldGEuU2NvcGVLZXksIHNjb3BlS2V5LCBzY29wZUtleSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBkZWJ1ZygpOiB2b2lkIHtcbiAgICAgICAgLy8gc2V0IGRlYnVnZ2VyIGJyZWFrcG9pbnQgaGVyZVxuICAgICAgICBwcmludCgnKioqKioqICBEZWJ1ZyBDYWxsICoqKioqKicpO1xuICAgICAgICB0aGlzLl9sb2dDb250ZXh0KCk7XG4gICAgfVxuXG5cbiAgICBkZWJ1Z1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IFN0cmluZ0pvaW5lcihbJzxiPkNvbnRleHQ6PC9iPiZuYnNwOyddKTtcblxuICAgICAgICBidWZmZXIuYWRkKCcoJm5ic3A7Jyk7XG4gICAgICAgIGJ1ZmZlci5hZGQodGhpcy5fZW50cmllcy5sZW5ndGggKyAnJyk7XG4gICAgICAgIGJ1ZmZlci5hZGQoJyBlbnRyaWVzJyk7XG4gICAgICAgIGJ1ZmZlci5hZGQoJyZuYnNwOyk8YnIvPicpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gdGhpcy5fZW50cmllcy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcCA9IGk7XG4gICAgICAgICAgICB3aGlsZSAoc3AtLSA+IDApIHtcbiAgICAgICAgICAgICAgICBidWZmZXIuYWRkKCcmbmJzcDsnKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBsZXQgcjogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG5cbiAgICAgICAgICAgIGJ1ZmZlci5hZGQoJyZuYnNwOycpO1xuICAgICAgICAgICAgYnVmZmVyLmFkZChyLnNyZWMua2V5KTtcbiAgICAgICAgICAgIGJ1ZmZlci5hZGQoJyZuYnNwOyZuYnNwOzombmJzcDsnKTtcbiAgICAgICAgICAgIGJ1ZmZlci5hZGQoci5zcmVjLnZhbCk7XG4gICAgICAgICAgICBidWZmZXIuYWRkKChyLnNyZWMuZnJvbUNoYWluaW5nID8gJyBeJyA6ICcnKSk7XG4gICAgICAgICAgICBidWZmZXIuYWRkKChyLm1hc2tlZEJ5SWR4ICE9PSAwID8gJyBYJyA6ICcnKSk7XG4gICAgICAgICAgICBidWZmZXIuYWRkKCc8YnIvPicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BlcnR5QWN0aXZhdGlvbjogQWN0aXZhdGlvbiA9IHRoaXMuY3VycmVudEFjdGl2YXRpb24uX3Byb3BlcnR5QWN0aXZhdGlvbjtcbiAgICAgICAgaWYgKGlzUHJlc2VudChwcm9wZXJ0eUFjdGl2YXRpb24pKSB7XG4gICAgICAgICAgICBsZXQgc3JlY3M6IEFycmF5PFN0YXRpY1JlYz4gPSBwcm9wZXJ0eUFjdGl2YXRpb24uX3JlY3M7XG5cbiAgICAgICAgICAgIGJ1ZmZlci5hZGQoJyZuYnNwOyZuYnNwOyZuYnNwOzxiPlByb3BlcnR5QWN0aXZhdGlvbi4uLjwvYj48YnIvPicpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IHNyZWNzLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzcCA9IGkgKyB0aGlzLl9lbnRyaWVzLmxlbmd0aCArIDE7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoc3AtLSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLmFkZCgnJm5ic3A7Jm5ic3A7Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByOiBTdGF0aWNSZWMgPSBzcmVjc1tpXTtcbiAgICAgICAgICAgICAgICBidWZmZXIuYWRkKHIua2V5KTtcbiAgICAgICAgICAgICAgICBidWZmZXIuYWRkKCcmbmJzcDsmbmJzcDs6Jm5ic3A7Jyk7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmFkZChyLnZhbCk7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmFkZCgoci5mcm9tQ2hhaW5pbmcgPyAnJm5ic3A7Jm5ic3A7JyA6ICcmbmJzcDsmbmJzcDshJykpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5hZGQoJzxici8+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyLmFkZCgnJm5ic3A7PGJyLz48Yj5Qcm9wczo8L2I+PGJyLz4nKTtcbiAgICAgICAgdGhpcy53cml0ZVByb3BlcnRpZXMoYnVmZmVyLCB0aGlzLmFsbFByb3BlcnRpZXMoKSwgMSwgZmFsc2UpO1xuXG4gICAgICAgIHJldHVybiBidWZmZXIudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBfbG9nQ29udGV4dCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGRlYnVnU3RyaW5nOiBzdHJpbmcgPSB0aGlzLmRlYnVnU3RyaW5nKCk7XG4gICAgICAgIHByaW50KGRlYnVnU3RyaW5nKTtcbiAgICAgICAgcHJpbnQoJ1xcbicpO1xuICAgIH1cblxuICAgIHByaXZhdGUgd3JpdGVQcm9wZXJ0aWVzKGJ1ZjogU3RyaW5nSm9pbmVyLCBwcm9wZXJ0aWVzOiBNYXA8c3RyaW5nLCBhbnk+LCBsZXZlbDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZUxpbmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgTWFwV3JhcHBlci5pdGVyYWJsZShwcm9wZXJ0aWVzKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNpbmdsZUxpbmUpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAobGV2ZWwtLSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCgnJm5ic3A7Jm5ic3A7Jm5ic3A7Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgYnVmLmFkZChrZXkpO1xuICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJyA6bnVsbCcpO1xuICAgICAgICAgICAgICAgIGJ1Zi5hZGQoc2luZ2xlTGluZSA/ICc7Jm5ic3A7Jm5ic3A7JyA6ICc7PGJyLz4nKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYuYWRkKCcmbmJzcDsmbmJzcDsmbmJzcDsnKTtcbiAgICAgICAgICAgICAgICBidWYuYWRkKGtleSk7XG4gICAgICAgICAgICAgICAgYnVmLmFkZCgnOicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSB8fCBpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCgnJm5ic3A7Jm5ic3A7Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKCcmbmJzcDsmbmJzcDsnKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmdNYXAodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJ3snKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJ30nKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBFeHByKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKE1hcFdyYXBwZXIudG9TdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLnRvU3RyaW5nKHZhbHVlKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBPdmVycmlkZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQodmFsdWUudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmllbGRQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJyQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCh2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2luZ2xlTGluZSkge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKCc7Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCgnPGJyLz4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBsYXN0TWF0Y2hXaXRob3V0Q29udGV4dFByb3BzKCkge1xuICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIuaXNFbXB0eShcbiAgICAgICAgICAgIHRoaXMuX2VudHJpZXMpID8gbnVsbCA6IHRoaXMuX2VudHJpZXNbdGhpcy5fZW50cmllcy5sZW5ndGggLSAxXS5zcmVjLm1hdGNoO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBsYXN0TWF0Y2goKSB7XG4gICAgICAgIGlmIChMaXN0V3JhcHBlci5pc0VtcHR5KHRoaXMuX2VudHJpZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF0Y2g6IE1hdGNoUmVzdWx0ID0gTGlzdFdyYXBwZXIubGFzdDxBc3NpZ25tZW50Pih0aGlzLl9lbnRyaWVzKVxuICAgICAgICAgICAgLnByb3BlcnR5TG9jYWxNYXRjaGVzKHRoaXMpO1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudChtYXRjaCkpID8gbWF0Y2ggOiB0aGlzLmxhc3RNYXRjaFdpdGhvdXRDb250ZXh0UHJvcHMoKTtcblxuICAgIH1cblxuICAgIGxhc3RTdGF0aWNSZWMoKTogU3RhdGljUmVjIHtcbiAgICAgICAgaWYgKExpc3RXcmFwcGVyLmlzRW1wdHkodGhpcy5fZW50cmllcykpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZWM6IFN0YXRpY1JlYyA9IExpc3RXcmFwcGVyLmxhc3QodGhpcy5fZW50cmllcykucHJvcGVydHlMb2NhbFN0YXRpY1JlYyh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChyZWMpID8gcmVjIDogTGlzdFdyYXBwZXIubGFzdCh0aGlzLl9lbnRyaWVzKS5zcmVjO1xuICAgIH1cblxuXG4gICAgZ2V0IHJlY1Bvb2woKTogQXJyYXk8QXNzaWdubWVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVjUG9vbDtcbiAgICB9XG5cblxuICAgIGdldCBjdXJyZW50QWN0aXZhdGlvbigpOiBBY3RpdmF0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uO1xuICAgIH1cblxuXG4gICAgZXh0ZW5kZWRGaWVsZHMoKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlcztcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIHNoYXJhYmxlL3JlLWFwcGxpY2FibGUgYmxvY2sgb2Ygc2V0U2NvcGVLZXlBc3NpZ25tZW50IF9TdGF0aWNSZWNzLiAgQW4gQWN0aXZhdGlvbiBjb250YWluc1xuICogdGhlIGxpc3Qgb2YgYXNzaWdubWVudCByZWNvcmRzIHJlc3VsdGluZyBmcm9tIChjaGFpbmluZyBmcm9tKSBhIHNpbmdsZSBvcmlnaW5hbFxuICogYXNzaWdubWVudCAoYXMgd2VsbCBhcyBfRGVmZXJyZWRBc3NpZ25tZW50IHJlY29yZHMgZm9yIGR5bmFtaWMgdmFsdWVzIHRoYXQgY2Fubm90XG4gKiBiZSBzdGF0aWNhbGx5IHJlc29sdmVkIHRvIHJlY29yZHMpLiAgQWN0aXZhdGlvbnMgZm9ybSBhIHNoYXJlZC9jYWNoZWQgdHJlZSwgYmFzZWRcbiAqIG9uIGNvbnRleHQgYXNzaWdubWVudCBwYXRocyBwcmV2aW91c2x5IHRyYXZlcnNlZCB2aWEgYXNzaWdubWVudHMgdG8gc29tZSBDb250ZXh0LlxuICogU3Vic2VxdWVudCB0cmF2ZXJzYWxzIG9mIHRoZXNlIHBhdGhzIChsaWtlbHkgYnkgZGlmZmVyZW50IENvbnRleHQgaW5zdGFuY2VzKVxuICogYXJlIGdyZWF0bHkgb3B0aW1pemVkOiBhbiBleGlzdGluZyBBY3RpdmF0aW9uIGlzIHJldHJpZXZlZCBhbmQgaXRzIHJlY29yZHMgYXBwZW5kZWRcbiAqIHRvIHRoZSBjb250ZXh0J3MgX2VudHJpZXMgc3RhY2s7IGFsbCBvZiB0aGUgdHJhZGl0aW9uYWwgY29tcHV0YXRpb24gb2YgcnVsZSBtYXRjaCBsb29rdXBzLFxuICogY2hhaW5lZCBhc3NpZ25tZW50cyBhbmQgb3ZlcnJpZGUgaW5kZXhlcyBpcyBieXBhc3NlZC5cbiAqIEFjdGl2YXRpb24gZ2l2ZXMgc3BlY2lhbCB0cmVhdG1lbnQgdG8gdGhlICdwcm9wZXJ0eUFjdGl2YXRpb24nLCBpLmUuIHRoZSBhY3RpdmF0aW9uXG4gKiByZXN1bHRpbmcgZnJvbSB0aGUgYXBwbGljYXRpb24gb2YgdGhlICdzY29wZUtleScgdG8gdGhlIGN1cnJlbnQgY29udGV4dC4gIFByb3BlcnR5IGxvb2t1cFxuICogZm9sbG93aW5nIGFuZCBjb250ZXh0IGFzc2lnbm1lbnQgcmVxdWlyZSBhcHBsaWNhdGlvbiBvZiB0aGUgc2NvcGVLZXksIGJ1dCB0aGVuIHRoZSBzY29wZSBrZXlcbiAqIG11c3QgaW1tZWRpYXRlbHkgYmUgcG9wcGVkIGZvciB0aGUgbmV4dCBjb250ZXh0IGFzc2lnbm1lbnQuICBUbyBhdm9pZCB0aGlzIGNvbnN0YW50IHB1c2gvcG9wXG4gKiBvbiB0aGUgYm90dG9tIG9mIHRoZSBzdGFjaywgX0FjdGl2YXRpb25zIGNhY2hlIGEgc2lkZSBhY3RpdmF0aW9uICh0aGUgcHJvcGVydHlBY3RpdmF0aW9uKVxuICogZm9yIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlIHNjb3BlS2V5IHRvIHRoZSBjdXJyZW50IGFjdGl2YXRpb24uICBUaGlzIHN0YWNrIChhbmQgaXRzXG4gKiBwcm9wZXJ0aWVzKSBhcmUgY2FjaGVkIG9uIHRoZSBzaWRlLCBhbmQgY2FuIGJlIGFjY2Vzc2VkIHdpdGhvdXQgYWN0dWFsbHkgbW9kaWZ5aW5nIHRoZSBtYWluXG4gKiBjb250ZXh0IHN0YWNrLlxuICovXG5cbmV4cG9ydCBjbGFzcyBBY3RpdmF0aW9uIHtcblxuICAgIF9yZWNzOiBBcnJheTxTdGF0aWNSZWM+ID0gbmV3IEFycmF5PFN0YXRpY1JlYz4oKTtcbiAgICBfb3JpZ0VudHJ5Q291bnQ6IG51bWJlciA9IDA7XG4gICAgX3ZhbHVlTm9kZU1hcEJ5Q29udGV4dEtleTogTWFwPHN0cmluZywgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4+O1xuICAgIF92YWx1ZU5vZGVNYXBCeUNvbnRleHRLZXlDaGFpbmluZzogTWFwPHN0cmluZywgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4+O1xuXG4gICAgX3Byb3BlcnR5QWN0aXZhdGlvbjogQWN0aXZhdGlvbjtcbiAgICBfbmVzdGVkVmFsdWVzOiBOZXN0ZWRNYXA8c3RyaW5nLCBhbnk+O1xuICAgIGRlZmVycmVkQXNzaWdubWVudHM6IEFycmF5PERlZmVycmVkQXNzaWdubWVudD47XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBfcGFyZW50PzogQWN0aXZhdGlvbikge1xuXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRBY3RpdmF0aW9uKGNvbnRleHRLZXk6IHN0cmluZywgdmFsdWU6IGFueSwgY2hhaW5pbmc6IGJvb2xlYW4pOiBBY3RpdmF0aW9uIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IE1ldGEuTnVsbE1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBieUtleTogTWFwPHN0cmluZywgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4+ID0gKGNoYWluaW5nKVxuICAgICAgICAgICAgPyB0aGlzLl92YWx1ZU5vZGVNYXBCeUNvbnRleHRLZXlDaGFpbmluZyA6XG4gICAgICAgICAgICB0aGlzLl92YWx1ZU5vZGVNYXBCeUNvbnRleHRLZXk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoYnlLZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnlWYWw6IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+ID0gYnlLZXkuZ2V0KGNvbnRleHRLZXkpO1xuICAgICAgICByZXR1cm4gKGlzQmxhbmsoYnlWYWwpKSA/IG51bGwgOiBieVZhbC5nZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgY2FjaGVDaGlsZEFjdGl2YXRpb24oY29udGV4dEtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBhY3RpdmF0aW9uOiBBY3RpdmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluaW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBNZXRhLk51bGxNYXJrZXI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnlLZXk6IE1hcDxzdHJpbmcsIENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+PjtcbiAgICAgICAgaWYgKGNoYWluaW5nKSB7XG4gICAgICAgICAgICBpZiAoaXNCbGFuaygoYnlLZXkgPSB0aGlzLl92YWx1ZU5vZGVNYXBCeUNvbnRleHRLZXlDaGFpbmluZykpKSB7XG4gICAgICAgICAgICAgICAgYnlLZXkgPSB0aGlzLl92YWx1ZU5vZGVNYXBCeUNvbnRleHRLZXlDaGFpbmluZ1xuICAgICAgICAgICAgICAgICAgICA9IG5ldyBNYXA8c3RyaW5nLCBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55Pj4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKChieUtleSA9IHRoaXMuX3ZhbHVlTm9kZU1hcEJ5Q29udGV4dEtleSkpKSB7XG4gICAgICAgICAgICAgICAgYnlLZXkgPSB0aGlzLl92YWx1ZU5vZGVNYXBCeUNvbnRleHRLZXlcbiAgICAgICAgICAgICAgICAgICAgPSBuZXcgTWFwPHN0cmluZywgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4+KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBieVZhbDogQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4gPSBieUtleS5nZXQoY29udGV4dEtleSk7XG4gICAgICAgIGlmIChpc0JsYW5rKGJ5VmFsKSkge1xuICAgICAgICAgICAgYnlWYWwgPSBuZXcgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4oKTtcbiAgICAgICAgICAgIGJ5S2V5LnNldChjb250ZXh0S2V5LCBieVZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgYnlWYWwuc2V0VmFsdWUodmFsdWUsIGFjdGl2YXRpb24pO1xuICAgIH1cblxuICAgIGFkZERlZmVycmVkQXNzaWdubWVudChrZXk6IHN0cmluZywgdmFsdWU6IER5bmFtaWNQcm9wZXJ0eVZhbHVlKTogdm9pZCB7XG4gICAgICAgIGxldCBuZXdEYTogRGVmZXJyZWRBc3NpZ25tZW50O1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuZGVmZXJyZWRBc3NpZ25tZW50cykpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmZXJyZWRBc3NpZ25tZW50cyA9IG5ldyBBcnJheTxEZWZlcnJlZEFzc2lnbm1lbnQ+KCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGRhIG9mIHRoaXMuZGVmZXJyZWRBc3NpZ25tZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChkYS5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYSA9IGRhO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmxhbmsobmV3RGEpKSB7XG4gICAgICAgICAgICBuZXdEYSA9IG5ldyBEZWZlcnJlZEFzc2lnbm1lbnQoKTtcbiAgICAgICAgICAgIG5ld0RhLmtleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXMuZGVmZXJyZWRBc3NpZ25tZW50cy5wdXNoKG5ld0RhKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdEYS52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGhhc0RlZmVycmVkQXNzaWdubWVudEZvcktleShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGVmZXJyZWRBc3NpZ25tZW50cykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGRhIG9mIHRoaXMuZGVmZXJyZWRBc3NpZ25tZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChkYS5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByb3BlcnR5QWN0aXZhdGlvbihjb250ZXh0OiBDb250ZXh0KTogQWN0aXZhdGlvbiB7XG4gICAgICAgIGFzc2VydChjb250ZXh0LmN1cnJlbnRBY3RpdmF0aW9uID09PSB0aGlzLFxuICAgICAgICAgICAgJ1Byb3BlcnR5QWN0aXZhdGlvbiBzb3VnaHQgb24gbm9uIHRvcCBvZiBzdGFjayBhY3RpdmF0aW9uJyk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fcHJvcGVydHlBY3RpdmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvcGVydHlBY3RpdmF0aW9uID0gY29udGV4dC5fY3JlYXRlTmV3UHJvcGVydHlDb250ZXh0QWN0aXZhdGlvbih0aGlzKTtcblxuICAgICAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fcHJvcGVydHlBY3RpdmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb3BlcnR5QWN0aXZhdGlvbiA9IHRoaXM7XG4gICAgICAgICAgICB9IC8vIHRoaXMgYXMgbnVsbCBtYXJrZXJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydHlBY3RpdmF0aW9uICE9PSB0aGlzID8gdGhpcy5fcHJvcGVydHlBY3RpdmF0aW9uIDogbnVsbDtcbiAgICB9XG5cblxuICAgIGZpbmRFeGlzdGluZ1Byb3BlcnR5QWN0aXZhdGlvbigpOiBBY3RpdmF0aW9uIHtcbiAgICAgICAgbGV0IGFjdGl2YXRpb246IEFjdGl2YXRpb24gPSB0aGlzO1xuICAgICAgICB3aGlsZSAoaXNQcmVzZW50KGFjdGl2YXRpb24pKSB7XG5cbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eUFjdGl2YXRpb246IEFjdGl2YXRpb24gPSBhY3RpdmF0aW9uLl9wcm9wZXJ0eUFjdGl2YXRpb247XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQocHJvcGVydHlBY3RpdmF0aW9uKSAmJiBwcm9wZXJ0eUFjdGl2YXRpb24gIT09IGFjdGl2YXRpb25cbiAgICAgICAgICAgICAgICAmJiAhKGlzQmxhbmsocHJvcGVydHlBY3RpdmF0aW9uLl9yZWNzKSB8fCBMaXN0V3JhcHBlci5pc0VtcHR5KFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUFjdGl2YXRpb24uX3JlY3MpKSkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5QWN0aXZhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGl2YXRpb24gPSBhY3RpdmF0aW9uLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICAvLyB0b2RvOiBiZXR0ZXIgYmV0dGVyIHRvIHN0cmluZyBmb3IgaGFzaGluZ1xuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBDb2xsZWN0aW9ucy51dGlsLm1ha2VTdHJpbmcodGhpcyk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBEZWZlcnJlZEFzc2lnbm1lbnQge1xuICAgIGtleTogc3RyaW5nO1xuICAgIHZhbHVlOiBEeW5hbWljUHJvcGVydHlWYWx1ZTtcbn1cblxuXG5leHBvcnQgY2xhc3MgQXNzaWdubWVudFNuYXBzaG90IHtcbiAgICBrZXk6IHN0cmluZztcbiAgICB2YWx1ZTogYW55O1xuICAgIHNhbGllbmNlOiBudW1iZXI7XG5cbn1cblxuZXhwb3J0IGNsYXNzIEFzc2lnbm1lbnQge1xuICAgIHNyZWM6IFN0YXRpY1JlYztcbiAgICB2YWw6IE9iamVjdDtcblxuICAgIG1hc2tlZEJ5SWR4OiBudW1iZXIgPSAwO1xuICAgIF9kaWRJbml0UHJvcENvbnRleHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBfcHJvcGVydHlMb2NhbFNyZWM6IFN0YXRpY1JlYztcbiAgICBfcHJvcGVydHlMb2NhbFZhbHVlczogTWFwPHN0cmluZywgYW55PjtcblxuXG4gICAgcHJvcGVydHlMb2NhbE1hdGNoZXMoY29udGV4dDogQ29udGV4dCk6IE1hdGNoUmVzdWx0IHtcbiAgICAgICAgaWYgKCF0aGlzLl9kaWRJbml0UHJvcENvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFByb3BDb250ZXh0KGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5fcHJvcGVydHlMb2NhbFNyZWMpID8gdGhpcy5fcHJvcGVydHlMb2NhbFNyZWMubWF0Y2ggOiBudWxsO1xuICAgIH1cblxuICAgIHByb3BlcnR5TG9jYWxTdGF0aWNSZWMoY29udGV4dDogQ29udGV4dCk6IFN0YXRpY1JlYyB7XG4gICAgICAgIGlmICghdGhpcy5fZGlkSW5pdFByb3BDb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQcm9wQ29udGV4dChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydHlMb2NhbFNyZWM7XG4gICAgfVxuXG4gICAgcHJvcGVydHlMb2NhbFZhbHVlcyhjb250ZXh0OiBDb250ZXh0KTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGlmICghdGhpcy5fZGlkSW5pdFByb3BDb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQcm9wQ29udGV4dChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydHlMb2NhbFZhbHVlcztcbiAgICB9XG5cblxuICAgIGluaXRQcm9wQ29udGV4dChjb250ZXh0OiBDb250ZXh0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RpZEluaXRQcm9wQ29udGV4dCA9IHRydWU7XG4gICAgICAgIGFzc2VydCghQ29udGV4dC5fRXhwZW5zaXZlQ29udGV4dENvbnNpc3RlbmN5Q2hlY2tzRW5hYmxlZCB8fCBMaXN0V3JhcHBlci5sYXN0KFxuICAgICAgICAgICAgY29udGV4dC5fZW50cmllcykgPT09IHRoaXMsXG4gICAgICAgICAgICAnaW5pdGluZyBwcm9wIGNvbnRleHQgb24gcmVjb3JkIG5vdCBvbiB0b3Agb2Ygc3RhY2snKTtcblxuICAgICAgICAvLyBUb2RvOiBiYXNlIGl0IG9uIHdoZXRoZXIgd2UndmUgdHJpZXMgeWV0IHRvIHByb2Nlc3MgdGhlbS5cblxuICAgICAgICBsZXQgcHJvcEFjdGl2YXRpb246IEFjdGl2YXRpb24gPSAodGhpcy5zcmVjLmFjdGl2YXRpb24ucHJvcGVydHlBY3RpdmF0aW9uKGNvbnRleHQpKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChwcm9wQWN0aXZhdGlvbikpIHtcbiAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5UHJvcGVydHlBY3RpdmF0aW9uKHByb3BBY3RpdmF0aW9uLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3JlYyA9IG51bGw7XG4gICAgICAgIHRoaXMudmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXNrZWRCeUlkeCA9IDA7XG4gICAgICAgIHRoaXMuX2RpZEluaXRQcm9wQ29udGV4dCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0eUxvY2FsU3JlYyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Byb3BlcnR5TG9jYWxWYWx1ZXMgPSBudWxsO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFRoZSAnc3RhdGljJyAoc2hhcmFibGUpIHBhcnQgb2YgYSBjb250ZXh0IHZhbHVlIGFzc2lnbm1lbnQgcmVjb3JkLlxuICogVGhlc2VzIGFyZSBjcmVhdGVkIGJ5IHRoZSBmaXJzdCBfQXNzaWdubWVudCB0aGF0IG5lZWRzIHRoZW1cbiAqIGFuZCB0aGVuIGNhY2hlZCBmb3IgcmUtYXBwbGljYXRpb24gaW4gdGhlaXIgX0FjdGl2YXRpb25cbiAqICAod2hpY2gsIGluIHR1cm4sIGlzIHN0b3JlZCBpbiB0aGUgZ2xvYmFsIGFjdGl2YXRpb24gdHJlZSlcbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRpY1JlYyB7XG4gICAgYWN0aXZhdGlvbjogQWN0aXZhdGlvbjtcbiAgICBwcml2YXRlIF9rZXk6IHN0cmluZztcbiAgICBwcml2YXRlIF92YWw6IGFueTtcbiAgICBtYXRjaDogTWF0Y2hSZXN1bHQ7XG4gICAgc2FsaWVuY2U6IG51bWJlciA9IDA7XG4gICAgZnJvbUNoYWluaW5nOiBib29sZWFuO1xuICAgIGxhc3RBc3NpZ25tZW50SWR4OiBudW1iZXIgPSAwO1xuXG4gICAgcHJvcGVydGllcygpOiBQcm9wZXJ0eU1hcCB7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KHRoaXMubWF0Y2gpKSA/IHRoaXMubWF0Y2gucHJvcGVydGllcygpIDogQ29udGV4dC5FbXB0eU1hcDtcbiAgICB9XG5cbiAgICBnZXQga2V5KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXk7XG4gICAgfVxuXG4gICAgc2V0IGtleSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2tleSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB2YWwoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbDtcbiAgICB9XG5cbiAgICBzZXQgdmFsKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fdmFsID0gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHlBY2Nlc3NvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICB9XG5cbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnByb3BlcnR5Rm9yS2V5KGtleSk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE1hcFdyYXBwZXIudG9TdHJpbmcodGhpcy5jb250ZXh0LmFsbFByb3BlcnRpZXMoKSk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogU25hcHNob3QgaXMgdGhlIHdheSBob3cgdG8gY2FwdHVyZSBhIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGNvbnRleHQgYW5kIHRoZW4gcmVwbGF5IGl0IGJhY2sgc28uXG4gKiBmb3IgY2FzZXMgd2hlbiB3ZSBuZWVkIHRvIHJ1biBzb21lIHJ1bGUgZXhlY3V0aW9uIG91dHNpZGUgb2YgdGhlIHB1c2gvcG9wIGN5Y2xlXG4gKi9cbmV4cG9ydCBjbGFzcyBTbmFwc2hvdCB7XG5cbiAgICBfbWV0YTogTWV0YTtcbiAgICBfb3JpZ0NsYXNzOiBzdHJpbmc7XG4gICAgX2Fzc2lnbm1lbnRzOiBBcnJheTxBc3NpZ25tZW50U25hcHNob3Q+O1xuICAgIF9hbGxBc3NpZ25tZW50czogQXJyYXk8QXNzaWdubWVudFNuYXBzaG90PjtcbiAgICBfaXNOZXN0ZWQ6IGJvb2xlYW47XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbnRleHQ6IENvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fbWV0YSA9IF9jb250ZXh0Lm1ldGE7XG4gICAgICAgIHRoaXMuX29yaWdDbGFzcyA9IF9jb250ZXh0LmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHRoaXMuX2Fzc2lnbm1lbnRzID0gX2NvbnRleHQuYWN0aXZlQXNzaWdubWVudHMoKTtcbiAgICAgICAgdGhpcy5fYWxsQXNzaWdubWVudHMgPSBfY29udGV4dC5hbGxBc3NpZ25tZW50cygpO1xuICAgICAgICB0aGlzLl9pc05lc3RlZCA9IF9jb250ZXh0LmlzTmVzdGVkO1xuXG4gICAgfVxuXG5cbiAgICBoeWRyYXRlKHNoZWxsQ29weTogYm9vbGVhbiA9IHRydWUpOiBDb250ZXh0IHtcbiAgICAgICAgbGV0IGFzc2lnbm1lbnRzID0gKHNoZWxsQ29weSkgPyB0aGlzLl9hc3NpZ25tZW50cyA6IHRoaXMuX2FsbEFzc2lnbm1lbnRzO1xuICAgICAgICBsZXQgbmV3Q29udGV4dDogQ29udGV4dCA9IHRoaXMuX21ldGEubmV3Q29udGV4dCgpO1xuICAgICAgICBuZXdDb250ZXh0LnB1c2goKTtcbiAgICAgICAgbGV0IGxhc3RDbnhHZW5lcmF0aW9uID0gMTtcbiAgICAgICAgZm9yIChsZXQgYSBvZiAgYXNzaWdubWVudHMpIHtcbiAgICAgICAgICAgIGlmIChsYXN0Q254R2VuZXJhdGlvbiA8IGEuc2FsaWVuY2UpIHtcbiAgICAgICAgICAgICAgICBuZXdDb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0NvbnRleHQuc2V0KGEua2V5LCBhLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdDb250ZXh0LmlzTmVzdGVkID0gdGhpcy5faXNOZXN0ZWQ7XG4gICAgICAgIHJldHVybiBuZXdDb250ZXh0O1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBjbGFzcyBPYmplY3RNZXRhQ29udGV4dCBleHRlbmRzIENvbnRleHQge1xuICAgIHN0YXRpYyByZWFkb25seSBEZWZhdWx0TG9jYWxlID0gJ2VuJztcblxuICAgIHByaXZhdGUgX2Zvcm1hdHRlcnM6IE1hcDxzdHJpbmcsIGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihfbWV0YTogT2JqZWN0TWV0YSwgbmVzdGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgc3VwZXIoX21ldGEsIG5lc3RlZCk7XG5cbiAgICB9XG5cblxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICBsZXQgb2JqID0gdGhpcy5vYmplY3Q7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZpZWxkUGF0aCA9IHRoaXMuZmllbGRQYXRoKCk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQoZmllbGRQYXRoKSA/IGZpZWxkUGF0aC5nZXRGaWVsZFZhbHVlKG9iaikgOiB0aGlzLnByb3BlcnR5Rm9yS2V5KCd2YWx1ZScpO1xuICAgIH1cblxuXG4gICAgc2V0IHZhbHVlKHZhbDogYW55KSB7XG4gICAgICAgIGxldCBmaWVsZFBhdGggPSB0aGlzLmZpZWxkUGF0aCgpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGZpZWxkUGF0aCkpIHtcbiAgICAgICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5vYmplY3QpLCAnQ2FsbCB0byBzZXRWYWx1ZSgpIHdpdGggbm8gY3VycmVudCBvYmplY3QnKTtcbiAgICAgICAgICAgIGZpZWxkUGF0aC5zZXRGaWVsZFZhbHVlKHRoaXMub2JqZWN0LCB2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5hbGxQcm9wZXJ0aWVzKCkuZ2V0KE9iamVjdE1ldGEuS2V5VmFsdWUpO1xuICAgICAgICAgICAgYXNzZXJ0KGlzRHluYW1pY1NldHRhYmxlKHZhbHVlKSwgJ0NhbnQgc2V0IGRlcml2ZWQgcHJvcGVydHk6ICcgKyB2YWx1ZSk7XG5cbiAgICAgICAgICAgIGxldCBzZXR0YWJsZTogRHluYW1pY1NldHRhYmxlUHJvcGVydHlWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAoKDxEeW5hbWljU2V0dGFibGVQcm9wZXJ0eVZhbHVlPnZhbHVlKSkuZXZhbHVhdGVTZXQodGhpcywgdmFsKTtcbiAgICAgICAgICAgIHNldHRhYmxlLmV2YWx1YXRlU2V0KHRoaXMsIHZhbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldCBvYmplY3QoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmdldChPYmplY3RNZXRhLktleU9iamVjdCk7XG4gICAgfVxuXG4gICAgZ2V0IGZvcm1hdHRlcnMoKTogTWFwPHN0cmluZywgYW55PiB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX2Zvcm1hdHRlcnMpKSB7XG4gICAgICAgICAgICB0aGlzLl9mb3JtYXR0ZXJzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0dGVycztcbiAgICB9XG5cbiAgICBmaWVsZFBhdGgoKTogRmllbGRQYXRoIHtcbiAgICAgICAgbGV0IHByb3BNYXA6IE9iamVjdE1ldGFQcm9wZXJ0eU1hcCA9IDxPYmplY3RNZXRhUHJvcGVydHlNYXA+IHRoaXMuYWxsUHJvcGVydGllcygpO1xuICAgICAgICByZXR1cm4gcHJvcE1hcC5maWVsZFBhdGg7XG4gICAgfVxuXG5cbiAgICBsb2NhbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdE1ldGFDb250ZXh0LkRlZmF1bHRMb2NhbGU7XG4gICAgfVxuXG4gICAgdGltZXpvbmUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgVUlDb250ZXh0IGV4dGVuZHMgT2JqZWN0TWV0YUNvbnRleHQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcihfbWV0YTogVUlNZXRhLCBuZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihfbWV0YSwgbmVzdGVkKTtcbiAgICB9XG5cblxuICAgIC8vIHVzZXIgdmFsdWVzIGZyb20gdXNlciBzZXR0aW5ncy9sb2NhbGVzXG4gICAgbG9jYWxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzdXBlci5sb2NhbGUoKTtcbiAgICB9XG5cbiAgICB0aW1lem9uZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc3VwZXIudGltZXpvbmUoKTtcbiAgICB9XG59XG5cblxuXG5cbiJdfQ==