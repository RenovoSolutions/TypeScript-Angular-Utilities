// Karma configuration
var full_config_1 = require('./full.config');
function default_1(karma) {
    var options = full_config_1.default(karma);
    options.reporters = ['teamcity'];
    karma.set(options);
    return options;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=teamCity.config.js.map