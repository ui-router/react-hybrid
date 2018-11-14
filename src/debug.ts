export const debug = (component: string, id: string, method: string, message: string, ...args) => {
  if (window && window['debugReactHybrid'] !== true) return;
  console.log(`${component}[${id}]${method}: ${message}`, ...args);
};
