<template>
  <div class="container">
    <div class="work-temp-top clear">
      <div @click="activityOption.showChoiceFlag = !activityOption.showChoiceFlag" class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl">
        <img class="wtt-choice-icon" src="~assets/imgs/common/shaixuan.png" alt="shaixuan">
        <span>活动筛选</span>
      </div>
      <div class="TH-card wtt-search TH-f-c-default fs-16 cp fl">
        <p class="TH-f-c-fade fs-14 wtt-search-label">关键字搜索</p>
        <div class="wtt-search-main relative">
          <input @keyup.enter="handleDrop()" class="otl-none wtt-search-main-input" type="text" placeholder="请输入关键字..." v-model="searchOption.videoName">
          <img @click="handleDrop()" class="wtt-search-main-icon absolute" src="~assets/imgs/classTask/search.png" alt="search">
        </div>
      </div>
    </div>
    <mutil-select class="work-temp-top-mutil-select absolute"
      v-if="activityOption.showChoiceFlag"
      :selectList="selectOption"
      type="single"
      @choiceActive="handleChoice($event)"
      @closeSelect="activityOption.showChoiceFlag = false"></mutil-select>
    <!-- <div v-for="(bar, $index) in activityOption.choosenActivity" class="work-temp-top-mutil-select-item inline-block relative">
      <span class="wtt-msi-name fl">{{bar.label}}</span>
      <div @click="removeSelect(bar, $index)" class="wtt-msi-icon fl relative">
        <img class="absolute" src="~assets/imgs/classTask/search-cancel.png" alt="cancel">
      </div>
    </div> -->
    <div v-if="activityOption.choosenActivity[0].label" class="work-temp-top-mutil-select-item inline-block relative">
      <span class="wtt-msi-name fl">{{activityOption.choosenActivity[0].label}}</span>
      <div @click="removeSelect()" class="wtt-msi-icon fl relative">
        <img class="absolute" src="~assets/imgs/classTask/search-cancel.png" alt="cancel">
      </div>
    </div>
    <div class="work-temp-list">
      <div class="paper-list-title fs-13 clear">
        <p class="fl paper-list-title-left TH-f-c-default">
          <!-- <span class="cp">时间 <i>↓</i> </span> -->
        </p>
        <p class="fr paper-list-title-right TH-f-c-warn">{{workPage.total}}个</p>
      </div>
      <div class="TF-temp-Arr-space" v-if="videoList==''">
        <img src="~assets/imgs/codeZero/coll/no-colleted-video.png" alt="">
        <p class="fs-18 TH-f-c-default">没有你需要的视频呢！</p>
      </div>
      <div class="video-list" v-if="videoList!=''">
        <div @click="$router.push({path: '/sourceRepo/video/detail', query: {id:item.videoId}})"  @mouseover="item.mouseUpDown=true" @mouseleave="item.mouseUpDown=false" class="cp video-list-item TH-card inline-block" :key="index" v-for="(item,index) in videoList">
          <div class="video-list-item-top relative">
            <img :src="ImgFun(item.imgUrl)" onerror="this.src='./static/imgs/source/pic1.png'" alt="rp">
            <div class="video-list-item-absolute" :class="{'video-list-enter':item.mouseUpDown,'video-list-leave':!item.mouseUpDown}">
              <p class="fwb">活动：</p>
              <ul>
                <li>{{item.categoryName}}</li>
                <!-- <li :key="index" v-for="(_item,index) in item.knowledges" v-if="index <=4 ">{{index == 4 ? '...' : _item.knowledgeName}}</li> -->
              </ul>
            </div>
          </div>
          <p class="video-list-item-title TH-f-c-default fs-18 ta-c tof" :title="item.videoName">{{item.videoName}}</p>
          <div class="video-list-item-info clear">
            <p class="video-list-item-info-left fs-13 TH-f-c-fade fl">
              <img class="br-circle vli-il-icon" src="~assets/imgs/common/touxiang-default.png" alt="touxiang">
              <span class="vli-il-name">{{item.createrName}}</span>
            </p>
            <p class="video-list-item-info-right fl fs-13 TH-f-c-fade">
              <span class="vli-ir-item">{{item.watchs}}观看</span>
              <span class="vli-ir-item">{{item.favorites}}收藏</span>
            </p>
          </div>
          
        </div>
      </div>
      <div class="video-pages" v-if="workPage.total > 10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="workHandleCurrentChange"
          :current-page.sync="workPage.current"
          :page-size="searchOption.rows"
          :page-sizes="[10, 20, 50]"
          layout="sizes, prev, pager, next"
          :total="workPage.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mutilSelect from '../../components/mutilSelect'
import { ADDRESS } from '../../helpers/address'
import { callLoading, deepClone, clearTree } from '../../helpers/helper'

