/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, ComponentFactoryResolver, Directive, forwardRef, Inject, Input, ViewContainerRef } from '@angular/core';
import { ComponentRegistry, DomUtilsService, IncludeComponentDirective } from '@aribaui/components';
import { Environment, equals, isBlank, isPresent, isString, MapWrapper, nonPrivatePrefix, StringWrapper } from '@aribaui/core';
import { NoMetaComponent } from './no-meta/no-meta.component';
import { ObjectMeta } from '../core/object-meta';
import { UIMeta } from '../core/uimeta';
import { ContextFieldPath, DynamicPropertyValue, ValueConverter } from '../core/property-value';
import { MetaContextComponent, MetaUIActionEvent } from '../core/meta-context/meta-context.component';
/**
 *  MetaIncludeComponentDirective is (along with MetaContext) the key element for binding MetaUI
 * into AngularJs user interfaces. You can think of it such GLUE.
 *
 *  MetaIncludeComponentDirective dynamically switches in a Angular's component based on the
 * current MetaContext's
 * 'component' property and sets its bindings from the 'bindings' property.  This alone enables
 * almost any existing Angular's widget to be specified for use for a particular field or layout
 * using rules -- without any additional glue code .
 *
 *  component using 'wrapperComponent' and 'wrapperBindings', binding component content using the
 * bindings 'ngcontent', ngcontentLayout and 'ngcontentelElement', and event binding named Content
 * templates using an
 * 'awcontentLayouts' map binding. Without this we will not be able to use complex layouts.
 *
 */
