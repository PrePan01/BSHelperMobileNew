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
    for(let i = 0; i <= 67; i++,num++){
        if(num===33 || num===55) num++
        brawlersList[i] = 16000000 + num
    }
}

createBrawlersList()
let allModes = ['gemGrab', 'brawlBall', 'bounty',
    'heist', 'hotZone', 'siege',
    'knockout', 'soloShowdown',
    'duoShowdown', 'duels', 'wipeout',
    'payload', 'basketBrawl', 'invasion',
    'hunters', 'lastStand', 'bossFight',
    'bigGame','snowtelThieves', 'roboRumble', 'volleyBrawl'
]

// 全局变量
app.config.globalProperties.$modes = allModes

app.config.globalProperties.$brawlers = brawlersList

app.use(router).use(createPinia()).mount('#app')

export { allModes }

// 百度统计
var _hmt = _hmt || [];
window._hmt = _hmt;
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5be7597fdb8f7699d04848d6ff995f85";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
