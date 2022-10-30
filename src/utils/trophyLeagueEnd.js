export default function (data) {
    let trophyLeagueEndTrophy = 0
    let starPoints = 0
    for(let i of data){
        let trophies = i.trophies
        if(trophies <= 500){
            trophyLeagueEndTrophy += trophies
        }
        else if(trophies >= 501 && trophies <= 524){
            trophyLeagueEndTrophy += 500
            starPoints += 20
        }
        else if(trophies >= 525 && trophies <= 549){
            trophyLeagueEndTrophy += 524
            starPoints += 50
        }
        else if(trophies >= 550 && trophies <= 574){
            trophyLeagueEndTrophy += 549
            starPoints += 70
        }
        else if(trophies >= 575 && trophies <= 599){
            trophyLeagueEndTrophy += 574
            starPoints += 80
        }
        else if(trophies >= 600 && trophies <= 624){
            trophyLeagueEndTrophy += 599
            starPoints += 90
        }
        else if(trophies >= 625 && trophies <= 649){
            trophyLeagueEndTrophy += 624
            starPoints += 100
        }
        else if(trophies >= 650 && trophies <= 674){
            trophyLeagueEndTrophy += 649
            starPoints += 110
        }
        else if(trophies >= 675 && trophies <= 699){
            trophyLeagueEndTrophy += 674
            starPoints += 120
        }
        else if(trophies >= 700 && trophies <= 724){
            trophyLeagueEndTrophy += 699
            starPoints += 130
        }
        else if(trophies >= 725 && trophies <= 749){
            trophyLeagueEndTrophy += 724
            starPoints += 140
        }
        else if(trophies >= 750 && trophies <= 774){
            trophyLeagueEndTrophy += 749
            starPoints += 150
        }
        else if(trophies >= 775 && trophies <= 799){
            trophyLeagueEndTrophy += 774
            starPoints += 160
        }
        else if(trophies >= 800 && trophies <= 824){
            trophyLeagueEndTrophy += 799
            starPoints += 170
        }
        else if(trophies >= 825 && trophies <= 849){
            trophyLeagueEndTrophy += 824
            starPoints += 180
        }
        else if(trophies >= 850 && trophies <= 874){
            trophyLeagueEndTrophy += 849
            starPoints += 190
        }
        else if(trophies >= 875 && trophies <= 899){
            trophyLeagueEndTrophy += 874
            starPoints += 200
        }
        else if(trophies >= 900 && trophies <= 924){
            trophyLeagueEndTrophy += 885
            starPoints += 210
        }
        else if(trophies >= 925 && trophies <= 949){
            trophyLeagueEndTrophy += 900
            starPoints += 220
        }
        else if(trophies >= 950 && trophies <= 974){
            trophyLeagueEndTrophy += 920
            starPoints += 230
        }
        else if(trophies >= 975 && trophies <= 999){
            trophyLeagueEndTrophy += 940
            starPoints += 240
        }
        else if(trophies >= 1000 && trophies <= 1049){
            trophyLeagueEndTrophy += 960
            starPoints += 250
        }
        else if(trophies >= 1050 && trophies <= 1099){
            trophyLeagueEndTrophy += 980
            starPoints += 260
        }
        else if(trophies >= 1100 && trophies <= 1149){
            trophyLeagueEndTrophy += 1000
            starPoints += 270
        }
        else if(trophies >= 1150 && trophies <= 1199){
            trophyLeagueEndTrophy += 1020
            starPoints += 280
        }
        else if(trophies >= 1200 && trophies <= 1249){
            trophyLeagueEndTrophy += 1040
            starPoints += 290
        }
        else if(trophies >= 1250 && trophies <= 1299){
            trophyLeagueEndTrophy += 1060
            starPoints += 300
        }
        else if(trophies >= 1300 && trophies <= 1349){
            trophyLeagueEndTrophy += 1080
            starPoints += 310
        }
        else if(trophies >= 1350 && trophies <= 1399){
            trophyLeagueEndTrophy += 1100
            starPoints += 320
        }
        else if(trophies >= 1400 && trophies <= 1449){
            trophyLeagueEndTrophy += 1120
            starPoints += 330
        }
        else if(trophies >= 1450 && trophies <= 1499){
            trophyLeagueEndTrophy += 1140
            starPoints += 340
        }
        else if(trophies >= 1500){
            trophyLeagueEndTrophy += 1150
            starPoints += 350
        }
    }
    return [trophyLeagueEndTrophy,starPoints]
}
