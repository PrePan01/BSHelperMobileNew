import BrawlerTrans from './BrawlerTranslate'
import GetBattleColor from './GetBattleColor'

export default function (data, tag) {
    let myTag = tag
    let myBrawlersTmp = {}
    let teamMateBrawlersTmp = {}
    let enemyBrawlersTmp = {}
    let battleResult = []

    function updateBattleResult(b, bItem) {
        for(let i in battleResult) {
            if(battleResult[i].name === BrawlerTrans(b.id) && battleResult[i].itemStyle.color === GetBattleColor(bItem.battle.result, bItem.battle.rank)) {
                battleResult[i].value++
                break
            }
            if( i == battleResult.length - 1 &&
                (battleResult[i].name !== BrawlerTrans(b.id) ||
                    battleResult[i].itemStyle.color !== GetBattleColor(bItem.battle.result, bItem.battle.rank))
            ) {
                battleResult.push({
                    value: 1,
                    name: BrawlerTrans(b.id),
                    itemStyle: { color: GetBattleColor(bItem.battle.result, bItem.battle.rank)}
                })
            }
        }
    }

    data.forEach(battleItem => {
        if('teams' in battleItem.battle) {
            battleItem.battle.teams.forEach(team => {
                let f = team.some(player =>
                    player.tag === myTag
                )
                if(f) {
                    team.forEach(item => {
                        if(item.tag === myTag) {
                            item.brawler.id in myBrawlersTmp?myBrawlersTmp[item.brawler.id]++:myBrawlersTmp[item.brawler.id] = 1
                            if(battleResult.length === 0) {
                                battleResult.push({
                                    value: 1,
                                    name: BrawlerTrans(item.brawler.id),
                                    itemStyle: { color: GetBattleColor(battleItem.battle.result, battleItem.battle.rank)}
                                })
                            } else {
                                updateBattleResult(item.brawler, battleItem)
                            }
                        } else {
                            item.brawler.id in teamMateBrawlersTmp?teamMateBrawlersTmp[item.brawler.id]++:teamMateBrawlersTmp[item.brawler.id] = 1
                        }
                    })
                } else {
                    team.forEach(item => {
                        item.brawler.id in enemyBrawlersTmp?enemyBrawlersTmp[item.brawler.id]++:enemyBrawlersTmp[item.brawler.id] = 1
                    })
                }

            })
        }
        else if (battleItem.battle.mode === 'duels') {
            battleItem.battle.players.forEach(item => {
                if(item.tag === myTag) {
                    item.brawlers.forEach(b => {
                        b.id in myBrawlersTmp?myBrawlersTmp[b.id]++:myBrawlersTmp[b.id] = 1
                        if(battleResult.length === 0) {
                            battleResult.push({
                                value: 1,
                                name: BrawlerTrans(b.id),
                                itemStyle: { color: GetBattleColor(battleItem.battle.result, battleItem.battle.rank)}
                            })
                        } else {
                            updateBattleResult(b, battleItem)
                        }
                    })
                } else {
                    item.brawlers.forEach(b => {
                        b.id in enemyBrawlersTmp?enemyBrawlersTmp[b.id]++:enemyBrawlersTmp[b.id] = 1
                    })
                }
            })

        }
        else {
            battleItem.battle.players.flat().forEach(item => {
                if(item.tag === myTag) {
                    item.brawler.id in myBrawlersTmp?myBrawlersTmp[item.brawler.id]++:myBrawlersTmp[item.brawler.id] = 1
                    updateBattleResult(item.brawler, battleItem)
                } else {
                    item.brawler.id in teamMateBrawlersTmp?teamMateBrawlersTmp[item.brawler.id]++:teamMateBrawlersTmp[item.brawler.id] = 1
                }
            })
        }
    })

    return [myBrawlersTmp, teamMateBrawlersTmp, battleResult,enemyBrawlersTmp]
}
