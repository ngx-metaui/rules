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
var IncludeComponentDirective = /** @class */ (function () {
    function IncludeComponentDirective(viewContainer, factoryResolver, cd, compRegistry) {
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
    IncludeComponentDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initRenderInProgress = true;
        // todo: check if this the right lifecycle callback, this is called only once and you want
        // to probably listen for changes, and change dection decide there is some change and we
        // need to re-draw the view
        this.viewContainer.clear();
        this.doRenderComponent();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    IncludeComponentDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (isPresent(changes['name']) &&
            (changes['name'].currentValue !== changes['name'].previousValue)) {
            this.viewContainer.clear();
            this.doRenderComponent();
        }
    };
    /**
     * @return {?}
     */
    IncludeComponentDirective.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this.initRenderInProgress = false;
    };
    /**
     * @return {?}
     */
    IncludeComponentDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // check to see if we need to render and reposition DOM element both for wrapper and
        // content
        this.createWrapperElementIfAny();
        this.createContentElementIfAny();
    };
    /**
     * @return {?}
     */
    IncludeComponentDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * Handles a case where we need to resolve additional component and wrap the current one.
     * Just like reateContentElementIfAny() this method needs to be executed after all
     * is created and initialized (inside the ngAfterViewInit() )
     *
     */
    /**
     * Handles a case where we need to resolve additional component and wrap the current one.
     * Just like reateContentElementIfAny() this method needs to be executed after all
     * is created and initialized (inside the ngAfterViewInit() )
     *
     * @return {?}
     */
    IncludeComponentDirective.prototype.createWrapperElementIfAny = /**
     * Handles a case where we need to resolve additional component and wrap the current one.
     * Just like reateContentElementIfAny() this method needs to be executed after all
     * is created and initialized (inside the ngAfterViewInit() )
     *
     * @return {?}
     */
    function () {
    };
    /**
     * Renders a component into actual View Container. The process goes as this.
     *  1. We retrieve component Type based on the component name, which creates componentRef
     *  2. Place the component onto the screen
     *  3. Read component metadata, mainly INPUTs and apply bindings for each of them
     *  4. Manually spin change detection to update the screen. Mainly for case where I need to
     * redraw a screen
     */
    /**
     * Renders a component into actual View Container. The process goes as this.
     *  1. We retrieve component Type based on the component name, which creates componentRef
     *  2. Place the component onto the screen
     *  3. Read component metadata, mainly INPUTs and apply bindings for each of them
     *  4. Manually spin change detection to update the screen. Mainly for case where I need to
     * redraw a screen
     * @return {?}
     */
    IncludeComponentDirective.prototype.doRenderComponent = /**
     * Renders a component into actual View Container. The process goes as this.
     *  1. We retrieve component Type based on the component name, which creates componentRef
     *  2. Place the component onto the screen
     *  3. Read component metadata, mainly INPUTs and apply bindings for each of them
     *  4. Manually spin change detection to update the screen. Mainly for case where I need to
     * redraw a screen
     * @return {?}
     */
    function () {
        var _this = this;
        this.placeTheComponent();
        // this.currentComponent.changeDetectorRef.detach();
        this.applyBindings(this.componentReference(), this.currentComponent, this.bindings);
        // this.currentComponent.changeDetectorRef.detectChanges();
        // Still not sure about this what all I should release here.
        this.currentComponent.onDestroy(function () {
            // this.bindings.clear();
            // this.bindings = undefined;
            //
            // this.componentReferences.clear();
            // this.componentReferences = undefined;
            // this.bindings.clear();
            // this.bindings = undefined;
            //
            // this.componentReferences.clear();
            // this.componentReferences = undefined;
            _this.destroy();
        });
    };
    /**
     * Place actual component onto the screen using ViewContainerRef
     *
     */
    /**
     * Place actual component onto the screen using ViewContainerRef
     *
     * @return {?}
     */
    IncludeComponentDirective.prototype.placeTheComponent = /**
     * Place actual component onto the screen using ViewContainerRef
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ reference = this.componentReference();
        this.currentComponent = this.viewContainer.createComponent(reference.resolvedCompFactory);
    };
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
    IncludeComponentDirective.prototype.createContentElementIfAny = /**
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
    function () {
        var /** @type {?} */ detectChanges = false;
        var /** @type {?} */ ngContent = this.ngContent();
        var /** @type {?} */ ngContentElement = this.ngContentElement();
        if (isPresent(ngContent)) {
            var /** @type {?} */ awContentComponent = this.factoryResolver.resolveComponentFactory(StringComponent);
            var /** @type {?} */ component = this.viewContainer.createComponent(awContentComponent, 0);
            (/** @type {?} */ (component.instance)).value = ngContent;
            var /** @type {?} */ awContentContainer = this.currentComponent.location.nativeElement.firstChild;
            awContentContainer.appendChild(component.location.nativeElement);
            detectChanges = true;
        }
        else if (isPresent(ngContentElement)) {
            // console.log('content Element: ', ngContentElement);
        }
        return detectChanges;
    };
    /**
     *
     * Retrieve a NG Content from binding list and remove it so it its not prepagated down when
     * applying other bindings.
     *
     */
    /**
     *
     * Retrieve a NG Content from binding list and remove it so it its not prepagated down when
     * applying other bindings.
     *
     * @return {?}
     */
    IncludeComponentDirective.prototype.ngContent = /**
     *
     * Retrieve a NG Content from binding list and remove it so it its not prepagated down when
     * applying other bindings.
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ content;
        if (isPresent(content = this.bindings.get(IncludeComponentDirective.NgContent))) {
            this.bindings.delete(IncludeComponentDirective.NgContent);
        }
        return content;
    };
    /**
     * @return {?}
     */
    IncludeComponentDirective.prototype.ngContentElement = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ content;
        if (isPresent(content = this.bindings.get(IncludeComponentDirective.NgContentElement))) {
            this.bindings.delete(IncludeComponentDirective.NgContentElement);
        }
        return content;
    };
    /**
     * We need to convert a component name to actual a type and then use ComponentFactoryResolver
     * to instantiate a a component and save its information into our component references. The
     * reason why we have this component reference is we need to store Angular's component metadata
     * so we can iterate thru all the inputs and bind them to the context.
     *
     * returns {ComponentReference} a reference representing a compoent currently being rendered
     */
    /**
     * We need to convert a component name to actual a type and then use ComponentFactoryResolver
     * to instantiate a a component and save its information into our component references. The
     * reason why we have this component reference is we need to store Angular's component metadata
     * so we can iterate thru all the inputs and bind them to the context.
     *
     * returns {ComponentReference} a reference representing a compoent currently being rendered
     * @return {?}
     */
    IncludeComponentDirective.prototype.componentReference = /**
     * We need to convert a component name to actual a type and then use ComponentFactoryResolver
     * to instantiate a a component and save its information into our component references. The
     * reason why we have this component reference is we need to store Angular's component metadata
     * so we can iterate thru all the inputs and bind them to the context.
     *
     * returns {ComponentReference} a reference representing a compoent currently being rendered
     * @return {?}
     */
    function () {
        if (isPresent(this.resolvedComponentRef)) {
            return this.resolvedComponentRef;
        }
        var /** @type {?} */ currType = this.resolveComponentType();
        var /** @type {?} */ componentFactory = this.factoryResolver
            .resolveComponentFactory(currType);
        var /** @type {?} */ componentMeta = this.resolveDirective(componentFactory);
        var /** @type {?} */ compReference = {
            metadata: componentMeta,
            resolvedCompFactory: componentFactory,
            componentType: currType,
            componentName: this.name
        };
        this.resolvedComponentRef = compReference;
        return compReference;
    };
    /**
     * Iterates thru ComponentMetadata @Inputs() and check if we have available binding inside the
     * 'this.bindings'
     */
    /**
     * Iterates thru ComponentMetadata \@Inputs() and check if we have available binding inside the
     * 'this.bindings'
     * @param {?} cRef
     * @param {?} component
     * @param {?} bindings
     * @return {?}
     */
    IncludeComponentDirective.prototype.applyBindings = /**
     * Iterates thru ComponentMetadata \@Inputs() and check if we have available binding inside the
     * 'this.bindings'
     * @param {?} cRef
     * @param {?} component
     * @param {?} bindings
     * @return {?}
     */
    function (cRef, component, bindings) {
        var /** @type {?} */ inputs = cRef.metadata.inputs;
        if (isBlank(inputs) || inputs.length === 0) {
            return;
        }
        // should we do any type conversion?
        MapWrapper.iterable(bindings).forEach(function (v, k) {
            if (isPresent(component.instance[k])) {
                component.instance[k] = v;
            }
        });
    };
    /**
     * Resolves a component Type based on the string literal
     *
     * @returns component type used by `ComponentFactoryResolver`
     *
     * todo: rename the method so its clear that it returns component type based on string.
     */
    /**
     * Resolves a component Type based on the string literal
     *
     * @return {?} component type used by `ComponentFactoryResolver`
     *
     * todo: rename the method so its clear that it returns component type based on string.
     */
    IncludeComponentDirective.prototype.resolveComponentType = /**
     * Resolves a component Type based on the string literal
     *
     * @return {?} component type used by `ComponentFactoryResolver`
     *
     * todo: rename the method so its clear that it returns component type based on string.
     */
    function () {
        var /** @type {?} */ componentType = this.compRegistry.nameToType.get(this.name);
        if (isBlank(componentType)) {
            assert(false, this.name + ' component does not exists. Create Dummy Component instead' +
                ' of throwing this error');
            return;
        }
        return componentType;
    };
    /**
     * @param {?} compFactory
     * @return {?}
     */
    IncludeComponentDirective.prototype.resolveDirective = /**
     * @param {?} compFactory
     * @return {?}
     */
    function (compFactory) {
        var /** @type {?} */ compMeta = {
            inputs: [],
            outputs: []
        };
        if (isPresent(compFactory.inputs) && compFactory.inputs.length > 0) {
            compFactory.inputs.forEach(function (input) {
                compMeta.inputs.push(input.propName);
            });
        }
        if (isPresent(compFactory.outputs) && compFactory.outputs.length > 0) {
            compFactory.outputs.forEach(function (output) {
                compMeta.outputs.push(output.propName);
            });
        }
        return compMeta;
    };
    /**
     * @return {?}
     */
    IncludeComponentDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (isPresent(this.currentComponent)) {
            this.currentComponent.destroy();
            this.currentComponent = undefined;
        }
        if (isPresent(this.viewContainer)) {
            this.viewContainer.clear();
        }
    };
    /**
     * @return {?}
     */
    IncludeComponentDirective.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (isPresent(this.currentComponent)) {
            this.currentComponent = null;
            this.resolvedComponentRef = null;
        }
    };
    IncludeComponentDirective.NgContent = 'ngcontent';
    IncludeComponentDirective.NgContentElement = 'ngcontentElement';
    IncludeComponentDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'aw-include-component'
                },] },
    ];
    /** @nocollapse */
    IncludeComponentDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: ChangeDetectorRef },
        { type: ComponentRegistry }
    ]; };
    IncludeComponentDirective.propDecorators = {
        name: [{ type: Input }],
        bindings: [{ type: Input }]
    };
    return IncludeComponentDirective;
}());
export { IncludeComponentDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZS1jb21wb25lbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvaW5jbHVkZS1jb21wb25lbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUlILGlCQUFpQixFQUdqQix3QkFBd0IsRUFFeEIsU0FBUyxFQUNULEtBQUssRUFLTCxnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFFbkUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4SDNELG1DQUFtQixhQUErQixFQUMvQixpQkFDQSxJQUNBO1FBSEEsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLG9CQUFlLEdBQWYsZUFBZTtRQUNmLE9BQUUsR0FBRixFQUFFO1FBQ0YsaUJBQVksR0FBWixZQUFZOzs7Ozs7b0NBckJFLEtBQUs7Ozs7OzttQ0FRbEMsSUFBSSxHQUFHLEVBQThCO1FBZ0JyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7S0FDMUM7Ozs7SUFFRCw0Q0FBUTs7O0lBQVI7UUFHSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDOzs7O1FBSWpDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDNUI7Ozs7O0lBR0QsK0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBRTlCLEVBQUUsQ0FBQyxDQUFD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SUFFTywyQ0FBTzs7OztRQUVYLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUM3QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1NBQ3BDOzswQ0EzVXVCLFdBQVc7aURBQ0osa0JBQWtCOztnQkFSeEQsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7aUJBQ25DOzs7O2dCQXpFRyxnQkFBZ0I7Z0JBUmhCLHdCQUF3QjtnQkFIeEIsaUJBQWlCO2dCQWdCYixpQkFBaUI7Ozt1QkF3RnBCLEtBQUs7MkJBTUwsS0FBSzs7b0NBdElWOztTQTZHYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIGlzQmxhbmssIGlzUHJlc2VudCwgTWFwV3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge1N0cmluZ0NvbXBvbmVudH0gZnJvbSAnLi4vd2lkZ2V0cy9zdHJpbmcvc3RyaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbXBvbmVudFJlZmVyZW5jZX0gZnJvbSAnLi9jb21wb25lbnQtcmVmZXJlbmNlJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4vY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG4vKipcbiAqIHRoaXMgaXMgc3BlY2lmaWMgaW1wb3J0IHRvIHdlIGNhbiB1c2UgY29tcG9uZW50cyBhcyBjb21wb25lbnRzW3R5cGVuYW1lXSBhbmQgIGdldCBiYWNrIGFcbiAqIHR5cGUuXG4gKiBJIGNvdWxkIG5vdCBmaW5kIGFueSBiZXR0ZXIgZHluYW1pYyB3YXkgdXAgdG8gbm93XG4gKi9cbi8qKlxuICogIGBJbmNsdWRlQ29tcG9uZW50YCBkaXJlY3RpdmUgZHluYW1pY2FsbHkgaW5zdGFudGlhdGUgYW5kIGluc2VydCBhIGNvbXBvbmVudHMgaW50byB0aGUgc2NyZWVuXG4gKiBiYXNlZCBvbiB0aGUgbmFtZS4gSXQgY2FuIGFjY2VwdHMgYmluZGluZ3MgYXMgd2VsbCB3aGljaCB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYm91bmQgYW5kIGFwcGxpZWRcbiAqIHRvIHRoZSBjb21wb25lbnRcbiAqXG4gKiAgIyMjIHVzYWdlOlxuICpcbiAqICBJbnN0ZWFkIG9mIGluc2VydGluZyBjb21wb25lbnQgaW4gdGhlIHdheTpcbiAqXG4gKiAgYGBgXG4gKiAgICA8dGV4dGZpZWxkIHZhbHVlPVwic29tZSB2YWx1ZVwiPlxuICpcbiAqICBgYGBcbiAqXG4gKiAgeW91IGNhbiBkbyBzbyBkeW5hbWljYWxseSBsaWtlIHRoaXM6XG4gKlxuICogYGBgXG4gKiAgPGF3LWluY2x1ZGUtY29tcG9uZW50ICdUZXh0ZmllbGRDb21wb25lbnQnIFtiaW5kaW5nc109YmluZGluZ3MgPjwvYXctaW5jbHVkZS1jb21wb25lbnQ+XG4gKiBgYGBcbiAqXG4gKiBUaGlzIGlzIHRoZSBtYWluIGJ1aWxkaW5nIGJsb2NrIHRvIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBVSS5cbiAqXG4gKlxuICogVG9kbzogQ3VycmVudGx5IHRoZSB3YXkgQW5ndWxhciBBUEkgd29yayBhbmQgd2UgdXNlIGl0IHRvIGNyZWF0ZSBwcm9ncmFtYXRpY2FsbHkgY29tcG9uZW50c1xuICogaXMgdG9vIGNvbXBsZXh0IHdlIG5lZWQgdG8gY3JlYXRlIGV2ZXJ5dGhpbmcgMyBkaWZmZXJlbnQgY2FsbHMgdG8gcGxhY2UgYSBjb21wb25lbnQgdG8gdGhlXG4gKiBjb250YWluZXIuIFdoYXQgSSB3YW50IGlzIGlzIHRvIGNyZWF0ZSBzb21lIGtpbmQgb2YgcmVwcmVzZW50YXRpb24gb2YgQ29udGFpbmVyRWxlbWVudCBhbmQgdGhpc1xuICogY2FuIGJlIGFsc28gcGFyZW50IGZvciBvdXIgQmFzZUNvbXBvbmVudCB3aXRoIG1ldGhvZCBhZGQgYW5kIHJlbW92ZSBjb250ZW50LiBUaGVuIHdlIGNvdWxkIGhhdmVcbiAqIHNvbWUgQVdDb250ZW50LlxuICpcbiAqIGUuZy46IHRvIHJlcGxhY2UgYXBwbHlDb250ZW50RWxlbWVudElmQW55IHdoZXJlIHdlIGhhdmUgc2V2ZXJhbCBjYWxscyB0byBjcmVhdGUgYW5kIGFkZFxuICogY29tcG9uZW50IHRvIHRoZSB2aWV3LlxuICpcbiAqIGBgYHRzXG4gKiAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBBV0NvbmNyZXRlVGVtcGxhdGUodmlld0NvbnRhaW5lciwgZmFjdG9yeVJlc29sdmVyKVxuICogIGNvbnRhaW5lckVsZW1lbnQuYWRkKCdDbGNrIE1lJylcbiAqIGBgYFxuICpcbiAqIFRvIGFzc2VtYmxlIGRpZmZlcmVudCBjb21wb25lbnRzIHRvZ2V0aGVyIC0gbm90IG9ubHkgYWRkaW5nIHN0cmluZyBjb250ZW50XG4gKlxuICogYGBgdHNcbiAqICBsZXQgY29udGVudCA9IG5ldyBBV0NvbnRlbnQoQnV0dG9uQ29tcG9uZW50LCBiaW5kaW5nc01hcClcbiAqICBjb250ZW50LmFkZCgnQ2xpY2sgTWUnKTtcbiAqICBjb250YWluZXJFbGVtZW50LmFkZChjb250ZW50KVxuICpcbiAqIGBgYFxuICpcbiAqIGFkZCBtb3JlIGNvbXBvbmVudCBoaWVyYXJjaHk6XG4gKlxuICogYGBgdHNcbiAqICBsZXQgY29udGVudCA9IG5ldyBBV0NvbnRlbnQoSG92ZXJDYXJkQ29tcG9ubmV0cywgYmluZGluZ3NNYXApXG4gKiAgY29udGVudC5hZGQoY3JlYXRlTGF5b3V0KCk7XG4gKiAgY29udGFpbmVyRWxlbWVudC5hZGQoY29udGVudClcbiAqXG4gKiBgYGBcbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYXctaW5jbHVkZS1jb21wb25lbnQnXG59KVxuZXhwb3J0IGNsYXNzIEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXRcbntcblxuICAgIHN0YXRpYyByZWFkb25seSBOZ0NvbnRlbnQgPSAnbmdjb250ZW50JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTmdDb250ZW50RWxlbWVudCA9ICduZ2NvbnRlbnRFbGVtZW50JztcblxuICAgIC8qKlxuICAgICAqIEZ1bGwgY29tcG9uZW50IG5hbWUgZS5nLjogRHJvcGRvd25Db21wb25lbnQgd2hpY2ggaXMgZ29pbmcgdG8gYmUgaW5zZXJ0ZWQuIFdlIG5lZWQgdG8gdGFrZVxuICAgICAqIHRoaXMgbmFtZSBhbmQgdHJhbnNsYXRlIGl0IGludG8gYWN0dWFsIFRZUEUuIEluIG9yZGVyIHRvIGRvIHRoaXMgd2UgdXNlIGEgdHJpY2sgd2hlcmUgd2VcbiAgICAgKiBhY2Nlc3MgYW4gSU1QT1JURUQgY29tcG9uZW50cy5cbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqIGltcG9ydCAqIGFzIGNvbXBvbmVudHMgZnJvbSAnLi4vY29tcG9uZW50cyc7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBUaGVuIHlvdSBjYW4gcmV0cmlldmUgYSB0eXBlIGJ5IGp1c3QgY29tcG9uZW50c1s8U3RyaW5nIExpdGVyYWwgPl0gPT4gQ29tcG9uZW50IFRZUEVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHJvdGVjdGVkIG5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGJpbmRpbmdzIHdoaWNoIHdpbGwgYmUgcGFzc2VkIGludG8gdGhlIGNvbXBvbmVudCB3aGVuIGluc3RhbnRpYXRlZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdzOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBjcmVhdGVkIGNvbXBvbmVudCByZWZlcmVuY2UgdXNpbmcgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLiBXZSB1c2UgdGhpcyB0byBhY2Nlc3NcbiAgICAgKiB0aGUgYWN0dWFsIGNvbXBvbmVudCBpbnN0YW5jZSBhbmQgRWxlbWVudCBSZWZlcmVuY2VcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY3VycmVudENvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBJIHVzZSB0aGlzIGZsYWcgdG8gaWRlbnRpZnkgdGhhdCBjb21wb25lbnQgaXMgcmVuZGVyaW5nIGZvciBmaXJzdCB0aW1lIG9yIGl0cyB1cGRhdGVkIGR1cmluZ1xuICAgICAqIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0UmVuZGVySW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogTm90IHN1cmUgaWYgd2UgbmVlZCB0aGlzLCBidXQgd2FudCB0byBrZWVwIGl0IGhlcmUgb3IgbWF5YmUgbW92ZSBpdCB0byBzb21lIHNlcnZpY2Ugc28gd2VcbiAgICAgKiBjYW4gY2FjaGUgY3JlYXRlZCBjb21wb25lbnRzIGFuZCBtYXliZSByZXVzZSB0aGVtLlxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudFJlZmVyZW5jZXM6IE1hcDxzdHJpbmcsIENvbXBvbmVudFJlZmVyZW5jZT4gPVxuICAgICAgICBuZXcgTWFwPHN0cmluZywgQ29tcG9uZW50UmVmZXJlbmNlPigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGNhY2hlIHRoZSByZXNvbHZlZCBjb21wb25lbnQgcmVmZXJlbmNlIHNvIHdlIGRvbnQgY2FsbCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgICAgKiBldmVyeXRoaW5nIHdlIHdhbnQgdG8gcmVmcmVzaCBhIHNjcmVlblxuICAgICAqL1xuICAgIHJlc29sdmVkQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWZlcmVuY2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBmYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBjb21wUmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5KVxuICAgIHtcblxuICAgICAgICB0aGlzLmJpbmRpbmdzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIHRoaXMuaW5pdFJlbmRlckluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAvLyB0b2RvOiBjaGVjayBpZiB0aGlzIHRoZSByaWdodCBsaWZlY3ljbGUgY2FsbGJhY2ssIHRoaXMgaXMgY2FsbGVkIG9ubHkgb25jZSBhbmQgeW91IHdhbnRcbiAgICAgICAgLy8gdG8gcHJvYmFibHkgbGlzdGVuIGZvciBjaGFuZ2VzLCBhbmQgY2hhbmdlIGRlY3Rpb24gZGVjaWRlIHRoZXJlIGlzIHNvbWUgY2hhbmdlIGFuZCB3ZVxuICAgICAgICAvLyBuZWVkIHRvIHJlLWRyYXcgdGhlIHZpZXdcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZG9SZW5kZXJDb21wb25lbnQoKTtcbiAgICB9XG5cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGNoYW5nZXNbJ25hbWUnXSkgJiZcbiAgICAgICAgICAgIChjaGFuZ2VzWyduYW1lJ10uY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzWyduYW1lJ10ucHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5kb1JlbmRlckNvbXBvbmVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0UmVuZGVySW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB3ZSBuZWVkIHRvIHJlbmRlciBhbmQgcmVwb3NpdGlvbiBET00gZWxlbWVudCBib3RoIGZvciB3cmFwcGVyIGFuZFxuICAgICAgICAvLyBjb250ZW50XG4gICAgICAgIHRoaXMuY3JlYXRlV3JhcHBlckVsZW1lbnRJZkFueSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUNvbnRlbnRFbGVtZW50SWZBbnkoKTtcbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkXG4gICAge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgYSBjYXNlIHdoZXJlIHdlIG5lZWQgdG8gcmVzb2x2ZSBhZGRpdGlvbmFsIGNvbXBvbmVudCBhbmQgd3JhcCB0aGUgY3VycmVudCBvbmUuXG4gICAgICogSnVzdCBsaWtlIHJlYXRlQ29udGVudEVsZW1lbnRJZkFueSgpIHRoaXMgbWV0aG9kIG5lZWRzIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbFxuICAgICAqIGlzIGNyZWF0ZWQgYW5kIGluaXRpYWxpemVkIChpbnNpZGUgdGhlIG5nQWZ0ZXJWaWV3SW5pdCgpIClcbiAgICAgKlxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjcmVhdGVXcmFwcGVyRWxlbWVudElmQW55KCk6IHZvaWRcbiAgICB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGNvbXBvbmVudCBpbnRvIGFjdHVhbCBWaWV3IENvbnRhaW5lci4gVGhlIHByb2Nlc3MgZ29lcyBhcyB0aGlzLlxuICAgICAqICAxLiBXZSByZXRyaWV2ZSBjb21wb25lbnQgVHlwZSBiYXNlZCBvbiB0aGUgY29tcG9uZW50IG5hbWUsIHdoaWNoIGNyZWF0ZXMgY29tcG9uZW50UmVmXG4gICAgICogIDIuIFBsYWNlIHRoZSBjb21wb25lbnQgb250byB0aGUgc2NyZWVuXG4gICAgICogIDMuIFJlYWQgY29tcG9uZW50IG1ldGFkYXRhLCBtYWlubHkgSU5QVVRzIGFuZCBhcHBseSBiaW5kaW5ncyBmb3IgZWFjaCBvZiB0aGVtXG4gICAgICogIDQuIE1hbnVhbGx5IHNwaW4gY2hhbmdlIGRldGVjdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbi4gTWFpbmx5IGZvciBjYXNlIHdoZXJlIEkgbmVlZCB0b1xuICAgICAqIHJlZHJhdyBhIHNjcmVlblxuICAgICAqL1xuICAgIHByb3RlY3RlZCBkb1JlbmRlckNvbXBvbmVudCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnBsYWNlVGhlQ29tcG9uZW50KCk7XG4gICAgICAgIC8vIHRoaXMuY3VycmVudENvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRhY2goKTtcblxuICAgICAgICB0aGlzLmFwcGx5QmluZGluZ3ModGhpcy5jb21wb25lbnRSZWZlcmVuY2UoKSwgdGhpcy5jdXJyZW50Q29tcG9uZW50LCB0aGlzLmJpbmRpbmdzKTtcbiAgICAgICAgLy8gdGhpcy5jdXJyZW50Q29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICAvLyBTdGlsbCBub3Qgc3VyZSBhYm91dCB0aGlzIHdoYXQgYWxsIEkgc2hvdWxkIHJlbGVhc2UgaGVyZS5cbiAgICAgICAgdGhpcy5jdXJyZW50Q29tcG9uZW50Lm9uRGVzdHJveSgoKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB0aGlzLmJpbmRpbmdzLmNsZWFyKCk7XG4gICAgICAgICAgICAvLyB0aGlzLmJpbmRpbmdzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoaXMuY29tcG9uZW50UmVmZXJlbmNlcy5jbGVhcigpO1xuICAgICAgICAgICAgLy8gdGhpcy5jb21wb25lbnRSZWZlcmVuY2VzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQbGFjZSBhY3R1YWwgY29tcG9uZW50IG9udG8gdGhlIHNjcmVlbiB1c2luZyBWaWV3Q29udGFpbmVyUmVmXG4gICAgICpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcGxhY2VUaGVDb21wb25lbnQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHJlZmVyZW5jZSA9IHRoaXMuY29tcG9uZW50UmVmZXJlbmNlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudENvbXBvbmVudCA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQocmVmZXJlbmNlLnJlc29sdmVkQ29tcEZhY3RvcnkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2hlbiBpbnNlcnRpbmcgQ29tcG9uZW50IHRoYXQgbmVlZHMgdG8gaGF2ZSBhIGNvbnRlbnQgbGlrZSBlLmcuIGh5cGVybGluayBvciBidXR0b25cbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqICAgPGJ1dHRvbj4gTVkgTkcgQ09OVEVOVCA8L2J1dHRvbj5cbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqICB0aGlzIG1ldGhvZCBhcHBsaWVzIGFuZCBpbnNlcnQgYSBjaGlsZCBjb250ZW50IGludG8gdGhlIG1haW4gY29tcG9uZW50LiBUaGlzIG1ldGhvZCBpbnNlcnRcbiAgICAgKiBhIHNpbXBsZSBzdHJpbmcuIFdlIGFyZSBub3Qgd3JhcHBpbmcgZXhpc3RpbmcgY29tcG9uZW50IHdpdGggYW5vdGhlciBjb21wb25lbnQgaGVyZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gbmVlZCB0byBydW4gZGV0ZWN0IGNoYW5nZXMgPyBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNvbnRlbnRFbGVtZW50SWZBbnkoKTogYm9vbGVhblxuICAgIHtcblxuICAgICAgICBsZXQgZGV0ZWN0Q2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICBsZXQgbmdDb250ZW50ID0gdGhpcy5uZ0NvbnRlbnQoKTtcbiAgICAgICAgbGV0IG5nQ29udGVudEVsZW1lbnQgPSB0aGlzLm5nQ29udGVudEVsZW1lbnQoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChuZ0NvbnRlbnQpKSB7XG4gICAgICAgICAgICBsZXQgYXdDb250ZW50Q29tcG9uZW50ID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoU3RyaW5nQ29tcG9uZW50KTtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGF3Q29udGVudENvbXBvbmVudCwgMCk7XG5cbiAgICAgICAgICAgICg8U3RyaW5nQ29tcG9uZW50PmNvbXBvbmVudC5pbnN0YW5jZSkudmFsdWUgPSBuZ0NvbnRlbnQ7XG4gICAgICAgICAgICBsZXQgYXdDb250ZW50Q29udGFpbmVyID0gdGhpcy5jdXJyZW50Q29tcG9uZW50LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIGF3Q29udGVudENvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGRldGVjdENoYW5nZXMgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChuZ0NvbnRlbnRFbGVtZW50KSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvbnRlbnQgRWxlbWVudDogJywgbmdDb250ZW50RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGV0ZWN0Q2hhbmdlcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0cmlldmUgYSBORyBDb250ZW50IGZyb20gYmluZGluZyBsaXN0IGFuZCByZW1vdmUgaXQgc28gaXQgaXRzIG5vdCBwcmVwYWdhdGVkIGRvd24gd2hlblxuICAgICAqIGFwcGx5aW5nIG90aGVyIGJpbmRpbmdzLlxuICAgICAqXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG5nQ29udGVudCgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBjb250ZW50OiBhbnk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29udGVudCA9IHRoaXMuYmluZGluZ3MuZ2V0KEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50KSkpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3MuZGVsZXRlKEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBuZ0NvbnRlbnRFbGVtZW50KCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IGNvbnRlbnQ6IGFueTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjb250ZW50ID0gdGhpcy5iaW5kaW5ncy5nZXQoSW5jbHVkZUNvbXBvbmVudERpcmVjdGl2ZS5OZ0NvbnRlbnRFbGVtZW50KSkpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3MuZGVsZXRlKEluY2x1ZGVDb21wb25lbnREaXJlY3RpdmUuTmdDb250ZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgbmVlZCB0byBjb252ZXJ0IGEgY29tcG9uZW50IG5hbWUgdG8gYWN0dWFsIGEgdHlwZSBhbmQgdGhlbiB1c2UgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICAgICogdG8gaW5zdGFudGlhdGUgYSBhIGNvbXBvbmVudCBhbmQgc2F2ZSBpdHMgaW5mb3JtYXRpb24gaW50byBvdXIgY29tcG9uZW50IHJlZmVyZW5jZXMuIFRoZVxuICAgICAqIHJlYXNvbiB3aHkgd2UgaGF2ZSB0aGlzIGNvbXBvbmVudCByZWZlcmVuY2UgaXMgd2UgbmVlZCB0byBzdG9yZSBBbmd1bGFyJ3MgY29tcG9uZW50IG1ldGFkYXRhXG4gICAgICogc28gd2UgY2FuIGl0ZXJhdGUgdGhydSBhbGwgdGhlIGlucHV0cyBhbmQgYmluZCB0aGVtIHRvIHRoZSBjb250ZXh0LlxuICAgICAqXG4gICAgICogcmV0dXJucyB7Q29tcG9uZW50UmVmZXJlbmNlfSBhIHJlZmVyZW5jZSByZXByZXNlbnRpbmcgYSBjb21wb2VudCBjdXJyZW50bHkgYmVpbmcgcmVuZGVyZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY29tcG9uZW50UmVmZXJlbmNlKCk6IENvbXBvbmVudFJlZmVyZW5jZVxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLnJlc29sdmVkQ29tcG9uZW50UmVmKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZWRDb21wb25lbnRSZWY7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnJUeXBlID0gdGhpcy5yZXNvbHZlQ29tcG9uZW50VHlwZSgpO1xuICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+ID0gdGhpcy5mYWN0b3J5UmVzb2x2ZXJcbiAgICAgICAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjdXJyVHlwZSk7XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudE1ldGE6IENvbXBvbmVudCA9IHRoaXMucmVzb2x2ZURpcmVjdGl2ZShjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgbGV0IGNvbXBSZWZlcmVuY2U6IENvbXBvbmVudFJlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgIG1ldGFkYXRhOiBjb21wb25lbnRNZXRhLFxuICAgICAgICAgICAgcmVzb2x2ZWRDb21wRmFjdG9yeTogY29tcG9uZW50RmFjdG9yeSxcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGN1cnJUeXBlLFxuICAgICAgICAgICAgY29tcG9uZW50TmFtZTogdGhpcy5uYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZXNvbHZlZENvbXBvbmVudFJlZiA9IGNvbXBSZWZlcmVuY2U7XG4gICAgICAgIHJldHVybiBjb21wUmVmZXJlbmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIHRocnUgQ29tcG9uZW50TWV0YWRhdGEgQElucHV0cygpIGFuZCBjaGVjayBpZiB3ZSBoYXZlIGF2YWlsYWJsZSBiaW5kaW5nIGluc2lkZSB0aGVcbiAgICAgKiAndGhpcy5iaW5kaW5ncydcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYXBwbHlCaW5kaW5ncyhjUmVmOiBDb21wb25lbnRSZWZlcmVuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kaW5nczogTWFwPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBpbnB1dHM6IHN0cmluZ1tdID0gY1JlZi5tZXRhZGF0YS5pbnB1dHM7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsoaW5wdXRzKSB8fCBpbnB1dHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdWxkIHdlIGRvIGFueSB0eXBlIGNvbnZlcnNpb24/XG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUoYmluZGluZ3MpLmZvckVhY2goKHYsIGspID0+XG4gICAgICAgIHtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChjb21wb25lbnQuaW5zdGFuY2Vba10pKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50Lmluc3RhbmNlW2tdID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyBhIGNvbXBvbmVudCBUeXBlIGJhc2VkIG9uIHRoZSBzdHJpbmcgbGl0ZXJhbFxuICAgICAqXG4gICAgICogQHJldHVybnMgY29tcG9uZW50IHR5cGUgdXNlZCBieSBgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyYFxuICAgICAqXG4gICAgICogdG9kbzogcmVuYW1lIHRoZSBtZXRob2Qgc28gaXRzIGNsZWFyIHRoYXQgaXQgcmV0dXJucyBjb21wb25lbnQgdHlwZSBiYXNlZCBvbiBzdHJpbmcuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJlc29sdmVDb21wb25lbnRUeXBlKCk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudFR5cGUgPSB0aGlzLmNvbXBSZWdpc3RyeS5uYW1lVG9UeXBlLmdldCh0aGlzLm5hbWUpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKGNvbXBvbmVudFR5cGUpKSB7XG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsIHRoaXMubmFtZSArICcgY29tcG9uZW50IGRvZXMgbm90IGV4aXN0cy4gQ3JlYXRlIER1bW15IENvbXBvbmVudCBpbnN0ZWFkJyArXG4gICAgICAgICAgICAgICAgJyBvZiB0aHJvd2luZyB0aGlzIGVycm9yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFR5cGU7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgcmVzb2x2ZURpcmVjdGl2ZShjb21wRmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+KTogQ29tcG9uZW50XG4gICAge1xuICAgICAgICBsZXQgY29tcE1ldGE6IENvbXBvbmVudCA9IHtcbiAgICAgICAgICAgIGlucHV0czogW10sXG4gICAgICAgICAgICBvdXRwdXRzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29tcEZhY3RvcnkuaW5wdXRzKSAmJiBjb21wRmFjdG9yeS5pbnB1dHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBjb21wRmFjdG9yeS5pbnB1dHMuZm9yRWFjaCgoaW5wdXQ6IHtwcm9wTmFtZTogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZ30pID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29tcE1ldGEuaW5wdXRzLnB1c2goaW5wdXQucHJvcE5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbXBGYWN0b3J5Lm91dHB1dHMpICYmIGNvbXBGYWN0b3J5Lm91dHB1dHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBjb21wRmFjdG9yeS5vdXRwdXRzLmZvckVhY2goKG91dHB1dDoge3Byb3BOYW1lOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nfSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb21wTWV0YS5vdXRwdXRzLnB1c2gob3V0cHV0LnByb3BOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wTWV0YTtcbiAgICB9XG5cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5jdXJyZW50Q29tcG9uZW50KSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENvbXBvbmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy52aWV3Q29udGFpbmVyKSkge1xuICAgICAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY3VycmVudENvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkQ29tcG9uZW50UmVmID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==