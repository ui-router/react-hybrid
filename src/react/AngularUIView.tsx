import { hybridModule } from '../angularjs/module';
import * as React from 'react';

let $injector, $rootScope, $compile;
hybridModule.run([
  '$injector',
  _$injector_ => {
    $injector = _$injector_;
    $rootScope = _$injector_.get('$rootScope');
    $compile = _$injector_.get('$compile');
  },
]);

/**
 * A React component which renders an AngularJS <ui-view>
 * This was heavily influenced by https://github.com/coatue-oss/angular2react
 */
export class AngularUIView extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      $scope: $rootScope.$new(),
    };
  }

  render() {
    const { className, ...restProps } = this.props;

    let props = {
      ...restProps,
      class: className,
      ref: this.compile.bind(this),
    };

    return React.createElement('ui-view', props);
  }

  compile(ref: Element) {
    $compile(ref)(this.state.$scope);
  }

  componentWillUnmount() {
    this.state.$scope.$destroy();
  }

  /** Only render once */
  shouldComponentUpdate() {
    return false;
  }
}
