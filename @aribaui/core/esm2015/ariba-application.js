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
export class AribaApplication {
    /**
     * @param {?} appConfig
     */
    constructor(appConfig) {
        this.appConfig = appConfig;
        this.metaTags = this.appConfig.injector.get(MetaTags);
        this.title = this.appConfig.injector.get(Title);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initialize();
    }
    /**
     * Current default behavior just sets a title for the application
     * @return {?}
     */
    initialize() {
        /** @type {?} */
        let title = this.appConfig.get(AppConfig.AppTitle);
        if (isBlank(title)) {
            title = 'Ariba Application';
        }
        this.title.setTitle(title);
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEtYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb3JlLyIsInNvdXJjZXMiOlsiYXJpYmEtYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWtCQSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRSxLQUFLLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzRmxFLE1BQU07Ozs7SUFlRixZQUFzQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRXRDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBR25EOzs7O0lBR0QsUUFBUTtRQUVKLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNyQjs7Ozs7SUFLUyxVQUFVOztRQUVoQixJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixLQUFLLEdBQUcsbUJBQW1CLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUU5QjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtpc0JsYW5rfSBmcm9tICcuL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtBcHBDb25maWd9IGZyb20gJy4vY29uZmlnL2FwcC1jb25maWcnO1xuaW1wb3J0IHtNZXRhIGFzIE1ldGFUYWdzLCBUaXRsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBOb3Rpb24gb2YgaGF2aW5nIGBBcmliYUFwcGxpY2F0aW9uYCBjbGFzcyBjYW1lIGZyb20gIGEgc2ltcGxlIHJlcXVpcmVtZW50IHRoYXQgZXZlcnkgc2luZ2xlXG4gKiBhcHBsaWNhdGlvbiBuZWVkcyBhIGNvbW1vbiB3YXkgaG93IHRvIGluaXRpYWxpemUuXG4gKlxuICogV2Ugd2FudCB0byBiZSBtb3JlIGFwcGxpY2F0aW9uIHNwZWNpZmljIHRoZXJlZm9yZSB3ZSBkb24ndCB3YW50IHRvIGhhdmUgZ2VuZXJpYyBuYW1lcyBzdWNoIGFzXG4gKiBgYXBwLmNvbXBvbmVudCBvciBhcHAubW9kdWxlYCwgdGhlIHJvb3QgY29tcG9uZW50IHNob3VsZCBiZSBuYW1lZCBiYXNlZCBvbiB3aGF0IGl0IGlzIGRvaW5nXG4gKiBvciB3aGF0IGlzIHJlYWwgYXBwbGljYXRpb24gbmFtZSBlLmcuOiBUb2RvQXBwLCBTb3VyY2luZ0FwcCwgZXRjcy4gYW5kIHRoZXNlIGFwcGxpY2F0aW9uIHdpbGxcbiAqIGluaGVyaXQgZnJvbSBgQXJpYmFBcHBsaWNhdGlvbmAgdG8gZ2V0IHNvbWUgY29tbW9uIGJlaGF2aW9yLlxuICpcbiAqIFNwZWNpZmljIGFwcGxpY2F0aW9uIHR5cGVzIHdpbGwgZXh0ZW5kcyB0aGlzIGNsYXNzIHRvIGFkZCBtb3JlIGJlaGF2aW9yLlxuICpcbiAqIFRoZXJlIGFyZSB0d28gdHlwZXMgb2YgYm9vdHN0cmFwcGluZyBhbmQgcGFzc2luZyBlbnZpcm9ubWVudCBwYXJhbWV0ZXJzIHRvIHRoZSBhcHBsaWNhdGlvbjpcbiAqXG4gKiAtICBEdXJpbmcgQXJpYmFDb3JlVUkgaW1wb3J0OlxuICpcbiAqICMjIyBleGFtcGxlXG4gKlxuICogYGBgdHNcbiAqICAgICAgQXJpYmFDb3JlTW9kdWxlLmZvclJvb3Qoe1xuICogICAgICAgICAgICAgICAgICAnYXBwLnRpdGxlJzogJ1BsYXlncm91bmQgQXBwbGljYXRpb24nLFxuICogICAgICAgICAgICAgICAgICAnYXNzZXQtZm9sZGVyJzogJ3BsYXlncm91bmQvYXNzZXRzJyxcbiAqICAgICAgICAgICAgICAgICAgJ21ldGF1aS5ydWxlcy5maWxlLW5hbWVzJzogWydBcHBsaWNhdGlvbicsICdMYXlvdXQnXSxcbiAqICAgICAgICAgICAgICAgICAgJ3Jlc3RhcGkuY29udGV4dCc6ICcvbXlTZXJ2aWNlLycsXG4gKiAgICAgICAgICAgICAgICAgICdjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQnOiB0cnVlLFxuICogICAgICAgICAgICAgICAgICAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5yb3V0ZXMnOiBbJ3VzZXJzJ10sXG4gKiAgICAgICAgICAgICAgfSksXG4gKlxuICogYGBgXG4gKiAgVXNlIHRoaXMgdG8gcGFzcyBzb21lIHN0YXRpYyBwcm9wZXJ0aWVzLlxuICpcbiAqXG4gKiAtICBGcm9tIEFyaWJhQXBwbGljYXRpb24gOlxuICpcbiAqICBXaGVuIHlvdSBoYXZlIHNwZWNpZmljIHR5cGUgb2YgYXBwbGljYXRpb25zIHRoYXQgbmVlZHMgbW9yZSBzZXR0aW5ncyB5b3UgaW5oZXJpdCBmcm9tIHRoaXNcbiAqICBjbGFzcyB0byBleHRlbmQgaXRzIGJlaGF2aW9yIGFuZCB0aGVuIHVzZSBpdCBmb3IgeW91ciBhcHBsaWNhdGlvbnMgdG8gc2hhcmUgY29tbW9uIGJlaGF2aW9yXG4gKlxuICogIyMjIGV4YW1wbGVcbiAqXG4gKiAgYGBgdHNcbiAqXG4gKiAgICAgZXhwb3J0IGNsYXNzIEZhY2Vib29rQXBwbGljYXRpb24gZXh0ZW5kcyBBcmliYUFwcGxpY2F0aW9uIHtcbiAqXG4gKiAgICAgICAgIHByb3RlY3RlZCBhcHBJZDogc3RyaW5nID0gJy4uLi4uJztcbiAqXG4gKlxuICogICAgICAgICAgcHJvdGVjdGVkIGluaXRpYWxpemUoKTogdm9pZFxuICogICAgICAgICAge1xuICogICAgICAgICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAqXG4gKiAgICAgICAgICAgICAgdGhpcy5hcHBJZCA9IHJlYWRBcHBJZGZyb21FbnYoKTtcbiAqXG4gKiAgICAgICAgICAgICAgdGhpcy5hcHBDb25maWcuc2V0KCdmYWNlYm9vay5hcHBJZCcsIHRoaXMuYXBwSWQgKTtcbiAqXG4gKiAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckZCQXV0aGVudGljYXRvcigpO1xuICpcbiAqICAgICAgICAgIH1cbiAqXG4gKiAgICAgfVxuICpcbiAqICBgYGBcbiAqICBPbmNlIHlvdSBkZWZpbmVkIHlvdXIgdHlwZSBvZiBhcHBsaWNhdGlvbiwgdGhlbiB5b3UgY2FuIHN0YXJ0IGNyZWF0aW5nIGFwcGxpY2F0aW9ucyB0aGF0IGluaGVyaXRcbiAqICBmcm9tIHRoaXMgYEZhY2Vib29rQXBwbGljYXRpb25gLiBSb290IEFwcCBjb21wb25lbnRcbiAqXG4gKlxuICogYGBgdHNcbiAqICAgICAgQENvbXBvbmVudCh7Li4ufSlcbiAqICAgICAgZXhwb3J0IFBpY3R1cmVBcHBDb21wb25lbnQgZXh0ZW5kcyBGYWNlYm9va0FwcGxpY2F0aW9uIHtcbiAqICAgICAgICAgICAgIC4uLlxuICpcbiAqICAgICAgfVxuICpcbiAqXG4gKlxuICogICAgIEBOZ01vZHVsZSh7IGJvb3RzdHJhcDogW1BpY3R1cmVBcHBDb21wb25lbnRdIH0pXG4gKiAgICAgZXhwb3J0IGNsYXNzIFBpY3R1cmVBcHBNb2R1bGUge1xuICpcbiAqICAgICB9XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEFyaWJhQXBwbGljYXRpb24gaW1wbGVtZW50cyBPbkluaXRcbntcblxuICAgIC8qKlxuICAgICAqIFRpdGxlIHNlcnZpY2UgZm9yIHNldHRpbmcgcGFnZSB0aXRsZVxuICAgICAqL1xuICAgIHRpdGxlOiBUaXRsZTtcblxuXG4gICAgLyoqXG4gICAgICogTWV0YSBzZXJ2aWNlIGZvciBhZGRpbmcgYW5kIHVwZGF0aW5nIHBhZ2UgbWV0YSB0YWdzXG4gICAgICovXG4gICAgbWV0YVRhZ3M6IE1ldGFUYWdzO1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYXBwQ29uZmlnOiBBcHBDb25maWcpXG4gICAge1xuICAgICAgICB0aGlzLm1ldGFUYWdzID0gdGhpcy5hcHBDb25maWcuaW5qZWN0b3IuZ2V0KE1ldGFUYWdzKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMuYXBwQ29uZmlnLmluamVjdG9yLmdldChUaXRsZSk7XG5cblxuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBkZWZhdWx0IGJlaGF2aW9yIGp1c3Qgc2V0cyBhIHRpdGxlIGZvciB0aGUgYXBwbGljYXRpb25cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9IHRoaXMuYXBwQ29uZmlnLmdldChBcHBDb25maWcuQXBwVGl0bGUpO1xuICAgICAgICBpZiAoaXNCbGFuayh0aXRsZSkpIHtcbiAgICAgICAgICAgIHRpdGxlID0gJ0FyaWJhIEFwcGxpY2F0aW9uJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpdGxlLnNldFRpdGxlKHRpdGxlKTtcblxuICAgIH1cbn1cbiJdfQ==