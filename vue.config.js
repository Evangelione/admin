module.exports = {
  devServer: {
    // proxy: 'http://cs.7youke.com',
    proxy: 'http://localhost:8905',
    // proxy: 'http://cs.czg365.cn',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  configureWebpack: {
    externals: {
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
    },
  },
}
