/**
 * Legacy entry point for React 16/17
 * Uses ReactDOM.render and ReactDOM.unmountComponentAtNode
 *
 * For React 18+, use the main entry point instead:
 * import '@uirouter/react-hybrid';
 */
import '@uirouter/angularjs';
import '@uirouter/react';

import './decorateUIRouterViewConfigs';
import './angularjs/ReactUIViewAdapterComponentLegacy';
import './react/UIViewMonkeyPatch';

export * from './angularjs/module';
export * from './react/UIRouterReactContext';
export * from './react/UIRouterReactContextDecorator';
