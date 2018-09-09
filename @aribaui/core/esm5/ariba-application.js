/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { isBlank } from './utils/lang';
import { AppConfig } from './config/app-config';
import { Meta as MetaTags, Title } from '@angular/platform-browser';
/**
 * Notion of having `AribaApplication` class came from  a simple requirement that every single
 * application needs a common way how to initialize.
 *
 * We want to be more application specific therefore we don't want to have generic names such as
 * `app.component or app.module`, the root component should be named based on what it is doing
 * or what is real application name e.g.: TodoApp, SourcingApp, etcs. and these application will
 * inherit from `AribaApplication` to get some common behavior.
 *
 * Specific application types will extends this class to add more behavior.
 *
 * There are two types of bootstrapping and passing environment parameters to the application:
 *
 * -  During AribaCoreUI import:
 *
 * ### example
 *
 * ```ts
 *      AribaCoreModule.forRoot({
 *                  'app.title': 'Playground Application',
 *                  'asset-folder': 'playground/assets',
 *                  'metaui.rules.file-names': ['Application', 'Layout'],
 *                  'restapi.context': '/myService/',
 *                  'connection.mock-server.enabled': true,
 *                  'connection.mock-server.routes': ['users'],
 *              }),
 *
 * ```
 *  Use this to pass some static properties.
 *
 *
 * -  From AribaApplication :
 *
 *  When you have specific type of applications that needs more settings you inherit from this
 *  class to extend its behavior and then use it for your applications to share common behavior
 *
 * ### example
 *
 *  ```ts
 *
 *     export class FacebookApplication extends AribaApplication {
 *
 *         protected appId: string = '.....';
 *
 *
 *          protected initialize(): void
 *          {
 *              super.initialize();
 *
 *              this.appId = readAppIdfromEnv();
 *
 *              this.appConfig.set('facebook.appId', this.appId );
 *
 *              this.registerFBAuthenticator();
 *
 *          }
 *
 *     }
 *
 *  ```
 *  Once you defined your type of application, then you can start creating applications that inherit
 *  from this `FacebookApplication`. Root App component
 *
 *
 * ```ts
 * \@Component({...})
 *      export PictureAppComponent extends FacebookApplication {
 *             ...
 *
 *      }
 *
 *
 *
 * \@NgModule({ bootstrap: [PictureAppComponent] })
 *     export class PictureAppModule {
 *
 *     }
 *
 *
 * ```
 *
 */
var /**
 * Notion of having `AribaApplication` class came from  a simple requirement that every single
 * application needs a common way how to initialize.
 *
 * We want to be more application specific therefore we don't want to have generic names such as
 * `app.component or app.module`, the root component should be named based on what it is doing
 * or what is real application name e.g.: TodoApp, SourcingApp, etcs. and these application will
 * inherit from `AribaApplication` to get some common behavior.
 *
 * Specific application types will extends this class to add more behavior.
 *
 * There are two types of bootstrapping and passing environment parameters to the application:
 *
 * -  During AribaCoreUI import:
 *
 * ### example
 *
 * ```ts
 *      AribaCoreModule.forRoot({
 *                  'app.title': 'Playground Application',
 *                  'asset-folder': 'playground/assets',
 *                  'metaui.rules.file-names': ['Application', 'Layout'],
 *                  'restapi.context': '/myService/',
 *                  'connection.mock-server.enabled': true,
 *                  'connection.mock-server.routes': ['users'],
 *              }),
 *
 * ```
 *  Use this to pass some static properties.
 *
 *
 * -  From AribaApplication :
 *
 *  When you have specific type of applications that needs more settings you inherit from this
 *  class to extend its behavior and then use it for your applications to share common behavior
 *
 * ### example
 *
 *  ```ts
 *
 *     export class FacebookApplication extends AribaApplication {
 *
 *         protected appId: string = '.....';
 *
 *
 *          protected initialize(): void
 *          {
 *              super.initialize();
 *
 *              this.appId = readAppIdfromEnv();
 *
 *              this.appConfig.set('facebook.appId', this.appId );
 *
 *              this.registerFBAuthenticator();
 *
 *          }
 *
 *     }
 *
 *  ```
 *  Once you defined your type of application, then you can start creating applications that inherit
 *  from this `FacebookApplication`. Root App component
 *
 *
 * ```ts
 * \@Component({...})
 *      export PictureAppComponent extends FacebookApplication {
 *             ...
 *
 *      }
 *
 *
 *
 * \@NgModule({ bootstrap: [PictureAppComponent] })
 *     export class PictureAppModule {
 *
 *     }
 *
 *
 * ```
 *
 */
