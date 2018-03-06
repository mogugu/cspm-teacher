
<template>
  <div class="container">
    <div class="pc-card TH-card">
      <div class="pc-card-item clear relative">
        <p class="pc-ci-name TH-f-c-default fs-16 fl">登录密码： <span class="TH-f-c-orange">已设置</span> </p>
        <p @click="dialogOption.password = true" class="fr TH-button-default pc-card-item-button ta-c fs-16 cp">修改</p>
      </div>
      <!-- <div class="pc-card-item clear relative">
        <p class="pc-ci-name TH-f-c-default fs-16 fl">绑定手机： <span class="TH-f-c-default">{{userinfo.mobile}}</span> </p>
        <p @click="checkPass('phone')" class="fr TH-button-default pc-card-item-button ta-c fs-16 cp">修改</p>
      </div> -->
      <div class="pc-card-item clear relative">
        <p class="pc-ci-name TH-f-c-default fs-16 fl">
          绑定邮箱： 
          <p class="inline-block fs-16" v-if="bindInfo.emailStatus==0">
            <span class="TH-f-c-link">{{bindInfo.email==''?'未绑定':bindInfo.email}}</span> 
            <span class="send-email-code" v-if="bindInfo.email!=''" :class="{'cp':timeRest==0}" @click="sendEmailCode">{{timeRest==0?'验证邮箱':(timeRest+'秒后可重新发送邮件！')}}</span>
          </p>
          <p class="inline-block fs-16" v-if="bindInfo.emailStatus==1">
            <span class="TH-f-c-link">{{bindInfo.email}}</span> 
            <span class="send-email-true">验证通过！</span>
          </p>
          <!-- <span class="send-email-code" v-if="!bindInfo.EmailStatus&&bindInfo.email!='' && timeRest>0">发送成功，{{timeRest}}秒后可重新发送邮件！</span> -->
        </p>
        <p @click="checkPass('email')" class="fr TH-button-primary pc-card-item-button ta-c fs-16 cp">修改</p>
      </div>
    </div>
    <el-dialog
      custom-class="dialog-width-760"
      title="修改密码"
      top="30%"
      :visible.sync="dialogOption.password"
      >
      <div class="dialog-password-cotainer">
        <div class="dialog-password-item">
          <p class="TH-f-c-fade fs-16">原密码：（请先验证原密码）</p>
          <input type="password" class="dpi-input" v-model="passwordInfo.pass">
        </div>
        <div class="dialog-password-item">
          <p class="TH-f-c-fade fs-16">新密码：（6-15位字符）</p>
          <input type="password" class="dpi-input" v-model="passwordInfo.npass">
        </div>
        <div class="dialog-password-item">
          <p class="TH-f-c-fade fs-16">确认密码：（6-15位字符）</p>
          <input type="password" class="dpi-input"  v-model="passwordInfo.rnpass">
        </div>
      </div>
      <div class="dialog-head-bottom ta-c">
        <span @click="updatePass()" class="TH-button-confirm dhb-button inline-block">确定</span>
        <span @click="dialogOption.password = false" class="TH-button-cancel dhb-button inline-block">取消</span>
      </div>
    </el-dialog>

    <el-dialog
      custom-class="dialog-width-760"
      title="验证身份"
      top="30%"
      :visible.sync="dialogOption.checkPass"
      >
      <div class="dialog-checkpass-cotainer">
        <div class="dialog-checkpass-item">
          <p class="TH-f-c-fade fs-16">请输入网站登录密码以验证身份</p>
          <input type="password" class="dci-input" v-model="vPass">
        </div>
      </div>
      <div class="dialog-head-bottom ta-c">
        <span @click="checkPassNext()" class="TH-button-confirm dhb-button inline-block">确定</span>
        <span @click="dialogOption.checkPass = false" class="TH-button-cancel dhb-button inline-block">取消</span>
      </div>
    </el-dialog>

    <el-dialog
      custom-class="dialog-width-760"
      title="绑定邮箱"
      top="30%"
      :visible.sync="dialogOption.email"
      >
      <div class="dialog-checkpass-cotainer">
        <div class="dialog-checkpass-item">
          <p class="TH-f-c-fade fs-16">请输入邮箱地址</p>
          <input type="email" class="dci-input" v-model="dialogOption.emailValue">
        </div>
      </div>
      <div class="dialog-head-bottom ta-c">
        <span @click="updateUserInfo()" class="TH-button-confirm dhb-button inline-block">确定</span>
        <span @click="dialogOption.email = false" class="TH-button-cancel dhb-button inline-block">取消</span>
      </div>
    </el-dialog>

    <el-dialog
      custom-class="dialog-width-760"
      title="绑定手机"
      top="30%"
      :visible.sync="dialogOption.phone"
      >
      <div class="dialog-checkpass-cotainer-short">
        <div class="dialog-checkpass-item">
          <p class="TH-f-c-fade fs-16">请输入手机号码</p>
          <input type="text" class="dcc-input" v-model="phoneCodeInput">
        </div>
        <div class="dialog-checkpass-item">
          <p class="TH-f-c-fade fs-16">请输入验证码</p>
          <input type="text" class="dcc-input-short fs-13" v-model="dialogOption.phoneValue">
          <span @click="getCode()" class="dci-input-label fs-13" :class="{'dci-input-label-deactive':dialogOption.phoneFlag}">
            <i v-if="!dialogOption.phoneFlag">获取验证码</i>
            <i v-if="dialogOption.phoneFlag">{{dialogOption.phoneFlagValue}}s</i>
          </span>
        </div>
      </div>
      <div class="dialog-head-bottom ta-c">
        <span class="TH-button-confirm dhb-button inline-block">确定</span>
        <span @click="dialogOption.phone = false" class="TH-button-cancel dhb-button inline-block">取消</span>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { ADDRESS } from '../../helpers/address'
