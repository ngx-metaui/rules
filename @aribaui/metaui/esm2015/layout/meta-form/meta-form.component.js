/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { Environment } from '@aribaui/core';
/**
 * This is just a wrapper component around meta-form-table as we need every single context push to
 * happen before the child content start to render.
 *
 * In this case I would like to wrap wrap my content with m-context in the way:
 *
 *  <m-context scopeKey="class">
 *        <!-- lets process one zone now and four we can deal later-->
 *        <ng-template [ngIf]="isFiveZoneLayout">
 *              <aw-form-table [isEditable]="isEditable" [labelsOnTop]="labelsOnTop"
 * (onSubmit)="onSaveAction($event)">
 *                  <ng-template ngFor let-curentField [ngForOf]="zLeft()">
 *                      <m-context [field]="curentField">
 *                           <m-form-row [field]="curentField"></m-form-row>
 *                      </m-context>
 *                  </ng-template>
 *          </aw-form-table>
 *        </ng-template>
 *  </m-context>
 *
 *
 *
 */
export class MetaFormComponent {
    /**
     * @param {?} environment
     */
    constructor(environment) {
        this.environment = environment;
    }
}
MetaFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'm-form',
                template: `<m-context #cnx scopeKey="class">
    <!-- Dont try to render if the object is not set yet -->
    <m-form-table *ngIf="cnx.hasObject"></m-form-table>
</m-context>
`,
            },] },
];
/** @nocollapse */
MetaFormComponent.ctorParameters = () => [
    { type: Environment }
];
function MetaFormComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MetaFormComponent.prototype.environment;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWZvcm0vbWV0YS1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUMxQyxNQUFNOzs7O0lBSUYsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7S0FHM0M7OztZQWhCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRTs7OztDQUliO2FBRUE7Ozs7WUFsQ08sV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBUaGlzIGlzIGp1c3QgYSB3cmFwcGVyIGNvbXBvbmVudCBhcm91bmQgbWV0YS1mb3JtLXRhYmxlIGFzIHdlIG5lZWQgZXZlcnkgc2luZ2xlIGNvbnRleHQgcHVzaCB0b1xuICogaGFwcGVuIGJlZm9yZSB0aGUgY2hpbGQgY29udGVudCBzdGFydCB0byByZW5kZXIuXG4gKlxuICogSW4gdGhpcyBjYXNlIEkgd291bGQgbGlrZSB0byB3cmFwIHdyYXAgbXkgY29udGVudCB3aXRoIG0tY29udGV4dCBpbiB0aGUgd2F5OlxuICpcbiAqICA8bS1jb250ZXh0IHNjb3BlS2V5PVwiY2xhc3NcIj5cbiAqICAgICAgICA8IS0tIGxldHMgcHJvY2VzcyBvbmUgem9uZSBub3cgYW5kIGZvdXIgd2UgY2FuIGRlYWwgbGF0ZXItLT5cbiAqICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNGaXZlWm9uZUxheW91dFwiPlxuICogICAgICAgICAgICAgIDxhdy1mb3JtLXRhYmxlIFtpc0VkaXRhYmxlXT1cImlzRWRpdGFibGVcIiBbbGFiZWxzT25Ub3BdPVwibGFiZWxzT25Ub3BcIlxuICogKG9uU3VibWl0KT1cIm9uU2F2ZUFjdGlvbigkZXZlbnQpXCI+XG4gKiAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY3VyZW50RmllbGQgW25nRm9yT2ZdPVwiekxlZnQoKVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgPG0tY29udGV4dCBbZmllbGRdPVwiY3VyZW50RmllbGRcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPG0tZm9ybS1yb3cgW2ZpZWxkXT1cImN1cmVudEZpZWxkXCI+PC9tLWZvcm0tcm93PlxuICogICAgICAgICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gKiAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgICAgICA8L2F3LWZvcm0tdGFibGU+XG4gKiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqICA8L20tY29udGV4dD5cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWZvcm0nLFxuICAgIHRlbXBsYXRlOiBgPG0tY29udGV4dCAjY254IHNjb3BlS2V5PVwiY2xhc3NcIj5cbiAgICA8IS0tIERvbnQgdHJ5IHRvIHJlbmRlciBpZiB0aGUgb2JqZWN0IGlzIG5vdCBzZXQgeWV0IC0tPlxuICAgIDxtLWZvcm0tdGFibGUgKm5nSWY9XCJjbnguaGFzT2JqZWN0XCI+PC9tLWZvcm0tdGFibGU+XG48L20tY29udGV4dD5cbmAsXG5cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUZvcm1Db21wb25lbnRcbntcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbnZpcm9ubWVudDogRW52aXJvbm1lbnQpXG4gICAge1xuXG4gICAgfVxuXG59XG4iXX0=