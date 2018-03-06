
<template>
  <div class="container">
    <div class="paper-top">
      <h1 class="TH-f-c-default fs-24">{{paperContentInfo.paperTitle}}</h1>
      <div class="paper-top-info clear">
        <div class="paper-top-info-left fl">
          <p class="inline-block ptil-item fs-14"><span class="TH-f-c-fade fs-14">作者：</span><span class="TH-f-c-default">{{paperContentInfo.author}}</span> </p>
          <p class="inline-block ptil-item">
            <span class="TH-f-c-fade fs-14">创建时间：</span>
            <span class="TH-f-c-default fs-14">{{paperContentInfo.createTime}}</span>
            <span class="TH-f-c-fade fs-14">&nbsp;&nbsp;更新时间：</span>
            <span class="TH-f-c-default fs-14">{{paperContentInfo.updateTime}}</span>
            <span class="TH-f-c-fade fs-14">&nbsp;&nbsp;年级：</span>
            <span class="TH-f-c-default fs-14">{{$store.dropdown.paperGrade[paperContentInfo.gradeNo].text}}</span>
            <span class="TH-f-c-fade fs-14">&nbsp;&nbsp;试卷类型：</span>
            <span class="TH-f-c-default fs-14">{{$store.dropdown.paperType[paperContentInfo.examType].text}}</span>
          </p>
        </div>
        <div class="paper-top-info-right fr">
          <p v-if="!paperContentInfo.mine && !$route.query.noFav" @click="handleFav()" :class="{'paper-info-right-item-active': paperContentInfo.favorite}" class="relative inline-block paper-info-right-item cp">
            <span v-if="!paperContentInfo.favorite">收藏</span>
            <span v-if="paperContentInfo.favorite">已收藏</span>
          </p>
          <p v-if="paperContentInfo.mine && !$route.query.noFav" @click="deletePaper()" :class="{'paper-info-right-item-active': paperContentInfo.favorite}" class="relative inline-block paper-info-right-item-delete cp">
            <span>删除</span>
          </p>
          <!-- <div v-if="$route.path.split('/')[1] == 'personalSourceDetail'" class="ptir-upload">
            <span v-if="paperContentInfo.inShop" class="fs-14 TH-f-c-link">已上传至资源超市</span>
            <span @click="goShopDetail()" v-if="paperContentInfo.inShop" class="TH-button-default ptir-upload-button inline-block ta-c cp">立即查看</span>
            <span v-if="!paperContentInfo.inShop" class="fs-14 TH-f-c-fade">未上传至资源超市</span>
            <span @click="goUpload()" v-if="!paperContentInfo.inShop" class="TH-button-default ptir-upload-button inline-block ta-c cp">立即上传</span>
          </div> -->
        </div>
      </div>
      <div class="paper-content TH-card">
        <div class="paper-content-detail">
          <div class="paper-content-detail-choice">
            <p v-if="paperContentQuestion[0].length > 0" class="pcdc-title fs-16 TH-f-c-link">一、选择题</p>
            <div v-for="(item, $index) in paperContentQuestion[0]" class="pcdc-item">
              <div class="pcdc-item-title TH-f-c-default fs-16">
                {{$index + 1}}、
                <div class="inline-block" v-html="item.questionText"></div>
              </div>
              <ul class="TH-f-c-default pcdc-item-answerlist fs-16">
                <li class="pcdc-item-answeritem" v-for="ans in handleOption(item.options)"><p>{{ans[0]+'. '+ans[1]}}</p></li>
              </ul>
              <div class="pcdc-item-desc">
                <p class="TH-f-c-link fwb fs-14">解析: <span class="fwn">正确答案： <i class="TH-f-c-warn">{{item.answer}}</i></span></p>
                <div class="TH-f-c-default fs-16" v-html="item.analysis"></div>
                <p class="TH-f-c-link fs-14 fwb pcdc-item-desc-know">知识点： <span class="TH-f-c-default fwn" v-for="k in item.knowledgeTreeEntities">{{k.knowledgeName}}</span></p>
              </div>
            </div>
            <p v-if="paperContentQuestion[1].length > 0" class="pcdc-title fs-16 TH-f-c-link">{{paperContentQuestion[0].length == 0?'一':'二'}}、判断题</p>
            <div v-for="(item, $index) in paperContentQuestion[1]" class="pcdc-item">
              <div class="pcdc-item-title TH-f-c-default fs-16">
                {{$index + paperContentQuestion[0].length + 1}}、
                <div class="inline-block" v-html="item.questionText"></div>
              </div>
              <ul class="TH-f-c-default pcdc-item-answerlist fs-16">
                <li class="pcdc-item-answeritem"><p>A. 正确</p></li>
                <li class="pcdc-item-answeritem"><p>B. 错误</p></li>
              </ul>
              <div class="pcdc-item-desc">
                <p class="TH-f-c-link fwb fs-14">解析: <span class="fwn">正确答案： <i class="TH-f-c-warn">{{item.answer}}</i></span></p>
                <div class="TH-f-c-default fs-16" v-html="item.analysis"></div>
                <p class="TH-f-c-link fs-14 fwb pcdc-item-desc-know">知识点： <span class="TH-f-c-default fwn" v-for="k in item.knowledgeTreeEntities">{{k.knowledgeName}}</span></p>
              </div>
            </div>
            <!--操作题-->
            <p v-if="paperContentQuestion[2].length > 0" class="pcdc-title fs-16 TH-f-c-link">{{(paperContentQuestion[0].length ==0 && paperContentQuestion[1].length==0)?'一':((paperContentQuestion[1].length==0 ||paperContentQuestion[0].length==0)?'二':'三')}}、word操作题</p>
            <div v-for="(ii,idx) in paperContentQuestion[2]" class="pcdc-item">
              <div class="pcdc-item-title TH-f-c-default fs-16">
                <p class="inline-block pcdc-item-title-index">{{idx + paperContentQuestion[0].length +paperContentQuestion[1].length + 1}}、</p>
                <div class="inline-block pcdc-item-title-more" v-html="ii.questionText"></div>
              </div>
              <div class="pcdc-item-desc">
                <p class="TH-f-c-link fwb fs-14">解析: </p>
                <div class="TH-f-c-default fs-16" v-html="ii.analysis"></div>
                <p class="TH-f-c-link fs-14 fwb pcdc-item-desc-know">知识点： <span class="TH-f-c-default fwn" v-for="k in ii.knowledgeTreeEntities">{{k.knowledgeName}}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ADDRESS, VERSION } from '../../helpers/address'
