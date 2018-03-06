<template>
  <div class="toggle-list">
    <p class="t-l-choosen" @click="close = !close">
      {{active.name}}
      <i class="ni-icon fa fa-angle-down" v-bind:class="{'ni-icon-down': close}" aria-hidden="true"></i>
    </p>
    <ul class="t-l-choices" v-if="!close">
      <li v-for="i in choices" class="t-l-c-item" @click="toggleActive(i.id, i.name)">{{i.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'toggle-list',
  props: [
    'choices',
    'compTitle'
  ],
  data() {
    return {
      close: true,
      active: {
        name: '',
        id: ''
      },
      dataList: this.choices
      // choices: [
      //   {
      //     name: 'test1',
      //     id: 0,
      //   },
      //   {
      //     name: 'test2',
      //     id: 1,
      //   },
      //   {
      //     name: 'test3',
      //     id: 2,
      //   }
      // ]
    }
  },
  created() {
    this.active.name = this.dataList[0].name
    this.active.id = this.dataList[0].id
  },
  methods: {
    toggleActive(id, name) {
      this.active.name = name
      this.active.id = id
      this.close = true
      this.$emit('choiceDown', id)
    }
  }
}
</script>

<style scoped>

.t-l-choosen {
  font-size: .22rem;
  color: #202c38;
  margin: 0 .3rem;
  height: 1rem;
  line-height: 1rem;
}

.t-l-choices {
  background: #e3e3e3;
  font-size: .22rem;
  display: inline-block;
  color: #202c38;
  z-index: 50;
  position: relative;
}
.t-l-c-item {
  margin: .3rem;
}

.ni-icon {
  color: #6cbe4b;
  transition: all .2s;
}

.ni-icon-down {
  transform: rotate(180deg);
  transition: all .2s;
}

</style>
