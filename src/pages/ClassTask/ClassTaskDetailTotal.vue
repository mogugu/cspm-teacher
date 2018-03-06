<template>
  <div class="container">
      <!-- <div class="class-task-detail-total-nav fs-22">
        <span @click="activeClassName = item.id" :class="{'active':item.id == activeClassName}" v-for="item in classList">{{item.name}}</span>
      </div> -->
      <class-nav
        :classlist="taskInfo.classFinish"
        @classToggle="handleClassToggle($event)"
        >
      </class-nav>
      <div class="class-task-detail-total-tag">
          <div class="class-task-tag-list inline-block relative">
              <span class="task-finish">已完成</span>
              <!-- <span class="down-before-after"></span> -->
              <p class="inline-block finished fs-16 fwb">
                <span>{{taskInfo.finishedStudents || 0}}</span>人
              </p>
              <input @click="dialogVisible_finish=true" type="button" name="" value="查看名单" class="button fs-14" />
          </div>
          <div class="class-task-tag-list inline-block relative un-did">
              <span class="task-unfinish">未完成</span>
              <p class="inline-block unfinished fs-16 fwb">
                <span>{{taskInfo.unFinishedStudents || 0}}</span>人
              </p>
              <input @click="dialogVisible_unfinish = true" type="button" name="" value="查看名单" class="button fs-14" />
          </div>
          <div v-if="activeClass == 0 && taskInfo.showFlag == 0" class=" inline-block class-task-tag-finish fr fs-20 cp" @click="showCloseTask('all')">
             <img src="~assets/imgs/classTask/finish-task.png" alt="结算任务">
             结算任务
          </div>
          <!--正在结算-->
          <div v-if="activeClass == 0 && (taskInfo.showFlag == 1)" class="fr fs-20 class-task-finished">
            任务正在结算
          </div>
          <!--已结算-->
          <div v-if="activeClass == 0 && (taskInfo.showFlag == 3 || taskInfo.showFlag == 4)" class="fr fs-20 class-task-finished">
            任务已结算
          </div>
          <!--结算异常-->
          <div v-if="activeClass == 0 && (taskInfo.showFlag == 2 || taskInfo.showFlag == 5)" class="fr fs-20 class-task-finished-un">
            任务结算异常
          </div>
          <!--待分发-->
          <div v-if="activeClass == 0 && (taskInfo.showFlag == 6)" class="fr fs-20 class-task-unpub">
            任务待分发
          </div>
          <div v-if="activeClass != 0 && taskInfo.classFinish[0].showFlag == 0" class=" inline-block class-task-tag-finish fr fs-20 cp" @click="showCloseTask('item')">
             <img src="~assets/imgs/classTask/finish-task.png" alt="结算任务">
             结算任务
          </div>
          <!--正在结算-->
          <div v-if="activeClass != 0 && (taskInfo.classFinish[0].showFlag == 1)" class="fr fs-20 class-task-finished">
            任务正在结算
          </div>
          <!--已结算-->
          <div v-if="activeClass != 0 && (taskInfo.classFinish[0].showFlag == 3 || taskInfo.showFlag == 4)" class="fr fs-20 class-task-finished">
            任务已结算
          </div>
          <!--结算异常-->
          <div v-if="activeClass != 0 && (taskInfo.classFinish[0].showFlag == 2 || taskInfo.showFlag == 5)" class="fr fs-20 class-task-finished-un">
            任务结算异常
          </div>
          <!--待分发-->
          <div v-if="activeClass != 0 && (taskInfo.classFinish[0].showFlag == 6)" class="fr fs-20 class-task-unpub">
            任务待分发
          </div>
      </div>
      <!-- table -->
      <div v-if="studentsList==''" class="no-tasks-list-publish TH-card">
        <img src="~assets/imgs/codeZero/task/no-finished-student.png" alt="">
        <p class="fs-18 TH-f-c-default">还没有学生完成任务呢！</p>
      </div>
      <div class="main-table clear">
        <div class="main-table-tab ta-c" v-if="studentsList!=''">
          <span @click="ClassTabIndex('right')" v-if="taskInfo.isEnd" :class="{'mtt-item-active':toggleTable=='right'}" class="cp fs-18 mtt-item">学生得分统计表</span>
          <span @click="ClassTabIndex('left')" :class="{'mtt-item-active':toggleTable=='left'}" class="cp fs-18 mtt-item">学生完成统计表</span>
        </div>
        <div class="main-table-content fl">
          <table v-if="studentsList!=''" class="fs-14" cellspacing="0" cellpadding="0" border="none" width="100%">
            <thead>
              <tr>
                <div class="mtc-item-title inline-block">
                  <th style="width:20%;" class="mtc-item-title-item fs-14">
                    <span class="student-rank-item" v-if="toggleTable=='right'">排名</span>
                    <span class="student-rank-item" v-if="toggleTable=='left'">序号</span>
                  </th>
                  <th style="width:40%;" class="mtc-item-title-item fs-14">姓名</th>
                  <th style="width:40%;" class="mtc-item-title-item fs-14">班级</th>
                </div>
                <div v-if="toggleTable=='left'" class="fs-0 mtc-item-left inline-block">
                  <th class="mtc-item-left-item fs-14">视频观看情况</th>
                  <!-- <th width="15%">作品</th> -->
                  <th class="mtc-item-left-item fs-14">素材查看情况</th>
                  <th class="mtc-item-left-item fs-14">试卷完成情况</th>
                  <th class="mtc-item-left-item fs-14">作品完成情况</th>
                </div>
                <div v-if="toggleTable=='right'" class="fs-0 mtc-item-right inline-block">
                  <th class="mtc-item-right-item fs-14 cp" :class="{'mtc-item-right-order':studentSearchOption.query==2}" @click="orderType(2)">试卷平均得分率&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
                  <th class="mtc-item-right-item fs-14 cp" :class="{'mtc-item-right-order':studentSearchOption.query==3}" @click="orderType(3)">作品平均分&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
                  <th class="mtc-item-right-item fs-14 cp" :class="{'mtc-item-right-order':studentSearchOption.query==1}" @click="orderType(1)">任务得分&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
                  <th class="mtc-item-right-item fs-14">得分调整</th>
                  <th class="mtc-item-right-item fs-14 cp" :class="{'mtc-item-right-order':studentSearchOption.query==0}" @click="orderType(0)">任务最终得分&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
                </div>
                <div class="mtc-item-toggle">
                  <span :class="{'mtc-iti-active':toggleTable=='left'}" class="fa fa-angle-left mtc-item-toggle-item"></span>
                  <span :class="{'mtc-iti-active':toggleTable=='right'}" class="fa fa-angle-right mtc-item-toggle-item"></span>
                </div>
              </tr>
            </thead>
            <tbody>
              <tr v-if="toggleTable=='right'" :key="$index" v-for="(item,$index) in studentsScoceList">
                <div class="mtc-item-title inline-block">
                  <td style="width:20%;" class="student-rank mtc-item-title-item fs-14">
                    <span v-if="(workPages.current-1)*10 + $index==0" class="student-rank-item inline-block first">{{$index+1}}</span>
                    <span v-if="(workPages.current-1)*10 + $index==1" class="student-rank-item inline-block second">{{$index+1}}</span>
                    <span v-if="(workPages.current-1)*10 + $index==2" class="student-rank-item inline-block third">{{$index+1}}</span>
                    <span v-if="(workPages.current-1)*10 + $index>2" class="student-rank-item inline-block">{{(workPages.current-1)*10 + $index+1}}</span>
                  </td>
                  <td style="width:40%;" class=" mtc-item-title-item fs-14">{{item.username}}</td>
                  <td style="width:40%;" class=" mtc-item-title-item fs-14">{{item.className}}</td>
                </div>
                <div class="fs-0 mtc-item-right inline-block">
                  <td class="mtc-item-right-item fs-14">{{item.avgFirstScoreRate}}</td>
                  <td class="mtc-item-right-item fs-14">{{item.workScore}}</td>
                  <td class="mtc-item-right-item fs-14">{{item.systemScore}}</td>
                  <td class="mtc-item-right-item fs-14">{{item.adjustedScore }}</td>
                  <td class="mtc-item-right-item fs-14">
                    {{item.finalScore}}
                  </td>
                </div>
                <div class="mtc-item-control">
                  <img  @click="viewDetailContent(item)" class="edit-point-student" src="~assets/imgs/classTask/view.png" alt="view">
                  <img  @click="openScoreDialog(item)" class="edit-point-student" src="~assets/imgs/classTask/edit-point.png" alt="edit-point">
                </div>
              </tr>
              <tr v-if="toggleTable=='left'" @mouseenter="showAjust(item, $index, true)" @mouseleave="showAjust(item, $index, false)" :key="$index" v-for="(item,$index) in studentsList">
                <div class="mtc-item-title inline-block">
                  <td style="width:20%;" class="student-rank mtc-item-title-item fs-14">
                    <span v-if="(workPages.current-1)*10 + $index==0" class="student-rank-item inline-block first">{{$index+1}}</span>
                    <span v-if="(workPages.current-1)*10 + $index==1" class="student-rank-item inline-block second">{{$index+1}}</span>
                    <span v-if="(workPages.current-1)*10 + $index==2" class="student-rank-item inline-block third">{{$index+1}}</span>
                    <span v-if="(workPages.current-1)*10 + $index>2" class="student-rank-item inline-block">{{(workPages.current-1)*10 + $index+1}}</span>
                  </td>
                  <td style="width:40%;" class=" mtc-item-title-item fs-14">{{item.username}}</td>
                  <td style="width:40%;" class=" mtc-item-title-item fs-14">{{item.className}}</td>
                </div>
                <div  class="fs-0 mtc-item-left inline-block">
                    <!-- <td class="mtc-item-left-item fs-14">{{item.lastAccuracyRate}}</td> -->
                    <!-- <td>{{item.worksTitle}}</td> -->
                    <td class="mtc-item-left-item fs-14">{{item.videoFinishs}} / {{item.videoSize}}</td>
                    <!-- <td v-if="item.includeVideo">{{item.videoFinished?'已观看':'未观看'}}</td> -->
                    <td class="mtc-item-left-item fs-14">{{item.materialFinishs}} / {{item.materialSize}}</td>
                    <td class="mtc-item-left-item fs-14">{{item.paperFinishs}} / {{item.paperSize}}</td>
                    <td class="mtc-item-left-item fs-14">{{item.workFinishs}} / {{item.workSize}}</td>
                </div>
                <div class="mtc-item-control">
                  <img  @click="viewDetailContent(item)" class="edit-point-student" src="~assets/imgs/classTask/view.png" alt="view">
                </div>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="studentsList!=''" class="main-table-user fr TH-card TH-scroll">
          <p v-if="!toggleStudentInfo" class="main-table-user-no fs-16">
            点击左侧&nbsp;&nbsp;
            "<img class="" src="~assets/imgs/classTask/view.png" alt="view">"
            &nbsp;&nbsp;查看学生任务详情
          </p>

          <div v-if="toggleStudentInfo" class="main-table-user-content">
            <h2 class="TH-f-c-default fs-18 mtu-content-name">{{studentContentInfos.user}}</h2>
            <div class="mtu-content-bar"></div>
            <div v-if="item.total != ''" class="mtu-content-section" v-for="item in studentContentInfos.content">
                <p v-if="item.type == 'video'" class="mtu-content-section-title fs-14"><img src="~assets/imgs/publish/video.png" alt="video"> 视频（{{item.total}}）</p>
                <p v-else-if="item.type == 'paper'" class="mtu-content-section-title fs-14"><img src="~assets/imgs/publish/paper.png" alt="paper"> 试卷（{{item.total}}）</p>
                <p v-else-if="item.type == 'material'" class="mtu-content-section-title fs-14"><img src="~assets/imgs/publish/sources.png" alt="sources"> 素材（{{item.total}}）</p>
                <p v-else-if="item.type == 'work'" class="mtu-content-section-title fs-14"><img src="~assets/imgs/publish/activity-requirment.png" alt="activity-requirment"> 作品（{{item.total}}）</p>
                <div class="fs-16 clear mtu-content-section-item" v-if="item.finished!=''">
                  <div  class=" mtu-csi-label fs-color-green">
                    <span v-if="item.type== 'video' || item.type== 'material'">已观看</span>
                    <span v-else-if="item.type== 'paper' ||item.type== 'work' ">已完成</span>
                    <span>（{{item.finished}}）：</span>
                  </div>
                   <div class=" TH-f-c-default mtu-csi-detail" v-for="listItem in item.finishedList">
                    <p class="mtu-csi-detail-issue">{{listItem.title}}</p>
                    <div class="fs-16 clear mtu-content-section-item" v-if=" (item.type=='paper'||item.type=='work')">
                      <div v-if="item.type=='paper'" class="fl TH-f-c-fade">
                          <span class="mtu-csi-detail-label">得分率：</span>
                          <span class="TH-f-c-default ">{{listItem.lastScoreRate}}</span>
                      </div>
                      <div v-if="item.type=='work'" class="fl TH-f-c-fade ">
                         <span class="mtu-csi-detail-label">得分：</span>
                         <span class="TH-f-c-default ">{{listItem.score}}</span>
                      </div>
                      <div class="fr">
                         <span v-if="item.type=='paper'" class="mtu-csi-detail-button inline-block cp" @click="$router.push({path:'/classManage/student/stastic',query:{taskId: studentInfo.taskId,paperId:listItem.contentId,id:studentInfo.userId}})">查看统计</span>
                         <span v-if="item.type=='work'" class="mtu-csi-detail-button inline-block cp" @click="worksItemOpen(listItem)">查看作品</span>
                      </div>
                    </div>
                   </div>
                </div>
              <div class="fs-16 clear mtu-content-section-item" v-if="item.unfinished!=''">
                <div class="TH-f-c-fade mtu-csi-label">
                  <span v-if="item.type== 'video' || item.type== 'material'">未观看</span>
                  <span v-else-if="item.type== 'paper' ||item.type== 'work' ">未完成</span>
                  <span class="TH-f-c-warn">（{{item.unfinished}}）</span>：
                  </div>
                <div class="fl TH-f-c-default mtu-csi-detail" >
                  <p class="mtu-csi-detail-issue" v-for="ii in item.unfinishedList">{{ii}}</p>
                </div>
              </div>
            </div> 
          </div>

        </div>
      </div>
      <!-- finished -->
      <el-dialog
        title="已完成名单"
        top="40%"
        :visible.sync="dialogVisible_finish"
        size="tiny">
        <span v-if="taskInfo.finishedStudentsNames.length > 0" class="fs-14 dialog-student inline-block" :key="index" v-for="(student,index) in taskInfo.finishedStudentsNames">{{student.username}}</span>
        <span class="fs-14" v-if="taskInfo.finishedStudentsNames.length == 0">暂无学生</span>
      </el-dialog>
      <!-- unfinished -->
      <el-dialog
        title="未完成名单"
        top="40%"
        :visible.sync="dialogVisible_unfinish"
        size="tiny">
        <span class="fs-14" v-if="taskInfo.unFinishedStudentsNames.length == 0">暂无学生</span>
        <span v-if="taskInfo.unFinishedStudentsNames.length > 0" class="fs-14 dialog-student inline-block" v-for="student in taskInfo.unFinishedStudentsNames">{{student.username}}</span>
      </el-dialog>
      <!-- pages and rows -->
      <div class="work-pages" v-if="studentSearchOption.rows!=100000 && workPages.total > 10 && studentsList !='' ">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="workPages.current"
          :page-sizes="[10, 20, 40]"
          :page-size="studentSearchOption.rows"
          layout="sizes, prev, pager, next"
          :total="workPages.total">
        </el-pagination>
      </div>
      <!-- change grade of student -->
      <el-dialog title="修改得分" :visible.sync="dialogFormVisible" custom-class="dialog-edit-grade">
        <ul class="fs-16">
          <li class="clear">
              <label for="" class="inline-block fl font-fwb">任务得分：</label>
              <div class="fl"><span class="grade-old fwb fs-40">{{ajustStudentInfo.systemScore}}</span></div>
          </li>
          <li class="clear">
              <label for="" class="inline-block fl">调整得分：</label>
              <div class="fl">
                <img @click="ajustStudentInfo.adjustedScore=(+ajustStudentInfo.adjustedScore<100)?+ajustStudentInfo.adjustedScore+10:ajustStudentInfo.adjustedScore" class="img-mid" src="~assets/imgs/classTask/add-point.png" alt="add-point">
                <img @click="ajustStudentInfo.adjustedScore=(+ajustStudentInfo.adjustedScore>-100)?+ajustStudentInfo.adjustedScore-10:ajustStudentInfo.adjustedScore" class="img-mid" src="~assets/imgs/classTask/minus-point.png" alt="add-point">
                <input v-model="ajustStudentInfo.adjustedScore" class="fs-16 input-change-grade" type="text" name=""/>
                <span>分</span>
              </div>
          </li>
          <li class="clear">
              <label for="" class="inline-block fl">备<em></em>注：</label>
              <div class="fl">
                <input v-model="ajustStudentInfo.adjustmentReason" class="fs-16 advice-of-teacher" type="text" name="" maxlength="15">
                <p class="fs-12">最多15字</p>
              </div>
          </li>
          <li class="clear">
              <label for="" class="inline-block fl font-fwb">最终得分：</label>
              <div class="fl"><span class="grade-new fwb fs-40">{{+ajustStudentInfo.systemScore + (+ajustStudentInfo.adjustedScore)}}</span></div>
          </li>
        </ul>
         <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateScore()">确 定</el-button>
        </div>
      </el-dialog>
      <!--finish task-->
      <el-dialog title="结算任务" :visible.sync="dialogTaskVisible" top="40%" custom-class="finishTask-dialog" size="tiny">
         <span class="fs-16 block dialog-label">结算任务后学生端不能继续完成任务</span>
         <span class="fs-16">您确定结算{{activeClassName}}任务吗？</span>
         <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="finishTask">确 定</el-button>
            <el-button @click="dialogTaskVisible = false">取 消</el-button>
         </span>
      </el-dialog>
  </div>
</template>

<script>

import classNav from '../../components/classNav.vue'
import { ADDRESS } from '../../helpers/address'
import { callLoading, callToast, deepClone } from '../../helpers/helper'
import $ from 'jquery'
export default {
  name: 'ClassTaskDetailTotal',
  components: {
    'class-nav': classNav
  },
  data () {
    return {
      student_work:'给妈妈一个特别的礼物',
      reson:'You are so curt.',
      dialogVisible_finish:false,
      dialogVisible_unfinish:false,
      dialogFormVisible:false,
      form:{
        name:'',
        region:''
      },
      activeClass: 0,
      activeClassName: '',
      taskInfo: {},
      workPages: {
        total: 0,
        current: 1,
        size: 10
      },
      studentSearchOption: {
        query:0,
        taskId: '',
        classId: '',
        page: 1,
        rows: 10,
      },
      studentsList: [],
      studentsScoceList:[],
      ajustScore: {
        userTaskId: '',
        studentId: '',
        adjustScore: '',
        adjustReason: ''
      },
      ajustStudentInfo: {},
      studentContentInfo:[],
      studentContentInfos:{
        user:'',
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
            type: 'work',
            total:'',
            finished:'',
            unfinished:'',
            finishedList:[],
            unfinishedList:[]
          }
        ]
      },
      studentInfo:{
        taskId: '',
        userId: ''
      },
      toggleTable: 'right',
      toggleStudentInfo: false,
      dialogTaskVisible: false,
      isFinish: false,
      // showFlag: -1,
    }
  },
  created () {
    this.taskId = this.$route.query.id
    this.studentSearchOption.taskId = this.taskId
    this.getTaskInfo()
    this.getStudent()
    // this.getScoreInfo()
  },
  methods: {
    worksItemOpen(item){
        console.log(item)
        window.open(ADDRESS.WORKS_OF_STUDENT_PREVIEW +'?taskId='+this.studentInfo.taskId+'&studentWorksId='+item.studentWorksId)
    },
    handleSizeChange(val) {
      this.studentSearchOption.page = 1
      this.studentSearchOption.rows = val
      this.workPages.current = 1
      if( this.toggleTable == 'left' ){
        this.getStudent()
      }
      else{
        this.getScoreInfo()
      }
      console.log(`每页 ${val} 条`);
    },
    //新增手动结算任务
    finishTask(){
      console.log(this.activeClass)
      this.$http.post(ADDRESS.TASK_LIST_END_ADDR,{
        taskId: this.taskId,
        classId: this.activeClass?this.activeClass:''
      })
      .then((res)=>{
        callLoading.deactiveLoading()
        if(res.body.code==1){
          if (this.activeClass) {
            this.taskInfo.classFinish[0].showFlag = 1
          }
          else {
            this.taskInfo.showFlag = 1
          }
          this.dialogTaskVisible=false
          callToast(res.body.data,'success')
        }
        else {
          callToast('结算出错，请刷新页面！','warning')
        }
      })
    },
    ClassTabIndex( key ){
      this.toggleTable = key
      this.studentSearchOption.page = 1
      this.studentSearchOption.classId = this.activeClass?this.activeClass:''
      this.workPages.current = 1
      if( this.toggleTable == 'left' ){
        this.getStudent()
      }
      else{
        this.getScoreInfo()
      }
    },
    handleCurrentChange(val) {
      this.studentSearchOption.page = val
      if( this.toggleTable == 'left' ){
        this.getStudent()
      }
      else{
        this.getScoreInfo()
      }
    },
    handleClassToggle(id) {
      console.log('接收到啦~',id)
      this.activeClass = id 
      if (id == 0) {
        this.studentSearchOption.rows = 10
      }
      else {
        this.studentSearchOption.rows = 100000
      }
      this.studentSearchOption.page = 1
      this.studentSearchOption.classId = this.activeClass?this.activeClass:''
      this.workPages.current = 1
      this.getTaskInfo()
      this.getStudent()
      // this.getScoreInfo()
      //是否已结算
      console.log('flag',this.flag)
    },
    getTaskInfo() {
      // callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_LIST_FINISHSTAT_ADDR,{
        taskId: this.taskId,
        classId: this.activeClass?this.activeClass:''
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.taskInfo = res.body.data
          let classFinish=res.body.data.classFinish
          //任务是否结算
          for(var i=0;i<classFinish.length;i++){
             if(classFinish[i].flag==0||classFinish[i].flag==1){
                this.isFinish=false
             }else{
               this.isFinish=true
             }
          }
          this.flag=res.body.data.classFinish[0].flag
          if( res.body.data.isEnd ){
            this.getScoreInfo()
          }
          else{
             this.toggleTable = 'left'
          }
        }
        else {
          this.taskInfo = {
            finishedStudentsNames: [],
            unFinishedStudentsNames: []
          }
        }
      }, (err) => {
        this.taskInfo = {}
        // callLoading.deactiveLoading()
        console.log(err)
      })
    },
    openScoreDialog(item) {
      this.dialogFormVisible = true
      this.ajustScore.userTaskId = item.userTaskId
      this.ajustScore.studentId = item.userId
      this.ajustStudentInfoPure = item
      this.ajustStudentInfo = deepClone(item)
    },
    viewDetailContent(item){
      this.toggleStudentInfo =true
      this.studentInfo.taskId=item.taskId 
      this.studentInfo.userId=item.userId
      this.studentContentInfos.user=item.username
      for(var i=0;i<this.studentContentInfos.content.length;i++){
        for(var key in this.studentContentInfos.content[i]){
          if(key != 'type'){
            if(this.studentContentInfos.content[i][key] instanceof Array){
               this.studentContentInfos.content[i][key]=[]
            }else{
               this.studentContentInfos.content[i][key]=''
            }
          }
        }
      }
      this.getTaskDetail()
    },
    getContentDetail(infoArr){
      if(infoArr){
        for(var i=0;i<this.studentContentInfos.content.length;i++){
          for(var j=0;j<infoArr.length;j++){
            if(infoArr[j].contentType == (i+1)){
                this.studentContentInfos.content[i].total++
               if(infoArr[j].finished==true){
                this.studentContentInfos.content[i].finished++
                this.studentContentInfos.content[i].finishedList.push(
                  {'title':infoArr[j].contentTitle,
                  'score':infoArr[j].workScore,
                  'lastAccuracyRate':infoArr[j].lastAccuracyRate,
                  'contentId':infoArr[j].contentId,
                  'studentWorksId':infoArr[j].studentWorksId == null ? '':infoArr[j].studentWorksId,
                  'lastScoreRate':infoArr[j].lastScoreRate
                  }
                )
              }else{
                this.studentContentInfos.content[i].unfinished++
                this.studentContentInfos.content[i].unfinishedList.push(infoArr[j].contentTitle)
              }
            }
          }
        }
      }
    },
    getTaskDetail(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_LIST_CONTENT_ADDR,this.studentInfo)
          .then((res)=>{
            callLoading.deactiveLoading()
            if(res.body.code==1){
              this.studentContentInfo= res.body.data.list
              console.log("任务完成")
              console.log(this.studentContentInfo)
              this.getContentDetail(this.studentContentInfo)
            }else{
              this.studentContentInfo=[]
            }
          },(err)=>{
            callLoading.deactiveLoading()
          })
    },
    getStudent() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_LIST_STUDENT_STATUS_ADDR, this.studentSearchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.workPages.total = +res.body.data.total
            this.studentsList = res.body.data.list
            for (var i = 0; i < this.studentsList.length; i++) {
              this.studentsList[i].isShowAjust = false
            }
          }
          else {
            this.studentsList = []
            this.workPages.total = 0
          }
        }, (err) => {
          this.workPages.total = 0
          callLoading.deactiveLoading()
          console.log(err)
        })
    },
    //新增排序
    orderType(id){
       this.studentSearchOption.query=id;
       this.getScoreInfo();
    },
    getScoreInfo(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS. TASK_GET_STUDENT_SCORE_ADDR,this.studentSearchOption)
          .then((res)=>{
            callLoading.deactiveLoading()
            if(res.body.code ==1){
              this.workPages.total =+res.body.data.total
              this.studentsScoceList=res.body.data.list
            }
          },(err)=>{
             this.workPages.total=0
             callLoading.deactiveLoading()
          })
    },
    showAjust(item, index, type) {
      item.isShowAjust = type
      this.studentsList.splice(index,1,item)
      // console.log(item)
    },
    updateScore() {
      callLoading.activeLoading()
      this.ajustScore.adjustScore = this.ajustStudentInfo.adjustedScore
      this.ajustScore.adjustReason = this.ajustStudentInfo.adjustmentReason

      this.$http.post(ADDRESS.TASK_LIST_STUDENT_SCORE_ADDR, this.ajustScore)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            callToast('修改成功')
            this.ajustStudentInfoPure.adjustedScore = this.ajustScore.adjustScore
            this.ajustStudentInfoPure.finalScore = res.body.data
            this.ajustStudentInfoPure.adjustmentReason = this.ajustScore.adjustReason

            this.dialogFormVisible = false
          }
          else {
            callToast(res.body.data)
          }
        }, (err) => {
          callLoading.deactiveLoading()
          console.log(err)
          callToast('修改失败')
        })
    },
    handlerScroll() {
      if (window.scrollY > 400) {
        $('.main-table-user').css({
          'top': window.scrollY - 400
        })
      }
      else {
        $('.main-table-user').css({
          'top': 'auto'
        })  
      }
    },
    showCloseTask(type) {
      this.activeClassName = $('.class-nav .active').text()+'的'
      if (type == 'all') {
        this.activeClassName = '整个'
      }
      this.dialogTaskVisible = true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handlerScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handlerScroll)
  }
}
</script>

<style scoped>
.container{
  width: 17rem;
  margin: 0 auto;
}

/*.class-task-detail-total-nav{
  color: #999;
  height: .94rem;
}

.class-task-detail-total-nav span{
  margin-right: .3rem;
  cursor: pointer;
}

.class-task-detail-total-nav span.active{
  font-size: .32rem;
  font-weight: bold;
  color: #535353;
}*/

.class-task-detail-total-tag{
  margin-bottom: .3rem;
  /*overflow: auto;*/
}

.class-task-tag-list{
  width: 3.3rem;
  height: .6rem;
  margin-right: .5rem;
  -moz-border-radius: .05rem;
  border-radius: .05rem;
  background-color: rgba(255,255,255,.8);
  -webkit-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  -moz-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  padding: .2rem .2rem;
}
/*新增任务结算*/
.class-task-tag-finish{
  width: 1.63rem;
  height: .2rem;
  line-height: .18rem;
  margin-top: .2rem;
  -moz-border-radius: .05rem;
  border-radius: .05rem;
  background-color: rgba(255,255,255,.8);
  -webkit-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  -moz-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  padding: .2rem .2rem;
  text-align: center;
  color: #328ed3;
}
.class-task-finished{
  color: #4fb033;
  font-weight: bold;
  line-height: 1rem;
}

