<template>
  <div class="global-footer">
    这是底部，上面的内容得把我撑开~
  </div>
</template>


<script>
export default {
  name: 'globalfooter',
  props: [
  ],
  data () {
    return {
      msg: 'child',
    }
  },
  created() {
  },
  computed: {
  },
  methods:{

  },
  watch: {
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.global-footer {
  font-size: .3rem;
  width: 100%;
  height: 300px;
}
</style>
