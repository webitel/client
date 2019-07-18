process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://10.10.10.8:1907';

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        devtool: 'source-map',
    }
};
