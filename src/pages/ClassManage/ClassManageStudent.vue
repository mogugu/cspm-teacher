
<template>
  <div class="container">
    <div class="TH-card cm-student-top">
      <div class="cm-student-top-content clear">
        <div class="cm-stc-user inline-block fl clear">
          <img class="cm-stc-user-head fl" :src="$store.temp.clUser.headimgurl" alt="head" onerror="this.src='static/imgs/common/student-default.png'">
          <span class="cm-stc-user-name TH-f-c-default fs-18 fl">{{$store.temp.clUser.username}}</span>
          <img v-if="$store.temp.clUser.sex == 1" class="cm-stc-user-sex fl" src="~assets/imgs/classManage/men.png" alt="sex">
          <img v-if="$store.temp.clUser.sex == 2" class="cm-stc-user-sex fl" src="~assets/imgs/classManage/women.png" alt="sex">
        </div>
        <div class="cm-stc-info inline-block fl">
          <span class="cm-stc-info-item fs-14 TH-f-c-default">作品完成率： <i class="fwb TH-f-c-link">{{$store.temp.clUser.workCompletionRate}}%</i>   </span>
          <span class="cm-stc-info-item fs-14 TH-f-c-default">上传作品数： <i class="fwb TH-f-c-link">{{$store.temp.clUser.worksAmount}}</i>   </span>
          <span class="cm-stc-info-item fs-14 TH-f-c-default">作品平均分： <i class="fwb TH-f-c-link">{{$store.temp.clUser.workAvgScore}}</i>   </span>
          <span class="cm-stc-info-item fs-14 TH-f-c-default">班级优秀作品数： <i class="fwb TH-f-c-link">{{$store.temp.clUser.classExcelWorkNumber}}</i>   </span>
          <span class="cm-stc-info-item fs-14 TH-f-c-default">平台优秀作品数： <i class="fwb TH-f-c-link">{{$store.temp.clUser.platformExcelWorkNumber}}</i>   </span>
          <span class="cm-stc-info-item fs-14 TH-f-c-default">学生互评分数分差率： <i class="fwb TH-f-c-link">{{$store.temp.clUser.mutualEvaluationDeviation}}%</i>   </span>
          <span class="cm-stc-info-item fs-14 TH-f-c-default">本期已分配积分： <i class="fwb TH-f-c-link">{{$store.temp.clUser.semesterPoint}}</i>   </span>
        </div>
        <!-- <div class="cm-stc-good fr">
            <span class="cm-stc-good-text fs-14 TH-f-c-default">本学期荣誉：</span>
            <img class="cm-stc-good-icon" src="~assets/imgs/classManage/week.png" alt="week">
            <span class="cm-stc-good-text fs-14 TH-f-c-link">×2</span>
        </div> -->
      </div>
    </div>
    <ul class="source-nav">
      <li @click="$router.push({path:'/classManage/student/task',query:{id:$route.query.id}})" :class="{'source-nav-item-active': $route.path.split('/')[3] == 'task'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">任务完成情况</li>
      <li @click="$router.push({path:'/classManage/student/rateTest',query:{id:$route.query.id}})" :class="{'source-nav-item-active': $route.path.split('/')[3] == 'rateTest'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">测试正确率排名趋势</li>
      <li @click="$router.push({path:'/classManage/student/rateWork',query:{id:$route.query.id}})" :class="{'source-nav-item-active': $route.path.split('/')[3] == 'rateWork'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">作品得分排名趋势</li>
      <li @click="$router.push({path:'/classManage/student/rateFinal',query:{id:$route.query.id}})" :class="{'source-nav-item-active': $route.path.split('/')[3] == 'rateFinal'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">最终得分排名趋势</li>
      <li @click="$router.push({path:'/classManage/student/history',query:{id:$route.query.id}})" :class="{'source-nav-item-active': $route.path.split('/')[3] == 'history'}" class="source-nav-item inline-block fs-22 fwb TH-f-c-fade cp">历史作品</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { ADDRESS } from '../../helpers/address'
import { callLoading } from '../../helpers/helper'
export default {
  name: 'ClassManageStudent',
  data () {
    return {
      clUser: {}
    }
  },
  created () {
    this.studentId = this.$route.query.id || null
    this.getClUser()
  },
  methods: {
    getClUser() {
      if (this.$store.temp.clUser.userId) {
        return
      }
      callLoading.activeLoading()
      this.$http.post(ADDRESS.CLASS_TEACHER_STUDENT_TASK_GENERAL_ADDR, {
        studentId: this.studentId,
        disciplineCode: 10
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if(res.body.code == 1) {
          this.$store.temp.clUser = res.body.data
        }
        else {

        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.container{
  width:17rem;
  margin:0 auto;
}

.cm-student-top {
  width: 17rem;
  height: 1.1rem;
  margin: 0 auto .5rem auto;
}

.source-nav {
  margin-bottom: .4rem;
}

.source-nav-item {
  margin-right: .4rem;
}

.source-nav-item-active {
  font-size: .32rem;
  color: #535353;
}

.cm-student-top-content {
  width: 16.4rem;
  height: .4rem;
  position: relative;
  top: .35rem;
  margin: 0 auto;
}

.cm-stc-user {
  line-height: .4rem;
  height: .4rem;
  margin-right: .55rem;
}

.cm-stc-user-head {
  width: .4rem;
  height: .4rem;
  margin-right: .25rem;
  border-radius: 50%;
}

.cm-stc-user-name {
  margin-right: .1rem;
}

.cm-stc-user-sex {
  width: .13rem;
  margin-top: .1rem;
}

.cm-stc-info {
  line-height: .4rem;
}

.cm-stc-good {
  line-height: .4rem;
}

.cm-stc-info-item {
  margin-right: .25rem;
}

.cm-stc-good {
  margin-right: .5rem;
}

.cm-stc-good-icon {
  width: .21rem;
  vertical-align: middle;
}

</style>
