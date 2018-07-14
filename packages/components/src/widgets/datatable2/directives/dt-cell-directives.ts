import {AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DTColumn2Component} from '../column/dt-column.component';
import {isPresent} from '@aribaui/core';

/**
 *
 * This directive is responsible for checking and setting the widest content width onto
 * Column component as the widestCell property.
 *
 * We use this directive inside dt-column.component to store a current width for each td,th
 *
 *
 */
@Directive({
    selector: '[dtMaxWidth]'
})
export class SetCellMaxWidthDirective implements OnInit, AfterViewInit
{

    @Input()
    dtMaxWidth: number;

    constructor(private element: ElementRef,
                private render: Renderer2,
                private td: DTColumn2Component)
    {
    }


    ngOnInit(): void
    {

    }

    ngAfterViewInit(): void
    {
        // console.log('Cell Max Width: ' + this.dtMaxWidth, this.dtMaxWidth > 0);
        if (isPresent(this.dtMaxWidth) && this.dtMaxWidth > 0) {
            let inlineData = this.element.nativeElement.querySelector('.dt-col-cell-data');
            if (isPresent(inlineData)) {
                inlineData.style.whiteSpace = 'nowrap';
                inlineData.style.display = 'inline-block';
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

                    } else if (cellWidth >= this.dtMaxWidth) {
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
     */
    isInThresHold(newWidth: number): boolean
    {
        if (this.td.widestCell > 0) {
            return Math.abs(this.td.widestCell - newWidth) > 3 && newWidth > this.td.widestCell;
        }
        return true;
    }


    private tdPadding(): number
    {
        let computedStyle = getComputedStyle(this.element.nativeElement);
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
