/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { BaseComponent } from '../../../core/base.component';
import { Environment } from '@aribaui/core';
/** *
 * Maps our internal alignment value to real css values
 *
  @type {?} */
var VAlignMap = {
    'top-left': 'flex-start',
    'top-center': 'flex-start',
    'top-right': 'flex-start',
    'center-left': 'center',
    'center-center': 'center',
    'center-right': 'center',
    'bottom-left': 'flex-end',
    'bottom-center': 'flex-end',
    'bottom-right': 'flex-end'
};
/** @type {?} */
var HAlignMap = {
    'top-left': 'flex-start',
    'top-center': 'center',
    'top-right': 'flex-end',
    'center-left': 'flex-start',
    'center-center': 'center',
    'center-right': 'flex-end',
    'bottom-left': 'flex-start',
    'bottom-center': 'center',
    'bottom-right': 'flex-end'
};
/**
 * Title zone provides a content placeholder for the Title Area. This zone is adding ability
 * to align its content into 9 different position.
 *
 * You can use this Title zone within <aw-card> as:
 *
 *
 * ```html
 *
 *  <aw-card  [width]="'202px'" [height]="'154px'" [hasHover]="true"
 *                       [selectable]="false" [hasAction]="false"
 *                  (onHoverAction)="onAction(7, $event)" >
 *
 *                  <aw-card-title [align]="'bottom-left'">
 *                      <span class="a-supplier-tag">
 *                          Preferred
 *                      </span>
 *                  </aw-card-title>
 *
 *   </aw-card>
 *
 * ```
 * Default alignment is top-left
 *
 *
 *
 *
 */
var CardZoneTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CardZoneTitleComponent, _super);
    function CardZoneTitleComponent(env, elem) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        _this.elem = elem;
        /**
         * Special property which is used to apply flex properties for aligning content vertically
         * as well as horizontally
         *
         */
        _this.align = 'top-left';
        return _this;
    }
    /**
     * @return {?}
     */
    CardZoneTitleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.elem.nativeElement.style.alignItems = VAlignMap[this.align];
        this.elem.nativeElement.style.justifyContent = HAlignMap[this.align];
    };
    CardZoneTitleComponent.decorators = [
        { type: Directive, args: [{
                    selector: "aw-card-title",
                    host: {
                        'class': 'w-card-title'
                    }
                },] }
    ];
    /** @nocollapse */
    CardZoneTitleComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: ElementRef }
    ]; };
    CardZoneTitleComponent.propDecorators = {
        align: [{ type: Input }]
    };
    return CardZoneTitleComponent;
}(BaseComponent));
export { CardZoneTitleComponent };
if (false) {
    /**
     * Special property which is used to apply flex properties for aligning content vertically
     * as well as horizontally
     *
     * @type {?}
     */
    CardZoneTitleComponent.prototype.align;
    /** @type {?} */
    CardZoneTitleComponent.prototype.env;
    /** @type {?} */
    CardZoneTitleComponent.prototype.elem;
}
/** @typedef {?} */
var CardTitleAlignment;
export { CardTitleAlignment };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10aXRsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jYXJkL2NhcmQtdGl0bGUvY2FyZC10aXRsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFrQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQU8xQyxJQUFNLFNBQVMsR0FBRztJQUNkLFVBQVUsRUFBRSxZQUFZO0lBQ3hCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFdBQVcsRUFBRSxZQUFZO0lBQ3pCLGFBQWEsRUFBRSxRQUFRO0lBQ3ZCLGVBQWUsRUFBRSxRQUFRO0lBQ3pCLGNBQWMsRUFBRSxRQUFRO0lBQ3hCLGFBQWEsRUFBRSxVQUFVO0lBQ3pCLGVBQWUsRUFBRSxVQUFVO0lBQzNCLGNBQWMsRUFBRSxVQUFVO0NBQzdCLENBQUM7O0FBR0YsSUFBTSxTQUFTLEdBQUc7SUFDZCxVQUFVLEVBQUUsWUFBWTtJQUN4QixZQUFZLEVBQUUsUUFBUTtJQUN0QixXQUFXLEVBQUUsVUFBVTtJQUN2QixhQUFhLEVBQUUsWUFBWTtJQUMzQixlQUFlLEVBQUUsUUFBUTtJQUN6QixjQUFjLEVBQUUsVUFBVTtJQUMxQixhQUFhLEVBQUUsWUFBWTtJQUMzQixlQUFlLEVBQUUsUUFBUTtJQUN6QixjQUFjLEVBQUUsVUFBVTtDQUM3QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQzBDLGtEQUFhO0lBV3JELGdDQUFtQixHQUFnQixFQUFTLElBQWdCO1FBQTVELFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBRWI7UUFKa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUFTLFVBQUksR0FBSixJQUFJLENBQVk7Ozs7OztzQkFIaEMsVUFBVTs7S0FPckM7Ozs7SUFHRCx5Q0FBUTs7O0lBQVI7UUFFSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hFOztnQkE5QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLGNBQWM7cUJBQzFCO2lCQUNKOzs7O2dCQWxFTyxXQUFXO2dCQUZBLFVBQVU7Ozt3QkE0RXhCLEtBQUs7O2lDQTlGVjtFQXVGNEMsYUFBYTtTQUE1QyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG5cbi8qKlxuICogTWFwcyBvdXIgaW50ZXJuYWwgYWxpZ25tZW50IHZhbHVlIHRvIHJlYWwgY3NzIHZhbHVlc1xuICpcbiAqL1xuY29uc3QgVkFsaWduTWFwID0ge1xuICAgICd0b3AtbGVmdCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAndG9wLWNlbnRlcic6ICdmbGV4LXN0YXJ0JyxcbiAgICAndG9wLXJpZ2h0JzogJ2ZsZXgtc3RhcnQnLFxuICAgICdjZW50ZXItbGVmdCc6ICdjZW50ZXInLFxuICAgICdjZW50ZXItY2VudGVyJzogJ2NlbnRlcicsXG4gICAgJ2NlbnRlci1yaWdodCc6ICdjZW50ZXInLFxuICAgICdib3R0b20tbGVmdCc6ICdmbGV4LWVuZCcsXG4gICAgJ2JvdHRvbS1jZW50ZXInOiAnZmxleC1lbmQnLFxuICAgICdib3R0b20tcmlnaHQnOiAnZmxleC1lbmQnXG59O1xuXG5cbmNvbnN0IEhBbGlnbk1hcCA9IHtcbiAgICAndG9wLWxlZnQnOiAnZmxleC1zdGFydCcsXG4gICAgJ3RvcC1jZW50ZXInOiAnY2VudGVyJyxcbiAgICAndG9wLXJpZ2h0JzogJ2ZsZXgtZW5kJyxcbiAgICAnY2VudGVyLWxlZnQnOiAnZmxleC1zdGFydCcsXG4gICAgJ2NlbnRlci1jZW50ZXInOiAnY2VudGVyJyxcbiAgICAnY2VudGVyLXJpZ2h0JzogJ2ZsZXgtZW5kJyxcbiAgICAnYm90dG9tLWxlZnQnOiAnZmxleC1zdGFydCcsXG4gICAgJ2JvdHRvbS1jZW50ZXInOiAnY2VudGVyJyxcbiAgICAnYm90dG9tLXJpZ2h0JzogJ2ZsZXgtZW5kJ1xufTtcblxuXG4vKipcbiAqIFRpdGxlIHpvbmUgcHJvdmlkZXMgYSBjb250ZW50IHBsYWNlaG9sZGVyIGZvciB0aGUgVGl0bGUgQXJlYS4gVGhpcyB6b25lIGlzIGFkZGluZyBhYmlsaXR5XG4gKiB0byBhbGlnbiBpdHMgY29udGVudCBpbnRvIDkgZGlmZmVyZW50IHBvc2l0aW9uLlxuICpcbiAqIFlvdSBjYW4gdXNlIHRoaXMgVGl0bGUgem9uZSB3aXRoaW4gPGF3LWNhcmQ+IGFzOlxuICpcbiAqXG4gKiBgYGBodG1sXG4gKlxuICogIDxhdy1jYXJkICBbd2lkdGhdPVwiJzIwMnB4J1wiIFtoZWlnaHRdPVwiJzE1NHB4J1wiIFtoYXNIb3Zlcl09XCJ0cnVlXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICBbc2VsZWN0YWJsZV09XCJmYWxzZVwiIFtoYXNBY3Rpb25dPVwiZmFsc2VcIlxuICogICAgICAgICAgICAgICAgICAob25Ib3ZlckFjdGlvbik9XCJvbkFjdGlvbig3LCAkZXZlbnQpXCIgPlxuICpcbiAqICAgICAgICAgICAgICAgICAgPGF3LWNhcmQtdGl0bGUgW2FsaWduXT1cIidib3R0b20tbGVmdCdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYS1zdXBwbGllci10YWdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBQcmVmZXJyZWRcbiAqICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAqICAgICAgICAgICAgICAgICAgPC9hdy1jYXJkLXRpdGxlPlxuICpcbiAqICAgPC9hdy1jYXJkPlxuICpcbiAqIGBgYFxuICogRGVmYXVsdCBhbGlnbm1lbnQgaXMgdG9wLWxlZnRcbiAqXG4gKlxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBgYXctY2FyZC10aXRsZWAsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAndy1jYXJkLXRpdGxlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FyZFpvbmVUaXRsZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcbiAgICAvKipcbiAgICAgKiBTcGVjaWFsIHByb3BlcnR5IHdoaWNoIGlzIHVzZWQgdG8gYXBwbHkgZmxleCBwcm9wZXJ0aWVzIGZvciBhbGlnbmluZyBjb250ZW50IHZlcnRpY2FsbHlcbiAgICAgKiBhcyB3ZWxsIGFzIGhvcml6b250YWxseVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhbGlnbjogQ2FyZFRpdGxlQWxpZ25tZW50ID0gJ3RvcC1sZWZ0JztcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHB1YmxpYyBlbGVtOiBFbGVtZW50UmVmKVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5zdHlsZS5hbGlnbkl0ZW1zID0gVkFsaWduTWFwW3RoaXMuYWxpZ25dO1xuICAgICAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IEhBbGlnbk1hcFt0aGlzLmFsaWduXTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBNYWtlIHN1cmUgd2UgZG9udCBhY2NlcHQgYW55IHVuc3VwcG9ydGVkIHZhbHVlcy4gVGhlc2UgdmFsdWVzIG1hcHMgdG8gdGhlIEhBbGlnbk1hcCBhbmRcbiAqIFZBbGlnbk1hcCBpbiBvcmRlciB0byBnZXQgcmVhbCBjc3MgdmFsdWUgZm9yIHRoZSBmbGV4IGFsaWdubWVudFxuICovXG5leHBvcnQgdHlwZSBDYXJkVGl0bGVBbGlnbm1lbnQgPSAndG9wLWxlZnQnIHwgJ3RvcC1jZW50ZXInIHwgJ3RvcC1yaWdodCcgfCAnY2VudGVyLWxlZnQnIHxcbiAgICAnY2VudGVyLWNlbnRlcicgIHwgJ2NlbnRlci1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1jZW50ZXInIHwgJ2JvdHRvbS1yaWdodCc7XG5cbiJdfQ==