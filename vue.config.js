process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'https://dev.webitel.com/api';
// http://192.168.177.199/api
// http://10.10.10.8:1907
// http://10.10.10.25:1907
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
        `
      }
    }
  },
  configureWebpack: (config) => {
    // config.module.rules = [
    //     ...config.module.rules,
    //   {
    //     test: /\.css$/,
    //     oneOf: [
    //       /* config.module.rule('css').oneOf('vue-modules') */
    //       {
    //         resourceQuery: /module/,
    //         use: [
    //           /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
    //           {
    //             loader: 'vue-style-loader',
    //             options: {
    //               sourceMap: false,
    //               shadowMode: false
    //             }
    //           },
    //           /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
    //           {
    //             loader: 'css-loader',
    //             options: {
    //               sourceMap: false,
    //               importLoaders: 2,
    //               modules: true,
    //               localIdentName: '[name]_[local]_[hash:base64:5]'
    //             }
    //           },
    //           /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
    //           {
    //             loader: 'postcss-loader',
    //             options: {
    //               sourceMap: false
    //             }
    //           }
    //         ]
    //       },
    //       /* config.module.rule('css').oneOf('vue') */
    //       {
    //         resourceQuery: /\?vue/,
    //         use: [
    //           /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
    //           {
    //             loader: 'vue-style-loader',
    //             options: {
    //               sourceMap: false,
    //               shadowMode: false
    //             }
    //           },
    //           /* config.module.rule('css').oneOf('vue').use('css-loader') */
    //           {
    //             loader: 'css-loader',
    //             options: {
    //               sourceMap: false,
    //               importLoaders: 2
    //             }
    //           },
    //           /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
    //           {
    //             loader: 'postcss-loader',
    //             options: {
    //               sourceMap: false
    //             }
    //           }
    //         ]
    //       },
    //       /* config.module.rule('css').oneOf('normal-modules') */
    //       {
    //         test: /\.module\.\w+$/,
    //         use: [
    //           /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
    //           {
    //             loader: 'vue-style-loader',
    //             options: {
    //               sourceMap: false,
    //               shadowMode: false
    //             }
    //           },
    //           /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
    //           {
    //             loader: 'css-loader',
    //             options: {
    //               sourceMap: false,
    //               importLoaders: 2,
    //               modules: true,
    //               localIdentName: '[name]_[local]_[hash:base64:5]'
    //             }
    //           },
    //           /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
    //           {
    //             loader: 'postcss-loader',
    //             options: {
    //               sourceMap: false
    //             }
    //           }
    //         ]
    //       },
    //       /* config.module.rule('css').oneOf('normal') */
    //       {
    //         use: [
    //           /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
    //           {
    //             loader: 'vue-style-loader',
    //             options: {
    //               sourceMap: false,
    //               shadowMode: false
    //             }
    //           },
    //           /* config.module.rule('css').oneOf('normal').use('css-loader') */
    //           {
    //             loader: 'css-loader',
    //             options: {
    //               sourceMap: false,
    //               importLoaders: 2
    //             }
    //           },
    //           /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
    //           {
    //             loader: 'postcss-loader',
    //             options: {
    //               sourceMap: false
    //             }
    //           }
    //         ]
    //       }
    //     ],
    //     exclude: ['/src/assets/css/icomoon.css']
    //   },
    //   {
    //     test: /\.css$/,
    //     use: ['raw-loader!icomoon-loader'],
    //     include: ['/src/assets/css/icomoon.css']
    //   }
    // ];
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
