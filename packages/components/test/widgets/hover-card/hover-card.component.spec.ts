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
import {Component, ViewChild} from '@angular/core';
import {discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AribaCoreModule} from '@aribaui/core';
import {HoverCardComponent} from '../../../src/widgets/hover-card/hover-card.component';
import {AWHoverCardModule} from '../../../src/widgets/hover-card/hover-card.module';
import {AWStringFieldModule} from '../../../src/widgets/string/string.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AribaComponentsTestProviderModule} from '../../../src/ariba.component.provider.module';


describe('Component: Hover card', () => {


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestHCSimpleComponent
            ],
            imports: [
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWHoverCardModule,
                AWStringFieldModule,
                NoopAnimationsModule

            ]
        });

        TestBed.compileComponents();

    });


    it('must throw an Error if link Title is not used', () => {
        let fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
        fixtureWrapper.componentInstance.title = null;

        expect(() => fixtureWrapper.detectChanges())
            .toThrowError('You must provide [linkTitle] binding !');


    });


    describe('with forceClose Enable', () => {
        it('can render a title with action icon', () => {
            let fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
            fixtureWrapper.detectChanges();

            let hcTitle = fixtureWrapper.nativeElement
                .querySelector('.w-hc-title .w-string-field');


            let hcIcon = fixtureWrapper.nativeElement
                .querySelector('.w-hc-title .sap-icon');

            expect(hcTitle.textContent).toBe('testTitle');
            expect(hcIcon).toBeDefined();
            expect(hcIcon).not.toBeNull();

        });


        it('displays a Card on hover with content having close icon', () => {
            let fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
            fixtureWrapper.detectChanges();

            let hcIcon = fixtureWrapper.nativeElement.querySelector('.w-hc-title .sap-icon');

            hcIcon.dispatchEvent(newEvent('mouseover'));

            fixtureWrapper.detectChanges();

            let cardPanel = document.querySelector('.ui-overlaypanel');
            let contentPanel = document
                .querySelector('.ui-overlaypanel-content .my-test-content');
            let closeIcon = document.querySelector('.ui-overlaypanel-close');

            let computedStyles = getComputedStyle(cardPanel);

            expect(computedStyles.display).toBe('block');
            expect(contentPanel.textContent.trim()).toBe('AAAA');
            expect(closeIcon).toBeDefined();
            expect(closeIcon).not.toBeNull();
        });


        it('must close when clicked on close icon', fakeAsync(() => {
            let fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
            fixtureWrapper.detectChanges();

            let hcIcon = fixtureWrapper.nativeElement.querySelector('.w-hc-title .sap-icon');
            hcIcon.dispatchEvent(newEvent('mouseover'));
            fixtureWrapper.detectChanges();

            let cardPanel = document.querySelector('.ui-overlaypanel');
            let closeIcon = document.querySelector('.ui-overlaypanel-close');

            let computedStyles = getComputedStyle(cardPanel);
            expect(computedStyles.display).toBe('block');
            expect(cardPanel.textContent.trim()).toBe('AAAA');

            (<any>closeIcon).click();

            tick(100);
            fixtureWrapper.detectChanges();

            cardPanel = document.querySelector('.ui-overlaypanel');
            computedStyles = getComputedStyle(cardPanel);

            expect(computedStyles.display).toBe('none');

            discardPeriodicTasks();

        }));
    });

    describe('with forceClose disable', () => {
        it('can render a title with action icon', () => {
            let fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
            fixtureWrapper.componentInstance.forceClose = false;
            fixtureWrapper.detectChanges();

            let hcTitle = fixtureWrapper.nativeElement
                .querySelector('.w-hc-title .w-string-field');


            let hcIcon = fixtureWrapper.nativeElement
                .querySelector('.w-hc-title .sap-icon');

            expect(hcTitle.textContent).toBe('testTitle');
            expect(hcIcon).toBeDefined();
            expect(hcIcon).not.toBeNull();
        });


        it('displays a Card container with content not having close icon', () => {

            let fixtureWrapper = TestBed.createComponent(TestHCSimpleComponent);
            fixtureWrapper.componentInstance.forceClose = false;
            fixtureWrapper.detectChanges();

            let hcIcon = fixtureWrapper.nativeElement.querySelector('.w-hc-title .sap-icon');

            hcIcon.dispatchEvent(newEvent('mouseover'));
            fixtureWrapper.detectChanges();

            let closeIcon = fixtureWrapper.nativeElement.querySelector('.ui-overlaypanel-close');
            expect(closeIcon).toBeNull();
        });
    });


});


@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-hover-card [linkTitle]="title" [forceClose]="forceClose">
            <span class="my-test-content">AAAA</span>
        </aw-hover-card>

        <button type="button" class="close-card"></button>
    `
})
class TestHCSimpleComponent {
    @ViewChild(HoverCardComponent)
    hover: HoverCardComponent;

    title: string = 'testTitle';
    forceClose: boolean = true;
}


export function newEvent(eventName: string) {
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, false, false, null);
    return evt;
}
