/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isPresent } from '@aribaui/core';
/**
 * Simple convenient service to work with the dom. All the future logic related to DOM manipulation
 * or traversal should be put into this service
 *
 */
export class DomUtilsService {
    constructor() {
    }
    /**
     * goes all the way up to the body and checks if there is a element identified by a 'selector'
     *
     * @param {?} nativeElement
     * @param {?} selector
     * @return {?}
     */
    hasParent(nativeElement, selector) {
        return isPresent(this.closest(nativeElement, selector));
    }
    /**
     *  Travels all the way up to the BODY and retrieve element identified by 'selector' or NULL if
     * not found
     *
     * @param {?} nativeElement
     * @param {?} selector
     * @return {?}
     */
    closest(nativeElement, selector) {
        /** @type {?} */
        let firstChar = selector.charAt(0);
        /** @type {?} */
        let parentNode = nativeElement;
        while (isPresent((parentNode = parentNode.parentNode))) {
            if (firstChar === '.' && parentNode.classList.contains(selector.substr(1))) {
                return parentNode;
            }
            if (firstChar === '#' && parentNode.id === selector.substr(1)) {
                return parentNode;
            }
            // If selector is a tag
            if (parentNode.nodeType === 1 && parentNode.tagName.toLowerCase() === selector) {
                return parentNode;
            }
            if (parentNode.nodeType === 1 && parentNode.tagName === 'BODY') {
                return null;
            }
        }
        return null;
    }
    /**
     * When angular component is rendered along with NGContent it has its own _ngContent_INDEX
     * which always corresponds with _nghost_INDEX, this works fine if we have actual component
     * that is already rendered. If we are creating component programatically there is no way to
     * identify where the actual ng-content is placed within the component
     *
     * e.g. Consider following example:
     *
     *
     * Button Component Template:
     *
     * ```
     *  <span class=mybuttonTitle><ng-content></ng-content></span>
     * ```
     *
     * When you use button component as <aw-button>ClickMe</aw-button>  then its rendered as
     *
     * ```
     * <aw-button _nghost_123>
     *  <span _ngcontent_123 class=mybuttonTitle>ClickMe</span>
     * </aw-button>
     * ```
     *
     * But with programmatic API you instantiate Button and since it created without a Content it
     * looks like this;
     *
     *  ```
     * <aw-button _nghost_123>
     *  <span class=mybuttonTitle></span>
     * </aw-button>
     * ```
     *
     * Where do you place you child (content component)? Therefore utility css class was created
     * to wrap <ng-content> to get around this limitation.
     *
     *  ```
     *   <span class="u-ngcontent">
     *      <ng-content></ng-content>
     *   </span>
     *  ````
     *
     *
     *
     *
     * @param {?} parentNativeEl
     * @param {?} childNativeEl
     * @return {?}
     */
    insertIntoParentNgContent(parentNativeEl, childNativeEl) {
        /** @type {?} */
        let ngContentParent = parentNativeEl;
        /** @type {?} */
        let foundNgContent = parentNativeEl.querySelector('.u-ngcontent');
        if (isPresent(foundNgContent)) {
            // we don't cover a case where there could be multiple ngcontents
            ngContentParent = foundNgContent;
        }
        ngContentParent.appendChild(childNativeEl);
    }
    /**
     *
     * Retrieves current browser window width and height
     *
     * @return {?}
     */
    browserDimentions() {
        return {
            width: (window.innerWidth || document.documentElement.clientWidth
                || document.body.clientWidth),
            height: (window.innerHeight || document.documentElement.clientHeight
                || document.body.clientHeight)
        };
    }
    /**
     *
     * Retrieves elemements dimensions
     *
     * @param {?} element
     * @return {?}
     */
    elementDimensions(element) {
        if (isPresent(element.getBoundingClientRect)) {
            return element.getBoundingClientRect();
        }
        return { left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0, width: 0, height: 0 };
    }
}
DomUtilsService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DomUtilsService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9kb20tdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBU3hDLE1BQU07SUFHRjtLQUVDOzs7Ozs7OztJQU1ELFNBQVMsQ0FBRSxhQUFrQixFQUFFLFFBQWdCO1FBRTNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUMzRDs7Ozs7Ozs7O0lBUUQsT0FBTyxDQUFFLGFBQWtCLEVBQUUsUUFBZ0I7O1FBRXpDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRW5DLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQztRQUcvQixPQUFPLFNBQVMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekUsTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUNyQjtZQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUNyQjs7WUFHRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLE1BQU0sQ0FBQyxVQUFVLENBQUM7YUFDckI7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0NELHlCQUF5QixDQUFFLGNBQW1CLEVBQUUsYUFBa0I7O1FBRzlELElBQUksZUFBZSxHQUFHLGNBQWMsQ0FBQzs7UUFFckMsSUFBSSxjQUFjLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUU1QixlQUFlLEdBQUcsY0FBYyxDQUFDO1NBQ3BDO1FBQ0QsZUFBZSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUU5Qzs7Ozs7OztJQVFELGlCQUFpQjtRQUViLE1BQU0sQ0FBQztZQUNILEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXO21CQUMxRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNqQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWTttQkFDN0QsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDckMsQ0FBQztLQUNMOzs7Ozs7OztJQVFELGlCQUFpQixDQUFFLE9BQVk7UUFFM0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDMUM7UUFDRCxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztLQUNsRjs7O1lBMUlKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBTaW1wbGUgY29udmVuaWVudCBzZXJ2aWNlIHRvIHdvcmsgd2l0aCB0aGUgZG9tLiBBbGwgdGhlIGZ1dHVyZSBsb2dpYyByZWxhdGVkIHRvIERPTSBtYW5pcHVsYXRpb25cbiAqIG9yIHRyYXZlcnNhbCBzaG91bGQgYmUgcHV0IGludG8gdGhpcyBzZXJ2aWNlXG4gKlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tVXRpbHNTZXJ2aWNlXG57XG5cbiAgICBjb25zdHJ1Y3RvciAoKVxuICAgIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnb2VzIGFsbCB0aGUgd2F5IHVwIHRvIHRoZSBib2R5IGFuZCBjaGVja3MgaWYgdGhlcmUgaXMgYSBlbGVtZW50IGlkZW50aWZpZWQgYnkgYSAnc2VsZWN0b3InXG4gICAgICpcbiAgICAgKi9cbiAgICBoYXNQYXJlbnQgKG5hdGl2ZUVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5jbG9zZXN0KG5hdGl2ZUVsZW1lbnQsIHNlbGVjdG9yKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgVHJhdmVscyBhbGwgdGhlIHdheSB1cCB0byB0aGUgQk9EWSBhbmQgcmV0cmlldmUgZWxlbWVudCBpZGVudGlmaWVkIGJ5ICdzZWxlY3Rvcicgb3IgTlVMTCBpZlxuICAgICAqIG5vdCBmb3VuZFxuICAgICAqXG4gICAgICovXG4gICAgY2xvc2VzdCAobmF0aXZlRWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICBsZXQgZmlyc3RDaGFyID0gc2VsZWN0b3IuY2hhckF0KDApO1xuXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gbmF0aXZlRWxlbWVudDtcblxuXG4gICAgICAgIHdoaWxlIChpc1ByZXNlbnQoKHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUpKSkge1xuICAgICAgICAgICAgaWYgKGZpcnN0Q2hhciA9PT0gJy4nICYmIHBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdG9yLnN1YnN0cigxKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZpcnN0Q2hhciA9PT0gJyMnICYmIHBhcmVudE5vZGUuaWQgPT09IHNlbGVjdG9yLnN1YnN0cigxKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiBzZWxlY3RvciBpcyBhIHRhZ1xuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUubm9kZVR5cGUgPT09IDEgJiYgcGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlLm5vZGVUeXBlID09PSAxICYmIHBhcmVudE5vZGUudGFnTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBhbmd1bGFyIGNvbXBvbmVudCBpcyByZW5kZXJlZCBhbG9uZyB3aXRoIE5HQ29udGVudCBpdCBoYXMgaXRzIG93biBfbmdDb250ZW50X0lOREVYXG4gICAgICogd2hpY2ggYWx3YXlzIGNvcnJlc3BvbmRzIHdpdGggX25naG9zdF9JTkRFWCwgdGhpcyB3b3JrcyBmaW5lIGlmIHdlIGhhdmUgYWN0dWFsIGNvbXBvbmVudFxuICAgICAqIHRoYXQgaXMgYWxyZWFkeSByZW5kZXJlZC4gSWYgd2UgYXJlIGNyZWF0aW5nIGNvbXBvbmVudCBwcm9ncmFtYXRpY2FsbHkgdGhlcmUgaXMgbm8gd2F5IHRvXG4gICAgICogaWRlbnRpZnkgd2hlcmUgdGhlIGFjdHVhbCBuZy1jb250ZW50IGlzIHBsYWNlZCB3aXRoaW4gdGhlIGNvbXBvbmVudFxuICAgICAqXG4gICAgICogZS5nLiBDb25zaWRlciBmb2xsb3dpbmcgZXhhbXBsZTpcbiAgICAgKlxuICAgICAqXG4gICAgICogQnV0dG9uIENvbXBvbmVudCBUZW1wbGF0ZTpcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqICA8c3BhbiBjbGFzcz1teWJ1dHRvblRpdGxlPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBXaGVuIHlvdSB1c2UgYnV0dG9uIGNvbXBvbmVudCBhcyA8YXctYnV0dG9uPkNsaWNrTWU8L2F3LWJ1dHRvbj4gIHRoZW4gaXRzIHJlbmRlcmVkIGFzXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiA8YXctYnV0dG9uIF9uZ2hvc3RfMTIzPlxuICAgICAqICA8c3BhbiBfbmdjb250ZW50XzEyMyBjbGFzcz1teWJ1dHRvblRpdGxlPkNsaWNrTWU8L3NwYW4+XG4gICAgICogPC9hdy1idXR0b24+XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBCdXQgd2l0aCBwcm9ncmFtbWF0aWMgQVBJIHlvdSBpbnN0YW50aWF0ZSBCdXR0b24gYW5kIHNpbmNlIGl0IGNyZWF0ZWQgd2l0aG91dCBhIENvbnRlbnQgaXRcbiAgICAgKiBsb29rcyBsaWtlIHRoaXM7XG4gICAgICpcbiAgICAgKiAgYGBgXG4gICAgICogPGF3LWJ1dHRvbiBfbmdob3N0XzEyMz5cbiAgICAgKiAgPHNwYW4gY2xhc3M9bXlidXR0b25UaXRsZT48L3NwYW4+XG4gICAgICogPC9hdy1idXR0b24+XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBXaGVyZSBkbyB5b3UgcGxhY2UgeW91IGNoaWxkIChjb250ZW50IGNvbXBvbmVudCk/IFRoZXJlZm9yZSB1dGlsaXR5IGNzcyBjbGFzcyB3YXMgY3JlYXRlZFxuICAgICAqIHRvIHdyYXAgPG5nLWNvbnRlbnQ+IHRvIGdldCBhcm91bmQgdGhpcyBsaW1pdGF0aW9uLlxuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqICAgPHNwYW4gY2xhc3M9XCJ1LW5nY29udGVudFwiPlxuICAgICAqICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAqICAgPC9zcGFuPlxuICAgICAqICBgYGBgXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbnNlcnRJbnRvUGFyZW50TmdDb250ZW50IChwYXJlbnROYXRpdmVFbDogYW55LCBjaGlsZE5hdGl2ZUVsOiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIGluc2VydCBpdCBhcyBjaGlsZCB0byBwYXJlbnROYXRpdmVFbFxuICAgICAgICBsZXQgbmdDb250ZW50UGFyZW50ID0gcGFyZW50TmF0aXZlRWw7XG5cbiAgICAgICAgbGV0IGZvdW5kTmdDb250ZW50ID0gcGFyZW50TmF0aXZlRWwucXVlcnlTZWxlY3RvcignLnUtbmdjb250ZW50Jyk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZm91bmROZ0NvbnRlbnQpKSB7XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBjb3ZlciBhIGNhc2Ugd2hlcmUgdGhlcmUgY291bGQgYmUgbXVsdGlwbGUgbmdjb250ZW50c1xuICAgICAgICAgICAgbmdDb250ZW50UGFyZW50ID0gZm91bmROZ0NvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgbmdDb250ZW50UGFyZW50LmFwcGVuZENoaWxkKGNoaWxkTmF0aXZlRWwpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHJpZXZlcyBjdXJyZW50IGJyb3dzZXIgd2luZG93IHdpZHRoIGFuZCBoZWlnaHRcbiAgICAgKlxuICAgICAqL1xuICAgIGJyb3dzZXJEaW1lbnRpb25zICgpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpLFxuICAgICAgICAgICAgaGVpZ2h0OiAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgICAgICB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodClcbiAgICAgICAgfTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0cmlldmVzIGVsZW1lbWVudHMgZGltZW5zaW9uc1xuICAgICAqXG4gICAgICovXG4gICAgZWxlbWVudERpbWVuc2lvbnMgKGVsZW1lbnQ6IGFueSk6IGFueVxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudChlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7bGVmdDogMCwgdG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCB4OiAwLCB5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwfTtcbiAgICB9XG59XG5cbiJdfQ==