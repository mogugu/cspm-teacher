
<template>
  <div class="container relative" id="container">
    <!-- 初始形态 task publish > first step -->
    <div class="publish-classTask-first card-shadow fs-16" :class="{ 'animate-class-left': task.animate_,'animate-class-right': task.animate_right}" id="TaskPublish">
        <ul>
          <li>
            <p :class="{'title-color':task.animate_}">任务名：<span v-show="!task.animate_" class="fs-13 fr">不超过50字</span></p>
            <input v-show="!task.animate_end" :class="{ 'animate-class-left-input': task.animate_}" class="fs-16" type="text" maxlength="50" v-model="task.name" onfocus="this.style.border='1px solid #3283d3'"  onblur="this.style.border='1px solid #ddd'"/>
            <div class="left-show-animation-div" v-show="task.animate_end">
              <span class="inline-block">{{task.name | truncate(20, '...')}}</span>
            </div>
          </li>
          <li>
            <p :class="{'title-color':task.animate_}">活<em></em>动：</p>
            <el-autocomplete
              v-show="!task.animate_end"
              v-model="task.action"
              :fetch-suggestions="querySearchAsync"
              placeholder=""
              @select="handleSelectAction"
            >
            </el-autocomplete>
            <div class="left-show-animation-div" v-show="task.animate_end">
              <span class="inline-block">{{task.action | truncate(20, '...')}}</span>
            </div>
          </li>
          <li>
            <p :class="{'title-color':task.animate_}">前导任务：<!-- <span class="fs-13">学花开始本任务之前就应完成的任务。若无，则不用选择</span> --></p>
            <el-autocomplete
              v-show="!task.animate_end"
              v-model="task.beforeTask"
              :fetch-suggestions="querySearchAsyncBeforeTask"
              placeholder=""
              @select="handleSelect"
            >
            </el-autocomplete>
            <div class="left-show-animation-div" v-show="task.animate_end">
              <span class="inline-block">{{task.beforeTask | truncate(20, '...')}}</span>
            </div>
          </li>
          <li>
            <p :class="{'title-color':task.animate_}">班<em></em>级：</p>
            <div class="class-all-list" v-show="!task.animate_end">
              <span class="inline-block select-class fs-14" @click="selectClass">
               选择班级
               <i class="el-icon-plus"></i>
              </span>
              <span v-if="index!='全部'" v-show="checkedAllClasses!=''" class="classes-added-push inline-block fs-13" v-for="(index,_index) in checkedAllClasses" v-bind:class="{'class-margin':(_index>3)}">
                  {{index}}
                  <i class="el-icon-close" @click="deleteClass(_index)"></i>
              </span>
            </div>
             <div class="left-show-animation-div" v-show="task.animate_end" >
              <span v-if="_index!=0" v-for="(index,_index) in classesListArr" class="inline-block class-list">{{index.className}}</span>
            </div>
          </li>
          <li>
            <p :class="{'title-color':task.animate_}">任务时间：</p>
            <el-date-picker
                v-show="!task.animate_end"
                v-model="task.startTime"
                type="datetime"
                @change="taskSartTime"
                placeholder="" format="yyyy-MM-dd HH:mm">
            </el-date-picker>
            <span v-show="!task.animate_end" class="inline-block" style="margin:0 .1rem">至</span>
            <el-date-picker
                v-show="!task.animate_end"
                v-model="task.endtime"
                type="datetime"
                @change="taskEndTime"
                placeholder="" format="yyyy-MM-dd HH:mm">
            </el-date-picker>
             <div class="left-show-animation-div" v-show="task.animate_end"  >
              <span class="inline-block class-list">{{task.startTime}}</span>
              至
              <span class="inline-block class-list">{{task.endtime}}</span>
            </div>
          </li>
        </ul>
        <!-- 下一步 -->
        <input v-show="!task.animate_end" type="button" value="下一步" class="button-default fs-16" @click="nextStep">
    </div>
    <!-- 选择模板 -->
    <div class="publish-classTask-first publish-task-second" :class="{'opacity-change':task.animate_model,'opacity-change-end':task.animate_model_end}">
      <div class="publish-add-resource">
        <span class="inline-block select-class fs-14 model-resource-button" @click="secondStep(1)">
         <i class="el-icon-plus fs-14"></i>
         视频
        </span>
        <span class="inline-block select-class fs-14 model-resource-button" @click="secondStep(2)">
         <i class="el-icon-plus fs-14"></i>
         试卷
        </span>
        <span class="inline-block select-class fs-14 model-resource-button" @click="secondStep(3)">
         <i class="el-icon-plus fs-14"></i>
         附件
        </span>
        <span class="inline-block select-class fs-14 model-resource-button" @click="secondStep(4)">
         <i class="el-icon-plus fs-14"></i>
         作品
        </span>
      </div>
      <div class="select-now-model reletive" >
          <div class="use-added-model" @click="addModel">
            <img src="~assets/imgs/classTask/choose-template.png" alt="choose-template.png">
            <p class="fs-16">请先选择模板</p>
          </div>
          <input type="button" value="上一步" class="button-default fs-16" @click="preStep">
      </div>
    </div>
    <!-- 第二步 -->
    <div class="publish-classTask-first publish-task-second add-more-resource" ref="model" v-show="task.animate_model_sec"  :class="{'opacity-change':task.animate_model_sec}">
      <div class="publish-add-resource">
        <!-- need Added -->
        <span class="inline-block select-class fs-14 model-resource-button"
         v-if="!resource.video" @click="addResource(1)">
         <i class="el-icon-plus fs-14"></i>
         视频
        </span>
        <span class="inline-block select-class fs-14 resourceAdded" v-if="resource.video">
         <i class="el-icon-plus fs-14"></i>
         视频
        </span>
        <span class="inline-block select-class fs-14 model-resource-button"
        v-if="!resource.paper" @click="addResource(2)">
         <i class="el-icon-plus fs-14"></i>
         试卷
        </span>
        <span class="inline-block select-class fs-14 resourceAdded" v-if="resource.paper">
         <i class="el-icon-plus fs-14"></i>
         试卷
        </span>
        <span class="inline-block select-class fs-14 model-resource-button"
        v-if="!resource.attachment" @click="addResource(3)">
         <i class="el-icon-plus fs-14"></i>
         附件
        </span>
        <span class="inline-block select-class fs-14 resourceAdded" v-if="resource.attachment">
         <i class="el-icon-plus fs-14"></i>
         附件
        </span>
        <span class="inline-block select-class fs-14 model-resource-button"
        v-if="!resource.production" @click="addResource(4)">
         <i class="el-icon-plus fs-14"></i>
         作品
        </span>
        <span class="inline-block select-class fs-14 resourceAdded" v-if="resource.production">
         <i class="el-icon-plus fs-14"></i>
         作品
        </span>
      </div>
      <!-- teacher add resource for teaching -->
      <!-- 此处 资源做成一个模板 -->
      <div class="resource-video-paper-pro">
        <div class="resource-example-list relative" v-on:mouseenter="ng_mouse=(_index+1)" v-on:mouseleave="ng_mouse=''" v-for="(list,_index) in resourceList">
            <span class="line-block" v-show="ng_mouse==(_index+1) && ng_mouse!=''">
              <img @click="upSelectResource(_index)" v-bind:src="imgs.up_type==0?imgs.up:imgs.up_hover" v-if="_index!=0"
               v-on:mouseenter="imgs.up_type=1"  v-on:mouseleave="imgs.up_type=0" alt="上移">
              <img  @click="downSelectResource(_index)" v-bind:src="imgs.down_type==0?imgs.down:imgs.down_hover"
               v-on:mouseenter="imgs.down_type=1"  v-on:mouseleave="imgs.down_type=0" v-if="(_index+1)!=resourceList.length" alt="下移" >
               <img v-bind:src="imgs.delete_type==0?imgs.delete:imgs.delete_hover" v-on:mouseenter="imgs.delete_type=1"  v-on:mouseleave="imgs.delete_type=0" alt="删除" @click="deleteResource(list._type)">
            </span>
            <div class="real-true-resource" v-if="list._type == 1">
              <p class="fs-16">视频</p>
              <!-- 添加了视频 -->
              <div class="work-temp-top-mutil-select-item inline-block relative added-resource-show" v-if="list.name!=''">
                <span class="wtt-msi-name fl tof">{{list.name}}</span>
                <div class="wtt-msi-icon fl relative">
                 <img src="static/imgs/classTask/search-cancel.png" @click="list.name=''" alt="cancel" class="absolute">
                </div>
                <router-link :to="{ path: '/classTask/detail/video', query: { id: list.id,isNew:'true' }}" target="_blank"><span class="absolute fs-16 TH-f-c-link">查看</span></router-link></router-link>
              </div>
              <!-- 未添加视频 -->
              <div class="nedd-add-to-model fs-14"  v-if="list.name==''">
                <img src="~assets/imgs/classTask/add-.png" alt="添加视频" @click="addVideo">
                <p>请添加视频</p>
              </div>
            </div>
            <div class="real-true-resource" v-if="list._type == 2">
              <p class="fs-16">试卷</p>
              <!-- 添加了试卷 -->
              <div class="work-temp-top-mutil-select-item inline-block relative added-resource-show" v-if="list.name!=''">
                <span class="wtt-msi-name fl tof">{{list.name}}</span>
                <div class="wtt-msi-icon fl relative">
                 <img src="static/imgs/classTask/search-cancel.png" @click="list.name=''" alt="cancel" class="absolute">
                </div>
                <router-link :to="{ path: '/classTask/detail/paper', query: { id: list.id ,isNew:'true'}}" target="_blank"><span class="absolute fs-16 TH-f-c-link">查看</span></router-link></router-link>
              </div>
              <div class="add-paper-other-message fs-16" v-if="list.name!=''">
                <div class="inline-block">
                  <span>限时：</span>
                  <input type="text"class="fs-16" v-model="list.timeLimit"/>
                  <span>分钟</span>
                </div>
                <div class="inline-block">
                  <span>最多答题次数：</span>
                  <input type="text" class="fs-16" v-model="list.answerLimit"/>
                  <span>次</span>
                </div>
                <div class="inline-block">
                  <span>解析公布时间：</span>
                  <el-date-picker
                      v-model="list.openTime"
                      type="datetime"
                      @change="anyaisChange"
                      placeholder="" format="yyyy-MM-dd HH:mm">
                  </el-date-picker>
                </div>
              </div>
              <!-- 未添加试卷 -->
              <div class="nedd-add-to-model fs-14" v-if="list.name==''">
                <img src="~assets/imgs/classTask/add-.png" alt="添加试卷" @click="addPaper">
                <p>请添加试卷</p>
              </div>
            </div>
            <div class="real-true-resource" v-if="list._type == 3">
              <p class="fs-16">附件</p>
              <!-- 添加附件 -->
              <div class="work-temp-top-mutil-select-item inline-block relative added-resource-show" v-if="list.name!=''">
                <span class="wtt-msi-name fl tof">{{list.name}}</span>
                <div class="wtt-msi-icon fl relative">
                 <img src="static/imgs/classTask/search-cancel.png" @click="list.name=''" alt="cancel" class="absolute">
                </div>
              </div>
              <!-- 未添加附件 -->
              <div class="nedd-add-to-model fs-14" v-if="list.name==''">
                <el-upload
                    class="upload-demo"
                    :action="tempAddAtt"
                    :on-success="uploadOtherFu"
                    :show-file-list="false"
                    :before-upload="beforeUploadFile"
                    multiple>
                    <img src="~assets/imgs/classTask/add-.png" alt="添加附件" >
                    <p slot="tip">请添加附件</p>
                    <p slot="tip">（只限office文档、pdf、和 图片格式）</p>
                  </el-upload>
              </div>
            </div>
            <div class="real-true-resource" v-if="list._type == 4">
              <p class="fs-16">作品</p>
              <div class="clear">
                <p class="fl fs-14">格式：</p>
                <div class="fl fs-14">
                  <template>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" :min="1" :max="3">
                      <el-checkbox v-for="arr in arr_list" :label="arr" :key="arr">.{{arr}}</el-checkbox>
                    </el-checkbox-group>
                  </template>
                  <!-- 作品评分标准 -->
                  <ul class="pro-mark-line" v-show="list.scoreStandard!=''">
                    <li class="clear" v-for="(mark,_index) in list.scoreStandard">
                      <div class="fl title"><input type="text" maxlength="30" placeholder="请填写标准（不超过30字）"
                       v-model="mark.standard"></div>
                      <div class="fl value">分值：<input type="text" name="" v-model="mark.score" maxlength='3' v-on:input="changeInputValue"  onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></div>
                      <div class="fl add"><a @click="AddProMark(list.scoreStandard)">继续添加</a></div>
                      <div class="fl delete"><a @click="DeleteProMark(list.scoreStandard,_index)">删除</a></div>
                    </li>
                    <li class="clear" style="margin-bottom:0">
                      <div class="fl title"></div>
                      <div class="fl value">总分：{{scoreStandardSum}}</div>
                      <div class="fl add"></div>
                      <div class="fl delete"></div>
                    </li>
                  </ul>
                </div>
                <span v-show="list.scoreStandard==''" class="inline-block production-add-grade fs-16" @click="addProMark(list.scoreStandard)">
                添加作品评分标准
                </span>
              </div>
            </div>
        </div>
        <!-- Miaoshu -->
        <textarea name="" placeholder="描述..." maxlength="500" class="fs-16 textarea-task-action-detail"
         v-model="taskDetail"></textarea>
        <!-- 上一步  提交 -->
        <div class="pre-button-and-submit">
            <span class="inline-block fs-16 button-default" @click="preModelBtn">上一步</span>
            <span class="inline-block fs-16 button-default fr" @click="publishTask">发布</span>
        </div>
      </div>
    </div>
    <!-- 选择班级 -->
    <el-dialog title="选择班级" :visible.sync="dialogFormVisible" custom-class="dialog-edit-grade">
      <div class="all-classes-list classes-margin-arrow">
        <div class="fs-18 fwb">
          <span :class="{'active':class_index==_index}" @click="classIndexChange(_index)" v-for="(item,_index) in classesList">{{item.session}}级</span>
         <!--  <span :class="{'active':class_index==1}" @click="classIndexChange(1)">八年级</span>
          <span :class="{'active':class_index==2}" @click="classIndexChange(2)">九年级</span> -->
        </div>
        <template>
          <el-checkbox-group
            v-model="checkedAllClasses">
            <!-- <el-checkbox @change="checkSelectClass(0,0,false)">全部</el-checkbox> -->
            <el-checkbox v-for="item in classesListArr" :label="item.className" :key="item" @change="checkSelectClass(item,item.classId,item.type)">{{item.className}}</el-checkbox>
           <!--  <el-checkbox v-if="class_index==1" v-for="city  in classArr_8" :label="city.value" :key="city" @change="checkSelectClass(city,city.id,city.type)">{{city.value}}</el-checkbox>
            <el-checkbox v-if="class_index==2" v-for="city  in classArr_9" :label="city.value" :key="city" @change="checkSelectClass(city,city.id,city.type)">{{city.value}}</el-checkbox>-->
          </el-checkbox-group>
        </template>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 选择模板  视频  试卷 -->
    <el-dialog :visible.sync="dialogFormVisibleModel" custom-class="dialog-edit-grade choose-now-added-model Add-resource-top">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span v-if="resource.type==1">选择模板</span>
        <span v-if="resource.type==2">添加视频</span>
        <span v-if="resource.type==3">添加试卷</span>
      </div>
      <div class="all-classes-list">
        <div class="work-temp-top clear">
          <!-- 筛选模板 -->
          <div class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl" v-if="resource.type==1"  @click="tree_open=true">
            <img src="static/imgs/common/shaixuan.png" alt="shaixuan" class="wtt-choice-icon">
            <span>活动筛选</span>
          </div>
          <!-- 筛选视频 -->
          <div class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl" v-if="resource.type==2"  @click="tree_open=true">
            <img src="static/imgs/common/shaixuan.png" alt="shaixuan" class="wtt-choice-icon"> 
            <span>知识点筛选</span>
          </div>

          <div class="TH-card wtt-search TH-f-c-default fs-16 cp fl">
            <p class="TH-f-c-fade fs-14 wtt-search-label">关键字搜索</p>
            <div class="wtt-search-main relative">
              <input v-model="activityOption.videoName" type="text" placeholder="请输入关键字..." class="otl-none wtt-search-main-input">
              <img src="static/imgs/common/search.png" alt="search" class="wtt-search-main-icon absolute" @click="searchVideoPaperName">
            </div>
          </div>
          <div class="fl TH-f-c-default fs-14"  v-if="resource.type==1 && stroageData!=''">
            <p class="TH-f-c-default pre-later-time">
              最近搜索：
              <span v-for='itt in stroageData' @click="nextSearch(itt.text)">{{itt.text}}</span>
            </p>
          </div>
        </div>
        <mutil-select class="work-temp-top-mutil-select absolute"
          v-if="tree_open"
          :selectList="selectOption"
          :cover="true"
          :type="resource.type==1?'single':'mutil'"
          @choiceDeactive="removeSelect($event)"
          @choiceActive="handleChoice($event)"
          @closeSelect="tree_open = false">
        </mutil-select>
        <div class="list-added-knowlege">
          <!-- 已添加知识点列表 -->
          <div v-if="activityOption.choosenActivity[0].label!=''" v-for="(bar, $index) in activityOption.choosenActivity" class="work-temp-top-mutil-select-item inline-block relative">
            <span  class="wtt-msi-name fl tof">{{bar.label}}</span>
            <div class="wtt-msi-icon fl relative">
              <img  src="static/imgs/classTask/search-cancel.png" alt="cancel" class="absolute" @click="removeSelect(bar, $index)">
            </div>
          </div>
        </div>
        <div class="work-temp-top">
          <div class="fs-18 fwb" v-if="resource.type==1">
            <!-- <span :class="{'active':choose_K==0}" @click="changeChoose_K(0)">全部</span> -->
            <span :class="{'active':choose_K==1}" @click="changeChoose_K(1)">我的模板</span>
            <span :class="{'active':choose_K==2}" @click="changeChoose_K(2)">收藏模板</span>
            <span :class="{'active':choose_K==3}" @click="changeChoose_K(3)">已购模板</span>
          </div>
          <div class="fs-18 fwb" v-if="resource.type==2">
            <!-- <span :class="{'active':choose_K==0}" @click="changeChoose_K(0)">全部</span> -->
            <span :class="{'active':choose_K==1}" @click="changeChoose_K(1)">我的视频</span>
            <span :class="{'active':choose_K==2}" @click="changeChoose_K(2)">收藏视频</span>
            <span :class="{'active':choose_K==3}" @click="changeChoose_K(3)">已购视频</span>
          </div>
          <div class="fs-18 fwb" v-if="resource.type==3">
            <!-- <span :class="{'active':choose_K==0}" @click="changeChoose_K(0)">全部</span> -->
            <span :class="{'active':choose_K==1}" @click="changeChoose_K(1)">我的试卷</span>
            <span :class="{'active':choose_K==2}" @click="changeChoose_K(2)">收藏试卷</span>
            <span :class="{'active':choose_K==3}" @click="changeChoose_K(3)">已购试卷</span>
          </div>
          <div class="all-mudel-list">
            <template>
              <el-checkbox-group
                v-model="selectedModel">
                <el-checkbox class="added-model-width fs-16" v-for="(mm,_index) in modelArr" :label="mm.value" :key="mm" @change="checkSelectModel(mm,_index)">{{mm.value}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer"  v-if="resource.type==1">
        <el-button type="primary" @click="closeModulAlert" >确 定</el-button>
        <el-button @click="dialogFormVisibleModel = false">取 消</el-button>
      </div>
      <div slot="footer" class="dialog-footer"  v-if="resource.type==2">
        <el-button type="primary" @click="closeVideoAlert">确 定</el-button>
        <el-button @click="dialogFormVisibleModel = false">取 消</el-button>
      </div>
      <div slot="footer" class="dialog-footer"  v-if="resource.type==3">
        <el-button type="primary" @click="closePaperAlert">确 定</el-button>
        <el-button @click="dialogFormVisibleModel = false">取 消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
// import $ from 'jquery'
import mutilSelect from '../../components/mutilSelect'
import { ADDRESS,HEAD } from '../../helpers/address'
import { callLoading, callToast, deepClone, clearTree, callMimeTypeCheck} from '../../helpers/helper'

export default {
  name: 'ClassTaskPublish',
  components: {
    'mutil-select':mutilSelect
  },
  store: ['paper'],
  computed: {
    selectOption() {
      return deepClone(this.$store.tree)
    }
  },
  data () {
    return {
      tempAddAtt: ADDRESS.ADD_UPLOAD_TEMP_ID,
      dialogFormVisible:false,
      timeout:  null,
      restaurants: [],
      restaurantsBeforTask:[],
      task:{
        name:'',
        action:'',
        beforeTask:'',
        activityId:'',
        beforeId:'',
        classArr:[],
        startTime:'',
        endtime:'',
        selecType:false,
        animate_:false,//向左滑
        animate_right:false,//右滑
        animate_end:false,//向左滑结束回调
        animate_model:false,//选择模板动画
        animate_model_end:false,
        animate_model_sec:false
      },
      resource:{
        modul:false,
        video:false,
        paper:false,
        attachment:false,
        production:false,
        type:1
      },
      type:0,
      imgs:{
        delete_type:0,
        delete:'static/imgs/classTask/delete.png',
        delete_hover:'static/imgs/classTask/delete-hover.png',
        up_type:0,
        up:'static/imgs/classTask/up.png',
        up_hover:'static/imgs/classTask/up-hover.png',
        down_type:0,
        down:'static/imgs/classTask/down.png',
        down_hover:'static/imgs/classTask/down-hover.png'
      },
      radio:1,
      checkAll:true,
      arr_list:['txt','doc','xls','ppt','psd','png','jpg','mp3','avi','wmv','mp4','swf','fla','xmind','zip','vbp','frm','nrb','mdb','cdr'],
      checkedCities:[],
      isIndeterminate:true,
      taskDetail:'',
      markRrr:[],
      resourceList:[],
      ng_mouse:'',
      classesList:[],
      classesListArr:[],
      checkedAllClasses:[],
      class_index:0,
      dialogFormVisibleModel:false,
      choose_K:1,
      selectedModel:[],
      modelArr:[],
      tree_open:false,
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: [],
        knowledgeIds: [],
        videoName:'',
        query:1
      },
      condition:'my',
      activityId:'',
      modelContent:'',
      modelId:'',
      stroageData:[],
      searchType:2,
      scoreStandardSum:0
    }
  },
  created () {
    this.stroageData = JSON.parse(localStorage.getItem("FF_ITEMS"))
  },
  methods: {
    handleChoice(ev) {
      if(this.resource.type==1){
        this.activityOption.choosenActivity[0] = ev
        // this.activityOption.knowledgeIds[0] = ev.id
        this.activityId = ev.id
        this.getModelList()
      }else if(this.resource.type==2){
        this.activityOption.choosenActivity.push(ev)
        this.activityOption.knowledgeIds.push(ev.id)
        this.getVideoList()
      }
    },
    nextSearch(_text){
      this.activityOption.videoName = _text
      this.getModelList()
    },
    removeSelect(item, index) {
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.activityOption.knowledgeIds.remove(item.id)
      index = index || this.activityOption.choosenActivity.indexOf(item)
      this.activityOption.choosenActivity.splice(index,1)
      //知识点数组处理之后
      if(this.resource.type==1){
        clearTree(this.selectOption)
        this.activityId = ''
        this.getModelList()
      }else if(this.resource.type==2){
        this.getVideoList()
        const _si = item.selectIndex
        this.selectOption[_si[0]].children[_si[1]].children[_si[2]].children[_si[3]].open = false
      }
    },
    selectClass(){//classesList
      this.class_index = 0
      this.$http.post(ADDRESS.CLASS_TEACHER_LIST_TREE)
      .then((res) => {
        if (res.body.code == 1) {
          this.classesList = res.body.data
          this.classesListArr =[{classId:0,className:'全部',type:false}]
          res.body.data[0].list.forEach(item => this.classesListArr.push({classId:item.classId,className:item.className,type:false}))
        }else{
          callToast('请联系管理员为您添加班级','warning')
        }
      }, (err) => {
        // callToast('请求失败','error')
      })
      if(this.checkedAllClasses[0] == '全部'&&this.checkedAllClasses.length==1){
        this.checkedAllClasses = [];
      }
      this.dialogFormVisible = true;
    },
    changeChoose_K(_this){
      this.choose_K = _this;
      this.activityOption.videoName = ''
      if(this.resource.type == 3){//试卷
          this.searchType = _this + 1
          this.getPapersLists()
      }else if(this.resource.type ==2 ){//视频
        if(_this==0){
          this.activityOption.query = ''
        }
        else if(_this<3){
          this.activityOption.query = _this
        }
        else if(_this == 3){
          this.activityOption.query = 5
        }
        this.getVideoList()
      }else{//模板
        if(_this==0){
          this.condition = ''
        }
        else if(_this == 1){
          this.condition = 'my'
        }
        else if(_this == 2){
          this.condition = 'favor'
        }
        else{
          this.condition = 'buy'
        }
        this.getModelList()
      }
    },
    addResource(tt){
      this.choose_K = 1
      if(tt == 1){
        this.resource.video = true;
        this.resourceList.push({
          _type:1,
          type:1,
          id:'',
          name:''
        });
      }else if(tt == 2){
        this.resource.paper = true;
        this.resourceList.push({
          _type:2,
          type:2,
          id:'',
          name:'',
          timeLimit:0,
          answerLimit:0,
          openTime:''
        });
      }else if(tt == 3){
        this.resource.attachment = true;
        this.resourceList.push({
          _type:3,
          type:3,
          id:'',
          name:''
        });
      }else{
        this.resource.production = true;
        this.resourceList.push({
          _type:4,
          type:4,
          id:'1',
          name:'空',
          format:'',
          scoreStandard:[]
        });
        this.checkedCities = [];
      }
    },
    deleteClass(_index){
      this.checkedAllClasses.splice(_index,1);
    },
    deleteResource(type){
      for(var i=0;i<this.resourceList.length;i++){
        if(this.resourceList[i]._type == type){
          this.resourceList.splice(i,1);
          if(type == 1){
            this.resource.video = false
          }else if(type == 2){
            this.resource.paper = false
          }else if(type == 3){
            this.resource.attachment = false
          }else{
            this.resource.production = false
            this.scoreStandardSum = 0
          }
        }
      }
    },
    loadAll() {
      return []
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = [];
      this.$http.get(ADDRESS.SEARCH_ACTIONS_NAME,{
        params:{name:queryString}
      })
      .then((res) => {
        if (res.body.code == 1) {
          res.body.data.list.forEach(function(item){
            results.push({id:item.id,value:item.name})
          })
        }else if (res.body.code == 404){
          callToast('没有搜索到相关活动','warning')
        }else{
        }
      }, (err) => {

      })
      cb(results);

    },
    querySearchAsyncBeforeTask(queryString, cb){
      var restaurants = this.restaurantsBeforTask;
      var results = [];
      this.$http.get(ADDRESS.SEARCH_BEFORE_TASK,{
        params:{title :queryString}
      })
      .then((res) => {
        if (res.body.code == 1) {
          res.body.data.list.forEach(function(item){
            results.push({id:item.id,value:item.title})
          })
        }else if (res.body.code == 404){
          callToast('没有搜索到相关任务','warning')
        }else{
        }
      }, (err) => {
      })
      cb(results);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelectAction(item){
      this.task.activityId = item.id;
    },
    handleSelect(item) {
      this.task.beforeId = item.id;
    },
    taskSartTime(startTime){//任务开始时间
      if(this.task.endtime==''){
        this.task.startTime = startTime;
      }else{
        if(new Date(this.task.startTime).getTime() - new Date(this.task.endtime).getTime() > 0){
          callToast('开始时间不能大于结束时间','warning')
          this.task.startTime =''
        }else{
          this.task.startTime = startTime
        }
      }
    },
    taskEndTime(endTime){//任务结束时间
      if(this.task.startTime==''){
        this.task.endtime = endTime
      }else{
        if(new Date(this.task.endtime).getTime() - new Date(this.task.startTime).getTime() < 0){
          callToast('结束时间不能小于开始时间','warning')
          this.task.endtime =''
        }else{
          this.task.endtime = endTime
        }
      }
    },
    anyaisChange(lastTime){
      var isTime = true
      if(new Date(lastTime).getTime() - new Date(this.task.endtime).getTime() < 0){
        callToast('解析公布时间不能早于任务结束时间','warning')
        isTime = false
      }else{
        lastTime += ':00'
      }
      console.log(lastTime)
    },
    nextStep(){//发布任务下一步执行动画
      if(this.task.name == ''){
        callToast('请填写任务名','warning')
      }else if(this.task.action == ''){
        callToast('请选择活动','warning')
      }else if(this.task.classArr == ''){
        callToast('请选择班级','warning')
      }else if(this.task.startTime == ''){
        callToast('请填写任务开始时间','warning')
      }else if(this.task.endtime == ''){
        callToast('请填写任务结束时间','warning')
      }else{//第一步校验
        this.task.animate_ = true;
        this.task.animate_right = false;
        this.task.animate_model_end= false;
        var _this = this;
        setTimeout(function(){
          _this.task.animate_end = true;
          _this.task.animate_model = true;
        },500)
      }
    },
    preStep(){
      this.task.animate_model = false;
      this.task.animate_model_end = true;
      this.task.animate_right = true;
      var _this = this;
      setTimeout(function(){
        _this.task.animate_end = false;
        _this.task.animate_ = false;
      },500)
    },
    secondStep(_index){//第二步操作
      this.task.animate_model_sec = true;//添加资源区域显示
      this.task.animate_model_end = true;
      // 初始化
      this.resource.video = false;
      this.resource.paper = false;
      this.resource.attachment = false;
      this.resource.production = false;
      //set
      if(_index == 1){
        this.resource.video = true;
        this.resourceList = [{
          _type:1,
          type:1,
          id:'',
          name:''
        }];
      }else if(_index == 2){
        this.resource.paper = true;
        this.resourceList = [{
          _type:2,
          type:2,
          id:'',
          name:'',
          timeLimit:0,
          answerLimit:0,
          openTime:''
        }];
      }else if(_index == 3){
        this.resourceList = [{
          _type:3,
          type:3,
          id:'',
          name:''
        }];
        this.resource.attachment = true;
      }else{
        this.resourceList = [{
          _type:4,
          type:4,
          id:'1',
          name:'空',
          format:'',
          scoreStandard:[]
        }];
        this.resource.production = true;
      }
    },
    handleCheckedCitiesChange(value) {
      //console.log(value)
      //console.log(this.checkedCities)
      for(var i=0;i<this.resourceList.length;i++){
        if(this.resourceList[i].type == 4){
          this.resourceList[i].format = this.checkedCities+',';
        }
      }
    },
    classIndexChange($index){
      var _this = this;
      _this.classesListArr =[{classId:0,className:'全部',type:false}]
      _this.classesList[$index].list.forEach(item => this.classesListArr.push({classId:item.classId,className:item.className,type:false}))
      _this.class_index = $index
      _this.checkedAllClasses = []
      _this.task.classArr = []//选择班级数组为空
    },
    checkSelectClass(item,value,type){
      // item,item.classId,item.isFormer
      if(value==0){//全部
        this.checkedAllClasses = [];
        this.task.classArr = [];//选择班级数组
        if(type==false){
          for(var i=0;i<this.classesListArr.length;i++){
            this.checkedAllClasses.push(this.classesListArr[i].className);
            if(i>0){
              this.task.classArr.push(this.classesListArr[i].classId);//选择班级数组
            }
          }
          item.type = true;
        }else{
          this.task.classArr = [];//选择班级数组
          this.checkedAllClasses = [];
          item.type = false;
        }
      }else{//非全部
        if(type==false){
          this.task.classArr.push(item.classId);//选择班级数组
          item.type = true;
        }else{
          Array.prototype.removeByValue = function(val) {
            for(var i=0; i<this.length; i++) {
              if(this[i] == val) {
                this.splice(i, 1);
                break;
              }
            }
          }
          this.checkedAllClasses.removeByValue(item.className);
          this.task.classArr.removeByValue(item.classId);//选择班级数组
          item.type = false;
        }
      }
      console.log(this.task.classArr)
    },
    addProMark(item){
      item.push({standard:'',score:10});
      this.scoreStandardSum = 10
    },
    AddProMark(item){
      if(item.length<10){
        item.push({standard:'',score:10});
        this.scoreStandardSum += 10
      }else{
        callToast('最多能添加10条评分标准哦','warning')
      }
    },
    DeleteProMark(item,_index){
      item.splice(_index,1)
      var addSum = 0
      for(var i=0;i<this.resourceList.length;i++){
        if(this.resourceList[i].type == 4 && this.resourceList[i].scoreStandard!=''){
          const _this = this.resourceList[i]
          for(var j=0;j<_this.scoreStandard.length;j++){
            addSum+=parseInt(_this.scoreStandard[j].score)
          }
        }else{
          addSum = 0
        }
      }
      this.scoreStandardSum = addSum
    },
    changeInputValue(){
      var addSum = 0
      for(var i=0;i<this.resourceList.length;i++){
        if(this.resourceList[i].type == 4 && this.resourceList[i].scoreStandard!=''){
          const _this = this.resourceList[i]
          for(var j=0;j<_this.scoreStandard.length;j++){
            if(_this.scoreStandard[j].score == ''){
              addSum += 0
            }
            else if(_this.scoreStandard[j].score > 100){
              _this.scoreStandard[j].score = 0
              callToast('请输入1-100分数字','warning')
            }
            else{
              addSum += parseInt(_this.scoreStandard[j].score)
            }
          }
        }else{
          addSum = 0
        }
      }
      this.scoreStandardSum = addSum
      if(this.scoreStandardSum > 100){
        callToast('作品总分应为100分','warning')
      }
    },
    heightChange(){
      var _this = this;
      var oDiv=document.getElementById('container');
      // console.log(_this.task.animate_model_sec)
      if(_this.task.animate_model_sec){
        setInterval(function(){
          oDiv.style.height =(_this.$refs.model.getBoundingClientRect().height + 50 )/100+'rem';
        },200);
      }else{
        oDiv.style.height = '9rem';
      }
    },
    preModelBtn(){
      this.task.animate_model_sec = false;
      this.task.animate_model_end = false;
      this.heightChange()
    },
    upSelectResource(_index){//上移
      this.swapItems(this.resourceList,_index,_index-1)
    },
    downSelectResource(_index){//下移
      this.swapItems(this.resourceList,_index,_index+1)
    },
    swapItems(arr, index1, index2){
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    getModelList(){
      callLoading.activeLoading()
      this.$http.get(ADDRESS.SEARCH_TEMP_FORM_SQL,{
        params:{
          title:this.activityOption.videoName,
          condition:this.condition,
          activityIds:[this.activityId],
          page:1,
          rows:999
        }
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.modelArr = [];
          for(var i=0;i<res.body.data.list.length;i++){
            this.modelArr.push({
              value:res.body.data.list[i].tempName +' --作者： '+res.body.data.list[i].creatorName+' -- '+ res.body.data.list[i].createTime,
              type:false,
              id:res.body.data.list[i].tempId,
              _type:0
            })
          }
        }else{
           this.modelArr = [];
          callToast('没有你需要的模板呢！','warning')
        }
      }, (err) => {
        callLoading.deactiveLoading()
      })
    },
    addModel(){
      this.dialogFormVisibleModel = true;
      this.resource.type = 1;
      this.activityOption.choosenActivity = []
      this.activityOption.knowledgeIds = []
      clearTree(this.selectOption)
      //模拟数据
      this.getModelList();
    },
    closeModulAlert(){
      this.dialogFormVisibleModel = false;
      this.task.animate_model_sec = true;//添加资源区域显示
      this.task.animate_model_end = true;
      // /SOURCEREPO_TASKTEMPLATE_DETAIL_ADDR
      callLoading.activeLoading()
      this.$http.get(ADDRESS.SOURCEREPO_TASKTEMPLATE_DETAIL_ADDR,{
        params:{
          tempId :this.modelId
        }
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          // this.modelContent = res.body.data.content
          const _content = []
          const content = res.body.data.content
          for(var i=0;i<content.length;i++){
            if(content[i].contentType == 1){
              this.resource.video = true;
              _content.push({
                id:content[i].contentId,
                name:content[i].contentTitle,
                type:1,
                _type:1
              })
            }else if(content[i].contentType == 2){
              this.resource.paper = true;
              _content.push({
                id:content[i].contentId,
                name:content[i].contentTitle,
                timeLimit:(content[i].timeLimit==null?'':content[i].timeLimit),
                answerLimit:(content[i].answerLimit==null?'':content[i].answerLimit),
                openTime:(content[i].openTime==null?'':content[i].openTime),
                type:2,
                _type:2
              })
            }else if(content[i].contentType == 3){
              this.resource.attachment = true;
              _content.push({
                id:content[i].contentId,
                name:content[i].contentTitle,
                type:3,
                _type:3
              })
            }else if(content[i].contentType == 4){
              this.resource.production = true;
              _content.push({
                id:content[i].contentId,
                name:content[i].contentTitle,
                type:4,
                _type:4,
                format:content[i].worksSuffix,
                scoreStandard:JSON.parse(content[i].worksEvaluationStandard)
              })
              this.checkedCities =  content[i].worksSuffix.split(',')
              JSON.parse(content[i].worksEvaluationStandard).forEach(item => this.scoreStandardSum += item.score)
            }
          }
          this.resourceList = _content;//资源区
        }else{
          callToast('添加模板失败','error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('添加模板失败','error')
      })
    },
    searchVideoPaperName(){
      if(this.resource.type==1){
        this.getModelList()
        if(this.stroageData.length == 5){
          this.stroageData = this.stroageData.slice(0,4)
        }
        this.stroageData.push({text:this.activityOption.videoName})
        localStorage.setItem('FF_ITEMS',JSON.stringify(this.stroageData))
        // console.log(localStorage.getItem("FF_ITEMS"))
      }else if(this.resource.type==2){
        this.getVideoList()
      }else{
        this.getPapersLists()
      }
    },
    getVideoList(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_VIDEO_BY_CONDITION,{
        knowledgeIds:this.activityOption.knowledgeIds,
        videoName:this.activityOption.videoName,
        query:this.activityOption.query,
        page:1,
        rows:999
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.modelArr = [];
          for(var i=0;i<res.body.data.list.length;i++){
            this.modelArr.push({
              value:res.body.data.list[i].videoName+' -- 作者：'+res.body.data.list[i].createrName+'   时间：'+res.body.data.list[i].createTime,
              type:false,
              id:res.body.data.list[i].videoId,
              _type:1
            })
          }
        }else{
          callToast('没有你需要的视频呢！','warning')
          this.modelArr = []
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('获取视频列表失败','error')
      })
    },
    getFavoritePapers(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SOURCEREPO_FLIST_PAPER_FAVORITE_ADDR,{
        keyword:this.activityOption.videoName
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.modelArr = [];
          for(var i=0;i<res.body.data.list.length;i++){
            this.modelArr.push({
              value:res.body.data.list[i].paperTitle+' -- 作者：'+res.body.data.list[i].author+'   时间：'+res.body.data.list[i].createTime,
              type:false,
              id:res.body.data.list[i].paperId,
              _type:2
            })
          }
        }else{
          callToast('没有你需要的试卷呢！','warning')
          this.modelArr = []
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('获取试卷列表失败','error')
      })
    },
    getPapersLists(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_PAPER_ALL_LISTS,{
        searchType:this.searchType,
        keyword:this.activityOption.videoName,
        page:1,
        rows:999
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.modelArr = [];
          for(var i=0;i<res.body.data.list.length;i++){
            this.modelArr.push({
              value:res.body.data.list[i].paperTitle+' -- 作者：'+res.body.data.list[i].author+'   时间：'+res.body.data.list[i].createTime,
              type:false,
              id:res.body.data.list[i].paperId,
              _type:2
            })
          }
        }else{
          callToast('没有你需要的试卷呢！','warning')
          this.modelArr = []
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('获取试卷列表失败','error')
      })
    },
    checkSelectModel(item){
      this.selectedModel = [];
      // for(var i=0;i<this.modelArr.length;i++){
      //   this.modelArr[i].type = false;
      // }
      // item.type = true;
      this.selectedModel[0] = item.value;
      if(item._type==1){
        for(var i=0;i<this.resourceList.length;i++){
          if(this.resourceList[i].type==1){
            this.resourceList[i].id = item.id;
            this.resourceList[i].name = item.value;
          }
        }
      }else if(item._type ==2){
        for(var i=0;i<this.resourceList.length;i++){
          if(this.resourceList[i].type==2){
            this.resourceList[i].id = item.id;
            this.resourceList[i].name = item.value;
          }
        }
      }else{
        console.log(item)
        this.modelId = item.id;
      }
    },
    uploadOtherFu(response, file, fileList){
      console.log(response,file)
      for(var i=0;i<this.resourceList.length;i++){
        if(this.resourceList[i].type==3){
          this.resourceList[i].id = response.data
          this.resourceList[i].name = file.raw.name
        }
      }
    },
    closeVideoAlert(){
      this.dialogFormVisibleModel = false
    },
    closePaperAlert(){
      this.dialogFormVisibleModel = false
    },
    addVideo(){
      this.dialogFormVisibleModel = true
      this.activityOption.videoName = ''
      this.getVideoList();
      this.resource.type = 2;
      clearTree(this.selectOption)
      this.activityOption.choosenActivity = []
      this.activityOption.knowledgeIds = []
    },
    addPaper(){
      this.activityOption.videoName = ''
      this.dialogFormVisibleModel = true
      this.getPapersLists();
      this.resource.type = 3;
      this.activityOption.choosenActivity = []
      this.activityOption.knowledgeIds = []
    },
    publishTask(){//发布任务PUBLISH_TASKES
      // 判断是否添加了标准
      var _add = false;
      var _real = true;
      var _this = this;
      this.resourceList.forEach(function(item){
        if(item.type==4){
          _add = true;
          if(item.scoreStandard ==''){
            callToast('请填写作品标准','warning')
            _real = false;
          }
          else if(item.format == ''){
            callToast('请选择作品格式','warning')
            _real = false;
          }
          else if(_this.scoreStandardSum != 100){
            callToast('作品总分应为100分！','warning')
            _real = false;
          }
          else{
            _real = true;
            return
          }
        }else if(item.type ==2){
          _add = true;
        }
      })
      // 判断试卷和作品是否有一个添加了
      if(!_add){
        callToast('作品和试卷必须添加一个','warning')
      }else if(_add){
        if(this.resourceList.length==0){
          callToast('请上传资源','warning')
        }else if(this.taskDetail==''){
          callToast('描述不能空着哦','warning')
        }else{
          var open = true;
          for(var i=0;i<this.resourceList.length;i++){
            this.resourceList[i].order = (i+1);
            if(this.resourceList[i].type==2){
              var _con = this.resourceList[i];
              if(_con.id==''){
                callToast('请选择试卷','warning')
                open = false;
              }else if(_con.timeLimit<1){
                callToast('请合理安排答题时间','warning')
                open = false;
              }else if(_con.answerLimit<1){
                callToast('请合理安排答题次数','warning')
                open = false;
              }else if(_con.openTime==''){
                callToast('请选择公布解析时间','warning')
                open = false;
              }else if(new Date(_con.openTime).getTime() - new Date(this.task.endTime).getTime() < 0){
                callToast('解析公布时间不能早于任务结束时间','warning')
                open = false
              }else{
                open = true;
              }
            }
          };
          if(open&&_real){
            callLoading.activeLoading()
            ///return
            this.$http.post(ADDRESS.PUBLISH_TASKES,{
              title:this.task.name,
              classIds:this.task.classArr.join(','),
              // classIds:this.task.classArr,
              startTime:this.task.startTime+':00',
              endTime:this.task.endtime+':00',
              activityId:this.task.activityId,
              beforeId:this.task.beforeId,
              content:JSON.stringify(this.resourceList),
              description:this.taskDetail,
              templateTaskId:'',
              templateType:''
            })
            .then((res) => {
              if (res.body.code == 1) {
                callLoading.deactiveLoading();
                //发布成功
                this.$router.push('/classTask/index');
              }
              else {
                callToast('发布失败！','error')
                callLoading.deactiveLoading();
              }
            }, (err) => {
              callLoading.deactiveLoading();
              callToast('发布失败！','error')
            })
          }
        }
      }
    },
    beforeUploadFile(file) {
      console.log(file)
      const type =  ['pdf','txt','doc','docx','xls', 'xlsx','ppt','pptx','jpg','jpeg','png']
      return callMimeTypeCheck(file, type)
    }
  },
  mounted() {
    // this.restaurants = this.loadAll();
    var _this = this;
    _this.heightChange();

  }
}
</script>

