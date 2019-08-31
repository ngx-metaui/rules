/**
 * @license
 * F. Kolar
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
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {MatFormFieldControl, MatSelect, MatSelectChange} from '@angular/material';
import {isObservable, Subject} from 'rxjs';


/**
 *  Just like for other inputs we need to create a component that encapsulates  MatSelect
 *  internals as we want to only pass a model and let the component handle it so developer
 *  does not need to know about the internal complexity
 *
 *  Ideally instead of something like this:
 *
 * ```
 *   <mat-select placeholder="State">
 *     <mat-option>None</mat-option>
 *     <mat-option *ngFor="let state of states" [value]="state">{{state}}</mat-option>
 *   </mat-select>
 * ```
 *
 * We can have :
 *
 * ```
 *
 *  <md-select  placeholder="Pokemon" ([ngModel])="pokemonMode"  [showNoSelection]="true"
 *    noSelectionString="None" [list]="states" >
 *
 *  <md-select>
 * ```
 *
 * We can still give developers freedom to customize the way we render things inside e.g. using
 *
 * ``` <ng-template #optionItem>xxx</ng-template>``` that you put into the md-select content/
 *
 * The goal is to have unified and simplified way how to create list of option without
 * understanding how its done so developers can focus on assembly and mainly our MetaUI engine
 * can easily programmatically instantiate the component.
 *
 * At this stage I just need to expose minimum set of functionality so this select can be
 * instantiated programmatically and used by MetaUI. We should not introduce any new
 * functionality.
 *
 *
 */


@Component({
  selector: 'md-select',
  templateUrl: 'select.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => Select),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(blur)': '_onBlur()'
  }

})
export class Select implements ControlValueAccessor, MatFormFieldControl<any>, OnInit,
  OnChanges, AfterViewInit {

  /**
   * Reference to internal Material select component so communicate with it.
   */
  @ViewChild('matSelect', {static: true})
  protected selectComponent: MatSelect;

  @Input()
  list: any;

  /**
   * In case class as model item this specifies the key for the display value.
   * Otherwise toString is used
   */
  @Input()
  displayKey: string;

  /**
   * Should we show no selection option?
   */
  @Input()
  hasNoSelection: boolean = true;


  /**
   * You can pass no selection value that is shown. Ideally this will be pulled from i18n
   * resource files
   */
  @Input()
  noSelectionString: string = '---';

  /**
   * These bellow are MatFormFieldControl implementation that delegates the
   * call into actual component. This component should not have any extra logic
   */

  @Input()
  disabled: boolean  = false;

  @Input()
  id: string;

  @Input()
  multiple: boolean = false;

  /**
   * Directly sets value to the component that at the ends up at writeValue as well fires
   * change detections
   */
  @Input()
  get value(): any {
    return this.selectComponent ? this.selectComponent.value : this._value;
  }

  set value(newValue: any) {
    if (newValue !== this._value) {
      if (this.selectComponent) {
        this.selectComponent.value = newValue;
        this.onChange(newValue);
      }
      this._value = newValue;
    }
  }

  private _value: any;

  @Input()
  placeholder: string;

  @Input()
  required: boolean = false;


  /**
   * Just broadcast MatSelect item selection event outside of this component as this could be
   * useful
   */
  @Output()
  readonly selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

  /**
   * Required by MatFormFieldControl but not really used
   */
  _stateChanges = new Subject<void>();


  isAsync: boolean;

  /**
   *
   * Methods used by ControlValueAccessor
   */
  onChange = (_: any) => {};
  onTouched = () => {};


  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.isAsync = isObservable(this.list);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list'] && changes['list'].currentValue) {
      this.isAsync = isObservable(this.list);
    }
  }

  ngAfterViewInit(): void {
    if (this.selectComponent && this.displayKey) {
      this.selectComponent['displayKey'] = this.displayKey;
    }
  }


  /**
   * Not sure if this this is the best solution that MatSelect is firing this as crazy on
   * every mouse move.
   */
  ngDoCheck() {
    if (this.ngControl && this.selectComponent) {
      this.selectComponent.updateErrorState();
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.selectComponent) {
      this.selectComponent.setDisabledState(isDisabled);
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }


  get shouldLabelFloat(): boolean {
    return this.selectComponent && this.selectComponent.shouldLabelFloat;
  }

  get controlType(): string {
    return this.selectComponent && this.selectComponent.controlType;
  }

  get empty(): boolean {
    return this.selectComponent && this.selectComponent.empty;
  }

  get errorState(): boolean {
    return this.selectComponent && this.selectComponent.errorState;
  }

  get focused(): boolean {
    return this.selectComponent && this.selectComponent.focused;
  }

  get stateChanges(): Subject<void> {
    return this.selectComponent ? this.selectComponent.stateChanges : this._stateChanges;
  }


  onContainerClick(event: MouseEvent): void {
    if (this.selectComponent) {
      this.selectComponent.onContainerClick();
    }
  }

  setDescribedByIds(ids: string[]): void {
    if (this.selectComponent) {
      this.selectComponent.setDescribedByIds(ids);
    }
  }

  _onBlur(): void {
    this.onTouched();
  }

  _onSelection(event: MatSelectChange): void {
    this.onChange(event.value);
    this.selectionChange.emit(event);
  }

  compareWithFn(o1: any, o2: any): boolean {
    if (this.displayKey) {
      return o1[this.displayKey] === o2[this.displayKey];
    } else {
      return o1 === o2;
    }
  }


}

