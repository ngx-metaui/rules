/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var GenericChooserComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GenericChooserComponent, _super);
    function GenericChooserComponent(env, _viewContainer, dataSource, parentContainer) {
        var _this = _super.call(this, env, parentContainer) || this;
        _this.env = env;
        _this._viewContainer = _viewContainer;
        _this.dataSource = dataSource;
        _this.parentContainer = parentContainer;
        /**
         *  Is this a List property, or a to-one.
         */
        _this.multiselect = false;
        return _this;
    }
    /**
     * @return {?}
     */
    GenericChooserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        if (isBlank(this.object)) {
            this.object = (/** @type {?} */ (this._viewContainer.injector)).view.context;
        }
        this.keyPath = new FieldPath(this.key);
        /** @type {?} */
        var defaultDataProvider = null;
        if (isPresent(this.list)) {
            defaultDataProvider = this.dataSource.dataProviders.find(this.list);
        }
        else {
            defaultDataProvider = this.dataSource.dataProviders.find(this.destinationClass);
        }
        /** @type {?} */
        var projectedSize = defaultDataProvider.expectedCount(this.choiceProviderParams);
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
        _super.prototype.registerFormControl.call(this, this.selection);
        this.validateRequired();
        if (isBlank(this.selection)) {
            // this.noSelectionString = this.i18n.instant('Widgets.gchooser.noSelString');
            this.noSelectionString = 'Select a Item';
        }
    };
    /**
     *
     * When \@Input type is not passed we try to guess and select the best type for current data
     *
     * @param {?} projectedSize
     * @return {?}
     */
    GenericChooserComponent.prototype.initType = /**
     *
     * When \@Input type is not passed we try to guess and select the best type for current data
     *
     * @param {?} projectedSize
     * @return {?}
     */
    function (projectedSize) {
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
    };
    /**
     * There are certain properties which are required by this component. As already mentioned
     * above GenericChooser works with references and thefore two key properties are object and key
     * so we can access an object
     *
     *
     * @return {?}
     */
    GenericChooserComponent.prototype.validateRequired = /**
     * There are certain properties which are required by this component. As already mentioned
     * above GenericChooser works with references and thefore two key properties are object and key
     * so we can access an object
     *
     *
     * @return {?}
     */
    function () {
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
    };
    /**
     *
     * Used when displaying value both from primitive type as well complex object. If you want to
     * control how item is displayed you can provide display key, which is can be a  method or
     * property of the object you are displaying.
     *
     * Todo: think about formatters as well
     *
     */
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
    GenericChooserComponent.prototype.displayValue = /**
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
    function (item) {
        if (isBlank(this.displayKey)) {
            return item;
        }
        /** @type {?} */
        var fieldValue = FieldPath.getFieldValue(item, this.displayKey);
        if (isFunction(fieldValue)) {
            return fieldValue.call(item);
        }
        return fieldValue;
    };
    Object.defineProperty(GenericChooserComponent.prototype, "selection", {
        /**
         *  Retrieve a current value from the parent/target object
         *
         */
        get: /**
         *  Retrieve a current value from the parent/target object
         *
         * @return {?}
         */
        function () {
            return this.keyPath.getFieldValue(this.object);
        },
        /**
         *  set value back to the object
         *
         */
        set: /**
         *  set value back to the object
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.keyPath.setFieldValue(this.object, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    GenericChooserComponent.prototype.onSelection = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.selection = value;
        this.formControl.setValue(this.selection);
        this.formControl.markAsDirty();
    };
    GenericChooserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-generic-chooser',
                    template: "<ng-container [ngSwitch]=\"type\">\n\n    <ng-template [ngSwitchCase]=\"'Checkbox'\">\n        <aw-checkbox-list [list]=\"list\"\n                          [editable]=\"editable\"\n                          [selections]=\"selection\"\n                          [name]=\"name\"\n                          [disabled]=\"disabled\"\n                          [labelFormatter]=\"displayValue\"\n                          (onSelection)=\"onSelection($event)\">\n        </aw-checkbox-list>\n    </ng-template>\n\n\n    <ng-template [ngSwitchCase]=\"'Radio'\">\n        <aw-radiobutton-list [list]=\"list\"\n                             [selection]=\"selection\"\n                             [editable]=\"editable\"\n                             [name]=\"name\"\n                             [disabled]=\"disabled\"\n                             [labelFormatter]=\"displayValue\"\n                             (onSelection)=\"onSelection($event)\">\n        </aw-radiobutton-list>\n    </ng-template>\n\n    <ng-template [ngSwitchCase]=\"'Dropdown'\">\n        <aw-dropdown [list]=\"list\"\n                     [isStandalone]=\"false\"\n                     [editable]=\"editable\"\n                     [noSelectionString]=\"noSelectionString\"\n                     [selection]=\"selection\"\n                     [disabled]=\"disabled\"\n                     [name]=\"name\"\n                     (onSelection)=\"onSelection($event)\">\n            <ng-template #itemTemplate let-item>\n\n                <!-- todo: allow to pass a PIPE to do some additional formatting -->\n                {{ displayValue(item.value) }}\n            </ng-template>\n        </aw-dropdown>\n    </ng-template>\n\n\n    <ng-template [ngSwitchCase]=\"'Chooser'\">\n        <aw-chooser #chooser\n                    [editable]=\"editable\"\n                    [isStandalone]=\"false\"\n                    [name]=\"name\"\n                    [multiselect]=\"multiselect\"\n                    [dataSource]=\"dataSource\"\n                    [valueTransformer]=\"displayValue\"\n                    [disabled]=\"disabled\">\n\n        </aw-chooser>\n\n    </ng-template>\n\n</ng-container>\n",
                    providers: [
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return GenericChooserComponent; }) },
                        { provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders] }
                    ],
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    GenericChooserComponent.ctorParameters = function () { return [
        { type: Environment },
        { type: ViewContainerRef },
        { type: ChooserDataSource, decorators: [{ type: Inject, args: [DATA_SOURCE,] }] },
        { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(function () { return BaseFormComponent; }),] }] }
    ]; };
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
    return GenericChooserComponent;
}(BaseFormComponent));
export { GenericChooserComponent };
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
var /**
 * GenericChooser implementation of the ChooserSelectionState which is used when Type = Chooser.
 *
 */
GCChooserState = /** @class */ (function (_super) {
    tslib_1.__extends(GCChooserState, _super);
    function GCChooserState(gChooser) {
        var _this = _super.call(this) || this;
        _this.gChooser = gChooser;
        return _this;
    }
    /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    GCChooserState.prototype.setSelectionState = /**
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    function (selection, selected) {
        if (selected === this.isSelected(selection)) {
            return;
        }
        if (this.gChooser.multiselect) {
            /** @type {?} */
            var multiRel = this.gChooser.keyPath.getFieldValue(this.gChooser.object);
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
    };
    /**
     * @return {?}
     */
    GCChooserState.prototype.selectedObject = /**
     * @return {?}
     */
    function () {
        if (this.gChooser.multiselect) {
            /** @type {?} */
            var objects = this.selectedObjects();
            return (isBlank(objects) || ListWrapper.isEmpty(objects)) ? null : ListWrapper.last(objects);
        }
        return this.gChooser.selection;
    };
    /**
     * @return {?}
     */
    GCChooserState.prototype.selectedObjects = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selection = this.gChooser.selection;
        if (this.gChooser.multiselect && isBlank(selection)) {
            selection = [];
        }
        return (this.gChooser.multiselect && isArray(selection)) ? selection : [selection];
    };
    /**
     * @param {?} selection
     * @return {?}
     */
    GCChooserState.prototype.isSelected = /**
     * @param {?} selection
     * @return {?}
     */
    function (selection) {
        if (this.gChooser.multiselect) {
            return ListWrapper.containsComplex(this.selectedObjects(), selection);
        }
        /** @type {?} */
        var curValue = this.selectedObject();
        return equals(curValue, selection);
    };
    return GCChooserState;
}(ChooserSelectionState));
/**
 * GenericChooser implementation of the ChooserSelectionState which is used when Type = Chooser.
 *
 */
