import VueRouter from 'vue-router'

// 各个预览页面需要后端渲染，无需添加路由

// 各页面组件
import About from './pages/About'
import Index from './pages/Index'

// 页面-班级任务
import ClassTaskIndex from './pages/ClassTask/ClassTaskIndex'
import ClassTaskPublish from './pages/ClassTask/ClassTaskPublish'
import TaskPublish from './pages/ClassTask/TaskPublish/TaskPublish'
import ClassTaskDetail from './pages/ClassTask/ClassTaskDetail'
import ClassTaskDetailTotal from './pages/ClassTask/ClassTaskDetailTotal'
import ClassTaskDetailVideo from './pages/ClassTask/ClassTaskDetailVideo'
import ClassTaskDetailPaper from './pages/ClassTask/ClassTaskDetailPaper'
import ClassTaskDetailPaperMore from './pages/ClassTask/ClassTaskDetailPaperMore'
import ClassTaskDetailFile from './pages/ClassTask/ClassTaskDetailFile'
import ClassTaskDetailWork from './pages/ClassTask/ClassTaskDetailWork'
import ClassTaskDetailWorkManage from './pages/ClassTask/ClassTaskDetailWorkManage'
import ClassTaskPreview from './pages/ClassTask/TaskPreview/TaskPreview.vue'

// 页面-资源库
import SourceRepo from './pages/SourceRepo/SourceRepo'
import SourceRepoWorkTemplate from './pages/SourceRepo/SourceRepoWorkTemplate'
import SourceRepoWorkTemplateDetail from './pages/SourceRepo/SourceRepoWorkTemplateDetail'
import SourceRepoVideo from './pages/SourceRepo/SourceRepoVideo'
import SourceRepoVideoDetail from './pages/SourceRepo/SourceRepoVideoDetail'
import SourceRepoTestQuestion from './pages/SourceRepo/SourceRepoTestQuestion'
import SourceRepoPaperGenerate from './pages/SourceRepo/SourceRepoPaperGenerate'
import SourceRepoPaper from './pages/SourceRepo/SourceRepoPaper'
import SourceRepoPaperDetail from './pages/SourceRepo/SourceRepoPaperDetail'
import SourceRepoCourseware from './pages/SourceRepo/SourceRepoCourseware'
import SourceRepoLessonPlan from './pages/SourceRepo/SourceRepoLessonPlan'
import SourceRepoOthers from './pages/SourceRepo/SourceRepoOthers'

// 页面-作品库
import WorkRepo from './pages/WorkRepo/WorkRepo'
import WorkRepoStudent from './pages/WorkRepo/WorkRepoStudent'
import WorkRepoPlatform from './pages/WorkRepo/WorkRepoPlatform'

// 页面-班级管理
import ClassManageIndex from './pages/ClassManage/ClassManageIndex'
import ClassManageStudent from './pages/ClassManage/ClassManageStudent'
import ClassManageStudentStastic from './pages/ClassManage/ClassManageStudentStastic'
import ClassManageGood from './pages/ClassManage/ClassManageGood'
import ClassManageStudentTask from './pages/ClassManage/ClassManageStudentTask'
import ClassManageStudentHistory from './pages/ClassManage/ClassManageStudentHistory'
import ClassManageStudentRateTest from './pages/ClassManage/ClassManageStudentRateTest'
import ClassManageStudentRateWork from './pages/ClassManage/ClassManageStudentRateWork'
import ClassManageStudentRateFinal from './pages/ClassManage/ClassManageStudentRateFinal'

// 页面-个人中心
import Personal from './pages/PersonalCenter/Personal'

import PersonalCenter from './pages/PersonalCenter/PersonalCenter'
import PersonalCenterBase from './pages/PersonalCenter/PersonalCenterBase'
import PersonalCenterBind from './pages/PersonalCenter/PersonalCenterBind'
import PersonalCenterModify from './pages/PersonalCenter/PersonalCenterModify'
import PersonalCenterStudent from './pages/PersonalCenter/PersonalCenterStudent'

