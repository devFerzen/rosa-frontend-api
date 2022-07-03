module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  //Error socket localhost -> notes in https://stackoverflow.com/questions/55754906/errors-in-browser-console-requests-to-sockjs-node-infot-1555629946494
  devServer: {
    proxy: {
      "/api": {
        target: "https://localhost:3080" //"https://error-609.herokuapp.com:3080/api", //"https://localhost:3080/api",
      },
    },
  },
};
