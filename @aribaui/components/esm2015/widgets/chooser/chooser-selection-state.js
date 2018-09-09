/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { unimplemented } from '@aribaui/core';
/**
 * Selection State for the chooser in order to be able to comunicate with the parent object using a
 * chooser. If I would have to manage only single values with no addional methods i would user
 * emitters to do the job, but in this case we need this interface (abstract class) between a
 * chooser and actual object.
 *
 *
 * @abstract
 */
export class ChooserSelectionState {
    /**
     *
     * Set selection state is usually triggered by selecting and unselecting a item (in case of
     * multiselect) and it should update its list of objects with either settings/adding item or
     * removing it.
     *
     *
     * @param {?} selection
     * @param {?} selected
     * @return {?}
     */
    setSelectionState(selection, selected) {
    }
    /**
     * The most recent selection . Null if last action was a deselection. Usually used by Chooser
     * or ChooserState to get cuurent value.
     *
     * @return {?}
     */
    selectedObject() {
        return unimplemented();
    }
    /**
     * The most recent selections.
     *
     * @return {?}
     */
    selectedObjects() {
        return unimplemented();
    }
    /**
     *
     * Check if the item selection items is in the selectedObjects
     * @param {?} selection
     * @return {?}
     */
    isSelected(selection) {
        return unimplemented();
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3Nlci1zZWxlY3Rpb24tc3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9jaG9vc2VyL2Nob29zZXItc2VsZWN0aW9uLXN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQVc1QyxNQUFNOzs7Ozs7Ozs7Ozs7SUFVRixpQkFBaUIsQ0FBQyxTQUFjLEVBQUUsUUFBaUI7S0FFbEQ7Ozs7Ozs7SUFPRCxjQUFjO1FBRVYsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCOzs7Ozs7SUFPRCxlQUFlO1FBRVgsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCOzs7Ozs7O0lBT0QsVUFBVSxDQUFDLFNBQWM7UUFFckIsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQzFCO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqXG4gKi9cbmltcG9ydCB7dW5pbXBsZW1lbnRlZH0gZnJvbSAnQGFyaWJhdWkvY29yZSc7XG5cblxuLyoqXG4gKiBTZWxlY3Rpb24gU3RhdGUgZm9yIHRoZSBjaG9vc2VyIGluIG9yZGVyIHRvIGJlIGFibGUgdG8gY29tdW5pY2F0ZSB3aXRoIHRoZSBwYXJlbnQgb2JqZWN0IHVzaW5nIGFcbiAqIGNob29zZXIuIElmIEkgd291bGQgaGF2ZSB0byBtYW5hZ2Ugb25seSBzaW5nbGUgdmFsdWVzIHdpdGggbm8gYWRkaW9uYWwgbWV0aG9kcyBpIHdvdWxkIHVzZXJcbiAqIGVtaXR0ZXJzIHRvIGRvIHRoZSBqb2IsIGJ1dCBpbiB0aGlzIGNhc2Ugd2UgbmVlZCB0aGlzIGludGVyZmFjZSAoYWJzdHJhY3QgY2xhc3MpIGJldHdlZW4gYVxuICogY2hvb3NlciBhbmQgYWN0dWFsIG9iamVjdC5cbiAqXG4gKlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2hvb3NlclNlbGVjdGlvblN0YXRlXG57XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBTZXQgc2VsZWN0aW9uIHN0YXRlIGlzIHVzdWFsbHkgdHJpZ2dlcmVkIGJ5IHNlbGVjdGluZyBhbmQgdW5zZWxlY3RpbmcgYSBpdGVtIChpbiBjYXNlIG9mXG4gICAgICogbXVsdGlzZWxlY3QpIGFuZCBpdCBzaG91bGQgdXBkYXRlIGl0cyBsaXN0IG9mIG9iamVjdHMgd2l0aCBlaXRoZXIgc2V0dGluZ3MvYWRkaW5nIGl0ZW0gb3JcbiAgICAgKiByZW1vdmluZyBpdC5cbiAgICAgKlxuICAgICAqXG4gICAgICovXG4gICAgc2V0U2VsZWN0aW9uU3RhdGUoc2VsZWN0aW9uOiBhbnksIHNlbGVjdGVkOiBib29sZWFuKTogdm9pZFxuICAgIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbW9zdCByZWNlbnQgc2VsZWN0aW9uIC4gTnVsbCBpZiBsYXN0IGFjdGlvbiB3YXMgYSBkZXNlbGVjdGlvbi4gVXN1YWxseSB1c2VkIGJ5IENob29zZXJcbiAgICAgKiBvciBDaG9vc2VyU3RhdGUgdG8gZ2V0IGN1dXJlbnQgdmFsdWUuXG4gICAgICpcbiAgICAgKi9cbiAgICBzZWxlY3RlZE9iamVjdCgpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB1bmltcGxlbWVudGVkKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgbW9zdCByZWNlbnQgc2VsZWN0aW9ucy5cbiAgICAgKlxuICAgICAqL1xuICAgIHNlbGVjdGVkT2JqZWN0cygpOiBBcnJheTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDaGVjayBpZiB0aGUgaXRlbSBzZWxlY3Rpb24gaXRlbXMgaXMgaW4gdGhlIHNlbGVjdGVkT2JqZWN0c1xuICAgICAqL1xuICAgIGlzU2VsZWN0ZWQoc2VsZWN0aW9uOiBhbnkpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdW5pbXBsZW1lbnRlZCgpO1xuICAgIH1cbn1cblxuIl19