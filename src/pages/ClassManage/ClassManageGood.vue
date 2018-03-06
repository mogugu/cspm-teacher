
<template>
  <div class="container">
    <class-nav
      :all="true"
      :activeFlag="classActiveFlag"
      @classToggle="handleClassToggle($event)"
      @classnavLoaded="classNavLoaded($ev)"
      >
    </class-nav>
    <!-- 勋章 -->
    <div class="clear student-month-half-good">
      <div class="fl managementClassGoodStudent">
        <p class="cmwt-good-label fs-16 TH-f-c-default">
          <img src="~assets/imgs/classManage/month.png" alt="month">
          <span class="cmwt-good-label-text">上月优秀标兵</span>
        </p>
        <div class="cmwt-good-list fs-16 TH-f-c-default fwb">
          <div v-if="excellStudents.month.length > 0" v-for="(i,index) in excellStudents.month" class="inline-block cmwt-good-list-item" :class="{'month-good':index!=2}">
            <img class="cmwt-good-list-item-head" :src="i.headimgurl" onerror="this.src='static/imgs/common/student-default.png'" alt="head">
            <p class="cmwt-gli-name fs-14 fwb">{{i.username}}</p>
            <span class="inline-block exchange-good-stu fs-14" @click="getStudentList(i, index, 0)">替换</span>
          </div>
          <p class="TH-f-c-default fs-14" v-if="excellStudents.month.length == 0">暂无数据</p>
        </div>
      </div>
      <div class="fl managementClassGoodStudent">
        <p class="cmwt-good-label fs-16 TH-f-c-default">
          <img src="~assets/imgs/classManage/semester.png" alt="semester">
          <span class="cmwt-good-label-text">上学期优秀标兵</span>
        </p>
        <div class="cmwt-good-list fs-16 TH-f-c-default fwb">
          <div v-if="excellStudents.semester.length > 0" v-for="(i,index) in excellStudents.semester" class="inline-block cmwt-good-list-item" :class="{'month-good':index!=2}">
            <img class="cmwt-good-list-item-head" :src="i.headimgurl" onerror="this.src='static/imgs/common/student-default.png'" alt="head">
            <p class="cmwt-gli-name fs-14 fwb">{{i.username}}</p>
            <span class="inline-block exchange-good-stu fs-14" @click="getStudentList(i, index, 1)">替换</span>
          </div>
          <p class="TH-f-c-default fs-14" v-if="excellStudents.semester.length == 0">暂无数据</p>
        </div>
      </div>
    </div>
    <!-- 历史优秀 -->
    <div class="history-students-good-list">
        <p class="fs-22">历史优秀标兵</p>
        <div class="clear">
          <div class="fl relative students-good-all-list right-width">
              <span class="inline-block month-color fs-14">月优秀</span>
              <p v-if="excellStudents.month_his.length == 0" class="TH-f-c-default fs-16">暂无数据</p>
              <div class="TH-scroll">
                <div v-if="excellStudents.month_his.length > 0" class="fs-18" v-for="itemA in excellStudents.month_his">
                  <p class="TH-f-c-link fs-14">{{itemA.year+'年'+itemA.month}}月：</p>
                  <p class="inline-block TH-f-c-default fs-16">{{itemA.username}}</p>
                </div>
              </div>
          </div>
          <div class="fl relative students-good-all-list">
              <span class="inline-block half-color fs-14">学期优秀</span>
              <p v-if="excellStudents.semester_his.length == 0" class="TH-f-c-default fs-16">暂无数据</p>
              <div class="TH-scroll">
                <div v-if="excellStudents.semester_his.length > 0" class="fs-18" v-for="itemA in excellStudents.semester_his">
                  <p class="TH-f-c-link fs-14">{{itemA.year+'年'+itemA.semester}}：</p>
                  <p class="inline-block TH-f-c-default fs-16">{{itemA.username}}</p>
                </div>
              </div>
          </div>
        </div>
    </div>
    <el-dialog title="替换学生" :visible.sync="dialogFormVisible" custom-class="dialog-edit-grade">
        <ul class="fs-14 all-class-student-list clear">
            <li @click="tempExcellentStudent.newUserId = i.userId,tempExcellentStudent.newUser=i" class="fl" v-for="(i,index) in tempStudents" :class="{'active-student': tempExcellentStudent.newUserId == i.userId}">{{i.username}}</li>
        </ul>
         <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStudent()">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import classNav from '../../components/classNav.vue'
