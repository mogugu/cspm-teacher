
<template>
  <div class="container">
    <div class="clear normal-pad-min">
      <div class="add-template-about-task-name d-normal-style fl">
          <ul>
            <li>
              <p class="disable-color fs-16">任务模板名称：<span class="fr fs-13">不超过30字</span></p>
              <input type="text" v-model="temp.title" class="fs-16 normal-color">
            </li>
            <li>
              <p class="disable-color fs-16">活动</p>
              <!-- <input type="text" v-model="temp.activity" class="fs-16 normal-color"> -->
              <el-autocomplete
                v-model="activityName"
                class="fs-16 normal-color"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </li>
          </ul>
      </div>
      <div class="add-template-about-task-content d-normal-style fl">
        <div class="publish-add-resource ">
          <!-- need Added -->
          <span class="inline-block select-class fs-14 model-resource-button normal-color"
           v-if="!resource.video" @click="addResource(1)">
           <i class="el-icon-plus fs-14"></i>
           视频
          </span>
          <span class="inline-block select-class fs-14 resourceAdded" v-if="resource.video">
           <i class="el-icon-plus fs-14"></i>
           视频
          </span>
          <span class="inline-block select-class fs-14 model-resource-button normal-color"
          v-if="!resource.paper" @click="addResource(2)">
           <i class="el-icon-plus fs-14"></i>
           试卷
          </span>
          <span class="inline-block select-class fs-14 resourceAdded" v-if="resource.paper">
           <i class="el-icon-plus fs-14"></i>
           试卷
          </span>
          <span class="inline-block select-class fs-14 model-resource-button normal-color"
          v-if="!resource.attachment" @click="addResource(3)">
           <i class="el-icon-plus fs-14"></i>
           附件
          </span>
          <span class="inline-block select-class fs-14 resourceAdded" v-if="resource.attachment">
           <i class="el-icon-plus fs-14"></i>
           附件
          </span>
          <span class="inline-block select-class fs-14 model-resource-button normal-color"
          v-if="!resource.production" @click="addResource(4)">
           <i class="el-icon-plus fs-14"></i>
           作品
          </span>
          <span class="inline-block select-class fs-14 resourceAdded" v-if="resource.production">
           <i class="el-icon-plus fs-14"></i>
           作品
          </span>
        </div>
        <div class="resource-video-paper-pro">
          <div class="resource-example-list relative" v-on:mouseenter="ng_mouse=(_index+1)" v-on:mouseleave="ng_mouse=''" v-for="(list,_index) in resourceList">
              <span class="line-block" v-show="ng_mouse==(_index+1) && ng_mouse!=''">
                <img @click="upSelectResource(_index)" v-bind:src="imgs.up_type==0?imgs.up:imgs.up_hover" v-if="_index!=0"
                 v-on:mouseenter="imgs.up_type=1"  v-on:mouseleave="imgs.up_type=0" alt="上移">
                <img  @click="downSelectResource(_index)" v-bind:src="imgs.down_type==0?imgs.down:imgs.down_hover"
                 v-on:mouseenter="imgs.down_type=1"  v-on:mouseleave="imgs.down_type=0" v-if="(_index+1)!=resourceList.length" alt="下移" >
                 <img v-bind:src="imgs.delete_type==0?imgs.delete:imgs.delete_hover" v-on:mouseenter="imgs.delete_type=1"  v-on:mouseleave="imgs.delete_type=0" alt="删除" @click="deleteResource(list.type)">
              </span>
              <div class="real-true-resource" v-if="list.type == 1">
                <p class="fs-16">视频</p>
                <div class="work-temp-top-mutil-select-item inline-block relative added-resource-show" v-if="list.name!=''">
                  <span class="wtt-msi-name fl tof">{{list.name}}</span>
                  <div class="wtt-msi-icon fl relative">
                   <img src="static/img/search-cancel.0dfb6a3.png" @click="list.name=''" alt="cancel" class="absolute">
                  </div>
                  <router-link :to="{ path: '/classTask/detail/video', query: { id: list.id,isNew:'true' }}" target="_blank"><span class="absolute fs-16 TH-f-c-link">查看</span></router-link></router-link>
                </div>
                <div class="nedd-add-to-model fs-14" v-if="list.name==''">
                  <img src="~assets/imgs/classTask/add-.png" alt="添加视频" @click="addVideoSource">
                  <p>请添加视频</p>
                </div>

              </div>
              <div class="real-true-resource" v-if="list.type == 2">
                <p class="fs-16">试卷</p>
                <div class="work-temp-top-mutil-select-item inline-block relative added-resource-show" v-if="list.name!=''">
                  <span class="wtt-msi-name fl tof">{{list.name}}</span>
                  <div class="wtt-msi-icon fl relative">
                   <img src="static/img/search-cancel.0dfb6a3.png" @click="list.name=''" alt="cancel" class="absolute">
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
                <!-- <div class="inline-block">
                  <span>解析公布时间：</span>
                  <el-date-picker
                      v-model="list.openTime"
                      type="datetime"
                      @change=""
                      placeholder="" format="yyyy-MM-dd HH:mm">
                  </el-date-picker>
                </div> -->
              </div>
                <div class="nedd-add-to-model fs-14" v-if="list.name==''">
                  <img src="~assets/imgs/classTask/add-.png" alt="添加试卷" @click="addPaperSource">
                  <p>请添加试卷</p>
                </div>
              </div>
              <div class="real-true-resource" v-if="list.type == 3">
                <p class="fs-16">附件</p>
                <div class="work-temp-top-mutil-select-item inline-block relative added-resource-show" v-if="list.name!=''">
                  <span class="wtt-msi-name fl tof">{{list.name}}</span>
                  <div class="wtt-msi-icon fl relative">
                   <img src="static/img/search-cancel.0dfb6a3.png" @click="list.name=''" alt="cancel" class="absolute">
                  </div>
                </div>
                <div class="nedd-add-to-model fs-14" v-if="list.name==''">
                  <el-upload
                    class="upload-demo"
                    :action="tempAddAtt"
                    :on-preview="handlePreviewAttachment"
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
              <div class="real-true-resource" v-if="list.type == 4">
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
           v-model="temp.taskDetail"></textarea>
          <!-- 上一步  提交 -->
          <div class="pre-button-and-submit">
              <!-- <span class="inline-block fs-16 button-default" @click="preModelBtn">上一步</span> -->
              <span class="inline-block fs-16 button-default fr" @click="pubSaveTemp">发布</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <el-dialog :visible.sync="dialogFormVisibleModel" custom-class="dialog-edit-grade choose-now-added-model Add-resource-top">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span v-if="resource.type==1">添加视频</span>
        <span v-if="resource.type==2">添加试卷</span>
      </div>
      <div class="all-classes-list">
        <div class="work-temp-top clear">
          <!-- 筛选视频 -->
          <div class="TH-card wtt-choice TH-f-c-default ta-c fs-20 cp fl" v-if="resource.type==1"  @click="tree_open=!tree_open">
            <img src="static/img/shaixuan.eaa658a.png" alt="shaixuan" class="wtt-choice-icon"> 
            <span>知识点筛选</span>
          </div>
          <div class="TH-card wtt-search TH-f-c-default fs-16 cp fl">
            <p class="TH-f-c-fade fs-14 wtt-search-label">关键字搜索</p>
            <div class="wtt-search-main relative">
              <input type="text" placeholder="请输入关键字..." class="otl-none wtt-search-main-input" v-model='paper.text_name'>
              <img src="static/img/search.0bf591d.png" alt="search" class="wtt-search-main-icon absolute" @click="searchVideoPaperName">
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
          type="mutil"
          @choiceDeactive="removeSelect($event)"
          @choiceActive="handleChoice($event)"
          @closeSelect="tree_open = false">
        </mutil-select>
        <div class="list-added-knowlege">
          <div v-if="activityOption.choosenActivity[0].label!=''" v-for="(bar, $index) in activityOption.choosenActivity" class="work-temp-top-mutil-select-item inline-block relative">
            <span  class="wtt-msi-name fl tof fs-14">{{bar.label}}</span>
            <div class="wtt-msi-icon fl relative">
              <img  src="static/img/search-cancel.0dfb6a3.png" alt="cancel" class="absolute" @click="removeSelect(bar, $index)">
            </div>
          </div>
        </div>
        <div class="work-temp-top">
          <div class="fs-18 fwb" v-if="resource.type==1">
            <!-- <span :class="{'active':choose_K==0}" @click="changeChoose_K(0)">全部</span> -->
            <span :class="{'active':choose_K==1}" @click="changeChoose_K(1)">我的视频</span>
            <span :class="{'active':choose_K==2}" @click="changeChoose_K(2)">收藏视频</span>
            <span :class="{'active':choose_K==3}" @click="changeChoose_K(3)">已购视频</span>

          </div>
          <div class="fs-18 fwb" v-if="resource.type==2">
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
        <el-button type="primary" @click="closeVideoAlert">确 定</el-button>
        <el-button @click="dialogFormVisibleModel = false">取 消</el-button>
      </div>
      <div slot="footer" class="dialog-footer"  v-if="resource.type==2">
        <el-button type="primary" @click="closePaperAlert" >确 定</el-button>
        <el-button @click="dialogFormVisibleModel = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 上传到资源超市 -->
    <el-dialog :visible.sync="dialogFormVisibleUploadMall"  custom-class="dialog-edit-grade choose-now-added-model upload-model-to-mall" top="30%" :close-on-click-modal="false" :close-on-press-escape="false" @close="$router.push('/personalSource/taskTemplate')">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>同步上传到资源超市</span>
      </div>
      <div class="upload-mall-resource">
        <p class="fs-20 fwb">组装成功！</p>
        <p class="fs-16">是否同步上传至资源超市进行售卖？</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadToMall" >是</el-button>
        <el-button @click="$router.push('/personalSource/my/taskTemplate')">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ADDRESS,HEAD } from '../../helpers/address'
