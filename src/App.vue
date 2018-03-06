<template>
  <div id="main" class="" :class="{'main-cover-2':$route.path != '/index'}">
    <div class="index-bg" v-if="$route.path != '/index'">
      <div class="index-bg-1-1"></div>
      <div class="index-bg-3-3"></div>
      <div class="index-bg-4-4"></div>
      <div class="index-bg-5-5"></div>
    </div>
    <div class="main-nav" 
      :class="{
        'main-nav-no-box': $route.path.split('/')[1] == 'index',
        'global-router-margin':  ($route.path.split('/')[2] != 'collect' && $route.path.split('/')[2] != 'buy' && $route.path.split('/')[2] != 'my' && $route.path.split('/')[1] != 'personalCenter')
        }">
      <div class="main-nav-left" v-if="$route.path.split('/')[1] != 'index'">
        <div v-if="$$routePath && !$route.query.isNew" @click="LinkPushHash('back')" class="inline-block main-nav-left-back">
          <img class="cp" src="~assets/imgs/common/back.png" alt="back">
          <span class="fs-14 TH-f-c-white main-nav-left-name">当前位置：{{$route | nav-format}}</span>
        </div>
        <ul class="main-nav-left-list inline-block">
          <li @click="LinkPushHash('task')" :class="{'main-nll-item-active': $route.path.split('/')[1] == 'classTask'}" class="TH-f-c-white fwb TH-boc-bottom-white cp fs-20 main-nll-item inline-block">班级任务</li>
          <li @click="LinkPushHash('temp')" :class="{'main-nll-item-active': $route.path.split('/')[1] == 'sourceRepo'}" class="TH-f-c-white fwb TH-boc-bottom-white cp fs-20 main-nll-item inline-block">资源库</li>
          <li @click="LinkPushHash('work')" :class="{'main-nll-item-active': $route.path.split('/')[1] == 'workRepo'}" class="TH-f-c-white fwb TH-boc-bottom-white cp fs-20 main-nll-item inline-block">作品库</li>
          <li @click="LinkPushHash('manage')" :class="{'main-nll-item-active': $route.path.split('/')[1] == 'classManage'}" class="TH-f-c-white fwb TH-boc-bottom-white cp fs-20 main-nll-item inline-block">班级管理</li>
          <!-- <li @click="goMall()" class="TH-f-c-white fwb TH-boc-bottom-default cp fs-20 main-nll-item inline-block">资源商城</li> -->
        </ul>
      </div>
      <div class="main-nav-right">
        <div class="main-nav-right-message inline-block">
          <div class="user-name inline-block fs-16 fwb" v-if="login_statue == false" @click="login()">登录</div>
          <!-- <div class="user-name inline-block fs-16 fwb" v-if="login_statue == false">注册</div> -->
          <div 
            :class="{'main-nav-right-message-index': $route.path.split('/')[1] == 'index'}" class="email inline-block cp" 
            v-if="login_statue == true" 
            @click="LinkPushHash('mess')">
            <i v-if="$store.user.newMessageCount > 0" class="fs-14 fwb">{{$store.user.newMessageCount}}</i>
          </div>
          <div class="head-img inline-block" v-if="login_statue == true">
            <img :src="$store.user.headimgurl" onerror="this.src='static/imgs/common/touxiang-default.png'" alt="touxiang-default">
          </div>
          <div class=" inline-block  relative" v-if="login_statue == true" v-on:mouseover="drop_down_type=true" v-on:mouseleave="drop_down_type=false">
            <span 
              :class="{'user-name-index': $route.path.split('/')[1] == 'index'}" 
              class="fs-16 inline-block user-name TH-f-c-white" >
              {{$store.user.username}}
              <i class="el-input__icon el-icon-time"></i>
              </span>
            <div class="block drop-down-person-list" v-if="drop_down_type==true">
              <i
                v-on:mouseover="type.per=true"
                v-on:mouseleave="type.per=false"
                class="block"
                @click="LinkPushHash('per')">
                <img v-bind:src="type.per==false?'static/imgs/common/personal.png':'static/imgs/common/personal-active.png'" alt="personal">
                个人中心
              </i>
              <i
                v-on:mouseover="type.ss=true"
                v-on:mouseleave="type.ss=false"
                class="block"
                @click="LinkPushHash('cont')">
                <img v-bind:src="type.ss==false?'static/imgs/common/my-resource.png':'static/imgs/common/my-resource-active.png'" alt="my-resource">
                我的资源
              </i>
              <!-- <i
                v-on:mouseover="type.buy=true"
                v-on:mouseleave="type.buy=false"
                class="block"
                @click="goMall('buy')">
                <img v-bind:src="type.buy==false?'static/imgs/common/my-resource.png':'static/imgs/common/my-resource-active.png'" alt="my-buy">
                已购课程
              </i> -->
              <!-- <i
                v-on:mouseover="type.col=true"
                v-on:mouseleave="type.col=false"
                class="block"
                @click="$router.push('/personalCollect/taskTemplate')">
                <img v-bind:src="type.col==false?'static/imgs/common/my-collection.png':'static/imgs/common/my-collection-active.png'" alt="my-collection">
                我的收藏
              </i> -->
              <i
                v-on:mouseover="type.out=true"
                v-on:mouseleave="type.out=false"
                @click="logout()"
                class="block">
                <img v-bind:src="type.out==false?'static/imgs/common/log-out-.png':'static/imgs/common/log-out-active.png'" alt="log-out-">
                注销登录
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <transition name="swipe-fade"> -->
      <router-view class="global-router"></router-view>
    <!-- </transition> -->
    <div class="el-loading-marker" v-if="flag">
      <img src="static/imgs/index/loading.gif" alt="">
    </div>
    <div id="resourceCont"></div>
  </div>
