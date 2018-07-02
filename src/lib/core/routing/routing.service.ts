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
import {
    ActivatedRoute,
    Event,
    NavigationEnd,
    NavigationExtras,
    NavigationStart,
    Route,
    Router
} from '@angular/router';
import {Subject} from 'rxjs';
import {isBlank, isPresent} from '../utils/lang';
import {ListWrapper} from '../utils/collection';

/**
 * Basic wrapper around Angular's ROUTE service to simplify temporary state caching as well
 * navigation. This service listen for Routing events such as NavigationStart as well,
 * NavigationEnds and when the routing Enters, We check if there any state which needs to be cached
 * if yes then we save it into the stateCacheHistory which maps final URL to the actual STATE
 * object, and when we are navigate back to the same URL We check if there is any saved state.
 *
 * This service was originally created as a response that angular always destroyes and recreates
 * components when navigating aways and then back to it. By a of angular 4.2.0+ this might be
 * obsolete.
 *
 */
@Injectable()
export class RoutingService
{
    /**
     * Stack keeping active Routes so we can go back/redirect back
     *
     */
    private routingState: Event[] = [];

    /**
     * Temporary field holding a state Object of type T before its saved into stateCacheHistory,
     * and retrieved when getting back from State
     */
    private currentStateFrom: any;


    /**
     * Temporary field holding a state Object of type T before its saved into stateCacheHistory,
     * and retrieved when getting to State
     */
    private currentStateTo: any;

    /*
     * Event object for registering listeners to save a certain state as well as broadcasting back
     * when state needs to be retrieved back to the Page
     *
     */
    stateCache: Subject<any> = new Subject<any>();

    /**
     *
     * This is our cache which maps URL => to = >STATE. Any page can save any state using
     * observable object which will be retrieved back.
     *
     */
    stateCacheHistory: Map<string, any> = new Map<string, any>();


    constructor(public router: Router)
    {
        this.router.events.subscribe((event: Event) => this.subscribeToRoutingEvents(event));
    }

    /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     */
    subscribeToRoutingEvents(event: Event): void
    {

        if (event instanceof NavigationEnd) {
            let url = event.url;
            if (this.stateCacheHistory.has(url)) {
                this.stateCache.next(this.stateCacheHistory.get(url));
                this.stateCacheHistory.delete(url);
            }
            this.routingState.push(event);
        }

        if (event instanceof NavigationStart) {

            let itemBeforeRoute = ListWrapper.last<Event>(this.routingState);


            if (isPresent(this.currentStateFrom) && isPresent(itemBeforeRoute) && isPresent(
                    this.currentStateFrom) && itemBeforeRoute instanceof NavigationEnd ||
                itemBeforeRoute instanceof NavigationStart) {

                this.stateCacheHistory.set(itemBeforeRoute.url, this.currentStateFrom);
                this.currentStateFrom = null;

            } else if (isPresent(this.currentStateTo)) {
                this.stateCacheHistory.set(event.url, this.currentStateTo);
                this.currentStateTo = null;
            }
        }
    }

    /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     */
    goBack(numOfSteps: number = 1): void
    {
        // we are starting from -1 as we need to also remove current route
        let steps = -1;
        let navigateUrl = '/404';
        while (steps !== numOfSteps) {
            let popState = this.routingState.pop();
            if (popState instanceof NavigationEnd || popState instanceof NavigationStart) {
                navigateUrl = popState.url;
                steps++;
            }
        }

        this.router.navigateByUrl(navigateUrl);
    }

    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     */
    navigate<T>(commands: any[], state?: T, extras?: NavigationExtras): void
    {
        this.currentStateFrom = state;
        this.router.navigate(commands, extras);


    }


    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     */
    navigateWithRoute<T>(route: Route, params?: any, state?: T, extras?: NavigationExtras): void
    {
        this.currentStateTo = state;
        this.router.navigate([route.path, params], extras);
    }

    /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     */
    bindStateCache<T>(listener: (item: T) => void): void
    {
        this.stateCache.asObservable().subscribe((stateItem: T) => listener(stateItem));
    }

    /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     */
    operation(route: ActivatedRoute): string
    {
        let operation = route.snapshot.params['o'];
        return isBlank(
            operation) || (operation !== 'view' && operation !== 'create' && operation !== 'edit')
            ? 'view' : operation;
    }


    /**
     * Assembles a path based on the current route.
     *
     */
    pathForPage(pageName: string, pathName: string): string
    {
        return `${this.router.routerState.snapshot.url}/${pathName}`;
    }

    /**
     *
     * Search top level routes and return Route that has component name equal to pageName
     *
     *
     */
    routeForPage(pageName: string, pathName?: string, activatedPath?: string): Route
    {
        let nextRoute: any;
        // we need this as we need to lookup if there is any route with given pageName as
        // child route, if not search for global onces

        let normalizedPath = activatedPath.indexOf('/') === 0 ? activatedPath.substring(1) :
            activatedPath;

        let currentRoute: Route = this.router.config.find((r: Route) =>
            {
                let routePath = r.path.indexOf('/') === 0 ? r.path.substring(1) :
                    r.path;
                return isPresent(normalizedPath) && normalizedPath === routePath;
            }
        );

        // try to match the path and expected pageName
        if (isPresent(pathName) && isPresent(currentRoute) && currentRoute.children.length > 0) {

            nextRoute = currentRoute.children.find((r: Route) =>
            {
                let componentName = r.component.prototype.constructor.name;
                return pathName === r.path && pageName === componentName;
            });
        } else if (isPresent(pageName)) {

            nextRoute = this.router.config.find((r: Route) =>
            {
                let componentName = r.component.prototype.constructor.name;
                return pathName === r.path && pageName === componentName;
            });
        }
        // path not found then check only if we find anywhere in the path pageNae
        if (isBlank(nextRoute)) {
            this.router.config.forEach((r: Route) =>
            {
                if (isPresent(r.component)) {
                    let componentName = r.component.prototype.constructor.name;
                    if (pageName === componentName) {
                        nextRoute = r;
                    }
                }
            });
        }
        return nextRoute;
    }

}


