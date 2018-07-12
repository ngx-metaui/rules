/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
/**
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
 */
export var /** @type {?} */ CHOOSER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ChooserComponent; }),
    multi: true
};
var ChooserComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ChooserComponent, _super);
    function ChooserComponent(env, elemementRef, _defaultDS, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this.elemementRef = elemementRef;
        _this._defaultDS = _defaultDS;
        _this.parentContainer = parentContainer;
        /**
         * Max number of items return at single Match so we do not return 1000 items at single time.
         *
         */
        _this.maxLength = 10;
        /**
         * Max number of items return at single Match so we do not return 1000 items at single time.
         *
         */
        _this.minLenForSearch = 1;
        /**
         * Is this multiselect
         *
         */
        _this.multiselect = true;
        _this.delay = 300;
        /**
         * Event fired when user select a item
         */
        _this.onSelection = new EventEmitter();
        if (isBlank(_this.placeHolder)) {
            // this.placeHolder = i18n.instant('Widgets.chooser.placeHolder');
            // this.placeHolder = i18n.instant('Widgets.chooser.placeHolder');
            _this.placeHolder = 'Search';
        }
        // this.hideLink = i18n.instant('Widgets.chooser.hideSelection');
        // this.hideLink = i18n.instant('Widgets.chooser.hideSelection');
        _this.hideLink = 'Hide';
        return _this;
    }
    /**
     * @return {?}
     */
    ChooserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (isBlank(this.dataSource)) {
            this.dataSource = this._defaultDS;
            this.initDatasource();
        }
        if (isPresent(this.formControl) && isPresent(this.formControl.value)) {
            this.dataSource.updateValue(this.formControl.value);
        }
        this.initInternalModel();
        if (this.isStandalone) {
            _super.prototype.registerFormControl.call(this, this.internalChooserModel);
        }
        else {
            if (isPresent(this.name)) {
                this.formControl = /** @type {?} */ (this.formGroup.controls[this.name]);
            }
        }
    };
    /**
     * Add Search icon in case of multiselect.
     * todo: Once PrimeNG will provide a template to override default behavior remove it
     *
     */
    /**
     * Add Search icon in case of multiselect.
     * todo: Once PrimeNG will provide a template to override default behavior remove it
     *
     * @return {?}
     */
    ChooserComponent.prototype.ngAfterViewInit = /**
     * Add Search icon in case of multiselect.
     * todo: Once PrimeNG will provide a template to override default behavior remove it
     *
     * @return {?}
     */
    function () {
        if (!this.dataSource.state.multiselect) {
            return;
        }
        var /** @type {?} */ searchInput = this.elemementRef.nativeElement.querySelector('.ui-autocomplete-input-token');
        if (isPresent(searchInput)) {
            var /** @type {?} */ iconElement = document.createElement('span');
            iconElement.className = 'search-icon-right fa fa-fw fa-search';
            searchInput.appendChild(iconElement);
        }
        if (isPresent(this.selectionAppendTo) && isPresent(this.selectionViewElem)) {
            var /** @type {?} */ parentElem = this.selectionAppendTo instanceof ElementRef ?
                this.selectionAppendTo.nativeElement : this.selectionAppendTo;
            parentElem.appendChild(this.selectionViewElem.nativeElement);
        }
    };
    /**
     * Need to change current behavior since we want to show selection under the chooser. K
     *
     */
    /**
     * Need to change current behavior since we want to show selection under the chooser. K
     *
     * @return {?}
     */
    ChooserComponent.prototype.ngAfterViewChecked = /**
     * Need to change current behavior since we want to show selection under the chooser. K
     *
     * @return {?}
     */
    function () {
        if (!this.dataSource.state.multiselect) {
            return;
        }
        var /** @type {?} */ tokens = this.elemementRef.nativeElement.querySelectorAll('.ui-autocomplete .ui-autocomplete-token');
        if (isPresent(tokens) && tokens.length > 0) {
            tokens.forEach(function (item) {
                item.remove();
            });
        }
    };
    /**
     *
     * When value is entered into search box, we ask our DataSource to match this pattern
     * against data repository. It will retrieve all possible matches limited by MaxLen and this
     * is again filtered so it does not include already selected items.
     *
     *  the matched resulted is saved in the: this.dataSource.state.matches
     */
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
    ChooserComponent.prototype.match = /**
     *
     * When value is entered into search box, we ask our DataSource to match this pattern
     * against data repository. It will retrieve all possible matches limited by MaxLen and this
     * is again filtered so it does not include already selected items.
     *
     *  the matched resulted is saved in the: this.dataSource.state.matches
     * @param {?} pattern
     * @return {?}
     */
    function (pattern) {
        var /** @type {?} */ maxLen = this.maxLength ? this.maxLength : ChooserDataSource.MaxLength;
        this.dataSource.find(pattern, maxLen);
        // fix: for tests: In version 4 we need to explicitly focus input otherwise autocomplete
        // doesn't give us any popup panel
        if (this.env.inTest && isPresent(this.autoCompleteComponent)) {
            this.autoCompleteComponent.focusInput();
        }
    };
    /**
     *
     * Invoked by Dropdown button in case of single select and here we want to invoke match
     * to retrieve all suggestions without any filter
     *
     */
    /**
     *
     * Invoked by Dropdown button in case of single select and here we want to invoke match
     * to retrieve all suggestions without any filter
     *
     * @param {?} event
     * @return {?}
     */
    ChooserComponent.prototype.onDropdownClick = /**
     *
     * Invoked by Dropdown button in case of single select and here we want to invoke match
     * to retrieve all suggestions without any filter
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.match('*');
        setTimeout(function () {
            _this.match('*');
        }, 100);
    };
    /**
     *
     * Chooser state is updated  with user selection. Please see writeValue. When do not need
     * call anything additional as internalChooserModel and this.chooserState.selectedObjects()
     * shares the same references so its important that we first save reference to
     * this.chooserState.selectedObjects() and then back to internalChooserModel
     *
     */
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
    ChooserComponent.prototype.selectItem = /**
     *
     * Chooser state is updated  with user selection. Please see writeValue. When do not need
     * call anything additional as internalChooserModel and this.chooserState.selectedObjects()
     * shares the same references so its important that we first save reference to
     * this.chooserState.selectedObjects() and then back to internalChooserModel
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
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
    };
    /**
     *
     * Unselect item
     *
     */
    /**
     *
     * Unselect item
     *
     * @param {?} item
     * @return {?}
     */
    ChooserComponent.prototype.removeValue = /**
     *
     * Unselect item
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
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
    };
    /**
     *
     * Convert a object if any into the string representation
     *
     * todo: implement better way how to work with objects
     *
     */
    /**
     *
     * Convert a object if any into the string representation
     *
     * todo: implement better way how to work with objects
     *
     * @param {?} item
     * @return {?}
     */
    ChooserComponent.prototype.displayItem = /**
     *
     * Convert a object if any into the string representation
     *
     * todo: implement better way how to work with objects
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
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
    };
    /**
     *
     * Returns a label that is shown under the selected item when user selection is >
     * MaxRecentSelected
     *
     */
    /**
     *
     * Returns a label that is shown under the selected item when user selection is >
     * MaxRecentSelected
     *
     * @return {?}
     */
    ChooserComponent.prototype.moreSelectString = /**
     *
     * Returns a label that is shown under the selected item when user selection is >
     * MaxRecentSelected
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ moreSelected = this.dataSource.state.selectedObjects().length -
            this.dataSource.state.recentSelectedDisplayed;
        if (moreSelected < 2 && !this.dataSource.state.showAllRecentlySelected) {
            return '';
        }
        if (this.dataSource.state.showAllRecentlySelected) {
            return this.hideLink;
        }
        return moreSelected + " more selected...";
    };
    /**
     * In case of multiselect = false check if we want to show a selected value inside the input
     * field
     *
     */
    /**
     * In case of multiselect = false check if we want to show a selected value inside the input
     * field
     *
     * @return {?}
     */
    ChooserComponent.prototype.singleValueSelected = /**
     * In case of multiselect = false check if we want to show a selected value inside the input
     * field
     *
     * @return {?}
     */
    function () {
        return !this.dataSource.state && isPresent(this.dataSource.state.currentItem)
            && !this.dataSource.state.addMode;
    };
    /**
     * @return {?}
     */
    ChooserComponent.prototype.hasMenuTemplate = /**
     * @return {?}
     */
    function () {
        return isPresent(this.menuTemplate);
    };
    /**
     * @return {?}
     */
    ChooserComponent.prototype.hasSelectionTemplate = /**
     * @return {?}
     */
    function () {
        return isPresent(this.selectionTemplate);
    };
    /**
     * Internal. Please see ControlValueAccessor
     * As we are using DataSource internally for [(ngModel)] case we need to deffer DataSource
     * initialization once we have a value and we only accept []
     *
     *
     * ? Should we do some deeper comparision?
     */
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
    ChooserComponent.prototype.writeValue = /**
     * Internal. Please see ControlValueAccessor
     * As we are using DataSource internally for [(ngModel)] case we need to deffer DataSource
     * initialization once we have a value and we only accept []
     *
     *
     * ? Should we do some deeper comparision?
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (isBlank(value)) {
            return;
        }
        if (isPresent(this.dataSource)) {
            this.dataSource.updateValue(value);
        }
        else {
            var /** @type {?} */ selState = new DefaultSelectionState(this.multiselect);
            var /** @type {?} */ chState = new ChooserState(selState, this.multiselect);
            this.initDatasource(chState);
            this.dataSource.updateValue(value);
        }
        this.initInternalModel();
    };
    /**
     * @param {?=} chooserState
     * @return {?}
     */
    ChooserComponent.prototype.initDatasource = /**
     * @param {?=} chooserState
     * @return {?}
     */
    function (chooserState) {
        assert(isPresent(this.destinationClass), 'You need to provide destinationClass or custom DataSource');
        this.dataSource.init({
            obj: this.destinationClass,
            queryType: QueryType.FullText,
            lookupKey: this.field,
            state: chooserState,
            multiselect: this.multiselect
        });
    };
    /**
     *
     * Used by ngOnInit and Write value to read state from ChooserState and set it to internal
     * ngModel property
     *
     * @return {?}
     */
    ChooserComponent.prototype.initInternalModel = /**
     *
     * Used by ngOnInit and Write value to read state from ChooserState and set it to internal
     * ngModel property
     *
     * @return {?}
     */
    function () {
        if (this.dataSource.state.multiselect) {
            this.internalChooserModel = this.dataSource.state.selectedObjects();
        }
        else {
            this.internalChooserModel = this.dataSource.state.selectedObject();
        }
        if (isPresent(this.formControl)) {
            this.formControl.setValue(this.internalChooserModel);
        }
    };
    ChooserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-chooser',
                    template: "<div class=\"w-chooser \">\n\n    <p-autoComplete #autoCompplete [(ngModel)]=\"internalChooserModel\"\n                    [suggestions]=\"dataSource.state.matches\"\n                    [multiple]=\"dataSource.state.multiselect\"\n                    [dropdown]=\"!dataSource.state.multiselect\"\n                    [minLength]=\"minLenForSearch\"\n                    [placeholder]=\"placeHolder\"\n                    [delay]=\"delay\"\n                    [disabled]=\"disabled\"\n                    (onDropdownClick)=\"onDropdownClick($event)\"\n                    (completeMethod)=\"match($event.query)\"\n                    (onSelect)=\"selectItem($event)\"\n                    (onUnselect)=\"removeValue($event)\">\n\n\n        <ng-template let-internalChooserModel pTemplate=\"item\">\n            <ng-template [ngIf]=\"!hasMenuTemplate()\">\n                {{ displayItem(internalChooserModel) }}\n            </ng-template>\n            <ng-template [embeddedItem]=\"menuTemplate\" [item]=\"internalChooserModel\"\n                         *ngIf=\"hasMenuTemplate()\"></ng-template>\n        </ng-template>\n    </p-autoComplete>\n\n    <!--\n        Wrap whole selection with one extra element so we can move it around\n\n         see: selectionAppendTo\n    -->\n    <span #selectionView>\n        <div class=\"w-chooser-selections\"\n             *ngIf=\"multiselect && dataSource.state.recentSelectedObjects.length > 0\">\n\n        <ng-template [ngIf]=\"!hasSelectionTemplate()\">\n\n            <!-- no selection template render it as it is from CORE-->\n            <ul class=\"ui-autocomplete-multiple-container ui-widget ui-state-default \"\n                [ngClass]=\"{'ui-state-disabled':disabled,'ui-state-focus':autoCompleteComponent.focus}\">\n\n                <li #token *ngFor=\"let item of dataSource.state.recentSelectedObjects\"\n                    class=\"ui-autocomplete-token ui-state-highlight ui-corner-all\" tabindex=\"0\"\n                    (keyup.delete)=\"removeValue(item)\"\n                    (keyup.backspace)=\"removeValue(item)\">\n\t\t\t\t\t<span class=\"ui-autocomplete-token-icon sap-icon icon-decline\"\n                          (click)=\"removeValue(item)\"></span>\n                    <span class=\"ui-autocomplete-token-label\">{{ displayItem(item) }}</span>\n                </li>\n            </ul>\n        </ng-template>\n\n            <!--Yes there is selection template let's iterate and push each item to be rendered-->\n        <ng-template ngFor [ngForOf]=\"dataSource.state.recentSelectedObjects\" let-item>\n            <ng-template [embeddedItem]=\"selectionTemplate\" [item]=\"item\"\n                         *ngIf=\"hasSelectionTemplate()\"></ng-template>\n        </ng-template>\n\n        <ng-template [ngIf]=\"dataSource.showMoreSelected()\">\n\t\t\t<span class=\"more-selected\">\n\t\t\t\t<aw-hyperlink [size]=\"'small'\" (action)=\"dataSource.state.toggleAllSelected()\">\n\t\t\t\t\t{{moreSelectString()}}\n\t\t\t\t</aw-hyperlink>\n\t\t\t</span>\n        </ng-template>\n    </div>\n    </span>\n\n\n</div>\n\n",
                    styles: ["/deep/ .ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-input,/deep/ .ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-multiple-container{width:100%}/deep/ .w-chooser .ui-autocomplete-multiple{line-height:normal}/deep/ .w-chooser .ui-autocomplete-input{width:100%}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button{right:0;position:absolute;border:0;width:30px;background:0 0}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button .pi{font-family:\"SAP icon fonts\";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button input{padding-right:30px}/deep/ .w-chooser .ui-autocomplete-input-token{padding:0;margin:0;vertical-align:baseline;width:inherit}/deep/ .w-chooser .ui-autocomplete-input-token .fa{font-family:\"SAP icon fonts\";color:#767676;cursor:pointer;font-size:1.2em}/deep/ .w-chooser .ui-autocomplete-input-token .fa-search:before{content:'\\e00d'}/deep/ .w-chooser .ui-autocomplete-input-token input{width:inherit;padding-right:25px}/deep/ .w-chooser .ui-autocomplete-input-token span{position:absolute;right:5px;top:0;padding-top:.6em}/deep/ .w-chooser .ui-autocomplete-dropdown{height:36px}/deep/ .w-chooser .ui-autocomplete-panel .ui-autocomplete-list-item{padding:.65em 2em .65em .64em;margin:0}/deep/ body .ui-autocomplete.ui-autocomplete-multiple .ui-autocomplete-multiple-container{padding:.4em .5em .4em 1em}.w-chooser-selections{margin-top:2px}.w-chooser-selections ul{margin:0;padding:0}.w-chooser-selections .ui-autocomplete-multiple-container{border:0}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token{font-size:.85em;letter-spacing:.1px;font-weight:400;padding:0;background:#e0f2ff;margin-right:5px;margin-bottom:5px}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token-label{padding:4px 21px 4px 5px}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token-icon{font-size:.78em;padding-right:.28em}.w-chooser-selections .ui-autocomplete-multiple-container .sap-icon{line-height:inherit}.w-chooser-selections .more-selected{display:inline-block}"],
                    providers: [
                        CHOOSER_CONTROL_VALUE_ACCESSOR,
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return ChooserComponent; }) },
                        { provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders] }
                    ]
                },] },
    ];
    /** @nocollapse */
    ChooserComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: ElementRef },
        { type: ChooserDataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return BaseFormComponent; }),] }] }
    ]; };
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
    return ChooserComponent;
}(BaseFormComponent));
export { ChooserComponent };
function ChooserComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jaG9vc2VyL2Nob29zZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFHSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDcEUsT0FBTyxFQUFDLFlBQVksRUFBRSxxQkFBcUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStGcEUsTUFBTSxDQUFDLHFCQUFNLDhCQUE4QixHQUFRO0lBQy9DLE9BQU8sRUFBRSxp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RUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDLEVBQUM7d0JBQzdFLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxFQUFDO3FCQUMxRjtpQkFHSjs7OztnQkE3TGUsV0FBVztnQkFidkIsVUFBVTtnQkFnQk4saUJBQWlCLHVCQXVTUixNQUFNLFNBQUMsV0FBVztnQkF6UzNCLGlCQUFpQix1QkEwU1IsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQzs7OzRCQXRHOUUsS0FBSztrQ0FRTCxLQUFLO21DQVFMLEtBQUs7OEJBT0wsS0FBSzs2QkFRTCxLQUFLO29DQVFMLEtBQUs7d0JBSUwsS0FBSzttQ0FPTCxLQUFLO3dCQUlMLEtBQUs7OEJBT0wsTUFBTTsrQkFvQk4sWUFBWSxTQUFDLFVBQVU7b0NBSXZCLFlBQVksU0FBQyxlQUFlO3dDQUc1QixTQUFTLFNBQUMsZUFBZTtvQ0FHekIsU0FBUyxTQUFDLGVBQWU7OzJCQXRVOUI7RUFvT3NDLGlCQUFpQjtTQUExQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgT3V0cHV0LFxuICAgIFNraXBTZWxmLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0F1dG9Db21wbGV0ZX0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7YXNzZXJ0LCBFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0RBVEFfU09VUkNFfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtDaG9vc2VyRGF0YVNvdXJjZX0gZnJvbSAnLi9jaG9vc2VyLWRhdGEtc291cmNlJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RGF0YUZpbmRlcnMsIFF1ZXJ5VHlwZX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0Nob29zZXJTdGF0ZSwgRGVmYXVsdFNlbGVjdGlvblN0YXRlfSBmcm9tICcuL2Nob29zZXItc3RhdGUnO1xuXG5cbi8qKlxuICogVHlwZWFoZWFkIGNob29zZXIgdGhhdCBzdXBwb3J0cyBib3RoIHNpbmdsZSBhbmQgbXVsdGktc2VsZWN0LiBOb3QgbGlrZSBEcm9wZG93biwgdGhpcyBjaG9vc2VyXG4gKiByZXF1aXJlcyBsaXR0bGUgYml0IGRpZmZlcmVudCBzZXR1cC4gSXQgcmVxdWlyZXMgYXQgbWluaW11bSBASW5wdXQgZGF0YVNvdXJjZSBvclxuICogZGVzdGluYXRpb25DbGFzc1xuICpcbiAqXG4gKiBCeSBkZWZhdWx0IGNob29zZXIgaXMgbXVsdGktc2VsZWN0LiBJZiB5b3Ugd2FudCBzaW5nbGUgc2VsZWN0IHRoZW4geW91IG11c3QgcHJvdmlkZSBtdWx0aS1zZWxlY3RcbiAqIHdpdGggQElucHV0LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogSW4gc2ltcGxlIHNjZW5hcmlvIHlvdSBjYW4gdXNlIENob29zZXIgbGlrZSBzbzpcbiAqXG4gKlxuICogYGBgXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiAnY2hvb3Nlci1hcHAnICxcbiAqICAgICAgdGVtcGxhdGU6IGA8YXctY2hvb3NlciAgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiBuYW1lPVwiY29sb3JcIidcbiAqICAgICAgICAgICAgICAgICAgICAgIFtkYXRhU291cmNlXT1cImRzXCI+PC9hdy1jaG9vc2VyPmBcbiAqICB9KVxuICogIGV4cG9ydCBjbGFzcyBNeUNob29zZXJBcHBcbiAqICB7XG4gKlxuICogICAgICBkczogQ2hvb3NlckRhdGFTb3VyY2U7XG4gKlxuICogICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YTogRGF0YVByb3ZpZGVycywgcHJpdmF0ZSBmaW5kZXJzOiBEYXRhRmluZGVycyl7XG4gKiAgICAgICAgICB0aGlzLmRzID0gbmV3IENob29zZXJEYXRhU291cmNlKHRoaXMuZGF0YSwgdGhpcy5maW5kZXJzKTtcbiAqXG4gKiAgICAgICB0aGlzLmRzLmluaXQoe1xuICogICAgICAgICAgIG9iajogWydibHVlJywgJ3JlZCcsICd5ZWxsb3cnXSwgcXVlcnlUeXBlOiBRdWVyeVR5cGUuRnVsbFRleHQsIHN0YXRlOiBudWxsLFxuICogICAgICAgICAgICBtdWx0aXNlbGVjdDogdHJ1ZVxuICogICAgICAgfSk7XG4gKlxuICogICAgIH1cbiAqICB9XG4gKlxuICogYGBgYFxuICogIEFib3ZlIGV4YW1wbGUgd2lsbCB1c2UgcHJvdmlkZWQgZGF0YVNvdXJjZSBhbmQgcmVuZGVyIG11bHRpLXNlbGVjdCBjaG9vc2VyLiBXaXRoIGRlZmF1bHRcbiAqICBpbXBsZW1lbnRhdGlvbiAgc2VsZWN0ZWQgdmFsdWVzIHdpbGwgYXBwZWFyIGFzIGEgdGFncyB1bmRlciB0aGUgaW5wdXQgYm94XG4gKlxuICpcbiAqXG4gKiAqICMjIyBFeGFtcGxlXG4gKlxuICogIEluIHRoaXMgZXhhbXBsZSB3ZSBwcm92aWRlIGN1c3RvbSB0ZW1wbGF0ZSB0byBjaGFuZ2UgdGhlIHdheSBob3cgY2hvb3NlcidzIE1lbnVJdGVtIGFyZVxuICogICAgIHJlbmRlcmVkIGFzIHdlbGwgYXMgdGVtcGxhdGUgZm9yIHRoZSBzZWxlY3Rpb24gaXRlbSBsb29rcyBsaWtlXG4gKlxuICogYGBgXG4gKiAgQENvbXBvbmVudCh7XG4gKiAgICAgIHNlbGVjdG9yOiAnY2hvb3Nlci1hcHAnICxcbiAqICAgICAgdGVtcGxhdGU6IGA8YXctY2hvb3NlciAgbmFtZT1cImNvbW1vZGl0eVwiJyBbZGF0YVNvdXJjZV09XCJkc1wiPlxuICpcbiAqICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbWVudUl0ZW0gbGV0LWl0ZW0+XG4gKiAgICAgICAgICAgICBcdDxzcGFuPlxuICogICAgICAgICAgICAgXHRcdDxpIGNsYXNzPVwiZmEgZmEtZW52aXJhIFwiID48L2k+XG4gKiAgICAgICAgICAgICBcdFx0e3tpdGVtfX1cbiAqICAgICAgICAgICAgIFx0PC9zcGFuPlxuICpcbiAqICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICogICAgICAgICAgPG5nLXRlbXBsYXRlICNzZWxlY3Rpb25JdGVtIGxldC1pdGVtPlxuICogICAgICAgICAgICAgXHQ8c3BhbiBjbGFzcz1cInRhZyB0YWctY2lyY2xlXCI+XG4gKiAgICAgICAgICAgICBcdFx0aXRlbToge3tpdGVtIH19XG4gKiAgICAgICAgICAgICBcdFx0PGkgY2xhc3M9XCJmYSBmYS1jbG9zZVwiIChjbGljayk9XCJjaG9vc2VyLnJlbW92ZVZhbHVlKGl0ZW0pXCI+PC9pPlxuICogICAgICAgICAgICAgXHQ8L3NwYW4+XG4gKlxuICpcbiAqICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKlxuICpcbiAqICAgICAgICAgIDwvYXctY2hvb3Nlcj5cbiAqICAgICAgYFxuICogICAgICBzdHlsZTogW2BcbiAqICAgICAgICAgICAgICAudGFnLWNpcmNsZSB7XG4gKiAgICAgICAgICAgICAgXHRib3JkZXItcmFkaXVzOiA2cmVtO1xuICogICAgICAgICAgICAgIFx0aGVpZ2h0OiA3cmVtO1xuICogICAgICAgICAgICAgIFx0Y29sb3I6ICNlOGVlZjE7XG4gKiAgICAgICAgICAgICAgXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUzLCA1NiwgNTgsIDAuNjcpO1xuICogICAgICAgICAgICAgIFx0bGluZS1oZWlnaHQ6IDZyZW07XG4gKiAgICAgICAgICAgICAgfVxuICogICAgICBgXVxuICogIH0pXG4gKlxuICogYGBgYFxuICpcbiAqICBJbiBhYm92ZSBleGFtcGxlIHdlIGNoYW5nZSBob3cgdGhlIGNob29zZXIncyBtZW51IGl0ZW0gbG9vayBsaWtlIGFzIHdlbGwgYXMgd2UgZGVmaW5lIGN1c3RvbVxuICogICAgIHRlbXBsYXRlIGZvciBzZWxlY3Rpb24gaXRlbSB0byB0dXJuIGFsbCBzZWxlY3Rpb24gdG8gY2lyY2xlcyB3aXRoIHRleHQgaW4gdGhlIG1pZGRsZS5cbiAqXG4gKlxuICpcbiAqL1xuXG5leHBvcnQgY29uc3QgQ0hPT1NFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hvb3NlckNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1jaG9vc2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3LWNob29zZXIgXCI+XG5cbiAgICA8cC1hdXRvQ29tcGxldGUgI2F1dG9Db21wcGxldGUgWyhuZ01vZGVsKV09XCJpbnRlcm5hbENob29zZXJNb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgIFtzdWdnZXN0aW9uc109XCJkYXRhU291cmNlLnN0YXRlLm1hdGNoZXNcIlxuICAgICAgICAgICAgICAgICAgICBbbXVsdGlwbGVdPVwiZGF0YVNvdXJjZS5zdGF0ZS5tdWx0aXNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICAgIFtkcm9wZG93bl09XCIhZGF0YVNvdXJjZS5zdGF0ZS5tdWx0aXNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICAgIFttaW5MZW5ndGhdPVwibWluTGVuRm9yU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlSG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgW2RlbGF5XT1cImRlbGF5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uRHJvcGRvd25DbGljayk9XCJvbkRyb3Bkb3duQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChjb21wbGV0ZU1ldGhvZCk9XCJtYXRjaCgkZXZlbnQucXVlcnkpXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uU2VsZWN0KT1cInNlbGVjdEl0ZW0oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChvblVuc2VsZWN0KT1cInJlbW92ZVZhbHVlKCRldmVudClcIj5cblxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBsZXQtaW50ZXJuYWxDaG9vc2VyTW9kZWwgcFRlbXBsYXRlPVwiaXRlbVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFoYXNNZW51VGVtcGxhdGUoKVwiPlxuICAgICAgICAgICAgICAgIHt7IGRpc3BsYXlJdGVtKGludGVybmFsQ2hvb3Nlck1vZGVsKSB9fVxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbZW1iZWRkZWRJdGVtXT1cIm1lbnVUZW1wbGF0ZVwiIFtpdGVtXT1cImludGVybmFsQ2hvb3Nlck1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc01lbnVUZW1wbGF0ZSgpXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3AtYXV0b0NvbXBsZXRlPlxuXG4gICAgPCEtLVxuICAgICAgICBXcmFwIHdob2xlIHNlbGVjdGlvbiB3aXRoIG9uZSBleHRyYSBlbGVtZW50IHNvIHdlIGNhbiBtb3ZlIGl0IGFyb3VuZFxuXG4gICAgICAgICBzZWU6IHNlbGVjdGlvbkFwcGVuZFRvXG4gICAgLS0+XG4gICAgPHNwYW4gI3NlbGVjdGlvblZpZXc+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3LWNob29zZXItc2VsZWN0aW9uc1wiXG4gICAgICAgICAgICAgKm5nSWY9XCJtdWx0aXNlbGVjdCAmJiBkYXRhU291cmNlLnN0YXRlLnJlY2VudFNlbGVjdGVkT2JqZWN0cy5sZW5ndGggPiAwXCI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFoYXNTZWxlY3Rpb25UZW1wbGF0ZSgpXCI+XG5cbiAgICAgICAgICAgIDwhLS0gbm8gc2VsZWN0aW9uIHRlbXBsYXRlIHJlbmRlciBpdCBhcyBpdCBpcyBmcm9tIENPUkUtLT5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZS1jb250YWluZXIgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZCwndWktc3RhdGUtZm9jdXMnOmF1dG9Db21wbGV0ZUNvbXBvbmVudC5mb2N1c31cIj5cblxuICAgICAgICAgICAgICAgIDxsaSAjdG9rZW4gKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGF0YVNvdXJjZS5zdGF0ZS5yZWNlbnRTZWxlY3RlZE9iamVjdHNcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS10b2tlbiB1aS1zdGF0ZS1oaWdobGlnaHQgdWktY29ybmVyLWFsbFwiIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgIChrZXl1cC5kZWxldGUpPVwicmVtb3ZlVmFsdWUoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5dXAuYmFja3NwYWNlKT1cInJlbW92ZVZhbHVlKGl0ZW0pXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtdG9rZW4taWNvbiBzYXAtaWNvbiBpY29uLWRlY2xpbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlVmFsdWUoaXRlbSlcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXRva2VuLWxhYmVsXCI+e3sgZGlzcGxheUl0ZW0oaXRlbSkgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDwhLS1ZZXMgdGhlcmUgaXMgc2VsZWN0aW9uIHRlbXBsYXRlIGxldCdzIGl0ZXJhdGUgYW5kIHB1c2ggZWFjaCBpdGVtIHRvIGJlIHJlbmRlcmVkLS0+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJkYXRhU291cmNlLnN0YXRlLnJlY2VudFNlbGVjdGVkT2JqZWN0c1wiIGxldC1pdGVtPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtlbWJlZGRlZEl0ZW1dPVwic2VsZWN0aW9uVGVtcGxhdGVcIiBbaXRlbV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImhhc1NlbGVjdGlvblRlbXBsYXRlKClcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJkYXRhU291cmNlLnNob3dNb3JlU2VsZWN0ZWQoKVwiPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJtb3JlLXNlbGVjdGVkXCI+XG5cdFx0XHRcdDxhdy1oeXBlcmxpbmsgW3NpemVdPVwiJ3NtYWxsJ1wiIChhY3Rpb24pPVwiZGF0YVNvdXJjZS5zdGF0ZS50b2dnbGVBbGxTZWxlY3RlZCgpXCI+XG5cdFx0XHRcdFx0e3ttb3JlU2VsZWN0U3RyaW5nKCl9fVxuXHRcdFx0XHQ8L2F3LWh5cGVybGluaz5cblx0XHRcdDwvc3Bhbj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgICA8L3NwYW4+XG5cblxuPC9kaXY+XG5cbmAsXG4gICAgc3R5bGVzOiBbYC9kZWVwLyAudWktZmx1aWQgLnVpLWF1dG9jb21wbGV0ZS51aS1hdXRvY29tcGxldGUtZGQgLnVpLWF1dG9jb21wbGV0ZS1pbnB1dCwvZGVlcC8gLnVpLWZsdWlkIC51aS1hdXRvY29tcGxldGUudWktYXV0b2NvbXBsZXRlLWRkIC51aS1hdXRvY29tcGxldGUtbXVsdGlwbGUtY29udGFpbmVye3dpZHRoOjEwMCV9L2RlZXAvIC53LWNob29zZXIgLnVpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZXtsaW5lLWhlaWdodDpub3JtYWx9L2RlZXAvIC53LWNob29zZXIgLnVpLWF1dG9jb21wbGV0ZS1pbnB1dHt3aWR0aDoxMDAlfS9kZWVwLyAudy1jaG9vc2VyIC51aS1hdXRvY29tcGxldGUtZHJvcGRvd24udWktYnV0dG9ue3JpZ2h0OjA7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyOjA7d2lkdGg6MzBweDtiYWNrZ3JvdW5kOjAgMH0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWRyb3Bkb3duLnVpLWJ1dHRvbiAucGl7Zm9udC1mYW1pbHk6XCJTQVAgaWNvbiBmb250c1wiO2NvbG9yOiM3Njc2NzY7Y3Vyc29yOnBvaW50ZXI7Zm9udC1zaXplOjEuNGVtO21hcmdpbi1sZWZ0Oi0uODVlbX0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWRyb3Bkb3duLnVpLWJ1dHRvbiAucGktY2FyZXQtZG93bjpiZWZvcmV7Y29udGVudDonXFxcXGUxZWYnfS9kZWVwLyAudy1jaG9vc2VyIC51aS1hdXRvY29tcGxldGUtZHJvcGRvd24udWktYnV0dG9uIGlucHV0e3BhZGRpbmctcmlnaHQ6MzBweH0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWlucHV0LXRva2Vue3BhZGRpbmc6MDttYXJnaW46MDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTt3aWR0aDppbmhlcml0fS9kZWVwLyAudy1jaG9vc2VyIC51aS1hdXRvY29tcGxldGUtaW5wdXQtdG9rZW4gLmZhe2ZvbnQtZmFtaWx5OlwiU0FQIGljb24gZm9udHNcIjtjb2xvcjojNzY3Njc2O2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZToxLjJlbX0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWlucHV0LXRva2VuIC5mYS1zZWFyY2g6YmVmb3Jle2NvbnRlbnQ6J1xcXFxlMDBkJ30vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWlucHV0LXRva2VuIGlucHV0e3dpZHRoOmluaGVyaXQ7cGFkZGluZy1yaWdodDoyNXB4fS9kZWVwLyAudy1jaG9vc2VyIC51aS1hdXRvY29tcGxldGUtaW5wdXQtdG9rZW4gc3Bhbntwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDo1cHg7dG9wOjA7cGFkZGluZy10b3A6LjZlbX0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWRyb3Bkb3due2hlaWdodDozNnB4fS9kZWVwLyAudy1jaG9vc2VyIC51aS1hdXRvY29tcGxldGUtcGFuZWwgLnVpLWF1dG9jb21wbGV0ZS1saXN0LWl0ZW17cGFkZGluZzouNjVlbSAyZW0gLjY1ZW0gLjY0ZW07bWFyZ2luOjB9L2RlZXAvIGJvZHkgLnVpLWF1dG9jb21wbGV0ZS51aS1hdXRvY29tcGxldGUtbXVsdGlwbGUgLnVpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZS1jb250YWluZXJ7cGFkZGluZzouNGVtIC41ZW0gLjRlbSAxZW19LnctY2hvb3Nlci1zZWxlY3Rpb25ze21hcmdpbi10b3A6MnB4fS53LWNob29zZXItc2VsZWN0aW9ucyB1bHttYXJnaW46MDtwYWRkaW5nOjB9LnctY2hvb3Nlci1zZWxlY3Rpb25zIC51aS1hdXRvY29tcGxldGUtbXVsdGlwbGUtY29udGFpbmVye2JvcmRlcjowfS53LWNob29zZXItc2VsZWN0aW9ucyAudWktYXV0b2NvbXBsZXRlLW11bHRpcGxlLWNvbnRhaW5lciAudWktYXV0b2NvbXBsZXRlLXRva2Vue2ZvbnQtc2l6ZTouODVlbTtsZXR0ZXItc3BhY2luZzouMXB4O2ZvbnQtd2VpZ2h0OjQwMDtwYWRkaW5nOjA7YmFja2dyb3VuZDojZTBmMmZmO21hcmdpbi1yaWdodDo1cHg7bWFyZ2luLWJvdHRvbTo1cHh9LnctY2hvb3Nlci1zZWxlY3Rpb25zIC51aS1hdXRvY29tcGxldGUtbXVsdGlwbGUtY29udGFpbmVyIC51aS1hdXRvY29tcGxldGUtdG9rZW4tbGFiZWx7cGFkZGluZzo0cHggMjFweCA0cHggNXB4fS53LWNob29zZXItc2VsZWN0aW9ucyAudWktYXV0b2NvbXBsZXRlLW11bHRpcGxlLWNvbnRhaW5lciAudWktYXV0b2NvbXBsZXRlLXRva2VuLWljb257Zm9udC1zaXplOi43OGVtO3BhZGRpbmctcmlnaHQ6LjI4ZW19LnctY2hvb3Nlci1zZWxlY3Rpb25zIC51aS1hdXRvY29tcGxldGUtbXVsdGlwbGUtY29udGFpbmVyIC5zYXAtaWNvbntsaW5lLWhlaWdodDppbmhlcml0fS53LWNob29zZXItc2VsZWN0aW9ucyAubW9yZS1zZWxlY3RlZHtkaXNwbGF5OmlubGluZS1ibG9ja31gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ0hPT1NFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENob29zZXJDb21wb25lbnQpfSxcbiAgICAgICAge3Byb3ZpZGU6IERBVEFfU09VUkNFLCB1c2VDbGFzczogQ2hvb3NlckRhdGFTb3VyY2UsIGRlcHM6IFtEYXRhUHJvdmlkZXJzLCBEYXRhRmluZGVyc119XG4gICAgXVxuXG5cbn0pXG5leHBvcnQgY2xhc3MgQ2hvb3NlckNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0IHtcblxuICAgIC8qKlxuICAgICAqIE1heCBudW1iZXIgb2YgaXRlbXMgcmV0dXJuIGF0IHNpbmdsZSBNYXRjaCBzbyB3ZSBkbyBub3QgcmV0dXJuIDEwMDAgaXRlbXMgYXQgc2luZ2xlIHRpbWUuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1heExlbmd0aDogbnVtYmVyID0gMTA7XG5cblxuICAgIC8qKlxuICAgICAqIE1heCBudW1iZXIgb2YgaXRlbXMgcmV0dXJuIGF0IHNpbmdsZSBNYXRjaCBzbyB3ZSBkbyBub3QgcmV0dXJuIDEwMDAgaXRlbXMgYXQgc2luZ2xlIHRpbWUuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG1pbkxlbkZvclNlYXJjaDogbnVtYmVyID0gMTtcblxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0dGVyIHVzZWQgdG8gZm9ybWF0IGVhY2ggc2VsZWN0aW9uIGFuZCBzZWxlY3RlZCBvYmplY3QgZm9yIGRpc3BsYXkuXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlVHJhbnNmb3JtZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJcyB0aGlzIG11bHRpc2VsZWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG11bHRpc2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogQnkgZGVmYXVsdCBDaG9vc2VyRGF0YVNvdXJjZSB3aWxsIGJlIGNyZWF0ZWQgYnV0IHRoZXJlIGlzIGEgb3B0aW9uIHRvIHNldFxuICAgICAqIGN1c3RvbSBvbmUgb24gYXBwbGljYXRpb24gbGV2ZWxcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRhdGFTb3VyY2U6IENob29zZXJEYXRhU291cmNlO1xuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIHdlIHdhbnQgdG8gY2hhbmdlIHRoZSBwbGFjZSB3aGVyZSBzZWxlY3Rpb24gaXMgcmVuZGVyZWQgdXNlIHRoaXMgYXBwZW5kVG8gcHJvcGVydHlcbiAgICAgKiBhbmQgaXQgd2lsbCB1c2UgRE9NIG9wZXJhdGlvbiBhcHBlbmRDaGlsZCgpIHRvIG1vdmUgc2VsZWN0aW9uVmlldyB1bmRlciBkaWZmZXJlbnQgcGFyZW50XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3Rpb25BcHBlbmRUbzogRWxlbWVudFJlZjtcblxuXG4gICAgQElucHV0KClcbiAgICBkZWxheTogbnVtYmVyID0gMzAwO1xuXG5cbiAgICAvKipcbiAgICAgKiBUYXJnZXQgdHlwZSB0byByZW5kZXIuIERhdGEgd2lsbCBiZSByZWFkIGZyb20gdGhlIHJlZ2lzdGVyZWQgRGF0YVByb3ZpZGVyXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZXN0aW5hdGlvbkNsYXNzOiBzdHJpbmc7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgZmllbGQ6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdCBhIGl0ZW1cbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIGludGVybmFsIG1vZGVsIHRvIGxpc3RlbiBmb3IgSW5wdXQgdmFsdWUgY2hhbmdlc1xuICAgICAqL1xuICAgIGludGVybmFsQ2hvb3Nlck1vZGVsOiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIEVtYmVkZGVkIHRlbXBsYXRlIGRlZmluZWQgYnkgdXNlci4gSWYgdXNlciBkb2VzIG5vdCBwcm92aWRlIGFueSB0ZW1wbGF0ZSB0aGVuIHdoZW4gcmVuZGVyaW5nXG4gICAgICogYW4gaXRlbSB3ZSBhc3N1bWUgd2UgYXJlIGRlYWxpbmcgd2l0aCBwcmltaXRpdmUgdHlwZXMgYW5kIGNhbGwgb24gZWFjaCBpdGVtIHRvU3RyaW5nKCksIGlmXG4gICAgICogd2UgYXJlIGRlYWxpbmcgd2l0aCBvYmplY3QsIHRoZW4gd2UgZXhwZWN0IHVzZXIgdG8gcHJvdmlkZSBhIHRlbXBsYXRlIGFuZCB0ZWxsIHRoZSBjaG9vc2VyXG4gICAgICogaG93IGl0ZW1zIHNob3VsZHMgYmUgaGFuZGxlZCBvciBhdCBsZWFzdCB2YWx1ZVRyYW5zZm9ybWVyIHNvIHdlIGtub3cgaG93IHRvIGNvbnZlcnQgdGhpc1xuICAgICAqIHZhbHVlLlxuICAgICAqXG4gICAgICogRWFjaCBvYmplY3QgY2FuIHByb3ZpZGUgaXRzIG93biB0b1N0cmluZyBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ21lbnVJdGVtJylcbiAgICBtZW51VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIEBDb250ZW50Q2hpbGQoJ3NlbGVjdGlvbkl0ZW0nKVxuICAgIHNlbGVjdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZCgnYXV0b0NvbXBwbGV0ZScpXG4gICAgYXV0b0NvbXBsZXRlQ29tcG9uZW50OiBBdXRvQ29tcGxldGU7XG5cbiAgICBAVmlld0NoaWxkKCdzZWxlY3Rpb25WaWV3JylcbiAgICBzZWxlY3Rpb25WaWV3RWxlbTogRWxlbWVudFJlZjtcblxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgc2VsZWN0aW9uIGlzID4gbWF4IHNlbGVjdGlvbiwgdGhlbiBzaG93IGhpZGUgbGluay5cbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZGVMaW5rOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHJpdmF0ZSBlbGVtZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgQEluamVjdChEQVRBX1NPVVJDRSkgcHJpdmF0ZSBfZGVmYXVsdERTOiBDaG9vc2VyRGF0YVNvdXJjZSxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQmFzZUZvcm1Db21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KSB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnBsYWNlSG9sZGVyKSkge1xuICAgICAgICAgICAgLy8gdGhpcy5wbGFjZUhvbGRlciA9IGkxOG4uaW5zdGFudCgnV2lkZ2V0cy5jaG9vc2VyLnBsYWNlSG9sZGVyJyk7XG4gICAgICAgICAgICB0aGlzLnBsYWNlSG9sZGVyID0gJ1NlYXJjaCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5oaWRlTGluayA9IGkxOG4uaW5zdGFudCgnV2lkZ2V0cy5jaG9vc2VyLmhpZGVTZWxlY3Rpb24nKTtcbiAgICAgICAgdGhpcy5oaWRlTGluayA9ICdIaWRlJztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmRhdGFTb3VyY2UpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuX2RlZmF1bHREUztcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGFzb3VyY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5mb3JtQ29udHJvbCkgJiYgaXNQcmVzZW50KHRoaXMuZm9ybUNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UudXBkYXRlVmFsdWUodGhpcy5mb3JtQ29udHJvbC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJbnRlcm5hbE1vZGVsKCk7XG5cblxuICAgICAgICBpZiAodGhpcy5pc1N0YW5kYWxvbmUpIHtcbiAgICAgICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy5pbnRlcm5hbENob29zZXJNb2RlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sID0gPEZvcm1Db250cm9sPiB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1t0aGlzLm5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIFNlYXJjaCBpY29uIGluIGNhc2Ugb2YgbXVsdGlzZWxlY3QuXG4gICAgICogdG9kbzogT25jZSBQcmltZU5HIHdpbGwgcHJvdmlkZSBhIHRlbXBsYXRlIHRvIG92ZXJyaWRlIGRlZmF1bHQgYmVoYXZpb3IgcmVtb3ZlIGl0XG4gICAgICpcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhU291cmNlLnN0YXRlLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VhcmNoSW5wdXQgPSB0aGlzLmVsZW1lbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAnLnVpLWF1dG9jb21wbGV0ZS1pbnB1dC10b2tlbicpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoc2VhcmNoSW5wdXQpKSB7XG4gICAgICAgICAgICBsZXQgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAnc2VhcmNoLWljb24tcmlnaHQgZmEgZmEtZncgZmEtc2VhcmNoJztcbiAgICAgICAgICAgIHNlYXJjaElucHV0LmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5zZWxlY3Rpb25BcHBlbmRUbykgJiYgaXNQcmVzZW50KHRoaXMuc2VsZWN0aW9uVmlld0VsZW0pKSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50RWxlbSA9IHRoaXMuc2VsZWN0aW9uQXBwZW5kVG8gaW5zdGFuY2VvZiBFbGVtZW50UmVmID9cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkFwcGVuZFRvLm5hdGl2ZUVsZW1lbnQgOiB0aGlzLnNlbGVjdGlvbkFwcGVuZFRvO1xuXG4gICAgICAgICAgICBwYXJlbnRFbGVtLmFwcGVuZENoaWxkKHRoaXMuc2VsZWN0aW9uVmlld0VsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGNoYW5nZSBjdXJyZW50IGJlaGF2aW9yIHNpbmNlIHdlIHdhbnQgdG8gc2hvdyBzZWxlY3Rpb24gdW5kZXIgdGhlIGNob29zZXIuIEtcbiAgICAgKlxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0b2tlbnMgPSB0aGlzLmVsZW1lbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAnLnVpLWF1dG9jb21wbGV0ZSAudWktYXV0b2NvbXBsZXRlLXRva2VuJyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodG9rZW5zKSAmJiB0b2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdG9rZW5zLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiB2YWx1ZSBpcyBlbnRlcmVkIGludG8gc2VhcmNoIGJveCwgd2UgYXNrIG91ciBEYXRhU291cmNlIHRvIG1hdGNoIHRoaXMgcGF0dGVyblxuICAgICAqIGFnYWluc3QgZGF0YSByZXBvc2l0b3J5LiBJdCB3aWxsIHJldHJpZXZlIGFsbCBwb3NzaWJsZSBtYXRjaGVzIGxpbWl0ZWQgYnkgTWF4TGVuIGFuZCB0aGlzXG4gICAgICogaXMgYWdhaW4gZmlsdGVyZWQgc28gaXQgZG9lcyBub3QgaW5jbHVkZSBhbHJlYWR5IHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqXG4gICAgICogIHRoZSBtYXRjaGVkIHJlc3VsdGVkIGlzIHNhdmVkIGluIHRoZTogdGhpcy5kYXRhU291cmNlLnN0YXRlLm1hdGNoZXNcbiAgICAgKi9cbiAgICBtYXRjaChwYXR0ZXJuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IG1heExlbiA9IHRoaXMubWF4TGVuZ3RoID8gdGhpcy5tYXhMZW5ndGggOiBDaG9vc2VyRGF0YVNvdXJjZS5NYXhMZW5ndGg7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5maW5kKHBhdHRlcm4sIG1heExlbik7XG5cblxuICAgICAgICAvLyBmaXg6IGZvciB0ZXN0czogSW4gdmVyc2lvbiA0IHdlIG5lZWQgdG8gZXhwbGljaXRseSBmb2N1cyBpbnB1dCBvdGhlcndpc2UgYXV0b2NvbXBsZXRlXG4gICAgICAgIC8vIGRvZXNuJ3QgZ2l2ZSB1cyBhbnkgcG9wdXAgcGFuZWxcbiAgICAgICAgaWYgKHRoaXMuZW52LmluVGVzdCAmJiBpc1ByZXNlbnQodGhpcy5hdXRvQ29tcGxldGVDb21wb25lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZUNvbXBvbmVudC5mb2N1c0lucHV0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSW52b2tlZCBieSBEcm9wZG93biBidXR0b24gaW4gY2FzZSBvZiBzaW5nbGUgc2VsZWN0IGFuZCBoZXJlIHdlIHdhbnQgdG8gaW52b2tlIG1hdGNoXG4gICAgICogdG8gcmV0cmlldmUgYWxsIHN1Z2dlc3Rpb25zIHdpdGhvdXQgYW55IGZpbHRlclxuICAgICAqXG4gICAgICovXG4gICAgb25Ecm9wZG93bkNsaWNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXRjaCgnKicpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWF0Y2goJyonKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENob29zZXIgc3RhdGUgaXMgdXBkYXRlZCAgd2l0aCB1c2VyIHNlbGVjdGlvbi4gUGxlYXNlIHNlZSB3cml0ZVZhbHVlLiBXaGVuIGRvIG5vdCBuZWVkXG4gICAgICogY2FsbCBhbnl0aGluZyBhZGRpdGlvbmFsIGFzIGludGVybmFsQ2hvb3Nlck1vZGVsIGFuZCB0aGlzLmNob29zZXJTdGF0ZS5zZWxlY3RlZE9iamVjdHMoKVxuICAgICAqIHNoYXJlcyB0aGUgc2FtZSByZWZlcmVuY2VzIHNvIGl0cyBpbXBvcnRhbnQgdGhhdCB3ZSBmaXJzdCBzYXZlIHJlZmVyZW5jZSB0b1xuICAgICAqIHRoaXMuY2hvb3NlclN0YXRlLnNlbGVjdGVkT2JqZWN0cygpIGFuZCB0aGVuIGJhY2sgdG8gaW50ZXJuYWxDaG9vc2VyTW9kZWxcbiAgICAgKlxuICAgICAqL1xuICAgIHNlbGVjdEl0ZW0oaXRlbTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnN0YXRlLmFkZE1vZGUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZWQodGhpcy5pbnRlcm5hbENob29zZXJNb2RlbCk7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS51cGRhdGVkU2VsZWN0ZWRPYmplY3RzKGl0ZW0pO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5hZGRNb2RlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVDb21wb25lbnQuaW5wdXRFTC5uYXRpdmVFbGVtZW50LnZhbHVlID1cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtKHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVuc2VsZWN0IGl0ZW1cbiAgICAgKlxuICAgICAqL1xuICAgIHJlbW92ZVZhbHVlKGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuYWRkTW9kZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS51cGRhdGVkU2VsZWN0ZWRPYmplY3RzKGl0ZW0pO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuYWRkTW9kZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwgPSB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2VsZWN0ZWRPYmplY3RzKCk7XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbi5lbWl0KHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwpO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IHRydWV9KTtcblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwpO1xuXG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmF1dG9Db21wbGV0ZUNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlQ29tcG9uZW50LmZvY3VzSW5wdXQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb252ZXJ0IGEgb2JqZWN0IGlmIGFueSBpbnRvIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgKlxuICAgICAqIHRvZG86IGltcGxlbWVudCBiZXR0ZXIgd2F5IGhvdyB0byB3b3JrIHdpdGggb2JqZWN0c1xuICAgICAqXG4gICAgICovXG4gICAgZGlzcGxheUl0ZW0oaXRlbTogYW55KSB7XG4gICAgICAgIGlmIChpc0JsYW5rKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuY3VycmVudEl0ZW0gPSBpdGVtO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy52YWx1ZVRyYW5zZm9ybWVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVUcmFuc2Zvcm1lcihpdGVtKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0aGlzLmRhdGFTb3VyY2UubG9va3VwS2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy5kYXRhU291cmNlLmxvb2t1cEtleV07XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybnMgYSBsYWJlbCB0aGF0IGlzIHNob3duIHVuZGVyIHRoZSBzZWxlY3RlZCBpdGVtIHdoZW4gdXNlciBzZWxlY3Rpb24gaXMgPlxuICAgICAqIE1heFJlY2VudFNlbGVjdGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBtb3JlU2VsZWN0U3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBtb3JlU2VsZWN0ZWQgPSB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2VsZWN0ZWRPYmplY3RzKCkubGVuZ3RoIC1cbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5yZWNlbnRTZWxlY3RlZERpc3BsYXllZDtcbiAgICAgICAgaWYgKG1vcmVTZWxlY3RlZCA8IDIgJiYgIXRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5zaG93QWxsUmVjZW50bHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5zaG93QWxsUmVjZW50bHlTZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZUxpbms7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke21vcmVTZWxlY3RlZH0gbW9yZSBzZWxlY3RlZC4uLmA7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbiBjYXNlIG9mIG11bHRpc2VsZWN0ID0gZmFsc2UgY2hlY2sgaWYgd2Ugd2FudCB0byBzaG93IGEgc2VsZWN0ZWQgdmFsdWUgaW5zaWRlIHRoZSBpbnB1dFxuICAgICAqIGZpZWxkXG4gICAgICpcbiAgICAgKi9cbiAgICBzaW5nbGVWYWx1ZVNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuZGF0YVNvdXJjZS5zdGF0ZSAmJiBpc1ByZXNlbnQodGhpcy5kYXRhU291cmNlLnN0YXRlLmN1cnJlbnRJdGVtKVxuICAgICAgICAgICAgJiYgIXRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5hZGRNb2RlO1xuICAgIH1cblxuICAgIGhhc01lbnVUZW1wbGF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLm1lbnVUZW1wbGF0ZSk7XG4gICAgfVxuXG5cbiAgICBoYXNTZWxlY3Rpb25UZW1wbGF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnNlbGVjdGlvblRlbXBsYXRlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsLiBQbGVhc2Ugc2VlIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gICAgICogQXMgd2UgYXJlIHVzaW5nIERhdGFTb3VyY2UgaW50ZXJuYWxseSBmb3IgWyhuZ01vZGVsKV0gY2FzZSB3ZSBuZWVkIHRvIGRlZmZlciBEYXRhU291cmNlXG4gICAgICogaW5pdGlhbGl6YXRpb24gb25jZSB3ZSBoYXZlIGEgdmFsdWUgYW5kIHdlIG9ubHkgYWNjZXB0IFtdXG4gICAgICpcbiAgICAgKlxuICAgICAqID8gU2hvdWxkIHdlIGRvIHNvbWUgZGVlcGVyIGNvbXBhcmlzaW9uP1xuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5kYXRhU291cmNlKSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnVwZGF0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxTdGF0ZTogRGVmYXVsdFNlbGVjdGlvblN0YXRlID0gbmV3IERlZmF1bHRTZWxlY3Rpb25TdGF0ZSh0aGlzLm11bHRpc2VsZWN0KTtcbiAgICAgICAgICAgIGxldCBjaFN0YXRlOiBDaG9vc2VyU3RhdGUgPSBuZXcgQ2hvb3NlclN0YXRlKHNlbFN0YXRlLCB0aGlzLm11bHRpc2VsZWN0KTtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGFzb3VyY2UoY2hTdGF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS51cGRhdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRJbnRlcm5hbE1vZGVsKCk7XG4gICAgfVxuXG4gICAgaW5pdERhdGFzb3VyY2UoY2hvb3NlclN0YXRlPzogQ2hvb3NlclN0YXRlKTogdm9pZCB7XG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5kZXN0aW5hdGlvbkNsYXNzKSxcbiAgICAgICAgICAgICdZb3UgbmVlZCB0byBwcm92aWRlIGRlc3RpbmF0aW9uQ2xhc3Mgb3IgY3VzdG9tIERhdGFTb3VyY2UnKTtcblxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuaW5pdCh7XG4gICAgICAgICAgICBvYmo6IHRoaXMuZGVzdGluYXRpb25DbGFzcyxcbiAgICAgICAgICAgIHF1ZXJ5VHlwZTogUXVlcnlUeXBlLkZ1bGxUZXh0LFxuICAgICAgICAgICAgbG9va3VwS2V5OiB0aGlzLmZpZWxkLFxuICAgICAgICAgICAgc3RhdGU6IGNob29zZXJTdGF0ZSxcbiAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0aGlzLm11bHRpc2VsZWN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXNlZCBieSBuZ09uSW5pdCBhbmQgV3JpdGUgdmFsdWUgdG8gcmVhZCBzdGF0ZSBmcm9tIENob29zZXJTdGF0ZSBhbmQgc2V0IGl0IHRvIGludGVybmFsXG4gICAgICogbmdNb2RlbCBwcm9wZXJ0eVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0SW50ZXJuYWxNb2RlbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcm5hbENob29zZXJNb2RlbCA9IHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5zZWxlY3RlZE9iamVjdHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwgPSB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2VsZWN0ZWRPYmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZm9ybUNvbnRyb2wpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19