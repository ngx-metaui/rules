import { ElementRef, OnInit, OnDestroy } from '@angular/core';
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
export declare class AwNameDirective implements OnInit, OnDestroy {
    private el;
    private store;
    private config;
    ext: string;
    private name;
    private separator;
    constructor(el: ElementRef, store: AwNameStore, config: AppConfig);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Add element name/id and reference to map store. If name/id already
     * exists in store then it throws an error.
     *
     */
    addElementToStore(name: string, elem: ElementRef): void;
    /**
     * Generate name/id for element.
     *
     * param elem Reference to element
     * @return String Name/ID
     */
    createName(elem: ElementRef): string;
    /**
     * Get tag name from element reference.
     * @param elem Reference to element
     */
    getTagName(elem: ElementRef): any;
    /**
     * Traverse element ancestry and return first id attribute
     * encountered.
     * @param elem Reference to element
     */
    getAncestorId(elem: ElementRef): string;
    /**
     * Get name attribute from parent if name attribute exists.
     * @param elem Reference to element
     */
    getParentName(elem: ElementRef): any;
    spacesToUnderscore(str: string): string;
}
