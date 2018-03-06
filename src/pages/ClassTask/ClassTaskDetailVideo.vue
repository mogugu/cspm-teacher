
<template>
  <div class="container">
    <div v-if="videoContent.createrName" class="video-content TH-card clear">
      <h1 class="TH-f-c-default fs-24">{{videoContent.videoName}}</h1>
      <div class="video-info clear">
        <div class="video-info-left fl">
          <p class="video-info-left-text inline-block fs-16 TH-f-c-default"><span class="TH-f-c-link fs-16 fwb">{{videoContent.watchs}}</span>次观看</p>
          <p class="video-info-left-text inline-block fs-16 TH-f-c-fade">作者：<span class="TH-f-c-default fs-16">{{videoContent.createrName}}</span></p>
          <p class="video-info-left-text inline-block fs-16 TH-f-c-fade">活动：<span class="TH-f-c-default fs-16">{{videoContent.categoryName}}</span></p>
        </div>
        <!-- <div class="video-info-right fr">
          <p v-if="!videoContent.mine && !$route.query.noFav" @click="handleFav($event,!videoContent.favoriteStatus)" :class="{'video-info-right-item-active': videoContent.favoriteStatus}" class="inline-block video-info-right-item cp">
            <span v-if="!videoContent.favoriteStatus">收藏</span>
            <span v-if="videoContent.favoriteStatus">已收藏</span>
          </p>
          <p v-if="$route.path.split('/')[1] == 'personalSourceDetail'" class="ptir-upload inline-block">
            <span v-if="videoContent.inShop" class="fs-14 TH-f-c-link">已上传至资源超市</span>
            <span @click="goShopDetail()" v-if="videoContent.inShop" class="TH-button-default ptir-upload-button inline-block ta-c cp">立即查看</span>
            <span v-if="!videoContent.inShop" class="fs-14 TH-f-c-fade">未上传至资源超市</span>
            <span @click="goUpload()" v-if="!videoContent.inShop" class="TH-button-default ptir-upload-button inline-block ta-c cp">立即上传</span>
          </p>
          <p @click="handleVote(true)" class="video-info-right-vote inline-block fs-14 TH-f-c-default cp">
            <img class="virv-icon" v-if="videoContent.evaluateFlag != 1" src="~assets/imgs/common/zan.png" alt="zan">
            <img class="virv-icon" v-if="videoContent.evaluateFlag == 1" src="~assets/imgs/common/zaned.png" alt="zaned">
            <span>赞 {{videoContent.likes}}</span>
          </p>
          <p @click="handleVote(false)" class="video-info-right-vote inline-block fs-14 TH-f-c-default cp">
            <img class="virv-icon" v-if="videoContent.evaluateFlag != -1" src="~assets/imgs/common/cai.png" alt="cai">
            <img class="virv-icon" v-if="videoContent.evaluateFlag == -1" src="~assets/imgs/common/caied.png" alt="caied">
            <span>踩 {{videoContent.unlikes}}</span>
          </p>
        </div> -->
      </div>
      <div class="video-content-left fl relative">
        <video-player v-if="videoFlag && !videoContent.aliyunVideoId"  ref="videoPlayer"
          :options="playerOptions"
          :markers="markers"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @statechanged="playerStateChanged($event)"
          @ready="playerReadied">
        </video-player>
        <ali-player
          @ready="aliVideoReady()"
          @error="handleError(ev)"
          v-if="videoFlag && videoContent.aliyunVideoId"
          aliplayerSdkPath="//g.alicdn.com/de/prismplayer/2.3.0/aliplayer-min.js"
          height="100%"
          width="100%"
          format="hls"
          :useFlashPrism="true"
          :vid="videoContent.aliyunVideoId" 
          :playauth="aliVideoInfo.auth" 
          ref="player">
        </ali-player>
        <div v-if="videoContent.aliyunVideoId && !videoPlayFlag" class="ali-video-cover absolute" :style="{backgroundImage: 'url('+videoContent.imgUrl+')'}">
          <span @click="playAliVideo()" class="ali-video-button">
            <i class="fa fa-play ali-video-button-icon" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div class="video-info-right clear">
        <div class="fl">
          <p v-if="!videoContent.mine && !$route.query.noFav" @click="handleFav($event,!videoContent.favoriteStatus)" :class="{'video-info-right-item-active': videoContent.favoriteStatus}" class="inline-block video-info-right-item cp">
            <span v-if="!videoContent.favoriteStatus">收藏</span>
            <span v-if="videoContent.favoriteStatus">已收藏</span>
          </p>
          <p v-if="videoContent.mine && !$route.query.noFav" @click="deleteVideo()" :class="{'video-info-right-item-active': videoContent.favoriteStatus}" class="inline-block video-info-right-item-delete cp">
            <span>删除</span>
          </p>
          <p v-if="videoContent.mine && !$route.query.noFav" @click="editVideo()" :class="{'video-info-right-item-active': videoContent.favoriteStatus}" class="inline-block video-info-right-item-edit cp">
            <span>编辑</span>
          </p>
        </div>
        <div class="fr">
          <!-- <p v-if="$route.path.split('/')[1] == 'personalSourceDetail'" class="ptir-upload inline-block">
            <span v-if="videoContent.inShop" class="fs-14 TH-f-c-link">已上传至资源超市</span>
            <span @click="goShopDetail()" v-if="videoContent.inShop" class="TH-button-default ptir-upload-button inline-block ta-c cp">立即查看</span>
            <span v-if="!videoContent.inShop" class="fs-14 TH-f-c-fade">未上传至资源超市</span>
            <span @click="goUpload()" v-if="!videoContent.inShop" class="TH-button-default ptir-upload-button inline-block ta-c cp">立即上传</span>
          </p> -->
          <p @click="handleVote(true)" class="video-info-right-vote inline-block fs-14 TH-f-c-default cp">
            <img class="virv-icon" v-if="videoContent.evaluateFlag != 1" src="~assets/imgs/common/zan.png" alt="zan">
            <img class="virv-icon" v-if="videoContent.evaluateFlag == 1" src="~assets/imgs/common/zaned.png" alt="zaned">
            <span>赞 {{videoContent.likes}}</span>
          </p>
          <p @click="handleVote(false)" class="video-info-right-vote inline-block fs-14 TH-f-c-default cp">
            <img class="virv-icon" v-if="videoContent.evaluateFlag != -1" src="~assets/imgs/common/cai.png" alt="cai">
            <img class="virv-icon" v-if="videoContent.evaluateFlag == -1" src="~assets/imgs/common/caied.png" alt="caied">
            <span>踩 {{videoContent.unlikes}}</span>
          </p>
        </div>
      </div>
      <!-- <div class="video-content-right fl">
        <p @click="pauseVideo()" class="video-content-right-title TH-f-c-link fs-20">
          知识点详解
        </p>
        <div class="video-content-right-bar TH-bg-c-default"></div>
        <ul class="fs-16" v-if="activeKnowledge == ''">
          <li class="video-info" v-for="(item,index) in videoContent.knowledges" :key="index">
            {{item.knowledgeName}}
            <span class="TH-f-c-dark-m fr">{{item.beginTime}}</span>
          </li>
        </ul>
        <div class="video-content-right-desc TH-f-c-default fs-16 ta-j">
          {{activeKnowledge}}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import VueAliplayer from 'vue-aliplayer'
