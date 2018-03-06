// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var nowDate = new Date()
// var now = +new Date()
var appendZero = function (input) {
  if (input < 10) {
    return '0'+''+input
  }
  return input
}
var now = nowDate.getFullYear()+''
        +appendZero(nowDate.getMonth()+1)+''
        +appendZero(nowDate.getDate())+''
        +appendZero(nowDate.getHours())+''
        +appendZero(nowDate.getMinutes())+''
        +appendZero(nowDate.getSeconds())
     
module.exports = {
  buildFront: {
    now: now,
    env: require('./prod.env'),
    index: path.resolve(__dirname, `../backup/${now}/dist/${process.env.npm_package_version}/index.html`),
    assetsRoot: path.resolve(__dirname, `../backup/${now}/dist/${process.env.npm_package_version}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: `/bc/static/teacher/${process.env.npm_package_version}/`,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, `../dist/${process.env.npm_package_version}/index.html`),
    assetsRoot: path.resolve(__dirname, `../dist/${process.env.npm_package_version}`),
    // assetsRoot: path.resolve(__dirname, `../dist/`),
    assetsSubDirectory: 'static',
    // assetsPublicPath: './',
    assetsPublicPath: `/bc/static/teacher/${process.env.npm_package_version}/`,
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 配置后端接口代理
    proxyTable: {
      '/bc/':{
          target:'http://test.sciencepeditor.com/bc/',
          // target:'http://192.168.1.200:8081/bc/',
          changeOrigin:true,
          pathRewrite:{
              '^/bc':''
          }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
