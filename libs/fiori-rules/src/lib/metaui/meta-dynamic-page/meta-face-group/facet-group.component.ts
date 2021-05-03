import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MetaBaseComponent, MetaContextComponent} from '@ngx-metaui/rules';


@Component({
  templateUrl: 'facet-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaFacetGroupComponent extends MetaBaseComponent {
  @ViewChild('classMC', {static: true})
  private _mc: MetaContextComponent;


  get metaContext(): MetaContextComponent {
    return this._mc;
  }

  constructor(public _cd: ChangeDetectorRef, public _parentMC: MetaContextComponent) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
