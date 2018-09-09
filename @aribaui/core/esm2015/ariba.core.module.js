/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Meta, Title } from '@angular/platform-browser';
import { ErrorHandler, Inject, InjectionToken, Injector, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConfig, makeConfig } from './config/app-config';
import { Environment } from './config/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoutingService } from './routing/routing.service';
import { GlobalErrorHandler } from './global-error-handler';
import { AribaCoreRoutingModule } from './ariba-core-routing.module';
import { Notifications } from './messaging/notifications.service';
import { HttpMockInterceptor, MockInterceptorHandler } from './http/http-mock-interceptor';
import { Resource } from './domain/resource.service';
import { CommonModule } from '@angular/common';
/** @type {?} */
export const UserConfig = new InjectionToken('UserConfig');
/**
 * Core mode includes all shared logic accross whole application
 */
export class AribaCoreModule {
    /**
     * @param {?} parentModule
     * @param {?} conf
     */
    constructor(parentModule, conf) {
        this.conf = conf;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: AribaCoreModule,
            providers: [
                Title,
                Meta,
                Environment,
                Notifications,
                HttpMockInterceptor,
                Resource,
                { provide: UserConfig, useValue: config },
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
                { provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [Notifications] },
                { provide: RoutingService, useClass: RoutingService, deps: [Router] }
            ]
        };
    }
}
AribaCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    AribaCoreRoutingModule
                ],
                declarations: [NotFoundComponent],
                bootstrap: []
            },] }
];
/** @nocollapse */
AribaCoreModule.ctorParameters = () => [
    { type: AribaCoreModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: AppConfig }
];
if (false) {
    /** @type {?} */
    AribaCoreModule.prototype.conf;
}
/**
 *
 * Add custom Mock functionality only and if we enabled this in the settings. I dont really want to
 * have NoopIntercepter in the chain
 *
 * @param {?} ngBackend
 * @param {?} config
 * @param {?} mockInterceptor
 * @param {?=} interceptors
 * @return {?}
 */
