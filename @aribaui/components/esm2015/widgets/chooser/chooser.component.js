/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoComplete } from 'primeng/primeng';
import { assert, Environment, isBlank, isPresent } from '@aribaui/core';
import { BaseFormComponent } from '../../core/base-form.component';
import { DATA_SOURCE } from '../../core/data/data-source';
import { ChooserDataSource } from './chooser-data-source';
import { DataProviders } from '../../core/data/data-providers';
import { DataFinders, QueryType } from '../../core/data/data-finders';
import { ChooserState, DefaultSelectionState } from './chooser-state';
/** *
 * Typeahead chooser that supports both single and multi-select. Not like Dropdown, this chooser
 * requires little bit different setup. It requires at minimum \@Input dataSource or
 * destinationClass
 *
 *
 * By default chooser is multi-select. If you want single select then you must provide multi-select
 * with \@Input.
 *
 * ### Example
 *
 * In simple scenario you can use Chooser like so:
 *
 *
 * ```
 * \@Component({
 *      selector: 'chooser-app' ,
 *      template: `<aw-chooser  [formGroup]="formGroup" name="color"'
 *                      [dataSource]="ds"></aw-chooser>`
 *  })
 *  export class MyChooserApp
 *  {
 *
 *      ds: ChooserDataSource;
 *
 *     constructor(private data: DataProviders, private finders: DataFinders){
 *          this.ds = new ChooserDataSource(this.data, this.finders);
 *
 *       this.ds.init({
 *           obj: ['blue', 'red', 'yellow'], queryType: QueryType.FullText, state: null,
 *            multiselect: true
 *       });
 *
 *     }
 *  }
 *
 * ````
 *  Above example will use provided dataSource and render multi-select chooser. With default
 *  implementation  selected values will appear as a tags under the input box
 *
 *
 *
 * * ### Example
 *
 *  In this example we provide custom template to change the way how chooser's MenuItem are
 *     rendered as well as template for the selection item looks like
 *
 * ```
 * \@Component({
 *      selector: 'chooser-app' ,
 *      template: `<aw-chooser  name="commodity"' [dataSource]="ds">
 *
 *          <ng-template #menuItem let-item>
 *             	<span>
 *             		<i class="fa fa-envira " ></i>
 *             		{{item}}
 *             	</span>
 *
 *          </ng-template>
 *
 *          <ng-template #selectionItem let-item>
 *             	<span class="tag tag-circle">
 *             		item: {{item }}
 *             		<i class="fa fa-close" (click)="chooser.removeValue(item)"></i>
 *             	</span>
 *
 *
 *          </ng-template>
 *
 *
 *          </aw-chooser>
 *      `
 *      style: [`
 *              .tag-circle {
 *              	border-radius: 6rem;
 *              	height: 7rem;
 *              	color: #e8eef1;
 *              	background-color: rgba(53, 56, 58, 0.67);
 *              	line-height: 6rem;
 *              }
 *      `]
 *  })
 *
 * ````
 *
 *  In above example we change how the chooser's menu item look like as well as we define custom
 *     template for selection item to turn all selection to circles with text in the middle.
 *
 *
 *
  @type {?} */
