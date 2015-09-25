import * as angular from 'angular';
export interface IControllerResult<TControllerType> {
    controller: TControllerType;
    scope: angular.IScope;
}
export interface IDirectiveResult {
    directive: angular.IDirective;
    scope: angular.IScope;
}
export interface IAngularFixture {
    inject: (...serviceNames: string[]) => any;
    mock: (mocks: any) => void;
    controllerWithBindings<TControllerType>(controllerName: string, bindings?: any, locals?: any, scope?: any): IControllerResult<TControllerType>;
    directive: (dom: string) => IDirectiveResult;
}
export declare var angularFixture: IAngularFixture;
