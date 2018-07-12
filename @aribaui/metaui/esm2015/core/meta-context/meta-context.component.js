/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { assert, Environment, equals, isBlank, isPresent, ListWrapper, StringWrapper } from '@aribaui/core';
import { UIMeta } from '../../core/uimeta';
import { BaseFormComponent } from '@aribaui/components';
/**
 * Constant represent current active and mainly latest Context
 *
 */
export const /** @type {?} */ ACTIVE_CNTX = 'CurrentMC';
const /** @type {?} */ CNTX_CHANGED = 'Cntx_Changed';
// define set of properties which will be skipped as they are defined as inputs or  added by
// angular
const /** @type {?} */ IMPLICIT_PROPERTIES = [
    'module', 'layout', 'operation', 'class', 'object', 'actionCategory', 'action', 'field',
    'pushNewContext'
];
const /** @type {?} */ IMMUTABLE_PROPERTIES = [
    'module', 'layout', 'operation', 'class', 'action', 'field', 'pushNewContext'
];
export class MetaContextComponent extends BaseFormComponent {
    /**
     * @param {?} elementRef
     * @param {?} env
     * @param {?} parentContainer
     */
    constructor(elementRef, env, parentContainer) {
        super(env, null);
        this.elementRef = elementRef;
        this.env = env;
        this.parentContainer = parentContainer;
        this.beforeContextSet = new EventEmitter();
        this.onContextChanged = new EventEmitter();
        this.afterContextSet = new EventEmitter();
        this.onAction = new EventEmitter();
        /**
         * Flag that tells us that component is fully rendered
         *
         */
        this.viewInitialized = false;
        /**
         *
         * Marks MetaContext or the root MetaContext that created a new Context
         *
         */
        this.contextCreated = false;
        this.bindingKeys = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initBindings();
        this.hasObject = this._hasObject();
        // MetaContextComponent.stackDepth++;
        // console.log(this.indent() + '=> ngOnInit:', this.contextKey());
        // Initial push, when component is first initialized the rest is done based on changes.
        this.pushPop(true);
        if (!this.env.hasValue('parent-cnx')) {
            this.env.setValue('parent-cnx', this);
        }
    }
    /**
     * For any other immutable object detect changes here and refresh the context stack
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // console.log(this.indent() + '    => ngOnChanges', this.contextKey());
        for (let /** @type {?} */ name of IMMUTABLE_PROPERTIES) {
            if (isPresent(changes[name])
                && (changes[name].currentValue !== changes[name].previousValue)) {
                this.initBindings();
                break;
            }
        }
        // in case object is coming late e.g. from some reactive API like REST then we
        // do not get it into ngInit but it will be here.
        if (this.viewInitialized && isPresent(changes['object']) && isPresent(this.object)) {
            this.initBindings();
        }
    }
    /**
     * Ng check is trigged after view is fully inialized and we want to push everything new
     * properties to the context and evaluate everything.
     *
     *
     * @return {?}
     */
    ngDoCheck() {
        if (this.viewInitialized) {
            this.hasObject = this._hasObject();
            // MetaContextComponent.stackDepth++;
            this.pushPop(true);
            // console.log(this.indent() + '=> ngDoCheck(CHANGED)', this.contextKey());
            if (isPresent(this.object) && !equals(this.prevObject, this.object)) {
                this.updateModel();
            }
        }
    }
    /**
     * We want to start detecting changes only after view is fully checked
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.viewInitialized) {
            // console.log(this.indent() + '=> ngAfterViewInit:', this.contextKey());
            // MetaContextComponent.stackDepth--;
            this.pushPop(false);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.viewInitialized) {
            // console.log(this.indent() + '=> ngAfterViewChecked:', this.contextKey());
            // MetaContextComponent.stackDepth--;
            this.pushPop(false);
        }
        else {
            this.viewInitialized = true;
        }
    }
    /**
     *
     * This is our key method that triggers all the interaction inside MetaUI world. Here we
     * push context keys and their values to the stack and this is the thing that triggers
     * rule recalculation which give us updated  properties. Those are then used by
     * MetaIncludeComponent to render the UI.
     *
     * myContext is current context for this MetaContext Component.
     *
     * @param {?} isPush identifies if we are pushing or popping to context stack
     * @return {?}
     */
    pushPop(isPush) {
        // console.log(this.indent() + '=> pushPop: isPush' + isPush, this.contextKey());
        let /** @type {?} */ activeContext = this.activeContext();
        assert(isPush || isPresent(activeContext), 'pop(): Missing context');
        let /** @type {?} */ forceCreate = isPush && (isPresent(this.pushNewContext) && this.pushNewContext);
        if (isBlank(activeContext) || forceCreate) {
            let /** @type {?} */ metaUI = UIMeta.getInstance();
            activeContext = metaUI.newContext(forceCreate);
            this.contextCreated = true;
            this.env.push(ACTIVE_CNTX, activeContext);
        }
        if (isPush) {
            activeContext.push();
            if (isPresent(this._scopeBinding) && this.hasObject) {
                this.beforeContextSet.emit(this._scopeBinding);
                activeContext.setScopeKey(this._scopeBinding);
                this.afterContextSet.emit(this._scopeBinding);
            }
            else {
                for (let /** @type {?} */ index = 0; index < this.bindingKeys.length; index++) {
                    let /** @type {?} */ key = this.bindingKeys[index];
                    let /** @type {?} */ value = this.bindingsMap.get(key);
                    this.beforeContextSet.emit(value);
                    activeContext.set(key, value);
                    this.afterContextSet.emit(value);
                }
            }
            // Save created content to local MetaContext
            this._myContext = activeContext.snapshot().hydrate(false);
        }
        else {
            activeContext.pop();
            if (this.contextCreated) {
                this.env.pop(ACTIVE_CNTX);
            }
        }
    }
    /**
     * Just for troubleshooting to print current context and assignments
     *
     * @return {?}
     */
    debugString() {
        if (isPresent(this._myContext)) {
            return this._myContext.debugString();
        }
    }
    /**
     *
     * Every meta context component which pushing certain properties to stack has its own context
     * that lives until component is destroyed
     *
     * @return {?}
     */
    myContext() {
        return this._myContext;
        // let cnxKey = this.contextKey();
        // return this.env.getValue(cnxKey);
    }
    /**
     * We keep the most current and latest context to environment to be read by any Child
     * MetaContext for purpose of creation new context and it needs info what was already pushed
     * onto the stack.
     *
     * @return {?}
     */
    activeContext() {
        return this.env.peak(ACTIVE_CNTX);
    }
    /**
     * Let's clean up and destroy pushed context
     * @return {?}
     */
    ngOnDestroy() {
        if (this.env.hasValue('parent-cnx')) {
            this.env.deleteValue('parent-cnx');
        }
    }
    /**
     * Ideally we do not need this method if Angular would support to pass variable number of
     * bindings without a need to have backup property for each of the bindings or expression./
     *
     * Once they support. we can remove this. Since this check what are known bindings passed,
     * meaning the ones decorated with \@Input and the rest
     *
     * @return {?}
     */
    initBindings() {
        this.bindingsMap = new Map();
        let /** @type {?} */ nativeElement = this.elementRef.nativeElement;
        this.initImplicitBindings();
        for (let /** @type {?} */ i = 0; i < nativeElement.attributes.length; i++) {
            let /** @type {?} */ attr = nativeElement.attributes.item(i);
            if (this.ignoreBinding(attr)) {
                continue;
            }
            if (isPresent(attr.name) && attr.name.toLowerCase() === 'scopekey') {
                this._scopeBinding = attr.value;
            }
            else {
                this.bindingsMap.set(attr.name, attr.value);
            }
        }
        this.bindingKeys = [];
        this.bindingsMap.forEach((value, key) => {
            this.bindingKeys.push(key);
        });
        // Sort them by their importance or rank
        ListWrapper.sortByExample(this.bindingKeys, IMPLICIT_PROPERTIES);
    }
    /**
     * The thing we want is to pass variable number of bindings and resolve them programmatically.
     * Currently in Angular we cannot do this we have these set of properties where we expect
     * some expression, some dynamic properties. For the rest we expect only string literal to be
     * passed in therefore we can resolve them with nativeElement.attributes
     *
     * @return {?}
     */
    initImplicitBindings() {
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
    }
    /**
     *
     * Since we are going thru the element' attributes we want to skip anything that has nothign
     * to do with us.
     *
     * @param {?} attr
     * @return {?}
     */
    ignoreBinding(attr) {
        return IMPLICIT_PROPERTIES.indexOf(attr.name) !== -1 ||
            StringWrapper.contains(attr.name, '_ng') ||
            StringWrapper.contains(attr.name, 'ng-') ||
            StringWrapper.contains(attr.name, '(') ||
            (isBlank(attr.value) || attr.value.length === 0);
    }
    /**
     * If object is changed we need to also update our angular model to reflect user changes. All
     * changes and updates in metaui use object references
     * @return {?}
     */
    updateModel() {
        let /** @type {?} */ fields = Object.keys(this.object);
        fields.forEach((field) => {
            let /** @type {?} */ control = /** @type {?} */ (this.formGroup.get(field));
            if (isPresent(control)) {
                control.patchValue(this.object[field], { onlySelf: false, emitEvent: true });
            }
        });
        this.prevObject = Object.assign({}, this.object);
    }
    /**
     * @return {?}
     */
    _hasObject() {
        let /** @type {?} */ context = this.activeContext();
        if (isPresent(context)) {
            return isPresent((/** @type {?} */ (context)).object);
        }
        return false;
    }
}
MetaContextComponent.decorators = [
    { type: Component, args: [{
                selector: 'm-context',
                template: '<ng-content></ng-content>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    { provide: BaseFormComponent, useExisting: forwardRef(() => MetaContextComponent) }
                ]
            },] },
];
/** @nocollapse */
MetaContextComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Environment },
    { type: BaseFormComponent, decorators: [{ type: SkipSelf }, { type: Optional }, { type: Inject, args: [forwardRef(() => BaseFormComponent),] }] }
];
MetaContextComponent.propDecorators = {
    module: [{ type: Input }],
    layout: [{ type: Input }],
    operation: [{ type: Input }],
    class: [{ type: Input }],
    object: [{ type: Input }],
    actionCategory: [{ type: Input }],
    action: [{ type: Input }],
    field: [{ type: Input }],
    pushNewContext: [{ type: Input }],
    beforeContextSet: [{ type: Output }],
    onContextChanged: [{ type: Output }],
    afterContextSet: [{ type: Output }],
    onAction: [{ type: Output }]
};
function MetaContextComponent_tsickle_Closure_declarations() {
    /**
     * Currently there are set of properties which can be passed as expression and therefore they
     * need to be resolved by angular. Angular does not have such option to provide flexible
     * number of Inputs. All needs to be pre-defined. If you want to pass in an
     * expression it must be defined as input. Otherwise any other attributes will be treated as
     * strings.
     * @type {?}
     */
    MetaContextComponent.prototype.module;
    /** @type {?} */
    MetaContextComponent.prototype.layout;
    /** @type {?} */
    MetaContextComponent.prototype.operation;
    /** @type {?} */
    MetaContextComponent.prototype.class;
    /** @type {?} */
    MetaContextComponent.prototype.object;
    /** @type {?} */
    MetaContextComponent.prototype.actionCategory;
    /** @type {?} */
    MetaContextComponent.prototype.action;
    /** @type {?} */
    MetaContextComponent.prototype.field;
    /** @type {?} */
    MetaContextComponent.prototype.pushNewContext;
    /** @type {?} */
    MetaContextComponent.prototype.beforeContextSet;
    /** @type {?} */
    MetaContextComponent.prototype.onContextChanged;
    /** @type {?} */
    MetaContextComponent.prototype.afterContextSet;
    /** @type {?} */
    MetaContextComponent.prototype.onAction;
    /**
     * Flag that tells us that component is fully rendered
     *
     * @type {?}
     */
    MetaContextComponent.prototype.viewInitialized;
    /**
     *
     * Marks MetaContext or the root MetaContext that created a new Context
     *
     * @type {?}
     */
    MetaContextComponent.prototype.contextCreated;
    /** @type {?} */
    MetaContextComponent.prototype.bindingsMap;
    /** @type {?} */
    MetaContextComponent.prototype.bindingKeys;
    /**
     * Shell copy of an object used for comparision. We may get back to the original solution which
     * I had here. THe Angular's differs
     * @type {?}
     */
    MetaContextComponent.prototype.prevObject;
    /** @type {?} */
    MetaContextComponent.prototype._scopeBinding;
    /** @type {?} */
    MetaContextComponent.prototype._myContext;
    /**
     * Need to cache if we already have object or not in case we load data from REST where it
     * could be deferred and not available when component is initialized
     * @type {?}
     */
    MetaContextComponent.prototype.hasObject;
    /** @type {?} */
    MetaContextComponent.prototype.elementRef;
    /** @type {?} */
    MetaContextComponent.prototype.env;
    /** @type {?} */
    MetaContextComponent.prototype.parentContainer;
}
/**
 *
 * Defines format for the broadcasted action event. MetaUI can also execute actions which needs to
 * be handled by application or actual component using this m-context.
 *
 */
