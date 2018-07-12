/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIMeta } from './core/uimeta';
import { RuleLoaderService } from './core/rule-loader.service';
import * as sysMetaComponents from './entry-components';
import { AribaMetaUIRoutingModule } from './ariba-metaui-routing.module';
import { AWMetaCoreModule } from './core/meta-core.module';
import { AWMetaLayoutModule } from './layout/meta-layout.module';
/**
 * This module contains everything needs to dynamically generated UI based on metaRules
 * Since we are using primeNG, check AribaComponent if its already imported so you dont have
 * import it again.
 *
 */
var AribaMetaUIModule = /** @class */ (function () {
    function AribaMetaUIModule() {
    }
    AribaMetaUIModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        AribaMetaUIRoutingModule,
                        AWMetaCoreModule,
                        AWMetaLayoutModule
                    ],
                    exports: [
                        AWMetaCoreModule,
                        AWMetaLayoutModule
                    ],
                    providers: [
                        {
                            'provide': APP_INITIALIZER,
                            'useFactory': initMetaUI,
                            'deps': [Injector],
                            'multi': true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    AribaMetaUIModule.ctorParameters = function () { return []; };
    return AribaMetaUIModule;
}());
export { AribaMetaUIModule };
/**
 *
 * Entry factory method that initialize The METAUI layer and here we load WidgetsRules.oss as well
 * as Persistence Rules.
 *
 * @param {?} injector
 * @return {?}
 */
export function initMetaUI(injector) {
    var /** @type {?} */ initFce = function init(inj) {
        var /** @type {?} */ promise = new Promise(function (resolve) {
            var /** @type {?} */ metaUI = UIMeta.getInstance();
            // access services lazily when they are needed and initialized as workaround for
            // https://github.com/angular/angular/issues/16853
            metaUI.injector = inj;
            metaUI.registerLoader(new RuleLoaderService());
            metaUI.loadDefaultRuleFiles(sysMetaComponents);
            resolve(true);
        });
        return promise;
    };
    return initFce.bind(initFce, injector);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEubWV0YXVpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImFyaWJhLm1ldGF1aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxLQUFLLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7OztJQWlDM0Q7S0FFQzs7Z0JBMUJKLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWix3QkFBd0I7d0JBQ3hCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsZ0JBQWdCO3dCQUNoQixrQkFBa0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTt3QkFDUDs0QkFDSSxTQUFTLEVBQUUsZUFBZTs0QkFDMUIsWUFBWSxFQUFFLFVBQVU7NEJBQ3hCLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFDbEIsT0FBTyxFQUFFLElBQUk7eUJBQ2hCO3FCQUNKO2lCQUNKOzs7OzRCQXJERDs7U0FzRGEsaUJBQWlCOzs7Ozs7Ozs7QUFlOUIsTUFBTSxxQkFBcUIsUUFBa0I7SUFFekMscUJBQUksT0FBTyxHQUFHLGNBQWMsR0FBYTtRQUVyQyxxQkFBSSxPQUFPLEdBQWlCLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBWTtZQUVqRCxxQkFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7WUFJbEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFFdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUMsQ0FBQztZQUMvQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUUvQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNsQixDQUFDO0lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEluamVjdG9yLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuL2NvcmUvdWltZXRhJztcbmltcG9ydCB7UnVsZUxvYWRlclNlcnZpY2V9IGZyb20gJy4vY29yZS9ydWxlLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIHN5c01ldGFDb21wb25lbnRzIGZyb20gJy4vZW50cnktY29tcG9uZW50cyc7XG5pbXBvcnQge0FyaWJhTWV0YVVJUm91dGluZ01vZHVsZX0gZnJvbSAnLi9hcmliYS1tZXRhdWktcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHtBV01ldGFDb3JlTW9kdWxlfSBmcm9tICcuL2NvcmUvbWV0YS1jb3JlLm1vZHVsZSc7XG5pbXBvcnQge0FXTWV0YUxheW91dE1vZHVsZX0gZnJvbSAnLi9sYXlvdXQvbWV0YS1sYXlvdXQubW9kdWxlJztcblxuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGNvbnRhaW5zIGV2ZXJ5dGhpbmcgbmVlZHMgdG8gZHluYW1pY2FsbHkgZ2VuZXJhdGVkIFVJIGJhc2VkIG9uIG1ldGFSdWxlc1xuICogU2luY2Ugd2UgYXJlIHVzaW5nIHByaW1lTkcsIGNoZWNrIEFyaWJhQ29tcG9uZW50IGlmIGl0cyBhbHJlYWR5IGltcG9ydGVkIHNvIHlvdSBkb250IGhhdmVcbiAqIGltcG9ydCBpdCBhZ2Fpbi5cbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEFyaWJhTWV0YVVJUm91dGluZ01vZHVsZSxcbiAgICAgICAgQVdNZXRhQ29yZU1vZHVsZSxcbiAgICAgICAgQVdNZXRhTGF5b3V0TW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEFXTWV0YUNvcmVNb2R1bGUsXG4gICAgICAgIEFXTWV0YUxheW91dE1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgICdwcm92aWRlJzogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgICAgJ3VzZUZhY3RvcnknOiBpbml0TWV0YVVJLFxuICAgICAgICAgICAgJ2RlcHMnOiBbSW5qZWN0b3JdLFxuICAgICAgICAgICAgJ211bHRpJzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBcmliYU1ldGFVSU1vZHVsZVxue1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgIH1cbn1cblxuLyoqXG4gKlxuICogRW50cnkgZmFjdG9yeSBtZXRob2QgdGhhdCBpbml0aWFsaXplIFRoZSBNRVRBVUkgbGF5ZXIgYW5kIGhlcmUgd2UgbG9hZCBXaWRnZXRzUnVsZXMub3NzIGFzIHdlbGxcbiAqIGFzIFBlcnNpc3RlbmNlIFJ1bGVzLlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRNZXRhVUkoaW5qZWN0b3I6IEluamVjdG9yKVxue1xuICAgIGxldCBpbml0RmNlID0gZnVuY3Rpb24gaW5pdChpbmo6IEluamVjdG9yKVxuICAgIHtcbiAgICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBtZXRhVUkgPSBVSU1ldGEuZ2V0SW5zdGFuY2UoKTtcblxuICAgICAgICAgICAgLy8gYWNjZXNzIHNlcnZpY2VzIGxhemlseSB3aGVuIHRoZXkgYXJlIG5lZWRlZCBhbmQgaW5pdGlhbGl6ZWQgYXMgd29ya2Fyb3VuZCBmb3JcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE2ODUzXG4gICAgICAgICAgICBtZXRhVUkuaW5qZWN0b3IgPSBpbmo7XG5cbiAgICAgICAgICAgIG1ldGFVSS5yZWdpc3RlckxvYWRlcihuZXcgUnVsZUxvYWRlclNlcnZpY2UoKSk7XG4gICAgICAgICAgICBtZXRhVUkubG9hZERlZmF1bHRSdWxlRmlsZXMoc3lzTWV0YUNvbXBvbmVudHMpO1xuXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcbiAgICByZXR1cm4gaW5pdEZjZS5iaW5kKGluaXRGY2UsIGluamVjdG9yKTtcbn1cblxuIl19