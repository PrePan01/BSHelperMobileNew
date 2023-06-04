export default function (d) {
    let top10 = []
    let data = JSON.parse(JSON.stringify(d)).sort((a, b) => b.trophies - a.trophies).slice(0,10)
    let data1 = JSON.parse(JSON.stringify(d)).sort((a, b) => b.trophies - a.trophies).slice(10)
    let trophyLeagueEndTrophy = 0
    let blings = 0
    for(let i of data){
        let trophies = i.trophies
        if(trophies <= 500){
            trophyLeagueEndTrophy += trophies
        }
        else if(trophies >= 501 && trophies <= 524){
            trophyLeagueEndTrophy += 500
            blings += 4
            top10.push({
                brawler: i.id, blings: 4, trophies
            })
        }
        else if(trophies >= 525 && trophies <= 549){
            trophyLeagueEndTrophy += 524
            blings += 6
            top10.push({
                brawler: i.id, blings: 6, trophies
            })
        }
        else if(trophies >= 550 && trophies <= 574){
            trophyLeagueEndTrophy += 549
            blings += 8
            top10.push({
                brawler: i.id, blings: 8, trophies
            })
        }
        else if(trophies >= 575 && trophies <= 599){
            trophyLeagueEndTrophy += 574
            blings += 10
            top10.push({
                brawler: i.id, blings: 10, trophies
            })
        }
        else if(trophies >= 600 && trophies <= 624){
            trophyLeagueEndTrophy += 599
            blings += 12
            top10.push({
                brawler: i.id, blings: 12, trophies
            })
        }
        else if(trophies >= 625 && trophies <= 649){
            trophyLeagueEndTrophy += 624
            blings += 14
            top10.push({
                brawler: i.id, blings: 14, trophies
            })
        }
        else if(trophies >= 650 && trophies <= 674){
            trophyLeagueEndTrophy += 649
            blings += 16
            top10.push({
                brawler: i.id, blings: 16, trophies
            })
        }
        else if(trophies >= 675 && trophies <= 699){
            trophyLeagueEndTrophy += 674
            blings += 18
            top10.push({
                brawler: i.id, blings: 18, trophies
            })
        }
        else if(trophies >= 700 && trophies <= 724){
            trophyLeagueEndTrophy += 699
            blings += 20
            top10.push({
                brawler: i.id, blings: 20, trophies
            })
        }
        else if(trophies >= 725 && trophies <= 749){
            trophyLeagueEndTrophy += 724
            blings += 22
            top10.push({
                brawler: i.id, blings: 22, trophies
            })
        }
        else if(trophies >= 750 && trophies <= 774){
            trophyLeagueEndTrophy += 749
            blings += 24
            top10.push({
                brawler: i.id, blings: 24, trophies
            })
        }
        else if(trophies >= 775 && trophies <= 799){
            trophyLeagueEndTrophy += 774
            blings += 26
            top10.push({
                brawler: i.id, blings: 26, trophies
            })
        }
        else if(trophies >= 800 && trophies <= 824){
            trophyLeagueEndTrophy += 799
            blings += 28
            top10.push({
                brawler: i.id, blings: 28, trophies
            })
        }
        else if(trophies >= 825 && trophies <= 849){
            trophyLeagueEndTrophy += 824
            blings += 30
            top10.push({
                brawler: i.id, blings: 30, trophies
            })
        }
        else if(trophies >= 850 && trophies <= 874){
            trophyLeagueEndTrophy += 849
            blings += 32
            top10.push({
                brawler: i.id, blings: 32, trophies
            })
        }
        else if(trophies >= 875 && trophies <= 899){
            trophyLeagueEndTrophy += 874
            blings += 34
            top10.push({
                brawler: i.id, blings: 34, trophies
            })
        }

        else if(trophies >= 900 && trophies <= 924){
            trophyLeagueEndTrophy += 899
            blings += 36
            top10.push({
                brawler: i.id, blings: 36, trophies
            })
        }
        else if(trophies >= 925 && trophies <= 949){
            trophyLeagueEndTrophy += 924
            blings += 38
            top10.push({
                brawler: i.id, blings: 38, trophies
            })
        }
        else if(trophies >= 950 && trophies <= 974){
            trophyLeagueEndTrophy += 949
            blings += 40
            top10.push({
                brawler: i.id, blings: 40, trophies
            })
        }
        else if(trophies >= 975 && trophies <= 999){
            trophyLeagueEndTrophy += 974
            blings += 42
            top10.push({
                brawler: i.id, blings: 42, trophies
            })
        }
        else if(trophies >= 1000 && trophies <= 1049){
            trophyLeagueEndTrophy += 999
            blings += 44
            top10.push({
                brawler: i.id, blings: 44, trophies
            })
        }
        else if(trophies >= 1050 && trophies <= 1099){
            trophyLeagueEndTrophy += 1049
            blings += 46
            top10.push({
                brawler: i.id, blings: 46, trophies
            })
        }
        else if(trophies >= 1100 && trophies <= 1149){
            trophyLeagueEndTrophy += 1099
            blings += 48
            top10.push({
                brawler: i.id, blings: 48, trophies
            })
        }
        else if(trophies >= 1150 && trophies <= 1199){
            trophyLeagueEndTrophy += 1149
            blings += 50
            top10.push({
                brawler: i.id, blings: 50, trophies
            })
        }
        else if(trophies >= 1200 && trophies <= 1249){
            trophyLeagueEndTrophy += 1199
            blings += 52
            top10.push({
                brawler: i.id, blings: 52, trophies
            })
        }
        else if(trophies >= 1250 && trophies <= 1299){
            trophyLeagueEndTrophy += 1249
            blings += 54
            top10.push({
                brawler: i.id, blings: 54, trophies
            })
        }
        else if(trophies >= 1300 && trophies <= 1349){
            trophyLeagueEndTrophy += 1299
            blings += 56
            top10.push({
                brawler: i.id, blings: 56, trophies
            })
        }
        else if(trophies >= 1350 && trophies <= 1399){
            trophyLeagueEndTrophy += 1349
            blings += 58
            top10.push({
                brawler: i.id, blings: 58, trophies
            })
        }
        else if(trophies >= 1400 && trophies <= 1449){
            trophyLeagueEndTrophy += 1399
            blings += 60
            top10.push({
                brawler: i.id, blings: 60, trophies
            })
        }
        else if(trophies >= 1450 && trophies <= 1499){
            trophyLeagueEndTrophy += 1449
            blings += 62
            top10.push({
                brawler: i.id, blings: 62, trophies
            })
        }
        else if(trophies >= 1500){
            trophyLeagueEndTrophy += 1499
            blings += 64
            top10.push({
                brawler: i.id, blings: 64, trophies
            })
        }
    }
    for (let i of data1) {
        trophyLeagueEndTrophy += i.trophies
    }
    return [[trophyLeagueEndTrophy,blings],top10]
}
