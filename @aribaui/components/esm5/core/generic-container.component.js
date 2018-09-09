/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { isBlank, isPresent, MapWrapper } from '@aribaui/core';
/**
 * GenericContainerComponent is used by include-component.directive to dynamically create an
 * HTMLElement and use this element to wrap a child component. This is very useful when we want to
 * modify a child by wrapping it with a border, a background, or bold its text.
 *
 * The wrapper element is dynamically created. It's element is specified by the tagName property in
 * the bindings \@Input.
 *
 *  ### Example.  Directly in html
 *
 *   app.html
 *      <aw-generic-container tagName="tagName" bindings="bindings">
 *          <my-component ..bindings..></my-component>
 *      </aw-generic-container>
 *
 *   app.component.ts
 *
 *       tagName = (bBold) ? 'h1' : 'span';
 *       bindings = {  style: 'background-color: red' }
 *
 */
var GenericContainerComponent = /** @class */ (function () {
    /**
     * param renderer - Renderer is used to create 'tagName' element.
     */
    function GenericContainerComponent(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.nativeElement = element.nativeElement;
    }
    /**
     * During the initialization, verify that at least one input has been set.
     */
    /**
     * During the initialization, verify that at least one input has been set.
     * @return {?}
     */
    GenericContainerComponent.prototype.ngOnInit = /**
     * During the initialization, verify that at least one input has been set.
     * @return {?}
     */
    function () {
        // If there's no input, this component wouldn't know what to do and throw exception.
        if (isBlank(this.bindings) && isBlank(this.tagName)) {
            throw new Error('GenericContainerComponent input bindings or tagName ' +
                'have not been set.');
        }
        // If the tagName is blank, the get it from bindings.
        if (isBlank(this.tagName)) {
            this.tagName = this.bindings.get('tagName');
            if (isBlank(this.tagName)) {
                this.tagName = GenericContainerComponent.DefaultTagName;
            }
        }
        // Save first added
        this.childElement = this.nativeElement.firstChild;
        this.doRender();
    };
    /**
     * @return {?}
     */
    GenericContainerComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (isPresent(this.childElement) &&
            this.childElement.parentNode !== this.nativeElement.firstChild) {
            this.nativeElement.firstChild.appendChild(this.childElement);
        }
    };
    /**
     * After content has been initialized. Create the tagName element. Apply all the bindings on to
     * the element as attribute. Finally, move the child element, <ng-content>, to inside the
     * wrapper component.
     * @return {?}
     */
    GenericContainerComponent.prototype.doRender = /**
     * After content has been initialized. Create the tagName element. Apply all the bindings on to
     * the element as attribute. Finally, move the child element, <ng-content>, to inside the
     * wrapper component.
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var el = this.renderer.createElement(this.tagName);
        if (isPresent(this.nativeElement)) {
            this.renderer.appendChild(this.nativeElement, el);
        }
        // Loop through all the bindings and add them to the element.
        MapWrapper.iterable(this.bindings).forEach(function (v, k) {
            _this.renderer.setStyle(el, k, v);
        });
        // Attach the component to this divElement.
        el.appendChild(this.childElement);
    };
    /**
     * Default tagName if none is specified inside bindings.
     *
     */
    GenericContainerComponent.DefaultTagName = 'div';
    GenericContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-generic-container',
                    template: '<ng-content></ng-content>'
                }] }
    ];
    /** @nocollapse */
    GenericContainerComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    GenericContainerComponent.propDecorators = {
        bindings: [{ type: Input }],
        tagName: [{ type: Input }]
    };
    return GenericContainerComponent;
}());
export { GenericContainerComponent };
if (false) {
    /**
     * Default tagName if none is specified inside bindings.
     *
     * @type {?}
     */
    GenericContainerComponent.DefaultTagName;
    /**
     * Bindings to be added as attributes to the tagName element.
     * @type {?}
     */
    GenericContainerComponent.prototype.bindings;
    /**
     * Element to be created that wraps it's content.
     * @type {?}
     */
    GenericContainerComponent.prototype.tagName;
    /**
     * Native root element. Points to <aw-generic-container>
     * @type {?}
     */
    GenericContainerComponent.prototype.nativeElement;
    /** @type {?} */
    GenericContainerComponent.prototype.childElement;
    /** @type {?} */
    GenericContainerComponent.prototype.renderer;
    /** @type {?} */
    GenericContainerComponent.prototype.element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpYy1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImNvcmUvZ2VuZXJpYy1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBVyxVQUFVLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUR6RDs7T0FFRztJQUNILG1DQUFvQixRQUFtQixFQUFVLE9BQW1CO1FBQWhELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBRWhFLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUM5QztJQUVEOztPQUVHOzs7OztJQUNILDRDQUFROzs7O0lBQVI7O1FBR0ksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRDtnQkFDbEUsb0JBQW9CLENBQUMsQ0FBQztTQUM3Qjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDLGNBQWMsQ0FBQzthQUMzRDtTQUNKOztRQUdELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ25COzs7O0lBRUQsNkNBQVM7OztJQUFUO1FBR0ksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBRWpFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDaEU7S0FDSjs7Ozs7OztJQVFPLDRDQUFROzs7Ozs7Ozs7UUFFWixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNyRDs7UUFHRCxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUU1QyxLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BDLENBQUMsQ0FBQzs7UUFHSCxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozs7OytDQXBGTCxLQUFLOztnQkFaekMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSwyQkFBMkI7aUJBRXhDOzs7O2dCQTVCc0QsU0FBUztnQkFBcEMsVUFBVTs7OzJCQXlDakMsS0FBSzswQkFNTCxLQUFLOztvQ0FuRVY7O1NBaURhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgTWFwV3JhcHBlcn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbi8qKlxuICogR2VuZXJpY0NvbnRhaW5lckNvbXBvbmVudCBpcyB1c2VkIGJ5IGluY2x1ZGUtY29tcG9uZW50LmRpcmVjdGl2ZSB0byBkeW5hbWljYWxseSBjcmVhdGUgYW5cbiAqIEhUTUxFbGVtZW50IGFuZCB1c2UgdGhpcyBlbGVtZW50IHRvIHdyYXAgYSBjaGlsZCBjb21wb25lbnQuIFRoaXMgaXMgdmVyeSB1c2VmdWwgd2hlbiB3ZSB3YW50IHRvXG4gKiBtb2RpZnkgYSBjaGlsZCBieSB3cmFwcGluZyBpdCB3aXRoIGEgYm9yZGVyLCBhIGJhY2tncm91bmQsIG9yIGJvbGQgaXRzIHRleHQuXG4gKlxuICogVGhlIHdyYXBwZXIgZWxlbWVudCBpcyBkeW5hbWljYWxseSBjcmVhdGVkLiBJdCdzIGVsZW1lbnQgaXMgc3BlY2lmaWVkIGJ5IHRoZSB0YWdOYW1lIHByb3BlcnR5IGluXG4gKiB0aGUgYmluZGluZ3MgQElucHV0LlxuICpcbiAqICAjIyMgRXhhbXBsZS4gIERpcmVjdGx5IGluIGh0bWxcbiAqXG4gKiAgIGFwcC5odG1sXG4gKiAgICAgIDxhdy1nZW5lcmljLWNvbnRhaW5lciB0YWdOYW1lPVwidGFnTmFtZVwiIGJpbmRpbmdzPVwiYmluZGluZ3NcIj5cbiAqICAgICAgICAgIDxteS1jb21wb25lbnQgLi5iaW5kaW5ncy4uPjwvbXktY29tcG9uZW50PlxuICogICAgICA8L2F3LWdlbmVyaWMtY29udGFpbmVyPlxuICpcbiAqICAgYXBwLmNvbXBvbmVudC50c1xuICpcbiAqICAgICAgIHRhZ05hbWUgPSAoYkJvbGQpID8gJ2gxJyA6ICdzcGFuJztcbiAqICAgICAgIGJpbmRpbmdzID0geyAgc3R5bGU6ICdiYWNrZ3JvdW5kLWNvbG9yOiByZWQnIH1cbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZ2VuZXJpYy1jb250YWluZXInLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gICAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBHZW5lcmljQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrXG57XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHRhZ05hbWUgaWYgbm9uZSBpcyBzcGVjaWZpZWQgaW5zaWRlIGJpbmRpbmdzLlxuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IERlZmF1bHRUYWdOYW1lID0gJ2Rpdic7XG5cbiAgICAvKipcbiAgICAgKiBCaW5kaW5ncyB0byBiZSBhZGRlZCBhcyBhdHRyaWJ1dGVzIHRvIHRoZSB0YWdOYW1lIGVsZW1lbnQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBiaW5kaW5nczogTWFwPHN0cmluZywgYW55PjtcblxuICAgIC8qKlxuICAgICAqIEVsZW1lbnQgdG8gYmUgY3JlYXRlZCB0aGF0IHdyYXBzIGl0J3MgY29udGVudC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRhZ05hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIE5hdGl2ZSByb290IGVsZW1lbnQuIFBvaW50cyB0byA8YXctZ2VuZXJpYy1jb250YWluZXI+XG4gICAgICovXG4gICAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50OiBOb2RlO1xuXG4gICAgcHJpdmF0ZSBjaGlsZEVsZW1lbnQ6IE5vZGU7XG5cblxuICAgIC8qKlxuICAgICAqIHBhcmFtIHJlbmRlcmVyIC0gUmVuZGVyZXIgaXMgdXNlZCB0byBjcmVhdGUgJ3RhZ05hbWUnIGVsZW1lbnQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpXG4gICAge1xuICAgICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHVyaW5nIHRoZSBpbml0aWFsaXphdGlvbiwgdmVyaWZ5IHRoYXQgYXQgbGVhc3Qgb25lIGlucHV0IGhhcyBiZWVuIHNldC5cbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICAvLyBJZiB0aGVyZSdzIG5vIGlucHV0LCB0aGlzIGNvbXBvbmVudCB3b3VsZG4ndCBrbm93IHdoYXQgdG8gZG8gYW5kIHRocm93IGV4Y2VwdGlvbi5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5iaW5kaW5ncykgJiYgaXNCbGFuayh0aGlzLnRhZ05hbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dlbmVyaWNDb250YWluZXJDb21wb25lbnQgaW5wdXQgYmluZGluZ3Mgb3IgdGFnTmFtZSAnICtcbiAgICAgICAgICAgICAgICAnaGF2ZSBub3QgYmVlbiBzZXQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgdGFnTmFtZSBpcyBibGFuaywgdGhlIGdldCBpdCBmcm9tIGJpbmRpbmdzLlxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnRhZ05hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ05hbWUgPSB0aGlzLmJpbmRpbmdzLmdldCgndGFnTmFtZScpO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsodGhpcy50YWdOYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFnTmFtZSA9IEdlbmVyaWNDb250YWluZXJDb21wb25lbnQuRGVmYXVsdFRhZ05hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTYXZlIGZpcnN0IGFkZGVkXG4gICAgICAgIHRoaXMuY2hpbGRFbGVtZW50ID0gdGhpcy5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQ7XG4gICAgICAgIHRoaXMuZG9SZW5kZXIoKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKTogdm9pZFxuICAgIHtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY2hpbGRFbGVtZW50KSAmJlxuICAgICAgICAgICAgdGhpcy5jaGlsZEVsZW1lbnQucGFyZW50Tm9kZSAhPT0gdGhpcy5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcblxuICAgICAgICAgICAgdGhpcy5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5jaGlsZEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBZnRlciBjb250ZW50IGhhcyBiZWVuIGluaXRpYWxpemVkLiBDcmVhdGUgdGhlIHRhZ05hbWUgZWxlbWVudC4gQXBwbHkgYWxsIHRoZSBiaW5kaW5ncyBvbiB0b1xuICAgICAqIHRoZSBlbGVtZW50IGFzIGF0dHJpYnV0ZS4gRmluYWxseSwgbW92ZSB0aGUgY2hpbGQgZWxlbWVudCwgPG5nLWNvbnRlbnQ+LCB0byBpbnNpZGUgdGhlXG4gICAgICogd3JhcHBlciBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkb1JlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCBlbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCh0aGlzLnRhZ05hbWUpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5uYXRpdmVFbGVtZW50LCBlbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBiaW5kaW5ncyBhbmQgYWRkIHRoZW0gdG8gdGhlIGVsZW1lbnQuXG4gICAgICAgIE1hcFdyYXBwZXIuaXRlcmFibGUodGhpcy5iaW5kaW5ncykuZm9yRWFjaCgodiwgaykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShlbCwgaywgdik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEF0dGFjaCB0aGUgY29tcG9uZW50IHRvIHRoaXMgZGl2RWxlbWVudC5cbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5jaGlsZEVsZW1lbnQpO1xuICAgIH1cblxuXG59XG4iXX0=