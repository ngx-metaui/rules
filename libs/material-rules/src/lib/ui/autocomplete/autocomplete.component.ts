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
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSelectChange} from '@angular/material/select';
import {isObservable, Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


/**
 *  Just like for other inputs we need to create a component that encapsulates  MatAutoComplete
 *  internals as we want to only pass a model and let the component handle.
 *
 *
 */
@Component({
  selector: 'md-autocomplete',
  templateUrl: 'autocomplete.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => AutoComplete),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoComplete implements ControlValueAccessor, MatFormFieldControl<any>, OnInit,
  OnChanges, AfterContentInit {

  /**
   * Used by application to have a full control how the option item is rendered
   */
  @ContentChild('optionTemplate')
  itemTemplate: TemplateRef<any>;

  @Input()
  list: any;
  /**
   * In case class as model item this specifies the key for the display value.
   * Otherwise toString is used
   */
  @Input()
  displayKey: string;
  /**
   * These bellow are MatFormFieldControl implementation that delegates the
   * call into actual component. This component should not have any extra logic
   */

  @Input()
  disabled: boolean = false;
  /**
   *  @see MatAutocomplete
   */
  @Input()
  displayWith: ((value: any) => string) | null;
  /**
   *  Custom filtering method
   */
  @Input()
  filterWith: ((value: any) => any[]) | null;

  @Input()
  id: string;

  @Input()
  placeholder: string;

  @Input()
  required: boolean;
  /**
   *  currently selected value
   */
  @Input()
  value: any;
  /**
   * Just broadcast MatSelect item selection event outside of this component as this could be
   * useful
   */
  @Output()
  readonly selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  isAsync: boolean;
  /**
   * Needed by input field to listen for the user input
   */
  inputControl = new FormControl();
  filteredStates: Observable<any[]>;
  /**
   * Reference to internal Material select component so comunicate with it.
   */
  @ViewChild(MatAutocomplete, {static: true})
  protected autocompleteComponent: MatAutocomplete;

  @ViewChild(MatInput, {static: true})
  protected matInput: MatInput;

  constructor(@Optional() @Self() public ngControl: NgControl, private cd: ChangeDetectorRef) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Required by MatFormFieldControl but not really used
   */
  _stateChanges = new Subject<void>();

  get stateChanges(): Subject<void> {
    return this.matInput ? this.matInput.stateChanges : this._stateChanges;
  }

  get shouldLabelFloat(): boolean {
    return this.matInput && this.matInput.shouldLabelFloat;
  }

  get controlType(): string {
    return this.matInput && this.matInput.controlType;
  }

  get empty(): boolean {
    return this.matInput && this.matInput.empty;
  }

  get errorState(): boolean {
    return this.matInput && this.matInput.errorState;
  }

  get focused(): boolean {
    return this.matInput && this.matInput.focused;
  }

  /**
   *
   * Methods used by ControlValueAccessor
   */
  onChange = (_: any) => {};

  onTouched = () => {};

  ngOnInit(): void {
    this.isAsync = isObservable(this.list);

    this.filteredStates = this.inputControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : this.displayWith(value)),
        map(state => state ? this._filterStates(state) : this.list)
      );

    this.inputControl.setValue(this.value);

    if (!this.displayWith && this.displayKey) {
      this.displayWith = (value: any) => (value && this.displayKey) ?
        value[this.displayKey] : value;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list'] && changes['list'].currentValue) {
      this.isAsync = isObservable(this.list);
    }
  }

  ngAfterContentInit(): void {
    this.matInput.stateChanges.pipe(startWith(<string>null!)
    ).subscribe(() => {
      this.cd.detectChanges();
    });

    this.inputControl.valueChanges.subscribe(() => {
      this.cd.detectChanges();
    });

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.autocompleteComponent) {
      this.disabled ? this.inputControl.disable() : this.inputControl.enable();
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.inputControl.setValue(value);
    this.onChange(this.inputControl.value);
  }

  setDescribedByIds(ids: string[]): void {
    if (this.matInput) {
      this.matInput.setDescribedByIds(ids);
    }
  }

  onContainerClick(event: MouseEvent): void {
  }


  onSelection(event: MatAutocompleteSelectedEvent): void {
    this.onChange(event.option.value);
    this.selectionChange.emit(event.option.value);
  }


  /**
   * Just naive implementation for the filtering taken from demo page
   *
   */
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.list.filter(state => this.displayWith(state)
      .toLowerCase().indexOf(filterValue) === 0);
  }
}

