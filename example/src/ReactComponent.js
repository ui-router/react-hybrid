import React, { Component } from 'react';
import { UIView } from '@uirouter/react';

export class ReactComponent extends Component {
  render() {
    const makeReactCptFail = { x: 3, y: 4 };
    return (
      <div>
        <h1>Hello from react</h1>
        <h3>{this.props.$state$.name} state loaded</h3>
        {makeReactCptFail}
        <UIView />
      </div>
    );
  }
}
