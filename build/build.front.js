// require('./check-versions')()

// process.env.NODE_ENV = 'production'

// var ora = require('ora')
// var rm = require('rimraf')
// var path = require('path')
// var chalk = require('chalk')
// var backupFile = require('./backup-file')
// var webpack = require('webpack')
// var config = require('../config')
// var webpackConfig = require('./webpack.prod.front.conf')

// var spinner = ora('building for production...')
// spinner.start()

// rm(path.join(config.buildFrontFront.assetsRoot, config.buildFrontFront.assetsSubDirectory), err => {
//   if (err) throw err
//   webpack(webpackConfig, function (err, stats) {
//     spinner.stop()
//     if (err) throw err
//     process.stdout.write(stats.toString({
//       colors: true,
//       modules: false,
//       children: false,
//       chunks: false,
//       chunkModules: false
//     }) + '\n\n')
//     backupFile(config.buildFrontFront.now, function() {
//       console.log(chalk.cyan('  Build complete.\n'))
//       console.log(chalk.yellow(
//         '  Tip: built files are meant to be served over an HTTP server.\n' +
//         '  Opening index.html over file:// won\'t work.\n'
//       ))
//     })
//   })
// })
// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'
var path = require('path')
var config = require('../config')
var ora = require('ora')
var backupFile = require('./backup-file')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.front.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.buildFront.assetsRoot, config.buildFront.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
    backupFile(config.buildFront.now, function() {
        console.log('Build complete.\n')
    })
})
