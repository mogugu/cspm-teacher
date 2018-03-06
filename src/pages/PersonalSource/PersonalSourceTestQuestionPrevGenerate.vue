
<template>
  <div class="container">
    <div class="work-temp-top clear">
      <div @click="activityOption.showChoiceFlag = !activityOption.showChoiceFlag" class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl">
        <img class="wtt-choice-icon" src="~assets/imgs/common/shaixuan.png" alt="shaixuan">
        <!-- <span>已涵盖 <i class="TH-f-c-link fs-26 fwb">{{$store.coverTree.tq.count}}</i> 个知识点 </span> -->
        <span>知识点筛选</span>
      </div>
      <div class="TH-card test-question-select fl">
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-13 tqsi-title">题型</p>
          <my-dropdown @choosed="Question_Type($event)" :dropdownData="$store.dropdown.questionType"></my-dropdown>
        </div>
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-13 tqsi-title">题类</p>
          <my-dropdown @choosed="Exam_Type($event)" :dropdownData="$store.dropdown.examType"></my-dropdown>
        </div>
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-13 tqsi-title">难度</p>
          <my-dropdown @choosed="Diffent_Type($event)" :dropdownData="$store.dropdown.diffcult"></my-dropdown>
        </div>
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-13 tqsi-title">来源</p>
          <my-dropdown @choosed="Come_type($event)" :dropdownData="$store.dropdown.examMonther"></my-dropdown>
        </div>
      </div>
    </div>
    <mutil-select class="work-temp-top-mutil-select absolute"
      v-if="activityOption.showChoiceFlag"
      :selectList="selectOption"
      type="mutil"
      @choiceActive="handleChoice($event)"
      @choiceDeactive="removeSelect($event)"
      @closeSelect="activityOption.showChoiceFlag = false"></mutil-select>
      <div v-for="(bar, $index) in activityOption.choosenActivity" class="work-temp-top-mutil-select-item inline-block relative" v-if="activityOption.choosenActivity.length>0">
        <span class="wtt-msi-name fl">{{bar.label}}</span>
        <div @click="removeSelect(bar, $index)" class="wtt-msi-icon fl relative">
          <img class="absolute" src="~assets/imgs/classTask/search-cancel.png" alt="cancel">
        </div>
      </div>

    <div class="test-question-list">
      <div class="test-question-list-label clear">
        <p class="fl tqll-left fs-13 TH-f-c-default">
          <span class="cp" @click="changeOrderType(0)">时间 <i>↑</i> </span>
          <span class="cp" @click="changeOrderType(1)">组卷次数 <i>↑</i> </span>
        </p>
        <p class="fr tqll-right fs-13 TH-f-c-warn">{{total}}个</p>
      </div>
      <div class="test-question-list-container">
        <div class="TF-temp-Arr-space" v-if="questionList==''">
          <img src="~assets/imgs/codeZero/coll/no-colleted-test.png" alt="">
          <p class="fs-18 TH-f-c-default">没有你需要的试题呢！</p>
        </div>
        <div v-for="(item,_index) in questionList" class="tqlc-item TH-card fs-16 TH-f-c-default">
          <div class="tqlc-item-title">
            <p class="inline-block tqlc-item-title-index">{{(+param_true.page-1)*(+param_true.rows)+(+_index+1)}}、</p>
            <div class="inline-block tqlc-item-title-more" v-html='item.questionText'></div>
          </div>
         <!--  <p class="tqlc-item-title" v-if="item.subQuestions!=''" v-for="(title_,index_) in item.subQuestions">（{{index_+1}}）、{{title_.questionText}}</p> -->
          <ul class="tqlc-item-list">
            <li class="tqlc-item-detail" v-for="select in item.selectArr">{{select.type}}．{{select.value}} </li>
          </ul>
          <div class="tqlc-item-info clear">
            <div class="tqlc-item-info-left fl TH-f-c-default fs-14">
              <span @click="item.isOpen = !item.isOpen" class="cp tqlc-iil-icon">
                <img class="tqlc-iil-icon-img" :src="!item.isOpen?'static/imgs/source/jiexi.png':'static/imgs/source/jiexi-active.png'" alt="jiexi">
                <i v-show="!item.isOpen">查看解析</i>
                <i v-show="item.isOpen">收起解析</i>
              </span>
              <span v-if="$store.user.userId != item.teacherId" @click="handleFav(item,item.questionId,item.favorite)" class="cp tqlc-iil-icon">
                <img class="tqlc-iil-icon-img" :src="!item.favorite?'static/imgs/source/collect.png':'static/imgs/source/collect-active.png'" alt="jiexi">
                <i v-show="!item.favorite">收藏</i>
                <i v-show="item.favorite">已收藏</i>
              </span>
              <span
               :class="{
                 'tqlc-iil-icon-out':item.addType,
                 'tqlc-iil-icon-in':!item.addType,
                 }"
               @click="handlePaper(item,item.questionId,item.addType,item.questionType)" class="cp tqlc-iil-icon TH-f-c-white">
                <!-- <img class="tqlc-iil-icon-img" :src="!item.addType?'static/imgs/source/add.png':'static/imgs/source/add-active.png'" alt="add"> -->
                <i :class="{'fa-plus': !item.addType,'fa-minus': item.addType}" class="fa TH-f-c-white"></i> 
                <i v-show="!item.addType">添加到组卷</i>
                <i v-show="item.addType">移除</i>
              </span>
            </div>
            <div class="tqlc-item-info-right fr fs-14 TH-f-c-fade">
              <span>题型：
                <i class="tqlc-iir-detail TH-f-c-default" v-if="item.questionType==1">单选题</i>
                <i class="tqlc-iir-detail TH-f-c-default" v-if="item.questionType==2">判断题</i>
                <i class="tqlc-iir-detail TH-f-c-default" v-if="item.questionType==10">word操作题</i>
              </span>
              <span>题类：
                  <i class="tqlc-iir-detail TH-f-c-default" v-if="item.examType==1">中考题</i>
                  <i class="tqlc-iir-detail TH-f-c-default" v-if="item.examType==2">常考题</i>
                  <i class="tqlc-iir-detail TH-f-c-default" v-if="item.examType==3">易错题</i>
                  <i class="tqlc-iir-detail TH-f-c-default" v-if="item.examType==4">压轴题</i>
                  <i class="tqlc-iir-detail TH-f-c-default" v-if="item.examType==5">模拟题</i>
              </span>
              <span>难度：<img v-for="i in item.difficultIndex" src="~assets/imgs/common/collected.png" alt="fav"> </span>
            </div>
          </div>
          <div v-if="item.isOpen" class="tqlc-item-more">
            <p class="tqlc-item-more-answer TH-f-c-default fs-14 fwb" v-if="item.questionType==1 || item.questionType==2">
              <span>答案：</span>
              <span>{{item.answer}}</span>
            </p>
            <div class="tqlc-item-more-answer TH-f-c-default fs-14 fwb">
              <span>解析：</span>
              <div class="inline-block" v-html="item.analysis"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="test-question-paper TH-card">
      <span class="block test-question-paper-label">组卷栏</span>
      <div class="test-question-paper-info">
        <p @mouseenter="mouseActionFlag.paperCountTotal=true" @mouseleave="mouseActionFlag.paperCountTotal=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp">
          <span class="tqpi-label fl">共计</span>
          <span class="tqpi-value fr">{{paper.select + paper.trueFalse +paper.wordSelect }}题目 <img :src="mouseActionFlag.paperCountTotal?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete" @click="clearPaper"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_1=true" @mouseleave="mouseActionFlag.paperCount_1=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp">
          <span class="tqpi-label fl">单选题</span>
          <span class="tqpi-value fr">{{paper.select}}题目 <img :src="mouseActionFlag.paperCount_1?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete" @click="deleteSelect(1)"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_3=true" @mouseleave="mouseActionFlag.paperCount_3=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp">
          <span class="tqpi-label fl">判断题</span>
          <span class="tqpi-value fr">{{paper.trueFalse}}题目 <img :src="mouseActionFlag.paperCount_3?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete"  @click="deleteSelect(2)"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_2=true" @mouseleave="mouseActionFlag.paperCount_2=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp">
          <span class="tqpi-label fl">word操作题</span>
          <span class="tqpi-value fr">{{ paper.wordSelect }}题目 <img :src="mouseActionFlag.paperCount_3?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete"  @click="deleteSelect(10)"></span>
        </p>
      </div>
      <p v-if="paper.select + paper.trueFalse + paper.wordSelect  == 0"  class="TH-button-primary test-question-paper-button cp ta-c">预览试卷</p>
      <p v-if="paper.select + paper.trueFalse + paper.wordSelect  > 0" @click="$router.push('/personalSource/testQuestion/generate')" class="fs-14 TH-button-primary test-question-paper-button cp ta-c">预览试卷</p>
    </div>
    <div class="cmt-pages" v-if="total>10">
      <el-pagination
        @current-change="studentHandleCurrentChange"
        :current-page.sync="param_true.page"
        :page-size="10"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import mutilSelect from '../../components/mutilSelect'
