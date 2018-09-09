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
import { InjectionToken, Injector } from '@angular/core';
import { Environment } from './environment';
/**
 * Since on enterprise level we need to support all available locales as user might change
 * to different lang anytime we need to import all expected locales that we want to support.
 *
 * Note:  Remember when you want to support more locales you need to import them and register
 * them using registerLocaleData
 */
export declare const AppConfigToken: InjectionToken<string>;
/**
 * Simple Configuration implementation  which let us configure application during a bootstrap
 * phase. You can pass values in 3 different ways
 *
 * 1) Using import - at the time you import your module
 * 2) injected as service and you can set values
 * 3) From Script tag or globally defined VAR during a deployment
 *
 *
 * There is also from URL option that is for now temporary disabled.
 *
 */
export declare class AppConfig {
    injector: Injector;
    environment: Environment;
    /**
     * This is not regular env. param we use this to query global var that can be attached to
     * window to read env. settings that can be injected by server
     *
     */
    static readonly AppConfigGlobalVar: string;
    static readonly IsDevMode: string;
    static readonly UserAgent: string;
    static readonly Lang: string;
    static readonly SupportedLangs: string;
    static readonly Direction: string;
    static readonly NavPlatform: string;
    static readonly i18nEnabled: string;
    static readonly AppTitle: string;
    static readonly RestApiContextUrl: string;
    static readonly RestApiHostUrl: string;
    static readonly ContentType: string;
    static readonly ConnectionRetryInterval: string;
    static readonly ConnectionAbortTimeout: string;
    static readonly ConnectionUseMockServer: string;
    static readonly ConnectionMockServerPath: string;
    static readonly ConnectionMockServerRoutes: string;
    static readonly DomainUniqueName: string;
    static readonly DomainQuery: string;
    static readonly AssetFolder: string;
    static readonly InTest: string;
    /**
     * Since we unable to change and simulate URL during ng test but still we need to be able to
     * test this URL parsing logic then just for a Test purposes this `env.test.url` property
     * will be used to pass url during a test.
     */
    static readonly InTestUrl: string;
    private values;
    testUrl: string;
    constructor(injector: Injector, environment: Environment);
    /**
     *
     * Called by factory method to initialize this config class
     *
     */
    init(config: {
        [key: string]: any;
    }): void;
    /**
     * This will read globally inserted scripts to initialize application from the server side.
     * The script can directly declare the variables :
     *
     * ```js
     *   <script>
     *      var AppConfigGlobal = {
     *               'app.pro1': 'value1',
     *               'app.pro2': 'value2',
     *               'lang': 'ch'
     *      };
     *  </script>
     * ```
     *
     *   or it can be included on the index.html page during build time.
     *
     *   We expect that will find the `AppConfigGlobal`
     *
     *
     */
    parseGlobalParams(): void;
    /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     */
    set(key: string, value: any): void;
    /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     */
    get(key: string): any;
    getNumber(key: string): number;
    getBoolean(key: string): boolean;
    private initDefaults();
    getRestApiContextUrl(entity: string, isNested?: boolean): string;
    getRestApiContext(): string;
    getRestApiHost(): string;
    isProductionMode(): boolean;
    getBaseUrl(): string;
    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     */
    initializeI18n(): Promise<any>;
}
/**
 * Factory method used by CoreModule in order to instantiate AppConfig provider
 *
 */
export declare function makeConfig(config: {
    [key: string]: any;
}, injector: Injector, env: Environment): AppConfig;
