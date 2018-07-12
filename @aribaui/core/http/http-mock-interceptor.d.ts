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
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app-config';
/**
 * Typed interfaced to process easier routes
 */
export interface MockRoutes {
    resource: string;
    routes: MockRoute[];
}
export interface MockRoute {
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
export declare class HttpMockInterceptor implements HttpInterceptor {
    private appConfig;
    /**
     * Stores loaded routes by given entity name.
     *
     */
    routesByEntity: Map<string, MockRoute[]>;
    constructor(appConfig: AppConfig);
    /**
     *
     * If route is found returned Mock resuled defined in the JSON files, otherwise pass
     * the request to the next interceptor.
     *
     *
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    /**
     * Based on user configuration we load all the available routes and register them into
     * `this.routesByEntity`
     *
     */
    loadRoutes(): void;
    /**
     *
     * Returns configuration based on mock JSON files.
     *
     */
    private requestForRoutes(req);
    /**
     *
     * Create a requests to load routes
     *
     */
    private makeReq(routeName);
    /**
     *
     * When we are creating a response we always expect two things:
     * 1) We are dealing with Entity
     * 2) REST API is handled using Resource which prepend /mocked/
     *
     */
    private makeRes(req);
    /**
     *
     * This will get the content from the routes -> route as it as and return it as a
     * response
     *
     */
    private doHandleRequest(req, path, resource);
}
/**
 * Default implementation of the HttpHandler so we can have custom behavior to HTTPClient
 */
export declare class MockInterceptorHandler implements HttpHandler {
    private next;
    private interceptor;
    constructor(next: HttpHandler, interceptor: HttpInterceptor);
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
