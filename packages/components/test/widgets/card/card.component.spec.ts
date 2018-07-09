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
 */
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AribaCoreModule} from '@aribaui/core';
import {Component, ViewChild} from '@angular/core';
import {AWCardModule} from '../../../src/widgets/card/card.module';
import {CardComponent} from '../../../src/widgets/card/card.component';
import {AWButtonModule} from '../../../src/widgets/button/button.module';
import {AribaComponentsTestProviderModule} from '../../../src/ariba.component.provider.module';

describe('component: Card', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestCardSelectActionBehaviorComponent,
                TestCardHideActionButtonComponent,
                TestCardShowHoverComponent,
                TestDefaultBehaviorForCardComponent,
                TestNoActionEventWhenNonSelectableComponent,
                TestCardCustomBodyComponent

            ],
            imports: [
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWCardModule,
                AWButtonModule
            ]
        });

        TestBed.compileComponents();
    });


    it('inits card with correctly initialized state so that its selectable by default, has no' +
        ' action', () => {
        let fixtureWrapper = TestBed.createComponent(TestDefaultBehaviorForCardComponent);
        fixtureWrapper.detectChanges();

        let cardCmp = fixtureWrapper.componentInstance.cardComponent;

        expect(cardCmp.selectable).toBeTruthy();
        expect(cardCmp.hasAction).toBeFalsy();
        expect(cardCmp.hasHover).toBeFalsy();


    });


    it('should unselect the card when clicked on icon, default is selected so we expect' +
        'unselected', fakeAsync(() => {
        let fixtureWrapper = TestBed.createComponent(TestCardSelectActionBehaviorComponent);
        fixtureWrapper.detectChanges();


        let el = fixtureWrapper.nativeElement.querySelector('.w-card-ztitle');
        el.dispatchEvent(new Event('click'));

        fixtureWrapper.detectChanges();
        tick();
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.actionValue).toEqual('unselected');
    }));

    it('should select the card when clicked on icon', fakeAsync(() => {
        let fixtureWrapper = TestBed.createComponent(TestCardSelectActionBehaviorComponent);
        fixtureWrapper.detectChanges();

        let el = fixtureWrapper.nativeElement.querySelector('.w-card-ztitle');
        el.click();

        fixtureWrapper.detectChanges();
        tick();

        fixtureWrapper.detectChanges();
        tick();

        el.click();

        fixtureWrapper.detectChanges();
        tick();

        fixtureWrapper.detectChanges();
        tick();

        expect(fixtureWrapper.componentInstance.actionValue).toEqual('selected');
    }));

    it('should set the card width to 200px', () => {
        let fixtureWrapper = TestBed.createComponent(TestCardSelectActionBehaviorComponent);
        let component = fixtureWrapper.componentInstance;
        fixtureWrapper.detectChanges();

        let el = fixtureWrapper.nativeElement.querySelector('.w-card');
        expect(el.style.width).toEqual('202px');
    });

    it('should set the card height to 154px', () => {
        let fixtureWrapper = TestBed.createComponent(TestCardSelectActionBehaviorComponent);
        fixtureWrapper.detectChanges();

        let el = fixtureWrapper.nativeElement.querySelector('.w-card');

        let card = fixtureWrapper.nativeElement.querySelector('.w-card-actions');
        expect(el.style.height).toEqual('154px');
    });


    it('should not render action zone when [hasAction] binding is false', () => {
        let fixtureWrapper = TestBed.createComponent(TestCardHideActionButtonComponent);
        fixtureWrapper.componentInstance.showAction = false;
        fixtureWrapper.detectChanges();
        fixtureWrapper.detectChanges();

        let action = fixtureWrapper.nativeElement.querySelector('.icon-question-mark');
        expect(action).toBeNull();
    });


    it('should render action zone with our custom icon when [hasAction] binding is true', () => {
        let fixtureWrapper = TestBed.createComponent(TestCardHideActionButtonComponent);
        fixtureWrapper.componentInstance.showAction = true;
        fixtureWrapper.detectChanges();
        fixtureWrapper.detectChanges();

        let action = fixtureWrapper.nativeElement.querySelector('.icon-question-mark');
        expect(action).toBeDefined();
    });


    it('should render hover overlay when we mouse enter to the card', fakeAsync(() => {
        let fixtureWrapper = TestBed.createComponent(TestCardShowHoverComponent);
        fixtureWrapper.detectChanges();

        let card = fixtureWrapper.nativeElement.querySelector('.w-card');
        card.dispatchEvent(new Event('mouseenter'));

        tick();
        fixtureWrapper.detectChanges();
        tick();
        fixtureWrapper.detectChanges();

        let hoverDiv = fixtureWrapper.nativeElement.querySelector('.u-card-hover');
        expect(hoverDiv.style.opacity).toBe('0.5');
    }));

    it('should trigger hoverAction, when hover overlay is displayed and we click on it',
        fakeAsync(() => {
            let fixtureWrapper = TestBed.createComponent(TestCardShowHoverComponent);
            fixtureWrapper.detectChanges();

            let card = fixtureWrapper.nativeElement.querySelector('.w-card');
            card.dispatchEvent(new Event('mouseenter'));

            tick();
            fixtureWrapper.detectChanges();
            tick();
            fixtureWrapper.detectChanges();

            let hoverCard = fixtureWrapper.nativeElement.querySelector('.u-card-hover');

            hoverCard.click();

            fixtureWrapper.detectChanges();
            tick();
            fixtureWrapper.detectChanges();
            tick();

            expect(fixtureWrapper.componentInstance.didHover).toBeTruthy();
        }));

    it('can render custom content with button when action icon is clicked',
        fakeAsync(() => {
            let fixtureWrapper = TestBed.createComponent(TestCardCustomBodyComponent);
            fixtureWrapper.detectChanges();

            let card = fixtureWrapper.nativeElement.querySelector('.icon-question-mark');

            let body = fixtureWrapper.nativeElement.querySelector('.card-actions button');
            expect(body).toBeNull();

            card.click();

            tick();
            fixtureWrapper.detectChanges();

            body = fixtureWrapper.nativeElement.querySelector('.w-card-user-cnt' +
                ' .card-actions button');
            expect(body).not.toBeNull();
        }));

    it('can hide custom content when component property [useBodyTemplate] is set to False',
        fakeAsync(() => {
            let fixtureWrapper = TestBed.createComponent(TestCardCustomBodyComponent);
            fixtureWrapper.detectChanges();
            fixtureWrapper.componentInstance.card.useBodyTemplate = true;

            tick();
            fixtureWrapper.detectChanges();

            let button = fixtureWrapper.nativeElement.querySelector('.card-actions button');
            button.click();

            tick();
            fixtureWrapper.detectChanges();

            let body = fixtureWrapper.nativeElement.querySelector('.w-card-user-cnt' +
                ' .card-actions button');
            expect(body).toBeNull();
        }));
});


