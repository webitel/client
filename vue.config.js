process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'https://dev.webitel.com/api';
process.env.VUE_APP_AUTH_MODULE_URL = process.env.NODE_ENV === 'production' ? '/app/auth' : 'http://dev.webitel.com/app/auth';

process.env.VUE_APP_ADMIN_URL = process.env.NODE_ENV === 'production' ? '/admin' : 'https://dev.webitel.com/admin';
process.env.VUE_APP_AGENT_URL = process.env.NODE_ENV === 'production' ? '/workspace' : 'https://dev.webitel.com/workspace';
process.env.VUE_APP_SUPERVISOR_URL = process.env.NODE_ENV === 'production' ? '/supervisor' : 'https://dev.webitel.com/supervisor';
process.env.VUE_APP_AUDIT_URL = process.env.NODE_ENV === 'production' ? '/audit' : 'https://dev.webitel.com/audit';
process.env.VUE_APP_HISTORY_URL = process.env.NODE_ENV === 'production' ? '/history' : 'https://dev.webitel.com/history';
process.env.VUE_APP_GRAFANA_URL = process.env.NODE_ENV === 'production' ? '/grafana' : 'https://dev.webitel.com/grafana';

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
    // publicPath: '',
    lintOnSave: true,
    css: {
        loaderOptions: {
            sass: {
                data: `
                      @import "@/assets/css/main.scss";
                      @import "@/assets/css/objects/objects.scss";
                      @import "@/assets/css/media.scss";
                    `,
            },
        },
    },
    chainWebpack: (config) => {
        // // exclude sprites default building
        // config.module.rule('svg').exclude.add(/^(.*sprites).*\.svg/);
        //
        // // use svg-sprite-loader to process icons sprite
        // config.module.rule('svg-sprite').test(/^(.*sprites).*\.svg/)
        //     .use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: () => '' });
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
    },
};
