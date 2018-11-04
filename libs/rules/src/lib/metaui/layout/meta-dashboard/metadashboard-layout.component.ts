/**
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {Component} from '@angular/core';
import {isPresent} from '../../../core/utils/lang';
import {Environment} from '../../../core/config/environment';
import {MetaLayout} from '../meta-layout';
import {MetaContextComponent} from '../../core/meta-context/meta-context.component';
import {UIMeta} from '../../core/uimeta';
import {Context} from '../../core/context';
import {ItemProperties} from '../../core/item-properties';


/**
 *
 * Defines 4 sizes for the portlet size
 *
 */
const PortletSizes: { [k: string]: string } = {
  'small': 'ui-md-3',
  'medium': 'ui-md-4',
  'wide': 'ui-md-6',
  'large': 'ui-md-12'
};

/**
 * Simple Dashboard implementation for the homePage. Just like we support inside MetaFormTable
 * different zones and distribute fields to them, we do the same with defined layouts.
 *
 * This dashboard supports 3 zones.
 *
 *    zToc: This is the place where usually all the actions or 2nd level navigation will go
 *    zTop,zBottom: is where the portlets are rendered.
 *
 *
 * To distribute layouts to different zones :
 *
 * ```
 *       @module=Home {
 *           label:"My Home";
 *           pageTitle:"You are now on Homepage";
 *
 *
 *           @layout=Today {
 *              after:zTop;
 *              label: "Sales Graph";
 *              component:SalesGraphComponent;
 *
 *           }
 *
 *           @layout=Sport {
 *              after:Today;
 *              label: "Sport today!";
 *              component:StringComponent;
 *              bindings:{value:"The Texas Tech quarterback arrived at  " }
 *
 *           }
 *
 * ```
 *
 *  or Push actions to the zToc zone:
 *
 * ```
 *       @module=Home {
 *           label:"My Home";
 *           pageTitle:"You are now on Homepage";
 *
 *
 *           @layout=Today {
 *              after:zTop;
 *              label: "Sales Graph";
 *              component:SalesGraphComponent;
 *
 *           }
 *
 *            @layout=Actions#ActionLinks {
 *               label:$[a004]Actions;
 *                after:zToc;
 *            }
 *
 *
 *           @actionCategory=Create {
 *              @action=NewBlog#pageAction { pageName:blogPage;}
 *              @action=NewChart#pageAction { pageName:chartPage;}
 *           }
 *
 * }
 *
 *
 *
 */
@Component({
  templateUrl: 'metadashboard-layout.component.html',
  styleUrls: ['metadashboard-layout.component.scss']
})
export class MetaDashboardLayoutComponent extends MetaLayout {

  /**
   * New defined zone for Actions
   *
   */
  static ZoneToc = 'zToc';
  static ZonesTB = [
    MetaDashboardLayoutComponent.ZoneToc, UIMeta.ZoneTop,
    UIMeta.ZoneBottom
  ];

  /**
   * Defines if sidebar is collapsed or expanded
   *
   */
  activeMenu: boolean = false;

  /**
   * Current Module name
   *
   */
  dashboardName: string = '';

  constructor(metaContext: MetaContextComponent, env: Environment) {
    super(metaContext, env);
  }


  ngOnInit(): void {
    super.ngOnInit();

    this.dashboardName = this.label();
  }

  toggleMenu(event: any) {
    this.activeMenu = !this.activeMenu;
  }

  zones(): string[] {
    return MetaDashboardLayoutComponent.ZonesTB;
  }

  topLayouts(): ItemProperties[] {
    const tops = this.layoutsByZones.get(UIMeta.ZoneTop);

    return isPresent(tops) ? tops : [];
  }

  portletWidth(name: string): any {
    const lContext: Context = this.contextMap.get(name);
    const width = lContext.propertyForKey('portletWidth');
    return isPresent(width) && isPresent(PortletSizes[width]) ? PortletSizes[width] :
      'ui-md-4';
  }

  bottomLayouts(): ItemProperties[] {
    const bottom = this.layoutsByZones.get(UIMeta.ZoneBottom);

    return isPresent(bottom) ? bottom : [];
  }


  zTocLayouts(): ItemProperties[] {
    const bottom = this.layoutsByZones.get(MetaDashboardLayoutComponent.ZoneToc);
    return isPresent(bottom) ? bottom : [];
  }


}
