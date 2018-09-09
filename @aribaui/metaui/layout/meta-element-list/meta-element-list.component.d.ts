import { DomSanitizer } from '@angular/platform-browser';
import { Environment } from '@aribaui/core';
import { MetaLayout } from '../meta-layout';
import { MetaContextComponent } from '../../core/meta-context/meta-context.component';
/**
 * MetaElementList is implementation of Stack Layout where the content is rendered as list (stacked)
 * You do not use this layout directly as it is instantiated dynamically using MetaIncludeComponent.
 *
 * For more detail please checkout WidgetRules.oss the part bellow where create new trait
 * that can be applied to any layout.
 *
 * ```
 *
 * layout {
 *
 *   @trait=Stack { visible:true; component:MetaElementListComponent }
 *
 * }
 *
 * ```
 *
 * Actual usage could be :
 *
 *
 * ```
 *  layout=Inspect2#Stack {
 *       @layout=First#Form {
 *           elementStyle:"padding-bottom:100px";
 *       }
 *       @layout=Second#Form { zonePath:Second; }
 *   }
 *
 *
 *
 *    class=User {
 *       zNone => *;
 *       zLeft => firstName => lastName => age => department;
 *       Second.zLeft => email;
 *
 *   }
 *
 * ```
 *
 */
export declare class MetaElementListComponent extends MetaLayout {
    protected _metaContext: MetaContextComponent;
    env: Environment;
    sanitizer: DomSanitizer;
    constructor(_metaContext: MetaContextComponent, env: Environment, sanitizer: DomSanitizer);
    styleString(name: string): any;
    classString(name: string): any;
}
