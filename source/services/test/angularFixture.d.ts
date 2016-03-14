import * as angular from 'angular';
import 'angular-mocks';
export interface IControllerResult<TControllerType> {
    controller: TControllerType;
    scope: angular.IScope;
}
export interface IDirectiveResult<TControllerType> {
    directive: angular.IDirective;
    scope: angular.IScope;
    controller: TControllerType;
}
export interface IAngularFixture {
    inject: (...serviceNames: string[]) => any;
    mock: (mocks: any) => void;
    controllerWithBindings<TControllerType>(controllerName: string, bindings?: any, locals?: any, scope?: any): IControllerResult<TControllerType>;
    directive<TControllerType>(directiveName: string, dom: string, scope: angular.IScope): IDirectiveResult<TControllerType>;
}
export declare var angularFixture: IAngularFixture;
