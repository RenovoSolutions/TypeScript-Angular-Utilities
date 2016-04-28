"use strict";
var core_1 = require('angular2/core');
var Logger = (function () {
    function Logger() {
        this.console = console;
    }
    Logger.prototype.log = function (message) {
        this.console.log(message);
    };
    return Logger;
}());
exports.Logger = Logger;
exports.loggerToken = new core_1.OpaqueToken('An injectable logger for logging messages to the console');
exports.LOGGER_PROVIDER = new core_1.Provider(exports.loggerToken, {
    useClass: Logger,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQXNDLGVBQWUsQ0FBQyxDQUFBO0FBTXREO0lBR0M7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsb0JBQUcsR0FBSCxVQUFJLE9BQVk7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksY0FBTSxTQVVsQixDQUFBO0FBRVksbUJBQVcsR0FBZ0IsSUFBSSxrQkFBVyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7QUFFdkcsdUJBQWUsR0FBYSxJQUFJLGVBQVEsQ0FBQyxtQkFBVyxFQUFFO0lBQ2xFLFFBQVEsRUFBRSxNQUFNO0NBQ2hCLENBQUMsQ0FBQyJ9