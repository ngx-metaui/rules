/**
 * @license
 * Copyright F. Kolar
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Host,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Environment, KeyBindings, MetaBaseComponent, MetaContextComponent} from '@ngx-metaui/rules';
import {FormField, FormFieldComponent} from '../../../ui/form/form-field/form-field.component';


/**
 *
 * Used by form group in order to render individual form fields that are instantiated
 * programmatically using MetaInclude directive. What is instantiated is defined inside OSS file.
 *ss
 *
 */
@Component({
  selector: 'm-form-field',
  templateUrl: 'meta-form-field.component.html',
  providers: [

    {provide: FormFieldComponent, useExisting: forwardRef(() => MetaFormField)}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaFormField extends MetaBaseComponent implements FormField, AfterContentInit {

  @Input()
  field: string;


  @Input()
  zone: string;

  @Input()
  rank: number;

  /**
   * Cached validators
   */
  validators: ValidatorFn[];

  @ViewChild('renderer', {static: true})
  renderer: TemplateRef<any>;

  private _i18Strings: TemplateRef<any>;
  private _noLabelLayout: boolean = false;

  constructor(@Host() protected _metaContext: MetaContextComponent,
              private cd: ChangeDetectorRef,
              public env: Environment) {
    super(env, _metaContext);
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.validators = this.createValidators();
  }

  bindingBoolProperty(key: string): boolean {
    const bindings: Map<string, any> = this.context.propertyForKey(KeyBindings);

    if (bindings && bindings.has(key)) {
      const value = bindings.get(key);
      return !!value;
    }
    return false;
  }

  ngAfterContentInit(): void {
    this._metaContext.supportsDirtyChecking = true;
  }


  bindingStringProperty(key: string): string {
    const bindings: Map<string, any> = this.context.propertyForKey(KeyBindings);

    if (bindings && bindings.has(key)) {
      return bindings.get(key);

    }
    return null;
  }


  /**
   * Creates angular based Validator which for a current field executes validation rules real
   * time as you type. At the bottom of the file there is example of async validator
   *
   */
  private createValidators(): ValidatorFn[] {
    const that = this;
    const metaValidator = (control: AbstractControl): { [key: string]: any } => {
      if (!control.touched) {
        return null;
      }
      const errorMsg = that.context.meta.validationError(that.context);
      return errorMsg ? {'metavalid': {'msg': errorMsg}} : null;
    };

    return [metaValidator];
  }

  isRequired(): boolean {
    return this.editing && this.context.booleanPropertyForKey('required', false);
  }


  onFormFieldChanged(event: string) {
    this._metaContext.markDirty();
  }

  /**
   * Need to have compatible accessors names with FormFieldComponent
   */
  get noLabelLayout(): boolean {
    return this._noLabelLayout;
  }

  set noLabelLayout(value: boolean) {
    this._noLabelLayout = value;
  }

  get i18Strings(): TemplateRef<any> {
    return this._i18Strings;
  }


  set i18Strings(value: TemplateRef<any>) {
    this._i18Strings = value;
  }

  get id(): string {
    return this.properties('field');
  }

  get placeholder(): string {
    return this.properties('placeholder', this.label);
  }

  get columns(): number {
    return this.properties('size', 6);
  }

  get label(): number {
    return this.properties('label');
  }

  get hint(): number {
    return this.properties('hint');
  }

  get fluid(): number {
    return this.properties('fluid', false);
  }

}
