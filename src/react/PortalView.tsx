import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UIView, UIViewProps } from '@uirouter/react';
import { AngularUIView } from './AngularUIView';
import ReactUIView from './ReactUIView';
import { debug as debugLog } from '../debug';

let id = 0;

interface IPortalViewState {
  props: any;
  target: HTMLElement;
}

export class PortalView extends React.PureComponent<UIViewProps, IPortalViewState> {
  private $id = id++;

  public state = {
    props: null,
    target: null,
  };

  private debug = (method: string, message: string, ...args) =>
    debugLog('react', 'PortalView', `${this.$id}/${this.props['name']}`, method, message, ...args);

  public componentWillUnmount() {
    this.debug('.componentWillUnmount()', '');
  }

  createPortalToTarget = (props, target) => {
    this.debug('.createPortalToTarget()', JSON.stringify(props), target);
    this.setState({ props, target });
  };

  renderPortal() {
    const { props, target } = this.state;
    const method = `.renderPortal({ name: ${this.props['name']} })`;

    if (props && target) {
      this.debug(method, 'ReactDOM.createPortal()', this.state.props, this.state.target);
      return ReactDOM.createPortal(<ReactUIView {...props} />, target);
    } else {
      this.debug(method, 'no target; not rendering portal');
      return null;
    }
  }

  render() {
    this.debug('.render()', '');

    return (
      <React.Fragment>
        <AngularUIView {...this.props} portalView={this} />
        {this.renderPortal()}
      </React.Fragment>
    );
  }
}
