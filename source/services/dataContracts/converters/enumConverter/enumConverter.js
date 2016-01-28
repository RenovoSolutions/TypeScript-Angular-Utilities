'use strict';
var EnumConverter = (function () {
    function EnumConverter(enumType) {
        this.enumType = enumType;
    }
    EnumConverter.prototype.fromServer = function (raw) {
        return this.enumType.get(raw);
    };
    EnumConverter.prototype.toServer = function (data) {
        return data != null
            ? data.value
            : null;
    };
    return EnumConverter;
})();
exports.EnumConverter = EnumConverter;
;
//# sourceMappingURL=enumConverter.js.map