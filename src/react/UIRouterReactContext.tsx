import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as angular from 'angular';
import { UIViewData } from '@uirouter/angularjs/lib/directives/viewDirective';
import { UIRouter } from '@uirouter/core';

export interface IUIRouterContextComponentProps {
  parentContextLevel?: string;
}

export interface IUIRouterContextComponentState {
  router: UIRouter;
  parentUIViewAddress: any;
}

/**
 * Provide react context necessary for UIView, UISref and UISrefActive
 *
 * Gets the context from the parent react UIView (if component tree is all react)
 * Gets the context from the from parent angular ui-view if no parent reat UIView is available
 */
export class UIRouterContextComponent extends React.Component<IUIRouterContextComponentProps, IUIRouterContextComponentState> {
  // context from parent react UIView
  public static contextTypes = {
    router: PropTypes.object,
    parentUIViewAddress: PropTypes.object,
  };

  // context to child
  public static childContextTypes = {
    router: PropTypes.object,
    parentUIViewAddress: PropTypes.object,
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
      // Add $uiView data
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
 * Get the fqn and context from the parent angularjs ui-view.
 * Uses the ui-view element's data
 */
class ParentUIViewAddressAdapter {
  constructor(private _ngdata: UIViewData) {
    if (!_ngdata) throw new Error("@uirouter/react-hybrid: Address Adapter created with no _ngdata parameter.")
  }

  public get fqn() {
    return this._ngdata.$uiView.fqn;
  }

  public get context() {
    if (!this._ngdata || !this._ngdata.$cfg || !this._ngdata.$cfg.viewDecl) {
      console.log(this._ngdata);
      throw new Error("@uirouter/react-hybrid: Uh oh. Views are in an invalid state. Parent UIView has no $cfg or viewDecl");
    }

    return this._ngdata.$cfg.viewDecl.$context || this._ngdata.$uiView.creationContext;
  }
}
