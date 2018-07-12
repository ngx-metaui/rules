/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
    Custom: 3,
};
export { EditorType };
EditorType[EditorType.Default] = "Default";
EditorType[EditorType.Full] = "Full";
EditorType[EditorType.TextFormat] = "TextFormat";
EditorType[EditorType.Custom] = "Custom";
export const /** @type {?} */ EDITOR_CONTROL_VALUE_ACCESSOR = {
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
                template: `<ng-template [ngIf]="editable">

    <!-- Basic editor, also the default, which the most used features enabled. -->
    <div *ngIf="type === EditorType.Default">
        <p-editor [(ngModel)]="value" [styleClass]="styleClass" [style]="{'height':'180px'}"
                  [placeholder]="placeHolder">
            <p-header>
                    <span class="ql-formats">
                        <button class="ql-bold" aria-label="Bold"></button>
                        <button class="ql-italic" aria-label="Italic"></button>
                        <button class="ql-underline" aria-label="Underline"></button>
                    </span>
                <span class="ql-formats">
                        <button class="ql-list" value="ordered"></button>
                        <button class="ql-list" value="bullet"></button>
                    </span>
                <span class="ql-formats">
                            <button value="left" selected></button>
                            <button value="center"></button>
                            <button value="right"></button>
                            <button value="justify"></button>
                    </span>
            </p-header>
        </p-editor>
    </div>

    <!-- Editor with all the features enabled -->
    <div *ngIf="type === EditorType.Full">
        <p-editor [(ngModel)]="value" [styleClass]="styleClass" [style]="{'height':'180px'}"
                  [placeholder]="placeHolder"></p-editor>
    </div>

    <!-- Editor with all Text formatting  -->
    <div *ngIf="type === EditorType.TextFormat">
        <p-editor [(ngModel)]="value" [styleClass]="styleClass" [style]="{'height':'180px'}"
                  [placeholder]="placeHolder">
            <p-header>
            <span class="ql-format-group">
              <select title="Font" class="ql-font">
                <option value="sans-serif" selected="">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
              <select title="Size" class="ql-size">
                <option value="10px">Small</option>
                <option value="13px" selected="">Normal</option>
                <option value="18px">Large</option>
                <option value="32px">Huge</option>
              </select>
            </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold"></button>
                    <button class="ql-italic" aria-label="Italic"></button>
                    <button class="ql-underline" aria-label="Underline"></button>
                </span>
                <span class="ql-format-group">
              <select title="Text Color" class="ql-color">
                <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" selected=""></option>
                <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
                <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
                <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
                <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
                <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
                <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
                <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>
                <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
                <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
                <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
                <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
                <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
                <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
                <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
                <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
                <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
                <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
                <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
                <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
                <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
                <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
                <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
                <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
                <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
                <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
                <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
                <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
                <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
                <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
                <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
                <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
                <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
                <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
                <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
              </select>
              <span class="ql-format-separator"></span>
              <select title="Background Color" class="ql-background">
                <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>
                <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
                <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
                <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
                <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
                <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
                <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
                <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)" selected=""></option>
                <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
                <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
                <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
                <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
                <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
                <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
                <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
                <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
                <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
                <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
                <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
                <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
                <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
                <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
                <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
                <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
                <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
                <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
                <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
                <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
                <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
                <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
                <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
                <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
                <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
                <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
                <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
              </select>
            </span>
                <span class="ql-formats">
                <button class="ql-list" value="ordered"></button>
                <button class="ql-list" value="bullet"></button>
            </span>
                <span class="ql-formats">
                    <button value="left" selected></button>
                    <button value="center"></button>
                    <button value="right"></button>
                    <button value="justify"></button>
            </span>
            </p-header>
        </p-editor>
    </div>

    <!-- Custom header Text Editor -->
    <div *ngIf="type === EditorType.Custom">
        <p-editor [(ngModel)]="value" [styleClass]="styleClass" [style]="{'height':'180px'}"
                  [placeholder]="placeHolder">
            <p-header>
                <ng-content select="custom-header"></ng-content>
            </p-header>
        </p-editor>
    </div>

</ng-template>


<ng-template [ngIf]="!editable">
    <aw-string [value]="value"></aw-string>
</ng-template>
`,
                styles: [`/deep/ .ui-editor-toolbar{background-color:#f5f5f5;border:1px solid #d7d7d7}/deep/ p-editor:active /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow,/deep/ p-editor:focus /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow,/deep/ p-editor:hover /deep/ .ui-editor-toolbar.ql-toolbar.ql-snow{border-color:#199de0}/deep/ p-editor:active /deep/ .ui-editor-content.ql-container.ql-snow,/deep/ p-editor:focus /deep/ .ui-editor-content.ql-container.ql-snow,/deep/ p-editor:hover /deep/ .ui-editor-content.ql-container.ql-snow{border-color:#199de0}`],
                providers: [
                    EDITOR_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => RichTextAreaComponent) }
                ]
            },] },
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
function RichTextAreaComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaC10ZXh0LWFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmljaC10ZXh0LWFyZWEvcmljaC10ZXh0LWFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDdEYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0RwRCxNQUFNLENBQUMsdUJBQU0sNkJBQTZCLEdBQVE7SUFDOUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQStLRixNQUFNLDRCQUE2QixTQUFRLGlCQUFpQjs7Ozs7SUFtQnhELFlBQW1CLEdBQWdCLEVBRWIsZUFBa0M7UUFDcEQsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUhiLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFFYixvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7Ozs7cUJBVjNDLEVBQUU7Ozs7MEJBS0csVUFBVTtRQVF4QixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztLQUN0Qzs7OztJQUdELFFBQVE7UUFDSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzlCLG9CQUFvQixFQUFFLENBQ3pCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0tBQ047Ozs7OztJQUtELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztLQUNKOzs7WUE3TkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBa0tiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLGtoQkFBa2hCLENBQUM7Z0JBQzVoQixTQUFTLEVBQUU7b0JBQ1AsNkJBQTZCO29CQUM3QixFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUM7aUJBQ3JGO2FBRUo7Ozs7WUF2T08sV0FBVztZQUNYLGlCQUFpQix1QkEyUFIsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDOzs7bUJBaEI3RSxLQUFLO29CQU1MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi8uLi9sYXlvdXRzL2Zvcm0tdGFibGUvZm9ybS1yb3cvZm9ybS1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiBSaWNoVGV4dEFyZWEgY29tcG9uZW50IHJlcHJlc2VudHMgYSB0ZXh0IGVkaXRvciB3aGljaCBhbGxvd3MgdXNlcnMgdG8gZm9ybWF0IHRleHQgaW5wdXQuXG4gKiBUaGUgZWRpdG9yJ3MgdG9vbGJhciBpcyBwcmUtY29uZmlndXJlZCB0byBjb250YWluIGZ1bmN0aW9uYWxpdGllcyB0aGF0IGFyZSBpbiBvdXIgZGVzaWduLlxuICogQHNlZSB7QGxpbmsgZWRpdG9yL2VkaXRvci5jb21wb25lbnQuaHRtbH1cbiAqXG4gKiAgIyMjIEV4YW1wbGVcbiAqICBgYGBcbiAqXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICBzZWxlY3RvcjogJ3JmeC1ldmVudCcgLFxuICogICAgdGVtcGxhdGU6IGBcbiAqXG4gKiAgICAgICAgPCEtLSBCYXNpYyBVc2FnZS4gLS0+XG4gKiAgICAgICAgPGF3LXJpY2h0ZXh0YXJlYSBbbmFtZV09XCInZGVzY3JpcHRpb24nXCIgW3ZhbHVlXT1cImRlc2NyaXB0aW9uXCIgcGxhY2VIb2xkZXI9XCJwdXRcbiAqICAgICAgICBkZXNjcmlwdGlvblwiPlxuICogICAgICAgIDwvYXctcmljaHRleHRhcmVhPlxuICpcbiAqICAgICAgICA8IS0tIEVkaXRvciB3aXRoIEZ1bGwgZnVuY3Rpb25hbGl0eSAtLT5cbiAqICAgICAgPGF3LXJpY2h0ZXh0YXJlYSBbbmFtZV09XCInY29tbWVudCdcIiBbdHlwZV09XCJlZGl0b3JUeXBlXCIgW3ZhbHVlXT1cInZhbHVlXCJcbiAqICAgICAgcGxhY2VIb2xkZXI9XCJob2xkIHRoaXNcIj5cbiAqICAgICAgPC9hdy1yaWNodGV4dGFyZWE+XG4gKiAgICB9KVxuICogICAgZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50XG4gKiAgICB7XG4gKiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAqXG4gKiAgICAgICAgZWRpdG9yVHlwZTpFZGl0b3JUeXBlID0gRWRpdG9yVHlwZS5GdWxsO1xuICogICAgICAgIHZhbHVlOlN0cmluZztcbiAqXG4gKiAgICAgICAgY29uc3RydWN0b3IgKClcbiAqICAgICAgICB7XG4gKiAgICAgICAgfVxuICogICAgfVxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgZGlmZmVyZW50IHR5cGVzIG9mIHRleHQgZWRpdG9yLiBUaGV5IGFyZSBwcmVjb25maWd1cmVkIHdpdGhcbiAqIGZ1bmN0aW9uYWxpdHkgYmFzZWQgb24gdHlwZS4gVXNlIGN1c3RvbSB0byBhZGQgeW91ciBvd24gdG9vbGJhciBtZW51LlxuICovXG5leHBvcnQgZW51bSBFZGl0b3JUeXBlIHtcbiAgICBEZWZhdWx0LCAgICAvLyBEZWZhdWx0IEVkaXRvciBzdXBwb3J0cyBNaW5pbWFsIHNldCBvZiBmdW5jdGlvbmFsaXR5XG4gICAgLy8gWyBib2xkIHwgaXRhbGljIHwgdW5kZXJsaW5lIHwgb3JkZXJlZCB8IGJ1bGxldCB8IGFsaWdubWVudF1cbiAgICBGdWxsLCAgICAgICAvLyBUaGUgZnVsbCBsaXN0IG9mIGZ1bmN0aW9uYWxpdHksXG4gICAgVGV4dEZvcm1hdCwgLy8gRnVuY3Rpb25hbGl0aWVzIHRoYXQgYWZmZWN0cyB0ZXh0IGZvcm1hdHRpbmcuXG4gICAgQ3VzdG9tICAgICAvLyBDdXN0b20gdG9vbGJhci5cbn1cblxuXG5leHBvcnQgY29uc3QgRURJVE9SX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSaWNoVGV4dEFyZWFDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctcmljaHRleHRhcmVhJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJlZGl0YWJsZVwiPlxuXG4gICAgPCEtLSBCYXNpYyBlZGl0b3IsIGFsc28gdGhlIGRlZmF1bHQsIHdoaWNoIHRoZSBtb3N0IHVzZWQgZmVhdHVyZXMgZW5hYmxlZC4gLS0+XG4gICAgPGRpdiAqbmdJZj1cInR5cGUgPT09IEVkaXRvclR5cGUuRGVmYXVsdFwiPlxuICAgICAgICA8cC1lZGl0b3IgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiIFtzdHlsZUNsYXNzXT1cInN0eWxlQ2xhc3NcIiBbc3R5bGVdPVwieydoZWlnaHQnOicxODBweCd9XCJcbiAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZUhvbGRlclwiPlxuICAgICAgICAgICAgPHAtaGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1ib2xkXCIgYXJpYS1sYWJlbD1cIkJvbGRcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1pdGFsaWNcIiBhcmlhLWxhYmVsPVwiSXRhbGljXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtdW5kZXJsaW5lXCIgYXJpYS1sYWJlbD1cIlVuZGVybGluZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtbGlzdFwiIHZhbHVlPVwib3JkZXJlZFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWxpc3RcIiB2YWx1ZT1cImJ1bGxldFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2YWx1ZT1cImxlZnRcIiBzZWxlY3RlZD48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHZhbHVlPVwiY2VudGVyXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2YWx1ZT1cInJpZ2h0XCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2YWx1ZT1cImp1c3RpZnlcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9wLWhlYWRlcj5cbiAgICAgICAgPC9wLWVkaXRvcj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gRWRpdG9yIHdpdGggYWxsIHRoZSBmZWF0dXJlcyBlbmFibGVkIC0tPlxuICAgIDxkaXYgKm5nSWY9XCJ0eXBlID09PSBFZGl0b3JUeXBlLkZ1bGxcIj5cbiAgICAgICAgPHAtZWRpdG9yIFsobmdNb2RlbCldPVwidmFsdWVcIiBbc3R5bGVDbGFzc109XCJzdHlsZUNsYXNzXCIgW3N0eWxlXT1cInsnaGVpZ2h0JzonMTgwcHgnfVwiXG4gICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2VIb2xkZXJcIj48L3AtZWRpdG9yPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBFZGl0b3Igd2l0aCBhbGwgVGV4dCBmb3JtYXR0aW5nICAtLT5cbiAgICA8ZGl2ICpuZ0lmPVwidHlwZSA9PT0gRWRpdG9yVHlwZS5UZXh0Rm9ybWF0XCI+XG4gICAgICAgIDxwLWVkaXRvciBbKG5nTW9kZWwpXT1cInZhbHVlXCIgW3N0eWxlQ2xhc3NdPVwic3R5bGVDbGFzc1wiIFtzdHlsZV09XCJ7J2hlaWdodCc6JzE4MHB4J31cIlxuICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlSG9sZGVyXCI+XG4gICAgICAgICAgICA8cC1oZWFkZXI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdC1ncm91cFwiPlxuICAgICAgICAgICAgICA8c2VsZWN0IHRpdGxlPVwiRm9udFwiIGNsYXNzPVwicWwtZm9udFwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzYW5zLXNlcmlmXCIgc2VsZWN0ZWQ9XCJcIj5TYW5zIFNlcmlmPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNlcmlmXCI+U2VyaWY8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibW9ub3NwYWNlXCI+TW9ub3NwYWNlPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8c2VsZWN0IHRpdGxlPVwiU2l6ZVwiIGNsYXNzPVwicWwtc2l6ZVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxMHB4XCI+U21hbGw8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMTNweFwiIHNlbGVjdGVkPVwiXCI+Tm9ybWFsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjE4cHhcIj5MYXJnZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzMnB4XCI+SHVnZTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWJvbGRcIiBhcmlhLWxhYmVsPVwiQm9sZFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtaXRhbGljXCIgYXJpYS1sYWJlbD1cIkl0YWxpY1wiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtdW5kZXJsaW5lXCIgYXJpYS1sYWJlbD1cIlVuZGVybGluZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdC1ncm91cFwiPlxuICAgICAgICAgICAgICA8c2VsZWN0IHRpdGxlPVwiVGV4dCBDb2xvclwiIGNsYXNzPVwicWwtY29sb3JcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDAsIDAsIDApXCIgbGFiZWw9XCJyZ2IoMCwgMCwgMClcIiBzZWxlY3RlZD1cIlwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjMwLCAwLCAwKVwiIGxhYmVsPVwicmdiKDIzMCwgMCwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDI1NSwgMTUzLCAwKVwiIGxhYmVsPVwicmdiKDI1NSwgMTUzLCAwKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAyNTUsIDApXCIgbGFiZWw9XCJyZ2IoMjU1LCAyNTUsIDApXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYigwLCAxMzgsIDApXCIgbGFiZWw9XCJyZ2IoMCwgMTM4LCAwKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMCwgMTAyLCAyMDQpXCIgbGFiZWw9XCJyZ2IoMCwgMTAyLCAyMDQpXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYigxNTMsIDUxLCAyNTUpXCIgbGFiZWw9XCJyZ2IoMTUzLCA1MSwgMjU1KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAyNTUsIDI1NSlcIiBsYWJlbD1cInJnYigyNTUsIDI1NSwgMjU1KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjUwLCAyMDQsIDIwNClcIiBsYWJlbD1cInJnYigyNTAsIDIwNCwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAyMzUsIDIwNClcIiBsYWJlbD1cInJnYigyNTUsIDIzNSwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAyNTUsIDIwNClcIiBsYWJlbD1cInJnYigyNTUsIDI1NSwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjA0LCAyMzIsIDIwNClcIiBsYWJlbD1cInJnYigyMDQsIDIzMiwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjA0LCAyMjQsIDI0NSlcIiBsYWJlbD1cInJnYigyMDQsIDIyNCwgMjQ1KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjM1LCAyMTQsIDI1NSlcIiBsYWJlbD1cInJnYigyMzUsIDIxNCwgMjU1KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTg3LCAxODcsIDE4NylcIiBsYWJlbD1cInJnYigxODcsIDE4NywgMTg3KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjQwLCAxMDIsIDEwMilcIiBsYWJlbD1cInJnYigyNDAsIDEwMiwgMTAyKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAxOTQsIDEwMilcIiBsYWJlbD1cInJnYigyNTUsIDE5NCwgMTAyKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAyNTUsIDEwMilcIiBsYWJlbD1cInJnYigyNTUsIDI1NSwgMTAyKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTAyLCAxODUsIDEwMilcIiBsYWJlbD1cInJnYigxMDIsIDE4NSwgMTAyKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTAyLCAxNjMsIDIyNClcIiBsYWJlbD1cInJnYigxMDIsIDE2MywgMjI0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTk0LCAxMzMsIDI1NSlcIiBsYWJlbD1cInJnYigxOTQsIDEzMywgMjU1KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTM2LCAxMzYsIDEzNilcIiBsYWJlbD1cInJnYigxMzYsIDEzNiwgMTM2KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTYxLCAwLCAwKVwiIGxhYmVsPVwicmdiKDE2MSwgMCwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDE3OCwgMTA3LCAwKVwiIGxhYmVsPVwicmdiKDE3OCwgMTA3LCAwKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTc4LCAxNzgsIDApXCIgbGFiZWw9XCJyZ2IoMTc4LCAxNzgsIDApXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYigwLCA5NywgMClcIiBsYWJlbD1cInJnYigwLCA5NywgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDAsIDcxLCAxNzgpXCIgbGFiZWw9XCJyZ2IoMCwgNzEsIDE3OClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDEwNywgMzYsIDE3OClcIiBsYWJlbD1cInJnYigxMDcsIDM2LCAxNzgpXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYig2OCwgNjgsIDY4KVwiIGxhYmVsPVwicmdiKDY4LCA2OCwgNjgpXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYig5MiwgMCwgMClcIiBsYWJlbD1cInJnYig5MiwgMCwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDEwMiwgNjEsIDApXCIgbGFiZWw9XCJyZ2IoMTAyLCA2MSwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDEwMiwgMTAyLCAwKVwiIGxhYmVsPVwicmdiKDEwMiwgMTAyLCAwKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMCwgNTUsIDApXCIgbGFiZWw9XCJyZ2IoMCwgNTUsIDApXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYigwLCA0MSwgMTAyKVwiIGxhYmVsPVwicmdiKDAsIDQxLCAxMDIpXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYig2MSwgMjAsIDEwMilcIiBsYWJlbD1cInJnYig2MSwgMjAsIDEwMilcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWwtZm9ybWF0LXNlcGFyYXRvclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNlbGVjdCB0aXRsZT1cIkJhY2tncm91bmQgQ29sb3JcIiBjbGFzcz1cInFsLWJhY2tncm91bmRcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDAsIDAsIDApXCIgbGFiZWw9XCJyZ2IoMCwgMCwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDIzMCwgMCwgMClcIiBsYWJlbD1cInJnYigyMzAsIDAsIDApXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYigyNTUsIDE1MywgMClcIiBsYWJlbD1cInJnYigyNTUsIDE1MywgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDI1NSwgMjU1LCAwKVwiIGxhYmVsPVwicmdiKDI1NSwgMjU1LCAwKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMCwgMTM4LCAwKVwiIGxhYmVsPVwicmdiKDAsIDEzOCwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDAsIDEwMiwgMjA0KVwiIGxhYmVsPVwicmdiKDAsIDEwMiwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTUzLCA1MSwgMjU1KVwiIGxhYmVsPVwicmdiKDE1MywgNTEsIDI1NSlcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDI1NSwgMjU1LCAyNTUpXCIgbGFiZWw9XCJyZ2IoMjU1LCAyNTUsIDI1NSlcIiBzZWxlY3RlZD1cIlwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjUwLCAyMDQsIDIwNClcIiBsYWJlbD1cInJnYigyNTAsIDIwNCwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAyMzUsIDIwNClcIiBsYWJlbD1cInJnYigyNTUsIDIzNSwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAyNTUsIDIwNClcIiBsYWJlbD1cInJnYigyNTUsIDI1NSwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjA0LCAyMzIsIDIwNClcIiBsYWJlbD1cInJnYigyMDQsIDIzMiwgMjA0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjA0LCAyMjQsIDI0NSlcIiBsYWJlbD1cInJnYigyMDQsIDIyNCwgMjQ1KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjM1LCAyMTQsIDI1NSlcIiBsYWJlbD1cInJnYigyMzUsIDIxNCwgMjU1KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTg3LCAxODcsIDE4NylcIiBsYWJlbD1cInJnYigxODcsIDE4NywgMTg3KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjQwLCAxMDIsIDEwMilcIiBsYWJlbD1cInJnYigyNDAsIDEwMiwgMTAyKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAxOTQsIDEwMilcIiBsYWJlbD1cInJnYigyNTUsIDE5NCwgMTAyKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMjU1LCAyNTUsIDEwMilcIiBsYWJlbD1cInJnYigyNTUsIDI1NSwgMTAyKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTAyLCAxODUsIDEwMilcIiBsYWJlbD1cInJnYigxMDIsIDE4NSwgMTAyKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTAyLCAxNjMsIDIyNClcIiBsYWJlbD1cInJnYigxMDIsIDE2MywgMjI0KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTk0LCAxMzMsIDI1NSlcIiBsYWJlbD1cInJnYigxOTQsIDEzMywgMjU1KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTM2LCAxMzYsIDEzNilcIiBsYWJlbD1cInJnYigxMzYsIDEzNiwgMTM2KVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTYxLCAwLCAwKVwiIGxhYmVsPVwicmdiKDE2MSwgMCwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDE3OCwgMTA3LCAwKVwiIGxhYmVsPVwicmdiKDE3OCwgMTA3LCAwKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMTc4LCAxNzgsIDApXCIgbGFiZWw9XCJyZ2IoMTc4LCAxNzgsIDApXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYigwLCA5NywgMClcIiBsYWJlbD1cInJnYigwLCA5NywgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDAsIDcxLCAxNzgpXCIgbGFiZWw9XCJyZ2IoMCwgNzEsIDE3OClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDEwNywgMzYsIDE3OClcIiBsYWJlbD1cInJnYigxMDcsIDM2LCAxNzgpXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYig2OCwgNjgsIDY4KVwiIGxhYmVsPVwicmdiKDY4LCA2OCwgNjgpXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYig5MiwgMCwgMClcIiBsYWJlbD1cInJnYig5MiwgMCwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDEwMiwgNjEsIDApXCIgbGFiZWw9XCJyZ2IoMTAyLCA2MSwgMClcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmdiKDEwMiwgMTAyLCAwKVwiIGxhYmVsPVwicmdiKDEwMiwgMTAyLCAwKVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyZ2IoMCwgNTUsIDApXCIgbGFiZWw9XCJyZ2IoMCwgNTUsIDApXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYigwLCA0MSwgMTAyKVwiIGxhYmVsPVwicmdiKDAsIDQxLCAxMDIpXCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJnYig2MSwgMjAsIDEwMilcIiBsYWJlbD1cInJnYig2MSwgMjAsIDEwMilcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWxpc3RcIiB2YWx1ZT1cIm9yZGVyZWRcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtbGlzdFwiIHZhbHVlPVwiYnVsbGV0XCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdmFsdWU9XCJsZWZ0XCIgc2VsZWN0ZWQ+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdmFsdWU9XCJjZW50ZXJcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2YWx1ZT1cInJpZ2h0XCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdmFsdWU9XCJqdXN0aWZ5XCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L3AtaGVhZGVyPlxuICAgICAgICA8L3AtZWRpdG9yPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBDdXN0b20gaGVhZGVyIFRleHQgRWRpdG9yIC0tPlxuICAgIDxkaXYgKm5nSWY9XCJ0eXBlID09PSBFZGl0b3JUeXBlLkN1c3RvbVwiPlxuICAgICAgICA8cC1lZGl0b3IgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiIFtzdHlsZUNsYXNzXT1cInN0eWxlQ2xhc3NcIiBbc3R5bGVdPVwieydoZWlnaHQnOicxODBweCd9XCJcbiAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZUhvbGRlclwiPlxuICAgICAgICAgICAgPHAtaGVhZGVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImN1c3RvbS1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L3AtaGVhZGVyPlxuICAgICAgICA8L3AtZWRpdG9yPlxuICAgIDwvZGl2PlxuXG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZWRpdGFibGVcIj5cbiAgICA8YXctc3RyaW5nIFt2YWx1ZV09XCJ2YWx1ZVwiPjwvYXctc3RyaW5nPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gICAgc3R5bGVzOiBbYC9kZWVwLyAudWktZWRpdG9yLXRvb2xiYXJ7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2JvcmRlcjoxcHggc29saWQgI2Q3ZDdkN30vZGVlcC8gcC1lZGl0b3I6YWN0aXZlIC9kZWVwLyAudWktZWRpdG9yLXRvb2xiYXIucWwtdG9vbGJhci5xbC1zbm93LC9kZWVwLyBwLWVkaXRvcjpmb2N1cyAvZGVlcC8gLnVpLWVkaXRvci10b29sYmFyLnFsLXRvb2xiYXIucWwtc25vdywvZGVlcC8gcC1lZGl0b3I6aG92ZXIgL2RlZXAvIC51aS1lZGl0b3ItdG9vbGJhci5xbC10b29sYmFyLnFsLXNub3d7Ym9yZGVyLWNvbG9yOiMxOTlkZTB9L2RlZXAvIHAtZWRpdG9yOmFjdGl2ZSAvZGVlcC8gLnVpLWVkaXRvci1jb250ZW50LnFsLWNvbnRhaW5lci5xbC1zbm93LC9kZWVwLyBwLWVkaXRvcjpmb2N1cyAvZGVlcC8gLnVpLWVkaXRvci1jb250ZW50LnFsLWNvbnRhaW5lci5xbC1zbm93LC9kZWVwLyBwLWVkaXRvcjpob3ZlciAvZGVlcC8gLnVpLWVkaXRvci1jb250ZW50LnFsLWNvbnRhaW5lci5xbC1zbm93e2JvcmRlci1jb2xvcjojMTk5ZGUwfWBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBFRElUT1JfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSaWNoVGV4dEFyZWFDb21wb25lbnQpfVxuICAgIF1cblxufSlcbmV4cG9ydCBjbGFzcyBSaWNoVGV4dEFyZWFDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIGVkaXRvci4gIFNlZSBFZGl0b3JUeXBlIGZvciBkZXNjcmlwdGlvbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHR5cGU6IEVkaXRvclR5cGU7XG5cbiAgICAvKipcbiAgICAgKiBBIHZhbHVlIHVzZWQgdG8gc2F2ZSBhbmQgcmVhZCB3aGVuIHJlbmRlcmluZyBhbmQgdXBkYXRpbmcgdGhpcyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnkgPSAnJztcblxuICAgIC8qKlxuICAgICAqIEV4cG9zZSBlZGl0b3JUeXBlIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgaW4gdGhpcyBjb21wb25lbnRzIHRlbXBsYXRlLlxuICAgICAqL1xuICAgIEVkaXRvclR5cGU6IGFueSA9IEVkaXRvclR5cGU7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBGb3JtUm93Q29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudCkge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy50eXBlID0gRWRpdG9yVHlwZS5EZWZhdWx0O1xuICAgICAgICB0aGlzLnN0eWxlQ2xhc3MgPSAnZGVmYXVsdC1lZGl0b3InO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICAgKS5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19