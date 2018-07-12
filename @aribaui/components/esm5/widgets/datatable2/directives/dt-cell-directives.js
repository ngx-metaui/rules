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
        if (isPresent(this.maxWidth) && this.maxWidth > 0) {
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
                    selector: '[maxWidth]'
                },] },
    ];
    /** @nocollapse */
    SetCellMaxWidthDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DTColumn2Component }
    ]; };
    SetCellMaxWidthDirective.propDecorators = {
        maxWidth: [{ type: Input }]
    };
    return SetCellMaxWidthDirective;
}());
export { SetCellMaxWidthDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHQtY2VsbC1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvZGF0YXRhYmxlMi9kaXJlY3RpdmVzL2R0LWNlbGwtZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7SUFvQnBDLGtDQUFxQixPQUFtQixFQUNuQixRQUNBO1FBRkEsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixXQUFNLEdBQU4sTUFBTTtRQUNOLE9BQUUsR0FBRixFQUFFO0tBRXRCOzs7O0lBR0QsMkNBQVE7OztJQUFSO0tBR0M7Ozs7SUFFRCxrREFBZTs7O0lBQWY7UUFFSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxxQkFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDL0UsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2dCQUN2QyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBQzFDLHFCQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO2dCQUN2QyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7Z0JBQ3ZDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztnQkFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsTUFBTSxDQUFDO2lCQUNWO2dCQUVELFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDN0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7cUJBRTFCO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDckUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7cUJBQzFCO2lCQUNKO2FBQ0o7U0FDSjtLQUNKO0lBRUQ7Ozs7Ozs7Ozs7T0FVRzs7Ozs7Ozs7Ozs7Ozs7SUFDSCxnREFBYTs7Ozs7Ozs7Ozs7OztJQUFiLFVBQWUsUUFBZ0I7UUFFM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQ3ZGO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7O0lBR08sNENBQVM7Ozs7UUFFYixxQkFBSSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRSxxQkFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O1FBSXJELElBQUksSUFBSSxDQUFDLENBQUM7UUFFVixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Z0JBbkZuQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7aUJBQ3pCOzs7O2dCQWZpQyxVQUFVO2dCQUFpQixTQUFTO2dCQUM5RCxrQkFBa0I7OzsyQkFrQnJCLEtBQUs7O21DQW5CVjs7U0FnQmEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RUQ29sdW1uMkNvbXBvbmVudH0gZnJvbSAnLi4vY29sdW1uL2R0LWNvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtpc1ByZXNlbnR9IGZyb20gJ0BhcmliYXVpL2NvcmUnO1xuXG4vKipcbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBpcyByZXNwb25zaWJsZSBmb3IgY2hlY2tpbmcgYW5kIHNldHRpbmcgdGhlIHdpZGVzdCBjb250ZW50IHdpZHRoIG9udG9cbiAqIENvbHVtbiBjb21wb25lbnQgYXMgdGhlIHdpZGVzdENlbGwgcHJvcGVydHkuXG4gKlxuICpcbiAqXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttYXhXaWR0aF0nXG59KVxuZXhwb3J0IGNsYXNzIFNldENlbGxNYXhXaWR0aERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdFxue1xuXG4gICAgQElucHV0KClcbiAgICBtYXhXaWR0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSB0ZDogRFRDb2x1bW4yQ29tcG9uZW50KVxuICAgIHtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0ICgpOiB2b2lkXG4gICAge1xuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0ICgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubWF4V2lkdGgpICYmIHRoaXMubWF4V2lkdGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgaW5saW5lRGF0YSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdC1jb2wtY2VsbC1kYXRhJyk7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGlubGluZURhdGEpKSB7XG4gICAgICAgICAgICAgICAgaW5saW5lRGF0YS5zdHlsZS53aGl0ZVNwYWNlID0gJ25vd3JhcCc7XG4gICAgICAgICAgICAgICAgaW5saW5lRGF0YS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxXaWR0aCA9IGlubGluZURhdGEub2Zmc2V0V2lkdGg7IC8vIHRkXG4gICAgICAgICAgICAgICAgaW5saW5lRGF0YS5zdHlsZS53aGl0ZVNwYWNlID0gJ25vcm1hbCc7XG4gICAgICAgICAgICAgICAgaW5saW5lRGF0YS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNJblRocmVzSG9sZChjZWxsV2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjZWxsV2lkdGggKz0gdGhpcy50ZFBhZGRpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbFdpZHRoID4gdGhpcy50ZC53aWR0aFB4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsV2lkdGggPCB0aGlzLm1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRkLndpZGVzdENlbGwgPSBjZWxsV2lkdGggPiB0aGlzLnRkLndpZGVzdENlbGwgPyBjZWxsV2lkdGggOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGQud2lkZXN0Q2VsbDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGxXaWR0aCA+PSB0aGlzLm1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRkLndpZGVzdENlbGwgPSB0aGlzLm1heFdpZHRoID4gdGhpcy50ZC53aWRlc3RDZWxsID8gdGhpcy5tYXhXaWR0aCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZC53aWRlc3RDZWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBJcyB0aGUgbmV3IHdpZHRoIHRoZSBzYW1lIGFzIHRoZSBvbmUgYWxyZWFkeSBzZXQgb24gdGhlIGNvbHVtbj8gSWYgeWVzIHRoZW4gcHJvYmFibHlcbiAgICAgKiBuZXcgY29udGVudCBkb2VzIG5vdCBkaWZmZXIgdGhhdCBtdWNoLiBXZSBzdGlsbCBrZWVwIGNlcnRhaW4gdGhyZXNob2xkIGFzIHRoZSBuZXcgY29udGVudFxuICAgICAqIHdpZHRoIG1pZ2h0IGRpZmZlciAxIG9yIDIgcGl4ZXMgZGVwZW5kaW5nIGhvdyBzZXQgdGhlIGNzcy5cbiAgICAgKlxuICAgICAqIFRvIG1ha2Ugc3VyZSB3ZSByZXNpemUgY29sdW1uIG9ubHkgaWYgbmVjZXNzYXJ5IGJlY2F1c2UgaXQgY291bGQgYmUgb3JpZ2luYWwgc2l6ZVxuICAgICAqIGlzIDQwMHB4IGJ1dCB0aGUgbmV3IG9uZSBpcyA0MDFweCBzaW5jZSBzb21ld2hlcmUgYWRkIHNvbWUgZXh0cmEgYm9yZGVyIHdlIGhhdmUgdGhpc1xuICAgICAqIHNhZmUgdGhyZXNob2xkXG4gICAgICpcbiAgICAgKi9cbiAgICBpc0luVGhyZXNIb2xkIChuZXdXaWR0aDogbnVtYmVyKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMudGQud2lkZXN0Q2VsbCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyh0aGlzLnRkLndpZGVzdENlbGwgLSBuZXdXaWR0aCkgPiAzICYmIG5ld1dpZHRoID4gdGhpcy50ZC53aWRlc3RDZWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSB0ZFBhZGRpbmcgKCk6IG51bWJlclxuICAgIHtcbiAgICAgICAgbGV0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgbGV0IGNlbGwgPSBwYXJzZUludChjb21wdXRlZFN0eWxlLnBhZGRpbmdMZWZ0KSB8fCAwO1xuICAgICAgICBjZWxsICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ1JpZ2h0KSB8fCAwO1xuICAgICAgICBjZWxsICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUuYm9yZGVyUmlnaHRXaWR0aCkgfHwgMDtcbiAgICAgICAgY2VsbCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLmJvcmRlckxlZnRXaWR0aCkgfHwgMDtcblxuICAgICAgICAvLyBwbHVzIGdpdmUgaXQgc29tZSBsaXR0bGUgc3BhY2UgYXJvdW5kIHRoZSB0ZXh0IHNvIGl0IG5vdHMgcHggdG8gcHggaW5uZXIgd2lkdGggb2YgdGhlIHRkXG4gICAgICAgIC8vIGN1eiBpdCBjb3VsZCB3cmFwXG4gICAgICAgIGNlbGwgKz0gNTtcblxuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG59XG4iXX0=