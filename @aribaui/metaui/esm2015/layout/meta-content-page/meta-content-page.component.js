/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @type {?} */
        let url = '/' + this.route.snapshot.url[0].toString();
        if (this.routingService.stateCacheHistory.has(url)) {
            this.object = this.routingService.stateCacheHistory.get(url);
            this.objectName = UIMeta.defaultLabelForIdentifier(this.object.constructor.name);
        }
        /** @type {?} */
        let withBackAction = this.route.snapshot.params['b'];
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
                template: "<!-- TODO: impplement dynamic title based on the operation and object as well as updates buttons-->\n\n<m-context [pushNewContext]=\"newContext\" [object]=\"object\" [operation]=\"operation\"\n           [layout]=\"layout\">\n\n    <aw-basic-navigator (onOKAction)=\"onBack($event)\" [okActionLabel]=\"okLabel\"\n                        [showCancelButton]=\"!isInspectAction\">\n\n\n        <div class=\"page-container \">\n            <br/>\n            <h3>{{objectName}} details:</h3>\n\n            <m-include-component></m-include-component>\n        </div>\n    </aw-basic-navigator>\n\n</m-context>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
MetaContentPageComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: RoutingService }
];
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb250ZW50LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsibGF5b3V0L21ldGEtY29udGVudC1wYWdlL21ldGEtY29udGVudC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFjekMsTUFBTTs7Ozs7SUFZRixZQUFvQixLQUFxQixFQUFVLGNBQThCO1FBQTdELFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCOzBCQU4zRCxJQUFJOytCQUVDLEtBQUs7dUJBRXRCLE1BQU07S0FJZjs7OztJQUVELFFBQVE7UUFFSixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFFekQsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRjs7UUFDRCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQy9CO0tBRUo7Ozs7O0lBR0QsTUFBTSxDQUFDLEtBQVU7UUFFYixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2hDOzs7WUExQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLDJtQkFBK0M7O2FBRWxEOzs7O1lBZk8sY0FBYztZQUNhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Qm9vbGVhbldyYXBwZXIsIGlzUHJlc2VudCwgUm91dGluZ1NlcnZpY2V9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuaW1wb3J0IHtVSU1ldGF9IGZyb20gJy4uLy4uL2NvcmUvdWltZXRhJztcblxuXG4vKipcbiAqIE1ldGFDb250ZW50UGFnZSAgY29tcG9uZW50IGlzIHVzZWQgZnJvbSBNZXRhUnVsZXMgYW5kIHVuaXZlcnNhbCBjb21wb25lbnQgcmVuZGVyaW5nIGRpZmZlcmVudFxuICogb3BlcmF0aW9uIG1vZGVzLlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbS1jb250ZW50LXBhZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnbWV0YS1jb250ZW50LXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydtZXRhLWNvbnRlbnQtcGFnZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFDb250ZW50UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgb2JqZWN0OiBhbnk7XG4gICAgb3BlcmF0aW9uOiBzdHJpbmc7XG4gICAgbGF5b3V0OiBzdHJpbmc7XG4gICAgbmV3Q29udGV4dDogYm9vbGVhbiA9IHRydWU7XG4gICAgb2JqZWN0TmFtZTogc3RyaW5nO1xuICAgIGlzSW5zcGVjdEFjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb2tMYWJlbCA9ICdCYWNrJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSlcbiAgICB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snbGF5b3V0J107XG4gICAgICAgIHRoaXMub3BlcmF0aW9uID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ29wZXJhdGlvbiddO1xuXG4gICAgICAgIGxldCB1cmwgPSAnLycgKyB0aGlzLnJvdXRlLnNuYXBzaG90LnVybFswXS50b1N0cmluZygpO1xuICAgICAgICBpZiAodGhpcy5yb3V0aW5nU2VydmljZS5zdGF0ZUNhY2hlSGlzdG9yeS5oYXModXJsKSkge1xuICAgICAgICAgICAgdGhpcy5vYmplY3QgPSB0aGlzLnJvdXRpbmdTZXJ2aWNlLnN0YXRlQ2FjaGVIaXN0b3J5LmdldCh1cmwpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3ROYW1lID0gVUlNZXRhLmRlZmF1bHRMYWJlbEZvcklkZW50aWZpZXIodGhpcy5vYmplY3QuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpdGhCYWNrQWN0aW9uID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2InXTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh3aXRoQmFja0FjdGlvbikgJiYgQm9vbGVhbldyYXBwZXIuaXNUcnVlKHdpdGhCYWNrQWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5pc0luc3BlY3RBY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIG9uQmFjayhldmVudDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nb0JhY2soKTtcbiAgICB9XG5cbn1cbiJdfQ==