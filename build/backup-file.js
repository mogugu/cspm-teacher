var shell = require('shelljs')
var path = require('path')
var backupList = [
    'src',
    'static',
    'index.html',
    'package.json',
]

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

function backupFile(folder, cb) {
    var targetFolder = path.join(__dirname , `../backup/${folder}/code/`)
    exec(`mkdir ${targetFolder}\\${backupList[0]} ${targetFolder}\\${backupList[1]}`)
    for(let i=0; i<backupList.length; i++ ) {
        exec(`cp -r ${path.join(__dirname , '..', backupList[i])} ${targetFolder}`)
    }
    cb && cb()
}

module.exports = backupFile
