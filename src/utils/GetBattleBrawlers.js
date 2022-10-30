export default function (data, tag) {
    let myTag = tag
    let myBrawlersTmp = {}
    let teamMateBrawlersTmp = {}
    data.forEach(item => {
        'teams' in item.battle?
        item.battle.teams.flat(2).forEach(item => {
            if(item.tag === myTag) {
                item.brawler.id in myBrawlersTmp?myBrawlersTmp[item.brawler.id]++:myBrawlersTmp[item.brawler.id] = 1
            } else {
                item.brawler.id in teamMateBrawlersTmp?teamMateBrawlersTmp[item.brawler.id]++:teamMateBrawlersTmp[item.brawler.id] = 1
            }
        }) :
        item.battle.players.flat().forEach(item => {
            if(item.tag === myTag) {
                item.brawler.id in myBrawlersTmp?myBrawlersTmp[item.brawler.id]++:myBrawlersTmp[item.brawler.id] = 1
            } else {
                item.brawler.id in teamMateBrawlersTmp?teamMateBrawlersTmp[item.brawler.id]++:teamMateBrawlersTmp[item.brawler.id] = 1
            }
        })
    })
    return [myBrawlersTmp, teamMateBrawlersTmp]
}