<style scoped>
.container{
  width: 17rem;
  margin:0 auto;
  min-height: 9rem;
  padding: .1rem .1rem;
}

.publish-classTask-first{
  width: 9rem;
  /*min-height: 7rem;*/
  background-color: #fff;
  padding: .3rem .4rem 0 .3rem;
  position: absolute;
  left: 3.75rem;
  top: .1rem;
  padding-bottom: .5rem;
}

.publish-classTask-first li{
  margin-bottom: .3rem;
}

.publish-classTask-first li p{
  color: #878787;
  line-height: .28rem;
  margin-bottom: .1rem;
}

.publish-classTask-first li p em{
  display: inline-block;
  width: .16rem;
}

.publish-classTask-first li input{
  height: .38rem;
  line-height: .38rem;
  width: 100%;
  border:1px solid #ddd;
  outline: none;
  padding: 0 0;
  padding-left: .1rem;
}

.publish-classTask-first li input:hover{
  border:1px solid #3283d3;
}

span.inline-block.select-class{
  line-height: .38rem;
  border:1px solid #ddd;
  cursor: pointer;
  color: #535353;
  padding: 0 .1rem;
  margin-right: .3rem;
}

span.inline-block.select-class i.el-icon-plus{
  color: #3283d3;
  font-size: .14rem;
  margin-left: .1rem;

}

