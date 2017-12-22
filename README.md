# UI-Router react-hybrid

[![Greenkeeper badge](https://badges.greenkeeper.io/ui-router/react-hybrid.svg)](https://greenkeeper.io/)

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

When routing to a React component, that component can use the standard
[React directives (UIView, UISref, UISrefActive) from `@uirouter/react`](https://ui-router.github.io/react/docs/latest/modules/components.html).

When routing to an AngularJS component or template, that component uses the standard
[AngularJS directives (ui-view, ui-sref, ui-sref-active) from `@uirouter/angularjs`](https://ui-router.github.io/ng1/docs/latest/modules/directives.html).

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
  "@uirouter/react-hybrid": "^0.0.8",
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
  component: MyReactComponentClass
};
$stateProvider.state(leaf);
```


## How it works

### React and AngularJS ui-views

An AngularJS `<ui-view>` can have default content.
This default content is rendered when no state is filling the `ui-view` with a component.
For example, a parent state may render a `ui-view` portal, but want `Default Content` to display
when no child state is active: `<ui-view>Default Content</ui-view>`.

The `@uirouter/react-hybrid` project **sets the default content to an adapter component**, `<react-ui-view-adapter>`.
The `react-ui-view-adapter` then renders a React `<UIView/>`.

When a state loads an AngularJS view into the AngularJS `<ui-view>`, it replaces the `react-ui-view-adapter` default content.

When a state loads a React Component into the React `<UIView/>` component, it is nested inside the AngularJS components like so:

```html
<ui-view> // angularjs
  <react-ui-view-adapter> // angularjs
    <UIView> // react
      <RoutedReactComponent/> //react
    </UIView>
  </react-ui-view-adapter>
</ui-view>
```

### Providing "context" to children

In AngularJS, each `<ui-view>` provides the state context to its children elements, such as `ui-sref` or `ui-view`.
The state context allows a `ui-sref` to use relative links, for example.
AngularJS provides this context by setting hidden data on its DOM element, using `angular.element(el).data('$uiView')`.
Any nested `ui-view` or `ui-sref` fetches the context by asking for `angular.element(childel).inheritedData('$uiView')`.

In React, each `UIView` provides the state context to its children elements using [React context](https://facebook.github.io/react/docs/context.html).
The nested `UIView` or `UISref` fetches the state context using the React context API.

There is some glue provided by `@uirouter/react-hybrid` which bridges these two context mechanisms.
When a React `UIView` component is rendered, it is wrapped in a `UIRouterReactContext` component.
The component finds the state context by looking first via React props, and second via AngularJS DOM data.
It then provides the state context to its children using React props.

The `<react-ui-view-adapter>` wraps a React `UIView` component.
When the react `UIView` is filled by a state's react component, the `react-ui-view-adapter` gets the state context for the newly filled `UIView`.
It then provides that context to AngularJS components using AngularJS DOM data.

