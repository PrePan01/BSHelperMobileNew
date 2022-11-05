import {defineStore} from "pinia";
import axios from "axios";

export const useStore = defineStore('main', {
    state: () => {
        return {
            profile: {},
            battlelogs: [],
            showSpin: false,
            eventDetail: [],
            router: void 0
        }
    },
    actions: {
        searchPlayer(data) {
            this.showSpin = true
            axios({
                url: `/playStatsApi/${data}`,
                method: 'GET'
            }).then((data) => {
                if(data.data.message === '404 Not Found') {
                    this.showSpin = false
                    window.$message.error('未搜索到玩家！')
                }
                else this.profile = data.data
            }).then(() => {
                axios({
                    url: `/playStatsApi/v1/battlelog/${data}`,
                    method: 'GET'
                }).then(data => {
                    if(data.data.message === '404 Not Found') {
                        this.showSpin = false
                        window.$message.error('请检查玩家代码是否正确')
                    }
                    else this.battlelogs = data.data.items
                    this.showSpin = false
                    this.router.push('/profile')
                }).catch(e => {
                    this.showSpin = false
                    window.$message.error('最近对战加载失败，请重试！')
                })
            }).catch(e => {
                if(e.response.status === 404) {
                    window.$message.error('加载失败，请重试！（404）')
                } else if (e.response.status === 500) {
                    window.$message.error('未搜索到玩家！（500）')
                }
            })
        }
    }

})
