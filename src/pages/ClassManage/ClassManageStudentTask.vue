
<template>
  <div class="container">
    <div class="TF-temp-Arr-space" v-if="taskList==''">
      <img src="~assets/imgs/codeZero/manage/no-finished-task.png" alt="">
      <p class="fs-18 TH-f-c-default">还没有完成任何任务！</p>
    </div>
    <div class="cms-task-main clear">
      <div class="cms-task-main-list TH-card fl">
        <div v-for="(item,index) in taskList" class="cms-tml-item clear" :key="index">
          <div class="cms-tml-item-left fl">
            <h2 class="cms-tml-item-title fs-18 TH-f-c-default fwb">{{item.title}}</h2>
            <p class="cms-tml-item-activity fs-14 TH-f-c-default">活动：{{item.activityName}}</p>
            <div class="cms-tml-item-info">
              <div class="inline-block cms-tml-item-detail">
                <img class="cms-tml-iid-icon" src="~assets/imgs/publish/paper.png" alt="paper">
                <p class="cms-tml-iid-item inline-block">
                  <span class="fs-14 TH-f-c-default">试卷数：</span>
                  <span class="fs-14 fwb TH-f-c-link">{{item.paperSize}}</span>
                </p>
                <p class="cms-tml-iid-item inline-block">
                  <span class="fs-14 TH-f-c-default">已完成：</span>
                  <span class="fs-14 fwb TH-f-c-link">{{item.paperFinishs}}</span>
                </p>
                <p class="cms-tml-iid-item inline-block">
                  <span class="fs-14 TH-f-c-default">平均正确率：</span>
                  <span class="fs-14 fwb TH-f-c-link">{{item.avgAccuracyRate}}</span>
                </p>
              </div>
              <div class="inline-block cms-tml-item-detail">
                <img class="cms-tml-iid-icon" src="~assets/imgs/publish/activity-requirment.png" alt="activity-requirment">
                <p class="cms-tml-iid-item inline-block">
                  <span class="fs-14 TH-f-c-default">作品数：</span>
                  <span class="fs-14 fwb TH-f-c-link">{{item.workSize}}</span>
                </p>
                <p class="cms-tml-iid-item inline-block">
                  <span class="fs-14 TH-f-c-default">已完成：</span>
                  <span class="fs-14 fwb TH-f-c-link">{{item.workFinishs}}</span>
                </p>
                <p class="cms-tml-iid-item inline-block">
                  <span class="fs-14 TH-f-c-default">平均得分：</span>
                  <span class="fs-14 fwb TH-f-c-link">{{item.avgWorksScore}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="cms-tml-item-right fl">
            <p class="cms-tml-item-score">
              <span class="cms-tis-detail TH-f-c-orange fs-28 fwb">{{item.finalScore}}</span>
              <span class="cms-tis-detail TH-f-c-orange fs-16 fwb">分</span>
            </p>
            <p @click="viewDetailContent(item)" class="cms-tml-item-score-more inline-block TH-f-c-link fs-16 cp">查看统计</p>
          </div>
        </div>
      </div>
      <!--右侧详情-->
      <div class="cms-task-main-stastic TH-card fr">
        <p class="cms-tms-no fs-16 TH-f-c-default" v-if="!showStastic">点击左侧“<span class="TH-f-c-link">查看统计</span>”查看任务完成情况</p>
        <div v-if="showStastic" class="cms-tms-content TH-scroll" >
          <h2 class="cms-tms-content-title fs-18 TH-f-c-default">{{studentContentInfos.title}}</h2>
          <div class="cms-tms-content-bar"></div>
          <div class="cms-tms-content-section" v-for="(item,index) in studentContentInfos.content" :key="index">
            <div v-if=" (item.type=='paper' || item.type=='work') && item.total !=''">
            <p class="cms-tms-content-section-title fs-14" v-if="item.type=='paper'">
              <img src="~assets/imgs/publish/activity-requirment.png" alt="activity-requirment">
              <span class="TH-f-c-default">试卷</span>
              <span class="TH-f-c-warn">（{{item.total}}）</span>
            </p>
            <p class="cms-tms-content-section-title fs-14" v-if="item.type=='work'">
              <img src="~assets/imgs/publish/paper.png" alt="paper">
              <span class="TH-f-c-default">作品</span>
              <span class="TH-f-c-warn">（{{item.total}}）</span>
            </p>
            <div class="cms-tms-content-section-inner clear fs-16 TH-f-c-default" v-if="item.finished !=''">
              <p class="cms-tms-csi-left fs-color-green">已完成（{{item.finished}}）：</p>
              <div class="cms-tms-csi-right"  >
                <div class="cms-tms-csi-right-item" v-for="itemList in item.finishedList">
                  <p class="cms-tms-csi-right-item-title">{{itemList.title}}</p>
                  <div class="cms-tms-csi-right-item-rate clear" v-if="item.type =='paper'">
                    <span class="fl cms-tms-csi-rit-detail">正确率：{{itemList.lastAccuracyRate}}</span>
                    <span class="cms-tms-csi-rit-button fr cp TH-button-default" @click="$router.push({path:'/classManage/student/stastic',query:{paperId:itemList.contentId,taskId:studentInfo.taskId,id:searchOption.studentId}})">查看统计</span>
                  </div> 
                  <div class="cms-tms-csi-right-item-rate clear" v-if="item.type =='work'">
                    <span class="fl cms-tms-csi-rit-detail">得分：{{itemList.score}}</span>
                    <span class="cms-tms-csi-rit-button fr cp TH-button-default" @click="worksItemOpen(itemList)">查看作品</span>
                  </div> 
                </div>
              </div>
            </div>
            <div class="cms-tms-content-section-inner clear fs-16 TH-f-c-fade" v-if="item.unfinished !=''">
              <p class="cms-tms-csi-left">未完成（{{item.unfinished}}）：</p>
              <div class="cms-tms-csi-right">
                <div v-for="ii in item.unfinishedList" class="cms-tms-csi-right-item">
                  <p class="cms-tms-csi-right-item-title">{{ii}}</p>
                </div>
              </div>
            </div>
            </div>
          </div>
          <!-- <div class="cms-tms-content-section">
            <p class="cms-tms-content-section-title fs-14">
              <img src="~assets/imgs/publish/paper.png" alt="paper">
              <span class="TH-f-c-default">作品</span>
              <span class="TH-f-c-warn">（2）</span>
            </p>
            <div class="cms-tms-content-section-inner clear fs-16 TH-f-c-default">
              <p class="cms-tms-csi-left fl">已完成（2）：</p>
              <div class="cms-tms-csi-right fl">
                <div v-for="ii in 2" class="cms-tms-csi-right-item">
                  <p class="cms-tms-csi-right-item-title">我也不晓得什</p>
                  <div class="cms-tms-csi-right-item-rate clear">
                    <span class="fl cms-tms-csi-rit-detail">得分：90</span>
                    <span class="cms-tms-csi-rit-button fr cp TH-button-default">查看作品</span>
                  </div> 
                </div>
              </div>
            </div>
            <div class="cms-tms-content-section-inner clear fs-16 TH-f-c-fade">
              <p class="cms-tms-csi-left fl">未完成（2）：</p>
              <div class="cms-tms-csi-right fl">
                <div v-for="ii in 2" class="cms-tms-csi-right-item">
                  <p class="cms-tms-csi-right-item-title">我也不晓得什么试卷我也不晓得什我也不晓得什么试卷我也不晓得什</p>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <ul v-if="taskList!=''" class="cmt-list clear">
      <li v-for="item in taskList" class="fl cmt-list-item TH-card inline-block">
        <p class="cmt-list-item-title fs-18 TH-f-c-default fwb tof">{{item.title | truncate(20, '...')}}</p>
        <div v-if="item.includePaper" class="cmt-list-item-paper">
          <p class="cmt-lip-title fs-16 TH-f-c-default">
            <img class="cmt-lip-title-img" src="~assets/imgs/source/paper.png" alt="paper">
            <span class="tof">{{item.paperTitle || '-' | truncate(20, '...')}}</span>
          </p>
          <div class="cmt-lip-info clear">
            <span class="cmt-lip-info-item TH-f-c-default fs-14 fl">测试次数：<i class="TH-f-c-link fwb">{{item.completeTimes}}</i> </span>
            <span class="cmt-lip-info-item TH-f-c-default fs-14 fl">最终正确率：<i class="TH-f-c-link fwb">{{item.lastAccuracyRate}}%</i> </span>
            <span @click="$router.push({path:'/classManage/student/stastic',query:{'paperId':item.paperId,'taskId':item.taskId,'id':item.userId}})" class="cmt-lip-info-item cmt-lip-info-item-go TH-f-c-link fs-14 fr cp" v-if="item.completeTimes!=0">查看统计</span>
          </div>
        </div>
        <div v-if="item.includeWork" class="cmt-list-item-work">
          <p class="cmt-lip-title fs-16 TH-f-c-default">
            <img class="cmt-lip-title-img" src="~assets/imgs/source/work.png" alt="work">
            <span class="tof">{{item.worksTitle || '暂未上传' | truncate(10, '...')}}</span>
            <span v-if="item.excellentInClass" class="cmt-lip-title-tag TH-bg-c-warn fs-14">班级优秀</span>
            <span v-if="item.excellentInAll" class="cmt-lip-title-tag TH-bg-c-default fs-14">平台优秀</span>
          </p>
          <div class="cmt-lip-info clear">
            <span class="cmt-lip-info-item TH-f-c-default fs-14 fl">作品得分：<i class="TH-f-c-link fwb">{{item.workFinished?item.finalScore:'-'}}</i> </span>
            <span v-if="item.workFinished" class="cmt-lip-info-item cmt-lip-info-item-go TH-f-c-link fs-14 fr cp" @click="worksItemOpen(item)">查看作品</span>
          </div>
        </div>
      </li>
    </ul> -->
    <div class="cmt-pages" v-if="studentPages.total > 9">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="studentHandleCurrentChange"
        :current-page.sync="studentPages.current"
        :page-size="searchOption.rows"
        :page-sizes="[5, 10, 20]"
        layout="sizes, prev, pager, next"
        :total="studentPages.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { callLoading } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'
export default {
  name: 'ClassManageStudentStastic',
  data () {
    return {
      studentPages: {
        total: 0,
        size: 5,
        current: 1,
      },
      searchOption: {
        studentId: '',
        page: 1,
        rows: 5
      },
      studentInfo:{
        taskId:'',
        userId:''
      },
      studentContentInfos:{
        title:'',
        content:[
          {
            type:'video',
            total:'',
            finished:'',
            unfinished:'',
            finishedList:[],
            unfinishedList:[]
          },
          {
            type:'paper',
            total:'',
            finished:'',
            unfinished:'',
            finishedList:[],
            unfinishedList:[]
          },
          {
            type:'material',
            total:'',
            finished:'',
            unfinished:'',
            finishedList:[],
            unfinishedList:[]
          },
          {
            type:'work',
            total:'',
            finished:'',
            unfinished:'',
            finishedList:[],
            unfinishedList:[]
          }
        ]
        //type 1.视频 2.试卷 3.素材 4.作品
      },
      taskList: [],
      taskContentInfo:[],
      showStastic: false,
    }
  },
  created () {
    this.searchOption.studentId = this.studentInfo.userId=this.$route.query.id
    this.getDataList()
  },
  methods: {
    worksItemOpen(item){
      window.open(ADDRESS.WORKS_OF_STUDENT_PREVIEW +'?taskId='+this.studentInfo.taskId+'&studentWorksId='+item.studentWorksId)
    },
    studentHandleCurrentChange(p) {
      this.searchOption.page = p
      this.getDataList()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.studentPages.current = 1
      this.getDataList()
    },
    getDataList() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.CLASS_TEACHER_STUDENT_TASK_HISTORY_ADDR, this.searchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.studentPages.total = +res.body.data.total
            this.taskList = res.body.data.list
          }
          else {
            this.studentPages.total = 0
            this.taskList = []
          }
        }, (err) => {
          this.taskList = []
          console.log(err)
          callLoading.deactiveLoading()
        })
    },
    viewDetailContent(item){
      this.showStastic=true;
      this.studentInfo.taskId=item.taskId 
      this.studentContentInfos.title=item.title
      for(var i=0;i<this.studentContentInfos.content.length;i++){
        for(var key in this.studentContentInfos.content[i]){
          if(key != 'type'){
            if(this.studentContentInfos.content[i][key] instanceof Array ){
                 this.studentContentInfos.content[i][key]=[]
            }else{
               this.studentContentInfos.content[i][key]=''
            }
          }
        }
      }
      console.log(this.studentContentInfos.content)
      this.getTaskDetail()
    },
    getContentDetail(infoArr){
      if(infoArr){
        for(var i=0;i<this.studentContentInfos.content.length;i++){
          for(var j=0;j<infoArr.length;j++){
            if(infoArr[j].contentType==(i+1)){
                this.studentContentInfos.content[i].total++
                if(infoArr[j].finished==true){
                  this.studentContentInfos.content[i].finished++
                  this.studentContentInfos.content[i].finishedList.push({
                    'title':infoArr[j].contentTitle,
                    'lastAccuracyRate':infoArr[j].lastAccuracyRate,
                    'score':infoArr[j].workScore,
                    'contentId':infoArr[j].contentId,
                    'studentWorksId':infoArr[j].studentWorksId == null ? '':infoArr[j].studentWorksId
                    })
                }else{
                   this.studentContentInfos.content[i].unfinished++
                  this.studentContentInfos.content[i].unfinishedList.push(infoArr[j].contentTitle)
                }
            }
          }
            console.log(this.studentContentInfos.content[i])
        }
      }
    },
    getTaskDetail(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_LIST_CONTENT_ADDR,this.studentInfo)
          .then((res)=>{
            callLoading.deactiveLoading()
            if(res.body.code==1){
              this.taskContentInfo= res.body.data.list
              console.log("任务完成")
              console.log(this.taskContentInfo)
              this.getContentDetail(this.taskContentInfo)
            }else{
              this.taskContentInfo=[]
            }
          },(err)=>{
            callLoading.deactiveLoading()
          })
    },
    eventHandleScroll() {
     //console.log(window.scrollY)
      if (window.scrollY > 400) {
        $('.cms-task-main-stastic').css({
          'top': window.scrollY - 300
        })
      }
      else {
        $('.cms-task-main-stastic').css({
          'top': 'auto'
        })        
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.eventHandleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.eventHandleScroll)
  }
}
</script>

