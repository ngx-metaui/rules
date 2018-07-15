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
 * We use this directive inside dt-column.component to store a current width for each td,th
 *
 *
 */
var SetCellMaxWidthDirective = /** @class */ (function () {
    function SetCellMaxWidthDirective(element, render, td) {
        this.element = element;
        this.render = render;
        this.td = td;
    }
    /**
     * @return {?}
     */
    SetCellMaxWidthDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    SetCellMaxWidthDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // console.log('Cell Max Width: ' + this.dtMaxWidth, this.dtMaxWidth > 0);
        if (isPresent(this.dtMaxWidth) && this.dtMaxWidth > 0) {
            var /** @type {?} */ inlineData = this.element.nativeElement.querySelector('.dt-col-cell-data');
            if (isPresent(inlineData)) {
                inlineData.style.whiteSpace = 'nowrap';
                inlineData.style.display = 'inline-block';
                var /** @type {?} */ cellWidth = inlineData.offsetWidth; // td
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
    };
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
     */
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
    SetCellMaxWidthDirective.prototype.isInThresHold = /**
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
    function (newWidth) {
        if (this.td.widestCell > 0) {
            return Math.abs(this.td.widestCell - newWidth) > 3 && newWidth > this.td.widestCell;
        }
        return true;
    };
    /**
     * @return {?}
     */
    SetCellMaxWidthDirective.prototype.tdPadding = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ computedStyle = getComputedStyle(this.element.nativeElement);
        var /** @type {?} */ cell = parseInt(computedStyle.paddingLeft) || 0;
        cell += parseInt(computedStyle.paddingRight) || 0;
        cell += parseInt(computedStyle.borderRightWidth) || 0;
        cell += parseInt(computedStyle.borderLeftWidth) || 0;
        // plus give it some little space around the text so it nots px to px inner width of the td
        // cuz it could wrap
        cell += 5;
        return cell;
    };
    SetCellMaxWidthDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dtMaxWidth]'
                },] },
    ];
    /** @nocollapse */
    SetCellMaxWidthDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DTColumn2Component }
    ]; };
    SetCellMaxWidthDirective.propDecorators = {
        dtMaxWidth: [{ type: Input }]
    };
    return SetCellMaxWidthDirective;
}());
export { SetCellMaxWidthDirective };
function SetCellMaxWidthDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.dtMaxWidth;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.element;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.render;
    /** @type {?} */
    SetCellMaxWidthDirective.prototype.td;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY2VsbC1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9kaXJlY3RpdmVzL2R0LWNlbGwtZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7SUFvQnBDLGtDQUFvQixPQUFtQixFQUNuQixRQUNBO1FBRkEsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTTtRQUNOLE9BQUUsR0FBRixFQUFFO0tBRXJCOzs7O0lBR0QsMkNBQVE7OztJQUFSO0tBR0M7Ozs7SUFFRCxrREFBZTs7O0lBQWY7O1FBR0ksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQscUJBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztnQkFDdkMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO2dCQUMxQyxxQkFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQztnQkFDdkMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2dCQUN2QyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7Z0JBRXBDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLE1BQU0sQ0FBQztpQkFDVjtnQkFFRCxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM5QixFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzdELElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO3FCQUUxQjtvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7NEJBQ3ZELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQztxQkFDOUM7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7SUFFRDs7Ozs7Ozs7OztPQVVHOzs7Ozs7Ozs7Ozs7OztJQUNILGdEQUFhOzs7Ozs7Ozs7Ozs7O0lBQWIsVUFBYyxRQUFnQjtRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDdkY7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7SUFHTyw0Q0FBUzs7OztRQUViLHFCQUFJLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLHFCQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7UUFJckQsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUVWLE1BQU0sQ0FBQyxJQUFJLENBQUM7OztnQkFwRm5CLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztpQkFDM0I7Ozs7Z0JBZmlDLFVBQVU7Z0JBQWlCLFNBQVM7Z0JBQzlELGtCQUFrQjs7OzZCQWtCckIsS0FBSzs7bUNBbkJWOztTQWdCYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RFRDb2x1bW4yQ29tcG9uZW50fSBmcm9tICcuLi9jb2x1bW4vZHQtY29sdW1uLmNvbXBvbmVudCc7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cbi8qKlxuICpcbiAqIFRoaXMgZGlyZWN0aXZlIGlzIHJlc3BvbnNpYmxlIGZvciBjaGVja2luZyBhbmQgc2V0dGluZyB0aGUgd2lkZXN0IGNvbnRlbnQgd2lkdGggb250b1xuICogQ29sdW1uIGNvbXBvbmVudCBhcyB0aGUgd2lkZXN0Q2VsbCBwcm9wZXJ0eS5cbiAqXG4gKiBXZSB1c2UgdGhpcyBkaXJlY3RpdmUgaW5zaWRlIGR0LWNvbHVtbi5jb21wb25lbnQgdG8gc3RvcmUgYSBjdXJyZW50IHdpZHRoIGZvciBlYWNoIHRkLHRoXG4gKlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZHRNYXhXaWR0aF0nXG59KVxuZXhwb3J0IGNsYXNzIFNldENlbGxNYXhXaWR0aERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdFxue1xuXG4gICAgQElucHV0KClcbiAgICBkdE1heFdpZHRoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRkOiBEVENvbHVtbjJDb21wb25lbnQpXG4gICAge1xuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnQ2VsbCBNYXggV2lkdGg6ICcgKyB0aGlzLmR0TWF4V2lkdGgsIHRoaXMuZHRNYXhXaWR0aCA+IDApO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZHRNYXhXaWR0aCkgJiYgdGhpcy5kdE1heFdpZHRoID4gMCkge1xuICAgICAgICAgICAgbGV0IGlubGluZURhdGEgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHQtY29sLWNlbGwtZGF0YScpO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChpbmxpbmVEYXRhKSkge1xuICAgICAgICAgICAgICAgIGlubGluZURhdGEuc3R5bGUud2hpdGVTcGFjZSA9ICdub3dyYXAnO1xuICAgICAgICAgICAgICAgIGlubGluZURhdGEuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsV2lkdGggPSBpbmxpbmVEYXRhLm9mZnNldFdpZHRoOyAvLyB0ZFxuICAgICAgICAgICAgICAgIGlubGluZURhdGEuc3R5bGUud2hpdGVTcGFjZSA9ICdub3JtYWwnO1xuICAgICAgICAgICAgICAgIGlubGluZURhdGEuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW5UaHJlc0hvbGQoY2VsbFdpZHRoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2VsbFdpZHRoICs9IHRoaXMudGRQYWRkaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxXaWR0aCA+IHRoaXMudGQud2lkdGhQeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbFdpZHRoIDwgdGhpcy5kdE1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRkLndpZGVzdENlbGwgPSBjZWxsV2lkdGggPiB0aGlzLnRkLndpZGVzdENlbGwgPyBjZWxsV2lkdGggOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGQud2lkZXN0Q2VsbDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGxXaWR0aCA+PSB0aGlzLmR0TWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGQud2lkZXN0Q2VsbCA9ICh0aGlzLmR0TWF4V2lkdGggPiB0aGlzLnRkLndpZGVzdENlbGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmR0TWF4V2lkdGggOiB0aGlzLnRkLndpZGVzdENlbGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElzIHRoZSBuZXcgd2lkdGggdGhlIHNhbWUgYXMgdGhlIG9uZSBhbHJlYWR5IHNldCBvbiB0aGUgY29sdW1uPyBJZiB5ZXMgdGhlbiBwcm9iYWJseVxuICAgICAqIG5ldyBjb250ZW50IGRvZXMgbm90IGRpZmZlciB0aGF0IG11Y2guIFdlIHN0aWxsIGtlZXAgY2VydGFpbiB0aHJlc2hvbGQgYXMgdGhlIG5ldyBjb250ZW50XG4gICAgICogd2lkdGggbWlnaHQgZGlmZmVyIDEgb3IgMiBwaXhlcyBkZXBlbmRpbmcgaG93IHNldCB0aGUgY3NzLlxuICAgICAqXG4gICAgICogVG8gbWFrZSBzdXJlIHdlIHJlc2l6ZSBjb2x1bW4gb25seSBpZiBuZWNlc3NhcnkgYmVjYXVzZSBpdCBjb3VsZCBiZSBvcmlnaW5hbCBzaXplXG4gICAgICogaXMgNDAwcHggYnV0IHRoZSBuZXcgb25lIGlzIDQwMXB4IHNpbmNlIHNvbWV3aGVyZSBhZGQgc29tZSBleHRyYSBib3JkZXIgd2UgaGF2ZSB0aGlzXG4gICAgICogc2FmZSB0aHJlc2hvbGRcbiAgICAgKlxuICAgICAqL1xuICAgIGlzSW5UaHJlc0hvbGQobmV3V2lkdGg6IG51bWJlcik6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnRkLndpZGVzdENlbGwgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModGhpcy50ZC53aWRlc3RDZWxsIC0gbmV3V2lkdGgpID4gMyAmJiBuZXdXaWR0aCA+IHRoaXMudGQud2lkZXN0Q2VsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgdGRQYWRkaW5nKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgbGV0IGNlbGwgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLnBhZGRpbmdMZWZ0KSB8fCAwO1xuICAgICAgICBjZWxsICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ1JpZ2h0KSB8fCAwO1xuICAgICAgICBjZWxsICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUuYm9yZGVyUmlnaHRXaWR0aCkgfHwgMDtcbiAgICAgICAgY2VsbCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLmJvcmRlckxlZnRXaWR0aCkgfHwgMDtcblxuICAgICAgICAvLyBwbHVzIGdpdmUgaXQgc29tZSBsaXR0bGUgc3BhY2UgYXJvdW5kIHRoZSB0ZXh0IHNvIGl0IG5vdHMgcHggdG8gcHggaW5uZXIgd2lkdGggb2YgdGhlIHRkXG4gICAgICAgIC8vIGN1eiBpdCBjb3VsZCB3cmFwXG4gICAgICAgIGNlbGwgKz0gNTtcblxuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG59XG4iXX0=