import { callLoading, callToast, deepClone, callMimeTypeCheck} from '../../helpers/helper'
import mutilSelect from '../../components/mutilSelect'

export default {
  name: 'PersonalSourceTaskTemplateGenerate',
  components: {
    'mutil-select':mutilSelect
  },
  // store: ['paper'],
  computed: {
    selectOption() {
      return deepClone(this.$store.tree)
    }
  },
  data () {
    return {
      tempAddAtt: ADDRESS.Add_UPLOAD_ATTACHMENT,
      dialogFormVisibleModel:false,
      dialogFormVisibleUploadMall:false,
      // selectOption: deepClone(this.$store.selectvideo.dataList),
      input_value:'',
      resource:{
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
      markRrr:[],
      resourceList:[],
      ng_mouse:'',
      modul:{//视频 试卷  附件ID
        videoId:'',
        paperId:'',
        attachmentId:''
      },
      temp:{
        activity:'',
        title:'',
        taskDetail:''
      },
      modelArr:[],
      choose_K:1,
      restaurants: [],
      paper:{
        searchType:2,
        text_name:''
      },
      tree_open:false,
      activityOption: {
        choosenActivity: [],
        knowledgeIds: [],
        query:1
      },
      stroageData:[],
      scoreStandardSum:0,
      activityName:'',
      uploadId:''
    }
  },
  created () {
    this.stroageData = JSON.parse(localStorage.getItem("FF_ITEMS"))
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    uploadToMall(){
      this.$router.push({path:'/personalSource/uploadMall',
      query:{id:this.uploadId,type:'temp',name:this.temp.title}})
    },
    handleChoice(ev) {
      this.activityOption.choosenActivity.push(ev)
      this.activityOption.knowledgeIds.push(ev.id)
      this.getVideoList()
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
      this.getVideoList()
      const _si = item.selectIndex
      this.selectOption[_si[0]].children[_si[1]].children[_si[2]].children[_si[3]].open = false
    },
    loadAll() {
      return []
    },
    nextSearch(_text){
      this.paper.text_name = _text
      this.getVideoList()
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurantsBeforTask;
      var results = [];
      this.$http.get(ADDRESS.SEARCH_ACTIONS_NAME,{
        params:{name :queryString}
      })
      .then((res) => {
        if (res.body.code == 1) {
          res.body.data.list.forEach(function(item){
            results.push({id:item.id,value:item.name})
          })
        }else if (res.body.code == 404){
          callToast('没有搜索到活动','warning')
        }
      }, (err) => {
        // this.$message.error('搜索失败');
      })
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.activityName = item.value
      this.temp.activity = item.id
    },
    addResource(tt){
      if(tt == 1){
        this.resource.video = true;
        this.resourceList.push({
          type:1,
          id:'',
          name:''
        });
      }else if(tt == 2){
        this.resource.paper = true;
        this.resourceList.push({
          type:2,
          id:'',
          name:'',
          timeLimit:0,
          answerLimit:0
        });
      }else if(tt == 3){
        this.resource.attachment = true;
        this.resourceList.push({
          type:3,
          id:'',
          name:''
        });
      }else{
        this.resource.production = true;
        this.resourceList.push({
          type:4,
          id:'',
          name:'',
          scoreStandard:[]
        });
      }
    },
    deleteResource(type){
      for(var i=0;i<this.resourceList.length;i++){
        if(this.resourceList[i].type == type){
          this.resourceList.splice(i,1);
          if(type == 1){
            this.resource.video = false;
          }else if(type == 2){
            this.resource.paper = false;
          }else if(type == 3){
            this.resource.attachment = false;
          }else{
            this.resource.production = false;
          }
        }
      }
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
      item.splice(_index,1);
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
      console.log(_this.task.animate_model_sec)
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
    handleCheckedCitiesChange(value) {
     for(var i=0;i<this.resourceList.length;i++){
        if(this.resourceList[i].type == 4){
          this.resourceList[i].format = this.checkedCities+',';
        }
      }
    },
    addVideoSource(){
      this.choose_K = 1
      this.paper.text_name = ''
      this.getVideoList();
      this.resource.video = true;
      this.dialogFormVisibleModel = true;
      this.resource.type = 1;
    },
    addPaperSource(){
      this.choose_K = 1
      this.paper.text_name = ''
      this.getPapersLists();
      this.resource.paper = true;
      this.resource.type = 2;
      this.dialogFormVisibleModel = true;
    },
    searchVideoPaperName(){
      if(this.resource.type==1){
        this.getVideoList()
        if(this.stroageData.length == 5){
          this.stroageData = this.stroageData.slice(0,4)
        }
        this.stroageData.push({text:this.activityOption.videoName})
        localStorage.setItem('FF_ITEMS',JSON.stringify(this.stroageData))
      }else{
        this.getPapersLists()
      }
    },
    changeChoose_K(_this){
      this.choose_K = _this
      this.paper.text_name = ''
      if(this.resource.type == 1){
        if(_this==0){
          this.activityOption.query = ''
        }
        else if(_this < 3){
          this.activityOption.query = _this
        }
        else if(_this == 3){
          this.activityOption.query = 5
        }
        this.getVideoList()
      }else{
          this.paper.searchType = _this + 1
          this.getPapersLists()
      }
    },
    getVideoList(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_VIDEO_BY_CONDITION,{
        knowledgeIds:this.activityOption.knowledgeIds,
        videoName:this.paper.text_name,
        query:this.activityOption.query
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.modelArr = [];
          for(var i=0;i<res.body.data.list.length;i++){
            this.modelArr.push({
              value:res.body.data.list[i].videoName+' -- 作者：'+res.body.data.list[i].createrName+'   时间：'+res.body.data.list[i].updateTime,
              type:false,
              id:res.body.data.list[i].videoId,
              _type:1
            })
          }
        }else{
          // callToast('没有你需要的试卷呢！','warning')
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
        keyword:this.paper.text_name
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.modelArr = [];
          for(var i=0;i<res.body.data.list.length;i++){
            this.modelArr.push({
              value:res.body.data.list[i].paperTitle+' -- 作者：'+res.body.data.list[i].author+'   时间：'+res.body.data.list[i].updateTime,
              type:false,
              id:res.body.data.list[i].paperId,
              _type:2
            })
          }
        }else{
          // callToast('没有你需要的试卷呢！','warning')
          this.modelArr = []
        }
      }, (err) => {
        callLoading.deactiveLoading()
        // this.$message.error('获取试卷列表失败');
        callToast('获取试卷列表失败','error')
      })
    },
    getPapersLists(){
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_PAPER_ALL_LISTS,{
        searchType : this.paper.searchType,
        keyword:this.paper.text_name
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.modelArr = [];
          for(var i=0;i<res.body.data.list.length;i++){
            this.modelArr.push({
              value:res.body.data.list[i].paperTitle+' -- 作者：'+res.body.data.list[i].author+'   时间：'+res.body.data.list[i].updateTime,
              type:false,
              id:res.body.data.list[i].paperId,
              _type:2
            })
          }
        }else{
          this.modelArr = []
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('获取列表失败','error')
      })
    },
    checkSelectModel(item){
      this.selectedModel = [];
      this.selectedModel[0] = item.value;
      if(item._type==1){
        for(var i=0;i<this.resourceList.length;i++){
          if(this.resourceList[i].type==1){
            this.resourceList[i].id = item.id
            this.resourceList[i].name = item.value
          }
        }
      }else if(item._type ==2){
        for(var i=0;i<this.resourceList.length;i++){
          if(this.resourceList[i].type==2){
            this.resourceList[i].id = item.id
            this.resourceList[i].name = item.value
          }
        }
      }
    },
    uploadOtherFu(response, file, fileList){
      for(var i=0;i<this.resourceList.length;i++){
        if(this.resourceList[i].type==3){
          this.resourceList[i].id = response.data
          this.resourceList[i].name = file.raw.name
        }
      }
    },
    closeVideoAlert(){
      this.dialogFormVisibleModel = false;
    },
    closePaperAlert(){
      this.dialogFormVisibleModel = false;
    },
    pubSaveTemp(){
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
        if(this.temp.title==''){
          callToast('未填写任务模板名称','warning')
          return
        } 
        if(this.temp.activity==''){
          callToast('请选择活动','warning')
          return
        }
        if(this.resourceList.length==0){
          callToast('请上传资源','warning')
          return
        } 
        if(this.temp.taskDetail==''){
          callToast('描述不能空着哦','warning')
          return
        } 
        else{
          var open = true;
          for(var i=0;i<this.resourceList.length;i++){
            this.resourceList[i].order = (i+1)
            // this.resourceList[i].name = ''
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
              }else{
                open = true;
              }
            }
          }
          if(open&&_real){
            for(var i=0;i<this.resourceList.length;i++){
              this.resourceList[i].order = (i+1);
            };
            callLoading.activeLoading()
            this.$http.post(ADDRESS.PUBLISH_TEMP_SAVE,{
              content:JSON.stringify(this.resourceList),
              title:this.temp.title,
              activityId :this.temp.activity,
              // activityName :this.temp.activity,
              description :this.temp.taskDetail
            })
            .then((res) => {
              if (res.body.code == 1) {
                callLoading.deactiveLoading();
                this.uploadId = res.body.data
                this.dialogFormVisibleUploadMall = true
                //this.$router.push('/personalSource/taskTemplate')
              }
              else {
                callToast(res.body.message,'error')
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
    handlePreviewAttachment(file){
      console.log(file)
    },
    beforeUploadFile(file) {
      console.log(file)
      const type =  ['pdf','txt','doc','docx','xls', 'xlsx','ppt','pptx','jpg','jpeg','png']
      return callMimeTypeCheck(file, type)
    }
  }
}
</script>

<style scoped>
.container{
  width: 17rem;
  margin: 0 auto;
}

.normal-pad-min{
  padding: .05rem .05rem;
}

.normal-color{
  color:#535353;
}

.disable-color{
  color:#878787;
}

.d-normal-style{
  border-radius: .04rem;
  background-color: rgba(255,255,255,.8);
  box-shadow: 0 .02rem .05rem rgba(2,22,37,.3);
}

.add-template-about-task-name{
  width: 4.5rem;
  min-height: 2rem;
}

.add-template-about-task-name ul{
  margin:.25rem .15rem 0 .15rem;
}

.add-template-about-task-name ul li{
  margin-bottom: .25rem;
}

.add-template-about-task-name ul li p{
  margin-bottom: .1rem;
}

.add-template-about-task-name ul li input{
  height: .4rem;
  line-height: .38rem;
  border:1px solid #ddd;
  padding-left: .1rem;
  width: 4.1rem;
}

.add-template-about-task-content{
  width: 9.7rem;
  min-height: 3.5rem;
  margin-left: .45rem;
  padding-bottom: .2rem;
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
  padding-left: .1rem;
  padding-right: .2rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(129,129,129,.5);
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
  background-image:linear-gradient(top, #d4d3d3, #f8f8f8);
}

span.production-add-grade:hover{
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
  background-image: linear-gradient(to top, #37c796, #08af95);
}

.pre-button-and-submit span:last-child:hover{
  box-shadow: 0 1px 2px rgba(2,22,37,.3);
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
  background-image: linear-gradient(to bottom, #e0e0e0, #fff);
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
  width: 1.9rem;
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
    width: 1.6rem;
    padding: 0 .1rem;
    text-align: center;
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

.el-date-editor--datetime{
  border-bottom:none;
  border:1px solid #ddd !important;
}

.work-temp-top-mutil-select-item span.TH-f-c-link{
  right: -.4rem;
  display: inline-block;
  cursor: pointer;
}
</style>