var MetaIncludeComponentDirective = /** @class */ (function (_super) {
    tslib_1.__extends(MetaIncludeComponentDirective, _super);
    function MetaIncludeComponentDirective(metaContext, viewContainer, factoryResolver, env, cd, compRegistry, domUtils) {
        var _this = _super.call(this, viewContainer, factoryResolver, cd, compRegistry) || this;
        _this.metaContext = metaContext;
        _this.viewContainer = viewContainer;
        _this.factoryResolver = factoryResolver;
        _this.env = env;
        _this.cd = cd;
        _this.compRegistry = compRegistry;
        _this.domUtils = domUtils;
        return _this;
    }
    /**
     * First we simply render the a component in the ngOnInit() and then every time something
     * changes.
     */
    /**
     * First we simply render the a component in the ngOnInit() and then every time something
     * changes.
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.ngDoCheck = /**
     * First we simply render the a component in the ngOnInit() and then every time something
     * changes.
     * @return {?}
     */
    function () {
        // console.log('MetaInclude(ngDoCheck):', this.name);
        var /** @type {?} */ context = this.metaContext.myContext();
        if (isBlank(context) || isBlank(this.currentComponent)) {
            // console.log('No context/ component for ' + this.name);
            return;
        }
        var /** @type {?} */ newComponent = context.propertyForKey('component');
        if (isPresent(newComponent) && isPresent(this.name) && (this.name !== newComponent)) {
            this.viewContainer.clear();
            this.doRenderComponent();
            // console.log('MetaInclude(ngDoCheck- rerender ):', this.name);
            this.createWrapperElementIfAny();
            this.createContentElementIfAny();
        }
        else {
            // we might not skip component instantiation but we still need to update bindings
            // as properties could change
            var /** @type {?} */ editable = context.propertyForKey(ObjectMeta.KeyEditable);
            if (isBlank(editable)) {
                editable = context.propertyForKey(UIMeta.KeyEditing);
            }
            var /** @type {?} */ metaBindings = context.propertyForKey(UIMeta.KeyBindings);
            var /** @type {?} */ type = context.propertyForKey(ObjectMeta.KeyType);
            var /** @type {?} */ inputs = this.componentReference().metadata.inputs;
            // re-apply Inputs
            // maybe we should diff properties and only if they changed re-apply
            if (isPresent(metaBindings) && isPresent(inputs)) {
                this.applyInputs(this.currentComponent, type, metaBindings, inputs, editable);
            }
        }
    };
    /*
     * Retrieves component Name from the Context.
     */
    /**
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.resolveComponentType = /**
     * @return {?}
     */
    function () {
        this.name = this.metaContext.myContext().propertyForKey(UIMeta.KeyComponentName);
        if (isBlank(this.name)) {
            return NoMetaComponent;
        }
        return _super.prototype.resolveComponentType.call(this);
    };
    /*
     * If there is a NG content as part of the bindings apply it and remove it from the list. In
     * the MetaUI world it can appear if we want to insert a text content into the element:
     *
     *
     *  trait=toManyLink {
     *         component:AWHyperlink;
     *         bindings: {
     *             action: ${
     *                this.set("object", value);
     *                this.set("actionCategory", "General");
     *                this.set("action", "Inspect");
     *                 meta.fireAction(this, true)
     *             };
     *             awcontent: "Click Me";
     *         }
     *     }
     *
     *
     */
    /**
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.ngContent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ cntValue;
        var /** @type {?} */ bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) &&
            isPresent(cntValue = bindings.get(IncludeComponentDirective.NgContent))) {
            cntValue = isString(cntValue) ? cntValue :
                this.metaContext.myContext().resolveValue(cntValue);
        }
        return cntValue;
    };
    /**
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.ngContentElement = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ cntValue;
        var /** @type {?} */ bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) &&
            isPresent(cntValue = bindings.get(IncludeComponentDirective.NgContentElement))) {
            cntValue = isString(cntValue) ? cntValue :
                this.metaContext.myContext().resolveValue(cntValue);
        }
        return cntValue;
    };
    /**
     * Implement custom behavior of adding ngcontentLayout described above (where the constant
     * is defined)
     *
     */
    /**
     * Implement custom behavior of adding ngcontentLayout described above (where the constant
     * is defined)
     *
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.createContentElementIfAny = /**
     * Implement custom behavior of adding ngcontentLayout described above (where the constant
     * is defined)
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ detectChanges = false;
        var /** @type {?} */ bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) && bindings.has(MetaIncludeComponentDirective.NgContentLayout)) {
            var /** @type {?} */ layoutName = bindings.get(MetaIncludeComponentDirective.NgContentLayout);
            var /** @type {?} */ context = this.metaContext.myContext();
            context.push();
            context.set(UIMeta.KeyLayout, layoutName);
            var /** @type {?} */ componentName = context.propertyForKey('component');
            var /** @type {?} */ compType = this.compRegistry.nameToType.get(componentName);
            var /** @type {?} */ componentFactory = this.factoryResolver
                .resolveComponentFactory(compType);
            var /** @type {?} */ componentMeta = this.resolveDirective(componentFactory);
            var /** @type {?} */ ngComponent = this.viewContainer.createComponent(componentFactory, 0);
            var /** @type {?} */ cReference = {
                metadata: componentMeta,
                resolvedCompFactory: componentFactory,
                componentType: compType,
                componentName: componentName
            };
            this.applyBindings(cReference, ngComponent, context.propertyForKey(UIMeta.KeyBindings), false);
            this.domUtils.insertIntoParentNgContent(this.currentComponent.location.nativeElement, ngComponent.location.nativeElement);
            context.pop();
            detectChanges = true;
        }
        else {
            detectChanges = _super.prototype.createContentElementIfAny.call(this);
        }
        if (detectChanges) {
            // console.log('MetaInclude(createContentElementIfAny):', this.name);
            this.cd.detectChanges();
        }
        return detectChanges;
    };
    /**
     * Meta placeTheComponent needs to account for wrapper component. If wrapper component
     * is present. It needs to inject the wrapper component on the page and add this component
     * inside the wrapper component.
     */
    /**
     * Meta placeTheComponent needs to account for wrapper component. If wrapper component
     * is present. It needs to inject the wrapper component on the page and add this component
     * inside the wrapper component.
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.createWrapperElementIfAny = /**
     * Meta placeTheComponent needs to account for wrapper component. If wrapper component
     * is present. It needs to inject the wrapper component on the page and add this component
     * inside the wrapper component.
     * @return {?}
     */
    function () {
        var /** @type {?} */ wrapperName = this.metaContext.myContext().propertyForKey(UIMeta.KeyWrapperComponent);
        if (isBlank(wrapperName)) {
            return;
        }
        // Now we have wrapperComponent. We do the following:
        // 1.  Create wrapper component.
        var /** @type {?} */ wrapperType = this.compRegistry.nameToType.get(wrapperName);
        var /** @type {?} */ componentFactory = this.factoryResolver
            .resolveComponentFactory(wrapperType);
        var /** @type {?} */ componentMeta = this.resolveDirective(wrapperType);
        var /** @type {?} */ wrapperComponent = this.viewContainer.createComponent(componentFactory);
        // 2. Add wrapper bindings to wrapper component.
        var /** @type {?} */ wrapperBindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyWrapperBinding);
        (/** @type {?} */ (wrapperComponent.instance))['bindings'] = wrapperBindings;
        // 3. Apply the bindings. Get the wrapper metadata, look through it's input - output
        // bindings. and apply the wrapperBindings to these bindings.
        var /** @type {?} */ wrapperComponentRef = {
            metadata: componentMeta,
            resolvedCompFactory: componentFactory,
            componentType: wrapperType,
            componentName: wrapperName
        };
        this.applyBindings(wrapperComponentRef, wrapperComponent, wrapperBindings);
        this.domUtils.insertIntoParentNgContent(wrapperComponent.location.nativeElement, this.currentComponent.location.nativeElement);
    };
    /**
     * ApplyBindings reads the @Inputs from ComponentMetadata and check if there exists a binding
     * coming from MetaRules. If there is we assign it to the input.
     */
    /**
     * ApplyBindings reads the \@Inputs from ComponentMetadata and check if there exists a binding
     * coming from MetaRules. If there is we assign it to the input.
     * @param {?} cRef
     * @param {?} component
     * @param {?} bindings
     * @param {?=} bUseMetaBindings
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.applyBindings = /**
     * ApplyBindings reads the \@Inputs from ComponentMetadata and check if there exists a binding
     * coming from MetaRules. If there is we assign it to the input.
     * @param {?} cRef
     * @param {?} component
     * @param {?} bindings
     * @param {?=} bUseMetaBindings
     * @return {?}
     */
    function (cRef, component, bindings, bUseMetaBindings) {
        if (bUseMetaBindings === void 0) { bUseMetaBindings = true; }
        _super.prototype.applyBindings.call(this, cRef, component, bindings);
        var /** @type {?} */ inputs = cRef.metadata.inputs;
        var /** @type {?} */ outputs = cRef.metadata.outputs;
        var /** @type {?} */ metaBindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        var /** @type {?} */ editable = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyEditable);
        var /** @type {?} */ type = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyType);
        // There are cases where we want to use the bindings passed into this function.
        // For example, the wrapperBindings.
        if (!bUseMetaBindings) {
            metaBindings = bindings;
        }
        if (isBlank(metaBindings) || isBlank(inputs)) {
            return;
        }
        var /** @type {?} */ currenBindings = MapWrapper.clone(metaBindings);
        this.applyInputs(component, type, currenBindings, inputs, editable);
        this.applyOutputs(component, currenBindings, outputs);
    };
    /**
     * @param {?} component
     * @param {?} type
     * @param {?} bindings
     * @param {?} inputs
     * @param {?} editable
     * @param {?=} compToBeRendered
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.applyInputs = /**
     * @param {?} component
     * @param {?} type
     * @param {?} bindings
     * @param {?} inputs
     * @param {?} editable
     * @param {?=} compToBeRendered
     * @return {?}
     */
    function (component, type, bindings, inputs, editable, compToBeRendered) {
        if (compToBeRendered === void 0) { compToBeRendered = true; }
        // propagate a field type to bindings.
        if (isPresent(type) && isPresent(component.instance.canSetType) &&
            component.instance.canSetType()) {
            bindings.set(ObjectMeta.KeyType, type);
        }
        if (isPresent(editable) && isPresent(component.instance['editable'])) {
            component.instance['editable'] = editable;
        }
        try {
            for (var inputs_1 = tslib_1.__values(inputs), inputs_1_1 = inputs_1.next(); !inputs_1_1.done; inputs_1_1 = inputs_1.next()) {
                var key = inputs_1_1.value;
                var /** @type {?} */ publicKey = nonPrivatePrefix(key);
                var /** @type {?} */ value = bindings.get(publicKey);
                // Handle special case where we do not pass explicitly or inherit from parent @Input
                // name for the component
                if (key === 'name' && isBlank(value)) {
                    value = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyField);
                }
                if (this.skipInput(key, value)) {
                    continue;
                }
                // compToBeRendered = only first time
                if (compToBeRendered && value instanceof ContextFieldPath) {
                    this.applyDynamicInputBindings(component.instance, bindings, inputs, key, value, editable);
                }
                else if (compToBeRendered && value instanceof DynamicPropertyValue) {
                    var /** @type {?} */ dynval = value;
                    var /** @type {?} */ newValue = dynval.evaluate(this.metaContext.myContext());
                    component.instance[publicKey] = newValue;
                }
                else {
                    /**
                                     * when re-applying Inputs skip all expressions above and only work with regular
                                     * types
                                     *
                                     * set it only if it changes so it will not trigger necessary `value changed
                                     * aftter check`
                                     */
                    if (!equals(component.instance[publicKey], value)) {
                        component.instance[publicKey] = value;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (inputs_1_1 && !inputs_1_1.done && (_a = inputs_1.return)) _a.call(inputs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // apply Formatter that can be specified in the oss
        // temporary disabled untill angular will support runtime i18n
        // if (bindings.has(MetaIncludeComponentDirective.FormatterBinding)) {
        //     let transform = this.formatters
        //         .get(bindings.get(MetaIncludeComponentDirective.FormatterBinding));
        //     component.instance[MetaIncludeComponentDirective.FormatterBinding] = transform;
        // }
        var e_1, _a;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.skipInput = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        return isBlank(value) || key === IncludeComponentDirective.NgContent ||
            key === MetaIncludeComponentDirective.NgContentLayout;
    };
    /**
     * @param {?} component
     * @param {?} bindings
     * @param {?} outputs
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.applyOutputs = /**
     * @param {?} component
     * @param {?} bindings
     * @param {?} outputs
     * @return {?}
     */
    function (component, bindings, outputs) {
        var _this = this;
        var _loop_1 = function (key) {
            var /** @type {?} */ publicKey = nonPrivatePrefix(key);
            var /** @type {?} */ value = bindings.get(publicKey);
            if (key === IncludeComponentDirective.NgContent) {
                return "continue";
            }
            var /** @type {?} */ eventEmitter = component.instance[publicKey];
            if (value instanceof DynamicPropertyValue) {
                this_1.applyDynamicOutputBinding(eventEmitter, value, this_1.metaContext.myContext());
            }
            else {
                // just trigger event outside
                eventEmitter.subscribe(function (val) {
                    if (_this.env.hasValue('parent-cnx')) {
                        var /** @type {?} */ event_1 = val;
                        var /** @type {?} */ cnx = _this.env.getValue('parent-cnx');
                        if (!(val instanceof MetaUIActionEvent)) {
                            event_1 = new MetaUIActionEvent(component.instance, publicKey, publicKey, val);
                        }
                        cnx.onAction.emit(event_1);
                    }
                });
            }
        };
        var this_1 = this;
        try {
            for (var outputs_1 = tslib_1.__values(outputs), outputs_1_1 = outputs_1.next(); !outputs_1_1.done; outputs_1_1 = outputs_1.next()) {
                var key = outputs_1_1.value;
                _loop_1(key);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (outputs_1_1 && !outputs_1_1.done && (_a = outputs_1.return)) _a.call(outputs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _a;
    };
    /**
     * @param {?} emitter
     * @param {?} value
     * @param {?} context
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.applyDynamicOutputBinding = /**
     * @param {?} emitter
     * @param {?} value
     * @param {?} context
     * @return {?}
     */
    function (emitter, value, context) {
        emitter.asObservable().subscribe(function (val) {
            var /** @type {?} */ dynval = value;
            context.resolveValue(dynval);
        });
    };
    /**
     * @param {?} me
     * @param {?} bindings
     * @param {?} inputs
     * @param {?} key
     * @param {?} value
     * @param {?} editable
     * @return {?}
     */
    MetaIncludeComponentDirective.prototype.applyDynamicInputBindings = /**
     * @param {?} me
     * @param {?} bindings
     * @param {?} inputs
     * @param {?} key
     * @param {?} value
     * @param {?} editable
     * @return {?}
     */
    function (me, bindings, inputs, key, value, editable) {
        var _this = this;
        var /** @type {?} */ publicKey = nonPrivatePrefix(key);
        var /** @type {?} */ cnxtPath = value;
        var /** @type {?} */ metaContext = this.metaContext;
        /**
                 * captured also current context snapshot so we can replay ContextFieldPath.evaluate() if
                 * called outside of push/pop cycle.
                 *
                 * todo: check if we can replace this with Custom value accessor
                 */
        Object.defineProperty(me, publicKey, {
            get: function () {
                var /** @type {?} */ context = _this.metaContext.myContext();
                return cnxtPath.evaluate(context);
            },
            set: function (val) {
                var /** @type {?} */ context = _this.metaContext.myContext();
                var /** @type {?} */ editing = context.propertyForKey(ObjectMeta.KeyEditable)
                    || context.propertyForKey(UIMeta.KeyEditing);
                if (editing && !StringWrapper.equals(val, me[publicKey])) {
                    var /** @type {?} */ type = context.propertyForKey(ObjectMeta.KeyType);
                    cnxtPath.evaluateSet(context, ValueConverter.value(type, val));
                }
            },
            enumerable: true,
            configurable: true
        });
    };
    /**
     * Just a constant use to access Environment where we store current context for current render
     * lifecycle
     *
     */
    MetaIncludeComponentDirective.FormatterBinding = 'formatter';
    /**
     *
     * In metaU we can also insert into the element not only ngcontent but new instantiated
     * component which is defined by layout
     *
     * ```
     * field trait=ObjectDetail {
     * 	editable=false {
     * 		component: HoverCardComponnet;
     * 		bindings: {
     * 			ngcontentLayout: Content;
     * 			linkTitle:${properties.get("label")};
     * 		}
     * 	}
     *
     * \@layout=Content {
     * 		component: MetaContextObject;
     * 		bindings: {
     * 			object: $value;
     * 			layout:DetailLayout
     * 			operation:"view";
     * 		}
     * 	}
     * }
     * ```
     *
     */
    MetaIncludeComponentDirective.NgContentLayout = 'ngcontentLayout';
    MetaIncludeComponentDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'm-include-component'
                },] },
    ];
    /** @nocollapse */
    MetaIncludeComponentDirective.ctorParameters = function () { return [
        { type: MetaContextComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return MetaContextComponent; }),] }] },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Environment },
        { type: ChangeDetectorRef },
        { type: ComponentRegistry },
        { type: DomUtilsService }
    ]; };
    MetaIncludeComponentDirective.propDecorators = {
        context: [{ type: Input }]
    };
    return MetaIncludeComponentDirective;
}(IncludeComponentDirective));
export { MetaIncludeComponentDirective };
function MetaIncludeComponentDirective_tsickle_Closure_declarations() {
    /**
     * Just a constant use to access Environment where we store current context for current render
     * lifecycle
     *
     * @type {?}
     */
    MetaIncludeComponentDirective.FormatterBinding;
    /**
     *
     * In metaU we can also insert into the element not only ngcontent but new instantiated
     * component which is defined by layout
     *
     * ```
     * field trait=ObjectDetail {
     * 	editable=false {
     * 		component: HoverCardComponnet;
     * 		bindings: {
     * 			ngcontentLayout: Content;
     * 			linkTitle:${properties.get("label")};
     * 		}
     * 	}
     *
     * \@layout=Content {
     * 		component: MetaContextObject;
     * 		bindings: {
     * 			object: $value;
     * 			layout:DetailLayout
     * 			operation:"view";
     * 		}
     * 	}
     * }
     * ```
     *
     * @type {?}
     */
    MetaIncludeComponentDirective.NgContentLayout;
    /**
     * I could not find any realiable way how to access parent view. Even forwardRef up to certain
     * point worked but had to get away from this approach as it fails for my usecase when updating
     * context and pushing new properties to the stack.
     * @type {?}
     */
    MetaIncludeComponentDirective.prototype.context;
    /** @type {?} */
    MetaIncludeComponentDirective.prototype.metaContext;
    /** @type {?} */
    MetaIncludeComponentDirective.prototype.viewContainer;
    /** @type {?} */
    MetaIncludeComponentDirective.prototype.factoryResolver;
    /** @type {?} */
    MetaIncludeComponentDirective.prototype.env;
    /** @type {?} */
    MetaIncludeComponentDirective.prototype.cd;
    /** @type {?} */
    MetaIncludeComponentDirective.prototype.compRegistry;
    /** @type {?} */
    MetaIncludeComponentDirective.prototype.domUtils;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1pbmNsdWRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWluY2x1ZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBbUJBLE9BQU8sRUFFSCxpQkFBaUIsRUFHakIsd0JBQXdCLEVBRXhCLFNBQVMsRUFHVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVILGlCQUFpQixFQUNqQixlQUFlLEVBQ2YseUJBQXlCLEVBQzVCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNILFdBQVcsRUFDWCxNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixhQUFhLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RixPQUFPLEVBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JqRCx5REFBeUI7SUFrRHhFLHVDQUNtQixXQUFpQyxFQUNqQyxlQUNBLGlCQUNBLEtBQ0EsSUFDQSxjQUNBO1FBUG5CLFlBUUksa0JBQU0sYUFBYSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsWUFBWSxDQUFDLFNBRTFEO1FBVGtCLGlCQUFXLEdBQVgsV0FBVyxDQUFzQjtRQUNqQyxtQkFBYSxHQUFiLGFB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QWlCO2dCQUNqQixlQUFlOzs7MEJBc0ZkLEtBQUs7O3dDQTVIVjtFQThFbUQseUJBQXlCO1NBQS9ELDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIERvQ2hlY2ssXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIFR5cGUsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50UmVmZXJlbmNlLFxuICAgIENvbXBvbmVudFJlZ2lzdHJ5LFxuICAgIERvbVV0aWxzU2VydmljZSxcbiAgICBJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlXG59IGZyb20gJ0BhcmliYXVpL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgICBFbnZpcm9ubWVudCxcbiAgICBlcXVhbHMsXG4gICAgaXNCbGFuayxcbiAgICBpc1ByZXNlbnQsXG4gICAgaXNTdHJpbmcsXG4gICAgTWFwV3JhcHBlcixcbiAgICBub25Qcml2YXRlUHJlZml4LFxuICAgIFN0cmluZ1dyYXBwZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge05vTWV0YUNvbXBvbmVudH0gZnJvbSAnLi9uby1tZXRhL25vLW1ldGEuY29tcG9uZW50JztcbmltcG9ydCB7T2JqZWN0TWV0YX0gZnJvbSAnLi4vY29yZS9vYmplY3QtbWV0YSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtDb250ZXh0RmllbGRQYXRoLCBEeW5hbWljUHJvcGVydHlWYWx1ZSwgVmFsdWVDb252ZXJ0ZXJ9IGZyb20gJy4uL2NvcmUvcHJvcGVydHktdmFsdWUnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudCwgTWV0YVVJQWN0aW9uRXZlbnR9IGZyb20gJy4uL2NvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuXG5cbi8qKlxuICogIE1ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlIGlzIChhbG9uZyB3aXRoIE1ldGFDb250ZXh0KSB0aGUga2V5IGVsZW1lbnQgZm9yIGJpbmRpbmcgTWV0YVVJXG4gKiBpbnRvIEFuZ3VsYXJKcyB1c2VyIGludGVyZmFjZXMuIFlvdSBjYW4gdGhpbmsgb2YgaXQgc3VjaCBHTFVFLlxuICpcbiAqICBNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZSBkeW5hbWljYWxseSBzd2l0Y2hlcyBpbiBhIEFuZ3VsYXIncyBjb21wb25lbnQgYmFzZWQgb24gdGhlXG4gKiBjdXJyZW50IE1ldGFDb250ZXh0J3NcbiAqICdjb21wb25lbnQnIHByb3BlcnR5IGFuZCBzZXRzIGl0cyBiaW5kaW5ncyBmcm9tIHRoZSAnYmluZGluZ3MnIHByb3BlcnR5LiAgVGhpcyBhbG9uZSBlbmFibGVzXG4gKiBhbG1vc3QgYW55IGV4aXN0aW5nIEFuZ3VsYXIncyB3aWRnZXQgdG8gYmUgc3BlY2lmaWVkIGZvciB1c2UgZm9yIGEgcGFydGljdWxhciBmaWVsZCBvciBsYXlvdXRcbiAqIHVzaW5nIHJ1bGVzIC0tIHdpdGhvdXQgYW55IGFkZGl0aW9uYWwgZ2x1ZSBjb2RlIC5cbiAqXG4gKiAgY29tcG9uZW50IHVzaW5nICd3cmFwcGVyQ29tcG9uZW50JyBhbmQgJ3dyYXBwZXJCaW5kaW5ncycsIGJpbmRpbmcgY29tcG9uZW50IGNvbnRlbnQgdXNpbmcgdGhlXG4gKiBiaW5kaW5ncyAnbmdjb250ZW50Jywgbmdjb250ZW50TGF5b3V0IGFuZCAnbmdjb250ZW50ZWxFbGVtZW50JywgYW5kIGV2ZW50IGJpbmRpbmcgbmFtZWQgQ29udGVudFxuICogdGVtcGxhdGVzIHVzaW5nIGFuXG4gKiAnYXdjb250ZW50TGF5b3V0cycgbWFwIGJpbmRpbmcuIFdpdGhvdXQgdGhpcyB3ZSB3aWxsIG5vdCBiZSBhYmxlIHRvIHVzZSBjb21wbGV4IGxheW91dHMuXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ20taW5jbHVkZS1jb21wb25lbnQnXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlIGV4dGVuZHMgSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZSBpbXBsZW1lbnRzIERvQ2hlY2ssXG4gICAgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBKdXN0IGEgY29uc3RhbnQgdXNlIHRvIGFjY2VzcyBFbnZpcm9ubWVudCB3aGVyZSB3ZSBzdG9yZSBjdXJyZW50IGNvbnRleHQgZm9yIGN1cnJlbnQgcmVuZGVyXG4gICAgICogbGlmZWN5Y2xlXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgRm9ybWF0dGVyQmluZGluZyA9ICdmb3JtYXR0ZXInO1xuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEluIG1ldGFVIHdlIGNhbiBhbHNvIGluc2VydCBpbnRvIHRoZSBlbGVtZW50IG5vdCBvbmx5IG5nY29udGVudCBidXQgbmV3IGluc3RhbnRpYXRlZFxuICAgICAqIGNvbXBvbmVudCB3aGljaCBpcyBkZWZpbmVkIGJ5IGxheW91dFxuICAgICAqXG4gICAgICpgYGBcbiAgICAgKiBmaWVsZCB0cmFpdD1PYmplY3REZXRhaWwge1xuICAgICAqIFx0ZWRpdGFibGU9ZmFsc2Uge1xuICAgICAqIFx0XHRjb21wb25lbnQ6IEhvdmVyQ2FyZENvbXBvbm5ldDtcbiAgICAgKiBcdFx0YmluZGluZ3M6IHtcbiAgICAgKiBcdFx0XHRuZ2NvbnRlbnRMYXlvdXQ6IENvbnRlbnQ7XG4gICAgICogXHRcdFx0bGlua1RpdGxlOiR7cHJvcGVydGllcy5nZXQoXCJsYWJlbFwiKX07XG4gICAgICogXHRcdH1cbiAgICAgKiBcdH1cbiAgICAgKlxuICAgICAqICAgIEBsYXlvdXQ9Q29udGVudCB7XG4gICAgICogXHRcdGNvbXBvbmVudDogTWV0YUNvbnRleHRPYmplY3Q7XG4gICAgICogXHRcdGJpbmRpbmdzOiB7XG4gICAgICogXHRcdFx0b2JqZWN0OiAkdmFsdWU7XG4gICAgICogXHRcdFx0bGF5b3V0OkRldGFpbExheW91dFxuICAgICAqIFx0XHRcdG9wZXJhdGlvbjpcInZpZXdcIjtcbiAgICAgKiBcdFx0fVxuICAgICAqIFx0fVxuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBOZ0NvbnRlbnRMYXlvdXQgPSAnbmdjb250ZW50TGF5b3V0JztcblxuXG4gICAgLyoqXG4gICAgICogSSBjb3VsZCBub3QgZmluZCBhbnkgcmVhbGlhYmxlIHdheSBob3cgdG8gYWNjZXNzIHBhcmVudCB2aWV3LiBFdmVuIGZvcndhcmRSZWYgdXAgdG8gY2VydGFpblxuICAgICAqIHBvaW50IHdvcmtlZCBidXQgaGFkIHRvIGdldCBhd2F5IGZyb20gdGhpcyBhcHByb2FjaCBhcyBpdCBmYWlscyBmb3IgbXkgdXNlY2FzZSB3aGVuIHVwZGF0aW5nXG4gICAgICogY29udGV4dCBhbmQgcHVzaGluZyBuZXcgcHJvcGVydGllcyB0byB0aGUgc3RhY2suXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudDtcblxuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1ldGFDb250ZXh0Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwdWJsaWMgbWV0YUNvbnRleHQ6IE1ldGFDb250ZXh0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBmYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjb21wUmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIHB1YmxpYyBkb21VdGlsczogRG9tVXRpbHNTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKHZpZXdDb250YWluZXIsIGZhY3RvcnlSZXNvbHZlciwgY2QsIGNvbXBSZWdpc3RyeSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaXJzdCB3ZSBzaW1wbHkgcmVuZGVyIHRoZSBhIGNvbXBvbmVudCBpbiB0aGUgbmdPbkluaXQoKSBhbmQgdGhlbiBldmVyeSB0aW1lIHNvbWV0aGluZ1xuICAgICAqIGNoYW5nZXMuXG4gICAgICovXG4gICAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWV0YUluY2x1ZGUobmdEb0NoZWNrKTonLCB0aGlzLm5hbWUpO1xuXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKTtcbiAgICAgICAgaWYgKGlzQmxhbmsoY29udGV4dCkgfHwgaXNCbGFuayh0aGlzLmN1cnJlbnRDb21wb25lbnQpKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTm8gY29udGV4dC8gY29tcG9uZW50IGZvciAnICsgdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdDb21wb25lbnQgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KCdjb21wb25lbnQnKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChuZXdDb21wb25lbnQpICYmIGlzUHJlc2VudCh0aGlzLm5hbWUpICYmICh0aGlzLm5hbWUgIT09IG5ld0NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5kb1JlbmRlckNvbXBvbmVudCgpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01ldGFJbmNsdWRlKG5nRG9DaGVjay0gcmVyZW5kZXIgKTonLCB0aGlzLm5hbWUpO1xuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVdyYXBwZXJFbGVtZW50SWZBbnkoKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29udGVudEVsZW1lbnRJZkFueSgpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyB3ZSBtaWdodCBub3Qgc2tpcCBjb21wb25lbnQgaW5zdGFudGlhdGlvbiBidXQgd2Ugc3RpbGwgbmVlZCB0byB1cGRhdGUgYmluZGluZ3NcbiAgICAgICAgICAgIC8vIGFzIHByb3BlcnRpZXMgY291bGQgY2hhbmdlXG4gICAgICAgICAgICBsZXQgZWRpdGFibGUgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5RWRpdGFibGUpO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsoZWRpdGFibGUpKSB7XG4gICAgICAgICAgICAgICAgZWRpdGFibGUgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlFZGl0aW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBtZXRhQmluZGluZ3MgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyk7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlUeXBlKTtcbiAgICAgICAgICAgIGxldCBpbnB1dHM6IHN0cmluZ1tdID0gdGhpcy5jb21wb25lbnRSZWZlcmVuY2UoKS5tZXRhZGF0YS5pbnB1dHM7XG5cbiAgICAgICAgICAgIC8vIHJlLWFwcGx5IElucHV0c1xuICAgICAgICAgICAgLy8gbWF5YmUgd2Ugc2hvdWxkIGRpZmYgcHJvcGVydGllcyBhbmQgb25seSBpZiB0aGV5IGNoYW5nZWQgcmUtYXBwbHlcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQobWV0YUJpbmRpbmdzKSAmJiBpc1ByZXNlbnQoaW5wdXRzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlJbnB1dHModGhpcy5jdXJyZW50Q29tcG9uZW50LCB0eXBlLCBtZXRhQmluZGluZ3MsIGlucHV0cywgZWRpdGFibGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqIFJldHJpZXZlcyBjb21wb25lbnQgTmFtZSBmcm9tIHRoZSBDb250ZXh0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCByZXNvbHZlQ29tcG9uZW50VHlwZSgpOiBUeXBlPGFueT4ge1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlDb21wb25lbnROYW1lKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gTm9NZXRhQ29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5yZXNvbHZlQ29tcG9uZW50VHlwZSgpO1xuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiBJZiB0aGVyZSBpcyBhIE5HIGNvbnRlbnQgYXMgcGFydCBvZiB0aGUgYmluZGluZ3MgYXBwbHkgaXQgYW5kIHJlbW92ZSBpdCBmcm9tIHRoZSBsaXN0LiBJblxuICAgICAqIHRoZSBNZXRhVUkgd29ybGQgaXQgY2FuIGFwcGVhciBpZiB3ZSB3YW50IHRvIGluc2VydCBhIHRleHQgY29udGVudCBpbnRvIHRoZSBlbGVtZW50OlxuICAgICAqXG4gICAgICpcbiAgICAgKiAgdHJhaXQ9dG9NYW55TGluayB7XG4gICAgICogICAgICAgICBjb21wb25lbnQ6QVdIeXBlcmxpbms7XG4gICAgICogICAgICAgICBiaW5kaW5nczoge1xuICAgICAqICAgICAgICAgICAgIGFjdGlvbjogJHtcbiAgICAgKiAgICAgICAgICAgICAgICB0aGlzLnNldChcIm9iamVjdFwiLCB2YWx1ZSk7XG4gICAgICogICAgICAgICAgICAgICAgdGhpcy5zZXQoXCJhY3Rpb25DYXRlZ29yeVwiLCBcIkdlbmVyYWxcIik7XG4gICAgICogICAgICAgICAgICAgICAgdGhpcy5zZXQoXCJhY3Rpb25cIiwgXCJJbnNwZWN0XCIpO1xuICAgICAqICAgICAgICAgICAgICAgICBtZXRhLmZpcmVBY3Rpb24odGhpcywgdHJ1ZSlcbiAgICAgKiAgICAgICAgICAgICB9O1xuICAgICAqICAgICAgICAgICAgIGF3Y29udGVudDogXCJDbGljayBNZVwiO1xuICAgICAqICAgICAgICAgfVxuICAgICAqICAgICB9XG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBuZ0NvbnRlbnQoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNudFZhbHVlOiBhbnk7XG4gICAgICAgIGxldCBiaW5kaW5ncyA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGJpbmRpbmdzKSAmJlxuICAgICAgICAgICAgaXNQcmVzZW50KGNudFZhbHVlID0gYmluZGluZ3MuZ2V0KEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50KSkpIHtcbiAgICAgICAgICAgIGNudFZhbHVlID0gaXNTdHJpbmcoY250VmFsdWUpID8gY250VmFsdWUgOlxuICAgICAgICAgICAgICAgIHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucmVzb2x2ZVZhbHVlKGNudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY250VmFsdWU7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgbmdDb250ZW50RWxlbWVudCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY250VmFsdWU6IGFueTtcbiAgICAgICAgbGV0IGJpbmRpbmdzID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5QmluZGluZ3MpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmluZGluZ3MpICYmXG4gICAgICAgICAgICBpc1ByZXNlbnQoY250VmFsdWUgPSBiaW5kaW5ncy5nZXQoSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5OZ0NvbnRlbnRFbGVtZW50KSkpIHtcbiAgICAgICAgICAgIGNudFZhbHVlID0gaXNTdHJpbmcoY250VmFsdWUpID8gY250VmFsdWUgOlxuICAgICAgICAgICAgICAgIHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucmVzb2x2ZVZhbHVlKGNudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY250VmFsdWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgY3VzdG9tIGJlaGF2aW9yIG9mIGFkZGluZyBuZ2NvbnRlbnRMYXlvdXQgZGVzY3JpYmVkIGFib3ZlICh3aGVyZSB0aGUgY29uc3RhbnRcbiAgICAgKiBpcyBkZWZpbmVkKVxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNvbnRlbnRFbGVtZW50SWZBbnkoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBkZXRlY3RDaGFuZ2VzID0gZmFsc2U7XG4gICAgICAgIGxldCBiaW5kaW5ncyA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcblxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmluZGluZ3MpICYmIGJpbmRpbmdzLmhhcyhNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5OZ0NvbnRlbnRMYXlvdXQpKSB7XG5cbiAgICAgICAgICAgIGxldCBsYXlvdXROYW1lID0gYmluZGluZ3MuZ2V0KE1ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudExheW91dCk7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCk7XG5cbiAgICAgICAgICAgIGNvbnRleHQucHVzaCgpO1xuICAgICAgICAgICAgY29udGV4dC5zZXQoVUlNZXRhLktleUxheW91dCwgbGF5b3V0TmFtZSk7XG5cbiAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gY29udGV4dC5wcm9wZXJ0eUZvcktleSgnY29tcG9uZW50Jyk7XG4gICAgICAgICAgICBsZXQgY29tcFR5cGUgPSB0aGlzLmNvbXBSZWdpc3RyeS5uYW1lVG9UeXBlLmdldChjb21wb25lbnROYW1lKTtcblxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMuZmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBUeXBlKTtcblxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudE1ldGE6IENvbXBvbmVudCA9IHRoaXMucmVzb2x2ZURpcmVjdGl2ZShjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgICAgIGxldCBuZ0NvbXBvbmVudCA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSwgMCk7XG5cbiAgICAgICAgICAgIGxldCBjUmVmZXJlbmNlOiBDb21wb25lbnRSZWZlcmVuY2UgPSB7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IGNvbXBvbmVudE1ldGEsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRDb21wRmFjdG9yeTogY29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlOiBjb21wVHlwZSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnROYW1lOiBjb21wb25lbnROYW1lXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmFwcGx5QmluZGluZ3MoY1JlZmVyZW5jZSwgbmdDb21wb25lbnQsIGNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKSxcbiAgICAgICAgICAgICAgICBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZG9tVXRpbHMuaW5zZXJ0SW50b1BhcmVudE5nQ29udGVudCh0aGlzLmN1cnJlbnRDb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICBuZ0NvbXBvbmVudC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgY29udGV4dC5wb3AoKTtcblxuICAgICAgICAgICAgZGV0ZWN0Q2hhbmdlcyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXRlY3RDaGFuZ2VzID0gc3VwZXIuY3JlYXRlQ29udGVudEVsZW1lbnRJZkFueSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXRlY3RDaGFuZ2VzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTWV0YUluY2x1ZGUoY3JlYXRlQ29udGVudEVsZW1lbnRJZkFueSk6JywgdGhpcy5uYW1lKTtcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRldGVjdENoYW5nZXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRhIHBsYWNlVGhlQ29tcG9uZW50IG5lZWRzIHRvIGFjY291bnQgZm9yIHdyYXBwZXIgY29tcG9uZW50LiBJZiB3cmFwcGVyIGNvbXBvbmVudFxuICAgICAqIGlzIHByZXNlbnQuIEl0IG5lZWRzIHRvIGluamVjdCB0aGUgd3JhcHBlciBjb21wb25lbnQgb24gdGhlIHBhZ2UgYW5kIGFkZCB0aGlzIGNvbXBvbmVudFxuICAgICAqIGluc2lkZSB0aGUgd3JhcHBlciBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVdyYXBwZXJFbGVtZW50SWZBbnkoKTogdm9pZCB7XG4gICAgICAgIGxldCB3cmFwcGVyTmFtZSA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleVdyYXBwZXJDb21wb25lbnQpO1xuICAgICAgICBpZiAoaXNCbGFuayh3cmFwcGVyTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdyB3ZSBoYXZlIHdyYXBwZXJDb21wb25lbnQuIFdlIGRvIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIC8vIDEuICBDcmVhdGUgd3JhcHBlciBjb21wb25lbnQuXG4gICAgICAgIGxldCB3cmFwcGVyVHlwZSA9IHRoaXMuY29tcFJlZ2lzdHJ5Lm5hbWVUb1R5cGUuZ2V0KHdyYXBwZXJOYW1lKTtcblxuICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+ID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh3cmFwcGVyVHlwZSk7XG4gICAgICAgIGxldCBjb21wb25lbnRNZXRhOiBDb21wb25lbnQgPSB0aGlzLnJlc29sdmVEaXJlY3RpdmUod3JhcHBlclR5cGUpO1xuXG4gICAgICAgIGxldCB3cmFwcGVyQ29tcG9uZW50ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvLyAyLiBBZGQgd3JhcHBlciBiaW5kaW5ncyB0byB3cmFwcGVyIGNvbXBvbmVudC5cbiAgICAgICAgbGV0IHdyYXBwZXJCaW5kaW5ncyA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleVdyYXBwZXJCaW5kaW5nKTtcbiAgICAgICAgKDxhbnk+IHdyYXBwZXJDb21wb25lbnQuaW5zdGFuY2UpWydiaW5kaW5ncyddID0gd3JhcHBlckJpbmRpbmdzO1xuXG4gICAgICAgIC8vIDMuIEFwcGx5IHRoZSBiaW5kaW5ncy4gR2V0IHRoZSB3cmFwcGVyIG1ldGFkYXRhLCBsb29rIHRocm91Z2ggaXQncyBpbnB1dCAtIG91dHB1dFxuICAgICAgICAvLyBiaW5kaW5ncy4gYW5kIGFwcGx5IHRoZSB3cmFwcGVyQmluZGluZ3MgdG8gdGhlc2UgYmluZGluZ3MuXG4gICAgICAgIGxldCB3cmFwcGVyQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWZlcmVuY2UgPSB7XG4gICAgICAgICAgICBtZXRhZGF0YTogY29tcG9uZW50TWV0YSxcbiAgICAgICAgICAgIHJlc29sdmVkQ29tcEZhY3Rvcnk6IGNvbXBvbmVudEZhY3RvcnksXG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiB3cmFwcGVyVHlwZSxcbiAgICAgICAgICAgIGNvbXBvbmVudE5hbWU6IHdyYXBwZXJOYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hcHBseUJpbmRpbmdzKHdyYXBwZXJDb21wb25lbnRSZWYsIHdyYXBwZXJDb21wb25lbnQsIHdyYXBwZXJCaW5kaW5ncyk7XG4gICAgICAgIHRoaXMuZG9tVXRpbHMuaW5zZXJ0SW50b1BhcmVudE5nQ29udGVudCh3cmFwcGVyQ29tcG9uZW50LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBcHBseUJpbmRpbmdzIHJlYWRzIHRoZSBASW5wdXRzIGZyb20gQ29tcG9uZW50TWV0YWRhdGEgYW5kIGNoZWNrIGlmIHRoZXJlIGV4aXN0cyBhIGJpbmRpbmdcbiAgICAgKiBjb21pbmcgZnJvbSBNZXRhUnVsZXMuIElmIHRoZXJlIGlzIHdlIGFzc2lnbiBpdCB0byB0aGUgaW5wdXQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFwcGx5QmluZGluZ3MoY1JlZjogQ29tcG9uZW50UmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZ3M6IE1hcDxzdHJpbmcsIGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYlVzZU1ldGFCaW5kaW5nczogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuYXBwbHlCaW5kaW5ncyhjUmVmLCBjb21wb25lbnQsIGJpbmRpbmdzKTtcbiAgICAgICAgbGV0IGlucHV0czogc3RyaW5nW10gPSBjUmVmLm1ldGFkYXRhLmlucHV0cztcbiAgICAgICAgbGV0IG91dHB1dHM6IHN0cmluZ1tdID0gY1JlZi5tZXRhZGF0YS5vdXRwdXRzO1xuXG4gICAgICAgIGxldCBtZXRhQmluZGluZ3MgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyk7XG4gICAgICAgIGxldCBlZGl0YWJsZSA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlFZGl0YWJsZSk7XG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleVR5cGUpO1xuXG4gICAgICAgIC8vIFRoZXJlIGFyZSBjYXNlcyB3aGVyZSB3ZSB3YW50IHRvIHVzZSB0aGUgYmluZGluZ3MgcGFzc2VkIGludG8gdGhpcyBmdW5jdGlvbi5cbiAgICAgICAgLy8gRm9yIGV4YW1wbGUsIHRoZSB3cmFwcGVyQmluZGluZ3MuXG4gICAgICAgIGlmICghYlVzZU1ldGFCaW5kaW5ncykge1xuICAgICAgICAgICAgbWV0YUJpbmRpbmdzID0gYmluZGluZ3M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayhtZXRhQmluZGluZ3MpIHx8IGlzQmxhbmsoaW5wdXRzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbkJpbmRpbmdzID0gTWFwV3JhcHBlci5jbG9uZShtZXRhQmluZGluZ3MpO1xuICAgICAgICB0aGlzLmFwcGx5SW5wdXRzKGNvbXBvbmVudCwgdHlwZSwgY3VycmVuQmluZGluZ3MsIGlucHV0cywgZWRpdGFibGUpO1xuICAgICAgICB0aGlzLmFwcGx5T3V0cHV0cyhjb21wb25lbnQsIGN1cnJlbkJpbmRpbmdzLCBvdXRwdXRzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5SW5wdXRzKGNvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT4sIHR5cGU6IGFueSwgYmluZGluZ3M6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0czogc3RyaW5nW10sIGVkaXRhYmxlOiBhbnksIGNvbXBUb0JlUmVuZGVyZWQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIC8vIHByb3BhZ2F0ZSBhIGZpZWxkIHR5cGUgdG8gYmluZGluZ3MuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodHlwZSkgJiYgaXNQcmVzZW50KGNvbXBvbmVudC5pbnN0YW5jZS5jYW5TZXRUeXBlKSAmJlxuICAgICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlLmNhblNldFR5cGUoKSkge1xuICAgICAgICAgICAgYmluZGluZ3Muc2V0KE9iamVjdE1ldGEuS2V5VHlwZSwgdHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KGVkaXRhYmxlKSAmJiBpc1ByZXNlbnQoY29tcG9uZW50Lmluc3RhbmNlWydlZGl0YWJsZSddKSkge1xuICAgICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlWydlZGl0YWJsZSddID0gZWRpdGFibGU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBrZXkgb2YgaW5wdXRzKSB7XG4gICAgICAgICAgICBsZXQgcHVibGljS2V5ID0gbm9uUHJpdmF0ZVByZWZpeChrZXkpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gYmluZGluZ3MuZ2V0KHB1YmxpY0tleSk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2Ugd2hlcmUgd2UgZG8gbm90IHBhc3MgZXhwbGljaXRseSBvciBpbmhlcml0IGZyb20gcGFyZW50IEBJbnB1dFxuICAgICAgICAgICAgLy8gbmFtZSBmb3IgdGhlIGNvbXBvbmVudFxuXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnbmFtZScgJiYgaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlGaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNraXBJbnB1dChrZXksIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb21wVG9CZVJlbmRlcmVkID0gb25seSBmaXJzdCB0aW1lXG4gICAgICAgICAgICBpZiAoY29tcFRvQmVSZW5kZXJlZCAmJiB2YWx1ZSBpbnN0YW5jZW9mIENvbnRleHRGaWVsZFBhdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RHluYW1pY0lucHV0QmluZGluZ3MoY29tcG9uZW50Lmluc3RhbmNlLCBiaW5kaW5ncywgaW5wdXRzLCBrZXksIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tcFRvQmVSZW5kZXJlZCAmJiB2YWx1ZSBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGR5bnZhbDogRHluYW1pY1Byb3BlcnR5VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSBkeW52YWwuZXZhbHVhdGUodGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKSk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlW3B1YmxpY0tleV0gPSBuZXdWYWx1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiB3aGVuIHJlLWFwcGx5aW5nIElucHV0cyBza2lwIGFsbCBleHByZXNzaW9ucyBhYm92ZSBhbmQgb25seSB3b3JrIHdpdGggcmVndWxhclxuICAgICAgICAgICAgICAgICAqIHR5cGVzXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKiBzZXQgaXQgb25seSBpZiBpdCBjaGFuZ2VzIHNvIGl0IHdpbGwgbm90IHRyaWdnZXIgbmVjZXNzYXJ5IGB2YWx1ZSBjaGFuZ2VkXG4gICAgICAgICAgICAgICAgICogYWZ0dGVyIGNoZWNrYFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghZXF1YWxzKGNvbXBvbmVudC5pbnN0YW5jZVtwdWJsaWNLZXldLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlW3B1YmxpY0tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXBwbHkgRm9ybWF0dGVyIHRoYXQgY2FuIGJlIHNwZWNpZmllZCBpbiB0aGUgb3NzXG4gICAgICAgIC8vIHRlbXBvcmFyeSBkaXNhYmxlZCB1bnRpbGwgYW5ndWxhciB3aWxsIHN1cHBvcnQgcnVudGltZSBpMThuXG4gICAgICAgIC8vIGlmIChiaW5kaW5ncy5oYXMoTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuRm9ybWF0dGVyQmluZGluZykpIHtcbiAgICAgICAgLy8gICAgIGxldCB0cmFuc2Zvcm0gPSB0aGlzLmZvcm1hdHRlcnNcbiAgICAgICAgLy8gICAgICAgICAuZ2V0KGJpbmRpbmdzLmdldChNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5Gb3JtYXR0ZXJCaW5kaW5nKSk7XG4gICAgICAgIC8vICAgICBjb21wb25lbnQuaW5zdGFuY2VbTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuRm9ybWF0dGVyQmluZGluZ10gPSB0cmFuc2Zvcm07XG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgc2tpcElucHV0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc0JsYW5rKHZhbHVlKSB8fCBrZXkgPT09IEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50IHx8XG4gICAgICAgICAgICBrZXkgPT09IE1ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudExheW91dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5T3V0cHV0cyhjb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+LCBiaW5kaW5nczogYW55LCBvdXRwdXRzOiBzdHJpbmdbXSkge1xuICAgICAgICBmb3IgKGxldCBrZXkgb2Ygb3V0cHV0cykge1xuICAgICAgICAgICAgbGV0IHB1YmxpY0tleSA9IG5vblByaXZhdGVQcmVmaXgoa2V5KTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJpbmRpbmdzLmdldChwdWJsaWNLZXkpO1xuXG4gICAgICAgICAgICBpZiAoa2V5ID09PSBJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBjb21wb25lbnQuaW5zdGFuY2VbcHVibGljS2V5XTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUR5bmFtaWNPdXRwdXRCaW5kaW5nKGV2ZW50RW1pdHRlciwgdmFsdWUsIHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBqdXN0IHRyaWdnZXIgZXZlbnQgb3V0c2lkZVxuXG4gICAgICAgICAgICAgICAgZXZlbnRFbWl0dGVyLnN1YnNjcmliZSgodmFsOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW52Lmhhc1ZhbHVlKCdwYXJlbnQtY254JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBldmVudDogYW55ID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNueDogTWV0YUNvbnRleHRDb21wb25lbnQgPSB0aGlzLmVudi5nZXRWYWx1ZSgncGFyZW50LWNueCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh2YWwgaW5zdGFuY2VvZiBNZXRhVUlBY3Rpb25FdmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBNZXRhVUlBY3Rpb25FdmVudChjb21wb25lbnQuaW5zdGFuY2UsIHB1YmxpY0tleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljS2V5LCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY254Lm9uQWN0aW9uLmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5RHluYW1pY091dHB1dEJpbmRpbmcoZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIHZhbHVlOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IENvbnRleHQpOiB2b2lkIHtcblxuICAgICAgICBlbWl0dGVyLmFzT2JzZXJ2YWJsZSgpLnN1YnNjcmliZSgodmFsOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBkeW52YWw6IER5bmFtaWNQcm9wZXJ0eVZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBjb250ZXh0LnJlc29sdmVWYWx1ZShkeW52YWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5RHluYW1pY0lucHV0QmluZGluZ3MobWU6IGFueSwgYmluZGluZ3M6IGFueSwgaW5wdXRzOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhbnksIGVkaXRhYmxlOiBib29sZWFuKSB7XG5cbiAgICAgICAgbGV0IHB1YmxpY0tleSA9IG5vblByaXZhdGVQcmVmaXgoa2V5KTtcbiAgICAgICAgbGV0IGNueHRQYXRoOiBDb250ZXh0RmllbGRQYXRoID0gdmFsdWU7XG4gICAgICAgIGxldCBtZXRhQ29udGV4dCA9IHRoaXMubWV0YUNvbnRleHQ7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjYXB0dXJlZCBhbHNvIGN1cnJlbnQgY29udGV4dCBzbmFwc2hvdCBzbyB3ZSBjYW4gcmVwbGF5IENvbnRleHRGaWVsZFBhdGguZXZhbHVhdGUoKSBpZlxuICAgICAgICAgKiBjYWxsZWQgb3V0c2lkZSBvZiBwdXNoL3BvcCBjeWNsZS5cbiAgICAgICAgICpcbiAgICAgICAgICogdG9kbzogY2hlY2sgaWYgd2UgY2FuIHJlcGxhY2UgdGhpcyB3aXRoIEN1c3RvbSB2YWx1ZSBhY2Nlc3NvclxuICAgICAgICAgKi9cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1lLCBwdWJsaWNLZXksIHtcbiAgICAgICAgICAgIGdldDogKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbnh0UGF0aC5ldmFsdWF0ZShjb250ZXh0KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgZWRpdGluZyA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlFZGl0YWJsZSlcbiAgICAgICAgICAgICAgICAgICAgfHwgY29udGV4dC5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5RWRpdGluZyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWRpdGluZyAmJiAhU3RyaW5nV3JhcHBlci5lcXVhbHModmFsLCBtZVtwdWJsaWNLZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlUeXBlKTtcblxuICAgICAgICAgICAgICAgICAgICBjbnh0UGF0aC5ldmFsdWF0ZVNldChjb250ZXh0LCBWYWx1ZUNvbnZlcnRlci52YWx1ZSh0eXBlLCB2YWwpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=