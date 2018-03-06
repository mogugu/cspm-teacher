<template>
  <div class="container TH-card">
    <!-- <div class="baseinfo fl TH-card">
      <div class="baseinfo-top TH-f-c-default">
        <h1 class="fs-16 fwb ta-c tof">{{taskInfo.title || '' | truncate(21, '...')}}</h1>
        <p class="baseinfo-top-time fs-12 fwb ta-c">
          <span>{{taskInfo.startTime}}</span>
          <span>至</span>
          <span>{{taskInfo.endTime}}</span>
        </p>
        <p class="fs-13 baseinfo-top-desc ta-j">
          {{baseInfo.description}}
        </p>
      </div>

      <div class="baseinfo-center TH-f-c-default clear">
        <div class="baseinfo-center-label fl">
          <img src="~assets/imgs/classTask/class.png" alt="class">
        </div>
        <div class="baseinfo-center-list fl">
          <span class="inline-block fs-14" v-for="item in taskInfo.classIdNames">{{item.title}}</span>
        </div>
      </div>

      <div class="baseinfo-bottom TH-f-c-default">
        <p class="baseinfo-bottom-item">
          <img src="~assets/imgs/classTask/activity.png" alt="activity">
          <span class="fs-14">活动：{{taskInfo.activityName}}</span>
        </p>
        <p class="baseinfo-bottom-item">
          <img src="~assets/imgs/classTask/time.png" alt="time">
          <span class="fs-14">{{taskInfo.timeStr}}发布</span>
        </p>
      </div>

      <div @click="$router.push({path: '/classTask/detail/total', query: {id:taskId}})" class="baseinfo-more TH-button-primary ta-c fs-16 cp">
        查看任务整体情况
      </div>
    </div> -->
    <div class="baseinfo border-bottom">
      <div class="baseinfo-left content-left">
        <div class="baseinfo-title">
          <h1 class="fs-20 inline-block">{{taskInfo.title || '' | truncate(21, '...')}}</h1>
          <span class="action-last-time fs-14">{{taskInfo.timeStr}}</span>
          <span class="fr fs-14" v-html="tempLocation"></span>
        </div> 
        <div class="baseinfo-bottom fs-16">
          <p><span class="baseinfo-label inline-block"><img src="~assets/imgs/classTask/activity.png" alt="activity"></span>活动：
            {{taskInfo.activityName}}</p>
          <p><span class="baseinfo-label inline-block"><img src="~assets/imgs/classTask/class.png" alt="class"> </span>班级：
            <span :key="index" v-for="(item,index) in taskInfo.classIdNames">{{index==0?'':'、'}}{{item.title}}</span>
          </p>
          <p>
            <span class="baseinfo-label inline-block"><img src="~assets/imgs/classTask/time.png" alt="time"></span>时间：
            {{taskInfo.startTime}}  至  {{taskInfo.endTime}}
           </p>
        </div>   
      </div>
      <div class="baseinfo-right content-right absolute">
        <p class="fs-14" v-if="taskInfo.isDeleted"><i class="fa fa-warning"></i>学生端此任务已删除</p>
        <div class="border-radius baseinfo-more TH-button-primary ta-c fs-16 cp relative">
          任务操作<i class="fa fa-sort-desc" aria-hidden="true"></i>
          <ul class="task-paper-lists TH-card absolute">
            <li @click="$router.push({path: '/classTask/detail/total', query: {id:taskId}})" class="inline-block">查看任务统计</li>
            <li class="inline-block" @click="DownLoadTaskDetail=true">下载任务</li>
            <li class="inline-block" v-if="tempLocation==''" @click="SaveTaskTemplate=true">保存为模板</li>
            <li class="inline-block" v-if="!taskInfo.isDeleted" @click="DelTaskTemplate=true">删除任务</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="add-content-main-html relative" :key="index" v-for="(item,index) in taskInfo.teachingProceduresDtos">
      <div class="clear" v-html="ReplaceAllTid(item.html)"></div>
      <div class="absolute button-location-setting">
        <div class="TH-button-default ta-c cmpc-right-button cp fs-16 relative border-radius" v-if="ForEachTypePaper(item.contents)">
          查看统计<i class="fa fa-sort-desc" aria-hidden="true"></i>
          <ul class="task-paper-lists TH-card absolute">
            <li class="inline-block" v-if="_item.type == 2" 
                @click="$router.push({path:'/classTask/detail/paperMore',query:{tid:taskInfo.taskId,pid:_item.id}})"
                :key="_index" v-for="(_item,_index) in item.contents">{{_item.name}}</li>
          </ul>
        </div>
        <div class="TH-button-primary ta-c cmpc-right-button cp fs-16 relative border-radius" 
              v-if="ForEachTypeWork(item.contents)">
          查看作品<i class="fa fa-sort-desc" aria-hidden="true"></i>
          <ul class="task-paper-lists TH-card absolute">
            <li class="inline-block" v-if="_item.type == 4" 
                @click="$router.push({path:'/classTask/detail/work',query:{tid:taskInfo.taskId,jid:_item.id}})"
                :key="_index" v-for="(_item,_index) in item.contents">{{_item.name}}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 保存为模板 -->
    <el-dialog :visible.sync="SaveTaskTemplate" top="30%" custom-class="dialog-edit-grade dialog-edit-grade-width">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>保存为模板</span>
      </div>
      <div class="upload-mall-resource">
        <div class="fs-16">
          模板名称： <input class="turn-to-temp" type="text" maxlength="20" v-model="taskTempText" />
        </div>
        <p class="fs-18 turn-to-temp">您确定把此任务保存为模板吗？</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="SaveTaskDeatilTemp">确定</el-button>
        <el-button @click="SaveTaskTemplate=false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 提示 -->
    <el-dialog :visible.sync="CantSaveTaskTemplate" top="30%" custom-class="dialog-edit-grade dialog-edit-grade-width">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>提示</span>
      </div>
      <div class="upload-mall-resource">
        <p class="fs-18">该任务无法保存为模板，请发布新任务后再进行保存。</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CantSaveTaskTemplate=false">知道了</el-button>
      </div>
    </el-dialog>

    <!-- 删除任务 -->
    <el-dialog :visible.sync="DelTaskTemplate" top="30%" custom-class="dialog-edit-grade dialog-edit-grade-width">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>删除任务</span>
      </div>
      <div class="upload-mall-resource">
        <p class="fs-16 Th-f-c-red-1 ta-c">删除任务后学生将无法看到该任务</p>
        <p class="fs-16 Th-f-c-red-1 ta-c">您确定要删除此任务吗？</p>
        <p class="fs-14 TH-f-c-dark-m ta-c">（教师端依旧可进行查看）</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DelThisTask">确定</el-button>
        <el-button @click="DelTaskTemplate=false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 下载任务 -->
    <el-dialog :visible.sync="DownLoadTaskDetail" top="30%" custom-class="dialog-edit-grade dialog-edit-grade-width">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>下载任务</span>
      </div>
      <div class="download-task-about">
        <el-checkbox-group v-model="checkedlist" @change="handelcheckdown">
          <el-checkbox  :label="downloadlist[0]" :key="1">任务基本信息</el-checkbox>
          <el-checkbox v-if="taskInfo.showFlag==3||taskInfo.showFlag==4"  :label="downloadlist[1]" :key="2">任务统计信息</el-checkbox>
          <el-checkbox v-if="taskInfo.showFlag==3||taskInfo.showFlag==4"  :label="downloadlist[2]" :key="3">学生上传的作品</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DownLoadTaskAbout">确定</el-button>
        <el-button @click="DownLoadTaskDetail=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { callLoading, deepClone, videoTime, convertImgToUrl,callToast } from '../../helpers/helper'
