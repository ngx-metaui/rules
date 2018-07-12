/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, forwardRef, Host, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { BooleanWrapper, Environment, isPresent } from '@aribaui/core';
import { FormRowComponent } from '@aribaui/components';
import { MetaContextComponent } from '../../../core/meta-context/meta-context.component';
import { UIMeta } from '../../../core/uimeta';
import { MetaBaseComponent } from '../../meta.base.component';
/**
 * Component responsible for rendering a row using MetaIncludeComponent.
 * What I am still not sure, if I want to use fully validation from MetaRule and if I cannot
 * leverage basic validation from angular.
 *
 * Meaning I might remove default valid::** rule from WidgetsRules and when its required insert
 * default Required validation from angular.
 *
 */
export class MetaFormRowComponent extends MetaBaseComponent {
    /**
     * @param {?} _metaContext
     * @param {?} env
     */
    constructor(_metaContext, env) {
        super(env, _metaContext);
        this._metaContext = _metaContext;
        this.env = env;
        /**
         * There could be special cases when we are layout component that we want to extends the row
         * 100%.
         */
        this.initialSize = 'medium';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.validators = this.createValidators();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    bindingBoolProperty(key) {
        let /** @type {?} */ bindings = this.context.propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) && bindings.has(key)) {
            let /** @type {?} */ value = bindings.get(key);
            return BooleanWrapper.boleanValue(value);
        }
        return false;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    bindingStringProperty(key) {
        let /** @type {?} */ bindings = this.context.propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) && bindings.has(key)) {
            return bindings.get(key);
        }
        return null;
    }
    /**
     * @return {?}
     */
    get size() {
        let /** @type {?} */ bindings = this.context.propertyForKey(UIMeta.KeyBindings);
        if (isPresent(bindings) && bindings.has('size')) {
            return bindings.get('size');
        }
        return this.initialSize;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set size(value) {
        this.initialSize = value;
    }
    /**
     * Creates angular based Validator which for a current field executes validation rules real
     * time as use type. At the bottom of the file there is example of async validator
     *
     * @return {?}
     */
    createValidators() {
        let /** @type {?} */ that = this;
        let /** @type {?} */ metaValidator = (control) => {
            if (isPresent(Validators.required(control)) || !control.touched) {
                return null;
            }
            let /** @type {?} */ errorMsg = UIMeta.validationError(that.context);
            return isPresent(errorMsg) ? {
                'metavalid': { 'msg': errorMsg }
            } : null;
        };
        return [metaValidator];
    }
    /**
     * @return {?}
     */
    isRequired() {
        return (isPresent(this.editing) && this.context.booleanPropertyForKey('required', false));
    }
}
MetaFormRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'm-form-row',
                template: `<aw-form-row
    [editable]="editable"
    [customValidators]="validators"
    [size]="size"
    [hidden]="!properties('visible')"
    [styleClass]="bindingStringProperty('styleClass')"
    [name]="properties('field')"
    [required]="isRequired()"
    [label]="properties('label')"
    [noLabelLayout]="bindingBoolProperty('useNoLabelLayout')">

    <m-include-component></m-include-component>
</aw-form-row>

`,
                styles: [``],
                providers: [
                    { provide: FormRowComponent, useExisting: forwardRef(() => MetaFormRowComponent) }
                ]
            },] },
];
/** @nocollapse */
MetaFormRowComponent.ctorParameters = () => [
    { type: MetaContextComponent, decorators: [{ type: Host }] },
    { type: Environment }
];
MetaFormRowComponent.propDecorators = {
    field: [{ type: Input }],
    initialSize: [{ type: Input }]
};
function MetaFormRowComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MetaFormRowComponent.prototype.field;
    /**
     * There could be special cases when we are layout component that we want to extends the row
     * 100%.
     * @type {?}
     */
    MetaFormRowComponent.prototype.initialSize;
    /**
     * Cached validatos
     * @type {?}
     */
    MetaFormRowComponent.prototype.validators;
    /** @type {?} */
    MetaFormRowComponent.prototype._metaContext;
    /** @type {?} */
    MetaFormRowComponent.prototype.env;
}
/*

 return new Promise((resolve) => {
 setTimeout (()=>{

 let context: UIContext = <UIContext> this._contextSnapshot.hydrate();
 context.value = control.value;

 let errorMsg = UIMeta.validationError(context);


 if(isPresent(errorMsg)) {
 resolve({metavalid: {msg: errorMsg}});
 } else{
 resolve(null);
 }

 }, 700);
 });


 */
