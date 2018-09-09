/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ElementRef, Input, Directive } from '@angular/core';
import { AppConfig } from '@aribaui/core';
import { AwNameStore } from './aw-name.store';
/**
 * The 'awName' directive attaches a identifier to decorated element to aid selectors for testing
 * purposes. The 'awName' directive tries to generate a unique identifier based on contextual data
 * and inherant immutable element attributes.
 *
 * **Generating the Base Name**
 *
 * The 'awName' directive generates a base name from element tag name and attributes which are
 * static by nature.
 *
 *     Example:
 *         <button name="order" awName>
 *
 *     Result:
 *         <button name="order" awname="button_order">
 *
 * If the element has an 'id', that value takes precedent and is used instead of a generated
 * name.
 *
 *     Example:
 *         <button name="order" id="myOrderButton" awName>
 *
 *     Result:
 *         <button name="order" id="myOrderButton" awname="button_myOrderButton">
 *
 *
 * **Repeated Elements and the 'ext' Parameter**
 *
 * There are many cases where elements are generated dynamically in the code as lists or tables.
 * In such cases, it may not be easy to distinguish individual elements by standard HTML
 * attributes, so the 'awName' directive allows custom extentions to the base name to be provided
 * using the 'ext' attribute.
 *
 *    Example:
 *        fruits = ['apple', 'banana', 'orange'];
 *
 *        <ul>
 *            <li *ngFor="let fruit of fruits" awName ext="{{fruit}}">{{fruit}}</li>
 *        </ul>
 *
 *   Result:
 *       <ul>
 *           <li awname="li_apple">apple</li>
 *           <li awname="li_banana">banana</li>
 *           <li awname="li_orane">orange</li>
 *       </ul>
 *
 * **Adding Context Through Ancestor Inspection**
 *
 * In order to provide context to the element naming, the 'awName' directive loops through the
 * parent ancestry and searches for any unique element 'id' to prepend to the base name.
 *
 *     Example:
 *         <form id="applicant">
 *            <input type="text" name="firstName" awName>
 *            <input type="text" name="lastName" awName>
 *         </form>
 *         <form id="spouse">
 *            <input type="text" name="firstName" awName>
 *            <input type="text" name="lastName" awName>
 *         </form>
 *
 *     Result:
 *         <form id="applicant">
 *            <input type="text" name="firstName" awname="applicant_input_firstName">
 *            <input type="text" name="lastName" awname="applicant_input_lastName">
 *         </form>
 *         <form id="spouse">
 *            <input type="text" name="firstName" awname="spouse_input_firstName">
 *            <input type="text" name="lastName" awname="spouse_input_lastname">
 *         </form>
 *
 * **Uniqueness Check**
 *
 * 'awName' keeps track of the names it creates by adding them to a map store. Whenever it
 * creates a new name during the `ngOnInit` phase it checks it against the existing map,
 * and will throw an error if it encounters a duplicate. Moreover during the element destruction
 * phase, `ngOnDestroy`, 'awName' removes the generated name from the store.
 *
 *
 * **In Production**
 *
 * Using 'awName' adds a small bit of rendering overhead for each element it is used on. In
 * a production environment, 'awName' serves no functionality to the end user, but may have
 * a performance impact on the application. As such, 'awName' takes into account the
 * `AppConfig` settings and disables name generation when `AppConfig.isProductionMode()`
 * is `true`.
 *
 * In your application, you can turn on production mode by setting `devmode.enabled` to
 * `false` when configuring `AribaCoreModule`:
 *
 *     AribaCoreModule.forRoot({
 *         'devmode.enabled': false
 *     })
 *
 */
