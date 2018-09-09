/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
import { distinctUntilChanged } from 'rxjs/operators';
/** @enum {number} */
const EditorType = {
    Default: 0,
    // Default Editor supports Minimal set of functionality
    // [ bold | italic | underline | ordered | bullet | alignment]
    Full: 1,
    // The full list of functionality,
    TextFormat: 2,
    // Functionalities that affects text formatting.
    Custom: 3 // Custom toolbar.
    ,
};
export { EditorType };
EditorType[EditorType.Default] = 'Default';
EditorType[EditorType.Full] = 'Full';
EditorType[EditorType.TextFormat] = 'TextFormat';
EditorType[EditorType.Custom] = 'Custom';
/** @type {?} */
export const EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RichTextAreaComponent),
    multi: true
};
export class RichTextAreaComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * A value used to save and read when rendering and updating this component
         */
        this.value = '';
        /**
         * Expose editorType so that it can be used in this components template.
         */
        this.EditorType = EditorType;
        this.type = EditorType.Default;
        this.styleClass = 'default-editor';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        super.registerFormControl(this.value);
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(val => {
            this.value = val;
            this.onModelChanged(this.value);
        });
    }
    /**
     * Internal. Please see ControlValueAccessor
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value);
        }
    }
}
RichTextAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-richtextarea',
                template: "<ng-template [ngIf]=\"editable\">\n\n    <!-- Basic editor, also the default, which the most used features enabled. -->\n    <div *ngIf=\"type === EditorType.Default\">\n        <p-editor [(ngModel)]=\"value\" [styleClass]=\"styleClass\" [style]=\"{'height':'180px'}\"\n                  [placeholder]=\"placeHolder\">\n            <p-header>\n                    <span class=\"ql-formats\">\n                        <button class=\"ql-bold\" aria-label=\"Bold\"></button>\n                        <button class=\"ql-italic\" aria-label=\"Italic\"></button>\n                        <button class=\"ql-underline\" aria-label=\"Underline\"></button>\n                    </span>\n                <span class=\"ql-formats\">\n                        <button class=\"ql-list\" value=\"ordered\"></button>\n                        <button class=\"ql-list\" value=\"bullet\"></button>\n                    </span>\n                <span class=\"ql-formats\">\n                            <button value=\"left\" selected></button>\n                            <button value=\"center\"></button>\n                            <button value=\"right\"></button>\n                            <button value=\"justify\"></button>\n                    </span>\n            </p-header>\n        </p-editor>\n    </div>\n\n    <!-- Editor with all the features enabled -->\n    <div *ngIf=\"type === EditorType.Full\">\n        <p-editor [(ngModel)]=\"value\" [styleClass]=\"styleClass\" [style]=\"{'height':'180px'}\"\n                  [placeholder]=\"placeHolder\"></p-editor>\n    </div>\n\n    <!-- Editor with all Text formatting  -->\n    <div *ngIf=\"type === EditorType.TextFormat\">\n        <p-editor [(ngModel)]=\"value\" [styleClass]=\"styleClass\" [style]=\"{'height':'180px'}\"\n                  [placeholder]=\"placeHolder\">\n            <p-header>\n            <span class=\"ql-format-group\">\n              <select title=\"Font\" class=\"ql-font\">\n                <option value=\"sans-serif\" selected=\"\">Sans Serif</option>\n                <option value=\"serif\">Serif</option>\n                <option value=\"monospace\">Monospace</option>\n              </select>\n              <select title=\"Size\" class=\"ql-size\">\n                <option value=\"10px\">Small</option>\n                <option value=\"13px\" selected=\"\">Normal</option>\n                <option value=\"18px\">Large</option>\n                <option value=\"32px\">Huge</option>\n              </select>\n            </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-bold\" aria-label=\"Bold\"></button>\n                    <button class=\"ql-italic\" aria-label=\"Italic\"></button>\n                    <button class=\"ql-underline\" aria-label=\"Underline\"></button>\n                </span>\n                <span class=\"ql-format-group\">\n              <select title=\"Text Color\" class=\"ql-color\">\n                <option value=\"rgb(0, 0, 0)\" label=\"rgb(0, 0, 0)\" selected=\"\"></option>\n                <option value=\"rgb(230, 0, 0)\" label=\"rgb(230, 0, 0)\"></option>\n                <option value=\"rgb(255, 153, 0)\" label=\"rgb(255, 153, 0)\"></option>\n                <option value=\"rgb(255, 255, 0)\" label=\"rgb(255, 255, 0)\"></option>\n                <option value=\"rgb(0, 138, 0)\" label=\"rgb(0, 138, 0)\"></option>\n                <option value=\"rgb(0, 102, 204)\" label=\"rgb(0, 102, 204)\"></option>\n                <option value=\"rgb(153, 51, 255)\" label=\"rgb(153, 51, 255)\"></option>\n                <option value=\"rgb(255, 255, 255)\" label=\"rgb(255, 255, 255)\"></option>\n                <option value=\"rgb(250, 204, 204)\" label=\"rgb(250, 204, 204)\"></option>\n                <option value=\"rgb(255, 235, 204)\" label=\"rgb(255, 235, 204)\"></option>\n                <option value=\"rgb(255, 255, 204)\" label=\"rgb(255, 255, 204)\"></option>\n                <option value=\"rgb(204, 232, 204)\" label=\"rgb(204, 232, 204)\"></option>\n                <option value=\"rgb(204, 224, 245)\" label=\"rgb(204, 224, 245)\"></option>\n                <option value=\"rgb(235, 214, 255)\" label=\"rgb(235, 214, 255)\"></option>\n                <option value=\"rgb(187, 187, 187)\" label=\"rgb(187, 187, 187)\"></option>\n                <option value=\"rgb(240, 102, 102)\" label=\"rgb(240, 102, 102)\"></option>\n                <option value=\"rgb(255, 194, 102)\" label=\"rgb(255, 194, 102)\"></option>\n                <option value=\"rgb(255, 255, 102)\" label=\"rgb(255, 255, 102)\"></option>\n                <option value=\"rgb(102, 185, 102)\" label=\"rgb(102, 185, 102)\"></option>\n                <option value=\"rgb(102, 163, 224)\" label=\"rgb(102, 163, 224)\"></option>\n                <option value=\"rgb(194, 133, 255)\" label=\"rgb(194, 133, 255)\"></option>\n                <option value=\"rgb(136, 136, 136)\" label=\"rgb(136, 136, 136)\"></option>\n                <option value=\"rgb(161, 0, 0)\" label=\"rgb(161, 0, 0)\"></option>\n                <option value=\"rgb(178, 107, 0)\" label=\"rgb(178, 107, 0)\"></option>\n                <option value=\"rgb(178, 178, 0)\" label=\"rgb(178, 178, 0)\"></option>\n                <option value=\"rgb(0, 97, 0)\" label=\"rgb(0, 97, 0)\"></option>\n                <option value=\"rgb(0, 71, 178)\" label=\"rgb(0, 71, 178)\"></option>\n                <option value=\"rgb(107, 36, 178)\" label=\"rgb(107, 36, 178)\"></option>\n                <option value=\"rgb(68, 68, 68)\" label=\"rgb(68, 68, 68)\"></option>\n                <option value=\"rgb(92, 0, 0)\" label=\"rgb(92, 0, 0)\"></option>\n                <option value=\"rgb(102, 61, 0)\" label=\"rgb(102, 61, 0)\"></option>\n                <option value=\"rgb(102, 102, 0)\" label=\"rgb(102, 102, 0)\"></option>\n                <option value=\"rgb(0, 55, 0)\" label=\"rgb(0, 55, 0)\"></option>\n                <option value=\"rgb(0, 41, 102)\" label=\"rgb(0, 41, 102)\"></option>\n                <option value=\"rgb(61, 20, 102)\" label=\"rgb(61, 20, 102)\"></option>\n              </select>\n              <span class=\"ql-format-separator\"></span>\n              <select title=\"Background Color\" class=\"ql-background\">\n                <option value=\"rgb(0, 0, 0)\" label=\"rgb(0, 0, 0)\"></option>\n                <option value=\"rgb(230, 0, 0)\" label=\"rgb(230, 0, 0)\"></option>\n                <option value=\"rgb(255, 153, 0)\" label=\"rgb(255, 153, 0)\"></option>\n                <option value=\"rgb(255, 255, 0)\" label=\"rgb(255, 255, 0)\"></option>\n                <option value=\"rgb(0, 138, 0)\" label=\"rgb(0, 138, 0)\"></option>\n                <option value=\"rgb(0, 102, 204)\" label=\"rgb(0, 102, 204)\"></option>\n                <option value=\"rgb(153, 51, 255)\" label=\"rgb(153, 51, 255)\"></option>\n                <option value=\"rgb(255, 255, 255)\" label=\"rgb(255, 255, 255)\" selected=\"\"></option>\n                <option value=\"rgb(250, 204, 204)\" label=\"rgb(250, 204, 204)\"></option>\n                <option value=\"rgb(255, 235, 204)\" label=\"rgb(255, 235, 204)\"></option>\n                <option value=\"rgb(255, 255, 204)\" label=\"rgb(255, 255, 204)\"></option>\n                <option value=\"rgb(204, 232, 204)\" label=\"rgb(204, 232, 204)\"></option>\n                <option value=\"rgb(204, 224, 245)\" label=\"rgb(204, 224, 245)\"></option>\n                <option value=\"rgb(235, 214, 255)\" label=\"rgb(235, 214, 255)\"></option>\n                <option value=\"rgb(187, 187, 187)\" label=\"rgb(187, 187, 187)\"></option>\n                <option value=\"rgb(240, 102, 102)\" label=\"rgb(240, 102, 102)\"></option>\n                <option value=\"rgb(255, 194, 102)\" label=\"rgb(255, 194, 102)\"></option>\n                <option value=\"rgb(255, 255, 102)\" label=\"rgb(255, 255, 102)\"></option>\n                <option value=\"rgb(102, 185, 102)\" label=\"rgb(102, 185, 102)\"></option>\n                <option value=\"rgb(102, 163, 224)\" label=\"rgb(102, 163, 224)\"></option>\n                <option value=\"rgb(194, 133, 255)\" label=\"rgb(194, 133, 255)\"></option>\n                <option value=\"rgb(136, 136, 136)\" label=\"rgb(136, 136, 136)\"></option>\n                <option value=\"rgb(161, 0, 0)\" label=\"rgb(161, 0, 0)\"></option>\n                <option value=\"rgb(178, 107, 0)\" label=\"rgb(178, 107, 0)\"></option>\n                <option value=\"rgb(178, 178, 0)\" label=\"rgb(178, 178, 0)\"></option>\n                <option value=\"rgb(0, 97, 0)\" label=\"rgb(0, 97, 0)\"></option>\n                <option value=\"rgb(0, 71, 178)\" label=\"rgb(0, 71, 178)\"></option>\n                <option value=\"rgb(107, 36, 178)\" label=\"rgb(107, 36, 178)\"></option>\n                <option value=\"rgb(68, 68, 68)\" label=\"rgb(68, 68, 68)\"></option>\n                <option value=\"rgb(92, 0, 0)\" label=\"rgb(92, 0, 0)\"></option>\n                <option value=\"rgb(102, 61, 0)\" label=\"rgb(102, 61, 0)\"></option>\n                <option value=\"rgb(102, 102, 0)\" label=\"rgb(102, 102, 0)\"></option>\n                <option value=\"rgb(0, 55, 0)\" label=\"rgb(0, 55, 0)\"></option>\n                <option value=\"rgb(0, 41, 102)\" label=\"rgb(0, 41, 102)\"></option>\n                <option value=\"rgb(61, 20, 102)\" label=\"rgb(61, 20, 102)\"></option>\n              </select>\n            </span>\n                <span class=\"ql-formats\">\n                <button class=\"ql-list\" value=\"ordered\"></button>\n                <button class=\"ql-list\" value=\"bullet\"></button>\n            </span>\n                <span class=\"ql-formats\">\n                    <button value=\"left\" selected></button>\n                    <button value=\"center\"></button>\n                    <button value=\"right\"></button>\n                    <button value=\"justify\"></button>\n            </span>\n            </p-header>\n        </p-editor>\n    </div>\n\n    <!-- Custom header Text Editor -->\n    <div *ngIf=\"type === EditorType.Custom\">\n        <p-editor [(ngModel)]=\"value\" [styleClass]=\"styleClass\" [style]=\"{'height':'180px'}\"\n                  [placeholder]=\"placeHolder\">\n            <p-header>\n                <ng-content select=\"custom-header\"></ng-content>\n            </p-header>\n        </p-editor>\n    </div>\n\n</ng-template>\n\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string [value]=\"value\"></aw-string>\n</ng-template>\n",
                providers: [
                    EDITOR_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RichTextAreaComponent) }
                ],
                styles: ["/deep/ .ui-editor-toolbar{background-color:#f5f5f5;border:1px solid #d7d7d7}/deep/ p-editor:active /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow,/deep/ p-editor:focus /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow,/deep/ p-editor:hover /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow{border-color:#199de0}/deep/ p-editor:active /deep/ .ui-editor-content.ql-container.ql-snow,/deep/ p-editor:focus /deep/ .ui-editor-content.ql-container.ql-snow,/deep/ p-editor:hover /deep/ .ui-editor-content.ql-container.ql-snow{border-color:#199de0}"]
            }] }
];
/** @nocollapse */
RichTextAreaComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => FormRowComponent),] }] }
];
RichTextAreaComponent.propDecorators = {
    type: [{ type: Input }],
    value: [{ type: Input }]
};
if (false) {
    /**
     * The type of the editor.  See EditorType for description.
     * @type {?}
     */
    RichTextAreaComponent.prototype.type;
    /**
     * A value used to save and read when rendering and updating this component
     * @type {?}
     */
    RichTextAreaComponent.prototype.value;
    /**
     * Expose editorType so that it can be used in this components template.
     * @type {?}
     */
    RichTextAreaComponent.prototype.EditorType;
    /** @type {?} */
    RichTextAreaComponent.prototype.env;
    /** @type {?} */
    RichTextAreaComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaC10ZXh0LWFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmljaC10ZXh0LWFyZWEvcmljaC10ZXh0LWFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDdEYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztJQTBDaEQsVUFBTzs7O0lBRVAsT0FBSTs7SUFDSixhQUFVOztJQUNWLFNBQU07Ozs7c0JBSk4sT0FBTztzQkFFUCxJQUFJO3NCQUNKLFVBQVU7c0JBQ1YsTUFBTTs7QUFJVixhQUFhLDZCQUE2QixHQUFRO0lBQzlDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFhRixNQUFNLDRCQUE2QixTQUFRLGlCQUFpQjs7Ozs7SUFtQnhELFlBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFDcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUhiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7cUJBVjNDLEVBQUU7Ozs7MEJBS0csVUFBVTtRQVF4QixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztLQUN0Qzs7OztJQUdELFFBQVE7UUFDSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzlCLG9CQUFvQixFQUFFLENBQ3pCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0tBQ047Ozs7OztJQUtELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztLQUNKOzs7WUEzREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLGt5VUFBNEM7Z0JBRTVDLFNBQVMsRUFBRTtvQkFDUCw2QkFBNkI7b0JBQzdCLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBQztpQkFDckY7O2FBRUo7Ozs7WUFyRU8sV0FBVztZQUNYLGlCQUFpQix1QkF5RlIsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDOzs7bUJBaEI3RSxLQUFLO29CQU1MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSaWNoVGV4dEFyZWEgY29tcG9uZW50IHJlcHJlc2VudHMgYSB0ZXh0IGVkaXRvciB3aGljaCBhbGxvd3MgdXNlcnMgdG8gZm9ybWF0IHRleHQgaW5wdXQuXG4gKiBUaGUgZWRpdG9yJ3MgdG9vbGJhciBpcyBwcmUtY29uZmlndXJlZCB0byBjb250YWluIGZ1bmN0aW9uYWxpdGllcyB0aGF0IGFyZSBpbiBvdXIgZGVzaWduLlxuICogQHNlZSB7QGxpbmsgZWRpdG9yL2VkaXRvci5jb21wb25lbnQuaHRtbH1cbiAqXG4gKiAgIyMjIEV4YW1wbGVcbiAqICBgYGBcbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ3JmeC1ldmVudCcgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqXG4gKiAgICAgICAgPCEtLSBCYXNpYyBVc2FnZS4gLS0+XG4gKiAgICAgICAgPGF3LXJpY2h0ZXh0YXJlYSBbbmFtZV09XCInZGVzY3JpcHRpb24nXCIgW3ZhbHVlXT1cImRlc2NyaXB0aW9uXCIgcGxhY2VIb2xkZXI9XCJwdXRcbiAqICAgICAgICBkZXNjcmlwdGlvblwiPlxuICogICAgICAgIDwvYXctcmljaHRleHRhcmVhPlxuICpcbiAqICAgICAgICA8IS0tIEVkaXRvciB3aXRoIEZ1bGwgZnVuY3Rpb25hbGl0eSAtLT5cbiAqICAgICAgPGF3LXJpY2h0ZXh0YXJlYSBbbmFtZV09XCInY29tbWVudCdcIiBbdHlwZV09XCJlZGl0b3JUeXBlXCIgW3ZhbHVlXT1cInZhbHVlXCJcbiAqICAgICAgcGxhY2VIb2xkZXI9XCJob2xkIHRoaXNcIj5cbiAqICAgICAgPC9hdy1yaWNodGV4dGFyZWE+XG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50XG4gKiAgICB7XG4gKiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAqXG4gKiAgICAgICAgZWRpdG9yVHlwZTpFZGl0b3JUeXBlID0gRWRpdG9yVHlwZS5GdWxsO1xuICogICAgICAgIHZhbHVlOlN0cmluZztcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICogICAgfVxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlmZmVyZW50IHR5cGVzIG9mIHRleHQgZWRpdG9yLiBUaGV5IGFyZSBwcmVjb25maWd1cmVkIHdpdGhcbiAqIGZ1bmN0aW9uYWxpdHkgYmFzZWQgb24gdHlwZS4gVXNlIGN1c3RvbSB0byBhZGQgeW91ciBvd24gdG9vbGJhciBtZW51LlxuICovXG5leHBvcnQgZW51bSBFZGl0b3JUeXBlIHtcbiAgICBEZWZhdWx0LCAgICAvLyBEZWZhdWx0IEVkaXRvciBzdXBwb3J0cyBNaW5pbWFsIHNldCBvZiBmdW5jdGlvbmFsaXR5XG4gICAgLy8gWyBib2xkIHwgaXRhbGljIHwgdW5kZXJsaW5lIHwgb3JkZXJlZCB8IGJ1bGxldCB8IGFsaWdubWVudF1cbiAgICBGdWxsLCAgICAgICAvLyBUaGUgZnVsbCBsaXN0IG9mIGZ1bmN0aW9uYWxpdHksXG4gICAgVGV4dEZvcm1hdCwgLy8gRnVuY3Rpb25hbGl0aWVzIHRoYXQgYWZmZWN0cyB0ZXh0IGZvcm1hdHRpbmcuXG4gICAgQ3VzdG9tICAgICAvLyBDdXN0b20gdG9vbGJhci5cbn1cblxuXG5leHBvcnQgY29uc3QgRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSaWNoVGV4dEFyZWFDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcmljaHRleHRhcmVhJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3JpY2gtdGV4dC1hcmVhLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsncmljaC10ZXh0LWFyZWEuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmljaFRleHRBcmVhQ29tcG9uZW50KX1cbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgUmljaFRleHRBcmVhQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBlZGl0b3IuICBTZWUgRWRpdG9yVHlwZSBmb3IgZGVzY3JpcHRpb24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0eXBlOiBFZGl0b3JUeXBlO1xuXG4gICAgLyoqXG4gICAgICogQSB2YWx1ZSB1c2VkIHRvIHNhdmUgYW5kIHJlYWQgd2hlbiByZW5kZXJpbmcgYW5kIHVwZGF0aW5nIHRoaXMgY29tcG9uZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2UgZWRpdG9yVHlwZSBzbyB0aGF0IGl0IGNhbiBiZSB1c2VkIGluIHRoaXMgY29tcG9uZW50cyB0ZW1wbGF0ZS5cbiAgICAgKi9cbiAgICBFZGl0b3JUeXBlOiBhbnkgPSBFZGl0b3JUeXBlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRm9ybVJvd0NvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuXG4gICAgICAgIHRoaXMudHlwZSA9IEVkaXRvclR5cGUuRGVmYXVsdDtcbiAgICAgICAgdGhpcy5zdHlsZUNsYXNzID0gJ2RlZmF1bHQtZWRpdG9yJztcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAgICkuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwuIFBsZWFzZSBzZWUgQ29udHJvbFZhbHVlQWNjZXNzb3JcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==