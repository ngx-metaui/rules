/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { assert, objectToName } from '../../utils/lang';
/** @enum {number} */
const RestSegmentType = {
    Host: 0,
    Context: 1,
    Action: 2,
    Resource: 3,
    Identifier: 4,
    OfParent: 5,
};
export { RestSegmentType };
RestSegmentType[RestSegmentType.Host] = "Host";
RestSegmentType[RestSegmentType.Context] = "Context";
RestSegmentType[RestSegmentType.Action] = "Action";
RestSegmentType[RestSegmentType.Resource] = "Resource";
RestSegmentType[RestSegmentType.Identifier] = "Identifier";
RestSegmentType[RestSegmentType.OfParent] = "OfParent";
/** @enum {number} */
const RestAction = {
    Load: 0,
    Query: 1,
    Save: 2,
    Do: 3,
};
export { RestAction };
RestAction[RestAction.Load] = "Load";
RestAction[RestAction.Query] = "Query";
RestAction[RestAction.Save] = "Save";
RestAction[RestAction.Do] = "Do";
/**
 * Set of AST like classes to keep the fluent API grammar in the abstract format to give developers
 * changes to provide their own implementation
 *
 * Todo: Expose Builder as a service
 *
 * @abstract
 */
export class UrlSegment {
    /**
     * @param {?} type
     * @param {?=} value
     * @param {?=} params
     * @param {?=} rank
     */
    constructor(type, value, params, rank = -1) {
        this.type = type;
        this.value = value;
        this.params = params;
        this.rank = rank;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return 'Wrong Rest Segment order';
    }
}
function UrlSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    UrlSegment.prototype.type;
    /** @type {?} */
    UrlSegment.prototype.value;
    /** @type {?} */
    UrlSegment.prototype.params;
    /** @type {?} */
    UrlSegment.prototype.rank;
}
export class HostSegment extends UrlSegment {
    /**
     * @param {?} value
     * @param {?=} params
     */
    constructor(value, params) {
        super(RestSegmentType.Host, value, params, 5);
        this.value = value;
        this.params = params;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment == null, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Host segment must be first!`;
    }
}
function HostSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    HostSegment.prototype.value;
    /** @type {?} */
    HostSegment.prototype.params;
}
export class ContextSegment extends UrlSegment {
    /**
     * @param {?} value
     * @param {?=} params
     */
    constructor(value, params) {
        super(RestSegmentType.Context, value, params, 10);
        this.value = value;
        this.params = params;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment === RestSegmentType.Host, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Context segment must follow Host!`;
    }
}
function ContextSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    ContextSegment.prototype.value;
    /** @type {?} */
    ContextSegment.prototype.params;
}
export class ActionSegment extends UrlSegment {
    /**
     * @param {?} action
     * @param {?=} data
     * @param {?=} params
     */
    constructor(action, data, params) {
        super(RestSegmentType.Action, action, params, 0);
        this.action = action;
        this.data = data;
        this.params = params;
        // save it to local property for easier comparision
        this.actionType = action;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment === RestSegmentType.Context, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Action must follow Context segment!`;
    }
}
function ActionSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    ActionSegment.prototype.actionType;
    /** @type {?} */
    ActionSegment.prototype.action;
    /** @type {?} */
    ActionSegment.prototype.data;
    /** @type {?} */
    ActionSegment.prototype.params;
}
export class ResourceSegment extends UrlSegment {
    /**
     * @param {?} value
     * @param {?=} params
     */
    constructor(value, params) {
        super(RestSegmentType.Resource, value, params, 15);
        this.value = value;
        this.params = params;
        this.resourceName = `${objectToName(this.value).toLowerCase()}s`;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert((prevSegment === RestSegmentType.Action || prevSegment === RestSegmentType.OfParent), this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Resource must follow either Action or Of!`;
    }
}
function ResourceSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    ResourceSegment.prototype.resourceName;
    /** @type {?} */
    ResourceSegment.prototype.value;
    /** @type {?} */
    ResourceSegment.prototype.params;
}
export class IdentifierSegment extends UrlSegment {
    /**
     * @param {?} value
     * @param {?=} params
     */
    constructor(value, params) {
        super(RestSegmentType.Identifier, value, params, 20);
        this.value = value;
        this.params = params;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment === RestSegmentType.Resource, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Identifier must follow Resource!`;
    }
}
function IdentifierSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    IdentifierSegment.prototype.value;
    /** @type {?} */
    IdentifierSegment.prototype.params;
}
export class OfParentSegment extends UrlSegment {
    constructor() {
        super(RestSegmentType.OfParent);
        this.rank = 2;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    assertSegment(prevSegment) {
        assert(prevSegment === RestSegmentType.Resource ||
            prevSegment === RestSegmentType.Identifier, this.assertMsg());
    }
    /**
     * @return {?}
     */
    assertMsg() {
        return `${super.assertMsg()}. . Of must follow Resource!`;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VnbWVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJkb21haW4vdXJsL3NlZ21lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQXFCQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEJ0RCxNQUFNOzs7Ozs7O0lBRUYsWUFBbUIsSUFBcUIsRUFBUyxLQUFXLEVBQ3pDLFFBQXFDLE9BQWUsQ0FBQyxDQUFDO1FBRHRELFNBQUksR0FBSixJQUFJLENBQWlCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUN6QyxXQUFNLEdBQU4sTUFBTTtRQUErQixTQUFJLEdBQUosSUFBSSxDQUFhO0tBR3hFOzs7OztJQUdELGFBQWEsQ0FBQyxXQUE0QjtLQUV6Qzs7OztJQUVELFNBQVM7UUFFTCxNQUFNLENBQUMsMEJBQTBCLENBQUM7S0FDckM7Q0FDSjs7Ozs7Ozs7Ozs7QUFHRCxNQUFNLGtCQUFtQixTQUFRLFVBQVU7Ozs7O0lBR3ZDLFlBQW1CLEtBQVUsRUFBUyxNQUE0QjtRQUU5RCxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRi9CLFVBQUssR0FBTCxLQUFLLENBQUs7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFzQjtLQUdqRTs7Ozs7SUFHRCxhQUFhLENBQUMsV0FBNEI7UUFFdEMsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7S0FDakQ7Ozs7SUFHRCxTQUFTO1FBRUwsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxpQ0FBaUMsQ0FBQztLQUNoRTtDQUNKOzs7Ozs7O0FBR0QsTUFBTSxxQkFBc0IsU0FBUSxVQUFVOzs7OztJQUcxQyxZQUFtQixL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LENBQUMsV0FBNEI7UUFFdEMsTUFBTSxDQUFDLFdBQVcsS0FBSyxlQUFlLENBQUMsUUFBUTtZQUMzQyxXQUFXLEtBQUssZUFBZSxDQUFDLFVBQVUsRUFDMUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7S0FDekI7Ozs7SUFFRCxTQUFTO1FBRUwsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQztLQUM3RDtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthc3NlcnQsIG9iamVjdFRvTmFtZX0gZnJvbSAnLi4vLi4vdXRpbHMvbGFuZyc7XG5cbmV4cG9ydCBlbnVtIFJlc3RTZWdtZW50VHlwZVxue1xuICAgIEhvc3QsXG4gICAgQ29udGV4dCxcbiAgICBBY3Rpb24sXG4gICAgUmVzb3VyY2UsXG4gICAgSWRlbnRpZmllcixcbiAgICBPZlBhcmVudFxufVxuXG5cbmV4cG9ydCBlbnVtIFJlc3RBY3Rpb25cbntcbiAgICBMb2FkLFxuICAgIFF1ZXJ5LFxuICAgIFNhdmUsXG4gICAgRG9cbn1cblxuXG4vKipcbiAqIFNldCBvZiBBU1QgbGlrZSBjbGFzc2VzIHRvIGtlZXAgdGhlIGZsdWVudCBBUEkgZ3JhbW1hciBpbiB0aGUgYWJzdHJhY3QgZm9ybWF0IHRvIGdpdmUgZGV2ZWxvcGVyc1xuICogY2hhbmdlcyB0byBwcm92aWRlIHRoZWlyIG93biBpbXBsZW1lbnRhdGlvblxuICpcbiAqIFRvZG86IEV4cG9zZSBCdWlsZGVyIGFzIGEgc2VydmljZVxuICpcbiAqL1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXJsU2VnbWVudFxue1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBSZXN0U2VnbWVudFR5cGUsIHB1YmxpYyB2YWx1ZT86IGFueSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPiwgcHVibGljIHJhbms6IG51bWJlciA9IC0xKVxuICAgIHtcblxuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICB9XG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gJ1dyb25nIFJlc3QgU2VnbWVudCBvcmRlcic7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBIb3N0U2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5Ib3N0LCB2YWx1ZSwgcGFyYW1zLCA1KTtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PSBudWxsLCB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gSG9zdCBzZWdtZW50IG11c3QgYmUgZmlyc3QhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIENvbnRleHRTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLkNvbnRleHQsIHZhbHVlLCBwYXJhbXMsIDEwKTtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLkhvc3QsIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBDb250ZXh0IHNlZ21lbnQgbXVzdCBmb2xsb3cgSG9zdCFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQWN0aW9uU2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcbiAgICBhY3Rpb25UeXBlOiBSZXN0QWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGFjdGlvbjogUmVzdEFjdGlvbiwgcHVibGljIGRhdGE/OiBhbnksIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLkFjdGlvbiwgYWN0aW9uLCBwYXJhbXMsIDApO1xuXG4gICAgICAgIC8vIHNhdmUgaXQgdG8gbG9jYWwgcHJvcGVydHkgZm9yIGVhc2llciBjb21wYXJpc2lvblxuICAgICAgICB0aGlzLmFjdGlvblR5cGUgPSBhY3Rpb247XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5Db250ZXh0LCB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gQWN0aW9uIG11c3QgZm9sbG93IENvbnRleHQgc2VnbWVudCFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgcmVzb3VyY2VOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IFR5cGU8YW55PiwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UsIHZhbHVlLCBwYXJhbXMsIDE1KTtcblxuICAgICAgICB0aGlzLnJlc291cmNlTmFtZSA9IGAke29iamVjdFRvTmFtZSh0aGlzLnZhbHVlKS50b0xvd2VyQ2FzZSgpfXNgO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLkFjdGlvbiB8fCBwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KSxcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBSZXNvdXJjZSBtdXN0IGZvbGxvdyBlaXRoZXIgQWN0aW9uIG9yIE9mIWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBJZGVudGlmaWVyU2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5JZGVudGlmaWVyLCB2YWx1ZSwgcGFyYW1zLCAyMCk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5SZXNvdXJjZSwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIGAke3N1cGVyLmFzc2VydE1zZygpfS4gLiBJZGVudGlmaWVyIG11c3QgZm9sbG93IFJlc291cmNlIWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBPZlBhcmVudFNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuT2ZQYXJlbnQpO1xuICAgICAgICB0aGlzLnJhbmsgPSAyO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UgfHxcbiAgICAgICAgICAgIHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuSWRlbnRpZmllcixcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gT2YgbXVzdCBmb2xsb3cgUmVzb3VyY2UhYDtcbiAgICB9XG59XG5cbiJdfQ==