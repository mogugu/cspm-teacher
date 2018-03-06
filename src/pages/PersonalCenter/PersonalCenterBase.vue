
<template>
  <div class="container">
    <div class="pc-card TH-card">
      <div class="person-center-bg-base">
        <img src="~assets/imgs/center/personal-image.png" alt="">
      </div>
      <div class="relative">
        <!-- <p class="TH-f-c-dark-m absolute down-load-person-message"><img src="~assets/imgs/center/download.png" alt="download">把这份简历保存到本地</p> -->
        <div class="absolute person-absolute-headUrlImg">
          <div class="relative" @click="dialogOption.head=true">
            <img :src="userinfo.headimgurl" onerror="this.src='static/imgs/common/touxiang-default.png'">
            <p class="fs-13 ">更换头像</p>
          </div>
        </div>
        <div class="person-center-base-height"></div>
        <div class="person-center-base-info-message relative person-center-pad-min " @mouseover="edit.base=true" @mouseleave="edit.base=false" v-if="!edit.baseMes">
          <!-- <div class="absolute person-center-base-info-message-img">

          </div> -->
          <p class="fs-28 fwb TH-f-c-default th-f-bottom-more">
            {{userinfo.username}}
            <img v-if="edit.sex == 2" src="~assets/imgs/classManage/women.png" alt="women">
            <img v-if="edit.sex == 1" src="~assets/imgs/classManage/men.png" alt="men">
          </p>
          <p class="fs-16 f-c-text-color th-f-bottom-small">
            {{userinfo.schoolName}} 老师</p>
          <p class="fs-16 f-c-text-color th-f-bottom-small">
            <span>职称：{{edit.title || '--'}}</span>
            <span>学历：{{edit.highestDegree || '--'}}</span>
          </p>
          <!-- edit -->
          <div class="person-center-base-info-message-edit absolute clear" v-if="edit.base" @click="edit.baseMes=true">
            <img class="fl" src="~assets/imgs/center/edit-.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-link fl">编辑</span>
          </div>
        </div>
        <!-- edit base message -->
        <div class="TH-bg-c-level-2 person-center-base-info-message-edit-div clear" v-show="edit.baseMes">
          <!-- <div class="edit-img-re-upload fl">
            <div class="person-center-base-info-message-img"></div>
            <input type="button" value="上传照片" name="" >
          </div> -->
          <div class="fl">
            <div class="th-f-bottom-more">
              <div class="inline-block fs-16 left-width-paerson-base">
                <span class="TH-f-c-dark-m th-f-line-height">姓名：</span>
                <input type="text" v-model="userinfo.username" class="fs-16 input-user-name" maxlength="10" name="">
              </div>
              <div class="inline-block fs-16">
                <span class="TH-f-c-dark-m th-f-line-height">性别：</span>
                <el-radio class="radio" v-model="edit.sex" label="1">男</el-radio>
                <el-radio class="radio" v-model="edit.sex" label="2">女</el-radio>
              </div>
            </div>
            <div class="th-f-bottom-more fs-16">
              <div class="inline-block drop-down-person-base left-width-paerson-base">
                <span class="TH-f-c-dark-m th-f-line-height">职称：</span>
                <el-dropdown @command="handleDropTitle">
                  <span class="el-dropdown-link">
                    {{edit.title || '请选择'}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="三级教师">三级教师</el-dropdown-item>
                    <el-dropdown-item command="二级教师">二级教师</el-dropdown-item>
                    <el-dropdown-item command="一级教师">一级教师</el-dropdown-item>
                    <el-dropdown-item command="高级教师">高级教师</el-dropdown-item>
                    <el-dropdown-item command="特级教师">特级教师</el-dropdown-item>
                    <el-dropdown-item command="助教">助教</el-dropdown-item>
                    <el-dropdown-item command="讲师">讲师</el-dropdown-item>
                    <el-dropdown-item command="副教授">副教授</el-dropdown-item>
                    <el-dropdown-item command="教授">教授</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- <my-dropdown @choosed="handleDrop('title',$event)" :dropdownData="$store.dropdown.title">
                </my-dropdown> -->
              </div>
              <div class="inline-block drop-down-person-base">
                <span class="TH-f-c-dark-m th-f-line-height">学历：</span>
                <!-- <my-dropdown @choosed="handleDrop('high',$event)" :dropdownData="$store.dropdown.highestDegree">
                </my-dropdown> -->
                <el-dropdown @command="handleDropHighestDegree">
                  <span class="el-dropdown-link">
                    {{edit.highestDegree || '请选择'}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="大专以下">大专以下</el-dropdown-item>
                    <el-dropdown-item command="大专">大专</el-dropdown-item>
                    <el-dropdown-item command="本科">本科</el-dropdown-item>
                    <el-dropdown-item command="硕士">硕士</el-dropdown-item>
                    <el-dropdown-item command="博士">博士</el-dropdown-item>
                    <!-- <el-dropdown-item command="助教">助教</el-dropdown-item>
                    <el-dropdown-item command="讲师">讲师</el-dropdown-item>
                    <el-dropdown-item command="副教授">副教授</el-dropdown-item>
                    <el-dropdown-item command="教授">教授</el-dropdown-item> -->
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="submit-person-base-message fs-16">
              <p class="inline-block cp TH-bg-c-default" @click="onSurePersonMessage">确定</p>
              <p class="inline-block cp TH-f-c-link" @click="edit.baseMes = false">取消</p>
            </div>
          </div>
        </div>
        <!-- 职务信息 -->
        <div class="person-base-message-list-example relative person-center-pad-min">
          <div class="absolute title-nav">
            <p class="fs-16 messge-example-list-title TH-f-c-dark-m">职务信息</p>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add" v-if="!edit.work" @click="addSomeMessage(edit.workList,'work')">
            <img class="fl" src="~assets/imgs/center/plus-default.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-link fl">添加</span>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add not-allowed" v-if="edit.work">
            <img class="fl" src="~assets/imgs/center/cannot-plus--.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-dark-m">添加</span>
          </div>
          <p class="text-align fs-14" v-if="edit.workList==''">请添加职务信息</p>
          <div v-for="(item,index) in edit.workList" :class="{'th-f-bottom-more':index+1!=edit.workList.length}">
            <!-- 未编辑状态 -->
            <div v-if="!item.type" class="clear fs-16 relative" @mouseover="item.mouse = true" @mouseleave="item.mouse = false">
              <p class="fl work-list-message-edit-left-width"><span class="TH-f-c-dark-m">单位：</span>{{item.unit}}</p>
              <p class="fl"><span class="TH-f-c-dark-m">职务：</span>{{item.position}}</p>
              <div class="person-center-base-info-message-edit absolute clear" v-if="item.mouse" @click="editClickStart(edit.workList,item)">
                <img class="fl" src="~assets/imgs/center/edit-.png" alt="edit">
                <span class="inline-block fs-14 TH-f-c-link fl">编辑</span>
              </div>
            </div>
            <!-- 编辑状态 -->
            <div class="over-all-width-person-base-message-edit TH-bg-c-level-2" v-show="item.type">
              <div class="clear th-f-bottom-normal fs-16">
                <p class="fl edit-message-left-width-text-right TH-f-c-dark-m">单位：</p>
                <div class="fl edit-message-input-school-message">
                  <input type="text" v-model="item.unit" maxlength="20">
                </div>
                <div class="fl">
                  <span class="TH-f-c-dark-m">职务：</span>
                  <input type="text" class="fs-16 input-user-name" v-model="item.position" maxlength="20"/>
                </div>
              </div>
              <div class="submit-person-base-message fs-16 clear">
                <p class="fl edit-message-left-width-text-right"></p>
                <div class="fl edit-message-input-school-message">
                  <p class="inline-block cp TH-bg-c-default fl" @click="sureClick(item,'work')">确定</p>
                  <p class="inline-block cp TH-f-c-link fl"  @click="cancelAddMaker(edit.workList,index,item,'work')">取消</p>
                </div>
                <div class="fl">
                  <span class="Th-f-c-red-1 cp" @click="deleteThisItem(edit.workList,index,item,'work')">删除本条</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 项目经验 -->
        <div class="person-base-message-list-example relative person-center-pad-min">
          <div class="absolute title-nav">
            <p class="fs-16 messge-example-list-title TH-f-c-dark-m">项目经验</p>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add" v-if="!edit.project" @click="addSomeMessage(edit.workList,'pro')">
            <img class="fl" src="~assets/imgs/center/plus-default.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-link fl">添加</span>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add not-allowed" v-if="edit.project">
            <img class="fl" src="~assets/imgs/center/cannot-plus--.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-dark-m">添加</span>
          </div>
          <p class="text-align fs-14" v-if="edit.projectList==''">请添加项目经验</p>
          <div v-for="(item,index) in edit.projectList" :class="{'th-f-bottom-more':index+1!=edit.projectList.length}">
            <!-- 未编辑状态 -->
            <div v-if="!item.type" class="clear fs-16 relative" @mouseover="item.mouse = true" @mouseleave="item.mouse = false">
              <p class="fl work-list-message-edit-left-width"><span class="TH-f-c-dark-m">项目：</span>{{item.projectName}}</p>
              <p class="fl"><span class="TH-f-c-dark-m">级别：</span>{{item.projectGrade}}</p>
              <div class="person-center-base-info-message-edit absolute clear" v-if="item.mouse" @click="editClickStart(edit.projectList,item)">
                <img class="fl" src="~assets/imgs/center/edit-.png" alt="edit">
                <span class="inline-block fs-14 TH-f-c-link fl">编辑</span>
              </div>
            </div>
            <!-- 编辑状态 -->
            <div class="over-all-width-person-base-message-edit TH-bg-c-level-2" v-show="item.type">
              <div class="clear th-f-bottom-normal fs-16">
                <p class="fl edit-message-left-width-text-right TH-f-c-dark-m">项目：</p>
                <div class="fl edit-message-input-school-message">
                  <input type="text" v-model="item.projectName" maxlength="20">
                </div>
                <div class="fl">
                  <span class="TH-f-c-dark-m">级别：</span>
                  <!-- <input type="text" class="fs-16 input-user-name" v-model="item.projectGrade" /> -->
                   <my-dropdown @choosed="handleDrop('level',$event,item)" :dropdownData="$store.dropdown.level">
                  </my-dropdown>
                </div>
              </div>
              <div class="submit-person-base-message fs-16 clear">
                <p class="fl edit-message-left-width-text-right"></p>
                <div class="fl edit-message-input-school-message">
                  <p class="inline-block cp TH-bg-c-default fl" @click="sureClick(item,'pro')">确定</p>
                  <p class="inline-block cp TH-f-c-link fl"  @click="cancelAddMaker(edit.projectList,index,item,'pro')">取消</p>
                </div>
                <div class="fl">
                  <span class="Th-f-c-red-1 cp" @click="deleteThisItem(edit.projectList,index,item,'pro')">删除本条</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 书籍出版 -->
        <div class="person-base-message-list-example relative person-center-pad-min">
          <div class="absolute title-nav">
            <p class="fs-16 messge-example-list-title TH-f-c-dark-m">书籍出版</p>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add" v-if="!edit.book" @click="addSomeMessage(edit.bookList,'book')">
            <img class="fl" src="~assets/imgs/center/plus-default.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-link fl">添加</span>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add not-allowed" v-if="edit.book">
            <img class="fl" src="~assets/imgs/center/cannot-plus--.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-dark-m">添加</span>
          </div>
          <p class="text-align fs-14" v-if="edit.bookList==''">请添加书籍出版</p>
          <div v-for="(item,index) in edit.bookList" :class="{'th-f-bottom-more':index+1!=edit.bookList.length}">
            <!-- 未编辑状态 -->
            <div v-if="!item.type" class="clear fs-16 relative" @mouseover="item.mouse = true" @mouseleave="item.mouse = false">
              <p class="work-list-message-edit-left-width"><span class="TH-f-c-dark-m">书籍：</span>{{item.publicationTitle}}</p>
              <p class="fl work-list-message-edit-left-width fs-14 TH-f-c-dark-m">{{item.publisher}}</p>
              <p class="fl fs-14 TH-f-c-dark-m">{{item.publicationTime.substring(0,10)}}</p>
              <div class="person-center-base-info-message-edit absolute clear" v-if="item.mouse" @click="editClickStart(edit.projectList,item)">
                <img class="fl" src="~assets/imgs/center/edit-.png" alt="edit">
                <span class="inline-block fs-14 TH-f-c-link fl">编辑</span>
              </div>
            </div>
            <!-- 编辑状态 -->
            <div class="over-all-width-person-base-message-edit TH-bg-c-level-2" v-show="item.type">
              <div class="clear th-f-bottom-normal fs-16">
                <p class="fl edit-message-left-width-text-right TH-f-c-dark-m">书籍：</p>
                <div class="fl edit-message-input-school-message">
                  <input type="text" v-model="item.publicationTitle" maxlength="20">
                </div>
              </div>
              <div class="clear th-f-bottom-normal fs-16">
                <p class="fl edit-message-left-width-text-right TH-f-c-dark-m">出版社：</p>
                <div class="fl edit-message-input-school-message">
                  <input type="text" v-model="item.publisher" maxlength="20">
                </div>
                <div class="fl">
                  <span class="TH-f-c-dark-m">日期：</span>
                  <el-date-picker
                  v-model="item.publicationTime"
                  type="date"
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions0">
                </el-date-picker>
                </div>
              </div>
              <div class="submit-person-base-message fs-16 clear">
                <p class="fl edit-message-left-width-text-right"></p>
                <div class="fl edit-message-input-school-message">
                  <p class="inline-block cp TH-bg-c-default fl" @click="sureClick(item,'book')">确定</p>
                  <p class="inline-block cp TH-f-c-link fl"  @click="cancelAddMaker(edit.bookList,index,item,'book')">取消</p>
                </div>
                <div class="fl">
                  <span class="Th-f-c-red-1 cp" @click="deleteThisItem(edit.bookList,index,item,'book')">删除本条</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 荣誉奖励 -->
        <div class="person-base-message-list-example relative person-center-pad-min">
          <div class="absolute title-nav">
            <p class="fs-16 messge-example-list-title TH-f-c-dark-m">荣誉奖励</p>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add" v-if="!edit.best" @click="addSomeMessage(edit.bestList,'best')">
            <img class="fl" src="~assets/imgs/center/plus-default.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-link fl">添加</span>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add not-allowed" v-if="edit.best">
            <img class="fl" src="~assets/imgs/center/cannot-plus--.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-dark-m">添加</span>
          </div>
          <p class="text-align fs-14" v-if="edit.bestList==''">请添加荣誉奖励</p>
          <div v-for="(item,index) in edit.bestList" :class="{'th-f-bottom-more':index+1!=edit.bestList.length}">
            <!-- 未编辑状态 -->
            <div v-if="!item.type" class="clear fs-16 relative" @mouseover="item.mouse = true" @mouseleave="item.mouse = false">
              <p class="work-list-message-edit-left-width fl">{{item.honor}}</p>
              <p class="fl fs-14 TH-f-c-dark-m">{{item.startTime.substring(0,10) + ' 至 ' + item.endTime.substring(0,10)}}</p>
              <div class="person-center-base-info-message-edit absolute clear" v-if="item.mouse" @click="editClickStart(edit.projectList,item)">
                <img class="fl" src="~assets/imgs/center/edit-.png" alt="edit">
                <span class="inline-block fs-14 TH-f-c-link fl">编辑</span>
              </div>
            </div>
            <!-- 编辑状态 -->
            <div class="over-all-width-person-base-message-edit TH-bg-c-level-2" v-show="item.type">
              <div class="clear th-f-bottom-normal fs-16">
                <p class="fl edit-message-left-width-text-right TH-f-c-dark-m">荣誉：</p>
                <div class="fl edit-message-input-school-message">
                  <input type="text" v-model="item.honor" maxlength="20">
                </div>
              </div>
              <div class="clear th-f-bottom-normal fs-16">
                <p class="fl edit-message-left-width-text-right TH-f-c-dark-m">起止时间：</p>
                <el-date-picker
                  v-model="item.startTime"
                  type="date"
                  :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                  v-model="item.endTime"
                  type="date"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </div>
              <div class="submit-person-base-message fs-16 clear">
                <p class="fl edit-message-left-width-text-right"></p>
                <div class="fl edit-message-input-school-message">
                  <p class="inline-block cp TH-bg-c-default fl" @click="sureClick(item,'best')">确定</p>
                  <p class="inline-block cp TH-f-c-link fl"  @click="cancelAddMaker(edit.bestList,index,item,'best')">取消</p>
                </div>
                <div class="fl">
                  <span class="Th-f-c-red-1 cp" @click="deleteThisItem(edit.bestList,index,item,'best')">删除本条</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 其他成果 -->
        <div class="person-base-message-list-example relative person-center-pad-min">
          <div class="absolute title-nav">
            <p class="fs-16 messge-example-list-title TH-f-c-dark-m">其他成果</p>
          </div>
          <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add" @click="edit.other=true">
            <img class="fl" src="~assets/imgs/center/edit-.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-link fl">编辑</span>
          </div>
          <!-- <div class="person-center-base-info-message-edit absolute clear person-center-base-info-message-edit-add not-allowed" v-if="edit.other">
            <img class="fl" src="~assets/imgs/center/cannot-plus--.png" alt="edit">
            <span class="inline-block fs-14 TH-f-c-dark-m">添加</span>
          </div> -->
          <p class="fs-14" v-if="!edit.other">{{edit.otherList || '暂无其他成果!'}}</p>
          <el-input
            v-if="edit.other"
            type="textarea"
            autosize
            placeholder="这个人很懒，什么都没留下!"
            v-model="edit.otherList">
          </el-input>
          <div class="submit-person-base-message fs-16 clear submit-person-base-message-other" v-if="edit.other">
            <div class="fl edit-message-input-school-message">
              <p class="inline-block cp TH-bg-c-default fl" @click="sureClick(edit.otherList,'other')">确定</p>
              <p class="inline-block cp TH-f-c-link fl"  @click="edit.other = false">取消</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      custom-class="dialog-width-760"
      title="更换头像"
      top="15%"
      :visible.sync="dialogOption.head"
      >
      <div class="person-headimg-url-choose">
        <span class="fs-16 TH-f-c-default inline-block" :class="{'active':dialogOption.label==1}" @click="dialogOption.label=1">本地上传</span>
        <span class="fs-16 TH-f-c-default inline-block" :class="{'active':dialogOption.label==2}" @click="dialogOption.label=2">推荐头像</span>
      </div>
      <div v-if="dialogOption.label==1">
        <div class="clear person-center-base-info-headImgUrl">
          <div class="fl">
            <el-upload
              class="upload-demo"
              :action="img_address"
              :on-change="handleChange"
              :on-success ="handleAvatarSuccess"
              :show-file-list='false'
              :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip fs-14 TH-f-c-default">只支持png、jpg、gif格式，大小不超过5M</div>
            </el-upload>
          </div>
          <div class="fr">
            <!-- <p class="fs-14 TH-f-c-default">预览</p> -->
            <ul class="head-img-url-all-size">
              <li>
                <p class="fs-14 TH-f-c-default">预览</p>
              </li>
              <li>
                <div class="large">
                  <img :src="headImg" alt="">
                </div>
                <p class="fs-14 TH-f-c-default">100像素 x 100像素</p>
              </li>
              <li>
                <div class="normal">
                  <img :src="headImg" alt="">
                </div>
                <p class="fs-14 TH-f-c-default">60像素 x 60像素</p>
              </li>
              <li>
                <div class="small">
                  <img :src="headImg" alt="">
                </div>
                <p class="fs-14 TH-f-c-default">30像素 x 30像素</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="dialog-head-bottom ta-c">
          <span @click="chooseFromAlConfirm()" class="TH-button-confirm dhb-button inline-block">确定</span>
          <span @click="dialogOption.head = false" class="TH-button-cancel dhb-button inline-block">取消</span>
        </div>
      </div>
      <div v-if="dialogOption.label==2">
        <div class="dialog-head-cotainer">
          <div @click="chooseFromAl(item)" class="inline-block dhc-item-main relative" v-for="item in 18">
            <img class="dhc-item-icon absolute" src="~assets/imgs/center/chose.png" alt="chose" v-if="item == headImgActive">
            <img class="cp dhc-item" :src="'static/imgs/center/touxiang'+item+'.png'" alt="t2">
          </div>
        </div>
        <div class="dialog-head-bottom ta-c">
          <span @click="chooseFromAlConfirm()" class="TH-button-confirm dhb-button inline-block">确定</span>
          <span @click="dialogOption.head = false" class="TH-button-cancel dhb-button inline-block">取消</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myDropdown from '../../components/myDropdown'
import { ADDRESS,HEAD } from '../../helpers/address'
import { helper, deepClone, callLoading, callToast , callMimeTypeCheck } from '../../helpers/helper'
import { getTime } from '../../helpers/getThisWeek'


export default {
  name: 'PersonalCenterBase',
  components: {
    'my-dropdown': myDropdown
  },
  data () {
    return {
      img_address:ADDRESS.UP_LOAD_HEAD_IMG_URL,
      upload_type:false,
      headImg: '',
      imageUrl:'',
      dialogOption: {
        head: false,
        edit:false,
        edit_:false,
        label:1,
        edit_show:false,
        edit_type:false,
        img_type:false
      },
      headImgActive: -1,
      userDescription: '',
      userinfo:{
        sex:1,
        username:'杜子腾',
        userNam:'杜鹃',
        schoolName:'成都市 石室中学 初2018级10班 ',
        className:'',
        gradeNo:'9527',
        message:'这位童鞋很懒，还没有签名介绍呢！'
      },
      edit:{
        base:false,
        baseMes:false,
        work:false,
        workList:[],
        project:false,
        projectList:[],
        book:false,
        bookList:[],
        best:false,
        bestList:[],
        other:false,
        otherList:'',
        sex:1,
        title:'三级教师',
        highestDegree:'大专以下'
      }
    }
  },
  created () {
    if(this.$store.user.userId) {
      this.userinfo = deepClone(this.$store.user)
      this.headImg = this.$store.user.headimgurl
    }
    else {
      this.getUser()
    }
    this.getResume()
  },
  methods: {
     beforeAvatarUpload(file) {
      const type =  ['png','jpg','jpeg','gif']
      if (callMimeTypeCheck(file, type)) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return  isLt5M;
      }
      else {
        return false
      }
    },
    handleAvatarSuccess(res, file){
      this.$message({
        showClose: true,
        message: '恭喜你，上传成功',
        type: 'success'
      });
      this.userinfo.headimgurl =  HEAD + res.data
      this.$store.user.headimgurl =  HEAD + res.data
      this.headImg =  HEAD + res.data
    },
    chooseFromAl(item) {
      //console.log(item)
      this.headImgActive = item;
    },
    chooseFromAlConfirm() {
      if(this.dialogOption.label==2){
        // this.dialogOption.img_type = true;
        this.userinfo.headimgurl = 'static/imgs/center/touxiang'+this.headImgActive+'.png';
        this.$store.user.headimgurl = 'static/imgs/center/touxiang'+this.headImgActive+'.png'
        this.headImg = 'static/imgs/center/touxiang'+this.headImgActive+'.png'
      }
      this.updateUserInfo();
      this.dialogOption.head = false
    },
    updateUserInfo() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.USERINFO_UPDATE_ADDR, {
        description: this.userinfo.description,
        headimgurl:this.headImg
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.$store.user.headimgurl = this.headImg;
          // this.headImg  =
          callToast('修改成功')
          this.dialogOption.edit = false
        }
        else {
          callToast('修改失败', 'error')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        callToast('修改失败', 'error')
        console.log(err)
      })
    },
    getUser() {
      callLoading.activeLoading()
      this.getMe((user) => {
        callLoading.deactiveLoading()
        this.$store.user = user
        this.userinfo = user
        this.headImg = this.$store.user.headimgurl
        console.log(user)
      }, () => {
        callLoading.deactiveLoading()
        callToast('获取基本信息失败')
      })
    },
    getMe(cb,err) {
      this.$http.post(ADDRESS.USERINFO_ADDR)
      .then((res) => {
        if (res.body.code == 1) {
          cb(res.body.data)
        }
        else {
          err()
        }
      })
    },
    onSurePersonMessage(){
      console.log(this.edit.sex)
      if(this.edit.sex == 0){
        callToast('请选择性别', 'warning')
        return
      }
      callLoading.activeLoading()
        this.$http.post(ADDRESS.U_TEACHER_UPDATEUSERINFO, {
          username:this.userinfo.username,
          title: this.edit.title,
          highestDegree:this.edit.highestDegree,
          sex:this.edit.sex
        })
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            callToast('修改成功')
            this.edit.baseMes = false
            this.$store.user.username = this.userinfo.username
          }
          else {
            callToast('修改失败', 'error')
          }
        }, (err) => {
          callLoading.deactiveLoading()
          callToast('修改失败', 'error')
          console.log(err)
        })
    },
    handleDrop(keyword,cont){ // 下拉控制
    console.log(cont)
      if(keyword === 'level'){
        item.projectGrade = this.$store.dropdown.level[cont].text
      }
      else if(keyword == 'title'){
        this.edit.title = this.$store.dropdown.title[cont].text
      }
      else if(keyword == 'high'){
        this.edit.highestDegree = this.$store.dropdown.highestDegree[cont].text
      }
    },
    handleDropTitle( command ){
      this.edit.title = command
    },
    handleDropHighestDegree( command ){
      this.edit.highestDegree = command
    },
    // 简历
    getResume(){
      this.$http.post(ADDRESS.U_GET_TEACHER_RESUME)
      .then((res) => {
        if (res.body.code == 1) {
          // mouse:false
          // type:true
          let _cont = res.body.data
          let _this = this

          this.edit.sex = ((_cont.sex == '未知'||_cont.sex==null)?'0':_cont.sex)
          this.edit.title = (_cont.title == ''?'--':_cont.title)
          this.edit.highestDegree = (_cont.highestDegree==''?'--':_cont.highestDegree)

          // 职务
          this.edit.workList = []
          _cont.positionDtos.forEach(function(item){
            item.id = item.positionId
            item.mouse = false
            item.type = false
            _this.edit.workList.push(item)
          })
          // 项目
          this.edit.projectList = []
          _cont.projectExperienceDtos.forEach(function(item){
            item.id = item.projectExperienceId
            item.mouse = false
            item.type = false
            _this.edit.projectList.push(item)
          })
          // 书籍
          this.edit.bookList = []
          _cont.publicationDtos.forEach(function(item){
            item.id = item.publicationId
            item.mouse = false
            item.type = false
            _this.edit.bookList.push(item)
          })
          // 荣誉
          this.edit.bestList = []
          _cont.honorDtos.forEach(function(item){
            item.id = item.honorId
            item.mouse = false
            item.type = false
            _this.edit.bestList.push(item)
          })

          this.edit.otherList = _cont.description
        }
        else {
          err()
        }
      })
    },
    // 取消操作
    cancelAddMaker(T_arr,_index,item,keyword){
      if(item.id !=''){
        item.type = false
      }
      else{
        T_arr.splice(_index,1)
        if(keyword === 'work'){
          this.edit.work = false
        }
        else if(keyword === 'pro'){
          this.edit.project = false
        }
        else if(keyword === 'book'){
          this.edit.book= false
        }
        else{
          this.edit.best = false
        }
      }
    },
    editClickStart(_cont,item){
      _cont.forEach(item => item.type = false)
      item.type = true
    },
    // 删除本条
    deleteThisItem(T_arr,_index,item,keyword){
      if(item.id == ''){
        T_arr.splice(_index,1)
        if(keyword === 'work'){
          this.edit.work = false
        }
        else if(keyword === 'pro'){
          this.edit.project = false
        }
        else if(keyword === 'book'){
          this.edit.book= false
        }
        else{
          this.edit.best = false
        }
      }
      else{
        let _address = ''
        let _options = {}

        if(keyword === 'work'){
          _address = ADDRESS.U_TEACHER_DELETEPOSITION
          _options = {
            positionId : item.id
          }
        }
        else if(keyword === 'pro'){
          _address = ADDRESS.U_TEACHER_DELETEEXPERIENCE
          _options = {
            peId : item.id
          }
        }
        else if(keyword === 'book'){
          _address = ADDRESS.U_TEACHER_DELETEPUBLISH
          _options = {
            publicationId : item.id
          }
        }
        else{
          _address = ADDRESS.U_TEACHER_DELETEHONOR
          _options = {
            honorId : item.id
          }
        }

        this.$http.post(_address,_options)
        .then((res) => {
          if (res.body.code == 1) {
            T_arr.splice(_index,1)
            callToast('删除成功')
          }
          else {
            callToast('删除失败','error')
          }
        })
      }
    },
    //确定
    sureClick(item,keyword){
      Date.prototype.Format = function(fmt)  
      { //author: meizz  
       var o = {  
        "M+" : this.getMonth()+1,         //月份  
        "d+" : this.getDate(),          //日  
        "h+" : this.getHours(),          //小时  
        "m+" : this.getMinutes(),         //分  
        "s+" : this.getSeconds(),         //秒  
        "q+" : Math.floor((this.getMonth()+3)/3), //季度  
        "S" : this.getMilliseconds()       //毫秒  
       };  
       if(/(y+)/.test(fmt))  
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));  
       for(var k in o)  
        if(new RegExp("("+ k +")").test(fmt))  
       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
       return fmt;  
      } 

      if(keyword === 'work'){ // 增加和更新职务信息
        if(item.unit == ''){
          callToast('单位不能空', 'warning')
          return
        }
        if(item.position == ''){
          callToast('职务不能空', 'warning')
          return
        }

        let _address = (item.id==''?ADDRESS.U_TEACHER_ADDPOSITION:ADDRESS.U_TEACHER_UPDATEPOSITION)

        let _position = {
          unit:item.unit,
          position:item.position
        }

        let _up_position = {
          positionId:item.id,
          unit:item.unit,
          position:item.position
        }

        let _real_positon = (item.id==''?_position:_up_position)

        this.$http.post(_address,_real_positon)
        .then((res) => {
          if (res.body.code == 1) {
            callToast(item.id==''?'职务信息添加成功':'职务信息更新成功')
            this.edit.work = false
            item.type = false
            if(item.id==''){
              item.id = res.body.data
            }
          }
          else {
            callToast(item.id==''?'职务信息添加失败':'职务信息更新失败','error')
          }
        })
      }
      else if(keyword === 'pro'){ // 增加和更新项目信息
        if(item.projectName == ''){
          callToast('项目不能空', 'warning')
          return
        }
        if(item.projectGrade == ''){
          callToast('级别不能空', 'warning')
          return
        }

        let _address = (item.id==''?ADDRESS.U_TEACHER_ADDEXPERIENCE:ADDRESS.U_TEACHER_UPDATEEXPERIENCE)

        let _position = {
          projectName:item.projectName,
          projectGrade:item.projectGrade
        }

        let _up_position = {
          peId:item.id,
          projectName:item.projectName,
          projectGrade:item.projectGrade
        }

        let _real_positon = (item.id==''?_position:_up_position)

        this.$http.post(_address,_real_positon)
        .then((res) => {
          if (res.body.code == 1) {
            callToast(item.id==''?'项目经验添加成功':'项目经验更新成功')
            this.edit.project = false
            item.type = false
            if(item.id==''){
              item.id = res.body.data
            }
          }
          else {
            callToast(item.id==''?'项目经验添加失败':'项目经验更新失败','error')
          }
        })
      }
      else if(keyword === 'book'){ // 增加和更新出版书籍
        if(item.publicationTitle == ''){
          callToast('书籍不能空', 'warning')
          return
        }
        if(item.publisher == ''){
          callToast('出版社不能空', 'warning')
          return
        }
        if(item.publicationTime == ''){
          callToast('出版时间不能空', 'warning')
          return
        }
        item.publicationTime = new Date(item.publicationTime).Format("yyyy-MM-dd")

        let _address = (item.id==''?ADDRESS.U_TEACHER_ADDPUBLISH:ADDRESS.U_TEACHER_UPDATEPUBLISH)
        
        let _position = {
          publicationTitle:item.publicationTitle,
          publisher:item.publisher,
          publicationTime:item.publicationTime
        }

        let _up_position = {
          publicationId:item.id,
          publicationTitle:item.publicationTitle,
          publisher:item.publisher,
          publicationTime:item.publicationTime
        }

        let _real_positon = (item.id==''?_position:_up_position)

        this.$http.post(_address,_real_positon)
        .then((res) => {
          if (res.body.code == 1) {
            callToast(item.id==''?'书籍出版添加成功':'书籍出版更新成功')
            this.edit.book = false
            item.type = false
            if(item.id==''){
              item.id = res.body.data
            }
          }
          else {
            callToast(item.id==''?'书籍出版添加失败':'书籍出版更新失败','error')
          }
        })
      }
      else if(keyword == 'best'){ // 增加和更新荣誉奖励
        //this.edit.best = false
        if(item.honor == ''){
          callToast('获得荣誉不能空', 'warning')
          return
        }
        if(item.startTime == ''){
          callToast('开始时间不能空', 'warning')
          return
        }
        if(item.endTime == ''){
          callToast('截至时间不能空', 'warning')
          return
        }

        item.startTime = new Date(item.startTime).Format("yyyy-MM-dd")
        item.endTime = new Date(item.endTime).Format("yyyy-MM-dd")

        let _address = (item.id==''?ADDRESS.U_TEACHER_ADDHONOR:ADDRESS.U_TEACHER_UPDATEHONOR)
        
        let _position = {
          honor:item.honor,
          startTime:item.startTime,
          endTime:item.endTime
        }

        let _up_position = {
          honorId:item.honorId,
          honor:item.honor,
          startTime:item.startTime,
          endTime:item.endTime
        }
        console.log(_up_position)
        let _real_positon = (item.id==''?_position:_up_position)

        this.$http.post(_address,_real_positon)
        .then((res) => {
          if (res.body.code == 1) {
            callToast(item.id==''?'荣誉奖励添加成功':'荣誉奖励更新成功')
            this.edit.best = false
            item.type = false
            if(item.id==''){
              item.id = res.body.data
            }
          }
          else {
            callToast(item.id==''?'荣誉奖励添加失败':'荣誉奖励更新失败','error')
          }
        })
      }
      else if(keyword == 'other'){
        callLoading.activeLoading()
        this.$http.post(ADDRESS.USERINFO_UPDATE_ADDR, {
          description: this.edit.otherList
        })
        .then((res) => {
          callLoading.deactiveLoading()
          if (res.body.code == 1) {
            callToast('修改成功')
            this.edit.other = false
          }
          else {
            callToast('修改失败', 'error')
          }
        }, (err) => {
          callLoading.deactiveLoading()
          callToast('修改失败', 'error')
          console.log(err)
        })
      }
    },
    addSomeMessage(item,keyword){
      if(keyword === 'work'){
        this.edit.work = true
        this.edit.workList.push({
          id:'',
          unit:'',
          position:'',
          mouse:false,
          type:true
        })
      }
      else if(keyword === 'pro'){
        this.edit.project = true
        this.edit.projectList.push({
          id:'',
          projectName:'',
          projectGrade:'校级',
          mouse:false,
          type:true
        })
      }
      else if(keyword == 'book'){
        this.edit.book = true
        this.edit.bookList.push({
          id:'',
          publicationTitle:'',
          publisher:'',
          publicationTime:'',
          mouse:false,
          type:true
        })
      }
      else if(keyword == 'best'){
        this.edit.best = true
        this.edit.bestList.push({
          id:'',
          honor:'',
          startTime:'',
          endTime:'',
          mouse:false,
          type:true
        })
      }
    }
  }
}
</script>

