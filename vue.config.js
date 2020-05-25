process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'https://dev.webitel.com/api';
process.env.VUE_APP_AUTH_MODULE_URL = process.env.NODE_ENV === 'production' ? '/app/auth' : 'http://dev.webitel.com/app/auth';

process.env.VUE_APP_ADMIN_URL = process.env.NODE_ENV === 'production' ? '/' : 'https://dev.webitel.com/admin';
process.env.VUE_APP_AGENT_URL = process.env.NODE_ENV === 'production' ? '/workspace' : 'https://dev.webitel.com/workspace';
process.env.VUE_APP_SUPERVISOR_URL = process.env.NODE_ENV === 'production' ? '/supervisor' : 'https://dev.webitel.com/supervisor';
process.env.VUE_APP_AUDIT_URL = process.env.NODE_ENV === 'production' ? '/audit' : 'https://dev.webitel.com/audit';
process.env.VUE_APP_HISTORY_URL = process.env.NODE_ENV === 'production' ? '/history' : 'https://dev.webitel.com/history';

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
  // publicPath: '',
  lintOnSave: false,
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
  configureWebpack: (config) => {
    // config.module.rules = [
    //     ...config.module.rules,
    // ];
    config.devtool = 'source-map';
    config.plugins.push(new MonacoWebpackPlugin({
      output: '', // папка, куда собирать скрипты воркеров
      languages: ['json'], // массив строк с названиями языков, для которых нужна подсветка
      features: ['bracketMatching', 'colorDetector', 'fontZoom',
        'wordHighlighter',
      ], // массив строк с нужными фичами
      // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    }));
  },
};
