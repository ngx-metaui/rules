/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input } from '@angular/core';
import { Environment } from '@aribaui/core';
import { BaseComponent } from '../../../core/base.component';
/**
 *  This is a temporary implementation for the page header component.
 *  When the real implementation of side menu is done, PageHeaderComponent will
 *  be swaped to use it.
 *
 */
export class SidenavComponent extends BaseComponent {
    /**
     * @param {?} element
     * @param {?} env
     */
    constructor(element, env) {
        super(env);
        this.element = element;
        this.env = env;
    }
    /**
     * @return {?}
     */
    getSidenavClass() {
        // Only show if I have items
        return (this.show && this.items) ? 'sidenav sidenav-active' : 'sidenav';
    }
    /**
     * @return {?}
     */
    open() {
        this.show = true;
    }
    /**
     * @return {?}
     */
    close() {
        this.show = false;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.show = !this.show;
    }
}
SidenavComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-sidenav',
                template: "<div [ngClass]=\"getSidenavClass()\">\n    <div class=\"sidenav-content\">\n        <a *ngFor=\"let item of items\" [routerLink]=\"item.link\">\n            <span class=\"sidenav-icon\"><i [ngClass]=\"'sap-icon ' + item.icon\"></i></span>\n            {{item.label}}\n        </a>\n    </div>\n</div>\n",
                styles: [".sidenav{height:100%;width:0;position:fixed;z-index:1;top:50px;left:0;background-color:#363636;overflow-x:hidden;padding-top:20px;transition:.5s}.sidenav-active{width:250px}.sidenav a{padding:8px 8px 8px 32px;text-decoration:none;font-size:16px;color:#fff;display:block;transition:.3s}.sidenav a:hover{background-color:#111}.sidenav-icon{font-size:30px;color:#ccc;margin-right:10px}"]
            }] }
];
/** @nocollapse */
SidenavComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment }
];
SidenavComponent.propDecorators = {
    items: [{ type: Input }],
    show: [{ type: Input }]
};
if (false) {
    /**
     * list of menu items
     * @type {?}
     */
    SidenavComponent.prototype.items;
    /**
     * displays the back link that navigates user to the previous page when clicked.
     * @type {?}
     */
    SidenavComponent.prototype.show;
    /** @type {?} */
    SidenavComponent.prototype.element;
    /** @type {?} */
    SidenavComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9wYWdlLXdyYXBwZXIvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7Ozs7OztBQWEzRCxNQUFNLHVCQUF3QixTQUFRLGFBQWE7Ozs7O0lBYy9DLFlBQXNCLE9BQW1CLEVBQVMsR0FBZ0I7UUFFOUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRk8sWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWE7S0FHakU7Ozs7SUFFRCxlQUFlOztRQUdYLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQzNFOzs7O0lBRUQsSUFBSTtRQUVBLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOzs7O0lBRUQsS0FBSztRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOzs7O0lBRUQsTUFBTTtRQUVGLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQzFCOzs7WUEzQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QiwwVEFBcUM7O2FBRXhDOzs7O1lBZmtCLFVBQVU7WUFDckIsV0FBVzs7O29CQW9CZCxLQUFLO21CQU1MLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vudmlyb25tZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7UGFnZU1lbnVJdGVtfSBmcm9tICcuLi9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcblxuLyoqXG4gKiAgVGhpcyBpcyBhIHRlbXBvcmFyeSBpbXBsZW1lbnRhdGlvbiBmb3IgdGhlIHBhZ2UgaGVhZGVyIGNvbXBvbmVudC5cbiAqICBXaGVuIHRoZSByZWFsIGltcGxlbWVudGF0aW9uIG9mIHNpZGUgbWVudSBpcyBkb25lLCBQYWdlSGVhZGVyQ29tcG9uZW50IHdpbGxcbiAqICBiZSBzd2FwZWQgdG8gdXNlIGl0LlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1zaWRlbmF2JyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NpZGVuYXYuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydzaWRlbmF2LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2lkZW5hdkNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcbiAgICAvKipcbiAgICAgKiBsaXN0IG9mIG1lbnUgaXRlbXNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGl0ZW1zOiBQYWdlTWVudUl0ZW1bXTtcblxuICAgIC8qKlxuICAgICAqIGRpc3BsYXlzIHRoZSBiYWNrIGxpbmsgdGhhdCBuYXZpZ2F0ZXMgdXNlciB0byB0aGUgcHJldmlvdXMgcGFnZSB3aGVuIGNsaWNrZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaG93OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICB9XG5cbiAgICBnZXRTaWRlbmF2Q2xhc3MoKTogc3RyaW5nXG4gICAge1xuICAgICAgICAvLyBPbmx5IHNob3cgaWYgSSBoYXZlIGl0ZW1zXG4gICAgICAgIHJldHVybiAodGhpcy5zaG93ICYmIHRoaXMuaXRlbXMpID8gJ3NpZGVuYXYgc2lkZW5hdi1hY3RpdmUnIDogJ3NpZGVuYXYnO1xuICAgIH1cblxuICAgIG9wZW4oKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zaG93ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLnNob3cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zaG93ID0gIXRoaXMuc2hvdztcbiAgICB9XG59XG4iXX0=