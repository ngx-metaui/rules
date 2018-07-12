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
 */
import { ElementRef, EventEmitter, TemplateRef } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { Environment } from '@aribaui/core';
export declare class CardZoneTopComponent {
}
export declare class CardZoneBottomComponent {
}
/**
 *
 * Card component is a container rendering its content inside 3 different zones.
 *
 *  ------------------------------------------
 *  |   TITLE                       | ACTION |
 *  |-----------------------------------------
 *  |                                        |
 *  |   TOP                                  |
 *  |                                        |
 *  ------------------------------------------
 *  |                                        |
 *  |   BOTTOM                               |
 *  |                                        |
 *  |                                        |
 *  ------------------------------------------
 *
 *
 *  There are 3 zones  + 1 placeholder for the actionIcon
 *
 *  Cards can be selectable which means when you click on it there will be rendered a border with
 *  a check mark inside Action zone (this is default behavior).
 *  You can use [selectable] binding to disable this, in such case card will have just a border
 *  without any check mark.
 *
 *  Cards can also contain custom Action which is rendered inside ACTION zone and on the
 *  application level you can listen for (click) events as well as you can provide your own action
 *  icon
 *
 *  Besides ACTION, TITLE, TOP and BOTTOM content zones cards support hover overlay effect and
 *  when its activated there is a overlay displayed on top of the card with Icon in the middle.
 *  Please note when [hasHover] is TRUE all the actions and selectability are disabled as there is
 *  only one action which click on the hover overlay.
 *
 *
 * ###example 1:
 *  Basic hover card which by default support selectable mode
 *
 * ```
 *          <aw-card #card1 [hasAction]="false" [width]="'202px'" [height]="'154px'">
 *
 *                 <aw-card-title [align]="'bottom-left'">
 *                     <span class="a-supplier-tag">
 *                         Preferred
 *                     </span>
 *                 </aw-card-title>
 *
 *                 <aw-card-top>
 *                     <div class="supplierName">
 *                         Haight Pumps
 *                     </div>
 *                     <div class="supplierLocation">
 *                         Palo Alto, CA, USA
 *                     </div>
 *                 </aw-card-top>
 *
 *                 <aw-card-bottom class="w-card-zbottom">
 *                     some text about the supplier and his parents<br/>
 *                     and some contacts
 *                 </aw-card-bottom>
 *
 *             </aw-card>
 *
 * ```
 *
 *  ###example 2:
 *   Hover card with custom action. when unselected action will appear and user can click on it.
 *
 * ```
 *          <aw-card #card1 [selectable]="true" [actionIcon]="'icon-question-mark'"
 *                     (onAction)="onAction(3, $event)">
 *
 *                 <aw-card-title [align]="'bottom-left'">
 *                     <span class="a-supplier-tag">
 *                         Preferred
 *                     </span>
 *                 </aw-card-title>
 *
 *                 <aw-card-top>
 *                     <div class="supplierName">
 *                         Haight Pumps
 *                     </div>
 *                     <div class="supplierLocation">
 *                         Palo Alto, CA, USA
 *                     </div>
 *                 </aw-card-top>
 *
 *                 <aw-card-bottom class="w-card-zbottom">
 *                     some text about the supplier and his parents<br/>
 *                     and some contacts
 *                 </aw-card-bottom>
 *
 *             </aw-card>
 *
 * ```
 *
 *
 *
 */
export declare class CardComponent extends BaseComponent {
    env: Environment;
    /**
     * Tells if we should explicitly hide the action
     *
     */
    hasAction: boolean;
    /**
     *
     * Is selectable mode supported? Saying Yes, card will have by default check-mark in the
     * ACTION zone when selected
     *
     */
    selectable: boolean;
    /**
     * Option to pass custom "Card Selected" Icon
     *
     */
    selectedIcon: string;
    /**
     * There is no default value for action icon, when application want to add action to the card
     * it must also provide a icon
     *
     */
    actionIcon: string;
    hasHover: boolean;
    /**
     *
     * Default icon name for the hover overlay. This icons shows up in the middle over the card
     * vertically and horizontally centered
     *
     */
    hoverIcon: string;
    /**
     *  Selection state
     *
     */
    selected: boolean;
    /**
     * Fired when the card is selected.
     *
     */
    onSelect: EventEmitter<any>;
    /**
     * Fired when action icon is clicked.
     *
     */
    onAction: EventEmitter<any>;
    /**
     * Fired when the user clicks on the hover overlay.
     *
     */
    onHoverAction: EventEmitter<any>;
    /**
     * This query is used to save the content reference to bottom section if any
     */
    bottom: CardZoneBottomComponent;
    /**
     * Provides custom template for the body which is under application developer control.
     */
    bodyTemplate: TemplateRef<any>;
    hoverDiv: ElementRef;
    /**
     * Usually when template is provided we want to use it and replace internal one but in this
     * case it will be always conditional and application developer can switch between default
     * template with zones and custom one provided by developer.
     *
     */
    useBodyTemplate: boolean;
    constructor(env: Environment);
    ngOnInit(): void;
    showBottomSection(): boolean;
    /**
     * fires select and unselect event.
     */
    toggleSelect(event: any): void;
    /**
     *
     * Only fired when action is rendered and user clicks on custom actionIcon
     *
     */
    onActionClick(event: any): void;
    /**
     * Triggered  when hover effect is on + user click on the card
     *
     */
    onHover(isEnter: boolean): void;
    /**
     *
     * Used to decide if we should render implicit card template with our zones or
     * user provided template
     *
     */
    showBodyTemplate(): boolean;
}
