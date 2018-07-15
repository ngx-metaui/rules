import { OutlineForComponent } from './outline-for.component';
/**
 * OutlineState is the key gluing part for the OutlineFor and OutlineController components. It
 * holds all important information for the current outline tree and manages expansion states in form
 * of so called expansionPath and expansionStates
 *
 * We need to have a way how to work with generic data structure in order not to hold UI specific
 * information on the domain object model just like we had it before, where we had an interface
 * called OutlineNode, with fields (expanded, selected, etc.. )
 *
 *
 * `expansionPath`: Holds an array of currently selected and expanded nodes. This is filled by
 * OutlineController.
 *
 *
 * If we are dealing with Entity or anything that has identity then we have easier situation as we
 * can ask for ID and it is more efficient for serialization
 */
export declare class OutlineState {
    /**
     * Array of currently selected and expanded nodes
     *
     */
    private _expansionPath;
    /**
     * When `allowSelection` is enabled on OutlineControl it saved currently selected item to be
     * able later on apply some styling and broadcast this selection outside of the component.
     */
    selectedItem: any;
    /**
     *
     * Maps object reference to boolean values, where TRUE means EXPANDED, FALSE collapsed
     *
     */
    expansionStates: Map<any, boolean>;
    /**
     *
     * When outline is rendered for first time or re-rendered and we set default value for the
     * expansionStates. This way we can pretty easily execute CollapseAll, ExpandAll
     *
     */
    isExpandedAll: boolean;
    /**
     *
     * Holds current level during tree node rendering so we can apply correct indentation
     *
     */
    currentLevel: number;
    /**
     * Used during a toggle action to record current selection path.
     *
     */
    currentPath: any[];
    /**
     * Globally shared property
     */
    outlineFor: OutlineForComponent;
    constructor();
    /**
     * For the collapseAll and expandAll we are using simple mechanism where we clean up all
     * selection and then set the global expand state, this whey isExpand method returns the same
     * state for all items
     */
    collapseAll(): void;
    expandAll(): void;
    expansionPath: any[];
    toggleExpansion(currentPath: any[], children?: any[]): void;
    updateNodes(nodes: any[], newState: boolean): void;
    setExpansionState(item: any, isExpanded: boolean): void;
    /**
     * To improve state persisting lets check if we are dealing with an Object that has Identity
     * so we can extract an ID otherwise use object to compare by reference
     *
     *
     */
    private itemToKey(item);
    setExpansionPath(items: any[]): void;
    isExpanded(item: any): boolean;
}
