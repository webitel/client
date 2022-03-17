process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'https://dev.webitel.com/api';
// process.env.VUE_APP_CHAT_URL = process.env.NODE_ENV === 'production' ? '/chat' : '';

process.env.VUE_APP_AUTH_MODULE_URL = process.env.NODE_ENV === 'production' ? '/app/auth' : 'http://dev.webitel.com/app/auth';

process.env.VUE_APP_ADMIN_URL = process.env.NODE_ENV === 'production' ? '/admin' : 'https://dev.webitel.com/admin';
process.env.VUE_APP_AGENT_URL = process.env.NODE_ENV === 'production' ? '/workspace' : 'https://dev.webitel.com/workspace';
process.env.VUE_APP_SUPERVISOR_URL = process.env.NODE_ENV === 'production' ? '/supervisor' : 'https://dev.webitel.com/supervisor';
process.env.VUE_APP_AUDIT_URL = process.env.NODE_ENV === 'production' ? '/audit' : 'https://dev.webitel.com/audit';
process.env.VUE_APP_HISTORY_URL = process.env.NODE_ENV === 'production' ? '/history' : 'https://dev.webitel.com/history';
process.env.VUE_APP_GRAFANA_URL = process.env.NODE_ENV === 'production' ? '/grafana' : 'https://dev.webitel.com/grafana';
process.env.VUE_APP_OMNI_WIDGET_URL = process.env.NODE_ENV === 'production' ? '/omni-widget' : 'https://dev.webitel.com/omni-widget';
process.env.VUE_APP_FLOW_DIAGRAM_URL = process.env.NODE_ENV === 'production' ? '/flow-diagram' : 'https://dev.webitel.com/flow-diagram';

process.env.VUE_APP_PACKAGE_VERSION = require('./package.json').version;

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    publicPath: '/',
    transpileDependencies: ['@webitel/ui-sdk/src'],
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
    chainWebpack: (config) => {
        config.optimization.splitChunks = {
            chunks: 'all',
        };

        config.module
            .rule('eslint')
            .use('eslint-loader')
            .tap((opts) => ({ ...opts, emitWarning: true }));
        // config.devtool('source-map');
        config.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [{
            output: '', // папка, куда собирать скрипты воркеров
            languages: ['json'], // массив строк с названиями языков, для которых нужна подсветка
            features: ['bracketMatching', 'colorDetector', 'fontZoom',
                'wordHighlighter',
            ], // массив строк с нужными фичами
            // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        }]);

      config.plugin('webpack-bundle-analyzer').use(new BundleAnalyzerPlugin({
        // analyzerHost: '127.0.0.1:8082',
        // analyzerMode: 'static',
        analyzerMode: 'disabled',
      }));

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
