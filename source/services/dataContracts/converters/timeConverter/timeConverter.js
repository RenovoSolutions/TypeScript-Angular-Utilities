'use strict';
var moment = require('moment');
var date_module_1 = require('../../../date/date.module');
exports.defaultFormats = date_module_1.defaultFormats;
var timezone_service_1 = require('../../../timezone/timezone.service');
exports.timeConverter = {
    fromServer: function (raw) {
        return timezone_service_1.timezoneService.buildMomentWithTimezone(raw, timezone_service_1.timezoneService.currentTimezone, date_module_1.defaultFormats.timeFormat);
    },
    toServer: function (data) {
        return data != null
            ? moment(data).format(date_module_1.defaultFormats.timeFormat)
            : null;
    },
};
//# sourceMappingURL=timeConverter.js.map