import { BaseComponent } from '@aribaui/components';
import { Environment } from '@aribaui/core';
import { ActivatedRoute } from '@angular/router';
/**
 * Default homePage implementation for a Module. Just like on the example bellow when we define a
 * module without a homePage this MetaHomePageComponent will be used.
 *
 * ```
 *
 *   @module=Home {
 *       label:"My Home";
 *       pageTitle:"You are now on Homepage";
 *
 *       @layout=Today {
 *          after:zTop;
 *          label: "Sales Graph";
 *          component:SalesGraphComponent;
 *     }
 *  }
 *
 * ```
 * Or you can decide not to use this MetaHomePage and Provide your own e.g:
 *
 * ```
 *  @module=Products {
 *      label:"Products for Somethig";
 *      pageTitle:"You are now on Products";
 *      homePage:ProductContentComponent;
 *  }
 *
 * ```
 *
 *
 */
export declare class MetaHomePageComponent extends BaseComponent {
    env: Environment;
    private activatedRoute;
    module: string;
    constructor(env: Environment, activatedRoute: ActivatedRoute);
    /**
     *
     * This page is triggered by router and we expect a module to be passed in by routing
     * params
     *
     */
    ngOnInit(): void;
    hasModule(): boolean;
}
