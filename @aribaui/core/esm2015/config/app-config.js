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
export const AppConfigToken = new InjectionToken('App.Config');
/** @type {?} */
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
            /** @type {?} */
            let values = MapWrapper.createFromStringMap(config);
            values.forEach((v, k) => this.set(k, v));
        }
        this.environment.setValue(AppConfig.AssetFolder, this.get(AppConfig.AssetFolder));
        /** @type {?} */
        let location = window.location.pathname + window.location.search;
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
        /** @type {?} */
        let globalConfig = readGlobalParam(AppConfig.AppConfigGlobalVar);
        if (isPresent(globalConfig)) {
            for (let key in globalConfig) {
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
        /** @type {?} */
        let val = this.get(key);
        return NumberWrapper.parseIntAutoRadix(val);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getBoolean(key) {
        /** @type {?} */
        let val = this.get(key);
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
        /** @type {?} */
        let nestedFlag = isNested ? '$' : '';
        /** @type {?} */
        let withEntity = `${AppConfig.RestApiContextUrl}.${nestedFlag}${entity}`;
        /** @type {?} */
        let url = this.get(withEntity) || this.get(AppConfig.RestApiContextUrl);
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
        /** @type {?} */
        const isMocked = this.getBoolean(AppConfig.ConnectionUseMockServer);
        /** @type {?} */
        const cnx = this.getRestApiContext();
        /** @type {?} */
        const host = this.getRestApiHost() || '';
        if (isMocked) {
            /** @type {?} */
            const prefix = this.get(AppConfig.AssetFolder);
            return `${prefix}${cnx || '/'}`;
        }
        /** @type {?} */
        let url = `${host}${cnx || '/'}`;
        return url;
    }
    /**
     * Used by factory method insider APP_INITIALIZER to pre-load i18n support
     *
     * @return {?}
     */
    initializeI18n() {
        /** @type {?} */
        let promise = new Promise((resolve) => {
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
    let conf = new AppConfig(injector, env);
    conf.init(config);
    return conf;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJjb25maWcvYXBwLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxjQUFjLEVBQVksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxjQUFjLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7OztBQVcvQyxhQUFhLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBUyxZQUFZLENBQUMsQ0FBQzs7QUFFdkUsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWV2QyxNQUFNOzs7OztJQTBDRixZQUFtQixRQUFrQixFQUFTLFdBQXdCO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQVU7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTs7UUFFbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDOztLQUV4Qzs7Ozs7Ozs7SUFRRCxJQUFJLENBQUMsTUFBOEI7UUFDL0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3BCLElBQUksTUFBTSxHQUFxQixVQUFVLENBQUMsbUJBQW1CLENBQU0sTUFBTSxDQUFDLENBQUM7WUFDM0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxT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QkFDbkIsVUFBVTs7Ozs7O3NCQU9QLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvTjlDLE1BQU0scUJBQXFCLE1BQThCLEVBQUUsUUFBa0IsRUFDbEQsR0FBZ0I7O0lBSXZDLElBQUksSUFBSSxHQUFjLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Q0FDZiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIGlzRGV2TW9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jvb2xlYW5XcmFwcGVyLCBpc1ByZXNlbnQsIE51bWJlcldyYXBwZXIsIHJlYWRHbG9iYWxQYXJhbX0gZnJvbSAnLi4vdXRpbHMvbGFuZyc7XG5pbXBvcnQge01hcFdyYXBwZXJ9IGZyb20gJy4uL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtFbnZpcm9ubWVudH0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5cblxuLyoqXG4gKiBTaW5jZSBvbiBlbnRlcnByaXNlIGxldmVsIHdlIG5lZWQgdG8gc3VwcG9ydCBhbGwgYXZhaWxhYmxlIGxvY2FsZXMgYXMgdXNlciBtaWdodCBjaGFuZ2VcbiAqIHRvIGRpZmZlcmVudCBsYW5nIGFueXRpbWUgd2UgbmVlZCB0byBpbXBvcnQgYWxsIGV4cGVjdGVkIGxvY2FsZXMgdGhhdCB3ZSB3YW50IHRvIHN1cHBvcnQuXG4gKlxuICogTm90ZTogIFJlbWVtYmVyIHdoZW4geW91IHdhbnQgdG8gc3VwcG9ydCBtb3JlIGxvY2FsZXMgeW91IG5lZWQgdG8gaW1wb3J0IHRoZW0gYW5kIHJlZ2lzdGVyXG4gKiB0aGVtIHVzaW5nIHJlZ2lzdGVyTG9jYWxlRGF0YVxuICovXG5leHBvcnQgY29uc3QgQXBwQ29uZmlnVG9rZW4gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignQXBwLkNvbmZpZycpO1xuXG5jb25zdCBTdXBvcnRlZExhbmd1YWdlcyA9IFsnZW4nLCAnZnInXTtcblxuXG4vKipcbiAqIFNpbXBsZSBDb25maWd1cmF0aW9uIGltcGxlbWVudGF0aW9uICB3aGljaCBsZXQgdXMgY29uZmlndXJlIGFwcGxpY2F0aW9uIGR1cmluZyBhIGJvb3RzdHJhcFxuICogcGhhc2UuIFlvdSBjYW4gcGFzcyB2YWx1ZXMgaW4gMyBkaWZmZXJlbnQgd2F5c1xuICpcbiAqIDEpIFVzaW5nIGltcG9ydCAtIGF0IHRoZSB0aW1lIHlvdSBpbXBvcnQgeW91ciBtb2R1bGVcbiAqIDIpIGluamVjdGVkIGFzIHNlcnZpY2UgYW5kIHlvdSBjYW4gc2V0IHZhbHVlc1xuICogMykgRnJvbSBTY3JpcHQgdGFnIG9yIGdsb2JhbGx5IGRlZmluZWQgVkFSIGR1cmluZyBhIGRlcGxveW1lbnRcbiAqXG4gKlxuICogVGhlcmUgaXMgYWxzbyBmcm9tIFVSTCBvcHRpb24gdGhhdCBpcyBmb3Igbm93IHRlbXBvcmFyeSBkaXNhYmxlZC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBDb25maWcge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgbm90IHJlZ3VsYXIgZW52LiBwYXJhbSB3ZSB1c2UgdGhpcyB0byBxdWVyeSBnbG9iYWwgdmFyIHRoYXQgY2FuIGJlIGF0dGFjaGVkIHRvXG4gICAgICogd2luZG93IHRvIHJlYWQgZW52LiBzZXR0aW5ncyB0aGF0IGNhbiBiZSBpbmplY3RlZCBieSBzZXJ2ZXJcbiAgICAgKlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBBcHBDb25maWdHbG9iYWxWYXIgPSAnQXBwQ29uZmlnR2xvYmFsJztcblxuICAgIHN0YXRpYyByZWFkb25seSBJc0Rldk1vZGUgPSAnZGV2bW9kZS5lbmFibGVkJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgVXNlckFnZW50ID0gJ3VzZXJhZ2VudCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IExhbmcgPSAnbGFuZyc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFN1cHBvcnRlZExhbmdzID0gJ3N1cHBvcnRlZGxhbmcnO1xuICAgIHN0YXRpYyByZWFkb25seSBEaXJlY3Rpb24gPSAnZGlyJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTmF2UGxhdGZvcm0gPSAncGxhdGZvcm0nO1xuICAgIHN0YXRpYyByZWFkb25seSBpMThuRW5hYmxlZCA9ICdpMThuLmVuYWJsZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBBcHBUaXRsZSA9ICdhcHAudGl0bGUnO1xuICAgIHN0YXRpYyByZWFkb25seSBSZXN0QXBpQ29udGV4dFVybCA9ICdyZXN0YXBpLmNvbnRleHQnO1xuICAgIHN0YXRpYyByZWFkb25seSBSZXN0QXBpSG9zdFVybCA9ICdyZXN0YXBpLmhvc3QnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb250ZW50VHlwZSA9ICdjb250ZW50LXR5cGUnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uUmV0cnlJbnRlcnZhbCA9ICdjb25uZWN0aW9uLnJldHJ5JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvbkFib3J0VGltZW91dCA9ICdjb25uZWN0aW9uLmFib3J0LXRpbWVvdXQnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uVXNlTW9ja1NlcnZlciA9ICdjb25uZWN0aW9uLm1vY2stc2VydmVyLmVuYWJsZWQnO1xuICAgIHN0YXRpYyByZWFkb25seSBDb25uZWN0aW9uTW9ja1NlcnZlclBhdGggPSAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5wYXRoJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgQ29ubmVjdGlvbk1vY2tTZXJ2ZXJSb3V0ZXMgPSAnY29ubmVjdGlvbi5tb2NrLXNlcnZlci5yb3V0ZXMnO1xuICAgIHN0YXRpYyByZWFkb25seSBEb21haW5VbmlxdWVOYW1lID0gJ2RvbWFpbi51bmlxdWVuYW1lJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgRG9tYWluUXVlcnkgPSAnZG9tYWluLnVuaXF1ZW5hbWUnO1xuICAgIHN0YXRpYyByZWFkb25seSBBc3NldEZvbGRlciA9ICdhc3NldC1mb2xkZXInO1xuICAgIHN0YXRpYyByZWFkb25seSBJblRlc3QgPSAnZW52LnRlc3QnO1xuXG4gICAgLyoqXG4gICAgICogU2luY2Ugd2UgdW5hYmxlIHRvIGNoYW5nZSBhbmQgc2ltdWxhdGUgVVJMIGR1cmluZyBuZyB0ZXN0IGJ1dCBzdGlsbCB3ZSBuZWVkIHRvIGJlIGFibGUgdG9cbiAgICAgKiB0ZXN0IHRoaXMgVVJMIHBhcnNpbmcgbG9naWMgdGhlbiBqdXN0IGZvciBhIFRlc3QgcHVycG9zZXMgdGhpcyBgZW52LnRlc3QudXJsYCBwcm9wZXJ0eVxuICAgICAqIHdpbGwgYmUgdXNlZCB0byBwYXNzIHVybCBkdXJpbmcgYSB0ZXN0LlxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBJblRlc3RVcmwgPSAnZW52LnRlc3QudXJsJztcblxuICAgIHByaXZhdGUgdmFsdWVzOiBNYXA8c3RyaW5nLCBhbnk+O1xuICAgIC8vIHByaXZhdGUgcXVlcnlWYWx1ZXM6IE1hcDxzdHJpbmcsICBhbnk+O1xuXG5cbiAgICB0ZXN0VXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5qZWN0b3I6IEluamVjdG9yLCBwdWJsaWMgZW52aXJvbm1lbnQ6IEVudmlyb25tZW50KSB7XG4gICAgICAgIC8vIHdlIGV4cGVjdCB0aGVyZSB3aWxsIGJlIGFsd2F5cyB3aW5kb3cgYXZhaWxhYmxlLlxuICAgICAgICB0aGlzLnZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIC8vIHRoaXMucXVlcnlWYWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgIGFueT4oKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQ2FsbGVkIGJ5IGZhY3RvcnkgbWV0aG9kIHRvIGluaXRpYWxpemUgdGhpcyBjb25maWcgY2xhc3NcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoY29uZmlnOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgICAgIHRoaXMuaW5pdERlZmF1bHRzKCk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoY29uZmlnKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlczogTWFwPHN0cmluZywgYW55PiA9IE1hcFdyYXBwZXIuY3JlYXRlRnJvbVN0cmluZ01hcDxhbnk+KGNvbmZpZyk7XG4gICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+IHRoaXMuc2V0KGssIHYpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnQuc2V0VmFsdWUoQXBwQ29uZmlnLkFzc2V0Rm9sZGVyLCB0aGlzLmdldChBcHBDb25maWcuQXNzZXRGb2xkZXIpKTtcblxuICAgICAgICBsZXQgbG9jYXRpb246IGFueSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgIGlmICh0aGlzLmVudmlyb25tZW50LmluVGVzdCkge1xuICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmdldChBcHBDb25maWcuSW5UZXN0VXJsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChpc1ByZXNlbnQobG9jYXRpb24pKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnBhcnNlUXVlcnlQYXJtcyhsb2NhdGlvbik7XG4gICAgICAgIC8vIH1cblxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHdpbGwgcmVhZCBnbG9iYWxseSBpbnNlcnRlZCBzY3JpcHRzIHRvIGluaXRpYWxpemUgYXBwbGljYXRpb24gZnJvbSB0aGUgc2VydmVyIHNpZGUuXG4gICAgICogVGhlIHNjcmlwdCBjYW4gZGlyZWN0bHkgZGVjbGFyZSB0aGUgdmFyaWFibGVzIDpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogICA8c2NyaXB0PlxuICAgICAqICAgICAgdmFyIEFwcENvbmZpZ0dsb2JhbCA9IHtcbiAgICAgKiAgICAgICAgICAgICAgICdhcHAucHJvMSc6ICd2YWx1ZTEnLFxuICAgICAqICAgICAgICAgICAgICAgJ2FwcC5wcm8yJzogJ3ZhbHVlMicsXG4gICAgICogICAgICAgICAgICAgICAnbGFuZyc6ICdjaCdcbiAgICAgKiAgICAgIH07XG4gICAgICogIDwvc2NyaXB0PlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogICBvciBpdCBjYW4gYmUgaW5jbHVkZWQgb24gdGhlIGluZGV4Lmh0bWwgcGFnZSBkdXJpbmcgYnVpbGQgdGltZS5cbiAgICAgKlxuICAgICAqICAgV2UgZXhwZWN0IHRoYXQgd2lsbCBmaW5kIHRoZSBgQXBwQ29uZmlnR2xvYmFsYFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBwYXJzZUdsb2JhbFBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGdsb2JhbENvbmZpZzogeyBbbmFtZTogc3RyaW5nXTogYW55IH0gPSByZWFkR2xvYmFsUGFyYW0oQXBwQ29uZmlnLkFwcENvbmZpZ0dsb2JhbFZhcik7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZ2xvYmFsQ29uZmlnKSkge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGdsb2JhbENvbmZpZykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgZ2xvYmFsQ29uZmlnW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlcyB0byBjb25maWd1cmF0aW9uLiB0byBtYWtlIHN1cmUgd2Ugd2lsbCBub3QgcnVuIGludG8gY2FzZS1zZW5zaXRpdmUgcHJvYmxlbXMgd2VcbiAgICAgKiBhcmUgY29udmVydGluZyBhbGwga2V5cyBpbnRvIGxvd2VyY2FzZVxuICAgICAqXG4gICAgICovXG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgdmFsdWUpO1xuXG4gICAgICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gQXBwQ29uZmlnLkluVGVzdCkge1xuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudC5pblRlc3QgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZXMgdG8gY29uZmlndXJhdGlvblxuICAgICAqIHRvZG86IGRvbnQgZG8gYWxsIHRoaXMgd2l0aCB0aGlzIGhhY2t5IHdheS4ganVzdCBpZiB5b3UgbmVlZCB0byBjaGVjayBjYXNlIHNlbnNpdGl2aXR5LCB0aGVuXG4gICAgICogc2ltcGx5IG1hcCBrZXlzIGZyb20gdGhpcy52YWx1ZXMgaW50byBsb3dlcmNhc2UgYW5kIHRoZW4gY2hlY2sgaWYgaXQgaGFzIGEga2V5XG4gICAgICovXG4gICAgZ2V0KGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWVzLmhhcyhrZXkudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5nZXQoa2V5LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgZ2V0TnVtYmVyKGtleTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBOdW1iZXJXcmFwcGVyLnBhcnNlSW50QXV0b1JhZGl4KHZhbCk7XG4gICAgfVxuXG5cbiAgICBnZXRCb29sZWFuKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLmdldChrZXkpO1xuICAgICAgICByZXR1cm4gQm9vbGVhbldyYXBwZXIuYm9sZWFuVmFsdWUodmFsKTtcbiAgICB9XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKlxuICAgIC8vICAqIENhbGxlZCBkdXJpbmcgaW5zdGFudGlhdGlvbiBhbmQgaXQgcmVhZCBxdWVyeSBwYXJhbXMgaWYgYW55IGFuZCB1c2UgdGhlbSBhc1xuICAgIC8vIGNvbmZpZ3VyYXRpb24uXG4gICAgLy8gICogV2UgbWlnaHQgd2FudCB0byBmb3JjZSB0byBwcmVmaXggZWFjaCBwYXJhbSB3aXRoIGVudi4gdG8gbWFrZSBzdXJlIHdlIGRvIG5vdCBzdG9yZVxuICAgIC8vIGV2ZXJ5dGhpbmcgKiAqLyBwcml2YXRlIHBhcnNlUXVlcnlQYXJtcyh1cmw6IHN0cmluZykgeyAgbGV0IHVybFNlcmlhbGl6ZXIgPSBuZXdcbiAgICAvLyBEZWZhdWx0VXJsU2VyaWFsaXplcigpOyBsZXQgdXJsVHJlZSA9IHVybFNlcmlhbGl6ZXIucGFyc2UodXJsKTsgIGlmXG4gICAgLy8gKGlzUHJlc2VudCh1cmxUcmVlLnF1ZXJ5UGFyYW1zKSkgeyAgZm9yIChsZXQga2V5IGluIHVybFRyZWUucXVlcnlQYXJhbXMpIHtcbiAgICAvLyB0aGlzLnF1ZXJ5VmFsdWVzLnNldChrZXkudG9Mb3dlckNhc2UoKSwgdXJsVHJlZS5xdWVyeVBhcmFtc1trZXldKTsgfSB9IH1cblxuICAgIHByaXZhdGUgaW5pdERlZmF1bHRzKCkge1xuXG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Jc0Rldk1vZGUsIGlzRGV2TW9kZSgpKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLlVzZXJBZ2VudCwgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuRGlyZWN0aW9uLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLk5hdlBsYXRmb3JtLCB3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtKTtcbiAgICAgICAgdGhpcy5zZXQoQXBwQ29uZmlnLkNvbnRlbnRUeXBlLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvblJldHJ5SW50ZXJ2YWwsIDUwMCk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlciwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvbk1vY2tTZXJ2ZXJQYXRoLCAnL21vY2stcm91dGluZycpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuaTE4bkVuYWJsZWQsIHRydWUpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuSW5UZXN0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Eb21haW5VbmlxdWVOYW1lLCAndW5pcXVlTmFtZScpO1xuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuRG9tYWluUXVlcnksICdxJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW52aXJvbm1lbnQuaW5UZXN0KSB7XG4gICAgICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQ29ubmVjdGlvbkFib3J0VGltZW91dCwgNTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5Db25uZWN0aW9uQWJvcnRUaW1lb3V0LCA4MDAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldChBcHBDb25maWcuQXNzZXRGb2xkZXIsICdhc3NldHMnKTtcblxuICAgICAgICBpZiAoIXRoaXMudmFsdWVzLmhhcyhBcHBDb25maWcuTGFuZykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5MYW5nLCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMuaGFzKEFwcENvbmZpZy5TdXBwb3J0ZWRMYW5ncykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEFwcENvbmZpZy5TdXBwb3J0ZWRMYW5ncywgU3Vwb3J0ZWRMYW5ndWFnZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRSZXN0QXBpQ29udGV4dFVybChlbnRpdHk6IHN0cmluZywgaXNOZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBuZXN0ZWRGbGFnID0gaXNOZXN0ZWQgPyAnJCcgOiAnJztcbiAgICAgICAgbGV0IHdpdGhFbnRpdHkgPSBgJHtBcHBDb25maWcuUmVzdEFwaUNvbnRleHRVcmx9LiR7bmVzdGVkRmxhZ30ke2VudGl0eX1gO1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXQod2l0aEVudGl0eSkgfHwgdGhpcy5nZXQoQXBwQ29uZmlnLlJlc3RBcGlDb250ZXh0VXJsKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHVybCkpIHtcbiAgICAgICAgICAgIGlmICgvXFwvJC9nLnRlc3QodXJsKSkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzdCBBUElVcmkgaXMgbm90IGNvbmZpZ3VyZWQnKTtcbiAgICB9XG5cblxuICAgIGdldFJlc3RBcGlDb250ZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChBcHBDb25maWcuUmVzdEFwaUNvbnRleHRVcmwpIHx8ICcnO1xuICAgIH1cblxuICAgIGdldFJlc3RBcGlIb3N0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChBcHBDb25maWcuUmVzdEFwaUhvc3RVcmwpIHx8ICcnO1xuICAgIH1cblxuICAgIGlzUHJvZHVjdGlvbk1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5nZXRCb29sZWFuKEFwcENvbmZpZy5Jc0Rldk1vZGUpO1xuICAgIH1cblxuICAgIGdldEJhc2VVcmwoKSB7XG4gICAgICAgIGNvbnN0IGlzTW9ja2VkID0gdGhpcy5nZXRCb29sZWFuKEFwcENvbmZpZy5Db25uZWN0aW9uVXNlTW9ja1NlcnZlcik7XG4gICAgICAgIGNvbnN0IGNueCA9IHRoaXMuZ2V0UmVzdEFwaUNvbnRleHQoKTtcbiAgICAgICAgY29uc3QgaG9zdCA9IHRoaXMuZ2V0UmVzdEFwaUhvc3QoKSB8fCAnJztcblxuICAgICAgICBpZiAoaXNNb2NrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuZ2V0KEFwcENvbmZpZy5Bc3NldEZvbGRlcik7XG4gICAgICAgICAgICByZXR1cm4gYCR7cHJlZml4fSR7Y254IHx8ICcvJ31gO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHVybCA9IGAke2hvc3R9JHtjbnggfHwgJy8nfWA7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGJ5IGZhY3RvcnkgbWV0aG9kIGluc2lkZXIgQVBQX0lOSVRJQUxJWkVSIHRvIHByZS1sb2FkIGkxOG4gc3VwcG9ydFxuICAgICAqXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZUkxOG4oKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB1c2VkIGJ5IENvcmVNb2R1bGUgaW4gb3JkZXIgdG8gaW5zdGFudGlhdGUgQXBwQ29uZmlnIHByb3ZpZGVyXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNvbmZpZyhjb25maWc6IHsgW2tleTogc3RyaW5nXTogYW55IH0sIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudjogRW52aXJvbm1lbnQpOiBBcHBDb25maWcge1xuICAgIC8vIHdoZW4gZW1wdHkgd2UgYXN1bWUgd2UgYXJlIGluIFRlc3QuIEFwcGxpY2F0aW9uIHNob3VsZCBhbHdheXMgaGF2ZSBzb21lIGJhc2ljIGluaXRpYWxpemF0aW9uXG4gICAgLy8gdG9kbzogTmVlZCB0byBnZXQgYmFjayB0byB0aGlzIGFzIHRoaXMgaXMgdGVtcG9yYXJ5LlxuXG4gICAgbGV0IGNvbmY6IEFwcENvbmZpZyA9IG5ldyBBcHBDb25maWcoaW5qZWN0b3IsIGVudik7XG4gICAgY29uZi5pbml0KGNvbmZpZyk7XG4gICAgcmV0dXJuIGNvbmY7XG59XG5cbiJdfQ==