/**
 *
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
 *
 *
 */
import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ComponentReference } from './component-reference';
import { ComponentRegistry } from './component-registry.service';
/**
 * this is specific import to we can use components as components[typename] and  get back a
 * type.
 * I could not find any better dynamic way up to now
 */
/**
 *  `IncludeComponent` directive dynamically instantiate and insert a components into the screen
 * based on the name. It can accepts bindings as well which will be automatically bound and applied
 * to the component
 *
 *  ### usage:
 *
 *  Instead of inserting component in the way:
 *
 *  ```
 *    <textfield value="some value">
 *
 *  ```
 *
 *  you can do so dynamically like this:
 *
 * ```
 *  <aw-include-component 'TextfieldComponent' [bindings]=bindings ></aw-include-component>
 * ```
 *
 * This is the main building block to dynamically generated UI.
 *
 *
 * Todo: Currently the way Angular API work and we use it to create programatically components
 * is too complext we need to create everything 3 different calls to place a component to the
 * container. What I want is is to create some kind of representation of ContainerElement and this
 * can be also parent for our BaseComponent with method add and remove content. Then we could have
 * some AWContent.
 *
 * e.g.: to replace applyContentElementIfAny where we have several calls to create and add
 * component to the view.
 *
 * ```ts
 *  let containerElement = AWConcreteTemplate(viewContainer, factoryResolver)
 *  containerElement.add('Clck Me')
 * ```
 *
 * To assemble different components together - not only adding string content
 *
 * ```ts
 *  let content = new AWContent(ButtonComponent, bindingsMap)
 *  content.add('Click Me');
 *  containerElement.add(content)
 *
 * ```
 *
 * add more component hierarchy:
 *
 * ```ts
 *  let content = new AWContent(HoverCardComponnets, bindingsMap)
 *  content.add(createLayout();
 *  containerElement.add(content)
 *
 * ```
 *
 *
 *
 *
 */
export declare class IncludeComponentDirective implements OnDestroy, OnInit, AfterViewChecked, OnChanges, AfterViewInit, AfterContentInit {
    viewContainer: ViewContainerRef;
    factoryResolver: ComponentFactoryResolver;
    cd: ChangeDetectorRef;
    compRegistry: ComponentRegistry;
    static readonly NgContent: string;
    static readonly NgContentElement: string;
    /**
     * Full component name e.g.: DropdownComponent which is going to be inserted. We need to take
     * this name and translate it into actual TYPE. In order to do this we use a trick where we
     * access an IMPORTED components.
     *
     * ```
     * import * as components from '../components';
     * ```
     *
     * Then you can retrieve a type by just components[<String Literal >] => Component TYPE
     *
     */
    protected name: string;
    /**
     * Provides bindings which will be passed into the component when instantiated
     */
    protected bindings: Map<string, any>;
    /**
     * Current created component reference using ComponentFactoryResolver. We use this to access
     * the actual component instance and Element Reference
     */
    protected currentComponent: ComponentRef<any>;
    /**
     * I use this flag to identify that component is rendering for first time or its updated during
     * change detection
     *
     */
    protected initRenderInProgress: boolean;
    /**
     * Not sure if we need this, but want to keep it here or maybe move it to some service so we
     * can cache created components and maybe reuse them.
     *
     */
    protected componentReferences: Map<string, ComponentReference>;
    /**
     * Need to cache the resolved component reference so we dont call ComponentFactoryResolver
     * everything we want to refresh a screen
     */
    resolvedComponentRef: ComponentReference;
    constructor(viewContainer: ViewContainerRef, factoryResolver: ComponentFactoryResolver, cd: ChangeDetectorRef, compRegistry: ComponentRegistry);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewChecked(): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    /**
     * Handles a case where we need to resolve additional component and wrap the current one.
     * Just like reateContentElementIfAny() this method needs to be executed after all
     * is created and initialized (inside the ngAfterViewInit() )
     *
     */
    protected createWrapperElementIfAny(): void;
    /**
     * Renders a component into actual View Container. The process goes as this.
     *  1. We retrieve component Type based on the component name, which creates componentRef
     *  2. Place the component onto the screen
     *  3. Read component metadata, mainly INPUTs and apply bindings for each of them
     *  4. Manually spin change detection to update the screen. Mainly for case where I need to
     * redraw a screen
     */
    protected doRenderComponent(): void;
    /**
     * Place actual component onto the screen using ViewContainerRef
     *
     */
    protected placeTheComponent(): void;
    /**
     * When inserting Component that needs to have a content like e.g. hyperlink or button
     *
     * ```
     *   <button> MY NG CONTENT </button>
     *
     * ```
     *  this method applies and insert a child content into the main component. This method insert
     * a simple string. We are not wrapping existing component with another component here.
     *
     * @return need to run detect changes ? default is false
     */
    protected createContentElementIfAny(): boolean;
    /**
     *
     * Retrieve a NG Content from binding list and remove it so it its not prepagated down when
     * applying other bindings.
     *
     */
    protected ngContent(): string;
    protected ngContentElement(): string;
    /**
     * We need to convert a component name to actual a type and then use ComponentFactoryResolver
     * to instantiate a a component and save its information into our component references. The
     * reason why we have this component reference is we need to store Angular's component metadata
     * so we can iterate thru all the inputs and bind them to the context.
     *
     * returns {ComponentReference} a reference representing a compoent currently being rendered
     */
    protected componentReference(): ComponentReference;
    /**
     * Iterates thru ComponentMetadata @Inputs() and check if we have available binding inside the
     * 'this.bindings'
     */
    protected applyBindings(cRef: ComponentReference, component: ComponentRef<any>, bindings: Map<string, any>): void;
    /**
     * Resolves a component Type based on the string literal
     *
     * @returns component type used by `ComponentFactoryResolver`
     *
     * todo: rename the method so its clear that it returns component type based on string.
     */
    protected resolveComponentType(): any;
    protected resolveDirective(compFactory: ComponentFactory<any>): Component;
    ngOnDestroy(): void;
    private destroy();
}
