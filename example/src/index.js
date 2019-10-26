import angular from 'angular';
import { UI_ROUTER_REACT_HYBRID } from '@uirouter/react-hybrid';
import { Visualizer } from '@uirouter/visualizer';
import { ReactComponent } from './ReactComponent';
import { ReactFunctionalComponent } from './ReactFunctionalComponent';
import './style.css';

const states = [
  { name: 'react', url: '/react', component: ReactComponent },
  { name: 'react.angular', url: '/angular', component: 'angularComponent' },
  { name: 'react.angular.react', url: '/react', component: ReactComponent },
  { name: 'react.angular.react.angular', url: '/angular', component: 'angularComponent' },

  { name: 'angular', url: '/angular', component: 'angularComponent' },
  { name: 'angular.react', url: '/react', component: ReactFunctionalComponent },
  { name: 'angular.react.angular', url: '/angular', component: 'angularComponent' },
  { name: 'angular.react.angular.react', url: '/react', component: ReactFunctionalComponent },

  {
    name: 'angularComponentProvider',
    url: '/angularComponentProvider/:component',
    componentProvider: ['$stateParams', $stateParams => $stateParams.component],
  },

  {
    name: 'reactComponentProvider',
    url: '/reactComponentProvider/:component',
    componentProvider: [
      '$stateParams',
      $stateParams => {
        if ($stateParams.component === 'ReactComponent') {
          return ReactComponent;
        } else if ($stateParams.component === 'ReactFunctionalComponent') {
          return ReactFunctionalComponent;
        }
      },
    ],
  },
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

ngmod.component('angularComponent2', {
  template: `
    <h1>Hello from second angularjs component</h1> 
    <h3>{{$ctrl.$state$.name}} state loaded</h3> 
    <ui-view></ui-view>
  `,
  bindings: { $state$: '<' },
});

const root = document.getElementById('root');
angular.bootstrap(root, ['app']);
