import * as ReactDOM from 'react-dom';
import { registerReactUIViewAdapter, ReactDOMAdapter } from './ReactUIViewAdapterComponent.base';

// React 16/17 adapter using legacy ReactDOM.render API
const adapter: ReactDOMAdapter = {
  render: (element, container) => {
    ReactDOM.render(element as any, container as any);
  },
  unmount: (container) => {
    ReactDOM.unmountComponentAtNode(container);
  },
};

registerReactUIViewAdapter(adapter);
