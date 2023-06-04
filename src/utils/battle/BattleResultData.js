export default function (battlelogs, myName) {
    let battleData = {
        victory: 0,
        defeat: 0,
        draw: 0,
        mvp: 0
    }

    battlelogs.forEach(i => {
        if(i.battle.rank) {
            i.battle.rank > 5? battleData.defeat++: battleData.victory++
        }
        else battleData[i.battle.result]++
        if(i.battle.starPlayer?.name === myName) {
            battleData.mvp++
        }
    })

    return battleData
}
