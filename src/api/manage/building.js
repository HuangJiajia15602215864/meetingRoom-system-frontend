import request from '@/utils/request'

export function getBuildingList(params) {
    return request({
        url: '/building/list',
        method: 'get',
        params
    })
}