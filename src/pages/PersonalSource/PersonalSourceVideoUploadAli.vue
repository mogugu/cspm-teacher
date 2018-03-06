
<template>
  <div class="container">
    <!-- First step -->
    <div class="upload-img-default-first-step">
      <div class="uplode-inner-video ">
        <div class="upload-false-success relative">
          <!-- 默认上传 -->
          <!-- <el-upload
            :action="video_address"
            :on-progress="uploadVideoBefore"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadVideoType"
            :file-list="videoList"
            :on-change="changeVideoTit"
            :before-upload="beforeAvatarUploadVideo"
            class="uplod_video"
            :class="{'up-top-small-height':uploadVideo,'down-small-height':!uploadVideo}"
            >
            <button type="button" class="upload-button-default fs-16 TH-button-primary">
                <i class="el-icon-upload2"></i>
                选择视频
            </button>
            <span slot="tip" class="fs-14 disableColor upload-warning-message">请上传 MP4 格式文件，请勿上传色情、反动等视频  不超过500MB</span>
          </el-upload> -->
          <!-- 阿里云的上传 -->
          <div v-if="videoStatus.flag == 0" class="ali-upload-container ta-c relative cp inline-block">
            <i data-v-124dd50f="" class="el-icon-upload2"></i>
            <span class="auc-label fs-16 inline-block">选择视频</span>
            <input class="auc-button" type="file" @change="uploadAdd($event)">
          </div>
          <span class="inline-block fs-14 TH-f-c-fade">请上传 MP4 格式文件，请勿上传色情、反动等视频 不超过500MB</span>
          <p class="ali-upload-file-label fs-16">{{videoFile.name}}</p>
          <el-progress v-if="videoStatus.flag == 1" :text-inside="true" :stroke-width="18" :percentage="videoStatus.percent"></el-progress>
          <!-- <input type="button" @click="startUpload()" value="上传"> -->
          <!--上传成功 -->
          <!-- <span class="right-top-delete" v-show="show_success"><i class="el-icon-close" @click="handleRemove"></i></span> -->
          <!-- <p v-show="show_success" class="fs-20 absolute">添加成功</p> -->
        </div>
        <div class="upload-other-message clear">
          <div class="upload-video-message-list fl">
              <ul class="fs-16 form-width">
                <li>
                  <p class="disableColor">标题：<span class="fr fs-13">不超过20字</span></p>
                  <input type="text" maxlength="20" v-model="video.name"
                    onkeyup="value=value.replace(/[^\a-\z\A-\Z\0-\9\u4E00-\u9FA5]/g,'')" onpaste="return false"/>
                </li>
              </ul>
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
          </div>
          <div class="upload-video-message-list fl">
              <div class="upload-img-url">
                 <p  class="disableColor fs-16">封面：</p>
                 <el-upload
                  class="avatar-uploader relative"
                  :action="img_address"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="video.imageUrl" :src="video.imageUrl" class="avatar">
                     <div class="up-load-here-click">
                        <div class="img-add-here">
                          <img src="~assets/imgs/source/upload-cover.png" alt="">
                        </div>
                        <p class="fs-14 disableColor">上传漂亮的封面能增加点击率</p>
                     </div>
                  </el-upload>
                 <div class="upload-img-some-what-index fs-14 disableColor">不超过5M,支持jpg、png、tiff格式</div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="first-step-button fs-14">
        <input type="button" value="确认上传" @click="changeUploadType()" class="TH-button-default">
    </div>
    <!-- 上传到资源超市 -->
    <el-dialog :visible.sync="dialogFormVisibleUploadMall" custom-class="dialog-edit-grade choose-now-added-model upload-model-to-mall" top="30%" :close-on-click-modal="false" :close-on-press-escape="false" 
      @close="$router.push('/personalSource/my/video')">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>同步上传到资源超市</span>
      </div>
      <div class="upload-mall-resource">
        <p class="fs-20 fwb">视频发布成功！</p>
        <p class="fs-16">是否同步上传至资源超市进行售卖？</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadToMall" >是</el-button>
        <el-button @click="$router.push('/personalSource/my/video')">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ADDRESS, HEAD } from "../../helpers/address";
