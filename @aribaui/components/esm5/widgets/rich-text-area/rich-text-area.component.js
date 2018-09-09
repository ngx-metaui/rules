/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, forwardRef, Inject, Input, Optional, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Environment } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { FormRowComponent } from '../../layouts/form-table/form-row/form-row.component';
import { distinctUntilChanged } from 'rxjs/operators';
/** @enum {number} */
var EditorType = {
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
export var EDITOR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RichTextAreaComponent; }),
    multi: true
};
var RichTextAreaComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RichTextAreaComponent, _super);
    function RichTextAreaComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         * A value used to save and read when rendering and updating this component
         */
        _this.value = '';
        /**
         * Expose editorType so that it can be used in this components template.
         */
        _this.EditorType = EditorType;
        _this.type = EditorType.Default;
        _this.styleClass = 'default-editor';
        return _this;
    }
    /**
     * @return {?}
     */
    RichTextAreaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        _super.prototype.registerFormControl.call(this, this.value);
        this.formControl.valueChanges.pipe(distinctUntilChanged()).subscribe(function (val) {
            _this.value = val;
            _this.onModelChanged(_this.value);
        });
    };
    /**
     * Internal. Please see ControlValueAccessor
     */
    /**
     * Internal. Please see ControlValueAccessor
     * @param {?} value
     * @return {?}
     */
    RichTextAreaComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.value) {
            this.value = value;
            this.formControl.setValue(value);
        }
    };
    RichTextAreaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-richtextarea',
                    template: "<ng-template [ngIf]=\"editable\">\n\n    <!-- Basic editor, also the default, which the most used features enabled. -->\n    <div *ngIf=\"type === EditorType.Default\">\n        <p-editor [(ngModel)]=\"value\" [styleClass]=\"styleClass\" [style]=\"{'height':'180px'}\"\n                  [placeholder]=\"placeHolder\">\n            <p-header>\n                    <span class=\"ql-formats\">\n                        <button class=\"ql-bold\" aria-label=\"Bold\"></button>\n                        <button class=\"ql-italic\" aria-label=\"Italic\"></button>\n                        <button class=\"ql-underline\" aria-label=\"Underline\"></button>\n                    </span>\n                <span class=\"ql-formats\">\n                        <button class=\"ql-list\" value=\"ordered\"></button>\n                        <button class=\"ql-list\" value=\"bullet\"></button>\n                    </span>\n                <span class=\"ql-formats\">\n                            <button value=\"left\" selected></button>\n                            <button value=\"center\"></button>\n                            <button value=\"right\"></button>\n                            <button value=\"justify\"></button>\n                    </span>\n            </p-header>\n        </p-editor>\n    </div>\n\n    <!-- Editor with all the features enabled -->\n    <div *ngIf=\"type === EditorType.Full\">\n        <p-editor [(ngModel)]=\"value\" [styleClass]=\"styleClass\" [style]=\"{'height':'180px'}\"\n                  [placeholder]=\"placeHolder\"></p-editor>\n    </div>\n\n    <!-- Editor with all Text formatting  -->\n    <div *ngIf=\"type === EditorType.TextFormat\">\n        <p-editor [(ngModel)]=\"value\" [styleClass]=\"styleClass\" [style]=\"{'height':'180px'}\"\n                  [placeholder]=\"placeHolder\">\n            <p-header>\n            <span class=\"ql-format-group\">\n              <select title=\"Font\" class=\"ql-font\">\n                <option value=\"sans-serif\" selected=\"\">Sans Serif</option>\n                <option value=\"serif\">Serif</option>\n                <option value=\"monospace\">Monospace</option>\n              </select>\n              <select title=\"Size\" class=\"ql-size\">\n                <option value=\"10px\">Small</option>\n                <option value=\"13px\" selected=\"\">Normal</option>\n                <option value=\"18px\">Large</option>\n                <option value=\"32px\">Huge</option>\n              </select>\n            </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-bold\" aria-label=\"Bold\"></button>\n                    <button class=\"ql-italic\" aria-label=\"Italic\"></button>\n                    <button class=\"ql-underline\" aria-label=\"Underline\"></button>\n                </span>\n                <span class=\"ql-format-group\">\n              <select title=\"Text Color\" class=\"ql-color\">\n                <option value=\"rgb(0, 0, 0)\" label=\"rgb(0, 0, 0)\" selected=\"\"></option>\n                <option value=\"rgb(230, 0, 0)\" label=\"rgb(230, 0, 0)\"></option>\n                <option value=\"rgb(255, 153, 0)\" label=\"rgb(255, 153, 0)\"></option>\n                <option value=\"rgb(255, 255, 0)\" label=\"rgb(255, 255, 0)\"></option>\n                <option value=\"rgb(0, 138, 0)\" label=\"rgb(0, 138, 0)\"></option>\n                <option value=\"rgb(0, 102, 204)\" label=\"rgb(0, 102, 204)\"></option>\n                <option value=\"rgb(153, 51, 255)\" label=\"rgb(153, 51, 255)\"></option>\n                <option value=\"rgb(255, 255, 255)\" label=\"rgb(255, 255, 255)\"></option>\n                <option value=\"rgb(250, 204, 204)\" label=\"rgb(250, 204, 204)\"></option>\n                <option value=\"rgb(255, 235, 204)\" label=\"rgb(255, 235, 204)\"></option>\n                <option value=\"rgb(255, 255, 204)\" label=\"rgb(255, 255, 204)\"></option>\n                <option value=\"rgb(204, 232, 204)\" label=\"rgb(204, 232, 204)\"></option>\n                <option value=\"rgb(204, 224, 245)\" label=\"rgb(204, 224, 245)\"></option>\n                <option value=\"rgb(235, 214, 255)\" label=\"rgb(235, 214, 255)\"></option>\n                <option value=\"rgb(187, 187, 187)\" label=\"rgb(187, 187, 187)\"></option>\n                <option value=\"rgb(240, 102, 102)\" label=\"rgb(240, 102, 102)\"></option>\n                <option value=\"rgb(255, 194, 102)\" label=\"rgb(255, 194, 102)\"></option>\n                <option value=\"rgb(255, 255, 102)\" label=\"rgb(255, 255, 102)\"></option>\n                <option value=\"rgb(102, 185, 102)\" label=\"rgb(102, 185, 102)\"></option>\n                <option value=\"rgb(102, 163, 224)\" label=\"rgb(102, 163, 224)\"></option>\n                <option value=\"rgb(194, 133, 255)\" label=\"rgb(194, 133, 255)\"></option>\n                <option value=\"rgb(136, 136, 136)\" label=\"rgb(136, 136, 136)\"></option>\n                <option value=\"rgb(161, 0, 0)\" label=\"rgb(161, 0, 0)\"></option>\n                <option value=\"rgb(178, 107, 0)\" label=\"rgb(178, 107, 0)\"></option>\n                <option value=\"rgb(178, 178, 0)\" label=\"rgb(178, 178, 0)\"></option>\n                <option value=\"rgb(0, 97, 0)\" label=\"rgb(0, 97, 0)\"></option>\n                <option value=\"rgb(0, 71, 178)\" label=\"rgb(0, 71, 178)\"></option>\n                <option value=\"rgb(107, 36, 178)\" label=\"rgb(107, 36, 178)\"></option>\n                <option value=\"rgb(68, 68, 68)\" label=\"rgb(68, 68, 68)\"></option>\n                <option value=\"rgb(92, 0, 0)\" label=\"rgb(92, 0, 0)\"></option>\n                <option value=\"rgb(102, 61, 0)\" label=\"rgb(102, 61, 0)\"></option>\n                <option value=\"rgb(102, 102, 0)\" label=\"rgb(102, 102, 0)\"></option>\n                <option value=\"rgb(0, 55, 0)\" label=\"rgb(0, 55, 0)\"></option>\n                <option value=\"rgb(0, 41, 102)\" label=\"rgb(0, 41, 102)\"></option>\n                <option value=\"rgb(61, 20, 102)\" label=\"rgb(61, 20, 102)\"></option>\n              </select>\n              <span class=\"ql-format-separator\"></span>\n              <select title=\"Background Color\" class=\"ql-background\">\n                <option value=\"rgb(0, 0, 0)\" label=\"rgb(0, 0, 0)\"></option>\n                <option value=\"rgb(230, 0, 0)\" label=\"rgb(230, 0, 0)\"></option>\n                <option value=\"rgb(255, 153, 0)\" label=\"rgb(255, 153, 0)\"></option>\n                <option value=\"rgb(255, 255, 0)\" label=\"rgb(255, 255, 0)\"></option>\n                <option value=\"rgb(0, 138, 0)\" label=\"rgb(0, 138, 0)\"></option>\n                <option value=\"rgb(0, 102, 204)\" label=\"rgb(0, 102, 204)\"></option>\n                <option value=\"rgb(153, 51, 255)\" label=\"rgb(153, 51, 255)\"></option>\n                <option value=\"rgb(255, 255, 255)\" label=\"rgb(255, 255, 255)\" selected=\"\"></option>\n                <option value=\"rgb(250, 204, 204)\" label=\"rgb(250, 204, 204)\"></option>\n                <option value=\"rgb(255, 235, 204)\" label=\"rgb(255, 235, 204)\"></option>\n                <option value=\"rgb(255, 255, 204)\" label=\"rgb(255, 255, 204)\"></option>\n                <option value=\"rgb(204, 232, 204)\" label=\"rgb(204, 232, 204)\"></option>\n                <option value=\"rgb(204, 224, 245)\" label=\"rgb(204, 224, 245)\"></option>\n                <option value=\"rgb(235, 214, 255)\" label=\"rgb(235, 214, 255)\"></option>\n                <option value=\"rgb(187, 187, 187)\" label=\"rgb(187, 187, 187)\"></option>\n                <option value=\"rgb(240, 102, 102)\" label=\"rgb(240, 102, 102)\"></option>\n                <option value=\"rgb(255, 194, 102)\" label=\"rgb(255, 194, 102)\"></option>\n                <option value=\"rgb(255, 255, 102)\" label=\"rgb(255, 255, 102)\"></option>\n                <option value=\"rgb(102, 185, 102)\" label=\"rgb(102, 185, 102)\"></option>\n                <option value=\"rgb(102, 163, 224)\" label=\"rgb(102, 163, 224)\"></option>\n                <option value=\"rgb(194, 133, 255)\" label=\"rgb(194, 133, 255)\"></option>\n                <option value=\"rgb(136, 136, 136)\" label=\"rgb(136, 136, 136)\"></option>\n                <option value=\"rgb(161, 0, 0)\" label=\"rgb(161, 0, 0)\"></option>\n                <option value=\"rgb(178, 107, 0)\" label=\"rgb(178, 107, 0)\"></option>\n                <option value=\"rgb(178, 178, 0)\" label=\"rgb(178, 178, 0)\"></option>\n                <option value=\"rgb(0, 97, 0)\" label=\"rgb(0, 97, 0)\"></option>\n                <option value=\"rgb(0, 71, 178)\" label=\"rgb(0, 71, 178)\"></option>\n                <option value=\"rgb(107, 36, 178)\" label=\"rgb(107, 36, 178)\"></option>\n                <option value=\"rgb(68, 68, 68)\" label=\"rgb(68, 68, 68)\"></option>\n                <option value=\"rgb(92, 0, 0)\" label=\"rgb(92, 0, 0)\"></option>\n                <option value=\"rgb(102, 61, 0)\" label=\"rgb(102, 61, 0)\"></option>\n                <option value=\"rgb(102, 102, 0)\" label=\"rgb(102, 102, 0)\"></option>\n                <option value=\"rgb(0, 55, 0)\" label=\"rgb(0, 55, 0)\"></option>\n                <option value=\"rgb(0, 41, 102)\" label=\"rgb(0, 41, 102)\"></option>\n                <option value=\"rgb(61, 20, 102)\" label=\"rgb(61, 20, 102)\"></option>\n              </select>\n            </span>\n                <span class=\"ql-formats\">\n                <button class=\"ql-list\" value=\"ordered\"></button>\n                <button class=\"ql-list\" value=\"bullet\"></button>\n            </span>\n                <span class=\"ql-formats\">\n                    <button value=\"left\" selected></button>\n                    <button value=\"center\"></button>\n                    <button value=\"right\"></button>\n                    <button value=\"justify\"></button>\n            </span>\n            </p-header>\n        </p-editor>\n    </div>\n\n    <!-- Custom header Text Editor -->\n    <div *ngIf=\"type === EditorType.Custom\">\n        <p-editor [(ngModel)]=\"value\" [styleClass]=\"styleClass\" [style]=\"{'height':'180px'}\"\n                  [placeholder]=\"placeHolder\">\n            <p-header>\n                <ng-content select=\"custom-header\"></ng-content>\n            </p-header>\n        </p-editor>\n    </div>\n\n</ng-template>\n\n\n<ng-template [ngIf]=\"!editable\">\n    <aw-string [value]=\"value\"></aw-string>\n</ng-template>\n",
                    providers: [
                        EDITOR_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return RichTextAreaComponent; }) }
                    ],
                    styles: ["/deep/ .ui-editor-toolbar{background-color:#f5f5f5;border:1px solid #d7d7d7}/deep/ p-editor:active /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow,/deep/ p-editor:focus /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow,/deep/ p-editor:hover /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow{border-color:#199de0}/deep/ p-editor:active /deep/ .ui-editor-content.ql-container.ql-snow,/deep/ p-editor:focus /deep/ .ui-editor-content.ql-container.ql-snow,/deep/ p-editor:hover /deep/ .ui-editor-content.ql-container.ql-snow{border-color:#199de0}"]
                }] }
    ];
    /** @nocollapse */
    RichTextAreaComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return FormRowComponent; }),] }] }
    ]; };
    RichTextAreaComponent.propDecorators = {
        type: [{ type: Input }],
        value: [{ type: Input }]
    };
    return RichTextAreaComponent;
}(BaseFormComponent));
export { RichTextAreaComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaC10ZXh0LWFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmljaC10ZXh0LWFyZWEvcmljaC10ZXh0LWFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7SUEwQ2hELFVBQU87OztJQUVQLE9BQUk7O0lBQ0osYUFBVTs7SUFDVixTQUFNOzs7O3NCQUpOLE9BQU87c0JBRVAsSUFBSTtzQkFDSixVQUFVO3NCQUNWLE1BQU07O0FBSVYsV0FBYSw2QkFBNkIsR0FBUTtJQUM5QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHFCQUFxQixFQUFyQixDQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUFheUMsaURBQWlCO0lBbUJ4RCwrQkFBbUIsR0FBZ0IsRUFFYixlQUFrQztRQUZ4RCxZQUdJLGtCQUFNLEdBQUcsRUFBRSxlQUFlLENBQUMsU0FJOUI7UUFQa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUViLHFCQUFlLEdBQWYsZUFBZSxDQUFtQjs7OztzQkFWM0MsRUFBRTs7OzsyQkFLRyxVQUFVO1FBUXhCLEtBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUMvQixLQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDOztLQUN0Qzs7OztJQUdELHdDQUFROzs7SUFBUjtRQUFBLGlCQVVDO1FBVEcsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsaUJBQU0sbUJBQW1CLFlBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDOUIsb0JBQW9CLEVBQUUsQ0FDekIsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ1gsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0tBQ047SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsMENBQVU7Ozs7O0lBQVYsVUFBVyxLQUFVO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztLQUNKOztnQkEzREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGt5VUFBNEM7b0JBRTVDLFNBQVMsRUFBRTt3QkFDUCw2QkFBNkI7d0JBQzdCLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHFCQUFxQixFQUFyQixDQUFxQixDQUFDLEVBQUM7cUJBQ3JGOztpQkFFSjs7OztnQkFyRU8sV0FBVztnQkFDWCxpQkFBaUIsdUJBeUZSLFFBQVEsWUFBSSxRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUM7Ozt1QkFoQjdFLEtBQUs7d0JBTUwsS0FBSzs7Z0NBdEdWO0VBNEYyQyxpQkFBaUI7U0FBL0MscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7Rm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGF5b3V0cy9mb3JtLXRhYmxlL2Zvcm0tcm93L2Zvcm0tcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogUmljaFRleHRBcmVhIGNvbXBvbmVudCByZXByZXNlbnRzIGEgdGV4dCBlZGl0b3Igd2hpY2ggYWxsb3dzIHVzZXJzIHRvIGZvcm1hdCB0ZXh0IGlucHV0LlxuICogVGhlIGVkaXRvcidzIHRvb2xiYXIgaXMgcHJlLWNvbmZpZ3VyZWQgdG8gY29udGFpbiBmdW5jdGlvbmFsaXRpZXMgdGhhdCBhcmUgaW4gb3VyIGRlc2lnbi5cbiAqIEBzZWUge0BsaW5rIGVkaXRvci9lZGl0b3IuY29tcG9uZW50Lmh0bWx9XG4gKlxuICogICMjIyBFeGFtcGxlXG4gKiAgYGBgXG4gKlxuICogIEBDb21wb25lbnQoe1xuICogICAgc2VsZWN0b3I6ICdyZngtZXZlbnQnICxcbiAqICAgIHRlbXBsYXRlOiBgXG4gKlxuICogICAgICAgIDwhLS0gQmFzaWMgVXNhZ2UuIC0tPlxuICogICAgICAgIDxhdy1yaWNodGV4dGFyZWEgW25hbWVdPVwiJ2Rlc2NyaXB0aW9uJ1wiIFt2YWx1ZV09XCJkZXNjcmlwdGlvblwiIHBsYWNlSG9sZGVyPVwicHV0XG4gKiAgICAgICAgZGVzY3JpcHRpb25cIj5cbiAqICAgICAgICA8L2F3LXJpY2h0ZXh0YXJlYT5cbiAqXG4gKiAgICAgICAgPCEtLSBFZGl0b3Igd2l0aCBGdWxsIGZ1bmN0aW9uYWxpdHkgLS0+XG4gKiAgICAgIDxhdy1yaWNodGV4dGFyZWEgW25hbWVdPVwiJ2NvbW1lbnQnXCIgW3R5cGVdPVwiZWRpdG9yVHlwZVwiIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gKiAgICAgIHBsYWNlSG9sZGVyPVwiaG9sZCB0aGlzXCI+XG4gKiAgICAgIDwvYXctcmljaHRleHRhcmVhPlxuICogICAgfSlcbiAqICAgIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudFxuICogICAge1xuICogICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gKlxuICogICAgICAgIGVkaXRvclR5cGU6RWRpdG9yVHlwZSA9IEVkaXRvclR5cGUuRnVsbDtcbiAqICAgICAgICB2YWx1ZTpTdHJpbmc7XG4gKlxuICogICAgICAgIGNvbnN0cnVjdG9yICgpXG4gKiAgICAgICAge1xuICogICAgICAgIH1cbiAqICAgIH1cbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRpZmZlcmVudCB0eXBlcyBvZiB0ZXh0IGVkaXRvci4gVGhleSBhcmUgcHJlY29uZmlndXJlZCB3aXRoXG4gKiBmdW5jdGlvbmFsaXR5IGJhc2VkIG9uIHR5cGUuIFVzZSBjdXN0b20gdG8gYWRkIHlvdXIgb3duIHRvb2xiYXIgbWVudS5cbiAqL1xuZXhwb3J0IGVudW0gRWRpdG9yVHlwZSB7XG4gICAgRGVmYXVsdCwgICAgLy8gRGVmYXVsdCBFZGl0b3Igc3VwcG9ydHMgTWluaW1hbCBzZXQgb2YgZnVuY3Rpb25hbGl0eVxuICAgIC8vIFsgYm9sZCB8IGl0YWxpYyB8IHVuZGVybGluZSB8IG9yZGVyZWQgfCBidWxsZXQgfCBhbGlnbm1lbnRdXG4gICAgRnVsbCwgICAgICAgLy8gVGhlIGZ1bGwgbGlzdCBvZiBmdW5jdGlvbmFsaXR5LFxuICAgIFRleHRGb3JtYXQsIC8vIEZ1bmN0aW9uYWxpdGllcyB0aGF0IGFmZmVjdHMgdGV4dCBmb3JtYXR0aW5nLlxuICAgIEN1c3RvbSAgICAgLy8gQ3VzdG9tIHRvb2xiYXIuXG59XG5cblxuZXhwb3J0IGNvbnN0IEVESVRPUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmljaFRleHRBcmVhQ29tcG9uZW50KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LXJpY2h0ZXh0YXJlYScsXG4gICAgdGVtcGxhdGVVcmw6ICdyaWNoLXRleHQtYXJlYS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3JpY2gtdGV4dC1hcmVhLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEVESVRPUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJpY2hUZXh0QXJlYUNvbXBvbmVudCl9XG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIFJpY2hUZXh0QXJlYUNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgZWRpdG9yLiAgU2VlIEVkaXRvclR5cGUgZm9yIGRlc2NyaXB0aW9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHlwZTogRWRpdG9yVHlwZTtcblxuICAgIC8qKlxuICAgICAqIEEgdmFsdWUgdXNlZCB0byBzYXZlIGFuZCByZWFkIHdoZW4gcmVuZGVyaW5nIGFuZCB1cGRhdGluZyB0aGlzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogRXhwb3NlIGVkaXRvclR5cGUgc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBpbiB0aGlzIGNvbXBvbmVudHMgdGVtcGxhdGUuXG4gICAgICovXG4gICAgRWRpdG9yVHlwZTogYW55ID0gRWRpdG9yVHlwZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEZvcm1Sb3dDb21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KSB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnR5cGUgPSBFZGl0b3JUeXBlLkRlZmF1bHQ7XG4gICAgICAgIHRoaXMuc3R5bGVDbGFzcyA9ICdkZWZhdWx0LWVkaXRvcic7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnZhbHVlKTtcblxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgICApLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=