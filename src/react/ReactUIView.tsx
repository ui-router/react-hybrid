import * as React from 'react';
import { UIRouterContext, UIView, UIViewContext, UIViewProps } from '@uirouter/react';
import { UIRouterContextComponent } from './UIRouterReactContext';
import { debugLog } from '../debug';

const InternalUIView = UIView.__internalViewComponent;

export interface IReactUIViewProps extends UIViewProps {
  refFn: (ref: HTMLElement) => void;
}

export const ReactUIView = ({ refFn, ...props }: IReactUIViewProps) => {
  debugLog('react', 'ReactUIView', `?/${props['name']}`, '.render()', '');

  return (
    <UIRouterContextComponent parentContextLevel="3" inherited={false}>
      <UIRouterContext.Consumer>
        {router => (
          <UIViewContext.Consumer>
            {parentUiView => (
              <InternalUIView {...props} ref={refFn as any} parentUIView={parentUiView} router={router} />
            )}
          </UIViewContext.Consumer>
        )}
      </UIRouterContext.Consumer>
    </UIRouterContextComponent>
  );
};
