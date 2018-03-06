<template>
  <div class="">
    <ul class="global-nav">
      <li><router-link to="/index">首页</router-link></li>
      <li><router-link to="/about">关于</router-link></li>
    </ul>
    <p>这是{{$route.path}}</p>
  </div>
</template>


<script>
export default {
  name: 'globalnav',
  props: [
  ],
  data () {
    return {
      msg: 'child',
    }
  },
  created() {
    console.log(this.$router.options.routes)
  },
  computed: {
  },
  methods:{

  },
  watch: {
  },

}
</script>

<style scoped>
.global-nav {
  line-height: .5rem;
}



li {
  display: inline-block;
  font-size: .3rem;
}
li a {
  color: #3498db;
  font-size: .3rem;
}
</style>
