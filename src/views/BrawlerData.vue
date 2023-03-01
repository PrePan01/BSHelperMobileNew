<template>
  <TopNav :to="'/more'" :title="'英雄数据'"/>
  <div class="warp">
    <n-drawer
        :show="showChangeBrawler"
        :placement="'top'"
        :style="{backgroundColor: 'rgb(255,255,255)'}"
        @mask-click="showChangeBrawler = false"
    >
      <div class="brawler__select">
        <img
            class="brawler__select_icon"
            v-for="(item, index) in brawlersList"
            :key="item"
            :src="('https://prepan.top/bsAssets/brawlers/'+ item +'.png')"
            alt=""
            @click="selectBrawler(selectType, index)"
        >
      </div>
    </n-drawer>
    <div class="top">
      <div class="top__brawler_warp">
        <!--当前英雄-->
        <img
            :src="('https://prepan.top/bsAssets/brawlers/'+ curBrawler +'.png')"
            alt=""
            class="brawler__icon"
            @click="changeBrawler(0)"
        />
        <div
            v-for="(item, index) in compareBrawlers"
            :key="item"
            class="compareBrawlers__warp"
        >
          <!--对比英雄-->
          <img
              class="brawler__icon"
              :src="('https://prepan.top/bsAssets/brawlers/'+ item +'.png')"
              alt=""
          >
          <img @click="deleteCompare(item)" src="../assets/delete.png" alt="" class="compareBrawlers__delete">
        </div>
      </div>
      <div class="addCompare" @click="changeBrawler(1)">
        添加 <br>对比
      </div>
    </div>
    <!--等级选择-->
    <div class="lvSlider__warp">
      <n-slider v-model:value="lv" :step="1" :max="11" :min="1" @update:value="updateLv" class="lvSlider"/>
      等级：<span class="lv--num">{{lv}}</span>
    </div>
    <!--升级资源计算-->
    <UpdateCalc :lv="lv"/>
    <!--历史-->
    <n-modal v-model:show="showHistory">
      <BrawlerHistory :curHistory="curHistory"/>
    </n-modal>
    <!--表格-->
    <n-data-table
        :columns="columns(this)"
        :data="tableData"
        :bordered="false"
        :row-class-name="rowClassName"
    />
  </div>

  <n-button class="feedback_btn" size="small" @click="showFeedback = true">数据有误</n-button>
  <n-drawer
      :show="showFeedback"
      :placement="'bottom'"
      @mask-click="showFeedback = false"
      :style="{ height: '60%' }"
  >
    <iframe height = 100% width = 100% src="https://wj.qq.com/s2/11215405/c6a4/" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups"></iframe>
  </n-drawer>
</template>

<script setup>
import {computed, h, onMounted, reactive, ref} from "vue";
import { NDrawer, NDataTable, NSlider, NButton,NModal } from 'naive-ui'
import {getCurrentInstance} from "vue";
import axios from "axios";
import brawlerTranslate from "@/utils/BrawlerTranslate";
import tableTitle from "@/components/brawlerData/tableTitle";
import BrawlerHistory from '../components/brawlerData/BrawlerHistory'
import UpdateCalc from '../components/brawlerData/UpdateCalc'
import TopNav from '@/components/TopNav'

let brawlersList = getCurrentInstance()?.appContext.config.globalProperties.$brawlers
let showChangeBrawler = ref(false)

let curBrawler = ref('16000000')
let compareBrawlers = reactive([])
let lv = ref(11)
let tableData = reactive([])

let showFeedback = ref(false)

let showHistory = ref(false)
let curHistory = ref(16000000)

//0-切换 1-添加对比
let selectType = ref()
function changeBrawler(i) {
  if(i === 0 ) {
    showChangeBrawler.value = true
    selectType.value = i
  } else {
    if(compareBrawlers.length === 2) {
      window.$message.error('对比个数已达上限')
    } else {
      showChangeBrawler.value = true
      selectType.value = i
    }
  }
}

function deleteCompare(item) {
  compareBrawlers[0] === item?
      compareBrawlers.shift():
      compareBrawlers.pop()
  getData()
}

