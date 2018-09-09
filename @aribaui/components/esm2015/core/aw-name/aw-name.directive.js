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
        this.name = this.createName(this.el);
        this.addElementToStore(this.name, this.el);
        this.el.nativeElement.setAttribute('awname', this.name);
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
        catch (e) {
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
        /** @type {?} */
        const tagName = this.getTagName(elem);
        /** @type {?} */
        const parts = [];
        /** @type {?} */
        const parentID = this.getAncestorId(elem);
        if (parentID) {
            parts.push(parentID);
        }
        // Check the tag type
        if (tagName === 'option') {
            /** @type {?} */
            const parentName = this.getParentName(elem);
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
        /** @type {?} */
        let parent = elem.nativeElement.parentNode;
        /** @type {?} */
        let id = '';
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
        /** @type {?} */
        const parent = elem.nativeElement.parentNode;
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
            },] }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctbmFtZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9hdy1uYW1lL2F3LW5hbWUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBRVosTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gsV0FBVyxFQUNkLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxR3pCLE1BQU07Ozs7OztJQVFGLFlBQ1ksSUFDQSxPQUNBO1FBRkEsT0FBRSxHQUFGLEVBQUU7UUFDRixVQUFLLEdBQUwsS0FBSztRQUNMLFdBQU0sR0FBTixNQUFNO3lCQUxVLEdBQUc7S0FNM0I7Ozs7SUFFSixRQUFRO1FBQ0EsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0Q7Ozs7SUFFTCxXQUFXO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hDOzs7Ozs7Ozs7SUFPRCxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsSUFBZ0I7UUFDNUMsSUFBSSxDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlCO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLHNCQUFzQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNoRixNQUFNLENBQUM7U0FDVjtLQUNKOzs7Ozs7OztJQVFELFVBQVUsQ0FBQyxJQUFnQjs7UUFFdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFHdEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDOztRQUdqQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3hCOztRQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDOztZQUN2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQjtTQUNKOztRQUdELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBR3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7O1NBR3JDO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBRUosRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7O1lBR0QsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUNqRTthQUNKO1NBQ0o7O1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqRDtRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNyQzs7Ozs7O0lBTUQsVUFBVSxDQUFDLElBQWdCO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNuRDs7Ozs7OztJQU9ELGFBQWEsQ0FBQyxJQUFnQjs7UUFDMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7O1FBQzNDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNaLE9BQU8sTUFBTSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDbEI7WUFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUM5QjtRQUNELE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDYjs7Ozs7O0lBTUQsYUFBYSxDQUFDLElBQWdCOztRQUMxQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDM0Q7Ozs7O0lBRUQsa0JBQWtCLENBQUMsR0FBVztRQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDbkM7OztZQXJJSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7YUFDdkI7Ozs7WUFoSEcsVUFBVTtZQVdWLFdBQVc7WUFKWCxTQUFTOzs7a0JBNEdSLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEFwcENvbmZpZ1xufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuaW1wb3J0IHtcbiAgICBBd05hbWVTdG9yZVxufSBmcm9tICcuL2F3LW5hbWUuc3RvcmUnO1xuXG4vKipcbiAqIFRoZSAnYXdOYW1lJyBkaXJlY3RpdmUgYXR0YWNoZXMgYSBpZGVudGlmaWVyIHRvIGRlY29yYXRlZCBlbGVtZW50IHRvIGFpZCBzZWxlY3RvcnMgZm9yIHRlc3RpbmdcbiAqIHB1cnBvc2VzLiBUaGUgJ2F3TmFtZScgZGlyZWN0aXZlIHRyaWVzIHRvIGdlbmVyYXRlIGEgdW5pcXVlIGlkZW50aWZpZXIgYmFzZWQgb24gY29udGV4dHVhbCBkYXRhXG4gKiBhbmQgaW5oZXJhbnQgaW1tdXRhYmxlIGVsZW1lbnQgYXR0cmlidXRlcy5cbiAqXG4gKiAqKkdlbmVyYXRpbmcgdGhlIEJhc2UgTmFtZSoqXG4gKlxuICogVGhlICdhd05hbWUnIGRpcmVjdGl2ZSBnZW5lcmF0ZXMgYSBiYXNlIG5hbWUgZnJvbSBlbGVtZW50IHRhZyBuYW1lIGFuZCBhdHRyaWJ1dGVzIHdoaWNoIGFyZVxuICogc3RhdGljIGJ5IG5hdHVyZS5cbiAqXG4gKiAgICAgRXhhbXBsZTpcbiAqICAgICAgICAgPGJ1dHRvbiBuYW1lPVwib3JkZXJcIiBhd05hbWU+XG4gKlxuICogICAgIFJlc3VsdDpcbiAqICAgICAgICAgPGJ1dHRvbiBuYW1lPVwib3JkZXJcIiBhd25hbWU9XCJidXR0b25fb3JkZXJcIj5cbiAqXG4gKiBJZiB0aGUgZWxlbWVudCBoYXMgYW4gJ2lkJywgdGhhdCB2YWx1ZSB0YWtlcyBwcmVjZWRlbnQgYW5kIGlzIHVzZWQgaW5zdGVhZCBvZiBhIGdlbmVyYXRlZFxuICogbmFtZS5cbiAqXG4gKiAgICAgRXhhbXBsZTpcbiAqICAgICAgICAgPGJ1dHRvbiBuYW1lPVwib3JkZXJcIiBpZD1cIm15T3JkZXJCdXR0b25cIiBhd05hbWU+XG4gKlxuICogICAgIFJlc3VsdDpcbiAqICAgICAgICAgPGJ1dHRvbiBuYW1lPVwib3JkZXJcIiBpZD1cIm15T3JkZXJCdXR0b25cIiBhd25hbWU9XCJidXR0b25fbXlPcmRlckJ1dHRvblwiPlxuICpcbiAqXG4gKiAqKlJlcGVhdGVkIEVsZW1lbnRzIGFuZCB0aGUgJ2V4dCcgUGFyYW1ldGVyKipcbiAqXG4gKiBUaGVyZSBhcmUgbWFueSBjYXNlcyB3aGVyZSBlbGVtZW50cyBhcmUgZ2VuZXJhdGVkIGR5bmFtaWNhbGx5IGluIHRoZSBjb2RlIGFzIGxpc3RzIG9yIHRhYmxlcy5cbiAqIEluIHN1Y2ggY2FzZXMsIGl0IG1heSBub3QgYmUgZWFzeSB0byBkaXN0aW5ndWlzaCBpbmRpdmlkdWFsIGVsZW1lbnRzIGJ5IHN0YW5kYXJkIEhUTUxcbiAqIGF0dHJpYnV0ZXMsIHNvIHRoZSAnYXdOYW1lJyBkaXJlY3RpdmUgYWxsb3dzIGN1c3RvbSBleHRlbnRpb25zIHRvIHRoZSBiYXNlIG5hbWUgdG8gYmUgcHJvdmlkZWRcbiAqIHVzaW5nIHRoZSAnZXh0JyBhdHRyaWJ1dGUuXG4gKlxuICogICAgRXhhbXBsZTpcbiAqICAgICAgICBmcnVpdHMgPSBbJ2FwcGxlJywgJ2JhbmFuYScsICdvcmFuZ2UnXTtcbiAqXG4gKiAgICAgICAgPHVsPlxuICogICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGZydWl0IG9mIGZydWl0c1wiIGF3TmFtZSBleHQ9XCJ7e2ZydWl0fX1cIj57e2ZydWl0fX08L2xpPlxuICogICAgICAgIDwvdWw+XG4gKlxuICogICBSZXN1bHQ6XG4gKiAgICAgICA8dWw+XG4gKiAgICAgICAgICAgPGxpIGF3bmFtZT1cImxpX2FwcGxlXCI+YXBwbGU8L2xpPlxuICogICAgICAgICAgIDxsaSBhd25hbWU9XCJsaV9iYW5hbmFcIj5iYW5hbmE8L2xpPlxuICogICAgICAgICAgIDxsaSBhd25hbWU9XCJsaV9vcmFuZVwiPm9yYW5nZTwvbGk+XG4gKiAgICAgICA8L3VsPlxuICpcbiAqICoqQWRkaW5nIENvbnRleHQgVGhyb3VnaCBBbmNlc3RvciBJbnNwZWN0aW9uKipcbiAqXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGNvbnRleHQgdG8gdGhlIGVsZW1lbnQgbmFtaW5nLCB0aGUgJ2F3TmFtZScgZGlyZWN0aXZlIGxvb3BzIHRocm91Z2ggdGhlXG4gKiBwYXJlbnQgYW5jZXN0cnkgYW5kIHNlYXJjaGVzIGZvciBhbnkgdW5pcXVlIGVsZW1lbnQgJ2lkJyB0byBwcmVwZW5kIHRvIHRoZSBiYXNlIG5hbWUuXG4gKlxuICogICAgIEV4YW1wbGU6XG4gKiAgICAgICAgIDxmb3JtIGlkPVwiYXBwbGljYW50XCI+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJmaXJzdE5hbWVcIiBhd05hbWU+XG4gKiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsYXN0TmFtZVwiIGF3TmFtZT5cbiAqICAgICAgICAgPC9mb3JtPlxuICogICAgICAgICA8Zm9ybSBpZD1cInNwb3VzZVwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlyc3ROYW1lXCIgYXdOYW1lPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBhd05hbWU+XG4gKiAgICAgICAgIDwvZm9ybT5cbiAqXG4gKiAgICAgUmVzdWx0OlxuICogICAgICAgICA8Zm9ybSBpZD1cImFwcGxpY2FudFwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlyc3ROYW1lXCIgYXduYW1lPVwiYXBwbGljYW50X2lucHV0X2ZpcnN0TmFtZVwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBhd25hbWU9XCJhcHBsaWNhbnRfaW5wdXRfbGFzdE5hbWVcIj5cbiAqICAgICAgICAgPC9mb3JtPlxuICogICAgICAgICA8Zm9ybSBpZD1cInNwb3VzZVwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZmlyc3ROYW1lXCIgYXduYW1lPVwic3BvdXNlX2lucHV0X2ZpcnN0TmFtZVwiPlxuICogICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGFzdE5hbWVcIiBhd25hbWU9XCJzcG91c2VfaW5wdXRfbGFzdG5hbWVcIj5cbiAqICAgICAgICAgPC9mb3JtPlxuICpcbiAqICoqVW5pcXVlbmVzcyBDaGVjayoqXG4gKlxuICogJ2F3TmFtZScga2VlcHMgdHJhY2sgb2YgdGhlIG5hbWVzIGl0IGNyZWF0ZXMgYnkgYWRkaW5nIHRoZW0gdG8gYSBtYXAgc3RvcmUuIFdoZW5ldmVyIGl0XG4gKiBjcmVhdGVzIGEgbmV3IG5hbWUgZHVyaW5nIHRoZSBgbmdPbkluaXRgIHBoYXNlIGl0IGNoZWNrcyBpdCBhZ2FpbnN0IHRoZSBleGlzdGluZyBtYXAsXG4gKiBhbmQgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiBpdCBlbmNvdW50ZXJzIGEgZHVwbGljYXRlLiBNb3Jlb3ZlciBkdXJpbmcgdGhlIGVsZW1lbnQgZGVzdHJ1Y3Rpb25cbiAqIHBoYXNlLCBgbmdPbkRlc3Ryb3lgLCAnYXdOYW1lJyByZW1vdmVzIHRoZSBnZW5lcmF0ZWQgbmFtZSBmcm9tIHRoZSBzdG9yZS5cbiAqXG4gKlxuICogKipJbiBQcm9kdWN0aW9uKipcbiAqXG4gKiBVc2luZyAnYXdOYW1lJyBhZGRzIGEgc21hbGwgYml0IG9mIHJlbmRlcmluZyBvdmVyaGVhZCBmb3IgZWFjaCBlbGVtZW50IGl0IGlzIHVzZWQgb24uIEluXG4gKiBhIHByb2R1Y3Rpb24gZW52aXJvbm1lbnQsICdhd05hbWUnIHNlcnZlcyBubyBmdW5jdGlvbmFsaXR5IHRvIHRoZSBlbmQgdXNlciwgYnV0IG1heSBoYXZlXG4gKiBhIHBlcmZvcm1hbmNlIGltcGFjdCBvbiB0aGUgYXBwbGljYXRpb24uIEFzIHN1Y2gsICdhd05hbWUnIHRha2VzIGludG8gYWNjb3VudCB0aGVcbiAqIGBBcHBDb25maWdgIHNldHRpbmdzIGFuZCBkaXNhYmxlcyBuYW1lIGdlbmVyYXRpb24gd2hlbiBgQXBwQ29uZmlnLmlzUHJvZHVjdGlvbk1vZGUoKWBcbiAqIGlzIGB0cnVlYC5cbiAqXG4gKiBJbiB5b3VyIGFwcGxpY2F0aW9uLCB5b3UgY2FuIHR1cm4gb24gcHJvZHVjdGlvbiBtb2RlIGJ5IHNldHRpbmcgYGRldm1vZGUuZW5hYmxlZGAgdG9cbiAqIGBmYWxzZWAgd2hlbiBjb25maWd1cmluZyBgQXJpYmFDb3JlTW9kdWxlYDpcbiAqXG4gKiAgICAgQXJpYmFDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICogICAgICAgICAnZGV2bW9kZS5lbmFibGVkJzogZmFsc2VcbiAqICAgICB9KVxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbYXdOYW1lXScsXG59KVxuZXhwb3J0IGNsYXNzIEF3TmFtZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGV4dDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvcjogc3RyaW5nID0gJ18nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgc3RvcmU6IEF3TmFtZVN0b3JlLFxuICAgICAgICBwcml2YXRlIGNvbmZpZzogQXBwQ29uZmlnXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNyZWF0ZU5hbWUodGhpcy5lbCk7XG4gICAgICAgICAgICB0aGlzLmFkZEVsZW1lbnRUb1N0b3JlKHRoaXMubmFtZSwgdGhpcy5lbCk7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhd25hbWUnLCB0aGlzLm5hbWUpO1xuICAgICAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdG9yZS5yZW1vdmUodGhpcy5uYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgZWxlbWVudCBuYW1lL2lkIGFuZCByZWZlcmVuY2UgdG8gbWFwIHN0b3JlLiBJZiBuYW1lL2lkIGFscmVhZHlcbiAgICAgKiBleGlzdHMgaW4gc3RvcmUgdGhlbiBpdCB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGRFbGVtZW50VG9TdG9yZShuYW1lOiBzdHJpbmcsIGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuYWRkKG5hbWUsIGVsZW0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSArIGAuIFwiJHtuYW1lfVwiIGlzIGFscmVhZHkgaW4gdXNlLmAsIGVsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBuYW1lL2lkIGZvciBlbGVtZW50LlxuICAgICAqXG4gICAgICogcGFyYW0gZWxlbSBSZWZlcmVuY2UgdG8gZWxlbWVudFxuICAgICAqIEByZXR1cm4gU3RyaW5nIE5hbWUvSURcbiAgICAgKi9cbiAgICBjcmVhdGVOYW1lKGVsZW06IEVsZW1lbnRSZWYpIHtcblxuICAgICAgICBjb25zdCB0YWdOYW1lID0gdGhpcy5nZXRUYWdOYW1lKGVsZW0pO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgYXJyYXkgb2Ygc3RyaW5nIHBhcnRzXG4gICAgICAgIGNvbnN0IHBhcnRzID0gW107XG5cbiAgICAgICAgLy8gRmluZCBhbmNlc3RvciB0YWcgaWQsIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICBjb25zdCBwYXJlbnRJRCA9IHRoaXMuZ2V0QW5jZXN0b3JJZChlbGVtKTtcbiAgICAgICAgaWYgKHBhcmVudElEKSB7XG4gICAgICAgICAgICBwYXJ0cy5wdXNoKHBhcmVudElEKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHRoZSB0YWcgdHlwZVxuICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ29wdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudE5hbWUgPSB0aGlzLmdldFBhcmVudE5hbWUoZWxlbSk7XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIHBhcnRzLnB1c2gocGFyZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgdGFnbmFtZVxuICAgICAgICBwYXJ0cy5wdXNoKHRhZ05hbWUpO1xuXG4gICAgICAgIC8vIENob29zZSBpZCBwcm9wZXJ0eSBpZiBpdCBleGlzdHNcbiAgICAgICAgaWYgKGVsZW0ubmF0aXZlRWxlbWVudC5pZCkge1xuICAgICAgICAgICAgcGFydHMucHVzaChlbGVtLm5hdGl2ZUVsZW1lbnQuaWQpO1xuXG4gICAgICAgIC8vIE90aGVyd2lzZSBidWlsZCBleHRlbnNpb24gZnJvbSB0YWcgcHJvcGVydGllc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGEgbmFtZSBhdHRyaWJ1dGVcbiAgICAgICAgICAgIGlmIChlbGVtLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCduYW1lJykpIHtcbiAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKGVsZW0ubmF0aXZlRWxlbWVudC5uYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHZhbHVlIGF0dHJpYnV0ZSBpZiAnb3B0aW9uJyB0YWdcbiAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnb3B0aW9uJykge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2godGhpcy5zcGFjZXNUb1VuZGVyc2NvcmUoZWxlbS5uYXRpdmVFbGVtZW50LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBjdXN0b20gZXh0ZW5zaW9uIGlmIGl0IGV4aXN0c1xuICAgICAgICBpZiAodGhpcy5leHQpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2godGhpcy5zcGFjZXNUb1VuZGVyc2NvcmUodGhpcy5leHQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKHRoaXMuc2VwYXJhdG9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGFnIG5hbWUgZnJvbSBlbGVtZW50IHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gZWxlbSBSZWZlcmVuY2UgdG8gZWxlbWVudFxuICAgICAqL1xuICAgIGdldFRhZ05hbWUoZWxlbTogRWxlbWVudFJlZikge1xuICAgICAgICByZXR1cm4gZWxlbS5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmF2ZXJzZSBlbGVtZW50IGFuY2VzdHJ5IGFuZCByZXR1cm4gZmlyc3QgaWQgYXR0cmlidXRlXG4gICAgICogZW5jb3VudGVyZWQuXG4gICAgICogQHBhcmFtIGVsZW0gUmVmZXJlbmNlIHRvIGVsZW1lbnRcbiAgICAgKi9cbiAgICBnZXRBbmNlc3RvcklkKGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgbGV0IHBhcmVudCA9IGVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICBsZXQgaWQgPSAnJztcbiAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhaWQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICBpZCA9IHBhcmVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbmFtZSBhdHRyaWJ1dGUgZnJvbSBwYXJlbnQgaWYgbmFtZSBhdHRyaWJ1dGUgZXhpc3RzLlxuICAgICAqIEBwYXJhbSBlbGVtIFJlZmVyZW5jZSB0byBlbGVtZW50XG4gICAgICovXG4gICAgZ2V0UGFyZW50TmFtZShlbGVtOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICByZXR1cm4gKHBhcmVudC5uYW1lICYmICFwYXJlbnQuaWQpID8gcGFyZW50Lm5hbWUgOiBudWxsO1xuICAgIH1cblxuICAgIHNwYWNlc1RvVW5kZXJzY29yZShzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccysvZywgJ18nKTtcbiAgICB9XG5cbn1cbiJdfQ==