export class MetaUIActionEvent {
    /**
     * @param {?} component
     * @param {?} eventName
     * @param {?} cnxName
     * @param {?} data
     */
    constructor(component, eventName, cnxName, data) {
        this.component = component;
        this.eventName = eventName;
        this.cnxName = cnxName;
        this.data = data;
    }
}
function MetaUIActionEvent_tsickle_Closure_declarations() {
    /**
     * What component trigered action
     * @type {?}
     */
    MetaUIActionEvent.prototype.component;
    /**
     * Name of the action. Usually name of the \@Output of actual component
     * @type {?}
     */
    MetaUIActionEvent.prototype.eventName;
    /**
     * Actions or event that are broadcasted can be wrapped with \@action or \@layout
     * which has its name. We want to also send out this name to the application to
     * know what metaui action or layout triggered this
     * @type {?}
     */
    MetaUIActionEvent.prototype.cnxName;
    /**
     * Any data that you can pass
     * @type {?}
     */
    MetaUIActionEvent.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb250ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW1CQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBRU4sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUNYLE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNULFdBQVcsRUFDWCxhQUFhLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUFxRHRELE1BQU0sQ0FBQyx1QkFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQ3ZDLHVCQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7OztBQUtwQyx1QkFBTSxtQkFBbUIsR0FBRztJQUN4QixRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxPQUFPO0lBQ3ZGLGdCQUFnQjtDQUNuQixDQUFDO0FBR0YsdUJBQU0sb0JBQW9CLEdBQUc7SUFDekIsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCO0NBQ2hGLENBQUM7QUFZRixNQUFNLDJCQUE0QixTQUFRLGlCQUFpQjs7Ozs7O0lBdUV2RCxZQUFvQixVQUFzQixFQUFTLEdBQWdCLEVBRTdDLGVBQWtDO1FBRXBELEtBQUss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QUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSzs2QkFFTCxLQUFLOytCQUdMLE1BQU07K0JBR04sTUFBTTs4QkFHTixNQUFNO3VCQUlOLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4WVgsTUFBTTs7Ozs7OztJQUdGLFlBR21CLFdBSUEsV0FNQSxTQUlBO1FBZEEsY0FBUyxHQUFULFNBQVM7UUFJVCxjQUFTLEdBQVQsU0FBUztRQU1ULFlBQU8sR0FBUCxPQUFPO1FBSVAsU0FBSSxHQUFKLElBQUk7S0FHdEI7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEJhc2VkIG9uIG9yaWdpbmFsIHdvcms6IE1ldGFVSTogQ3JhaWcgRmVkZXJpZ2hpICgyMDA4KVxuICpcbiAqL1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlLFxuICAgIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBhc3NlcnQsXG4gICAgRW52aXJvbm1lbnQsXG4gICAgZXF1YWxzLFxuICAgIGlzQmxhbmssXG4gICAgaXNQcmVzZW50LFxuICAgIExpc3RXcmFwcGVyLFxuICAgIFN0cmluZ1dyYXBwZXJcbn0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5pbXBvcnQge1VJTWV0YX0gZnJvbSAnLi4vLi4vY29yZS91aW1ldGEnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuLi8uLi9jb3JlL2NvbnRleHQnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCYXNlRm9ybUNvbXBvbmVudH0gZnJvbSAnQGFyaWJhdWkvY29tcG9uZW50cyc7XG5pbXBvcnQge1VJQ29udGV4dH0gZnJvbSAnLi4vY29udGV4dCc7XG5cblxuLyoqXG4gKlxuICogTWV0YUNvbnRleHQgKG0tY29udGV4dCkgZW5hYmxlcyBtYW5pcHVsYXRpb24gb2YgYSBNZXRhVUkgQ29udGV4dCBhcyBwYXJ0IG9mIHRoZSBBbmd1bGFyJ3NcbiAqIGNvbXBvbmVudCBwcm9jZXNzaW5nLlxuICpcbiAqIFRoZSBNZXRhQ29udGV4dCB0YWcgd2lsbCBmaW5kIHRoZSBjdXJyZW50IENvbnRleHQgaW4gdGhlIEVudmlyb25tZW50J2VudiBvciB3aWxsXG4gKiBjcmVhdGUgb25lLCB3aWxsIHB1c2goKSBhIG9uZSBsZXZlbCBvbiB0aGUgQ29udGV4dCwgc2V0KCkgYWxsIG9mIGl0cyBiaW5kaW5ncyBhcyBrZXkvdmFsdWVzLFxuICogcmVuZGVyIGl0cyBjb250ZW50LCAgU2luY2UgaXRzIGNvbnRlbnQgbWF5IGNvbnRhaW4gY29tcG9uZW50IHRoYXQgZnVydGhlciB1c2VcbiAqIE1ldGFDb250ZXh0LCBhZGRpdGlvbmFsIG5lc3RlZCBjb250ZXh0IG1hbmlwdWxhdGlvbnMgbWF5IG9jY3VyLlxuICpcbiAqICMjIyBTaW1wbGUgZXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqXG4gKiAgICAgIDxtLWNvbnRleHQgW29iamVjdF09J2NoZWNrUmVxdWVzdCcgb3BlcmF0aW9uPSdlZGl0JyBsYXlvdXQ9J0luc3BlY3QnPlxuICogICAgICAgICAgPG0taW5jbHVkZS1jb21wb25lbnQ+PC9tLWluY2x1ZGUtY29tcG9uZW50PlxuICogICAgICAgPC9tLWNvbnRleHQ+XG4gKlxuICogYGBgXG4gKlxuICpcbiAqIEdlbmVyYWxseSwgTWV0YUNvbnRleHQgdHJlYXRzIGl0cyBiaW5kaW5ncyBhcyBhIHZlcmJhdGltIGxpc3Qgb2Yga2V5cy92YWx1ZXMgdG8gYmUgc2V0KClcbiAqIG9uIHRoZSBjb250ZXh0IChpLmUuIHRoZSBiaW5kaW5ncyBhYm92ZSBvbiAnb2JqZWN0JywgJ2xheW91dCcsICdvcGVyYXRpb24nLCBhbmQgJ2ZpZWxkJ1xuICogYXJlIG5vdCBwcmVkZWZpbmVkIGJ5IE1ldGFDb250ZXh0KS5cbiAqXG4gKiBBbHRob3VnaCB3ZSB0cmVhdCBzb21lIGJpbmRpbmdzIGluIHNwZWNpYWwgd2F5IGFzIHdlIGV4cGVjdCB0aGVtIHRvIGJlIHBhc3NlZCBpbiBhcyBleHByZXNzaW9uXG4gKiB0aGVyZWZvcmUgdGhleSBuZWVkIGJlIGRlZmluZWQgYXMgQElucHV0KCkuIFRoZSByZXN0IHdlIHRyZWFkIGlzIHB1cmUga2V5cy92YWx1ZXMgc3RyaW5nc1xuICpcbiAqIEZpcnN0IHRpbWUgd2hlbiBjb21wb25lbnQgaXMgY3JlYXRlZCB3ZSB1c2UgbmdPbkluaXQoKSB0byBwdXNoIHZhbHVlcyBhbmQgbmdBZnRlclZpZXdJbml0KCkgdG9cbiAqIHBvcCB2YWx1ZXMuIFRoZSBwdXNoL3BvcCBsb29rcyBzb21ldGhpbmcgbGlrZSB0aGlzOlxuICpcbiAqIDxOb2RlMT4gLSBQVVNIXG4gKiAgICAgIDxOb2RlMj4gLSBQVVNIXG4gKiAgICAgICAgICA8Tm9kZTM+IC0gUFVTSFxuICogICAgICAgICAgPE5vZGUzPiAtIFBPUFxuICogICAgICA8Tm9kZTI+IC0gUE9QXG4gKiA8Tm9kZTE+IC0gUE9QXG4gKlxuICpcbiAqIEFmdGVyIGNvbXBvbmVudCBpcyBmdWxseSBpbml0aWFsaXplZCBhbmQgcmVuZGVyZWQgIHRoZW4gd2UgdXNlIG5nRG9DaGVjaygpIHRvIHB1c2goKSBhbmRcbiAqIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHRvIHBvcCgpIHZhbHVlcy5cbiAqXG4gKi9cblxuXG4vKipcbiAqIENvbnN0YW50IHJlcHJlc2VudCBjdXJyZW50IGFjdGl2ZSBhbmQgbWFpbmx5IGxhdGVzdCBDb250ZXh0XG4gKlxuICovXG5leHBvcnQgY29uc3QgQUNUSVZFX0NOVFggPSAnQ3VycmVudE1DJztcbmNvbnN0IENOVFhfQ0hBTkdFRCA9ICdDbnR4X0NoYW5nZWQnO1xuXG5cbi8vIGRlZmluZSBzZXQgb2YgcHJvcGVydGllcyB3aGljaCB3aWxsIGJlIHNraXBwZWQgYXMgdGhleSBhcmUgZGVmaW5lZCBhcyBpbnB1dHMgb3IgIGFkZGVkIGJ5XG4vLyBhbmd1bGFyXG5jb25zdCBJTVBMSUNJVF9QUk9QRVJUSUVTID0gW1xuICAgICdtb2R1bGUnLCAnbGF5b3V0JywgJ29wZXJhdGlvbicsICdjbGFzcycsICdvYmplY3QnLCAnYWN0aW9uQ2F0ZWdvcnknLCAnYWN0aW9uJywgJ2ZpZWxkJyxcbiAgICAncHVzaE5ld0NvbnRleHQnXG5dO1xuXG5cbmNvbnN0IElNTVVUQUJMRV9QUk9QRVJUSUVTID0gW1xuICAgICdtb2R1bGUnLCAnbGF5b3V0JywgJ29wZXJhdGlvbicsICdjbGFzcycsICdhY3Rpb24nLCAnZmllbGQnLCAncHVzaE5ld0NvbnRleHQnXG5dO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbS1jb250ZXh0JyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBCYXNlRm9ybUNvbXBvbmVudCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWV0YUNvbnRleHRDb21wb25lbnQpfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWV0YUNvbnRleHRDb21wb25lbnQgZXh0ZW5kcyBCYXNlRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSxcbiAgICBBZnRlclZpZXdJbml0LCBBZnRlclZpZXdDaGVja2VkXG57XG4gICAgLyoqXG4gICAgICogQ3VycmVudGx5IHRoZXJlIGFyZSBzZXQgb2YgcHJvcGVydGllcyB3aGljaCBjYW4gYmUgcGFzc2VkIGFzIGV4cHJlc3Npb24gYW5kIHRoZXJlZm9yZSB0aGV5XG4gICAgICogbmVlZCB0byBiZSByZXNvbHZlZCBieSBhbmd1bGFyLiBBbmd1bGFyIGRvZXMgbm90IGhhdmUgc3VjaCBvcHRpb24gdG8gcHJvdmlkZSBmbGV4aWJsZVxuICAgICAqIG51bWJlciBvZiBJbnB1dHMuIEFsbCBuZWVkcyB0byBiZSBwcmUtZGVmaW5lZC4gSWYgeW91IHdhbnQgdG8gcGFzcyBpbiBhblxuICAgICAqIGV4cHJlc3Npb24gaXQgbXVzdCBiZSBkZWZpbmVkIGFzIGlucHV0LiBPdGhlcndpc2UgYW55IG90aGVyIGF0dHJpYnV0ZXMgd2lsbCBiZSB0cmVhdGVkIGFzXG4gICAgICogc3RyaW5ncy5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBtb2R1bGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBsYXlvdXQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBvcGVyYXRpb246IHN0cmluZztcbiAgICBASW5wdXQoKSBjbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG9iamVjdDogYW55O1xuICAgIEBJbnB1dCgpIGFjdGlvbkNhdGVnb3J5OiBhbnk7XG4gICAgQElucHV0KCkgYWN0aW9uOiBhbnk7XG4gICAgQElucHV0KCkgZmllbGQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHB1c2hOZXdDb250ZXh0OiBib29sZWFuO1xuXG5cbiAgICBAT3V0cHV0KClcbiAgICBiZWZvcmVDb250ZXh0U2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIG9uQ29udGV4dENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgYWZ0ZXJDb250ZXh0U2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgQE91dHB1dCgpXG4gICAgb25BY3Rpb246IEV2ZW50RW1pdHRlcjxNZXRhVUlBY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEZsYWcgdGhhdCB0ZWxscyB1cyB0aGF0IGNvbXBvbmVudCBpcyBmdWxseSByZW5kZXJlZFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSB2aWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogTWFya3MgTWV0YUNvbnRleHQgb3IgdGhlIHJvb3QgTWV0YUNvbnRleHQgdGhhdCBjcmVhdGVkIGEgbmV3IENvbnRleHRcbiAgICAgKlxuICAgICAqL1xuICAgIHByaXZhdGUgY29udGV4dENyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgYmluZGluZ3NNYXA6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgcHJpdmF0ZSBiaW5kaW5nS2V5czogc3RyaW5nW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFNoZWxsIGNvcHkgb2YgYW4gb2JqZWN0IHVzZWQgZm9yIGNvbXBhcmlzaW9uLiBXZSBtYXkgZ2V0IGJhY2sgdG8gdGhlIG9yaWdpbmFsIHNvbHV0aW9uIHdoaWNoXG4gICAgICogSSBoYWQgaGVyZS4gVEhlIEFuZ3VsYXIncyBkaWZmZXJzXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmV2T2JqZWN0OiBhbnk7XG5cbiAgICBwcml2YXRlIF9zY29wZUJpbmRpbmc6IHN0cmluZztcblxuICAgIC8vIHByaXZhdGUgc3RhdGljIHN0YWNrRGVwdGggPSAwO1xuXG5cbiAgICBfbXlDb250ZXh0OiBDb250ZXh0O1xuXG4gICAgLyoqXG4gICAgICogTmVlZCB0byBjYWNoZSBpZiB3ZSBhbHJlYWR5IGhhdmUgb2JqZWN0IG9yIG5vdCBpbiBjYXNlIHdlIGxvYWQgZGF0YSBmcm9tIFJFU1Qgd2hlcmUgaXRcbiAgICAgKiBjb3VsZCBiZSBkZWZlcnJlZCBhbmQgbm90IGF2YWlsYWJsZSB3aGVuIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZFxuICAgICAqL1xuICAgIGhhc09iamVjdDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHVibGljIGVudjogRW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICAgQFNraXBTZWxmKCkgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IEJhc2VGb3JtQ29tcG9uZW50KSlcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q29udGFpbmVyOiBCYXNlRm9ybUNvbXBvbmVudClcbiAgICB7XG4gICAgICAgIHN1cGVyKGVudiwgbnVsbCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5pbml0QmluZGluZ3MoKTtcbiAgICAgICAgdGhpcy5oYXNPYmplY3QgPSB0aGlzLl9oYXNPYmplY3QoKTtcblxuICAgICAgICAvLyBNZXRhQ29udGV4dENvbXBvbmVudC5zdGFja0RlcHRoKys7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaW5kZW50KCkgKyAnPT4gbmdPbkluaXQ6JywgdGhpcy5jb250ZXh0S2V5KCkpO1xuICAgICAgICAvLyBJbml0aWFsIHB1c2gsIHdoZW4gY29tcG9uZW50IGlzIGZpcnN0IGluaXRpYWxpemVkIHRoZSByZXN0IGlzIGRvbmUgYmFzZWQgb24gY2hhbmdlcy5cbiAgICAgICAgdGhpcy5wdXNoUG9wKHRydWUpO1xuXG4gICAgICAgIGlmICghdGhpcy5lbnYuaGFzVmFsdWUoJ3BhcmVudC1jbngnKSkge1xuICAgICAgICAgICAgdGhpcy5lbnYuc2V0VmFsdWUoJ3BhcmVudC1jbngnLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRm9yIGFueSBvdGhlciBpbW11dGFibGUgb2JqZWN0IGRldGVjdCBjaGFuZ2VzIGhlcmUgYW5kIHJlZnJlc2ggdGhlIGNvbnRleHQgc3RhY2tcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFuZ2VzXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1sgcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmluZGVudCgpICsgJyAgICA9PiBuZ09uQ2hhbmdlcycsIHRoaXMuY29udGV4dEtleSgpKTtcblxuXG4gICAgICAgIGZvciAobGV0IG5hbWUgb2YgSU1NVVRBQkxFX1BST1BFUlRJRVMpIHtcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlc1tuYW1lXSlcbiAgICAgICAgICAgICAgICAmJiAoY2hhbmdlc1tuYW1lXS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXNbbmFtZV0ucHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRCaW5kaW5ncygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGluIGNhc2Ugb2JqZWN0IGlzIGNvbWluZyBsYXRlIGUuZy4gZnJvbSBzb21lIHJlYWN0aXZlIEFQSSBsaWtlIFJFU1QgdGhlbiB3ZVxuICAgICAgICAvLyBkbyBub3QgZ2V0IGl0IGludG8gbmdJbml0IGJ1dCBpdCB3aWxsIGJlIGhlcmUuXG4gICAgICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCAmJiBpc1ByZXNlbnQoY2hhbmdlc1snb2JqZWN0J10pICYmIGlzUHJlc2VudCh0aGlzLm9iamVjdCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEJpbmRpbmdzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOZyBjaGVjayBpcyB0cmlnZ2VkIGFmdGVyIHZpZXcgaXMgZnVsbHkgaW5pYWxpemVkIGFuZCB3ZSB3YW50IHRvIHB1c2ggZXZlcnl0aGluZyBuZXdcbiAgICAgKiBwcm9wZXJ0aWVzIHRvIHRoZSBjb250ZXh0IGFuZCBldmFsdWF0ZSBldmVyeXRoaW5nLlxuICAgICAqXG4gICAgICpcbiAgICAgKi9cbiAgICBuZ0RvQ2hlY2soKTogdm9pZFxuICAgIHtcblxuICAgICAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzT2JqZWN0ID0gdGhpcy5faGFzT2JqZWN0KCk7XG5cbiAgICAgICAgICAgIC8vIE1ldGFDb250ZXh0Q29tcG9uZW50LnN0YWNrRGVwdGgrKztcblxuICAgICAgICAgICAgdGhpcy5wdXNoUG9wKHRydWUpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pbmRlbnQoKSArICc9PiBuZ0RvQ2hlY2soQ0hBTkdFRCknLCB0aGlzLmNvbnRleHRLZXkoKSk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5vYmplY3QpICYmICFlcXVhbHModGhpcy5wcmV2T2JqZWN0LCB0aGlzLm9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFdlIHdhbnQgdG8gc3RhcnQgZGV0ZWN0aW5nIGNoYW5nZXMgb25seSBhZnRlciB2aWV3IGlzIGZ1bGx5IGNoZWNrZWRcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pbmRlbnQoKSArICc9PiBuZ0FmdGVyVmlld0luaXQ6JywgdGhpcy5jb250ZXh0S2V5KCkpO1xuICAgICAgICAgICAgLy8gTWV0YUNvbnRleHRDb21wb25lbnQuc3RhY2tEZXB0aC0tO1xuICAgICAgICAgICAgdGhpcy5wdXNoUG9wKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pbmRlbnQoKSArICc9PiBuZ0FmdGVyVmlld0NoZWNrZWQ6JywgdGhpcy5jb250ZXh0S2V5KCkpO1xuICAgICAgICAgICAgLy8gTWV0YUNvbnRleHRDb21wb25lbnQuc3RhY2tEZXB0aC0tO1xuICAgICAgICAgICAgdGhpcy5wdXNoUG9wKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByaXZhdGUgaW5kZW50KCk6IHN0cmluZ1xuICAgIC8vIHtcbiAgICAvLyAgICAgbGV0IGluZCA9ICcnO1xuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1ldGFDb250ZXh0Q29tcG9uZW50LnN0YWNrRGVwdGg7IGkrKykge1xuICAgIC8vICAgICAgICAgaW5kICs9ICdcXHRcXHRcXHQgJztcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIHJldHVybiBpbmQ7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG91ciBrZXkgbWV0aG9kIHRoYXQgdHJpZ2dlcnMgYWxsIHRoZSBpbnRlcmFjdGlvbiBpbnNpZGUgTWV0YVVJIHdvcmxkLiBIZXJlIHdlXG4gICAgICogcHVzaCBjb250ZXh0IGtleXMgYW5kIHRoZWlyIHZhbHVlcyB0byB0aGUgc3RhY2sgYW5kIHRoaXMgaXMgdGhlIHRoaW5nIHRoYXQgdHJpZ2dlcnNcbiAgICAgKiBydWxlIHJlY2FsY3VsYXRpb24gd2hpY2ggZ2l2ZSB1cyB1cGRhdGVkICBwcm9wZXJ0aWVzLiBUaG9zZSBhcmUgdGhlbiB1c2VkIGJ5XG4gICAgICogTWV0YUluY2x1ZGVDb21wb25lbnQgdG8gcmVuZGVyIHRoZSBVSS5cbiAgICAgKlxuICAgICAqIG15Q29udGV4dCBpcyBjdXJyZW50IGNvbnRleHQgZm9yIHRoaXMgTWV0YUNvbnRleHQgQ29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlzUHVzaCBpZGVudGlmaWVzIGlmIHdlIGFyZSBwdXNoaW5nIG9yIHBvcHBpbmcgdG8gY29udGV4dCBzdGFja1xuICAgICAqL1xuICAgIHByaXZhdGUgcHVzaFBvcChpc1B1c2g6IGJvb2xlYW4pOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmluZGVudCgpICsgJz0+IHB1c2hQb3A6IGlzUHVzaCcgKyBpc1B1c2gsIHRoaXMuY29udGV4dEtleSgpKTtcbiAgICAgICAgbGV0IGFjdGl2ZUNvbnRleHQ6IENvbnRleHQgPSB0aGlzLmFjdGl2ZUNvbnRleHQoKTtcbiAgICAgICAgYXNzZXJ0KGlzUHVzaCB8fCBpc1ByZXNlbnQoYWN0aXZlQ29udGV4dCksICdwb3AoKTogTWlzc2luZyBjb250ZXh0Jyk7XG5cbiAgICAgICAgbGV0IGZvcmNlQ3JlYXRlID0gaXNQdXNoICYmIChpc1ByZXNlbnQodGhpcy5wdXNoTmV3Q29udGV4dCkgJiYgdGhpcy5wdXNoTmV3Q29udGV4dCk7XG4gICAgICAgIGlmIChpc0JsYW5rKGFjdGl2ZUNvbnRleHQpIHx8IGZvcmNlQ3JlYXRlKSB7XG4gICAgICAgICAgICBsZXQgbWV0YVVJID0gVUlNZXRhLmdldEluc3RhbmNlKCk7XG4gICAgICAgICAgICBhY3RpdmVDb250ZXh0ID0gbWV0YVVJLm5ld0NvbnRleHQoZm9yY2VDcmVhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRleHRDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW52LnB1c2g8Q29udGV4dD4oQUNUSVZFX0NOVFgsIGFjdGl2ZUNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUHVzaCkge1xuICAgICAgICAgICAgYWN0aXZlQ29udGV4dC5wdXNoKCk7XG5cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fc2NvcGVCaW5kaW5nKSAmJiB0aGlzLmhhc09iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5iZWZvcmVDb250ZXh0U2V0LmVtaXQodGhpcy5fc2NvcGVCaW5kaW5nKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVDb250ZXh0LnNldFNjb3BlS2V5KHRoaXMuX3Njb3BlQmluZGluZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZnRlckNvbnRleHRTZXQuZW1pdCh0aGlzLl9zY29wZUJpbmRpbmcpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmJpbmRpbmdLZXlzLmxlbmd0aDsgaW5kZXgrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLmJpbmRpbmdLZXlzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5iaW5kaW5nc01hcC5nZXQoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZUNvbnRleHRTZXQuZW1pdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNvbnRleHQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyQ29udGV4dFNldC5lbWl0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTYXZlIGNyZWF0ZWQgY29udGVudCB0byBsb2NhbCBNZXRhQ29udGV4dFxuICAgICAgICAgICAgdGhpcy5fbXlDb250ZXh0ID0gYWN0aXZlQ29udGV4dC5zbmFwc2hvdCgpLmh5ZHJhdGUoZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlQ29udGV4dC5wb3AoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dENyZWF0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudi5wb3A8Q29udGV4dD4oQUNUSVZFX0NOVFgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSnVzdCBmb3IgdHJvdWJsZXNob290aW5nIHRvIHByaW50IGN1cnJlbnQgY29udGV4dCBhbmQgYXNzaWdubWVudHNcbiAgICAgKlxuICAgICAqL1xuICAgIGRlYnVnU3RyaW5nKCk6IFN0cmluZ1xuICAgIHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9teUNvbnRleHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbXlDb250ZXh0LmRlYnVnU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3IgZGVidWdnaW5nIHRvIGlkZW50aWZ5IGN1cnJlbnQga2V5XG4gICAgICovXG4gICAgLy8gY29udGV4dEtleSgpOiBzdHJpbmdcbiAgICAvLyB7XG4gICAgLy8gICAgIGxldCBjbnhLZXkgPSAnJztcbiAgICAvLyAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmJpbmRpbmdLZXlzKSAmJiB0aGlzLmJpbmRpbmdLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgICAgIHRoaXMuYmluZGluZ0tleXMuZm9yRWFjaCgobmFtZSkgPT5cbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgY254S2V5ICs9IG5hbWU7XG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgY254S2V5ICs9IG5hbWUgKyB0aGlzLmJpbmRpbmdzTWFwLmdldChuYW1lKTtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy9cbiAgICAvL1xuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMuX3Njb3BlQmluZGluZykpIHtcbiAgICAvLyAgICAgICAgIGNueEtleSArPSB0aGlzLl9zY29wZUJpbmRpbmc7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcmV0dXJuIGNueEtleTtcbiAgICAvLyB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogRXZlcnkgbWV0YSBjb250ZXh0IGNvbXBvbmVudCB3aGljaCBwdXNoaW5nIGNlcnRhaW4gcHJvcGVydGllcyB0byBzdGFjayBoYXMgaXRzIG93biBjb250ZXh0XG4gICAgICogdGhhdCBsaXZlcyB1bnRpbCBjb21wb25lbnQgaXMgZGVzdHJveWVkXG4gICAgICpcbiAgICAgKi9cbiAgICBteUNvbnRleHQoKTogQ29udGV4dFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX215Q29udGV4dDtcbiAgICAgICAgLy8gbGV0IGNueEtleSA9IHRoaXMuY29udGV4dEtleSgpO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5lbnYuZ2V0VmFsdWUoY254S2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBrZWVwIHRoZSBtb3N0IGN1cnJlbnQgYW5kIGxhdGVzdCBjb250ZXh0IHRvIGVudmlyb25tZW50IHRvIGJlIHJlYWQgYnkgYW55IENoaWxkXG4gICAgICogTWV0YUNvbnRleHQgZm9yIHB1cnBvc2Ugb2YgY3JlYXRpb24gbmV3IGNvbnRleHQgYW5kIGl0IG5lZWRzIGluZm8gd2hhdCB3YXMgYWxyZWFkeSBwdXNoZWRcbiAgICAgKiBvbnRvIHRoZSBzdGFjay5cbiAgICAgKlxuICAgICAqL1xuICAgIGFjdGl2ZUNvbnRleHQoKTogQ29udGV4dFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52LnBlYWs8Q29udGV4dD4oQUNUSVZFX0NOVFgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTGV0J3MgY2xlYW4gdXAgYW5kIGRlc3Ryb3kgcHVzaGVkIGNvbnRleHRcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpXG4gICAge1xuXG4gICAgICAgIGlmICh0aGlzLmVudi5oYXNWYWx1ZSgncGFyZW50LWNueCcpKSB7XG4gICAgICAgICAgICB0aGlzLmVudi5kZWxldGVWYWx1ZSgncGFyZW50LWNueCcpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJZGVhbGx5IHdlIGRvIG5vdCBuZWVkIHRoaXMgbWV0aG9kIGlmIEFuZ3VsYXIgd291bGQgc3VwcG9ydCB0byBwYXNzIHZhcmlhYmxlIG51bWJlciBvZlxuICAgICAqIGJpbmRpbmdzIHdpdGhvdXQgYSBuZWVkIHRvIGhhdmUgYmFja3VwIHByb3BlcnR5IGZvciBlYWNoIG9mIHRoZSBiaW5kaW5ncyBvciBleHByZXNzaW9uLi9cbiAgICAgKlxuICAgICAqIE9uY2UgdGhleSBzdXBwb3J0LiB3ZSBjYW4gcmVtb3ZlIHRoaXMuIFNpbmNlIHRoaXMgY2hlY2sgd2hhdCBhcmUga25vd24gYmluZGluZ3MgcGFzc2VkLFxuICAgICAqIG1lYW5pbmcgdGhlIG9uZXMgZGVjb3JhdGVkIHdpdGggQElucHV0IGFuZCB0aGUgcmVzdFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0QmluZGluZ3MoKVxuICAgIHtcbiAgICAgICAgdGhpcy5iaW5kaW5nc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIGxldCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5pbml0SW1wbGljaXRCaW5kaW5ncygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGF0dHI6IEF0dHIgPSBuYXRpdmVFbGVtZW50LmF0dHJpYnV0ZXMuaXRlbShpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlnbm9yZUJpbmRpbmcoYXR0cikpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoYXR0ci5uYW1lKSAmJiBhdHRyLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3Njb3Bla2V5Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3BlQmluZGluZyA9IGF0dHIudmFsdWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kaW5nc01hcC5zZXQoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJpbmRpbmdLZXlzID0gW107XG4gICAgICAgIHRoaXMuYmluZGluZ3NNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nS2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNvcnQgdGhlbSBieSB0aGVpciBpbXBvcnRhbmNlIG9yIHJhbmtcbiAgICAgICAgTGlzdFdyYXBwZXIuc29ydEJ5RXhhbXBsZSh0aGlzLmJpbmRpbmdLZXlzLCBJTVBMSUNJVF9QUk9QRVJUSUVTKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoZSB0aGluZyB3ZSB3YW50IGlzIHRvIHBhc3MgdmFyaWFibGUgbnVtYmVyIG9mIGJpbmRpbmdzIGFuZCByZXNvbHZlIHRoZW0gcHJvZ3JhbW1hdGljYWxseS5cbiAgICAgKiBDdXJyZW50bHkgaW4gQW5ndWxhciB3ZSBjYW5ub3QgZG8gdGhpcyB3ZSBoYXZlIHRoZXNlIHNldCBvZiBwcm9wZXJ0aWVzIHdoZXJlIHdlIGV4cGVjdFxuICAgICAqIHNvbWUgZXhwcmVzc2lvbiwgc29tZSBkeW5hbWljIHByb3BlcnRpZXMuIEZvciB0aGUgcmVzdCB3ZSBleHBlY3Qgb25seSBzdHJpbmcgbGl0ZXJhbCB0byBiZVxuICAgICAqIHBhc3NlZCBpbiB0aGVyZWZvcmUgd2UgY2FuIHJlc29sdmUgdGhlbSB3aXRoIG5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlc1xuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0SW1wbGljaXRCaW5kaW5ncygpXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubW9kdWxlKSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc01hcC5zZXQoJ21vZHVsZScsIHRoaXMubW9kdWxlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMubGF5b3V0KSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc01hcC5zZXQoJ2xheW91dCcsIHRoaXMubGF5b3V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub3BlcmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc01hcC5zZXQoJ29wZXJhdGlvbicsIHRoaXMub3BlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuY2xhc3MpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldCgnY2xhc3MnLCB0aGlzLmNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMub2JqZWN0KSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc01hcC5zZXQoJ29iamVjdCcsIHRoaXMub2JqZWN0KTtcbiAgICAgICAgICAgIHRoaXMucHJldk9iamVjdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYWN0aW9uQ2F0ZWdvcnkpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldCgnYWN0aW9uQ2F0ZWdvcnknLCB0aGlzLmFjdGlvbkNhdGVnb3J5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYWN0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc01hcC5zZXQoJ2FjdGlvbicsIHRoaXMuYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZmllbGQpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldCgnZmllbGQnLCB0aGlzLmZpZWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogU2luY2Ugd2UgYXJlIGdvaW5nIHRocnUgdGhlIGVsZW1lbnQnIGF0dHJpYnV0ZXMgd2Ugd2FudCB0byBza2lwIGFueXRoaW5nIHRoYXQgaGFzIG5vdGhpZ25cbiAgICAgKiB0byBkbyB3aXRoIHVzLlxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpZ25vcmVCaW5kaW5nKGF0dHI6IEF0dHIpXG4gICAge1xuICAgICAgICByZXR1cm4gSU1QTElDSVRfUFJPUEVSVElFUy5pbmRleE9mKGF0dHIubmFtZSkgIT09IC0xIHx8XG4gICAgICAgICAgICBTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGF0dHIubmFtZSwgJ19uZycpIHx8XG4gICAgICAgICAgICBTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGF0dHIubmFtZSwgJ25nLScpIHx8XG4gICAgICAgICAgICBTdHJpbmdXcmFwcGVyLmNvbnRhaW5zKGF0dHIubmFtZSwgJygnKSB8fFxuICAgICAgICAgICAgKGlzQmxhbmsoYXR0ci52YWx1ZSkgfHwgYXR0ci52YWx1ZS5sZW5ndGggPT09IDApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSWYgb2JqZWN0IGlzIGNoYW5nZWQgd2UgbmVlZCB0byBhbHNvIHVwZGF0ZSBvdXIgYW5ndWxhciBtb2RlbCB0byByZWZsZWN0IHVzZXIgY2hhbmdlcy4gQWxsXG4gICAgICogY2hhbmdlcyBhbmQgdXBkYXRlcyBpbiBtZXRhdWkgdXNlIG9iamVjdCByZWZlcmVuY2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVNb2RlbCgpXG4gICAge1xuICAgICAgICBsZXQgZmllbGRzID0gT2JqZWN0LmtleXModGhpcy5vYmplY3QpO1xuICAgICAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGNvbnRyb2w6IEZvcm1Db250cm9sID0gPEZvcm1Db250cm9sPiB0aGlzLmZvcm1Hcm91cC5nZXQoZmllbGQpO1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChjb250cm9sKSkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh0aGlzLm9iamVjdFtmaWVsZF0sIHtvbmx5U2VsZjogZmFsc2UsIGVtaXRFdmVudDogdHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByZXZPYmplY3QgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9iamVjdCk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9oYXNPYmplY3QoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLmFjdGl2ZUNvbnRleHQoKTtcbiAgICAgICAgaWYgKGlzUHJlc2VudChjb250ZXh0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzUHJlc2VudCgoPFVJQ29udGV4dD4gY29udGV4dCkub2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5cbi8qKlxuICpcbiAqIERlZmluZXMgZm9ybWF0IGZvciB0aGUgYnJvYWRjYXN0ZWQgYWN0aW9uIGV2ZW50LiBNZXRhVUkgY2FuIGFsc28gZXhlY3V0ZSBhY3Rpb25zIHdoaWNoIG5lZWRzIHRvXG4gKiBiZSBoYW5kbGVkIGJ5IGFwcGxpY2F0aW9uIG9yIGFjdHVhbCBjb21wb25lbnQgdXNpbmcgdGhpcyBtLWNvbnRleHQuXG4gKlxuICovXG5leHBvcnQgY2xhc3MgTWV0YVVJQWN0aW9uRXZlbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKC8qKlxuICAgICAgICAgICAgICAgICAqIFdoYXQgY29tcG9uZW50IHRyaWdlcmVkIGFjdGlvblxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHB1YmxpYyBjb21wb25lbnQ6IGFueSxcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBOYW1lIG9mIHRoZSBhY3Rpb24uIFVzdWFsbHkgbmFtZSBvZiB0aGUgQE91dHB1dCBvZiBhY3R1YWwgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcHVibGljIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEFjdGlvbnMgb3IgZXZlbnQgdGhhdCBhcmUgYnJvYWRjYXN0ZWQgY2FuIGJlIHdyYXBwZWQgd2l0aCBAYWN0aW9uIG9yIEBsYXlvdXRcbiAgICAgICAgICAgICAgICAgKiB3aGljaCBoYXMgaXRzIG5hbWUuIFdlIHdhbnQgdG8gYWxzbyBzZW5kIG91dCB0aGlzIG5hbWUgdG8gdGhlIGFwcGxpY2F0aW9uIHRvXG4gICAgICAgICAgICAgICAgICoga25vdyB3aGF0IG1ldGF1aSBhY3Rpb24gb3IgbGF5b3V0IHRyaWdnZXJlZCB0aGlzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcHVibGljIGNueE5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBbnkgZGF0YSB0aGF0IHlvdSBjYW4gcGFzc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHB1YmxpYyBkYXRhOiBhbnkpXG4gICAge1xuXG4gICAgfVxufVxuXG5cbiJdfQ==