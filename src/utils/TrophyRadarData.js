import {data as BrawlerType} from '@/utils/BrawlerType'

export default function (data) {
    let arr = []
    let typeNumber = []
    let max = []
    data.forEach(brawler => {
        let typeid = BrawlerType[brawler.id]
        typeNumber[typeid] = (typeNumber[typeid] || 0) + 1
        arr[typeid] = (arr[typeid] || 0) + brawler.trophies
        if(brawler.highestTrophies > (max[typeid] || 0)) {
            max[typeid] = brawler.highestTrophies
        }
    })
    for(let i in arr) {
        arr[i] = (arr[i] / typeNumber[i]).toFixed(0)
    }
    return [arr, max]
}
