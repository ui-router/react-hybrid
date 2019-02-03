## 0.3.10 (2019-02-03)
[Compare `@uirouter/react-hybrid` versions 0.3.9 and 0.3.10](https://github.com/ui-router/react-hybrid/compare/0.3.9...0.3.10)


### Updated `@uirouter/core` from 5.0.21 to 5.0.23
[Compare `@uirouter/core` versions 5.0.21 and 5.0.23](https://github.com/ui-router/core/compare/5.0.21...5.0.23)

### Bug Fixes

* **lazyLoad:** StateBuilder should not mutate the state declaration ([1478a3c](https://github.com/ui-router/core/commit/1478a3c)), closes [/github.com/ui-router/core/commit/3cd5a2a#r31260154](https://github.com//github.com/ui-router/core/commit/3cd5a2a/issues/r31260154)
* **state:** Update URL in response to ignored transition due to redirect ([c64c252](https://github.com/ui-router/core/commit/c64c252))
* **test_downstream_projects:** don't double build core while testing downstreams ([148b16b](https://github.com/ui-router/core/commit/148b16b))
* **typescript:** Fix typing of onChange callback in UrlService ([961ed0f](https://github.com/ui-router/core/commit/961ed0f)), closes [#229](https://github.com/ui-router/core/issues/229)
* **typescript:** Mark `params` as optional in StateService.href ([614bfb4](https://github.com/ui-router/core/commit/614bfb4)), closes [#287](https://github.com/ui-router/core/issues/287)
* **vanilla:** Fix baseHref parsing with chrome-extension:// urls ([f11be4d](https://github.com/ui-router/core/commit/f11be4d)), closes [#304](https://github.com/ui-router/core/issues/304)


### Features

* **TransitionHook:** Pass in transition to HookMatchCriteria ([#255](https://github.com/ui-router/core/issues/255)) ([926705e](https://github.com/ui-router/core/commit/926705e))


### Updated `@uirouter/react` from 0.8.7 to 0.8.9
[Compare `@uirouter/react` versions 0.8.7 and 0.8.9](https://github.com/ui-router/react/compare/0.8.7...0.8.9)


### Updated `@uirouter/angularjs` from 1.0.20 to 1.0.22
[Compare `@uirouter/angularjs` versions 1.0.20 and 1.0.22](https://github.com/angular-ui/ui-router/compare/1.0.20...1.0.22)

## 0.3.9 (2018-11-15)
[Compare `@uirouter/react-hybrid` versions 0.3.8 and 0.3.9](https://github.com/ui-router/react-hybrid/compare/0.3.8...0.3.9)

### Bug Fixes

* **UIVieMonkeyPatch:** Remove erroneously added <div class="UIView"> ([c189c99](https://github.com/ui-router/react-hybrid/commit/c189c99))

## 0.3.8 (2018-11-15)
[Compare `@uirouter/react-hybrid` versions 0.3.7 and 0.3.8](https://github.com/ui-router/react-hybrid/compare/0.3.7...0.3.8)

### Bug Fixes

* **Portal:** Support creating portals for multiple nested UIViews ([ab4edcb](https://github.com/ui-router/react-hybrid/commit/ab4edcb))


### Features

* Add debugLog mechanism ([94fe097](https://github.com/ui-router/react-hybrid/commit/94fe097))
* Tweak debugLog output into columns ([ac0dda2](https://github.com/ui-router/react-hybrid/commit/ac0dda2))

## 0.3.7 (2018-11-08)
[Compare `@uirouter/react-hybrid` versions 0.3.6 and 0.3.7](https://github.com/ui-router/react-hybrid/compare/0.3.6...0.3.7)

### Bug Fixes

* **ReactUIViewAdapter:** Turn off debug statement (whops) ([cb8b64d](https://github.com/ui-router/react-hybrid/commit/cb8b64d))

## 0.3.6 (2018-11-08)
[Compare `@uirouter/react-hybrid` versions 0.3.5 and 0.3.6](https://github.com/ui-router/react-hybrid/compare/0.3.5...0.3.6)

### Features

* **UIView:** Use React Portals: Allows React Context to propagate through UIViews. All UIViews now render using the same React instance.  ([5f76b16ff670a3e325909440cf33b3e56829880d](https://github.com/ui-router/react-hybrid/commit/5f76b16ff670a3e325909440cf33b3e56829880d)) [#138](https://github.com/ui-router/react-hybrid/pull/138)

## 0.3.5 (2018-10-24)
[Compare `@uirouter/react-hybrid` versions 0.3.4 and 0.3.5](https://github.com/ui-router/react-hybrid/compare/0.3.4...0.3.5)

### Bug Fixes

Big thanks to [@jutaz](https://github.com/jutaz)!

* Do not re-render a component that has been unmounted ([2c41f98d0589541067fd8b38f0d4e0c603d15984](https://github.com/ui-router/react-hybrid/commit/2c41f98d0589541067fd8b38f0d4e0c603d15984)) [#134](https://github.com/ui-router/react-hybrid/pull/134)
* Use JQLite to remove an element for IE11 compat ([2f1c6bc9731a2287569a865107563cead9f6bf27](https://github.com/ui-router/react-hybrid/commit/2f1c6bc9731a2287569a865107563cead9f6bf27)) [#92](https://github.com/ui-router/react-hybrid/pull/92)
* Use JQLite to remove an element for IE11 compat ([2f1c6bc9731a2287569a865107563cead9f6bf27](https://github.com/ui-router/react-hybrid/commit/2f1c6bc9731a2287569a865107563cead9f6bf27)) [#92](https://github.com/ui-router/react-hybrid/pull/92)

## 0.3.4 (2018-08-12)
[Compare `@uirouter/react-hybrid` versions 0.3.3 and 0.3.4](https://github.com/ui-router/react-hybrid/compare/0.3.3...0.3.4)


### Updated `@uirouter/core` from 5.0.20 to 5.0.21
[Compare `@uirouter/core` versions 5.0.20 and 5.0.21](https://github.com/ui-router/core/compare/5.0.20...5.0.21)

### Bug Fixes

* **dynamic:** Use 'find' from common.ts instead of Array.prototype.find ([66a3244](https://github.com/ui-router/core/commit/66a3244)), closes [#215](https://github.com/ui-router/core/issues/215)
* **url:** When using html5Mode and no <base> tag is present, default to '/' ([23742e3](https://github.com/ui-router/core/commit/23742e3)), closes [#223](https://github.com/ui-router/core/issues/223)


### Updated `@uirouter/react` from 0.8.5 to 0.8.7
[Compare `@uirouter/react` versions 0.8.5 and 0.8.7](https://github.com/ui-router/react/compare/0.8.5...0.8.7)


### Updated `@uirouter/angularjs` from 1.0.19 to 1.0.20
[Compare `@uirouter/angularjs` versions 1.0.19 and 1.0.20](https://github.com/angular-ui/ui-router/compare/1.0.19...1.0.20)

## 0.3.3 (2018-08-09)
[Compare `@uirouter/react-hybrid` versions 0.3.2 and 0.3.3](https://github.com/ui-router/react-hybrid/compare/0.3.2...0.3.3)


### Updated `@uirouter/react` from 0.8.4 to 0.8.5
[Compare `@uirouter/react` versions 0.8.4 and 0.8.5](https://github.com/ui-router/react/compare/0.8.4...0.8.5)

### Features

* **UISref:** Call child element's onClick prop first, if it exists ([095a90d](https://github.com/ui-router/react/commit/095a90d)), closes [#240](https://github.com/ui-router/react/issues/240)

## 0.3.2 (2018-08-07)
[Compare `@uirouter/react-hybrid` versions 0.3.1 and 0.3.2](https://github.com/ui-router/react-hybrid/compare/0.3.1...0.3.2)


### Updated `@uirouter/react` from 0.8.3 to 0.8.4
[Compare `@uirouter/react` versions 0.8.3 and 0.8.4](https://github.com/ui-router/react/compare/0.8.3...0.8.4)

### Bug Fixes

* **uiview:** Fix uiCanExit when routing to a React.forwardRef() ([cf5c668](https://github.com/ui-router/react/commit/cf5c668))


### Features

* **UISrefActive:** pass down className ([fbb8152](https://github.com/ui-router/react/commit/fbb8152))
* **UISrefActive:** support for nested UISrefActive ([49e32e6](https://github.com/ui-router/react/commit/49e32e6))

## 0.3.1 (2018-07-20)
[Compare `@uirouter/react-hybrid` versions 0.3.0 and 0.3.1](https://github.com/ui-router/react-hybrid/compare/0.3.0...0.3.1)


### Updated `@uirouter/core` from 5.0.19 to 5.0.20
[Compare `@uirouter/core` versions 5.0.19 and 5.0.20](https://github.com/ui-router/core/compare/5.0.19...5.0.20)

### Bug Fixes

* **params:** When creating an array parameter from a custom type, copy the `raw` property ([b6dd738](https://github.com/ui-router/core/commit/b6dd738)), closes [#178](https://github.com/ui-router/core/issues/178)


### Features

* **dynamic:** Support dynamic flag on a state declaration ([3cd5a2a](https://github.com/ui-router/core/commit/3cd5a2a))
* **transition:** Added transition.paramsChanged() to get added/deleted/changed parameter values for a transition ([10b7fde](https://github.com/ui-router/core/commit/10b7fde))
* **view:** Add _pluginapi._registeredUIView() to get a ui-view by id ([6533b51](https://github.com/ui-router/core/commit/6533b51))


### Updated `@uirouter/react` from 0.8.2 to 0.8.3
[Compare `@uirouter/react` versions 0.8.2 and 0.8.3](https://github.com/ui-router/react/compare/0.8.2...0.8.3)


### Updated `@uirouter/angularjs` from 1.0.18 to 1.0.19
[Compare `@uirouter/angularjs` versions 1.0.18 and 1.0.19](https://github.com/angular-ui/ui-router/compare/1.0.18...1.0.19)

### Bug Fixes

* **npm:** Publish to the old angular-ui-router npm package too ([8fc3bb2](https://github.com/angular-ui/ui-router/commit/8fc3bb2))
* **resolve:** Detect and honor strictDi in angularjs versions 1.3 and 1.4 ([1368c18](https://github.com/angular-ui/ui-router/commit/1368c18)), closes [#3678](https://github.com/angular-ui/ui-router/issues/3678)
* **state:** When creating absolute hrefs in hashbang mode, include the location.pathname ([cd426e5](https://github.com/angular-ui/ui-router/commit/cd426e5)), closes [#3710](https://github.com/angular-ui/ui-router/issues/3710)
* **uiview:** Allow uiOnParamsChanged to work with states that have a componentProvider ([fe91bd3](https://github.com/angular-ui/ui-router/commit/fe91bd3)), closes [#3707](https://github.com/angular-ui/ui-router/issues/3707)

# 0.3.0 (2018-05-28)
[Compare `@uirouter/react-hybrid` versions 0.2.0 and 0.3.0](https://github.com/ui-router/react-hybrid/compare/0.2.0...0.3.0)

### Bug Fixes

* **decorateUIRouterViewConfigs:** fix issue with key =  but selfView def is '' ([3579894](https://github.com/ui-router/react-hybrid/commit/3579894)), closes [#10](https://github.com/ui-router/react-hybrid/issues/10)


### Features

* Support UI-Router 0.8.2 and switch to React 16.3 context API ([09af7b6](https://github.com/ui-router/react-hybrid/commit/09af7b6))


### BREAKING CHANGES

* This version of react-hybrid requires `@uirouter/react` version 0.8.2 or higher and requires React 16.3.x or higher.


### Updated `@uirouter/core` from 5.0.18 to 5.0.19
[Compare `@uirouter/core` versions 5.0.18 and 5.0.19](https://github.com/ui-router/core/compare/5.0.18...5.0.19)

### Bug Fixes

* **enums:** Workaround angular compiler export issue https://github.com/angular/angular/issues/23759 ([38d25fa](https://github.com/ui-router/core/commit/38d25fa))


### Updated `@uirouter/react` from 0.7.0 to 0.8.2
[Compare `@uirouter/react` versions 0.7.0 and 0.8.2](https://github.com/ui-router/react/compare/0.7.0...0.8.2)

### Bug Fixes

* **enzyme:** fix enzyme patch leaving a file called '-' ([4c2157c](https://github.com/ui-router/react/commit/4c2157c))
* **UISref/UISrefActive:** make proptypes non-required: parentUIView, addStateInfoToParentActive ([c7aa299](https://github.com/ui-router/react/commit/c7aa299)), closes [#173](https://github.com/ui-router/react/issues/173)


### Features

* **internal:** Change UIView from arrow to Component Class ([ce2bc1e](https://github.com/ui-router/react/commit/ce2bc1e))
* **internal:** exposed the internal View component for use by [@uirouter](https://github.com/uirouter)/react-hybrid ([9c07226](https://github.com/ui-router/react/commit/9c07226))
* **UIView:** force component re-mount on reload() ([d01162a](https://github.com/ui-router/react/commit/d01162a)), closes [#172](https://github.com/ui-router/react/issues/172)


### BREAKING CHANGES

* **UIView:** when a state is entered/exited the State Component is remounted, re-running its lifecycle methods.


### Updated `@uirouter/angularjs` from 1.0.16 to 1.0.18
[Compare `@uirouter/angularjs` versions 1.0.16 and 1.0.18](https://github.com/angular-ui/ui-router/compare/1.0.16...1.0.18)

### Bug Fixes

* **bundles:** Do not run prettier against release/* bundles when publishing to bower ([9b420fa](https://github.com/angular-ui/ui-router/commit/9b420fa))

# 0.2.0 (2018-05-05)
[Compare `@uirouter/react-hybrid` versions 0.1.0 and 0.2.0](https://github.com/ui-router/react-hybrid/compare/0.1.0...0.2.0)


### Updated `@uirouter/core` from 5.0.17 to 5.0.18
[Compare `@uirouter/core` versions 5.0.17 and 5.0.18](https://github.com/ui-router/core/compare/5.0.17...5.0.18)

### Bug Fixes

* **angular:** A hack to force the Angular compiler to import from module index ([d56a2be](https://github.com/ui-router/core/commit/d56a2be))
* **StateRegistry:** Notify listeners of added states when there are orphans in the state queue ([5a9bac9](https://github.com/ui-router/core/commit/5a9bac9))
* **transition:** Fix typing of Transition.params() ([ebea30e](https://github.com/ui-router/core/commit/ebea30e))
* **transition:** Normalize `error()` to always return `Rejection` ([9bcc5db](https://github.com/ui-router/core/commit/9bcc5db))


### Updated `@uirouter/react` from 0.6.2 to 0.7.0
[Compare `@uirouter/react` versions 0.6.2 and 0.7.0](https://github.com/ui-router/react/compare/0.6.2...0.7.0)

### Bug Fixes

* **package:** update prop-types to version 15.6.1 ([1d0ee26](https://github.com/ui-router/react/commit/1d0ee26))


### Features

* use new React 16.3 context API ([580700f](https://github.com/ui-router/react/commit/580700f)), closes [#54](https://github.com/ui-router/react/issues/54)
* **react:** update minimum react version supported ([4acb7a7](https://github.com/ui-router/react/commit/4acb7a7))


### BREAKING CHANGES

* **react:** from version `0.7.0` `@uirouter/react` only supports react from version `16.3.x` because of the new Context API.
If you need to use it with previous versions of React you should check the `0.6.x`, but bear in mind that it’s no longer supported and it’s advised to update React instead.
* `@uirouter/react` now uses the new React 16.3 Context API. If you were accessing the router instance via the legacy context api (which was never explecitly supported) you need to update your code accordingly:

before:
```jsx
class SomeComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    // access context via this.context
    const router = this.context.router;
    // do whatever needed with the router
  }
}
```

after:
```jsx
class SomeComponent extends React.Component {
  render () {
    // access router via props
    const router = this.props.router;
    // do whatever needed with the router
  }
}

// when rendering the component wrap it with the `<UIRouterConsumer>` component
<UIRouterConsumer>
  {router => <SomeComponent router={router} />}
</UIRouterConsumer>
```


### Updated `@uirouter/angularjs` from 1.0.15 to 1.0.16
[Compare `@uirouter/angularjs` versions 1.0.15 and 1.0.16](https://github.com/angular-ui/ui-router/compare/1.0.15...1.0.16)

### Bug Fixes

* **docs:** downgrade to [@types](https://github.com/types)/angular[@1](https://github.com/1).6.25 to fix typings error when generating docs ([5850136](https://github.com/angular-ui/ui-router/commit/5850136))

## 0.1.1 (2018-05-05)
[Compare `@uirouter/react-hybrid` versions 0.1.0 and 0.1.1](https://github.com/ui-router/react-hybrid/compare/0.1.0...0.1.1)


### Updated `@uirouter/core` from 5.0.17 to 5.0.18
[Compare `@uirouter/core` versions 5.0.17 and 5.0.18](https://github.com/ui-router/core/compare/5.0.17...5.0.18)

### Bug Fixes

* **angular:** A hack to force the Angular compiler to import from module index ([d56a2be](https://github.com/ui-router/core/commit/d56a2be))
* **StateRegistry:** Notify listeners of added states when there are orphans in the state queue ([5a9bac9](https://github.com/ui-router/core/commit/5a9bac9))
* **transition:** Fix typing of Transition.params() ([ebea30e](https://github.com/ui-router/core/commit/ebea30e))
* **transition:** Normalize `error()` to always return `Rejection` ([9bcc5db](https://github.com/ui-router/core/commit/9bcc5db))


### Updated `@uirouter/react` from 0.6.2 to 0.7.0
[Compare `@uirouter/react` versions 0.6.2 and 0.7.0](https://github.com/ui-router/react/compare/0.6.2...0.7.0)

### Bug Fixes

* **package:** update prop-types to version 15.6.1 ([1d0ee26](https://github.com/ui-router/react/commit/1d0ee26))


### Features

* use new React 16.3 context API ([580700f](https://github.com/ui-router/react/commit/580700f)), closes [#54](https://github.com/ui-router/react/issues/54)
* **react:** update minimum react version supported ([4acb7a7](https://github.com/ui-router/react/commit/4acb7a7))


### BREAKING CHANGES

* **react:** from version `0.7.0` `@uirouter/react` only supports react from version `16.3.x` because of the new Context API.
If you need to use it with previous versions of React you should check the `0.6.x`, but bear in mind that it’s no longer supported and it’s advised to update React instead.
* `@uirouter/react` now uses the new React 16.3 Context API. If you were accessing the router instance via the legacy context api (which was never explecitly supported) you need to update your code accordingly:

before:
```jsx
class SomeComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    // access context via this.context
    const router = this.context.router;
    // do whatever needed with the router
  }
}
```

after:
```jsx
class SomeComponent extends React.Component {
  render () {
    // access router via props
    const router = this.props.router;
    // do whatever needed with the router
  }
}

// when rendering the component wrap it with the `<UIRouterConsumer>` component
<UIRouterConsumer>
  {router => <SomeComponent router={router} />}
</UIRouterConsumer>
```


### Updated `@uirouter/angularjs` from 1.0.15 to 1.0.16
[Compare `@uirouter/angularjs` versions 1.0.15 and 1.0.16](https://github.com/angular-ui/ui-router/compare/1.0.15...1.0.16)

### Bug Fixes

* **docs:** downgrade to [@types](https://github.com/types)/angular[@1](https://github.com/1).6.25 to fix typings error when generating docs ([5850136](https://github.com/angular-ui/ui-router/commit/5850136))

# 0.1.0 (2018-03-10)
[Compare `@uirouter/react-hybrid` versions 0.0.16 and 0.1.0](https://github.com/ui-router/react-hybrid/compare/0.0.16...0.1.0)

### Bug Fixes

* **react-hybrid:** Fix errors surfaced by react 16 ([f61e241](https://github.com/ui-router/react-hybrid/commit/f61e241))

## 0.0.16 (2018-02-12)
[Compare `@uirouter/react-hybrid` versions 0.0.15 and 0.0.16](https://github.com/ui-router/react-hybrid/compare/0.0.15...0.0.16)


### Updated `@uirouter/core` from 5.0.16 to 5.0.17
[Compare `@uirouter/core` versions 5.0.16 and 5.0.17](https://github.com/ui-router/core/compare/5.0.16...5.0.17)

### Bug Fixes

* **core:** Fix leak of old transitions by mutating pathnode*.resolvables*.data ([0a1f518](https://github.com/ui-router/core/commit/0a1f518))


### Updated `@uirouter/react` from 0.6.1 to 0.6.2
[Compare `@uirouter/react` versions 0.6.1 and 0.6.2](https://github.com/ui-router/react/compare/0.6.1...0.6.2)

### Bug Fixes

* **package:** update [@uirouter](https://github.com/uirouter)/core to version 5.0.17 ([b0109ee](https://github.com/ui-router/react/commit/b0109ee))
* **UIView:** Do not reload view if the new viewConfig is identical to the old one ([07a03bf](https://github.com/ui-router/react/commit/07a03bf))
* **UIView:** Pass style prop through even if no className is specified ([cc3d80d](https://github.com/ui-router/react/commit/cc3d80d))
* **UIView:** Provide only resolve props that should be accessible to each view ([a4ee9e9](https://github.com/ui-router/react/commit/a4ee9e9))


### Updated `@uirouter/angularjs` from 1.0.14 to 1.0.15
[Compare `@uirouter/angularjs` versions 1.0.14 and 1.0.15](https://github.com/angular-ui/ui-router/compare/1.0.14...1.0.15)

### Bug Fixes

* **package:** update [@uirouter](https://github.com/uirouter)/core to version 5.0.17 ([1b54264](https://github.com/angular-ui/ui-router/commit/1b54264))

## 0.0.15 (2018-01-31)
[Compare `@uirouter/react-hybrid` versions 0.0.14 and 0.0.15](https://github.com/ui-router/react-hybrid/compare/0.0.14...0.0.15)


### Updated `@uirouter/core` from 5.0.11 to 5.0.16
[Compare `@uirouter/core` versions 5.0.11 and 5.0.16](https://github.com/ui-router/core/compare/5.0.11...5.0.16)

### Bug Fixes

* **browserLocation:** Use location.pathname (not href) or '/' when no base tag found ([db461d6](https://github.com/ui-router/core/commit/db461d6))
* **browserLocationConfig:** If no base href found, use location.href (not empty string) ([0251424](https://github.com/ui-router/core/commit/0251424))
* **common:** Fix signature of  for objects (make target optional) ([61d0afc](https://github.com/ui-router/core/commit/61d0afc))
* **core:** Fix memory leak of resolve data from ALL transitions ever ([7f2aed1](https://github.com/ui-router/core/commit/7f2aed1))
* **pathNode:** add backwards compat for PathNode.clone(). Add retainedWithToParams to treeChanges interface. ([4833a32](https://github.com/ui-router/core/commit/4833a32))
* **pushStateLocation:** Fix URLs: add slash between base and path when necessary ([bfa5755](https://github.com/ui-router/core/commit/bfa5755))
* **pushStateLocation:** When url is "" or "/", use baseHref for pushState ([042a950](https://github.com/ui-router/core/commit/042a950))
* **resolve:** Add onFinish hook to resolve any dynamicly added resolvables ([7d1ca54](https://github.com/ui-router/core/commit/7d1ca54))
* **trace:** Fix null reference in uiview name sort function ([59cb067](https://github.com/ui-router/core/commit/59cb067))
* **treeChanges:** apply toParams to 'retained' path ([#72](https://github.com/ui-router/core/issues/72)) ([cf63d11](https://github.com/ui-router/core/commit/cf63d11))
* **urlRouter:** Update query params when resetting url via .update() ([7664cd0](https://github.com/ui-router/core/commit/7664cd0))


### Features

* **common:** Add map-in-place support to map() ([12bc7d8](https://github.com/ui-router/core/commit/12bc7d8))
* **common:** Add onEvict() callback registry for queues with max length ([c19d007](https://github.com/ui-router/core/commit/c19d007))
* **view:** Add onSync callback API to plugin API ([9544ae5](https://github.com/ui-router/core/commit/9544ae5))


### Updated `@uirouter/react` from 0.5.4 to 0.6.1
[Compare `@uirouter/react` versions 0.5.4 and 0.6.1](https://github.com/ui-router/react/compare/0.5.4...0.6.1)

### Bug Fixes

* **package:** update [@uirouter](https://github.com/uirouter)/core to version 5.0.14 ([ee5e672](https://github.com/ui-router/react/commit/ee5e672))
* **package:** update [@uirouter](https://github.com/uirouter)/core to version 5.0.15 ([ef2b171](https://github.com/ui-router/react/commit/ef2b171))
* **reactViews:** use new map function signature ([6b2aa53](https://github.com/ui-router/react/commit/6b2aa53))
* **UIView:** apply exit hook only on class components ([660e317](https://github.com/ui-router/react/commit/660e317)), closes [#71](https://github.com/ui-router/react/issues/71)


### Features

* move prop-types from peerDependencies to dependecies ([5c6b2dd](https://github.com/ui-router/react/commit/5c6b2dd)), closes [#70](https://github.com/ui-router/react/issues/70)
* **UIRouterReact:** throw if `start` is called more than once ([d48c9fb](https://github.com/ui-router/react/commit/d48c9fb)), closes [#65](https://github.com/ui-router/react/issues/65)
* **UIView:** `resolve`s are now injected as root props ([ff67239](https://github.com/ui-router/react/commit/ff67239))
* **UIView:** warn user when using `transition` as resolve token ([10b247b](https://github.com/ui-router/react/commit/10b247b))


### BREAKING CHANGES

* **UIView:** Previously `resolve`s were accessible as properties of a `resolves` props injected in the routed component. They are now each injected as a prop. This way components don't need to be aware of the router and can be more reusable.

before:
```jsx
render () {
  const { foo } = this.props.resolves;
  return <div>{foo}</div>;
}
```

after:
```jsx
render () {
  const { foo } = this.props;
  return <div>{foo}</div>
}
```


### Updated `@uirouter/angularjs` from 1.0.9 to 1.0.14
[Compare `@uirouter/angularjs` versions 1.0.9 and 1.0.14](https://github.com/angular-ui/ui-router/compare/1.0.9...1.0.14)

### Bug Fixes

* **artifactory:** Add trailing newline to package.json to work around artifactory issue  ([#3551](https://github.com/angular-ui/ui-router/issues/3551)) ([d09a345](https://github.com/angular-ui/ui-router/commit/d09a345)), closes [#3550](https://github.com/angular-ui/ui-router/issues/3550)
* **location:** allow empty string param: Ng1LocationServices.url('') ([01bbaf0](https://github.com/angular-ui/ui-router/commit/01bbaf0))
* **onEnter:** Do not inject child-state data into ng1 onEnter hooks ([cdec6a0](https://github.com/angular-ui/ui-router/commit/cdec6a0))
* **package:** update [@uirouter](https://github.com/uirouter)/core to version 5.0.13 ([6c63f2d](https://github.com/angular-ui/ui-router/commit/6c63f2d))
* **travis:** regenerate and encrypt secret ([c718ce5](https://github.com/angular-ui/ui-router/commit/c718ce5))
* **uiSrefActive:** don't match fuzzy on lazy loaded future states ([01430ee](https://github.com/angular-ui/ui-router/commit/01430ee))
* **uiView:** Fix cfg.getTemplate is undefined ([f4d99b0](https://github.com/angular-ui/ui-router/commit/f4d99b0))


### Features

* **uiSrefActive:** Support arrays of globs for ng-class style ([b215343](https://github.com/angular-ui/ui-router/commit/b215343))

## 0.0.14 (2017-10-17)
[Compare `@uirouter/react-hybrid` versions 0.0.13 and 0.0.14](https://github.com/ui-router/react-hybrid/compare/0.0.13...0.0.14)


### Updated `@uirouter/core` from 5.0.10 to 5.0.11
[Compare `@uirouter/core` versions 5.0.10 and 5.0.11](https://github.com/ui-router/core/compare/5.0.10...5.0.11)

### Bug Fixes

* **ie9:** make console.bind work in ie9 ([#85](https://github.com/ui-router/core/issues/85)) ([318214b](https://github.com/ui-router/core/commit/318214b))


### Updated `@uirouter/react` from 0.5.3 to 0.5.4
[Compare `@uirouter/react` versions 0.5.3 and 0.5.4](https://github.com/ui-router/react/compare/0.5.3...0.5.4)


### Updated `@uirouter/angularjs` from 1.0.8 to 1.0.9
[Compare `@uirouter/angularjs` versions 1.0.8 and 1.0.9](https://github.com/angular-ui/ui-router/compare/1.0.8...1.0.9)

## 0.0.13 (2017-10-07)
[Compare `@uirouter/react-hybrid` versions 0.0.12 and 0.0.13](https://github.com/ui-router/react-hybrid/compare/0.0.12...0.0.13)


<a name="0.0.12"></a>
## [0.0.12](https://github.com/ui-router/react-hybrid/compare/0.0.11...0.0.12) (2017-07-14)

Fix botched 0.0.11 release


<a name="0.0.11"></a>
## [0.0.11](https://github.com/ui-router/react-hybrid/compare/0.0.10...0.0.11) (2017-07-14)


### Features

* **className:** Pass `<UIView className="foo">` to `<ui-view class="foo">` ([4bfcfac](https://github.com/ui-router/react-hybrid/commit/4bfcfac))



<a name="0.0.10"></a>
## 0.0.10 (2017-07-14)

* feat(uiView): Render angular ui-view manually, not using angular2react dependencyj ([ada97c8](https://github.com/ui-router/react-hybrid/commit/ada97c8))
* chore(build): Add missing rollup config ([f686175](https://github.com/ui-router/react-hybrid/commit/f686175))



<a name="0.0.9"></a>
## 0.0.9 (2017-07-13)

* fix(build): Import uirouter/react and uirouter/angularjs libs from index.js for webpack, etc ([a936996](https://github.com/ui-router/react-hybrid/commit/a936996))



<a name="0.0.8"></a>
## 0.0.8 (2017-07-13)

* docs(README): Remove limitation from docs because the limitation is no more! ([3684428](https://github.com/ui-router/react-hybrid/commit/3684428))
* fix(uiView): Fix nested UIView lifecycle by waiting for `ref` before rendering a component ([cdac3b7](https://github.com/ui-router/react-hybrid/commit/cdac3b7))



<a name="0.0.7"></a>
## 0.0.7 (2017-07-12)

* fix(yarn): Publish uirouter/react and uirouter/angularjs to npm, not github tags ([c8569fe](https://github.com/ui-router/react-hybrid/commit/c8569fe))
* feat(uiView): Allow routing either angularjs or react components to all ui-views ([3dff2df](https://github.com/ui-router/react-hybrid/commit/3dff2df))



<a name="0.0.6"></a>
## 0.0.6 (2017-07-07)

* feat(view): Auto-detect react component ([21e9d98](https://github.com/ui-router/react-hybrid/commit/21e9d98))



<a name="0.0.5"></a>
## 0.0.5 (2017-06-29)

* fix(typescript): Apply updates for typescript 2.4. Update to new snapshots of @uirouter/angularjs+re ([c836579](https://github.com/ui-router/react-hybrid/commit/c836579))



<a name="0.0.4"></a>
## 0.0.4 (2017-06-28)

* fix(UIRouterContext): Fix UIRouterContext decorator ([4a83102](https://github.com/ui-router/react-hybrid/commit/4a83102))



<a name="0.0.3"></a>
## 0.0.3 (2017-06-26)

* feat(adapter): Enable AngularJS ui-sref and ui-sref-active for angular2react children of react UIVie ([ae11777](https://github.com/ui-router/react-hybrid/commit/ae11777))



<a name="0.0.2"></a>
## 0.0.2 (2017-06-23)

* feat(adapter): Implement ui-view adapters allowing states to route to React components ([d1dbad5](https://github.com/ui-router/react-hybrid/commit/d1dbad5))
* chore(build): Build lib and lib-esm ([744c49e](https://github.com/ui-router/react-hybrid/commit/744c49e))
* chore(readme): Update README ([83dc68a](https://github.com/ui-router/react-hybrid/commit/83dc68a))
* Initial commit ([5ae2db5](https://github.com/ui-router/react-hybrid/commit/5ae2db5))

