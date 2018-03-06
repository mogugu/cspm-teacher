<template>
  <div class="index-container">
    <div class="index-cover"></div>

    <div class="index-title">
        <h1 class="fs-26 fwb">欢迎来到信息技术教学平台</h1>
    </div>

    <div class="index-main clear">
        <div @click="$router.push('/classTask/index')" class="cp index-main-item imi-task fl ta-c relative">
            <p class="TH-f-c-white fs-22 fwb imi-label absolute">班级任务</p>
        </div>
        <div @click="$router.push('/sourceRepo/workTemplate')" class="cp index-main-item imi-resource fl ta-c relative">
            <p class="TH-f-c-white fs-22 fwb imi-label absolute">资源库</p>
        </div>
        <div @click="$router.push('/workRepo/student')" class="cp index-main-item imi-work fl ta-c relative">
            <p class="TH-f-c-white fs-22 fwb imi-label absolute">作品库</p>
        </div>
        <div @click="$router.push('/classManage/index')" class="cp index-main-item imi-classm fl ta-c relative">
            <p class="TH-f-c-white fs-22 fwb imi-label absolute">班级管理</p>
        </div>
        <div v-on:mouseenter="Mallnodoor=true" v-on:mouseleave="Mallnodoor=false" class="cp index-main-item imi-market fl ta-c relative">
            <p class="TH-f-c-white fs-22 fwb imi-label absolute">资源超市</p>
            <div class="mall-is-no-door fwb fs-22 absolute" v-if="Mallnodoor">
                暂未开放
            </div>
        </div>
    </div>

    <div class="index-bottom">
      <div class="index-bottom-gap"></div>
      <img class="index-bottom-img" src="../assets/imgs/index/bot-dec.png" alt="bottom">  
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
        Mallnodoor:false
    }
  },
  methods: {
    goMall() {
        this.Mallnodoor = true
    //   window.open(`/bc/static/mall/${VERSION}/index.html#/index`)
    }
  },
}

</script>

<style scoped>

.index-cover {
    position: fixed;
    top: 0;
    background: #fff;
    left: 0;
    width: 100%;
    height: 100%;
}

.index-container {
    width: 1100px;
    margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 30px;
}

.index-title {
  text-align: center;
  width: 10rem;
  margin: .5rem auto 100px auto;
  text-align: center;
  z-index: 10;
  position: relative;
  color: #5abbff;
}


.index-main {
    position: relative;
    z-index: 10;
}

.index-main-item {
    width: 170px;
    height: 190px;
    margin: 0 50px 30px 10px;
}

.index-main-item:hover {
    box-shadow: 0 5px 16px rgba(117,117,117,.89);
}

.index-main-item:last-child {
    margin-right: 0;
}

.imi-label {
    bottom: 20px;
    width: 100%;
    left: 50%;
    margin-left: -50%;
}

.imi-task {
    background: url('../assets/imgs/index/class-task.png') no-repeat no-repeat;
}

.imi-resource {
    background: url('../assets/imgs/index/resources-file.png') no-repeat no-repeat;
}

.imi-work {
    background: url('../assets/imgs/index/works-file.png') no-repeat no-repeat;
}

.imi-classm {
    background: url('../assets/imgs/index/class-management.png') no-repeat no-repeat;
}

.imi-market {
    background: url('../assets/imgs/index/resources-supermarket-.png') no-repeat no-repeat;
}

.index-bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    z-index: 1;
}

.index-bottom-gap {
    position: absolute;
    bottom: 40px;
    height: 10px;
    width: 100%;
    background: #ebe9e5;
}

.index-bottom-img {
    margin-bottom: 20px;
    z-index: 99;
    position: relative;
}

.mall-is-no-door{
    background-color: rgba(0,0,0,.75);
    color: #fff;
    text-align: center;
    width: 170px;
    height: 190px;
    z-index: 99;
    line-height: 190px;
}
</style>
