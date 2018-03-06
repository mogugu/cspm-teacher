
<template>
  <div id="mts-container" class="TH-card" @mouseleave="dataList_2 = [],dataList_3 = [],dataList_4 = []">
    <ul class="mts-column-1 TH-scroll">
      <li @click="handleChoice(item,'parent',1)" :class="{'mts-column-item-deactive':ctree && !item.included,'mts-column-item-choose':item.open}" class="mts-column-item" @mouseenter="dataList_2 = item.children,dataList_3 = [],selectIndex[0] = $index" v-for="(item, $index) in dataList">{{item.name}}</li>
    </ul>
    <ul class="mts-column-2 TH-scroll" v-if="dataList_2.length > 0">
      <li @click="handleChoice(item,'parent',2)" :class="{'mts-column-item-deactive':ctree && !item.included,'mts-column-item-choose':item.open}" class="mts-column-item" v-for="(item, $index) in dataList_2"  @mouseenter="dataList_4 = [],dataList_3 = item.children?item.children:[],selectIndex[1] = $index">{{item.name}}</li>
    </ul>
    <ul class="mts-column-3 TH-scroll" v-if="dataList_3.length > 0">
      <li v-if="type=='single'" @click="selectIndex[2] = $index,handleChoice(item)" :class="{'mts-column-item-deactive':ctree && !item.included,'mts-column-item-choose':item.open}" class="mts-column-item" v-for="(item, $index) in dataList_3" @mouseenter="dataList_4 = item.children?item.children:[]">{{item.name}}</li>
      <li v-if="type=='mutil'" @click="handleChoice(item,'parent',3)" :class="{'mts-column-item-deactive':ctree && !item.included,'mts-column-item-choose':item.open}" class="mts-column-item" v-for="(item, $index) in dataList_3" @mouseenter="dataList_4 = item.children?item.children:[],selectIndex[2] = $index">{{item.name}}</li>
    </ul>
    <ul class="mts-column-4 TH-scroll" v-if="type=='mutil'&&dataList_4.length > 0  && type != 'single'">
      <li @click="selectIndex[3] = $index,handleChoice(item)" :class="{'mts-column-item-deactive':ctree && !item.included,'mts-column-item-choose':item.open}" class="mts-column-item" v-for="(item, $index) in dataList_4">{{item.name}}</li>
    </ul>
    <div @click="closeSelect()" class="mts-cover">

    </div>
  </div>
</template>

