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
import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {ConfirmationComponent} from '../../../src/widgets/confirmation/confirmation.component';
import {AribaCoreModule, isPresent, readGlobalParam} from '@aribaui/core';
import {ModalService} from '../../../src/core/modal-service/modal.service';
import {AWConfirmationModule} from '../../../src/widgets/confirmation/confirmation.module';
import {AWButtonModule} from '../../../src/widgets/button/button.module';
import {Environment} from '@aribaui/core';
import {AWCoreComponentModule} from '../../../src/core/core.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AribaComponentsTestProviderModule} from '../../../src/ariba.component.provider.module';


describe('Component: confirmation', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TestConfirmationDefaultComponent,
                TestConfirmationServiceBehaviorComponent,
                TestCustomConfirmationBehaviorComponent,
                MyConfirmationComponent
            ],
            imports: [
                AribaCoreModule.forRoot({'i18n.enabled': false, 'env.test': true}),
                AribaComponentsTestProviderModule.forRoot(),
                AWConfirmationModule,
                NoopAnimationsModule,
                AWCoreComponentModule,
                AWButtonModule
            ]
        });

        TestBed.compileComponents();
    });

    it('should instantiate confirmation component and values for title and body', () =>
    {
        let fixtureWrapper = TestBed.createComponent(TestConfirmationDefaultComponent);
        fixtureWrapper.detectChanges();

        expect(fixtureWrapper.componentInstance.confirmation.title).toEqual('Confirmation');
        expect(fixtureWrapper.componentInstance.confirmation.visible).toBe(false);
        expect(fixtureWrapper.componentInstance.confirmation.height).toEqual('auto');
        expect(fixtureWrapper.componentInstance.confirmation.closable).toEqual(false);
    });

    it('should display confirmation component as popup', fakeAsync(() =>
    {

        let fixtureWrapper = TestBed.createComponent(TestConfirmationDefaultComponent);
        fixtureWrapper.detectChanges();

        // Find the open button
        let button = fixtureWrapper.nativeElement.querySelector('button');
        button.click();

        tick();
        fixtureWrapper.detectChanges();

        tick();
        fixtureWrapper.detectChanges();

        // Verify that the confirmation has been opened.
        let confirmBtn = fixtureWrapper.nativeElement.querySelector('button[name="confirm"]');
        expect(confirmBtn).toBeDefined();

        // click on confirm
        confirmBtn.click();

        tick();
        fixtureWrapper.detectChanges();

        tick();
        fixtureWrapper.detectChanges();

        // verify that the confirm action has been clicked.
        expect(fixtureWrapper.componentInstance.action).toEqual('confirm');

        flushMicrotasks();
        flushPendingTimers();
    }));

    it('should close confirmation when default component closed button is clicked.',
        fakeAsync(() =>
        {

            let fixtureWrapper = TestBed.createComponent(TestConfirmationServiceBehaviorComponent);
            fixtureWrapper.detectChanges();

            let button = fixtureWrapper.nativeElement.querySelector('button');
            button.dispatchEvent(new Event('click'));

            tick();
            fixtureWrapper.detectChanges();

            // Verify that the confirmation is open.
            expect(fixtureWrapper.componentInstance.confirmation.title).toEqual('Confirmation');
            expect(fixtureWrapper.componentInstance.confirmation.body).toEqual('Confirmation Body');

            // Find the close button, click it to close the popup.
            let cancelBtn = fixtureWrapper.nativeElement.querySelector('button[name="cancel"]');
            cancelBtn.dispatchEvent(new Event('click'));

            tick();
            fixtureWrapper.detectChanges();

            // Verify that the confirmation is canceled.
            expect(fixtureWrapper.componentInstance.action).toEqual('cancel');

            flushMicrotasks();
            flushPendingTimers();

        }));

    it('should display popup custom confirmation component', fakeAsync(() =>
    {
        // https://github.com/angular/angular/issues/10760
        // Work around because
        // TestBed.configureTestingModule
        // doesn't have
        // entryComponents. That is
        // needed to dynamically
        // create components.
        TestBed.overrideModule(AWConfirmationModule, {
            set: {
                entryComponents: [MyConfirmationComponent],
            },
        });

        let fixtureWrapper = TestBed.createComponent(TestCustomConfirmationBehaviorComponent);
        fixtureWrapper.detectChanges();

        openDialog(fixtureWrapper);

        let templates = fixtureWrapper.nativeElement.querySelectorAll('.icon-alert');
        expect(templates.length).toEqual(1);

        flushMicrotasks();
        flushPendingTimers();
    }));

    it('should close popup custom confirmation component', fakeAsync(() =>
    {
        // https://github.com/angular/angular/issues/10760
        // Work around because
        // TestBed.configureTestingModule
        // doesn't have entryComponents.
        // That is needed to dynamically
        // create components.
        TestBed.overrideModule(
            AWConfirmationModule, {
                set: {
                    entryComponents: [MyConfirmationComponent],
                },
            });

        TestBed.compileComponents();
        let fixtureWrapper = TestBed.createComponent(
            TestCustomConfirmationBehaviorComponent);
        fixtureWrapper.detectChanges();

        // Find the open button
        let button = fixtureWrapper.nativeElement.querySelector('button');
        button.dispatchEvent(new Event('click'));

        tick();
        fixtureWrapper.detectChanges();

        // Find the close button, click it to close the popup.
        let cancelBtn = fixtureWrapper.nativeElement.querySelector('button[name="cancel"]');
        cancelBtn.dispatchEvent(new Event('click'));

        tick();
        fixtureWrapper.detectChanges();

        // Verify that the confirmation is canceled.
        expect(fixtureWrapper.componentInstance.confirmation.action).toEqual('cancel');

        flushMicrotasks();
        flushPendingTimers();
    }));
});


