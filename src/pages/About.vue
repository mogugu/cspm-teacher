<template>
  <div class="container">
    <p class="title-text">hello about</p>
    <div class="video-container">
      <video-player  ref="videoPlayer"
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  store: ['user'],
  data () {
    return {
      markers: [
         {time: 9.5, text: "thisaaaaa"},
         {time: 16,  text: "is"},
         {time: 23.6,text: "so"},
         {time: 28,  text: "cool1"}
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
        poster: "/static/images/author.jpg",
      },
      dataList: [],
      listed: false,
      dataAddr: 'http://baobab.kaiyanapp.com/api/v1/feed?num=1',
    }
  },
  created () {
    this.getData()
    this.user.name = 'viwi ' + Math.floor(Math.random() * 10)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods:{
    getData() {
      this.$http.get(this.dataAddr)
        .then((res) => {
          console.log(res)
        })
    },
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

    },
    onPlayerCanplay(player) {

    },
    onPlayerCanplaythrough(player) {

    },

  },
  destroyed() {
  }
}
</script>

<style scoped>
.title-text {
  width: 2rem;
  font-size: .2rem;
}

.video-container {
  width: 7rem;
  height: 7rem;
}
</style>
