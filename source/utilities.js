'use strict';
var angular = require('angular');
var behaviors = require('./behaviors/behaviors.module');
exports.behaviors = behaviors;
var filters = require('./filters/filters.module');
exports.filters = filters;
var services = require('./services/services.module');
exports.services = services;
var types = require('./types/types.module');
exports.types = types;
exports.name = 'rl.utilities';
angular.module(exports.name, [
    behaviors.name,
    filters.name,
    services.moduleName,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXRpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksU0FBUyxXQUFNLDhCQUE4QixDQUFDLENBQUE7QUFLakQsaUJBQVM7QUFKbEIsSUFBWSxPQUFPLFdBQU0sMEJBQTBCLENBQUMsQ0FBQTtBQUloQyxlQUFPO0FBSDNCLElBQVksUUFBUSxXQUFNLDRCQUE0QixDQUFDLENBQUE7QUFHMUIsZ0JBQVE7QUFGckMsSUFBWSxLQUFLLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUVQLGFBQUs7QUFFakMsWUFBSSxHQUFXLGNBQWMsQ0FBQztBQUV6QyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQUksRUFBRTtJQUNwQixTQUFTLENBQUMsSUFBSTtJQUNkLE9BQU8sQ0FBQyxJQUFJO0lBQ1osUUFBUSxDQUFDLFVBQVU7Q0FDbkIsQ0FBQyxDQUFDIn0=