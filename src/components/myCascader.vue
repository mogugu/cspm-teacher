
<template>
  <el-cascader
    expand-trigger="hover"
    :options="options"
    :change-on-select="false"
    :show-all-levels="false"
    v-model="dropdownActive"
    @change="chooseByItem">
  </el-cascader>
</template>

<script>
// 参数 dropdownData
// 事件 choosed
export default {
  name: 'myDropdown',
  props: [
    // 'dropdownData',
  ],
  data() {
    return {
      options: [
        {
          value: '',
          label: '全部',
        },
        {
          value: 'office',
          label: 'OFFICE文件',
          children: [
            {
              value: 'txt',
              label: 'TXT文件',
            },
            {
              value: 'doc',
              label: 'WORD文档',
            },
            {
              value: 'xls',
              label: 'EXCEL表格',
            },
            {
              value: 'ppt',
              label: '幻灯片',
            },
          ]
        },
        {
          value: 'iamge',
          label: '图片',
          children: [
            {
              value: 'psd',
              label: 'PSD文件',
            },
            {
              value: 'png',
              label: 'PNG图片',
            },
            {
              value: 'jpg',
              label: 'JPG图片',
            },
          ]
        },
        {
          value: 'mp',
          label: '音视频',
          children: [
            {
              value: 'mp3',
              label: 'MP3文件',
            },
            {
              value: 'avi',
              label: 'AVI文件',
            },
            {
              value: 'wmv',
              label: 'WMV文件',
            },
            {
              value: 'mp4',
              label: 'MP4文件',
            },
          ]
        },
        {
          value: 'flash',
          label: 'FLASH文件',
          children: [
            {
              value: 'swf',
              label: 'SWF文件',
            },
            {
              value: 'fla',
              label: 'FLA文件',
            },
          ]
        },
        {
          value: 'other',
          label: '其他',
          children: [
            {
              value: 'xmind',
              label: '思维导图',
            },
            {
              value: 'zip',
              label: '压缩文件包',
            },
            {
              value: 'vbp',
              label: 'VB工程文件',
            },
            {
              value: 'frm',
              label: '窗体文件',
            },
            {
              value: 'nrb',
              label: 'NRB工程文件',
            },
            {
              value: 'mdb',
              label: '数据库文件',
            },
            {
              value: 'cdr',
              label: 'CorelDRAW文件',
            },
          ]
        },
      ],
      close: true,
      dropdownActive: []
    }
  },
  created() {
    // this.dataList_2 = this.dataList[0].children
  },
  methods: {
    chooseByItem(index) {
      const _index = index[1]
      if(index==0){
        this.$emit('choosed', '')
      }else{
        this.$emit('choosed', _index)
      }
      // this.dropdownActive = +index
    }
  }
}
</script>

<style scoped>

.el-cascader-menu {
  height: 245px;
}
</style>
