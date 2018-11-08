import { UIRouterConsumer, UIView, UIViewConsumer } from "@uirouter/react";
import { UIRouterContextComponent } from "./UIRouterReactContext";
import * as React from "react";

const InternalUIView = UIView.__internalViewComponent;

const ReactUIView = ({ refFn, ...props }) => (
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

export default ReactUIView;
