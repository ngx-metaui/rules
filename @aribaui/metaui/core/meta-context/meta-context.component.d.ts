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
import { AfterViewChecked, AfterViewInit, ElementRef, EventEmitter, OnDestroy, SimpleChange } from '@angular/core';
import { Environment } from '@aribaui/core';
import { Context } from '../../core/context';
import { BaseFormComponent } from '@aribaui/components';
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
 * Although we treat some bindings in special way as we expect them to be passed in as expression
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
 */
/**
 * Constant represent current active and mainly latest Context
 *
 */
export declare const ACTIVE_CNTX = "CurrentMC";
export declare class MetaContextComponent extends BaseFormComponent implements OnDestroy, AfterViewInit, AfterViewChecked {
    private elementRef;
    env: Environment;
    protected parentContainer: BaseFormComponent;
    /**
     * Currently there are set of properties which can be passed as expression and therefore they
     * need to be resolved by angular. Angular does not have such option to provide flexible
     * number of Inputs. All needs to be pre-defined. If you want to pass in an
     * expression it must be defined as input. Otherwise any other attributes will be treated as
     * strings.
     */
    module: string;
    layout: string;
    operation: string;
    class: string;
    object: any;
    actionCategory: any;
    action: any;
    field: string;
    pushNewContext: boolean;
    beforeContextSet: EventEmitter<any>;
    onContextChanged: EventEmitter<any>;
    afterContextSet: EventEmitter<any>;
    onAction: EventEmitter<MetaUIActionEvent>;
    /**
     * Flag that tells us that component is fully rendered
     *
     */
    private viewInitialized;
    /**
     *
     * Marks MetaContext or the root MetaContext that created a new Context
     *
     */
    private contextCreated;
    private bindingsMap;
    private bindingKeys;
    /**
     * Shell copy of an object used for comparision. We may get back to the original solution which
     * I had here. THe Angular's differs
     */
    private prevObject;
    private _scopeBinding;
    _myContext: Context;
    /**
     * Need to cache if we already have object or not in case we load data from REST where it
     * could be deferred and not available when component is initialized
     */
    hasObject: boolean;
    constructor(elementRef: ElementRef, env: Environment, parentContainer: BaseFormComponent);
    ngOnInit(): void;
    /**
     * For any other immutable object detect changes here and refresh the context stack
     *
     * @param changes
     */
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    /**
     * Ng check is trigged after view is fully inialized and we want to push everything new
     * properties to the context and evaluate everything.
     *
     *
     */
    ngDoCheck(): void;
    /**
     * We want to start detecting changes only after view is fully checked
     */
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    /**
     *
     * This is our key method that triggers all the interaction inside MetaUI world. Here we
     * push context keys and their values to the stack and this is the thing that triggers
     * rule recalculation which give us updated  properties. Those are then used by
     * MetaIncludeComponent to render the UI.
     *
     * myContext is current context for this MetaContext Component.
     *
     * @param isPush identifies if we are pushing or popping to context stack
     */
    private pushPop(isPush);
    /**
     * Just for troubleshooting to print current context and assignments
     *
     */
    debugString(): String;
    /**
     * For debugging to identify current key
     */
    /**
     *
     * Every meta context component which pushing certain properties to stack has its own context
     * that lives until component is destroyed
     *
     */
    myContext(): Context;
    /**
     * We keep the most current and latest context to environment to be read by any Child
     * MetaContext for purpose of creation new context and it needs info what was already pushed
     * onto the stack.
     *
     */
    activeContext(): Context;
    /**
     * Let's clean up and destroy pushed context
     */
    ngOnDestroy(): void;
    /**
     * Ideally we do not need this method if Angular would support to pass variable number of
     * bindings without a need to have backup property for each of the bindings or expression./
     *
     * Once they support. we can remove this. Since this check what are known bindings passed,
     * meaning the ones decorated with @Input and the rest
     *
     */
    private initBindings();
    /**
     * The thing we want is to pass variable number of bindings and resolve them programmatically.
     * Currently in Angular we cannot do this we have these set of properties where we expect
     * some expression, some dynamic properties. For the rest we expect only string literal to be
     * passed in therefore we can resolve them with nativeElement.attributes
     *
     */
    private initImplicitBindings();
    /**
     *
     * Since we are going thru the element' attributes we want to skip anything that has nothign
     * to do with us.
     *
     */
    private ignoreBinding(attr);
    /**
     * If object is changed we need to also update our angular model to reflect user changes. All
     * changes and updates in metaui use object references
     */
    private updateModel();
    private _hasObject();
}
/**
 *
 * Defines format for the broadcasted action event. MetaUI can also execute actions which needs to
 * be handled by application or actual component using this m-context.
 *
 */
export declare class MetaUIActionEvent {
    /**
                 * What component trigered action
                 */ component: any;
    /**
     * Name of the action. Usually name of the @Output of actual component
     */
    eventName: string;
    /**
     * Actions or event that are broadcasted can be wrapped with @action or @layout
     * which has its name. We want to also send out this name to the application to
     * know what metaui action or layout triggered this
     */
    cnxName: string;
    /**
     * Any data that you can pass
     */
    data: any;
    constructor(/**
                     * What component trigered action
                     */ component: any, 
        /**
         * Name of the action. Usually name of the @Output of actual component
         */
        eventName: string, 
        /**
         * Actions or event that are broadcasted can be wrapped with @action or @layout
         * which has its name. We want to also send out this name to the application to
         * know what metaui action or layout triggered this
         */
        cnxName: string, 
        /**
         * Any data that you can pass
         */
        data: any);
}
