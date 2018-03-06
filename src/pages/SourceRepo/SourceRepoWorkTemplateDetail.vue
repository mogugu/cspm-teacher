<template>
  <div class="container clear TH-card">
    <div class="baseinfo clear border-bottom">
      <div class="baseinfo-left content-left fl">
        <div class="baseinfo-title">
          <h1 class="fs-20 inline-block">{{taskInfo.title || '' | truncate(21, '...')}}</h1>
          <span class="action-last-time fs-14">作者：{{taskInfo.authorName}}</span>
        </div> 
        <div class="baseinfo-bottom fs-16">
          <p><span class="baseinfo-label inline-block"><img src="~assets/imgs/classTask/activity.png" alt="activity"></span>活动：
            {{taskInfo.activityName}}</p>
        </div>   
      </div>
      <div class="baseinfo-right content-right fl">
        <!-- v-if="!isByMe && !taskInfo.favoriteStatus" -->
        <div class="text-center" v-if="$route.path.split('/')[1] != 'personalSourceDetail'">
          <p @click="handleFav()" v-if="!isByMe && !taskInfo.favoriteStatus"  class="cp inline-block fs-14 w-detail-left-collect img-text-center">
            <img src="~assets/imgs/common/collect.png"  alt="收藏"/>
            <span>收藏</span>
          </p>
          <p @click="handleFav()" v-if="!isByMe && taskInfo.favoriteStatus" class="cp inline-block fs-14 w-detail-left-collect-active img-text-center">
            <img src="~assets/imgs/common/collected.png"  alt="已收藏"/>
            <span>已收藏</span>
          </p>
        </div>
        <div v-if="isByMe">
          <div class="inline-block">
            <p class="edit-template" @click="EditTaskTemp"><img src="static/imgs/source/edit.png">编辑</p>
          </div>
          <div class="inline-block">
            <p class="delete-template" @click="dialogFormVisible=true"><img src="static/imgs/source/delete.png">删除</p>
          </div>
          <!-- <p class="inline-block delete-template"><img src="static/imgs/source/delete.png">删除</p> -->
        </div>
        <!-- <div class="ta-c" v-if="$route.path.split('/')[1] == 'personalSourceDetail'">
          <p class="ptir-upload inline-block">
            <span v-if="!taskInfo.inShop" class="fs-14 TH-f-c-fade block TH-f-c-link">未上传至资源超市</span>
            <span v-if="!taskInfo.inShop" @click="goUpload()" class="block TH-button-default ptir-upload-button ta-c cp">立即上传</span>
            <span v-if="taskInfo.inShop" class="fs-14 TH-f-c-link block TH-f-c-link">已上传至资源超市</span>
            <span v-if="taskInfo.inShop" @click="goShopDetail()" class="TH-button-default ptir-upload-button block ta-c cp">立即查看</span>
          </p>
        </div> -->
      </div>
    </div>
    <div class="add-content-main-html relative" :key="index" v-for="(item,index) in taskInfo.teachingProceduresDtos">
      <div class="clear" v-html="ReplaceAllTid(item.html)"></div>
      <!-- <div class="absolute button-location-setting">
        <div class="TH-button-primary ta-c cmpc-right-button cp fs-16 relative" 
              v-if="ForEachTypeWork(item.contents)">
          上传作品
          <ul class="task-paper-lists TH-card absolute">
            <li class="inline-block" v-if="_item.type == 4" 
                :key="_index" v-for="(_item,_index) in item.contents">{{_item.name}}</li>
          </ul>
        </div>
      </div> -->
    </div>
    <el-dialog :visible.sync="dialogFormVisible" custom-class="dialog-edit-grade choose-now-added-model upload-model-to-mall" top="30%" :close-on-click-modal="false" :close-on-press-escape="false" 
      @close="dialogFormVisible=false">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>删除任务模板</span>
      </div>
      <div class="upload-mall-resource">
        <!-- <p class="fs-20 fwb">任务模板发布成功！</p> -->
        <p class="fs-18">你确定要删除此任务模板吗？</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="RemoveTaskTemp" >是</el-button>
        <el-button @click="dialogFormVisible=false">否</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import { callLoading, deepClone, videoTime,callToast,convertImgToUrl } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'