<style scoped>
.cmt-list-item {
  width: 5.05rem;
  padding: .2rem;
  height: 1.7rem;
  margin: 0 .3rem .3rem 0;
}

.cmt-list-item:nth-child(3n) {
  margin-right: 0;
}

.cmt-list-item-title {
  margin-bottom: .2rem;
  padding-bottom: .05rem;
}

.cmt-list-item-paper {
  margin-bottom: .25rem;
}

.cmt-lip-title-img {
  width: .18rem;
  margin-right: .05rem;
  vertical-align: middle;
}

.cmt-lip-info {
  margin-left: .28rem;
  margin-top: .1rem;
}

.cmt-lip-info-item {
  margin-right: .3rem;
}

.cmt-lip-info-item-go {
  border-bottom: 1px solid #3283d3;
}

.cmt-list-item-work {
  padding-top: .2rem;
  border-top: 1px solid #ddd;
}

.cmt-lip-title-tag {
  min-width: .7rem;
  height: .25rem;
  display: inline-block;
  line-height: .25rem;
  text-align: center;
  margin-left: .15rem;
  padding: 0 .05rem;
}

.TF-temp-Arr-space{
  margin-top: 1rem;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.41rem;
  height: 1.49rem;
}

.cms-task-main-list {
  width: 12rem;
  min-height: 6.8rem;
  margin-bottom: .5rem;
}