</template>

<script>
import GlobalNav from './components/GlobalView/NavTop'
import GlobalFooter from './components/GlobalView/Footer'
import { HEAD , ADDRESS, VERSION } from './helpers/address'
import { callLoading, callToast } from './helpers/helper'
export default {
  name: 'app',
  store: ['user'],
  // components: {
  //   'globalnav': GlobalNav,
  //   'globalfooter': GlobalFooter
  // },
  data () {
    return {
        login_statue:false,
        drop_down_type:false,
        type:{
          per:false,
          ss:false,
          col:false,
          out:false,
          buy: false
        },
        flag:false
    }
  },
  computed: {
    $$routePath() {
      return !(
        this.$route.path == '/classTask/index' ||
        this.$route.path == '/sourceRepo/workTemplate' ||
        this.$route.path == '/sourceRepo/video' ||
        this.$route.path == '/sourceRepo/testQuestion' ||
        this.$route.path == '/sourceRepo/paper' ||
        this.$route.path == '/sourceRepo/courseware' ||
        this.$route.path == '/sourceRepo/lessonPlan' ||
        this.$route.path == '/sourceRepo/others' ||
        this.$route.path == '/workRepo/student' ||
        this.$route.path == '/workRepo/platform' ||
        this.$route.path == '/classManage/index' ||
        this.$route.path == '/personalSourceEdit/video' ||
        this.$route.path == '/personalSourceEdit/source'
        )
    }
  },
  created () {
    // console.log(this.$store.user)
    const _this = this
    var interval = setInterval(function(){
      _this.getFlag()
    }, 200)
    this.getMe((user) => {
      this.login_statue = true
      this.$store.user = user
    }, () => {
      this.login_statue = false
      callToast('获取基本信息失败', 'error')
    })
  },

  methods:{
    LinkPushHash( statue ){
      if( this.$store.user.content ){
        this.$store.user.leave = true
        this.$events.emit('pageLeave', true);
       
        if( statue=='task' ){
          this.$store.user.url = '/classTask/index'
          return
        }
        if( statue=='temp' ){
          this.$store.user.url = '/sourceRepo/workTemplate'
          return
        }
        if( statue=='work' ){
          this.$store.user.url = '/workRepo/student'
          return
        }
        if( statue=='manage' ){
          this.$store.user.url = '/classManage/index'
          return
        }
        if( statue=='back' ){
          this.$store.user.url = 'back'
          return
        }
        if( statue=='mess' ){
          this.$store.user.url = '/message/index'
          return
        }
        if( statue=='per' ){
          this.$store.user.url = '/personalCenter/base'
          return
        }
        if( statue=='cont' ){
          this.$store.user.url = '/personalSource/my/taskTemplate'
          return
        }
      }
      else{
        this.$store.user.content = false
        if( statue=='task' ){
          this.$router.push('/classTask/index')
          return
        }
        if( statue=='temp' ){
          this.$router.push('/sourceRepo/workTemplate')
          return
        }
        if( statue=='work' ){
          this.$router.push('/workRepo/student')
          return
        }
        if( statue=='manage' ){
          this.$router.push('/classManage/index')
          return
        }
        if( statue=='back' ){
          this.$router.go(-1)
          return
        }
        if( statue=='mess' ){
          this.$router.push('/message/index')
          return
        }
        if( statue=='per' ){
          this.$router.push('/personalCenter/base')
          return
        }
        if( statue=='cont' ){
          this.$router.push('/personalSource/my/taskTemplate')
          return
        }
      }
    },
    getFlag(){
      this.flag = callLoading.flag
    },
    login() {
      // callLoading.activeLoading()
      // this.$http.post(ADDRESS.LOGIN_ADDR,{
      //   loginName: '13666666666',
      //   password: '13666666666'
      // })
      // .then((res) => {
      //   callLoading.deactiveLoading()
      //   if (res.body.code == 1) {
      //     this.getMe((user) => {
      //       this.login_statue = true
      //       this.$store.user = user
      //       console.log(user)
      //       callToast('登陆成功')
      //     }, () => {
      //       callToast('获取基本信息失败', 'error')
      //     })
      //   }
      // }, (err) => {
      //   callLoading.deactiveLoading()
      //   console.log('err',err)
      //   callToast('登录失败', 'error')
      // })
      window.location.href = ADDRESS.USER_LOG_OUT
    },
    goMall(type) {
      // if (type == 'buy') {
      //   window.open(`/bc/static/mall/${VERSION}/index.html#/MyPurchase`)
      //   return
      // }
      window.open(`/bc/static/mall/${VERSION}/index.html#/index`)
    },
    logout() {
      callLoading.activeLoading()
      setTimeout(() => {
        window.location.href = ADDRESS.USER_LOG_OUT
      }, 1000)
      // window.location.href = ADDRESS.USER_LOG_OUT
      // callLoading.activeLoading()
      // this.$http.get(ADDRESS.USER_LOG_OUT)
      // .then((res) => {
      //   callLoading.deactiveLoading()
      //   if (res.body.code == 1) {
      //     this.login_statue = false
      //     this.$store.user = {}
      //   }
      // }, (err) => {
      //   callLoading.deactiveLoading()
      //   console.log('err',err)
      // })
    },
    getMe(cb,err) {
      this.$http.post(ADDRESS.USERINFO_ADDR)
        .then((res) => {
          // console.log('res',JSON.stringify(res));
          if (res.body.code == 1) {
            this.getClassList(() => {
              cb(res.body.data)
            })
          }
          else {
            err()
          }
        })
    },
    getClassList(cb) {
      this.$http.post(ADDRESS.CLASS_TEACHER_LIST_ADDR)
        .then((res) => {
          if (res.body.code == 1) {
            const _cl = res.body.data
            const $cl = [{
              id: 0,
              text: '全部'
            }]
            this.$store.classList = _cl
            for (var i = 0; i < _cl.length; i++) {
              $cl.push({
                id: _cl[i].classId,
                text: _cl[i].className
              })
              // $cl.push({
              //   id: _cl[i].classId+'1',
              //   text: _cl[i].className+'1'
              // })
              // $cl.push({
              //   id: _cl[i].classId+'2',
              //   text: _cl[i].className+'2'
              // })
              // $cl.push({
              //   id: _cl[i].classId+'3',
              //   text: _cl[i].className+'3'
              // })
            }
            this.$store.dropdown.classList = $cl
            this.getTree()
            this.getCascaderClassList()
            .then(() => {
              cb()
            })
            .catch((err) => {
              cb()
            })
          }
        }, (err) => {
          // console.log(err)
        })
    },
    getTree() {
      this.$http.post(ADDRESS.ACTIVITY_KNOWLEDGE_TREE_ADDR, {
        disciplineCode: 10,
        studySection: 3,
        textbookVersion: 20
      })
      .then((res) => {
        if (res.body.code == 1) {
          let _tree = res.body.data[0].children.concat(res.body.data[1].children)
          this.$store.tree = _tree
          // console.log(this.$store.tree)
        }
      })
    },
    getCascaderClassList() {
      return new Promise((resolve, reject) => {
        this.$http.post(ADDRESS.CLASS_CASCADER_LIST_ADDR)
        .then((res) => {
          if (res.body.code == 1) {
            let _data = res.body.data
            let _ar = [{
              value: '',
              label: '全部',
            }]
            for (let i = 0; i < _data.length; i++) {
              for (var j = 0; j < _data[i].sessions.length; j++) {
                _ar.push({
                  label: _data[i].sessions[j].sessionStr,
                  value: _data[i].sessions[j].session,
                  children: _data[i].sessions[j].classes.map((el) => {
                    el.label=el.className;
                    el.value=el.classId
                    return el
                  })
                })           
              }              
            }
            this.$store.dropdown.classCascaderList = _ar
            resolve()
          }
          else {
            reject(res.body.data)
          }
        })
        .catch((err) => {
          // console.log(err)
          reject(err)
        })
      })
    }
  },
}
</script>

