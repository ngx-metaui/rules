import { AppConfig } from './config/app-config';
import { Meta as MetaTags, Title } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
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
 *      @Component({...})
 *      export PictureAppComponent extends FacebookApplication {
 *             ...
 *
 *      }
 *
 *
 *
 *     @NgModule({ bootstrap: [PictureAppComponent] })
 *     export class PictureAppModule {
 *
 *     }
 *
 *
 * ```
 *
 */
export declare class AribaApplication implements OnInit {
    protected appConfig: AppConfig;
    /**
     * Title service for setting page title
     */
    title: Title;
    /**
     * Meta service for adding and updating page meta tags
     */
    metaTags: MetaTags;
    constructor(appConfig: AppConfig);
    ngOnInit(): void;
    /**
     * Current default behavior just sets a title for the application
     */
    protected initialize(): void;
}
