/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var AwNameStore = /** @class */ (function () {
    function AwNameStore() {
        this.store = new Map();
    }
    /**
     * @param {?} name
     * @param {?} el
     * @return {?}
     */
    AwNameStore.prototype.add = /**
     * @param {?} name
     * @param {?} el
     * @return {?}
     */
    function (name, el) {
        if (this.collides(name)) {
            throw new Error('Name is not unique!');
        }
        return this.store.set(name, el);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AwNameStore.prototype.remove = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.store.delete(name);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AwNameStore.prototype.collides = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.store.has(name);
    };
    /**
     * @return {?}
     */
    AwNameStore.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.store.clear();
    };
    AwNameStore.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AwNameStore.ctorParameters = function () { return []; };
    return AwNameStore;
}());
export { AwNameStore };
if (false) {
    /** @type {?} */
    AwNameStore.prototype.store;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctbmFtZS5zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2F3LW5hbWUvYXctbmFtZS5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7SUFPckM7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7S0FDMUI7Ozs7OztJQUVELHlCQUFHOzs7OztJQUFILFVBQUksSUFBWSxFQUFFLEVBQU87UUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUFFRCw0QkFBTTs7OztJQUFOLFVBQU8sSUFBWTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQzs7Ozs7SUFFRCw4QkFBUTs7OztJQUFSLFVBQVMsSUFBWTtRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7Ozs7SUFFRCwyQkFBSzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3RCOztnQkExQkosVUFBVTs7OztzQkFGWDs7U0FHYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF3TmFtZVN0b3JlIHtcblxuICAgIHByaXZhdGUgc3RvcmU6IE1hcDxzdHJpbmcsIGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdG9yZSA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBhZGQobmFtZTogc3RyaW5nLCBlbDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxpZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgaXMgbm90IHVuaXF1ZSEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5zZXQobmFtZSwgZWwpO1xuICAgIH1cblxuICAgIHJlbW92ZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZGVsZXRlKG5hbWUpO1xuICAgIH1cblxuICAgIGNvbGxpZGVzKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5oYXMobmFtZSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUuY2xlYXIoKTtcbiAgICB9XG5cbn1cbiJdfQ==