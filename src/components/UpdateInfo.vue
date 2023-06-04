<template>
  <van-dialog
      :show="showUpdateInfo"
      confirm-button-color="#2A59DB"
      confirm-button-text="知道啦"
      @confirm="closeUpdate"
  >
    <div class="infoWarp">
      <h3 class="info"></h3>
      <div style="text-align: center;color: #18A058">
        <img src="../assets/pic1.png" alt="" style="width: 100%;border-radius: 16px">
        <div style="color: rgb(230,87,22)">
          <h3>🎉新功能出现！</h3>
          <h3>「我的英雄」优化、皮肤图鉴新增分类、「游戏下载」回归</h3>
          <h4>更多更新请查看更新日志！</h4>
          <!--<h3>地图图鉴、英雄标注···</h3>-->
        </div>
      </div>

    </div>
  </van-dialog>
</template>

<script setup>
import axios from 'axios'
import {onMounted, ref} from "vue";
import {Dialog} from "vant";
import {NRadioGroup, NRadioButton, NInput, NButton} from "naive-ui"
const VanDialog = Dialog.Component;

let updateDate = 'update0428'

let showUpdateInfo = ref(false)

let subFeedbackBtn = ref(true)
let confirmButtonDisabled = ref(true)
let feedbackScore = ref(null)
let feedbackText = ref(null)
let showFeedback = ref(true)
let feedbackScores = [
  {
    value: "good",
    label: "好使"
  },
  {
    value: 'normal',
    label: '一般'
  },
  {
    value: 'bad',
    label: '不太行'
  }
]

function updateFeedbackScore() {
  subFeedbackBtn.value = false
}

function subFeedback() {
  axios({
    url: `/ucloud/api/feedback?type=${feedbackScore.value}&detail=${feedbackText.value}`,
    method: 'GET'
  }).then(res => {
    window.$message.success('感谢你的反馈！')
  })
  showFeedback.value = false
  confirmButtonDisabled.value = false
}

// 关闭提示
function closeUpdate() {
  localStorage.setItem('updateDate', updateDate)
  showUpdateInfo.value = false
}

onMounted(() => {
  if(localStorage.getItem('updateDate') !== updateDate) {
    showUpdateInfo.value = true
  }
})

</script>

<style scoped>
.infoWarp {
  padding: 10px;
}
h3 {
  padding-top: 4px;
  font-weight: bold;
}
h4 {
  padding: 5px 0;
}
.info {
  color: #18A058;
  text-align: center
}
.hisinfo {
  color: black;
  text-align: center
}
.feedback {
  padding: 10px 0;
}
.feedback h4 {
  padding: 10px 0;
}
.feedback .sub {
  margin-top: 10px;
}
</style>
