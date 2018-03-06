<template>
  <div class="container">
    <div class="index-title">
      <img class="block" src="~assets/imgs/index/chinese.png" alt="chs">
      <img class="block" src="~assets/imgs/index/English.png" alt="eng">
    </div>

    <div class="main-content">
      <div class="main-item main-item-odd relative inline-block">
        <img @click="$router.push('/classTask/index')" @mouseover="hoverMouse(0)" @mouseleave="leaveMouse(0)" class="cp main-item-c absolute" :src="imgSrc0" alt="1">
      </div>
      <div class="main-item main-item-even relative inline-block">
        <img @click="$router.push('/sourceRepo/workTemplate')" @mouseover="hoverMouse(1)" @mouseleave="leaveMouse(1)" class="cp main-item-c absolute" :src="imgSrc1" alt="2">
      </div>
      <div class="main-item main-item-odd relative inline-block">
        <img @click="$router.push('/workRepo/student')" @mouseover="hoverMouse(2)" @mouseleave="leaveMouse(2)" class="cp main-item-c absolute" :src="imgSrc2" alt="3">
      </div>
      <div class="main-item main-item-even relative inline-block">
        <img @click="$router.push('/classManage/index')" @mouseover="hoverMouse(3)" @mouseleave="leaveMouse(3)" class="cp main-item-c absolute" :src="imgSrc3" alt="4">
      </div>
      <div class="main-item main-item-odd relative inline-block">
        <img @click="goMall()" @mouseover="hoverMouse(4)" @mouseleave="leaveMouse(4)" class="cp main-item-c absolute" :src="imgSrc4" alt="5">
      </div>
    </div>

  </div>
</template>

<script>
import { ADDRESS, VERSION } from '../helpers/address'
import { Loading } from 'element-ui'
import { callLoading } from '../helpers/helper'

export default {
  name: 'Index',
  store: ['user'],
  data () {
    return {
      imgList: [
        require('../assets/imgs/index/task-default.png'),
        require('../assets/imgs/index/file-default.png'),
        require('../assets/imgs/index/work-default.png'),
        require('../assets/imgs/index/class-default.png'),
        require('../assets/imgs/index/supermarket-default.png'),
      ],
      imgHoverList: [
        require('../assets/imgs/index/task-hover.png'),
        require('../assets/imgs/index/file-hover.png'),
        require('../assets/imgs/index/work-hover.png'),
        require('../assets/imgs/index/class-hover.png'),
        require('../assets/imgs/index/supermarket-default-hover.png'),
      ],
      imgSrc0: require('../assets/imgs/index/task-default.png'),
      imgSrc1: require('../assets/imgs/index/file-default.png'),
      imgSrc2: require('../assets/imgs/index/work-default.png'),
      imgSrc3: require('../assets/imgs/index/class-default.png'),
      imgSrc4: require('../assets/imgs/index/supermarket-default.png'),
    }
  },
  methods: {
    hoverMouse(id) {
      this['imgSrc'+id] = this.imgHoverList[id]
    },
    leaveMouse(id) {
      this['imgSrc'+id] = this.imgList[id]
    },
    goMall() {
      window.open(`/bc/static/mall/${VERSION}/index.html#/index`)
    }
  },
}

</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 30px;
}
.index-title {
  text-align: center;
  width: 10rem;
  margin: .5rem auto;
  text-align: center;
  z-index: 10;
  position: relative;
}

.index-title img {
  margin: 0 auto;
  margin-bottom: .2rem;
}

.main-content {
  width: 17rem;
  margin: 1.5rem auto 0 auto;
  font-size: 0;
}

.main-item {
  width: 20%;
  z-index: 100;
}

.main-item-odd {
  top: .8rem;
}

.main-item-even {
  left: .5rem;
}

.index-bg-1 {
  background: url('../assets/imgs/index/top-left.png') no-repeat no-repeat;
  top: -1rem;
  position: absolute;
  left: 1rem;
  width: 3rem;
  height: 2rem;
  z-index: 5;
  background-size: cover;
}

.index-bg-2 {
  background: url('../assets/imgs/index/top-mid.png') no-repeat no-repeat;
  top: -1rem;
  position: absolute;
  left: 8rem;
  width: 3rem;
  height: 2rem;
  z-index: 5;
  background-size: cover;
}

.index-bg-3 {
  background: url('../assets/imgs/index/top-right.png') no-repeat no-repeat;
  top: -1rem;
  position: absolute;
  right: 1rem;
  width: 4.5rem;
  height: 2rem;
  z-index: 5;
  background-size: cover;
}

</style>