export const CHOOSER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChooserComponent),
    multi: true
};
export class ChooserComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} elemementRef
     * @param {?} _defaultDS
     * @param {?} parentContainer
     */
    constructor(env, elemementRef, _defaultDS, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this.elemementRef = elemementRef;
        this._defaultDS = _defaultDS;
        this.parentContainer = parentContainer;
        /**
         * Max number of items return at single Match so we do not return 1000 items at single time.
         *
         */
        this.maxLength = 10;
        /**
         * Max number of items return at single Match so we do not return 1000 items at single time.
         *
         */
        this.minLenForSearch = 1;
        /**
         * Is this multiselect
         *
         */
        this.multiselect = true;
        this.delay = 300;
        /**
         * Event fired when user select a item
         */
        this.onSelection = new EventEmitter();
        if (isBlank(this.placeHolder)) {
            // this.placeHolder = i18n.instant('Widgets.chooser.placeHolder');
            this.placeHolder = 'Search';
        }
        // this.hideLink = i18n.instant('Widgets.chooser.hideSelection');
        this.hideLink = 'Hide';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.dataSource)) {
            this.dataSource = this._defaultDS;
            this.initDatasource();
        }
        if (isPresent(this.formControl) && isPresent(this.formControl.value)) {
            this.dataSource.updateValue(this.formControl.value);
        }
        this.initInternalModel();
        if (this.isStandalone) {
            super.registerFormControl(this.internalChooserModel);
        }
        else {
            if (isPresent(this.name)) {
                this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
            }
        }
    }
    /**
     * Add Search icon in case of multiselect.
     * todo: Once PrimeNG will provide a template to override default behavior remove it
     *
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.dataSource.state.multiselect) {
            return;
        }
        /** @type {?} */
        let searchInput = this.elemementRef.nativeElement.querySelector('.ui-autocomplete-input-token');
        if (isPresent(searchInput)) {
            /** @type {?} */
            let iconElement = document.createElement('span');
            iconElement.className = 'search-icon-right fa fa-fw fa-search';
            searchInput.appendChild(iconElement);
        }
        if (isPresent(this.selectionAppendTo) && isPresent(this.selectionViewElem)) {
            /** @type {?} */
            let parentElem = this.selectionAppendTo instanceof ElementRef ?
                this.selectionAppendTo.nativeElement : this.selectionAppendTo;
            parentElem.appendChild(this.selectionViewElem.nativeElement);
        }
    }
    /**
     * Need to change current behavior since we want to show selection under the chooser. K
     *
     * @return {?}
     */
    ngAfterViewChecked() {
        if (!this.dataSource.state.multiselect) {
            return;
        }
        /** @type {?} */
        let tokens = this.elemementRef.nativeElement.querySelectorAll('.ui-autocomplete .ui-autocomplete-token');
        if (isPresent(tokens) && tokens.length > 0) {
            tokens.forEach((item) => {
                item.remove();
            });
        }
    }
    /**
     *
     * When value is entered into search box, we ask our DataSource to match this pattern
     * against data repository. It will retrieve all possible matches limited by MaxLen and this
     * is again filtered so it does not include already selected items.
     *
     *  the matched resulted is saved in the: this.dataSource.state.matches
     * @param {?} pattern
     * @return {?}
     */
    match(pattern) {
        /** @type {?} */
        let maxLen = this.maxLength ? this.maxLength : ChooserDataSource.MaxLength;
        this.dataSource.find(pattern, maxLen);
        // fix: for tests: In version 4 we need to explicitly focus input otherwise autocomplete
        // doesn't give us any popup panel
        if (this.env.inTest && isPresent(this.autoCompleteComponent)) {
            this.autoCompleteComponent.focusInput();
        }
    }
    /**
     *
     * Invoked by Dropdown button in case of single select and here we want to invoke match
     * to retrieve all suggestions without any filter
     *
     * @param {?} event
     * @return {?}
     */
    onDropdownClick(event) {
        this.match('*');
        setTimeout(() => {
            this.match('*');
        }, 100);
    }
    /**
     *
     * Chooser state is updated  with user selection. Please see writeValue. When do not need
     * call anything additional as internalChooserModel and this.chooserState.selectedObjects()
     * shares the same references so its important that we first save reference to
     * this.chooserState.selectedObjects() and then back to internalChooserModel
     *
     * @param {?} item
     * @return {?}
     */
    selectItem(item) {
        this.onSelection.emit(this.internalChooserModel);
        this.formControl.setValue(this.internalChooserModel, { emitEvent: true });
        this.formControl.markAsDirty({ onlySelf: true });
        this.dataSource.state.addMode = true;
        this.onModelChanged(this.internalChooserModel);
        this.dataSource.state.updatedSelectedObjects(item);
        this.dataSource.state.addMode = true;
        if (!this.dataSource.state.multiselect) {
            this.autoCompleteComponent.inputEL.nativeElement.value =
                this.displayItem(this.internalChooserModel);
        }
    }
    /**
     *
     * Unselect item
     *
     * @param {?} item
     * @return {?}
     */
    removeValue(item) {
        this.dataSource.state.addMode = true;
        this.dataSource.state.updatedSelectedObjects(item);
        this.dataSource.state.addMode = false;
        this.internalChooserModel = this.dataSource.state.selectedObjects();
        this.onSelection.emit(this.internalChooserModel);
        this.formControl.setValue(this.internalChooserModel, { emitEvent: true });
        this.formControl.markAsDirty({ onlySelf: true });
        this.onModelChanged(this.internalChooserModel);
        if (isPresent(this.autoCompleteComponent)) {
            this.autoCompleteComponent.focusInput();
        }
    }
    /**
     *
     * Convert a object if any into the string representation
     *
     * todo: implement better way how to work with objects
     *
     * @param {?} item
     * @return {?}
     */
    displayItem(item) {
        if (isBlank(item)) {
            return null;
        }
        this.dataSource.state.currentItem = item;
        if (isPresent(this.valueTransformer)) {
            return this.valueTransformer(item);
        }
        else if (isPresent(this.dataSource.lookupKey)) {
            return item[this.dataSource.lookupKey];
        }
        else {
            return item.toString();
        }
    }
    /**
     *
     * Returns a label that is shown under the selected item when user selection is >
     * MaxRecentSelected
     *
     * @return {?}
     */
    moreSelectString() {
        /** @type {?} */
        let moreSelected = this.dataSource.state.selectedObjects().length -
            this.dataSource.state.recentSelectedDisplayed;
        if (moreSelected < 2 && !this.dataSource.state.showAllRecentlySelected) {
            return '';
        }
        if (this.dataSource.state.showAllRecentlySelected) {
            return this.hideLink;
        }
        return `${moreSelected} more selected...`;
    }
    /**
     * In case of multiselect = false check if we want to show a selected value inside the input
     * field
     *
     * @return {?}
     */
    singleValueSelected() {
        return !this.dataSource.state && isPresent(this.dataSource.state.currentItem)
            && !this.dataSource.state.addMode;
    }
    /**
     * @return {?}
     */
    hasMenuTemplate() {
        return isPresent(this.menuTemplate);
    }
    /**
     * @return {?}
     */
    hasSelectionTemplate() {
        return isPresent(this.selectionTemplate);
    }
    /**
     * Internal. Please see ControlValueAccessor
     * As we are using DataSource internally for [(ngModel)] case we need to deffer DataSource
     * initialization once we have a value and we only accept []
     *
     *
     * ? Should we do some deeper comparision?
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (isBlank(value)) {
            return;
        }
        if (isPresent(this.dataSource)) {
            this.dataSource.updateValue(value);
        }
        else {
            /** @type {?} */
            let selState = new DefaultSelectionState(this.multiselect);
            /** @type {?} */
            let chState = new ChooserState(selState, this.multiselect);
            this.initDatasource(chState);
            this.dataSource.updateValue(value);
        }
        this.initInternalModel();
    }
    /**
     * @param {?=} chooserState
     * @return {?}
     */
    initDatasource(chooserState) {
        assert(isPresent(this.destinationClass), 'You need to provide destinationClass or custom DataSource');
        this.dataSource.init({
            obj: this.destinationClass,
            queryType: QueryType.FullText,
            lookupKey: this.field,
            state: chooserState,
            multiselect: this.multiselect
        });
    }
    /**
     *
     * Used by ngOnInit and Write value to read state from ChooserState and set it to internal
     * ngModel property
     *
     * @return {?}
     */
    initInternalModel() {
        if (this.dataSource.state.multiselect) {
            this.internalChooserModel = this.dataSource.state.selectedObjects();
        }
        else {
            this.internalChooserModel = this.dataSource.state.selectedObject();
        }
        if (isPresent(this.formControl)) {
            this.formControl.setValue(this.internalChooserModel);
        }
    }
}
ChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-chooser',
                template: "<div class=\"w-chooser \">\n\n    <p-autoComplete #autoCompplete [(ngModel)]=\"internalChooserModel\"\n                    [suggestions]=\"dataSource.state.matches\"\n                    [multiple]=\"dataSource.state.multiselect\"\n                    [dropdown]=\"!dataSource.state.multiselect\"\n                    [minLength]=\"minLenForSearch\"\n                    [placeholder]=\"placeHolder\"\n                    [delay]=\"delay\"\n                    [disabled]=\"disabled\"\n                    (onDropdownClick)=\"onDropdownClick($event)\"\n                    (completeMethod)=\"match($event.query)\"\n                    (onSelect)=\"selectItem($event)\"\n                    (onUnselect)=\"removeValue($event)\">\n\n\n        <ng-template let-internalChooserModel pTemplate=\"item\">\n            <ng-template [ngIf]=\"!hasMenuTemplate()\">\n                {{ displayItem(internalChooserModel) }}\n            </ng-template>\n            <ng-template [embeddedItem]=\"menuTemplate\" [item]=\"internalChooserModel\"\n                         *ngIf=\"hasMenuTemplate()\"></ng-template>\n        </ng-template>\n    </p-autoComplete>\n\n    <!--\n        Wrap whole selection with one extra element so we can move it around\n\n         see: selectionAppendTo\n    -->\n    <span #selectionView>\n        <div class=\"w-chooser-selections\"\n             *ngIf=\"multiselect && dataSource.state.recentSelectedObjects.length > 0\">\n\n        <ng-template [ngIf]=\"!hasSelectionTemplate()\">\n\n            <!-- no selection template render it as it is from CORE-->\n            <ul class=\"ui-autocomplete-multiple-container ui-widget ui-state-default \"\n                [ngClass]=\"{'ui-state-disabled':disabled,'ui-state-focus':autoCompleteComponent.focus}\">\n\n                <li #token *ngFor=\"let item of dataSource.state.recentSelectedObjects\"\n                    class=\"ui-autocomplete-token ui-state-highlight ui-corner-all\" tabindex=\"0\"\n                    (keyup.delete)=\"removeValue(item)\"\n                    (keyup.backspace)=\"removeValue(item)\">\n\t\t\t\t\t<span class=\"ui-autocomplete-token-icon sap-icon icon-decline\"\n                          (click)=\"removeValue(item)\"></span>\n                    <span class=\"ui-autocomplete-token-label\">{{ displayItem(item) }}</span>\n                </li>\n            </ul>\n        </ng-template>\n\n            <!--Yes there is selection template let's iterate and push each item to be rendered-->\n        <ng-template ngFor [ngForOf]=\"dataSource.state.recentSelectedObjects\" let-item>\n            <ng-template [embeddedItem]=\"selectionTemplate\" [item]=\"item\"\n                         *ngIf=\"hasSelectionTemplate()\"></ng-template>\n        </ng-template>\n\n        <ng-template [ngIf]=\"dataSource.showMoreSelected()\">\n\t\t\t<span class=\"more-selected\">\n\t\t\t\t<aw-hyperlink [size]=\"'small'\" (action)=\"dataSource.state.toggleAllSelected()\">\n\t\t\t\t\t{{moreSelectString()}}\n\t\t\t\t</aw-hyperlink>\n\t\t\t</span>\n        </ng-template>\n    </div>\n    </span>\n\n\n</div>\n\n",
                providers: [
                    CHOOSER_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => ChooserComponent) },
                    { provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders] }
                ],
                styles: ["/deep/ .ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-input,/deep/ .ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-multiple-container{width:100%}/deep/ .w-chooser .ui-autocomplete-multiple{line-height:normal}/deep/ .w-chooser .ui-autocomplete-input{width:100%}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button{right:0;position:absolute;border:0;width:30px;background:0 0}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button .pi{font-family:\"SAP icon fonts\";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button input{padding-right:30px}/deep/ .w-chooser .ui-autocomplete-input-token{padding:0;margin:0;vertical-align:baseline;width:inherit}/deep/ .w-chooser .ui-autocomplete-input-token .fa{font-family:\"SAP icon fonts\";color:#767676;cursor:pointer;font-size:1.2em}/deep/ .w-chooser .ui-autocomplete-input-token .fa-search:before{content:'\\e00d'}/deep/ .w-chooser .ui-autocomplete-input-token input{width:inherit;padding-right:25px}/deep/ .w-chooser .ui-autocomplete-input-token span{position:absolute;right:5px;top:0;padding-top:.6em}/deep/ .w-chooser .ui-autocomplete-dropdown{height:36px}/deep/ .w-chooser .ui-autocomplete-panel .ui-autocomplete-list-item{padding:.65em 2em .65em .64em;margin:0}/deep/ body .ui-autocomplete.ui-autocomplete-multiple .ui-autocomplete-multiple-container{padding:.4em .5em .4em 1em}.w-chooser-selections{margin-top:2px}.w-chooser-selections ul{margin:0;padding:0}.w-chooser-selections .ui-autocomplete-multiple-container{border:0}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token{font-size:.85em;letter-spacing:.1px;font-weight:400;padding:0;background:#e0f2ff;margin-right:5px;margin-bottom:5px}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token-label{padding:4px 21px 4px 5px}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token-icon{font-size:.78em;padding-right:.28em}.w-chooser-selections .ui-autocomplete-multiple-container .sap-icon{line-height:inherit}.w-chooser-selections .more-selected{display:inline-block}"]
            }] }
];
/** @nocollapse */
ChooserComponent.ctorParameters = () => [
    { type: Environment },
    { type: ElementRef },
    { type: ChooserDataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
ChooserComponent.propDecorators = {
    maxLength: [{ type: Input }],
    minLenForSearch: [{ type: Input }],
    valueTransformer: [{ type: Input }],
    multiselect: [{ type: Input }],
    dataSource: [{ type: Input }],
    selectionAppendTo: [{ type: Input }],
    delay: [{ type: Input }],
    destinationClass: [{ type: Input }],
    field: [{ type: Input }],
    onSelection: [{ type: Output }],
    menuTemplate: [{ type: ContentChild, args: ['menuItem',] }],
    selectionTemplate: [{ type: ContentChild, args: ['selectionItem',] }],
    autoCompleteComponent: [{ type: ViewChild, args: ['autoCompplete',] }],
    selectionViewElem: [{ type: ViewChild, args: ['selectionView',] }]
};
if (false) {
    /**
     * Max number of items return at single Match so we do not return 1000 items at single time.
     *
     * @type {?}
     */
    ChooserComponent.prototype.maxLength;
    /**
     * Max number of items return at single Match so we do not return 1000 items at single time.
     *
     * @type {?}
     */
    ChooserComponent.prototype.minLenForSearch;
    /**
     * Formatter used to format each selection and selected object for display.
     *
     * @type {?}
     */
    ChooserComponent.prototype.valueTransformer;
    /**
     * Is this multiselect
     *
     * @type {?}
     */
    ChooserComponent.prototype.multiselect;
    /**
     * By default ChooserDataSource will be created but there is a option to set
     * custom one on application level
     * @type {?}
     */
    ChooserComponent.prototype.dataSource;
    /**
     * In case we want to change the place where selection is rendered use this appendTo property
     * and it will use DOM operation appendChild() to move selectionView under different parent
     * @type {?}
     */
    ChooserComponent.prototype.selectionAppendTo;
    /** @type {?} */
    ChooserComponent.prototype.delay;
    /**
     * Target type to render. Data will be read from the registered DataProvider
     * @type {?}
     */
    ChooserComponent.prototype.destinationClass;
    /** @type {?} */
    ChooserComponent.prototype.field;
    /**
     * Event fired when user select a item
     * @type {?}
     */
    ChooserComponent.prototype.onSelection;
    /**
     * internal model to listen for Input value changes
     * @type {?}
     */
    ChooserComponent.prototype.internalChooserModel;
    /**
     * Embedded template defined by user. If user does not provide any template then when rendering
     * an item we assume we are dealing with primitive types and call on each item toString(), if
     * we are dealing with object, then we expect user to provide a template and tell the chooser
     * how items shoulds be handled or at least valueTransformer so we know how to convert this
     * value.
     *
     * Each object can provide its own toString implementation.
     *
     * @type {?}
     */
    ChooserComponent.prototype.menuTemplate;
    /** @type {?} */
    ChooserComponent.prototype.selectionTemplate;
    /** @type {?} */
    ChooserComponent.prototype.autoCompleteComponent;
    /** @type {?} */
    ChooserComponent.prototype.selectionViewElem;
    /**
     * When the selection is > max selection, then show hide link.
     * @type {?}
     */
    ChooserComponent.prototype.hideLink;
    /** @type {?} */
    ChooserComponent.prototype.env;
    /** @type {?} */
    ChooserComponent.prototype.elemementRef;
    /** @type {?} */
    ChooserComponent.prototype._defaultDS;
    /** @type {?} */
    ChooserComponent.prototype.parentContainer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jaG9vc2VyL2Nob29zZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUdILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsWUFBWSxFQUFFLHFCQUFxQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0ZwRSxhQUFhLDhCQUE4QixHQUFRO0lBQy9DLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFlRixNQUFNLHVCQUF3QixTQUFRLGlCQUFpQjs7Ozs7OztJQTJHbkQsWUFBbUIsR0FBZ0IsRUFBVSxZQUF3QixFQUM1QixVQUE2QixFQUVoRCxlQUFrQztRQUNwRCxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBSmIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBRWhELG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7eUJBdEdwQyxFQUFFOzs7OzsrQkFRSSxDQUFDOzs7OzsyQkFlSixJQUFJO3FCQW9CWCxHQUFHOzs7OzJCQWtCYyxJQUFJLFlBQVksRUFBRTtRQTRDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRTVCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1NBQy9COztRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO0tBQzFCOzs7O0lBRUQsUUFBUTtRQUNKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2RDtRQUVELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBR3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN4RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLHFCQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQzthQUN2RTtTQUNKO0tBQ0o7Ozs7Ozs7SUFPRCxlQUFlO1FBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQztTQUNWOztRQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDM0QsOEJBQThCLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN6QixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELFdBQVcsQ0FBQyxTQUFTLEdBQUcsc0NBQXNDLENBQUM7WUFDL0QsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QztRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN6RSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLFlBQVksVUFBVSxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUVsRSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNoRTtLQUNKOzs7Ozs7SUFNRCxrQkFBa0I7UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDO1NBQ1Y7O1FBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQ3pELHlDQUF5QyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQixDQUFDLENBQUM7U0FDTjtLQUNKOzs7Ozs7Ozs7OztJQVVELEtBQUssQ0FBQyxPQUFlOztRQUNqQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7UUFDM0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7UUFLdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDM0M7S0FDSjs7Ozs7Ozs7O0lBU0QsZUFBZSxDQUFDLEtBQVU7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7Ozs7Ozs7Ozs7O0lBVUQsVUFBVSxDQUFDLElBQVM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXJDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSztnQkFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNuRDtLQUNKOzs7Ozs7OztJQVFELFdBQVcsQ0FBQyxJQUFTO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUV0QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRy9DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzNDO0tBRUo7Ozs7Ozs7Ozs7SUFTRCxXQUFXLENBQUMsSUFBUztRQUNqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFekMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBRXRDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FFMUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDMUI7S0FDSjs7Ozs7Ozs7SUFRRCxnQkFBZ0I7O1FBQ1osSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTTtZQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDYjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4QjtRQUNELE1BQU0sQ0FBQyxHQUFHLFlBQVksbUJBQW1CLENBQUM7S0FDN0M7Ozs7Ozs7SUFRRCxtQkFBbUI7UUFDZixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO2VBQ3RFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0tBQ3pDOzs7O0lBRUQsZUFBZTtRQUNYLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3ZDOzs7O0lBR0Qsb0JBQW9CO1FBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDNUM7Ozs7Ozs7Ozs7O0lBV0QsVUFBVSxDQUFDLEtBQVU7UUFDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7U0FDVjtRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO1FBQUMsSUFBSSxDQUFDLENBQUM7O1lBQ0osSUFBSSxRQUFRLEdBQTBCLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztZQUNsRixJQUFJLE9BQU8sR0FBaUIsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDNUI7Ozs7O0lBRUQsY0FBYyxDQUFDLFlBQTJCO1FBQ3RDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQ25DLDJEQUEyRCxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxRQUFRO1lBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSztZQUNyQixLQUFLLEVBQUUsWUFBWTtZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDaEMsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7O0lBUU8saUJBQWlCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3ZFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdEU7UUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN4RDs7OztZQXRaUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLG9pR0FBcUM7Z0JBRXJDLFNBQVMsRUFBRTtvQkFDUCw4QkFBOEI7b0JBQzlCLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBQztvQkFDN0UsRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLEVBQUM7aUJBQzFGOzthQUdKOzs7O1lBdkhlLFdBQVc7WUFidkIsVUFBVTtZQWdCTixpQkFBaUIsdUJBaU9SLE1BQU0sU0FBQyxXQUFXO1lBbk8zQixpQkFBaUIsdUJBb09SLFFBQVEsWUFBSSxRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs7O3dCQXRHOUUsS0FBSzs4QkFRTCxLQUFLOytCQVFMLEtBQUs7MEJBT0wsS0FBSzt5QkFRTCxLQUFLO2dDQVFMLEtBQUs7b0JBSUwsS0FBSzsrQkFPTCxLQUFLO29CQUlMLEtBQUs7MEJBT0wsTUFBTTsyQkFvQk4sWUFBWSxTQUFDLFVBQVU7Z0NBSXZCLFlBQVksU0FBQyxlQUFlO29DQUc1QixTQUFTLFNBQUMsZUFBZTtnQ0FHekIsU0FBUyxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0F1dG9Db21wbGV0ZX0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0RBVEFfU09VUkNFfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtDaG9vc2VyRGF0YVNvdXJjZX0gZnJvbSAnLi9jaG9vc2VyLWRhdGEtc291cmNlJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RGF0YUZpbmRlcnMsIFF1ZXJ5VHlwZX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0Nob29zZXJTdGF0ZSwgRGVmYXVsdFNlbGVjdGlvblN0YXRlfSBmcm9tICcuL2Nob29zZXItc3RhdGUnO1xuXG5cbi8qKlxuICogVHlwZWFoZWFkIGNob29zZXIgdGhhdCBzdXBwb3J0cyBib3RoIHNpbmdsZSBhbmQgbXVsdGktc2VsZWN0LiBOb3QgbGlrZSBEcm9wZG93biwgdGhpcyBjaG9vc2VyXG4gKiByZXF1aXJlcyBsaXR0bGUgYml0IGRpZmZlcmVudCBzZXR1cC4gSXQgcmVxdWlyZXMgYXQgbWluaW11bSBASW5wdXQgZGF0YVNvdXJjZSBvclxuICogZGVzdGluYXRpb25DbGFzc1xuICpcbiAqXG4gKiBCeSBkZWZhdWx0IGNob29zZXIgaXMgbXVsdGktc2VsZWN0LiBJZiB5b3Ugd2FudCBzaW5nbGUgc2VsZWN0IHRoZW4geW91IG11c3QgcHJvdmlkZSBtdWx0aS1zZWxlY3RcbiAqIHdpdGggQElucHV0LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogSW4gc2ltcGxlIHNjZW5hcmlvIHlvdSBjYW4gdXNlIENob29zZXIgbGlrZSBzbzpcbiAqXG4gKlxuICogYGBgXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiAnY2hvb3Nlci1hcHAnICxcbiAqICAgICAgdGVtcGxhdGU6IGA8YXctY2hvb3NlciAgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiBuYW1lPVwiY29sb3JcIidcbiAqICAgICAgICAgICAgICAgICAgICAgIFtkYXRhU291cmNlXT1cImRzXCI+PC9hdy1jaG9vc2VyPmBcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBNeUNob29zZXJBcHBcbiAqICB7XG4gKlxuICogICAgICBkczogQ2hvb3NlckRhdGFTb3VyY2U7XG4gKlxuICogICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YTogRGF0YVByb3ZpZGVycywgcHJpdmF0ZSBmaW5kZXJzOiBEYXRhRmluZGVycyl7XG4gKiAgICAgICAgICB0aGlzLmRzID0gbmV3IENob29zZXJEYXRhU291cmNlKHRoaXMuZGF0YSwgdGhpcy5maW5kZXJzKTtcbiAqXG4gKiAgICAgICB0aGlzLmRzLmluaXQoe1xuICogICAgICAgICAgIG9iajogWydibHVlJywgJ3JlZCcsICd5ZWxsb3cnXSwgcXVlcnlUeXBlOiBRdWVyeVR5cGUuRnVsbFRleHQsIHN0YXRlOiBudWxsLFxuICogICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZVxuICogICAgICAgfSk7XG4gKlxuICogICAgIH1cbiAqICB9XG4gKlxuICogYGBgYFxuICogIEFib3ZlIGV4YW1wbGUgd2lsbCB1c2UgcHJvdmlkZWQgZGF0YVNvdXJjZSBhbmQgcmVuZGVyIG11bHRpLXNlbGVjdCBjaG9vc2VyLiBXaXRoIGRlZmF1bHRcbiAqICBpbXBsZW1lbnRhdGlvbiAgc2VsZWN0ZWQgdmFsdWVzIHdpbGwgYXBwZWFyIGFzIGEgdGFncyB1bmRlciB0aGUgaW5wdXQgYm94XG4gKlxuICpcbiAqXG4gKiAqICMjIyBFeGFtcGxlXG4gKlxuICogIEluIHRoaXMgZXhhbXBsZSB3ZSBwcm92aWRlIGN1c3RvbSB0ZW1wbGF0ZSB0byBjaGFuZ2UgdGhlIHdheSBob3cgY2hvb3NlcidzIE1lbnVJdGVtIGFyZVxuICogICAgIHJlbmRlcmVkIGFzIHdlbGwgYXMgdGVtcGxhdGUgZm9yIHRoZSBzZWxlY3Rpb24gaXRlbSBsb29rcyBsaWtlXG4gKlxuICogYGBgXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiAnY2hvb3Nlci1hcHAnICxcbiAqICAgICAgdGVtcGxhdGU6IGA8YXctY2hvb3NlciAgbmFtZT1cImNvbW1vZGl0eVwiJyBbZGF0YVNvdXJjZV09XCJkc1wiPlxuICpcbiAqICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbWVudUl0ZW0gbGV0LWl0ZW0+XG4gKiAgICAgICAgICAgICBcdDxzcGFuPlxuICogICAgICAgICAgICAgXHRcdDxpIGNsYXNzPVwiZmEgZmEtZW52aXJhIFwiID48L2k+XG4gKiAgICAgICAgICAgICBcdFx0e3tpdGVtfX1cbiAqICAgICAgICAgICAgIFx0PC9zcGFuPlxuICpcbiAqICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICogICAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3Rpb25JdGVtIGxldC1pdGVtPlxuICogICAgICAgICAgICAgXHQ8c3BhbiBjbGFzcz1cInRhZyB0YWctY2lyY2xlXCI+XG4gKiAgICAgICAgICAgICBcdFx0aXRlbToge3tpdGVtIH19XG4gKiAgICAgICAgICAgICBcdFx0PGkgY2xhc3M9XCJmYSBmYS1jbG9zZVwiIChjbGljayk9XCJjaG9vc2VyLnJlbW92ZVZhbHVlKGl0ZW0pXCI+PC9pPlxuICogICAgICAgICAgICAgXHQ8L3NwYW4+XG4gKlxuICpcbiAqICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICpcbiAqICAgICAgICAgIDwvYXctY2hvb3Nlcj5cbiAqICAgICAgYFxuICogICAgICBzdHlsZTogW2BcbiAqICAgICAgICAgICAgICAudGFnLWNpcmNsZSB7XG4gKiAgICAgICAgICAgICAgXHRib3JkZXItcmFkaXVzOiA2cmVtO1xuICogICAgICAgICAgICAgIFx0aGVpZ2h0OiA3cmVtO1xuICogICAgICAgICAgICAgIFx0Y29sb3I6ICNlOGVlZjE7XG4gKiAgICAgICAgICAgICAgXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUzLCA1NiwgNTgsIDAuNjcpO1xuICogICAgICAgICAgICAgIFx0bGluZS1oZWlnaHQ6IDZyZW07XG4gKiAgICAgICAgICAgICAgfVxuICogICAgICBgXVxuICogIH0pXG4gKlxuICogYGBgYFxuICpcbiAqICBJbiBhYm92ZSBleGFtcGxlIHdlIGNoYW5nZSBob3cgdGhlIGNob29zZXIncyBtZW51IGl0ZW0gbG9vayBsaWtlIGFzIHdlbGwgYXMgd2UgZGVmaW5lIGN1c3RvbVxuICogICAgIHRlbXBsYXRlIGZvciBzZWxlY3Rpb24gaXRlbSB0byB0dXJuIGFsbCBzZWxlY3Rpb24gdG8gY2lyY2xlcyB3aXRoIHRleHQgaW4gdGhlIG1pZGRsZS5cbiAqXG4gKlxuICpcbiAqL1xuXG5leHBvcnQgY29uc3QgQ0hPT1NFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hvb3NlckNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1jaG9vc2VyJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2Nob29zZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjaG9vc2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENIT09TRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaG9vc2VyQ29tcG9uZW50KX0sXG4gICAgICAgIHtwcm92aWRlOiBEQVRBX1NPVVJDRSwgdXNlQ2xhc3M6IENob29zZXJEYXRhU291cmNlLCBkZXBzOiBbRGF0YVByb3ZpZGVycywgRGF0YUZpbmRlcnNdfVxuICAgIF1cblxuXG59KVxuZXhwb3J0IGNsYXNzIENob29zZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBNYXggbnVtYmVyIG9mIGl0ZW1zIHJldHVybiBhdCBzaW5nbGUgTWF0Y2ggc28gd2UgZG8gbm90IHJldHVybiAxMDAwIGl0ZW1zIGF0IHNpbmdsZSB0aW1lLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtYXhMZW5ndGg6IG51bWJlciA9IDEwO1xuXG5cbiAgICAvKipcbiAgICAgKiBNYXggbnVtYmVyIG9mIGl0ZW1zIHJldHVybiBhdCBzaW5nbGUgTWF0Y2ggc28gd2UgZG8gbm90IHJldHVybiAxMDAwIGl0ZW1zIGF0IHNpbmdsZSB0aW1lLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtaW5MZW5Gb3JTZWFyY2g6IG51bWJlciA9IDE7XG5cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdHRlciB1c2VkIHRvIGZvcm1hdCBlYWNoIHNlbGVjdGlvbiBhbmQgc2VsZWN0ZWQgb2JqZWN0IGZvciBkaXNwbGF5LlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZVRyYW5zZm9ybWVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSXMgdGhpcyBtdWx0aXNlbGVjdFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtdWx0aXNlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIEJ5IGRlZmF1bHQgQ2hvb3NlckRhdGFTb3VyY2Ugd2lsbCBiZSBjcmVhdGVkIGJ1dCB0aGVyZSBpcyBhIG9wdGlvbiB0byBzZXRcbiAgICAgKiBjdXN0b20gb25lIG9uIGFwcGxpY2F0aW9uIGxldmVsXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkYXRhU291cmNlOiBDaG9vc2VyRGF0YVNvdXJjZTtcblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSB3ZSB3YW50IHRvIGNoYW5nZSB0aGUgcGxhY2Ugd2hlcmUgc2VsZWN0aW9uIGlzIHJlbmRlcmVkIHVzZSB0aGlzIGFwcGVuZFRvIHByb3BlcnR5XG4gICAgICogYW5kIGl0IHdpbGwgdXNlIERPTSBvcGVyYXRpb24gYXBwZW5kQ2hpbGQoKSB0byBtb3ZlIHNlbGVjdGlvblZpZXcgdW5kZXIgZGlmZmVyZW50IHBhcmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uQXBwZW5kVG86IEVsZW1lbnRSZWY7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgZGVsYXk6IG51bWJlciA9IDMwMDtcblxuXG4gICAgLyoqXG4gICAgICogVGFyZ2V0IHR5cGUgdG8gcmVuZGVyLiBEYXRhIHdpbGwgYmUgcmVhZCBmcm9tIHRoZSByZWdpc3RlcmVkIERhdGFQcm92aWRlclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGVzdGluYXRpb25DbGFzczogc3RyaW5nO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGZpZWxkOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3QgYSBpdGVtXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25TZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCBtb2RlbCB0byBsaXN0ZW4gZm9yIElucHV0IHZhbHVlIGNoYW5nZXNcbiAgICAgKi9cbiAgICBpbnRlcm5hbENob29zZXJNb2RlbDogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBFbWJlZGRlZCB0ZW1wbGF0ZSBkZWZpbmVkIGJ5IHVzZXIuIElmIHVzZXIgZG9lcyBub3QgcHJvdmlkZSBhbnkgdGVtcGxhdGUgdGhlbiB3aGVuIHJlbmRlcmluZ1xuICAgICAqIGFuIGl0ZW0gd2UgYXNzdW1lIHdlIGFyZSBkZWFsaW5nIHdpdGggcHJpbWl0aXZlIHR5cGVzIGFuZCBjYWxsIG9uIGVhY2ggaXRlbSB0b1N0cmluZygpLCBpZlxuICAgICAqIHdlIGFyZSBkZWFsaW5nIHdpdGggb2JqZWN0LCB0aGVuIHdlIGV4cGVjdCB1c2VyIHRvIHByb3ZpZGUgYSB0ZW1wbGF0ZSBhbmQgdGVsbCB0aGUgY2hvb3NlclxuICAgICAqIGhvdyBpdGVtcyBzaG91bGRzIGJlIGhhbmRsZWQgb3IgYXQgbGVhc3QgdmFsdWVUcmFuc2Zvcm1lciBzbyB3ZSBrbm93IGhvdyB0byBjb252ZXJ0IHRoaXNcbiAgICAgKiB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEVhY2ggb2JqZWN0IGNhbiBwcm92aWRlIGl0cyBvd24gdG9TdHJpbmcgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdtZW51SXRlbScpXG4gICAgbWVudVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICBAQ29udGVudENoaWxkKCdzZWxlY3Rpb25JdGVtJylcbiAgICBzZWxlY3Rpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2F1dG9Db21wcGxldGUnKVxuICAgIGF1dG9Db21wbGV0ZUNvbXBvbmVudDogQXV0b0NvbXBsZXRlO1xuXG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0aW9uVmlldycpXG4gICAgc2VsZWN0aW9uVmlld0VsZW06IEVsZW1lbnRSZWY7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIHNlbGVjdGlvbiBpcyA+IG1heCBzZWxlY3Rpb24sIHRoZW4gc2hvdyBoaWRlIGxpbmsuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlTGluazogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHByaXZhdGUgZWxlbWVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoREFUQV9TT1VSQ0UpIHByaXZhdGUgX2RlZmF1bHREUzogQ2hvb3NlckRhdGFTb3VyY2UsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEJhc2VGb3JtQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudCkge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5wbGFjZUhvbGRlcikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMucGxhY2VIb2xkZXIgPSBpMThuLmluc3RhbnQoJ1dpZGdldHMuY2hvb3Nlci5wbGFjZUhvbGRlcicpO1xuICAgICAgICAgICAgdGhpcy5wbGFjZUhvbGRlciA9ICdTZWFyY2gnO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuaGlkZUxpbmsgPSBpMThuLmluc3RhbnQoJ1dpZGdldHMuY2hvb3Nlci5oaWRlU2VsZWN0aW9uJyk7XG4gICAgICAgIHRoaXMuaGlkZUxpbmsgPSAnSGlkZSc7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5kYXRhU291cmNlKSkge1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLl9kZWZhdWx0RFM7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZm9ybUNvbnRyb2wpICYmIGlzUHJlc2VudCh0aGlzLmZvcm1Db250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnVwZGF0ZVZhbHVlKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SW50ZXJuYWxNb2RlbCgpO1xuXG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IDxGb3JtQ29udHJvbD4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBTZWFyY2ggaWNvbiBpbiBjYXNlIG9mIG11bHRpc2VsZWN0LlxuICAgICAqIHRvZG86IE9uY2UgUHJpbWVORyB3aWxsIHByb3ZpZGUgYSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBkZWZhdWx0IGJlaGF2aW9yIHJlbW92ZSBpdFxuICAgICAqXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlYXJjaElucHV0ID0gdGhpcy5lbGVtZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy51aS1hdXRvY29tcGxldGUtaW5wdXQtdG9rZW4nKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHNlYXJjaElucHV0KSkge1xuICAgICAgICAgICAgbGV0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ3NlYXJjaC1pY29uLXJpZ2h0IGZhIGZhLWZ3IGZhLXNlYXJjaCc7XG4gICAgICAgICAgICBzZWFyY2hJbnB1dC5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2VsZWN0aW9uQXBwZW5kVG8pICYmIGlzUHJlc2VudCh0aGlzLnNlbGVjdGlvblZpZXdFbGVtKSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudEVsZW0gPSB0aGlzLnNlbGVjdGlvbkFwcGVuZFRvIGluc3RhbmNlb2YgRWxlbWVudFJlZiA/XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25BcHBlbmRUby5uYXRpdmVFbGVtZW50IDogdGhpcy5zZWxlY3Rpb25BcHBlbmRUbztcblxuICAgICAgICAgICAgcGFyZW50RWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNlbGVjdGlvblZpZXdFbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmVlZCB0byBjaGFuZ2UgY3VycmVudCBiZWhhdmlvciBzaW5jZSB3ZSB3YW50IHRvIHNob3cgc2VsZWN0aW9uIHVuZGVyIHRoZSBjaG9vc2VyLiBLXG4gICAgICpcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhU291cmNlLnN0YXRlLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG9rZW5zID0gdGhpcy5lbGVtZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgJy51aS1hdXRvY29tcGxldGUgLnVpLWF1dG9jb21wbGV0ZS10b2tlbicpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRva2VucykgJiYgdG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRva2Vucy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gdmFsdWUgaXMgZW50ZXJlZCBpbnRvIHNlYXJjaCBib3gsIHdlIGFzayBvdXIgRGF0YVNvdXJjZSB0byBtYXRjaCB0aGlzIHBhdHRlcm5cbiAgICAgKiBhZ2FpbnN0IGRhdGEgcmVwb3NpdG9yeS4gSXQgd2lsbCByZXRyaWV2ZSBhbGwgcG9zc2libGUgbWF0Y2hlcyBsaW1pdGVkIGJ5IE1heExlbiBhbmQgdGhpc1xuICAgICAqIGlzIGFnYWluIGZpbHRlcmVkIHNvIGl0IGRvZXMgbm90IGluY2x1ZGUgYWxyZWFkeSBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKlxuICAgICAqICB0aGUgbWF0Y2hlZCByZXN1bHRlZCBpcyBzYXZlZCBpbiB0aGU6IHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5tYXRjaGVzXG4gICAgICovXG4gICAgbWF0Y2gocGF0dGVybjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBtYXhMZW4gPSB0aGlzLm1heExlbmd0aCA/IHRoaXMubWF4TGVuZ3RoIDogQ2hvb3NlckRhdGFTb3VyY2UuTWF4TGVuZ3RoO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmluZChwYXR0ZXJuLCBtYXhMZW4pO1xuXG5cbiAgICAgICAgLy8gZml4OiBmb3IgdGVzdHM6IEluIHZlcnNpb24gNCB3ZSBuZWVkIHRvIGV4cGxpY2l0bHkgZm9jdXMgaW5wdXQgb3RoZXJ3aXNlIGF1dG9jb21wbGV0ZVxuICAgICAgICAvLyBkb2Vzbid0IGdpdmUgdXMgYW55IHBvcHVwIHBhbmVsXG4gICAgICAgIGlmICh0aGlzLmVudi5pblRlc3QgJiYgaXNQcmVzZW50KHRoaXMuYXV0b0NvbXBsZXRlQ29tcG9uZW50KSkge1xuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVDb21wb25lbnQuZm9jdXNJbnB1dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEludm9rZWQgYnkgRHJvcGRvd24gYnV0dG9uIGluIGNhc2Ugb2Ygc2luZ2xlIHNlbGVjdCBhbmQgaGVyZSB3ZSB3YW50IHRvIGludm9rZSBtYXRjaFxuICAgICAqIHRvIHJldHJpZXZlIGFsbCBzdWdnZXN0aW9ucyB3aXRob3V0IGFueSBmaWx0ZXJcbiAgICAgKlxuICAgICAqL1xuICAgIG9uRHJvcGRvd25DbGljayhldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMubWF0Y2goJyonKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1hdGNoKCcqJyk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaG9vc2VyIHN0YXRlIGlzIHVwZGF0ZWQgIHdpdGggdXNlciBzZWxlY3Rpb24uIFBsZWFzZSBzZWUgd3JpdGVWYWx1ZS4gV2hlbiBkbyBub3QgbmVlZFxuICAgICAqIGNhbGwgYW55dGhpbmcgYWRkaXRpb25hbCBhcyBpbnRlcm5hbENob29zZXJNb2RlbCBhbmQgdGhpcy5jaG9vc2VyU3RhdGUuc2VsZWN0ZWRPYmplY3RzKClcbiAgICAgKiBzaGFyZXMgdGhlIHNhbWUgcmVmZXJlbmNlcyBzbyBpdHMgaW1wb3J0YW50IHRoYXQgd2UgZmlyc3Qgc2F2ZSByZWZlcmVuY2UgdG9cbiAgICAgKiB0aGlzLmNob29zZXJTdGF0ZS5zZWxlY3RlZE9iamVjdHMoKSBhbmQgdGhlbiBiYWNrIHRvIGludGVybmFsQ2hvb3Nlck1vZGVsXG4gICAgICpcbiAgICAgKi9cbiAgICBzZWxlY3RJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQodGhpcy5pbnRlcm5hbENob29zZXJNb2RlbCk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5pbnRlcm5hbENob29zZXJNb2RlbCwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5hZGRNb2RlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUudXBkYXRlZFNlbGVjdGVkT2JqZWN0cyhpdGVtKTtcblxuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuYWRkTW9kZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlQ29tcG9uZW50LmlucHV0RUwubmF0aXZlRWxlbWVudC52YWx1ZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbSh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVbnNlbGVjdCBpdGVtXG4gICAgICpcbiAgICAgKi9cbiAgICByZW1vdmVWYWx1ZShpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnN0YXRlLmFkZE1vZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUudXBkYXRlZFNlbGVjdGVkT2JqZWN0cyhpdGVtKTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnN0YXRlLmFkZE1vZGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsID0gdGhpcy5kYXRhU291cmNlLnN0YXRlLnNlbGVjdGVkT2JqZWN0cygpO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XG5cbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcblxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5hdXRvQ29tcGxldGVDb21wb25lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZUNvbXBvbmVudC5mb2N1c0lucHV0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ29udmVydCBhIG9iamVjdCBpZiBhbnkgaW50byB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAgICpcbiAgICAgKiB0b2RvOiBpbXBsZW1lbnQgYmV0dGVyIHdheSBob3cgdG8gd29yayB3aXRoIG9iamVjdHNcbiAgICAgKlxuICAgICAqL1xuICAgIGRpc3BsYXlJdGVtKGl0ZW06IGFueSkge1xuICAgICAgICBpZiAoaXNCbGFuayhpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnN0YXRlLmN1cnJlbnRJdGVtID0gaXRlbTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMudmFsdWVUcmFuc2Zvcm1lcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlVHJhbnNmb3JtZXIoaXRlbSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5kYXRhU291cmNlLmxvb2t1cEtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtW3RoaXMuZGF0YVNvdXJjZS5sb29rdXBLZXldO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGEgbGFiZWwgdGhhdCBpcyBzaG93biB1bmRlciB0aGUgc2VsZWN0ZWQgaXRlbSB3aGVuIHVzZXIgc2VsZWN0aW9uIGlzID5cbiAgICAgKiBNYXhSZWNlbnRTZWxlY3RlZFxuICAgICAqXG4gICAgICovXG4gICAgbW9yZVNlbGVjdFN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbW9yZVNlbGVjdGVkID0gdGhpcy5kYXRhU291cmNlLnN0YXRlLnNlbGVjdGVkT2JqZWN0cygpLmxlbmd0aCAtXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUucmVjZW50U2VsZWN0ZWREaXNwbGF5ZWQ7XG4gICAgICAgIGlmIChtb3JlU2VsZWN0ZWQgPCAyICYmICF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVMaW5rO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHttb3JlU2VsZWN0ZWR9IG1vcmUgc2VsZWN0ZWQuLi5gO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSBvZiBtdWx0aXNlbGVjdCA9IGZhbHNlIGNoZWNrIGlmIHdlIHdhbnQgdG8gc2hvdyBhIHNlbGVjdGVkIHZhbHVlIGluc2lkZSB0aGUgaW5wdXRcbiAgICAgKiBmaWVsZFxuICAgICAqXG4gICAgICovXG4gICAgc2luZ2xlVmFsdWVTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUgJiYgaXNQcmVzZW50KHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5jdXJyZW50SXRlbSlcbiAgICAgICAgICAgICYmICF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuYWRkTW9kZTtcbiAgICB9XG5cbiAgICBoYXNNZW51VGVtcGxhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5tZW51VGVtcGxhdGUpO1xuICAgIH1cblxuXG4gICAgaGFzU2VsZWN0aW9uVGVtcGxhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5zZWxlY3Rpb25UZW1wbGF0ZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqIEFzIHdlIGFyZSB1c2luZyBEYXRhU291cmNlIGludGVybmFsbHkgZm9yIFsobmdNb2RlbCldIGNhc2Ugd2UgbmVlZCB0byBkZWZmZXIgRGF0YVNvdXJjZVxuICAgICAqIGluaXRpYWxpemF0aW9uIG9uY2Ugd2UgaGF2ZSBhIHZhbHVlIGFuZCB3ZSBvbmx5IGFjY2VwdCBbXVxuICAgICAqXG4gICAgICpcbiAgICAgKiA/IFNob3VsZCB3ZSBkbyBzb21lIGRlZXBlciBjb21wYXJpc2lvbj9cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGF0YVNvdXJjZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS51cGRhdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsU3RhdGU6IERlZmF1bHRTZWxlY3Rpb25TdGF0ZSA9IG5ldyBEZWZhdWx0U2VsZWN0aW9uU3RhdGUodGhpcy5tdWx0aXNlbGVjdCk7XG4gICAgICAgICAgICBsZXQgY2hTdGF0ZTogQ2hvb3NlclN0YXRlID0gbmV3IENob29zZXJTdGF0ZShzZWxTdGF0ZSwgdGhpcy5tdWx0aXNlbGVjdCk7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKGNoU3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UudXBkYXRlVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SW50ZXJuYWxNb2RlbCgpO1xuICAgIH1cblxuICAgIGluaXREYXRhc291cmNlKGNob29zZXJTdGF0ZT86IENob29zZXJTdGF0ZSk6IHZvaWQge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuZGVzdGluYXRpb25DbGFzcyksXG4gICAgICAgICAgICAnWW91IG5lZWQgdG8gcHJvdmlkZSBkZXN0aW5hdGlvbkNsYXNzIG9yIGN1c3RvbSBEYXRhU291cmNlJyk7XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmluaXQoe1xuICAgICAgICAgICAgb2JqOiB0aGlzLmRlc3RpbmF0aW9uQ2xhc3MsXG4gICAgICAgICAgICBxdWVyeVR5cGU6IFF1ZXJ5VHlwZS5GdWxsVGV4dCxcbiAgICAgICAgICAgIGxvb2t1cEtleTogdGhpcy5maWVsZCxcbiAgICAgICAgICAgIHN0YXRlOiBjaG9vc2VyU3RhdGUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdGhpcy5tdWx0aXNlbGVjdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgYnkgbmdPbkluaXQgYW5kIFdyaXRlIHZhbHVlIHRvIHJlYWQgc3RhdGUgZnJvbSBDaG9vc2VyU3RhdGUgYW5kIHNldCBpdCB0byBpbnRlcm5hbFxuICAgICAqIG5nTW9kZWwgcHJvcGVydHlcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdEludGVybmFsTW9kZWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2Uuc3RhdGUubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwgPSB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2VsZWN0ZWRPYmplY3RzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsID0gdGhpcy5kYXRhU291cmNlLnN0YXRlLnNlbGVjdGVkT2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZvcm1Db250cm9sKSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==