export { GCChooserState };
if (false) {
    /** @type {?} */
    GCChooserState.prototype.gChooser;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpYy1jaG9vc2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2dlbmVyaWMtY2hvb3Nlci9nZW5lcmljLWNob29zZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFFBQVEsRUFDUixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFdBQVcsRUFDWCxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFNBQVMsRUFDVCxXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7OztJQXFCaEIsbURBQWlCO0lBaUYxRCxpQ0FBbUIsR0FBZ0IsRUFBVSxjQUFnQyxFQUNyQyxVQUE2QixFQUUvQyxlQUFrQztRQUh4RCxZQUtJLGtCQUFNLEdBQUcsRUFBRSxlQUFlLENBQUMsU0FDOUI7UUFOa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUFVLG9CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQUNyQyxnQkFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFFL0MscUJBQWUsR0FBZixlQUFlLENBQW1COzs7OzRCQXpDakMsS0FBSzs7S0E0QzNCOzs7O0lBR0QsMENBQVE7OztJQUFSO1FBRUksaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDbEU7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFDdkMsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFFL0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2RTtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ25GOztRQUVELElBQUksYUFBYSxHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUUxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDakIsWUFBWSxFQUFFLG1CQUFtQjtnQkFDakMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxRQUFRO2dCQUM3QixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7Z0JBQzFCLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNuRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDaEMsQ0FBQyxDQUFDO1NBQ047UUFBQyxJQUFJLENBQUMsQ0FBQzs7WUFHSixJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFDO1FBQ0QsaUJBQU0sbUJBQW1CLFlBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUUxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZUFBZSxDQUFDO1NBQzVDO0tBQ0o7Ozs7Ozs7O0lBT08sMENBQVE7Ozs7Ozs7Y0FBQyxhQUFxQjtRQUVsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzthQUNsRjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDOUQsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDN0IsVUFBVSxDQUFDO2FBQ3RCO1NBQ0o7Ozs7Ozs7Ozs7SUFVRyxrREFBZ0I7Ozs7Ozs7OztRQUVwQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztTQUN4RDtRQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxNQUFNLEtBQUssQ0FBQywwRUFBMEUsQ0FBQyxDQUFDO1NBQzNGO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUNMLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVTtnQkFDMUUsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztTQUNwRTtRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQ2hDOztJQUdMOzs7Ozs7OztPQVFHOzs7Ozs7Ozs7Ozs7SUFDSCw4Q0FBWTs7Ozs7Ozs7Ozs7SUFBWixVQUFhLElBQVM7UUFFbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNmOztRQUNELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUNyQjtJQU9ELHNCQUFJLDhDQUFTO1FBSmI7OztXQUdHOzs7Ozs7UUFDSDtZQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbEQ7UUFFRDs7O1dBR0c7Ozs7Ozs7UUFDSCxVQUFjLEtBQVU7WUFFcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNsRDs7O09BVEE7Ozs7O0lBWUQsNkNBQVc7Ozs7SUFBWCxVQUFZLEtBQVU7UUFFbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7S0FFbEM7O2dCQWhQSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsd29FQUE2QztvQkFFN0MsU0FBUyxFQUFFO3dCQUNQLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHVCQUF1QixFQUF2QixDQUF1QixDQUFDLEVBQUM7d0JBQ3BGLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxFQUFDO3FCQUMxRjs7aUJBRUo7Ozs7Z0JBbkNHLFdBQVc7Z0JBSFgsZ0JBQWdCO2dCQWVaLGlCQUFpQix1QkEwR1IsTUFBTSxTQUFDLFdBQVc7Z0JBM0czQixpQkFBaUIsdUJBNEdSLFFBQVEsWUFBSSxRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUM7Ozt1QkE3RTlFLEtBQUs7eUJBTUwsS0FBSztzQkFPTCxLQUFLO21DQVFMLEtBQUs7dUNBUUwsS0FBSzs4QkFPTCxLQUFLO3VCQU9MLEtBQUs7NkJBT0wsS0FBSztvQ0FjTCxLQUFLOztrQ0F4SVY7RUFrRTZDLGlCQUFpQjtTQUFqRCx1QkFBdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZPcEM7Ozs7QUFBQTtJQUFvQywwQ0FBcUI7SUFHckQsd0JBQW9CLFFBQWlDO1FBQXJELFlBRUksaUJBQU8sU0FDVjtRQUhtQixjQUFRLEdBQVIsUUFBUSxDQUF5Qjs7S0FHcEQ7Ozs7OztJQUVELDBDQUFpQjs7Ozs7SUFBakIsVUFBa0IsU0FBYyxFQUFFLFFBQWlCO1FBRS9DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLENBQUM7U0FDVjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7WUFLNUIsSUFBSSxRQUFRLEdBQWUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsUUFBUSxHQUFHLEVBQUUsQ0FBQzthQUVqQjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7YUFDOUU7WUFFRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQzthQUV0QztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ2xEO1NBRUo7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBRXZDO0tBQ0o7Ozs7SUFFRCx1Q0FBYzs7O0lBQWQ7UUFFSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7O1lBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNyQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQy9FLE9BQU8sQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0tBQ2xDOzs7O0lBRUQsd0NBQWU7OztJQUFmOztRQUVJLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNsQjtRQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdEY7Ozs7O0lBRUQsbUNBQVU7Ozs7SUFBVixVQUFXLFNBQWM7UUFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN6RTs7UUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDdEM7eUJBclhMO0VBK1NvQyxxQkFBcUIsRUF1RXhELENBQUE7Ozs7O0FBdkVELDBCQXVFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT3B0aW9uYWwsXG4gICAgU2tpcFNlbGYsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRW52aXJvbm1lbnQsXG4gICAgZXF1YWxzLFxuICAgIEZpZWxkUGF0aCxcbiAgICBpc0FycmF5LFxuICAgIGlzQmxhbmssXG4gICAgaXNGdW5jdGlvbixcbiAgICBpc1ByZXNlbnQsXG4gICAgTGlzdFdyYXBwZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge0Nob29zZXJTZWxlY3Rpb25TdGF0ZX0gZnJvbSAnLi4vY2hvb3Nlci9jaG9vc2VyLXNlbGVjdGlvbi1zdGF0ZSc7XG5pbXBvcnQge0Nob29zZXJTdGF0ZX0gZnJvbSAnLi4vY2hvb3Nlci9jaG9vc2VyLXN0YXRlJztcbmltcG9ydCB7QmFzZUZvcm1Db21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQge0Nob29zZXJEYXRhU291cmNlfSBmcm9tICcuLi9jaG9vc2VyL2Nob29zZXItZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtEQVRBX1NPVVJDRX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcbmltcG9ydCB7RGF0YUZpbmRlcnMsIFF1ZXJ5VHlwZX0gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0RhdGFQcm92aWRlcnN9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXByb3ZpZGVycyc7XG5cblxuLyoqXG4gKiBDb252ZW5pZW50IHdyYXBwZXIgY2xhc3MgYXJvdW5kIGNvbnRyb2xzIHN1Y2ggYXMgcmFkaW9idXR0b25zLCBkcm9wZG93biwgY2hlY2tib3hlcyxcbiAqIENob29zZXIuIFRoZSB0eXBlIG9mIHRoZSBjaG9vc2VyIG1heSBiZSBkZXRlcm1pbmVkIGR5bmFtaWNhbGx5IGJhc2VkIG9uIHRoZSBudW1iZXIgb2YgaXRlbXMgaW5cbiAqIHRoZSBkYXRhIHNvdXJjZSBsaXN0LCBvciBjYW4gYmUgc3BlY2lmaWVkIGV4cGxpY2l0bHkgdmlhIHRoZSBcInR5cGVcIiBiaW5kaW5nLlxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWdlbmVyaWMtY2hvb3NlcicsXG4gICAgdGVtcGxhdGVVcmw6ICdnZW5lcmljLWNob29zZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydnZW5lcmljLWNob29zZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBHZW5lcmljQ2hvb3NlckNvbXBvbmVudCl9LFxuICAgICAgICB7cHJvdmlkZTogREFUQV9TT1VSQ0UsIHVzZUNsYXNzOiBDaG9vc2VyRGF0YVNvdXJjZSwgZGVwczogW0RhdGFQcm92aWRlcnMsIERhdGFGaW5kZXJzXX1cbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJpY0Nob29zZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudFxue1xuXG4gICAgLyoqXG4gICAgICogT3JkZXJlZCBsaXN0IG9mIGl0ZW1zIGFzc2lnbmFibGUgdG8gdGhlIGtleSBvZiB0aGUgb2JqZWN0XG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBsaXN0OiBhbnlbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvYmplY3QgdGhpcyBjb250cm9sIGlzIGJlaW5nIGFzc2lnbmVkIHRvLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgb2JqZWN0OiBhbnk7XG5cblxuICAgIC8qKlxuICAgICAqIFRoZSBrZXkgZmllbGQgcGF0aCB0aGlzIGNvbnRyb2wgaXMgYmVpbmcgYXNzaWduZWQgdG8uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBrZXk6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogQ2FuIGJlIHVzZWQgaW4gcGxhY2Ugb2YgTElTVCBiaW5kaW5nIHRvIHJldHJpZXZlIGEgbGlzdCBiYXNlZCBvbiB0aGUgQ2hvaWNlU291cmNlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRlc3RpbmF0aW9uQ2xhc3M6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogVXNlZCB3aGVuIHJldHJpZXZpbmcgY2hvaWNlU291cmNlIGJ5IGRlc3RpbmF0aW9uIGNsYXNzIGFuZCB0aGlzIGFyZSBleHRyYSBwYXJhbXMgdGhhdCBjYW4gYmVcbiAgICAgKiB1c2VkIHRvIG5hcnJvdyB0aGUgbWF0Y2hpbmcgb3IgdG8gcGFzcyBwYXJhbWV0ZXJzIGludG8gQ2hvaWNlU291cmNlIHByb3ZpZGVyXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjaG9pY2VQcm92aWRlclBhcmFtczogTWFwPHN0cmluZywgYW55PjtcblxuXG4gICAgLyoqXG4gICAgICogIElzIHRoaXMgYSBMaXN0IHByb3BlcnR5LCBvciBhIHRvLW9uZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG11bHRpc2VsZWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAgVGhlIHN0eWxlIG9mIGNob29zZXIgdG8gdXNlIChSYWRpbywgQ2hlY2tib3gsIERyb3Bkb3duLCBDaG9vc2VyKVxuICAgICAqICBEZWZhdWx0cyBiYXNlZCBvbiBjYXJkaW5hbGl0eSBvZiB0aGUgbGlzdCBhbmQgd2hldGhlciBpdCdzIG11bHRpU2VsZWN0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU3VwcG9ydCBjdXN0b20ga2V5LiBpbiBvcmRlciB0byBtYWtlIHRoaXMgd29yayB3ZSBuZWVkIHRvIGludHJvZHVjZSBjdXN0b20gPHRlbXBsYXRlcz4gZm9yXG4gICAgICogYWxsIHRoaXMgY2hvb3NlciB0eXBlc1xuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheUtleTogc3RyaW5nO1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogIFNob3VsZCB3ZSBhdHRlbXB0IGEgbWF0Y2ggYXMgdGhleSB0eXBlIChhZ2FpbnN0IHRoZSBmdWxsIGxpc3QpXG4gICAgLy8gICovXG4gICAgLy8gQElucHV0KClcbiAgICAvLyBhbGxvd0Z1bGxNYXRjaE9uSW5wdXQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBTdHJpbmcgcmVuZGVyZWQgYXMgZmlyc3QgdmFsdWUgaW4gdGhlIGRyb3Bkb3duIHdoaWNoIGxldCB0aGUgdXNlciB0byBtYWtlICdubyBzZWxlY3Rpb24nXG4gICAgICogZnJvbSBhdmFpbGFibGUgbGlzdCBvZiB2YWx1ZXMuIFdoZW4gdGhpcyBvcHRpb24gaXMgYWN0aXZlIGFuZCB1c2UgbWFrZSB0aGlzIHNlbGVjdGlvbiB3ZVxuICAgICAqIHNhdmUgYSBOVUxMIHZhbHVlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBub1NlbGVjdGlvblN0cmluZzogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmljIENob29zZXIgd29ya3MgZGlyZWN0bHkgd2l0aCBvYmplY3QgYW5kIGl0cyByZWZlcmVuY2VzIGFuZCB3ZSBuZWVkIHRvIGNyZWF0ZSB0aGlzXG4gICAgICoga2V5cGF0aCB0byBiZSBhYmxlIHRvIHNldC9nZXQgdmFsdWUgZnJvbSB0YXJnZXQgb3IgcGFyZW50IG9iamVjdFxuICAgICAqL1xuICAgIGtleVBhdGg6IEZpZWxkUGF0aDtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQsIHByaXZhdGUgX3ZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgQEluamVjdChEQVRBX1NPVVJDRSkgcHVibGljIGRhdGFTb3VyY2U6IENob29zZXJEYXRhU291cmNlLFxuICAgICAgICAgICAgICAgIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBCYXNlRm9ybUNvbXBvbmVudCkpXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHBhcmVudENvbnRhaW5lcjogQmFzZUZvcm1Db21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYsIHBhcmVudENvbnRhaW5lcik7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMub2JqZWN0KSkge1xuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSAoPGFueT50aGlzLl92aWV3Q29udGFpbmVyLmluamVjdG9yKS52aWV3LmNvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXlQYXRoID0gbmV3IEZpZWxkUGF0aCh0aGlzLmtleSk7XG4gICAgICAgIGxldCBkZWZhdWx0RGF0YVByb3ZpZGVyID0gbnVsbDtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGlzdCkpIHtcbiAgICAgICAgICAgIGRlZmF1bHREYXRhUHJvdmlkZXIgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YVByb3ZpZGVycy5maW5kKHRoaXMubGlzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWZhdWx0RGF0YVByb3ZpZGVyID0gdGhpcy5kYXRhU291cmNlLmRhdGFQcm92aWRlcnMuZmluZCh0aGlzLmRlc3RpbmF0aW9uQ2xhc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb2plY3RlZFNpemUgPSBkZWZhdWx0RGF0YVByb3ZpZGVyLmV4cGVjdGVkQ291bnQodGhpcy5jaG9pY2VQcm92aWRlclBhcmFtcyk7XG4gICAgICAgIHRoaXMuaW5pdFR5cGUocHJvamVjdGVkU2l6ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ0Nob29zZXInKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5pbml0KHtcbiAgICAgICAgICAgICAgICBkYXRhUHJvdmlkZXI6IGRlZmF1bHREYXRhUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgcXVlcnlUeXBlOiBRdWVyeVR5cGUuRnVsbFRleHQsXG4gICAgICAgICAgICAgICAgbG9va3VwS2V5OiB0aGlzLmRpc3BsYXlLZXksXG4gICAgICAgICAgICAgICAgc3RhdGU6IG5ldyBDaG9vc2VyU3RhdGUobmV3IEdDQ2hvb3NlclN0YXRlKHRoaXMpLCB0aGlzLm11bHRpc2VsZWN0KSxcbiAgICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdGhpcy5tdWx0aXNlbGVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIGRvIHdlIG5lZWQgdG8gcmVhZCB0aGlzIHZhbHVlIGluIGFzeW5jP1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gZGVmYXVsdERhdGFQcm92aWRlci5kYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIucmVnaXN0ZXJGb3JtQ29udHJvbCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgIHRoaXMudmFsaWRhdGVSZXF1aXJlZCgpO1xuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgLy8gdGhpcy5ub1NlbGVjdGlvblN0cmluZyA9IHRoaXMuaTE4bi5pbnN0YW50KCdXaWRnZXRzLmdjaG9vc2VyLm5vU2VsU3RyaW5nJyk7XG4gICAgICAgICAgICB0aGlzLm5vU2VsZWN0aW9uU3RyaW5nID0gJ1NlbGVjdCBhIEl0ZW0nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIEBJbnB1dCB0eXBlIGlzIG5vdCBwYXNzZWQgd2UgdHJ5IHRvIGd1ZXNzIGFuZCBzZWxlY3QgdGhlIGJlc3QgdHlwZSBmb3IgY3VycmVudCBkYXRhXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRUeXBlKHByb2plY3RlZFNpemU6IG51bWJlcilcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMudHlwZSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gKHByb2plY3RlZFNpemUgPD0gMCB8fCBwcm9qZWN0ZWRTaXplID4gOCkgPyAnQ2hvb3NlcicgOiAnQ2hlY2tib3gnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSAocHJvamVjdGVkU2l6ZSA8PSAwIHx8IHByb2plY3RlZFNpemUgPiAyMCkgPyAnQ2hvb3NlcidcbiAgICAgICAgICAgICAgICAgICAgOiAocHJvamVjdGVkU2l6ZSA8IDYpID8gJ1JhZGlvJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAnRHJvcGRvd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlcmUgYXJlIGNlcnRhaW4gcHJvcGVydGllcyB3aGljaCBhcmUgcmVxdWlyZWQgYnkgdGhpcyBjb21wb25lbnQuIEFzIGFscmVhZHkgbWVudGlvbmVkXG4gICAgICogYWJvdmUgR2VuZXJpY0Nob29zZXIgd29ya3Mgd2l0aCByZWZlcmVuY2VzIGFuZCB0aGVmb3JlIHR3byBrZXkgcHJvcGVydGllcyBhcmUgb2JqZWN0IGFuZCBrZXlcbiAgICAgKiBzbyB3ZSBjYW4gYWNjZXNzIGFuIG9iamVjdFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlUmVxdWlyZWQoKVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5vYmplY3QpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IGNvbnRpbnVlIHdpdGhvdXQgYSBvYmplY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMua2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBjb250aW51ZSB3aXRob3V0IGEga2V5IGJpbmRpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmxpc3QpICYmIGlzQmxhbmsodGhpcy5kZXN0aW5hdGlvbkNsYXNzKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBjb250aW51ZSB3aXRob3V0IGhhdmluZyBlaXRoZXIgbGlzdCBvZiB2YWx1ZXMgb3IgZGVzdGluYXRpb25DbGFzcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUpICYmXG4gICAgICAgICAgICAodGhpcy50eXBlICE9PSAnUmFkaW8nICYmIHRoaXMudHlwZSAhPT0gJ0NoZWNrYm94JyAmJiB0aGlzLnR5cGUgIT09ICdEcm9wZG93bicgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgIT09ICdDaG9vc2VyJykpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgaW5zdGFudGlhdGUgR2VuZXJpY0Nob29zZXIgIC0gaW52YWxpZCB0eXBlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmRpc3BsYXlLZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlLZXkgPSAndG9TdHJpbmcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIHdoZW4gZGlzcGxheWluZyB2YWx1ZSBib3RoIGZyb20gcHJpbWl0aXZlIHR5cGUgYXMgd2VsbCBjb21wbGV4IG9iamVjdC4gSWYgeW91IHdhbnQgdG9cbiAgICAgKiBjb250cm9sIGhvdyBpdGVtIGlzIGRpc3BsYXllZCB5b3UgY2FuIHByb3ZpZGUgZGlzcGxheSBrZXksIHdoaWNoIGlzIGNhbiBiZSBhICBtZXRob2Qgb3JcbiAgICAgKiBwcm9wZXJ0eSBvZiB0aGUgb2JqZWN0IHlvdSBhcmUgZGlzcGxheWluZy5cbiAgICAgKlxuICAgICAqIFRvZG86IHRoaW5rIGFib3V0IGZvcm1hdHRlcnMgYXMgd2VsbFxuICAgICAqXG4gICAgICovXG4gICAgZGlzcGxheVZhbHVlKGl0ZW06IGFueSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5kaXNwbGF5S2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBGaWVsZFBhdGguZ2V0RmllbGRWYWx1ZShpdGVtLCB0aGlzLmRpc3BsYXlLZXkpO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihmaWVsZFZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUuY2FsbChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBSZXRyaWV2ZSBhIGN1cnJlbnQgdmFsdWUgZnJvbSB0aGUgcGFyZW50L3RhcmdldCBvYmplY3RcbiAgICAgKlxuICAgICAqL1xuICAgIGdldCBzZWxlY3Rpb24oKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlQYXRoLmdldEZpZWxkVmFsdWUodGhpcy5vYmplY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBzZXQgdmFsdWUgYmFjayB0byB0aGUgb2JqZWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBzZXQgc2VsZWN0aW9uKHZhbHVlOiBhbnkpXG4gICAge1xuICAgICAgICB0aGlzLmtleVBhdGguc2V0RmllbGRWYWx1ZSh0aGlzLm9iamVjdCwgdmFsdWUpO1xuICAgIH1cblxuXG4gICAgb25TZWxlY3Rpb24odmFsdWU6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzRGlydHkoKTtcblxuICAgIH1cbn1cblxuLyoqXG4gKiBHZW5lcmljQ2hvb3NlciBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgQ2hvb3NlclNlbGVjdGlvblN0YXRlIHdoaWNoIGlzIHVzZWQgd2hlbiBUeXBlID0gQ2hvb3Nlci5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBHQ0Nob29zZXJTdGF0ZSBleHRlbmRzIENob29zZXJTZWxlY3Rpb25TdGF0ZVxue1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnQ2hvb3NlcjogR2VuZXJpY0Nob29zZXJDb21wb25lbnQpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHNldFNlbGVjdGlvblN0YXRlKHNlbGVjdGlvbjogYW55LCBzZWxlY3RlZDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChzZWxlY3RlZCA9PT0gdGhpcy5pc1NlbGVjdGVkKHNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdDaG9vc2VyLm11bHRpc2VsZWN0KSB7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiBpbXBsZW1lbnQgc21hcnRlciBhbmQgbW9yZSBnZW5lcmljIHdheSBob3cgd2UgdXNlIGl0IGluIGphdmFcbiAgICAgICAgICAgIC8vIFJlbGF0aW9uc2hpcEZpZWxkLmFkZFRvKF9vYmplY3QsIF9rZXlQYXRoLCBzZWxlY3Rpb24pO1xuXG4gICAgICAgICAgICBsZXQgbXVsdGlSZWw6IEFycmF5PGFueT4gPSB0aGlzLmdDaG9vc2VyLmtleVBhdGguZ2V0RmllbGRWYWx1ZSh0aGlzLmdDaG9vc2VyLm9iamVjdCk7XG4gICAgICAgICAgICBpZiAoaXNCbGFuayhtdWx0aVJlbCkpIHtcbiAgICAgICAgICAgICAgICBtdWx0aVJlbCA9IFtdO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtdWx0aVJlbCkgJiYgIWlzQXJyYXkobXVsdGlSZWwpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJIGNhbiBub3Qgc3RvcmUgbXVsdGlzZWxlY3QgdmFsdWUgaW50byBub24tYXJyYXkgb2JqZWN0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIG11bHRpUmVsLnB1c2goc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdDaG9vc2VyLnNlbGVjdGlvbiA9IG11bHRpUmVsO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZUlmRXhpc3QobXVsdGlSZWwsIHNlbGVjdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ0Nob29zZXIuc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RlZE9iamVjdCgpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmdDaG9vc2VyLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICBsZXQgb2JqZWN0cyA9IHRoaXMuc2VsZWN0ZWRPYmplY3RzKCk7XG4gICAgICAgICAgICByZXR1cm4gKGlzQmxhbmsob2JqZWN0cykgfHwgTGlzdFdyYXBwZXIuaXNFbXB0eShvYmplY3RzKSkgPyBudWxsIDogTGlzdFdyYXBwZXIubGFzdChcbiAgICAgICAgICAgICAgICBvYmplY3RzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nQ2hvb3Nlci5zZWxlY3Rpb247XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRPYmplY3RzKCk6IEFycmF5PGFueT5cbiAgICB7XG4gICAgICAgIGxldCBzZWxlY3Rpb24gPSB0aGlzLmdDaG9vc2VyLnNlbGVjdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuZ0Nob29zZXIubXVsdGlzZWxlY3QgJiYgaXNCbGFuayhzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuZ0Nob29zZXIubXVsdGlzZWxlY3QgJiYgaXNBcnJheShzZWxlY3Rpb24pKSA/IHNlbGVjdGlvbiA6IFtzZWxlY3Rpb25dO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoc2VsZWN0aW9uOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodGhpcy5nQ2hvb3Nlci5tdWx0aXNlbGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIExpc3RXcmFwcGVyLmNvbnRhaW5zQ29tcGxleCh0aGlzLnNlbGVjdGVkT2JqZWN0cygpLCBzZWxlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRPYmplY3QoKTtcbiAgICAgICAgcmV0dXJuIGVxdWFscyhjdXJWYWx1ZSwgc2VsZWN0aW9uKTtcbiAgICB9XG59XG4iXX0=