<template>
  <div class="container">
      <!-- 筛选条件 -->
      <div class="task-index-page-nav relative clear">
        <div class="wtt-choice task-select-action TH-f-c-default fs-20 cp fl TH-card" @click="task.showChoiceFlag = true">
            <img src="static/imgs/common/shaixuan.png" alt="筛选">
            活动选择
        </div>
        <div class="task-index-page-nav-left fl">
          <div class="task-nav-list inline-block">
            <span class="task-nav-list-tit block fs-14">班级</span>
            <!-- <my-dropdown @choosed="handleDrop('class',$event)" :dropdownData="$store.dropdown.classList">
            </my-dropdown>   -->
            <class-cascader
              @choosed="handleDrop('class',$event)"
              :classList="$store.dropdown.classCascaderList"
            >
            </class-cascader>
            <!-- <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions2"
              @change="handleChange">
            </el-cascader> -->
          </div>
          <div class="task-nav-list inline-block relative">
            <span class="task-nav-list-tit block fs-14">开始时间</span>
            <!-- <el-date-picker
              v-model="start_time"
              type="datetime"
              @change="startTime"
              placeholder="年年-月月-日日" format="yyyy-MM-dd HH:mm">
            </el-date-picker> -->
            <el-date-picker
            v-model="start_time"
            type="date"
            @change="startTime"
            :picker-options="pickerOptions0">
            </el-date-picker>
            <img @click="clear(1)" v-show="start_time!=''" class="delete-time" src="~assets/imgs/classTask/search-cancel.png" alt="">
          </div>
          <div class="task-nav-list inline-block relative">
            <span class="task-nav-list-tit block fs-14">结束时间</span>
            <!-- <el-date-picker
              v-model="end_time"
              type="datetime"
              @change="endTime"
              placeholder="年年-月月-日日" format="yyyy-MM-dd HH:mm">
            </el-date-picker> -->
            <el-date-picker
            v-model="end_time"
            type="date"
            @change="endTime"
            :picker-options="pickerOptions0">
            </el-date-picker>
            <img @click="clear(2)" v-if="end_time!=''" class="delete-time" src="~assets/imgs/classTask/search-cancel.png" alt="">
          </div>
          <div class="task-nav-list inline-block">
            <span class="task-nav-list-tit block fs-14">搜索</span>
            <div class="self-set-input relative">
                <i @click="handleDrop('title', 0)" class="block"></i>
                <input @keyup.enter="handleDrop('title', 0)" type="text" name="" class="fs-16" v-model="searchOption.title" placeholder="请输入关键字...">
            </div>
          </div>
        </div>
        <button @click="$router.push('/task/publish')" type="button" class="push-task-classes button">
          <img src="~assets/imgs/classTask/publish-task.png" alt="">
          <span class="fs-20 inline-block">发布任务</span>
        </button>
      </div>
      <mutil-select class="work-temp-top-mutil-select absolute"
        v-if="task.showChoiceFlag"
        :selectList="selectOption"
        :cover="true"
        type="single"
        @choiceDeactive="removeSelect($event)"
        @choiceActive="handleChoice($event)"
        @closeSelect="task.showChoiceFlag = false">
      </mutil-select>
      <div v-if="searchOption.activityId !=''"  :key="$index" 
        class="work-temp-top-mutil-select-item task-action-mutil-select inline-block relative">
        <span  class="wtt-msi-name fl tof">{{task.actionName}}</span>
        <div class="wtt-msi-icon fl relative">
          <img src="static/imgs/classTask/search-cancel.png" alt="cancel" class="absolute" @click="removeSelect(bar, $index)">
        </div>
      </div>
      <!-- 活动内容 -->
      <div class="task-index-page-content">
          <div v-if="wList==''" class="no-tasks-list-publish">
            <img src="~assets/imgs/codeZero/task/no-published-task.png" alt="">
            <p class="fs-18 TH-f-c-default">还没有班级任务呢，点击右上角按钮可发布！</p>
          </div>
          <div v-if=" wList!='' " 
              class="task-content-example inline-block" 
              @click="$router.push({path:'/classTask/detail',query:{id:item.taskId}})"  
              :key="_index"
              v-for="(item,_index) in wList">
              <div
                :class="{
                  'ant-theme-un': (item.showFlag==0),
                  'ant-theme-out': (item.showFlag==3||item.showFlag==4),
                  'ant-theme-cing': (item.showFlag==1),
                  'ant-theme-cwrong': (item.showFlag==5||item.showFlag==2),
                  'ant-theme-unpub': (item.showFlag==6),
                  }"
               class="action-nav-title clear">
                  <div class="ant-left fl">
                    <img class="ant-left-img" v-if="(item.showFlag==4||item.showFlag==3)" src="~assets/imgs/classTask/calculated.png" alt="已结算">
                    <img class="ant-left-img" v-if="(item.showFlag==0)" src="~assets/imgs/classTask/undergoing.png" alt="进行中">
                    <img class="ant-left-img" v-if="(item.showFlag==1)" src="~assets/imgs/classTask/calculating.png" alt="正在结算">
                    <img class="ant-left-img" v-if="(item.showFlag==2||item.showFlag==5)" src="~assets/imgs/classTask/calculated--unusual.png" alt="结算异常">
                    <img class="ant-left-img" v-if="(item.showFlag==6)" src="~assets/imgs/classTask/to-be-assigned.png" alt="待分配">
                  </div>
                  <div class="ant-top ta-c fl">
                    <p class="fs-16 fwb tof">{{item.title}}</p>
                    <p class="fs-12">{{item.startTime}} 至 {{item.endTime}}</p>
                  </div>
              </div>
              <div class="action-message-list fs-14">
                  <p class="action-name-task">
                    <img class="action-name-task-icon" src="~assets/imgs/classTask/activity.png" alt="activity">
                    <span>活动：{{item.activityName}}</span>
                  </p>
                  <div class="action-classes-list">
                    <div class="action-class-list-all fl">
                      <img class="action-class-list-icon fl" src="~assets/imgs/classTask/class.png" alt="class">
                      <span class="fl action-class-list-label">班级：</span>
                      <div class="inline-block fl acl-classlist">
                        <span class="inline-block" v-for="(item,index) in item.taskClasses" v-if="index<6">{{item.className}}</span>
                        <div class="fr inline-block more-classes-lists relative">
                          <span class="inline-block more" v-if="item.taskClasses.length > 6">更多...</span>
                          <div class="action-class-list-more inline-block">
                            <span v-for="(item,index) in item.taskClasses" v-if="index >6">{{item.className}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="action-time-task">
                    {{item.startTimeStr}}发布
                    <span v-if="item.isDeleted" class="fr Th-f-c-red-1">学生端已删除</span>
                    </p>
              </div>
          </div>
          <div class="task-pages" v-if="workPages.total > 6">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="workPages.current"
              :page-sizes="[6, 12, 24, 36]"
              :page-size="searchOption.rows"
              layout="sizes, prev, pager, next"
              :total="workPages.total">
            </el-pagination>
          </div>
      </div>
  </div>
</template>

<script>
import myDropdown from '../../components/myDropdown'
import classCascader from '../../components/classCascader'
import mutilSelect from '../../components/mutilSelect'
import { callLoading,
         deepClone,
         videoTime , 
         callToast,
         clearTree,
         callModalToast} from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'

export default {
  name: 'ClassTaskIndex',
  components: {
    'my-dropdown': myDropdown,
    'class-cascader': classCascader,
    'mutil-select':mutilSelect 
  },
  computed: {
    selectOption() {
      return deepClone(this.$store.tree)
    }
  },
  data () {
    return {
      searchOption: {
        classId: '',
        activityId:'',
        startDate: '',
        endDate: '',
        title: '',
        flag: '',
        taskType: '',
        page: 1,
        rows: 6,
      },
      task:{
        showChoiceFlag:false,
        actionName:''
      },
      wList: [],
      workPages: {
        total: 0,
        size: 8,
        current: 1,
      },
      showMoreClassList: false,
      start_time:'',
      end_time:'',
      start_time_type:false,
      end_time_type:false,
      content:'',
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      },
    }
  },
  created () {
    this.searchByOption()
  },
  methods: {
    handleChoice(ev) {
      this.activityOption.choosenActivity.splice(0,1,ev)
      this.searchOption.activityId = ev.id
      this.task.actionName = ev.label
      this.searchByOption()
    },
    removeSelect() {
      clearTree(this.selectOption)
      this.activityOption = {
        showChoiceFlag: false,
        choosenActivity: [{label:''}],
      }
      this.searchOption.activityId = ''
      this.searchByOption()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1,
      this.searchOption.rows = val
      this.workPages.current = 1
      this.searchByOption()
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.searchOption.page = val
      console.log(`当前页: ${val}`);
      this.searchByOption()
    },
    handleDrop(type, item) {
      if (type == 'class') {
        this.searchOption.classId = item
      }
      else if (type == 'title') {

      }
      this.searchOption.page = 1
      this.workPages.current = 1
      this.searchByOption()
    },
    clear(_item){
      if(_item == 1){
        this.start_time = ''
        this.searchOption.startDate = ''
      }else{
        this.end_time = ''
        this.searchOption.endDate = ''
      }
      this.searchOption.page = 1
      this.searchByOption()
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.get(ADDRESS.TASK_LIST_PUBLISH_ADDR, {params: this.searchOption})
        .then((res) => {
          if (res.body.code == 1) {
            this.wList = res.body.data.list
            this.workPages.total = +res.body.data.total
            console.log('page ',this.workPages.total)
            callLoading.deactiveLoading()
          }
          else {
            this.wList = []
            this.workPages.total = 0
            callLoading.deactiveLoading()
          }
        }, (err) => {
          callLoading.deactiveLoading()
          console.log(err)
        })
    },
    endTime(time){
      this.end_time_type = true;
      if(this.start_time!=''){
        if(new Date(time).getTime()<new Date(this.start_time).getTime()){
            this.end_time = ''
            this.end_time_type = false
            callToast('结束时间不能比开始时间小哦','warning')
            return
        }
        else {
          if (this.end_time != '') {
            this.searchOption.endDate = videoTime.timeStringify(+this.end_time)
            this.searchByOption()
          }
        }
      }
      if (this.end_time != '') {
        this.searchOption.endDate = videoTime.timeStringify(+this.end_time)
      }
    },
    startTime(time){
      this.start_time_type = true;
      if(this.end_time!=''){
        if(new Date(time).getTime()>new Date(this.end_time).getTime()){
            this.start_time = '';
            this.start_time_type = false;
            callToast('开始时间不能比结束时间大哦','warning')
            return
        }
        else {
          if (this.start_time != '') {
            this.searchOption.startDate = videoTime.timeStringify(+this.start_time)
            this.searchByOption()
          }
        }
        return
      }
      if (this.start_time != '') {
        this.searchOption.startDate = videoTime.timeStringify(+this.start_time)
      }
    },
    rangeActionBg(){
      console.log('call this random method')
      let rangeIndex=Math.floor(Math.random()*6+1);
      return 'static/imgs/classTask/bg'+rangeIndex+'.png';
    }
  }
}
</script>