import { ADDRESS,VERSION } from '../../helpers/address'
import $ from 'jQuery'
export default {
  name: 'ClassTaskDetail',
  data () {
    return {
      taskId: '',
      taskInfo: {},
      taskConentIndex: [
        {
          name: '视频',
          label: 'video'
        },
        {
          name: '试卷',
          label: 'paper'
        },
        {
          name: '附件',
          label: 'file'
        },
        {
          name: '作品',
          label: 'work'
        },
      ],
      baseInfo: {
        title:'第一课——玩转家庭相册',
        startTime: '2017-07-01 15:30',
        endTime: '2017-07-01 15:30',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor',
        classes:['七年级一班','七年级二班','七年级三班','七年级四班','七年级五班'],
        activity: '活动一活动',
        publishTime: '2天前'
      },
      tabActive: '',
      workPages: {
        total: 0,
        size: 12,
        current: 1,
      },
      workChoices: {
        classesFlag:'-1',
        statusesFlag:'-1',
        classes: [{title:'全部',id:'-1'}],
        statuses: [{name:'全部',id:'-1'},{name:'未打分',id:1},{name:'已打分',id:2}],
        sortOptions: {
          time: 0,
          score: 0,
          preview: 0,
          down: 0
        }
      },
      workSearchOption: {
        activityId:'',
        classId: '',
        taskId:'',
        isClassExcellent: '',
        orderType: 0,
        isComment: '',
        page: 1,
        rows: 12
      },
      workList: [],
      videoInfo: {
        title:'信息获取的方法',
        view: '60',
        vote: '20',
        duration: '300',
        from: '优酷'
      },
      paperInfo: {
        title: '信息获取的方法相关练习题',
        finish: '16',
        unfinish: '18'
      },
      fileInfo: {
        title: '信息获取的方法相关pdf',
      },
      downloadlist:[
        {
          type:1,
          text:'任务基本信息'
        },
        {
          type:2,
          text:'任务统计信息'
        },
        {
          type:3,
          text:'学生上传的信息'
        },
      ],
      SaveTaskTemplate:false,
      DownLoadTaskDetail:false,
      CantSaveTaskTemplate:false,
      DelTaskTemplate:false,
      tempLocation:'',
      taskTempTextL:'',
      checkedlist:[]
    }
  },
  created () {
    this.taskId = this.$route.query.id
    this.workSearchOption.taskId = this.taskId
    this.getTaskDetail()
  },
  methods: {
    ForEachTypePaper( $content ){
      for( var i=0;i<$content.length;i++ ){
        if( $content[i].type == 2 ){
          return true
        }
      }
    },
    ForEachTypeWork($content){
      for( var i=0;i<$content.length;i++ ){
        if( $content[i].type == 4 ){
          return true
        }
      }
    },
    ReplaceAllTid( content){
      return convertImgToUrl(content).replace(/tid=/, "?tid="+this.taskId) 
    },
    platformPng(file_name){
      let $file = file_name
      if( file_name=='docx'||file_name=='xlsx'||file_name=='pptx' ){
        $file = file_name.substring(0,file_name.length-1)
      }
      return 'static/imgs/uplod/'+$file+'.png'
    },
    workHandleCurrentChange(p) {
      console.log('page is',p)
      this.workSearchOption.page = p
      this.getWorks()
    },
    getWorks() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.WORK_LIST_CLASS,this.workSearchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.workList = res.body.data.list
            this.workPages.total = +res.body.data.total
          }
        }, (err) => {
          callLoading.deactiveLoading()
          console.log(err)
        })
    },
    searchByOption(type, val) {
      this.workList = []
      this.workPages.total = 0
      this.workPages.current = 1
      this.workSearchOption.page = 1
      if (type == 'class') {
        const _v = (val==-1)?'':val
        this.workSearchOption.classId = _v
        this.workChoices.classesFlag = val
      }
      else if (type == 'status') {
        if (val == -1) {
          this.workSearchOption.isComment = ''
        }
        else if (val == 1) {
          this.workSearchOption.isComment = false
        }
        else if (val == 2) {
          this.workSearchOption.isComment = true
        }
        this.workChoices.statusesFlag = val
      }
      else if (type == 'order') {
        this.workSearchOption.orderType = val
      }
      this.getWorks()
    },
    getTaskDetail() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_LIST_ITEM_DETAIL_ADDR, {
        taskId: this.taskId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          const _data = res.body.data
          this.taskInfo = _data;
          this.taskTempText = _data.title

          if( this.taskInfo.toTemplateTaskId ){
            this.tempLocation = `已保存为任务模板：<a class="TH-f-c-link" href="#/personalSourceDetail/taskTemplate?id=${this.taskInfo.toTemplateTaskId}&isByMe=true&isUpload=true">查看</a>`
          }
         
          this.$store.classesArr = _data.classIdNames;
          this.workChoices.classes = this.workChoices.classes.concat(this.taskInfo.classIdNames)
          // this.taskInfo.classIdNames.unshift({
          //   title: '全部',
          //   id: '-1'
          // })
          this.tabActive = this.taskConentIndex[_data.taskContents[0].contentType-1].label
          // console.log(this.tabActive)
          for (var i = 0; i < _data.taskContents.length; i++) {
            if (_data.taskContents[i].contentType==1) {
              this.videoInfo = _data.taskContents[i]
            }
            else if (_data.taskContents[i].contentType==2) {
              this.paperInfo = _data.taskContents[i]
            }
            else if (_data.taskContents[i].contentType==3) {
              this.fileInfo = _data.taskContents[i]
            }
          }
        }
      }, (err) => {
        callLoading.activeLoading()
      })
    },
    searchTemp(item){
      window.open(ADDRESS.PREVIEW_ATTACHMENT_ALL +'?attachmentId='+item.contentId)
    },
    worksItemOpen(item){
      window.open(ADDRESS.WORKS_OF_STUDENT_PREVIEW +'?taskId='+item.taskId+'&studentWorksId='+item.studentWorksId)
    },
    SaveTaskDeatilTemp(){//保存为模板
      callLoading.activeLoading()
      // console.log(this.taskInfo.teachingProceduresDtos[0].name)
      if( this.taskInfo.teachingProceduresDtos[0].name == '' ){
        callLoading.deactiveLoading()
        this.CantSaveTaskTemplate = true
        this.SaveTaskTemplate = false
        return
      }
      

      let HTML_CONTENT = ''

      let teachingProceduresDtos = this.taskInfo.teachingProceduresDtos
      for( let i=0;i<teachingProceduresDtos.length;i++ ){
        HTML_CONTENT += teachingProceduresDtos[i].html
      }

      let taskContents = this.taskInfo.taskContents
      // 处理一般资源数据
      let _taskContents  = []

      for( let i=0;i<taskContents.length;i++ ){
        _taskContents.push({
          order:'',
          type:'',
          id:'',
          name:''
        })
        //处理作品
        _taskContents[i].order = taskContents[i].orderNumber
        _taskContents[i].type = taskContents[i].contentType
        _taskContents[i].id = taskContents[i].contentId
        _taskContents[i].name = taskContents[i].contentTitle
        if( taskContents[i].contentType == 4 ){
          _taskContents[i].scalel = '6:4'
          _taskContents[i].worksDescription = taskContents[i].taskWorksEntity.worksDescription
          _taskContents[i].format = JSON.parse(taskContents[i].taskWorksEntity.worksSuffix)
          _taskContents[i].scoreStandard = JSON.parse(taskContents[i].taskWorksEntity.worksEvaluationStandard)
        }
        else if( taskContents[i].contentType == 2 ){
          _taskContents[i].timeLimit = taskContents[i].timeLimit
          _taskContents[i].answerLimit = taskContents[i].answerLimit
        }
      }

      this.$http.post( ADDRESS.TASK_TURN_TO_TEMP ,{
        taskId : this.taskInfo.taskId,
        title : this.taskTempText,
        activityId : this.taskInfo.activityId,
        content : JSON.stringify(_taskContents),
        teachingProcedures : HTML_CONTENT
      })
      .then( (res) => {
        callLoading.deactiveLoading()
        this.SaveTaskTemplate = false
        if( res.body.code == 1 ){
          callToast('成功保存为模板')
          this.tempLocation = `已保存为任务模板：<a class="TH-f-c-link" href="#/personalSourceDetail/taskTemplate?id=${res.body.data}&isByMe=true&isUpload=true">查看</a>`
        }
        else{
          callToast(res.body.message,'error')
        }
      } ,( err ) =>{
        callLoading.deactiveLoading()
      } )
    },
    handelcheckdown( value ){//选定
    //  console.log(value)
    },
    DownLoadTaskAbout(){//确定
      let downString = ''
      this.checkedlist.forEach( (item,index)=>{
        downString += (index==0?'':',')+item.type
      } )
      console.log(downString)

      let params ={
        taskId :this.taskId,
        catalogs : downString,
        version : VERSION
      }

      let urlAdress = ADDRESS.DOWN_LOAD_TASK
      window.open( urlAdress+'?taskId='+this.taskId+'&catalogs='+downString+'&version='+VERSION )
    },
    DelThisTask(){//删除任务

      let urlAdress = ADDRESS.DEL_THIS_WORK

      let DelJson = {
        taskId :this.taskId,
        type : 1
      }

      callLoading.activeLoading()
      this.$http.post(urlAdress,DelJson)
      .then( (res) =>{
        callLoading.deactiveLoading()
        if( res.body.code == 1 ){
          this.DelTaskTemplate = false
          this.taskInfo.isDeleted = true
          callToast('删除成功','success')
        }
        else{
          callToast(res.body.message,'error')
        }
      },(err) => {
        callLoading.deactiveLoading()
      })
    }
  }
}
</script>

