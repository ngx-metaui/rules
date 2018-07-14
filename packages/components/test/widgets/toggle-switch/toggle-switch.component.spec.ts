import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Environment} from '@aribaui/core';

import {ToggleSwitchComponent} from '../../../src/widgets/toggle-switch/toggle-switch.component';

describe('ToggleSwitchComponent', () =>
{
    let component: ToggleSwitchComponent;
    let fixture: ComponentFixture<ToggleSwitchComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [ToggleSwitchComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                Environment
            ]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ToggleSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should show the label', () =>
    {
        component.labelText = 'New Title';
        fixture.detectChanges();
        let test = fixture.debugElement.query(By.css('label.w-toggle__label'));

        expect(test.nativeElement.textContent.toString().trim()).toBe('New Title');
    });

    it('should be switched off by default', () =>
    {
        fixture.detectChanges();
        let test = fixture.debugElement.query(By.css('div.slider__button'));

        expect(test.nativeElement.classList.contains('on')).toBe(false);
    });

    it('should toggle the value to true', () =>
    {
        component.model = false;

        fixture.detectChanges();
        let test = fixture.debugElement.query(By.css('div.slider'));

        test.nativeElement.click();
        fixture.detectChanges();

        let sliderSwitch = fixture.debugElement.query(By.css('div.slider__button'));

        expect(component.model).toBe(true);
        expect(sliderSwitch.nativeElement.classList.contains('slider__button--is-active'))
            .toBe(true);
    });

    it('should toggle the value to false', () =>
    {
        component.model = true;

        fixture.detectChanges();
        let test = fixture.debugElement.query(By.css('div.slider'));

        test.nativeElement.click();
        fixture.detectChanges();

        let sliderSwitch = fixture.debugElement.query(By.css('div.slider__button'));

        expect(component.model).toBe(false);
        expect(sliderSwitch.nativeElement.classList.contains('slider__button--is-active'))
            .toBe(false);
    });
});