// metaValid (): AsyncValidatorFn[]
// {
//     let metaValidator = (control: AbstractControl): {[key: string]: any} =>
//     {
//         return new Promise((resolve) =>
//         {
//             setTimeout(()=>
//             {
//                 let context: UIContext = <UIContext> this._contextSnapshot.hydrate();
//                 context.value = control.value;
//
//                 let errorMsg = UIMeta.validationError(context);
//
//
//                 if (isPresent(errorMsg)) {
//                     resolve({metavalid: {msg: errorMsg}});
//                 } else {
//                     resolve(null);
//                 }
//
//             } , 400);
//         });
//     };
//     return [metaValidator];
// }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1mb3JtLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1mb3JtL21ldGEtZm9ybS1yb3cvbWV0YS1mb3JtLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW1CQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBK0IsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7OztBQW1DNUQsTUFBTSwyQkFBNEIsU0FBUSxpQkFBaUI7Ozs7O0lBb0J2RCxZQUE4QixZQUFrQyxFQUFTLEdBQWdCO1FBRXJGLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFGQyxpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFhOzs7OzsyQkFSbkUsUUFBUTtLQVc3Qjs7OztJQUdELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUM3Qzs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxHQUFXO1FBRTNCLHFCQUFJLFFBQVEsR0FBcUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxj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dXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIGZvcndhcmRSZWYsIEhvc3QsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCb29sZWFuV3JhcHBlciwgRW52aXJvbm1lbnQsIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJ0BhcmliYXVpL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtNZXRhQ29udGV4dENvbXBvbmVudH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vLi4vLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtNZXRhQmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbWV0YS5iYXNlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSByb3cgdXNpbmcgTWV0YUluY2x1ZGVDb21wb25lbnQuXG4gKiBXaGF0IEkgYW0gc3RpbGwgbm90IHN1cmUsIGlmIEkgd2FudCB0byB1c2UgZnVsbHkgdmFsaWRhdGlvbiBmcm9tIE1ldGFSdWxlIGFuZCBpZiBJIGNhbm5vdFxuICogbGV2ZXJhZ2UgYmFzaWMgdmFsaWRhdGlvbiBmcm9tIGFuZ3VsYXIuXG4gKlxuICogTWVhbmluZyBJIG1pZ2h0IHJlbW92ZSBkZWZhdWx0IHZhbGlkOjoqKiBydWxlIGZyb20gV2lkZ2V0c1J1bGVzIGFuZCB3aGVuIGl0cyByZXF1aXJlZCBpbnNlcnRcbiAqIGRlZmF1bHQgUmVxdWlyZWQgdmFsaWRhdGlvbiBmcm9tIGFuZ3VsYXIuXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ20tZm9ybS1yb3cnLFxuICAgIHRlbXBsYXRlOiBgPGF3LWZvcm0tcm93XG4gICAgW2VkaXRhYmxlXT1cImVkaXRhYmxlXCJcbiAgICBbY3VzdG9tVmFsaWRhdG9yc109XCJ2YWxpZGF0b3JzXCJcbiAgICBbc2l6ZV09XCJzaXplXCJcbiAgICBbaGlkZGVuXT1cIiFwcm9wZXJ0aWVzKCd2aXNpYmxlJylcIlxuICAgIFtzdHlsZUNsYXNzXT1cImJpbmRpbmdTdHJpbmdQcm9wZXJ0eSgnc3R5bGVDbGFzcycpXCJcbiAgICBbbmFtZV09XCJwcm9wZXJ0aWVzKCdmaWVsZCcpXCJcbiAgICBbcmVxdWlyZWRdPVwiaXNSZXF1aXJlZCgpXCJcbiAgICBbbGFiZWxdPVwicHJvcGVydGllcygnbGFiZWwnKVwiXG4gICAgW25vTGFiZWxMYXlvdXRdPVwiYmluZGluZ0Jvb2xQcm9wZXJ0eSgndXNlTm9MYWJlbExheW91dCcpXCI+XG5cbiAgICA8bS1pbmNsdWRlLWNvbXBvbmVudD48L20taW5jbHVkZS1jb21wb25lbnQ+XG48L2F3LWZvcm0tcm93PlxuXG5gLFxuICAgIHN0eWxlczogW2BgXSxcbiAgICBwcm92aWRlcnM6IFtcblxuICAgICAgICB7cHJvdmlkZTogRm9ybVJvd0NvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWV0YUZvcm1Sb3dDb21wb25lbnQpfVxuICAgIF1cblxufSlcbmV4cG9ydCBjbGFzcyBNZXRhRm9ybVJvd0NvbXBvbmVudCBleHRlbmRzIE1ldGFCYXNlQ29tcG9uZW50XG57XG5cbiAgICBASW5wdXQoKVxuICAgIGZpZWxkOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFRoZXJlIGNvdWxkIGJlIHNwZWNpYWwgY2FzZXMgd2hlbiB3ZSBhcmUgbGF5b3V0IGNvbXBvbmVudCB0aGF0IHdlIHdhbnQgdG8gZXh0ZW5kcyB0aGUgcm93XG4gICAgICogMTAwJS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGluaXRpYWxTaXplOiBzdHJpbmcgPSAnbWVkaXVtJztcblxuICAgIC8qKlxuICAgICAqIENhY2hlZCB2YWxpZGF0b3NcbiAgICAgKi9cbiAgICB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihASG9zdCgpIHByb3RlY3RlZCBfbWV0YUNvbnRleHQ6IE1ldGFDb250ZXh0Q29tcG9uZW50LCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgX21ldGFDb250ZXh0KTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9ycyA9IHRoaXMuY3JlYXRlVmFsaWRhdG9ycygpO1xuICAgIH1cblxuICAgIGJpbmRpbmdCb29sUHJvcGVydHkoa2V5OiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgYmluZGluZ3M6IE1hcDxzdHJpbmcsIGFueT4gPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGJpbmRpbmdzKSAmJiBiaW5kaW5ncy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gYmluZGluZ3MuZ2V0KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUodmFsdWUpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgYmluZGluZ1N0cmluZ1Byb3BlcnR5KGtleTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICBsZXQgYmluZGluZ3M6IE1hcDxzdHJpbmcsIGFueT4gPSB0aGlzLmNvbnRleHQucHJvcGVydHlGb3JLZXkoVUlNZXRhLktleUJpbmRpbmdzKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGJpbmRpbmdzKSAmJiBiaW5kaW5ncy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmdzLmdldChrZXkpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBnZXQgc2l6ZSgpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGxldCBiaW5kaW5nczogTWFwPHN0cmluZywgYW55PiA9IHRoaXMuY29udGV4dC5wcm9wZXJ0eUZvcktleShVSU1ldGEuS2V5QmluZGluZ3MpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmluZGluZ3MpICYmIGJpbmRpbmdzLmhhcygnc2l6ZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gYmluZGluZ3MuZ2V0KCdzaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbFNpemU7XG4gICAgfVxuXG4gICAgc2V0IHNpemUodmFsdWU6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFNpemUgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5ndWxhciBiYXNlZCBWYWxpZGF0b3Igd2hpY2ggZm9yIGEgY3VycmVudCBmaWVsZCBleGVjdXRlcyB2YWxpZGF0aW9uIHJ1bGVzIHJlYWxcbiAgICAgKiB0aW1lIGFzIHVzZSB0eXBlLiBBdCB0aGUgYm90dG9tIG9mIHRoZSBmaWxlIHRoZXJlIGlzIGV4YW1wbGUgb2YgYXN5bmMgdmFsaWRhdG9yXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVZhbGlkYXRvcnMoKTogVmFsaWRhdG9yRm5bXVxuICAgIHtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBsZXQgbWV0YVZhbGlkYXRvciA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCkpIHx8ICFjb250cm9sLnRvdWNoZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGVycm9yTXNnID0gVUlNZXRhLnZhbGlkYXRpb25FcnJvcih0aGF0LmNvbnRleHQpO1xuICAgICAgICAgICAgcmV0dXJuIGlzUHJlc2VudChlcnJvck1zZykgPyB7XG4gICAgICAgICAgICAgICAgICAgICdtZXRhdmFsaWQnOiB7J21zZyc6IGVycm9yTXNnfVxuICAgICAgICAgICAgICAgIH0gOiBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBbbWV0YVZhbGlkYXRvcl07XG4gICAgfVxuXG4gICAgaXNSZXF1aXJlZCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudCh0aGlzLmVkaXRpbmcpICYmIHRoaXMuY29udGV4dC5ib29sZWFuUHJvcGVydHlGb3JLZXkoJ3JlcXVpcmVkJywgZmFsc2UpKTtcbiAgICB9XG5cbn1cblxuXG4vKlxuXG4gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gc2V0VGltZW91dCAoKCk9PntcblxuIGxldCBjb250ZXh0OiBVSUNvbnRleHQgPSA8VUlDb250ZXh0PiB0aGlzLl9jb250ZXh0U25hcHNob3QuaHlkcmF0ZSgpO1xuIGNvbnRleHQudmFsdWUgPSBjb250cm9sLnZhbHVlO1xuXG4gbGV0IGVycm9yTXNnID0gVUlNZXRhLnZhbGlkYXRpb25FcnJvcihjb250ZXh0KTtcblxuXG4gaWYoaXNQcmVzZW50KGVycm9yTXNnKSkge1xuIHJlc29sdmUoe21ldGF2YWxpZDoge21zZzogZXJyb3JNc2d9fSk7XG4gfSBlbHNle1xuIHJlc29sdmUobnVsbCk7XG4gfVxuXG4gfSwgNzAwKTtcbiB9KTtcblxuXG4gKi9cblxuXG4vLyBtZXRhVmFsaWQgKCk6IEFzeW5jVmFsaWRhdG9yRm5bXVxuLy8ge1xuLy8gICAgIGxldCBtZXRhVmFsaWRhdG9yID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0+XG4vLyAgICAge1xuLy8gICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+XG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PlxuLy8gICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgIGxldCBjb250ZXh0OiBVSUNvbnRleHQgPSA8VUlDb250ZXh0PiB0aGlzLl9jb250ZXh0U25hcHNob3QuaHlkcmF0ZSgpO1xuLy8gICAgICAgICAgICAgICAgIGNvbnRleHQudmFsdWUgPSBjb250cm9sLnZhbHVlO1xuLy9cbi8vICAgICAgICAgICAgICAgICBsZXQgZXJyb3JNc2cgPSBVSU1ldGEudmFsaWRhdGlvbkVycm9yKGNvbnRleHQpO1xuLy9cbi8vXG4vLyAgICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChlcnJvck1zZykpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7bWV0YXZhbGlkOiB7bXNnOiBlcnJvck1zZ319KTtcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICB9ICwgNDAwKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfTtcbi8vICAgICByZXR1cm4gW21ldGFWYWxpZGF0b3JdO1xuLy8gfVxuIl19