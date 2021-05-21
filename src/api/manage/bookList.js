import request from '@/utils/request'

export function meetingList(params) {
    return request({
        url: '/meeting/list',
        method: 'get',
        params
    })
}

export function meetingQuery(params) {
    return request({
        url: '/meeting/query',
        method: 'get',
        params
    })
}

export function meetingApprove(data) {
    return request({
        url: '/meeting/approve',
        method: 'post',
        data
    })
}