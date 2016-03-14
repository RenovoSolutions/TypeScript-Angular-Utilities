'use strict';
var _ = require('lodash');
var ItemList = (function () {
    function ItemList() {
    }
    ItemList.prototype.setItems = function (items) {
        this.items = items;
    };
    ItemList.prototype.get = function (value) {
        var predicate;
        if (typeof value === 'string') {
            predicate = function (item) {
                return (item.name === value);
            };
        }
        else {
            predicate = function (item) {
                return (item.value === value);
            };
        }
        return _.find(this.items, predicate);
    };
    ItemList.prototype.all = function () {
        return this.items;
    };
    return ItemList;
}());
exports.ItemList = ItemList;
//# sourceMappingURL=itemList.js.map