// 页面-我的资源
import PersonalSource from './pages/PersonalSource/PersonalSource'
import PersonalSourceTaskTemplate from './pages/PersonalSource/PersonalSourceTaskTemplate'
import PersonalSourceTaskTemplateGenerate from './pages/PersonalSource/TaskTemple/TaskTemple'
import PersonalSourceVideo from './pages/PersonalSource/PersonalSourceVideo'
import PersonalSourceVideoUpload from './pages/PersonalSource/PersonalSourceVideoUpload'
import PersonalSourceVideoUploadAli from './pages/PersonalSource/PersonalSourceVideoUploadAli'
import PersonalSourceTestQuestion from './pages/PersonalSource/PersonalSourceTestQuestion'
import PersonalSourceTestQuestionUpload from './pages/PersonalSource/PersonalSourceTestQuestionUpload'
import PersonalSourceTestQuestionGenerate from './pages/PersonalSource/PersonalSourceTestQuestionGenerate'
import PersonalSourceTestQuestionPrevGenerate from './pages/PersonalSource/PersonalSourceTestQuestionPrevGenerate'
import PersonalSourcePaper from './pages/PersonalSource/PersonalSourcePaper'
import PersonalSourceFavoriteStudent from './pages/PersonalSource/PersonalSourceFavoriteStudent'
import PersonalSourceFavoritePlatform from './pages/PersonalSource/PersonalSourceFavoritePlatform'
import PersonalSourceCourseware from './pages/PersonalSource/PersonalSourceCourseware'
import PersonalSourceCoursewareUpload from './pages/PersonalSource/PersonalSourceCoursewareUpload'
import PersonalSourceLessonPlan from './pages/PersonalSource/PersonalSourceLessonPlan'
import PersonalSourceLessonPlanUpload from './pages/PersonalSource/PersonalSourceLessonPlanUpload'
import PersonalSourceMaterialOthers from './pages/PersonalSource/PersonalSourceMaterialOthers'
import PersonalSourceMaterialOthersUpload from './pages/PersonalSource/PersonalSourceMaterialOthersUpload'
import UpLoadMall from './pages/personalSource/UpLoadMall'

// 页面-我的收藏
import PersonalCollect from './pages/PersonalCollect/PersonalCollect'
import PersonalCollectTaskTemplate from './pages/PersonalCollect/PersonalCollectTaskTemplate'
import PersonalCollectTestQuestion from './pages/PersonalCollect/PersonalCollectTestQuestion'
import PersonalCollectPaper from './pages/PersonalCollect/PersonalCollectPaper'
import PersonalCollectVideo from './pages/PersonalCollect/PersonalCollectVideo'
import PersonalCollectWorkPlatform from './pages/PersonalCollect/PersonalCollectWorkPlatform'
import PersonalCollectWorkClass from './pages/PersonalCollect/PersonalCollectWorkClass'
import PersonalCollectCourseware from './pages/PersonalCollect/PersonalCollectCourseware'
import PersonalCollectLessonPlan from './pages/PersonalCollect/PersonalCollectLessonPlan'
import PersonalCollectMaterialOthers from './pages/PersonalCollect/PersonalCollectMaterialOthers'

// 页面-我的资源-修改-视频
import PersonalSourceEditVideo from './pages/PersonalSource/PersonalSourceEditVideo'
import PersonalSourceEditSource from './pages/PersonalSource/PersonalSourceEditSource'

// 页面-消息
import MessageIndex from './pages/Message/MessageIndex'


// 页面-视频阿里云
import VideoAli from './pages/VideoAli'

// 实例化页面
const IndexPage = {
  template: '<Index/>',
  components: {
    'Index': Index
  }
}

const AboutPage = {
  template: '<About/>',
  components: {
    'About': About
  }
}

const ClassTaskIndexPage = {
  template: '<ClassTaskIndex/>',
  components: {
    'ClassTaskIndex': ClassTaskIndex
  }
}

const ClassTaskPublishPage = {
  template: '<ClassTaskPublish/>',
  components: {
    'ClassTaskPublish': ClassTaskPublish
  }
}

