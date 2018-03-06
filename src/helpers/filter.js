import Vue from 'vue'

Vue.filter('word-format', function (value) {
  const WORD_LIST = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  return WORD_LIST[+value]
})

Vue.filter('nav-format', function (route) {
  if (route.query.title) {
    return route.query.title
  }
  const NAV_LIST = {
    '/about':'',
    '/classTask/index':'',
    '/task/publish':'发布任务',
    '/classTask/detail':'任务详情',
    '/classTask/detail/total':'任务整体情况',
    '/classTask/detail/video':'视频详情',
    '/classTask/detail/paper':'试卷详情',
    '/classTask/detail/paperMore':'查看试卷统计',
    '/classTask/detail/file':'管理作品',
    '/classTask/detail/work':'查看作品',
    '/classTask/detail/workManage':'',
    '/sourceRepo/':'',
    '/sourceRepo/video/detail':'视频详情',
    '/sourceRepo/workTemplate/detail':'任务模板详情',
    '/workRepo':'',
    '/classManage/index':'',
    '/classManage/student':'',
    '/classManage/student/task':'学生详情',
    '/classManage/student/rateTest':'学生详情',
    '/classManage/student/rateWork':'学生详情',
    '/classManage/student/rateFinal':'学生详情',
    '/personalSourceDetail/video':'视频详情',
    '/classManage/student/history':'学生详情',
    '/classManage/student/stastic':'试卷统计',
    '/classManage/good':'优秀学生管理',
    '/personalCenter/base':'个人中心',
    '/personalCenter/modify':'个人中心',
    '/personalCenter/student':'学生链接',
    '/personalSource':'',
    '/personalSource/my/taskTemplate':'我的资源',
    '/personalSource/buy/taskTemplate':'我的资源',
    '/personalSource/collect/taskTemplate': '我的资源',
    '/personalSource/my/video':'我的资源',
    '/personalSource/collect/video':'我的资源',
    '/personalSource/buy/video':'我的资源',
    '/personalSource/my/testQuestion':'我的资源',
    '/personalSource/collect/testQuestion':'我的资源',
    '/personalSourceDetail/taskTemplate':'任务模板详情',
    '/personalSourceDetail/paper':'试卷详情',

    '/personalSource/collect/workStudent':'我的资源',
    '/personalSource/collect/workPlatform':'我的资源',
    '/personalSource/my/courseware':'我的资源',
    '/personalSource/collect/courseware':'我的资源',
    '/personalSource/my/lessonPlan':'我的资源',
    '/personalSource/collect/lessonPlan':'我的资源',
    '/personalSource/my/materialOthers':'我的资源',
    '/personalSource/collect/materialOthers':'我的资源',
    '/personalSource/courseware/upload': '上传课件',
    '/personalSource/lessonPlan/upload':'上传教案',
    '/personalSource/materialOthers/upload':'上传素材',
    '/personalSource/video/upload': '上传视频',
    '/personalSource/video/uploadAli': '上传视频',
    
    '/personalSource/video':'我的资源',
    '/personalSource/my/paper':'我的资源',
    '/personalSource/collect/paper':'我的资源',
    '/personalSource/testQuestion':'我的资源',
    '/personalSource/taskTemplate/generate':'组装任务模板',
    '/personalSource/testQuestion/upload':'上传试题',
    '/personalSource/testQuestion/prevGenerate':'立即组卷',
    '/personalSource/testQuestion/generate':'预览试卷',
    '/personalCollect/taskTemplate':'我的收藏',
    '/personalCollect/video':'我的收藏',
    '/personalCollect/testQuestion':'我的收藏',
    '/personalCollect/paper':'我的收藏',
    '/personalCollect/workClass':'我的收藏',
    '/personalCollect/workPlatform':'我的收藏',
    '/message/index':'消息',

    '/personalSourceEdit/video': '视频信息修改',
    '/personalSourceEdit/source': '资源信息修改',
  }
  return NAV_LIST[route.path]
})

export default Vue
