export default function (data) {
    let en = data
    if(en === null) return '未知地图'
    // 足球
    if (en === 'Triple Dribble') return '三重威胁'
    else if (en === 'Firm Grip') return '牢牢把握'
    else if (en === 'Binary Coding') return '二进制'
    else if (en === 'Sticky Notes') return '便利贴'
    else if (en === 'Turtle Shell') return '坚硬龟壳'
    else if (en === 'Retina') return '视网膜'
    else if (en === 'Sneaky Fields') return '绿荫球场'
    else if (en === 'Sunny Soccer') return '阳光球场'
    else if (en === 'Super Stadium') return '超级体育场'
    else if (en === 'Backyard Bowl') return '后院球场'
    else if (en === 'Pinball Dreams') return '梦幻弹珠'
    else if (en === 'Pinhole Punt') return '精准射门'
    else if (en === 'Field Goal') return '绿茵交锋'
    else if (en === 'Center Stage') return '中心舞台'
    else if (en === 'Center Field') return '中心球场'
    else if (en === 'Super Beach') return '超级海滩'
    else if (en === 'Beach Ball') return '沙滩足球'
    else if (en === 'Post Haste') return '火速出击'
    else if (en === 'Coarse Course') return '粗制滥造'
    else if (en === 'Penalty Kick') return '点球大战'
    else if (en === 'Well Cut') return '带球过人'
    else if (en === 'Warped Beach') return '弯曲海滩'
    else if (en === 'Off The Line') return '超出界外'
    else if (en === 'Hairdryer Treatment') return '场边指导'
    else if (en === 'Iron Corridor') return '圆周运动'
    else if (en === 'Circular Motion') return '铁制障碍'
    else if (en === 'Extra Bouncy') return '弹力十足'
    else if (en === 'Make it Bounce') return '大力弹射'
    // 金库
    else if (en === 'Safe Zone') return '安全区域'
    else if (en === 'Forks Out') return '迂回岔路'
    else if (en === 'Bridge Too Far') return '遥远的桥'
    else if (en === 'Tornado Ring') return '肆虐龙卷'
    else if (en === 'G.G. Mortuary') return '荒漠废屋'
    else if (en === 'Hot Potato') return '烫手山芋'
    else if (en === 'Twisted Gems') return '变形宝石'
    else if (en === 'Kaboom Canyon') return '轰隆峡谷'
    else if (en === 'Pit Stop') return '维修站台'
    else if (en === 'Snaked Assault') return '蜿蜒袭击'
    else if (en === 'Cover Crowd') return '掩护众人'
    else if (en === 'Offset Heist') return '对角攻防'
    else if (en === 'Center Control') return '中心控制'
    // 赏金
    else if (en === 'Bull Pen') return '喧闹牛圈'
    else if (en === 'Dry Season') return '酷热地带'
    else if (en === 'Deeper Danger') return '暗潮涌动'
    else if (en === 'Shooting Star') return '神秘流星'
    else if (en === 'Layer Cake') return '夹心蛋糕'
    else if (en === 'Overgrown Canyon') return '蔓生大峡谷'
    else if (en === 'Heat Wave') return '热浪滚滚'
    else if (en === 'Temple Ruins') return '神殿废墟'
    else if (en === 'Hideout') return '草丛迷踪'
    else if (en === 'Canal Grande') return '大运河'
    else if (en === 'Excel') return '格格不入'
    else if (en === 'Crossroads') return '十字路口'
    else if (en === 'Nowhere To Hide') return '无处可藏'
    else if (en === 'Iron Standoff') return '钢铁对峙'
    else if (en === 'Snake Prairie') return '蝮蛇草场'
    // 机甲
    else if (en === 'Some Assembly Required') return '等待组装'
    // 热区
    else if (en === 'Open Business') return '开门营业'
    else if (en === 'Mosh Pit') return '冲撞区域'
    else if (en === 'Dueling Beetles') return '甲虫决斗'
    else if (en === 'Parallel Plays') return '平行游戏'
    else if (en === 'Ring Of Fire') return '灼热火圈'
    else if (en === 'Double Sided') return '双边并行'
    else if (en === 'Temple Of Boom') return '斗域奇兵'
    else if (en === 'Quarter Pounder') return '其乐无穷'
    else if (en === 'Controller Chaos') return '摇杆争霸'
    else if (en === 'Split') return '一分为二'
    else if (en === 'Open Zone') return '开放区域'
    else if (en === 'Iron Cover') return '钢铁掩体'
    else if (en === 'Rush Hour') return '交通拥堵'
    else if (en === 'Triumvirate') return '三位一体'
    // 淘汰赛
    else if (en === 'Goldarm Gulch') return '金臂峡谷'
    else if (en === 'Crimewater') return '危险水域'
    else if (en === 'Flaring Phoenix') return '烈焰凤凰'
    else if (en === 'Flowing Springs') return '潺潺溪流'
    else if (en === "Belles Rock") return '摇滚贝尔'
    else if (en === 'Splash Out') return '大手大脚'
    else if (en === 'Riverside') return '长河堤岸'
    else if (en === 'New Perspective') return '全新视角'
    else if (en === 'X Marks The Spot') return '宝藏标记'
    else if (en === 'Out In The Open') return '空旷荒野'
    else if (en === 'Step By Step') return '步步为营'
    else if (en === 'Healthy Middle Ground') return '疗伤中场'
    else if (en === 'Deep End') return '深水区'
    // 篮球
    else if (en === 'Ball Hog') return '首席球迷'
    else if (en === 'Green Meadows') return '绿色草甸'
    else if (en === 'Iron Curtain') return '钢铁屏障'
    else if (en === 'Basket Fort') return '篮球堡垒'
    else if (en === 'Dancing Roof') return '闪亮舞台'
    // 宝石
    else if (en === 'Hard Rock Mine') return '硬石矿井'
    else if (en === 'Crystal Arcade') return '水晶街机厅'
    else if (en === 'Gem Fort') return '宝石要塞'
    else if (en === 'Undermine') return '十面埋伏'
    else if (en === 'Deep Diner') return '深渊餐厅'
    else if (en === 'Double Swoosh') return '嗖嗖作响'
    else if (en === 'Minecart Madness') return '矿车飞驰'
    else if (en === 'Solid Center') return '坚固中心'
    else if (en === 'Four Doors') return '四门洞开'
    else if (en === 'Acute Angle') return '锋利锐角'
    else if (en === 'Rustic Arcade') return '乡趣游乐场'
    // 擂台赛
    else if (en === 'Mogura Tataki') return '打地鼠'
    else if (en === 'Four Lakes') return '湖区激战'
    else if (en === 'Grim Island') return '凄凉岛屿'
    else if (en === 'Iron Core') return '钢铁核心'
    else if (en === 'Death Loop') return '激斗循环'
    else if (en === 'Eyes on the Ground') return '稳扎稳打'
    else if (en === 'Cheeky Chokepoint') return '焦点战区'
    else if (en === 'Battered Battlefield') return '遗迹战场'
    // 排球
    else if (en === 'Isolation Play') return '各自为战'
    else if (en === 'Victory Road') return '胜利之路'
    else if (en === 'Smash Land') return '碎裂土地'
    else if (en === 'Power Alley') return '火爆球场'


    else return en
}