<style scoped>
.container{
  width:17rem;
  margin:0 auto;
}

.task-index-page-nav{
  padding: 1px;
}

.task-index-page-nav-left{
  height: .8rem;
  width: 11.5rem;
  background-color: #fff;
  padding: 0 .2rem;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  -moz-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
}

.task-index-page-nav-left .task-nav-list{
  margin-bottom: .1rem;
  margin-right: .65rem;
  width: 2rem;
}

.task-nav-list .delete-time{
  position: absolute;
  width: .15rem;
  height: .15rem;
  bottom: .12rem;
  right: -.4rem;
  cursor: pointer;
  cursor: pointer;
}

.task-index-page-nav-left .task-nav-list:last-child,
.self-set-input,.self-set-input input{
  margin-right: 0;
  width: 2.85rem;
}

.self-set-input i.block{
  position: absolute;
  width: .21rem;
  height: .21rem;
  right: 0;
  top: .1rem;
  background-image: url('../../assets/imgs/classTask/search.png');
  cursor: pointer;
  background-size: contain;
}

.self-set-input input{
  height: .39rem;
  line-height: .4rem;
  border:none;
  border-bottom: 1px solid #ddd;
  outline: none;
  padding: 0;
}

.task-nav-list .task-nav-list-tit{
  height: .3rem;
  line-height: .3rem;
  color: #878787;
}

.push-task-classes{
  position: absolute;
  width: 1.8rem;
  height: .6rem;
  line-height: .6rem;
  top: .1rem;
  right: 0;
  padding: 0;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  background-color: #535353;
  -webkit-box-shadow: 0 1px 2px rgba(2,22,37,.3);
  -moz-box-shadow: 0 1px 2px rgba(2,22,37,.3);
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: -webkit-linear-gradient(bottom, #32abd3, #3283d3);
  background-image: -moz-linear-gradient(bottom, #32abd3, #3283d3);
  background-image: -o-linear-gradient(bottom, #32abd3, #3283d3);
  background-image: -ms-linear-gradient(bottom, #32abd3, #3283d3);
  background-image: linear-gradient(to top, #32abd3, #3283d3);
}

.push-task-classes:hover{
  background-color: #3283d3;
  background-image: -webkit-linear-gradient(bottom, #3ebbe4, #4093e4);
  background-image: -moz-linear-gradient(bottom, #3ebbe4, #4093e4);
  background-image: -o-linear-gradient(bottom, #3ebbe4, #4093e4);
  background-image: -ms-linear-gradient(bottom, #3ebbe4, #4093e4);
  background-image: linear-gradient(to top, #3ebbe4, #4093e4);
}

.push-task-classes img{
  width: .26rem;
  height:.26rem;
  float: left;
  margin:.17rem .17rem;
}

.push-task-classes span.fs-20{
    color: #fff;
    float: left;
    padding-left: .1rem;
}

/*任务开始*/
.task-index-page-content{
  width: 18rem;
  margin: .3rem auto;
}

.task-content-example{
  width: 5.55rem;
  height:3.08rem;
  margin-right: 0.45rem;
  margin-bottom: .45rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  cursor: pointer;
}

.task-content-example:nth-child(3n){
  margin-right: 0;
}

.action-bg-imgs{
  height: .9rem;
}
.action-bg-imgs img{
  width: 3.88rem;
  height: .9rem;
}
.action-nav-title{
  height: .9rem;

  /* padding: .15rem; */
}

.ant-theme-un.action-nav-title {
  background-color: #3283d3;
  background-image: url('../../assets/imgs/classTask/blue-bg.png');
  background-repeat: no-repeat no-repeat;
  background-position-x: center;
  background-position-y: .2rem;
  background-size: auto;
}


.ant-theme-out.action-nav-title {
  background-color: #2d986e;
  background-image: url('../../assets/imgs/classTask/green-bg.png');
  background-repeat: no-repeat no-repeat;
  background-position-x: center;
  background-position-y: .2rem;
  background-size: auto;
}

.ant-theme-cing.action-nav-title {
  background-color: #349ce8;
  background-image: url('../../assets/imgs/classTask/light-blue-bg.png');
  background-repeat: no-repeat no-repeat;
  background-position-x: center;
  background-position-y: .2rem;
  background-size: auto;
}

.ant-theme-cwrong.action-nav-title {
  background-color: #f59c00;
  background-image: url('../../assets/imgs/classTask/orange-bg.png');
  background-repeat: no-repeat no-repeat;
  background-position-x: center;
  background-position-y: .2rem;
  background-size: auto;
}

.ant-theme-unpub.action-nav-title {
  background-color: #334960;
  background-image: url('../../assets/imgs/classTask/dark-blue-bg.png');
  background-repeat: no-repeat no-repeat;
  background-position-x: center;
  background-position-y: .2rem;
  background-size: auto;
}

.ant-left {
  width: 15%;
  height: .9rem;
  line-height: .9rem;
}

.ant-left-img {
  vertical-align: middle;
  margin-left: 30%;
}

.ant-top {
  width: 70%;
}

.action-nav-title p{
  color: #fff;
}

.action-nav-title p.fs-16{
  padding: .15rem 0;
}

.action-message-list{
  padding: 0 .15rem;
  background-color: #fff;
  color: #535353;
}

.action-describle.fs-13{
  height:.55rem;
  border-bottom: 1px solid #ddd;
  line-height: .2rem;
  padding: .1rem 0;
  line-height: .28rem;
}

.action-classes-list{
  padding: .15rem 0;
  height: .25rem;
}

.action-classes-list .action-class-list-all{
  width: 100%;
  height: 1.2rem;
  line-height: .16rem;
  /* overflow: hidden; */
}

.action-classes-list span.inline-block{
  margin-right: .1rem;
  margin-bottom: .1rem; 
}

.action-classes-list span.inline-block:nth-child(3n) {
  /* margin-right: 0; */
}

.action-classes-list span.inline-block.more{
  color: #3283d3;
  cursor: pointer;
}
.more-classes-lists:hover .action-class-list-more{
  display:inline-block;
}
.action-class-list-more{
  position: absolute;
  background-color: #53677c;
  padding: .1rem;
  width: 3.28rem;
  color: #fff;
  right: 0;
  display:none;
}
.action-class-list-more>span{
  margin-right:.1rem;
}
.action-class-list-more:before{
  position: absolute;
  border-top:5px solid transparent;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-bottom: 5px solid #53677c;
  top: -.1rem;
  right: .35rem;
  content: ''
}
.action-name-task{
  margin-top: .1rem;
  margin-bottom: .1rem;
}
.action-time-task{
  height: .2rem;
  line-height: .2rem;
  color: #878787;
}
.no-tasks-list-publish{
  width: 5.3rem;
  height: 3.4rem;
  margin: 0 auto;
  margin-top: 1.3rem;
  text-align: center;
}

.no-tasks-list-publish img{
  width: 3.09rem;
  height: 1.31rem;
  margin-top: .6rem;
  margin-bottom: .5rem;
}

.task-select-action{
  height: .8rem;
  margin-right: .5rem;
  padding: 0 .2rem;
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex-box;
  display:flex;
  -webkit-box-align:center;
  -ms-flex-align:center;
  align-items:center;
  -webkit-box-pack:center;
  -ms-flex-pack:center;
  justify-content:center;
}

.task-select-action img{
  margin-right: .2rem;
}

.work-temp-top-mutil-select-item {
  margin-top: .2rem;
  height: .35rem;
  line-height: .35rem;
  border-radius: 4px;
  text-align: center;
  background-color: #535353;
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #9599a0, #6b7279);
  color: #fff;
}

.work-temp-top-mutil-select-item:hover {
  background-image: linear-gradient(to top, #a8a9aa, #777b7f);
}

.wtt-msi-name {
  border-right: 1px solid #fff;
  height: 100%;
  display: inline-block;
  min-width: .9rem;
  padding: 0 .25rem;
  text-align: center;
}

.wtt-msi-icon {
  width: .35rem;
  height: .35rem;
  position: relative;
}

.wtt-msi-icon {
  top: .1rem;
  right: .08rem;
}

.action-name-task-icon,
.action-class-list-icon {
  vertical-align: middle
}

.acl-classlist {
  width: 80%;
  margin: 6px 0 0 0;
}

.action-class-list-label {
  margin: 6px 0 0 3px;
}

</style>
