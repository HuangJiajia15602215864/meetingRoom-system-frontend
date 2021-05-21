import request from '@/utils/request'

export function pannelData(params) {
    return request({
        url: '/statistics/pannelData',
        method: 'get',
        params
    })
}

export function roomNumInBuilding(params) {
    return request({
        url: '/statistics/roomNumInBuilding',
        method: 'get',
        params
    })
}

export function roomSize(params) {
    return request({
        url: '/statistics/roomSize',
        method: 'get',
        params
    })
}

export function meetingNum(params) {
    return request({
        url: '/statistics/meetingNum',
        method: 'get',
        params
    })
}