<style scoped>
div{
  box-sizing: border-box;
}
.container {
  width: 12rem;
  margin: 0 auto;
  background-color: #f6f6f6;
}




/* 以前的样式 */
.content {
  width: 9.3rem;
  min-height: 4rem;
  background-color: #fff;
}


.content-tab-item {
  margin-right: .4rem;
}

.content-tab-item-active {
  font-size: .32rem;
  color: #535353;
}

.content-main-work-choice {
  margin-top: .3rem;
}

.cmwc-item-list {
  margin-bottom: .15rem;
}

.cmwc-item-list-item {
  margin-right: .2rem;
}

.content-main-work-manage {
  margin-top: .3rem;
}

.cmwm-left-item {
  margin-right: .2rem;
  height: .4rem;
  line-height: .4rem;
}

.cmwm-right-button {
  width: 1.2rem;
  height: .4rem;
  line-height: .4rem;
  border-radius: 20px;
}

.cmwm-right-button img {
  position: relative;
  top: .05rem;
  width: .2rem;
}

.cmwl-item {
  width: 4rem;
  min-height: 1rem;
  margin: 0 .68rem .4rem 0;
  cursor: pointer;
}

.cmwl-item:nth-child(3n) {
  margin-right: 0;
}

.cmwl-item-left {
  width: .7rem;
}

