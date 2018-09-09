/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Host, ViewChild } from '@angular/core';
import { Environment, isBlank, isPresent } from '@aribaui/core';
import { FormTableComponent } from '@aribaui/components';
import { MetaBaseComponent } from '../../meta.base.component';
import { MetaContextComponent } from '../../../core/meta-context/meta-context.component';
import { UIMeta } from '../../../core/uimeta';
/**
 * This is a wrapper around FormtTable to render data based on current MetaContext.
 */
export class MetaFormTableComponent extends MetaBaseComponent {
    /**
     * Active zones passed to the FormTable.
     *
     * Note: I could not find better way without having this property. When using FormTable I dont
     * want to tell what zones are active. The form table should figure out byitself just from the
     * ng-contented sections.
     *
     * The other approach is the wrap these into component and probably better
     *
     * e.g.
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
     * @param {?} _context
     * @param {?} env
     */
    constructor(_context, env) {
        super(env, _context);
        this._context = _context;
        this.env = env;
    }
    /**
     * @param {?} zone
     * @return {?}
     */
    canShowZone(zone) {
        return isPresent(this.fieldsByZone) && this.fieldsByZone.has(zone);
    }
    /**
     * @return {?}
     */
    doUpdate() {
        super.doUpdate();
        this.fieldsByZone = this.context.propertyForKey(UIMeta.PropFieldsByZone);
        this.isFiveZoneLayout = this.context.propertyForKey(UIMeta.PropIsFieldsByZone);
        /** @type {?} */
        let bindings = this.context.propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings)) {
            this.showLabelsAboveControls = bindings.get('showLabelsAboveControls');
            if (isBlank(this.showLabelsAboveControls)) {
                this.showLabelsAboveControls = false;
            }
        }
        this.initForm();
    }
    /**
     * @return {?}
     */
    zLeft() {
        return this.fieldsByZone.get(UIMeta.ZoneLeft);
    }
    /**
     * @return {?}
     */
    zMiddle() {
        return this.fieldsByZone.get(UIMeta.ZoneMiddle);
    }
    /**
     * @return {?}
     */
    zRight() {
        return this.fieldsByZone.get(UIMeta.ZoneRight);
    }
    /**
     * @return {?}
     */
    zTop() {
        return this.fieldsByZone.get(UIMeta.ZoneTop);
    }
    /**
     * @return {?}
     */
    zBottom() {
        return this.fieldsByZone.get(UIMeta.ZoneBottom);
    }
    /**
     * Need to initialize FormGroup with all the available fields based on the given object. Its
     * hard to manage a state where we dynamically render different number of fields per operation.
     *
     * *
     * @return {?}
     */
    initForm() {
        if (isPresent(this.form)) {
            this.form.editable = this.editable;
        }
        /** @type {?} */
        let obj = (/** @type {?} */ (this.context)).object;
        if (Object.keys(this.formGroup.value).length !== Object.keys(obj).length) {
            Object.keys(obj).forEach((key) => {
                this.doRegister(key, obj[key]);
            });
        }
    }
}
MetaFormTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'm-form-table',
                template: "<ng-template [ngIf]=\"isFiveZoneLayout\">\n\n    <aw-form-table #metaFormTable [editable]=\"editing\" [useFiveZone]=\"isFiveZoneLayout\"\n                   [omitPadding]=\"isNestedContext()\"\n                   [editabilityCheck]=\"false\"\n                   [labelsOnTop]=\"showLabelsAboveControls\">\n\n\n        <aw-top *ngIf=\"canShowZone('zTop')\">\n            <ng-template ngFor let-curentField [ngForOf]=\"zTop()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"\n                                [initialSize]=\"'x-large'\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-top>\n\n\n        <aw-left *ngIf=\"canShowZone('zLeft')\">\n\n            <ng-template ngFor let-curentField [ngForOf]=\"zLeft()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-left>\n\n\n        <aw-middle *ngIf=\"canShowZone('zMiddle')\">\n            <ng-template ngFor let-curentField [ngForOf]=\"zMiddle()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-middle>\n\n        <aw-right *ngIf=\"canShowZone('zRight')\">\n            <ng-template ngFor let-curentField [ngForOf]=\"zRight()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-right>\n\n\n        <aw-bottom *ngIf=\"canShowZone('zBottom')\">\n            <ng-template ngFor let-curentField [ngForOf]=\"zBottom()\">\n                <m-context [field]=\"curentField\">\n                    <m-form-row [field]=\"curentField\" [editable]=\"editing\"\n                                [initialSize]=\"'x-large'\"></m-form-row>\n                </m-context>\n            </ng-template>\n        </aw-bottom>\n    </aw-form-table>\n</ng-template>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MetaFormTableComponent.ctorParameters = () => [
    { type: MetaContextComponent, decorators: [{ type: Host }] },
    { type: Environment }
];
MetaFormTableComponent.propDecorators = {
    form: [{ type: ViewChild, args: ['metaFormTable',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1mb3JtLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWZvcm0vbWV0YS1mb3JtLXRhYmxlL21ldGEtZm9ybS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQVc1QyxNQUFNLDZCQUE4QixTQUFRLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrRHpELFlBQThCLFFBQThCLEVBQVMsR0FBZ0I7UUFFakYsS0FBSyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUZLLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBYTtLQUdwRjs7Ozs7SUFHRCxXQUFXLENBQUMsSUFBWTtRQUVwQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0RTs7OztJQUdTLFFBQVE7UUFFZCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7O1FBRy9FLElBQUksUUFBUSxHQUFxQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakYsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBRXZFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7YUFDeEM7U0FDSjtRQUVELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNuQjs7OztJQUdELEtBQUs7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2pEOzs7O0lBRUQsT0FBTztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7Ozs7SUFFRCxNQUFNO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsRDs7OztJQUVELElBQUk7UUFFQSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRUQsT0FBTztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQ7Ozs7Ozs7O0lBU08sUUFBUTtRQUVaLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEM7O1FBQ0QsSUFBSSxHQUFHLEdBQUcsbUJBQVksSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO2dCQUVyQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsQyxDQUFDLENBQUM7U0FDTjs7OztZQW5JUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLG9zRUFBNkM7O2FBRWhEOzs7O1lBWE8sb0JBQW9CLHVCQThEWCxJQUFJO1lBakViLFdBQVc7OzttQkFxQ2QsU0FBUyxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBIb3N0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Rm9ybVRhYmxlQ29tcG9uZW50fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7TWV0YUJhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL21ldGEuYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vLi4vLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtVSUNvbnRleHR9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29udGV4dCc7XG5cbi8qKlxuICogVGhpcyBpcyBhIHdyYXBwZXIgYXJvdW5kIEZvcm10VGFibGUgdG8gcmVuZGVyIGRhdGEgYmFzZWQgb24gY3VycmVudCBNZXRhQ29udGV4dC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWZvcm0tdGFibGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnbWV0YS1mb3JtLXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnbWV0YS1mb3JtLXRhYmxlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUZvcm1UYWJsZUNvbXBvbmVudCBleHRlbmRzIE1ldGFCYXNlQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogRm9yIG11bHRpem9uZSBsYXlvdXQgdGhpcyBjb250YWlucyBmaWVsZHMgYnJva2VuIGJ5IGl0cyBhc3NpZ25lZCB6b25lc1xuICAgICAqL1xuICAgIHByaXZhdGUgZmllbGRzQnlab25lOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gICAgLyoqXG4gICAgICogSXMgZml2ZSB6b25lIGxheW91dD8gRm9yTWV0YVVpIHdlIHByb2JhbGJ5IGhhdmUgYWx3YXlzIGZpdmVab25lLCB1bmxlc3MgaW4gTWV0YVJ1bGVzIHdlIHNheVxuICAgICAqIG90aGVyd2lzZVxuICAgICAqL1xuICAgIGlzRml2ZVpvbmVMYXlvdXQ6IGJvb2xlYW47XG5cblxuICAgIC8qKlxuICAgICAqIERvIHdlIGhhdmUgbGFiZWxzIG9uIHRvcCBsYXlvdXQ/XG4gICAgICovXG4gICAgc2hvd0xhYmVsc0Fib3ZlQ29udHJvbHM6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2UgdG8gY3VycmVudCByZW5kZXJlZCBGb3JtVGFibGVcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdtZXRhRm9ybVRhYmxlJylcbiAgICBwcml2YXRlIGZvcm06IEZvcm1UYWJsZUNvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIEFjdGl2ZSB6b25lcyBwYXNzZWQgdG8gdGhlIEZvcm1UYWJsZS5cbiAgICAgKlxuICAgICAqIE5vdGU6IEkgY291bGQgbm90IGZpbmQgYmV0dGVyIHdheSB3aXRob3V0IGhhdmluZyB0aGlzIHByb3BlcnR5LiBXaGVuIHVzaW5nIEZvcm1UYWJsZSBJIGRvbnRcbiAgICAgKiB3YW50IHRvIHRlbGwgd2hhdCB6b25lcyBhcmUgYWN0aXZlLiBUaGUgZm9ybSB0YWJsZSBzaG91bGQgZmlndXJlIG91dCBieWl0c2VsZiBqdXN0IGZyb20gdGhlXG4gICAgICogbmctY29udGVudGVkIHNlY3Rpb25zLlxuICAgICAqXG4gICAgICogVGhlIG90aGVyIGFwcHJvYWNoIGlzIHRoZSB3cmFwIHRoZXNlIGludG8gY29tcG9uZW50IGFuZCBwcm9iYWJseSBiZXR0ZXJcbiAgICAgKlxuICAgICAqZS5nLlxuICAgICAqXG4gICAgICogYGBgaHRtbFxuICAgICAqICA8YXctZm9ybS10YWJsZSAuLi4+XG4gICAgICogICAgPGF3LWZvcm0tem9uZSBuYW1lPSd0b3AnPlxuICAgICAqICAgICAgICA8YXctZm9ybS1yb3c+Li4uPC9hdy1mb3JtLXJvdz5cbiAgICAgKiAgICAgPGF3LWZvcm0tem9uZT5cbiAgICAgKlxuICAgICAqXG4gICAgICogICAgLi4uXG4gICAgICogIDwvYXctZm9ybS10YWJsZSAuLi4+XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKi9cblxuXG4gICAgY29uc3RydWN0b3IoQEhvc3QoKSBwcm90ZWN0ZWQgX2NvbnRleHQ6IE1ldGFDb250ZXh0Q29tcG9uZW50LCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgX2NvbnRleHQpO1xuICAgIH1cblxuXG4gICAgY2FuU2hvd1pvbmUoem9uZTogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmZpZWxkc0J5Wm9uZSkgJiYgdGhpcy5maWVsZHNCeVpvbmUuaGFzKHpvbmUpO1xuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGRvVXBkYXRlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLmRvVXBkYXRlKCk7XG5cbiAgICAgICAgdGhpcy5maWVsZHNCeVpvbmUgPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLlByb3BGaWVsZHNCeVpvbmUpO1xuICAgICAgICB0aGlzLmlzRml2ZVpvbmVMYXlvdXQgPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLlByb3BJc0ZpZWxkc0J5Wm9uZSk7XG5cblxuICAgICAgICBsZXQgYmluZGluZ3M6IE1hcDxzdHJpbmcsIGFueT4gPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChiaW5kaW5ncykpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xhYmVsc0Fib3ZlQ29udHJvbHMgPSBiaW5kaW5ncy5nZXQoJ3Nob3dMYWJlbHNBYm92ZUNvbnRyb2xzJyk7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2hvd0xhYmVsc0Fib3ZlQ29udHJvbHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TGFiZWxzQWJvdmVDb250cm9scyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgIH1cblxuXG4gICAgekxlZnQoKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkc0J5Wm9uZS5nZXQoVUlNZXRhLlpvbmVMZWZ0KTtcbiAgICB9XG5cbiAgICB6TWlkZGxlKCk6IHN0cmluZ1tdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5maWVsZHNCeVpvbmUuZ2V0KFVJTWV0YS5ab25lTWlkZGxlKTtcbiAgICB9XG5cbiAgICB6UmlnaHQoKTogc3RyaW5nW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkc0J5Wm9uZS5nZXQoVUlNZXRhLlpvbmVSaWdodCk7XG4gICAgfVxuXG4gICAgelRvcCgpOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzQnlab25lLmdldChVSU1ldGEuWm9uZVRvcCk7XG4gICAgfVxuXG4gICAgekJvdHRvbSgpOiBzdHJpbmdbXVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmllbGRzQnlab25lLmdldChVSU1ldGEuWm9uZUJvdHRvbSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGluaXRpYWxpemUgRm9ybUdyb3VwIHdpdGggYWxsIHRoZSBhdmFpbGFibGUgZmllbGRzIGJhc2VkIG9uIHRoZSBnaXZlbiBvYmplY3QuIEl0c1xuICAgICAqIGhhcmQgdG8gbWFuYWdlIGEgc3RhdGUgd2hlcmUgd2UgZHluYW1pY2FsbHkgcmVuZGVyIGRpZmZlcmVudCBudW1iZXIgb2YgZmllbGRzIHBlciBvcGVyYXRpb24uXG4gICAgICpcbiAgICAgKiAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0Rm9ybSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZm9ybSkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5lZGl0YWJsZSA9IHRoaXMuZWRpdGFibGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9iaiA9ICg8VUlDb250ZXh0PnRoaXMuY29udGV4dCkub2JqZWN0O1xuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5mb3JtR3JvdXAudmFsdWUpLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMob2JqKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb1JlZ2lzdGVyKGtleSwgb2JqW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==