const TaskPublishPage = {
  template: '<TaskPublish/>',
  components: {
    'TaskPublish': TaskPublish
  }
}

const ClassTaskDetailPage = {
  template: '<ClassTaskDetail/>',
  components: {
    'ClassTaskDetail': ClassTaskDetail
  }
}

const ClassTaskDetailTotalPage = {
  template: '<ClassTaskDetailTotal/>',
  components: {
    'ClassTaskDetailTotal': ClassTaskDetailTotal
  }
}

const ClassTaskDetailVideoPage = {
  template: '<ClassTaskDetailVideo/>',
  components: {
    'ClassTaskDetailVideo': ClassTaskDetailVideo
  }
}

const ClassTaskDetailPaperPage = {
  template: '<ClassTaskDetailPaper/>',
  components: {
    'ClassTaskDetailPaper': ClassTaskDetailPaper
  }
}

const ClassTaskDetailPaperMorePage = {
  template: '<ClassTaskDetailPaperMore/>',
  components: {
    'ClassTaskDetailPaperMore': ClassTaskDetailPaperMore
  }
}

const ClassTaskDetailFilePage = {
  template: '<ClassTaskDetailFile/>',
  components: {
    'ClassTaskDetailFile': ClassTaskDetailFile
  }
}

const ClassTaskDetailWorkPage = {
  template: '<ClassTaskDetailWork/>',
  components: {
    'ClassTaskDetailWork': ClassTaskDetailWork
  }
}

const ClassTaskDetailWorkManagePage = {
  template: '<ClassTaskDetailWorkManage/>',
  components: {
    'ClassTaskDetailWorkManage': ClassTaskDetailWorkManage
  }
}

const SourceRepoPage = {
  template: '<SourceRepo/>',
  components: {
    'SourceRepo': SourceRepo
  }
}

const SourceRepoWorkTemplatePage = {
  template: '<SourceRepoWorkTemplate/>',
  components: {
    'SourceRepoWorkTemplate': SourceRepoWorkTemplate
  }
}

const SourceRepoWorkTemplateDetailPage = {
  template: '<SourceRepoWorkTemplateDetail/>',
  components: {
    'SourceRepoWorkTemplateDetail': SourceRepoWorkTemplateDetail
  }
}

const SourceRepoVideoPage = {
  template: '<SourceRepoVideo/>',
  components: {
    'SourceRepoVideo': SourceRepoVideo
  }
}

const SourceRepoVideoDetailPage = {
  template: '<SourceRepoVideoDetail/>',
  components: {
    'SourceRepoVideoDetail': SourceRepoVideoDetail
  }
}

const SourceRepoTestQuestionPage = {
  template: '<SourceRepoTestQuestion/>',
  components: {
    'SourceRepoTestQuestion': SourceRepoTestQuestion
  }
}

const SourceRepoPaperGeneratePage = {
  template: '<SourceRepoPaperGenerate/>',
  components: {
    'SourceRepoPaperGenerate': SourceRepoPaperGenerate
  }
}

const SourceRepoPaperPage = {
  template: '<SourceRepoPaper/>',
  components: {
    'SourceRepoPaper': SourceRepoPaper
  }
}

const SourceRepoPaperDetailPage = {
  template: '<SourceRepoPaperDetail/>',
  components: {
    'SourceRepoPaperDetail': SourceRepoPaperDetail
  }
}

const SourceRepoCoursewarePage = {
  template: '<SourceRepoCourseware/>',
  components: {
    'SourceRepoCourseware': SourceRepoCourseware
  }
}

const SourceRepoLessonPlanPage = {
  template: '<SourceRepoLessonPlan/>',
  components: {
    'SourceRepoLessonPlan': SourceRepoLessonPlan
  }
}

const SourceRepoOthersPage = {
  template: '<SourceRepoOthers/>',
  components: {
    'SourceRepoOthers': SourceRepoOthers
  }
}
const WorkRepoPage = {
  template: '<WorkRepo/>',
  components: {
    'WorkRepo': WorkRepo
  }
}

