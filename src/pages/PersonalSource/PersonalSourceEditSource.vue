
<template>
  <div class="container">
    <!-- First step -->
    <div class="upload-img-default-first-step">
      <div class="uplode-inner-video ">
        <div class="upload-other-message clear">
          <div class="upload-video-message-list fl">

              <div class="upload-material-activity fl">
                 <p class="disableColor fs-16">活动：</p>
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
          <div class="fl">
              <ul class="fs-16 form-width">
                <li>
                  <p class="disableColor">标题：<span class="fr fs-13">不超过20字</span></p>
                  <input type="text" maxlength="20" v-model="contentInfo.fileTitle">
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="first-step-button fs-14">
        <input type="button" value="确认修改" @click="comfirmModify()" class="TH-button-default">
        <input type="button" value="取消" @click="cancelModify()" class="TH-button-primary">
    </div>

  </div>
</template>

<script>
import { ADDRESS, HEAD } from "../../helpers/address";
import {
  callLoading,
  callToast,
  deepClone,
  callMimeTypeCheck,
  clearTree
} from "../../helpers/helper";
import mutilSelect from "../../components/mutilSelect";

export default {
  name: "PersonalSourceEditVideo",
  components: {
    "mutil-select": mutilSelect
  },
  computed: {
    selectOption() {
      return deepClone(this.$store.tree);
    }
  },
  data() {
    return {
      contentInfo: {},
      contentInfoDeep: {},
      activityOption: {showChoiceFlag: false, choosenActivity: [{'label':''}]},
    }
  },
  created() {
    this.materialId = this.$route.query.id
    this.getContentInfo()
  },
  methods: {
    getContentInfo() {
      callLoading.activeLoading()
      this.$http.get(ADDRESS.MY_SOURCE_OTHER_SOURCE_INFO, {
          params: {
              materialId: this.materialId
          }
      })
      .then((res) => {
        if (res.body.code == 1) {
          this.contentInfoDeep = res.body.data
          this.contentInfo = res.body.data
          this.activityOption.choosenActivity.splice(0, 1, {
            label: res.body.data.activityName,
            id: res.body.data.activityId
          })
        }
        else {
          callToast('获取视频详情失败', 'error')
        }
        callLoading.deactiveLoading()
      })
      .catch((err) => {
        callLoading.deactiveLoading()
        callToast('获取视频详情失败', 'error')
      })
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
    comfirmModify() {
      if (!this.activityOption.choosenActivity[0].label) {
        callToast("请选择对应活动", "warning")
        return
      }
      this.$confirm('此操作将修改此资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'bc-confirm'
      })
      .then(() => {
        callLoading.activeLoading()
        this.$http.post(ADDRESS.MY_SOURCE_EDIT_SOURCE, {
            attachmentId: this.materialId,
            fileTitle: this.contentInfo.fileTitle,
            activityId: this.activityOption.choosenActivity[0].id,
            activityName: this.activityOption.choosenActivity[0].label,
            materialType: this.contentInfo.materialType
        })
        .then((res) => {
          if (res.body.code == 1) {
            callToast('修改成功', 'success')
            // this.$router.push({
            //   path: '/personalSourceDetail/video',
            //   query: {
            //     id: this.videoId
            //   }
            // })
            window.location.href=('/bc/r/tamc/previewAttachment?materialId='+this.materialId)
          }
          else {
            callToast(res.body.data, 'error')
          }
          callLoading.deactiveLoading()
        })
        .catch((err) => {
          callToast('修改失败', 'error')
          callLoading.deactiveLoading()
        })
      })
      .catch((err) => {
        return
      })
    },
    resetModify() {
      this.contentInfo = deepClone(this.contentInfoDeep)
      this.activityOption.choosenActivity.splice(0, 1, {
        label: this.contentInfo.categoryName,
        id: this.contentInfo.categoryId
      })
    },
    cancelModify() {
      this.$confirm('取消变更?', '提示', {
        confirmButtonText: '确定取消',
        cancelButtonText: '手抖了',
        customClass: 'bc-confirm'
      })
      .then(() => {
          window.location.href='/bc/r/tamc/previewAttachment?materialId='+this.materialId
      })
      .catch(() => {
        return
      })
    }
  },
  mounted() {}
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
  margin: 0 1rem;
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
  height: 1rem;
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
  height: 1.5rem;
  width: 3.5rem;
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

.upload-img-url-detail {
  width: 100%;
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

.upload-material-activity{
  width: 2.94rem;
  margin-right: .2rem;
}

.avatar-uploader {
  position: absolute;
  right: -1rem;
  bottom: 0;
}


</style>
