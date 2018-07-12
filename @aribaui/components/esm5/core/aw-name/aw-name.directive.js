/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        if (!this.config.isProductionMode()) {
            this.name = this.createName(this.el);
            this.addElementToStore(this.name, this.el);
            this.el.nativeElement.setAttribute('awname', this.name);
        }
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
        catch (/** @type {?} */ e) {
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
        var /** @type {?} */ tagName = this.getTagName(elem);
        // Initialize array of string parts
        var /** @type {?} */ parts = [];
        // Find ancestor tag id, if there is one
        var /** @type {?} */ parentID = this.getAncestorId(elem);
        if (parentID) {
            parts.push(parentID);
        }
        // Check the tag type
        if (tagName === 'option') {
            var /** @type {?} */ parentName = this.getParentName(elem);
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
        var /** @type {?} */ parent = elem.nativeElement.parentNode;
        var /** @type {?} */ id = '';
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
        var /** @type {?} */ parent = elem.nativeElement.parentNode;
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
                },] },
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
function AwNameDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctbmFtZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9hdy1uYW1lL2F3LW5hbWUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBRVosTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gsV0FBVyxFQUNkLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkdyQix5QkFDWSxJQUNBLE9BQ0E7UUFGQSxPQUFFLEdBQUYsRUFBRTtRQUNGLFVBQUssR0FBTCxLQUFLO1FBQ0wsV0FBTSxHQUFOLE1BQU07eUJBTFUsR0FBRztLQU0zQjs7OztJQUVKLGtDQUFROzs7SUFBUjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzRDtLQUNKOzs7O0lBRUQscUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUks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VSxDQUFDO1FBQzNDLHFCQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDWixPQUFPLE1BQU0sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNaLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDOUI7UUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDO0tBQ2I7SUFFRDs7O09BR0c7Ozs7OztJQUNILHVDQUFhOzs7OztJQUFiLFVBQWMsSUFBZ0I7UUFDMUIscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUMzRDs7Ozs7SUFFRCw0Q0FBa0I7Ozs7SUFBbEIsVUFBbUIsR0FBVztRQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbkM7O2dCQXZJSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCOzs7O2dCQWhIRyxVQUFVO2dCQVdWLFdBQVc7Z0JBSlgsU0FBUzs7O3NCQTRHUixLQUFLOzswQkFwSFY7O1NBa0hhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFwcENvbmZpZ1xufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuaW1wb3J0IHtcbiAgICBBd05hbWVTdG9yZVxufSBmcm9tICcuL2F3LW5hbWUuc3RvcmUnO1xuXG4vKipcbiAqIFRoZSAnYXdOYW1lJyBkaXJlY3RpdmUgYXR0YWNoZXMgYSBpZGVudGlmaWVyIHRvIGRlY29yYXRlZCBlbGVtZW50IHRvIGFpZCBzZWxlY3RvcnMgZm9yIHRlc3RpbmdcbiAqIHB1cnBvc2VzLiBUaGUgJ2F3TmFtZScgZGlyZWN0aXZlIHRyaWVzIHRvIGdlbmVyYXRlIGEgdW5pcXVlIGlkZW50aWZpZXIgYmFzZWQgb24gY29udGV4dHVhbCBkYXRhXG4gKiBhbmQgaW5oZXJhbnQgaW1tdXRhYmxlIGVsZW1lbnQgYXR0cmlidXRlcy5cbiAqXG4gKiAqKkdlbmVyYXRpbmcgdGhlIEJhc2UgTmFtZSoqXG4gKlxuICogVGhlICdhd05hbWUnIGRpcmVjdGl2ZSBnZW5lcmF0ZXMgYSBiYXNlIG5hbWUgZnJvbSBlbGVtZW50IHRhZyBuYW1lIGFuZCBhdHRyaWJ1dGVzIHdoaWNoIGFyZVxuICogc3RhdGljIGJ5IG5hdHVyZS5cbiAqXG4gKiAgICAgRXhhbXBsZTpcbiAqICAgICAgICAgPGJ1dHRvbiBuYW1lPVwib3JkZXJcIiBhd05hbWU+XG4gKlxuICogICAgIFJlc3VsdDpcbiAqICAgICAgICAgPGJ1dHRvbiBuYW1lPVwib3JkZXJcIiBhd25hbWU9XCJidXR0b25fb3JkZXJcIj5cbiAqXG4gKiBJZiB0aGUgZWxlbWVudCBoYXMgYW4gJ2lkJywgdGhhdCB2YWx1ZSB0YWtlcyBwcmVjZWRlbnQgYW5kIGlzIHVzZWQgaW5zdGVhZCBvZiBhIGdlbmVyYXRlZFxuICogbmFtZS5cbiAqXG4gKiAgICAgRXhhbXBsZTpcbiAqICAgICAgICAgPGJ1dHRvbiBuYW1lPVwib3JkZXJcIiBpZD1cIm15T3JkZXJCdXR0b25cIiBhd05hbWU+XG4gKlxuICogICAgIFJlc3VsdDpcbiAqICAgICAgICAgPGJ1dHRvbiBuYW1lPVwib3JkZXJcIiBpZD1cIm15T3JkZXJCdXR0b25cIiBhd25hbWU9XCJidXR0b25fbXlPcmRlckJ1dHRvblwiPlxuICpcbiAqXG4gKiAqKlJlcGVhdGVkIEVsZW1lbnRzIGFuZCB0aGUgJ2V4dCcgUGFyYW1ldGVyKipcbiAqXG4gKiBUaGVyZSBhcmUgbWFueSBjYXNlcyB3aGVyZSBlbGVtZW50cyBhcmUgZ2VuZXJhdGVkIGR5bmFtaWNhbGx5IGluIHRoZSBjb2RlIGFzIGxpc3RzIG9yIHRhYmxlcy5cbiAqIEluIHN1Y2ggY2FzZXMsIGl0IG1heSBub3QgYmUgZWFzeSB0byBkaXN0aW5ndWlzaCBpbmRpdmlkdWFsIGVsZW1lbnRzIGJ5IHN0YW5kYXJkIEhUTUxcbiAqIGF0dHJpYnV0ZXMsIHNvIHRoZSAnYXdOYW1lJyBkaXJlY3RpdmUgYWxsb3dzIGN1c3RvbSBleHRlbnRpb25zIHRvIHRoZSBiYXNlIG5hbWUgdG8gYmUgcHJvdmlkZWRcbiAqIHVzaW5nIHRoZSAnZXh0JyBhdHRyaWJ1dGUuXG4gKlxuICogICAgRXhhbXBsZTpcbiAqICAgICAgICBmcnVpdHMgPSBbJ2FwcGxlJywgJ2JhbmFuYScsICdvcmFuZ2UnXTtcbiAqXG4gKiAgICAgICAgPHVsPlxuICogICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGZydWl0IG9mIGZydWl0c1wiIGF3TmFtZSBleHQ9XCJ7e2ZydWl0fX1cIj57e2ZydWl0fX08L2xpPlxuICogICAgICAgIDwvdWw+XG4gKlxuICogICBSZXN1bHQ6XG4gKiAgICAgICA8dWw+XG4gKiAgICAgICAgICAgPGxpIGF3bmFtZT1cImxpX2FwcGxlXCI+YXBwbGU8L2xpPlxuICogICAgICAgICAgIDxsaSBhd25hbWU9XCJsaV9iYW5hbmFcIj5iYW5hbmE8L2xpPlxuICogICAgICAgICAgIDxsaSBhd25hbWU9XCJsaV9vcmFuZVwiPm9yYW5nZTwvbGk+XG4gKiAgICAgICA8L3VsPlxuICpcbiAqICoqQWRkaW5nIENvbnRleHQgVGhyb3VnaCBBbmNlc3RvciBJbnNwZWN0aW9uKipcbiAqXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGNvbnRleHQgdG8gdGhlIGVsZW1lbnQgbmFtaW5nLCB0aGUgJ2F3TmFtZScgZGlyZWN0aXZlIGxvb3BzIHRocm91Z2ggdGhlXG4gKiBwYXJlbnQgYW5jZXN0cnkgYW5kIHNlYXJjaGVzIGZvciBhbnkgdW5pcXVlIGVsZW1lbnQgJ2lkJyB0byBwcmVwZW5kIHRvIHRoZSBiYXNlIG5hbWUuXG4gKlxuICogICAgIEV4YW1wbGU6XG4gKiAgICAgICAgIDxmb3JtIGlkPVwiYXBwbGljYW50XCI+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJmaXJzdE5hbWVcIiBhd05hbWU+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0TmFtZVwiIGF3TmFtZT5cbiAqICAgICAgICAgPC9mb3JtPlxuICogICAgICAgICA8Zm9ybSBpZD1cInNwb3VzZVwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlyc3ROYW1lXCIgYXdOYW1lPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBhd05hbWU+XG4gKiAgICAgICAgIDwvZm9ybT5cbiAqXG4gKiAgICAgUmVzdWx0OlxuICogICAgICAgICA8Zm9ybSBpZD1cImFwcGxpY2FudFwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlyc3ROYW1lXCIgYXduYW1lPVwiYXBwbGljYW50X2lucHV0X2ZpcnN0TmFtZVwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBhd25hbWU9XCJhcHBsaWNhbnRfaW5wdXRfbGFzdE5hbWVcIj5cbiAqICAgICAgICAgPC9mb3JtPlxuICogICAgICAgICA8Zm9ybSBpZD1cInNwb3VzZVwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlyc3ROYW1lXCIgYXduYW1lPVwic3BvdXNlX2lucHV0X2ZpcnN0TmFtZVwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBhd25hbWU9XCJzcG91c2VfaW5wdXRfbGFzdG5hbWVcIj5cbiAqICAgICAgICAgPC9mb3JtPlxuICpcbiAqICoqVW5pcXVlbmVzcyBDaGVjayoqXG4gKlxuICogJ2F3TmFtZScga2VlcHMgdHJhY2sgb2YgdGhlIG5hbWVzIGl0IGNyZWF0ZXMgYnkgYWRkaW5nIHRoZW0gdG8gYSBtYXAgc3RvcmUuIFdoZW5ldmVyIGl0XG4gKiBjcmVhdGVzIGEgbmV3IG5hbWUgZHVyaW5nIHRoZSBgbmdPbkluaXRgIHBoYXNlIGl0IGNoZWNrcyBpdCBhZ2FpbnN0IHRoZSBleGlzdGluZyBtYXAsXG4gKiBhbmQgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiBpdCBlbmNvdW50ZXJzIGEgZHVwbGljYXRlLiBNb3Jlb3ZlciBkdXJpbmcgdGhlIGVsZW1lbnQgZGVzdHJ1Y3Rpb25cbiAqIHBoYXNlLCBgbmdPbkRlc3Ryb3lgLCAnYXdOYW1lJyByZW1vdmVzIHRoZSBnZW5lcmF0ZWQgbmFtZSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKlxuICogKipJbiBQcm9kdWN0aW9uKipcbiAqXG4gKiBVc2luZyAnYXdOYW1lJyBhZGRzIGEgc21hbGwgYml0IG9mIHJlbmRlcmluZyBvdmVyaGVhZCBmb3IgZWFjaCBlbGVtZW50IGl0IGlzIHVzZWQgb24uIEluXG4gKiBhIHByb2R1Y3Rpb24gZW52aXJvbm1lbnQsICdhd05hbWUnIHNlcnZlcyBubyBmdW5jdGlvbmFsaXR5IHRvIHRoZSBlbmQgdXNlciwgYnV0IG1heSBoYXZlXG4gKiBhIHBlcmZvcm1hbmNlIGltcGFjdCBvbiB0aGUgYXBwbGljYXRpb24uIEFzIHN1Y2gsICdhd05hbWUnIHRha2VzIGludG8gYWNjb3VudCB0aGVcbiAqIGBBcHBDb25maWdgIHNldHRpbmdzIGFuZCBkaXNhYmxlcyBuYW1lIGdlbmVyYXRpb24gd2hlbiBgQXBwQ29uZmlnLmlzUHJvZHVjdGlvbk1vZGUoKWBcbiAqIGlzIGB0cnVlYC5cbiAqXG4gKiBJbiB5b3VyIGFwcGxpY2F0aW9uLCB5b3UgY2FuIHR1cm4gb24gcHJvZHVjdGlvbiBtb2RlIGJ5IHNldHRpbmcgYGRldm1vZGUuZW5hYmxlZGAgdG9cbiAqIGBmYWxzZWAgd2hlbiBjb25maWd1cmluZyBgQXJpYmFDb3JlTW9kdWxlYDpcbiAqXG4gKiAgICAgQXJpYmFDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICogICAgICAgICAnZGV2bW9kZS5lbmFibGVkJzogZmFsc2VcbiAqICAgICB9KVxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbYXdOYW1lXScsXG59KVxuZXhwb3J0IGNsYXNzIEF3TmFtZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGV4dDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvcjogc3RyaW5nID0gJ18nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgc3RvcmU6IEF3TmFtZVN0b3JlLFxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQXBwQ29uZmlnXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuaXNQcm9kdWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNyZWF0ZU5hbWUodGhpcy5lbCk7XG4gICAgICAgICAgICB0aGlzLmFkZEVsZW1lbnRUb1N0b3JlKHRoaXMubmFtZSwgdGhpcy5lbCk7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhd25hbWUnLCB0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RvcmUucmVtb3ZlKHRoaXMubmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGVsZW1lbnQgbmFtZS9pZCBhbmQgcmVmZXJlbmNlIHRvIG1hcCBzdG9yZS4gSWYgbmFtZS9pZCBhbHJlYWR5XG4gICAgICogZXhpc3RzIGluIHN0b3JlIHRoZW4gaXQgdGhyb3dzIGFuIGVycm9yLlxuICAgICAqXG4gICAgICovXG4gICAgYWRkRWxlbWVudFRvU3RvcmUobmFtZTogc3RyaW5nLCBlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmFkZChuYW1lLCBlbGVtKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UgKyBgLiBcIiR7bmFtZX1cIiBpcyBhbHJlYWR5IGluIHVzZS5gLCBlbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgbmFtZS9pZCBmb3IgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIHBhcmFtIGVsZW0gUmVmZXJlbmNlIHRvIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIFN0cmluZyBOYW1lL0lEXG4gICAgICovXG4gICAgY3JlYXRlTmFtZShlbGVtOiBFbGVtZW50UmVmKSB7XG5cbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHRoaXMuZ2V0VGFnTmFtZShlbGVtKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGFycmF5IG9mIHN0cmluZyBwYXJ0c1xuICAgICAgICBjb25zdCBwYXJ0cyA9IFtdO1xuXG4gICAgICAgIC8vIEZpbmQgYW5jZXN0b3IgdGFnIGlkLCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgY29uc3QgcGFyZW50SUQgPSB0aGlzLmdldEFuY2VzdG9ySWQoZWxlbSk7XG4gICAgICAgIGlmIChwYXJlbnRJRCkge1xuICAgICAgICAgICAgcGFydHMucHVzaChwYXJlbnRJRCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB0aGUgdGFnIHR5cGVcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdvcHRpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnROYW1lID0gdGhpcy5nZXRQYXJlbnROYW1lKGVsZW0pO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRhZ25hbWVcbiAgICAgICAgcGFydHMucHVzaCh0YWdOYW1lKTtcblxuICAgICAgICAvLyBDaG9vc2UgaWQgcHJvcGVydHkgaWYgaXQgZXhpc3RzXG4gICAgICAgIGlmIChlbGVtLm5hdGl2ZUVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2goZWxlbS5uYXRpdmVFbGVtZW50LmlkKTtcblxuICAgICAgICAvLyBPdGhlcndpc2UgYnVpbGQgZXh0ZW5zaW9uIGZyb20gdGFnIHByb3BlcnRpZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciBhIG5hbWUgYXR0cmlidXRlXG4gICAgICAgICAgICBpZiAoZWxlbS5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbmFtZScpKSB7XG4gICAgICAgICAgICAgICAgcGFydHMucHVzaChlbGVtLm5hdGl2ZUVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGZvciB2YWx1ZSBhdHRyaWJ1dGUgaWYgJ29wdGlvbicgdGFnXG4gICAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ29wdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuc3BhY2VzVG9VbmRlcnNjb3JlKGVsZW0ubmF0aXZlRWxlbWVudC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY3VzdG9tIGV4dGVuc2lvbiBpZiBpdCBleGlzdHNcbiAgICAgICAgaWYgKHRoaXMuZXh0KSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuc3BhY2VzVG9VbmRlcnNjb3JlKHRoaXMuZXh0KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFydHMuam9pbih0aGlzLnNlcGFyYXRvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRhZyBuYW1lIGZyb20gZWxlbWVudCByZWZlcmVuY2UuXG4gICAgICogQHBhcmFtIGVsZW0gUmVmZXJlbmNlIHRvIGVsZW1lbnRcbiAgICAgKi9cbiAgICBnZXRUYWdOYW1lKGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgcmV0dXJuIGVsZW0ubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhdmVyc2UgZWxlbWVudCBhbmNlc3RyeSBhbmQgcmV0dXJuIGZpcnN0IGlkIGF0dHJpYnV0ZVxuICAgICAqIGVuY291bnRlcmVkLlxuICAgICAqIEBwYXJhbSBlbGVtIFJlZmVyZW5jZSB0byBlbGVtZW50XG4gICAgICovXG4gICAgZ2V0QW5jZXN0b3JJZChlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSBlbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgbGV0IGlkID0gJyc7XG4gICAgICAgIHdoaWxlIChwYXJlbnQgJiYgIWlkKSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBwYXJlbnQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG5hbWUgYXR0cmlidXRlIGZyb20gcGFyZW50IGlmIG5hbWUgYXR0cmlidXRlIGV4aXN0cy5cbiAgICAgKiBAcGFyYW0gZWxlbSBSZWZlcmVuY2UgdG8gZWxlbWVudFxuICAgICAqL1xuICAgIGdldFBhcmVudE5hbWUoZWxlbTogRWxlbWVudFJlZikge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBlbGVtLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgcmV0dXJuIChwYXJlbnQubmFtZSAmJiAhcGFyZW50LmlkKSA/IHBhcmVudC5uYW1lIDogbnVsbDtcbiAgICB9XG5cbiAgICBzcGFjZXNUb1VuZGVyc2NvcmUoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMrL2csICdfJyk7XG4gICAgfVxuXG59XG4iXX0=