span.model-resource-button{
  box-shadow: 0 2px 6px rgba(129,129,129,.5);
  border: solid 1px #c4c4c4;
  background-image: -webkit-linear-gradient(top, #d4d3d3, #f8f8f8);
  height: .3rem;
  line-height: .3rem !important;
  border-radius: .15rem;
  padding-left: .1rem !important;
  padding-right: .2rem !important;
}

span.model-resource-button:hover{
  background-image: -webkit-linear-gradient(top, #e0e0e0, #fff);
  background-image: -moz-linear-gradient(top, #e0e0e0, #fff);
  background-image: -o-linear-gradient(top, #e0e0e0, #fff);
  background-image: -ms-linear-gradient(top, #e0e0e0, #fff);
  background-image: linear-gradient(to bottom, #e0e0e0, #fff);
}


span.inline-block.classes-added-push{
  color: #535353;
  background-color: #E5E9F2;
  line-height: .32rem;
  padding-left: .1rem;
  margin-right: .3rem;
  /*margin-bottom: .2rem;*/
}

span.inline-block.classes-added-push i{
  cursor: pointer;
  line-height: .32rem;
  padding: 0 .1rem;
  border-left:1px solid #ddd;
  margin-left: .1rem;
}

.class-margin{
  margin-top: .2rem;
}

.el-date-editor.el-input{
  width: 1.6rem !important;
  border:1px solid #ddd !important;
}

input[type="button"].button-default{
  width: 1.1rem;
  height: .4rem;
  border:none;
  outline: none;
  color: #fff;
  cursor: pointer;
  margin-top: .5rem;
}

.title-color{
  color: #3283d3 !important;
}

.animate-class-left{
  animation:theanimation 500ms ease-out 0s 1 alternate forwards;
  -webkit-animation:theanimation 500ms ease-out 0s 1 alternate forwards;
  -moz-animation:theanimation 500ms ease-out 0s 1 alternate forwards;
  -o-animation:theanimation 500ms ease-out 0s 1 alternate forwards;
  -ms-animation:theanimation 500ms ease-out 0s 1 alternate forwards;
}

@keyframes theanimation{
  from {
    top: .1rem;
    left:3.75rem;
    width: 9.7rem;
  }
  to {
    width: 4.5rem;
    left:0;
    top: .1rem;
  }
}

.animate-class-right{
  animation:theanimationright 500ms ease-out 0s 1 alternate forwards;
  -webkit-animation:theanimationright 500ms ease-out 0s 1 alternate forwards;
  -moz-animation:theanimationright 500ms ease-out 0s 1 alternate forwards;
  -o-animation:theanimationright 500ms ease-out 0s 1 alternate forwards;
  -ms-animation:theanimationright 500ms ease-out 0s 1 alternate forwards;
}

@keyframes theanimationright{
  from {
    top: .1rem;
    left:0rem;
    width: 4.5rem;
  }
  to {
    width: 9.7rem;
    left:3.75rem;
    top: .1rem;
  }
}

.animate-class-left-input{
  animation:inputAnimation 500ms ease-out 0s 1 alternate forwards;
}

@keyframes inputAnimation{
  from {
    width: 8.88rem;
  }
  to {
    width: 4.38rem;
  }
}

span.inline-block.class-list{
  line-height: .26rem;
  margin-right: .2rem;
}

.publish-task-second{
  z-index: -1;
  opacity: 0;
  padding: 0;
  width: 9.7rem;
  /*min-height: 8rem;*/
  left: 5.5rem !important;
  box-shadow: 0 0.02rem 0.05rem rgba(2,22,37,.3);
}

div.publish-add-resource{
  border-bottom: 1px solid #ddd;
}

div.publish-add-resource span{
  margin:.1rem 0 .1rem .3rem;
  cursor: pointer;
  margin-right: 0 !important;
}

div.publish-add-resource span i{
  margin-right: .1rem;
}

div.select-now-model{
  width: 100%;
  height: 6.3rem;
}

div.use-added-model{
  width: 5rem;
  height: 1.9rem;
  margin:1.5rem auto;
  background-color: rgba(136,201,73,.4);
  border-radius: .05rem;
  cursor: pointer;
  /*left: 5rem !important;*/
}

div.use-added-model img{
  width: 1.2rem;
  height: 1.2rem;
  margin: .15rem 1.9rem;
}

div.use-added-model p{
  color: #417214;
  text-align: center;
}

.select-now-model input.button-default{
  position: absolute;
  left: .3rem;
  bottom:.3rem;
}

.opacity-change{
  animation:senanimation 500ms ease-out 0s 1 alternate forwards;
}

@keyframes senanimation{
  from{
    opacity:0;
    z-index: -1;
  }
  to{
    opacity:1;
    z-index: 1;
  }
}

.opacity-change-end{
  animation:senanimationend 500ms ease-out 0s 1 alternate forwards;
}

@keyframes senanimationend{
  from{
    opacity:1;
    z-index: 1;
  }
  to{
    opacity:0;
    z-index: -1;
  }
}

span.inline-block.select-class.fs-14.resourceAdded{
  border-radius: .15rem;
  height: .3rem;
  line-height: .3rem;
  cursor: default;
  color: #a7a7a7;
  padding-right: .2rem;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 6px rgba(129,129,129,.5);
  -moz-box-shadow: 0 2px 6px rgba(129,129,129,.5);
  box-shadow: 0 2px 6px rgba(129,129,129,.5);
  /*border: solid 1px #c4c4c4; */
  background-image: -webkit-linear-gradient(top, #e0e0e0, #fff);
  background-image: -moz-linear-gradient(top, #e0e0e0, #fff);
  background-image: -o-linear-gradient(top, #e0e0e0, #fff);
  background-image: -ms-linear-gradient(top, #e0e0e0, #fff);
  background-image: linear-gradient(to bottom, #e0e0e0, #fff);
}

.inline-block.select-class.fs-14.resourceAdded i{
  color: #a7a7a7;
}

.resource-video-paper-pro .resource-example-list{
  width: 9rem;
  min-height: 1.9rem;
  margin:.1rem auto;
  margin-bottom: .2rem;
  background-color: rgba(245,245,245,.75);
  padding-bottom: .1rem;
}

.resource-video-paper-pro .resource-example-list>span{
  position: absolute;
  right: .1rem;
  top: .1rem;
}

.resource-video-paper-pro .resource-example-list span img{
  cursor: pointer;
  margin-left: .15rem;
  width: .26rem;
  height: .26rem;
}

.real-true-resource>p{
  color: #535353;
  line-height: .28rem;
  margin:.1rem .2rem;
}

.real-true-resource .nedd-add-to-model img{
  width: 1.2rem;
  height: 1.2rem;
  margin:0 3.9rem;
  cursor: pointer;
}

.real-true-resource .nedd-add-to-model p{
  text-align: center;
  color: #223954;
  margin:  0 0;
  font-size: .16rem;
  margin-bottom: .1rem;
}

.real-true-resource div.clear{
  color: #535353;
  padding: .1rem .2rem;
}

.real-true-resource div.clear p{
  width: .7rem;
}

.real-true-resource div.clear div.fs-14{
  width: 7.8rem;
}

span.production-add-grade{
  width: 2rem;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  margin: .2rem 3.3rem;
  cursor: pointer;
  border-radius: .3rem;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 6px rgba(129,129,129,.5);
  -moz-box-shadow: 0 2px 6px rgba(129,129,129,.5);
  box-shadow: 0 2px 6px rgba(129,129,129,.5);
  border: solid 1px #c4c4c4;
  background-image: -webkit-linear-gradient(top, #d4d3d3, #f8f8f8);
  background-image: -moz-linear-gradient(top, #d4d3d3, #f8f8f8);
  background-image: -o-linear-gradient(top, #d4d3d3, #f8f8f8);
  background-image: -ms-linear-gradient(top, #d4d3d3, #f8f8f8);
}

span.production-add-grade:hover{
  background-image: -webkit-linear-gradient(top, #e0e0e0, #fff);
  background-image: -moz-linear-gradient(top, #e0e0e0, #fff);
  background-image: -o-linear-gradient(top, #e0e0e0, #fff);
  background-image: -ms-linear-gradient(top, #e0e0e0, #fff);
  background-image: linear-gradient(to bottom, #e0e0e0, #fff);
}

.textarea-task-action-detail{
  margin: .2rem .3rem .2rem .3rem;
  padding: .2rem .2rem;
  width: 8.6rem;
  height: 2.4rem;
  border:1px solid #ddd;
  resize: none;
}

.pre-button-and-submit{
  border-top: 1px solid #ddd;
  padding: .2rem .3rem;
}

.pre-button-and-submit span{
  color: #fff;
  cursor: pointer;
  height: .38rem;
  line-height: .38rem;
  padding: 0 .3rem;
}

.pre-button-and-submit span:last-child{
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: -webkit-linear-gradient(bottom, #37c796, #08af95);
  background-image: -moz-linear-gradient(bottom, #37c796, #08af95);
  background-image: -o-linear-gradient(bottom, #37c796, #08af95);
  background-image: -ms-linear-gradient(bottom, #37c796, #08af95);
  background-image: linear-gradient(to top, #37c796, #08af95);
}

.pre-button-and-submit span:last-child:hover{
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
  background-image: -webkit-linear-gradient(bottom, #47d4a4, #0bc0a4);
  background-image: -moz-linear-gradient(bottom, #47d4a4, #0bc0a4);
  background-image: -o-linear-gradient(bottom, #47d4a4, #0bc0a4);
  background-image: -ms-linear-gradient(bottom, #47d4a4, #0bc0a4);
  background-image: linear-gradient(to top, #47d4a4, #0bc0a4);
}

.pro-mark-line .clear{
  margin-top:.16rem;
}

.pro-mark-line .clear div.fl.title{
  width: 5rem;
  height: .3rem;
}

.pro-mark-line .clear div.fl.title input{
  width: 4.2rem;
  padding-left: .1rem;
  height: .3rem;
  line-height: .3rem;
}

.pro-mark-line .clear div.fl.value input{
  width: .3rem;
  height: .3rem;
}

.pro-mark-line .clear div.fl.add,
.pro-mark-line .clear div.fl.delete{
  /*text-decoration: underline;*/
  line-height: .3rem;
  padding: 0 .2rem;
}

.pro-mark-line .clear div.fl.add a,
.pro-mark-line .clear div.fl.delete a{
  text-decoration: underline;
  text-decoration-color: #3283d3;
  color: #3283d3;
  cursor: pointer;
}

.pro-mark-line .clear div.fl.delete a{
  text-decoration-color: #ff4848;
  color: #ff4848;
}

.all-classes-list div.fs-18{
  margin-bottom: .3rem;
  color: #878787;
}

.all-classes-list div.fs-18 span{
  margin-right: .3rem;
  cursor: pointer;
}

.all-classes-list div.fs-18 span.active{
  color: #535353;
  font-size: .26rem;
}

.all-classes-list .el-checkbox-group .el-checkbox{
  width: 50%;
}

.wtt-choice {
    width: 2rem;
    height: .8rem;
    line-height: .8rem;
    margin-right: .5rem;
}

.cp {
  background-color: #f5f5f5;
}

.list-added-knowlege{
  padding: 0 .2rem;
}

.list-added-knowlege>div{
  margin-right: .3rem;
}

.wtt-choice-icon {
  position: relative;
  top: .05rem;
}

.wtt-search {
  width: 4rem;
  height: .8rem;
}

.wtt-search-label {
  margin: .1rem .15rem;
}

.wtt-search-main {
  margin: .2rem .15rem;
  border-bottom: 1px solid #ddd;
}

.wtt-search-main-input {
  width: 3.5rem;
  height: .25rem;
  line-height: .3rem;
  background-color: #f5f5f5;
}

.otl-none {
  outline: none;
  border: none;
}

.wtt-search-main-icon {
  right: 0;
  bottom: .05rem;
}

.work-temp-top{
  padding: .2rem .2rem;
}

.work-temp-top-mutil-select-item{
    height: .35rem;
    line-height: .35rem;
    border-radius: 4px;
    text-align: center;
    background-color: #535353;
    box-shadow: 0 1px 2px rgba(2,22,37,.3);
    background-image: linear-gradient(to top, #9599a0, #6b7279);
    color: #fff;
}

.wtt-msi-name{
    border-right: 1px solid #fff;
    height: 100%;
    display: inline-block;
    min-width: .9rem;
    padding: 0 .1rem;
    text-align: center;
    width: 1.6rem;
}

.wtt-msi-icon {
    top: .1rem;
    right: .08rem;
}

.wtt-msi-icon {
    width: .35rem;
    height: .35rem;
    position: relative;
}

.work-temp-top-mutil-select-item span.TH-f-c-link{
  right: -.4rem;
  display: inline-block;
  cursor: pointer;
}

.all-mudel-list{
  height: 4.8rem;
  overflow: auto;
}

.pre-later-time{
  margin-top: .55rem;
  line-height: .24remm;
  margin-left: .2rem;
}

.pre-later-time span{
  cursor: pointer;
  color: #3283d3;
  margin-right: .1rem;
}

/*.pre-later-time span:hover{
  text-decoration: underline;
  text-decoration-color: #3283d3;
}*/

.classes-margin-arrow{
  margin:.2rem .2rem;
}

.added-resource-show{
  margin-top:.3rem;
  margin-left: .2rem;
}

.add-paper-other-message div.inline-block{
  padding: .2rem .2rem;
}

.add-paper-other-message div.inline-block input.fs-16{
  border:1px solid #ddd;
  height: .38rem;
  width: .5rem;
  text-align: center;
}
</style>
