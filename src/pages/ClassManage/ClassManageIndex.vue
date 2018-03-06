
<template>
  <div class="container">
    <class-nav
      :all="true"
      @classToggle="handleClassToggle($event)"
      @classnavLoaded="classNavLoaded($ev)"
      >
    </class-nav>
    <div class="class-manage-top clear">
      <div class="TH-card class-manage-top-search relative fl">
        <p class="fs-14 TH-f-c-fade">姓名搜索</p>
        <input @keyup.enter="handleDrop('name', null)" type="text" v-model="searchOption.name" class="cmts-input otl-none" placeholder="请输入学生姓名">
        <img @click="handleDrop('name', null)" class="cmts-icon absolute cp" src="~assets/imgs/classTask/search.png" alt="search">
      </div>
      <div class="TH-card class-manage-top-name fl">
        <p class="fs-14 TH-f-c-fade">姓名搜索</p>
        <ul class="class-manage-top-list">
          <li @click="chooseName(-1)" :class="{'TH-f-c-link fwb':wordActive==-1}" class="cmtl-item inline-block fs-14 TH-f-c-default cp">全部</li>
          <li @click="chooseName(name)" :class="{'TH-f-c-link fwb':wordActive==name}" class="cmtl-item inline-block fs-14 TH-f-c-default cp" v-for="name in wordList">{{name}}</li>
        </ul>
      </div>
    </div>
    <div class="class-manage-container relative">
      <div class="class-manage-list">

        <p class="class-manage-list-info fs-13 TH-f-c-default">
          <span :class="{'TH-f-c-link':searchOption.orderBy==1}" @click="handleDrop('order',1)" class="cmli-item cp">排名</span>
          <span :class="{'TH-f-c-link':searchOption.orderBy==2}" @click="handleDrop('order',2)" class="cmli-item cp">作品平均得分 </span>
        </p>
        <div class="class-manage-list-content" v-if="studentList==''">
          <div class="TF-temp-Arr-space" >
            <img src="~assets/imgs/codeZero/manage/no-students.png" alt="">
            <p class="fs-18 TH-f-c-default">还没有学生呢！</p>
          </div>
        </div>
        <div class="class-manage-list-content TH-card" v-if="studentList!=''">
          <div v-if="scoreHandleFlag" class="cmlc-control clear">
            <div class="cmlc-control-button fr">
              <p @click="confiormAssign()" class="inline-block TH-button-confirm">确定</p>
              <p @click="handleScore(false)" class="inline-block TH-button-cancel">取消</p>
            </div>
          </div>
          <ul v-if="studentList!=''" class="cmlc-control-list">
            <li v-for="(item, $index) in studentList" class="cmlc-control-list-item clear">
              <div class="cmlc-cli-left fl cp" @click="goToDetail(item)">
                <img class="cmlc-cli-left-head" :src="item.headimgurl" alt="head" onerror="this.src='static/imgs/common/student-default.png'">
              </div>
              <div class="cmlc-cli-right fl">
                <p class="cmlc-cli-right-name relative">
                  <span @click="goToDetail(item)" class="cmlc-cli-right-name-text cp inline-block fs-14 TH-f-c-link">{{item.username}}</span>
                  <img v-if="item.sex == 2" class="cmlc-cli-right-name-head relative" src="~assets/imgs/classManage/women.png" alt="men">
                  <img v-if="item.sex == 1" class="cmlc-cli-right-name-head relative" src="~assets/imgs/classManage/men.png" alt="men">
                </p>
                <div class="cmlc-cli-right-info">
                  <p class="cmlc-cli-right-info-item inline-block fs-14">
                    <span class="cmlc-cli-rii-label TH-f-c-default">作品完成率</span>
                    <span class="cmlc-cli-rii-value TH-f-c-link fwb">{{item.workCompletionRate}}%</span>
                  </p>
                  <p class="cmlc-cli-right-info-item inline-block fs-14">
                    <span class="cmlc-cli-rii-label TH-f-c-default">上传作品数</span>
                    <span class="cmlc-cli-rii-value TH-f-c-link fwb">{{item.worksAmount}}</span>
                  </p>
                  <p class="cmlc-cli-right-info-item inline-block fs-14">
                    <span class="cmlc-cli-rii-label TH-f-c-default">作品平均分</span>
                    <span class="cmlc-cli-rii-value TH-f-c-link fwb">{{item.workAvgScore}}</span>
                  </p>
                  <p class="cmlc-cli-right-info-item inline-block fs-14">
                    <span class="cmlc-cli-rii-label TH-f-c-default">班级优秀作品数</span>
                    <span class="cmlc-cli-rii-value TH-f-c-link fwb">{{item.classExcelWorkNumber}}</span>
                  </p>
                  <p class="cmlc-cli-right-info-item inline-block fs-14">
                    <span class="cmlc-cli-rii-label TH-f-c-default">平台优秀作品数</span>
                    <span class="cmlc-cli-rii-value TH-f-c-link fwb">{{item.platformExcelWorkNumber}}</span>
                  </p>
                  <p class="cmlc-cli-right-info-item inline-block fs-14">
                    <span class="cmlc-cli-rii-label TH-f-c-default">学生互评分数分差率</span>
                    <span class="cmlc-cli-rii-value TH-f-c-link fwb">{{item.mutualEvaluationDeviation}}%</span>
                  </p>
                  <p class="cmlc-cli-right-info-item inline-block fs-14">
                    <span class="cmlc-cli-rii-label TH-f-c-default">本期已分配积分</span>
                    <span class="cmlc-cli-rii-value TH-f-c-link fwb">{{item.semesterPoint}}</span>
                  </p>
                  <div v-if="scoreHandleFlag" class="cmlc-cli-right-info-score inline-block fs-14">
                    <input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" v-model="item.assignPoint" type="text" class="cmlc-cli-ris-input ta-c">
                    <span class="fs-14 TH-f-c-unit fwb">分</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="cmlc-control--pages" v-if="studentPages.total > 10">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="studentHandleCurrentChange"
              :current-page.sync="studentPages.current"
              :page-size="searchOption.rows"
              :page-sizes="[10, 20, 40]"
              layout="sizes, prev, pager, next"
              :total="studentPages.total">
            </el-pagination>
        </div>
        </div>
      </div>
      <div class="class-manage-winds absolute">
        <div class="TH-card class-manage-winds-top relative">
          <span class="block cmwt-label cmwt-label-top">班级积分</span>
          <span class="absolute cmwt-question cp fs-13 TH-f-c-default" @click="dialogVisible = true">
            <i>了解积分</i>
            <img src="~assets/imgs/classManage/question.png" alt="q" >
          </span>
          <p class="cmwt-value relative">{{totalPoints}}</p>
          <p @click="handleScore(true)" class="TH-button-primary cmwt-button cp">分配积分</p>
        </div>
        <div class="TH-card class-manage-winds-bottom relative">
          <span class="block cmwt-label cmwt-label-bottom">优秀学生</span>
          <span class="absolute cmwt-question cp fs-13 TH-f-c-link fwb" @click="$router.push({path: '/classManage/good', query: {id: searchOption.classId, idx: classIndex}})">
            <i>管理</i>
          </span>
          <div class="cmwt-good-container">
            <div class="cmwt-good">
              <p class="cmwt-good-label fs-16 TH-f-c-default">
                <img src="~assets/imgs/classManage/month.png" alt="month">
                <span class="cmwt-good-label-text">上月优秀标兵</span>
              </p>
              <div class="cmwt-good-list fs-16 TH-f-c-default fwb">
                <div v-if="excellStudents.month.length>0" v-for="i in excellStudents.month" class="inline-block cmwt-good-list-item">
                  <img class="cmwt-good-list-item-head" :src="i.headimgurl" onerror="this.src='static/imgs/common/student-default.png'" alt="head">
                  <p class="cmwt-gli-name fs-14 fwb">{{i.username}}</p>
                </div>
                <p v-if="excellStudents.month.length==0" class="TH-f-c-default fs-14 ta-c">
                  暂无数据
                </p>
              </div>
            </div>
            <div class="cmwt-good">
              <p class="cmwt-good-label fs-16 TH-f-c-default">
                <img src="~assets/imgs/classManage/semester.png" alt="semester">
                <span class="cmwt-good-label-text">上学期优秀标兵</span>
              </p>
              <div class="cmwt-good-list fs-16 TH-f-c-default fwb">
                <div v-if="excellStudents.semester.length>0" v-for="i in excellStudents.semester" class="inline-block cmwt-good-list-item">
                  <img class="cmwt-good-list-item-head" :src="i.headimgurl" onerror="this.src='static/imgs/common/student-default.png'" alt="head">
                  <p class="cmwt-gli-name fs-14 fwb">{{i.username}}</p>
                </div>
                <p v-if="excellStudents.semester.length==0" class="TH-f-c-default fs-14 ta-c">
                  暂无数据
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="了解积分"  :visible.sync="dialogVisible"  size="tiny" top="40%">
        <span>系统会定期自动奖励并分配一定积分至班级，老师可根据学生情况将积分分配至每个学生。</span>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible=false" class="TH-button-primary dialog-primary-button">知道了</el-button>
        </span>
     </el-dialog>
    </div>
  </div>
