
<template>
  <div class="container">
    <div class="work-temp-top clear">
      <div @click="activityOption.showChoiceFlag = !activityOption.showChoiceFlag" class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl">
        <img class="wtt-choice-icon" src="~assets/imgs/common/shaixuan.png" alt="shaixuan">
        <span>知识点筛选</span>
      </div>
      <div class="TH-card test-question-select fl">
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-14 tqsi-title">题型</p>
          <my-dropdown @choosed="handleDrop('testType',$event)" :dropdownData="$store.dropdown.questionType">
          </my-dropdown>
        </div>
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-14 tqsi-title">题类</p>
          <my-dropdown @choosed="handleDrop('examType',$event)" :dropdownData="$store.dropdown.examType">
          </my-dropdown>
        </div>
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-14 tqsi-title">难度</p>
          <my-dropdown @choosed="handleDrop('difficult',$event)" :dropdownData="$store.dropdown.diffcult">
          </my-dropdown>
        </div>
        <!-- <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-13 tqsi-title">来源</p>
          <my-dropdown @choosed="handleDrop('examMonther',$event)" :dropdownData="$store.dropdown.examMonther">
          </my-dropdown>
        </div> -->
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
          <span @click="handleDrop('orderType',0)" :class="{'TH-f-c-link':searchOption.orderType==0}" class="cp">时间 <i>↓</i> </span>
          <span @click="handleDrop('orderType',1)" :class="{'TH-f-c-link':searchOption.orderType==1}" class="cp">组卷次数 <i>↓</i> </span>
        </p>
        <p class="fr tqll-right fs-13 TH-f-c-warn">{{workPages.total}}个</p>
      </div>
      <div class="test-question-list-container">
        <div class="TF-temp-Arr-space" v-if="qList==''">
          <img src="~assets/imgs/codeZero/coll/no-colleted-test.png" alt="">
          <p class="fs-18 TH-f-c-default">没有你需要的试题呢！</p>
        </div>
        <div v-if="qList!=''" v-for="item in qList" class="tqlc-item TH-card fs-16 TH-f-c-default">
          <p class="tqlc-item-title" v-html="item.questionText"></p>
          <ul class="tqlc-item-list" v-if="item.questionType!=10">
            <li v-if="item.questionType == 1" class="tqlc-item-detail" v-for="ans in handleOption(item.options)">{{ans[0]}}. {{ans[1]}}</li>
            <li v-if="item.questionType == 2" class="tqlc-item-detail">A. 正确</li>
            <li v-if="item.questionType == 2" class="tqlc-item-detail">B. 错误</li>
          </ul>
          <div class="tqlc-item-info clear relative">
            <div class="tqlc-item-info-left fl TH-f-c-default fs-14">
              <span @click="item.isOpen = !item.isOpen" class="cp tqlc-iil-icon">
                <img class="tqlc-iil-icon-img" :src="!item.isOpen?'static/imgs/source/jiexi.png':'static/imgs/source/jiexi-active.png'" alt="jiexi">
                <i>查看解析</i>
              </span>
              <span class="cp tqlc-iil-icon tqlc-down" v-if="item.questionType==10" @click="downloadQuestion(item)">
                下载附件
              </span>
              <span @click="handleFav(item)" class="cp tqlc-iil-icon">
                <img class="tqlc-iil-icon-img" :src="!item.favorite?'static/imgs/source/collect.png':'static/imgs/source/collect-active.png'" alt="jiexi">
                <i v-if="item.favorite">已收藏</i>
                <i v-else="!item.favorite">收藏</i>
              </span>
            </div>

            <div class="absolute question-list-knowleges-location fs-14">
              <span class="TH-f-c-dark-m">知识点：</span>
              <span v-for="(_item,index) in item.knowledges" v-if="index <= 3">{{index==0?'':'、'}}{{index == 3?'...':_item.knowledgeName}}</span>
            </div>
            <div class="tqlc-item-info-right fr fs-14 TH-f-c-fade" >
              <span>题型：<i class="tqlc-iir-detail TH-f-c-default">{{$store.dropdown.questionType[item.questionType].text}}</i> </span>
              <span>题类：<i class="tqlc-iir-detail TH-f-c-default">{{$store.dropdown.examType[item.examType].text}}</i> </span>
              <span>难度：<img v-for="i in item.difficultIndex" src="~assets/imgs/common/collected.png" alt="fav"> </span>
            </div>
          </div>
          <div v-if="item.isOpen" class="tqlc-item-more">
            <p class="tqlc-item-more-answer TH-f-c-default fs-14 fwb" v-if="item.questionType==1 || item.questionType==2">
              <span>答案：</span>
              <span>{{item.answer}}</span>
            </p>
            <div class="tqlc-item-more-answer TH-f-c-default fs-14 fwb">
              <div class="inline-block">解析：</div>
              <div class="inline-block" v-html="item.analysis"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="paper-list--pages" v-if="workPages.total > 10">
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
  </div>
</template>

<script>
import mutilSelect from '../../components/mutilSelect'
import myDropdown from '../../components/myDropdown'
import { ADDRESS } from '../../helpers/address'
import { callLoading, callToast, deepClone} from '../../helpers/helper'

