/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild } from '@angular/core';
import { Environment, equals, isBlank, isPresent } from '@aribaui/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../../core/base-form.component';
import { Listbox } from 'primeng/primeng';
/** @type {?} */
export var LB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ListComponent; }),
    multi: true
};
/**
 *
 * The List component represent a structure which contains a list of selectable items. Items
 * selection can be configured in single-selection, multi-selection or multi-selection with visible
 * checkboxes mode.
 * In addition it can display data inside 3 zones LEFT, MIDDLE and RIGHT in order to provide
 * easy way for application developer to layout its own custom content or even change out of box
 * behavior.
 *
 *
 *  ### Examples
 *
 *  1. Render simple single selection list
 *
 *  ```html
 *
 *      <aw-list [list]="list"></aw-list>
 *
 *  ```
 *  2. Render list - multi selection with custom RIGHT content to show a CheckMark when item
 *  is selected
 *
 *  ```html
 *
 *   <aw-list #awlist [list]="list"
 *                       height="150px"
 *                       width="250px"
 *                       [selectionMode]="'multi'">
 *
 *                  <ng-template #right let-item>
 *
 *                      <span class="sap-icon"
 *                            [ngClass]="{'icon-accept': awlist.pListBox.isSelected(item),
 *                            '': !awlist.pListBox.isSelected(item)}">
 *
 *                      </span>
 *                  </ng-template>
 *   </aw-list>
 *
 *  ```
 *
 * 3. Render list - multi selection with visible checkboxes and custom MIDDLE content to change
 *  the way item name is rendered
 *
 *
 *
 *  ```html
 *
 *   <aw-list [list]="list" height="180px"
 *                       width="200px"
 *                       [selection]="selection"
 *                       [selectionMode]="'multiWithCheckbox'">
 *
 *                  <ng-template #middle let-item>
 *                      XX-{{item.value}}
 *                  </ng-template>
 *    </aw-list>
 *
 *  ```
 *
 *
 *
 */
var ListComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ListComponent, _super);
    function ListComponent(env, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.parentContainer = parentContainer;
        /**
         * Component recognizes 3 modes: single, multi, multi with visible checkboxes
         */
        _this.selectionMode = 'single';
        /**
         * Don't render Listbox border. Used for embedding this inside other components
         *
         */
        _this.borderless = false;
        /**
         * Triggered when we double click on the list Item
         *
         */
        _this.action = new EventEmitter();
        /**
         * Event fired when user select a item
         *
         */
        _this.onSelection = new EventEmitter();
        _this.listStyle = {};
        _this.isMultiple = false;
        _this.showCheckbox = false;
        return _this;
    }
    /**
     * @return {?}
     */
    ListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.isMultiple = this.selectionMode === 'multi' ||
            this.selectionMode === 'multiWithCheckbox';
        this.showCheckbox = this.selectionMode === 'multiWithCheckbox';
        // cannot have both either we use field to get display value or valueTransformer
        if (isPresent(this.field) && isPresent(this.valueTransformer)) {
            throw new Error('You can have either [field] or [valueTransformer].');
        }
        if (isPresent(this.list)) {
            this.initList();
        }
        else {
            throw new Error('Missing [list] binding.');
        }
        // Also add overflowY to make sure it can scroll and does not expand based on its content
        if (isPresent(this.height)) {
            this.listStyle['height'] = this.height;
            this.listStyle['overflow-y'] = 'auto';
        }
        if (isPresent(this.width)) {
            this.listStyle['width'] = this.width;
        }
        if (this.borderless) {
            this.listStyle['border-color'] = 'transparent';
        }
        if (this.isStandalone) {
            _super.prototype.registerFormControl.call(this, this.selection);
            if (isBlank(this.selection)) {
                this.selection = this.formControl.value;
            }
        }
    };
    /**
     *
     * Since we are using <aw-checkbox> we need to have custom handling both when clicking on the
     * checkbox as well as item text.
     *
     *
     */
    /**
     *
     * Since we are using <aw-checkbox> we need to have custom handling both when clicking on the
     * checkbox as well as item text.
     *
     *
     * @param {?} event
     * @param {?} item
     * @param {?} checkbox
     * @return {?}
     */
    ListComponent.prototype.itemClicked = /**
     *
     * Since we are using <aw-checkbox> we need to have custom handling both when clicking on the
     * checkbox as well as item text.
     *
     *
     * @param {?} event
     * @param {?} item
     * @param {?} checkbox
     * @return {?}
     */
    function (event, item, checkbox) {
        this.pListBox.onOptionClick(event, item);
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * Internal
     *
     */
    /**
     * Internal
     *
     * @return {?}
     */
    ListComponent.prototype.hasRightTempl = /**
     * Internal
     *
     * @return {?}
     */
    function () {
        return isPresent(this.rZoneTempl);
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.hasLeftTempl = /**
     * @return {?}
     */
    function () {
        return isPresent(this.lZoneTempl);
    };
    /**
     * @return {?}
     */
    ListComponent.prototype.hasMiddleTempl = /**
     * @return {?}
     */
    function () {
        return isPresent(this.mZoneTempl);
    };
    /**
     *
     * Triggered by p-listbox component when item is selected. When state is managed internally
     * we also update FormControl model.
     *
     */
    /**
     *
     * Triggered by p-listbox component when item is selected. When state is managed internally
     * we also update FormControl model.
     *
     * @param {?} event
     * @return {?}
     */
    ListComponent.prototype.onItemSelected = /**
     *
     * Triggered by p-listbox component when item is selected. When state is managed internally
     * we also update FormControl model.
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (isBlank(event.value)) {
            return;
        }
        this.onSelection.emit(event.value);
        if (this.isStandalone) {
            this.formControl.setValue(event.value, { emitEvent: true });
        }
        this.onModelChanged(event.value);
    };
    /**
     * Internal. Please see ControlValueAccessor
     *
     */
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    ListComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!equals(value, this.selection)) {
            this.selection = value;
            if (this.isStandalone) {
                this.formControl.setValue(value);
            }
        }
    };
    /**
     * Translates external form of the list into PrimeNG expected format where it uses
     * SelectionItem interface
     * @return {?}
     */
    ListComponent.prototype.initList = /**
     * Translates external form of the list into PrimeNG expected format where it uses
     * SelectionItem interface
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPresent(this.list)) {
            this.internalList = this.list.map(function (item) {
                return { label: _this.displayValue(item), value: item };
            });
        }
    };
    /**
     *  Generates label value for the list box.
     *
     * @param {?} item
     * @return {?}
     */
    ListComponent.prototype.displayValue = /**
     *  Generates label value for the list box.
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (isBlank(item)) {
            return '';
        }
        /** @type {?} */
        var val = item.toString();
        if (isPresent(this.field)) {
            val = item[this.field];
        }
        else if (isPresent(this.valueTransformer)) {
            val = this.valueTransformer(item);
        }
        return val;
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-list',
                    template: "<p-listbox #listbox [options]=\"internalList\" [multiple]=\"isMultiple\" [checkbox]=\"showCheckbox\"\n           [(ngModel)]=\"selection\" [disabled]=\"disabled\" [style]=\"listStyle\" [showToggleAll]=\"false\"\n           (onChange)=\"onItemSelected($event)\" (onDblClick)=\"action.emit($event.value)\"\n           [styleClass]=\"styleClass\">\n\n\n    <ng-template let-item pTemplate=\"item\">\n        <div class=\"w-li-wrapper\">\n            <div class=\"w-li-left\">\n                <ng-template *ngIf=\"hasLeftTempl(); else defaultLeft\"\n                             [ngTemplateOutlet]=\"lZoneTempl\"\n                             [ngTemplateOutletContext]=\"{$implicit: item}\"></ng-template>\n\n\n                <ng-template #defaultLeft>\n                    <span (click)=\"itemClicked($event, item, null)\">\n                        <aw-checkbox #check *ngIf=\"isMultiple && showCheckbox\"\n                                     [isStandalone]=\"false\"\n                                     [value]=\"listbox.isSelected(item)\"\n                                     type=\"action\">\n                    </aw-checkbox></span>\n                </ng-template>\n            </div>\n\n            <div class=\"w-li-middle\" (click)=\"itemClicked($event, item, null)\">\n\n                <ng-template *ngIf=\"hasMiddleTempl(); else defaultMiddle\"\n                             [ngTemplateOutlet]=\"mZoneTempl\"\n                             [ngTemplateOutletContext]=\"{$implicit: item}\"></ng-template>\n\n                <ng-template #defaultMiddle>\n                    {{item.label}}\n                </ng-template>\n\n            </div>\n\n            <div class=\"w-li-right\" *ngIf=\"hasRightTempl()\">\n                <ng-template [ngTemplateOutlet]=\"rZoneTempl\"\n                             [ngTemplateOutletContext]=\"{$implicit: item}\">\n                </ng-template>\n\n            </div>\n        </div>\n    </ng-template>\n</p-listbox>\n",
                    providers: [
                        LB_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return ListComponent; }) }
                    ],
                    styles: ["::ng-deep .ui-listbox-item>.ui-chkbox{display:none}::ng-deep .ui-listbox-item .ui-chkbox{margin-right:1em}.w-li-wrapper{display:flex;align-items:flex-start}.w-li-wrapper .w-li-left,.w-li-wrapper .w-li-right{flex:0 1 auto}.w-li-wrapper .w-li-middle{flex:1 1 auto}"]
                }] }
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return BaseFormComponent; }),] }] }
    ]; };
    ListComponent.propDecorators = {
        list: [{ type: Input }],
        selection: [{ type: Input }],
        selectionMode: [{ type: Input }],
        valueTransformer: [{ type: Input }],
        field: [{ type: Input }],
        borderless: [{ type: Input }],
        action: [{ type: Output }],
        onSelection: [{ type: Output }],
        pListBox: [{ type: ViewChild, args: ['listbox',] }],
        lZoneTempl: [{ type: ContentChild, args: ['left',] }],
        mZoneTempl: [{ type: ContentChild, args: ['middle',] }],
        rZoneTempl: [{ type: ContentChild, args: ['right',] }]
    };
    return ListComponent;
}(BaseFormComponent));
export { ListComponent };
if (false) {
    /**
     * List of option that will show in the list. Please not that this list is current used to
     * show limited number of items. It does not have any scrolling feature and lazy loading
     *
     * @type {?}
     */
    ListComponent.prototype.list;
    /**
     * Items which was selected as a default values
     * @type {?}
     */
    ListComponent.prototype.selection;
    /**
     * Component recognizes 3 modes: single, multi, multi with visible checkboxes
     * @type {?}
     */
    ListComponent.prototype.selectionMode;
    /**
     * Formatter used to format each selection for display.
     *
     * @type {?}
     */
    ListComponent.prototype.valueTransformer;
    /**
     * Used when dealing with object to identify specific field on the object forcomparison
     * @type {?}
     */
    ListComponent.prototype.field;
    /**
     * Don't render Listbox border. Used for embedding this inside other components
     *
     * @type {?}
     */
    ListComponent.prototype.borderless;
    /**
     * Triggered when we double click on the list Item
     *
     * @type {?}
     */
    ListComponent.prototype.action;
    /**
     * Event fired when user select a item
     *
     * @type {?}
     */
    ListComponent.prototype.onSelection;
    /**
     * In case we want to override default behavior or Left zone. We expose this listBox in order to
     * have access primeNg implementation
     * @type {?}
     */
    ListComponent.prototype.pListBox;
    /**
     * Custom templates to override default behavior. The list item is divided into 3 zones
     *
     *
     *  ------------------------------------------------------
     *  |       |                                   |        |
     *  |   L   |             M                     |   R    |
     *  |       |                                   |        |
     *  |       |                                   |        |
     *  ------------------------------------------------------
     *
     *
     * @type {?}
     */
    ListComponent.prototype.lZoneTempl;
    /** @type {?} */
    ListComponent.prototype.mZoneTempl;
    /** @type {?} */
    ListComponent.prototype.rZoneTempl;
    /**
     * Internal
     * @type {?}
     */
    ListComponent.prototype.internalList;
    /** @type {?} */
    ListComponent.prototype.listStyle;
    /** @type {?} */
    ListComponent.prototype.isMultiple;
    /** @type {?} */
    ListComponent.prototype.showCheckbox;
    /** @type {?} */
    ListComponent.prototype.env;
    /** @type {?} */
    ListComponent.prototype.parentContainer;
}
/** @typedef {?} */
var SelectionMode;
export { SelectionMode };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9saXN0L2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLE9BQU8sRUFBYSxNQUFNLGlCQUFpQixDQUFDOztBQUlwRCxXQUFhLHlCQUF5QixHQUFRO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQztJQUM1QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMEVpQyx5Q0FBaUI7SUFxR2hELHVCQUFtQixHQUFnQixFQUViLGVBQWtDO1FBRnhELFlBSUksa0JBQU0sR0FBRyxFQUFFLGVBQWUsQ0FBQyxTQUM5QjtRQUxrQixTQUFHLEdBQUgsR0FBRyxDQUFhO1FBRWIscUJBQWUsR0FBZixlQUFlLENBQW1COzs7OzhCQWxGekIsUUFBUTs7Ozs7MkJBc0JqQixLQUFLOzs7Ozt1QkFPQyxJQUFJLFlBQVksRUFBRTs7Ozs7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LGlCQUFpQjtTQUF2QyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBlcXVhbHMsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtMaXN0Ym94LCBTZWxlY3RJdGVtfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtDaGVja2JveENvbXBvbmVudH0gZnJvbSAnLi4vY2hlY2tib3gvY2hlY2tib3guY29tcG9uZW50JztcblxuXG5leHBvcnQgY29uc3QgTEJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IExpc3RDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqXG4gKiBUaGUgTGlzdCBjb21wb25lbnQgcmVwcmVzZW50IGEgc3RydWN0dXJlIHdoaWNoIGNvbnRhaW5zIGEgbGlzdCBvZiBzZWxlY3RhYmxlIGl0ZW1zLiBJdGVtc1xuICogc2VsZWN0aW9uIGNhbiBiZSBjb25maWd1cmVkIGluIHNpbmdsZS1zZWxlY3Rpb24sIG11bHRpLXNlbGVjdGlvbiBvciBtdWx0aS1zZWxlY3Rpb24gd2l0aCB2aXNpYmxlXG4gKiBjaGVja2JveGVzIG1vZGUuXG4gKiBJbiBhZGRpdGlvbiBpdCBjYW4gZGlzcGxheSBkYXRhIGluc2lkZSAzIHpvbmVzIExFRlQsIE1JRERMRSBhbmQgUklHSFQgaW4gb3JkZXIgdG8gcHJvdmlkZVxuICogZWFzeSB3YXkgZm9yIGFwcGxpY2F0aW9uIGRldmVsb3BlciB0byBsYXlvdXQgaXRzIG93biBjdXN0b20gY29udGVudCBvciBldmVuIGNoYW5nZSBvdXQgb2YgYm94XG4gKiBiZWhhdmlvci5cbiAqXG4gKlxuICogICMjIyBFeGFtcGxlc1xuICpcbiAqICAxLiBSZW5kZXIgc2ltcGxlIHNpbmdsZSBzZWxlY3Rpb24gbGlzdFxuICpcbiAqICBgYGBodG1sXG4gKlxuICogICAgICA8YXctbGlzdCBbbGlzdF09XCJsaXN0XCI+PC9hdy1saXN0PlxuICpcbiAqICBgYGBcbiAqICAyLiBSZW5kZXIgbGlzdCAtIG11bHRpIHNlbGVjdGlvbiB3aXRoIGN1c3RvbSBSSUdIVCBjb250ZW50IHRvIHNob3cgYSBDaGVja01hcmsgd2hlbiBpdGVtXG4gKiAgaXMgc2VsZWN0ZWRcbiAqXG4gKiAgYGBgaHRtbFxuICpcbiAqICAgPGF3LWxpc3QgI2F3bGlzdCBbbGlzdF09XCJsaXN0XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxNTBweFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIyNTBweFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGlvbk1vZGVdPVwiJ211bHRpJ1wiPlxuICpcbiAqICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNyaWdodCBsZXQtaXRlbT5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNhcC1pY29uXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnaWNvbi1hY2NlcHQnOiBhd2xpc3QucExpc3RCb3guaXNTZWxlY3RlZChpdGVtKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnOiAhYXdsaXN0LnBMaXN0Qm94LmlzU2VsZWN0ZWQoaXRlbSl9XCI+XG4gKlxuICogICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICogICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICogICA8L2F3LWxpc3Q+XG4gKlxuICogIGBgYFxuICpcbiAqIDMuIFJlbmRlciBsaXN0IC0gbXVsdGkgc2VsZWN0aW9uIHdpdGggdmlzaWJsZSBjaGVja2JveGVzIGFuZCBjdXN0b20gTUlERExFIGNvbnRlbnQgdG8gY2hhbmdlXG4gKiAgdGhlIHdheSBpdGVtIG5hbWUgaXMgcmVuZGVyZWRcbiAqXG4gKlxuICpcbiAqICBgYGBodG1sXG4gKlxuICogICA8YXctbGlzdCBbbGlzdF09XCJsaXN0XCIgaGVpZ2h0PVwiMTgwcHhcIlxuICogICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMjAwcHhcIlxuICogICAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3Rpb25dPVwic2VsZWN0aW9uXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICBbc2VsZWN0aW9uTW9kZV09XCInbXVsdGlXaXRoQ2hlY2tib3gnXCI+XG4gKlxuICogICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI21pZGRsZSBsZXQtaXRlbT5cbiAqICAgICAgICAgICAgICAgICAgICAgIFhYLXt7aXRlbS52YWx1ZX19XG4gKiAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICA8L2F3LWxpc3Q+XG4gKlxuICogIGBgYFxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9saXN0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIExCX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTGlzdENvbXBvbmVudCl9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2Ygb3B0aW9uIHRoYXQgd2lsbCBzaG93IGluIHRoZSBsaXN0LiBQbGVhc2Ugbm90IHRoYXQgdGhpcyBsaXN0IGlzIGN1cnJlbnQgdXNlZCB0b1xuICAgICAqIHNob3cgbGltaXRlZCBudW1iZXIgb2YgaXRlbXMuIEl0IGRvZXMgbm90IGhhdmUgYW55IHNjcm9sbGluZyBmZWF0dXJlIGFuZCBsYXp5IGxvYWRpbmdcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdDogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBJdGVtcyB3aGljaCB3YXMgc2VsZWN0ZWQgYXMgYSBkZWZhdWx0IHZhbHVlc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDb21wb25lbnQgcmVjb2duaXplcyAzIG1vZGVzOiBzaW5nbGUsIG11bHRpLCBtdWx0aSB3aXRoIHZpc2libGUgY2hlY2tib3hlc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uTW9kZTogU2VsZWN0aW9uTW9kZSA9ICdzaW5nbGUnO1xuXG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXR0ZXIgdXNlZCB0byBmb3JtYXQgZWFjaCBzZWxlY3Rpb24gZm9yIGRpc3BsYXkuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlVHJhbnNmb3JtZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHdoZW4gZGVhbGluZyB3aXRoIG9iamVjdCB0byBpZGVudGlmeSBzcGVjaWZpYyBmaWVsZCBvbiB0aGUgb2JqZWN0IGZvcmNvbXBhcmlzb25cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpZWxkOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIERvbid0IHJlbmRlciBMaXN0Ym94IGJvcmRlci4gVXNlZCBmb3IgZW1iZWRkaW5nIHRoaXMgaW5zaWRlIG90aGVyIGNvbXBvbmVudHNcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYm9yZGVybGVzczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIHdoZW4gd2UgZG91YmxlIGNsaWNrIG9uIHRoZSBsaXN0IEl0ZW1cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0IGEgaXRlbVxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25TZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIHdlIHdhbnQgdG8gb3ZlcnJpZGUgZGVmYXVsdCBiZWhhdmlvciBvciBMZWZ0IHpvbmUuIFdlIGV4cG9zZSB0aGlzIGxpc3RCb3ggaW4gb3JkZXIgdG9cbiAgICAgKiBoYXZlIGFjY2VzcyBwcmltZU5nIGltcGxlbWVudGF0aW9uXG4gICAgICovXG4gICAgQFZpZXdDaGlsZCgnbGlzdGJveCcpXG4gICAgcExpc3RCb3g6IExpc3Rib3g7XG5cblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSB0ZW1wbGF0ZXMgdG8gb3ZlcnJpZGUgZGVmYXVsdCBiZWhhdmlvci4gVGhlIGxpc3QgaXRlbSBpcyBkaXZpZGVkIGludG8gMyB6b25lc1xuICAgICAqXG4gICAgICpcbiAgICAgKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogIHwgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgfFxuICAgICAqICB8ICAgTCAgIHwgICAgICAgICAgICAgTSAgICAgICAgICAgICAgICAgICAgIHwgICBSICAgIHxcbiAgICAgKiAgfCAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICB8XG4gICAgICogIHwgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgfFxuICAgICAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnbGVmdCcpXG4gICAgbFpvbmVUZW1wbDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBDb250ZW50Q2hpbGQoJ21pZGRsZScpXG4gICAgbVpvbmVUZW1wbDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBDb250ZW50Q2hpbGQoJ3JpZ2h0JylcbiAgICByWm9uZVRlbXBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWxcbiAgICAgKi9cbiAgICBpbnRlcm5hbExpc3Q6IFNlbGVjdEl0ZW1bXTtcblxuICAgIGxpc3RTdHlsZToge1tuYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICBpc011bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2hvd0NoZWNrYm94OiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBCYXNlRm9ybUNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLmlzTXVsdGlwbGUgPSB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpV2l0aENoZWNrYm94JztcbiAgICAgICAgdGhpcy5zaG93Q2hlY2tib3ggPSB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aVdpdGhDaGVja2JveCc7XG5cbiAgICAgICAgLy8gY2Fubm90IGhhdmUgYm90aCBlaXRoZXIgd2UgdXNlIGZpZWxkIHRvIGdldCBkaXNwbGF5IHZhbHVlIG9yIHZhbHVlVHJhbnNmb3JtZXJcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZpZWxkKSAmJiBpc1ByZXNlbnQodGhpcy52YWx1ZVRyYW5zZm9ybWVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIGhhdmUgZWl0aGVyIFtmaWVsZF0gb3IgW3ZhbHVlVHJhbnNmb3JtZXJdLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3QpKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRMaXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgW2xpc3RdIGJpbmRpbmcuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbHNvIGFkZCBvdmVyZmxvd1kgdG8gbWFrZSBzdXJlIGl0IGNhbiBzY3JvbGwgYW5kIGRvZXMgbm90IGV4cGFuZCBiYXNlZCBvbiBpdHMgY29udGVudFxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgdGhpcy5saXN0U3R5bGVbJ2hlaWdodCddID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmxpc3RTdHlsZVsnb3ZlcmZsb3cteSddID0gJ2F1dG8nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLndpZHRoKSkge1xuICAgICAgICAgICAgdGhpcy5saXN0U3R5bGVbJ3dpZHRoJ10gPSB0aGlzLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYm9yZGVybGVzcykge1xuICAgICAgICAgICAgdGhpcy5saXN0U3R5bGVbJ2JvcmRlci1jb2xvciddID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnNlbGVjdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5mb3JtQ29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTaW5jZSB3ZSBhcmUgdXNpbmcgPGF3LWNoZWNrYm94PiB3ZSBuZWVkIHRvIGhhdmUgY3VzdG9tIGhhbmRsaW5nIGJvdGggd2hlbiBjbGlja2luZyBvbiB0aGVcbiAgICAgKiBjaGVja2JveCBhcyB3ZWxsIGFzIGl0ZW0gdGV4dC5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaXRlbUNsaWNrZWQoZXZlbnQ6IGFueSwgaXRlbTogYW55LCBjaGVja2JveDogQ2hlY2tib3hDb21wb25lbnQpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnBMaXN0Qm94Lm9uT3B0aW9uQ2xpY2soZXZlbnQsIGl0ZW0pO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNSaWdodFRlbXBsKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5yWm9uZVRlbXBsKTtcbiAgICB9XG5cbiAgICBoYXNMZWZ0VGVtcGwoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmxab25lVGVtcGwpO1xuICAgIH1cblxuXG4gICAgaGFzTWlkZGxlVGVtcGwoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLm1ab25lVGVtcGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHJpZ2dlcmVkIGJ5IHAtbGlzdGJveCBjb21wb25lbnQgd2hlbiBpdGVtIGlzIHNlbGVjdGVkLiBXaGVuIHN0YXRlIGlzIG1hbmFnZWQgaW50ZXJuYWxseVxuICAgICAqIHdlIGFsc28gdXBkYXRlIEZvcm1Db250cm9sIG1vZGVsLlxuICAgICAqXG4gICAgICovXG4gICAgb25JdGVtU2VsZWN0ZWQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGV2ZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbi5lbWl0KGV2ZW50LnZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKGV2ZW50LnZhbHVlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZChldmVudC52YWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKCFlcXVhbHModmFsdWUsIHRoaXMuc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlcyBleHRlcm5hbCBmb3JtIG9mIHRoZSBsaXN0IGludG8gUHJpbWVORyBleHBlY3RlZCBmb3JtYXQgd2hlcmUgaXQgdXNlc1xuICAgICAqIFNlbGVjdGlvbkl0ZW0gaW50ZXJmYWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0TGlzdCgpXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxMaXN0ID0gdGhpcy5saXN0Lm1hcCgoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IHRoaXMuZGlzcGxheVZhbHVlKGl0ZW0pLCB2YWx1ZTogaXRlbX07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIEdlbmVyYXRlcyBsYWJlbCB2YWx1ZSBmb3IgdGhlIGxpc3QgYm94LlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBkaXNwbGF5VmFsdWUoaXRlbTogYW55KTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbCA9IGl0ZW0udG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZpZWxkKSkge1xuICAgICAgICAgICAgdmFsID0gaXRlbVt0aGlzLmZpZWxkXTtcblxuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLnZhbHVlVHJhbnNmb3JtZXIpKSB7XG4gICAgICAgICAgICB2YWwgPSB0aGlzLnZhbHVlVHJhbnNmb3JtZXIoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG59XG5cbi8qKlxuICogTGlzdCBzdXBwb3J0IHRoZXNlIHRocmVlIHNlbGVjdGlvbiBtb2Rlc1xuICpcbiAqL1xuZXhwb3J0IHR5cGUgU2VsZWN0aW9uTW9kZSA9ICdzaW5nbGUnIHwgJ211bHRpJyB8ICdtdWx0aVdpdGhDaGVja2JveCc7XG4iXX0=