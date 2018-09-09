/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Environment } from '@aribaui/core';
/**
 * This is just a wrapper component around meta-form-table as we need every single context push to
 * happen before the child content start to render.
 *
 * In this case I would like to wrap wrap my content with m-context in the way:
 *
 *  <m-context scopeKey="class">
 *        <!-- lets process one zone now and four we can deal later-->
 *        <ng-template [ngIf]="isFiveZoneLayout">
 *              <aw-form-table [isEditable]="isEditable" [labelsOnTop]="labelsOnTop"
 * (onSubmit)="onSaveAction($event)">
 *                  <ng-template ngFor let-curentField [ngForOf]="zLeft()">
 *                      <m-context [field]="curentField">
 *                           <m-form-row [field]="curentField"></m-form-row>
 *                      </m-context>
 *                  </ng-template>
 *          </aw-form-table>
 *        </ng-template>
 *  </m-context>
 *
 *
 *
 */
export class MetaFormComponent {
    /**
     * @param {?} environment
     */
    constructor(environment) {
        this.environment = environment;
    }
}
MetaFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'm-form',
                template: "<m-context #cnx scopeKey=\"class\">\n    <!-- Dont try to render if the object is not set yet -->\n    <m-form-table *ngIf=\"cnx.hasObject\"></m-form-table>\n</m-context>\n"
            }] }
];
/** @nocollapse */
MetaFormComponent.ctorParameters = () => [
    { type: Environment }
];
if (false) {
    /** @type {?} */
    MetaFormComponent.prototype.environment;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWZvcm0vbWV0YS1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0IxQyxNQUFNOzs7O0lBSUYsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7S0FHM0M7OztZQVpKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsd0xBQXVDO2FBRTFDOzs7O1lBOUJPLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG5cbi8qKlxuICogVGhpcyBpcyBqdXN0IGEgd3JhcHBlciBjb21wb25lbnQgYXJvdW5kIG1ldGEtZm9ybS10YWJsZSBhcyB3ZSBuZWVkIGV2ZXJ5IHNpbmdsZSBjb250ZXh0IHB1c2ggdG9cbiAqIGhhcHBlbiBiZWZvcmUgdGhlIGNoaWxkIGNvbnRlbnQgc3RhcnQgdG8gcmVuZGVyLlxuICpcbiAqIEluIHRoaXMgY2FzZSBJIHdvdWxkIGxpa2UgdG8gd3JhcCB3cmFwIG15IGNvbnRlbnQgd2l0aCBtLWNvbnRleHQgaW4gdGhlIHdheTpcbiAqXG4gKiAgPG0tY29udGV4dCBzY29wZUtleT1cImNsYXNzXCI+XG4gKiAgICAgICAgPCEtLSBsZXRzIHByb2Nlc3Mgb25lIHpvbmUgbm93IGFuZCBmb3VyIHdlIGNhbiBkZWFsIGxhdGVyLS0+XG4gKiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzRml2ZVpvbmVMYXlvdXRcIj5cbiAqICAgICAgICAgICAgICA8YXctZm9ybS10YWJsZSBbaXNFZGl0YWJsZV09XCJpc0VkaXRhYmxlXCIgW2xhYmVsc09uVG9wXT1cImxhYmVsc09uVG9wXCJcbiAqIChvblN1Ym1pdCk9XCJvblNhdmVBY3Rpb24oJGV2ZW50KVwiPlxuICogICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWN1cmVudEZpZWxkIFtuZ0Zvck9mXT1cInpMZWZ0KClcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxtLWNvbnRleHQgW2ZpZWxkXT1cImN1cmVudEZpZWxkXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtLWZvcm0tcm93IFtmaWVsZF09XCJjdXJlbnRGaWVsZFwiPjwvbS1mb3JtLXJvdz5cbiAqICAgICAgICAgICAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuICogICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICogICAgICAgICAgPC9hdy1mb3JtLXRhYmxlPlxuICogICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgPC9tLWNvbnRleHQ+XG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbS1mb3JtJyxcbiAgICB0ZW1wbGF0ZVVybDogJ21ldGEtZm9ybS5jb21wb25lbnQuaHRtbCcsXG5cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUZvcm1Db21wb25lbnRcbntcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbnZpcm9ubWVudDogRW52aXJvbm1lbnQpXG4gICAge1xuXG4gICAgfVxuXG59XG4iXX0=