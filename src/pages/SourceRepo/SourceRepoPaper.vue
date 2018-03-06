
<template>
  <div class="container">
    <div class="paper-top">
      <div class="TH-card paper-top-search ">
        <div class="paper-top-search-item inline-block">
          <p class="fs-14 TH-f-c-fade">年级</p>
          <my-dropdown @choosed="handleDrop('grade',$event)" :dropdownData="dropdownData.grade">
          </my-dropdown>
        </div>
        <div class="paper-top-search-item inline-block">
          <p class="fs-14 TH-f-c-fade">类型</p>
          <my-dropdown @choosed="handleDrop('examType',$event)" :dropdownData="dropdownData.type">
          </my-dropdown>
        </div>
        <div class="paper-top-search-item paper-top-search-item-input inline-block relative">
          <p class="fs-14 TH-f-c-fade">关键字搜索</p>
          <input @keyup.enter="handleDrop('keyword')" type="text" placeholder="请输入关键字..." class="otl-none ptsi-input" v-model="searchOption.keyword">
          <img @click="handleDrop('keyword')" class="ptsi-icon absolute" src="~assets/imgs/common/search.png" alt="search">
        </div>
      </div>
      <div class="paper-list-container">
        <div class="paper-list-title fs-13 clear">
          <p class="fl paper-list-title-left TH-f-c-default">
            <span @click="handleDrop('orderType',0)" :class="{'TH-f-c-link':searchOption.orderType==0}" class="cp pltl-item">时间 <i>↓</i> </span>
            <span @click="handleDrop('orderType',1)" :class="{'TH-f-c-link':searchOption.orderType==1}" class="cp pltl-item">使用次数 <i>↓</i> </span>
          </p>
          <p class="fr paper-list-title-right TH-f-c-warn">{{workPages.total}}个</p>
        </div>
        <div class="paper-list-content">
          <div class="TF-temp-Arr-space" v-if="paperList==''">
            <img src="~assets/imgs/codeZero/coll/no-colleted-paper.png" alt="">
            <p class="fs-18 TH-f-c-default">没有你需要的试卷呢！</p>
          </div>
          <div v-if="paperList!=''"  v-for="item in paperList" class="cp paper-list-content-item TH-card inline-block relative"  @click="$router.push({path:'/classTask/detail/paper',query:{'id':item.paperId}})">
            <div class="TH-f-c-default cp paper-title">
              <span class="fs-16 fwb inline-block tof" :title="item.paperTitle">{{item.paperTitle}}</span>
              <p @click.stop="handleFav(item,!item.favorite)" class="fr plci-info-fav ta-c cp" :class="{'plci-info-fav-active': item.favorite}">
                <span class="plci-info-fav-icon inline-block"></span>
                <span class="plci-info-fav-text fs-14 TH-f-c-default"><i v-if="item.favorite">已收藏</i><i v-else="!item.favorite">收藏</i></span>
              </p>
            </div>
            <div class="plci-info clear tof">
              <p class="fl fs-13 TH-f-c-fade plci-info-desc">
                <span class="plci-info-item">{{item.author}} 著</span>
                <span class="plci-info-item">{{$store.dropdown.paperGrade[item.gradeNo].text}}</span>
                <span class="plci-info-item">{{$store.dropdown.paperType[item.examType].text}}</span>
                <span class="plci-info-item">{{item.usageCount}}次 使用</span>
              </p>
            </div>
            <p class="plci-info-date fs-14 TH-f-c-fade">{{item.updateTime.substring(0,10)}} 更新</p>
          </div>
        </div>
        <div class="paper-list--pages" v-if="workPages.total > 9">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="workHandleCurrentChange"
            :current-page.sync="workPages.current"
            :page-size="searchOption.rows"
            :page-sizes="[9, 18, 30]"
            layout="sizes, prev, pager, next"
            :total="workPages.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ADDRESS } from '../../helpers/address'
import { callLoading, callToast } from '../../helpers/helper'
import myDropdown from '../../components/myDropdown'

