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
import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, DoCheck, Type, ViewContainerRef } from '@angular/core';
import { ComponentReference, ComponentRegistry, DomUtilsService, IncludeComponentDirective } from '@aribaui/components';
import { Environment } from '@aribaui/core';
import { MetaContextComponent } from '../core/meta-context/meta-context.component';
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
export declare class MetaIncludeComponentDirective extends IncludeComponentDirective implements DoCheck, AfterViewInit {
    metaContext: MetaContextComponent;
    viewContainer: ViewContainerRef;
    factoryResolver: ComponentFactoryResolver;
    env: Environment;
    cd: ChangeDetectorRef;
    compRegistry: ComponentRegistry;
    domUtils: DomUtilsService;
    /**
     * Just a constant use to access Environment where we store current context for current render
     * lifecycle
     *
     */
    static readonly FormatterBinding: string;
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
    static readonly NgContentLayout: string;
    /**
     * I could not find any realiable way how to access parent view. Even forwardRef up to certain
     * point worked but had to get away from this approach as it fails for my usecase when updating
     * context and pushing new properties to the stack.
     */
    context: MetaContextComponent;
    constructor(metaContext: MetaContextComponent, viewContainer: ViewContainerRef, factoryResolver: ComponentFactoryResolver, env: Environment, cd: ChangeDetectorRef, compRegistry: ComponentRegistry, domUtils: DomUtilsService);
    /**
     * First we simply render the a component in the ngOnInit() and then every time something
     * changes.
     */
    ngDoCheck(): void;
    protected resolveComponentType(): Type<any>;
    protected ngContent(): string;
    protected ngContentElement(): string;
    /**
     * Implement custom behavior of adding ngcontentLayout described above (where the constant
     * is defined)
     *
     */
    protected createContentElementIfAny(): boolean;
    /**
     * Meta placeTheComponent needs to account for wrapper component. If wrapper component
     * is present. It needs to inject the wrapper component on the page and add this component
     * inside the wrapper component.
     */
    protected createWrapperElementIfAny(): void;
    /**
     * ApplyBindings reads the @Inputs from ComponentMetadata and check if there exists a binding
     * coming from MetaRules. If there is we assign it to the input.
     */
    protected applyBindings(cRef: ComponentReference, component: ComponentRef<any>, bindings: Map<string, any>, bUseMetaBindings?: boolean): void;
    private applyInputs(component, type, bindings, inputs, editable, compToBeRendered?);
    private skipInput(key, value);
    private applyOutputs(component, bindings, outputs);
    private applyDynamicOutputBinding(emitter, value, context);
    private applyDynamicInputBindings(me, bindings, inputs, key, value, editable);
}
