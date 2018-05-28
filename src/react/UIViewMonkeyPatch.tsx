import * as React from 'react';
import { UIView } from '@uirouter/react';
import { AngularUIView } from './AngularUIView';

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

UIView.prototype.render = function() {
  if (this.props.wrap === false) {
    return realRender.apply(this, arguments);
  }

  return <AngularUIView {...this.props} />;
};
