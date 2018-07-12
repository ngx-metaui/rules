/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { assert, isBlank, isPresent, MapWrapper } from '@aribaui/core';
import { StringComponent } from '../widgets/string/string.component';
import { ComponentRegistry } from './component-registry.service';
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
export class IncludeComponentDirective {
    /**
     * @param {?} viewContainer
     * @param {?} factoryResolver
     * @param {?} cd
     * @param {?} compRegistry
     */
    constructor(viewContainer, factoryResolver, cd, compRegistry) {
        this.viewContainer = viewContainer;
        this.factoryResolver = factoryResolver;
        this.cd = cd;
        this.compRegistry = compRegistry;
        /**
         * I use this flag to identify that component is rendering for first time or its updated during
         * change detection
         *
         */
        this.initRenderInProgress = false;
        /**
         * Not sure if we need this, but want to keep it here or maybe move it to some service so we
         * can cache created components and maybe reuse them.
         *
         */
        this.componentReferences = new Map();
        this.bindings = new Map();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initRenderInProgress = true;
        // todo: check if this the right lifecycle callback, this is called only once and you want
        // to probably listen for changes, and change dection decide there is some change and we
        // need to re-draw the view
        this.viewContainer.clear();
        this.doRenderComponent();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (isPresent(changes['name']) &&
            (changes['name'].currentValue !== changes['name'].previousValue)) {
            this.viewContainer.clear();
            this.doRenderComponent();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.initRenderInProgress = false;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // check to see if we need to render and reposition DOM element both for wrapper and
        // content
        this.createWrapperElementIfAny();
        this.createContentElementIfAny();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
    }
    /**
     * Handles a case where we need to resolve additional component and wrap the current one.
     * Just like reateContentElementIfAny() this method needs to be executed after all
     * is created and initialized (inside the ngAfterViewInit() )
     *
     * @return {?}
     */
    createWrapperElementIfAny() {
    }
    /**
     * Renders a component into actual View Container. The process goes as this.
     *  1. We retrieve component Type based on the component name, which creates componentRef
     *  2. Place the component onto the screen
     *  3. Read component metadata, mainly INPUTs and apply bindings for each of them
     *  4. Manually spin change detection to update the screen. Mainly for case where I need to
     * redraw a screen
     * @return {?}
     */
    doRenderComponent() {
        this.placeTheComponent();
        // this.currentComponent.changeDetectorRef.detach();
        this.applyBindings(this.componentReference(), this.currentComponent, this.bindings);
        // this.currentComponent.changeDetectorRef.detectChanges();
        // Still not sure about this what all I should release here.
        this.currentComponent.onDestroy(() => {
            // this.bindings.clear();
            // this.bindings = undefined;
            //
            // this.componentReferences.clear();
            // this.componentReferences = undefined;
            this.destroy();
        });
    }
    /**
     * Place actual component onto the screen using ViewContainerRef
     *
     * @return {?}
     */
    placeTheComponent() {
        let /** @type {?} */ reference = this.componentReference();
        this.currentComponent = this.viewContainer.createComponent(reference.resolvedCompFactory);
    }
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
     * @return {?} need to run detect changes ? default is false
     */
    createContentElementIfAny() {
        let /** @type {?} */ detectChanges = false;
        let /** @type {?} */ ngContent = this.ngContent();
        let /** @type {?} */ ngContentElement = this.ngContentElement();
        if (isPresent(ngContent)) {
            let /** @type {?} */ awContentComponent = this.factoryResolver.resolveComponentFactory(StringComponent);
            let /** @type {?} */ component = this.viewContainer.createComponent(awContentComponent, 0);
            (/** @type {?} */ (component.instance)).value = ngContent;
            let /** @type {?} */ awContentContainer = this.currentComponent.location.nativeElement.firstChild;
            awContentContainer.appendChild(component.location.nativeElement);
            detectChanges = true;
        }
        else if (isPresent(ngContentElement)) {
            // console.log('content Element: ', ngContentElement);
        }
        return detectChanges;
    }
    /**
     *
     * Retrieve a NG Content from binding list and remove it so it its not prepagated down when
     * applying other bindings.
     *
     * @return {?}
     */
    ngContent() {
        let /** @type {?} */ content;
        if (isPresent(content = this.bindings.get(IncludeComponentDirective.NgContent))) {
            this.bindings.delete(IncludeComponentDirective.NgContent);
        }
        return content;
    }
    /**
     * @return {?}
     */
    ngContentElement() {
        let /** @type {?} */ content;
        if (isPresent(content = this.bindings.get(IncludeComponentDirective.NgContentElement))) {
            this.bindings.delete(IncludeComponentDirective.NgContentElement);
        }
        return content;
    }
    /**
     * We need to convert a component name to actual a type and then use ComponentFactoryResolver
     * to instantiate a a component and save its information into our component references. The
     * reason why we have this component reference is we need to store Angular's component metadata
     * so we can iterate thru all the inputs and bind them to the context.
     *
     * returns {ComponentReference} a reference representing a compoent currently being rendered
     * @return {?}
     */
    componentReference() {
        if (isPresent(this.resolvedComponentRef)) {
            return this.resolvedComponentRef;
        }
        let /** @type {?} */ currType = this.resolveComponentType();
        let /** @type {?} */ componentFactory = this.factoryResolver
            .resolveComponentFactory(currType);
        let /** @type {?} */ componentMeta = this.resolveDirective(componentFactory);
        let /** @type {?} */ compReference = {
            metadata: componentMeta,
            resolvedCompFactory: componentFactory,
            componentType: currType,
            componentName: this.name
        };
        this.resolvedComponentRef = compReference;
        return compReference;
    }
    /**
     * Iterates thru ComponentMetadata \@Inputs() and check if we have available binding inside the
     * 'this.bindings'
     * @param {?} cRef
     * @param {?} component
     * @param {?} bindings
     * @return {?}
     */
    applyBindings(cRef, component, bindings) {
        let /** @type {?} */ inputs = cRef.metadata.inputs;
        if (isBlank(inputs) || inputs.length === 0) {
            return;
        }
        // should we do any type conversion?
        MapWrapper.iterable(bindings).forEach((v, k) => {
            if (isPresent(component.instance[k])) {
                component.instance[k] = v;
            }
        });
    }
    /**
     * Resolves a component Type based on the string literal
     *
     * @return {?} component type used by `ComponentFactoryResolver`
     *
     * todo: rename the method so its clear that it returns component type based on string.
     */
    resolveComponentType() {
        let /** @type {?} */ componentType = this.compRegistry.nameToType.get(this.name);
        if (isBlank(componentType)) {
            assert(false, this.name + ' component does not exists. Create Dummy Component instead' +
                ' of throwing this error');
            return;
        }
        return componentType;
    }
    /**
     * @param {?} compFactory
     * @return {?}
     */
    resolveDirective(compFactory) {
        let /** @type {?} */ compMeta = {
            inputs: [],
            outputs: []
        };
        if (isPresent(compFactory.inputs) && compFactory.inputs.length > 0) {
            compFactory.inputs.forEach((input) => {
                compMeta.inputs.push(input.propName);
            });
        }
        if (isPresent(compFactory.outputs) && compFactory.outputs.length > 0) {
            compFactory.outputs.forEach((output) => {
                compMeta.outputs.push(output.propName);
            });
        }
        return compMeta;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (isPresent(this.currentComponent)) {
            this.currentComponent.destroy();
            this.currentComponent = undefined;
        }
        if (isPresent(this.viewContainer)) {
            this.viewContainer.clear();
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        if (isPresent(this.currentComponent)) {
            this.currentComponent = null;
            this.resolvedComponentRef = null;
        }
    }
}
IncludeComponentDirective.NgContent = 'ngcontent';
IncludeComponentDirective.NgContentElement = 'ngcontentElement';
IncludeComponentDirective.decorators = [
    { type: Directive, args: [{
                selector: 'aw-include-component'
            },] },
];
/** @nocollapse */
IncludeComponentDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: ComponentRegistry }
];
IncludeComponentDirective.propDecorators = {
    name: [{ type: Input }],
    bindings: [{ type: Input }]
};
function IncludeComponentDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    IncludeComponentDirective.NgContent;
    /** @type {?} */
    IncludeComponentDirective.NgContentElement;
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
     * @type {?}
     */
    IncludeComponentDirective.prototype.name;
    /**
     * Provides bindings which will be passed into the component when instantiated
     * @type {?}
     */
    IncludeComponentDirective.prototype.bindings;
    /**
     * Current created component reference using ComponentFactoryResolver. We use this to access
     * the actual component instance and Element Reference
     * @type {?}
     */
    IncludeComponentDirective.prototype.currentComponent;
    /**
     * I use this flag to identify that component is rendering for first time or its updated during
     * change detection
     *
     * @type {?}
     */
    IncludeComponentDirective.prototype.initRenderInProgress;
    /**
     * Not sure if we need this, but want to keep it here or maybe move it to some service so we
     * can cache created components and maybe reuse them.
     *
     * @type {?}
     */
    IncludeComponentDirective.prototype.componentReferences;
    /**
     * Need to cache the resolved component reference so we dont call ComponentFactoryResolver
     * everything we want to refresh a screen
     * @type {?}
     */
    IncludeComponentDirective.prototype.resolvedComponentRef;
    /** @type {?} */
    IncludeComponentDirective.prototype.viewContainer;
    /** @type {?} */
    IncludeComponentDirective.prototype.factoryResolver;
    /** @type {?} */
    IncludeComponentDirective.prototype.cd;
    /** @type {?} */
    IncludeComponentDirective.prototype.compRegistry;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZS1jb21wb25lbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvaW5jbHVkZS1jb21wb25lbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUlILGlCQUFpQixFQUdqQix3QkFBd0IsRUFFeEIsU0FBUyxFQUNULEtBQUssRUFLTCxnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFFbkUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFFL0QsTUFBTTs7Ozs7OztJQXlERixZQUFtQixhQUErQixFQUMvQixpQkFDQSxJQUNBO1FBSEEsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLG9CQUFlLEdBQWYsZUFBZTtRQUNmLE9BQUUsR0FBRixFQUFFO1FBQ0YsaUJBQVksR0FBWixZQUFZOzs7Ozs7b0NBckJFLEtBQUs7Ozs7OzttQ0FRbEMsSUFBSSxHQUFHLEVBQThCO1FBZ0JyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7S0FDMUM7Ozs7SUFFRCxRQUFRO1FBR0osSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQzs7OztRQUlqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQzVCOzs7OztJQUdELFdBQVcsQ0FBQyxPQUFzQjtRQUU5QixFQUFFLENBQUMsQ0FBQyxT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QUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBpc0JsYW5rLCBpc1ByZXNlbnQsIE1hcFdyYXBwZXJ9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtTdHJpbmdDb21wb25lbnR9IGZyb20gJy4uL3dpZGdldHMvc3RyaW5nL3N0cmluZy5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21wb25lbnRSZWZlcmVuY2V9IGZyb20gJy4vY29tcG9uZW50LXJlZmVyZW5jZSc7XG5pbXBvcnQge0NvbXBvbmVudFJlZ2lzdHJ5fSBmcm9tICcuL2NvbXBvbmVudC1yZWdpc3RyeS5zZXJ2aWNlJztcblxuLyoqXG4gKiB0aGlzIGlzIHNwZWNpZmljIGltcG9ydCB0byB3ZSBjYW4gdXNlIGNvbXBvbmVudHMgYXMgY29tcG9uZW50c1t0eXBlbmFtZV0gYW5kICBnZXQgYmFjayBhXG4gKiB0eXBlLlxuICogSSBjb3VsZCBub3QgZmluZCBhbnkgYmV0dGVyIGR5bmFtaWMgd2F5IHVwIHRvIG5vd1xuICovXG4vKipcbiAqICBgSW5jbHVkZUNvbXBvbmVudGAgZGlyZWN0aXZlIGR5bmFtaWNhbGx5IGluc3RhbnRpYXRlIGFuZCBpbnNlcnQgYSBjb21wb25lbnRzIGludG8gdGhlIHNjcmVlblxuICogYmFzZWQgb24gdGhlIG5hbWUuIEl0IGNhbiBhY2NlcHRzIGJpbmRpbmdzIGFzIHdlbGwgd2hpY2ggd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGJvdW5kIGFuZCBhcHBsaWVkXG4gKiB0byB0aGUgY29tcG9uZW50XG4gKlxuICogICMjIyB1c2FnZTpcbiAqXG4gKiAgSW5zdGVhZCBvZiBpbnNlcnRpbmcgY29tcG9uZW50IGluIHRoZSB3YXk6XG4gKlxuICogIGBgYFxuICogICAgPHRleHRmaWVsZCB2YWx1ZT1cInNvbWUgdmFsdWVcIj5cbiAqXG4gKiAgYGBgXG4gKlxuICogIHlvdSBjYW4gZG8gc28gZHluYW1pY2FsbHkgbGlrZSB0aGlzOlxuICpcbiAqIGBgYFxuICogIDxhdy1pbmNsdWRlLWNvbXBvbmVudCAnVGV4dGZpZWxkQ29tcG9uZW50JyBbYmluZGluZ3NdPWJpbmRpbmdzID48L2F3LWluY2x1ZGUtY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogVGhpcyBpcyB0aGUgbWFpbiBidWlsZGluZyBibG9jayB0byBkeW5hbWljYWxseSBnZW5lcmF0ZWQgVUkuXG4gKlxuICpcbiAqIFRvZG86IEN1cnJlbnRseSB0aGUgd2F5IEFuZ3VsYXIgQVBJIHdvcmsgYW5kIHdlIHVzZSBpdCB0byBjcmVhdGUgcHJvZ3JhbWF0aWNhbGx5IGNvbXBvbmVudHNcbiAqIGlzIHRvbyBjb21wbGV4dCB3ZSBuZWVkIHRvIGNyZWF0ZSBldmVyeXRoaW5nIDMgZGlmZmVyZW50IGNhbGxzIHRvIHBsYWNlIGEgY29tcG9uZW50IHRvIHRoZVxuICogY29udGFpbmVyLiBXaGF0IEkgd2FudCBpcyBpcyB0byBjcmVhdGUgc29tZSBraW5kIG9mIHJlcHJlc2VudGF0aW9uIG9mIENvbnRhaW5lckVsZW1lbnQgYW5kIHRoaXNcbiAqIGNhbiBiZSBhbHNvIHBhcmVudCBmb3Igb3VyIEJhc2VDb21wb25lbnQgd2l0aCBtZXRob2QgYWRkIGFuZCByZW1vdmUgY29udGVudC4gVGhlbiB3ZSBjb3VsZCBoYXZlXG4gKiBzb21lIEFXQ29udGVudC5cbiAqXG4gKiBlLmcuOiB0byByZXBsYWNlIGFwcGx5Q29udGVudEVsZW1lbnRJZkFueSB3aGVyZSB3ZSBoYXZlIHNldmVyYWwgY2FsbHMgdG8gY3JlYXRlIGFuZCBhZGRcbiAqIGNvbXBvbmVudCB0byB0aGUgdmlldy5cbiAqXG4gKiBgYGB0c1xuICogIGxldCBjb250YWluZXJFbGVtZW50ID0gQVdDb25jcmV0ZVRlbXBsYXRlKHZpZXdDb250YWluZXIsIGZhY3RvcnlSZXNvbHZlcilcbiAqICBjb250YWluZXJFbGVtZW50LmFkZCgnQ2xjayBNZScpXG4gKiBgYGBcbiAqXG4gKiBUbyBhc3NlbWJsZSBkaWZmZXJlbnQgY29tcG9uZW50cyB0b2dldGhlciAtIG5vdCBvbmx5IGFkZGluZyBzdHJpbmcgY29udGVudFxuICpcbiAqIGBgYHRzXG4gKiAgbGV0IGNvbnRlbnQgPSBuZXcgQVdDb250ZW50KEJ1dHRvbkNvbXBvbmVudCwgYmluZGluZ3NNYXApXG4gKiAgY29udGVudC5hZGQoJ0NsaWNrIE1lJyk7XG4gKiAgY29udGFpbmVyRWxlbWVudC5hZGQoY29udGVudClcbiAqXG4gKiBgYGBcbiAqXG4gKiBhZGQgbW9yZSBjb21wb25lbnQgaGllcmFyY2h5OlxuICpcbiAqIGBgYHRzXG4gKiAgbGV0IGNvbnRlbnQgPSBuZXcgQVdDb250ZW50KEhvdmVyQ2FyZENvbXBvbm5ldHMsIGJpbmRpbmdzTWFwKVxuICogIGNvbnRlbnQuYWRkKGNyZWF0ZUxheW91dCgpO1xuICogIGNvbnRhaW5lckVsZW1lbnQuYWRkKGNvbnRlbnQpXG4gKlxuICogYGBgXG4gKlxuICpcbiAqXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2F3LWluY2x1ZGUtY29tcG9uZW50J1xufSlcbmV4cG9ydCBjbGFzcyBJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0XG57XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgTmdDb250ZW50ID0gJ25nY29udGVudCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IE5nQ29udGVudEVsZW1lbnQgPSAnbmdjb250ZW50RWxlbWVudCc7XG5cbiAgICAvKipcbiAgICAgKiBGdWxsIGNvbXBvbmVudCBuYW1lIGUuZy46IERyb3Bkb3duQ29tcG9uZW50IHdoaWNoIGlzIGdvaW5nIHRvIGJlIGluc2VydGVkLiBXZSBuZWVkIHRvIHRha2VcbiAgICAgKiB0aGlzIG5hbWUgYW5kIHRyYW5zbGF0ZSBpdCBpbnRvIGFjdHVhbCBUWVBFLiBJbiBvcmRlciB0byBkbyB0aGlzIHdlIHVzZSBhIHRyaWNrIHdoZXJlIHdlXG4gICAgICogYWNjZXNzIGFuIElNUE9SVEVEIGNvbXBvbmVudHMuXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBpbXBvcnQgKiBhcyBjb21wb25lbnRzIGZyb20gJy4uL2NvbXBvbmVudHMnO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogVGhlbiB5b3UgY2FuIHJldHJpZXZlIGEgdHlwZSBieSBqdXN0IGNvbXBvbmVudHNbPFN0cmluZyBMaXRlcmFsID5dID0+IENvbXBvbmVudCBUWVBFXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHByb3RlY3RlZCBuYW1lOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBiaW5kaW5ncyB3aGljaCB3aWxsIGJlIHBhc3NlZCBpbnRvIHRoZSBjb21wb25lbnQgd2hlbiBpbnN0YW50aWF0ZWRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHByb3RlY3RlZCBiaW5kaW5nczogTWFwPHN0cmluZywgYW55PjtcblxuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgY3JlYXRlZCBjb21wb25lbnQgcmVmZXJlbmNlIHVzaW5nIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlci4gV2UgdXNlIHRoaXMgdG8gYWNjZXNzXG4gICAgICogdGhlIGFjdHVhbCBjb21wb25lbnQgaW5zdGFuY2UgYW5kIEVsZW1lbnQgUmVmZXJlbmNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogSSB1c2UgdGhpcyBmbGFnIHRvIGlkZW50aWZ5IHRoYXQgY29tcG9uZW50IGlzIHJlbmRlcmluZyBmb3IgZmlyc3QgdGltZSBvciBpdHMgdXBkYXRlZCBkdXJpbmdcbiAgICAgKiBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdFJlbmRlckluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIE5vdCBzdXJlIGlmIHdlIG5lZWQgdGhpcywgYnV0IHdhbnQgdG8ga2VlcCBpdCBoZXJlIG9yIG1heWJlIG1vdmUgaXQgdG8gc29tZSBzZXJ2aWNlIHNvIHdlXG4gICAgICogY2FuIGNhY2hlIGNyZWF0ZWQgY29tcG9uZW50cyBhbmQgbWF5YmUgcmV1c2UgdGhlbS5cbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjb21wb25lbnRSZWZlcmVuY2VzOiBNYXA8c3RyaW5nLCBDb21wb25lbnRSZWZlcmVuY2U+ID1cbiAgICAgICAgbmV3IE1hcDxzdHJpbmcsIENvbXBvbmVudFJlZmVyZW5jZT4oKTtcblxuXG4gICAgLyoqXG4gICAgICogTmVlZCB0byBjYWNoZSB0aGUgcmVzb2x2ZWQgY29tcG9uZW50IHJlZmVyZW5jZSBzbyB3ZSBkb250IGNhbGwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICogZXZlcnl0aGluZyB3ZSB3YW50IHRvIHJlZnJlc2ggYSBzY3JlZW5cbiAgICAgKi9cbiAgICByZXNvbHZlZENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmZXJlbmNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwdWJsaWMgZmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwdWJsaWMgY29tcFJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSlcbiAgICB7XG5cbiAgICAgICAgdGhpcy5iaW5kaW5ncyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcblxuICAgICAgICB0aGlzLmluaXRSZW5kZXJJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgLy8gdG9kbzogY2hlY2sgaWYgdGhpcyB0aGUgcmlnaHQgbGlmZWN5Y2xlIGNhbGxiYWNrLCB0aGlzIGlzIGNhbGxlZCBvbmx5IG9uY2UgYW5kIHlvdSB3YW50XG4gICAgICAgIC8vIHRvIHByb2JhYmx5IGxpc3RlbiBmb3IgY2hhbmdlcywgYW5kIGNoYW5nZSBkZWN0aW9uIGRlY2lkZSB0aGVyZSBpcyBzb21lIGNoYW5nZSBhbmQgd2VcbiAgICAgICAgLy8gbmVlZCB0byByZS1kcmF3IHRoZSB2aWV3XG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICB0aGlzLmRvUmVuZGVyQ29tcG9uZW50KCk7XG4gICAgfVxuXG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjaGFuZ2VzWyduYW1lJ10pICYmXG4gICAgICAgICAgICAoY2hhbmdlc1snbmFtZSddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snbmFtZSddLnByZXZpb3VzVmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9SZW5kZXJDb21wb25lbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuaW5pdFJlbmRlckluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgd2UgbmVlZCB0byByZW5kZXIgYW5kIHJlcG9zaXRpb24gRE9NIGVsZW1lbnQgYm90aCBmb3Igd3JhcHBlciBhbmRcbiAgICAgICAgLy8gY29udGVudFxuICAgICAgICB0aGlzLmNyZWF0ZVdyYXBwZXJFbGVtZW50SWZBbnkoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVDb250ZW50RWxlbWVudElmQW55KCk7XG4gICAgfVxuXG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZFxuICAgIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGEgY2FzZSB3aGVyZSB3ZSBuZWVkIHRvIHJlc29sdmUgYWRkaXRpb25hbCBjb21wb25lbnQgYW5kIHdyYXAgdGhlIGN1cnJlbnQgb25lLlxuICAgICAqIEp1c3QgbGlrZSByZWF0ZUNvbnRlbnRFbGVtZW50SWZBbnkoKSB0aGlzIG1ldGhvZCBuZWVkcyB0byBiZSBleGVjdXRlZCBhZnRlciBhbGxcbiAgICAgKiBpcyBjcmVhdGVkIGFuZCBpbml0aWFsaXplZCAoaW5zaWRlIHRoZSBuZ0FmdGVyVmlld0luaXQoKSApXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY3JlYXRlV3JhcHBlckVsZW1lbnRJZkFueSgpOiB2b2lkXG4gICAge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBjb21wb25lbnQgaW50byBhY3R1YWwgVmlldyBDb250YWluZXIuIFRoZSBwcm9jZXNzIGdvZXMgYXMgdGhpcy5cbiAgICAgKiAgMS4gV2UgcmV0cmlldmUgY29tcG9uZW50IFR5cGUgYmFzZWQgb24gdGhlIGNvbXBvbmVudCBuYW1lLCB3aGljaCBjcmVhdGVzIGNvbXBvbmVudFJlZlxuICAgICAqICAyLiBQbGFjZSB0aGUgY29tcG9uZW50IG9udG8gdGhlIHNjcmVlblxuICAgICAqICAzLiBSZWFkIGNvbXBvbmVudCBtZXRhZGF0YSwgbWFpbmx5IElOUFVUcyBhbmQgYXBwbHkgYmluZGluZ3MgZm9yIGVhY2ggb2YgdGhlbVxuICAgICAqICA0LiBNYW51YWxseSBzcGluIGNoYW5nZSBkZXRlY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4uIE1haW5seSBmb3IgY2FzZSB3aGVyZSBJIG5lZWQgdG9cbiAgICAgKiByZWRyYXcgYSBzY3JlZW5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZG9SZW5kZXJDb21wb25lbnQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5wbGFjZVRoZUNvbXBvbmVudCgpO1xuICAgICAgICAvLyB0aGlzLmN1cnJlbnRDb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0YWNoKCk7XG5cbiAgICAgICAgdGhpcy5hcHBseUJpbmRpbmdzKHRoaXMuY29tcG9uZW50UmVmZXJlbmNlKCksIHRoaXMuY3VycmVudENvbXBvbmVudCwgdGhpcy5iaW5kaW5ncyk7XG4gICAgICAgIC8vIHRoaXMuY3VycmVudENvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgLy8gU3RpbGwgbm90IHN1cmUgYWJvdXQgdGhpcyB3aGF0IGFsbCBJIHNob3VsZCByZWxlYXNlIGhlcmUuXG4gICAgICAgIHRoaXMuY3VycmVudENvbXBvbmVudC5vbkRlc3Ryb3koKCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgLy8gdGhpcy5iaW5kaW5ncy5jbGVhcigpO1xuICAgICAgICAgICAgLy8gdGhpcy5iaW5kaW5ncyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB0aGlzLmNvbXBvbmVudFJlZmVyZW5jZXMuY2xlYXIoKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY29tcG9uZW50UmVmZXJlbmNlcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUGxhY2UgYWN0dWFsIGNvbXBvbmVudCBvbnRvIHRoZSBzY3JlZW4gdXNpbmcgVmlld0NvbnRhaW5lclJlZlxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHBsYWNlVGhlQ29tcG9uZW50KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCByZWZlcmVuY2UgPSB0aGlzLmNvbXBvbmVudFJlZmVyZW5jZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRDb21wb25lbnQgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KHJlZmVyZW5jZS5yZXNvbHZlZENvbXBGYWN0b3J5KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gaW5zZXJ0aW5nIENvbXBvbmVudCB0aGF0IG5lZWRzIHRvIGhhdmUgYSBjb250ZW50IGxpa2UgZS5nLiBoeXBlcmxpbmsgb3IgYnV0dG9uXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgIDxidXR0b24+IE1ZIE5HIENPTlRFTlQgPC9idXR0b24+XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgdGhpcyBtZXRob2QgYXBwbGllcyBhbmQgaW5zZXJ0IGEgY2hpbGQgY29udGVudCBpbnRvIHRoZSBtYWluIGNvbXBvbmVudC4gVGhpcyBtZXRob2QgaW5zZXJ0XG4gICAgICogYSBzaW1wbGUgc3RyaW5nLiBXZSBhcmUgbm90IHdyYXBwaW5nIGV4aXN0aW5nIGNvbXBvbmVudCB3aXRoIGFub3RoZXIgY29tcG9uZW50IGhlcmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIG5lZWQgdG8gcnVuIGRldGVjdCBjaGFuZ2VzID8gZGVmYXVsdCBpcyBmYWxzZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjcmVhdGVDb250ZW50RWxlbWVudElmQW55KCk6IGJvb2xlYW5cbiAgICB7XG5cbiAgICAgICAgbGV0IGRldGVjdENoYW5nZXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5nQ29udGVudCA9IHRoaXMubmdDb250ZW50KCk7XG4gICAgICAgIGxldCBuZ0NvbnRlbnRFbGVtZW50ID0gdGhpcy5uZ0NvbnRlbnRFbGVtZW50KCk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQobmdDb250ZW50KSkge1xuICAgICAgICAgICAgbGV0IGF3Q29udGVudENvbXBvbmVudCA9IHRoaXMuZmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFN0cmluZ0NvbXBvbmVudCk7XG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChhd0NvbnRlbnRDb21wb25lbnQsIDApO1xuXG4gICAgICAgICAgICAoPFN0cmluZ0NvbXBvbmVudD5jb21wb25lbnQuaW5zdGFuY2UpLnZhbHVlID0gbmdDb250ZW50O1xuICAgICAgICAgICAgbGV0IGF3Q29udGVudENvbnRhaW5lciA9IHRoaXMuY3VycmVudENvbXBvbmVudC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICBhd0NvbnRlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcG9uZW50LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICBkZXRlY3RDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobmdDb250ZW50RWxlbWVudCkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb250ZW50IEVsZW1lbnQ6ICcsIG5nQ29udGVudEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRldGVjdENoYW5nZXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHJpZXZlIGEgTkcgQ29udGVudCBmcm9tIGJpbmRpbmcgbGlzdCBhbmQgcmVtb3ZlIGl0IHNvIGl0IGl0cyBub3QgcHJlcGFnYXRlZCBkb3duIHdoZW5cbiAgICAgKiBhcHBseWluZyBvdGhlciBiaW5kaW5ncy5cbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBuZ0NvbnRlbnQoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgY29udGVudDogYW55O1xuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbnRlbnQgPSB0aGlzLmJpbmRpbmdzLmdldChJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudCkpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzLmRlbGV0ZShJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgbmdDb250ZW50RWxlbWVudCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBjb250ZW50OiBhbnk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29udGVudCA9IHRoaXMuYmluZGluZ3MuZ2V0KEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50RWxlbWVudCkpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzLmRlbGV0ZShJbmNsdWRlQ29tcG9uZW50RGlyZWN0aXZlLk5nQ29udGVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIG5lZWQgdG8gY29udmVydCBhIGNvbXBvbmVudCBuYW1lIHRvIGFjdHVhbCBhIHR5cGUgYW5kIHRoZW4gdXNlIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICAgICAqIHRvIGluc3RhbnRpYXRlIGEgYSBjb21wb25lbnQgYW5kIHNhdmUgaXRzIGluZm9ybWF0aW9uIGludG8gb3VyIGNvbXBvbmVudCByZWZlcmVuY2VzLiBUaGVcbiAgICAgKiByZWFzb24gd2h5IHdlIGhhdmUgdGhpcyBjb21wb25lbnQgcmVmZXJlbmNlIGlzIHdlIG5lZWQgdG8gc3RvcmUgQW5ndWxhcidzIGNvbXBvbmVudCBtZXRhZGF0YVxuICAgICAqIHNvIHdlIGNhbiBpdGVyYXRlIHRocnUgYWxsIHRoZSBpbnB1dHMgYW5kIGJpbmQgdGhlbSB0byB0aGUgY29udGV4dC5cbiAgICAgKlxuICAgICAqIHJldHVybnMge0NvbXBvbmVudFJlZmVyZW5jZX0gYSByZWZlcmVuY2UgcmVwcmVzZW50aW5nIGEgY29tcG9lbnQgY3VycmVudGx5IGJlaW5nIHJlbmRlcmVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudFJlZmVyZW5jZSgpOiBDb21wb25lbnRSZWZlcmVuY2VcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5yZXNvbHZlZENvbXBvbmVudFJlZikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVkQ29tcG9uZW50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJyVHlwZSA9IHRoaXMucmVzb2x2ZUNvbXBvbmVudFR5cGUoKTtcbiAgICAgICAgbGV0IGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMuZmFjdG9yeVJlc29sdmVyXG4gICAgICAgICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY3VyclR5cGUpO1xuXG4gICAgICAgIGxldCBjb21wb25lbnRNZXRhOiBDb21wb25lbnQgPSB0aGlzLnJlc29sdmVEaXJlY3RpdmUoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICAgIGxldCBjb21wUmVmZXJlbmNlOiBDb21wb25lbnRSZWZlcmVuY2UgPSB7XG4gICAgICAgICAgICBtZXRhZGF0YTogY29tcG9uZW50TWV0YSxcbiAgICAgICAgICAgIHJlc29sdmVkQ29tcEZhY3Rvcnk6IGNvbXBvbmVudEZhY3RvcnksXG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiBjdXJyVHlwZSxcbiAgICAgICAgICAgIGNvbXBvbmVudE5hbWU6IHRoaXMubmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVzb2x2ZWRDb21wb25lbnRSZWYgPSBjb21wUmVmZXJlbmNlO1xuICAgICAgICByZXR1cm4gY29tcFJlZmVyZW5jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyB0aHJ1IENvbXBvbmVudE1ldGFkYXRhIEBJbnB1dHMoKSBhbmQgY2hlY2sgaWYgd2UgaGF2ZSBhdmFpbGFibGUgYmluZGluZyBpbnNpZGUgdGhlXG4gICAgICogJ3RoaXMuYmluZGluZ3MnXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFwcGx5QmluZGluZ3MoY1JlZjogQ29tcG9uZW50UmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZGluZ3M6IE1hcDxzdHJpbmcsIGFueT4pOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgaW5wdXRzOiBzdHJpbmdbXSA9IGNSZWYubWV0YWRhdGEuaW5wdXRzO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKGlucHV0cykgfHwgaW5wdXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNob3VsZCB3ZSBkbyBhbnkgdHlwZSBjb252ZXJzaW9uP1xuICAgICAgICBNYXBXcmFwcGVyLml0ZXJhYmxlKGJpbmRpbmdzKS5mb3JFYWNoKCh2LCBrKSA9PlxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoY29tcG9uZW50Lmluc3RhbmNlW2tdKSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVtrXSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZXMgYSBjb21wb25lbnQgVHlwZSBiYXNlZCBvbiB0aGUgc3RyaW5nIGxpdGVyYWxcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGNvbXBvbmVudCB0eXBlIHVzZWQgYnkgYENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcmBcbiAgICAgKlxuICAgICAqIHRvZG86IHJlbmFtZSB0aGUgbWV0aG9kIHNvIGl0cyBjbGVhciB0aGF0IGl0IHJldHVybnMgY29tcG9uZW50IHR5cGUgYmFzZWQgb24gc3RyaW5nLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCByZXNvbHZlQ29tcG9uZW50VHlwZSgpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBjb21wb25lbnRUeXBlID0gdGhpcy5jb21wUmVnaXN0cnkubmFtZVRvVHlwZS5nZXQodGhpcy5uYW1lKTtcblxuICAgICAgICBpZiAoaXNCbGFuayhjb21wb25lbnRUeXBlKSkge1xuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCB0aGlzLm5hbWUgKyAnIGNvbXBvbmVudCBkb2VzIG5vdCBleGlzdHMuIENyZWF0ZSBEdW1teSBDb21wb25lbnQgaW5zdGVhZCcgK1xuICAgICAgICAgICAgICAgICcgb2YgdGhyb3dpbmcgdGhpcyBlcnJvcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRUeXBlO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIHJlc29sdmVEaXJlY3RpdmUoY29tcEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55Pik6IENvbXBvbmVudFxuICAgIHtcbiAgICAgICAgbGV0IGNvbXBNZXRhOiBDb21wb25lbnQgPSB7XG4gICAgICAgICAgICBpbnB1dHM6IFtdLFxuICAgICAgICAgICAgb3V0cHV0czogW11cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbXBGYWN0b3J5LmlucHV0cykgJiYgY29tcEZhY3RvcnkuaW5wdXRzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgY29tcEZhY3RvcnkuaW5wdXRzLmZvckVhY2goKGlucHV0OiB7cHJvcE5hbWU6IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmd9KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbXBNZXRhLmlucHV0cy5wdXNoKGlucHV0LnByb3BOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChjb21wRmFjdG9yeS5vdXRwdXRzKSAmJiBjb21wRmFjdG9yeS5vdXRwdXRzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgY29tcEZhY3Rvcnkub3V0cHV0cy5mb3JFYWNoKChvdXRwdXQ6IHtwcm9wTmFtZTogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZ30pID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29tcE1ldGEub3V0cHV0cy5wdXNoKG91dHB1dC5wcm9wTmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcE1ldGE7XG4gICAgfVxuXG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY3VycmVudENvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDb21wb25lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMudmlld0NvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmN1cnJlbnRDb21wb25lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRDb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlZENvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=