<style scoped>
.global-router {
  z-index: 10;
  position: relative;
  padding-bottom: .15rem;
}

.main-cover {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  background: url('./assets/imgs/index/bg.png') no-repeat no-repeat;
  background-size: cover;
  background-attachment: fixed;
  width:100%;
  height: 100%;
}

.main-cover-1 {
  background: url('./assets/imgs/index/bg.png') no-repeat no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.main-cover-2 {
  /*z-index: 1;*/
  position: relative;
  /*background: url('./assets/imgs/common/bg.png') no-repeat no-repeat;*/
  background-size: cover;
  background-attachment: fixed;
  width:100%;
  min-height: 100%;
}

.main-nav {
  width: 100%;
  height: .7rem;
  position: relative;
  margin: 0 auto;
  font-size: .2rem;
  background: #3283d3;
  z-index: 10;
  box-shadow: 0 3px 6px rgba(2,22,37,.1);
}

.main-nav-no-box {
  background: none !important;
  box-shadow: none !important;
}

.main-nav-left-name {
  position: relative;
  bottom: .05rem;
}

.main-nav-left-back {
  margin-top: .3rem;
  margin-left: 1rem;
}

.main-nav-left-list {
  margin-top: .15rem;
  height: .4rem;
  line-height:.4rem;
  text-align: center;
  width: 7rem;
  position: absolute;
  left: 50%;
  margin-left: -3.5rem;
}

.main-nav-left-list li{
  line-height: .2rem;
}

.index-bg-1 {
  background: url('./assets/imgs/index/top-left.png') no-repeat no-repeat;
  top: 0;
  position: absolute;
  left: 1rem;
  width: 3rem;
  height: 2rem;
  z-index: 5;
  background-size: cover;
}

.index-bg-2 {
  background: url('./assets/imgs/index/top-mid.png') no-repeat no-repeat;
  top: 0;
  position: absolute;
  left: 8rem;
  width: 3rem;
  height: 2rem;
  z-index: 5;
  background-size: cover;
}

.index-bg-3 {
  background: url('./assets/imgs/index/top-right.png') no-repeat no-repeat;
  top: 0;
  position: absolute;
  right: 1rem;
  width: 4.5rem;
  height: 2rem;
  z-index: 5;
  background-size: cover;
}

.index-bg-1-1 {
  background: url('./assets/imgs/common/top-left.png') no-repeat no-repeat;
  top: 0;
  position: absolute;
  left: 0;
  width: 3rem;
  height: 2rem;
  /*z-index: 5;*/
  background-size: cover;
}

.index-bg-3-3 {
  background: url('./assets/imgs/common/top-right.png') no-repeat no-repeat;
  top: 0;
  position: absolute;
  right: 0;
  width: 3.5rem;
  height: 2rem;
  /*z-index: 5;*/
}

.main-nll-item {
  padding-bottom: .24rem;
  margin-right: .3rem;
  color: #dddddd;
}

.main-nll-item-active {
  border-bottom-width: 3px;
  border-bottom-style: solid;
  color: #fff;
}

.main-nav-right{
  position: absolute;
  right: 1rem;
  top: .05rem;
}

.main-nav-right-message {
  /*overflow: hidden;*/
  padding: .1rem 0;
}

.main-nav-right-message .email{
  background: url('./assets/imgs/common/information.png') no-repeat center;
  width: .4rem;
  height: .4rem;
  position: relative;
  margin-right: .45rem;
  background-size: contain;
}

.main-nav-right-message .main-nav-right-message-index.email{
  background: url('./assets/imgs/common/information2.png') no-repeat center;
  width: .4rem;
  height: .4rem;
  position: relative;
  margin-right: .45rem;
  background-size: contain;
}

.main-nav-right-message i.fs-14{
  position: absolute;
  display: inline-block;
  width: .25rem;
  height: .25rem;
  background-color: #fff;
  border-radius: 50%;
  color: #3283d3;
  text-align: center;
  line-height: .2rem;
  right: -.125rem;
  top: -.05rem;
}

.main-nav-right-message .head-img{
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
  /*border:1px solid #ddd;*/
  background-color: #fff;
  -webkit-box-shadow: 0 5px 17px 1px rgba(124,124,125,.7);
  -moz-box-shadow: 0 5px 17px 1px rgba(124,124,125,.7);
  box-shadow: 0 5px 17px 1px rgba(124,124,125,.7);
}

.main-nav-right-message .head-img img{
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
}

.main-nav-right-message .user-name{
  height: .4rem;
  line-height: .4rem;
  overflow: auto;
  padding-right: .2rem;
  margin-left: .1rem;
  cursor: pointer;
}

.main-nav-right-message .user-name-index{
  color: #535353 !important;
}

.main-nav-right-message .user-name i{
  height: .4rem;
  width: .2rem;
  line-height: .4rem;
  /*margin-top: .1rem;*/
}

.login.inline-block,
.signUp.inline-block{
  /*overflow: auto;*/
  width: .6rem;
  line-height: .4rm;
}

div.drop-down-person-list{
  position: absolute;
  top: .42rem;
  right: -.01rem;
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  background-color: #fff;
}

div.drop-down-person-list i{
  font-size: .14rem;
  font-weight: normal;
  font-style: normal;
  line-height: .4rem;
  cursor: pointer;
  width: 1.2rem;
  text-align: center;
}

div.drop-down-person-list i img{
  vertical-align: sub;
  width: .17rem;
  height: .17rem;
  margin-right: .1rem;
}

div.drop-down-person-list i:hover{
  color: #3283d3;
}

.index-bg-4-4 {
  background: url('./assets/imgs/common/bg-bot-left.png') no-repeat no-repeat;
  bottom: 0;
  position: fixed;
  left: 0;
  width: 3.5rem;
  height: 2rem;
  /*z-index: 5;*/
}

.index-bg-5-5 {
  background: url('./assets/imgs/common/bg-bot-right.png') no-repeat no-repeat;
  bottom: 0;
  position: fixed;
  right: 0;
  width: 2rem;
  height: 2rem;
}

.global-router{
  z-index: inherit !important;
}

.global-router-margin {
  margin-bottom: .5rem;
}

#resourceCont{
  position: fixed;
  z-index: -10;
  top: -500px;
}
</style>
