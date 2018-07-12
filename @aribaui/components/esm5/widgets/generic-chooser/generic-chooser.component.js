/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        var /** @type {?} */ defaultDataProvider = null;
        if (isPresent(this.list)) {
            defaultDataProvider = this.dataSource.dataProviders.find(this.list);
        }
        else {
            defaultDataProvider = this.dataSource.dataProviders.find(this.destinationClass);
        }
        var /** @type {?} */ projectedSize = defaultDataProvider.expectedCount(this.choiceProviderParams);
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
        var /** @type {?} */ fieldValue = FieldPath.getFieldValue(item, this.displayKey);
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
                    styles: [""],
                    providers: [
                        { provide: BaseFormComponent, useExisting: forwardRef(function () { return GenericChooserComponent; }) },
                        { provide: DATA_SOURCE, useClass: ChooserDataSource, deps: [DataProviders, DataFinders] }
                    ]
                },] },
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
function GenericChooserComponent_tsickle_Closure_declarations() {
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
            // Check if we can implement smarter and more generic way how we use it in java
            // RelationshipField.addTo(_object, _keyPath, selection);
            var /** @type {?} */ multiRel = this.gChooser.keyPath.getFieldValue(this.gChooser.object);
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
            var /** @type {?} */ objects = this.selectedObjects();
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
        var /** @type {?} */ selection = this.gChooser.selection;
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
        var /** @type {?} */ curValue = this.selectedObject();
        return equals(curValue, selection);
    };
    return GCChooserState;
}(ChooserSelectionState));
/**
 * GenericChooser implementation of the ChooserSelectionState which is used when Type = Chooser.
 *
 */
