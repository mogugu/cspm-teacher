
<template>
  <div class="container">
    <div class="paper-ge-container TH-card">
      <div class="paper-ge-top clear">
        <div class="paper-ge-top-item paper-ge-top-item-title inline-block">
          <p class="pgti-label clear">
            <span class="fs-16 TH-f-c-fade fl">标题</span>
            <span class="pgti-label-vice fs-13 TH-f-c-fade fr">不超过20字</span>
          </p>
          <input type="text" class="otl-none pgti-input" maxlength="20" v-model="pushContent.title" 
            onkeyup="value=value.replace(/[^\a-\z\A-\Z\0-\9\u4E00-\u9FA5]/g,'')" onpaste="return false"/>
        </div>
        <div class="paper-ge-top-item paper-ge-top-item-select inline-block">
          <p class="pgti-label clear">
            <span class="fs-16 TH-f-c-fade fl">年级：</span>
          </p>
          <my-dropdown @choosed="Grade_Type($event)" :dropdownData="$store.dropdown.gradeNo"></my-dropdown>
        </div>
        <div class="paper-ge-top-item paper-ge-top-item-select inline-block">
          <p class="pgti-label clear">
            <span class="fs-16 TH-f-c-fade fl">类型：</span>
          </p>
          <my-dropdown @choosed="Exam_Type($event)" :dropdownData="$store.dropdown.paperTypeAll"></my-dropdown>
        </div>
        <div @click="addToMysql" class="paper-ge-top-item paper-ge-top-item-button fr ta-c TH-button-default fs-20 cp">
          完成组卷
        </div>
      </div>
      <div class="paper-ge-content">
        <div class="paper-ge-content-section" v-if="questionList.choice!=''">
          <p class="pgcs-title TH-f-c-link fs-14 clear">
            <span class="fl">一、选择题</span>
            <span @click="questionList.choiceFlag = !questionList.choiceFlag" class="fr cp">
              <i v-if="questionList.choiceFlag">收起</i>
              <i v-if="!questionList.choiceFlag">展开</i>
            </span>
          </p>
          <div v-if="questionList.choiceFlag" @mouseenter="item.control.isShowControl=true" @mouseleave="item.control.isShowControl=false" v-for="(item, $index) in questionList.choice" class="pgcs-item fs-16 TH-f-c-default relative">
            <div v-if="item.control.isShowControl" class="pgcs-item-control absolute">
              <p class="inline-block pgcs-item-control-item fs-14 cp">
                <input class="pgcs-ici-input otl-none" type="text"  v-model="item.value">
                <span>分</span>
              </p>
              <p @click="item.control.isShowAns = !item.control.isShowAns" class="pgcs-item-control-item inline-block fs-14 cp">{{!item.control.isShowAns?'查看解析':'收起解析'}}</p>
              <p v-if="$index != 0" @click="questionListControl(item,$index,'choice','up')" class="pgcs-item-control-item inline-block fs-14 cp">上移</p>
              <p v-if="$index != questionList.choice.length-1" @click="questionListControl(item,$index,'choice','down')" class="pgcs-item-control-item inline-block fs-14 cp">下移</p>
              <p class="pgcs-item-control-item inline-block fs-14 cp" @click="deleteChoice(questionList.choice,item,$index)">删除</p>
            </div>
            <div class="pgcs-item-title">
              <p class="inline-block">{{$index+1}}、</p>
              <div class="inline-block" v-html="item.title"></div>
            </div>
            <ul class="pgcs-item-ans">
              <li v-for="ans in item.answers" class="pgcs-item-ans-detail">
                {{ans.aid | word-format}}. {{ans.text}}
              </li>
            </ul>
            <div v-if="item.control.isShowAns" class="pgcs-item-more">
              <div class="pgcs-item-more-ans fs-14 TH-f-c-default fwb">
                <span class="inline-block">答案：</span>
                <div class="inline-block">
                  {{item.desc.answer}}
                </div>
              </div>
              <div class="pgcs-item-more-ans fs-14 TH-f-c-default fwb">
                <span class="inline-block">解析：</span>
                <div class="inline-block" v-html="item.desc.anys"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 判断题 -->
        <div class="paper-ge-content-section" v-if="JudgeList.choice!=''">
          <p class="pgcs-title TH-f-c-link fs-14 clear">
            <span class="fl">{{questionList.choice==''?'一':'二'}}、判断题</span>
            <span @click="JudgeList.choiceFlag = !JudgeList.choiceFlag" class="fr cp">
              <i v-if="JudgeList.choiceFlag">收起</i>
              <i v-if="!JudgeList.choiceFlag">展开</i>
            </span>
          </p>
          <div v-if="JudgeList.choiceFlag" @mouseenter="item.control.isShowControl=true" @mouseleave="item.control.isShowControl=false" v-for="(item, $index) in JudgeList.choice" class="pgcs-item fs-16 TH-f-c-default relative">
            <div v-if="item.control.isShowControl" class="pgcs-item-control absolute">
              <p class="inline-block pgcs-item-control-item fs-14 cp">
                <input class="pgcs-ici-input otl-none" type="text" v-model="item.value">
                <span>分</span>
              </p>
              <p @click="item.control.isShowAns = !item.control.isShowAns" class="pgcs-item-control-item inline-block fs-14 cp">{{!item.control.isShowAns?'查看解析':'收起解析'}}</p>
              <p v-if="$index != 0" @click="questionListControlCheck(item,$index,'choice','up')" class="pgcs-item-control-item inline-block fs-14 cp">上移</p>
              <p v-if="$index != JudgeList.choice.length-1" @click="questionListControlCheck(item,$index,'choice','down')" class="pgcs-item-control-item inline-block fs-14 cp">下移</p>
              <p class="pgcs-item-control-item inline-block fs-14 cp" @click="deleteChoice(JudgeList.choice,item,$index)">删除</p>
            </div>
            <!-- <p class="pgcs-item-title" v-html="($index+1)+'、'+item.title"></p> -->
            <div class="pgcs-item-title">
              <p class="inline-block">{{$index+1}}、</p>
              <div class="inline-block" v-html="item.title"></div>
            </div>
            <ul class="pgcs-item-ans">
              <li v-for="ans in item.answers" class="pgcs-item-ans-detail">
                {{ans.aid | word-format}}. {{ans.text}}
              </li>
            </ul>
            <div v-if="item.control.isShowAns" class="pgcs-item-more">
              <div class="pgcs-item-more-ans fs-14 TH-f-c-default fwb">
                <span class="inline-block">答案：</span>
                <div class="inline-block">
                  {{item.desc.answer}}
                </div>
              </div>
              <div class="pgcs-item-more-ans fs-14 TH-f-c-default fwb">
                <span class="inline-block">解析：</span>
                <div class="inline-block" v-html="item.desc.anys"></div>
              </div>
            </div>
          </div>
        </div>
        <!--操作题-->
        <div class="paper-ge-content-section" v-if="wordList.choice!=''">
          <p class="pgcs-title TH-f-c-link fs-14 clear">
            <span class="fl">{{(questionList.choice==''&&JudgeList.choice=='')?'一':((questionList.choice==''||JudgeList.choice=='')?'二':'三')}}、word操作题</span>
            <span @click="wordList.choiceFlag = !wordList.choiceFlag" class="fr cp">
              <i v-if="wordList.choiceFlag">收起</i>
              <i v-if="!wordList.choiceFlag">展开</i>
            </span>
          </p>
          <div v-if="wordList.choiceFlag" @mouseenter="item.control.isShowControl=true" @mouseleave="item.control.isShowControl=false" v-for="(item, $index) in wordList.choice" class="pgcs-item fs-16 TH-f-c-default relative">
            <div v-if="item.control.isShowControl" class="pgcs-item-control absolute">
              <!-- <p class="inline-block pgcs-item-control-item fs-14 cp">
                <input class="pgcs-ici-input otl-none" type="text" v-model="item.value">
                <span>分</span>
              </p> -->
              <p @click="item.control.isShowAns = !item.control.isShowAns" class="pgcs-item-control-item inline-block fs-14 cp">{{!item.control.isShowAns?'查看解析':'收起解析'}}</p>
              <p v-if="$index != 0" @click="wordListControlCheck(item,$index,'choice','up')" class="pgcs-item-control-item inline-block fs-14 cp">上移</p>
              <p v-if="$index != wordList.choice.length-1" @click="wordListControlCheck(item,$index,'choice','down')" class="pgcs-item-control-item inline-block fs-14 cp">下移</p>
              <p class="pgcs-item-control-item inline-block fs-14 cp" @click="deleteChoice(wordList.choice,item,$index)">删除</p>
            </div>
            <!-- <p class="pgcs-item-title" v-html="($index+1)+'、'+item.title"></p> -->
            <div class="pgcs-item-title">
              <p class="inline-block pgcs-item-title-index">{{$index+1}}、</p>
              <div class="inline-block pgcs-item-title-more" v-html="item.title"></div>
            </div>
            <ul class="pgcs-item-ans">
              <li v-for="ans in item.answers" class="pgcs-item-ans-detail">
                {{ans.aid | word-format}}. {{ans.text}}
              </li>
            </ul>
            <div v-if="item.control.isShowAns" class="pgcs-item-more">
              <!-- <div class="pgcs-item-more-ans fs-14 TH-f-c-default fwb">
                <span class="inline-block">答案：</span>
                <div class="inline-block">
                  {{item.desc.answer}}
                </div>
              </div> -->
              <div class="pgcs-item-more-ans fs-14 TH-f-c-default fwb">
                <span class="inline-block">解析：</span>
                <div class="inline-block" v-html="item.anys"></div>
              </div>
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
          <span class="tqpi-value fr">{{questionList.choice.length+JudgeList.choice.length+wordList.choice.length}}题目 <img :src="mouseActionFlag.paperCountTotal?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete" @click="visible2=true"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_1=true" @mouseleave="mouseActionFlag.paperCount_1=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp" v-if="questionList.choice!=''">
          <span class="tqpi-label fl">单选题</span>
          <span class="tqpi-value fr">{{questionList.choice.length}}题目 <img :src="mouseActionFlag.paperCount_1?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete" @click="deleteSelect(1)"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_3=true" @mouseleave="mouseActionFlag.paperCount_3=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp" v-if="JudgeList.choice!=''">
          <span class="tqpi-label fl">判断题</span>
          <span class="tqpi-value fr">{{JudgeList.choice.length}}题目 <img :src="mouseActionFlag.paperCount_3?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete" @click="deleteSelect(2)"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_2=true" @mouseleave="mouseActionFlag.paperCount_2=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp" v-if="wordList.choice!=''">
          <span class="tqpi-label fl">word操作题</span>
          <span class="tqpi-value fr">{{wordList.choice.length}}题目 <img :src="mouseActionFlag.paperCount_2?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete" @click="deleteSelect(10)"> </span>
        </p>
      </div>
      <div class="paper-ge-window-button clear">
        <span class="fs-14 paper-ge-window-button-detail inline-block TH-button-primary ta-c fl cp" @click="$router.push('/personalSource/testQuestion/prevGenerate')">继续组卷</span>
        <span @click="dialogFlag.dialogCancel = true" class="fs-14 paper-ge-window-button-detail inline-block TH-button-normal ta-c fr cp">取消组卷</span>
      </div>
    </div>

    <el-dialog
      title="完成组卷"
      top="40%"
      :visible.sync="dialogFlag.dialogConfirm"
      size="tiny">
      <p class="paper-dialog-title fs-20 TH-f-c-default ta-c">确认完成组卷吗？</p>
      <p class="paper-dialog-info TH-f-c-default fs-16 clear">
        <span class="fl">共计：<i class="TH-f-c-warn">{{questionList.choice.length+JudgeList.choice.length+wordList.choice.length}}</i>题</span>
        <span class="fr">总分：<i class="TH-f-c-warn">{{AllGrade}}</i>分</span>
      </p>
      <div class="paper-dialog-bottom">
        <p @click="submitPaper()" class="inline-block paper-dialog-bottom-button TH-button-confirm">确定</p>
        <p @click="dialogFlag.dialogConfirm = false" class="inline-block paper-dialog-bottom-button TH-button-cancel">取消</p>
      </div>
    </el-dialog>

    <el-dialog
      title="取消组卷"
      top="40%"
      :visible.sync="dialogFlag.dialogCancel"
      size="tiny">
      <p class="paper-dialog-title-cancel fs-20 TH-f-c-warn ta-c">确认取消组卷吗？</p>
      <div class="paper-dialog-bottom">
        <p @click="clearPaper" class="inline-block paper-dialog-bottom-button TH-button-confirm">确定</p>
        <p @click="dialogFlag.dialogCancel = false" class="inline-block paper-dialog-bottom-button TH-button-cancel">取消</p>
      </div>
    </el-dialog>

    <!-- <el-dialog
      title="组卷成功"
      top="40%"
      :visible.sync="dialogFlag.dialogSuccess"
      size="tiny">
      <p class="paper-dialog-title fs-20 TH-f-c-warn ta-c" v-if="!dialogFormVisibleUploadMall">恭喜你组卷成功！</p>
      <div class="paper-dialog-option clear fs-16" v-if="!dialogFormVisibleUploadMall">
        <p class="fl paper-dialog-option-text">您可以选择：</p>
        <div class="fl paper-dialog-option-list">
          <p class="TH-f-c-link inline-block cp" @click="$router.push('/personalSource/paper')">查看组卷</p><br>
          <p class="TH-f-c-link inline-block cp" @click="$router.push('/personalSource/testQuestion/prevGenerate')">继续组卷</p><br>
          <p class="TH-f-c-link inline-block cp" @click="$router.push('/classTask/publish')">发布班级任务</p>
          <p class="TH-f-c-link cp" @click="dialogFormVisibleUploadMall=true">同步上传到资源超市</p>
        </div>
      </div>
      <div class="upload-mall-resource" v-if="dialogFormVisibleUploadMall">
        <p class="fs-16">是否同步上传至资源超市进行售卖？</p>
      </div>
      <div slot="footer" class="dialog-footer ta-c" v-if="dialogFormVisibleUploadMall">
        <el-button type="primary" @click="uploadToMall" >是</el-button>
        <el-button @click="dialogFormVisibleUploadMall = false">否</el-button>
      </div>
    </el-dialog> -->
    <el-dialog :visible.sync="dialogFormVisibleUploadMall"
      custom-class="dialog-edit-grade choose-now-added-model upload-model-to-mall"
      top="30%" 
      :close-on-click-modal="false" 
      :close-on-press-escape="false" 
      @close="$router.push('/personalSource/my/paper')">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>同步上传到资源超市</span>
      </div>
      <div class="upload-mall-resource">
        <p class="fs-20 fwb">组卷成功！</p>
        <p class="fs-16">是否同步上传至资源超市进行售卖？</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadToMall" >是</el-button>
        <el-button @click="$router.push('/personalSource/my/paper')">否</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="删除"
      :visible.sync="visible2"
      size="tiny"
      :before-close="handleClose">
      <span>确定清空试题吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible2 = false">取 消</el-button>
        <el-button type="primary" @click="clearPaper">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mutilSelect from '../../components/mutilSelect'
