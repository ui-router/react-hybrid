import { createRequire } from 'module';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps2';
import commonjs from '@rollup/plugin-commonjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

let MINIFY = process.env.MINIFY;
let banner = `/**
 * ${pkg.description}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */`;

let plugins = [nodeResolve(), sourcemaps(), commonjs()];

if (MINIFY) {
  plugins.push(
    terser({
      format: {
        // retain multiline comment with @license
        comments: (node, comment) => {
          return comment.type == 'comment2' && /@license/i.test(comment.value);
        },
      },
    })
  );
}

let extension = MINIFY ? '.min.js' : '.js';

// Suppress this error message... there are hundreds of them. Angular team says to ignore it.
// https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') return;
  console.error(warning.message);
}

function isExternal(id) {
  let externals = [
    '@uirouter/core',
    '@uirouter/angularjs',
    '@uirouter/react',
    'react',
    'react-dom',
    'react-dom/client',
    'prop-types',
    'angular',
  ];

  let regexps = externals
    .map((e) => [
      new RegExp(`^${e}$`),
      // new RegExp(`commonjs-proxy.${e}$`),
      new RegExp(`node_modules/${e}`),
    ])
    .reduce((acc, a) => acc.concat(a), []);

  return regexps.map((regex) => regex.exec(id)).reduce((acc, val) => acc || !!val, false);
}

const globals = {
  '@uirouter/angularjs': '@uirouter/angularjs',
  '@uirouter/react': '@uirouter/react',
  '@uirouter/core': '@uirouter/core',
  angular: 'angular',
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-dom/client': 'ReactDOM',
  'prop-types': 'PropTypes',
};

// Main entry point (React 18+)
const mainConfig = {
  input: 'lib-esm/index.js',
  output: {
    name: '@uirouter/react-hybrid',
    file: '_bundles/ui-router-react-hybrid' + extension,
    sourcemap: true,
    format: 'umd',
    banner: banner,
    exports: 'named',
    globals,
  },
  plugins: plugins,
  onwarn: onwarn,
  external: isExternal,
};

// Legacy entry point (React 16/17)
const legacyConfig = {
  input: 'lib-esm/legacy.js',
  output: {
    name: '@uirouter/react-hybrid',
    file: '_bundles/ui-router-react-hybrid-legacy' + extension,
    sourcemap: true,
    format: 'umd',
    banner: banner,
    exports: 'named',
    globals,
  },
  plugins: plugins,
  onwarn: onwarn,
  external: isExternal,
};

export default [mainConfig, legacyConfig];
