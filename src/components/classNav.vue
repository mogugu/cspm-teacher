
<template>
  <div>
    <div class="class-nav fs-22">
      <div v-if="showMore" @click="showMore = false" class="class-nav-cover"></div>
      <span class="inline-block" @click="toggleClass(item.classId)" :class="{'active':item.classId == activeClass}" v-for="item in classList">{{item.className}}</span>
      <div class="class-nav-more-container">
        <p @click="showMore = !showMore" v-if="classListOther.length" class="class-nav-more"><span>更多</span><i class="el-input__icon el-icon-time"></i></p>
        <ul v-if="showMore" class="class-nav-more-content">
          <li @click="toggleClassMore(item)" :class="{'cnmc-item-active':item.classId == activeClass}" class="cnmc-item" v-for="item in classListOther">{{item.className}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ADDRESS } from '../helpers/address'
// 参数 classlist
// 事件 classToggle
export default {
  name: 'class-nav',
  props: [
    'all',
    'classlist',
    'activeFlag',
  ],
  data() {
    return {
      close: true,
      activeClass: 0,
      classList: [],
      classListOther: [],
      showMore: false,
      toggleClick: false,
    }
  },
  created() {
    if (this.classlist) {
      //console.log(this.$router)
      const _ar = (this.all)?[]:[{className:'全部',classId:0}]
      // this.classlist = _ar.concat(this.classlist)
      this.classList = _ar.concat(this.classlist).slice(0,8)
      this.classListOther = this.classlist.slice(8)
      this.activeClass = (this.all)?this.classList[0].classId:0
      return
    }
    if(!this.$store.classList) {
      this.getClassList()
      return
    }
    console.log('all',this.all)
    const _ar = (this.all)?[]:[{className:'全部',classId:0}]
    this.classlist = _ar.concat(this.$store.classList)
    this.classList = this.classlist.slice(0,8)
    this.classListOther = this.classlist.slice(8)
    console.log('this.activeFlag',this.activeFlag);
    this.activeClass = (this.all)?this.classList[this.activeFlag || 0].classId:0
    this.$emit('classnavLoaded',true)
  },
  methods: {
    toggleClass(id) {
      this.activeClass = +id
      console.log('发送一个id',id)
      this.$emit('classToggle',id)
      // if(this.classList[0].classId == 0) {
      //   return
      // }
      if (this.toggleClick) {
        this.classList.shift()
        this.toggleClick = false
      }
      if (this.classListOther.length == 0) {
        return
      }
      // this.classList.splice(0,1)
    },
    toggleClassMore(item) {
      this.toggleClass(item.classId)
      if (!this.toggleClick) {
        this.classList.unshift(item)
      }
      else {
        this.classList.splice(0,1,item)
      }
      this.showMore = false
      this.toggleClick = true
    },
    getClassList() {
      this.$http.post(ADDRESS.CLASS_TEACHER_LIST_ADDR)
        .then((res) => {
          if (res.body.code == 1) {
            this.$store.classList = res.body.data
            const _ar = (this.all)?[]:[{className:'全部',classId:0}]
            this.classlist = _ar.concat(this.$store.classList)
            this.classList = this.classlist.slice(0,8)
            this.classListOther = this.classlist.slice(8)
            // this.activeClass = (this.all)?this.classList[0].classId:0
            this.activeClass = (this.all)?this.classList[this.activeFlag || 0].classId:0
            this.$emit('classnavLoaded',true)
          }
        }, (err) => {
          console.log(err)
        })
    },
  }
}
</script>

<style scoped>
.class-nav{
  color: #999;
  height: .94rem;
}

.class-nav span{
  margin-right: .3rem;
  margin-bottom: .15rem;
  cursor: pointer;
}

.class-nav span.active{
  font-size: .32rem;
  font-weight: bold;
  color: #535353;
}

.class-nav-more-container {
  display: inline-block;
  position: relative;
}

.class-nav-more {
  color: #3283d3;
  font-size: .16rem;
  cursor: pointer;
}

.class-nav-more-content {
  position: absolute;
  width: 2.1rem;
  height: 2.5rem;
  top: .25rem;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 10;
}

.class-nav-more-content::-webkit-scrollbar {
  width:12px;
}

.class-nav-more-content::-webkit-scrollbar-track {
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
  border-radius:10px;
}

.class-nav-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 滚动条滑块 */
.class-nav-more-content::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgba(0,0,0,0.1);
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
.class-nav-more-content::-webkit-scrollbar-thumb:window-inactive {
  background:rgba(255,0,0,0.4);
}

.cnmc-item {
  width: 100%;
  height: .5rem;
  line-height: .5rem;
  padding: 0 .2rem;
  font-size: .16rem;
  color: #535353;
  cursor: pointer;
}

.cnmc-item:hover {
  background: #e5ebee;
}

.cnmc-item-active {
  color: #3283d3;
}

</style>
