/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
/** @type {?} */
MockRoutes.prototype.resource;
/** @type {?} */
MockRoutes.prototype.routes;
/**
 * @record
 */
export function MockRoute() { }
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
        /** @type {?} */
        var mockedResp = this.makeRes(req);
        if (isPresent(mockedResp)) {
            if (mockedResp.status >= 200 && mockedResp.status < 300) {
                return observableOf(/** @type {?} */ (mockedResp));
            }
            else {
                /** @type {?} */
                var errror = new HttpErrorResponse({
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
        /** @type {?} */
        var routes = this.appConfig.get(AppConfig.ConnectionMockServerRoutes);
        try {
            for (var routes_1 = tslib_1.__values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                var routeName = routes_1_1.value;
                /** @type {?} */
                var req = this.makeReq(routeName);
                /** @type {?} */
                var mocked = this.requestForRoutes(req);
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
        /** @type {?} */
        var xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open(req.method, req.urlWithParams, false);
        req.headers.keys().forEach(function (key) {
            /** @type {?} */
            var all = req.headers.getAll(key);
            xmlHttpReq.setRequestHeader(name, all.join(','));
        });
        xmlHttpReq.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xmlHttpReq.send(null);
        /** @type {?} */
        var body = isBlank(xmlHttpReq.response) ? xmlHttpReq.responseText :
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
        /** @type {?} */
        var assetFolder = this.appConfig.get(AppConfig.AssetFolder);
        /** @type {?} */
        var path = this.appConfig.get(AppConfig.ConnectionMockServerPath);
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
        /** @type {?} */
        var responseOp;
        /** @type {?} */
        var path = req.urlWithParams.substring(req.url.indexOf('mocked') + 6);
        /** @type {?} */
        var resource = path.substring(1);
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
        /** @type {?} */
        var routes = this.routesByEntity.get(resource);
        /** @type {?} */
        var matchedRoute = routes.findIndex(function (el) {
            return req.method.toLowerCase() === el.method.toLowerCase() && el.path === path;
        });
        if (matchedRoute !== -1) {
            /** @type {?} */
            var route = routes[matchedRoute];
            /** @type {?} */
            var payload = {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpMockInterceptor.ctorParameters = function () { return [
        { type: AppConfig }
    ]; };
    return HttpMockInterceptor;
}());
export { HttpMockInterceptor };
if (false) {
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
if (false) {
    /** @type {?} */
    MockInterceptorHandler.prototype.next;
    /** @type {?} */
    MockInterceptorHandler.prototype.interceptor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1tb2NrLWludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbImh0dHAvaHR0cC1tb2NrLWludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBb0JBLE9BQU8sRUFDSCxpQkFBaUIsRUFJakIsV0FBVyxFQUNYLFlBQVksRUFDZixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsSUFBSSxvQkFBb0IsRUFBRSxFQUFFLElBQUksWUFBWSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBRXhGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzQ3ZELDZCQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXOzs7Ozs4QkFIRyxJQUFJLEdBQUcsRUFBdUI7S0FPeEU7SUFHRDs7Ozs7O09BTUc7Ozs7Ozs7Ozs7O0lBQ0gsdUNBQVM7Ozs7Ozs7Ozs7SUFBVCxVQUFVLEdBQXFCLEVBQUUsSUFBaUI7O1FBRzlDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4QixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sQ0FBQyxZQUFZLG1CQUFvQixVQUFVLEVBQUMsQ0FBQzthQUN0RDtZQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDSixJ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V0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JEO2lDQWhRTDtJQWlRQyxDQUFBOzs7O0FBVkQsa0NBVUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgSHR0cEVycm9yUmVzcG9uc2UsXG4gICAgSHR0cEV2ZW50LFxuICAgIEh0dHBIYW5kbGVyLFxuICAgIEh0dHBJbnRlcmNlcHRvcixcbiAgICBIdHRwUmVxdWVzdCxcbiAgICBIdHRwUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvciwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4uL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBpc1N0cmluZ30gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi9kb21haW4vcmVzb3VyY2Uuc2VydmljZSc7XG5cblxuLyoqXG4gKiBUeXBlZCBpbnRlcmZhY2VkIHRvIHByb2Nlc3MgZWFzaWVyIHJvdXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tSb3V0ZXNcbntcbiAgICByZXNvdXJjZTogc3RyaW5nO1xuICAgIHJvdXRlczogTW9ja1JvdXRlW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1vY2tSb3V0ZVxue1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICByZXNwb25zZUNvZGU6IG51bWJlcjtcbiAgICByZXNwb25zZVRleHQ6IHN0cmluZztcbiAgICBkYXRhOiBhbnkgfCBudWxsO1xufVxuXG4vKipcbiAqIEludGVyY2VwdG9yIHByb3ZpZGluZyBNb2NrIFNlcnZlciBmdW5jdGlvbmFsaXR5IGFuZCBpcyBpbnNlcnRlZCBvbmx5IGFuZCBpZiBtb2NrIHNlcnZlciBpc1xuICogZW5hYmxlZCB1c2luZyBBcHBDb25maWcncyBjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQgYm9vdHN0cmFwIHByb3BlcnR5XG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBNb2NrSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3JcbntcblxuICAgIC8qKlxuICAgICAqIFN0b3JlcyBsb2FkZWQgcm91dGVzIGJ5IGdpdmVuIGVudGl0eSBuYW1lLlxuICAgICAqXG4gICAgICovXG4gICAgcm91dGVzQnlFbnRpdHk6IE1hcDxzdHJpbmcsIE1vY2tSb3V0ZVtdPiA9IG5ldyBNYXA8c3RyaW5nLCBNb2NrUm91dGVbXT4oKTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBDb25maWc6IEFwcENvbmZpZylcbiAgICB7XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZiByb3V0ZSBpcyBmb3VuZCByZXR1cm5lZCBNb2NrIHJlc3VsZWQgZGVmaW5lZCBpbiB0aGUgSlNPTiBmaWxlcywgb3RoZXJ3aXNlIHBhc3NcbiAgICAgKiB0aGUgcmVxdWVzdCB0byB0aGUgbmV4dCBpbnRlcmNlcHRvci5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PlxuICAgIHtcblxuICAgICAgICBsZXQgbW9ja2VkUmVzcCA9IHRoaXMubWFrZVJlcyhyZXEpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQobW9ja2VkUmVzcCkpIHtcblxuICAgICAgICAgICAgaWYgKG1vY2tlZFJlc3Auc3RhdHVzID49IDIwMCAmJiBtb2NrZWRSZXNwLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoPEh0dHBSZXNwb25zZTxhbnk+Pm1vY2tlZFJlc3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJycm9yID0gbmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG1vY2tlZFJlc3AuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBtb2NrZWRSZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogbW9ja2VkUmVzcC5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHJlcS51cmxXaXRoUGFyYW1zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJycm9yKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiB1c2VyIGNvbmZpZ3VyYXRpb24gd2UgbG9hZCBhbGwgdGhlIGF2YWlsYWJsZSByb3V0ZXMgYW5kIHJlZ2lzdGVyIHRoZW0gaW50b1xuICAgICAqIGB0aGlzLnJvdXRlc0J5RW50aXR5YFxuICAgICAqXG4gICAgICovXG4gICAgbG9hZFJvdXRlcygpXG4gICAge1xuICAgICAgICBsZXQgcm91dGVzOiBzdHJpbmdbXSA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQ29ubmVjdGlvbk1vY2tTZXJ2ZXJSb3V0ZXMpO1xuICAgICAgICBmb3IgKGxldCByb3V0ZU5hbWUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBsZXQgcmVxOiBIdHRwUmVxdWVzdDxhbnk+ID0gdGhpcy5tYWtlUmVxKHJvdXRlTmFtZSk7XG5cbiAgICAgICAgICAgIC8vIGxldCdzIG1ha2UgcXVpY2sgYW5kIGRpcnR5IGFzeW5jIGNhbGwgdG8gbG9hZCBvdXIgcm91dGVzIGJlZm9yZSBhbnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsZXQgbW9ja2VkOiBNb2NrUm91dGVzID0gdGhpcy5yZXF1ZXN0Rm9yUm91dGVzKHJlcSk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlc0J5RW50aXR5LnNldChtb2NrZWQucmVzb3VyY2UsIG1vY2tlZC5yb3V0ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybnMgY29uZmlndXJhdGlvbiBiYXNlZCBvbiBtb2NrIEpTT04gZmlsZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlcXVlc3RGb3JSb3V0ZXMocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogTW9ja1JvdXRlc1xuICAgIHtcblxuICAgICAgICBsZXQgeG1sSHR0cFJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cbiAgICAgICAgeG1sSHR0cFJlcS5vcGVuKHJlcS5tZXRob2QsIHJlcS51cmxXaXRoUGFyYW1zLCBmYWxzZSk7XG5cbiAgICAgICAgcmVxLmhlYWRlcnMua2V5cygpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgYWxsID0gcmVxLmhlYWRlcnMuZ2V0QWxsKGtleSk7XG4gICAgICAgICAgICB4bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgYWxsLmpvaW4oJywnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB4bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcbiAgICAgICAgeG1sSHR0cFJlcS5zZW5kKG51bGwpO1xuXG5cbiAgICAgICAgbGV0IGJvZHkgPSBpc0JsYW5rKHhtbEh0dHBSZXEucmVzcG9uc2UpID8geG1sSHR0cFJlcS5yZXNwb25zZVRleHQgOlxuICAgICAgICAgICAgeG1sSHR0cFJlcS5yZXNwb25zZTtcblxuICAgICAgICBpZiAoeG1sSHR0cFJlcS5zdGF0dXMgPCAyMDAgJiYgeG1sSHR0cFJlcS5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIE1vY2sgc2VydmVyIGNvbmZpZ3VyYXRpb24uIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB5b3UnICtcbiAgICAgICAgICAgICAgICAnIGhhdmUgYSBtb2NrLXJvdXRpbmcvIGZvbGRlciB1bmRlciB5b3VyIGFzc2V0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nKGJvZHkpID8gSlNPTi5wYXJzZShib2R5KSA6IGJvZHk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENyZWF0ZSBhIHJlcXVlc3RzIHRvIGxvYWQgcm91dGVzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VSZXEocm91dGVOYW1lOiBzdHJpbmcpOiBIdHRwUmVxdWVzdDxhbnk+XG4gICAge1xuICAgICAgICBsZXQgYXNzZXRGb2xkZXI6IHN0cmluZyA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpO1xuICAgICAgICBsZXQgcGF0aDogc3RyaW5nID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5Db25uZWN0aW9uTW9ja1NlcnZlclBhdGgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3QoJ0dFVCcsIGAke2Fzc2V0Rm9sZGVyfSR7cGF0aH0vJHtyb3V0ZU5hbWV9Lmpzb25gLCB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJ1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiB3ZSBhcmUgY3JlYXRpbmcgYSByZXNwb25zZSB3ZSBhbHdheXMgZXhwZWN0IHR3byB0aGluZ3M6XG4gICAgICogMSkgV2UgYXJlIGRlYWxpbmcgd2l0aCBFbnRpdHlcbiAgICAgKiAyKSBSRVNUIEFQSSBpcyBoYW5kbGVkIHVzaW5nIFJlc291cmNlIHdoaWNoIHByZXBlbmQgL21vY2tlZC9cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZVJlcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBIdHRwUmVzcG9uc2U8YW55PlxuICAgIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlT3A6IEh0dHBSZXNwb25zZTxhbnk+O1xuXG4gICAgICAgIGxldCBwYXRoID0gcmVxLnVybFdpdGhQYXJhbXMuc3Vic3RyaW5nKHJlcS51cmwuaW5kZXhPZignbW9ja2VkJykgKyA2KTtcbiAgICAgICAgbGV0IHJlc291cmNlID0gcGF0aC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIGlmIChyZXNvdXJjZS5pbmRleE9mKCcvJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXNvdXJjZSA9IHJlc291cmNlLnN1YnN0cmluZygwLCByZXNvdXJjZS5pbmRleE9mKCcvJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGVzQnlFbnRpdHkuaGFzKHJlc291cmNlKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VPcCA9IHRoaXMuZG9IYW5kbGVSZXF1ZXN0KHJlcSwgcGF0aCwgcmVzb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsocmVzcG9uc2VPcCkgJiYgdGhpcy5hcHBDb25maWcuZ2V0Qm9vbGVhbihBcHBDb25maWcuSW5UZXN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIGJvZHk6IHt9LCBzdGF0dXM6IDQwNCwgc3RhdHVzVGV4dDogJ05vdCBGb3VuZCcsXG4gICAgICAgICAgICAgICAgdXJsOiByZXEudXJsV2l0aFBhcmFtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlT3A7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBnZXQgdGhlIGNvbnRlbnQgZnJvbSB0aGUgcm91dGVzIC0+IHJvdXRlIGFzIGl0IGFzIGFuZCByZXR1cm4gaXQgYXMgYVxuICAgICAqIHJlc3BvbnNlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGRvSGFuZGxlUmVxdWVzdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHBhdGg6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZTogc3RyaW5nKTogSHR0cFJlc3BvbnNlPGFueT5cbiAgICB7XG4gICAgICAgIGxldCByb3V0ZXM6IE1vY2tSb3V0ZVtdID0gdGhpcy5yb3V0ZXNCeUVudGl0eS5nZXQocmVzb3VyY2UpO1xuXG4gICAgICAgIGxldCBtYXRjaGVkUm91dGUgPSByb3V0ZXMuZmluZEluZGV4KChlbDogTW9ja1JvdXRlKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSBlbC5tZXRob2QudG9Mb3dlckNhc2UoKSAmJiBlbC5wYXRoID09PSBwYXRoO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWF0Y2hlZFJvdXRlICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IHJvdXRlOiBNb2NrUm91dGUgPSByb3V0ZXNbbWF0Y2hlZFJvdXRlXTtcblxuICAgICAgICAgICAgbGV0IHBheWxvYWQ6IFJlc3BvbnNlPGFueT4gPSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZDogIHJvdXRlLmRhdGFcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlc3BvbnNlPFJlc3BvbnNlPGFueT4+KHtcbiAgICAgICAgICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcm91dGUucmVzcG9uc2VDb2RlLFxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJvdXRlLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgICAgICB1cmw6IHJvdXRlLnBhdGhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSHR0cEhhbmRsZXIgc28gd2UgY2FuIGhhdmUgY3VzdG9tIGJlaGF2aW9yIHRvIEhUVFBDbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tJbnRlcmNlcHRvckhhbmRsZXIgaW1wbGVtZW50cyBIdHRwSGFuZGxlclxue1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV4dDogSHR0cEhhbmRsZXIsIHByaXZhdGUgaW50ZXJjZXB0b3I6IEh0dHBJbnRlcmNlcHRvcilcbiAgICB7XG4gICAgfVxuXG4gICAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcmNlcHRvci5pbnRlcmNlcHQocmVxLCB0aGlzLm5leHQpO1xuICAgIH1cbn1cbiJdfQ==