.content-main-work-list {
  padding-top: .5rem;
  padding-left: .02rem;
}

.cmwl-item-right {
  width: 3rem;
}

.cmwl-item-right-title {
  margin: .1rem .1rem .2rem .1rem;
}

.cmwl-item-right-desc {
  margin: 0 .1rem .15rem .1rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cmwl-item-right-author {
  margin: 0 .1rem .1rem .1rem;
}

.cmwl-item-left-icon {
  position: relative;
  top: -.1rem;
}

.cmwl-item-flag-icon {
    top: 0;
    right: .1rem;
}

.content-main-video-card {
  width: 9.5rem;
  height: 3rem;
  margin: .7rem 0
}

.cmvc-left {
  width: 4.2rem;
  height: 100%;
}

.cmvc-left img {
  width: 100%;
  height: 100%;
}

.cmvc-right {
  height: 100%;
  width: 4.5rem;
  margin: .2rem .3rem;
}

.cmvc-right-bar {
  width: .65rem;
  height: .05rem;
  margin-bottom: .4rem;
}

.cmvc-right-button {
  width: 1.2rem;
  height: .4rem;
  border-radius: 20px;
  line-height: .4rem;
  bottom: .35rem;
  left: 0;
}

.cmvc-right-more {
  margin: .2rem 0;
}

.cmvc-right-info {
  margin-bottom: .15rem;
}

.cmvc-right-more-item {
  margin-right: .2rem;
}

.content-main-paper-card {
  margin: .7rem 0;
  padding: .3rem .25rem;
  height: .75rem;
  width: 9.4rem;
}

.cmpc-left-bar {
  width: .65rem;
  height: .05rem;
  margin-bottom: .25rem;
}

.cmpc-left-title {
  margin-bottom: .25rem;
}

.cmpc-left-info {
  margin-bottom: .15rem;
}

.cmpc-left-info-item {
  margin-right: .15rem;
}

.cmpc-right {
  right: .3rem;
  top: .5rem;
}


.content-main-work-pages {
  margin-bottom: .25rem;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.41rem;
  height: 1.49rem;
}

.border-radius{
  border-radius: 4px !important;
}

.baseinfo-more:hover .task-paper-lists{
  display: block;
}

.fa-sort-desc{
  vertical-align: text-top;
  margin-left: .05rem;
}

a.TH-f-c-link{
  text-decoration: underline;
}

.dialog-edit-grade-width .upload-mall-resource {
  padding: .5rem .2rem;
  text-align: left;
  line-height: .28rem;
}

.download-task-about{
  padding: .2rem .2rem;
}

.download-task-about .el-checkbox-group .el-checkbox{
  width: 100%;
  font-size: .16rem;
}

.upload-mall-resource input.turn-to-temp{
  /* text-align: center; */
  height: .32rem;
  line-height: .32rem;
  width: 4rem;
  font-size: .16rem;
  padding-left: .1rem;
}

.upload-mall-resource p.turn-to-temp{
  margin-top: .2rem;
}

.upload-mall-resource .Th-f-c-red-1{
  margin-bottom: .1rem;
}
</style>
