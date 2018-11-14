import * as React from 'react';
import { IScope } from 'angular';
import { hybridModule } from '../angularjs/module';
import { PortalView } from './PortalView';

let $injector, $rootScope, $compile;
hybridModule.run([
  '$injector',
  _$injector_ => {
    $injector = _$injector_;
    $rootScope = _$injector_.get('$rootScope');
    $compile = _$injector_.get('$compile');
  },
]);

interface IAngularUIViewProps {
  portalView?: PortalView;
  className?: string;
}

export interface IPortalScope extends IScope {
  $uiRouterReactHybridPortalView?: PortalView;
}

/**
 * A React component which renders an AngularJS <ui-view>
 * This was heavily influenced by https://github.com/coatue-oss/angular2react
 */
export class AngularUIView extends React.Component<IAngularUIViewProps> {
  private $scope: IPortalScope = $rootScope.$new();

  constructor(props: IAngularUIViewProps) {
    super(props);
    this.$scope.$uiRouterReactHybridPortalView = this.props.portalView;
  }

  componentWillUnmount() {
    this.$scope.$destroy();
  }

  render() {
    const { className, ...restProps } = this.props;
    const ref = (htmlRef: Element) => $compile(htmlRef)(this.$scope);

    const props = { ...restProps, class: className, ref };
    return React.createElement('ui-view', props);
  }

  /** Only render once */
  shouldComponentUpdate() {
    return false;
  }
}