import { callLoading, callToast } from '../../helpers/helper'
import { ADDRESS } from '../../helpers/address'

export default {
  name: 'ClassManageGood',
  components: {
    'class-nav': classNav
  },
  data () {
    return {
      excellStudents: {
        month: [],
        semester: [],
        month_his: [],
        semester_his: [],
      },
      classList: [
        {
          id:0,
          name:'全部',
        },
        {
          id:1,
          name:'七年级一班',
        },
        {
          id:2,
          name:'七年级二班',
        },
        {
          id:3,
          name:'七年级三班',
        },
        {
          id:4,
          name:'七年级四班',
        },
        {
          id:5,
          name:'七年级五班',
        },
        {
          id:6,
          name:'七年级六班',
        },
        {
          id:7,
          name:'七年级七班',
        },
        {
          id:8,
          name:'七年级八班',
        },
        {
          id:9,
          name:'七年级九班',
        },
        {
          id:10,
          name:'七年级十班',
        },
        {
          id:11,
          name:'七年级十一班',
        },
        {
          id:12,
          name:'七年级十二班',
        },
        {
          id:13,
          name:'七年级十三班',
        }
        ,
        {
          id:14,
          name:'七年级十四班',
        },
      ],
      dialogFormVisible:false,
      searchOption: {
        classId: '',
        type: 1,
      },
      classActiveFlag: 0,
      tempStudents: [],
      tempExcellentStudent: {
        oldUser: {},
        newUser: {},
        index: 0,
        oldUserId: '',
        newUserId: ''
      },
    }
  },
  created () {
    this.getExcellentStudents
    this.classActiveFlag = this.$route.query.idx
  },
  methods: {
    classNavLoaded(ev) {
      // callLoading.deactiveLoading()
      callLoading.activeLoading()
      this.searchOption.classId = this.$route.query.id
      // this.searchOption.classId = this.$store.classList[0].classId
      this.getExcellentStudents()
    },
    handleClassToggle(cl) {
      callLoading.activeLoading()
      console.log('class choosen is', cl)
      this.searchOption.classId = cl
      this.getExcellentStudents()
    },
    exChange(type, i, index){
      this.tempExcellentStudent.index = index
      this.dialogFormVisible = true
      this.tempExcellentStudent.oldUser = i
      this.tempExcellentStudent.oldUserId = i.userId
      this.getExcellListStudents(type)
    },
    submitChange() {
      // this.tempExcellentStudent.oldUser = this.tempExcellentStudent.newUser
      // if (this.searchOption.type == 2) {
      //   this.excellStudents.month[0].students.splice(this.tempExcellentStudent.index, 1 , this.tempExcellentStudent.newUser)
      // }
      // else if (this.searchOption.type == 1) {
      //   this.excellStudents.seme[0].students.splice(this.tempExcellentStudent.index, 1 , this.tempExcellentStudent.newUser)
      // }
      // return
      callLoading.activeLoading()
      this.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_TOGGLE_STUDENT_ADDR, {
        type: this.searchOption.type,
        oldUserId: this.tempExcellentStudent.oldUserId,
        newUserId: this.tempExcellentStudent.newUserId,
        classId: this.searchOption.classId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if(res.body.code == 1) {
          callToast('修改成功')
          this.dialogFormVisible = false
          this.tempExcellentStudent.oldUser = this.tempExcellentStudent.newUser
          if (this.searchOption.type == 2) {
            this.excellStudents.month[0].students.splice(this.tempExcellentStudent.index, 1, this.tempExcellentStudent.newUser)
          }
          else if (this.searchOption.type == 1) {
            this.excellStudents.seme[0].students.splice(this.tempExcellentStudent.index, 1, this.tempExcellentStudent.newUser)
          }
        }
        else {
          callToast('修改失败', 'error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('修改失败', 'error')
      })
    },
    getExcellListStudents(type) {
      callLoading.activeLoading()
      this.searchOption.type = type
      this.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_LIST_STUDENT_ADDR, this.searchOption)
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            this.tempStudents = res.body.data
          }
          else {
            this.tempStudents = []
            callToast('获取班级学生失败', 'error')
          }
        }, (err) => {
          callLoading.deactiveLoading()
          this.tempStudents = []
          callToast('获取班级学生失败', 'error')
        })
    },
    getExcellentStudents() {
      this.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_STUDENT_NEW_ADDR, {
        classId: this.searchOption.classId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.excellStudents = res.body.data
        }
      })
      // let self = this
      // return {
      //   month() {
      //     self.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_STUDENT_ADDR, {
      //       classId: self.searchOption.classId,
      //       semesterFlag: true,
      //       historyFlag: false
      //     })
      //     .then((res) => {
      //       if (res.body.code == 1) {
      //         self.excellStudents.month = res.body.data
      //       }
      //       else {
      //         self.excellStudents.month = [
      //           {
      //             students: []
      //           }
      //         ]
      //       }
      //     }, (err) => {
      //       self.excellStudents.month = [
      //         {
      //           students: []
      //         }
      //       ]
      //       console.log(err)
      //     })
      //   },
      //   seme() {
      //     self.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_STUDENT_ADDR, {
      //       classId: self.searchOption.classId,
      //       semesterFlag: false,
      //       historyFlag: false
      //     })
      //     .then((res) => {
      //       if (res.body.code == 1) {
      //         self.excellStudents.seme = res.body.data
      //       }
      //       else {
      //         self.excellStudents.seme = [
      //           {
      //             students: []
      //           }
      //         ]
      //       }
      //     }, (err) => {
      //       self.excellStudents.seme = [
      //         {
      //           students: []
      //         }
      //       ]
      //       console.log(err)
      //     })
      //   },
      //   historyMonth() {
      //     self.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_STUDENT_ADDR, {
      //       classId: self.searchOption.classId,
      //       semesterFlag: true,
      //       historyFlag: true
      //     })
      //     .then((res) => {
      //       callLoading.deactiveLoading()
      //       if (res.body.code == 1) {
      //         self.excellStudents.historyMonth = res.body.data
      //       }
      //       else {
      //         self.excellStudents.historyMonth = []
      //       }
      //     }, (err) => {
      //       callLoading.deactiveLoading()
      //       self.excellStudents.historyMonth = []
      //       console.log(err)
      //     })
      //   },
      //   historySeme() {
      //     self.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_STUDENT_ADDR, {
      //       classId: self.searchOption.classId,
      //       semesterFlag: false,
      //       historyFlag: true
      //     })
      //     .then((res) => {
      //       callLoading.deactiveLoading()
      //       if (res.body.code == 1) {
      //         self.excellStudents.historySeme = res.body.data
      //       }
      //       else {
      //         self.excellStudents.historySeme = []
      //       }
      //     }, (err) => {
      //       callLoading.deactiveLoading()
      //       self.excellStudents.historySeme = []
      //       console.log(err)
      //     })
      //   },
      // }
    },
    getStudentList(user, idx, type) {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_LIST_STUDENT_NEW_ADDR, {
        excellentId: user.id
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.dialogFormVisible = true
          this.tempStudents = res.body.data
          this.tempStudents.excellentId = user.id
          this.tempExcellentStudent.index = idx
          // this.tempExcellentStudent.new
          this.searchOption.type = type
        }
        else {
          callToast('暂无学生可替换', 'warning')
        }
      }, (err) => {
        callLoading.deactiveLoading()
      })
    },
    updateStudent() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.CLASS_TEACHER_EXCELLENT_TOGGLE_STUDENT_NEW_ADDR, {
        excellentId: this.tempStudents.excellentId,
        rankId: this.tempExcellentStudent.newUser.id
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.tempExcellentStudent.newUser.id = res.body.data.id
          if (this.searchOption.type == 0) {
            this.excellStudents.month.splice(this.tempExcellentStudent.index,1,this.tempExcellentStudent.newUser)
          }
          else {
            this.excellStudents.semester.splice(this.tempExcellentStudent.index,1,this.tempExcellentStudent.newUser)
          }
          this.dialogFormVisible = false
          this.tempStudents = []
        }
        else {
          callToast('出现错误', 'error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('出现错误', 'error')
      })
    }
  }
}
</script>

