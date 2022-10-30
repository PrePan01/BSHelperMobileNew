import dayjs from 'dayjs/esm/index.js'
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // use locale
dayjs.extend(relativeTime);

export default function (time) {
    let utcDate = time.replace(/:/g,'').replace(/-/g,'')
    let year = utcDate.slice(0, 4)
    let month = utcDate.slice(4, 6)
    let day = utcDate.slice(6, 8)
    let hour = utcDate.slice(9, 11)
    let minute = utcDate.slice(11, 13)
    let second = utcDate.slice(13, 15)
    let new_datetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    let timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;
    timestamp = timestamp + 8 * 60 * 60;
    return [dayjs(timestamp *1000).format("YYYY-MM-DD"),dayjs(timestamp *1000).format("HH:mm:ss"),];
}