export default {
  name: 'SourceRepoWorkTemplateDetail',
  data () {
    return {
      tempId: '',
      isByMe: null,
      SaveTaskTemplate: false,
      dialogFormVisible:false,
      taskInfo:{}
    }
  },
  created () {
    this.tempId = this.$route.query.id
    this.isByMe = (this.$route.query.isByMe==false||this.$route.query.isByMe=='false')?false:true
    // console.log( typeof(this.isByMe), this.isByMe )
    this.getBaseInfo()
  },
  methods: {
    ForEachTypeWork($content){
      for( var i=0;i<$content.length;i++ ){
        if( $content[i].type == 4 ){
          return true
        }
      }
    },
    ReplaceAllTid( content){
      return convertImgToUrl(content).replace(/tid=/, "?tid="+this.taskId) 
    },
    getBaseInfo() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SOURCEREPO_TASKTEMPLATE_DETAIL_ADDR, {
        tempId: this.tempId,
        createByMe: this.isByMe
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
           this.taskInfo = res.body.data
        }
        else{

        }
      }, (err) => {
        callLoading.deactiveLoading()
      })
    },
    handleFav() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SOURCEREPO_TASKTEMPLATE_FAV_ADDR, {
        tempId: this.tempId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.taskInfo.favoriteStatus = !this.taskInfo.favoriteStatus
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
    },
    RemoveTaskTemp(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.DELETE_TASK_TEMPLE, {
        tempId: this.tempId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          callToast('删除成功')
          let _this = this
          var t=setTimeout(function(){
            _this.$router.push({path:'/personalSource/my/taskTemplate'})
          },500)
        }
        else {
          callToast('删除失败', 'error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('删除失败', 'error')
        console.log(err)
      })
    },
    EditTaskTemp(){
      if( this.taskInfo.teachingProceduresDtos[0].name == '' ){
        this.SaveTaskTemplate = true
      }
      else{
        this.$router.push({path:'/personalSource/taskTemplate/generate',query:{id:this.tempId}})
      }
    },
    goShopDetail() {
      window.open(`/bc/static/mall/${VERSION}/index.html#/pay/temp?id=${this.taskInfo.productId}&isUpload=isMe`)
    },
    goUpload() {
      this.$router.push({path:'/personalSource/uploadMall', query: {
          id: this.tempId,
          type: 'temp',
          name: this.taskInfo.title
        }
      })
    },
  }
}
</script>

<style scoped>
div{
  box-sizing: border-box;
}
.container {
  width: 12rem;
  margin: 0 auto;
  background-color: #f6f6f6;
}




/* 以前的样式 */
.content {
  width: 9.3rem;
  min-height: 4rem;
  background-color: #fff;
}


.content-tab-item {
  margin-right: .4rem;
}

.content-tab-item-active {
  font-size: .32rem;
  color: #535353;
}

.content-main-work-choice {
  margin-top: .3rem;
}

.cmwc-item-list {
  margin-bottom: .15rem;
}

.cmwc-item-list-item {
  margin-right: .2rem;
}

.cmwc-item-list-item-active {

}

.content-main-work-manage {
  margin-top: .3rem;
}

.cmwm-left-item {
  margin-right: .2rem;
  height: .4rem;
  line-height: .4rem;
}

.cmwm-right-button {
  width: 1.2rem;
  height: .4rem;
  line-height: .4rem;
  border-radius: 20px;
}

.cmwm-right-button img {
  position: relative;
  top: .05rem;
  width: .2rem;
}

.cmwl-item {
  width: 4rem;
  min-height: 1rem;
  margin: 0 .68rem .4rem 0;
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
  width: 3rem;
}

.cmwl-item-right-title {
  margin: .1rem .1rem .2rem .1rem;
}

.cmwl-item-right-desc {
  margin: 0 .1rem .15rem .1rem;
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

.content-main-video-card {
  width: 9.5rem;
  height: 3rem;
  margin: .7rem 0
}

.cmvc-left {
  width: 4.2rem;
  height: 100%;
}

.cmvc-left img {
  width: 100%;
  height: 100%;
}

.cmvc-right {
  height: 100%;
  width: 4.5rem;
  margin: .2rem .3rem;
}

.cmvc-right-bar {
  width: .65rem;
  height: .05rem;
  margin-bottom: .4rem;
}

.cmvc-right-button {
  width: 1.2rem;
  height: .4rem;
  border-radius: 20px;
  line-height: .4rem;
  bottom: .35rem;
  left: 0;
}

.cmvc-right-more {
  margin: .2rem 0;
}

.cmvc-right-info {
  margin-bottom: .15rem;
}

.cmvc-right-more-item {
  margin-right: .2rem;
}

.content-main-paper-card {
  margin: .7rem 0;
  padding: .3rem .25rem;
  height: .75rem;
  width: 9.4rem;
}

.cmpc-left-bar {
  width: .65rem;
  height: .05rem;
  margin-bottom: .25rem;
}

.cmpc-left-title {
  margin-bottom: .25rem;
}

.cmpc-left-info {
  margin-bottom: .15rem;
}

.cmpc-left-info-item {
  margin-right: .15rem;
}

.cmpc-right {
  right: .3rem;
  top: .5rem;
}


.content-main-work-pages {
  margin-bottom: .25rem;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.41rem;
  height: 1.49rem;
}

.ptir-upload-button{
  height: .32rem;
  line-height: .32rem;
  padding: 0 .15rem;
  border-radius: .2rem;
  margin-top: .15rem;
}

.img-text-center{
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex-box;
  -webkit-box-align:center;
  -ms-flex-align:center;
  align-items:center;
  -webkit-box-pack:center;
  -ms-flex-pack:center;
  text-align:center;
  display:flex;
  justify-content:center;
}

.w-detail-left-collect,
.w-detail-left-collect-active{
  height: .32rem;
  line-height: .32rem;
  border: 2px solid #ddd;
  width: 1.2rem;
  border-radius: .3rem;
  margin: .2rem auto;
}

.w-detail-left-collect span,
.w-detail-left-collect-active span{
  margin-left: .1rem;
}

.w-detail-left-collect-active{
  color: #ff7316;
  border: 1px solid #ff7316;
}

.edit-template,
.delete-template{
  color: #535353;
  font-size: .16rem;
  line-height: .28rem;
  display: flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  margin-left: .3rem;
}

.edit-template:hover{
  color: #3498db;
}

.delete-template:hover{
  color: #f64444;
}

.edit-template img,
.delete-template img{
  margin-right: 5px;
}
</style>
