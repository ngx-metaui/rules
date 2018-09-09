import { ValidatorFn } from '@angular/forms';
import { Environment } from '@aribaui/core';
import { MetaContextComponent } from '../../../core/meta-context/meta-context.component';
import { MetaBaseComponent } from '../../meta.base.component';
/**
 * Component responsible for rendering a row using MetaIncludeComponent.
 * What I am still not sure, if I want to use fully validation from MetaRule and if I cannot
 * leverage basic validation from angular.
 *
 * Meaning I might remove default valid::** rule from WidgetsRules and when its required insert
 * default Required validation from angular.
 *
 */
export declare class MetaFormRowComponent extends MetaBaseComponent {
    protected _metaContext: MetaContextComponent;
    env: Environment;
    field: string;
    /**
     * There could be special cases when we are layout component that we want to extends the row
     * 100%.
     */
    initialSize: string;
    /**
     * Cached validatos
     */
    validators: ValidatorFn[];
    constructor(_metaContext: MetaContextComponent, env: Environment);
    ngOnInit(): void;
    bindingBoolProperty(key: string): boolean;
    bindingStringProperty(key: string): string;
    size: string;
    /**
     * Creates angular based Validator which for a current field executes validation rules real
     * time as use type. At the bottom of the file there is example of async validator
     *
     */
    private createValidators();
    isRequired(): boolean;
}
