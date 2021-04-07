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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChange,
  SimpleChanges,
  SkipSelf,
  TemplateRef
} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {isPresent} from '../utils/lang';
import {Context, UIContext} from '../../core/context';
import {UIMeta} from '../uimeta';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Environment} from '../config/environment';


/**
 *
 * MetaContext (m-context) enables manipulation of a MetaUI Context as part of the Angular's
 * component processing.
 *
 * The MetaContext tag will find the current Context in the Environment'env or will
 * create one, will push() a one level on the Context, set() all of its bindings as key/values,
 * render its content,  Since its content may contain component that further use
 * MetaContext, additional nested context manipulations may occur.
 *
 * ### Simple example
 *
 * ```typescript
 *
 *      <m-context [object]='checkRequest' operation='edit' layout='Inspect'>
 *          <m-include-component></m-include-component>
 *       </m-context>
 *
 * ```
 *
 *
 * Generally, MetaContext treats its bindings as a verbatim list of keys/values to be set()
 * on the context (i.e. the bindings above on 'object', 'layout', 'operation', and 'field'
 * are not predefined by MetaContext).
 *
 * Although we treat some bindings in special way as we expect them to be passed in as an expression
 * therefore they need be defined as @Input(). The rest we tread is pure keys/values strings
 *
 *
 */


