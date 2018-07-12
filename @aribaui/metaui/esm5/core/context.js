/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var Context = /** @class */ (function (_super) {
    tslib_1.__extends(Context, _super);
    function Context(_meta, nested) {
        if (nested === void 0) { nested = false; }
        var _this = _super.call(this) || this;
        _this._meta = _meta;
        _this.nested = nested;
        _this._values = new Map();
        _this._entries = [];
        _this._frameStarts = [];
        _this._recPool = [];
        if (isBlank(Context.EmptyMap)) {
            Context.EmptyMap = new PropertyMap();
        }
        Context._Debug_SetsCount = 0;
        _this._accessor = new PropertyAccessor(_this);
        _this._currentActivation = Context.getActivationTree(_meta);
        _this._rootNode = _this._currentActivation;
        _this.isNested = nested;
        return _this;
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
     */
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
    Context.getActivationTree = /**
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
    function (meta) {
        // todo: check the syntax Actionvation contructor name.
        var /** @type {?} */ name = objectToName(Activation);
        var /** @type {?} */ root = meta.identityCache.getValue(name);
        if (isBlank(root)) {
            root = new Activation();
            meta.identityCache.setValue(name, root);
        }
        return root;
    };
    /**
     * @return {?}
     */
    Context.prototype.push = /**
     * @return {?}
     */
    function () {
        this._frameStarts.push(this._entries.length);
    };
    Object.defineProperty(Context.prototype, "meta", {
        get: /**
         * @return {?}
         */
        function () {
            return this._meta;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Context.prototype.pop = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ size = this._frameStarts.length;
        assert(size > 0, 'Popping empty stack');
        var /** @type {?} */ pos = this._frameStarts.pop();
        var /** @type {?} */ entriesSize;
        while ((entriesSize = this._entries.length) > pos) {
            var /** @type {?} */ recIdx = entriesSize - 1;
            var /** @type {?} */ rec = this._entries.splice(recIdx, 1)[0];
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
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Context.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        var _this = this;
        this._set(key, value, false, false);
        // implement default toString for our object so we can retrieve objectTitle
        if (key === ObjectMeta.KeyObject) {
            var /** @type {?} */ toCheck = this._values.get(ObjectMeta.KeyObject);
            if (isBlank(toCheck['$toString'])) {
                toCheck['$toString'] = function () {
                    var /** @type {?} */ clazz = _this.values.get(ObjectMeta.KeyClass);
                    return UIMeta.beautifyClassName(clazz);
                };
            }
        }
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Context.prototype.merge = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this._set(key, value, true, false);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Context.prototype.setScopeKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        assert(this._meta.keyData(key).isPropertyScope, key + ' is not a valid context key');
        var /** @type {?} */ current = this._currentPropertyScopeKey();
        // Assert.that(current != null, 'Can't set %s as context key when no context key on stack',
        // key); TODO: if current key isChaining then we need to set again to get a non-chaining
        // assignment
        if (!(key === current)) {
            var /** @type {?} */ val = this.values.get(key);
            // Assert.that(val != null, 'Can't set %s as context key when it has no value already
            // on the context', key);
            if (isBlank(val)) {
                val = Meta.KeyAny;
            }
            this.set(key, val);
        }
    };
    Object.defineProperty(Context.prototype, "values", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ propVals;
            return (ListWrapper.isEmpty(this._entries) ||
                isBlank(propVals = (ListWrapper.last(this._entries)).propertyLocalValues(this))) ? this._values : propVals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "properties", {
        get: /**
         * @return {?}
         */
        function () {
            return this._accessor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @return {?}
     */
    Context.prototype.propertyForKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ val = this.allProperties().get(key);
        return this.resolveValue(val);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Context.prototype.listPropertyForKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var /** @type {?} */ val = this.propertyForKey(key);
        return (isBlank(val)) ? [] : (isArray(val)) ? val : [val];
    };
    /**
     * @param {?} key
     * @param {?} defaultVal
     * @return {?}
     */
    Context.prototype.booleanPropertyForKey = /**
     * @param {?} key
     * @param {?} defaultVal
     * @return {?}
     */
    function (key, defaultVal) {
        var /** @type {?} */ val = this.propertyForKey(key);
        return (isBlank(val)) ? defaultVal : BooleanWrapper.boleanValue(val);
    };
    /**
     * @return {?}
     */
    Context.prototype.allProperties = /**
     * @return {?}
     */
    function () {
        if (isBlank(this._currentProperties)) {
            var /** @type {?} */ m = this.lastMatch();
            if (isPresent(m)) {
                this._currentProperties = m.properties();
            }
        }
        return isPresent(this._currentProperties) ? this._currentProperties : Context.EmptyMap;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Context.prototype.resolveValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ lastValue;
        while (value !== lastValue && isPresent(value) && value instanceof DynamicPropertyValue) {
            lastValue = value;
            var /** @type {?} */ propValue = value;
            if (propValue instanceof Expr) {
                propValue.addTypeToContext('UIMeta', UIMeta);
            }
            value = propValue.evaluate(this);
        }
        return value;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Context.prototype.staticallyResolveValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ lastValue = null;
        while (value !== lastValue && isPresent(value) && value instanceof StaticallyResolvable) {
            lastValue = value;
            value = value.evaluate(this);
        }
        return value;
    };
    /**
     * @param {?} contextVals
     * @param {?} propertyKey
     * @param {?} staticResolve
     * @return {?}
     */
    Context.prototype.pushAndResolveStatic = /**
     * @param {?} contextVals
     * @param {?} propertyKey
     * @param {?} staticResolve
     * @return {?}
     */
    function (contextVals, propertyKey, staticResolve) {
        var _this = this;
        var /** @type {?} */ scopeKey;
        this.push();
        MapWrapper.iterable(contextVals).forEach(function (value, key) {
            if ('*' === value) {
                scopeKey = key;
            }
            else {
                _this.set(key, value);
            }
        });
        if (isPresent(scopeKey)) {
            this.setScopeKey(scopeKey);
        }
        var /** @type {?} */ val = this.allProperties().get(propertyKey);
        val = staticResolve ? this.staticallyResolveValue(val) : this.resolveValue(val);
        this.pop();
        return val;
    };
    /**
     * @param {?} contextVals
     * @param {?} propertyKey
     * @return {?}
     */
    Context.prototype.pushAndResolve = /**
     * @param {?} contextVals
     * @param {?} propertyKey
     * @return {?}
     */
    function (contextVals, propertyKey) {
        return this.pushAndResolveStatic(contextVals, propertyKey, false);
    };
    // a (usable) snapshot of the current state of the context
    /**
     * @return {?}
     */
    Context.prototype.snapshot = /**
     * @return {?}
     */
    function () {
        return new Snapshot(this);
    };
    /**
     * Represent current active assignment list meaning it will not include any entries which
     * were overwritten by some late entry having the same key.
     *
     * It does not include entries that were pushed to stack from any Property -> Selector
     * propagation. This creates shell copy and ignoring all last Matches which could be from
     * some previous assignments that are now replaced with some new ones
     *
     */
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
    Context.prototype.activeAssignments = /**
     * Represent current active assignment list meaning it will not include any entries which
     * were overwritten by some late entry having the same key.
     *
     * It does not include entries that were pushed to stack from any Property -> Selector
     * propagation. This creates shell copy and ignoring all last Matches which could be from
     * some previous assignments that are now replaced with some new ones
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ list = new Array();
        for (var /** @type {?} */ i = 0, /** @type {?} */ c = this._entries.length; i < c; i++) {
            var /** @type {?} */ rec = this._entries[i];
            if (rec.maskedByIdx === 0 && !rec.srec.fromChaining) {
                var /** @type {?} */ a = new AssignmentSnapshot();
                a.key = rec.srec.key;
                a.value = rec.val;
                a.salience = rec.srec.salience;
                list.push(a);
            }
        }
        return list;
    };
    /**
     *
     * Similar as <code>activeAssignments</code> but do include also those that were replaced later
     * on with assignments having the same key.
     *
     * This is needed for cases where we need to have deep copy of current state along with
     * all properties.
     *
     */
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
    Context.prototype.allAssignments = /**
     *
     * Similar as <code>activeAssignments</code> but do include also those that were replaced later
     * on with assignments having the same key.
     *
     * This is needed for cases where we need to have deep copy of current state along with
     * all properties.
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ list = new Array();
        for (var /** @type {?} */ i = 0, /** @type {?} */ c = this._entries.length; i < c; i++) {
            var /** @type {?} */ rec = this._entries[i];
            if (!rec.srec.fromChaining) {
                var /** @type {?} */ a = new AssignmentSnapshot();
                a.key = rec.srec.key;
                a.value = rec.val;
                a.salience = rec.srec.salience;
                list.push(a);
            }
        }
        return list;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} merge
     * @param {?} chaining
     * @return {?}
     */
    Context.prototype._set = /**
     * @param {?} key
     * @param {?} value
     * @param {?} merge
     * @param {?} chaining
     * @return {?}
     */
    function (key, value, merge, chaining) {
        var /** @type {?} */ sval = this._meta.transformValue(key, value);
        var /** @type {?} */ didSet = false;
        var /** @type {?} */ registry = (/** @type {?} */ (this.meta)).componentRegistry;
        if (key === ObjectMeta.KeyObject && isPresent(registry)) {
            registry.registerType(className(value), value.constructor);
        }
        var /** @type {?} */ activation = this._currentActivation.getChildActivation(key, sval, chaining);
        if (isBlank(activation)) {
            didSet = this._createNewFrameForSet(key, sval, value, merge, chaining);
        }
        if (isPresent(activation)) {
            didSet = this._applyActivation(activation, value);
        }
        if (didSet) {
            this.awakeCurrentActivation();
        }
    };
    /**
     * @return {?}
     */
    Context.prototype.newContextRec = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ count = this._recPool.length;
        return (count > 0) ? this._recPool.splice(count - 1, 1)[0] : new Assignment();
    };
    /**
     * Cached case: apply a previously computed Activation
     */
    /**
     * Cached case: apply a previously computed Activation
     * @param {?} activation
     * @param {?} firstVal
     * @return {?}
     */
    Context.prototype._applyActivation = /**
     * Cached case: apply a previously computed Activation
     * @param {?} activation
     * @param {?} firstVal
     * @return {?}
     */
    function (activation, firstVal) {
        assert(activation._parent === this._currentActivation, 'Attempt to apply activation on mismatched parent');
        if (this._entries.length !== activation._origEntryCount) {
            assert(false, 'Mismatched context stack size (%s) from when activation was popped ' +
                this._entries.length + ' ' + activation._origEntryCount);
        }
        var /** @type {?} */ count = activation._recs.length;
        if (count === 0) {
            return false;
        }
        for (var /** @type {?} */ i = 0; i < count; i++) {
            var /** @type {?} */ srec = activation._recs[i];
            var /** @type {?} */ rec = this.newContextRec();
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
    };
    /**
     * @return {?}
     */
    Context.prototype.awakeCurrentActivation = /**
     * @return {?}
     */
    function () {
        // See if this activation requires further chaining
        var /** @type {?} */ currentActivation = this._currentActivation;
        var /** @type {?} */ deferredAssignments = currentActivation.deferredAssignments;
        if (isPresent(deferredAssignments)) {
            this.applyDeferredAssignments(deferredAssignments);
        }
    };
    /**
     * @param {?} deferredAssignments
     * @return {?}
     */
    Context.prototype.applyDeferredAssignments = /**
     * @param {?} deferredAssignments
     * @return {?}
     */
    function (deferredAssignments) {
        try {
            for (var deferredAssignments_1 = tslib_1.__values(deferredAssignments), deferredAssignments_1_1 = deferredAssignments_1.next(); !deferredAssignments_1_1.done; deferredAssignments_1_1 = deferredAssignments_1.next()) {
                var da = deferredAssignments_1_1.value;
                // verify that deferred value still applies
                var /** @type {?} */ currentPropValue = this.staticallyResolveValue(this.allProperties().get(da.key));
                if (da.value === currentPropValue) {
                    var /** @type {?} */ resolvedValue = this.resolveValue(da.value);
                    this._set(da.key, resolvedValue, false, true);
                }
                else {
                    // print('_set SKIPPING deferred assignment of derived value: %s <- %s --' +
                    //     ' no longer matches property in context: %s' , da.key , da.value ,
                    // currentPropValue);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (deferredAssignments_1_1 && !deferredAssignments_1_1.done && (_a = deferredAssignments_1.return)) _a.call(deferredAssignments_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    /**
     * @return {?}
     */
    Context.prototype._inDeclare = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ match = this.lastMatchWithoutContextProps();
        return isPresent(match) && (match._keysMatchedMask & this._meta.declareKeyMask) !== 0;
    };
    /**
     Non-cached access: create a new activation
     */
    /**
     * Non-cached access: create a new activation
     * @param {?} key
     * @param {?} svalue
     * @param {?} value
     * @param {?} merge
     * @param {?} chaining
     * @return {?}
     */
    Context.prototype._createNewFrameForSet = /**
     * Non-cached access: create a new activation
     * @param {?} key
     * @param {?} svalue
     * @param {?} value
     * @param {?} merge
     * @param {?} chaining
     * @return {?}
     */
    function (key, svalue, value, merge, chaining) {
        var /** @type {?} */ lastActivation = this._currentActivation;
        var /** @type {?} */ newActivation = new Activation(lastActivation);
        newActivation._origEntryCount = this._entries.length;
        this._currentActivation = newActivation;
        // set this value
        var /** @type {?} */ didSet = this._set2(key, svalue, value, merge, chaining);
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
    };
    /**
     * Called lazily to compute the property activation for this activation
     * Compute the static part of the property activation
     * we accumulate the property settings on a side activation off the main stack
     * and apply it virtually if our parent is not covered
     *  (that way we don't have to apply and unapply all the time)
     */
    /**
     * Called lazily to compute the property activation for this activation
     * Compute the static part of the property activation
     * we accumulate the property settings on a side activation off the main stack
     * and apply it virtually if our parent is not covered
     *  (that way we don't have to apply and unapply all the time)
     * @param {?} parentActivation
     * @return {?}
     */
    Context.prototype._createNewPropertyContextActivation = /**
     * Called lazily to compute the property activation for this activation
     * Compute the static part of the property activation
     * we accumulate the property settings on a side activation off the main stack
     * and apply it virtually if our parent is not covered
     *  (that way we don't have to apply and unapply all the time)
     * @param {?} parentActivation
     * @return {?}
     */
    function (parentActivation) {
        this.push();
        var /** @type {?} */ propActivation = new Activation(parentActivation);
        propActivation._origEntryCount = this._entries.length;
        this._currentActivation = propActivation;
        var /** @type {?} */ origValues = this._values;
        var /** @type {?} */ nestedMap = new NestedMap(origValues);
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
    };
    /**
     * @param {?} propActivation
     * @param {?} rec
     * @return {?}
     */
    Context.prototype._applyPropertyActivation = /**
     * @param {?} propActivation
     * @param {?} rec
     * @return {?}
     */
    function (propActivation, rec) {
        var /** @type {?} */ propValues = this._values;
        if (isPresent(propActivation._nestedValues)) {
            propValues = propActivation._nestedValues.reparentedMap(propValues);
        }
        // set up propLocal results
        // Now, see if we need to compute a dynamic property activation as well
        if (isPresent(propActivation.deferredAssignments)) {
            this.push();
            // nest a dynamic nested map on our static nested map (which is on our last dynamic
            // nested map...)
            var /** @type {?} */ origValues = this._values;
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
    };
    // todo: any equals old va === new val
    /**
     * @param {?} oldVal
     * @param {?} newVal
     * @return {?}
     */
    Context.prototype._isNewValue = /**
     * @param {?} oldVal
     * @param {?} newVal
     * @return {?}
     */
    function (oldVal, newVal) {
        return (oldVal !== newVal && (isPresent(oldVal) ||
            (!oldVal === newVal && (!isArray(oldVal)) || !(ListWrapper.contains(oldVal, newVal)))));
    };
    /**
     * @return {?}
     */
    Context.prototype.isDeclare = /**
     * @return {?}
     */
    function () {
        return isPresent(this.propertyForKey(Meta.KeyDeclare));
    };
    /**
     * @return {?}
     */
    Context.prototype.assertContextConsistent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!Context._ExpensiveContextConsistencyChecksEnabled) {
            return;
        }
        // Verify that each value in context has matching (enabled) context record
        MapWrapper.iterable(this._values).forEach(function (value, key) {
            var /** @type {?} */ lastAssignmentIdx = _this.findLastAssignmentOfKey(key);
            assert(lastAssignmentIdx >= 0, 'Value in context but no assignment record found ' +
                key + ' = ' + value);
            var /** @type {?} */ contextVal = _this._entries[lastAssignmentIdx].val;
            assert(value === contextVal || (isPresent(value) && value === contextVal), 'Value in context  doesnt match value on stack ' + value + ' / ' + contextVal);
        });
        // check entries for proper relationship with any previous records that they override
        for (var /** @type {?} */ i = this._entries.length - 1; i >= 0; i--) {
            var /** @type {?} */ r = this._entries[i];
            var /** @type {?} */ foundFirst = false;
            for (var /** @type {?} */ j = i - 1; j >= 0; j--) {
                var /** @type {?} */ pred = this._entries[j];
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
    };
    /**
     * @param {?} key
     * @param {?} svalue
     * @param {?} value
     * @param {?} merge
     * @param {?} isChaining
     * @return {?}
     */
    Context.prototype._set2 = /**
     * @param {?} key
     * @param {?} svalue
     * @param {?} value
     * @param {?} merge
     * @param {?} isChaining
     * @return {?}
     */
    function (key, svalue, value, merge, isChaining) {
        Context._Debug_SetsCount++;
        // print('Setting key/vale onto stack: ' + key + '=' + value);
        var /** @type {?} */ hasOldValue = this._values.has(key) && isPresent(this._values.get(key));
        var /** @type {?} */ oldVal = hasOldValue ? this._values.get(key) : null;
        var /** @type {?} */ isNewValue = !hasOldValue || this._isNewValue(oldVal, value);
        var /** @type {?} */ matchingPropKeyAssignment = !isNewValue && !isChaining &&
            ((this._meta.keyData(key).isPropertyScope) &&
                key !== this._currentPropertyScopeKey());
        if (isNewValue || matchingPropKeyAssignment) {
            var /** @type {?} */ lastMatch = void 0;
            var /** @type {?} */ newMatch = void 0;
            var /** @type {?} */ salience = this._frameStarts.length;
            var /** @type {?} */ lastAssignmentIdx = -1;
            if (isBlank(oldVal)) {
                lastMatch = this.lastMatchWithoutContextProps();
            }
            else {
                // We recompute that match up to this point by recomputing forward
                // from the point of the last assignment to this key (skipping it), then
                // match against the array of our value and the old
                var /** @type {?} */ recIdx = this._entries.length;
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
                    var /** @type {?} */ oldRec = this._entries[lastAssignmentIdx];
                    if (oldRec.srec.salience === salience) {
                        var /** @type {?} */ prev = this.findLastAssignmentOfKeyWithValue(key, value);
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
                    var /** @type {?} */ firstAssignmentIdx = this._prepareForOverride(recIdx, lastAssignmentIdx);
                    newMatch = this._rematchForOverride(key, svalue, recIdx, firstAssignmentIdx);
                    if (merge) {
                        value = Meta.PropertyMerger_List.merge(oldVal, value, this.isDeclare());
                    }
                }
            }
            assert(this._entries.length <= Context.MaxContextStackSize, 'MetaUI context stack exceeded max size -- likely infinite chaining: ' +
                this._entries.length);
            var /** @type {?} */ srec = new StaticRec();
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
            var /** @type {?} */ rec = this.newContextRec();
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
    };
    Object.defineProperty(Context.prototype, "frameStarts", {
        get: /**
         * @return {?}
         */
        function () {
            return this._frameStarts;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} rec
     * @return {?}
     */
    Context.prototype._undoRecValue = /**
     * @param {?} rec
     * @return {?}
     */
    function (rec) {
        if (rec.srec.lastAssignmentIdx === -1 ||
            this._entries[rec.srec.lastAssignmentIdx].maskedByIdx > 0) {
            this._values.delete(rec.srec.key);
        }
        else {
            this._values.set(rec.srec.key, this._entries[rec.srec.lastAssignmentIdx].val);
        }
    };
    // Undoes and masks assignments invalidated by override of given record
    // Returns stack index for first assignment (i.e. where match recomputation must start)
    /**
     * @param {?} overrideIndex
     * @param {?} lastAssignmentIdx
     * @return {?}
     */
    Context.prototype._prepareForOverride = /**
     * @param {?} overrideIndex
     * @param {?} lastAssignmentIdx
     * @return {?}
     */
    function (overrideIndex, lastAssignmentIdx) {
        // if we're overriding a prop context override of a matching value, back up further
        var /** @type {?} */ lastLastIdx = 0;
        while (((lastLastIdx = this._entries[lastAssignmentIdx].srec.lastAssignmentIdx) !== -1) &&
            (this._entries[lastAssignmentIdx].maskedByIdx <= 0)) {
            // mark it! (we'll pick it up below...)
            this._entries[lastAssignmentIdx].maskedByIdx = -1;
            lastAssignmentIdx = lastLastIdx;
        }
        // undo all conflicting or dervied assignments (and mark them)
        for (var /** @type {?} */ i = this._entries.length - 1; i >= lastAssignmentIdx; i--) {
            var /** @type {?} */ r = this._entries[i];
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
    };
    /**
     * @param {?} key
     * @param {?} svalue
     * @param {?} overrideIndex
     * @param {?} firstAssignmentIdx
     * @return {?}
     */
    Context.prototype._rematchForOverride = /**
     * @param {?} key
     * @param {?} svalue
     * @param {?} overrideIndex
     * @param {?} firstAssignmentIdx
     * @return {?}
     */
    function (key, svalue, overrideIndex, firstAssignmentIdx) {
        // start from the top down looking for that last unmasked record
        var /** @type {?} */ lastMatch;
        var /** @type {?} */ i = 0;
        for (; i < firstAssignmentIdx; i++) {
            var /** @type {?} */ rec = this._entries[i];
            if (rec.maskedByIdx !== 0) {
                break;
            }
            lastMatch = rec.srec.match;
        }
        var /** @type {?} */ overridesMatch;
        // Rematch skipping over the last assignment of this property
        // and all assignments from chainging
        for (var /** @type {?} */ end = this._entries.length; i < end; i++) {
            var /** @type {?} */ r = this._entries[i];
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
    };
    /**
     * @param {?} rec
     * @param {?} recIdx
     * @return {?}
     */
    Context.prototype._undoOverride = /**
     * @param {?} rec
     * @param {?} recIdx
     * @return {?}
     */
    function (rec, recIdx) {
        var /** @type {?} */ lastAssignmentIdx = rec.srec.lastAssignmentIdx;
        var /** @type {?} */ lastLastIdx;
        // bastick up further if necessary
        while (((lastLastIdx = this._entries[lastAssignmentIdx].srec.lastAssignmentIdx) !== -1) &&
            (this._entries[lastLastIdx].maskedByIdx === recIdx)) {
            lastAssignmentIdx = lastLastIdx;
        }
        for (var /** @type {?} */ i = lastAssignmentIdx, /** @type {?} */ c = this._entries.length; i < c; i++) {
            var /** @type {?} */ r = this._entries[i];
            if (r.maskedByIdx === recIdx) {
                this._values.set(r.srec.key, r.val);
                r.maskedByIdx = 0;
            }
        }
    };
    /**
     * @param {?} match
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Context.prototype._checkMatch = /**
     * @param {?} match
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (match, key, value) {
        match._checkMatch(this._values, this._meta);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Context.prototype.findLastAssignmentOfKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        for (var /** @type {?} */ i = this._entries.length - 1; i >= 0; i--) {
            var /** @type {?} */ rec = this._entries[i];
            if (rec.srec.key === key && rec.maskedByIdx === 0) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Context.prototype.findLastAssignmentOfKeyWithValue = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        for (var /** @type {?} */ i = this._entries.length - 1; i >= 0; i--) {
            var /** @type {?} */ rec = this._entries[i];
            if (rec.srec.key === key && !this._isNewValue(rec.val, value)) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Check if we have value mirroring (property to context) to do Dynamic property mirroring will
     * be added to the currentActivation deferredAssignment list
     *
     */
    /**
     * Check if we have value mirroring (property to context) to do Dynamic property mirroring will
     * be added to the currentActivation deferredAssignment list
     *
     * @return {?}
     */
    Context.prototype._checkApplyProperties = /**
     * Check if we have value mirroring (property to context) to do Dynamic property mirroring will
     * be added to the currentActivation deferredAssignment list
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ didSet = false;
        var /** @type {?} */ numEntries = 0;
        var /** @type {?} */ lastSize = 0;
        var /** @type {?} */ declareKey = this._inDeclare() ? this._values.get(Meta.KeyDeclare) : null;
        while ((numEntries = this._entries.length) > lastSize) {
            lastSize = numEntries;
            var /** @type {?} */ rec = this._entries[numEntries - 1];
            var /** @type {?} */ properties = rec.srec.properties();
            var /** @type {?} */ contextKeys = properties.contextKeysUpdated;
            if (isPresent(contextKeys)) {
                for (var /** @type {?} */ i = 0, /** @type {?} */ c = contextKeys.length; i < c; i++) {
                    var /** @type {?} */ propMgr = contextKeys[i];
                    var /** @type {?} */ key = propMgr._name;
                    if (isPresent(declareKey) && key === declareKey) {
                        continue;
                    }
                    // ToDo: applying resolved value -- need to defer resolution on true dynamic
                    // values Suppress chained assignment if: 1) Our parent will assign this
                    // property (has a deferred activation for it), or 2) There's already a
                    // matching assignment with higher salience
                    var /** @type {?} */ newVal = this.staticallyResolveValue(properties.get(key));
                    var /** @type {?} */ prevProps = void 0;
                    var /** @type {?} */ suppress = (isPresent(prevProps) && prevProps.has(key)
                        && !this._isNewValue(this.staticallyResolveValue(prevProps.get(key)), newVal)) ||
                        (this._currentActivation._parent.hasDeferredAssignmentForKey(key));
                    if (!suppress) {
                        var /** @type {?} */ mirrorKey = propMgr._keyDataToSet._key;
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
    };
    /**
     * @return {?}
     */
    Context.prototype.applyPropertyContextAndChain = /**
     * @return {?}
     */
    function () {
        if (this._checkPropertyContext()) {
            while (this._checkApplyProperties()) {
                /* repeat */
            }
        }
    };
    /**
     * @return {?}
     */
    Context.prototype._currentPropertyScopeKey = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ foundKey;
        var /** @type {?} */ foundActivation;
        for (var /** @type {?} */ i = this._entries.length - 1; i >= 0; i--) {
            var /** @type {?} */ rec = this._entries[i];
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
    };
    // Apply a 'property context' property (e.g. field_p for field) to the context if necessary
    /**
     * @return {?}
     */
    Context.prototype._checkPropertyContext = /**
     * @return {?}
     */
    function () {
        assert(this._values instanceof NestedMap, 'Property assignment on base map?');
        var /** @type {?} */ scopeKey = this._currentPropertyScopeKey();
        if (isPresent(scopeKey)) {
            return this._set2(Meta.ScopeKey, scopeKey, scopeKey, false, false);
        }
        return false;
    };
    /**
     * @return {?}
     */
    Context.prototype.debug = /**
     * @return {?}
     */
    function () {
        // set debugger breakpoint here
        print('******  Debug Call ******');
        this._logContext();
    };
    /**
     * @return {?}
     */
    Context.prototype.debugString = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ buffer = new StringJoiner(['<b>Context:</b>&nbsp;']);
        buffer.add('(&nbsp;');
        buffer.add(this._entries.length + '');
        buffer.add(' entries');
        buffer.add('&nbsp;)<br/>');
        for (var /** @type {?} */ i = 0, /** @type {?} */ c = this._entries.length; i < c; i++) {
            var /** @type {?} */ sp = i;
            while (sp-- > 0) {
                buffer.add('&nbsp;');
            }
            var /** @type {?} */ r = this._entries[i];
            buffer.add('&nbsp;');
            buffer.add(r.srec.key);
            buffer.add('&nbsp;&nbsp;:&nbsp;');
            buffer.add(r.srec.val);
            buffer.add((r.srec.fromChaining ? ' ^' : ''));
            buffer.add((r.maskedByIdx !== 0 ? ' X' : ''));
            buffer.add('<br/>');
        }
        var /** @type {?} */ propertyActivation = this.currentActivation._propertyActivation;
        if (isPresent(propertyActivation)) {
            var /** @type {?} */ srecs = propertyActivation._recs;
            buffer.add('&nbsp;&nbsp;&nbsp;<b>PropertyActivation...</b><br/>');
            for (var /** @type {?} */ i = 0, /** @type {?} */ c = srecs.length; i < c; i++) {
                var /** @type {?} */ sp = i + this._entries.length + 1;
                while (sp-- > 0) {
                    buffer.add('&nbsp;&nbsp;');
                }
                var /** @type {?} */ r = srecs[i];
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
    };
    /**
     * @return {?}
     */
    Context.prototype._logContext = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ debugString = this.debugString();
        print(debugString);
        print('\n');
    };
    /**
     * @param {?} buf
     * @param {?} properties
     * @param {?} level
     * @param {?} singleLine
     * @return {?}
     */
    Context.prototype.writeProperties = /**
     * @param {?} buf
     * @param {?} properties
     * @param {?} level
     * @param {?} singleLine
     * @return {?}
     */
    function (buf, properties, level, singleLine) {
        MapWrapper.iterable(properties).forEach(function (value, key) {
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
    };
    /**
     * @return {?}
     */
    Context.prototype.lastMatchWithoutContextProps = /**
     * @return {?}
     */
    function () {
        return ListWrapper.isEmpty(this._entries) ? null : this._entries[this._entries.length - 1].srec.match;
    };
    /**
     * @return {?}
     */
    Context.prototype.lastMatch = /**
     * @return {?}
     */
    function () {
        if (ListWrapper.isEmpty(this._entries)) {
            return null;
        }
        var /** @type {?} */ match = ListWrapper.last(this._entries)
            .propertyLocalMatches(this);
        return (isPresent(match)) ? match : this.lastMatchWithoutContextProps();
    };
    /**
     * @return {?}
     */
    Context.prototype.lastStaticRec = /**
     * @return {?}
     */
    function () {
        if (ListWrapper.isEmpty(this._entries)) {
            return null;
        }
        var /** @type {?} */ rec = ListWrapper.last(this._entries).propertyLocalStaticRec(this);
        return isPresent(rec) ? rec : ListWrapper.last(this._entries).srec;
    };
    Object.defineProperty(Context.prototype, "recPool", {
        get: /**
         * @return {?}
         */
        function () {
            return this._recPool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "currentActivation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentActivation;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Context.prototype.extendedFields = /**
     * @return {?}
     */
    function () {
        return this.values;
    };
    Context._CacheActivations = false;
    Context._ExpensiveContextConsistencyChecksEnabled = false;
    Context._DebugRuleMatches = false;
    Context._Debug_SetsCount = 0;
    Context.MaxContextStackSize = 200;
    Context.EmptyMap = null;
    Context.EmptyRemoveMap = new Map();
    return Context;
}(Extensible));
export { Context };
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
var /**
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
Activation = /** @class */ (function () {
    function Activation(_parent) {
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
    Activation.prototype.getChildActivation = /**
     * @param {?} contextKey
     * @param {?} value
     * @param {?} chaining
     * @return {?}
     */
    function (contextKey, value, chaining) {
        if (isBlank(value)) {
            value = Meta.NullMarker;
        }
        var /** @type {?} */ byKey = (chaining)
            ? this._valueNodeMapByContextKeyChaining :
            this._valueNodeMapByContextKey;
        if (isBlank(byKey)) {
            return null;
        }
        var /** @type {?} */ byVal = byKey.get(contextKey);
        return (isBlank(byVal)) ? null : byVal.getValue(value);
    };
    /**
     * @param {?} contextKey
     * @param {?} value
     * @param {?} activation
     * @param {?} chaining
     * @return {?}
     */
    Activation.prototype.cacheChildActivation = /**
     * @param {?} contextKey
     * @param {?} value
     * @param {?} activation
     * @param {?} chaining
     * @return {?}
     */
    function (contextKey, value, activation, chaining) {
        if (isBlank(value)) {
            value = Meta.NullMarker;
        }
        var /** @type {?} */ byKey;
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
        var /** @type {?} */ byVal = byKey.get(contextKey);
        if (isBlank(byVal)) {
            byVal = new Collections.Dictionary();
            byKey.set(contextKey, byVal);
        }
        byVal.setValue(value, activation);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Activation.prototype.addDeferredAssignment = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        var /** @type {?} */ newDa;
        if (isBlank(this.deferredAssignments)) {
            this.deferredAssignments = new Array();
        }
        else {
            try {
                for (var _a = tslib_1.__values(this.deferredAssignments), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var da = _b.value;
                    if (da.key === key) {
                        newDa = da;
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (isBlank(newDa)) {
            newDa = new DeferredAssignment();
            newDa.key = key;
            this.deferredAssignments.push(newDa);
        }
        newDa.value = value;
        var e_2, _c;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Activation.prototype.hasDeferredAssignmentForKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (isPresent(this.deferredAssignments)) {
            try {
                for (var _a = tslib_1.__values(this.deferredAssignments), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var da = _b.value;
                    if (da.key === key) {
                        return true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return false;
        var e_3, _c;
    };
    /**
     * @param {?} context
     * @return {?}
     */
    Activation.prototype.propertyActivation = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        assert(context.currentActivation === this, 'PropertyActivation sought on non top of stack activation');
        if (isBlank(this._propertyActivation)) {
            this._propertyActivation = context._createNewPropertyContextActivation(this);
            if (isBlank(this._propertyActivation)) {
                this._propertyActivation = this;
            } // this as null marker
        }
        return this._propertyActivation !== this ? this._propertyActivation : null;
    };
    /**
     * @return {?}
     */
    Activation.prototype.findExistingPropertyActivation = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ activation = this;
        while (isPresent(activation)) {
            var /** @type {?} */ propertyActivation = activation._propertyActivation;
            if (isPresent(propertyActivation) && propertyActivation !== activation
                && !(isBlank(propertyActivation._recs) || ListWrapper.isEmpty(propertyActivation._recs))) {
                return propertyActivation;
            }
            activation = activation._parent;
        }
        return null;
    };
    // todo: better better to string for hashing
    /**
     * @return {?}
     */
    Activation.prototype.toString = /**
     * @return {?}
     */
    function () {
        return Collections.util.makeString(this);
    };
    return Activation;
}());
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
export { Activation };
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
var DeferredAssignment = /** @class */ (function () {
    function DeferredAssignment() {
    }
    return DeferredAssignment;
}());
export { DeferredAssignment };
function DeferredAssignment_tsickle_Closure_declarations() {
    /** @type {?} */
    DeferredAssignment.prototype.key;
    /** @type {?} */
    DeferredAssignment.prototype.value;
}
var AssignmentSnapshot = /** @class */ (function () {
    function AssignmentSnapshot() {
    }
    return AssignmentSnapshot;
}());
export { AssignmentSnapshot };
function AssignmentSnapshot_tsickle_Closure_declarations() {
    /** @type {?} */
    AssignmentSnapshot.prototype.key;
    /** @type {?} */
    AssignmentSnapshot.prototype.value;
    /** @type {?} */
    AssignmentSnapshot.prototype.salience;
}
var Assignment = /** @class */ (function () {
    function Assignment() {
        this.maskedByIdx = 0;
        this._didInitPropContext = false;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    Assignment.prototype.propertyLocalMatches = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return isPresent(this._propertyLocalSrec) ? this._propertyLocalSrec.match : null;
    };
    /**
     * @param {?} context
     * @return {?}
     */
    Assignment.prototype.propertyLocalStaticRec = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return this._propertyLocalSrec;
    };
    /**
     * @param {?} context
     * @return {?}
     */
    Assignment.prototype.propertyLocalValues = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (!this._didInitPropContext) {
            this.initPropContext(context);
        }
        return this._propertyLocalValues;
    };
    /**
     * @param {?} context
     * @return {?}
     */
    Assignment.prototype.initPropContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        this._didInitPropContext = true;
        assert(!Context._ExpensiveContextConsistencyChecksEnabled || ListWrapper.last(context._entries) === this, 'initing prop context on record not on top of stack');
        // Todo: base it on whether we've tries yet to process them.
        var /** @type {?} */ propActivation = (this.srec.activation.propertyActivation(context));
        if (isPresent(propActivation)) {
            context._applyPropertyActivation(propActivation, this);
        }
    };
    /**
     * @return {?}
     */
    Assignment.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.srec = null;
        this.val = null;
        this.maskedByIdx = 0;
        this._didInitPropContext = false;
        this._propertyLocalSrec = null;
        this._propertyLocalValues = null;
    };
    return Assignment;
}());
export { Assignment };
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
var /**
 * The 'static' (sharable) part of a context value assignment record.
 * Theses are created by the first _Assignment that needs them
 * and then cached for re-application in their _Activation
 *  (which, in turn, is stored in the global activation tree)
 */
StaticRec = /** @class */ (function () {
    function StaticRec() {
        this.salience = 0;
        this.lastAssignmentIdx = 0;
    }
    /**
     * @return {?}
     */
    StaticRec.prototype.properties = /**
     * @return {?}
     */
    function () {
        return (isPresent(this.match)) ? this.match.properties() : Context.EmptyMap;
    };
    Object.defineProperty(StaticRec.prototype, "key", {
        get: /**
         * @return {?}
         */
        function () {
            return this._key;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StaticRec.prototype, "val", {
        get: /**
         * @return {?}
         */
        function () {
            return this._val;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._val = value;
        },
        enumerable: true,
        configurable: true
    });
    return StaticRec;
}());
/**
 * The 'static' (sharable) part of a context value assignment record.
 * Theses are created by the first _Assignment that needs them
 * and then cached for re-application in their _Activation
 *  (which, in turn, is stored in the global activation tree)
 */
export { StaticRec };
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
var PropertyAccessor = /** @class */ (function () {
    function PropertyAccessor(context) {
        this.context = context;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    PropertyAccessor.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.context.propertyForKey(key);
    };
    /**
     * @return {?}
     */
    PropertyAccessor.prototype.toString = /**
     * @return {?}
     */
    function () {
        return MapWrapper.toString(this.context.allProperties());
    };
    return PropertyAccessor;
}());
export { PropertyAccessor };
function PropertyAccessor_tsickle_Closure_declarations() {
    /** @type {?} */
    PropertyAccessor.prototype.context;
}
/**
 * Snapshot is the way how to capture a current state of the context and then replay it back so.
 * for cases when we need to run some rule execution outside of the push/pop cycle
 */
var /**
 * Snapshot is the way how to capture a current state of the context and then replay it back so.
 * for cases when we need to run some rule execution outside of the push/pop cycle
 */
Snapshot = /** @class */ (function () {
    function Snapshot(_context) {
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
    Snapshot.prototype.hydrate = /**
     * @param {?=} shellCopy
     * @return {?}
     */
    function (shellCopy) {
        if (shellCopy === void 0) { shellCopy = true; }
        var /** @type {?} */ assignments = (shellCopy) ? this._assignments : this._allAssignments;
        var /** @type {?} */ newContext = this._meta.newContext();
        newContext.push();
        var /** @type {?} */ lastCnxGeneration = 1;
        try {
            for (var assignments_1 = tslib_1.__values(assignments), assignments_1_1 = assignments_1.next(); !assignments_1_1.done; assignments_1_1 = assignments_1.next()) {
                var a = assignments_1_1.value;
                if (lastCnxGeneration < a.salience) {
                    newContext.push();
                }
                newContext.set(a.key, a.value);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (assignments_1_1 && !assignments_1_1.done && (_a = assignments_1.return)) _a.call(assignments_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        newContext.isNested = this._isNested;
        return newContext;
        var e_4, _a;
    };
    return Snapshot;
}());
/**
 * Snapshot is the way how to capture a current state of the context and then replay it back so.
 * for cases when we need to run some rule execution outside of the push/pop cycle
 */
export { Snapshot };
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
var ObjectMetaContext = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectMetaContext, _super);
    function ObjectMetaContext(_meta, nested) {
        if (nested === void 0) { nested = false; }
        return _super.call(this, _meta, nested) || this;
    }
    Object.defineProperty(ObjectMetaContext.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ obj = this.object;
            if (isBlank(obj)) {
                return null;
            }
            var /** @type {?} */ fieldPath = this.fieldPath();
            return isPresent(fieldPath) ? fieldPath.getFieldValue(obj) : this.propertyForKey('value');
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var /** @type {?} */ fieldPath = this.fieldPath();
            if (isPresent(fieldPath)) {
                assert(isPresent(this.object), 'Call to setValue() with no current object');
                fieldPath.setFieldValue(this.object, val);
            }
            else {
                var /** @type {?} */ value = this.allProperties().get(ObjectMeta.KeyValue);
                assert(isDynamicSettable(value), 'Cant set derived property: ' + value);
                var /** @type {?} */ settable = value;
                ((/** @type {?} */ (value))).evaluateSet(this, val);
                settable.evaluateSet(this, val);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectMetaContext.prototype, "object", {
        get: /**
         * @return {?}
         */
        function () {
            return this.values.get(ObjectMeta.KeyObject);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectMetaContext.prototype, "formatters", {
        get: /**
         * @return {?}
         */
        function () {
            if (isBlank(this._formatters)) {
                this._formatters = new Map();
            }
            return this._formatters;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ObjectMetaContext.prototype.fieldPath = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ propMap = /** @type {?} */ (this.allProperties());
        return propMap.fieldPath;
    };
    /**
     * @return {?}
     */
    ObjectMetaContext.prototype.locale = /**
     * @return {?}
     */
    function () {
        return ObjectMetaContext.DefaultLocale;
    };
    /**
     * @return {?}
     */
    ObjectMetaContext.prototype.timezone = /**
     * @return {?}
     */
    function () {
        return new Date().getTimezoneOffset();
    };
    ObjectMetaContext.DefaultLocale = 'en';
    return ObjectMetaContext;
}(Context));
export { ObjectMetaContext };
function ObjectMetaContext_tsickle_Closure_declarations() {
    /** @type {?} */
    ObjectMetaContext.DefaultLocale;
    /** @type {?} */
    ObjectMetaContext.prototype._formatters;
}
var UIContext = /** @class */ (function (_super) {
    tslib_1.__extends(UIContext, _super);
    function UIContext(_meta, nested) {
        if (nested === void 0) { nested = false; }
        return _super.call(this, _meta, nested) || this;
    }
    // user values from user settings/locales
    /**
     * @return {?}
     */
    UIContext.prototype.locale = /**
     * @return {?}
     */
    function () {
        return _super.prototype.locale.call(this);
    };
    /**
     * @return {?}
     */
    UIContext.prototype.timezone = /**
     * @return {?}
     */
    function () {
        return _super.prototype.timezone.call(this);
    };
    return UIContext;
}(ObjectMetaContext));
export { UIContext };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQXNCQSxPQUFPLEtBQUssV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFDSCxNQUFNLEVBQ04sY0FBYyxFQUFFLFNBQVMsRUFDekIsVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFFBQVEsRUFDUixTQUFTLEVBQ1QsUUFBUSxFQUNSLFdBQVcsRUFDWCxXQUFXLEVBQ1gsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFtQixXQUFXLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDekUsT0FBTyxFQUFDLFVBQVUsRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFDSCxvQkFBb0IsRUFFcEIsSUFBSSxFQUNKLGlCQUFpQixFQUNqQixvQkFBb0IsRUFDdkIsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0ZHLG1DQUFVO0lBMkVuQyxpQkFBb0IsS0FBVyxFQUFVLE1BQXVCOytDQUFBO1FBQWhFLFlBQ0ksaUJBQU8sU0FhVjtRQWRtQixXQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsWUFBTSxHQUFOLE1BQU0sQ0FBaUI7d0JBN0Q1QixJQUFJLEdBQUcsRUFBZTt5QkFDNUIsRUFBRTs2QkFDQyxFQUFFO3lCQUlHLEVBQUU7UUEwRHBDLEVB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T0FBTyxxQkFBa0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBLENBQUM7UUFDbEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDNUI7Ozs7SUFHRCxrQ0FBTTs7O0lBQU47UUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO0tBQzFDOzs7O0lBRUQsb0NBQVE7OztJQUFSO1FBQ0ksTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUV6QztzQ0E5RCtCLElBQUk7NEJBemhEeEM7RUF3aER1QyxPQUFPO1NBQWpDLGlCQUFpQjs7Ozs7OztBQW1FOUIsSUFBQTtJQUErQixxQ0FBaUI7SUFHNUMsbUJBQVksS0FBYSxFQUFFLE1BQXVCO1FBQXZCLHVCQUFBLEVBQUEsY0FBdUI7ZUFDOUMsa0JBQU0sS0FBSyxFQUFFLE1BQU0sQ0FBQztLQUN2QjtJQUdELHlDQUF5Qzs7OztJQUN6QywwQkFBTTs7O0lBQU47UUFDSSxNQUFNLENBQUMsaUJBQU0sTUFBTSxXQUFFLENBQUM7S0FDekI7Ozs7SUFFRCw0QkFBUTs7O0lBQVI7UUFDSSxNQUFNLENBQUMsaUJBQU0sUUFBUSxXQUFFLENBQUM7S0FDM0I7b0JBMW1ETDtFQTJsRCtCLGlCQUFpQixFQWdCL0MsQ0FBQTtBQWhCRCxxQkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbi8qKlxuICogU3BlY2lhbCBpbXBvcnQgdG8gYmUgYWJsZSB0byBjb252ZXJ0IHN0cmluZyB0byB0eXBlIHVzaW5nIENvbGxlY3Rpb25zW3N0cmluZyB0eXBlXSA9PiB0eXBlXG4gKi9cbmltcG9ydCAqIGFzIENvbGxlY3Rpb25zIGZyb20gJ3R5cGVzY3JpcHQtY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgQm9vbGVhbldyYXBwZXIsIGNsYXNzTmFtZSxcbiAgICBFeHRlbnNpYmxlLFxuICAgIEZpZWxkUGF0aCxcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNOdW1iZXIsXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIGlzU3RyaW5nTWFwLFxuICAgIExpc3RXcmFwcGVyLFxuICAgIE1hcFdyYXBwZXIsXG4gICAgb2JqZWN0VG9OYW1lLFxuICAgIHByaW50LFxuICAgIFN0cmluZ0pvaW5lclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TWF0Y2hSZXN1bHQsIFVuaW9uTWF0Y2hSZXN1bHR9IGZyb20gJy4vbWF0Y2gnO1xuaW1wb3J0IHtNZXRhLCBPdmVycmlkZVZhbHVlLCBQcm9wZXJ0eU1hbmFnZXIsIFByb3BlcnR5TWFwfSBmcm9tICcuL21ldGEnO1xuaW1wb3J0IHtPYmplY3RNZXRhLCBPYmplY3RNZXRhUHJvcGVydHlNYXB9IGZyb20gJy4vb2JqZWN0LW1ldGEnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4vdWltZXRhJztcbmltcG9ydCB7TmVzdGVkTWFwfSBmcm9tICcuL25lc3RlZC1tYXAnO1xuaW1wb3J0IHtcbiAgICBEeW5hbWljUHJvcGVydHlWYWx1ZSxcbiAgICBEeW5hbWljU2V0dGFibGVQcm9wZXJ0eVZhbHVlLFxuICAgIEV4cHIsXG4gICAgaXNEeW5hbWljU2V0dGFibGUsXG4gICAgU3RhdGljYWxseVJlc29sdmFibGVcbn0gZnJvbSAnLi9wcm9wZXJ0eS12YWx1ZSc7XG5cbi8qKlxuICpcbiAqIENvbnRleHQgcmVwcmVzZW50cyBhIHN0YWNrIG9mIGFzc2lnbm1lbnRzIChlLmcuIGNsYXNzPVVzZXIsIGZpZWxkPWJpcnRoRGF5LCBvcGVyYXRpb249ZWRpdClcbiAqICBUaGUgY3VycmVudCBzZXQgb2YgYXNzaWdubWVudHMgY2FuIGJlIHJldHJpZXZlZCB2aWEgdmFsdWVzKCkuXG4gKlxuICogVGhlIGN1cnJlbnQgdmFsdWVzIGFyZSBydW4gYWdhaW5zdCB0aGUgTWV0YSBydWxlIHNldCB0byBjb21wdXRlIHRoZSBlZmZlY3RpdmUgUHJvcGVydHlNYXBcbiAqIChlLmcuIHZpc2libGU6dHJ1ZSwgZWRpdGFibGU6dHJ1ZSwgY29tcG9uZW50OkFXVGV4dEZpZWxkKS5cbiAqIFNvbWUgcnVsZSBldmFsdWF0aW9ucyByZXN1bHQgaW4gKmNoYWluaW5nKiAtLSB3aGVyZSBhZGRpdGlvbmFsIGFzc2lnbm1lbnRzIHRoYXQgYXJlXG4gKiAnaW1wbGllZCcgYnkgdGhlIGN1cnJlbnQgYXNzaWdubWVudHMgYXJlIGFwcGxpZWQsIChyZXN1bHRpbmcgaW4gYSByZXZpc2VkIGNvbXB1dGF0aW9uXG4gKiBvZiB0aGUgY3VycmVudCBQcm9wZXJ0eU1hcCwgYW5kIHBvc3NpYmxlIGZ1cnRoZXIgY2hhaW5pbmcpLlxuICogKGUuZy4gZmllbGQ9YmlydGhEYXkgbWF5IHJlc3VsdCBpbiB0eXBlPURhdGUgd2hpY2ggbWF5IHJlc3VsdCBpbiBjb21wb25lbnQ6RGF0ZVBpY2tlcilcbiAqXG4gKiBBc3NpZ25tZW50cyBjYW4gYmUgc2NvcGVkIGFuZCBwb3BwZWQgKHB1c2goKSwgc2V0KGtleSwgdmFsdWUpOyAuLi47IHBvcCgpKS5cbiAqXG4gKiBUaGUgYWN0dWFsIGNvbXB1dGF0aW9uIG9mIHJ1bGUgbWF0Y2hlcyBpcyBjYWNoZWQgc28gb25jZSBhICdwYXRoJyBkb3duIHRoZSBjb250ZXh0XG4gKiB0cmVlIGhhcyBiZWVuIGV4ZXJjaXplZCBzdWJzZXF1ZW50IG1hdGNoaW5nIHRyYXZlcnNhbHMgKGV2ZW4gYnkgb3RoZXIgdGhyZWFkcy91c2VycylcbiAqIGlzIGZhc3QuXG4gKlxuICpcbiAqIGV4YW1wbGVzIG9mIHByb3BlcnR5IG1hcHMgZm9yIGRpZmZlcmVudCBzY29wZSBrZXlcbiAqXG4gKiA8Y29kZT5cbiAqICAgICB7XG4gICAgICAgICd2aXNpYmxlJzogdHJ1ZSxcbiAgICAgICAgJ2NsYXNzX3RyYWl0JzogJ2ZpdmVab25lcycsXG4gICAgICAgICdlZGl0YWJsZSc6IHRydWUsXG4gICAgICAgICdiaW5kaW5ncyc6IHtcbiAgICAgICAgICAgICd2YWx1ZSc6ICdEZWZhdWx0IFRpdGxlJ1xuICAgICAgICB9LFxuICAgICAgICAnZmllbGRfdHJhaXQnOiAncmVxdWlyZWQnLFxuICAgICAgICAnbGFiZWwnOiAnVGl0bGUnLFxuICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxuICAgICAgICAncmVxdWlyZWQnOiB0cnVlLFxuICAgICAgICAnZWRpdGluZyc6IHRydWUsXG4gICAgICAgICd2YWxpZCc6ICd7eyh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSA/IHRydWUgOiBcXCdBbnN3ZXIgcmVxdWlyZWRcXCd9fScsXG4gICAgICAgICdjb21wb25lbnQnOiAnSW5wdXRGaWVsZENvbXBvbmVudCcsXG4gICAgICAgICdmaWVsZCc6ICd0aXRsZScsXG4gICAgICAgICdsYXlvdXRfdHJhaXQnOiAnRm9ybScsXG4gICAgICAgICd0cmFpdCc6ICdyZXF1aXJlZCcsXG4gICAgICAgICdyYW5rJzogMjAsXG4gICAgICAgICdhZnRlcic6ICd6TGVmdCcsXG4gICAgICAgICdjbGFzcyc6ICdDaGVja1JlcXVlc3QxJ1xuICAgIH1cbiAqXG4gKiA8L2NvZGU+XG4gKlxuICpcbiAqXG4gKiA8Y29kZT5cbiAqICAgICB7XG4gICAgICAgICd2aXNpYmxlJzogdHJ1ZSxcbiAgICAgICAgJ2NsYXNzX3RyYWl0JzogJ2ZpdmVab25lcycsXG4gICAgICAgICdsYWJlbCc6ICdDaGVjayBSZXF1ZXN0MScsXG4gICAgICAgICd6b25lcyc6IFtcbiAgICAgICAgICAgICd6TGVmdCcsXG4gICAgICAgICAgICAnelJpZ2h0JyxcbiAgICAgICAgICAgICd6VG9wJyxcbiAgICAgICAgICAgICd6Qm90dG9tJyxcbiAgICAgICAgICAgICd6RGV0YWlsJ1xuICAgICAgICBdLFxuICAgICAgICAnZWRpdGluZyc6IHRydWUsXG4gICAgICAgICdsYXlvdXQnOiAnKicsXG4gICAgICAgICdjb21wb25lbnQnOiAnTWV0YUZvcm1Db21wb25lbnQnLFxuICAgICAgICAnbGF5b3V0X3RyYWl0JzogJ0Zvcm0nLFxuICAgICAgICAnZml2ZVpvbmVMYXlvdXQnOiB0cnVlLFxuICAgICAgICAndHJhaXQnOiAnZml2ZVpvbmVzJyxcbiAgICAgICAgJ2xheW91dHNCeVpvbmUnOiB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgJ2NsYXNzJzogJ0NoZWNrUmVxdWVzdDEnLFxuICAgICAgICAnZmllbGRzQnlab25lJzoge1xuICAgICAgICAgICAgJ3pMZWZ0JzogW1xuICAgICAgICAgICAgICAgICd0aXRsZScsXG4gICAgICAgICAgICAgICAgJ25hbWUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJ3pOb25lJzogW1xuICAgICAgICAgICAgICAgICdmdWxsTmFtZSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cbiAqXG4gKiA8L2NvZGU+XG4gKlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250ZXh0IGV4dGVuZHMgRXh0ZW5zaWJsZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX0NhY2hlQWN0aXZhdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgc3RhdGljIF9FeHBlbnNpdmVDb250ZXh0Q29uc2lzdGVuY3lDaGVja3NFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgc3RhdGljIF9EZWJ1Z1J1bGVNYXRjaGVzOiBib29sZWFuID0gZmFsc2U7XG4gICAgc3RhdGljIF9EZWJ1Z19TZXRzQ291bnQ6IG51bWJlciA9IDA7XG5cblxuICAgIHN0YXRpYyBNYXhDb250ZXh0U3RhY2tTaXplOiBudW1iZXIgPSAyMDA7XG5cbiAgICBzdGF0aWMgRW1wdHlNYXA6IFByb3BlcnR5TWFwID0gbnVsbDtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRW1wdHlSZW1vdmVNYXA6IE1hcDxhbnksIGFueT4gPSBuZXcgTWFwPGFueSwgYW55PigpO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICBfZW50cmllczogQXJyYXk8QXNzaWdubWVudD4gPSBbXTtcbiAgICBwcml2YXRlIF9mcmFtZVN0YXJ0czogbnVtYmVyW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgX2N1cnJlbnRQcm9wZXJ0aWVzOiBQcm9wZXJ0eU1hcDtcbiAgICBwcm90ZWN0ZWQgX3Jvb3ROb2RlOiBBY3RpdmF0aW9uO1xuICAgIHByaXZhdGUgX2N1cnJlbnRBY3RpdmF0aW9uOiBBY3RpdmF0aW9uO1xuICAgIHByaXZhdGUgX3JlY1Bvb2w6IEFycmF5PEFzc2lnbm1lbnQ+ID0gW107XG5cbiAgICBfYWNjZXNzb3I6IFByb3BlcnR5QWNjZXNzb3I7XG5cbiAgICBpc05lc3RlZDogYm9vbGVhbjtcblxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50YXRpb24gbm90ZXM6XG4gICAgICpcbiAgICAgKiBDb250ZXh0IG1haW50YWlucyBhIHN0YWNrIChfZW50cmllcykgb2YgX0NvbnRleHRSZWNzIChvbmUgcGVyIGFzc2lnbm1lbnQpIGFzIHdlbGwgYXNcbiAgICAgKiBhcyBfZnJhbWVTdGFjayByZWNvcmRpbmcgdGhlIHN0YWNrIHBvc2l0aW9ucyBmb3IgZWFjaCBwdXNoKCkvcG9wKCkuXG5cbiAgICAgKiBQZXJmb3JtYW5jZSB0aHJvdWdoIGFnZ3Jlc3NpdmUgZ2xvYmFsIGNhY2hpbmcgb2YgYWxsIHN0YXRpY2FsbHkgY29tcHV0YXRibGUgZGF0YTpcbiAgICAgKiAtIFRoZSBzdGF0aWMgKHJldXNhYmxlL2ltbXV0YWJsZSkgcGFydCBvZiBhIENvbnRleHRSZWMgaXMgZmFjdG9yZWQgaW50byBfU3RhdGljUmVjXG4gICAgICogLSBTdGF0aWNSZWNzIHJlcHJlc2VudCBpbmRpdmlkdWFsIGFzc2lnbm1lbnRzIChjb250ZXh0IGtleSA9IHZhbHVlKSBhbmQgY2FjaGUgdGhlXG4gICAgICogICAgICByZXN1bHRpbmcgTWV0YS5NYXRjaFJlc3VsdCAoYW5kIGFzc29jaWF0ZWQgUHJvcGVydHlNYXApXG4gICAgICogLSBUaGUgc3ViLXN0YWNrIChvZiBmb3J3YXJkIGNoYWluZWQpIHJlY29yZHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggZXh0ZXJuYWwgc2V0KClcbiAgICAgKiAgICAgIChvciBjaGFpbmVkICpkeW5hbWljKiB2YWx1ZSkgaXMgcmVjb3JkZWQgaW4gYW4gQWN0aXZhdGlvbi5cbiAgICAgKiAtIFByb2Nlc3MtZ2xvYmFsIHRyZWUgb2YgQWN0aXZhdGlvbnNcbiAgICAgKiAgICAgIC0gZWFjaCBhY3RpdmF0aW9uIGtlZXBzIGxpc3Qgb2YgaXRzIENvbnRleHRLZXkvVmFsdWUta2V5ZWQgZGVjZW5kZWQgQWN0aXZhdGlvbnNcbiAgICAgKlxuICAgICAqIFByb3BlcnR5IENvbnRleHRzLlxuICAgICAqICAgICAgVGhlIG5vdGlvbiBvZiBhICdQcm9wZXJ0eUNvbnRleHQnIG1ha2VzIHRoZSBnb2luZyB0cmlja3kuLi5cbiAgICAgKiAgICAgICBBICdQcm9wZXJ0eUNvbnRleHRLZXknIGlzIGEga2V5IGZvciBhbiAnZW50aXR5JyB0aGF0IHByb3BlcnRpZXMgZGVzY3JpYmUuXG4gICAgICogICAgICAgKGUuZy4gY2xhc3MsIGZpZWxkLCBhY3Rpb24sIGFuZCBsYXlvdXQgYXJlIHByb3BlcnR5IGNvbnRleHQga2V5cywgYnV0IGVkaXRpbmcsXG4gICAgICogICAgICAgb3BlcmF0aW9uLCAuLi4gYXJlIG5vdClcbiAgICAgKiAgICAgICBFLmcuIE9uIGFuIGFzc2lnbm1lbnQgc3RhY2sgd2l0aCBtb2R1bGU9QWRtaW4gY2xhc3M9Rm9vLCBmaWVsZD1uYW1lLCBlZGl0YWJsZT1mYWxzZSxcbiAgICAgKiAgICAgICB3ZSB3YW50IHRoZSBwcm9wZXJ0eSAnbGFiZWwnIHRvIGJlIHRoZSBsYWJlbCBmb3IgdGhlICpmaWVsZCosIG5vdCB0aGUgY2xhc3Mgb3IgbW9kdWxlXG4gICAgICogICAgICAgLS0gaS5lLiB0aGUgKnRvcC1tb3N0KiBhc3NpZ25tZW50IG9mIGEgUHJvcGVydHlDb250ZXh0S2V5IGRldGVybWluZXMgd2hpY2ggcHJvcGVydHlcbiAgICAgKiAgICAgICBjb250ZXh0IHJ1bGVzIGFyZSBhY3RpdmUuXG4gICAgICpcbiAgICAgKiAgVGhlc2UgcnVsZXMgYXJlIGFjdGl2YXRlZCB2aWEgYSBzeW50aGV0aWMgY29udGV4dCBrZXkgb2YgbGlrZSAnZmllbGRfcCcgb3IgJ2NsYXNzX3AnLlxuICAgICAqICBMb2dpY2FsbHksIGFmdGVyIGVhY2ggYXNzaWdtZW50IHdlIG5lZWQgdG8gZmlndXJlIG9mIHdoaWNoIGNvbnRleHQga2V5IHNob3VsZCBiZSBpblxuICAgICAqICBhZmZlY3QgYW4gc2V0IGl0IG9uIHRoZSBjb250ZXh0LCBidXQgdGhlbiBhdXRvbWF0aWNhbGx5IHBvcCBpdCBvZmYgdXBvbiB0aGUgbmV4dFxuICAgICAqICBhc3NpZ25tZW50IChhbmQgdGhlbiByZWNvbXB1dGUgYWdhaW4pLlxuICAgICAqXG4gICAgICogIE9mIGNvdXJzZSwgYWN0dWFsbHkgcHVzaGluZyBhbmQgcG9wcGluZyBjb250ZXh0IGtleSBhc3NpZ25tZW50IG9uIGV2ZXJ5IHNldCgpXG4gICAgICogIHdvdWxkIGJlIGV4cGVuc2l2ZSBzbyBpbnN0ZWFkIHdlIGNhY2hlIHRoZSAncHJvcGVydHlBY3RpdmF0aW9uJyBhc3NvY2lhdGVkIHdpdGhcbiAgICAgKiAgZWFjaCBhY3RpdmF0aW9uLCBhbmQgdXNlIGl0cyB2YWx1ZXMgYW5kIHByb3BlcnRpZXMgcmF0aGVyIHRoYW4gdGhvc2Ugb24gdGhlXG4gICAgICogIGFjdGl2YXRpb24uXG4gICAgICovXG5cbiAgICBzdGF0aWMgZ2V0QWN0aXZhdGlvblRyZWUobWV0YTogTWV0YSk6IEFjdGl2YXRpb24ge1xuICAgICAgICAvLyB0b2RvOiBjaGVjayB0aGUgc3ludGF4IEFjdGlvbnZhdGlvbiBjb250cnVjdG9yIG5hbWUuXG4gICAgICAgIGxldCBuYW1lID0gb2JqZWN0VG9OYW1lKEFjdGl2YXRpb24pO1xuICAgICAgICBsZXQgcm9vdDogQWN0aXZhdGlvbiA9IG1ldGEuaWRlbnRpdHlDYWNoZS5nZXRWYWx1ZShuYW1lKTtcbiAgICAgICAgaWYgKGlzQmxhbmsocm9vdCkpIHtcbiAgICAgICAgICAgIHJvb3QgPSBuZXcgQWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgbWV0YS5pZGVudGl0eUNhY2hlLnNldFZhbHVlKG5hbWUsIHJvb3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb290O1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWV0YTogTWV0YSwgcHJpdmF0ZSBuZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKENvbnRleHQuRW1wdHlNYXApKSB7XG4gICAgICAgICAgICBDb250ZXh0LkVtcHR5TWFwID0gbmV3IFByb3BlcnR5TWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBDb250ZXh0Ll9EZWJ1Z19TZXRzQ291bnQgPSAwO1xuXG4gICAgICAgIHRoaXMuX2FjY2Vzc29yID0gbmV3IFByb3BlcnR5QWNjZXNzb3IodGhpcyk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uID0gQ29udGV4dC5nZXRBY3RpdmF0aW9uVHJlZShfbWV0YSk7XG4gICAgICAgIHRoaXMuX3Jvb3ROb2RlID0gdGhpcy5fY3VycmVudEFjdGl2YXRpb247XG5cbiAgICAgICAgdGhpcy5pc05lc3RlZCA9IG5lc3RlZDtcbiAgICB9XG5cblxuICAgIHB1c2goKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZyYW1lU3RhcnRzLnB1c2godGhpcy5fZW50cmllcy5sZW5ndGgpO1xuICAgIH1cblxuICAgIGdldCBtZXRhKCk6IE1ldGEge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YTtcbiAgICB9XG5cblxuICAgIHBvcCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9mcmFtZVN0YXJ0cy5sZW5ndGg7XG4gICAgICAgIGFzc2VydChzaXplID4gMCwgJ1BvcHBpbmcgZW1wdHkgc3RhY2snKTtcblxuICAgICAgICBsZXQgcG9zID0gdGhpcy5fZnJhbWVTdGFydHMucG9wKCk7XG5cbiAgICAgICAgbGV0IGVudHJpZXNTaXplOiBudW1iZXI7XG4gICAgICAgIHdoaWxlICgoZW50cmllc1NpemUgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aCkgPiBwb3MpIHtcbiAgICAgICAgICAgIGxldCByZWNJZHggPSBlbnRyaWVzU2l6ZSAtIDE7XG4gICAgICAgICAgICBsZXQgcmVjOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllcy5zcGxpY2UocmVjSWR4LCAxKVswXTtcblxuICAgICAgICAgICAgaWYgKHJlYy5zcmVjLmxhc3RBc3NpZ25tZW50SWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5kZWxldGUocmVjLnNyZWMua2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdW5kb092ZXJyaWRlKHJlYywgcmVjSWR4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24gPSAocmVjSWR4ID4gMClcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2VudHJpZXNbcmVjSWR4IC0gMV0uc3JlYy5hY3RpdmF0aW9uXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9yb290Tm9kZTtcblxuICAgICAgICAgICAgdGhpcy5hc3NlcnRDb250ZXh0Q29uc2lzdGVudCgpO1xuXG4gICAgICAgICAgICAvLyBjaGVjayByZWMgYmFjayBpbnRvIHBvb2wgZm9yIHJldXNlXG4gICAgICAgICAgICByZWMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlY1Bvb2wucHVzaChyZWMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3VycmVudFByb3BlcnRpZXMgPSBudWxsO1xuICAgIH1cblxuXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5fc2V0KGtleSwgdmFsdWUsIGZhbHNlLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gaW1wbGVtZW50IGRlZmF1bHQgdG9TdHJpbmcgZm9yIG91ciBvYmplY3Qgc28gd2UgY2FuIHJldHJpZXZlIG9iamVjdFRpdGxlXG4gICAgICAgIGlmIChrZXkgPT09IE9iamVjdE1ldGEuS2V5T2JqZWN0KSB7XG4gICAgICAgICAgICBsZXQgdG9DaGVjayA9IHRoaXMuX3ZhbHVlcy5nZXQoT2JqZWN0TWV0YS5LZXlPYmplY3QpO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsodG9DaGVja1snJHRvU3RyaW5nJ10pKSB7XG4gICAgICAgICAgICAgICAgdG9DaGVja1snJHRvU3RyaW5nJ10gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGF6eiA9IHRoaXMudmFsdWVzLmdldChPYmplY3RNZXRhLktleUNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFVJTWV0YS5iZWF1dGlmeUNsYXNzTmFtZShjbGF6eik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbWVyZ2Uoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2V0KGtleSwgdmFsdWUsIHRydWUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBzZXRTY29wZUtleShrZXk6IHN0cmluZykge1xuICAgICAgICBhc3NlcnQodGhpcy5fbWV0YS5rZXlEYXRhKGtleSkuaXNQcm9wZXJ0eVNjb3BlLCBrZXkgKyAnIGlzIG5vdCBhIHZhbGlkIGNvbnRleHQga2V5Jyk7XG4gICAgICAgIGxldCBjdXJyZW50OiBzdHJpbmcgPSB0aGlzLl9jdXJyZW50UHJvcGVydHlTY29wZUtleSgpO1xuXG4gICAgICAgIC8vIEFzc2VydC50aGF0KGN1cnJlbnQgIT0gbnVsbCwgJ0Nhbid0IHNldCAlcyBhcyBjb250ZXh0IGtleSB3aGVuIG5vIGNvbnRleHQga2V5IG9uIHN0YWNrJyxcbiAgICAgICAgLy8ga2V5KTsgVE9ETzogaWYgY3VycmVudCBrZXkgaXNDaGFpbmluZyB0aGVuIHdlIG5lZWQgdG8gc2V0IGFnYWluIHRvIGdldCBhIG5vbi1jaGFpbmluZ1xuICAgICAgICAvLyBhc3NpZ25tZW50XG5cbiAgICAgICAgaWYgKCEoa2V5ID09PSBjdXJyZW50KSkge1xuICAgICAgICAgICAgbGV0IHZhbDogYW55ID0gdGhpcy52YWx1ZXMuZ2V0KGtleSk7XG4gICAgICAgICAgICAvLyBBc3NlcnQudGhhdCh2YWwgIT0gbnVsbCwgJ0Nhbid0IHNldCAlcyBhcyBjb250ZXh0IGtleSB3aGVuIGl0IGhhcyBubyB2YWx1ZSBhbHJlYWR5XG4gICAgICAgICAgICAvLyBvbiB0aGUgY29udGV4dCcsIGtleSk7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayh2YWwpKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gTWV0YS5LZXlBbnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdmFsdWVzKCk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBsZXQgcHJvcFZhbHM6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgICAgIHJldHVybiAoTGlzdFdyYXBwZXIuaXNFbXB0eSh0aGlzLl9lbnRyaWVzKSB8fFxuICAgICAgICAgICAgaXNCbGFuayhcbiAgICAgICAgICAgICAgICBwcm9wVmFscyA9IChMaXN0V3JhcHBlci5sYXN0PEFzc2lnbm1lbnQ+KHRoaXMuX2VudHJpZXMpKS5wcm9wZXJ0eUxvY2FsVmFsdWVzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzKSkpID8gdGhpcy5fdmFsdWVzIDogcHJvcFZhbHM7XG4gICAgfVxuXG4gICAgZ2V0IHByb3BlcnRpZXMoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjY2Vzc29yO1xuICAgIH1cblxuXG4gICAgcHJvcGVydHlGb3JLZXkoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5hbGxQcm9wZXJ0aWVzKCkuZ2V0KGtleSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZVZhbHVlKHZhbCk7XG4gICAgfVxuXG4gICAgbGlzdFByb3BlcnR5Rm9yS2V5KGtleTogc3RyaW5nKTogQXJyYXk8YW55PiB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLnByb3BlcnR5Rm9yS2V5KGtleSk7XG4gICAgICAgIHJldHVybiAoaXNCbGFuayh2YWwpKSA/IFtdIDogKGlzQXJyYXkodmFsKSkgPyB2YWwgOiBbdmFsXTtcbiAgICB9XG5cbiAgICBib29sZWFuUHJvcGVydHlGb3JLZXkoa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWw6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMucHJvcGVydHlGb3JLZXkoa2V5KTtcbiAgICAgICAgcmV0dXJuIChpc0JsYW5rKHZhbCkpID8gZGVmYXVsdFZhbCA6IEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKHZhbCk7XG4gICAgfVxuXG5cbiAgICBhbGxQcm9wZXJ0aWVzKCk6IFByb3BlcnR5TWFwIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5fY3VycmVudFByb3BlcnRpZXMpKSB7XG4gICAgICAgICAgICBsZXQgbTogTWF0Y2hSZXN1bHQgPSB0aGlzLmxhc3RNYXRjaCgpO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChtKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQcm9wZXJ0aWVzID0gbS5wcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2N1cnJlbnRQcm9wZXJ0aWVzKSA/IHRoaXMuX2N1cnJlbnRQcm9wZXJ0aWVzIDogQ29udGV4dC5FbXB0eU1hcDtcbiAgICB9XG5cblxuICAgIHJlc29sdmVWYWx1ZSh2YWx1ZTogYW55IHwgRHluYW1pY1Byb3BlcnR5VmFsdWUpOiBhbnkge1xuICAgICAgICBsZXQgbGFzdFZhbHVlOiBhbnk7XG4gICAgICAgIHdoaWxlICh2YWx1ZSAhPT0gbGFzdFZhbHVlICYmIGlzUHJlc2VudCh2YWx1ZSkgJiYgdmFsdWUgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgbGFzdFZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGxldCBwcm9wVmFsdWU6IER5bmFtaWNQcm9wZXJ0eVZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRXhwcikge1xuICAgICAgICAgICAgICAgIHByb3BWYWx1ZS5hZGRUeXBlVG9Db250ZXh0KCdVSU1ldGEnLCBVSU1ldGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSBwcm9wVmFsdWUuZXZhbHVhdGUodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBzdGF0aWNhbGx5UmVzb2x2ZVZhbHVlKHZhbHVlOiBhbnkgfCBTdGF0aWNhbGx5UmVzb2x2YWJsZSk6IGFueSB7XG4gICAgICAgIGxldCBsYXN0VmFsdWU6IGFueSA9IG51bGw7XG4gICAgICAgIHdoaWxlICh2YWx1ZSAhPT0gbGFzdFZhbHVlICYmIGlzUHJlc2VudCh2YWx1ZSkgJiYgdmFsdWUgaW5zdGFuY2VvZiBTdGF0aWNhbGx5UmVzb2x2YWJsZSkge1xuICAgICAgICAgICAgbGFzdFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmV2YWx1YXRlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdXNoQW5kUmVzb2x2ZVN0YXRpYyhjb250ZXh0VmFsczogTWFwPHN0cmluZywgYW55PiwgcHJvcGVydHlLZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNSZXNvbHZlOiBib29sZWFuKTogYW55IHtcbiAgICAgICAgbGV0IHNjb3BlS2V5OiBzdHJpbmc7XG4gICAgICAgIHRoaXMucHVzaCgpO1xuXG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUoY29udGV4dFZhbHMpLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICgnKicgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGVLZXkgPSBrZXk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHNjb3BlS2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTY29wZUtleShzY29wZUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuYWxsUHJvcGVydGllcygpLmdldChwcm9wZXJ0eUtleSk7XG4gICAgICAgIHZhbCA9IHN0YXRpY1Jlc29sdmUgPyB0aGlzLnN0YXRpY2FsbHlSZXNvbHZlVmFsdWUodmFsKSA6IHRoaXMucmVzb2x2ZVZhbHVlKHZhbCk7XG4gICAgICAgIHRoaXMucG9wKCk7XG5cbiAgICAgICAgcmV0dXJuIHZhbDtcblxuICAgIH1cblxuICAgIHB1c2hBbmRSZXNvbHZlKGNvbnRleHRWYWxzOiBNYXA8c3RyaW5nLCBhbnk+LCBwcm9wZXJ0eUtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaEFuZFJlc29sdmVTdGF0aWMoY29udGV4dFZhbHMsIHByb3BlcnR5S2V5LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gYSAodXNhYmxlKSBzbmFwc2hvdCBvZiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgY29udGV4dFxuICAgIHNuYXBzaG90KCk6IFNuYXBzaG90IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTbmFwc2hvdCh0aGlzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudCBjdXJyZW50IGFjdGl2ZSBhc3NpZ25tZW50IGxpc3QgbWVhbmluZyBpdCB3aWxsIG5vdCBpbmNsdWRlIGFueSBlbnRyaWVzIHdoaWNoXG4gICAgICogd2VyZSBvdmVyd3JpdHRlbiBieSBzb21lIGxhdGUgZW50cnkgaGF2aW5nIHRoZSBzYW1lIGtleS5cbiAgICAgKlxuICAgICAqIEl0IGRvZXMgbm90IGluY2x1ZGUgZW50cmllcyB0aGF0IHdlcmUgcHVzaGVkIHRvIHN0YWNrIGZyb20gYW55IFByb3BlcnR5IC0+IFNlbGVjdG9yXG4gICAgICogcHJvcGFnYXRpb24uIFRoaXMgY3JlYXRlcyBzaGVsbCBjb3B5IGFuZCBpZ25vcmluZyBhbGwgbGFzdCBNYXRjaGVzIHdoaWNoIGNvdWxkIGJlIGZyb21cbiAgICAgKiBzb21lIHByZXZpb3VzIGFzc2lnbm1lbnRzIHRoYXQgYXJlIG5vdyByZXBsYWNlZCB3aXRoIHNvbWUgbmV3IG9uZXNcbiAgICAgKlxuICAgICAqL1xuICAgIGFjdGl2ZUFzc2lnbm1lbnRzKCk6IEFycmF5PEFzc2lnbm1lbnRTbmFwc2hvdD4ge1xuXG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxBc3NpZ25tZW50U25hcHNob3Q+ID0gbmV3IEFycmF5PEFzc2lnbm1lbnRTbmFwc2hvdD4oKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IHRoaXMuX2VudHJpZXMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmVjOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIGlmIChyZWMubWFza2VkQnlJZHggPT09IDAgJiYgIXJlYy5zcmVjLmZyb21DaGFpbmluZykge1xuICAgICAgICAgICAgICAgIGxldCBhOiBBc3NpZ25tZW50U25hcHNob3QgPSBuZXcgQXNzaWdubWVudFNuYXBzaG90KCk7XG4gICAgICAgICAgICAgICAgYS5rZXkgPSByZWMuc3JlYy5rZXk7XG4gICAgICAgICAgICAgICAgYS52YWx1ZSA9IHJlYy52YWw7XG4gICAgICAgICAgICAgICAgYS5zYWxpZW5jZSA9IHJlYy5zcmVjLnNhbGllbmNlO1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaChhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2ltaWxhciBhcyA8Y29kZT5hY3RpdmVBc3NpZ25tZW50czwvY29kZT4gYnV0IGRvIGluY2x1ZGUgYWxzbyB0aG9zZSB0aGF0IHdlcmUgcmVwbGFjZWQgbGF0ZXJcbiAgICAgKiBvbiB3aXRoIGFzc2lnbm1lbnRzIGhhdmluZyB0aGUgc2FtZSBrZXkuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG5lZWRlZCBmb3IgY2FzZXMgd2hlcmUgd2UgbmVlZCB0byBoYXZlIGRlZXAgY29weSBvZiBjdXJyZW50IHN0YXRlIGFsb25nIHdpdGhcbiAgICAgKiBhbGwgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqL1xuICAgIGFsbEFzc2lnbm1lbnRzKCk6IEFycmF5PEFzc2lnbm1lbnRTbmFwc2hvdD4ge1xuXG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxBc3NpZ25tZW50U25hcHNob3Q+ID0gbmV3IEFycmF5PEFzc2lnbm1lbnRTbmFwc2hvdD4oKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IHRoaXMuX2VudHJpZXMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmVjOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIGlmICghcmVjLnNyZWMuZnJvbUNoYWluaW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGE6IEFzc2lnbm1lbnRTbmFwc2hvdCA9IG5ldyBBc3NpZ25tZW50U25hcHNob3QoKTtcbiAgICAgICAgICAgICAgICBhLmtleSA9IHJlYy5zcmVjLmtleTtcbiAgICAgICAgICAgICAgICBhLnZhbHVlID0gcmVjLnZhbDtcbiAgICAgICAgICAgICAgICBhLnNhbGllbmNlID0gcmVjLnNyZWMuc2FsaWVuY2U7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuXG4gICAgX3NldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgbWVyZ2U6IGJvb2xlYW4sIGNoYWluaW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGxldCBzdmFsID0gdGhpcy5fbWV0YS50cmFuc2Zvcm1WYWx1ZShrZXksIHZhbHVlKTtcbiAgICAgICAgbGV0IGRpZFNldCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCByZWdpc3RyeSA9ICg8VUlNZXRhPnRoaXMubWV0YSkuY29tcG9uZW50UmVnaXN0cnk7XG4gICAgICAgIGlmIChrZXkgPT09IE9iamVjdE1ldGEuS2V5T2JqZWN0ICYmIGlzUHJlc2VudChyZWdpc3RyeSkpIHtcbiAgICAgICAgICAgIHJlZ2lzdHJ5LnJlZ2lzdGVyVHlwZShjbGFzc05hbWUodmFsdWUpLCB2YWx1ZS5jb25zdHJ1Y3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0aXZhdGlvbjogQWN0aXZhdGlvbiA9IHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uLmdldENoaWxkQWN0aXZhdGlvbihrZXksIHN2YWwsXG4gICAgICAgICAgICBjaGFpbmluZyk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoYWN0aXZhdGlvbikpIHtcbiAgICAgICAgICAgIGRpZFNldCA9IHRoaXMuX2NyZWF0ZU5ld0ZyYW1lRm9yU2V0KGtleSwgc3ZhbCwgdmFsdWUsIG1lcmdlLCBjaGFpbmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJlc2VudChhY3RpdmF0aW9uKSkge1xuICAgICAgICAgICAgZGlkU2V0ID0gdGhpcy5fYXBwbHlBY3RpdmF0aW9uKGFjdGl2YXRpb24sIHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaWRTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuYXdha2VDdXJyZW50QWN0aXZhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3Q29udGV4dFJlYygpOiBBc3NpZ25tZW50IHtcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5fcmVjUG9vbC5sZW5ndGg7XG4gICAgICAgIHJldHVybiAoY291bnQgPiAwKSA/IHRoaXMuX3JlY1Bvb2wuc3BsaWNlKGNvdW50IC0gMSwgMSlbMF0gOiBuZXcgQXNzaWdubWVudCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FjaGVkIGNhc2U6IGFwcGx5IGEgcHJldmlvdXNseSBjb21wdXRlZCBBY3RpdmF0aW9uXG4gICAgICovXG4gICAgX2FwcGx5QWN0aXZhdGlvbihhY3RpdmF0aW9uOiBBY3RpdmF0aW9uLCBmaXJzdFZhbDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGFzc2VydChhY3RpdmF0aW9uLl9wYXJlbnQgPT09IHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uLFxuICAgICAgICAgICAgJ0F0dGVtcHQgdG8gYXBwbHkgYWN0aXZhdGlvbiBvbiBtaXNtYXRjaGVkIHBhcmVudCcpO1xuXG4gICAgICAgIGlmICh0aGlzLl9lbnRyaWVzLmxlbmd0aCAhPT0gYWN0aXZhdGlvbi5fb3JpZ0VudHJ5Q291bnQpIHtcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSxcbiAgICAgICAgICAgICAgICAnTWlzbWF0Y2hlZCBjb250ZXh0IHN0YWNrIHNpemUgKCVzKSBmcm9tIHdoZW4gYWN0aXZhdGlvbiB3YXMgcG9wcGVkICcgK1xuICAgICAgICAgICAgICAgIHRoaXMuX2VudHJpZXMubGVuZ3RoICsgJyAnICsgYWN0aXZhdGlvbi5fb3JpZ0VudHJ5Q291bnQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IGFjdGl2YXRpb24uX3JlY3MubGVuZ3RoO1xuICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcmVjOiBTdGF0aWNSZWMgPSBhY3RpdmF0aW9uLl9yZWNzW2ldO1xuICAgICAgICAgICAgbGV0IHJlYzogQXNzaWdubWVudCA9IHRoaXMubmV3Q29udGV4dFJlYygpO1xuICAgICAgICAgICAgcmVjLnNyZWMgPSBzcmVjO1xuXG4gICAgICAgICAgICAvLyBBcHBseSBtYXNraW5nIGZvciBhbnkgcHJvcGVydHkgdGhhdCB3ZSBtYXNrIG91dFxuICAgICAgICAgICAgaWYgKHNyZWMubGFzdEFzc2lnbm1lbnRJZHggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlcGFyZUZvck92ZXJyaWRlKHRoaXMuX2VudHJpZXMubGVuZ3RoLCBzcmVjLmxhc3RBc3NpZ25tZW50SWR4KTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICByZWMudmFsID0gKGkgPT09IDAgJiYgIXRoaXMubWV0YS5pc051bGxNYXJrZXIoZmlyc3RWYWwpKSA/IGZpcnN0VmFsIDogc3JlYy52YWw7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMuc2V0KHNyZWMua2V5LCByZWMudmFsKTtcbiAgICAgICAgICAgIHRoaXMuX2VudHJpZXMucHVzaChyZWMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uID0gYWN0aXZhdGlvbjtcbiAgICAgICAgdGhpcy5fY3VycmVudFByb3BlcnRpZXMgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBhd2FrZUN1cnJlbnRBY3RpdmF0aW9uKCk6IHZvaWQge1xuICAgICAgICAvLyBTZWUgaWYgdGhpcyBhY3RpdmF0aW9uIHJlcXVpcmVzIGZ1cnRoZXIgY2hhaW5pbmdcbiAgICAgICAgbGV0IGN1cnJlbnRBY3RpdmF0aW9uID0gdGhpcy5fY3VycmVudEFjdGl2YXRpb247XG4gICAgICAgIGxldCBkZWZlcnJlZEFzc2lnbm1lbnRzOiBBcnJheTxEZWZlcnJlZEFzc2lnbm1lbnQ+ID0gY3VycmVudEFjdGl2YXRpb24uZGVmZXJyZWRBc3NpZ25tZW50cztcbiAgICAgICAgaWYgKGlzUHJlc2VudChkZWZlcnJlZEFzc2lnbm1lbnRzKSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseURlZmVycmVkQXNzaWdubWVudHMoZGVmZXJyZWRBc3NpZ25tZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5RGVmZXJyZWRBc3NpZ25tZW50cyhkZWZlcnJlZEFzc2lnbm1lbnRzOiBBcnJheTxEZWZlcnJlZEFzc2lnbm1lbnQ+KTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGRhIG9mICBkZWZlcnJlZEFzc2lnbm1lbnRzKSB7XG4gICAgICAgICAgICAvLyB2ZXJpZnkgdGhhdCBkZWZlcnJlZCB2YWx1ZSBzdGlsbCBhcHBsaWVzXG4gICAgICAgICAgICBsZXQgY3VycmVudFByb3BWYWx1ZSA9IHRoaXMuc3RhdGljYWxseVJlc29sdmVWYWx1ZSh0aGlzLmFsbFByb3BlcnRpZXMoKS5nZXQoZGEua2V5KSk7XG5cbiAgICAgICAgICAgIGlmIChkYS52YWx1ZSA9PT0gY3VycmVudFByb3BWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlc29sdmVkVmFsdWUgPSB0aGlzLnJlc29sdmVWYWx1ZShkYS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXQoZGEua2V5LCByZXNvbHZlZFZhbHVlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHByaW50KCdfc2V0IFNLSVBQSU5HIGRlZmVycmVkIGFzc2lnbm1lbnQgb2YgZGVyaXZlZCB2YWx1ZTogJXMgPC0gJXMgLS0nICtcbiAgICAgICAgICAgICAgICAvLyAgICAgJyBubyBsb25nZXIgbWF0Y2hlcyBwcm9wZXJ0eSBpbiBjb250ZXh0OiAlcycgLCBkYS5rZXkgLCBkYS52YWx1ZSAsXG4gICAgICAgICAgICAgICAgLy8gY3VycmVudFByb3BWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIF9pbkRlY2xhcmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBtYXRjaDogTWF0Y2hSZXN1bHQgPSB0aGlzLmxhc3RNYXRjaFdpdGhvdXRDb250ZXh0UHJvcHMoKTtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudChtYXRjaCkgJiYgKG1hdGNoLl9rZXlzTWF0Y2hlZE1hc2sgJiB0aGlzLl9tZXRhLmRlY2xhcmVLZXlNYXNrKSAhPT0gMDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICBOb24tY2FjaGVkIGFjY2VzczogY3JlYXRlIGEgbmV3IGFjdGl2YXRpb25cbiAgICAgKi9cbiAgICBfY3JlYXRlTmV3RnJhbWVGb3JTZXQoa2V5OiBzdHJpbmcsIHN2YWx1ZTogYW55LCB2YWx1ZTogYW55LCBtZXJnZTogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhaW5pbmc6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbGFzdEFjdGl2YXRpb246IEFjdGl2YXRpb24gPSB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbjtcbiAgICAgICAgbGV0IG5ld0FjdGl2YXRpb246IEFjdGl2YXRpb24gPSBuZXcgQWN0aXZhdGlvbihsYXN0QWN0aXZhdGlvbik7XG4gICAgICAgIG5ld0FjdGl2YXRpb24uX29yaWdFbnRyeUNvdW50ID0gdGhpcy5fZW50cmllcy5sZW5ndGg7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uID0gbmV3QWN0aXZhdGlvbjtcblxuICAgICAgICAvLyBzZXQgdGhpcyB2YWx1ZVxuICAgICAgICBsZXQgZGlkU2V0OiBib29sZWFuID0gdGhpcy5fc2V0MihrZXksIHN2YWx1ZSwgdmFsdWUsIG1lcmdlLCBjaGFpbmluZyk7XG4gICAgICAgIC8vIG1pcnJvciBwcm9wZXJ0aWVzXG4gICAgICAgIGlmIChkaWRTZXQpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9jaGVja0FwcGx5UHJvcGVydGllcygpKSB7XG4gICAgICAgICAgICAgICAgLyogcmVwZWF0ICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1lbWJlciBmb3IgdGhlIGZ1dHVyZVxuICAgICAgICBpZiAoQ29udGV4dC5fQ2FjaGVBY3RpdmF0aW9ucykge1xuICAgICAgICAgICAgbGFzdEFjdGl2YXRpb24uY2FjaGVDaGlsZEFjdGl2YXRpb24oa2V5LCBzdmFsdWUsIG5ld0FjdGl2YXRpb24sIGNoYWluaW5nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbiA9IChkaWRTZXQpID8gbmV3QWN0aXZhdGlvbiA6IGxhc3RBY3RpdmF0aW9uO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEFjdGl2YXRpb24gIT09IGxhc3RBY3RpdmF0aW9uO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGxhemlseSB0byBjb21wdXRlIHRoZSBwcm9wZXJ0eSBhY3RpdmF0aW9uIGZvciB0aGlzIGFjdGl2YXRpb25cbiAgICAgKiBDb21wdXRlIHRoZSBzdGF0aWMgcGFydCBvZiB0aGUgcHJvcGVydHkgYWN0aXZhdGlvblxuICAgICAqIHdlIGFjY3VtdWxhdGUgdGhlIHByb3BlcnR5IHNldHRpbmdzIG9uIGEgc2lkZSBhY3RpdmF0aW9uIG9mZiB0aGUgbWFpbiBzdGFja1xuICAgICAqIGFuZCBhcHBseSBpdCB2aXJ0dWFsbHkgaWYgb3VyIHBhcmVudCBpcyBub3QgY292ZXJlZFxuICAgICAqICAodGhhdCB3YXkgd2UgZG9uJ3QgaGF2ZSB0byBhcHBseSBhbmQgdW5hcHBseSBhbGwgdGhlIHRpbWUpXG4gICAgICovXG4gICAgX2NyZWF0ZU5ld1Byb3BlcnR5Q29udGV4dEFjdGl2YXRpb24ocGFyZW50QWN0aXZhdGlvbjogQWN0aXZhdGlvbik6IEFjdGl2YXRpb24ge1xuXG4gICAgICAgIHRoaXMucHVzaCgpO1xuICAgICAgICBsZXQgcHJvcEFjdGl2YXRpb246IEFjdGl2YXRpb24gPSBuZXcgQWN0aXZhdGlvbihwYXJlbnRBY3RpdmF0aW9uKTtcbiAgICAgICAgcHJvcEFjdGl2YXRpb24uX29yaWdFbnRyeUNvdW50ID0gdGhpcy5fZW50cmllcy5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2YXRpb24gPSBwcm9wQWN0aXZhdGlvbjtcbiAgICAgICAgbGV0IG9yaWdWYWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgbGV0IG5lc3RlZE1hcDogTmVzdGVkTWFwPHN0cmluZywgYW55PiA9IG5ldyBOZXN0ZWRNYXA8c3RyaW5nLCBhbnk+KG9yaWdWYWx1ZXMpO1xuICAgICAgICB0aGlzLl92YWx1ZXMgPSBuZXN0ZWRNYXA7XG4gICAgICAgIHRoaXMuYXBwbHlQcm9wZXJ0eUNvbnRleHRBbmRDaGFpbigpO1xuXG4gICAgICAgIGlmIChwcm9wQWN0aXZhdGlvbi5fcmVjcy5sZW5ndGggPiAwIHx8IGlzUHJlc2VudChwcm9wQWN0aXZhdGlvbi5kZWZlcnJlZEFzc2lnbm1lbnRzKSkge1xuICAgICAgICAgICAgcHJvcEFjdGl2YXRpb24uX25lc3RlZFZhbHVlcyA9IG5lc3RlZE1hcDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IENvbnRleHQuRW1wdHlSZW1vdmVNYXA7ICAvLyBoYWNrIC0tIGVtcHR5IG1hcCBzbyB0aGF0IHVuZG8gaXMgbm9vcCAtLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICgoTmVzdGVkTWFwKV92YWx1ZXMpLmR1cCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvcEFjdGl2YXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9wKCk7XG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9IG9yaWdWYWx1ZXM7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uID0gcGFyZW50QWN0aXZhdGlvbjtcblxuICAgICAgICByZXR1cm4gcHJvcEFjdGl2YXRpb247XG4gICAgfVxuXG4gICAgX2FwcGx5UHJvcGVydHlBY3RpdmF0aW9uKHByb3BBY3RpdmF0aW9uOiBBY3RpdmF0aW9uLCByZWM6IEFzc2lnbm1lbnQpIHtcbiAgICAgICAgbGV0IHByb3BWYWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgIGlmIChpc1ByZXNlbnQocHJvcEFjdGl2YXRpb24uX25lc3RlZFZhbHVlcykpIHtcbiAgICAgICAgICAgIHByb3BWYWx1ZXMgPSBwcm9wQWN0aXZhdGlvbi5fbmVzdGVkVmFsdWVzLnJlcGFyZW50ZWRNYXAocHJvcFZhbHVlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgdXAgcHJvcExvY2FsIHJlc3VsdHNcbiAgICAgICAgLy8gTm93LCBzZWUgaWYgd2UgbmVlZCB0byBjb21wdXRlIGEgZHluYW1pYyBwcm9wZXJ0eSBhY3RpdmF0aW9uIGFzIHdlbGxcbiAgICAgICAgaWYgKGlzUHJlc2VudChwcm9wQWN0aXZhdGlvbi5kZWZlcnJlZEFzc2lnbm1lbnRzKSkge1xuICAgICAgICAgICAgdGhpcy5wdXNoKCk7XG4gICAgICAgICAgICAvLyBuZXN0IGEgZHluYW1pYyBuZXN0ZWQgbWFwIG9uIG91ciBzdGF0aWMgbmVzdGVkIG1hcCAod2hpY2ggaXMgb24gb3VyIGxhc3QgZHluYW1pY1xuICAgICAgICAgICAgLy8gbmVzdGVkIG1hcC4uLilcbiAgICAgICAgICAgIGxldCBvcmlnVmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gbmV3IE5lc3RlZE1hcDxzdHJpbmcsIGFueT4ocHJvcFZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLl9hcHBseUFjdGl2YXRpb24ocHJvcEFjdGl2YXRpb24sIE1ldGEuTnVsbE1hcmtlcik7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RGVmZXJyZWRBc3NpZ25tZW50cyhwcm9wQWN0aXZhdGlvbi5kZWZlcnJlZEFzc2lnbm1lbnRzKTtcblxuICAgICAgICAgICAgcmVjLl9wcm9wZXJ0eUxvY2FsVmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgcmVjLl9wcm9wZXJ0eUxvY2FsU3JlYyA9IExpc3RXcmFwcGVyLmxhc3QodGhpcy5fZW50cmllcykuc3JlYztcblxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gQ29udGV4dC5FbXB0eVJlbW92ZU1hcDsgIC8vIGhhY2sgLS0gZW1wdHkgbWFwIHNvIHRoYXQgdW5kbyBpcyBub29wIC0tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKChOZXN0ZWRNYXApX3ZhbHVlcykuZHVwKCk7XG4gICAgICAgICAgICB0aGlzLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gb3JpZ1ZhbHVlcztcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2FuIHVzZSBzdGF0aWMgdmVyc2lvbnNcbiAgICAgICAgICAgIHJlYy5fcHJvcGVydHlMb2NhbFZhbHVlcyA9IHByb3BWYWx1ZXM7XG4gICAgICAgICAgICByZWMuX3Byb3BlcnR5TG9jYWxTcmVjID0gTGlzdFdyYXBwZXIubGFzdChwcm9wQWN0aXZhdGlvbi5fcmVjcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0b2RvOiBhbnkgZXF1YWxzIG9sZCB2YSA9PT0gbmV3IHZhbFxuICAgIF9pc05ld1ZhbHVlKG9sZFZhbDogYW55LCBuZXdWYWw6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKG9sZFZhbCAhPT0gbmV3VmFsICYmIChpc1ByZXNlbnQob2xkVmFsKSB8fFxuICAgICAgICAgICAgKCFvbGRWYWwgPT09IG5ld1ZhbCAmJiAoIWlzQXJyYXkob2xkVmFsKSkgfHwgIShMaXN0V3JhcHBlci5jb250YWlucyhvbGRWYWwsIG5ld1ZhbCkpKSkpO1xuICAgIH1cblxuXG4gICAgaXNEZWNsYXJlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMucHJvcGVydHlGb3JLZXkoTWV0YS5LZXlEZWNsYXJlKSk7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgYXNzZXJ0Q29udGV4dENvbnNpc3RlbnQoKTogdm9pZCB7XG4gICAgICAgIGlmICghQ29udGV4dC5fRXhwZW5zaXZlQ29udGV4dENvbnNpc3RlbmN5Q2hlY2tzRW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVmVyaWZ5IHRoYXQgZWFjaCB2YWx1ZSBpbiBjb250ZXh0IGhhcyBtYXRjaGluZyAoZW5hYmxlZCkgY29udGV4dCByZWNvcmRcblxuXG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUodGhpcy5fdmFsdWVzKS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBsZXQgbGFzdEFzc2lnbm1lbnRJZHggPSB0aGlzLmZpbmRMYXN0QXNzaWdubWVudE9mS2V5KGtleSk7XG4gICAgICAgICAgICBhc3NlcnQobGFzdEFzc2lnbm1lbnRJZHggPj0gMCwgJ1ZhbHVlIGluIGNvbnRleHQgYnV0IG5vIGFzc2lnbm1lbnQgcmVjb3JkIGZvdW5kICcgK1xuICAgICAgICAgICAgICAgIGtleSArICcgPSAnICsgdmFsdWUpO1xuXG4gICAgICAgICAgICBsZXQgY29udGV4dFZhbCA9IHRoaXMuX2VudHJpZXNbbGFzdEFzc2lnbm1lbnRJZHhdLnZhbDtcblxuICAgICAgICAgICAgYXNzZXJ0KHZhbHVlID09PSBjb250ZXh0VmFsIHx8IChpc1ByZXNlbnQodmFsdWUpICYmIHZhbHVlID09PSBjb250ZXh0VmFsKSxcbiAgICAgICAgICAgICAgICAnVmFsdWUgaW4gY29udGV4dCAgZG9lc250IG1hdGNoIHZhbHVlIG9uIHN0YWNrICcgKyB2YWx1ZSArICcgLyAnICsgY29udGV4dFZhbCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2sgZW50cmllcyBmb3IgcHJvcGVyIHJlbGF0aW9uc2hpcCB3aXRoIGFueSBwcmV2aW91cyByZWNvcmRzIHRoYXQgdGhleSBvdmVycmlkZVxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHI6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuICAgICAgICAgICAgbGV0IGZvdW5kRmlyc3QgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgIGxldCBwcmVkOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAocHJlZC5zcmVjLmtleSA9PT0gci5zcmVjLmtleSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBQcmVkZWNlc3NvcnMgbXVzdCBiZSBtYXNrZWRcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KCghZm91bmRGaXJzdCAmJiBwcmVkLm1hc2tlZEJ5SWR4ID09PSBpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKChmb3VuZEZpcnN0IHx8IHByZWQuc3JlYy5mcm9tQ2hhaW5pbmcpICYmIHByZWQubWFza2VkQnlJZHggPiAwKSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgJ1ByZWRlY2Vzc29yIEEgZG9lcyBub3QgaGF2ZSBtYXRjaGluZyBtYXNrZWRCeUlkeCBCICBmb3Igb3ZlcnJpZGUgQzonICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWQuc3JlYy5rZXkgKyAnID0gJyArIHByZWQudmFsICsgJywgJyArIHByZWQubWFza2VkQnlJZHggKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKyAnID0gJyArIHIudmFsXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KCgoIWZvdW5kRmlyc3QgJiYgci5zcmVjLmxhc3RBc3NpZ25tZW50SWR4ID09PSBqKSB8fCBmb3VuZEZpcnN0IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVkLnNyZWMuZnJvbUNoYWluaW5nKSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgJ092ZXJyaWRlIEExPUEyIGRvZXMgbm90IGhhdmUgcHJvcGVyIGxhc3RBc3NpZ25tZW50SWR4IEIxIT1CMiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdmb3IgcHJlZGVjZXNzb3IgQycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZC5zcmVjLmtleSArICcgPSAnICsgcHJlZC52YWwgKyAnLCAnICsgci5zcmVjLmxhc3RBc3NpZ25tZW50SWR4ICsgJyA9ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgaiArICcsICcgKyBwcmVkLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kRmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgX3NldDIoa2V5OiBzdHJpbmcsIHN2YWx1ZTogYW55LCB2YWx1ZTogYW55LCBtZXJnZTogYm9vbGVhbiwgaXNDaGFpbmluZzogYm9vbGVhbik6IGJvb2xlYW4ge1xuXG4gICAgICAgIENvbnRleHQuX0RlYnVnX1NldHNDb3VudCsrO1xuICAgICAgICAvLyBwcmludCgnU2V0dGluZyBrZXkvdmFsZSBvbnRvIHN0YWNrOiAnICsga2V5ICsgJz0nICsgdmFsdWUpO1xuICAgICAgICBsZXQgaGFzT2xkVmFsdWUgPSB0aGlzLl92YWx1ZXMuaGFzKGtleSkgJiYgaXNQcmVzZW50KHRoaXMuX3ZhbHVlcy5nZXQoa2V5KSk7XG4gICAgICAgIGxldCBvbGRWYWwgPSBoYXNPbGRWYWx1ZSA/IHRoaXMuX3ZhbHVlcy5nZXQoa2V5KSA6IG51bGw7XG5cbiAgICAgICAgbGV0IGlzTmV3VmFsdWUgPSAhaGFzT2xkVmFsdWUgfHwgdGhpcy5faXNOZXdWYWx1ZShvbGRWYWwsIHZhbHVlKTtcblxuICAgICAgICBsZXQgbWF0Y2hpbmdQcm9wS2V5QXNzaWdubWVudCA9ICFpc05ld1ZhbHVlICYmICFpc0NoYWluaW5nICYmXG4gICAgICAgICAgICAoKHRoaXMuX21ldGEua2V5RGF0YShrZXkpLmlzUHJvcGVydHlTY29wZSkgJiZcbiAgICAgICAgICAgICAgICBrZXkgIT09IHRoaXMuX2N1cnJlbnRQcm9wZXJ0eVNjb3BlS2V5KCkpO1xuICAgICAgICBpZiAoaXNOZXdWYWx1ZSB8fCBtYXRjaGluZ1Byb3BLZXlBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICBsZXQgbGFzdE1hdGNoOiBNYXRjaFJlc3VsdDtcbiAgICAgICAgICAgIGxldCBuZXdNYXRjaDogTWF0Y2hSZXN1bHQ7XG5cbiAgICAgICAgICAgIGxldCBzYWxpZW5jZSA9IHRoaXMuX2ZyYW1lU3RhcnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBsYXN0QXNzaWdubWVudElkeCA9IC0xO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsob2xkVmFsKSkge1xuICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IHRoaXMubGFzdE1hdGNoV2l0aG91dENvbnRleHRQcm9wcygpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdlIHJlY29tcHV0ZSB0aGF0IG1hdGNoIHVwIHRvIHRoaXMgcG9pbnQgYnkgcmVjb21wdXRpbmcgZm9yd2FyZFxuICAgICAgICAgICAgICAgIC8vIGZyb20gdGhlIHBvaW50IG9mIHRoZSBsYXN0IGFzc2lnbm1lbnQgdG8gdGhpcyBrZXkgKHNraXBwaW5nIGl0KSwgdGhlblxuICAgICAgICAgICAgICAgIC8vIG1hdGNoIGFnYWluc3QgdGhlIGFycmF5IG9mIG91ciB2YWx1ZSBhbmQgdGhlIG9sZFxuXG4gICAgICAgICAgICAgICAgbGV0IHJlY0lkeCA9IHRoaXMuX2VudHJpZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGxhc3RBc3NpZ25tZW50SWR4ID0gdGhpcy5maW5kTGFzdEFzc2lnbm1lbnRPZktleShrZXkpO1xuICAgICAgICAgICAgICAgIGFzc2VydChsYXN0QXNzaWdubWVudElkeCA+PSAwLFxuICAgICAgICAgICAgICAgICAgICAnVmFsdWUgaW4gY29udGV4dCBidXQgbm8gYXNzaWdubWVudCByZWNvcmQgZm91bmQgJyArIGtleSArICcgPSAnICsgb2xkVmFsKTtcblxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ1Byb3BLZXlBc3NpZ25tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWFwIHZlcnNpb24gb2YgbWFza2luZyBmb3IgYSBtYXRjaGluZyBzZXQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VudHJpZXNbbGFzdEFzc2lnbm1lbnRJZHhdLm1hc2tlZEJ5SWR4ID0gcmVjSWR4O1xuICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2ggPSB0aGlzLmxhc3RNYXRjaFdpdGhvdXRDb250ZXh0UHJvcHMoKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJlIGFibGUgdG8gb3ZlcnJpZGUgYSBub24tY2hhaW5pbmcgYXNzaWdubWVudC4gIE91ciBwcm9ibGVtIGlzLCB0aG91Z2gsIGlmXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBkZXZlbG9wZXIgd2FudGVkIHRvIGZvcmNlIGEgcmUtYXNzaWdubWVudCBpbiB0aGUgbmV3IGZyYW1lLCB3ZSdkIGZpbHRlclxuICAgICAgICAgICAgICAgICAgICAvLyBpdCBvdXQgYXMgYSBkdXBsaWNhdGUgYXNzaWdubWVudCBhYm92ZS4gIE5vdywgd2UgY291bGQgYWxsb3cgdGhhdCBhc3NpZ25tZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIHRocm91Z2gsIGJ1dCBpdCB3b3VsZCB0aGVuIGJyZWFrIGlubGV0aWFudHMgd2hlbiBzZWFyY2hpbmcgYmFjayB0byBtYXNrIGFcbiAgICAgICAgICAgICAgICAgICAgLy8ga2V5ICh3ZSB3b3VsZG4ndCByZWFsaXplIHRoYXQgd2UgbmVlZCB0byBnbyBmdXJ0aGVyIGJhY2sgdG8gZmluZCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgb25lKS5cblxuICAgICAgICAgICAgICAgICAgICBsZXQgb2xkUmVjOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tsYXN0QXNzaWdubWVudElkeF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFJlYy5zcmVjLnNhbGllbmNlID09PSBzYWxpZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByZXYgPSB0aGlzLmZpbmRMYXN0QXNzaWdubWVudE9mS2V5V2l0aFZhbHVlKGtleSwgdmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldiAhPT0gLTEgJiYgdGhpcy5fZW50cmllc1twcmV2XS5zcmVjLnNhbGllbmNlID09PSBzYWxpZW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0NoYWluaW5nICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAob2xkUmVjLnNyZWMuc2FsaWVuY2UgPiBzYWxpZW5jZSB8fCAhb2xkUmVjLnNyZWMuZnJvbUNoYWluaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpbnQoJ1NldCBvZiBrZXkgc2tpcHBlZCAoc2FsaWVuY2UgJXMgPD0gJXMpJyArIGtleSArICcsICcgKyBvbGRWYWwgK1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJywgJyArIHZhbHVlICsgJywgJyArIHNhbGllbmNlICsgJywgJyArIG9sZFJlYy5zcmVjLnNhbGllbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RBc3NpZ25tZW50SWR4ID0gdGhpcy5fcHJlcGFyZUZvck92ZXJyaWRlKHJlY0lkeCwgbGFzdEFzc2lnbm1lbnRJZHgpO1xuICAgICAgICAgICAgICAgICAgICBuZXdNYXRjaCA9IHRoaXMuX3JlbWF0Y2hGb3JPdmVycmlkZShrZXksIHN2YWx1ZSwgcmVjSWR4LCBmaXJzdEFzc2lnbm1lbnRJZHgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXJnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBNZXRhLlByb3BlcnR5TWVyZ2VyX0xpc3QubWVyZ2Uob2xkVmFsLCB2YWx1ZSwgdGhpcy5pc0RlY2xhcmUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzc2VydCh0aGlzLl9lbnRyaWVzLmxlbmd0aCA8PSBDb250ZXh0Lk1heENvbnRleHRTdGFja1NpemUsXG4gICAgICAgICAgICAgICAgJ01ldGFVSSBjb250ZXh0IHN0YWNrIGV4Y2VlZGVkIG1heCBzaXplIC0tIGxpa2VseSBpbmZpbml0ZSBjaGFpbmluZzogJyArXG4gICAgICAgICAgICAgICAgdGhpcy5fZW50cmllcy5sZW5ndGhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsZXQgc3JlYzogU3RhdGljUmVjID0gbmV3IFN0YXRpY1JlYygpO1xuICAgICAgICAgICAgc3JlYy5rZXkgPSBrZXk7XG4gICAgICAgICAgICAvLyB0b2RvOiBjb252ZXJzaW9uXG4gICAgICAgICAgICBzcmVjLnZhbCA9IHN2YWx1ZTtcbiAgICAgICAgICAgIHNyZWMubGFzdEFzc2lnbm1lbnRJZHggPSBsYXN0QXNzaWdubWVudElkeDtcbiAgICAgICAgICAgIHNyZWMuc2FsaWVuY2UgPSBzYWxpZW5jZTtcbiAgICAgICAgICAgIHNyZWMuZnJvbUNoYWluaW5nID0gaXNDaGFpbmluZztcblxuICAgICAgICAgICAgaWYgKGlzQmxhbmsobmV3TWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgbmV3TWF0Y2ggPSAoaXNQcmVzZW50KHZhbHVlKSkgPyB0aGlzLl9tZXRhLm1hdGNoKGtleSwgc3ZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2gpIDogbGFzdE1hdGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3JlYy5tYXRjaCA9IG5ld01hdGNoO1xuICAgICAgICAgICAgc3JlYy5hY3RpdmF0aW9uID0gdGhpcy5fY3VycmVudEFjdGl2YXRpb247XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbi5fcmVjcy5wdXNoKHNyZWMpO1xuXG4gICAgICAgICAgICBsZXQgcmVjID0gdGhpcy5uZXdDb250ZXh0UmVjKCk7XG4gICAgICAgICAgICByZWMuc3JlYyA9IHNyZWM7XG4gICAgICAgICAgICByZWMudmFsID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9lbnRyaWVzLnB1c2gocmVjKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQcm9wZXJ0aWVzID0gbnVsbDtcblxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzLnNldChrZXksIHZhbHVlKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coIHRoaXMuZGVidWdOYW1lICsgJyA9PiAnICtcbiAgICAgICAgICAgIC8vICAgICAnUHVzaCgnICsga2V5ICsgJywgJyArIHN2YWx1ZSArICcpOiAnICsgJ01hdGNoZXM6ICcgKyBuZXdNYXRjaC5tYXRjaGVzKCkubGVuZ3RoXG4gICAgICAgICAgICAvLyAgICAgKyAnLCBQcm9wTWFwOiAnICsgc3JlYy5wcm9wZXJ0aWVzKCkuc2l6ZSk7XG5cbiAgICAgICAgICAgIGlmIChDb250ZXh0Ll9EZWJ1Z1J1bGVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tNYXRjaChzcmVjLm1hdGNoLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0Q29udGV4dENvbnNpc3RlbnQoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBwcmludCgnQ29udGV4dCBza2lwcGVkIGFzc2lnbm1lbnQgb2YgbWF0Y2hpbmcgcHJvcGVydHkgdmFsdWUgJXMgPSAlcyAoaXNDaGFpbmluZyA9PVxuICAgICAgICAgICAgLy8gJXMsIGlzUHJvcEtleSA9PSAlcyknLCBrZXksIHZhbHVlLCBpc0NoYWluaW5nLFxuICAgICAgICAgICAgLy8gKHRoaXMuX21ldGEua2V5RGF0YShrZXkpLmlzUHJvcGVydHlTY29wZSkpO1xuXG4gICAgICAgICAgICBpZiAoIWlzQ2hhaW5pbmcgJiYgdGhpcy5tZXRhLmtleURhdGEoa2V5KS5pc1Byb3BlcnR5U2NvcGUpIHtcbiAgICAgICAgICAgICAgICAvLyBzbGFtIGRvd24gYSByZWMgZm9yIHByb3BlcnR5IGNvbnRleHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBnZXQgZnJhbWVTdGFydHMoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWVTdGFydHM7XG4gICAgfVxuXG4gICAgX3VuZG9SZWNWYWx1ZShyZWM6IEFzc2lnbm1lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHJlYy5zcmVjLmxhc3RBc3NpZ25tZW50SWR4ID09PSAtMSB8fFxuICAgICAgICAgICAgdGhpcy5fZW50cmllc1tyZWMuc3JlYy5sYXN0QXNzaWdubWVudElkeF0ubWFza2VkQnlJZHggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMuZGVsZXRlKHJlYy5zcmVjLmtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMuc2V0KHJlYy5zcmVjLmtleSwgdGhpcy5fZW50cmllc1tyZWMuc3JlYy5sYXN0QXNzaWdubWVudElkeF0udmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gVW5kb2VzIGFuZCBtYXNrcyBhc3NpZ25tZW50cyBpbnZhbGlkYXRlZCBieSBvdmVycmlkZSBvZiBnaXZlbiByZWNvcmRcbiAgICAvLyBSZXR1cm5zIHN0YWNrIGluZGV4IGZvciBmaXJzdCBhc3NpZ25tZW50IChpLmUuIHdoZXJlIG1hdGNoIHJlY29tcHV0YXRpb24gbXVzdCBzdGFydClcbiAgICBfcHJlcGFyZUZvck92ZXJyaWRlKG92ZXJyaWRlSW5kZXg6IG51bWJlciwgbGFzdEFzc2lnbm1lbnRJZHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIC8vIGlmIHdlJ3JlIG92ZXJyaWRpbmcgYSBwcm9wIGNvbnRleHQgb3ZlcnJpZGUgb2YgYSBtYXRjaGluZyB2YWx1ZSwgYmFjayB1cCBmdXJ0aGVyXG4gICAgICAgIGxldCBsYXN0TGFzdElkeCA9IDA7XG4gICAgICAgIHdoaWxlICgoKGxhc3RMYXN0SWR4ID0gdGhpcy5fZW50cmllc1tsYXN0QXNzaWdubWVudElkeF0uc3JlYy5sYXN0QXNzaWdubWVudElkeCkgIT09IC0xKSAmJlxuICAgICAgICAodGhpcy5fZW50cmllc1tsYXN0QXNzaWdubWVudElkeF0ubWFza2VkQnlJZHggPD0gMCkpIHtcbiAgICAgICAgICAgIC8vIG1hcmsgaXQhICh3ZSdsbCBwaWNrIGl0IHVwIGJlbG93Li4uKVxuICAgICAgICAgICAgdGhpcy5fZW50cmllc1tsYXN0QXNzaWdubWVudElkeF0ubWFza2VkQnlJZHggPSAtMTtcbiAgICAgICAgICAgIGxhc3RBc3NpZ25tZW50SWR4ID0gbGFzdExhc3RJZHg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1bmRvIGFsbCBjb25mbGljdGluZyBvciBkZXJ2aWVkIGFzc2lnbm1lbnRzIChhbmQgbWFyayB0aGVtKVxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZW50cmllcy5sZW5ndGggLSAxOyBpID49IGxhc3RBc3NpZ25tZW50SWR4OyBpLS0pIHtcbiAgICAgICAgICAgIGxldCByID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdW5kbyAoYW5kIG1hc2spIGFueSByZWNvcmQgdGhhdCBjb25mbGljdCBvciBhcmUgZGVyaXZlZFxuICAgICAgICAgICAgLy8gTk9URTogV2UgYXJlIHNraXBwaW5nIHRoZSByZW1vdmUgYWxsIGNoYWluZWQgcmVjb3JkcywgYmVjYXVzZSB0aGlzIGNhbiByZXN1bHQgaW5cbiAgICAgICAgICAgIC8vIHVuZG9pbmcgZGVyaXZlZCBzdGF0ZSB0b3RhbGx5IHVucmVsYXRlZCB0byB0aGlzIGtleS4gIElkZWFsbHkgd2UnZCBmaWd1cmUgb3V0IHdoYXRcbiAgICAgICAgICAgIC8vIGRlcGVuZGVkIG9uIHdoYXQuLi5cbiAgICAgICAgICAgIGlmIChyLm1hc2tlZEJ5SWR4IDw9IDAgJiYgKGkgPT09IGxhc3RBc3NpZ25tZW50SWR4IHx8IHIubWFza2VkQnlJZHggPT09IC0xKSkge1xuICAgICAgICAgICAgICAgIC8vIHx8IHIuc3JlYy5mcm9tQ2hhaW5pbmdcbiAgICAgICAgICAgICAgICAvLyBtYXJrIGFuZCB1bmRvIGl0XG4gICAgICAgICAgICAgICAgci5tYXNrZWRCeUlkeCA9IG92ZXJyaWRlSW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5fdW5kb1JlY1ZhbHVlKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYXN0QXNzaWdubWVudElkeDtcbiAgICB9XG5cblxuICAgIF9yZW1hdGNoRm9yT3ZlcnJpZGUoa2V5OiBzdHJpbmcsIHN2YWx1ZTogYW55LCBvdmVycmlkZUluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEFzc2lnbm1lbnRJZHg6IG51bWJlcik6IE1hdGNoUmVzdWx0IHtcbiAgICAgICAgLy8gc3RhcnQgZnJvbSB0aGUgdG9wIGRvd24gbG9va2luZyBmb3IgdGhhdCBsYXN0IHVubWFza2VkIHJlY29yZFxuICAgICAgICBsZXQgbGFzdE1hdGNoOiBNYXRjaFJlc3VsdDtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKDsgaSA8IGZpcnN0QXNzaWdubWVudElkeDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmVjID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIGlmIChyZWMubWFza2VkQnlJZHggIT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RNYXRjaCA9IHJlYy5zcmVjLm1hdGNoO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG92ZXJyaWRlc01hdGNoOiBVbmlvbk1hdGNoUmVzdWx0O1xuXG4gICAgICAgIC8vIFJlbWF0Y2ggc2tpcHBpbmcgb3ZlciB0aGUgbGFzdCBhc3NpZ25tZW50IG9mIHRoaXMgcHJvcGVydHlcbiAgICAgICAgLy8gYW5kIGFsbCBhc3NpZ25tZW50cyBmcm9tIGNoYWluZ2luZ1xuICAgICAgICBmb3IgKGxldCBlbmQgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcjogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICAvLyByZW1hdGNoIG9uIGFueSB1bm1hc2tlZCByZWNvcmRzXG4gICAgICAgICAgICBpZiAoci5tYXNrZWRCeUlkeCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IHRoaXMuX21ldGEubWF0Y2goci5zcmVjLmtleSwgci5zcmVjLnZhbCwgbGFzdE1hdGNoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYWNjdW11bGF0ZSBtYXNrZWQgKCdfbycpIG1hdGNoXG4gICAgICAgICAgICAgICAgb3ZlcnJpZGVzTWF0Y2ggPSB0aGlzLl9tZXRhLnVuaW9uT3ZlcnJpZGVNYXRjaChyLnNyZWMua2V5LCByLnNyZWMudmFsLFxuICAgICAgICAgICAgICAgICAgICBvdmVycmlkZXNNYXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHN2YWx1ZSkgfHwgaXNCbGFuayhsYXN0TWF0Y2gpKSB7XG4gICAgICAgICAgICBsYXN0TWF0Y2ggPSB0aGlzLl9tZXRhLm1hdGNoKGtleSwgc3ZhbHVlLCBsYXN0TWF0Y2gpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RNYXRjaC5zZXRPdmVycmlkZXNNYXRjaChvdmVycmlkZXNNYXRjaCk7XG4gICAgICAgIHJldHVybiBsYXN0TWF0Y2g7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF91bmRvT3ZlcnJpZGUocmVjOiBBc3NpZ25tZW50LCByZWNJZHg6IG51bWJlcikge1xuICAgICAgICBsZXQgbGFzdEFzc2lnbm1lbnRJZHggPSByZWMuc3JlYy5sYXN0QXNzaWdubWVudElkeDtcbiAgICAgICAgbGV0IGxhc3RMYXN0SWR4OiBudW1iZXI7XG5cblxuICAgICAgICAvLyBiYXN0aWNrIHVwIGZ1cnRoZXIgaWYgbmVjZXNzYXJ5XG4gICAgICAgIHdoaWxlICgoKGxhc3RMYXN0SWR4ID0gdGhpcy5fZW50cmllc1tsYXN0QXNzaWdubWVudElkeF0uc3JlYy5sYXN0QXNzaWdubWVudElkeCkgIT09IC0xKSAmJlxuICAgICAgICAodGhpcy5fZW50cmllc1tsYXN0TGFzdElkeF0ubWFza2VkQnlJZHggPT09IHJlY0lkeCkpIHtcbiAgICAgICAgICAgIGxhc3RBc3NpZ25tZW50SWR4ID0gbGFzdExhc3RJZHg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gbGFzdEFzc2lnbm1lbnRJZHgsIGMgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aDsgaSA8IGM7IGkrKykge1xuICAgICAgICAgICAgbGV0IHI6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoci5tYXNrZWRCeUlkeCA9PT0gcmVjSWR4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLnNldChyLnNyZWMua2V5LCByLnZhbCk7XG4gICAgICAgICAgICAgICAgci5tYXNrZWRCeUlkeCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIF9jaGVja01hdGNoKG1hdGNoOiBNYXRjaFJlc3VsdCwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbWF0Y2guX2NoZWNrTWF0Y2godGhpcy5fdmFsdWVzLCB0aGlzLl9tZXRhKTtcbiAgICB9XG5cbiAgICBmaW5kTGFzdEFzc2lnbm1lbnRPZktleShrZXk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgcmVjOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIGlmIChyZWMuc3JlYy5rZXkgPT09IGtleSAmJiByZWMubWFza2VkQnlJZHggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZmluZExhc3RBc3NpZ25tZW50T2ZLZXlXaXRoVmFsdWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBudW1iZXIge1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IHJlYzogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbaV07XG4gICAgICAgICAgICBpZiAocmVjLnNyZWMua2V5ID09PSBrZXkgJiYgIXRoaXMuX2lzTmV3VmFsdWUocmVjLnZhbCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgd2UgaGF2ZSB2YWx1ZSBtaXJyb3JpbmcgKHByb3BlcnR5IHRvIGNvbnRleHQpIHRvIGRvIER5bmFtaWMgcHJvcGVydHkgbWlycm9yaW5nIHdpbGxcbiAgICAgKiBiZSBhZGRlZCB0byB0aGUgY3VycmVudEFjdGl2YXRpb24gZGVmZXJyZWRBc3NpZ25tZW50IGxpc3RcbiAgICAgKlxuICAgICAqL1xuICAgIF9jaGVja0FwcGx5UHJvcGVydGllcygpOiBib29sZWFuIHtcblxuICAgICAgICBsZXQgZGlkU2V0ID0gZmFsc2U7XG4gICAgICAgIGxldCBudW1FbnRyaWVzID0gMDtcbiAgICAgICAgbGV0IGxhc3RTaXplID0gMDtcbiAgICAgICAgbGV0IGRlY2xhcmVLZXk6IHN0cmluZyA9IHRoaXMuX2luRGVjbGFyZSgpID8gdGhpcy5fdmFsdWVzLmdldChNZXRhLktleURlY2xhcmUpIDogbnVsbDtcblxuICAgICAgICB3aGlsZSAoKG51bUVudHJpZXMgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aCkgPiBsYXN0U2l6ZSkge1xuICAgICAgICAgICAgbGFzdFNpemUgPSBudW1FbnRyaWVzO1xuICAgICAgICAgICAgbGV0IHJlYzogQXNzaWdubWVudCA9IHRoaXMuX2VudHJpZXNbbnVtRW50cmllcyAtIDFdO1xuICAgICAgICAgICAgbGV0IHByb3BlcnRpZXM6IFByb3BlcnR5TWFwID0gcmVjLnNyZWMucHJvcGVydGllcygpO1xuXG4gICAgICAgICAgICBsZXQgY29udGV4dEtleXM6IEFycmF5PFByb3BlcnR5TWFuYWdlcj4gPSBwcm9wZXJ0aWVzLmNvbnRleHRLZXlzVXBkYXRlZDtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChjb250ZXh0S2V5cykpIHtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBjID0gY29udGV4dEtleXMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BNZ3I6IFByb3BlcnR5TWFuYWdlciA9IGNvbnRleHRLZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5OiBzdHJpbmcgPSBwcm9wTWdyLl9uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KGRlY2xhcmVLZXkpICYmIGtleSA9PT0gZGVjbGFyZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gVG9EbzogYXBwbHlpbmcgcmVzb2x2ZWQgdmFsdWUgLS0gbmVlZCB0byBkZWZlciByZXNvbHV0aW9uIG9uIHRydWUgZHluYW1pY1xuICAgICAgICAgICAgICAgICAgICAvLyB2YWx1ZXMgU3VwcHJlc3MgY2hhaW5lZCBhc3NpZ25tZW50IGlmOiAxKSBPdXIgcGFyZW50IHdpbGwgYXNzaWduIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvcGVydHkgKGhhcyBhIGRlZmVycmVkIGFjdGl2YXRpb24gZm9yIGl0KSwgb3IgMikgVGhlcmUncyBhbHJlYWR5IGFcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYXNzaWdubWVudCB3aXRoIGhpZ2hlciBzYWxpZW5jZVxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsID0gdGhpcy5zdGF0aWNhbGx5UmVzb2x2ZVZhbHVlKHByb3BlcnRpZXMuZ2V0KGtleSkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJldlByb3BzOiBQcm9wZXJ0eU1hcDtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3VwcHJlc3M6IGJvb2xlYW4gPSAoaXNQcmVzZW50KHByZXZQcm9wcykgJiYgcHJldlByb3BzLmhhcyhrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAhdGhpcy5faXNOZXdWYWx1ZSh0aGlzLnN0YXRpY2FsbHlSZXNvbHZlVmFsdWUocHJldlByb3BzLmdldChrZXkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWwpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2N1cnJlbnRBY3RpdmF0aW9uLl9wYXJlbnQuaGFzRGVmZXJyZWRBc3NpZ25tZW50Rm9yS2V5KGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAmJiB0aGlzLl92YWx1ZXMuY29udGFpbnNLZXkoa2V5KSAqLyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdXBwcmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pcnJvcktleSA9IHByb3BNZ3IuX2tleURhdGFUb1NldC5fa2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpbnQoJyhkZWZlcnJlZCkgY2hhaW5pbmcga2V5OiAnICwgcHJvcE1nci5fa2V5RGF0YVRvU2V0Ll9rZXkpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbi5hZGREZWZlcnJlZEFzc2lnbm1lbnQobWlycm9yS2V5LCBuZXdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb21wYXJlIHRoaXMgdmFsdWUgdG8gdGhlIHZhbHVlIGZyb20gdGhlIGVuZCBvZiB0aGUgbGFzdCBmcmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaW50KCdjaGFpbmluZyBrZXk6ICcgLCBwcm9wTWdyLl9rZXlEYXRhVG9TZXQuX2tleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NldDIobWlycm9yS2V5LCBuZXdWYWwsIG5ld1ZhbCwgZmFsc2UsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZFNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpbnQoJ1NVUFBSRVNTRUQgY2hhaW5pbmcga2V5OiAnICwgcHJvcE1nci5fa2V5RGF0YVRvU2V0Ll9rZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaWRTZXQ7XG4gICAgfVxuXG5cbiAgICBhcHBseVByb3BlcnR5Q29udGV4dEFuZENoYWluKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fY2hlY2tQcm9wZXJ0eUNvbnRleHQoKSkge1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuX2NoZWNrQXBwbHlQcm9wZXJ0aWVzKCkpIHtcbiAgICAgICAgICAgICAgICAvKiByZXBlYXQgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgX2N1cnJlbnRQcm9wZXJ0eVNjb3BlS2V5KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBmb3VuZEtleTogc3RyaW5nO1xuICAgICAgICBsZXQgZm91bmRBY3RpdmF0aW9uOiBBY3RpdmF0aW9uO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgcmVjOiBBc3NpZ25tZW50ID0gdGhpcy5fZW50cmllc1tpXTtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoZm91bmRBY3RpdmF0aW9uKSAmJiByZWMuc3JlYy5hY3RpdmF0aW9uICE9PSBmb3VuZEFjdGl2YXRpb24pIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9tZXRhLmtleURhdGEocmVjLnNyZWMua2V5KS5pc1Byb3BlcnR5U2NvcGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlYy5zcmVjLmZyb21DaGFpbmluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVjLnNyZWMua2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmb3IgY2hhaW5pbmcgYXNzaWdubWVudHMsIHdlIGtlZXAgbG9va2luZyB1bnRpbCB3ZSBleGhhdXN0IHRoZSBmaXJzdFxuICAgICAgICAgICAgICAgIC8vIG5vbi1jaGFpbmluZyBhY3RpdmF0aW9uIFRvZG86IGJyb2tlbiAtLSBkaXNhYmxpbmcgc2V0IG9mIGNvbnRleHQga2V5IGZyb21cbiAgICAgICAgICAgICAgICAvLyBjaGFpbmluZyBpZiAoZm91bmRLZXkgPT09IG51bGwpIGZvdW5kS2V5ID0gc2NvcGVLZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGZvdW5kS2V5KSAmJiAhcmVjLnNyZWMuZnJvbUNoYWluaW5nKSB7XG4gICAgICAgICAgICAgICAgZm91bmRBY3RpdmF0aW9uID0gcmVjLnNyZWMuYWN0aXZhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm91bmRLZXk7XG5cbiAgICB9XG5cblxuICAgIC8vIEFwcGx5IGEgJ3Byb3BlcnR5IGNvbnRleHQnIHByb3BlcnR5IChlLmcuIGZpZWxkX3AgZm9yIGZpZWxkKSB0byB0aGUgY29udGV4dCBpZiBuZWNlc3NhcnlcbiAgICBfY2hlY2tQcm9wZXJ0eUNvbnRleHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGFzc2VydCh0aGlzLl92YWx1ZXMgaW5zdGFuY2VvZiBOZXN0ZWRNYXAsICdQcm9wZXJ0eSBhc3NpZ25tZW50IG9uIGJhc2UgbWFwPycpO1xuICAgICAgICBsZXQgc2NvcGVLZXk6IHN0cmluZyA9IHRoaXMuX2N1cnJlbnRQcm9wZXJ0eVNjb3BlS2V5KCk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoc2NvcGVLZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0MihNZXRhLlNjb3BlS2V5LCBzY29wZUtleSwgc2NvcGVLZXksIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgZGVidWcoKTogdm9pZCB7XG4gICAgICAgIC8vIHNldCBkZWJ1Z2dlciBicmVha3BvaW50IGhlcmVcbiAgICAgICAgcHJpbnQoJyoqKioqKiAgRGVidWcgQ2FsbCAqKioqKionKTtcbiAgICAgICAgdGhpcy5fbG9nQ29udGV4dCgpO1xuICAgIH1cblxuXG4gICAgZGVidWdTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBTdHJpbmdKb2luZXIoWyc8Yj5Db250ZXh0OjwvYj4mbmJzcDsnXSk7XG5cbiAgICAgICAgYnVmZmVyLmFkZCgnKCZuYnNwOycpO1xuICAgICAgICBidWZmZXIuYWRkKHRoaXMuX2VudHJpZXMubGVuZ3RoICsgJycpO1xuICAgICAgICBidWZmZXIuYWRkKCcgZW50cmllcycpO1xuICAgICAgICBidWZmZXIuYWRkKCcmbmJzcDspPGJyLz4nKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgYyA9IHRoaXMuX2VudHJpZXMubGVuZ3RoOyBpIDwgYzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3AgPSBpO1xuICAgICAgICAgICAgd2hpbGUgKHNwLS0gPiAwKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmFkZCgnJm5ic3A7Jyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgbGV0IHI6IEFzc2lnbm1lbnQgPSB0aGlzLl9lbnRyaWVzW2ldO1xuXG4gICAgICAgICAgICBidWZmZXIuYWRkKCcmbmJzcDsnKTtcbiAgICAgICAgICAgIGJ1ZmZlci5hZGQoci5zcmVjLmtleSk7XG4gICAgICAgICAgICBidWZmZXIuYWRkKCcmbmJzcDsmbmJzcDs6Jm5ic3A7Jyk7XG4gICAgICAgICAgICBidWZmZXIuYWRkKHIuc3JlYy52YWwpO1xuICAgICAgICAgICAgYnVmZmVyLmFkZCgoci5zcmVjLmZyb21DaGFpbmluZyA/ICcgXicgOiAnJykpO1xuICAgICAgICAgICAgYnVmZmVyLmFkZCgoci5tYXNrZWRCeUlkeCAhPT0gMCA/ICcgWCcgOiAnJykpO1xuICAgICAgICAgICAgYnVmZmVyLmFkZCgnPGJyLz4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wZXJ0eUFjdGl2YXRpb246IEFjdGl2YXRpb24gPSB0aGlzLmN1cnJlbnRBY3RpdmF0aW9uLl9wcm9wZXJ0eUFjdGl2YXRpb247XG4gICAgICAgIGlmIChpc1ByZXNlbnQocHJvcGVydHlBY3RpdmF0aW9uKSkge1xuICAgICAgICAgICAgbGV0IHNyZWNzOiBBcnJheTxTdGF0aWNSZWM+ID0gcHJvcGVydHlBY3RpdmF0aW9uLl9yZWNzO1xuXG4gICAgICAgICAgICBidWZmZXIuYWRkKCcmbmJzcDsmbmJzcDsmbmJzcDs8Yj5Qcm9wZXJ0eUFjdGl2YXRpb24uLi48L2I+PGJyLz4nKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGMgPSBzcmVjcy5sZW5ndGg7IGkgPCBjOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc3AgPSBpICsgdGhpcy5fZW50cmllcy5sZW5ndGggKyAxO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHNwLS0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5hZGQoJyZuYnNwOyZuYnNwOycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcjogU3RhdGljUmVjID0gc3JlY3NbaV07XG4gICAgICAgICAgICAgICAgYnVmZmVyLmFkZChyLmtleSk7XG4gICAgICAgICAgICAgICAgYnVmZmVyLmFkZCgnJm5ic3A7Jm5ic3A7OiZuYnNwOycpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5hZGQoci52YWwpO1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5hZGQoKHIuZnJvbUNoYWluaW5nID8gJyZuYnNwOyZuYnNwOycgOiAnJm5ic3A7Jm5ic3A7IScpKTtcbiAgICAgICAgICAgICAgICBidWZmZXIuYWRkKCc8YnIvPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlci5hZGQoJyZuYnNwOzxici8+PGI+UHJvcHM6PC9iPjxici8+Jyk7XG4gICAgICAgIHRoaXMud3JpdGVQcm9wZXJ0aWVzKGJ1ZmZlciwgdGhpcy5hbGxQcm9wZXJ0aWVzKCksIDEsIGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gYnVmZmVyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgX2xvZ0NvbnRleHQoKTogdm9pZCB7XG4gICAgICAgIGxldCBkZWJ1Z1N0cmluZzogc3RyaW5nID0gdGhpcy5kZWJ1Z1N0cmluZygpO1xuICAgICAgICBwcmludChkZWJ1Z1N0cmluZyk7XG4gICAgICAgIHByaW50KCdcXG4nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdyaXRlUHJvcGVydGllcyhidWY6IFN0cmluZ0pvaW5lciwgcHJvcGVydGllczogTWFwPHN0cmluZywgYW55PiwgbGV2ZWw6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVMaW5lOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUocHJvcGVydGllcykuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaW5nbGVMaW5lKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGxldmVsLS0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJyZuYnNwOyZuYnNwOyZuYnNwOycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGJ1Zi5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICBidWYuYWRkKCcgOm51bGwnKTtcbiAgICAgICAgICAgICAgICBidWYuYWRkKHNpbmdsZUxpbmUgPyAnOyZuYnNwOyZuYnNwOycgOiAnOzxici8+Jyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVmLmFkZCgnJm5ic3A7Jm5ic3A7Jm5ic3A7Jyk7XG4gICAgICAgICAgICAgICAgYnVmLmFkZChrZXkpO1xuICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJzonKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyh2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJyZuYnNwOyZuYnNwOycpO1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCgnJm5ic3A7Jm5ic3A7Jyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nTWFwKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKCd7Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKCd9Jyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXhwcikge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZChNYXBXcmFwcGVyLnRvU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci50b1N0cmluZyh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgT3ZlcnJpZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKHZhbHVlLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpZWxkUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBidWYuYWRkKCckJyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNpbmdsZUxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLmFkZCgnOycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5hZGQoJzxici8+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgbGFzdE1hdGNoV2l0aG91dENvbnRleHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmlzRW1wdHkoXG4gICAgICAgICAgICB0aGlzLl9lbnRyaWVzKSA/IG51bGwgOiB0aGlzLl9lbnRyaWVzW3RoaXMuX2VudHJpZXMubGVuZ3RoIC0gMV0uc3JlYy5tYXRjaDtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgbGFzdE1hdGNoKCkge1xuICAgICAgICBpZiAoTGlzdFdyYXBwZXIuaXNFbXB0eSh0aGlzLl9lbnRyaWVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hdGNoOiBNYXRjaFJlc3VsdCA9IExpc3RXcmFwcGVyLmxhc3Q8QXNzaWdubWVudD4odGhpcy5fZW50cmllcylcbiAgICAgICAgICAgIC5wcm9wZXJ0eUxvY2FsTWF0Y2hlcyh0aGlzKTtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQobWF0Y2gpKSA/IG1hdGNoIDogdGhpcy5sYXN0TWF0Y2hXaXRob3V0Q29udGV4dFByb3BzKCk7XG5cbiAgICB9XG5cbiAgICBsYXN0U3RhdGljUmVjKCk6IFN0YXRpY1JlYyB7XG4gICAgICAgIGlmIChMaXN0V3JhcHBlci5pc0VtcHR5KHRoaXMuX2VudHJpZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVjOiBTdGF0aWNSZWMgPSBMaXN0V3JhcHBlci5sYXN0KHRoaXMuX2VudHJpZXMpLnByb3BlcnR5TG9jYWxTdGF0aWNSZWModGhpcyk7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQocmVjKSA/IHJlYyA6IExpc3RXcmFwcGVyLmxhc3QodGhpcy5fZW50cmllcykuc3JlYztcbiAgICB9XG5cblxuICAgIGdldCByZWNQb29sKCk6IEFycmF5PEFzc2lnbm1lbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY1Bvb2w7XG4gICAgfVxuXG5cbiAgICBnZXQgY3VycmVudEFjdGl2YXRpb24oKTogQWN0aXZhdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50QWN0aXZhdGlvbjtcbiAgICB9XG5cblxuICAgIGV4dGVuZGVkRmllbGRzKCk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXM7XG4gICAgfVxufVxuXG5cbi8qKlxuICogQSBzaGFyYWJsZS9yZS1hcHBsaWNhYmxlIGJsb2NrIG9mIHNldFNjb3BlS2V5QXNzaWdubWVudCBfU3RhdGljUmVjcy4gIEFuIEFjdGl2YXRpb24gY29udGFpbnNcbiAqIHRoZSBsaXN0IG9mIGFzc2lnbm1lbnQgcmVjb3JkcyByZXN1bHRpbmcgZnJvbSAoY2hhaW5pbmcgZnJvbSkgYSBzaW5nbGUgb3JpZ2luYWxcbiAqIGFzc2lnbm1lbnQgKGFzIHdlbGwgYXMgX0RlZmVycmVkQXNzaWdubWVudCByZWNvcmRzIGZvciBkeW5hbWljIHZhbHVlcyB0aGF0IGNhbm5vdFxuICogYmUgc3RhdGljYWxseSByZXNvbHZlZCB0byByZWNvcmRzKS4gIEFjdGl2YXRpb25zIGZvcm0gYSBzaGFyZWQvY2FjaGVkIHRyZWUsIGJhc2VkXG4gKiBvbiBjb250ZXh0IGFzc2lnbm1lbnQgcGF0aHMgcHJldmlvdXNseSB0cmF2ZXJzZWQgdmlhIGFzc2lnbm1lbnRzIHRvIHNvbWUgQ29udGV4dC5cbiAqIFN1YnNlcXVlbnQgdHJhdmVyc2FscyBvZiB0aGVzZSBwYXRocyAobGlrZWx5IGJ5IGRpZmZlcmVudCBDb250ZXh0IGluc3RhbmNlcylcbiAqIGFyZSBncmVhdGx5IG9wdGltaXplZDogYW4gZXhpc3RpbmcgQWN0aXZhdGlvbiBpcyByZXRyaWV2ZWQgYW5kIGl0cyByZWNvcmRzIGFwcGVuZGVkXG4gKiB0byB0aGUgY29udGV4dCdzIF9lbnRyaWVzIHN0YWNrOyBhbGwgb2YgdGhlIHRyYWRpdGlvbmFsIGNvbXB1dGF0aW9uIG9mIHJ1bGUgbWF0Y2ggbG9va3VwcyxcbiAqIGNoYWluZWQgYXNzaWdubWVudHMgYW5kIG92ZXJyaWRlIGluZGV4ZXMgaXMgYnlwYXNzZWQuXG4gKiBBY3RpdmF0aW9uIGdpdmVzIHNwZWNpYWwgdHJlYXRtZW50IHRvIHRoZSAncHJvcGVydHlBY3RpdmF0aW9uJywgaS5lLiB0aGUgYWN0aXZhdGlvblxuICogcmVzdWx0aW5nIGZyb20gdGhlIGFwcGxpY2F0aW9uIG9mIHRoZSAnc2NvcGVLZXknIHRvIHRoZSBjdXJyZW50IGNvbnRleHQuICBQcm9wZXJ0eSBsb29rdXBcbiAqIGZvbGxvd2luZyBhbmQgY29udGV4dCBhc3NpZ25tZW50IHJlcXVpcmUgYXBwbGljYXRpb24gb2YgdGhlIHNjb3BlS2V5LCBidXQgdGhlbiB0aGUgc2NvcGUga2V5XG4gKiBtdXN0IGltbWVkaWF0ZWx5IGJlIHBvcHBlZCBmb3IgdGhlIG5leHQgY29udGV4dCBhc3NpZ25tZW50LiAgVG8gYXZvaWQgdGhpcyBjb25zdGFudCBwdXNoL3BvcFxuICogb24gdGhlIGJvdHRvbSBvZiB0aGUgc3RhY2ssIF9BY3RpdmF0aW9ucyBjYWNoZSBhIHNpZGUgYWN0aXZhdGlvbiAodGhlIHByb3BlcnR5QWN0aXZhdGlvbilcbiAqIGZvciB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIHRoZSBzY29wZUtleSB0byB0aGUgY3VycmVudCBhY3RpdmF0aW9uLiAgVGhpcyBzdGFjayAoYW5kIGl0c1xuICogcHJvcGVydGllcykgYXJlIGNhY2hlZCBvbiB0aGUgc2lkZSwgYW5kIGNhbiBiZSBhY2Nlc3NlZCB3aXRob3V0IGFjdHVhbGx5IG1vZGlmeWluZyB0aGUgbWFpblxuICogY29udGV4dCBzdGFjay5cbiAqL1xuXG5leHBvcnQgY2xhc3MgQWN0aXZhdGlvbiB7XG5cbiAgICBfcmVjczogQXJyYXk8U3RhdGljUmVjPiA9IG5ldyBBcnJheTxTdGF0aWNSZWM+KCk7XG4gICAgX29yaWdFbnRyeUNvdW50OiBudW1iZXIgPSAwO1xuICAgIF92YWx1ZU5vZGVNYXBCeUNvbnRleHRLZXk6IE1hcDxzdHJpbmcsIENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+PjtcbiAgICBfdmFsdWVOb2RlTWFwQnlDb250ZXh0S2V5Q2hhaW5pbmc6IE1hcDxzdHJpbmcsIENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+PjtcblxuICAgIF9wcm9wZXJ0eUFjdGl2YXRpb246IEFjdGl2YXRpb247XG4gICAgX25lc3RlZFZhbHVlczogTmVzdGVkTWFwPHN0cmluZywgYW55PjtcbiAgICBkZWZlcnJlZEFzc2lnbm1lbnRzOiBBcnJheTxEZWZlcnJlZEFzc2lnbm1lbnQ+O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX3BhcmVudD86IEFjdGl2YXRpb24pIHtcblxuICAgIH1cblxuICAgIGdldENoaWxkQWN0aXZhdGlvbihjb250ZXh0S2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGNoYWluaW5nOiBib29sZWFuKTogQWN0aXZhdGlvbiB7XG4gICAgICAgIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBNZXRhLk51bGxNYXJrZXI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnlLZXk6IE1hcDxzdHJpbmcsIENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+PiA9IChjaGFpbmluZylcbiAgICAgICAgICAgID8gdGhpcy5fdmFsdWVOb2RlTWFwQnlDb250ZXh0S2V5Q2hhaW5pbmcgOlxuICAgICAgICAgICAgdGhpcy5fdmFsdWVOb2RlTWFwQnlDb250ZXh0S2V5O1xuXG4gICAgICAgIGlmIChpc0JsYW5rKGJ5S2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJ5VmFsOiBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55PiA9IGJ5S2V5LmdldChjb250ZXh0S2V5KTtcbiAgICAgICAgcmV0dXJuIChpc0JsYW5rKGJ5VmFsKSkgPyBudWxsIDogYnlWYWwuZ2V0VmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIGNhY2hlQ2hpbGRBY3RpdmF0aW9uKGNvbnRleHRLZXk6IHN0cmluZywgdmFsdWU6IGFueSwgYWN0aXZhdGlvbjogQWN0aXZhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICBjaGFpbmluZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gTWV0YS5OdWxsTWFya2VyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJ5S2V5OiBNYXA8c3RyaW5nLCBDb2xsZWN0aW9ucy5EaWN0aW9uYXJ5PGFueSwgYW55Pj47XG4gICAgICAgIGlmIChjaGFpbmluZykge1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsoKGJ5S2V5ID0gdGhpcy5fdmFsdWVOb2RlTWFwQnlDb250ZXh0S2V5Q2hhaW5pbmcpKSkge1xuICAgICAgICAgICAgICAgIGJ5S2V5ID0gdGhpcy5fdmFsdWVOb2RlTWFwQnlDb250ZXh0S2V5Q2hhaW5pbmdcbiAgICAgICAgICAgICAgICAgICAgPSBuZXcgTWFwPHN0cmluZywgQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxhbnksIGFueT4+KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNCbGFuaygoYnlLZXkgPSB0aGlzLl92YWx1ZU5vZGVNYXBCeUNvbnRleHRLZXkpKSkge1xuICAgICAgICAgICAgICAgIGJ5S2V5ID0gdGhpcy5fdmFsdWVOb2RlTWFwQnlDb250ZXh0S2V5XG4gICAgICAgICAgICAgICAgICAgID0gbmV3IE1hcDxzdHJpbmcsIENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+PigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnlWYWw6IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+ID0gYnlLZXkuZ2V0KGNvbnRleHRLZXkpO1xuICAgICAgICBpZiAoaXNCbGFuayhieVZhbCkpIHtcbiAgICAgICAgICAgIGJ5VmFsID0gbmV3IENvbGxlY3Rpb25zLkRpY3Rpb25hcnk8YW55LCBhbnk+KCk7XG4gICAgICAgICAgICBieUtleS5zZXQoY29udGV4dEtleSwgYnlWYWwpO1xuICAgICAgICB9XG4gICAgICAgIGJ5VmFsLnNldFZhbHVlKHZhbHVlLCBhY3RpdmF0aW9uKTtcbiAgICB9XG5cbiAgICBhZGREZWZlcnJlZEFzc2lnbm1lbnQoa2V5OiBzdHJpbmcsIHZhbHVlOiBEeW5hbWljUHJvcGVydHlWYWx1ZSk6IHZvaWQge1xuICAgICAgICBsZXQgbmV3RGE6IERlZmVycmVkQXNzaWdubWVudDtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmRlZmVycmVkQXNzaWdubWVudHMpKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmVycmVkQXNzaWdubWVudHMgPSBuZXcgQXJyYXk8RGVmZXJyZWRBc3NpZ25tZW50PigpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkYSBvZiB0aGlzLmRlZmVycmVkQXNzaWdubWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGEua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGEgPSBkYTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JsYW5rKG5ld0RhKSkge1xuICAgICAgICAgICAgbmV3RGEgPSBuZXcgRGVmZXJyZWRBc3NpZ25tZW50KCk7XG4gICAgICAgICAgICBuZXdEYS5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLmRlZmVycmVkQXNzaWdubWVudHMucHVzaChuZXdEYSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3RGEudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBoYXNEZWZlcnJlZEFzc2lnbm1lbnRGb3JLZXkoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmRlZmVycmVkQXNzaWdubWVudHMpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkYSBvZiB0aGlzLmRlZmVycmVkQXNzaWdubWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGEua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm9wZXJ0eUFjdGl2YXRpb24oY29udGV4dDogQ29udGV4dCk6IEFjdGl2YXRpb24ge1xuICAgICAgICBhc3NlcnQoY29udGV4dC5jdXJyZW50QWN0aXZhdGlvbiA9PT0gdGhpcyxcbiAgICAgICAgICAgICdQcm9wZXJ0eUFjdGl2YXRpb24gc291Z2h0IG9uIG5vbiB0b3Agb2Ygc3RhY2sgYWN0aXZhdGlvbicpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3Byb3BlcnR5QWN0aXZhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3BlcnR5QWN0aXZhdGlvbiA9IGNvbnRleHQuX2NyZWF0ZU5ld1Byb3BlcnR5Q29udGV4dEFjdGl2YXRpb24odGhpcyk7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHRoaXMuX3Byb3BlcnR5QWN0aXZhdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9wZXJ0eUFjdGl2YXRpb24gPSB0aGlzO1xuICAgICAgICAgICAgfSAvLyB0aGlzIGFzIG51bGwgbWFya2VyXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnR5QWN0aXZhdGlvbiAhPT0gdGhpcyA/IHRoaXMuX3Byb3BlcnR5QWN0aXZhdGlvbiA6IG51bGw7XG4gICAgfVxuXG5cbiAgICBmaW5kRXhpc3RpbmdQcm9wZXJ0eUFjdGl2YXRpb24oKTogQWN0aXZhdGlvbiB7XG4gICAgICAgIGxldCBhY3RpdmF0aW9uOiBBY3RpdmF0aW9uID0gdGhpcztcbiAgICAgICAgd2hpbGUgKGlzUHJlc2VudChhY3RpdmF0aW9uKSkge1xuXG4gICAgICAgICAgICBsZXQgcHJvcGVydHlBY3RpdmF0aW9uOiBBY3RpdmF0aW9uID0gYWN0aXZhdGlvbi5fcHJvcGVydHlBY3RpdmF0aW9uO1xuXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHByb3BlcnR5QWN0aXZhdGlvbikgJiYgcHJvcGVydHlBY3RpdmF0aW9uICE9PSBhY3RpdmF0aW9uXG4gICAgICAgICAgICAgICAgJiYgIShpc0JsYW5rKHByb3BlcnR5QWN0aXZhdGlvbi5fcmVjcykgfHwgTGlzdFdyYXBwZXIuaXNFbXB0eShcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlBY3RpdmF0aW9uLl9yZWNzKSkpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eUFjdGl2YXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY3RpdmF0aW9uID0gYWN0aXZhdGlvbi5fcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgLy8gdG9kbzogYmV0dGVyIGJldHRlciB0byBzdHJpbmcgZm9yIGhhc2hpbmdcbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbnMudXRpbC5tYWtlU3RyaW5nKHRoaXMpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRGVmZXJyZWRBc3NpZ25tZW50IHtcbiAgICBrZXk6IHN0cmluZztcbiAgICB2YWx1ZTogRHluYW1pY1Byb3BlcnR5VmFsdWU7XG59XG5cblxuZXhwb3J0IGNsYXNzIEFzc2lnbm1lbnRTbmFwc2hvdCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgdmFsdWU6IGFueTtcbiAgICBzYWxpZW5jZTogbnVtYmVyO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBBc3NpZ25tZW50IHtcbiAgICBzcmVjOiBTdGF0aWNSZWM7XG4gICAgdmFsOiBPYmplY3Q7XG5cbiAgICBtYXNrZWRCeUlkeDogbnVtYmVyID0gMDtcbiAgICBfZGlkSW5pdFByb3BDb250ZXh0OiBib29sZWFuID0gZmFsc2U7XG4gICAgX3Byb3BlcnR5TG9jYWxTcmVjOiBTdGF0aWNSZWM7XG4gICAgX3Byb3BlcnR5TG9jYWxWYWx1ZXM6IE1hcDxzdHJpbmcsIGFueT47XG5cblxuICAgIHByb3BlcnR5TG9jYWxNYXRjaGVzKGNvbnRleHQ6IENvbnRleHQpOiBNYXRjaFJlc3VsdCB7XG4gICAgICAgIGlmICghdGhpcy5fZGlkSW5pdFByb3BDb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQcm9wQ29udGV4dChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX3Byb3BlcnR5TG9jYWxTcmVjKSA/IHRoaXMuX3Byb3BlcnR5TG9jYWxTcmVjLm1hdGNoIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcm9wZXJ0eUxvY2FsU3RhdGljUmVjKGNvbnRleHQ6IENvbnRleHQpOiBTdGF0aWNSZWMge1xuICAgICAgICBpZiAoIXRoaXMuX2RpZEluaXRQcm9wQ29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5pbml0UHJvcENvbnRleHQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnR5TG9jYWxTcmVjO1xuICAgIH1cblxuICAgIHByb3BlcnR5TG9jYWxWYWx1ZXMoY29udGV4dDogQ29udGV4dCk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2RpZEluaXRQcm9wQ29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5pbml0UHJvcENvbnRleHQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnR5TG9jYWxWYWx1ZXM7XG4gICAgfVxuXG5cbiAgICBpbml0UHJvcENvbnRleHQoY29udGV4dDogQ29udGV4dCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kaWRJbml0UHJvcENvbnRleHQgPSB0cnVlO1xuICAgICAgICBhc3NlcnQoIUNvbnRleHQuX0V4cGVuc2l2ZUNvbnRleHRDb25zaXN0ZW5jeUNoZWNrc0VuYWJsZWQgfHwgTGlzdFdyYXBwZXIubGFzdChcbiAgICAgICAgICAgIGNvbnRleHQuX2VudHJpZXMpID09PSB0aGlzLFxuICAgICAgICAgICAgJ2luaXRpbmcgcHJvcCBjb250ZXh0IG9uIHJlY29yZCBub3Qgb24gdG9wIG9mIHN0YWNrJyk7XG5cbiAgICAgICAgLy8gVG9kbzogYmFzZSBpdCBvbiB3aGV0aGVyIHdlJ3ZlIHRyaWVzIHlldCB0byBwcm9jZXNzIHRoZW0uXG5cbiAgICAgICAgbGV0IHByb3BBY3RpdmF0aW9uOiBBY3RpdmF0aW9uID0gKHRoaXMuc3JlYy5hY3RpdmF0aW9uLnByb3BlcnR5QWN0aXZhdGlvbihjb250ZXh0KSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQocHJvcEFjdGl2YXRpb24pKSB7XG4gICAgICAgICAgICBjb250ZXh0Ll9hcHBseVByb3BlcnR5QWN0aXZhdGlvbihwcm9wQWN0aXZhdGlvbiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNyZWMgPSBudWxsO1xuICAgICAgICB0aGlzLnZhbCA9IG51bGw7XG4gICAgICAgIHRoaXMubWFza2VkQnlJZHggPSAwO1xuICAgICAgICB0aGlzLl9kaWRJbml0UHJvcENvbnRleHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcHJvcGVydHlMb2NhbFNyZWMgPSBudWxsO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0eUxvY2FsVmFsdWVzID0gbnVsbDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBUaGUgJ3N0YXRpYycgKHNoYXJhYmxlKSBwYXJ0IG9mIGEgY29udGV4dCB2YWx1ZSBhc3NpZ25tZW50IHJlY29yZC5cbiAqIFRoZXNlcyBhcmUgY3JlYXRlZCBieSB0aGUgZmlyc3QgX0Fzc2lnbm1lbnQgdGhhdCBuZWVkcyB0aGVtXG4gKiBhbmQgdGhlbiBjYWNoZWQgZm9yIHJlLWFwcGxpY2F0aW9uIGluIHRoZWlyIF9BY3RpdmF0aW9uXG4gKiAgKHdoaWNoLCBpbiB0dXJuLCBpcyBzdG9yZWQgaW4gdGhlIGdsb2JhbCBhY3RpdmF0aW9uIHRyZWUpXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0aWNSZWMge1xuICAgIGFjdGl2YXRpb246IEFjdGl2YXRpb247XG4gICAgcHJpdmF0ZSBfa2V5OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfdmFsOiBhbnk7XG4gICAgbWF0Y2g6IE1hdGNoUmVzdWx0O1xuICAgIHNhbGllbmNlOiBudW1iZXIgPSAwO1xuICAgIGZyb21DaGFpbmluZzogYm9vbGVhbjtcbiAgICBsYXN0QXNzaWdubWVudElkeDogbnVtYmVyID0gMDtcblxuICAgIHByb3BlcnRpZXMoKTogUHJvcGVydHlNYXAge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLm1hdGNoKSkgPyB0aGlzLm1hdGNoLnByb3BlcnRpZXMoKSA6IENvbnRleHQuRW1wdHlNYXA7XG4gICAgfVxuXG4gICAgZ2V0IGtleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5O1xuICAgIH1cblxuICAgIHNldCBrZXkodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9rZXkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWw7XG4gICAgfVxuXG4gICAgc2V0IHZhbCh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX3ZhbCA9IHZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5QWNjZXNzb3Ige1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgfVxuXG4gICAgZ2V0KGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wcm9wZXJ0eUZvcktleShrZXkpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBNYXBXcmFwcGVyLnRvU3RyaW5nKHRoaXMuY29udGV4dC5hbGxQcm9wZXJ0aWVzKCkpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFNuYXBzaG90IGlzIHRoZSB3YXkgaG93IHRvIGNhcHR1cmUgYSBjdXJyZW50IHN0YXRlIG9mIHRoZSBjb250ZXh0IGFuZCB0aGVuIHJlcGxheSBpdCBiYWNrIHNvLlxuICogZm9yIGNhc2VzIHdoZW4gd2UgbmVlZCB0byBydW4gc29tZSBydWxlIGV4ZWN1dGlvbiBvdXRzaWRlIG9mIHRoZSBwdXNoL3BvcCBjeWNsZVxuICovXG5leHBvcnQgY2xhc3MgU25hcHNob3Qge1xuXG4gICAgX21ldGE6IE1ldGE7XG4gICAgX29yaWdDbGFzczogc3RyaW5nO1xuICAgIF9hc3NpZ25tZW50czogQXJyYXk8QXNzaWdubWVudFNuYXBzaG90PjtcbiAgICBfYWxsQXNzaWdubWVudHM6IEFycmF5PEFzc2lnbm1lbnRTbmFwc2hvdD47XG4gICAgX2lzTmVzdGVkOiBib29sZWFuO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb250ZXh0OiBDb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX21ldGEgPSBfY29udGV4dC5tZXRhO1xuICAgICAgICB0aGlzLl9vcmlnQ2xhc3MgPSBfY29udGV4dC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLl9hc3NpZ25tZW50cyA9IF9jb250ZXh0LmFjdGl2ZUFzc2lnbm1lbnRzKCk7XG4gICAgICAgIHRoaXMuX2FsbEFzc2lnbm1lbnRzID0gX2NvbnRleHQuYWxsQXNzaWdubWVudHMoKTtcbiAgICAgICAgdGhpcy5faXNOZXN0ZWQgPSBfY29udGV4dC5pc05lc3RlZDtcblxuICAgIH1cblxuXG4gICAgaHlkcmF0ZShzaGVsbENvcHk6IGJvb2xlYW4gPSB0cnVlKTogQ29udGV4dCB7XG4gICAgICAgIGxldCBhc3NpZ25tZW50cyA9IChzaGVsbENvcHkpID8gdGhpcy5fYXNzaWdubWVudHMgOiB0aGlzLl9hbGxBc3NpZ25tZW50cztcbiAgICAgICAgbGV0IG5ld0NvbnRleHQ6IENvbnRleHQgPSB0aGlzLl9tZXRhLm5ld0NvbnRleHQoKTtcbiAgICAgICAgbmV3Q29udGV4dC5wdXNoKCk7XG4gICAgICAgIGxldCBsYXN0Q254R2VuZXJhdGlvbiA9IDE7XG4gICAgICAgIGZvciAobGV0IGEgb2YgIGFzc2lnbm1lbnRzKSB7XG4gICAgICAgICAgICBpZiAobGFzdENueEdlbmVyYXRpb24gPCBhLnNhbGllbmNlKSB7XG4gICAgICAgICAgICAgICAgbmV3Q29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdDb250ZXh0LnNldChhLmtleSwgYS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3Q29udGV4dC5pc05lc3RlZCA9IHRoaXMuX2lzTmVzdGVkO1xuICAgICAgICByZXR1cm4gbmV3Q29udGV4dDtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgT2JqZWN0TWV0YUNvbnRleHQgZXh0ZW5kcyBDb250ZXh0IHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGVmYXVsdExvY2FsZSA9ICdlbic7XG5cbiAgICBwcml2YXRlIF9mb3JtYXR0ZXJzOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoX21ldGE6IE9iamVjdE1ldGEsIG5lc3RlZDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHN1cGVyKF9tZXRhLCBuZXN0ZWQpO1xuXG4gICAgfVxuXG5cbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgbGV0IG9iaiA9IHRoaXMub2JqZWN0O1xuXG4gICAgICAgIGlmIChpc0JsYW5rKG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmaWVsZFBhdGggPSB0aGlzLmZpZWxkUGF0aCgpO1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KGZpZWxkUGF0aCkgPyBmaWVsZFBhdGguZ2V0RmllbGRWYWx1ZShvYmopIDogdGhpcy5wcm9wZXJ0eUZvcktleSgndmFsdWUnKTtcbiAgICB9XG5cblxuICAgIHNldCB2YWx1ZSh2YWw6IGFueSkge1xuICAgICAgICBsZXQgZmllbGRQYXRoID0gdGhpcy5maWVsZFBhdGgoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChmaWVsZFBhdGgpKSB7XG4gICAgICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMub2JqZWN0KSwgJ0NhbGwgdG8gc2V0VmFsdWUoKSB3aXRoIG5vIGN1cnJlbnQgb2JqZWN0Jyk7XG4gICAgICAgICAgICBmaWVsZFBhdGguc2V0RmllbGRWYWx1ZSh0aGlzLm9iamVjdCwgdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuYWxsUHJvcGVydGllcygpLmdldChPYmplY3RNZXRhLktleVZhbHVlKTtcbiAgICAgICAgICAgIGFzc2VydChpc0R5bmFtaWNTZXR0YWJsZSh2YWx1ZSksICdDYW50IHNldCBkZXJpdmVkIHByb3BlcnR5OiAnICsgdmFsdWUpO1xuXG4gICAgICAgICAgICBsZXQgc2V0dGFibGU6IER5bmFtaWNTZXR0YWJsZVByb3BlcnR5VmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgKCg8RHluYW1pY1NldHRhYmxlUHJvcGVydHlWYWx1ZT52YWx1ZSkpLmV2YWx1YXRlU2V0KHRoaXMsIHZhbCk7XG4gICAgICAgICAgICBzZXR0YWJsZS5ldmFsdWF0ZVNldCh0aGlzLCB2YWwpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXQgb2JqZWN0KCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5nZXQoT2JqZWN0TWV0YS5LZXlPYmplY3QpO1xuICAgIH1cblxuICAgIGdldCBmb3JtYXR0ZXJzKCk6IE1hcDxzdHJpbmcsIGFueT4ge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLl9mb3JtYXR0ZXJzKSkge1xuICAgICAgICAgICAgdGhpcy5fZm9ybWF0dGVycyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlcnM7XG4gICAgfVxuXG4gICAgZmllbGRQYXRoKCk6IEZpZWxkUGF0aCB7XG4gICAgICAgIGxldCBwcm9wTWFwOiBPYmplY3RNZXRhUHJvcGVydHlNYXAgPSA8T2JqZWN0TWV0YVByb3BlcnR5TWFwPiB0aGlzLmFsbFByb3BlcnRpZXMoKTtcbiAgICAgICAgcmV0dXJuIHByb3BNYXAuZmllbGRQYXRoO1xuICAgIH1cblxuXG4gICAgbG9jYWxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBPYmplY3RNZXRhQ29udGV4dC5EZWZhdWx0TG9jYWxlO1xuICAgIH1cblxuICAgIHRpbWV6b25lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFVJQ29udGV4dCBleHRlbmRzIE9iamVjdE1ldGFDb250ZXh0IHtcblxuXG4gICAgY29uc3RydWN0b3IoX21ldGE6IFVJTWV0YSwgbmVzdGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgc3VwZXIoX21ldGEsIG5lc3RlZCk7XG4gICAgfVxuXG5cbiAgICAvLyB1c2VyIHZhbHVlcyBmcm9tIHVzZXIgc2V0dGluZ3MvbG9jYWxlc1xuICAgIGxvY2FsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gc3VwZXIubG9jYWxlKCk7XG4gICAgfVxuXG4gICAgdGltZXpvbmUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnRpbWV6b25lKCk7XG4gICAgfVxufVxuXG5cblxuXG4iXX0=