// 公共函数

// 日期格式化
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 获取相对今天的时间
export function getDate(time, AddDayCount) {
  let date = new Date(time);
  date.setDate(date.getDate() + AddDayCount); //获取AddDayCount天后的日期
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentDate = year + seperator1 + month + seperator1 + strDate;
  return currentDate;
}

// 获取近一周
export function getLastlyWeek() {
  var weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', ]
  var day = new Date().getDay()
  var weekArr = []
  for (let i = 1; i <= 7; i++) {
    weekArr.push(weekList[(day + i) % 7])
  }
  return weekArr
}

// 获取近一月
export function getLastlyMonth() {
  var date = new Date()
  date.setDate(date.getDate() - 30) // 获取一个月前的时间戳
  var monthArr = []
  for (let i = 0; i < 30; i++) {
    monthArr.push(getDate(date, i))
  }
  return monthArr
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 防抖
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// ID转对应的值
export function change(val, arr, id = 'id', field = 'name') {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (arr[i][id] == val) {
      return arr[i][field]
    }
  }
}

// 建筑楼列表
// export const buildingList = [{
//     id: 1,
//     buildingName: '教学楼'
//   },
//   {
//     id: 2,
//     buildingName: '图书馆'
//   },
//   {
//     id: 3,
//     buildingName: '行政楼'
//   },
//   {
//     id: 4,
//     buildingName: '宿舍楼'
//   },
// ]
export const buildingList = JSON.parse(localStorage.getItem('buildingList'))


// 会议室设备列表
export const projectorList = [{
    id: 1,
    projectorName: '投影仪',
    field: 'projector'
  },
  {
    id: 2,
    projectorName: '显示屏',
    field: 'display'
  },
  {
    id: 3,
    projectorName: '黑板',
    field: 'blackboard'
  },
  {
    id: 4,
    projectorName: '白板',
    field: 'whiteboard'
  },
]

// 预订状态
export const statusList = [{
    id: 1,
    statusName: '已通过',
    adminName: '已通过'
  },
  {
    id: 2,
    statusName: '已驳回',
    adminName: '已驳回'
  },
  {
    id: 0,
    statusName: '未审批',
    adminName: '立即处理'
  }
]