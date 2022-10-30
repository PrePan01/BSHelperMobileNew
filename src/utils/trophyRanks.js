export default function (data) {
    let rank = [0,0,0,0,0,0,0,0]
    for(let i of data){
        if(i.highestTrophies >= 0 && i.highestTrophies <= 49) {
            rank[0]++
        }
        else if(i.highestTrophies >= 50 && i.highestTrophies <= 139) {
            rank[1]++
        }
        else if(i.highestTrophies >= 140 && i.highestTrophies <= 299) {
            rank[2]++
        }
        else if(i.highestTrophies >= 300 && i.highestTrophies <= 499) {
            rank[3]++
        }
        else if(i.highestTrophies >= 500 && i.highestTrophies <= 749) {
            rank[4]++
        }
        else if(i.highestTrophies >= 750 && i.highestTrophies <= 999) {
            rank[5]++
        }
        else if(i.highestTrophies >= 1000 && i.highestTrophies <= 1249){
            rank[6]++
        }
        else{
            rank[7]++
        }
    }
    return rank
}
