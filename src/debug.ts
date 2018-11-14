import { padString } from '@uirouter/core';

export const debug = (
  angularOrReact: 'angularjs' | 'react',
  component: string,
  id: string,
  method: string,
  message: string,
  ...args
) => {
  if (window && window['debugReactHybrid'] !== true) return;
  console.log(
    `${padString(12, angularOrReact)} ${padString(40, `${component}[${id}]`)} ${padString(
      35,
      `${method}:`
    )} ${message}`,
    ...args
  );
};
