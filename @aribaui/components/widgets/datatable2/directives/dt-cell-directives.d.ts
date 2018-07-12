import { AfterViewInit, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DTColumn2Component } from '../column/dt-column.component';
/**
 *
 * This directive is responsible for checking and setting the widest content width onto
 * Column component as the widestCell property.
 *
 *
 *
 *
 */
export declare class SetCellMaxWidthDirective implements OnInit, AfterViewInit {
    private element;
    private render;
    private td;
    maxWidth: number;
    constructor(element: ElementRef, render: Renderer2, td: DTColumn2Component);
    ngOnInit(): void;
    ngAfterViewInit(): void;
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
    isInThresHold(newWidth: number): boolean;
    private tdPadding();
}