export default {
  name: 'SourceRepoPaper',
  components: {
    'my-dropdown': myDropdown
  },
  data () {
    return {
      workPages: {
        total: 2,
        size: 16,
        current: 1,
      },
      searchOption: {
        searchType: 1,
        gradeNo: '',
        examType: '',
        keyword: '',
        page: 1,
        rows: 9,
        orderType: 0
      },
      paperList: [],
      dropdownData: {
        grade: this.$store.dropdown.paperGrade,
        type: this.$store.dropdown.paperType
      }
    }
  },
  created () {
    this.searchByOption()
  },
  methods: {
    workHandleCurrentChange(p) {
      console.log('page is',p)
      this.searchOption.page = p
      this.searchByOption()
    },
    handleSizeChange(val) {
      this.searchOption.page = 1
      this.searchOption.rows = val
      this.workPages.current = 1
      this.searchByOption()
    },
    searchByOption() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.SOURCEREPO_PAPER_ADDR, this.searchOption)
        .then((res) => {
          if (res.body.code == 1) {
            this.paperList = res.body.data.list
            this.workPages.total = +res.body.data.total
            callLoading.deactiveLoading()
          }
          else {
            this.paperList = []
            this.workPages.total = 0
            callLoading.deactiveLoading()
          }
        }, (err) => {
          this.paperList = []
          callLoading.deactiveLoading()
          console.log(err)
        })
    },
    handleDrop(type, item) {
      this.searchOption.page = 1
      this.workPages.current = 1
      this.workPages.total = 0
      if (type == 'grade') {
        this.searchOption.gradeNo = item?item:''
      }
      else if (type == 'examType') {
        this.searchOption.examType = item?item:''
      }
      else if (type == 'keyword') {
        // this.searchOption.keyword = item
      }
      else if (type == 'orderType') {
        this.searchOption.orderType = item
      }
      this.searchByOption()
    },
    handleFav(item,type) {
      callLoading.activeLoading()
      const _addr = type?ADDRESS.SOURCEREPO_PAPER_FAVORITE_ADDR:ADDRESS.SOURCEREPO_PAPER_UNFAVORITE_ADDR
      this.$http.post(_addr, {
        paperId: item.paperId
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if (res.body.code == 1) {
          item.favorite = !item.favorite
          callToast('操作成功')
        }
        else {
          callToast('操作失败', 'error')
        }
      }, (err)=> {
        callToast('操作失败', 'error')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.paper-top-search {
  margin: .4rem 0;
  width: 8.6rem;
  height: .6rem;
  padding: .1rem;
}
.paper-top-search-item {
  margin-right: .8rem;
  width: 2rem;
}

.paper-top-search-item-input {
  width: 2.5rem;
  margin-right: 0;
}

.ptsi-input {
  border-bottom: 1px solid #ddd;
  width: 100%;
  line-height: .4rem;

}

.ptsi-icon {
  right: 0;
  top: .3rem;
}

.paper-list-container {
  width: 17rem;
  margin: 0 auto;
}

.paper-list-title-left span {
  margin-right: .2rem;
}

.paper-list-content {
  margin-top: .25rem;
}

.paper-list-content-item {
  width: 5.1rem;
  /* height: .7rem; */
  padding: .2rem;
  margin: 0 .25rem .25rem 0;
}

.paper-list-content-item:nth-child(3n) {
  margin-right: 0;
}

.plci-info {
  width: 5.1rem;
}

.plci-info-item {
  margin-right: .3rem;
}

.plci-info-fav {
  width: .9rem;
  height: .3rem;
  border: 2px solid #ddd;
  border-radius: 40px;
  line-height: .3rem;
}

.plci-info-fav-icon {
  background: url('../../assets/imgs/source/collect.png') no-repeat no-repeat;
  width: .18rem;
  height: .18rem;
  background-size: cover;
  top: .03rem;
  position: relative;
}

.plci-info-fav:hover .plci-info-fav-icon,
.plci-info-fav-active .plci-info-fav-icon{
  background: url('../../assets/imgs/source/collect-active.png') no-repeat no-repeat;
  background-size: cover;
}

.plci-info-desc {
  width: 100%;
}

.pltl-item {
  margin-right: .2rem;
}

.TF-temp-Arr-space img{
  margin-top:.8rem;
  margin-bottom: .35rem;
  width: 1.44rem;
  height: 1.75rem;
}

/* 新增需求 */

p .fs-16.tof{
  width: 3.5rem;
}

.plci-info-date {
  /* margin: .1rem 0; */
  margin-top: .1rem;
}

.paper-title{
  line-height: 1.2;
}
</style>
