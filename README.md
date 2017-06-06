# UI-Router react-hybrid

### UI-Router support for Hybrid Angular/React apps

This package enables UI-Router to route to both AngularJS components (and/or templates) and React components.
Your app will be hosted by AngularJS while you incrementally migrate to React.

```js
import { ReactAboutComponent } from "./about.component";

/// ...

$stateProvider.state({
  name: 'home', 
  url: '/home',
  component: 'ng1HomeComponent' // AngularJS component or directive name
})

.state({
  name: 'about', 
  url: '/about',
  component: ReactAboutComponent // React component class reference
});

.state({
  name: 'other',
  url: '/other',
  template: '<h1>Other</h1>', // AngularJS template/controller
  controller: function($scope) { /* do stuff */ }
})

```

When routing to a React component, that component uses the standard
[React directives (UIView and UISref) from `@uirouter/react`](https://ui-router.github.io/react/docs/latest/modules/components.html).

When routing to an AngularJS component or template, that component uses the standard
[AngularJS directives (ui-view and ui-sref) from `@uirouter/angularjs`](https://ui-router.github.io/ng1/docs/latest/modules/directives.html).


### Getting started

Remove `angular-ui-router` (or `@uirouter/angularjs`) from your package.json and replace it with `@uirouter/react-hybrid`.
Add the `react` and `react-dom` dependencies.

```
dependencies: {
  ...
  "angular": "^1.6.0",
  "react": "^15.4.0",
  "react-dom": "^15.4.0",
   ...
  "@uirouter/react-hybrid": "^0.0.1",
  ...
}
```

#### Add AngularJS module for hybrid support

```js
import { UI_ROUTER_REACT_HYBRID } from '@uirouter/react-hybrid';
let ng1module = angular.module("myApp", ['ui.router', UI_ROUTER_REACT_HYBRID]);
```

#### Route to AngularJS components/templates

Your existing AngularJS routes work the same as before.

```
var foo = { 
  name: 'foo',
  url: '/foo',
  component: 'fooComponent'
};
$stateProvider.state(foo);

var bar = { 
  name: 'foo.bar',
  url: '/bar',
  templateUrl: '/bar.html',
  controller: 'BarController'
};
$stateProvider.state(bar);
```

#### Route to React components

Use `component:` in your state declaration.

```
var leaf = { 
  name: 'foo.bar.leaf',
  url: '/leaf',
  component: MyRaectComponentClass 
};
$stateProvider.state(leaf);
```

### Limitations:

We currently support routing React and AngularJS components into an AngularJS `ui-view`.
However, we do not support routing AngularJS components into a React `UIView`.

If you create a React `UIView`, then any nested `UIView` must also be React.

Because of this, apps should be migrated starting from leaf states/views and work up towards the root state/view.
