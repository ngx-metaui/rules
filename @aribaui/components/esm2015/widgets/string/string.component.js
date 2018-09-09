/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseFormComponent } from '../../core/base-form.component';
import { Environment } from '@aribaui/core';
/**
 * Simple component rendering values in the read only mode. Just needed some component used
 * to render Strings in read only mode
 *
 *
 *  ### Example
 *
 * Using it inside form container along with label
 *
 *
 *  ```
 * \@Component({
 *              selector: 'userInfo' ,
 *              template: `
 *                      <aw-form-table [editable]="false" >
 *                          <aw-form-row [name]="fieldName"  [label]="label">
 *                                 <aw-string [value]="inputValue" ></aw-string>
 *                           </aw-form-row>
 *                      </aw-form-table>
 *
 *                  `
 *          })
 *          export class UserProfileComponent
 *          {
 *              inputValue: string = 'Some text';
 *              inputType: string = 'string';
 *              fieldName: string = 'firstName';
 *              label: string = 'My Name';
 *              required: boolean = true;
 *              editing: boolean = true;
 *              labelsOnTop: boolean = false;
 *
 *          }
 *
 *  ```
 *
 * You can also pass html tags.
 *
 */
export class StringComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} sanitizer
     * @param {?} parentContainer
     */
    constructor(env, sanitizer, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.sanitizer = sanitizer;
        this.parentContainer = parentContainer;
        /**
         *  Value to be interpolated
         *
         */
        this._value = '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.sanitizer.bypassSecurityTrustHtml(this._value);
    }
}
StringComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-string',
                template: `
        <span class="w-string-field" [innerHTML]="value"></span>
    `,
                styles: [".w-string-field{display:inline-block}"]
            }] }
];
/** @nocollapse */
StringComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomSanitizer },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
StringComponent.propDecorators = {
    value: [{ type: Input }]
};
if (false) {
    /**
     *  Value to be interpolated
     *
     * @type {?}
     */
    StringComponent.prototype._value;
    /** @type {?} */
    StringComponent.prototype.env;
    /** @type {?} */
    StringComponent.prototype.sanitizer;
    /** @type {?} */
    StringComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3N0cmluZy9zdHJpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUQxQyxNQUFNLHNCQUF1QixTQUFRLGlCQUFpQjs7Ozs7O0lBU2xELFlBQW1CLEdBQWdCLEVBQVUsU0FBdUIsRUFFOUMsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFjO1FBRTlDLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7c0JBTC9CLEVBQUU7S0FTMUI7Ozs7O0lBR0QsSUFDSSxLQUFLLENBQUMsS0FBVTtRQUVoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUN2Qjs7OztJQUVELElBQUksS0FBSztRQUVMLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5RDs7O1lBbENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOztLQUVUOzthQUVKOzs7O1lBaERPLFdBQVc7WUFGWCxZQUFZO1lBQ1osaUJBQWlCLHVCQTREUixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7OztvQkFROUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBTaW1wbGUgY29tcG9uZW50IHJlbmRlcmluZyB2YWx1ZXMgaW4gdGhlIHJlYWQgb25seSBtb2RlLiBKdXN0IG5lZWRlZCBzb21lIGNvbXBvbmVudCB1c2VkXG4gKiB0byByZW5kZXIgU3RyaW5ncyBpbiByZWFkIG9ubHkgbW9kZVxuICpcbiAqXG4gKiAgIyMjIEV4YW1wbGVcbiAqXG4gKiBVc2luZyBpdCBpbnNpZGUgZm9ybSBjb250YWluZXIgYWxvbmcgd2l0aCBsYWJlbFxuICpcbiAqXG4gKiAgYGBgXG4gKiAgICAgICAgICBAQ29tcG9uZW50KHtcbiAqICAgICAgICAgICAgICBzZWxlY3RvcjogJ3VzZXJJbmZvJyAsXG4gKiAgICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAqICAgICAgICAgICAgICAgICAgICAgIDxhdy1mb3JtLXRhYmxlIFtlZGl0YWJsZV09XCJmYWxzZVwiID5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctZm9ybS1yb3cgW25hbWVdPVwiZmllbGROYW1lXCIgIFtsYWJlbF09XCJsYWJlbFwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXctc3RyaW5nIFt2YWx1ZV09XCJpbnB1dFZhbHVlXCIgPjwvYXctc3RyaW5nPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICA8L2F3LWZvcm0tcm93PlxuICogICAgICAgICAgICAgICAgICAgICAgPC9hdy1mb3JtLXRhYmxlPlxuICpcbiAqICAgICAgICAgICAgICAgICAgYFxuICogICAgICAgICAgfSlcbiAqICAgICAgICAgIGV4cG9ydCBjbGFzcyBVc2VyUHJvZmlsZUNvbXBvbmVudFxuICogICAgICAgICAge1xuICogICAgICAgICAgICAgIGlucHV0VmFsdWU6IHN0cmluZyA9ICdTb21lIHRleHQnO1xuICogICAgICAgICAgICAgIGlucHV0VHlwZTogc3RyaW5nID0gJ3N0cmluZyc7XG4gKiAgICAgICAgICAgICAgZmllbGROYW1lOiBzdHJpbmcgPSAnZmlyc3ROYW1lJztcbiAqICAgICAgICAgICAgICBsYWJlbDogc3RyaW5nID0gJ015IE5hbWUnO1xuICogICAgICAgICAgICAgIHJlcXVpcmVkOiBib29sZWFuID0gdHJ1ZTtcbiAqICAgICAgICAgICAgICBlZGl0aW5nOiBib29sZWFuID0gdHJ1ZTtcbiAqICAgICAgICAgICAgICBsYWJlbHNPblRvcDogYm9vbGVhbiA9IGZhbHNlO1xuICpcbiAqICAgICAgICAgIH1cbiAqXG4gKiAgYGBgXG4gKlxuICogWW91IGNhbiBhbHNvIHBhc3MgaHRtbCB0YWdzLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1zdHJpbmcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidy1zdHJpbmctZmllbGRcIiBbaW5uZXJIVE1MXT1cInZhbHVlXCI+PC9zcGFuPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbJ3N0cmluZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFN0cmluZ0NvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogIFZhbHVlIHRvIGJlIGludGVycG9sYXRlZFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZyA9ICcnO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQmFzZUZvcm1Db21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuXG4gICAgfVxuXG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGhpcy5fdmFsdWUpO1xuICAgIH1cbn1cblxuXG4iXX0=