const WorkRepoStudentPage = {
  template: '<WorkRepoStudent/>',
  components: {
    'WorkRepoStudent': WorkRepoStudent
  }
}

const WorkRepoPlatformPage = {
  template: '<WorkRepoPlatform/>',
  components: {
    'WorkRepoPlatform': WorkRepoPlatform
  }
}

const ClassManageIndexPage = {
  template: '<ClassManageIndex/>',
  components: {
    'ClassManageIndex': ClassManageIndex
  }
}

const ClassManageStudentPage = {
  template: '<ClassManageStudent/>',
  components: {
    'ClassManageStudent': ClassManageStudent
  }
}

const ClassManageStudentStasticPage = {
  template: '<ClassManageStudentStastic/>',
  components: {
    'ClassManageStudentStastic': ClassManageStudentStastic
  }
}

const ClassManageStudentTaskPage = {
  template: '<ClassManageStudentTask/>',
  components: {
    'ClassManageStudentTask': ClassManageStudentTask
  }
}

const ClassManageStudentHistoryPage = {
  template: '<ClassManageStudentHistory/>',
  components: {
    'ClassManageStudentHistory': ClassManageStudentHistory
  }
}

const ClassManageStudentRateTestPage = {
  template: '<ClassManageStudentRateTest/>',
  components: {
    'ClassManageStudentRateTest': ClassManageStudentRateTest
  }
}

const ClassManageStudentRateWorkPage = {
  template: '<ClassManageStudentRateWork/>',
  components: {
    'ClassManageStudentRateWork': ClassManageStudentRateWork
  }
}

const ClassManageStudentRateFinalPage = {
  template: '<ClassManageStudentRateFinal/>',
  components: {
    'ClassManageStudentRateFinal': ClassManageStudentRateFinal
  }
}

const ClassManageGoodPage = {
  template: '<ClassManageGood/>',
  components: {
    'ClassManageGood': ClassManageGood
  }
}

const PersonalCenterPage = {
  template: '<PersonalCenter/>',
  components: {
    'PersonalCenter': PersonalCenter
  }
}

const PersonalCenterBasePage = {
  template: '<PersonalCenterBase/>',
  components: {
    'PersonalCenterBase': PersonalCenterBase
  }
}

const PersonalCenterBindPage = {
  template: '<PersonalCenterBind/>',
  components: {
    'PersonalCenterBind': PersonalCenterBind
  }
}

const PersonalCenterModifyPage = {
  template: '<PersonalCenterModify/>',
  components: {
    'PersonalCenterModify': PersonalCenterModify
  }
}

const PersonalSourcePage = {
  template: '<PersonalSource/>',
  components: {
    'PersonalSource': PersonalSource
  }
}

const PersonalSourceTaskTemplatePage = {
  template: '<PersonalSourceTaskTemplate/>',
  components: {
    'PersonalSourceTaskTemplate': PersonalSourceTaskTemplate
  }
}

const PersonalSourceTaskTemplateGeneratePage = {
  template: '<PersonalSourceTaskTemplateGenerate/>',
  components: {
    'PersonalSourceTaskTemplateGenerate': PersonalSourceTaskTemplateGenerate
  }
}

const PersonalSourceVideoPage = {
  template: '<PersonalSourceVideo/>',
  components: {
    'PersonalSourceVideo': PersonalSourceVideo
  }
}

const PersonalSourceVideoUploadPage = {
  template: '<PersonalSourceVideoUpload/>',
  components: {
    'PersonalSourceVideoUpload': PersonalSourceVideoUpload
  }
}

const PersonalSourceTestQuestionPage = {
  template: '<PersonalSourceTestQuestion/>',
  components: {
    'PersonalSourceTestQuestion': PersonalSourceTestQuestion
  }
}

const PersonalSourceTestQuestionUploadPage = {
  template: '<PersonalSourceTestQuestionUpload/>',
  components: {
    'PersonalSourceTestQuestionUpload': PersonalSourceTestQuestionUpload
  }
}

