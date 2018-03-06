import VueRouter from 'vue-router'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueFilter from 'vue-filter'
import VueStash from 'vue-stash'
import VueVideoPlayer from 'vue-video-player'
import VueClipboard from 'vue-clipboard2'

import store from './stores/index'
import { routes } from './router'
import filter from './helpers/filter'
import { ADDRESS,HEAD } from './helpers/address'
import { callToast, callLoading } from './helpers/helper'
import { Message } from 'element-ui';
import VueEvents from 'vue-events'
import $ from 'jQuery'

window._ = require('underscore')
// 引入Element-UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueHtml5Editor from 'vue-html5-editor'

// 引入ECharts
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

// 样式表
import './style/reset.css'
import './style/global.css'
import './style/trans.css'
import './style/font-awesome-4.7.0/css/font-awesome.css'
// 主题CSS
import './style/theme/default.css'
//自定义公共css
import './style/style.css'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueFilter)
Vue.use(VueStash)
Vue.use(ElementUI)
Vue.use(VueVideoPlayer)
Vue.use(VueClipboard)
Vue.use(VueEvents)
Vue.component('chart', ECharts)

Vue.use(VueHtml5Editor, {
  name: "vue-html5-editor",
  showModuleName: false,
  icons: {
      text: "fa fa-pencil",
      color: "fa fa-paint-brush",
      font: "fa fa-font",
      align: "fa fa-align-justify",
      list: "fa fa-list",
      link: "fa fa-chain",
      unlink: "fa fa-chain-broken",
      image: "fa fa-file-image-o",
      hr: "fa fa-minus",
      eraser: "fa fa-eraser",
      undo: "fa-undo fa",
      "full-screen": "fa fa-arrows-alt",
      // info: "fa fa-info",
  },
  image: {
      sizeLimit: 2* 1024 * 1024,
      upload: {
          url: ADDRESS.UP_LOAD_IMG,
          headers: {},
          params: {},
          fieldName: {}
      },
      // compress: {
      //     width: 1600,
      //     height: 1600,
      //     quality: 80
      // },
      uploadHandler(responseText){
          var json = JSON.parse(responseText)
          // console.log(responseText)
          if (json.code != 1) {
              alert(json.code)
          } else {
              return HEAD + json.data
          }
      }
  },
  language: "zh-cn",
  i18n: {
      "zh-cn": {
          "align": "对齐方式",
          "image": "图片",
          "list": "列表",
          "link": "链接",
          "unlink": "去除链接",
          "table": "表格",
          "font": "文字",
          "full screen": "全屏",
          "text": "排版",
          "eraser": "格式清除",
          "info": "关于",
          "color": "颜色",
          "please enter a url": "请输入地址",
          "create link": "创建链接",
          "bold": "加粗",
          "italic": "倾斜",
          "underline": "下划线",
          "strike through": "删除线",
          "subscript": "上标",
          "superscript": "下标",
          "heading": "标题",
          "font name": "字体",
          "font size": "文字大小",
          "left justify": "左对齐",
          "center justify": "居中",
          "right justify": "右对齐",
          "ordered list": "有序列表",
          "unordered list": "无序列表",
          "fore color": "前景色",
          "background color": "背景色",
          "row count": "行数",
          "column count": "列数",
          "save": "确定",
          "upload": "选择图片",
          "progress": "进度",
          "unknown": "未知",
          "please wait": "请稍等",
          "error": "错误",
          "abort": "中断",
          "reset": "重置"
      }
  },
  hiddenModules: [],
  visibleModules: [
      "text",
      "color",
      "font",
      "align",
      "list",
      "link",
      "unlink",
      "image",
      "hr",
      "eraser",
      "undo",
      "full-screen",
      // "info",
  ],
  modules: {
  }
})

Vue.http.options.emulateJSON = true
Vue.http.interceptor.before = function(request, next) {
  if (request.method == 'POST' && request.body) {
      request.body = request.body.replace(/undefined/g,null)
  }
  next()
}
Vue.http.interceptors.push((request, next) => {

　next((res) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    // console.log('x',res.body.constructor, res.body, res.body.length)
    if (res.body.constructor == String && res.body[0] == '{') {
      // router.push('/login')
      callLoading.deactiveLoading()
      const _body = JSON.parse(res.body)
      if (_body.code == '10300') {
        callToast('当前用户未登录', 'error')
      }
      else if (_body.code == '10301' || _body.code == '10302') {
        callToast('当前用户在其他地方登录', 'error')
      }
      else if (_body.code == '10303') {
        callToast('当前用户没有权限操作', 'error')
      }
      // console.log(JSON.parse(res.body))
      setTimeout(() => {
        window.location.href = '/bc/static/login.html'
      }, 1000)
    }
    else {
      return res;
    }
  })
})


const router = new VueRouter({
  routes
})

router.beforeEach((route, from, next) => {
  document.body.scrollTop = 0
  Message.closeAll()
  next()
  $('#resourceCont').html('')
})


// router.beforeEach((to, from, next) => {
//   const isWeixinBrowser = () => {
//     const ua = navigator.userAgent.toLowerCase();
//     return (/micromessenger/.test(ua)) ? true : false ;
//   }
//   // if (!isWeixinBrowser()) {
//   //   alert('不在微信')
//   //   return false;
//   // }
//   const isOid = window.localStorage['oid'] && (window.localStorage['oid'] !== '-')
//   if (to.path !== '/auth' && to.path !== '/authStatus' && !isOid) {
//     if (to.query.openId || from.query.openId) {
//       window.localStorage['oid'] = to.query.openId || from.query.openId
//       if (!window.localStorage['childActive'] || from.path == '/auth') {
//         getChild(Vue, window.localStorage['oid'], window.localStorage, function () {
//           // next(to.path)
//
//           window.location.reload()
//         })
//       }
//     }
//     else {
//       next('/auth')
//     }
//   }
//   else {
//     if (!window.localStorage['childActive'] || from.path == '/auth') {
//       getChild(Vue, window.localStorage['oid'], window.localStorage)
//     }
//     next()
//   }
// })

import App from './App.vue'

const app = new Vue({
  router,
  data: {
    store
  },
  computed: {
  },
  methods: {
  },
  created() {

  },
  el: '#app',
  render: h => h(App)
})
