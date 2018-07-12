/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Environment } from '@aribaui/core';
import { DomHandler } from 'primeng/primeng';
import { DTColumn2Component } from '../dt-column.component';
/**
 *
 * Column implementation for the Multiselection where we show checkbox control
 *
 *
 */
export class DTMultiSelectColumnComponent extends DTColumn2Component {
    /**
     * @param {?} env
     * @param {?} domHandler
     */
    constructor(env, domHandler) {
        super(env, domHandler);
        this.env = env;
        this.domHandler = domHandler;
        // default width of the selection control
        this.width = '45px';
    }
}
DTMultiSelectColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-dt-multi-select-column',
                template: `<!--
    Manages multi selection and renders checkboxes both for header in case [showSelectAll] is
    enabled as well as each checkbox per row
-->
<ng-template #renderingTemplate let-isHeader let-isSubHeader="isSubHeader" let-column="column"
             let-dataToRender="data"
             let-level="nestingLevel"
             let-columnIndex="columnIndex"
             let-rowIndex="rowIndex">

    <ng-template *ngIf="isHeader" [ngTemplateOutlet]="colHeader"
                 [ngTemplateOutletContext]="{$implicit: isSubHeader, columnIndex:columnIndex,
                 level:level}">
    </ng-template>

    <ng-template *ngIf="!isHeader" [ngTemplateOutlet]="colBody"
                 [ngTemplateOutletContext]="{$implicit: column, level:level,
                    data:dataToRender,rowIndex:rowIndex}">
    </ng-template>
</ng-template>


<ng-template #colHeader let-isSubHeader let-columnIndex="columnIndex">
    <th [ngClass]="{'dt-is-default dt-u-unselectable-text dt-selection-column' :true,
                    'dt-cell-def': true,
                    'dt-sub-header': isSubHeader,
                    'dt-is-hidden': !dt.showSelectionColumn}" align="center">

        <ng-template [ngIf]="dt.showSelectAll">
            <aw-checkbox [type]="'action'" (action)="dt.toggleAllColumns($event)"
                         [value]="dt.isToggleAllColumnSelected()"
                         [disabled]="dt.isToggleAllColumnDisabled()">
            </aw-checkbox>
        </ng-template>

        <ng-template [ngIf]="!dt.showSelectAll">&nbsp;
        </ng-template>
    </th>

</ng-template>


<ng-template #colBody let-data="data" let-rowIndex="rowIndex" , let-level="level">

    <td #cell [class]="dynamicBodyClass(data)"
        [style.padding-left.px]="indentForControl(cell, level)"
        align="center"
        [ngClass]="{ 'dt-is-default dt-selection-column': true,
        'dt-cell-def': true,
        'dt-is-hidden': !dt.showSelectionColumn}">

        <aw-checkbox [type]="'action'" [value]="dt.isRowSelected(data)" >
        </aw-checkbox>

    </td>
</ng-template>
`,
                styles: [``],
                encapsulation: ViewEncapsulation.None,
                providers: [DomHandler]
            },] },
];
/** @nocollapse */
DTMultiSelectColumnComponent.ctorParameters = () => [
    { type: Environment },
    { type: DomHandler }
];
function DTMultiSelectColumnComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DTMultiSelectColumnComponent.prototype.env;
    /** @type {?} */
    DTMultiSelectColumnComponent.prototype.domHandler;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9kYXRhdGFibGUyL2NvbHVtbi9tdWx0aS1zZWxlY3QvZHQtbXVsdGktc2VsZWN0LWNvbHVtbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW9CQSxPQUFPLEVBQUMsU0FBUyxFQUFrQyxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7OztBQXlFMUQsTUFBTSxtQ0FBb0MsU0FBUSxrQkFBa0I7Ozs7O0lBRWhFLFlBQW1CLEdBQWdCLEVBQVMsVUFBc0I7UUFDOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQURSLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFZOztRQUk5RCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztLQUN2Qjs7O1lBdkVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0RiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDWixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDO2FBRTFCOzs7O1lBMUVPLFdBQVc7WUFDWCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSW5qZWN0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGF0YWJsZTJDb21wb25lbnR9IGZyb20gJy4uLy4uL2RhdGF0YWJsZTIuY29tcG9uZW50JztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuXG5cbi8qKlxuICpcbiAqIENvbHVtbiBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIE11bHRpc2VsZWN0aW9uIHdoZXJlIHdlIHNob3cgY2hlY2tib3ggY29udHJvbFxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctZHQtbXVsdGktc2VsZWN0LWNvbHVtbicsXG4gICAgdGVtcGxhdGU6IGA8IS0tXG4gICAgTWFuYWdlcyBtdWx0aSBzZWxlY3Rpb24gYW5kIHJlbmRlcnMgY2hlY2tib3hlcyBib3RoIGZvciBoZWFkZXIgaW4gY2FzZSBbc2hvd1NlbGVjdEFsbF0gaXNcbiAgICBlbmFibGVkIGFzIHdlbGwgYXMgZWFjaCBjaGVja2JveCBwZXIgcm93XG4tLT5cbjxuZy10ZW1wbGF0ZSAjcmVuZGVyaW5nVGVtcGxhdGUgbGV0LWlzSGVhZGVyIGxldC1pc1N1YkhlYWRlcj1cImlzU3ViSGVhZGVyXCIgbGV0LWNvbHVtbj1cImNvbHVtblwiXG4gICAgICAgICAgICAgbGV0LWRhdGFUb1JlbmRlcj1cImRhdGFcIlxuICAgICAgICAgICAgIGxldC1sZXZlbD1cIm5lc3RpbmdMZXZlbFwiXG4gICAgICAgICAgICAgbGV0LWNvbHVtbkluZGV4PVwiY29sdW1uSW5kZXhcIlxuICAgICAgICAgICAgIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCI+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCJpc0hlYWRlclwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbEhlYWRlclwiXG4gICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7JGltcGxpY2l0OiBpc1N1YkhlYWRlciwgY29sdW1uSW5kZXg6Y29sdW1uSW5kZXgsXG4gICAgICAgICAgICAgICAgIGxldmVsOmxldmVsfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgKm5nSWY9XCIhaXNIZWFkZXJcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2xCb2R5XCJcbiAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IGNvbHVtbiwgbGV2ZWw6bGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ZGF0YVRvUmVuZGVyLHJvd0luZGV4OnJvd0luZGV4fVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG48L25nLXRlbXBsYXRlPlxuXG5cbjxuZy10ZW1wbGF0ZSAjY29sSGVhZGVyIGxldC1pc1N1YkhlYWRlciBsZXQtY29sdW1uSW5kZXg9XCJjb2x1bW5JbmRleFwiPlxuICAgIDx0aCBbbmdDbGFzc109XCJ7J2R0LWlzLWRlZmF1bHQgZHQtdS11bnNlbGVjdGFibGUtdGV4dCBkdC1zZWxlY3Rpb24tY29sdW1uJyA6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ2R0LWNlbGwtZGVmJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ2R0LXN1Yi1oZWFkZXInOiBpc1N1YkhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgJ2R0LWlzLWhpZGRlbic6ICFkdC5zaG93U2VsZWN0aW9uQ29sdW1ufVwiIGFsaWduPVwiY2VudGVyXCI+XG5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImR0LnNob3dTZWxlY3RBbGxcIj5cbiAgICAgICAgICAgIDxhdy1jaGVja2JveCBbdHlwZV09XCInYWN0aW9uJ1wiIChhY3Rpb24pPVwiZHQudG9nZ2xlQWxsQ29sdW1ucygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZHQuaXNUb2dnbGVBbGxDb2x1bW5TZWxlY3RlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZHQuaXNUb2dnbGVBbGxDb2x1bW5EaXNhYmxlZCgpXCI+XG4gICAgICAgICAgICA8L2F3LWNoZWNrYm94PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZHQuc2hvd1NlbGVjdEFsbFwiPiZuYnNwO1xuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvdGg+XG5cbjwvbmctdGVtcGxhdGU+XG5cblxuPG5nLXRlbXBsYXRlICNjb2xCb2R5IGxldC1kYXRhPVwiZGF0YVwiIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgLCBsZXQtbGV2ZWw9XCJsZXZlbFwiPlxuXG4gICAgPHRkICNjZWxsIFtjbGFzc109XCJkeW5hbWljQm9keUNsYXNzKGRhdGEpXCJcbiAgICAgICAgW3N0eWxlLnBhZGRpbmctbGVmdC5weF09XCJpbmRlbnRGb3JDb250cm9sKGNlbGwsIGxldmVsKVwiXG4gICAgICAgIGFsaWduPVwiY2VudGVyXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnZHQtaXMtZGVmYXVsdCBkdC1zZWxlY3Rpb24tY29sdW1uJzogdHJ1ZSxcbiAgICAgICAgJ2R0LWNlbGwtZGVmJzogdHJ1ZSxcbiAgICAgICAgJ2R0LWlzLWhpZGRlbic6ICFkdC5zaG93U2VsZWN0aW9uQ29sdW1ufVwiPlxuXG4gICAgICAgIDxhdy1jaGVja2JveCBbdHlwZV09XCInYWN0aW9uJ1wiIFt2YWx1ZV09XCJkdC5pc1Jvd1NlbGVjdGVkKGRhdGEpXCIgPlxuICAgICAgICA8L2F3LWNoZWNrYm94PlxuXG4gICAgPC90ZD5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICAgIHN0eWxlczogW2BgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG5cbn0pXG5leHBvcnQgY2xhc3MgRFRNdWx0aVNlbGVjdENvbHVtbkNvbXBvbmVudCBleHRlbmRzIERUQ29sdW1uMkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudCwgcHVibGljIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIpIHtcbiAgICAgICAgc3VwZXIoZW52LCBkb21IYW5kbGVyKTtcblxuICAgICAgICAvLyBkZWZhdWx0IHdpZHRoIG9mIHRoZSBzZWxlY3Rpb24gY29udHJvbFxuICAgICAgICB0aGlzLndpZHRoID0gJzQ1cHgnO1xuICAgIH1cblxufVxuXG4iXX0=