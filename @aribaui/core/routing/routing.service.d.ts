import { ActivatedRoute, Event, NavigationExtras, Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
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
export declare class RoutingService {
    router: Router;
    /**
     * Stack keeping active Routes so we can go back/redirect back
     *
     */
    private routingState;
    /**
     * Temporary field holding a state Object of type T before its saved into stateCacheHistory,
     * and retrieved when getting back from State
     */
    private currentStateFrom;
    /**
     * Temporary field holding a state Object of type T before its saved into stateCacheHistory,
     * and retrieved when getting to State
     */
    private currentStateTo;
    stateCache: Subject<any>;
    /**
     *
     * This is our cache which maps URL => to = >STATE. Any page can save any state using
     * observable object which will be retrieved back.
     *
     */
    stateCacheHistory: Map<string, any>;
    constructor(router: Router);
    /**
     *
     * Here is the main routing logic that proceses every routing events.
     *
     */
    subscribeToRoutingEvents(event: Event): void;
    /**
     * Convenient GO BACK method. which takes you to previous route along with the URL change.
     *
     *
     */
    goBack(numOfSteps?: number): void;
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     */
    navigate<T>(commands: any[], state?: T, extras?: NavigationExtras): void;
    /**
     *
     * When navigating to a new Page you can use directly router or if you want to remember some
     * state tne this method can be used as well.
     *
     */
    navigateWithRoute<T>(route: Route, params?: any, state?: T, extras?: NavigationExtras): void;
    /**
     *
     * Entry method for broadcasting stateCache and sending saved State back to the page
     *
     *
     */
    bindStateCache<T>(listener: (item: T) => void): void;
    /**
     * Utility method so check extra parameters which are passed using Matrix notation
     *
     *
     */
    operation(route: ActivatedRoute): string;
    /**
     * Assembles a path based on the current route.
     *
     */
    pathForPage(pageName: string, pathName: string): string;
    /**
     *
     * Search top level routes and return Route that has component name equal to pageName
     *
     *
     */
    routeForPage(pageName: string, pathName?: string, activatedPath?: string): Route;
}
