
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
          <input @keyup.enter="searchByOption()" class="otl-none wtt-search-main-input" type="text" placeholder="请输入关键字..." v-model="searchOption.title">
          <img @click="searchByOption()" class="wtt-search-main-icon absolute" src="~assets/imgs/classTask/search.png" alt="search">
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
    <div class="work-temp-list clear">
      <div class="paper-list-title fs-13 clear">
        <p class="fl paper-list-title-left TH-f-c-default">
          <!-- <span class="cp">时间 <i>↓</i> </span> -->
        </p>
        <p class="fr paper-list-title-right TH-f-c-warn">{{workPage.total}}个</p>
      </div>
      <div class="TF-temp-Arr-space" v-if="workList==''">
        <img src="~assets/imgs/codeZero/manage/no-finished-task.png" alt="">
        <p class="fs-18 TH-f-c-default">没有你需要的任务模板呢！</p>
      </div>
      <div @click="$router.push({path:'/sourceRepo/workTemplate/detail',query:{id:item.tempId}})" class="wtl-item TH-card inline-block relative fl cp" v-for="(item, $index) in workList">
        <p class="wtl-item-title cp fs-16 fwb TH-f-c-default tof">{{item.tempName}}</p>
        <p class="wtl-item-desc fs-13 TH-f-c-default" v-if="item.activityName!=null">活动：<span>{{item.activityName}}</span> </p>
        <div class="wtl-item-icon">
          <img v-if="item.includeVideo" class="wtl-item-icon-item" src="~assets/imgs/source/video.png" alt="video">
          <img v-if="item.includePaper" class="wtl-item-icon-item" src="~assets/imgs/source/paper.png" alt="paper">
          <img v-if="item.includeAttachment" class="wtl-item-icon-item" src="~assets/imgs/source/fujian.png" alt="fujian">
          <img v-if="item.includeWork" class="wtl-item-icon-item" src="~assets/imgs/source/work.png" alt="work">
        </div>
        <p @click="handleFav(item, $index)" :class="{'wtl-item-uncollect': item.favoriteStatus, 'wtl-item-collect': !item.favoriteStatus}" class="cp fs-14 TH-f-c-default absolute">
          <span v-if="item.favoriteStatus">取消收藏</span>
          <span v-if="!item.favoriteStatus">收藏</span>
        </p>
      </div>
      <div class="wtl-pages" v-if="workPage.total > 20">
        <el-pagination
        @current-change="workHandleCurrentChange"
        :current-page.sync="workPage.current"
        :page-size="workPage.size"
        layout="prev, pager, next"
        :total="workPage.total">
      </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mutilSelect from '../../components/mutilSelect'
import { ADDRESS } from '../../helpers/address'
import { callLoading, deepClone, clearTree, callToast } from '../../helpers/helper'

export default {
  name: 'PersonalSourceAllTemplate',
  components: {
    'mutil-select':mutilSelect
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
      workList: [],
      workPage: {
        total: 0,
        size: 20,
        current: 1,
      },
      searchOption: {
        activityId: [],
        title: '',
        page: 1,
        rows: 10,
        condition: '',
      }
    }
  },
  created () {
    this.searchByOption()
  },
  methods: {
    handleChoice(ev) {
      this.activityOption.choosenActivity.splice(0,1,ev)
      this.searchOption.activityId[0] = ev.id
      console.log(ev)
      this.searchByOption()
    },
    workHandleCurrentChange(p){
      this.searchOption.page = 1
      this.searchByOption()
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.get(ADDRESS.SOURCEREPO_TASKTEMPLATE_ADDR,{params: this.searchOption})
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            let _list = res.body.data.list
            for (var i = 0; i < _list.length; i++) {
              _list[i].favoriteStatus = true
            }
            this.workList = _list
            this.workPage.total = +res.body.data.total
          }else{
            this.workList = []
            this.workPage.total = 0
          }
        }, (err) => {
          this.workList = []
          this.workPage.total = 0
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
      this.searchOption.activityId = []
      this.searchByOption()
    },
    handleFav(item, $index) {
      callLoading.activeLoading()
      const _addr = ADDRESS.SOURCEREPO_TASKTEMPLATE_FAV_ADDR
      this.$http.post(_addr, {tempId: item.tempId})
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            item.favoriteStatus = !item.favoriteStatus
            if (!item.favoriteStatus) {
              this.workList.splice($index, 1)
            }
            callToast('操作成功')
          }
          else {
            callToast('操作失败', 'error')
          }
        },(err) => {
          callLoading.deactiveLoading()
          callToast('操作失败', 'error')
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
  padding: 0 .02rem .2rem .02rem;
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

.wtl-item {
  width: 3.25rem;
  /* height: 1.2rem; */
  margin: 0 .15rem .15rem 0;
}

.wtl-item-title {
  margin: .2rem;
  line-height: 1.2;
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

.paper-list-title {
  margin-bottom: .2rem;
}

.paper-list-title-left span {
  margin-right: .2rem;
}

.wtl-item-collect {
  right: .05rem;
  bottom: .05rem;
  height: .2rem;
  text-align: right;
}

.wtl-item-collect::before {
  content: '';
  width: .16rem;
  height: .16rem;
  position: absolute;
  background: url('../../assets/imgs/common/collect.png') no-repeat no-repeat;
  background-size: cover;
  left: -.2rem;
  top: -.01rem;
}

.wtl-item-uncollect {
  right: .05rem;
  bottom: .05rem;
  height: .2rem;
  text-align: right;
}

.wtl-item-uncollect::before {
  content: '';
  width: .16rem;
  height: .16rem;
  position: absolute;
  background: url('../../assets/imgs/common/collected.png') no-repeat no-repeat;
  background-size: cover;
  left: -.2rem;
  top: -.01rem;
}

/*.wtl-item-uncollect:hover::before {
  background: url('../../assets/imgs/common/collected.png') no-repeat no-repeat;
  background-size: cover;
}*/

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.69rem;
  height: 1.34rem;
}
</style>
