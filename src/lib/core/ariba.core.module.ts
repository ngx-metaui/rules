/**
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
 */
import {Meta, Title} from '@angular/platform-browser';
import {
    APP_INITIALIZER,
    ErrorHandler,
    Inject,
    InjectionToken,
    Injector,
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpBackend,
    HttpClientModule,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AppConfig, makeConfig} from './config/app-config';
import {Environment} from './config/environment';
import {NotFoundComponent} from './not-found/not-found.component';
import {RoutingService} from './routing/routing.service';
import {GlobalErrorHandler} from './global-error-handler';
import {AribaCoreRoutingModule} from './ariba-core-routing.module';
import {Notifications} from './messaging/notifications.service';
import {HttpMockInterceptor, MockInterceptorHandler} from './http/http-mock-interceptor';
import {Resource} from './domain/resource.service';
import {CommonModule} from '@angular/common';

export const UserConfig = new InjectionToken<string>('UserConfig');


/**
 * Core mode includes all shared logic accross whole application
 */
    // todo: for AOT use exported functions for factories insteads this inline ones.
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AribaCoreRoutingModule
    ],
    declarations: [NotFoundComponent],
    exports: [
        TranslateModule
    ],
    bootstrap: []

})
export class AribaCoreModule
{

    static forRoot(config: { [key: string]: any } = {}): ModuleWithProviders
    {
        return {
            ngModule: AribaCoreModule,
            providers: [
                Title,
                Meta,
                Environment,
                Notifications,
                HttpMockInterceptor,

                Resource,

                {provide: UserConfig, useValue: config},
                {
                    provide: AppConfig, useFactory: makeConfig,
                    deps: [UserConfig, Injector, Environment]
                },
                {
                    provide: HttpHandler,
                    useFactory: makeHttpClientHandler,
                    deps: [
                        HttpBackend, AppConfig, HttpMockInterceptor,
                        [new Optional(), new Inject(HTTP_INTERCEPTORS)]
                    ],
                },

                {provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [Notifications]},
                {provide: RoutingService, useClass: RoutingService, deps: [Router]},

                {
                    provide: APP_INITIALIZER,
                    useFactory: initI18nSupport,
                    deps: [AppConfig],
                    multi: true,
                }
            ]
        };
    }


    constructor(@Optional() @SkipSelf() parentModule: AribaCoreModule)
    {

    }

}

/**
 *
 * Initialize ng2 translate subsystem as all the resource files and translation needs to be
 * resolved before actuall Angular App components are loaded
 *
 */
export function initI18nSupport(appConfig: AppConfig)
{
    return appConfig.initializeI18n.bind(appConfig);
}

/**
 *
 * Add custom Mock functionality only and if we enabled this in the settings. I dont really want to
 * have NoopIntercepter in the chain
 *
 */
export function makeHttpClientHandler(ngBackend: HttpBackend, config: AppConfig,
                                      mockInterceptor: HttpMockInterceptor,
                                      interceptors: HttpInterceptor[] | null = []): HttpHandler
{
    if (config.getBoolean(AppConfig.ConnectionUseMockServer)) {

        mockInterceptor.loadRoutes();
        interceptors = [...interceptors, mockInterceptor];
    }

    if (!interceptors) {
        return ngBackend;
    }
    return interceptors.reduceRight(
        (next, interceptor) => new MockInterceptorHandler(next, interceptor), ngBackend);
}


