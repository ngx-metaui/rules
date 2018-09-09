/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class MetaSectionsComponent extends MetaLayout {
    /**
     * @param {?} _metaContext
     * @param {?} env
     */
    constructor(_metaContext, env) {
        super(_metaContext, env);
        this._metaContext = _metaContext;
        this.env = env;
        this.sectionOperations = {};
        this.onCompleteSubscriptions = {};
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.allLayouts.forEach((value) => {
            this.sectionOperations[value.name] = 'view';
        });
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        super.ngDoCheck();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.sections = [...this.viewSections.toArray()];
    }
    /**
     * Action handler to broadcast event outside so it can be handled by the application
     *
     * @param {?} name
     * @param {?} sectionIndex
     * @param {?} cnxName
     * @param {?} event
     * @return {?}
     */
    onAction(name, sectionIndex, cnxName, event) {
        /** @type {?} */
        let section = this.sections[sectionIndex];
        if (this.env.hasValue('parent-cnx')) {
            /** @type {?} */
            let cnx = this.env.getValue('parent-cnx');
            cnx.onAction.emit(new MetaUIActionEvent(section, name, cnxName, event));
        }
        if (name === 'onEdit' && section.editState && section.editMode === 'default') {
            this.sectionOperations[cnxName] = 'edit';
            if (isBlank(this.onCompleteSubscriptions[cnxName])) {
                section.onEditingComplete.subscribe((value) => this.sectionOperations[cnxName] = 'view');
                this.onCompleteSubscriptions[cnxName] = section;
            }
        }
    }
    /**
     *
     * Retrieves a property from the current context
     *
     * @param {?} propName
     * @param {?} cnxName
     * @param {?} defaultVal
     * @return {?}
     */
    sectionProp(propName, cnxName, defaultVal) {
        /** @type {?} */
        let lContext = this.contextMap.get(cnxName);
        return (isPresent(lContext) && isPresent(lContext.propertyForKey(propName))) ?
            lContext.propertyForKey(propName) : defaultVal;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.allLayouts.forEach((value) => {
            if (isPresent(this.onCompleteSubscriptions[value.name])) {
                this.onCompleteSubscriptions[value.name].onEditingComplete.unsubscribe();
            }
        });
    }
}
MetaSectionsComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"meta-sections\">\n\n    <m-context *ngFor=\"let layout of allLayouts; let i = index\" [layout]=\"layout.name\"\n               [operation]=\"sectionOperations[layout.name]\"\n               (afterContextSet)=\"afterContextSet($event)\"\n               (beforeContextSet)=\"beforeContextSet($event)\">\n\n        <aw-section [title]=\"sectionProp('title', layout.name, null)\"\n                    [description]=\"sectionProp('description', layout.name, null)\"\n                    [opened]=\"sectionProp('opened', layout.name, true)\"\n                    [actionIcon]=\"sectionProp('actionIcon', layout.name, 'icon-edit')\"\n                    [editable]=\"sectionProp('canEdit', layout.name, false)\"\n                    [editMode]=\"sectionProp('editMode', layout.name, 'default')\"\n                    [disableClose]=\"sectionProp('disableClose', layout.name, false)\"\n                    (onEdit)=\"onAction('onEdit', i, layout.name, $event)\"\n                    (onSaveAction)=\"onAction('onSaveAction', i, layout.name, $event)\"\n                    (onCancelAction)=\"onAction('onCancelAction', i, layout.name, $event)\">\n\n            <m-include-component></m-include-component>\n        </aw-section>\n\n    </m-context>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MetaSectionsComponent.ctorParameters = () => [
    { type: MetaContextComponent },
    { type: Environment }
];
MetaSectionsComponent.propDecorators = {
    viewSections: [{ type: ViewChildren, args: [SectionComponent,] }]
};
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1zZWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1zZWN0aW9uL21ldGEtc2VjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFtQkEsT0FBTyxFQUFnQixTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFDSCxvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ3BCLE1BQU0sZ0RBQWdELENBQUM7QUFFeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0RyRCxNQUFNLDRCQUE2QixTQUFRLFVBQVU7Ozs7O0lBc0JqRCxZQUFzQixZQUFrQyxFQUFTLEdBQWdCO1FBRTdFLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFGUCxpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFhO2lDQU5uQyxFQUFFO3VDQUdzQixFQUFFO0tBT3ZFOzs7O0lBR0QsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtZQUU5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUMvQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELFNBQVM7UUFFTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7S0FHckI7Ozs7SUFFRCxlQUFlO1FBRVgsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEOzs7Ozs7Ozs7O0lBTUQsUUFBUSxDQUFDLElBQVksRUFBRSxZQUFvQixFQUFFLE9BQWUsRUFBRSxLQUFVOztRQUVwRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDbEMsSUFBSSxHQUFHLEdBQXlCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWhFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQzFELEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDZjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUV6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FDM0MsQ0FBQztnQkFDRixJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO2FBQ25EO1NBRUo7S0FDSjs7Ozs7Ozs7OztJQVFELFdBQVcsQ0FBQyxRQUFnQixFQUFFLE9BQWUsRUFBRSxVQUFlOztRQUUxRCxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0tBQ3REOzs7O0lBR0QsV0FBVztRQUVQLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtZQUU5QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM1RTtTQUNKLENBQUMsQ0FBQztLQUNOOzs7WUExR0osU0FBUyxTQUFDO2dCQUNQLHl2Q0FBMkM7O2FBRTlDOzs7O1lBM0RHLG9CQUFvQjtZQUhoQixXQUFXOzs7MkJBc0VkLFlBQVksU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtNZXRhTGF5b3V0fSBmcm9tICcuLi9tZXRhLWxheW91dCc7XG5pbXBvcnQge1xuICAgIE1ldGFDb250ZXh0Q29tcG9uZW50LFxuICAgIE1ldGFVSUFjdGlvbkV2ZW50XG59IGZyb20gJy4uLy4uL2NvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuLi8uLi9jb3JlL2NvbnRleHQnO1xuaW1wb3J0IHtTZWN0aW9uQ29tcG9uZW50fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7SXRlbVByb3BlcnRpZXN9IGZyb20gJy4uLy4uL2NvcmUvaXRlbS1wcm9wZXJ0aWVzJztcblxuLyoqXG4gKiBNZXRhU2VjdGlvbiByZW5kZXJzIGxpc3Qgb2Ygc2VjdGlvbnMgZGVmaW5lZCBieSBAdHJhaXQgaW5zaWRlIFdpZGdldHNSdWxlcy4gSXQgdXNlcyBsYXlvdXRzIHRvXG4gKiBzdHJ1Y3R1cmUgdGhlIGxpc3QuXG4gKlxuICogYGBgXG4gKiAgbGF5b3V0IHtcbiAqICAgICAgIEB0cmFpdD1TZWN0aW9ucyB7IHZpc2libGU6dHJ1ZTsgY29tcG9uZW50Ok1ldGFTZWN0aW9uc0NvbXBvbmVudCB9XG4gKiAgfVxuICpcbiAqIGBgYFxuICpcbiAqIGFuZCBjYW4gYmUgdXNlZCBhcyA6XG4gKlxuICogYGBgXG4gKiAgICAgbGF5b3V0PVJmeERldGFpbExheW91dCNTZWN0aW9ucyB7XG4gKlxuICogICAgICAgICBAbGF5b3V0PUhlYWRlciNGb3JtIHtcbiAqICAgICAgICAgICAgIHRyYWl0OmxhYmVsc09uVG9wO1xuICogICAgICAgICAgICAgem9uZVBhdGg6SGVhZGVyO1xuICpcbiAqICAgICAgICAgICAgIGJpbmRpbmdzOiB7XG4gKiAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246JG9iamVjdC5oZWFkZXIuZGVzY3JpcHRpb247XG4gKiAgICAgICAgICAgICB9XG4gKiAgICAgICAgIH1cbiAqICAgICAgICAgQGxheW91dD1MaW5lSXRlbXMge1xuICogICAgICAgICAgICAgY29tcG9uZW50OlJmeExpbmVJdGVtc0NvbXBvbmVudDtcbiAqICAgICAgICAgICAgIGJpbmRpbmdzOiB7XG4gKiAgICAgICAgICAgICAgICAgcmZ4RXZlbnQ6JG9iamVjdDtcbiAqICAgICAgICAgICAgIH1cbiAqICAgICAgICAgfVxuICogICAgICAgICBAbGF5b3V0PVBhcnRpY2lwYW50cyB7XG4gKiAgICAgICAgICAgICBjb21wb25lbnQ6UmZ4UGFydGljaXBhbnRzQ29tcG9uZW50O1xuICogICAgICAgICAgICAgYmluZGluZ3M6IHtcbiAqICAgICAgICAgICAgICAgICByZnhFdmVudDokb2JqZWN0O1xuICogICAgICAgICAgICAgfVxuICogICAgICAgICB9XG4gKiAgICAgfVxuICpcbiAqXG4gKiAgICAgY2xhc3M9UmZ4RXZlbnRIZWFkZXIge1xuICogICAgICAgICB6Tm9uZSA9PiAqO1xuICogICAgICAgICBIZWFkZXIuekxlZnQgPT4gcmVxdWVzdGVyID0+IHJlZ2lvbiA9PiBuZWVkQnk7XG4gKiAgICAgfVxuICogYGBgXG4gKiBJbiBhYm92ZSBleGFtcGxlIHdlIGhhdmUgZmlyc3Qgc2VjdGlvbiB3aXRoIEZvcm0gd2hlcmUgUmZ4RXZlbnRIZWFkZXIgc2VuZHMgaXRzIGZpZWxkc1xuICogYW5kIHNldmVyYWwgb3RoZXIgc2VjdGlvbnMgd2l0aCBjdXN0b20gY29tcG9uZW50LlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnbWV0YS1zZWN0aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ21ldGEtc2VjdGlvbnMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNZXRhU2VjdGlvbnNDb21wb25lbnQgZXh0ZW5kcyBNZXRhTGF5b3V0IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdFxue1xuICAgIC8qKlxuICAgICAqIENvbGxlY3QgbGlzdCBvZiBzZWN0aW9ucyB0aGF0IGFyZSByZW5kZXJlZCBzbyB3ZSBjYW4gdXNlIHRoZW0gbGF0ZXIgb24gd2hlbiBicm9hZGNhc3RpbmdcbiAgICAgKiBhbiBldmVudCB0byBhcHBsaWNhdGlvbi4gSW4gc29tZSBjYXNlIGp1c3QgbGlrZSB0aGlzIHlvdSBuZWVkIHRvIGhhdmUgYSByZWZlcmVuY2VcbiAgICAgKiB0byB0aGUgY29tcG9uZW50XG4gICAgICovXG4gICAgQFZpZXdDaGlsZHJlbihTZWN0aW9uQ29tcG9uZW50KVxuICAgIHZpZXdTZWN0aW9uczogUXVlcnlMaXN0PFNlY3Rpb25Db21wb25lbnQ+O1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBzZWN0aW9uIHJlYWQgZnJvbSBRdWVyeUxpc3QgYWZ0ZXIgdmlldyBpcyBpbml0aWFsaXplZFxuICAgICAqL1xuICAgIHNlY3Rpb25zOiBTZWN0aW9uQ29tcG9uZW50W107XG5cblxuICAgIHNlY3Rpb25PcGVyYXRpb25zOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlU3Vic2NyaXB0aW9uczoge1tuYW1lOiBzdHJpbmddOiBTZWN0aW9uQ29tcG9uZW50fSA9IHt9O1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX21ldGFDb250ZXh0OiBNZXRhQ29udGV4dENvbXBvbmVudCwgcHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihfbWV0YUNvbnRleHQsIGVudik7XG5cbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgdGhpcy5hbGxMYXlvdXRzLmZvckVhY2goKHZhbHVlOiBJdGVtUHJvcGVydGllcykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uT3BlcmF0aW9uc1t2YWx1ZS5uYW1lXSA9ICd2aWV3JztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nRG9DaGVjaygpO1xuXG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zZWN0aW9ucyA9IFsuLi50aGlzLnZpZXdTZWN0aW9ucy50b0FycmF5KCldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGlvbiBoYW5kbGVyIHRvIGJyb2FkY2FzdCBldmVudCBvdXRzaWRlIHNvIGl0IGNhbiBiZSBoYW5kbGVkIGJ5IHRoZSBhcHBsaWNhdGlvblxuICAgICAqXG4gICAgICovXG4gICAgb25BY3Rpb24obmFtZTogc3RyaW5nLCBzZWN0aW9uSW5kZXg6IG51bWJlciwgY254TmFtZTogc3RyaW5nLCBldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgbGV0IHNlY3Rpb24gPSB0aGlzLnNlY3Rpb25zW3NlY3Rpb25JbmRleF07XG4gICAgICAgIGlmICh0aGlzLmVudi5oYXNWYWx1ZSgncGFyZW50LWNueCcpKSB7XG4gICAgICAgICAgICBsZXQgY254OiBNZXRhQ29udGV4dENvbXBvbmVudCA9IHRoaXMuZW52LmdldFZhbHVlKCdwYXJlbnQtY254Jyk7XG5cbiAgICAgICAgICAgIGNueC5vbkFjdGlvbi5lbWl0KG5ldyBNZXRhVUlBY3Rpb25FdmVudChzZWN0aW9uLCBuYW1lLCBjbnhOYW1lLFxuICAgICAgICAgICAgICAgIGV2ZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZSA9PT0gJ29uRWRpdCcgJiYgc2VjdGlvbi5lZGl0U3RhdGUgJiYgc2VjdGlvbi5lZGl0TW9kZSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgICB0aGlzLnNlY3Rpb25PcGVyYXRpb25zW2NueE5hbWVdID0gJ2VkaXQnO1xuXG4gICAgICAgICAgICBpZiAoaXNCbGFuayh0aGlzLm9uQ29tcGxldGVTdWJzY3JpcHRpb25zW2NueE5hbWVdKSkge1xuICAgICAgICAgICAgICAgIHNlY3Rpb24ub25FZGl0aW5nQ29tcGxldGUuc3Vic2NyaWJlKCh2YWx1ZTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlY3Rpb25PcGVyYXRpb25zW2NueE5hbWVdID0gJ3ZpZXcnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGVTdWJzY3JpcHRpb25zW2NueE5hbWVdID0gc2VjdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHJpZXZlcyBhIHByb3BlcnR5IGZyb20gdGhlIGN1cnJlbnQgY29udGV4dFxuICAgICAqXG4gICAgICovXG4gICAgc2VjdGlvblByb3AocHJvcE5hbWU6IHN0cmluZywgY254TmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsOiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBsQ29udGV4dDogQ29udGV4dCA9IHRoaXMuY29udGV4dE1hcC5nZXQoY254TmFtZSk7XG4gICAgICAgIHJldHVybiAoaXNQcmVzZW50KGxDb250ZXh0KSAmJiBpc1ByZXNlbnQobENvbnRleHQucHJvcGVydHlGb3JLZXkocHJvcE5hbWUpKSkgP1xuICAgICAgICAgICAgbENvbnRleHQucHJvcGVydHlGb3JLZXkocHJvcE5hbWUpIDogZGVmYXVsdFZhbDtcbiAgICB9XG5cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5hbGxMYXlvdXRzLmZvckVhY2goKHZhbHVlOiBJdGVtUHJvcGVydGllcykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm9uQ29tcGxldGVTdWJzY3JpcHRpb25zW3ZhbHVlLm5hbWVdKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZVN1YnNjcmlwdGlvbnNbdmFsdWUubmFtZV0ub25FZGl0aW5nQ29tcGxldGUudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19