import { callModalToast, callLoading, callToast, videoTime  } from '../../helpers/helper'
import { getSec } from '../../helpers/getThisWeek'
import { ADDRESS, HEAD, VERSION } from '../../helpers/address'
export default {
  name: 'ClassTaskDetailVideo',
  components: {
    'ali-player': VueAliplayer
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  data () {
    return {
      // 设置一个何时初始化视频播放器的flag，以免markers不渲染
      videoFlag: false,
      videoPlayFlag: false,
      videoId: '',
      videoContent: {},
      activeKnowledge: '',
      videoInfo: {
        title: '信息获取的方法',
        view:'16',
        from: '优酷',
        isFav: true,
        like: 20,
        unlike: 30,
        isLike: true,
        isUnLike: true,
        knowledge: '',
        // knowledge: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor …']
      },
      markers: [
        //  {time: 9.5, text: "thisaaaaa"},
        //  {time: 80,  text: "is"},
        //  {time: 100,text: "so"},
        //  {time: 140,  text: "cool"}
      ],
      playerOptions: {
        start: 0,
        playsinline: false,
        muted: false,
        language: 'en',
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: "static/video/1.mp4"
        }],
        poster: "static/imgs/common/random-pic2.png",
      },
      dataList: [],
      listed: false,
      dataAddr: 'http://baobab.kaiyanapp.com/api/v1/feed?num=1',
      aliVideoInfo: {
        auth: '',
        status: 0,
        err: '',
      }
    }
  },
  created () {
    this.videoId = this.$route.query.id || 0
    this.getVideoContent()
    console.log('x')
  },

  methods: {
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },

    onPlayerPlay(player) {

    },
    onPlayerPause(player) {

    },
    onPlayerEnded(player) {

    },
    onPlayerLoadeddata(player) {

    },
    onPlayerWaiting(player) {

    },
    onPlayerPlaying(player) {
    },
    onPlayerTimeupdate(player) {
      // console.log(player.currentTime())
      for (var i = 0; i < this.markers.length; i++) {
        if (player.currentTime() > this.markers[i].time) {
          this.activeKnowledge = this.videoContent.knowledges[i].content
        }
        // this.markers[i]
      }
    },
    onPlayerCanplay(player) {

    },
    onPlayerCanplaythrough(player) {

    },
    toggleVoteType(ot, nt) {
      if (ot == 0) {
        console.log(nt);
        if (nt == false) {
          this.videoContent.unlikes++
        }
        else if (nt == true) {
          console.log('achie');
          this.videoContent.likes++
        }
      }
      else if (ot == -1) {
        if (nt == true) {
          this.videoContent.likes++
          this.videoContent.unlikes--
        }
        else if (nt == false) {
          this.videoContent.unlikes--
        }
      }
      else if (ot == 1) {
        if (nt == false) {
          this.videoContent.likes--
          this.videoContent.unlikes++
        }
        else if (nt == true) {
          this.videoContent.likes--
        }
      }
    },
    handleFav($event,type) {
      callLoading.activeLoading()
      const _addr = type?ADDRESS.SOURCEREPO_VIDEO_FAVORITE_ADDR:ADDRESS.SOURCEREPO_VIDEO_UNFAVORITE_ADDR
      this.$http.post(_addr, {videoId: this.videoId})
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.videoContent.favoriteStatus = !this.videoContent.favoriteStatus
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
      // callModalToast($event,'操作成功')
    },
    handleVote(type) {
      callLoading.activeLoading()
      const _addr = ADDRESS.SOURCEREPO_VIDEO_VOTE_ADDR
      this.$http.post(_addr, {
        videoId: this.videoId,
        action: type
      })
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.toggleVoteType(this.videoContent.evaluateFlag, type)
            this.videoContent.evaluateFlag = res.body.data
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
      // callModalToast($event,'操作成功')
    },
    getVideoContent() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.DETAIL_VIDEO,{
        videoId: this.videoId
      })
      .then((res) => {
        if (res.body.code == 1) {
          const videoData = res.body.data
          this.videoContent = videoData
          for (var i = 0; i < videoData.knowledges.length; i++) {
            this.markers.push({
              time: videoTime.timeFormat(videoData.knowledges[i].beginTime),
              text: videoData.knowledges[i].knowledgeName
            })
          }
          if (this.videoContent.aliyunVideoId) {
            this.getPlayAuth()
            .then(() => {
              this.videoFlag = true
              this.aliVideoInfo.status = 1
            })
            .catch((err) => {
              if(err.constructor == String) {
                this.aliVideoInfo.status = 0
                this.aliVideoInfo.err = err
                callLoading.deactiveLoading()
                callToast(err,'warning')
              }
            })
          }
          else {
            this.videoFlag = true
            this.playerOptions.sources[0].src = HEAD + res.body.data.videoUrl
            this.playerOptions.poster = res.body.data.imgUrl
            console.log(this.markers)
            callLoading.deactiveLoading()
          }
        }
        else if (res.body.code == 30001) {
          callToast('视频已经删除', 'warning')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    pauseVideo() {
      this.player.pause()
    },
    goShopDetail() {
      window.open(`/bc/static/mall/${VERSION}/index.html#/pay/video?id=${this.videoContent.productId}&isUpload=isMe`)
    },
    goUpload() {
      this.$router.push({path:'/personalSource/uploadMall', query: {
          id: this.videoContent.videoId,
          type: 'video',
          name: this.videoContent.videoName,
          time: getSec(this.videoContent.duration)
        }
      })
    },
    getPlayAuth() {
      return new Promise((resolve, reject) => {
        this.$http.get(ADDRESS.ALI_VIDEO_PLAY_AUTH, {
          params: {
            videoId: this.videoContent.aliyunVideoId
          }
        })
        .then((res) => {
          if (res.body.code == 0) {
            reject(res.body.data)
          }
          this.aliVideoInfo.auth = res.body.data.playAuth
          resolve()
        })
        .catch(err => reject(err))
      })
    },
    playAliVideo() {
      if (this.aliVideoInfo.status == 0) {
        callToast(this.aliVideoInfo.err,'warning')
        return
      }
      const player = this.$refs.player.instance
      this.videoPlayFlag = true
      player && player.play()
    },

    aliVideoReady() {
      callLoading.deactiveLoading()
    },
    handleError(e) {
      console.log(e)
    },
    deleteVideo() {
      this.$confirm('此操作将删除该视频, 是否继续?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        customClass: 'bc-confirm'
      })
      .then(() => {
        callLoading.activeLoading()
        this.$http.post(ADDRESS.MY_SOURCE_REMOVE_VIDEO, {
          videoId: this.videoId
        })
        .then((res) => {
          if (res.body.code == 1) {
            callToast('删除成功', 'success')
          }
          else {
            callToast(res.body.data, 'success')
          }
          callLoading.deactiveLoading()
        })
        .catch((err) => {
          callLoading.deactiveLoading()
          callToast('删除失败', 'error')
        })
      })
    },
    editVideo() {
      this.$router.push({
        path: '/personalSourceEdit/video',
        query: {
          id: this.videoId
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 17rem;
  margin: 0 auto;
}

h1 {
  margin: .15rem .25rem 0 .25rem;
}

.video-info {
  margin: .15rem .25rem;
}

.video-info-left-text {
  margin-right: .32rem;
}

.viri-icon {
  width: .2rem;
  height: .2rem;
}

.video-info-right {
  padding-top: .15rem;
}

.video-info-right-item {
  width: .98rem;
  height: .28rem;
  border: 2px solid #dbdbdb;
  border-radius: 50px;
  text-align: center;
  line-height: .28rem;
  padding-left: .1rem;
  margin: 0 .3rem;
  position: relative;
}

.video-info-right-item::before {
  content: '';
  width: .18rem;
  height: .18rem;
  left: .15rem;
  position: absolute;
  background: url(../../assets/imgs/common/collect.png) no-repeat no-repeat;
  background-size: cover;
  top: .05rem;
}

.video-info-right-item-active::before,
.video-info-right-item:hover::before {
  content: '';
  width: .18rem;
  height: .18rem;
  left: .15rem;
  position: absolute;
  top: .05rem;
  background: url('../../assets/imgs/common/collected.png') no-repeat no-repeat;
  background-size: cover;
}

.video-info-right-item-delete {
  width: .8rem;
  height: .3rem;
  border: 2px solid #dbdbdb;
  border-radius: 50px;
  text-align: center;
  line-height: .3rem;
  padding-left: .1rem;
  margin: 0 .1rem 0 .3rem;
  position: relative;
}

.video-info-right-item-delete::before {
  content: '';
  width: .2rem;
  height: .2rem;
  left: .1rem;
  position: absolute;
  background: url(../../assets/imgs/source/delete-3.png) no-repeat no-repeat;
  background-size: cover;
  top: .05rem;
}

.video-info-right-item-delete:hover::before {
  content: '';
  width: .2rem;
  height: .2rem;
  left: .1rem;
  position: absolute;
  top: .05rem;
  background: url('../../assets/imgs/source/delete-3-hover.png') no-repeat no-repeat;
  background-size: cover;
}

.video-info-right-item-edit {
  width: .8rem;
  height: .3rem;
  border: 2px solid #dbdbdb;
  border-radius: 50px;
  text-align: center;
  line-height: .3rem;
  padding-left: .1rem;
  margin: 0 .1rem 0 .1rem;
  position: relative;
}

.video-info-right-item-edit::before {
  content: '';
  width: .2rem;
  height: .2rem;
  left: .1rem;
  position: absolute;
  background: url(../../assets/imgs/source/edit-2-default.png) no-repeat no-repeat;
  background-size: cover;
  top: .05rem;
}

.video-info-right-item-edit:hover::before {
  content: '';
  width: .2rem;
  height: .2rem;
  left: .1rem;
  position: absolute;
  top: .05rem;
  background: url('../../assets/imgs/source/edit-2-hover.png') no-repeat no-repeat;
  background-size: cover;
}

.video-info-right-vote {
  margin-right: .3rem;
}


.virv-icon {
  position: relative;
  top: .02rem;
}

.video-content {
  width: 11rem;
  height: 7.3rem;
  margin: .15rem auto;
}

.video-content-left {
  width: 11rem;
  height: 5.8rem;
  margin: 0 auto;
  /* padding-bottom: 1rem; */
}

.video-content-right {
  padding: .2rem;
  width: 4.6rem;
}
.video-content-right-bar {
  width: .65rem;
  height: .03rem;
  margin: .1rem 0 .2rem 0;
}

.video-content-right-desc {
  line-height: .25rem;
}

.ptir-upload {
  margin-right: .2rem;
}

.ptir-upload-button {
  width: .9rem;
  height: .33rem;
  border-radius: 40px;
  line-height: .33rem;
}

.ali-video-cover {
  width: 100%;
  height: 100%;
  background-color: #333;
  background-size: cover;
  z-index: 999;
  left: 0;
  top: 0;
}

.ali-video-button {
  width: 120px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, .5);
  display: block;
  font-size: 30px;
  position: absolute;
  left: 50%;
  margin-left: -60px;
  top: 50%;
  margin-top: -20px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.ali-video-button:hover {
  background: rgba(36,131,213,.9);
}

</style>