import { getSec } from "../../helpers/getThisWeek";
import {
  callLoading,
  callToast,
  deepClone,
  callMimeTypeCheck,
  clearTree
} from "../../helpers/helper";

// import '../../helpers/aliVideo/vod-sdk-upload-1.1.0.min.js'
// import '../../helpers/aliVideo/aliyun-sdk.min.js'

import mutilSelect from "../../components/mutilSelect";

export default {
  name: "PersonalSourceVideoUpload",
  components: {
    "mutil-select": mutilSelect
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    selectOption() {
      return deepClone(this.$store.tree);
    }
  },
  data() {
    return {
      // selectOption: deepClone(this.$store.selectvideo.dataList),
      video_address: ADDRESS.UP_LOAD_VIDO,
      img_address: ADDRESS.UP_LOAD_IMG,
      dialogFormVisibleUploadMall: false,
      uploadVideo: false,
      secondType: false,
      show_success: false,
      videoStatus: {
        flag: 0,
        percent: 0,
      },
      videoList: [],
      video: {
        imageUrl: "",
        name: "",
        classes: [],
        url: "",
        imgUrl: "",
        kownleges: [],
        add_Time: 0,
        id: 0,
        knowlegeName: "",
        time: 0,
        aliyunVideoId: "",
        fileSize: '',
      },
      videoFile: {},
      markers: [],
      playerOptions: {
        start: 0,
        playsinline: false,
        muted: false,
        language: "en",
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ],
        poster: ""
      },
      dataList: [],
      listed: false,
      dataAddr: "http://baobab.kaiyanapp.com/api/v1/feed?num=1",
      dialogFormVisibleModel: false,
      addKnowlege: {
        knowledgeName: "",
        knowledgeId: "",
        type: false,
        content: "",
        time: "0:00:00"
      },
      activityOption: {showChoiceFlag: false, choosenActivity: [{'label':''}]},
      //choosenActivity: [{'label':''}] },
      uploadId: "",
      hasActivity: false,
      //showActivityChoice: false
      uploadInfo: {
        auth: '',
        addr: '',
        videoId: '',
      }
    }
  },
  created() {},
  methods: {
    uploadToMall() {
      this.$router.push({
        path: "/personalSource/uploadMall",
        query: {
          id: this.uploadId,
          type: "video",
          name: this.video.name,
          time: this.video.time
        }
      });
    },

    handleChoice(ev) {
      this.activityOption.choosenActivity.splice(0, 1, ev);
      console.log(this.activityOption.choosenActivity);
    },
    removeSelect() {
      clearTree(this.selectOption);
      this.activityOption = {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      }
    },
    uploadVideoBefore() {
      this.uploadVideo = true;
    },
    handleRemove() {
      this.uploadVideo = false;
      this.show_success = false;
      this.videoList = [];
      this.video.name = "";
    },
    uploadVideoType(response, file, fileList) {
      if (response.code == 1) {
        this.show_success = true;
        this.video.url = response.data;
        this.playerOptions.sources[0].src = HEAD + response.data;
      }
    },
    changeVideoTit(file, fileList) {
      console.log(file);
      var str = file.name;
      this.video.name = file.name.substring(0, str.length - 4).substring(0, 20);
    },
    changeUploadType() {
      // if (this.video.url == "") {
      //   callToast("您还没有上传视频哦", "warning");
      // } else 
      if (!this.activityOption.choosenActivity[0].id) {
        callToast("请选择活动", "warning")
        return
      }
      if (this.video.name == "") {
        callToast("请填写视频名字", "warning");
      } else if (this.video.imgUrl == "") {
        callToast("视频封面图片要上传哦", "warning");
      } else {
        this.startUpload()
        this.videoStatus.flag = 1
      }
    },
    addKnowleges() {
      this.pauseVideo(); //视频暂停
      this.dialogFormVisibleModel = true;
    },
    preStepClick() {
      this.firsType = true;
      this.secondType = false;
    },
    handleAvatarSuccess(res, file) {
      // console.log(res,file)
      this.video.imageUrl = URL.createObjectURL(file.raw);
      this.video.imgUrl = res.data;
      this.playerOptions.poster = HEAD + res.data;
    },
    beforeAvatarUpload(file) {
      const type = ["jpg", "jpeg", "png", "tiff"];
      if (callMimeTypeCheck(file, type)) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          callToast("上传头像图片大小不能超过 5MB！", "warning");
        }
        return isLt2M;
      } else {
        return false;
      }
    },
    beforeAvatarUploadVideo(file) {
      const type = ["mp4"];
      if (callMimeTypeCheck(file, type)) {
        const isLt500 = file.size / 1024 / 1024 < 500;
        if (!isLt500) {
          callToast("上传视频大小不能超过 500MB！", "warning");
        }
        else {
          console.log(file)
          this.getUploadAuth(file)
          .then((res) => {
            console.log(res)
            this.uploadInfo.auth = res.uploadAuth
            this.uploadInfo.addr = res.uploadAddress
            this.uploader.setUploadAuthAndAddress(this.uploadInfo.auth, this.uploadInfo.addr);
            this.uploader.startUpload()
            // return false
          })
          .catch((err) => {
            console.log(err)
            return false
          })
          // this.uploader.
        }
      } else {
        return false;
      }
    },
    SecondToDate(time) {
      if (null != time && "" != time) {
        time =
          this.fix(parseInt(time / 3600), 2) +
          ":" +
          this.fix(parseInt((time % 3600) / 60), 2) +
          ":" +
          this.fix(parseInt(((time % 3600) % 60) % 60), 2);
      }
      return time;
    },
    fix(num, length) {
      return ("" + num).length < length
        ? (new Array(length + 1).join("0") + num).slice(-length)
        : "" + num;
    },
    addKnowlegePushToVideo() {
      callLoading.activeLoading();
      this.$http
        .post(ADDRESS.UP_LOAD_VIDEO_KNOWLEGR, {
          videoId: this.video.id,
          knowledgeId: this.addKnowlege.knowledgeId,
          beginTime: this.addKnowlege.time,
          knowledgeName: this.addKnowlege.knowledgeName,
          content: this.addKnowlege.content
        })
        .then(
          res => {
            callLoading.deactiveLoading();
            if (res.body.code == 1) {
              this.markers.push({
                videoId: this.video.id,
                knowledgeId: this.addKnowlege.knowledgeId,
                time: this.addKnowlege.time,
                knowledgeName: this.addKnowlege.knowledgeName,
                content: this.addKnowlege.content,
                type: true
              });
              this.addKnowlege.type = false;
              this.addKnowlege.knowledgeName = "";
              this.addKnowlege.content = "";
              // this.addKnowlege.time = ''
              this.addKnowlege.knowledgeId = "";
              callToast("添加成功！", "success");
            } else {
              callToast("添加失败！", "error");
            }
          },
          err => {
            callLoading.deactiveLoading();
            callToast("添加失败！", "error");
          }
        );
    },
    changeKnowlegeContent(item, id, content) {
      callLoading.activeLoading();
      this.$http
        .post(ADDRESS.CHANGE_KNOWLEGE_CONENT, {
          videoId: this.video.id,
          knowledgeId: id,
          content: content
        })
        .then(
          res => {
            callLoading.deactiveLoading();
            if (res.body.code == 1) {
              item.type = true;
              callToast("修改成功！", "success");
            } else {
              callToast("修改失败！", "error");
            }
          },
          err => {
            callLoading.deactiveLoading();
            callToast("修改失败！", "error");
          }
        );
    },
    deleteKnowlege(id, _index) {
      callLoading.activeLoading();
      this.$http
        .post(ADDRESS.DELETE_KOWLEGE_CONTENT, {
          videoId: this.video.id,
          knowledgeId: id
        })
        .then(
          res => {
            callLoading.deactiveLoading();
            if (res.body.code == 1) {
              callToast("恭喜你，删除成功！", "success");
              this.markers.splice(_index, 1);
            } else {
              callToast("删除失败！", "error");
            }
          },
          err => {
            callLoading.deactiveLoading();
            callToast("删除失败！", "error");
          }
        );
    },
    uploadVideoStatus() {
      //console.log(this.markers)
      //更新视频状态
      // if(this.markers.length==0){
      //   callToast('您还没有添加知识点哟','warning')
      // }else{
      callLoading.activeLoading();
      this.$http
        .post(ADDRESS.UP_LOAD_VIDEO_COMPLETE, {
          videoId: this.video.id
        })
        .then(
          res => {
            callLoading.deactiveLoading();
            if (res.body.code == 1) {
              this.$router.push("/personalSource/my/video");
              // this.uploadId = this.video.id
              // this.dialogFormVisibleUploadMall = true
            } else {
              callToast("上传失败！", "error");
            }
          },
          err => {
            callLoading.deactiveLoading();
            callToast("上传失败！", "error");
          }
        );
      // }
    },
    addBaseInfo(cb) {
      if (this.activityOption.choosenActivity.length == 0) {
        callToast("请选择对应活动", "warning");
        return;
      }
      callLoading.activeLoading();
      this.$http
        .post(ADDRESS.UP_LOAD_VIDEO_STEP_1, {
          videoName: this.video.name,
          imgUrl: "/bc" + this.video.imgUrl,
          videoUrl: this.video.url,
          disciplineCode: 3,
          gradeNo: 7,
          isOpened: false,
          categoryId: this.activityOption.choosenActivity[0].id,
          categoryName: this.activityOption.choosenActivity[0].name,
          aliyunVideoId: this.video.aliyunVideoId,
          fileSize: this.video.fileSize
        })
        .then(
          res => {
            callLoading.deactiveLoading();
            if (res.body.code == 1) {
              // this.video.time = getSec(res.body.data.duration);
              this.video.id = res.body.data.videoId;
              cb();
              // this.firsType = false
              // this.secondType = true
              // this.onPlayerPlay()
            }
          },
          err => {
            callLoading.deactiveLoading();
            callToast("视频信息上传失败！", "error");
          }
        );
    },
    completeUp() {
      this.addBaseInfo(vid => {
        this.uploadVideoStatus();
      });
    },
    getUploadAuth(file) {
      return new Promise((resolve, reject) => {
        this.$http.post(ADDRESS.ALI_VIDEO_UPLOAD_AUTH, {
          fileName: file.name,
          title: +new Date()
        })
        .then((res) => {
          if (res.body.code == 1) {
            resolve((res.body.data))
          }
          else {
            reject(res.body.data)
          }
        })
        .catch(err => reject(err))
      })
    },
    uploadAdd(event) {
      const file = event.target.files[0]
      const type = ["mp4"];
      if (callMimeTypeCheck(file, type)) {
        const isLt500 = file.size / 1024 / 1024 < 500;
        if (!isLt500) {
          callToast("上传视频大小不能超过 500MB！", "warning");
        }
        this.uploadInfo.file = event.target.files[0]
        const userData = {
          Vod: {
            UserData: {
              IsShowWaterMark: false,
              Priority: 7
            }
          }
        }
        this.video.name = event.target.files[0].name
        this.videoFile = event.target.files[0]
        this.uploader.addFile(file, null, null, null, JSON.stringify(userData))
      }
      // else {
      //     callToast("上传视频格式需要为mp4",'warning');
      // }
    },
    startUpload() {
      this.getUploadAuth(this.uploadInfo.file)
      .then((res) => {
        this.uploadInfo.auth = res.uploadAuth
        this.uploadInfo.addr = res.uploadAddress
        this.uploadInfo.videoId = res.videoId
        this.uploader.setUploadAuthAndAddress(this.uploadInfo.auth, this.uploadInfo.addr);
        this.uploader.startUpload()
      })
    }
  },
  mounted() {
    let self = this
    console.log(VODUpload)
    this.uploader = new VODUpload({
        // 开始上传
        'onUploadstarted': function (uploadInfos) {
          console.log(uploadInfos)
          console.log(self.uploadInfo)
          // console.log("onUploadStarted:" + uploadInfos.file.name + ", endpoint:" + uploadInfos.endpoint + ", bucket:" + uploadInfos.bucket + ", object:" + uploadInfos.object);
          self.uploader.setUploadAuthAndAddress(uploadInfos, self.uploadInfo.auth, self.uploadInfo.addr);
        },
        // 文件上传成功
        'onUploadSucceed': function (uploadInfo) {
          self.video.aliyunVideoId = self.uploadInfo.videoId
          self.video.fileSize = self.uploadInfo.file.size
          self.firsType = false
          self.secondType = true
          self.completeUp()
          console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
        },
        // 文件上传失败
        'onUploadFailed': function (uploadInfo, code, message) {
          console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
        },
        // 文件上传进度，单位：字节
        'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
            console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(uploadedSize * 100 / totalSize) + "%");
            self.videoStatus.percent = Math.ceil(uploadedSize * 100 / totalSize)
        },
        // 上传凭证超时
        'onUploadTokenExpired': function () {
            console.log("onUploadTokenExpired");
            // uploader.resumeUploadWithAuth(uploadAuth);
        }
      });
    }
};
</script>

