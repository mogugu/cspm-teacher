
<template>
  <div class="container">
    <div class="upload-test-question-title fs-22 disable-color fwb">
      <span :class="{'titleActive':selecType}" @click="selecType=true">我的消息</span>
      <!-- <span :class="{'titleActive':!selecType}" @click="selecType=false">系统消息</span> -->
    </div>
    <div class="system-or-my-message">
      <div v-if="messageList==''" class="TF-temp-Arr-space" >
        <img src="~assets/imgs/codeZero/message/no-information.png" alt="">
        <p class="fs-18 TH-f-c-default">暂无消息！</p>
      </div>
      <p class="defaultColor" v-if="messageList!=''"><span class="fs-20 fwb activeColor">{{$store.user.newMessageCount}}</span>未读消息</p>
      <div class="all-message-read-or-no-read" v-for="item in messageList" v-if="messageList!=''" >
        <div class="inner-content">
          <p @click="readMsg(item)" class="fs-18 defaultColor">
            <i :class="{'TH-f-c-link': !item.msgStatus, 'TH-f-c-default': item.msgStatus}" class="fwb">{{item.msgTitle}}</i>
            <span class="fs-16 fr">{{item.sendTime}} &nbsp;&nbsp; <i :class="{'el-icon-arrow-down':!item.isOpen,'el-icon-arrow-up':item.isOpen}" class="TH-f-c-link "></i></span>
          </p>
          <div v-if="item.isOpen" class="fs-16 defaultColor">
            <div class="" v-html="item.msgContent"></div>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="msgPages.total > 10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="msgPages.current"
        :page-size="msgPages.size"
        layout=" prev, pager, next"
        :total="msgPages.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import classNav from '../../components/classNav.vue'
import { callLoading } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'
export default {
  name: 'MessageIndex',
  data () {
    return {
      selecType:true,
      message:{
        page:1,
        rows:10
      },
      msgPages: {
        size: 10,
        current: 1,
        total: 0
      },
      messageList:[],
      messageTotal:100
    }
  },
  created () {
    this.getAllMessageLists()
  },
  methods: {
    getAllMessageLists(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_ALL_LIST_ABOUT_MESSAGE,
       this.message
      )
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.msgPages.total = +res.body.data.total
          let _list = res.body.data.list
          for (var i = 0; i < _list.length; i++) {
            _list[i].isOpen = false
          }
          this.messageList = _list
        }else{
          this.messageList = []
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.message.page = val
      this.getAllMessageLists()
    },
    readMsg(item) {
      if (item.msgStatus) {
        item.isOpen = !item.isOpen
        return
      }
      this.$http.post(ADDRESS.MESSAGE_ITEM_READ_ADDR, {
        messageId :item.msgId
      })
      .then((res) => {
        if (res.body.code == 1) {
          item.msgStatus = true
        }
        item.isOpen = !item.isOpen
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.container{
  width: 17rem;
  margin: 0 auto;
}

.upload-test-question-title span{
  margin-right: .3rem;
  cursor: pointer;
}

.upload-test-question-title {
  margin-bottom: .2rem;
  padding-left: .05rem;
}

.disable-color{
  color: #999;
}

.titleActive{
  font-size: .32rem;
  color: #535353;
}

.defaultColor{
  color: #535353;
}

.activeColor{
  color: #3283d3;
}

.system-or-my-message{
  width: 12rem;
  margin: 0 auto;
  margin-top: .5rem;
}

.system-or-my-message p.defaultColor{
  text-align: right;
  padding: .15rem .2rem;
  cursor: pointer;
}

.all-message-read-or-no-read{
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  margin-bottom: .2rem;
  /*padding: .15rem .15rem;*/
}

div.inner-content p{
  text-align: left !important;
}

div.inner-content .defaultColor{
  border-top: 1px solid #ddd;
  padding: .1rem .2rem;
  line-height: .26rem;
}

.TF-temp-Arr-space{
  margin-top: 1rem;
}

.TF-temp-Arr-space img{
  width: 1.26rem;
  height: 1.43rem;
  margin-top: .4rem;
  margin-bottom: .4rem;
}
</style>
