process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://10.10.10.8:1907';
// http://192.168.177.199/api


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
  configureWebpack: {
    devtool: 'source-map',
  },
};