<style scoped>
.container{
  width: 17rem;
  margin:0 auto;
}

.managementClassGoodStudent{
  min-width: 2.5rem;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  background-color: rgba(255,255,255,.8);
  -webkit-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  -moz-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  padding: .2rem .4rem .2rem .2rem;
  margin-right: .5rem;
}

.managementClassGoodStudent p.fs-16 img{
  vertical-align: sub;
  width: .21rem;
  height: .26rem;
}

div.clear.student-month-half-good{
  padding-bottom: .6rem;
}

.TH-f-c-default{
  color : #535353;
}

.cmwt-good-list{
  margin-left: .26rem;
  margin-top: .2rem;
}

.cmwt-good-list-item{
  text-align: center;
}

.cmwt-good-list-item.month-good{
  margin-right: .9rem;
}

.cmwt-good-list .cmwt-good-list-item p{
  margin-top: .1rem;
  margin-bottom: .2rem;
}

span.inline-block.exchange-good-stu{
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #37c796, #08af95);
  padding: .1rem .2rem;
  color: #fff;
  border-radius: .2rem;
  font-weight: normal;
  cursor: pointer;
}

span.inline-block.exchange-good-stu:hover{
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: linear-gradient(to top, #47d4a4, #0bc0a4);
}

.history-students-good-list p.fs-22{
  padding-left: .1rem;
}

.history-students-good-list div.students-good-all-list{
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  background-color: rgba(255,255,255,.8);
  -webkit-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  -moz-box-shadow: 0 2px 5px rgba(2,22,37,.3);
  box-shadow: 0 2px 5px rgba(2,22,37,.3);
  width: 7.8rem;
  height: 2rem;
  padding: .4rem .2rem .2rem .2rem;
  margin:.1rem 0 .1rem .1rem;
}

.history-students-good-list div.students-good-all-list .TH-scroll {
  overflow-y: auto;
  height: 2rem;
}

.right-width{
  margin-right: .3rem !important;
}

.history-students-good-list div.students-good-all-list span{
  padding: 0 .1rem;
  height: .24rem;
  color: #fff;
  font-size: .14rem;
  line-height: .24rem;
  text-align: center;
  top: .1rem;
  left: -.1rem;
  position: absolute;
}

.history-students-good-list div.students-good-all-list span::before {
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

.month-color{
  background-color: #4fb033;
}

.half-color{
  background-color: #ee4e4e;
}

.history-students-good-list div.students-good-all-list span.half-color::before{
  border-color: #ee4e4e transparent transparent transparent;
}

.students-good-all-list div.fs-18{
  line-height: .3rem;
  margin-top: .1rem;
}

.all-class-student-list{
  margin:.2rem .15rem 0 .15rem;
}

.all-class-student-list li.fl{
  padding: 0 .15rem;
  border-radius: .15rem;
  line-height: .24rem;
  border: 1px solid #ddd;
  margin-right: .2rem;
  margin-bottom: .2rem;
  cursor: pointer;
}

.default-student{
  background-color: #e7e7e7;
  cursor:default;
}

.active-student{
  color: #3283d3;
  border:1px solid #3283d3 !important;
}

.cmwt-good-list-item-head {
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
}

</style>
