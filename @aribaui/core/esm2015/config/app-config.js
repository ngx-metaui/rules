/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InjectionToken, isDevMode } from '@angular/core';
import { BooleanWrapper, isPresent, NumberWrapper, readGlobalParam } from '../utils/lang';
import { MapWrapper } from '../utils/collection';
/**
 * Since on enterprise level we need to support all available locales as user might change
 * to different lang anytime we need to import all expected locales that we want to support.
 *
 * Note:  Remember when you want to support more locales you need to import them and register
 * them using registerLocaleData
 */
export const /** @type {?} */ AppConfigToken = new InjectionToken('App.Config');
const /** @type {?} */ SuportedLanguages = ['en', 'fr'];
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
export class AppConfig {
    /**
     * @param {?} injector
     * @param {?} environment
     */
    constructor(injector, environment) {
        this.injector = injector;
        this.environment = environment;
        // we expect there will be always window available.
        this.values = new Map();
        // this.queryValues = new Map<string,  any>();
    }
    /**
     *
     * Called by factory method to initialize this config class
     *
     * @param {?} config
     * @return {?}
     */
    init(config) {
        this.initDefaults();
        if (isPresent(config)) {
            let /** @type {?} */ values = MapWrapper.createFromStringMap(config);
            values.forEach((v, k) => this.set(k, v));
        }
        this.environment.setValue(AppConfig.AssetFolder, this.get(AppConfig.AssetFolder));
        let /** @type {?} */ location = window.location.pathname + window.location.search;
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
     * @return {?}
     */
    parseGlobalParams() {
        let /** @type {?} */ globalConfig = readGlobalParam(AppConfig.AppConfigGlobalVar);
        if (isPresent(globalConfig)) {
            for (let /** @type {?} */ key in globalConfig) {
                this.values.set(key.toLowerCase(), globalConfig[key]);
            }
        }
    }
    /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        this.values.set(key.toLowerCase(), value);
        if (key.toLowerCase() === AppConfig.InTest) {
            this.environment.inTest = value;
        }
    }
    /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     * @param {?} key
     * @return {?}
     */
    get(key) {
        if (this.values.has(key.toLowerCase())) {
            return this.values.get(key.toLowerCase());
        }
        return null;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getNumber(key) {
        let /** @type {?} */ val = this.get(key);
        return NumberWrapper.parseIntAutoRadix(val);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getBoolean(key) {
        let /** @type {?} */ val = this.get(key);
        return BooleanWrapper.boleanValue(val);
    }
    /**
     * @return {?}
     */
    initDefaults() {
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
        }
        else {
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
    /**
     * @param {?} entity
     * @param {?=} isNested
     * @return {?}
     */
    getRestApiContextUrl(entity, isNested = false) {
        let /** @type {?} */ nestedFlag = isNested ? '$' : '';
        let /** @type {?} */ withEntity = `${AppConfig.RestApiContextUrl}.${nestedFlag}${entity}`;
        let /** @type {?} */ url = this.get(withEntity) || this.get(AppConfig.RestApiContextUrl);
        if (isPresent(url)) {
            if (/\/$/g.test(url)) {
                url = url.substring(0, url.length - 1);
            }
            return url;
        }
        throw new Error('Rest APIUri is not configured');
    }
    /**
     * @return {?}
     */
    getRestApiContext() {
        return this.get(AppConfig.RestApiContextUrl) || '';
    }
    /**
     * @return {?}
     */
    getRestApiHost() {
        return this.get(AppConfig.RestApiHostUrl) || '';
    }
    /**
     * @return {?}
     */
    isProductionMode() {
        return !this.getBoolean(AppConfig.IsDevMode);
    }
    /**
     * @return {?}
     */
    getBaseUrl() {
        const /** @type {?} */ isMocked = this.getBoolean(AppConfig.ConnectionUseMockServer);
        const /** @type {?} */ cnx = this.getRestApiContext();
        const /** @type {?} */ host = this.getRestApiHost() || '';
        if (isMocked) {
            const /** @type {?} */ prefix = this.get(AppConfig.AssetFolder);
            return `${prefix}${cnx || '/'}`;
        }
        let /** @type {?} */ url = `${host}${cnx || '/'}`;
        return url;
    }
    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     * @return {?}
     */
    initializeI18n() {
        let /** @type {?} */ promise = new Promise((resolve) => {
            resolve(true);
        });
        return promise;
    }
}
/**
 * This is not regular env. param we use this to query global var that can be attached to
 * window to read env. settings that can be injected by server
 *
 */
AppConfig.AppConfigGlobalVar = 'AppConfigGlobal';
AppConfig.IsDevMode = 'devmode.enabled';
AppConfig.UserAgent = 'useragent';
AppConfig.Lang = 'lang';
AppConfig.SupportedLangs = 'supportedlang';
AppConfig.Direction = 'dir';
AppConfig.NavPlatform = 'platform';
AppConfig.i18nEnabled = 'i18n.enabled';
AppConfig.AppTitle = 'app.title';
AppConfig.RestApiContextUrl = 'restapi.context';
AppConfig.RestApiHostUrl = 'restapi.host';
AppConfig.ContentType = 'content-type';
AppConfig.ConnectionRetryInterval = 'connection.retry';
AppConfig.ConnectionAbortTimeout = 'connection.abort-timeout';
AppConfig.ConnectionUseMockServer = 'connection.mock-server.enabled';
AppConfig.ConnectionMockServerPath = 'connection.mock-server.path';
AppConfig.ConnectionMockServerRoutes = 'connection.mock-server.routes';
AppConfig.DomainUniqueName = 'domain.uniquename';
AppConfig.DomainQuery = 'domain.uniquename';
AppConfig.AssetFolder = 'asset-folder';
AppConfig.InTest = 'env.test';
/**
 * Since we unable to change and simulate URL during ng test but still we need to be able to
 * test this URL parsing logic then just for a Test purposes this `env.test.url` property
 * will be used to pass url during a test.
 */
AppConfig.InTestUrl = 'env.test.url';
function AppConfig_tsickle_Closure_declarations() {
    /**
     * This is not regular env. param we use this to query global var that can be attached to
     * window to read env. settings that can be injected by server
     *
     * @type {?}
     */
    AppConfig.AppConfigGlobalVar;
    /** @type {?} */
    AppConfig.IsDevMode;
    /** @type {?} */
    AppConfig.UserAgent;
    /** @type {?} */
    AppConfig.Lang;
    /** @type {?} */
    AppConfig.SupportedLangs;
    /** @type {?} */
    AppConfig.Direction;
    /** @type {?} */
    AppConfig.NavPlatform;
    /** @type {?} */
    AppConfig.i18nEnabled;
    /** @type {?} */
    AppConfig.AppTitle;
    /** @type {?} */
    AppConfig.RestApiContextUrl;
    /** @type {?} */
    AppConfig.RestApiHostUrl;
    /** @type {?} */
    AppConfig.ContentType;
    /** @type {?} */
    AppConfig.ConnectionRetryInterval;
    /** @type {?} */
    AppConfig.ConnectionAbortTimeout;
    /** @type {?} */
    AppConfig.ConnectionUseMockServer;
    /** @type {?} */
    AppConfig.ConnectionMockServerPath;
    /** @type {?} */
    AppConfig.ConnectionMockServerRoutes;
    /** @type {?} */
    AppConfig.DomainUniqueName;
    /** @type {?} */
    AppConfig.DomainQuery;
    /** @type {?} */
    AppConfig.AssetFolder;
    /** @type {?} */
    AppConfig.InTest;
    /**
     * Since we unable to change and simulate URL during ng test but still we need to be able to
     * test this URL parsing logic then just for a Test purposes this `env.test.url` property
     * will be used to pass url during a test.
     * @type {?}
     */
    AppConfig.InTestUrl;
    /** @type {?} */
    AppConfig.prototype.values;
    /** @type {?} */
    AppConfig.prototype.testUrl;
    /** @type {?} */
    AppConfig.prototype.injector;
    /** @type {?} */
    AppConfig.prototype.environment;
}
/**
 * Factory method used by CoreModule in order to instantiate AppConfig provider
 *
 * @param {?} config
 * @param {?} injector
 * @param {?} env
 * @return {?}
 */
export function makeConfig(config, injector, env) {
    // when empty we asume we are in Test. Application should always have some basic initialization
    // todo: Need to get back to this as this is temporary.
    let /** @type {?} */ conf = new AppConfig(injector, env);
    conf.init(config);
    return conf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJjb25maWcvYXBwLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxjQUFjLEVBQVksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztBQVcvQyxNQUFNLENBQUMsdUJBQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFTLFlBQVksQ0FBQyxDQUFDO0FBRXZFLHVCQUFNLGlCQUFpQixHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBZXZDLE1BQU07Ozs7O0lBMENGLFlBQW1CLFFBQWtCLEVBQVMsV0FBd0I7UUFBbkQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFhOztRQUVsRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7O0tBRXhDOzs7Ozs7OztJQVFELElBQUksQ0FBQyxNQUE4QjtRQUMvQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixxQkFBSSxNQUFNLEdBQXFCLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBTSxNQUFNLENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMs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QkFDbkIsY0FBYzttQkFDbkIsVUFBVTs7Ozs7O3NCQU9QLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvTjlDLE1BQU0scUJBQXFCLE1BQThCLEVBQUUsUUFBa0IsRUFDbEQsR0FBZ0I7OztJQUl2QyxxQkFBSSxJQUFJLEdBQWMsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQztDQUNmIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGlvblRva2VuLCBJbmplY3RvciwgaXNEZXZNb2RlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Qm9vbGVhbldyYXBwZXIsIGlzUHJlc2VudCwgTnVtYmVyV3JhcHBlciwgcmVhZEdsb2JhbFBhcmFtfSBmcm9tICcuLi91dGlscy9sYW5nJztcbmltcG9ydCB7TWFwV3JhcHBlcn0gZnJvbSAnLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICcuL2Vudmlyb25tZW50JztcblxuXG4vKipcbiAqIFNpbmNlIG9uIGVudGVycHJpc2UgbGV2ZWwgd2UgbmVlZCB0byBzdXBwb3J0IGFsbCBhdmFpbGFibGUgbG9jYWxlcyBhcyB1c2VyIG1pZ2h0IGNoYW5nZVxuICogdG8gZGlmZmVyZW50IGxhbmcgYW55dGltZSB3ZSBuZWVkIHRvIGltcG9ydCBhbGwgZXhwZWN0ZWQgbG9jYWxlcyB0aGF0IHdlIHdhbnQgdG8gc3VwcG9ydC5cbiAqXG4gKiBOb3RlOiAgUmVtZW1iZXIgd2hlbiB5b3Ugd2FudCB0byBzdXBwb3J0IG1vcmUgbG9jYWxlcyB5b3UgbmVlZCB0byBpbXBvcnQgdGhlbSBhbmQgcmVnaXN0ZXJcbiAqIHRoZW0gdXNpbmcgcmVnaXN0ZXJMb2NhbGVEYXRhXG4gKi9cbmV4cG9ydCBjb25zdCBBcHBDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdBcHAuQ29uZmlnJyk7XG5cbmNvbnN0IFN1cG9ydGVkTGFuZ3VhZ2VzID0gWydlbicsICdmciddO1xuXG5cbi8qKlxuICogU2ltcGxlIENvbmZpZ3VyYXRpb24gaW1wbGVtZW50YXRpb24gIHdoaWNoIGxldCB1cyBjb25maWd1cmUgYXBwbGljYXRpb24gZHVyaW5nIGEgYm9vdHN0cmFwXG4gKiBwaGFzZS4gWW91IGNhbiBwYXNzIHZhbHVlcyBpbiAzIGRpZmZlcmVudCB3YXlzXG4gKlxuICogMSkgVXNpbmcgaW1wb3J0IC0gYXQgdGhlIHRpbWUgeW91IGltcG9ydCB5b3VyIG1vZHVsZVxuICogMikgaW5qZWN0ZWQgYXMgc2VydmljZSBhbmQgeW91IGNhbiBzZXQgdmFsdWVzXG4gKiAzKSBGcm9tIFNjcmlwdCB0YWcgb3IgZ2xvYmFsbHkgZGVmaW5lZCBWQVIgZHVyaW5nIGEgZGVwbG95bWVudFxuICpcbiAqXG4gKiBUaGVyZSBpcyBhbHNvIGZyb20gVVJMIG9wdGlvbiB0aGF0IGlzIGZvciBub3cgdGVtcG9yYXJ5IGRpc2FibGVkLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEFwcENvbmZpZyB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBub3QgcmVndWxhciBlbnYuIHBhcmFtIHdlIHVzZSB0aGlzIHRvIHF1ZXJ5IGdsb2JhbCB2YXIgdGhhdCBjYW4gYmUgYXR0YWNoZWQgdG9cbiAgICAgKiB3aW5kb3cgdG8gcmVhZCBlbnYuIHNldHRpbmdzIHRoYXQgY2FuIGJlIGluamVjdGVkIGJ5IHNlcnZlclxuICAgICAqXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IEFwcENvbmZpZ0dsb2JhbFZhciA9ICdBcHBDb25maWdHbG9iYWwnO1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IElzRGV2TW9kZSA9ICdkZXZtb2RlLmVuYWJsZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBVc2VyQWdlbnQgPSAndXNlcmFnZW50JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTGFuZyA9ICdsYW5nJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgU3VwcG9ydGVkTGFuZ3MgPSAnc3VwcG9ydGVkbGFuZyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IERpcmVjdGlvbiA9ICdkaXInO1xuICAgIHN0YXRpYyByZWFkb25seSBOYXZQbGF0Zm9ybSA9ICdwbGF0Zm9ybSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IGkxOG5FbmFibGVkID0gJ2kxOG4uZW5hYmxlZCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEFwcFRpdGxlID0gJ2FwcC50aXRsZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFJlc3RBcGlDb250ZXh0VXJsID0gJ3Jlc3RhcGkuY29udGV4dCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFJlc3RBcGlIb3N0VXJsID0gJ3Jlc3RhcGkuaG9zdCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbnRlbnRUeXBlID0gJ2NvbnRlbnQtdHlwZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25SZXRyeUludGVydmFsID0gJ2Nvbm5lY3Rpb24ucmV0cnknO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uQWJvcnRUaW1lb3V0ID0gJ2Nvbm5lY3Rpb24uYWJvcnQtdGltZW91dCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25Vc2VNb2NrU2VydmVyID0gJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIuZW5hYmxlZCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25Nb2NrU2VydmVyUGF0aCA9ICdjb25uZWN0aW9uLm1vY2stc2VydmVyLnBhdGgnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uTW9ja1NlcnZlclJvdXRlcyA9ICdjb25uZWN0aW9uLm1vY2stc2VydmVyLnJvdXRlcyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IERvbWFpblVuaXF1ZU5hbWUgPSAnZG9tYWluLnVuaXF1ZW5hbWUnO1xuICAgIHN0YXRpYyByZWFkb25seSBEb21haW5RdWVyeSA9ICdkb21haW4udW5pcXVlbmFtZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEFzc2V0Rm9sZGVyID0gJ2Fzc2V0LWZvbGRlcic7XG4gICAgc3RhdGljIHJlYWRvbmx5IEluVGVzdCA9ICdlbnYudGVzdCc7XG5cbiAgICAvKipcbiAgICAgKiBTaW5jZSB3ZSB1bmFibGUgdG8gY2hhbmdlIGFuZCBzaW11bGF0ZSBVUkwgZHVyaW5nIG5nIHRlc3QgYnV0IHN0aWxsIHdlIG5lZWQgdG8gYmUgYWJsZSB0b1xuICAgICAqIHRlc3QgdGhpcyBVUkwgcGFyc2luZyBsb2dpYyB0aGVuIGp1c3QgZm9yIGEgVGVzdCBwdXJwb3NlcyB0aGlzIGBlbnYudGVzdC51cmxgIHByb3BlcnR5XG4gICAgICogd2lsbCBiZSB1c2VkIHRvIHBhc3MgdXJsIGR1cmluZyBhIHRlc3QuXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IEluVGVzdFVybCA9ICdlbnYudGVzdC51cmwnO1xuXG4gICAgcHJpdmF0ZSB2YWx1ZXM6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgLy8gcHJpdmF0ZSBxdWVyeVZhbHVlczogTWFwPHN0cmluZywgIGFueT47XG5cblxuICAgIHRlc3RVcmw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpbmplY3RvcjogSW5qZWN0b3IsIHB1YmxpYyBlbnZpcm9ubWVudDogRW52aXJvbm1lbnQpIHtcbiAgICAgICAgLy8gd2UgZXhwZWN0IHRoZXJlIHdpbGwgYmUgYWx3YXlzIHdpbmRvdyBhdmFpbGFibGUuXG4gICAgICAgIHRoaXMudmFsdWVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgLy8gdGhpcy5xdWVyeVZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCAgYW55PigpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDYWxsZWQgYnkgZmFjdG9yeSBtZXRob2QgdG8gaW5pdGlhbGl6ZSB0aGlzIGNvbmZpZyBjbGFzc1xuICAgICAqXG4gICAgICovXG4gICAgaW5pdChjb25maWc6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcbiAgICAgICAgdGhpcy5pbml0RGVmYXVsdHMoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjb25maWcpKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+ID0gTWFwV3JhcHBlci5jcmVhdGVGcm9tU3RyaW5nTWFwPGFueT4oY29uZmlnKTtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4gdGhpcy5zZXQoaywgdikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudC5zZXRWYWx1ZShBcHBDb25maWcuQXNzZXRGb2xkZXIsIHRoaXMuZ2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlcikpO1xuXG4gICAgICAgIGxldCBsb2NhdGlvbjogYW55ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQuaW5UZXN0KSB7XG4gICAgICAgICAgICBsb2NhdGlvbiA9IHRoaXMuZ2V0KEFwcENvbmZpZy5JblRlc3RVcmwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKGlzUHJlc2VudChsb2NhdGlvbikpIHtcbiAgICAgICAgLy8gICAgIHRoaXMucGFyc2VRdWVyeVBhcm1zKGxvY2F0aW9uKTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCByZWFkIGdsb2JhbGx5IGluc2VydGVkIHNjcmlwdHMgdG8gaW5pdGlhbGl6ZSBhcHBsaWNhdGlvbiBmcm9tIHRoZSBzZXJ2ZXIgc2lkZS5cbiAgICAgKiBUaGUgc2NyaXB0IGNhbiBkaXJlY3RseSBkZWNsYXJlIHRoZSB2YXJpYWJsZXMgOlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAgIDxzY3JpcHQ+XG4gICAgICogICAgICB2YXIgQXBwQ29uZmlnR2xvYmFsID0ge1xuICAgICAqICAgICAgICAgICAgICAgJ2FwcC5wcm8xJzogJ3ZhbHVlMScsXG4gICAgICogICAgICAgICAgICAgICAnYXBwLnBybzInOiAndmFsdWUyJyxcbiAgICAgKiAgICAgICAgICAgICAgICdsYW5nJzogJ2NoJ1xuICAgICAqICAgICAgfTtcbiAgICAgKiAgPC9zY3JpcHQ+XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAgIG9yIGl0IGNhbiBiZSBpbmNsdWRlZCBvbiB0aGUgaW5kZXguaHRtbCBwYWdlIGR1cmluZyBidWlsZCB0aW1lLlxuICAgICAqXG4gICAgICogICBXZSBleHBlY3QgdGhhdCB3aWxsIGZpbmQgdGhlIGBBcHBDb25maWdHbG9iYWxgXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIHBhcnNlR2xvYmFsUGFyYW1zKCk6IHZvaWQge1xuICAgICAgICBsZXQgZ2xvYmFsQ29uZmlnOiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfSA9IHJlYWRHbG9iYWxQYXJhbShBcHBDb25maWcuQXBwQ29uZmlnR2xvYmFsVmFyKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChnbG9iYWxDb25maWcpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gZ2xvYmFsQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMuc2V0KGtleS50b0xvd2VyQ2FzZSgpLCBnbG9iYWxDb25maWdba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWVzIHRvIGNvbmZpZ3VyYXRpb24uIHRvIG1ha2Ugc3VyZSB3ZSB3aWxsIG5vdCBydW4gaW50byBjYXNlLXNlbnNpdGl2ZSBwcm9ibGVtcyB3ZVxuICAgICAqIGFyZSBjb252ZXJ0aW5nIGFsbCBrZXlzIGludG8gbG93ZXJjYXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KGtleS50b0xvd2VyQ2FzZSgpLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSBBcHBDb25maWcuSW5UZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50LmluVGVzdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlcyB0byBjb25maWd1cmF0aW9uXG4gICAgICogdG9kbzogZG9udCBkbyBhbGwgdGhpcyB3aXRoIHRoaXMgaGFja3kgd2F5LiBqdXN0IGlmIHlvdSBuZWVkIHRvIGNoZWNrIGNhc2Ugc2Vuc2l0aXZpdHksIHRoZW5cbiAgICAgKiBzaW1wbHkgbWFwIGtleXMgZnJvbSB0aGlzLnZhbHVlcyBpbnRvIGxvd2VyY2FzZSBhbmQgdGhlbiBjaGVjayBpZiBpdCBoYXMgYSBrZXlcbiAgICAgKi9cbiAgICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZXMuaGFzKGtleS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmdldChrZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBnZXROdW1iZXIoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIE51bWJlcldyYXBwZXIucGFyc2VJbnRBdXRvUmFkaXgodmFsKTtcbiAgICB9XG5cblxuICAgIGdldEJvb2xlYW4oa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBCb29sZWFuV3JhcHBlci5ib2xlYW5WYWx1ZSh2YWwpO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqXG4gICAgLy8gICogQ2FsbGVkIGR1cmluZyBpbnN0YW50aWF0aW9uIGFuZCBpdCByZWFkIHF1ZXJ5IHBhcmFtcyBpZiBhbnkgYW5kIHVzZSB0aGVtIGFzXG4gICAgLy8gY29uZmlndXJhdGlvbi5cbiAgICAvLyAgKiBXZSBtaWdodCB3YW50IHRvIGZvcmNlIHRvIHByZWZpeCBlYWNoIHBhcmFtIHdpdGggZW52LiB0byBtYWtlIHN1cmUgd2UgZG8gbm90IHN0b3JlXG4gICAgLy8gZXZlcnl0aGluZyAqICovIHByaXZhdGUgcGFyc2VRdWVyeVBhcm1zKHVybDogc3RyaW5nKSB7ICBsZXQgdXJsU2VyaWFsaXplciA9IG5ld1xuICAgIC8vIERlZmF1bHRVcmxTZXJpYWxpemVyKCk7IGxldCB1cmxUcmVlID0gdXJsU2VyaWFsaXplci5wYXJzZSh1cmwpOyAgaWZcbiAgICAvLyAoaXNQcmVzZW50KHVybFRyZWUucXVlcnlQYXJhbXMpKSB7ICBmb3IgKGxldCBrZXkgaW4gdXJsVHJlZS5xdWVyeVBhcmFtcykge1xuICAgIC8vIHRoaXMucXVlcnlWYWx1ZXMuc2V0KGtleS50b0xvd2VyQ2FzZSgpLCB1cmxUcmVlLnF1ZXJ5UGFyYW1zW2tleV0pOyB9IH0gfVxuXG4gICAgcHJpdmF0ZSBpbml0RGVmYXVsdHMoKSB7XG5cbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLklzRGV2TW9kZSwgaXNEZXZNb2RlKCkpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuVXNlckFnZW50LCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5EaXJlY3Rpb24sIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kaXIpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuTmF2UGxhdGZvcm0sIHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29udGVudFR5cGUsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uUmV0cnlJbnRlcnZhbCwgNTAwKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uTW9ja1NlcnZlclBhdGgsICcvbW9jay1yb3V0aW5nJyk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5pMThuRW5hYmxlZCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5JblRlc3QsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkRvbWFpblVuaXF1ZU5hbWUsICd1bmlxdWVOYW1lJyk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Eb21haW5RdWVyeSwgJ3EnKTtcblxuICAgICAgICBpZiAodGhpcy5lbnZpcm9ubWVudC5pblRlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uQWJvcnRUaW1lb3V0LCA1MDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25BYm9ydFRpbWVvdXQsIDgwMDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlciwgJ2Fzc2V0cycpO1xuXG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMuaGFzKEFwcENvbmZpZy5MYW5nKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkxhbmcsIHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlcy5oYXMoQXBwQ29uZmlnLlN1cHBvcnRlZExhbmdzKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLlN1cHBvcnRlZExhbmdzLCBTdXBvcnRlZExhbmd1YWdlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldFJlc3RBcGlDb250ZXh0VXJsKGVudGl0eTogc3RyaW5nLCBpc05lc3RlZDogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG5lc3RlZEZsYWcgPSBpc05lc3RlZCA/ICckJyA6ICcnO1xuICAgICAgICBsZXQgd2l0aEVudGl0eSA9IGAke0FwcENvbmZpZy5SZXN0QXBpQ29udGV4dFVybH0uJHtuZXN0ZWRGbGFnfSR7ZW50aXR5fWA7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldCh3aXRoRW50aXR5KSB8fCB0aGlzLmdldChBcHBDb25maWcuUmVzdEFwaUNvbnRleHRVcmwpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQodXJsKSkge1xuICAgICAgICAgICAgaWYgKC9cXC8kL2cudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXN0IEFQSVVyaSBpcyBub3QgY29uZmlndXJlZCcpO1xuICAgIH1cblxuXG4gICAgZ2V0UmVzdEFwaUNvbnRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KEFwcENvbmZpZy5SZXN0QXBpQ29udGV4dFVybCkgfHwgJyc7XG4gICAgfVxuXG4gICAgZ2V0UmVzdEFwaUhvc3QoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KEFwcENvbmZpZy5SZXN0QXBpSG9zdFVybCkgfHwgJyc7XG4gICAgfVxuXG4gICAgaXNQcm9kdWN0aW9uTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmdldEJvb2xlYW4oQXBwQ29uZmlnLklzRGV2TW9kZSk7XG4gICAgfVxuXG4gICAgZ2V0QmFzZVVybCgpIHtcbiAgICAgICAgY29uc3QgaXNNb2NrZWQgPSB0aGlzLmdldEJvb2xlYW4oQXBwQ29uZmlnLkNvbm5lY3Rpb25Vc2VNb2NrU2VydmVyKTtcbiAgICAgICAgY29uc3QgY254ID0gdGhpcy5nZXRSZXN0QXBpQ29udGV4dCgpO1xuICAgICAgICBjb25zdCBob3N0ID0gdGhpcy5nZXRSZXN0QXBpSG9zdCgpIHx8ICcnO1xuXG4gICAgICAgIGlmIChpc01vY2tlZCkge1xuICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gdGhpcy5nZXQoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBgJHtwcmVmaXh9JHtjbnggfHwgJy8nfWA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXJsID0gYCR7aG9zdH0ke2NueCB8fCAnLyd9YDtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVzZWQgYnkgZmFjdG9yeSBtZXRob2QgaW5zaWRlciBBUFBfSU5JVElBTElaRVIgdG8gcHJlLWxvYWQgaTE4biBzdXBwb3J0XG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0aWFsaXplSTE4bigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgcHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHVzZWQgYnkgQ29yZU1vZHVsZSBpbiBvcmRlciB0byBpbnN0YW50aWF0ZSBBcHBDb25maWcgcHJvdmlkZXJcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlQ29uZmlnKGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSwgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52OiBFbnZpcm9ubWVudCk6IEFwcENvbmZpZyB7XG4gICAgLy8gd2hlbiBlbXB0eSB3ZSBhc3VtZSB3ZSBhcmUgaW4gVGVzdC4gQXBwbGljYXRpb24gc2hvdWxkIGFsd2F5cyBoYXZlIHNvbWUgYmFzaWMgaW5pdGlhbGl6YXRpb25cbiAgICAvLyB0b2RvOiBOZWVkIHRvIGdldCBiYWNrIHRvIHRoaXMgYXMgdGhpcyBpcyB0ZW1wb3JhcnkuXG5cbiAgICBsZXQgY29uZjogQXBwQ29uZmlnID0gbmV3IEFwcENvbmZpZyhpbmplY3RvciwgZW52KTtcbiAgICBjb25mLmluaXQoY29uZmlnKTtcbiAgICByZXR1cm4gY29uZjtcbn1cblxuIl19