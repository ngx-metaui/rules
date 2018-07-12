/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { unimplemented } from '@aribaui/core';
export var /** @type {?} */ DATA_SOURCE = new InjectionToken('DATA_SOURCE');
/**
 * DataSource describes basic functionality for handling stream of data specific to component
 *
 * It is expected that DataSource will be defined as component provider using
 *
 * \@Components ({
 *      ...
 *      providers:[
 *
 *          provide: DATA_SOURCE, useClass: ChooserDataSourcePlainArrayExample,
 * deps: [DataProviders, DataFinders]
 *      ]
 *
 * })
 *
 *
 * so all the dependencies (DataProviders, DataFinders) are properly injected.
 *
 * DataProvider uses open() method to broadcast changes to all the subscribers in reactive way.
 * Or you can use instant() method to retrieve current state of this DataSource (sync)
 *
 * @abstract
 */
var DataSource = /** @class */ (function () {
    /**
     *
     * Each DataSource have injected DataProviders and DataFinders to retrieve concrete
     * implementation
     *
     */
    function DataSource(dataProviders, finders) {
        this.dataProviders = dataProviders;
        this.finders = finders;
    }
    /**
     * Returns a data instantly from the internal state of DataProvider
     */
    /**
     * Returns a data instantly from the internal state of DataProvider
     * @template T
     * @return {?}
     */
    DataSource.prototype.instant = /**
     * Returns a data instantly from the internal state of DataProvider
     * @template T
     * @return {?}
     */
    function () {
        return unimplemented();
    };
    DataSource.MaxLength = 10;
    DataSource.MaxRecentSelected = 5;
    return DataSource;
}());
export { DataSource };
function DataSource_tsickle_Closure_declarations() {
    /** @type {?} */
    DataSource.MaxLength;
    /** @type {?} */
    DataSource.MaxRecentSelected;
    /** @type {?} */
    DataSource.prototype.dataProviders;
    /** @type {?} */
    DataSource.prototype.finders;
    /**
     * Allows to initialize data source and pass some additional values
     *
     *
     * @abstract
     * @param {...?} args
     * @return {?}
     */
    DataSource.prototype.init = function (args) { };
    /**
     * DataProviders works with stream of data and this opens up the channel in order to
     * listen and react for any changes that could happen inside DataProvider
     * @abstract
     * @template T
     * @return {?}
     */
    DataSource.prototype.open = function () { };
    /**
     * Release subscription to DataProvider
     * @abstract
     * @return {?}
     */
    DataSource.prototype.close = function () { };
}
/**
 * To make initialization easier we have this common format.
 * @record
 */
