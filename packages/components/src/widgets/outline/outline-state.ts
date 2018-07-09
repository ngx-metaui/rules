import {Entity, isBlank, isEntity, ListWrapper} from '@aribaui/core';
import {Injectable} from '@angular/core';
import {OutlineForComponent} from './outline-for.component';

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
@Injectable()
export class OutlineState
{
    /**
     * Array of currently selected and expanded nodes
     *
     */
    private _expansionPath: any[];

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
    globalState: boolean = false; // collapsed

    /**
     *
     * Holds current level during tree node rendering so we can apply correct indentation
     *
     */
    currentLevel: number = -1;

    /**
     * Used during a toggle action to record current selection path.
     *
     */
    currentPath: any[];


    /**
     * Globally shared property
     */
    outlineFor: OutlineForComponent;


    constructor ()
    {
        this.expansionStates = new Map();
    }

    /**
     * For the collapseAll and expandAll we are using simple mechanism where we clean up all
     * selection and then set the global expand state, this whey isExpand method returns the same
     * state for all items
     */
    collapseAll (): void
    {
        this.expansionStates.clear();
        this.globalState = false;
    }

    expandAll (): void
    {
        this.expansionStates.clear();
        this.globalState = true;
    }


    get expansionPath (): any[]
    {
        if (isBlank(this._expansionPath)) {
            this._expansionPath = [];
        }
        return this._expansionPath;
    }


    set expansionPath (value: any[])
    {
        this._expansionPath = value;

        if (isBlank(this._expansionPath)) {
            return;
        }
        this._expansionPath.forEach((item: any) =>
        {
            this.setExpansionState(item, true);
        });
    }


    toggleExpansion (currentPath: any[], chidren?: any[]): void
    {

        if (isBlank(currentPath)) {
            return;
        }
        let item = ListWrapper.last(currentPath);
        let itemChildren = chidren || [];
        let newState = !this.isExpanded(item);
        this.setExpansionState(item, newState);

        if (!newState) {
            ListWrapper.removeLast(currentPath);
            itemChildren.forEach((child: any) =>
            {
                this.setExpansionState(child, newState);
            });
        }

        this.setExpansionPath(currentPath);
    }

    setExpansionState (item: any, isExpanded: boolean): void
    {
        let key = this.itemToKey(item);
        if (isExpanded === this.globalState) {
            this.expansionStates.delete(key);
        } else {
            this.expansionStates.set(key, (isExpanded) ? true : false);
        }
    }

    /**
     * To improve state persisting lets check if we are dealing with an Object that has Identity
     * so we can extract an ID otherwise use object to compare by reference
     *
     *
     */
    private itemToKey (item: any): string
    {
        return isEntity(item) ? (<Entity>item).identity() : item;
    }


    setExpansionPath (item: any[]): void
    {
        this.expansionPath = item;

        item.forEach((node: any) =>
        {
            this.setExpansionState(node, true);
        });
    }

    isExpanded (item: any): boolean
    {
        let key = this.itemToKey(item);
        if (!this.expansionStates.has(key)) {
            return this.globalState;
        }
        return this.expansionStates.get(key);
    }

}
