process.env.VUE_APP_PACKAGE_VERSION = require('./package.json').version;

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    publicPath: '/',
    transpileDependencies: true,
    lintOnSave: true,
    productionSourceMap: false && process.env.NODE_ENV !== 'production' || process.env.SOURCE_MAP,
    css: {
        loaderOptions: {
            sass: {
              implementation: require('sass'),
              additionalData: `
                      @import '@/app/css/main.scss';
                    `,
            },
        },
    },
  configureWebpack: {
      resolve: {
        fallback: {
          // path: false,
          // stream: require.resolve('stream-browserify'),
        },
      },
  },
    chainWebpack: (config) => {
      config.resolve.alias.set('vue', '@vue/compat');

      config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      });

      config.plugin('polyfills').use(NodePolyfillPlugin)

        config.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [{
            output: '', // папка, куда собирать скрипты воркеров
            languages: ['json'], // массив строк с названиями языков, для которых нужна подсветка
            features: ['bracketMatching', 'colorDetector', 'fontZoom',
                'wordHighlighter',
            ], // массив строк с нужными фичами
            // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        }]);

//       // config.plugin('webpack-bundle-analyzer').use(new BundleAnalyzerPlugin({
//         // analyzerHost: '127.0.0.1:8082',
//         // analyzerMode: 'static',
//         // analyzerMode: 'disabled',
//       // }));

      config.module
        .rule('svg')
        .exclude.add(/^(.*sprite).*\.svg/); // same as in svg-sprite-loader

      config.module
        .rule('svg-sprite')
        .test(/^(.*sprite).*\.svg/) // same as in svg-url-loader
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader');
    },
};
