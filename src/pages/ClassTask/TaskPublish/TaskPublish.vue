<template>
  <div class="container clear">
    <div v-show="!TASK_PREVIEW">
      <div class="publish-classTask-first card-shadow fs-16 fl"  id="TaskPublish">
          <p class="some-must-wright fs-14"><span>注：带“<i class="Th-f-c-red-1 fwb"> * </i>”内容为必填。</span></p>
          <ul>
            <li class="task_list">
              <p ><i class="Th-f-c-red-1 fwb"> * </i>任务名：
                <span v-show="!task.animate_" class="fs-13 fr">不超过20字</span>
              </p>
              <input class="fs-16 animate-class-input" type="text" maxlength="20" v-model="task.name" 
                  onfocus="this.style.border='1px solid #3283d3'"  
                  onkeyup="value=value.replace(/[^\a-\z\A-\Z\0-\9\u4E00-\u9FA5]/g,'')" onpaste="return false" 
                  onblur="this.style.border='1px solid #ddd'"/>
              <!-- <div class="left-show-animation-div" 
                v-show="task.animate_end">
                <span class="inline-block">{{task.name | truncate(20, '...')}}</span>
              </div> -->
            </li>
            <li class="task_list">
              <p><i class="Th-f-c-red-1 fwb"> * </i>活<em></em>动：</p>
              <div class="relative">
                <div class="task-select-action TH-f-c-defaul fs-14 cp inline-blcok" @click="TaskActionShow" v-show="!task.animate_end">
                  <img src="static/imgs/common/shaixuan.png" alt="筛选">
                  活动选择  
                </div>
                <div v-if="task.action !=''" 
                  class="work-temp-top-mutil-select-item task-action-mutil-select inline-block absolute">
                  <span  class="wtt-msi-name fl tof">{{task.actionName}}</span>
                  <div class="wtt-msi-icon fl relative">
                    <img  src="static/imgs/classTask/search-cancel.png" alt="cancel" class="absolute" @click="removeSelect">
                  </div>
                </div>
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
              <!-- <div class="left-show-animation-div" v-show="task.animate_end">
                <span class="inline-block">{{task.actionName | truncate(20, '...')}}</span>
              </div> -->
            </li>
            <li class="task_list">
              <p>前导任务：<span class="fs-14 fr">此项为学生开始本任务之前就应完成的任务</span></p>
              <el-autocomplete v-model="task.beforeTask" placeholder="请输入前导任务名称并在匹配项中进行选择"
                :fetch-suggestions="querySearchAsyncBeforeTask" 
                @select="handleSelect">
              </el-autocomplete>
              <!-- <div class="left-show-animation-div" v-show="task.animate_end">
                <span class="inline-block">{{task.beforeTask | truncate(20, '...')}}</span>
              </div> -->
            </li>
            <li class="task_list">
              <p><i class="Th-f-c-red-1 fwb"> * </i>班<em></em>级：</p>
              <div class="class-all-list">
                <span class="inline-block select-class fs-14" @click="dialogFormVisible=true">
                选择班级
                <i class="el-icon-plus"></i>
                </span>
              </div>
              <div class="inline-block" v-if="yearList" :key="$yindex"
                v-for="(yearList, $yindex) in SelectedConfirmClass">
                <span class="classes-added-push inline-block fs-13 fl" 
                      v-for="(item,$cindex) in yearList.dataList" :key="$cindex"
                      >
                    {{item.className}}
                    <i class="el-icon-close" @click="SelectedDeleted($yindex,$cindex)"></i>
                </span>
              </div>
            </li>
            <li class="task_list ">
                  <p :class="{'title-color':task.animate_}"><i class="Th-f-c-red-1 fwb"> * </i>任务时间：</p>
                  <el-date-picker
                      v-show="!task.animate_end"
                      v-model="task.startTime"
                      popper-class="task-start-time"
                      type="datetime"
                      @change="taskSartTime"
                      @focus="openStart"
                      placeholder="" format="yyyy-MM-dd HH:mm">
                  </el-date-picker>
                  <span 
                      v-show="!task.animate_end" 
                      class="inline-block" 
                      style="margin:0 .1rem">至</span>
                  <el-date-picker
                      v-show="!task.animate_end"
                      v-model="task.endtime"
                      popper-class="task-end-time"
                      type="datetime"
                      @change="taskEndTime"
                      @focus="openEnd"
                      placeholder="" format="yyyy-MM-dd HH:mm">
                  </el-date-picker>
            </li>
            <li class="task_list ">
              <p v-show="!task.animate_end" :class="{'title-color':task.animate_}">试卷解析公布时间 (默认为任务结束时间）</p>
              <el-date-picker
                  v-show="!task.animate_end"
                  v-model="task.openAnalysisTime"
                  popper-class="task-analysis-time"
                  type="datetime"
                  @change="taskOpenAnalysisTime"
                  @focus="OpenAnalysis"
                  placeholder="" format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </li>
          </ul>
      </div>
      <div class="publish-classTask-first publish-task-second fl relative">
        <div class="select-now-model relative" v-show="!AddedResourceType">
            <div class="use-added-model" @click="AddResourceReady('model',model)">
              <img src="~assets/imgs/classTask/choose-template.png" 
                    alt="choose-template.png">
              <p class="fs-16">请先选择模板</p>
            </div>
            <div class="task-maker">
              <input type="button" value="暂存" class="button-default fs-16 cp" @click="SummitTask('cun')" />
              <input type="button" value="预览" class="button-default TH-button-default fs-16 cp" @click="TASK_PREVIEW=true" />
            </div>
        </div>
        <!-- 添加资源的按钮 -->
        <ul class="absolute u-add-resource-position card-shadow fs-16">
          <li :key="index" @click="addResourcePushToPage(item)"
              v-for="(item,index) in ResourceLists"
              :class="{'cp': !item.added,
              'color-79b3b3': index%2==0,
              'color-5b93ba': index%2!=0,
              'color-cacaca': item.added}">
            <img src="~assets/imgs/publish/add-type.png" alt="添加">
            {{item.name}}
          </li>
        </ul>
        <!-- 添加资源的位置 -->
        <div v-show="AddedResourceType" class="added-resource-list TH-f-c-default">
          <div class="added-resource-list-example" v-show="item.added" v-for="(item,index) in ResourceLists" :key="index">
            <p class="fs-16">
              {{item.name}} 
              <span class="inline-block fr cp" @click="DeleteAddedResource(item)"><img src="~assets/imgs/classTask/delete.png" alt="删除"></span> 
            </p>
            <!-- 富文本开始 -->
            <vue-html5-editor id="EdtiorReady" v-if="item.type=='ready'" @change="updateDataReady" ref="ready" 
              class="editor-style" :content="item.content" :height="200">
            </vue-html5-editor>
            <vue-html5-editor id="EdtiorGuide" v-if="item.type=='guide'" @change="updateDataGuide" ref="guide" 
              class="editor-style" :content="item.content" :height="200">
            </vue-html5-editor>
            <vue-html5-editor id="EdtiorTarget" v-if="item.type=='target'" @change="updateDataTarget" ref="target" 
              class="editor-style" :content="item.content" :height="200">
            </vue-html5-editor>
            <vue-html5-editor id="EdtiorTask" v-if="item.type=='task'" @change="updateDataTask" ref="task" 
              class="editor-style" :content="item.content" :height="200">
            </vue-html5-editor>
            <vue-html5-editor id="EdtiorSummary" v-if="item.type=='summary'" @change="updateDataSummary" ref="summary" 
              class="editor-style" :content="item.content" :height="200">
            </vue-html5-editor>
            <vue-html5-editor id="EdtiorExtra" v-if="item.type=='extra'" @change="updateDataExtra" ref="extra" 
              class="editor-style" :content="item.content" :height="200">
            </vue-html5-editor>
            <!-- 富文本结束 -->
            <div class="clear add-push-resource">
              <p class="inline-block fl cp" v-if="item.type != 'summary'"
                @click="AddResourceReady('matter',item.type)">
                <img src="~assets/imgs/publish/sources.png" alt="素材"/>素材
              </p>
              <p class="inline-block fl cp" v-if="item.type == 'ready' || item.type == 'task' || item.type == 'extra' || item.type == 'guide'"
                @click="AddResourceReady('video',item.type)">
                <img src="~assets/imgs/publish/video.png" alt="视频"/>视频
              </p>
              <p class="inline-block fl cp" v-if="item.type == 'ready' || item.type == 'task' || item.type == 'extra'"
                @click="AddResourceReady('paper',item.type)">
                <img src="~assets/imgs/publish/paper.png" alt="试卷"/>试卷
              </p>
              <p class="inline-block fl cp" v-if="item.type == 'task'" @click="AddedWorkItem(item)">
                <img src="~assets/imgs/publish/activity-requirment.png" alt="作品要求"/>作品要求
              </p>
            </div>
          </div>
        </div>
        <!-- 上一步  预览&&提交-->
        <div class="clear pre-load-and-submit-btn" v-show="AddedResourceType">
          <input type="button" value="暂存" class="button-default fs-16 cp" @click="SummitTask('cun')" />
          <input type="button" value="预览" class="button-default TH-button-default fs-16 cp" @click="TASK_PREVIEW=true" />
          <!-- <div @click="SummitTask('prev')" class="cp TH-button-default inline-block fs-16">预&nbsp;&nbsp;览</div> -->
        </div>
      </div>
    </div>
    <div v-show="TASK_PREVIEW">
      <div class="task-preview-container TH-f-c-default">
        <div class="task-preview-content clear">
            <div class="left-white-content fl">
                <p class="fs-20 fwb">{{task.name}}</p>
                <ul>
                    <li class="common-img-text-middle-left">
                        <img src="~assets/imgs/classTask/activity.png" alt="活动">
                        <span>活动：{{task.actionName}}</span>
                    </li>
                    <li class="common-img-text-middle-left">
                        <img src="~assets/imgs/classTask/class.png" alt="班级">
                        <span>班级：
                          <!-- <div class="inline-block" v-if="yearList" :key="$yindex"
                            v-for="(yearList, $yindex) in SelectedConfirmClass">
                            <span class="classes-added-push inline-block fs-13 fl" 
                                  v-for="(item,$cindex) in yearList.dataList" :key="$cindex"
                                  >
                                {{item.className}}
                                <i class="el-icon-close" @click="SelectedDeleted($yindex,$cindex)"></i>
                            </span>
                          </div> -->
                          <i v-if="yearList" :key="$yindex" v-for="(yearList, $yindex) in SelectedConfirmClass">
                            <i v-for="(item,$cindex) in yearList.dataList" :key="$cindex">
                              {{ $cindex==0?'':'、' }}{{ item.className }}
                            </i>
                          </i>
                        </span>
                    </li>
                    <li class="common-img-text-middle-left">
                        <img src="~assets/imgs/classTask/time.png" alt="时间">
                        <span>时间：{{task.startTime}} 至 {{task.endtime}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="task-preview-content relative" v-if="ResourceLists[0].added">
          <div class="left-white-content">
              <div class="task-added-resource-title common-img-text-middle-left">
                  <img src="~assets/imgs/classTask/prepare.png" alt="学习准备">
                  <span class="fs-18">学习准备：</span>
              </div>
              <div class="task-added-resource-content" v-html="convertImgToUrl(ResourceLists[0].content)"></div>
          </div>
        </div>
        <div class="task-preview-content relative" v-if="ResourceLists[1].added">
          <div class="left-white-content">
              <div class="task-added-resource-title common-img-text-middle-left">
                  <img src="~assets/imgs/classTask/guide.png" alt="学习准备">
                  <span class="fs-18">新课引导：</span>
              </div>
              <div class="task-added-resource-content" v-html="convertImgToUrl(ResourceLists[1].content)"></div>
          </div>
        </div>
        <div class="task-preview-content relative" v-if="ResourceLists[2].added">
            <div class="left-white-content">
              <div class="task-added-resource-title common-img-text-middle-left">
                  <img src="~assets/imgs/classTask/goal.png" alt="学习准备">
                  <span class="fs-18">学习目标：</span>
              </div>
              <div class="task-added-resource-content" v-html="convertImgToUrl(ResourceLists[2].content)"></div>
            </div>
        </div>
        <div class="task-preview-content relative" v-if="ResourceLists[3].added">
          <div class="left-white-content">
              <div class="task-added-resource-title common-img-text-middle-left">
                  <img src="~assets/imgs/classTask/task.png" alt="学习准备">
                  <span class="fs-18">学习任务：</span>
              </div>
              <div class="task-added-resource-content" v-html="convertImgToUrl(ResourceLists[3].content)"></div>
          </div>
          <!-- <div class="right-dark-content absolute">
              <div class="TH-button-primary cp inline-block">上传作品</div>
          </div> -->
        </div>
        <div class="task-preview-content relative" v-if="ResourceLists[4].added">
            <div class="left-white-content">
              <div class="task-added-resource-title common-img-text-middle-left">
                  <img src="~assets/imgs/classTask/feedback.png" alt="学习准备">
                  <span class="fs-18">反馈小结：</span>
              </div>
              <div class="task-added-resource-content" v-html="convertImgToUrl(ResourceLists[4].content)"></div>
            </div>
        </div>
        <div class="task-preview-content relative" v-if="ResourceLists[5].added">
          <div class="left-white-content">
              <div class="task-added-resource-title common-img-text-middle-left">
                  <img src="~assets/imgs/classTask/outclass.png" alt="学习准备">
                  <span class="fs-18">课外延伸：</span>
              </div>
              <div class="task-added-resource-content" v-html="convertImgToUrl(ResourceLists[5].content)"></div>
          </div>
        </div>
      </div>
      <div class="return-pre-status fs-20">
        <span class="cp" @click="TASK_PREVIEW = false">返回编辑</span>
        <span class="cp" @click="SummitTask('load')">直接发布</span>
      </div>
    </div>

    <!-- 选择班级 -->
    <el-dialog 
      title="选择班级" 
      :visible.sync="dialogFormVisible" 
      custom-class="dialog-edit-grade">
      <div class="all-classes-list classes-margin-arrow">
        <div class="fs-18 fwb">
          <span 
            :class="{'active':class_index==_index}" 
            @click="classIndexChange(_index)" 
            :key="_index" v-for="(item,_index) in classesList">
            {{item.session}}级
          </span>
        </div>
        <template>
          <div v-if="SelectedIndex == $index" v-for="(checkList, $index) in SelectedClass" :key='$index'>
            <el-checkbox 
              :indeterminate="checkList.determine" 
              v-model="checkList.checkAll" 
              @change="SelectedAllHandler($index, $event)">全选</el-checkbox>
            <div style="margin: .15rem 0;"></div>
            <el-checkbox-group 
              v-model="checkList.dataList" 
              @change="SelectedOneHandler($index,$event)">
              <el-checkbox 
                v-for="(item,index) in checkList.classList" 
                :label="item" :key="index">
                {{item.className}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </template>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="SelectedConfirm()">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加作品要求 -->
    <el-dialog 
      title="作品要求" top="5%"
      :visible.sync="dialogWorkItem" 
      custom-class="dialog-work-item-grade">
      <div class="all-classes-list">
        <ul class="fs-16 TH-f-c-default dialog-work-item-content">
          <li class="clear">
            <p class="fl label">作品名称：</p>
            <div class="fl">
              <input v-model="AddedWorks.text" type="text" class="WorkItemCont fs-14" maxlength="50" placeholder="请输入作品名称（不超过50字）" />
            </div>
          </li>
          <li class="clear">
            <p class="fl label">作品要求：</p>
            <div class="fl">
              <textarea v-model="AddedWorks.worksDescription" class="fs-14" maxlength="300" placeholder="请输入作品要求（不超过300字）">
              </textarea>
            </div>
          </li>
          <li class="clear">
            <p class="fl">作品格式：</p>
            <div class="fl">
              <el-checkbox-group v-model="AddedWorks.format" @change="handleChecked">
                <el-checkbox class="dwic-check" v-for="arr in arr_list" :label="arr" :key="arr">
                  .{{arr}}{{ arr=='doc'||arr=='xls'||arr=='ppt'?'(x)':'' }}
                  <i class="dwic-type"> 
                    {{canPreviewed(arr)}}
                  </i> 
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </li>
          <li class="clear">
            <p class="fl label">评分占比：</p>
            <div class="fl teacher-student-score-percent">
              老师：学生 = 
              <input type="text"  maxlength='2' class="fs-16" id="scalelBefore"
                v-model="AddedWorks.scalel.split(':')[0]" v-on:input="changeInputScore('before')"
                onkeyup="if(this.value.length==2){this.value=this.value.replace(^[0-9]{1}$|^10$,'')}else{this.value=this.value.replace(/\D/g,'0')}" 
                onafterpaste="if(this.value.length==2){this.value=this.value.replace(^[0-9]{1}$|^10,'')}else{this.value=this.value.replace(/\D/g,'0')}">
               : 
              <input type="text"  maxlength='2' class="fs-16" id="scalelAfter"
                v-model="AddedWorks.scalel.split(':')[1]" v-on:input="changeInputScore('after')"
                onkeyup="if(this.value.length==2){this.value=this.value.replace(^[0-9]{1}$|^10$,'')}else{this.value=this.value.replace(/\D/g,'0')}" 
                onafterpaste="if(this.value.length==2){this.value=this.value.replace(^[0-9]{1}$|^10$,'')}else{this.value=this.value.replace(/\D/g,'0')}">
            </div>
          </li>
          <li class="clear">
            <p class="fl label">评分标准：</p>
            <div class="fl">
              <!-- 作品评分标准 -->
              <ul class="pro-mark-line">
                <li class="clear" :key="index" v-for="(item,index) in AddedWorks.scoreStandard">
                  <div class="fl title">
                    <input v-model="item.standard" type="text" maxlength="20" placeholder="请填写标准（不超过30字）">
                  </div>
                  <div class="fl value">
                    分值：
                    <input type="text"  maxlength='3' 
                          v-model="item.score"  
                          v-on:input="changeInputValue"
                          onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" 
                          onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
                  </div>
                  <div class="fl add">
                    <a @click="AddProMark()">继续添加</a>
                  </div>
                  <div class="fl delete" v-if="index != 0">
                    <a @click="DeleteProMark(index)">删除</a>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureAddedWorks">确 定</el-button>
        <el-button @click="dialogWorkItem = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加资源 -->
    <el-dialog :visible.sync="dialogFormVisibleAdded" 
      custom-class="dialog-edit-grade choose-now-added-model Add-resource-top">
      <div slot="title" class="dialog-title inline-block fs-18">
        <span v-if="NowDialogStatus == 'model'">选择模板</span>
        <span v-if="NowDialogStatus == 'matter'">添加素材</span>
        <span v-if="NowDialogStatus == 'video'">添加视频</span>
        <span v-if="NowDialogStatus == 'paper'">添加试卷</span>
      </div>
      <div class="all-classes-list">
        <div class="work-temp-top relative" :class="{'paper-height':NowDialogStatus=='paper'}">
          <div class="TH-f-c-default fs-16 cp inline-block" v-if="NowDialogStatus != 'paper'"  @click="tree_open=true">
            <span>活动筛选</span>
            <i class="fa fa-sort-desc" aria-hidden="true"></i>
          </div>
          <div class="drop-down-self-wt absolute drop-down-self-wt-paper" v-if="NowDialogStatus=='paper'">
            <span class="TH-f-c-default fs-16 fwb">来源：</span>
            <div class="down inline-block relative">
              <span v-if="activityOption.active==1">我的上传</span>
              <span v-if="activityOption.active==2">我的收藏</span>
              <span v-if="activityOption.active==3&&NowDialogStatus=='matter'">平台{{activityOption.active==1?'课件':(activityOption.active==2?'教案':'其他')}}</span>
              <span v-if="activityOption.active==3&&NowDialogStatus!='matter'">平台{{NowDialogStatus=='model'?'模板':(NowDialogStatus=='video'?'视频':'试卷')}}</span>
              <i aria-hidden="true" class="fa fa-sort-desc absolute"></i>
              <ul class="card-shadow absolute">
                <li :class="{'active':activityOption.active==1}" @click="SearchAdded('1')">我的上传</li>
                <li :class="{'active':activityOption.active==2}" @click="SearchAdded('2')">我的收藏</li>
                <li :class="{'active':activityOption.active==3}" @click="SearchAdded('3')" v-if="NowDialogStatus=='matter'">平台{{activityOption.active==1?'课件':(activityOption.active==2?'教案':'其他')}}</li>
                <li :class="{'active':activityOption.active==3}" @click="SearchAdded('3')" v-else>平台{{NowDialogStatus=='model'?'模板':(NowDialogStatus=='video'?'视频':'试卷')}}</li>
              </ul>
            </div>
          </div>
          <div class="list-added-knowlege inline-block fs-16">
            <!-- 任务模板 -->
            <div v-if="SearchModel.activityIds!=''&&NowDialogStatus =='model'" class="knowlege-new-style TH-f-c-link inline-block">
              <span>{{searchActivity.modelName}}</span>
              <i class="el-icon-circle-close inline-block cp" aria-hidden="true" @click="removeSelect"></i>
            </div>
            <!-- 素材 -->
            <div v-if="SearchMatter.activityId!=''&&NowDialogStatus =='matter'" class="knowlege-new-style TH-f-c-link inline-block relative">
              <!-- <span class="inline-block absolute action-class-list-more">{{searchActivity.matterName}}</span> -->
              <span class="matter-selectd-activity tof" :title="searchActivity.matterName">{{searchActivity.matterName}}</span>
              <i class="el-icon-circle-close inline-block cp" aria-hidden="true" @click="removeSelect"></i>
            </div>
            <!-- 视频 -->
            <div v-if="SearchVideo.categoryIds!=''&&NowDialogStatus =='video'" class="knowlege-new-style TH-f-c-link inline-block">
              <span>{{searchActivity.videoName}}</span>
              <i class="el-icon-circle-close inline-block cp" aria-hidden="true" @click="removeSelect"></i>
            </div>
          </div>
          <div class="wtt-search TH-f-c-default fs-14 cp absolute">
            <div class="drop-down-self-wt fl" v-if="NowDialogStatus!='paper'">
              <span class="TH-f-c-default fs-16 fwb">{{NowDialogStatus=='matter'?'类别：':'来源：'}}</span>
              <div class="down inline-block relative">
                <span v-if="activityOption.active==1">{{NowDialogStatus=='matter'?'课件':'我的上传'}}</span>
                <span v-if="activityOption.active==2">{{NowDialogStatus=='matter'?'教案':'我的收藏'}}</span>
                <span v-if="activityOption.active==3&&NowDialogStatus=='matter'">其他</span>
                <span v-if="activityOption.active==3&&NowDialogStatus!='matter'">平台{{NowDialogStatus=='model'?'模板':(NowDialogStatus=='video'?'视频':'试卷')}}</span>
                <i aria-hidden="true" class="fa fa-sort-desc absolute"></i>
                <ul class="card-shadow absolute">
                  <li :class="{'active':activityOption.active==1}" @click="SearchAdded('1')">{{NowDialogStatus=='matter'?'课件':'我的上传'}}</li>
                  <li :class="{'active':activityOption.active==2}" @click="SearchAdded('2')">{{NowDialogStatus=='matter'?'教案':'我的收藏'}}</li>
                  <li :class="{'active':activityOption.active==3}" @click="SearchAdded('3')" v-if="NowDialogStatus=='matter'">其他</li>
                  <li :class="{'active':activityOption.active==3}" @click="SearchAdded('3')" v-else>平台{{NowDialogStatus=='model'?'模板':(NowDialogStatus=='video'?'视频':'试卷')}}</li>
                </ul>
              </div>
            </div>
            <div class="drop-down-self-wt fl" v-if="NowDialogStatus=='matter'">
              <span class="TH-f-c-default fs-16 fwb">来源：</span>
              <div class="down inline-block relative">
                <span>{{SearchMatter.query==1?'我的上传':(SearchMatter.query==2?'我的收藏':(activityOption.active==1?'平台课件':(activityOption.active==2?'平台教案':'平台其他')))}}</span>
                <i aria-hidden="true" class="fa fa-sort-desc absolute"></i>
                <ul class="card-shadow absolute">
                  <li :class="{'TH-f-c-link':SearchMatter.query==1}" @click="SearchMatterQuery('1')">我的上传</li>
                  <li :class="{'TH-f-c-link':SearchMatter.query==2}" @click="SearchMatterQuery('2')">我的收藏</li>
                  <li :class="{'TH-f-c-link':SearchMatter.query==''}" @click="SearchMatterQuery('3')">平台{{activityOption.active==1?'课件':(activityOption.active==2?'教案':'其他')}}</li>
                </ul>
              </div>
            </div>
            <div class="wtt-search-main relative fl">
              <input maxlength="20" v-if="NowDialogStatus == 'model'" @keyup.enter="searchVideoPaperName" v-model="SearchModel.title" type="text" placeholder="请输入关键字查询..." class="otl-none wtt-search-main-input">
              <input maxlength="20" v-if="NowDialogStatus == 'matter'" @keyup.enter="searchVideoPaperName" v-model="SearchMatter.fileTitle" type="text" placeholder="请输入关键字查询..." class="otl-none wtt-search-main-input">
              <input maxlength="20" v-if="NowDialogStatus == 'video'" @keyup.enter="searchVideoPaperName" v-model="SearchVideo.videoName" type="text" placeholder="请输入关键字查询..." class="otl-none wtt-search-main-input">
              <input maxlength="20" v-if="NowDialogStatus == 'paper'" @keyup.enter="searchVideoPaperName" v-model="SearchPaper.keyword" type="text" placeholder="请输入关键字查询..." class="otl-none wtt-search-main-input">
              <img src="static/imgs/common/search.png" alt="search" class="wtt-search-main-icon absolute" @click="searchVideoPaperName">
            </div>
          </div>
        </div>
        <mutil-select class="work-temp-top-mutil-select absolute"
          v-if="tree_open"
          :selectList="selectOption"
          :cover="true"
          type="single"
          @choiceDeactive="removeSelect($event)"
          @choiceActive="handleChoice($event)"
          @closeSelect="tree_open = false">
        </mutil-select>
        
        <div class="work-temp-content relative">
          <div class="upload-resource-at-once fs-14">
            没有找到满意的{{NowDialogStatus=='model'?'模板':(NowDialogStatus=='matter'?'素材':(NowDialogStatus=='video')?'视频':'试卷')}}？
            <div v-if="NowDialogStatus=='matter'&&activityOption.active==1" class="TH-button-primary-new cp inline-block" @click="openNewExpor(1)">上传课件</div>
            <div v-if="NowDialogStatus=='matter'&&activityOption.active==2" class="TH-button-primary-new cp inline-block" @click="openNewExpor(2)">上传教案</div>
            <div v-if="NowDialogStatus=='matter'&&activityOption.active==3" class="TH-button-primary-new cp inline-block" @click="openNewExpor(3)">上传素材</div>
            <div v-if="NowDialogStatus=='video'" class="TH-button-primary-new cp inline-block" @click="openNewExpor(4)">上传视频</div>
            <div v-if="NowDialogStatus=='paper'" class="TH-button-primary-new cp inline-block" @click="openNewExpor(5)">上传试卷</div>
            <div v-if="NowDialogStatus=='model'" class="TH-button-primary-new cp inline-block" @click="openNewExpor(6)">上传模板</div>
            <div v-if="NowDialogStatus=='matter'" class="TH-button-default-new cp inline-block" @click="RefreshContentList(1)">刷新</div>
            <div v-if="NowDialogStatus=='video'" class="TH-button-default-new cp inline-block" @click="RefreshContentList(2)">刷新</div>
            <div v-if="NowDialogStatus=='paper'" class="TH-button-default-new cp inline-block" @click="RefreshContentList(3)">刷新</div>
            <div v-if="NowDialogStatus=='model'" class="TH-button-default-new cp inline-block" @click="RefreshContentList(4)">刷新</div>
          </div>
          <div class="all-mudel-list">
            <div class="container-nav fwb">
              <span>名称</span>
              <div class="fr">
                <span class="inline-block" v-if="NowDialogStatus=='matter'">类别</span>
                <span class="inline-block">来源</span>
              </div>
            </div>
            <el-checkbox-group
              v-model="selectedAddResource">
              <el-checkbox class="added-model-width fs-16 relative" 
                v-for="(mm,_index) in SearchArrList" 
                :label="mm" 
                :key="_index" 
                @change="checkSelectModel(mm,_index)">{{mm.name}}
                <span  class="fr inline-block my-upload-message" v-if="SearchMatter.query==1&&NowDialogStatus=='matter'">我的上传</span>
                <span  class="fr inline-block my-upload-message" v-if="SearchMatter.query==2&&NowDialogStatus=='matter'">我的收藏</span>
                <span  class="fr inline-block my-upload-message" v-if="SearchMatter.query==''&&NowDialogStatus=='matter'">平台{{activityOption.active==1?'课件':(activityOption.active==2?'教案':'其他')}}</span>

                <span  class="fr inline-block my-upload-message" v-if="activityOption.active==1&&NowDialogStatus!='matter'">我的上传</span>
                <span  class="fr inline-block my-upload-message" v-if="activityOption.active==2&&NowDialogStatus!='matter'">我的收藏</span>
                <span  class="fr inline-block my-upload-message" v-if="activityOption.active==3&&NowDialogStatus!='matter'">平台{{NowDialogStatus=='model'?'模板':(NowDialogStatus=='video'?'视频':'试卷')}}</span>
                <span v-if="NowDialogStatus=='matter'"  class="fr inline-block my-upload-message">{{activityOption.active==1?'课件':(activityOption.active==2?'教案':'其他')}}</span>
                <div v-if="NowDialogStatus == 'paper'&& mm.type" class="SelectedInputCheckbox">
                  <p class="inline-block">
                    <i class="Th-f-c-red-1">*</i>限时：
                    <input type="text"  v-model="mm.timeLimit"
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" 
                      onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/> 分钟
                  </p>
                  <p class="inline-block">
                    <i class="Th-f-c-red-1">*</i>最多答题次数：
                    <input type="text" v-model="mm.answerLimit"
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" 
                      onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"/> 次数
                  </p>
                </div> 
              </el-checkbox>
              <div class="task-pages" v-if="workPages.total > 10 && SearchArrList!=''">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="workPages.current"
                  :page-size="workPages.size"
                  layout=" prev, pager, next"
                  :total="workPages.total">
                </el-pagination>
              </div>
            </el-checkbox-group>
            <div class="TF-temp-Arr-space" v-if="SearchArrList==''">
              <img src="~assets/imgs/publish/no-relative-resources.png" alt="">
              <p class="fs-18 TH-f-c-default">没有你需要的{{NowDialogStatus=='model'?'模板':(NowDialogStatus=='matter'?'素材':(NowDialogStatus=='video')?'视频':'试卷')}}呢！</p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CloseSearchAdded" >确 定</el-button>
        <el-button @click="dialogFormVisibleAdded = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 请求暂存任务 -->
    <el-dialog :visible.sync="getTaskCunStatus" top="30%" :show-close="false" :close-on-click-modal="false"
      custom-class="dialog-edit-grade dialog-edit-grade-width">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>提示</span>
      </div>
      <div class="upload-mall-resource">
        <p class="fs-18">你需要恢复暂存的任务吗？</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="GetAllTaskDetails">恢复</el-button>
        <el-button @click="DeleteTaskTemp">删除</el-button>
      </div>
    </el-dialog>

    <!-- 退出提示 -->
    <el-dialog :visible.sync="backToMainPage" top="30%" custom-class="dialog-edit-grade dialog-edit-grade-width">
      <div slot="title" class="dialog-title inline-block fs-16">
        <span>提示</span>
      </div>
      <div class="upload-mall-resource">
        <p class="fs-18">要在退出前，暂存此次编辑吗？</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="SummitTask('cun')">确定</el-button>
        <el-button @click="CancelSaveTask">取消</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import mutilSelect from '../../../components/mutilSelect'
import { ADDRESS,HEAD } from '../../../helpers/address'
import { callLoading,
         callToast, 
         deepClone, 
         convertImgToUrl,
         convertImgToUrlCutHref,
         clearTree, 
         A_TO_IMAGE,
         callMimeTypeCheck} from '../../../helpers/helper'
import domtoimage from 'dom-to-image'

export default {
  name: 'ClassTaskPublish',
  components: { 'mutil-select':mutilSelect },
  store: ['user'],
  computed: {
    selectOption() {
      return deepClone(this.$store.tree)
    }
  },
  data () {
    return {
      TASK_PREVIEW: false,
      tempAddAtt: ADDRESS.ADD_UPLOAD_TEMP_ID,
      dialogFormVisibleAdded: false,
      dialogFormVisible: false,
      dialogWorkItem : false,
      getTaskCunStatus: false,
      backToTaskIndex: false,
      backToMainPage: false,
      restaurants: [],
      restaurantsBeforTask: [],
      // 班级列表相关参数
      class_index: 0,
      classesList: [],
      classesPags: [],
      classesIds : [],
      checkedClass: [],
      sureAddedClass:[],
      SelectedClass: [],
      SelectedIndex: 0,
      SelectedConfirmClass: [],
      isIndeterminate: false,
      checkAll: false,
      task: {
        showChoiceFlag:false,
        name: '',
        action: '',
        actionName:'',
        beforeTask: '',
        activityId: '',
        beforeId: '',
        classArr: [],
        startTime: '',
        endtime: '',
        openAnalysisTime :'',
        selecType: false,
        animate_: false,//向左滑
        animate_right: false,//右滑
        animate_end: false,//向左滑结束回调
        animate_model: false,//选择模板动画
        animate_model_end: false,
        animate_model_sec: false
      },
      ResourceLists:[
        {
          type:"ready",
          added:false,
          name:"学习准备",
          content:""
        },
        {
          type:"guide",
          added:false,
          name:"新课引导",
          content:"",
        },
        {
          type:"target",
          added:false,
          name:"学习目标",
          content:"",
        },
        {
          type:"task",
          added:false,
          name:"学习任务",
          content:"",
        },
        {
          type:"summary",
          added:false,
          name:"反馈小结",
          content:""
        },
        {
          type:"extra",
          added:false,
          name:"课外延伸",
          content:"",
        }
      ],
      AddedResourceType: false,
      AddedTaskResource:[],
      arr_list:['txt','doc','xls','ppt','psd',
                'png','jpg','mp3','avi','wmv',
                'mp4','swf','fla','xmind','zip',
                'vbp','frm','nrb','mdb','cdr'],
      AddedWorks:{
        text:'',
        id:'',
        scalel:'6:4',
        worksDescription:'',
        format:[],
        sumNum: 0,
        scoreStandard:[
          {
            standard:'',
            score:''
          }
        ]
      },
      NowDialogStatus: 'action',
      tree_open:false,
      activityOption: {
        content:'ready',
        showChoiceFlag: false,
        choosenActivity: [],
        knowledgeIds: [],
        text:'模板',
        active:1,
        query:1
      },
      SearchArrList:[],
      selectedAddResource:[],
      SearchModel:{  //模板查询
        title:'',
        condition:'my',
        activityIds:[],
        page: 1,
        rows:10
      },
      SearchMatter:{ //素材查询
        query:1,
        fileTitle:'',
        materialType:1,
        activityId:'',
        sort:2,
        page:1,
        rows:10
      },
      SearchVideo:{  //视频查询
        videoName:'',
        categoryIds:[],
        query:1,
        page:1,
        rows:10
      },
      SearchPaper:{  //试卷查询
        searchType:2,
        keyword:"",
        page:1,
        rows:10
      },
      SelectDropDown:{},
      ResourceContent:[],
      AddWorksId:2017102301,
      ADDWORKARRAY:[],
      workPages: {
        total: 0,
        size: 10,
        current: 1,
      },
      searchActivity:{
        modelName:'',
        matterName:'',
        videoName:''
      },
      tempTaskId:'',
    }
  },
  created () {
    this.selectClass()
    this.GET_TASK_SQL()
  },
  watch:{
    task:{
      handler:function(val,oldval){  
        this.$store.user.content = true

      },  
      deep:true//对象内部的属性监听，也叫深度监听  
    },
    ResourceLists:{
      handler:function(val,oldval){  
        this.$store.user.content = true
      },  
      deep:true//对象内部的属性监听，也叫深度监听  
    }
  },
  methods: {
    //取消不保存
    CancelSaveTask(){
      this.$store.user.content = false
      this.backToMainPage = false
      if( this.$store.user.url == 'back' ){
        this.$router.go(-1)
      }
      else{
        this.$router.push(this.$store.user.url)
      }
    },
    // 请求是否有暂存的任务
    GET_TASK_SQL(){
      callLoading.activeLoading()
      this.$http.get( ADDRESS.GET_CUN_TASK_OR )
      .then( (res) => {
        callLoading.deactiveLoading()
        if( res.body.code == 1 ){
          if( res.body.data ){
            this.getTaskCunStatus = true
            this.tempTaskId = res.body.data
          }
          else{
            this.getTaskCunStatus = false
          }
        }
        else{
          this.getTaskCunStatus = false
        }
      } , (err) => {
        callLoading.deactiveLoading()
      })

    },

    //请求任务详情
    GetAllTaskDetails(){
      callLoading.activeLoading()
      this.$http.post( ADDRESS.TASK_LIST_ITEM_DETAIL_ADDR,
      { taskId: this.tempTaskId } )
      .then( (res) => {
        callLoading.deactiveLoading()
        this.getTaskCunStatus = false
        if( res.body.code == 1 ){
          // 开始初始化
          let Data = res.body.data
          // 标题
          if( Data.title !='' ){
            this.task.name = Data.title
          }
          // 活动
          if( Data.activityId ){
            this.task.actionName = Data.activityName
            this.task.action = Data.activityId
            this.searchActivity.modelName = Data.activityName
            this.searchActivity.matterName = Data.activityName
            this.searchActivity.videoName = Data.activityName
          }
          // 前导任务
          if( Data.beforeTaskId ){
            this.task.beforeId = Data.beforeTaskId
            this.task.beforeTask = Data.beforeTaskTitle
          }
          // 班级
          if( Data.classIdNames != '' ){
            let _this = this
            for( let i=0;i<Data.classIdNames.length;i++ ){
              for(let j=0;j<_this.SelectedClass.length;j++){
                for(let k=0;k<_this.SelectedClass[j].classList.length;k++){
                  let classIO = _this.SelectedClass[j].classList[k]
                  // _this.SelectedClass[j].dataList = []
                  if( classIO.classId == Data.classIdNames[i].id ){
                    _this.SelectedClass[j].dataList.push(classIO)
                    let dater = _this.SelectedClass[j]
                    if( dater.dataList.length == dater.classList.length ){
                      dater.checkAll = true
                      dater.determine = false
                    }
                    this.SelectedConfirm()
                  }
                }
              }
            }
          }
          // 任务时间
          if( Data.startTime){
            this.task.startTime = Data.startTime
          }
          if( Data.endTime ){
            this.task.endtime = Data.endTime
          }
          // 解析时间
          if( Data.openAnalysisTime ){
            this.task.openAnalysisTime = Data.openAnalysisTime
          }
          // 富文本内容填充
          if( Data.teachingProceduresDtos ){
            let self = this
            for( var i=0;i< Data.teachingProceduresDtos.length;i++ ){
              const item = Data.teachingProceduresDtos[i]
              self.AddedResourceType = true
              self.AddedTaskResource.push('1')

              let _item = item

              callLoading.activeLoading()
              A_TO_IMAGE(item.html, ( html ) => {
                // console.log(c)

                callLoading.deactiveLoading()
                const dom = '<div>'+html+'</div>'
                const _htmlContent = $(dom).find('.add-resource-container-content')

                
                self.$refs[_item.name][0].execCommand("insertHTML",
                _htmlContent[0].innerHTML)
                

                if( _item.name == 'ready' ){
                  self.ResourceLists[0].added = true
                }
                if( _item.name == 'guide' ){
                  self.ResourceLists[1].added = true
                }
                if( _item.name == 'target' ){
                  self.ResourceLists[2].added = true
                }
                if( _item.name == 'task' ){
                  self.ResourceLists[3].added = true
                }
                if( _item.name == 'summary' ){
                  self.ResourceLists[4].added = true
                }
                if( _item.name == 'extra' ){
                  self.ResourceLists[5].added = true
                }
                window.getSelection().removeAllRanges()
              })
            }

            // content遍历
            if( Data.taskContents ){
              Data.taskContents.forEach( item => {
                let _item = item.taskWorksEntity
                if( item.contentType == 4 ){
                  self.ADDWORKARRAY.push({
                    text: _item.worksTitle,
                    id: item.contentId,
                    scalel:_item.teacherGradingRatio*10+':'+( 10-_item.teacherGradingRatio*10 ),
                    worksDescription:_item.worksDescription,
                    format:JSON.parse(_item.worksSuffix),
                    scoreStandard:JSON.parse(_item.worksEvaluationStandard)
                  })
                }
              })
              console.log(self.ADDWORKARRAY)
            }
            window.getSelection().removeAllRanges()
          }
        }
      } , (err) => {
        callLoading.deactiveLoading()
        this.getTaskCunStatus = false
      } )
    },

    // 删除暂存任务
    DeleteTaskTemp(){
      callLoading.activeLoading()
      this.$http.post( ADDRESS.DELETE_CUN_TASK ,{
        taskId : this.tempTaskId
      }).then( (res) => {
        callLoading.deactiveLoading()
        if( res.body.code == 1 ){
          this.getTaskCunStatus = false
          callToast('成功删除暂存任务！')
        }
        else{
          this.getTaskCunStatus = false
        }
      } , (err) => {
        callLoading.deactiveLoading()
      })
    },

    // 刷新资源区
    RefreshContentList(index){
      if( index == 1 ){
        this.GETMYALLMATTERS()
        return
      }
      if( index == 2 ){
        this.GETMYALLVIDEOS()
        return
      }
      if( index == 3 ){
        this.GETMYALLPAPERS()
        return
      }
      if( index == 4 ){
        this.GETMYALLMODELS()
        return
      }
    },

    // 跳外链添加资源
    openNewExpor(index0f){
      let ADREE = window.location.href.split('/task/publish')[0]
      if( index0f == 1){
        window.open(ADREE+'/personalSource/courseware/upload')
        return
      }
      if( index0f == 2){
        window.open(ADREE+'/personalSource/lessonPlan/upload')
        return
      }
      if( index0f == 3){
        window.open(ADREE+'/personalSource/materialOthers/upload')
        return
      }
      if( index0f == 4){
        window.open(ADREE+'/personalSource/video/upload')
        return
      }
      if( index0f == 5){
        window.open(ADREE+'/personalSource/testQuestion/prevGenerate')
        return
      }
      if( index0f == 6){
        window.open(ADREE+'/personalSource/taskTemplate/generate')
        return
      }
    },
    selectClass(){ // 选择班级弹出层
      this.class_index = 0
      this.$http.post(ADDRESS.CLASS_TEACHER_LIST_TREE)
      .then((res) => {
        if (res.body.code == 1) {
          if(res.body.data==''){
            callToast('您还未添加班级','warning')
            return
          }
          else{
            // this.dialogFormVisible = true
            const _data = res.body.data
            for (var i = 0; i < _data.length; i++) {
              this.SelectedClass.push({
                determine: true,
                dataList: [],
                classList: _data[i].list,
                checkAll: false,
                label: _data[i].session
              })                
            }
            console.log(this.SelectedClass)
            this.classesList = res.body.data
            this.classesPags = res.body.data[0].list
          }
        }
        else{
          callToast('您还未添加班级','warning')
        }
      }, (err) => {
          callToast('您还未添加班级','warning')
      })
    },

    classIndexChange($index){  // 根据届获取班级
      this.class_index = $index
      this.SelectedIndex = $index
      this.classesPags = this.classesList[$index].list

    },

    SelectedAllHandler($index, $event) {

      if ($event.target.checked) {
        this.SelectedClass[$index].dataList = []
        for(let i = 0; i<this.SelectedClass[$index].classList.length; i++) {
          this.SelectedClass[$index].dataList.push(this.SelectedClass[$index].classList[i])
        }
      }
        this.SelectedClass[$index].determine = false;

    },

    SelectedOneHandler($index,$event) {

        let checkedCount = $event.length;
        this.SelectedClass[$index].checkAll = checkedCount === this.SelectedClass[$index].classList.length;
        this.SelectedClass[$index].determine = checkedCount > 0 && checkedCount < this.SelectedClass[$index].classList.length;
    },

    SelectedConfirm() {
      this.SelectedConfirmClass = deepClone(this.SelectedClass)
      this.dialogFormVisible = false
    },

    SelectedDeleted(x,y) {
      this.SelectedConfirmClass[x].dataList.splice(y,1)
      this.SelectedClass[x].dataList.splice(y,1)
      this.SelectedClass[x].checkAll = false
      this.SelectedClass[x].determine = false
 
    },

    querySearchAsyncBeforeTask(queryString, cb){
      if( queryString != '' ){
        var restaurants = this.restaurantsBeforTask;
        var results = [];
        this.$http.get(ADDRESS.SEARCH_BEFORE_TASK,
          { params:{title :queryString}} )
        .then((res) => {
          if (res.body.code == 1) {
            res.body.data.list.forEach(function(item){
              results.push({id:item.id,value:item.title})
            })
          }
          else{
            callToast('没有搜索到相关任务','warning')
          }
        },(err) => {
  
        })
        cb(results);
      }
    },

    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    
    handleSelect(item) {  // 选择前置任务
      this.task.beforeId = item.id;
    },

    sureAddedClasses(){    //确定添加的班级
      this.dialogFormVisible = false
      this.sureAddedClass = this.checkedClass
    },
    deleteClass(_index){   // 删除已添加的班级
      this.sureAddedClass.splice(_index,1);
      // this.checkedClass.splice(_index,1);
    },
    taskSartTime(startTime){//任务开始时间
      if(this.task.endtime==''){
        this.task.startTime = startTime;
      }else{
        if(new Date(this.task.startTime).getTime() - 
          new Date(this.task.endtime).getTime() > 0){
          callToast('开始时间不能大于结束时间','warning')
          this.task.startTime =''
        }
        else{
          this.task.startTime = startTime
        }
      }
    },
    taskEndTime(endTime){  //任务结束时间
      if(this.task.startTime==''){
        this.task.endtime = endTime
      }else{
        if(new Date(this.task.endtime).getTime() - 
          new Date(this.task.startTime).getTime() < 0){
          callToast('结束时间不能小于开始时间','warning')
          this.task.endtime =''
          this.task.openAnalysisTime = ''
        }
        else{
          this.task.endtime = endTime
        }
      }
    },
    taskOpenAnalysisTime( openTime ){
      console.log(openTime)
      if( this.task.endtime == '' ){
        callToast('要先选择任务结束时间','warning')
        this.task.openAnalysisTime = ''
        return
      }
      if(new Date(this.task.endtime).getTime() - 
        new Date(this.task.openAnalysisTime).getTime() > 0){
        this.task.openAnalysisTime = this.task.endtime
        callToast('解析时间必须大于任务结束时间','warning')
        return
      }
      else{
        this.task.openAnalysisTime = openTime
      }
    },
    anyaisChange(lastTime){  //时间比较
      var isTime = true
      if(new Date(lastTime).getTime() - 
        new Date(this.task.endtime).getTime() < 0){
        callToast('解析公布时间不能早于任务结束时间','warning')
        isTime = false
      }
      else{
        lastTime += ':00'
      }
    },

    addResourcePushToPage(item){   // 添加到资源库
      if(!item.added){
        item.added = !item.added
        this.AddedResourceType = true
        this.AddedTaskResource.push('1')
      }
    },
    DeleteAddedResource(item){   // 删除添加的资源
      item.content = ''
      item.added = false
      this.AddedTaskResource.splice(0,1)
      if(this.AddedTaskResource == ''){
        this.AddedResourceType = false
      }
    },
    AddedWorkItem(item){   //添加作品要求方法
      this.dialogWorkItem = true
      this.AddedWorks.text = ''
      this.AddedWorks.worksDescription = ''
      this.AddedWorks.format = []
      this.AddedWorks.sumNum = 0
      this.AddedWorks.id = ''
      this.AddedWorks.scoreStandard =[
          {
            standard:'',
            score:''
          }
        ]
    },
    changeInputScore( keyword ){
      let scalelBefore = document.getElementById('scalelBefore').value
      let scalelAfter = document.getElementById('scalelAfter').value
      if( keyword == 'before' ){
        if( scalelBefore >=0 && scalelBefore <= 10 ){
          this.AddedWorks.scalel = scalelBefore+':'+(10-scalelBefore)
        }
        else{
          document.getElementById('scalelBefore').value = 6
          document.getElementById('scalelAfter').value = 4
          this.AddedWorks.scalel = '6:4'
        }
      }
      else{
        if( scalelAfter >=0 && scalelAfter <= 10 ){
          this.AddedWorks.scalel = (10-scalelAfter)+':'+scalelAfter
        }
        else{
          document.getElementById('scalelBefore').value = 6
          document.getElementById('scalelAfter').value = 4
          this.AddedWorks.scalel = '6:4'
        }
      }
      // 对评分做最后处理
      if( this.AddedWorks.scalel == '00:10' ){
        this.AddedWorks.scalel = '0:10'
      }
      else if( this.AddedWorks.scalel == '10:00' ){
        this.AddedWorks.scalel = '10:0'
      }
    },
    changeInputValue(){   //作品得分限制
      const _this = this
      
      this.AddedWorks.scoreStandard.forEach( item =>{
        if(item.score == ''){
          _this.sumNum += 0
          return
        }
        if(item.score > 100){
          item.score = ''
          callToast('请输入1-100分数字','warning')
          return
        }
        else{
          _this.sumNum += parseInt(item.score)
        }
      })
    },
    AddProMark(){   // 添加作品标准
      if(this.AddedWorks.scoreStandard.length == 5){
        callToast('最多添加5条标准','warning')
      }
      else{
        this.AddedWorks.scoreStandard.push({
          standard:'',
          score:''
        })
      }
    },
    sureAddedWorks(){  //产品要求增加
      console.log(this.AddedWorks)
      if( this.AddedWorks.scalel == ':10' ){
        this.AddedWorks.scalel = '0:10'
      }
      else if( this.AddedWorks.scalel == '10:' ){
        this.AddedWorks.scalel = '10:0'
      }
      let AddedWorks = deepClone(this.AddedWorks)
      // this.ADDWORKARRAY.push(AddedWorks)
      var _door = true
      if( this.AddedWorks.text == ''){
        callToast('请填写作品名称','warning')
        return
      }
      if( this.AddedWorks.worksDescription == ''){
        callToast('请填写作品要求','warning')
        return
      }
      if( this.AddedWorks.format == ''){
        callToast('请选择作品格式','warning')
        return
      }
      this.AddedWorks.sumNum = 0
      this.AddedWorks.scoreStandard.forEach( item =>{
        this.AddedWorks.sumNum += +item.score
        if( item.standard == '' ){
          _door = false
          callToast('请填写标准要求','warning')
          return
        }
        if( item.score == '' ){
          _door = false
          callToast('请填写标准分值','warning')
          return
        }
        else{
          _door = true
        }
      })

      if( this.AddedWorks.sumNum != 100 ){
        _door = false
        callToast('满分100分！','warning')
        return
      }
      else{
        _door = true
      }

      for(let i=0;i<this.AddedWorks.format.length;i++){
        console.log(this.AddedWorks.format[i])
        if( this.AddedWorks.format[i] =='doc' ){
          this.AddedWorks.format[i] = 'doc(x)'
        }
        else if( this.AddedWorks.format[i] =='xls' ){
          this.AddedWorks.format[i] = 'xls(x)'
        }
        else if( this.AddedWorks.format[i] =='ppt' ){
          this.AddedWorks.format[i] = 'ppt(x)'
        }
      }

      if( _door ) {
        this.dialogWorkItem = false
        let _self = this
        var _html = ''
        for(var i=0;i<this.AddedWorks.scoreStandard.length;i++ ){
          const item = this.AddedWorks.scoreStandard[i]
          _html += '<li><div class="inline-block">（'+(i+1)+'）、'+item.standard+'</div><p class="inline-block">'+item.score+'分</p></li>'      
        }

        if( this.AddedWorks.id != '' ){
          var _ALLHTML =  `<br><div class="TASK-WORKS TASK-WORKS-ID fs-16 added-work-pro-content relative" id="${this.AddedWorks.id}" data-suffix="${this.AddedWorks.format}" data-id="" data-name="${this.AddedWorks.text}" contenteditable="false" oncopy="alert('禁止复制！');return false;"><span id="${this.AddedWorks.id}" class="TASK-WORKS-ID Th-f-c-red-1 absolute">更改</span><p class="WorkTitle">作品名称： ${this.AddedWorks.text}</p><p class="WorkEnty">作品要求：${this.AddedWorks.worksDescription }</p><p class="WorkFormat">格式：<span class="TH-f-c-link">${this.AddedWorks.format}</span></p><p class="teacher-students-scalel">评分比重：老师：学生 = ${this.AddedWorks.scalel}</p><div class="clear WorkStandards"><p class="fl">评分标准：</p><ul class="fl">${_html}</ul></div></div><br>`
          // var _ALLHTML =  `<br><div class="TASK-WORKS TASK-WORKS-ID fs-16 added-work-pro-content relative" id="${this.AddedWorks.id}" data-suffix="${this.AddedWorks.format}" data-id="" data-name="${this.AddedWorks.text}" contenteditable="false" oncopy="alert('禁止复制！');return false;" onselectstart="return false"><span id="${this.AddedWorks.id}" class="TASK-WORKS-ID Th-f-c-red-1 absolute">更改</span><p>作品名称： ${this.AddedWorks.text}</p><p>作品要求：${this.AddedWorks.worksDescription }</p><p>格式：<span class="TH-f-c-link">${this.AddedWorks.format}</span> </p><div class="clear"><p class="fl">评分标准：</p><ul class="fl">${_html}</ul></div></div><br>`
          let dom = '<div>'+this.ResourceLists[3].content+'</div>'
          let _htmlContent = $(dom).find('.added-work-pro-content')
          
          for( var i=0;i<_htmlContent.length;i++){
            console.log(_htmlContent[i].id)
            if( _htmlContent[i].id == _self.AddedWorks.id ){
              _self.ResourceLists[3].content = dom.replace(_htmlContent[i].outerHTML,_ALLHTML)
              for( var i=0;i<_self.ADDWORKARRAY.length;i++ ){
                if( _self.ADDWORKARRAY[i].id == AddedWorks.id ){
                  _self.ADDWORKARRAY[i] = AddedWorks
                }
              }
            }
          }
        }
        else{
          _self.AddWorksId++
          let WorkID = _self.AddWorksId
          AddedWorks.id = WorkID
          _self.ADDWORKARRAY.push(AddedWorks)

          var ALLHTML = `<br><div class="TASK-WORKS TASK-WORKS-ID fs-16 added-work-pro-content relative" id="${WorkID}" data-suffix="${_self.AddedWorks.format}" data-id="" data-name="${_self.AddedWorks.text}" contenteditable="false" oncopy="alert('禁止复制！');return false;"><span id="${WorkID}" class="TASK-WORKS-ID Th-f-c-red-1 absolute">更改</span><p class="WorkTitle">作品名称：${_self.AddedWorks.text}</p><p class="WorkEnty">作品要求：${_self.AddedWorks.worksDescription}</p><p class="WorkFormat">格式：<span class="TH-f-c-link">${_self.AddedWorks.format}</span></p><p class="teacher-students-scalel">评分比重：老师：学生 = ${_self.AddedWorks.scalel}</p><div class="clear WorkStandards"><p class="fl">评分标准：</p><ul class="fl">${_html}</ul></div></div><br>`
          // var ALLHTML =  `<br><div class="TASK-WORKS TASK-WORKS-ID fs-16 added-work-pro-content relative" id="${WorkID}" data-suffix="${_self.AddedWorks.format}" data-id="" data-name="${_self.AddedWorks.text}" contenteditable="false" oncopy="alert('禁止复制！');return false;" onselectstart="return false"><span id="${WorkID}" class="TASK-WORKS-ID Th-f-c-red-1 absolute">更改</span><p>作品名称： ${_self.AddedWorks.text}</p><p>作品要求：${_self.AddedWorks.worksDescription }</p><p>格式：<span class="TH-f-c-link">${_self.AddedWorks.format}</span> </p><div class="clear"><p class="fl">评分标准：</p><ul class="fl">${_html}</ul></div></div><br>`
          _self.$refs['task'][0].execCommand("insertHTML", ALLHTML)
        }
      }
      // console.log(this.ADDWORKARRAY)
    },
    DeleteProMark( index ){  //删除作品标准
      this.AddedWorks.scoreStandard.splice(index,1)
    },
    handleChecked( value ){  //作品要求
      if( this.AddedWorks.format.length > 3 ){
        callToast('最多选择三个格式哦！','warning')
        this.AddedWorks.format.splice(-1,1)
      }
    },
    SearchAdded( _index ){  //tab查询
      this.activityOption.active = _index
      this.workPages.current = 1

      if( this.NowDialogStatus === 'model' ){  //模板
        this.SearchModel.page = 1
        if( _index == 1 ){
          this.SearchModel.condition = 'my'
        }
        else if( _index == 2 ){
          this.SearchModel.condition = 'favor'
        }
        else{
          this.SearchModel.condition = ''
        }
        this.GETMYALLMODELS()
      }

      if( this.NowDialogStatus == 'matter' ){  //素材
        this.SearchMatter.page = 1
        // this.SearchMatter.query = 1
        this.SearchMatter.materialType = _index
        this.GETMYALLMATTERS()
      }

      if( this.NowDialogStatus == 'video' ){  //视频
        this.SearchVideo.page = 1
        if( _index == 3 ){
          this.SearchVideo.query = ''
        }
        else{
          this.SearchVideo.query = _index
        }
        this.GETMYALLVIDEOS()
      }

      if( this.NowDialogStatus == 'paper' ){  //试卷
        this.SearchPaper.page = 1
        if( _index == 3 ){
          this.SearchPaper.searchType = 1
        }
        else{
          this.SearchPaper.searchType = +_index + 1
        }
        this.GETMYALLPAPERS()
      }
    },
    SearchMatterQuery( index ){
      if( index == 3 ){
        this.SearchMatter.query = ''
      }
      else{
        this.SearchMatter.query = index
      }
      this.GETMYALLMATTERS()
    },
    CloseSearchAdded(){  //关闭弹出层 并 添加到富文本内  转换成图片
      // 添加到富文本内
      if( this.SelectDropDown.id == null){
        callToast('你还没有选择呢！','warning')
        return
      }
      if( this.NowDialogStatus == 'paper' ){
        if( this.SelectDropDown.timeLimit == '' ){
          callToast('限时不能空着','warning')
          return
        }
        if( this.SelectDropDown.answerLimit == '' ){
          callToast('最多答题次数不能空着','warning')
          return
        }
        else{
          this.dialogFormVisibleAdded = false
        }
      }
      if( this.NowDialogStatus == 'model' ){
        console.log()
        this.GETALLMESSAGETEMP( this.SelectDropDown.id )
        return
      }
      else{
        this.dialogFormVisibleAdded = false
      }
      var childNode = document.createElement('div')
      childNode.setAttribute('class', 'editor-add-resource');
      childNode.setAttribute('contenteditable', 'false');
      childNode.innerHTML = 
        '<span class="s_name">'+this.SelectDropDown.name+'&nbsp;&nbsp;&nbsp;&nbsp;<i style="color:#3283d3;font-size:24px">×</i></span>'
        // '<span class="s_img"><img onclick="event.target.parentElement.remove()"'+
        // ' src="static/imgs/common/delete-item.png"></span>';
      document.body.appendChild(childNode)
      const self = this
      var _id = ''
      var _className = ''
      if( this.NowDialogStatus == 'matter'){
        _className = 'targetMater'
        _id = self.SelectDropDown.id
      }
      if( this.NowDialogStatus == 'video' ){
        _className = 'targetVideo'
        _id = self.SelectDropDown.id
      }
      if( this.NowDialogStatus == 'paper' ){
        _className = 'targetPaper'
        _id = self.SelectDropDown.id +'||'
              + self.SelectDropDown.timeLimit + '||'
              + self.SelectDropDown.answerLimit
      }
      domtoimage.toPng(childNode)
        .then(function (dataUrl) {
            childNode.remove()
            var img = new Image();
            img.src = dataUrl;
            img.setAttribute('class', _className + ' HTMLIMAGE')
            img.name = self.SelectDropDown.name + '||' + _id
            // img.setAttribute('onclick', `
            //   var _this = this;
            //   (function(){
            //     if((event.target.clientWidth - 40) < event.offsetX &&
            //         event.offsetX < (event.target.clientWidth -15)){
            //       _this.remove()
            //     }
            //   })()`)
            self.$refs[self.activityOption.content][0].execCommand("insertHTML",img.outerHTML+'&nbsp;')
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    },
    GETALLMESSAGETEMP( id ){  // 获取模板详情
      callLoading.activeLoading()
      this.$http.post( ADDRESS.SOURCEREPO_TASKTEMPLATE_DETAIL_ADDR,
        { tempId : id })
      .then( (res) => {
        callLoading.deactiveLoading()
        if( res.body.code == 1 ){
          this.dialogFormVisibleAdded = false
          let self = this
          for( var i=0;i< res.body.data.teachingProceduresDtos.length;i++ ){
            const item = res.body.data.teachingProceduresDtos[i]
            self.AddedResourceType = true
            self.AddedTaskResource.push('1')

            let _item = item

            callLoading.activeLoading()
            A_TO_IMAGE(item.html, ( html ) => {
              // console.log(c)

              callLoading.deactiveLoading()
              const dom = '<div>'+html+'</div>'
              const _htmlContent = $(dom).find('.add-resource-container-content')

              
              self.$refs[_item.name][0].execCommand("insertHTML",
              _htmlContent[0].innerHTML)
              

              if( _item.name == 'ready' ){
                self.ResourceLists[0].added = true
              }
              if( _item.name == 'guide' ){
                self.ResourceLists[1].added = true
              }
              if( _item.name == 'target' ){
                self.ResourceLists[2].added = true
              }
              if( _item.name == 'task' ){
                self.ResourceLists[3].added = true
              }
              if( _item.name == 'summary' ){
                self.ResourceLists[4].added = true
              }
              if( _item.name == 'extra' ){
                self.ResourceLists[5].added = true
              }
              window.getSelection().removeAllRanges()
            })

          }

          // content遍历
          res.body.data.content.forEach( item => {
            if( item.contentType == 4 ){
              self.ADDWORKARRAY.push({
                text: item.contentTitle,
                id: item.contentId,
                scalel:'6:4',
                worksDescription:item.worksDescription,
                format:JSON.parse(item.worksSuffix),
                scoreStandard:JSON.parse(item.worksEvaluationStandard)
              })
            }
          })
          window.getSelection().removeAllRanges()
        }
      }, (err) => {
        callLoading.deactiveLoading()
      })
    },
    TaskActionShow(){
      this.task.showChoiceFlag = true
      this.NowDialogStatus = 'action'
    },
    handleChoice(ev){  //树的节点添加查询
      if(this.NowDialogStatus == 'model' ){//模板
        this.activityOption.choosenActivity[0] = ev
        this.SearchModel.activityIds = [ev.id]
        this.searchActivity.modelName = ev.label
        this.GETMYALLMODELS()
        return
      }
      if( this.NowDialogStatus == 'matter' ){//素材
        this.activityOption.choosenActivity[0] = ev
        this.SearchMatter.activityId = ev.id
        this.searchActivity.matterName = ev.label
        this.GETMYALLMATTERS()
        return
      }
      if( this.NowDialogStatus == 'action' ){
        this.activityOption.choosenActivity[0] = ev
        this.task.actionName = ev.label
        this.task.action = ev.id
        //给筛选条件赋初值
        this.searchActivity.modelName = ev.label
        this.searchActivity.matterName = ev.label
        this.searchActivity.videoName = ev.label
        return
      }
      else{ //视频
        this.activityOption.choosenActivity[0] = ev
        // this.activityOption.knowledgeIds.push(ev.id)
        this.searchActivity.videoName = ev.label
        this.SearchVideo.categoryIds[0] = ev.id
        this.GETMYALLVIDEOS()
      }
    },
    removeSelect(item, index) {  //从树中移除出去
      if( this.NowDialogStatus == 'action'){
        this.task.action = ''
        this.task.actionName = ''
        clearTree(this.selectOption)
        return
      }
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
      if( this.NowDialogStatus == 'model' ){
        this.SearchModel.activityIds = []
        this.GETMYALLMODELS()
        clearTree(this.selectOption)
      }
      else if( this.NowDialogStatus == 'matter' ){
        // this.SearchModel.activityIds = []
        this.SearchMatter.activityId = ''
        this.GETMYALLMATTERS()
        clearTree(this.selectOption)
      }
      else if( this.NowDialogStatus == 'video' ){
        const _si = item.selectIndex
        // this.selectOption[_si[0]].children[_si[1]].children[_si[2]].children[_si[3]].open = false
        this.SearchVideo.categoryIds = []
        this.GETMYALLVIDEOS()
        clearTree(this.selectOption)
      }
    },
    searchVideoPaperName(){ //根据名字查询列表
      if( this.NowDialogStatus === 'model' ){
        this.GETMYALLMODELS()
      }
      if( this.NowDialogStatus == 'matter' ){
        this.GETMYALLMATTERS()
      }
      if( this.NowDialogStatus == 'video' ){
        this.GETMYALLVIDEOS()
      }
      if( this.NowDialogStatus == 'paper' ){
        this.GETMYALLPAPERS()
      }
    },
    AddResourceReady( item,content ){  //添加资源弹出层
      // clearTree(this.selectOption)
      // 初始化
      this.activityOption.active = 1

      this.SearchModel = {  //模板查询
        title:'',
        condition:'my',
        activityIds:this.task.action==''?[]:[this.task.action],
        page: 1,
        rows:10
      }

      this.SearchMatter= { //素材查询
        query:1,
        fileTitle:'',
        sort:2,
        materialType:1,
        activityId:this.task.action==''?'':this.task.action,
        page:1,
        rows:10
      }

      this.SearchVideo = {  //视频查询
        videoName:'',
        categoryIds:this.task.action==''?[]:[this.task.action],
        query:1,
        page:1,
        rows:10
      }

      this.SearchPaper = {  //试卷查询
        searchType:2,
        keyword:"",
        page:1,
        rows:10
      }

      this.workPages.current = 1
      this.activityOption.content = content
      this.SelectDropDown = {}
      this.dialogFormVisibleAdded = true 
      this.NowDialogStatus = item
      if( item === 'model' ){
        this.activityOption.text = '模板'
        this.GETMYALLMODELS()
        return
      }
      if( item === 'matter'){
        this.GETMYALLMATTERS()
        return
      }
      if( item === 'video'){
        this.GETMYALLVIDEOS()
        this.activityOption.text = '视频'
        return
      }
      if( item === 'paper'){
        this.GETMYALLPAPERS()
        this.activityOption.text = '试卷'
        return
      }
    },
    checkSelectModel( item,index ){  // 单选列表中的一个
      // if( this.NowDialogStatus == 'paper' ){
      //   this.SearchArrList.forEach( item =>{
      //     item.timeLimit = ''
      //     item.answerLimit = ''
      //     item.type = false
      //   })
      // }
      // item.type = true
      // this.selectedAddResource[0] = item
      // this.SelectDropDown = item

      this.selectedAddResource = []
      this.selectedAddResource[0] = item
      this.SelectDropDown = item
      if( this.NowDialogStatus == 'paper' ){
        this.SearchArrList.forEach( item =>{
          item.timeLimit = ''
          item.answerLimit = ''
          item.type = false
        } )
        item.type = true
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if( this.NowDialogStatus == 'model' ){
        this.SearchModel.page = val
        this.GETMYALLMODELS()
        return
      }
      if( this.NowDialogStatus == 'video' ){
        this.SearchVideo.page = val
        this.GETMYALLVIDEOS()
      }
      if( this.NowDialogStatus == 'paper' ){
        this.SearchPaper.page = val
        this.GETMYALLPAPERS()
        return
      }
      else{
        this.SearchMatter.page = val
        this.GETMYALLMATTERS()
        return
      }
    },
    GETMYALLMODELS(){ //获得所有模板列表
      callLoading.activeLoading()

      let ModelAddress = ADDRESS.SEARCH_TEMP_FORM_SQL

      if( this.SearchModel.condition=='' ){
        ModelAddress = ADDRESS.SOURCEREPO_TEMP_LIST_ADDR
      }

      this.$http.post(ModelAddress,this.SearchModel)
      .then( (res) => {
        callLoading.deactiveLoading()
        if( res.body.code == 1 ){
          const _LIST = res.body.data.list
          this.workPages.total = +res.body.data.total
          _LIST.forEach( item => {
            item.name = item.tempName
            item.id = item.tempId
            item.type = false
          })
          this.SearchArrList = _LIST
          // console.log(this.SearchArrList)
        }
        else{
          this.SearchArrList = []
        }
      } , (err) => {
        callLoading.deactiveLoading()
      })
    },
    GETMYALLVIDEOS(){ //获得所有视频列表
      callLoading.activeLoading()

      let ModelAddr = ADDRESS.GET_VIDEO_BY_CONDITION

      if( this.SearchVideo.query=='' ){
        ModelAddr = ADDRESS.SOURCEREPO_VIDEO_ADDR
      }

      this.$http.post(ModelAddr,this.SearchVideo)
      .then( (res) => {
        callLoading.deactiveLoading()
        if( res.body.code == 1 ){
          this.workPages.total = +res.body.data.total
          const _LIST = res.body.data.list
          _LIST.forEach( item => {
            item.name = item.videoName
            item.id = item.videoId
            item.type = false
          })
          this.SearchArrList = _LIST
          // console.log(this.SearchArrList)
        }
        else{
          this.SearchArrList = []
        }
      } , (err) => {
        callLoading.deactiveLoading()
      })
    },
    GETMYALLPAPERS(){ //获得所有试卷列表
      callLoading.activeLoading()
      this.$http.post(ADDRESS.GET_PAPER_ALL_LISTS
      ,this.SearchPaper)
      .then( (res) => {
        callLoading.deactiveLoading()
        if( res.body.code == 1 ){
          this.workPages.total = +res.body.data.total
          const _LIST = res.body.data.list
          _LIST.forEach( item => {
            item.name = item.paperTitle
            item.id = item.paperId
            item.type = false
          })
          this.SearchArrList = _LIST
          // console.log(this.SearchArrList)
        }
        else{
          this.SearchArrList = []
        }
      } , (err) => {
        callLoading.deactiveLoading()
      })
    },
    GETMYALLMATTERS(){ //获得所有素材列表
      callLoading.activeLoading()

      let MaterAddress = ADDRESS.GET_MATER_ALL_LISTS
      if( this.SearchMatter.query=='' ){
        MaterAddress = ADDRESS.MATERIALS_BY_CONDITIONS
      }

      this.$http.post(MaterAddress,this.SearchMatter)
      .then( (res) => {
        callLoading.deactiveLoading()
        if( res.body.code == 1 ){
          this.workPages.total = +res.body.data.total
          const _LIST = res.body.data.list
          _LIST.forEach( item => {
            item.name = item.fileTitle
            item.id = item.materialId
            item.type = false
          })
          this.SearchArrList = _LIST
          // console.log(this.SearchArrList)
        }
        else{
          this.SearchArrList = []
        }
      } , (err) => {
        callLoading.deactiveLoading()
      })
    },
    updateDataReady( content ){
      this.ResourceLists[0].content = content
    },
    updateDataGuide( content ){
      this.ResourceLists[1].content = content
    },
    updateDataTarget( content ){
      this.ResourceLists[2].content = content
    },
    updateDataTask( content ){
      this.ResourceLists[3].content = content
    },
    updateDataSummary( content ){
      this.ResourceLists[4].content = content
    },
    updateDataExtra( content ){
      this.ResourceLists[5].content = content
    },
    convertImgToUrl( content){
      return convertImgToUrlCutHref(content)
    },
    SummitTask( $key ){
      if( $key == 'prev' ){
        this.TASK_PREVIEW = true
      }
      else {

      if(this.task.name == '' && $key == 'load' ){
        callToast('请填写任务名','warning')
        return
      }
      if(this.task.action == '' && $key == 'load'){
        callToast('请选择活动','warning')
        return
      }
      
      if(this.task.startTime == '' && $key == 'load'){
        callToast('请填写任务开始时间','warning')
        return
      }
      if(this.task.endtime == '' && $key == 'load'){
        callToast('请填写任务结束时间','warning')
        return
      }

      //  班级ID数组
      var CHECKEDCLASSES = ''
      var CHEACKEDNAMES = ''

      for (var i = 0; i < this.SelectedClass.length; i++) {
        for (var j = 0; j < this.SelectedClass[i].dataList.length; j++) {
          CHECKEDCLASSES += this.SelectedClass[i].dataList[j].classId+','
        }        
      }

      if(CHECKEDCLASSES == '' && $key == 'load'){
        callToast('请选择班级','warning')
        return
      }
        // this.sureAddedClass.forEach( item => {
        //   CHECKEDCLASSES += 
        //     (CHECKEDCLASSES==''?'':',')
        //     + item.classId
        //   CHEACKEDNAMES +=
        //     (CHEACKEDNAMES==''?'':'、')
        //     + item.className
        // })
        // 资源数组
        const ResourceContent = []
        var _size = 0

        var ReadyHtml = ''
        if( this.$refs['ready'][0].content !='' ){//学习准备
          const dom = '<div>'+ this.$refs['ready'][0].content +'</div>'
          const _AddedContent = $(dom).find('.HTMLIMAGE')
          for(var i=0;i<_AddedContent.length;i++){
            _size++
            console.log(_AddedContent)
            const keyWord = _AddedContent[i].name
            const name = keyWord.split('||')[0]
            const id = keyWord.split('||')[1]
            const timeLimit = keyWord.split('||')[2]
            const answerLimit = keyWord.split('||')[3]
            const _className = _AddedContent[i].className
            var _key = 1
            if( _className == 'targetMater HTMLIMAGE' ){
              _key = 3
              ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name
              })
            }
            else if( _className == 'targetVideo HTMLIMAGE' ){
              _key = 1
              ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name
              })
            }
            else if( _className == 'targetPaper HTMLIMAGE' ){
              _key = 2
              ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name,
                timeLimit:timeLimit,
                answerLimit:answerLimit
              })
            }
            
          }
        }
      

        if( this.$refs['guide'][0].content !='' ){//学习向导
          const dom = '<div>'+ this.$refs['guide'][0].content +'</div>'
          const _AddedContent = $(dom).find('.HTMLIMAGE')
          for(var i=0;i<_AddedContent.length;i++){
            _size++
            console.log(_AddedContent)
            const keyWord = _AddedContent[i].name
            const id = keyWord.split('||')[1]
            const name = keyWord.split('||')[0]
            const _className = _AddedContent[i].className
            var _key = 1
            if( _className == 'targetMater HTMLIMAGE' ){
              _key = 3
            }
            else if( _className == 'targetVideo HTMLIMAGE' ){
              _key = 1
            }
            ResourceContent.push({
              type : _key,
              order: _size,
              id   : id,
              name : name
            })
          }
        }

        if( this.$refs['target'][0].content !='' ){//学习目标
          const dom = '<div>'+ this.$refs['target'][0].content +'</div>'
          const _AddedContent = $(dom).find('.HTMLIMAGE')
          for(var i=0;i<_AddedContent.length;i++){
            _size++
            console.log(_AddedContent)
            const keyWord = _AddedContent[i].name
            const id = keyWord.split('||')[1]
            const name = keyWord.split('||')[0]
            const _className = _AddedContent[i].className
            var _key = 1
            if( _className == 'targetMater HTMLIMAGE' ){
              _key = 3
            }
            ResourceContent.push({
              type : _key,
              order: _size,
              id   : id,
              name : name
            })
          }
        }

        var TaskHtml = ''
        if( this.$refs['task'][0].content !='' ){//学习任务
         
          const dom = '<div>'+ this.$refs['task'][0].content +'</div>'
          const _AddedContent = $(dom).find('.HTMLIMAGE')
          const _WorksContent = $(dom).find('.added-work-pro-content')
          
          //作品
          var workHtml = ''
          for( var j=0;j<_WorksContent.length;j++){
            for(var k=0;k<this.ADDWORKARRAY.length;k++){
              _size++
              if( _WorksContent[j].id == this.ADDWORKARRAY[k].id ){
                this.ADDWORKARRAY[k].type  = 4
                this.ADDWORKARRAY[k].order = _size
                this.ADDWORKARRAY[k].name = this.ADDWORKARRAY[k].text
                let scalel
                if( this.ADDWORKARRAY[k].scalel == '0:10' ){
                  scalel = 0
                }
                else if(this.ADDWORKARRAY[k].scalel == '10:0'){
                  scalel = 1
                }
                else{
                  scalel = '0.'+this.ADDWORKARRAY[k].scalel.split(':')[0]
                }
                this.ADDWORKARRAY[k].teacherGradingRatio = scalel
                ResourceContent.push(this.ADDWORKARRAY[k])
              }
            }
          }

          // 素材 视频 试卷
          for(var i=0;i<_AddedContent.length;i++){
             _size++
            const keyWord = _AddedContent[i].name
            const name = keyWord.split('||')[0]
            const id = keyWord.split('||')[1]
            const timeLimit= keyWord.split('||')[2]
            const answerLimit = keyWord.split('||')[3]
            const _className = _AddedContent[i].className
            var _key = 1
            if( _className == 'targetMater HTMLIMAGE' ){
              _key = 3
              ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name
              })
            }
            else if( _className == 'targetVideo HTMLIMAGE' ){
              _key = 1  
              ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name
              })          
            }
            else if( _className == 'targetPaper HTMLIMAGE' ){
              _key = 2
              ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name,
                timeLimit:timeLimit,
                answerLimit:answerLimit
              })
            }
          }
        }

        var ExtraHtml = ''
        if( this.$refs['extra'][0].content !='' ){//额外拓展
          const dom = '<div>'+ this.$refs['extra'][0].content +'</div>'
          const _AddedContent = $(dom).find('.HTMLIMAGE')
          for(var i=0;i<_AddedContent.length;i++){
            _size++
            console.log(_AddedContent)
            const keyWord = _AddedContent[i].name
            const name = keyWord.split('||')[0]
            const id = keyWord.split('||')[1]
            const timeLimit = keyWord.split('||')[2]
            const answerLimit = keyWord.split('||')[3]
            const _className = _AddedContent[i].className
            var _key = 1
            if( _className == 'targetMater HTMLIMAGE' ){
              _key = 3
              ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name
              })
            }
            else if( _className == 'targetVideo HTMLIMAGE' ){
              _key = 1
              ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name
              })
            }
            else if( _className == 'targetPaper HTMLIMAGE' ){
              _key = 2
             ResourceContent.push({
                type : _key,
                order: _size,
                id   : id,
                name : name,
                timeLimit:timeLimit,
                answerLimit:answerLimit
              })
            }
          }
        }

        // HTML组合
        const HTML_CONTENT = 
        (this.ResourceLists[0].content==''?'':
        '<div name="ready" class="TASK-SECTION prepare-study-info border-bottom clear">'+
            '<div class="prepare-study-info-left content-left fl">'+
              '<div class="info-title fs-18">'+
                  '<span class="info-title-label inline-block"><img src="static/imgs/classTask/prepare.png" alt="prepare-study"></span>'+
                  '学习准备：'+
              '</div>'+
              '<div class="add-resource-container-content">'+
                  convertImgToUrl(this.ResourceLists[0].content)+
              '</div>'+
            '</div>'+
        '</div>')+
        (this.ResourceLists[1].content==''?'':
        '<div name="guide" class="TASK-SECTION guide-info border-bottom clear">'+
          '<div class="content-left">'+
            '<div class="info-title fs-18">'+
              '<span class="info-title-label inline-block"><img src="static/imgs/classTask/guide.png" alt="guide"></span>'+
                  '新课引导：'+
            '</div>'+
            '<div class="add-resource-container-content">'+
              convertImgToUrl(this.ResourceLists[1].content)+
            '</div>'+
          '</div>'+
        '</div>')+
        (this.ResourceLists[2].content==''?'':
        '<div name="target" class="TASK-SECTION border-bottom clear">'+
          '<div class="content-left">'+
            '<div class="info-title fs-18">'+
              '<span class="info-title-label inline-block"><img src="static/imgs/classTask/goal.png" alt="goal"></span>'+
                  '学习目标：'+
            '</div>'+
            '<div class="add-resource-container-content">'+
                convertImgToUrl(this.ResourceLists[2].content)+
            '</div>'+
          '</div>'+
        '</div>')+
        (this.ResourceLists[3].content==''?'':
        '<div name="task" class="TASK-SECTION border-bottom clear">'+
          '<div class="content-left fl">'+
            '<div class="info-title fs-18">'+
              '<span class="info-title-label inline-block"><img src="static/imgs/classTask/task.png" alt="task"></span>'+
                  '学习任务：'+
            '</div>'+
            '<div class="add-resource-container-content">'+
              convertImgToUrl(this.ResourceLists[3].content)+
            '</div>'+
          '</div>'+
        '</div>')+
        (this.ResourceLists[4].content==''?'':
        '<div name="summary" class="TASK-SECTION border-bottom clear">'+
          '<div class="content-left">'+
            '<div class="info-title fs-18">'+
              '<span class="info-title-label inline-block"><img src="static/imgs/classTask/feedback.png" ></span>'+
                  '反馈小结：'+
            '</div>'+
            '<div class="add-resource-container-content">'+
              convertImgToUrl(this.ResourceLists[4].content)+
            '</div>'+
          '</div>'+
        '</div>')+
        (this.ResourceLists[5].content==''?'':
        '<div name="extra" class="TASK-SECTION border-bottom clear">'+
          '<div class="content-left fl">'+
            '<div class="info-title fs-18">'+
              '<span class="info-title-label inline-block"><img src="static/imgs/classTask/outclass.png" ></span>'+
                  '课外延伸：'+
            '</div>'+
            '<div class="add-resource-container-content">'+
                convertImgToUrl(this.ResourceLists[5].content)+
            '</div>'+
          '</div>'+
        '</div>')

        let openAnalysisTime = ''
        if( this.task.openAnalysisTime == '' ){
          if( this.task.endtime !='' ){
            openAnalysisTime = this.task.endtime+':00'
          }
        }
        else{
          openAnalysisTime = this.task.openAnalysisTime + ':00'
        }

        let startTime =''
        let endtime = ''
        if( this.task.startTime != '' ){
          startTime = this.task.startTime+':00'
        }

        if( this.task.endtime != '' ){
          endtime = this.task.endtime+':00'
        }

        let urlAdress = ADDRESS.PUBLISH_TASKES
        if( $key == 'cun' ){
          urlAdress = ADDRESS.TASK_CUN_MYSQL
        }

        // console.log(ResourceContent)

        callLoading.activeLoading()
        this.$http.post(urlAdress,
          { title : this.task.name ,
            classIds : CHECKEDCLASSES,
            startTime : startTime,
            endTime : endtime,
            openAnalysisTime : openAnalysisTime,
            activityId :this.task.action,
            beforeId : this.task.beforeId,
            content : ResourceContent == ''?'':JSON.stringify( ResourceContent ),
            teachingProcedures : HTML_CONTENT
          })
        .then( (res) => {
          callLoading.deactiveLoading()
          if( res.body.code == 1 ){
            this.$store.user.content = false
            if(  $key == 'cun' ){
              callToast('任务暂存成功！')
              if( this.backToMainPage ){
                this.backToMainPage = false

                let _this = this
                window.setTimeout( function(){
                  if( _this.$store.user.url == 'back' ){
                    _this.$router.go(-1)
                  }
                  else{
                    _this.$router.push(this.$store.user.url)
                  }
                },500 )
              }
            }
            else{
              this.$router.push('/classTask/index')
            }
          }
          else{
            callToast(res.body.message,'error')
          }
          
        },(err) =>{
          callLoading.deactiveLoading()
        })
      } 
    },
    eventHandlerScroll() {
      if(window.scrollY > 180) {
        $('.u-add-resource-position').css({
          'top': window.scrollY - 100
        })
      }
      else {
        $('.u-add-resource-position').css({
          'top': 0
        })
      }
    },
    openStart(){
      $('.task-start-time').show()
    },
    openEnd(){
      $('.task-end-time').show()
    },
    OpenAnalysis(){
      $('.task-analysis-time').show()
    },
    canPreviewed(input) {
      if (
        input == 'doc'
        ||input == 'xls'
        ||input == 'ppt'
        ||input == 'png'
        ||input == 'jpg'
        ||input == 'mp4'
        ||input == 'swf'
      ) {
        return '（可预览）'
      }
    }
  },
  mounted() {
    this.$events.on('pageLeave',eventData  => {
      if( eventData ){
        this.backToMainPage = true
      }
    }),
    // this.restaurants = this.loadAll();
    window.addEventListener('click', ($event) => {
      // console.log($($event.target).parents())
      if( $event.target.className == 'TASK-WORKS-ID Th-f-c-red-1 absolute' ){
        for( var m=0;m<this.ADDWORKARRAY.length;m++ ){
          if( (this.ADDWORKARRAY[m].id == $event.target.id) && ($event.target.nodeName == 'SPAN') ){
            this.dialogWorkItem = true
            this.AddedWorks = deepClone(this.ADDWORKARRAY[m])
          }
        }
      }
      else if( $event.target.className == 'targetMater HTMLIMAGE' 
            || $event.target.className == 'targetVideo HTMLIMAGE'
            || $event.target.className == 'targetPaper HTMLIMAGE' )
      {

              if(($event.target.clientWidth - 40) < $event.offsetX && $event.offsetX < ($event.target.clientWidth -15)){
                
                if( $($event.target).parents('.vue-html5-editor')[0].id == 'EdtiorReady'){
                  this.ResourceLists[0].content = this.ResourceLists[0].content.replace($event.target.outerHTML,'')
                  return
                }
                if( $($event.target).parents('.vue-html5-editor')[0].id == 'EdtiorGuide'){
                  this.ResourceLists[1].content = this.ResourceLists[1].content.replace($event.target.outerHTML,'')
                  return
                }
                if( $($event.target).parents('.vue-html5-editor')[0].id == 'EdtiorTarget'){
                  this.ResourceLists[2].content = this.ResourceLists[2].content.replace($event.target.outerHTML,'')
                  return
                }
                if( $($event.target).parents('.vue-html5-editor')[0].id == 'EdtiorTask'){
                  this.ResourceLists[3].content = this.ResourceLists[3].content.replace($event.target.outerHTML,'')
                  return
                }
                if( $($event.target).parents('.vue-html5-editor')[0].id == 'EdtiorSummary'){
                  this.ResourceLists[4].content = this.ResourceLists[4].content.replace($event.target.outerHTML,'')
                  return
                }
                if( $($event.target).parents('.vue-html5-editor')[0].id == 'EdtiorExtra'){
                  this.ResourceLists[5].content = this.ResourceLists[5].content.replace($event.target.outerHTML,'')
                  return
                }
              }
      }
      
    }),
    window.addEventListener('scroll', this.eventHandlerScroll),
    window.addEventListener('dblclick', ( _event) => {

      let $event = $(_event.target).parents('.el-date-picker')
          $event.css('display','none')
      let _left = $event.find('.el-date-picker__editor-wrap').eq(0).find('input').val()
      let _right= $event.find('.el-date-picker__editor-wrap').eq(1).find('input').val()
      let _time = _left+' '+_right

      if( $event.hasClass('task-start-time') ){
        // $('.task-start-time').hide()
        this.task.startTime = _time

      }
      else if( $event.hasClass('task-end-time') ){
        this.task.endtime = _time
      }
      else if( $event.hasClass('task-analysis-time') ){
        this.task.openAnalysisTime = _time
      }

    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.eventHandlerScroll)
  },
}
</script>

<style src="./style.css" scoped>
</style>