const PersonalSourceTestQuestionGeneratePage = {
  template: '<PersonalSourceTestQuestionGenerate/>',
  components: {
    'PersonalSourceTestQuestionGenerate': PersonalSourceTestQuestionGenerate
  }
}

const PersonalSourceTestQuestionPrevGeneratePage = {
  template: '<PersonalSourceTestQuestionPrevGenerate/>',
  components: {
    'PersonalSourceTestQuestionPrevGenerate': PersonalSourceTestQuestionPrevGenerate
  }
}

const PersonalSourcePaperPage = {
  template: '<PersonalSourcePaper/>',
  components: {
    'PersonalSourcePaper': PersonalSourcePaper
  }
}

const PersonalSourceFavoriteStudentPage = {
  template: '<PersonalSourceFavoriteStudent/>',
  components: {
    'PersonalSourceFavoriteStudent': PersonalSourceFavoriteStudent
  }
}

const PersonalSourceFavoritePlatformPage = {
  template: '<PersonalSourceFavoritePlatform/>',
  components: {
    'PersonalSourceFavoritePlatform': PersonalSourceFavoritePlatform
  }
}

const PersonalSourceCoursewarePage = {
  template: '<PersonalSourceCourseware/>',
  components: {
    'PersonalSourceCourseware': PersonalSourceCourseware
  }
}

const PersonalSourceCoursewareUploadPage = {
  template: '<PersonalSourceCoursewareUpload/>',
  components: {
    'PersonalSourceCoursewareUpload': PersonalSourceCoursewareUpload
  }
}

const PersonalSourceLessonPlanPage = {
  template: '<PersonalSourceLessonPlan/>',
  components: {
    'PersonalSourceLessonPlan': PersonalSourceLessonPlan
  }
}

const PersonalSourceLessonPlanUploadPage = {
  template: '<PersonalSourceLessonPlanUpload/>',
  components: {
    'PersonalSourceLessonPlanUpload': PersonalSourceLessonPlanUpload
  }
}

const PersonalSourceMaterialOthersPage = {
  template: '<PersonalSourceMaterialOthers/>',
  components: {
    'PersonalSourceMaterialOthers': PersonalSourceMaterialOthers
  }
}

const PersonalSourceMaterialOthersUploadPage = {
  template: '<PersonalSourceMaterialOthersUpload/>',
  components: {
    'PersonalSourceMaterialOthersUpload': PersonalSourceMaterialOthersUpload
  }
}

const PersonalCollectPage = {
  template: '<PersonalCollect/>',
  components: {
    'PersonalCollect': PersonalCollect
  }
}

const PersonalCollectTaskTemplatePage = {
  template: '<PersonalCollectTaskTemplate/>',
  components: {
    'PersonalCollectTaskTemplate': PersonalCollectTaskTemplate
  }
}

const PersonalCollectTestQuestionPage = {
  template: '<PersonalCollectTestQuestion/>',
  components: {
    'PersonalCollectTestQuestion': PersonalCollectTestQuestion
  }
}

const PersonalCollectPaperPage = {
  template: '<PersonalCollectPaper/>',
  components: {
    'PersonalCollectPaper': PersonalCollectPaper
  }
}

const PersonalCollectWorkClassPage = {
  template: '<PersonalCollectWorkClass/>',
  components: {
    'PersonalCollectWorkClass': PersonalCollectWorkClass
  }
}

const PersonalCollectWorkPlatformPage = {
  template: '<PersonalCollectWorkPlatform/>',
  components: {
    'PersonalCollectWorkPlatform': PersonalCollectWorkPlatform
  }
}

const PersonalCollectVideoPage = {
  template: '<PersonalCollectVideo/>',
  components: {
    'PersonalCollectVideo': PersonalCollectVideo
  }
}

const PersonalCollectCoursewarePage = {
  template: '<PersonalCollectCourseware/>',
  components: {
    'PersonalCollectCourseware': PersonalCollectCourseware
  }
}

const PersonalCollectLessonPlanPage = {
  template: '<PersonalCollectLessonPlan/>',
  components: {
    'PersonalCollectLessonPlan': PersonalCollectLessonPlan
  }
}

