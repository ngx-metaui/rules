import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ItemProperties, META_RULES, MetaRules, ModuleInfo} from '@ngx-metaui/rules';
import {ActivatedRoute, Router} from '@angular/router';
import {ShellbarUser, ShellbarUserMenu} from '@fundamental-ngx/core';

@Component({
  selector: 'm-app',
  templateUrl: './meta-application.component.html',
  styleUrls: ['./meta-application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaApplicationComponent implements OnInit, OnDestroy {
  @Input()
  routePrefix: string = '/';

  _selectedModule: ItemProperties;
  _moduleInfo: ModuleInfo;

  tabName: string = 'Home';
  tabs: Array<ModuleItem>;

  /**
   * old code for shellbar
   */
  searchTerm: string;

  searchTerms = [
    'PR22201 - David R - Compputer Assets',
    'PR22202 - Any D - MacBook Pro',
    'PR22202 - Any D - Angular Consultants'
  ];


  user: ShellbarUser = {
    initials: 'WW',
    colorAccent: 11
  };

  userMenu: ShellbarUserMenu[] = [
    {
      text: 'Settings', callback: () => {
      }
    },
    {
      text: 'Sign Out', callback: () => {
      }
    }
  ];
  actions = [
    {
      glyph: 'pool', callback: () => {
      }, label: 'Pool',
      notificationCount: 3, notificationLabel: 'Pool Count'
    },
    {
      glyph: 'bell', callback: () => {
      }, label: 'Notifications',
      notificationCount: 1, notificationLabel: 'Unread Notifications'
    }
  ];
  /**
   * END OF OLD CODE
   *
   */

  tabsVisible: boolean = true;

  constructor(@Inject(META_RULES) protected uiMeta: MetaRules,
              private _cd: ChangeDetectorRef,
              public router: Router,
              private activatedRoute: ActivatedRoute) {

  }


  ngOnInit() {
    this.tabs = [];
    this.activatedRoute.url.subscribe(() => {
      this.tabsVisible = this.showTabs();
    });

    this._moduleInfo = this.uiMeta.computeModuleInfo();
    if (this._moduleInfo && this._moduleInfo.modules.length > 0) {
      this._moduleInfo.modules.forEach((module: ItemProperties) => {

        const item: ModuleItem = {
          label: this.uiMeta.currentModuleLabel(module.name),
          moduleName: module.name,
          routePath: `${this.routePrefix}/${module.name.toLowerCase()}`
        };
        this.tabs.push(item);
      });
      this._selectedModule = this._moduleInfo.modules[0];
      this.selectTab(this.tabs[0]);
      this.tabsVisible = this.showTabs();
    }

  }

  selectTab(tab: ModuleItem) {
    this._selectedModule = this._moduleInfo.moduleByNames.get(tab.moduleName);
    this.tabName = tab.moduleName;

    this.uiMeta.go2Module(this._selectedModule, this.routePrefix);
    this._cd.markForCheck();
  }

  private showTabs(): boolean {
    return this.tabsVisible = this.tabs.findIndex((item) =>
      this.router.url.indexOf(item.routePath) > -1) !== -1;
  }

  ngOnDestroy(): void {

  }

}


export interface ModuleItem {
  label?: string;
  moduleName?: string;
  routePath?: string;
}
