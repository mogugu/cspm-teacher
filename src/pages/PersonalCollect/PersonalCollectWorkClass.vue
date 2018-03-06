
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
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-14 tqsi-title">班级</p>
          <!-- <my-dropdown @choosed="handleDrop('class',$event)" :dropdownData="$store.dropdown.classList">
          </my-dropdown> -->
          <class-cascader
            @choosed="handleDrop('class',$event)"
            :classList="$store.dropdown.classCascaderList"
          >
          </class-cascader>
        </div>
        <div class="test-question-select-item inline-block">
          <p class="TH-f-c-fade fs-14 tqsi-title">班级优秀作品</p>
          <my-dropdown @choosed="handleDrop('classGood',$event)" :dropdownData="$store.dropdown.classListGood">
          </my-dropdown>
        </div>
        <div class="test-question-select-item test-question-select-item-search inline-block relative">
          <p class="TH-f-c-fade fs-13 tqsi-title">关键字搜索</p>
          <input @keyup.enter="handleDrop('keyword',0)" type="text" class="otl-none ptsi-input" placeholder="请输入关键字" v-model="searchOption.keyword">
          <img @click="handleDrop('keyword',0)" class="ptsi-icon absolute" src="~assets/imgs/common/search.png" alt="search">
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
          <span @click="handleDrop('orderType',0)" :class="{'TH-f-c-link': searchOption.orderType == 0}" class="work-shop-info-item cp">时间 <i>↓</i> </span>
          <span @click="handleDrop('orderType',1)" :class="{'TH-f-c-link': searchOption.orderType == 1}" class="work-shop-info-item cp">评分 <i>↓</i> </span>
          <span @click="handleDrop('orderType',2)" :class="{'TH-f-c-link': searchOption.orderType == 2}" class="work-shop-info-item cp">预览 <i>↓</i> </span>
          <span @click="handleDrop('orderType',3)" :class="{'TH-f-c-link': searchOption.orderType == 3}" class="work-shop-info-item cp">下载 <i>↓</i> </span>
        </p>
        <p class="work-shop-info-right fr TH-f-c-warn">{{workPages.total}}个</p>
      </div>
      <div class="work-shop-list">
        <div class="TF-temp-Arr-space" v-if="wList==''">
          <img src="~assets/imgs/codeZero/coll/no-collected-work.png" alt="">
          <p class="fs-18 TH-f-c-default">没有你需要的学生作品呢！</p>
        </div>
        <div class="cmwl-item TH-card inline-block relative" v-for="(item, $index) in wList" @click="worksItemOpen(item)">
          <div class="cmwl-item-left fl ta-c">
            <img class="cmwl-item-left-icon" :src="platformPng(item.fileType)" alt="pic">
          </div>
          <div class="cmwl-item-right fl TH-f-c-default">
            <p class="cmwl-item-right-title fwb fs-16 tof" :title="item.worksTitle">{{item.worksTitle }}</p>
            <p class="cmwl-item-right-desc ws-no fs-13">
              <span>大小：{{item.workSize}}KB</span>
              <span>预览：{{item.viewTimes}}</span>
              <span>下载：{{item.worksDownloads}}</span>
              <span>评分：<i class="TH-f-c-orange fwb">{{item.worksScore}}</i></span>
            </p>
            <!-- <p class="cmwl-item-right-author TH-f-c-link fs-14">{{item.author}}</p> -->
            <p class="cmwl-item-right-author fs-14">{{item.categoryName}} <span class="fr TH-f-c-link">{{item.author}}</span></p>

          </div>
          <div v-if="item.flag" class="cmwl-item-flag relative">
            <img class="absolute cmwl-item-flag-icon" src="~assets/imgs/classTask/goog-work.png" alt="gw">
          </div>
          <p v-if="!item.isFav" @click.stop="handleFav(item,$index,1)" class="cmwl-item-uncollect absolute fs-14 TH-f-c-default cp">收藏</p>
          <p v-if="item.isFav" @click.stop="handleFav(item,$index,0)" class="cmwl-item-collect absolute fs-14 TH-f-c-default cp">取消收藏</p>
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
import classCascader from '../../components/classCascader'
import { callLoading, deepClone, callToast, clearTree } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'

