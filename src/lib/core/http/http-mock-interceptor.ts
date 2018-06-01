/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {AppConfig} from '../config/app-config';
import {isBlank, isPresent, isString} from '../utils/lang';
import {Response} from '../domain/resource.service';


/**
 * Typed interfaced to process easier routes
 */
export interface MockRoutes
{
    resource: string;
    routes: MockRoute[];
}
export interface MockRoute
{
    path: string;
    method: string;
    responseCode: number;
    responseText: string;
    data: any | null;
}

/**
 * Interceptor providing Mock Server functionality and is inserted only and if mock server is
 * enabled using AppConfig's connection.mock-server.enabled bootstrap property
 *
 *
 */
@Injectable()
export class HttpMockInterceptor implements HttpInterceptor
{

    /**
     * Stores loaded routes by given entity name.
     *
     */
    routesByEntity: Map<string, MockRoute[]> = new Map<string, MockRoute[]>();


    constructor(private appConfig: AppConfig)
    {


    }


    /**
     *
     * If route is found returned Mock resuled defined in the JSON files, otherwise pass
     * the request to the next interceptor.
     *
     *
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {

        let mockedResp = this.makeRes(req);

        if (isPresent(mockedResp)) {

            if (mockedResp.status >= 200 && mockedResp.status < 300) {
                return Observable.of(<HttpResponse<any>>mockedResp);
            } else {
                let errror = new HttpErrorResponse({
                    error: mockedResp.body,
                    status: mockedResp.status,
                    statusText: mockedResp.statusText,
                    url: req.urlWithParams
                });
                Observable.throw(errror);
            }


        }
        return next.handle(req);
    }


    /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     */
    loadRoutes()
    {
        let routes: string[] = this.appConfig.get(AppConfig.ConnectionMockServerRoutes);
        for (let routeName of routes) {
            let req: HttpRequest<any> = this.makeReq(routeName);

            // let's make quick and dirty async call to load our routes before anything else
            let mocked: MockRoutes = this.requestForRoutes(req);
            this.routesByEntity.set(mocked.resource, mocked.routes);
        }
    }


    /**
     *
     * Returns configuration based on mock JSON files.
     *
     */
    private requestForRoutes(req: HttpRequest<any>): MockRoutes
    {

        let xmlHttpReq = new XMLHttpRequest();


        xmlHttpReq.open(req.method, req.urlWithParams, false);

        req.headers.keys().forEach((key: string) =>
        {
            let all = req.headers.getAll(key);
            xmlHttpReq.setRequestHeader(name, all.join(','));
        });
        xmlHttpReq.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xmlHttpReq.send(null);


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
     */
    private makeReq(routeName: string): HttpRequest<any>
    {
        let assetFolder: string = this.appConfig.get(AppConfig.AssetFolder);
        let path: string = this.appConfig.get(AppConfig.ConnectionMockServerPath);

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
     */
    private makeRes(req: HttpRequest<any>): HttpResponse<any>
    {
        let responseOp: HttpResponse<any>;

        let path = req.urlWithParams.substring(req.url.indexOf('mocked') + 6);
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
     */
    private doHandleRequest(req: HttpRequest<any>, path: string,
                            resource: string): HttpResponse<any>
    {
        let routes: MockRoute[] = this.routesByEntity.get(resource);

        let matchedRoute = routes.findIndex((el: MockRoute) =>
        {
            return req.method.toLowerCase() === el.method.toLowerCase() && el.path === path;
        });

        if (matchedRoute !== -1) {
            let route: MockRoute = routes[matchedRoute];

            let payload: Response<any> = {
                payload:  route.data
            };

            return new HttpResponse<Response<any>>({
                body: payload,
                status: route.responseCode,
                statusText: route.responseText,
                url: route.path
            });

        }
        return null;
    }
}


/**
 * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
 */
export class MockInterceptorHandler implements HttpHandler
{
    constructor(private next: HttpHandler, private interceptor: HttpInterceptor)
    {
    }

    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>
    {
        return this.interceptor.intercept(req, this.next);
    }
}
