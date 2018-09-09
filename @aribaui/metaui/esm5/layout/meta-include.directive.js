/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @type {?} */
        var context = this.metaContext.myContext();
        if (isBlank(context) || isBlank(this.currentComponent)) {
            // console.log('No context/ component for ' + this.name);
            return;
        }
        /** @type {?} */
        var newComponent = context.propertyForKey('component');
        if (isPresent(newComponent) && isPresent(this.name) && (this.name !== newComponent)) {
            this.viewContainer.clear();
            this.doRenderComponent();
            // console.log('MetaInclude(ngDoCheck- rerender ):', this.name);
            this.createWrapperElementIfAny();
            this.createContentElementIfAny();
        }
        else {
            /** @type {?} */
            var editable = context.propertyForKey(ObjectMeta.KeyEditable);
            if (isBlank(editable)) {
                editable = context.propertyForKey(UIMeta.KeyEditing);
            }
            /** @type {?} */
            var metaBindings = context.propertyForKey(UIMeta.KeyBindings);
            /** @type {?} */
            var type = context.propertyForKey(ObjectMeta.KeyType);
            /** @type {?} */
            var inputs = this.componentReference().metadata.inputs;
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
        /** @type {?} */
        var cntValue;
        /** @type {?} */
        var bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
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
        /** @type {?} */
        var cntValue;
        /** @type {?} */
        var bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
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
        /** @type {?} */
        var detectChanges = false;
        /** @type {?} */
        var bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) && bindings.has(MetaIncludeComponentDirective.NgContentLayout)) {
            /** @type {?} */
            var layoutName = bindings.get(MetaIncludeComponentDirective.NgContentLayout);
            /** @type {?} */
            var context = this.metaContext.myContext();
            context.push();
            context.set(UIMeta.KeyLayout, layoutName);
            /** @type {?} */
            var componentName = context.propertyForKey('component');
            /** @type {?} */
            var compType = this.compRegistry.nameToType.get(componentName);
            /** @type {?} */
            var componentFactory = this.factoryResolver
                .resolveComponentFactory(compType);
            /** @type {?} */
            var componentMeta = this.resolveDirective(componentFactory);
            /** @type {?} */
            var ngComponent = this.viewContainer.createComponent(componentFactory, 0);
            /** @type {?} */
            var cReference = {
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
        /** @type {?} */
        var wrapperName = this.metaContext.myContext().propertyForKey(UIMeta.KeyWrapperComponent);
        if (isBlank(wrapperName)) {
            return;
        }
        /** @type {?} */
        var wrapperType = this.compRegistry.nameToType.get(wrapperName);
        /** @type {?} */
        var componentFactory = this.factoryResolver
            .resolveComponentFactory(wrapperType);
        /** @type {?} */
        var componentMeta = this.resolveDirective(wrapperType);
        /** @type {?} */
        var wrapperComponent = this.viewContainer.createComponent(componentFactory);
        /** @type {?} */
        var wrapperBindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyWrapperBinding);
        (/** @type {?} */ (wrapperComponent.instance))['bindings'] = wrapperBindings;
        /** @type {?} */
        var wrapperComponentRef = {
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
        /** @type {?} */
        var inputs = cRef.metadata.inputs;
        /** @type {?} */
        var outputs = cRef.metadata.outputs;
        /** @type {?} */
        var metaBindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        /** @type {?} */
        var editable = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyEditable);
        /** @type {?} */
        var type = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyType);
        // There are cases where we want to use the bindings passed into this function.
        // For example, the wrapperBindings.
        if (!bUseMetaBindings) {
            metaBindings = bindings;
        }
        if (isBlank(metaBindings) || isBlank(inputs)) {
            return;
        }
        /** @type {?} */
        var currenBindings = MapWrapper.clone(metaBindings);
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
                /** @type {?} */
                var publicKey = nonPrivatePrefix(key);
                /** @type {?} */
                var value = bindings.get(publicKey);
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
                    /** @type {?} */
                    var dynval = value;
                    /** @type {?} */
                    var newValue = dynval.evaluate(this.metaContext.myContext());
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
            /** @type {?} */
            var publicKey = nonPrivatePrefix(key);
            /** @type {?} */
            var value = bindings.get(publicKey);
            if (key === IncludeComponentDirective.NgContent) {
                return "continue";
            }
            /** @type {?} */
            var eventEmitter = component.instance[publicKey];
            if (value instanceof DynamicPropertyValue) {
                this_1.applyDynamicOutputBinding(eventEmitter, value, this_1.metaContext.myContext());
            }
            else {
                // just trigger event outside
                eventEmitter.subscribe(function (val) {
                    if (_this.env.hasValue('parent-cnx')) {
                        /** @type {?} */
                        var event_1 = val;
                        /** @type {?} */
                        var cnx = _this.env.getValue('parent-cnx');
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
            /** @type {?} */
            var dynval = value;
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
        /** @type {?} */
        var publicKey = nonPrivatePrefix(key);
        /** @type {?} */
        var cnxtPath = value;
        /** @type {?} */
        var metaContext = this.metaContext;
        /**
                 * captured also current context snapshot so we can replay ContextFieldPath.evaluate() if
                 * called outside of push/pop cycle.
                 *
                 * todo: check if we can replace this with Custom value accessor
                 */
        Object.defineProperty(me, publicKey, {
            get: function () {
                /** @type {?} */
                var context = _this.metaContext.myContext();
                return cnxtPath.evaluate(context);
            },
            set: function (val) {
                /** @type {?} */
                var context = _this.metaContext.myContext();
                /** @type {?} */
                var editing = context.propertyForKey(ObjectMeta.KeyEditable)
                    || context.propertyForKey(UIMeta.KeyEditing);
                if (editing && !StringWrapper.equals(val, me[publicKey])) {
                    /** @type {?} */
                    var type = context.propertyForKey(ObjectMeta.KeyType);
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
                },] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1pbmNsdWRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWluY2x1ZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBbUJBLE9BQU8sRUFFSCxpQkFBaUIsRUFHakIsd0JBQXdCLEVBRXhCLFNBQVMsRUFHVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVILGlCQUFpQixFQUNqQixlQUFlLEVBQ2YseUJBQXlCLEVBQzVCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNILFdBQVcsRUFDWCxNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixhQUFhLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RixPQUFPLEVBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JqRCx5REFBeUI7SUFrRHhFLHVDQUNtQixXQUFpQyxFQUNqQyxlQUNBLGlCQUNBLEtBQ0EsSUFDQSxjQUNBO1FBUG5CLFlBUUksa0JBQU0sYUFBYSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsWUFBWSxDQUFDLFNBRTFEO1FBVGtCLGlCQUFXLEdBQVgsV0FBVyxDQUFzQjtRQUNqQyxtQkFBYSxHQUFiLGFB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akIsZUFBZTs7OzBCQXNGZCxLQUFLOzt3Q0E1SFY7RUE4RW1ELHlCQUF5QjtTQUEvRCw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBEb0NoZWNrLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBUeXBlLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbXBvbmVudFJlZmVyZW5jZSxcbiAgICBDb21wb25lbnRSZWdpc3RyeSxcbiAgICBEb21VdGlsc1NlcnZpY2UsXG4gICAgSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZVxufSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7XG4gICAgRW52aXJvbm1lbnQsXG4gICAgZXF1YWxzLFxuICAgIGlzQmxhbmssXG4gICAgaXNQcmVzZW50LFxuICAgIGlzU3RyaW5nLFxuICAgIE1hcFdyYXBwZXIsXG4gICAgbm9uUHJpdmF0ZVByZWZpeCxcbiAgICBTdHJpbmdXcmFwcGVyXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtOb01ldGFDb21wb25lbnR9IGZyb20gJy4vbm8tbWV0YS9uby1tZXRhLmNvbXBvbmVudCc7XG5pbXBvcnQge09iamVjdE1ldGF9IGZyb20gJy4uL2NvcmUvb2JqZWN0LW1ldGEnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuLi9jb3JlL2NvbnRleHQnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uL2NvcmUvdWltZXRhJztcbmltcG9ydCB7Q29udGV4dEZpZWxkUGF0aCwgRHluYW1pY1Byb3BlcnR5VmFsdWUsIFZhbHVlQ29udmVydGVyfSBmcm9tICcuLi9jb3JlL3Byb3BlcnR5LXZhbHVlJztcbmltcG9ydCB7TWV0YUNvbnRleHRDb21wb25lbnQsIE1ldGFVSUFjdGlvbkV2ZW50fSBmcm9tICcuLi9jb3JlL21ldGEtY29udGV4dC9tZXRhLWNvbnRleHQuY29tcG9uZW50JztcblxuXG4vKipcbiAqICBNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZSBpcyAoYWxvbmcgd2l0aCBNZXRhQ29udGV4dCkgdGhlIGtleSBlbGVtZW50IGZvciBiaW5kaW5nIE1ldGFVSVxuICogaW50byBBbmd1bGFySnMgdXNlciBpbnRlcmZhY2VzLiBZb3UgY2FuIHRoaW5rIG9mIGl0IHN1Y2ggR0xVRS5cbiAqXG4gKiAgTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUgZHluYW1pY2FsbHkgc3dpdGNoZXMgaW4gYSBBbmd1bGFyJ3MgY29tcG9uZW50IGJhc2VkIG9uIHRoZVxuICogY3VycmVudCBNZXRhQ29udGV4dCdzXG4gKiAnY29tcG9uZW50JyBwcm9wZXJ0eSBhbmQgc2V0cyBpdHMgYmluZGluZ3MgZnJvbSB0aGUgJ2JpbmRpbmdzJyBwcm9wZXJ0eS4gIFRoaXMgYWxvbmUgZW5hYmxlc1xuICogYWxtb3N0IGFueSBleGlzdGluZyBBbmd1bGFyJ3Mgd2lkZ2V0IHRvIGJlIHNwZWNpZmllZCBmb3IgdXNlIGZvciBhIHBhcnRpY3VsYXIgZmllbGQgb3IgbGF5b3V0XG4gKiB1c2luZyBydWxlcyAtLSB3aXRob3V0IGFueSBhZGRpdGlvbmFsIGdsdWUgY29kZSAuXG4gKlxuICogIGNvbXBvbmVudCB1c2luZyAnd3JhcHBlckNvbXBvbmVudCcgYW5kICd3cmFwcGVyQmluZGluZ3MnLCBiaW5kaW5nIGNvbXBvbmVudCBjb250ZW50IHVzaW5nIHRoZVxuICogYmluZGluZ3MgJ25nY29udGVudCcsIG5nY29udGVudExheW91dCBhbmQgJ25nY29udGVudGVsRWxlbWVudCcsIGFuZCBldmVudCBiaW5kaW5nIG5hbWVkIENvbnRlbnRcbiAqIHRlbXBsYXRlcyB1c2luZyBhblxuICogJ2F3Y29udGVudExheW91dHMnIG1hcCBiaW5kaW5nLiBXaXRob3V0IHRoaXMgd2Ugd2lsbCBub3QgYmUgYWJsZSB0byB1c2UgY29tcGxleCBsYXlvdXRzLlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdtLWluY2x1ZGUtY29tcG9uZW50J1xufSlcbmV4cG9ydCBjbGFzcyBNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZSBleHRlbmRzIEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUgaW1wbGVtZW50cyBEb0NoZWNrLFxuICAgIEFmdGVyVmlld0luaXQge1xuXG4gICAgLyoqXG4gICAgICogSnVzdCBhIGNvbnN0YW50IHVzZSB0byBhY2Nlc3MgRW52aXJvbm1lbnQgd2hlcmUgd2Ugc3RvcmUgY3VycmVudCBjb250ZXh0IGZvciBjdXJyZW50IHJlbmRlclxuICAgICAqIGxpZmVjeWNsZVxuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IEZvcm1hdHRlckJpbmRpbmcgPSAnZm9ybWF0dGVyJztcblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJbiBtZXRhVSB3ZSBjYW4gYWxzbyBpbnNlcnQgaW50byB0aGUgZWxlbWVudCBub3Qgb25seSBuZ2NvbnRlbnQgYnV0IG5ldyBpbnN0YW50aWF0ZWRcbiAgICAgKiBjb21wb25lbnQgd2hpY2ggaXMgZGVmaW5lZCBieSBsYXlvdXRcbiAgICAgKlxuICAgICAqYGBgXG4gICAgICogZmllbGQgdHJhaXQ9T2JqZWN0RGV0YWlsIHtcbiAgICAgKiBcdGVkaXRhYmxlPWZhbHNlIHtcbiAgICAgKiBcdFx0Y29tcG9uZW50OiBIb3ZlckNhcmRDb21wb25uZXQ7XG4gICAgICogXHRcdGJpbmRpbmdzOiB7XG4gICAgICogXHRcdFx0bmdjb250ZW50TGF5b3V0OiBDb250ZW50O1xuICAgICAqIFx0XHRcdGxpbmtUaXRsZToke3Byb3BlcnRpZXMuZ2V0KFwibGFiZWxcIil9O1xuICAgICAqIFx0XHR9XG4gICAgICogXHR9XG4gICAgICpcbiAgICAgKiAgICBAbGF5b3V0PUNvbnRlbnQge1xuICAgICAqIFx0XHRjb21wb25lbnQ6IE1ldGFDb250ZXh0T2JqZWN0O1xuICAgICAqIFx0XHRiaW5kaW5nczoge1xuICAgICAqIFx0XHRcdG9iamVjdDogJHZhbHVlO1xuICAgICAqIFx0XHRcdGxheW91dDpEZXRhaWxMYXlvdXRcbiAgICAgKiBcdFx0XHRvcGVyYXRpb246XCJ2aWV3XCI7XG4gICAgICogXHRcdH1cbiAgICAgKiBcdH1cbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgTmdDb250ZW50TGF5b3V0ID0gJ25nY29udGVudExheW91dCc7XG5cblxuICAgIC8qKlxuICAgICAqIEkgY291bGQgbm90IGZpbmQgYW55IHJlYWxpYWJsZSB3YXkgaG93IHRvIGFjY2VzcyBwYXJlbnQgdmlldy4gRXZlbiBmb3J3YXJkUmVmIHVwIHRvIGNlcnRhaW5cbiAgICAgKiBwb2ludCB3b3JrZWQgYnV0IGhhZCB0byBnZXQgYXdheSBmcm9tIHRoaXMgYXBwcm9hY2ggYXMgaXQgZmFpbHMgZm9yIG15IHVzZWNhc2Ugd2hlbiB1cGRhdGluZ1xuICAgICAqIGNvbnRleHQgYW5kIHB1c2hpbmcgbmV3IHByb3BlcnRpZXMgdG8gdGhlIHN0YWNrLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQ7XG5cblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNZXRhQ29udGV4dENvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHVibGljIG1ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwdWJsaWMgZmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwdWJsaWMgY29tcFJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgZG9tVXRpbHM6IERvbVV0aWxzU2VydmljZSkge1xuICAgICAgICBzdXBlcih2aWV3Q29udGFpbmVyLCBmYWN0b3J5UmVzb2x2ZXIsIGNkLCBjb21wUmVnaXN0cnkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlyc3Qgd2Ugc2ltcGx5IHJlbmRlciB0aGUgYSBjb21wb25lbnQgaW4gdGhlIG5nT25Jbml0KCkgYW5kIHRoZW4gZXZlcnkgdGltZSBzb21ldGhpbmdcbiAgICAgKiBjaGFuZ2VzLlxuICAgICAqL1xuICAgIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01ldGFJbmNsdWRlKG5nRG9DaGVjayk6JywgdGhpcy5uYW1lKTtcblxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCk7XG4gICAgICAgIGlmIChpc0JsYW5rKGNvbnRleHQpIHx8IGlzQmxhbmsodGhpcy5jdXJyZW50Q29tcG9uZW50KSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ05vIGNvbnRleHQvIGNvbXBvbmVudCBmb3IgJyArIHRoaXMubmFtZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3Q29tcG9uZW50ID0gY29udGV4dC5wcm9wZXJ0eUZvcktleSgnY29tcG9uZW50Jyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQobmV3Q29tcG9uZW50KSAmJiBpc1ByZXNlbnQodGhpcy5uYW1lKSAmJiAodGhpcy5uYW1lICE9PSBuZXdDb21wb25lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9SZW5kZXJDb21wb25lbnQoKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdNZXRhSW5jbHVkZShuZ0RvQ2hlY2stIHJlcmVuZGVyICk6JywgdGhpcy5uYW1lKTtcblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVXcmFwcGVyRWxlbWVudElmQW55KCk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbnRlbnRFbGVtZW50SWZBbnkoKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gd2UgbWlnaHQgbm90IHNraXAgY29tcG9uZW50IGluc3RhbnRpYXRpb24gYnV0IHdlIHN0aWxsIG5lZWQgdG8gdXBkYXRlIGJpbmRpbmdzXG4gICAgICAgICAgICAvLyBhcyBwcm9wZXJ0aWVzIGNvdWxkIGNoYW5nZVxuICAgICAgICAgICAgbGV0IGVkaXRhYmxlID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleUVkaXRhYmxlKTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKGVkaXRhYmxlKSkge1xuICAgICAgICAgICAgICAgIGVkaXRhYmxlID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5RWRpdGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbWV0YUJpbmRpbmdzID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5QmluZGluZ3MpO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5VHlwZSk7XG4gICAgICAgICAgICBsZXQgaW5wdXRzOiBzdHJpbmdbXSA9IHRoaXMuY29tcG9uZW50UmVmZXJlbmNlKCkubWV0YWRhdGEuaW5wdXRzO1xuXG4gICAgICAgICAgICAvLyByZS1hcHBseSBJbnB1dHNcbiAgICAgICAgICAgIC8vIG1heWJlIHdlIHNob3VsZCBkaWZmIHByb3BlcnRpZXMgYW5kIG9ubHkgaWYgdGhleSBjaGFuZ2VkIHJlLWFwcGx5XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KG1ldGFCaW5kaW5ncykgJiYgaXNQcmVzZW50KGlucHV0cykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5SW5wdXRzKHRoaXMuY3VycmVudENvbXBvbmVudCwgdHlwZSwgbWV0YUJpbmRpbmdzLCBpbnB1dHMsIGVkaXRhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiBSZXRyaWV2ZXMgY29tcG9uZW50IE5hbWUgZnJvbSB0aGUgQ29udGV4dC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmVzb2x2ZUNvbXBvbmVudFR5cGUoKTogVHlwZTxhbnk+IHtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5Q29tcG9uZW50TmFtZSk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5uYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5vTWV0YUNvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIucmVzb2x2ZUNvbXBvbmVudFR5cGUoKTtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgICogSWYgdGhlcmUgaXMgYSBORyBjb250ZW50IGFzIHBhcnQgb2YgdGhlIGJpbmRpbmdzIGFwcGx5IGl0IGFuZCByZW1vdmUgaXQgZnJvbSB0aGUgbGlzdC4gSW5cbiAgICAgKiB0aGUgTWV0YVVJIHdvcmxkIGl0IGNhbiBhcHBlYXIgaWYgd2Ugd2FudCB0byBpbnNlcnQgYSB0ZXh0IGNvbnRlbnQgaW50byB0aGUgZWxlbWVudDpcbiAgICAgKlxuICAgICAqXG4gICAgICogIHRyYWl0PXRvTWFueUxpbmsge1xuICAgICAqICAgICAgICAgY29tcG9uZW50OkFXSHlwZXJsaW5rO1xuICAgICAqICAgICAgICAgYmluZGluZ3M6IHtcbiAgICAgKiAgICAgICAgICAgICBhY3Rpb246ICR7XG4gICAgICogICAgICAgICAgICAgICAgdGhpcy5zZXQoXCJvYmplY3RcIiwgdmFsdWUpO1xuICAgICAqICAgICAgICAgICAgICAgIHRoaXMuc2V0KFwiYWN0aW9uQ2F0ZWdvcnlcIiwgXCJHZW5lcmFsXCIpO1xuICAgICAqICAgICAgICAgICAgICAgIHRoaXMuc2V0KFwiYWN0aW9uXCIsIFwiSW5zcGVjdFwiKTtcbiAgICAgKiAgICAgICAgICAgICAgICAgbWV0YS5maXJlQWN0aW9uKHRoaXMsIHRydWUpXG4gICAgICogICAgICAgICAgICAgfTtcbiAgICAgKiAgICAgICAgICAgICBhd2NvbnRlbnQ6IFwiQ2xpY2sgTWVcIjtcbiAgICAgKiAgICAgICAgIH1cbiAgICAgKiAgICAgfVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgbmdDb250ZW50KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjbnRWYWx1ZTogYW55O1xuICAgICAgICBsZXQgYmluZGluZ3MgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChiaW5kaW5ncykgJiZcbiAgICAgICAgICAgIGlzUHJlc2VudChjbnRWYWx1ZSA9IGJpbmRpbmdzLmdldChJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudCkpKSB7XG4gICAgICAgICAgICBjbnRWYWx1ZSA9IGlzU3RyaW5nKGNudFZhbHVlKSA/IGNudFZhbHVlIDpcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnJlc29sdmVWYWx1ZShjbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNudFZhbHVlO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIG5nQ29udGVudEVsZW1lbnQoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNudFZhbHVlOiBhbnk7XG4gICAgICAgIGxldCBiaW5kaW5ncyA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGJpbmRpbmdzKSAmJlxuICAgICAgICAgICAgaXNQcmVzZW50KGNudFZhbHVlID0gYmluZGluZ3MuZ2V0KEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50RWxlbWVudCkpKSB7XG4gICAgICAgICAgICBjbnRWYWx1ZSA9IGlzU3RyaW5nKGNudFZhbHVlKSA/IGNudFZhbHVlIDpcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnJlc29sdmVWYWx1ZShjbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNudFZhbHVlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IGN1c3RvbSBiZWhhdmlvciBvZiBhZGRpbmcgbmdjb250ZW50TGF5b3V0IGRlc2NyaWJlZCBhYm92ZSAod2hlcmUgdGhlIGNvbnN0YW50XG4gICAgICogaXMgZGVmaW5lZClcbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjcmVhdGVDb250ZW50RWxlbWVudElmQW55KCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZGV0ZWN0Q2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICBsZXQgYmluZGluZ3MgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyk7XG5cblxuICAgICAgICBpZiAoaXNQcmVzZW50KGJpbmRpbmdzKSAmJiBiaW5kaW5ncy5oYXMoTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50TGF5b3V0KSkge1xuXG4gICAgICAgICAgICBsZXQgbGF5b3V0TmFtZSA9IGJpbmRpbmdzLmdldChNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5OZ0NvbnRlbnRMYXlvdXQpO1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpO1xuXG4gICAgICAgICAgICBjb250ZXh0LnB1c2goKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0KFVJTWV0YS5LZXlMYXlvdXQsIGxheW91dE5hbWUpO1xuXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TmFtZSA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoJ2NvbXBvbmVudCcpO1xuICAgICAgICAgICAgbGV0IGNvbXBUeXBlID0gdGhpcy5jb21wUmVnaXN0cnkubmFtZVRvVHlwZS5nZXQoY29tcG9uZW50TmFtZSk7XG5cbiAgICAgICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT4gPSB0aGlzLmZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wVHlwZSk7XG5cbiAgICAgICAgICAgIGxldCBjb21wb25lbnRNZXRhOiBDb21wb25lbnQgPSB0aGlzLnJlc29sdmVEaXJlY3RpdmUoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICAgICAgICBsZXQgbmdDb21wb25lbnQgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnksIDApO1xuXG4gICAgICAgICAgICBsZXQgY1JlZmVyZW5jZTogQ29tcG9uZW50UmVmZXJlbmNlID0ge1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBjb21wb25lbnRNZXRhLFxuICAgICAgICAgICAgICAgIHJlc29sdmVkQ29tcEZhY3Rvcnk6IGNvbXBvbmVudEZhY3RvcnksXG4gICAgICAgICAgICAgICAgY29tcG9uZW50VHlwZTogY29tcFR5cGUsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZTogY29tcG9uZW50TmFtZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5hcHBseUJpbmRpbmdzKGNSZWZlcmVuY2UsIG5nQ29tcG9uZW50LCBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyksXG4gICAgICAgICAgICAgICAgZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmRvbVV0aWxzLmluc2VydEludG9QYXJlbnROZ0NvbnRlbnQodGhpcy5jdXJyZW50Q29tcG9uZW50LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgbmdDb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGNvbnRleHQucG9wKCk7XG5cbiAgICAgICAgICAgIGRldGVjdENoYW5nZXMgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGV0ZWN0Q2hhbmdlcyA9IHN1cGVyLmNyZWF0ZUNvbnRlbnRFbGVtZW50SWZBbnkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGV0ZWN0Q2hhbmdlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01ldGFJbmNsdWRlKGNyZWF0ZUNvbnRlbnRFbGVtZW50SWZBbnkpOicsIHRoaXMubmFtZSk7XG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZXRlY3RDaGFuZ2VzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTWV0YSBwbGFjZVRoZUNvbXBvbmVudCBuZWVkcyB0byBhY2NvdW50IGZvciB3cmFwcGVyIGNvbXBvbmVudC4gSWYgd3JhcHBlciBjb21wb25lbnRcbiAgICAgKiBpcyBwcmVzZW50LiBJdCBuZWVkcyB0byBpbmplY3QgdGhlIHdyYXBwZXIgY29tcG9uZW50IG9uIHRoZSBwYWdlIGFuZCBhZGQgdGhpcyBjb21wb25lbnRcbiAgICAgKiBpbnNpZGUgdGhlIHdyYXBwZXIgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjcmVhdGVXcmFwcGVyRWxlbWVudElmQW55KCk6IHZvaWQge1xuICAgICAgICBsZXQgd3JhcHBlck5hbWUgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlXcmFwcGVyQ29tcG9uZW50KTtcbiAgICAgICAgaWYgKGlzQmxhbmsod3JhcHBlck5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOb3cgd2UgaGF2ZSB3cmFwcGVyQ29tcG9uZW50LiBXZSBkbyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyAxLiAgQ3JlYXRlIHdyYXBwZXIgY29tcG9uZW50LlxuICAgICAgICBsZXQgd3JhcHBlclR5cGUgPSB0aGlzLmNvbXBSZWdpc3RyeS5uYW1lVG9UeXBlLmdldCh3cmFwcGVyTmFtZSk7XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMuZmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnkod3JhcHBlclR5cGUpO1xuICAgICAgICBsZXQgY29tcG9uZW50TWV0YTogQ29tcG9uZW50ID0gdGhpcy5yZXNvbHZlRGlyZWN0aXZlKHdyYXBwZXJUeXBlKTtcblxuICAgICAgICBsZXQgd3JhcHBlckNvbXBvbmVudCA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLy8gMi4gQWRkIHdyYXBwZXIgYmluZGluZ3MgdG8gd3JhcHBlciBjb21wb25lbnQuXG4gICAgICAgIGxldCB3cmFwcGVyQmluZGluZ3MgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlXcmFwcGVyQmluZGluZyk7XG4gICAgICAgICg8YW55PiB3cmFwcGVyQ29tcG9uZW50Lmluc3RhbmNlKVsnYmluZGluZ3MnXSA9IHdyYXBwZXJCaW5kaW5ncztcblxuICAgICAgICAvLyAzLiBBcHBseSB0aGUgYmluZGluZ3MuIEdldCB0aGUgd3JhcHBlciBtZXRhZGF0YSwgbG9vayB0aHJvdWdoIGl0J3MgaW5wdXQgLSBvdXRwdXRcbiAgICAgICAgLy8gYmluZGluZ3MuIGFuZCBhcHBseSB0aGUgd3JhcHBlckJpbmRpbmdzIHRvIHRoZXNlIGJpbmRpbmdzLlxuICAgICAgICBsZXQgd3JhcHBlckNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmZXJlbmNlID0ge1xuICAgICAgICAgICAgbWV0YWRhdGE6IGNvbXBvbmVudE1ldGEsXG4gICAgICAgICAgICByZXNvbHZlZENvbXBGYWN0b3J5OiBjb21wb25lbnRGYWN0b3J5LFxuICAgICAgICAgICAgY29tcG9uZW50VHlwZTogd3JhcHBlclR5cGUsXG4gICAgICAgICAgICBjb21wb25lbnROYW1lOiB3cmFwcGVyTmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYXBwbHlCaW5kaW5ncyh3cmFwcGVyQ29tcG9uZW50UmVmLCB3cmFwcGVyQ29tcG9uZW50LCB3cmFwcGVyQmluZGluZ3MpO1xuICAgICAgICB0aGlzLmRvbVV0aWxzLmluc2VydEludG9QYXJlbnROZ0NvbnRlbnQod3JhcHBlckNvbXBvbmVudC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q29tcG9uZW50LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQXBwbHlCaW5kaW5ncyByZWFkcyB0aGUgQElucHV0cyBmcm9tIENvbXBvbmVudE1ldGFkYXRhIGFuZCBjaGVjayBpZiB0aGVyZSBleGlzdHMgYSBiaW5kaW5nXG4gICAgICogY29taW5nIGZyb20gTWV0YVJ1bGVzLiBJZiB0aGVyZSBpcyB3ZSBhc3NpZ24gaXQgdG8gdGhlIGlucHV0LlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhcHBseUJpbmRpbmdzKGNSZWY6IENvbXBvbmVudFJlZmVyZW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRpbmdzOiBNYXA8c3RyaW5nLCBhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJVc2VNZXRhQmluZGluZ3M6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmFwcGx5QmluZGluZ3MoY1JlZiwgY29tcG9uZW50LCBiaW5kaW5ncyk7XG4gICAgICAgIGxldCBpbnB1dHM6IHN0cmluZ1tdID0gY1JlZi5tZXRhZGF0YS5pbnB1dHM7XG4gICAgICAgIGxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IGNSZWYubWV0YWRhdGEub3V0cHV0cztcblxuICAgICAgICBsZXQgbWV0YUJpbmRpbmdzID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5QmluZGluZ3MpO1xuICAgICAgICBsZXQgZWRpdGFibGUgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5RWRpdGFibGUpO1xuICAgICAgICBsZXQgdHlwZSA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlUeXBlKTtcblxuICAgICAgICAvLyBUaGVyZSBhcmUgY2FzZXMgd2hlcmUgd2Ugd2FudCB0byB1c2UgdGhlIGJpbmRpbmdzIHBhc3NlZCBpbnRvIHRoaXMgZnVuY3Rpb24uXG4gICAgICAgIC8vIEZvciBleGFtcGxlLCB0aGUgd3JhcHBlckJpbmRpbmdzLlxuICAgICAgICBpZiAoIWJVc2VNZXRhQmluZGluZ3MpIHtcbiAgICAgICAgICAgIG1ldGFCaW5kaW5ncyA9IGJpbmRpbmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsobWV0YUJpbmRpbmdzKSB8fCBpc0JsYW5rKGlucHV0cykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJyZW5CaW5kaW5ncyA9IE1hcFdyYXBwZXIuY2xvbmUobWV0YUJpbmRpbmdzKTtcbiAgICAgICAgdGhpcy5hcHBseUlucHV0cyhjb21wb25lbnQsIHR5cGUsIGN1cnJlbkJpbmRpbmdzLCBpbnB1dHMsIGVkaXRhYmxlKTtcbiAgICAgICAgdGhpcy5hcHBseU91dHB1dHMoY29tcG9uZW50LCBjdXJyZW5CaW5kaW5ncywgb3V0cHV0cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUlucHV0cyhjb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+LCB0eXBlOiBhbnksIGJpbmRpbmdzOiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHM6IHN0cmluZ1tdLCBlZGl0YWJsZTogYW55LCBjb21wVG9CZVJlbmRlcmVkOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICAvLyBwcm9wYWdhdGUgYSBmaWVsZCB0eXBlIHRvIGJpbmRpbmdzLlxuICAgICAgICBpZiAoaXNQcmVzZW50KHR5cGUpICYmIGlzUHJlc2VudChjb21wb25lbnQuaW5zdGFuY2UuY2FuU2V0VHlwZSkgJiZcbiAgICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZS5jYW5TZXRUeXBlKCkpIHtcbiAgICAgICAgICAgIGJpbmRpbmdzLnNldChPYmplY3RNZXRhLktleVR5cGUsIHR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChlZGl0YWJsZSkgJiYgaXNQcmVzZW50KGNvbXBvbmVudC5pbnN0YW5jZVsnZWRpdGFibGUnXSkpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVsnZWRpdGFibGUnXSA9IGVkaXRhYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQga2V5IG9mIGlucHV0cykge1xuICAgICAgICAgICAgbGV0IHB1YmxpY0tleSA9IG5vblByaXZhdGVQcmVmaXgoa2V5KTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJpbmRpbmdzLmdldChwdWJsaWNLZXkpO1xuXG4gICAgICAgICAgICAvLyBIYW5kbGUgc3BlY2lhbCBjYXNlIHdoZXJlIHdlIGRvIG5vdCBwYXNzIGV4cGxpY2l0bHkgb3IgaW5oZXJpdCBmcm9tIHBhcmVudCBASW5wdXRcbiAgICAgICAgICAgIC8vIG5hbWUgZm9yIHRoZSBjb21wb25lbnRcblxuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ25hbWUnICYmIGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5RmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5za2lwSW5wdXQoa2V5LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29tcFRvQmVSZW5kZXJlZCA9IG9ubHkgZmlyc3QgdGltZVxuICAgICAgICAgICAgaWYgKGNvbXBUb0JlUmVuZGVyZWQgJiYgdmFsdWUgaW5zdGFuY2VvZiBDb250ZXh0RmllbGRQYXRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUR5bmFtaWNJbnB1dEJpbmRpbmdzKGNvbXBvbmVudC5pbnN0YW5jZSwgYmluZGluZ3MsIGlucHV0cywga2V5LCB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGUpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBUb0JlUmVuZGVyZWQgJiYgdmFsdWUgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBkeW52YWw6IER5bmFtaWNQcm9wZXJ0eVZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gZHludmFsLmV2YWx1YXRlKHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVtwdWJsaWNLZXldID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogd2hlbiByZS1hcHBseWluZyBJbnB1dHMgc2tpcCBhbGwgZXhwcmVzc2lvbnMgYWJvdmUgYW5kIG9ubHkgd29yayB3aXRoIHJlZ3VsYXJcbiAgICAgICAgICAgICAgICAgKiB0eXBlc1xuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogc2V0IGl0IG9ubHkgaWYgaXQgY2hhbmdlcyBzbyBpdCB3aWxsIG5vdCB0cmlnZ2VyIG5lY2Vzc2FyeSBgdmFsdWUgY2hhbmdlZFxuICAgICAgICAgICAgICAgICAqIGFmdHRlciBjaGVja2BcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWVxdWFscyhjb21wb25lbnQuaW5zdGFuY2VbcHVibGljS2V5XSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVtwdWJsaWNLZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGFwcGx5IEZvcm1hdHRlciB0aGF0IGNhbiBiZSBzcGVjaWZpZWQgaW4gdGhlIG9zc1xuICAgICAgICAvLyB0ZW1wb3JhcnkgZGlzYWJsZWQgdW50aWxsIGFuZ3VsYXIgd2lsbCBzdXBwb3J0IHJ1bnRpbWUgaTE4blxuICAgICAgICAvLyBpZiAoYmluZGluZ3MuaGFzKE1ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLkZvcm1hdHRlckJpbmRpbmcpKSB7XG4gICAgICAgIC8vICAgICBsZXQgdHJhbnNmb3JtID0gdGhpcy5mb3JtYXR0ZXJzXG4gICAgICAgIC8vICAgICAgICAgLmdldChiaW5kaW5ncy5nZXQoTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuRm9ybWF0dGVyQmluZGluZykpO1xuICAgICAgICAvLyAgICAgY29tcG9uZW50Lmluc3RhbmNlW01ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLkZvcm1hdHRlckJpbmRpbmddID0gdHJhbnNmb3JtO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHNraXBJbnB1dChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gaXNCbGFuayh2YWx1ZSkgfHwga2V5ID09PSBJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudCB8fFxuICAgICAgICAgICAga2V5ID09PSBNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5OZ0NvbnRlbnRMYXlvdXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseU91dHB1dHMoY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiwgYmluZGluZ3M6IGFueSwgb3V0cHV0czogc3RyaW5nW10pIHtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIG91dHB1dHMpIHtcbiAgICAgICAgICAgIGxldCBwdWJsaWNLZXkgPSBub25Qcml2YXRlUHJlZml4KGtleSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBiaW5kaW5ncy5nZXQocHVibGljS2V5KTtcblxuICAgICAgICAgICAgaWYgKGtleSA9PT0gSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5OZ0NvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBldmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gY29tcG9uZW50Lmluc3RhbmNlW3B1YmxpY0tleV07XG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHlWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlEeW5hbWljT3V0cHV0QmluZGluZyhldmVudEVtaXR0ZXIsIHZhbHVlLCB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8ganVzdCB0cmlnZ2VyIGV2ZW50IG91dHNpZGVcblxuICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5zdWJzY3JpYmUoKHZhbDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudi5oYXNWYWx1ZSgncGFyZW50LWNueCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXZlbnQ6IGFueSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbng6IE1ldGFDb250ZXh0Q29tcG9uZW50ID0gdGhpcy5lbnYuZ2V0VmFsdWUoJ3BhcmVudC1jbngnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodmFsIGluc3RhbmNlb2YgTWV0YVVJQWN0aW9uRXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgTWV0YVVJQWN0aW9uRXZlbnQoY29tcG9uZW50Lmluc3RhbmNlLCBwdWJsaWNLZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1YmxpY0tleSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNueC5vbkFjdGlvbi5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUR5bmFtaWNPdXRwdXRCaW5kaW5nKGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+LCB2YWx1ZTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBDb250ZXh0KTogdm9pZCB7XG5cbiAgICAgICAgZW1pdHRlci5hc09ic2VydmFibGUoKS5zdWJzY3JpYmUoKHZhbDogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgZHludmFsOiBEeW5hbWljUHJvcGVydHlWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgY29udGV4dC5yZXNvbHZlVmFsdWUoZHludmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUR5bmFtaWNJbnB1dEJpbmRpbmdzKG1lOiBhbnksIGJpbmRpbmdzOiBhbnksIGlucHV0czogc3RyaW5nW10sIGtleTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYW55LCBlZGl0YWJsZTogYm9vbGVhbikge1xuXG4gICAgICAgIGxldCBwdWJsaWNLZXkgPSBub25Qcml2YXRlUHJlZml4KGtleSk7XG4gICAgICAgIGxldCBjbnh0UGF0aDogQ29udGV4dEZpZWxkUGF0aCA9IHZhbHVlO1xuICAgICAgICBsZXQgbWV0YUNvbnRleHQgPSB0aGlzLm1ldGFDb250ZXh0O1xuICAgICAgICAvKipcbiAgICAgICAgICogY2FwdHVyZWQgYWxzbyBjdXJyZW50IGNvbnRleHQgc25hcHNob3Qgc28gd2UgY2FuIHJlcGxheSBDb250ZXh0RmllbGRQYXRoLmV2YWx1YXRlKCkgaWZcbiAgICAgICAgICogY2FsbGVkIG91dHNpZGUgb2YgcHVzaC9wb3AgY3ljbGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIHRvZG86IGNoZWNrIGlmIHdlIGNhbiByZXBsYWNlIHRoaXMgd2l0aCBDdXN0b20gdmFsdWUgYWNjZXNzb3JcbiAgICAgICAgICovXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtZSwgcHVibGljS2V5LCB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY254dFBhdGguZXZhbHVhdGUoY29udGV4dCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXQ6ICh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgbGV0IGVkaXRpbmcgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5RWRpdGFibGUpXG4gICAgICAgICAgICAgICAgICAgIHx8IGNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUVkaXRpbmcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVkaXRpbmcgJiYgIVN0cmluZ1dyYXBwZXIuZXF1YWxzKHZhbCwgbWVbcHVibGljS2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5VHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY254dFBhdGguZXZhbHVhdGVTZXQoY29udGV4dCwgVmFsdWVDb252ZXJ0ZXIudmFsdWUodHlwZSwgdmFsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19