<template>
  <div class="container">
    <div class="TaskWork-top relative">
        <h3 class="taskwork-title fs-20">{{taskInfo.title}}
         <span class="inline-block fs-14 cp" @click="dialogVisible = !dialogVisible">查看作品要求</span>
        </h3>
        <div class="taskwork-choice">
          <div class="choice-item">
            <span class="fs-14 cmwc-item-title inline-block fwb TH-f-c-default">班级：</span>
              <ul class="cmwc-item-list inline-block">
                <li
                  @click="searchByOption('class',c.id)"
                  :class="{'TH-f-c-link':workChoices.classesFlag==c.id}"
                  class="inline-block cmwc-item-list-item cp fs-13 TH-f-c-default"
                  v-for="(c,index) in workChoices.classes" :key="index">
                  {{c.title}}
                </li>
              </ul>
          </div>  
          <div class="choice-item">
            <span class="fs-14 cmwc-item-title inline-block fwb TH-f-c-default">状态：</span>
              <ul class="cmwc-item-list inline-block">
                <li
                  @click="searchByOption('status',c.id)"
                  :class="{'TH-f-c-link':workChoices.statusesFlag==c.id}"
                  class="inline-block cmwc-item-list-item cp fs-13 TH-f-c-default"
                  v-for="(c,index) in workChoices.statuses" :key="index">
                  {{c.name}}
                </li>
              </ul>
          </div>
          <div @click="$router.push({path: '/classTask/detail/file', query: {tid:workSearchOption.taskId,jid:workSearchOption.worksId}})" class="TH-button-primary inline-block cmwm-right-button ta-c cp absolute">
            <img src="~assets/imgs/classTask/edit-work.png" alt="ew">
            <span>管理作品</span>
          </div>
        </div>
    </div>
    <div class="content-main-work-manage clear">
       <div class="TH-f-c-default fl">
          <!-- <span @click="searchByOption('order',0)" :class="{'TH-f-c-link':workSearchOption.orderType == 0}" class="inline-block cmwc-item-list-item fs-13 cp">随机</span> -->
          <span @click="searchByOption('order',1)" :class="{'TH-f-c-link':workSearchOption.orderType == 1}" class="inline-block cmwc-item-list-item fs-13 cp">时间</span>
          <span @click="searchByOption('order',2)" :class="{'TH-f-c-link':workSearchOption.orderType == 2}" class="inline-block cmwc-item-list-item fs-13 cp">评分</span>
          <span @click="searchByOption('order',3)" :class="{'TH-f-c-link':workSearchOption.orderType == 3}" class="inline-block cmwc-item-list-item fs-13 cp">预览</span>
          <span @click="searchByOption('order',4)" :class="{'TH-f-c-link':workSearchOption.orderType == 4}" class="inline-block cmwc-item-list-item fs-13 cp">下载</span>
      </div>
      <div class="fr fs-14">
        <span class="inline-block f-c-red">{{workPages.total}}</span>个
      </div>
    </div>
    <div class="content-main-work-list">
      <div class="TF-temp-Arr-space" v-if="workList==''">
          <img src="~assets/imgs/codeZero/coll/no-collected-work.png" alt="">
          <p class="fs-18 TH-f-c-default">没有你需要的学生作品呢！</p>
      </div>
      <div class="cmwl-item TH-card inline-block" :key="index" v-for="(item,index) in workList" @click="worksItemOpen(item)">
        <div class="cmwl-item-left fl ta-c">
          <img class="cmwl-item-left-icon" :src="platformPng(item.fileType)" alt="作品">
        </div>
        <div class="cmwl-item-right fl TH-f-c-default">
          <p class="cmwl-item-right-title fwb fs-16">{{item.worksTitle}}</p>
          <p class="cmwl-item-right-desc ws-no fs-13">
            <span class="mr-item">大小：{{fileSize(item.worksSize)}}</span>
            <span class="mr-item">预览：{{item.viewTimes}}</span>
            <span class="mr-item">下载：{{item.worksDownloads}}</span>
            <span class="mr-item">评分：<span class="c-f-goal">{{item.worksScore}}</span></span>
          </p>
          <p class="cmwl-item-right-author fs-14 TH-f-c-link">
            {{item.username}}
            <span class="fr fs-16 fwb color-ping-no" v-if="!item.isScore">未评分</span>  
            <span class="fr fs-16 fwb color-ping-ed" v-if="item.isScore">已评分</span>  
          </p>
        </div>
        <div v-if="item.excellentInClass==1 && (item.excellentInAll==0 || item.excellentInAll ==2 || item.excellentInAll==1)" class="cmwl-item-flag relative">
          <img class="absolute cmwl-item-flag-icon" src="~assets/imgs/classTask/class-good-work.png" alt="gw" title="班级优秀">
        </div>
        <div v-if="item.excellentInAll==3||item.excellentInAll==4||item.excellentInAll==5" class="cmwl-item-flag relative">
          <img class="absolute cmwl-item-flag-icon" src="~assets/imgs/classTask/school-good-work.png" title="学校优秀">
        </div>
        <div v-if="item.excellentInAll==6" class="cmwl-item-flag relative">
          <img class="absolute cmwl-item-flag-icon" src="~assets/imgs/classTask/platform-good-work.png" title="平台优秀">
        </div>
      </div>
      <div class="work-pages" v-if="workPages.total > 9">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="studentHandleCurrentChange"
          :current-page.sync="workPages.current"
          :page-size="workSearchOption.rows"
          :page-sizes="[9, 18, 30]"
          layout="sizes, prev, pager, next"
          :total="workPages.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="作品要求"
      :visible.sync="dialogVisible"
      custom-class="work-project-detail-cont"
      top="30%"
      size="tiny"
      :before-close="handleClose">
      <div v-html="SearchWorkID(item.html)" 
          class="work-project-detail"
          v-if="ForEachTypeWork(item.contents)" 
          v-for="(item,index) in taskInfo.teachingProceduresDtos" :key="index">
      </div>
      <div class="work-project-detail-footer">
        <div @click="dialogVisible = false" class="TH-button-primary cp inline-block">知道了</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { callLoading, deepClone} from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'