export default {
  name: 'SourceRepoWorkTemplate',
  components: {
    'mutil-select':mutilSelect
  },
  data () {
    return {
      // selectOption: deepClone(this.$store.tree),
      logo:'this.src="./static/imgs/source/pic2.png"',
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: [{'label':''}],
      },
      videoList: [],
      workPage: {
        total: 0,
        size: 10,
        current: 1,
      },
      searchOption: {
        categoryIds: [],
        videoName: '',
        page: 1,
        rows: 10
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
    ImgFun( con ){
      if( con.indexOf('/bc') == -1){
        return '/bc'+con
      }
      else{
        return con
      }
    },
    handleChoice(ev) {
      // this.activityOption.choosenActivity.push(ev)
      // this.searchOption.categoryIds.push(ev.id)
      // console.log(this.searchOption.categoryIds)
      // this.searchByOption()
      // console.log(ev)
      this.activityOption.choosenActivity.splice(0,1,ev)
      this.searchOption.categoryIds[0] = ev.id
      console.log(ev)
      this.searchByOption()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.workPage.current = 1
      this.searchByOption()
    },
    workHandleCurrentChange(p){
      this.searchOption.page = p
      this.searchByOption()
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SOURCEREPO_VIDEO_ADDR, this.searchOption)
        .then((res) => {
          if (res.body.code == 1) {
            callLoading.deactiveLoading()
            const _video_list = res.body.data.list
            _video_list.forEach(item => {
              item.mouseUpDown = false
            })
            this.videoList = _video_list
            this.workPage.total = +res.body.data.total
          }
          else {
            this.videoList = [];
            this.workPage.total = 0
            callLoading.deactiveLoading()
          }
        }, (err) => {
          this.workPage.total = 0
          callLoading.deactiveLoading()
          console.log(err)
        })
    },
    handleDrop(type, item) {
      this.searchOption.page = 1
      this.workPage.current = 1
      if (type == 'keyword') {
      }
      this.searchByOption()
    },
    removeSelect() {
      // console.log('index ', this.activityOption.choosenActivity.indexOf(item))
      // index = index || this.activityOption.choosenActivity.indexOf(item)
      // this.activityOption.choosenActivity.splice(index,1)
      // this.searchOption.categoryIds.splice(index, 1)
      // const _si = item.selectIndex
      // this.selectOption[_si[0]].children[_si[1]].children[_si[2]].open = false
      // // this.selectOption[_si[0]].children[_si[1]].children[_si[2]].children[_si[3]].open = false
      // this.searchByOption()
      clearTree(this.selectOption)
      this.activityOption = {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      }
      this.searchOption.categoryIds = []
      this.searchByOption()
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

.work-temp-list {
  width: 100%;
  margin: .3rem auto;
}

.video-list-item {
  width: 3.2rem;
  height: 2.7rem;
  margin: 0 .25rem .25rem 0;
  overflow: hidden;
}

/* 新增需求 */

.video-list-item-absolute{
  width: 3.2rem;
  height: 1.8rem;
  background-color: rgba(255,255,255,.9);
  position: absolute;
  top: 1.8rem;
  left: 0;
  padding: 0rem .2rem;
}

.video-list-item-absolute p.fwb{
  margin-top: .25rem;
}

.video-list-item-absolute li{
  margin-top: .15rem;
}

.video-list-enter{
  animation:mouseUp 500ms ease-out 0s 1 alternate forwards;
  -webkit-animation:mouseUp 500ms ease-out 0s 1 alternate forwards;
  -moz-animation:mouseUp 500ms ease-out 0s 1 alternate forwards;
  -o-animation:mouseUp 500ms ease-out 0s 1 alternate forwards;
  -ms-animation:mouseUp 500ms ease-out 0s 1 alternate forwards;
}

@keyframes mouseUp{
  from {
    top: 1.8rem;
  }
  to {
    top: 0rem;
  }
}

.video-list-leave{
  animation:mouseDown 500ms ease-out 0s 1 alternate forwards;
  -webkit-animation:mouseDown 500ms ease-out 0s 1 alternate forwards;
  -moz-animation:mouseDown 500ms ease-out 0s 1 alternate forwards;
  -o-animation:mouseDown 500ms ease-out 0s 1 alternate forwards;
  -ms-animation:mouseDown 500ms ease-out 0s 1 alternate forwards;
}

@keyframes mouseDown{
  form{
    top : 0;
  }
  to{
    top : 1.8rem;
  }
}

/* 新增需求结束 */

.video-list-item:nth-child(5n) {
  margin: 0 0 .3rem 0;
}

.video-list-item-top {
  width: 100%;
  height: 1.8rem;
  overflow: hidden;
}

.video-list-item-top img {
  width: 100%;
  height: 100%;
}

.video-list-item-title {
  margin: .2rem 0;
}

.video-list-item-info-left  {
  height: .24rem;
  line-height: .24rem;
  margin-left: .2rem;
}

.video-list-item-info-right  {
  height: .2rem;
  line-height: .2rem;
  margin-left: .2rem;
}

.vli-il-icon {
  width: .2rem;
  height: .2rem;
}

.vli-il-name {
  vertical-align: text-bottom;
}


.vli-ir-item {
  margin-right: .15rem;
  vertical-align: middle;
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
  width: 1.48rem;
  height: 1.17rem;
}

.paper-list-title{
  margin-bottom: .15rem;
}
</style>
