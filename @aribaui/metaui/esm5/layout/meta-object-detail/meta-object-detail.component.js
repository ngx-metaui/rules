/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Environment, isBlank, isStringMap } from '@aribaui/core';
import { BaseComponent } from '@aribaui/components';
/**
 * Just like MetaContentPage this components renders meta context details but embedded as some
 * inline component. Not a page with page level buttons
 *
 *
 * Todo: We dont really need this component we we in the future extends MetaIncludeComponent to
 * support awcontentElement:
 *
 * ```
 *  {
 *      component:MetaContextComponent;
 *      bindings: {
 *          object:$value;
 *          layout:Inspect;
 *          operation:view;
 *          awcontentElement:MetaIncludeComponnetDirective;
 *      }
 *
 *  }
 *
 *  ```
 *
 *  This would instantiate right meta context just like this class.
 */
var MetaObjectDetailComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaObjectDetailComponent, _super);
    function MetaObjectDetailComponent(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * For the detail view we always use read only content
         */
        _this.operation = 'view';
        /**
         * Default layout
         *
         */
        _this.layout = 'Inspect';
        return _this;
    }
    /**
     * @return {?}
     */
    MetaObjectDetailComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isBlank(this.object) || !isStringMap(this.object)) {
            throw new Error('Cannot render primitive values as object details!');
        }
    };
    MetaObjectDetailComponent.decorators = [
        { type: Component, args: [{
                    selector: 'm-content-detail',
                    template: "<m-context [pushNewContext]=\"true\" [object]=\"object\" [operation]=\"operation\"\n           [layout]=\"layout\" group=\"ObjectDetail\">\n\n    <div class=\"w-object-detail\">\n        <m-include-component></m-include-component>\n    </div>\n\n</m-context>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    MetaObjectDetailComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    MetaObjectDetailComponent.propDecorators = {
        object: [{ type: Input }],
        operation: [{ type: Input }],
        layout: [{ type: Input }]
    };
    return MetaObjectDetailComponent;
}(BaseComponent));
export { MetaObjectDetailComponent };
function MetaObjectDetailComponent_tsickle_Closure_declarations() {
    /**
     * Object detail to be rendered
     * @type {?}
     */
    MetaObjectDetailComponent.prototype.object;
    /**
     * For the detail view we always use read only content
     * @type {?}
     */
    MetaObjectDetailComponent.prototype.operation;
    /**
     * Default layout
     *
     * @type {?}
     */
    MetaObjectDetailComponent.prototype.layout;
    /** @type {?} */
    MetaObjectDetailComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1vYmplY3QtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLW9iamVjdC1kZXRhaWwvbWV0YS1vYmplY3QtZGV0YWlsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXdDSCxxREFBYTtJQXNCeEQsbUNBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBQ2I7UUFIa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7OzswQkFUZixNQUFNOzs7Ozt1QkFPVCxTQUFTOztLQUt6Qjs7OztJQUVELDRDQUFROzs7SUFBUjtRQUVJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7U0FDeEU7S0FFSjs7Z0JBOUNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsc1FBUWI7b0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNmOzs7O2dCQXhDTyxXQUFXOzs7eUJBK0NkLEtBQUs7NEJBTUwsS0FBSzt5QkFPTCxLQUFLOztvQ0FoRlY7RUE2RCtDLGFBQWE7U0FBL0MseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNTdHJpbmdNYXB9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcblxuXG4vKipcbiAqIEp1c3QgbGlrZSBNZXRhQ29udGVudFBhZ2UgdGhpcyBjb21wb25lbnRzIHJlbmRlcnMgbWV0YSBjb250ZXh0IGRldGFpbHMgYnV0IGVtYmVkZGVkIGFzIHNvbWVcbiAqIGlubGluZSBjb21wb25lbnQuIE5vdCBhIHBhZ2Ugd2l0aCBwYWdlIGxldmVsIGJ1dHRvbnNcbiAqXG4gKlxuICogVG9kbzogV2UgZG9udCByZWFsbHkgbmVlZCB0aGlzIGNvbXBvbmVudCB3ZSB3ZSBpbiB0aGUgZnV0dXJlIGV4dGVuZHMgTWV0YUluY2x1ZGVDb21wb25lbnQgdG9cbiAqIHN1cHBvcnQgYXdjb250ZW50RWxlbWVudDpcbiAqXG4gKiBgYGBcbiAqICB7XG4gKiAgICAgIGNvbXBvbmVudDpNZXRhQ29udGV4dENvbXBvbmVudDtcbiAqICAgICAgYmluZGluZ3M6IHtcbiAqICAgICAgICAgIG9iamVjdDokdmFsdWU7XG4gKiAgICAgICAgICBsYXlvdXQ6SW5zcGVjdDtcbiAqICAgICAgICAgIG9wZXJhdGlvbjp2aWV3O1xuICogICAgICAgICAgYXdjb250ZW50RWxlbWVudDpNZXRhSW5jbHVkZUNvbXBvbm5ldERpcmVjdGl2ZTtcbiAqICAgICAgfVxuICpcbiAqICB9XG4gKlxuICogIGBgYFxuICpcbiAqICBUaGlzIHdvdWxkIGluc3RhbnRpYXRlIHJpZ2h0IG1ldGEgY29udGV4dCBqdXN0IGxpa2UgdGhpcyBjbGFzcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWNvbnRlbnQtZGV0YWlsJyxcbiAgICB0ZW1wbGF0ZTogYDxtLWNvbnRleHQgW3B1c2hOZXdDb250ZXh0XT1cInRydWVcIiBbb2JqZWN0XT1cIm9iamVjdFwiIFtvcGVyYXRpb25dPVwib3BlcmF0aW9uXCJcbiAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXRcIiBncm91cD1cIk9iamVjdERldGFpbFwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInctb2JqZWN0LWRldGFpbFwiPlxuICAgICAgICA8bS1pbmNsdWRlLWNvbXBvbmVudD48L20taW5jbHVkZS1jb21wb25lbnQ+XG4gICAgPC9kaXY+XG5cbjwvbS1jb250ZXh0PlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWV0YU9iamVjdERldGFpbENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIE9iamVjdCBkZXRhaWwgdG8gYmUgcmVuZGVyZWRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9iamVjdDogYW55O1xuXG4gICAgLyoqXG4gICAgICogRm9yIHRoZSBkZXRhaWwgdmlldyB3ZSBhbHdheXMgdXNlIHJlYWQgb25seSBjb250ZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBvcGVyYXRpb246IHN0cmluZyA9ICd2aWV3JztcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgbGF5b3V0XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxheW91dDogc3RyaW5nID0gJ0luc3BlY3QnO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMub2JqZWN0KSB8fCAhaXNTdHJpbmdNYXAodGhpcy5vYmplY3QpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZW5kZXIgcHJpbWl0aXZlIHZhbHVlcyBhcyBvYmplY3QgZGV0YWlscyEnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbn1cbiJdfQ==