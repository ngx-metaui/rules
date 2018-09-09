/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ComponentRegistry } from './core/component-registry.service';
import * as components from './entry-components';
import { DomUtilsService } from './core/dom-utils.service';
import { ModalService } from './core/modal-service/modal.service';
import { DataProviders } from './core/data/data-providers';
import { DataFinders } from './core/data/data-finders';
import { ErrorManagerService } from './core/error-manager.service';
import { AwNameStore } from './core/aw-name/aw-name.store';
import { DataTypeProviderRegistry } from './core/data/datatype-registry.service';
/**
 *
 * This module is used mainly for tests as importing a module with all the components and you
 * use only 1 or two has a big impact on the performance execution. e.g. from executing couple
 * tests under 1 sec can go up to 10sec if you import all the things that you are not using.
 *
 * I havent noticed anything similar in application its only jasmine/karma that needs to init
 * components for every test.
 *
 */
var AribaComponentsTestProviderModule = /** @class */ (function () {
    function AribaComponentsTestProviderModule() {
    }
    /**
     * @return {?}
     */
    AribaComponentsTestProviderModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: AribaComponentsTestProviderModule,
            providers: [
                ModalService,
                ComponentRegistry,
                ErrorManagerService,
                DomUtilsService,
                DataTypeProviderRegistry,
                DataProviders,
                DataFinders,
                AwNameStore,
                {
                    provide: APP_INITIALIZER,
                    useFactory: registerComponents,
                    deps: [ComponentRegistry],
                    multi: true,
                }
            ]
        };
    };
    AribaComponentsTestProviderModule.decorators = [
        { type: NgModule, args: [{
                    imports: []
                },] }
    ];
    return AribaComponentsTestProviderModule;
}());
export { AribaComponentsTestProviderModule };
/**
 * @param {?} compRegistry
 * @return {?}
 */
export function registerComponents(compRegistry) {
    return compRegistry.initialize.bind(compRegistry, components);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEuY29tcG9uZW50LnByb3ZpZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJhcmliYS5jb21wb25lbnQucHJvdmlkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLGVBQWUsRUFBdUIsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sS0FBSyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQnBFLHlDQUFPOzs7SUFBZDtRQUNJLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxpQ0FBaUM7WUFDM0MsU0FBUyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osaUJBQWlCO2dCQUNqQixtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2Ysd0JBQXdCO2dCQUN4QixhQUFhO2dCQUNiLFdBQVc7Z0JBQ1gsV0FBVztnQkFDWDtvQkFDSSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsVUFBVSxFQUFFLGtCQUFrQjtvQkFDOUIsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0o7U0FDSixDQUFDO0tBQ0w7O2dCQTFCSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLEVBQUU7aUJBQ2Q7OzRDQTVDRDs7U0E2Q2EsaUNBQWlDOzs7OztBQTBCOUMsTUFBTSw2QkFBNkIsWUFBK0I7SUFDOUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztDQUNqRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50UmVnaXN0cnl9IGZyb20gJy4vY29yZS9jb21wb25lbnQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBjb21wb25lbnRzIGZyb20gJy4vZW50cnktY29tcG9uZW50cyc7XG5pbXBvcnQge0RvbVV0aWxzU2VydmljZX0gZnJvbSAnLi9jb3JlL2RvbS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7TW9kYWxTZXJ2aWNlfSBmcm9tICcuL2NvcmUvbW9kYWwtc2VydmljZS9tb2RhbC5zZXJ2aWNlJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyc30gZnJvbSAnLi9jb3JlL2RhdGEvZGF0YS1wcm92aWRlcnMnO1xuaW1wb3J0IHtEYXRhRmluZGVyc30gZnJvbSAnLi9jb3JlL2RhdGEvZGF0YS1maW5kZXJzJztcbmltcG9ydCB7RXJyb3JNYW5hZ2VyU2VydmljZX0gZnJvbSAnLi9jb3JlL2Vycm9yLW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQge0F3TmFtZVN0b3JlfSBmcm9tICcuL2NvcmUvYXctbmFtZS9hdy1uYW1lLnN0b3JlJztcbmltcG9ydCB7RGF0YVR5cGVQcm92aWRlclJlZ2lzdHJ5fSBmcm9tICcuL2NvcmUvZGF0YS9kYXRhdHlwZS1yZWdpc3RyeS5zZXJ2aWNlJztcblxuXG4vKipcbiAqXG4gKiBUaGlzIG1vZHVsZSBpcyB1c2VkIG1haW5seSBmb3IgdGVzdHMgYXMgaW1wb3J0aW5nIGEgbW9kdWxlIHdpdGggYWxsIHRoZSBjb21wb25lbnRzIGFuZCB5b3VcbiAqIHVzZSBvbmx5IDEgb3IgdHdvIGhhcyBhIGJpZyBpbXBhY3Qgb24gdGhlIHBlcmZvcm1hbmNlIGV4ZWN1dGlvbi4gZS5nLiBmcm9tIGV4ZWN1dGluZyBjb3VwbGVcbiAqIHRlc3RzIHVuZGVyIDEgc2VjIGNhbiBnbyB1cCB0byAxMHNlYyBpZiB5b3UgaW1wb3J0IGFsbCB0aGUgdGhpbmdzIHRoYXQgeW91IGFyZSBub3QgdXNpbmcuXG4gKlxuICogSSBoYXZlbnQgbm90aWNlZCBhbnl0aGluZyBzaW1pbGFyIGluIGFwcGxpY2F0aW9uIGl0cyBvbmx5IGphc21pbmUva2FybWEgdGhhdCBuZWVkcyB0byBpbml0XG4gKiBjb21wb25lbnRzIGZvciBldmVyeSB0ZXN0LlxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBcmliYUNvbXBvbmVudHNUZXN0UHJvdmlkZXJNb2R1bGUge1xuXG5cbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBcmliYUNvbXBvbmVudHNUZXN0UHJvdmlkZXJNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBNb2RhbFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50UmVnaXN0cnksXG4gICAgICAgICAgICAgICAgRXJyb3JNYW5hZ2VyU2VydmljZSxcbiAgICAgICAgICAgICAgICBEb21VdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgRGF0YVR5cGVQcm92aWRlclJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIERhdGFQcm92aWRlcnMsXG4gICAgICAgICAgICAgICAgRGF0YUZpbmRlcnMsXG4gICAgICAgICAgICAgICAgQXdOYW1lU3RvcmUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IHJlZ2lzdGVyQ29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW0NvbXBvbmVudFJlZ2lzdHJ5XSxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wUmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5KTogRnVuY3Rpb24ge1xuICAgIHJldHVybiBjb21wUmVnaXN0cnkuaW5pdGlhbGl6ZS5iaW5kKGNvbXBSZWdpc3RyeSwgY29tcG9uZW50cyk7XG59XG5cblxuIl19