function selectBrawler(type, i) {
  if(type === 0) {
    compareBrawlers.includes(brawlersList[i])? window.$message.error('已经在对比啦'):curBrawler.value = brawlersList[i]
  } else {
    compareBrawlers.includes(brawlersList[i]) || curBrawler.value == brawlersList[i]?
        window.$message.error('已经在对比啦'):
        compareBrawlers.push(brawlersList[i])
  }
  getData()
  showChangeBrawler.value = false
}

function columns(instance) {
  let c = [{key: 'type', title: '', width: 80}]
  c.push({
    align: 'center',
    key: curBrawler.value,
    title () {
      return tableTitle(brawlerTranslate(curBrawler.value), () => {
        curHistory.value = curBrawler.value
        showHistory.value = true
      })
    },
    width: 100
  })
  compareBrawlers.forEach(i => {
    c.push({
      align: 'center',
      key: i,
      title () {
        return tableTitle(brawlerTranslate(i), () => {
          curHistory.value = i
          showHistory.value = true
        })
      },
      width: 100
    })
  })
  return c
}

let brawlerData = {}

function updateLv() {
  let tmp = JSON.parse(JSON.stringify(tableData))
  tmp.forEach((item, index) => {
    let t = item.type
    for(let i in item) {
      if(i !== 'type') {
        tmp[index][i] = brawlerData[i][lv.value-1][t]
      }
    }
  })
  tableData.length = 0
  tmp.forEach(i => {
    tableData.push(i)
  })
}


function getData() {
  let cur = [curBrawler.value, ...compareBrawlers]
  let tmp = []
  brawlerData = {}
  cur.forEach((item, i) => {
    axios({
      url: `https://prepan.top/bs_m/brawlerData/damage/${item}.json`,
      // url: `/demo/brawlerData/damage/${item}.json`,
      method: 'GET'
    }).then(res => {
      brawlerData[item] = res.data
      let k = Object.keys(res.data[lv.value - 1]).slice(1)
      if(tmp.length === 0) {
        k.forEach(i => {
          tmp.push({'type': i, [item]: res.data[lv.value - 1][i]})
        })
      } else {
        k.forEach(i => {
          let flag = true
          tmp.forEach((tmpi, index) => {
            if(tmpi.type === i) {
              tmp[index] = {[item]: res.data[lv.value - 1][i], ...tmpi}
              flag = false
            }
            if(tmp.length - 1 === index && tmpi.type !== i && flag) {
              tmp.push({'type': i, [item]: res.data[lv.value - 1][i]})
            }
          })
        })
      }
      tableData.length = 0
      tmp.forEach(i => {
        tableData.push(i)
      })
    })
  })
}

function rowClassName(row) {
  if (row.type === '生命值') {
    return "green";
  } else if (row.type === '普攻伤害' || row.type === '大招伤害') {
    return "red"
  }
  return "";
}

onMounted(() => {
  getData()
})

</script>

<style scoped>
:deep(.green td) {
  color: green !important;
  background-color: #F5F6F6;
}
:deep(.red td) {
  color: red !important;
  background-color: #F5F6F6;
}
.brawler__select {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
}
.brawler__select_icon {
  width: 18vw;
  margin: 5px 0;
}
.top {
  position: relative;
  margin: 0 auto;
  padding: 20px 0;
  overflow: hidden;
}
.top__brawler_warp {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 20px;
}
.compareBrawlers__warp {
  position: relative;
}
.compareBrawlers__delete {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
}
.brawler__icon {
  width: 20vw;
}
.addCompare {
  width: 50px;
  height: 50px;
  padding: 20px 20px 0 5px;
  font-size: 12px;
  background-color: #fff;
  color: black;
  border-radius: 50%;
  line-height: 16px;
  position: absolute;
  right: -42px;
  top: 20px;
}
.lvSlider__warp {
  text-align: center;
  margin-bottom: 20px;
}
.lv--num{
  font-family: 'djvb', serif;
  font-size: 20px;
}
.lvSlider {
  display: inline-block;
  width: 70vw;
  margin-right: 20px;
}
.feedback_btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 1;
}
</style>
