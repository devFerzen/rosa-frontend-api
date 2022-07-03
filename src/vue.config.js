module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  //Error socket localhost -> notes in https://stackoverflow.com/questions/55754906/errors-in-browser-console-requests-to-sockjs-node-infot-1555629946494
  devServer: {
    proxy: {
      "^/api": {
        target: "https://error-609.herokuapp.com:3080" //"http://localhost:3080/",
      },
    },
  },
};
