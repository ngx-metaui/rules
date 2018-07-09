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
 *
 *
 */
import {Component, DoCheck, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {isBlank, isPresent, MapWrapper} from '@aribaui/core';

/**
 * GenericContainerComponent is used by include-component.directive to dynamically create an
 * HTMLElement and use this element to wrap a child component. This is very useful when we want to
 * modify a child by wrapping it with a border, a background, or bold its text.
 *
 * The wrapper element is dynamically created. It's element is specified by the tagName property in
 * the bindings @Input.
 *
 *  ### Example.  Directly in html
 *
 *   app.html
 *      <aw-generic-container tagName="tagName" bindings="bindings">
 *          <my-component ..bindings..></my-component>
 *      </aw-generic-container>
 *
 *   app.component.ts
 *
 *       tagName = (bBold) ? 'h1' : 'span';
 *       bindings = {  style: 'background-color: red' }
 *
 */
@Component({
    selector: 'aw-generic-container',
    template: '<ng-content></ng-content>',
    styles: []
})
export class GenericContainerComponent implements OnInit, DoCheck
{

    /**
     * Default tagName if none is specified inside bindings.
     *
     */
    static readonly DefaultTagName = 'div';

    /**
     * Bindings to be added as attributes to the tagName element.
     */
    @Input()
    bindings: Map<string, any>;

    /**
     * Element to be created that wraps it's content.
     */
    @Input()
    tagName: string;

    /**
     * Native root element. Points to <aw-generic-container>
     */
    private nativeElement: Node;

    private childElement: Node;


    /**
     * param renderer - Renderer is used to create 'tagName' element.
     */
    constructor(private renderer: Renderer2, private element: ElementRef)
    {
        this.nativeElement = element.nativeElement;
    }

    /**
     * During the initialization, verify that at least one input has been set.
     */
    ngOnInit()
    {
        // If there's no input, this component wouldn't know what to do and throw exception.
        if (isBlank(this.bindings) && isBlank(this.tagName)) {
            throw new Error('GenericContainerComponent input bindings or tagName ' +
                'have not been set.');
        }

        // If the tagName is blank, the get it from bindings.
        if (isBlank(this.tagName)) {
            this.tagName = this.bindings.get('tagName');
            if (isBlank(this.tagName)) {
                this.tagName = GenericContainerComponent.DefaultTagName;
            }
        }

        // Save first added
        this.childElement = this.nativeElement.firstChild;
        this.doRender();
    }

    ngDoCheck(): void
    {

        if (isPresent(this.childElement) &&
            this.childElement.parentNode !== this.nativeElement.firstChild) {

            this.nativeElement.firstChild.appendChild(this.childElement);
        }
    }


    /**
     * After content has been initialized. Create the tagName element. Apply all the bindings on to
     * the element as attribute. Finally, move the child element, <ng-content>, to inside the
     * wrapper component.
     */
    private doRender()
    {
        const el = this.renderer.createElement(this.tagName);
        if (isPresent(this.nativeElement)) {
            this.renderer.appendChild(this.nativeElement, el);
        }

        // Loop through all the bindings and add them to the element.
        MapWrapper.iterable(this.bindings).forEach((v, k) =>
        {
            this.renderer.setStyle(el, k, v);
        });

        // Attach the component to this divElement.
        el.appendChild(this.childElement);
    }


}
