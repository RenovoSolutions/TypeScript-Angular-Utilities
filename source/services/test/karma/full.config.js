// Karma configuration
var default_config_1 = require('./default.config');
function default_1(karma) {
    var options = default_config_1.default(karma);
    options.browsers = ['Chrome', 'Firefox', 'IE'];
    karma.set(options);
    return options;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=full.config.js.map