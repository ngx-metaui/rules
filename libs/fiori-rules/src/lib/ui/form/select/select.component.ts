import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Self,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {OptionComponent, SelectComponent as FdSelect} from '@fundamental-ngx/core';
import {FormFieldControl} from '../form-control';
import {ControlValueAccessor, FormControl, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Subject} from 'rxjs';
import {SelectItem} from '../data-model';


/**
 * Renders a `<select ...>...[<option>...</option>]*...</select>` popup menu in the html.
 * This component is implemented on top of fd-select, to both:
 *
 * - to abstract implementation details from the developers
 *
 * - Adds "no selection" behavior. The string to be displayed in the popup which allows the user to
 *    make "no selection" from the available list. If the user chooses this option, then the
 *    selection binding will be pushed as null
 *
 * - Way to work with complex object is to:
 *     * using an Array<SelectItem> that application can implement
 *     * providing custom `ng-template` with name `optionValue`
 *     (`<ng-template #optionValue let-item>`)
 *
 *
 *  Todo: Revisit keyboard navigation once it start to work in core + this is good candidate
 *  to use cdk for this
 *
 */
@Component({
  selector: 'fdp-select',
  templateUrl: './select.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends FdSelect implements FormFieldControl<any>,
  ControlValueAccessor, OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {

  /**
   * Form element ID.
   * Todo: This should be moved to higher class that will be common to all input fields
   */
  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  placeholder: string;

  @Input()
  readonly: boolean;

  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.emitStateChange('disabled');
  }

  /**
   * Ordered list of items displayed in the popup menu. You can use strings, list of object
   * directly but for this you need to provide custom template or SelectItem[]
   */
  @Input()
  list: Array<SelectItem | string>;

  /**
   * String rendered as first value in the popup which let the user to make 'no selection' from
   * available list of values. When this option is active and use make this selection we save a
   * NULL value
   */
  @Input()
  noSelectionString: string;


  @Input()
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    if (value !== this.value) {
      this.writeValue(value);
    }
  }

  /**
   * custom option popup item template defined by app.
   *
   */
  @ContentChild('optionValue', {static: false})
  optionValueTemplate: TemplateRef<any>;


  /**
   * custom option item template defined by app.
   *
   */
  @ContentChild('triggerValue', {static: false})
  triggerValueTemplate: TemplateRef<any>;


  /**
   * Keyboard handling needs to have an options and since we dont have them on app level and have
   * them inside we need to query them by View query.
   *
   * todo: use cdk for keyboard events on core side
   */
  @ViewChildren(OptionComponent)
  options: QueryList<OptionComponent> = new QueryList<OptionComponent>();

  /**
   * Reference to internal Input element
   */
  @ViewChild(FdSelect, {static: true, read: ElementRef})
  protected _elementRef: ElementRef;

  /**
   * See @FormFieldControl
   */
  focused: boolean = false;


  /**
   * See @FormFieldControl
   */
  readonly stateChanges: Subject<any> = new Subject<any>();


  protected _disabled: boolean;
  protected _value: string;
  protected _inErrorState: boolean;
  protected _destroyed = new Subject<void>();

  // @formatter:off
  onChange = (_: any) => {};
  onTouched = () => {};
  // @formatter:on


  constructor(protected _cd: ChangeDetectorRef,
              @Optional() @Self() public ngControl: NgControl,
              @Optional() @Self() public ngForm: NgForm) {

    super();
    this.fdDropdownClass = false;
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.emitStateChange('ngOnChanges');
  }

  /**
   * Re-validate and emit event to parent container on every CD cycle as they are some errors
   * that we can't subscribe to.
   */
  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this._cd.detectChanges();
  }


  ngOnDestroy(): void {
    this.stateChanges.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this._cd.markForCheck();
    this.emitStateChange('setDisabledState');
  }

  writeValue(value: any): void {
    this._value = value;
    this.onChange(value);
    this.emitStateChange('writeValue');
  }

  /**
   * Handles even when we click on parent container which is the FormField Wrapping this
   * control
   */
  onContainerClick(event: MouseEvent): void {
    if (this._elementRef) {
      console.log(this._elementRef);
      const btn = this._elementRef.nativeElement.querySelector('button');
      if (btn) {
        btn.focus();
      }
    }
  }

  /**
   *  Need re-validates errors on every CD iteration to make sure we are also
   *  covering non-control errors, errors that happens outside of this control
   */
  private updateErrorState() {
    const oldState = this._inErrorState;
    const parent = this.ngForm;
    const control = this.ngControl ? this.ngControl.control as FormControl : null;
    const newState = !!(control && control.invalid && (control.touched ||
      (parent && parent.submitted)));

    if (newState !== oldState) {
      this._inErrorState = newState;
      this.emitStateChange('updateErrorState');
    }
  }


  /**
   *
   * Keeps track of element focus
   */
  _onFocusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
      this.focused = isFocused;
      this.emitStateChange('_onFocusChanged');
    }
    this.onTouched();
  }

  get inErrorState(): boolean {
    return this._inErrorState;
  }

  onSelection(event: OptionComponent): void {
    this.value = event.value;
    this.onChange(this.value);
    this.onTouched();
    this._cd.markForCheck();
    this.emitStateChange('onSelection');
  }


  private emitStateChange(text: string): void {
    if (this.stateChanges) {
      this.stateChanges.next(text);
    }
  }

  /**
   * Dirty assignment is to disable resetOption logic.
   */
  ngAfterContentInit(): void {
    this['unselectOptions'] = () => {
    };
  }
}