export { GCChooserState };
function GCChooserState_tsickle_Closure_declarations() {
    /** @type {?} */
    GCChooserState.prototype.gChooser;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpYy1jaG9vc2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2dlbmVyaWMtY2hvb3Nlci9nZW5lcmljLWNob29zZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFFBQVEsRUFDUixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFdBQVcsRUFDWCxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFNBQVMsRUFDVCxXQUFXLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7OztJQStFaEIsbURBQWlCO0lBaUYxRCxpQ0FBbUIsR0FBZ0IsRUFBVSxjQUFnQyxFQUNyQyxVQUE2QixFQUUvQyxlQUFrQztRQUh4RCxZQUtJLGtCQUFNLEdBQUcsRUFBRSxlQUFlLENBQUMsU0FDOUI7UUFOa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTtRQUFVLG9CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQUNyQyxn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SUFFRCx3Q0FBZTs7O0lBQWY7UUFFSSxxQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN0Rjs7Ozs7SUFFRCxtQ0FBVTs7OztJQUFWLFVBQVcsU0FBYztRQUVyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3pFO1FBQ0QscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUN0Qzt5QkEvYUw7RUF5V29DLHFCQUFxQixFQXVFeEQsQ0FBQTs7Ozs7QUF2RUQsMEJBdUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPcHRpb25hbCxcbiAgICBTa2lwU2VsZixcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBFbnZpcm9ubWVudCxcbiAgICBlcXVhbHMsXG4gICAgRmllbGRQYXRoLFxuICAgIGlzQXJyYXksXG4gICAgaXNCbGFuayxcbiAgICBpc0Z1bmN0aW9uLFxuICAgIGlzUHJlc2VudCxcbiAgICBMaXN0V3JhcHBlclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7Q2hvb3NlclNlbGVjdGlvblN0YXRlfSBmcm9tICcuLi9jaG9vc2VyL2Nob29zZXItc2VsZWN0aW9uLXN0YXRlJztcbmltcG9ydCB7Q2hvb3NlclN0YXRlfSBmcm9tICcuLi9jaG9vc2VyL2Nob29zZXItc3RhdGUnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7Q2hvb3NlckRhdGFTb3VyY2V9IGZyb20gJy4uL2Nob29zZXIvY2hvb3Nlci1kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0RBVEFfU09VUkNFfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtEYXRhRmluZGVycywgUXVlcnlUeXBlfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1maW5kZXJzJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcblxuXG4vKipcbiAqIENvbnZlbmllbnQgd3JhcHBlciBjbGFzcyBhcm91bmQgY29udHJvbHMgc3VjaCBhcyByYWRpb2J1dHRvbnMsIGRyb3Bkb3duLCBjaGVja2JveGVzLFxuICogQ2hvb3Nlci4gVGhlIHR5cGUgb2YgdGhlIGNob29zZXIgbWF5IGJlIGRldGVybWluZWQgZHluYW1pY2FsbHkgYmFzZWQgb24gdGhlIG51bWJlciBvZiBpdGVtcyBpblxuICogdGhlIGRhdGEgc291cmNlIGxpc3QsIG9yIGNhbiBiZSBzcGVjaWZpZWQgZXhwbGljaXRseSB2aWEgdGhlIFwidHlwZVwiIGJpbmRpbmcuXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZ2VuZXJpYy1jaG9vc2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInR5cGVcIj5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cIidDaGVja2JveCdcIj5cbiAgICAgICAgPGF3LWNoZWNrYm94LWxpc3QgW2xpc3RdPVwibGlzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZV09XCJlZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3Rpb25zXT1cInNlbGVjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbbGFiZWxGb3JtYXR0ZXJdPVwiZGlzcGxheVZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uU2VsZWN0aW9uKT1cIm9uU2VsZWN0aW9uKCRldmVudClcIj5cbiAgICAgICAgPC9hdy1jaGVja2JveC1saXN0PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cIidSYWRpbydcIj5cbiAgICAgICAgPGF3LXJhZGlvYnV0dG9uLWxpc3QgW2xpc3RdPVwibGlzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3Rpb25dPVwic2VsZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlXT1cImVkaXRhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYWJlbEZvcm1hdHRlcl09XCJkaXNwbGF5VmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25TZWxlY3Rpb24pPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiPlxuICAgICAgICA8L2F3LXJhZGlvYnV0dG9uLWxpc3Q+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cIidEcm9wZG93bidcIj5cbiAgICAgICAgPGF3LWRyb3Bkb3duIFtsaXN0XT1cImxpc3RcIlxuICAgICAgICAgICAgICAgICAgICAgW2lzU3RhbmRhbG9uZV09XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVdPVwiZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgW25vU2VsZWN0aW9uU3RyaW5nXT1cIm5vU2VsZWN0aW9uU3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgIFtzZWxlY3Rpb25dPVwic2VsZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICBbbmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgIChvblNlbGVjdGlvbik9XCJvblNlbGVjdGlvbigkZXZlbnQpXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2l0ZW1UZW1wbGF0ZSBsZXQtaXRlbT5cblxuICAgICAgICAgICAgICAgIDwhLS0gdG9kbzogYWxsb3cgdG8gcGFzcyBhIFBJUEUgdG8gZG8gc29tZSBhZGRpdGlvbmFsIGZvcm1hdHRpbmcgLS0+XG4gICAgICAgICAgICAgICAge3sgZGlzcGxheVZhbHVlKGl0ZW0udmFsdWUpIH19XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2F3LWRyb3Bkb3duPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdTd2l0Y2hDYXNlXT1cIidDaG9vc2VyJ1wiPlxuICAgICAgICA8YXctY2hvb3NlciAjY2hvb3NlclxuICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVdPVwiZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgICAgICBbaXNTdGFuZGFsb25lXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFttdWx0aXNlbGVjdF09XCJtdWx0aXNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICAgIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIlxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVUcmFuc2Zvcm1lcl09XCJkaXNwbGF5VmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cblxuICAgICAgICA8L2F3LWNob29zZXI+XG5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gICAgc3R5bGVzOiBbYGBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQmFzZUZvcm1Db21wb25lbnQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEdlbmVyaWNDaG9vc2VyQ29tcG9uZW50KX0sXG4gICAgICAgIHtwcm92aWRlOiBEQVRBX1NPVVJDRSwgdXNlQ2xhc3M6IENob29zZXJEYXRhU291cmNlLCBkZXBzOiBbRGF0YVByb3ZpZGVycywgRGF0YUZpbmRlcnNdfVxuICAgIF1cblxufSlcbmV4cG9ydCBjbGFzcyBHZW5lcmljQ2hvb3NlckNvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50XG57XG5cbiAgICAvKipcbiAgICAgKiBPcmRlcmVkIGxpc3Qgb2YgaXRlbXMgYXNzaWduYWJsZSB0byB0aGUga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGxpc3Q6IGFueVtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9iamVjdCB0aGlzIGNvbnRyb2wgaXMgYmVpbmcgYXNzaWduZWQgdG8uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBvYmplY3Q6IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIGtleSBmaWVsZCBwYXRoIHRoaXMgY29udHJvbCBpcyBiZWluZyBhc3NpZ25lZCB0by5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGtleTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBDYW4gYmUgdXNlZCBpbiBwbGFjZSBvZiBMSVNUIGJpbmRpbmcgdG8gcmV0cmlldmUgYSBsaXN0IGJhc2VkIG9uIHRoZSBDaG9pY2VTb3VyY2VcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGVzdGluYXRpb25DbGFzczogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHdoZW4gcmV0cmlldmluZyBjaG9pY2VTb3VyY2UgYnkgZGVzdGluYXRpb24gY2xhc3MgYW5kIHRoaXMgYXJlIGV4dHJhIHBhcmFtcyB0aGF0IGNhbiBiZVxuICAgICAqIHVzZWQgdG8gbmFycm93IHRoZSBtYXRjaGluZyBvciB0byBwYXNzIHBhcmFtZXRlcnMgaW50byBDaG9pY2VTb3VyY2UgcHJvdmlkZXJcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGNob2ljZVByb3ZpZGVyUGFyYW1zOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG5cbiAgICAvKipcbiAgICAgKiAgSXMgdGhpcyBhIExpc3QgcHJvcGVydHksIG9yIGEgdG8tb25lLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgbXVsdGlzZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqICBUaGUgc3R5bGUgb2YgY2hvb3NlciB0byB1c2UgKFJhZGlvLCBDaGVja2JveCwgRHJvcGRvd24sIENob29zZXIpXG4gICAgICogIERlZmF1bHRzIGJhc2VkIG9uIGNhcmRpbmFsaXR5IG9mIHRoZSBsaXN0IGFuZCB3aGV0aGVyIGl0J3MgbXVsdGlTZWxlY3QuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTdXBwb3J0IGN1c3RvbSBrZXkuIGluIG9yZGVyIHRvIG1ha2UgdGhpcyB3b3JrIHdlIG5lZWQgdG8gaW50cm9kdWNlIGN1c3RvbSA8dGVtcGxhdGVzPiBmb3JcbiAgICAgKiBhbGwgdGhpcyBjaG9vc2VyIHR5cGVzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5S2V5OiBzdHJpbmc7XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiAgU2hvdWxkIHdlIGF0dGVtcHQgYSBtYXRjaCBhcyB0aGV5IHR5cGUgKGFnYWluc3QgdGhlIGZ1bGwgbGlzdClcbiAgICAvLyAgKi9cbiAgICAvLyBASW5wdXQoKVxuICAgIC8vIGFsbG93RnVsbE1hdGNoT25JbnB1dDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFN0cmluZyByZW5kZXJlZCBhcyBmaXJzdCB2YWx1ZSBpbiB0aGUgZHJvcGRvd24gd2hpY2ggbGV0IHRoZSB1c2VyIHRvIG1ha2UgJ25vIHNlbGVjdGlvbidcbiAgICAgKiBmcm9tIGF2YWlsYWJsZSBsaXN0IG9mIHZhbHVlcy4gV2hlbiB0aGlzIG9wdGlvbiBpcyBhY3RpdmUgYW5kIHVzZSBtYWtlIHRoaXMgc2VsZWN0aW9uIHdlXG4gICAgICogc2F2ZSBhIE5VTEwgdmFsdWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIG5vU2VsZWN0aW9uU3RyaW5nOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqIEdlbmVyaWMgQ2hvb3NlciB3b3JrcyBkaXJlY3RseSB3aXRoIG9iamVjdCBhbmQgaXRzIHJlZmVyZW5jZXMgYW5kIHdlIG5lZWQgdG8gY3JlYXRlIHRoaXNcbiAgICAgKiBrZXlwYXRoIHRvIGJlIGFibGUgdG8gc2V0L2dldCB2YWx1ZSBmcm9tIHRhcmdldCBvciBwYXJlbnQgb2JqZWN0XG4gICAgICovXG4gICAga2V5UGF0aDogRmllbGRQYXRoO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHJpdmF0ZSBfdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBASW5qZWN0KERBVEFfU09VUkNFKSBwdWJsaWMgZGF0YVNvdXJjZTogQ2hvb3NlckRhdGFTb3VyY2UsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEJhc2VGb3JtQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgcGFyZW50Q29udGFpbmVyKTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5vYmplY3QpKSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdCA9ICg8YW55PnRoaXMuX3ZpZXdDb250YWluZXIuaW5qZWN0b3IpLnZpZXcuY29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleVBhdGggPSBuZXcgRmllbGRQYXRoKHRoaXMua2V5KTtcbiAgICAgICAgbGV0IGRlZmF1bHREYXRhUHJvdmlkZXIgPSBudWxsO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5saXN0KSkge1xuICAgICAgICAgICAgZGVmYXVsdERhdGFQcm92aWRlciA9IHRoaXMuZGF0YVNvdXJjZS5kYXRhUHJvdmlkZXJzLmZpbmQodGhpcy5saXN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlZmF1bHREYXRhUHJvdmlkZXIgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YVByb3ZpZGVycy5maW5kKHRoaXMuZGVzdGluYXRpb25DbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvamVjdGVkU2l6ZSA9IGRlZmF1bHREYXRhUHJvdmlkZXIuZXhwZWN0ZWRDb3VudCh0aGlzLmNob2ljZVByb3ZpZGVyUGFyYW1zKTtcbiAgICAgICAgdGhpcy5pbml0VHlwZShwcm9qZWN0ZWRTaXplKTtcblxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAnQ2hvb3NlcicpIHtcblxuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLmluaXQoe1xuICAgICAgICAgICAgICAgIGRhdGFQcm92aWRlcjogZGVmYXVsdERhdGFQcm92aWRlcixcbiAgICAgICAgICAgICAgICBxdWVyeVR5cGU6IFF1ZXJ5VHlwZS5GdWxsVGV4dCxcbiAgICAgICAgICAgICAgICBsb29rdXBLZXk6IHRoaXMuZGlzcGxheUtleSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogbmV3IENob29zZXJTdGF0ZShuZXcgR0NDaG9vc2VyU3RhdGUodGhpcyksIHRoaXMubXVsdGlzZWxlY3QpLFxuICAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0aGlzLm11bHRpc2VsZWN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gZG8gd2UgbmVlZCB0byByZWFkIHRoaXMgdmFsdWUgaW4gYXN5bmM/XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBkZWZhdWx0RGF0YVByb3ZpZGVyLmRhdGEoKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5yZWdpc3RlckZvcm1Db250cm9sKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlcXVpcmVkKCk7XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5zZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAvLyB0aGlzLm5vU2VsZWN0aW9uU3RyaW5nID0gdGhpcy5pMThuLmluc3RhbnQoJ1dpZGdldHMuZ2Nob29zZXIubm9TZWxTdHJpbmcnKTtcbiAgICAgICAgICAgIHRoaXMubm9TZWxlY3Rpb25TdHJpbmcgPSAnU2VsZWN0IGEgSXRlbSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gQElucHV0IHR5cGUgaXMgbm90IHBhc3NlZCB3ZSB0cnkgdG8gZ3Vlc3MgYW5kIHNlbGVjdCB0aGUgYmVzdCB0eXBlIGZvciBjdXJyZW50IGRhdGFcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdFR5cGUocHJvamVjdGVkU2l6ZTogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy50eXBlKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSAocHJvamVjdGVkU2l6ZSA8PSAwIHx8IHByb2plY3RlZFNpemUgPiA4KSA/ICdDaG9vc2VyJyA6ICdDaGVja2JveCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IChwcm9qZWN0ZWRTaXplIDw9IDAgfHwgcHJvamVjdGVkU2l6ZSA+IDIwKSA/ICdDaG9vc2VyJ1xuICAgICAgICAgICAgICAgICAgICA6IChwcm9qZWN0ZWRTaXplIDwgNikgPyAnUmFkaW8nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICdEcm9wZG93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGVyZSBhcmUgY2VydGFpbiBwcm9wZXJ0aWVzIHdoaWNoIGFyZSByZXF1aXJlZCBieSB0aGlzIGNvbXBvbmVudC4gQXMgYWxyZWFkeSBtZW50aW9uZWRcbiAgICAgKiBhYm92ZSBHZW5lcmljQ2hvb3NlciB3b3JrcyB3aXRoIHJlZmVyZW5jZXMgYW5kIHRoZWZvcmUgdHdvIGtleSBwcm9wZXJ0aWVzIGFyZSBvYmplY3QgYW5kIGtleVxuICAgICAqIHNvIHdlIGNhbiBhY2Nlc3MgYW4gb2JqZWN0XG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVSZXF1aXJlZCgpXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLm9iamVjdCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDYW5ub3QgY29udGludWUgd2l0aG91dCBhIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5rZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IGNvbnRpbnVlIHdpdGhvdXQgYSBrZXkgYmluZGluZycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMubGlzdCkgJiYgaXNCbGFuayh0aGlzLmRlc3RpbmF0aW9uQ2xhc3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ2Fubm90IGNvbnRpbnVlIHdpdGhvdXQgaGF2aW5nIGVpdGhlciBsaXN0IG9mIHZhbHVlcyBvciBkZXN0aW5hdGlvbkNsYXNzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQcmVzZW50KFxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSkgJiZcbiAgICAgICAgICAgICh0aGlzLnR5cGUgIT09ICdSYWRpbycgJiYgdGhpcy50eXBlICE9PSAnQ2hlY2tib3gnICYmIHRoaXMudHlwZSAhPT0gJ0Ryb3Bkb3duJyAmJlxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSAhPT0gJ0Nob29zZXInKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBHZW5lcmljQ2hvb3NlciAgLSBpbnZhbGlkIHR5cGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuZGlzcGxheUtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUtleSA9ICd0b1N0cmluZyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgd2hlbiBkaXNwbGF5aW5nIHZhbHVlIGJvdGggZnJvbSBwcmltaXRpdmUgdHlwZSBhcyB3ZWxsIGNvbXBsZXggb2JqZWN0LiBJZiB5b3Ugd2FudCB0b1xuICAgICAqIGNvbnRyb2wgaG93IGl0ZW0gaXMgZGlzcGxheWVkIHlvdSBjYW4gcHJvdmlkZSBkaXNwbGF5IGtleSwgd2hpY2ggaXMgY2FuIGJlIGEgIG1ldGhvZCBvclxuICAgICAqIHByb3BlcnR5IG9mIHRoZSBvYmplY3QgeW91IGFyZSBkaXNwbGF5aW5nLlxuICAgICAqXG4gICAgICogVG9kbzogdGhpbmsgYWJvdXQgZm9ybWF0dGVycyBhcyB3ZWxsXG4gICAgICpcbiAgICAgKi9cbiAgICBkaXNwbGF5VmFsdWUoaXRlbTogYW55KTogc3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmRpc3BsYXlLZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IEZpZWxkUGF0aC5nZXRGaWVsZFZhbHVlKGl0ZW0sIHRoaXMuZGlzcGxheUtleSk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGZpZWxkVmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZS5jYWxsKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIFJldHJpZXZlIGEgY3VycmVudCB2YWx1ZSBmcm9tIHRoZSBwYXJlbnQvdGFyZ2V0IG9iamVjdFxuICAgICAqXG4gICAgICovXG4gICAgZ2V0IHNlbGVjdGlvbigpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleVBhdGguZ2V0RmllbGRWYWx1ZSh0aGlzLm9iamVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHNldCB2YWx1ZSBiYWNrIHRvIHRoZSBvYmplY3RcbiAgICAgKlxuICAgICAqL1xuICAgIHNldCBzZWxlY3Rpb24odmFsdWU6IGFueSlcbiAgICB7XG4gICAgICAgIHRoaXMua2V5UGF0aC5zZXRGaWVsZFZhbHVlKHRoaXMub2JqZWN0LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICBvblNlbGVjdGlvbih2YWx1ZTogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuXG4gICAgfVxufVxuXG4vKipcbiAqIEdlbmVyaWNDaG9vc2VyIGltcGxlbWVudGF0aW9uIG9mIHRoZSBDaG9vc2VyU2VsZWN0aW9uU3RhdGUgd2hpY2ggaXMgdXNlZCB3aGVuIFR5cGUgPSBDaG9vc2VyLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEdDQ2hvb3NlclN0YXRlIGV4dGVuZHMgQ2hvb3NlclNlbGVjdGlvblN0YXRlXG57XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdDaG9vc2VyOiBHZW5lcmljQ2hvb3NlckNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgc2V0U2VsZWN0aW9uU3RhdGUoc2VsZWN0aW9uOiBhbnksIHNlbGVjdGVkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkID09PSB0aGlzLmlzU2VsZWN0ZWQoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZ0Nob29zZXIubXVsdGlzZWxlY3QpIHtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UgY2FuIGltcGxlbWVudCBzbWFydGVyIGFuZCBtb3JlIGdlbmVyaWMgd2F5IGhvdyB3ZSB1c2UgaXQgaW4gamF2YVxuICAgICAgICAgICAgLy8gUmVsYXRpb25zaGlwRmllbGQuYWRkVG8oX29iamVjdCwgX2tleVBhdGgsIHNlbGVjdGlvbik7XG5cbiAgICAgICAgICAgIGxldCBtdWx0aVJlbDogQXJyYXk8YW55PiA9IHRoaXMuZ0Nob29zZXIua2V5UGF0aC5nZXRGaWVsZFZhbHVlKHRoaXMuZ0Nob29zZXIub2JqZWN0KTtcbiAgICAgICAgICAgIGlmIChpc0JsYW5rKG11bHRpUmVsKSkge1xuICAgICAgICAgICAgICAgIG11bHRpUmVsID0gW107XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KG11bHRpUmVsKSAmJiAhaXNBcnJheShtdWx0aVJlbCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuIG5vdCBzdG9yZSBtdWx0aXNlbGVjdCB2YWx1ZSBpbnRvIG5vbi1hcnJheSBvYmplY3QnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgbXVsdGlSZWwucHVzaChzZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ0Nob29zZXIuc2VsZWN0aW9uID0gbXVsdGlSZWw7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlSWZFeGlzdChtdWx0aVJlbCwgc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nQ2hvb3Nlci5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdGVkT2JqZWN0KCk6IGFueVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZ0Nob29zZXIubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgIGxldCBvYmplY3RzID0gdGhpcy5zZWxlY3RlZE9iamVjdHMoKTtcbiAgICAgICAgICAgIHJldHVybiAoaXNCbGFuayhvYmplY3RzKSB8fCBMaXN0V3JhcHBlci5pc0VtcHR5KG9iamVjdHMpKSA/IG51bGwgOiBMaXN0V3JhcHBlci5sYXN0KFxuICAgICAgICAgICAgICAgIG9iamVjdHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdDaG9vc2VyLnNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBzZWxlY3RlZE9iamVjdHMoKTogQXJyYXk8YW55PlxuICAgIHtcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMuZ0Nob29zZXIuc2VsZWN0aW9uO1xuICAgICAgICBpZiAodGhpcy5nQ2hvb3Nlci5tdWx0aXNlbGVjdCAmJiBpc0JsYW5rKHNlbGVjdGlvbikpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5nQ2hvb3Nlci5tdWx0aXNlbGVjdCAmJiBpc0FycmF5KHNlbGVjdGlvbikpID8gc2VsZWN0aW9uIDogW3NlbGVjdGlvbl07XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChzZWxlY3Rpb246IGFueSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmdDaG9vc2VyLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdFdyYXBwZXIuY29udGFpbnNDb21wbGV4KHRoaXMuc2VsZWN0ZWRPYmplY3RzKCksIHNlbGVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1clZhbHVlID0gdGhpcy5zZWxlY3RlZE9iamVjdCgpO1xuICAgICAgICByZXR1cm4gZXF1YWxzKGN1clZhbHVlLCBzZWxlY3Rpb24pO1xuICAgIH1cbn1cbiJdfQ==