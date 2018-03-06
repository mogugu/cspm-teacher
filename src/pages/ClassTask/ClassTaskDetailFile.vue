
<template>
  <div class="container">
    <class-nav
    v-if="classListFlag"
      :classlist="classList"
      @classToggle="handleClassToggle($event)"
      >
    </class-nav>
    <div class="class-task-detail-total-tag clear">
        <div class="class-task-tag-list inline-block relative fl">
            <span class="task-finish">已提交</span>
            <!-- <span class="down-before-after"></span> -->
            <p class="inline-block finished fs-16 fwb">
              <span>{{taskInfo.finishCount}}</span>人
            </p>
            <input @click="dialogVisible_finish=true" type="button" name="" value="查看名单" class="button" />
        </div>
        <div class="class-task-tag-list inline-block relative un-did fl">
            <span class="task-unfinish">未提交</span>
            <p class="inline-block unfinished fs-16 fwb">
              <span>{{taskInfo.unFinishCount}}</span>人
            </p>
            <input @click="dialogVisible_unfinish = true" type="button" name="" value="查看名单" class="button" />
        </div>
        <div class="class-task-tag-list class-task-tag-list-score inline-block relative fl">
            <span class="task-score">评分标准</span>
            <div class="task-score-desc TH-scroll fs-16">
              <p v-for="r in taskRequirement"><i>{{r.score}}分：</i><i>{{r.standard}}</i></p>
            </div>
        </div>
    </div>
    <div>
      <div v-if="workList==''" class="no-rank-of-end-paper-students">
        <img src="~assets/imgs/codeZero/coll/no-collected-work.png" alt="">
        <p class="fs-18 TH-f-c-default">没有你需要的学生作品呢！</p>
      </div>
      <table class="fs-16" cellspacing="0" cellpadding="0" border="none" width="100%" v-if="workList!=''">
        <thead>
          <tr>
            <th width="" class="student-rank">排名</th>
            <th width="">姓名</th>
            <th width="">班级</th>
            <th width="8%" class="cp t-align-center" :class="{'file-order':searchOption.orderType==7}" @click="orderType(7)">学生评分&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
            <th width="8%" class="cp t-align-center" :class="{'file-order':searchOption.orderType==6}" @click="orderType(6)">老师评分&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
            <th width="8%" class="cp t-align-center" :class="{'file-order':searchOption.orderType==5}" @click="orderType(5)">作品得分&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
            <th width="185">班级优秀</th>
            <th width="11%">学校优秀</th>
            <th width="8%" >平台优秀</th>
            <th>操作</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,$index) in workList" :key="$index">
            <td class="student-rank">
              <span v-if="(workPages.current-1)*10 + $index==0" class="inline-block first">{{$index+1}}</span>
              <span v-if="(workPages.current-1)*10 + $index==1" class="inline-block second">{{$index+1}}</span>
              <span v-if="(workPages.current-1)*10 + $index==2" class="inline-block third">{{$index+1}}</span>
              <span v-if="(workPages.current-1)*10 + $index>2" class="inline-block">{{(workPages.current-1)*10 + $index+1}}</span>
            </td>
            <td>{{item.username}}</td>
            <td>{{item.className}}</td>
            <td class="t-align-center">{{item.studentsScoring}}</td>
            <td class="t-align-center">{{item.teacherScoring}}</td>
            <td class="TH-f-c-orange t-align-center">{{item.worksScore}}</td>
            <!--班级优秀-->
            <td class="relative" @mouseleave="item.isToggleClass=false">
              <span class="cp" @mouseover="item.isToggleClass=true" >
                <span v-if="item.isExcellentInClass==1">是</span>
                <span v-if="item.isExcellentInClass==0">否</span>
                <span v-if="item.isExcellentInClass==2" class="Th-f-c-red-1">班级最差</span>
                <i  class="fa fa-caret-down toggle-fa-caret" aria-hidden="true" ></i>
              </span>
              <div class="toggle-controller absolute TH-card" v-if="item.isToggleClass">
                <span class="cp" v-if="item.isExcellentInClass==0" @click="classStatusToggle(item,$index,true,1)">设置为优秀</span>
                <span class="cp" v-if="item.isExcellentInClass==0" @click="classStatusToggle(item,$index,true,2)">设置为最差</span>
                <span class="cp" v-if="item.isExcellentInClass==1" @click="classStatusToggle(item,$index,false,1)">取消优秀</span>
                <span class="cp" v-if="item.isExcellentInClass==2" @click="classStatusToggle(item,$index,false,2)">取消最差</span>
              </div>
            </td>
            <!--学校优秀-->
            <td class="relative" @mouseleave="item.isToggleSchool=false">
              <span class="cp" @mouseover="item.isToggleSchool=true">
                <i v-if="item.isExcellentInAll==0">否</i>
                <i v-if="item.isExcellentInAll==3 || item.isExcellentInAll==4 || item.isExcellentInAll==5 || item.isExcellentInAll==6">是</i> <!--学校优秀已通过-->
                <i class="fs-color-green" v-if="item.isExcellentInAll==1">审核中</i>
                <i class="Th-f-c-red-1" v-if="item.isExcellentInAll==2">审核未通过</i>
                <i @click="isToggle==true" class="fa fa-caret-down toggle-fa-caret" aria-hidden="true" ></i>
              </span>
              <div class="toggle-controller absolute TH-card" v-if="item.isToggleSchool && item.isExcellentInAll==0">
                <span class="cp" @click="openPlatformGoodDialog(item, $index)">推荐为优秀</span>
              </div> 
            </td>
            <!--平台优秀-->
            <td class="relative " >
              <span v-if="item.isExcellentInAll==4 || item.isExcellentInAll==5 || item.isExcellentInAll==1 || item.isExcellentInAll==2 || item.isExcellentInAll==0 || item.isExcellentInAll==3">否</span> <!--平台优秀未通过或未审核-->
              <div v-if="item.isExcellentInAll==6">
                <i class="Th-f-c-red-1 absolute fa-star-title">{{item.excellenceLevel }}星作品</i>
                <div class="fa-star-container absolute">
                  <star-rating :size='.1' :score='item.excellenceLevel' :maxScore='5' :readOnly="true">
                  </star-rating>
                </div>
              </div>
            </td>
            <!--查看作品-->
            <td>
              <span class="inline-block file-control-title"><i @click="worksItemOpen(item)">查看作品</i></span>
            </td>
            <!--备注-->
            <td>
              <span v-if="!item.isMaxScoreDifference">--</span>
              <span class="Th-f-c-red-1" v-if="item.isMaxScoreDifference">学生和老师评分差异较大</span>
            </td>
            <!-- <td>
              <span class="inline-block file-control-title"><i @click="worksItemOpen(item)">{{item.worksTitle || ' ' | truncate(14, '...')}}</i></span>
              <div class="file-control inline-block">
                <span
                  @click="classStatusToggle(item, $index)"
                  :class="{'TH-button-small-warn':item.excellentInClass,'TH-button-small-default':!item.excellentInClass}"
                  class="inline-block file-control-item TH-button-small cp fs-14">班级优秀</span>
                <span
                  v-if="item.recommendStatus==0"
                  @click="openPlatformGoodDialog(item, $index)"
                  class="inline-block file-control-item TH-button-small-default TH-button-small cp fs-14">平台优秀</span>
                <span
                  v-if="item.recommendStatus==1"
                  @click="openPlatformGoodDialog(item, $index)"
                  :class="{'TH-button-small-primary':item.recommendStatus==2,'TH-button-small-orange':item.excellentInAll, 'TH-button-small-default':item.excellentInAll==-1}"
                  class="inline-block file-control-item TH-button-small-default TH-button-small cp fs-14">平台优秀(拒绝)</span>
                <span
                  v-if="item.recommendStatus==2"
                  @click="openPlatformGoodDialog(item, $index)"
                  class="inline-block file-control-item TH-button-small-primary TH-button-small cp fs-14">平台优秀(审核)</span>
                <span
                  v-if="item.recommendStatus==3"
                  @click="openPlatformGoodDialog(item, $index)"
                  class="inline-block file-control-item TH-button-small-orange TH-button-small cp fs-14">平台优秀(通过)</span>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content-main-work-pages" v-if="!searchOption.classId && workPages.total > 10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="workHandleCurrentChange"
        :current-page.sync="workPages.current"
        :page-size="searchOption.rows"
        :page-sizes="[10, 20, 40]"
        layout="sizes, prev, pager, next"
        :total="workPages.total">
      </el-pagination>
    </div>
    <!-- finished -->
    <el-dialog
      title="已完成名单"
      top="40%"
      :visible.sync="dialogVisible_finish"
      size="tiny">
      <span v-if="taskInfo.finishCount > 0" class="fs-14 dialog-student inline-block" v-for="student in taskInfo.finishedStudentsNames">{{student.username}}</span>
      <span v-if="taskInfo.finishCount == 0" class="fs-14">暂无学生</span>
    </el-dialog>
    <!-- unfinished -->
    <el-dialog
      title="未完成名单"
      top="40%"
      :visible.sync="dialogVisible_unfinish"
      size="tiny">
      <span v-if="taskInfo.unFinishCount == 0" class="fs-14">暂无学生</span>
      <span v-if="taskInfo.unFinishCount > 0" class="dialog-student inline-block fs-14" v-for="student in taskInfo.unFinishedStudentsNames">{{student.username}}</span>
    </el-dialog>
    <!-- 平台优秀作品推荐弹窗 -->
    <el-dialog
      title="推荐为学校优秀作品"
      top="40%"
      custom-class='dialog-width-630'
      :visible.sync="dialogGoodPlatformVisible"
      size="tiny">
      <p class="TH-f-c-default fs-16">推荐理由：</p>
      <ul class="file-dialog-good-reason">
        <li
          @click="fileReasonId = item.id"
          :key="index"
          v-for="(item,index) in fileGoodReason"
          class="inline-block fdgr-item TH-f-c-default fs-14 cp"
          :class="{'fdgr-item-active':fileReasonId==item.id}">
          {{item.name}}
        </li>
      </ul>
      <div class="file-dialog-good-container relative">
        <textarea class="file-dialog-good-desc" placeholder="说说它的优点吧, 这能大幅提高审核通过率哦!" v-model="fileReasonDesc"></textarea>
        <!-- <p class="file-dialog-good-noti TH-f-c-default fs-14">本学期内您仅剩余{{20}}次推荐机会</p> -->
        <p class="absolute file-dialog-good-piece fs-12 TH-f-c-default inline-block">不超过{{100}}字</p>
      </div>
      <div class="file-dialog-good-footer">
        <span @click="schoolStatusToggle()" class="TH-button-confirm inline-block">确定</span>
        <span @click="dialogGoodPlatformVisible=false" class="TH-button-cancel inline-block">取消</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import classNav from '../../components/classNav.vue'
