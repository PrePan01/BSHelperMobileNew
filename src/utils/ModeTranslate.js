export default function (mode) {
    switch (mode) {
        case 'Gem-Grab': { return '宝石争霸' }
        case 'gemGrab': { return '宝石争霸' }

        case 'Brawl-Ball': { return '乱斗足球' }
        case 'brawlBall': { return '乱斗足球' }

        case 'Bounty': { return '赏金猎人' }
        case 'bounty': { return '赏金猎人' }

        case 'Heist': { return '金库攻防' }
        case 'heist': { return '金库攻防' }

        case 'Hot-Zone': { return '热区争夺' }
        case 'hotZone': { return '热区争夺' }

        // case 'Siege': { return '宝石争霸' }

        case 'Knockout': { return '乱斗淘汰赛' }
        case 'knockout': { return '乱斗淘汰赛' }

        case 'Solo-Showdown': { return '荒野决斗' }
        case 'soloShowdown': { return '荒野决斗' }

        case 'Duo-Showdown': { return '双人荒野决斗' }
        case 'duoShowdown': { return '双人荒野决斗' }

        case 'Duels': { return '乱斗擂台赛' }
        case 'duels': { return '乱斗擂台赛' }

        case 'Wipeout': { return '积分争夺赛' }
        case 'wipeout': { return '积分争夺赛' }

        case 'Payload': { return 'Payload' }
        case 'payload': { return 'Payload' }

        case 'BasketBrawl': { return '乱斗篮球' }
        case 'Basket-Brawl': { return '乱斗篮球' }
        case 'basketBrawl': { return '乱斗篮球' }

        case 'Boss-Fight': { return '首领之战' }
        case 'bossFight': { return '首领之战' }

        case 'Big-Game': { return '天选之战' }
        case 'bigGame': { return '天选之战' }

        case 'Snowtel-Thieves': { return '雪中送礼' }
        case 'snowtelThieves': { return '雪中送礼' }

        case 'Hunters': { return 'Hunters' }
        case 'hunters': { return 'Hunters' }
        default: {return mode}
    }
}
