import * as React from 'react';
import { hybridModule } from './angularJSModule';
import { PathNode, StateObject, UIRouter } from '@uirouter/core';
import { ReactViewConfig, ReactViewDeclaration } from '@uirouter/react';

/**
 * Registers a `react` view config factory which is invoked when `view.$type === 'react'`.
 *
 * Decorates the `views: {}` registered on states.
 * Detects if a `component:` is a React Component and sets `view.$type = 'react'` if so
 */

hybridModule.config(['$uiRouterProvider', (router: UIRouter) => {
  const factory = (path: [PathNode], config: ReactViewDeclaration) =>
      new ReactViewConfig(path, config);

  // Add the react view config factory for react views
  router.viewService._pluginapi._viewConfigFactory('react', factory);

  // Decorate states at registration time with the view type
  router.stateRegistry.decorator('views', (state: StateObject, parentDecorator) => {
    const views = parentDecorator(state);

    const self = state.self;
    const selfViews = self.views || { $default: self };
    const isReactComponent = cmp => cmp instanceof React.Component ||
        cmp && cmp.prototype && cmp.prototype.isReactComponent ||
        cmp && cmp.prototype && typeof cmp.prototype.render === 'function';

    Object.keys(views).forEach(key => {
      const view = views[key];
      const selfView = selfViews[key];
      const reactType = isReactComponent(view.component) && 'react';
      view.$type = selfViews[key].$type || reactType || view.$type;
    });

    return views;
  });
}]);

