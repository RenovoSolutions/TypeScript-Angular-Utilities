'use strict';
var moment = require('moment');
var date_module_1 = require('../../../date/date.module');
exports.defaultFormats = date_module_1.defaultFormats;
exports.dateConverter = {
    fromServer: function (raw) {
        return date_module_1.dateUtility.getDateFromISOString(raw);
    },
    toServer: function (data) {
        return data != null
            ? moment(data).format(date_module_1.defaultFormats.isoFormat)
            : null;
    },
};
//# sourceMappingURL=dateConverter.js.map