
<template>
  <div class="container">
    <div class="upload-img-default-first-step">
      <div class="uplode-inner-video ">
        <div class="upload-false-success relative">
          <!-- 默认上传 -->
          <el-upload
            :action="material_address"
            :on-progress="uploadVideoBefore"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadVideoType"
            :file-list="materialsList"
            :on-change="changeVideoTit"  
            :before-upload="beforeAvatarUpload"
            class="uplod_video"
            :class="{'up-top-small-height':uploadVideo,'down-small-height':!uploadVideo}"
            >
            <button type="button" class="upload-button-default fs-16 TH-button-primary">
                <i class="el-icon-upload2"></i>
                选择教案
            </button>
            <span slot="tip" class="fs-14 disableColor upload-warning-message">请勿上传色情、反动等资源 不超过100MB</span>
          </el-upload>
          <!--上传成功 -->
          <span class="right-top-delete" v-show="show_success"><i class="el-icon-close" @click="handleRemove"></i></span>
          <p v-show="show_success" class="fs-20 absolute">添加成功</p>
        </div>

        <div class="upload-other-message clear">
          <div class="upload-material-activity fl">
              <p class="disableColor">活动：</p>
              <div class="uvac-choose cp" @click="activityOption.showChoiceFlag = !activityOption.showChoiceFlag">
                <span class="uvac-choose-label fs-28">+</span>
                 <span class="fs-14">选择对应活动</span>
              </div>
              <mutil-select class="work-temp-top-mutil-select absolute"
                v-if="activityOption.showChoiceFlag"
                :selectList="selectOption"
                type="single"
                @choiceActive="handleChoice($event)"
                @closeSelect="activityOption.showChoiceFlag = false">
              </mutil-select>
              <div v-if="activityOption.choosenActivity[0].label" class="work-temp-top-mutil-select-item inline-block relative">
                <span class="wtt-msi-name fl fs-14">{{activityOption.choosenActivity[0].label}}</span>
                <span @click="removeSelect()" class="wtt-msi-icon fl fs-20 inline-block cp">×</span>
              </div>
          </div>
          <div class="upload-material-message fl">
            <p class="disableColor">标题：<span class="fr fs-13">不超过20字</span></p>
            <input type="text" maxlength="20" v-model="materials.name"
              onkeyup="value=value.replace(/[^\a-\z\A-\Z\0-\9\u4E00-\u9FA5]/g,'')" onpaste="return false"/>
          </div>
        </div>
      </div>
    </div>
    <div class="first-step-button fs-14">
        <input type="button"  value="确认上传" @click="uploadMaterials">
    </div>
  </div>
</template>

<script>
import { ADDRESS,HEAD } from '../../helpers/address'
import { getSec } from '../../helpers/getThisWeek'
import { callLoading, callToast, deepClone, callMimeTypeCheck, clearTree} from '../../helpers/helper'
import mutilSelect from '../../components/mutilSelect'