AribaApplication = /** @class */ (function () {
    function AribaApplication(appConfig) {
        this.appConfig = appConfig;
        this.metaTags = this.appConfig.injector.get(MetaTags);
        this.title = this.appConfig.injector.get(Title);
    }
    /**
     * @return {?}
     */
    AribaApplication.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initialize();
    };
    /**
     * Current default behavior just sets a title for the application
     */
    /**
     * Current default behavior just sets a title for the application
     * @return {?}
     */
    AribaApplication.prototype.initialize = /**
     * Current default behavior just sets a title for the application
     * @return {?}
     */
    function () {
        /** @type {?} */
        var title = this.appConfig.get(AppConfig.AppTitle);
        if (isBlank(title)) {
            title = 'Ariba Application';
        }
        this.title.setTitle(title);
    };
    return AribaApplication;
}());
/**
 * Notion of having `AribaApplication` class came from  a simple requirement that every single
 * application needs a common way how to initialize.
 *
 * We want to be more application specific therefore we don't want to have generic names such as
 * `app.component or app.module`, the root component should be named based on what it is doing
 * or what is real application name e.g.: TodoApp, SourcingApp, etcs. and these application will
 * inherit from `AribaApplication` to get some common behavior.
 *
 * Specific application types will extends this class to add more behavior.
 *
 * There are two types of bootstrapping and passing environment parameters to the application:
 *
 * -  During AribaCoreUI import:
 *
 * ### example
 *
 * ```ts
 *      AribaCoreModule.forRoot({
 *                  'app.title': 'Playground Application',
 *                  'asset-folder': 'playground/assets',
 *                  'metaui.rules.file-names': ['Application', 'Layout'],
 *                  'restapi.context': '/myService/',
 *                  'connection.mock-server.enabled': true,
 *                  'connection.mock-server.routes': ['users'],
 *              }),
 *
 * ```
 *  Use this to pass some static properties.
 *
 *
 * -  From AribaApplication :
 *
 *  When you have specific type of applications that needs more settings you inherit from this
 *  class to extend its behavior and then use it for your applications to share common behavior
 *
 * ### example
 *
 *  ```ts
 *
 *     export class FacebookApplication extends AribaApplication {
 *
 *         protected appId: string = '.....';
 *
 *
 *          protected initialize(): void
 *          {
 *              super.initialize();
 *
 *              this.appId = readAppIdfromEnv();
 *
 *              this.appConfig.set('facebook.appId', this.appId );
 *
 *              this.registerFBAuthenticator();
 *
 *          }
 *
 *     }
 *
 *  ```
 *  Once you defined your type of application, then you can start creating applications that inherit
 *  from this `FacebookApplication`. Root App component
 *
 *
 * ```ts
 * \@Component({...})
 *      export PictureAppComponent extends FacebookApplication {
 *             ...
 *
 *      }
 *
 *
 *
 * \@NgModule({ bootstrap: [PictureAppComponent] })
 *     export class PictureAppModule {
 *
 *     }
 *
 *
 * ```
 *
 */
