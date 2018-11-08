import { UIViewData } from '@uirouter/angularjs/lib/directives/viewDirective';
import { UIRouterConsumer, UIRouterProvider, UIRouterReact, UIViewConsumer, UIViewProvider } from '@uirouter/react';
import * as angular from 'angular';
import * as React from 'react';
import { ReactElement } from 'react';
import IInjectorService = angular.auto.IInjectorService;

export interface IUIRouterContextComponentProps {
  parentContextLevel?: string;
  inherited?: boolean;
}

export interface IUIRouterContextComponentState {
  ready: boolean;
  router?: UIRouterReact;
  parentUIViewAddress?: any;
}

/**
 * Provide react context necessary for UIView, UISref and UISrefActive
 *
 * Gets the context from the parent react UIView (if component tree is all react)
 * Gets the context from the from parent angular ui-view if no parent reat UIView is available
 */
export class UIRouterContextComponent extends React.Component<
  IUIRouterContextComponentProps,
  IUIRouterContextComponentState
> {
  public static defaultProps: Partial<IUIRouterContextComponentProps> = {
    parentContextLevel: '0',
    inherited: true,
  };

  public state: IUIRouterContextComponentState = {
    ready: false,
    router: null,
    parentUIViewAddress: null,
  };

  private ref: HTMLElement;
  private injector: IInjectorService;

  private getRouterFromAngularJS(): UIRouterReact {
    if (this.injector) return this.injector.get('$uiRouter');
  }

  private getParentViewFromAngularJS() {
    let ref = this.ref;
    let steps = parseInt(this.props.parentContextLevel);
    steps = isNaN(steps) ? 0 : steps;

    while (ref && steps--) ref = ref.parentElement;
    const $uiView = ref && angular.element(ref).inheritedData('$uiView');
    return $uiView && new ParentUIViewAddressAdapter($uiView);
  }

  public componentDidMount() {
    this.setState({
      parentUIViewAddress: this.getParentViewFromAngularJS(),
    });
  }

  private refCallback = (ref: HTMLElement) => {
    if (ref && ref !== this.ref) {
      this.ref = ref;
      this.injector = angular.element(ref).injector();
      const router = this.getRouterFromAngularJS();
      const parentUIViewAddress = this.getParentViewFromAngularJS();
      this.setState({ ready: true, router, parentUIViewAddress });
      // console.log(ref);
    }
  };

  private renderChild(child: ReactElement<any>) {
    // console.log('renderChild()', child);
    const inherited = this.props.inherited;
    return (
      <UIRouterConsumer>
        {routerFromReactContext => (
          <UIRouterProvider value={inherited && routerFromReactContext || this.state.router}>
            <UIViewConsumer>
              {parentUIViewFromReactContext => (
                <UIViewProvider value={inherited && parentUIViewFromReactContext || this.state.parentUIViewAddress}>
                  {child}
                </UIViewProvider>
              )}
            </UIViewConsumer>
          </UIRouterProvider>
        )}
      </UIRouterConsumer>
    );
  }

  public render() {
    const { ready } = this.state;
    const { children } = this.props;

    const childrenCount = React.Children.count(children);
    if (!ready) {
      return <div ref={this.refCallback} />;
    }

    return this.renderChild(childrenCount === 1 ? React.Children.only(children) : <div>{children}</div>);
  }
}

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
