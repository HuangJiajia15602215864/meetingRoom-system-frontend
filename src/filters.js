/**
 * ID转对应的值
 * @param {String} id 标识字段
 * @param {String} field 结果字段
 * @param {String} val 值
 * @param {Array} arr 数组
 */
const change = (val, arr, id = 'id', field = 'name') => {
    //if (!val) return '无'
    const len = arr.length
    for (let i = 0; i < len; i++) {
        if (arr[i][id] == val) {
            return arr[i][field]
        }
    }
}

module.exports = {
    change
}