
<template>
  <div class="container">
    <ul class="source-nav">
      <li @click="$router.push('/personalCollect/taskTemplate')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'taskTemplate'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">任务模板</li>
      <li @click="$router.push('/personalCollect/video')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'video'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">视频</li>
      <li @click="$router.push('/personalCollect/testQuestion')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'testQuestion'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">试题</li>
      <li @click="$router.push('/personalCollect/paper')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'paper'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">试卷</li>
      <li @click="$router.push('/personalCollect/workClass')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'workClass'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">学生作品</li>
      <li @click="$router.push('/personalCollect/workPlatform')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'workPlatform'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">平台优秀作品</li>
      <li @click="$router.push('/personalCollect/courseware')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'courseware'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">课件</li>
      <li @click="$router.push('/personalCollect/lessonPlan')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'lessonPlan'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">教案</li>
      <li @click="$router.push('/personalCollect/materialOthers')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'materialOthers'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">其他</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

import { ADDRESS } from '../../helpers/address'

export default {
  name: 'PersonalCollect',
  data () {
    return {

    }
  },
  created () {
  },
  methods: {

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

</style>
