import officalApi from './officalApi'


export default function (data) {
    return new Promise((res, rej) => {
        officalApi.get(`/playStatsApi/v1/players/%23${data}`).then(player=> {
            if(player.data.message === '404 Not Found') {
                window.$message.error(
                    (() =>
                        <div>未搜索到玩家，请检查代码是否正确！<br/>目前仅支持国际服。</div>
                    ),
                    { duration: 5000 }
                )
                rej('未搜索到玩家！')
            }
            res(player.data)
        }).catch(e => {
            if(e.response.status === 404) {
                window.$message.error('加载失败，请重试，若游戏处于维护请等待维护结束后再试！（404）')
            } else if (e.response.status === 500) {
                window.$message.error('未搜索到玩家，请重试，若游戏处于维护请等待维护结束后再试！（500）')
            }
            rej('搜索玩家失败')
        })
    })
}
