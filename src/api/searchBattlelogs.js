import axios from "axios";

export default function (data) {
    return new Promise((res, rej) => {
        axios({
            url: `/playStatsApi/v1/battlelog/${data}`,
            method: 'GET'
        }).then(battlelogs => {
            if(battlelogs.data.message === '404 Not Found') {
                window.$message.error('暂时无法获取对战列表，请稍后再试')
                rej('最近对战搜索失败')
            }
            res(battlelogs.data.items)
        }).catch(e => {
            window.$message.error('最近对战加载失败，请刷新重试')
            rej('最近对战搜索失败')
        })
    })
}
