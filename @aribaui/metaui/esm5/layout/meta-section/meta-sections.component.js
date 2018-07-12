/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Environment, isBlank, isPresent } from '@aribaui/core';
import { MetaLayout } from '../meta-layout';
import { MetaContextComponent, MetaUIActionEvent } from '../../core/meta-context/meta-context.component';
import { SectionComponent } from '@aribaui/components';
/**
 * MetaSection renders list of sections defined by \@trait inside WidgetsRules. It uses layouts to
 * structure the list.
 *
 * ```
 *  layout {
 * \@trait=Sections { visible:true; component:MetaSectionsComponent }
 *  }
 *
 * ```
 *
 * and can be used as :
 *
 * ```
 *     layout=RfxDetailLayout#Sections {
 *
 * \@layout=Header#Form {
 *             trait:labelsOnTop;
 *             zonePath:Header;
 *
 *             bindings: {
 *                 description:$object.header.description;
 *             }
 *         }
 * \@layout=LineItems {
 *             component:RfxLineItemsComponent;
 *             bindings: {
 *                 rfxEvent:$object;
 *             }
 *         }
 * \@layout=Participants {
 *             component:RfxParticipantsComponent;
 *             bindings: {
 *                 rfxEvent:$object;
 *             }
 *         }
 *     }
 *
 *
 *     class=RfxEventHeader {
 *         zNone => *;
 *         Header.zLeft => requester => region => needBy;
 *     }
 * ```
 * In above example we have first section with Form where RfxEventHeader sends its fields
 * and several other sections with custom component.
 *
 *
 */
var MetaSectionsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MetaSectionsComponent, _super);
    function MetaSectionsComponent(_metaContext, env) {
        var _this = _super.call(this, _metaContext, env) || this;
        _this._metaContext = _metaContext;
        _this.env = env;
        _this.sectionOperations = {};
        _this.onCompleteSubscriptions = {};
        return _this;
    }
    /**
     * @return {?}
     */
    MetaSectionsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.allLayouts.forEach(function (value) {
            _this.sectionOperations[value.name] = 'view';
        });
    };
    /**
     * @return {?}
     */
    MetaSectionsComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngDoCheck.call(this);
    };
    /**
     * @return {?}
     */
    MetaSectionsComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.sections = tslib_1.__spread(this.viewSections.toArray());
    };
    /**
     * Action handler to broadcast event outside so it can be handled by the application
     *
     */
    /**
     * Action handler to broadcast event outside so it can be handled by the application
     *
     * @param {?} name
     * @param {?} sectionIndex
     * @param {?} cnxName
     * @param {?} event
     * @return {?}
     */
    MetaSectionsComponent.prototype.onAction = /**
     * Action handler to broadcast event outside so it can be handled by the application
     *
     * @param {?} name
     * @param {?} sectionIndex
     * @param {?} cnxName
     * @param {?} event
     * @return {?}
     */
    function (name, sectionIndex, cnxName, event) {
        var _this = this;
        var /** @type {?} */ section = this.sections[sectionIndex];
        if (this.env.hasValue('parent-cnx')) {
            var /** @type {?} */ cnx = this.env.getValue('parent-cnx');
            cnx.onAction.emit(new MetaUIActionEvent(section, name, cnxName, event));
        }
        if (name === 'onEdit' && section.editState && section.editMode === 'default') {
            this.sectionOperations[cnxName] = 'edit';
            if (isBlank(this.onCompleteSubscriptions[cnxName])) {
                section.onEditingComplete.subscribe(function (value) {
                    return _this.sectionOperations[cnxName] = 'view';
                });
                this.onCompleteSubscriptions[cnxName] = section;
            }
        }
    };
    /**
     *
     * Retrieves a property from the current context
     *
     */
    /**
     *
     * Retrieves a property from the current context
     *
     * @param {?} propName
     * @param {?} cnxName
     * @param {?} defaultVal
     * @return {?}
     */
    MetaSectionsComponent.prototype.sectionProp = /**
     *
     * Retrieves a property from the current context
     *
     * @param {?} propName
     * @param {?} cnxName
     * @param {?} defaultVal
     * @return {?}
     */
    function (propName, cnxName, defaultVal) {
        var /** @type {?} */ lContext = this.contextMap.get(cnxName);
        return (isPresent(lContext) && isPresent(lContext.propertyForKey(propName))) ?
            lContext.propertyForKey(propName) : defaultVal;
    };
    /**
     * @return {?}
     */
    MetaSectionsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnDestroy.call(this);
        this.allLayouts.forEach(function (value) {
            if (isPresent(_this.onCompleteSubscriptions[value.name])) {
                _this.onCompleteSubscriptions[value.name].onEditingComplete.unsubscribe();
            }
        });
    };
    MetaSectionsComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"meta-sections\">\n\n    <m-context *ngFor=\"let layout of allLayouts; let i = index\" [layout]=\"layout.name\"\n               [operation]=\"sectionOperations[layout.name]\"\n               (afterContextSet)=\"afterContextSet($event)\"\n               (beforeContextSet)=\"beforeContextSet($event)\">\n\n        <aw-section [title]=\"sectionProp('title', layout.name, null)\"\n                    [description]=\"sectionProp('description', layout.name, null)\"\n                    [opened]=\"sectionProp('opened', layout.name, true)\"\n                    [actionIcon]=\"sectionProp('actionIcon', layout.name, 'icon-edit')\"\n                    [editable]=\"sectionProp('canEdit', layout.name, false)\"\n                    [editMode]=\"sectionProp('editMode', layout.name, 'default')\"\n                    [disableClose]=\"sectionProp('disableClose', layout.name, false)\"\n                    (onEdit)=\"onAction('onEdit', i, layout.name, $event)\"\n                    (onSaveAction)=\"onAction('onSaveAction', i, layout.name, $event)\"\n                    (onCancelAction)=\"onAction('onCancelAction', i, layout.name, $event)\">\n\n            <m-include-component></m-include-component>\n        </aw-section>\n\n    </m-context>\n</div>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    MetaSectionsComponent.ctorParameters = function () { return [
        { type: MetaContextComponent },
        { type: Environment }
    ]; };
    MetaSectionsComponent.propDecorators = {
        viewSections: [{ type: ViewChildren, args: [SectionComponent,] }]
    };
    return MetaSectionsComponent;
}(MetaLayout));
export { MetaSectionsComponent };
function MetaSectionsComponent_tsickle_Closure_declarations() {
    /**
     * Collect list of sections that are rendered so we can use them later on when broadcasting
     * an event to application. In some case just like this you need to have a reference
     * to the component
     * @type {?}
     */
    MetaSectionsComponent.prototype.viewSections;
    /**
     * List of section read from QueryList after view is initialized
     * @type {?}
     */
    MetaSectionsComponent.prototype.sections;
    /** @type {?} */
    MetaSectionsComponent.prototype.sectionOperations;
    /** @type {?} */
    MetaSectionsComponent.prototype.onCompleteSubscriptions;
    /** @type {?} */
    MetaSectionsComponent.prototype._metaContext;
    /** @type {?} */
    MetaSectionsComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1zZWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1zZWN0aW9uL21ldGEtc2VjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBbUJBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQ0gsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNwQixNQUFNLGdEQUFnRCxDQUFDO0FBRXhELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUErRVYsaURBQVU7SUFzQmpELCtCQUFzQixZQUFrQyxFQUFTLEdBQWdCO1FBQWpGLFlBRUksa0JBQU0sWUFBWSxFQUFFLEdBQUcsQ0FBQyxTQUUzQjtRQUpxQixrQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxTQUFHLEdBQUgsR0FBRyxDQUFhO2tDQU5uQyxFQUFFO3dDQUdzQixFQUFFOztLQU92RTs7OztJQUdELHdDQUFROzs7SUFBUjtRQUFBLGlCQVFDO1FBTkcsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFxQjtZQUUxQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUMvQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELHlDQUFTOzs7SUFBVDtRQUVJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO0tBR3JCOzs7O0lBRUQsK0NBQWU7OztJQUFmO1FBRUksSUFBSSxDQUFDLFFBQVEsb0JBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQ7OztPQUdHOzs7Ozs7Ozs7O0lBQ0gsd0NBQVE7Ozs7Ozs7OztJQUFSLFVBQVMsSUFBWSxFQUFFLFlBQW9CLEVBQUUsT0FBZSxFQUFFLEtBQVU7UUFBeEUsaUJBcUJDO1FBbkJHLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxxQkFBSSxHQUFHLEdBQXlCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWhFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQzFELEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDZjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUV6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBVTtvQkFDM0MsT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTTtnQkFBeEMsQ0FBd0MsQ0FDM0MsQ0FBQztnQkFDRixJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO2FBQ25EO1NBRUo7S0FDSjtJQUdEOzs7O09BSUc7Ozs7Ozs7Ozs7SUFDSCwyQ0FBVzs7Ozs7Ozs7O0lBQVgsVUFBWSxRQUFnQixFQUFFLE9BQWUsRUFBRSxVQUFlO1FBRTFELHFCQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0tBQ3REOzs7O0lBR0QsMkNBQVc7OztJQUFYO1FBQUEsaUJBVUM7UUFSRyxpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQXFCO1lBRTFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxLQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzVFO1NBQ0osQ0FBQyxDQUFDO0tBQ047O2dCQWpJSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLCt1Q0F1QmI7b0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNmOzs7O2dCQWxGRyxvQkFBb0I7Z0JBSGhCLFdBQVc7OzsrQkE2RmQsWUFBWSxTQUFDLGdCQUFnQjs7Z0NBakhsQztFQTBHMkMsVUFBVTtTQUF4QyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhTGF5b3V0fSBmcm9tICcuLi9tZXRhLWxheW91dCc7XG5pbXBvcnQge1xuICAgIE1ldGFDb250ZXh0Q29tcG9uZW50LFxuICAgIE1ldGFVSUFjdGlvbkV2ZW50XG59IGZyb20gJy4uLy4uL2NvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuLi8uLi9jb3JlL2NvbnRleHQnO1xuaW1wb3J0IHtTZWN0aW9uQ29tcG9uZW50fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4uLy4uL2NvcmUvaXRlbS1wcm9wZXJ0aWVzJztcblxuLyoqXG4gKiBNZXRhU2VjdGlvbiByZW5kZXJzIGxpc3Qgb2Ygc2VjdGlvbnMgZGVmaW5lZCBieSBAdHJhaXQgaW5zaWRlIFdpZGdldHNSdWxlcy4gSXQgdXNlcyBsYXlvdXRzIHRvXG4gKiBzdHJ1Y3R1cmUgdGhlIGxpc3QuXG4gKlxuICogYGBgXG4gKiAgbGF5b3V0IHtcbiAqICAgICAgIEB0cmFpdD1TZWN0aW9ucyB7IHZpc2libGU6dHJ1ZTsgY29tcG9uZW50Ok1ldGFTZWN0aW9uc0NvbXBvbmVudCB9XG4gKiAgfVxuICpcbiAqIGBgYFxuICpcbiAqIGFuZCBjYW4gYmUgdXNlZCBhcyA6XG4gKlxuICogYGBgXG4gKiAgICAgbGF5b3V0PVJmeERldGFpbExheW91dCNTZWN0aW9ucyB7XG4gKlxuICogICAgICAgICBAbGF5b3V0PUhlYWRlciNGb3JtIHtcbiAqICAgICAgICAgICAgIHRyYWl0OmxhYmVsc09uVG9wO1xuICogICAgICAgICAgICAgem9uZVBhdGg6SGVhZGVyO1xuICpcbiAqICAgICAgICAgICAgIGJpbmRpbmdzOiB7XG4gKiAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246JG9iamVjdC5oZWFkZXIuZGVzY3JpcHRpb247XG4gKiAgICAgICAgICAgICB9XG4gKiAgICAgICAgIH1cbiAqICAgICAgICAgQGxheW91dD1MaW5lSXRlbXMge1xuICogICAgICAgICAgICAgY29tcG9uZW50OlJmeExpbmVJdGVtc0NvbXBvbmVudDtcbiAqICAgICAgICAgICAgIGJpbmRpbmdzOiB7XG4gKiAgICAgICAgICAgICAgICAgcmZ4RXZlbnQ6JG9iamVjdDtcbiAqICAgICAgICAgICAgIH1cbiAqICAgICAgICAgfVxuICogICAgICAgICBAbGF5b3V0PVBhcnRpY2lwYW50cyB7XG4gKiAgICAgICAgICAgICBjb21wb25lbnQ6UmZ4UGFydGljaXBhbnRzQ29tcG9uZW50O1xuICogICAgICAgICAgICAgYmluZGluZ3M6IHtcbiAqICAgICAgICAgICAgICAgICByZnhFdmVudDokb2JqZWN0O1xuICogICAgICAgICAgICAgfVxuICogICAgICAgICB9XG4gKiAgICAgfVxuICpcbiAqXG4gKiAgICAgY2xhc3M9UmZ4RXZlbnRIZWFkZXIge1xuICogICAgICAgICB6Tm9uZSA9PiAqO1xuICogICAgICAgICBIZWFkZXIuekxlZnQgPT4gcmVxdWVzdGVyID0+IHJlZ2lvbiA9PiBuZWVkQnk7XG4gKiAgICAgfVxuICogYGBgXG4gKiBJbiBhYm92ZSBleGFtcGxlIHdlIGhhdmUgZmlyc3Qgc2VjdGlvbiB3aXRoIEZvcm0gd2hlcmUgUmZ4RXZlbnRIZWFkZXIgc2VuZHMgaXRzIGZpZWxkc1xuICogYW5kIHNldmVyYWwgb3RoZXIgc2VjdGlvbnMgd2l0aCBjdXN0b20gY29tcG9uZW50LlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1ldGEtc2VjdGlvbnNcIj5cblxuICAgIDxtLWNvbnRleHQgKm5nRm9yPVwibGV0IGxheW91dCBvZiBhbGxMYXlvdXRzOyBsZXQgaSA9IGluZGV4XCIgW2xheW91dF09XCJsYXlvdXQubmFtZVwiXG4gICAgICAgICAgICAgICBbb3BlcmF0aW9uXT1cInNlY3Rpb25PcGVyYXRpb25zW2xheW91dC5uYW1lXVwiXG4gICAgICAgICAgICAgICAoYWZ0ZXJDb250ZXh0U2V0KT1cImFmdGVyQ29udGV4dFNldCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgIChiZWZvcmVDb250ZXh0U2V0KT1cImJlZm9yZUNvbnRleHRTZXQoJGV2ZW50KVwiPlxuXG4gICAgICAgIDxhdy1zZWN0aW9uIFt0aXRsZV09XCJzZWN0aW9uUHJvcCgndGl0bGUnLCBsYXlvdXQubmFtZSwgbnVsbClcIlxuICAgICAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dPVwic2VjdGlvblByb3AoJ2Rlc2NyaXB0aW9uJywgbGF5b3V0Lm5hbWUsIG51bGwpXCJcbiAgICAgICAgICAgICAgICAgICAgW29wZW5lZF09XCJzZWN0aW9uUHJvcCgnb3BlbmVkJywgbGF5b3V0Lm5hbWUsIHRydWUpXCJcbiAgICAgICAgICAgICAgICAgICAgW2FjdGlvbkljb25dPVwic2VjdGlvblByb3AoJ2FjdGlvbkljb24nLCBsYXlvdXQubmFtZSwgJ2ljb24tZWRpdCcpXCJcbiAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlXT1cInNlY3Rpb25Qcm9wKCdjYW5FZGl0JywgbGF5b3V0Lm5hbWUsIGZhbHNlKVwiXG4gICAgICAgICAgICAgICAgICAgIFtlZGl0TW9kZV09XCJzZWN0aW9uUHJvcCgnZWRpdE1vZGUnLCBsYXlvdXQubmFtZSwgJ2RlZmF1bHQnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlQ2xvc2VdPVwic2VjdGlvblByb3AoJ2Rpc2FibGVDbG9zZScsIGxheW91dC5uYW1lLCBmYWxzZSlcIlxuICAgICAgICAgICAgICAgICAgICAob25FZGl0KT1cIm9uQWN0aW9uKCdvbkVkaXQnLCBpLCBsYXlvdXQubmFtZSwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChvblNhdmVBY3Rpb24pPVwib25BY3Rpb24oJ29uU2F2ZUFjdGlvbicsIGksIGxheW91dC5uYW1lLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uQ2FuY2VsQWN0aW9uKT1cIm9uQWN0aW9uKCdvbkNhbmNlbEFjdGlvbicsIGksIGxheW91dC5uYW1lLCAkZXZlbnQpXCI+XG5cbiAgICAgICAgICAgIDxtLWluY2x1ZGUtY29tcG9uZW50PjwvbS1pbmNsdWRlLWNvbXBvbmVudD5cbiAgICAgICAgPC9hdy1zZWN0aW9uPlxuXG4gICAgPC9tLWNvbnRleHQ+XG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFTZWN0aW9uc0NvbXBvbmVudCBleHRlbmRzIE1ldGFMYXlvdXQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0XG57XG4gICAgLyoqXG4gICAgICogQ29sbGVjdCBsaXN0IG9mIHNlY3Rpb25zIHRoYXQgYXJlIHJlbmRlcmVkIHNvIHdlIGNhbiB1c2UgdGhlbSBsYXRlciBvbiB3aGVuIGJyb2FkY2FzdGluZ1xuICAgICAqIGFuIGV2ZW50IHRvIGFwcGxpY2F0aW9uLiBJbiBzb21lIGNhc2UganVzdCBsaWtlIHRoaXMgeW91IG5lZWQgdG8gaGF2ZSBhIHJlZmVyZW5jZVxuICAgICAqIHRvIHRoZSBjb21wb25lbnRcbiAgICAgKi9cbiAgICBAVmlld0NoaWxkcmVuKFNlY3Rpb25Db21wb25lbnQpXG4gICAgdmlld1NlY3Rpb25zOiBRdWVyeUxpc3Q8U2VjdGlvbkNvbXBvbmVudD47XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHNlY3Rpb24gcmVhZCBmcm9tIFF1ZXJ5TGlzdCBhZnRlciB2aWV3IGlzIGluaXRpYWxpemVkXG4gICAgICovXG4gICAgc2VjdGlvbnM6IFNlY3Rpb25Db21wb25lbnRbXTtcblxuXG4gICAgc2VjdGlvbk9wZXJhdGlvbnM6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG5cbiAgICBwcml2YXRlIG9uQ29tcGxldGVTdWJzY3JpcHRpb25zOiB7W25hbWU6IHN0cmluZ106IFNlY3Rpb25Db21wb25lbnR9ID0ge307XG5cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfbWV0YUNvbnRleHQ6IE1ldGFDb250ZXh0Q29tcG9uZW50LCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKF9tZXRhQ29udGV4dCwgZW52KTtcblxuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICB0aGlzLmFsbExheW91dHMuZm9yRWFjaCgodmFsdWU6IEl0ZW1Qcm9wZXJ0aWVzKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25PcGVyYXRpb25zW3ZhbHVlLm5hbWVdID0gJ3ZpZXcnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdEb0NoZWNrKCk7XG5cblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gWy4uLnRoaXMudmlld1NlY3Rpb25zLnRvQXJyYXkoKV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aW9uIGhhbmRsZXIgdG8gYnJvYWRjYXN0IGV2ZW50IG91dHNpZGUgc28gaXQgY2FuIGJlIGhhbmRsZWQgYnkgdGhlIGFwcGxpY2F0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkFjdGlvbihuYW1lOiBzdHJpbmcsIHNlY3Rpb25JbmRleDogbnVtYmVyLCBjbnhOYW1lOiBzdHJpbmcsIGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbnNbc2VjdGlvbkluZGV4XTtcbiAgICAgICAgaWYgKHRoaXMuZW52Lmhhc1ZhbHVlKCdwYXJlbnQtY254JykpIHtcbiAgICAgICAgICAgIGxldCBjbng6IE1ldGFDb250ZXh0Q29tcG9uZW50ID0gdGhpcy5lbnYuZ2V0VmFsdWUoJ3BhcmVudC1jbngnKTtcblxuICAgICAgICAgICAgY254Lm9uQWN0aW9uLmVtaXQobmV3IE1ldGFVSUFjdGlvbkV2ZW50KHNlY3Rpb24sIG5hbWUsIGNueE5hbWUsXG4gICAgICAgICAgICAgICAgZXZlbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lID09PSAnb25FZGl0JyAmJiBzZWN0aW9uLmVkaXRTdGF0ZSAmJiBzZWN0aW9uLmVkaXRNb2RlID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbk9wZXJhdGlvbnNbY254TmFtZV0gPSAnZWRpdCc7XG5cbiAgICAgICAgICAgIGlmIChpc0JsYW5rKHRoaXMub25Db21wbGV0ZVN1YnNjcmlwdGlvbnNbY254TmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbi5vbkVkaXRpbmdDb21wbGV0ZS5zdWJzY3JpYmUoKHZhbHVlOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbk9wZXJhdGlvbnNbY254TmFtZV0gPSAndmlldydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZVN1YnNjcmlwdGlvbnNbY254TmFtZV0gPSBzZWN0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0cmlldmVzIGEgcHJvcGVydHkgZnJvbSB0aGUgY3VycmVudCBjb250ZXh0XG4gICAgICpcbiAgICAgKi9cbiAgICBzZWN0aW9uUHJvcChwcm9wTmFtZTogc3RyaW5nLCBjbnhOYW1lOiBzdHJpbmcsIGRlZmF1bHRWYWw6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGxDb250ZXh0OiBDb250ZXh0ID0gdGhpcy5jb250ZXh0TWFwLmdldChjbnhOYW1lKTtcbiAgICAgICAgcmV0dXJuIChpc1ByZXNlbnQobENvbnRleHQpICYmIGlzUHJlc2VudChsQ29udGV4dC5wcm9wZXJ0eUZvcktleShwcm9wTmFtZSkpKSA/XG4gICAgICAgICAgICBsQ29udGV4dC5wcm9wZXJ0eUZvcktleShwcm9wTmFtZSkgOiBkZWZhdWx0VmFsO1xuICAgIH1cblxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLmFsbExheW91dHMuZm9yRWFjaCgodmFsdWU6IEl0ZW1Qcm9wZXJ0aWVzKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub25Db21wbGV0ZVN1YnNjcmlwdGlvbnNbdmFsdWUubmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlU3Vic2NyaXB0aW9uc1t2YWx1ZS5uYW1lXS5vbkVkaXRpbmdDb21wbGV0ZS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=