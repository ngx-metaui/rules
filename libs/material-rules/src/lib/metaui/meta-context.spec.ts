/**
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
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  NgModule,
  NgZone,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild
} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {Routes} from '@angular/router';
import {Entity, MetaUIRulesModule, UIMeta} from '@ngx-metaui/rules';
import {MaterialRulesModule} from '../material-rules.module';
import {
  ControlValueAccessor,
  FormGroupDirective,
  FormsModule,
  NgControl,
  NgForm,
  ReactiveFormsModule
} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {Platform} from '@angular/cdk/platform';
import {ErrorStateMatcher} from '@angular/material/core';
import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material/input';
import {AutofillMonitor} from '@angular/cdk/text-field';
import {Directionality} from '@angular/cdk/bidi';

/**
 * Need to have this test here as all the components for the metaui are defined here.
 */

const routes: Routes = [
  {
    path: '',
    redirectTo: '/test',
    pathMatch: 'full'
  }
];


describe('Meta Context Component', () => {
  let formInputs: any;

  beforeEach(() => {
    const start = Date.now();

    TestBed.configureTestingModule({
      declarations: [
        TestContainerEditComponent,
        TestContainerViewComponent,
        TestContainerViewDefferedComponent
      ],
      imports: [
        MetaUIRulesModule.forRoot(),
        MaterialRulesModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });


    TestBed.compileComponents();

    // console.log('Time :', (Date.now() - start));

  });


  it('It should render 1 input fields with pre-loaded values: Frank',
    fakeAsync(() => {

      const metaUI: UIMeta = TestBed.inject(UIMeta);
      metaUI.config.registerRule('UserTestDynClass',
        MyUserTestClassDynBindingOneFieldRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
      fixtureWrapper.detectChanges();
      tick();

      formInputs = fixtureWrapper.nativeElement.querySelectorAll('.form-field input');

      expect(formInputs.length).toBe(1);
      expect(formInputs[0].value).toEqual('Frank');

    }));

  it('It should render 4 input fields with pre-loaded values: Frank, Kolar, 1000,' +
    ' Some note' + ' about me.', fakeAsync(() => {

    const metaUI: UIMeta = TestBed.inject(UIMeta);
    metaUI.config.registerRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

    const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
    fixtureWrapper.detectChanges();
    tick();

    formInputs = fixtureWrapper.nativeElement.querySelectorAll('.form-field input');
    expect(formInputs[0].value).toEqual('Frank');
    expect(formInputs[1].value).toEqual('Kolar');
    expect(formInputs[2].value).toEqual('1000');
    expect(formInputs[3].value).toEqual('Some note about me.');
  }));


  it('It should render 4 String components - read only mode pre-loaded values: ' +
    'Frank, Kolar,' + ' 1000, Some note about me.',
    fakeAsync(() => {
      const metaUI: UIMeta = TestBed.inject(UIMeta);
      metaUI.config.registerRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerViewComponent);
      fixtureWrapper.detectChanges();

      fixtureWrapper.detectChanges();
      tick();

      formInputs = fixtureWrapper.nativeElement.querySelectorAll('.form-field input');

      expect(formInputs[0].value).toEqual('Frank');
      expect(formInputs[1].value).toEqual('Kolar');
      expect(formInputs[2].value).toEqual('1000');
      expect(formInputs[3].value).toEqual('Some note about me.');
    }));


  it('It should render 4 String components when object loaded is deffered using timer',
    fakeAsync(() => {
      const metaUI: UIMeta = TestBed.inject(UIMeta);
      metaUI.config.registerRule('UserTestDynClassRule', MyUserTestClassDynBindingRule);

      const fixtureWrapper = TestBed.createComponent(TestContainerViewDefferedComponent);
      fixtureWrapper.detectChanges();

      tick(50);
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick();
      fixtureWrapper.detectChanges();

      tick(50);
      fixtureWrapper.detectChanges();

      formInputs = fixtureWrapper.nativeElement.querySelectorAll('.form-field input');

      expect(formInputs[0].value).toEqual('Frank');
      expect(formInputs[1].value).toEqual('Kolar');
      expect(formInputs[2].value).toEqual('1000');
      expect(formInputs[3].value).toEqual('Some note about me.');
    }));


  it('It should render 1 input from module definition',
    fakeAsync(() => {

      const metaUI: UIMeta = TestBed.inject(UIMeta);
      metaUI.config.registerRule('UserTestDynClass', MyUserTestClassWithModule);
      metaUI.componentRegistry.registerType('CustomInputModule', CustomInputModule);

      const fixtureWrapper = TestBed.createComponent(TestContainerEditComponent);
      fixtureWrapper.detectChanges();
      tick();

      formInputs = fixtureWrapper.nativeElement.querySelectorAll('.custom-input');

      expect(formInputs.length).toBe(1);
      expect(formInputs[0].value).toEqual('Frank');

    }));
});


class UserTestDynClass implements Entity {
  firstName: string;
  lastName: string;
  age: number;
  bio: string;


  constructor(firstName: string, lastName: string, age: number, bio: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.bio = bio;
  }

  className(): string {
    return 'UserTestDynClass';
  }

  getTypes(): any {
    return {
      firstName: String,
      lastName: String,
      age: Number,
      bio: String
    };
  }

  identity(): string {
    return 'UserTestDynClass';
  }
}


@Component({
  selector: 'm-wrapper-comp',
  template: '<m-context [object]="user" operation="edit" layout="Inspect">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerEditComponent {
  user: UserTestDynClass = new UserTestDynClass('Frank', 'Kolar', 1000,
    'Some note about me.');
}

@Component({
  selector: 'm-wrapper-comp',
  template: '<m-context [object]="user" operation="view" layout="Inspect">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerViewComponent {
  user: UserTestDynClass = new UserTestDynClass('Frank', 'Kolar', 1000,
    'Some note about me.');
}


@Component({
  selector: 'm-wrapper-comp',
  template: '<m-context [object]="user" operation="view" layout="Inspect">' +
    '<m-render>' +
    '</m-render></m-context>'
})
class TestContainerViewDefferedComponent implements OnInit {

  user: UserTestDynClass;

  constructor() {
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.user = new UserTestDynClass('Frank', 'Kolar', 1000,
        'Some note about me.');

    }, 100);

  }

}


// @formatter:off
/* tslint:disable */
export const MyUserTestClassDynBindingRule =
  'class=UserTestDynClass {' +
  '             field=firstName#required {' +
  '                 label:\'My First Name\';' +
  '             }' +
  ' ' +
  '             field=lastName#required {' +
  '                 label:\'My Last Name\';' +
  '            }' +
  ' ' +
  '             field=age#required {' +
  '                 label:\'My Age\';' +
  '                valid: ${value > 19;};' +
  '           }' +
  ' ' +
  '             field=bio {' +
  '                 label:\'This is my biography\';' +
  '                 visible:${object.age > 18;};' +
  '             }' +
  ' ' +
  '             zNone =>*;' +
  '             zLeft => firstName => lastName => age => bio;' +
  '         }';


export const MyUserTestClassDynBindingOneFieldRule =
  'class=UserTestDynClass {' +
  '             field=firstName {' +
  '                 label:\'My First Name\';' +
  '             }' +
  ' ' +
  '             zNone => *;' +
  '             zLeft => firstName;' +
  '         }';

export const MyUserTestClassWithModule =
  'class=UserTestDynClass {' +
  '             field=firstName {' +
  '                 componentModule:\'CustomInputModule\';' +
  '                 label:\'My First Name\';' +
  '             }' +
  ' ' +
  '             zNone => *;' +
  '             zLeft => firstName;' +
  '         }';

// @formatter:on
/* tslint:disable */


@Component({
  selector: 'custom-input-field',
  template: `
    <h1>From Module</h1>
    <input
      #inputField
      matInput
      class="custom-input mat-input-element mat-form-field-autofill-control"
      [id]="id"
      [type]="type"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [readonly]="readonly"
      [required]="required"
      [(ngModel)]="value"
      (blur)="_focusChanged(false)"
      (focus)="_focusChanged(true)"
      (input)="onInput(inputField.value)"
      (compositionstart)="_compositionStart()"
      (compositionend)="_compositionEnd($event.target.value)"
    />

  `,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => TestCustomInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestCustomInputComponent implements MatFormFieldControl<any>, ControlValueAccessor, DoCheck {

  @Input()
  id: string;

  @Input()
  type: string = 'text';

  @Input()
  placeholder: string;

  @Input()
  readonly: boolean = false;

  @Input()
  required: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;

    this._cd.markForCheck();
    this.stateChanges.next();
  }

  private _errorState: boolean;


  @Input()
  get value(): any {
    return this._value;
  }

  set value(newValue: any) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.onChange(newValue);
      this._cd.markForCheck();
      this.stateChanges.next();
    }
  }

  /**
   * Reference to internal INPUT element having MatInput directive so we can set this reference
   * back to the MatInput
   */
  @ViewChild('inputField', {static: true})
  protected inputControl: ElementRef;


  private _disabled = false;
  private _value: string;
  /** @internal */
  private _composing = false;
  private _compositionMode = false;


  isRtl: boolean;


  readonly stateChanges = new Subject<void>();
  focused = false;
  autofilled = false;

  onChange = (_: any) => {
  };

  onTouched = () => {
  };


  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    protected _platform: Platform,
    private _cd: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() protected parentForm: NgForm,
    @Optional() protected parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() @Self() @Inject(MAT_INPUT_VALUE_ACCESSOR) private inputValueAccessor: any,
    private autofillMonitor: AutofillMonitor,
    private _renderer: Renderer2,
    private dir: Directionality,
    ngZone: NgZone) {


    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }


  /** @internal */
  get nativeElement(): any {
    return this.inputControl.nativeElement;
  }

  get empty(): boolean {
    return !this._elementRef.nativeElement.value && !this.value;
  }


  get errorState(): boolean {
    return this._errorState;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get controlType(): string {
    return 'mat-input';
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }


  ngOnInit(): void {
    this.isRtl = this.dir.value === 'rtl';
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }


  registerOnChange(fn: (_: any) => void): void {
    if (this.type === 'number') {
      this.onChange = (value) => {
        fn(value === '' ? null : parseFloat(value));
      };
    } else {
      this.onChange = fn;
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this.nativeElement, 'disabled', isDisabled);
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.stateChanges.next();
  }

  onInput(value: any): void {
    if (!this._compositionMode || (this._compositionMode && !this._composing)) {
      this.onChange(this.value);
      this.stateChanges.next();
    }
  }

  _focusChanged(isFocused: boolean): void {
    // Since we have custom ValueAccessor
    this.focused = isFocused;
    this.onTouched();
    this.stateChanges.next();

  }

  /** @internal */
  _compositionStart(): void {
    this._composing = true;
  }

  /** @internal */
  _compositionEnd(value: any): void {
    this._composing = false;
    this.onChange(value);
  }

  private updateErrorState() {

  }


}


@NgModule({
  declarations: [
    TestCustomInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: []
})
export class CustomInputModule {

  constructor() {
  }
}