export default {
  name: 'SourceRepoTestQuestion',
  components: {
    'mutil-select':mutilSelect,
    'my-dropdown': myDropdown
  },
  store: ['paper'],
  data () {
    return {
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: [],
      },
      questionList: [
        {
          id:1,
          isOpen:false,
          isFav:false,
          isInPaper:false,
        },
        {
          id:2,
          isOpen:false,
          isFav:false,
          isInPaper:false,
        },
        {
          id:3,
          isOpen:false,
          isFav:false,
          isInPaper:false,
        },
      ],
      qList: [],
      workPages: {
        total: 0,
        size: 5,
        current: 1,
      },
      mouseActionFlag: {
        paperCountTotal:false,
        paperCount_1:false,
        paperCount_2:false,
        paperCount_3:false,
      },
      searchOption: {
        knowledgeIds: [],
        questionType: '',
        examType: '',
        difficultIndex: '',
        searchType: 1,
        orderType: 0,
        page: 1,
        rows: 10
      }
    }
  },
  computed: {
    selectOption() {
      return deepClone(this.$store.tree)
    }
  },
  created () {
    this.searchByOption()
  },
  methods: {
    handleChoice(ev) {
      this.activityOption.choosenActivity.push(ev)
      this.searchOption.knowledgeIds.push(ev.id)
      this.searchByOption()
      console.log(ev)
    },
    workHandleCurrentChange(val){
      this.searchOption.page = val
      this.searchByOption()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.workPages.current = 1
      this.searchByOption()
    },
    handlePaper(item) {
      if (!item.isInPaper) {
        this.$store.paper.question.push(item.id)
      }
      item.isInPaper = !item.isInPaper
      console.log(this.$store.paper.question)
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SOURCEREPO_QUESTIONBANK_ADDR, this.searchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.workPages.total = +res.body.data.total
            var _list = res.body.data.list
            for (var i = 0; i < _list.length; i++) {
              _list[i].isOpen = false
            }
            this.qList = _list
          }
          else {
            this.qList = []
            this.workPages.total = 0
          }
        }, (err) => {
          this.qList = []
          this.workPages.total = 0
          callLoading.deactiveLoading()
        })
    },
    handleDrop(type, item) {
      this.searchOption.page = 1
      this.workPages.total = 0
      this.workPages.current = 1
      if (type == 'testType') {
        this.searchOption.questionType = item?item:''
      }
      else if (type == 'examType') {
        this.searchOption.examType = item?item:''
      }
      else if (type == 'difficult') {
        this.searchOption.difficultIndex = item?item:''
      }
      else if (type == 'examMonther') {
        this.searchOption.searchType = item?item:''
      }
      else if (type == 'orderType') {
        this.searchOption.orderType = item
      }
      this.searchByOption()
    },
    handleFav(item,type) {
      callLoading.activeLoading()
      type = type || !item.favorite
      const _addr = type?ADDRESS.SOURCEREPO_QUESTIONBANK_FAVORITE_ADDR:ADDRESS.SOURCEREPO_QUESTIONBANK_UNFAVORITE_ADDR
      this.$http.post(_addr, {
        questionId: item.questionId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          item.favorite = !item.favorite
          callToast('操作成功')
        }
        else {
          callToast('操作失败', 'error')
        }
      }, (err)=> {
        callLoading.deactiveLoading()
        callToast('操作失败', 'error')
        console.log(err)
      })
    },
    removeSelect(item, index) {
      console.log('index ', this.activityOption.choosenActivity.indexOf(item))
      index = index || this.activityOption.choosenActivity.indexOf(item)
      this.activityOption.choosenActivity.splice(index,1)
      this.searchOption.knowledgeIds.splice(index, 1)
      const _si = item.selectIndex
      console.log(this.selectOption,_si)
      // this.selectOption[_si[0]].children[_si[1]].children[_si[2]].open = false
      this.selectOption[_si[0]].children[_si[1]].children[_si[2]].children[_si[3]].open = false
      this.searchByOption()
    },
    handleOption(input) {
      const output = _.pairs(JSON.parse(input))
      return output
    },
    downloadQuestion(item){
      window.open(ADDRESS.DOWNLOAD_QUESTION_DOC+'?questionId='+item.questionId)
    }
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
  width: 2rem;
  height: .8rem;
  line-height: .8rem;
  margin-right: .5rem;
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
  margin-right: .2rem;
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
  width: 7.6rem;
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
  width: 17rem;
  margin: .5rem 0 0 0;
}

.test-question-list-container {
  margin: .15rem 0;
}

.tqlc-item {
  width: 16.7rem;
  padding: .2rem;
  margin-bottom: .2rem;
}

.tqlc-item-title {
  margin-bottom: .2rem;
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
  top: 3.75rem;
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

.tqlc-down{
  vertical-align: top;
  line-height: .22rem;
}

.test-question-paper-button {
  width: 1.2rem;
  height: .4rem;
  line-height: .4rem;
  margin: .65rem auto 0 auto;
  border-radius: 40px;
}

.tqll-left .cp {
  margin-right: .2rem;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.42rem;
  height: 1.46rem;
}

/* 新增需求 */

.question-list-knowleges-location{
  left: 6.9rem;
}
.el-pagination{
  margin-bottom: .1rem;
}
</style>
