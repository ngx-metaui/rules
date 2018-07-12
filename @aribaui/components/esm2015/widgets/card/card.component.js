/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, Directive, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { Environment, isBlank, isPresent } from '@aribaui/core';
export class CardZoneTopComponent {
}
CardZoneTopComponent.decorators = [
    { type: Directive, args: [{
                selector: `aw-card-top`,
                host: {
                    'class': 'w-card-ztop'
                }
            },] },
];
export class CardZoneBottomComponent {
}
CardZoneBottomComponent.decorators = [
    { type: Directive, args: [{
                selector: `aw-card-bottom`,
                host: {
                    'class': 'w-card-zbottom'
                }
            },] },
];
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
export class CardComponent extends BaseComponent {
    /**
     * @param {?} env
     */
    constructor(env) {
        super(env);
        this.env = env;
        /**
         * Tells if we should explicitly hide the action
         *
         */
        this.hasAction = false;
        /**
         *
         * Is selectable mode supported? Saying Yes, card will have by default check-mark in the
         * ACTION zone when selected
         *
         */
        this.selectable = true;
        /**
         * Option to pass custom "Card Selected" Icon
         *
         */
        this.selectedIcon = 'icon-accept';
        /*
             * Enable and disables hover effect on top of the card
             */
        this.hasHover = false;
        /**
         *
         * Default icon name for the hover overlay. This icons shows up in the middle over the card
         * vertically and horizontally centered
         *
         */
        this.hoverIcon = 'icon-add';
        /**
         *  Selection state
         *
         */
        this.selected = true;
        /**
         * Fired when the card is selected.
         *
         */
        this.onSelect = new EventEmitter();
        /**
         * Fired when action icon is clicked.
         *
         */
        this.onAction = new EventEmitter();
        /**
         * Fired when the user clicks on the hover overlay.
         *
         */
        this.onHoverAction = new EventEmitter();
        /**
         * Usually when template is provided we want to use it and replace internal one but in this
         * case it will be always conditional and application developer can switch between default
         * template with zones and custom one provided by developer.
         *
         */
        this.useBodyTemplate = false;
        // sets default value
        this.width = '202px';
        this.height = '154px';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        // If application wants to use action it must provide actionIcon
        if (isBlank(this.actionIcon) && this.hasAction) {
            throw new Error('You need to provide action icon');
        }
    }
    /**
     * @return {?}
     */
    showBottomSection() {
        return isPresent(this.bottom);
    }
    /**
     * fires select and unselect event.
     * @param {?} event
     * @return {?}
     */
    toggleSelect(event) {
        if (!this.selectable) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.selected = !this.selected;
            this.onSelect.emit(this.selected);
        }
    }
    /**
     *
     * Only fired when action is rendered and user clicks on custom actionIcon
     *
     * @param {?} event
     * @return {?}
     */
    onActionClick(event) {
        if (this.hasAction && (!this.selected || !this.selectable)) {
            this.onAction.emit(this.selected);
        }
    }
    /**
     * Triggered  when hover effect is on + user click on the card
     *
     * @param {?} isEnter
     * @return {?}
     */
    onHover(isEnter) {
        if (isPresent(this.hoverDiv)) {
            this.hoverDiv.nativeElement.style.opacity = isEnter ? 0.5 : 0;
        }
    }
    /**
     *
     * Used to decide if we should render implicit card template with our zones or
     * user provided template
     *
     * @return {?}
     */
    showBodyTemplate() {
        return isPresent(this.bodyTemplate) && this.useBodyTemplate;
    }
}
CardComponent.decorators = [
    { type: Component, args: [{
                selector: 'aw-card',
                template: `<div class="w-card" [style.width]="width" [style.height]="height"
     [class.u-is-hover]="hasHover"
     (mouseenter)="onHover(true)"
     (mouseleave)="onHover(false)"
     [class.u-card-selected]="selected"
     [class.u-card-unselected]="!selected"
     [ngClass]="styleClass"
>

    <div class="card-body ui-g"  *ngIf="!showBodyTemplate()">
        <!-- Hover element that is triggered by mouseenter, mouseleave events-->
        <div #hoverDiv *ngIf="hasHover" class="u-card-hover" (click)="onHoverAction.emit($event)">
            <span [style.width]="'100%'" class="sap-icon" [ngClass]="hoverIcon"></span>
        </div>
        <!-- HEADER HAVING TITLE AND ICONS/ACTIONS-->
        <div class="ui-g-12 ui-g-nopad w-card-header">
            <div class="w-card-ztitle ui-g-nopad" (click)="toggleSelect($event)"
                 [class.u-card-pointer]="selectable"
                 [ngClass]="{'ui-g-9': hasAction || selectable, 'ui-g-11': !hasAction && !selectable}">
                <ng-content select="aw-card-title"></ng-content>
            </div>

            <div *ngIf="hasAction || selectable" class="w-card-zaction ui-g-nopad ui-g-3">

                <span *ngIf="selected && selectable" class="sap-icon selection"
                      [class.u-card-pointer]="selectable"
                      [class.u-card-action-bg]="selected"
                      (click)="toggleSelect($event)"
                      [ngClass]="selectedIcon"></span>


                <span *ngIf="hasAction && (!selected || !selectable) "
                      class="sap-icon action"
                      [class.u-card-pointer]="true"
                      (click)="onActionClick($event)"
                      [ngClass]="actionIcon"
                ></span>
            </div>
        </div>

        <!--TOP CARD SECTION-->
        <div class="w-card-ztop ui-g-nopad ui-g-12 "
             (click)="toggleSelect($event)"
             [class.u-card-pointer]="selectable">
            <ng-content select="aw-card-top"></ng-content>
        </div>

        <div class="ui-g-12 ui-g-nopad w-card-line-divider  " *ngIf="showBottomSection()"></div>
        <!--BOTTOM CARD SECTION-->
        <div *ngIf="showBottomSection()" class="ui-g-12 ui-g-nopad w-card-zbottom"
             [class.u-card-pointer]="selectable"
             (click)="toggleSelect($event)">
            <ng-content select="aw-card-bottom"></ng-content>
        </div>
    </div>

    <div *ngIf="showBodyTemplate()" class="w-card-user-cnt" >
        <ng-container *ngTemplateOutlet="bodyTemplate">
        </ng-container>
    </div>

</div>
`,
                styles: [`.w-card{border:2px solid #0076cb;display:inline-block;overflow:hidden;color:#636363;box-sizing:border-box}.w-card-header{position:relative;height:30px;padding-left:1em}.w-card-ztitle{height:100%;padding-top:3px}.w-card-ztitle ::ng-deep .w-card-title{height:100%;width:100%;display:flex}.w-card-ztitle ::ng-deep .w-card-title>*{flex:0 1}.w-card-zaction{height:100%;display:inline-block;text-align:right}.w-card-zaction .sap-icon{width:29px;height:29px;text-align:center;display:inline-block;font-size:1.5em;line-height:1.4em}.w-card-zaction .sap-icon.selection{color:#fff}.w-card-zaction .sap-icon.action{color:#969696}.w-card-zbottom,.w-card-ztop{padding:1em}.w-card-line-divider{border-top:1px solid #d6d6d6;margin:0 14px}.w-card-user-cnt{width:100%;height:100%;position:relative;background-color:#eee}.u-card-hover{position:absolute;height:100%;width:100%;opacity:0;transition:.5s ease;background-color:#0076cb;z-index:100}.u-card-hover .sap-icon{text-align:center;display:inline-block;font-size:4em;color:#fff;position:relative;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.u-card-action-bg{background:#0076cb}.u-is-hover{position:relative}.u-card-selected{border-color:#0076cb}.u-card-unselected{border-color:#d7d7d7}.u-card-hover,.u-card-pointer{cursor:pointer}`]
            },] },
];
/** @nocollapse */
CardComponent.ctorParameters = () => [
    { type: Environment }
];
CardComponent.propDecorators = {
    hasAction: [{ type: Input }],
    selectable: [{ type: Input }],
    selectedIcon: [{ type: Input }],
    actionIcon: [{ type: Input }],
    hasHover: [{ type: Input }],
    hoverIcon: [{ type: Input }],
    selected: [{ type: Input }],
    onSelect: [{ type: Output }],
    onAction: [{ type: Output }],
    onHoverAction: [{ type: Output }],
    bottom: [{ type: ContentChild, args: [CardZoneBottomComponent,] }],
    bodyTemplate: [{ type: ContentChild, args: ['body',] }],
    hoverDiv: [{ type: ViewChild, args: ['hoverDiv',] }]
};
function CardComponent_tsickle_Closure_declarations() {
    /**
     * Tells if we should explicitly hide the action
     *
     * @type {?}
     */
    CardComponent.prototype.hasAction;
    /**
     *
     * Is selectable mode supported? Saying Yes, card will have by default check-mark in the
     * ACTION zone when selected
     *
     * @type {?}
     */
    CardComponent.prototype.selectable;
    /**
     * Option to pass custom "Card Selected" Icon
     *
     * @type {?}
     */
    CardComponent.prototype.selectedIcon;
    /**
     * There is no default value for action icon, when application want to add action to the card
     * it must also provide a icon
     *
     * @type {?}
     */
    CardComponent.prototype.actionIcon;
    /** @type {?} */
    CardComponent.prototype.hasHover;
    /**
     *
     * Default icon name for the hover overlay. This icons shows up in the middle over the card
     * vertically and horizontally centered
     *
     * @type {?}
     */
    CardComponent.prototype.hoverIcon;
    /**
     *  Selection state
     *
     * @type {?}
     */
    CardComponent.prototype.selected;
    /**
     * Fired when the card is selected.
     *
     * @type {?}
     */
    CardComponent.prototype.onSelect;
    /**
     * Fired when action icon is clicked.
     *
     * @type {?}
     */
    CardComponent.prototype.onAction;
    /**
     * Fired when the user clicks on the hover overlay.
     *
     * @type {?}
     */
    CardComponent.prototype.onHoverAction;
    /**
     * This query is used to save the content reference to bottom section if any
     * @type {?}
     */
    CardComponent.prototype.bottom;
    /**
     * Provides custom template for the body which is under application developer control.
     * @type {?}
     */
    CardComponent.prototype.bodyTemplate;
    /** @type {?} */
    CardComponent.prototype.hoverDiv;
    /**
     * Usually when template is provided we want to use it and replace internal one but in this
     * case it will be always conditional and application developer can switch between default
     * template with zones and custom one provided by developer.
     *
     * @type {?}
     */
    CardComponent.prototype.useBodyTemplate;
    /** @type {?} */
    CardComponent.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jYXJkL2NhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFTOUQsTUFBTTs7O1lBTkwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLGFBQWE7aUJBQ3pCO2FBQ0o7O0FBV0QsTUFBTTs7O1lBTkwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsZ0JBQWdCO2lCQUM1QjthQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJLRCxNQUFNLG9CQUFxQixTQUFRLGFBQWE7Ozs7SUF5RzVDLFlBQW1CLEdBQWdCO1FBRS9CLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZJLFFBQUcsR0FBSCxHQUFHLENBQWE7Ozs7O3lCQWxHZCxLQUFLOzs7Ozs7OzBCQVNKLElBQUk7Ozs7OzRCQU9ILGFBQWE7Ozs7d0JBY2hCLEtBQUs7Ozs7Ozs7eUJBU0wsVUFBVTs7Ozs7d0JBUVYsSUFBSTs7Ozs7d0JBUU0sSUFBSSxZQUFZLEVBQUU7Ozs7O3dCQU9sQixJQUFJLFlBQVksRUFBRTs7Ozs7NkJBT2IsSUFBSSxZQUFZLEVBQUU7Ozs7Ozs7K0JBMEIxQixLQUFLOztRQVE1QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztLQUN6Qjs7OztJQUVELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBR2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3REO0tBRUo7Ozs7SUFFTSxpQkFBaUI7UUFFcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7SUFPbEMsWUFBWSxDQUFDLEtBQVU7UUFFbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBRTNCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7S0FDSjs7Ozs7Ozs7SUFPRCxhQUFhLENBQUMsS0FBVTtRQUVwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7S0FDSjs7Ozs7OztJQU1ELE9BQU8sQ0FBQyxPQUFnQjtRQUVwQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakU7S0FDSjs7Ozs7Ozs7SUFRRCxnQkFBZ0I7UUFFWixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSyxJQUFJLENBQUMsZUFBZSxDQUFDO0tBQ2hFOzs7WUFyUEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBOERiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLDZ3Q0FBNndDLENBQUM7YUFDMXhDOzs7O1lBNUxPLFdBQVc7Ozt3QkFtTWQsS0FBSzt5QkFTTCxLQUFLOzJCQU9MLEtBQUs7eUJBUUwsS0FBSzt1QkFNTCxLQUFLO3dCQVNMLEtBQUs7dUJBUUwsS0FBSzt1QkFRTCxNQUFNO3VCQU9OLE1BQU07NEJBT04sTUFBTTtxQkFPTixZQUFZLFNBQUMsdUJBQXVCOzJCQU9wQyxZQUFZLFNBQUMsTUFBTTt1QkFJbkIsU0FBUyxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jhc2VDb21wb25lbnR9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHtFbnZpcm9ubWVudCwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYGF3LWNhcmQtdG9wYCxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICd3LWNhcmQtenRvcCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENhcmRab25lVG9wQ29tcG9uZW50XG57XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBgYXctY2FyZC1ib3R0b21gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3ctY2FyZC16Ym90dG9tJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FyZFpvbmVCb3R0b21Db21wb25lbnRcbntcbn1cblxuLyoqXG4gKlxuICogQ2FyZCBjb21wb25lbnQgaXMgYSBjb250YWluZXIgcmVuZGVyaW5nIGl0cyBjb250ZW50IGluc2lkZSAzIGRpZmZlcmVudCB6b25lcy5cbiAqXG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgfCAgIFRJVExFICAgICAgICAgICAgICAgICAgICAgICB8IEFDVElPTiB8XG4gKiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgIFRPUCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgIEJPVFRPTSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICpcbiAqICBUaGVyZSBhcmUgMyB6b25lcyAgKyAxIHBsYWNlaG9sZGVyIGZvciB0aGUgYWN0aW9uSWNvblxuICpcbiAqICBDYXJkcyBjYW4gYmUgc2VsZWN0YWJsZSB3aGljaCBtZWFucyB3aGVuIHlvdSBjbGljayBvbiBpdCB0aGVyZSB3aWxsIGJlIHJlbmRlcmVkIGEgYm9yZGVyIHdpdGhcbiAqICBhIGNoZWNrIG1hcmsgaW5zaWRlIEFjdGlvbiB6b25lICh0aGlzIGlzIGRlZmF1bHQgYmVoYXZpb3IpLlxuICogIFlvdSBjYW4gdXNlIFtzZWxlY3RhYmxlXSBiaW5kaW5nIHRvIGRpc2FibGUgdGhpcywgaW4gc3VjaCBjYXNlIGNhcmQgd2lsbCBoYXZlIGp1c3QgYSBib3JkZXJcbiAqICB3aXRob3V0IGFueSBjaGVjayBtYXJrLlxuICpcbiAqICBDYXJkcyBjYW4gYWxzbyBjb250YWluIGN1c3RvbSBBY3Rpb24gd2hpY2ggaXMgcmVuZGVyZWQgaW5zaWRlIEFDVElPTiB6b25lIGFuZCBvbiB0aGVcbiAqICBhcHBsaWNhdGlvbiBsZXZlbCB5b3UgY2FuIGxpc3RlbiBmb3IgKGNsaWNrKSBldmVudHMgYXMgd2VsbCBhcyB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gYWN0aW9uXG4gKiAgaWNvblxuICpcbiAqICBCZXNpZGVzIEFDVElPTiwgVElUTEUsIFRPUCBhbmQgQk9UVE9NIGNvbnRlbnQgem9uZXMgY2FyZHMgc3VwcG9ydCBob3ZlciBvdmVybGF5IGVmZmVjdCBhbmRcbiAqICB3aGVuIGl0cyBhY3RpdmF0ZWQgdGhlcmUgaXMgYSBvdmVybGF5IGRpc3BsYXllZCBvbiB0b3Agb2YgdGhlIGNhcmQgd2l0aCBJY29uIGluIHRoZSBtaWRkbGUuXG4gKiAgUGxlYXNlIG5vdGUgd2hlbiBbaGFzSG92ZXJdIGlzIFRSVUUgYWxsIHRoZSBhY3Rpb25zIGFuZCBzZWxlY3RhYmlsaXR5IGFyZSBkaXNhYmxlZCBhcyB0aGVyZSBpc1xuICogIG9ubHkgb25lIGFjdGlvbiB3aGljaCBjbGljayBvbiB0aGUgaG92ZXIgb3ZlcmxheS5cbiAqXG4gKlxuICogIyMjZXhhbXBsZSAxOlxuICogIEJhc2ljIGhvdmVyIGNhcmQgd2hpY2ggYnkgZGVmYXVsdCBzdXBwb3J0IHNlbGVjdGFibGUgbW9kZVxuICpcbiAqIGBgYFxuICogICAgICAgICAgPGF3LWNhcmQgI2NhcmQxIFtoYXNBY3Rpb25dPVwiZmFsc2VcIiBbd2lkdGhdPVwiJzIwMnB4J1wiIFtoZWlnaHRdPVwiJzE1NHB4J1wiPlxuICpcbiAqICAgICAgICAgICAgICAgICA8YXctY2FyZC10aXRsZSBbYWxpZ25dPVwiJ2JvdHRvbS1sZWZ0J1wiPlxuICogICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImEtc3VwcGxpZXItdGFnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBQcmVmZXJyZWRcbiAqICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICogICAgICAgICAgICAgICAgIDwvYXctY2FyZC10aXRsZT5cbiAqXG4gKiAgICAgICAgICAgICAgICAgPGF3LWNhcmQtdG9wPlxuICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwcGxpZXJOYW1lXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBIYWlnaHQgUHVtcHNcbiAqICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdXBwbGllckxvY2F0aW9uXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBQYWxvIEFsdG8sIENBLCBVU0FcbiAqICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgPC9hdy1jYXJkLXRvcD5cbiAqXG4gKiAgICAgICAgICAgICAgICAgPGF3LWNhcmQtYm90dG9tIGNsYXNzPVwidy1jYXJkLXpib3R0b21cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgc29tZSB0ZXh0IGFib3V0IHRoZSBzdXBwbGllciBhbmQgaGlzIHBhcmVudHM8YnIvPlxuICogICAgICAgICAgICAgICAgICAgICBhbmQgc29tZSBjb250YWN0c1xuICogICAgICAgICAgICAgICAgIDwvYXctY2FyZC1ib3R0b20+XG4gKlxuICogICAgICAgICAgICAgPC9hdy1jYXJkPlxuICpcbiAqIGBgYFxuICpcbiAqICAjIyNleGFtcGxlIDI6XG4gKiAgIEhvdmVyIGNhcmQgd2l0aCBjdXN0b20gYWN0aW9uLiB3aGVuIHVuc2VsZWN0ZWQgYWN0aW9uIHdpbGwgYXBwZWFyIGFuZCB1c2VyIGNhbiBjbGljayBvbiBpdC5cbiAqXG4gKiBgYGBcbiAqICAgICAgICAgIDxhdy1jYXJkICNjYXJkMSBbc2VsZWN0YWJsZV09XCJ0cnVlXCIgW2FjdGlvbkljb25dPVwiJ2ljb24tcXVlc3Rpb24tbWFyaydcIlxuICogICAgICAgICAgICAgICAgICAgICAob25BY3Rpb24pPVwib25BY3Rpb24oMywgJGV2ZW50KVwiPlxuICpcbiAqICAgICAgICAgICAgICAgICA8YXctY2FyZC10aXRsZSBbYWxpZ25dPVwiJ2JvdHRvbS1sZWZ0J1wiPlxuICogICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImEtc3VwcGxpZXItdGFnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBQcmVmZXJyZWRcbiAqICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICogICAgICAgICAgICAgICAgIDwvYXctY2FyZC10aXRsZT5cbiAqXG4gKiAgICAgICAgICAgICAgICAgPGF3LWNhcmQtdG9wPlxuICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwcGxpZXJOYW1lXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBIYWlnaHQgUHVtcHNcbiAqICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdXBwbGllckxvY2F0aW9uXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBQYWxvIEFsdG8sIENBLCBVU0FcbiAqICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgPC9hdy1jYXJkLXRvcD5cbiAqXG4gKiAgICAgICAgICAgICAgICAgPGF3LWNhcmQtYm90dG9tIGNsYXNzPVwidy1jYXJkLXpib3R0b21cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgc29tZSB0ZXh0IGFib3V0IHRoZSBzdXBwbGllciBhbmQgaGlzIHBhcmVudHM8YnIvPlxuICogICAgICAgICAgICAgICAgICAgICBhbmQgc29tZSBjb250YWN0c1xuICogICAgICAgICAgICAgICAgIDwvYXctY2FyZC1ib3R0b20+XG4gKlxuICogICAgICAgICAgICAgPC9hdy1jYXJkPlxuICpcbiAqIGBgYFxuICpcbiAqXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2F3LWNhcmQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInctY2FyZFwiIFtzdHlsZS53aWR0aF09XCJ3aWR0aFwiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0XCJcbiAgICAgW2NsYXNzLnUtaXMtaG92ZXJdPVwiaGFzSG92ZXJcIlxuICAgICAobW91c2VlbnRlcik9XCJvbkhvdmVyKHRydWUpXCJcbiAgICAgKG1vdXNlbGVhdmUpPVwib25Ib3ZlcihmYWxzZSlcIlxuICAgICBbY2xhc3MudS1jYXJkLXNlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgW2NsYXNzLnUtY2FyZC11bnNlbGVjdGVkXT1cIiFzZWxlY3RlZFwiXG4gICAgIFtuZ0NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuPlxuXG4gICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keSB1aS1nXCIgICpuZ0lmPVwiIXNob3dCb2R5VGVtcGxhdGUoKVwiPlxuICAgICAgICA8IS0tIEhvdmVyIGVsZW1lbnQgdGhhdCBpcyB0cmlnZ2VyZWQgYnkgbW91c2VlbnRlciwgbW91c2VsZWF2ZSBldmVudHMtLT5cbiAgICAgICAgPGRpdiAjaG92ZXJEaXYgKm5nSWY9XCJoYXNIb3ZlclwiIGNsYXNzPVwidS1jYXJkLWhvdmVyXCIgKGNsaWNrKT1cIm9uSG92ZXJBY3Rpb24uZW1pdCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8c3BhbiBbc3R5bGUud2lkdGhdPVwiJzEwMCUnXCIgY2xhc3M9XCJzYXAtaWNvblwiIFtuZ0NsYXNzXT1cImhvdmVySWNvblwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gSEVBREVSIEhBVklORyBUSVRMRSBBTkQgSUNPTlMvQUNUSU9OUy0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy0xMiB1aS1nLW5vcGFkIHctY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3LWNhcmQtenRpdGxlIHVpLWctbm9wYWRcIiAoY2xpY2spPVwidG9nZ2xlU2VsZWN0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICBbY2xhc3MudS1jYXJkLXBvaW50ZXJdPVwic2VsZWN0YWJsZVwiXG4gICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktZy05JzogaGFzQWN0aW9uIHx8IHNlbGVjdGFibGUsICd1aS1nLTExJzogIWhhc0FjdGlvbiAmJiAhc2VsZWN0YWJsZX1cIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhdy1jYXJkLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJoYXNBY3Rpb24gfHwgc2VsZWN0YWJsZVwiIGNsYXNzPVwidy1jYXJkLXphY3Rpb24gdWktZy1ub3BhZCB1aS1nLTNcIj5cblxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwic2VsZWN0ZWQgJiYgc2VsZWN0YWJsZVwiIGNsYXNzPVwic2FwLWljb24gc2VsZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MudS1jYXJkLXBvaW50ZXJdPVwic2VsZWN0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLnUtY2FyZC1hY3Rpb24tYmddPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwic2VsZWN0ZWRJY29uXCI+PC9zcGFuPlxuXG5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImhhc0FjdGlvbiAmJiAoIXNlbGVjdGVkIHx8ICFzZWxlY3RhYmxlKSBcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic2FwLWljb24gYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MudS1jYXJkLXBvaW50ZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQWN0aW9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiYWN0aW9uSWNvblwiXG4gICAgICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tVE9QIENBUkQgU0VDVElPTi0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidy1jYXJkLXp0b3AgdWktZy1ub3BhZCB1aS1nLTEyIFwiXG4gICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICBbY2xhc3MudS1jYXJkLXBvaW50ZXJdPVwic2VsZWN0YWJsZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctY2FyZC10b3BcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHVpLWctbm9wYWQgdy1jYXJkLWxpbmUtZGl2aWRlciAgXCIgKm5nSWY9XCJzaG93Qm90dG9tU2VjdGlvbigpXCI+PC9kaXY+XG4gICAgICAgIDwhLS1CT1RUT00gQ0FSRCBTRUNUSU9OLS0+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93Qm90dG9tU2VjdGlvbigpXCIgY2xhc3M9XCJ1aS1nLTEyIHVpLWctbm9wYWQgdy1jYXJkLXpib3R0b21cIlxuICAgICAgICAgICAgIFtjbGFzcy51LWNhcmQtcG9pbnRlcl09XCJzZWxlY3RhYmxlXCJcbiAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImF3LWNhcmQtYm90dG9tXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nSWY9XCJzaG93Qm9keVRlbXBsYXRlKClcIiBjbGFzcz1cInctY2FyZC11c2VyLWNudFwiID5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJvZHlUZW1wbGF0ZVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2Audy1jYXJke2JvcmRlcjoycHggc29saWQgIzAwNzZjYjtkaXNwbGF5OmlubGluZS1ibG9jaztvdmVyZmxvdzpoaWRkZW47Y29sb3I6IzYzNjM2Mztib3gtc2l6aW5nOmJvcmRlci1ib3h9LnctY2FyZC1oZWFkZXJ7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjMwcHg7cGFkZGluZy1sZWZ0OjFlbX0udy1jYXJkLXp0aXRsZXtoZWlnaHQ6MTAwJTtwYWRkaW5nLXRvcDozcHh9LnctY2FyZC16dGl0bGUgOjpuZy1kZWVwIC53LWNhcmQtdGl0bGV7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXh9LnctY2FyZC16dGl0bGUgOjpuZy1kZWVwIC53LWNhcmQtdGl0bGU+KntmbGV4OjAgMX0udy1jYXJkLXphY3Rpb257aGVpZ2h0OjEwMCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7dGV4dC1hbGlnbjpyaWdodH0udy1jYXJkLXphY3Rpb24gLnNhcC1pY29ue3dpZHRoOjI5cHg7aGVpZ2h0OjI5cHg7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjEuNWVtO2xpbmUtaGVpZ2h0OjEuNGVtfS53LWNhcmQtemFjdGlvbiAuc2FwLWljb24uc2VsZWN0aW9ue2NvbG9yOiNmZmZ9LnctY2FyZC16YWN0aW9uIC5zYXAtaWNvbi5hY3Rpb257Y29sb3I6Izk2OTY5Nn0udy1jYXJkLXpib3R0b20sLnctY2FyZC16dG9we3BhZGRpbmc6MWVtfS53LWNhcmQtbGluZS1kaXZpZGVye2JvcmRlci10b3A6MXB4IHNvbGlkICNkNmQ2ZDY7bWFyZ2luOjAgMTRweH0udy1jYXJkLXVzZXItY250e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZC1jb2xvcjojZWVlfS51LWNhcmQtaG92ZXJ7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvcGFjaXR5OjA7dHJhbnNpdGlvbjouNXMgZWFzZTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDc2Y2I7ei1pbmRleDoxMDB9LnUtY2FyZC1ob3ZlciAuc2FwLWljb257dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1zaXplOjRlbTtjb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0udS1jYXJkLWFjdGlvbi1iZ3tiYWNrZ3JvdW5kOiMwMDc2Y2J9LnUtaXMtaG92ZXJ7cG9zaXRpb246cmVsYXRpdmV9LnUtY2FyZC1zZWxlY3RlZHtib3JkZXItY29sb3I6IzAwNzZjYn0udS1jYXJkLXVuc2VsZWN0ZWR7Ym9yZGVyLWNvbG9yOiNkN2Q3ZDd9LnUtY2FyZC1ob3ZlciwudS1jYXJkLXBvaW50ZXJ7Y3Vyc29yOnBvaW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FyZENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnRcbntcbiAgICAvKipcbiAgICAgKiBUZWxscyBpZiB3ZSBzaG91bGQgZXhwbGljaXRseSBoaWRlIHRoZSBhY3Rpb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGFzQWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElzIHNlbGVjdGFibGUgbW9kZSBzdXBwb3J0ZWQ/IFNheWluZyBZZXMsIGNhcmQgd2lsbCBoYXZlIGJ5IGRlZmF1bHQgY2hlY2stbWFyayBpbiB0aGVcbiAgICAgKiBBQ1RJT04gem9uZSB3aGVuIHNlbGVjdGVkXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRvIHBhc3MgY3VzdG9tIFwiQ2FyZCBTZWxlY3RlZFwiIEljb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWRJY29uOiBzdHJpbmcgPSAnaWNvbi1hY2NlcHQnO1xuXG4gICAgLyoqXG4gICAgICogVGhlcmUgaXMgbm8gZGVmYXVsdCB2YWx1ZSBmb3IgYWN0aW9uIGljb24sIHdoZW4gYXBwbGljYXRpb24gd2FudCB0byBhZGQgYWN0aW9uIHRvIHRoZSBjYXJkXG4gICAgICogaXQgbXVzdCBhbHNvIHByb3ZpZGUgYSBpY29uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFjdGlvbkljb246IHN0cmluZztcblxuICAgIC8qXG4gICAgICogRW5hYmxlIGFuZCBkaXNhYmxlcyBob3ZlciBlZmZlY3Qgb24gdG9wIG9mIHRoZSBjYXJkXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoYXNIb3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBEZWZhdWx0IGljb24gbmFtZSBmb3IgdGhlIGhvdmVyIG92ZXJsYXkuIFRoaXMgaWNvbnMgc2hvd3MgdXAgaW4gdGhlIG1pZGRsZSBvdmVyIHRoZSBjYXJkXG4gICAgICogdmVydGljYWxseSBhbmQgaG9yaXpvbnRhbGx5IGNlbnRlcmVkXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhvdmVySWNvbjogc3RyaW5nID0gJ2ljb24tYWRkJztcblxuXG4gICAgLyoqXG4gICAgICogIFNlbGVjdGlvbiBzdGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZDogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIC8qKlxuICAgICAqIEZpcmVkIHdoZW4gdGhlIGNhcmQgaXMgc2VsZWN0ZWQuXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlZCB3aGVuIGFjdGlvbiBpY29uIGlzIGNsaWNrZWQuXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBGaXJlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgaG92ZXIgb3ZlcmxheS5cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uSG92ZXJBY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIHF1ZXJ5IGlzIHVzZWQgdG8gc2F2ZSB0aGUgY29udGVudCByZWZlcmVuY2UgdG8gYm90dG9tIHNlY3Rpb24gaWYgYW55XG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZChDYXJkWm9uZUJvdHRvbUNvbXBvbmVudClcbiAgICBib3R0b206IENhcmRab25lQm90dG9tQ29tcG9uZW50O1xuXG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBib2R5IHdoaWNoIGlzIHVuZGVyIGFwcGxpY2F0aW9uIGRldmVsb3BlciBjb250cm9sLlxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2JvZHknKVxuICAgIGJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuXG4gICAgQFZpZXdDaGlsZCgnaG92ZXJEaXYnKVxuICAgIGhvdmVyRGl2OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqXG4gICAgICogVXN1YWxseSB3aGVuIHRlbXBsYXRlIGlzIHByb3ZpZGVkIHdlIHdhbnQgdG8gdXNlIGl0IGFuZCByZXBsYWNlIGludGVybmFsIG9uZSBidXQgaW4gdGhpc1xuICAgICAqIGNhc2UgaXQgd2lsbCBiZSBhbHdheXMgY29uZGl0aW9uYWwgYW5kIGFwcGxpY2F0aW9uIGRldmVsb3BlciBjYW4gc3dpdGNoIGJldHdlZW4gZGVmYXVsdFxuICAgICAqIHRlbXBsYXRlIHdpdGggem9uZXMgYW5kIGN1c3RvbSBvbmUgcHJvdmlkZWQgYnkgZGV2ZWxvcGVyLlxuICAgICAqXG4gICAgICovXG4gICAgdXNlQm9keVRlbXBsYXRlOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbnY6IEVudmlyb25tZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICAvLyBzZXRzIGRlZmF1bHQgdmFsdWVcbiAgICAgICAgdGhpcy53aWR0aCA9ICcyMDJweCc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJzE1NHB4JztcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpXG4gICAge1xuICAgICAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgICAgIC8vIElmIGFwcGxpY2F0aW9uIHdhbnRzIHRvIHVzZSBhY3Rpb24gaXQgbXVzdCBwcm92aWRlIGFjdGlvbkljb25cbiAgICAgICAgaWYgKGlzQmxhbmsodGhpcy5hY3Rpb25JY29uKSAmJiB0aGlzLmhhc0FjdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBwcm92aWRlIGFjdGlvbiBpY29uJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93Qm90dG9tU2VjdGlvbigpXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuYm90dG9tKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIGZpcmVzIHNlbGVjdCBhbmQgdW5zZWxlY3QgZXZlbnQuXG4gICAgICovXG4gICAgdG9nZ2xlU2VsZWN0KGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIE9ubHkgZmlyZWQgd2hlbiBhY3Rpb24gaXMgcmVuZGVyZWQgYW5kIHVzZXIgY2xpY2tzIG9uIGN1c3RvbSBhY3Rpb25JY29uXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBhbnkpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5oYXNBY3Rpb24gJiYgKCF0aGlzLnNlbGVjdGVkIHx8ICF0aGlzLnNlbGVjdGFibGUpKSB7XG4gICAgICAgICAgICB0aGlzLm9uQWN0aW9uLmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgIHdoZW4gaG92ZXIgZWZmZWN0IGlzIG9uICsgdXNlciBjbGljayBvbiB0aGUgY2FyZFxuICAgICAqXG4gICAgICovXG4gICAgb25Ib3Zlcihpc0VudGVyOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmhvdmVyRGl2KSkge1xuICAgICAgICAgICAgdGhpcy5ob3ZlckRpdi5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpc0VudGVyID8gMC41IDogMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogVXNlZCB0byBkZWNpZGUgaWYgd2Ugc2hvdWxkIHJlbmRlciBpbXBsaWNpdCBjYXJkIHRlbXBsYXRlIHdpdGggb3VyIHpvbmVzIG9yXG4gICAgICogdXNlciBwcm92aWRlZCB0ZW1wbGF0ZVxuICAgICAqXG4gICAgICovXG4gICAgc2hvd0JvZHlUZW1wbGF0ZSgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuYm9keVRlbXBsYXRlKSAgJiYgdGhpcy51c2VCb2R5VGVtcGxhdGU7XG4gICAgfVxuXG59XG5cbiJdfQ==