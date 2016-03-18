## errorHandler
An http intercepter that will intercept http error responses and display error messages to the notification service when errors occur. A one stop way to handle common http error responses.

### Full demonstration

To wire up the handler, add the following code to an Angular 1 application:

```
import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __errorHandler = services.errorHandler;

var moduleName = 'myCustomAngularModule';
var interceptorName: string = 'httpErrorInterceptor';

angular.module(moduleName, [__errorHandler.moduleName])
    .config(httpConfiguration);

httpConfiguration.$inject = ['$httpProvider'];
function httpConfiguration($httpProvider: angular.IHttpProvider): void {
	$httpProvider.interceptors.push(interceptorName); // Add your custom interceptor by name
}

httpErrorInterceptor.$inject = [__errorHandler.serviceName, '$q'];
function httpErrorInterceptor(errorHandler: __errorHandler.IErrorHandlerService, $q: angular.IQService): any {
	return {
		responseError: (rejection: __errorHandler.IRejection): angular.IPromise<any> => {
			errorHandler.httpResponseError(rejection);
			return $q.reject(rejection);
		},
	};
}

```

### `loginUrl`
The http error handler will redirect to a login URL if a 401 response code is encountered. By default, this URL is `/login`. You can override this behavior if desired by setting it on the `errorHandlerProvider`:

```
angular.module(moduleName, [__errorHandler.moduleName])
    .config(httpConfiguration);

httpConfiguration.$inject = [__errorHandler.serviceName + 'Provider'];
function httpConfiguration(errorHandlerProvider: __errorHandler.IErrorHandlerServiceProvider): void {
    errorHandlerProvider.loginUrl = '/login.aspx';
}
```

### `errorMessages`
You can customize the error messages that are displayed when an http error code is received if desired. Set the errorMessages property on the errorHandlerProvider to an object implementing the following interface:
```
export interface IErrorMessages {
    badRequestError: string;
    forbiddenError: string;
    invalidUrlError: string;
    timeoutError: string;
    internalServerError: string;
    defaultError: string;
}
```

* `badRequestError` is displayed when a 400 is received
* `forbiddenError` is displayed when a 403 is received
* `invalidUrlError` is displayed when a 404 is received
* `timeoutError` is displayed when a 408 is received
* `internalServerError` is displayed when 500 is received
* `defaultError` is displayed for any other error status code

Example:
```
angular.module(moduleName, [__errorHandler.moduleName])
    .config(httpConfiguration);

httpConfiguration.$inject = [__errorHandler.serviceName + 'Provider'];
function httpConfiguration(errorHandlerProvider: __errorHandler.IErrorHandlerServiceProvider): void {
    errorHandlerProvider.errorMessages = {
		badRequestError: 'Your reqest failed one or more validation checks.',
        forbiddenError: 'You have insufficient permissions to perform this action',
        invalidUrlError: 'Resource not found. This issue has been logged',
        timeoutError: 'Request timed out. Check your network connection or contact your administrator for issues',
        internalServerError: 'The system has encountered an error. This issue has been logged. Please contact support if you are unable to complete critical tasks',
        defaultError: 'An unknown error occurred',
    };
}
```

### `returnUrlParam`
When a 401 is received, the browser is redirected to the login url, but the current url is appended to the login url as a return url param. This allows makes it possible for the login page to redirect back to the previous page after successfully logging in. If desired, the name of the return url param can be customized. The default value is `returnUrl`. To change the name of the return url param:
```
angular.module(moduleName, [__errorHandler.moduleName])
    .config(httpConfiguration);

httpConfiguration.$inject = [__errorHandler.serviceName + 'Provider'];
function httpConfiguration(errorHandlerProvider: __errorHandler.IErrorHandlerServiceProvider): void {
    errorHandlerProvider.returnUrlParam = 'redirectTo';
}
```
