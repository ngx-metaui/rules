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
var DomUtilsService = /** @class */ (function () {
    function DomUtilsService() {
    }
    /**
     * goes all the way up to the body and checks if there is a element identified by a 'selector'
     *
     */
    /**
     * goes all the way up to the body and checks if there is a element identified by a 'selector'
     *
     * @param {?} nativeElement
     * @param {?} selector
     * @return {?}
     */
    DomUtilsService.prototype.hasParent = /**
     * goes all the way up to the body and checks if there is a element identified by a 'selector'
     *
     * @param {?} nativeElement
     * @param {?} selector
     * @return {?}
     */
    function (nativeElement, selector) {
        return isPresent(this.closest(nativeElement, selector));
    };
    /**
     *  Travels all the way up to the BODY and retrieve element identified by 'selector' or NULL if
     * not found
     *
     */
    /**
     *  Travels all the way up to the BODY and retrieve element identified by 'selector' or NULL if
     * not found
     *
     * @param {?} nativeElement
     * @param {?} selector
     * @return {?}
     */
    DomUtilsService.prototype.closest = /**
     *  Travels all the way up to the BODY and retrieve element identified by 'selector' or NULL if
     * not found
     *
     * @param {?} nativeElement
     * @param {?} selector
     * @return {?}
     */
    function (nativeElement, selector) {
        var /** @type {?} */ firstChar = selector.charAt(0);
        var /** @type {?} */ parentNode = nativeElement;
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
    };
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
     */
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
    DomUtilsService.prototype.insertIntoParentNgContent = /**
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
    function (parentNativeEl, childNativeEl) {
        // default behavior is to insert it as child to parentNativeEl
        var /** @type {?} */ ngContentParent = parentNativeEl;
        var /** @type {?} */ foundNgContent = parentNativeEl.querySelector('.u-ngcontent');
        if (isPresent(foundNgContent)) {
            // we don't cover a case where there could be multiple ngcontents
            ngContentParent = foundNgContent;
        }
        ngContentParent.appendChild(childNativeEl);
    };
    /**
     *
     * Retrieves current browser window width and height
     *
     */
    /**
     *
     * Retrieves current browser window width and height
     *
     * @return {?}
     */
    DomUtilsService.prototype.browserDimentions = /**
     *
     * Retrieves current browser window width and height
     *
     * @return {?}
     */
    function () {
        return {
            width: (window.innerWidth || document.documentElement.clientWidth
                || document.body.clientWidth),
            height: (window.innerHeight || document.documentElement.clientHeight
                || document.body.clientHeight)
        };
    };
    /**
     *
     * Retrieves elemements dimensions
     *
     */
    /**
     *
     * Retrieves elemements dimensions
     *
     * @param {?} element
     * @return {?}
     */
    DomUtilsService.prototype.elementDimensions = /**
     *
     * Retrieves elemements dimensions
     *
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (isPresent(element.getBoundingClientRect)) {
            return element.getBoundingClientRect();
        }
        return { left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0, width: 0, height: 0 };
    };
    DomUtilsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DomUtilsService.ctorParameters = function () { return []; };
    return DomUtilsService;
}());
export { DomUtilsService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsiY29yZS9kb20tdXRpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBb0JBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztJQVlwQztLQUVDO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUNILG1DQUFTOzs7Ozs7O0lBQVQsVUFBVyxhQUFrQixFQUFFLFFBQWdCO1FBRTNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUMzRDtJQUdEOzs7O09BSUc7Ozs7Ozs7OztJQUNILGlDQUFPOzs7Ozs7OztJQUFQLFVBQVMsYUFBa0IsRUFBRSxRQUFnQjtRQUV6QyxxQkFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuQyxxQkFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDO1FBRy9CLE9BQU8sU0FBUyxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLENBQUMsVUFBVSxDQUFDO2FBQ3JCO1lBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLENBQUMsVUFBVSxDQUFDO2FBQ3JCOztZQUdELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDN0UsTUFBTSxDQUFDLFVBQVUsQ0FBQzthQUNyQjtZQUVELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Q0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDSCxtREFBeUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUF6QixVQUEyQixjQUFtQixFQUFFLGFBQWtCOztRQUc5RCxxQkFBSSxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBRXJDLHFCQUFJLGNBQWMsR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRTVCLGVBQWUsR0FBRyxjQUFjLENBQUM7U0FDcEM7UUFDRCxlQUFlLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBRTlDO0lBR0Q7Ozs7T0FJRzs7Ozs7OztJQUNILDJDQUFpQjs7Ozs7O0lBQWpCO1FBRUksTUFBTSxDQUFDO1lBQ0gsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVc7bUJBQzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2pDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZO21CQUM3RCxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUNyQyxDQUFDO0tBQ0w7SUFHRDs7OztPQUlHOzs7Ozs7OztJQUNILDJDQUFpQjs7Ozs7OztJQUFqQixVQUFtQixPQUFZO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7S0FDbEY7O2dCQTFJSixVQUFVOzs7OzBCQTdCWDs7U0E4QmEsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG4vKipcbiAqIFNpbXBsZSBjb252ZW5pZW50IHNlcnZpY2UgdG8gd29yayB3aXRoIHRoZSBkb20uIEFsbCB0aGUgZnV0dXJlIGxvZ2ljIHJlbGF0ZWQgdG8gRE9NIG1hbmlwdWxhdGlvblxuICogb3IgdHJhdmVyc2FsIHNob3VsZCBiZSBwdXQgaW50byB0aGlzIHNlcnZpY2VcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21VdGlsc1NlcnZpY2VcbntcblxuICAgIGNvbnN0cnVjdG9yICgpXG4gICAge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdvZXMgYWxsIHRoZSB3YXkgdXAgdG8gdGhlIGJvZHkgYW5kIGNoZWNrcyBpZiB0aGVyZSBpcyBhIGVsZW1lbnQgaWRlbnRpZmllZCBieSBhICdzZWxlY3RvcidcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc1BhcmVudCAobmF0aXZlRWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmNsb3Nlc3QobmF0aXZlRWxlbWVudCwgc2VsZWN0b3IpKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICBUcmF2ZWxzIGFsbCB0aGUgd2F5IHVwIHRvIHRoZSBCT0RZIGFuZCByZXRyaWV2ZSBlbGVtZW50IGlkZW50aWZpZWQgYnkgJ3NlbGVjdG9yJyBvciBOVUxMIGlmXG4gICAgICogbm90IGZvdW5kXG4gICAgICpcbiAgICAgKi9cbiAgICBjbG9zZXN0IChuYXRpdmVFbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnlcbiAgICB7XG4gICAgICAgIGxldCBmaXJzdENoYXIgPSBzZWxlY3Rvci5jaGFyQXQoMCk7XG5cbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBuYXRpdmVFbGVtZW50O1xuXG5cbiAgICAgICAgd2hpbGUgKGlzUHJlc2VudCgocGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZSkpKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGFyID09PSAnLicgJiYgcGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0b3Iuc3Vic3RyKDEpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmlyc3RDaGFyID09PSAnIycgJiYgcGFyZW50Tm9kZS5pZCA9PT0gc2VsZWN0b3Iuc3Vic3RyKDEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHNlbGVjdG9yIGlzIGEgdGFnXG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBwYXJlbnROb2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUubm9kZVR5cGUgPT09IDEgJiYgcGFyZW50Tm9kZS50YWdOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGFuZ3VsYXIgY29tcG9uZW50IGlzIHJlbmRlcmVkIGFsb25nIHdpdGggTkdDb250ZW50IGl0IGhhcyBpdHMgb3duIF9uZ0NvbnRlbnRfSU5ERVhcbiAgICAgKiB3aGljaCBhbHdheXMgY29ycmVzcG9uZHMgd2l0aCBfbmdob3N0X0lOREVYLCB0aGlzIHdvcmtzIGZpbmUgaWYgd2UgaGF2ZSBhY3R1YWwgY29tcG9uZW50XG4gICAgICogdGhhdCBpcyBhbHJlYWR5IHJlbmRlcmVkLiBJZiB3ZSBhcmUgY3JlYXRpbmcgY29tcG9uZW50IHByb2dyYW1hdGljYWxseSB0aGVyZSBpcyBubyB3YXkgdG9cbiAgICAgKiBpZGVudGlmeSB3aGVyZSB0aGUgYWN0dWFsIG5nLWNvbnRlbnQgaXMgcGxhY2VkIHdpdGhpbiB0aGUgY29tcG9uZW50XG4gICAgICpcbiAgICAgKiBlLmcuIENvbnNpZGVyIGZvbGxvd2luZyBleGFtcGxlOlxuICAgICAqXG4gICAgICpcbiAgICAgKiBCdXR0b24gQ29tcG9uZW50IFRlbXBsYXRlOlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogIDxzcGFuIGNsYXNzPW15YnV0dG9uVGl0bGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pjwvc3Bhbj5cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIFdoZW4geW91IHVzZSBidXR0b24gY29tcG9uZW50IGFzIDxhdy1idXR0b24+Q2xpY2tNZTwvYXctYnV0dG9uPiAgdGhlbiBpdHMgcmVuZGVyZWQgYXNcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqIDxhdy1idXR0b24gX25naG9zdF8xMjM+XG4gICAgICogIDxzcGFuIF9uZ2NvbnRlbnRfMTIzIGNsYXNzPW15YnV0dG9uVGl0bGU+Q2xpY2tNZTwvc3Bhbj5cbiAgICAgKiA8L2F3LWJ1dHRvbj5cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEJ1dCB3aXRoIHByb2dyYW1tYXRpYyBBUEkgeW91IGluc3RhbnRpYXRlIEJ1dHRvbiBhbmQgc2luY2UgaXQgY3JlYXRlZCB3aXRob3V0IGEgQ29udGVudCBpdFxuICAgICAqIGxvb2tzIGxpa2UgdGhpcztcbiAgICAgKlxuICAgICAqICBgYGBcbiAgICAgKiA8YXctYnV0dG9uIF9uZ2hvc3RfMTIzPlxuICAgICAqICA8c3BhbiBjbGFzcz1teWJ1dHRvblRpdGxlPjwvc3Bhbj5cbiAgICAgKiA8L2F3LWJ1dHRvbj5cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIFdoZXJlIGRvIHlvdSBwbGFjZSB5b3UgY2hpbGQgKGNvbnRlbnQgY29tcG9uZW50KT8gVGhlcmVmb3JlIHV0aWxpdHkgY3NzIGNsYXNzIHdhcyBjcmVhdGVkXG4gICAgICogdG8gd3JhcCA8bmctY29udGVudD4gdG8gZ2V0IGFyb3VuZCB0aGlzIGxpbWl0YXRpb24uXG4gICAgICpcbiAgICAgKiAgYGBgXG4gICAgICogICA8c3BhbiBjbGFzcz1cInUtbmdjb250ZW50XCI+XG4gICAgICogICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICogICA8L3NwYW4+XG4gICAgICogIGBgYGBcbiAgICAgKlxuICAgICAqXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIGluc2VydEludG9QYXJlbnROZ0NvbnRlbnQgKHBhcmVudE5hdGl2ZUVsOiBhbnksIGNoaWxkTmF0aXZlRWw6IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGRlZmF1bHQgYmVoYXZpb3IgaXMgdG8gaW5zZXJ0IGl0IGFzIGNoaWxkIHRvIHBhcmVudE5hdGl2ZUVsXG4gICAgICAgIGxldCBuZ0NvbnRlbnRQYXJlbnQgPSBwYXJlbnROYXRpdmVFbDtcblxuICAgICAgICBsZXQgZm91bmROZ0NvbnRlbnQgPSBwYXJlbnROYXRpdmVFbC5xdWVyeVNlbGVjdG9yKCcudS1uZ2NvbnRlbnQnKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChmb3VuZE5nQ29udGVudCkpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNvdmVyIGEgY2FzZSB3aGVyZSB0aGVyZSBjb3VsZCBiZSBtdWx0aXBsZSBuZ2NvbnRlbnRzXG4gICAgICAgICAgICBuZ0NvbnRlbnRQYXJlbnQgPSBmb3VuZE5nQ29udGVudDtcbiAgICAgICAgfVxuICAgICAgICBuZ0NvbnRlbnRQYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGROYXRpdmVFbCk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogUmV0cmlldmVzIGN1cnJlbnQgYnJvd3NlciB3aW5kb3cgd2lkdGggYW5kIGhlaWdodFxuICAgICAqXG4gICAgICovXG4gICAgYnJvd3NlckRpbWVudGlvbnMgKCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgICAgICAgICAgICAgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCksXG4gICAgICAgICAgICBoZWlnaHQ6ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgICAgICAgICAgIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KVxuICAgICAgICB9O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZXRyaWV2ZXMgZWxlbWVtZW50cyBkaW1lbnNpb25zXG4gICAgICpcbiAgICAgKi9cbiAgICBlbGVtZW50RGltZW5zaW9ucyAoZWxlbWVudDogYW55KTogYW55XG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtsZWZ0OiAwLCB0b3A6IDAsIHJpZ2h0OiAwLCBib3R0b206IDAsIHg6IDAsIHk6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDB9O1xuICAgIH1cbn1cblxuIl19