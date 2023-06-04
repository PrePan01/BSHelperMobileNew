import {defineStore} from "pinia";
import __searchBattlelogs from '@/api/searchBattlelogs'
import __searchPlayer from '@/api/searchPlayer'
import {useRouter} from "vue-router";

export const useStore = defineStore('main', {
    state: () => {
        return {
            profile: {},
            battlelogs: [],
            showSpin: false,
            eventDetail: [],
            battleDetailPlayers: [],
            router: useRouter()
        }
    },
    actions: {
        searchPlayer(data) {
            this.showSpin = true
            Promise.all([__searchPlayer(data), __searchBattlelogs(data)]).then(r => {
                this.profile = r[0]
                this.battlelogs = r[1]
                this.router.push('/profile')
            }).finally(() => {
                this.showSpin = false
            })
        }
    }

})
