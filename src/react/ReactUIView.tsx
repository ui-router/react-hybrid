import * as React from 'react';
import { UIView, UIViewProps } from '@uirouter/react';
import { UIRouterContextComponent } from './UIRouterReactContext';
import { debugLog } from '../debug';

const InternalUIView = UIView.__internalViewComponent;

export interface IReactUIViewProps extends UIViewProps {
  refFn: (ref: HTMLElement) => void;
}

export const ReactUIView = ({ refFn, ...props }: IReactUIViewProps) => {
  debugLog('react', 'ReactUIView', `?/${props['name']}`, '.render()', '');
  // InternalUIView is an internal API that accepts ref, but its types don't expose it
  const internalProps = { ...props, ref: refFn } as any;
  return (
    <UIRouterContextComponent parentContextLevel="3" inherited={false}>
      <InternalUIView {...internalProps} />
    </UIRouterContextComponent>
  );
};
