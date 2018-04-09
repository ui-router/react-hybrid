import * as React from 'react';
import * as angular from 'angular';
import * as ReactDOM from 'react-dom';
import { hybridModule } from './module';
import { UIView, UIViewProps } from '@uirouter/react';
import { filter } from '@uirouter/core';
import { UIRouterContextComponent } from '../react/UIRouterReactContext';

// When an angularjs `ui-view` is instantiated, also create an adapter (which creates a react UIView)
hybridModule.directive('uiView', function() {
  return {
    restrict: 'AE',
    compile: function(tElem, tAttrs) {
      let { name, uiView } = tAttrs;
      name = name || uiView || '$default';
      // console.log('Creating react-ui-view-adapter', tElem);
      tElem.html(`<react-ui-view-adapter name="${name}"></react-ui-view-adapter>`);
    },
  };
});

var id = 0;

// This angularjs adapter (inside an angularjs ui-view) creates the react UIView and provides it the correct context
// It also allows angularjs children created inside the react view (via angular2react or whatever) to access the correct
// context from the react UIView
hybridModule.directive('reactUiViewAdapter', function() {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      const el = elem[0];
      let _ref = null;
      let destroyed = false;
      const $id = id++;
      const ignoredAttrKeys = ['$$element', '$attr'];
      attrs = filter(attrs, (val, key) => ignoredAttrKeys.indexOf(key) === -1) as any;

      // console.log(`${$id}: linking react-ui-view-adapter into `, el, attrs)

      const log = (msg, UIViewRef) => {
        const id = UIViewRef && UIViewRef.state && UIViewRef.state.id;
        const cmp = UIViewRef && UIViewRef.componentInstance;
        console.log(msg, `Has UIViewRef: ${!!UIViewRef}`, id, cmp);
      };

      // The UIView ref callback, which is called after the initial render
      const ref = ref => {
        if (ref && _ref === ref) return;
        _ref = ref;

        // log(`${$id}: received new React UIView ref:`, ref);

        // Add the $uiView data to the adapter element to provide context to child angular elements
        provideContextToAngularJSChildren();
        renderReactUIView();
      };

      // The render callback for the React UIView
      const render = (cmp, props: object) => {
        // log('render', _ref);
        provideContextToAngularJSChildren();
        // Only create the children when the _ref is ready
        return !_ref ? null : React.createElement(cmp, props);
      };

      const provideContextToAngularJSChildren = () => {
        const $cfg = _ref && _ref.uiViewData && _ref.uiViewData.config;
        const $uiView = _ref && _ref.uiViewAddress;
        if (!$cfg || !$uiView) {
          elem.removeData('$uiView');
        } else {
          elem.data('$uiView', { $cfg, $uiView });
        }
      };

      function renderReactUIView() {
        // console.log(`${$id}: rendering react uiview into container`, el);
        if (destroyed) {
          // console.error(`${$id}: react-ui-view-adapter has already been destroyed -- not rendering React UIView`);
          return;
        }

        const props = { ...attrs, render, wrap: false, refFn: ref };
        // console.log(`${$id}: rendering ReactUIView with props`, props);
        ReactDOM.render<any>(<ReactUIView {...props} />, el as any);
      }

      scope.$on('$destroy', () => {
        destroyed = true;
        const unmounted = ReactDOM.unmountComponentAtNode(el);
        // console.log(`${$id}: angular $destroy event -- unmountComponentAtNode(): ${unmounted}`, el);
        el.remove();
      });

      renderReactUIView();
    },
  };
});

const ReactUIView = ({ refFn, ...props }) => (
  <UIRouterContextComponent parentContextLevel="3">
    <UIView {...props} ref={refFn} />
  </UIRouterContextComponent>
);
