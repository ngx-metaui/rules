/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DTColumn2Component } from '../column/dt-column.component';
import { isPresent } from '@aribaui/core';
/**
 *
 * This directive is responsible for checking and setting the widest content width onto
 * Column component as the widestCell property.
 *
 *
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
        if (isPresent(this.maxWidth) && this.maxWidth > 0) {
            let /** @type {?} */ inlineData = this.element.nativeElement.querySelector('.dt-col-cell-data');
            if (isPresent(inlineData)) {
                inlineData.style.whiteSpace = 'nowrap';
                inlineData.style.display = 'inline-block';
                let /** @type {?} */ cellWidth = inlineData.offsetWidth; // td
                inlineData.style.whiteSpace = 'normal';
                inlineData.style.display = 'inline';
                if (!this.isInThresHold(cellWidth)) {
                    return;
                }
                cellWidth += this.tdPadding();
                if (cellWidth > this.td.widthPx) {
                    if (cellWidth < this.maxWidth) {
                        this.td.widestCell = cellWidth > this.td.widestCell ? cellWidth :
                            this.td.widestCell;
                    }
                    else if (cellWidth >= this.maxWidth) {
                        this.td.widestCell = this.maxWidth > this.td.widestCell ? this.maxWidth :
                            this.td.widestCell;
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
        let /** @type {?} */ computedStyle = getComputedStyle(this.element.nativeElement);
        let /** @type {?} */ cell = parseInt(computedStyle.paddingLeft) || 0;
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
                selector: '[maxWidth]'
            },] },
];
/** @nocollapse */
SetCellMaxWidthDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DTColumn2Component }
];
SetCellMaxWidthDirective.propDecorators = {
    maxWidth: [{ type: Input }]
};
function SetCellMaxWidthDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.maxWidth;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.element;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.render;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.td;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY2VsbC1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9kaXJlY3RpdmVzL2R0LWNlbGwtZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQWN4QyxNQUFNOzs7Ozs7SUFNRixZQUFxQixPQUFtQixFQUNuQixRQUNBO1FBRkEsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTTtRQUNOLE9BQUUsR0FBRixFQUFFO0tBRXRCOzs7O0lBR0QsUUFBUTtLQUdQOzs7O0lBRUQsZUFBZTtRQUVYLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELHFCQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMvRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztnQkFDMUMscUJBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztnQkFDdkMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO2dCQUVwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxNQUFNLENBQUM7aUJBQ1Y7Z0JBRUQsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUM3RCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztxQkFFMUI7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNyRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztxQkFDMUI7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7Ozs7Ozs7Ozs7Ozs7O0lBYUQsYUFBYSxDQUFFLFFBQWdCO1FBRTNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUN2RjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7OztJQUdPLFNBQVM7UUFFYixxQkFBSSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRSxxQkFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O1FBSXJELElBQUksSUFBSSxDQUFDLENBQUM7UUFFVixNQUFNLENBQUMsSUFBSSxDQUFDOzs7O1lBbkZuQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7YUFDekI7Ozs7WUFmaUMsVUFBVTtZQUFpQixTQUFTO1lBQzlELGtCQUFrQjs7O3VCQWtCckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEVENvbHVtbjJDb21wb25lbnR9IGZyb20gJy4uL2NvbHVtbi9kdC1jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdAYXJpYmF1aS9jb3JlJztcblxuLyoqXG4gKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgcmVzcG9uc2libGUgZm9yIGNoZWNraW5nIGFuZCBzZXR0aW5nIHRoZSB3aWRlc3QgY29udGVudCB3aWR0aCBvbnRvXG4gKiBDb2x1bW4gY29tcG9uZW50IGFzIHRoZSB3aWRlc3RDZWxsIHByb3BlcnR5LlxuICpcbiAqXG4gKlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbWF4V2lkdGhdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZXRDZWxsTWF4V2lkdGhEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXRcbntcblxuICAgIEBJbnB1dCgpXG4gICAgbWF4V2lkdGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yIChwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgIHByaXZhdGUgdGQ6IERUQ29sdW1uMkNvbXBvbmVudClcbiAgICB7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCAoKTogdm9pZFxuICAgIHtcblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCAoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm1heFdpZHRoKSAmJiB0aGlzLm1heFdpZHRoID4gMCkge1xuICAgICAgICAgICAgbGV0IGlubGluZURhdGEgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHQtY29sLWNlbGwtZGF0YScpO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChpbmxpbmVEYXRhKSkge1xuICAgICAgICAgICAgICAgIGlubGluZURhdGEuc3R5bGUud2hpdGVTcGFjZSA9ICdub3dyYXAnO1xuICAgICAgICAgICAgICAgIGlubGluZURhdGEuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsV2lkdGggPSBpbmxpbmVEYXRhLm9mZnNldFdpZHRoOyAvLyB0ZFxuICAgICAgICAgICAgICAgIGlubGluZURhdGEuc3R5bGUud2hpdGVTcGFjZSA9ICdub3JtYWwnO1xuICAgICAgICAgICAgICAgIGlubGluZURhdGEuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW5UaHJlc0hvbGQoY2VsbFdpZHRoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2VsbFdpZHRoICs9IHRoaXMudGRQYWRkaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxXaWR0aCA+IHRoaXMudGQud2lkdGhQeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbFdpZHRoIDwgdGhpcy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZC53aWRlc3RDZWxsID0gY2VsbFdpZHRoID4gdGhpcy50ZC53aWRlc3RDZWxsID8gY2VsbFdpZHRoIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRkLndpZGVzdENlbGw7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsV2lkdGggPj0gdGhpcy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZC53aWRlc3RDZWxsID0gdGhpcy5tYXhXaWR0aCA+IHRoaXMudGQud2lkZXN0Q2VsbCA/IHRoaXMubWF4V2lkdGggOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGQud2lkZXN0Q2VsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSXMgdGhlIG5ldyB3aWR0aCB0aGUgc2FtZSBhcyB0aGUgb25lIGFscmVhZHkgc2V0IG9uIHRoZSBjb2x1bW4/IElmIHllcyB0aGVuIHByb2JhYmx5XG4gICAgICogbmV3IGNvbnRlbnQgZG9lcyBub3QgZGlmZmVyIHRoYXQgbXVjaC4gV2Ugc3RpbGwga2VlcCBjZXJ0YWluIHRocmVzaG9sZCBhcyB0aGUgbmV3IGNvbnRlbnRcbiAgICAgKiB3aWR0aCBtaWdodCBkaWZmZXIgMSBvciAyIHBpeGVzIGRlcGVuZGluZyBob3cgc2V0IHRoZSBjc3MuXG4gICAgICpcbiAgICAgKiBUbyBtYWtlIHN1cmUgd2UgcmVzaXplIGNvbHVtbiBvbmx5IGlmIG5lY2Vzc2FyeSBiZWNhdXNlIGl0IGNvdWxkIGJlIG9yaWdpbmFsIHNpemVcbiAgICAgKiBpcyA0MDBweCBidXQgdGhlIG5ldyBvbmUgaXMgNDAxcHggc2luY2Ugc29tZXdoZXJlIGFkZCBzb21lIGV4dHJhIGJvcmRlciB3ZSBoYXZlIHRoaXNcbiAgICAgKiBzYWZlIHRocmVzaG9sZFxuICAgICAqXG4gICAgICovXG4gICAgaXNJblRocmVzSG9sZCAobmV3V2lkdGg6IG51bWJlcik6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnRkLndpZGVzdENlbGwgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModGhpcy50ZC53aWRlc3RDZWxsIC0gbmV3V2lkdGgpID4gMyAmJiBuZXdXaWR0aCA+IHRoaXMudGQud2lkZXN0Q2VsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgdGRQYWRkaW5nICgpOiBudW1iZXJcbiAgICB7XG4gICAgICAgIGxldCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGxldCBjZWxsID0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCkgfHwgMDtcbiAgICAgICAgY2VsbCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCkgfHwgMDtcbiAgICAgICAgY2VsbCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpIHx8IDA7XG4gICAgICAgIGNlbGwgKz0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpIHx8IDA7XG5cbiAgICAgICAgLy8gcGx1cyBnaXZlIGl0IHNvbWUgbGl0dGxlIHNwYWNlIGFyb3VuZCB0aGUgdGV4dCBzbyBpdCBub3RzIHB4IHRvIHB4IGlubmVyIHdpZHRoIG9mIHRoZSB0ZFxuICAgICAgICAvLyBjdXogaXQgY291bGQgd3JhcFxuICAgICAgICBjZWxsICs9IDU7XG5cbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxufVxuIl19