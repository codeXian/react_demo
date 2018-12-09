const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const babelDynamicImport = require('@babel/plugin-syntax-dynamic-import');

module.exports = function override(config, env) {
  // add antd
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );
  // add babel dynamic import
  config = injectBabelPlugin(babelDynamicImport, config);
  // fix antd less vars
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1DA57A' },
    javascriptEnabled: true,
  })(config, env);
  return config;
};
