/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @type {?} */
        var bindings = this.context.propertyForKey(UIMeta.KeyBindings);
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
        /** @type {?} */
        var obj = (/** @type {?} */ (this.context)).object;
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
                }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1mb3JtLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWZvcm0vbWV0YS1mb3JtLXRhYmxlL21ldGEtZm9ybS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFtQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUN2RixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0lBV0Esa0RBQWlCO0lBeUJ6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUdILGdDQUE4QixRQUE4QixFQUFTLEdBQWdCO1FBQXJGLFlBRUksa0JBQU0sR0FBRyxFQUFFLFFBQVEsQ0FBQyxTQUN2QjtRQUg2QixjQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUFTLFNBQUcsR0FBSCxHQUFHLENBQWE7O0tBR3BGOzs7OztJQUdELDRDQUFXOzs7O0lBQVgsVUFBWSxJQUFZO1FBRXBCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RFOzs7O0lBR1MseUNBQVE7OztJQUFsQjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztRQUcvRSxJQUFJLFFBQVEsR0FBcUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pGLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUV2RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO2FBQ3hDO1NBQ0o7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbkI7Ozs7SUFHRCxzQ0FBSzs7O0lBQUw7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRUQsd0NBQU87OztJQUFQO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDs7OztJQUVELHVDQUFNOzs7SUFBTjtRQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEQ7Ozs7SUFFRCxxQ0FBSTs7O0lBQUo7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRUQsd0NBQU87OztJQUFQO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDs7Ozs7Ozs7SUFTTyx5Q0FBUTs7Ozs7Ozs7O1FBRVosRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0Qzs7UUFDRCxJQUFJLEdBQUcsR0FBRyxtQkFBWSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsTUFBTSxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBVztnQkFFakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEMsQ0FBQyxDQUFDO1NBQ047OztnQkFuSVIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4Qixvc0VBQTZDOztpQkFFaEQ7Ozs7Z0JBWE8sb0JBQW9CLHVCQThEWCxJQUFJO2dCQWpFYixXQUFXOzs7dUJBcUNkLFNBQVMsU0FBQyxlQUFlOztpQ0F6RDlCO0VBbUM0QyxpQkFBaUI7U0FBaEQsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgSG9zdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Zvcm1UYWJsZUNvbXBvbmVudH0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge01ldGFCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9tZXRhLmJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7TWV0YUNvbnRleHRDb21wb25lbnR9IGZyb20gJy4uLy4uLy4uL2NvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uLy4uLy4uL2NvcmUvdWltZXRhJztcbmltcG9ydCB7VUlDb250ZXh0fSBmcm9tICcuLi8uLi8uLi9jb3JlL2NvbnRleHQnO1xuXG4vKipcbiAqIFRoaXMgaXMgYSB3cmFwcGVyIGFyb3VuZCBGb3JtdFRhYmxlIHRvIHJlbmRlciBkYXRhIGJhc2VkIG9uIGN1cnJlbnQgTWV0YUNvbnRleHQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbS1mb3JtLXRhYmxlJyxcbiAgICB0ZW1wbGF0ZVVybDogJ21ldGEtZm9ybS10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ21ldGEtZm9ybS10YWJsZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFGb3JtVGFibGVDb21wb25lbnQgZXh0ZW5kcyBNZXRhQmFzZUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIEZvciBtdWx0aXpvbmUgbGF5b3V0IHRoaXMgY29udGFpbnMgZmllbGRzIGJyb2tlbiBieSBpdHMgYXNzaWduZWQgem9uZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGZpZWxkc0J5Wm9uZTogTWFwPHN0cmluZywgYW55PjtcblxuICAgIC8qKlxuICAgICAqIElzIGZpdmUgem9uZSBsYXlvdXQ/IEZvck1ldGFVaSB3ZSBwcm9iYWxieSBoYXZlIGFsd2F5cyBmaXZlWm9uZSwgdW5sZXNzIGluIE1ldGFSdWxlcyB3ZSBzYXlcbiAgICAgKiBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBpc0ZpdmVab25lTGF5b3V0OiBib29sZWFuO1xuXG5cbiAgICAvKipcbiAgICAgKiBEbyB3ZSBoYXZlIGxhYmVscyBvbiB0b3AgbGF5b3V0P1xuICAgICAqL1xuICAgIHNob3dMYWJlbHNBYm92ZUNvbnRyb2xzOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogUmVmZXJlbmNlIHRvIGN1cnJlbnQgcmVuZGVyZWQgRm9ybVRhYmxlXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnbWV0YUZvcm1UYWJsZScpXG4gICAgcHJpdmF0ZSBmb3JtOiBGb3JtVGFibGVDb21wb25lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmUgem9uZXMgcGFzc2VkIHRvIHRoZSBGb3JtVGFibGUuXG4gICAgICpcbiAgICAgKiBOb3RlOiBJIGNvdWxkIG5vdCBmaW5kIGJldHRlciB3YXkgd2l0aG91dCBoYXZpbmcgdGhpcyBwcm9wZXJ0eS4gV2hlbiB1c2luZyBGb3JtVGFibGUgSSBkb250XG4gICAgICogd2FudCB0byB0ZWxsIHdoYXQgem9uZXMgYXJlIGFjdGl2ZS4gVGhlIGZvcm0gdGFibGUgc2hvdWxkIGZpZ3VyZSBvdXQgYnlpdHNlbGYganVzdCBmcm9tIHRoZVxuICAgICAqIG5nLWNvbnRlbnRlZCBzZWN0aW9ucy5cbiAgICAgKlxuICAgICAqIFRoZSBvdGhlciBhcHByb2FjaCBpcyB0aGUgd3JhcCB0aGVzZSBpbnRvIGNvbXBvbmVudCBhbmQgcHJvYmFibHkgYmV0dGVyXG4gICAgICpcbiAgICAgKmUuZy5cbiAgICAgKlxuICAgICAqIGBgYGh0bWxcbiAgICAgKiAgPGF3LWZvcm0tdGFibGUgLi4uPlxuICAgICAqICAgIDxhdy1mb3JtLXpvbmUgbmFtZT0ndG9wJz5cbiAgICAgKiAgICAgICAgPGF3LWZvcm0tcm93Pi4uLjwvYXctZm9ybS1yb3c+XG4gICAgICogICAgIDxhdy1mb3JtLXpvbmU+XG4gICAgICpcbiAgICAgKlxuICAgICAqICAgIC4uLlxuICAgICAqICA8L2F3LWZvcm0tdGFibGUgLi4uPlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICovXG5cblxuICAgIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHJvdGVjdGVkIF9jb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIF9jb250ZXh0KTtcbiAgICB9XG5cblxuICAgIGNhblNob3dab25lKHpvbmU6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5maWVsZHNCeVpvbmUpICYmIHRoaXMuZmllbGRzQnlab25lLmhhcyh6b25lKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBkb1VwZGF0ZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5kb1VwZGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZmllbGRzQnlab25lID0gdGhpcy5jb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5Qcm9wRmllbGRzQnlab25lKTtcbiAgICAgICAgdGhpcy5pc0ZpdmVab25lTGF5b3V0ID0gdGhpcy5jb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5Qcm9wSXNGaWVsZHNCeVpvbmUpO1xuXG5cbiAgICAgICAgbGV0IGJpbmRpbmdzOiBNYXA8c3RyaW5nLCBhbnk+ID0gdGhpcy5jb250ZXh0LnByb3BlcnR5Rm9yS2V5KFVJTWV0YS5LZXlCaW5kaW5ncyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmluZGluZ3MpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dMYWJlbHNBYm92ZUNvbnRyb2xzID0gYmluZGluZ3MuZ2V0KCdzaG93TGFiZWxzQWJvdmVDb250cm9scycpO1xuXG4gICAgICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnNob3dMYWJlbHNBYm92ZUNvbnRyb2xzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xhYmVsc0Fib3ZlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdEZvcm0oKTtcbiAgICB9XG5cblxuICAgIHpMZWZ0KCk6IHN0cmluZ1tdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZHNCeVpvbmUuZ2V0KFVJTWV0YS5ab25lTGVmdCk7XG4gICAgfVxuXG4gICAgek1pZGRsZSgpOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzQnlab25lLmdldChVSU1ldGEuWm9uZU1pZGRsZSk7XG4gICAgfVxuXG4gICAgelJpZ2h0KCk6IHN0cmluZ1tdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZHNCeVpvbmUuZ2V0KFVJTWV0YS5ab25lUmlnaHQpO1xuICAgIH1cblxuICAgIHpUb3AoKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkc0J5Wm9uZS5nZXQoVUlNZXRhLlpvbmVUb3ApO1xuICAgIH1cblxuICAgIHpCb3R0b20oKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkc0J5Wm9uZS5nZXQoVUlNZXRhLlpvbmVCb3R0b20pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTmVlZCB0byBpbml0aWFsaXplIEZvcm1Hcm91cCB3aXRoIGFsbCB0aGUgYXZhaWxhYmxlIGZpZWxkcyBiYXNlZCBvbiB0aGUgZ2l2ZW4gb2JqZWN0LiBJdHNcbiAgICAgKiBoYXJkIHRvIG1hbmFnZSBhIHN0YXRlIHdoZXJlIHdlIGR5bmFtaWNhbGx5IHJlbmRlciBkaWZmZXJlbnQgbnVtYmVyIG9mIGZpZWxkcyBwZXIgb3BlcmF0aW9uLlxuICAgICAqXG4gICAgICogKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdEZvcm0oKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZvcm0pKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uZWRpdGFibGUgPSB0aGlzLmVkaXRhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvYmogPSAoPFVJQ29udGV4dD50aGlzLmNvbnRleHQpLm9iamVjdDtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZm9ybUdyb3VwLnZhbHVlKS5sZW5ndGggIT09IE9iamVjdC5rZXlzKG9iaikubGVuZ3RoKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goKGtleTogc3RyaW5nKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9SZWdpc3RlcihrZXksIG9ialtrZXldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=