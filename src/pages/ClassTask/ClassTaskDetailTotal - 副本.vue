<template>
  <div class="container">
      <!-- <div class="class-task-detail-total-nav fs-22">
        <span @click="activeClass = item.id" :class="{'active':item.id == activeClass}" v-for="item in classList">{{item.name}}</span>
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
      </div>
      <!-- table -->
      <div v-if="studentsList==''" class="no-tasks-list-publish TH-card">
        <img src="~assets/imgs/codeZero/task/no-finished-student.png" alt="">
        <p class="fs-18 TH-f-c-default">还没有学生完成任务呢！</p>
      </div>
      <div class="main-table clear">
        <div class="main-table-content fl">
          <table v-if="studentsList!=''" class="fs-16" cellspacing="0" cellpadding="0" border="none" width="100%">
            <thead>
              <tr>
                <th width="" class="student-rank">排名</th>
                <th width="">姓名</th>
                <th width="">班级</th>
                <th width="">试卷正确率</th>
                <!-- <th width="15%">作品</th> -->
                <th width="7%">视频</th>
                <th width="7%">附件</th>
                <th width="">作品得分</th>
                <th width="">作品标签</th>
                <th width="">任务得分</th>
                <th width="">得分调整</th>
                <th width="15%">得分调整备注</th>
                <th width="6%">最终得分</th>
              </tr>
            </thead>
            <tbody>
              <tr @mouseenter="showAjust(item, $index, true)" @mouseleave="showAjust(item, $index, false)" :key="$index" v-for="(item,$index) in studentsList">
                <td class="student-rank">
                  <span v-if="(workPages.current-1)*10 + $index==0" class="inline-block first">{{$index+1}}</span>
                  <span v-if="(workPages.current-1)*10 + $index==1" class="inline-block second">{{$index+1}}</span>
                  <span v-if="(workPages.current-1)*10 + $index==2" class="inline-block third">{{$index+1}}</span>
                  <span v-if="(workPages.current-1)*10 + $index>2" class="inline-block">{{(workPages.current-1)*10 + $index+1}}</span>
                </td>
                <td>{{item.username}}</td>
                <td>{{item.className}}</td>
                <td>{{item.lastAccuracyRate}}</td>
                <!-- <td>{{item.worksTitle}}</td> -->
                <td width="7%">{{item.videoFinished}}</td>
                <!-- <td v-if="item.includeVideo">{{item.videoFinished?'已观看':'未观看'}}</td> -->
                <td width="7%">{{item.attachmentFinished}}</td>
                <td>{{item.workScore}}</td>
                <td><i v-if="item.excellentInAll">平台优秀</i><i v-if="item.excellentInClass && !item.excellentInAll">班级优秀</i></td>
                <td>{{item.systemScore}}</td>
                <td>{{item.adjustedScore}}</td>
                <td width="15%">{{item.adjustmentReason }}</td>
                <td width="6%">
                  {{+item.systemScore + (+item.adjustedScore)}}
                  <img v-if="item.isShowAjust"  @click="worksItemOpen(item)" class="edit-point-student" src="~assets/imgs/classTask/view.png" alt="view">
                  <img v-if="item.isShowAjust"  @click="openScoreDialog(item)" class="edit-point-student" src="~assets/imgs/classTask/edit-point.png" alt="edit-point">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="main-table-user fr TH-card">
                  
          <p class="main-table-user-no fs-16">
            点击左侧&nbsp;&nbsp;
            "<img class="" src="~assets/imgs/classTask/view.png" alt="view">"
            &nbsp;&nbsp;查看学生任务详情
          </p>
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
      <div class="work-pages" v-if="workPages.total > 10 && studentsList !='' ">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="workPages.current"
          :page-size="workPages.size"
          layout=" prev, pager, next"
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
              <label for=""class="inline-block fl">调整得分：</label>
              <div class="fl">
                <img @click="ajustStudentInfo.adjustedScore+=10" class="img-mid" src="~assets/imgs/classTask/add-point.png" alt="add-point">
                <img @click="ajustStudentInfo.adjustedScore-=10" class="img-mid" src="~assets/imgs/classTask/minus-point.png" alt="add-point">
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
              <div class="fl"><span class="grade-new fwb fs-40">{{ajustStudentInfo.finalScore}}</span></div>
          </li>
        </ul>
         <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateScore()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>

import classNav from '../../components/classNav.vue'
import { ADDRESS } from '../../helpers/address'
import { callLoading, callToast, deepClone } from '../../helpers/helper'

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
      taskInfo: {},
      workPages: {
        total: 0,
        current: 1,
        size: 10
      },
      studentSearchOption: {
        taskId: '',
        classId: '',
        status: 0,
        page: 1,
        rows: 10,
      },
      studentsList: [],
      ajustScore: {
        userTaskId: '',
        studentId: '',
        adjustScore: '',
        adjustReason: ''
      },
      ajustStudentInfo: {}
    }
  },
  created () {
    this.taskId = this.$route.query.id
    this.studentSearchOption.taskId = this.taskId
    this.getTaskInfo()
    this.getStudent()
  },
  methods: {
    worksItemOpen(item){
      if(!item.includeWork){
        callToast('此任务未添加作品','warning')
        return
      }
      if(item.includeWork&&item.studentWorksId==null){
        callToast('未上传作品','warning')
      }
      else{
        window.open(ADDRESS.WORKS_OF_STUDENT_PREVIEW +'?taskId='+item.taskId+'&workId='+item.studentWorksId)
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.studentSearchOption.page = val
      this.getStudent()
    },
    editGrade(){

    },
    handleClassToggle(id) {
      console.log('接收到啦~',id)
      this.activeClass = id
      this.studentSearchOption.page = 1
      this.studentSearchOption.classId = this.activeClass?this.activeClass:''
      this.workPages.current = 1
      this.getTaskInfo()
      this.getStudent()
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
        }
        else {
          this.taskInfo = {
            finishedStudentsNames: [],
            unFinishedStudentsNames: []
          }
          console.log('asdasda');
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
    showAjust(item, index, type) {
      item.isShowAjust = type
      this.studentsList.splice(index,1,item)
      console.log(item)
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
    }
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

.class-task-tag-list .button{
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
  height: .4rem;
  line-height: .4rem;
  text-align: left;
}

table tbody td{
  height: .6rem;
  line-height: .6rem;
}

table tbody tr:nth-child(odd){
  background-color: #fff;
}

.student-rank{
  padding-left: .35rem;
}

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
}

.main-table-user-no {
  position: absolute;
  top: 30%;
  text-align: center;
  left: 25%;
}
</style>