const PersonalCollectMaterialOthersPage = {
  template: '<PersonalCollectMaterialOthers/>',
  components: {
    'PersonalCollectMaterialOthers': PersonalCollectMaterialOthers
  }
}

const MessageIndexPage = {
  template: '<MessageIndex/>',
  components: {
    'MessageIndex': MessageIndex
  }
}

const UpLoadMallPage = {
  template: '<UpLoadMall/>',
  components:{
    'UpLoadMall':UpLoadMall
  }
}

const ClassTaskPreviewPage = {
  template: '<ClassTaskPreview/>',
  components:{
    'ClassTaskPreview':ClassTaskPreview
  }
}



const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: IndexPage },
  { path: '/about', component: AboutPage },
  // 班级任务
  { path: '/classTask/index', component: ClassTaskIndexPage },
  { path: '/classTask/index', component: ClassTaskIndexPage },
  { path: '/classTask/preview', component: ClassTaskPreviewPage },
  { path: '/task/publish', component: TaskPublishPage },
  { path: '/classTask/detail', component: ClassTaskDetailPage },
  { path: '/classTask/detail/total', component: ClassTaskDetailTotalPage },
  { path: '/classTask/detail/video', component: ClassTaskDetailVideoPage },
  { path: '/classTask/detail/paper', component: ClassTaskDetailPaperPage },
  { path: '/classTask/detail/paperMore', component: ClassTaskDetailPaperMorePage },
  { path: '/classTask/detail/file', component: ClassTaskDetailFilePage },
  { path: '/classTask/detail/work', component: ClassTaskDetailWorkPage },
  { path: '/classTask/detail/workManage', component: ClassTaskDetailWorkManagePage },
  //资源库
  { path: '/sourceRepo/', component: SourceRepoPage, children: [
        { path: 'workTemplate',component: SourceRepoWorkTemplatePage},
        { path: 'video', component: SourceRepoVideoPage },
        { path: 'testQuestion', component: SourceRepoTestQuestionPage },
        { path: 'paper/paperGenerate', component: SourceRepoPaperGeneratePage },
        { path: 'paper', component: SourceRepoPaperPage },
        { path: 'paper/detail', component: SourceRepoPaperDetailPage },
        { path: 'courseware', component: SourceRepoCoursewarePage },
        { path: 'lessonPlan', component: SourceRepoLessonPlanPage },
        { path: 'others', component: SourceRepoOthersPage }
    ]
  },
  { path: '/sourceRepo/video/detail', component: ClassTaskDetailVideoPage },
  { path: '/sourceRepo/workTemplate/detail',component: SourceRepoWorkTemplateDetailPage},

  //作品库
  { path: '/workRepo', component: WorkRepoPage, children: [
      { path: 'student', component: WorkRepoStudentPage },
      { path: 'platform', component: WorkRepoPlatformPage },
    ]
  },
  //班级管理
  { path: '/classManage/index', component: ClassManageIndexPage },
  { path: '/classManage/student', component: ClassManageStudentPage, children: [
      { path: 'task', component: ClassManageStudentTaskPage },
      { path: 'history', component: ClassManageStudentHistoryPage },
      { path: 'rateTest', component: ClassManageStudentRateTestPage },
      { path: 'rateWork', component: ClassManageStudentRateWorkPage },
      { path: 'rateFinal', component: ClassManageStudentRateFinalPage },
    ]
  },
  { path: '/classManage/student/stastic', component: ClassManageStudentStasticPage },
  { path: '/classManage/good', component: ClassManageGoodPage },
  //个人中心
  { path: '/personal', component: Personal, children: [
    { path: '/personalCenter', component: PersonalCenterPage, children: [
        { path: 'base', component: PersonalCenterBasePage },
        { path: 'bind', component: PersonalCenterBindPage },
        { path: 'modify', component: PersonalCenterModifyPage },
        { path: 'student', component: PersonalCenterStudent },
      ]
    },
    //我的资源
    { path: '/personalSource', component: PersonalSourcePage, children: [
        { path: 'my/taskTemplate', component: PersonalSourceTaskTemplatePage },
        { path: 'my/video', component: PersonalSourceVideoPage },
        { path: 'my/testQuestion', component: PersonalSourceTestQuestionPage },
        { path: 'my/paper', component: PersonalSourcePaperPage },
        { path: 'my/courseware', component: PersonalSourceCoursewarePage },
        { path: 'my/lessonPlan', component: PersonalSourceLessonPlanPage },
        { path: 'my/materialOthers', component: PersonalSourceMaterialOthersPage },
        { path: 'collect/taskTemplate', component: PersonalCollectTaskTemplatePage },
        { path: 'collect/video', component: PersonalCollectVideoPage },
        { path: 'collect/testQuestion', component: PersonalCollectTestQuestionPage },
        { path: 'collect/paper', component: PersonalCollectPaperPage },
        { path: 'collect/workStudent', component: PersonalCollectWorkClassPage },
        { path: 'collect/workPlatform', component: PersonalCollectWorkPlatformPage },
        { path: 'collect/courseware', component: PersonalCollectCoursewarePage },
        { path: 'collect/lessonPlan', component: PersonalCollectLessonPlanPage },
        { path: 'collect/materialOthers', component: PersonalCollectMaterialOthersPage },
        { path: 'buy/taskTemplate', component: PersonalCollectTaskTemplatePage },
        { path: 'buy/video', component: PersonalCollectVideoPage },
        { path: 'buy/testQuestion', component: PersonalCollectTestQuestionPage },
        { path: 'buy/paper', component: PersonalCollectPaperPage },
        { path: 'all/taskTemplate', component: PersonalCollectTaskTemplatePage },
        { path: 'all/video', component: PersonalCollectVideoPage },
        { path: 'all/testQuestion', component: PersonalCollectTestQuestionPage },
        { path: 'all/paper', component: PersonalCollectPaperPage },
      ]
    },
  ] },
  { path: '/personalSourceDetail/paper', component: ClassTaskDetailPaperPage},
  { path: '/personalSourceDetail/video', component: ClassTaskDetailVideoPage},
  { path: '/personalSourceDetail/taskTemplate', component: SourceRepoWorkTemplateDetailPage},

  { path: '/personalSourceEdit/video', component: PersonalSourceEditVideo },
  { path: '/personalSourceEdit/source', component: PersonalSourceEditSource },
  
  { path: '/personalSource/uploadMall', component: UpLoadMall},
  { path: '/personalSource/taskTemplate/generate', component: PersonalSourceTaskTemplateGeneratePage },
  { path: '/personalSource/video/upload', component: PersonalSourceVideoUploadPage },
  { path: '/personalSource/video/uploadAli', component: PersonalSourceVideoUploadAli },
  { path: '/personalSource/testQuestion/upload', component: PersonalSourceTestQuestionUploadPage },
  { path: '/personalSource/courseware/upload', component: PersonalSourceCoursewareUploadPage },
  { path: '/personalSource/lessonPlan/upload', component: PersonalSourceLessonPlanUploadPage },
  { path: '/personalSource/materialOthers/upload', component: PersonalSourceMaterialOthersUploadPage },
  { path: '/personalSource/testQuestion/prevGenerate', component: PersonalSourceTestQuestionPrevGeneratePage },
  { path: '/personalSource/testQuestion/generate', component: PersonalSourceTestQuestionGeneratePage },
  // 收藏
  { path: '/personalCollect', component: PersonalCollectPage, children: [
      { path: 'taskTemplate', component: PersonalCollectTaskTemplatePage },
      { path: 'testQuestion', component: PersonalCollectTestQuestionPage },
      { path: 'paper', component: PersonalCollectPaperPage },
      { path: 'video', component: PersonalCollectVideoPage },
      { path: 'workPlatform', component: PersonalCollectWorkPlatformPage },
      { path: 'workClass', component: PersonalCollectWorkClassPage },
    ]
  },
  //消息
  { path: '/message/index', component: MessageIndexPage },

  // 视频测试
  { path: '/yun/video', component: VideoAli },

]

export {
  routes

}
