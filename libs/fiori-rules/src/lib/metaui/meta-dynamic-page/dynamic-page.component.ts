/**
 * @license
 * Copyright F. Kolar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild
} from '@angular/core';
import {MetaContextComponent, MetaLayout} from '@ngx-metaui/rules';
import {DynamicPageBackgroundType, DynamicPageResponsiveSize} from '@fundamental-ngx/platform';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


export const ZonesDP = ['zTitle', 'zHeader', 'zContent', 'zFooter'];

/**
 * Renders a dynamic form based on current MetaContext
 *
 */
@Component({
  selector: 'm-dynamic-page',
  templateUrl: 'dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaDynamicPageComponent extends MetaLayout
  implements AfterViewInit {

  @ViewChild('layoutMC', {static: true})
  private _mc: MetaContextComponent;

  @Input()
  background: DynamicPageBackgroundType = 'solid';

  @Input()
  size: DynamicPageResponsiveSize = 'extra-large';

  @Input()
  offset = 0;

  get metaContext(): MetaContextComponent {
    return this._mc;
  }

  private _destroy: Subject<void> = new Subject<void>();

  constructor(public _cd: ChangeDetectorRef, public _parentMC: MetaContextComponent) {
    super();
  }


  zones(): string[] {
    return ZonesDP;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.metaContext.contextChanged$
      .pipe(takeUntil(this._destroy))
      .subscribe(context => {
        this._cd.markForCheck();
      });

  }


  ngAfterViewInit(): void {
  }


  log(layoutMC: MetaContextComponent): string {

    console.log(layoutMC.context.allProperties());

    return 'asdfsf';
  }
}