</template>

<script>
import classNav from '../../components/classNav.vue'
import { callLoading, callToast } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'

export default {
  name: 'ClassManageIndex',
  components: {
    'class-nav': classNav
  },
  data () {
    return {
      wordList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      wordActive: '-1',
      scoreHandleFlag: false,
      dialogVisible:false,
      studentPages: {
        total: 0,
        size: 16,
        current: 1,
      },
      classIndex: 0,
      searchOption: {
        orderBy: '1',
        firstChar: '',
        name: '',
        classId: '',
        page: 1,
        rows: 10
      },
      studentList: [],
      excellStudents: {
        month: [],
        semester: [],
      },
      totalPoints: 0,
    }
  },
  created () {
  },
  methods: {
    classNavLoaded(ev) {
      // callLoading.deactiveLoading()
      this.searchOption.classId = this.$store.classList[0].classId
      this.getStudents()
      this.getTotalPoints()
      this.getExcellentStudents()
      // this.getExcellentStudents()
    },
    handleClassToggle(cl) {
      console.log('class choosen is', cl)
      this.searchOption.classId = cl
      for (var i = 0; i < this.$store.classList.length; i++) {
        if (this.$store.classList[i].classId == cl) {
          this.classIndex = i
        }
      }
      this.getStudents()
      // this.getExcellentStudents().month()
      this.getExcellentStudents()
      this.getTotalPoints()
    },
    goMall() {
      window.open('/bc/static/mall/1.0.0/index.html/#/mallTemplate/index')
    },
    chooseName(p) {
      this.wordActive = p
      this.studentPages.current = 1
      this.searchOption.page = 1
      this.searchOption.firstChar = p==-1?'':p
      this.getStudents()
    },
    handleScore(type) {
      if (type == true) {
        this.scoreHandleFlag = true
        return
      }
      this.scoreHandleFlag = false
    },
    studentHandleCurrentChange(p) {
      this.searchOption.page = p
      this.getStudents()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.studentPages.current = 1
      this.getStudents()
    },
    getStudents() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.CLASS_TEACHER_STUDENT_LIST_ADDR, this.searchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            // this.studentList = res.body.data.list
            this.studentPages.total = +res.body.data.total
            this.studentList = res.body.data.list
            for (var i = 0; i < this.studentList.length; i++) {
              this.studentList[i].assignPoint = ''
            }
          }
          else {
            this.studentPages.total = 0
            this.studentList = []
          }
        }, (err) => {
          this.studentPages.total = 0
          this.studentList = []
          callLoading.deactiveLoading()
        })
    },
    handleDrop(type, val) {
      this.searchOption.page = 1
      this.studentPages.current = 1
      if (type == 'order') {
        this.searchOption.orderBy = val
      }
      else if (type == 'name') {

      }
      this.getStudents()
    },
    goToDetail(item) {
      this.$store.temp.clUser = item
      this.$router.push({path:'/classManage/student/task',query:{id:item.userId}})
    },
    getExcellentStudents() {
      this.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_STUDENT_NEW_ADDR, {
        classId: this.searchOption.classId
      })
      .then((res) => {
        if (res.body.code == 1) {
          this.excellStudents = res.body.data
        }
      })
    },
    getTotalPoints() {
      this.$http.post(ADDRESS.CLASS_TEACHER_POINT_TOTAL_ADDR, {
        classId: this.searchOption.classId
      })
      .then((res) => {
        if (res.body.code == 1) {
          this.totalPoints = res.body.data
        }
        else {
          this.totalPoints = 0
        }
      }, (err) => {
        this.totalPoints = 0
      })
    },
    confiormAssign() {
      callLoading.activeLoading()
      let tempAssign = {
        _ids: [],
        _values: [],
        totals: [],
      }
      for (var i = 0; i < this.studentList.length; i++) {
        if(this.studentList[i].assignPoint){
          tempAssign._ids.push(
            this.studentList[i].userId,
          )
          tempAssign._values.push(
            this.studentList[i].assignPoint?this.studentList[i].assignPoint:0
          )
        }
      }
      if(tempAssign._ids.length == 0) {
        callLoading.deactiveLoading()
        return
      }
      tempAssign.totals = _.object(tempAssign._ids, tempAssign._values)
      console.log(tempAssign.totals)
      this.$http.post(ADDRESS.CLASS_TEACHER_ASSIGN_POINT_ADDR, {
        studentPoint: JSON.stringify(tempAssign.totals),
        classId: this.searchOption.classId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          for (var i = 0; i < this.studentList.length; i++) {
            this.studentList[i].semesterPoint = +(this.studentList[i].semesterPoint) + (+this.studentList[i].assignPoint)
            this.studentList[i].assignPoint = ''
          }
          callToast('分配成功')
          // 分配积分Sum
          var sum = 0
          tempAssign._values.forEach(function(item){
            if(item!=''){
              sum += parseInt(item)
            }
          })
          this.totalPoints -= sum
          this.scoreHandleFlag=false
        }
        else {
          callToast(res.body.data, 'error')
          this.scoreHandleFlag=false
        }
      }, (err) => {
        callToast('分配失败', 'error')
        this.scoreHandleFlag=false
      })

    },
    checkNumber(ev, item) {
      console.log(ev, +item)
      if (+item === NaN) {
        item = ''
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 17rem;
  margin: 0 auto;
}

.class-manage-top {
  padding: .1rem .02rem;
}

.class-manage-top-search {
  width: 3rem;
  height: .6rem;
  padding: .1rem .2rem;
  margin-right: .55rem;
}

.cmts-input {
  height: .4rem;
  width: 3rem;
  border-bottom: 1px solid #ddd;
}

.cmts-icon {
  width: .22rem;
  right: .2rem;
  top: .4rem;
}

.class-manage-top-name {
  width: 9.35rem;
  height: .6rem;
  padding: .1rem 0 .1rem .2rem;
}

.class-manage-top-list {
  margin-top: .2rem;
}

.cmtl-item {
  margin-right: .2rem;
}

.class-manage-list {
  margin-top: .45rem;
}

.class-manage-list-info {
  margin-bottom: .1rem;
}

.cmli-item {
  margin-right: .15rem;
}

.class-manage-list-content {
  width: 13.5rem;
  min-height: 7rem;
  margin-bottom: .5rem;
}

.cmlc-control {
  height: .6rem;
  border-bottom: 1px solid #ddd;
}

.cmlc-control-button {
  margin: .12rem .12rem 0 0;
}

.cmlc-control-button p {
  margin-left: .25rem;
}

.cmlc-control-list {
  width: 12.9rem;
  margin: 0 auto;
}

.cmlc-control-list-item {
  padding: .2rem 0;
  border-bottom: 1px solid #ddd;
}

.cmlc-cli-left {
  width: .65rem;
}

.cmlc-cli-left-head {
  border-radius: 50%;
  width: .5rem;
  height: .5rem;
}

.cmlc-cli-right {
  width: 12rem;
}

.cmlc-cli-right-info {
  font-size: 0;
}

.cmlc-cli-right-info-item {
  min-width: 1.1rem;
  margin-right: .2rem;
  margin-bottom: .1rem;
}

@media screen and (max-width: 1366px) {
  .cmlc-cli-right-info-item {
    margin-right: .1rem;
  }
}

.cmlc-cli-right-name {
  margin: .05rem 0 .25rem 0;
}

.class-manage-winds {
  right: 0;
  top: .25rem;
}

.class-manage-winds-top {
  width: 3.2rem;
  height: 2.3rem;
  margin-bottom: .3rem;
}

.class-manage-winds-bottom {
  width: 3.2rem;
  min-height: 4rem;
}

.cmwt-label {
  width: .9rem;
  height: .35rem;
  color: #fff;
  font-size: .18rem;
  line-height: .35rem;
  text-align: center;
  top: .2rem;
  left: -.1rem;
  position: absolute;
}

.cmwt-label-top {
  background: #4fb033;
}

.cmwt-label-top::before {
  content: '';
  width: 0;
  height: 0;
  border-width: .1rem .1rem;
  bottom: -.1rem;
  border-style: solid;
  border-color: #4fb033 transparent transparent transparent;
  left: -.1rem;
  position: absolute;
  transform: rotate(90deg);
}

.cmwt-label-bottom {
  background: #ee4e4e;
}

.cmwt-label-bottom::before {
  content: '';
  width: 0;
  height: 0;
  border-width: .1rem .1rem;
  bottom: -.1rem;
  border-style: solid;
  border-color: #ee4e4e transparent transparent transparent;
  left: -.1rem;
  position: absolute;
  transform: rotate(90deg);
}

.cmwt-value {
  font-size: .5rem;
  font-weight: bold;
  text-align: center;
  color: #fd8900;
  top: .8rem;
}

.cmwt-button {
  margin: 1.2rem auto 0 auto;
  width: 1.2rem;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  border-radius: 40px;
  position: relative;
}

.cmwt-question {
  right: .1rem;
  top: .25rem;
  z-index: 2;
}

.cmwt-question img {
  position: relative;
  top: .02rem;
}

.cmwt-good-container {
  position: relative;
  padding: .5rem .2rem 0 .2rem;
  margin: 0 auto;
}

.cmwt-good {
  margin-top: .25rem;
}

.cmwt-good-list {
  margin-top: .2rem;
  min-height: .5rem;
}

.cmwt-good-list-item {
  width: 33.3%;
  text-align: center;
}

.cmwt-good-list-item-head {
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
}

.cmwt-gli-name {
  margin-top: .1rem;
}

.cmwt-good-label-text {
  position: relative;
  top: -.05rem;
}

.cmlc-cli-right-info-score {

}

.cmlc-cli-ris-input {
  width: .78rem;
  height: .38rem;
  border: 1px solid #ddd;
}

.cmlc-cli-right-name-head {
  margin-left: .2rem;
  top: .02rem;
}

.cmlc-control--pages {
  margin-top: .25rem;
  padding-bottom: .25rem;
}

.cmlc-cli-right-name-text {
  min-width: .5rem;
}

.TF-temp-Arr-space{
  margin:0 auto;
}

.TF-temp-Arr-space img{
  margin-top:1.2rem;
  margin-bottom: .35rem;
  width: 2.24rem;
  height: 2.52rem;
}
.el-dialog__footer{
  text-align: center;
}
</style>
