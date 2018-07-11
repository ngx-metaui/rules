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
import {TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {AribaCoreModule} from '@aribaui/core';
import {
    ScrollableContainerComponent
} from '../../../src/widgets/scrollable-container/scrollable-container.component';
import {
    AWScrollableContainerModule
} from '../../../src/widgets/scrollable-container/scrollable-container.module';
import {AribaComponentsTestProviderModule} from '../../../src/ariba.component.provider.module';

describe('Component: Scrollable Container', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestScrollableDefaultComponent,
                TestScrollableWithDirectionComponent,
                TestScrollableWithWrapperDivComponent
            ],
            imports: [
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWScrollableContainerModule

            ]
        });

        TestBed.compileComponents();
    });


    describe('Horizontal scrolling', () => {
        it('should render horizontally scrolled items of no options is passed', () => {
            let fixtureWrapper = TestBed.createComponent(TestScrollableDefaultComponent);
            fixtureWrapper.detectChanges();


            let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');

            expect(container.classList).toContain('u-scrollable-fh');
            expect(container.classList).toContain('u-scrollable-al');
            expect(container.classList).toContain('u-scrollable-al');

            expect(getComputedStyle(container).overflowX).toEqual('auto');
            expect(getComputedStyle(container).overflowY).toEqual('hidden');

        });


        it('should render horizontally scrolled items if direction is horizontal', () => {
            let fixtureWrapper = TestBed.createComponent(TestScrollableWithDirectionComponent);
            fixtureWrapper.detectChanges();


            let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');

            expect(container.classList).toContain('u-scrollable-fh');
            expect(container.classList).toContain('u-scrollable-al');

            expect(getComputedStyle(container).overflowX).toEqual('auto');
            expect(getComputedStyle(container).overflowY).toEqual('hidden');

        });


        it('should render horizontal container with default width set to 100%', () => {
            let fixtureWrapper = TestBed.createComponent(TestScrollableDefaultComponent);
            fixtureWrapper.detectChanges();

            let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');

            expect(container.style.width).toEqual('100%');
        });


        it('should render horizontal container with width set to 300px', () => {
            let fixtureWrapper = TestBed.createComponent(TestScrollableDefaultComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.scrollableWidth = '300px';
            fixtureWrapper.detectChanges();

            let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');
            expect(container.style.width).toEqual('300px');
        });


        // disabling this test as for some reason it does not work in selenium grid. the height
        // is 85px instead of 100px
        xit('should render horizontal container wrapped by parent div that set ' +
            '300px x 100px and' +
            ' container should fit into this parent div.', () => {
            let fixtureWrapper = TestBed.createComponent(TestScrollableWithWrapperDivComponent);
            fixtureWrapper.detectChanges();


            let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');


            let computedStyle = getComputedStyle(container);


            expect(container.classList).toContain('u-scrollable-fh');
            expect(getComputedStyle(container).width).toEqual('300px');


            expect(getComputedStyle(container).height).toEqual('100px');
        });

    });


    describe('Vertical scrolling', () => {
        it('should render vertically scrolled items when direction is vertical', () => {


            let fixtureWrapper = TestBed.createComponent(TestScrollableWithDirectionComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.direction = 'vertical';
            fixtureWrapper.detectChanges();

            let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');

            expect(container.classList).toContain('u-scrollable-fv');
            expect(container.classList).toContain('u-scrollable-al');

            expect(getComputedStyle(container).overflowX).toEqual('hidden');
            expect(getComputedStyle(container).overflowY).toEqual('auto');

        });


        it('should render horizontal container with height set to 300px', () => {
            let fixtureWrapper = TestBed.createComponent(TestScrollableWithDirectionComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.direction = 'vertical';
            fixtureWrapper.componentInstance.height = ' 300px';
            fixtureWrapper.detectChanges();

            let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');

            expect(container.classList).toContain('u-scrollable-fv');
            expect(getComputedStyle(container).height).toEqual('300px');
        });


        it('should render vertical container wrapped by parent div that set 300px x 100px and' +
            ' container should fit into this parent div.', () => {

            let fixtureWrapper = TestBed.createComponent(TestScrollableWithWrapperDivComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.direction = 'vertical';
            fixtureWrapper.detectChanges();

            let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');

            expect(container.classList).toContain('u-scrollable-fv');
            expect(getComputedStyle(container).height).toEqual('100px');

        });

    });


    describe('Scrolling disabled - wrapping ', () => {
        it('should render items and wrapped so no scroll bar is visible ', () => {
            let fixtureWrapper = TestBed.createComponent(TestScrollableWithDirectionComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.direction = 'none';
            fixtureWrapper.detectChanges();

            checkDirectionNone(fixtureWrapper, 'u-scrollable-al');
        });


        it('should render items and wrapped and aligned to right when "alignment" is set to ' +
            '"right" ', () => {

            let fixtureWrapper = TestBed.createComponent(TestScrollableWithDirectionComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.direction = 'none';
            fixtureWrapper.componentInstance.align = 'right';
            fixtureWrapper.detectChanges();

            checkDirectionNone(fixtureWrapper, 'u-scrollable-ar');
        });


        it('should render items and wrapped and center its content when "alignment" is set' +
            ' to "center" ',
            () => {
                let fixtureWrapper = TestBed.createComponent(TestScrollableWithDirectionComponent);
                fixtureWrapper.detectChanges();

                fixtureWrapper.componentInstance.direction = 'none';
                fixtureWrapper.componentInstance.align = 'center';
                fixtureWrapper.detectChanges();

                checkDirectionNone(fixtureWrapper, 'u-scrollable-ac');
            });


        it('should render items and wrapped and justify its content when "alignment" is set' +
            ' to "justify" ', () => {
            let fixtureWrapper = TestBed.createComponent(TestScrollableWithDirectionComponent);
            fixtureWrapper.detectChanges();

            fixtureWrapper.componentInstance.direction = 'none';
            fixtureWrapper.componentInstance.align = 'justify';
            fixtureWrapper.detectChanges();

            checkDirectionNone(fixtureWrapper, 'u-scrollable-aj');

        });

    });

});


function checkDirectionNone(fixtureWrapper: any, alignClass: string) {

    let container = fixtureWrapper.nativeElement.querySelector('.w-scrollable ');

    expect(container.classList).toContain('u-scrollable-fn');
    expect(container.classList).toContain(alignClass);
    let computedStyle = getComputedStyle(container);
    let style = computedStyle.flexFlow !== '' ? computedStyle.flexFlow
        : computedStyle.flexDirection + ' ' + computedStyle.flexWrap;
    expect(style).toEqual('row wrap');

}


@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-scrollable [width]="scrollableWidth">
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
        </aw-scrollable>
    `
})
class TestScrollableDefaultComponent {
    @ViewChild(ScrollableContainerComponent)
    container: ScrollableContainerComponent;

    scrollableWidth: string = null;


}


@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-scrollable [direction]="direction" [height]="height" [alignment]="align">
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
            <div style="width: 200px;height: 300px"> Card 1</div>
        </aw-scrollable>
    `
})
class TestScrollableWithDirectionComponent {
    @ViewChild(ScrollableContainerComponent)
    container: ScrollableContainerComponent;

    direction = 'horizontal';
    align = 'left';

    height: string;

}


@Component({
    selector: 'wrapper-comp',
    template: `
        <div style="width: 300px; height: 100px">
            <aw-scrollable [direction]="direction">
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
                <div style="width: 200px;height: 300px"> Card 1</div>
            </aw-scrollable>
        </div>
    `
})
class TestScrollableWithWrapperDivComponent {
    @ViewChild(ScrollableContainerComponent)
    container: ScrollableContainerComponent;

    direction = 'horizontal';

}
