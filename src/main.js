import 'babel-polyfill';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import 'vant/lib/index.css';
import './fonts/fonts.css'

let app = createApp(App)

let brawlersList = []
function createBrawlersList(){
    let num = 0
    for(let i = 0; i <= 63; i++,num++){
        if(num===33 || num===55) num++
        brawlersList[i] = 16000000 + num
    }
}

createBrawlersList()
// 全局变量
app.config.globalProperties.$modes =
    ['gemGrab', 'brawlBall', 'bounty',
        'heist', 'hotZone', 'siege',
        'knockout', 'soloShowdown',
        'duoShowdown', 'duels', 'wipeout',
        'payload', 'basketBrawl', 'invasion',
        'hunters', 'lastStand', 'bossFight',
        'bigGame','snowtelThieves', 'roboRumble'
    ]
app.config.globalProperties.$brawlers = brawlersList

app.use(router).use(createPinia()).mount('#app')
