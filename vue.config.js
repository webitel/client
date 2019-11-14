process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://192.168.177.199/api';
// http://192.168.177.199/api
// http://10.10.10.8:1907
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/main.scss";
          @import "@/assets/css/objects/objects.scss";
        `
      }
    }
  },
  configureWebpack: (config) => {
    config.devtool = 'source-map';
    config.plugins.push(new MonacoWebpackPlugin({
      output: '', // папка, куда собирать скрипты воркеров
      languages: ['json'], // массив строк с названиями языков, для которых нужна подсветка
      features: ['bracketMatching', 'colorDetector', 'fontZoom',
        'wordHighlighter',
      ] // массив строк с нужными фичами
      // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    }));
  },
};
