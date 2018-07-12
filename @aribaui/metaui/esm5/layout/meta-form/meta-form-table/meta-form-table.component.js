/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Host, ViewChild } from '@angular/core';
import { Environment, isBlank, isPresent } from '@aribaui/core';
import { FormTableComponent } from '@aribaui/components';
import { MetaBaseComponent } from '../../meta.base.component';
import { MetaContextComponent } from '../../../core/meta-context/meta-context.component';
import { UIMeta } from '../../../core/uimeta';
/**
 * This is a wrapper around FormtTable to render data based on current MetaContext.
 */
var MetaFormTableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaFormTableComponent, _super);
    /**
     * Active zones passed to the FormTable.
     *
     * Note: I could not find better way without having this property. When using FormTable I dont
     * want to tell what zones are active. The form table should figure out byitself just from the
     * ng-contented sections.
     *
     * The other approach is the wrap these into component and probably better
     *
     *e.g.
     *
     * ```html
     *  <aw-form-table ...>
     *    <aw-form-zone name='top'>
     *        <aw-form-row>...</aw-form-row>
     *     <aw-form-zone>
     *
     *
     *    ...
     *  </aw-form-table ...>
     * ```
     *
     */
    function MetaFormTableComponent(_context, env) {
        var _this = _super.call(this, env, _context) || this;
        _this._context = _context;
        _this.env = env;
        return _this;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    MetaFormTableComponent.prototype.canShowZone = /**
     * @param {?} zone
     * @return {?}
     */
    function (zone) {
        return isPresent(this.fieldsByZone) && this.fieldsByZone.has(zone);
    };
    /**
     * @return {?}
     */
    MetaFormTableComponent.prototype.doUpdate = /**
     * @return {?}
     */
    function () {
        _super.prototype.doUpdate.call(this);
        this.fieldsByZone = this.context.propertyForKey(UIMeta.PropFieldsByZone);
        this.isFiveZoneLayout = this.context.propertyForKey(UIMeta.PropIsFieldsByZone);
        var /** @type {?} */ bindings = this.context.propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings)) {
            this.showLabelsAboveControls = bindings.get('showLabelsAboveControls');
            if (isBlank(this.showLabelsAboveControls)) {
                this.showLabelsAboveControls = false;
            }
        }
        this.initForm();
    };
    /**
     * @return {?}
     */
    MetaFormTableComponent.prototype.zLeft = /**
     * @return {?}
     */
    function () {
        return this.fieldsByZone.get(UIMeta.ZoneLeft);
    };
    /**
     * @return {?}
     */
    MetaFormTableComponent.prototype.zMiddle = /**
     * @return {?}
     */
    function () {
        return this.fieldsByZone.get(UIMeta.ZoneMiddle);
    };
    /**
     * @return {?}
     */
    MetaFormTableComponent.prototype.zRight = /**
     * @return {?}
     */
    function () {
        return this.fieldsByZone.get(UIMeta.ZoneRight);
    };
    /**
     * @return {?}
     */
    MetaFormTableComponent.prototype.zTop = /**
     * @return {?}
     */
    function () {
        return this.fieldsByZone.get(UIMeta.ZoneTop);
    };
    /**
     * @return {?}
     */
    MetaFormTableComponent.prototype.zBottom = /**
     * @return {?}
     */
    function () {
        return this.fieldsByZone.get(UIMeta.ZoneBottom);
    };
    /**
     * Need to initialize FormGroup with all the available fields based on the given object. Its
     * hard to manage a state where we dynamically render different number of fields per operation.
     *
     * *
     * @return {?}
     */
    MetaFormTableComponent.prototype.initForm = /**
     * Need to initialize FormGroup with all the available fields based on the given object. Its
     * hard to manage a state where we dynamically render different number of fields per operation.
     *
     * *
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPresent(this.form)) {
            this.form.editable = this.editable;
        }
        var /** @type {?} */ obj = (/** @type {?} */ (this.context)).object;
        if (Object.keys(this.formGroup.value).length !== Object.keys(obj).length) {
            Object.keys(obj).forEach(function (key) {
                _this.doRegister(key, obj[key]);
            });
        }
    };
    MetaFormTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'm-form-table',
                    template: "<ng-template [ngIf]=\"isFiveZoneLayout\">\n\n    <aw-form-table #metaFormTable [editable]=\"editing\" [useFiveZone]=\"isFiveZoneLayout\"\n                   [omitPadding]=\"isNestedContext()\"\n                   [editabilityCheck]=\"false\"\n                   [labelsOnTop]=\"showLabelsAboveControls\">\n\n\n        <aw-top *ngIf=\"canShowZone('zTop')\">\n            <ng-template ngFor let-curentField [ngForOf]=\"zTop()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"\n                                [initialSize]=\"'x-large'\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-top>\n\n\n        <aw-left *ngIf=\"canShowZone('zLeft')\">\n\n            <ng-template ngFor let-curentField [ngForOf]=\"zLeft()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-left>\n\n\n        <aw-middle *ngIf=\"canShowZone('zMiddle')\">\n            <ng-template ngFor let-curentField [ngForOf]=\"zMiddle()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-middle>\n\n        <aw-right *ngIf=\"canShowZone('zRight')\">\n            <ng-template ngFor let-curentField [ngForOf]=\"zRight()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-right>\n\n\n        <aw-bottom *ngIf=\"canShowZone('zBottom')\">\n            <ng-template ngFor let-curentField [ngForOf]=\"zBottom()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"\n                                [initialSize]=\"'x-large'\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-bottom>\n    </aw-form-table>\n</ng-template>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    MetaFormTableComponent.ctorParameters = function () { return [
        { type: MetaContextComponent, decorators: [{ type: Host }] },
        { type: Environment }
    ]; };
    MetaFormTableComponent.propDecorators = {
        form: [{ type: ViewChild, args: ['metaFormTable',] }]
    };
    return MetaFormTableComponent;
}(MetaBaseComponent));
export { MetaFormTableComponent };
function MetaFormTableComponent_tsickle_Closure_declarations() {
    /**
     * For multizone layout this contains fields broken by its assigned zones
     * @type {?}
     */
    MetaFormTableComponent.prototype.fieldsByZone;
    /**
     * Is five zone layout? ForMetaUi we probalby have always fiveZone, unless in MetaRules we say
     * otherwise
     * @type {?}
     */
    MetaFormTableComponent.prototype.isFiveZoneLayout;
    /**
     * Do we have labels on top layout?
     * @type {?}
     */
    MetaFormTableComponent.prototype.showLabelsAboveControls;
    /**
     * Reference to current rendered FormTable
     * @type {?}
     */
    MetaFormTableComponent.prototype.form;
    /** @type {?} */
    MetaFormTableComponent.prototype._context;
    /** @type {?} */
    MetaFormTableComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1mb3JtLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWZvcm0vbWV0YS1mb3JtLXRhYmxlL21ldGEtZm9ybS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFtQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUN2RixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0lBa0VBLGtEQUFpQjtJQXlCekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFHSCxnQ0FBOEIsUUFBOEIsRUFBUyxHQUFnQjtRQUFyRixZQUVJLGtCQUFNLEdBQUcsRUFBRSxRQUFRLENBQUMsU0FDdkI7UUFINkIsY0FBUSxHQUFSLFFBQVEsQ0FBc0I7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhOztLQUdwRjs7Ozs7SUFHRCw0Q0FBVzs7OztJQUFYLFVBQVksSUFBWTtRQUVwQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0RTs7OztJQUdTLHlDQUFROzs7SUFBbEI7UUFFSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUcvRSxxQkFBSSxRQUFRLEdBQXFCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFFdkUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQzthQUN4QztTQUNKO1FBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ25COzs7O0lBR0Qsc0NBQUs7OztJQUFMO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqRDs7OztJQUVELHdDQUFPOzs7SUFBUDtRQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7Ozs7SUFFRCx1Q0FBTTs7O0lBQU47UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xEOzs7O0lBRUQscUNBQUk7OztJQUFKO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNoRDs7OztJQUVELHdDQUFPOzs7SUFBUDtRQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7O0lBU08seUNBQVE7Ozs7Ozs7OztRQUVaLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEM7UUFDRCxxQkFBSSxHQUFHLEdBQUcsbUJBQVksSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQVc7Z0JBRWpDLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2xDLENBQUMsQ0FBQztTQUNOOzs7Z0JBMUxSLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLDByRUF1RGI7b0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNmOzs7O2dCQWxFTyxvQkFBb0IsdUJBcUhYLElBQUk7Z0JBeEhiLFdBQVc7Ozt1QkE0RmQsU0FBUyxTQUFDLGVBQWU7O2lDQWhIOUI7RUEwRjRDLGlCQUFpQjtTQUFoRCxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBIb3N0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Rm9ybVRhYmxlQ29tcG9uZW50fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7TWV0YUJhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL21ldGEuYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vLi4vLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtVSUNvbnRleHR9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29udGV4dCc7XG5cbi8qKlxuICogVGhpcyBpcyBhIHdyYXBwZXIgYXJvdW5kIEZvcm10VGFibGUgdG8gcmVuZGVyIGRhdGEgYmFzZWQgb24gY3VycmVudCBNZXRhQ29udGV4dC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWZvcm0tdGFibGUnLFxuICAgIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzRml2ZVpvbmVMYXlvdXRcIj5cblxuICAgIDxhdy1mb3JtLXRhYmxlICNtZXRhRm9ybVRhYmxlIFtlZGl0YWJsZV09XCJlZGl0aW5nXCIgW3VzZUZpdmVab25lXT1cImlzRml2ZVpvbmVMYXlvdXRcIlxuICAgICAgICAgICAgICAgICAgIFtvbWl0UGFkZGluZ109XCJpc05lc3RlZENvbnRleHQoKVwiXG4gICAgICAgICAgICAgICAgICAgW2VkaXRhYmlsaXR5Q2hlY2tdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgIFtsYWJlbHNPblRvcF09XCJzaG93TGFiZWxzQWJvdmVDb250cm9sc1wiPlxuXG5cbiAgICAgICAgPGF3LXRvcCAqbmdJZj1cImNhblNob3dab25lKCd6VG9wJylcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY3VyZW50RmllbGQgW25nRm9yT2ZdPVwielRvcCgpXCI+XG4gICAgICAgICAgICAgICAgPG0tY29udGV4dCBbZmllbGRdPVwiY3VyZW50RmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG0tZm9ybS1yb3cgW2ZpZWxkXT1cImN1cmVudEZpZWxkXCIgW2VkaXRhYmxlXT1cImVkaXRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5pdGlhbFNpemVdPVwiJ3gtbGFyZ2UnXCI+PC9tLWZvcm0tcm93PlxuICAgICAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9hdy10b3A+XG5cblxuICAgICAgICA8YXctbGVmdCAqbmdJZj1cImNhblNob3dab25lKCd6TGVmdCcpXCI+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY3VyZW50RmllbGQgW25nRm9yT2ZdPVwiekxlZnQoKVwiPlxuICAgICAgICAgICAgICAgIDxtLWNvbnRleHQgW2ZpZWxkXT1cImN1cmVudEZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtLWZvcm0tcm93IFtmaWVsZF09XCJjdXJlbnRGaWVsZFwiIFtlZGl0YWJsZV09XCJlZGl0aW5nXCI+PC9tLWZvcm0tcm93PlxuICAgICAgICAgICAgICAgIDwvbS1jb250ZXh0PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9hdy1sZWZ0PlxuXG5cbiAgICAgICAgPGF3LW1pZGRsZSAqbmdJZj1cImNhblNob3dab25lKCd6TWlkZGxlJylcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY3VyZW50RmllbGQgW25nRm9yT2ZdPVwiek1pZGRsZSgpXCI+XG4gICAgICAgICAgICAgICAgPG0tY29udGV4dCBbZmllbGRdPVwiY3VyZW50RmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG0tZm9ybS1yb3cgW2ZpZWxkXT1cImN1cmVudEZpZWxkXCIgW2VkaXRhYmxlXT1cImVkaXRpbmdcIj48L20tZm9ybS1yb3c+XG4gICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2F3LW1pZGRsZT5cblxuICAgICAgICA8YXctcmlnaHQgKm5nSWY9XCJjYW5TaG93Wm9uZSgnelJpZ2h0JylcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY3VyZW50RmllbGQgW25nRm9yT2ZdPVwielJpZ2h0KClcIj5cbiAgICAgICAgICAgICAgICA8bS1jb250ZXh0IFtmaWVsZF09XCJjdXJlbnRGaWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICA8bS1mb3JtLXJvdyBbZmllbGRdPVwiY3VyZW50RmllbGRcIiBbZWRpdGFibGVdPVwiZWRpdGluZ1wiPjwvbS1mb3JtLXJvdz5cbiAgICAgICAgICAgICAgICA8L20tY29udGV4dD5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYXctcmlnaHQ+XG5cblxuICAgICAgICA8YXctYm90dG9tICpuZ0lmPVwiY2FuU2hvd1pvbmUoJ3pCb3R0b20nKVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jdXJlbnRGaWVsZCBbbmdGb3JPZl09XCJ6Qm90dG9tKClcIj5cbiAgICAgICAgICAgICAgICA8bS1jb250ZXh0IFtmaWVsZF09XCJjdXJlbnRGaWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICA8bS1mb3JtLXJvdyBbZmllbGRdPVwiY3VyZW50RmllbGRcIiBbZWRpdGFibGVdPVwiZWRpdGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbml0aWFsU2l6ZV09XCIneC1sYXJnZSdcIj48L20tZm9ybS1yb3c+XG4gICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2F3LWJvdHRvbT5cbiAgICA8L2F3LWZvcm0tdGFibGU+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUZvcm1UYWJsZUNvbXBvbmVudCBleHRlbmRzIE1ldGFCYXNlQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogRm9yIG11bHRpem9uZSBsYXlvdXQgdGhpcyBjb250YWlucyBmaWVsZHMgYnJva2VuIGJ5IGl0cyBhc3NpZ25lZCB6b25lc1xuICAgICAqL1xuICAgIHByaXZhdGUgZmllbGRzQnlab25lOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gICAgLyoqXG4gICAgICogSXMgZml2ZSB6b25lIGxheW91dD8gRm9yTWV0YVVpIHdlIHByb2JhbGJ5IGhhdmUgYWx3YXlzIGZpdmVab25lLCB1bmxlc3MgaW4gTWV0YVJ1bGVzIHdlIHNheVxuICAgICAqIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGlzRml2ZVpvbmVMYXlvdXQ6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIERvIHdlIGhhdmUgbGFiZWxzIG9uIHRvcCBsYXlvdXQ/XG4gICAgICovXG4gICAgc2hvd0xhYmVsc0Fib3ZlQ29udHJvbHM6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gY3VycmVudCByZW5kZXJlZCBGb3JtVGFibGVcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdtZXRhRm9ybVRhYmxlJylcbiAgICBwcml2YXRlIGZvcm06IEZvcm1UYWJsZUNvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIEFjdGl2ZSB6b25lcyBwYXNzZWQgdG8gdGhlIEZvcm1UYWJsZS5cbiAgICAgKlxuICAgICAqIE5vdGU6IEkgY291bGQgbm90IGZpbmQgYmV0dGVyIHdheSB3aXRob3V0IGhhdmluZyB0aGlzIHByb3BlcnR5LiBXaGVuIHVzaW5nIEZvcm1UYWJsZSBJIGRvbnRcbiAgICAgKiB3YW50IHRvIHRlbGwgd2hhdCB6b25lcyBhcmUgYWN0aXZlLiBUaGUgZm9ybSB0YWJsZSBzaG91bGQgZmlndXJlIG91dCBieWl0c2VsZiBqdXN0IGZyb20gdGhlXG4gICAgICogbmctY29udGVudGVkIHNlY3Rpb25zLlxuICAgICAqXG4gICAgICogVGhlIG90aGVyIGFwcHJvYWNoIGlzIHRoZSB3cmFwIHRoZXNlIGludG8gY29tcG9uZW50IGFuZCBwcm9iYWJseSBiZXR0ZXJcbiAgICAgKlxuICAgICAqZS5nLlxuICAgICAqXG4gICAgICogYGBgaHRtbFxuICAgICAqICA8YXctZm9ybS10YWJsZSAuLi4+XG4gICAgICogICAgPGF3LWZvcm0tem9uZSBuYW1lPSd0b3AnPlxuICAgICAqICAgICAgICA8YXctZm9ybS1yb3c+Li4uPC9hdy1mb3JtLXJvdz5cbiAgICAgKiAgICAgPGF3LWZvcm0tem9uZT5cbiAgICAgKlxuICAgICAqXG4gICAgICogICAgLi4uXG4gICAgICogIDwvYXctZm9ybS10YWJsZSAuLi4+XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKi9cblxuXG4gICAgY29uc3RydWN0b3IoQEhvc3QoKSBwcm90ZWN0ZWQgX2NvbnRleHQ6IE1ldGFDb250ZXh0Q29tcG9uZW50LCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgX2NvbnRleHQpO1xuICAgIH1cblxuXG4gICAgY2FuU2hvd1pvbmUoem9uZTogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmZpZWxkc0J5Wm9uZSkgJiYgdGhpcy5maWVsZHNCeVpvbmUuaGFzKHpvbmUpO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGRvVXBkYXRlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLmRvVXBkYXRlKCk7XG5cbiAgICAgICAgdGhpcy5maWVsZHNCeVpvbmUgPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLlByb3BGaWVsZHNCeVpvbmUpO1xuICAgICAgICB0aGlzLmlzRml2ZVpvbmVMYXlvdXQgPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLlByb3BJc0ZpZWxkc0J5Wm9uZSk7XG5cblxuICAgICAgICBsZXQgYmluZGluZ3M6IE1hcDxzdHJpbmcsIGFueT4gPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChiaW5kaW5ncykpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xhYmVsc0Fib3ZlQ29udHJvbHMgPSBiaW5kaW5ncy5nZXQoJ3Nob3dMYWJlbHNBYm92ZUNvbnRyb2xzJyk7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2hvd0xhYmVsc0Fib3ZlQ29udHJvbHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TGFiZWxzQWJvdmVDb250cm9scyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgIH1cblxuXG4gICAgekxlZnQoKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkc0J5Wm9uZS5nZXQoVUlNZXRhLlpvbmVMZWZ0KTtcbiAgICB9XG5cbiAgICB6TWlkZGxlKCk6IHN0cmluZ1tdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZHNCeVpvbmUuZ2V0KFVJTWV0YS5ab25lTWlkZGxlKTtcbiAgICB9XG5cbiAgICB6UmlnaHQoKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkc0J5Wm9uZS5nZXQoVUlNZXRhLlpvbmVSaWdodCk7XG4gICAgfVxuXG4gICAgelRvcCgpOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzQnlab25lLmdldChVSU1ldGEuWm9uZVRvcCk7XG4gICAgfVxuXG4gICAgekJvdHRvbSgpOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzQnlab25lLmdldChVSU1ldGEuWm9uZUJvdHRvbSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGluaXRpYWxpemUgRm9ybUdyb3VwIHdpdGggYWxsIHRoZSBhdmFpbGFibGUgZmllbGRzIGJhc2VkIG9uIHRoZSBnaXZlbiBvYmplY3QuIEl0c1xuICAgICAqIGhhcmQgdG8gbWFuYWdlIGEgc3RhdGUgd2hlcmUgd2UgZHluYW1pY2FsbHkgcmVuZGVyIGRpZmZlcmVudCBudW1iZXIgb2YgZmllbGRzIHBlciBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0Rm9ybSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZm9ybSkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5lZGl0YWJsZSA9IHRoaXMuZWRpdGFibGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9iaiA9ICg8VUlDb250ZXh0PnRoaXMuY29udGV4dCkub2JqZWN0O1xuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5mb3JtR3JvdXAudmFsdWUpLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMob2JqKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb1JlZ2lzdGVyKGtleSwgb2JqW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==