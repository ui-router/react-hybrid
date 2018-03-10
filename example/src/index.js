import React, { Component } from 'react';
import { render } from 'react-dom';

import angular from 'angular';
import { UI_ROUTER_REACT_HYBRID } from '@uirouter/react-hybrid';

import { Visualizer } from '@uirouter/visualizer';
import { UIRouterReact, UIRouter, pushStateLocationPlugin } from '@uirouter/react';
import { UIView, UISref, UISrefActive } from '@uirouter/react';
import { ReactComponent } from './ReactComponent';
import './style.css';

const plugins = [
  pushStateLocationPlugin,
  Visualizer,
]

const states = [
  { name: 'react', url: '/react', component: ReactComponent },
  { name: 'react.angular', url: '/angular', component: 'angularComponent' },

  { name: 'angular', url: '/angular', component: 'angularComponent' },
  { name: 'angular.react', url: '/react', component: ReactComponent },
];

const ngmod = angular.module('app', [UI_ROUTER_REACT_HYBRID]);
ngmod.config($uiRouterProvider => {
  states.forEach(state => $uiRouterProvider.stateRegistry.register(state));
  $uiRouterProvider.urlService.rules.initial({ state: 'home' });
  $uiRouterProvider.plugin(Visualizer);
});

ngmod.component('angularComponent', {
  template: `
    <h1>Hello from angular</h1> 
    <h3>{{$ctrl.$state$.name}} state loaded</h3> 
    <ui-view></ui-view>
  `,
  bindings: { $state$: '<' },
})


// const configFn = (router) => 
//     router.urlService.rules.initial({ state: 'home' });

// class App extends Component {
//   render() {
//     const srefs = ['home', 'about'];
    
//     return (
//       <UIRouter plugins={plugins} states={states} config={configFn}>
//         <div>
//           {srefs.map(stateName => (
//             <UISrefActive class="active" key={stateName}>
//               <UISref to={stateName}><a>{stateName}</a></UISref>
//             </UISrefActive>
//           ))}
          
//           <UIView/>
//         </div>
//       </UIRouter>
//     );
//   }
// }

const root = document.getElementById('root');
angular.bootstrap(root, ['app']);

// render(<App />, document.getElementById('root'));