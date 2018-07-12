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
var MetaContentPageComponent = /** @class */ (function () {
    function MetaContentPageComponent(route, routingService) {
        this.route = route;
        this.routingService = routingService;
        this.newContext = true;
        this.isInspectAction = false;
        this.okLabel = 'Back';
    }
    /**
     * @return {?}
     */
    MetaContentPageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.layout = this.route.snapshot.params['layout'];
        this.operation = this.route.snapshot.params['operation'];
        var /** @type {?} */ url = '/' + this.route.snapshot.url[0].toString();
        if (this.routingService.stateCacheHistory.has(url)) {
            this.object = this.routingService.stateCacheHistory.get(url);
            this.objectName = UIMeta.defaultLabelForIdentifier(this.object.constructor.name);
        }
        var /** @type {?} */ withBackAction = this.route.snapshot.params['b'];
        if (isPresent(withBackAction) && BooleanWrapper.isTrue(withBackAction)) {
            this.isInspectAction = true;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MetaContentPageComponent.prototype.onBack = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.routingService.goBack();
    };
    MetaContentPageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'm-content-page',
                    template: "<!-- TODO: impplement dynamic title based on the operation and object as well as updates buttons-->\n\n<m-context [pushNewContext]=\"newContext\" [object]=\"object\" [operation]=\"operation\"\n           [layout]=\"layout\">\n\n    <aw-basic-navigator (onOKAction)=\"onBack($event)\" [okActionLabel]=\"okLabel\"\n                        [showCancelButton]=\"!isInspectAction\">\n\n\n        <div class=\"page-container \">\n            <br/>\n            <h3>{{objectName}} details:</h3>\n\n            <m-include-component></m-include-component>\n        </div>\n    </aw-basic-navigator>\n\n</m-context>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    MetaContentPageComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: RoutingService }
    ]; };
    return MetaContentPageComponent;
}());
export { MetaContentPageComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb250ZW50LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtY29udGVudC1wYWdlL21ldGEtY29udGVudC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7O0lBNENyQyxrQ0FBb0IsS0FBcUIsRUFBVSxjQUE4QjtRQUE3RCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjswQkFOM0QsSUFBSTsrQkFFQyxLQUFLO3VCQUV0QixNQUFNO0tBSWY7Ozs7SUFFRCwyQ0FBUTs7O0lBQVI7UUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6RCxxQkFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRjtRQUNELHFCQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQy9CO0tBRUo7Ozs7O0lBR0QseUNBQU07Ozs7SUFBTixVQUFPLEtBQVU7UUFFYixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2hDOztnQkE1REosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxpbUJBa0JiO29CQUNHLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDZjs7OztnQkFqQ08sY0FBYztnQkFDYSxjQUFjOzttQ0FyQmpEOztTQXNEYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Qm9vbGVhbldyYXBwZXIsIGlzUHJlc2VudCwgUm91dGluZ1NlcnZpY2V9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uLy4uL2NvcmUvdWltZXRhJztcblxuXG4vKipcbiAqIE1ldGFDb250ZW50UGFnZSAgY29tcG9uZW50IGlzIHVzZWQgZnJvbSBNZXRhUnVsZXMgYW5kIHVuaXZlcnNhbCBjb21wb25lbnQgcmVuZGVyaW5nIGRpZmZlcmVudFxuICogb3BlcmF0aW9uIG1vZGVzLlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbS1jb250ZW50LXBhZ2UnLFxuICAgIHRlbXBsYXRlOiBgPCEtLSBUT0RPOiBpbXBwbGVtZW50IGR5bmFtaWMgdGl0bGUgYmFzZWQgb24gdGhlIG9wZXJhdGlvbiBhbmQgb2JqZWN0IGFzIHdlbGwgYXMgdXBkYXRlcyBidXR0b25zLS0+XG5cbjxtLWNvbnRleHQgW3B1c2hOZXdDb250ZXh0XT1cIm5ld0NvbnRleHRcIiBbb2JqZWN0XT1cIm9iamVjdFwiIFtvcGVyYXRpb25dPVwib3BlcmF0aW9uXCJcbiAgICAgICAgICAgW2xheW91dF09XCJsYXlvdXRcIj5cblxuICAgIDxhdy1iYXNpYy1uYXZpZ2F0b3IgKG9uT0tBY3Rpb24pPVwib25CYWNrKCRldmVudClcIiBbb2tBY3Rpb25MYWJlbF09XCJva0xhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzaG93Q2FuY2VsQnV0dG9uXT1cIiFpc0luc3BlY3RBY3Rpb25cIj5cblxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWNvbnRhaW5lciBcIj5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8aDM+e3tvYmplY3ROYW1lfX0gZGV0YWlsczo8L2gzPlxuXG4gICAgICAgICAgICA8bS1pbmNsdWRlLWNvbXBvbmVudD48L20taW5jbHVkZS1jb21wb25lbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvYXctYmFzaWMtbmF2aWdhdG9yPlxuXG48L20tY29udGV4dD5cbmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFDb250ZW50UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgb2JqZWN0OiBhbnk7XG4gICAgb3BlcmF0aW9uOiBzdHJpbmc7XG4gICAgbGF5b3V0OiBzdHJpbmc7XG4gICAgbmV3Q29udGV4dDogYm9vbGVhbiA9IHRydWU7XG4gICAgb2JqZWN0TmFtZTogc3RyaW5nO1xuICAgIGlzSW5zcGVjdEFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb2tMYWJlbCA9ICdCYWNrJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSlcbiAgICB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snbGF5b3V0J107XG4gICAgICAgIHRoaXMub3BlcmF0aW9uID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ29wZXJhdGlvbiddO1xuXG4gICAgICAgIGxldCB1cmwgPSAnLycgKyB0aGlzLnJvdXRlLnNuYXBzaG90LnVybFswXS50b1N0cmluZygpO1xuICAgICAgICBpZiAodGhpcy5yb3V0aW5nU2VydmljZS5zdGF0ZUNhY2hlSGlzdG9yeS5oYXModXJsKSkge1xuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSB0aGlzLnJvdXRpbmdTZXJ2aWNlLnN0YXRlQ2FjaGVIaXN0b3J5LmdldCh1cmwpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3ROYW1lID0gVUlNZXRhLmRlZmF1bHRMYWJlbEZvcklkZW50aWZpZXIodGhpcy5vYmplY3QuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpdGhCYWNrQWN0aW9uID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2InXTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh3aXRoQmFja0FjdGlvbikgJiYgQm9vbGVhbldyYXBwZXIuaXNUcnVlKHdpdGhCYWNrQWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5pc0luc3BlY3RBY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIG9uQmFjayhldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nb0JhY2soKTtcbiAgICB9XG5cbn1cbiJdfQ==