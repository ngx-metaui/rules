/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class MetaIncludeComponentDirective extends IncludeComponentDirective {
    /**
     * @param {?} metaContext
     * @param {?} viewContainer
     * @param {?} factoryResolver
     * @param {?} env
     * @param {?} cd
     * @param {?} compRegistry
     * @param {?} domUtils
     */
    constructor(metaContext, viewContainer, factoryResolver, env, cd, compRegistry, domUtils) {
        super(viewContainer, factoryResolver, cd, compRegistry);
        this.metaContext = metaContext;
        this.viewContainer = viewContainer;
        this.factoryResolver = factoryResolver;
        this.env = env;
        this.cd = cd;
        this.compRegistry = compRegistry;
        this.domUtils = domUtils;
    }
    /**
     * First we simply render the a component in the ngOnInit() and then every time something
     * changes.
     * @return {?}
     */
    ngDoCheck() {
        /** @type {?} */
        let context = this.metaContext.myContext();
        if (isBlank(context) || isBlank(this.currentComponent)) {
            // console.log('No context/ component for ' + this.name);
            return;
        }
        /** @type {?} */
        let newComponent = context.propertyForKey('component');
        if (isPresent(newComponent) && isPresent(this.name) && (this.name !== newComponent)) {
            this.viewContainer.clear();
            this.doRenderComponent();
            // console.log('MetaInclude(ngDoCheck- rerender ):', this.name);
            this.createWrapperElementIfAny();
            this.createContentElementIfAny();
        }
        else {
            /** @type {?} */
            let editable = context.propertyForKey(ObjectMeta.KeyEditable);
            if (isBlank(editable)) {
                editable = context.propertyForKey(UIMeta.KeyEditing);
            }
            /** @type {?} */
            let metaBindings = context.propertyForKey(UIMeta.KeyBindings);
            /** @type {?} */
            let type = context.propertyForKey(ObjectMeta.KeyType);
            /** @type {?} */
            let inputs = this.componentReference().metadata.inputs;
            // re-apply Inputs
            // maybe we should diff properties and only if they changed re-apply
            if (isPresent(metaBindings) && isPresent(inputs)) {
                this.applyInputs(this.currentComponent, type, metaBindings, inputs, editable);
            }
        }
    }
    /**
     * @return {?}
     */
    resolveComponentType() {
        this.name = this.metaContext.myContext().propertyForKey(UIMeta.KeyComponentName);
        if (isBlank(this.name)) {
            return NoMetaComponent;
        }
        return super.resolveComponentType();
    }
    /**
     * @return {?}
     */
    ngContent() {
        /** @type {?} */
        let cntValue;
        /** @type {?} */
        let bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) &&
            isPresent(cntValue = bindings.get(IncludeComponentDirective.NgContent))) {
            cntValue = isString(cntValue) ? cntValue :
                this.metaContext.myContext().resolveValue(cntValue);
        }
        return cntValue;
    }
    /**
     * @return {?}
     */
    ngContentElement() {
        /** @type {?} */
        let cntValue;
        /** @type {?} */
        let bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) &&
            isPresent(cntValue = bindings.get(IncludeComponentDirective.NgContentElement))) {
            cntValue = isString(cntValue) ? cntValue :
                this.metaContext.myContext().resolveValue(cntValue);
        }
        return cntValue;
    }
    /**
     * Implement custom behavior of adding ngcontentLayout described above (where the constant
     * is defined)
     *
     * @return {?}
     */
    createContentElementIfAny() {
        /** @type {?} */
        let detectChanges = false;
        /** @type {?} */
        let bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) && bindings.has(MetaIncludeComponentDirective.NgContentLayout)) {
            /** @type {?} */
            let layoutName = bindings.get(MetaIncludeComponentDirective.NgContentLayout);
            /** @type {?} */
            let context = this.metaContext.myContext();
            context.push();
            context.set(UIMeta.KeyLayout, layoutName);
            /** @type {?} */
            let componentName = context.propertyForKey('component');
            /** @type {?} */
            let compType = this.compRegistry.nameToType.get(componentName);
            /** @type {?} */
            let componentFactory = this.factoryResolver
                .resolveComponentFactory(compType);
            /** @type {?} */
            let componentMeta = this.resolveDirective(componentFactory);
            /** @type {?} */
            let ngComponent = this.viewContainer.createComponent(componentFactory, 0);
            /** @type {?} */
            let cReference = {
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
            detectChanges = super.createContentElementIfAny();
        }
        if (detectChanges) {
            // console.log('MetaInclude(createContentElementIfAny):', this.name);
            this.cd.detectChanges();
        }
        return detectChanges;
    }
    /**
     * Meta placeTheComponent needs to account for wrapper component. If wrapper component
     * is present. It needs to inject the wrapper component on the page and add this component
     * inside the wrapper component.
     * @return {?}
     */
    createWrapperElementIfAny() {
        /** @type {?} */
        let wrapperName = this.metaContext.myContext().propertyForKey(UIMeta.KeyWrapperComponent);
        if (isBlank(wrapperName)) {
            return;
        }
        /** @type {?} */
        let wrapperType = this.compRegistry.nameToType.get(wrapperName);
        /** @type {?} */
        let componentFactory = this.factoryResolver
            .resolveComponentFactory(wrapperType);
        /** @type {?} */
        let componentMeta = this.resolveDirective(wrapperType);
        /** @type {?} */
        let wrapperComponent = this.viewContainer.createComponent(componentFactory);
        /** @type {?} */
        let wrapperBindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyWrapperBinding);
        (/** @type {?} */ (wrapperComponent.instance))['bindings'] = wrapperBindings;
        /** @type {?} */
        let wrapperComponentRef = {
            metadata: componentMeta,
            resolvedCompFactory: componentFactory,
            componentType: wrapperType,
            componentName: wrapperName
        };
        this.applyBindings(wrapperComponentRef, wrapperComponent, wrapperBindings);
        this.domUtils.insertIntoParentNgContent(wrapperComponent.location.nativeElement, this.currentComponent.location.nativeElement);
    }
    /**
     * ApplyBindings reads the \@Inputs from ComponentMetadata and check if there exists a binding
     * coming from MetaRules. If there is we assign it to the input.
     * @param {?} cRef
     * @param {?} component
     * @param {?} bindings
     * @param {?=} bUseMetaBindings
     * @return {?}
     */
    applyBindings(cRef, component, bindings, bUseMetaBindings = true) {
        super.applyBindings(cRef, component, bindings);
        /** @type {?} */
        let inputs = cRef.metadata.inputs;
        /** @type {?} */
        let outputs = cRef.metadata.outputs;
        /** @type {?} */
        let metaBindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        /** @type {?} */
        let editable = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyEditable);
        /** @type {?} */
        let type = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyType);
        // There are cases where we want to use the bindings passed into this function.
        // For example, the wrapperBindings.
        if (!bUseMetaBindings) {
            metaBindings = bindings;
        }
        if (isBlank(metaBindings) || isBlank(inputs)) {
            return;
        }
        /** @type {?} */
        let currenBindings = MapWrapper.clone(metaBindings);
        this.applyInputs(component, type, currenBindings, inputs, editable);
        this.applyOutputs(component, currenBindings, outputs);
    }
    /**
     * @param {?} component
     * @param {?} type
     * @param {?} bindings
     * @param {?} inputs
     * @param {?} editable
     * @param {?=} compToBeRendered
     * @return {?}
     */
    applyInputs(component, type, bindings, inputs, editable, compToBeRendered = true) {
        // propagate a field type to bindings.
        if (isPresent(type) && isPresent(component.instance.canSetType) &&
            component.instance.canSetType()) {
            bindings.set(ObjectMeta.KeyType, type);
        }
        if (isPresent(editable) && isPresent(component.instance['editable'])) {
            component.instance['editable'] = editable;
        }
        for (let key of inputs) {
            /** @type {?} */
            let publicKey = nonPrivatePrefix(key);
            /** @type {?} */
            let value = bindings.get(publicKey);
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
                let dynval = value;
                /** @type {?} */
                let newValue = dynval.evaluate(this.metaContext.myContext());
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
        // apply Formatter that can be specified in the oss
        // temporary disabled untill angular will support runtime i18n
        // if (bindings.has(MetaIncludeComponentDirective.FormatterBinding)) {
        //     let transform = this.formatters
        //         .get(bindings.get(MetaIncludeComponentDirective.FormatterBinding));
        //     component.instance[MetaIncludeComponentDirective.FormatterBinding] = transform;
        // }
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    skipInput(key, value) {
        return isBlank(value) || key === IncludeComponentDirective.NgContent ||
            key === MetaIncludeComponentDirective.NgContentLayout;
    }
    /**
     * @param {?} component
     * @param {?} bindings
     * @param {?} outputs
     * @return {?}
     */
    applyOutputs(component, bindings, outputs) {
        for (let key of outputs) {
            /** @type {?} */
            let publicKey = nonPrivatePrefix(key);
            /** @type {?} */
            let value = bindings.get(publicKey);
            if (key === IncludeComponentDirective.NgContent) {
                continue;
            }
            /** @type {?} */
            let eventEmitter = component.instance[publicKey];
            if (value instanceof DynamicPropertyValue) {
                this.applyDynamicOutputBinding(eventEmitter, value, this.metaContext.myContext());
            }
            else {
                // just trigger event outside
                eventEmitter.subscribe((val) => {
                    if (this.env.hasValue('parent-cnx')) {
                        /** @type {?} */
                        let event = val;
                        /** @type {?} */
                        let cnx = this.env.getValue('parent-cnx');
                        if (!(val instanceof MetaUIActionEvent)) {
                            event = new MetaUIActionEvent(component.instance, publicKey, publicKey, val);
                        }
                        cnx.onAction.emit(event);
                    }
                });
            }
        }
    }
    /**
     * @param {?} emitter
     * @param {?} value
     * @param {?} context
     * @return {?}
     */
    applyDynamicOutputBinding(emitter, value, context) {
        emitter.asObservable().subscribe((val) => {
            /** @type {?} */
            let dynval = value;
            context.resolveValue(dynval);
        });
    }
    /**
     * @param {?} me
     * @param {?} bindings
     * @param {?} inputs
     * @param {?} key
     * @param {?} value
     * @param {?} editable
     * @return {?}
     */
    applyDynamicInputBindings(me, bindings, inputs, key, value, editable) {
        /** @type {?} */
        let publicKey = nonPrivatePrefix(key);
        /** @type {?} */
        let cnxtPath = value;
        /** @type {?} */
        let metaContext = this.metaContext;
        /**
                 * captured also current context snapshot so we can replay ContextFieldPath.evaluate() if
                 * called outside of push/pop cycle.
                 *
                 * todo: check if we can replace this with Custom value accessor
                 */
        Object.defineProperty(me, publicKey, {
            get: () => {
                /** @type {?} */
                let context = this.metaContext.myContext();
                return cnxtPath.evaluate(context);
            },
            set: (val) => {
                /** @type {?} */
                let context = this.metaContext.myContext();
                /** @type {?} */
                let editing = context.propertyForKey(ObjectMeta.KeyEditable)
                    || context.propertyForKey(UIMeta.KeyEditing);
                if (editing && !StringWrapper.equals(val, me[publicKey])) {
                    /** @type {?} */
                    let type = context.propertyForKey(ObjectMeta.KeyType);
                    cnxtPath.evaluateSet(context, ValueConverter.value(type, val));
                }
            },
            enumerable: true,
            configurable: true
        });
    }
}
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
MetaIncludeComponentDirective.ctorParameters = () => [
    { type: MetaContextComponent, decorators: [{ type: Inject, args: [forwardRef(() => MetaContextComponent),] }] },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Environment },
    { type: ChangeDetectorRef },
    { type: ComponentRegistry },
    { type: DomUtilsService }
];
MetaIncludeComponentDirective.propDecorators = {
    context: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1pbmNsdWRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWluY2x1ZGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFtQkEsT0FBTyxFQUVILGlCQUFpQixFQUdqQix3QkFBd0IsRUFFeEIsU0FBUyxFQUdULFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUVMLGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZix5QkFBeUIsRUFDNUIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQ0gsV0FBVyxFQUNYLE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFDLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzlGLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQXNCcEcsTUFBTSxvQ0FBcUMsU0FBUSx5QkFBeUI7Ozs7Ozs7Ozs7SUFrRHhFLFlBQ21CLFdBQWlDLEVBQ2pDLGVBQ0EsaUJBQ0EsS0FDQSxJQUNBLGNBQ0E7UUFDZixLQUFLLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFQekMsZ0JBQVcsR0FBWCxXQUFXLENBQXNC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QUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7dUJBQ3JELE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVqRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUN2RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFdEQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDbEU7YUFDSjtZQUNELFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQzs7Ozs7Ozs7aURBamE0QixXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQThCWixpQkFBaUI7O1lBekN0RCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjthQUNsQzs7OztZQXJCTyxvQkFBb0IsdUJBd0VYLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUEvRjFELGdCQUFnQjtZQVRoQix3QkFBd0I7WUFrQnhCLFdBQVc7WUFyQlgsaUJBQWlCO1lBZ0JqQixpQkFBaUI7WUFDakIsZUFBZTs7O3NCQXNGZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgVHlwZSxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnRSZWZlcmVuY2UsXG4gICAgQ29tcG9uZW50UmVnaXN0cnksXG4gICAgRG9tVXRpbHNTZXJ2aWNlLFxuICAgIEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmVcbn0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICAgIEVudmlyb25tZW50LFxuICAgIGVxdWFscyxcbiAgICBpc0JsYW5rLFxuICAgIGlzUHJlc2VudCxcbiAgICBpc1N0cmluZyxcbiAgICBNYXBXcmFwcGVyLFxuICAgIG5vblByaXZhdGVQcmVmaXgsXG4gICAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Tm9NZXRhQ29tcG9uZW50fSBmcm9tICcuL25vLW1ldGEvbm8tbWV0YS5jb21wb25lbnQnO1xuaW1wb3J0IHtPYmplY3RNZXRhfSBmcm9tICcuLi9jb3JlL29iamVjdC1tZXRhJztcbmltcG9ydCB7Q29udGV4dH0gZnJvbSAnLi4vY29yZS9jb250ZXh0JztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuLi9jb3JlL3VpbWV0YSc7XG5pbXBvcnQge0NvbnRleHRGaWVsZFBhdGgsIER5bmFtaWNQcm9wZXJ0eVZhbHVlLCBWYWx1ZUNvbnZlcnRlcn0gZnJvbSAnLi4vY29yZS9wcm9wZXJ0eS12YWx1ZSc7XG5pbXBvcnQge01ldGFDb250ZXh0Q29tcG9uZW50LCBNZXRhVUlBY3Rpb25FdmVudH0gZnJvbSAnLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5cblxuLyoqXG4gKiAgTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUgaXMgKGFsb25nIHdpdGggTWV0YUNvbnRleHQpIHRoZSBrZXkgZWxlbWVudCBmb3IgYmluZGluZyBNZXRhVUlcbiAqIGludG8gQW5ndWxhckpzIHVzZXIgaW50ZXJmYWNlcy4gWW91IGNhbiB0aGluayBvZiBpdCBzdWNoIEdMVUUuXG4gKlxuICogIE1ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlIGR5bmFtaWNhbGx5IHN3aXRjaGVzIGluIGEgQW5ndWxhcidzIGNvbXBvbmVudCBiYXNlZCBvbiB0aGVcbiAqIGN1cnJlbnQgTWV0YUNvbnRleHQnc1xuICogJ2NvbXBvbmVudCcgcHJvcGVydHkgYW5kIHNldHMgaXRzIGJpbmRpbmdzIGZyb20gdGhlICdiaW5kaW5ncycgcHJvcGVydHkuICBUaGlzIGFsb25lIGVuYWJsZXNcbiAqIGFsbW9zdCBhbnkgZXhpc3RpbmcgQW5ndWxhcidzIHdpZGdldCB0byBiZSBzcGVjaWZpZWQgZm9yIHVzZSBmb3IgYSBwYXJ0aWN1bGFyIGZpZWxkIG9yIGxheW91dFxuICogdXNpbmcgcnVsZXMgLS0gd2l0aG91dCBhbnkgYWRkaXRpb25hbCBnbHVlIGNvZGUgLlxuICpcbiAqICBjb21wb25lbnQgdXNpbmcgJ3dyYXBwZXJDb21wb25lbnQnIGFuZCAnd3JhcHBlckJpbmRpbmdzJywgYmluZGluZyBjb21wb25lbnQgY29udGVudCB1c2luZyB0aGVcbiAqIGJpbmRpbmdzICduZ2NvbnRlbnQnLCBuZ2NvbnRlbnRMYXlvdXQgYW5kICduZ2NvbnRlbnRlbEVsZW1lbnQnLCBhbmQgZXZlbnQgYmluZGluZyBuYW1lZCBDb250ZW50XG4gKiB0ZW1wbGF0ZXMgdXNpbmcgYW5cbiAqICdhd2NvbnRlbnRMYXlvdXRzJyBtYXAgYmluZGluZy4gV2l0aG91dCB0aGlzIHdlIHdpbGwgbm90IGJlIGFibGUgdG8gdXNlIGNvbXBsZXggbGF5b3V0cy5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbS1pbmNsdWRlLWNvbXBvbmVudCdcbn0pXG5leHBvcnQgY2xhc3MgTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUgZXh0ZW5kcyBJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlIGltcGxlbWVudHMgRG9DaGVjayxcbiAgICBBZnRlclZpZXdJbml0IHtcblxuICAgIC8qKlxuICAgICAqIEp1c3QgYSBjb25zdGFudCB1c2UgdG8gYWNjZXNzIEVudmlyb25tZW50IHdoZXJlIHdlIHN0b3JlIGN1cnJlbnQgY29udGV4dCBmb3IgY3VycmVudCByZW5kZXJcbiAgICAgKiBsaWZlY3ljbGVcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBGb3JtYXR0ZXJCaW5kaW5nID0gJ2Zvcm1hdHRlcic7XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW4gbWV0YVUgd2UgY2FuIGFsc28gaW5zZXJ0IGludG8gdGhlIGVsZW1lbnQgbm90IG9ubHkgbmdjb250ZW50IGJ1dCBuZXcgaW5zdGFudGlhdGVkXG4gICAgICogY29tcG9uZW50IHdoaWNoIGlzIGRlZmluZWQgYnkgbGF5b3V0XG4gICAgICpcbiAgICAgKmBgYFxuICAgICAqIGZpZWxkIHRyYWl0PU9iamVjdERldGFpbCB7XG4gICAgICogXHRlZGl0YWJsZT1mYWxzZSB7XG4gICAgICogXHRcdGNvbXBvbmVudDogSG92ZXJDYXJkQ29tcG9ubmV0O1xuICAgICAqIFx0XHRiaW5kaW5nczoge1xuICAgICAqIFx0XHRcdG5nY29udGVudExheW91dDogQ29udGVudDtcbiAgICAgKiBcdFx0XHRsaW5rVGl0bGU6JHtwcm9wZXJ0aWVzLmdldChcImxhYmVsXCIpfTtcbiAgICAgKiBcdFx0fVxuICAgICAqIFx0fVxuICAgICAqXG4gICAgICogICAgQGxheW91dD1Db250ZW50IHtcbiAgICAgKiBcdFx0Y29tcG9uZW50OiBNZXRhQ29udGV4dE9iamVjdDtcbiAgICAgKiBcdFx0YmluZGluZ3M6IHtcbiAgICAgKiBcdFx0XHRvYmplY3Q6ICR2YWx1ZTtcbiAgICAgKiBcdFx0XHRsYXlvdXQ6RGV0YWlsTGF5b3V0XG4gICAgICogXHRcdFx0b3BlcmF0aW9uOlwidmlld1wiO1xuICAgICAqIFx0XHR9XG4gICAgICogXHR9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IE5nQ29udGVudExheW91dCA9ICduZ2NvbnRlbnRMYXlvdXQnO1xuXG5cbiAgICAvKipcbiAgICAgKiBJIGNvdWxkIG5vdCBmaW5kIGFueSByZWFsaWFibGUgd2F5IGhvdyB0byBhY2Nlc3MgcGFyZW50IHZpZXcuIEV2ZW4gZm9yd2FyZFJlZiB1cCB0byBjZXJ0YWluXG4gICAgICogcG9pbnQgd29ya2VkIGJ1dCBoYWQgdG8gZ2V0IGF3YXkgZnJvbSB0aGlzIGFwcHJvYWNoIGFzIGl0IGZhaWxzIGZvciBteSB1c2VjYXNlIHdoZW4gdXBkYXRpbmdcbiAgICAgKiBjb250ZXh0IGFuZCBwdXNoaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZSBzdGFjay5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbnRleHQ6IE1ldGFDb250ZXh0Q29tcG9uZW50O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWV0YUNvbnRleHRDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHB1YmxpYyBtZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgcHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgcHVibGljIGZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHVibGljIGNvbXBSZWdpc3RyeTogQ29tcG9uZW50UmVnaXN0cnksXG4gICAgICAgICAgICAgICAgcHVibGljIGRvbVV0aWxzOiBEb21VdGlsc1NlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIodmlld0NvbnRhaW5lciwgZmFjdG9yeVJlc29sdmVyLCBjZCwgY29tcFJlZ2lzdHJ5KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpcnN0IHdlIHNpbXBseSByZW5kZXIgdGhlIGEgY29tcG9uZW50IGluIHRoZSBuZ09uSW5pdCgpIGFuZCB0aGVuIGV2ZXJ5IHRpbWUgc29tZXRoaW5nXG4gICAgICogY2hhbmdlcy5cbiAgICAgKi9cbiAgICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdNZXRhSW5jbHVkZShuZ0RvQ2hlY2spOicsIHRoaXMubmFtZSk7XG5cbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpO1xuICAgICAgICBpZiAoaXNCbGFuayhjb250ZXh0KSB8fCBpc0JsYW5rKHRoaXMuY3VycmVudENvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdObyBjb250ZXh0LyBjb21wb25lbnQgZm9yICcgKyB0aGlzLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld0NvbXBvbmVudCA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoJ2NvbXBvbmVudCcpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KG5ld0NvbXBvbmVudCkgJiYgaXNQcmVzZW50KHRoaXMubmFtZSkgJiYgKHRoaXMubmFtZSAhPT0gbmV3Q29tcG9uZW50KSkge1xuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmRvUmVuZGVyQ29tcG9uZW50KCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTWV0YUluY2x1ZGUobmdEb0NoZWNrLSByZXJlbmRlciApOicsIHRoaXMubmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV3JhcHBlckVsZW1lbnRJZkFueSgpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb250ZW50RWxlbWVudElmQW55KCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIHdlIG1pZ2h0IG5vdCBza2lwIGNvbXBvbmVudCBpbnN0YW50aWF0aW9uIGJ1dCB3ZSBzdGlsbCBuZWVkIHRvIHVwZGF0ZSBiaW5kaW5nc1xuICAgICAgICAgICAgLy8gYXMgcHJvcGVydGllcyBjb3VsZCBjaGFuZ2VcbiAgICAgICAgICAgIGxldCBlZGl0YWJsZSA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoT2JqZWN0TWV0YS5LZXlFZGl0YWJsZSk7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayhlZGl0YWJsZSkpIHtcbiAgICAgICAgICAgICAgICBlZGl0YWJsZSA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUVkaXRpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1ldGFCaW5kaW5ncyA9IGNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleVR5cGUpO1xuICAgICAgICAgICAgbGV0IGlucHV0czogc3RyaW5nW10gPSB0aGlzLmNvbXBvbmVudFJlZmVyZW5jZSgpLm1ldGFkYXRhLmlucHV0cztcblxuICAgICAgICAgICAgLy8gcmUtYXBwbHkgSW5wdXRzXG4gICAgICAgICAgICAvLyBtYXliZSB3ZSBzaG91bGQgZGlmZiBwcm9wZXJ0aWVzIGFuZCBvbmx5IGlmIHRoZXkgY2hhbmdlZCByZS1hcHBseVxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChtZXRhQmluZGluZ3MpICYmIGlzUHJlc2VudChpbnB1dHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUlucHV0cyh0aGlzLmN1cnJlbnRDb21wb25lbnQsIHR5cGUsIG1ldGFCaW5kaW5ncywgaW5wdXRzLCBlZGl0YWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qXG4gICAgICogUmV0cmlldmVzIGNvbXBvbmVudCBOYW1lIGZyb20gdGhlIENvbnRleHQuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJlc29sdmVDb21wb25lbnRUeXBlKCk6IFR5cGU8YW55PiB7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMubmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBOb01ldGFDb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLnJlc29sdmVDb21wb25lbnRUeXBlKCk7XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqIElmIHRoZXJlIGlzIGEgTkcgY29udGVudCBhcyBwYXJ0IG9mIHRoZSBiaW5kaW5ncyBhcHBseSBpdCBhbmQgcmVtb3ZlIGl0IGZyb20gdGhlIGxpc3QuIEluXG4gICAgICogdGhlIE1ldGFVSSB3b3JsZCBpdCBjYW4gYXBwZWFyIGlmIHdlIHdhbnQgdG8gaW5zZXJ0IGEgdGV4dCBjb250ZW50IGludG8gdGhlIGVsZW1lbnQ6XG4gICAgICpcbiAgICAgKlxuICAgICAqICB0cmFpdD10b01hbnlMaW5rIHtcbiAgICAgKiAgICAgICAgIGNvbXBvbmVudDpBV0h5cGVybGluaztcbiAgICAgKiAgICAgICAgIGJpbmRpbmdzOiB7XG4gICAgICogICAgICAgICAgICAgYWN0aW9uOiAke1xuICAgICAqICAgICAgICAgICAgICAgIHRoaXMuc2V0KFwib2JqZWN0XCIsIHZhbHVlKTtcbiAgICAgKiAgICAgICAgICAgICAgICB0aGlzLnNldChcImFjdGlvbkNhdGVnb3J5XCIsIFwiR2VuZXJhbFwiKTtcbiAgICAgKiAgICAgICAgICAgICAgICB0aGlzLnNldChcImFjdGlvblwiLCBcIkluc3BlY3RcIik7XG4gICAgICogICAgICAgICAgICAgICAgIG1ldGEuZmlyZUFjdGlvbih0aGlzLCB0cnVlKVxuICAgICAqICAgICAgICAgICAgIH07XG4gICAgICogICAgICAgICAgICAgYXdjb250ZW50OiBcIkNsaWNrIE1lXCI7XG4gICAgICogICAgICAgICB9XG4gICAgICogICAgIH1cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG5nQ29udGVudCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY250VmFsdWU6IGFueTtcbiAgICAgICAgbGV0IGJpbmRpbmdzID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5QmluZGluZ3MpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmluZGluZ3MpICYmXG4gICAgICAgICAgICBpc1ByZXNlbnQoY250VmFsdWUgPSBiaW5kaW5ncy5nZXQoSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5OZ0NvbnRlbnQpKSkge1xuICAgICAgICAgICAgY250VmFsdWUgPSBpc1N0cmluZyhjbnRWYWx1ZSkgPyBjbnRWYWx1ZSA6XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5yZXNvbHZlVmFsdWUoY250VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbnRWYWx1ZTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBuZ0NvbnRlbnRFbGVtZW50KCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjbnRWYWx1ZTogYW55O1xuICAgICAgICBsZXQgYmluZGluZ3MgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChiaW5kaW5ncykgJiZcbiAgICAgICAgICAgIGlzUHJlc2VudChjbnRWYWx1ZSA9IGJpbmRpbmdzLmdldChJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudEVsZW1lbnQpKSkge1xuICAgICAgICAgICAgY250VmFsdWUgPSBpc1N0cmluZyhjbnRWYWx1ZSkgPyBjbnRWYWx1ZSA6XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5yZXNvbHZlVmFsdWUoY250VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbnRWYWx1ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudCBjdXN0b20gYmVoYXZpb3Igb2YgYWRkaW5nIG5nY29udGVudExheW91dCBkZXNjcmliZWQgYWJvdmUgKHdoZXJlIHRoZSBjb25zdGFudFxuICAgICAqIGlzIGRlZmluZWQpXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ29udGVudEVsZW1lbnRJZkFueSgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGRldGVjdENoYW5nZXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IGJpbmRpbmdzID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5QmluZGluZ3MpO1xuXG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChiaW5kaW5ncykgJiYgYmluZGluZ3MuaGFzKE1ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudExheW91dCkpIHtcblxuICAgICAgICAgICAgbGV0IGxheW91dE5hbWUgPSBiaW5kaW5ncy5nZXQoTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50TGF5b3V0KTtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKTtcblxuICAgICAgICAgICAgY29udGV4dC5wdXNoKCk7XG4gICAgICAgICAgICBjb250ZXh0LnNldChVSU1ldGEuS2V5TGF5b3V0LCBsYXlvdXROYW1lKTtcblxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KCdjb21wb25lbnQnKTtcbiAgICAgICAgICAgIGxldCBjb21wVHlwZSA9IHRoaXMuY29tcFJlZ2lzdHJ5Lm5hbWVUb1R5cGUuZ2V0KGNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+ID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcFR5cGUpO1xuXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50TWV0YTogQ29tcG9uZW50ID0gdGhpcy5yZXNvbHZlRGlyZWN0aXZlKGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgICAgICAgbGV0IG5nQ29tcG9uZW50ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5LCAwKTtcblxuICAgICAgICAgICAgbGV0IGNSZWZlcmVuY2U6IENvbXBvbmVudFJlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogY29tcG9uZW50TWV0YSxcbiAgICAgICAgICAgICAgICByZXNvbHZlZENvbXBGYWN0b3J5OiBjb21wb25lbnRGYWN0b3J5LFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGNvbXBUeXBlLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudE5hbWU6IGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuYXBwbHlCaW5kaW5ncyhjUmVmZXJlbmNlLCBuZ0NvbXBvbmVudCwgY29udGV4dC5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5QmluZGluZ3MpLFxuICAgICAgICAgICAgICAgIGZhbHNlKTtcblxuICAgICAgICAgICAgdGhpcy5kb21VdGlscy5pbnNlcnRJbnRvUGFyZW50TmdDb250ZW50KHRoaXMuY3VycmVudENvbXBvbmVudC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgIG5nQ29tcG9uZW50LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICBjb250ZXh0LnBvcCgpO1xuXG4gICAgICAgICAgICBkZXRlY3RDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRldGVjdENoYW5nZXMgPSBzdXBlci5jcmVhdGVDb250ZW50RWxlbWVudElmQW55KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRldGVjdENoYW5nZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdNZXRhSW5jbHVkZShjcmVhdGVDb250ZW50RWxlbWVudElmQW55KTonLCB0aGlzLm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGV0ZWN0Q2hhbmdlcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1ldGEgcGxhY2VUaGVDb21wb25lbnQgbmVlZHMgdG8gYWNjb3VudCBmb3Igd3JhcHBlciBjb21wb25lbnQuIElmIHdyYXBwZXIgY29tcG9uZW50XG4gICAgICogaXMgcHJlc2VudC4gSXQgbmVlZHMgdG8gaW5qZWN0IHRoZSB3cmFwcGVyIGNvbXBvbmVudCBvbiB0aGUgcGFnZSBhbmQgYWRkIHRoaXMgY29tcG9uZW50XG4gICAgICogaW5zaWRlIHRoZSB3cmFwcGVyIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY3JlYXRlV3JhcHBlckVsZW1lbnRJZkFueSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHdyYXBwZXJOYW1lID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5V3JhcHBlckNvbXBvbmVudCk7XG4gICAgICAgIGlmIChpc0JsYW5rKHdyYXBwZXJOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm93IHdlIGhhdmUgd3JhcHBlckNvbXBvbmVudC4gV2UgZG8gdGhlIGZvbGxvd2luZzpcbiAgICAgICAgLy8gMS4gIENyZWF0ZSB3cmFwcGVyIGNvbXBvbmVudC5cbiAgICAgICAgbGV0IHdyYXBwZXJUeXBlID0gdGhpcy5jb21wUmVnaXN0cnkubmFtZVRvVHlwZS5nZXQod3JhcHBlck5hbWUpO1xuXG4gICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT4gPSB0aGlzLmZhY3RvcnlSZXNvbHZlclxuICAgICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHdyYXBwZXJUeXBlKTtcbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGE6IENvbXBvbmVudCA9IHRoaXMucmVzb2x2ZURpcmVjdGl2ZSh3cmFwcGVyVHlwZSk7XG5cbiAgICAgICAgbGV0IHdyYXBwZXJDb21wb25lbnQgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8vIDIuIEFkZCB3cmFwcGVyIGJpbmRpbmdzIHRvIHdyYXBwZXIgY29tcG9uZW50LlxuICAgICAgICBsZXQgd3JhcHBlckJpbmRpbmdzID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5V3JhcHBlckJpbmRpbmcpO1xuICAgICAgICAoPGFueT4gd3JhcHBlckNvbXBvbmVudC5pbnN0YW5jZSlbJ2JpbmRpbmdzJ10gPSB3cmFwcGVyQmluZGluZ3M7XG5cbiAgICAgICAgLy8gMy4gQXBwbHkgdGhlIGJpbmRpbmdzLiBHZXQgdGhlIHdyYXBwZXIgbWV0YWRhdGEsIGxvb2sgdGhyb3VnaCBpdCdzIGlucHV0IC0gb3V0cHV0XG4gICAgICAgIC8vIGJpbmRpbmdzLiBhbmQgYXBwbHkgdGhlIHdyYXBwZXJCaW5kaW5ncyB0byB0aGVzZSBiaW5kaW5ncy5cbiAgICAgICAgbGV0IHdyYXBwZXJDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgIG1ldGFkYXRhOiBjb21wb25lbnRNZXRhLFxuICAgICAgICAgICAgcmVzb2x2ZWRDb21wRmFjdG9yeTogY29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGU6IHdyYXBwZXJUeXBlLFxuICAgICAgICAgICAgY29tcG9uZW50TmFtZTogd3JhcHBlck5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFwcGx5QmluZGluZ3Mod3JhcHBlckNvbXBvbmVudFJlZiwgd3JhcHBlckNvbXBvbmVudCwgd3JhcHBlckJpbmRpbmdzKTtcbiAgICAgICAgdGhpcy5kb21VdGlscy5pbnNlcnRJbnRvUGFyZW50TmdDb250ZW50KHdyYXBwZXJDb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENvbXBvbmVudC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFwcGx5QmluZGluZ3MgcmVhZHMgdGhlIEBJbnB1dHMgZnJvbSBDb21wb25lbnRNZXRhZGF0YSBhbmQgY2hlY2sgaWYgdGhlcmUgZXhpc3RzIGEgYmluZGluZ1xuICAgICAqIGNvbWluZyBmcm9tIE1ldGFSdWxlcy4gSWYgdGhlcmUgaXMgd2UgYXNzaWduIGl0IHRvIHRoZSBpbnB1dC5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYXBwbHlCaW5kaW5ncyhjUmVmOiBDb21wb25lbnRSZWZlcmVuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5nczogTWFwPHN0cmluZywgYW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiVXNlTWV0YUJpbmRpbmdzOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBzdXBlci5hcHBseUJpbmRpbmdzKGNSZWYsIGNvbXBvbmVudCwgYmluZGluZ3MpO1xuICAgICAgICBsZXQgaW5wdXRzOiBzdHJpbmdbXSA9IGNSZWYubWV0YWRhdGEuaW5wdXRzO1xuICAgICAgICBsZXQgb3V0cHV0czogc3RyaW5nW10gPSBjUmVmLm1ldGFkYXRhLm91dHB1dHM7XG5cbiAgICAgICAgbGV0IG1ldGFCaW5kaW5ncyA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCkucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcbiAgICAgICAgbGV0IGVkaXRhYmxlID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleUVkaXRhYmxlKTtcbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpLnByb3BlcnR5Rm9yS2V5KE9iamVjdE1ldGEuS2V5VHlwZSk7XG5cbiAgICAgICAgLy8gVGhlcmUgYXJlIGNhc2VzIHdoZXJlIHdlIHdhbnQgdG8gdXNlIHRoZSBiaW5kaW5ncyBwYXNzZWQgaW50byB0aGlzIGZ1bmN0aW9uLlxuICAgICAgICAvLyBGb3IgZXhhbXBsZSwgdGhlIHdyYXBwZXJCaW5kaW5ncy5cbiAgICAgICAgaWYgKCFiVXNlTWV0YUJpbmRpbmdzKSB7XG4gICAgICAgICAgICBtZXRhQmluZGluZ3MgPSBiaW5kaW5ncztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKG1ldGFCaW5kaW5ncykgfHwgaXNCbGFuayhpbnB1dHMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVuQmluZGluZ3MgPSBNYXBXcmFwcGVyLmNsb25lKG1ldGFCaW5kaW5ncyk7XG4gICAgICAgIHRoaXMuYXBwbHlJbnB1dHMoY29tcG9uZW50LCB0eXBlLCBjdXJyZW5CaW5kaW5ncywgaW5wdXRzLCBlZGl0YWJsZSk7XG4gICAgICAgIHRoaXMuYXBwbHlPdXRwdXRzKGNvbXBvbmVudCwgY3VycmVuQmluZGluZ3MsIG91dHB1dHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlJbnB1dHMoY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiwgdHlwZTogYW55LCBiaW5kaW5nczogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzOiBzdHJpbmdbXSwgZWRpdGFibGU6IGFueSwgY29tcFRvQmVSZW5kZXJlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgLy8gcHJvcGFnYXRlIGEgZmllbGQgdHlwZSB0byBiaW5kaW5ncy5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0eXBlKSAmJiBpc1ByZXNlbnQoY29tcG9uZW50Lmluc3RhbmNlLmNhblNldFR5cGUpICYmXG4gICAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2UuY2FuU2V0VHlwZSgpKSB7XG4gICAgICAgICAgICBiaW5kaW5ncy5zZXQoT2JqZWN0TWV0YS5LZXlUeXBlLCB0eXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoZWRpdGFibGUpICYmIGlzUHJlc2VudChjb21wb25lbnQuaW5zdGFuY2VbJ2VkaXRhYmxlJ10pKSB7XG4gICAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbJ2VkaXRhYmxlJ10gPSBlZGl0YWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBpbnB1dHMpIHtcbiAgICAgICAgICAgIGxldCBwdWJsaWNLZXkgPSBub25Qcml2YXRlUHJlZml4KGtleSk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBiaW5kaW5ncy5nZXQocHVibGljS2V5KTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSB3aGVyZSB3ZSBkbyBub3QgcGFzcyBleHBsaWNpdGx5IG9yIGluaGVyaXQgZnJvbSBwYXJlbnQgQElucHV0XG4gICAgICAgICAgICAvLyBuYW1lIGZvciB0aGUgY29tcG9uZW50XG5cbiAgICAgICAgICAgIGlmIChrZXkgPT09ICduYW1lJyAmJiBpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKS5wcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleUZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpcElucHV0KGtleSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbXBUb0JlUmVuZGVyZWQgPSBvbmx5IGZpcnN0IHRpbWVcbiAgICAgICAgICAgIGlmIChjb21wVG9CZVJlbmRlcmVkICYmIHZhbHVlIGluc3RhbmNlb2YgQ29udGV4dEZpZWxkUGF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlEeW5hbWljSW5wdXRCaW5kaW5ncyhjb21wb25lbnQuaW5zdGFuY2UsIGJpbmRpbmdzLCBpbnB1dHMsIGtleSwgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb21wVG9CZVJlbmRlcmVkICYmIHZhbHVlIGluc3RhbmNlb2YgRHluYW1pY1Byb3BlcnR5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgZHludmFsOiBEeW5hbWljUHJvcGVydHlWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IGR5bnZhbC5ldmFsdWF0ZSh0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbcHVibGljS2V5XSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIHdoZW4gcmUtYXBwbHlpbmcgSW5wdXRzIHNraXAgYWxsIGV4cHJlc3Npb25zIGFib3ZlIGFuZCBvbmx5IHdvcmsgd2l0aCByZWd1bGFyXG4gICAgICAgICAgICAgICAgICogdHlwZXNcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqIHNldCBpdCBvbmx5IGlmIGl0IGNoYW5nZXMgc28gaXQgd2lsbCBub3QgdHJpZ2dlciBuZWNlc3NhcnkgYHZhbHVlIGNoYW5nZWRcbiAgICAgICAgICAgICAgICAgKiBhZnR0ZXIgY2hlY2tgXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKCFlcXVhbHMoY29tcG9uZW50Lmluc3RhbmNlW3B1YmxpY0tleV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbcHVibGljS2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBseSBGb3JtYXR0ZXIgdGhhdCBjYW4gYmUgc3BlY2lmaWVkIGluIHRoZSBvc3NcbiAgICAgICAgLy8gdGVtcG9yYXJ5IGRpc2FibGVkIHVudGlsbCBhbmd1bGFyIHdpbGwgc3VwcG9ydCBydW50aW1lIGkxOG5cbiAgICAgICAgLy8gaWYgKGJpbmRpbmdzLmhhcyhNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5Gb3JtYXR0ZXJCaW5kaW5nKSkge1xuICAgICAgICAvLyAgICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZm9ybWF0dGVyc1xuICAgICAgICAvLyAgICAgICAgIC5nZXQoYmluZGluZ3MuZ2V0KE1ldGFJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLkZvcm1hdHRlckJpbmRpbmcpKTtcbiAgICAgICAgLy8gICAgIGNvbXBvbmVudC5pbnN0YW5jZVtNZXRhSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5Gb3JtYXR0ZXJCaW5kaW5nXSA9IHRyYW5zZm9ybTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBza2lwSW5wdXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzQmxhbmsodmFsdWUpIHx8IGtleSA9PT0gSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5OZ0NvbnRlbnQgfHxcbiAgICAgICAgICAgIGtleSA9PT0gTWV0YUluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50TGF5b3V0O1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlPdXRwdXRzKGNvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT4sIGJpbmRpbmdzOiBhbnksIG91dHB1dHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiBvdXRwdXRzKSB7XG4gICAgICAgICAgICBsZXQgcHVibGljS2V5ID0gbm9uUHJpdmF0ZVByZWZpeChrZXkpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gYmluZGluZ3MuZ2V0KHB1YmxpY0tleSk7XG5cbiAgICAgICAgICAgIGlmIChrZXkgPT09IEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IGNvbXBvbmVudC5pbnN0YW5jZVtwdWJsaWNLZXldO1xuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRHluYW1pY1Byb3BlcnR5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RHluYW1pY091dHB1dEJpbmRpbmcoZXZlbnRFbWl0dGVyLCB2YWx1ZSwgdGhpcy5tZXRhQ29udGV4dC5teUNvbnRleHQoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGp1c3QgdHJpZ2dlciBldmVudCBvdXRzaWRlXG5cbiAgICAgICAgICAgICAgICBldmVudEVtaXR0ZXIuc3Vic2NyaWJlKCh2YWw6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnYuaGFzVmFsdWUoJ3BhcmVudC1jbngnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV2ZW50OiBhbnkgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY254OiBNZXRhQ29udGV4dENvbXBvbmVudCA9IHRoaXMuZW52LmdldFZhbHVlKCdwYXJlbnQtY254Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHZhbCBpbnN0YW5jZW9mIE1ldGFVSUFjdGlvbkV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IE1ldGFVSUFjdGlvbkV2ZW50KGNvbXBvbmVudC5pbnN0YW5jZSwgcHVibGljS2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWNLZXksIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbngub25BY3Rpb24uZW1pdChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlEeW5hbWljT3V0cHV0QmluZGluZyhlbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiwgdmFsdWU6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogQ29udGV4dCk6IHZvaWQge1xuXG4gICAgICAgIGVtaXR0ZXIuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKCh2YWw6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IGR5bnZhbDogRHluYW1pY1Byb3BlcnR5VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQucmVzb2x2ZVZhbHVlKGR5bnZhbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlEeW5hbWljSW5wdXRCaW5kaW5ncyhtZTogYW55LCBiaW5kaW5nczogYW55LCBpbnB1dHM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFueSwgZWRpdGFibGU6IGJvb2xlYW4pIHtcblxuICAgICAgICBsZXQgcHVibGljS2V5ID0gbm9uUHJpdmF0ZVByZWZpeChrZXkpO1xuICAgICAgICBsZXQgY254dFBhdGg6IENvbnRleHRGaWVsZFBhdGggPSB2YWx1ZTtcbiAgICAgICAgbGV0IG1ldGFDb250ZXh0ID0gdGhpcy5tZXRhQ29udGV4dDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNhcHR1cmVkIGFsc28gY3VycmVudCBjb250ZXh0IHNuYXBzaG90IHNvIHdlIGNhbiByZXBsYXkgQ29udGV4dEZpZWxkUGF0aC5ldmFsdWF0ZSgpIGlmXG4gICAgICAgICAqIGNhbGxlZCBvdXRzaWRlIG9mIHB1c2gvcG9wIGN5Y2xlLlxuICAgICAgICAgKlxuICAgICAgICAgKiB0b2RvOiBjaGVjayBpZiB3ZSBjYW4gcmVwbGFjZSB0aGlzIHdpdGggQ3VzdG9tIHZhbHVlIGFjY2Vzc29yXG4gICAgICAgICAqL1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWUsIHB1YmxpY0tleSwge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubWV0YUNvbnRleHQubXlDb250ZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNueHRQYXRoLmV2YWx1YXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0OiAodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1ldGFDb250ZXh0Lm15Q29udGV4dCgpO1xuICAgICAgICAgICAgICAgIGxldCBlZGl0aW5nID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleUVkaXRhYmxlKVxuICAgICAgICAgICAgICAgICAgICB8fCBjb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlFZGl0aW5nKTtcblxuICAgICAgICAgICAgICAgIGlmIChlZGl0aW5nICYmICFTdHJpbmdXcmFwcGVyLmVxdWFscyh2YWwsIG1lW3B1YmxpY0tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBlID0gY29udGV4dC5wcm9wZXJ0eUZvcktleShPYmplY3RNZXRhLktleVR5cGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNueHRQYXRoLmV2YWx1YXRlU2V0KGNvbnRleHQsIFZhbHVlQ29udmVydGVyLnZhbHVlKHR5cGUsIHZhbCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==