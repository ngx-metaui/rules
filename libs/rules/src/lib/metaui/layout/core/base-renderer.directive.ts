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

import {
  AfterViewInit,
  ChangeDetectorRef,
  Compiler,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Injector,
  NgModuleRef,
  OnDestroy,
  OnInit,
  Renderer2,
  Type,
  ViewContainerRef
} from '@angular/core';
import {assert, isBlank, isPresent} from '../../core/utils/lang';
import {ComponentRegistry} from '../../core/component-registry.service';

export const NgContent = 'ngcontent';
export const NgContentElement = 'ngcontentElement';

/**
 * Used by MetaUI to dynamically dynamically instantiate and insert component into the view.
 */
export interface ComponentReference {
  /**
   * Metadata about the instantiated component.
   *
   * Note: before this one was called ComponentMetadata, but in Angular 2.0 final it was renamed
   * to Component
   */
  metadata?: Component;

  /**
   * Component factory created by
   *
   * ```
   *  factoryResolver.resolveComponentFactory(<TYPE>)
   * ```
   *  We do not really need it now, but once we start caching created components it will more
   * more sense.
   *
   */
  resolvedCompFactory?: ComponentFactory<any>;

  /**
   * Resolved Component TYPE
   */
  componentOrModuleType?: Type<any>;

  /**
   * String representation of componnent being rendered
   */
  componentOrModuleName?: string;

  /**
   * Refers a module definition in case we are instantiating component from module
   */
  moduleRef?: ModuleReference;
}

export interface ModuleReference {
  module: NgModuleRef<any>;
  componentFactory: ComponentFactory<any>;
}

/**
 * Todo: Currently the way Angular API works
 *
 * Is too complex and there is no abstraction for element manipulation as we need to do  3
 * different calls to place a component to the container. What we want is to create some kind
 * of representation of ContainerElement with method add and remove content.
 *
 */
@Directive({})
export abstract class BaseRenderer implements OnDestroy, OnInit, AfterViewInit {

  /**
   * Current created component reference using ComponentFactoryResolver. We use this to access
   * the actual component instance and Element Reference
   */
  currentComponent: ComponentRef<any>;
  /**
   * Need to cache the resolved component reference so we dont call ComponentFactoryResolver
   * everything we want to refresh a screen
   */
  componentReference: ComponentReference;

  constructor(public viewContainer: ViewContainerRef,
              public componentFactoryResolver: ComponentFactoryResolver,
              public cd: ChangeDetectorRef,
              public compRegistry: ComponentRegistry,
              public renderer: Renderer2,
              protected _compiler: Compiler,
              public injector: Injector) {

  }

  public get component(): any {
    return this.currentComponent.instance;
  }

  ngOnInit(): void {
    this.viewContainer.clear();
  }


  ngAfterViewInit(): void {
  }


  ngOnDestroy(): void {
    if (this.currentComponent) {
      this.currentComponent.destroy();
      this.currentComponent = undefined;
    }

    if (this.viewContainer) {
      this.viewContainer.clear();
    }
  }

  doRender(): void {
    const reference = this._currentComponentReference();
    const bindings: Map<string, any> = this._bindingsForNewReference(reference);

    const contentElement = this._createContentElement(bindings);
    this.currentComponent = this._createElement(reference, bindings, contentElement);
  }

  _currentComponentReference(): ComponentReference {
    // if (isPresent(this.componentReference)) {
    //   return this.componentReference;
    // }
    return this._initComponentReference();
  }

  _initComponentReference(): ComponentReference {
    let reference = this._lookupComponentReference();
    if (isBlank(reference)) {
      const componentName = this._componentName();
      const componentModuleName = this._componentModuleName();
      this.assertEmptyComponentName(componentName, componentModuleName);
      reference = this._createComponentReference(componentName, componentModuleName);
      this._storeComponentReference(componentName || componentModuleName, reference);
    }
    return reference;
  }

  _lookupComponentReference(): ComponentReference {
    const componentName = this._componentName();
    const componentModuleName = this._componentModuleName();
    this.assertEmptyComponentName(componentName, componentModuleName);

    if (isPresent(componentName) && this.compRegistry.componentCache.has(componentName)) {
      return this.compRegistry.componentCache.get(componentName);
    }

    if (isPresent(componentModuleName) &&
      this.compRegistry.componentCache.has(componentModuleName)) {
      return this.compRegistry.componentCache.get(componentModuleName);
    }
  }

