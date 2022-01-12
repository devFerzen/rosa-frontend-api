module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  //Error socket localhost -> notes in https://stackoverflow.com/questions/55754906/errors-in-browser-console-requests-to-sockjs-node-infot-1555629946494
  devServer: {
        disableHostCheck: true,
        port: 8080,
        public: '0.0.0.0:8080'
    },
    publicPath: "/"
}
