module.exports = {
  outputDir: 'dist',
  assetsDir: 'public',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: false,// process.env.NODE_ENV === 'production'
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  // transpileDependencies: ['node_modules/webpack-dev-server/client','node_modules/rz-methods'],
  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: config => {
    // console.log(config.module.rule('js'));
    /* config.module.rule('js')
      .include
      .add('./node_modules/rz-methods')
      .end()
      .use('babel-loader') */
  },
  // css的处理
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    requireModuleExtension: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: { css: {}, less: {} }
  },
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    https: false,
    hotOnly: false,
    open: false,
    proxy: {
      '/api': {
        target: '127.0.0.1:3005',
        ws: true,
        changeOrigin: true
      },
    }
  },
  pluginOptions: {}
}