<style scoped>
.not-allowed{
  cursor:not-allowed !important;
}

.text-align{
  text-align: center;
}

.th-f-bottom-small{
  margin-bottom: .1rem;
}

.th-f-bottom-normal{
  margin-bottom: .15rem;
}

.th-f-bottom-more{
  margin-bottom: .25rem;
}

.th-f-bottom-big{
  margin-bottom: .4rem;
}

.th-f-line-height{
  height: .4rem;
  line-height: .4rem;
}

.pc-card {
  width: 9.2rem;
  margin: .5rem auto;
  min-height: 4.1rem;
}

.pc-card-top {
  height: 1rem;
  line-height: 1rem;
}

.person-center-pad-min{
  width: 8.2rem;
  margin:0 auto;
}

.person-center-bg-base,
.person-center-bg-base img{
  width: 9.2rem;
  height: 1.7rem;
}

.pc-card-top-name {
  margin-right: .1rem;
}

.person-absolute-headUrlImg{
  width: 1rem;
  height: 1rem;
  left: 50%;
  top: -.5rem;
  border-radius: 50%;
  margin-left: -.5rem;
  cursor: pointer;
  overflow: hidden;
}

.person-absolute-headUrlImg img{
  width: 1rem;
  height: 1rem;
}

.person-absolute-headUrlImg p{
  position: absolute;
  width: 1rem;
  text-align: center;
  height: .3rem;
  line-height: .3rem;
  background-color: rgba(0,0,0,.5);
  top: .7rem;
  color: #fff;
}

