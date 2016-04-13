'use strict';
var DataContractsHelper = (function () {
    function DataContractsHelper() {
    }
    DataContractsHelper.prototype.versionEndpoint = function (endpoint, versionNumber) {
        var versionExpression = /\/v\d+\//;
        var apiExpression = /\/api\//;
        var versionString = 'v' + versionNumber;
        var searchResult = endpoint.search(versionExpression);
        if (searchResult !== -1) {
            return endpoint.replace(versionExpression, '/' + versionString + '/');
        }
        else {
            return endpoint.replace(apiExpression, '/api/' + versionString + '/');
        }
    };
    return DataContractsHelper;
}());
exports.helper = new DataContractsHelper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YUNvbnRyYWN0c0hlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YUNvbnRyYWN0c0hlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQU1iO0lBQUE7SUFjQSxDQUFDO0lBYkEsNkNBQWUsR0FBZixVQUFnQixRQUFnQixFQUFFLGFBQXFCO1FBQ3RELElBQUksaUJBQWlCLEdBQVcsVUFBVSxDQUFDO1FBQzNDLElBQUksYUFBYSxHQUFXLFNBQVMsQ0FBQztRQUV0QyxJQUFJLGFBQWEsR0FBVyxHQUFHLEdBQUcsYUFBYSxDQUFDO1FBRWhELElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsR0FBRyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sR0FBRyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkUsQ0FBQztJQUNGLENBQUM7SUFDRiwwQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBRVUsY0FBTSxHQUF5QixJQUFJLG1CQUFtQixFQUFFLENBQUMifQ==