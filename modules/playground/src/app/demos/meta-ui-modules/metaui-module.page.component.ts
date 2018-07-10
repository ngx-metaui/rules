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
 */
import {Component} from '@angular/core';
import {BaseComponent} from '@aribaui/components';
import {Environment, RoutingService, isPresent} from '@aribaui/core';
import {MenuItemCommand, UIMeta, ItemProperties, ModuleInfo} from '@aribaui/metaui';
import {ActivatedRoute} from '@angular/router';


@Component({
    templateUrl: './metaui-module.page.component.html',
    styleUrls: ['./metaui-module.page.component.scss']
})
export class MetaUIModulePageComponent extends BaseComponent
{

    items: MenuItemCommand[];

    tabName: string = 'Home';
    _selectedModule: ItemProperties;

    _moduleInfo: ModuleInfo;

    constructor(public env: Environment, private rs: RoutingService,
                private activatedRoute: ActivatedRoute)
    {
        super(env);

    }


    ngOnInit()
    {

        super.ngOnInit();

        this.items = [];
        let uiMeta = UIMeta.getInstance();

        this._moduleInfo = uiMeta.computeModuleInfo();
        if (isPresent(this._moduleInfo)) {
            this._moduleInfo.modules.forEach((module: ItemProperties) =>
            {

                let item: MenuItemCommand = {
                    label: uiMeta.currentModuleLabel(module.name),
                    icon: 'ariba-icon icon-adashboard',
                    moduleName: module.name,
                    routePath: `/play/metaui-modules/${module.name.toLowerCase()}`,
                    command: (event: any) =>
                    {
                        this.tabChanged(event);
                    }
                };
                this.items.push(item);

            });

            this._selectedModule = this._moduleInfo.modules[0];

            uiMeta.gotoModule(this._selectedModule,
                `/${this.activatedRoute.snapshot.url.map((segment) => segment.path).join('/')}`);
        }
    }


    tabChanged(event: any): void
    {
        this.tabName = event.item.label;
        this._selectedModule = this._moduleInfo.moduleByNames.get(event.item.moduleName);

        let uiMeta = UIMeta.getInstance();
        uiMeta.gotoModule(this._selectedModule,
            `/${this.activatedRoute.snapshot.url.map((segment) => segment.path).join('/')}`);
    }


}


@Component({
    selector: 'product-content',
    template: `<h3>This is my Custom Product Page</h3>

        <p>
            This page has only simple H3 and paragraphs that has only some coppied text from
             news server.
         </p>


        <p>
        Whereas this seems to be promising, this approach suffers from drawbacks and isn’t the
            recommended one by the Angular team. The main drawback is that it prevents us from
            using offline compile to precompile component templates. Using a custom decorator
            for components also prevents external tools from detecting that they are actually
            components.
        In this article, we will describe another approach based on the component composition
        based on components and attribute directives. We will deal with the way to implement
        it, its advantages and limitations.
        </p>

    `
})
export class ProductContentComponent
{

}




