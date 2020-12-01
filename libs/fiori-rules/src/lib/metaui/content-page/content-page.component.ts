/**
 * @license
 * F. Kolar
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
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MetaIncludeComponent} from '@ngx-metaui/rules';


/**
 * Simple implementation for rendering nested objects
 *
 *
 */
@Component({
  selector: 'm-content-page',
  templateUrl: 'content-page.component.html',
  styleUrls: ['content-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaContentPageComponent implements OnInit, OnDestroy, AfterViewInit {

  object: any;
  operation: string;
  newContext: boolean = true;

  /**
   * Rendered object detail can have a section label
   */
  label: string;


  @ViewChild(MetaIncludeComponent)
  metaInclude: MetaIncludeComponent;

  constructor(private route: ActivatedRoute, private _cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: Array<any>) => {

      // We can probably configure different  RouteReuseStrategy but now we dont delete the
      // ViewContainer to force re-create content again.
      if (this.metaInclude && data['entity'][0]) {
        (<OnInit>this.metaInclude).ngOnInit();
      }

      this.object = data['entity'][0];
      this.operation = this.route.snapshot.params['operation'] || 'view';

      if (this.object) {
        this.label = this.route.snapshot.params.type;
      }
      this._cd.markForCheck();

      setTimeout(() => {
        this._cd.markForCheck();
      }, 200);
    });
  }


  onBack(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }


  ngOnDestroy(): void {

  }


}
