import * as angular from 'angular';
import * as React from 'react';
import { ReactNode, useContext, useRef, useState } from 'react';
import { UIViewData } from '@uirouter/angularjs/lib/directives/viewDirective';
import { UIRouterContext, UIViewContext, UIViewAddress } from '@uirouter/react';
import { UIRouter } from '@uirouter/core';

export interface IUIRouterContextComponentProps {
  parentContextLevel?: string;
  inherited?: boolean;
}

interface IContextFromAngularJS {
  router: UIRouter;
  addr: UIViewAddress;
}
const initialState: IContextFromAngularJS = { router: undefined, addr: undefined };

/**
 * Provide react context necessary for UIView, UISref and UISrefActive
 *
 * Gets the context from the parent react UIView (if component tree is all react)
 * Gets the context from the from parent angular ui-view if no parent reat UIView is available
 */
export function UIRouterContextComponent(props: {
  parentContextLevel: string;
  inherited: boolean;
  children: ReactNode;
}) {
  const { parentContextLevel, inherited, children } = props;
  const [contextFromAngularJS, setContextFromAngularJS] = useState(initialState);
  const routerFromReactContext = useContext(UIRouterContext);
  const parentUIViewFromReactContext = useContext(UIViewContext);
  const domRef = useRef(null);

  // Once we have a DOM node, get the AngularJS injector and walk up the DOM to find the AngularJS $uiView
  const refCallback = (el: HTMLElement) => {
    if (el && el !== domRef.current) {
      domRef.current = el;
      const injector = angular.element(el).injector();

      // get router from angularjs
      const router = injector?.get('$uiRouter');

      // get parent uiview from angularjs
      let steps = parseInt(parentContextLevel, 10);
      steps = isNaN(steps) ? 0 : steps;

      while (el && steps--) el = el.parentElement;
      const $uiView = el && angular.element(el).inheritedData('$uiView');
      const addr = $uiView && new ParentUIViewAddressAdapter($uiView);

      setContextFromAngularJS({ router, addr } as IContextFromAngularJS);
    }
  };

  // render a div once to get a ref into the dom
  // Use the dom ref to access the AngularJS state
  if (!domRef.current) {
    return <div ref={refCallback} />;
  }

  // We know the AngularJS state. Now render the {children}
  const childrenCount = React.Children.count(children);
  const isArray = Array.isArray(children);

  return (
    <UIRouterContext.Provider value={(inherited && routerFromReactContext) || contextFromAngularJS.router}>
      <UIViewContext.Provider value={(inherited && parentUIViewFromReactContext) || contextFromAngularJS.addr}>
        {childrenCount === 1 && !isArray ? React.Children.only(children) : <div>{children}</div>}
      </UIViewContext.Provider>
    </UIRouterContext.Provider>
  );
}

UIRouterContextComponent.defaultProps = {
  parentContextLevel: '0',
  inherited: true,
} as IUIRouterContextComponentProps;

/**
 * Get the fqn and context from the parent angularjs ui-view.
 * Uses the ui-view element's data
 */
class ParentUIViewAddressAdapter {
  constructor(private _ngdata: UIViewData) {
    if (!_ngdata) throw new Error('@uirouter/react-hybrid: Address Adapter created with no _ngdata parameter.');
  }

  public get fqn() {
    return this._ngdata.$uiView.fqn;
  }

  public get context() {
    if (!this._ngdata || !this._ngdata.$cfg || !this._ngdata.$cfg.viewDecl) {
      console.log(this._ngdata);
      throw new Error(
        '@uirouter/react-hybrid: Uh oh. Views are in an invalid state. Parent UIView has no $cfg or viewDecl'
      );
    }

    return this._ngdata.$cfg.viewDecl.$context || this._ngdata.$uiView.creationContext;
  }
}
