/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooleanWrapper, isPresent, RoutingService } from '@aribaui/core';
import { UIMeta } from '../../core/uimeta';
/**
 * MetaContentPage  component is used from MetaRules and universal component rendering different
 * operation modes.
 *
 *
 */
export class MetaContentPageComponent {
    /**
     * @param {?} route
     * @param {?} routingService
     */
    constructor(route, routingService) {
        this.route = route;
        this.routingService = routingService;
        this.newContext = true;
        this.isInspectAction = false;
        this.okLabel = 'Back';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.layout = this.route.snapshot.params['layout'];
        this.operation = this.route.snapshot.params['operation'];
        let /** @type {?} */ url = '/' + this.route.snapshot.url[0].toString();
        if (this.routingService.stateCacheHistory.has(url)) {
            this.object = this.routingService.stateCacheHistory.get(url);
            this.objectName = UIMeta.defaultLabelForIdentifier(this.object.constructor.name);
        }
        let /** @type {?} */ withBackAction = this.route.snapshot.params['b'];
        if (isPresent(withBackAction) && BooleanWrapper.isTrue(withBackAction)) {
            this.isInspectAction = true;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onBack(event) {
        this.routingService.goBack();
    }
}
MetaContentPageComponent.decorators = [
    { type: Component, args: [{
                selector: 'm-content-page',
                template: `<!-- TODO: impplement dynamic title based on the operation and object as well as updates buttons-->

<m-context [pushNewContext]="newContext" [object]="object" [operation]="operation"
           [layout]="layout">

    <aw-basic-navigator (onOKAction)="onBack($event)" [okActionLabel]="okLabel"
                        [showCancelButton]="!isInspectAction">


        <div class="page-container ">
            <br/>
            <h3>{{objectName}} details:</h3>

            <m-include-component></m-include-component>
        </div>
    </aw-basic-navigator>

</m-context>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
MetaContentPageComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: RoutingService }
];
function MetaContentPageComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MetaContentPageComponent.prototype.object;
    /** @type {?} */
    MetaContentPageComponent.prototype.operation;
    /** @type {?} */
    MetaContentPageComponent.prototype.layout;
    /** @type {?} */
    MetaContentPageComponent.prototype.newContext;
    /** @type {?} */
    MetaContentPageComponent.prototype.objectName;
    /** @type {?} */
    MetaContentPageComponent.prototype.isInspectAction;
    /** @type {?} */
    MetaContentPageComponent.prototype.okLabel;
    /** @type {?} */
    MetaContentPageComponent.prototype.route;
    /** @type {?} */
    MetaContentPageComponent.prototype.routingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb250ZW50LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtY29udGVudC1wYWdlL21ldGEtY29udGVudC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFnQ3pDLE1BQU07Ozs7O0lBWUYsWUFBb0IsS0FBcUIsRUFBVSxjQUE4QjtRQUE3RCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjswQkFOM0QsSUFBSTsrQkFFQyxLQUFLO3VCQUV0QixNQUFNO0tBSWY7Ozs7SUFFRCxRQUFRO1FBRUosSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekQscUJBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEY7UUFDRCxxQkFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjtLQUVKOzs7OztJQUdELE1BQU0sQ0FBQyxLQUFVO1FBRWIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNoQzs7O1lBNURKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtCYjtnQkFDRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDZjs7OztZQWpDTyxjQUFjO1lBQ2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtCb29sZWFuV3JhcHBlciwgaXNQcmVzZW50LCBSb3V0aW5nU2VydmljZX0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vLi4vY29yZS91aW1ldGEnO1xuXG5cbi8qKlxuICogTWV0YUNvbnRlbnRQYWdlICBjb21wb25lbnQgaXMgdXNlZCBmcm9tIE1ldGFSdWxlcyBhbmQgdW5pdmVyc2FsIGNvbXBvbmVudCByZW5kZXJpbmcgZGlmZmVyZW50XG4gKiBvcGVyYXRpb24gbW9kZXMuXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWNvbnRlbnQtcGFnZScsXG4gICAgdGVtcGxhdGU6IGA8IS0tIFRPRE86IGltcHBsZW1lbnQgZHluYW1pYyB0aXRsZSBiYXNlZCBvbiB0aGUgb3BlcmF0aW9uIGFuZCBvYmplY3QgYXMgd2VsbCBhcyB1cGRhdGVzIGJ1dHRvbnMtLT5cblxuPG0tY29udGV4dCBbcHVzaE5ld0NvbnRleHRdPVwibmV3Q29udGV4dFwiIFtvYmplY3RdPVwib2JqZWN0XCIgW29wZXJhdGlvbl09XCJvcGVyYXRpb25cIlxuICAgICAgICAgICBbbGF5b3V0XT1cImxheW91dFwiPlxuXG4gICAgPGF3LWJhc2ljLW5hdmlnYXRvciAob25PS0FjdGlvbik9XCJvbkJhY2soJGV2ZW50KVwiIFtva0FjdGlvbkxhYmVsXT1cIm9rTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3Nob3dDYW5jZWxCdXR0b25dPVwiIWlzSW5zcGVjdEFjdGlvblwiPlxuXG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2UtY29udGFpbmVyIFwiPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxoMz57e29iamVjdE5hbWV9fSBkZXRhaWxzOjwvaDM+XG5cbiAgICAgICAgICAgIDxtLWluY2x1ZGUtY29tcG9uZW50PjwvbS1pbmNsdWRlLWNvbXBvbmVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9hdy1iYXNpYy1uYXZpZ2F0b3I+XG5cbjwvbS1jb250ZXh0PlxuYCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUNvbnRlbnRQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG5cbiAgICBvYmplY3Q6IGFueTtcbiAgICBvcGVyYXRpb246IHN0cmluZztcbiAgICBsYXlvdXQ6IHN0cmluZztcbiAgICBuZXdDb250ZXh0OiBib29sZWFuID0gdHJ1ZTtcbiAgICBvYmplY3ROYW1lOiBzdHJpbmc7XG4gICAgaXNJbnNwZWN0QWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBva0xhYmVsID0gJ0JhY2snO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlKVxuICAgIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICB0aGlzLmxheW91dCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWydsYXlvdXQnXTtcbiAgICAgICAgdGhpcy5vcGVyYXRpb24gPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snb3BlcmF0aW9uJ107XG5cbiAgICAgICAgbGV0IHVybCA9ICcvJyArIHRoaXMucm91dGUuc25hcHNob3QudXJsWzBdLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh0aGlzLnJvdXRpbmdTZXJ2aWNlLnN0YXRlQ2FjaGVIaXN0b3J5Lmhhcyh1cmwpKSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdCA9IHRoaXMucm91dGluZ1NlcnZpY2Uuc3RhdGVDYWNoZUhpc3RvcnkuZ2V0KHVybCk7XG4gICAgICAgICAgICB0aGlzLm9iamVjdE5hbWUgPSBVSU1ldGEuZGVmYXVsdExhYmVsRm9ySWRlbnRpZmllcih0aGlzLm9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2l0aEJhY2tBY3Rpb24gPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snYiddO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHdpdGhCYWNrQWN0aW9uKSAmJiBCb29sZWFuV3JhcHBlci5pc1RydWUod2l0aEJhY2tBY3Rpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmlzSW5zcGVjdEFjdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgb25CYWNrKGV2ZW50OiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvQmFjaygpO1xuICAgIH1cblxufVxuIl19