/**
 *
 * @license
 * Copyright 2017 SAP Ariba
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
 *
 *
 */
import {Component, ElementRef, Input} from '@angular/core';
import {Environment} from '../../../../core/config/environment';
import {PageMenuItem} from '../page-header/page-header.component';
import {BaseComponent} from '../../../core/base.component';

/**
 *  This is a temporary implementation for the page header component.
 *  When the real implementation of side menu is done, PageHeaderComponent will
 *  be swaped to use it.
 *
 */
@Component({
  selector: 'aw-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss']
})
export class SidenavComponent extends BaseComponent {
  /**
   * list of menu items
   */
  @Input()
  items: PageMenuItem[];

  /**
   * displays the back link that navigates user to the previous page when clicked.
   */
  @Input()
  show: boolean;

  constructor(protected element: ElementRef, public env: Environment) {
    super(env);
  }

  getSidenavClass(): string {
    // Only show if I have items
    return (this.show && this.items) ? 'sidenav sidenav-active' : 'sidenav';
  }

  open(): void {
    this.show = true;
  }

  close(): void {
    this.show = false;
  }

  toggle(): void {
    this.show = !this.show;
  }
}