.person-center-base-height{
  height: .6rem;
}

.person-center-base-info-message{
  height: 1.3rem;
}

.person-center-base-info-message-img{
  width: 1.05rem;
  height: 1.25rem;
  background-color: #ececec;
}

.person-center-base-info-message p{
  text-align: center;
}

.person-center-base-info-message p span{
  margin-right: .3rem;
}

.person-center-base-info-message p.f-c-text-color{
  color: #878787;
}

.pc-card-top-info {
  margin-left: .3rem;
}

.pc-ct-right-img {
  width: .85rem;
  height: .85rem;
  border-radius: 50%;
  vertical-align: middle;
}

.pc-ct-right-button {
  width: .8rem;
  height: .35rem;
  line-height: .35rem;
  text-align: center;
  margin-left: .2rem;
}

.pc-card-content-text {
  width: 7.6rem;
  height: 1.6rem;
  padding: .05rem;
  resize: none;
  margin: .25rem auto .5rem auto;
  border-radius: 4px;
}

.pc-card-button {
  width: 1.1rem;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
}

.dialog-head-cotainer {
  padding-top: .4rem;
  width: 6.8rem;
  margin: 0 auto;
  font-size: 0;
}

.dhc-item-main {
  width: .85rem;
  margin: 0 .3rem .3rem 0;
}

