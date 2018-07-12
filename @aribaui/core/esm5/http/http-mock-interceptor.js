/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError, of as observableOf } from 'rxjs';
import { AppConfig } from '../config/app-config';
import { isBlank, isPresent, isString } from '../utils/lang';
/**
 * Typed interfaced to process easier routes
 * @record
 */
export function MockRoutes() { }
function MockRoutes_tsickle_Closure_declarations() {
    /** @type {?} */
    MockRoutes.prototype.resource;
    /** @type {?} */
    MockRoutes.prototype.routes;
}
/**
 * @record
 */
export function MockRoute() { }
function MockRoute_tsickle_Closure_declarations() {
    /** @type {?} */
    MockRoute.prototype.path;
    /** @type {?} */
    MockRoute.prototype.method;
    /** @type {?} */
    MockRoute.prototype.responseCode;
    /** @type {?} */
    MockRoute.prototype.responseText;
    /** @type {?} */
    MockRoute.prototype.data;
}
/**
 * Interceptor providing Mock Server functionality and is inserted only and if mock server is
 * enabled using AppConfig's connection.mock-server.enabled bootstrap property
 *
 *
 */
var HttpMockInterceptor = /** @class */ (function () {
    function HttpMockInterceptor(appConfig) {
        this.appConfig = appConfig;
        /**
         * Stores loaded routes by given entity name.
         *
         */
        this.routesByEntity = new Map();
    }
    /**
     *
     * If route is found returned Mock resuled defined in the JSON files, otherwise pass
     * the request to the next interceptor.
     *
     *
     */
    /**
     *
     * If route is found returned Mock resuled defined in the JSON files, otherwise pass
     * the request to the next interceptor.
     *
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    HttpMockInterceptor.prototype.intercept = /**
     *
     * If route is found returned Mock resuled defined in the JSON files, otherwise pass
     * the request to the next interceptor.
     *
     *
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var /** @type {?} */ mockedResp = this.makeRes(req);
        if (isPresent(mockedResp)) {
            if (mockedResp.status >= 200 && mockedResp.status < 300) {
                return observableOf(/** @type {?} */ (mockedResp));
            }
            else {
                var /** @type {?} */ errror = new HttpErrorResponse({
                    error: mockedResp.body,
                    status: mockedResp.status,
                    statusText: mockedResp.statusText,
                    url: req.urlWithParams
                });
                observableThrowError(errror);
            }
        }
        return next.handle(req);
    };
    /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     */
    /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     * @return {?}
     */
    HttpMockInterceptor.prototype.loadRoutes = /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     * @return {?}
     */
    function () {
        var /** @type {?} */ routes = this.appConfig.get(AppConfig.ConnectionMockServerRoutes);
        try {
            for (var routes_1 = tslib_1.__values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                var routeName = routes_1_1.value;
                var /** @type {?} */ req = this.makeReq(routeName);
                // let's make quick and dirty async call to load our routes before anything else
                var /** @type {?} */ mocked = this.requestForRoutes(req);
                this.routesByEntity.set(mocked.resource, mocked.routes);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return)) _a.call(routes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    /**
     *
     * Returns configuration based on mock JSON files.
     *
     * @param {?} req
     * @return {?}
     */
    HttpMockInterceptor.prototype.requestForRoutes = /**
     *
     * Returns configuration based on mock JSON files.
     *
     * @param {?} req
     * @return {?}
     */
    function (req) {
        var /** @type {?} */ xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open(req.method, req.urlWithParams, false);
        req.headers.keys().forEach(function (key) {
            var /** @type {?} */ all = req.headers.getAll(key);
            xmlHttpReq.setRequestHeader(name, all.join(','));
        });
        xmlHttpReq.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xmlHttpReq.send(null);
        var /** @type {?} */ body = isBlank(xmlHttpReq.response) ? xmlHttpReq.responseText :
            xmlHttpReq.response;
        if (xmlHttpReq.status < 200 && xmlHttpReq.status >= 300) {
            throw new Error('Cannot load Mock server configuration. Please make sure that you' +
                ' have a mock-routing/ folder under your assets');
        }
        return isString(body) ? JSON.parse(body) : body;
    };
    /**
     *
     * Create a requests to load routes
     *
     * @param {?} routeName
     * @return {?}
     */
    HttpMockInterceptor.prototype.makeReq = /**
     *
     * Create a requests to load routes
     *
     * @param {?} routeName
     * @return {?}
     */
    function (routeName) {
        var /** @type {?} */ assetFolder = this.appConfig.get(AppConfig.AssetFolder);
        var /** @type {?} */ path = this.appConfig.get(AppConfig.ConnectionMockServerPath);
        return new HttpRequest('GET', "" + assetFolder + path + "/" + routeName + ".json", {
            responseType: 'json'
        });
    };
    /**
     *
     * When we are creating a response we always expect two things:
     * 1) We are dealing with Entity
     * 2) REST API is handled using Resource which prepend /mocked/
     *
     * @param {?} req
     * @return {?}
     */
    HttpMockInterceptor.prototype.makeRes = /**
     *
     * When we are creating a response we always expect two things:
     * 1) We are dealing with Entity
     * 2) REST API is handled using Resource which prepend /mocked/
     *
     * @param {?} req
     * @return {?}
     */
    function (req) {
        var /** @type {?} */ responseOp;
        var /** @type {?} */ path = req.urlWithParams.substring(req.url.indexOf('mocked') + 6);
        var /** @type {?} */ resource = path.substring(1);
        if (resource.indexOf('/') !== -1) {
            resource = resource.substring(0, resource.indexOf('/'));
        }
        if (this.routesByEntity.has(resource)) {
            responseOp = this.doHandleRequest(req, path, resource);
        }
        if (isBlank(responseOp) && this.appConfig.getBoolean(AppConfig.InTest)) {
            return new HttpResponse({
                body: {}, status: 404, statusText: 'Not Found',
                url: req.urlWithParams
            });
        }
        return responseOp;
    };
    /**
     *
     * This will get the content from the routes -> route as it as and return it as a
     * response
     *
     * @param {?} req
     * @param {?} path
     * @param {?} resource
     * @return {?}
     */
    HttpMockInterceptor.prototype.doHandleRequest = /**
     *
     * This will get the content from the routes -> route as it as and return it as a
     * response
     *
     * @param {?} req
     * @param {?} path
     * @param {?} resource
     * @return {?}
     */
    function (req, path, resource) {
        var /** @type {?} */ routes = this.routesByEntity.get(resource);
        var /** @type {?} */ matchedRoute = routes.findIndex(function (el) {
            return req.method.toLowerCase() === el.method.toLowerCase() && el.path === path;
        });
        if (matchedRoute !== -1) {
            var /** @type {?} */ route = routes[matchedRoute];
            var /** @type {?} */ payload = {
                payload: route.data
            };
            return new HttpResponse({
                body: payload,
                status: route.responseCode,
                statusText: route.responseText,
                url: route.path
            });
        }
        return null;
    };
    HttpMockInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HttpMockInterceptor.ctorParameters = function () { return [
        { type: AppConfig }
    ]; };
    return HttpMockInterceptor;
}());
export { HttpMockInterceptor };
function HttpMockInterceptor_tsickle_Closure_declarations() {
    /**
     * Stores loaded routes by given entity name.
     *
     * @type {?}
     */
    HttpMockInterceptor.prototype.routesByEntity;
    /** @type {?} */
    HttpMockInterceptor.prototype.appConfig;
}
/**
 * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
 */
var /**
 * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
 */
MockInterceptorHandler = /** @class */ (function () {
    function MockInterceptorHandler(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    MockInterceptorHandler.prototype.handle = /**
     * @param {?} req
     * @return {?}
     */
    function (req) {
        return this.interceptor.intercept(req, this.next);
    };
    return MockInterceptorHandler;
}());
/**
 * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
 */
export { MockInterceptorHandler };
function MockInterceptorHandler_tsickle_Closure_declarations() {
    /** @type {?} */
    MockInterceptorHandler.prototype.next;
    /** @type {?} */
    MockInterceptorHandler.prototype.interceptor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1tb2NrLWludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbImh0dHAvaHR0cC1tb2NrLWludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxpQkFBaUIsRUFJakIsV0FBVyxFQUNYLFlBQVksRUFDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsSUFBSSxvQkFBb0IsRUFBRSxFQUFFLElBQUksWUFBWSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBRXhGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0N2RCw2QkFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVzs7Ozs7OEJBSEcsSUFBSSxHQUFHLEVBQXVCO0tBT3hFO0lBR0Q7Ozs7OztPQU1HOzs7Ozs7Ozs7OztJQUNILHVDQUFTOzs7Ozs7Ozs7O0lBQVQsVUFBVSxHQUFxQixFQUFFLElBQWlCO1FBRzlDLHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLENBQUMsWUFBWSxtQkFBb0IsVUFBVSxFQUFDLENBQUM7YUFDdEQ7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFD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Q0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckQ7aUNBaFFMO0lBaVFDLENBQUE7Ozs7QUFWRCxrQ0FVQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBIdHRwRXJyb3JSZXNwb25zZSxcbiAgICBIdHRwRXZlbnQsXG4gICAgSHR0cEhhbmRsZXIsXG4gICAgSHR0cEludGVyY2VwdG9yLFxuICAgIEh0dHBSZXF1ZXN0LFxuICAgIEh0dHBSZXNwb25zZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0aHJvd0Vycm9yIGFzIG9ic2VydmFibGVUaHJvd0Vycm9yLCBvZiBhcyBvYnNlcnZhYmxlT2YsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIGlzU3RyaW5nfSBmcm9tICcuLi91dGlscy9sYW5nJztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uL2RvbWFpbi9yZXNvdXJjZS5zZXJ2aWNlJztcblxuXG4vKipcbiAqIFR5cGVkIGludGVyZmFjZWQgdG8gcHJvY2VzcyBlYXNpZXIgcm91dGVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTW9ja1JvdXRlc1xue1xuICAgIHJlc291cmNlOiBzdHJpbmc7XG4gICAgcm91dGVzOiBNb2NrUm91dGVbXTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTW9ja1JvdXRlXG57XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIG1ldGhvZDogc3RyaW5nO1xuICAgIHJlc3BvbnNlQ29kZTogbnVtYmVyO1xuICAgIHJlc3BvbnNlVGV4dDogc3RyaW5nO1xuICAgIGRhdGE6IGFueSB8IG51bGw7XG59XG5cbi8qKlxuICogSW50ZXJjZXB0b3IgcHJvdmlkaW5nIE1vY2sgU2VydmVyIGZ1bmN0aW9uYWxpdHkgYW5kIGlzIGluc2VydGVkIG9ubHkgYW5kIGlmIG1vY2sgc2VydmVyIGlzXG4gKiBlbmFibGVkIHVzaW5nIEFwcENvbmZpZydzIGNvbm5lY3Rpb24ubW9jay1zZXJ2ZXIuZW5hYmxlZCBib290c3RyYXAgcHJvcGVydHlcbiAqXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cE1vY2tJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvclxue1xuXG4gICAgLyoqXG4gICAgICogU3RvcmVzIGxvYWRlZCByb3V0ZXMgYnkgZ2l2ZW4gZW50aXR5IG5hbWUuXG4gICAgICpcbiAgICAgKi9cbiAgICByb3V0ZXNCeUVudGl0eTogTWFwPHN0cmluZywgTW9ja1JvdXRlW10+ID0gbmV3IE1hcDxzdHJpbmcsIE1vY2tSb3V0ZVtdPigpO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcENvbmZpZzogQXBwQ29uZmlnKVxuICAgIHtcblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElmIHJvdXRlIGlzIGZvdW5kIHJldHVybmVkIE1vY2sgcmVzdWxlZCBkZWZpbmVkIGluIHRoZSBKU09OIGZpbGVzLCBvdGhlcndpc2UgcGFzc1xuICAgICAqIHRoZSByZXF1ZXN0IHRvIHRoZSBuZXh0IGludGVyY2VwdG9yLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+XG4gICAge1xuXG4gICAgICAgIGxldCBtb2NrZWRSZXNwID0gdGhpcy5tYWtlUmVzKHJlcSk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudChtb2NrZWRSZXNwKSkge1xuXG4gICAgICAgICAgICBpZiAobW9ja2VkUmVzcC5zdGF0dXMgPj0gMjAwICYmIG1vY2tlZFJlc3Auc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZig8SHR0cFJlc3BvbnNlPGFueT4+bW9ja2VkUmVzcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBlcnJyb3IgPSBuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbW9ja2VkUmVzcC5ib2R5LFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IG1vY2tlZFJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBtb2NrZWRSZXNwLnN0YXR1c1RleHQsXG4gICAgICAgICAgICAgICAgICAgIHVybDogcmVxLnVybFdpdGhQYXJhbXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlVGhyb3dFcnJvcihlcnJyb3IpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEJhc2VkIG9uIHVzZXIgY29uZmlndXJhdGlvbiB3ZSBsb2FkIGFsbCB0aGUgYXZhaWxhYmxlIHJvdXRlcyBhbmQgcmVnaXN0ZXIgdGhlbSBpbnRvXG4gICAgICogYHRoaXMucm91dGVzQnlFbnRpdHlgXG4gICAgICpcbiAgICAgKi9cbiAgICBsb2FkUm91dGVzKClcbiAgICB7XG4gICAgICAgIGxldCByb3V0ZXM6IHN0cmluZ1tdID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5Db25uZWN0aW9uTW9ja1NlcnZlclJvdXRlcyk7XG4gICAgICAgIGZvciAobGV0IHJvdXRlTmFtZSBvZiByb3V0ZXMpIHtcbiAgICAgICAgICAgIGxldCByZXE6IEh0dHBSZXF1ZXN0PGFueT4gPSB0aGlzLm1ha2VSZXEocm91dGVOYW1lKTtcblxuICAgICAgICAgICAgLy8gbGV0J3MgbWFrZSBxdWljayBhbmQgZGlydHkgYXN5bmMgY2FsbCB0byBsb2FkIG91ciByb3V0ZXMgYmVmb3JlIGFueXRoaW5nIGVsc2VcbiAgICAgICAgICAgIGxldCBtb2NrZWQ6IE1vY2tSb3V0ZXMgPSB0aGlzLnJlcXVlc3RGb3JSb3V0ZXMocmVxKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVzQnlFbnRpdHkuc2V0KG1vY2tlZC5yZXNvdXJjZSwgbW9ja2VkLnJvdXRlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0dXJucyBjb25maWd1cmF0aW9uIGJhc2VkIG9uIG1vY2sgSlNPTiBmaWxlcy5cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVxdWVzdEZvclJvdXRlcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBNb2NrUm91dGVzXG4gICAge1xuXG4gICAgICAgIGxldCB4bWxIdHRwUmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblxuICAgICAgICB4bWxIdHRwUmVxLm9wZW4ocmVxLm1ldGhvZCwgcmVxLnVybFdpdGhQYXJhbXMsIGZhbHNlKTtcblxuICAgICAgICByZXEuaGVhZGVycy5rZXlzKCkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBhbGwgPSByZXEuaGVhZGVycy5nZXRBbGwoa2V5KTtcbiAgICAgICAgICAgIHhtbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCBhbGwuam9pbignLCcpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHhtbEh0dHBSZXEuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicpO1xuICAgICAgICB4bWxIdHRwUmVxLnNlbmQobnVsbCk7XG5cblxuICAgICAgICBsZXQgYm9keSA9IGlzQmxhbmsoeG1sSHR0cFJlcS5yZXNwb25zZSkgPyB4bWxIdHRwUmVxLnJlc3BvbnNlVGV4dCA6XG4gICAgICAgICAgICB4bWxIdHRwUmVxLnJlc3BvbnNlO1xuXG4gICAgICAgIGlmICh4bWxIdHRwUmVxLnN0YXR1cyA8IDIwMCAmJiB4bWxIdHRwUmVxLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgTW9jayBzZXJ2ZXIgY29uZmlndXJhdGlvbi4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHlvdScgK1xuICAgICAgICAgICAgICAgICcgaGF2ZSBhIG1vY2stcm91dGluZy8gZm9sZGVyIHVuZGVyIHlvdXIgYXNzZXRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXNTdHJpbmcoYm9keSkgPyBKU09OLnBhcnNlKGJvZHkpIDogYm9keTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ3JlYXRlIGEgcmVxdWVzdHMgdG8gbG9hZCByb3V0ZXNcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZVJlcShyb3V0ZU5hbWU6IHN0cmluZyk6IEh0dHBSZXF1ZXN0PGFueT5cbiAgICB7XG4gICAgICAgIGxldCBhc3NldEZvbGRlcjogc3RyaW5nID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlcik7XG4gICAgICAgIGxldCBwYXRoOiBzdHJpbmcgPSB0aGlzLmFwcENvbmZpZy5nZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25Nb2NrU2VydmVyUGF0aCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdCgnR0VUJywgYCR7YXNzZXRGb2xkZXJ9JHtwYXRofS8ke3JvdXRlTmFtZX0uanNvbmAsIHtcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBXaGVuIHdlIGFyZSBjcmVhdGluZyBhIHJlc3BvbnNlIHdlIGFsd2F5cyBleHBlY3QgdHdvIHRoaW5nczpcbiAgICAgKiAxKSBXZSBhcmUgZGVhbGluZyB3aXRoIEVudGl0eVxuICAgICAqIDIpIFJFU1QgQVBJIGlzIGhhbmRsZWQgdXNpbmcgUmVzb3VyY2Ugd2hpY2ggcHJlcGVuZCAvbW9ja2VkL1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBtYWtlUmVzKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IEh0dHBSZXNwb25zZTxhbnk+XG4gICAge1xuICAgICAgICBsZXQgcmVzcG9uc2VPcDogSHR0cFJlc3BvbnNlPGFueT47XG5cbiAgICAgICAgbGV0IHBhdGggPSByZXEudXJsV2l0aFBhcmFtcy5zdWJzdHJpbmcocmVxLnVybC5pbmRleE9mKCdtb2NrZWQnKSArIDYpO1xuICAgICAgICBsZXQgcmVzb3VyY2UgPSBwYXRoLnN1YnN0cmluZygxKTtcbiAgICAgICAgaWYgKHJlc291cmNlLmluZGV4T2YoJy8nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJlc291cmNlID0gcmVzb3VyY2Uuc3Vic3RyaW5nKDAsIHJlc291cmNlLmluZGV4T2YoJy8nKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3V0ZXNCeUVudGl0eS5oYXMocmVzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXNwb25zZU9wID0gdGhpcy5kb0hhbmRsZVJlcXVlc3QocmVxLCBwYXRoLCByZXNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNCbGFuayhyZXNwb25zZU9wKSAmJiB0aGlzLmFwcENvbmZpZy5nZXRCb29sZWFuKEFwcENvbmZpZy5JblRlc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgYm9keToge30sIHN0YXR1czogNDA0LCBzdGF0dXNUZXh0OiAnTm90IEZvdW5kJyxcbiAgICAgICAgICAgICAgICB1cmw6IHJlcS51cmxXaXRoUGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VPcDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVGhpcyB3aWxsIGdldCB0aGUgY29udGVudCBmcm9tIHRoZSByb3V0ZXMgLT4gcm91dGUgYXMgaXQgYXMgYW5kIHJldHVybiBpdCBhcyBhXG4gICAgICogcmVzcG9uc2VcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgZG9IYW5kbGVSZXF1ZXN0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgcGF0aDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlOiBzdHJpbmcpOiBIdHRwUmVzcG9uc2U8YW55PlxuICAgIHtcbiAgICAgICAgbGV0IHJvdXRlczogTW9ja1JvdXRlW10gPSB0aGlzLnJvdXRlc0J5RW50aXR5LmdldChyZXNvdXJjZSk7XG5cbiAgICAgICAgbGV0IG1hdGNoZWRSb3V0ZSA9IHJvdXRlcy5maW5kSW5kZXgoKGVsOiBNb2NrUm91dGUpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiByZXEubWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09IGVsLm1ldGhvZC50b0xvd2VyQ2FzZSgpICYmIGVsLnBhdGggPT09IHBhdGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtYXRjaGVkUm91dGUgIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgcm91dGU6IE1vY2tSb3V0ZSA9IHJvdXRlc1ttYXRjaGVkUm91dGVdO1xuXG4gICAgICAgICAgICBsZXQgcGF5bG9hZDogUmVzcG9uc2U8YW55PiA9IHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiAgcm91dGUuZGF0YVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVzcG9uc2U8UmVzcG9uc2U8YW55Pj4oe1xuICAgICAgICAgICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiByb3V0ZS5yZXNwb25zZUNvZGUsXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogcm91dGUucmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgICAgIHVybDogcm91dGUucGF0aFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBIdHRwSGFuZGxlciBzbyB3ZSBjYW4gaGF2ZSBjdXN0b20gYmVoYXZpb3IgdG8gSFRUUENsaWVudFxuICovXG5leHBvcnQgY2xhc3MgTW9ja0ludGVyY2VwdG9ySGFuZGxlciBpbXBsZW1lbnRzIEh0dHBIYW5kbGVyXG57XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZXh0OiBIdHRwSGFuZGxlciwgcHJpdmF0ZSBpbnRlcmNlcHRvcjogSHR0cEludGVyY2VwdG9yKVxuICAgIHtcbiAgICB9XG5cbiAgICBoYW5kbGUocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVyY2VwdG9yLmludGVyY2VwdChyZXEsIHRoaXMubmV4dCk7XG4gICAgfVxufVxuIl19