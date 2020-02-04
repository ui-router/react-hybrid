import * as React from 'react';
import { UIRouterContextComponent } from './UIRouterReactContext';

/**
 * A decorator that provides the UIRouter state context allowing
 * React components to use the @uirouter/react components such as UISref
 *
 * Example:
 *
 * import { UISref, UISrefActive, UIView } from '@uirouter/react';
 *
 * @UIRouterContext
 * class MyComponent extends React.Component<any, any> {
 *   render() {
 *     return (
 *       <UISrefActive class="active">
 *         <UISref to=".neststate" params={{ id: this.props.someid }}>
 *           <a>Go to item {this.props.someid}</a>
 *         </UISref>
 *       </UISrefActive>
 *
 *       <UIView/>
 *     )
 *   }
 * }
 *
 * @param Component the react component to wrap
 */
export function UIRouterContext(Component: { new (...args: any[]): React.Component<any, any> }): any {
  return props => <UIRouterContextComponent>{React.createElement(Component, props)}</UIRouterContextComponent>;
}
