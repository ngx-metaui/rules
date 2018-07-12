/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ init = args[0];
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
        // make sure we dataFinder has expected lookup key
        let /** @type {?} */ origKey = this.dataFinder.lookupKey;
        this.dataFinder.lookupKey = this.state.lookupKey;
        this.dataFinder.forData(this.dataProvider).match(pattern, max)
            .subscribe((result) => {
            this.state.matches = result;
            if (this.state.multiselect) {
                for (let /** @type {?} */ i = 0; i < this.state.selectedObjects().length; i++) {
                    let /** @type {?} */ item = this.state.selectedObjects()[i];
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
            let /** @type {?} */ items = value;
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
function ChooserDataSource_tsickle_Closure_declarations() {
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
function DSChooserInitParams_tsickle_Closure_declarations() {
    /**
     * Chooser state keeping information what is currently selected , result of the last match
     * @type {?|undefined}
     */
    DSChooserInitParams.prototype.state;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1kYXRhLXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJ3aWRnZXRzL2Nob29zZXIvY2hvb3Nlci1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBa0JBLE9BQU8sRUFBQyxVQUFVLEVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUtyRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQy9FLE1BQU0sd0JBQXlCLFNBQVEsVUFBVTs7Ozs7SUFnQjdDLFlBQW1CLGFBQTRCLEVBQVMsT0FBb0I7UUFFeEUsS0FBSyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUZmLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBYTtLQUczRTs7Ozs7Ozs7O0lBU0QsSUFBSSxDQUFDLEdBQUcsSUFBVztRQUVmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDM0U7UUFDRCxxQkFBSSxJQUFJLEdBQXdCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQ2hFLENBQUMsQ0FBQyxJQUFJLENB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aHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7RGF0YVNvdXJjZSwgRFNJbml0UGFyYW1zfSBmcm9tICcuLi8uLi9jb3JlL2RhdGEvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtEYXRhRmluZGVyLCBEYXRhRmluZGVyc30gZnJvbSAnLi4vLi4vY29yZS9kYXRhL2RhdGEtZmluZGVycyc7XG5pbXBvcnQge0RhdGFQcm92aWRlcnN9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhLXByb3ZpZGVycyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtEYXRhUHJvdmlkZXJ9IGZyb20gJy4uLy4uL2NvcmUvZGF0YS9kYXRhdHlwZS1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7Q2hvb3NlclN0YXRlfSBmcm9tICcuL2Nob29zZXItc3RhdGUnO1xuaW1wb3J0IHthc3NlcnQsIGlzQXJyYXksIGlzQmxhbmssIGlzUHJlc2VudCwgTGlzdFdyYXBwZXJ9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG4vKipcbiAqIENvbmNyZXRlIERhdGFTb3VyY2UgaW1wbGVtZW50YXRpb24gZm9yIHRoZSBDaG9vc2VyIGNvbXBvbmVudC4gVGhlcmUgYXJlIHR3byB3YXlzIGhvdyB0byB1c2UgaXQ6XG4gKlxuICogMSkgWW91IGNhbiB1c2UgZGVmYXVsdCBEYXRhU291cmNlIGluamVjdGVkIGluc2lkZSBjb21wb25lbnQgY29uc3RydWN0b3IgYW5kIGp1c3QgY2FsbFxuICogaW5pdGlhbGl6ZSB0byBjb25maWd1cmUgaXQgd2l0aCBjb3JyZWN0IERhdGFQcm92aWRlciBhbmQgRGF0YUZpbmRlcjpcbiAqXG4gKlxuICogYGBgXG4gKiAgIHRoaXMuZGF0YVNvdXJjZS5pbml0KHtcbiAqICAgICAgICAgICAgICAgb2JqOiB0aGlzLmxpc3QsXG4gKiAgICAgICAgICAgICAgIHF1ZXJ5VHlwZTogUXVlcnlUeXBlLkZ1bGxUZXh0LFxuICogICAgICAgICAgICAgICBzdGF0ZTogbnVsbCxcbiAqICAgICAgICAgICAgICAgbXVsdGlzZWxlY3Q6IHRoaXMubXVsdGlzZWxlY3RcbiAqICAgICAgICAgICB9KTtcbiAqXG4gKiBgYGBcbiAqXG4gKiBhbmQgdGhlbiB5b3UgY2FuIHVzZSBpdCB0byBzaW1wbHkgcmV0cmlldmUgZGF0YSBvciBydW4gcXVlcmllcy5cbiAqXG4gKiAyKSBZb3Ugd2lsbCBpbnN0YW50aWF0ZSB5b3VyIG93biBEYXRhU291cmNlIGFuZCBwYXNzIGl0IGludG8gdGhlIGNvbXBvbmVudCB1c2luZyBbZGF0YVNvdXJjZV1cbiAqIGJpbmRpbmdcbiAqXG4gKiBgYGBcbiAqXG4gKiAgIHRoaXMuZHMgPSBuZXcgQ2hvb3NlckRhdGFTb3VyY2UodGhpcy5kYXRhLCB0aGlzLmZpbmRlcnMpO1xuICogICB0aGlzLmRzLmluaXQoe1xuICogICAgICAgICAgICAgICBvYmo6IHRoaXMubGlzdCxcbiAqICAgICAgICAgICAgICAgcXVlcnlUeXBlOiBRdWVyeVR5cGUuRnVsbFRleHQsXG4gKiAgICAgICAgICAgICAgIHN0YXRlOiBudWxsLFxuICogICAgICAgICAgICAgICBtdWx0aXNlbGVjdDogdGhpcy5tdWx0aXNlbGVjdFxuICogICAgICAgICAgIH0pO1xuICpcbiAqIGBgYFxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBDaG9vc2VyRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2VcbntcblxuICAgIC8qKlxuICAgICAqIE1hdGNoaW5nIGRhdGFQcm92aWRlcnMgYW5kIGZpbmRlcnNcbiAgICAgKi9cbiAgICBwcml2YXRlIGRhdGFQcm92aWRlcjogRGF0YVByb3ZpZGVyPGFueT47XG4gICAgcHJpdmF0ZSBkYXRhRmluZGVyOiBEYXRhRmluZGVyO1xuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWFsIG9iamVjdCB0byBrZWVwIGN1cnJlbnQgc3RhdGUgb2YgdGhpcyBjaG9vc2VyXG4gICAgICovXG4gICAgc3RhdGU6IENob29zZXJTdGF0ZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGFQcm92aWRlcnM6IERhdGFQcm92aWRlcnMsIHB1YmxpYyBmaW5kZXJzOiBEYXRhRmluZGVycylcbiAgICB7XG4gICAgICAgIHN1cGVyKGRhdGFQcm92aWRlcnMsIGZpbmRlcnMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVG8gaW5pdGlhbGl6ZSB0aGlzIERhdGFTb3VyY2Ugd2l0aCBjdXJyZW50IERhdGFGaW5kZXIgYW5kIFByb3ZpZGVyIGFzIHdlbGwgYXMgc3RhdGUgd2UgdXNlXG4gICAgICogYW4gaW50ZXJmYWNlIERTQ2hvb3NlckluaXRQYXJhbXMgdG8gaGF2ZSBhbGwgaW5pdCB2YWx1ZXMgdHlwZWQgY2hlY2tlZFxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KC4uLmFyZ3M6IGFueVtdKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzQmxhbmsoYXJncykgfHwgYXJncy5sZW5ndGggIT09IDEgJiYgIWlzRFNDaG9vc2VySW5pdFBhcmFtcyhhcmdzWzBdKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBpbml0aWFsaXplIERTIHdpdGggKERTQ2hvb3NlckluaXRQYXJhbXMpJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluaXQ6IERTQ2hvb3NlckluaXRQYXJhbXMgPSBhcmdzWzBdO1xuXG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gaXNQcmVzZW50KGluaXQuZGF0YVByb3ZpZGVyKSA/IGluaXQuZGF0YVByb3ZpZGVyXG4gICAgICAgICAgICA6IHRoaXMuZGF0YVByb3ZpZGVycy5maW5kKGluaXQub2JqKTtcblxuICAgICAgICB0aGlzLmRhdGFGaW5kZXIgPSBpc1ByZXNlbnQoaW5pdC5kYXRhRmluZGVyKSA/IGluaXQuZGF0YUZpbmRlclxuICAgICAgICAgICAgOiB0aGlzLmZpbmRlcnMuZmluZCh0aGlzLmRhdGFQcm92aWRlciwgaW5pdC5xdWVyeVR5cGUpO1xuXG4gICAgICAgIGFzc2VydChpc1ByZXNlbnQodGhpcy5kYXRhUHJvdmlkZXIpICYmIGlzUHJlc2VudCh0aGlzLmRhdGFGaW5kZXIpLFxuICAgICAgICAgICAgJ0RhdGFTb3VyY2UgaW5jb3JyZWN0bHkgaW5pdGlhbGl6ZWQuIChEYXRhUHJvdmlkZXIsIERhdGFGaW5kZXIpIG1pc3NpbmcuICcpO1xuXG4gICAgICAgIGlmIChpc1ByZXNlbnQoaW5pdC5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBpbml0LnN0YXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBDaG9vc2VyU3RhdGUobnVsbCwgaW5pdC5tdWx0aXNlbGVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFGaW5kZXIubG9va3VwS2V5ID0gaW5pdC5sb29rdXBLZXk7XG4gICAgICAgIHRoaXMuc3RhdGUubG9va3VwS2V5ID0gaW5pdC5sb29rdXBLZXk7XG4gICAgfVxuXG5cbiAgICBmaW5kKHBhdHRlcm46IHN0cmluZywgbWF4OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnN0YXRlLnBhdHRlcm4gPSBwYXR0ZXJuO1xuICAgICAgICB0aGlzLnN0YXRlLmxhc3RGdWxsTWF0Y2hQYXR0ZXJuID0gcGF0dGVybjtcblxuICAgICAgICBpZiAocGF0dGVybi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0dGVybiA9PT0gJyonKSB7IC8vIHF1ZXJ5IGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgIHBhdHRlcm4gPSAnJztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGRhdGFGaW5kZXIgaGFzIGV4cGVjdGVkIGxvb2t1cCBrZXlcbiAgICAgICAgbGV0IG9yaWdLZXkgPSB0aGlzLmRhdGFGaW5kZXIubG9va3VwS2V5O1xuICAgICAgICB0aGlzLmRhdGFGaW5kZXIubG9va3VwS2V5ID0gdGhpcy5zdGF0ZS5sb29rdXBLZXk7XG4gICAgICAgIHRoaXMuZGF0YUZpbmRlci5mb3JEYXRhKHRoaXMuZGF0YVByb3ZpZGVyKS5tYXRjaDxhbnk+KHBhdHRlcm4sIG1heClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDogYW55W10pID0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5tYXRjaGVzID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUubXVsdGlzZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLnNlbGVjdGVkT2JqZWN0cygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRPYmplY3RzKClbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmVJZkV4aXN0KHRoaXMuc3RhdGUubWF0Y2hlcywgaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFGaW5kZXIubG9va3VwS2V5ID0gb3JpZ0tleTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogV2hlbiBtdWx0aXNlbGVjdCB0aGlzIG1ldGhvZCBjaGVja3MgaWYgd2UgbmVlZCB0byBzaG93IFNIT1cgTU9SRSBsYWJlbCB1bmRlciB0aGUgc2VsZWN0ZWRcbiAgICAgKiBpdGVtcy4gV2UgZG8gbm90IHdhbnQgc2hvdyBlLmcuIDUwIHNlbGVjdGlvbiB1bmRlciB0aGUgY2hvb3NlciB0aGF0IHdvdWxkIHRha2UgdXAgd2hvbGVcbiAgICAgKiBwYWdlLlxuICAgICAqXG4gICAgICovXG4gICAgc2hvd01vcmVTZWxlY3RlZCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5zZWxlY3RlZE9iamVjdHMoKS5sZW5ndGggPj0gRGF0YVNvdXJjZS5NYXhSZWNlbnRTZWxlY3RlZDtcbiAgICB9XG5cbiAgICBvcGVuPFQ+KCk6IE9ic2VydmFibGU8VFtdPlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVByb3ZpZGVyLmRhdGFDaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuZGF0YVByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5kYXRhRmluZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgaW5zdGFudDxUPigpOiBUW11cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFQcm92aWRlci5kYXRhKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc3RhdGUuYWRkTW9kZSA9IHRydWU7XG4gICAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgbGV0IGl0ZW1zOiBhbnlbXSA9IHZhbHVlO1xuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4gdGhpcy5zdGF0ZS51cGRhdGVkU2VsZWN0ZWRPYmplY3RzKGl0ZW0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudXBkYXRlZFNlbGVjdGVkT2JqZWN0cyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5hZGRNb2RlID0gZmFsc2U7XG5cbiAgICB9XG5cblxuICAgIGdldCBsb29rdXBLZXkoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhRmluZGVyLmxvb2t1cEtleTtcbiAgICB9XG59XG5cbi8qIGlzIFwiaW5pdFwiIHR5cGUgb2YgRFNDaG9vc2VySW5pdFBhcmFtcyBpbnRlcmZhY2UgPyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRFNDaG9vc2VySW5pdFBhcmFtcyhpbml0OiBEU0Nob29zZXJJbml0UGFyYW1zKTogaW5pdCBpcyBEU0Nob29zZXJJbml0UGFyYW1zXG57XG4gICAgcmV0dXJuIGlzUHJlc2VudChpbml0Lm9iaikgfHwgaXNQcmVzZW50KGluaXQucXVlcnlUeXBlKTtcbn1cblxuLyoqXG4gKiBUbyBtYWtlIGluaXRpYWxpemF0aW9uIGVhc2llciB3ZSBoYXZlIHRoaXMgY29tbW9uIGZvcm1hdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEU0Nob29zZXJJbml0UGFyYW1zIGV4dGVuZHMgRFNJbml0UGFyYW1zXG57XG4gICAgLyoqXG4gICAgICogQ2hvb3NlciBzdGF0ZSBrZWVwaW5nIGluZm9ybWF0aW9uIHdoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkICwgcmVzdWx0IG9mIHRoZSBsYXN0IG1hdGNoXG4gICAgICovXG4gICAgc3RhdGU/OiBDaG9vc2VyU3RhdGU7XG59XG5cblxuXG4iXX0=