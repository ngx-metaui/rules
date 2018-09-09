/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DataSource } from '../../core/data/data-source';
import { ChooserState } from './chooser-state';
import { assert, isArray, isBlank, isPresent, ListWrapper } from '@aribaui/core';
/**
 * Concrete DataSource implementation for the Chooser component. There are two ways how to use it:
 *
 * 1) You can use default DataSource injected inside component constructor and just call
 * initialize to configure it with correct DataProvider and DataFinder:
 *
 *
 * ```
 *   this.dataSource.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 * and then you can use it to simply retrieve data or run queries.
 *
 * 2) You will instantiate your own DataSource and pass it into the component using [dataSource]
 * binding
 *
 * ```
 *
 *   this.ds = new ChooserDataSource(this.data, this.finders);
 *   this.ds.init({
 *               obj: this.list,
 *               queryType: QueryType.FullText,
 *               state: null,
 *               multiselect: this.multiselect
 *           });
 *
 * ```
 *
 *
 */
export class ChooserDataSource extends DataSource {
    /**
     * @param {?} dataProviders
     * @param {?} finders
     */
    constructor(dataProviders, finders) {
        super(dataProviders, finders);
        this.dataProviders = dataProviders;
        this.finders = finders;
    }
    /**
     * To initialize this DataSource with current DataFinder and Provider as well as state we use
     * an interface DSChooserInitParams to have all init values typed checked
     *
     *
     * @param {...?} args
     * @return {?}
     */
    init(...args) {
        if (isBlank(args) || args.length !== 1 && !isDSChooserInitParams(args[0])) {
            throw new Error('You need to initialize DS with (DSChooserInitParams)');
        }
        /** @type {?} */
        let init = args[0];
        this.dataProvider = isPresent(init.dataProvider) ? init.dataProvider
            : this.dataProviders.find(init.obj);
        this.dataFinder = isPresent(init.dataFinder) ? init.dataFinder
            : this.finders.find(this.dataProvider, init.queryType);
        assert(isPresent(this.dataProvider) && isPresent(this.dataFinder), 'DataSource incorrectly initialized. (DataProvider, DataFinder) missing. ');
        if (isPresent(init.state)) {
            this.state = init.state;
        }
        else {
            this.state = new ChooserState(null, init.multiselect);
        }
        this.dataFinder.lookupKey = init.lookupKey;
        this.state.lookupKey = init.lookupKey;
    }
    /**
     * @param {?} pattern
     * @param {?} max
     * @return {?}
     */
    find(pattern, max) {
        this.state.pattern = pattern;
        this.state.lastFullMatchPattern = pattern;
        if (pattern.length === 0) {
            return;
        }
        if (pattern === '*') {
            // query everything
            pattern = '';
        }
        /** @type {?} */
        let origKey = this.dataFinder.lookupKey;
        this.dataFinder.lookupKey = this.state.lookupKey;
        this.dataFinder.forData(this.dataProvider).match(pattern, max)
            .subscribe((result) => {
            this.state.matches = result;
            if (this.state.multiselect) {
                for (let i = 0; i < this.state.selectedObjects().length; i++) {
                    /** @type {?} */
                    let item = this.state.selectedObjects()[i];
                    ListWrapper.removeIfExist(this.state.matches, item);
                }
            }
            this.dataFinder.lookupKey = origKey;
        });
    }
    /**
     *
     * When multiselect this method checks if we need to show SHOW MORE label under the selected
     * items. We do not want show e.g. 50 selection under the chooser that would take up whole
     * page.
     *
     * @return {?}
     */
    showMoreSelected() {
        return this.state.selectedObjects().length >= DataSource.MaxRecentSelected;
    }
    /**
     * @template T
     * @return {?}
     */
    open() {
        return this.dataProvider.dataChanges.asObservable();
    }
    /**
     * @return {?}
     */
    close() {
        this.dataProvider = null;
        this.dataFinder = null;
        this.state = null;
    }
    /**
     * @template T
     * @return {?}
     */
    instant() {
        return this.dataProvider.data();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        this.state.addMode = true;
        if (isArray(value)) {
            /** @type {?} */
            let items = value;
            items.forEach((item) => this.state.updatedSelectedObjects(item));
        }
        else {
            this.state.updatedSelectedObjects(value);
        }
        this.state.addMode = false;
    }
    /**
     * @return {?}
     */
    get lookupKey() {
        return this.dataFinder.lookupKey;
    }
}
if (false) {
    /**
     * Matching dataProviders and finders
     * @type {?}
     */
    ChooserDataSource.prototype.dataProvider;
    /** @type {?} */
    ChooserDataSource.prototype.dataFinder;
    /**
     * Special object to keep current state of this chooser
     * @type {?}
     */
    ChooserDataSource.prototype.state;
    /** @type {?} */
    ChooserDataSource.prototype.dataProviders;
    /** @type {?} */
    ChooserDataSource.prototype.finders;
}
/**
 * @param {?} init
 * @return {?}
 */
