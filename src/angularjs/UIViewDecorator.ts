import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hybridModule } from './module';
import { UIView, UIViewProps } from '@uirouter/react';
import { UIRouterContextComponent } from '../react/UIRouterReactContext';

// When an angularjs `ui-view` is instantiated, also create an adapter (which creates a react UIView)
hybridModule.directive('uiView', function () {
  return {
    restrict: 'AE',
    compile: function (tElem, tAttrs) {
      let { name, uiView } = tAttrs;
      name = name || uiView || '$default';
      tElem.html(`<react-ui-view-adapter name="${name}">default content</react-ui-view-adapter>`);
    }
  }
});

// This angularjs adapter (inside an angularjs ui-view) creates the react UIView and provides it the correct context
// It also allows angularjs children created inside the react view (via angular2react or whatever) to access the correct
// context from the react UIView
hybridModule.directive('reactUiViewAdapter', function () {
  return {
    restrict: 'E',
    link: function (scope, elem, attrs) {
      const el = elem[0];
      let _ref = null;

      const log = (msg, ref) => {
        const id = ref && ref.state && ref.state.id;
        const cmp = ref && ref.componentInstance;
        console.log(msg, !!ref, id, cmp);
      };

      // The UIView ref callback, which is called after the initial render
      const ref = ref => {
        _ref = ref;
        // log('ref', _ref);
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
        const uiView = React.createElement(UIView, { ...attrs, render, ref, wrap: false } as UIViewProps);
        const reactEl: React.ReactElement<any> = React.createElement(UIRouterContextComponent, { parentContextLevel: '3' }, uiView);
        ReactDOM.render<any>(reactEl, el as any);
      }

      scope.$on('$destroy', () => {
        ReactDOM.unmountComponentAtNode(el);
        el.remove();
      });

      renderReactUIView();
    }
  };
});
