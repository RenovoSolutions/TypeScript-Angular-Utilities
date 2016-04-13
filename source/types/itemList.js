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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpdGVtTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQWE1QjtJQUFBO0lBMEJBLENBQUM7SUF2QkEsMkJBQVEsR0FBUixVQUFTLEtBQWtCO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBRyxHQUFILFVBQUksS0FBc0I7UUFDekIsSUFBSSxTQUF5QyxDQUFDO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsU0FBUyxHQUFHLFVBQUMsSUFBZTtnQkFDM0IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxTQUFTLEdBQUcsVUFBQyxJQUFlO2dCQUMzQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxzQkFBRyxHQUFIO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLGdCQUFRLFdBMEJwQixDQUFBIn0=