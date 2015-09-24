'use strict';
var BaseNotifier = (function () {
    function BaseNotifier() {
    }
    BaseNotifier.prototype.info = function (message) {
        this.notify(message);
    };
    BaseNotifier.prototype.warning = function (message) {
        this.notify(message);
    };
    BaseNotifier.prototype.error = function (message) {
        this.notify(message);
    };
    BaseNotifier.prototype.success = function (message) {
        this.notify(message);
    };
    BaseNotifier.prototype.notify = function (message) {
        window.alert(message);
        console.log(message);
    };
    return BaseNotifier;
})();
exports.BaseNotifier = BaseNotifier;
//# sourceMappingURL=baseNotifier.js.map