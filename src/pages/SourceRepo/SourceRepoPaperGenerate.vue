
<template>
  <div class="container">
    <div class="paper-ge-container TH-card">
      <div class="paper-ge-top clear">
        <div class="paper-ge-top-item paper-ge-top-item-title inline-block">
          <p class="pgti-label clear">
            <span class="fs-16 TH-f-c-fade fl">标题</span>
            <span class="pgti-label-vice fs-13 TH-f-c-fade fr">不超过20字</span>
          </p>
          <input type="text" class="otl-none pgti-input">
        </div>
        <div class="paper-ge-top-item paper-ge-top-item-select inline-block">
          <p class="pgti-label clear">
            <span class="fs-16 TH-f-c-fade fl">年级：</span>
          </p>
          <el-select class="G-select-border-none pgti-select" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="paper-ge-top-item paper-ge-top-item-select inline-block">
          <p class="pgti-label clear">
            <span class="fs-16 TH-f-c-fade fl">类型：</span>
          </p>
          <el-select class="G-select-border-none pgti-select" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div @click="dialogFlag.dialogConfirm = true" class="paper-ge-top-item paper-ge-top-item-button fr ta-c TH-button-primary fs-20 cp">
          完成组卷
        </div>
      </div>
      <div class="paper-ge-content">
        <div class="paper-ge-content-section">
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
                <input class="pgcs-ici-input otl-none" type="text">
                <span>分</span>
              </p>
              <p @click="item.control.isShowAns = !item.control.isShowAns" class="pgcs-item-control-item inline-block fs-14 cp">查看解析</p>
              <p v-if="$index != 0" @click="questionListControl(item,$index,'choice','up')" class="pgcs-item-control-item inline-block fs-14 cp">上移</p>
              <p v-if="$index != questionList.choice.length-1" @click="questionListControl(item,$index,'choice','down')" class="pgcs-item-control-item inline-block fs-14 cp">下移</p>
              <p class="pgcs-item-control-item inline-block fs-14 cp">删除</p>
            </div>
            <p class="pgcs-item-title">{{($index+1)+'、'+item.title}}</p>
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
                <div class="inline-block">
                  {{item.desc.anys}}
                </div>
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
          <span class="tqpi-value fr">5题目 <img :src="mouseActionFlag.paperCountTotal?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_1=true" @mouseleave="mouseActionFlag.paperCount_1=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp">
          <span class="tqpi-label fl">单选题</span>
          <span class="tqpi-value fr">5题目 <img :src="mouseActionFlag.paperCount_1?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_2=true" @mouseleave="mouseActionFlag.paperCount_2=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp">
          <span class="tqpi-label fl">多选题</span>
          <span class="tqpi-value fr">5题目 <img :src="mouseActionFlag.paperCount_2?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete"> </span>
        </p>
        <p @mouseenter="mouseActionFlag.paperCount_3=true" @mouseleave="mouseActionFlag.paperCount_3=false" class="test-question-paper-ietm clear fs-16 TH-f-c-default cp">
          <span class="tqpi-label fl">判断题</span>
          <span class="tqpi-value fr">5题目 <img :src="mouseActionFlag.paperCount_3?'static/imgs/source/delete-hover.png':'static/imgs/source/delete-default.png'" alt="delete"> </span>
        </p>
      </div>
      <div class="paper-ge-window-button clear">
        <span class="paper-ge-window-button-detail inline-block TH-button-default ta-c fl cp">继续组卷</span>
        <span @click="dialogFlag.dialogCancel = true" class="paper-ge-window-button-detail inline-block TH-button-normal ta-c fr cp">取消组卷</span>
      </div>
    </div>

    <el-dialog
      title="完成组卷"
      top="40%"
      :visible.sync="dialogFlag.dialogConfirm"
      size="tiny">
      <p class="paper-dialog-title fs-20 TH-f-c-default ta-c">确认完成组卷吗？</p>
      <p class="paper-dialog-info TH-f-c-default fs-16 clear">
        <span class="fl">共计：<i class="TH-f-c-warn">5</i>题</span>
        <span class="fr">总分：<i class="TH-f-c-warn">50</i>分</span>
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
        <p @click="caneclPaper()" class="inline-block paper-dialog-bottom-button TH-button-confirm">确定</p>
        <p @click="dialogFlag.dialogCancel = false" class="inline-block paper-dialog-bottom-button TH-button-cancel">取消</p>
      </div>
    </el-dialog>

    <el-dialog
      title="组卷成功"
      top="40%"
      :visible.sync="dialogFlag.dialogSuccess"
      size="tiny">
      <p class="paper-dialog-title fs-20 TH-f-c-warn ta-c">恭喜你组卷成功！</p>
      <div class="paper-dialog-option clear fs-16">
        <p class="fl paper-dialog-option-text">您可以选择：</p>
        <div class="fl paper-dialog-option-list">
          <p class="TH-f-c-link inline-block cp">查看组卷</p><br>
          <p class="TH-f-c-link inline-block cp">继续组卷</p><br>
          <p class="TH-f-c-link inline-block cp">发布班级任务</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { callLoading, callToast } from '../../helpers/helper'
