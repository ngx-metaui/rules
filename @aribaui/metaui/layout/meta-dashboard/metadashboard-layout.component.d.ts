import { Environment } from '@aribaui/core';
import { MetaLayout } from '../meta-layout';
import { MetaContextComponent } from '../../core/meta-context/meta-context.component';
import { ItemProperties } from '../../core/item-properties';
/**
 * Simple Dashboard implementation for the homePage. Just like we support inside MetaFormTable
 * different zones and distribute fields to them, we do the same with defined layouts.
 *
 * This dashboard supports 3 zones.
 *
 *    zToc: This is the place where usually all the actions or 2nd level navigation will go
 *    zTop,zBottom: is where the portlets are rendered.
 *
 *
 * To distribute layouts to different zones :
 *
 * ```
 *       @module=Home {
 *           label:"My Home";
 *           pageTitle:"You are now on Homepage";
 *
 *
 *           @layout=Today {
 *              after:zTop;
 *              label: "Sales Graph";
 *              component:SalesGraphComponent;
 *
 *           }
 *
 *           @layout=Sport {
 *              after:Today;
 *              label: "Sport today!";
 *              component:StringComponent;
 *              bindings:{value:"The Texas Tech quarterback arrived at  " }
 *
 *           }
 *
 * ```
 *
 *  or Push actions to the zToc zone:
 *
 * ```
 *       @module=Home {
 *           label:"My Home";
 *           pageTitle:"You are now on Homepage";
 *
 *
 *           @layout=Today {
 *              after:zTop;
 *              label: "Sales Graph";
 *              component:SalesGraphComponent;
 *
 *           }
 *
 *            @layout=Actions#ActionLinks {
 *               label:$[a004]Actions;
 *                after:zToc;
 *            }
 *
 *
 *           @actionCategory=Create {
 *              @action=NewBlog#pageAction { pageName:blogPage;}
 *              @action=NewChart#pageAction { pageName:chartPage;}
 *           }
 *
 * }
 *
 *
 *
 */
export declare class MetaDashboardLayoutComponent extends MetaLayout {
    /**
     * New defined zone for Actions
     *
     */
    static ZoneToc: string;
    static ZonesTB: string[];
    /**
     * Defines if sidebar is collapsed or expanded
     *
     */
    activeMenu: boolean;
    /**
     * Current Module name
     *
     */
    dashboardName: string;
    constructor(metaContext: MetaContextComponent, env: Environment);
    ngOnInit(): void;
    toggleMenu(event: any): void;
    zones(): string[];
    topLayouts(): ItemProperties[];
    portletWidth(name: string): any;
    bottomLayouts(): ItemProperties[];
    zTocLayouts(): ItemProperties[];
}
