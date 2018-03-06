<template>
  <div class="container">
    <div v-show="!WORD_PREVIEW">
      <div class="upload-test-question-title fs-22 disable-color fwb">
        <span :class="{'titleActive':selecType==1}" @click="selecType=1">单选题</span>
        <span :class="{'titleActive':selecType==2}" @click="selecType=2">判断题</span>
        <span :class="{'titleActive':selecType==3}" @click="selecType=3">Word操作题</span>
      </div>
      <div class="upload-test-question-content clear">
        <div class="upload-test-question-content-left default-style fl" v-if="FIRST_STEP">
          <div
          class="upload-test-question-content-select">
            <div 
              class="add-knowleges fs-16" 
              @click="activityOption.showChoiceFlag = !activityOption.showChoiceFlag">选择知识点</div>
            <mutil-select 
              class="work-temp-top-mutil-select absolute"
              v-if="activityOption.showChoiceFlag"
              :selectList="selectOption"
              type="mutil"
              @choiceDeactive="removeSelect($event)"
              @choiceActive="handleChoice($event)"
              @closeSelect="activityOption.showChoiceFlag = false" />
            <!-- 已添加知识点列表 -->
            <!-- <div v-if="activityOption.choosenActivity[0].label!=''" v-for="(bar, $index) in activityOption.choosenActivity" class="work-temp-top-mutil-select-item inline-block relative">
              <span  class="wtt-msi-name fl">{{bar.label}}</span>
              <div class="wtt-msi-icon fl relative">
                <img  src="static/imgs/classTask/search-cancel.png" alt="cancel" class="absolute" @click="removeSelect(bar, $index)">
              </div>
            </div> -->
              <div v-for="(bar, $index) in activityOption.choosenActivity" class="work-temp-top-mutil-select-item inline-block relative" v-if="activityOption.choosenActivity.length>0">
                <span class="wtt-msi-name fl">{{bar.label}}</span>
                <div @click="removeSelect(bar, $index)" class="wtt-msi-icon fl relative">
                  <img class="absolute" src="~assets/imgs/classTask/search-cancel.png" alt="cancel">
                </div>
              </div>
             <!-- 题类 -->
            <div class="all-test-question-type">
              <div v-if="selecType==3">
                <div class="inline-block">
                  <p class="fs-16 t_nav_color">题类：</p>
                  <my-dropdown @choosed="handleDrop('examType',$event,3)" :dropdownData="$store.dropdown.examTypeNo" />
                </div>
                <div class="inline-block">
                  <p class="fs-16 t_nav_color">难度：</p>
                  <my-dropdown @choosed="handleDrop('difficult',$event,3)" :dropdownData="$store.dropdown.diffcultNo" />
                </div>
                <div class="inline-block">
                  <p class="fs-16 t_nav_color">是否公开：</p>
                  <div>
                    <el-radio class="radio" v-model="radio4"  label="1">是</el-radio>
                    <el-radio class="radio" v-model="radio4"  label="2">否</el-radio>
                  </div>
                </div>
              </div>
              <div v-if="selecType==1 || selecType==2">
                <div class="inline-block">
                  <p class="fs-16 t_nav_color">题型：</p>
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link" v-if="selecType==1">
                      单选题
                      <i class="el-icon-caret-bottom el-icon--right"/>
                    </span>
                    <span class="el-dropdown-link" v-if="selecType==2">
                      判断题
                      <i class="el-icon-caret-bottom el-icon--right"/>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="1">单选题</el-dropdown-item>
                      <el-dropdown-item command="2">判断题</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="inline-block">
                  <p class="fs-16 t_nav_color">题类：</p>
                  <my-dropdown @choosed="handleDrop('examType',$event,1)" :dropdownData="$store.dropdown.examTypeNo" />
                </div>
                <div class="inline-block">
                  <p class="fs-16 t_nav_color">难度：</p>
                  <my-dropdown @choosed="handleDrop('difficult',$event,1)" :dropdownData="$store.dropdown.diffcultNo" />
                </div>
              </div>
              <!-- 分数 公开与否 -->
              <div v-if="selecType==1 || selecType==2"> 
                <div class="upload-test-question-grade" >
                  <div class="inline-block">
                    <p class="fs-16 t_nav_color">建议分数：</p>
                    <div>
                      <input type="text" name="" v-model="questionInfo.referenceScore">
                      <span class="d-f-a-t-c">分</span>
                    </div>
                  </div>
                  <div class="inline-block">
                    <p class="fs-16 t_nav_color">是否公开：</p>
                    <div>
                      <el-radio class="radio" v-model="radio" label="1">是</el-radio>
                      <el-radio class="radio" v-model="radio" label="2">否</el-radio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="upload-test-question-content-right default-style fr" v-if="FIRST_STEP">
          <!--选择题和判断题-->
          <ul 
            class="fs-16 upload-quesition-all-message" 
            v-if="selecType==1 || selecType==2">
            <li>
              <!-- <p class="t_nav_color">题干：<span class="fr fs-13">不超过xx字</span></p> -->
              <editor-new :z-index="2" @change="updateDataTitle" :content="questionInfo.questionText" :height="160" :auto-height="true" ref="editor2"></editor-new>
            </li>
            <li>
              <p class="t_nav_color">选项：</p>
              <div class="list-answer-show-example" v-for="(item,$index) in select" v-show="selecType==1">
                <span>{{item.type}}</span>
                <input type="text" v-model="item.text"/>
                <img src="~assets/imgs/source/add-choice.png" alt="增加选项" @click="addMoreSeclect($index)" v-show="select.length<6">
                <img src="~assets/imgs/source/delete-choice.png" alt="删除选项" v-show="$index>1" @click="deleteMoreSeclect($index)">
              </div>
              <div class="list-answer-show-example" v-show="selecType==2">
                <span>A</span>
                正确
              </div>
              <div class="list-answer-show-example" v-show="selecType==2">
                <span>B</span>
                错误
              </div>
            </li>
            <li>
              <p class="t_nav_color">答案：</p>
              <el-radio-group v-model="radio2">
                <el-radio :label="1">A</el-radio>
                <el-radio :label="2">B</el-radio>
                <el-radio :label="3" v-show="select.length>2&&selecType==1">C</el-radio>
                <el-radio :label="4" v-show="select.length>3&&selecType==1">D</el-radio>
                <el-radio :label="5" v-show="select.length>4&&selecType==1">E</el-radio>
                <el-radio :label="6" v-show="select.length>5&&selecType==1">F</el-radio>
              </el-radio-group>
            </li>
            <li>
              <!-- <vue-editor id="editor"
                ref="editor"
              v-model="questionInfo.analysis">
            </vue-editor> -->
              <!-- <p class="t_nav_color">解析：<span class="fr fs-13">不超过xx字</span></p> -->
              <editor-new ref="editor" @change="updateDataAns" :content="questionInfo.analysis" :height="160" :auto-height="true"></editor-new>
            </li>
          </ul>
          <!--word操作题-->
          <ul
            class="fs-16 upload-quesition-all-message" 
            v-if="selecType==3">
            <li>
              <p class="t_nav_color"><span class="TH-f-c-red">*</span>上传源文件：</p>
              <div class="upload-word-box relative">
                <el-upload 
                  class="upload-demo"
                  :action="UPLOAD_FILE"
                  :on-preview="handlePreview"
                  :on-progress="uploadBeforeFile"
                  :on-remove="handleFileRemove"
                  :on-success="uploadOriginFile"
                  :before-upload="beforeFileOneUpload"
                  :class="{'down-small-height':!uploadFile}"
                >
                <i class="fa fa-paperclip" aria-hidden="true"></i>
                <span type="button" class="upload-word-button">点击上传源文件（限制格式为：doc）</span>
                </el-upload>
              </div>
            </li>
            <li>
              <p class="t_nav_color"><span class="TH-f-c-red">*</span>上传标准答案：</p>
              <div class="upload-word-box relative">
                <el-upload 
                  class="upload-demo"
                  :action="UPLOAD_FILE"
                  :on-preview="handlePreview"
                  :on-progress="uploadBeforeAnswer"
                  :on-remove="handleAnswerRemove"
                  :on-success="uploadAnswerFile"
                  :before-upload="beforeFileOneUpload"
                  :class="{'down-small-height':!uploadAnswer}"
                >
                <i class="fa fa-paperclip" aria-hidden="true"></i>
                <span type="button" class="upload-word-button">点击上传标准答案文件（限制格式为：doc）</span>
                </el-upload>
              </div>
            </li>
            <li>
              <p class="t_nav_color">上传其它材料：</p>
              <div class="upload-word-box relative">
                <el-upload 
                  class="upload-demo"
                  :action="UPLOAD_JPG"
                  :on-preview="handlePreview"
                  :on-progress="uploadBeforeJpg"
                  :on-remove="handleJpgRemove"
                  :on-success="uploadImgFile"
                  :before-upload="beforeFileImgUpload"
                  :class="{'down-small-height':!uploadJpg}"
                >
                <i class="fa fa-paperclip" aria-hidden="true"></i>
                <span type="button" class="upload-word-button">点击上传其它材料（限制格式为：jpg）</span>
                </el-upload>
              </div>
            </li>
            <li>
              <p class="t_nav_color">添加解析：</p>
              <!-- <el-radio-group v-model="radio3">
                <el-radio :label="1">上传视频+文字解析</el-radio>
                <el-radio :label="2">只上传视频解析</el-radio>
                <el-radio :label="3">只上传文字解析</el-radio>
              </el-radio-group>  -->
  
              <!-- <div class="upload-word-box" v-if="radio3==1 || radio3==2">
                <el-upload 
                  class="upload-demo"
                  :action="UPLOAD_FILE"
                  :on-preview="handlePreview"
                  :on-progress="uploadBeforeFile"
                  :on-remove="handleFileRemove"
                  :on-success="uploadVideoFile"
                  :before-upload="beforeFileVideoUpload"
                >
                <i class="fa fa-paperclip" aria-hidden="true"></i>
                <span type="button" class="upload-word-button">点击上传视频文件（限制格式为：mp4、wmv/avi）</span>
                </el-upload>
              </div> -->
            </li>
            <li>
              <editor-new :z-index="2" @change="updateDataWordAns" :content="wordQuestionCommit.analysis" :height="160" :auto-height="true" ref="editor2"></editor-new> 
            </li>
          </ul>
        </div>
        <!--word操作题第二步-->
        <div v-if="!FIRST_STEP">
          <div class="upload-test-question-content-left-second default-style fl" >
            <div class="test-question-info">
              <p class="test-question-title fs-16">{{ activityOption.choosenActivity[0].label }}</p>
              <p class="fs-16 t_nav_color">知识点</p>
            </div>
            <div class="test-question-info">
              <p class="test-question-title fs-16">{{ $store.dropdown.examType[wordQuestionCommit.examType].text }}</p>
              <p class="fs-16 t_nav_color">题型</p>
            </div>
            <div class="test-question-info">
              <p class="test-question-title fs-16">{{ $store.dropdown.diffcultNo[wordQuestionCommit.difficultIndex].text }}</p>
              <p class="fs-16 t_nav_color">难度</p>
            </div>
            <div class="test-question-info">
              <p class="test-question-title fs-16">{{ radio4=="1"?'是':'否' }}</p>
              <p class="fs-16 t_nav_color">是否公开</p>
            </div>
          </div>
          <div class="second-content-right fr" >
            <div class="test-question-right-info-box default-style">
              <div class="test-question-right-info-title">
                <span>大题</span>
                <span class="test-question-info-title-score">当前总分：<span class="TH-f-c-red">{{getTotal(updateContentList,'topic')}}</span></span>
              </div>
              <div class="test-question-right-info-content">
                <p class="fs-18">{{ contentList.text }}</p>
              </div>
            </div>
            <div class="test-question-right-info-box default-style" v-for="(item,$index) in updateContentList" :key="$index">
              <div class="test-question-right-info-title">
                <span>小题{{ $index+1 }}</span>
                <span class="test-question-info-title-score">小题总分：{{ getTotal(item,'point') }}</span>
                <div class="fr">
                  <span class="TH-f-c-blue cp" v-if="$index>0" @click="moveUp(item,$index,updateContentList)">上移</span>
                  <span class="TH-f-c-blue cp" v-if="$index < (updateContentList.length-1)" @click="moveDown(item,$index,updateContentList)">下移</span>
                  <span class="TH-f-c-blue cp" @click="deleteTopicItem(item,$index,updateContentList)">删除</span>
                </div>
              </div>
              <div class="test-question-right-info-content">
                <p class="fs-16">{{ item.text }}</p>
                <div class="small-topic">
                  <p class="small-topic-title fs-14">公共题面：<span class="TH-f-c-blue">{{item.text | getText}}</span></p>
                  <div class="small-topic-point relative" v-for="($item,$idx) in item.scoringPoints" :key="$idx">
                    <p>
                      <span class="small-topic-score"><input type="number" class="inputScore" v-model="$item.score" min="0" max="10">分</span>
                      考点：{{$item.action.msActionType.typeContent}}
                    </p>
                    <p class="small-topic-info">对应题面：{{$item.action.actionPre+"："+$item.action.msActionType.typeContent}}</p>
                    <div class="controller-box">
                      <span class="cp" v-if="$idx>0" @click="moveUp($item,$idx,item.scoringPoints)">上移</span>
                      <span class="cp" v-if="$idx<(item.scoringPoints.length-1)" @click="moveDown($item,$idx,item.scoringPoints)">下移</span>
                      <span class="cp" @click="deletePointItem($item,$idx,item.scoringPoints,item)">删除</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--未添加的考点-->
              <div class="point-box">
                <div>
                  <span>未添加的考点：</span>
                  <div v-if="item.deletePoints.length!=0" class="inline-block">
                    <span class="unAddPoint inline-block" v-for="(ii,idx) in item.deletePoints" :key="idx" @click="addPoint(ii,idx,item)">
                      {{ii.action.msActionType.typeContent}}
                    </span>
                  </div>
                  <div class="inline-block" v-if="item.deletePoints.length==0">
                    考点已全部添加
                  </div>
                </div>
              </div>
            </div>
            <!--继续添加小题-->
            <div class="default-style add-topic-box cp" v-if="deleteTopicList.length!==0" @click="addSmallTopic">
              <img src="~assets/imgs/source/add-activity.png" alt="添加小题">
              <p>继续添加小题</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <p @click="addSomeItem()">加点料</p> -->
      <!-- upload button -->
      <div class="upload-test-question-click" v-if="FIRST_STEP">
        <input @click="uploadQuestion()" type="button" value="确认上传" class="fs-16" v-if="selecType==1 || selecType==2">
        <input @click="uploadWord()" type="button" value="下一步" class="fs-16" v-if="selecType==3">
      </div>
      <div class="upload-test-question-click" v-if="!FIRST_STEP">
        <input type="button" value="上一步" class="primary fl fs-16" @click="FIRST_STEP=true">
        <input type="button" value="预览" class="fs-16" @click="WORD_PREVIEW=true">
        <input type="button" value="发布" class="fs-16" @click="saveWord">
      </div>
    </div>
    <div v-if="WORD_PREVIEW">
      <div class="word-preview-content default-style">
        <div class="word-preview-info">
          <p>{{ contentList.text }}：（共{{ contentList.score }}分）</p>
          <p v-for="(item,index) in updateContentList" :key="index">
            （{{index+1}}） {{item.text | getText}}：
            <span v-for="($item,$index) in item.scoringPoints" :key="$index">{{$item.action.msActionType.typeContent}}，</span>
            <span>（{{item.score}}分）</span>
          </p>
        </div>
        <div class="word-preview-other">
          <span>知识点：<span>{{ activityOption.choosenActivity[0].label }}</span></span>
          <div class="fr word-preview-other-info">
            <span>题型：<span>word操作题</span></span>
            <span>题类：<span>{{ $store.dropdown.examType[wordQuestionCommit.examType].text }}</span></span>
            <span>难度：<img v-for="i in wordQuestionCommit.difficultIndex" src="~assets/imgs/common/collected.png" alt="fav"></span>
          </div>
        </div>
        <div class="analysisBox">
          <p><span class="TH-f-c-blue">解析：</span><span v-html="wordQuestionCommit.analysis"></span></p>
          <!-- <div class="vedio-box">
            視頻
          </div> -->
        </div>
      </div>
      <p class="unAdd-Point">未添加的考点：
        <span v-for="(item,index) in updateContentList" :key="index">
          <span v-for="ii in item.deletePoints">{{ ii.action.msActionType.typeContent }}</span>
        </span>
      </p>
      <div class="word-preview-button-box">
        <span class="cp" @click="WORD_PREVIEW=false">返回编辑</span>
        <span class="cp" @click="saveWord">直接发布</span>
      </div>
    </div>
  </div>
