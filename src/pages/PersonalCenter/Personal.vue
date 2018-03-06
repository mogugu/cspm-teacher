
<template>
  <div class="personal-container">
    <div class="personal-nav ta-c">
        <span 
            @click="$router.push('/personalCenter/base')"
            :class="{'personal-nav-item-active': $$path=='personalCenter'}" 
            class="personal-nav-item fwb inline-block TH-f-c-default fs-16 cp">个人中心</span>
        <span 
            @click="$router.push('/personalSource/my/taskTemplate')"
            :class="{'personal-nav-item-active': $$path=='personalSource'}" 
            class="personal-nav-item fwb inline-block TH-f-c-default fs-16 cp">我的资源</span>    
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import { ADDRESS } from '../../helpers/address'

export default {
  name: 'Personal',
  data () {
    return {

    }
  },
  created () {
  },
  methods: {

  },
  computed: {
    $$path() {
      return this.$route.path.split('/')[1]
    }
  }
}
</script>

<style scoped>
.personal-container {
  width: 100%;
  margin: 0 auto;
}

.personal-nav {
    width: 100%;
    height: .7rem;
    line-height: .68rem;
    background: #fefefe;
    margin-bottom: .5rem;
    box-shadow: 0 3px 6px rgba(2,22,37,.1);     
}

.personal-nav-item {
    border-bottom: 3px solid transparent;
    margin-right: .5rem;
}

.personal-nav-item-active {
    color: #3293d3;
    border-bottom: 3px solid #3283d3;
}

</style>