.class-task-finished-un {
  color: #f59c00;
  font-weight: bold;
  line-height: 1rem; 
}

.class-task-unpub {
  color: #3283d3;
  font-weight: bold;
  line-height: 1rem;
}

.task-finish,
.task-unfinish{
  position: absolute;
  display: inline-block;
  width: .7rem;
  height: .26rem;
  line-height: .26rem;
  text-align: center;
  color: #fff;
  left: -.15rem;
  top: .1rem;
}

.class-task-tag-list:after
{
  content: "";
  width:0;
  height:0;
  border-left:.1rem solid transparent;
  border-right:.1rem solid transparent;
  border-bottom:.1rem solid #4fb033;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  position: absolute;
  left: -.14rem;
  top: .34rem;
}

.un-did.class-task-tag-list:after{
  border-bottom:.1rem solid #ee4e4e;
}

.task-finish{
  background-color: #4fb033;
}

.task-unfinish{
  background-color: #ee4e4e;
}

.class-task-tag-list .button,
.mtu-csi-detail-button{
  padding: .06rem .23rem;
  color: #fff;
  border-radius: .3rem;
  background-color: #3283d3;
  -webkit-box-shadow: 0 1px 2px rgba(2,22,37,.3);
  -moz-box-shadow: 0 1px 2px rgba(2,22,37,.3);
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: -webkit-linear-gradient(bottom, #32abd3, #3283d3);
  background-image: -moz-linear-gradient(bottom, #32abd3, #3283d3);
  background-image: -o-linear-gradient(bottom, #32abd3, #3283d3);
  background-image: -ms-linear-gradient(bottom, #32abd3, #3283d3);
  background-image: linear-gradient(to top, #32abd3, #3283d3);
  float: right;
  margin-top: .15rem;
}
.mtu-csi-detail-button{
  background-image: -webkit-linear-gradient(bottom, #47d4a4, #0bc0a4);
  background-image: -moz-linear-gradient(bottom, #47d4a4, #0bc0a4);
  background-image: -o-linear-gradient(bottom, #47d4a4, #0bc0a4);
  background-image: -ms-linear-gradient(bottom, #47d4a4, #0bc0a4);
  background-image: linear-gradient(to top, #47d4a4, #0bc0a4);
  margin-top:0;
}
.mtu-csi-detail-label{
  line-height:.28rem;
}
.class-task-tag-list .button:hover{
  background-color: #3283d3;
  background-image: -webkit-linear-gradient(bottom, #3ebbe4, #4093e4);
  background-image: -moz-linear-gradient(bottom, #3ebbe4, #4093e4);
  background-image: -o-linear-gradient(bottom, #3ebbe4, #4093e4);
  background-image: -ms-linear-gradient(bottom, #3ebbe4, #4093e4);
  background-image: linear-gradient(to top, #3ebbe4, #4093e4);
}

.class-task-tag-list p.inline-block span{
  font-size: .44rem;
  margin-left: .8rem;
}

.class-task-tag-list p.inline-block.unfinished{
  line-height: .6rem;
  color: #ee4e4e;
}

.class-task-tag-list p.inline-block.finished{
  line-height: .6rem;
  color: #4fb033;
}

table{
  webkit-border-radius: 4px;
 -moz-border-radius: 4px;
  border-radius: 4px;
  /*background-color: rgba(255,255,255,.8); */
  -webkit-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  -moz-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  margin-bottom: .2rem;
}

table thead th{
  background-color: #328ed3;
  color: #fff;
  /* height: .4rem;
  line-height: .4rem; */
  text-align: left;
}

table tbody td{
  height: .6rem;
  line-height: .6rem;
}

table tbody tr:nth-child(odd){
  background-color: #fff;
}

/* .student-rank {
} */

.student-rank span{
  width: .32rem;
  height: .32rem;
  line-height: .32rem;
  text-align: center;
  color: #fff;
  background-color: #7a7a7a;
}

.student-rank span.first{
  background-color: #ff7316;
}

.student-rank span.second{
  background-color: #fea922;
}

.student-rank span.third{
  background-color: #6fbb3f;
}

.edit-point-student:last-child{
  cursor: pointer;
  width: .2rem;
  height: .21rem;
  margin-left: .1rem;
}

.edit-point-student:first-child{
  cursor: pointer;
  width: .24rem;
  height: .14rem;
  margin-left: .15rem;
}

.message-of-student{
  width: 4.9rem;
  height: .28rem;
  border-radius: .02rem;
  border:1px solid #ddd;
  padding-left: .1rem;
}

.dialog-edit-grade ul.fs-16 li.clear{
  margin-bottom: .2rem;
}

.dialog-edit-grade ul.fs-16 li:last-child{
  margin-bottom: 0
}

label.inline-block.fl{
  line-height: .3rem;
}

label.inline-block.fl.font-fwb{
  line-height: .5rem;
}

.grade-new.fwb.fs-40{
  color: #3283d3;
}

label.inline-block.fl em{
  display: inline-block;
  width: .32rem;
}

.advice-of-teacher{
  width: 4.7rem;
  height: .28rem;
  line-height: .28rem;
  padding-left: .1rem;
  border:1px solid #ddd;
}

p.fs-12{
  width: 4.8rem;
  text-align: right;
  margin-top: .1rem;
}

img.img-mid{
  cursor: pointer;
  width: .2rem;
  height: .2rem;
  margin:.05rem .1rem .05rem 0;
}

.fs-16.input-change-grade{
  padding-left: .1rem;
  width: .5rem;
  height: .28rem;
  line-height: .28rem;
  border:1px solid #ddd;
}

.dialog-student {
  margin: 0 .2rem .2rem 0;
}


.no-tasks-list-publish{
  width: 5.3rem;
  height: 3.4rem;
  margin: 0 auto;
  margin-top: 1.3rem;
  text-align: center;
}

.no-tasks-list-publish img{
  width: 1.54rem;
  height: 1.5rem;
  margin-top: .6rem;
  margin-bottom: .5rem;
}

.main-table-content {
  width: 12rem;
}

.main-table-user {
  width: 4.6rem;
  height: 6.6rem;
  margin-bottom: .1rem;
  position: relative;
  overflow: auto;
}

.main-table-user-no {
  position: absolute;
  top: 30%;
  text-align: center;
  left: 25%;
}

.mtc-item-title {
  width: 30%;
  font-size: 0;
}

.mtc-item-title-item {
  width: 33.33%;
  display: inline-block;
  height: .6rem;
  line-height: .6rem;
}

.mtc-item-left {
  width: 60%;
  font-size: 0;
}

.mtc-item-left-item {
  width: 25%;
  display: inline-block;
  height: .6rem;
  line-height: .6rem;
  text-align:center;
}

.mtc-item-right {
  width: 60%;
  font-size: 0;
}

.mtc-item-right-item {
  width: 20%;
  display: inline-block;
  height: .6rem;
  line-height: .6rem;
  text-align:center;
}
.mtc-item-right-order{
  color:#bebebe;
}
.mtc-item-toggle {
  width: 10%;
  display: inline-block;
  height: .6rem;
  line-height: .6rem;
  background: #328ed3;
}

.mtc-item-control {
  width: 10%;
  display: inline-block;  
}

.mtc-item-toggle-item {
  width: .37rem;
  height: .3rem;
  text-align: center;
  line-height: .3rem;
  background: #9cc7f1;
  color: #fff;
  cursor: default;
  opacity: 0;
}

.mtc-iti-active {
  background: #2570ba;
}

.student-rank-item {
  margin-left: .15rem;
}

.mtu-content-bar {
  width: .52rem;
  height: .03rem;
  background: #3283d3;
}

.mtu-content-name {
  margin: .2rem;
}

.mtu-content-bar {
  margin: 0 .2rem .2rem;
}

.mtu-content-section {
  width: 4rem;
  margin: 0 auto .2rem auto;
  border-bottom: 1px dashed #9c9c9c;

}

.mtu-content-section-title {
  height: .3rem;
  line-height: .3rem;
  margin-bottom: .1rem;
}

.mtu-content-section-title img {
  vertical-align: middle;
}

.mtu-content-section-item {
  margin-bottom: .1rem;
 
}

.mtu-csi-label {
  text-align: left;
   padding-left: .25rem;
}
.mtu-csi-detail{
  margin-top: .1rem;
   padding-left: .25rem;
}
.mtu-csi-detail-issue {
  margin-bottom: .1rem;
}

.main-table-tab {
  margin: .25rem 0 .5rem 0;
}

.mtt-item {
  color: #535353;
  margin: .2rem .5rem .5rem 0;
  padding-bottom: .05rem;
}

.mtt-item-active {
  color: #3283d3;
  border-bottom: 3px solid #3283d3;
}
.work-pages{
  margin-bottom: 20px;
}
.dialog-label {
  margin-bottom: 20px;
}
</style>
