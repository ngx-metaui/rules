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
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  SimpleChange,
  TemplateRef
} from '@angular/core';
import {ControlContainer, FormControl, FormGroup} from '@angular/forms';
import {assert, equals, isBlank, isPresent, StringWrapper} from '../utils/lang';
import {Environment} from '../config/environment';
import {ListWrapper} from '../utils/collection';
import {Context} from '../../core/context';
import {UIContext} from '../context';
import {META_RULES, MetaRules} from '../meta-rules';


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
 * First time when component is created we use ngOnInit() to push values and ngAfterViewInit() to
 * pop values. The push/pop looks something like this:
 *
 * <Node1> - PUSH
 *      <Node2> - PUSH
 *          <Node3> - PUSH
 *          <Node3> - POP
 *      <Node2> - POP
 * <Node1> - POP
 *
 *
 * After component is fully initialized and rendered  then we use ngDoCheck() to push() and
 * ngAfterViewChecked() to pop() values.
 *
 * This works well in case of views where angular is pretty consistent in terms of order of
 * these calls but when I tried to do the same in one template I cant really rely on some
 * consistency as I think there is none. Therefore some of the components needs to be defined
 * as a separate views.
 *
 * Ideally we want to pop() property that was pushed so we keep the stack clean but due to the
 * nature of Angular's lifecycle hooks we can not or I could not find a way how to make it
 * consistent. If I use m-context within one view hooks are called randomly and I cannot find the
 * right spot that is called before rendering and after rendering.
 *
 *
 */


/**
 * Constant represent current active and mainly latest Context
 *
 */
export const ACTIVE_CNTX = 'CurrentMC';
const CNTX_CHANGED = 'Cntx_Changed';


// define set of properties which will be skipped as they are defined as inputs or  added by
// angular
const IMPLICIT_PROPERTIES = [
  'module', 'layout', 'operation', 'class', 'object', 'actionCategory', 'action', 'field',
  'locale', 'pushNewContext', 'group'
];


const IMMUTABLE_PROPERTIES = [
  'module', 'layout', 'operation', 'class', 'action', 'field', 'locale', 'pushNewContext', 'group'
];


