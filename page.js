const fs = require('fs')
const ar = ['ClassTaskIndex',
'ClassTaskPublish',
'ClassTaskDetail',
'ClassTaskDetailTotal',
'ClassTaskDetailVideo',
'ClassTaskDetailPaper',
'ClassTaskDetailPaperMore',
'ClassTaskDetailFile',
'ClassTaskDetailWork',
'ClassTaskDetailWorkManage',
'SourceRepoWorkTemplate',
'SourceRepoWorkTemplateDetail',
'SourceRepoVideo',
'SourceRepoVideoDetail',
'SourceRepoTestQuestion',
'SourceRepoPaperGenerate',
'SourceRepoPaper',
'SourceRepoPaperDetail',
'WorkRepoStudent',
'WorkRepoPlatform',
'ClassManageIndex',
'ClassManageStudent',
'ClassManageStudentStastic',
'ClassManageGood',
'PersonalCenterBase',
'PersonalCenterBind',
'PersonalCenterModify',
'PersonalSourceTaskTemplate',
'PersonalSourceTaskTemplateGenerate',
'PersonalSourceVideo',
'PersonalSourceVideoUpload',
'PersonalSourceTestQuestion',
'PersonalSourceTestQuestionUpload',
'PersonalSourcePaper',
'PersonalSourceFavoriteStudent',
'PersonalSourceFavoritePlatform',
'MessageIndex'];

let TEXT = ''
for (let i = 0; i < ar.length; i++) {
  TEXT += `
  const ${ar[i]}Page = {
    template: '<${ar[i]}/>',
    components: {
      '${ar[i]}': ${ar[i]}
    }
  }\n`
}
fs.writeFileSync('1.txt',TEXT,'utf-8')

// used for init page default vue-template
// const dir = fs.readdirSync('./src/pages')
// for (var i = 0; i < dir.length; i++) {
//   const temp_dir = fs.readdirSync('./src/pages/'+dir[i])
//   for (var j = 0; j < temp_dir.length; j++) {
//     console.log(temp_dir[j])
//     fs.writeFileSync('./src/pages/'+dir[i]+'/'+temp_dir[j],`
// <template>
//   <div class="container">
//     <h1>你好,${temp_dir[j]}</h1>
//   </div>
// </template>
//
// <script>
// export default {
//   name: '${temp_dir[j].split('.')[0]}',
//   data () {
//     return {
//
//     }
//   },
//   created () {
//   },
//   methods: {
//
//   }
// }
// </script>
//
// <style scoped>
//
// </style>
//       `,'utf-8')
//   }
// }
// console.log(dir)