<style scoped>
.container {
  width: 17rem;
  margin: 0 auto;
}

.down-small-height {
  animation: theanimationdown 500ms ease-out 0s 1 alternate forwards;
}

.up-top-small-height {
  animation: theanimationUp 500ms ease-out 0s 1 alternate forwards;
}

@keyframes theanimationUp {
  from {
    top: 0;
  }
  to {
    top: -0.8rem;
  }
}

@keyframes theanimationdown {
  from {
    top: -0.8rem;
  }
  to {
    top: 0;
  }
}

.upload-video-second-step {
  padding: 0.05rem 0.05rem;
}

.defaultColor {
  color: #535353;
}

.disableColor {
  color: #878787;
}

.activeColor {
  color: #3283d3;
}

.form-width {
  width: 4.5rem;
}

.form-width li {
  margin-bottom: 0.35rem;
}

.form-width li p {
  margin-bottom: 0.1rem;
}

.el-dropdown {
  border: 0.01rem solid #ddd;
  /*padding: 0 .1rem;*/
}

.upload-img-some-what-index {
  text-align: center;
  margin-top: 0.1rem;
}

.upload-img-url {
  width: 3.1rem;
  margin: 0 auto;
}

.upload-img-url p.fs-16 {
  margin-bottom: 0.1rem;
}

