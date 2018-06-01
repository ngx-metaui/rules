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
import {InjectionToken, Injector, isDevMode} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {BooleanWrapper, isBlank, isPresent, NumberWrapper, readGlobalParam} from '../utils/lang';
import {MapWrapper} from '../utils/collection';
import {Environment} from './environment';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeDE from '@angular/common/locales/de';


/**
 * Since on enterprise level we need to support all available locales as user might change
 * to different lang anytime we need to import all expected locales that we want to support.
 *
 * Note:  Remember when you want to support more locales you need to import them and register
 * them using registerLocaleData
 */
export const AppConfigToken = new InjectionToken<string>('App.Config');

const SuportedLanguages = ['en', 'fr'];


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
export class AppConfig
{
    /**
     * This is not regular env. param we use this to query global var that can be attached to
     * window to read env. settings that can be injected by server
     *
     */
    static readonly AppConfigGlobalVar = 'AppConfigGlobal';

    static readonly IsDevMode = 'devmode.enabled';
    static readonly UserAgent = 'useragent';
    static readonly Lang = 'lang';
    static readonly SupportedLangs = 'supportedlang';
    static readonly Direction = 'dir';
    static readonly NavPlatform = 'platform';
    static readonly i18nEnabled = 'i18n.enabled';
    static readonly AppTitle = 'app.title';
    static readonly RestApiContextUrl = 'restapi.context';
    static readonly RestApiHostUrl = 'restapi.host';
    static readonly ContentType = 'content-type';
    static readonly ConnectionRetryInterval = 'connection.retry';
    static readonly ConnectionAbortTimeout = 'connection.abort-timeout';
    static readonly ConnectionUseMockServer = 'connection.mock-server.enabled';
    static readonly ConnectionMockServerPath = 'connection.mock-server.path';
    static readonly ConnectionMockServerRoutes = 'connection.mock-server.routes';
    static readonly DomainUniqueName = 'domain.uniquename';
    static readonly DomainQuery = 'domain.uniquename';
    static readonly AssetFolder = 'asset-folder';
    static readonly InTest = 'env.test';

    /**
     * Since we unable to change and simulate URL during ng test but still we need to be able to
     * test this URL parsing logic then just for a Test purposes this `env.test.url` property
     * will be used to pass url during a test.
     */
    static readonly InTestUrl = 'env.test.url';

    private values: Map<string, any>;
    // private queryValues: Map<string,  any>;

    private transService: TranslateService;


    testUrl: string;

    constructor(public injector: Injector, public environment: Environment)
    {
        // we expect there will be always window available.
        this.values = new Map<string, any>();
        // this.queryValues = new Map<string,  any>();
    }


    /**
     *
     * Called by factory method to initialize this config class
     *
     */
    init(config: { [key: string]: any })
    {
        this.initDefaults();
        if (isPresent(config)) {
            let values: Map<string, any> = MapWrapper.createFromStringMap<any>(config);
            values.forEach((v: any, k: any) => this.set(k, v));
        }

        this.environment.setValue(AppConfig.AssetFolder, this.get(AppConfig.AssetFolder));

        let location: any = window.location.pathname + window.location.search;
        if (this.environment.inTest) {
            location = this.get(AppConfig.InTestUrl);
        }

        // if (isPresent(location)) {
        //     this.parseQueryParms(location);
        // }


    }


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
    parseGlobalParams(): void
    {
        let globalConfig: { [name: string]: any } = readGlobalParam(AppConfig.AppConfigGlobalVar);
        if (isPresent(globalConfig)) {
            for (let key in globalConfig) {
                this.values.set(key.toLowerCase(), globalConfig[key]);
            }
        }
    }

    /**
     *  I need to use this late injection which is explicitly triggered by developer as I want to
     * have all wired together inside CoreModule.
     *
     *  Todo: Check for non - existing Ng2 translate
     *
     *
     */
    enableI18nSupport(): void
    {
        this.transService = this.injector.get(TranslateService);

        if (this.getBoolean(AppConfig.InTest)) {
            this.environment.inTest = true;
        }
        this.initUserLocale();
    }


    /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     */
    set(key: string, value: any): void
    {
        this.values.set(key.toLowerCase(), value);

        if (key.toLowerCase() === AppConfig.InTest) {
            this.environment.inTest = value;
        }
    }


    /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     */
    get(key: string): any
    {
        if (this.values.has(key.toLowerCase())) {
            return this.values.get(key.toLowerCase());
        }
        return null;
    }


    getNumber(key: string): number
    {
        let val = this.get(key);
        return NumberWrapper.parseIntAutoRadix(val);
    }


    getBoolean(key: string): boolean
    {
        let val = this.get(key);
        return BooleanWrapper.boleanValue(val);
    }

