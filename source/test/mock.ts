// uses typings/lodash
// uses typings/sinon
// uses typings/jquery
// uses typings/angularjs

module rl.utilities.test {
	'use strict';
	
	export interface IMock {
		service(service?: any): any;
		promise<TDataType>(service: any, methodName: string, data?: TDataType, successful?: boolean): void;
		promiseWithCallback<TDataType>(service: any, methodName: string, callback: {(...params: any[]): TDataType}, successful?: boolean): void;
		flush<TDataType>(service: any): void;
	}
	
	interface IMockRequest<TDataType> {
		promise: JQueryDeferred<TDataType>;
		data: TDataType;
		successful: boolean;
	}
	
	class Mock {
		service(service?: any): any {
			if (angular.isDefined(service) === false) {
				service = {};
			}
	
			service._mock_requestList_ = [];
	
			return service;
		}
	
		promise<TDataType>(service: any, methodName: string, data?: TDataType, successful?: boolean): void {
			// Default successful to true
			if (_.isUndefined(successful)) {
				successful = true;
			}
	
			service[methodName] = sinon.spy((): any => {
				var deferred: JQueryDeferred<TDataType> = jQuery.Deferred();
	
				service._mock_requestList_.push({
					promise: deferred,
					data: data,
					successful: successful,
				});
	
				return deferred.promise();
			});
		}
	
		promiseWithCallback<TDataType>(service: any, methodName: string, callback: {(...params: any[]): TDataType}, successful?: boolean): void {
			// Default successful to true
			if (_.isUndefined(successful)) {
				successful = true;
			}
	
			service[methodName] = sinon.spy((...params: any[]): any => {
				var deferred: JQueryDeferred<TDataType> = jQuery.Deferred();
	
				service._mock_requestList_.push({
					promise: deferred,
					data: callback.apply(this, params),
					successful: successful,
				});
	
				return deferred.promise();
			});
		}
	
		flush<TDataType>(service: any, scope?: ng.IScope): void {
			// Save local reference to the request list and then clear
			var currentPendingRequests: IMockRequest<TDataType>[] = service._mock_requestList_;
			service._mock_requestList_ = [];
	
			// Process the saved list.
			// This way if any additional requests are generated while processing the current / local list 
			//  these requests will be queued until the next call to flush().
			_.each(currentPendingRequests, (request: IMockRequest<TDataType>): void => {
				if (request.successful) {
					request.promise.resolve(request.data);
				} else {
					request.promise.reject(request.data);
				}
	
				if (_.isUndefined(scope) === false) {
					scope.$digest();
				}
			});
		}
	}
	
	export var mock: IMock = new Mock();
}