.up-load-here-click {
  width: 3.15rem;
  height: 1.8rem;
  border: 0.01rem solid #ddd;
  cursor: pointer;
}

.form-width li input {
  width: 100%;
  border: 0.01rem solid #ddd;
  height: 0.38rem;
  padding-left: 0.1rem;
}

.upload-img-default-first-step {
  width: 12rem;
  min-height: 4rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 5px rgba(2, 22, 37, 0.3);
  margin: 0 auto;
}

.uplode-inner-video {
  margin: 0 0.25rem;
  padding-top: 0.15rem;
  padding-bottom: 0.2rem;
}

.upload-false-success {
  height: 1.4rem;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
}

.upload-false-success p.fs-20 {
  top: 0.4rem;
  color: #3283d3;
}

.upload-false-success span.right-top-delete {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #fff;
  line-height: 0.26rem;
  padding: 0 0.1rem;
  cursor: pointer;
}

.upload-false-success > div.uplod_video {
  position: absolute;
  top: 0;
  width: 11.5rem;
}

button.upload-button-default {
  width: 1.8rem;
  height: 0.6rem;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 0.1rem;
}

button.upload-button-default i {
  margin-right: 0.2rem;
  font-size: 0.2rem;
}

button.upload-button-default:hover {
  box-shadow: 0 1px 2px rgba(2, 22, 37, 0.3);
  
  background-image: linear-gradient(to top, #3ebbe4, #4093e4);
}

.upload-warning-message {
  margin-left: 0.2rem;
}

.upload-other-message.clear {
  margin-top: 0.4rem;
}

.upload-video-message-list {
  height: 3rem;
  width: 5.74rem;
}

.upload-video-message-list:last-child {
  border-left: 1px solid #ddd;
}

.first-step-button {
  width: 12rem;
  margin: 0 auto;
  margin-top: 0.5rem;
}

.first-step-button input {
  margin-left: 0.3rem;
  width: 1.48rem;
  height: 0.48rem;
  font-size: 0.16rem;
  border: none;
  outline: none;
  cursor: pointer;
}

.first-step-button input:hover {
  /*box-shadow: 0 1px 2px rgba(2,22,37,.3);*/
  background-image: linear-gradient(to top, #47d4a4, #0bc0a4);
}

.up-load-video-online-watch {
  width: 11rem;
  min-height: 5rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 5px rgba(2, 22, 37, 0.3);
  margin-right: 0.8rem;
}

.up-load-video-knowlege-list {
  width: 4.4rem;
  max-height: 9.75rem;
  overflow: auto;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 5px rgba(2, 22, 37, 0.3);
  padding-bottom: 0.1rem;
}

.upload-video-activity-container {
  width: 4.4rem;
  min-height: 1rem;
}

.up-load-video-online-watch p.fs-20 {
  margin: 0.2rem 0.2rem;
}

.videoContent {
  width: 10.6rem;
  height: 5.2rem;
  margin: 0 1.2rem 0.2rem 0.2rem;
  background-color: rgba(89, 89, 89, 0.1);
}

.know-lege-add-list {
  width: 6.4rem;
  min-height: 3.05rem;
  margin: 0.1rem 0.25rem 0 0.1rem;
  background-color: rgba(201, 216, 222, 0.4);
}

.know-lege-add-list .nedd-add-to-model {
  width: 1.2rem;
  margin: 0 auto;
  padding-top: 0.9rem;
}

.know-lege-add-list .nedd-add-to-model img {
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
}

.know-lege-add-list .nedd-add-to-model p {
  text-align: center;
}

.knowlege-title {
  padding: 0.1rem 0.2rem 0.2rem 0.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
}

.knowlege-title span:first-child {
  width: 2.5rem;
}

.knowlege-title span:last-child {
  cursor: pointer;
}

.knowlege-title span:last-child i {
  margin-right: 0.1rem;
}

.knowlege-content {
  padding: 0 0.2rem;
}

.knowlege-content p {
  margin-bottom: 0.1rem;
}

.knowlege-content div.fs-14 {
  line-height: 0.24rem;
  height: 1.5rem;
}

.knowlege-content textarea {
  height: 1.3rem;
  width: 5.8rem;
  border: 1px sold #ddd;
  resize: none;
  border-radius: 0.02rem;
  line-height: 0.24rem;
  padding: 0.1rem 0.1rem;
}

.know-lege-button-right {
  padding-top: 0.1rem;
  text-align: right;
}

.know-lege-button-right input {
  margin-left: 0.2rem;
  border: none;
  border-radius: 0.04rem;
  outline: none;
  width: 1rem;
  height: 0.36rem;
  cursor: pointer;
}

.know-lege-button-right input:first-child {
  color: #fff;
  background-color: #3283d3;
}

.know-lege-button-right input:last-child {
  background-color: #d6d6d6;
}

div.first-step-button.second-step {
  border-top: 1px solid #ddd;
  width: 15rem;
  text-align: right;
  padding-top: 0.2rem;
}

div.first-step-button.second-step input:last-child {
  box-shadow: 0 1px 2px rgba(2, 22, 37, 0.3);
  background-image: linear-gradient(to top, #37c796, #08af95);
}

div.first-step-button.second-step input:last-child:hover {
  background-image: linear-gradient(to top, #47d4a4, #0bc0a4);
}
.up-load-here-click .img-add-here {
  text-align: center;
  margin-top: 0.4rem;
}

.up-load-here-click .img-add-here img {
  width: 0.54rem;
  height: 0.54rem;
}

.up-load-here-click p {
  text-align: center;
  margin-top: 0.25rem;
}

.avatar-uploader .avatar {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 3.25rem;
  height: 1.8rem;
}

.wtt-choice-icon {
  position: relative;
  top: 0.05rem;
}

.wtt-search {
  width: 4rem;
  height: 0.8rem;
  border-right: none;
}

.wtt-search-label {
  margin: 0.1rem 0.15rem;
}

.wtt-search-main {
  margin: 0.2rem 0.15rem;
  border-bottom: 1px solid #ddd;
}

.wtt-search-main-input {
  width: 3.5rem;
  height: 0.25rem;
  line-height: 0.3rem;
  background-color: #f5f5f5;
}

.otl-none {
  outline: none;
  border: none;
}

.wtt-search-main-icon {
  right: 0;
  bottom: 0.05rem;
}

.work-temp-top-mutil-select-item {
  margin-top: .15rem;
  border-radius: 30px;
  border: 1px solid #3283d3;
  color: #535353;
  padding: 0.08rem .1rem;
  line-height: .22rem;
}

/* .work-temp-top-mutil-select-item:hover {
  background-image: linear-gradient(to top, #a8a9aa, #777b7f);
} */

/* .wtt-msi-name {
  border-right: 1px solid #fff;
  height: 100%;
  display: inline-block;
  min-width: 0.9rem;
  padding: 0 0.25rem;
  text-align: center;
} */

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

/* .wtt-msi-icon img {
  cursor: pointer;
  width: 0.15rem;
  height: 0.15rem;
}

.wtt-msi-icon {
  width: 0.35rem;
  height: 0.35rem;
  position: relative;
} */

.uvac-choose{
  width: 2rem;
  height: .38rem;
  line-height: .38rem;
  border: .01rem solid #ddd;
  color: #535353;
  text-align: center;
  margin-top: .1rem;
}
.uvac-choose-label{
  display: inline-block;
  color: #3283d3;
  font-weight: bold;
  margin-right: .1rem;
  line-height: .3rem;
}

/* .uvac-choose-icon {
  vertical-align: middle;
}

.uvac-choosen {
  border: 2px solid #3283d3;
  border-radius: 50px;
  display: inline-block;
  padding: 0.1rem 0.2rem;
  margin: 0.25rem;
}

.uvac-choosen-icon {
  display: inline-block;
  width: 0.25rem;
  height: 0.25rem;
  background: #e0e0e0;
  color: #3283d3;
  text-align: center;
  line-height: 0.25rem;
  border-radius: 50%;
  font-size: 0.2rem;
} */

.upload-material-activity{
  width: 2.94rem;
  margin-right: .2rem;
}

.ali-upload-container {
  width: 1.8rem;
  height: 0.6rem;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 0.1rem;
  background-image: linear-gradient(to top, #32abd3, #3283d3);
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  border-radius: 4px;
  color: #fff;
}

.auc-button {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.auc-label {
  margin-left: .15rem;
  height: .6rem;
  line-height: .6rem;
}

.ali-upload-file-label {
  margin-top: .1rem;
}

</style>
