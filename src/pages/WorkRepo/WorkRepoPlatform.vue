
<template>
  <div class="container">
    <div class="work-temp-top clear">
      <div @click="activityOption.showChoiceFlag = !activityOption.showChoiceFlag" class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl">
        <img class="wtt-choice-icon" src="~assets/imgs/common/shaixuan.png" alt="shaixuan">
        <span>活动筛选</span>
      </div>
      <div class="TH-card test-question-select fl">
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-14 tqsi-title">格式</p>
          <my-cascader @choosed="handleDrop('file',$event)">
          </my-cascader>
        </div>
        <div class="test-question-select-item test-question-select-item-search inline-block relative">
          <p class="TH-f-c-fade fs-14 tqsi-title">关键字查询</p>
          <input @keyup.enter="handleDrop('keyword', 0)" type="text" class="otl-none ptsi-input" placeholder="请输入关键字" v-model="searchOption.keyword">
          <img @click="handleDrop('keyword', 0)" class="ptsi-icon absolute" src="~assets/imgs/common/search.png" alt="search">
        </div>
      </div>
    </div>
    <mutil-select class="work-temp-top-mutil-select absolute"
      v-if="activityOption.showChoiceFlag"
      :selectList="selectOption"
      type="single"
      @choiceActive="handleChoice($event)"
      @closeSelect="activityOption.showChoiceFlag = false"></mutil-select>
    <div @click="removeSelect()" class="work-temp-top-mutil-select-item inline-block relative" v-if="activityOption.choosenActivity[0].label">
      <span class="wtt-msi-name fl">{{activityOption.choosenActivity[0].label}}</span>
      <div class="wtt-msi-icon fl relative">
        <img class="absolute" src="~assets/imgs/classTask/search-cancel.png" alt="cancel">
      </div>
    </div>
    <div class="work-shop">
      <div class="work-shop-info clear fs-13 TH-f-c-default">
        <p class="work-shop-info-left fl">
          <span @click="handleDrop('orderType',1)" :class="{'TH-f-c-link':searchOption.orderType == 1}" class="work-shop-info-item cp">时间  </span>
          <span @click="handleDrop('orderType',2)" :class="{'TH-f-c-link':searchOption.orderType == 2}" class="work-shop-info-item cp">预览  </span>
          <span @click="handleDrop('orderType',3)" :class="{'TH-f-c-link':searchOption.orderType == 3}" class="work-shop-info-item cp">下载  </span>
        </p>
        <p class="work-shop-info-right fr TH-f-c-warn">{{workPages.total}}个</p>
      </div>
      <div class="work-shop-list">
        <div class="TF-temp-Arr-space" v-if="wList==''">
          <img src="~assets/imgs/codeZero/coll/no-collected-work.png" alt="">
          <p class="fs-18 TH-f-c-default">没有你需要的学生作品呢！</p>
        </div>
        <div v-if="wList!=''" class="cmwl-item TH-card inline-block" v-for="item in wList" @click="worksItemOpen(item)">
          <div class="cmwl-item-left fl ta-c">
            <img class="cmwl-item-left-icon" :src="platformPng(item.fileType)" alt="pic">
          </div>
          <div class="cmwl-item-right fl TH-f-c-default">
            <p class="cmwl-item-right-title fwb fs-16 tof" :title="item.worksTitle">{{item.worksTitle }}
              <span class="excellence-rate fr">
                <el-rate v-model="item.excellenceLevel" disabled disabled-void-color="#bfcbd9"></el-rate>
              </span>
            </p>
            <p class="cmwl-item-right-desc ws-no fs-13">
              <span>大小：{{fileSize(item.worksSize)}}</span>
              <span>预览：{{item.viewTimes}}</span>
              <span>下载：{{item.worksDownloads}}</span>
              <!-- <span>评分：{{item.score}}</span> -->
            </p>
            <p class="cmwl-item-right-author fs-14">{{item.categoryName}} <span class="fr TH-f-c-link">{{item.author}}</span></p>
          </div>
          <!-- <div v-if="item.flag" class="cmwl-item-flag relative">
            <img class="absolute cmwl-item-flag-icon" src="~assets/imgs/classTask/goog-work.png" alt="gw">
          </div> -->
        </div>
        <div class="work-shop-pages" v-if="workPages.total > 9">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="workHandleCurrentChange"
            :current-page.sync="workPages.current"
            :page-size="searchOption.rows"
            :page-sizes="[9, 18, 30]"
            layout="sizes, prev, pager, next"
            :total="workPages.total">
          </el-pagination>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import mutilSelect from '../../components/mutilSelect'