import { ADDRESS } from '../../helpers/address'
import { callLoading,callToast,deepClone } from '../../helpers/helper'
import myDropdown from '../../components/myDropdown'

export default {
  name: 'PersonalSourceTestQuestionPrevGeneratePage',
  components: {
    'mutil-select':mutilSelect,
    'my-dropdown':myDropdown
  },
  store: ['dropdown'],
  computed: {
    selectOption() {
      return deepClone(this.$store.tree)
    }
  },
  data () {
    return {
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: [],
      },
      questionList: [],
      studentPages: {
        total: 100,
        size: 20,
        current: 1,
      },
      mouseActionFlag: {
        paperCountTotal:false,
        paperCount_1:false,
        paperCount_2:false,
        paperCount_3:false,
      },
      Question_List:[],
      total:0,
      leaf_type:true,//是否为叶子节点
      param_true:{
        searchType:'',
        knowledgeIds:[],
        questionType:'',
        difficultIndex:'',
        examType:'',
        keyword:'',
        orderType:0,
        page:1,
        rows:10
      },
      param_false:{
        searchType:'',
        knowledgeId:'',
        isCategory:true,
        questionType:'',
        difficultIndex:'',
        examType:'',
        keyword:'',
        orderType:0,
        page:1,
        rows:10
      },
      paper:{
        select:0,
        trueFalse:0,
        wordSelect: 0
      }
    }
  },
  created () {
    // callLoading.activeLoading()
    // this.getSelectOption(this.PostGetAllQuestion)
    // console.log(this.paper.trueFalse)
    this.PostGetAllQuestion()
  },

  methods: {
    getSelectOption(cb) {
      if (this.$store.coverTree.tq.tree.length > 0) {
        // this.selectOption = deepClone(this.$store.coverTree.tq)
        cb()
        return
      }
      this.$http.get(ADDRESS.RESOURCE_COVER_TQ_ADDR)
        .then((res) => {
          if(res.body.code == 1) {
            this.$store.coverTree.tq.count = res.body.data.size
            this.$store.coverTree.tq.tree = res.body.data.tree[0].children.concat(res.body.data.tree[1].children)
            // this.selectOption = deepClone(this.$store.coverTree.tq)
            console.log('tree',this.selectOption)
          }
          else {
            callToast('获取知识点树失败', 'error')
          }
          cb()
        }, (err) => {
          callToast('获取知识点树失败', 'error')
          cb()
        })
    },
    removeSelect(item, index) {
      console.log('index ', this.activityOption.choosenActivity.indexOf(item))
      index = index || this.activityOption.choosenActivity.indexOf(item)
      this.activityOption.choosenActivity.splice(index,1)
      this.param_true.knowledgeIds.splice(index, 1)
      const _si = item.selectIndex
      this.selectOption[_si[0]].children[_si[1]].children[_si[2]].children[_si[3]].open = false
      this.PostGetAllQuestion()
    },
    handleChoice(ev) {
      this.activityOption.choosenActivity.push(ev)
      this.param_true.knowledgeIds.push(ev.id)
      this.PostGetAllQuestion()
      console.log(ev)
    },
    studentHandleCurrentChange($page){
      //console.log($page)
      this.param_true.page = $page;
      this.param_false.page = $page;
      this.PostGetAllQuestion();
    },
    handleFav(item,Q_id,type) {//FAVORITE_QUESTION
      callLoading.activeLoading()
      this.$http.post(type==false?ADDRESS.FAVORITE_QUESTION:ADDRESS.UNFAVORITE_QUESTION,{
        questionId : Q_id
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          item.favorite = !item.favorite
          if(type==false){
            callToast('收藏成功');
          }else{
            callToast('取消收藏成功');
          }
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log('err',err)
        if(type==false){
          callToast('收藏失败');
        }else{
          callToast('取消收藏失败');
        }
      })
    },
    handlePaper(item,Q_id,type,q_type) {
      callLoading.activeLoading()
      this.$http.post(type==false?ADDRESS.ADD_QUESTION_TO_PAPER:ADDRESS.DEL_QUESTION_TO_PAPER,{
        questionId : Q_id
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          item.addType = !item.addType
          if(type==false){
            callToast('添加组卷成功');
            if(q_type==1){
              this.paper.select ++ ;
            }else if(q_type==2){
              this.paper.trueFalse ++ ;
            }else if(q_type==10){
              this.paper.wordSelect ++;
            }
          }else{
            callToast('已从组卷中移除');
            if(q_type==1){
              this.paper.select -- ;
            }else if(q_type==2){
              this.paper.trueFalse -- ;
            }else if(q_type==10){
              this.paper.wordSelect --;
            }
          }
          //this.getUnFinishedPaper();
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log('err',err)
        if(type==false){
          callToast('添加失败');
        }else{
          callToast('移除失败');
        }
      })
    },
    PostGetAllQuestion(){
      callLoading.activeLoading()

      let POSTURL = ADDRESS.LEAF_KNOWLEGE_FALSE
      let POSTDATA =  this.param_false

      if( this.leaf_type ){
        POSTURL = ADDRESS.LEAF_KNOWLEGE_TRUE
        POSTDATA = this.param_true
      }

      this.$http.post(POSTURL,POSTDATA)
      .then((res) => {
        //请求未完成的组卷
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.paper.select = 0
          this.paper.trueFalse = 0
          this.paper.wordSelect =0;
          this.getUnFinishedPaper()
          this.total = parseInt(res.body.data.total);
          var content = res.body.data.list;
          for(var i=0;i<content.length;i++){
            content[i].isOpen = false;//展开和收起解析
            content[i].addType = false;//是否已组卷
            content[i].selectArr = [];//放置选择
            if( content[i].options ){
              var selectArr = content[i].options.split(/(?:^\{|",)"[^"]+":"|"\}$/g).slice(1,-1);
              var arr = ['A','B','C','D','E','F'];
              if(content[i].questionType==1){
                for(var j=0;j<selectArr.length;j++){
                  content[i].selectArr.push({type:arr[j],value:selectArr[j]});
                }
              }else if(content[i].questionType==2){
                content[i].selectArr.push({type:'A',value:'正确'},{type:'B',value:'错误'})
              }
            }
          }
          //console.log(content)
          this.questionList = content;
        }else{//空页面处理
          this.total = 0;
          this.questionList = [];
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log('err',err)
      })
    },
    changeOrderType($event){
      this.param_true.orderType = $event;
      this.param_false.orderType =$event;
      this.param_true.page = 1;
      this.param_false.page=1;
      this.PostGetAllQuestion();
    },
    Question_Type($event){
      this.param_true.questionType = $event;
      this.param_false.questionType =$event;
      this.param_true.page = 1;
      this.param_false.page=1;
      this.PostGetAllQuestion();
    },
    Exam_Type($event){
      this.param_true.examType = $event;
      this.param_false.examType =$event;
      this.param_true.page = 1;
      this.param_false.page=1;
      this.PostGetAllQuestion();
    },
    Diffent_Type($event){
      this.param_true.difficultIndex = $event;
      this.param_false.difficultIndex =$event;
      this.param_true.page = 1;
      this.param_false.page=1;
      this.PostGetAllQuestion();
    },
    Come_type($event){
      this.param_true.searchType = $event;
      this.param_false.searchType =$event;
      this.param_true.page = 1;
      this.param_false.page=1;
      this.PostGetAllQuestion();
    },
    getUnFinishedPaper(){///r/paperinfo/getUnfinishedPaper 查询未完成组卷
      callLoading.activeLoading()
      this.paper.select = 0 ;//初始化
      this.paper.trueFalse = 0 ;//初始化
      this.paper.wordSelect =0;
      this.$http.post(ADDRESS.GET_ALL_UNFINISHED_PAPER)
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          if(res.body.data === '新建组卷成功.'){
            this.paper.select = 0
            this.paper.trueFalse = 0
            this.paper.wordSelect =0
          }else{
            var questionList = this.questionList;
            for(var i=0;i<res.body.data.length;i++){
              for(var k=0;k<res.body.data[i].length;k++){
                // 循环两层结构
                for(var j=0;j<questionList.length;j++){
                  if(res.body.data[i][k].questionId == questionList[j].questionId){
                    //alert(questionList[j].questionId)
                    questionList[j].addType = true;
                  }
                }
                //获得组卷内填空和选择题的数量
                if(res.body.data[i][k].questionType==1){
                  this.paper.select++;
                }else if(res.body.data[i][k].questionType==2){
                  this.paper.trueFalse++;
                }else if(res.body.data[i][k].questionType==10){
                  this.paper.wordSelect++
                }
              }
              this.questionList = Object.assign({}, this.questionList, questionList)
            }
          }
          //console.log(questionList)
        }else{
          this.paper.select = 0
          this.paper.trueFalse = 0
          this.paper.wordSelect=0
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('获取组卷信息失败','error');
      })
    },
    clearPaper(){//CLEAR_CURRENT_PAPER 清空
      callLoading.activeLoading()
      this.$http.post(ADDRESS.CLEAR_CURRENT_PAPER)
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          var questionList = this.questionList;
          for(var i=0;i<(this.total<11?this.total:10);i++){
            questionList[i].addType = false;
          }
          this.paper.select = 0 ;
          this.paper.trueFalse = 0 ;
          this.paper.wordSelect =0;
          this.questionList = Object.assign({}, this.questionList, questionList);
          callToast('清空成功','success')
        }else{
          callToast('清空失败','error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('清空组卷失败','error')
      })
    },
    deleteSelect(type){//DELETE_QUESTION_BY_TYPE  根据类型清空
      callLoading.activeLoading()
      this.$http.post(ADDRESS.DELETE_QUESTION_BY_TYPE,{
        questionType : type
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          var questionList = this.questionList;
          for(var i=0;i<(this.total<11?this.total:10);i++){
            if(questionList[i].questionType==type){
              questionList[i].addType = false;
            }
          }
          if(type==1){
            this.paper.select = 0 ;
            callToast('清空选择题成功','success')
          }else if(type==2){
            this.paper.trueFalse = 0 ;
            callToast('清空选择题成功','success')
          }else if(type==10){
            this.paper.wordSelect =0 ;
            callToast('清空word操作题成功','success')
          }
          this.questionList = Object.assign({}, this.questionList, questionList);
        }else{
          callToast('清空失败','error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log('err',err)
        callToast('清空失败','error')
      })
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
.container{
  width:17rem;
  margin:0 auto;
}

.work-temp-top {
  padding: .55rem .02rem .2rem .02rem;
}

.wtt-choice {
  min-width: 2.35rem;
  height: .8rem;
  line-height: .8rem;
  margin-right: .5rem;
  padding: 0 .1rem;
}

.wtt-choice-icon {
  position: relative;
  top: .05rem;
}

.wtt-search {
  width: 4rem;
  height: .8rem;
}

.wtt-search-label {
  margin: .1rem .15rem;
}

.wtt-search-main {
  margin: .2rem .15rem;
  border-bottom: 1px solid #ddd;
}

.wtt-search-main-input {
  width: 3.5rem;
  height: .25rem;
  line-height: .3rem;
}

.wtt-search-main-icon {
  right: 0;
  bottom: .05rem;
}

.work-temp-top-mutil-select {
  top: 2rem;
}

.work-temp-top-mutil-select-item {
  height: .35rem;
  line-height: .35rem;
  border-radius: 4px;
  text-align: center;
  background-color: #535353;
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #9599a0, #6b7279);
  color: #fff;
}

.work-temp-top-mutil-select-item:hover {
  background-image: linear-gradient(to top, #a8a9aa, #777b7f);
}


.wtt-msi-name {
  border-right: 1px solid #fff;
  height: 100%;
  display: inline-block;
  min-width: .9rem;
  padding: 0 .25rem;
  text-align: center;
}

.wtt-msi-icon {
  width: .35rem;
  height: .35rem;
  position: relative;
}

.wtt-msi-icon {
  top: .1rem;
  right: .08rem;
}

.test-question-select {
  width: 10.6rem;
  height: .8rem;
}

.test-question-select-item {
  width: 2rem;
  height: .6rem;
  margin: .1rem .2rem;
}

.tqsi-title {
  margin-bottom: .1rem;
}

.test-question-list {
  width: 13rem;
  margin: .5rem 0 0 0;
}

.test-question-list-container {
  margin: .15rem 0;
  min-height: 5rem;
}

.tqlc-item {
  width: 12.7rem;
  padding: .2rem;
  margin-bottom: .2rem;
}

.tqlc-item-title {
  margin-bottom: .2rem;
}
.tqlc-item-title-more{
  line-height: .28rem;
}
.tqlc-item-title-index{
  vertical-align: top;
  line-height: .28rem;
}
.tqlc-item-detail {
  margin-bottom: .2rem;
}

.tqlc-item-info {
  padding: .15rem 0 0 0;
  border-top: 1px solid #ddd;
}

.tqlc-iil-icon {
  margin-right: .3rem;
  display: inline-block;
  height: .2rem;
}

.tqlc-iil-icon-img {
  width: .18rem;
}

.tqlc-iil-icon i {
  vertical-align: text-top;
}

.tqlc-iil-icon-out {
  background: #9cacbb;
  padding: 8px;
  line-height: 20px;
  height: 20px;
}

.tqlc-iil-icon-in {
  background: #468fd7;
  padding: 8px;
  line-height: 20px;
  height: 20px;
}

.tqlc-iil-icon-out .fa-plus,
.tqlc-iil-icon-out .fa-minus,
.tqlc-iil-icon-in .fa-plus,
.tqlc-iil-icon-in .fa-minus {
  vertical-align: initial;
}


.tqlc-item-info-right {

}

.tqlc-iir-detail {
  margin-right: .3rem;
}

.tqlc-item-more {
  margin-top: .3rem;
}

.tqlc-item-more-answer {
  margin-bottom: .15rem;
}

.test-question-paper {
  width: 3.2rem;
  height: 3.7rem;
  position: fixed;
  right: 1rem;
  top: 3.45rem;
}

.test-question-paper-label {
  width: .9rem;
  height: .35rem;
  background: #4fb033;
  color: #fff;
  font-size: .18rem;
  line-height: .35rem;
  text-align: center;
  top: .2rem;
  left: -.1rem;
  position: absolute;
}

.test-question-paper-label::before {
  content: '';
  width: 0;
  height: 0;
  border-width: .1rem .1rem;
  bottom: -.1rem;
  border-style: solid;
  border-color: #4fb033 transparent transparent transparent;
  left: -.1rem;
  position: absolute;
  transform: rotate(90deg);
}

.test-question-paper-info {
  margin-top: .75rem;
}

.test-question-paper-ietm {
  width: 2.7rem;
  padding: 0 .15rem;
  height: .4rem;
  line-height: .4rem;
  margin: 0 auto;
}

.test-question-paper-ietm:hover {
  background: #e8eef0;
  border-radius: 4px;
}

.tqpi-value {
  margin-right: .25rem;
}


.test-question-paper-button {
  width: 1.2rem;
  height: .4rem;
  line-height: .4rem;
  margin: .65rem auto 0 auto;
  border-radius: 40px;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.42rem;
  height: 1.46rem;
}

.work-temp-top-mutil-select-item {
  height: .35rem;
  line-height: .35rem;
  border-radius: 4px;
  text-align: center;
  background-color: #535353;
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #9599a0, #6b7279);
  color: #fff;
  margin: 0 .2rem .2rem 0;
}

.work-temp-top-mutil-select-item:hover {
  background-image: linear-gradient(to top, #a8a9aa, #777b7f);
}

</style>