export default {
  name: 'ClassTaskDetailWork',
  data () {
    return {
      dialogVisible:false,
      workPages: {
        total: 0,
        size: 9,
        current: 1,
      },
      workSearchOption: {
        worksId:'',
        activityId:'',
        classId: '',
        taskId:'',
        isClassExcellent: '',
        orderType: 1,
        isComment: '',
        page: 1,
        rows: 9
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
      workList:[],
      taskInfo:{}
    }
  },
  created () {
    this.workSearchOption.taskId = this.$route.query.tid || null
    this.workSearchOption.worksId = this.$route.query.jid || null
    this.getWorks();
    this.getTaskDetail();
  },
  methods: {
    fileSize(str){
      if( str < 1024 ){
        return str + "KB"
      }
      else{
        return parseInt(str / 1024) + 'MB'
      }
    },
    ForEachTypeWork($content){
      for( var i=0;i<$content.length;i++ ){
        if( $content[i].type == 4 ){
          return true
        }
      }
    },
    studentHandleCurrentChange(p) {
      this.workSearchOption.page = p
      this.getWorks()
    },
    handleSizeChange(val) {
      this.workSearchOption.page = 1
      this.workSearchOption.rows = val
      this.workPages.current = 1
      this.getWorks()
    },
    SearchWorkID( dom){
      dom = '<div>'+dom+'</div>'
      var U_string =''
      const _htmlContent = $(dom).find('.TASK-WORKS')
      for(var i = 0; i<_htmlContent.length; i++) {
        if( $(_htmlContent[i]).attr('data-id') == this.$route.query.jid ){
          U_string = _htmlContent[i].outerHTML
        }
      }
      // console.log(U_string)
      return U_string
    },
    getWorks(){
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
    getTaskDetail(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_LIST_ITEM_DETAIL_ADDR, {
        taskId: this.workSearchOption.taskId
      })
      .then((res) =>{
         if(res.body.code==1){
           this.taskInfo=res.body.data
           this.workChoices.classes=this.workChoices.classes.concat(this.taskInfo.classIdNames)
         }
      },(err) =>{
        callLoading.deactiveLoading()
      })
    },
    searchByOption(type,val){
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
    platformPng(file_name){
      let $file = file_name
      if( file_name=='docx'||file_name=='xlsx'||file_name=='pptx' ){
        $file = file_name.substring(0,file_name.length-1)
      }
      return 'static/imgs/uplod/'+$file+'.png'
    },
    worksItemOpen(item){
       window.open(ADDRESS.WORKS_OF_STUDENT_PREVIEW +'?taskId='+item.taskId+'&studentWorksId='+item.studentWorksId)
    }
  }
}
</script>

<style scoped>
.f-c-red{
  color: red;
}
.c-f-goal{
  color: #ff6d01;
  font-weight: bold;
}
.mr-item{
  margin-right: .08rem;
}
.container{
  width: 17rem;
  margin: 0 auto;
}
.taskwork-title{
  margin: .15rem 0;
  color: #535353;
  font-weight: bold;
}
.taskwork-title>span{
  color: #3283d3;
  text-decoration: underline;
  margin-left: .2rem;
  font-weight: normal;
}
.taskwork-title>span::after{
  content:'?';
  background-color: #07bf89;
  border-radius: 50%;
  color: #fff;
  display: inline-block;
  width: .14rem;
  height: .14rem;
  text-align: center;
  font-size: .13rem;
}
.choice-item{
  padding: .1rem 0;
}
.cmwm-right-button{
  bottom: 0;
  right: 0;
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
.cmwc-item-list-item{
  margin-right: .1rem;
}
.content-main-work-manage{
  margin-top: .3rem;
  margin-bottom: .2rem;
}
.content-main-work-list{
  margin-top: .3rem;
}
.cmwl-item {
  width: 5.4rem;
  height: 1.26rem;
  margin: 0 .32rem .4rem 0;
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
  width: 4.7rem;
}

.cmwl-item-right-title {
  margin: .1rem .1rem .25rem .1rem;
}

.cmwl-item-right-desc {
  margin: 0 .1rem .25rem .1rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cmwl-item-right-desc span {
  margin-right: .15rem;
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

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.41rem;
  height: 1.49rem;
}

.color-ping-ed{
  color: #31b21c;
}

.color-ping-no{
  color: #aaa;
}
</style>
      