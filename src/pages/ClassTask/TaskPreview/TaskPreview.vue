<template>
  <div class="task-preview-container TH-f-c-default">
      <div class="task-preview-content clear">
          <div class="left-white-content fl">
              <p class="fs-20 fwb">第一课——玩转家庭相册</p>
              <ul>
                  <li class="common-img-text-middle-left">
                      <img src="~assets/imgs/classTask/activity.png" alt="活动">
                      <span>活动：拍摄调整照片</span>
                  </li>
                  <li class="common-img-text-middle-left">
                      <img src="~assets/imgs/classTask/class.png" alt="班级">
                      <span>班级：七年级一班、七年级二班、七年级三班、七年级四班</span>
                  </li>
                  <li class="common-img-text-middle-left">
                      <img src="~assets/imgs/classTask/time.png" alt="时间">
                      <span>时间：2017-07-01   15:30   至   2017-07-06 15:30</span>
                  </li>
              </ul>
          </div>
      </div>
      <div class="task-preview-content relative">
        <div class="left-white-content">
            <div class="task-added-resource-title common-img-text-middle-left">
                <img src="~assets/imgs/classTask/prepare.png" alt="学习准备">
                <span class="fs-18">学习准备：</span>
            </div>
            <div class="task-added-resource-content"></div>
        </div>
        <div class="right-dark-content absolute">
            <div class="TH-button-primary cp inline-block">开始测试</div>
            <ul class="task-paper-lists TH-card">
                <li class="inline-block tof" v-for="(i,index) in 3" :key="index">探索探索探索探索动画奥秘练习题{{i}}</li>
            </ul>
        </div>
      </div>
      <div class="task-preview-content relative">
        <div class="left-white-content">
            <div class="task-added-resource-title common-img-text-middle-left">
                <img src="~assets/imgs/classTask/guide.png" alt="学习准备">
                <span class="fs-18">新课引导：</span>
            </div>
            <div class="task-added-resource-content"></div>
        </div>
      </div>
      <div class="task-preview-content relative">
          <div class="left-white-content">
            <div class="task-added-resource-title common-img-text-middle-left">
                <img src="~assets/imgs/classTask/goal.png" alt="学习准备">
                <span class="fs-18">学习目标：</span>
            </div>
            <div class="task-added-resource-content"></div>
          </div>
      </div>
      <div class="task-preview-content relative">
        <div class="left-white-content">
            <div class="task-added-resource-title common-img-text-middle-left">
                 <img src="~assets/imgs/classTask/task.png" alt="学习准备">
                 <span class="fs-18">学习任务：</span>
            </div>
            <div class="task-added-resource-content"></div>
        </div>
        <div class="right-dark-content absolute">
            <div class="TH-button-primary cp inline-block">开始测试</div>
            <ul class="task-paper-lists TH-card">
                <li class="inline-block tof" v-for="(i,index) in 3" :key="index">探索动画奥秘练习题{{i}}</li>
            </ul>
        </div>
      </div>
      <div class="task-preview-content relative">
          <div class="left-white-content">
            <div class="task-added-resource-title common-img-text-middle-left">
                 <img src="~assets/imgs/classTask/feedback.png" alt="学习准备">
                 <span class="fs-18">反馈小结：</span>
            </div>
            <div class="task-added-resource-content"></div>
          </div>
      </div>
      <div class="task-preview-content relative">
        <div class="left-white-content">
            <div class="task-added-resource-title common-img-text-middle-left">
                 <img src="~assets/imgs/classTask/outclass.png" alt="学习准备">
                 <span class="fs-18">课外延伸：</span>
            </div>
            <div class="task-added-resource-content"></div>
        </div>
        <div class="right-dark-content absolute">
            <div class="TH-button-primary cp inline-block">开始测试</div>
            <ul class="task-paper-lists TH-card">
                <li class="inline-block tof" v-for="(i,index) in 3" :key="index">探索动画奥秘练习题{{i}}</li>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'TaskPreview',
    data(){
        return{
        }
    },
    methods:{

    }
}
</script>

<style src="./style.css" @scoped>

</style>

