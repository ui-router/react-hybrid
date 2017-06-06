import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as angular from 'angular';
import { UIViewData } from '@uirouter/angularjs/lib/directives/viewDirective';
import { UIView, ReactViewConfig, ReactViewDeclaration } from '@uirouter/react';
import { StateObject, UIRouter, PathNode } from '@uirouter/core';

export const UI_ROUTER_REACT_HYBRID = 'ui.router.react.hybrid';
export default UI_ROUTER_REACT_HYBRID;
const hybridModule = angular.module(UI_ROUTER_REACT_HYBRID, ['ui.router']);

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

    Object.keys(views).forEach(key => {
      views[key].$type = selfViews[key].$type || views[key].$type;
    });

    return views;
  });
}]);

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
hybridModule.directive('reactUiViewAdapter', function () {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      const el = elem[0];
      const reactEl = React.createElement(UIRouterContextComponent, { parentContextLevel: '3' }, React.createElement(UIView, attrs));
      ReactDOM.render(reactEl, el, null);

      scope.$on('$destroy', () => {
        ReactDOM.unmountComponentAtNode(el);
        el.remove();
      });
    }
  }
});

// Get the fqn and context from the parent angularjs ui-view.
// Uses the ui-view element's data
class ParentUIViewAddressAdapter {
  constructor(private _ngdata: UIViewData) { }
  public get fqn() { return this._ngdata.$uiView.fqn; }
  public get context() { return this._ngdata.$cfg.viewDecl.$context || this._ngdata.$uiView.creationContext; }
}

export interface IUIRouterContextComponentProps {
  parentContextLevel?: string;
}

export interface IUIRouterContextComponentState {
  router: UIRouter;
  parentUIViewAddress: any;
}

// Provide react context necessary for UIView, UISref and UISrefActive
// Gets the context from the parent react UIView (if component tree is all react)
// Gets the context from the from parent angular ui-view if no parent reat UIView is available
export class UIRouterContextComponent extends React.Component<IUIRouterContextComponentProps, IUIRouterContextComponentState> {
  // context from parent react UIView
  public static contextTypes = {
    router: React.PropTypes.object,
    parentUIViewAddress: React.PropTypes.object,
  };

  // context to child
  public static childContextTypes = {
    router: React.PropTypes.object,
    parentUIViewAddress: React.PropTypes.object,
  };

  public static defaultProps: Partial<IUIRouterContextComponentProps> = {
    parentContextLevel: "0",
  };

  public state: IUIRouterContextComponentState = {
    router: null,
    parentUIViewAddress: null,
  };

  private ref: HTMLElement;

  private getRouter() {
    // from react
    if (this.context.router) {
      return this.context.router;
    }

    // from angular
    return this.ref && angular.element(this.ref).injector().get('$uiRouter');
  }

  private getParentView() {
    // from react
    if (this.context.parentUIViewAddress) {
      return this.context.parentUIViewAddress;
    }

    // from angular
    let ref = this.ref;
    let steps = parseInt(this.props.parentContextLevel);
    steps = isNaN(steps) ? 0 : steps;

    while (steps--) ref = ref.parentElement;
    const $uiView = ref && angular.element(ref).inheritedData('$uiView');
    return $uiView && $uiView && new ParentUIViewAddressAdapter($uiView);
  }

  public getChildContext() {
    return {
      router: this.state.router,
      parentUIViewAddress: this.state.parentUIViewAddress,
    };
  }

  public componentDidMount() {
    this.setState({
      router: this.getRouter(),
      parentUIViewAddress: this.getParentView(),
    });
  }

  private refCallback = (ref: HTMLElement) => {
    if (ref && ref !== this.ref) {
      this.ref = ref;
      this.setState({});
    }
  };

  public render() {
    const { router  } = this.state;
    const { children  } = this.props;

    const ready = !!router;
    const childrenCount = React.Children.count(children);
    const child = ready && (childrenCount === 1 ? React.Children.only(children) : <div>{children}</div>);
    return (this.ref ? child : <div ref={this.refCallback} />);
  }
}

/**
 * A decorator that provides the UIRouter state context allowing
 * React components to use the @uirouter/react components such as UISref
 *
 *
 * Example:
 *
 * class MyComponent extends React.Component<any, any> {
 *   render() {
 *     return (
 *       <UISrefActive class="active">
 *         <UISref to=".neststate" params={{ id: this.props.someid }}>
 *           <a>Go to item {this.props.someid}</a>
 *         </UISref>
 *       </UISrefActive>
 *     )
 *   }
 * }
 *
 * @param Component the react component to wrap
 */
export function UIRouterContext<T>(Component: React.ComponentClass<T>) {
  return class extends React.Component<any, any> {
    public render() {
      return (
        <UIRouterContextComponent>
          <Component {...this.props} />
        </UIRouterContextComponent>
      );
    }
  } as React.ComponentClass<T>;
}

