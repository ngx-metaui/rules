import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {WizardProgressComponent} from '../../widgets/wizard-progress/wizard-progress.component';

describe('WizardProgressComponent', () => {
  let component: WizardProgressComponent;
  let fixture: ComponentFixture<WizardProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardProgressComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the steps', () => {
    component.steps = [
      {title: 'step 1', current: false, complete: false},
      {title: 'step 2', current: false, complete: false},
      {title: 'step 3', current: false, complete: false}
    ];

    fixture.detectChanges();

    const steps = fixture.debugElement
      .queryAll(By.css('div.aw-step-progress > div.aw-step-progress__item'));

    expect(steps.length).toBe(3);
  });

  it('should set the first step to current by default', () => {
    component.steps = [
      {title: 'step 1', current: false, complete: false},
      {title: 'step 2', current: false, complete: false},
      {title: 'step 3', current: false, complete: false}
    ];

    fixture.detectChanges();

    component.ngOnInit();

    expect(component.steps[0].current).toBe(true);

  });

  it('should highlight the current step', () => {
    component.steps = [
      {title: 'step 1', current: false, complete: false},
      {title: 'step 2', current: true, complete: false},
      {title: 'step 3', current: false, complete: false}
    ];

    fixture.detectChanges();

    const steps = fixture.debugElement
      .queryAll(By.css('div.aw-step-progress > div.aw-step-progress__item'));

    expect(steps[1].nativeElement.classList.contains('aw-step-progress__item--is-active'))
      .toBe(true);

  });

  it('should allow moving to a completed step', () => {
    component.steps = [
      {title: 'step 1', current: false, complete: true},
      {title: 'step 2', current: true, complete: true},
      {title: 'step 3', current: false, complete: false}
    ];

    fixture.detectChanges();

    const step = fixture.debugElement
      .queryAll(By.css('div.aw-step-progress > div.aw-step-progress__item'));
    step[0].nativeElement.click();

    fixture.detectChanges();

    expect(component.steps[0].current).toBe(true);
    expect(component.steps[1].current).toBe(false);
  });

  it('should not allow moving to a uncompleted step', () => {
    component.steps = [
      {title: 'step 1', current: true, complete: false},
      {title: 'step 2', current: false, complete: false},
      {title: 'step 3', current: false, complete: false}
    ];

    fixture.detectChanges();

    const step = fixture.debugElement
      .queryAll(By.css('div.aw-step-progress > div.aw-step-progress__item'));
    step[1].nativeElement.click();

    fixture.detectChanges();

    expect(component.steps[0].current).toBe(true);
    expect(component.steps[1].current).toBe(false);
  });

  it('should show current step/total steps', () => {
    component.steps = [
      {title: 'step 1', current: true, complete: true},
      {title: 'step 2', current: false, complete: true},
      {title: 'step 3', current: false, complete: false}
    ];

    component.ngOnInit();

    fixture.detectChanges();

    const stepIndicator = fixture.debugElement.query(By.css('div.step-indicator'));

    expect(stepIndicator.nativeElement.innerText).toBe('1/3');
  });

  it('should update step indicator on moving to a step', () => {
    component.steps = [
      {title: 'step 1', current: true, complete: true},
      {title: 'step 2', current: false, complete: true},
      {title: 'step 3', current: false, complete: false}
    ];

    component.ngOnInit();

    fixture.detectChanges();

    const step = fixture.debugElement
      .queryAll(By.css('div.aw-step-progress > div.aw-step-progress__item'));

    const stepIndicator = fixture.debugElement.query(By.css('div.step-indicator'));

    step[1].nativeElement.click();

    fixture.detectChanges();

    expect(stepIndicator.nativeElement.innerText).toBe('2/3');
  });

  it('should emit on step changed', () => {
    component.steps = [
      {title: 'step 1', current: true, complete: true},
      {title: 'step 2', current: false, complete: true},
      {title: 'step 3', current: false, complete: false}
    ];

    component.ngOnInit();

    component.stepChanged.subscribe((evt: { current: number }) => {
      expect(evt.current).toBe(1);
    });

    fixture.detectChanges();

    const step = fixture.debugElement
      .queryAll(By.css('div.aw-step-progress > div.aw-step-progress__item'));

    step[1].nativeElement.click();

    fixture.detectChanges();
  });
});