  /**
   * We need to convert a component name to actual a type and then use ComponentFactoryResolver
   * to instantiate a a component and save its information into our component references.
   */
  protected _createComponentReference(componentName: string,
                                      componentModuleName?: string): ComponentReference {
    const ref: ComponentReference = {};

    if (componentModuleName) {
      ref.componentOrModuleName = componentModuleName;
      ref.componentOrModuleType = this.compRegistry.nameToType.get(componentModuleName);
      const moduleReference = this.resolveModule(ref.componentOrModuleType);
      ref.resolvedCompFactory = moduleReference.componentFactory;
      ref.moduleRef = moduleReference;

    } else {
      ref.componentOrModuleType = this.compRegistry.nameToType.get(componentName);
      ref.resolvedCompFactory = this.componentFactoryResolver
        .resolveComponentFactory(ref.componentOrModuleType);
    }
    ref.metadata = this.resolveDirective(ref.resolvedCompFactory);


    return ref;
  }

  protected _storeComponentReference(name: string, reference: ComponentReference): void {
    this.compRegistry.componentCache.set(name, reference);
  }


  protected assertEmptyComponentName(name: string, module: string): void {
    assert(isPresent(name) || isPresent(module), `${name} component does not exists.`);
  }

  protected _bindingsForNewReference(reference: ComponentReference,
                                     isWrapper: boolean = false): Map<string, any> {
    const inputs: string[] = reference.metadata.inputs;
    const bindings = new Map<string, any>();

    if (isBlank(inputs) || inputs.length === 0) {
      return;
    }
    for (const input of inputs) {
      if (this.hasBindingValue(input, isWrapper)) {
        bindings.set(input, this._bindingValue(input, isWrapper));
      }
    }
    return bindings;
  }

  protected _createContentElement(bindings: Map<string, any>): any {
    const ngContent = bindings.get(NgContent);
    if (isPresent(ngContent)) {
      bindings.delete(NgContent);
      return this.renderer.createText(ngContent);
    }
    return null;
  }

  protected _createElement(reference: ComponentReference,
                           bindings: Map<string, any>,
                           contentElement?: any, index: number = 0): ComponentRef<any> {

    const content = contentElement ? [[contentElement]] : undefined;
    const componentRef = this.viewContainer.createComponent(reference.resolvedCompFactory,
      null, this.injector, content, reference.moduleRef?.module);
    this.applyBindings(reference, componentRef, bindings, reference.metadata.outputs);

    componentRef.onDestroy(() => {
      this.destroy();
    });
    return componentRef;
  }

  protected applyBindings(reference: ComponentReference, component: ComponentRef<any>,
                          inputBindings: Map<string, any>,
                          outputBindings: Array<string>,
                          isWrapper: boolean = false): void {
    inputBindings.forEach((v, k) => {
      component.instance[k] = v;
    });
  }

  protected abstract _componentName(name?: string): string;

  protected abstract _componentModuleName(name?: string): string;

  protected abstract _bindingValue(name: string, isWrapper?: boolean): any;

  protected abstract hasBindingValue(name: string, isWrapper: boolean): boolean;

  protected destroy(): void {
    // if (isPresent(this.currentComponent)) {
    //   this.currentComponent = null;
    //   this.componentReference = null;
    // }
  }

  protected setIfChanged(comp: any, field: string, newVal: any): void {
    if (comp[field] !== newVal) {
      comp[field] = newVal;
    }
  }

  private resolveModule(moduleType: Type<any>): ModuleReference {
    const module = this._compiler.compileModuleAndAllComponentsSync(moduleType);
    const moduleNgModuleRef = module.ngModuleFactory.create(this.injector);
    const componentFactory = module.componentFactories[0];

    return {
      module: moduleNgModuleRef,
      componentFactory: componentFactory
    };
  }

  private resolveDirective(compFactory: ComponentFactory<any>): Component {
    const compMeta: Component = {
      inputs: [],
      outputs: []
    };

    if (isPresent(compFactory.inputs) && compFactory.inputs.length > 0) {
      compFactory.inputs.forEach((input: { propName: string, templateName: string }) => {
        compMeta.inputs.push(input.propName);
      });
    }

    if (isPresent(compFactory.outputs) && compFactory.outputs.length > 0) {
      compFactory.outputs.forEach((output: { propName: string, templateName: string }) => {
        compMeta.outputs.push(output.propName);
      });
    }
    return compMeta;
  }

}
