/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { InjectionToken, isDevMode } from '@angular/core';
import { BooleanWrapper, isPresent, NumberWrapper, readGlobalParam } from '../utils/lang';
import { MapWrapper } from '../utils/collection';
/** *
 * Since on enterprise level we need to support all available locales as user might change
 * to different lang anytime we need to import all expected locales that we want to support.
 *
 * Note:  Remember when you want to support more locales you need to import them and register
 * them using registerLocaleData
  @type {?} */
export var AppConfigToken = new InjectionToken('App.Config');
/** @type {?} */
var SuportedLanguages = ['en', 'fr'];
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
var AppConfig = /** @class */ (function () {
    function AppConfig(injector, environment) {
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
     */
    /**
     *
     * Called by factory method to initialize this config class
     *
     * @param {?} config
     * @return {?}
     */
    AppConfig.prototype.init = /**
     *
     * Called by factory method to initialize this config class
     *
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        this.initDefaults();
        if (isPresent(config)) {
            /** @type {?} */
            var values = MapWrapper.createFromStringMap(config);
            values.forEach(function (v, k) { return _this.set(k, v); });
        }
        this.environment.setValue(AppConfig.AssetFolder, this.get(AppConfig.AssetFolder));
        /** @type {?} */
        var location = window.location.pathname + window.location.search;
        if (this.environment.inTest) {
            location = this.get(AppConfig.InTestUrl);
        }
        // if (isPresent(location)) {
        //     this.parseQueryParms(location);
        // }
    };
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
    AppConfig.prototype.parseGlobalParams = /**
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
    function () {
        /** @type {?} */
        var globalConfig = readGlobalParam(AppConfig.AppConfigGlobalVar);
        if (isPresent(globalConfig)) {
            for (var key in globalConfig) {
                this.values.set(key.toLowerCase(), globalConfig[key]);
            }
        }
    };
    /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     */
    /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    AppConfig.prototype.set = /**
     * Sets values to configuration. to make sure we will not run into case-sensitive problems we
     * are converting all keys into lowercase
     *
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.values.set(key.toLowerCase(), value);
        if (key.toLowerCase() === AppConfig.InTest) {
            this.environment.inTest = value;
        }
    };
    /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     */
    /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     * @param {?} key
     * @return {?}
     */
    AppConfig.prototype.get = /**
     * Sets values to configuration
     * todo: dont do all this with this hacky way. just if you need to check case sensitivity, then
     * simply map keys from this.values into lowercase and then check if it has a key
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.values.has(key.toLowerCase())) {
            return this.values.get(key.toLowerCase());
        }
        return null;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    AppConfig.prototype.getNumber = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var val = this.get(key);
        return NumberWrapper.parseIntAutoRadix(val);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    AppConfig.prototype.getBoolean = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var val = this.get(key);
        return BooleanWrapper.boleanValue(val);
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.initDefaults = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} entity
     * @param {?=} isNested
     * @return {?}
     */
    AppConfig.prototype.getRestApiContextUrl = /**
     * @param {?} entity
     * @param {?=} isNested
     * @return {?}
     */
    function (entity, isNested) {
        if (isNested === void 0) { isNested = false; }
        /** @type {?} */
        var nestedFlag = isNested ? '$' : '';
        /** @type {?} */
        var withEntity = AppConfig.RestApiContextUrl + "." + nestedFlag + entity;
        /** @type {?} */
        var url = this.get(withEntity) || this.get(AppConfig.RestApiContextUrl);
        if (isPresent(url)) {
            if (/\/$/g.test(url)) {
                url = url.substring(0, url.length - 1);
            }
            return url;
        }
        throw new Error('Rest APIUri is not configured');
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.getRestApiContext = /**
     * @return {?}
     */
    function () {
        return this.get(AppConfig.RestApiContextUrl) || '';
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.getRestApiHost = /**
     * @return {?}
     */
    function () {
        return this.get(AppConfig.RestApiHostUrl) || '';
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.isProductionMode = /**
     * @return {?}
     */
    function () {
        return !this.getBoolean(AppConfig.IsDevMode);
    };
    /**
     * @return {?}
     */
    AppConfig.prototype.getBaseUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isMocked = this.getBoolean(AppConfig.ConnectionUseMockServer);
        /** @type {?} */
        var cnx = this.getRestApiContext();
        /** @type {?} */
        var host = this.getRestApiHost() || '';
        if (isMocked) {
            /** @type {?} */
            var prefix = this.get(AppConfig.AssetFolder);
            return "" + prefix + (cnx || '/');
        }
        /** @type {?} */
        var url = "" + host + (cnx || '/');
        return url;
    };
    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     */
    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     * @return {?}
     */
    AppConfig.prototype.initializeI18n = /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var promise = new Promise(function (resolve) {
            resolve(true);
        });
        return promise;
    };
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
    return AppConfig;
}());
export { AppConfig };
if (false) {
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
    /** @type {?} */
    var conf = new AppConfig(injector, env);
    conf.init(config);
    return conf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJjb25maWcvYXBwLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxjQUFjLEVBQVksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztBQVcvQyxXQUFhLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBUyxZQUFZLENBQUMsQ0FBQzs7QUFFdkUsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUF5RG5DLG1CQUFtQixRQUFrQixFQUFTLFdBQXdCO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTs7UUFFbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDOztLQUV4QztJQUdEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsd0JBQUk7Ozs7Ozs7SUFBSixVQUFLLE1BQThCO1FBQW5DLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDcEIsSUFBSSxNQUFNLEdBQXFCLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBTSxNQUFNLENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBTSxFQUFFLENBQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDO1NBQ3REO1FBRUQs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V0FBVztxQkFDaEIsTUFBTTsrQkFDSSxlQUFlOzBCQUNwQixLQUFLOzRCQUNILFVBQVU7NEJBQ1YsY0FBYzt5QkFDakIsV0FBVztrQ0FDRixpQkFBaUI7K0JBQ3BCLGNBQWM7NEJBQ2pCLGNBQWM7d0NBQ0Ysa0JBQWtCO3VDQUNuQiwwQkFBMEI7d0NBQ3pCLGdDQUFnQzt5Q0FDL0IsNkJBQTZCOzJDQUMzQiwrQkFBK0I7aUNBQ3pDLG1CQUFtQjs0QkFDeEIsbUJBQW1COzRCQUNuQixjQUFjO3VCQUNuQixVQUFVOzs7Ozs7MEJBT1AsY0FBYztvQkFwRjlDOztTQWtEYSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc1B0QixNQUFNLHFCQUFxQixNQUE4QixFQUFFLFFBQWtCLEVBQ2xELEdBQWdCOztJQUl2QyxJQUFJLElBQUksR0FBYyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDO0NBQ2YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCb29sZWFuV3JhcHBlciwgaXNQcmVzZW50LCBOdW1iZXJXcmFwcGVyLCByZWFkR2xvYmFsUGFyYW19IGZyb20gJy4uL3V0aWxzL2xhbmcnO1xuaW1wb3J0IHtNYXBXcmFwcGVyfSBmcm9tICcuLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7RW52aXJvbm1lbnR9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuXG5cbi8qKlxuICogU2luY2Ugb24gZW50ZXJwcmlzZSBsZXZlbCB3ZSBuZWVkIHRvIHN1cHBvcnQgYWxsIGF2YWlsYWJsZSBsb2NhbGVzIGFzIHVzZXIgbWlnaHQgY2hhbmdlXG4gKiB0byBkaWZmZXJlbnQgbGFuZyBhbnl0aW1lIHdlIG5lZWQgdG8gaW1wb3J0IGFsbCBleHBlY3RlZCBsb2NhbGVzIHRoYXQgd2Ugd2FudCB0byBzdXBwb3J0LlxuICpcbiAqIE5vdGU6ICBSZW1lbWJlciB3aGVuIHlvdSB3YW50IHRvIHN1cHBvcnQgbW9yZSBsb2NhbGVzIHlvdSBuZWVkIHRvIGltcG9ydCB0aGVtIGFuZCByZWdpc3RlclxuICogdGhlbSB1c2luZyByZWdpc3RlckxvY2FsZURhdGFcbiAqL1xuZXhwb3J0IGNvbnN0IEFwcENvbmZpZ1Rva2VuID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ0FwcC5Db25maWcnKTtcblxuY29uc3QgU3Vwb3J0ZWRMYW5ndWFnZXMgPSBbJ2VuJywgJ2ZyJ107XG5cblxuLyoqXG4gKiBTaW1wbGUgQ29uZmlndXJhdGlvbiBpbXBsZW1lbnRhdGlvbiAgd2hpY2ggbGV0IHVzIGNvbmZpZ3VyZSBhcHBsaWNhdGlvbiBkdXJpbmcgYSBib290c3RyYXBcbiAqIHBoYXNlLiBZb3UgY2FuIHBhc3MgdmFsdWVzIGluIDMgZGlmZmVyZW50IHdheXNcbiAqXG4gKiAxKSBVc2luZyBpbXBvcnQgLSBhdCB0aGUgdGltZSB5b3UgaW1wb3J0IHlvdXIgbW9kdWxlXG4gKiAyKSBpbmplY3RlZCBhcyBzZXJ2aWNlIGFuZCB5b3UgY2FuIHNldCB2YWx1ZXNcbiAqIDMpIEZyb20gU2NyaXB0IHRhZyBvciBnbG9iYWxseSBkZWZpbmVkIFZBUiBkdXJpbmcgYSBkZXBsb3ltZW50XG4gKlxuICpcbiAqIFRoZXJlIGlzIGFsc28gZnJvbSBVUkwgb3B0aW9uIHRoYXQgaXMgZm9yIG5vdyB0ZW1wb3JhcnkgZGlzYWJsZWQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQXBwQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIG5vdCByZWd1bGFyIGVudi4gcGFyYW0gd2UgdXNlIHRoaXMgdG8gcXVlcnkgZ2xvYmFsIHZhciB0aGF0IGNhbiBiZSBhdHRhY2hlZCB0b1xuICAgICAqIHdpbmRvdyB0byByZWFkIGVudi4gc2V0dGluZ3MgdGhhdCBjYW4gYmUgaW5qZWN0ZWQgYnkgc2VydmVyXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgQXBwQ29uZmlnR2xvYmFsVmFyID0gJ0FwcENvbmZpZ0dsb2JhbCc7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgSXNEZXZNb2RlID0gJ2Rldm1vZGUuZW5hYmxlZCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFVzZXJBZ2VudCA9ICd1c2VyYWdlbnQnO1xuICAgIHN0YXRpYyByZWFkb25seSBMYW5nID0gJ2xhbmcnO1xuICAgIHN0YXRpYyByZWFkb25seSBTdXBwb3J0ZWRMYW5ncyA9ICdzdXBwb3J0ZWRsYW5nJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRGlyZWN0aW9uID0gJ2Rpcic7XG4gICAgc3RhdGljIHJlYWRvbmx5IE5hdlBsYXRmb3JtID0gJ3BsYXRmb3JtJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgaTE4bkVuYWJsZWQgPSAnaTE4bi5lbmFibGVkJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQXBwVGl0bGUgPSAnYXBwLnRpdGxlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgUmVzdEFwaUNvbnRleHRVcmwgPSAncmVzdGFwaS5jb250ZXh0JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgUmVzdEFwaUhvc3RVcmwgPSAncmVzdGFwaS5ob3N0JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29udGVudFR5cGUgPSAnY29udGVudC10eXBlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvblJldHJ5SW50ZXJ2YWwgPSAnY29ubmVjdGlvbi5yZXRyeSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25BYm9ydFRpbWVvdXQgPSAnY29ubmVjdGlvbi5hYm9ydC10aW1lb3V0JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIgPSAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5lbmFibGVkJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvbk1vY2tTZXJ2ZXJQYXRoID0gJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIucGF0aCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IENvbm5lY3Rpb25Nb2NrU2VydmVyUm91dGVzID0gJ2Nvbm5lY3Rpb24ubW9jay1zZXJ2ZXIucm91dGVzJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRG9tYWluVW5pcXVlTmFtZSA9ICdkb21haW4udW5pcXVlbmFtZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IERvbWFpblF1ZXJ5ID0gJ2RvbWFpbi51bmlxdWVuYW1lJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQXNzZXRGb2xkZXIgPSAnYXNzZXQtZm9sZGVyJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgSW5UZXN0ID0gJ2Vudi50ZXN0JztcblxuICAgIC8qKlxuICAgICAqIFNpbmNlIHdlIHVuYWJsZSB0byBjaGFuZ2UgYW5kIHNpbXVsYXRlIFVSTCBkdXJpbmcgbmcgdGVzdCBidXQgc3RpbGwgd2UgbmVlZCB0byBiZSBhYmxlIHRvXG4gICAgICogdGVzdCB0aGlzIFVSTCBwYXJzaW5nIGxvZ2ljIHRoZW4ganVzdCBmb3IgYSBUZXN0IHB1cnBvc2VzIHRoaXMgYGVudi50ZXN0LnVybGAgcHJvcGVydHlcbiAgICAgKiB3aWxsIGJlIHVzZWQgdG8gcGFzcyB1cmwgZHVyaW5nIGEgdGVzdC5cbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgSW5UZXN0VXJsID0gJ2Vudi50ZXN0LnVybCc7XG5cbiAgICBwcml2YXRlIHZhbHVlczogTWFwPHN0cmluZywgYW55PjtcbiAgICAvLyBwcml2YXRlIHF1ZXJ5VmFsdWVzOiBNYXA8c3RyaW5nLCAgYW55PjtcblxuXG4gICAgdGVzdFVybDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGluamVjdG9yOiBJbmplY3RvciwgcHVibGljIGVudmlyb25tZW50OiBFbnZpcm9ubWVudCkge1xuICAgICAgICAvLyB3ZSBleHBlY3QgdGhlcmUgd2lsbCBiZSBhbHdheXMgd2luZG93IGF2YWlsYWJsZS5cbiAgICAgICAgdGhpcy52YWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgICAgICAvLyB0aGlzLnF1ZXJ5VmFsdWVzID0gbmV3IE1hcDxzdHJpbmcsICBhbnk+KCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIENhbGxlZCBieSBmYWN0b3J5IG1ldGhvZCB0byBpbml0aWFsaXplIHRoaXMgY29uZmlnIGNsYXNzXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KGNvbmZpZzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xuICAgICAgICB0aGlzLmluaXREZWZhdWx0cygpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbmZpZykpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZXM6IE1hcDxzdHJpbmcsIGFueT4gPSBNYXBXcmFwcGVyLmNyZWF0ZUZyb21TdHJpbmdNYXA8YW55Pihjb25maWcpO1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB0aGlzLnNldChrLCB2KSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVudmlyb25tZW50LnNldFZhbHVlKEFwcENvbmZpZy5Bc3NldEZvbGRlciwgdGhpcy5nZXQoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyKSk7XG5cbiAgICAgICAgbGV0IGxvY2F0aW9uOiBhbnkgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAgICAgICBpZiAodGhpcy5lbnZpcm9ubWVudC5pblRlc3QpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uID0gdGhpcy5nZXQoQXBwQ29uZmlnLkluVGVzdFVybCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAoaXNQcmVzZW50KGxvY2F0aW9uKSkge1xuICAgICAgICAvLyAgICAgdGhpcy5wYXJzZVF1ZXJ5UGFybXMobG9jYXRpb24pO1xuICAgICAgICAvLyB9XG5cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhpcyB3aWxsIHJlYWQgZ2xvYmFsbHkgaW5zZXJ0ZWQgc2NyaXB0cyB0byBpbml0aWFsaXplIGFwcGxpY2F0aW9uIGZyb20gdGhlIHNlcnZlciBzaWRlLlxuICAgICAqIFRoZSBzY3JpcHQgY2FuIGRpcmVjdGx5IGRlY2xhcmUgdGhlIHZhcmlhYmxlcyA6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICAgPHNjcmlwdD5cbiAgICAgKiAgICAgIHZhciBBcHBDb25maWdHbG9iYWwgPSB7XG4gICAgICogICAgICAgICAgICAgICAnYXBwLnBybzEnOiAndmFsdWUxJyxcbiAgICAgKiAgICAgICAgICAgICAgICdhcHAucHJvMic6ICd2YWx1ZTInLFxuICAgICAqICAgICAgICAgICAgICAgJ2xhbmcnOiAnY2gnXG4gICAgICogICAgICB9O1xuICAgICAqICA8L3NjcmlwdD5cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICAgb3IgaXQgY2FuIGJlIGluY2x1ZGVkIG9uIHRoZSBpbmRleC5odG1sIHBhZ2UgZHVyaW5nIGJ1aWxkIHRpbWUuXG4gICAgICpcbiAgICAgKiAgIFdlIGV4cGVjdCB0aGF0IHdpbGwgZmluZCB0aGUgYEFwcENvbmZpZ0dsb2JhbGBcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgcGFyc2VHbG9iYWxQYXJhbXMoKTogdm9pZCB7XG4gICAgICAgIGxldCBnbG9iYWxDb25maWc6IHsgW25hbWU6IHN0cmluZ106IGFueSB9ID0gcmVhZEdsb2JhbFBhcmFtKEFwcENvbmZpZy5BcHBDb25maWdHbG9iYWxWYXIpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGdsb2JhbENvbmZpZykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBnbG9iYWxDb25maWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcy5zZXQoa2V5LnRvTG93ZXJDYXNlKCksIGdsb2JhbENvbmZpZ1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZXMgdG8gY29uZmlndXJhdGlvbi4gdG8gbWFrZSBzdXJlIHdlIHdpbGwgbm90IHJ1biBpbnRvIGNhc2Utc2Vuc2l0aXZlIHByb2JsZW1zIHdlXG4gICAgICogYXJlIGNvbnZlcnRpbmcgYWxsIGtleXMgaW50byBsb3dlcmNhc2VcbiAgICAgKlxuICAgICAqL1xuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlcy5zZXQoa2V5LnRvTG93ZXJDYXNlKCksIHZhbHVlKTtcblxuICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IEFwcENvbmZpZy5JblRlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnQuaW5UZXN0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWVzIHRvIGNvbmZpZ3VyYXRpb25cbiAgICAgKiB0b2RvOiBkb250IGRvIGFsbCB0aGlzIHdpdGggdGhpcyBoYWNreSB3YXkuIGp1c3QgaWYgeW91IG5lZWQgdG8gY2hlY2sgY2FzZSBzZW5zaXRpdml0eSwgdGhlblxuICAgICAqIHNpbXBseSBtYXAga2V5cyBmcm9tIHRoaXMudmFsdWVzIGludG8gbG93ZXJjYXNlIGFuZCB0aGVuIGNoZWNrIGlmIGl0IGhhcyBhIGtleVxuICAgICAqL1xuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlcy5oYXMoa2V5LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMuZ2V0KGtleS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGdldE51bWJlcihrZXk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmdldChrZXkpO1xuICAgICAgICByZXR1cm4gTnVtYmVyV3JhcHBlci5wYXJzZUludEF1dG9SYWRpeCh2YWwpO1xuICAgIH1cblxuXG4gICAgZ2V0Qm9vbGVhbihrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsID0gdGhpcy5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW5XcmFwcGVyLmJvbGVhblZhbHVlKHZhbCk7XG4gICAgfVxuXG4gICAgLy8gLyoqXG4gICAgLy8gICpcbiAgICAvLyAgKiBDYWxsZWQgZHVyaW5nIGluc3RhbnRpYXRpb24gYW5kIGl0IHJlYWQgcXVlcnkgcGFyYW1zIGlmIGFueSBhbmQgdXNlIHRoZW0gYXNcbiAgICAvLyBjb25maWd1cmF0aW9uLlxuICAgIC8vICAqIFdlIG1pZ2h0IHdhbnQgdG8gZm9yY2UgdG8gcHJlZml4IGVhY2ggcGFyYW0gd2l0aCBlbnYuIHRvIG1ha2Ugc3VyZSB3ZSBkbyBub3Qgc3RvcmVcbiAgICAvLyBldmVyeXRoaW5nICogKi8gcHJpdmF0ZSBwYXJzZVF1ZXJ5UGFybXModXJsOiBzdHJpbmcpIHsgIGxldCB1cmxTZXJpYWxpemVyID0gbmV3XG4gICAgLy8gRGVmYXVsdFVybFNlcmlhbGl6ZXIoKTsgbGV0IHVybFRyZWUgPSB1cmxTZXJpYWxpemVyLnBhcnNlKHVybCk7ICBpZlxuICAgIC8vIChpc1ByZXNlbnQodXJsVHJlZS5xdWVyeVBhcmFtcykpIHsgIGZvciAobGV0IGtleSBpbiB1cmxUcmVlLnF1ZXJ5UGFyYW1zKSB7XG4gICAgLy8gdGhpcy5xdWVyeVZhbHVlcy5zZXQoa2V5LnRvTG93ZXJDYXNlKCksIHVybFRyZWUucXVlcnlQYXJhbXNba2V5XSk7IH0gfSB9XG5cbiAgICBwcml2YXRlIGluaXREZWZhdWx0cygpIHtcblxuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuSXNEZXZNb2RlLCBpc0Rldk1vZGUoKSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Vc2VyQWdlbnQsIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkRpcmVjdGlvbiwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRpcik7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5OYXZQbGF0Zm9ybSwgd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db250ZW50VHlwZSwgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25SZXRyeUludGVydmFsLCA1MDApO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25Nb2NrU2VydmVyUGF0aCwgJy9tb2NrLXJvdXRpbmcnKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLmkxOG5FbmFibGVkLCB0cnVlKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkluVGVzdCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuRG9tYWluVW5pcXVlTmFtZSwgJ3VuaXF1ZU5hbWUnKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkRvbWFpblF1ZXJ5LCAncScpO1xuXG4gICAgICAgIGlmICh0aGlzLmVudmlyb25tZW50LmluVGVzdCkge1xuICAgICAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbm5lY3Rpb25BYm9ydFRpbWVvdXQsIDUwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvbkFib3J0VGltZW91dCwgODAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyLCAnYXNzZXRzJyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlcy5oYXMoQXBwQ29uZmlnLkxhbmcpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuTGFuZywgd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudmFsdWVzLmhhcyhBcHBDb25maWcuU3VwcG9ydGVkTGFuZ3MpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuU3VwcG9ydGVkTGFuZ3MsIFN1cG9ydGVkTGFuZ3VhZ2VzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZ2V0UmVzdEFwaUNvbnRleHRVcmwoZW50aXR5OiBzdHJpbmcsIGlzTmVzdGVkOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbmVzdGVkRmxhZyA9IGlzTmVzdGVkID8gJyQnIDogJyc7XG4gICAgICAgIGxldCB3aXRoRW50aXR5ID0gYCR7QXBwQ29uZmlnLlJlc3RBcGlDb250ZXh0VXJsfS4ke25lc3RlZEZsYWd9JHtlbnRpdHl9YDtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2V0KHdpdGhFbnRpdHkpIHx8IHRoaXMuZ2V0KEFwcENvbmZpZy5SZXN0QXBpQ29udGV4dFVybCk7XG5cbiAgICAgICAgaWYgKGlzUHJlc2VudCh1cmwpKSB7XG4gICAgICAgICAgICBpZiAoL1xcLyQvZy50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jlc3QgQVBJVXJpIGlzIG5vdCBjb25maWd1cmVkJyk7XG4gICAgfVxuXG5cbiAgICBnZXRSZXN0QXBpQ29udGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoQXBwQ29uZmlnLlJlc3RBcGlDb250ZXh0VXJsKSB8fCAnJztcbiAgICB9XG5cbiAgICBnZXRSZXN0QXBpSG9zdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoQXBwQ29uZmlnLlJlc3RBcGlIb3N0VXJsKSB8fCAnJztcbiAgICB9XG5cbiAgICBpc1Byb2R1Y3Rpb25Nb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuZ2V0Qm9vbGVhbihBcHBDb25maWcuSXNEZXZNb2RlKTtcbiAgICB9XG5cbiAgICBnZXRCYXNlVXJsKCkge1xuICAgICAgICBjb25zdCBpc01vY2tlZCA9IHRoaXMuZ2V0Qm9vbGVhbihBcHBDb25maWcuQ29ubmVjdGlvblVzZU1vY2tTZXJ2ZXIpO1xuICAgICAgICBjb25zdCBjbnggPSB0aGlzLmdldFJlc3RBcGlDb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IGhvc3QgPSB0aGlzLmdldFJlc3RBcGlIb3N0KCkgfHwgJyc7XG5cbiAgICAgICAgaWYgKGlzTW9ja2VkKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVmaXggPSB0aGlzLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0ke2NueCB8fCAnLyd9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB1cmwgPSBgJHtob3N0fSR7Y254IHx8ICcvJ31gO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXNlZCBieSBmYWN0b3J5IG1ldGhvZCBpbnNpZGVyIEFQUF9JTklUSUFMSVpFUiB0byBwcmUtbG9hZCBpMThuIHN1cHBvcnRcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXRpYWxpemVJMThuKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxufVxuXG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdXNlZCBieSBDb3JlTW9kdWxlIGluIG9yZGVyIHRvIGluc3RhbnRpYXRlIEFwcENvbmZpZyBwcm92aWRlclxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VDb25maWcoY29uZmlnOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBlbnY6IEVudmlyb25tZW50KTogQXBwQ29uZmlnIHtcbiAgICAvLyB3aGVuIGVtcHR5IHdlIGFzdW1lIHdlIGFyZSBpbiBUZXN0LiBBcHBsaWNhdGlvbiBzaG91bGQgYWx3YXlzIGhhdmUgc29tZSBiYXNpYyBpbml0aWFsaXphdGlvblxuICAgIC8vIHRvZG86IE5lZWQgdG8gZ2V0IGJhY2sgdG8gdGhpcyBhcyB0aGlzIGlzIHRlbXBvcmFyeS5cblxuICAgIGxldCBjb25mOiBBcHBDb25maWcgPSBuZXcgQXBwQ29uZmlnKGluamVjdG9yLCBlbnYpO1xuICAgIGNvbmYuaW5pdChjb25maWcpO1xuICAgIHJldHVybiBjb25mO1xufVxuXG4iXX0=