@Component({
  selector: 'm-context',
  template: `
    <ng-template [ngIf]="autoRender">
      <m-render></m-render>
    </ng-template>
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaContextComponent implements OnDestroy, AfterViewInit, AfterViewChecked {
  /**
   * Currently there are set of properties which can be passed as expression and therefore they
   * need to be resolved by angular. Angular does not have such option to provide flexible
   * number of Inputs. All needs to be pre-defined. If you want to pass in an
   * expression it must be defined as input. Otherwise any other attributes will be treated as
   * strings.
   */
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
  locale: string;

  @Input()
  pushNewContext: boolean;

  @Input()
  autoRender: boolean = false;

  @Input()
  group: string;


  @Output()
  beforeContextSet: EventEmitter<any> = new EventEmitter();

  @Output()
  afterContextSet: EventEmitter<OnContextSetEvent> = new EventEmitter();


  @Output()
  onAction: EventEmitter<MetaUIActionEvent> = new EventEmitter();

  @ContentChild('i18n', {static: true})
  i18Template: TemplateRef<any>;
  /**
   * Need to cache if we already have object or not in case we load data from REST where it
   * could be deferred asnd not available when component is initialized
   */
  hasObject: boolean;

  /**
   * Since the push/pop is happening every time the view is created or angular triggers change
   * detection we need to eliminate any unnecessary push / pop action
   *
   */
  private _isDirty: boolean = false;

  /**
   * Need to make sure when we mark this as dirty the pup/pop starts in the next detection cycle
   * pair (ngDoCheck/AfterViewChecked) and not in between.
   */
  dirtyCheckInProgress: boolean = false;

  /**
   * Flag that tells us that component is fully rendered
   *
   */
  viewInitialized: boolean = false;


  get bindings(): Map<string, any> {
    return this.bindingsMap;
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

  /**
   *
   * Marks MetaContext or the root MetaContext that created a new Context
   *
   */
  private contextCreated: boolean = false;
  private bindingsMap: Map<string, any>;
  private bindingKeys: string[] = [];

  /**
   * Shell copy of an object used for comparision. We may get back to the original solution which
   * I had here. THe Angular's differs
   */
  private prevObject: any;
  private _scopeBinding: string;
  private _formGroup: FormGroup;
  private _context: Context;

  private contextCache: Map<string, Context> = new Map<string, Context>();

  constructor(private elementRef: ElementRef,
              public env: Environment,
              private _cd: ChangeDetectorRef,
              @Inject(META_RULES) protected meta: MetaRules,
              @Optional() private formContainer: ControlContainer) {

    this._isDirty = false;
    this._formGroup = <FormGroup>((this.formContainer) ? this.formContainer.control
      : new FormGroup({}));
  }

  ngOnInit(): void {
    this.initBindings();
    this.pushPop(true);
    // console.log('MC-ngOnInit', this.bindings);

    // todo: check if we can removed  - used by layouts
    if (!this.env.hasValue('root-meta-cnx')) {
      this.env.setValue('root-meta-cnx', this);
    }

    if (this.i18Template && !this.env.hasValue('i18n')) {
      this.env.setValue('i18n', this.i18Template);

    } else if (this.env.hasValue('i18n')) {
      this.i18Template = this.env.getValue('i18n');
    }
  }

  /**
   * For any other immutable object detect changes here and refresh the context stack
   *
   */
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.hasObject = changes['object'] && changes['object'].currentValue;
    for (const name of IMMUTABLE_PROPERTIES) {
      if (changes[name] && (changes[name].currentValue !== changes[name].previousValue)) {
        this.initBindings();

        if (!changes[name].isFirstChange()) {
          this.markDirty();
        }
        break;
      }
    }
    // in case object is coming late e.g. from some reactive API like REST then we
    // do not get it into ngInit but it will be here.
    if (this.viewInitialized && changes['object'] && this.object) {
      this.initBindings();
      this.markDirty();
    }
  }

  /**
   * Ng check is trigged after view is fully inialized and we want to push everything new
   * properties to the context and evaluate everything.
   *
   *
   */
  ngDoCheck(): void {
    if (this.viewInitialized) {
      if (this.isDirty) {
        // console.log('MC-ngDoCheck', this.bindings);
        this.pushPop(true);

        if (isPresent(this.object) && !equals(this.prevObject, this.object)) {
          this.updateModel();
        }
        this.dirtyCheckInProgress = true;
      }
    }
  }

  /**
   * We want to start detecting changes only after view is fully checked
   */
  ngAfterViewInit(): void {
    if (!this.viewInitialized) {
      // console.log('MC-ngAfterViewInit', this.bindings);
      this.pushPop(false);
      this.viewInitialized = true;
    }
  }

  ngAfterViewChecked(): void {
    if (this.viewInitialized) {
      if (this.isDirty && this.dirtyCheckInProgress) {
        // console.log('MC-ngAfterViewChecked', this.bindings);

        this.pushPop(false);
        this._isDirty = false;
        this.dirtyCheckInProgress = false;
      }
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
   * We keep the most current and latest context to environment to be read by any Child
   * MetaContext for purpose of creation new context as it needs info what was already pushed
   * onto the stack.
   *
   */
  activeContext(): Context {
    return this.env.peak<Context>(ACTIVE_CNTX);
  }


  /**
   * Let's clean up and destroy pushed context
   */
  ngOnDestroy() {
    if (this.env.hasValue('root-meta-cnx')) {
      this.env.deleteValue('root-meta-cnx');
    }
  }

  markDirty() {
    if (this.bindingsMap.has('field')) {
      throw new Error('MarkDirty called on field level!');
    }
    this._isDirty = true;
  }


  get isDirty(): boolean {
    const activeContext = this.activeContext();
    return this._isDirty || (activeContext && activeContext._isParentDirty);
  }

  /**
   *
   * This is our key method that triggers all the interaction inside MetaUI world. Here we
   * push context keys and their values to the stack and this is the thing that triggers
   * rule recalculation which give us updated  properties. Those are then used by
   * MetaIncludeDirective to render the UI.
   *
   * myContext is current context for this MetaContext Component.
   *
   *    isPush identifies if we are pushing or popping to context stack
   */
  private pushPop(isPush: boolean): void {
    const activeContext = this.createContext(isPush);
    // console.log(isPush ? 'PUSH' : 'POP', this._scopeBinding ? this._scopeBinding :
    //   this.bindingsMap);

    if (isPush) {
      activeContext.push();
      if (this._scopeBinding && this.hasObject) {

        this.beforeContextSet.emit(this._scopeBinding);
        activeContext.setScopeKey(this._scopeBinding);

      } else {
        for (let index = 0; index < this.bindingKeys.length; index++) {

          const key = this.bindingKeys[index];
          const value = this.bindingsMap.get(key);

          this.beforeContextSet.emit(value);
          activeContext.set(key, value);
        }
      }
      // Save created content to local MetaContext
      this._context = this.hydrate(activeContext);
      const val = this._scopeBinding || this.bindingsMap.values().next().value;
      this.afterContextSet.emit({value: val, context: this._context});

    } else {
      activeContext.pop();

      if (this.contextCreated) {
        this.env.pop<Context>(ACTIVE_CNTX);
      }
    }
  }

  private createContext(isPush: boolean) {
    let activeContext: Context = this.activeContext();
    assert(isPush || isPresent(activeContext), 'pop(): Missing context');

    const forceCreate = isPush && (isPresent(this.pushNewContext) && this.pushNewContext);
    if (isBlank(activeContext) || forceCreate) {
      activeContext = this.meta.newContext(forceCreate);

      this.contextCreated = true;
      this.env.push<Context>(ACTIVE_CNTX, activeContext);
    }
    if (activeContext) {
      activeContext._isParentDirty = this._isDirty || activeContext._isParentDirty;
    }
    return activeContext;
  }

  /**
   * This can be expensive operation when we try to snapshot existing context and make a copy
   * out of it.
   */
  private hydrate(context: Context) {
    const id = context.id();
    if (this.contextCache.has(id)) {
      return this.contextCache.get(id);
    } else {
      const hydratedCnt = context.snapshot().hydrate(false);

      this.contextCache.set(id, hydratedCnt);
      return hydratedCnt;
    }
  }

  /**
   * Ideally we do not need this method if Angular would support to pass variable number of
   * bindings without a need to have backup property for each of the bindings or expression./
   *
   * Once they support. we can remove this. Since this check what are known bindings passed,
   * meaning the ones decorated with @Input and the rest
   *
   */
  private initBindings() {
    this.bindingsMap = new Map<string, any>();
    const nativeElement = this.elementRef.nativeElement;

    this.initImplicitBindings();
    for (let i = 0; i < nativeElement.attributes.length; i++) {
      const attr: Attr = nativeElement.attributes.item(i);
      if (this.ignoreBinding(attr)) {
        continue;
      }
      if (isPresent(attr.name) && attr.name.toLowerCase() === 'scopekey') {
        this._scopeBinding = attr.value;

      } else {
        this.bindingsMap.set(attr.name, attr.value);
      }
    }
    this.bindingKeys = [];
    this.bindingsMap.forEach((value, key) => {
      this.bindingKeys.push(key);
    });
    // Sort them by their importance
    ListWrapper.sortByExample(this.bindingKeys, IMPLICIT_PROPERTIES);
    this.hasObject = this._hasObject();
  }

  /**
   * The thing we want is to pass variable number of bindings and resolve them programmatically.
   * Currently in Angular we cannot do this we have these set of properties where we expect
   * some expression, some dynamic properties. For the rest we expect only string literal to be
   * passed in therefore we can resolve them with nativeElement.attributes
   *
   */
  private initImplicitBindings() {
    if (isPresent(this.module)) {
      this.bindingsMap.set('module', this.module);
    }
    if (isPresent(this.layout)) {
      this.bindingsMap.set('layout', this.layout);
    }
    if (isPresent(this.operation)) {
      this.bindingsMap.set('operation', this.operation);
    }
    if (isPresent(this.class)) {
      this.bindingsMap.set('class', this.class);
    }
    if (isPresent(this.object)) {
      this.bindingsMap.set('object', this.object);
      this.prevObject = Object.assign({}, this.object);
    }
    if (isPresent(this.actionCategory)) {
      this.bindingsMap.set('actionCategory', this.actionCategory);
    }
    if (isPresent(this.action)) {
      this.bindingsMap.set('action', this.action);
    }
    if (isPresent(this.field)) {
      this.bindingsMap.set('field', this.field);
    }
    if (isPresent(this.locale)) {
      this.bindingsMap.set('locale', this.locale);
    }
    if (isPresent(this.group)) {
      this.bindingsMap.set('group', this.group);
    }
  }

  /**
   *
   * Since we are going thru the element' attributes we want to skip anything that has nothign
   * to do with us.
   *
   */
  private ignoreBinding(attr: Attr) {
    return IMPLICIT_PROPERTIES.indexOf(attr.name) !== -1 ||
      StringWrapper.contains(attr.name, '_ng') ||
      StringWrapper.contains(attr.name, 'ng-') ||
      StringWrapper.contains(attr.name, '(') ||
      (isBlank(attr.value) || attr.value.length === 0);
  }

  /**
   * If object is changed we need to also update our angular model to reflect user changes. All
   * changes and updates in MetaUI use object references
   */
  private updateModel() {
    if (!this._formGroup) {
      return;
    }
    const fields = Object.keys(this.object);
    fields.forEach((field: string) => {
      const control: FormControl = <FormControl>this._formGroup.get(field);
      if (isPresent(control)) {
        control.patchValue(this.object[field], {onlySelf: false, emitEvent: true});
      }
    });

    this.prevObject = Object.assign({}, this.object);
  }

  private _hasObject(): boolean {
    const context = this.activeContext();
    if (isPresent(context)) {
      return isPresent((<UIContext>context).object);
    }
    return false;
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


