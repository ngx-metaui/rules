import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { HttpBackend, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AppConfig } from './config/app-config';
import { HttpMockInterceptor } from './http/http-mock-interceptor';
export declare const UserConfig: InjectionToken<string>;
/**
 * Core mode includes all shared logic accross whole application
 */
export declare class AribaCoreModule {
    private conf;
    static forRoot(config?: {
        [key: string]: any;
    }): ModuleWithProviders;
    constructor(parentModule: AribaCoreModule, conf: AppConfig);
}
/**
 *
 * Add custom Mock functionality only and if we enabled this in the settings. I dont really want to
 * have NoopIntercepter in the chain
 *
 */
export declare function makeHttpClientHandler(ngBackend: HttpBackend, config: AppConfig, mockInterceptor: HttpMockInterceptor, interceptors?: HttpInterceptor[] | null): HttpHandler;
