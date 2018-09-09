/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { isBlank, isPresent, unimplemented } from '@aribaui/core';
/**
 * A map that masks on top of an (immutable) parent map
 * @template K, V
 */
var NestedMap = /** @class */ (function () {
    function NestedMap(_parent, _map) {
        this._parent = _parent;
        this._map = _map;
        this._overrideCount = 0;
        this._size = 0;
        if (isBlank(_map)) {
            this._map = new Map();
        }
    }
    /**
     * @param {?} iteratorResult
     * @return {?}
     */
    NestedMap.toMapEntry = /**
     * @param {?} iteratorResult
     * @return {?}
     */
    function (iteratorResult) {
        /** @type {?} */
        var value = iteratorResult.value;
        if (isPresent(value) && NestedMap.isMapEntry(value)) {
            return value;
        }
        /** @type {?} */
        var entry = {
            key: (isPresent(iteratorResult.value)) ? iteratorResult.value[0] : iteratorResult.value,
            value: (isPresent(iteratorResult.value)) ? iteratorResult.value[1] : iteratorResult.value,
            hasNext: !iteratorResult.done
        };
        return entry;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NestedMap.isMapEntry = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return isPresent(value) && isPresent(value.hasNext);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NestedMap.isNMNullMarker = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return isPresent(value) && value['nesnullmarker'];
    };
    /**
     * @return {?}
     */
    NestedMap.prototype.toMap = /**
     * @return {?}
     */
    function () {
        return this._parent;
    };
    /**
     * @param {?} newParent
     * @return {?}
     */
    NestedMap.prototype.reparentedMap = /**
     * @param {?} newParent
     * @return {?}
     */
    function (newParent) {
        /** @type {?} */
        var newMap = new NestedMap(newParent, this._map);
        newMap._overrideCount = this._overrideCount;
        return newMap;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    NestedMap.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var val = this._map.has(key) ? this._map.get(key) : this._parent.get(key);
        return NestedMap.isNMNullMarker(val) ? null : val;
    };
    /**
     * @return {?}
     */
    NestedMap.prototype.keys = /**
     * @return {?}
     */
    function () {
        return unimplemented();
    };
    /**
     * @return {?}
     */
    NestedMap.prototype.values = /**
     * @return {?}
     */
    function () {
        return unimplemented();
    };
    /**
     * @return {?}
     */
    NestedMap.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._parent.clear();
        this._map.clear();
    };
    /**
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    NestedMap.prototype.set = /**
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    function (key, value) {
        /** @type {?} */
        var orig = this._map.get(key);
        if ((NestedMap.isNMNullMarker(orig) || isBlank(orig)) && this._parent.has(key)) {
            this._overrideCount += (NestedMap.isNMNullMarker(orig) ? -1 : 1);
        }
        this._map.set(key, value);
        return this;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    NestedMap.prototype.delete = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var returnVal = false;
        /** @type {?} */
        var orig = null;
        if (this._map.has(key)) {
            orig = this._map.delete(key);
            returnVal = true;
            // print('Removing: ' , orig);
            if (this._parent.has(key)) {
                this._map.set(key, NestedMap._NullMarker);
                // _overrideCount--;
                this._overrideCount++;
            }
        }
        else if (this._parent.has(key)) {
            // we're "removing" a value we don't have (but that our parent does)
            // we need to store a null override
            orig = this._parent.get(key);
            // print('Removing: ' , orig);
            this._map.set(key, NestedMap._NullMarker);
            this._overrideCount += 2;
        }
        return returnVal;
    };
    /**
     * @param {?} callbackfn
     * @param {?=} thisArg
     * @return {?}
     */
    NestedMap.prototype.forEach = /**
     * @param {?} callbackfn
     * @param {?=} thisArg
     * @return {?}
     */
    function (callbackfn, thisArg) {
        /** @type {?} */
        var entries = this.entries();
        /** @type {?} */
        var nextEntry;
        while ((nextEntry = NestedMap.toMapEntry(entries.next())) && nextEntry.hasNext) {
            callbackfn(nextEntry.value, nextEntry.key, this._parent);
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    NestedMap.prototype.has = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this._map.has(key) ? (!NestedMap.isNMNullMarker(this._map.get(key))) : this._parent.has(key);
    };
    /**
     * @return {?}
     */
    NestedMap.prototype[Symbol.iterator] = /**
     * @return {?}
     */
    function () {
        return new NestedEntryIterator(this);
    };
    /**
     * @return {?}
     */
    NestedMap.prototype.entries = /**
     * @return {?}
     */
    function () {
        return new NestedEntryIterator(this);
    };
    Object.defineProperty(NestedMap.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._parent.size + this._map.size - this._overrideCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NestedMap.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NestedMap.prototype, "parent", {
        get: /**
         * @return {?}
         */
        function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NestedMap.prototype.toString = /**
     * @return {?}
     */
    function () {
        return 'NestedMap';
    };
    NestedMap._NullMarker = { nesnullmarker: true };
    return NestedMap;
}());
export { NestedMap };
if (false) {
    /** @type {?} */
    NestedMap._NullMarker;
    /* TODO: handle strange member:
    [Symbol.toStringTag]: 'Map';
    */
    /** @type {?} */
    NestedMap.prototype._overrideCount;
    /** @type {?} */
    NestedMap.prototype._size;
    /** @type {?} */
    NestedMap.prototype._parent;
    /** @type {?} */
    NestedMap.prototype._map;
}
/**
 * @record
 */
export function MapEntry() { }
/** @type {?} */
MapEntry.prototype.value;
/** @type {?} */
MapEntry.prototype.key;
/** @type {?} */
MapEntry.prototype.hasNext;
/**
 * @template K, V
 */
var /**
 * @template K, V
 */
NestedEntryIterator = /** @class */ (function () {
    function NestedEntryIterator(_nestedMap) {
        this._nestedMap = _nestedMap;
        this._parentIterator = _nestedMap.parent.entries();
        this._nestedIterator = _nestedMap.map.entries();
        this.advanceToNext();
    }
    /**
     * @return {?}
     */
    NestedEntryIterator.prototype.next = /**
     * @return {?}
     */
    function () {
        // assert(isPresent(this._nextEntry) , 'next() when no more elements"');
        this._currentEntry = this._nextEntry;
        this.advanceToNext();
        /** @type {?} */
        var next = {
            value: this._currentEntry,
            done: !this._currentEntry.hasNext
        };
        return next;
    };
    /**
     * @return {?}
     */
    NestedEntryIterator.prototype[Symbol.iterator] = /**
     * @return {?}
     */
    function () {
        return this;
    };
    /**
     * @return {?}
     */
    NestedEntryIterator.prototype.advanceToNext = /**
     * @return {?}
     */
    function () {
        this._fromNested = false;
        // Note: we need to skip nulls (masked values)
        while (!this._fromNested && (this._currentNestedEntry = NestedMap.toMapEntry(this._nestedIterator.next())) && this._currentNestedEntry.hasNext) {
            this._nextEntry = this._currentNestedEntry;
            if (!NestedMap.isNMNullMarker(this._nextEntry.value)) {
                this._fromNested = true;
            }
        }
        if (!this._fromNested) {
            while ((this._currentParentEntry = NestedMap.toMapEntry(this._parentIterator.next())) && this._currentParentEntry.hasNext) {
                this._nextEntry = this._currentParentEntry;
                if (!this._nestedMap.map.has(this._nextEntry.key)) {
                    return;
                }
            }
            this._nextEntry = this._currentParentEntry;
        }
    };
    return NestedEntryIterator;
}());
if (false) {
    /** @type {?} */
    NestedEntryIterator.prototype._parentIterator;
    /** @type {?} */
    NestedEntryIterator.prototype._nestedIterator;
    /** @type {?} */
    NestedEntryIterator.prototype._currentEntry;
    /** @type {?} */
    NestedEntryIterator.prototype._nextEntry;
    /** @type {?} */
    NestedEntryIterator.prototype._fromNested;
    /** @type {?} */
    NestedEntryIterator.prototype._currentParentEntry;
    /** @type {?} */
    NestedEntryIterator.prototype._currentNestedEntry;
    /** @type {?} */
    NestedEntryIterator.prototype._nestedMap;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkLW1hcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvbmVzdGVkLW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBbUJBLE9BQU8sRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lBNEM1RCxtQkFBb0IsT0FBa0IsRUFBVSxJQUFrQjtRQUE5QyxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBYzs4QkFqQ3pDLENBQUM7cUJBQ0YsQ0FBQztRQW1DckIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFXLENBQUM7U0FDbEM7S0FDSjs7Ozs7SUFuQ00sb0JBQVU7Ozs7SUFBakIsVUFBa0IsY0FBbUM7O1FBRWpELElBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaEI7O1FBRUQsSUFBSSxLQUFLLEdBQWE7WUFFbEIsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUNYLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSztZQUMzRSxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQ2IsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxL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ZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3BFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO2dCQUUzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxDQUFDO2lCQUNWO2FBQ0o7WUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztTQUM5Qzs7OEJBdlJUO0lBNFJDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBCYXNlZCBvbiBvcmlnaW5hbCB3b3JrOiBNZXRhVUk6IENyYWlnIEZlZGVyaWdoaSAoMjAwOClcbiAqXG4gKi9cbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCB1bmltcGxlbWVudGVkfSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuLyoqXG4gQSBtYXAgdGhhdCBtYXNrcyBvbiB0b3Agb2YgYW4gKGltbXV0YWJsZSkgcGFyZW50IG1hcFxuICovXG5leHBvcnQgY2xhc3MgTmVzdGVkTWFwPEssIFY+IGltcGxlbWVudHMgTWFwPEssIFY+XG57XG4gICAgc3RhdGljIHJlYWRvbmx5IF9OdWxsTWFya2VyOiBhbnkgPSB7bmVzbnVsbG1hcmtlcjogdHJ1ZX07XG5cbiAgICBbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCc7XG5cbiAgICBfb3ZlcnJpZGVDb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXIgPSAwO1xuXG5cbiAgICBzdGF0aWMgdG9NYXBFbnRyeShpdGVyYXRvclJlc3VsdDogSXRlcmF0b3JSZXN1bHQ8YW55Pik6IE1hcEVudHJ5XG4gICAge1xuICAgICAgICBsZXQgdmFsdWUgPSBpdGVyYXRvclJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSAmJiBOZXN0ZWRNYXAuaXNNYXBFbnRyeSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbnRyeTogTWFwRW50cnkgPSB7XG5cbiAgICAgICAgICAgIGtleTogKGlzUHJlc2VudChcbiAgICAgICAgICAgICAgICBpdGVyYXRvclJlc3VsdC52YWx1ZSkpID8gaXRlcmF0b3JSZXN1bHQudmFsdWVbMF0gOiBpdGVyYXRvclJlc3VsdC52YWx1ZSxcbiAgICAgICAgICAgIHZhbHVlOiAoaXNQcmVzZW50KFxuICAgICAgICAgICAgICAgIGl0ZXJhdG9yUmVzdWx0LnZhbHVlKSkgPyBpdGVyYXRvclJlc3VsdC52YWx1ZVsxXSA6IGl0ZXJhdG9yUmVzdWx0LnZhbHVlLFxuICAgICAgICAgICAgaGFzTmV4dDogIWl0ZXJhdG9yUmVzdWx0LmRvbmVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgIH1cblxuICAgIHN0YXRpYyBpc01hcEVudHJ5KHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBNYXBFbnRyeVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh2YWx1ZSkgJiYgaXNQcmVzZW50KHZhbHVlLmhhc05leHQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc05NTnVsbE1hcmtlcih2YWx1ZTogYW55KTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh2YWx1ZSkgJiYgdmFsdWVbJ25lc251bGxtYXJrZXInXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYXJlbnQ6IE1hcDxLLCBWPiwgcHJpdmF0ZSBfbWFwPzogTWFwPEssIGFueT4pXG4gICAge1xuXG4gICAgICAgIGlmIChpc0JsYW5rKF9tYXApKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgTWFwIDxLLCBhbnk+KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b01hcCgpOiBNYXA8SywgVj5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgfVxuXG5cbiAgICByZXBhcmVudGVkTWFwKG5ld1BhcmVudDogTWFwPEssIFY+KTogTmVzdGVkTWFwPEssIFY+XG4gICAge1xuICAgICAgICBsZXQgbmV3TWFwID0gbmV3IE5lc3RlZE1hcDxLLCBWPihuZXdQYXJlbnQsIHRoaXMuX21hcCk7XG4gICAgICAgIG5ld01hcC5fb3ZlcnJpZGVDb3VudCA9IHRoaXMuX292ZXJyaWRlQ291bnQ7XG4gICAgICAgIHJldHVybiBuZXdNYXA7XG4gICAgfVxuXG5cbiAgICBnZXQoa2V5OiBLKTogYW55fFZcbiAgICB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLl9tYXAuaGFzKGtleSkgPyB0aGlzLl9tYXAuZ2V0KGtleSkgOiB0aGlzLl9wYXJlbnQuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBOZXN0ZWRNYXAuaXNOTU51bGxNYXJrZXIodmFsKSA/IG51bGwgOiB2YWw7XG4gICAgfVxuXG5cbiAgICBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8Sz5cbiAgICB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG5cbiAgICB2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxWPlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLl9wYXJlbnQuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fbWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgc2V0KGtleTogSywgdmFsdWU/OiBWKTogYW55XG4gICAge1xuICAgICAgICBsZXQgb3JpZyA9IHRoaXMuX21hcC5nZXQoa2V5KTtcblxuICAgICAgICBpZiAoKE5lc3RlZE1hcC5pc05NTnVsbE1hcmtlcihvcmlnKSB8fCBpc0JsYW5rKG9yaWcpKSAmJiB0aGlzLl9wYXJlbnQuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJyaWRlQ291bnQgKz0gKE5lc3RlZE1hcC5pc05NTnVsbE1hcmtlcihvcmlnKSA/IC0xIDogMSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYXAuc2V0KGtleSwgdmFsdWUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgZGVsZXRlKGtleTogSyk6IGJvb2xlYW5cbiAgICB7XG5cbiAgICAgICAgbGV0IHJldHVyblZhbCA9IGZhbHNlO1xuICAgICAgICBsZXQgb3JpZzogYW55ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX21hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgb3JpZyA9IHRoaXMuX21hcC5kZWxldGUoa2V5KTtcblxuICAgICAgICAgICAgcmV0dXJuVmFsID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIHByaW50KCdSZW1vdmluZzogJyAsIG9yaWcpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFyZW50LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwLnNldChrZXksIE5lc3RlZE1hcC5fTnVsbE1hcmtlcik7XG4gICAgICAgICAgICAgICAgLy8gX292ZXJyaWRlQ291bnQtLTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vdmVycmlkZUNvdW50Kys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9wYXJlbnQuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIC8vIHdlJ3JlIFwicmVtb3ZpbmdcIiBhIHZhbHVlIHdlIGRvbid0IGhhdmUgKGJ1dCB0aGF0IG91ciBwYXJlbnQgZG9lcylcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gc3RvcmUgYSBudWxsIG92ZXJyaWRlXG4gICAgICAgICAgICBvcmlnID0gdGhpcy5fcGFyZW50LmdldChrZXkpO1xuICAgICAgICAgICAgLy8gcHJpbnQoJ1JlbW92aW5nOiAnICwgb3JpZyk7XG4gICAgICAgICAgICB0aGlzLl9tYXAuc2V0KGtleSwgTmVzdGVkTWFwLl9OdWxsTWFya2VyKTtcbiAgICAgICAgICAgIHRoaXMuX292ZXJyaWRlQ291bnQgKz0gMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgIH1cblxuICAgIGZvckVhY2goY2FsbGJhY2tmbjogKHZhbHVlOiBWLCBpbmRleDogSywgbWFwOiBNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIGxldCBlbnRyaWVzID0gdGhpcy5lbnRyaWVzKCk7XG5cbiAgICAgICAgbGV0IG5leHRFbnRyeTogTWFwRW50cnk7XG4gICAgICAgIHdoaWxlICgobmV4dEVudHJ5ID0gTmVzdGVkTWFwLnRvTWFwRW50cnkoZW50cmllcy5uZXh0KCkpKSAmJiBuZXh0RW50cnkuaGFzTmV4dCkge1xuICAgICAgICAgICAgY2FsbGJhY2tmbihuZXh0RW50cnkudmFsdWUsIG5leHRFbnRyeS5rZXksIHRoaXMuX3BhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGhhcyhrZXk6IEspOiBib29sZWFuXG4gICAge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuaGFzKGtleSkgPyAoICFOZXN0ZWRNYXAuaXNOTU51bGxNYXJrZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwLmdldChrZXkpKSApIDogdGhpcy5fcGFyZW50LmhhcyhrZXkpO1xuICAgIH1cblxuXG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gbmV3IE5lc3RlZEVudHJ5SXRlcmF0b3I8SywgVj4odGhpcyk7XG4gICAgfVxuXG5cbiAgICBlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8YW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOZXN0ZWRFbnRyeUl0ZXJhdG9yPEssIFY+KHRoaXMpO1xuICAgIH1cblxuXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LnNpemUgKyB0aGlzLl9tYXAuc2l6ZSAtIHRoaXMuX292ZXJyaWRlQ291bnQ7XG4gICAgfVxuXG4gICAgZ2V0IG1hcCgpOiBNYXA8SywgT2JqZWN0PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgICB9XG5cbiAgICBnZXQgcGFyZW50KCk6IE1hcDxLLCBWPlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICB9XG5cblxuICAgIHRvU3RyaW5nKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuICdOZXN0ZWRNYXAnO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXBFbnRyeVxue1xuICAgIHZhbHVlOiBhbnk7XG4gICAga2V5OiBhbnk7XG4gICAgaGFzTmV4dDogYm9vbGVhbjtcbn1cblxuY2xhc3MgTmVzdGVkRW50cnlJdGVyYXRvcjxLLCBWPiBpbXBsZW1lbnRzIEl0ZXJhYmxlSXRlcmF0b3I8TWFwRW50cnk+XG57XG4gICAgX3BhcmVudEl0ZXJhdG9yOiBJdGVyYWJsZUl0ZXJhdG9yPGFueT47XG4gICAgX25lc3RlZEl0ZXJhdG9yOiBJdGVyYWJsZUl0ZXJhdG9yPGFueT47XG4gICAgX2N1cnJlbnRFbnRyeTogTWFwRW50cnk7XG4gICAgX25leHRFbnRyeTogTWFwRW50cnk7XG4gICAgX2Zyb21OZXN0ZWQ6IGJvb2xlYW47XG5cblxuICAgIF9jdXJyZW50UGFyZW50RW50cnk6IE1hcEVudHJ5O1xuICAgIF9jdXJyZW50TmVzdGVkRW50cnk6IE1hcEVudHJ5O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmVzdGVkTWFwOiBOZXN0ZWRNYXA8SywgVj4pXG4gICAge1xuICAgICAgICB0aGlzLl9wYXJlbnRJdGVyYXRvciA9IF9uZXN0ZWRNYXAucGFyZW50LmVudHJpZXMoKTtcbiAgICAgICAgdGhpcy5fbmVzdGVkSXRlcmF0b3IgPSBfbmVzdGVkTWFwLm1hcC5lbnRyaWVzKCk7XG5cbiAgICAgICAgdGhpcy5hZHZhbmNlVG9OZXh0KCk7XG4gICAgfVxuXG5cbiAgICBuZXh0KCk6IEl0ZXJhdG9yUmVzdWx0PE1hcEVudHJ5PlxuICAgIHtcbiAgICAgICAgLy8gYXNzZXJ0KGlzUHJlc2VudCh0aGlzLl9uZXh0RW50cnkpICwgJ25leHQoKSB3aGVuIG5vIG1vcmUgZWxlbWVudHNcIicpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRFbnRyeSA9IHRoaXMuX25leHRFbnRyeTtcbiAgICAgICAgdGhpcy5hZHZhbmNlVG9OZXh0KCk7XG5cbiAgICAgICAgbGV0IG5leHQ6IEl0ZXJhdG9yUmVzdWx0PE1hcEVudHJ5PiA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9jdXJyZW50RW50cnksXG4gICAgICAgICAgICBkb25lOiAhdGhpcy5fY3VycmVudEVudHJ5Lmhhc05leHRcblxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG5cblxuICAgIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8TWFwRW50cnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkdmFuY2VUb05leHQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fZnJvbU5lc3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIE5vdGU6IHdlIG5lZWQgdG8gc2tpcCBudWxscyAobWFza2VkIHZhbHVlcylcblxuICAgICAgICB3aGlsZSAoIXRoaXMuX2Zyb21OZXN0ZWQgJiYgKHRoaXMuX2N1cnJlbnROZXN0ZWRFbnRyeSA9IE5lc3RlZE1hcC50b01hcEVudHJ5KFxuICAgICAgICAgICAgdGhpcy5fbmVzdGVkSXRlcmF0b3IubmV4dCgpKSkgJiYgdGhpcy5fY3VycmVudE5lc3RlZEVudHJ5Lmhhc05leHQpIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRFbnRyeSA9IHRoaXMuX2N1cnJlbnROZXN0ZWRFbnRyeTtcbiAgICAgICAgICAgIGlmICghTmVzdGVkTWFwLmlzTk1OdWxsTWFya2VyKHRoaXMuX25leHRFbnRyeS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9tTmVzdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fZnJvbU5lc3RlZCkge1xuICAgICAgICAgICAgd2hpbGUgKCh0aGlzLl9jdXJyZW50UGFyZW50RW50cnkgPSBOZXN0ZWRNYXAudG9NYXBFbnRyeShcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnRJdGVyYXRvci5uZXh0KCkpKSAmJiB0aGlzLl9jdXJyZW50UGFyZW50RW50cnkuaGFzTmV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRFbnRyeSA9IHRoaXMuX2N1cnJlbnRQYXJlbnRFbnRyeTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbmVzdGVkTWFwLm1hcC5oYXModGhpcy5fbmV4dEVudHJ5LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbmV4dEVudHJ5ID0gdGhpcy5fY3VycmVudFBhcmVudEVudHJ5O1xuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG4iXX0=