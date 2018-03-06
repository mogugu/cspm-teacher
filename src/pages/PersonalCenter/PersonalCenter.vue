
<template>
  <div class="container">
    <ul class="source-nav">
      <li @click="$router.push('/personalCenter/base')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'base'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">个人资料</li>
      <li @click="$router.push('/personalCenter/student')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'student'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">学生链接</li>
      <li @click="$router.push('/personalCenter/modify')" :class="{'source-nav-item-active': $route.path.split('/')[2] == 'modify'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">账户安全</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

import { ADDRESS } from '../../helpers/address'

export default {
  name: 'PersonalCenter',
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
