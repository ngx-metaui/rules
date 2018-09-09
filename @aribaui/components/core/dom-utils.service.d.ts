/**
 * Simple convenient service to work with the dom. All the future logic related to DOM manipulation
 * or traversal should be put into this service
 *
 */
export declare class DomUtilsService {
    constructor();
    /**
     * goes all the way up to the body and checks if there is a element identified by a 'selector'
     *
     */
    hasParent(nativeElement: any, selector: string): boolean;
    /**
     *  Travels all the way up to the BODY and retrieve element identified by 'selector' or NULL if
     * not found
     *
     */
    closest(nativeElement: any, selector: string): any;
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
    insertIntoParentNgContent(parentNativeEl: any, childNativeEl: any): void;
    /**
     *
     * Retrieves current browser window width and height
     *
     */
    browserDimentions(): any;
    /**
     *
     * Retrieves elemements dimensions
     *
     */
    elementDimensions(element: any): any;
}
