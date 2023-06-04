<template>
  <p class="title">
    <img src="@/assets/button_info.png" alt="" class="infoBtn" @click="showMsg(item[5])">
    <span class="skinName">{{item[1]}}</span>
    <Tag :type="item[6]?'warning':'success'" size="large" class="tag">{{item[6]?'已绝版':'未绝版'}}</Tag>
  </p>
  <div class="skin-detail">
    <VanImage
        slot="cover"
        :src="'https://prepan.top/bs_m/img/skins/' + props.curBrawlerIndex + '/' + item[0] + '.png'"
        style="width: 40%;"
    >
      <template v-slot:loading>
        <n-spin size="medium" />
      </template>
    </VanImage>
    <div>
      <div class="price-title">价格</div>
      <div class="price">
        <div v-for="(price, index) in (Array.isArray(item[2])? item[2]: [item[2]])" :key="index">
          <div class="curPrice">
            <img v-if="price !== 'free' && price !== 'rmb'" :src="require('../../assets/' + price + '.png')" alt="" class="priceIcon">
            <span>{{(price=== 'ticket'||item[3]==='')?'免费':item[3]}}</span>
          </div>
          <div class="curPrice" v-if="price === 'gems' && item[3] !== '49' && item[3] !== '299' && item[3] !== '199' && item[7] !== 'nobling'">
            <img src="../../assets/bling.png" alt="" class="priceIcon">
            <span>{{item[3] === '149'? 5000:item[3] === '79'?2750:1000}}</span>
          </div>
        </div>
      </div>
      <div class="price-title" v-if="item[4] !== ''">史低</div>
      <div class="price" v-if="item[4] !== ''">
        <img v-if="item[2] !== 'rmb'" :src="require('../../assets/' + item[2] + '.png')" alt="" class="priceIcon">
        <span>{{item[4]}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Tag, Image as VanImage  } from 'vant';
import { NSpin } from 'naive-ui'
import { toRef } from "vue";

let props = defineProps(['skinitem', 'curBrawlerIndex'])
let item = toRef(props, 'skinitem')


function showMsg(data) {
  window.$message.info(data)
}

</script>

<style scoped>
.tag {
  margin-left: auto;
}
.skin-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.skinPic {
  width: 50vw;
}
.price {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  font-size: 22px;
  font-family: 'lato','黑体', serif;
  font-weight: bold;
  text-shadow: 1px 1px black;

}
.price-title {
  font-size: 16px;
  margin-top: 16px;
  text-align: right;
  font-family: '黑体', serif;
  font-weight: bold;
  text-shadow: 1px 1px black;
}
.priceIcon {
  width: 20px;
  margin: 0 4px;
}
.curPrice {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.title {
  display: flex;
  align-items: center;
}
.infoBtn {
  width: 26px;
  margin-right: 10px;
}
.skinName {
  font-size: 26px;
  width: 60%;
  font-weight: bold;
  text-shadow: 1px 1px 1px black;
}
</style>
