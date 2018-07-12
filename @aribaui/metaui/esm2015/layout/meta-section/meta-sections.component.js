/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ section = this.sections[sectionIndex];
        if (this.env.hasValue('parent-cnx')) {
            let /** @type {?} */ cnx = this.env.getValue('parent-cnx');
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
        let /** @type {?} */ lContext = this.contextMap.get(cnxName);
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
                template: `<div class="meta-sections">

    <m-context *ngFor="let layout of allLayouts; let i = index" [layout]="layout.name"
               [operation]="sectionOperations[layout.name]"
               (afterContextSet)="afterContextSet($event)"
               (beforeContextSet)="beforeContextSet($event)">

        <aw-section [title]="sectionProp('title', layout.name, null)"
                    [description]="sectionProp('description', layout.name, null)"
                    [opened]="sectionProp('opened', layout.name, true)"
                    [actionIcon]="sectionProp('actionIcon', layout.name, 'icon-edit')"
                    [editable]="sectionProp('canEdit', layout.name, false)"
                    [editMode]="sectionProp('editMode', layout.name, 'default')"
                    [disableClose]="sectionProp('disableClose', layout.name, false)"
                    (onEdit)="onAction('onEdit', i, layout.name, $event)"
                    (onSaveAction)="onAction('onSaveAction', i, layout.name, $event)"
                    (onCancelAction)="onAction('onCancelAction', i, layout.name, $event)">

            <m-include-component></m-include-component>
        </aw-section>

    </m-context>
</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
MetaSectionsComponent.ctorParameters = () => [
    { type: MetaContextComponent },
    { type: Environment }
];
MetaSectionsComponent.propDecorators = {
    viewSections: [{ type: ViewChildren, args: [SectionComponent,] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1zZWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9tZXRhdWkvIiwic291cmNlcyI6WyJsYXlvdXQvbWV0YS1zZWN0aW9uL21ldGEtc2VjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFtQkEsT0FBTyxFQUFnQixTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFDSCxvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ3BCLE1BQU0sZ0RBQWdELENBQUM7QUFFeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0VyRCxNQUFNLDRCQUE2QixTQUFRLFVBQVU7Ozs7O0lBc0JqRCxZQUFzQixZQUFrQyxFQUFTLEdBQWdCO1FBRTdFLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFGUCxpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFhO2lDQU5uQyxFQUFFO3VDQUdzQixFQUFFO0tBT3ZFOzs7O0lBR0QsUUFBUTtRQUVKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtZQUU5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUMvQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELFNBQVM7UUFFTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7S0FHckI7Ozs7SUFFRCxlQUFlO1FBRVgsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEOzs7Ozs7Ozs7O0lBTUQsUUFBUSxDQUFDLElBQVksRUFBRSxZQUFvQixFQUFFLE9BQWUsRUFBRSxLQUFVO1FBRXBFLHFCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxxQkFBSSxHQUFHLEdBQXlCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWhFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQzFELEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDZjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUV6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FDM0MsQ0FBQztnQkFDRixJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO2FBQ25EO1NBRUo7S0FDSjs7Ozs7Ozs7OztJQVFELFdBQVcsQ0FBQyxRQUFnQixFQUFFLE9BQWUsRUFBRSxVQUFlO1FBRTFELHFCQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0tBQ3REOzs7O0lBR0QsV0FBVztRQUVQLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtZQUU5QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM1RTtTQUNKLENBQUMsQ0FBQztLQUNOOzs7WUFqSUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1QmI7Z0JBQ0csTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2Y7Ozs7WUFsRkcsb0JBQW9CO1lBSGhCLFdBQVc7OzsyQkE2RmQsWUFBWSxTQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge01ldGFMYXlvdXR9IGZyb20gJy4uL21ldGEtbGF5b3V0JztcbmltcG9ydCB7XG4gICAgTWV0YUNvbnRleHRDb21wb25lbnQsXG4gICAgTWV0YVVJQWN0aW9uRXZlbnRcbn0gZnJvbSAnLi4vLi4vY29yZS9tZXRhLWNvbnRleHQvbWV0YS1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uLy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge1NlY3Rpb25Db21wb25lbnR9IGZyb20gJ0BhcmliYXVpL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtJdGVtUHJvcGVydGllc30gZnJvbSAnLi4vLi4vY29yZS9pdGVtLXByb3BlcnRpZXMnO1xuXG4vKipcbiAqIE1ldGFTZWN0aW9uIHJlbmRlcnMgbGlzdCBvZiBzZWN0aW9ucyBkZWZpbmVkIGJ5IEB0cmFpdCBpbnNpZGUgV2lkZ2V0c1J1bGVzLiBJdCB1c2VzIGxheW91dHMgdG9cbiAqIHN0cnVjdHVyZSB0aGUgbGlzdC5cbiAqXG4gKiBgYGBcbiAqICBsYXlvdXQge1xuICogICAgICAgQHRyYWl0PVNlY3Rpb25zIHsgdmlzaWJsZTp0cnVlOyBjb21wb25lbnQ6TWV0YVNlY3Rpb25zQ29tcG9uZW50IH1cbiAqICB9XG4gKlxuICogYGBgXG4gKlxuICogYW5kIGNhbiBiZSB1c2VkIGFzIDpcbiAqXG4gKiBgYGBcbiAqICAgICBsYXlvdXQ9UmZ4RGV0YWlsTGF5b3V0I1NlY3Rpb25zIHtcbiAqXG4gKiAgICAgICAgIEBsYXlvdXQ9SGVhZGVyI0Zvcm0ge1xuICogICAgICAgICAgICAgdHJhaXQ6bGFiZWxzT25Ub3A7XG4gKiAgICAgICAgICAgICB6b25lUGF0aDpIZWFkZXI7XG4gKlxuICogICAgICAgICAgICAgYmluZGluZ3M6IHtcbiAqICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjokb2JqZWN0LmhlYWRlci5kZXNjcmlwdGlvbjtcbiAqICAgICAgICAgICAgIH1cbiAqICAgICAgICAgfVxuICogICAgICAgICBAbGF5b3V0PUxpbmVJdGVtcyB7XG4gKiAgICAgICAgICAgICBjb21wb25lbnQ6UmZ4TGluZUl0ZW1zQ29tcG9uZW50O1xuICogICAgICAgICAgICAgYmluZGluZ3M6IHtcbiAqICAgICAgICAgICAgICAgICByZnhFdmVudDokb2JqZWN0O1xuICogICAgICAgICAgICAgfVxuICogICAgICAgICB9XG4gKiAgICAgICAgIEBsYXlvdXQ9UGFydGljaXBhbnRzIHtcbiAqICAgICAgICAgICAgIGNvbXBvbmVudDpSZnhQYXJ0aWNpcGFudHNDb21wb25lbnQ7XG4gKiAgICAgICAgICAgICBiaW5kaW5nczoge1xuICogICAgICAgICAgICAgICAgIHJmeEV2ZW50OiRvYmplY3Q7XG4gKiAgICAgICAgICAgICB9XG4gKiAgICAgICAgIH1cbiAqICAgICB9XG4gKlxuICpcbiAqICAgICBjbGFzcz1SZnhFdmVudEhlYWRlciB7XG4gKiAgICAgICAgIHpOb25lID0+ICo7XG4gKiAgICAgICAgIEhlYWRlci56TGVmdCA9PiByZXF1ZXN0ZXIgPT4gcmVnaW9uID0+IG5lZWRCeTtcbiAqICAgICB9XG4gKiBgYGBcbiAqIEluIGFib3ZlIGV4YW1wbGUgd2UgaGF2ZSBmaXJzdCBzZWN0aW9uIHdpdGggRm9ybSB3aGVyZSBSZnhFdmVudEhlYWRlciBzZW5kcyBpdHMgZmllbGRzXG4gKiBhbmQgc2V2ZXJhbCBvdGhlciBzZWN0aW9ucyB3aXRoIGN1c3RvbSBjb21wb25lbnQuXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWV0YS1zZWN0aW9uc1wiPlxuXG4gICAgPG0tY29udGV4dCAqbmdGb3I9XCJsZXQgbGF5b3V0IG9mIGFsbExheW91dHM7IGxldCBpID0gaW5kZXhcIiBbbGF5b3V0XT1cImxheW91dC5uYW1lXCJcbiAgICAgICAgICAgICAgIFtvcGVyYXRpb25dPVwic2VjdGlvbk9wZXJhdGlvbnNbbGF5b3V0Lm5hbWVdXCJcbiAgICAgICAgICAgICAgIChhZnRlckNvbnRleHRTZXQpPVwiYWZ0ZXJDb250ZXh0U2V0KCRldmVudClcIlxuICAgICAgICAgICAgICAgKGJlZm9yZUNvbnRleHRTZXQpPVwiYmVmb3JlQ29udGV4dFNldCgkZXZlbnQpXCI+XG5cbiAgICAgICAgPGF3LXNlY3Rpb24gW3RpdGxlXT1cInNlY3Rpb25Qcm9wKCd0aXRsZScsIGxheW91dC5uYW1lLCBudWxsKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl09XCJzZWN0aW9uUHJvcCgnZGVzY3JpcHRpb24nLCBsYXlvdXQubmFtZSwgbnVsbClcIlxuICAgICAgICAgICAgICAgICAgICBbb3BlbmVkXT1cInNlY3Rpb25Qcm9wKCdvcGVuZWQnLCBsYXlvdXQubmFtZSwgdHJ1ZSlcIlxuICAgICAgICAgICAgICAgICAgICBbYWN0aW9uSWNvbl09XCJzZWN0aW9uUHJvcCgnYWN0aW9uSWNvbicsIGxheW91dC5uYW1lLCAnaWNvbi1lZGl0JylcIlxuICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVdPVwic2VjdGlvblByb3AoJ2NhbkVkaXQnLCBsYXlvdXQubmFtZSwgZmFsc2UpXCJcbiAgICAgICAgICAgICAgICAgICAgW2VkaXRNb2RlXT1cInNlY3Rpb25Qcm9wKCdlZGl0TW9kZScsIGxheW91dC5uYW1lLCAnZGVmYXVsdCcpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVDbG9zZV09XCJzZWN0aW9uUHJvcCgnZGlzYWJsZUNsb3NlJywgbGF5b3V0Lm5hbWUsIGZhbHNlKVwiXG4gICAgICAgICAgICAgICAgICAgIChvbkVkaXQpPVwib25BY3Rpb24oJ29uRWRpdCcsIGksIGxheW91dC5uYW1lLCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uU2F2ZUFjdGlvbik9XCJvbkFjdGlvbignb25TYXZlQWN0aW9uJywgaSwgbGF5b3V0Lm5hbWUsICRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAob25DYW5jZWxBY3Rpb24pPVwib25BY3Rpb24oJ29uQ2FuY2VsQWN0aW9uJywgaSwgbGF5b3V0Lm5hbWUsICRldmVudClcIj5cblxuICAgICAgICAgICAgPG0taW5jbHVkZS1jb21wb25lbnQ+PC9tLWluY2x1ZGUtY29tcG9uZW50PlxuICAgICAgICA8L2F3LXNlY3Rpb24+XG5cbiAgICA8L20tY29udGV4dD5cbjwvZGl2PlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWV0YVNlY3Rpb25zQ29tcG9uZW50IGV4dGVuZHMgTWV0YUxheW91dCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXRcbntcbiAgICAvKipcbiAgICAgKiBDb2xsZWN0IGxpc3Qgb2Ygc2VjdGlvbnMgdGhhdCBhcmUgcmVuZGVyZWQgc28gd2UgY2FuIHVzZSB0aGVtIGxhdGVyIG9uIHdoZW4gYnJvYWRjYXN0aW5nXG4gICAgICogYW4gZXZlbnQgdG8gYXBwbGljYXRpb24uIEluIHNvbWUgY2FzZSBqdXN0IGxpa2UgdGhpcyB5b3UgbmVlZCB0byBoYXZlIGEgcmVmZXJlbmNlXG4gICAgICogdG8gdGhlIGNvbXBvbmVudFxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGRyZW4oU2VjdGlvbkNvbXBvbmVudClcbiAgICB2aWV3U2VjdGlvbnM6IFF1ZXJ5TGlzdDxTZWN0aW9uQ29tcG9uZW50PjtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2Ygc2VjdGlvbiByZWFkIGZyb20gUXVlcnlMaXN0IGFmdGVyIHZpZXcgaXMgaW5pdGlhbGl6ZWRcbiAgICAgKi9cbiAgICBzZWN0aW9uczogU2VjdGlvbkNvbXBvbmVudFtdO1xuXG5cbiAgICBzZWN0aW9uT3BlcmF0aW9uczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5cblxuICAgIHByaXZhdGUgb25Db21wbGV0ZVN1YnNjcmlwdGlvbnM6IHtbbmFtZTogc3RyaW5nXTogU2VjdGlvbkNvbXBvbmVudH0gPSB7fTtcblxuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9tZXRhQ29udGV4dDogTWV0YUNvbnRleHRDb21wb25lbnQsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoX21ldGFDb250ZXh0LCBlbnYpO1xuXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIHRoaXMuYWxsTGF5b3V0cy5mb3JFYWNoKCh2YWx1ZTogSXRlbVByb3BlcnRpZXMpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbk9wZXJhdGlvbnNbdmFsdWUubmFtZV0gPSAndmlldyc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ0RvQ2hlY2soKTtcblxuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMgPSBbLi4udGhpcy52aWV3U2VjdGlvbnMudG9BcnJheSgpXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3Rpb24gaGFuZGxlciB0byBicm9hZGNhc3QgZXZlbnQgb3V0c2lkZSBzbyBpdCBjYW4gYmUgaGFuZGxlZCBieSB0aGUgYXBwbGljYXRpb25cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQWN0aW9uKG5hbWU6IHN0cmluZywgc2VjdGlvbkluZGV4OiBudW1iZXIsIGNueE5hbWU6IHN0cmluZywgZXZlbnQ6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCBzZWN0aW9uID0gdGhpcy5zZWN0aW9uc1tzZWN0aW9uSW5kZXhdO1xuICAgICAgICBpZiAodGhpcy5lbnYuaGFzVmFsdWUoJ3BhcmVudC1jbngnKSkge1xuICAgICAgICAgICAgbGV0IGNueDogTWV0YUNvbnRleHRDb21wb25lbnQgPSB0aGlzLmVudi5nZXRWYWx1ZSgncGFyZW50LWNueCcpO1xuXG4gICAgICAgICAgICBjbngub25BY3Rpb24uZW1pdChuZXcgTWV0YVVJQWN0aW9uRXZlbnQoc2VjdGlvbiwgbmFtZSwgY254TmFtZSxcbiAgICAgICAgICAgICAgICBldmVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWUgPT09ICdvbkVkaXQnICYmIHNlY3Rpb24uZWRpdFN0YXRlICYmIHNlY3Rpb24uZWRpdE1vZGUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uT3BlcmF0aW9uc1tjbnhOYW1lXSA9ICdlZGl0JztcblxuICAgICAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5vbkNvbXBsZXRlU3Vic2NyaXB0aW9uc1tjbnhOYW1lXSkpIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uLm9uRWRpdGluZ0NvbXBsZXRlLnN1YnNjcmliZSgodmFsdWU6IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWN0aW9uT3BlcmF0aW9uc1tjbnhOYW1lXSA9ICd2aWV3J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlU3Vic2NyaXB0aW9uc1tjbnhOYW1lXSA9IHNlY3Rpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXRyaWV2ZXMgYSBwcm9wZXJ0eSBmcm9tIHRoZSBjdXJyZW50IGNvbnRleHRcbiAgICAgKlxuICAgICAqL1xuICAgIHNlY3Rpb25Qcm9wKHByb3BOYW1lOiBzdHJpbmcsIGNueE5hbWU6IHN0cmluZywgZGVmYXVsdFZhbDogYW55KTogYW55XG4gICAge1xuICAgICAgICBsZXQgbENvbnRleHQ6IENvbnRleHQgPSB0aGlzLmNvbnRleHRNYXAuZ2V0KGNueE5hbWUpO1xuICAgICAgICByZXR1cm4gKGlzUHJlc2VudChsQ29udGV4dCkgJiYgaXNQcmVzZW50KGxDb250ZXh0LnByb3BlcnR5Rm9yS2V5KHByb3BOYW1lKSkpID9cbiAgICAgICAgICAgIGxDb250ZXh0LnByb3BlcnR5Rm9yS2V5KHByb3BOYW1lKSA6IGRlZmF1bHRWYWw7XG4gICAgfVxuXG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuYWxsTGF5b3V0cy5mb3JFYWNoKCh2YWx1ZTogSXRlbVByb3BlcnRpZXMpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5vbkNvbXBsZXRlU3Vic2NyaXB0aW9uc1t2YWx1ZS5uYW1lXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGVTdWJzY3JpcHRpb25zW3ZhbHVlLm5hbWVdLm9uRWRpdGluZ0NvbXBsZXRlLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==