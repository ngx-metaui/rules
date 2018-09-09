/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var StringComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StringComponent, _super);
    function StringComponent(env, sanitizer, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.sanitizer = sanitizer;
        _this.parentContainer = parentContainer;
        /**
         *  Value to be interpolated
         *
         */
        _this._value = '';
        return _this;
    }
    Object.defineProperty(StringComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitizer.bypassSecurityTrustHtml(this._value);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    StringComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-string',
                    template: "\n        <span class=\"w-string-field\" [innerHTML]=\"value\"></span>\n    ",
                    styles: [".w-string-field{display:inline-block}"]
                }] }
    ];
    /** @nocollapse */
    StringComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: DomSanitizer },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return BaseFormComponent; }),] }] }
    ]; };
    StringComponent.propDecorators = {
        value: [{ type: Input }]
    };
    return StringComponent;
}(BaseFormComponent));
export { StringComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL3N0cmluZy9zdHJpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpREwsMkNBQWlCO0lBU2xELHlCQUFtQixHQUFnQixFQUFVLFNBQXVCLEVBRTlDLGVBQWtDO1FBRnhELFlBSUksa0JBQU0sR0FBRyxFQUFFLGVBQWUsQ0FBQyxTQUU5QjtRQU5rQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBQVUsZUFBUyxHQUFULFNBQVMsQ0FBYztRQUU5QyxxQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7O3VCQUwvQixFQUFFOztLQVMxQjtJQUdELHNCQUNJLGtDQUFLOzs7O1FBS1Q7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUQ7Ozs7O1FBVEQsVUFDVSxLQUFVO1lBRWhCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCOzs7T0FBQTs7Z0JBN0JKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLDhFQUVUOztpQkFFSjs7OztnQkFoRE8sV0FBVztnQkFGWCxZQUFZO2dCQUNaLGlCQUFpQix1QkE0RFIsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQzs7O3dCQVE5RSxLQUFLOzswQkExRlY7RUF3RXFDLGlCQUFpQjtTQUF6QyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqIFNpbXBsZSBjb21wb25lbnQgcmVuZGVyaW5nIHZhbHVlcyBpbiB0aGUgcmVhZCBvbmx5IG1vZGUuIEp1c3QgbmVlZGVkIHNvbWUgY29tcG9uZW50IHVzZWRcbiAqIHRvIHJlbmRlciBTdHJpbmdzIGluIHJlYWQgb25seSBtb2RlXG4gKlxuICpcbiAqICAjIyMgRXhhbXBsZVxuICpcbiAqIFVzaW5nIGl0IGluc2lkZSBmb3JtIGNvbnRhaW5lciBhbG9uZyB3aXRoIGxhYmVsXG4gKlxuICpcbiAqICBgYGBcbiAqICAgICAgICAgIEBDb21wb25lbnQoe1xuICogICAgICAgICAgICAgIHNlbGVjdG9yOiAndXNlckluZm8nICxcbiAqICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICogICAgICAgICAgICAgICAgICAgICAgPGF3LWZvcm0tdGFibGUgW2VkaXRhYmxlXT1cImZhbHNlXCIgPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1mb3JtLXJvdyBbbmFtZV09XCJmaWVsZE5hbWVcIiAgW2xhYmVsXT1cImxhYmVsXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhdy1zdHJpbmcgW3ZhbHVlXT1cImlucHV0VmFsdWVcIiA+PC9hdy1zdHJpbmc+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYXctZm9ybS1yb3c+XG4gKiAgICAgICAgICAgICAgICAgICAgICA8L2F3LWZvcm0tdGFibGU+XG4gKlxuICogICAgICAgICAgICAgICAgICBgXG4gKiAgICAgICAgICB9KVxuICogICAgICAgICAgZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlQ29tcG9uZW50XG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgaW5wdXRWYWx1ZTogc3RyaW5nID0gJ1NvbWUgdGV4dCc7XG4gKiAgICAgICAgICAgICAgaW5wdXRUeXBlOiBzdHJpbmcgPSAnc3RyaW5nJztcbiAqICAgICAgICAgICAgICBmaWVsZE5hbWU6IHN0cmluZyA9ICdmaXJzdE5hbWUnO1xuICogICAgICAgICAgICAgIGxhYmVsOiBzdHJpbmcgPSAnTXkgTmFtZSc7XG4gKiAgICAgICAgICAgICAgcmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICogICAgICAgICAgICAgIGVkaXRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICogICAgICAgICAgICAgIGxhYmVsc09uVG9wOiBib29sZWFuID0gZmFsc2U7XG4gKlxuICogICAgICAgICAgfVxuICpcbiAqICBgYGBcbiAqXG4gKiBZb3UgY2FuIGFsc28gcGFzcyBodG1sIHRhZ3MuXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXN0cmluZycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ3LXN0cmluZy1maWVsZFwiIFtpbm5lckhUTUxdPVwidmFsdWVcIj48L3NwYW4+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnc3RyaW5nLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU3RyaW5nQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcbiAgICAvKipcbiAgICAgKiAgVmFsdWUgdG8gYmUgaW50ZXJwb2xhdGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nID0gJyc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBCYXNlRm9ybUNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG5cbiAgICB9XG5cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLl92YWx1ZSk7XG4gICAgfVxufVxuXG5cbiJdfQ==