    // /**
    //  *
    //  * Called during instantiation and it read query params if any and use them as
    // configuration.
    //  * We might want to force to prefix each param with env. to make sure we do not store
    // everything * */ private parseQueryParms(url: string) {  let urlSerializer = new
    // DefaultUrlSerializer(); let urlTree = urlSerializer.parse(url);  if
    // (isPresent(urlTree.queryParams)) {  for (let key in urlTree.queryParams) {
    // this.queryValues.set(key.toLowerCase(), urlTree.queryParams[key]); } } }

    private initDefaults()
    {

        this.set(AppConfig.IsDevMode, isDevMode());
        this.set(AppConfig.UserAgent, window.navigator.userAgent);
        this.set(AppConfig.Direction, document.documentElement.dir);
        this.set(AppConfig.NavPlatform, window.navigator.platform);
        this.set(AppConfig.ContentType, 'application/json; charset=utf-8');
        this.set(AppConfig.ConnectionRetryInterval, 500);
        this.set(AppConfig.ConnectionUseMockServer, false);
        this.set(AppConfig.ConnectionMockServerPath, '/mock-routing');
        this.set(AppConfig.i18nEnabled, true);
        this.set(AppConfig.InTest, false);
        this.set(AppConfig.DomainUniqueName, 'uniqueName');
        this.set(AppConfig.DomainQuery, 'q');

        if (this.environment.inTest) {
            this.set(AppConfig.ConnectionAbortTimeout, 500);
        } else {
            this.set(AppConfig.ConnectionAbortTimeout, 8000);
        }
        this.set(AppConfig.AssetFolder, 'assets');

        if (!this.values.has(AppConfig.Lang)) {
            this.set(AppConfig.Lang, window.navigator.language);
        }

        if (!this.values.has(AppConfig.SupportedLangs)) {
            this.set(AppConfig.SupportedLangs, SuportedLanguages);
        }
    }


    getRestApiContextUrl(entity: string, isNested: boolean = false): string
    {
        let nestedFlag = isNested ? '$' : '';
        let withEntity = `${AppConfig.RestApiContextUrl}.${nestedFlag}${entity}`;
        let url = this.get(withEntity) || this.get(AppConfig.RestApiContextUrl);

        if (isPresent(url)) {
            if (/\/$/g.test(url)) {
                url = url.substring(0, url.length - 1);
            }
            return url;
        }

        throw new Error('Rest APIUri is not configured');
    }


    getRestApiContext(): string
    {
        return this.get(AppConfig.RestApiContextUrl) || '';
    }

    getRestApiHost(): string
    {
        return this.get(AppConfig.RestApiHostUrl) || '';
    }

    isProductionMode(): boolean
    {
        return !this.getBoolean(AppConfig.IsDevMode);
    }

    getBaseUrl() {
        const isMocked = this.getBoolean(AppConfig.ConnectionUseMockServer);
        const cnx = this.getRestApiContext();
        const host = this.getRestApiHost() || '';

        if (isMocked) {
            const prefix = this.get(AppConfig.AssetFolder);
            return `${prefix}${cnx || '/'}`;
        }

        let url = `${host}${cnx || '/'}`;
        return url;
    }

    /**
     * Init translation service based on the settigs
     */
    private initUserLocale()
    {
        if (isBlank(this.transService)) {
            return;
        }

        registerLocaleData(localeFr);
        registerLocaleData(localeDE);

        let currentLang = 'en';
        let supLangs: Array<string> = (this.values.get(AppConfig.SupportedLangs));
        let lang = (this.get(AppConfig.Lang));
        this.transService.addLangs(supLangs);
        this.transService.setDefaultLang('en');

        if (supLangs.map((l) => l.toLowerCase()).indexOf(lang.toLowerCase()) === -1) {
            let modifiedLang = lang.split('-')[0];
            if (supLangs.map((l) => l.toLowerCase()).indexOf(modifiedLang.toLowerCase()) !== -1) {
                currentLang = modifiedLang;
            }
        }

        this.transService.use(currentLang);
        this.transService.onLangChange.subscribe((val: LangChangeEvent) => {
            this.environment.locale = val.lang;
        });

        this.environment.locale = currentLang;
    }

    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     */
    initializeI18n(): Promise<any>
    {
        this.enableI18nSupport();
        let promise: Promise<any> = new Promise((resolve: any) => {
            this.transService.get('Common.init').subscribe((val: any) => {
                resolve(true);
            });
        });
        return promise;
    }
}


/**
 * Factory method used by CoreModule in order to instantiate AppConfig provider
 *
 */
export function makeConfig(config: { [key: string]: any }, injector: Injector,
                           env: Environment): AppConfig
{
    // when empty we asume we are in Test. Application should always have some basic initialization
    // todo: Need to get back to this as this is temporary.

    let conf: AppConfig = new AppConfig(injector, env);
    conf.init(config);
    return conf;
}

