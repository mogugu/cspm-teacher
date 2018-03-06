
<template>
  <div class="container">
    <ul class="source-nav">
      <li
        @click="$router.push('/workRepo/student')"
        :class="{'source-nav-item-active': $route.path.split('/')[2] == 'student'}"
        class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">学生作品</li>
      <li
        @click="$router.push('/workRepo/platform')"
        :class="{'source-nav-item-active': $route.path.split('/')[2] == 'platform'}"
        class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">平台优秀作品</li>
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
