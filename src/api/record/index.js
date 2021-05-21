import request from '@/utils/request'

export function getRecordList(params) {
    return request({
        url: '/meeting/record',
        method: 'get',
        params
    })
}