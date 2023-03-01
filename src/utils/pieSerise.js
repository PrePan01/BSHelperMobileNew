export default
/**
* @function 饼图配置
* @param data1 {Array} 英雄使用数量
* @param data2 {Array} 英雄胜负数量
*
* */
function (data1,data2) {
    return [
        {
            name: 'Access From',
            type: 'pie',
            right: '4%',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'outside',
                color: 'white',
                lineHeight: 18,
                formatter: (params => {
                    return `${params.name}`
                })
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            labelLine: {
                show: true,
                length2: '2'
            },
            labelLayout: {
                hideOverlap: true
            },
            data: data1,
            tooltip: {
                trigger: 'item',
                formatter: ((params) => {
                    return `${params.name}：${params.value}次`
                })
            }
        },{
        name: 'Access From',
        type: 'pie',
        right: '4%',
        radius: ['15%', '40%'],
        avoidLabelOverlap: false,
        label: {
            position: 'inside',
            fontSize: 10,
            color: '#FFF',
            formatter: ((params) => {
                let r = ''
                if(params.color === 'rgb(103,194,58)') {
                    r = '胜'
                } else if (params.color === 'rgb(64,158,255)') {
                    r = '平'
                } else r = '负'
                return `${params.value}${r}`
            })
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        labelLayout: {
            hideOverlap: true
        },
        tooltip: {
            trigger: 'item',
            formatter: ((params) => {
                let r = ''
                if(params.color === 'rgb(103,194,58)') {
                    r = '胜利'
                } else if (params.color === 'rgb(64,158,255)') {
                    r = '平局'
                } else r = '战败'
                return `${params.name}：${params.value}次 ${r}`
            })
        },
        data: data2
    }
    ]

}
