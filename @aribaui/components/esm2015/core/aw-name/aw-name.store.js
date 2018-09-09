/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class AwNameStore {
    constructor() {
        this.store = new Map();
    }
    /**
     * @param {?} name
     * @param {?} el
     * @return {?}
     */
    add(name, el) {
        if (this.collides(name)) {
            throw new Error('Name is not unique!');
        }
        return this.store.set(name, el);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    remove(name) {
        return this.store.delete(name);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    collides(name) {
        return this.store.has(name);
    }
    /**
     * @return {?}
     */
    clear() {
        this.store.clear();
    }
}
AwNameStore.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AwNameStore.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    AwNameStore.prototype.store;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXctbmFtZS5zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJjb3JlL2F3LW5hbWUvYXctbmFtZS5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUd6QyxNQUFNO0lBSUY7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7S0FDMUI7Ozs7OztJQUVELEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBTztRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDMUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ25DOzs7OztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDOzs7OztJQUVELFFBQVEsQ0FBQyxJQUFZO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQjs7OztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3RCOzs7WUExQkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBd05hbWVTdG9yZSB7XG5cbiAgICBwcml2YXRlIHN0b3JlOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgYWRkKG5hbWU6IHN0cmluZywgZWw6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5jb2xsaWRlcyhuYW1lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lIGlzIG5vdCB1bmlxdWUhJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuc2V0KG5hbWUsIGVsKTtcbiAgICB9XG5cbiAgICByZW1vdmUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmRlbGV0ZShuYW1lKTtcbiAgICB9XG5cbiAgICBjb2xsaWRlcyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuaGFzKG5hbWUpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnN0b3JlLmNsZWFyKCk7XG4gICAgfVxuXG59XG4iXX0=