export default {
  name: 'SourceRepoPaperGenerate',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      questionList: {
        choiceFlag:true,
        choice: [
          {
            oid:1,
            title:'下列叙1述正确的是（）',
            answers: [
              {
                aid:0,
                text: '信息技术就等同于计算机技术和网络技术。  '
              },
              {
                aid: 1,
                text: '信息技术是有关信息的获取、传递、存储、处理、交流和表达的技术。'
              },
              {
                aid: 2,
                text: '微电子技术与信息技术是互不关联的两个技术领域。'
              },
              {
                aid: 3,
                text: '信息技术是处理信息的技术。'
              }
            ],
            desc:{
              answer: '这是答案这是答案这是答案这是答案这是答案',
              anys: '这是解析这是解析这是解析这是解析'
            },
            control: {
              isShowAns: false,
              isShowControl: false
            }
          },
          {
            oid:2,
            title:'下列叙2述正确的是（）',
            answers: [
              {
                aid:0,
                text: '信息技术就等同于计算机技术和网络技术。  '
              },
              {
                aid: 1,
                text: '信息技术是有关信息的获取、传递、存储、处理、交流和表达的技术。'
              },
              {
                aid: 2,
                text: '微电子技术与信息技术是互不关联的两个技术领域。'
              },
              {
                aid: 3,
                text: '信息技术是处理信息的技术。'
              }
            ],
            desc:{
              answer: '这是答案这是答案这是答案这是答案这是答案',
              anys: '这是解析这是解析这是解析这是解析'
            },
            control: {
              isShowAns: false,
              isShowControl: false
            }
          },
          {
            oid:3,
            title:'下列叙3述正确的是（）',
            answers: [
              {
                aid:0,
                text: '信息技术就等同于计算机技术和网络技术。  '
              },
              {
                aid: 1,
                text: '信息技术是有关信息的获取、传递、存储、处理、交流和表达的技术。'
              },
              {
                aid: 2,
                text: '微电子技术与信息技术是互不关联的两个技术领域。'
              },
              {
                aid: 3,
                text: '信息技术是处理信息的技术。'
              }
            ],
            desc:{
              answer: '这是答案这是答案这是答案这是答案这是答案',
              anys: '这是解析这是解析这是解析这是解析'
            },
            control: {
              isShowAns: false,
              isShowControl: false
            }
          },
        ]
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
      }
    }
  },
  created () {
  },
  methods: {
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
    submitPaper() {
      this.dialogFlag.dialogConfirm = false
      callLoading.activeLoading()
      setTimeout(()=> {
        callLoading.deactiveLoading()
        this.dialogFlag.dialogSuccess = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
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
}

.pgcs-item-more {
  margin-top: .2rem;
}

.pgcs-item-more-ans {
  margin-bottom: .2rem;
}

.test-question-paper {
  width: 3.2rem;
  height: 3.7rem;
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

</style>
