import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UIView } from '@uirouter/react';
import { AngularUIView } from './AngularUIView';
import ReactUIView from "./ReactUIView";

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

class PortalView extends React.PureComponent {
  state = {
    props: null,
    target: null,
  };

  setChildViewProps = (props, target) => {
    this.setState({ props, target });
  };

  renderPortal() {
    if (!this.state) return null;
    const { props, target } = this.state;
    if (props && target) {
      return ReactDOM.createPortal(
        <ReactUIView {...props} />,
        target
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <AngularUIView {...this.props} setChildViewProps={this.setChildViewProps}/>
        {this.renderPortal()}
      </React.Fragment>
    )
  }
}

UIView.prototype.render = function() {
  if (this.props.wrap === false) {
    return realRender.apply(this, arguments);
  }

  return (
    <PortalView {...this.props}/>
  );
};
