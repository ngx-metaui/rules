import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemProperties, META_RULES, MetaRules, ModuleInfo, RoutingService} from '@ngx-metaui/rules';
import {MenuItemCommand} from '@ngx-metaui/primeng-rules';

@Component({
  selector: 'app-way-module',
  templateUrl: './metaui-way-module.component.html',
  styleUrls: ['./metaui-way-module.component.scss']
})
export class MetauiWayModuleComponent implements OnInit {

  items: MenuItemCommand[];

  tabName: string = 'Home';
  _selectedModule: ItemProperties;

  _moduleInfo: ModuleInfo;


  constructor(@Inject(META_RULES) protected uiMeta: MetaRules,
              private rs: RoutingService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.items = [];

    this._moduleInfo = this.uiMeta.computeModuleInfo();
    if (this._moduleInfo && this._moduleInfo.modules.length > 0) {
      this._moduleInfo.modules.forEach((module: ItemProperties) => {

        const item: MenuItemCommand = {
          label: this.uiMeta.currentModuleLabel(module.name),
          moduleName: module.name,
          routePath: `/${module.name.toLowerCase()}`,
          command: (event: any) => {
            this.tabChanged(event);
          }
        };
        this.items.push(item);

      });

      this._selectedModule = this._moduleInfo.modules[0];

      this.uiMeta.gotoModule(this._selectedModule,
        `/${this.activatedRoute.snapshot.url
          .map((segment) => segment.path).join('/')}`);

    }
  }

  tabChanged(event: any): void {
    this.tabName = event.item.label;
    this._selectedModule = this._moduleInfo.moduleByNames.get(event.item.moduleName);

    this.uiMeta.gotoModule(this._selectedModule,
      `/${this.activatedRoute.snapshot.url.map((segment) => segment.path).join('/')}`);
  }

}
