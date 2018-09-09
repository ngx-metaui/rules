/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            },] }
];
export class CardZoneBottomComponent {
}
CardZoneBottomComponent.decorators = [
    { type: Directive, args: [{
                selector: `aw-card-bottom`,
                host: {
                    'class': 'w-card-zbottom'
                }
            },] }
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
                template: "<div class=\"w-card\" [style.width]=\"width\" [style.height]=\"height\"\n     [class.u-is-hover]=\"hasHover\"\n     (mouseenter)=\"onHover(true)\"\n     (mouseleave)=\"onHover(false)\"\n     [class.u-card-selected]=\"selected\"\n     [class.u-card-unselected]=\"!selected\"\n     [ngClass]=\"styleClass\"\n>\n\n    <div class=\"card-body ui-g\"  *ngIf=\"!showBodyTemplate()\">\n        <!-- Hover element that is triggered by mouseenter, mouseleave events-->\n        <div #hoverDiv *ngIf=\"hasHover\" class=\"u-card-hover\" (click)=\"onHoverAction.emit($event)\">\n            <span [style.width]=\"'100%'\" class=\"sap-icon\" [ngClass]=\"hoverIcon\"></span>\n        </div>\n        <!-- HEADER HAVING TITLE AND ICONS/ACTIONS-->\n        <div class=\"ui-g-12 ui-g-nopad w-card-header\">\n            <div class=\"w-card-ztitle ui-g-nopad\" (click)=\"toggleSelect($event)\"\n                 [class.u-card-pointer]=\"selectable\"\n                 [ngClass]=\"{'ui-g-9': hasAction || selectable, 'ui-g-11': !hasAction && !selectable}\">\n                <ng-content select=\"aw-card-title\"></ng-content>\n            </div>\n\n            <div *ngIf=\"hasAction || selectable\" class=\"w-card-zaction ui-g-nopad ui-g-3\">\n\n                <span *ngIf=\"selected && selectable\" class=\"sap-icon selection\"\n                      [class.u-card-pointer]=\"selectable\"\n                      [class.u-card-action-bg]=\"selected\"\n                      (click)=\"toggleSelect($event)\"\n                      [ngClass]=\"selectedIcon\"></span>\n\n\n                <span *ngIf=\"hasAction && (!selected || !selectable) \"\n                      class=\"sap-icon action\"\n                      [class.u-card-pointer]=\"true\"\n                      (click)=\"onActionClick($event)\"\n                      [ngClass]=\"actionIcon\"\n                ></span>\n            </div>\n        </div>\n\n        <!--TOP CARD SECTION-->\n        <div class=\"w-card-ztop ui-g-nopad ui-g-12 \"\n             (click)=\"toggleSelect($event)\"\n             [class.u-card-pointer]=\"selectable\">\n            <ng-content select=\"aw-card-top\"></ng-content>\n        </div>\n\n        <div class=\"ui-g-12 ui-g-nopad w-card-line-divider  \" *ngIf=\"showBottomSection()\"></div>\n        <!--BOTTOM CARD SECTION-->\n        <div *ngIf=\"showBottomSection()\" class=\"ui-g-12 ui-g-nopad w-card-zbottom\"\n             [class.u-card-pointer]=\"selectable\"\n             (click)=\"toggleSelect($event)\">\n            <ng-content select=\"aw-card-bottom\"></ng-content>\n        </div>\n    </div>\n\n    <div *ngIf=\"showBodyTemplate()\" class=\"w-card-user-cnt\" >\n        <ng-container *ngTemplateOutlet=\"bodyTemplate\">\n        </ng-container>\n    </div>\n\n</div>\n",
                styles: [".w-card{border:2px solid #0076cb;display:inline-block;overflow:hidden;color:#636363;box-sizing:border-box}.w-card-header{position:relative;height:30px;padding-left:1em}.w-card-ztitle{height:100%;padding-top:3px}.w-card-ztitle ::ng-deep .w-card-title{height:100%;width:100%;display:flex}.w-card-ztitle ::ng-deep .w-card-title>*{flex:0 1}.w-card-zaction{height:100%;display:inline-block;text-align:right}.w-card-zaction .sap-icon{width:29px;height:29px;text-align:center;display:inline-block;font-size:1.5em;line-height:1.4em}.w-card-zaction .sap-icon.selection{color:#fff}.w-card-zaction .sap-icon.action{color:#969696}.w-card-zbottom,.w-card-ztop{padding:1em}.w-card-line-divider{border-top:1px solid #d6d6d6;margin:0 14px}.w-card-user-cnt{width:100%;height:100%;position:relative;background-color:#eee}.u-card-hover{position:absolute;height:100%;width:100%;opacity:0;transition:.5s;background-color:#0076cb;z-index:100}.u-card-hover .sap-icon{text-align:center;display:inline-block;font-size:4em;color:#fff;position:relative;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.u-card-action-bg{background:#0076cb}.u-is-hover{position:relative}.u-card-selected{border-color:#0076cb}.u-card-unselected{border-color:#d7d7d7}.u-card-hover,.u-card-pointer{cursor:pointer}"]
            }] }
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jYXJkL2NhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFTOUQsTUFBTTs7O1lBTkwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLGFBQWE7aUJBQ3pCO2FBQ0o7O0FBV0QsTUFBTTs7O1lBTkwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsZ0JBQWdCO2lCQUM1QjthQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZHRCxNQUFNLG9CQUFxQixTQUFRLGFBQWE7Ozs7SUF5RzVDLFlBQW1CLEdBQWdCO1FBRS9CLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUZJLFFBQUcsR0FBSCxHQUFHLENBQWE7Ozs7O3lCQWxHZCxLQUFLOzs7Ozs7OzBCQVNKLElBQUk7Ozs7OzRCQU9ILGFBQWE7Ozs7d0JBY2hCLEtBQUs7Ozs7Ozs7eUJBU0wsVUFBVTs7Ozs7d0JBUVYsSUFBSTs7Ozs7d0JBUU0sSUFBSSxZQUFZLEVBQUU7Ozs7O3dCQU9sQixJQUFJLFlBQVksRUFBRTs7Ozs7NkJBT2IsSUFBSSxZQUFZLEVBQUU7Ozs7Ozs7K0JBMEIxQixLQUFLOztRQVE1QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztLQUN6Qjs7OztJQUVELFFBQVE7UUFFSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7O1FBR2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3REO0tBRUo7Ozs7SUFFTSxpQkFBaUI7UUFFcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7SUFPbEMsWUFBWSxDQUFDLEtBQVU7UUFFbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBRTNCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7S0FDSjs7Ozs7Ozs7SUFPRCxhQUFhLENBQUMsS0FBVTtRQUVwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7S0FDSjs7Ozs7OztJQU1ELE9BQU8sQ0FBQyxPQUFnQjtRQUVwQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakU7S0FDSjs7Ozs7Ozs7SUFRRCxnQkFBZ0I7UUFFWixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSyxJQUFJLENBQUMsZUFBZSxDQUFDO0tBQ2hFOzs7WUF2TEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixzdEZBQW9DOzthQUV2Qzs7OztZQTlITyxXQUFXOzs7d0JBcUlkLEtBQUs7eUJBU0wsS0FBSzsyQkFPTCxLQUFLO3lCQVFMLEtBQUs7dUJBTUwsS0FBSzt3QkFTTCxLQUFLO3VCQVFMLEtBQUs7dUJBUUwsTUFBTTt1QkFPTixNQUFNOzRCQU9OLE1BQU07cUJBT04sWUFBWSxTQUFDLHVCQUF1QjsyQkFPcEMsWUFBWSxTQUFDLE1BQU07dUJBSW5CLFNBQVMsU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCYXNlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb3JlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7RW52aXJvbm1lbnQsIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBhdy1jYXJkLXRvcGAsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAndy1jYXJkLXp0b3AnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDYXJkWm9uZVRvcENvbXBvbmVudFxue1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogYGF3LWNhcmQtYm90dG9tYCxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICd3LWNhcmQtemJvdHRvbSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENhcmRab25lQm90dG9tQ29tcG9uZW50XG57XG59XG5cbi8qKlxuICpcbiAqIENhcmQgY29tcG9uZW50IGlzIGEgY29udGFpbmVyIHJlbmRlcmluZyBpdHMgY29udGVudCBpbnNpZGUgMyBkaWZmZXJlbnQgem9uZXMuXG4gKlxuICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIHwgICBUSVRMRSAgICAgICAgICAgICAgICAgICAgICAgfCBBQ1RJT04gfFxuICogIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICBUT1AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICBCT1RUT00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqXG4gKiAgVGhlcmUgYXJlIDMgem9uZXMgICsgMSBwbGFjZWhvbGRlciBmb3IgdGhlIGFjdGlvbkljb25cbiAqXG4gKiAgQ2FyZHMgY2FuIGJlIHNlbGVjdGFibGUgd2hpY2ggbWVhbnMgd2hlbiB5b3UgY2xpY2sgb24gaXQgdGhlcmUgd2lsbCBiZSByZW5kZXJlZCBhIGJvcmRlciB3aXRoXG4gKiAgYSBjaGVjayBtYXJrIGluc2lkZSBBY3Rpb24gem9uZSAodGhpcyBpcyBkZWZhdWx0IGJlaGF2aW9yKS5cbiAqICBZb3UgY2FuIHVzZSBbc2VsZWN0YWJsZV0gYmluZGluZyB0byBkaXNhYmxlIHRoaXMsIGluIHN1Y2ggY2FzZSBjYXJkIHdpbGwgaGF2ZSBqdXN0IGEgYm9yZGVyXG4gKiAgd2l0aG91dCBhbnkgY2hlY2sgbWFyay5cbiAqXG4gKiAgQ2FyZHMgY2FuIGFsc28gY29udGFpbiBjdXN0b20gQWN0aW9uIHdoaWNoIGlzIHJlbmRlcmVkIGluc2lkZSBBQ1RJT04gem9uZSBhbmQgb24gdGhlXG4gKiAgYXBwbGljYXRpb24gbGV2ZWwgeW91IGNhbiBsaXN0ZW4gZm9yIChjbGljaykgZXZlbnRzIGFzIHdlbGwgYXMgeW91IGNhbiBwcm92aWRlIHlvdXIgb3duIGFjdGlvblxuICogIGljb25cbiAqXG4gKiAgQmVzaWRlcyBBQ1RJT04sIFRJVExFLCBUT1AgYW5kIEJPVFRPTSBjb250ZW50IHpvbmVzIGNhcmRzIHN1cHBvcnQgaG92ZXIgb3ZlcmxheSBlZmZlY3QgYW5kXG4gKiAgd2hlbiBpdHMgYWN0aXZhdGVkIHRoZXJlIGlzIGEgb3ZlcmxheSBkaXNwbGF5ZWQgb24gdG9wIG9mIHRoZSBjYXJkIHdpdGggSWNvbiBpbiB0aGUgbWlkZGxlLlxuICogIFBsZWFzZSBub3RlIHdoZW4gW2hhc0hvdmVyXSBpcyBUUlVFIGFsbCB0aGUgYWN0aW9ucyBhbmQgc2VsZWN0YWJpbGl0eSBhcmUgZGlzYWJsZWQgYXMgdGhlcmUgaXNcbiAqICBvbmx5IG9uZSBhY3Rpb24gd2hpY2ggY2xpY2sgb24gdGhlIGhvdmVyIG92ZXJsYXkuXG4gKlxuICpcbiAqICMjI2V4YW1wbGUgMTpcbiAqICBCYXNpYyBob3ZlciBjYXJkIHdoaWNoIGJ5IGRlZmF1bHQgc3VwcG9ydCBzZWxlY3RhYmxlIG1vZGVcbiAqXG4gKiBgYGBcbiAqICAgICAgICAgIDxhdy1jYXJkICNjYXJkMSBbaGFzQWN0aW9uXT1cImZhbHNlXCIgW3dpZHRoXT1cIicyMDJweCdcIiBbaGVpZ2h0XT1cIicxNTRweCdcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgPGF3LWNhcmQtdGl0bGUgW2FsaWduXT1cIidib3R0b20tbGVmdCdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhLXN1cHBsaWVyLXRhZ1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgUHJlZmVycmVkXG4gKiAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAqICAgICAgICAgICAgICAgICA8L2F3LWNhcmQtdGl0bGU+XG4gKlxuICogICAgICAgICAgICAgICAgIDxhdy1jYXJkLXRvcD5cbiAqICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1cHBsaWVyTmFtZVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgSGFpZ2h0IFB1bXBzXG4gKiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwcGxpZXJMb2NhdGlvblwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgUGFsbyBBbHRvLCBDQSwgVVNBXG4gKiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICAgIDwvYXctY2FyZC10b3A+XG4gKlxuICogICAgICAgICAgICAgICAgIDxhdy1jYXJkLWJvdHRvbSBjbGFzcz1cInctY2FyZC16Ym90dG9tXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgIHNvbWUgdGV4dCBhYm91dCB0aGUgc3VwcGxpZXIgYW5kIGhpcyBwYXJlbnRzPGJyLz5cbiAqICAgICAgICAgICAgICAgICAgICAgYW5kIHNvbWUgY29udGFjdHNcbiAqICAgICAgICAgICAgICAgICA8L2F3LWNhcmQtYm90dG9tPlxuICpcbiAqICAgICAgICAgICAgIDwvYXctY2FyZD5cbiAqXG4gKiBgYGBcbiAqXG4gKiAgIyMjZXhhbXBsZSAyOlxuICogICBIb3ZlciBjYXJkIHdpdGggY3VzdG9tIGFjdGlvbi4gd2hlbiB1bnNlbGVjdGVkIGFjdGlvbiB3aWxsIGFwcGVhciBhbmQgdXNlciBjYW4gY2xpY2sgb24gaXQuXG4gKlxuICogYGBgXG4gKiAgICAgICAgICA8YXctY2FyZCAjY2FyZDEgW3NlbGVjdGFibGVdPVwidHJ1ZVwiIFthY3Rpb25JY29uXT1cIidpY29uLXF1ZXN0aW9uLW1hcmsnXCJcbiAqICAgICAgICAgICAgICAgICAgICAgKG9uQWN0aW9uKT1cIm9uQWN0aW9uKDMsICRldmVudClcIj5cbiAqXG4gKiAgICAgICAgICAgICAgICAgPGF3LWNhcmQtdGl0bGUgW2FsaWduXT1cIidib3R0b20tbGVmdCdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhLXN1cHBsaWVyLXRhZ1wiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgUHJlZmVycmVkXG4gKiAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAqICAgICAgICAgICAgICAgICA8L2F3LWNhcmQtdGl0bGU+XG4gKlxuICogICAgICAgICAgICAgICAgIDxhdy1jYXJkLXRvcD5cbiAqICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1cHBsaWVyTmFtZVwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgSGFpZ2h0IFB1bXBzXG4gKiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VwcGxpZXJMb2NhdGlvblwiPlxuICogICAgICAgICAgICAgICAgICAgICAgICAgUGFsbyBBbHRvLCBDQSwgVVNBXG4gKiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICogICAgICAgICAgICAgICAgIDwvYXctY2FyZC10b3A+XG4gKlxuICogICAgICAgICAgICAgICAgIDxhdy1jYXJkLWJvdHRvbSBjbGFzcz1cInctY2FyZC16Ym90dG9tXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgIHNvbWUgdGV4dCBhYm91dCB0aGUgc3VwcGxpZXIgYW5kIGhpcyBwYXJlbnRzPGJyLz5cbiAqICAgICAgICAgICAgICAgICAgICAgYW5kIHNvbWUgY29udGFjdHNcbiAqICAgICAgICAgICAgICAgICA8L2F3LWNhcmQtYm90dG9tPlxuICpcbiAqICAgICAgICAgICAgIDwvYXctY2FyZD5cbiAqXG4gKiBgYGBcbiAqXG4gKlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhdy1jYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FyZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhcmRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XG57XG4gICAgLyoqXG4gICAgICogVGVsbHMgaWYgd2Ugc2hvdWxkIGV4cGxpY2l0bHkgaGlkZSB0aGUgYWN0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhhc0FjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJcyBzZWxlY3RhYmxlIG1vZGUgc3VwcG9ydGVkPyBTYXlpbmcgWWVzLCBjYXJkIHdpbGwgaGF2ZSBieSBkZWZhdWx0IGNoZWNrLW1hcmsgaW4gdGhlXG4gICAgICogQUNUSU9OIHpvbmUgd2hlbiBzZWxlY3RlZFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbiB0byBwYXNzIGN1c3RvbSBcIkNhcmQgU2VsZWN0ZWRcIiBJY29uXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGVkSWNvbjogc3RyaW5nID0gJ2ljb24tYWNjZXB0JztcblxuICAgIC8qKlxuICAgICAqIFRoZXJlIGlzIG5vIGRlZmF1bHQgdmFsdWUgZm9yIGFjdGlvbiBpY29uLCB3aGVuIGFwcGxpY2F0aW9uIHdhbnQgdG8gYWRkIGFjdGlvbiB0byB0aGUgY2FyZFxuICAgICAqIGl0IG11c3QgYWxzbyBwcm92aWRlIGEgaWNvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBhY3Rpb25JY29uOiBzdHJpbmc7XG5cbiAgICAvKlxuICAgICAqIEVuYWJsZSBhbmQgZGlzYWJsZXMgaG92ZXIgZWZmZWN0IG9uIHRvcCBvZiB0aGUgY2FyZFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGFzSG92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRGVmYXVsdCBpY29uIG5hbWUgZm9yIHRoZSBob3ZlciBvdmVybGF5LiBUaGlzIGljb25zIHNob3dzIHVwIGluIHRoZSBtaWRkbGUgb3ZlciB0aGUgY2FyZFxuICAgICAqIHZlcnRpY2FsbHkgYW5kIGhvcml6b250YWxseSBjZW50ZXJlZFxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBob3Zlckljb246IHN0cmluZyA9ICdpY29uLWFkZCc7XG5cblxuICAgIC8qKlxuICAgICAqICBTZWxlY3Rpb24gc3RhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICAvKipcbiAgICAgKiBGaXJlZCB3aGVuIHRoZSBjYXJkIGlzIHNlbGVjdGVkLlxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiBhY3Rpb24gaWNvbiBpcyBjbGlja2VkLlxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25BY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGhvdmVyIG92ZXJsYXkuXG4gICAgICpcbiAgICAgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvbkhvdmVyQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBxdWVyeSBpcyB1c2VkIHRvIHNhdmUgdGhlIGNvbnRlbnQgcmVmZXJlbmNlIHRvIGJvdHRvbSBzZWN0aW9uIGlmIGFueVxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoQ2FyZFpvbmVCb3R0b21Db21wb25lbnQpXG4gICAgYm90dG9tOiBDYXJkWm9uZUJvdHRvbUNvbXBvbmVudDtcblxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgYm9keSB3aGljaCBpcyB1bmRlciBhcHBsaWNhdGlvbiBkZXZlbG9wZXIgY29udHJvbC5cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdib2R5JylcbiAgICBib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICAgIEBWaWV3Q2hpbGQoJ2hvdmVyRGl2JylcbiAgICBob3ZlckRpdjogRWxlbWVudFJlZjtcblxuICAgIC8qKlxuICAgICAqIFVzdWFsbHkgd2hlbiB0ZW1wbGF0ZSBpcyBwcm92aWRlZCB3ZSB3YW50IHRvIHVzZSBpdCBhbmQgcmVwbGFjZSBpbnRlcm5hbCBvbmUgYnV0IGluIHRoaXNcbiAgICAgKiBjYXNlIGl0IHdpbGwgYmUgYWx3YXlzIGNvbmRpdGlvbmFsIGFuZCBhcHBsaWNhdGlvbiBkZXZlbG9wZXIgY2FuIHN3aXRjaCBiZXR3ZWVuIGRlZmF1bHRcbiAgICAgKiB0ZW1wbGF0ZSB3aXRoIHpvbmVzIGFuZCBjdXN0b20gb25lIHByb3ZpZGVkIGJ5IGRldmVsb3Blci5cbiAgICAgKlxuICAgICAqL1xuICAgIHVzZUJvZHlUZW1wbGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW52OiBFbnZpcm9ubWVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgLy8gc2V0cyBkZWZhdWx0IHZhbHVlXG4gICAgICAgIHRoaXMud2lkdGggPSAnMjAycHgnO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICcxNTRweCc7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKVxuICAgIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICAvLyBJZiBhcHBsaWNhdGlvbiB3YW50cyB0byB1c2UgYWN0aW9uIGl0IG11c3QgcHJvdmlkZSBhY3Rpb25JY29uXG4gICAgICAgIGlmIChpc0JsYW5rKHRoaXMuYWN0aW9uSWNvbikgJiYgdGhpcy5oYXNBY3Rpb24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gcHJvdmlkZSBhY3Rpb24gaWNvbicpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0JvdHRvbVNlY3Rpb24oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmJvdHRvbSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBmaXJlcyBzZWxlY3QgYW5kIHVuc2VsZWN0IGV2ZW50LlxuICAgICAqL1xuICAgIHRvZ2dsZVNlbGVjdChldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBPbmx5IGZpcmVkIHdoZW4gYWN0aW9uIGlzIHJlbmRlcmVkIGFuZCB1c2VyIGNsaWNrcyBvbiBjdXN0b20gYWN0aW9uSWNvblxuICAgICAqXG4gICAgICovXG4gICAgb25BY3Rpb25DbGljayhldmVudDogYW55KVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQWN0aW9uICYmICghdGhpcy5zZWxlY3RlZCB8fCAhdGhpcy5zZWxlY3RhYmxlKSkge1xuICAgICAgICAgICAgdGhpcy5vbkFjdGlvbi5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkICB3aGVuIGhvdmVyIGVmZmVjdCBpcyBvbiArIHVzZXIgY2xpY2sgb24gdGhlIGNhcmRcbiAgICAgKlxuICAgICAqL1xuICAgIG9uSG92ZXIoaXNFbnRlcjogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5ob3ZlckRpdikpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJEaXYubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaXNFbnRlciA/IDAuNSA6IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFVzZWQgdG8gZGVjaWRlIGlmIHdlIHNob3VsZCByZW5kZXIgaW1wbGljaXQgY2FyZCB0ZW1wbGF0ZSB3aXRoIG91ciB6b25lcyBvclxuICAgICAqIHVzZXIgcHJvdmlkZWQgdGVtcGxhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIHNob3dCb2R5VGVtcGxhdGUoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLmJvZHlUZW1wbGF0ZSkgICYmIHRoaXMudXNlQm9keVRlbXBsYXRlO1xuICAgIH1cblxufVxuXG4iXX0=