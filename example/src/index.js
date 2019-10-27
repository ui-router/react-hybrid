import angular from 'angular';
import * as React from 'react';

import { UI_ROUTER_REACT_HYBRID } from '@uirouter/react-hybrid';
import { Visualizer } from '@uirouter/visualizer';
import { ReactComponent } from './ReactComponent';
import { ReactFunctionalComponent } from './ReactFunctionalComponent';
import './style.css';

const states = [
  { name: 'react', url: '/react', component: ReactComponent },
  { name: 'react.angular', url: '/angular', component: 'angularComponent' },
  { name: 'react.angular.react', url: '/react', component: ReactFunctionalComponent },
  { name: 'react.angular.react.angular', url: '/angular', component: 'angularComponent2' },

  { name: 'angular', url: '/angular', component: 'angularComponent' },
  { name: 'angular.react', url: '/react', component: ReactComponent },
  { name: 'angular.react.angular', url: '/angular', component: 'angularComponent2' },
  { name: 'angular.react.angular.react', url: '/react', component: ReactFunctionalComponent },

  {
    name: 'componentProvider',
    url: '/componentProvider/:component',
    componentProvider: [
      '$stateParams',
      $stateParams => {
        if ($stateParams.component === 'angularComponent' || $stateParams.component === 'angularComponent2') {
          return $stateParams.component;
        }
      },
    ],
  },

  {
    name: 'reactComponentProvider',
    url: '/reactComponentProvider/:component',
    component: props => {
      const componentName = props.transition.params().component;
      if (componentName === 'ReactComponent') {
        return <ReactComponent {...props} />;
      } else if (componentName === 'ReactFunctionalComponent') {
        return <ReactFunctionalComponent {...props} />;
      }
    },
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
