/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
var MetaFormComponent = /** @class */ (function () {
    function MetaFormComponent(environment) {
        this.environment = environment;
    }
    MetaFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'm-form',
                    template: "<m-context #cnx scopeKey=\"class\">\n    <!-- Dont try to render if the object is not set yet -->\n    <m-form-table *ngIf=\"cnx.hasObject\"></m-form-table>\n</m-context>\n"
                }] }
    ];
    /** @nocollapse */
    MetaFormComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
    return MetaFormComponent;
}());
export { MetaFormComponent };
if (false) {
    /** @type {?} */
    MetaFormComponent.prototype.environment;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImxheW91dC9tZXRhLWZvcm0vbWV0YS1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1DdEMsMkJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0tBRzNDOztnQkFaSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLHdMQUF1QztpQkFFMUM7Ozs7Z0JBOUJPLFdBQVc7OzRCQXBCbkI7O1NBbURhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBUaGlzIGlzIGp1c3QgYSB3cmFwcGVyIGNvbXBvbmVudCBhcm91bmQgbWV0YS1mb3JtLXRhYmxlIGFzIHdlIG5lZWQgZXZlcnkgc2luZ2xlIGNvbnRleHQgcHVzaCB0b1xuICogaGFwcGVuIGJlZm9yZSB0aGUgY2hpbGQgY29udGVudCBzdGFydCB0byByZW5kZXIuXG4gKlxuICogSW4gdGhpcyBjYXNlIEkgd291bGQgbGlrZSB0byB3cmFwIHdyYXAgbXkgY29udGVudCB3aXRoIG0tY29udGV4dCBpbiB0aGUgd2F5OlxuICpcbiAqICA8bS1jb250ZXh0IHNjb3BlS2V5PVwiY2xhc3NcIj5cbiAqICAgICAgICA8IS0tIGxldHMgcHJvY2VzcyBvbmUgem9uZSBub3cgYW5kIGZvdXIgd2UgY2FuIGRlYWwgbGF0ZXItLT5cbiAqICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNGaXZlWm9uZUxheW91dFwiPlxuICogICAgICAgICAgICAgIDxhdy1mb3JtLXRhYmxlIFtpc0VkaXRhYmxlXT1cImlzRWRpdGFibGVcIiBbbGFiZWxzT25Ub3BdPVwibGFiZWxzT25Ub3BcIlxuICogKG9uU3VibWl0KT1cIm9uU2F2ZUFjdGlvbigkZXZlbnQpXCI+XG4gKiAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY3VyZW50RmllbGQgW25nRm9yT2ZdPVwiekxlZnQoKVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgPG0tY29udGV4dCBbZmllbGRdPVwiY3VyZW50RmllbGRcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgPG0tZm9ybS1yb3cgW2ZpZWxkXT1cImN1cmVudEZpZWxkXCI+PC9tLWZvcm0tcm93PlxuICogICAgICAgICAgICAgICAgICAgICAgPC9tLWNvbnRleHQ+XG4gKiAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgICAgICA8L2F3LWZvcm0tdGFibGU+XG4gKiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAqICA8L20tY29udGV4dD5cbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWZvcm0nLFxuICAgIHRlbXBsYXRlVXJsOiAnbWV0YS1mb3JtLmNvbXBvbmVudC5odG1sJyxcblxufSlcbmV4cG9ydCBjbGFzcyBNZXRhRm9ybUNvbXBvbmVudFxue1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVudmlyb25tZW50OiBFbnZpcm9ubWVudClcbiAgICB7XG5cbiAgICB9XG5cbn1cbiJdfQ==