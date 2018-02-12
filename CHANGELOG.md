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

