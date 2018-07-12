/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { BaseComponent } from '../../../core/base.component';
import { Environment } from '@aribaui/core';
/**
 * Maps our internal alignment value to real css values
 *
 */
var /** @type {?} */ VAlignMap = {
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
var /** @type {?} */ HAlignMap = {
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
                },] },
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
function CardZoneTitleComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10aXRsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jYXJkL2NhcmQtdGl0bGUvY2FyZC10aXRsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFrQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQU8xQyxxQkFBTSxTQUFTLEdBQUc7SUFDZCxVQUFVLEVBQUUsWUFBWTtJQUN4QixZQUFZLEVBQUUsWUFBWTtJQUMxQixXQUFXLEVBQUUsWUFBWTtJQUN6QixhQUFhLEVBQUUsUUFBUTtJQUN2QixlQUFlLEVBQUUsUUFBUTtJQUN6QixjQUFjLEVBQUUsUUFBUTtJQUN4QixhQUFhLEVBQUUsVUFBVTtJQUN6QixlQUFlLEVBQUUsVUFBVTtJQUMzQixjQUFjLEVBQUUsVUFBVTtDQUM3QixDQUFDO0FBR0YscUJBQU0sU0FBUyxHQUFHO0lBQ2QsVUFBVSxFQUFFLFlBQVk7SUFDeEIsWUFBWSxFQUFFLFFBQVE7SUFDdEIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsYUFBYSxFQUFFLFlBQVk7SUFDM0IsZUFBZSxFQUFFLFFBQVE7SUFDekIsY0FBYyxFQUFFLFVBQVU7SUFDMUIsYUFBYSxFQUFFLFlBQVk7SUFDM0IsZUFBZSxFQUFFLFFBQVE7SUFDekIsY0FBYyxFQUFFLFVBQVU7Q0FDN0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUMwQyxrREFBYTtJQVdyRCxnQ0FBbUIsR0FBZ0IsRUFBUyxJQUFnQjtRQUE1RCxZQUVJLGtCQUFNLEdBQUcsQ0FBQyxTQUViO1FBSmtCLFNBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxVQUFJLEdBQUosSUFBSSxDQUFZOzs7Ozs7c0JBSGhDLFVBQVU7O0tBT3JDOzs7O0lBR0QseUNBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4RTs7Z0JBOUJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsSUFBSSxFQUFFO3dCQUNGLE9BQU8sRUFBRSxjQUFjO3FCQUMxQjtpQkFDSjs7OztnQkFsRU8sV0FBVztnQkFGQSxVQUFVOzs7d0JBNEV4QixLQUFLOztpQ0E5RlY7RUF1RjRDLGFBQWE7U0FBNUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqIE1hcHMgb3VyIGludGVybmFsIGFsaWdubWVudCB2YWx1ZSB0byByZWFsIGNzcyB2YWx1ZXNcbiAqXG4gKi9cbmNvbnN0IFZBbGlnbk1hcCA9IHtcbiAgICAndG9wLWxlZnQnOiAnZmxleC1zdGFydCcsXG4gICAgJ3RvcC1jZW50ZXInOiAnZmxleC1zdGFydCcsXG4gICAgJ3RvcC1yaWdodCc6ICdmbGV4LXN0YXJ0JyxcbiAgICAnY2VudGVyLWxlZnQnOiAnY2VudGVyJyxcbiAgICAnY2VudGVyLWNlbnRlcic6ICdjZW50ZXInLFxuICAgICdjZW50ZXItcmlnaHQnOiAnY2VudGVyJyxcbiAgICAnYm90dG9tLWxlZnQnOiAnZmxleC1lbmQnLFxuICAgICdib3R0b20tY2VudGVyJzogJ2ZsZXgtZW5kJyxcbiAgICAnYm90dG9tLXJpZ2h0JzogJ2ZsZXgtZW5kJ1xufTtcblxuXG5jb25zdCBIQWxpZ25NYXAgPSB7XG4gICAgJ3RvcC1sZWZ0JzogJ2ZsZXgtc3RhcnQnLFxuICAgICd0b3AtY2VudGVyJzogJ2NlbnRlcicsXG4gICAgJ3RvcC1yaWdodCc6ICdmbGV4LWVuZCcsXG4gICAgJ2NlbnRlci1sZWZ0JzogJ2ZsZXgtc3RhcnQnLFxuICAgICdjZW50ZXItY2VudGVyJzogJ2NlbnRlcicsXG4gICAgJ2NlbnRlci1yaWdodCc6ICdmbGV4LWVuZCcsXG4gICAgJ2JvdHRvbS1sZWZ0JzogJ2ZsZXgtc3RhcnQnLFxuICAgICdib3R0b20tY2VudGVyJzogJ2NlbnRlcicsXG4gICAgJ2JvdHRvbS1yaWdodCc6ICdmbGV4LWVuZCdcbn07XG5cblxuLyoqXG4gKiBUaXRsZSB6b25lIHByb3ZpZGVzIGEgY29udGVudCBwbGFjZWhvbGRlciBmb3IgdGhlIFRpdGxlIEFyZWEuIFRoaXMgem9uZSBpcyBhZGRpbmcgYWJpbGl0eVxuICogdG8gYWxpZ24gaXRzIGNvbnRlbnQgaW50byA5IGRpZmZlcmVudCBwb3NpdGlvbi5cbiAqXG4gKiBZb3UgY2FuIHVzZSB0aGlzIFRpdGxlIHpvbmUgd2l0aGluIDxhdy1jYXJkPiBhczpcbiAqXG4gKlxuICogYGBgaHRtbFxuICpcbiAqICA8YXctY2FyZCAgW3dpZHRoXT1cIicyMDJweCdcIiBbaGVpZ2h0XT1cIicxNTRweCdcIiBbaGFzSG92ZXJdPVwidHJ1ZVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGFibGVdPVwiZmFsc2VcIiBbaGFzQWN0aW9uXT1cImZhbHNlXCJcbiAqICAgICAgICAgICAgICAgICAgKG9uSG92ZXJBY3Rpb24pPVwib25BY3Rpb24oNywgJGV2ZW50KVwiID5cbiAqXG4gKiAgICAgICAgICAgICAgICAgIDxhdy1jYXJkLXRpdGxlIFthbGlnbl09XCInYm90dG9tLWxlZnQnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImEtc3VwcGxpZXItdGFnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJlZmVycmVkXG4gKiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gKiAgICAgICAgICAgICAgICAgIDwvYXctY2FyZC10aXRsZT5cbiAqXG4gKiAgIDwvYXctY2FyZD5cbiAqXG4gKiBgYGBcbiAqIERlZmF1bHQgYWxpZ25tZW50IGlzIHRvcC1sZWZ0XG4gKlxuICpcbiAqXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYGF3LWNhcmQtdGl0bGVgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3ctY2FyZC10aXRsZSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENhcmRab25lVGl0bGVDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogU3BlY2lhbCBwcm9wZXJ0eSB3aGljaCBpcyB1c2VkIHRvIGFwcGx5IGZsZXggcHJvcGVydGllcyBmb3IgYWxpZ25pbmcgY29udGVudCB2ZXJ0aWNhbGx5XG4gICAgICogYXMgd2VsbCBhcyBob3Jpem9udGFsbHlcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWxpZ246IENhcmRUaXRsZUFsaWdubWVudCA9ICd0b3AtbGVmdCc7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwdWJsaWMgZWxlbTogRWxlbWVudFJlZilcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYWxpZ25JdGVtcyA9IFZBbGlnbk1hcFt0aGlzLmFsaWduXTtcbiAgICAgICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBIQWxpZ25NYXBbdGhpcy5hbGlnbl07XG4gICAgfVxufVxuXG5cbi8qKlxuICogTWFrZSBzdXJlIHdlIGRvbnQgYWNjZXB0IGFueSB1bnN1cHBvcnRlZCB2YWx1ZXMuIFRoZXNlIHZhbHVlcyBtYXBzIHRvIHRoZSBIQWxpZ25NYXAgYW5kXG4gKiBWQWxpZ25NYXAgaW4gb3JkZXIgdG8gZ2V0IHJlYWwgY3NzIHZhbHVlIGZvciB0aGUgZmxleCBhbGlnbm1lbnRcbiAqL1xuZXhwb3J0IHR5cGUgQ2FyZFRpdGxlQWxpZ25tZW50ID0gJ3RvcC1sZWZ0JyB8ICd0b3AtY2VudGVyJyB8ICd0b3AtcmlnaHQnIHwgJ2NlbnRlci1sZWZ0JyB8XG4gICAgJ2NlbnRlci1jZW50ZXInICB8ICdjZW50ZXItcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tY2VudGVyJyB8ICdib3R0b20tcmlnaHQnO1xuXG4iXX0=