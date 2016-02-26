'use strict';
var number_service_1 = require('../number/number.service');
exports.factoryName = 'fileSizeFactory';
var FileSizeService = (function () {
    function FileSizeService(numberUtility, bytes) {
        this.BYTES_PER_GB = 1073741824;
        this.BYTES_PER_MB = 1048576;
        this.BYTES_PER_KB = 1024;
        this.bytes = bytes;
        if (bytes >= this.BYTES_PER_GB) {
            this.isGB = true;
            this.GB = bytes / this.BYTES_PER_GB;
            this.GB = numberUtility.preciseRound(this.GB, 1);
        }
        else {
            this.isGB = false;
            if (bytes >= this.BYTES_PER_MB) {
                this.isMB = true;
                this.MB = bytes / this.BYTES_PER_MB;
                this.MB = numberUtility.preciseRound(this.MB, 1);
            }
            else {
                this.isMB = false;
                if (bytes >= this.BYTES_PER_KB) {
                    this.isKB = true;
                    this.KB = bytes / this.BYTES_PER_KB;
                    this.KB = numberUtility.preciseRound(this.KB, 1);
                }
                else {
                    this.isKB = false;
                }
            }
        }
        this.bytes = Math.round(this.bytes);
    }
    FileSizeService.prototype.display = function () {
        if (this.isGB) {
            return this.GB + ' GB';
        }
        else if (this.isMB) {
            return this.MB + ' MB';
        }
        else if (this.isKB) {
            return this.KB + ' KB';
        }
        else {
            return this.bytes + ' bytes';
        }
    };
    return FileSizeService;
}());
fileSizeFactory.$inject = [number_service_1.serviceName];
function fileSizeFactory(numberUtility) {
    'use strict';
    return {
        getInstance: function (bytes) {
            return new FileSizeService(numberUtility, bytes);
        },
    };
}
exports.fileSizeFactory = fileSizeFactory;
//# sourceMappingURL=fileSize.service.js.map