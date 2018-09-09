/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, SkipSelf } from '@angular/core';
import { assert, Environment, equals, isBlank, isPresent, ListWrapper, StringWrapper } from '@aribaui/core';
import { UIMeta } from '../../core/uimeta';
import { BaseFormComponent } from '@aribaui/components';
/** *
 * Constant represent current active and mainly latest Context
 *
  @type {?} */
export const ACTIVE_CNTX = 'CurrentMC';
/** @type {?} */
const CNTX_CHANGED = 'Cntx_Changed';
/** @type {?} */
const IMPLICIT_PROPERTIES = [
    'module', 'layout', 'operation', 'class', 'object', 'actionCategory', 'action', 'field',
    'pushNewContext'
];
/** @type {?} */
const IMMUTABLE_PROPERTIES = [
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
        for (let name of IMMUTABLE_PROPERTIES) {
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
        /** @type {?} */
        let activeContext = this.activeContext();
        assert(isPush || isPresent(activeContext), 'pop(): Missing context');
        /** @type {?} */
        let forceCreate = isPush && (isPresent(this.pushNewContext) && this.pushNewContext);
        if (isBlank(activeContext) || forceCreate) {
            /** @type {?} */
            let metaUI = UIMeta.getInstance();
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
                for (let index = 0; index < this.bindingKeys.length; index++) {
                    /** @type {?} */
                    let key = this.bindingKeys[index];
                    /** @type {?} */
                    let value = this.bindingsMap.get(key);
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
        /** @type {?} */
        let nativeElement = this.elementRef.nativeElement;
        this.initImplicitBindings();
        for (let i = 0; i < nativeElement.attributes.length; i++) {
            /** @type {?} */
            let attr = nativeElement.attributes.item(i);
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
        /** @type {?} */
        let fields = Object.keys(this.object);
        fields.forEach((field) => {
            /** @type {?} */
            let control = /** @type {?} */ (this.formGroup.get(field));
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
        /** @type {?} */
        let context = this.activeContext();
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
            }] }
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
if (false) {
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1jb250ZXh0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL21ldGF1aS8iLCJzb3VyY2VzIjpbImNvcmUvbWV0YS1jb250ZXh0L21ldGEtY29udGV4dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQW1CQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBRU4sUUFBUSxFQUNYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxNQUFNLEVBQ04sV0FBVyxFQUNYLE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNULFdBQVcsRUFDWCxhQUFhLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUFxRHRELGFBQWEsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7QUFDdkMsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDOztBQUtwQyxNQUFNLG1CQUFtQixHQUFHO0lBQ3hCLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE9BQU87SUFDdkYsZ0JBQWdCO0NBQ25CLENBQUM7O0FBR0YsTUFBTSxvQkFBb0IsR0FBRztJQUN6QixRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0I7Q0FDaEYsQ0FBQztBQVlGLE1BQU0sMkJBQTRCLFNBQVEsaUJBQWlCOzs7Ozs7SUF1RXZELFlBQW9CLFVBQXNCLEVBQVMsR0FBZ0IsRUFFN0MsZUFBa0M7UUFFcEQsS0FBSyxDQUFDLEdBQUcsRUFB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QUFLOzZCQUVMLEtBQUs7K0JBR0wsTUFBTTsrQkFHTixNQUFNOzhCQUdOLE1BQU07dUJBSU4sTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThZWCxNQUFNOzs7Ozs7O0lBR0YsWUFHbUIsV0FJQSxXQU1BLFNBSUE7UUFkQSxjQUFTLEdBQVQsU0FBUztRQUlULGNBQVMsR0FBVCxTQUFTO1FBTVQsWUFBTyxHQUFQLE9BQU87UUFJUCxTQUFJLEdBQUosSUFBSTtLQUd0QjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQmFzZWQgb24gb3JpZ2luYWwgd29yazogTWV0YVVJOiBDcmFpZyBGZWRlcmlnaGkgKDIwMDgpXG4gKlxuICovXG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBTaW1wbGVDaGFuZ2UsXG4gICAgU2tpcFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIGFzc2VydCxcbiAgICBFbnZpcm9ubWVudCxcbiAgICBlcXVhbHMsXG4gICAgaXNCbGFuayxcbiAgICBpc1ByZXNlbnQsXG4gICAgTGlzdFdyYXBwZXIsXG4gICAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdAYXJpYmF1aS9jb3JlJztcbmltcG9ydCB7VUlNZXRhfSBmcm9tICcuLi8uLi9jb3JlL3VpbWV0YSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4uLy4uL2NvcmUvY29udGV4dCc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Jhc2VGb3JtQ29tcG9uZW50fSBmcm9tICdAYXJpYmF1aS9jb21wb25lbnRzJztcbmltcG9ydCB7VUlDb250ZXh0fSBmcm9tICcuLi9jb250ZXh0JztcblxuXG4vKipcbiAqXG4gKiBNZXRhQ29udGV4dCAobS1jb250ZXh0KSBlbmFibGVzIG1hbmlwdWxhdGlvbiBvZiBhIE1ldGFVSSBDb250ZXh0IGFzIHBhcnQgb2YgdGhlIEFuZ3VsYXInc1xuICogY29tcG9uZW50IHByb2Nlc3NpbmcuXG4gKlxuICogVGhlIE1ldGFDb250ZXh0IHRhZyB3aWxsIGZpbmQgdGhlIGN1cnJlbnQgQ29udGV4dCBpbiB0aGUgRW52aXJvbm1lbnQnZW52IG9yIHdpbGxcbiAqIGNyZWF0ZSBvbmUsIHdpbGwgcHVzaCgpIGEgb25lIGxldmVsIG9uIHRoZSBDb250ZXh0LCBzZXQoKSBhbGwgb2YgaXRzIGJpbmRpbmdzIGFzIGtleS92YWx1ZXMsXG4gKiByZW5kZXIgaXRzIGNvbnRlbnQsICBTaW5jZSBpdHMgY29udGVudCBtYXkgY29udGFpbiBjb21wb25lbnQgdGhhdCBmdXJ0aGVyIHVzZVxuICogTWV0YUNvbnRleHQsIGFkZGl0aW9uYWwgbmVzdGVkIGNvbnRleHQgbWFuaXB1bGF0aW9ucyBtYXkgb2NjdXIuXG4gKlxuICogIyMjIFNpbXBsZSBleGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICpcbiAqICAgICAgPG0tY29udGV4dCBbb2JqZWN0XT0nY2hlY2tSZXF1ZXN0JyBvcGVyYXRpb249J2VkaXQnIGxheW91dD0nSW5zcGVjdCc+XG4gKiAgICAgICAgICA8bS1pbmNsdWRlLWNvbXBvbmVudD48L20taW5jbHVkZS1jb21wb25lbnQ+XG4gKiAgICAgICA8L20tY29udGV4dD5cbiAqXG4gKiBgYGBcbiAqXG4gKlxuICogR2VuZXJhbGx5LCBNZXRhQ29udGV4dCB0cmVhdHMgaXRzIGJpbmRpbmdzIGFzIGEgdmVyYmF0aW0gbGlzdCBvZiBrZXlzL3ZhbHVlcyB0byBiZSBzZXQoKVxuICogb24gdGhlIGNvbnRleHQgKGkuZS4gdGhlIGJpbmRpbmdzIGFib3ZlIG9uICdvYmplY3QnLCAnbGF5b3V0JywgJ29wZXJhdGlvbicsIGFuZCAnZmllbGQnXG4gKiBhcmUgbm90IHByZWRlZmluZWQgYnkgTWV0YUNvbnRleHQpLlxuICpcbiAqIEFsdGhvdWdoIHdlIHRyZWF0IHNvbWUgYmluZGluZ3MgaW4gc3BlY2lhbCB3YXkgYXMgd2UgZXhwZWN0IHRoZW0gdG8gYmUgcGFzc2VkIGluIGFzIGV4cHJlc3Npb25cbiAqIHRoZXJlZm9yZSB0aGV5IG5lZWQgYmUgZGVmaW5lZCBhcyBASW5wdXQoKS4gVGhlIHJlc3Qgd2UgdHJlYWQgaXMgcHVyZSBrZXlzL3ZhbHVlcyBzdHJpbmdzXG4gKlxuICogRmlyc3QgdGltZSB3aGVuIGNvbXBvbmVudCBpcyBjcmVhdGVkIHdlIHVzZSBuZ09uSW5pdCgpIHRvIHB1c2ggdmFsdWVzIGFuZCBuZ0FmdGVyVmlld0luaXQoKSB0b1xuICogcG9wIHZhbHVlcy4gVGhlIHB1c2gvcG9wIGxvb2tzIHNvbWV0aGluZyBsaWtlIHRoaXM6XG4gKlxuICogPE5vZGUxPiAtIFBVU0hcbiAqICAgICAgPE5vZGUyPiAtIFBVU0hcbiAqICAgICAgICAgIDxOb2RlMz4gLSBQVVNIXG4gKiAgICAgICAgICA8Tm9kZTM+IC0gUE9QXG4gKiAgICAgIDxOb2RlMj4gLSBQT1BcbiAqIDxOb2RlMT4gLSBQT1BcbiAqXG4gKlxuICogQWZ0ZXIgY29tcG9uZW50IGlzIGZ1bGx5IGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCAgdGhlbiB3ZSB1c2UgbmdEb0NoZWNrKCkgdG8gcHVzaCgpIGFuZFxuICogbmdBZnRlclZpZXdDaGVja2VkKCkgdG8gcG9wKCkgdmFsdWVzLlxuICpcbiAqL1xuXG5cbi8qKlxuICogQ29uc3RhbnQgcmVwcmVzZW50IGN1cnJlbnQgYWN0aXZlIGFuZCBtYWlubHkgbGF0ZXN0IENvbnRleHRcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBBQ1RJVkVfQ05UWCA9ICdDdXJyZW50TUMnO1xuY29uc3QgQ05UWF9DSEFOR0VEID0gJ0NudHhfQ2hhbmdlZCc7XG5cblxuLy8gZGVmaW5lIHNldCBvZiBwcm9wZXJ0aWVzIHdoaWNoIHdpbGwgYmUgc2tpcHBlZCBhcyB0aGV5IGFyZSBkZWZpbmVkIGFzIGlucHV0cyBvciAgYWRkZWQgYnlcbi8vIGFuZ3VsYXJcbmNvbnN0IElNUExJQ0lUX1BST1BFUlRJRVMgPSBbXG4gICAgJ21vZHVsZScsICdsYXlvdXQnLCAnb3BlcmF0aW9uJywgJ2NsYXNzJywgJ29iamVjdCcsICdhY3Rpb25DYXRlZ29yeScsICdhY3Rpb24nLCAnZmllbGQnLFxuICAgICdwdXNoTmV3Q29udGV4dCdcbl07XG5cblxuY29uc3QgSU1NVVRBQkxFX1BST1BFUlRJRVMgPSBbXG4gICAgJ21vZHVsZScsICdsYXlvdXQnLCAnb3BlcmF0aW9uJywgJ2NsYXNzJywgJ2FjdGlvbicsICdmaWVsZCcsICdwdXNoTmV3Q29udGV4dCdcbl07XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtLWNvbnRleHQnLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG5cbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEJhc2VGb3JtQ29tcG9uZW50LCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZXRhQ29udGV4dENvbXBvbmVudCl9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNZXRhQ29udGV4dENvbXBvbmVudCBleHRlbmRzIEJhc2VGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LFxuICAgIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWRcbntcbiAgICAvKipcbiAgICAgKiBDdXJyZW50bHkgdGhlcmUgYXJlIHNldCBvZiBwcm9wZXJ0aWVzIHdoaWNoIGNhbiBiZSBwYXNzZWQgYXMgZXhwcmVzc2lvbiBhbmQgdGhlcmVmb3JlIHRoZXlcbiAgICAgKiBuZWVkIHRvIGJlIHJlc29sdmVkIGJ5IGFuZ3VsYXIuIEFuZ3VsYXIgZG9lcyBub3QgaGF2ZSBzdWNoIG9wdGlvbiB0byBwcm92aWRlIGZsZXhpYmxlXG4gICAgICogbnVtYmVyIG9mIElucHV0cy4gQWxsIG5lZWRzIHRvIGJlIHByZS1kZWZpbmVkLiBJZiB5b3Ugd2FudCB0byBwYXNzIGluIGFuXG4gICAgICogZXhwcmVzc2lvbiBpdCBtdXN0IGJlIGRlZmluZWQgYXMgaW5wdXQuIE90aGVyd2lzZSBhbnkgb3RoZXIgYXR0cmlidXRlcyB3aWxsIGJlIHRyZWF0ZWQgYXNcbiAgICAgKiBzdHJpbmdzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZHVsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGxheW91dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG9wZXJhdGlvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KCkgb2JqZWN0OiBhbnk7XG4gICAgQElucHV0KCkgYWN0aW9uQ2F0ZWdvcnk6IGFueTtcbiAgICBASW5wdXQoKSBhY3Rpb246IGFueTtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHVzaE5ld0NvbnRleHQ6IGJvb2xlYW47XG5cblxuICAgIEBPdXRwdXQoKVxuICAgIGJlZm9yZUNvbnRleHRTZXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgb25Db250ZXh0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBhZnRlckNvbnRleHRTZXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICBAT3V0cHV0KClcbiAgICBvbkFjdGlvbjogRXZlbnRFbWl0dGVyPE1ldGFVSUFjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gICAgLyoqXG4gICAgICogRmxhZyB0aGF0IHRlbGxzIHVzIHRoYXQgY29tcG9uZW50IGlzIGZ1bGx5IHJlbmRlcmVkXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIHZpZXdJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBNYXJrcyBNZXRhQ29udGV4dCBvciB0aGUgcm9vdCBNZXRhQ29udGV4dCB0aGF0IGNyZWF0ZWQgYSBuZXcgQ29udGV4dFxuICAgICAqXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb250ZXh0Q3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBiaW5kaW5nc01hcDogTWFwPHN0cmluZywgYW55PjtcbiAgICBwcml2YXRlIGJpbmRpbmdLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogU2hlbGwgY29weSBvZiBhbiBvYmplY3QgdXNlZCBmb3IgY29tcGFyaXNpb24uIFdlIG1heSBnZXQgYmFjayB0byB0aGUgb3JpZ2luYWwgc29sdXRpb24gd2hpY2hcbiAgICAgKiBJIGhhZCBoZXJlLiBUSGUgQW5ndWxhcidzIGRpZmZlcnNcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXZPYmplY3Q6IGFueTtcblxuICAgIHByaXZhdGUgX3Njb3BlQmluZGluZzogc3RyaW5nO1xuXG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgc3RhY2tEZXB0aCA9IDA7XG5cblxuICAgIF9teUNvbnRleHQ6IENvbnRleHQ7XG5cbiAgICAvKipcbiAgICAgKiBOZWVkIHRvIGNhY2hlIGlmIHdlIGFscmVhZHkgaGF2ZSBvYmplY3Qgb3Igbm90IGluIGNhc2Ugd2UgbG9hZCBkYXRhIGZyb20gUkVTVCB3aGVyZSBpdFxuICAgICAqIGNvdWxkIGJlIGRlZmVycmVkIGFuZCBub3QgYXZhaWxhYmxlIHdoZW4gY29tcG9uZW50IGlzIGluaXRpYWxpemVkXG4gICAgICovXG4gICAgaGFzT2JqZWN0OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwdWJsaWMgZW52OiBFbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQmFzZUZvcm1Db21wb25lbnQpKVxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBwYXJlbnRDb250YWluZXI6IEJhc2VGb3JtQ29tcG9uZW50KVxuICAgIHtcbiAgICAgICAgc3VwZXIoZW52LCBudWxsKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmluaXRCaW5kaW5ncygpO1xuICAgICAgICB0aGlzLmhhc09iamVjdCA9IHRoaXMuX2hhc09iamVjdCgpO1xuXG4gICAgICAgIC8vIE1ldGFDb250ZXh0Q29tcG9uZW50LnN0YWNrRGVwdGgrKztcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pbmRlbnQoKSArICc9PiBuZ09uSW5pdDonLCB0aGlzLmNvbnRleHRLZXkoKSk7XG4gICAgICAgIC8vIEluaXRpYWwgcHVzaCwgd2hlbiBjb21wb25lbnQgaXMgZmlyc3QgaW5pdGlhbGl6ZWQgdGhlIHJlc3QgaXMgZG9uZSBiYXNlZCBvbiBjaGFuZ2VzLlxuICAgICAgICB0aGlzLnB1c2hQb3AodHJ1ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmVudi5oYXNWYWx1ZSgncGFyZW50LWNueCcpKSB7XG4gICAgICAgICAgICB0aGlzLmVudi5zZXRWYWx1ZSgncGFyZW50LWNueCcsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGb3IgYW55IG90aGVyIGltbXV0YWJsZSBvYmplY3QgZGV0ZWN0IGNoYW5nZXMgaGVyZSBhbmQgcmVmcmVzaCB0aGUgY29udGV4dCBzdGFja1xuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5nZXNcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7WyBwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaW5kZW50KCkgKyAnICAgID0+IG5nT25DaGFuZ2VzJywgdGhpcy5jb250ZXh0S2V5KCkpO1xuXG5cbiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiBJTU1VVEFCTEVfUFJPUEVSVElFUykge1xuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChjaGFuZ2VzW25hbWVdKVxuICAgICAgICAgICAgICAgICYmIChjaGFuZ2VzW25hbWVdLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1tuYW1lXS5wcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEJpbmRpbmdzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW4gY2FzZSBvYmplY3QgaXMgY29taW5nIGxhdGUgZS5nLiBmcm9tIHNvbWUgcmVhY3RpdmUgQVBJIGxpa2UgUkVTVCB0aGVuIHdlXG4gICAgICAgIC8vIGRvIG5vdCBnZXQgaXQgaW50byBuZ0luaXQgYnV0IGl0IHdpbGwgYmUgaGVyZS5cbiAgICAgICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkICYmIGlzUHJlc2VudChjaGFuZ2VzWydvYmplY3QnXSkgJiYgaXNQcmVzZW50KHRoaXMub2JqZWN0KSkge1xuICAgICAgICAgICAgdGhpcy5pbml0QmluZGluZ3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5nIGNoZWNrIGlzIHRyaWdnZWQgYWZ0ZXIgdmlldyBpcyBmdWxseSBpbmlhbGl6ZWQgYW5kIHdlIHdhbnQgdG8gcHVzaCBldmVyeXRoaW5nIG5ld1xuICAgICAqIHByb3BlcnRpZXMgdG8gdGhlIGNvbnRleHQgYW5kIGV2YWx1YXRlIGV2ZXJ5dGhpbmcuXG4gICAgICpcbiAgICAgKlxuICAgICAqL1xuICAgIG5nRG9DaGVjaygpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5oYXNPYmplY3QgPSB0aGlzLl9oYXNPYmplY3QoKTtcblxuICAgICAgICAgICAgLy8gTWV0YUNvbnRleHRDb21wb25lbnQuc3RhY2tEZXB0aCsrO1xuXG4gICAgICAgICAgICB0aGlzLnB1c2hQb3AodHJ1ZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmluZGVudCgpICsgJz0+IG5nRG9DaGVjayhDSEFOR0VEKScsIHRoaXMuY29udGV4dEtleSgpKTtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLm9iamVjdCkgJiYgIWVxdWFscyh0aGlzLnByZXZPYmplY3QsIHRoaXMub2JqZWN0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogV2Ugd2FudCB0byBzdGFydCBkZXRlY3RpbmcgY2hhbmdlcyBvbmx5IGFmdGVyIHZpZXcgaXMgZnVsbHkgY2hlY2tlZFxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIXRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmluZGVudCgpICsgJz0+IG5nQWZ0ZXJWaWV3SW5pdDonLCB0aGlzLmNvbnRleHRLZXkoKSk7XG4gICAgICAgICAgICAvLyBNZXRhQ29udGV4dENvbXBvbmVudC5zdGFja0RlcHRoLS07XG4gICAgICAgICAgICB0aGlzLnB1c2hQb3AoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMudmlld0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmluZGVudCgpICsgJz0+IG5nQWZ0ZXJWaWV3Q2hlY2tlZDonLCB0aGlzLmNvbnRleHRLZXkoKSk7XG4gICAgICAgICAgICAvLyBNZXRhQ29udGV4dENvbXBvbmVudC5zdGFja0RlcHRoLS07XG4gICAgICAgICAgICB0aGlzLnB1c2hQb3AoZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52aWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBpbmRlbnQoKTogc3RyaW5nXG4gICAgLy8ge1xuICAgIC8vICAgICBsZXQgaW5kID0gJyc7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWV0YUNvbnRleHRDb21wb25lbnQuc3RhY2tEZXB0aDsgaSsrKSB7XG4gICAgLy8gICAgICAgICBpbmQgKz0gJ1xcdFxcdFxcdCAnO1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgcmV0dXJuIGluZDtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFRoaXMgaXMgb3VyIGtleSBtZXRob2QgdGhhdCB0cmlnZ2VycyBhbGwgdGhlIGludGVyYWN0aW9uIGluc2lkZSBNZXRhVUkgd29ybGQuIEhlcmUgd2VcbiAgICAgKiBwdXNoIGNvbnRleHQga2V5cyBhbmQgdGhlaXIgdmFsdWVzIHRvIHRoZSBzdGFjayBhbmQgdGhpcyBpcyB0aGUgdGhpbmcgdGhhdCB0cmlnZ2Vyc1xuICAgICAqIHJ1bGUgcmVjYWxjdWxhdGlvbiB3aGljaCBnaXZlIHVzIHVwZGF0ZWQgIHByb3BlcnRpZXMuIFRob3NlIGFyZSB0aGVuIHVzZWQgYnlcbiAgICAgKiBNZXRhSW5jbHVkZUNvbXBvbmVudCB0byByZW5kZXIgdGhlIFVJLlxuICAgICAqXG4gICAgICogbXlDb250ZXh0IGlzIGN1cnJlbnQgY29udGV4dCBmb3IgdGhpcyBNZXRhQ29udGV4dCBDb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXNQdXNoIGlkZW50aWZpZXMgaWYgd2UgYXJlIHB1c2hpbmcgb3IgcG9wcGluZyB0byBjb250ZXh0IHN0YWNrXG4gICAgICovXG4gICAgcHJpdmF0ZSBwdXNoUG9wKGlzUHVzaDogYm9vbGVhbik6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaW5kZW50KCkgKyAnPT4gcHVzaFBvcDogaXNQdXNoJyArIGlzUHVzaCwgdGhpcy5jb250ZXh0S2V5KCkpO1xuICAgICAgICBsZXQgYWN0aXZlQ29udGV4dDogQ29udGV4dCA9IHRoaXMuYWN0aXZlQ29udGV4dCgpO1xuICAgICAgICBhc3NlcnQoaXNQdXNoIHx8IGlzUHJlc2VudChhY3RpdmVDb250ZXh0KSwgJ3BvcCgpOiBNaXNzaW5nIGNvbnRleHQnKTtcblxuICAgICAgICBsZXQgZm9yY2VDcmVhdGUgPSBpc1B1c2ggJiYgKGlzUHJlc2VudCh0aGlzLnB1c2hOZXdDb250ZXh0KSAmJiB0aGlzLnB1c2hOZXdDb250ZXh0KTtcbiAgICAgICAgaWYgKGlzQmxhbmsoYWN0aXZlQ29udGV4dCkgfHwgZm9yY2VDcmVhdGUpIHtcbiAgICAgICAgICAgIGxldCBtZXRhVUkgPSBVSU1ldGEuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgICAgIGFjdGl2ZUNvbnRleHQgPSBtZXRhVUkubmV3Q29udGV4dChmb3JjZUNyZWF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGV4dENyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbnYucHVzaDxDb250ZXh0PihBQ1RJVkVfQ05UWCwgYWN0aXZlQ29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQdXNoKSB7XG4gICAgICAgICAgICBhY3RpdmVDb250ZXh0LnB1c2goKTtcblxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLl9zY29wZUJpbmRpbmcpICYmIHRoaXMuaGFzT2JqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZUNvbnRleHRTZXQuZW1pdCh0aGlzLl9zY29wZUJpbmRpbmcpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZUNvbnRleHQuc2V0U2NvcGVLZXkodGhpcy5fc2NvcGVCaW5kaW5nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFmdGVyQ29udGV4dFNldC5lbWl0KHRoaXMuX3Njb3BlQmluZGluZyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuYmluZGluZ0tleXMubGVuZ3RoOyBpbmRleCsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuYmluZGluZ0tleXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmJpbmRpbmdzTWFwLmdldChrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVmb3JlQ29udGV4dFNldC5lbWl0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ29udGV4dC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJDb250ZXh0U2V0LmVtaXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNhdmUgY3JlYXRlZCBjb250ZW50IHRvIGxvY2FsIE1ldGFDb250ZXh0XG4gICAgICAgICAgICB0aGlzLl9teUNvbnRleHQgPSBhY3RpdmVDb250ZXh0LnNuYXBzaG90KCkuaHlkcmF0ZShmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVDb250ZXh0LnBvcCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0Q3JlYXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW52LnBvcDxDb250ZXh0PihBQ1RJVkVfQ05UWCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBKdXN0IGZvciB0cm91Ymxlc2hvb3RpbmcgdG8gcHJpbnQgY3VycmVudCBjb250ZXh0IGFuZCBhc3NpZ25tZW50c1xuICAgICAqXG4gICAgICovXG4gICAgZGVidWdTdHJpbmcoKTogU3RyaW5nXG4gICAge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX215Q29udGV4dCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9teUNvbnRleHQuZGVidWdTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciBkZWJ1Z2dpbmcgdG8gaWRlbnRpZnkgY3VycmVudCBrZXlcbiAgICAgKi9cbiAgICAvLyBjb250ZXh0S2V5KCk6IHN0cmluZ1xuICAgIC8vIHtcbiAgICAvLyAgICAgbGV0IGNueEtleSA9ICcnO1xuICAgIC8vICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYmluZGluZ0tleXMpICYmIHRoaXMuYmluZGluZ0tleXMubGVuZ3RoID4gMCkge1xuICAgIC8vICAgICAgICAgdGhpcy5iaW5kaW5nS2V5cy5mb3JFYWNoKChuYW1lKSA9PlxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIGlmIChuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIC8vICAgICAgICAgICAgICAgICBjbnhLZXkgKz0gbmFtZTtcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgICAgICBjbnhLZXkgKz0gbmFtZSArIHRoaXMuYmluZGluZ3NNYXAuZ2V0KG5hbWUpO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5fc2NvcGVCaW5kaW5nKSkge1xuICAgIC8vICAgICAgICAgY254S2V5ICs9IHRoaXMuX3Njb3BlQmluZGluZztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gY254S2V5O1xuICAgIC8vIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBFdmVyeSBtZXRhIGNvbnRleHQgY29tcG9uZW50IHdoaWNoIHB1c2hpbmcgY2VydGFpbiBwcm9wZXJ0aWVzIHRvIHN0YWNrIGhhcyBpdHMgb3duIGNvbnRleHRcbiAgICAgKiB0aGF0IGxpdmVzIHVudGlsIGNvbXBvbmVudCBpcyBkZXN0cm95ZWRcbiAgICAgKlxuICAgICAqL1xuICAgIG15Q29udGV4dCgpOiBDb250ZXh0XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXlDb250ZXh0O1xuICAgICAgICAvLyBsZXQgY254S2V5ID0gdGhpcy5jb250ZXh0S2V5KCk7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLmVudi5nZXRWYWx1ZShjbnhLZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIGtlZXAgdGhlIG1vc3QgY3VycmVudCBhbmQgbGF0ZXN0IGNvbnRleHQgdG8gZW52aXJvbm1lbnQgdG8gYmUgcmVhZCBieSBhbnkgQ2hpbGRcbiAgICAgKiBNZXRhQ29udGV4dCBmb3IgcHVycG9zZSBvZiBjcmVhdGlvbiBuZXcgY29udGV4dCBhbmQgaXQgbmVlZHMgaW5mbyB3aGF0IHdhcyBhbHJlYWR5IHB1c2hlZFxuICAgICAqIG9udG8gdGhlIHN0YWNrLlxuICAgICAqXG4gICAgICovXG4gICAgYWN0aXZlQ29udGV4dCgpOiBDb250ZXh0XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnYucGVhazxDb250ZXh0PihBQ1RJVkVfQ05UWCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBMZXQncyBjbGVhbiB1cCBhbmQgZGVzdHJveSBwdXNoZWQgY29udGV4dFxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KClcbiAgICB7XG5cbiAgICAgICAgaWYgKHRoaXMuZW52Lmhhc1ZhbHVlKCdwYXJlbnQtY254JykpIHtcbiAgICAgICAgICAgIHRoaXMuZW52LmRlbGV0ZVZhbHVlKCdwYXJlbnQtY254Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIElkZWFsbHkgd2UgZG8gbm90IG5lZWQgdGhpcyBtZXRob2QgaWYgQW5ndWxhciB3b3VsZCBzdXBwb3J0IHRvIHBhc3MgdmFyaWFibGUgbnVtYmVyIG9mXG4gICAgICogYmluZGluZ3Mgd2l0aG91dCBhIG5lZWQgdG8gaGF2ZSBiYWNrdXAgcHJvcGVydHkgZm9yIGVhY2ggb2YgdGhlIGJpbmRpbmdzIG9yIGV4cHJlc3Npb24uL1xuICAgICAqXG4gICAgICogT25jZSB0aGV5IHN1cHBvcnQuIHdlIGNhbiByZW1vdmUgdGhpcy4gU2luY2UgdGhpcyBjaGVjayB3aGF0IGFyZSBrbm93biBiaW5kaW5ncyBwYXNzZWQsXG4gICAgICogbWVhbmluZyB0aGUgb25lcyBkZWNvcmF0ZWQgd2l0aCBASW5wdXQgYW5kIHRoZSByZXN0XG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRCaW5kaW5ncygpXG4gICAge1xuICAgICAgICB0aGlzLmJpbmRpbmdzTWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgICAgbGV0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLmluaXRJbXBsaWNpdEJpbmRpbmdzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYXR0cjogQXR0ciA9IG5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcy5pdGVtKGkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaWdub3JlQmluZGluZyhhdHRyKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChhdHRyLm5hbWUpICYmIGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2NvcGVrZXknKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcGVCaW5kaW5nID0gYXR0ci52YWx1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldChhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmluZGluZ0tleXMgPSBbXTtcbiAgICAgICAgdGhpcy5iaW5kaW5nc01hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU29ydCB0aGVtIGJ5IHRoZWlyIGltcG9ydGFuY2Ugb3IgcmFua1xuICAgICAgICBMaXN0V3JhcHBlci5zb3J0QnlFeGFtcGxlKHRoaXMuYmluZGluZ0tleXMsIElNUExJQ0lUX1BST1BFUlRJRVMpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhlIHRoaW5nIHdlIHdhbnQgaXMgdG8gcGFzcyB2YXJpYWJsZSBudW1iZXIgb2YgYmluZGluZ3MgYW5kIHJlc29sdmUgdGhlbSBwcm9ncmFtbWF0aWNhbGx5LlxuICAgICAqIEN1cnJlbnRseSBpbiBBbmd1bGFyIHdlIGNhbm5vdCBkbyB0aGlzIHdlIGhhdmUgdGhlc2Ugc2V0IG9mIHByb3BlcnRpZXMgd2hlcmUgd2UgZXhwZWN0XG4gICAgICogc29tZSBleHByZXNzaW9uLCBzb21lIGR5bmFtaWMgcHJvcGVydGllcy4gRm9yIHRoZSByZXN0IHdlIGV4cGVjdCBvbmx5IHN0cmluZyBsaXRlcmFsIHRvIGJlXG4gICAgICogcGFzc2VkIGluIHRoZXJlZm9yZSB3ZSBjYW4gcmVzb2x2ZSB0aGVtIHdpdGggbmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRJbXBsaWNpdEJpbmRpbmdzKClcbiAgICB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5tb2R1bGUpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldCgnbW9kdWxlJywgdGhpcy5tb2R1bGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5sYXlvdXQpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldCgnbGF5b3V0JywgdGhpcy5sYXlvdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5vcGVyYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldCgnb3BlcmF0aW9uJywgdGhpcy5vcGVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5jbGFzcykpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NNYXAuc2V0KCdjbGFzcycsIHRoaXMuY2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5vYmplY3QpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldCgnb2JqZWN0JywgdGhpcy5vYmplY3QpO1xuICAgICAgICAgICAgdGhpcy5wcmV2T2JqZWN0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5hY3Rpb25DYXRlZ29yeSkpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NNYXAuc2V0KCdhY3Rpb25DYXRlZ29yeScsIHRoaXMuYWN0aW9uQ2F0ZWdvcnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5hY3Rpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzTWFwLnNldCgnYWN0aW9uJywgdGhpcy5hY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5maWVsZCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NNYXAuc2V0KCdmaWVsZCcsIHRoaXMuZmllbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTaW5jZSB3ZSBhcmUgZ29pbmcgdGhydSB0aGUgZWxlbWVudCcgYXR0cmlidXRlcyB3ZSB3YW50IHRvIHNraXAgYW55dGhpbmcgdGhhdCBoYXMgbm90aGlnblxuICAgICAqIHRvIGRvIHdpdGggdXMuXG4gICAgICpcbiAgICAgKi9cbiAgICBwcml2YXRlIGlnbm9yZUJpbmRpbmcoYXR0cjogQXR0cilcbiAgICB7XG4gICAgICAgIHJldHVybiBJTVBMSUNJVF9QUk9QRVJUSUVTLmluZGV4T2YoYXR0ci5uYW1lKSAhPT0gLTEgfHxcbiAgICAgICAgICAgIFN0cmluZ1dyYXBwZXIuY29udGFpbnMoYXR0ci5uYW1lLCAnX25nJykgfHxcbiAgICAgICAgICAgIFN0cmluZ1dyYXBwZXIuY29udGFpbnMoYXR0ci5uYW1lLCAnbmctJykgfHxcbiAgICAgICAgICAgIFN0cmluZ1dyYXBwZXIuY29udGFpbnMoYXR0ci5uYW1lLCAnKCcpIHx8XG4gICAgICAgICAgICAoaXNCbGFuayhhdHRyLnZhbHVlKSB8fCBhdHRyLnZhbHVlLmxlbmd0aCA9PT0gMCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJZiBvYmplY3QgaXMgY2hhbmdlZCB3ZSBuZWVkIHRvIGFsc28gdXBkYXRlIG91ciBhbmd1bGFyIG1vZGVsIHRvIHJlZmxlY3QgdXNlciBjaGFuZ2VzLiBBbGxcbiAgICAgKiBjaGFuZ2VzIGFuZCB1cGRhdGVzIGluIG1ldGF1aSB1c2Ugb2JqZWN0IHJlZmVyZW5jZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZU1vZGVsKClcbiAgICB7XG4gICAgICAgIGxldCBmaWVsZHMgPSBPYmplY3Qua2V5cyh0aGlzLm9iamVjdCk7XG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgY29udHJvbDogRm9ybUNvbnRyb2wgPSA8Rm9ybUNvbnRyb2w+IHRoaXMuZm9ybUdyb3VwLmdldChmaWVsZCk7XG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KGNvbnRyb2wpKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbC5wYXRjaFZhbHVlKHRoaXMub2JqZWN0W2ZpZWxkXSwge29ubHlTZWxmOiBmYWxzZSwgZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJldk9iamVjdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub2JqZWN0KTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX2hhc09iamVjdCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMuYWN0aXZlQ29udGV4dCgpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KGNvbnRleHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNQcmVzZW50KCg8VUlDb250ZXh0PiBjb250ZXh0KS5vYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuLyoqXG4gKlxuICogRGVmaW5lcyBmb3JtYXQgZm9yIHRoZSBicm9hZGNhc3RlZCBhY3Rpb24gZXZlbnQuIE1ldGFVSSBjYW4gYWxzbyBleGVjdXRlIGFjdGlvbnMgd2hpY2ggbmVlZHMgdG9cbiAqIGJlIGhhbmRsZWQgYnkgYXBwbGljYXRpb24gb3IgYWN0dWFsIGNvbXBvbmVudCB1c2luZyB0aGlzIG0tY29udGV4dC5cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBNZXRhVUlBY3Rpb25FdmVudFxue1xuXG4gICAgY29uc3RydWN0b3IoLyoqXG4gICAgICAgICAgICAgICAgICogV2hhdCBjb21wb25lbnQgdHJpZ2VyZWQgYWN0aW9uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcHVibGljIGNvbXBvbmVudDogYW55LFxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE5hbWUgb2YgdGhlIGFjdGlvbi4gVXN1YWxseSBuYW1lIG9mIHRoZSBAT3V0cHV0IG9mIGFjdHVhbCBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBwdWJsaWMgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQWN0aW9ucyBvciBldmVudCB0aGF0IGFyZSBicm9hZGNhc3RlZCBjYW4gYmUgd3JhcHBlZCB3aXRoIEBhY3Rpb24gb3IgQGxheW91dFxuICAgICAgICAgICAgICAgICAqIHdoaWNoIGhhcyBpdHMgbmFtZS4gV2Ugd2FudCB0byBhbHNvIHNlbmQgb3V0IHRoaXMgbmFtZSB0byB0aGUgYXBwbGljYXRpb24gdG9cbiAgICAgICAgICAgICAgICAgKiBrbm93IHdoYXQgbWV0YXVpIGFjdGlvbiBvciBsYXlvdXQgdHJpZ2dlcmVkIHRoaXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBwdWJsaWMgY254TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEFueSBkYXRhIHRoYXQgeW91IGNhbiBwYXNzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcHVibGljIGRhdGE6IGFueSlcbiAgICB7XG5cbiAgICB9XG59XG5cblxuIl19