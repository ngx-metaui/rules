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
import { AfterViewChecked, AfterViewInit, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { Environment } from '@aribaui/core';
import { Datatable2Component } from '../datatable2.component';
import { BaseComponent } from '../../../core/base.component';
import { Subject, Subscription } from 'rxjs';
import { InfiniteScrollComponent } from '../../../core/infite-scroll/infite-scroll.component';
import { DomUtilsService } from '../../../core/dom-utils.service';
/**
 * Please see datatable for more detail description. But the main goal of this wrapper to remove
 * all the common surrounding parts around the datatable and make sure DT can focus only actual
 * header and body structure
 *
 * It is expected that wrapper also provides some code for the sliding up panel containing
 * buttons and other actions that will be used during editing
 *
 *
 * Todo: Extract the expand logic out into some directive or component or just a class
 *
 */
export declare class DTWrapper extends BaseComponent implements AfterViewInit, AfterViewChecked {
    env: Environment;
    private render;
    private thisElement;
    private domUtils;
    private platformId;
    dt: Datatable2Component;
    /**
     * Color that is used by full screen div overlay to create expanding effect which needs to have
     * little tent;
     *
     */
    expandColorFrom: string;
    /**
     * Color that is used to set after we are in the full screen so our overlay div hide everything
     * on the page
     *
     */
    expandColorTo: string;
    /**
     *
     * Table heading area offers developer to completely override the top bar where we have filters
     * and others actions.
     *
     */
    heading: TemplateRef<any>;
    /**
     * Renders table headers and wraps them within thead tag
     */
    headerRows: TemplateRef<any>;
    /**
     * Renders table body
     */
    bodyRows: TemplateRef<any>;
    /**
     * The same as heading template. We need to remove this dependency on primeNG so far it is using
     * p-footer
     */
    footer: TemplateRef<any>;
    /**
     * Div used to make the full screen expansion effect
     */
    dtFullScreenOverlay: ElementRef;
    /**
     * Reference to infite scroll. We are using this to trigger loading finish event so we can
     * hide loading animation
     */
    infiniteScroll: InfiniteScrollComponent;
    /**
     * In order to debounce the typing we need to use subject
     *
     */
    searchTerms: Subject<string>;
    /**
     *  Specifies if we are in viewing/editing mode that can browse whole dataset lazily
     *
     */
    isFullScreenMode: boolean;
    /**
     * Tells if we can support full screen mode - only available for the browser
     *
     */
    supportFullScreen: boolean;
    querySubscription: Subscription;
    loadingSub: Subscription;
    /**
     *  Saves original bounding rect coordinates before we expand the DT to full screen
     *
     */
    private dtBoundingClientRect;
    /**
     * Remembers original scroll position before we switch to full screen mode
     */
    private originalScrollPosition;
    constructor(env: Environment, render: Renderer2, thisElement: ElementRef, domUtils: DomUtilsService, platformId: Object, dt: Datatable2Component);
    ngOnInit(): void;
    /**
     * Iterates over all columns marked as frozen and retrieve a width so we can update
     * parent div
     *
     */
    calculateFrozenWidth(): number;
    /**
     * When having two separate tables we need to make sure that rows of the tables are aligned.
     *
     * Therefore this method takes first column from each table read the height of the rows and set
     * the max height to both rows.
     *
     *
     */
    alignTablesHeights(frozenView: any, unFrozenView: any): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * FULL SCREEN MODE methods
     */
    /**
     *
     * When fullscreen functionality is enabled this method switches between norml and full screen
     * mode
     *
     */
    toggleFullScreen(event: any): void;
    /**
     * To push this component to full screen mode or maybe full page mode we need run following:
     *
     *  - Execute expand transformation, where we have additional overlay div that we slowly expand
     *  and this creates impression the DT is expanding
     *
     *  - apply full-screen class on top host element  - in this case its DataTable to switch
     *  to absolute positioning
     *
     *  - make sure we are scrolled all the way up
     *
     *  - hide all the elements on the page so their dimension don't interfere with this table.
     *
     *
     */
    openFullScreen(event: any): void;
    /**
     *
     * The same like above method (openFullScreen) but in reverse order.
     *
     */
    closeFullScreen(event: any): void;
    /**
     * Applies set of set of css properties to make the DT main component on the page expand to
     * full page mode and back
     *
     * We want to make it with little delay to let other animation finish
     */
    toggleFullScreenOnDT(fullScreen: boolean): void;
    /**
     * Listen for infinite scroll event and request new data from data source
     *
     */
    onLazyLoad(event: any): void;
    /**
     * Creates animation effect to make it feel like the element (in this case DT) is expanding
     * from the middle to the full page mode.
     *
     * We take the dimension of the table then it is scaled slowly to the full page
     */
    private runExpandEffect();
    /**
     * Applies the transformation and scale the helper div (overlay) down to make it look like
     * it collapses
     */
    private runCollapseEffect();
    /**
     * DFS  - to go thru all the element under BODY and remove them from the page.
     *
     */
    private hideNonFullScreenElement(parentElement);
    /**
     * Put all the element that were previously removed by hideNonFullScreenElement() back
     */
    private showNonFullScreenElement();
    /**
     * @Internal
     *
     */
    private needTraverseDown(element);
    /**
     * When we enter full screen /page mode when need to calculate how many rows to load initially
     *
     */
    private calculateLimit();
    /**
     * @Internal
     *
     */
    private updateElement(l?, t?, w?, h?);
    /**
     * @Internal
     *
     */
    private applyTransformation(expand);
    /**
     * INFINITE SCROLLING METHODS
     */
    private initFullScreen();
    /**
     * When loading is finished mark loading icon is done so we can hide it. I am using little
     * delay to make the animation visible
     */
    private loadingFinished();
}
