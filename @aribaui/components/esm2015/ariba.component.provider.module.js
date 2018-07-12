/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
export class AribaComponentsTestProviderModule {
    /**
     * @return {?}
     */
    static forRoot() {
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
    }
}
AribaComponentsTestProviderModule.decorators = [
    { type: NgModule, args: [{
                imports: []
            },] },
];
/**
 * @param {?} compRegistry
 * @return {?}
 */
export function registerComponents(compRegistry) {
    return compRegistry.initialize.bind(compRegistry, components);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEuY29tcG9uZW50LnByb3ZpZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJhcmliYS5jb21wb25lbnQucHJvdmlkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLGVBQWUsRUFBdUIsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sS0FBSyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQzs7Ozs7Ozs7Ozs7QUFnQi9FLE1BQU07Ozs7SUFHRixNQUFNLENBQUMsT0FBTztRQUNWLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxpQ0FBaUM7WUFDM0MsU0FBUyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osaUJBQWlCO2dCQUNqQixtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2Ysd0JBQXdCO2dCQUN4QixhQUFhO2dCQUNiLFdBQVc7Z0JBQ1gsV0FBVztnQkFDWDtvQkFDSSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsVUFBVSxFQUFFLGtCQUFrQjtvQkFDOUIsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQ3pCLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0o7U0FDSixDQUFDO0tBQ0w7OztZQTFCSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLEVBQUU7YUFDZDs7Ozs7O0FBMkJELE1BQU0sNkJBQTZCLFlBQStCO0lBQzlELE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDakUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbXBvbmVudFJlZ2lzdHJ5fSBmcm9tICcuL2NvcmUvY29tcG9uZW50LXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgY29tcG9uZW50cyBmcm9tICcuL2VudHJ5LWNvbXBvbmVudHMnO1xuaW1wb3J0IHtEb21VdGlsc1NlcnZpY2V9IGZyb20gJy4vY29yZS9kb20tdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge01vZGFsU2VydmljZX0gZnJvbSAnLi9jb3JlL21vZGFsLXNlcnZpY2UvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQge0RhdGFQcm92aWRlcnN9IGZyb20gJy4vY29yZS9kYXRhL2RhdGEtcHJvdmlkZXJzJztcbmltcG9ydCB7RGF0YUZpbmRlcnN9IGZyb20gJy4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0Vycm9yTWFuYWdlclNlcnZpY2V9IGZyb20gJy4vY29yZS9lcnJvci1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtBd05hbWVTdG9yZX0gZnJvbSAnLi9jb3JlL2F3LW5hbWUvYXctbmFtZS5zdG9yZSc7XG5pbXBvcnQge0RhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeX0gZnJvbSAnLi9jb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5cblxuLyoqXG4gKlxuICogVGhpcyBtb2R1bGUgaXMgdXNlZCBtYWlubHkgZm9yIHRlc3RzIGFzIGltcG9ydGluZyBhIG1vZHVsZSB3aXRoIGFsbCB0aGUgY29tcG9uZW50cyBhbmQgeW91XG4gKiB1c2Ugb25seSAxIG9yIHR3byBoYXMgYSBiaWcgaW1wYWN0IG9uIHRoZSBwZXJmb3JtYW5jZSBleGVjdXRpb24uIGUuZy4gZnJvbSBleGVjdXRpbmcgY291cGxlXG4gKiB0ZXN0cyB1bmRlciAxIHNlYyBjYW4gZ28gdXAgdG8gMTBzZWMgaWYgeW91IGltcG9ydCBhbGwgdGhlIHRoaW5ncyB0aGF0IHlvdSBhcmUgbm90IHVzaW5nLlxuICpcbiAqIEkgaGF2ZW50IG5vdGljZWQgYW55dGhpbmcgc2ltaWxhciBpbiBhcHBsaWNhdGlvbiBpdHMgb25seSBqYXNtaW5lL2thcm1hIHRoYXQgbmVlZHMgdG8gaW5pdFxuICogY29tcG9uZW50cyBmb3IgZXZlcnkgdGVzdC5cbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW11cbn0pXG5leHBvcnQgY2xhc3MgQXJpYmFDb21wb25lbnRzVGVzdFByb3ZpZGVyTW9kdWxlIHtcblxuXG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQXJpYmFDb21wb25lbnRzVGVzdFByb3ZpZGVyTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgTW9kYWxTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIENvbXBvbmVudFJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIEVycm9yTWFuYWdlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgRG9tVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIERhdGFUeXBlUHJvdmlkZXJSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBEYXRhUHJvdmlkZXJzLFxuICAgICAgICAgICAgICAgIERhdGFGaW5kZXJzLFxuICAgICAgICAgICAgICAgIEF3TmFtZVN0b3JlLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiByZWdpc3RlckNvbXBvbmVudHMsXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFtDb21wb25lbnRSZWdpc3RyeV0sXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudHMoY29tcFJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gY29tcFJlZ2lzdHJ5LmluaXRpYWxpemUuYmluZChjb21wUmVnaXN0cnksIGNvbXBvbmVudHMpO1xufVxuXG5cbiJdfQ==