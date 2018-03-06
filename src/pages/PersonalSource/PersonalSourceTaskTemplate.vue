<template>
  <div class="container">
    <div class="work-temp-top clear relative">
      <div @click="activityOption.showChoiceFlag = !activityOption.showChoiceFlag" class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl">
        <img class="wtt-choice-icon" src="~assets/imgs/common/shaixuan.png" alt="shaixuan">
        <span>已涵盖 <i class="TH-f-c-link fs-26 fwb">{{$store.coverTree.count}}</i> 个活动 </span>
      </div>
      <div class="TH-card wtt-search TH-f-c-default fs-16 cp fl">
        <p class="TH-f-c-fade fs-14 wtt-search-label">关键字搜索</p>
        <div class="wtt-search-main relative">
          <input @keyup.enter="handleDrop('keyword')" class="otl-none wtt-search-main-input" type="text" placeholder="请输入关键字..." v-model="searchOption.title">
          <i class="absolute close-label cp" v-show="searchOption.title!=''" @click="removeSearchTitle">×</i>
          <img @click="handleDrop('keyword')" class="wtt-search-main-icon absolute" src="~assets/imgs/classTask/search.png" alt="search">
        </div>
      </div>
      <div @click="$router.push('/personalSource/taskTemplate/generate')" class="TH-button-primary paper-top-button absolute cp">
        <img class="paper-top-button-icon" src="~assets/imgs/classTask/publish-task.png" alt="air">
        <span class="fs-20">组装任务模板</span>
      </div>
    </div>
    <mutil-select class="work-temp-top-mutil-select absolute"
      v-if="activityOption.showChoiceFlag"
      :selectList="selectOption"
      type="single"
      :ctree="true"
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
    <div class="paper-list-title fs-13 clear">
      <p class="fl paper-list-title-left TH-f-c-default">
        <!-- <span class="cp">时间 <i>↓</i> </span> -->
      </p>
      <p class="fr paper-list-title-right TH-f-c-warn">{{workPage.total}}个</p>
    </div>
    <div class="work-temp-list clear">
      <div class="TF-temp-Arr-space" v-if="workList==''">
        <img src="~assets/imgs/codeZero/manage/no-finished-task.png" alt="">
        <p class="fs-18 TH-f-c-default">没有你需要的任务模板呢！</p>
      </div>
      <div class="wtl-item TH-card inline-block fl" v-for="item in workList" @click="$router.push({path:'/personalSourceDetail/taskTemplate',query:{id:item.tempId,isByMe:item.createByMe,isUpload:true}})">
        <p class="wtl-item-title cp fs-16 fwb TH-f-c-default tof" :title="item.tempName">{{item.tempName}}</p>
        <p class="wtl-item-desc fs-13 TH-f-c-default tof" v-if="item.activityName!=null">活动：<span>{{item.activityName}}</span> </p>
        <div class="wtl-item-icon">
          <img v-if="item.includeVideo" class="wtl-item-icon-item" src="~assets/imgs/source/video.png" alt="video">
          <img v-if="item.includePaper" class="wtl-item-icon-item" src="~assets/imgs/source/paper.png" alt="paper">
          <img v-if="item.includeAttachment" class="wtl-item-icon-item" src="~assets/imgs/source/fujian.png" alt="fujian">
          <img v-if="item.includeWork" class="wtl-item-icon-item" src="~assets/imgs/source/work.png" alt="work">
        </div>
      </div>
    </div>
      <div class="tp-pages" v-if="workPage.total > 10">
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
</template>

<script>
import mutilSelect from '../../components/mutilSelect'
import { ADDRESS } from '../../helpers/address'
import { callLoading, deepClone, clearTree, callToast } from '../../helpers/helper'

export default {
  name: 'PersonalSourceTaskTemplate',
  components: {
    'mutil-select':mutilSelect
  },
  data () {
    return {
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: [{'label':''}],
      },
      workList: [],
      workPage: {
        total: 0,
        size: 20,
        current: 1,
      },
      searchOption: {
        activityIds: [],
        title: '',
        page: 1,
        rows: 10,
        condition: 'my'
      }
    }
  },
  created () {
    callLoading.activeLoading()
    this.getSelectOption(this.searchByOption)
  },
  computed: {
    selectOption() {
      return deepClone(this.$store.coverTree.template.tree)
    }
  },
  methods: {
    removeSearchTitle(){

    },
    handleChoice(ev) {
      this.activityOption.choosenActivity.splice(0,1,ev)
      this.searchOption.activityIds[0] = ev.id
      console.log(ev)
      this.searchByOption()
      // this.activityOption.choosenActivity.push(ev)
      // this.searchOption.activityIds.push(ev.id)
      // this.searchByOption()
      // console.log(ev)
    },
    getSelectOption(cb) {
      if (this.$store.coverTree.template.tree.length > 0) {
        // this.selectOption = deepClone(this.$store.coverTree.template)
        cb()
        return
      }
      this.$http.get(ADDRESS.RESOURCE_COVER_TEMPLATE_ADDR)
        .then((res) => {
          if(res.body.code == 1) {
            this.$store.coverTree.count = res.body.data.size
            this.$store.coverTree.template.tree = res.body.data.tree[0].children.concat(res.body.data.tree[1].children)
            // this.selectOption = deepClone(this.$store.coverTree.template)
            console.log('tree',this.selectOption);
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
    workHandleCurrentChange(p){
      this.searchOption.page = p
      this.searchByOption()
    },
    handleSizeChange(val) {
      this.workPage.current = 1
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.searchByOption()
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SOURCEREPO_TASKTEMPLATE_ADDR
        , this.searchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.workList = res.body.data.list
            this.workPage.total = +res.body.data.total
          }
          else {
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
      this.searchOption.activityIds = []
      this.searchByOption()
    },
    handleDrop(type) {
      this.searchOption.page = 1
      this.workPage.current = 1
      this.searchByOption()
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
  padding: .1rem .02rem .2rem .02rem;
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

.work-temp-list {
  width: 100%;
  margin: .3rem auto;
}

.wtl-item {
  width: 3.25rem;
  /* height: 1.2rem; */
  margin: 0 .15rem .15rem 0;
  cursor: pointer;
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
  margin: 0 .2rem .2rem 0;
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

.paper-top-button {
  min-width: 1.8rem;
  padding: 0 .1rem;
  height: .55rem;
  line-height: .55rem;
  text-align: center;
  right: 0;
  top: .2rem;
}

.paper-top-button-icon {
  vertical-align: middle;
  margin-right: .1rem;
  width: .26rem;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.69rem;
  height: 1.34rem;
}
i.close-label{
  line-height: .22rem;
}
</style>
