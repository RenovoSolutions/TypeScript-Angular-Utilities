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
//# sourceMappingURL=filter.js.map