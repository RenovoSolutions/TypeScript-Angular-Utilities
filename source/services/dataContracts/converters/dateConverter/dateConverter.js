'use strict';
var moment = require('moment');
var date_module_1 = require('../../../date/date.module');
exports.dateConverter = {
    fromServer: function (raw) {
        return date_module_1.dateUtility.getDateFromISOString(raw);
    },
    toServer: function (data) {
        return moment(data).format(date_module_1.defaultFormats.isoFormat);
    },
};
//# sourceMappingURL=dateConverter.js.map