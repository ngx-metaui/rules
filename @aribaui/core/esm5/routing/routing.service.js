/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { isBlank, isPresent } from '../utils/lang';
import { ListWrapper } from '../utils/collection';
/**
 * Basic wrapper around Angular's ROUTE service to simplify temporary state caching as well
 * navigation. This service listen for Routing events such as NavigationStart as well,
 * NavigationEnds and when the routing Enters, We check if there any state which needs to be cached
 * if yes then we save it into the stateCacheHistory which maps final URL to the actual STATE
 * object, and when we are navigate back to the same URL We check if there is any saved state.
 *
 * This service was originally created as a response that angular always destroyes and recreates
 * components when navigating aways and then back to it. By a of angular 4.2.0+ this might be
 * obsolete.
 *
 */
var RoutingService = /** @class */ (function () {
    function RoutingService(router) {
        var _this = this;
        this.router = router;
        /**
         * Stack keeping active Routes so we can go back/redirect back
         *
         */
        this.routingState = [];
        /*
             * Event object for registering listeners to save a certain state as well as broadcasting back
             * when state needs to be retrieved back to the Page
             *
             */
        this.stateCache = new Subject();
        /**
         *
         * This is our cache which maps URL => to = >STATE. Any page can save any state using
         * observable object which will be retrieved back.
         *
         */
        this.stateCacheHistory = new Map();
        this.router.events.subscribe(function (event) { return _this.subscribeToRoutingEvents(event); });
    }
    /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     */
    /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     * @param {?} event
     * @return {?}
     */
    RoutingService.prototype.subscribeToRoutingEvents = /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event instanceof NavigationEnd) {
            /** @type {?} */
            var url = event.url;
            if (this.stateCacheHistory.has(url)) {
                this.stateCache.next(this.stateCacheHistory.get(url));
                this.stateCacheHistory.delete(url);
            }
            this.routingState.push(event);
        }
        if (event instanceof NavigationStart) {
            /** @type {?} */
            var itemBeforeRoute = ListWrapper.last(this.routingState);
            if (isPresent(this.currentStateFrom) && isPresent(itemBeforeRoute) && isPresent(this.currentStateFrom) && itemBeforeRoute instanceof NavigationEnd ||
                itemBeforeRoute instanceof NavigationStart) {
                this.stateCacheHistory.set(itemBeforeRoute.url, this.currentStateFrom);
                this.currentStateFrom = null;
            }
            else if (isPresent(this.currentStateTo)) {
                this.stateCacheHistory.set(event.url, this.currentStateTo);
                this.currentStateTo = null;
            }
        }
    };
    /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     */
    /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     * @param {?=} numOfSteps
     * @return {?}
     */
    RoutingService.prototype.goBack = /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     * @param {?=} numOfSteps
     * @return {?}
     */
    function (numOfSteps) {
        if (numOfSteps === void 0) { numOfSteps = 1; }
        /** @type {?} */
        var steps = -1;
        /** @type {?} */
        var navigateUrl = '/404';
        while (steps !== numOfSteps) {
            /** @type {?} */
            var popState = this.routingState.pop();
            if (popState instanceof NavigationEnd || popState instanceof NavigationStart) {
                navigateUrl = popState.url;
                steps++;
            }
        }
        this.router.navigateByUrl(navigateUrl);
    };
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     */
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     * @template T
     * @param {?} commands
     * @param {?=} state
     * @param {?=} extras
     * @return {?}
     */
    RoutingService.prototype.navigate = /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     * @template T
     * @param {?} commands
     * @param {?=} state
     * @param {?=} extras
     * @return {?}
     */
    function (commands, state, extras) {
        this.currentStateFrom = state;
        this.router.navigate(commands, extras);
    };
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     */
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     * @template T
     * @param {?} route
     * @param {?=} params
     * @param {?=} state
     * @param {?=} extras
     * @return {?}
     */
    RoutingService.prototype.navigateWithRoute = /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     * @template T
     * @param {?} route
     * @param {?=} params
     * @param {?=} state
     * @param {?=} extras
     * @return {?}
     */
    function (route, params, state, extras) {
        this.currentStateTo = state;
        this.router.navigate([route.path, params], extras);
    };
    /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     */
    /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     * @template T
     * @param {?} listener
     * @return {?}
     */
    RoutingService.prototype.bindStateCache = /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     * @template T
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        this.stateCache.asObservable().subscribe(function (stateItem) { return listener(stateItem); });
    };
    /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     */
    /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     * @param {?} route
     * @return {?}
     */
    RoutingService.prototype.operation = /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     * @param {?} route
     * @return {?}
     */
    function (route) {
        /** @type {?} */
        var operation = route.snapshot.params['o'];
        return isBlank(operation) || (operation !== 'view' && operation !== 'create' && operation !== 'edit')
            ? 'view' : operation;
    };
    /**
     * Assembles a path based on the current route.
     *
     */
    /**
     * Assembles a path based on the current route.
     *
     * @param {?} pageName
     * @param {?} pathName
     * @return {?}
     */
    RoutingService.prototype.pathForPage = /**
     * Assembles a path based on the current route.
     *
     * @param {?} pageName
     * @param {?} pathName
     * @return {?}
     */
    function (pageName, pathName) {
        return this.router.routerState.snapshot.url + "/" + pathName;
    };
    /**
     *
     * Search top level routes and return Route that has component name equal to pageName
     *
     *
     */
    /**
     *
     * Search top level routes and return Route that has component name equal to pageName
     *
     *
     * @param {?} pageName
     * @param {?=} pathName
     * @param {?=} activatedPath
     * @return {?}
     */
    RoutingService.prototype.routeForPage = /**
     *
     * Search top level routes and return Route that has component name equal to pageName
     *
     *
     * @param {?} pageName
     * @param {?=} pathName
     * @param {?=} activatedPath
     * @return {?}
     */
    function (pageName, pathName, activatedPath) {
        /** @type {?} */
        var nextRoute;
        /** @type {?} */
        var normalizedPath = activatedPath.indexOf('/') === 0 ? activatedPath.substring(1) :
            activatedPath;
        /** @type {?} */
        var currentRoute = this.router.config.find(function (r) {
            /** @type {?} */
            var routePath = r.path.indexOf('/') === 0 ? r.path.substring(1) :
                r.path;
            return isPresent(normalizedPath) && normalizedPath === routePath;
        });
        // try to match the path and expected pageName
        if (isPresent(pathName) && isPresent(currentRoute) && currentRoute.children.length > 0) {
            nextRoute = currentRoute.children.find(function (r) {
                /** @type {?} */
                var componentName = r.component.prototype.constructor.name;
                return pathName === r.path && pageName === componentName;
            });
        }
        else if (isPresent(pageName)) {
            nextRoute = this.router.config.find(function (r) {
                /** @type {?} */
                var componentName = r.component.prototype.constructor.name;
                return pathName === r.path && pageName === componentName;
            });
        }
        // path not found then check only if we find anywhere in the path pageNae
        if (isBlank(nextRoute)) {
            this.router.config.forEach(function (r) {
                if (isPresent(r.component)) {
                    /** @type {?} */
                    var componentName = r.component.prototype.constructor.name;
                    if (pageName === componentName) {
                        nextRoute = r;
                    }
                }
            });
        }
        return nextRoute;
    };
    RoutingService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RoutingService.ctorParameters = function () { return [
        { type: Router }
    ]; };
    return RoutingService;
}());
export { RoutingService };
if (false) {
    /**
     * Stack keeping active Routes so we can go back/redirect back
     *
     * @type {?}
     */
    RoutingService.prototype.routingState;
    /**
     * Temporary field holding a state Object of type T before its saved into stateCacheHistory,
     * and retrieved when getting back from State
     * @type {?}
     */
    RoutingService.prototype.currentStateFrom;
    /**
     * Temporary field holding a state Object of type T before its saved into stateCacheHistory,
     * and retrieved when getting to State
     * @type {?}
     */
    RoutingService.prototype.currentStateTo;
    /** @type {?} */
    RoutingService.prototype.stateCache;
    /**
     *
     * This is our cache which maps URL => to = >STATE. Any page can save any state using
     * observable object which will be retrieved back.
     *
     * @type {?}
     */
    RoutingService.prototype.stateCacheHistory;
    /** @type {?} */
    RoutingService.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbInJvdXRpbmcvcm91dGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBR0gsYUFBYSxFQUViLGVBQWUsRUFFZixNQUFNLEVBQ1QsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUFvRDVDLHdCQUFtQixNQUFjO1FBQWpDLGlCQUdDO1FBSGtCLFdBQU0sR0FBTixNQUFNLENBQVE7Ozs7OzRCQS9CRCxFQUFFOzs7Ozs7MEJBb0JQLElBQUksT0FBTyxFQUFPOzs7Ozs7O2lDQVFQLElBQUksR0FBRyxFQUFlO1FBS3hELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVksSUFBSyxPQUFBLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO0tBQ3hGO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCxpREFBd0I7Ozs7Ozs7SUFBeEIsVUFBeUIsS0FBWTtRQUdqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksYUFBYSxDQUFDLENBQUMsQ0FBQzs7WUFDakMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FB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UyxDQUFDLENBQUMsQ0FBQyxDQUFDOztvQkFDekIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDM0QsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLFNBQVMsR0FBRyxDQUFDLENBQUM7cUJBQ2pCO2lCQUNKO2FBQ0osQ0FBQyxDQUFDO1NBQ047UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3BCOztnQkFyTkosVUFBVTs7OztnQkFsQlAsTUFBTTs7eUJBNUJWOztTQStDYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBFdmVudCxcbiAgICBOYXZpZ2F0aW9uRW5kLFxuICAgIE5hdmlnYXRpb25FeHRyYXMsXG4gICAgTmF2aWdhdGlvblN0YXJ0LFxuICAgIFJvdXRlLFxuICAgIFJvdXRlclxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICcuLi91dGlscy9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuXG4vKipcbiAqIEJhc2ljIHdyYXBwZXIgYXJvdW5kIEFuZ3VsYXIncyBST1VURSBzZXJ2aWNlIHRvIHNpbXBsaWZ5IHRlbXBvcmFyeSBzdGF0ZSBjYWNoaW5nIGFzIHdlbGxcbiAqIG5hdmlnYXRpb24uIFRoaXMgc2VydmljZSBsaXN0ZW4gZm9yIFJvdXRpbmcgZXZlbnRzIHN1Y2ggYXMgTmF2aWdhdGlvblN0YXJ0IGFzIHdlbGwsXG4gKiBOYXZpZ2F0aW9uRW5kcyBhbmQgd2hlbiB0aGUgcm91dGluZyBFbnRlcnMsIFdlIGNoZWNrIGlmIHRoZXJlIGFueSBzdGF0ZSB3aGljaCBuZWVkcyB0byBiZSBjYWNoZWRcbiAqIGlmIHllcyB0aGVuIHdlIHNhdmUgaXQgaW50byB0aGUgc3RhdGVDYWNoZUhpc3Rvcnkgd2hpY2ggbWFwcyBmaW5hbCBVUkwgdG8gdGhlIGFjdHVhbCBTVEFURVxuICogb2JqZWN0LCBhbmQgd2hlbiB3ZSBhcmUgbmF2aWdhdGUgYmFjayB0byB0aGUgc2FtZSBVUkwgV2UgY2hlY2sgaWYgdGhlcmUgaXMgYW55IHNhdmVkIHN0YXRlLlxuICpcbiAqIFRoaXMgc2VydmljZSB3YXMgb3JpZ2luYWxseSBjcmVhdGVkIGFzIGEgcmVzcG9uc2UgdGhhdCBhbmd1bGFyIGFsd2F5cyBkZXN0cm95ZXMgYW5kIHJlY3JlYXRlc1xuICogY29tcG9uZW50cyB3aGVuIG5hdmlnYXRpbmcgYXdheXMgYW5kIHRoZW4gYmFjayB0byBpdC4gQnkgYSBvZiBhbmd1bGFyIDQuMi4wKyB0aGlzIG1pZ2h0IGJlXG4gKiBvYnNvbGV0ZS5cbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb3V0aW5nU2VydmljZVxue1xuICAgIC8qKlxuICAgICAqIFN0YWNrIGtlZXBpbmcgYWN0aXZlIFJvdXRlcyBzbyB3ZSBjYW4gZ28gYmFjay9yZWRpcmVjdCBiYWNrXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJvdXRpbmdTdGF0ZTogRXZlbnRbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVGVtcG9yYXJ5IGZpZWxkIGhvbGRpbmcgYSBzdGF0ZSBPYmplY3Qgb2YgdHlwZSBUIGJlZm9yZSBpdHMgc2F2ZWQgaW50byBzdGF0ZUNhY2hlSGlzdG9yeSxcbiAgICAgKiBhbmQgcmV0cmlldmVkIHdoZW4gZ2V0dGluZyBiYWNrIGZyb20gU3RhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGN1cnJlbnRTdGF0ZUZyb206IGFueTtcblxuXG4gICAgLyoqXG4gICAgICogVGVtcG9yYXJ5IGZpZWxkIGhvbGRpbmcgYSBzdGF0ZSBPYmplY3Qgb2YgdHlwZSBUIGJlZm9yZSBpdHMgc2F2ZWQgaW50byBzdGF0ZUNhY2hlSGlzdG9yeSxcbiAgICAgKiBhbmQgcmV0cmlldmVkIHdoZW4gZ2V0dGluZyB0byBTdGF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgY3VycmVudFN0YXRlVG86IGFueTtcblxuICAgIC8qXG4gICAgICogRXZlbnQgb2JqZWN0IGZvciByZWdpc3RlcmluZyBsaXN0ZW5lcnMgdG8gc2F2ZSBhIGNlcnRhaW4gc3RhdGUgYXMgd2VsbCBhcyBicm9hZGNhc3RpbmcgYmFja1xuICAgICAqIHdoZW4gc3RhdGUgbmVlZHMgdG8gYmUgcmV0cmlldmVkIGJhY2sgdG8gdGhlIFBhZ2VcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRlQ2FjaGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyBpcyBvdXIgY2FjaGUgd2hpY2ggbWFwcyBVUkwgPT4gdG8gPSA+U1RBVEUuIEFueSBwYWdlIGNhbiBzYXZlIGFueSBzdGF0ZSB1c2luZ1xuICAgICAqIG9ic2VydmFibGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgcmV0cmlldmVkIGJhY2suXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0ZUNhY2hlSGlzdG9yeTogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcilcbiAgICB7XG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5zdWJzY3JpYmVUb1JvdXRpbmdFdmVudHMoZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEhlcmUgaXMgdGhlIG1haW4gcm91dGluZyBsb2dpYyB0aGF0IHByb2Nlc2VzIGV2ZXJ5IHJvdXRpbmcgZXZlbnRzLlxuICAgICAqXG4gICAgICovXG4gICAgc3Vic2NyaWJlVG9Sb3V0aW5nRXZlbnRzKGV2ZW50OiBFdmVudCk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICAgICAgbGV0IHVybCA9IGV2ZW50LnVybDtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5Lmhhcyh1cmwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlLm5leHQodGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5nZXQodXJsKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5kZWxldGUodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm91dGluZ1N0YXRlLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG5cbiAgICAgICAgICAgIGxldCBpdGVtQmVmb3JlUm91dGUgPSBMaXN0V3JhcHBlci5sYXN0PEV2ZW50Pih0aGlzLnJvdXRpbmdTdGF0ZSk7XG5cblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmN1cnJlbnRTdGF0ZUZyb20pICYmIGlzUHJlc2VudChpdGVtQmVmb3JlUm91dGUpICYmIGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVGcm9tKSAmJiBpdGVtQmVmb3JlUm91dGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8XG4gICAgICAgICAgICAgICAgaXRlbUJlZm9yZVJvdXRlIGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2FjaGVIaXN0b3J5LnNldChpdGVtQmVmb3JlUm91dGUudXJsLCB0aGlzLmN1cnJlbnRTdGF0ZUZyb20pO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlRnJvbSA9IG51bGw7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMuY3VycmVudFN0YXRlVG8pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNhY2hlSGlzdG9yeS5zZXQoZXZlbnQudXJsLCB0aGlzLmN1cnJlbnRTdGF0ZVRvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZVRvID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlbmllbnQgR08gQkFDSyBtZXRob2QuIHdoaWNoIHRha2VzIHlvdSB0byBwcmV2aW91cyByb3V0ZSBhbG9uZyB3aXRoIHRoZSBVUkwgY2hhbmdlLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBnb0JhY2sobnVtT2ZTdGVwczogbnVtYmVyID0gMSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIHdlIGFyZSBzdGFydGluZyBmcm9tIC0xIGFzIHdlIG5lZWQgdG8gYWxzbyByZW1vdmUgY3VycmVudCByb3V0ZVxuICAgICAgICBsZXQgc3RlcHMgPSAtMTtcbiAgICAgICAgbGV0IG5hdmlnYXRlVXJsID0gJy80MDQnO1xuICAgICAgICB3aGlsZSAoc3RlcHMgIT09IG51bU9mU3RlcHMpIHtcbiAgICAgICAgICAgIGxldCBwb3BTdGF0ZSA9IHRoaXMucm91dGluZ1N0YXRlLnBvcCgpO1xuICAgICAgICAgICAgaWYgKHBvcFN0YXRlIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCB8fCBwb3BTdGF0ZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuICAgICAgICAgICAgICAgIG5hdmlnYXRlVXJsID0gcG9wU3RhdGUudXJsO1xuICAgICAgICAgICAgICAgIHN0ZXBzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKG5hdmlnYXRlVXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbmF2aWdhdGluZyB0byBhIG5ldyBQYWdlIHlvdSBjYW4gdXNlIGRpcmVjdGx5IHJvdXRlciBvciBpZiB5b3Ugd2FudCB0byByZW1lbWJlciBzb21lXG4gICAgICogc3RhdGUgdG5lIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZTxUPihjb21tYW5kczogYW55W10sIHN0YXRlPzogVCwgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlRnJvbSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShjb21tYW5kcywgZXh0cmFzKTtcblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbmF2aWdhdGluZyB0byBhIG5ldyBQYWdlIHlvdSBjYW4gdXNlIGRpcmVjdGx5IHJvdXRlciBvciBpZiB5b3Ugd2FudCB0byByZW1lbWJlciBzb21lXG4gICAgICogc3RhdGUgdG5lIHRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZVdpdGhSb3V0ZTxUPihyb3V0ZTogUm91dGUsIHBhcmFtcz86IGFueSwgc3RhdGU/OiBULCBleHRyYXM/OiBOYXZpZ2F0aW9uRXh0cmFzKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVUbyA9IHN0YXRlO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcm91dGUucGF0aCwgcGFyYW1zXSwgZXh0cmFzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEVudHJ5IG1ldGhvZCBmb3IgYnJvYWRjYXN0aW5nIHN0YXRlQ2FjaGUgYW5kIHNlbmRpbmcgc2F2ZWQgU3RhdGUgYmFjayB0byB0aGUgcGFnZVxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBiaW5kU3RhdGVDYWNoZTxUPihsaXN0ZW5lcjogKGl0ZW06IFQpID0+IHZvaWQpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnN0YXRlQ2FjaGUuYXNPYnNlcnZhYmxlKCkuc3Vic2NyaWJlKChzdGF0ZUl0ZW06IFQpID0+IGxpc3RlbmVyKHN0YXRlSXRlbSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFV0aWxpdHkgbWV0aG9kIHNvIGNoZWNrIGV4dHJhIHBhcmFtZXRlcnMgd2hpY2ggYXJlIHBhc3NlZCB1c2luZyBNYXRyaXggbm90YXRpb25cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgb3BlcmF0aW9uKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgbGV0IG9wZXJhdGlvbiA9IHJvdXRlLnNuYXBzaG90LnBhcmFtc1snbyddO1xuICAgICAgICByZXR1cm4gaXNCbGFuayhcbiAgICAgICAgICAgIG9wZXJhdGlvbikgfHwgKG9wZXJhdGlvbiAhPT0gJ3ZpZXcnICYmIG9wZXJhdGlvbiAhPT0gJ2NyZWF0ZScgJiYgb3BlcmF0aW9uICE9PSAnZWRpdCcpXG4gICAgICAgICAgICA/ICd2aWV3JyA6IG9wZXJhdGlvbjtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFzc2VtYmxlcyBhIHBhdGggYmFzZWQgb24gdGhlIGN1cnJlbnQgcm91dGUuXG4gICAgICpcbiAgICAgKi9cbiAgICBwYXRoRm9yUGFnZShwYWdlTmFtZTogc3RyaW5nLCBwYXRoTmFtZTogc3RyaW5nKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3QudXJsfS8ke3BhdGhOYW1lfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZWFyY2ggdG9wIGxldmVsIHJvdXRlcyBhbmQgcmV0dXJuIFJvdXRlIHRoYXQgaGFzIGNvbXBvbmVudCBuYW1lIGVxdWFsIHRvIHBhZ2VOYW1lXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHJvdXRlRm9yUGFnZShwYWdlTmFtZTogc3RyaW5nLCBwYXRoTmFtZT86IHN0cmluZywgYWN0aXZhdGVkUGF0aD86IHN0cmluZyk6IFJvdXRlXG4gICAge1xuICAgICAgICBsZXQgbmV4dFJvdXRlOiBhbnk7XG4gICAgICAgIC8vIHdlIG5lZWQgdGhpcyBhcyB3ZSBuZWVkIHRvIGxvb2t1cCBpZiB0aGVyZSBpcyBhbnkgcm91dGUgd2l0aCBnaXZlbiBwYWdlTmFtZSBhc1xuICAgICAgICAvLyBjaGlsZCByb3V0ZSwgaWYgbm90IHNlYXJjaCBmb3IgZ2xvYmFsIG9uY2VzXG5cbiAgICAgICAgbGV0IG5vcm1hbGl6ZWRQYXRoID0gYWN0aXZhdGVkUGF0aC5pbmRleE9mKCcvJykgPT09IDAgPyBhY3RpdmF0ZWRQYXRoLnN1YnN0cmluZygxKSA6XG4gICAgICAgICAgICBhY3RpdmF0ZWRQYXRoO1xuXG4gICAgICAgIGxldCBjdXJyZW50Um91dGU6IFJvdXRlID0gdGhpcy5yb3V0ZXIuY29uZmlnLmZpbmQoKHI6IFJvdXRlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCByb3V0ZVBhdGggPSByLnBhdGguaW5kZXhPZignLycpID09PSAwID8gci5wYXRoLnN1YnN0cmluZygxKSA6XG4gICAgICAgICAgICAgICAgICAgIHIucGF0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KG5vcm1hbGl6ZWRQYXRoKSAmJiBub3JtYWxpemVkUGF0aCA9PT0gcm91dGVQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRyeSB0byBtYXRjaCB0aGUgcGF0aCBhbmQgZXhwZWN0ZWQgcGFnZU5hbWVcbiAgICAgICAgaWYgKGlzUHJlc2VudChwYXRoTmFtZSkgJiYgaXNQcmVzZW50KGN1cnJlbnRSb3V0ZSkgJiYgY3VycmVudFJvdXRlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgbmV4dFJvdXRlID0gY3VycmVudFJvdXRlLmNoaWxkcmVuLmZpbmQoKHI6IFJvdXRlKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gci5jb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGhOYW1lID09PSByLnBhdGggJiYgcGFnZU5hbWUgPT09IGNvbXBvbmVudE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQocGFnZU5hbWUpKSB7XG5cbiAgICAgICAgICAgIG5leHRSb3V0ZSA9IHRoaXMucm91dGVyLmNvbmZpZy5maW5kKChyOiBSb3V0ZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50TmFtZSA9IHIuY29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoTmFtZSA9PT0gci5wYXRoICYmIHBhZ2VOYW1lID09PSBjb21wb25lbnROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGF0aCBub3QgZm91bmQgdGhlbiBjaGVjayBvbmx5IGlmIHdlIGZpbmQgYW55d2hlcmUgaW4gdGhlIHBhdGggcGFnZU5hZVxuICAgICAgICBpZiAoaXNCbGFuayhuZXh0Um91dGUpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5jb25maWcuZm9yRWFjaCgocjogUm91dGUpID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJlc2VudChyLmNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSByLmNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VOYW1lID09PSBjb21wb25lbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0Um91dGUgPSByO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHRSb3V0ZTtcbiAgICB9XG5cbn1cblxuXG4iXX0=