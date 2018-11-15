import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { filter } from '@uirouter/core';
import { IPortalScope } from '../react/AngularUIView';
import { PortalView } from '../react/PortalView';
import { ReactUIView } from '../react/ReactUIView';
import { hybridModule } from './module';
import { debugLog } from '../debug';

// When an angularjs `ui-view` is instantiated, also create an react-ui-view-adapter (which creates a react UIView)
hybridModule.directive('uiView', function() {
  return {
    restrict: 'AE',
    compile: function(tElem, tAttrs) {
      let { name, uiView } = tAttrs;
      name = name || uiView || '$default';
      debugLog('angularjs', 'ui-view', '?', '.compile()', 'Creating react-ui-view-adapter', tElem);
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
    link: function(scope: IPortalScope, elem, attrs) {
      const debug = (method: string, message: string, ...args) =>
        debugLog('angularjs', 'react-ui-view-adapter', `${$id}/${attrs.name}`, method, message, ...args);

      const el = elem[0];
      let _ref = null;
      let destroyed = false;
      const $id = id++;
      const ignoredAttrKeys = ['$$element', '$attr'];
      attrs = filter(attrs, (val, key) => ignoredAttrKeys.indexOf(key) === -1) as any;

      debug('.link()', 'linking react-ui-view-adapter into ', el, attrs);

      // The UIView ref callback, which is called after the initial render
      const ref = (ref: HTMLElement) => {
        // If refs are the same - don't re-render React component.
        const isSameRef = ref && _ref === ref;

        // If previously there was a ref, and the new `ref` is empty - the component was unmounted.
        // Leave the unmounted component as it was, and don't try to re-mount it.
        const isComponentUnmounted = !ref && _ref;

        if (isSameRef || isComponentUnmounted) {
          return;
        }

        _ref = ref;

        debug('.ref()', 'Received new React UIView ref', ref);

        // Add the $uiView data to the adapter element to provide context to child angular elements
        provideContextToAngularJSChildren();
        renderReactUIView();
      };

      // The render callback for the React UIView
      const render = (cmp, props: object) => {
        debug('.render()', `has ref: ${!!_ref}`);

        provideContextToAngularJSChildren();
        // Only create the children when the _ref is ready
        return !_ref ? null : React.createElement(cmp, props);
      };

      const provideContextToAngularJSChildren = () => {
        const $cfg = _ref && _ref.uiViewData && _ref.uiViewData.config;
        const $uiView = _ref && _ref.uiViewAddress;

        debug('.provideContextToAngularJSChildren', '', el, $cfg, $uiView);

        if (!$cfg || !$uiView) {
          elem.removeData('$uiView');
        } else {
          elem.data('$uiView', { $cfg, $uiView });
        }
      };

      function renderReactUIView() {
        if (destroyed) {
          debug('.renderReactUIView()', `already destroyed -- will not render React UIView`);
          return;
        }

        const childUIViewProps = { ...attrs, render, wrap: false, refFn: ref };
        const portalView: PortalView = scope.$uiRouterReactHybridPortalView;

        if (portalView) {
          debug('.renderReactUIView()', `will createPortalToChildUIView({ name: '${childUIViewProps['name']}' })`, el);
          portalView.createPortalToChildUIView($id, { childUIViewProps, portalTarget: el });
        } else {
          debug('.renderReactUIView()', `ReactDOM.render(<ReactUIView name="${childUIViewProps['name']}"/>)`, el);
          ReactDOM.render<any>(<ReactUIView {...childUIViewProps} />, el as any);
        }
      }

      scope.$on('$destroy', () => {
        destroyed = true;
        const portalView: PortalView = scope.$uiRouterReactHybridPortalView;
        if (portalView) {
          portalView.removePortalToChildUIView($id);
        } else {
          const unmounted = ReactDOM.unmountComponentAtNode(el);
          debug('.$on("$destroy")', `unmountComponentAtNode(): ${unmounted}`, el);
        }
        // Remove using jQLite element for cross-browser compatibility.
        elem.remove();
      });

      renderReactUIView();
    },
  };
});
