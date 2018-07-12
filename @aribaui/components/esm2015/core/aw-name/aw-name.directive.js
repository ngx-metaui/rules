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
export class AwNameDirective {
    /**
     * @param {?} el
     * @param {?} store
     * @param {?} config
     */
    constructor(el, store, config) {
        this.el = el;
        this.store = store;
        this.config = config;
        this.separator = '_';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.config.isProductionMode()) {
            this.name = this.createName(this.el);
            this.addElementToStore(this.name, this.el);
            this.el.nativeElement.setAttribute('awname', this.name);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.store.remove(this.name);
    }
    /**
     * Add element name/id and reference to map store. If name/id already
     * exists in store then it throws an error.
     *
     * @param {?} name
     * @param {?} elem
     * @return {?}
     */
    addElementToStore(name, elem) {
        try {
            this.store.add(name, elem);
        }
        catch (/** @type {?} */ e) {
            console.error(e.message + `. "${name}" is already in use.`, elem.nativeElement);
            return;
        }
    }
    /**
     * Generate name/id for element.
     *
     * param elem Reference to element
     * @param {?} elem
     * @return {?} String Name/ID
     */
    createName(elem) {
        const /** @type {?} */ tagName = this.getTagName(elem);
        // Initialize array of string parts
        const /** @type {?} */ parts = [];
        // Find ancestor tag id, if there is one
        const /** @type {?} */ parentID = this.getAncestorId(elem);
        if (parentID) {
            parts.push(parentID);
        }
        // Check the tag type
        if (tagName === 'option') {
            const /** @type {?} */ parentName = this.getParentName(elem);
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
    }
    /**
     * Get tag name from element reference.
     * @param {?} elem Reference to element
     * @return {?}
     */
    getTagName(elem) {
        return elem.nativeElement.tagName.toLowerCase();
    }
    /**
     * Traverse element ancestry and return first id attribute
     * encountered.
     * @param {?} elem Reference to element
     * @return {?}
     */
    getAncestorId(elem) {
        let /** @type {?} */ parent = elem.nativeElement.parentNode;
        let /** @type {?} */ id = '';
        while (parent && !id) {
            if (parent.id) {
                id = parent.id;
            }
            parent = parent.parentNode;
        }
        return id;
    }
    /**
     * Get name attribute from parent if name attribute exists.
     * @param {?} elem Reference to element
     * @return {?}
     */
    getParentName(elem) {
        const /** @type {?} */ parent = elem.nativeElement.parentNode;
        return (parent.name && !parent.id) ? parent.name : null;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    spacesToUnderscore(str) {
        return str.replace(/\s+/g, '_');
    }
}
AwNameDirective.decorators = [
    { type: Directive, args: [{
                selector: '[awName]',
            },] },
];
/** @nocollapse */
AwNameDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: AwNameStore },
    { type: AppConfig }
];
AwNameDirective.propDecorators = {
    ext: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctbmFtZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9hdy1uYW1lL2F3LW5hbWUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBRVosTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gsV0FBVyxFQUNkLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxR3pCLE1BQU07Ozs7OztJQVFGLFlBQ1ksSUFDQSxPQUNBO1FBRkEsT0FBRSxHQUFGLEVBQUU7UUFDRixVQUFLLEdBQUwsS0FBSztRQUNMLFdBQU0sR0FBTixNQUFNO3lCQUxVLEdBQUc7S0FNM0I7Ozs7SUFFSixRQUFRO1FBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNEO0tBQ0o7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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QUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDWixFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUNsQjtZQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQzlCO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNiOzs7Ozs7SUFNRCxhQUFhLENBQUMsSUFBZ0I7UUFDMUIsdUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUMzRDs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxHQUFXO1FBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNuQzs7O1lBdklKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTthQUN2Qjs7OztZQWhIRyxVQUFVO1lBV1YsV0FBVztZQUpYLFNBQVM7OztrQkE0R1IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQXBwQ29uZmlnXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEF3TmFtZVN0b3JlXG59IGZyb20gJy4vYXctbmFtZS5zdG9yZSc7XG5cbi8qKlxuICogVGhlICdhd05hbWUnIGRpcmVjdGl2ZSBhdHRhY2hlcyBhIGlkZW50aWZpZXIgdG8gZGVjb3JhdGVkIGVsZW1lbnQgdG8gYWlkIHNlbGVjdG9ycyBmb3IgdGVzdGluZ1xuICogcHVycG9zZXMuIFRoZSAnYXdOYW1lJyBkaXJlY3RpdmUgdHJpZXMgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgaWRlbnRpZmllciBiYXNlZCBvbiBjb250ZXh0dWFsIGRhdGFcbiAqIGFuZCBpbmhlcmFudCBpbW11dGFibGUgZWxlbWVudCBhdHRyaWJ1dGVzLlxuICpcbiAqICoqR2VuZXJhdGluZyB0aGUgQmFzZSBOYW1lKipcbiAqXG4gKiBUaGUgJ2F3TmFtZScgZGlyZWN0aXZlIGdlbmVyYXRlcyBhIGJhc2UgbmFtZSBmcm9tIGVsZW1lbnQgdGFnIG5hbWUgYW5kIGF0dHJpYnV0ZXMgd2hpY2ggYXJlXG4gKiBzdGF0aWMgYnkgbmF0dXJlLlxuICpcbiAqICAgICBFeGFtcGxlOlxuICogICAgICAgICA8YnV0dG9uIG5hbWU9XCJvcmRlclwiIGF3TmFtZT5cbiAqXG4gKiAgICAgUmVzdWx0OlxuICogICAgICAgICA8YnV0dG9uIG5hbWU9XCJvcmRlclwiIGF3bmFtZT1cImJ1dHRvbl9vcmRlclwiPlxuICpcbiAqIElmIHRoZSBlbGVtZW50IGhhcyBhbiAnaWQnLCB0aGF0IHZhbHVlIHRha2VzIHByZWNlZGVudCBhbmQgaXMgdXNlZCBpbnN0ZWFkIG9mIGEgZ2VuZXJhdGVkXG4gKiBuYW1lLlxuICpcbiAqICAgICBFeGFtcGxlOlxuICogICAgICAgICA8YnV0dG9uIG5hbWU9XCJvcmRlclwiIGlkPVwibXlPcmRlckJ1dHRvblwiIGF3TmFtZT5cbiAqXG4gKiAgICAgUmVzdWx0OlxuICogICAgICAgICA8YnV0dG9uIG5hbWU9XCJvcmRlclwiIGlkPVwibXlPcmRlckJ1dHRvblwiIGF3bmFtZT1cImJ1dHRvbl9teU9yZGVyQnV0dG9uXCI+XG4gKlxuICpcbiAqICoqUmVwZWF0ZWQgRWxlbWVudHMgYW5kIHRoZSAnZXh0JyBQYXJhbWV0ZXIqKlxuICpcbiAqIFRoZXJlIGFyZSBtYW55IGNhc2VzIHdoZXJlIGVsZW1lbnRzIGFyZSBnZW5lcmF0ZWQgZHluYW1pY2FsbHkgaW4gdGhlIGNvZGUgYXMgbGlzdHMgb3IgdGFibGVzLlxuICogSW4gc3VjaCBjYXNlcywgaXQgbWF5IG5vdCBiZSBlYXN5IHRvIGRpc3Rpbmd1aXNoIGluZGl2aWR1YWwgZWxlbWVudHMgYnkgc3RhbmRhcmQgSFRNTFxuICogYXR0cmlidXRlcywgc28gdGhlICdhd05hbWUnIGRpcmVjdGl2ZSBhbGxvd3MgY3VzdG9tIGV4dGVudGlvbnMgdG8gdGhlIGJhc2UgbmFtZSB0byBiZSBwcm92aWRlZFxuICogdXNpbmcgdGhlICdleHQnIGF0dHJpYnV0ZS5cbiAqXG4gKiAgICBFeGFtcGxlOlxuICogICAgICAgIGZydWl0cyA9IFsnYXBwbGUnLCAnYmFuYW5hJywgJ29yYW5nZSddO1xuICpcbiAqICAgICAgICA8dWw+XG4gKiAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgZnJ1aXQgb2YgZnJ1aXRzXCIgYXdOYW1lIGV4dD1cInt7ZnJ1aXR9fVwiPnt7ZnJ1aXR9fTwvbGk+XG4gKiAgICAgICAgPC91bD5cbiAqXG4gKiAgIFJlc3VsdDpcbiAqICAgICAgIDx1bD5cbiAqICAgICAgICAgICA8bGkgYXduYW1lPVwibGlfYXBwbGVcIj5hcHBsZTwvbGk+XG4gKiAgICAgICAgICAgPGxpIGF3bmFtZT1cImxpX2JhbmFuYVwiPmJhbmFuYTwvbGk+XG4gKiAgICAgICAgICAgPGxpIGF3bmFtZT1cImxpX29yYW5lXCI+b3JhbmdlPC9saT5cbiAqICAgICAgIDwvdWw+XG4gKlxuICogKipBZGRpbmcgQ29udGV4dCBUaHJvdWdoIEFuY2VzdG9yIEluc3BlY3Rpb24qKlxuICpcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgY29udGV4dCB0byB0aGUgZWxlbWVudCBuYW1pbmcsIHRoZSAnYXdOYW1lJyBkaXJlY3RpdmUgbG9vcHMgdGhyb3VnaCB0aGVcbiAqIHBhcmVudCBhbmNlc3RyeSBhbmQgc2VhcmNoZXMgZm9yIGFueSB1bmlxdWUgZWxlbWVudCAnaWQnIHRvIHByZXBlbmQgdG8gdGhlIGJhc2UgbmFtZS5cbiAqXG4gKiAgICAgRXhhbXBsZTpcbiAqICAgICAgICAgPGZvcm0gaWQ9XCJhcHBsaWNhbnRcIj5cbiAqICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZpcnN0TmFtZVwiIGF3TmFtZT5cbiAqICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxhc3ROYW1lXCIgYXdOYW1lPlxuICogICAgICAgICA8L2Zvcm0+XG4gKiAgICAgICAgIDxmb3JtIGlkPVwic3BvdXNlXCI+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJmaXJzdE5hbWVcIiBhd05hbWU+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0TmFtZVwiIGF3TmFtZT5cbiAqICAgICAgICAgPC9mb3JtPlxuICpcbiAqICAgICBSZXN1bHQ6XG4gKiAgICAgICAgIDxmb3JtIGlkPVwiYXBwbGljYW50XCI+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJmaXJzdE5hbWVcIiBhd25hbWU9XCJhcHBsaWNhbnRfaW5wdXRfZmlyc3ROYW1lXCI+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0TmFtZVwiIGF3bmFtZT1cImFwcGxpY2FudF9pbnB1dF9sYXN0TmFtZVwiPlxuICogICAgICAgICA8L2Zvcm0+XG4gKiAgICAgICAgIDxmb3JtIGlkPVwic3BvdXNlXCI+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJmaXJzdE5hbWVcIiBhd25hbWU9XCJzcG91c2VfaW5wdXRfZmlyc3ROYW1lXCI+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0TmFtZVwiIGF3bmFtZT1cInNwb3VzZV9pbnB1dF9sYXN0bmFtZVwiPlxuICogICAgICAgICA8L2Zvcm0+XG4gKlxuICogKipVbmlxdWVuZXNzIENoZWNrKipcbiAqXG4gKiAnYXdOYW1lJyBrZWVwcyB0cmFjayBvZiB0aGUgbmFtZXMgaXQgY3JlYXRlcyBieSBhZGRpbmcgdGhlbSB0byBhIG1hcCBzdG9yZS4gV2hlbmV2ZXIgaXRcbiAqIGNyZWF0ZXMgYSBuZXcgbmFtZSBkdXJpbmcgdGhlIGBuZ09uSW5pdGAgcGhhc2UgaXQgY2hlY2tzIGl0IGFnYWluc3QgdGhlIGV4aXN0aW5nIG1hcCxcbiAqIGFuZCB3aWxsIHRocm93IGFuIGVycm9yIGlmIGl0IGVuY291bnRlcnMgYSBkdXBsaWNhdGUuIE1vcmVvdmVyIGR1cmluZyB0aGUgZWxlbWVudCBkZXN0cnVjdGlvblxuICogcGhhc2UsIGBuZ09uRGVzdHJveWAsICdhd05hbWUnIHJlbW92ZXMgdGhlIGdlbmVyYXRlZCBuYW1lIGZyb20gdGhlIHN0b3JlLlxuICpcbiAqXG4gKiAqKkluIFByb2R1Y3Rpb24qKlxuICpcbiAqIFVzaW5nICdhd05hbWUnIGFkZHMgYSBzbWFsbCBiaXQgb2YgcmVuZGVyaW5nIG92ZXJoZWFkIGZvciBlYWNoIGVsZW1lbnQgaXQgaXMgdXNlZCBvbi4gSW5cbiAqIGEgcHJvZHVjdGlvbiBlbnZpcm9ubWVudCwgJ2F3TmFtZScgc2VydmVzIG5vIGZ1bmN0aW9uYWxpdHkgdG8gdGhlIGVuZCB1c2VyLCBidXQgbWF5IGhhdmVcbiAqIGEgcGVyZm9ybWFuY2UgaW1wYWN0IG9uIHRoZSBhcHBsaWNhdGlvbi4gQXMgc3VjaCwgJ2F3TmFtZScgdGFrZXMgaW50byBhY2NvdW50IHRoZVxuICogYEFwcENvbmZpZ2Agc2V0dGluZ3MgYW5kIGRpc2FibGVzIG5hbWUgZ2VuZXJhdGlvbiB3aGVuIGBBcHBDb25maWcuaXNQcm9kdWN0aW9uTW9kZSgpYFxuICogaXMgYHRydWVgLlxuICpcbiAqIEluIHlvdXIgYXBwbGljYXRpb24sIHlvdSBjYW4gdHVybiBvbiBwcm9kdWN0aW9uIG1vZGUgYnkgc2V0dGluZyBgZGV2bW9kZS5lbmFibGVkYCB0b1xuICogYGZhbHNlYCB3aGVuIGNvbmZpZ3VyaW5nIGBBcmliYUNvcmVNb2R1bGVgOlxuICpcbiAqICAgICBBcmliYUNvcmVNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgICAgICdkZXZtb2RlLmVuYWJsZWQnOiBmYWxzZVxuICogICAgIH0pXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1thd05hbWVdJyxcbn0pXG5leHBvcnQgY2xhc3MgQXdOYW1lRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZXh0OiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcblxuICAgIHByaXZhdGUgc2VwYXJhdG9yOiBzdHJpbmcgPSAnXyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBzdG9yZTogQXdOYW1lU3RvcmUsXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBBcHBDb25maWdcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5pc1Byb2R1Y3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY3JlYXRlTmFtZSh0aGlzLmVsKTtcbiAgICAgICAgICAgIHRoaXMuYWRkRWxlbWVudFRvU3RvcmUodGhpcy5uYW1lLCB0aGlzLmVsKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2F3bmFtZScsIHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdG9yZS5yZW1vdmUodGhpcy5uYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgZWxlbWVudCBuYW1lL2lkIGFuZCByZWZlcmVuY2UgdG8gbWFwIHN0b3JlLiBJZiBuYW1lL2lkIGFscmVhZHlcbiAgICAgKiBleGlzdHMgaW4gc3RvcmUgdGhlbiBpdCB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGRFbGVtZW50VG9TdG9yZShuYW1lOiBzdHJpbmcsIGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuYWRkKG5hbWUsIGVsZW0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSArIGAuIFwiJHtuYW1lfVwiIGlzIGFscmVhZHkgaW4gdXNlLmAsIGVsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBuYW1lL2lkIGZvciBlbGVtZW50LlxuICAgICAqXG4gICAgICogcGFyYW0gZWxlbSBSZWZlcmVuY2UgdG8gZWxlbWVudFxuICAgICAqIEByZXR1cm4gU3RyaW5nIE5hbWUvSURcbiAgICAgKi9cbiAgICBjcmVhdGVOYW1lKGVsZW06IEVsZW1lbnRSZWYpIHtcblxuICAgICAgICBjb25zdCB0YWdOYW1lID0gdGhpcy5nZXRUYWdOYW1lKGVsZW0pO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgYXJyYXkgb2Ygc3RyaW5nIHBhcnRzXG4gICAgICAgIGNvbnN0IHBhcnRzID0gW107XG5cbiAgICAgICAgLy8gRmluZCBhbmNlc3RvciB0YWcgaWQsIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICBjb25zdCBwYXJlbnRJRCA9IHRoaXMuZ2V0QW5jZXN0b3JJZChlbGVtKTtcbiAgICAgICAgaWYgKHBhcmVudElEKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcmVudElEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHRoZSB0YWcgdHlwZVxuICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ29wdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudE5hbWUgPSB0aGlzLmdldFBhcmVudE5hbWUoZWxlbSk7XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIHBhcnRzLnB1c2gocGFyZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgdGFnbmFtZVxuICAgICAgICBwYXJ0cy5wdXNoKHRhZ05hbWUpO1xuXG4gICAgICAgIC8vIENob29zZSBpZCBwcm9wZXJ0eSBpZiBpdCBleGlzdHNcbiAgICAgICAgaWYgKGVsZW0ubmF0aXZlRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgcGFydHMucHVzaChlbGVtLm5hdGl2ZUVsZW1lbnQuaWQpO1xuXG4gICAgICAgIC8vIE90aGVyd2lzZSBidWlsZCBleHRlbnNpb24gZnJvbSB0YWcgcHJvcGVydGllc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGEgbmFtZSBhdHRyaWJ1dGVcbiAgICAgICAgICAgIGlmIChlbGVtLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCduYW1lJykpIHtcbiAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKGVsZW0ubmF0aXZlRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHZhbHVlIGF0dHJpYnV0ZSBpZiAnb3B0aW9uJyB0YWdcbiAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnb3B0aW9uJykge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2godGhpcy5zcGFjZXNUb1VuZGVyc2NvcmUoZWxlbS5uYXRpdmVFbGVtZW50LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBjdXN0b20gZXh0ZW5zaW9uIGlmIGl0IGV4aXN0c1xuICAgICAgICBpZiAodGhpcy5leHQpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2godGhpcy5zcGFjZXNUb1VuZGVyc2NvcmUodGhpcy5leHQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKHRoaXMuc2VwYXJhdG9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGFnIG5hbWUgZnJvbSBlbGVtZW50IHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gZWxlbSBSZWZlcmVuY2UgdG8gZWxlbWVudFxuICAgICAqL1xuICAgIGdldFRhZ05hbWUoZWxlbTogRWxlbWVudFJlZikge1xuICAgICAgICByZXR1cm4gZWxlbS5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmF2ZXJzZSBlbGVtZW50IGFuY2VzdHJ5IGFuZCByZXR1cm4gZmlyc3QgaWQgYXR0cmlidXRlXG4gICAgICogZW5jb3VudGVyZWQuXG4gICAgICogQHBhcmFtIGVsZW0gUmVmZXJlbmNlIHRvIGVsZW1lbnRcbiAgICAgKi9cbiAgICBnZXRBbmNlc3RvcklkKGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICBsZXQgaWQgPSAnJztcbiAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhaWQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICBpZCA9IHBhcmVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbmFtZSBhdHRyaWJ1dGUgZnJvbSBwYXJlbnQgaWYgbmFtZSBhdHRyaWJ1dGUgZXhpc3RzLlxuICAgICAqIEBwYXJhbSBlbGVtIFJlZmVyZW5jZSB0byBlbGVtZW50XG4gICAgICovXG4gICAgZ2V0UGFyZW50TmFtZShlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICByZXR1cm4gKHBhcmVudC5uYW1lICYmICFwYXJlbnQuaWQpID8gcGFyZW50Lm5hbWUgOiBudWxsO1xuICAgIH1cblxuICAgIHNwYWNlc1RvVW5kZXJzY29yZShzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccysvZywgJ18nKTtcbiAgICB9XG5cbn1cbiJdfQ==