
<template>
  <div class="container">
      <div class="TH-card student-link">
        <p class="TH-f-c-fade fs-16 student-link-label">在您登录时，您的学生可访问该链接，无需密码，直接进行登录</p>
        <div class="student-link-more clear fs-16">
            <p class="slm-label fl">
                <span class="TH-f-c-default inline-block">学生登录链接：</span>
                <span @click="openTarget()" class="TH-f-c-link cp inline-block">{{dataUrl}}</span>
            </p>
            <span 
                class="cp slm-button TH-button-default fr"
                v-clipboard:copy="dataUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">复制链接</span>
        </div>
      </div>
  </div>
</template>

<script>
import { ADDRESS,HEAD } from '../../helpers/address'
import { helper, callToast, callLoading, deepClone } from '../../helpers/helper'
export default {
    name: 'PersonalCenterStudent',
    components: {
    },
    data () {
        return {
            prevUrl: `http://${window.location.host}/bc/static/studentLogin.html?teacherId=`,
            dataUrl: '',
            userinfo: {},
        }
    },
    created () {
        if(this.$store.user.userId) {
            this.userinfo = deepClone(this.$store.user)
            this.dataUrl = this.prevUrl + this.userinfo.userId + '&noId=1'
        }
        else {
            this.getUser()
        }
    },
    methods: {
        onCopy() {
            callToast('复制成功','success')
        },
        onError() {
            callToast('复制失败','error')
        },
        openTarget() {
            window.open(this.dataUrl)
        },
        getUser() {
            callLoading.activeLoading()
            this.getMe((user) => {
                callLoading.deactiveLoading()
                this.$store.user = user
                this.userinfo = user
                this.dataUrl = this.prevUrl + user.userId + '&noId=1'
            }, () => {
                callLoading.deactiveLoading()
                callToast('获取基本信息失败','error')
            })
        },
        getMe(cb,err) {
            this.$http.post(ADDRESS.USERINFO_ADDR)
            .then((res) => {
                if (res.body.code == 1) {
                    cb(res.body.data)
                }
                else {
                    err()
                }
            })
        },
    }
}
</script>

<style scoped>
.student-link {
    padding: .3rem;
    width: 9.2rem;
    margin: 1rem auto;
}

.student-link-more {
    margin-top: .5rem;
}

.slm-button {
    width: 1rem;
    height: .35rem;
    text-align: center;
    line-height: .35rem;
}

.slm-label {
    width: 80%;
    margin-bottom: .1rem;
}

</style>
