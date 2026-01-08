import React from 'react';
import { UIView } from '@uirouter/react';

export function ReactFunctionalComponent(props) {
  return (
    <div>
      <h1>Hello from react functional component</h1>
      <h3>{props.$state$.name} state loaded</h3>

      <UIView />
    </div>
  );
}