export default {
  name: 'PersonalCollectWorkClass',
  components: {
    'mutil-select':mutilSelect,
    'my-dropdown': myDropdown,
    'my-cascader': myCascader,
    'class-cascader': classCascader,
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
      workPages: {
        total: 0,
        size: 9,
        current: 1,
      },
      searchOption: {
        activityId: '',
        classId: '',
        fileType: '',
        isClassExcellent: '',
        keyword: '',
        orderType: 0,
        page: 1,
        rows: 9
      },
      wList: [],
    }
  },
  created () {
    this.searchByOption()
  },
  methods: {
    worksItemOpen(item){
      window.open(ADDRESS.WORKS_OF_STUDENT_PREVIEW +'?taskId='+item.taskId+'&studentWorksId='+item.studentWorksId)
    },
    platformPng(file_name){
      let $file = file_name
      if( file_name=='docx'||file_name=='xlsx'||file_name=='pptx' ){
        $file = file_name.substring(0,file_name.length-1)
      }
      return 'static/imgs/uplod/'+$file+'.png'
    },
    removeSelect() {
      clearTree(this.selectOption)
      this.activityOption = {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      }
      this.searchOption.activityId = ''
      console.log('this.searchOption.',this.searchOption);
      this.searchByOption()
    },
    handleChoice(item) {
      this.activityOption.choosenActivity.splice(0,1,item)
      this.searchOption.activityId = item.id
      this.searchByOption()
    },
    workHandleCurrentChange(p) {
      this.searchOption.page = p
      this.searchByOption()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.workPages.current = 1
      this.searchByOption()
    },
    handleDrop(type, item) {
      this.workPages.total = 0
      this.workPages.current = 1
      this.searchOption.page = 1
      if (type == 'file') {
        this.searchOption.fileType = item?item:''
      }
      else if (type == 'class') {
        this.searchOption.classId = item?this.$store.dropdown.classList[item].id:''
      }
      else if (type == 'classGood') {
        if (item == 0) {
          this.searchOption.isClassExcellent = ''
        }
        else if (item == 1) {
          this.searchOption.isClassExcellent = true
        }
        else {
          this.searchOption.isClassExcellent = false
        }
        // this.searchOption.keyword = item
      }
      else if (type == 'keyword') {

      }
      else if (type == 'orderType') {
        this.searchOption.orderType = item
      }
      this.searchByOption()
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.WORK_FAV_LIST_CLASS_ADDR, this.searchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.wList = res.body.data.list
            for (var i = 0; i < this.wList.length; i++) {
              this.wList[i].isFav = true
            }
            this.workPages.total = +res.body.data.total
            console.log('page ',this.workPages.total)
          }
          else {
            this.wList = []
            this.workPages.total = 0
          }
        }, (err) => {
          this.wList = []
          this.workPages.total = 0
          callLoading.deactiveLoading()
          console.log(err)
        })
    },
    handleFav(item, $index, type) {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SOURCEREPO_WORK_CLASS_FAVORITE_ADDR, {
        studentWorksId : item.studentWorksId,
        status: type
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if(res.body.code == 1) {
          console.log(item.isFav)
          item.isFav = !item.isFav
          this.wList.splice($index,1)
          callToast('操作成功')
        }
        else {
          callToast('操作失败', 'error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('操作失败', 'error')
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
  /* width: 3rem; */
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
  margin-top: .25rem;
}

.cmwl-item-uncollect,
.cmwl-item-collect {
  right: .1rem;
  top: .1rem;
  height: .16rem;
  line-height: .2rem;
}


.cmwl-item-uncollect::before {
  content: '';
  width: .16rem;
  height: .16rem;
  position: absolute;
  background: url('../../assets/imgs/common/collect.png') no-repeat no-repeat;
  background-size: cover;
  left: -.2rem;
  top:  0;
}

.cmwl-item-collect::before {
  content: '';
  width: .16rem;
  height: .16rem;
  position: absolute;
  background: url('../../assets/imgs/common/collected.png') no-repeat no-repeat;
  background-size: cover;
  left: -.2rem;
  top:  0;
}

.cmwl-item-uncollect:hover::before {
  background: url('../../assets/imgs/common/collected.png') no-repeat no-repeat;
  background-size: cover;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.41rem;
  height: 1.49rem;
}
</style>
