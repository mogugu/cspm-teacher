<template>
  <div class="container">
      <class-nav
        v-if="clFlag"
        :classlist="classList"
        @classToggle="handleClassToggle($event)"
        >
      </class-nav>
      <div class="class-task-detail-total-tag">
          <div class="class-task-tag-list inline-block relative">
              <span class="task-finish">已完成</span>
              <!-- <span class="down-before-after"></span> -->
              <p class="inline-block finished fs-16 fwb">
                <span>{{studentsList.finishedStudents}}</span>
                人
              </p>
              <input @click="dialogVisible_finish=true" type="button" name="" value="查看名单" class="button" />
          </div>
          <div class="class-task-tag-list inline-block relative un-did">
              <span class="task-unfinish">未完成</span>
              <p class="inline-block unfinished fs-16 fwb">
                <span >{{studentsList.unFinishedStudents}}</span>
                人
              </p>
              <input @click="dialogVisible_unfinish = true" type="button" name="" value="查看名单" class="button" />
          </div>
      </div>
      <!-- 学生排名 错题统计 -->
      <div class="tab-rank-and-wrong">
        <span class="fs-18 inline-block " :class="tab_type==1?'active':''" @click="AllQuestionStatic(1)">学生统计</span>
        <span class="fs-18 inline-block"  :class="tab_type==2?'active':''" @click="AllQuestionStatic(2)">错题统计</span>
      </div>
      <!-- table -->
      <div class="rank-of-student clear" v-if="tab_type==1">
        <div class="fl tabel-list-of-students">
          <div v-if="classContent.list==''" class="no-rank-of-end-paper-students">
            <img src="~assets/imgs/codeZero/task/no-student-rank.png" alt="">
            <p class="fs-18 TH-f-c-default">暂无学生排名！</p>
          </div>
          <table v-if="classContent.list!=''" class="fs-16" cellspacing="0" cellpadding="0" border="none" width="100%">
            <thead>
              <tr>
                <th width="" class="student-rank">排名</th>
                <th width="">姓名</th>
                <th width="">班级</th>
                <th width="">首次练习时长</th>
                <th width="">首次错误题数</th>
                <th width="">练习次数</th>
                <th width="" class="cp" :class="{'paper-order':order==2}" @click="orderType(2)">首次得分率&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
                <th width="" class="cp" :class="{'paper-order':order==1}" @click="orderType(1)">最终得分率&nbsp;<i class="fa fa-caret-down" aria-hidden="true"></i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,_index) in classContent.list.list" >
                <td class="student-rank">
                  <span class="inline-block" :class="{'first':(+table_page-1)*(+table_rows)+(+_index+1)==1,'second':(+table_page-1)*(+table_rows)+(+_index+1)==2,'third':(+table_page-1)*(+table_rows)+(+_index+1)==3}">{{(+table_page-1)*(+table_rows)+(+_index+1)}}</span>
                </td>
                <td>{{item.username}}</td>
                <td>{{item.className}}</td>
                <td>{{item.firstTestTime}}</td>
                <td>{{item.firstTestErrors}}</td>
                <td>{{item.completeTimes}}</td>
                <td>{{item.firstScoreRate}}</td>
                <td>{{item.lastScoreRate}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="fr img-student-rank">
            <!-- 空余面 -->
            <div v-if="!rugby_type" class="cicle-of-ranks-student" >
              <img src="~assets/imgs/codeZero/manage/no-stastic.png" alt="">
              <p class="fs-18 TH-f-c-default">暂无学生排名统计图！</p>
            </div>
            <!-- 非空 -->
            <div class="gan-lan-img-cicle relative" v-if="rugby_type">
                <img src="~assets/imgs/classTask/ganlantu.png" alt="">
                <div v-if="taskPaperPe.excellentSize!=0" class="gan-lan-color best" v-bind:style="{'height':(taskPaperPe.excellentSize/taskPaperPe.total*4.26+'rem'),'background-color':'#ee4e4e','line-height':(taskPaperPe.excellentSize/taskPaperPe.total*4.26+'rem')}">
                  {{(taskPaperPe.excellentSize/taskPaperPe.total*100).toFixed(1)}}%
                </div>
                <div v-if="taskPaperPe.goodSize!=0" class="gan-lan-color better" v-bind:style="{'height':(taskPaperPe.goodSize/taskPaperPe.total*4.26+'rem'),'background-color':'#ffbd49','line-height':(taskPaperPe.goodSize/taskPaperPe.total*4.26+'rem')}">
                  上{{(taskPaperPe.goodSize/taskPaperPe.total*100).toFixed(1)}}%
                  <span class="inline-block fs-14">优秀</span>
                </div>
                <div v-if="taskPaperPe.satisfactorySize!=0" class="gan-lan-color soso" v-bind:style="{'height':(taskPaperPe.satisfactorySize/taskPaperPe.total*4.26+'rem'),'background-color':'#f6d44c','line-height':(taskPaperPe.satisfactorySize/taskPaperPe.total*4.26+'rem')}">
                  下{{(taskPaperPe.satisfactorySize/taskPaperPe.total*100).toFixed(1)}}%
                  <span class="inline-block fs-14">平均</span>
                </div>
                <div v-if="taskPaperPe.failSize!=0" class="gan-lan-color last" v-bind:style="{'height':(taskPaperPe.failSize/taskPaperPe.total*4.26+'rem'),'background-color':'#6fbb3f','line-height':(taskPaperPe.failSize/taskPaperPe.total*4.26+'rem')}">
                  {{(taskPaperPe.failSize/taskPaperPe.total*100).toFixed(1)}}%
                  <span class="inline-block fs-14">较差</span>
                </div>
            </div>
        </div>
      </div>
      <!-- 错题统计 -->
      <div class="wrong-of-student" v-if="tab_type==2">
        <div class="TF-temp-Arr-space" v-if="paperDetail.TYPE_CHOICE==''" style="box-shadow:none">
          <img src="~assets/imgs/codeZero/manage/no-stastic.png" alt="">
          <p class="fs-18 TH-f-c-default">没有错题呢！</p>
        </div>
        <div class="student-question-example fs-16" v-if="paperDetail.TYPE_CHOICE!=''" v-for="(item,_index) in paperDetail.TYPE_CHOICE">
          <div class="question-tilte">
            <span class="question-index">{{item.orderId + 1}}、</span>
            <div class="inline-block" v-html="item.questionText"></div>
          </div>
          <div class="student-select-answer-list">
            <ul class="TH-f-c-default pcdc-item-answerlist fs-16">
              <li class="pcdc-item-answeritem" v-for="ans in item.answers">
                <p>{{ans.typeId | word-format}}. {{ans.answer}}</p>
              </li>
            </ul>
          </div>
          <div class="student-question-all-message clear">
              <div class="self-make-button fl fs-14" @click="item.isOpen=!item.isOpen">
                {{!item.isOpen?'查看解析':'收&nbsp;&nbsp;&nbsp;&nbsp;起'}}
              </div>
              <div class="self-make-button fl fs-14" @click="SearchWrongStudents(item,item.questionId,_index)">
                {{!item.isAdd?'错误学生':'收&nbsp;&nbsp;&nbsp;&nbsp;起'}}
              </div>
              <span class="inline-block fs-14 level-one">题型：<i class="rela-color">{{item.questionType==1?'单选题':(item.questionType==2?'判断题':'word操作题')}}</i></span>
              <span class="inline-block fs-14 level-one">题类：<i class="rela-color">{{item.exam}}</i></span>
              <span class="inline-block fs-14 level-two">
                难度：
                <i class="fa fa-star" aria-hidden="true" v-for="i in item.difficultIndex"></i>
                <!-- <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i> -->
              </span>
              <span class="inline-block fs-14 level-three">错误率：<i class="rela-color">{{item.wrongRate}}%</i></span>
              <!-- <span class="inline-block fs-14 level-three">最终正确率：<i class="rela-color">60%</i></span>
              <span class="inline-block fs-14 level-three">最终正确率：<i class="rela-color">80%</i></span> -->
          </div>
            <!-- 解析 -->
          <div v-if="item.isAdd" class="tqlc-item-more">
            <p class="tqlc-item-more-answer TH-f-c-default fs-14 fwb">
              <span v-if="item.errorUsername==''">对，没有错的学生！</span>
              <span v-if="item.errorUsername!=''">{{item.errorUsername}}</span>
            </p>
          </div>
          <div v-if="item.isOpen" class="tqlc-item-more">
            <p class="tqlc-item-more-answer TH-f-c-default fs-14 fwb" v-if="item.questionType!=10">
              <span>答案：</span>
              <span class="TH-f-c-link">{{item.answer}}</span>
            </p>
            <div class="tqlc-item-more-answer TH-f-c-default fs-14 fwb">
              <span>解析：</span>
              <div class="inline-block" v-html="item.analysis"></div>
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
        <!-- <span v-if="!form.classTotal">班上没有学生吧！</span> -->
        <span v-if="studentsList.finishedStudentsNames==''">没有未完成呢！</span>
        <span class="dialog-student inline-block" v-if="studentsList.finishedStudentsNames!=''" v-for="item in studentsList.finishedStudentsNames">{{item.username}}</span>
      </el-dialog>
      <!-- unfinished -->
      <el-dialog
        title="未完成名单"
        top="40%"
        :visible.sync="dialogVisible_unfinish"
        size="tiny">
        <!-- <span v-if="!form.classTotal">班上没有学生吧！</span> -->
        <span v-if="studentsList.unFinishedStudentsNames==''">没有人完成呢！</span>
        <span  class="dialog-student inline-block" v-if="studentsList.unFinishedStudentsNames!=''" v-for="item in studentsList.unFinishedStudentsNames">{{item.username}}</span>
      </el-dialog>
      <!-- pages and rows -->
      <el-pagination
        v-if="!activeClassId && form.total>10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="table_page"
        :page-size="table_rows"
        :page-sizes="[10, 20, 40]"
        layout="sizes, prev, pager, next"
        :total="form.total">
      </el-pagination>

  </div>
</template>

<script>

import classNav from '../../components/classNav.vue'
import { callLoading } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'

export default {
  name: 'ClassTaskDetailPaperMore',
  components: {
    'class-nav': classNav
  },
  data () {
    return {
      tab_type:1,
      rugby_type:false,
      dialogVisible_finish:false,
      dialogVisible_unfinish:false,
      dialogFormVisible:false,
      form:{
        name:'',
        region:'',
        total:0,
        classTotal:false
      },
      classList: [],
      clFlag: false,
      table_page:1,
      table_rows:10,
      classContent:{list:[]},
      activeClass: 0,
      activeClassId:'',
      taskId:'',
      paperId:'',
      paperDetail: {
        TYPE_CHOICE: []
      },
      studentsList:{
        classFinish:[{
          finishCount:0,
          unFinishCount:0,
          finishedStudentsNames:[],
          unFinishedStudentsNames:[]
        }]
      },
      taskPaperPe:{
        excellentSize:10,
        goodSize:10,
        satisfactorySize:10,
        failSize:10,
        total:40
      },
      order: '1'
    }
  },
  mounted(){
    //this.classList = [];
  },
  created () {
    this.taskId = this.$route.query.tid || 0;
    this.paperId = this.$route.query.pid || 0;
    this.getAllClassList()
    this.getUnFinishedStudent()
  },
  methods: {
    handleClassToggle(_event){
      this.table_page = 1
      if(_event==0){
        this.table_rows = 10
        this.activeClassId = ''
        this.getUnFinishedStudent()
        this.rugby_type = false
        if(this.tab_type == 1){
          this.getClassAboutPaper()//查表
        }else{
          this.getAllWrongQuestion()//查错题
        }
      }else{
        this.table_rows = 10000
        this.activeClassId = _event
        this.getUnFinishedStudent()
        if(this.tab_type == 1){
          this.getClassAboutPaper()//查表
          this.getRugbyStatic()//查橄榄图
        }else{
          this.getAllWrongQuestion()//查错题
        }
      }
    },
    getUnFinishedStudent(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_LIST_FINISHSTAT_ADDR,{
       taskId:this.taskId,
       classId:this.activeClassId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.studentsList = res.body.data;
        }else{
          this.studentsList.finishedStudents = 0
          this.studentsList.unFinishedStudents = 0
          this.studentsList.finishedStudentsNames = []
          this.studentsList.unFinishedStudentsNames = []
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    getAllClassList(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_PAPER_BY_CLASSID,{
       taskId:this.taskId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.classList = res.body.data
          this.clFlag = true
          this.activeClassId = '';
          this.getClassAboutPaper()
          // this.getRugbyStatic()
          // this.rugby_type = false
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    getRugbyStatic(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.TASK_GET_RUGBY_CLASS_PAPER,{
        taskId:this.taskId ,
        paperId:this.paperId,
        classId:this.activeClassId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.rugby_type = true
          this.taskPaperPe = res.body.data
          this.taskPaperPe.total = res.body.data.excellentSize + res.body.data.goodSize + res.body.data.satisfactorySize + res.body.data.failSize
        }else{
          this.rugby_type = false
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    orderType(id){
       this.order=id
       this.getClassAboutPaper()
    },
    getClassAboutPaper(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SEARCH_CLASS_ABOUT_TASKS,{
        taskId:this.taskId ,
        paperId:this.paperId,
        classId:this.activeClassId,
        orderType: this.order,
        page:this.table_page,
        rows:this.table_rows
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.form.total = parseInt(res.body.data.list.total)
          this.classContent = res.body.data;
          this.form.classTotal = false
        }else if(res.body.code == 0){
          this.form.total = 0
          this.form.classTotal = true
          this.classContent.list = []
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    AllQuestionStatic(_item){
      this.tab_type = _item
      this.table_page = 1
      if(_item == 1){
        this.getClassAboutPaper()//查表
        // this.getRugbyStatic()//查橄榄图
        if(this.tab_type == 1){
          this.getRugbyStatic()//查橄榄图
        }
      }else{
        this.getAllWrongQuestion()
      }
    },
    getAllWrongQuestion(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_PAPER_TASK_COR_RATE,{
        taskId:this.taskId ,
        paperId:this.paperId,
        classId:this.activeClassId,
        page:this.table_page,
        rows:this.table_rows
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.form.total = parseInt(res.body.data.total)
          const _this = this
          const _list = res.body.data.list
          _list.forEach(function(item,_index){
            item.isOpen = false
            item.isAdd = false
            item.answers = []
            item.orderId = (_this.table_page - 1)*_this.table_rows + _index
            const selectArr = item.options.split(/(?:^\{|",)"[^"]+":"|"\}$/g).slice(1,-1);
            const arr = ['0','1','2','3','4','5']
            const exam = ['','中考题','常考题','易错题','压轴题','模拟题']
            item.exam = exam[item.examType]
            if(item.questionType==1){
              for(var j=0;j<selectArr.length;j++){
                item.answers.push({typeId:arr[j],answer:selectArr[j]});
              }
            }else if(item.questionType==2){
              item.answers.push(
                {typeId:'0',answer:'正确'},
                {typeId:'1',answer:'错误'})
            }
          })
          this.paperDetail.TYPE_CHOICE = _list
        }else{
          this.paperDetail.TYPE_CHOICE = []
          this.form.total = 0
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    handleSizeChange(val) {
      this.table_page = 1
      this.table_rows = val
      this.getAllClassList()
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.page = val;
      if(this.tab_type == 1){
        this.getClassAboutPaper();
      }else{
        this.getAllWrongQuestion()
      }
    },
    SearchWrongStudents(item,_qid,_index){
      item.isAdd = !item.isAdd
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_WRONG_QUESTION_STUDENT,{
        taskId:this.taskId ,
        classId:this.activeClassId,
        questionId:_qid
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          item.errorUsername = res.body.data.errorUsers
        }else if(res.body.code == 0){
          item.errorUsername = ''
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    eventHandlerScroll() {
      console.log(window.scrollY)
      if (window.scrollY > 400) {
        $('.img-student-rank').css({
          'top': window.scrollY - 400
        })
      }
      else {
        $('.img-student-rank').css({
          'top': 'auto'
        })        
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.eventHandlerScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.eventHandlerScroll)
  }
}
</script>

<style scoped>
.container{
  width: 17rem;
  margin: 0 auto;
}

.class-task-detail-total-tag{
  margin-bottom: .3rem;
  /*overflow: auto;*/
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
.question-index{
  vertical-align: top;
}
.task-finish,
.task-unfinish{
  position: absolute;
  display: inline-block;
  width: 1rem;
  height: .35rem;
  line-height: .35rem;
  text-align: center;
  color: #fff;
  left: -.15rem;
  top: .2rem;
}
.paper-order{
  color: #dedede;
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
  top: .53rem;
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
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #32abd3, #3283d3);
  float: right;
  margin-top: .15rem;
}

.class-task-tag-list .button:hover{
  background-col or: #3283d3;
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

.rank-of-student{
  padding: .05rem .05rem .2rem .05rem;
}

table{
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  width: 12.2rem;
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

.tab-rank-and-wrong{
  padding-top: .1rem;
  margin-bottom: .2rem;
  border-bottom: 1px solid #ddd;
}

.tab-rank-and-wrong span{
  padding: .1rem .1rem;
  border-bottom: 3px solid transparent;
  cursor: pointer;
}

.tab-rank-and-wrong span.active{
  border-bottom-color: #3283d3;
  color: #3283d3;
}

.img-student-rank{
  width: 4.25rem;
  height: 6.4rem;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  background-color: #fff;
  position: relative;
}

.img-student-rank .gan-lan-img-cicle{
  width: 1.52rem;
  height: 4.26rem;
  margin: 1.07rem auto;
  /*overflow: hidden;*/
  /*background-color: red;*/
}

.img-student-rank .gan-lan-img-cicle img{
  width: 1.52rem;
  height: 4.26rem;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}

.img-student-rank .gan-lan-img-cicle div{
  border-bottom: .03rem solid #e9e9e9;
  color: #fff;
  font-weight: bold;
  text-align: center;
  position: relative;
}

.img-student-rank .gan-lan-img-cicle div span.inline-block{
  width: 1.78rem;
  color: #139ae5;
  text-align: left;
  position: absolute;
  left: -1rem;
  padding-left: .1rem;
  line-height: .24rem;
  border-bottom: .03rem solid #e9e9e9;
  top: -.27rem;
  z-index: 100;
}

.img-student-rank .gan-lan-img-cicle div:last-child{
  border-bottom: none;
}

.wrong-of-student{
   webkit-border-radius: 4px;
 -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  -moz-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  min-height: 5rem;
  margin-bottom: .2rem;
  background-color: #fff;
  padding: .3rem .3rem;
}

.el-button.el-button--default{
  height: .3rem;
  line-height: .26rem;
  padding:  0 0;
  background-color: #fff;
  border:.02rem solid #ddd;
  border-radius: .2rem;
  font-size: .14rem;
  margin-right: .8rem;
}

.el-button.el-button--default:hover{
  background-color: #fff;
  color: #3283d3;
  border:.02rem solid #3283d3;
}

.student-question-all-message span.inline-block{
  color: #878787;
  line-height: .3rem;
  margin-right: .1rem;
}

.student-question-all-message span.inline-block i.rela-color{
  color:#535353;
}

.student-question-all-message span.inline-block i.fa.fa-star{
  color: #ff7800;
}

.student-question-all-message span.inline-block.level-one{
  width: 1.4rem;
}

.student-question-all-message span.inline-block.level-two{
  width: 1.6rem;
}

.student-question-all-message span.inline-block.level-three{
  width: 2rem;
}

.jie-xi-all-mes{
  margin-top: .3rem;
  margin-bottom: .1rem;
  line-height: .24rem;
}

.no-rank-of-end-paper-students{
  width: 12.2rem;
  height: 6.4rem;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  text-align: center;
}

.no-rank-of-end-paper-students img{
  width:1.81rem;
  height: 1.46rem;
  margin-top: 1.2rem;
  margin-bottom: .3rem;
  margin-left: -.6rem;
}

.cicle-of-ranks-student {
  margin-top: 1.2rem;
  text-align: center;
}

.cicle-of-ranks-student img{
  width: 1.62rem;
  height: 1.62rem;
  margin-bottom: .6rem;
}

.dialog-student {
  margin: 0 .2rem .2rem 0;
}

.tqlc-item-more {
  margin-top: .2rem;
}

.tqlc-item-more-answer {
  margin-bottom: .15rem;
}
</style>