import { ADDRESS } from '../../helpers/address'
import { callLoading,callToast } from '../../helpers/helper'
import myDropdown from '../../components/myDropdown'


export default {
  name: 'PersonalSourceTestQuestionGenerate',
  components: {
    'my-dropdown':myDropdown
  },
  store: ['dropdown'],
  data () {
    return {
      visible2:false,
      dialogFormVisibleUploadMall:false,
      questionList: {
        choiceFlag:true,
        choice: []
      },
      JudgeList:{
        choiceFlag:true,
        choice: []
      },
      wordList: {
        choiceFlag:true,
        choice: []
      },
      mouseActionFlag: {
        paperCountTotal:false,
        paperCount_1:false,
        paperCount_2:false,
        paperCount_3:false,
      },
      dialogFlag: {
        dialogConfirm: false,
        dialogSuccess: false,
        dialogCancel : false,
      },
      pushContent:{
        isOpened:false,
        description:'',
        area:'1',
        referenceDuration:'10',
        gradeNo:7,
        examType:1,
        title:'',
        questions:''
      },
      AllGrade:0,
      uploadId:''
    }
  },
  created () {
    this.pushContent.gradeNo = this.$store.dropdown.gradeNo[0].id;
    this.pushContent.examType = this.$store.dropdown.examTypeNo[0].id;
    this.getUnFinishedPaper();
  },
  methods: {
    uploadToMall(){
      this.$router.push({path:'/personalSource/uploadMall',
      query:{id:this.uploadId,type:'paper',name:this.pushContent.title}})
    },
    Grade_Type(_event){
      if(_event == ''){
        this.pushContent.gradeNo = 7
      }else if(_event == 1){
        this.pushContent.gradeNo = 8
      }else{
        this.pushContent.gradeNo = 9
      }
    },
    Exam_Type(_event){
      console.log(_event)
      if(_event == ''){
        this.pushContent.examType = 1
      }else{
        this.pushContent.examType = _event +1
      }
    },
    getUnFinishedPaper(){//GET_ALL_UNFINISHED_PAPER
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_ALL_UNFINISHED_PAPER)
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          if(res.body.data.constructor == String){
            this.$router.push('/personalSource/testQuestion/prevGenerate')
          }
          for(var i=0;i<res.body.data[0].length;i++){
            if(res.body.data[0][0].questionType == 1){
              var selectArr = res.body.data[0][i].options
              .split(/(?:^\{|",)"[^"]+":"|"\}$/g).slice(1,-1);
              var selectArr_ = [];
              for(var j=0;j<selectArr.length;j++){
                selectArr_.push({aid:j,text:selectArr[j]});
              }
              this.questionList.choice.push({
                oid:(i+1),
                title:res.body.data[0][i].questionText,
                answers:selectArr_,
                id:res.body.data[0][i].questionId,
                desc:{
                  answer: res.body.data[0][i].answer,
                  anys: res.body.data[0][i].analysis
                },
                control: {
                  isShowAns: false,
                  isShowControl: false
                },
                value:res.body.data[0][i].referenceScore
              })
            }
          }

          //判断题
          if(res.body.data[1]!=''){
            for(var j=0;j<res.body.data[1].length;j++){
              this.JudgeList.choice.push({
                oid:(j+1),
                title:res.body.data[1][j].questionText,
                answers:[
                  {aid:0,text:'正确'},
                  {aid:1,text:'错误'}
                ],
                desc:{
                  answer: res.body.data[1][j].answer,
                  anys: res.body.data[1][j].analysis
                },
                control: {
                  isShowAns: false,
                  isShowControl: false
                },
                id:res.body.data[1][j].questionId,
                value:res.body.data[1][j].referenceScore
              })
            }
          }
          //word操作题
          if(res.body.data[2] !=''){
            for(var j=0;j<res.body.data[2].length;j++){
              this.wordList.choice.push({
                oid:(j+1),
                title: res.body.data[2][j].questionText,
                id: res.body.data[2][j].questionId,
                anys: res.body.data[2][j].analysis,
                control: {
                  isShowAns: false,
                  isShowControl: false
                },
                value:res.body.data[2][j].referenceScore
              })
            }
          }
        }else{
          callToast('没有内容呢！','warning')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('没有内容呢！','warning')
      })
    },
    questionListControl(item,index,type,direc) {
      let typeValue = ''
      if (type == 'choice') {
        typeValue = 'choice'
      }
      if(direc == 'up') {
        this.questionList[typeValue].splice(index,1)
        this.questionList[typeValue].splice(index-1,0,item)
        console.log(item)
      }
      else if (direc == 'down') {
        this.questionList[typeValue].splice(index,1)
        this.questionList[typeValue].splice(index+1,0,item)
      }
    },
    questionListControlCheck(item,index,type,direc){
      let typeValue = ''
      if (type == 'choice') {
        typeValue = 'choice'
      }
      if(direc == 'up') {
        this.JudgeList[typeValue].splice(index,1)
        this.JudgeList[typeValue].splice(index-1,0,item)
        console.log(item)
      }
      else if (direc == 'down') {
        this.JudgeList[typeValue].splice(index,1)
        this.JudgeList[typeValue].splice(index+1,0,item)
      }
    },
    wordListControlCheck(item,index,type,direc){
      let typeValue = ''
      if (type == 'choice') {
        typeValue = 'choice'
      }
      if(direc == 'up') {
        this.wordList[typeValue].splice(index,1)
        this.wordList[typeValue].splice(index-1,0,item)
        console.log(item)
      }
      else if (direc == 'down') {
        this.wordList[typeValue].splice(index,1)
        this.wordList[typeValue].splice(index+1,0,item)
      }
    },
    submitPaper() {
      var push_Q = [];
      var _index = 0;
      for(var i=0;i<this.questionList.choice.length;i++){
        push_Q.push({'orderId':(i+1),'questionId':this.questionList.choice[i].id,'score':this.questionList.choice[i].value});
        _index++;
      }
      if(this.JudgeList.choice!=''){
        for(var j=0;j<this.JudgeList.choice.length;j++){
          push_Q.push({'orderId':(_index+j+1),'questionId':this.JudgeList.choice[j].id,'score':this.JudgeList.choice[j].value});
          //_index++;
        }
      }
      if(this.wordList.choice!=''){
        for(var j=0;j<this.wordList.choice.length;j++){
          push_Q.push({
            'orderId': (_index+j+1),
            'questionId': this.wordList.choice[j].id,
            'score': this.wordList.choice[j].value
          })
        }
      }
      this.pushContent.questions = JSON.stringify(push_Q);
      this.dialogFlag.dialogConfirm = false;
      if(this.pushContent.title == ''){
        callToast('填写试卷名字哦','warning')
      }else{
        callLoading.activeLoading();
        this.$http.post(ADDRESS.SAVR_PAPER_INTO_MYSQL,
         this.pushContent)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.$router.push('/personalSource/my/paper');
            // this.uploadId = res.body.data
            // this.dialogFormVisibleUploadMall = true
          }else{
           callToast('组卷失败','error')
          }
        }, (err) => {
          callLoading.deactiveLoading()
          callToast('组卷失败','error')
        })
      }
    },
    deleteChoice(Arr,item,_index){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.DEL_QUESTION_TO_PAPER,{
        questionId : item.id
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          Arr.splice(_index,1);
          callToast('删除成功','success')
        }else{
         callToast('删除失败','error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('删除失败','error')
      })
    },
    clearPaper(){//CLEAR_CURRENT_PAPER 清空
      this.visible2 = false;
      this.dialogFlag.dialogCancel = false;
      callLoading.activeLoading()
      this.$http.post(ADDRESS.CLEAR_CURRENT_PAPER)
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.$router.push('/personalSource/testQuestion/prevGenerate')
        }else{
           callToast('清空失败','error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('清空失败','error')
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
          if(type==1){
            this.questionList.choice = []
            callToast('已清空单选题')
          }else if(type==2){
            this.JudgeList.choice = []
            callToast('已清空判断题')
          }else if(type==10){
            this.wordList.choice=[]
            callToast('已清空word操作题')
          }
        }else{
          callToast('清空失败','error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('清空失败','error')
      })
    },
    addToMysql(){
      this.dialogFlag.dialogConfirm = true;
      this.AllGrade = 0;
      for(var i=0;i<this.questionList.choice.length;i++){
        this.AllGrade += parseInt(this.questionList.choice[i].value);
      }
      if(this.JudgeList.choice!=''){
        for(var j=0;j<this.JudgeList.choice.length;j++){
          this.AllGrade +=  parseInt(this.JudgeList.choice[j].value);
        }
      }
      if(this.wordList.choice!=''){
        for(var j=0;j<this.wordList.choice.length;j++){
          this.AllGrade += parseInt(this.wordList.choice[j].value);
        }
      }
    }
  }
}
</script>

