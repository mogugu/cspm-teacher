
<template>
  <div class="container">
    <div class="TH-card student-rate-content">
      <div class="src-option relative">
        <span @click="handleChoice(item)" v-for="item in searchOption" :class="{'src-option-item-active':item.value == searchActive}" class="inline-block src-option-item fs-14 TH-f-c-default ta-c cp">{{item.name}}</span>
      </div>
      <div class="src-main">
        <chart :options="rateOption"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import { ADDRESS } from '../../helpers/address'
import { callLoading, callToast, deepClone } from '../../helpers/helper'
export default {
  name: 'ClassManageStudentRateFinal',
  data () {
    return {
      rateOption: {
          title: {
              text: '堆叠区域图'
          },
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {show: false},
    			color: ['#ff9e20'],
    			toolbox: {show: true},
          grid: {
              left: '5%',
              right: '5%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type: 'category',
                  data: [],
				          axisLine: {onZero: false}
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  inverse: true,
                  max: 100,
                  min: 0,
                  interval: 5,
                  splitLine: {show: false},
                  axisLabel: {
          					formatter: function(value, index) {
          						switch(value) {
          							case 5:
          								value = '优'
          								break;
          							case 30:
          								value = '良'
          								break;
          							case 70:
          								value = '中'
          								break;
          							case 95:
          								value = '差'
          								break;
          							default:
          								value = ''
          								break;
          						}
          						return value
          					}
          				}
              }
          ],
          visualMap: [{
    	            top: 10,
    	            right: 10,
    	            text:['差','优'],
    	            pieces: [{
    	                gt: 0,
    	                lte: 10,
    	                color: '#ff4d4d'
    	            }, {
    	                gt: 10,
    	                lte: 50,
    	                color: '#ff9e20'
    	            }, {
    	                gt: 50,
    	                lte: 90,
    	                color: '#6ab8ec'
    	            }, {
    	                gt: 90,
    	                lte: 100,
    	                color: '#3ecf74'
    	            }]
    	    }],
          series : [
              {
                  name:'排名',
                  type:'line',
                  areaStyle: {
                    normal: {
                        color: '#fefefe'
                    }
                  },
                  smooth: true,
          				showSymbol: true,
          				symbolSize: 10,
                  markLine: {
          					data: [{
          						yAxis: 10
          					}, {
          						yAxis: 50
          					}, {
          						yAxis: 90
          					}]
          				},
                  data:[]
              },
          ]
      },
      searchActive: 7,
      searchOption: [
        {
          name: '最近一周',
          value: 7,
        },
        {
          name: '最近两周',
          value: 14,
        },
        {
          name: '最近一月',
          value: 30,
        },
        {
          name: '最近一年',
          value: 365,
        },
      ]
    }
  },
  created () {
    this.studentId = this.$route.query.id
    this.getRate()
  },
  methods: {
    handleChoice(item) {
      this.searchActive = item.value
    },
    getRate() {
      callLoading.activeLoading()
      this.$http.post(ADDRESS.RATE_FINAL_ADDR, {
        recentDays: this.searchActive,
        studentId: this.studentId,
      })
      .then((res) => {
        callLoading.deactiveLoading()
        if(res.body.code == 1) {
          const _data = res.body.data
          let _labels = []
          let _values = []
          for (var i = 0; i < _data.length; i++) {
            _labels.push(i+1)
            _values.push(_data[i].rankScale)
          }
          this.rateOption.series[0].data = _values
          this.rateOption.xAxis[0].data = _labels
        }
      })
    }
  }
}
</script>

<style scoped>
.student-rate-content {
  width: 9.5rem;
  min-height: 6rem;
  margin: 1rem auto;
}

.src-option-item {
  width: .78rem;
  height: .32rem;
  line-height: .32rem;
  background: #e1e6e9;
  margin-right: .05rem;
  padding: 0 .1rem;
}

.src-option {
  padding: .3rem;
}

.src-option-item:first-child {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.src-option-item:last-child {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.src-option-item-active {
  background: #3283d3;
  color: #fff;
}

.src-main {
  width: 7.8rem;
  height: 4.2rem;
  margin: 0 auto;
}

.echarts {
  width: 100%;
  height: 100%;
}

</style>