import { helper, deepClone, callLoading, callToast } from '../../helpers/helper'
export default {
  name: 'PersonalCenterModify',
  data () {
    return {
      dialogOption: {
        password: false,
        checkPass: false,
        checkPassFlag: '',
        email: false,
        emailValue: '',
        phone: false,
        phoneValue: '',
        phoneFlagValue: -1,
        phoneFlag: false,
      },
      passwordInfo: {
        pass: '',
        npass: '',
        rnpass: ''
      },
      userinfo: {},
      vPass: '',
      bindInfo: {},
      phoneCodeInput:'',
      timeRest:0
    }
  },
  created () {
    callLoading.activeLoading()
    if(this.$store.useruserId) {
      this.userinfo = deepClone(this.$store.user)
      this.getBindInfo()
      .then(() => {
        callLoading.deactiveLoading()
      })
    }
    else {
      // this.getUser()
      // this.getBindInfo()
      Promise.all([this.getUser(), this.getBindInfo()])
      .then((res) => {
        callLoading.deactiveLoading()
      })
      .catch((err) => {
        callLoading.deactiveLoading()
        console.log('err', err)
      })
    }
  },
  methods: {
    checkPass(type) {
      this.vPass = ''
      this.dialogOption.checkPassFlag = type
      this.dialogOption.checkPass = true
    },
    checkPassNext() {
      if(this.vPass == ''){
        callToast('请输入登录密码', 'warning')
        return
      }
      this.verifyPass(() => {
        const _type = this.dialogOption.checkPassFlag
        this.dialogOption.checkPass = false
        if (_type == 'email') {
          this.dialogOption.email = true
        }
        else if (_type == 'phone') {
          this.dialogOption.phone = true
        }
      }, () => {
        callToast('原密码输入错误', 'error')
      })
    },
    verifyPass(cb, err) {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.USERINFO_PASS_CHECK_ADDR, {
        password: this.vPass
      })
      .then((res) => {
        callLoading.deactiveLoading()
        // this.vPass = ''
        if (res.body.code == 1) {
          cb()
        }
        else {
          err()
        }
      }, (e) => {
        this.vPass = ''
        callLoading.deactiveLoading()
        err()
      })
    },
    getCode() {
      if(this.phoneCodeInput == ''){
        callToast('请输入手机号', 'warning')
      }
      else{
        callLoading.activeLoading()
        this.$http.post(ADDRESS.GET_PHONE_INPUT_CODE, {
          mobileNumber: this.phoneCodeInput
        })
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            if (this.dialogOption.phoneFlagValue <= 0) {
              window.clearInterval(this.phoneTimmer)
              this.dialogOption.phoneFlagValue = 5
              this.dialogOption.phoneFlag = true
              this.phoneTimmer = window.setInterval(() => {
                if (this.dialogOption.phoneFlagValue>0) {
                  this.dialogOption.phoneFlagValue--
                  console.log(this.dialogOption.phoneFlagValue)
                }
                else {
                  this.dialogOption.phoneFlag = false
                  return
                }
              }, 1000)
            }
            else {
              this.dialogOption.phoneValue = res.body.data
              return
            }
          }
          else {
            callToast(res.body.message, 'error')
          }
        }, (e) => {
          this.phoneCodeInput == ''
          callLoading.deactiveLoading()
          err()
        })
      }
      
    },
    updatePass() {
      if (this.passwordInfo.npass.length < 6) {
        callToast('请输入6-15位新密码', 'warning')
        return
      }
      if (this.passwordInfo.npass.length > 15) {
        callToast('请输入6-15位新密码', 'warning')
        return
      }
      if (this.passwordInfo.npass != this.passwordInfo.rnpass) {
        callToast('两次输入的密码不一致', 'warning')
        return
      }
      callLoading.activeLoading()
      this.$http.post(ADDRESS.USERINFO_PASS_UPDATE_ADDR, {
          password: this.passwordInfo.pass,
          newPassword: this.passwordInfo.npass
      })
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            callToast('修改成功')
          }
          else {
            callToast('修改失败', 'error')
          }
        }, (err) => {
          callToast('修改失败', 'error')
          callLoading.deactiveLoading()
        })
    },
    getUser() {
      return new Promise((resolve, reject) => {
        this.getMe()
        .then((user) => {
          this.$store.user = user
          this.userinfo = user
          resolve(this.userinfo)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    getMe() {
      return new Promise((resolve, reject) => {
        this.$http.post(ADDRESS.USERINFO_ADDR)
        .then((res) => {
          if (res.body.code == 1) {
            // cb(res.body.data)
            resolve(res.body.data)
          }
          else {
            reject(null)
          }
        })
        .catch(err => Promise.reject(err))
      })
    },
    getBindInfo() {
      this.$http.post(ADDRESS.USER_BIND_ADDR)
        .then((res) => {
          if (res.body.code == 1) {
            this.bindInfo = res.body.data
          }
          return this.bindInfo
        }, (err) => {
          console.log(err)
        })
    },
    updateUserInfo() {
      let emailPass = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if(this.dialogOption.emailValue == ''){
        callToast("邮箱不能为空",'warning')
        return
      }
      if( !emailPass.test(this.dialogOption.emailValue)){
        callToast("邮箱格式不正确",'warning')
        return
      }
      callLoading.activeLoading()

      let RealAdress =  (this.bindInfo.emailStatus==1)
                        ?ADDRESS.USER_REBIND_EMAIL
                        :ADDRESS.USERINFO_UPDATE_ADDR

      let  Options = (this.bindInfo.emailStatus==1)
                    ?{newEmail : this.dialogOption.emailValue,password:this.vPass}
                    :{email: this.dialogOption.emailValue}

      this.$http.post(RealAdress,Options)
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          callToast('操作成功')
          this.dialogOption.email = false
          this.bindInfo.emailStatus = 0
          this.bindInfo.email = this.dialogOption.emailValue
        }
        else {
          callToast(res.body.data, 'error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
        callToast('操作失败', 'error')
      })
    },
    sendEmailCode(){
      if(this.timeRest !=0){
        return
      }
      this.$http.post(ADDRESS.SEND_EMAIL_CODE)
      .then((res) =>{
        if(res.body.code == 1){
          var rest = 60
          var restTime = setInterval(
            ()=>{
              rest--
              // console.log(rest)
              this.timeRest = rest
              if(rest == 0){
                clearInterval(restTime)
              }
            },1000
          )
        }
        else{
          callToast('发送失败，请重新发送！', 'error')
        }
      },(err) =>{
        callToast('发送失败，请重新发送！', 'error')
      })
    }
  },
}
</script>

<style scoped>
.pc-card {
  padding: .3rem;
  width: 9.2rem;
  margin: .5rem auto;
  /* height: 4.1rem; */
}



.pc-card-item-button {
  width: 1.1rem;
  height: .4rem;
  line-height: .4rem;
  position:absolute;
  right:0;
  top:0;
}

.pc-card-item {
  min-height: .4rem;
  margin-bottom: .6rem;
}

.dialog-password-cotainer {
  width: 3.5rem;
  margin: 0 auto;
}

.dialog-checkpass-cotainer {
  width: 4.5rem;
  margin: 0 auto;
}

.dialog-checkpass-cotainer-short {
  width: 3.7rem;
  margin: 0 auto;
}

.dialog-checkpass-item {
  margin-bottom: .25rem;
}

.dialog-password-item {
  margin-bottom: .25rem;
}

.dpi-input {
  width: 3.08rem;
  padding: 0 .2rem;
  border: 1px solid #ddd;
  height: .38rem;
  margin-top: .1rem;
}

.dci-input {
  width: 4.1rem;
  padding: 0 .2rem;
  border: 1px solid #ddd;
  height: .38rem;
  margin-top: .1rem;
}

.dcc-input {
  width: 3.1rem;
  padding: 0 .2rem;
  border: 1px solid #ddd;
  height: .38rem;
  margin-top: .1rem;
}

.dialog-head-bottom {
  border-top: 1px solid #ddd;
}

.dhb-button {
  margin: .25rem .4rem 0 0;
}

.dcc-input-short {
  width: 2.2rem;
  padding: 0 .2rem;
  border: 1px solid #ddd;
  height: .38rem;
  margin-top: .1rem;
}

.dialog-checkpass-item {
  font-size: 0;
}

.dci-input-label {
  width: .9rem;
  border: 1px solid #3283d3;
  background: #3283d3;
  color: #fff;
  height: .38rem;
  display: inline-block;
  vertical-align: bottom;
  text-align: center;
  line-height: .38rem;
  cursor: pointer;
}

.dci-input-label-deactive {
  border: 1px solid #ddd;
  background: #ddd;
  color: #3283d3;
}

.send-email-code{
  font-size: .12rem;
  margin-left:.3rem;
  color:#ffa801;
  text-decoration: underline;
}

.send-email-true{
  /* font-size: .12rem; */
  margin-left:.3rem;
  color:#ff7316;
}
</style>
