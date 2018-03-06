
<template>
  <div class="container">
    <div class="work-temp-top clear">
      <div @click="activityOption.showChoiceFlag = !activityOption.showChoiceFlag" class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl">
        <img class="wtt-choice-icon" src="~assets/imgs/common/shaixuan.png" alt="shaixuan">
        <span>活动筛选</span>
      </div>
      <div class="TH-card courseware-select TH-f-c-default fs-16 cp fl">
        <div class="courseware-select-item inline-block">
          <p class="fs-14 TH-f-c-fade select-title">格式</p>
          <my-cascader @choosed="handleDrop('file',$event)">
          </my-cascader>
        </div>
        <div class="courseware-select-item inline-block">
          <p class="fs-14 TH-f-c-fade select-title">关键字搜索</p>
          <div class="wtt-search-main relative">
             <input @keyup.enter="handleDrop('keyword', 0)" class="otl-none wtt-search-main-input" type="text" placeholder="请输入关键字..." v-model="searchOption.fileTitle">
             <img @click="handleDrop('keyword', 0)" class="wtt-search-main-icon absolute" src="~assets/imgs/classTask/search.png" alt="search">
          </div>
        </div>
      </div>
    </div>
    <mutil-select class="work-temp-top-mutil-select absolute"
      v-if="activityOption.showChoiceFlag"
      :selectList="selectOption"
      type="single"
      @choiceActive="handleChoice($event)"
      @closeSelect="activityOption.showChoiceFlag = false"></mutil-select>
    <div v-if="activityOption.choosenActivity[0].label" class="work-temp-top-mutil-select-item inline-block relative">
      <span class="wtt-msi-name fl">{{activityOption.choosenActivity[0].label}}</span>
      <div @click="removeSelect()" class="wtt-msi-icon fl relative">
        <img class="absolute" src="~assets/imgs/classTask/search-cancel.png" alt="cancel">
      </div>
    </div>
    <!-- <div v-for="(bar, $index) in activityOption.choosenActivity" class="work-temp-top-mutil-select-item inline-block relative" v-if="activityOption.choosenActivity.length>0">
      <span class="wtt-msi-name fl">{{bar.label}}</span>
      <div @click="removeSelect(bar, $index)" class="wtt-msi-icon fl relative">
        <img class="absolute" src="~assets/imgs/classTask/search-cancel.png" alt="cancel">
      </div>
    </div> -->
    <div class="clear">
      <div class="sort-content clear fs-13 TH-f-c-default">
        <p class="sort-content-left fl">
          <span @click="handleDrop('orderType',2)" :class="{'TH-f-c-link': searchOption.sort==2}" class="work-shop-info-item cp">时间 <i>↓</i> </span>
          <span @click="handleDrop('orderType',4)" :class="{'TH-f-c-link': searchOption.sort==4}" class="work-shop-info-item cp">大小 <i>↓</i> </span>
        </p>
        <p class="work-shop-info-right fr TH-f-c-warn">{{materialsPage.total}}个</p>
      </div>
    <div class="work-temp-list c">
      <div class="TF-temp-Arr-space" v-if="coursewareList==''">
        <img src="~assets/imgs/codeZero/coll/no-courseware.png" alt="">
        <p class="fs-18 TH-f-c-default">没有你需要的课件呢！</p>
      </div>
      <div v-if="coursewareList!=''" class="cmwl-item TH-card inline-block fl"  v-for="item in coursewareList" @click="previewMaterial(item)">
        <div class="cmwl-item-left fl ta-c">
          <img class="cmwl-item-left-icon" :src="platformPng(item.fileSuffix)" alt="pic">
        </div>
        <div class="cmwl-item-right fl TH-f-c-default">
          <p class="cmwl-item-right-title fwb fs-16 tof" :title="item.fileTitle">{{item.fileTitle}}</p>
          <p class="cmwl-item-right-desc ws-no fs-13">
              <span>大小：{{fileSize(item.fileSize)}}</span>
              <span>活动：{{item.activityName}}</span>
          </p>
          <p class="cmwl-item-right-author fs-14 TH-f-c-link">{{item.userName}}</p>
        </div>
      </div>
      <div class="swp-page" v-if="materialsPage.total > 9">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="workHandleCurrentChange"
          :current-page.sync="materialsPage.current"
          :page-size="searchOption.rows"
          :page-sizes="[9, 18, 30]"
          layout="sizes, prev, pager, next"
          :total="materialsPage.total">
        </el-pagination>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import mutilSelect from '../../components/mutilSelect'
import myCascader from '../../components/myCascader'

import { ADDRESS } from '../../helpers/address'
import { callLoading, deepClone, clearTree } from '../../helpers/helper'

