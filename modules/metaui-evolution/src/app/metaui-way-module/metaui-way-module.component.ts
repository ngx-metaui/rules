import {Component, OnInit} from '@angular/core';
import {ItemProperties, MenuItemCommand, ModuleInfo, UIMeta} from '@aribaui/metaui';
import {isPresent, RoutingService} from '@aribaui/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'metaui-way-module',
    templateUrl: './metaui-way-module.component.html',
    styleUrls: ['./metaui-way-module.component.scss']
})
export class MetauiWayModuleComponent implements OnInit
{

    items: MenuItemCommand[];

    tabName: string = 'Home';
    _selectedModule: ItemProperties;

    _moduleInfo: ModuleInfo;


    constructor(private rs: RoutingService, private activatedRoute: ActivatedRoute)
    {

    }

    ngOnInit()
    {

        this.items = [];
        let uiMeta = UIMeta.getInstance();


        this._moduleInfo = uiMeta.computeModuleInfo();
        if (isPresent(this._moduleInfo) && this._moduleInfo.modules.length > 0) {
            this._moduleInfo.modules.forEach((module: ItemProperties) =>
            {

                let item: MenuItemCommand = {
                    label: uiMeta.currentModuleLabel(module.name),
                    moduleName: module.name,
                    routePath: `/${module.name.toLowerCase()}`,
                    command: (event: any) =>
                    {
                        this.tabChanged(event);
                    }
                };
                this.items.push(item);

            });

            this._selectedModule = this._moduleInfo.modules[0];

            uiMeta.gotoModule(this._selectedModule,
                `/${this.activatedRoute.snapshot.url
                    .map((segment) => segment.path).join('/')}`);

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
