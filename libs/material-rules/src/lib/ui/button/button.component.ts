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
  ElementRef,
  EventEmitter,
  forwardRef,
  Input, OnDestroy, Output,
  ViewEncapsulation
} from '@angular/core';
import {MatFormFieldControl, ThemePalette} from '@angular/material';
import {Subject} from 'rxjs';
import {NgControl} from '@angular/forms';
import {DomUtilsService} from '@ngx-metaui/rules';


/**
 * Supported Button type
 */
export type ButtonType = 'basic' | 'raised' | 'flat' | 'stroked';


/**
 *
 *  We need to be able to instantiate sa button or link programmatically. Just like the other
 *  components where angular does not support any directive manipulation or to work with native
 *  components we need to create a component out from mat button directive
 *
 *
 */
@Component({
  selector: 'md-button',
  templateUrl: 'button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => Button),
      multi: true
    }
  ],
  styles: [
      `
      .no-underline .mat-form-field-underline {
        display: none;
      }

      .button-with-ff button {
        padding-left: 0;
        line-height: 21px;
        text-align: left;
        font-weight: 400;
        font-size: 14px;
        color: rgba(0,0,0,.68);
      }

      .button-with-ff .mat-form-field-infix {
        padding-top: 0;
      }
    `
  ]
})
export class Button implements MatFormFieldControl<any>, AfterViewInit, OnDestroy {


  @Input()
  title: any;

  /**
   * Used in case button is placed inside the form field
   */
  @Input()
  placeholder: string = 'First Name';

  @Input()
  type: ButtonType = 'basic';

  @Input()
  id: string;


  @Input()
  disabled: boolean = false;

  @Input()
  color: ThemePalette;

  @Input()
  value: any;

  /**
   * Delete the click call
   */
  @Output()
  click: EventEmitter<any> = new EventEmitter();

  /**
   * Required by MatFormFieldControl but not really used
   */
  _stateChanges = new Subject<void>();


  constructor(private elementRef: ElementRef, private domUtils: DomUtilsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const ff = this.domUtils.closest(this.elementRef.nativeElement,
      '.mat-form-field-wrapper');

    if (ff) {
      ff.classList.add('no-underline', 'button-with-ff');
    }
  }

  ngOnDestroy(): void {
    const ff = this.domUtils.closest(this.elementRef.nativeElement,
      '.no-underline');

    if (ff) {
      ff.classList.remove('no-underline', 'button-with-ff');
    }
  }




  onClick(event: any): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    } else {
      this.click.emit(event);
    }
  }


  get shouldLabelFloat(): boolean {
    return true;
  }

  get controlType(): string {
    return '';
  }

  get empty(): boolean {
    return false;
  }

  get required(): boolean {
    return false;
  }

  get errorState(): boolean {
    return false;
  }

  get focused(): boolean {
    return false;
  }

  get stateChanges(): Subject<void> {
    return this._stateChanges;
  }

  get autofilled(): boolean {
    return false;
  }

  get ngControl(): NgControl {
    return null;
  }


  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {

  }

}