export default {
  name: 'SourceRepoCoursewareTemplate',
  components: {
    'mutil-select':mutilSelect,
    'my-cascader': myCascader
  },
  data () {
    return {
      // selectType: 'single',
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: [{'label':''}],
      },
      coursewareList: [],
      materialsPage: {
        total: 0,
        size: 9,
        current: 1,
      },
      searchOption: {
        activityId: null,
        materialType: 1,
        sort: 2,
        fileSuffix: '',
        fileTitle: '',
        page: 1,
        rows: 9,
      }
    }
  },
  created () {
    this.searchByOption()
  },
  computed: {
    selectOption() {
      return deepClone(this.$store.tree)
    }
  },
  methods: {
    handleChoice(ev) {
      this.activityOption.choosenActivity.splice(0,1,ev)
      this.searchOption.activityId = ev.id
      console.log(ev)
      this.searchByOption()
    },
    fileSize(str){
      if( str < 1024 ){
        return str + "KB"
      }
      else{
        return parseInt(str / 1024) + 'MB'
      }
    },
    handleDrop(type,item){
      this.materialsPage.total = 0
      this.materialsPage.current = 1
      this.searchOption.page = 1
      if (type == 'file') {
        this.searchOption.fileSuffix = item ? item :''
      }
      else if (type == 'orderType') {
        this.searchOption.sort = item
      }
      this.searchByOption()
    },
    platformPng(file_name){
      let $file = file_name
      if( file_name=='docx'||file_name=='xlsx'||file_name=='pptx' ){
        $file = file_name.substring(0,file_name.length-1)
      }
      return 'static/imgs/uplod/'+$file+'.png'
    },
    workHandleCurrentChange(p){
      this.searchOption.page = p
      this.searchByOption()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.materialsPage.current = 1
      this.searchByOption()
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.MATERIALS_BY_CONDITIONS, this.searchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
             this.coursewareList = res.body.data.list
             this.materialsPage.total = +res.body.data.total
          }else{
            this.coursewareList = [];
            this.materialsPage.total = 0
          }
        }, (err) => {
          callLoading.deactiveLoading()
          console.log(err)
        })
    },
    removeSelect() {
      clearTree(this.selectOption)
      this.activityOption = {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      }
      this.searchOption.activityId = null
      this.searchByOption()
      // index = index || this.activityOption.choosenActivity.indexOf(item)
      // this.activityOption.choosenActivity.splice(index,1)
      // this.searchOption.activityIds.splice(index, 1)
      // const _si = item.selectIndex
      // this.selectOption[_si[0]].children[_si[1]].children[_si[2]].open = false
      // // this.selectOption[_si[0]].children[_si[1]].children[_si[2]].children[_si[3]].open = false
      // this.searchByOption()
    },
    previewMaterial(item){
      window.open(ADDRESS.PREVIEW_MATERIAL+'?materialId='+item.materialId)
    }
  }
}
</script>

<style scoped>
.container{
  width:17rem;
  margin:0 auto;
}
.courseware-select{
  height: .8rem;
}
.courseware-select-item {
  width: 2rem;
  height: .6rem;
  padding: .1rem;
}

.test-question-select-item-search {
  width: 2.5rem;
  margin-right: 0;
}
.work-temp-top {
  padding: .55rem .02rem .2rem .02rem;
}
.work-shop-info-item{
  margin-right: .1rem;
}
.select-title{
  line-height: 1.5em;
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
  margin: .1rem 0;
  border-bottom: 1px solid #ddd;
}

.wtt-search-main-input {
  width: 1.5rem;
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

.work-temp-list {
  width: 17.32rem;
  margin: .3rem auto;
}
.sort-content{
  width: 17rem;
  margin: .3rem 0;
}
.cmwl-item {
  width: 5.4rem;
  height: 1.26rem;
  margin: 0 .32rem .4rem 0;
  cursor: pointer;
}

.cmwl-item:nth-child(3n) {
  margin-right: 0;
}

.cmwl-item-left {
  width: .7rem;
}

.content-main-work-list {
  padding-top: .5rem;
  padding-left: .02rem;
}

.cmwl-item-right {
  width: 4.7rem;
}

.cmwl-item-right-desc {
  margin: 0 .1rem .25rem .1rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cmwl-item-right-author {
  margin: 0 .1rem .1rem .1rem;
}
.cmwl-item-left-icon {
  position: relative;
  top: -.1rem;
}
.cmwl-item-flag-icon {
    top: 0;
    right: .1rem;
}

.wtl-item {
  width: 3.25rem;
  height: 1.1rem;
  margin: 0 .15rem .15rem 0;
  cursor: pointer;
}

.wtl-item-title {
  margin: .2rem;
}

.wtl-item-desc {
  margin: 0 .2rem .15rem .2rem;
}

.wtl-item-icon {
  margin: 0 .2rem .15rem .2rem;
}

.wtl-item-icon-item {
  margin-right: .25rem;
  width: .18rem;
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

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.69rem;
  height: 1.34rem;
}

.swp-page{
  clear:both;
}
</style>
