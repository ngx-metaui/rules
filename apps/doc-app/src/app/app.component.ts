import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  tabletQuery: MediaQueryList;
  mobileQuery: MediaQueryList;

  @ViewChild('sidenav') private sidenav: MatSidenav;

  readonly tabletQueryListener: () => void;
  readonly mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
  ) {
    this.tabletQuery = media.matchMedia('(max-width: 1000px)');
    this.mobileQuery = media.matchMedia('(max-width: 780px)');
    this.tabletQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.tabletQuery.addListener(this.tabletQueryListener);
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    /* Dynamic title change and close nav  */
    this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route: ActivatedRoute) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        mergeMap((route: ActivatedRoute) => route.data),
      )
      .subscribe((event: {title: string}) => {
        this.titleService.setTitle(event.title);

        if (this.tabletQuery.matches) {
          this.sidenav.close();
        }
      });
  }

  ngOnDestroy(): void {
    this.tabletQuery.removeListener(this.tabletQueryListener);
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
