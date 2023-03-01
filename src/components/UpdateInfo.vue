<template>
  <van-dialog
      :show="showUpdateInfo"
      confirm-button-color="#2A59DB"
      confirm-button-text="知道啦"
      :confirmButtonDisabled="confirmButtonDisabled"
      @confirm="closeUpdate"
  >
    <div class="infoWarp">
      <h3 class="info"></h3>
      <div style="text-align: center;color: #18A058">
        <img src="../assets/pic1.png" alt="" style="width: 100%;border-radius: 16px">
        <div style="color: rgb(230,87,22)">
          <!--<h2>🎉新功能出现！</h2>-->
          <h2>🎉战绩小助手一周年！</h2>
          <h3>😘填写小调查，帮助我们做得更好</h3>
        </div>
        <div class="feedback" v-if="showFeedback">
          <h4>你觉得战绩小助手好用吗？</h4>
          <n-radio-group size="large" v-model:value="feedbackScore" name="radiobuttongroup1"  @update:value="updateFeedbackScore">
            <n-radio-button
                v-for="feedbackScore in feedbackScores"
                :key="feedbackScore.value"
                :value="feedbackScore.value"
                :label="feedbackScore.label"
            />
          </n-radio-group>
          <h4>有什么建议或意见吗？</h4>
          <n-input v-model:value="feedbackText" type="text" placeholder=""/>
          <n-button round type="primary" class="sub" @click="subFeedback" :disabled="subFeedbackBtn">
            提交反馈
          </n-button>
        </div>
        <div v-if="!showFeedback">
          <h3>感谢您的反馈！</h3>
        </div>
      </div>
      <!--<video
          muted
          autoplay
          src="https://prepan.top/updateInfo/update1101.mp4"
          style="width: 100%"
          loop
      ></video>-->
    </div>
  </van-dialog>
</template>

<script setup>
import axios from 'axios'
import {onMounted, ref} from "vue";
import {Dialog} from "vant";
import {NRadioGroup, NRadioButton, NInput, NButton} from "naive-ui"
const VanDialog = Dialog.Component;

let updateDate = 'update0225_1'

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
