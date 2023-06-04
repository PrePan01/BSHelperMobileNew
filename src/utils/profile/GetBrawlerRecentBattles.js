import { allModes } from "@/main";

export default function (brawlerId, store) {
    let result = []
    store.battlelogs.forEach(b => {
        if('teams' in b.battle) {
            b.battle.teams.flat(2).forEach(player => {
                if(player.tag === store.profile.tag && player.brawler.id === brawlerId) {
                    result.push({
                        mode: allModes.indexOf(b.battle.mode),
                        result: b.battle.result || (b.battle.rank <= 2 ? 'victory' : 'defeat')
                    })
                }
            })
        }

        if('players' in b.battle) {
            b.battle.players.forEach(player => {
                if(player.tag === store.profile.tag) {
                    if('brawlers' in player) {
                        player.brawlers.forEach(brawler => {
                            if(brawler.id === brawlerId) {
                                result.push({
                                    mode: allModes.indexOf(b.battle.mode),
                                    result: b.battle.result
                                })
                            }
                        })
                    }else {
                        if(player.brawler.id === brawlerId) {
                            result.push({
                                mode: allModes.indexOf(b.battle.mode),
                                result: b.battle.rank <= 4? 'victory': 'defeat'
                            })
                        }
                    }
                }
            })
        }
    })
    return result
}
