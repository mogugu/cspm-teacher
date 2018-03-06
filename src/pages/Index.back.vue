<template>
  <div class="container">
    <h1>hello world!</h1>
  
    <div class="alert-my">
      <el-alert
        title="成功提示的文案"
        type="success">
      </el-alert>
      <el-radio class="radio" v-model="radio_1" label="1">备选项</el-radio>
      <el-radio class="radio" v-model="radio_2" label="2">备选项</el-radio>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="date_1"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
      <el-rate v-model="rate_1"></el-rate>
      <div class="demo_tree">
        <el-tree :data="data_tree" :props="defaultPropsTree" @node-click="handleNodeClick"></el-tree>
      </div>
      <el-tooltip placement="right">
        <div slot="content">多行信息<br/>第二行信息多行信息<br/>第二行信息多行信息<br/>第二行信息多行信息<br/>第二行信息多行信息<br/>第二行信息多行信息<br/>第二行信息多行信息<br/>第二行信息多行信息<br/>第二行信息多行信息<br/>第二行信息多行信息<br/>第二行信息</div>
        <el-button>hover me</el-button>
      </el-tooltip>
      <button type="button" name="button" @click="callMsg()">触发消息提示</button>
      <button type="button" name="button" @click="loadData()">加载信息</button>
    </div>
  </div>
</template>

<script>
import { ADDRESS } from '../helpers/address'
import { Loading } from 'element-ui'
import { callLoading } from '../helpers/helper'

export default {
  name: 'Index',
  store: ['user'],
  data () {
    return {
      rate_1: 0,
      date_1: +new Date(),
      radio_1: false,
      radio_2: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      data_tree: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultPropsTree: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created () {
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    callMsg() {
      this.$message({
        showClose: true,
        message: '这是一条错误消息提示',
        type: 'error'
      });
    },
    loadData() {
      callLoading.activeLoading()
      window.setTimeout(callLoading.deactiveLoading, 1000)
    },
  }
}
</script>

<style scoped>
.container h1,
.container h2 {
  font-size: .2rem;
}

.alert-my {
  font-size: .2rem;
}

.demo_tree {
  margin-top: 1rem;
  width: 5rem;
  height: 1rem;
  overflow-y: scroll;
}

.demo_tree::-webkit-scrollbar {
  width:12px;
}
/* 滚动槽 */
.demo_tree::-webkit-scrollbar-track {
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
  border-radius:10px;
}
/* 滚动条滑块 */
.demo_tree::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgba(0,0,0,0.1);
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
.demo_tree::-webkit-scrollbar-thumb:window-inactive {
  background:rgba(255,0,0,0.4);
}

</style>
