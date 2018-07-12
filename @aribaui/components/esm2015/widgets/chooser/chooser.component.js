/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
export const /** @type {?} */ CHOOSER_CONTROL_VALUE_ACCESSOR = {
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
        let /** @type {?} */ searchInput = this.elemementRef.nativeElement.querySelector('.ui-autocomplete-input-token');
        if (isPresent(searchInput)) {
            let /** @type {?} */ iconElement = document.createElement('span');
            iconElement.className = 'search-icon-right fa fa-fw fa-search';
            searchInput.appendChild(iconElement);
        }
        if (isPresent(this.selectionAppendTo) && isPresent(this.selectionViewElem)) {
            let /** @type {?} */ parentElem = this.selectionAppendTo instanceof ElementRef ?
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
        let /** @type {?} */ tokens = this.elemementRef.nativeElement.querySelectorAll('.ui-autocomplete .ui-autocomplete-token');
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
        let /** @type {?} */ maxLen = this.maxLength ? this.maxLength : ChooserDataSource.MaxLength;
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
        let /** @type {?} */ moreSelected = this.dataSource.state.selectedObjects().length -
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
            let /** @type {?} */ selState = new DefaultSelectionState(this.multiselect);
            let /** @type {?} */ chState = new ChooserState(selState, this.multiselect);
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
                template: `<div class="w-chooser ">

    <p-autoComplete #autoCompplete [(ngModel)]="internalChooserModel"
                    [suggestions]="dataSource.state.matches"
                    [multiple]="dataSource.state.multiselect"
                    [dropdown]="!dataSource.state.multiselect"
                    [minLength]="minLenForSearch"
                    [placeholder]="placeHolder"
                    [delay]="delay"
                    [disabled]="disabled"
                    (onDropdownClick)="onDropdownClick($event)"
                    (completeMethod)="match($event.query)"
                    (onSelect)="selectItem($event)"
                    (onUnselect)="removeValue($event)">


        <ng-template let-internalChooserModel pTemplate="item">
            <ng-template [ngIf]="!hasMenuTemplate()">
                {{ displayItem(internalChooserModel) }}
            </ng-template>
            <ng-template [embeddedItem]="menuTemplate" [item]="internalChooserModel"
                         *ngIf="hasMenuTemplate()"></ng-template>
        </ng-template>
    </p-autoComplete>

    <!--
        Wrap whole selection with one extra element so we can move it around

         see: selectionAppendTo
    -->
    <span #selectionView>
        <div class="w-chooser-selections"
             *ngIf="multiselect && dataSource.state.recentSelectedObjects.length > 0">

        <ng-template [ngIf]="!hasSelectionTemplate()">

            <!-- no selection template render it as it is from CORE-->
            <ul class="ui-autocomplete-multiple-container ui-widget ui-state-default "
                [ngClass]="{'ui-state-disabled':disabled,'ui-state-focus':autoCompleteComponent.focus}">

                <li #token *ngFor="let item of dataSource.state.recentSelectedObjects"
                    class="ui-autocomplete-token ui-state-highlight ui-corner-all" tabindex="0"
                    (keyup.delete)="removeValue(item)"
                    (keyup.backspace)="removeValue(item)">
					<span class="ui-autocomplete-token-icon sap-icon icon-decline"
                          (click)="removeValue(item)"></span>
                    <span class="ui-autocomplete-token-label">{{ displayItem(item) }}</span>
                </li>
            </ul>
        </ng-template>

            <!--Yes there is selection template let's iterate and push each item to be rendered-->
        <ng-template ngFor [ngForOf]="dataSource.state.recentSelectedObjects" let-item>
            <ng-template [embeddedItem]="selectionTemplate" [item]="item"
                         *ngIf="hasSelectionTemplate()"></ng-template>
        </ng-template>

        <ng-template [ngIf]="dataSource.showMoreSelected()">
			<span class="more-selected">
				<aw-hyperlink [size]="'small'" (action)="dataSource.state.toggleAllSelected()">
					{{moreSelectString()}}
				</aw-hyperlink>
			</span>
        </ng-template>
    </div>
    </span>


</div>

`,
                styles: [`/deep/ .ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-input,/deep/ .ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-multiple-container{width:100%}/deep/ .w-chooser .ui-autocomplete-multiple{line-height:normal}/deep/ .w-chooser .ui-autocomplete-input{width:100%}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button{right:0;position:absolute;border:0;width:30px;background:0 0}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button .pi{font-family:"SAP icon fonts";color:#767676;cursor:pointer;font-size:1.4em;margin-left:-.85em}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button .pi-caret-down:before{content:'\\e1ef'}/deep/ .w-chooser .ui-autocomplete-dropdown.ui-button input{padding-right:30px}/deep/ .w-chooser .ui-autocomplete-input-token{padding:0;margin:0;vertical-align:baseline;width:inherit}/deep/ .w-chooser .ui-autocomplete-input-token .fa{font-family:"SAP icon fonts";color:#767676;cursor:pointer;font-size:1.2em}/deep/ .w-chooser .ui-autocomplete-input-token .fa-search:before{content:'\\e00d'}/deep/ .w-chooser .ui-autocomplete-input-token input{width:inherit;padding-right:25px}/deep/ .w-chooser .ui-autocomplete-input-token span{position:absolute;right:5px;top:0;padding-top:.6em}/deep/ .w-chooser .ui-autocomplete-dropdown{height:36px}/deep/ .w-chooser .ui-autocomplete-panel .ui-autocomplete-list-item{padding:.65em 2em .65em .64em;margin:0}/deep/ body .ui-autocomplete.ui-autocomplete-multiple .ui-autocomplete-multiple-container{padding:.4em .5em .4em 1em}.w-chooser-selections{margin-top:2px}.w-chooser-selections ul{margin:0;padding:0}.w-chooser-selections .ui-autocomplete-multiple-container{border:0}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token{font-size:.85em;letter-spacing:.1px;font-weight:400;padding:0;background:#e0f2ff;margin-right:5px;margin-bottom:5px}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token-label{padding:4px 21px 4px 5px}.w-chooser-selections .ui-autocomplete-multiple-container .ui-autocomplete-token-icon{font-size:.78em;padding-right:.28em}.w-chooser-selections .ui-autocomplete-multiple-container .sap-icon{line-height:inherit}.w-chooser-selections .more-selected{display:inline-block}`],
                providers: [
                    CHOOSER_CONTROL_VALUE_ACCESSOR,
                    { provide: BaseFormComponent, useExisting: forwardRef(() => ChooserComponent) },
                    { provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders] }
                ]
            },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jaG9vc2VyL2Nob29zZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUdILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsWUFBWSxFQUFFLHFCQUFxQixFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0ZwRSxNQUFNLENBQUMsdUJBQU0sOEJBQThCLEdBQVE7SUFDL0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQXFGRixNQUFNLHVCQUF3QixTQUFRLGlCQUFpQjs7Ozs7OztJQTJHbkQsWUFBbUIsR0FBZ0IsRUFBVSxZQUF3QixFQUM1QixVQUE2QixFQUVoRCxlQUFrQztRQUNwRCxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBSmIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBRWhELG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7Ozs7eUJBdEdwQyxFQUFFOzs7OzsrQkFRSSxDQUFDOzs7OzsyQkFlSixJQUFJO3FCQW9CWCxHQUFHOzs7OzJCQWtCYyxJQUFJLFlBQVksRUFBRTtRQTRDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRTVCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1NBQy9COztRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO0tBQzFCOzs7O0lBRUQsUUFBUTtRQUNKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2RDtRQUVELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBR3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN4RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLHFCQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQzthQUN2RTtTQUNKO0tBQ0o7Ozs7Ozs7SUFPRCxlQUFlO1FBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQztTQUNWO1FBRUQscUJBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDM0QsOEJBQThCLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLHFCQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELFdBQVcsQ0FBQyxTQUFTLEdBQUcsc0NBQXNDLENBQUM7WUFDL0QsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QztRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLFlBQVksVUFBVSxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUVsRSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNoRTtLQUNKOzs7Ozs7SUFNRCxrQkFBa0I7UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxxQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQ3pELHlDQUF5QyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQixDQUFDLENBQUM7U0FDTjtLQUNKOzs7Ozs7Ozs7OztJQVVELEtBQUssQ0FBQyxPQUFlO1FBQ2pCLHFCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7UUFDM0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7UUFLdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDM0M7S0FDSjs7Ozs7Ozs7O0lBU0QsZUFBZSxDQUFDLEtBQVU7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ1g7Ozs7Ozs7Ozs7O0lBVUQsVUFBVSxDQUFDLElBQVM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXJDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSztnQkFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNuRDtLQUNKOzs7Ozs7OztJQVFELFdBQVcsQ0FBQyxJQUFTO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUV0QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRy9DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzNDO0tBRUo7Ozs7Ozs7Ozs7SUFTRCxXQUFXLENBQUMsSUFBUztRQUNqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFekMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBRXRDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FFMUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDMUI7S0FDSjs7Ozs7Ozs7SUFRRCxnQkFBZ0I7UUFDWixxQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTTtZQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDYjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4QjtRQUNELE1BQU0sQ0FBQyxHQUFHLFlBQVksbUJBQW1CLENBQUM7S0FDN0M7Ozs7Ozs7SUFRRCxtQkFBbUI7UUFDZixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO2VBQ3RFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0tBQ3pDOzs7O0lBRUQsZUFBZTtRQUNYLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3ZDOzs7O0lBR0Qsb0JBQW9CO1FBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDNUM7Ozs7Ozs7Ozs7O0lBV0QsVUFBVSxDQUFDLEtBQVU7UUFDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7U0FDVjtRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixxQkFBSSxRQUFRLEdBQTBCLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2xGLHFCQUFJLE9BQU8sR0FBaUIsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDNUI7Ozs7O0lBRUQsY0FBYyxDQUFDLFlBQTJCO1FBQ3RDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQ25DLDJEQUEyRCxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxRQUFRO1lBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSztZQUNyQixLQUFLLEVBQUUsWUFBWTtZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDaEMsQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7O0lBUU8saUJBQWlCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3ZFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdEU7UUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN4RDs7OztZQTVkUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNFYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyw0ckVBQTRyRSxDQUFDO2dCQUN0c0UsU0FBUyxFQUFFO29CQUNQLDhCQUE4QjtvQkFDOUIsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDO29CQUM3RSxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsRUFBQztpQkFDMUY7YUFHSjs7OztZQTdMZSxXQUFXO1lBYnZCLFVBQVU7WUFnQk4saUJBQWlCLHVCQXVTUixNQUFNLFNBQUMsV0FBVztZQXpTM0IsaUJBQWlCLHVCQTBTUixRQUFRLFlBQUksUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Ozt3QkF0RzlFLEtBQUs7OEJBUUwsS0FBSzsrQkFRTCxLQUFLOzBCQU9MLEtBQUs7eUJBUUwsS0FBSztnQ0FRTCxLQUFLO29CQUlMLEtBQUs7K0JBT0wsS0FBSztvQkFJTCxLQUFLOzBCQU9MLE1BQU07MkJBb0JOLFlBQVksU0FBQyxVQUFVO2dDQUl2QixZQUFZLFNBQUMsZUFBZTtvQ0FHNUIsU0FBUyxTQUFDLGVBQWU7Z0NBR3pCLFNBQVMsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTa2lwU2VsZixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtBdXRvQ29tcGxldGV9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge2Fzc2VydCwgRW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtEQVRBX1NPVVJDRX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcbmltcG9ydCB7Q2hvb3NlckRhdGFTb3VyY2V9IGZyb20gJy4vY2hvb3Nlci1kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0RhdGFQcm92aWRlcnN9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXByb3ZpZGVycyc7XG5pbXBvcnQge0RhdGFGaW5kZXJzLCBRdWVyeVR5cGV9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtDaG9vc2VyU3RhdGUsIERlZmF1bHRTZWxlY3Rpb25TdGF0ZX0gZnJvbSAnLi9jaG9vc2VyLXN0YXRlJztcblxuXG4vKipcbiAqIFR5cGVhaGVhZCBjaG9vc2VyIHRoYXQgc3VwcG9ydHMgYm90aCBzaW5nbGUgYW5kIG11bHRpLXNlbGVjdC4gTm90IGxpa2UgRHJvcGRvd24sIHRoaXMgY2hvb3NlclxuICogcmVxdWlyZXMgbGl0dGxlIGJpdCBkaWZmZXJlbnQgc2V0dXAuIEl0IHJlcXVpcmVzIGF0IG1pbmltdW0gQElucHV0IGRhdGFTb3VyY2Ugb3JcbiAqIGRlc3RpbmF0aW9uQ2xhc3NcbiAqXG4gKlxuICogQnkgZGVmYXVsdCBjaG9vc2VyIGlzIG11bHRpLXNlbGVjdC4gSWYgeW91IHdhbnQgc2luZ2xlIHNlbGVjdCB0aGVuIHlvdSBtdXN0IHByb3ZpZGUgbXVsdGktc2VsZWN0XG4gKiB3aXRoIEBJbnB1dC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIEluIHNpbXBsZSBzY2VuYXJpbyB5b3UgY2FuIHVzZSBDaG9vc2VyIGxpa2Ugc286XG4gKlxuICpcbiAqIGBgYFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ2Nob29zZXItYXBwJyAsXG4gKiAgICAgIHRlbXBsYXRlOiBgPGF3LWNob29zZXIgIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgbmFtZT1cImNvbG9yXCInXG4gKiAgICAgICAgICAgICAgICAgICAgICBbZGF0YVNvdXJjZV09XCJkc1wiPjwvYXctY2hvb3Nlcj5gXG4gKiAgfSlcbiAqICBleHBvcnQgY2xhc3MgTXlDaG9vc2VyQXBwXG4gKiAge1xuICpcbiAqICAgICAgZHM6IENob29zZXJEYXRhU291cmNlO1xuICpcbiAqICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGE6IERhdGFQcm92aWRlcnMsIHByaXZhdGUgZmluZGVyczogRGF0YUZpbmRlcnMpe1xuICogICAgICAgICAgdGhpcy5kcyA9IG5ldyBDaG9vc2VyRGF0YVNvdXJjZSh0aGlzLmRhdGEsIHRoaXMuZmluZGVycyk7XG4gKlxuICogICAgICAgdGhpcy5kcy5pbml0KHtcbiAqICAgICAgICAgICBvYmo6IFsnYmx1ZScsICdyZWQnLCAneWVsbG93J10sIHF1ZXJ5VHlwZTogUXVlcnlUeXBlLkZ1bGxUZXh0LCBzdGF0ZTogbnVsbCxcbiAqICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRydWVcbiAqICAgICAgIH0pO1xuICpcbiAqICAgICB9XG4gKiAgfVxuICpcbiAqIGBgYGBcbiAqICBBYm92ZSBleGFtcGxlIHdpbGwgdXNlIHByb3ZpZGVkIGRhdGFTb3VyY2UgYW5kIHJlbmRlciBtdWx0aS1zZWxlY3QgY2hvb3Nlci4gV2l0aCBkZWZhdWx0XG4gKiAgaW1wbGVtZW50YXRpb24gIHNlbGVjdGVkIHZhbHVlcyB3aWxsIGFwcGVhciBhcyBhIHRhZ3MgdW5kZXIgdGhlIGlucHV0IGJveFxuICpcbiAqXG4gKlxuICogKiAjIyMgRXhhbXBsZVxuICpcbiAqICBJbiB0aGlzIGV4YW1wbGUgd2UgcHJvdmlkZSBjdXN0b20gdGVtcGxhdGUgdG8gY2hhbmdlIHRoZSB3YXkgaG93IGNob29zZXIncyBNZW51SXRlbSBhcmVcbiAqICAgICByZW5kZXJlZCBhcyB3ZWxsIGFzIHRlbXBsYXRlIGZvciB0aGUgc2VsZWN0aW9uIGl0ZW0gbG9va3MgbGlrZVxuICpcbiAqIGBgYFxuICogIEBDb21wb25lbnQoe1xuICogICAgICBzZWxlY3RvcjogJ2Nob29zZXItYXBwJyAsXG4gKiAgICAgIHRlbXBsYXRlOiBgPGF3LWNob29zZXIgIG5hbWU9XCJjb21tb2RpdHlcIicgW2RhdGFTb3VyY2VdPVwiZHNcIj5cbiAqXG4gKiAgICAgICAgICA8bmctdGVtcGxhdGUgI21lbnVJdGVtIGxldC1pdGVtPlxuICogICAgICAgICAgICAgXHQ8c3Bhbj5cbiAqICAgICAgICAgICAgIFx0XHQ8aSBjbGFzcz1cImZhIGZhLWVudmlyYSBcIiA+PC9pPlxuICogICAgICAgICAgICAgXHRcdHt7aXRlbX19XG4gKiAgICAgICAgICAgICBcdDwvc3Bhbj5cbiAqXG4gKiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjc2VsZWN0aW9uSXRlbSBsZXQtaXRlbT5cbiAqICAgICAgICAgICAgIFx0PHNwYW4gY2xhc3M9XCJ0YWcgdGFnLWNpcmNsZVwiPlxuICogICAgICAgICAgICAgXHRcdGl0ZW06IHt7aXRlbSB9fVxuICogICAgICAgICAgICAgXHRcdDxpIGNsYXNzPVwiZmEgZmEtY2xvc2VcIiAoY2xpY2spPVwiY2hvb3Nlci5yZW1vdmVWYWx1ZShpdGVtKVwiPjwvaT5cbiAqICAgICAgICAgICAgIFx0PC9zcGFuPlxuICpcbiAqXG4gKiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICpcbiAqXG4gKiAgICAgICAgICA8L2F3LWNob29zZXI+XG4gKiAgICAgIGBcbiAqICAgICAgc3R5bGU6IFtgXG4gKiAgICAgICAgICAgICAgLnRhZy1jaXJjbGUge1xuICogICAgICAgICAgICAgIFx0Ym9yZGVyLXJhZGl1czogNnJlbTtcbiAqICAgICAgICAgICAgICBcdGhlaWdodDogN3JlbTtcbiAqICAgICAgICAgICAgICBcdGNvbG9yOiAjZThlZWYxO1xuICogICAgICAgICAgICAgIFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSg1MywgNTYsIDU4LCAwLjY3KTtcbiAqICAgICAgICAgICAgICBcdGxpbmUtaGVpZ2h0OiA2cmVtO1xuICogICAgICAgICAgICAgIH1cbiAqICAgICAgYF1cbiAqICB9KVxuICpcbiAqIGBgYGBcbiAqXG4gKiAgSW4gYWJvdmUgZXhhbXBsZSB3ZSBjaGFuZ2UgaG93IHRoZSBjaG9vc2VyJ3MgbWVudSBpdGVtIGxvb2sgbGlrZSBhcyB3ZWxsIGFzIHdlIGRlZmluZSBjdXN0b21cbiAqICAgICB0ZW1wbGF0ZSBmb3Igc2VsZWN0aW9uIGl0ZW0gdG8gdHVybiBhbGwgc2VsZWN0aW9uIHRvIGNpcmNsZXMgd2l0aCB0ZXh0IGluIHRoZSBtaWRkbGUuXG4gKlxuICpcbiAqXG4gKi9cblxuZXhwb3J0IGNvbnN0IENIT09TRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENob29zZXJDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctY2hvb3NlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidy1jaG9vc2VyIFwiPlxuXG4gICAgPHAtYXV0b0NvbXBsZXRlICNhdXRvQ29tcHBsZXRlIFsobmdNb2RlbCldPVwiaW50ZXJuYWxDaG9vc2VyTW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICBbc3VnZ2VzdGlvbnNdPVwiZGF0YVNvdXJjZS5zdGF0ZS5tYXRjaGVzXCJcbiAgICAgICAgICAgICAgICAgICAgW211bHRpcGxlXT1cImRhdGFTb3VyY2Uuc3RhdGUubXVsdGlzZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICBbZHJvcGRvd25dPVwiIWRhdGFTb3VyY2Uuc3RhdGUubXVsdGlzZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICBbbWluTGVuZ3RoXT1cIm1pbkxlbkZvclNlYXJjaFwiXG4gICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZUhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgIFtkZWxheV09XCJkZWxheVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIChvbkRyb3Bkb3duQ2xpY2spPVwib25Ecm9wZG93bkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoY29tcGxldGVNZXRob2QpPVwibWF0Y2goJGV2ZW50LnF1ZXJ5KVwiXG4gICAgICAgICAgICAgICAgICAgIChvblNlbGVjdCk9XCJzZWxlY3RJdGVtKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAob25VbnNlbGVjdCk9XCJyZW1vdmVWYWx1ZSgkZXZlbnQpXCI+XG5cblxuICAgICAgICA8bmctdGVtcGxhdGUgbGV0LWludGVybmFsQ2hvb3Nlck1vZGVsIHBUZW1wbGF0ZT1cIml0ZW1cIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaGFzTWVudVRlbXBsYXRlKClcIj5cbiAgICAgICAgICAgICAgICB7eyBkaXNwbGF5SXRlbShpbnRlcm5hbENob29zZXJNb2RlbCkgfX1cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW2VtYmVkZGVkSXRlbV09XCJtZW51VGVtcGxhdGVcIiBbaXRlbV09XCJpbnRlcm5hbENob29zZXJNb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJoYXNNZW51VGVtcGxhdGUoKVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9wLWF1dG9Db21wbGV0ZT5cblxuICAgIDwhLS1cbiAgICAgICAgV3JhcCB3aG9sZSBzZWxlY3Rpb24gd2l0aCBvbmUgZXh0cmEgZWxlbWVudCBzbyB3ZSBjYW4gbW92ZSBpdCBhcm91bmRcblxuICAgICAgICAgc2VlOiBzZWxlY3Rpb25BcHBlbmRUb1xuICAgIC0tPlxuICAgIDxzcGFuICNzZWxlY3Rpb25WaWV3PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidy1jaG9vc2VyLXNlbGVjdGlvbnNcIlxuICAgICAgICAgICAgICpuZ0lmPVwibXVsdGlzZWxlY3QgJiYgZGF0YVNvdXJjZS5zdGF0ZS5yZWNlbnRTZWxlY3RlZE9iamVjdHMubGVuZ3RoID4gMFwiPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaGFzU2VsZWN0aW9uVGVtcGxhdGUoKVwiPlxuXG4gICAgICAgICAgICA8IS0tIG5vIHNlbGVjdGlvbiB0ZW1wbGF0ZSByZW5kZXIgaXQgYXMgaXQgaXMgZnJvbSBDT1JFLS0+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtbXVsdGlwbGUtY29udGFpbmVyIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLXN0YXRlLWZvY3VzJzphdXRvQ29tcGxldGVDb21wb25lbnQuZm9jdXN9XCI+XG5cbiAgICAgICAgICAgICAgICA8bGkgI3Rva2VuICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRhdGFTb3VyY2Uuc3RhdGUucmVjZW50U2VsZWN0ZWRPYmplY3RzXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtdG9rZW4gdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGxcIiB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5dXAuZGVsZXRlKT1cInJlbW92ZVZhbHVlKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleXVwLmJhY2tzcGFjZSk9XCJyZW1vdmVWYWx1ZShpdGVtKVwiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXRva2VuLWljb24gc2FwLWljb24gaWNvbi1kZWNsaW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZVZhbHVlKGl0ZW0pXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS10b2tlbi1sYWJlbFwiPnt7IGRpc3BsYXlJdGVtKGl0ZW0pIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8IS0tWWVzIHRoZXJlIGlzIHNlbGVjdGlvbiB0ZW1wbGF0ZSBsZXQncyBpdGVyYXRlIGFuZCBwdXNoIGVhY2ggaXRlbSB0byBiZSByZW5kZXJlZC0tPlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiZGF0YVNvdXJjZS5zdGF0ZS5yZWNlbnRTZWxlY3RlZE9iamVjdHNcIiBsZXQtaXRlbT5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbZW1iZWRkZWRJdGVtXT1cInNlbGVjdGlvblRlbXBsYXRlXCIgW2l0ZW1dPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJoYXNTZWxlY3Rpb25UZW1wbGF0ZSgpXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiZGF0YVNvdXJjZS5zaG93TW9yZVNlbGVjdGVkKClcIj5cblx0XHRcdDxzcGFuIGNsYXNzPVwibW9yZS1zZWxlY3RlZFwiPlxuXHRcdFx0XHQ8YXctaHlwZXJsaW5rIFtzaXplXT1cIidzbWFsbCdcIiAoYWN0aW9uKT1cImRhdGFTb3VyY2Uuc3RhdGUudG9nZ2xlQWxsU2VsZWN0ZWQoKVwiPlxuXHRcdFx0XHRcdHt7bW9yZVNlbGVjdFN0cmluZygpfX1cblx0XHRcdFx0PC9hdy1oeXBlcmxpbms+XG5cdFx0XHQ8L3NwYW4+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gICAgPC9zcGFuPlxuXG5cbjwvZGl2PlxuXG5gLFxuICAgIHN0eWxlczogW2AvZGVlcC8gLnVpLWZsdWlkIC51aS1hdXRvY29tcGxldGUudWktYXV0b2NvbXBsZXRlLWRkIC51aS1hdXRvY29tcGxldGUtaW5wdXQsL2RlZXAvIC51aS1mbHVpZCAudWktYXV0b2NvbXBsZXRlLnVpLWF1dG9jb21wbGV0ZS1kZCAudWktYXV0b2NvbXBsZXRlLW11bHRpcGxlLWNvbnRhaW5lcnt3aWR0aDoxMDAlfS9kZWVwLyAudy1jaG9vc2VyIC51aS1hdXRvY29tcGxldGUtbXVsdGlwbGV7bGluZS1oZWlnaHQ6bm9ybWFsfS9kZWVwLyAudy1jaG9vc2VyIC51aS1hdXRvY29tcGxldGUtaW5wdXR7d2lkdGg6MTAwJX0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWRyb3Bkb3duLnVpLWJ1dHRvbntyaWdodDowO3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlcjowO3dpZHRoOjMwcHg7YmFja2dyb3VuZDowIDB9L2RlZXAvIC53LWNob29zZXIgLnVpLWF1dG9jb21wbGV0ZS1kcm9wZG93bi51aS1idXR0b24gLnBpe2ZvbnQtZmFtaWx5OlwiU0FQIGljb24gZm9udHNcIjtjb2xvcjojNzY3Njc2O2N1cnNvcjpwb2ludGVyO2ZvbnQtc2l6ZToxLjRlbTttYXJnaW4tbGVmdDotLjg1ZW19L2RlZXAvIC53LWNob29zZXIgLnVpLWF1dG9jb21wbGV0ZS1kcm9wZG93bi51aS1idXR0b24gLnBpLWNhcmV0LWRvd246YmVmb3Jle2NvbnRlbnQ6J1xcXFxlMWVmJ30vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWRyb3Bkb3duLnVpLWJ1dHRvbiBpbnB1dHtwYWRkaW5nLXJpZ2h0OjMwcHh9L2RlZXAvIC53LWNob29zZXIgLnVpLWF1dG9jb21wbGV0ZS1pbnB1dC10b2tlbntwYWRkaW5nOjA7bWFyZ2luOjA7dmVydGljYWwtYWxpZ246YmFzZWxpbmU7d2lkdGg6aW5oZXJpdH0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWlucHV0LXRva2VuIC5mYXtmb250LWZhbWlseTpcIlNBUCBpY29uIGZvbnRzXCI7Y29sb3I6Izc2NzY3NjtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MS4yZW19L2RlZXAvIC53LWNob29zZXIgLnVpLWF1dG9jb21wbGV0ZS1pbnB1dC10b2tlbiAuZmEtc2VhcmNoOmJlZm9yZXtjb250ZW50OidcXFxcZTAwZCd9L2RlZXAvIC53LWNob29zZXIgLnVpLWF1dG9jb21wbGV0ZS1pbnB1dC10b2tlbiBpbnB1dHt3aWR0aDppbmhlcml0O3BhZGRpbmctcmlnaHQ6MjVweH0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLWlucHV0LXRva2VuIHNwYW57cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6NXB4O3RvcDowO3BhZGRpbmctdG9wOi42ZW19L2RlZXAvIC53LWNob29zZXIgLnVpLWF1dG9jb21wbGV0ZS1kcm9wZG93bntoZWlnaHQ6MzZweH0vZGVlcC8gLnctY2hvb3NlciAudWktYXV0b2NvbXBsZXRlLXBhbmVsIC51aS1hdXRvY29tcGxldGUtbGlzdC1pdGVte3BhZGRpbmc6LjY1ZW0gMmVtIC42NWVtIC42NGVtO21hcmdpbjowfS9kZWVwLyBib2R5IC51aS1hdXRvY29tcGxldGUudWktYXV0b2NvbXBsZXRlLW11bHRpcGxlIC51aS1hdXRvY29tcGxldGUtbXVsdGlwbGUtY29udGFpbmVye3BhZGRpbmc6LjRlbSAuNWVtIC40ZW0gMWVtfS53LWNob29zZXItc2VsZWN0aW9uc3ttYXJnaW4tdG9wOjJweH0udy1jaG9vc2VyLXNlbGVjdGlvbnMgdWx7bWFyZ2luOjA7cGFkZGluZzowfS53LWNob29zZXItc2VsZWN0aW9ucyAudWktYXV0b2NvbXBsZXRlLW11bHRpcGxlLWNvbnRhaW5lcntib3JkZXI6MH0udy1jaG9vc2VyLXNlbGVjdGlvbnMgLnVpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZS1jb250YWluZXIgLnVpLWF1dG9jb21wbGV0ZS10b2tlbntmb250LXNpemU6Ljg1ZW07bGV0dGVyLXNwYWNpbmc6LjFweDtmb250LXdlaWdodDo0MDA7cGFkZGluZzowO2JhY2tncm91bmQ6I2UwZjJmZjttYXJnaW4tcmlnaHQ6NXB4O21hcmdpbi1ib3R0b206NXB4fS53LWNob29zZXItc2VsZWN0aW9ucyAudWktYXV0b2NvbXBsZXRlLW11bHRpcGxlLWNvbnRhaW5lciAudWktYXV0b2NvbXBsZXRlLXRva2VuLWxhYmVse3BhZGRpbmc6NHB4IDIxcHggNHB4IDVweH0udy1jaG9vc2VyLXNlbGVjdGlvbnMgLnVpLWF1dG9jb21wbGV0ZS1tdWx0aXBsZS1jb250YWluZXIgLnVpLWF1dG9jb21wbGV0ZS10b2tlbi1pY29ue2ZvbnQtc2l6ZTouNzhlbTtwYWRkaW5nLXJpZ2h0Oi4yOGVtfS53LWNob29zZXItc2VsZWN0aW9ucyAudWktYXV0b2NvbXBsZXRlLW11bHRpcGxlLWNvbnRhaW5lciAuc2FwLWljb257bGluZS1oZWlnaHQ6aW5oZXJpdH0udy1jaG9vc2VyLXNlbGVjdGlvbnMgLm1vcmUtc2VsZWN0ZWR7ZGlzcGxheTppbmxpbmUtYmxvY2t9YF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENIT09TRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaG9vc2VyQ29tcG9uZW50KX0sXG4gICAgICAgIHtwcm92aWRlOiBEQVRBX1NPVVJDRSwgdXNlQ2xhc3M6IENob29zZXJEYXRhU291cmNlLCBkZXBzOiBbRGF0YVByb3ZpZGVycywgRGF0YUZpbmRlcnNdfVxuICAgIF1cblxuXG59KVxuZXhwb3J0IGNsYXNzIENob29zZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICAvKipcbiAgICAgKiBNYXggbnVtYmVyIG9mIGl0ZW1zIHJldHVybiBhdCBzaW5nbGUgTWF0Y2ggc28gd2UgZG8gbm90IHJldHVybiAxMDAwIGl0ZW1zIGF0IHNpbmdsZSB0aW1lLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtYXhMZW5ndGg6IG51bWJlciA9IDEwO1xuXG5cbiAgICAvKipcbiAgICAgKiBNYXggbnVtYmVyIG9mIGl0ZW1zIHJldHVybiBhdCBzaW5nbGUgTWF0Y2ggc28gd2UgZG8gbm90IHJldHVybiAxMDAwIGl0ZW1zIGF0IHNpbmdsZSB0aW1lLlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtaW5MZW5Gb3JTZWFyY2g6IG51bWJlciA9IDE7XG5cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdHRlciB1c2VkIHRvIGZvcm1hdCBlYWNoIHNlbGVjdGlvbiBhbmQgc2VsZWN0ZWQgb2JqZWN0IGZvciBkaXNwbGF5LlxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB2YWx1ZVRyYW5zZm9ybWVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSXMgdGhpcyBtdWx0aXNlbGVjdFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtdWx0aXNlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIEJ5IGRlZmF1bHQgQ2hvb3NlckRhdGFTb3VyY2Ugd2lsbCBiZSBjcmVhdGVkIGJ1dCB0aGVyZSBpcyBhIG9wdGlvbiB0byBzZXRcbiAgICAgKiBjdXN0b20gb25lIG9uIGFwcGxpY2F0aW9uIGxldmVsXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkYXRhU291cmNlOiBDaG9vc2VyRGF0YVNvdXJjZTtcblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSB3ZSB3YW50IHRvIGNoYW5nZSB0aGUgcGxhY2Ugd2hlcmUgc2VsZWN0aW9uIGlzIHJlbmRlcmVkIHVzZSB0aGlzIGFwcGVuZFRvIHByb3BlcnR5XG4gICAgICogYW5kIGl0IHdpbGwgdXNlIERPTSBvcGVyYXRpb24gYXBwZW5kQ2hpbGQoKSB0byBtb3ZlIHNlbGVjdGlvblZpZXcgdW5kZXIgZGlmZmVyZW50IHBhcmVudFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0aW9uQXBwZW5kVG86IEVsZW1lbnRSZWY7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgZGVsYXk6IG51bWJlciA9IDMwMDtcblxuXG4gICAgLyoqXG4gICAgICogVGFyZ2V0IHR5cGUgdG8gcmVuZGVyLiBEYXRhIHdpbGwgYmUgcmVhZCBmcm9tIHRoZSByZWdpc3RlcmVkIERhdGFQcm92aWRlclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGVzdGluYXRpb25DbGFzczogc3RyaW5nO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGZpZWxkOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3QgYSBpdGVtXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25TZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCBtb2RlbCB0byBsaXN0ZW4gZm9yIElucHV0IHZhbHVlIGNoYW5nZXNcbiAgICAgKi9cbiAgICBpbnRlcm5hbENob29zZXJNb2RlbDogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBFbWJlZGRlZCB0ZW1wbGF0ZSBkZWZpbmVkIGJ5IHVzZXIuIElmIHVzZXIgZG9lcyBub3QgcHJvdmlkZSBhbnkgdGVtcGxhdGUgdGhlbiB3aGVuIHJlbmRlcmluZ1xuICAgICAqIGFuIGl0ZW0gd2UgYXNzdW1lIHdlIGFyZSBkZWFsaW5nIHdpdGggcHJpbWl0aXZlIHR5cGVzIGFuZCBjYWxsIG9uIGVhY2ggaXRlbSB0b1N0cmluZygpLCBpZlxuICAgICAqIHdlIGFyZSBkZWFsaW5nIHdpdGggb2JqZWN0LCB0aGVuIHdlIGV4cGVjdCB1c2VyIHRvIHByb3ZpZGUgYSB0ZW1wbGF0ZSBhbmQgdGVsbCB0aGUgY2hvb3NlclxuICAgICAqIGhvdyBpdGVtcyBzaG91bGRzIGJlIGhhbmRsZWQgb3IgYXQgbGVhc3QgdmFsdWVUcmFuc2Zvcm1lciBzbyB3ZSBrbm93IGhvdyB0byBjb252ZXJ0IHRoaXNcbiAgICAgKiB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEVhY2ggb2JqZWN0IGNhbiBwcm92aWRlIGl0cyBvd24gdG9TdHJpbmcgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdtZW51SXRlbScpXG4gICAgbWVudVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICBAQ29udGVudENoaWxkKCdzZWxlY3Rpb25JdGVtJylcbiAgICBzZWxlY3Rpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2F1dG9Db21wcGxldGUnKVxuICAgIGF1dG9Db21wbGV0ZUNvbXBvbmVudDogQXV0b0NvbXBsZXRlO1xuXG4gICAgQFZpZXdDaGlsZCgnc2VsZWN0aW9uVmlldycpXG4gICAgc2VsZWN0aW9uVmlld0VsZW06IEVsZW1lbnRSZWY7XG5cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIHNlbGVjdGlvbiBpcyA+IG1heCBzZWxlY3Rpb24sIHRoZW4gc2hvdyBoaWRlIGxpbmsuXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWRlTGluazogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHByaXZhdGUgZWxlbWVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoREFUQV9TT1VSQ0UpIHByaXZhdGUgX2RlZmF1bHREUzogQ2hvb3NlckRhdGFTb3VyY2UsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEJhc2VGb3JtQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudCkge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5wbGFjZUhvbGRlcikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMucGxhY2VIb2xkZXIgPSBpMThuLmluc3RhbnQoJ1dpZGdldHMuY2hvb3Nlci5wbGFjZUhvbGRlcicpO1xuICAgICAgICAgICAgdGhpcy5wbGFjZUhvbGRlciA9ICdTZWFyY2gnO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuaGlkZUxpbmsgPSBpMThuLmluc3RhbnQoJ1dpZGdldHMuY2hvb3Nlci5oaWRlU2VsZWN0aW9uJyk7XG4gICAgICAgIHRoaXMuaGlkZUxpbmsgPSAnSGlkZSc7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5kYXRhU291cmNlKSkge1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLl9kZWZhdWx0RFM7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZm9ybUNvbnRyb2wpICYmIGlzUHJlc2VudCh0aGlzLmZvcm1Db250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLnVwZGF0ZVZhbHVlKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SW50ZXJuYWxNb2RlbCgpO1xuXG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGFuZGFsb25lKSB7XG4gICAgICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IDxGb3JtQ29udHJvbD4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHNbdGhpcy5uYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBTZWFyY2ggaWNvbiBpbiBjYXNlIG9mIG11bHRpc2VsZWN0LlxuICAgICAqIHRvZG86IE9uY2UgUHJpbWVORyB3aWxsIHByb3ZpZGUgYSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBkZWZhdWx0IGJlaGF2aW9yIHJlbW92ZSBpdFxuICAgICAqXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlYXJjaElucHV0ID0gdGhpcy5lbGVtZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy51aS1hdXRvY29tcGxldGUtaW5wdXQtdG9rZW4nKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHNlYXJjaElucHV0KSkge1xuICAgICAgICAgICAgbGV0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ3NlYXJjaC1pY29uLXJpZ2h0IGZhIGZhLWZ3IGZhLXNlYXJjaCc7XG4gICAgICAgICAgICBzZWFyY2hJbnB1dC5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuc2VsZWN0aW9uQXBwZW5kVG8pICYmIGlzUHJlc2VudCh0aGlzLnNlbGVjdGlvblZpZXdFbGVtKSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudEVsZW0gPSB0aGlzLnNlbGVjdGlvbkFwcGVuZFRvIGluc3RhbmNlb2YgRWxlbWVudFJlZiA/XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25BcHBlbmRUby5uYXRpdmVFbGVtZW50IDogdGhpcy5zZWxlY3Rpb25BcHBlbmRUbztcblxuICAgICAgICAgICAgcGFyZW50RWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNlbGVjdGlvblZpZXdFbGVtLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmVlZCB0byBjaGFuZ2UgY3VycmVudCBiZWhhdmlvciBzaW5jZSB3ZSB3YW50IHRvIHNob3cgc2VsZWN0aW9uIHVuZGVyIHRoZSBjaG9vc2VyLiBLXG4gICAgICpcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhU291cmNlLnN0YXRlLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG9rZW5zID0gdGhpcy5lbGVtZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgJy51aS1hdXRvY29tcGxldGUgLnVpLWF1dG9jb21wbGV0ZS10b2tlbicpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRva2VucykgJiYgdG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRva2Vucy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gdmFsdWUgaXMgZW50ZXJlZCBpbnRvIHNlYXJjaCBib3gsIHdlIGFzayBvdXIgRGF0YVNvdXJjZSB0byBtYXRjaCB0aGlzIHBhdHRlcm5cbiAgICAgKiBhZ2FpbnN0IGRhdGEgcmVwb3NpdG9yeS4gSXQgd2lsbCByZXRyaWV2ZSBhbGwgcG9zc2libGUgbWF0Y2hlcyBsaW1pdGVkIGJ5IE1heExlbiBhbmQgdGhpc1xuICAgICAqIGlzIGFnYWluIGZpbHRlcmVkIHNvIGl0IGRvZXMgbm90IGluY2x1ZGUgYWxyZWFkeSBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKlxuICAgICAqICB0aGUgbWF0Y2hlZCByZXN1bHRlZCBpcyBzYXZlZCBpbiB0aGU6IHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5tYXRjaGVzXG4gICAgICovXG4gICAgbWF0Y2gocGF0dGVybjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBtYXhMZW4gPSB0aGlzLm1heExlbmd0aCA/IHRoaXMubWF4TGVuZ3RoIDogQ2hvb3NlckRhdGFTb3VyY2UuTWF4TGVuZ3RoO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZmluZChwYXR0ZXJuLCBtYXhMZW4pO1xuXG5cbiAgICAgICAgLy8gZml4OiBmb3IgdGVzdHM6IEluIHZlcnNpb24gNCB3ZSBuZWVkIHRvIGV4cGxpY2l0bHkgZm9jdXMgaW5wdXQgb3RoZXJ3aXNlIGF1dG9jb21wbGV0ZVxuICAgICAgICAvLyBkb2Vzbid0IGdpdmUgdXMgYW55IHBvcHVwIHBhbmVsXG4gICAgICAgIGlmICh0aGlzLmVudi5pblRlc3QgJiYgaXNQcmVzZW50KHRoaXMuYXV0b0NvbXBsZXRlQ29tcG9uZW50KSkge1xuICAgICAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVDb21wb25lbnQuZm9jdXNJbnB1dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEludm9rZWQgYnkgRHJvcGRvd24gYnV0dG9uIGluIGNhc2Ugb2Ygc2luZ2xlIHNlbGVjdCBhbmQgaGVyZSB3ZSB3YW50IHRvIGludm9rZSBtYXRjaFxuICAgICAqIHRvIHJldHJpZXZlIGFsbCBzdWdnZXN0aW9ucyB3aXRob3V0IGFueSBmaWx0ZXJcbiAgICAgKlxuICAgICAqL1xuICAgIG9uRHJvcGRvd25DbGljayhldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMubWF0Y2goJyonKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1hdGNoKCcqJyk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaG9vc2VyIHN0YXRlIGlzIHVwZGF0ZWQgIHdpdGggdXNlciBzZWxlY3Rpb24uIFBsZWFzZSBzZWUgd3JpdGVWYWx1ZS4gV2hlbiBkbyBub3QgbmVlZFxuICAgICAqIGNhbGwgYW55dGhpbmcgYWRkaXRpb25hbCBhcyBpbnRlcm5hbENob29zZXJNb2RlbCBhbmQgdGhpcy5jaG9vc2VyU3RhdGUuc2VsZWN0ZWRPYmplY3RzKClcbiAgICAgKiBzaGFyZXMgdGhlIHNhbWUgcmVmZXJlbmNlcyBzbyBpdHMgaW1wb3J0YW50IHRoYXQgd2UgZmlyc3Qgc2F2ZSByZWZlcmVuY2UgdG9cbiAgICAgKiB0aGlzLmNob29zZXJTdGF0ZS5zZWxlY3RlZE9iamVjdHMoKSBhbmQgdGhlbiBiYWNrIHRvIGludGVybmFsQ2hvb3Nlck1vZGVsXG4gICAgICpcbiAgICAgKi9cbiAgICBzZWxlY3RJdGVtKGl0ZW06IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uLmVtaXQodGhpcy5pbnRlcm5hbENob29zZXJNb2RlbCk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5pbnRlcm5hbENob29zZXJNb2RlbCwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KHtvbmx5U2VsZjogdHJ1ZX0pO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5hZGRNb2RlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2VkKHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUudXBkYXRlZFNlbGVjdGVkT2JqZWN0cyhpdGVtKTtcblxuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuYWRkTW9kZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlQ29tcG9uZW50LmlucHV0RUwubmF0aXZlRWxlbWVudC52YWx1ZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5SXRlbSh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVbnNlbGVjdCBpdGVtXG4gICAgICpcbiAgICAgKi9cbiAgICByZW1vdmVWYWx1ZShpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnN0YXRlLmFkZE1vZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUudXBkYXRlZFNlbGVjdGVkT2JqZWN0cyhpdGVtKTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnN0YXRlLmFkZE1vZGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsID0gdGhpcy5kYXRhU291cmNlLnN0YXRlLnNlbGVjdGVkT2JqZWN0cygpO1xuXG4gICAgICAgIHRoaXMub25TZWxlY3Rpb24uZW1pdCh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoe29ubHlTZWxmOiB0cnVlfSk7XG5cbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlZCh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcblxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5hdXRvQ29tcGxldGVDb21wb25lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZUNvbXBvbmVudC5mb2N1c0lucHV0KCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ29udmVydCBhIG9iamVjdCBpZiBhbnkgaW50byB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAgICpcbiAgICAgKiB0b2RvOiBpbXBsZW1lbnQgYmV0dGVyIHdheSBob3cgdG8gd29yayB3aXRoIG9iamVjdHNcbiAgICAgKlxuICAgICAqL1xuICAgIGRpc3BsYXlJdGVtKGl0ZW06IGFueSkge1xuICAgICAgICBpZiAoaXNCbGFuayhpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLnN0YXRlLmN1cnJlbnRJdGVtID0gaXRlbTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMudmFsdWVUcmFuc2Zvcm1lcikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlVHJhbnNmb3JtZXIoaXRlbSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5kYXRhU291cmNlLmxvb2t1cEtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtW3RoaXMuZGF0YVNvdXJjZS5sb29rdXBLZXldO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGEgbGFiZWwgdGhhdCBpcyBzaG93biB1bmRlciB0aGUgc2VsZWN0ZWQgaXRlbSB3aGVuIHVzZXIgc2VsZWN0aW9uIGlzID5cbiAgICAgKiBNYXhSZWNlbnRTZWxlY3RlZFxuICAgICAqXG4gICAgICovXG4gICAgbW9yZVNlbGVjdFN0cmluZygpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbW9yZVNlbGVjdGVkID0gdGhpcy5kYXRhU291cmNlLnN0YXRlLnNlbGVjdGVkT2JqZWN0cygpLmxlbmd0aCAtXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUucmVjZW50U2VsZWN0ZWREaXNwbGF5ZWQ7XG4gICAgICAgIGlmIChtb3JlU2VsZWN0ZWQgPCAyICYmICF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2hvd0FsbFJlY2VudGx5U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGVMaW5rO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHttb3JlU2VsZWN0ZWR9IG1vcmUgc2VsZWN0ZWQuLi5gO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW4gY2FzZSBvZiBtdWx0aXNlbGVjdCA9IGZhbHNlIGNoZWNrIGlmIHdlIHdhbnQgdG8gc2hvdyBhIHNlbGVjdGVkIHZhbHVlIGluc2lkZSB0aGUgaW5wdXRcbiAgICAgKiBmaWVsZFxuICAgICAqXG4gICAgICovXG4gICAgc2luZ2xlVmFsdWVTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUgJiYgaXNQcmVzZW50KHRoaXMuZGF0YVNvdXJjZS5zdGF0ZS5jdXJyZW50SXRlbSlcbiAgICAgICAgICAgICYmICF0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuYWRkTW9kZTtcbiAgICB9XG5cbiAgICBoYXNNZW51VGVtcGxhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5tZW51VGVtcGxhdGUpO1xuICAgIH1cblxuXG4gICAgaGFzU2VsZWN0aW9uVGVtcGxhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5zZWxlY3Rpb25UZW1wbGF0ZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbC4gUGxlYXNlIHNlZSBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgICAqIEFzIHdlIGFyZSB1c2luZyBEYXRhU291cmNlIGludGVybmFsbHkgZm9yIFsobmdNb2RlbCldIGNhc2Ugd2UgbmVlZCB0byBkZWZmZXIgRGF0YVNvdXJjZVxuICAgICAqIGluaXRpYWxpemF0aW9uIG9uY2Ugd2UgaGF2ZSBhIHZhbHVlIGFuZCB3ZSBvbmx5IGFjY2VwdCBbXVxuICAgICAqXG4gICAgICpcbiAgICAgKiA/IFNob3VsZCB3ZSBkbyBzb21lIGRlZXBlciBjb21wYXJpc2lvbj9cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZGF0YVNvdXJjZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS51cGRhdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsU3RhdGU6IERlZmF1bHRTZWxlY3Rpb25TdGF0ZSA9IG5ldyBEZWZhdWx0U2VsZWN0aW9uU3RhdGUodGhpcy5tdWx0aXNlbGVjdCk7XG4gICAgICAgICAgICBsZXQgY2hTdGF0ZTogQ2hvb3NlclN0YXRlID0gbmV3IENob29zZXJTdGF0ZShzZWxTdGF0ZSwgdGhpcy5tdWx0aXNlbGVjdCk7XG4gICAgICAgICAgICB0aGlzLmluaXREYXRhc291cmNlKGNoU3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UudXBkYXRlVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0SW50ZXJuYWxNb2RlbCgpO1xuICAgIH1cblxuICAgIGluaXREYXRhc291cmNlKGNob29zZXJTdGF0ZT86IENob29zZXJTdGF0ZSk6IHZvaWQge1xuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuZGVzdGluYXRpb25DbGFzcyksXG4gICAgICAgICAgICAnWW91IG5lZWQgdG8gcHJvdmlkZSBkZXN0aW5hdGlvbkNsYXNzIG9yIGN1c3RvbSBEYXRhU291cmNlJyk7XG5cbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmluaXQoe1xuICAgICAgICAgICAgb2JqOiB0aGlzLmRlc3RpbmF0aW9uQ2xhc3MsXG4gICAgICAgICAgICBxdWVyeVR5cGU6IFF1ZXJ5VHlwZS5GdWxsVGV4dCxcbiAgICAgICAgICAgIGxvb2t1cEtleTogdGhpcy5maWVsZCxcbiAgICAgICAgICAgIHN0YXRlOiBjaG9vc2VyU3RhdGUsXG4gICAgICAgICAgICBtdWx0aXNlbGVjdDogdGhpcy5tdWx0aXNlbGVjdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgYnkgbmdPbkluaXQgYW5kIFdyaXRlIHZhbHVlIHRvIHJlYWQgc3RhdGUgZnJvbSBDaG9vc2VyU3RhdGUgYW5kIHNldCBpdCB0byBpbnRlcm5hbFxuICAgICAqIG5nTW9kZWwgcHJvcGVydHlcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdEludGVybmFsTW9kZWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2Uuc3RhdGUubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxDaG9vc2VyTW9kZWwgPSB0aGlzLmRhdGFTb3VyY2Uuc3RhdGUuc2VsZWN0ZWRPYmplY3RzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsID0gdGhpcy5kYXRhU291cmNlLnN0YXRlLnNlbGVjdGVkT2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmZvcm1Db250cm9sKSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLmludGVybmFsQ2hvb3Nlck1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==