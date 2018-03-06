
<template>
  <div class="container">
    <ul class="source-nav">
      <li @click="$router.push('/sourceRepo/workTemplate')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'workTemplate'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">任务模板</li>
      <li @click="$router.push('/sourceRepo/video')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'video'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">视频</li>
      <li @click="$router.push('/sourceRepo/testQuestion')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'testQuestion'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">试题</li>
      <li @click="$router.push('/sourceRepo/paper')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'paper'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">试卷</li>
      <li @click="$router.push('/sourceRepo/courseware')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'courseware'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">课件</li>
      <li @click="$router.push('/sourceRepo/lessonPlan')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'lessonPlan'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">教案</li>
      <li @click="$router.push('/sourceRepo/others')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'others'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">其他</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'SourceRepoWorkTemplate',
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
.source-nav-item {
  margin-right: .4rem;
}

.source-nav-item-active {
  font-size: .32rem;
  color: #535353;
}

</style>