export function makeHttpClientHandler(ngBackend, config, mockInterceptor, interceptors = []) {
    if (config.getBoolean(AppConfig.ConnectionUseMockServer)) {
        mockInterceptor.loadRoutes();
        interceptors = [...interceptors, mockInterceptor];
    }
    if (!interceptors) {
        return ngBackend;
    }
    return interceptors.reduceRight((next, interceptor) => new MockInterceptorHandler(next, interceptor), ngBackend);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEuY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb3JlLyIsInNvdXJjZXMiOlsiYXJpYmEuY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFFSCxZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEVBRVIsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFFZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3pGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRTdDLGFBQWEsVUFBVSxHQUFHLElBQUksY0FBYyxDQUFTLFlBQVksQ0FBQyxDQUFDOzs7O0FBa0JuRSxNQUFNOzs7OztJQW1DRixZQUFvQyxZQUE2QixFQUFVLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXO0tBRXpGOzs7OztJQW5DRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWlDLEVBQUU7UUFDOUMsTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNQLEtBQUs7Z0JBQ0wsSUFBSTtnQkFDSixXQUFXO2dCQUNYLGFBQWE7Z0JBQ2IsbUJBQW1CO2dCQUVuQixRQUFRO2dCQUVSLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUN2QztvQkFDSSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVO29CQUMxQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQztpQkFDNUM7Z0JBQ0Q7b0JBQ0ksT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLFVBQVUsRUFBRSxxQkFBcUI7b0JBQ2pDLElBQUksRUFBRTt3QkFDRixXQUFXLEVBQUUsU0FBUyxFQUFFLG1CQUFtQjt3QkFDM0MsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7cUJBQ2xEO2lCQUNKO2dCQUVELEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUM7Z0JBQzVFLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFDO2FBQ3RFO1NBQ0osQ0FBQztLQUNMOzs7WUEzQ0osUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsc0JBQXNCO2lCQUN6QjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFFakMsU0FBUyxFQUFFLEVBQUU7YUFFaEI7Ozs7WUFvQ3FELGVBQWUsdUJBQXBELFFBQVEsWUFBSSxRQUFRO1lBaEU3QixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7OztBQTZFakIsTUFBTSxnQ0FBZ0MsU0FBc0IsRUFBRSxNQUFpQixFQUN6QyxlQUFvQyxFQUNwQyxlQUF5QyxFQUFFO0lBQzdFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZELGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixZQUFZLEdBQUcsQ0FBQyxHQUFHLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztLQUNyRDtJQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3BCO0lBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQzNCLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Q0FDeEYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge01ldGEsIFRpdGxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7XG4gICAgQVBQX0lOSVRJQUxJWkVSLFxuICAgIEVycm9ySGFuZGxlcixcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgSW5qZWN0b3IsXG4gICAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgICBOZ01vZHVsZSxcbiAgICBPcHRpb25hbCxcbiAgICBTa2lwU2VsZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgSHR0cEJhY2tlbmQsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBIdHRwSGFuZGxlcixcbiAgICBIdHRwSW50ZXJjZXB0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0FwcENvbmZpZywgbWFrZUNvbmZpZ30gZnJvbSAnLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICcuL2NvbmZpZy9lbnZpcm9ubWVudCc7XG5pbXBvcnQge05vdEZvdW5kQ29tcG9uZW50fSBmcm9tICcuL25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50JztcbmltcG9ydCB7Um91dGluZ1NlcnZpY2V9IGZyb20gJy4vcm91dGluZy9yb3V0aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHtHbG9iYWxFcnJvckhhbmRsZXJ9IGZyb20gJy4vZ2xvYmFsLWVycm9yLWhhbmRsZXInO1xuaW1wb3J0IHtBcmliYUNvcmVSb3V0aW5nTW9kdWxlfSBmcm9tICcuL2FyaWJhLWNvcmUtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zfSBmcm9tICcuL21lc3NhZ2luZy9ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHtIdHRwTW9ja0ludGVyY2VwdG9yLCBNb2NrSW50ZXJjZXB0b3JIYW5kbGVyfSBmcm9tICcuL2h0dHAvaHR0cC1tb2NrLWludGVyY2VwdG9yJztcbmltcG9ydCB7UmVzb3VyY2V9IGZyb20gJy4vZG9tYWluL3Jlc291cmNlLnNlcnZpY2UnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBjb25zdCBVc2VyQ29uZmlnID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1VzZXJDb25maWcnKTtcblxuXG4vKipcbiAqIENvcmUgbW9kZSBpbmNsdWRlcyBhbGwgc2hhcmVkIGxvZ2ljIGFjY3Jvc3Mgd2hvbGUgYXBwbGljYXRpb25cbiAqL1xuICAgIC8vIHRvZG86IGZvciBBT1QgdXNlIGV4cG9ydGVkIGZ1bmN0aW9ucyBmb3IgZmFjdG9yaWVzIGluc3RlYWRzIHRoaXMgaW5saW5lIG9uZXMuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBBcmliYUNvcmVSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtOb3RGb3VuZENvbXBvbmVudF0sXG5cbiAgICBib290c3RyYXA6IFtdXG5cbn0pXG5leHBvcnQgY2xhc3MgQXJpYmFDb3JlTW9kdWxlIHtcblxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQXJpYmFDb3JlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgVGl0bGUsXG4gICAgICAgICAgICAgICAgTWV0YSxcbiAgICAgICAgICAgICAgICBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBOb3RpZmljYXRpb25zLFxuICAgICAgICAgICAgICAgIEh0dHBNb2NrSW50ZXJjZXB0b3IsXG5cbiAgICAgICAgICAgICAgICBSZXNvdXJjZSxcblxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBVc2VyQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IEFwcENvbmZpZywgdXNlRmFjdG9yeTogbWFrZUNvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1VzZXJDb25maWcsIEluamVjdG9yLCBFbnZpcm9ubWVudF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogSHR0cEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IG1ha2VIdHRwQ2xpZW50SGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgSHR0cEJhY2tlbmQsIEFwcENvbmZpZywgSHR0cE1vY2tJbnRlcmNlcHRvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgbmV3IEluamVjdChIVFRQX0lOVEVSQ0VQVE9SUyldXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBHbG9iYWxFcnJvckhhbmRsZXIsIGRlcHM6IFtOb3RpZmljYXRpb25zXX0sXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IFJvdXRpbmdTZXJ2aWNlLCB1c2VDbGFzczogUm91dGluZ1NlcnZpY2UsIGRlcHM6IFtSb3V0ZXJdfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBBcmliYUNvcmVNb2R1bGUsIHByaXZhdGUgY29uZjogQXBwQ29uZmlnKSB7XG5cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqXG4gKiBBZGQgY3VzdG9tIE1vY2sgZnVuY3Rpb25hbGl0eSBvbmx5IGFuZCBpZiB3ZSBlbmFibGVkIHRoaXMgaW4gdGhlIHNldHRpbmdzLiBJIGRvbnQgcmVhbGx5IHdhbnQgdG9cbiAqIGhhdmUgTm9vcEludGVyY2VwdGVyIGluIHRoZSBjaGFpblxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VIdHRwQ2xpZW50SGFuZGxlcihuZ0JhY2tlbmQ6IEh0dHBCYWNrZW5kLCBjb25maWc6IEFwcENvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ja0ludGVyY2VwdG9yOiBIdHRwTW9ja0ludGVyY2VwdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHRvcnM6IEh0dHBJbnRlcmNlcHRvcltdIHwgbnVsbCA9IFtdKTogSHR0cEhhbmRsZXIge1xuICAgIGlmIChjb25maWcuZ2V0Qm9vbGVhbihBcHBDb25maWcuQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIpKSB7XG5cbiAgICAgICAgbW9ja0ludGVyY2VwdG9yLmxvYWRSb3V0ZXMoKTtcbiAgICAgICAgaW50ZXJjZXB0b3JzID0gWy4uLmludGVyY2VwdG9ycywgbW9ja0ludGVyY2VwdG9yXTtcbiAgICB9XG5cbiAgICBpZiAoIWludGVyY2VwdG9ycykge1xuICAgICAgICByZXR1cm4gbmdCYWNrZW5kO1xuICAgIH1cbiAgICByZXR1cm4gaW50ZXJjZXB0b3JzLnJlZHVjZVJpZ2h0KFxuICAgICAgICAobmV4dCwgaW50ZXJjZXB0b3IpID0+IG5ldyBNb2NrSW50ZXJjZXB0b3JIYW5kbGVyKG5leHQsIGludGVyY2VwdG9yKSwgbmdCYWNrZW5kKTtcbn1cblxuXG4iXX0=