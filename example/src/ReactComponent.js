import React, { Component } from 'react';
import { UIView } from '@uirouter/react';

export class ReactComponent extends Component {
  render() {
    return (
      <div>
        <h1>Hello from react</h1>
        <h3>{this.props.$state$.name} state loaded</h3> 

        <UIView/>
      </div>
    );
  }
};