import { ADDRESS } from '../../helpers/address'
import { callLoading, callToast, deepClone } from '../../helpers/helper'
import starRating from 'vue-star-rate'
export default {
  name: 'ClassTaskDetailFile',
  components: {
    'class-nav': classNav,
    starRating
  },
  created() {
    this.taskId = this.$route.query.tid
    this.worksId = this.$route.query.jid
    this.searchOption.taskId = this.taskId
    this.searchOption.worksId = this.worksId
    this.getTaskInfo()
    this.getMainTaskInfo()
    this.getWorkList()
    this.getTaskWorkRequirement()
  },
  data () {
    return {
      activeClass: '',
      taskInfo: {
        // finishedStudentsNames: [],
        // unFinishedStudentsNames: [],
        // classFinish: []
      },
      classList: [],
      classListFlag: false,
      taskRequirement: [],
      searchOption: {
        worksId: '',
        classId: '',
        taskId: '',
        orderType:'5', //作品得分排序
        page: 1,
        rows: 10
      },
      workPages: {
        total: 0,
        size: 10,
        current: 1,
      },
      workList: [],
      activeItem: {},
      student_work:'给妈妈一个特别的礼物',
      reson:'You are so curt.',
      dialogVisible_finish:false,
      dialogVisible_unfinish:false,
      dialogGoodPlatformVisible:false,
      fileList: [
        {

        }
      ],
      fileReasonId:1,
      fileReasonDesc: '',
      fileGoodReason: [
        {
          id:1,
          name:'质量很高'
        },
        {
          id:2,
          name:'很漂亮'
        },
        {
          id:3,
          name:'很用心'
        },
        {
          id:4,
          name:'速度很快'
        }
      ],
    }
  },
  methods: {
    worksItemOpen(item){
      window.open(ADDRESS.WORKS_OF_STUDENT_PREVIEW +'?taskId='+item.taskId+'&studentWorksId='+item.studentWorksId)
    },
    handleClassToggle(id) {
      //console.log('接收到啦~',id)
      this.taskInfo = {}
      this.activeClass = id
      this.searchOption.classId = id?id:''
      if (id == 0) {
        this.searchOption.rows = 10
      }
      else {
        this.searchOption.rows = 100000
      }
      this.searchOption.page = 1
      this.workPages.total = 0
      this.workPages.current = 1
      this.getTaskInfo()
      this.getWorkList()
    },
    // toggleGoodPlatform(item) {
    //   this.dialogGoodPlatformVisible = true
    //   console.log(item)
    // },
    openPlatformGoodDialog(item, $index) {
      // if (item.isExcellentInAll == 1) {
      //   // callToast('已被拒绝')
      //   callToast('已被拒绝','error')
      //   return
      // }
      // else if (item.recommendStatus == 2) {
      //   // callToast('审核中')
      //   callToast('审核中','warning')
      //   return
      // }
      // else if (item.recommendStatus == 3) {
      //   // callToast('已推荐')
      //   callToast('已推荐','warning')
      //   return
      // }
      this.dialogGoodPlatformVisible = true
      this.activeItem = item
      this.activeItem.$index = $index
    },
    workHandleCurrentChange(p) {
      this.searchOption.page = p
      this.getWorkList()
      console.log('page is',p)
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.workPages.current = 1
      this.getWorkList()
    },
    getTaskWorkRequirement() {
      this.$http.post(ADDRESS.WORK_TASK_REQUIREMENT_ADDR,{
        taskId: this.taskId,
        worksId:this.worksId
      })
      .then((res) => {
        if (res.body.code == 1) {
          this.taskRequirement = JSON.parse(res.body.data.worksEvaluationStandard)
        }
        else {
          // console.log('获取作品要求失败')
          callToast('获取作品要求失败','error')
        }
      }, (err) => {
        console.log(err)
      })
    },
    getTaskInfo() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_WORK_FINISH_CLASS,{
        taskId: this.taskId,
        worksId: this.worksId,
        classId: this.activeClass?this.activeClass:''
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.taskInfo = res.body.data.classFinish[0]

        }
        else {
          this.taskInfo = {}
          this.taskInfo.finishCount = 0
          this.taskInfo.unFinishCount = 0
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    getMainTaskInfo() {
      // callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_LIST_FINISHSTAT_ADDR,{
        taskId: this.taskId,
        classId: this.activeClass?this.activeClass:''
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.classList = res.body.data.classFinish
          this.classListFlag = true
        }

      }, (err) => {
        console.log(err)
      })
    },
    orderType(id){
      this.searchOption.orderType=id;
      this.getWorkList();
    },
    getWorkList() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.WORK_LIST_CLASS,this.searchOption)
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.workList = res.body.data.list
          for(var i=0;i<this.workList.length;i++){
            this.$set(this.workList[i],'isToggleClass',false);
            this.$set(this.workList[i],'isToggleSchool',false);
          }
          this.workPages.total = +res.body.data.total
        }
        else {
          this.workList = []
        }
      }, (err) => {
        this.workList = []
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    classStatusToggle(item, $index,value,type) {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.WORK_TOGGLE_GOOD_CLASS_ADDR, {
        studentWorkId: item.studentWorksId,
        set: value,
        type: type
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          callToast('操作成功','success')
          item.isExcellentInClass=res.body.data.isExcellentInClass;
          this.workList.splice($index,1,item)
          item.isToggleClass =false;
        }
        else {
          callToast('操作失败','error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('操作失败','error')
      })
    },
    schoolStatusToggle() {
      const _reason = this.fileGoodReason[this.fileReasonId-1].name +':'+ this.fileReasonDesc
      callLoading.activeLoading()
      this.$http.post(ADDRESS.WORK_TOGGLE_GOOD_SCHOOL_ADDR, {
        studentWorksId: this.activeItem.studentWorksId,
        recommendReason: _reason
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          callToast('操作成功','success')
         // this.activeItem.excellentInAll = !this.activeItem.excellentInAll
          this.activeItem.isExcellentInAll = 1//审核中
          this.workList.splice(this.activeItem.$index,1,this.activeItem)
          this.dialogGoodPlatformVisible = false
        }
        else {
          callToast(res.body.data,'error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('操作失败','error')
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 17rem;
  margin: 0 auto;
}
.t-align-center{
  text-align: center;
}
.class-task-detail-total-tag{
  margin-bottom: .15rem;
  padding-bottom: .15rem;
  padding-left: .2rem;
}

.class-task-tag-list{
  width: 3.3rem;
  height: .6rem;
  margin-right: .5rem;
  border-radius: .05rem;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  padding: .2rem .2rem;
}

.task-finish,
.task-unfinish,
.task-score{
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
  position: absolute;
  left: -.14rem;
  top: .34rem;
}

.un-did.class-task-tag-list:after{
  border-bottom:.1rem solid #ee4e4e;
}

.class-task-tag-list-score {
  width: 4.6rem;
}

.class-task-tag-list-score:after{
  border-bottom:.1rem solid #ff7316;
}

.task-finish{
  background-color: #4fb033;
}

.task-unfinish{
  background-color: #ee4e4e;
}

.task-score {
  background-color: #ff7316;
}

.class-task-tag-list .button{
  padding: .06rem .23rem;
  color: #fff;
  border-radius: .3rem;
  background-color: #3283d3;
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #32abd3, #3283d3);
  float: right;
  margin-top: .15rem;
}

.class-task-tag-list .button:hover{
  background-color: #3283d3;
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
  border-radius: 4px;
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

.edit-point-student{
  cursor: pointer;
  width: .2rem;
  height: .21rem;
  margin-top: .2rem;
  margin-right: .2rem;
}

.message-of-student{
  width: 4.9rem;
  height: .28rem;
  border-radius: .02rem;
  border:1px solid #ddd;
  padding-left: .1rem;
}
.toggle-fa-caret{
  color:#3283d3;
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

.file-list-name {
  width: 7.5rem;
}
.file-order{
  color: #dedede;
}
.file-control {
  margin-left: .5rem;
}

.file-control-title {
  color: #3498db;
}

.file-control-title i{
  font-style : normal;
  cursor : pointer;
  text-decoration: underline;
}

.file-control-item {
  /*width: .4rem;
  height: .4rem;
  line-height: .4rem;
  text-align: center;*/
  width: 1.2rem;
  margin-right: .4rem;
}
.toggle-controller{
  height: .3rem;
  line-height: .3rem;
  padding: 0 .1rem;
  top: 38px;
  z-index: 99;
  font-size: 16px;
  background-color: #fff;
}
.toggle-controller >span:hover{
  color: #3498db;
}
.fa-star-title{
  top: -10px;
}
.fa-star-container{
  top: 15px;
  font-size: 12px;
  color: #ff9c00;
}
/* .file-control-item-class {

}

.file-control-item-platform {

}

.file-control-item-platform-check {

} */

.file-dialog-good-reason {
  margin-top: .1rem;
}

.fdgr-item {
  width: .98rem;
  height: .28rem;
  border: 1px solid #ddd;
  line-height: .28rem;
  text-align: center;
  margin-right: .2rem;
  border-radius: 50px;
}

.fdgr-item-active {
  border: 1px solid #3283d3;
  color: #3283d3;
}

.file-dialog-good-desc {
  width: 5.6rem;
  margin: .2rem auto;
  height: 1.5rem;
  border: 1px solid #a4a4a4;
  resize: none;
  padding: .1rem;
}

.file-dialog-good-noti {
  margin: 0 0 .15rem 0;
}

.file-dialog-good-piece {
  top: 1.5rem;
  right: .2rem;
}

.file-dialog-good-footer {
  height: .55rem;
  line-height: .75rem;
  text-align: center;
  border-top: 1px solid #ddd;
}

.file-dialog-good-footer span {
  margin-right: .15rem;
}

.task-score-desc {
  width: 3.6rem;
  height: .7rem;
  margin-left: .85rem;
  line-height: .2rem;
  overflow-y: auto;
}

.dialog-student {
  margin: 0 .2rem .2rem 0;
}

.no-rank-of-end-paper-students{
  text-align: center;
}

.no-rank-of-end-paper-students img{
  width: 1.41rem;
  height: 1.49rem;
  margin-top: 1.2rem;
  margin-bottom: .3rem;
  margin-left: -.6rem;
}

</style>
