import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const dayNow = (date:number):string =>{
    return dayjs(date).fromNow()
}
