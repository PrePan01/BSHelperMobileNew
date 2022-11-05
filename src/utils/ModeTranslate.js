export default function (mode) {
    switch (mode) {
        case 'Gem-Grab': { return '宝石争霸' }
        case 'Brawl-Ball': { return '乱斗足球' }
        case 'Bounty': { return '赏金猎人' }
        case 'Heist': { return '金库攻防' }
        case 'Hot-Zone': { return '热区争夺' }
        case 'Siege': { return '宝石争霸' }
        case 'Knockout': { return '乱斗淘汰赛' }
        case 'Solo-Showdown': { return '荒野决斗' }
        case 'Duo-Showdown': { return '双人荒野决斗' }
        case 'Duels': { return 'Duels' }
        case 'Wipeout': { return 'Wipeout' }
        case 'Payload': { return 'Payload' }
        case 'BasketBrawl': { return '乱斗篮球' }
        case 'Hunters': { return 'Hunters' }
        default: {return mode}
    }
}
