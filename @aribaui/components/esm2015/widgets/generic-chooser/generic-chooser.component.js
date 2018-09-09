/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, forwardRef, Inject, Input, Optional, SkipSelf, ViewContainerRef } from '@angular/core';
import { Environment, equals, FieldPath, isArray, isBlank, isFunction, isPresent, ListWrapper } from '@aribaui/core';
import { ChooserSelectionState } from '../chooser/chooser-selection-state';
import { ChooserState } from '../chooser/chooser-state';
import { BaseFormComponent } from '../../core/base-form.component';
import { ChooserDataSource } from '../chooser/chooser-data-source';
import { DATA_SOURCE } from '../../core/data/data-source';
import { DataFinders, QueryType } from '../../core/data/data-finders';
import { DataProviders } from '../../core/data/data-providers';
/**
 * Convenient wrapper class around controls such as radiobuttons, dropdown, checkboxes,
 * Chooser. The type of the chooser may be determined dynamically based on the number of items in
 * the data source list, or can be specified explicitly via the "type" binding.
 *
 *
 *
 */
export class GenericChooserComponent extends BaseFormComponent {
    /**
     * @param {?} env
     * @param {?} _viewContainer
     * @param {?} dataSource
     * @param {?} parentContainer
     */
    constructor(env, _viewContainer, dataSource, parentContainer) {
        super(env, parentContainer);
        this.env = env;
        this._viewContainer = _viewContainer;
        this.dataSource = dataSource;
        this.parentContainer = parentContainer;
        /**
         *  Is this a List property, or a to-one.
         */
        this.multiselect = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (isBlank(this.object)) {
            this.object = (/** @type {?} */ (this._viewContainer.injector)).view.context;
        }
        this.keyPath = new FieldPath(this.key);
        /** @type {?} */
        let defaultDataProvider = null;
        if (isPresent(this.list)) {
            defaultDataProvider = this.dataSource.dataProviders.find(this.list);
        }
        else {
            defaultDataProvider = this.dataSource.dataProviders.find(this.destinationClass);
        }
        /** @type {?} */
        let projectedSize = defaultDataProvider.expectedCount(this.choiceProviderParams);
        this.initType(projectedSize);
        if (this.type === 'Chooser') {
            this.dataSource.init({
                dataProvider: defaultDataProvider,
                queryType: QueryType.FullText,
                lookupKey: this.displayKey,
                state: new ChooserState(new GCChooserState(this), this.multiselect),
                multiselect: this.multiselect
            });
        }
        else {
            // do we need to read this value in async?
            this.list = defaultDataProvider.data();
        }
        super.registerFormControl(this.selection);
        this.validateRequired();
        if (isBlank(this.selection)) {
            // this.noSelectionString = this.i18n.instant('Widgets.gchooser.noSelString');
            this.noSelectionString = 'Select a Item';
        }
    }
    /**
     *
     * When \@Input type is not passed we try to guess and select the best type for current data
     *
     * @param {?} projectedSize
     * @return {?}
     */
    initType(projectedSize) {
        if (isBlank(this.type)) {
            if (this.multiselect) {
                this.type = (projectedSize <= 0 || projectedSize > 8) ? 'Chooser' : 'Checkbox';
            }
            else {
                this.type = (projectedSize <= 0 || projectedSize > 20) ? 'Chooser'
                    : (projectedSize < 6) ? 'Radio' :
                        'Dropdown';
            }
        }
    }
    /**
     * There are certain properties which are required by this component. As already mentioned
     * above GenericChooser works with references and thefore two key properties are object and key
     * so we can access an object
     *
     *
     * @return {?}
     */
    validateRequired() {
        if (isBlank(this.object)) {
            throw Error('Cannot continue without a object');
        }
        if (isBlank(this.key)) {
            throw Error('Cannot continue without a key binding');
        }
        if (isBlank(this.list) && isBlank(this.destinationClass)) {
            throw Error('Cannot continue without having either list of values or destinationClass');
        }
        if (isPresent(this.type) &&
            (this.type !== 'Radio' && this.type !== 'Checkbox' && this.type !== 'Dropdown' &&
                this.type !== 'Chooser')) {
            throw Error('Cannot instantiate GenericChooser  - invalid type');
        }
        if (isBlank(this.displayKey)) {
            this.displayKey = 'toString';
        }
    }
    /**
     *
     * Used when displaying value both from primitive type as well complex object. If you want to
     * control how item is displayed you can provide display key, which is can be a  method or
     * property of the object you are displaying.
     *
     * Todo: think about formatters as well
     *
     * @param {?} item
     * @return {?}
     */
    displayValue(item) {
        if (isBlank(this.displayKey)) {
            return item;
        }
        /** @type {?} */
        let fieldValue = FieldPath.getFieldValue(item, this.displayKey);
        if (isFunction(fieldValue)) {
            return fieldValue.call(item);
        }
        return fieldValue;
    }
    /**
     *  Retrieve a current value from the parent/target object
     *
     * @return {?}
     */
    get selection() {
        return this.keyPath.getFieldValue(this.object);
    }
    /**
     *  set value back to the object
     *
     * @param {?} value
     * @return {?}
     */
    set selection(value) {
        this.keyPath.setFieldValue(this.object, value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onSelection(value) {
        this.selection = value;
        this.formControl.setValue(this.selection);
        this.formControl.markAsDirty();
    }
}
GenericChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-generic-chooser',
                template: "<ng-container [ngSwitch]=\"type\">\n\n    <ng-template [ngSwitchCase]=\"'Checkbox'\">\n        <aw-checkbox-list [list]=\"list\"\n                          [editable]=\"editable\"\n                          [selections]=\"selection\"\n                          [name]=\"name\"\n                          [disabled]=\"disabled\"\n                          [labelFormatter]=\"displayValue\"\n                          (onSelection)=\"onSelection($event)\">\n        </aw-checkbox-list>\n    </ng-template>\n\n\n    <ng-template [ngSwitchCase]=\"'Radio'\">\n        <aw-radiobutton-list [list]=\"list\"\n                             [selection]=\"selection\"\n                             [editable]=\"editable\"\n                             [name]=\"name\"\n                             [disabled]=\"disabled\"\n                             [labelFormatter]=\"displayValue\"\n                             (onSelection)=\"onSelection($event)\">\n        </aw-radiobutton-list>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\"'Dropdown'\">\n        <aw-dropdown [list]=\"list\"\n                     [isStandalone]=\"false\"\n                     [editable]=\"editable\"\n                     [noSelectionString]=\"noSelectionString\"\n                     [selection]=\"selection\"\n                     [disabled]=\"disabled\"\n                     [name]=\"name\"\n                     (onSelection)=\"onSelection($event)\">\n            <ng-template #itemTemplate let-item>\n\n                <!-- todo: allow to pass a PIPE to do some additional formatting -->\n                {{ displayValue(item.value) }}\n            </ng-template>\n        </aw-dropdown>\n    </ng-template>\n\n\n    <ng-template [ngSwitchCase]=\"'Chooser'\">\n        <aw-chooser #chooser\n                    [editable]=\"editable\"\n                    [isStandalone]=\"false\"\n                    [name]=\"name\"\n                    [multiselect]=\"multiselect\"\n                    [dataSource]=\"dataSource\"\n                    [valueTransformer]=\"displayValue\"\n                    [disabled]=\"disabled\">\n\n        </aw-chooser>\n\n    </ng-template>\n\n</ng-container>\n",
                providers: [
                    { provide: BaseFormComponent, useExisting: forwardRef(() => GenericChooserComponent) },
                    { provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders] }
                ],
                styles: [""]
            }] }
];
/** @nocollapse */
GenericChooserComponent.ctorParameters = () => [
    { type: Environment },
    { type: ViewContainerRef },
    { type: ChooserDataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
GenericChooserComponent.propDecorators = {
    list: [{ type: Input }],
    object: [{ type: Input }],
    key: [{ type: Input }],
    destinationClass: [{ type: Input }],
    choiceProviderParams: [{ type: Input }],
    multiselect: [{ type: Input }],
    type: [{ type: Input }],
    displayKey: [{ type: Input }],
    noSelectionString: [{ type: Input }]
};
if (false) {
    /**
     * Ordered list of items assignable to the key of the object
     * @type {?}
     */
    GenericChooserComponent.prototype.list;
    /**
     * The object this control is being assigned to.
     * @type {?}
     */
    GenericChooserComponent.prototype.object;
    /**
     * The key field path this control is being assigned to.
     * @type {?}
     */
    GenericChooserComponent.prototype.key;
    /**
     * Can be used in place of LIST binding to retrieve a list based on the ChoiceSource
     *
     * @type {?}
     */
    GenericChooserComponent.prototype.destinationClass;
    /**
     * Used when retrieving choiceSource by destination class and this are extra params that can be
     * used to narrow the matching or to pass parameters into ChoiceSource provider
     * @type {?}
     */
    GenericChooserComponent.prototype.choiceProviderParams;
    /**
     *  Is this a List property, or a to-one.
     * @type {?}
     */
    GenericChooserComponent.prototype.multiselect;
    /**
     *  The style of chooser to use (Radio, Checkbox, Dropdown, Chooser)
     *  Defaults based on cardinality of the list and whether it's multiSelect.
     * @type {?}
     */
    GenericChooserComponent.prototype.type;
    /**
     * Support custom key. in order to make this work we need to introduce custom <templates> for
     * all this chooser types
     * @type {?}
     */
    GenericChooserComponent.prototype.displayKey;
    /**
     * String rendered as first value in the dropdown which let the user to make 'no selection'
     * from available list of values. When this option is active and use make this selection we
     * save a NULL value
     * @type {?}
     */
    GenericChooserComponent.prototype.noSelectionString;
    /**
     * Generic Chooser works directly with object and its references and we need to create this
     * keypath to be able to set/get value from target or parent object
     * @type {?}
     */
    GenericChooserComponent.prototype.keyPath;
    /** @type {?} */
    GenericChooserComponent.prototype.env;
    /** @type {?} */
    GenericChooserComponent.prototype._viewContainer;
    /** @type {?} */
    GenericChooserComponent.prototype.dataSource;
    /** @type {?} */
    GenericChooserComponent.prototype.parentContainer;
}
/**
 * GenericChooser implementation of the ChooserSelectionState which is used when Type = Chooser.
 *
 */
export class GCChooserState extends ChooserSelectionState {
    /**
     * @param {?} gChooser
     */
    constructor(gChooser) {
        super();
        this.gChooser = gChooser;
    }
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    setSelectionState(selection, selected) {
        if (selected === this.isSelected(selection)) {
            return;
        }
        if (this.gChooser.multiselect) {
            /** @type {?} */
            let multiRel = this.gChooser.keyPath.getFieldValue(this.gChooser.object);
            if (isBlank(multiRel)) {
                multiRel = [];
            }
            else if (isPresent(multiRel) && !isArray(multiRel)) {
                throw new Error('I can not store multiselect value into non-array object');
            }
            if (selected) {
                multiRel.push(selection);
                this.gChooser.selection = multiRel;
            }
            else {
                ListWrapper.removeIfExist(multiRel, selection);
            }
        }
        else {
            if (!selection) {
                selection = null;
            }
            this.gChooser.selection = selection;
        }
    }
    /**
     * @return {?}
     */
    selectedObject() {
        if (this.gChooser.multiselect) {
            /** @type {?} */
            let objects = this.selectedObjects();
            return (isBlank(objects) || ListWrapper.isEmpty(objects)) ? null : ListWrapper.last(objects);
        }
        return this.gChooser.selection;
    }
    /**
     * @return {?}
     */
    selectedObjects() {
        /** @type {?} */
        let selection = this.gChooser.selection;
        if (this.gChooser.multiselect && isBlank(selection)) {
            selection = [];
        }
        return (this.gChooser.multiselect && isArray(selection)) ? selection : [selection];
    }
    /**
     * @param {?} selection
     * @return {?}
     */
    isSelected(selection) {
        if (this.gChooser.multiselect) {
            return ListWrapper.containsComplex(this.selectedObjects(), selection);
        }
        /** @type {?} */
        let curValue = this.selectedObject();
        return equals(curValue, selection);
    }
}
if (false) {
    /** @type {?} */
    GCChooserState.prototype.gChooser;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpYy1jaG9vc2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2dlbmVyaWMtY2hvb3Nlci9nZW5lcmljLWNob29zZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsUUFBUSxFQUNSLGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsV0FBVyxFQUNYLE1BQU0sRUFDTixTQUFTLEVBQ1QsT0FBTyxFQUNQLE9BQU8sRUFDUCxVQUFVLEVBQ1YsU0FBUyxFQUNULFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDcEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7Ozs7QUFxQjdELE1BQU0sOEJBQStCLFNBQVEsaUJBQWlCOzs7Ozs7O0lBaUYxRCxZQUFtQixHQUFnQixFQUFVLGNBQWdDLEVBQ3JDLFVBQTZCLEVBRS9DLGVBQWtDO1FBRXBELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFMYixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWtCO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBRS9DLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjs7OzsyQkF6Q2pDLEtBQUs7S0E0QzNCOzs7O0lBR0QsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUN2QyxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUUvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixtQkFBbUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixtQkFBbUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDbkY7O1FBRUQsSUFBSSxhQUFhLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRTFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNqQixZQUFZLEVBQUUsbUJBQW1CO2dCQUNqQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVE7Z0JBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDMUIsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ25FLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzthQUNoQyxDQUFDLENBQUM7U0FDTjtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUdKLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUM7UUFDRCxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUUxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZUFBZSxDQUFDO1NBQzVDO0tBQ0o7Ozs7Ozs7O0lBT08sUUFBUSxDQUFDLGFBQXFCO1FBRWxDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO2FBQ2xGO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO29CQUM5RCxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM3QixVQUFVLENBQUM7YUFDdEI7U0FDSjs7Ozs7Ozs7OztJQVVHLGdCQUFnQjtRQUVwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztTQUN4RDtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxNQUFNLEtBQUssQ0FBQywwRUFBMEUsQ0FBQyxDQUFDO1NBQzNGO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVTtnQkFDMUUsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztTQUNwRTtRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQ2hDOzs7Ozs7Ozs7Ozs7O0lBWUwsWUFBWSxDQUFDLElBQVM7UUFFbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmOztRQUNELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUNyQjs7Ozs7O0lBT0QsSUFBSSxTQUFTO1FBRVQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNsRDs7Ozs7OztJQU1ELElBQUksU0FBUyxDQUFDLEtBQVU7UUFFcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNsRDs7Ozs7SUFHRCxXQUFXLENBQUMsS0FBVTtRQUVsQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV2QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUVsQzs7O1lBaFBKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qix3b0VBQTZDO2dCQUU3QyxTQUFTLEVBQUU7b0JBQ1AsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFDO29CQUNwRixFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsRUFBQztpQkFDMUY7O2FBRUo7Ozs7WUFuQ0csV0FBVztZQUhYLGdCQUFnQjtZQWVaLGlCQUFpQix1QkEwR1IsTUFBTSxTQUFDLFdBQVc7WUEzRzNCLGlCQUFpQix1QkE0R1IsUUFBUSxZQUFJLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDOzs7bUJBN0U5RSxLQUFLO3FCQU1MLEtBQUs7a0JBT0wsS0FBSzsrQkFRTCxLQUFLO21DQVFMLEtBQUs7MEJBT0wsS0FBSzttQkFPTCxLQUFLO3lCQU9MLEtBQUs7Z0NBY0wsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVLVixNQUFNLHFCQUFzQixTQUFRLHFCQUFxQjs7OztJQUdyRCxZQUFvQixRQUFpQztRQUVqRCxLQUFLLEVBQUUsQ0FBQztRQUZRLGFBQVEsR0FBUixRQUFRLENBQXlCO0tBR3BEOzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxTQUFjLEVBQUUsUUFBaUI7UUFFL0MsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQztTQUNWO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztZQUs1QixJQUFJLFFBQVEsR0FBZSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixRQUFRLEdBQUcsRUFBRSxDQUFDO2FBRWpCO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQzthQUM5RTtZQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO2FBRXRDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDbEQ7U0FFSjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNiLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FFdkM7S0FDSjs7OztJQUVELGNBQWM7UUFFVixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7O1lBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNyQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQy9FLE9BQU8sQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0tBQ2xDOzs7O0lBRUQsZUFBZTs7UUFFWCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDbEI7UUFDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3RGOzs7OztJQUVELFVBQVUsQ0FBQyxTQUFjO1FBRXJCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDekU7O1FBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3RDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9wdGlvbmFsLFxuICAgIFNraXBTZWxmLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEVudmlyb25tZW50LFxuICAgIGVxdWFscyxcbiAgICBGaWVsZFBhdGgsXG4gICAgaXNBcnJheSxcbiAgICBpc0JsYW5rLFxuICAgIGlzRnVuY3Rpb24sXG4gICAgaXNQcmVzZW50LFxuICAgIExpc3RXcmFwcGVyXG59IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtDaG9vc2VyU2VsZWN0aW9uU3RhdGV9IGZyb20gJy4uL2Nob29zZXIvY2hvb3Nlci1zZWxlY3Rpb24tc3RhdGUnO1xuaW1wb3J0IHtDaG9vc2VyU3RhdGV9IGZyb20gJy4uL2Nob29zZXIvY2hvb3Nlci1zdGF0ZSc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHtDaG9vc2VyRGF0YVNvdXJjZX0gZnJvbSAnLi4vY2hvb3Nlci9jaG9vc2VyLWRhdGEtc291cmNlJztcbmltcG9ydCB7REFUQV9TT1VSQ0V9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0RhdGFGaW5kZXJzLCBRdWVyeVR5cGV9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJzfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1wcm92aWRlcnMnO1xuXG5cbi8qKlxuICogQ29udmVuaWVudCB3cmFwcGVyIGNsYXNzIGFyb3VuZCBjb250cm9scyBzdWNoIGFzIHJhZGlvYnV0dG9ucywgZHJvcGRvd24sIGNoZWNrYm94ZXMsXG4gKiBDaG9vc2VyLiBUaGUgdHlwZSBvZiB0aGUgY2hvb3NlciBtYXkgYmUgZGV0ZXJtaW5lZCBkeW5hbWljYWxseSBiYXNlZCBvbiB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluXG4gKiB0aGUgZGF0YSBzb3VyY2UgbGlzdCwgb3IgY2FuIGJlIHNwZWNpZmllZCBleHBsaWNpdGx5IHZpYSB0aGUgXCJ0eXBlXCIgYmluZGluZy5cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1nZW5lcmljLWNob29zZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnZ2VuZXJpYy1jaG9vc2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZ2VuZXJpYy1jaG9vc2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gR2VuZXJpY0Nob29zZXJDb21wb25lbnQpfSxcbiAgICAgICAge3Byb3ZpZGU6IERBVEFfU09VUkNFLCB1c2VDbGFzczogQ2hvb3NlckRhdGFTb3VyY2UsIGRlcHM6IFtEYXRhUHJvdmlkZXJzLCBEYXRhRmluZGVyc119XG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVyaWNDaG9vc2VyQ29tcG9uZW50IGV4dGVuZHMgQmFzZUZvcm1Db21wb25lbnRcbntcblxuICAgIC8qKlxuICAgICAqIE9yZGVyZWQgbGlzdCBvZiBpdGVtcyBhc3NpZ25hYmxlIHRvIHRoZSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbGlzdDogYW55W107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb2JqZWN0IHRoaXMgY29udHJvbCBpcyBiZWluZyBhc3NpZ25lZCB0by5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG9iamVjdDogYW55O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGUga2V5IGZpZWxkIHBhdGggdGhpcyBjb250cm9sIGlzIGJlaW5nIGFzc2lnbmVkIHRvLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAga2V5OiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIENhbiBiZSB1c2VkIGluIHBsYWNlIG9mIExJU1QgYmluZGluZyB0byByZXRyaWV2ZSBhIGxpc3QgYmFzZWQgb24gdGhlIENob2ljZVNvdXJjZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZXN0aW5hdGlvbkNsYXNzOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgd2hlbiByZXRyaWV2aW5nIGNob2ljZVNvdXJjZSBieSBkZXN0aW5hdGlvbiBjbGFzcyBhbmQgdGhpcyBhcmUgZXh0cmEgcGFyYW1zIHRoYXQgY2FuIGJlXG4gICAgICogdXNlZCB0byBuYXJyb3cgdGhlIG1hdGNoaW5nIG9yIHRvIHBhc3MgcGFyYW1ldGVycyBpbnRvIENob2ljZVNvdXJjZSBwcm92aWRlclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2hvaWNlUHJvdmlkZXJQYXJhbXM6IE1hcDxzdHJpbmcsIGFueT47XG5cblxuICAgIC8qKlxuICAgICAqICBJcyB0aGlzIGEgTGlzdCBwcm9wZXJ0eSwgb3IgYSB0by1vbmUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBtdWx0aXNlbGVjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogIFRoZSBzdHlsZSBvZiBjaG9vc2VyIHRvIHVzZSAoUmFkaW8sIENoZWNrYm94LCBEcm9wZG93biwgQ2hvb3NlcilcbiAgICAgKiAgRGVmYXVsdHMgYmFzZWQgb24gY2FyZGluYWxpdHkgb2YgdGhlIGxpc3QgYW5kIHdoZXRoZXIgaXQncyBtdWx0aVNlbGVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFN1cHBvcnQgY3VzdG9tIGtleS4gaW4gb3JkZXIgdG8gbWFrZSB0aGlzIHdvcmsgd2UgbmVlZCB0byBpbnRyb2R1Y2UgY3VzdG9tIDx0ZW1wbGF0ZXM+IGZvclxuICAgICAqIGFsbCB0aGlzIGNob29zZXIgdHlwZXNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlLZXk6IHN0cmluZztcblxuICAgIC8vIC8qKlxuICAgIC8vICAqICBTaG91bGQgd2UgYXR0ZW1wdCBhIG1hdGNoIGFzIHRoZXkgdHlwZSAoYWdhaW5zdCB0aGUgZnVsbCBsaXN0KVxuICAgIC8vICAqL1xuICAgIC8vIEBJbnB1dCgpXG4gICAgLy8gYWxsb3dGdWxsTWF0Y2hPbklucHV0OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogU3RyaW5nIHJlbmRlcmVkIGFzIGZpcnN0IHZhbHVlIGluIHRoZSBkcm9wZG93biB3aGljaCBsZXQgdGhlIHVzZXIgdG8gbWFrZSAnbm8gc2VsZWN0aW9uJ1xuICAgICAqIGZyb20gYXZhaWxhYmxlIGxpc3Qgb2YgdmFsdWVzLiBXaGVuIHRoaXMgb3B0aW9uIGlzIGFjdGl2ZSBhbmQgdXNlIG1ha2UgdGhpcyBzZWxlY3Rpb24gd2VcbiAgICAgKiBzYXZlIGEgTlVMTCB2YWx1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm9TZWxlY3Rpb25TdHJpbmc6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogR2VuZXJpYyBDaG9vc2VyIHdvcmtzIGRpcmVjdGx5IHdpdGggb2JqZWN0IGFuZCBpdHMgcmVmZXJlbmNlcyBhbmQgd2UgbmVlZCB0byBjcmVhdGUgdGhpc1xuICAgICAqIGtleXBhdGggdG8gYmUgYWJsZSB0byBzZXQvZ2V0IHZhbHVlIGZyb20gdGFyZ2V0IG9yIHBhcmVudCBvYmplY3RcbiAgICAgKi9cbiAgICBrZXlQYXRoOiBGaWVsZFBhdGg7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50LCBwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoREFUQV9TT1VSQ0UpIHB1YmxpYyBkYXRhU291cmNlOiBDaG9vc2VyRGF0YVNvdXJjZSxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQmFzZUZvcm1Db21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBwYXJlbnRDb250YWluZXIpO1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLm9iamVjdCkpIHtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0ID0gKDxhbnk+dGhpcy5fdmlld0NvbnRhaW5lci5pbmplY3Rvcikudmlldy5jb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5UGF0aCA9IG5ldyBGaWVsZFBhdGgodGhpcy5rZXkpO1xuICAgICAgICBsZXQgZGVmYXVsdERhdGFQcm92aWRlciA9IG51bGw7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmxpc3QpKSB7XG4gICAgICAgICAgICBkZWZhdWx0RGF0YVByb3ZpZGVyID0gdGhpcy5kYXRhU291cmNlLmRhdGFQcm92aWRlcnMuZmluZCh0aGlzLmxpc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVmYXVsdERhdGFQcm92aWRlciA9IHRoaXMuZGF0YVNvdXJjZS5kYXRhUHJvdmlkZXJzLmZpbmQodGhpcy5kZXN0aW5hdGlvbkNsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9qZWN0ZWRTaXplID0gZGVmYXVsdERhdGFQcm92aWRlci5leHBlY3RlZENvdW50KHRoaXMuY2hvaWNlUHJvdmlkZXJQYXJhbXMpO1xuICAgICAgICB0aGlzLmluaXRUeXBlKHByb2plY3RlZFNpemUpO1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdDaG9vc2VyJykge1xuXG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuaW5pdCh7XG4gICAgICAgICAgICAgICAgZGF0YVByb3ZpZGVyOiBkZWZhdWx0RGF0YVByb3ZpZGVyLFxuICAgICAgICAgICAgICAgIHF1ZXJ5VHlwZTogUXVlcnlUeXBlLkZ1bGxUZXh0LFxuICAgICAgICAgICAgICAgIGxvb2t1cEtleTogdGhpcy5kaXNwbGF5S2V5LFxuICAgICAgICAgICAgICAgIHN0YXRlOiBuZXcgQ2hvb3NlclN0YXRlKG5ldyBHQ0Nob29zZXJTdGF0ZSh0aGlzKSwgdGhpcy5tdWx0aXNlbGVjdCksXG4gICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRoaXMubXVsdGlzZWxlY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBkbyB3ZSBuZWVkIHRvIHJlYWQgdGhpcyB2YWx1ZSBpbiBhc3luYz9cbiAgICAgICAgICAgIHRoaXMubGlzdCA9IGRlZmF1bHREYXRhUHJvdmlkZXIuZGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnJlZ2lzdGVyRm9ybUNvbnRyb2wodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLnZhbGlkYXRlUmVxdWlyZWQoKTtcblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubm9TZWxlY3Rpb25TdHJpbmcgPSB0aGlzLmkxOG4uaW5zdGFudCgnV2lkZ2V0cy5nY2hvb3Nlci5ub1NlbFN0cmluZycpO1xuICAgICAgICAgICAgdGhpcy5ub1NlbGVjdGlvblN0cmluZyA9ICdTZWxlY3QgYSBJdGVtJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBASW5wdXQgdHlwZSBpcyBub3QgcGFzc2VkIHdlIHRyeSB0byBndWVzcyBhbmQgc2VsZWN0IHRoZSBiZXN0IHR5cGUgZm9yIGN1cnJlbnQgZGF0YVxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0VHlwZShwcm9qZWN0ZWRTaXplOiBudW1iZXIpXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLnR5cGUpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IChwcm9qZWN0ZWRTaXplIDw9IDAgfHwgcHJvamVjdGVkU2l6ZSA+IDgpID8gJ0Nob29zZXInIDogJ0NoZWNrYm94JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gKHByb2plY3RlZFNpemUgPD0gMCB8fCBwcm9qZWN0ZWRTaXplID4gMjApID8gJ0Nob29zZXInXG4gICAgICAgICAgICAgICAgICAgIDogKHByb2plY3RlZFNpemUgPCA2KSA/ICdSYWRpbycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJ0Ryb3Bkb3duJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZXJlIGFyZSBjZXJ0YWluIHByb3BlcnRpZXMgd2hpY2ggYXJlIHJlcXVpcmVkIGJ5IHRoaXMgY29tcG9uZW50LiBBcyBhbHJlYWR5IG1lbnRpb25lZFxuICAgICAqIGFib3ZlIEdlbmVyaWNDaG9vc2VyIHdvcmtzIHdpdGggcmVmZXJlbmNlcyBhbmQgdGhlZm9yZSB0d28ga2V5IHByb3BlcnRpZXMgYXJlIG9iamVjdCBhbmQga2V5XG4gICAgICogc28gd2UgY2FuIGFjY2VzcyBhbiBvYmplY3RcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVJlcXVpcmVkKClcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMub2JqZWN0KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBjb250aW51ZSB3aXRob3V0IGEgb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmtleSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgY29udGludWUgd2l0aG91dCBhIGtleSBiaW5kaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5saXN0KSAmJiBpc0JsYW5rKHRoaXMuZGVzdGluYXRpb25DbGFzcykpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgY29udGludWUgd2l0aG91dCBoYXZpbmcgZWl0aGVyIGxpc3Qgb2YgdmFsdWVzIG9yIGRlc3RpbmF0aW9uQ2xhc3MnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlKSAmJlxuICAgICAgICAgICAgKHRoaXMudHlwZSAhPT0gJ1JhZGlvJyAmJiB0aGlzLnR5cGUgIT09ICdDaGVja2JveCcgJiYgdGhpcy50eXBlICE9PSAnRHJvcGRvd24nICYmXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlICE9PSAnQ2hvb3NlcicpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IGluc3RhbnRpYXRlIEdlbmVyaWNDaG9vc2VyICAtIGludmFsaWQgdHlwZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5kaXNwbGF5S2V5KSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5S2V5ID0gJ3RvU3RyaW5nJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXNlZCB3aGVuIGRpc3BsYXlpbmcgdmFsdWUgYm90aCBmcm9tIHByaW1pdGl2ZSB0eXBlIGFzIHdlbGwgY29tcGxleCBvYmplY3QuIElmIHlvdSB3YW50IHRvXG4gICAgICogY29udHJvbCBob3cgaXRlbSBpcyBkaXNwbGF5ZWQgeW91IGNhbiBwcm92aWRlIGRpc3BsYXkga2V5LCB3aGljaCBpcyBjYW4gYmUgYSAgbWV0aG9kIG9yXG4gICAgICogcHJvcGVydHkgb2YgdGhlIG9iamVjdCB5b3UgYXJlIGRpc3BsYXlpbmcuXG4gICAgICpcbiAgICAgKiBUb2RvOiB0aGluayBhYm91dCBmb3JtYXR0ZXJzIGFzIHdlbGxcbiAgICAgKlxuICAgICAqL1xuICAgIGRpc3BsYXlWYWx1ZShpdGVtOiBhbnkpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuZGlzcGxheUtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmaWVsZFZhbHVlID0gRmllbGRQYXRoLmdldEZpZWxkVmFsdWUoaXRlbSwgdGhpcy5kaXNwbGF5S2V5KTtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oZmllbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlLmNhbGwoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgUmV0cmlldmUgYSBjdXJyZW50IHZhbHVlIGZyb20gdGhlIHBhcmVudC90YXJnZXQgb2JqZWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBnZXQgc2VsZWN0aW9uKCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5UGF0aC5nZXRGaWVsZFZhbHVlKHRoaXMub2JqZWN0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgc2V0IHZhbHVlIGJhY2sgdG8gdGhlIG9iamVjdFxuICAgICAqXG4gICAgICovXG4gICAgc2V0IHNlbGVjdGlvbih2YWx1ZTogYW55KVxuICAgIHtcbiAgICAgICAgdGhpcy5rZXlQYXRoLnNldEZpZWxkVmFsdWUodGhpcy5vYmplY3QsIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIG9uU2VsZWN0aW9uKHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc2V0VmFsdWUodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KCk7XG5cbiAgICB9XG59XG5cbi8qKlxuICogR2VuZXJpY0Nob29zZXIgaW1wbGVtZW50YXRpb24gb2YgdGhlIENob29zZXJTZWxlY3Rpb25TdGF0ZSB3aGljaCBpcyB1c2VkIHdoZW4gVHlwZSA9IENob29zZXIuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgR0NDaG9vc2VyU3RhdGUgZXh0ZW5kcyBDaG9vc2VyU2VsZWN0aW9uU3RhdGVcbntcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ0Nob29zZXI6IEdlbmVyaWNDaG9vc2VyQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3Rpb25TdGF0ZShzZWxlY3Rpb246IGFueSwgc2VsZWN0ZWQ6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoc2VsZWN0ZWQgPT09IHRoaXMuaXNTZWxlY3RlZChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5nQ2hvb3Nlci5tdWx0aXNlbGVjdCkge1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gaW1wbGVtZW50IHNtYXJ0ZXIgYW5kIG1vcmUgZ2VuZXJpYyB3YXkgaG93IHdlIHVzZSBpdCBpbiBqYXZhXG4gICAgICAgICAgICAvLyBSZWxhdGlvbnNoaXBGaWVsZC5hZGRUbyhfb2JqZWN0LCBfa2V5UGF0aCwgc2VsZWN0aW9uKTtcblxuICAgICAgICAgICAgbGV0IG11bHRpUmVsOiBBcnJheTxhbnk+ID0gdGhpcy5nQ2hvb3Nlci5rZXlQYXRoLmdldEZpZWxkVmFsdWUodGhpcy5nQ2hvb3Nlci5vYmplY3QpO1xuICAgICAgICAgICAgaWYgKGlzQmxhbmsobXVsdGlSZWwpKSB7XG4gICAgICAgICAgICAgICAgbXVsdGlSZWwgPSBbXTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobXVsdGlSZWwpICYmICFpc0FycmF5KG11bHRpUmVsKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSSBjYW4gbm90IHN0b3JlIG11bHRpc2VsZWN0IHZhbHVlIGludG8gbm9uLWFycmF5IG9iamVjdCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBtdWx0aVJlbC5wdXNoKHNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy5nQ2hvb3Nlci5zZWxlY3Rpb24gPSBtdWx0aVJlbDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmVJZkV4aXN0KG11bHRpUmVsLCBzZWxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdDaG9vc2VyLnNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRPYmplY3QoKTogYW55XG4gICAge1xuICAgICAgICBpZiAodGhpcy5nQ2hvb3Nlci5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgbGV0IG9iamVjdHMgPSB0aGlzLnNlbGVjdGVkT2JqZWN0cygpO1xuICAgICAgICAgICAgcmV0dXJuIChpc0JsYW5rKG9iamVjdHMpIHx8IExpc3RXcmFwcGVyLmlzRW1wdHkob2JqZWN0cykpID8gbnVsbCA6IExpc3RXcmFwcGVyLmxhc3QoXG4gICAgICAgICAgICAgICAgb2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ0Nob29zZXIuc2VsZWN0aW9uO1xuICAgIH1cblxuICAgIHNlbGVjdGVkT2JqZWN0cygpOiBBcnJheTxhbnk+XG4gICAge1xuICAgICAgICBsZXQgc2VsZWN0aW9uID0gdGhpcy5nQ2hvb3Nlci5zZWxlY3Rpb247XG4gICAgICAgIGlmICh0aGlzLmdDaG9vc2VyLm11bHRpc2VsZWN0ICYmIGlzQmxhbmsoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgc2VsZWN0aW9uID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLmdDaG9vc2VyLm11bHRpc2VsZWN0ICYmIGlzQXJyYXkoc2VsZWN0aW9uKSkgPyBzZWxlY3Rpb24gOiBbc2VsZWN0aW9uXTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKHNlbGVjdGlvbjogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZ0Nob29zZXIubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0V3JhcHBlci5jb250YWluc0NvbXBsZXgodGhpcy5zZWxlY3RlZE9iamVjdHMoKSwgc2VsZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3VyVmFsdWUgPSB0aGlzLnNlbGVjdGVkT2JqZWN0KCk7XG4gICAgICAgIHJldHVybiBlcXVhbHMoY3VyVmFsdWUsIHNlbGVjdGlvbik7XG4gICAgfVxufVxuIl19