import myDropdown from '../../components/myDropdown'
import myCascader from '../../components/myCascader'
import { callLoading, deepClone, clearTree } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'

export default {
  name: 'WorkRepoPlatform',
  components: {
    'mutil-select': mutilSelect,
    'my-dropdown': myDropdown,
    'my-cascader': myCascader
  },
  computed: {
    selectOption() {
      return deepClone(this.$store.tree)
    }
  },
  data () {
    return {
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      },
      searchOption: {
        activityId: '',
        fileType: '',
        keyword: '',
        orderType: 1,
        page: 1,
        rows: 9
      },
      workPages: {
        total: 0,
        size: 9,
        current: 1,
      },
      wList: [],
      workList:[],
    }
  },
  created () {
    this.searchByOption()
  },
  methods: {
    fileSize(str){
      if( str < 1024 ){
        return str + "KB"
      }
      else{
        return parseInt(str / 1024) + 'MB'
      }
    },
    worksItemOpen(item){
      window.open(ADDRESS.WORKS_OF_EXCELLENT_WORDK + '?&workId='+item.worksId)
    },
    platformPng(file_name){
      let $file = file_name
      if( file_name=='docx'||file_name=='xlsx'||file_name=='pptx' ){
        $file = file_name.substring(0,file_name.length-1)
      }
      return 'static/imgs/uplod/'+$file+'.png'
    },
    handleChoice(ev) {
      this.activityOption.choosenActivity.splice(0,1,ev)
      console.log(ev)
      this.searchOption.activityId = ev.id
      this.searchByOption()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.workPages.current = 1
      this.searchByOption()
    },
    workHandleCurrentChange(p) {
      this.searchOption.page = p
      this.searchByOption()
    },
    removeSelect() {
      clearTree(this.selectOption)
      this.activityOption = {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      }
      this.searchOption.activityId = ''
      this.searchByOption()
    },
    handleDrop(type, item) {
      this.workPages.total = 0
      this.workPages.current = 1
      this.searchOption.page = 1
      if (type == 'file') {
        this.searchOption.fileType = item?item:''
      }
      else if (type == 'keyword') {
        // this.searchOption.keyword = item
      }
      else if (type == 'orderType') {
        this.searchOption.orderType = item
      }
      this.searchByOption()
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.WORK_LIST_PLATFORM_GOOD, this.searchOption)
        .then((res) => {
          if (res.body.code == 1) {
            this.wList = res.body.data.list
            this.workPages.total = +res.body.data.total
            callLoading.deactiveLoading()
          }
          else {
            this.wList = []
            this.workPages.total = 0
            callLoading.deactiveLoading()
          }
        }, (err) => {
          callLoading.deactiveLoading()
          console.log(err)
        })
    },
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
  width: 5.6rem;
  height: .8rem;
}

.test-question-select-item {
  width: 2rem;
  height: .6rem;
  margin: .1rem .2rem;
}

.test-question-select-item-search {
  width: 2.5rem;
  margin-right: 0;
}

.tqsi-title {
  margin-bottom: .1rem;
}

.ptsi-input {
  border-bottom: 1px solid #ddd;
  width: 100%;
  line-height: .4rem;

}

.ptsi-icon {
  right: 0;
  top: .35rem;
}

.work-shop {
  margin-top: .5rem;
}

.work-shop-info {
  margin-bottom: .2rem;
}

.work-shop-info-item {
  margin-right: .2rem;
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

.cmwl-item-right-desc span {
  margin-right: .15rem;
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

.work-shop-pages {
  margin: .25rem 0;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.41rem;
  height: 1.49rem;
}
</style>
