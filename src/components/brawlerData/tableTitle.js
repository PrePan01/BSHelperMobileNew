import {h} from "vue";
import {NButton} from "naive-ui";

export default function tableTitle(data, click){
    return h(
        'div',
        {
            style: {textAlign: 'center'}
        },
        [
            h(
                'div',
                {
                    style: {
                        fontWeight:'bold',
                        fontSize: '18px',
                        margin:'0 10px 5px 10px'
                    }
                },
                data
            ),
            h(NButton,
                {
                    size: 'small',
                    style: {
                        display: 'block',
                        margin:'0 auto'
                    },
                    onClick: click
                },
                '历史'
            )
        ]
    )
}
