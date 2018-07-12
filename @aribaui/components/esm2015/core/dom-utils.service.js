/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        let /** @type {?} */ firstChar = selector.charAt(0);
        let /** @type {?} */ parentNode = nativeElement;
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
        // default behavior is to insert it as child to parentNativeEl
        let /** @type {?} */ ngContentParent = parentNativeEl;
        let /** @type {?} */ foundNgContent = parentNativeEl.querySelector('.u-ngcontent');
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
    { type: Injectable },
];
/** @nocollapse */
DomUtilsService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9kb20tdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBU3hDLE1BQU07SUFHRjtLQUVDOzs7Ozs7OztJQU1ELFNBQVMsQ0FBRSxhQUFrQixFQUFFLFFBQWdCO1FBRTNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUMzRDs7Ozs7Ozs7O0lBUUQsT0FBTyxDQUFFLGFBQWtCLEVBQUUsUUFBZ0I7UUFFekMscUJBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkMscUJBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQztRQUcvQixPQUFPLFNBQVMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3JELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekUsTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUNyQjtZQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsS0FBSyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUNyQjs7WUFHRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLE1BQU0sQ0FBQyxVQUFVLENBQUM7YUFDckI7WUFFRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0NELHlCQUF5QixDQUFFLGNBQW1CLEVBQUUsYUFBa0I7O1FBRzlELHFCQUFJLGVBQWUsR0FBRyxjQUFjLENBQUM7UUFFckMscUJBQUksY0FBYyxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFFNUIsZUFBZSxHQUFHLGNBQWMsQ0FBQztTQUNwQztRQUNELGVBQWUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7S0FFOUM7Ozs7Ozs7SUFRRCxpQkFBaUI7UUFFYixNQUFNLENBQUM7WUFDSCxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVzttQkFDMUQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDakMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVk7bUJBQzdELFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ3JDLENBQUM7S0FDTDs7Ozs7Ozs7SUFRRCxpQkFBaUIsQ0FBRSxPQUFZO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7S0FDbEY7OztZQTFJSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG5cbi8qKlxuICogU2ltcGxlIGNvbnZlbmllbnQgc2VydmljZSB0byB3b3JrIHdpdGggdGhlIGRvbS4gQWxsIHRoZSBmdXR1cmUgbG9naWMgcmVsYXRlZCB0byBET00gbWFuaXB1bGF0aW9uXG4gKiBvciB0cmF2ZXJzYWwgc2hvdWxkIGJlIHB1dCBpbnRvIHRoaXMgc2VydmljZVxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVV0aWxzU2VydmljZVxue1xuXG4gICAgY29uc3RydWN0b3IgKClcbiAgICB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ29lcyBhbGwgdGhlIHdheSB1cCB0byB0aGUgYm9keSBhbmQgY2hlY2tzIGlmIHRoZXJlIGlzIGEgZWxlbWVudCBpZGVudGlmaWVkIGJ5IGEgJ3NlbGVjdG9yJ1xuICAgICAqXG4gICAgICovXG4gICAgaGFzUGFyZW50IChuYXRpdmVFbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuY2xvc2VzdChuYXRpdmVFbGVtZW50LCBzZWxlY3RvcikpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIFRyYXZlbHMgYWxsIHRoZSB3YXkgdXAgdG8gdGhlIEJPRFkgYW5kIHJldHJpZXZlIGVsZW1lbnQgaWRlbnRpZmllZCBieSAnc2VsZWN0b3InIG9yIE5VTEwgaWZcbiAgICAgKiBub3QgZm91bmRcbiAgICAgKlxuICAgICAqL1xuICAgIGNsb3Nlc3QgKG5hdGl2ZUVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgbGV0IGZpcnN0Q2hhciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcblxuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IG5hdGl2ZUVsZW1lbnQ7XG5cblxuICAgICAgICB3aGlsZSAoaXNQcmVzZW50KChwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlKSkpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09ICcuJyAmJiBwYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3Rvci5zdWJzdHIoMSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmaXJzdENoYXIgPT09ICcjJyAmJiBwYXJlbnROb2RlLmlkID09PSBzZWxlY3Rvci5zdWJzdHIoMSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgc2VsZWN0b3IgaXMgYSB0YWdcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlLm5vZGVUeXBlID09PSAxICYmIHBhcmVudE5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBwYXJlbnROb2RlLnRhZ05hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gYW5ndWxhciBjb21wb25lbnQgaXMgcmVuZGVyZWQgYWxvbmcgd2l0aCBOR0NvbnRlbnQgaXQgaGFzIGl0cyBvd24gX25nQ29udGVudF9JTkRFWFxuICAgICAqIHdoaWNoIGFsd2F5cyBjb3JyZXNwb25kcyB3aXRoIF9uZ2hvc3RfSU5ERVgsIHRoaXMgd29ya3MgZmluZSBpZiB3ZSBoYXZlIGFjdHVhbCBjb21wb25lbnRcbiAgICAgKiB0aGF0IGlzIGFscmVhZHkgcmVuZGVyZWQuIElmIHdlIGFyZSBjcmVhdGluZyBjb21wb25lbnQgcHJvZ3JhbWF0aWNhbGx5IHRoZXJlIGlzIG5vIHdheSB0b1xuICAgICAqIGlkZW50aWZ5IHdoZXJlIHRoZSBhY3R1YWwgbmctY29udGVudCBpcyBwbGFjZWQgd2l0aGluIHRoZSBjb21wb25lbnRcbiAgICAgKlxuICAgICAqIGUuZy4gQ29uc2lkZXIgZm9sbG93aW5nIGV4YW1wbGU6XG4gICAgICpcbiAgICAgKlxuICAgICAqIEJ1dHRvbiBDb21wb25lbnQgVGVtcGxhdGU6XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgPHNwYW4gY2xhc3M9bXlidXR0b25UaXRsZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9zcGFuPlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogV2hlbiB5b3UgdXNlIGJ1dHRvbiBjb21wb25lbnQgYXMgPGF3LWJ1dHRvbj5DbGlja01lPC9hdy1idXR0b24+ICB0aGVuIGl0cyByZW5kZXJlZCBhc1xuICAgICAqXG4gICAgICogYGBgXG4gICAgICogPGF3LWJ1dHRvbiBfbmdob3N0XzEyMz5cbiAgICAgKiAgPHNwYW4gX25nY29udGVudF8xMjMgY2xhc3M9bXlidXR0b25UaXRsZT5DbGlja01lPC9zcGFuPlxuICAgICAqIDwvYXctYnV0dG9uPlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQnV0IHdpdGggcHJvZ3JhbW1hdGljIEFQSSB5b3UgaW5zdGFudGlhdGUgQnV0dG9uIGFuZCBzaW5jZSBpdCBjcmVhdGVkIHdpdGhvdXQgYSBDb250ZW50IGl0XG4gICAgICogbG9va3MgbGlrZSB0aGlzO1xuICAgICAqXG4gICAgICogIGBgYFxuICAgICAqIDxhdy1idXR0b24gX25naG9zdF8xMjM+XG4gICAgICogIDxzcGFuIGNsYXNzPW15YnV0dG9uVGl0bGU+PC9zcGFuPlxuICAgICAqIDwvYXctYnV0dG9uPlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogV2hlcmUgZG8geW91IHBsYWNlIHlvdSBjaGlsZCAoY29udGVudCBjb21wb25lbnQpPyBUaGVyZWZvcmUgdXRpbGl0eSBjc3MgY2xhc3Mgd2FzIGNyZWF0ZWRcbiAgICAgKiB0byB3cmFwIDxuZy1jb250ZW50PiB0byBnZXQgYXJvdW5kIHRoaXMgbGltaXRhdGlvbi5cbiAgICAgKlxuICAgICAqICBgYGBcbiAgICAgKiAgIDxzcGFuIGNsYXNzPVwidS1uZ2NvbnRlbnRcIj5cbiAgICAgKiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgKiAgIDwvc3Bhbj5cbiAgICAgKiAgYGBgYFxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgaW5zZXJ0SW50b1BhcmVudE5nQ29udGVudCAocGFyZW50TmF0aXZlRWw6IGFueSwgY2hpbGROYXRpdmVFbDogYW55KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gZGVmYXVsdCBiZWhhdmlvciBpcyB0byBpbnNlcnQgaXQgYXMgY2hpbGQgdG8gcGFyZW50TmF0aXZlRWxcbiAgICAgICAgbGV0IG5nQ29udGVudFBhcmVudCA9IHBhcmVudE5hdGl2ZUVsO1xuXG4gICAgICAgIGxldCBmb3VuZE5nQ29udGVudCA9IHBhcmVudE5hdGl2ZUVsLnF1ZXJ5U2VsZWN0b3IoJy51LW5nY29udGVudCcpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGZvdW5kTmdDb250ZW50KSkge1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgY292ZXIgYSBjYXNlIHdoZXJlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIG5nY29udGVudHNcbiAgICAgICAgICAgIG5nQ29udGVudFBhcmVudCA9IGZvdW5kTmdDb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIG5nQ29udGVudFBhcmVudC5hcHBlbmRDaGlsZChjaGlsZE5hdGl2ZUVsKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXRyaWV2ZXMgY3VycmVudCBicm93c2VyIHdpbmRvdyB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgICpcbiAgICAgKi9cbiAgICBicm93c2VyRGltZW50aW9ucyAoKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICAgICAgICAgICAgICB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKSxcbiAgICAgICAgICAgIGhlaWdodDogKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICAgICAgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpXG4gICAgICAgIH07XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFJldHJpZXZlcyBlbGVtZW1lbnRzIGRpbWVuc2lvbnNcbiAgICAgKlxuICAgICAqL1xuICAgIGVsZW1lbnREaW1lbnNpb25zIChlbGVtZW50OiBhbnkpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge2xlZnQ6IDAsIHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgeDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMH07XG4gICAgfVxufVxuXG4iXX0=