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
import {HyperlinkComponent} from '../../../src/widgets/hyperlink/hyperlink.component';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AribaCoreModule} from '@aribaui/core';
import {AWHyperlinkModule} from '../../../src/widgets/hyperlink/hyperlink.module';
import {AribaComponentsTestProviderModule} from '../../../src/ariba.component.provider.module';

describe('Component: Hyperlink', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestHyperlinkDefaultBehaviorComponent,
                TestHyperlinkBasicBehaviorComponent,
                TestHyperlinkActionBehaviorComponent
            ],
            imports: [
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWHyperlinkModule
            ]
        });

        TestBed.compileComponents();
    });

    it('should instantiate and have default values for value, hyperlink type, class, size,' +
        ' disabled, value, etc',
        () => {

            let fixtureWrapper = TestBed.createComponent(TestHyperlinkDefaultBehaviorComponent);
            fixtureWrapper.detectChanges();

            expect(fixtureWrapper.componentInstance.link.type).toEqual(undefined);
            expect(fixtureWrapper.componentInstance.link.size).toEqual('normal');
            expect(fixtureWrapper.componentInstance.link.disabled).toBeFalsy();
            expect(fixtureWrapper.componentInstance.link.target).toEqual(undefined);
            expect(fixtureWrapper.componentInstance.link.value).toEqual(undefined);
        });

    it('Basic behaviors for setting the type, size, name, value properties', fakeAsync(() => {

        let fixtureWrapper = TestBed.createComponent(TestHyperlinkBasicBehaviorComponent);
        fixtureWrapper.detectChanges();

        let el = fixtureWrapper.nativeElement.querySelector(
            'a.link');
        let className = el.className;
        fixtureWrapper.detectChanges();

        expect(className).toMatch('link-lg');

        expect(fixtureWrapper.componentInstance.link.type).toEqual(undefined);
        expect(fixtureWrapper.componentInstance.link.size).toEqual('large');
        expect(fixtureWrapper.componentInstance.link.disabled).toBeFalsy();
        expect(fixtureWrapper.componentInstance.link.target).toEqual(undefined);
        expect(fixtureWrapper.componentInstance.link.value).toEqual('my link');
    }));

    it('Action behavior triggered when clicking on link', fakeAsync(() => {

        let fixtureWrapper = TestBed.createComponent(TestHyperlinkActionBehaviorComponent);
        fixtureWrapper.detectChanges();

        let el = fixtureWrapper.nativeElement.querySelector('a.link');
        el.dispatchEvent(new Event('click'));

        fixtureWrapper.detectChanges();
        tick();
        fixtureWrapper.detectChanges();

        let value: any = fixtureWrapper.componentInstance.actionValue['value'];
        expect(value).toEqual('my link');
    }));

});


/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-hyperlink>Link</aw-hyperlink>
    `
})
    /* jshint ignore:end */
class TestHyperlinkDefaultBehaviorComponent {
    @ViewChild(HyperlinkComponent)
    link: HyperlinkComponent;

    constructor() {
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-hyperlink [size]="'large'" [disabled]="$false"
                      [value]="'my link'">Link
        </aw-hyperlink>
    `
})
    /* jshint ignore:end */
class TestHyperlinkBasicBehaviorComponent {
    @ViewChild(HyperlinkComponent)
    link: HyperlinkComponent;

    linkName: string = 'link';

    constructor() {

    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-hyperlink (action)="onClicked($event)" [value]="'my link'">link</aw-hyperlink>
    `
})
    /* jshint ignore:end */
class TestHyperlinkActionBehaviorComponent {
    @ViewChild(HyperlinkComponent)
    link: HyperlinkComponent;

    editable = true;
    actionValue: any;
    linkName: string = 'name';

    constructor() {

    }

    onClicked(event: any) {
        this.actionValue = event;
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-form-table>
            <aw-form-row [label]="'Details'" [name]="'Details'" [size]="'small'">
                <aw-hyperlink>Link</aw-hyperlink>
            </aw-form-row>
        </aw-form-table>
    `
})
    /* jshint ignore:end */
class TestDTContainerBehaviorComponent {
    @ViewChild(HyperlinkComponent)
    link: HyperlinkComponent;
}
