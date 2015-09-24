export declare var moduleName: string;
export declare var serviceName: string;
export interface IViewData<TBehavior> {
    behavior: TBehavior;
}
export interface IChild<TBehavior> {
    viewData?: IViewData<TBehavior>;
}
export interface IParentChildBehaviorService {
    getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior;
    triggerChildBehavior<TBehavior, TReturnType>(child: IChild<any>, action: {
        (behavior: TBehavior): TReturnType;
    }): TReturnType;
    triggerAllChildBehaviors<TBehavior, TReturnType>(childList: IChild<TBehavior>[], action: {
        (behavior: TBehavior): TReturnType;
    }): TReturnType[];
    getAllChildBehaviors<TBehavior>(childList: IChild<TBehavior>[]): TBehavior[];
    registerChildBehavior<TBehavior>(child: IChild<TBehavior>, behavior: TBehavior): void;
}
export declare class ParentChildBehaviorService {
    getChildBehavior<TBehavior>(child: IChild<TBehavior>): TBehavior;
    triggerChildBehavior<TBehavior, TReturnType>(child: IChild<TBehavior>, action: {
        (behavior: TBehavior): TReturnType;
    }): TReturnType;
    triggerAllChildBehaviors<TBehavior, TReturnType>(childList: IChild<TBehavior>[], action: {
        (behavior: TBehavior): TReturnType;
    }): TReturnType[];
    getAllChildBehaviors<TBehavior>(childList: IChild<TBehavior>[]): TBehavior[];
    registerChildBehavior<TBehavior>(child: IChild<TBehavior>, behavior: TBehavior): void;
}
