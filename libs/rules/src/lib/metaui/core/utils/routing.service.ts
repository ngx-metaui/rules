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
import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Route, Router} from '@angular/router';
import { Location } from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {isBlank, isPresent} from '../utils/lang';
import {delay, distinctUntilChanged, shareReplay, startWith, tap} from 'rxjs/operators';

/**
 * Basic wrapper around Angular's ROUTE service for use of MetaUI.
 *
 *
 * Todo: Replace this as this is already absolete !!
 *
 */
@Injectable()
export class RoutingService {

  /**
   * This is just a temporary until we refactor this into its own class
   */
  appRouting: BehaviorSubject<AppRoute[]> = new BehaviorSubject<AppRoute[]>(null);

  constructor(public router: Router, public location: Location) {
    if (router) {

    }
  }

  /**
   * Convenient GO BACK method. which takes you to previous route along with the URL change.
   *
   *
   */
  goBack(): void {
    if (isBlank(this.router)) {
      throw new Error('Please import RouterModule to use this functionality!');
    }

    this.location.back();
  }

  /**
   *
   * When navigating to a new Page you can use directly router or if you want to remember some
   * state tne this method can be used as well.
   *
   */
  navigate<T>(commands: any[], state?: T, extras?: NavigationExtras): void {
    if (isBlank(this.router)) {
      throw new Error('Please import RouterModule to use this functionality!');
    }
    this.router.navigate(commands, extras);

  }


  /**
   *
   * When navigating to a new Page you can use directly router or if you want to remember some
   * state tne this method can be used as well.
   *
   */
  navigateWithRoute<T>(route: Route, params?: any, state?: T, extras?: NavigationExtras): void {
    if (isBlank(this.router)) {
      throw new Error('Please import RouterModule to use this functionality!');
    }
    if (!route.data) {
      route.data = {};
    }
    route.data['object'] = state;
    this.router.navigate([route.path, params], extras);
  }

  /**
   * Utility method so check extra parameters which are passed using Matrix notation
   *
   *
   */
  operation(route: ActivatedRoute): string {
    const operation = route.snapshot.params['o'];
    return isBlank(
      operation) || (operation !== 'view' && operation !== 'create' && operation !== 'edit')
      ? 'view' : operation;
  }


  /**
   * Assembles a path based on the current route.
   *
   */
  pathForPage(pageName: string, pathName: string): string {
    if (isBlank(this.router)) {
      throw new Error('Please import RouterModule to use this functionality!');
    }
    return `${this.router.routerState.snapshot.url}/${pathName}`;
  }

  /**
   *
   * Search top level routes and return Route that has component name equal to pageName
   *
   *
   */
  routeForPage(pageName: string, pathName: string = '', activatedPath: string = ''): Route {
    if (isBlank(this.router)) {
      throw new Error('Please import RouterModule to use this functionality!');
    }

    let nextRoute: any;
    // we need this as we need to lookup if there is any route with given pageName as
    // child route, if not search for global onces

    const normalizedPath = activatedPath.indexOf('/') === 0 ? activatedPath.substring(1) :
      activatedPath;

    const currentRoute: Route = this.router.config.find((r: Route) => {
        const routePath = r.path.indexOf('/') === 0 ? r.path.substring(1) :
          r.path;
        return isPresent(normalizedPath) && normalizedPath === routePath;
      }
    );

    // try to match the path and expected pageName
    if (isPresent(pathName) && isPresent(currentRoute) && currentRoute.children &&
      currentRoute.children.length > 0) {

      nextRoute = currentRoute.children.find((r: Route) => {
        return pathName === r.path;
      });
    } else if (isPresent(pageName)) {

      nextRoute = this.router.config.find((r: Route) => {
        if (r.component) {
          const componentName = r.component.prototype.constructor.name;
          return pathName === r.path && pageName === componentName;
        } else {
          return false;
        }
      });
    }
    // path not found then check only if we find anywhere in the path pageNae
    if (isBlank(nextRoute)) {
      this.router.config.forEach((r: Route) => {
        if (isPresent(r.component)) {
          const componentName = r.component.prototype.constructor.name;
          if (pageName === componentName) {
            nextRoute = r;
          }
        }
      });
    }
    return nextRoute;
  }

  contextualCommands(): Observable<AppRoute[]> {
    return this.appRouting.pipe(
      startWith(null),
      distinctUntilChanged(),
      delay(0),
      tap((config) => config),
      shareReplay()
    );
  }
}

export interface AppRoute {
  id?: string;
  label?: string;
  path?: string;
  action?: (event: any) => void;
  icon?: string;
  showBefore?: boolean;
  executionContext?: any;
}


