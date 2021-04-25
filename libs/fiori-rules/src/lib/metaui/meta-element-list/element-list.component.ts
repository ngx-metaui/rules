import {ChangeDetectorRef, Component} from '@angular/core';
import {Context, MetaContextComponent, MetaLayout} from '@ngx-metaui/rules';

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
@Component({
  templateUrl: 'element-list.component.html'
})
export class MetaElementListComponent extends MetaLayout {

  get metaContext(): MetaContextComponent {
    return this._parentMC;
  }

  constructor(public _cd: ChangeDetectorRef, public _parentMC: MetaContextComponent) {
    super();
  }

}
