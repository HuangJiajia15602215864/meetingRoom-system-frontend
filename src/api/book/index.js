import request from '@/utils/request'


export function selectByCondition(params) {
    return request({
        url: '/room/selectByCondition',
        method: 'get',
        params
    })
}

export function meetingBook(data) {
    return request({
        url: '/meeting/book',
        method: 'post',
        data
    })
}