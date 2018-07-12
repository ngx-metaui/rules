import { ChooserSelectionState } from './chooser-selection-state';
/**
 * ChooserState manages complete lifecycle for the Chooser Component. It keeps track of current
 * selection as well as it can broadcast any updates.
 *
 *
 */
export declare class ChooserState {
    /**
     *  Callback to the parent object to store current selection
     */
    selectionState: ChooserSelectionState;
    /**
     * todo: We do not needed this !!
     */
    currentItem: any;
    /**
     * Matching pattern. User latest input to the chooser input field
     */
    pattern: string;
    /**
     * Last successfull pattern that retrieved some data
     */
    lastFullMatchPattern: string;
    /**
     * Current matched items using ChooserSelectionState
     */
    matches: Array<any>;
    /**
     * Is this multiselect chooser
     */
    multiselect: boolean;
    /**
     *
     * Implementation can set lookup key to narrow the search. If we are dealing with object
     * you should set this.
     *
     */
    lookupKey: string;
    /**
     * previous display value is set when the display value is rendered on the chooser. we cache
     * the UI value to compare with the inbound value later instead of the value from underlying
     * object because business logic level code could have changed the underlying object's value
     *
     * todo: do I still need this?
     */
    prevDisplayValue: string;
    /**
     * Indicates if there are any validation like entered value does not much with the source list.
     *
     */
    isInvalid: boolean;
    /**
     *
     * indicates that we started to some editing e.g. starting to type in something into the
     * filter, or removing already selected items
     */
    addMode: boolean;
    recentSelectedDisplayed: number;
    /**
     * When this option is active we do not show all selected items, but max number that is
     * defined. User is able to toggle to expand the view to see all selections and hide them as
     * well
     */
    showAllRecentlySelected: boolean;
    constructor(chooserSelectionState?: ChooserSelectionState, isMulti?: boolean);
    /**
     *
     * It will select and persist an item using ChooserSelectionState provider.
     *
     */
    updatedSelectedObjects(item: any): void;
    /**
     * When user selection is large we use this method to check if we need to show all selected
     * items or only MaxRecentSelected
     */
    toggleAllSelected(): void;
    /**
     *
     * Renders user's selection under the input field
     *
     */
    readonly recentSelectedObjects: Array<any>;
    selectedObject(): any;
    selectedObjects(): Array<any>;
    setSelectionState(selection: any, selected: boolean): void;
}
/**
 * Dummy implementation ChooserSelectionState
 */
export declare class DefaultSelectionState extends ChooserSelectionState {
    private multiSelect;
    private _selectedObject;
    private _selectedObjects;
    constructor(multiSelect: boolean);
    setSelectionState(selection: any, selected: boolean): void;
    selectedObject(): any;
    selectedObjects(): Array<any>;
    isSelected(selection: any): boolean;
}