.dhc-item {
  width: .85rem;
}

.dhc-item-main:nth-child(6n) {
  margin-right: 0;
}

.dialog-head-bottom {
  border-top: 1px solid #ddd;
}

.dhb-button {
  margin: .25rem .4rem 0 0;
}

.dhc-item-active {
  background: #fff;
}

.dhc-item-icon {
  right: 0;
  top: 0;
}

.pc-card-content-label {
  right: .2rem;
  top: 1.75rem;
}

.person-center-base-label{
  width: .8rem;
}

.person-center-base-content,
.el-textarea{
  width: 7.8rem !important;
}

.person-center-base-submit{
  margin-top: .15rem;
  text-align: right;
}

.person-center-base-submit p{
  width: .8rem;
  height: .32rem;
  line-height: .32rem;
  margin-left: .2rem;
}

.fs-16{
  line-height: .28rem;
}

.person-headimg-url-choose{
  margin-bottom: .2rem;
  text-align: center;
}

.person-headimg-url-choose span{
  padding: 0 .15rem;
  line-height: .32rem;
  border:1px solid #535353;
  cursor: pointer;
}

.person-headimg-url-choose span:first-child{
  margin-right: .3rem;
}

.person-headimg-url-choose span.active{
  color: #3283d3;
  border:1px solid #3283d3;
}

