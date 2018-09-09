import { Environment } from '@aribaui/core';
import { BaseComponent } from '@aribaui/components';
/**
 * Just like MetaContentPage this components renders meta context details but embedded as some
 * inline component. Not a page with page level buttons
 *
 *
 * Todo: We dont really need this component we we in the future extends MetaIncludeComponent to
 * support awcontentElement:
 *
 * ```
 *  {
 *      component:MetaContextComponent;
 *      bindings: {
 *          object:$value;
 *          layout:Inspect;
 *          operation:view;
 *          awcontentElement:MetaIncludeComponnetDirective;
 *      }
 *
 *  }
 *
 *  ```
 *
 *  This would instantiate right meta context just like this class.
 */
export declare class MetaObjectDetailComponent extends BaseComponent {
    env: Environment;
    /**
     * Object detail to be rendered
     */
    object: any;
    /**
     * For the detail view we always use read only content
     */
    operation: string;
    /**
     * Default layout
     *
     */
    layout: string;
    /**
     * Rendered object detail can have a section label
     */
    label: string;
    constructor(env: Environment);
    ngOnInit(): void;
}
