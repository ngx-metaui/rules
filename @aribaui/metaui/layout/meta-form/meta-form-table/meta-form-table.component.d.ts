import { Environment } from '@aribaui/core';
import { MetaBaseComponent } from '../../meta.base.component';
import { MetaContextComponent } from '../../../core/meta-context/meta-context.component';
/**
 * This is a wrapper around FormtTable to render data based on current MetaContext.
 */
export declare class MetaFormTableComponent extends MetaBaseComponent {
    protected _context: MetaContextComponent;
    env: Environment;
    /**
     * For multizone layout this contains fields broken by its assigned zones
     */
    private fieldsByZone;
    /**
     * Is five zone layout? ForMetaUi we probalby have always fiveZone, unless in MetaRules we say
     * otherwise
     */
    isFiveZoneLayout: boolean;
    /**
     * Do we have labels on top layout?
     */
    showLabelsAboveControls: boolean;
    /**
     * Reference to current rendered FormTable
     */
    private form;
    /**
     * Active zones passed to the FormTable.
     *
     * Note: I could not find better way without having this property. When using FormTable I dont
     * want to tell what zones are active. The form table should figure out byitself just from the
     * ng-contented sections.
     *
     * The other approach is the wrap these into component and probably better
     *
     *e.g.
     *
     * ```html
     *  <aw-form-table ...>
     *    <aw-form-zone name='top'>
     *        <aw-form-row>...</aw-form-row>
     *     <aw-form-zone>
     *
     *
     *    ...
     *  </aw-form-table ...>
     * ```
     *
     */
    constructor(_context: MetaContextComponent, env: Environment);
    canShowZone(zone: string): boolean;
    protected doUpdate(): void;
    zLeft(): string[];
    zMiddle(): string[];
    zRight(): string[];
    zTop(): string[];
    zBottom(): string[];
    /**
     * Need to initialize FormGroup with all the available fields based on the given object. Its
     * hard to manage a state where we dynamically render different number of fields per operation.
     *
     * *
     */
    private initForm();
}
