/**
 *
 * @license
 * F. KOlar
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
import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormFieldControl} from '../form-control';
import {NgControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';


let randomId = 0;

/**
 * Simple component rendering values in the read only mode.
 *
 *
 */
@Component({
  selector: 'fdp-string',
  templateUrl: './string.component.html',
  styleUrls: ['string.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringComponent implements FormFieldControl<any> {
  protected defaultId: string = `fdp-string-${randomId++}`;

  private _value: string = '';

  @Input()
  set value(value: any) {
    this._value = value;
  }

  get value(): any {
    return this.sanitizer.bypassSecurityTrustHtml(this._value);
  }

  readonly _stateChanges: Subject<any> = new Subject<any>();

  constructor(private sanitizer: DomSanitizer) {
  }

  private readonly _disabled: boolean;
  private _editable: boolean;
  private readonly _focused: boolean;
  private _id: string;
  private readonly _inErrorState: boolean;
  private readonly _ngControl: NgControl | null;
  private _placeholder: string;

  onContainerClick(event: MouseEvent): void {
  }


  get id(): string {
    return this.defaultId;
  }

  set id(value: string) {
    throw new Error(`String component does not support ID (${value}).`);
  }

  get disabled(): boolean {
    return false;
  }

  get editable(): boolean {
    return false;
  }

  set editable(value: boolean) {
    this._editable = value;
  }

  get focused(): boolean {
    return this._focused;
  }

  get inErrorState(): boolean {
    return false;
  }

  get ngControl(): NgControl | null {
    return null;
  }

  get placeholder(): string {
    return null;
  }

  get stateChanges(): Observable<void> {
    return this._stateChanges;
  }
}


