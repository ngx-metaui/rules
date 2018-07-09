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
import {Component, forwardRef, Host, Input} from '@angular/core';
import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {BooleanWrapper, Environment, isPresent} from '@aribaui/core';
import {FormRowComponent} from '@aribaui/components';
import {MetaContextComponent} from '../../../core/meta-context/meta-context.component';
import {UIMeta} from '../../../core/uimeta';
import {MetaBaseComponent} from '../../meta.base.component';

/**
 * Component responsible for rendering a row using MetaIncludeComponent.
 * What I am still not sure, if I want to use fully validation from MetaRule and if I cannot
 * leverage basic validation from angular.
 *
 * Meaning I might remove default valid::** rule from WidgetsRules and when its required insert
 * default Required validation from angular.
 *
 */
@Component({
    selector: 'm-form-row',
    templateUrl: 'meta-form-row.component.html',
    styleUrls: ['meta-form-row.component.scss'],
    providers: [

        {provide: FormRowComponent, useExisting: forwardRef(() => MetaFormRowComponent)}
    ]

})
export class MetaFormRowComponent extends MetaBaseComponent
{

    @Input()
    field: string;


    /**
     * There could be special cases when we are layout component that we want to extends the row
     * 100%.
     */
    @Input()
    initialSize: string = 'medium';

    /**
     * Cached validatos
     */
    validators: ValidatorFn[];


    constructor(@Host() protected _metaContext: MetaContextComponent, public env: Environment)
    {
        super(env, _metaContext);
    }


    ngOnInit(): void
    {
        super.ngOnInit();
        this.validators = this.createValidators();
    }

    bindingBoolProperty(key: string): boolean
    {
        let bindings: Map<string, any> = this.context.propertyForKey(UIMeta.KeyBindings);

        if (isPresent(bindings) && bindings.has(key)) {
            let value = bindings.get(key);
            return BooleanWrapper.boleanValue(value);

        }
        return false;
    }


    bindingStringProperty(key: string): string
    {
        let bindings: Map<string, any> = this.context.propertyForKey(UIMeta.KeyBindings);

        if (isPresent(bindings) && bindings.has(key)) {
            return bindings.get(key);

        }
        return null;
    }


    get size(): string
    {
        let bindings: Map<string, any> = this.context.propertyForKey(UIMeta.KeyBindings);

        if (isPresent(bindings) && bindings.has('size')) {
            return bindings.get('size');
        }
        return this.initialSize;
    }

    set size(value: string)
    {
        this.initialSize = value;
    }


    /**
     * Creates angular based Validator which for a current field executes validation rules real
     * time as use type. At the bottom of the file there is example of async validator
     *
     */
    private createValidators(): ValidatorFn[]
    {
        let that = this;
        let metaValidator = (control: AbstractControl): {[key: string]: any} =>
        {
            if (isPresent(Validators.required(control)) || !control.touched) {
                return null;
            }

            let errorMsg = UIMeta.validationError(that.context);
            return isPresent(errorMsg) ? {
                    'metavalid': {'msg': errorMsg}
                } : null;
        };

        return [metaValidator];
    }

    isRequired(): boolean
    {
        return (isPresent(this.editing) && this.context.booleanPropertyForKey('required', false));
    }

}


/*

 return new Promise((resolve) => {
 setTimeout (()=>{

 let context: UIContext = <UIContext> this._contextSnapshot.hydrate();
 context.value = control.value;

 let errorMsg = UIMeta.validationError(context);


 if(isPresent(errorMsg)) {
 resolve({metavalid: {msg: errorMsg}});
 } else{
 resolve(null);
 }

 }, 700);
 });


 */


// metaValid (): AsyncValidatorFn[]
// {
//     let metaValidator = (control: AbstractControl): {[key: string]: any} =>
//     {
//         return new Promise((resolve) =>
//         {
//             setTimeout(()=>
//             {
//                 let context: UIContext = <UIContext> this._contextSnapshot.hydrate();
//                 context.value = control.value;
//
//                 let errorMsg = UIMeta.validationError(context);
//
//
//                 if (isPresent(errorMsg)) {
//                     resolve({metavalid: {msg: errorMsg}});
//                 } else {
//                     resolve(null);
//                 }
//
//             } , 400);
//         });
//     };
//     return [metaValidator];
// }
