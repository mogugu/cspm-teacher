
<template>
  <div class="container TH-f-c-default">
    <!-- <div class="TH-card">
      <div class="upload-to-mall-nav fs-18">上传至资源超市</div>
      <div class="upload-to-mall-content fs-16">
        <p class="th-f-bottom-big"><span class="Th-f-dark-color">{{uploadMall.text}}名：</span> {{uploadMall.name}}</p>
        <div class="th-f-bottom-big clear">
          <div class="upload-to-mall-money fl">
            <p class="Th-f-dark-color th-f-bottom-small">个人使用价格：</p>
            <div class="th-f-bottom-normal">
              <input class="input-mall-sale-money fs-16" type="text" v-model="uploadMall.personalPrice" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
              学习币
              <img src="static/imgs/common/coin.png" alt="coin">
            </div>
            <p class="Th-f-dark-color fs-14">(注：个人使用即仅限于购买者本人使用)</p>
          </div>
          <div class="upload-to-mall-money fl">
            <p class="Th-f-dark-color th-f-bottom-small">团体使用价格：</p>
            <div class="th-f-bottom-normal">
              <input class="input-mall-sale-money fs-16" type="text" v-model="uploadMall.teamPrice"   onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/>
              学习币
              <img src="static/imgs/common/coin.png" alt="coin">
              <span class="fs-14">(建议团体售价：个人售价*20)</span>
            </div>
            <p class="Th-f-dark-color fs-14">(注：团体使用即购买者可将该资源共享给其学生使用)</p>
          </div>
        </div>
        <div class="th-f-bottom-big" v-if="$route.query.type == 'video'">
            <p class="Th-f-dark-color th-f-bottom-small">视频预览时间：</p>
            <el-radio class="radio" v-model="uploadMall.time" :label="item.time" v-if="item.time < $route.query.time" v-for="(item,index) in videoWatchTime" :key="index">{{item.text}}</el-radio>
        </div>
        <p class="th-f-bottom-big Th-f-dark-color">{{uploadMall.text}}介绍：</p>
        <div class="th-f-bottom-big">
          <vue-html5-editor :z-index="2" @change="updateData" :content="uploadGoodDescrible" :height="160" :auto-height="true"></vue-html5-editor>
        </div>
        <p class="Th-f-dark-color">作者介绍：<span class="fr fs-13">（注：如需修改请至个人中心进行操作）</span> </p>
        <div class="actor-message-content-nav relative">
          <p class="fs-28 fwb TH-f-c-default th-f-bottom-more user-username-">
            {{$store.user.username}}
            <img v-if="uploadUserInfo.sex == 2" src="~assets/imgs/classManage/women.png" alt="women">
            <img v-if="uploadUserInfo.sex == 1" src="~assets/imgs/classManage/men.png" alt="men">
          </p>
          <p class="TH-f-c-dark-m th-f-bottom-normal">{{uploadUserInfo.schoolName}} 教师</p>
          <p class="TH-f-c-dark-m">
            <span class="TH-f-c-dark-m-user-job">职称：{{uploadUserInfo.title || '--'}}</span>
            <span class="TH-f-c-dark-m-user-job">学历：{{uploadUserInfo.highestDegree || '--'}}</span>
          </p>
        </div>
        <div class="actor-all-message-upload-mall">
          <div class="th-f-bottom-normal clear">
            <p class="fl TH-f-c-dark-m actor-message-left-width">职务信息：</p>
            <p class="fl actor-message-right-width">
              <span v-if="uploadUserInfo.positionDtos!=''" class="inline-block" v-for="(item,index) in uploadUserInfo.positionDtos">
                {{index==0?'':'、'}}{{item.unit}}（{{item.position}}）
              </span>
              <span v-if="uploadUserInfo.positionDtos==''">暂无信息</span>
            </p>
          </div>
          <div class="th-f-bottom-normal clear">
            <p class="fl TH-f-c-dark-m actor-message-left-width">项目经历：</p>
            <p class="fl actor-message-right-width">
              <span v-if="uploadUserInfo.projectExperienceDtos!=''" class="inline-block" v-for="(item,index) in uploadUserInfo.projectExperienceDtos">
                {{index==0?'':'、'}}{{item.projectName}}（{{item.projectGrade}}）
              </span>
              <span v-if="uploadUserInfo.projectExperienceDtos==''">暂无信息</span>
            </p>
          </div>
          <div class="th-f-bottom-normal clear">
            <p class="fl TH-f-c-dark-m actor-message-left-width">书籍出版：</p>
            <p class="fl actor-message-right-width">
              <span v-if="uploadUserInfo.publicationDtos!=''" class="inline-block" v-for="(item,index) in uploadUserInfo.publicationDtos">
                {{index==0?'':'、'}}{{item.publicationTitle}}（{{item.publisher}} {{item.publicationTime.substring(0,7)}}）
              </span>
              <span v-if="uploadUserInfo.publicationDtos==''">暂无信息</span>
            </p>
          </div>
          <div class="th-f-bottom-normal clear">
            <p class="fl TH-f-c-dark-m actor-message-left-width">荣誉奖励：</p>
            <p class="fl actor-message-right-width">
              <span v-if="uploadUserInfo.honorDtos!=''" class="inline-block" v-for="(item,index) in uploadUserInfo.honorDtos">
                {{index==0?'':'、'}}{{item.honor}}（{{item.startTime.substring(0,7)}} 至 {{item.endTime.substring(0,7)}}）
              </span>
              <span v-if="uploadUserInfo.honorDtos==''">暂无信息</span>
            </p>
          </div>
          <div class="th-f-bottom-normal clear">
            <p class="fl TH-f-c-dark-m actor-message-left-width">其他成果：</p>
            <p class="fl actor-message-right-width">{{uploadUserInfo.description || '暂无信息'}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="upload-to-mall-seller">
      <div class="TH-button-default cp fs-16" @click="uploadGoodToMall">上传</div>
    </div> -->
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      top="40%"
      :show-close='false'
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <span>此资源已上传至资源超市！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickTagBefore">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleRest"
      size="tiny"
      top="40%"
      :show-close='false'
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <div>上传成功，<span class="fwb TH-f-c-link">{{uploadMall.locationRest}}</span>秒后自动跳转！</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickTagBack">确 定</el-button>
      </span>
    </el-dialog> -->
    <div class="no-open-mall-door">
      <img src="static/imgs/source/underconstruction.png" alt="">
      <p class="fs-24 TH-f-c-link">此功能正在建设中，敬请期待……</p>
    </div>
  </div>
</template>

<script>
import { ADDRESS,HEAD } from '../../helpers/address'
import { getSec } from '../../helpers/getThisWeek'
import { helper, deepClone, callLoading, callToast  } from '../../helpers/helper'

export default {
  name: 'UpLoadMall',
  data () {
    return {
      uploadMall:{
        id:'',
        time:0,
        productType:1,
        type:'temp',
        text:'任务模板',
        personalPrice:'',
        teamPrice:'',
        name:'',
        locationRest:3
      },
      dialogVisible:false,
      dialogVisibleRest:false,
      uploadGoodDescrible:'',
      uploadMallInfo:{},
      uploadUserInfo:{},
      videoWatchTime:[
        {
          text:'30秒',
          time:30
        },
        {
          text:'45秒',
          time:45
        },
        {
          text:'1分钟',
          time:60
        },
        {
          text:'3分钟',
          time:180
        },
        {
          text:'5分钟',
          time:300
        },
        {
          text:'10分钟',
          time:600
        }
      ]
    }
  },
  created () {
    this.uploadMall.id = this.$route.query.id
    this.uploadMall.type = this.$route.query.type
    this.uploadMall.name = this.$route.query.name
    if(this.$route.query.type == 'temp'){
      this.uploadMall.text = '任务模板'
      this.uploadMall.productType = 1
    }
    else if(this.$route.query.type == 'video'){
      this.uploadMall.text = '视频'
      this.uploadMall.productType = 2
    }
    else{
      this.uploadMall.text = '试卷'
      this.uploadMall.productType = 3
    }
    this.checkProductByLinkId()
    this.UserInfoMessage()
  },
  methods: {
    updateData:function(data) {
      console.log(data)
      this.uploadGoodDescrible = data
    },
    checkProductByLinkId(){
      this.$http.post(ADDRESS.CHECK_PRODUCT_LINKID,{
        linkId:this.uploadMall.id
      })
      .then((res)=>{
        if(res.body.code == 100){
          this.dialogVisible = true
        }
      })
    },
    clickTagBefore(){
      if(this.uploadMall.productType == 1){
        this.$router.push('/personalSource/my/taskTemplate') 
      }
      else if(this.uploadMall.productType == 2){
        this.$router.push('/personalSource/my/video') 
      }
      else{
        this.$router.push('/personalSource/my/paper') 
      }
    },
    UserInfoMessage(){
      this.$http.post(ADDRESS.U_GET_TEACHER_RESUME)
      .then((res)=>{
        if(res.body.code == 1){
          this.uploadUserInfo = res.body.data
        }
      })
    },
    uploadGoodToMall(){
      console.log( this.uploadGoodDescrible)
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SELLER_INSERT_PRODUCT, {
        linkId : this.uploadMall.id,
        productType :this.uploadMall.productType,
        personalPrice :this.uploadMall.personalPrice ,
        teamPrice : this.uploadMall.teamPrice ,
        productDetail : this.uploadGoodDescrible,
        videoPreviewTimes : this.uploadMall.time
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.dialogVisibleRest = true
          var rest = 3
          var restTime = setInterval(
            ()=>{
              rest--
              this.uploadMall.locationRest = rest
              if(rest == 0){
                clearInterval(restTime)
                if(this.uploadMall.productType == 1){
                  this.$router.push('/personalSource/my/taskTemplate')
                }
                else if(this.uploadMall.productType == 2){
                  this.$router.push('/personalSource/my/video')
                }
                else{
                  this.$router.push('/personalSource/my/paper')
                }
              }
            },1000
          )
          // window.open('/bc/static/mall/1.0.0/index.html#/myUpload')
        }
        else {
          callToast(res.body.data, 'error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('上传失败', 'error')
        console.log(err)
      })
    },
    clickTagBack(){
      if(this.uploadMall.productType == 1){
        this.$router.push('/personalSource/my/taskTemplate')
      }
      else if(this.uploadMall.productType == 2){
        this.$router.push('/personalSource/my/video')
      }
      else{
        this.$router.push('/personalSource/my/paper')
      }
    }
  }
}
</script>

<style scoped>
.Th-f-dark-color{
  color: #878787;
}

.th-f-bottom-small{
  margin-bottom: .1rem;
}

.th-f-bottom-normal{
  margin-bottom: .15rem;
}

.th-f-bottom-two-level{

}

.th-f-bottom-big{
  margin-bottom: .3rem;
}

.container{
  width: 9.7rem;
  margin: 0 auto;
}

.upload-to-mall-nav{
  padding-left: .3rem;
  border-bottom: 1px solid #ddd;
  line-height: .55rem;
}

.upload-to-mall-content{
  padding:.15rem .3rem .5rem .3rem;
}

.upload-to-mall-money{
  width: 50%;
}

.upload-to-mall-money .th-f-bottom-normal{
  line-height: .4rem;
  height: .4rem;
}

.input-mall-sale-money{
  width: .78rem;
  height: .38rem;
  border: 1px solid #ddd;
  padding-left: .2rem;
  margin-right: .1rem;
}

.actor-message-content-nav{
  height: 1.5rem;
}

.actor-message-content-nav .absolute{
  width: 1.05rem;
  height: 1.25rem;
  background-color: pink;
  top: .25rem;
  right: 0;
}

.user-username-{
  padding-top: .25rem;
  margin-bottom: .2rem;
}

.TH-f-c-dark-m-user-job{
  margin-right: .3rem;
}

.actor-message-left-width{
  width: .9rem;
  line-height: .26rem;
}

.actor-message-right-width{
  width: 8.2rem;
  line-height: .26rem;
}

.upload-to-mall-seller{
  border-top: 1px solid #ddd;
  margin-top: .3rem;
  padding-top: .2rem;
}

.upload-to-mall-seller div{
  margin-left: .3rem;
  width: 1.45rem;
  height: .45rem;
  line-height: .45rem;
  text-align: center;
}

.no-open-mall-door{
  text-align: center;
  padding-top: 2rem;
}

.no-open-mall-door p{
  margin-top: .3rem;
}
</style>
      