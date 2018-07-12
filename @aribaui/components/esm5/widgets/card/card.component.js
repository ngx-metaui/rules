/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Directive, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { Environment, isBlank, isPresent } from '@aribaui/core';
var CardZoneTopComponent = /** @class */ (function () {
    function CardZoneTopComponent() {
    }
    CardZoneTopComponent.decorators = [
        { type: Directive, args: [{
                    selector: "aw-card-top",
                    host: {
                        'class': 'w-card-ztop'
                    }
                },] },
    ];
    return CardZoneTopComponent;
}());
export { CardZoneTopComponent };
var CardZoneBottomComponent = /** @class */ (function () {
    function CardZoneBottomComponent() {
    }
    CardZoneBottomComponent.decorators = [
        { type: Directive, args: [{
                    selector: "aw-card-bottom",
                    host: {
                        'class': 'w-card-zbottom'
                    }
                },] },
    ];
    return CardZoneBottomComponent;
}());
export { CardZoneBottomComponent };
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
var CardComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CardComponent, _super);
    function CardComponent(env) {
        var _this = _super.call(this, env) || this;
        _this.env = env;
        /**
         * Tells if we should explicitly hide the action
         *
         */
        _this.hasAction = false;
        /**
         *
         * Is selectable mode supported? Saying Yes, card will have by default check-mark in the
         * ACTION zone when selected
         *
         */
        _this.selectable = true;
        /**
         * Option to pass custom "Card Selected" Icon
         *
         */
        _this.selectedIcon = 'icon-accept';
        /*
             * Enable and disables hover effect on top of the card
             */
        _this.hasHover = false;
        /**
         *
         * Default icon name for the hover overlay. This icons shows up in the middle over the card
         * vertically and horizontally centered
         *
         */
        _this.hoverIcon = 'icon-add';
        /**
         *  Selection state
         *
         */
        _this.selected = true;
        /**
         * Fired when the card is selected.
         *
         */
        _this.onSelect = new EventEmitter();
        /**
         * Fired when action icon is clicked.
         *
         */
        _this.onAction = new EventEmitter();
        /**
         * Fired when the user clicks on the hover overlay.
         *
         */
        _this.onHoverAction = new EventEmitter();
        /**
         * Usually when template is provided we want to use it and replace internal one but in this
         * case it will be always conditional and application developer can switch between default
         * template with zones and custom one provided by developer.
         *
         */
        _this.useBodyTemplate = false;
        // sets default value
        // sets default value
        _this.width = '202px';
        _this.height = '154px';
        return _this;
    }
    /**
     * @return {?}
     */
    CardComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        // If application wants to use action it must provide actionIcon
        if (isBlank(this.actionIcon) && this.hasAction) {
            throw new Error('You need to provide action icon');
        }
    };
    /**
     * @return {?}
     */
    CardComponent.prototype.showBottomSection = /**
     * @return {?}
     */
    function () {
        return isPresent(this.bottom);
    };
    /**
     * fires select and unselect event.
     */
    /**
     * fires select and unselect event.
     * @param {?} event
     * @return {?}
     */
    CardComponent.prototype.toggleSelect = /**
     * fires select and unselect event.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.selectable) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.selected = !this.selected;
            this.onSelect.emit(this.selected);
        }
    };
    /**
     *
     * Only fired when action is rendered and user clicks on custom actionIcon
     *
     */
    /**
     *
     * Only fired when action is rendered and user clicks on custom actionIcon
     *
     * @param {?} event
     * @return {?}
     */
    CardComponent.prototype.onActionClick = /**
     *
     * Only fired when action is rendered and user clicks on custom actionIcon
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.hasAction && (!this.selected || !this.selectable)) {
            this.onAction.emit(this.selected);
        }
    };
    /**
     * Triggered  when hover effect is on + user click on the card
     *
     */
    /**
     * Triggered  when hover effect is on + user click on the card
     *
     * @param {?} isEnter
     * @return {?}
     */
    CardComponent.prototype.onHover = /**
     * Triggered  when hover effect is on + user click on the card
     *
     * @param {?} isEnter
     * @return {?}
     */
    function (isEnter) {
        if (isPresent(this.hoverDiv)) {
            this.hoverDiv.nativeElement.style.opacity = isEnter ? 0.5 : 0;
        }
    };
    /**
     *
     * Used to decide if we should render implicit card template with our zones or
     * user provided template
     *
     */
    /**
     *
     * Used to decide if we should render implicit card template with our zones or
     * user provided template
     *
     * @return {?}
     */
    CardComponent.prototype.showBodyTemplate = /**
     *
     * Used to decide if we should render implicit card template with our zones or
     * user provided template
     *
     * @return {?}
     */
    function () {
        return isPresent(this.bodyTemplate) && this.useBodyTemplate;
    };
    CardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'aw-card',
                    template: "<div class=\"w-card\" [style.width]=\"width\" [style.height]=\"height\"\n     [class.u-is-hover]=\"hasHover\"\n     (mouseenter)=\"onHover(true)\"\n     (mouseleave)=\"onHover(false)\"\n     [class.u-card-selected]=\"selected\"\n     [class.u-card-unselected]=\"!selected\"\n     [ngClass]=\"styleClass\"\n>\n\n    <div class=\"card-body ui-g\"  *ngIf=\"!showBodyTemplate()\">\n        <!-- Hover element that is triggered by mouseenter, mouseleave events-->\n        <div #hoverDiv *ngIf=\"hasHover\" class=\"u-card-hover\" (click)=\"onHoverAction.emit($event)\">\n            <span [style.width]=\"'100%'\" class=\"sap-icon\" [ngClass]=\"hoverIcon\"></span>\n        </div>\n        <!-- HEADER HAVING TITLE AND ICONS/ACTIONS-->\n        <div class=\"ui-g-12 ui-g-nopad w-card-header\">\n            <div class=\"w-card-ztitle ui-g-nopad\" (click)=\"toggleSelect($event)\"\n                 [class.u-card-pointer]=\"selectable\"\n                 [ngClass]=\"{'ui-g-9': hasAction || selectable, 'ui-g-11': !hasAction && !selectable}\">\n                <ng-content select=\"aw-card-title\"></ng-content>\n            </div>\n\n            <div *ngIf=\"hasAction || selectable\" class=\"w-card-zaction ui-g-nopad ui-g-3\">\n\n                <span *ngIf=\"selected && selectable\" class=\"sap-icon selection\"\n                      [class.u-card-pointer]=\"selectable\"\n                      [class.u-card-action-bg]=\"selected\"\n                      (click)=\"toggleSelect($event)\"\n                      [ngClass]=\"selectedIcon\"></span>\n\n\n                <span *ngIf=\"hasAction && (!selected || !selectable) \"\n                      class=\"sap-icon action\"\n                      [class.u-card-pointer]=\"true\"\n                      (click)=\"onActionClick($event)\"\n                      [ngClass]=\"actionIcon\"\n                ></span>\n            </div>\n        </div>\n\n        <!--TOP CARD SECTION-->\n        <div class=\"w-card-ztop ui-g-nopad ui-g-12 \"\n             (click)=\"toggleSelect($event)\"\n             [class.u-card-pointer]=\"selectable\">\n            <ng-content select=\"aw-card-top\"></ng-content>\n        </div>\n\n        <div class=\"ui-g-12 ui-g-nopad w-card-line-divider  \" *ngIf=\"showBottomSection()\"></div>\n        <!--BOTTOM CARD SECTION-->\n        <div *ngIf=\"showBottomSection()\" class=\"ui-g-12 ui-g-nopad w-card-zbottom\"\n             [class.u-card-pointer]=\"selectable\"\n             (click)=\"toggleSelect($event)\">\n            <ng-content select=\"aw-card-bottom\"></ng-content>\n        </div>\n    </div>\n\n    <div *ngIf=\"showBodyTemplate()\" class=\"w-card-user-cnt\" >\n        <ng-container *ngTemplateOutlet=\"bodyTemplate\">\n        </ng-container>\n    </div>\n\n</div>\n",
                    styles: [".w-card{border:2px solid #0076cb;display:inline-block;overflow:hidden;color:#636363;box-sizing:border-box}.w-card-header{position:relative;height:30px;padding-left:1em}.w-card-ztitle{height:100%;padding-top:3px}.w-card-ztitle ::ng-deep .w-card-title{height:100%;width:100%;display:flex}.w-card-ztitle ::ng-deep .w-card-title>*{flex:0 1}.w-card-zaction{height:100%;display:inline-block;text-align:right}.w-card-zaction .sap-icon{width:29px;height:29px;text-align:center;display:inline-block;font-size:1.5em;line-height:1.4em}.w-card-zaction .sap-icon.selection{color:#fff}.w-card-zaction .sap-icon.action{color:#969696}.w-card-zbottom,.w-card-ztop{padding:1em}.w-card-line-divider{border-top:1px solid #d6d6d6;margin:0 14px}.w-card-user-cnt{width:100%;height:100%;position:relative;background-color:#eee}.u-card-hover{position:absolute;height:100%;width:100%;opacity:0;transition:.5s ease;background-color:#0076cb;z-index:100}.u-card-hover .sap-icon{text-align:center;display:inline-block;font-size:4em;color:#fff;position:relative;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.u-card-action-bg{background:#0076cb}.u-is-hover{position:relative}.u-card-selected{border-color:#0076cb}.u-card-unselected{border-color:#d7d7d7}.u-card-hover,.u-card-pointer{cursor:pointer}"]
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return [
        { type: Environment }
    ]; };
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
    return CardComponent;
}(BaseComponent));
export { CardComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jYXJkL2NhcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBa0JBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztnQkFHN0QsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLGFBQWE7cUJBQ3pCO2lCQUNKOzsrQkF0Q0Q7O1NBdUNhLG9CQUFvQjs7Ozs7Z0JBSWhDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLGdCQUFnQjtxQkFDNUI7aUJBQ0o7O2tDQWhERDs7U0FpRGEsdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBLRCx5Q0FBYTtJQXlHNUMsdUJBQW1CLEdBQWdCO1FBQW5DLFlBRUksa0JBQU0sR0FBRyxDQUFDLFNBS2I7UUFQa0IsU0FBRyxHQUFILEdBQUcsQ0FBYTs7Ozs7MEJBbEdkLEtBQUs7Ozs7Ozs7MkJBU0osSUFBSTs7Ozs7NkJBT0gsYUFBYTs7Ozt5QkFjaEIsS0FBSzs7Ozs7OzswQkFTTCxVQUFVOzs7Ozt5QkFRVixJQUFJOzs7Ozt5QkFRTSxJQUFJLFlBQVksRUFBRTs7Ozs7eUJBT2xCLElBQUksWUFBWSxFQUFFOzs7Ozs4QkFPYixJQUFJLFlBQVksRUFBRTs7Ozs7OztnQ0EwQjFCLEtBQUs7O1FBUTVCLEFBREEscUJBQXFCO1FBQ3JCLEtBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDOztLQUN6Qjs7OztJQUVELGdDQUFROzs7SUFBUjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDOztRQUdqQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztTQUN0RDtLQUVKOzs7O0lBRU0seUNBQWlCOzs7O1FBRXBCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUlsQzs7T0FFRzs7Ozs7O0lBQ0gsb0NBQVk7Ozs7O0lBQVosVUFBYSxLQUFVO1FBRW5CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUUzQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO0tBQ0o7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNILHFDQUFhOzs7Ozs7O0lBQWIsVUFBYyxLQUFVO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQztLQUNKO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsK0JBQU87Ozs7OztJQUFQLFVBQVEsT0FBZ0I7UUFFcEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO0tBQ0o7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCx3Q0FBZ0I7Ozs7Ozs7SUFBaEI7UUFFSSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSyxJQUFJLENBQUMsZUFBZSxDQUFDO0tBQ2hFOztnQkFyUEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsNHNGQThEYjtvQkFDRyxNQUFNLEVBQUUsQ0FBQyw2d0NBQTZ3QyxDQUFDO2lCQUMxeEM7Ozs7Z0JBNUxPLFdBQVc7Ozs0QkFtTWQsS0FBSzs2QkFTTCxLQUFLOytCQU9MLEtBQUs7NkJBUUwsS0FBSzsyQkFNTCxLQUFLOzRCQVNMLEtBQUs7MkJBUUwsS0FBSzsyQkFRTCxNQUFNOzJCQU9OLE1BQU07Z0NBT04sTUFBTTt5QkFPTixZQUFZLFNBQUMsdUJBQXVCOytCQU9wQyxZQUFZLFNBQUMsTUFBTTsyQkFJbkIsU0FBUyxTQUFDLFVBQVU7O3dCQXhUekI7RUEyTm1DLGFBQWE7U0FBbkMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmFzZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29yZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vudmlyb25tZW50LCBpc0JsYW5rLCBpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBgYXctY2FyZC10b3BgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3ctY2FyZC16dG9wJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FyZFpvbmVUb3BDb21wb25lbnRcbntcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IGBhdy1jYXJkLWJvdHRvbWAsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAndy1jYXJkLXpib3R0b20nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDYXJkWm9uZUJvdHRvbUNvbXBvbmVudFxue1xufVxuXG4vKipcbiAqXG4gKiBDYXJkIGNvbXBvbmVudCBpcyBhIGNvbnRhaW5lciByZW5kZXJpbmcgaXRzIGNvbnRlbnQgaW5zaWRlIDMgZGlmZmVyZW50IHpvbmVzLlxuICpcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICB8ICAgVElUTEUgICAgICAgICAgICAgICAgICAgICAgIHwgQUNUSU9OIHxcbiAqICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgVE9QICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgQk9UVE9NICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKlxuICogIFRoZXJlIGFyZSAzIHpvbmVzICArIDEgcGxhY2Vob2xkZXIgZm9yIHRoZSBhY3Rpb25JY29uXG4gKlxuICogIENhcmRzIGNhbiBiZSBzZWxlY3RhYmxlIHdoaWNoIG1lYW5zIHdoZW4geW91IGNsaWNrIG9uIGl0IHRoZXJlIHdpbGwgYmUgcmVuZGVyZWQgYSBib3JkZXIgd2l0aFxuICogIGEgY2hlY2sgbWFyayBpbnNpZGUgQWN0aW9uIHpvbmUgKHRoaXMgaXMgZGVmYXVsdCBiZWhhdmlvcikuXG4gKiAgWW91IGNhbiB1c2UgW3NlbGVjdGFibGVdIGJpbmRpbmcgdG8gZGlzYWJsZSB0aGlzLCBpbiBzdWNoIGNhc2UgY2FyZCB3aWxsIGhhdmUganVzdCBhIGJvcmRlclxuICogIHdpdGhvdXQgYW55IGNoZWNrIG1hcmsuXG4gKlxuICogIENhcmRzIGNhbiBhbHNvIGNvbnRhaW4gY3VzdG9tIEFjdGlvbiB3aGljaCBpcyByZW5kZXJlZCBpbnNpZGUgQUNUSU9OIHpvbmUgYW5kIG9uIHRoZVxuICogIGFwcGxpY2F0aW9uIGxldmVsIHlvdSBjYW4gbGlzdGVuIGZvciAoY2xpY2spIGV2ZW50cyBhcyB3ZWxsIGFzIHlvdSBjYW4gcHJvdmlkZSB5b3VyIG93biBhY3Rpb25cbiAqICBpY29uXG4gKlxuICogIEJlc2lkZXMgQUNUSU9OLCBUSVRMRSwgVE9QIGFuZCBCT1RUT00gY29udGVudCB6b25lcyBjYXJkcyBzdXBwb3J0IGhvdmVyIG92ZXJsYXkgZWZmZWN0IGFuZFxuICogIHdoZW4gaXRzIGFjdGl2YXRlZCB0aGVyZSBpcyBhIG92ZXJsYXkgZGlzcGxheWVkIG9uIHRvcCBvZiB0aGUgY2FyZCB3aXRoIEljb24gaW4gdGhlIG1pZGRsZS5cbiAqICBQbGVhc2Ugbm90ZSB3aGVuIFtoYXNIb3Zlcl0gaXMgVFJVRSBhbGwgdGhlIGFjdGlvbnMgYW5kIHNlbGVjdGFiaWxpdHkgYXJlIGRpc2FibGVkIGFzIHRoZXJlIGlzXG4gKiAgb25seSBvbmUgYWN0aW9uIHdoaWNoIGNsaWNrIG9uIHRoZSBob3ZlciBvdmVybGF5LlxuICpcbiAqXG4gKiAjIyNleGFtcGxlIDE6XG4gKiAgQmFzaWMgaG92ZXIgY2FyZCB3aGljaCBieSBkZWZhdWx0IHN1cHBvcnQgc2VsZWN0YWJsZSBtb2RlXG4gKlxuICogYGBgXG4gKiAgICAgICAgICA8YXctY2FyZCAjY2FyZDEgW2hhc0FjdGlvbl09XCJmYWxzZVwiIFt3aWR0aF09XCInMjAycHgnXCIgW2hlaWdodF09XCInMTU0cHgnXCI+XG4gKlxuICogICAgICAgICAgICAgICAgIDxhdy1jYXJkLXRpdGxlIFthbGlnbl09XCInYm90dG9tLWxlZnQnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYS1zdXBwbGllci10YWdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFByZWZlcnJlZFxuICogICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gKiAgICAgICAgICAgICAgICAgPC9hdy1jYXJkLXRpdGxlPlxuICpcbiAqICAgICAgICAgICAgICAgICA8YXctY2FyZC10b3A+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdXBwbGllck5hbWVcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIEhhaWdodCBQdW1wc1xuICogICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1cHBsaWVyTG9jYXRpb25cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFBhbG8gQWx0bywgQ0EsIFVTQVxuICogICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgICA8L2F3LWNhcmQtdG9wPlxuICpcbiAqICAgICAgICAgICAgICAgICA8YXctY2FyZC1ib3R0b20gY2xhc3M9XCJ3LWNhcmQtemJvdHRvbVwiPlxuICogICAgICAgICAgICAgICAgICAgICBzb21lIHRleHQgYWJvdXQgdGhlIHN1cHBsaWVyIGFuZCBoaXMgcGFyZW50czxici8+XG4gKiAgICAgICAgICAgICAgICAgICAgIGFuZCBzb21lIGNvbnRhY3RzXG4gKiAgICAgICAgICAgICAgICAgPC9hdy1jYXJkLWJvdHRvbT5cbiAqXG4gKiAgICAgICAgICAgICA8L2F3LWNhcmQ+XG4gKlxuICogYGBgXG4gKlxuICogICMjI2V4YW1wbGUgMjpcbiAqICAgSG92ZXIgY2FyZCB3aXRoIGN1c3RvbSBhY3Rpb24uIHdoZW4gdW5zZWxlY3RlZCBhY3Rpb24gd2lsbCBhcHBlYXIgYW5kIHVzZXIgY2FuIGNsaWNrIG9uIGl0LlxuICpcbiAqIGBgYFxuICogICAgICAgICAgPGF3LWNhcmQgI2NhcmQxIFtzZWxlY3RhYmxlXT1cInRydWVcIiBbYWN0aW9uSWNvbl09XCInaWNvbi1xdWVzdGlvbi1tYXJrJ1wiXG4gKiAgICAgICAgICAgICAgICAgICAgIChvbkFjdGlvbik9XCJvbkFjdGlvbigzLCAkZXZlbnQpXCI+XG4gKlxuICogICAgICAgICAgICAgICAgIDxhdy1jYXJkLXRpdGxlIFthbGlnbl09XCInYm90dG9tLWxlZnQnXCI+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYS1zdXBwbGllci10YWdcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFByZWZlcnJlZFxuICogICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gKiAgICAgICAgICAgICAgICAgPC9hdy1jYXJkLXRpdGxlPlxuICpcbiAqICAgICAgICAgICAgICAgICA8YXctY2FyZC10b3A+XG4gKiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdXBwbGllck5hbWVcIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIEhhaWdodCBQdW1wc1xuICogICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1cHBsaWVyTG9jYXRpb25cIj5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgIFBhbG8gQWx0bywgQ0EsIFVTQVxuICogICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICAgICA8L2F3LWNhcmQtdG9wPlxuICpcbiAqICAgICAgICAgICAgICAgICA8YXctY2FyZC1ib3R0b20gY2xhc3M9XCJ3LWNhcmQtemJvdHRvbVwiPlxuICogICAgICAgICAgICAgICAgICAgICBzb21lIHRleHQgYWJvdXQgdGhlIHN1cHBsaWVyIGFuZCBoaXMgcGFyZW50czxici8+XG4gKiAgICAgICAgICAgICAgICAgICAgIGFuZCBzb21lIGNvbnRhY3RzXG4gKiAgICAgICAgICAgICAgICAgPC9hdy1jYXJkLWJvdHRvbT5cbiAqXG4gKiAgICAgICAgICAgICA8L2F3LWNhcmQ+XG4gKlxuICogYGBgXG4gKlxuICpcbiAqXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXctY2FyZCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidy1jYXJkXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICBbY2xhc3MudS1pcy1ob3Zlcl09XCJoYXNIb3ZlclwiXG4gICAgIChtb3VzZWVudGVyKT1cIm9uSG92ZXIodHJ1ZSlcIlxuICAgICAobW91c2VsZWF2ZSk9XCJvbkhvdmVyKGZhbHNlKVwiXG4gICAgIFtjbGFzcy51LWNhcmQtc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICBbY2xhc3MudS1jYXJkLXVuc2VsZWN0ZWRdPVwiIXNlbGVjdGVkXCJcbiAgICAgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiXG4+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5IHVpLWdcIiAgKm5nSWY9XCIhc2hvd0JvZHlUZW1wbGF0ZSgpXCI+XG4gICAgICAgIDwhLS0gSG92ZXIgZWxlbWVudCB0aGF0IGlzIHRyaWdnZXJlZCBieSBtb3VzZWVudGVyLCBtb3VzZWxlYXZlIGV2ZW50cy0tPlxuICAgICAgICA8ZGl2ICNob3ZlckRpdiAqbmdJZj1cImhhc0hvdmVyXCIgY2xhc3M9XCJ1LWNhcmQtaG92ZXJcIiAoY2xpY2spPVwib25Ib3ZlckFjdGlvbi5lbWl0KCRldmVudClcIj5cbiAgICAgICAgICAgIDxzcGFuIFtzdHlsZS53aWR0aF09XCInMTAwJSdcIiBjbGFzcz1cInNhcC1pY29uXCIgW25nQ2xhc3NdPVwiaG92ZXJJY29uXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSBIRUFERVIgSEFWSU5HIFRJVExFIEFORCBJQ09OUy9BQ1RJT05TLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nLTEyIHVpLWctbm9wYWQgdy1jYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInctY2FyZC16dGl0bGUgdWktZy1ub3BhZFwiIChjbGljayk9XCJ0b2dnbGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgIFtjbGFzcy51LWNhcmQtcG9pbnRlcl09XCJzZWxlY3RhYmxlXCJcbiAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1nLTknOiBoYXNBY3Rpb24gfHwgc2VsZWN0YWJsZSwgJ3VpLWctMTEnOiAhaGFzQWN0aW9uICYmICFzZWxlY3RhYmxlfVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImF3LWNhcmQtdGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImhhc0FjdGlvbiB8fCBzZWxlY3RhYmxlXCIgY2xhc3M9XCJ3LWNhcmQtemFjdGlvbiB1aS1nLW5vcGFkIHVpLWctM1wiPlxuXG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJzZWxlY3RlZCAmJiBzZWxlY3RhYmxlXCIgY2xhc3M9XCJzYXAtaWNvbiBzZWxlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy51LWNhcmQtcG9pbnRlcl09XCJzZWxlY3RhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MudS1jYXJkLWFjdGlvbi1iZ109XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJzZWxlY3RlZEljb25cIj48L3NwYW4+XG5cblxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaGFzQWN0aW9uICYmICghc2VsZWN0ZWQgfHwgIXNlbGVjdGFibGUpIFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzYXAtaWNvbiBhY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy51LWNhcmQtcG9pbnRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25BY3Rpb25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJhY3Rpb25JY29uXCJcbiAgICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS1UT1AgQ0FSRCBTRUNUSU9OLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3LWNhcmQtenRvcCB1aS1nLW5vcGFkIHVpLWctMTIgXCJcbiAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlU2VsZWN0KCRldmVudClcIlxuICAgICAgICAgICAgIFtjbGFzcy51LWNhcmQtcG9pbnRlcl09XCJzZWxlY3RhYmxlXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhdy1jYXJkLXRvcFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctMTIgdWktZy1ub3BhZCB3LWNhcmQtbGluZS1kaXZpZGVyICBcIiAqbmdJZj1cInNob3dCb3R0b21TZWN0aW9uKClcIj48L2Rpdj5cbiAgICAgICAgPCEtLUJPVFRPTSBDQVJEIFNFQ1RJT04tLT5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNob3dCb3R0b21TZWN0aW9uKClcIiBjbGFzcz1cInVpLWctMTIgdWktZy1ub3BhZCB3LWNhcmQtemJvdHRvbVwiXG4gICAgICAgICAgICAgW2NsYXNzLnUtY2FyZC1wb2ludGVyXT1cInNlbGVjdGFibGVcIlxuICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVTZWxlY3QoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYXctY2FyZC1ib3R0b21cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdJZj1cInNob3dCb2R5VGVtcGxhdGUoKVwiIGNsYXNzPVwidy1jYXJkLXVzZXItY250XCIgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYm9keVRlbXBsYXRlXCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cbmAsXG4gICAgc3R5bGVzOiBbYC53LWNhcmR7Ym9yZGVyOjJweCBzb2xpZCAjMDA3NmNiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO292ZXJmbG93OmhpZGRlbjtjb2xvcjojNjM2MzYzO2JveC1zaXppbmc6Ym9yZGVyLWJveH0udy1jYXJkLWhlYWRlcntwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6MzBweDtwYWRkaW5nLWxlZnQ6MWVtfS53LWNhcmQtenRpdGxle2hlaWdodDoxMDAlO3BhZGRpbmctdG9wOjNweH0udy1jYXJkLXp0aXRsZSA6Om5nLWRlZXAgLnctY2FyZC10aXRsZXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleH0udy1jYXJkLXp0aXRsZSA6Om5nLWRlZXAgLnctY2FyZC10aXRsZT4qe2ZsZXg6MCAxfS53LWNhcmQtemFjdGlvbntoZWlnaHQ6MTAwJTtkaXNwbGF5OmlubGluZS1ibG9jazt0ZXh0LWFsaWduOnJpZ2h0fS53LWNhcmQtemFjdGlvbiAuc2FwLWljb257d2lkdGg6MjlweDtoZWlnaHQ6MjlweDt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6MS41ZW07bGluZS1oZWlnaHQ6MS40ZW19LnctY2FyZC16YWN0aW9uIC5zYXAtaWNvbi5zZWxlY3Rpb257Y29sb3I6I2ZmZn0udy1jYXJkLXphY3Rpb24gLnNhcC1pY29uLmFjdGlvbntjb2xvcjojOTY5Njk2fS53LWNhcmQtemJvdHRvbSwudy1jYXJkLXp0b3B7cGFkZGluZzoxZW19LnctY2FyZC1saW5lLWRpdmlkZXJ7Ym9yZGVyLXRvcDoxcHggc29saWQgI2Q2ZDZkNjttYXJnaW46MCAxNHB4fS53LWNhcmQtdXNlci1jbnR7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtwb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9LnUtY2FyZC1ob3Zlcntwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO29wYWNpdHk6MDt0cmFuc2l0aW9uOi41cyBlYXNlO2JhY2tncm91bmQtY29sb3I6IzAwNzZjYjt6LWluZGV4OjEwMH0udS1jYXJkLWhvdmVyIC5zYXAtaWNvbnt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6NGVtO2NvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpfS51LWNhcmQtYWN0aW9uLWJne2JhY2tncm91bmQ6IzAwNzZjYn0udS1pcy1ob3Zlcntwb3NpdGlvbjpyZWxhdGl2ZX0udS1jYXJkLXNlbGVjdGVke2JvcmRlci1jb2xvcjojMDA3NmNifS51LWNhcmQtdW5zZWxlY3RlZHtib3JkZXItY29sb3I6I2Q3ZDdkN30udS1jYXJkLWhvdmVyLC51LWNhcmQtcG9pbnRlcntjdXJzb3I6cG9pbnRlcn1gXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudFxue1xuICAgIC8qKlxuICAgICAqIFRlbGxzIGlmIHdlIHNob3VsZCBleHBsaWNpdGx5IGhpZGUgdGhlIGFjdGlvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBoYXNBY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSXMgc2VsZWN0YWJsZSBtb2RlIHN1cHBvcnRlZD8gU2F5aW5nIFllcywgY2FyZCB3aWxsIGhhdmUgYnkgZGVmYXVsdCBjaGVjay1tYXJrIGluIHRoZVxuICAgICAqIEFDVElPTiB6b25lIHdoZW4gc2VsZWN0ZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb24gdG8gcGFzcyBjdXN0b20gXCJDYXJkIFNlbGVjdGVkXCIgSWNvblxuICAgICAqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZEljb246IHN0cmluZyA9ICdpY29uLWFjY2VwdCc7XG5cbiAgICAvKipcbiAgICAgKiBUaGVyZSBpcyBubyBkZWZhdWx0IHZhbHVlIGZvciBhY3Rpb24gaWNvbiwgd2hlbiBhcHBsaWNhdGlvbiB3YW50IHRvIGFkZCBhY3Rpb24gdG8gdGhlIGNhcmRcbiAgICAgKiBpdCBtdXN0IGFsc28gcHJvdmlkZSBhIGljb25cbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYWN0aW9uSWNvbjogc3RyaW5nO1xuXG4gICAgLypcbiAgICAgKiBFbmFibGUgYW5kIGRpc2FibGVzIGhvdmVyIGVmZmVjdCBvbiB0b3Agb2YgdGhlIGNhcmRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhhc0hvdmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIERlZmF1bHQgaWNvbiBuYW1lIGZvciB0aGUgaG92ZXIgb3ZlcmxheS4gVGhpcyBpY29ucyBzaG93cyB1cCBpbiB0aGUgbWlkZGxlIG92ZXIgdGhlIGNhcmRcbiAgICAgKiB2ZXJ0aWNhbGx5IGFuZCBob3Jpem9udGFsbHkgY2VudGVyZWRcbiAgICAgKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaG92ZXJJY29uOiBzdHJpbmcgPSAnaWNvbi1hZGQnO1xuXG5cbiAgICAvKipcbiAgICAgKiAgU2VsZWN0aW9uIHN0YXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNlbGVjdGVkOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogRmlyZWQgd2hlbiB0aGUgY2FyZCBpcyBzZWxlY3RlZC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVkIHdoZW4gYWN0aW9uIGljb24gaXMgY2xpY2tlZC5cbiAgICAgKlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEZpcmVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBob3ZlciBvdmVybGF5LlxuICAgICAqXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgb25Ib3ZlckFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgcXVlcnkgaXMgdXNlZCB0byBzYXZlIHRoZSBjb250ZW50IHJlZmVyZW5jZSB0byBib3R0b20gc2VjdGlvbiBpZiBhbnlcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKENhcmRab25lQm90dG9tQ29tcG9uZW50KVxuICAgIGJvdHRvbTogQ2FyZFpvbmVCb3R0b21Db21wb25lbnQ7XG5cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGJvZHkgd2hpY2ggaXMgdW5kZXIgYXBwbGljYXRpb24gZGV2ZWxvcGVyIGNvbnRyb2wuXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnYm9keScpXG4gICAgYm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgICBAVmlld0NoaWxkKCdob3ZlckRpdicpXG4gICAgaG92ZXJEaXY6IEVsZW1lbnRSZWY7XG5cbiAgICAvKipcbiAgICAgKiBVc3VhbGx5IHdoZW4gdGVtcGxhdGUgaXMgcHJvdmlkZWQgd2Ugd2FudCB0byB1c2UgaXQgYW5kIHJlcGxhY2UgaW50ZXJuYWwgb25lIGJ1dCBpbiB0aGlzXG4gICAgICogY2FzZSBpdCB3aWxsIGJlIGFsd2F5cyBjb25kaXRpb25hbCBhbmQgYXBwbGljYXRpb24gZGV2ZWxvcGVyIGNhbiBzd2l0Y2ggYmV0d2VlbiBkZWZhdWx0XG4gICAgICogdGVtcGxhdGUgd2l0aCB6b25lcyBhbmQgY3VzdG9tIG9uZSBwcm92aWRlZCBieSBkZXZlbG9wZXIuXG4gICAgICpcbiAgICAgKi9cbiAgICB1c2VCb2R5VGVtcGxhdGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVudjogRW52aXJvbm1lbnQpXG4gICAge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIC8vIHNldHMgZGVmYXVsdCB2YWx1ZVxuICAgICAgICB0aGlzLndpZHRoID0gJzIwMnB4JztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnMTU0cHgnO1xuICAgIH1cblxuICAgIG5nT25Jbml0KClcbiAgICB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgLy8gSWYgYXBwbGljYXRpb24gd2FudHMgdG8gdXNlIGFjdGlvbiBpdCBtdXN0IHByb3ZpZGUgYWN0aW9uSWNvblxuICAgICAgICBpZiAoaXNCbGFuayh0aGlzLmFjdGlvbkljb24pICYmIHRoaXMuaGFzQWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYWN0aW9uIGljb24nKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIHNob3dCb3R0b21TZWN0aW9uKClcbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5ib3R0b20pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogZmlyZXMgc2VsZWN0IGFuZCB1bnNlbGVjdCBldmVudC5cbiAgICAgKi9cbiAgICB0b2dnbGVTZWxlY3QoZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogT25seSBmaXJlZCB3aGVuIGFjdGlvbiBpcyByZW5kZXJlZCBhbmQgdXNlciBjbGlja3Mgb24gY3VzdG9tIGFjdGlvbkljb25cbiAgICAgKlxuICAgICAqL1xuICAgIG9uQWN0aW9uQ2xpY2soZXZlbnQ6IGFueSlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmhhc0FjdGlvbiAmJiAoIXRoaXMuc2VsZWN0ZWQgfHwgIXRoaXMuc2VsZWN0YWJsZSkpIHtcbiAgICAgICAgICAgIHRoaXMub25BY3Rpb24uZW1pdCh0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCAgd2hlbiBob3ZlciBlZmZlY3QgaXMgb24gKyB1c2VyIGNsaWNrIG9uIHRoZSBjYXJkXG4gICAgICpcbiAgICAgKi9cbiAgICBvbkhvdmVyKGlzRW50ZXI6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuaG92ZXJEaXYpKSB7XG4gICAgICAgICAgICB0aGlzLmhvdmVyRGl2Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IGlzRW50ZXIgPyAwLjUgOiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBVc2VkIHRvIGRlY2lkZSBpZiB3ZSBzaG91bGQgcmVuZGVyIGltcGxpY2l0IGNhcmQgdGVtcGxhdGUgd2l0aCBvdXIgem9uZXMgb3JcbiAgICAgKiB1c2VyIHByb3ZpZGVkIHRlbXBsYXRlXG4gICAgICpcbiAgICAgKi9cbiAgICBzaG93Qm9keVRlbXBsYXRlKCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5ib2R5VGVtcGxhdGUpICAmJiB0aGlzLnVzZUJvZHlUZW1wbGF0ZTtcbiAgICB9XG5cbn1cblxuIl19