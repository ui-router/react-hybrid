import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hybridModule } from './angularJSModule';
import { UIView, UIViewProps } from '@uirouter/react';
import { UIRouterContextComponent } from './UIRouterReactContext';

// When an angularjs `ui-view` is instantiated, also create an adapter (which creates a react UIView)
hybridModule.directive('uiView', function () {
  return {
    restrict: 'AE',
    compile: function(tElem, tAttrs) {
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
    link: function(scope, elem, attrs) {
      const el = elem[0];
      let _ref = null;

      const ref = ref => {
        _ref = ref;
        provideContextToAngularJSChildren()
      };

      const render = (cmp, props: object) => {
        provideContextToAngularJSChildren();
        return React.createElement(cmp, props);
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

      let uiView = React.createElement(UIView, { ...attrs, render, ref, wrap: false } as UIViewProps);
      const reactEl = React.createElement(UIRouterContextComponent, { parentContextLevel: '3' }, uiView);
      ReactDOM.render(reactEl, el, null);

      scope.$on('$destroy', () => {
        ReactDOM.unmountComponentAtNode(el);
        el.remove();
      });
    }
  }
});