var AwNameDirective = /** @class */ (function () {
    function AwNameDirective(el, store, config) {
        this.el = el;
        this.store = store;
        this.config = config;
        this.separator = '_';
    }
    /**
     * @return {?}
     */
    AwNameDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.name = this.createName(this.el);
        this.addElementToStore(this.name, this.el);
        this.el.nativeElement.setAttribute('awname', this.name);
    };
    /**
     * @return {?}
     */
    AwNameDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.store.remove(this.name);
    };
    /**
     * Add element name/id and reference to map store. If name/id already
     * exists in store then it throws an error.
     *
     */
    /**
     * Add element name/id and reference to map store. If name/id already
     * exists in store then it throws an error.
     *
     * @param {?} name
     * @param {?} elem
     * @return {?}
     */
    AwNameDirective.prototype.addElementToStore = /**
     * Add element name/id and reference to map store. If name/id already
     * exists in store then it throws an error.
     *
     * @param {?} name
     * @param {?} elem
     * @return {?}
     */
    function (name, elem) {
        try {
            this.store.add(name, elem);
        }
        catch (e) {
            console.error(e.message + (". \"" + name + "\" is already in use."), elem.nativeElement);
            return;
        }
    };
    /**
     * Generate name/id for element.
     *
     * param elem Reference to element
     * @return String Name/ID
     */
    /**
     * Generate name/id for element.
     *
     * param elem Reference to element
     * @param {?} elem
     * @return {?} String Name/ID
     */
    AwNameDirective.prototype.createName = /**
     * Generate name/id for element.
     *
     * param elem Reference to element
     * @param {?} elem
     * @return {?} String Name/ID
     */
    function (elem) {
        /** @type {?} */
        var tagName = this.getTagName(elem);
        /** @type {?} */
        var parts = [];
        /** @type {?} */
        var parentID = this.getAncestorId(elem);
        if (parentID) {
            parts.push(parentID);
        }
        // Check the tag type
        if (tagName === 'option') {
            /** @type {?} */
            var parentName = this.getParentName(elem);
            if (parentName) {
                parts.push(parentName);
            }
        }
        // Get tagname
        parts.push(tagName);
        // Choose id property if it exists
        if (elem.nativeElement.id) {
            parts.push(elem.nativeElement.id);
            // Otherwise build extension from tag properties
        }
        else {
            // check for a name attribute
            if (elem.nativeElement.hasAttribute('name')) {
                parts.push(elem.nativeElement.name);
            }
            // check for value attribute if 'option' tag
            if (tagName === 'option') {
                if (elem.nativeElement.hasAttribute('value')) {
                    parts.push(this.spacesToUnderscore(elem.nativeElement.value));
                }
            }
        }
        // Add custom extension if it exists
        if (this.ext) {
            parts.push(this.spacesToUnderscore(this.ext));
        }
        return parts.join(this.separator);
    };
    /**
     * Get tag name from element reference.
     * @param elem Reference to element
     */
    /**
     * Get tag name from element reference.
     * @param {?} elem Reference to element
     * @return {?}
     */
    AwNameDirective.prototype.getTagName = /**
     * Get tag name from element reference.
     * @param {?} elem Reference to element
     * @return {?}
     */
    function (elem) {
        return elem.nativeElement.tagName.toLowerCase();
    };
    /**
     * Traverse element ancestry and return first id attribute
     * encountered.
     * @param elem Reference to element
     */
    /**
     * Traverse element ancestry and return first id attribute
     * encountered.
     * @param {?} elem Reference to element
     * @return {?}
     */
    AwNameDirective.prototype.getAncestorId = /**
     * Traverse element ancestry and return first id attribute
     * encountered.
     * @param {?} elem Reference to element
     * @return {?}
     */
    function (elem) {
        /** @type {?} */
        var parent = elem.nativeElement.parentNode;
        /** @type {?} */
        var id = '';
        while (parent && !id) {
            if (parent.id) {
                id = parent.id;
            }
            parent = parent.parentNode;
        }
        return id;
    };
    /**
     * Get name attribute from parent if name attribute exists.
     * @param elem Reference to element
     */
    /**
     * Get name attribute from parent if name attribute exists.
     * @param {?} elem Reference to element
     * @return {?}
     */
    AwNameDirective.prototype.getParentName = /**
     * Get name attribute from parent if name attribute exists.
     * @param {?} elem Reference to element
     * @return {?}
     */
    function (elem) {
        /** @type {?} */
        var parent = elem.nativeElement.parentNode;
        return (parent.name && !parent.id) ? parent.name : null;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    AwNameDirective.prototype.spacesToUnderscore = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/\s+/g, '_');
    };
    AwNameDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[awName]',
                },] }
    ];
    /** @nocollapse */
    AwNameDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: AwNameStore },
        { type: AppConfig }
    ]; };
    AwNameDirective.propDecorators = {
        ext: [{ type: Input }]
    };
    return AwNameDirective;
}());
export { AwNameDirective };
if (false) {
    /** @type {?} */
    AwNameDirective.prototype.ext;
    /** @type {?} */
    AwNameDirective.prototype.name;
    /** @type {?} */
    AwNameDirective.prototype.separator;
    /** @type {?} */
    AwNameDirective.prototype.el;
    /** @type {?} */
    AwNameDirective.prototype.store;
    /** @type {?} */
    AwNameDirective.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctbmFtZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9hdy1uYW1lL2F3LW5hbWUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBRVosTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gsV0FBVyxFQUNkLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkdyQix5QkFDWSxJQUNBLE9BQ0E7UUFGQSxPQUFFLEdBQUYsRUFBRTtRQUNGLFVBQUssR0FBTCxLQUFLO1FBQ0wsV0FBTSxHQUFOLE1BQU07eUJBTFUsR0FBRztLQU0zQjs7OztJQUVKLGtDQUFROzs7SUFBUjtRQUNRLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNEOzs7O0lBRUwscUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7O0lBQ0gsMkNBQWlCOzs7Ozs7OztJQUFqQixVQUFrQixJQUFZLEVBQUUs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QUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDWixFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUNsQjtZQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQzlCO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNiO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx1Q0FBYTs7Ozs7SUFBYixVQUFjLElBQWdCOztRQUMxQixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDM0Q7Ozs7O0lBRUQsNENBQWtCOzs7O0lBQWxCLFVBQW1CLEdBQVc7UUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ25DOztnQkFySUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO2lCQUN2Qjs7OztnQkFoSEcsVUFBVTtnQkFXVixXQUFXO2dCQUpYLFNBQVM7OztzQkE0R1IsS0FBSzs7MEJBcEhWOztTQWtIYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBEaXJlY3RpdmUsXG4gICAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBcHBDb25maWdcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgQXdOYW1lU3RvcmVcbn0gZnJvbSAnLi9hdy1uYW1lLnN0b3JlJztcblxuLyoqXG4gKiBUaGUgJ2F3TmFtZScgZGlyZWN0aXZlIGF0dGFjaGVzIGEgaWRlbnRpZmllciB0byBkZWNvcmF0ZWQgZWxlbWVudCB0byBhaWQgc2VsZWN0b3JzIGZvciB0ZXN0aW5nXG4gKiBwdXJwb3Nlcy4gVGhlICdhd05hbWUnIGRpcmVjdGl2ZSB0cmllcyB0byBnZW5lcmF0ZSBhIHVuaXF1ZSBpZGVudGlmaWVyIGJhc2VkIG9uIGNvbnRleHR1YWwgZGF0YVxuICogYW5kIGluaGVyYW50IGltbXV0YWJsZSBlbGVtZW50IGF0dHJpYnV0ZXMuXG4gKlxuICogKipHZW5lcmF0aW5nIHRoZSBCYXNlIE5hbWUqKlxuICpcbiAqIFRoZSAnYXdOYW1lJyBkaXJlY3RpdmUgZ2VuZXJhdGVzIGEgYmFzZSBuYW1lIGZyb20gZWxlbWVudCB0YWcgbmFtZSBhbmQgYXR0cmlidXRlcyB3aGljaCBhcmVcbiAqIHN0YXRpYyBieSBuYXR1cmUuXG4gKlxuICogICAgIEV4YW1wbGU6XG4gKiAgICAgICAgIDxidXR0b24gbmFtZT1cIm9yZGVyXCIgYXdOYW1lPlxuICpcbiAqICAgICBSZXN1bHQ6XG4gKiAgICAgICAgIDxidXR0b24gbmFtZT1cIm9yZGVyXCIgYXduYW1lPVwiYnV0dG9uX29yZGVyXCI+XG4gKlxuICogSWYgdGhlIGVsZW1lbnQgaGFzIGFuICdpZCcsIHRoYXQgdmFsdWUgdGFrZXMgcHJlY2VkZW50IGFuZCBpcyB1c2VkIGluc3RlYWQgb2YgYSBnZW5lcmF0ZWRcbiAqIG5hbWUuXG4gKlxuICogICAgIEV4YW1wbGU6XG4gKiAgICAgICAgIDxidXR0b24gbmFtZT1cIm9yZGVyXCIgaWQ9XCJteU9yZGVyQnV0dG9uXCIgYXdOYW1lPlxuICpcbiAqICAgICBSZXN1bHQ6XG4gKiAgICAgICAgIDxidXR0b24gbmFtZT1cIm9yZGVyXCIgaWQ9XCJteU9yZGVyQnV0dG9uXCIgYXduYW1lPVwiYnV0dG9uX215T3JkZXJCdXR0b25cIj5cbiAqXG4gKlxuICogKipSZXBlYXRlZCBFbGVtZW50cyBhbmQgdGhlICdleHQnIFBhcmFtZXRlcioqXG4gKlxuICogVGhlcmUgYXJlIG1hbnkgY2FzZXMgd2hlcmUgZWxlbWVudHMgYXJlIGdlbmVyYXRlZCBkeW5hbWljYWxseSBpbiB0aGUgY29kZSBhcyBsaXN0cyBvciB0YWJsZXMuXG4gKiBJbiBzdWNoIGNhc2VzLCBpdCBtYXkgbm90IGJlIGVhc3kgdG8gZGlzdGluZ3Vpc2ggaW5kaXZpZHVhbCBlbGVtZW50cyBieSBzdGFuZGFyZCBIVE1MXG4gKiBhdHRyaWJ1dGVzLCBzbyB0aGUgJ2F3TmFtZScgZGlyZWN0aXZlIGFsbG93cyBjdXN0b20gZXh0ZW50aW9ucyB0byB0aGUgYmFzZSBuYW1lIHRvIGJlIHByb3ZpZGVkXG4gKiB1c2luZyB0aGUgJ2V4dCcgYXR0cmlidXRlLlxuICpcbiAqICAgIEV4YW1wbGU6XG4gKiAgICAgICAgZnJ1aXRzID0gWydhcHBsZScsICdiYW5hbmEnLCAnb3JhbmdlJ107XG4gKlxuICogICAgICAgIDx1bD5cbiAqICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBmcnVpdCBvZiBmcnVpdHNcIiBhd05hbWUgZXh0PVwie3tmcnVpdH19XCI+e3tmcnVpdH19PC9saT5cbiAqICAgICAgICA8L3VsPlxuICpcbiAqICAgUmVzdWx0OlxuICogICAgICAgPHVsPlxuICogICAgICAgICAgIDxsaSBhd25hbWU9XCJsaV9hcHBsZVwiPmFwcGxlPC9saT5cbiAqICAgICAgICAgICA8bGkgYXduYW1lPVwibGlfYmFuYW5hXCI+YmFuYW5hPC9saT5cbiAqICAgICAgICAgICA8bGkgYXduYW1lPVwibGlfb3JhbmVcIj5vcmFuZ2U8L2xpPlxuICogICAgICAgPC91bD5cbiAqXG4gKiAqKkFkZGluZyBDb250ZXh0IFRocm91Z2ggQW5jZXN0b3IgSW5zcGVjdGlvbioqXG4gKlxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBjb250ZXh0IHRvIHRoZSBlbGVtZW50IG5hbWluZywgdGhlICdhd05hbWUnIGRpcmVjdGl2ZSBsb29wcyB0aHJvdWdoIHRoZVxuICogcGFyZW50IGFuY2VzdHJ5IGFuZCBzZWFyY2hlcyBmb3IgYW55IHVuaXF1ZSBlbGVtZW50ICdpZCcgdG8gcHJlcGVuZCB0byB0aGUgYmFzZSBuYW1lLlxuICpcbiAqICAgICBFeGFtcGxlOlxuICogICAgICAgICA8Zm9ybSBpZD1cImFwcGxpY2FudFwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlyc3ROYW1lXCIgYXdOYW1lPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBhd05hbWU+XG4gKiAgICAgICAgIDwvZm9ybT5cbiAqICAgICAgICAgPGZvcm0gaWQ9XCJzcG91c2VcIj5cbiAqICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZpcnN0TmFtZVwiIGF3TmFtZT5cbiAqICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxhc3ROYW1lXCIgYXdOYW1lPlxuICogICAgICAgICA8L2Zvcm0+XG4gKlxuICogICAgIFJlc3VsdDpcbiAqICAgICAgICAgPGZvcm0gaWQ9XCJhcHBsaWNhbnRcIj5cbiAqICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZpcnN0TmFtZVwiIGF3bmFtZT1cImFwcGxpY2FudF9pbnB1dF9maXJzdE5hbWVcIj5cbiAqICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxhc3ROYW1lXCIgYXduYW1lPVwiYXBwbGljYW50X2lucHV0X2xhc3ROYW1lXCI+XG4gKiAgICAgICAgIDwvZm9ybT5cbiAqICAgICAgICAgPGZvcm0gaWQ9XCJzcG91c2VcIj5cbiAqICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZpcnN0TmFtZVwiIGF3bmFtZT1cInNwb3VzZV9pbnB1dF9maXJzdE5hbWVcIj5cbiAqICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxhc3ROYW1lXCIgYXduYW1lPVwic3BvdXNlX2lucHV0X2xhc3RuYW1lXCI+XG4gKiAgICAgICAgIDwvZm9ybT5cbiAqXG4gKiAqKlVuaXF1ZW5lc3MgQ2hlY2sqKlxuICpcbiAqICdhd05hbWUnIGtlZXBzIHRyYWNrIG9mIHRoZSBuYW1lcyBpdCBjcmVhdGVzIGJ5IGFkZGluZyB0aGVtIHRvIGEgbWFwIHN0b3JlLiBXaGVuZXZlciBpdFxuICogY3JlYXRlcyBhIG5ldyBuYW1lIGR1cmluZyB0aGUgYG5nT25Jbml0YCBwaGFzZSBpdCBjaGVja3MgaXQgYWdhaW5zdCB0aGUgZXhpc3RpbmcgbWFwLFxuICogYW5kIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgaXQgZW5jb3VudGVycyBhIGR1cGxpY2F0ZS4gTW9yZW92ZXIgZHVyaW5nIHRoZSBlbGVtZW50IGRlc3RydWN0aW9uXG4gKiBwaGFzZSwgYG5nT25EZXN0cm95YCwgJ2F3TmFtZScgcmVtb3ZlcyB0aGUgZ2VuZXJhdGVkIG5hbWUgZnJvbSB0aGUgc3RvcmUuXG4gKlxuICpcbiAqICoqSW4gUHJvZHVjdGlvbioqXG4gKlxuICogVXNpbmcgJ2F3TmFtZScgYWRkcyBhIHNtYWxsIGJpdCBvZiByZW5kZXJpbmcgb3ZlcmhlYWQgZm9yIGVhY2ggZWxlbWVudCBpdCBpcyB1c2VkIG9uLiBJblxuICogYSBwcm9kdWN0aW9uIGVudmlyb25tZW50LCAnYXdOYW1lJyBzZXJ2ZXMgbm8gZnVuY3Rpb25hbGl0eSB0byB0aGUgZW5kIHVzZXIsIGJ1dCBtYXkgaGF2ZVxuICogYSBwZXJmb3JtYW5jZSBpbXBhY3Qgb24gdGhlIGFwcGxpY2F0aW9uLiBBcyBzdWNoLCAnYXdOYW1lJyB0YWtlcyBpbnRvIGFjY291bnQgdGhlXG4gKiBgQXBwQ29uZmlnYCBzZXR0aW5ncyBhbmQgZGlzYWJsZXMgbmFtZSBnZW5lcmF0aW9uIHdoZW4gYEFwcENvbmZpZy5pc1Byb2R1Y3Rpb25Nb2RlKClgXG4gKiBpcyBgdHJ1ZWAuXG4gKlxuICogSW4geW91ciBhcHBsaWNhdGlvbiwgeW91IGNhbiB0dXJuIG9uIHByb2R1Y3Rpb24gbW9kZSBieSBzZXR0aW5nIGBkZXZtb2RlLmVuYWJsZWRgIHRvXG4gKiBgZmFsc2VgIHdoZW4gY29uZmlndXJpbmcgYEFyaWJhQ29yZU1vZHVsZWA6XG4gKlxuICogICAgIEFyaWJhQ29yZU1vZHVsZS5mb3JSb290KHtcbiAqICAgICAgICAgJ2Rldm1vZGUuZW5hYmxlZCc6IGZhbHNlXG4gKiAgICAgfSlcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2F3TmFtZV0nLFxufSlcbmV4cG9ydCBjbGFzcyBBd05hbWVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBleHQ6IHN0cmluZztcblxuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBzZXBhcmF0b3I6IHN0cmluZyA9ICdfJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHN0b3JlOiBBd05hbWVTdG9yZSxcbiAgICAgICAgcHJpdmF0ZSBjb25maWc6IEFwcENvbmZpZ1xuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jcmVhdGVOYW1lKHRoaXMuZWwpO1xuICAgICAgICAgICAgdGhpcy5hZGRFbGVtZW50VG9TdG9yZSh0aGlzLm5hbWUsIHRoaXMuZWwpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXduYW1lJywgdGhpcy5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RvcmUucmVtb3ZlKHRoaXMubmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGVsZW1lbnQgbmFtZS9pZCBhbmQgcmVmZXJlbmNlIHRvIG1hcCBzdG9yZS4gSWYgbmFtZS9pZCBhbHJlYWR5XG4gICAgICogZXhpc3RzIGluIHN0b3JlIHRoZW4gaXQgdGhyb3dzIGFuIGVycm9yLlxuICAgICAqXG4gICAgICovXG4gICAgYWRkRWxlbWVudFRvU3RvcmUobmFtZTogc3RyaW5nLCBlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmFkZChuYW1lLCBlbGVtKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UgKyBgLiBcIiR7bmFtZX1cIiBpcyBhbHJlYWR5IGluIHVzZS5gLCBlbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgbmFtZS9pZCBmb3IgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIHBhcmFtIGVsZW0gUmVmZXJlbmNlIHRvIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIFN0cmluZyBOYW1lL0lEXG4gICAgICovXG4gICAgY3JlYXRlTmFtZShlbGVtOiBFbGVtZW50UmVmKSB7XG5cbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHRoaXMuZ2V0VGFnTmFtZShlbGVtKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGFycmF5IG9mIHN0cmluZyBwYXJ0c1xuICAgICAgICBjb25zdCBwYXJ0cyA9IFtdO1xuXG4gICAgICAgIC8vIEZpbmQgYW5jZXN0b3IgdGFnIGlkLCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgY29uc3QgcGFyZW50SUQgPSB0aGlzLmdldEFuY2VzdG9ySWQoZWxlbSk7XG4gICAgICAgIGlmIChwYXJlbnRJRCkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXJlbnRJRCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB0aGUgdGFnIHR5cGVcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdvcHRpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnROYW1lID0gdGhpcy5nZXRQYXJlbnROYW1lKGVsZW0pO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRhZ25hbWVcbiAgICAgICAgcGFydHMucHVzaCh0YWdOYW1lKTtcblxuICAgICAgICAvLyBDaG9vc2UgaWQgcHJvcGVydHkgaWYgaXQgZXhpc3RzXG4gICAgICAgIGlmIChlbGVtLm5hdGl2ZUVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2goZWxlbS5uYXRpdmVFbGVtZW50LmlkKTtcblxuICAgICAgICAvLyBPdGhlcndpc2UgYnVpbGQgZXh0ZW5zaW9uIGZyb20gdGFnIHByb3BlcnRpZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBhIG5hbWUgYXR0cmlidXRlXG4gICAgICAgICAgICBpZiAoZWxlbS5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XG4gICAgICAgICAgICAgICAgcGFydHMucHVzaChlbGVtLm5hdGl2ZUVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciB2YWx1ZSBhdHRyaWJ1dGUgaWYgJ29wdGlvbicgdGFnXG4gICAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ29wdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuc3BhY2VzVG9VbmRlcnNjb3JlKGVsZW0ubmF0aXZlRWxlbWVudC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY3VzdG9tIGV4dGVuc2lvbiBpZiBpdCBleGlzdHNcbiAgICAgICAgaWYgKHRoaXMuZXh0KSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuc3BhY2VzVG9VbmRlcnNjb3JlKHRoaXMuZXh0KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFydHMuam9pbih0aGlzLnNlcGFyYXRvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRhZyBuYW1lIGZyb20gZWxlbWVudCByZWZlcmVuY2UuXG4gICAgICogQHBhcmFtIGVsZW0gUmVmZXJlbmNlIHRvIGVsZW1lbnRcbiAgICAgKi9cbiAgICBnZXRUYWdOYW1lKGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgcmV0dXJuIGVsZW0ubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhdmVyc2UgZWxlbWVudCBhbmNlc3RyeSBhbmQgcmV0dXJuIGZpcnN0IGlkIGF0dHJpYnV0ZVxuICAgICAqIGVuY291bnRlcmVkLlxuICAgICAqIEBwYXJhbSBlbGVtIFJlZmVyZW5jZSB0byBlbGVtZW50XG4gICAgICovXG4gICAgZ2V0QW5jZXN0b3JJZChlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgbGV0IGlkID0gJyc7XG4gICAgICAgIHdoaWxlIChwYXJlbnQgJiYgIWlkKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBwYXJlbnQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG5hbWUgYXR0cmlidXRlIGZyb20gcGFyZW50IGlmIG5hbWUgYXR0cmlidXRlIGV4aXN0cy5cbiAgICAgKiBAcGFyYW0gZWxlbSBSZWZlcmVuY2UgdG8gZWxlbWVudFxuICAgICAqL1xuICAgIGdldFBhcmVudE5hbWUoZWxlbTogRWxlbWVudFJlZikge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBlbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgcmV0dXJuIChwYXJlbnQubmFtZSAmJiAhcGFyZW50LmlkKSA/IHBhcmVudC5uYW1lIDogbnVsbDtcbiAgICB9XG5cbiAgICBzcGFjZXNUb1VuZGVyc2NvcmUoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMrL2csICdfJyk7XG4gICAgfVxuXG59XG4iXX0=