/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-card [selectable]="false" (onAction)="onAction($event)">
            <aw-card-title>
                Title Text
            </aw-card-title>
        </aw-card>
    `
})
    /* jshint ignore:end */
class TestNoActionEventWhenNonSelectableComponent {
    @ViewChild(CardComponent)
    cardComponent: CardComponent;

    wasClicked = false;

    onAction(event: any): void {
        this.wasClicked = true;
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-card>
            <aw-card-title>
                Title Text
            </aw-card-title>
        </aw-card>
    `
})
    /* jshint ignore:end */
class TestDefaultBehaviorForCardComponent {
    @ViewChild(CardComponent)
    cardComponent: CardComponent;


}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-card (onSelect)="selectAction($event)">
            <aw-card-title>
                Title Text
            </aw-card-title>
        </aw-card>
    `
})
    /* jshint ignore:end */
class TestCardSelectActionBehaviorComponent {
    actionValue: string;


    selectAction(event: any) {
        this.actionValue = (event) ? 'selected' : 'unselected';
    }

}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-card [hasAction]="showAction" [actionIcon]="'icon-question-mark'"
                 [selectable]="false">
            <aw-card-title>
                Title Text
            </aw-card-title>
        </aw-card>
    `
})
    /* jshint ignore:end */
class TestCardHideActionButtonComponent {

    showAction = true;

    constructor() {

    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-card [hasHover]="true" [hasAction]="false"
                 (onHoverAction)="hoverSelectAction($event)">
            <aw-card-title>
                Title Text
            </aw-card-title>
        </aw-card>
    `
})
    /* jshint ignore:end */
class TestCardShowHoverComponent {
    didHover = false;

    constructor() {

    }

    hoverSelectAction(event: any) {
        this.didHover = true;
    }
}


/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-card #withUserTempl [width]="'202px'" [height]="'154px'"
                 [hasAction]="true"
                 [selected]="false"
                 [actionIcon]="'icon-question-mark'"
                 (onAction)="onAction($event)"
                 [selectable]="false">
            <aw-card-title [align]="'bottom-left'">
                Some Title
            </aw-card-title>

            <ng-template #body>
                <div class="card-actions ui-g ui-fluid">
                    <div class="ui-g-12">
                        <aw-button (action)="withUserTempl.useBodyTemplate = false">
                            Save
                        </aw-button>
                    </div>
                </div>
            </ng-template>
        </aw-card>
    `
})
    /* jshint ignore:end */
class TestCardCustomBodyComponent {
    @ViewChild(CardComponent)
    card: CardComponent;

    constructor() {

    }

    onAction(event: any) {
        this.card.useBodyTemplate = true;
    }
}
