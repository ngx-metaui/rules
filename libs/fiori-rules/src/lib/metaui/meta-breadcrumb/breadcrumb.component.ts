import {ChangeDetectorRef, Component} from '@angular/core';
import {MetaContextComponent, MetaLayout} from '@ngx-metaui/rules';


@Component({
  templateUrl: 'breadcrumb.component.html'
})
export class MetaBredcrumbComponent extends MetaLayout {

  get metaContext(): MetaContextComponent {
    return this._parentMC;
  }

  constructor(public _cd: ChangeDetectorRef, public _parentMC: MetaContextComponent) {
    super();
  }

}
