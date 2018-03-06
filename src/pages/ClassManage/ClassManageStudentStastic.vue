
<template>
  <div class="container">
    <div class="title-of-student-page fs-24 default-color">{{personPaperStatic.paperTitle}}</div>
    <div class=" fs-14 default-color messgae-of-paper">
      <span>作者：{{personPaperStatic.paperAuthor}}</span>
      <span>任务时间：{{personPaperStatic.taskStartTime}} 至  {{personPaperStatic.taskEndTime}}</span>
    </div>
    <div class="this-paper-all-nums">
        <ul class="clear">
          <li class="fl">
            <p class="fs-20 TH-f-c-orange"><span class="fs-40 fwb">{{personPaperStatic.finalScoreRate || 0}}</span></p>
            <p class="fs-16 default-color">最终得分率</p>
          </li>
           <li class="fl">
            <p class="fs-20 TH-f-c-link"><span class="fs-40 fwb">{{(personPaperStatic.totalCost) || '-'}}</span></p>
            <p class="fs-16 default-color">总耗时</p>
          </li>
           <li class="fl">
            <p class="fs-20 TH-f-c-link"><span class="fs-40 fwb">{{personPaperStatic.testTimes}}</span>次</p>
            <p class="fs-16 default-color">答题次数</p>
          </li>
           <li class="fl">
            <p class="fs-20 TH-f-c-link"><span class="fs-40 fwb">{{personPaperStatic.lowestScoreRate || 0}}</span></p>
            <p class="fs-16 default-color">最低得分率</p>
          </li>
           <li class="fl">
            <p class="fs-20 TH-f-c-link"><span class="fs-40 fwb">{{personPaperStatic.highestScoreRate || 0}}</span></p>
            <p class="fs-16 default-color">最高得分率</p>
          </li>
           <li class="fl">
            <p class="fs-20 TH-f-c-link"><span class="fs-40 fwb">{{(personPaperStatic.longestTime) || '-'}}</span></p>
            <p class="fs-16 default-color">最长耗时</p>
          </li>
           <li class="fl">
            <p class="fs-20 TH-f-c-link"><span class="fs-40 fwb">{{(personPaperStatic.shortestTime) || '-'}}</span></p>
            <p class="fs-16 default-color">最短耗时</p>
          </li>
        </ul>
    </div>
    <!-- All message of this testPaper -->
    <div class="message-of-test-paper">
      <p class="titile">
        <span @click="tabIndexChange(1)" class="title-right fs-22 titile-color fwb" :class="{'active':tabIndex==1}">历史记录</span>
        <span @click="tabIndexChange(2)" class="title-right fs-22 titile-color fwb" :class="{'active':tabIndex==2}">错题记录</span>
        <span @click="tabIndexChange(3)" class="title-right fs-22 titile-color fwb" :class="{'active':tabIndex==3}">知识点记录</span>
        <span @click="tabIndexChange(4)" class="title-right fs-22 titile-color fwb" :class="{'active':tabIndex==4}">推荐习题</span>
      </p>
      <!-- 历史纪录 -->
      <div class="history-test-paper-message" v-if="tabIndex==1">
          <div v-for="(item,_index) in historyArr">
            <div class="half-of-test-history right-margin relative" v-if="_index%2==0">
                <em class="inline-block" v-if="_index==0"></em>
                <img class="png-of-history" src="~assets/imgs/classManage/history.png" alt="">
                <div class="clear history-paper-one">
                    <div class="fl message-of-paper">
                      <p class="fs-16 default-color inline-block">得分率：
                        <span class="fwb right-color"><i class="fs-30">{{ item.scoreRate }}</i></span>
                      </p>
                       <p class="fs-16 default-color  inline-block">耗时：
                        <span class="fwb time-color"><i class="fs-30">{{(item.duration) || '-'}}</i></span>
                      </p>
                    </div>
                    <div class="fl time-change-div-show">
                        <p class="fs-18 default-color fwb">{{item.endTime.substring(10,16)}}</p>
                        <p class="fs-13 titile-color">{{item.endTime.substring(0,10)}}</p>
                    </div>
                </div>
            </div>
            <div class="half-of-test-history left-margin relative" v-if="_index%2!=0">
                <img class="png-of-history" src="~assets/imgs/classManage/history.png" alt="">
                <div class="clear history-paper-one">
                  <div class="fl time-change-div-show">
                      <p class="fs-18 default-color fwb">{{item.endTime.substring(10,16)}}</p>
                      <p class="fs-13 titile-color">{{item.endTime.substring(0,10)}}</p>
                  </div>
                  <div class="fl message-of-paper">
                    <p class="fs-16 default-color inline-block">得分率：
                      <span class="fwb right-color"><i class="fs-30">{{item.scoreRate}}</i></span>
                    </p>
                     <p class="fs-16 default-color  inline-block">耗时：
                      <span class="fwb time-color"><i class="fs-30">{{(item.duration) || '-'}}</i></span>
                    </p>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <!-- 错题统计 -->
      <div v-if="tabIndex==2&&paper.wrongQues==true">
        <div class="TF-temp-Arr-space">
          <img src="~assets/imgs/codeZero/manage/no-stastic.png" alt="">
          <p class="fs-18 TH-f-c-default">还没有错题统计呢！</p>
        </div>
      </div>
      <div class="about-paper-of-wrong-push" v-if="tabIndex==2&&paper.wrongQues==false">
        <div class="student-question-example fs-16 example-of-question" v-for="item in paperDetail.TYPE_CHOICE">
          <div class="question-tilte default-color"><span class="inline-block"></span>{{item.orderId + 1}}、 <div class="inline-block" v-html="item.questionText"></div></div>
          <div class="student-select-answer-list">
            <ul class="TH-f-c-default pcdc-item-answerlist fs-16">
              <li class="pcdc-item-answeritem" v-for="ans in item.answers">
                <p>{{ans.typeId | word-format}}. {{ans.answer}}</p>
              </li>
            </ul>
          </div>
          <div class="wrong-question-message relative">
            <div class="absolute question-list-knowleges-location fs-14">
              <span class="TH-f-c-dark-m">知识点：</span>
              <span v-for="(_item,index) in item.knowledges" v-if="index <= 3">{{index==0?'':'、'}}{{index == 3?'...':_item.knowledgeName}}</span>
            </div>
            <span class="fs-14 titile-color inline-block">答案：<i class="fwb new-color">{{item.answer}}</i></span>
            <span class="fs-14 titile-color inline-block">错误次数：<i class="fwb new-color">{{item.wrongTimes}}</i></span>
            <p class="fr">
              <span class="fs-14 titile-color inline-block">题型：<i class="default-color">{{item.questionType==1?'单选题':'判断题'}}</i></span>
              <span class="fs-14 titile-color inline-block">题类：<i class="default-color">{{item.exam}}</i></span>
              <span class="fs-14 titile-color inline-block">难度：
                <i class="el-icon-star-on star-color" v-for="i in item.difficultIndex"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- 知识点统计 -->
      <div v-if="tabIndex==3&&paper.knowlege==true">
        <div class="TF-temp-Arr-space">
          <img src="~assets/imgs/codeZero/manage/no-knowledge-stastic.png" alt="">
          <p class="fs-18 TH-f-c-default">还没有知识点统计呢！</p>
        </div>
      </div>
      <div class="knowlege-list-wrong clear" v-if="tabIndex==3&&paper.knowlege==false">
        <div class="fl know-U-sb" v-for="item in historyArr">
          <p class="fs-16 fwb default-color u-w-r-kown-name">{{item.knowledgeName}}</p>
          <p class="fs-14 titile-color u-w-test-nums">
            <span class="fs-22 fwb active-color">{{item.wrongTimes}}</span>
            次错误
          </p>
        </div>
      </div>
      <!-- 推荐习题 -->
      <div v-if="tabIndex==4&&paper.pushQues==true">
        <div class="TF-temp-Arr-space">
          <img src="~assets/imgs/codeZero/manage/no-introducted-test.png" alt="">
          <p class="fs-18 TH-f-c-default">还没有推荐习题统计呢！</p>
        </div>
      </div>
      <div class="about-paper-of-wrong-push" v-if="tabIndex==4&&paper.pushQues==false">
        <div class="student-question-example fs-16 example-of-question" v-for="item in paperDetail.TYPE_CHOICE">
            <div class="question-tilte default-color"><span class="inline-block"></span>{{item.orderId + 1}}、 <div class="inline-block" v-html="item.questionText"></div></div>
            <div class="student-select-answer-list">
              <ul class="TH-f-c-default pcdc-item-answerlist fs-16">
                <li class="pcdc-item-answeritem" v-for="ans in item.answers">
                  <p>{{ans.typeId | word-format}}. {{ans.answer}}</p>
                </li>
              </ul>
            </div>
            <div class="wrong-question-message relative" v-on:mouseover="item.isItem=true" v-on:mouseleave="item.isItem=false">
              <div class="absolute question-list-knowleges-location fs-14">
                <span class="TH-f-c-dark-m">知识点：</span>
                <span v-for="(_item,index) in item.knowledges" v-if="index <= 3">{{index==0?'':'、'}}{{index == 3?'...':_item.knowledgeName}}</span>
              </div>
              <span class="fs-14 default-color inline-block u-cur-button" :class="{'TH-f-c-link-green':item.isItem}" @click="item.isOpen=!item.isOpen">
                <img :src="!item.isItem?'static/imgs/source/jiexi.png':'static/imgs/source/jiexi-active.png'" alt="">
                <i>{{!item.isOpen?'查看解析':'收&nbsp;&nbsp;&nbsp;&nbsp;起'}}</i>
              </span>
              <p class="fr">
                <span class="fs-14 titile-color inline-block">题型：<i class="default-color">{{item.questionType==1?'单选题':'判断题'}}</i></span>
                <span class="fs-14 titile-color inline-block">题类：<i class="default-color">{{item.exam}}</i></span>
                <span class="fs-14 titile-color inline-block">难度：
                  <i class="el-icon-star-on star-color" v-for="i in item.difficultIndex"></i>
                </span>
              </p>
            </div>
            <div v-if="item.isOpen" class="tqlc-item-more">
              <p class="tqlc-item-more-answer TH-f-c-default fs-14 fwb">
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
      <div class="task-pages" v-if="total > rows&&tabIndex>1">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="rows"
          layout=" prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
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
      tabIndex:1,
      paperDetail: {
        TYPE_CHOICE: []
      },
      taskId:'216691836651520',
      paperId:'25',
      personId:'215519946157056',
      historyArr:[],
      wrongArr:[],
      knowlegeArr:[],
      pushPageArr:[],
      personPaperStatic:{
        finalAccuracy : 0,
        totalCost : 0,
        testTimes : 0,
        lowestAccuracy : 0,
        highestAccuracy : 0,
        longestTime : 0,
        shortestTime : 0,
        paperTitle : "",
        paperAuthor : "",
        taskStartTime : "",
        taskEndTime : ""
      },
      page:1,
      rows:5,
      total:100,
      paper:{
        history:false,
        wrongQues:false,
        knowlege:false,
        pushQues:false
      }
    }
  },
  created () {
    this.taskId = this.$route.query.taskId;
    this.paperId = this.$route.query.paperId;
    this.personId = this.$route.query.id;
    this.getLocalHistoryPage();
    this.getPersonLocalStatic()
  },
  methods: {
    getPersonLocalStatic(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.PERSON_TASK_PAPER_STATIC_CONT,{
        studentId : this.personId,
        paperId : this.paperId,
        taskId : this.taskId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.personPaperStatic = res.body.data;
        }else if(res.body.code == 0){
          this.paper.history = true;
          this.total = 0;
        }else{

        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    tabIndexChange(_index){
      this.tabIndex = _index;
      this.page = 1
      this.rows = 5
      if(_index==1){
        this.getLocalHistoryPage();
      }else if(_index==2){
        this.getLocalWrongPages();
      }else if(_index==3){
        this.rows = 16
        this.getKnowlegesPages();
      }else{
        this.getPushQuestionsList();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      if(this.tabIndex==1){
        this.getLocalHistoryPage();
      }else if(this.tabIndex==2){
        this.getLocalWrongPages();
      }else if(this.tabIndex==3){
        this.getKnowlegesPages();
      }else{
        this.getPushQuestionsList();
      }
    },
    getLocalHistoryPage(){//历史答题
      callLoading.activeLoading()
      this.$http.post(ADDRESS.STUDENT_HISTORY_PAPER_AND_TASK,{
        toUserId : this.personId,
        paperId : this.paperId,
        taskId : this.taskId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.historyArr = res.body.data.list;
        }else if(res.body.code == 0){
          this.paper.history = true;
          this.total = 0;
        }else{

        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    getLocalWrongPages(){//错误题
      callLoading.activeLoading()
      this.$http.post(ADDRESS.STUDENT_HISTORY_WRONG_AND_PAGE,{
        studentId : this.personId,
        paperId : this.paperId,
        taskId : this.taskId,
        page:this.page,
        rows:this.rows
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          const _this = this
          const _list = res.body.data.list
          _list.forEach(function(item,_index){
            item.answers = []
            item.orderId = (_this.page - 1)*_this.rows + _index
            const selectArr = item.options.split(/(?:^\{|",)"[^"]+":"|"\}$/g).slice(1,-1);
            const arr = ['0','1','2','3','4','5']
            const exam = ['','中考题','常考题','易错题','压轴题','模拟题']
            item.exam = exam[item.examType]
            if(item.questionType==1){
              for(var j=0;j<selectArr.length;j++){
                item.answers.push({typeId:arr[j],answer:selectArr[j]});
              }
            }else if(item.questionType==2){
              item.answers.push({typeId:'0',answer:'正确'})
              item.answers.push({typeId:'1',answer:'错误'})
            }
          })
          this.paperDetail.TYPE_CHOICE = _list
          this.paper.wrongQues = false
          this.total = parseInt(res.body.data.total)
        }else{
          this.paperDetail.TYPE_CHOICE = []
          this.paper.wrongQues = true
          this.total = 0
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    getKnowlegesPages(){//SRUDENT_HISTORY_KNOW_LEGE_PAHG
      callLoading.activeLoading()
      this.$http.post(ADDRESS.STUDENT_HISTORY_KNOW_LEGE_PAHG,{
        studentId : this.personId,
        paperId : this.paperId,
        taskId : this.taskId,
        page:this.page,
        rows:this.rows
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.paper.knowlege = false
          this.historyArr = res.body.data.list
        }else{
          this.historyArr = []
          this.paper.knowlege = true
          this.total = 0
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    getPushQuestionsList(){//推荐
      callLoading.activeLoading()
      this.$http.post(ADDRESS.STUDENT_PUSH_QUESTIONS_LIST,{
        studentId : this.personId,
        paperId : this.paperId,
        taskId : this.taskId,
        page:this.page,
        rows:this.rows
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          const _this = this
          const _list = res.body.data.list
          _list.forEach(function(item,_index){
            item.answers = []
            item.isOpen = false
            item.isItem = false
            item.orderId = (_this.page - 1)*_this.rows + _index
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
          this.paper.pushQues = false
          this.total = parseInt(res.body.data.total)
        }else{
          this.paper.TYPE_CHOICE = []
          this.paper.pushQues = true
          this.total = 0
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.container{
  width:17rem;
  margin:0 auto;
}

.default-color{
  color: #535353;
}

.title-of-student-page,
.messgae-of-paper{
  margin-bottom: .15rem;
}

.messgae-of-paper span{
  margin-right: .2rem;
}

div.this-paper-all-nums{
  padding: .3rem 1.5rem;
  border-radius: 4px;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
}

.this-paper-all-nums ul li{
  width: 2rem;
  height: 1rem;
}

.this-paper-all-nums ul li p.fs-20{
  text-align: center;
  margin: .15rem 0 .2rem 0;
}

.active-color{
  color:#3283d3;
}

.new-color{
  color: #fd8900;
}

.this-paper-all-nums ul li p.fs-16{
  text-align: center;
}

.message-of-test-paper{
  margin-top: .5rem;
}

.titile-color{
  color: #999999;
}

.title-right{
  margin-right: .35rem;
  cursor: pointer;
}

span.titile-color.fwb.active{
  font-size: .4rem;
  color: #535353 ;
}

div.history-test-paper-message{
  margin: .4rem auto;
  width: 9.4rem;
}

.half-of-test-history{
  width: 50%;
  height: 1.5rem;
  /*background-color: #fff;*/
}

.left-margin{
  margin-left: 50%;
  border-left:2px solid #ddd;
}

.right-margin em{
  position: absolute;
  background-color: #b2b2b2;
  width: .1rem;
  height: .1rem;
  top: -.1rem;
  right: -.05rem;
  border-radius: 50%;
}

.right-margin{
  border-right: 2px solid #ddd;
}

.png-of-history{
  position: absolute;
  width: .17rem;
  height: .17rem;
}

.left-margin .png-of-history{
  top: .86rem;
  left:-.1rem;
}

.right-margin .png-of-history{
  top: .86rem;
  right: -.1rem;
}

.left-margin,
.right-margin{
  padding-top: .4rem;
}

.knowlege-list-wrong{
  margin-top: .3rem;
  width: 17.4rem;
}

.history-paper-one{
  padding:.05rem .05rem;
}

.history-paper-one .message-of-paper{
  width: 3.5rem;
  height: 1.1rem;
  border-radius: .04rem;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 .02rem .05rem rgba(2,22,37,.3);
}

.history-paper-one .message-of-paper p.inline-block{
  width: 49%;
  line-height: 1.1rem;
  text-align: center;
}

.right-color{
  color: #fd8900;
}

.time-color{
  color:#3283d3;
}

.time-change-div-show{
  width: 1rem;
  text-align: center;
  padding-top: .3rem;
}

.time-change-div-show p:first-child{
  margin-bottom: .1rem;
}

div.example-of-question{
  margin-top: .3rem;
  padding: .1rem .2rem;
  background-color: rgba(255,255,255,.8);
  border-radius: .04rem;
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
}

.wrong-question-message{
  border-top: 1px solid #ddd;
}

.wrong-question-message p.fr span{
 line-height: .24rem;
}

.wrong-question-message span{
  margin-right: .3rem;
  padding:.15rem 0;
}

.wrong-question-message span.u-cur-button i{
  line-height: .24rem;
}

.wrong-question-message span i{
  font-style: normal;
}

.star-color{
  color: #ff7800;
  margin-right: .05rem;
}

.know-U-sb{
  width: 3.9rem;
  height: 1.05rem;
  background-color: rgba(255,255,255,.8);
  border-radius: .04rem;
  box-shadow: 0 .02rem .05rem rgba(2,22,37,.3);
  margin:.2rem .4rem .2rem  .05rem;
}

.u-w-r-kown-name{
  padding: .15rem .2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.u-w-test-nums{
  padding-left: .2rem;
  margin-top: .15rem;
}

.u-cur-button{
  cursor: pointer;
}

.u-cur-button img{
  vertical-align: sub;
  width: .18rem;
  height: .18rem;
  margin-right: .05rem;
}

.TF-temp-Arr-space{
  margin-top: 1rem;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.62rem;
  height: 1.62rem;
}

.tqlc-item-more-answer {
  margin-bottom: .15rem;
}

.TH-f-c-link-green {
  color: #3283d3;
}

/* 新增需求 */

.question-list-knowleges-location{
  left: 6.5rem;
  padding: .15rem 0;
}

.question-list-knowleges-location span{
  margin-right: 0;
}
</style>