import { callModalToast, callLoading, callToast } from '../../helpers/helper'
export default {
  name: 'ClassTaskDetailPaper',
  data () {
    return {
      paperId: '',
      paperContentInfo: {},
      paperContentQuestion: [],
      paperInfo: {
        title: '信息获取的方法相关试题',
        author: '老王',
        startTime: '2017-08-08 22:22',
        endTime: '2017-08-09 22:22',
        isFav: true,
      },
      paperDetail: {
        TYPE_CHOICE: [
          {
            orderId: 0,
            type: 0,
            title: '下列叙述正确的是（        ）',
            answers: [
              {typeId: 0,
              answer: '信息技术就等同于计算机技术和网络技术。'},
              {typeId: 1,
              answer: '信息技术是有关信息的获取、传递、存储、处理、交流和表达的技术。'},
              {typeId: 2,
              answer: '微电子技术与信息技术是互不关联的两个技术领域。 '},
              {typeId: 3,
              answer: '信息技术是处理信息的技术。'},
            ],
            desc: {
              rightAns:'B',
              content: '信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术'
            },
            knowledge: [
                '信息技术',
                '计算机科学',
                '互联网'
            ]
          },
          {
            orderId: 1,
            type: 0,
            title: '下列叙述正确的是（        ）',
            answers: [
              {typeId: 0,
              answer: '信息技术就等同于计算机技术和网络技术。'},
              {typeId: 1,
              answer: '信息技术是有关信息的获取、传递、存储、处理、交流和表达的技术。'},
              {typeId: 2,
              answer: '微电子技术与信息技术是互不关联的两个技术领域。 '},
              {typeId: 3,
              answer: '信息技术是处理信息的技术。'},
            ],
            desc: {
              rightAns:'B',
              content: '信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术'
            },
            knowledge: [
                '信息技术',
                '计算机科学',
                '互联网'
            ]
          },
          {
            orderId: 2,
            type: 0,
            title: '下列叙述正确的是（        ）',
            answers: [
              {typeId: 0,
              answer: '信息技术就等同于计算机技术和网络技术。'},
              {typeId: 1,
              answer: '信息技术是有关信息的获取、传递、存储、处理、交流和表达的技术。'},
              {typeId: 2,
              answer: '微电子技术与信息技术是互不关联的两个技术领域。 '},
              {typeId: 3,
              answer: '信息技术是处理信息的技术。'},
            ],
            desc: {
              rightAns:'B',
              content: '信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术'
            },
            knowledge: [
                '信息技术',
                '计算机科学',
                '互联网'
            ]
          },
          {
            orderId: 3,
            type: 0,
            title: '下列叙述正确的是（        ）',
            answers: [
              {typeId: 0,
              answer: '信息技术就等同于计算机技术和网络技术。'},
              {typeId: 1,
              answer: '信息技术是有关信息的获取、传递、存储、处理、交流和表达的技术。'},
              {typeId: 2,
              answer: '微电子技术与信息技术是互不关联的两个技术领域。 '},
              {typeId: 3,
              answer: '信息技术是处理信息的技术。'},
            ],
            desc: {
              rightAns:'B',
              content: '信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术'
            },
            knowledge: [
                '信息技术',
                '计算机科学',
                '互联网'
            ]
          },
          {
            orderId: 4,
            type: 0,
            title: '下列叙述正确的是（        ）',
            answers: [
              {typeId: 0,
              answer: '信息技术就等同于计算机技术和网络技术。'},
              {typeId: 1,
              answer: '信息技术是有关信息的获取、传递、存储、处理、交流和表达的技术。'},
              {typeId: 2,
              answer: '微电子技术与信息技术是互不关联的两个技术领域。 '},
              {typeId: 3,
              answer: '信息技术是处理信息的技术。'},
            ],
            desc: {
              rightAns:'B',
              content: '信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术信息技术就等同于计算机技术和网络技术'
            },
            knowledge: [
                '信息技术',
                '计算机科学',
                '互联网'
            ]
          },
        ]
      }
    }
  },
  created () {
    this.paperId = this.$route.query.id || 0
    this.getPaper()
    this.getPaperQuestion()
  },
  methods: {
    handleFav() {
      callLoading.activeLoading()
      const _addr = !this.paperContentInfo.favorite?ADDRESS.SOURCEREPO_PAPER_FAVORITE_ADDR:ADDRESS.SOURCEREPO_PAPER_UNFAVORITE_ADDR
      this.$http.post(_addr, {
        paperId: this.paperId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.paperContentInfo.favorite = !this.paperContentInfo.favorite
          callToast('操作成功')
        }
        else {
          callToast('操作失败', 'error')
        }
      }, (err)=> {
        callToast('操作失败', 'error')
        console.log(err)
      })
    },
    getPaper() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.DETAIL_PAPER, {
        paperId: this.paperId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.paperContentInfo = res.body.data
        }
        else if (res.body.code == 30001) {
          callToast('试卷已被删除', 'warning')
        }
      }, (err) => {
        callLoading.deactiveLoading()
        // callToast('操作失败','error')
      })
    },
    getPaperQuestion() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.DETAIL_PAPER_CONTENT, {
        paperId: this.paperId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          this.paperContentQuestion = res.body.data
        }
      }, (err) => {
        callLoading.deactiveLoading()
        console.log(err)
      })
    },
    handleOption(input) {
      const output = _.pairs(JSON.parse(input))
      console.log(output)
      return output
    },
    goShopDetail() {
      window.open(`/bc/static/mall/${VERSION}/index.html#/pay/paper?id=${this.paperContentInfo.productId}&isUpload=isMe`)
    },
    goUpload() {
      this.$router.push({path:'/personalSource/uploadMall', query: {
          id: this.paperContentInfo.paperId,
          type: 'paper',
          name: this.paperContentInfo.paperTitle
        }
      })
    },
    deletePaper() {
      this.$confirm('此操作将删除该试卷, 是否继续?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        customClass: 'bc-confirm'
      })
      .then(() => {
        callLoading.activeLoading()
        this.$http.post(ADDRESS.MY_SOURCE_REMOVE_PAPER, {
          paperId: this.paperId
        })
        .then((res) => {
          if (res.body.code == 1) {
            callToast('删除成功')
          }
          else {
            callToast(res.body.data, 'error')
          }
          callLoading.deactiveLoading()
        })
        .catch((err) => {
            callLoading.deactiveLoading()
            callToast('删除失败', 'error')
        })
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 17rem;
  margin: 0 auto;
}

.paper-top {
  margin-top: .15rem;
}
.paper-top-info-left {
  margin-top: .15rem;
}
.ptil-item {
  margin-right: .28rem;
}

.paper-info-right-item {
  width: .98rem;
  height: .28rem;
  border: 2px solid #dbdbdb;
  border-radius: 50px;
  text-align: center;
  line-height: .28rem;
  padding-left: .1rem;
  position: relative;
}

.paper-info-right-item::before {
  content: '';
  width: .18rem;
  height: .18rem;
  left: .15rem;
  position: absolute;
  background: url('../../assets/imgs/common/collect.png') no-repeat no-repeat;
  background-size: cover;
  top: .05rem;
}

.paper-info-right-item-active::before,
.paper-info-right-item:hover::before {
  content: '';
  width: .18rem;
  height: .18rem;
  left: .15rem;
  position: absolute;
  top: .05rem;
  background: url('../../assets/imgs/common/collected.png') no-repeat no-repeat;
  background-size: cover;
}

.paper-info-right-item-delete {
  width: .98rem;
  height: .3rem;
  border: 2px solid #dbdbdb;
  border-radius: 50px;
  text-align: center;
  line-height: .28rem;
  padding-left: .1rem;
  position: relative;
}

.paper-info-right-item-delete::before {
  content: '';
  width: .18rem;
  height: .2rem;
  left: .15rem;
  position: absolute;
  background: url('../../assets/imgs/source/delete-2.png') no-repeat no-repeat;
  background-size: cover;
  top: .05rem;
}

.paper-info-right-item-delete:hover::before {
  content: '';
  width: .18rem;
  height: .2rem;
  left: .15rem;
  position: absolute;
  top: .05rem;
  background: url('../../assets/imgs/source/delete-2-hover.png') no-repeat no-repeat;
  background-size: cover;
}

.paper-content {
  margin-top: .15rem;
  width: 100%;
  min-height: 3rem;
  padding: .25rem 0;
}
.paper-content-detail {
  width: 15rem;
  margin: 0 auto;
  min-height: 3rem;
}

.pcdc-item {
  border-bottom: 1px solid #ddd;
  margin-top: .2rem;
}

.pcdc-item:last-child {
  border-bottom: none;
}

.pcdc-item-title {
  margin-bottom: .2rem;
}
.pcdc-item-title-index{
  vertical-align: top;
  line-height: .28rem;
}
.pcdc-item-title-more{
  line-height: .28rem;
}
.pcdc-item-answeritem {
  margin-bottom: .15rem;
}

.pcdc-item-desc {
  margin-bottom: .15rem;
}

.pcdc-item-desc p {
  margin-bottom: .15rem;
}

.pcdc-title {
  margin-top: .2rem;
}

.pcdc-item-desc-know {
  margin-top: .2rem;
}

.ptir-upload-button {
  width: .9rem;
  height: .33rem;
  border-radius: 40px;
  line-height: .33rem;
}

</style>
