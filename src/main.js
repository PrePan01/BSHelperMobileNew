import 'babel-polyfill';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import 'vant/lib/index.css';
import './fonts/fonts.css'

let app = createApp(App)

// 全局变量
app.config.globalProperties.$modes =
    ['gemGrab', 'brawlBall', 'bounty', 'heist', 'hotZone', 'siege', 'knockout', 'soloShowdown', 'duoShowdown', 'duels', 'wipeout', 'payload', 'basketBrawl', 'invasion', 'hunters', 'lastStand', 'bossFight']


app.use(router).use(createPinia()).mount('#app')
