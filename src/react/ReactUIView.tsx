import * as React from 'react';
import { UIRouterConsumer, UIView, UIViewConsumer } from '@uirouter/react';
import { UIRouterContextComponent } from './UIRouterReactContext';
import { debug as debugLog } from '../debug';

const InternalUIView = UIView.__internalViewComponent;

const ReactUIView = ({ refFn, ...props }) => {
  debugLog('react     ReactUIView', `?/${props['name']}`, '.render()', '');

  return (
    <UIRouterContextComponent parentContextLevel="3" inherited={false}>
      <UIRouterConsumer>
        {router => (
          <UIViewConsumer>
            {parentUiView => <InternalUIView {...props} ref={refFn} parentUIView={parentUiView} router={router} />}
          </UIViewConsumer>
        )}
      </UIRouterConsumer>
    </UIRouterContextComponent>
  );
};

export default ReactUIView;
