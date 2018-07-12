/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { assert, objectToName } from '../../utils/lang';
/** @enum {number} */
var RestSegmentType = {
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
var RestAction = {
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
var /**
 * Set of AST like classes to keep the fluent API grammar in the abstract format to give developers
 * changes to provide their own implementation
 *
 * Todo: Expose Builder as a service
 *
 * @abstract
 */
UrlSegment = /** @class */ (function () {
    function UrlSegment(type, value, params, rank) {
        if (rank === void 0) { rank = -1; }
        this.type = type;
        this.value = value;
        this.params = params;
        this.rank = rank;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    UrlSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
    };
    /**
     * @return {?}
     */
    UrlSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return 'Wrong Rest Segment order';
    };
    return UrlSegment;
}());
/**
 * Set of AST like classes to keep the fluent API grammar in the abstract format to give developers
 * changes to provide their own implementation
 *
 * Todo: Expose Builder as a service
 *
 * @abstract
 */
export { UrlSegment };
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
var HostSegment = /** @class */ (function (_super) {
    tslib_1.__extends(HostSegment, _super);
    function HostSegment(value, params) {
        var _this = _super.call(this, RestSegmentType.Host, value, params, 5) || this;
        _this.value = value;
        _this.params = params;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    HostSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment == null, this.assertMsg());
    };
    /**
     * @return {?}
     */
    HostSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Host segment must be first!";
    };
    return HostSegment;
}(UrlSegment));
export { HostSegment };
function HostSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    HostSegment.prototype.value;
    /** @type {?} */
    HostSegment.prototype.params;
}
var ContextSegment = /** @class */ (function (_super) {
    tslib_1.__extends(ContextSegment, _super);
    function ContextSegment(value, params) {
        var _this = _super.call(this, RestSegmentType.Context, value, params, 10) || this;
        _this.value = value;
        _this.params = params;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    ContextSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment === RestSegmentType.Host, this.assertMsg());
    };
    /**
     * @return {?}
     */
    ContextSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Context segment must follow Host!";
    };
    return ContextSegment;
}(UrlSegment));
export { ContextSegment };
function ContextSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    ContextSegment.prototype.value;
    /** @type {?} */
    ContextSegment.prototype.params;
}
var ActionSegment = /** @class */ (function (_super) {
    tslib_1.__extends(ActionSegment, _super);
    function ActionSegment(action, data, params) {
        var _this = _super.call(this, RestSegmentType.Action, action, params, 0) || this;
        _this.action = action;
        _this.data = data;
        _this.params = params;
        // save it to local property for easier comparision
        // save it to local property for easier comparision
        _this.actionType = action;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    ActionSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment === RestSegmentType.Context, this.assertMsg());
    };
    /**
     * @return {?}
     */
    ActionSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Action must follow Context segment!";
    };
    return ActionSegment;
}(UrlSegment));
export { ActionSegment };
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
var ResourceSegment = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceSegment, _super);
    function ResourceSegment(value, params) {
        var _this = _super.call(this, RestSegmentType.Resource, value, params, 15) || this;
        _this.value = value;
        _this.params = params;
        _this.resourceName = objectToName(_this.value).toLowerCase() + "s";
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    ResourceSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert((prevSegment === RestSegmentType.Action || prevSegment === RestSegmentType.OfParent), this.assertMsg());
    };
    /**
     * @return {?}
     */
    ResourceSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Resource must follow either Action or Of!";
    };
    return ResourceSegment;
}(UrlSegment));
export { ResourceSegment };
function ResourceSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    ResourceSegment.prototype.resourceName;
    /** @type {?} */
    ResourceSegment.prototype.value;
    /** @type {?} */
    ResourceSegment.prototype.params;
}
var IdentifierSegment = /** @class */ (function (_super) {
    tslib_1.__extends(IdentifierSegment, _super);
    function IdentifierSegment(value, params) {
        var _this = _super.call(this, RestSegmentType.Identifier, value, params, 20) || this;
        _this.value = value;
        _this.params = params;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    IdentifierSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment === RestSegmentType.Resource, this.assertMsg());
    };
    /**
     * @return {?}
     */
    IdentifierSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Identifier must follow Resource!";
    };
    return IdentifierSegment;
}(UrlSegment));
export { IdentifierSegment };
function IdentifierSegment_tsickle_Closure_declarations() {
    /** @type {?} */
    IdentifierSegment.prototype.value;
    /** @type {?} */
    IdentifierSegment.prototype.params;
}
var OfParentSegment = /** @class */ (function (_super) {
    tslib_1.__extends(OfParentSegment, _super);
    function OfParentSegment() {
        var _this = _super.call(this, RestSegmentType.OfParent) || this;
        _this.rank = 2;
        return _this;
    }
    /**
     * @param {?} prevSegment
     * @return {?}
     */
    OfParentSegment.prototype.assertSegment = /**
     * @param {?} prevSegment
     * @return {?}
     */
    function (prevSegment) {
        assert(prevSegment === RestSegmentType.Resource ||
            prevSegment === RestSegmentType.Identifier, this.assertMsg());
    };
    /**
     * @return {?}
     */
    OfParentSegment.prototype.assertMsg = /**
     * @return {?}
     */
    function () {
        return _super.prototype.assertMsg.call(this) + ". . Of must follow Resource!";
    };
    return OfParentSegment;
}(UrlSegment));
export { OfParentSegment };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VnbWVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhcmliYXVpL2NvcmUvIiwic291cmNlcyI6WyJkb21haW4vdXJsL3NlZ21lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFxQkEsT0FBTyxFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCdEQ7Ozs7Ozs7O0FBQUE7SUFFSSxvQkFBbUIsSUFBcUIsRUFBUyxLQUFXLEVBQ3pDLFFBQXFDLElBQWlCO3VDQUFELENBQUM7UUFEdEQsU0FBSSxHQUFKLElBQUksQ0FBaUI7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ3pDLFdBQU0sR0FBTixNQUFNO1FBQStCLFNBQUksR0FBSixJQUFJLENBQWE7S0FHeEU7Ozs7O0lBR0Qsa0NBQWE7Ozs7SUFBYixVQUFjLFdBQTRCO0tBRXpDOzs7O0lBRUQsOEJBQVM7OztJQUFUO1FBRUksTUFBTSxDQUFDLDBCQUEwQixDQUFDO0tBQ3JDO3FCQW5FTDtJQW9FQyxDQUFBOzs7Ozs7Ozs7QUFqQkQsc0JBaUJDOzs7Ozs7Ozs7OztBQUdELElBQUE7SUFBaUMsdUNBQVU7SUFHdkMscUJBQW1CLEtBQVUsRUFBUyxNQUE0QjtRQUFsRSxZQUVJLGtCQUFNLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FDaEQ7UUFIa0IsV0FBSyxHQUFMLEtBQUssQ0FBSztRQUFTLFlBQU0sR0FBTixNQUFNLENBQXNCOztLQUdqRTs7Ozs7SUFHRCxtQ0FBYTs7OztJQUFiLFVBQWMsV0FBNEI7UUFFdEMsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7S0FDakQ7Ozs7SUFHRCwrQkFBUzs7O0lBQVQ7UUFFSSxNQUFNLENBQUksaUJBQU0sU0FBUyxXQUFFLG9DQUFpQyxDQUFDO0tB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QUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7S0FDdEU7Ozs7SUFFRCxxQ0FBUzs7O0lBQVQ7UUFFSSxNQUFNLENBQUksaUJBQU0sU0FBUyxXQUFFLHlDQUFzQyxDQUFDO0tBQ3JFOzRCQXpMTDtFQXdLdUMsVUFBVSxFQWtCaEQsQ0FBQTtBQWxCRCw2QkFrQkM7Ozs7Ozs7QUFHRCxJQUFBO0lBQXFDLDJDQUFVO0lBRzNDO1FBQUEsWUFFSSxrQkFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLFNBRWxDO1FBREcsS0FBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7O0tBQ2pCOzs7OztJQUdELHVDQUFhOzs7O0lBQWIsVUFBYyxXQUE0QjtRQUV0QyxNQUFNLENBQUMsV0FBVyxLQUFLLGVBQWUsQ0FBQyxRQUFRO1lBQzNDLFdBQVcsS0FBSyxlQUFlLENBQUMsVUFBVSxFQUMxQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELG1DQUFTOzs7SUFBVDtRQUVJLE1BQU0sQ0FBSSxpQkFBTSxTQUFTLFdBQUUsaUNBQThCLENBQUM7S0FDN0Q7MEJBak5MO0VBNkxxQyxVQUFVLEVBcUI5QyxDQUFBO0FBckJELDJCQXFCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7YXNzZXJ0LCBvYmplY3RUb05hbWV9IGZyb20gJy4uLy4uL3V0aWxzL2xhbmcnO1xuXG5leHBvcnQgZW51bSBSZXN0U2VnbWVudFR5cGVcbntcbiAgICBIb3N0LFxuICAgIENvbnRleHQsXG4gICAgQWN0aW9uLFxuICAgIFJlc291cmNlLFxuICAgIElkZW50aWZpZXIsXG4gICAgT2ZQYXJlbnRcbn1cblxuXG5leHBvcnQgZW51bSBSZXN0QWN0aW9uXG57XG4gICAgTG9hZCxcbiAgICBRdWVyeSxcbiAgICBTYXZlLFxuICAgIERvXG59XG5cblxuLyoqXG4gKiBTZXQgb2YgQVNUIGxpa2UgY2xhc3NlcyB0byBrZWVwIHRoZSBmbHVlbnQgQVBJIGdyYW1tYXIgaW4gdGhlIGFic3RyYWN0IGZvcm1hdCB0byBnaXZlIGRldmVsb3BlcnNcbiAqIGNoYW5nZXMgdG8gcHJvdmlkZSB0aGVpciBvd24gaW1wbGVtZW50YXRpb25cbiAqXG4gKiBUb2RvOiBFeHBvc2UgQnVpbGRlciBhcyBhIHNlcnZpY2VcbiAqXG4gKi9cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFVybFNlZ21lbnRcbntcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogUmVzdFNlZ21lbnRUeXBlLCBwdWJsaWMgdmFsdWU/OiBhbnksXG4gICAgICAgICAgICAgICAgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4sIHB1YmxpYyByYW5rOiBudW1iZXIgPSAtMSlcbiAgICB7XG5cbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgfVxuXG4gICAgYXNzZXJ0TXNnKCk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuICdXcm9uZyBSZXN0IFNlZ21lbnQgb3JkZXInO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgSG9zdFNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuSG9zdCwgdmFsdWUsIHBhcmFtcywgNSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT0gbnVsbCwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIEhvc3Qgc2VnbWVudCBtdXN0IGJlIGZpcnN0IWA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0U2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5Db250ZXh0LCB2YWx1ZSwgcGFyYW1zLCAxMCk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRTZWdtZW50KHByZXZTZWdtZW50OiBSZXN0U2VnbWVudFR5cGUpOiB2b2lkXG4gICAge1xuICAgICAgICBhc3NlcnQocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5Ib3N0LCB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gQ29udGV4dCBzZWdtZW50IG11c3QgZm9sbG93IEhvc3QhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEFjdGlvblNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG4gICAgYWN0aW9uVHlwZTogUmVzdEFjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3Rpb246IFJlc3RBY3Rpb24sIHB1YmxpYyBkYXRhPzogYW55LCBwdWJsaWMgcGFyYW1zPzogTWFwPHN0cmluZywgc3RyaW5nPilcbiAgICB7XG4gICAgICAgIHN1cGVyKFJlc3RTZWdtZW50VHlwZS5BY3Rpb24sIGFjdGlvbiwgcGFyYW1zLCAwKTtcblxuICAgICAgICAvLyBzYXZlIGl0IHRvIGxvY2FsIHByb3BlcnR5IGZvciBlYXNpZXIgY29tcGFyaXNpb25cbiAgICAgICAgdGhpcy5hY3Rpb25UeXBlID0gYWN0aW9uO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuQ29udGV4dCwgdGhpcy5hc3NlcnRNc2coKSk7XG4gICAgfVxuXG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIEFjdGlvbiBtdXN0IGZvbGxvdyBDb250ZXh0IHNlZ21lbnQhYDtcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VnbWVudCBleHRlbmRzIFVybFNlZ21lbnRcbntcblxuICAgIHJlc291cmNlTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBUeXBlPGFueT4sIHB1YmxpYyBwYXJhbXM/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlLCB2YWx1ZSwgcGFyYW1zLCAxNSk7XG5cbiAgICAgICAgdGhpcy5yZXNvdXJjZU5hbWUgPSBgJHtvYmplY3RUb05hbWUodGhpcy52YWx1ZSkudG9Mb3dlckNhc2UoKX1zYDtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydCgocHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5BY3Rpb24gfHwgcHJldlNlZ21lbnQgPT09IFJlc3RTZWdtZW50VHlwZS5PZlBhcmVudCksXG4gICAgICAgICAgICB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gUmVzb3VyY2UgbXVzdCBmb2xsb3cgZWl0aGVyIEFjdGlvbiBvciBPZiFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgSWRlbnRpZmllclNlZ21lbnQgZXh0ZW5kcyBVcmxTZWdtZW50XG57XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IGFueSwgcHVibGljIHBhcmFtcz86IE1hcDxzdHJpbmcsIHN0cmluZz4pXG4gICAge1xuICAgICAgICBzdXBlcihSZXN0U2VnbWVudFR5cGUuSWRlbnRpZmllciwgdmFsdWUsIHBhcmFtcywgMjApO1xuICAgIH1cblxuXG4gICAgYXNzZXJ0U2VnbWVudChwcmV2U2VnbWVudDogUmVzdFNlZ21lbnRUeXBlKTogdm9pZFxuICAgIHtcbiAgICAgICAgYXNzZXJ0KHByZXZTZWdtZW50ID09PSBSZXN0U2VnbWVudFR5cGUuUmVzb3VyY2UsIHRoaXMuYXNzZXJ0TXNnKCkpO1xuICAgIH1cblxuICAgIGFzc2VydE1zZygpOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBgJHtzdXBlci5hc3NlcnRNc2coKX0uIC4gSWRlbnRpZmllciBtdXN0IGZvbGxvdyBSZXNvdXJjZSFgO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgT2ZQYXJlbnRTZWdtZW50IGV4dGVuZHMgVXJsU2VnbWVudFxue1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoUmVzdFNlZ21lbnRUeXBlLk9mUGFyZW50KTtcbiAgICAgICAgdGhpcy5yYW5rID0gMjtcbiAgICB9XG5cblxuICAgIGFzc2VydFNlZ21lbnQocHJldlNlZ21lbnQ6IFJlc3RTZWdtZW50VHlwZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGFzc2VydChwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLlJlc291cmNlIHx8XG4gICAgICAgICAgICBwcmV2U2VnbWVudCA9PT0gUmVzdFNlZ21lbnRUeXBlLklkZW50aWZpZXIsXG4gICAgICAgICAgICB0aGlzLmFzc2VydE1zZygpKTtcbiAgICB9XG5cbiAgICBhc3NlcnRNc2coKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gYCR7c3VwZXIuYXNzZXJ0TXNnKCl9LiAuIE9mIG11c3QgZm9sbG93IFJlc291cmNlIWA7XG4gICAgfVxufVxuXG4iXX0=