
<template>
  <div class="container">
    <h1>你好,VideoAli.vue</h1>
    <div class="video-container">
        <!-- <div id="aliVideoContent" class="video-content"></div> -->
        <ali-player
         aliplayerSdkPath="//g.alicdn.com/de/prismplayer/2.3.0/aliplayer-min.js"
         height="100%"
         width="100%"
         format="hls"
         :useFlashPrism="true"
         :vid="videoInfo.vid" 
         :playauth="videoInfo.auth" 
         ref="player">
        </ali-player>
        <button @click="play">播放</button>
        <button @click="pause">暂停</button>
        <button @click="replay">重播</button>
    </div>
  </div>
</template>

<script>
import VueAliplayer from 'vue-aliplayer'
export default {
  name: 'VideoAli',
  components: {
    'ali-player': VueAliplayer
  },
  data () {
    return {
        player: {},
        videoInfo: {
            auth: '',
            vid: '',
        }
    }
  },
  created () {
  },
  methods: {
      play() {
        const player = this.$refs.player.instance
        player && player.play()
      },
      pause() {
        const player = this.$refs.player.instance
        player && player.pause()
      },
      replay() {
        const player = this.$refs.player.instance
        player && player.replay()
      }
  },
  mounted() {
    this.videoInfo.auth = this.$route.query.auth
    this.videoInfo.vid = this.$route.query.vid
  }
}
</script>

<style scoped>
.video-container {
    width: 1200px;
    height: 600px;
    margin: 50px auto;
}

.video-content {
    width: 100%;
    height: 600px;
}

</style>
      