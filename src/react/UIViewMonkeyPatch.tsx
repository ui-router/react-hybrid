import { UIView } from '@uirouter/react';
import * as React from 'react';
// Hopefully temporary until angular2react supports `@` bindings
// import { angular2react } from 'angular2react';
import { angular2react } from '../angular2react';
import { hybridModule } from '../angularjs/module';


/**
 * Monkey patches the @uirouter/react UIView such that:
 *
 * When a `<UIView/>` is rendered from react code, it renders to an angular component:
 *
 * <ui-view name="props.name">
 *   <react-ui-view-adapter name="name">
 *     <RealUIView name="props.name">
 *     </RealUIView>
 *   </react-ui-view-adapter>
 * </ui-view>
 */



let Angular2ReactUIViewAdapter = null;
hybridModule.run(['$injector', $injector => {
  const uiViewComponentShape = { bindings: { name: '@' } };
  Angular2ReactUIViewAdapter = angular2react<{ name: string }>('uiView', uiViewComponentShape, $injector)
}]);

const realRender = UIView.prototype.render;
const realComponentWillMount = UIView.prototype.componentWillMount;
const realComponentWillUnmount = UIView.prototype.componentWillUnmount;

UIView.prototype.render = function() {
  const { wrap, name } = this.props;

  if (wrap === false) {
    return realRender.apply(this, arguments);
  }

  if (name) {
    return <Angular2ReactUIViewAdapter name={name}/>
  }
  return <Angular2ReactUIViewAdapter />
};

UIView.prototype.componentWillMount = function() {
  if (this.props.wrap === false) {
    return realComponentWillMount.apply(this, arguments);
  }
};

UIView.prototype.componentWillUnmount = function() {
  if (this.props.wrap === false) {
    return realComponentWillUnmount.apply(this, arguments);
  }
};
