const VERSION = '2.0.0'
const HEAD = '/bc'
const ADDRESS = {
  LOGIN_ADDR: HEAD + '/login/login',
  //LOGOUT_ADDR: HEAD + '/u/user/logoutAjax',

  // 注销跳转

  USER_LOG_OUT : HEAD + '/u/user/logout',

  USERINFO_ADDR: HEAD + '/u/user/getMe',
  USER_BIND_ADDR: HEAD + '/u/user/getUserBind',
  // 修改个人信息
  USERINFO_UPDATE_ADDR: HEAD + '/u/user/updateUserInfo',
  USERINFO_PASS_UPDATE_ADDR: HEAD + '/u/user/updatePassword',
  USERINFO_PASS_CHECK_ADDR: HEAD + '/u/user/verifyPassword',
  //上传头像
  UP_LOAD_HEAD_IMG_URL : HEAD + '/u/user/uploadHeadimg',
  // 任务相关
  // 发布的任务列表
  TASK_LIST_PUBLISH_ADDR: HEAD +　'/l/ttask/getMyReleaseTask',
  GET_VIDEO_BY_CONDITION: HEAD + '/r/video/getVideoByCondition',
  GET_PAPER_TASK_COR_RATE:HEAD + '/l/studenttaskpaper/getTaskQuestionCorrectRate',
  // 任务完成情况
  TASK_LIST_FINISHSTAT_ADDR: HEAD + '/l/ttask/getTaskFinishByClass',
  // 任务详情
  TASK_LIST_ITEM_DETAIL_ADDR: HEAD + '/l/ttask/getTaskContent',
  TASK_GET_RUGBY_CLASS_PAPER: HEAD + '/l/stat/getTaskRugbyByClassId',
  // 学生任务完成情况
  TASK_LIST_STUDENT_STATUS_ADDR: HEAD+ '/l/stat/t/getStudentsTaskFinished',
  //学生任务得分情况
  TASK_GET_STUDENT_SCORE_ADDR: HEAD+'/l/stat/t/getStudentsTaskScore',
  //任务完成详情
  TASK_LIST_CONTENT_ADDR:HEAD +'/l/stat/getStudentTaskContentFinished',
  //手动结算任务
  TASK_LIST_END_ADDR: HEAD +'/l/ttask/endTask',

  // 修改学生任务评分
  TASK_LIST_STUDENT_SCORE_ADDR: HEAD + '/l/ttask/updateStudentScore',
  //查询班级相关任务统计
  TASK_PAPER_BY_CLASSID : HEAD +'/l/studenttaskpaper/getAllClassByTaskId',

  GET_WORK_FINISH_CLASS : HEAD + '/l/taskworks/getWorksFinishByClass',

  SEARCH_CLASS_ABOUT_TASKS:HEAD + '/l/studenttaskpaper/getClassStudentTaskPaperStatistics',
  // 资源库相关
  SOURCEREPO_TEMP_LIST_ADDR: HEAD + '/r/stemp/getTempList',
  SOURCEREPO_PAPER_ADDR: HEAD + '/r/paperinfo/getPapersByMultiParams',
  SOURCEREPO_QUESTIONBANK_ADDR: HEAD + '/r/questionbank/getQuestionsByMultipleParams',
  SOURCEREPO_VIDEO_ADDR: HEAD + '/r/video/getOpenVideos',
  SOURCEREPO_TASKTEMPLATE_ADDR: HEAD + '/r/ttemp/getTempList',

  // 任务模板
  SOURCEREPO_TASKTEMPLATE_DETAIL_ADDR: HEAD + '/r/ttemp/getTempDetail',
  // 收藏模板
  SOURCEREPO_TASKTEMPLATE_FAV_ADDR: HEAD + '/r/ttemp/favoriteTaskTemp',

  // 收藏试卷
  SOURCEREPO_FLIST_PAPER_FAVORITE_ADDR: HEAD + '/r/paperfavorite/getFavoritePapers',
  SOURCEREPO_PAPER_FAVORITE_ADDR: HEAD + '/r/paperfavorite/favoritePaper',
  SOURCEREPO_PAPER_UNFAVORITE_ADDR: HEAD + '/r/paperfavorite/unfavoritePaper',

  //收藏试题

  SOURCEREPO_FLIST_PQUESTIONBANK_FAVORITE_ADDR: HEAD + '/r/questionfavorite/getFavoriteQuestions',
  SOURCEREPO_QUESTIONBANK_FAVORITE_ADDR: HEAD + '/r/questionfavorite/favoriteQuestion',
  SOURCEREPO_QUESTIONBANK_UNFAVORITE_ADDR: HEAD + '/r/questionfavorite/unfavoriteQuestion',

  //收藏视频

  SOURCEREPO_FLIST_VIDEO_FAVORITE_ADDR: HEAD + '/r/video/getFavoriteVideo',
  SOURCEREPO_VIDEO_FAVORITE_ADDR: HEAD + '/r/video/favoriteVideo',
  SOURCEREPO_VIDEO_UNFAVORITE_ADDR: HEAD + '/r/video/unfavoriteVideo',

  // 收藏班级作品
  SOURCEREPO_WORK_CLASS_FAVORITE_ADDR: HEAD + '/r/studentTaskWorksFavorite/setFavoriteStudentWork',
  // 收藏平台作品
  SOURCEREPO_WORK_PLATFORM_FAVORITE_ADDR: HEAD + '/r/excellentWorksFavorite/setFavoriteExcellentWork',

  // 老师查看我的视频列表
  SOURCEREPO_MLIST_VIDEO_ADDR: HEAD + '/r/video/getListByCreatorId',

  // 老师查看我的素材列表
  SOURCEREPO_MATERIAL_ADDR: HEAD + '/r/tamc/getMaterialsByConditions',
  //预览素材附件
  SOURCEREPO_PREVIEW_MATERIAL: HEAD+'/r/tamc/previewAttachment',
  PREVIEW_MATERIAL: HEAD+'/r/samc/previewAttachment',


  //收藏的素材列表
  SOURCEREPO_MATERIAL_FAVOR_ADDR: HEAD +'/r/amfc/getFavoriteAttachmentMaterial',

  //上传素材
  UP_LOAD_MATERIAL: HEAD +'/r/tamc/uploadAttachment',
  UP_LOAD_MATERIAL_INFO: HEAD +'/r/tamc/addMaterialInfo',

  // 赞踩视频
  SOURCEREPO_VIDEO_VOTE_ADDR: HEAD + '/r/video/updateEvaluate',

  // 详情
  // 试卷详情
  DETAIL_PAPER: HEAD + '/r/paperinfo/getPaperInfoById',
  DETAIL_PAPER_CONTENT: HEAD + '/r/paperquestion/getPaperQuestionsByPaperId',
  // 视频详情
  DETAIL_VIDEO: HEAD + '/r/video/getByVideoId',

  //上传视频

  UP_LOAD_VIDO: HEAD + '/r/video/upload',
  UP_LOAD_IMG: HEAD + '/r/video/uploadImg',
  UP_LOAD_VIDEO_STEP_1: HEAD +'/r/video/addBasicInfo',
  UP_LOAD_VIDEO_KNOWLEGR: HEAD +'/r/video/addKnowledge',
  UP_LOAD_VIDEO_COMPLETE: HEAD + '/r/video/videoComplete',
  CHANGE_KNOWLEGE_CONENT: HEAD + '/r/video/updateKnowledge',
  DELETE_KOWLEGE_CONTENT: HEAD + '/r/video/removeKnowledge',

  //组卷

  LEAF_KNOWLEGE_TRUE: HEAD + '/r/questionbank/getQuestionsByMultipleParams',
  LEAF_KNOWLEGE_FALSE: HEAD + '/r/questionbank/getQuestionsByParams',
  FAVORITE_QUESTION: HEAD + '/r/questionfavorite/favoriteQuestion',
  UNFAVORITE_QUESTION: HEAD + '/r/questionfavorite/unfavoriteQuestion',
  ADD_QUESTION_TO_PAPER: HEAD + '/r/paperquestion/addQuestionToPaper',
  DEL_QUESTION_TO_PAPER: HEAD + '/r/paperquestion/deleteQuestionFromPaper',
  GET_ALL_UNFINISHED_PAPER: HEAD + '/r/paperinfo/getUnfinishedPaper',
  CLEAR_CURRENT_PAPER: HEAD + '/r/paperinfo/clearCurrentPaper',
  DELETE_QUESTION_BY_TYPE:HEAD +'/r/paperinfo/deletePaperQuestionByType',
  GET_VIDEO_ALL_LIST : HEAD + '/r/video/getOpenVideos',
  GET_PAPER_ALL_LISTS: HEAD + '/r/paperinfo/getPapersByMultiParams',
  GET_MATER_ALL_LISTS: HEAD + '/r/tamc/getMaterialsByConditions',
  SAVR_PAPER_INTO_MYSQL : HEAD +'/r/paperinfo/finishPaper',
  // 老师上传试题
  TEACHER_UPLOAD_TESTQUESTION: HEAD + '/r/questionbank/uploadChoiceQuestion',
  //上传word操作题
  UPLOAD_WORD_DOC: HEAD + '/r/word/doc/upload',
  UPLOAD_WORD_JPG: HEAD + '/r/word/jpgUpload', 
  //下载word操作题相关文件
  DOWNLOAD_QUESTION_DOC: HEAD + '/r/word/downloadQuestionDoc',
  //提交word操作题基础信息
  WORD_QUESTION_COMMIT: HEAD + '/r/word/questionCommit',
  //编辑保存修改点
  WORD_SAVE_ACTION: HEAD + '/r/word/saveAction',
  WORD_QUESTION_PREVIEW: HEAD+ '/r/word/questionView',
  // 班级相关
  // 老师获取班级列表
  // CLASS_TEACHER_LIST_ADDR: HEAD + '/u/class/getClassesByTeacherId',
  CLASS_TEACHER_LIST_ADDR: HEAD + '/u/class/getClassListByTeacherId',
  CLASS_TEACHER_LIST_TREE: HEAD + '/u/class/getClassTreeByTeacherId',

  // 老师获取班级树形列表
  CLASS_CASCADER_LIST_ADDR: HEAD + '/u/class/getClassesTreeByTeacherId',

  // 老师获取学生列表
  CLASS_TEACHER_STUDENT_LIST_ADDR: HEAD + '/l/stat/getStudentStatistics',

  // 老师获取学生任务完成历史记录
  CLASS_TEACHER_STUDENT_TASK_HISTORY_ADDR: HEAD + '/l/stat/getStudentTaskHistoryPage',

  // 老师获取学生任务完成总体情况
  CLASS_TEACHER_STUDENT_TASK_GENERAL_ADDR: HEAD + '/l/stat/getStudentSemesterStat',

  // 老师为班级学生分配积分
  CLASS_TEACHER_ASSIGN_POINT_ADDR: HEAD + '/p/log/assignPoint',

  // 老师获取班级积分
  CLASS_TEACHER_POINT_TOTAL_ADDR: HEAD + '/l/excellent/getClassPoint',

  // 优秀学生列表
  CLASS_TEACHER_EXCELLENT_STUDENT_ADDR: HEAD + '/l/monthrank/getTaskExcellentStudentByClassId',
  // 优秀学生排名列表
  CLASS_TEACHER_EXCELLENT_LIST_STUDENT_ADDR: HEAD + '/l/monthrank/getAllStudentRanks',
  // 优秀学生替换
  CLASS_TEACHER_EXCELLENT_TOGGLE_STUDENT_ADDR: HEAD + '/l/excellent/updateExcellentStudent',

  // 优秀学生新接口
  CLASS_TEACHER_EXCELLENT_STUDENT_NEW_ADDR: HEAD + '/l/monthrank/getPacesetterByClass',
  // 优秀学生排名列表新接口
  CLASS_TEACHER_EXCELLENT_LIST_STUDENT_NEW_ADDR: HEAD + '/l/monthrank/getRankListByExcellentId',
  // 优秀学生替换新接口
  CLASS_TEACHER_EXCELLENT_TOGGLE_STUDENT_NEW_ADDR: HEAD + '/l/monthrank/replaceExcellentStudent',

  // 作品相关
  // 作品预览

  //WORKS_OF_STUDENT_PREVIEW : HEAD + '/l/studenttaskworks/studentPreviewWorks',
  WORKS_OF_STUDENT_PREVIEW : HEAD + '/l/studenttaskworks/studentWork' ,
  WORKS_OF_EXCELLENT_WORDK : HEAD + '/l/studenttaskworks/excellentWork',

  // 附件预览
  PREVIEW_ATTACHMENT_ALL: HEAD +'/l/attach/previewAttachment',
  PREVIEW_ATTACHMENT: HEAD +'/r/ttemp/previewAttachment',
  // 班级作品列表
  WORK_LIST_CLASS: HEAD + '/l/taskworks/getClassStudentWorks',
  WORK_FAV_LIST_CLASS_ADDR: HEAD + '/r/studentTaskWorksFavorite/getStudentFavoriteWorksList',

  // 作品要求
  WORK_TASK_REQUIREMENT_ADDR: HEAD +　'/l/taskworks/getTaskWorkRequirement',

  // 平台优秀作品列表
  WORK_LIST_PLATFORM_GOOD: HEAD + '/e/excellentWorks/getExcellentWorks',
  WORK_FAV_LIST_PLATFORM_ADDR: HEAD + '/r/excellentWorksFavorite/getExcellentFavoriteWorks',

  // 设置或取消班级优秀
  WORK_TOGGLE_GOOD_CLASS_ADDR: HEAD + '/l/taskworks/setClassExcellent',
  // 推荐到平台优秀
  WORK_TOGGLE_GOOD_PLATFORM_ADDR: HEAD + '/e/excelletWorksVerify/recommendExcellentWork',
  // 推荐到学校优秀
  WORK_TOGGLE_GOOD_SCHOOL_ADDR: HEAD + '/l/ewsvc/recommendExcellentWorkSchool',
  //发布任务

  PUBLISH_TASKES: HEAD + '/l/ttask/releaseTaskNew',
  SEARCH_ACTIONS_NAME : HEAD + '/r/category/getListByName',
  SEARCH_BEFORE_TASK : HEAD + '/l/ttask/getBeforeTaskList',
  
  //资源库查询查询素材
  MATERIALS_BY_CONDITIONS: HEAD + '/r/samc/getMaterialsByConditions',

  // 发布模板

  PUBLISH_TEMP_SAVE: HEAD + '/r/ttemp/save',
  SEARCH_TEMP_FORM_SQL: HEAD +'/r/ttemp/getTempList',
  ADD_UPLOAD_TEMP_ID :HEAD + '/l/ttask/uploadAttachment',
  Add_UPLOAD_ATTACHMENT:HEAD+'/r/ttemp/uploadAttachment',

  //历史答题  错题  知识点  推荐
  PERSON_TASK_PAPER_STATIC_CONT : HEAD + '/l/studenttaskpaper/getPersonalTaskPaperStastics',
  STUDENT_HISTORY_PAPER_AND_TASK: HEAD + '/l/studentTask/getStudentTestHistory',
  STUDENT_HISTORY_WRONG_AND_PAGE: HEAD + '/l/wrongtopicset/getWrongQuestionStatistics',
  STUDENT_HISTORY_KNOW_LEGE_PAHG: HEAD + '/l/studentTask/getStudentTaskPaperWrongKnowledgeStatistics',
  STUDENT_PUSH_QUESTIONS_LIST   : HEAD + '/l/studentTask/getRecommendQuestions',

  // 活动和知识点树
  ACTIVITY_KNOWLEDGE_TREE_ADDR: HEAD + '/r/category/getTreeZeroAndNonZero',

  //消息列表
  GET_ALL_LIST_ABOUT_MESSAGE : HEAD + '/u/systemmessage/getMessageList',
  GET_WRONG_QUESTION_STUDENT : HEAD + '/l/studenttaskpaper/getTaskQuestionErrorUsers',

  // 统计表相关
  // 测试平均正确率
  RATE_TEST_AVG_ADDR: HEAD + '/l/stat/getRightRateRank',
  // 作品得分趋势
  RATE_WORK_ADDR: HEAD + '/l/stat/getWorkScoreRank',
  // 任务最重得分趋势
  RATE_FINAL_ADDR: HEAD + '/l/stat/getTaskScoreRank',
  // 消息已读
  MESSAGE_ITEM_READ_ADDR: HEAD + '/u/systemmessage/getMessageById',

  // 资源覆盖查询
  // 试题
  RESOURCE_COVER_TQ_ADDR: HEAD + '/r/questionbank/getQuestionKnowledgeTree',
  // 视频
  RESOURCE_COVER_VIDEO_ADDR: HEAD + '/r/video/getVideoKnowledgeTree',
  // 视频-新
  RESOURCE_COVER_VIDEO_NEW_ADDR: HEAD + '/r/video/getVideoCategoryTree',
  // 活动模板
  RESOURCE_COVER_TEMPLATE_ADDR: HEAD + '/r/ttemp/getTemplateActivityTree',

  //浏览附件
  PREVIEW_ATTACHMENT_OPEN : HEAD + '/l/attach/previewAttachment',

  // 验证码

  GET_PHONE_INPUT_CODE : HEAD + '/u/user/retrieve/getSendMsgCode',

  // 老师个人简历
  U_GET_TEACHER_RESUME : HEAD + '/u/teacher/getResume',

  U_TEACHER_ADDPOSITION : HEAD + '/u/teacher/addPosition',
  U_TEACHER_UPDATEPOSITION : HEAD + '/u/teacher/updatePosition',
  U_TEACHER_DELETEPOSITION : HEAD + '/u/teacher/deletePosition',

  U_TEACHER_ADDEXPERIENCE : HEAD + '/u/teacher/addProjectExperience',
  U_TEACHER_UPDATEEXPERIENCE : HEAD + '/u/teacher/updateProjectExperience',
  U_TEACHER_DELETEEXPERIENCE : HEAD + '/u/teacher/deleteProjectExperience',

  U_TEACHER_ADDPUBLISH : HEAD + '/u/teacher/addPublication',
  U_TEACHER_UPDATEPUBLISH : HEAD + '/u/teacher/updatePublication',
  U_TEACHER_DELETEPUBLISH : HEAD + '/u/teacher/deletePublication',

  U_TEACHER_ADDHONOR : HEAD + '/u/teacher/addHonor',
  U_TEACHER_UPDATEHONOR : HEAD + '/u/teacher/updateHonor',
  U_TEACHER_DELETEHONOR : HEAD + '/u/teacher/deleteHonor',

  U_TEACHER_UPDATEUSERINFO : HEAD + '/u/teacher/updateUserInfo',

  // 上传商品

  SELLER_INSERT_PRODUCT : HEAD + '/l/shop/seller/insertProduct',

  CHECK_PRODUCT_LINKID : HEAD + '/l/shop/seller/checkProductByLinkId',

  // 邮箱验证

  SEND_EMAIL_CODE : HEAD + '/u/user/verify/verifyEmail',
  USER_REBIND_EMAIL: HEAD + '/u/user/verify/rebindEmail',

  // 任务模板修改和删除

  UPDATE_TASK_TEMPLE: HEAD + '/r/ttemp/updateTeacherTaskTemp',
  DELETE_TASK_TEMPLE: HEAD + '/r/ttemp/removeTemp',

  // 阿里云视频-上传凭证
  ALI_VIDEO_UPLOAD_AUTH: HEAD + '/r/avic/getVideoUploadAuth', 
  // 阿里云视频-播放凭证
  ALI_VIDEO_PLAY_AUTH: HEAD + '/r/avic/getVideoPlayAuth',

  // 任务 => 模板
  TASK_TURN_TO_TEMP : HEAD + '/l/ttask/saveAsTemplate',

  // 任务 => 暂存
  TASK_CUN_MYSQL : HEAD + '/l/ttask/saveTask',

  // 暂存任务请求
  GET_CUN_TASK_OR : HEAD + '/l/ttask/getMyTempTask',

  // 删除暂存任务
  DELETE_CUN_TASK : HEAD + '/l/ttask/deleteMyTempTask',

  // 任务下载
  DOWN_LOAD_TASK : HEAD + '/l/ttask/download',

  // 
  // 删除单个试题
  MY_SOURCE_REMOVE_TEST: HEAD + '/r/questionbank/removeQuestion',
  // 删除试卷
  MY_SOURCE_REMOVE_PAPER: HEAD + '/r/paperinfo/deletePaper',
  // 删除视频
  MY_SOURCE_REMOVE_VIDEO: HEAD + '/r/video/deleteVideo',

  // 修改视频信息
  MY_SOURCE_EDIT_VIDEO: HEAD + '/r/video/updateVideoInfoById',
  // 查看其他资源详细信息
  MY_SOURCE_OTHER_SOURCE_INFO: HEAD + '/r/tamc/getMaterialById',
  // 修改其他资源详细信息
  MY_SOURCE_EDIT_SOURCE: HEAD + '/r/tamc/updateTeacherMaterial',
  // 任务删除
  DEL_THIS_WORK : HEAD + '/l/ttask/deleteOrRecoverMyTask',
}


export {
  ADDRESS,
  HEAD,
  VERSION
}
