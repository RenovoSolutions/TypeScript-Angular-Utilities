'use strict';
var Rx = require('rx');
var object_service_1 = require('../services/object/object.service');
var SerializableFilter = (function () {
    function SerializableFilter() {
        this.subject = new Rx.Subject();
    }
    SerializableFilter.prototype.serialize = function () {
        return this;
    };
    SerializableFilter.prototype.subscribe = function (onValueChange) {
        return this.subject.subscribe(onValueChange);
    };
    SerializableFilter.prototype.onChange = function (force) {
        if (force === void 0) { force = true; }
        var newValue = this.serialize();
        if (force || !object_service_1.objectUtility.areEqual(newValue, this._value)) {
            this._value = newValue;
            this.subject.onNext(this._value);
        }
    };
    return SerializableFilter;
}());
exports.SerializableFilter = SerializableFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksRUFBRSxXQUFNLElBQUksQ0FBQyxDQUFBO0FBRXpCLCtCQUE4QixtQ0FBbUMsQ0FBQyxDQUFBO0FBb0JsRTtJQUtDO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBSUQsc0NBQVMsR0FBVDtRQUNDLE1BQU0sQ0FBTSxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELHNDQUFTLEdBQVQsVUFBVSxhQUFnRDtRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBUyxLQUFxQjtRQUFyQixxQkFBcUIsR0FBckIsWUFBcUI7UUFDN0IsSUFBSSxRQUFRLEdBQWdCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyw4QkFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNGLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQnFCLDBCQUFrQixxQkEwQnZDLENBQUEifQ==