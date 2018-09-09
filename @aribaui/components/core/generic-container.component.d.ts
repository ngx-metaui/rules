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
import { DoCheck, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
export declare class GenericContainerComponent implements OnInit, DoCheck {
    private renderer;
    private element;
    /**
     * Default tagName if none is specified inside bindings.
     *
     */
    static readonly DefaultTagName: string;
    /**
     * Bindings to be added as attributes to the tagName element.
     */
    bindings: Map<string, any>;
    /**
     * Element to be created that wraps it's content.
     */
    tagName: string;
    /**
     * Native root element. Points to <aw-generic-container>
     */
    private nativeElement;
    private childElement;
    /**
     * param renderer - Renderer is used to create 'tagName' element.
     */
    constructor(renderer: Renderer2, element: ElementRef);
    /**
     * During the initialization, verify that at least one input has been set.
     */
    ngOnInit(): void;
    ngDoCheck(): void;
    /**
     * After content has been initialized. Create the tagName element. Apply all the bindings on to
     * the element as attribute. Finally, move the child element, <ng-content>, to inside the
     * wrapper component.
     */
    private doRender();
}