.person-center-base-info-headImgUrl{
  margin-bottom: .2rem;
}

.person-center-base-info-headImgUrl .fl{
  /*padding-top: 1.5rem;*/
  width: 4.7rem;
  height: 4rem;
  background-color: #ececec;
  text-align: center;
}

.person-center-base-info-headImgUrl .fl .upload-demo{
  margin-top: 1.5rem;
}

.person-center-base-info-headImgUrl .fr{
  width: 2rem;
  height: 4rem;
  background-color: #ececec;
  text-align: center;
}

.head-img-url-all-size p{
  padding: .15rem 0;
}

.head-img-url-all-size li div.large,
.head-img-url-all-size li div.normal,
.head-img-url-all-size li div.small{
  margin:  0 auto;
}

.head-img-url-all-size li div.normal{
  margin-top: .15rem;
}

.head-img-url-all-size li div.small{
  margin-top: .2rem;
}

.head-img-url-all-size li div.large,
.head-img-url-all-size li div.large img{
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.head-img-url-all-size li div.normal,
.head-img-url-all-size li div.normal img{
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
}

.head-img-url-all-size li div.small,
.head-img-url-all-size li div.small img{
  width: .3rem;
  height: .3rem;
  border-radius: 50%;
}

/*.person-center-base-info-message-edit{
  width: 7rem;
}*/

img.mouse-edit-type{
  width: .18rem;
  height: .18rem;
  right: .1rem;
  top: .05rem;
  cursor: pointer;
}

.down-load-person-message{
  top: .2rem;
  cursor: pointer;
  margin-left: .5rem;
}

.down-load-person-message img{
  width: .15rem;
  height: .15rem;
  margin-right: .1rem;
}

.person-center-base-info-message-edit{
  top: .05rem;
  right: 0;
  cursor: pointer;
}

.person-center-base-info-message-edit img{
  width: .18rem;
  height: .18rem;
  margin-right: .05rem;
  margin-top: .04rem;
}

.person-center-base-info-message-edit span{
  height: .26rem;
  line-height: .26rem;
}

.person-center-base-info-message-edit-div{
  padding: .1rem .3rem;
}

.person-center-base-info-message-edit-add{
  top: -.14rem;
  background-color: #fff;
  padding-left: .15rem;
}

.edit-img-re-upload{
  width: 1.75rem;
}

.edit-img-re-upload input{
  margin-top: .1rem;
  margin-left: .1rem;
  color: #fff;
  border:none;
  outline: none;
  cursor: pointer;
  background-color: #38b42b;
  border-radius: 2px;
  height: .3rem;
  line-height: .3rem;
  padding: 0 .15rem;
}

.submit-person-base-message p{
  height: .36rem;
  line-height: .36rem;
  padding: 0 .2rem;
  border-radius: 4px;
}

.input-user-name{
  height: .38rem;
  line-height: .38rem;
  width: 1.9rem;
  padding-left: .1rem;
  border:1px solid #ddd;
  outline: none;
}

.left-width-paerson-base{
  width: 3.5rem;
}

.person-base-message-list-example{
  border-top: 1px solid #ddd;
  margin-top: .3rem;
  padding-top: .5rem;
  padding-bottom: .3rem;
}

.messge-example-list-title{
  height: .36rem;
  line-height: .36rem;
  padding: 0 .25rem;
  border-radius: .2rem;
  background-color: #ececec;
}

.person-base-message-list-example .title-nav{
  padding: 0 .2rem;
  left: 3.3rem;
  top: -.18rem;
  background-color: #fdfdfd;
}

.work-list-message-edit-left-width{
  width: 5.9rem;
}

.over-all-width-person-base-message-edit{
  width: 9.2rem;
  padding: .1rem 0;
  min-height: .9rem;
  margin-left: -.5rem;
}

.edit-message-left-width-text-right{
  width: .91rem;
  line-height: .4rem;
  padding: 0 0 !important;
  text-align: right;
}

.edit-message-input-school-message{
  width: 5.5rem;
}

.edit-message-input-school-message input{
  height: .38rem;
  line-height: .38rem;
  border:1px solid #ddd;
  outline: none;
  width: 4.7rem;
  padding-left: .1rem;
}

.submit-person-base-message-other{
  padding-top: .2rem;
  padding-left: .3rem;
}
</style>
