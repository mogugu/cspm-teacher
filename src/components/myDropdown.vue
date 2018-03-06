
<template>
  <el-dropdown @command="chooseByItem">
    <span class="el-dropdown-link">
      {{dropdownData[dropdownActive].text}}<i class="el-icon-caret-bottom el-icon--right"></i>
    </span>
    <el-dropdown-menu class="TH-scroll m-scroll" slot="dropdown">
      <el-dropdown-item :command="$index+''" v-for="(item, $index) in dropdownData">{{item.text}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// 参数 dropdownData
// 事件 choosed
export default {
  name: 'myDropdown',
  props: [
    'dropdownData',
  ],
  data() {
    return {
      close: true,
      dropdownActive: 0
    }
  },
  created() {
    // this.dataList_2 = this.dataList[0].children
  },
  methods: {
    chooseByItem(index) {
      // console.log(index)
      if(index==0){
        this.$emit('choosed', '')
      }else{
        this.$emit('choosed', (+index))
      }
      this.dropdownActive = +index
    }
  }
}
</script>

<style scoped>
.m-scroll {
    max-height: 300px !important;
    overflow: auto !important;
}

</style>
