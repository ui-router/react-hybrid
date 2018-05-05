import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';

let MINIFY = process.env.MINIFY;

let pkg = require('./package.json');
let banner = `/**
 * ${pkg.description}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */`;

let uglifyOpts = { output: {} };
// retain multiline comment with @license
uglifyOpts.output.comments = (node, comment) => comment.type === 'comment2' && /@license/i.test(comment.value);

let plugins = [nodeResolve({ jsnext: true }), sourcemaps(), commonjs()];

if (MINIFY) plugins.push(uglify(uglifyOpts));

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
    'prop-types',
    'angular',
  ];

  let regexps = externals
    .map(e => [
      new RegExp(`^${e}$`),
      // new RegExp(`commonjs-proxy.${e}$`),
      new RegExp(`node_modules/${e}`),
    ])
    .reduce((acc, a) => acc.concat(a), []);

  return regexps.map(regex => regex.exec(id)).reduce((acc, val) => acc || !!val, false);
}

const CONFIG = {
  input: 'lib-esm/index.js',
  output: {
    name: '@uirouter/react-hybrid',
    file: '_bundles/ui-router-react-hybrid' + extension,
    sourcemap: true,
    format: 'umd',
    banner: banner,
    exports: 'named',
    globals: {
      '@uirouter/angularjs': '@uirouter/angularjs',
      '@uirouter/react': '@uirouter/react',
      '@uirouter/core': '@uirouter/core',
      angular: 'angular',
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
    },
  },

  plugins: plugins,
  onwarn: onwarn,
  external: isExternal,
};

export default CONFIG;
