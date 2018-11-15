import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UIViewProps } from '@uirouter/react';
import { debugLog } from '../debug';
import { AngularUIView } from './AngularUIView';
import { IReactUIViewProps, ReactUIView } from './ReactUIView';

let id = 0;

interface IPortalViewState {
  portals: {
    [key: number]: ChildUIView;
  };
}

export interface ChildUIView {
  childUIViewProps: IReactUIViewProps;
  portalTarget: HTMLElement;
}

/**
 * This react component renders the AngularUIView react component
 * and also creates React Portals as needed for child React UIViews.
 */
export class PortalView extends React.PureComponent<UIViewProps, IPortalViewState> {
  private $id = id++;
  public state: IPortalViewState = { portals: [] };

  private debug = (method: string, message: string, ...args) =>
    debugLog('react', 'PortalView', `${this.$id}/${this.props['name']}`, method, message, ...args);

  public componentWillUnmount() {
    this.debug('.componentWillUnmount()', '');
  }

  createPortalToChildUIView = (uiViewId: number, childUIView: ChildUIView) => {
    this.debug('.createPortalToChildUIView()', JSON.stringify(childUIView.childUIViewProps), childUIView.portalTarget);
    this.setState(prev => {
      const portals = { ...prev.portals, [uiViewId]: childUIView };
      return { portals };
    });
  };

  removePortalToChildUIView = (uiViewId: number) => {
    const childUIView = this.state.portals[uiViewId] || ({} as ChildUIView);
    this.debug('.removePortalToChildUIView()', `${uiViewId}`, childUIView.childUIViewProps, childUIView.portalTarget);
    this.setState(prev => {
      const portals = { ...prev.portals };
      delete portals[uiViewId];
      return { portals };
    });
  };

  renderPortals() {
    const { portals } = this.state;
    const method = `.renderPortals()`;

    Object.keys(portals).forEach(key => {
      const portal = portals[key];
      this.debug(method, `ReactDOM.createPortal(${key})`, '', portal.childUIViewProps, portal.portalTarget);
    });

    return Object.keys(portals).map(key => {
      const portal = portals[key];
      // No mechanism to provide a key when creating a portals array?
      return (
        <div style={{ display: 'none' }} key={`${key}`}>
          {ReactDOM.createPortal(<ReactUIView {...portal.childUIViewProps} />, portal.portalTarget)}
        </div>
      );
    });
  }

  render() {
    this.debug('.render()', '');

    return (
      <React.Fragment>
        <AngularUIView {...this.props} portalView={this} />
        {this.renderPortals()}
      </React.Fragment>
    );
  }
}