<script>
// 参数 classlist
// 事件 classToggle
import { ADDRESS } from '../helpers/address'
import { callLoading, callToast, deepClone } from '../helpers/helper'
export default {
  name: 'mutil-select',
  props: [
    'selectList',
    'type',
    'cover',
    'ctree'
  ],
  data() {
    return {
      close: true,
      dataList_2: [],
      dataList_3: [],
      dataList_4: [],
      selectIndex: [0,-1,-1,-1]
    }
  },
  created() {
    // console.log('asdad',this.selectList)
    this.dataList = this.selectList
    this.dataList_2 = this.dataList[0].children
    // // this.clearChoose()
    // console.log(this.type)
    // this.getTree()
  },
  methods: {
    // getTree() {
    //   if (this.$store.tree.length > 0) {
    //     this.dataList = deepClone(this.$store.tree)
    //     this.dataList_2 = this.dataList[0].children
    //     return
    //   }
    //   this.$http.post(ADDRESS.ACTIVITY_KNOWLEDGE_TREE_ADDR, {
    //     disciplineCode: 10,
    //     studySection: 3,
    //     textbookVersion: 20
    //   })
    //   .then((res) => {
    //     if (res.body.code == 1) {
    //       this.$store.tree = res.body.data.children
    //       this.dataList = deepClone(this.$store.tree)
    //       this.dataList_2 = this.dataList[0].children
    //       // this.clearChoose()
    //       console.log(this.type)
    //     }
    //   })
    // },
    handleChoice(item, t, q) {
      if (this.type == 'mutil' && t=='parent') {
        return false
      }
      if (this.type == 'single' && (q == 2) || q==1 || q==3) {
        return false
      }
      if (!item.included && this.ctree) {
        return
      }
      if (this.type == 'single') {

        this.clearChoose()
      }
      item.open = !item.open
      if (item.open === false) {
        // if (this.type == 'mutil') {
          item.selectIndex = this.selectIndex
        // }
        this.$emit('choiceDeactive',item)
        this.closeSelect()
        return
      }
      // console.log(this.selectIndex)
      // if (this.type == 'mutil') {
        item.selectIndex = this.selectIndex
      // }
      item.label = item.name
      this.$emit('choiceActive',item)
      this.closeSelect()
    },
    closeSelect() {
      this.$emit('closeSelect',true)
    },
    clearChoose() {
      // console.log(this.dataList)
      if (this.dataList.length>0) {
        for (var i = 0; i < this.dataList.length; i++) {
          // console.log(this.dataList[i])
          this.dataList[i].open = false
          if(this.dataList[i].children.length>0) {
            for (var j = 0; j < this.dataList[i].children.length; j++) {
              this.dataList[i].children[j].open = false
              if(this.dataList[i].children[j].children) {
                for (var k = 0; k < this.dataList[i].children[j].children.length; k++) {
                  this.dataList[i].children[j].children[k].open = false
                  if(this.dataList[i].children[j].children[k].children) {
                    for (var l = 0; l < this.dataList[i].children[j].children[k].children.length; l++) {
                      this.dataList[i].children[j].children[k].children[l].open = false
                    }
                  }
                }
              }
            }
          }
        }
      }
      // if (this.dataList_2.length>0) {
      //   for (var i = 0; i < this.dataList_2.length; i++) {
      //     this.dataList_2[i].open = false
      //   }
      // }
      // if (this.dataList_3.length>0) {
      //   for (var i = 0; i < this.dataList_3.length; i++) {
      //     this.dataList_3[i].open = false
      //   }
      // }
      // if (this.dataList_4.length>0) {
      //   for (var i = 0; i < this.dataList_4.length; i++) {
      //     this.dataList_4[i].open = false
      //   }
      // }
    }
  }
}
</script>

<style scoped>
#mts-container {
  height: 3.7rem;
  clear: both;
  overflow: hidden;
  zoom: 1;
  display: inline-block;
  z-index: 999999;
}

.mts-column-1 {
  position: relative;
  float: left;
  width: 1.7rem;
  height: 100%;
  background: #ececec;
  overflow-y: auto;
  padding: .2rem;
  font-size: .14rem;
  font-weight: bold;
  z-index: 10;
}

.mts-column-2 {
  position: relative;
  float: left;
  display: inline-block;
  width: 2.8rem;
  height: 100%;
  background: #f6f6f6;
  overflow-y: auto;
  padding: .2rem;
  font-size: .14rem;
  z-index: 10;
}

.mts-column-3 {
  position: relative;
  float: left;
  display: inline-block;
  width: 3rem;
  height: 100%;
  background: #ffffff;
  overflow-y: auto;
  padding: .2rem;
  font-size: .14rem;
  z-index: 10;
}

.mts-column-4 {
  position: relative;
  float: left;
  display: inline-block;
  width: 3rem;
  height: 100%;
  background: #ffffff;
  overflow-y: auto;
  padding: .2rem;
  font-size: .14rem;
  z-index: 10;
}

.mts-column-item {
  height: .3rem;
  line-height: .3rem;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin:  0 0 .2rem 0;
  color: #535353;
}

.mts-column-item:hover {
  color: #3283d3;
}

.mts-cover {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
}

.mts-column-item-deactive {
  color: #c1c1c1;
  cursor: not-allowed;
}

.mts-column-item-deactive:hover {
  color: #c1c1c1;
}

.mts-column-item-choose {
  color: #3283d3;
}

</style>
