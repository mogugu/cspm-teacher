
<template>
  <div class="container">
    <div class=" history-tophistory-top">
      <div class="TF-temp-Arr-space" v-if="workList==''">
        <img src="~assets/imgs/codeZero/manage/no-uploaded-work.png" alt="">
        <p class="fs-18 TH-f-c-default">还没有上传任何作品！</p>
      </div>
      <!-- <div class="fl history-student-products relative" v-for="(item,_index) in workList" @click="worksItemOpen(item)">
        <div class="cmwl-item-left fl ta-c">
          <img class="cmwl-item-left-icon" :src="platformPng(item.fileName)" alt="pic">
        </div>
        <div class="pro-good">
          <img v-if="item.excellentInClass" src="~assets/imgs/classTask/goog-work.png">
          <img v-if="item.recommendStatus == 1" src="~assets/imgs/classTask/platform-good.png">
        </div>
        <div class="student-product-message">
            <div class="fs-16 fwb defalut-color cp">{{item.worksTitle | truncate(10, '...') }}</div>
            <div class="fs-13 some-detail defalut-color">
                <span>大小：{{item.worksSize}}KB</span>
                <span>预览：{{item.viewTimes}}</span>
                <span>下载：{{item.worksDownloads}}</span>
                <span>评分：<i class="fwb">{{item.worksScore}}</i></span>
            </div>
            <p class="fs-13 defalut-color action-name">活动：{{item.categoryName}}</p>
        </div>
      </div> -->
      <div class="cmwl-item TH-card inline-block" :key="index" v-for="(item,index) in workList" @click="worksItemOpen(item)">
        <div class="cmwl-item-left fl ta-c">
          <img class="cmwl-item-left-icon" :src="platformPng(item.fileType)" alt="作品">
        </div>
        <div class="cmwl-item-right fl TH-f-c-default">
          <p class="cmwl-item-right-title fwb fs-16">{{item.worksTitle}}</p>
          <p class="cmwl-item-right-desc ws-no fs-13">
            <span class="mr-item">大小：{{item.worksSize}}KB</span>
            <span class="mr-item">预览：{{item.viewTimes}}</span>
            <span class="mr-item">下载：{{item.worksDownloads}}</span>
            <span class="mr-item">评分：<span class="c-f-goal">{{item.worksScore}}</span></span>
          </p>
          <p class="cmwl-item-right-author fs-14 TH-f-c-link">
            {{item.username}}
            <span class="fr fs-16 fwb color-ping-no" v-if="!item.isScore">未评分</span>  
            <span class="fr fs-16 fwb color-ping-ed" v-if="item.isScore">已评分</span>  
          </p>
        </div>
        <div v-if="item.excellentInClass" class="cmwl-item-flag relative">
          <img class="absolute cmwl-item-flag-icon" src="~assets/imgs/classTask/goog-work.png" alt="gw">
        </div>
      </div>
    </div>
    <div class="cmt-pages" v-if="studentPages.total > 12">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="studentHandleCurrentChange"
        :current-page.sync="studentPages.current"
        :page-size="searchOption.rows"
        :page-sizes="[9, 18, 30]"
        layout="sizes, prev, pager, next"
        :total="studentPages.total">
      </el-pagination>
  </div>
  </div>
</template>

<script>
import { callLoading } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'
export default {
  name: 'ClassManageStudentHistory',
  data () {
    return {
      studentPages: {
        total: 0,
        size: 16,
        current: 1,
      },
      searchOption: {
        studentId: '',
        page: 1,
        rows: 9
      },
      workList: []
    }
  },
  created () {
    this.searchOption.studentId = this.$route.query.id
    this.getDataList()
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
    studentHandleCurrentChange(p) {
      this.searchOption.page = p
      this.getDataList()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.studentPages.current = 1
      this.getDataList()
    },
    getDataList() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.WORK_LIST_CLASS, this.searchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.studentPages.total = +res.body.data.total
            this.workList = res.body.data.list
          }
          else {
            this.studentPages.total = 0
            this.workList = []
          }
        }, (err) => {
          this.studentPages.total = 0
          this.workList = []
          callLoading.deactiveLoading()
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container{
  width: 17rem;
  margin:0 auto;
}

.defalut-color{
  color:#535353;
}

.white-space-to-div{
  height: .4rem;
}

.history-top{
  /*margin-top: .4rem;*/
  width: 17.08rem;
}

.history-student-products{
  cursor: pointer;
  border-radius: 4px;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  width: 4rem;
  min-height: 1rem;
  margin: .25rem .25rem .05rem .02rem;
}

div.student-product-message{
  margin-left: .7rem;
}

.history-student-products img.pro-type{
  position: absolute;
  width: .48rem;
  height: .61rem;
  left: .15rem;
  top: -.15rem;
}

.history-student-products .pro-good{
  position: absolute;
  top: 0;
  right: .15rem;
}

.history-student-products .pro-good img{
  width: .22rem;
  height: .35rem;
  margin-left: .1rem;
}

.student-product-message div.fs-16.fwb{
  margin-top: .1rem;
  line-height: .28rem;
}

.student-product-message div.fs-13.some-detail{
  margin: .15rem .1rem .15rem 0rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.student-product-message div.fs-13.some-detail span{

}

.student-product-message div.fs-13.some-detail span i{
  font-style: normal;
  color: #ff6d01;
}

p.fs-13.defalut-color.action-name{
  margin-bottom: .1rem;
}

.cmt-pages {
  margin: .2rem 0;
}

.TF-temp-Arr-space{
  margin-top: 1rem;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.24rem;
  height: 1.5rem;
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

.cmwl-item-right-title {
  margin: .1rem .1rem .25rem .1rem;
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

.color-ping-ed{
  color: #31b21c;
}

.color-ping-no{
  color: #aaa;
}
</style>
