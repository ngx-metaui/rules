/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild } from '@angular/core';
import { Environment, equals, isBlank, isPresent } from '@aribaui/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../../core/base-form.component';
import { Listbox } from 'primeng/primeng';
export const /** @type {?} */ LB_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ListComponent),
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
export class ListComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(env, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.parentContainer = parentContainer;
        /**
         * Component recognizes 3 modes: single, multi, multi with visible checkboxes
         */
        this.selectionMode = 'single';
        /**
         * Don't render Listbox border. Used for embedding this inside other components
         *
         */
        this.borderless = false;
        /**
         * Triggered when we double click on the list Item
         *
         */
        this.action = new EventEmitter();
        /**
         * Event fired when user select a item
         *
         */
        this.onSelection = new EventEmitter();
        this.listStyle = {};
        this.isMultiple = false;
        this.showCheckbox = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
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
            super.registerFormControl(this.selection);
            if (isBlank(this.selection)) {
                this.selection = this.formControl.value;
            }
        }
    }
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
    itemClicked(event, item, checkbox) {
        if (isPresent(checkbox)) {
            this.pListBox.onCheckboxClick(event, item);
        }
        else if (isPresent(this.pListBox)) {
            this.pListBox.onOptionClick(event, item);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * Internal
     *
     * @return {?}
     */
    hasRightTempl() {
        return isPresent(this.rZoneTempl);
    }
    /**
     * @return {?}
     */
    hasLeftTempl() {
        return isPresent(this.lZoneTempl);
    }
    /**
     * @return {?}
     */
    hasMiddleTempl() {
        return isPresent(this.mZoneTempl);
    }
    /**
     *
     * Triggered by p-listbox component when item is selected. When state is managed internally
     * we also update FormControl model.
     *
     * @param {?} event
     * @return {?}
     */
    onItemSelected(event) {
        if (isBlank(event.value)) {
            return;
        }
        this.onSelection.emit(event.value);
        if (this.isStandalone) {
            this.formControl.setValue(event.value, { emitEvent: true });
        }
        this.onModelChanged(event.value);
    }
    /**
     * Internal. Please see ControlValueAccessor
     *
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (!equals(value, this.selection)) {
            this.selection = value;
            if (this.isStandalone) {
                this.formControl.setValue(value);
            }
        }
    }
    /**
     * Translates external form of the list into PrimeNG expected format where it uses
     * SelectionItem interface
     * @return {?}
     */
    initList() {
        if (isPresent(this.list)) {
            this.internalList = this.list.map((item) => {
                return { label: this.displayValue(item), value: item };
            });
        }
    }
    /**
     *  Generates label value for the list box.
     *
     * @param {?} item
     * @return {?}
     */
    displayValue(item) {
        if (isBlank(item)) {
            return '';
        }
        let /** @type {?} */ val = item.toString();
        if (isPresent(this.field)) {
            val = item[this.field];
        }
        else if (isPresent(this.valueTransformer)) {
            val = this.valueTransformer(item);
        }
        return val;
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-list',
                template: `<p-listbox #listbox [options]="internalList" [multiple]="isMultiple" [checkbox]="showCheckbox"
           [(ngModel)]="selection" [disabled]="disabled" [style]="listStyle" [showToggleAll]="false"
           (onChange)="onItemSelected($event)" (onDblClick)="action.emit($event.value)"
           [styleClass]="styleClass">


    <ng-template let-item pTemplate="item">
        <div class="w-li-wrapper">
            <div class="w-li-left">
                <ng-template *ngIf="hasLeftTempl(); else defaultLeft"
                             [ngTemplateOutlet]="lZoneTempl"
                             [ngTemplateOutletContext]="{$implicit: item}"></ng-template>


                <ng-template #defaultLeft>
                    <aw-checkbox #check *ngIf="isMultiple && showCheckbox"
                                 [isStandalone]="false"
                                 [value]="listbox.isSelected(item)"
                                 type="action"
                                 (action)="itemClicked($event, item, check)">
                    </aw-checkbox>
                </ng-template>
            </div>

            <div class="w-li-middle" (click)="itemClicked($event, item, null)">

                <ng-template *ngIf="hasMiddleTempl(); else defaultMiddle"
                             [ngTemplateOutlet]="mZoneTempl"
                             [ngTemplateOutletContext]="{$implicit: item}"></ng-template>

                <ng-template #defaultMiddle>
                    {{item.label}}
                </ng-template>

            </div>

            <div class="w-li-right" *ngIf="hasRightTempl()">
                <ng-template [ngTemplateOutlet]="rZoneTempl"
                             [ngTemplateOutletContext]="{$implicit: item}">
                </ng-template>

            </div>
        </div>
    </ng-template>
</p-listbox>
`,
                styles: [`::ng-deep .ui-listbox-item>.ui-chkbox{display:none}::ng-deep .ui-listbox-item .ui-chkbox{margin-right:1em}.w-li-wrapper{display:flex;align-items:flex-start}.w-li-wrapper .w-li-left,.w-li-wrapper .w-li-right{flex:0 1 auto}.w-li-wrapper .w-li-middle{flex:1 1 auto}`],
                providers: [
                    LB_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => ListComponent) }
                ]
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
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
function ListComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9saXN0L2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sUUFBUSxFQUNSLFdBQVcsRUFDWCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0saUJBQWlCLENBQUM7QUFJcEQsTUFBTSxDQUFDLHVCQUFNLHlCQUF5QixHQUFRO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDNUMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUhGLE1BQU0sb0JBQXFCLFNBQVEsaUJBQWlCOzs7OztJQXFHaEQsWUFBbUIsR0FBZ0IsRUFFYixlQUFrQztRQUVwRCxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBSmIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUViLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs2QkFsRnpCLFFBQVE7Ozs7OzBCQXNCakIsS0FBSzs7Ozs7c0JBT0Ms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QkFNTCxLQUFLOytCQVFMLEtBQUs7b0JBTUwsS0FBSzt5QkFRTCxLQUFLO3FCQU9MLE1BQU07MEJBT04sTUFBTTt1QkFRTixTQUFTLFNBQUMsU0FBUzt5QkFpQm5CLFlBQVksU0FBQyxNQUFNO3lCQUduQixZQUFZLFNBQUMsUUFBUTt5QkFHckIsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGVxdWFscywgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0xpc3Rib3gsIFNlbGVjdEl0ZW19IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0NoZWNrYm94Q29tcG9uZW50fSBmcm9tICcuLi9jaGVja2JveC9jaGVja2JveC5jb21wb25lbnQnO1xuXG5cbmV4cG9ydCBjb25zdCBMQl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTGlzdENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICpcbiAqIFRoZSBMaXN0IGNvbXBvbmVudCByZXByZXNlbnQgYSBzdHJ1Y3R1cmUgd2hpY2ggY29udGFpbnMgYSBsaXN0IG9mIHNlbGVjdGFibGUgaXRlbXMuIEl0ZW1zXG4gKiBzZWxlY3Rpb24gY2FuIGJlIGNvbmZpZ3VyZWQgaW4gc2luZ2xlLXNlbGVjdGlvbiwgbXVsdGktc2VsZWN0aW9uIG9yIG11bHRpLXNlbGVjdGlvbiB3aXRoIHZpc2libGVcbiAqIGNoZWNrYm94ZXMgbW9kZS5cbiAqIEluIGFkZGl0aW9uIGl0IGNhbiBkaXNwbGF5IGRhdGEgaW5zaWRlIDMgem9uZXMgTEVGVCwgTUlERExFIGFuZCBSSUdIVCBpbiBvcmRlciB0byBwcm92aWRlXG4gKiBlYXN5IHdheSBmb3IgYXBwbGljYXRpb24gZGV2ZWxvcGVyIHRvIGxheW91dCBpdHMgb3duIGN1c3RvbSBjb250ZW50IG9yIGV2ZW4gY2hhbmdlIG91dCBvZiBib3hcbiAqIGJlaGF2aW9yLlxuICpcbiAqXG4gKiAgIyMjIEV4YW1wbGVzXG4gKlxuICogIDEuIFJlbmRlciBzaW1wbGUgc2luZ2xlIHNlbGVjdGlvbiBsaXN0XG4gKlxuICogIGBgYGh0bWxcbiAqXG4gKiAgICAgIDxhdy1saXN0IFtsaXN0XT1cImxpc3RcIj48L2F3LWxpc3Q+XG4gKlxuICogIGBgYFxuICogIDIuIFJlbmRlciBsaXN0IC0gbXVsdGkgc2VsZWN0aW9uIHdpdGggY3VzdG9tIFJJR0hUIGNvbnRlbnQgdG8gc2hvdyBhIENoZWNrTWFyayB3aGVuIGl0ZW1cbiAqICBpcyBzZWxlY3RlZFxuICpcbiAqICBgYGBodG1sXG4gKlxuICogICA8YXctbGlzdCAjYXdsaXN0IFtsaXN0XT1cImxpc3RcIlxuICogICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjE1MHB4XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjI1MHB4XCJcbiAqICAgICAgICAgICAgICAgICAgICAgICBbc2VsZWN0aW9uTW9kZV09XCInbXVsdGknXCI+XG4gKlxuICogICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3JpZ2h0IGxldC1pdGVtPlxuICpcbiAqICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2FwLWljb25cIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydpY29uLWFjY2VwdCc6IGF3bGlzdC5wTGlzdEJveC5pc1NlbGVjdGVkKGl0ZW0pLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgJyc6ICFhd2xpc3QucExpc3RCb3guaXNTZWxlY3RlZChpdGVtKX1cIj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gKiAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgIDwvYXctbGlzdD5cbiAqXG4gKiAgYGBgXG4gKlxuICogMy4gUmVuZGVyIGxpc3QgLSBtdWx0aSBzZWxlY3Rpb24gd2l0aCB2aXNpYmxlIGNoZWNrYm94ZXMgYW5kIGN1c3RvbSBNSURETEUgY29udGVudCB0byBjaGFuZ2VcbiAqICB0aGUgd2F5IGl0ZW0gbmFtZSBpcyByZW5kZXJlZFxuICpcbiAqXG4gKlxuICogIGBgYGh0bWxcbiAqXG4gKiAgIDxhdy1saXN0IFtsaXN0XT1cImxpc3RcIiBoZWlnaHQ9XCIxODBweFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIyMDBweFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGlvbl09XCJzZWxlY3Rpb25cIlxuICogICAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3Rpb25Nb2RlXT1cIidtdWx0aVdpdGhDaGVja2JveCdcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbWlkZGxlIGxldC1pdGVtPlxuICogICAgICAgICAgICAgICAgICAgICAgWFgte3tpdGVtLnZhbHVlfX1cbiAqICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqICAgIDwvYXctbGlzdD5cbiAqXG4gKiAgYGBgXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctbGlzdCcsXG4gICAgdGVtcGxhdGU6IGA8cC1saXN0Ym94ICNsaXN0Ym94IFtvcHRpb25zXT1cImludGVybmFsTGlzdFwiIFttdWx0aXBsZV09XCJpc011bHRpcGxlXCIgW2NoZWNrYm94XT1cInNob3dDaGVja2JveFwiXG4gICAgICAgICAgIFsobmdNb2RlbCldPVwic2VsZWN0aW9uXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW3N0eWxlXT1cImxpc3RTdHlsZVwiIFtzaG93VG9nZ2xlQWxsXT1cImZhbHNlXCJcbiAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uSXRlbVNlbGVjdGVkKCRldmVudClcIiAob25EYmxDbGljayk9XCJhY3Rpb24uZW1pdCgkZXZlbnQudmFsdWUpXCJcbiAgICAgICAgICAgW3N0eWxlQ2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuXG5cbiAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0gcFRlbXBsYXRlPVwiaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidy1saS13cmFwcGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidy1saS1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiaGFzTGVmdFRlbXBsKCk7IGVsc2UgZGVmYXVsdExlZnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJsWm9uZVRlbXBsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0TGVmdD5cbiAgICAgICAgICAgICAgICAgICAgPGF3LWNoZWNrYm94ICNjaGVjayAqbmdJZj1cImlzTXVsdGlwbGUgJiYgc2hvd0NoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1N0YW5kYWxvbmVdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cImxpc3Rib3guaXNTZWxlY3RlZChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwiaXRlbUNsaWNrZWQoJGV2ZW50LCBpdGVtLCBjaGVjaylcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9hdy1jaGVja2JveD5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3LWxpLW1pZGRsZVwiIChjbGljayk9XCJpdGVtQ2xpY2tlZCgkZXZlbnQsIGl0ZW0sIG51bGwpXCI+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJoYXNNaWRkbGVUZW1wbCgpOyBlbHNlIGRlZmF1bHRNaWRkbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJtWm9uZVRlbXBsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE1pZGRsZT5cbiAgICAgICAgICAgICAgICAgICAge3tpdGVtLmxhYmVsfX1cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInctbGktcmlnaHRcIiAqbmdJZj1cImhhc1JpZ2h0VGVtcGwoKVwiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJyWm9uZVRlbXBsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IGl0ZW19XCI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG48L3AtbGlzdGJveD5cbmAsXG4gICAgc3R5bGVzOiBbYDo6bmctZGVlcCAudWktbGlzdGJveC1pdGVtPi51aS1jaGtib3h7ZGlzcGxheTpub25lfTo6bmctZGVlcCAudWktbGlzdGJveC1pdGVtIC51aS1jaGtib3h7bWFyZ2luLXJpZ2h0OjFlbX0udy1saS13cmFwcGVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0fS53LWxpLXdyYXBwZXIgLnctbGktbGVmdCwudy1saS13cmFwcGVyIC53LWxpLXJpZ2h0e2ZsZXg6MCAxIGF1dG99LnctbGktd3JhcHBlciAudy1saS1taWRkbGV7ZmxleDoxIDEgYXV0b31gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTEJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBMaXN0Q29tcG9uZW50KX1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBvcHRpb24gdGhhdCB3aWxsIHNob3cgaW4gdGhlIGxpc3QuIFBsZWFzZSBub3QgdGhhdCB0aGlzIGxpc3QgaXMgY3VycmVudCB1c2VkIHRvXG4gICAgICogc2hvdyBsaW1pdGVkIG51bWJlciBvZiBpdGVtcy4gSXQgZG9lcyBub3QgaGF2ZSBhbnkgc2Nyb2xsaW5nIGZlYXR1cmUgYW5kIGxhenkgbG9hZGluZ1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0OiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqIEl0ZW1zIHdoaWNoIHdhcyBzZWxlY3RlZCBhcyBhIGRlZmF1bHQgdmFsdWVzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3Rpb246IGFueTtcblxuICAgIC8qKlxuICAgICAqIENvbXBvbmVudCByZWNvZ25pemVzIDMgbW9kZXM6IHNpbmdsZSwgbXVsdGksIG11bHRpIHdpdGggdmlzaWJsZSBjaGVja2JveGVzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3Rpb25Nb2RlOiBTZWxlY3Rpb25Nb2RlID0gJ3NpbmdsZSc7XG5cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdHRlciB1c2VkIHRvIGZvcm1hdCBlYWNoIHNlbGVjdGlvbiBmb3IgZGlzcGxheS5cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWVUcmFuc2Zvcm1lcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFVzZWQgd2hlbiBkZWFsaW5nIHdpdGggb2JqZWN0IHRvIGlkZW50aWZ5IHNwZWNpZmljIGZpZWxkIG9uIHRoZSBvYmplY3QgZm9yY29tcGFyaXNvblxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmllbGQ6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogRG9uJ3QgcmVuZGVyIExpc3Rib3ggYm9yZGVyLiBVc2VkIGZvciBlbWJlZGRpbmcgdGhpcyBpbnNpZGUgb3RoZXIgY29tcG9uZW50c1xuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBib3JkZXJsZXNzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiB3ZSBkb3VibGUgY2xpY2sgb24gdGhlIGxpc3QgSXRlbVxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3QgYSBpdGVtXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEluIGNhc2Ugd2Ugd2FudCB0byBvdmVycmlkZSBkZWZhdWx0IGJlaGF2aW9yIG9yIExlZnQgem9uZS4gV2UgZXhwb3NlIHRoaXMgbGlzdEJveCBpbiBvcmRlciB0b1xuICAgICAqIGhhdmUgYWNjZXNzIHByaW1lTmcgaW1wbGVtZW50YXRpb25cbiAgICAgKi9cbiAgICBAVmlld0NoaWxkKCdsaXN0Ym94JylcbiAgICBwTGlzdEJveDogTGlzdGJveDtcblxuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIHRlbXBsYXRlcyB0byBvdmVycmlkZSBkZWZhdWx0IGJlaGF2aW9yLiBUaGUgbGlzdCBpdGVtIGlzIGRpdmlkZWQgaW50byAzIHpvbmVzXG4gICAgICpcbiAgICAgKlxuICAgICAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiAgfCAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICB8XG4gICAgICogIHwgICBMICAgfCAgICAgICAgICAgICBNICAgICAgICAgICAgICAgICAgICAgfCAgIFIgICAgfFxuICAgICAqICB8ICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgIHxcbiAgICAgKiAgfCAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICB8XG4gICAgICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdsZWZ0JylcbiAgICBsWm9uZVRlbXBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQENvbnRlbnRDaGlsZCgnbWlkZGxlJylcbiAgICBtWm9uZVRlbXBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQENvbnRlbnRDaGlsZCgncmlnaHQnKVxuICAgIHJab25lVGVtcGw6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbFxuICAgICAqL1xuICAgIGludGVybmFsTGlzdDogU2VsZWN0SXRlbVtdO1xuXG4gICAgbGlzdFN0eWxlOiB7W25hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcblxuICAgIGlzTXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93Q2hlY2tib3g6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEJhc2VGb3JtQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMuaXNNdWx0aXBsZSA9IHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpJyB8fFxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlXaXRoQ2hlY2tib3gnO1xuICAgICAgICB0aGlzLnNob3dDaGVja2JveCA9IHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpV2l0aENoZWNrYm94JztcblxuICAgICAgICAvLyBjYW5ub3QgaGF2ZSBib3RoIGVpdGhlciB3ZSB1c2UgZmllbGQgdG8gZ2V0IGRpc3BsYXkgdmFsdWUgb3IgdmFsdWVUcmFuc2Zvcm1lclxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZmllbGQpICYmIGlzUHJlc2VudCh0aGlzLnZhbHVlVHJhbnNmb3JtZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gaGF2ZSBlaXRoZXIgW2ZpZWxkXSBvciBbdmFsdWVUcmFuc2Zvcm1lcl0uJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdExpc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBbbGlzdF0gYmluZGluZy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsc28gYWRkIG92ZXJmbG93WSB0byBtYWtlIHN1cmUgaXQgY2FuIHNjcm9sbCBhbmQgZG9lcyBub3QgZXhwYW5kIGJhc2VkIG9uIGl0cyBjb250ZW50XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5oZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RTdHlsZVsnaGVpZ2h0J10gPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMubGlzdFN0eWxlWydvdmVyZmxvdy15J10gPSAnYXV0byc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RTdHlsZVsnd2lkdGgnXSA9IHRoaXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ib3JkZXJsZXNzKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RTdHlsZVsnYm9yZGVyLWNvbG9yJ10gPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMuc2VsZWN0aW9uKTtcblxuICAgICAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFNpbmNlIHdlIGFyZSB1c2luZyA8YXctY2hlY2tib3g+IHdlIG5lZWQgdG8gaGF2ZSBjdXN0b20gaGFuZGxpbmcgYm90aCB3aGVuIGNsaWNraW5nIG9uIHRoZVxuICAgICAqIGNoZWNrYm94IGFzIHdlbGwgYXMgaXRlbSB0ZXh0LlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBpdGVtQ2xpY2tlZChldmVudDogYW55LCBpdGVtOiBhbnksIGNoZWNrYm94OiBDaGVja2JveENvbXBvbmVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY2hlY2tib3gpKSB7XG4gICAgICAgICAgICB0aGlzLnBMaXN0Qm94Lm9uQ2hlY2tib3hDbGljayhldmVudCwgaXRlbSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5wTGlzdEJveCkpIHtcbiAgICAgICAgICAgIHRoaXMucExpc3RCb3gub25PcHRpb25DbGljayhldmVudCwgaXRlbSk7XG5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNSaWdodFRlbXBsKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5yWm9uZVRlbXBsKTtcbiAgICB9XG5cbiAgICBoYXNMZWZ0VGVtcGwoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmxab25lVGVtcGwpO1xuICAgIH1cblxuXG4gICAgaGFzTWlkZGxlVGVtcGwoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLm1ab25lVGVtcGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVHJpZ2dlcmVkIGJ5IHAtbGlzdGJveCBjb21wb25lbnQgd2hlbiBpdGVtIGlzIHNlbGVjdGVkLiBXaGVuIHN0YXRlIGlzIG1hbmFnZWQgaW50ZXJuYWxseVxuICAgICAqIHdlIGFsc28gdXBkYXRlIEZvcm1Db250cm9sIG1vZGVsLlxuICAgICAqXG4gICAgICovXG4gICAgb25JdGVtU2VsZWN0ZWQoZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGV2ZW50LnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbi5lbWl0KGV2ZW50LnZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKGV2ZW50LnZhbHVlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZChldmVudC52YWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqXG4gICAgICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKCFlcXVhbHModmFsdWUsIHRoaXMuc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhbmRhbG9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlcyBleHRlcm5hbCBmb3JtIG9mIHRoZSBsaXN0IGludG8gUHJpbWVORyBleHBlY3RlZCBmb3JtYXQgd2hlcmUgaXQgdXNlc1xuICAgICAqIFNlbGVjdGlvbkl0ZW0gaW50ZXJmYWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0TGlzdCgpXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxMaXN0ID0gdGhpcy5saXN0Lm1hcCgoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IHRoaXMuZGlzcGxheVZhbHVlKGl0ZW0pLCB2YWx1ZTogaXRlbX07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIEdlbmVyYXRlcyBsYWJlbCB2YWx1ZSBmb3IgdGhlIGxpc3QgYm94LlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBkaXNwbGF5VmFsdWUoaXRlbTogYW55KTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayhpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbCA9IGl0ZW0udG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZpZWxkKSkge1xuICAgICAgICAgICAgdmFsID0gaXRlbVt0aGlzLmZpZWxkXTtcblxuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLnZhbHVlVHJhbnNmb3JtZXIpKSB7XG4gICAgICAgICAgICB2YWwgPSB0aGlzLnZhbHVlVHJhbnNmb3JtZXIoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG59XG5cbi8qKlxuICogTGlzdCBzdXBwb3J0IHRoZXNlIHRocmVlIHNlbGVjdGlvbiBtb2Rlc1xuICpcbiAqL1xuZXhwb3J0IHR5cGUgU2VsZWN0aW9uTW9kZSA9ICdzaW5nbGUnIHwgJ211bHRpJyB8ICdtdWx0aVdpdGhDaGVja2JveCc7XG4iXX0=