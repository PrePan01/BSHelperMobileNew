function result(data) {
    switch (data) {
        case 'victory': return '胜利'
        case 'defeat': return '失败'
        case 'draw': return '平局'
    }
}

function battleDuration(data) {
    let d = data
    if(d > 60) {
        return `${(d/60).toFixed(0)}分${d%60}秒`
    } else {
        return `${d}秒`
    }
}

function battleTypeTrans(data) {
    switch (data) {
        case 'ranked': return '排位'
        case 'challenge': return '挑战'
        case 'teamRanked': return '组排联赛'
        case 'soloRanked': return '单排联赛'
        default: return '其他'
    }
}

export {result, battleDuration, battleTypeTrans}