export default {
  name: 'PersonalSourceMaterialsUpload',
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
      // selectOption: deepClone(this.$store.selectvideo.dataList),
      material_address:ADDRESS.UP_LOAD_MATERIAL,
      dialogFormVisibleUploadMall:false,
      uploadVideo:false,
      show_success:false,
      materialsList:[],
      materials:{
        name:'',
        activityId:null,
        activityName:'',
        materialType:1,
        url:''
      },
      
      activityOption:{
        //choosenActivity:[]
        showChoiceFlag: false,
        choosenActivity: [{'label':''}],
      }
    }
  },
  created () {
  },
  methods: {
    // uploadToMall(){
    //   this.$router.push({path:'/personalSource/uploadMall',query:{
    //     id:this.uploadId,
    //     type:'video',
    //     name:this.video.name,
    //     time:this.video.time
    //     }})
    // },
    handleChoice(ev) {
      this.activityOption.choosenActivity.splice(0,1,ev)
      console.log(this.activityOption.choosenActivity)
    },
    fileSize(str){
      return parseInt(str /1024)
    },
    removeSelect() {
      clearTree(this.selectOption)
      this.activityOption = {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      }
    },
    uploadVideoBefore(){
      this.uploadVideo = true;
    },
    handleRemove(){
      this.uploadVideo = false;
      this.show_success = false;
      this.materialsList = [];
      this.materials.name = '';
    },
    uploadVideoType(response,file,fileList) {
      if(response.code==1){
        this.show_success = true;
        this.materials.url = response.data;
        console.log(response.data);
        //this.playerOptions.sources[0].src = HEAD + response.data;
      }
    },
    addMaterialsInfo(){
       if(this.activityOption.choosenActivity[0].label=='') {
          callToast('请选择对应活动', 'warning')
          return
        }
        callLoading.activeLoading();
        this.$http.post(ADDRESS.UP_LOAD_MATERIAL_INFO,{
          fileUrl: this.materials.url,
          fileTitle:this.materials.name,
          materialType: 2,
          activityName:this.activityOption.choosenActivity[0].name,
          activityId:this.activityOption.choosenActivity[0].id
        })
        .then((res) => {
          callLoading.deactiveLoading()
          if(res.body.code==1){
           callToast('教案上传成功！','success')
           this.$router.push('/personalSource/my/lessonPlan')
          }
        }, (err) => {
          callLoading.deactiveLoading()
          callToast('教案上传失败！','error')
        })
    },
    changeVideoTit(file,fileList){
      console.log(file)
        var str = file.name;
        this.materials.name = file.name.substring(0,str.length - 4).substring(0,20);
    },
    uploadMaterials(){
      if(this.materials.url==''){
        callToast('您还没有上传教案哦','warning')
      }else if(this.materials.name==''){
        callToast('请填写教案名称','warning')
      }else{
        this.addMaterialsInfo();
      }
    },
    handleAvatarSuccess(res, file) {
      // console.log(res,file)
      this.materials.imageUrl = URL.createObjectURL(file.raw);
      this.materials.imgUrl = res.data;
      this.playerOptions.poster = HEAD + res.data;
    },
    beforeAvatarUpload(file){
      const type =  ['ppt','pptx','doc','docx','txt','xls','xlsx','png','jpg','psd','swf','pdf']
      if (callMimeTypeCheck(file, type)) {
        const isLt500 = file.size / 1024 / 1024 < 100
        if (!isLt500) {
          callToast('上传教案大小不能超过 100MB！','warning')
        }
        return isLt500
      }
      else {
        return false
      }
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
.container{
  width: 17rem;
  margin:0 auto;
}

.down-small-height{
  animation:theanimationdown 500ms ease-out 0s 1 alternate forwards;
}

.up-top-small-height{
  animation:theanimationUp 500ms ease-out 0s 1 alternate forwards;
}

@keyframes theanimationUp{
  from{ top : 0; }
  to{ top : -.8rem; }
}

@keyframes theanimationdown{
  from{ top : -.8rem; }
  to{ top : 0; }
}

.upload-video-second-step{
  padding: .05rem .05rem;
}

.defaultColor{
  color:#535353;
}

.disableColor{
  color:#878787;
}

.activeColor{
  color: #3283d3;
}

.form-width{
  width: 4.5rem;
}

.form-width li{
  margin-bottom: .35rem;
}

.form-width li p{
  margin-bottom: .1rem;
}

.el-dropdown{
  border:.01rem solid #ddd;
  /*padding: 0 .1rem;*/
}

.upload-img-some-what-index {
  text-align: center;
  margin-top: .1rem;
}

.upload-img-url{
  width: 3.1rem;
  margin: 0 auto;
}

.upload-img-url p.fs-16{
  margin-bottom: .1rem;
}

.up-load-here-click{
  width: 3.15rem;
  height: 1.8rem;
  border:.01rem solid #ddd;
  cursor: pointer;
}

.form-width li input{
  width: 100%;
  border: .01rem solid #ddd;
  height: .38rem;
  padding-left: .1rem;
}

.upload-img-default-first-step{
  width: 12rem;
  min-height: 3rem;
  border-radius: 4px;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  margin:0 auto;
}

.uplode-inner-video{
  margin:0 .25rem;
  padding-top: .15rem;
  padding-bottom: .2rem;
}

.upload-false-success{
  height: 1rem;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
}

.upload-false-success p.fs-20{
  top:.4rem;
  color:#3283d3;
}

.upload-false-success span.right-top-delete{
  position: absolute;
  right: 0;
  top: 0;
  background-color: #fff;
  line-height: .26rem;
  padding: 0 .1rem;
  cursor: pointer;
}

.upload-false-success>div.uplod_video{
  position: absolute;
  top: 0;
  width: 11.5rem;
}

button.upload-button-default {
  width: 1.8rem;
  height: .6rem;
  outline: none;
  border:none;
  cursor: pointer;
  margin-top: .1rem;
}

button.upload-button-default i{
  margin-right: .2rem;
  font-size: .2rem;
}

button.upload-button-default:hover{
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #3ebbe4, #4093e4);
}

.upload-warning-message{
  margin-left: .2rem;
}

.upload-other-message.clear{
  margin-top: .4rem;
}

.upload-material-activity{
  width: 2.94rem;
  margin-right: .2rem;
}
.upload-material-message{
  width: 4.65rem;
  height: 1.4rem;
}
.upload-material-message p,
.upload-material-activity p{
  margin-bottom: .1rem;
}
.upload-material-message input{
  width: 4.65rem;
  border: .01rem solid #ddd;
  height: .38rem;
  padding-left: .1rem;
}

.uvac-choose{
  width: 2rem;
  height: .38rem;
  line-height: .38rem;
  border: .01rem solid #ddd;
  color: #535353;
  text-align: center;
}
.uvac-choose-label{
  display: inline-block;
  color: #3283d3;
  font-weight: bold;
  margin-right: .1rem;
  line-height: .3rem;
}

.first-step-button{
  width: 12rem;
  margin: 0 auto;
  margin-top: .5rem;
  padding-top: .3rem;
  border-top: 1px solid #d0d0d0;
}

.first-step-button input{
  margin-left: .3rem;
  width: 1.48rem;
  height: .48rem;
  font-size: .16rem;
  color: #fff;
  border: none;
  outline: none;
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #37c796, #08af95);
  border-radius: .04rem;
  cursor: pointer;
}

.first-step-button input:hover{
  /*box-shadow: 0 1px 2px rgba(2,22,37,.3);*/
  background-image: linear-gradient(to top, #47d4a4, #0bc0a4);
}
.work-temp-top-mutil-select-item{
  margin-top: .15rem;
  border-radius: 30px;
  border: 1px solid #3283d3;
  color: #535353;
  padding: .08rem .1rem;
  line-height: .22rem;
} 
.wtt-msi-icon {
  width: .19rem;
  height: .19rem;
  line-height: .19rem;
  text-align: center;
  margin-left: .1rem;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #3283d3;
  vertical-align: middle;
}
/* .up-load-video-online-watch{
  width: 11rem;
  min-height: 5rem;
  border-radius: 4px;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  margin-right: .8rem;
}

.up-load-video-knowlege-list{
  width: 4.4rem;
  max-height: 9.75rem;
  overflow: auto;
  border-radius: 4px;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  padding-bottom: .1rem;
}

.upload-video-activity-container {
  width: 4.4rem;
  min-height: 1rem;
}

.up-load-video-online-watch p.fs-20{
  margin: .2rem .2rem;
}

.videoContent{
  width: 10.6rem;
  height: 5.2rem;
  margin: 0 1.2rem .2rem .2rem;
  background-color: rgba(89,89,89,.1);
}

.know-lege-add-list{
  width: 6.4rem;
  min-height: 3.05rem;
  margin: .1rem .25rem 0 .1rem;
  background-color: rgba(201,216,222,.4);
}

.know-lege-add-list .nedd-add-to-model{
  width: 1.2rem;
  margin: 0 auto;
  padding-top: .9rem;
}

.know-lege-add-list .nedd-add-to-model img{
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
}

.know-lege-add-list .nedd-add-to-model p{
  text-align: center;
}

.knowlege-title{
  padding: .1rem .2rem .2rem .2rem;
  height: .4rem;
  line-height: .4rem;
}

.knowlege-title span:first-child{
  width: 2.5rem;
}

.knowlege-title span:last-child{
  cursor: pointer;
}

.knowlege-title span:last-child i{
  margin-right: .1rem;
}

.knowlege-content{
  padding: 0 .2rem;
}

.knowlege-content p{
  margin-bottom: .1rem;
}

.knowlege-content div.fs-14{
  line-height: .24rem;
  height: 1.5rem;
}

.knowlege-content textarea{
  height: 1.3rem;
  width: 5.8rem;
  border: 1px sold #ddd;
  resize: none;
  border-radius: .02rem;
  line-height: .24rem;
  padding: .1rem .1rem;
}

.know-lege-button-right{
  padding-top: .1rem;
  text-align: right;
}

.know-lege-button-right input{
  margin-left: .2rem;
  border:none;
  border-radius: .04rem;
  outline: none;
  width: 1rem;
  height: .36rem;
  cursor: pointer;
}

.know-lege-button-right input:first-child{
  color: #fff;
  background-color: #3283d3;
}

.know-lege-button-right input:last-child{
  background-color: #d6d6d6;
}

div.first-step-button.second-step{
  border-top: 1px solid #ddd;
  width: 15rem;
  text-align: right;
  padding-top: .2rem;
}

div.first-step-button.second-step input:last-child{
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #37c796, #08af95);
}

div.first-step-button.second-step input:last-child:hover{
  background-image: linear-gradient(to top, #47d4a4, #0bc0a4);
}
.up-load-here-click .img-add-here{
  text-align: center;
  margin-top: .4rem;
}

.up-load-here-click .img-add-here img{
  width: .54rem;
  height: .54rem;
}

.up-load-here-click p{
  text-align: center;
  margin-top: .25rem;
}

.avatar-uploader .avatar{
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 3.25rem;
  height: 1.8rem;
}

.wtt-choice-icon {
  position: relative;
  top: .05rem;
}

.wtt-search {
  width: 4rem;
  height: .8rem;
  border-right: none;
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
  background-color: #f5f5f5;
}

.otl-none {
  outline: none;
  border: none;
}

.wtt-search-main-icon {
  right: 0;
  bottom: .05rem;
}

.work-temp-top-mutil-select-item {
  height: .4rem;
  line-height: .4rem;
  border-radius: 4px;
  text-align: center;
  background-color: #535353;
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #9599a0, #6b7279);
  color: #fff;
  margin: .2rem 0;
}

.work-temp-top-mutil-select-item:hover {
  background-image: linear-gradient(to top, #a8a9aa, #777b7f);
}

.wtt-msi-name{
    border-right: 1px solid #fff;
    height: 100%;
    display: inline-block;
    min-width: .9rem;
    padding: 0 .25rem;
    text-align: center;
}

.wtt-msi-icon {
    top: .1rem;
    right: .08rem;
}

.wtt-msi-icon img{
  cursor: pointer;
  width: .15rem;
  height: .15rem;
}

.wtt-msi-icon {
    width: .35rem;
    height: .35rem;
    position: relative;
} */

</style>
