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
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    DoCheck,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    Type,
    ViewContainerRef
} from '@angular/core';
import {
    ComponentReference,
    ComponentRegistry,
    DomUtilsService,
    FormattersService,
    IncludeComponentDirective
} from '@aribaui/components';
import {
    Environment,
    equals,
    isBlank,
    isPresent,
    isString,
    MapWrapper,
    nonPrivatePrefix,
    StringWrapper
} from '@aribaui/core';
import {NoMetaComponent} from './no-meta/no-meta.component';
import {ObjectMeta} from '../core/object-meta';
import {Context} from '../core/context';
import {UIMeta} from '../core/uimeta';
import {ContextFieldPath, DynamicPropertyValue, ValueConverter} from '../core/property-value';
import {MetaContextComponent, MetaUIActionEvent} from '../core/meta-context/meta-context.component';


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
@Directive({
    selector: 'm-include-component'
})
export class MetaIncludeComponentDirective extends IncludeComponentDirective implements DoCheck,
    AfterViewInit

{

    /**
     * Just a constant use to access Environment where we store current context for current render
     * lifecycle
     *
     */
    static readonly FormatterBinding = 'formatter';


    /**
     *
     * In metaU we can also insert into the element not only ngcontent but new instantiated
     * component which is defined by layout
     *
     *```
     * field trait=ObjectDetail {
     * 	editable=false {
     * 		component: HoverCardComponnet;
     * 		bindings: {
     * 			ngcontentLayout: Content;
     * 			linkTitle:${properties.get("label")};
     * 		}
     * 	}
     *
     *    @layout=Content {
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
    static readonly NgContentLayout = 'ngcontentLayout';


    /**
     * I could not find any realiable way how to access parent view. Even forwardRef up to certain
     * point worked but had to get away from this approach as it fails for my usecase when updating
     * context and pushing new properties to the stack.
     */
    @Input()
    context: MetaContextComponent;


    constructor(@Inject(forwardRef(() => MetaContextComponent))
                public metaContext: MetaContextComponent,
                public viewContainer: ViewContainerRef,
                public factoryResolver: ComponentFactoryResolver,
                public env: Environment,
                public cd: ChangeDetectorRef,
                public compRegistry: ComponentRegistry,
                public formatters: FormattersService,
                public domUtils: DomUtilsService)
    {
        super(viewContainer, factoryResolver, cd, compRegistry);

    }

    /**
     * First we simply render the a component in the ngOnInit() and then every time something
     * changes.
     */
    ngDoCheck(): void
    {
        // console.log('MetaInclude(ngDoCheck):', this.name);

        let context = this.metaContext.myContext();
        if (isBlank(context) || isBlank(this.currentComponent)) {
            // console.log('No context/ component for ' + this.name);
            return;
        }

        let newComponent = context.propertyForKey('component');
        if (isPresent(newComponent) && isPresent(this.name) && (this.name !== newComponent )) {
            this.viewContainer.clear();
            this.doRenderComponent();
            // console.log('MetaInclude(ngDoCheck- rerender ):', this.name);

            this.createWrapperElementIfAny();
            this.createContentElementIfAny();
        } else {

            // we might not skip component instantiation but we still need to update bindings
            // as properties could change
            let editable = context.propertyForKey(ObjectMeta.KeyEditable);
            if (isBlank(editable)) {
                editable = context.propertyForKey(UIMeta.KeyEditing);
            }
            let metaBindings = context.propertyForKey(UIMeta.KeyBindings);
            let type = context.propertyForKey(ObjectMeta.KeyType);
            let inputs: string[] = this.componentReference().metadata.inputs;

            // re-apply Inputs
            // maybe we should diff properties and only if they changed re-apply
            if (isPresent(metaBindings) && isPresent(inputs)) {
                this.applyInputs(this.currentComponent, type, metaBindings, inputs, editable);
            }
        }
    }


    /*
     * Retrieves component Name from the Context.
     */
    protected resolveComponentType(): Type<any>
    {
        this.name = this.metaContext.myContext().propertyForKey(UIMeta.KeyComponentName);

        if (isBlank(this.name)) {
            return NoMetaComponent;
        }
        return super.resolveComponentType();
    }


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
    protected ngContent(): string
    {
        let cntValue: any;
        let bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);

        if (isPresent(bindings) &&
            isPresent(cntValue = bindings.get(IncludeComponentDirective.NgContent))) {
            cntValue = isString(cntValue) ? cntValue :
                this.metaContext.myContext().resolveValue(cntValue);
        }
        return cntValue;
    }


    protected ngContentElement(): string
    {
        let cntValue: any;
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
     */
    protected createContentElementIfAny(): boolean
    {
        let detectChanges = false;
        let bindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);


        if (isPresent(bindings) && bindings.has(MetaIncludeComponentDirective.NgContentLayout)) {

            let layoutName = bindings.get(MetaIncludeComponentDirective.NgContentLayout);
            let context = this.metaContext.myContext();

            context.push();
            context.set(UIMeta.KeyLayout, layoutName);

            let componentName = context.propertyForKey('component');
            let compType = this.compRegistry.nameToType.get(componentName);

            let componentFactory: ComponentFactory<any> = this.factoryResolver
                .resolveComponentFactory(compType);

            let componentMeta: Component = this.resolveDirective(componentFactory);
            let ngComponent = this.viewContainer.createComponent(componentFactory, 0);

            let cReference: ComponentReference = {
                metadata: componentMeta,
                resolvedCompFactory: componentFactory,
                componentType: compType,
                componentName: componentName
            };

            this.applyBindings(cReference, ngComponent, context.propertyForKey(UIMeta.KeyBindings),
                false);

            this.domUtils.insertIntoParentNgContent(this.currentComponent.location.nativeElement,
                ngComponent.location.nativeElement);

            context.pop();

            detectChanges = true;
        } else {
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
     */
    protected createWrapperElementIfAny(): void
    {
        let wrapperName = this.metaContext.myContext().propertyForKey(UIMeta.KeyWrapperComponent);
        if (isBlank(wrapperName)) {
            return;
        }

        // Now we have wrapperComponent. We do the following:
        // 1.  Create wrapper component.
        let wrapperType = this.compRegistry.nameToType.get(wrapperName);

        let componentFactory: ComponentFactory<any> = this.factoryResolver
            .resolveComponentFactory(wrapperType);
        let componentMeta: Component = this.resolveDirective(wrapperType);

        let wrapperComponent = this.viewContainer.createComponent(componentFactory);

        // 2. Add wrapper bindings to wrapper component.
        let wrapperBindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyWrapperBinding);
        (<any> wrapperComponent.instance)['bindings'] = wrapperBindings;

        // 3. Apply the bindings. Get the wrapper metadata, look through it's input - output
        // bindings. and apply the wrapperBindings to these bindings.
        let wrapperComponentRef: ComponentReference = {
            metadata: componentMeta,
            resolvedCompFactory: componentFactory,
            componentType: wrapperType,
            componentName: wrapperName
        };

        this.applyBindings(wrapperComponentRef, wrapperComponent, wrapperBindings);
        this.domUtils.insertIntoParentNgContent(wrapperComponent.location.nativeElement,
            this.currentComponent.location.nativeElement);
    }


    /**
     * ApplyBindings reads the @Inputs from ComponentMetadata and check if there exists a binding
     * coming from MetaRules. If there is we assign it to the input.
     */
    protected applyBindings(cRef: ComponentReference,
                            component: ComponentRef<any>,
                            bindings: Map<string, any>,
                            bUseMetaBindings: boolean = true): void
    {
        super.applyBindings(cRef, component, bindings);
        let inputs: string[] = cRef.metadata.inputs;
        let outputs: string[] = cRef.metadata.outputs;

        let metaBindings = this.metaContext.myContext().propertyForKey(UIMeta.KeyBindings);
        let editable = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyEditable);
        let type = this.metaContext.myContext().propertyForKey(ObjectMeta.KeyType);

        // There are cases where we want to use the bindings passed into this function.
        // For example, the wrapperBindings.
        if (!bUseMetaBindings) {
            metaBindings = bindings;
        }

        if (isBlank(metaBindings) || isBlank(inputs)) {
            return;
        }

        let currenBindings = MapWrapper.clone(metaBindings);
        this.applyInputs(component, type, currenBindings, inputs, editable);
        this.applyOutputs(component, currenBindings, outputs);
    }

    private applyInputs(component: ComponentRef<any>, type: any, bindings: any,
                        inputs: string[], editable: any, compToBeRendered: boolean = true)
    {
        // propagate a field type to bindings.
        if (isPresent(type) && isPresent(component.instance.canSetType) &&
            component.instance.canSetType()) {
            bindings.set(ObjectMeta.KeyType, type);
        }

        if (isPresent(editable) && isPresent(component.instance['editable'])) {
            component.instance['editable'] = editable;
        }

        for (let key of inputs) {
            let publicKey = nonPrivatePrefix(key);
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
                this.applyDynamicInputBindings(component.instance, bindings, inputs, key, value,
                    editable);

            } else if (compToBeRendered && value instanceof DynamicPropertyValue) {
                let dynval: DynamicPropertyValue = value;
                let newValue = dynval.evaluate(this.metaContext.myContext());
                component.instance[publicKey] = newValue;

            } else {
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
        if (bindings.has(MetaIncludeComponentDirective.FormatterBinding)) {
            let transform = this.formatters
                .get(bindings.get(MetaIncludeComponentDirective.FormatterBinding));
            component.instance[MetaIncludeComponentDirective.FormatterBinding] = transform;
        }
    }


    private skipInput(key: string, value: any): boolean
    {
        return isBlank(value) || key === IncludeComponentDirective.NgContent ||
            key === MetaIncludeComponentDirective.NgContentLayout;
    }

    private applyOutputs(component: ComponentRef<any>, bindings: any, outputs: string[])
    {
        for (let key of outputs) {
            let publicKey = nonPrivatePrefix(key);
            let value = bindings.get(publicKey);

            if (key === IncludeComponentDirective.NgContent) {
                continue;
            }
            let eventEmitter: EventEmitter<any> = component.instance[publicKey];
            if (value instanceof DynamicPropertyValue) {
                this.applyDynamicOutputBinding(eventEmitter, value, this.metaContext.myContext());
            } else {
                // just trigger event outside

                eventEmitter.subscribe((val: any) =>
                {
                    if (this.env.hasValue('parent-cnx')) {
                        let event: any = val;
                        let cnx: MetaContextComponent = this.env.getValue('parent-cnx');

                        if (!(val instanceof MetaUIActionEvent)) {
                            event = new MetaUIActionEvent(component.instance, publicKey,
                                publicKey, val);
                        }
                        cnx.onAction.emit(event);
                    }
                });
            }
        }
    }

    private applyDynamicOutputBinding(emitter: EventEmitter<any>, value: any,
                                      context: Context): void
    {

        emitter.asObservable() .subscribe((val: any) =>
        {
            let dynval: DynamicPropertyValue = value;
            context.resolveValue(dynval);
        });
    }

    private applyDynamicInputBindings(me: any, bindings: any, inputs: string[], key: string,
                                      value: any, editable: boolean)
    {

        let publicKey = nonPrivatePrefix(key);
        let cnxtPath: ContextFieldPath = value;
        let metaContext = this.metaContext;
        /**
         * captured also current context snapshot so we can replay ContextFieldPath.evaluate() if
         * called outside of push/pop cycle.
         *
         * todo: check if we can replace this with Custom value accessor
         */
        Object.defineProperty(me, publicKey, {
            get: () =>
            {

                let context = this.metaContext.myContext();
                return cnxtPath.evaluate(context);
            },

            set: (val) =>
            {
                let context = this.metaContext.myContext();
                let editing = context.propertyForKey(ObjectMeta.KeyEditable)
                    || context.propertyForKey(UIMeta.KeyEditing);

                if (editing && !StringWrapper.equals(val, me[publicKey])) {
                    let type = context.propertyForKey(ObjectMeta.KeyType);

                    cnxtPath.evaluateSet(context, ValueConverter.value(type, val));
                }
            },
            enumerable: true,
            configurable: true
        });
    }
}