<style scoped>

.container {
  width: 17rem;
  margin: 0 auto;
}

.paper-ge-container {
  width: 13rem;
  min-height: 6rem;
  margin-top: .25rem;
}

.paper-ge-top {
  width: 100%;
  height: .7rem;
  padding: .15rem 0;
  border-bottom: 1px solid #ddd;
}
.paper-ge-top-item {
  margin: 0 .4rem;
}

.paper-ge-top-item-title {
  width: 3.9rem;
}

.paper-ge-top-item-button {
  width: 1.7rem;
  height: .6rem;
  line-height: .6rem;
  border-radius: 40px;
  position: relative;
  top: .1rem;
}


.pgti-label {
  margin: 0 0 .15rem 0;
}

.pgti-input {
  width: 3.48rem;
  padding: 0 .2rem;
  border: 1px solid #ddd;
  height: .4rem;
  line-height: .4rem;
}

.pgti-select {
  border: 1px solid #ddd;
  width: 1.2rem;
}

.paper-ge-content {
  border-top: 1px solid #ddd;
}

.pgcs-title {
  height: .4rem;
  line-height: .4rem;
  padding: 0 .35rem;
  width: 12.3rem;
  background: #f5f5f5;
}

.pgcs-item {
  margin: .1rem .2rem;
  padding: .15rem .15rem 0 .15rem;
  border: 2px solid transparent;
  border-bottom: 2px solid #ddd;
}

