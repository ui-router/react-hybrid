import * as angular from 'angular';
import UIRouterReduxStoreProvider from './UIRouterReduxStoreProvider';
export const UI_ROUTER_REACT_HYBRID = 'ui.router.react.hybrid';
export const hybridModule = angular.module(UI_ROUTER_REACT_HYBRID, ['ui.router']);
export default UI_ROUTER_REACT_HYBRID;

hybridModule.provider('$routeReduxStore', UIRouterReduxStoreProvider);
