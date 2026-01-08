import { createRoot, Root } from 'react-dom/client';
import { registerReactUIViewAdapter, ReactDOMAdapter } from './ReactUIViewAdapterComponent.base';

// React 18+ adapter using createRoot API
const roots = new WeakMap<Element, Root>();

const adapter: ReactDOMAdapter = {
  render: (element, container) => {
    let root = roots.get(container);
    if (!root) {
      root = createRoot(container);
      roots.set(container, root);
    }
    root.render(element);
  },
  unmount: (container) => {
    const root = roots.get(container);
    if (root) {
      root.unmount();
      roots.delete(container);
    }
  },
};

registerReactUIViewAdapter(adapter);
