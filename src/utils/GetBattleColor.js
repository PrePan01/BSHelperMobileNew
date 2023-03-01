export default function(result,rank) {
    if(result === 'victory' || rank <=4) return 'rgb(103,194,58)'
    else if(result === 'defeat') return 'rgb(245,108,108)'
    else return 'rgb(64,158,255)'
}