</template>

<script>
import mutilSelect from "../../components/mutilSelect";
import myDropdown from "../../components/myDropdown";
import { ADDRESS, HEAD } from "../../helpers/address";
import {
  callLoading,
  callToast,
  deepClone,
  callMimeTypeCheck
} from "../../helpers/helper";
import VueHtml5Editor from "vue-html5-editor";
// import { VueEditor } from 'vue2-editor'
const editorNew = new VueHtml5Editor({
  // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
  // if set true,will append module name to toolbar after icon
  showModuleName: false,
  // 自定义各个图标的class，默认使用的是font-awesome提供的图标
  // custom icon class of built-in modules,default using font-awesome
  icons: {
    text: "fa fa-pencil",
    color: "fa fa-paint-brush",
    font: "fa fa-font",
    align: "fa fa-align-justify",
    list: "fa fa-list",
    link: "fa fa-chain",
    unlink: "fa fa-chain-broken",
    tabulation: "fa fa-table",
    image: "fa fa-file-image-o",
    // hr: "fa fa-minus",
    // eraser: "fa fa-eraser",
    undo: "fa-undo fa"
    // "full-screen": "fa fa-arrows-alt",
    // info: "fa fa-info",
  },
  // 配置图片模块
  // config image module
  image: {
    // 文件最大体积，单位字节  max file size
    sizeLimit: 512 * 1024,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    upload: {
      url: ADDRESS.UP_LOAD_IMG,
      headers: {},
      params: {},
      fieldName: {}
    },
    // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
    // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
    // set null to disable compression
    compress: false,
    // 响应数据处理,最终返回图片链接
    // handle response data，return image url
    uploadHandler(responseText) {
      //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
      var json = JSON.parse(responseText);
      if (json.code == 1) {
        return HEAD + json.data;
      } else {
        alert(json.msg);
      }
    }
  },
  // 语言，内建的有英文（en-us）和中文（zh-cn）
  //default en-us, en-us and zh-cn are built-in
  language: "zh-cn",
  // 自定义语言
  i18n: {
    //specify your language here
    "zh-cn": {
      align: "对齐方式",
      image: "图片",
      list: "列表",
      link: "链接",
      unlink: "去除链接",
      table: "表格",
      font: "文字",
      "full screen": "全屏",
      text: "排版",
      eraser: "格式清除",
      info: "关于",
      color: "颜色",
      "please enter a url": "请输入地址",
      "create link": "创建链接",
      bold: "加粗",
      italic: "倾斜",
      underline: "下划线",
      "strike through": "删除线",
      subscript: "上标",
      superscript: "下标",
      heading: "标题",
      "font name": "字体",
      "font size": "文字大小",
      "left justify": "左对齐",
      "center justify": "居中",
      "right justify": "右对齐",
      "ordered list": "有序列表",
      "unordered list": "无序列表",
      "fore color": "前景色",
      "background color": "背景色",
      "row count": "行数",
      "column count": "列数",
      save: "确定",
      upload: "上传",
      progress: "进度",
      unknown: "未知",
      "please wait": "请稍等",
      error: "错误",
      abort: "中断",
      reset: "重置"
    }
  },
  // 隐藏不想要显示出来的模块
  // the modules you don't want
  hiddenModules: [],
  // 自定义要显示的模块，并控制顺序
  // keep only the modules you want and customize the order.
  // can be used with hiddenModules together
  visibleModules: [
    //"text",
    // "color",
    // "font",
    // "align",
    // "list",
    // "link",
    // "unlink",
    // "tabulation",
    "image",
    // "hr",
    // "eraser",
    "undo"
    // "full-screen",
    // "info",
  ]
  // 扩展模块，具体可以参考examples或查看源码
  // extended modules
});
export default {
  name: "PersonalSourceTestQuestionUpload",
  components: {
    "mutil-select": mutilSelect,
    "my-dropdown": myDropdown,
    "editor-new": editorNew
    // 'vue-editor': VueEditor
    // VueEditor
  },
  store: ["paper"],
  computed: {
    selectOption() {
      return deepClone(this.$store.tree);
    }
  },
  data() {
    return {
      UPLOAD_FILE: ADDRESS.UPLOAD_WORD_DOC,
      UPLOAD_JPG: ADDRESS.UPLOAD_WORD_JPG,
      WORD_PREVIEW: false, //预览
      selecType: 1, //1选择题，2判断题，3操作题
      radio: "1",
      radio2: 1,
      radio3: 1, //word题解析
      radio4: "1", //word题是否公开
      FIRST_STEP: true,
      uploadFile: false,
      uploadAnswer: false,
      uploadJpg: false,
      totalScore: 20,
      select: [
        { type: "A", text: "" },
        { type: "B", text: "" },
        { type: "C", text: "" },
        { type: "D", text: "" }
      ],
      activityOption: {
        showChoiceFlag: false,
        choosenActivity: []
      },
      questionText: "",
      questionAnswer: "",
      questionInfo: {
        questionType: "", //题型
        disciplineCode: 12, //学科代码
        studySection: 1, //学段
        isObjective: true, //是否客观题
        difficultIndex: 1, //难度指数
        masterLevel: 1, //掌握程度
        questionText: "", //题干
        options: "", //答案选择项
        answer: "", //标准答案
        analysis: "", //解析
        examType: 1, //题类
        referenceScore: 5, //参考分数
        isOpen: true, //是否公开
        knowledgeIds: [] //知识点id
      },
      wordQuestionCommit: {
        disciplineCode: 12, //学科代码
        studySection: 1, //学段代码
        masterLevel: 1, //掌握程度 1考点，2重点，3难点
        isOpen: true, //是否公开
        knowledgeIds: [], //知识点ID
        difficultIndex: 1, //难度指数
        examType: 1, //题类
        documentName: "", //初始文档名称
        sourceDocumentUrl: "", //初始文档doc地址
        answerDocumentUrl: "", //标准答案doc地址
        analysis: "", //试题解析
        otherFileUrls: [] //其他材料地址
      },
      //题目信息
      contentList: {},
      previewContentList: {},
      //考点是否添加
      isPointClear: true,
      //小题列表
      updateContentList: [],
      //删除的小题列表
      deleteTopicList: [],
      //上传的源文件
      uploadOriginFile: (function(response, file, fileList) {
        this.wordQuestionCommit.documentName = file.name;
        if (response.code == 1) {
          this.wordQuestionCommit.sourceDocumentUrl = response.data.docName;
        }
      }).bind(this),
      uploadAnswerFile:(function(response, file, fileList) {
        if (response.code == 1) {
          this.wordQuestionCommit.answerDocumentUrl = response.data.docName;
        }
      }).bind(this),
      uploadImgFile:(function(response, file, fileList) {
        if (response.code == 1) {
           this.wordQuestionCommit.otherFileUrls.push(response.data);
        }
      }).bind(this),
    };
  },
  filters: {
    getText: function(value) {
      let idx = value.indexOf("：");
      return value.slice(0, idx);
    }
  },
  created() {},
  methods: {
    addSomeItem() {
      // this.$refs.editor.execCommand("insertHTML", `<input onclick="console.log('我被删除啦-_-')" type="button" style="border:none;outline:none;display:inline-block;width:80px;height:20px;line-height:20px;background:#3498db;color:#fff;text-align:center;" value="某个视频"><br><br>`)
      this.$refs.editor.execCommand(
        "insertHTML",
        `<br>
        <div style="border:2px dashed #3498db;" contenteditable="false" oncopy="alert('禁止复制！');return false;" onselectstart="return false">
        <p onclick="console.log(event.target.parentElement.remove())">删除</p>
        <p style="width:200px;height:100px;line-height:100px;background:#3498db;color:#fff;text-align:center;user-select:none; ">
        你好
        </p>
        </div>
        <br><br>`
      );
    },
    testKey(ev) {
      return false;
    },
    beforeFileOneUpload(file) {
      const type = "doc";
      if (!callMimeTypeCheck(file, type)) {
        callToast("只能上传.doc格式的word文档!", "warning");
        return false;
      } else {
        return true;
      }
    },
    beforeFileImgUpload(file) {
      const type = "jpg";
      if (!callMimeTypeCheck(file, type)) {
        callToast("只能上传JPG文件", "warning");
        return false;
      } else {
        return true;
      }
    },
    beforeFileVideoUpload(file) {
      const type = ["mp4", "wmv", "avi"];
      if (!callMimeTypeCheck(file, type)) {
        callToast("上传视频格式为mp4、wmv、avi", "warning");
        return false;
      } else {
        return true;
      }
    },
    uploadBeforeFile() {
      this.uploadFile = true;
    },
    uploadBeforeAnswer() {
      this.uploadAnswer = true;
    },
    uploadBeforeJpg() {
      this.uploadJpg = true;
    },
    
    handleFileRemove(file, fileList) {
      this.uploadFile = false;
      this.wordQuestionCommit.sourceDocumentUrl = "";
    },
    handleAnswerRemove(file, fileList) {
      this.uploadAnswer = false;
      this.wordQuestionCommit.answerDocumentUrl = "";
    },
    handleJpgRemove() {
      this.uploadJpg = false;
    },
    uploadWord() {
      if (this.questionInfo.knowledgeIds == "") {
        callToast("请添加知识点", "warning");
        return;
      }
      if (this.wordQuestionCommit.analysis == "") {
        callToast("解析不能空", "warning");
        return;
      }
      if (this.wordQuestionCommit.sourseDocumentUrl == "") {
        callToast("请上传源文件", "warning");
        return;
      }
      if (this.wordQuestionCommit.answerDocumentUrl == "") {
        callToast("请上传标准答案文件", "warning");
        return; 
      } else {
        this.wordQuestionCommit.knowledgeIds = this.questionInfo.knowledgeIds;
        this.wordQuestionCommit.isOpen = this.radio4 == "1" ? true : false;
        //console.log("提交",this.wordQuestionCommit);
         // 清除格式暂时做法
        this.wordQuestionCommit.analysis = this.wordQuestionCommit.analysis.replace(
          'style="',
          'styl="'
        );
        callLoading.activeLoading();
        this.$http
          .post(ADDRESS.WORD_QUESTION_COMMIT, this.wordQuestionCommit)
          .then(
            res => {
              callLoading.deactiveLoading();
              if (res.body.code == 1) {
                this.contentList = res.body.data;
                console.log("contentList", this.contentList);
                if(!this.contentList.scoringItems){
                  callToast("两次上传的文件相同，请检查和重新上传",'error');
                }else{
                  this.FIRST_STEP = false;
                 
                  //拷贝小题
                  this.updateContentList = deepClone(this.contentList.scoringItems);
                  for (var i = 0; i < this.updateContentList.length; i++) {
                    this.$set(this.updateContentList[i], "deletePoints", []);
                  }
                }
              }
            },
            err => {
              callLoading.deactiveLoading();
              callToast(err, "error");
            }
          );
      }
    },
    handleChoice(ev) {
      this.activityOption.choosenActivity.push(ev);
      this.questionInfo.knowledgeIds.push(ev.id);
    },
    removeSelect(item, index) {
      console.log(item);
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.questionInfo.knowledgeIds.remove(item.id);
      index = index || this.activityOption.choosenActivity.indexOf(item);
      this.activityOption.choosenActivity.splice(index, 1);
      const _si = item.selectIndex;
      // this.selectOption[_si[0]].children[_si[1]].children[_si[2]].open = false
      this.selectOption[_si[0]].children[_si[1]].children[_si[2]].children[
        _si[3]
      ].open = false;
    },
    handleCommand(command) {
      console.log(command);
      if (command == 1) {
        this.selecType = 1;
      } else {
        this.selecType = 2;
      }
    },
    submit() {
      console.log(this.questionText);
    },
    addMoreSeclect(INDEX) {
      const Arr = ["A", "B", "C", "D", "E", "F"];
      this.select.splice(INDEX + 1, 0, {
        type: Arr[INDEX + 1],
        text: ""
      });
      for (var i = 0; i < this.select.length; i++) {
        this.select[i].type = Arr[i];
      }
    },
    deleteMoreSeclect(INDEX) {
      const Arr = ["A", "B", "C", "D", "E", "F"];
      this.select.splice(INDEX, 1);
      for (var i = 0; i < this.select.length; i++) {
        this.select[i].type = Arr[i];
      }
    },
    handleDrop(type, ev, selectType) {
      if (ev == "") {
        ev = 0;
      }
      if (type == "examType") {
        if (selectType == 3) {
          this.wordQuestionCommit.examType = ev + 1;
        } else {
          this.questionInfo.examType = ev + 1;
        }
      } else if (type == "difficult") {
        if (selectType == 3) {
          this.wordQuestionCommit.difficultIndex = ev + 1;
        } else {
          this.questionInfo.difficultIndex = ev + 1;
        }
      }
    },
    uploadQuestion() {
      if (this.questionInfo.knowledgeIds == "") {
        callToast("请添加知识点", "warning");
        return;
      }
      if (this.questionInfo.questionText == "") {
        callToast("题干不能空", "warning");
        return;
      }
      if (this.select == "") {
        callToast("选项不能为空", "warning");
        return;
      }
      if (this.questionInfo.analysis == "") {
        callToast("解析不能空", "warning");
        return;
      } else {
        String.prototype.replaceAll = function(s1, s2) {
          return this.replace(new RegExp(s1, "gm"), s2);
        };
        callLoading.activeLoading();
        this.generateOption();
        this.generateAns();
        this.questionInfo.questionType = this.selecType;
        this.questionInfo.isOpen = this.radio == "1" ? true : false;
        // 清除格式暂时做法
        this.questionInfo.analysis = this.questionInfo.analysis.replace(
          'style="',
          'styl="'
        );
        this.questionInfo.questionText = this.questionInfo.questionText.replace(
          'style="',
          'styl="'
        );
        console.log(this.questionInfo.analysis);
        this.$http
          .post(ADDRESS.TEACHER_UPLOAD_TESTQUESTION, this.questionInfo)
          .then(
            res => {
              callLoading.deactiveLoading();
              if (res.body.code == 1) {
                //callToast('恭喜你，上传成功！','success')
                this.$router.push("/personalSource/my/testQuestion");
              } else {
                callToast("上传失败！", "error");
              }
            },
            err => {
              callLoading.deactiveLoading();
              callToast("上传失败！", "error");
            }
          );
      }
    },
    updateDataTitle(data) {
      console.log(data);
      this.questionInfo.questionText = data;
    },
    updateDataAns(data) {
      this.questionInfo.analysis = data;
    },
    updateDataWordAns(data) {
      this.wordQuestionCommit.analysis = data;
    },
    generateOption() {
      let _id = [];
      let _val = [];
      for (var i = 0; i < this.select.length; i++) {
        _id.push(this.select[i].type);
        _val.push(this.select[i].text);
      }
      this.questionInfo.options = JSON.stringify(_.object(_id, _val));
      console.log(this.questionInfo.options);
    },
    generateAns() {
      const Arr = ["A", "B", "C", "D", "E", "F"];
      this.questionInfo.answer = Arr[+this.radio2 - 1];
    },
    //考点上移
    moveUp(item, index, arrList) {
      arrList.splice(index - 1, 0, arrList[index]);
      arrList.splice(index + 1, 1);
    },
    //考点下移
    moveDown(item, index, arrList) {
      //在后一项插入
      arrList.splice(index + 2, 0, arrList[index]);
      arrList.splice(index, 1);
    },
    //删除考点
    deletePointItem(item, index, arrList, source) {
      arrList.splice(index, 1);
      source.deletePoints.push(item);
      console.log("添加了删除的考点", source);
    },
    //删除小题
    deleteTopicItem(item, index, arrList) {
      arrList.splice(index, 1);
      this.deleteTopicList.push(item);
    },
    //添加考点
    addPoint(item, index, arr) {
      console.log("考点");
      console.log(item);
      arr.scoringPoints.push(item);
      arr.deletePoints.splice(index, 1);
      // if(arr.deletePoints.length==0){
      //   //this.isPointClear=true
      //   this.$delete(arr,'deletePoints');//删除对象的属性
      // }
      console.log(arr);
    },
    //添加小题
    addSmallTopic() {
      let item = this.deleteTopicList.shift();
      this.updateContentList.push(item);
      if (this.deleteTopicList.length == 0) {
        callToast("小题已添加完", "warning");
      }
    },
    //获取分数
    getTotal(item, type) {
      let score = 0;
      if (type == "point") {
        for (var i = 0; i < item.scoringPoints.length; i++) {
          score += +item.scoringPoints[i].score;
        }
        item.score = score;
      } else if (type == "topic") {
        for (var j = 0; j < item.length; j++) {
          score += +item[j].score;
        }
        this.contentList.score = score;
      }
      return score;
    },
    //保存并发布
    saveWord() {

      for (var i = 0; i < this.updateContentList.length; i++) {
          for(var j=0;j<this.updateContentList[i].scoringPoints.length;j++){
            if(this.updateContentList[i].scoringPoints[j].score>10){
              callToast('考点分不能超过10分哦','warning')
              return;
            }
            if(this.updateContentList[i].scoringPoints[j].score==0){
              callToast('考点分不能为0分哦','warning')
              return;
            }
          }
      }
      if (this.contentList.score == 0) {
        callToast("总分不能为0哦", "warning");
      }
      else{
        for(var i=0;i<this.updateContentList.length;i++){
          this.$delete(this.updateContentList[i], "deletePoints");
        }
        this.contentList.scoringItems = deepClone(this.updateContentList);
        // <p>{{ contentList.text }}：（共{{ contentList.score }}分）</p>
        //   <p v-for="(item,index) in updateContentList" :key="index">
        //     （{{index+1}}） {{item.text}}
        //     <span>（{{item.score}}分）</span>
        //   </p>
        let questionText=`<p>${this.contentList.text}：（共${this.contentList.score}分）</p>`;
        for(var i=0;i<this.updateContentList.length;i++){
          let idx = this.updateContentList[i].text.indexOf("：");
          let text= this.updateContentList[i].text.slice(0,idx);
          questionText += `<p>（${i+1}）${text}：`;
          for(var j=0;j<this.updateContentList[i].scoringPoints.length;j++){
            questionText += `<span>${this.updateContentList[i].scoringPoints[j].action.msActionType.typeContent}</span>` 
          }
          questionText+=`<span>（${this.updateContentList[i].score}分）</span></p>`
        } 
        console.log("题干", questionText);
        console.log("发出去的完整数据", this.contentList);
        let actionJson = JSON.stringify(this.contentList);
        callLoading.activeLoading();
        this.$http
          .post(ADDRESS.WORD_SAVE_ACTION, {
            questionId: this.contentList.questionId,
            referenceScore: this.contentList.score,
            actionJson: actionJson,
            questionText:questionText
          })
          .then(
            res => {
              callLoading.deactiveLoading();
              if (res.body.code == 1) {
                //callToast('发布成功','success');
                this.$router.push("/personalSource/my/testQuestion");
              } else {
                callToast("上传失败", "error");
              }
            },
            err => {
              callLoading.deactiveLoading();
              callToast("上传失败", "error");
            }
          );
      }
    },
  }
};
</script>

