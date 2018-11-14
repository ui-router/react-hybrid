import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UIView } from '@uirouter/react';
import { AngularUIView } from './AngularUIView';
import ReactUIView from './ReactUIView';
import { debug as debugLog } from '../debug';

/**
 * Monkey patches the @uirouter/react UIView such that:
 *
 * When a @uirouter/react `<UIView/>` is rendered (from react code),
 * it renders first to an AngularJS `<ui-view>` component,
 * inside the `ui-view` is an AngularJS `<react-ui-view-adapter>`,
 * which finally renders a real @uirouter/react `<UIView/>`:
 *
 * <ui-view name="name">
 *   <react-ui-view-adapter name="name">
 *     <UIView wrap={false} name="name">
 *       <RoutedReactComponent/>
 *     </UIView>
 *   </react-ui-view-adapter>
 * </ui-view>
 */
const realRender = UIView.prototype.render;

let id = 0;

class PortalView extends React.PureComponent {
  private $id = id++;

  public state = {
    props: null,
    target: null,
  };

  private debug = (method: string, message: string, ...args) =>
    debugLog('react     PortalView', `${this.$id}/${this.props['name']}`, method, message, ...args);

  public componentWillUnmount() {
    this.debug('.componentWillUnmount()', '');
  }

  setChildViewProps = (props, target) => {
    this.debug('.setChildViewProps()', JSON.stringify(props), target);
    this.setState({ props, target });
  };

  renderPortal() {
    const { props, target } = this.state;

    if (props && target) {
      this.debug(
        `.renderPortal({ name: ${this.props['name']} })`,
        'rendering portal',
        this.state.props,
        this.state.target
      );
      return ReactDOM.createPortal(<ReactUIView {...props} />, target);
    }

    this.debug(`.renderPortal({ name: ${this.props['name']} })`, 'no target; not rendering portal');
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <AngularUIView {...this.props} setChildViewProps={this.setChildViewProps} />
        {this.renderPortal()}
      </React.Fragment>
    );
  }
}

UIView.prototype.render = function() {
  if (this.props.wrap === false) {
    debugLog('react     UIView', `${this.$id}/${this.props['name']}`, '.render()', 'realRender.apply(this, arguments)');
    return <div className="UIView">{realRender.apply(this, arguments)}</div>;
  }

  return <PortalView {...this.props} />;
};
