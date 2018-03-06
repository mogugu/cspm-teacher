
<template>
  <div class="container">
    <ul class="source-nav">
      <li @click="handleDrop('taskTemplate','sourceType')" :class="{'source-nav-item-active': sourceType == 'taskTemplate'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">任务模板</li>
      <li @click="handleDrop('video','sourceType')" :class="{'source-nav-item-active': sourceType == 'video'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">视频</li>
      <li @click="handleDrop('testQuestion','sourceType')" :class="{'source-nav-item-active': sourceType == 'testQuestion'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">试题</li>
      <li @click="handleDrop('paper','sourceType')" :class="{'source-nav-item-active': sourceType == 'paper'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">试卷</li>
      <li @click="handleDrop('workStudent','sourceType')" :class="{'source-nav-item-active': sourceType == 'workStudent'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">学生作品</li>
      <li @click="handleDrop('workPlatform','sourceType')" :class="{'source-nav-item-active': sourceType == 'workPlatform'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">平台优秀作品</li>
      <li @click="handleDrop('courseware','sourceType')" :class="{'source-nav-item-active': sourceType == 'courseware'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">课件</li>
      <li @click="handleDrop('lessonPlan','sourceType')" :class="{'source-nav-item-active': sourceType == 'lessonPlan'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">教案</li>
      <li @click="handleDrop('materialOthers','sourceType')" :class="{'source-nav-item-active': sourceType == 'materialOthers'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">其他</li>
    </ul>
    <ul class="source-more-nav">
      <span class="TH-f-c-default fs-16">类别：</span>
      <!-- <li>全部</li> -->
      <!-- <li
        v-if="sourceType != 'workStudent' && sourceType != 'workPlatform'"
        class="inline-block fs-16 TH-f-c-default cp source-more-nav-item"
        :class="{'TH-f-c-link': dropType=='all'}"
        @click="handleDrop('all','dropType')">
        全部
      </li> -->
      <li
        v-if="sourceType != 'workStudent' && sourceType != 'workPlatform'"
        class="inline-block fs-16 TH-f-c-default cp source-more-nav-item"
        :class="{'TH-f-c-link': dropType=='upload'}"
        @click="handleDrop('upload','dropType')">
        我的上传
      </li>
      <li
        class="inline-block fs-16 TH-f-c-default cp source-more-nav-item"
        :class="{'TH-f-c-link': dropType=='fav'}"
        @click="handleDrop('fav','dropType')">
        我的收藏
      </li>
      <!-- <li
        v-if="sourceType != 'workStudent' && sourceType != 'workPlatform' && sourceType != 'testQuestion' && sourceType != 'courseware' && sourceType != 'lessonPlan' && sourceType != 'materialOthers'"
        class="inline-block fs-16 TH-f-c-default cp source-more-nav-item"
        :class="{'TH-f-c-link': dropType=='buy'}"
        @click="handleDrop('buy','dropType')">
        我的购买
      </li> -->
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

import { ADDRESS } from '../../helpers/address'

export default {
  name: 'PersonalSource',
  data () {
    return {
      sourceType: 'taskTemplate',
      dropType: 'upload'
    }
  },
  created () {
    // this.login()
    // /personalSource/my/taskTemplate
    console.log(this.$route.path)
    this.sourceType = this.$route.path.split('/')[3]
    if (this.$route.path.split('/')[2] == 'my') {
      this.dropType = 'upload'
    }
    else if (this.$route.path.split('/')[2] == 'collect') {
      this.dropType = 'fav'
    }
    else {
      this.dropType = this.$route.path.split('/')[2]
    }
    // this.handleDrop('upload', 'taskTemplate')
  },
  methods: {
    handleDrop(type, target) {
      // console.log(this.sourceType)
      // this.sourceType = type
      if (target == 'dropType') {
        this.dropType = type
        if (type == 'upload') {
          this.$router.push(`/personalSource/my/${this.sourceType}`)
        }
        else if (type == 'fav') {
          this.$router.push({path: `/personalSource/collect/${this.sourceType}`, query: {
            condition: 'favor'
          }})
        }
        else if (type == 'buy') {
          this.$router.push({path: `/personalSource/buy/${this.sourceType}`, query: {
            condition: 'buy'
          }})
        }
        else if (type == 'all') {
          this.$router.push({path: `/personalSource/all/${this.sourceType}`, query: {
            condition: ''
          }})
        }
      }
      else if (target == 'sourceType') {
        this.sourceType = type
        this.dropType = 'upload'
        if (this.sourceType == 'workStudent' || this.sourceType == 'workPlatform') {
          this.$router.push(`/personalSource/collect/${this.sourceType}`)
          this.dropType = 'fav'
          return
        }
        if (this.sourceType == 'testQuestion' && this.dropType == 'buy') {
          this.$router.push(`/personalSource/collect/${this.sourceType}`)
          this.dropType = 'fav'
          return
        }
        if (this.sourceType == 'courseware' && this.dropType == 'buy') {//课件
          this.$router.push(`/personalSource/upload/${this.sourceType}`)
          this.dropType = 'upload'
          return
        }
         if (this.sourceType == 'lessonPlan' && this.dropType == 'buy') {//教案
          this.$router.push(`/personalSource/upload/${this.sourceType}`)
          this.dropType = 'upload'
          return
        }
         if (this.sourceType == 'materialOthers' && this.dropType == 'buy') {//其他
          this.$router.push(`/personalSource/upload/${this.sourceType}`)
          this.dropType = 'upload'
          return
        }
        if (this.dropType == 'upload') {
          this.$router.push(`/personalSource/my/${this.sourceType}`)
        }
        else if (this.dropType == 'fav') {
          this.$router.push({path: `/personalSource/collect/${this.sourceType}`, query: {
            condition: 'favor'
          }})
        }
        else if (this.dropType == 'buy') {
          this.$router.push({path: `/personalSource/buy/${this.sourceType}`, query: {
            condition: 'buy'
          }})
        }
        else if (this.dropType == 'all') {
          this.$router.push({path: `/personalSource/all/${this.sourceType}`, query: {
            condition: ''
          }})
        }
      }
    }
  },
  watch: {
    '$route.path': function(n, o) {
      console.log(n,o, this)
      if (n == '/personalSource/my/taskTemplate') {
        this.sourceType = 'taskTemplate'
      }
    }
  }
}
</script>

<style scoped>
.container{
  width:17rem;
  margin:0 auto;
}

.source-nav {
  margin-bottom: .45rem;
}

.source-nav-item {
  margin-right: .4rem;
}

.source-nav-item-active {
  font-size: .32rem;
  color: #535353;
}

.source-more-nav {
  margin-bottom: .4rem;
}

.source-more-nav-item {
  margin-right: .3rem;
}
/*
.source-more-nav-item-active {
}*/
</style>