function openDialog(fixture: any)
{
    // Find the open button
    let button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    tick();
    fixture.detectChanges();

    tick();
    fixture.detectChanges();

}



/**
 * This is workaround to get rid of XX timer(s) still in the queue, as Autocomplete from PrimeNg
 * is using Timers and they are not cleared before tests finishes I get this error
 */
function flushPendingTimers()
{

    let zone: any = readGlobalParam('Zone');

    if (isPresent(zone) &&
        isPresent(zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec))
    {

        zone['ProxyZoneSpec'].get().properties.FakeAsyncTestZoneSpec.pendingTimers = [];
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-confirmation [title]="'Confirmation'" [(visible)]="display"
                         (onConfirm)="confirmAction()" (onCancel)="cancelAction()">
            Are you sure you want to delete your hard drive?
        </aw-confirmation>

        <aw-button name="'open-button'" (action)="openConfirmation()"></aw-button>
    `
})
    /* jshint ignore:end */
    /**
     * Class that will only draw a confirmation.
     */
class TestConfirmationDefaultComponent
{
    @ViewChild(ConfirmationComponent)
    confirmation: ConfirmationComponent;
    display: boolean = false;
    action: string;

    constructor()
    {
    }

    openConfirmation()
    {
        this.display = true;
    }

    confirmAction()
    {
        this.action = 'confirm';
    }

    cancelAction()
    {
        this.action = 'cancel';
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `
        <aw-modal></aw-modal>
        <aw-button name="'open-button'" (action)="openConfirmation()"></aw-button>
    `
})
    /* jshint ignore:end */
class TestConfirmationServiceBehaviorComponent
{
    confirmation: ConfirmationComponent;

    display: boolean = true;

    action: string;

    constructor(private modalService: ModalService)
    {
    }

    openConfirmation()
    {
        this.confirmation = this.modalService.open<ConfirmationComponent>(ConfirmationComponent, {
            title: 'Confirmation',
            body: 'Confirmation Body',
            onConfirm: () =>
            {

                this.confirmAction();
            },

            onCancel: () =>
            {
                this.cancelAction();
            }

        }).instance;
    }

    confirmAction()
    {
        this.action = 'confirm';
    }

    cancelAction()
    {
        this.action = 'cancel';
    }
}

/* jshint ignore:start */
@Component({
    selector: 'wrapper-comp',
    template: `

        <h3>{{confirmation?.visible}}</h3>
        <aw-modal></aw-modal>
        <aw-button name="'open-button'" (action)="openConfirmation()"></aw-button>
    `
})
    /* jshint ignore:end */
class TestCustomConfirmationBehaviorComponent
{
    confirmation: MyConfirmationComponent;

    action: string;

    constructor(private modalService: ModalService)
    {
    }

    openConfirmation()
    {
        this.confirmation = this.modalService
            .open<MyConfirmationComponent>(MyConfirmationComponent, {}).instance;
    }
}

@Component({
    selector: 'aw-myconfirmation',
    template: `

        <aw-confirmation [title]="'Custom Confirmation'" [(visible)]="visible"
                         (onConfirm)="confirmAction()" (onCancel)="cancelAction()">
            <i class="sap-icon icon-alert"></i>

            Are you sure you want to delete your hard drive?
        </aw-confirmation>

        <aw-button name="'open-button'" (action)="openConfirmation()"></aw-button>
    `
})
class MyConfirmationComponent extends ConfirmationComponent
{
    display: boolean = false;

    action: string;

    constructor(public env: Environment)
    {
        super(env);
    }

    confirmAction()
    {
        this.action = 'confirm';
    }

    cancelAction()
    {
        this.action = 'cancel';
    }
}