export { AribaApplication };
if (false) {
    /**
     * Title service for setting page title
     * @type {?}
     */
    AribaApplication.prototype.title;
    /**
     * Meta service for adding and updating page meta tags
     * @type {?}
     */
    AribaApplication.prototype.metaTags;
    /** @type {?} */
    AribaApplication.prototype.appConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEtYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb3JlLyIsInNvdXJjZXMiOlsiYXJpYmEtYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRSxLQUFLLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzRmxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFlSSwwQkFBc0IsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUV0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUduRDs7OztJQUdELG1DQUFROzs7SUFBUjtRQUVJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNyQjtJQUVEOztPQUVHOzs7OztJQUNPLHFDQUFVOzs7O0lBQXBCOztRQUVJLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBRTlCOzJCQWxKTDtJQW1KQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXpDRCw0QkF5Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICovXG5pbXBvcnQge2lzQmxhbmt9IGZyb20gJy4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge0FwcENvbmZpZ30gZnJvbSAnLi9jb25maWcvYXBwLWNvbmZpZyc7XG5pbXBvcnQge01ldGEgYXMgTWV0YVRhZ3MsIFRpdGxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIE5vdGlvbiBvZiBoYXZpbmcgYEFyaWJhQXBwbGljYXRpb25gIGNsYXNzIGNhbWUgZnJvbSAgYSBzaW1wbGUgcmVxdWlyZW1lbnQgdGhhdCBldmVyeSBzaW5nbGVcbiAqIGFwcGxpY2F0aW9uIG5lZWRzIGEgY29tbW9uIHdheSBob3cgdG8gaW5pdGlhbGl6ZS5cbiAqXG4gKiBXZSB3YW50IHRvIGJlIG1vcmUgYXBwbGljYXRpb24gc3BlY2lmaWMgdGhlcmVmb3JlIHdlIGRvbid0IHdhbnQgdG8gaGF2ZSBnZW5lcmljIG5hbWVzIHN1Y2ggYXNcbiAqIGBhcHAuY29tcG9uZW50IG9yIGFwcC5tb2R1bGVgLCB0aGUgcm9vdCBjb21wb25lbnQgc2hvdWxkIGJlIG5hbWVkIGJhc2VkIG9uIHdoYXQgaXQgaXMgZG9pbmdcbiAqIG9yIHdoYXQgaXMgcmVhbCBhcHBsaWNhdGlvbiBuYW1lIGUuZy46IFRvZG9BcHAsIFNvdXJjaW5nQXBwLCBldGNzLiBhbmQgdGhlc2UgYXBwbGljYXRpb24gd2lsbFxuICogaW5oZXJpdCBmcm9tIGBBcmliYUFwcGxpY2F0aW9uYCB0byBnZXQgc29tZSBjb21tb24gYmVoYXZpb3IuXG4gKlxuICogU3BlY2lmaWMgYXBwbGljYXRpb24gdHlwZXMgd2lsbCBleHRlbmRzIHRoaXMgY2xhc3MgdG8gYWRkIG1vcmUgYmVoYXZpb3IuXG4gKlxuICogVGhlcmUgYXJlIHR3byB0eXBlcyBvZiBib290c3RyYXBwaW5nIGFuZCBwYXNzaW5nIGVudmlyb25tZW50IHBhcmFtZXRlcnMgdG8gdGhlIGFwcGxpY2F0aW9uOlxuICpcbiAqIC0gIER1cmluZyBBcmliYUNvcmVVSSBpbXBvcnQ6XG4gKlxuICogIyMjIGV4YW1wbGVcbiAqXG4gKiBgYGB0c1xuICogICAgICBBcmliYUNvcmVNb2R1bGUuZm9yUm9vdCh7XG4gKiAgICAgICAgICAgICAgICAgICdhcHAudGl0bGUnOiAnUGxheWdyb3VuZCBBcHBsaWNhdGlvbicsXG4gKiAgICAgICAgICAgICAgICAgICdhc3NldC1mb2xkZXInOiAncGxheWdyb3VuZC9hc3NldHMnLFxuICogICAgICAgICAgICAgICAgICAnbWV0YXVpLnJ1bGVzLmZpbGUtbmFtZXMnOiBbJ0FwcGxpY2F0aW9uJywgJ0xheW91dCddLFxuICogICAgICAgICAgICAgICAgICAncmVzdGFwaS5jb250ZXh0JzogJy9teVNlcnZpY2UvJyxcbiAqICAgICAgICAgICAgICAgICAgJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIuZW5hYmxlZCc6IHRydWUsXG4gKiAgICAgICAgICAgICAgICAgICdjb25uZWN0aW9uLm1vY2stc2VydmVyLnJvdXRlcyc6IFsndXNlcnMnXSxcbiAqICAgICAgICAgICAgICB9KSxcbiAqXG4gKiBgYGBcbiAqICBVc2UgdGhpcyB0byBwYXNzIHNvbWUgc3RhdGljIHByb3BlcnRpZXMuXG4gKlxuICpcbiAqIC0gIEZyb20gQXJpYmFBcHBsaWNhdGlvbiA6XG4gKlxuICogIFdoZW4geW91IGhhdmUgc3BlY2lmaWMgdHlwZSBvZiBhcHBsaWNhdGlvbnMgdGhhdCBuZWVkcyBtb3JlIHNldHRpbmdzIHlvdSBpbmhlcml0IGZyb20gdGhpc1xuICogIGNsYXNzIHRvIGV4dGVuZCBpdHMgYmVoYXZpb3IgYW5kIHRoZW4gdXNlIGl0IGZvciB5b3VyIGFwcGxpY2F0aW9ucyB0byBzaGFyZSBjb21tb24gYmVoYXZpb3JcbiAqXG4gKiAjIyMgZXhhbXBsZVxuICpcbiAqICBgYGB0c1xuICpcbiAqICAgICBleHBvcnQgY2xhc3MgRmFjZWJvb2tBcHBsaWNhdGlvbiBleHRlbmRzIEFyaWJhQXBwbGljYXRpb24ge1xuICpcbiAqICAgICAgICAgcHJvdGVjdGVkIGFwcElkOiBzdHJpbmcgPSAnLi4uLi4nO1xuICpcbiAqXG4gKiAgICAgICAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZSgpOiB2b2lkXG4gKiAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLmFwcElkID0gcmVhZEFwcElkZnJvbUVudigpO1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLmFwcENvbmZpZy5zZXQoJ2ZhY2Vib29rLmFwcElkJywgdGhpcy5hcHBJZCApO1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRkJBdXRoZW50aWNhdG9yKCk7XG4gKlxuICogICAgICAgICAgfVxuICpcbiAqICAgICB9XG4gKlxuICogIGBgYFxuICogIE9uY2UgeW91IGRlZmluZWQgeW91ciB0eXBlIG9mIGFwcGxpY2F0aW9uLCB0aGVuIHlvdSBjYW4gc3RhcnQgY3JlYXRpbmcgYXBwbGljYXRpb25zIHRoYXQgaW5oZXJpdFxuICogIGZyb20gdGhpcyBgRmFjZWJvb2tBcHBsaWNhdGlvbmAuIFJvb3QgQXBwIGNvbXBvbmVudFxuICpcbiAqXG4gKiBgYGB0c1xuICogICAgICBAQ29tcG9uZW50KHsuLi59KVxuICogICAgICBleHBvcnQgUGljdHVyZUFwcENvbXBvbmVudCBleHRlbmRzIEZhY2Vib29rQXBwbGljYXRpb24ge1xuICogICAgICAgICAgICAgLi4uXG4gKlxuICogICAgICB9XG4gKlxuICpcbiAqXG4gKiAgICAgQE5nTW9kdWxlKHsgYm9vdHN0cmFwOiBbUGljdHVyZUFwcENvbXBvbmVudF0gfSlcbiAqICAgICBleHBvcnQgY2xhc3MgUGljdHVyZUFwcE1vZHVsZSB7XG4gKlxuICogICAgIH1cbiAqXG4gKlxuICogYGBgXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQXJpYmFBcHBsaWNhdGlvbiBpbXBsZW1lbnRzIE9uSW5pdFxue1xuXG4gICAgLyoqXG4gICAgICogVGl0bGUgc2VydmljZSBmb3Igc2V0dGluZyBwYWdlIHRpdGxlXG4gICAgICovXG4gICAgdGl0bGU6IFRpdGxlO1xuXG5cbiAgICAvKipcbiAgICAgKiBNZXRhIHNlcnZpY2UgZm9yIGFkZGluZyBhbmQgdXBkYXRpbmcgcGFnZSBtZXRhIHRhZ3NcbiAgICAgKi9cbiAgICBtZXRhVGFnczogTWV0YVRhZ3M7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhcHBDb25maWc6IEFwcENvbmZpZylcbiAgICB7XG4gICAgICAgIHRoaXMubWV0YVRhZ3MgPSB0aGlzLmFwcENvbmZpZy5pbmplY3Rvci5nZXQoTWV0YVRhZ3MpO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5hcHBDb25maWcuaW5qZWN0b3IuZ2V0KFRpdGxlKTtcblxuXG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGRlZmF1bHQgYmVoYXZpb3IganVzdCBzZXRzIGEgdGl0bGUgZm9yIHRoZSBhcHBsaWNhdGlvblxuICAgICAqL1xuICAgIHByb3RlY3RlZCBpbml0aWFsaXplKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gdGhpcy5hcHBDb25maWcuZ2V0KEFwcENvbmZpZy5BcHBUaXRsZSk7XG4gICAgICAgIGlmIChpc0JsYW5rKHRpdGxlKSkge1xuICAgICAgICAgICAgdGl0bGUgPSAnQXJpYmEgQXBwbGljYXRpb24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGl0bGUuc2V0VGl0bGUodGl0bGUpO1xuXG4gICAgfVxufVxuIl19