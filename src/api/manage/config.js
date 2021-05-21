import request from '@/utils/request'

export function roomList(params) {
    return request({
        url: '/room/list',
        method: 'get',
        params
    })
}

export function roomAdd(data) {
    return request({
        url: '/room/add',
        method: 'post',
        data
    })
}

export function roomUpdate(data) {
    return request({
        url: '/room/update',
        method: 'post',
        data
    })
}

export function roomDelete(data) {
    return request({
        url: '/room/delete',
        method: 'delete',
        data
    })
}