<style scoped>
.container {
  width: 17rem;
  margin: 0 auto;
}

.disable-color {
  color: #999;
}

.t_nav_color {
  color: #878787;
}
.d-f-a-t-c {
  color: #535353;
}

.titleActive {
  font-size: 0.32rem;
  color: #535353;
}

.upload-test-question-title span {
  margin-right: 0.3rem;
  cursor: pointer;
}

.upload-test-question-title {
  margin-bottom: 0.2rem;
  padding-left: 0.05rem;
}

.default-style {
  border-radius: 0.04rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 5px rgba(2, 22, 37, 0.3);
}

.upload-test-question-content-left {
  width: 6.6rem;
  min-height: 3.6rem;
}
.upload-test-question-content-left-second {
  width: 2.54rem;
  min-height: 3.6rem;
  text-align: center;
  padding-top: 0.3rem;
}
.upload-test-question-content-left-second p {
  line-height: 0.2rem;
  padding: 0.05rem 0;
}
.test-question-info {
  margin-bottom: 0.46rem;
}
.test-question-title {
  color: #535353;
  font-weight: bold;
}
.upload-test-question-content {
  padding: 0.05rem 0.05rem;
}

.upload-test-question-content-right {
  width: 9.9rem;
  min-height: 5rem;
}
.second-content-right {
  width: 14rem;
  color: #535353;
}
.test-question-right-info-box {
  margin-bottom: 0.15rem;
}
.test-question-right-info-title {
  background-color: #f0f0f0;
  height: 0.38rem;
  line-height: 0.38rem;
  padding: 0 0.2rem;
  color: #3283d3;
}
.test-question-right-info-content {
  padding: 0.1rem 0.2rem;
  color: #535353;
}
.small-topic {
  border: 1px dashed #bfbfbf;
  margin-top: 0.1rem;
}
.small-topic-title {
  padding: 0.1rem 0.2rem;
}
.small-topic-point {
  border-top: 1px solid #ddd;
  padding: 0.1rem 0.2rem;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
.small-topic-point:hover {
  border: 1px solid #3283d3;
}
.small-topic-point:hover .controller-box {
  display: block;
}
.small-topic-point > p {
  line-height: 0.2rem;
  padding: 0.05rem 0;
}
.small-topic-score {
  color: #3283d3;
  margin-right: 0.1rem;
}
.small-topic-info {
  margin-left: 0.8rem;
}
.controller-box {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #3283d3;
  display: none;
}
.controller-box > span {
  display: inline-block;
  width: 0.6rem;
  height: 0.4rem;
  line-height: 0.4rem;
  color: #fff;
  text-align: center;
}
.upload-test-question-content-select {
  margin: 0.25rem 0.3rem;
}

.work-temp-top-mutil-select-item {
  height: 0.35rem;
  line-height: 0.35rem;
  border-radius: 4px;
  text-align: center;
  background-color: #535353;
  box-shadow: 0 1px 2px rgba(2, 22, 37, 0.3);
  background-image: linear-gradient(to top, #9599a0, #6b7279);
  color: #fff;
  margin-right: 0.3rem;
}

.work-temp-top-mutil-select-item:hover {
  background-image: linear-gradient(to top, #a8a9aa, #777b7f);
}

.wtt-msi-name {
  border-right: 1px solid #fff;
  height: 100%;
  display: inline-block;
  min-width: 0.9rem;
  padding: 0 0.25rem;
  text-align: center;
}

.wtt-msi-icon {
  top: 0.1rem;
  right: 0.08rem;
}

.wtt-msi-icon {
  width: 0.35rem;
  height: 0.35rem;
  position: relative;
}

.wtt-msi-icon img {
  cursor: pointer;
  width: 0.15rem;
  height: 0.15rem;
}

.add-knowleges {
  width: 1.4rem;
  height: 0.48rem;
  line-height: 0.48rem;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(to top, #68c2f0, #3283d3);
  cursor: pointer;
  margin-bottom: 0.2rem;
  border-radius: 0.04rem;
}

.add-knowleges:hover {
  background-image: linear-gradient(to top, #7acbf4, #3e8ddb);
}

.el-dropdown .el-dropdown-link {
  width: 1.2rem;
}

.el-dropdown {
  border: 1px solid #ddd;
  border-radius: 0.02rem;
}

.el-dropdown-menu {
  width: 1.2rem;
}

.all-test-question-type {
  margin-top: 0.25rem;
}

.all-test-question-type div.inline-block {
  margin-right: 0.15rem;
}

.all-test-question-type div.inline-block p {
  margin-bottom: 0.1rem;
}

.el-dropdown span {
  width: 1.1rem !important;
  padding-left: 0.1rem;
}

.upload-test-question-grade {
  margin-top: 0.4rem;
}

.upload-test-question-grade div.inline-block:first-child {
  margin-right: 1.4rem;
}

.upload-test-question-grade div.inline-block p {
  margin-bottom: 0.1rem;
}

.upload-test-question-grade div.inline-block input {
  width: 0.6rem;
  height: 0.38rem;
  border: 1px solid #ddd;
  border-radius: 0.02rem;
  text-align: center;
  margin-right: 0.2rem;
}

.el-radio {
  margin: 0.1rem 0;
}

.upload-test-question-click {
  margin-top: 0.7rem;
  border-top: 1px solid #ddd;
  padding-top: 0.15rem;
  text-align: right;
}

.upload-test-question-click input {
  width: 1.38rem;
  height: 0.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  border-radius: 0.04rem;
  box-shadow: 0 1px 2px rgba(2, 22, 37, 0.3);
  background-image: linear-gradient(to top, #37c796, #08af95);
  margin-right: 0.1rem;
}
.upload-test-question-click input.primary {
  background-image: linear-gradient(to top, #32abd3, #3283d3);
  margin-left: 3rem;
}
.upload-test-question-click input.primary:hover {
  background-image: linear-gradient(to top, #3ebbe4, #4093e4);
}
.upload-test-question-click input:hover {
  background-image: linear-gradient(to top, #47d4a4, #0bc0a4);
}

.upload-quesition-all-message {
  margin: 0.2rem 0.15rem;
}

.upload-quesition-all-message li {
  margin-bottom: 0.25rem;
}

.upload-quesition-all-message li p {
  line-height: 0.26rem;
  margin-bottom: 0.1rem;
}

.list-answer-show-example {
  margin-bottom: 0.15rem;
  line-height: 0.38rem;
}

.list-answer-show-example input {
  width: 7.5rem;
  height: 0.36rem;
  border: 1px solid #ddd;
  padding-left: 0.1rem;
  line-height: 0.36rem;
}

.list-answer-show-example span {
  width: 0.4rem;
  display: inline-block;
  text-align: center;
}

.list-answer-show-example img {
  width: 0.24rem;
  height: 0.24rem;
  vertical-align: middle;
  cursor: pointer;
  margin-left: 0.15rem;
}

.el-icon--right {
  margin-right: 0.05rem;
}

.upload-word-box {
  height: 0.38rem;
  border: 1px solid #bfbfbf;
  overflow: hidden;
}

.upload-word-button {
  line-height: 0.38rem;
  color: #3283d3;
  font-size: 0.16rem;
  padding-left: 0.05rem;
}
.fa-paperclip {
  padding-left: 0.1rem;
  color: #535353;
}
.down-small-height {
  animation: theanimationdown 500ms ease-out 0s 1 alternate forwards;
}
.up-top-small-height {
  animation: theanimationUp 500ms ease-out 0s 1 alternate forwards;
}
@keyframes theanimationUp {
  0% {
    top: 0;
  }
  100% {
    top: -40px;
  }
}
@keyframes theanimationdown {
  from {
    top: -40px;
  }
  to {
    top: 0;
  }
}
.upload-demo {
  position: absolute;
  width: 100%;
}
.TH-f-c-blue {
  color: #3283d3;
}
.inputScore {
  border: 1px solid #3283d3;
  width: 0.5rem;
  text-align: center;
}
.point-box {
  padding: 0.2rem;
}
.unAddPoint {
  background-color: #28ae17;
  color: #fff;
  text-align: center;
  height: 0.38rem;
  line-height: 0.38rem;
  margin-right: 0.1rem;
  padding: 0 0.1rem;
}
.add-topic-box {
  height: 2rem;
  line-height: 0.2rem;
  text-align: center;
}
.add-topic-box img {
  padding-top: 0.4rem;
}
.word-preview-content{
  padding: .2rem .3rem;
  color: #535353;
  font-size: .16rem;
}
.word-preview-info{
  border-bottom: 1px solid #ddd;
}
.word-preview-info p{
  line-height: .2rem;
  padding: .05rem 0;
}
.word-preview-other{
  padding: .1rem 0;
  position: relative;
}
.word-preview-other-info >span{
  margin-left: .2rem;
}
.analysisBox{
  margin-top: .1rem;
}
.vedio-box{
  width: 8rem;
  height: 4.5rem;
  margin: 0 auto;
}
.word-preview-button-box{
  background-color: #3e8ddb;
  height: .8rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #fff;
  line-height: .8rem;
  text-align: center;
  font-size: .2rem;
}
.word-preview-button-box >span{
  margin: 0 .1rem;
}
.unAdd-Point{
  margin-top: .2rem;
  color: #535353;
  font-size: .16rem;
}
</style>
