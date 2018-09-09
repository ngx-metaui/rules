/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class HttpMockInterceptor {
    /**
     * @param {?} appConfig
     */
    constructor(appConfig) {
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
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        /** @type {?} */
        let mockedResp = this.makeRes(req);
        if (isPresent(mockedResp)) {
            if (mockedResp.status >= 200 && mockedResp.status < 300) {
                return observableOf(/** @type {?} */ (mockedResp));
            }
            else {
                /** @type {?} */
                let errror = new HttpErrorResponse({
                    error: mockedResp.body,
                    status: mockedResp.status,
                    statusText: mockedResp.statusText,
                    url: req.urlWithParams
                });
                observableThrowError(errror);
            }
        }
        return next.handle(req);
    }
    /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     * @return {?}
     */
    loadRoutes() {
        /** @type {?} */
        let routes = this.appConfig.get(AppConfig.ConnectionMockServerRoutes);
        for (let routeName of routes) {
            /** @type {?} */
            let req = this.makeReq(routeName);
            /** @type {?} */
            let mocked = this.requestForRoutes(req);
            this.routesByEntity.set(mocked.resource, mocked.routes);
        }
    }
    /**
     *
     * Returns configuration based on mock JSON files.
     *
     * @param {?} req
     * @return {?}
     */
    requestForRoutes(req) {
        /** @type {?} */
        let xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open(req.method, req.urlWithParams, false);
        req.headers.keys().forEach((key) => {
            /** @type {?} */
            let all = req.headers.getAll(key);
            xmlHttpReq.setRequestHeader(name, all.join(','));
        });
        xmlHttpReq.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xmlHttpReq.send(null);
        /** @type {?} */
        let body = isBlank(xmlHttpReq.response) ? xmlHttpReq.responseText :
            xmlHttpReq.response;
        if (xmlHttpReq.status < 200 && xmlHttpReq.status >= 300) {
            throw new Error('Cannot load Mock server configuration. Please make sure that you' +
                ' have a mock-routing/ folder under your assets');
        }
        return isString(body) ? JSON.parse(body) : body;
    }
    /**
     *
     * Create a requests to load routes
     *
     * @param {?} routeName
     * @return {?}
     */
    makeReq(routeName) {
        /** @type {?} */
        let assetFolder = this.appConfig.get(AppConfig.AssetFolder);
        /** @type {?} */
        let path = this.appConfig.get(AppConfig.ConnectionMockServerPath);
        return new HttpRequest('GET', `${assetFolder}${path}/${routeName}.json`, {
            responseType: 'json'
        });
    }
    /**
     *
     * When we are creating a response we always expect two things:
     * 1) We are dealing with Entity
     * 2) REST API is handled using Resource which prepend /mocked/
     *
     * @param {?} req
     * @return {?}
     */
    makeRes(req) {
        /** @type {?} */
        let responseOp;
        /** @type {?} */
        let path = req.urlWithParams.substring(req.url.indexOf('mocked') + 6);
        /** @type {?} */
        let resource = path.substring(1);
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
    }
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
    doHandleRequest(req, path, resource) {
        /** @type {?} */
        let routes = this.routesByEntity.get(resource);
        /** @type {?} */
        let matchedRoute = routes.findIndex((el) => {
            return req.method.toLowerCase() === el.method.toLowerCase() && el.path === path;
        });
        if (matchedRoute !== -1) {
            /** @type {?} */
            let route = routes[matchedRoute];
            /** @type {?} */
            let payload = {
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
    }
}
HttpMockInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpMockInterceptor.ctorParameters = () => [
    { type: AppConfig }
];
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
export class MockInterceptorHandler {
    /**
     * @param {?} next
     * @param {?} interceptor
     */
    constructor(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    handle(req) {
        return this.interceptor.intercept(req, this.next);
    }
}
if (false) {
    /** @type {?} */
    MockInterceptorHandler.prototype.next;
    /** @type {?} */
    MockInterceptorHandler.prototype.interceptor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1tb2NrLWludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29yZS8iLCJzb3VyY2VzIjpbImh0dHAvaHR0cC1tb2NrLWludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUNILGlCQUFpQixFQUlqQixXQUFXLEVBQ1gsWUFBWSxFQUNmLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxJQUFJLG9CQUFvQixFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFFeEYsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEIzRCxNQUFNOzs7O0lBVUYsWUFBb0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVzs7Ozs7OEJBSEcsSUFBSSxHQUFHLEVBQXVCO0tBT3hFOzs7Ozs7Ozs7OztJQVVELFNBQVMsQ0FBQyxHQUFxQixFQUFFLElBQWlCOztRQUc5QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLENBQUMsWUFBWSxtQkFBb0IsVUFBVSxFQUFDLENBQUM7YUFDdEQ7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ0osSUFBSSxNQUFNLEdBQUcsSUFBSSxp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IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgSHR0cEVycm9yUmVzcG9uc2UsXG4gICAgSHR0cEV2ZW50LFxuICAgIEh0dHBIYW5kbGVyLFxuICAgIEh0dHBJbnRlcmNlcHRvcixcbiAgICBIdHRwUmVxdWVzdCxcbiAgICBIdHRwUmVzcG9uc2Vcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvciwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4uL2NvbmZpZy9hcHAtY29uZmlnJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBpc1N0cmluZ30gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi9kb21haW4vcmVzb3VyY2Uuc2VydmljZSc7XG5cblxuLyoqXG4gKiBUeXBlZCBpbnRlcmZhY2VkIHRvIHByb2Nlc3MgZWFzaWVyIHJvdXRlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tSb3V0ZXNcbntcbiAgICByZXNvdXJjZTogc3RyaW5nO1xuICAgIHJvdXRlczogTW9ja1JvdXRlW107XG59XG5leHBvcnQgaW50ZXJmYWNlIE1vY2tSb3V0ZVxue1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBtZXRob2Q6IHN0cmluZztcbiAgICByZXNwb25zZUNvZGU6IG51bWJlcjtcbiAgICByZXNwb25zZVRleHQ6IHN0cmluZztcbiAgICBkYXRhOiBhbnkgfCBudWxsO1xufVxuXG4vKipcbiAqIEludGVyY2VwdG9yIHByb3ZpZGluZyBNb2NrIFNlcnZlciBmdW5jdGlvbmFsaXR5IGFuZCBpcyBpbnNlcnRlZCBvbmx5IGFuZCBpZiBtb2NrIHNlcnZlciBpc1xuICogZW5hYmxlZCB1c2luZyBBcHBDb25maWcncyBjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQgYm9vdHN0cmFwIHByb3BlcnR5XG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBNb2NrSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3JcbntcblxuICAgIC8qKlxuICAgICAqIFN0b3JlcyBsb2FkZWQgcm91dGVzIGJ5IGdpdmVuIGVudGl0eSBuYW1lLlxuICAgICAqXG4gICAgICovXG4gICAgcm91dGVzQnlFbnRpdHk6IE1hcDxzdHJpbmcsIE1vY2tSb3V0ZVtdPiA9IG5ldyBNYXA8c3RyaW5nLCBNb2NrUm91dGVbXT4oKTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBDb25maWc6IEFwcENvbmZpZylcbiAgICB7XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJZiByb3V0ZSBpcyBmb3VuZCByZXR1cm5lZCBNb2NrIHJlc3VsZWQgZGVmaW5lZCBpbiB0aGUgSlNPTiBmaWxlcywgb3RoZXJ3aXNlIHBhc3NcbiAgICAgKiB0aGUgcmVxdWVzdCB0byB0aGUgbmV4dCBpbnRlcmNlcHRvci5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PlxuICAgIHtcblxuICAgICAgICBsZXQgbW9ja2VkUmVzcCA9IHRoaXMubWFrZVJlcyhyZXEpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQobW9ja2VkUmVzcCkpIHtcblxuICAgICAgICAgICAgaWYgKG1vY2tlZFJlc3Auc3RhdHVzID49IDIwMCAmJiBtb2NrZWRSZXNwLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoPEh0dHBSZXNwb25zZTxhbnk+Pm1vY2tlZFJlc3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJycm9yID0gbmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG1vY2tlZFJlc3AuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBtb2NrZWRSZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogbW9ja2VkUmVzcC5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHJlcS51cmxXaXRoUGFyYW1zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZVRocm93RXJyb3IoZXJycm9yKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiB1c2VyIGNvbmZpZ3VyYXRpb24gd2UgbG9hZCBhbGwgdGhlIGF2YWlsYWJsZSByb3V0ZXMgYW5kIHJlZ2lzdGVyIHRoZW0gaW50b1xuICAgICAqIGB0aGlzLnJvdXRlc0J5RW50aXR5YFxuICAgICAqXG4gICAgICovXG4gICAgbG9hZFJvdXRlcygpXG4gICAge1xuICAgICAgICBsZXQgcm91dGVzOiBzdHJpbmdbXSA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQ29ubmVjdGlvbk1vY2tTZXJ2ZXJSb3V0ZXMpO1xuICAgICAgICBmb3IgKGxldCByb3V0ZU5hbWUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBsZXQgcmVxOiBIdHRwUmVxdWVzdDxhbnk+ID0gdGhpcy5tYWtlUmVxKHJvdXRlTmFtZSk7XG5cbiAgICAgICAgICAgIC8vIGxldCdzIG1ha2UgcXVpY2sgYW5kIGRpcnR5IGFzeW5jIGNhbGwgdG8gbG9hZCBvdXIgcm91dGVzIGJlZm9yZSBhbnl0aGluZyBlbHNlXG4gICAgICAgICAgICBsZXQgbW9ja2VkOiBNb2NrUm91dGVzID0gdGhpcy5yZXF1ZXN0Rm9yUm91dGVzKHJlcSk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlc0J5RW50aXR5LnNldChtb2NrZWQucmVzb3VyY2UsIG1vY2tlZC5yb3V0ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHVybnMgY29uZmlndXJhdGlvbiBiYXNlZCBvbiBtb2NrIEpTT04gZmlsZXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlcXVlc3RGb3JSb3V0ZXMocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogTW9ja1JvdXRlc1xuICAgIHtcblxuICAgICAgICBsZXQgeG1sSHR0cFJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cbiAgICAgICAgeG1sSHR0cFJlcS5vcGVuKHJlcS5tZXRob2QsIHJlcS51cmxXaXRoUGFyYW1zLCBmYWxzZSk7XG5cbiAgICAgICAgcmVxLmhlYWRlcnMua2V5cygpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgYWxsID0gcmVxLmhlYWRlcnMuZ2V0QWxsKGtleSk7XG4gICAgICAgICAgICB4bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgYWxsLmpvaW4oJywnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB4bWxIdHRwUmVxLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcbiAgICAgICAgeG1sSHR0cFJlcS5zZW5kKG51bGwpO1xuXG5cbiAgICAgICAgbGV0IGJvZHkgPSBpc0JsYW5rKHhtbEh0dHBSZXEucmVzcG9uc2UpID8geG1sSHR0cFJlcS5yZXNwb25zZVRleHQgOlxuICAgICAgICAgICAgeG1sSHR0cFJlcS5yZXNwb25zZTtcblxuICAgICAgICBpZiAoeG1sSHR0cFJlcS5zdGF0dXMgPCAyMDAgJiYgeG1sSHR0cFJlcS5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIE1vY2sgc2VydmVyIGNvbmZpZ3VyYXRpb24uIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB5b3UnICtcbiAgICAgICAgICAgICAgICAnIGhhdmUgYSBtb2NrLXJvdXRpbmcvIGZvbGRlciB1bmRlciB5b3VyIGFzc2V0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nKGJvZHkpID8gSlNPTi5wYXJzZShib2R5KSA6IGJvZHk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENyZWF0ZSBhIHJlcXVlc3RzIHRvIGxvYWQgcm91dGVzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VSZXEocm91dGVOYW1lOiBzdHJpbmcpOiBIdHRwUmVxdWVzdDxhbnk+XG4gICAge1xuICAgICAgICBsZXQgYXNzZXRGb2xkZXI6IHN0cmluZyA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpO1xuICAgICAgICBsZXQgcGF0aDogc3RyaW5nID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5Db25uZWN0aW9uTW9ja1NlcnZlclBhdGgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgSHR0cFJlcXVlc3QoJ0dFVCcsIGAke2Fzc2V0Rm9sZGVyfSR7cGF0aH0vJHtyb3V0ZU5hbWV9Lmpzb25gLCB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJ1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiB3ZSBhcmUgY3JlYXRpbmcgYSByZXNwb25zZSB3ZSBhbHdheXMgZXhwZWN0IHR3byB0aGluZ3M6XG4gICAgICogMSkgV2UgYXJlIGRlYWxpbmcgd2l0aCBFbnRpdHlcbiAgICAgKiAyKSBSRVNUIEFQSSBpcyBoYW5kbGVkIHVzaW5nIFJlc291cmNlIHdoaWNoIHByZXBlbmQgL21vY2tlZC9cbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZVJlcyhyZXE6IEh0dHBSZXF1ZXN0PGFueT4pOiBIdHRwUmVzcG9uc2U8YW55PlxuICAgIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlT3A6IEh0dHBSZXNwb25zZTxhbnk+O1xuXG4gICAgICAgIGxldCBwYXRoID0gcmVxLnVybFdpdGhQYXJhbXMuc3Vic3RyaW5nKHJlcS51cmwuaW5kZXhPZignbW9ja2VkJykgKyA2KTtcbiAgICAgICAgbGV0IHJlc291cmNlID0gcGF0aC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIGlmIChyZXNvdXJjZS5pbmRleE9mKCcvJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXNvdXJjZSA9IHJlc291cmNlLnN1YnN0cmluZygwLCByZXNvdXJjZS5pbmRleE9mKCcvJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGVzQnlFbnRpdHkuaGFzKHJlc291cmNlKSkge1xuICAgICAgICAgICAgcmVzcG9uc2VPcCA9IHRoaXMuZG9IYW5kbGVSZXF1ZXN0KHJlcSwgcGF0aCwgcmVzb3VyY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQmxhbmsocmVzcG9uc2VPcCkgJiYgdGhpcy5hcHBDb25maWcuZ2V0Qm9vbGVhbihBcHBDb25maWcuSW5UZXN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUmVzcG9uc2Uoe1xuICAgICAgICAgICAgICAgIGJvZHk6IHt9LCBzdGF0dXM6IDQwNCwgc3RhdHVzVGV4dDogJ05vdCBGb3VuZCcsXG4gICAgICAgICAgICAgICAgdXJsOiByZXEudXJsV2l0aFBhcmFtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlT3A7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBnZXQgdGhlIGNvbnRlbnQgZnJvbSB0aGUgcm91dGVzIC0+IHJvdXRlIGFzIGl0IGFzIGFuZCByZXR1cm4gaXQgYXMgYVxuICAgICAqIHJlc3BvbnNlXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGRvSGFuZGxlUmVxdWVzdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIHBhdGg6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZTogc3RyaW5nKTogSHR0cFJlc3BvbnNlPGFueT5cbiAgICB7XG4gICAgICAgIGxldCByb3V0ZXM6IE1vY2tSb3V0ZVtdID0gdGhpcy5yb3V0ZXNCeUVudGl0eS5nZXQocmVzb3VyY2UpO1xuXG4gICAgICAgIGxldCBtYXRjaGVkUm91dGUgPSByb3V0ZXMuZmluZEluZGV4KChlbDogTW9ja1JvdXRlKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSBlbC5tZXRob2QudG9Mb3dlckNhc2UoKSAmJiBlbC5wYXRoID09PSBwYXRoO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWF0Y2hlZFJvdXRlICE9PSAtMSkge1xuICAgICAgICAgICAgbGV0IHJvdXRlOiBNb2NrUm91dGUgPSByb3V0ZXNbbWF0Y2hlZFJvdXRlXTtcblxuICAgICAgICAgICAgbGV0IHBheWxvYWQ6IFJlc3BvbnNlPGFueT4gPSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZDogIHJvdXRlLmRhdGFcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFJlc3BvbnNlPFJlc3BvbnNlPGFueT4+KHtcbiAgICAgICAgICAgICAgICBib2R5OiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgIHN0YXR1czogcm91dGUucmVzcG9uc2VDb2RlLFxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJvdXRlLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgICAgICB1cmw6IHJvdXRlLnBhdGhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5cbi8qKlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSHR0cEhhbmRsZXIgc28gd2UgY2FuIGhhdmUgY3VzdG9tIGJlaGF2aW9yIHRvIEhUVFBDbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tJbnRlcmNlcHRvckhhbmRsZXIgaW1wbGVtZW50cyBIdHRwSGFuZGxlclxue1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV4dDogSHR0cEhhbmRsZXIsIHByaXZhdGUgaW50ZXJjZXB0b3I6IEh0dHBJbnRlcmNlcHRvcilcbiAgICB7XG4gICAgfVxuXG4gICAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcmNlcHRvci5pbnRlcmNlcHQocmVxLCB0aGlzLm5leHQpO1xuICAgIH1cbn1cbiJdfQ==