.pgcs-item:hover {
  border: 2px solid #3283d3;
}

.pgcs-item-title {
  margin-bottom: .15rem;
}
.pgcs-item-title-index{
  vertical-align: top;
  line-height: .28rem;
}
.pgcs-item-title-more{
  line-height: .28rem;
}
.pgcs-item-ans-detail {
  margin-bottom: .15rem;
}

.pgcs-item-control {
  padding: 0 .2rem;
  height: .4rem;
  line-height: .4rem;
  background: #3283d3;
  right: 0;
  top: 0;
  font-size: 0;
}

.pgcs-item-control-item {
  color: #fff;
  margin-right: .2rem;
}

.pgcs-item-control-item:last-child {
  margin-right: 0;
}

.pgcs-ici-input {
  width: .3rem;
  height: .28rem;
  background: #fff;
  text-align: center;
}

.pgcs-item-more {
  margin-top: .2rem;
}

.pgcs-item-more-ans {
  margin-bottom: .2rem;
}

.test-question-paper {
  width: 3.2rem;
  height: 3rem;
  position: fixed;
  right: 1rem;
  top: 1.65rem;
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

.paper-ge-window-button {
  width: 2.9rem;
  margin: .1rem auto;
  padding: .1rem;
}

.paper-ge-window-button-detail {
  width: 1.2rem;
  height: .4rem;
  line-height: .4rem;
  border-radius: 40px;
  margin-right: .35rem;
}

.paper-ge-window-button-detail:first-child {
  border: 1px solid transparent;
}

.paper-ge-window-button-detail:last-child {
  margin-right: 0;
}

.paper-dialog-info {
  width: 3rem;
  margin: .5rem auto 1.2rem auto;
}

.paper-dialog-bottom {
  text-align: center;
  border-top: 1px solid #ddd;
  padding-top: .2rem;
}

.paper-dialog-bottom-button {
  width: 1rem;
  height: .4rem;
  margin-right: .4rem;
}

.paper-dialog-bottom-button:last-child {
  margin-right: 0;
}

.paper-dialog-option {
  width: 3.6rem;
  margin: .55rem auto;
}

.paper-dialog-option-list p {
  margin-bottom: .28rem;
  border-bottom: 1px solid #3283d3;
}

.paper-dialog-title-cancel {
  margin: 1rem 0;
}

.el-dropdown{
  border:1px solid #ddd;
}
</style>