export function isDSChooserInitParams(init) {
    return isPresent(init.obj) || isPresent(init.queryType);
}
/**
 * To make initialization easier we have this common format.
 * @record
 */
export function DSChooserInitParams() { }
/**
 * Chooser state keeping information what is currently selected , result of the last match
 * @type {?|undefined}
 */
DSChooserInitParams.prototype.state;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Nob29zZXIvY2hvb3Nlci1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBa0JBLE9BQU8sRUFBQyxVQUFVLEVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUtyRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQy9FLE1BQU0sd0JBQXlCLFNBQVEsVUFBVTs7Ozs7SUFnQjdDLFlBQW1CLGFBQTRCLEVBQVMsT0FBb0I7UUFFeEUsS0FBSyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUZmLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBYTtLQUczRTs7Ozs7Ozs7O0lBU0QsSUFBSSxDQUFDLEdBQUcsSUFBVztRQUVmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDM0U7O1FBQ0QsSUFBSSxJQUFJLEdBQXdCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQ2hFLENBQUMsQ0FBQyxJQUFJLENB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IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQge0RhdGFTb3VyY2UsIERTSW5pdFBhcmFtc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtc291cmNlJztcbmltcG9ydCB7RGF0YUZpbmRlciwgRGF0YUZpbmRlcnN9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLWZpbmRlcnMnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJzfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1wcm92aWRlcnMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7RGF0YVByb3ZpZGVyfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YXR5cGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQge0Nob29zZXJTdGF0ZX0gZnJvbSAnLi9jaG9vc2VyLXN0YXRlJztcbmltcG9ydCB7YXNzZXJ0LCBpc0FycmF5LCBpc0JsYW5rLCBpc1ByZXNlbnQsIExpc3RXcmFwcGVyfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuLyoqXG4gKiBDb25jcmV0ZSBEYXRhU291cmNlIGltcGxlbWVudGF0aW9uIGZvciB0aGUgQ2hvb3NlciBjb21wb25lbnQuIFRoZXJlIGFyZSB0d28gd2F5cyBob3cgdG8gdXNlIGl0OlxuICpcbiAqIDEpIFlvdSBjYW4gdXNlIGRlZmF1bHQgRGF0YVNvdXJjZSBpbmplY3RlZCBpbnNpZGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIGFuZCBqdXN0IGNhbGxcbiAqIGluaXRpYWxpemUgdG8gY29uZmlndXJlIGl0IHdpdGggY29ycmVjdCBEYXRhUHJvdmlkZXIgYW5kIERhdGFGaW5kZXI6XG4gKlxuICpcbiAqIGBgYFxuICogICB0aGlzLmRhdGFTb3VyY2UuaW5pdCh7XG4gKiAgICAgICAgICAgICAgIG9iajogdGhpcy5saXN0LFxuICogICAgICAgICAgICAgICBxdWVyeVR5cGU6IFF1ZXJ5VHlwZS5GdWxsVGV4dCxcbiAqICAgICAgICAgICAgICAgc3RhdGU6IG51bGwsXG4gKiAgICAgICAgICAgICAgIG11bHRpc2VsZWN0OiB0aGlzLm11bHRpc2VsZWN0XG4gKiAgICAgICAgICAgfSk7XG4gKlxuICogYGBgXG4gKlxuICogYW5kIHRoZW4geW91IGNhbiB1c2UgaXQgdG8gc2ltcGx5IHJldHJpZXZlIGRhdGEgb3IgcnVuIHF1ZXJpZXMuXG4gKlxuICogMikgWW91IHdpbGwgaW5zdGFudGlhdGUgeW91ciBvd24gRGF0YVNvdXJjZSBhbmQgcGFzcyBpdCBpbnRvIHRoZSBjb21wb25lbnQgdXNpbmcgW2RhdGFTb3VyY2VdXG4gKiBiaW5kaW5nXG4gKlxuICogYGBgXG4gKlxuICogICB0aGlzLmRzID0gbmV3IENob29zZXJEYXRhU291cmNlKHRoaXMuZGF0YSwgdGhpcy5maW5kZXJzKTtcbiAqICAgdGhpcy5kcy5pbml0KHtcbiAqICAgICAgICAgICAgICAgb2JqOiB0aGlzLmxpc3QsXG4gKiAgICAgICAgICAgICAgIHF1ZXJ5VHlwZTogUXVlcnlUeXBlLkZ1bGxUZXh0LFxuICogICAgICAgICAgICAgICBzdGF0ZTogbnVsbCxcbiAqICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRoaXMubXVsdGlzZWxlY3RcbiAqICAgICAgICAgICB9KTtcbiAqXG4gKiBgYGBcbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQ2hvb3NlckRhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlXG57XG5cbiAgICAvKipcbiAgICAgKiBNYXRjaGluZyBkYXRhUHJvdmlkZXJzIGFuZCBmaW5kZXJzXG4gICAgICovXG4gICAgcHJpdmF0ZSBkYXRhUHJvdmlkZXI6IERhdGFQcm92aWRlcjxhbnk+O1xuICAgIHByaXZhdGUgZGF0YUZpbmRlcjogRGF0YUZpbmRlcjtcblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lhbCBvYmplY3QgdG8ga2VlcCBjdXJyZW50IHN0YXRlIG9mIHRoaXMgY2hvb3NlclxuICAgICAqL1xuICAgIHN0YXRlOiBDaG9vc2VyU3RhdGU7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRhUHJvdmlkZXJzOiBEYXRhUHJvdmlkZXJzLCBwdWJsaWMgZmluZGVyczogRGF0YUZpbmRlcnMpXG4gICAge1xuICAgICAgICBzdXBlcihkYXRhUHJvdmlkZXJzLCBmaW5kZXJzKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRvIGluaXRpYWxpemUgdGhpcyBEYXRhU291cmNlIHdpdGggY3VycmVudCBEYXRhRmluZGVyIGFuZCBQcm92aWRlciBhcyB3ZWxsIGFzIHN0YXRlIHdlIHVzZVxuICAgICAqIGFuIGludGVyZmFjZSBEU0Nob29zZXJJbml0UGFyYW1zIHRvIGhhdmUgYWxsIGluaXQgdmFsdWVzIHR5cGVkIGNoZWNrZWRcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCguLi5hcmdzOiBhbnlbXSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc0JsYW5rKGFyZ3MpIHx8IGFyZ3MubGVuZ3RoICE9PSAxICYmICFpc0RTQ2hvb3NlckluaXRQYXJhbXMoYXJnc1swXSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gaW5pdGlhbGl6ZSBEUyB3aXRoIChEU0Nob29zZXJJbml0UGFyYW1zKScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbml0OiBEU0Nob29zZXJJbml0UGFyYW1zID0gYXJnc1swXTtcblxuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IGlzUHJlc2VudChpbml0LmRhdGFQcm92aWRlcikgPyBpbml0LmRhdGFQcm92aWRlclxuICAgICAgICAgICAgOiB0aGlzLmRhdGFQcm92aWRlcnMuZmluZChpbml0Lm9iaik7XG5cbiAgICAgICAgdGhpcy5kYXRhRmluZGVyID0gaXNQcmVzZW50KGluaXQuZGF0YUZpbmRlcikgPyBpbml0LmRhdGFGaW5kZXJcbiAgICAgICAgICAgIDogdGhpcy5maW5kZXJzLmZpbmQodGhpcy5kYXRhUHJvdmlkZXIsIGluaXQucXVlcnlUeXBlKTtcblxuICAgICAgICBhc3NlcnQoaXNQcmVzZW50KHRoaXMuZGF0YVByb3ZpZGVyKSAmJiBpc1ByZXNlbnQodGhpcy5kYXRhRmluZGVyKSxcbiAgICAgICAgICAgICdEYXRhU291cmNlIGluY29ycmVjdGx5IGluaXRpYWxpemVkLiAoRGF0YVByb3ZpZGVyLCBEYXRhRmluZGVyKSBtaXNzaW5nLiAnKTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KGluaXQuc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gaW5pdC5zdGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgQ2hvb3NlclN0YXRlKG51bGwsIGluaXQubXVsdGlzZWxlY3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhRmluZGVyLmxvb2t1cEtleSA9IGluaXQubG9va3VwS2V5O1xuICAgICAgICB0aGlzLnN0YXRlLmxvb2t1cEtleSA9IGluaXQubG9va3VwS2V5O1xuICAgIH1cblxuXG4gICAgZmluZChwYXR0ZXJuOiBzdHJpbmcsIG1heDogbnVtYmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5wYXR0ZXJuID0gcGF0dGVybjtcbiAgICAgICAgdGhpcy5zdGF0ZS5sYXN0RnVsbE1hdGNoUGF0dGVybiA9IHBhdHRlcm47XG5cbiAgICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdHRlcm4gPT09ICcqJykgeyAvLyBxdWVyeSBldmVyeXRoaW5nXG4gICAgICAgICAgICBwYXR0ZXJuID0gJyc7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBkYXRhRmluZGVyIGhhcyBleHBlY3RlZCBsb29rdXAga2V5XG4gICAgICAgIGxldCBvcmlnS2V5ID0gdGhpcy5kYXRhRmluZGVyLmxvb2t1cEtleTtcbiAgICAgICAgdGhpcy5kYXRhRmluZGVyLmxvb2t1cEtleSA9IHRoaXMuc3RhdGUubG9va3VwS2V5O1xuICAgICAgICB0aGlzLmRhdGFGaW5kZXIuZm9yRGF0YSh0aGlzLmRhdGFQcm92aWRlcikubWF0Y2g8YW55PihwYXR0ZXJuLCBtYXgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueVtdKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUubWF0Y2hlcyA9IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLm11bHRpc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5zZWxlY3RlZE9iamVjdHMoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnN0YXRlLnNlbGVjdGVkT2JqZWN0cygpW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlSWZFeGlzdCh0aGlzLnN0YXRlLm1hdGNoZXMsIGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhRmluZGVyLmxvb2t1cEtleSA9IG9yaWdLZXk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFdoZW4gbXVsdGlzZWxlY3QgdGhpcyBtZXRob2QgY2hlY2tzIGlmIHdlIG5lZWQgdG8gc2hvdyBTSE9XIE1PUkUgbGFiZWwgdW5kZXIgdGhlIHNlbGVjdGVkXG4gICAgICogaXRlbXMuIFdlIGRvIG5vdCB3YW50IHNob3cgZS5nLiA1MCBzZWxlY3Rpb24gdW5kZXIgdGhlIGNob29zZXIgdGhhdCB3b3VsZCB0YWtlIHVwIHdob2xlXG4gICAgICogcGFnZS5cbiAgICAgKlxuICAgICAqL1xuICAgIHNob3dNb3JlU2VsZWN0ZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuc2VsZWN0ZWRPYmplY3RzKCkubGVuZ3RoID49IERhdGFTb3VyY2UuTWF4UmVjZW50U2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgb3BlbjxUPigpOiBPYnNlcnZhYmxlPFRbXT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFQcm92aWRlci5kYXRhQ2hhbmdlcy5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmRhdGFQcm92aWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuZGF0YUZpbmRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIGluc3RhbnQ8VD4oKTogVFtdXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhUHJvdmlkZXIuZGF0YSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnN0YXRlLmFkZE1vZGUgPSB0cnVlO1xuICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGxldCBpdGVtczogYW55W10gPSB2YWx1ZTtcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHRoaXMuc3RhdGUudXBkYXRlZFNlbGVjdGVkT2JqZWN0cyhpdGVtKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnVwZGF0ZWRTZWxlY3RlZE9iamVjdHModmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuYWRkTW9kZSA9IGZhbHNlO1xuXG4gICAgfVxuXG5cbiAgICBnZXQgbG9va3VwS2V5KCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YUZpbmRlci5sb29rdXBLZXk7XG4gICAgfVxufVxuXG4vKiBpcyBcImluaXRcIiB0eXBlIG9mIERTQ2hvb3NlckluaXRQYXJhbXMgaW50ZXJmYWNlID8gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RTQ2hvb3NlckluaXRQYXJhbXMoaW5pdDogRFNDaG9vc2VySW5pdFBhcmFtcyk6IGluaXQgaXMgRFNDaG9vc2VySW5pdFBhcmFtc1xue1xuICAgIHJldHVybiBpc1ByZXNlbnQoaW5pdC5vYmopIHx8IGlzUHJlc2VudChpbml0LnF1ZXJ5VHlwZSk7XG59XG5cbi8qKlxuICogVG8gbWFrZSBpbml0aWFsaXphdGlvbiBlYXNpZXIgd2UgaGF2ZSB0aGlzIGNvbW1vbiBmb3JtYXQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRFNDaG9vc2VySW5pdFBhcmFtcyBleHRlbmRzIERTSW5pdFBhcmFtc1xue1xuICAgIC8qKlxuICAgICAqIENob29zZXIgc3RhdGUga2VlcGluZyBpbmZvcm1hdGlvbiB3aGF0IGlzIGN1cnJlbnRseSBzZWxlY3RlZCAsIHJlc3VsdCBvZiB0aGUgbGFzdCBtYXRjaFxuICAgICAqL1xuICAgIHN0YXRlPzogQ2hvb3NlclN0YXRlO1xufVxuXG5cblxuIl19