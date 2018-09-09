/**
 * Selection State for the chooser in order to be able to comunicate with the parent object using a
 * chooser. If I would have to manage only single values with no addional methods i would user
 * emitters to do the job, but in this case we need this interface (abstract class) between a
 * chooser and actual object.
 *
 *
 */
export declare abstract class ChooserSelectionState {
    /**
     *
     * Set selection state is usually triggered by selecting and unselecting a item (in case of
     * multiselect) and it should update its list of objects with either settings/adding item or
     * removing it.
     *
     *
     */
    setSelectionState(selection: any, selected: boolean): void;
    /**
     * The most recent selection . Null if last action was a deselection. Usually used by Chooser
     * or ChooserState to get cuurent value.
     *
     */
    selectedObject(): any;
    /**
     * The most recent selections.
     *
     */
    selectedObjects(): Array<any>;
    /**
     *
     * Check if the item selection items is in the selectedObjects
     */
    isSelected(selection: any): boolean;
}