@Component({
  selector: 'm-context',
  template: `
    <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaContextComponent implements OnDestroy, OnInit {
  @Input()
  module: string;

  @Input()
  layout: string;

  @Input()
  operation: string;

  @Input()
  class: string;

  @Input()
  object: any;

  @Input()
  actionCategory: any;

  @Input()
  action: any;

  @Input()
  field: string;

  @Input()
  scopeKey: string;

  @Input()
  locale: string;

  @Input()
  pushNewContext: boolean;

  @Input()
  group: string;

  /**
   * Fixes the issue with nesting oaur code with ng-template where dependency inject does not work
   * and component does not inject parent
   */
  @Input()
  parentMC: MetaContextComponent;


  /**
   * @deprecated will be removed in the next release
   */
  @Output()
  beforeContextSet: EventEmitter<any> = new EventEmitter();

  @Output()
  afterContextSet: EventEmitter<OnContextSetEvent> = new EventEmitter();


  @Output()
  actionTriggered: EventEmitter<MetaUIActionEvent> = new EventEmitter();

  @ContentChild('i18n', {static: true})
  i18Template: TemplateRef<any>;


  get bindings(): Map<string, any> {
    return this._bindingsMap;
  }

  /**
   *
   * Every meta context component which pushing certain properties to stack has its own context
   * that lives until component is destroyed
   *
   */
  get context(): Context {
    return this._context;
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  contextChanged$: BehaviorSubject<Context> = new BehaviorSubject<Context>(null);

  private _formGroup: FormGroup;
  private _bindingsMap: Map<string, any>;
  private _context: Context;
  private _inputs: { propName: string, templateName: string }[];
  private _destroy: Subject<void> = new Subject<void>();

  // private contextCache: Map<string, Context> = new Map<string, Context>();

  constructor(private elementRef: ElementRef,
              private _cd: ChangeDetectorRef,
              private _cfr: ComponentFactoryResolver,
              protected meta: UIMeta,
              protected env: Environment,
              @Optional() private formContainer: ControlContainer,
              @Optional() @SkipSelf() private _parentMC?: MetaContextComponent) {

    // console.log('@@@@$$ this.formContainer = ', this.formContainer);

    this._formGroup = <FormGroup>((this.formContainer) ? this.formContainer.control
      : new FormGroup({}));
    this._inputs = this._cfr.resolveComponentFactory(MetaContextComponent).inputs;
  }

  ngOnInit(): void {
    if (!this.parentMC) {
      this.parentMC = this._parentMC;
    }
    this.initInputs();

    // console.log('MC, INIT', this._debugKeys());
    // console.log('MC, INIT', isPresent(this.parentMC));
    this.pushContextValues();
    this._doUpdateViews();
  }

  /**
   * For any other immutable object detect changes here and refresh the context stack
   *
   */
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (!this._isFirstChange(changes)) {
      this.initInputs();

      // console.log('MC, ngOnChanges', this._debugKeys());
      this.pushContextValues();
      this._doUpdateViews();
    }
  }


  /**
   * Just for troubleshooting to print current context and assignments
   *
   */
  debugString(): String {
    if (isPresent(this._context)) {
      return this._context.debugString();
    }
  }


  /**
   * Let's clean up and destroy pushed context
   */
  ngOnDestroy() {
    this._destroy.unsubscribe();

    if (this.env.hasValue('root-meta-cnx')) {
      this.env.deleteValue('root-meta-cnx');
    }
  }

  hasObject(): boolean {
    if (this.context) {
      return isPresent((this.context as UIContext).object);
    }
    return false;
  }


  _debugKeys(): string {
    let keys = '';

    this.bindings.forEach((v, k) => keys += `${k}, `);
    return keys;
  }

  /**
   *
   * This is our key method that triggers all the interaction with MetaUI engine. Here we
   * push context keys & values to the stack and this is the thing that triggers rule
   * recalculation which give us updated properties.
   *
   */
  private pushContextValues(): void {
    this._context = null;
    this._context = this.meta.newContext();

    this._context.push();
    this.bindings.forEach((v, k) => {
      if (k[k.length - 1] === '@') {
        k = k.replace(/\@/g, '');
      }
      this._context.set(k, v);
    });
    if (this.scopeKey) {
      this._context.setScopeKey(this.scopeKey);
    }
  }


  private initInputs() {
    this._bindingsMap = this.parentMC && !this.pushNewContext ?
      new Map<string, any>(this.parentMC._bindingsMap) : new Map<string, any>();

    this.initImplicitBindings();
    for (let i = 0; i < this.elementRef.nativeElement.attributes.length; i++) {
      const attr: Attr = this.elementRef.nativeElement.attributes.item(i);
      if (!this.ignoreBinding(attr)) {
        this._bindingsMap.set(attr.name, attr.value);
      }
    }
    if (this._formGroup) {
      combineLatest([this._formGroup.valueChanges, this._formGroup.statusChanges])
        .pipe(takeUntil(this._destroy))
        .subscribe((item) => {
          // console.log('MC, form Change', this._debugKeys());
          this._doUpdateViews();
        });
    }
    if (this.actionTriggered.observers.length > 0) {
      this.env.setValue('root-meta-cnx', this);
    }
  }

  private _isFirstChange(changes: SimpleChanges): boolean {
    for (const input of this._inputs) {
      if (changes[input.propName] && changes[input.propName].firstChange) {
        return true;
      }
    }
    return false;
  }


  private initImplicitBindings() {
    this._inputs.forEach((input) => {
      if (input.propName !== 'parentMC' && this[input.propName]) {
        if (this._bindingsMap.has(input.propName)) {
          // in case we have duplicate property
          this._bindingsMap.set(input.propName + '@', this[input.propName]);
        } else {
          this._bindingsMap.set(input.propName, this[input.propName]);
        }
      }
    });
  }

  /**
   *
   * Since we are going thru the element' attributes we want to skip everything angular
   * related
   *
   */
  private ignoreBinding(attr: Attr) {
    return attr.name.includes('_ng') || attr.name.includes('ng-') ||
      attr.name.includes('scopekey') ||
      attr.name.includes('(') || (!attr.value || attr.value.length === 0);
  }

  private _doUpdateViews(): void {
    // console.log('MC, _doUpdateViews', this._debugKeys());
    this.contextChanged$.next(this.context);
  }
}


/**
 *
 * Defines format for the emitted action event. MetaUI can also execute actions which needs to
 * be handled by application or actual component using this m-context.
 *
 */
export class MetaUIActionEvent {

  constructor(/**
               * What component trigered action
               */
              public component: any,
              /**
               * Name of the action. Usually name of the @Output of actual component
               */
              public eventName: string,
              /**
               * Actions or event that are broadcasted can be wrapped with @action or @layout
               * which has its name. We want to also send out this name to the application to
               * know what metaui action or layout triggered this
               */
              public cnxName: string,
              /**
               * Any data that you can pass
               */
              public data: any) {

  }
}


export interface OnContextSetEvent {
  value: string;
  context?: Context;
}


