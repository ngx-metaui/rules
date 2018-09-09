/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DTColumn2Component } from '../column/dt-column.component';
import { isPresent } from '@aribaui/core';
/**
 *
 * This directive is responsible for checking and setting the widest content width onto
 * Column component as the widestCell property.
 *
 * We use this directive inside dt-column.component to store a current width for each td,th
 *
 *
 */
export class SetCellMaxWidthDirective {
    /**
     * @param {?} element
     * @param {?} render
     * @param {?} td
     */
    constructor(element, render, td) {
        this.element = element;
        this.render = render;
        this.td = td;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // console.log('Cell Max Width: ' + this.dtMaxWidth, this.dtMaxWidth > 0);
        if (isPresent(this.dtMaxWidth) && this.dtMaxWidth > 0) {
            /** @type {?} */
            let inlineData = this.element.nativeElement.querySelector('.dt-col-cell-data');
            if (isPresent(inlineData)) {
                inlineData.style.whiteSpace = 'nowrap';
                inlineData.style.display = 'inline-block';
                /** @type {?} */
                let cellWidth = inlineData.offsetWidth; // td
                inlineData.style.whiteSpace = 'normal';
                inlineData.style.display = 'inline';
                if (!this.isInThresHold(cellWidth)) {
                    return;
                }
                cellWidth += this.tdPadding();
                if (cellWidth > this.td.widthPx) {
                    if (cellWidth < this.dtMaxWidth) {
                        this.td.widestCell = cellWidth > this.td.widestCell ? cellWidth :
                            this.td.widestCell;
                    }
                    else if (cellWidth >= this.dtMaxWidth) {
                        this.td.widestCell = (this.dtMaxWidth > this.td.widestCell)
                            ? this.dtMaxWidth : this.td.widestCell;
                    }
                }
            }
        }
    }
    /**
     *
     * Is the new width the same as the one already set on the column? If yes then probably
     * new content does not differ that much. We still keep certain threshold as the new content
     * width might differ 1 or 2 pixes depending how set the css.
     *
     * To make sure we resize column only if necessary because it could be original size
     * is 400px but the new one is 401px since somewhere add some extra border we have this
     * safe threshold
     *
     * @param {?} newWidth
     * @return {?}
     */
    isInThresHold(newWidth) {
        if (this.td.widestCell > 0) {
            return Math.abs(this.td.widestCell - newWidth) > 3 && newWidth > this.td.widestCell;
        }
        return true;
    }
    /**
     * @return {?}
     */
    tdPadding() {
        /** @type {?} */
        let computedStyle = getComputedStyle(this.element.nativeElement);
        /** @type {?} */
        let cell = parseInt(computedStyle.paddingLeft) || 0;
        cell += parseInt(computedStyle.paddingRight) || 0;
        cell += parseInt(computedStyle.borderRightWidth) || 0;
        cell += parseInt(computedStyle.borderLeftWidth) || 0;
        // plus give it some little space around the text so it nots px to px inner width of the td
        // cuz it could wrap
        cell += 5;
        return cell;
    }
}
SetCellMaxWidthDirective.decorators = [
    { type: Directive, args: [{
                selector: '[dtMaxWidth]'
            },] }
];
/** @nocollapse */
SetCellMaxWidthDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DTColumn2Component }
];
SetCellMaxWidthDirective.propDecorators = {
    dtMaxWidth: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.dtMaxWidth;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.element;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.render;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.td;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY2VsbC1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9kaXJlY3RpdmVzL2R0LWNlbGwtZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQWN4QyxNQUFNOzs7Ozs7SUFNRixZQUFvQixPQUFtQixFQUNuQixRQUNBO1FBRkEsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTTtRQUNOLE9BQUUsR0FBRixFQUFFO0tBRXJCOzs7O0lBR0QsUUFBUTtLQUdQOzs7O0lBRUQsZUFBZTs7UUFHWCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDcEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDL0UsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2dCQUN2QyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7O2dCQUMxQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO2dCQUN2QyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztnQkFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsTUFBTSxDQUFDO2lCQUNWO2dCQUVELFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDN0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7cUJBRTFCO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs0QkFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO3FCQUM5QztpQkFDSjthQUNKO1NBQ0o7S0FDSjs7Ozs7Ozs7Ozs7Ozs7SUFhRCxhQUFhLENBQUMsUUFBZ0I7UUFFMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3ZGO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7O0lBR08sU0FBUzs7UUFFYixJQUFJLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUNqRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7UUFJckQsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUVWLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7WUFwRm5CLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYzthQUMzQjs7OztZQWZpQyxVQUFVO1lBQWlCLFNBQVM7WUFDOUQsa0JBQWtCOzs7eUJBa0JyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi4vY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG4vKipcbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyByZXNwb25zaWJsZSBmb3IgY2hlY2tpbmcgYW5kIHNldHRpbmcgdGhlIHdpZGVzdCBjb250ZW50IHdpZHRoIG9udG9cbiAqIENvbHVtbiBjb21wb25lbnQgYXMgdGhlIHdpZGVzdENlbGwgcHJvcGVydHkuXG4gKlxuICogV2UgdXNlIHRoaXMgZGlyZWN0aXZlIGluc2lkZSBkdC1jb2x1bW4uY29tcG9uZW50IHRvIHN0b3JlIGEgY3VycmVudCB3aWR0aCBmb3IgZWFjaCB0ZCx0aFxuICpcbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2R0TWF4V2lkdGhdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZXRDZWxsTWF4V2lkdGhEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXRcbntcblxuICAgIEBJbnB1dCgpXG4gICAgZHRNYXhXaWR0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0ZDogRFRDb2x1bW4yQ29tcG9uZW50KVxuICAgIHtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0NlbGwgTWF4IFdpZHRoOiAnICsgdGhpcy5kdE1heFdpZHRoLCB0aGlzLmR0TWF4V2lkdGggPiAwKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmR0TWF4V2lkdGgpICYmIHRoaXMuZHRNYXhXaWR0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBpbmxpbmVEYXRhID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR0LWNvbC1jZWxsLWRhdGEnKTtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoaW5saW5lRGF0YSkpIHtcbiAgICAgICAgICAgICAgICBpbmxpbmVEYXRhLnN0eWxlLndoaXRlU3BhY2UgPSAnbm93cmFwJztcbiAgICAgICAgICAgICAgICBpbmxpbmVEYXRhLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICAgICAgICAgICAgICBsZXQgY2VsbFdpZHRoID0gaW5saW5lRGF0YS5vZmZzZXRXaWR0aDsgLy8gdGRcbiAgICAgICAgICAgICAgICBpbmxpbmVEYXRhLnN0eWxlLndoaXRlU3BhY2UgPSAnbm9ybWFsJztcbiAgICAgICAgICAgICAgICBpbmxpbmVEYXRhLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0luVGhyZXNIb2xkKGNlbGxXaWR0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNlbGxXaWR0aCArPSB0aGlzLnRkUGFkZGluZygpO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsV2lkdGggPiB0aGlzLnRkLndpZHRoUHgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxXaWR0aCA8IHRoaXMuZHRNYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZC53aWRlc3RDZWxsID0gY2VsbFdpZHRoID4gdGhpcy50ZC53aWRlc3RDZWxsID8gY2VsbFdpZHRoIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRkLndpZGVzdENlbGw7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsV2lkdGggPj0gdGhpcy5kdE1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRkLndpZGVzdENlbGwgPSAodGhpcy5kdE1heFdpZHRoID4gdGhpcy50ZC53aWRlc3RDZWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kdE1heFdpZHRoIDogdGhpcy50ZC53aWRlc3RDZWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJcyB0aGUgbmV3IHdpZHRoIHRoZSBzYW1lIGFzIHRoZSBvbmUgYWxyZWFkeSBzZXQgb24gdGhlIGNvbHVtbj8gSWYgeWVzIHRoZW4gcHJvYmFibHlcbiAgICAgKiBuZXcgY29udGVudCBkb2VzIG5vdCBkaWZmZXIgdGhhdCBtdWNoLiBXZSBzdGlsbCBrZWVwIGNlcnRhaW4gdGhyZXNob2xkIGFzIHRoZSBuZXcgY29udGVudFxuICAgICAqIHdpZHRoIG1pZ2h0IGRpZmZlciAxIG9yIDIgcGl4ZXMgZGVwZW5kaW5nIGhvdyBzZXQgdGhlIGNzcy5cbiAgICAgKlxuICAgICAqIFRvIG1ha2Ugc3VyZSB3ZSByZXNpemUgY29sdW1uIG9ubHkgaWYgbmVjZXNzYXJ5IGJlY2F1c2UgaXQgY291bGQgYmUgb3JpZ2luYWwgc2l6ZVxuICAgICAqIGlzIDQwMHB4IGJ1dCB0aGUgbmV3IG9uZSBpcyA0MDFweCBzaW5jZSBzb21ld2hlcmUgYWRkIHNvbWUgZXh0cmEgYm9yZGVyIHdlIGhhdmUgdGhpc1xuICAgICAqIHNhZmUgdGhyZXNob2xkXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0luVGhyZXNIb2xkKG5ld1dpZHRoOiBudW1iZXIpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAodGhpcy50ZC53aWRlc3RDZWxsID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMudGQud2lkZXN0Q2VsbCAtIG5ld1dpZHRoKSA+IDMgJiYgbmV3V2lkdGggPiB0aGlzLnRkLndpZGVzdENlbGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHRkUGFkZGluZygpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGxldCBjZWxsID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCkgfHwgMDtcbiAgICAgICAgY2VsbCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCkgfHwgMDtcbiAgICAgICAgY2VsbCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpIHx8IDA7XG4gICAgICAgIGNlbGwgKz0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpIHx8IDA7XG5cbiAgICAgICAgLy8gcGx1cyBnaXZlIGl0IHNvbWUgbGl0dGxlIHNwYWNlIGFyb3VuZCB0aGUgdGV4dCBzbyBpdCBub3RzIHB4IHRvIHB4IGlubmVyIHdpZHRoIG9mIHRoZSB0ZFxuICAgICAgICAvLyBjdXogaXQgY291bGQgd3JhcFxuICAgICAgICBjZWxsICs9IDU7XG5cbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxufVxuIl19