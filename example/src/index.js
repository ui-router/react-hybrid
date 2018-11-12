import angular from 'angular';
import { UI_ROUTER_REACT_HYBRID } from '@uirouter/react-hybrid';
import { Visualizer } from '@uirouter/visualizer';
import { ReactComponent } from './ReactComponent';
import './style.css';

const states = [
  { name: 'react', url: '/react', component: ReactComponent },
  { name: 'react.angular', url: '/angular', component: 'angularComponent' },
  { name: 'react.angular.react', url: '/react', component: ReactComponent },
  { name: 'react.angular.react.angular', url: '/angular', component: 'angularComponent' },

  { name: 'angular', url: '/angular', component: 'angularComponent' },
  { name: 'angular.react', url: '/react', component: ReactComponent },
  { name: 'angular.react.angular', url: '/angular', component: 'angularComponent' },
  { name: 'angular.react.angular.react', url: '/react', component: ReactComponent },
];

const ngmod = angular.module('app', [UI_ROUTER_REACT_HYBRID]);
ngmod.config([
  '$uiRouterProvider',
  $uiRouterProvider => {
    states.forEach(state => $uiRouterProvider.stateRegistry.register(state));
    $uiRouterProvider.urlService.rules.initial({ state: 'home' });
    $uiRouterProvider.plugin(Visualizer);
  },
]);

ngmod.component('angularComponent', {
  template: `
    <h1>Hello from angularjs</h1> 
    <h3>{{$ctrl.$state$.name}} state loaded</h3> 
    <ui-view></ui-view>
  `,
  bindings: { $state$: '<' },
});

const root = document.getElementById('root');
angular.bootstrap(root, ['app']);
