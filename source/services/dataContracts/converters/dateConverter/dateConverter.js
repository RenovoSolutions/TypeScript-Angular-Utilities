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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGVDb252ZXJ0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFHakMsNEJBQTRDLDJCQUEyQixDQUFDLENBQUE7QUFFL0Qsc0JBQWM7QUFFWixxQkFBYSxHQUE4QjtJQUNyRCxVQUFVLFlBQUMsR0FBVztRQUNyQixNQUFNLENBQUMseUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsUUFBUSxZQUFDLElBQW1CO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSTtjQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLDRCQUFjLENBQUMsU0FBUyxDQUFDO2NBQzdDLElBQUksQ0FBQztJQUNULENBQUM7Q0FDRCxDQUFDIn0=