export function DSInitParams() { }
function DSInitParams_tsickle_Closure_declarations() {
    /**
     * List of values or the object type name we want to render
     * @type {?|undefined}
     */
    DSInitParams.prototype.obj;
    /**
     * Which find we want to load FullText or Predicate
     * @type {?}
     */
    DSInitParams.prototype.queryType;
    /**
     * Can specify lookup Key to narrow down the search to specific field. If lookup key is
     * null, items are assumed to be strings
     * @type {?|undefined}
     */
    DSInitParams.prototype.lookupKey;
    /**
     * Tells if the Chooser is single or multi select
     * @type {?}
     */
    DSInitParams.prototype.multiselect;
    /**
     * Option to pass custom DataProvider instead letting DataProviders to find match
     * @type {?|undefined}
     */
    DSInitParams.prototype.dataProvider;
    /**
     * Option to pass custom DataFinder instead letting DataFinders to find match
     * @type {?|undefined}
     */
    DSInitParams.prototype.dataFinder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9kYXRhL2RhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFxQkEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSzVDLE1BQU0sQ0FBQyxxQkFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQWEsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE2QnJFOzs7OztPQUtHO0lBQ0gsb0JBQXNCLGFBQTZCLEVBQVksT0FBcUI7UUFBOUQsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQVksWUFBTyxHQUFQLE9BQU8sQ0FBYztLQUVuRjtJQXVCRDs7T0FFRzs7Ozs7O0lBQ0gsNEJBQU87Ozs7O0lBQVA7UUFHSSxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDMUI7MkJBekMyQixFQUFFO21DQUNNLENBQUM7cUJBdER6Qzs7U0FtRHNCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQge0RhdGFQcm92aWRlcnN9IGZyb20gJy4vZGF0YS1wcm92aWRlcnMnO1xuaW1wb3J0IHtEYXRhRmluZGVyc30gZnJvbSAnLi9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7RGF0YUZpbmRlciwgUXVlcnlUeXBlfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1maW5kZXJzJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5cblxuZXhwb3J0IGNvbnN0IERBVEFfU09VUkNFID0gbmV3IEluamVjdGlvblRva2VuPERhdGFTb3VyY2U+KCdEQVRBX1NPVVJDRScpO1xuXG4vKipcbiAqIERhdGFTb3VyY2UgZGVzY3JpYmVzIGJhc2ljIGZ1bmN0aW9uYWxpdHkgZm9yIGhhbmRsaW5nIHN0cmVhbSBvZiBkYXRhIHNwZWNpZmljIHRvIGNvbXBvbmVudFxuICpcbiAqIEl0IGlzIGV4cGVjdGVkIHRoYXQgRGF0YVNvdXJjZSB3aWxsIGJlIGRlZmluZWQgYXMgY29tcG9uZW50IHByb3ZpZGVyIHVzaW5nXG4gKlxuICogQENvbXBvbmVudHMgKHtcbiAqICAgICAgLi4uXG4gKiAgICAgIHByb3ZpZGVyczpbXG4gKlxuICogICAgICAgICAgcHJvdmlkZTogREFUQV9TT1VSQ0UsIHVzZUNsYXNzOiBDaG9vc2VyRGF0YVNvdXJjZVBsYWluQXJyYXlFeGFtcGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVwczogW0RhdGFQcm92aWRlcnMsIERhdGFGaW5kZXJzXVxuICogICAgICBdXG4gKlxuICogfSlcbiAqXG4gKlxuICogc28gYWxsIHRoZSBkZXBlbmRlbmNpZXMgKERhdGFQcm92aWRlcnMsIERhdGFGaW5kZXJzKSBhcmUgcHJvcGVybHkgaW5qZWN0ZWQuXG4gKlxuICogRGF0YVByb3ZpZGVyIHVzZXMgb3BlbigpIG1ldGhvZCB0byBicm9hZGNhc3QgY2hhbmdlcyB0byBhbGwgdGhlIHN1YnNjcmliZXJzIGluIHJlYWN0aXZlIHdheS5cbiAqIE9yIHlvdSBjYW4gdXNlIGluc3RhbnQoKSBtZXRob2QgdG8gcmV0cmlldmUgY3VycmVudCBzdGF0ZSBvZiB0aGlzIERhdGFTb3VyY2UgKHN5bmMpXG4gKlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0YVNvdXJjZVxue1xuICAgIHN0YXRpYyByZWFkb25seSBNYXhMZW5ndGggPSAxMDtcbiAgICBzdGF0aWMgcmVhZG9ubHkgTWF4UmVjZW50U2VsZWN0ZWQgPSA1O1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFYWNoIERhdGFTb3VyY2UgaGF2ZSBpbmplY3RlZCBEYXRhUHJvdmlkZXJzIGFuZCBEYXRhRmluZGVycyB0byByZXRyaWV2ZSBjb25jcmV0ZVxuICAgICAqIGltcGxlbWVudGF0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGF0YVByb3ZpZGVycz86IERhdGFQcm92aWRlcnMsIHByb3RlY3RlZCBmaW5kZXJzPzogRGF0YUZpbmRlcnMpXG4gICAge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIHRvIGluaXRpYWxpemUgZGF0YSBzb3VyY2UgYW5kIHBhc3Mgc29tZSBhZGRpdGlvbmFsIHZhbHVlc1xuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpbml0KC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqIERhdGFQcm92aWRlcnMgd29ya3Mgd2l0aCBzdHJlYW0gb2YgZGF0YSBhbmQgdGhpcyBvcGVucyB1cCB0aGUgY2hhbm5lbCBpbiBvcmRlciB0b1xuICAgICAqIGxpc3RlbiBhbmQgcmVhY3QgZm9yIGFueSBjaGFuZ2VzIHRoYXQgY291bGQgaGFwcGVuIGluc2lkZSBEYXRhUHJvdmlkZXJcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBvcGVuPFQ+KCk6IE9ic2VydmFibGU8VFtdPjtcblxuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZSBzdWJzY3JpcHRpb24gdG8gRGF0YVByb3ZpZGVyXG4gICAgICovXG4gICAgYWJzdHJhY3QgY2xvc2UoKTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGRhdGEgaW5zdGFudGx5IGZyb20gdGhlIGludGVybmFsIHN0YXRlIG9mIERhdGFQcm92aWRlclxuICAgICAqL1xuICAgIGluc3RhbnQ8VD4oKTogVFtdXG4gICAge1xuXG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG59XG5cblxuLyoqXG4gKiBUbyBtYWtlIGluaXRpYWxpemF0aW9uIGVhc2llciB3ZSBoYXZlIHRoaXMgY29tbW9uIGZvcm1hdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEU0luaXRQYXJhbXNcbntcbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIHZhbHVlcyBvciB0aGUgb2JqZWN0IHR5cGUgbmFtZSB3ZSB3YW50IHRvIHJlbmRlclxuICAgICAqL1xuICAgIG9iaj86IGFueTtcblxuICAgIC8qKlxuICAgICAqIFdoaWNoIGZpbmQgd2Ugd2FudCB0byBsb2FkIEZ1bGxUZXh0IG9yIFByZWRpY2F0ZVxuICAgICAqL1xuICAgIHF1ZXJ5VHlwZTogUXVlcnlUeXBlO1xuXG4gICAgLyoqXG4gICAgICogQ2FuIHNwZWNpZnkgbG9va3VwIEtleSB0byBuYXJyb3cgZG93biB0aGUgc2VhcmNoIHRvIHNwZWNpZmljIGZpZWxkLiBJZiBsb29rdXAga2V5IGlzXG4gICAgICogbnVsbCwgaXRlbXMgYXJlIGFzc3VtZWQgdG8gYmUgc3RyaW5nc1xuICAgICAqL1xuICAgIGxvb2t1cEtleT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHRoZSBDaG9vc2VyIGlzIHNpbmdsZSBvciBtdWx0aSBzZWxlY3RcbiAgICAgKi9cbiAgICBtdWx0aXNlbGVjdDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbiB0byBwYXNzIGN1c3RvbSBEYXRhUHJvdmlkZXIgaW5zdGVhZCBsZXR0aW5nIERhdGFQcm92aWRlcnMgdG8gZmluZCBtYXRjaFxuICAgICAqL1xuICAgIGRhdGFQcm92aWRlcj86IERhdGFQcm92aWRlcjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRvIHBhc3MgY3VzdG9tIERhdGFGaW5kZXIgaW5zdGVhZCBsZXR0aW5nIERhdGFGaW5kZXJzIHRvIGZpbmQgbWF0Y2hcbiAgICAgKi9cbiAgICBkYXRhRmluZGVyPzogRGF0YUZpbmRlcjtcbn1cbiJdfQ==