.cms-task-main-stastic {
  width: 4.6rem;
  height: 6.8rem;
  margin-bottom: .5rem;
  position: relative;
}

.cms-tml-item {
  width: 11.6rem;
  margin: 0 auto;
  padding: .2rem 0;
  border-bottom: 1px solid #ececec;
}

.cms-tml-item-left {
  width: 10rem;
}

.cms-tml-item-right {
  width: 1.6rem;
}

.cms-tml-item-title {
  margin-bottom: .15rem;

}

.cms-tml-item-activity {
  margin-bottom: .2rem;
}

.cms-tml-iid-item {
  margin-right: .17rem;
}

.cms-tml-iid-icon {
  vertical-align: middle;
}

.cms-tml-item-score-more {
  margin-top: .4rem;
  border-bottom: 1px solid #3283d3;
}

.cms-tms-no {
  text-align: center;
  margin-top: 2.2rem;
}

.cms-tms-content {
  height: 100%;
  overflow: auto;
}

.cms-tms-content-title {
  margin: .2rem;
}

.cms-tms-content-bar {
  width: .5rem;
  height: .03rem;
  background: #3283d3;
  margin: .2rem;
}

.cms-tms-content-section {
  width: 4rem;
  margin: 0 auto;
  border-bottom: 1px dashed #9c9c9c;
}

.cms-tms-content-section:last-child {
  border-bottom: none;
}

.cms-tms-content-section-title {
  margin: .2rem 0;
}

.cms-tms-content-section-inner {
  width: 3.7rem;
  margin: 0 auto;
  padding-left: .15rem;
}

.cms-tms-csi-rit-button {
  width: 1rem;
  height: .3rem;
  border-radius: 50px;
  text-align: center;
  line-height: .3rem;
  margin-bottom: .05rem;
}

.cms-tms-csi-rit-detail {
  margin-top: .05rem;
}
.cms-tms-csi-left{
  margin-bottom: .1rem;
}
.cms-tms-csi-right-item {
  margin-bottom: .15rem;
}

.cms-tms-csi-right-item-title {
  width: 4rem;
  margin-bottom: .1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cmt-pages {
  margin: .2rem 0;
}

</style>
