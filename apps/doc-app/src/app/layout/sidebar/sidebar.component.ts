import { Component, OnInit } from '@angular/core';
import { HeadingsListService } from '../../services/headings-list.service';
import { NavigationEnd, Route, Router, RouterEvent, Routes } from '@angular/router';

import { routes } from '../../app.routing';
import { filter } from 'rxjs/operators';
import { AnchorScrollService } from '../../services/anchor-scroll.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  navItems: HTMLElement[];
  menuList: Routes;
  activeRoute: string;
  activeFragment: string;

  constructor(
    private router: Router,
    private headingsListService: HeadingsListService,
  ) {
    this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.activeRoute = this.router.url.split('#')[0].replace('/', '');
        this.activeFragment = this.router.url.split('#')[1];
      });

    this.menuList = routes.filter((route: Route) => {
      return route.path; // exclude empty route
    });
  }

  ngOnInit(): void {
    this.headingsListService.navList
      .subscribe((data: HTMLElement[]) => {
        this.navItems = data;
      });
  }
}
