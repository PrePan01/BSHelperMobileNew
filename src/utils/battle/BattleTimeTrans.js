import dayjs from 'dayjs/esm/index.js'
import zh from 'dayjs/locale/zh-cn'
dayjs.locale(zh)

export default function (time) {
    let utcDate = time.replace(/:/g,'').replace(/-/g,'')
    let year = utcDate.slice(0, 4)
    let month = utcDate.slice(4, 6)
    let day = utcDate.slice(6, 8)
    let hour = utcDate.slice(9, 11)
    let minute = utcDate.slice(11, 13)
    let second = utcDate.slice(13, 15)
    let new_datetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    let timestamp = (Date.parse(new_datetime) / 1000) + 8 * 60 * 60;
    return [dayjs(timestamp *1000).format("YYYY-MM-DD"),dayjs(timestamp *1000).format("HH:mm:ss"),];
}
