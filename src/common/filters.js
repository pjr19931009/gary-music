import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime' // 导入插件gi
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.extend(relativeTime) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言
/**
 * 数量单位转换
 * @param num {Number} 转换的数字
 * @return {Number}
 */
export const unitConverter = num => {
  if (num === 0) return 0
  if (!num || isNaN(num)) {
    return '???'
  }
  // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
  num = Number(num)
  const hundredMillion = 100000000
  const tenThousand = 10000
  if (Math.abs(num) > hundredMillion) {
    return (num / hundredMillion).toFixed(0) + '亿'
  } else if (Math.abs(num) > tenThousand) {
    return (num / tenThousand).toFixed(0) + '万'
  } else {
    return num.toFixed(2)
  }
}

/**
 * 隐藏手机号码
 * @param val {Number, String} 转换的字符串对象
 * @param retain {Number} 保留位数
 * @return {String}
 */
export const privatePhone = function(val, retain = 4) {
  if (!NUMBER(val) || String(val).length !== 11 || retain == 0) return val
  let phone = String(val)
  let digit = 11 - 3 - retain
  let reg = new RegExp(`^(\\d{3})\\d{${digit}}(\\d{${retain}})$`)
  return mobile.replace(reg, `$1${'*'.repeat(digit)}$2`)
}

/**
 *
 * @param 要转换的毫秒数
 * @return 该毫秒数转换为 *  minutes : seconds 的格式
 */
export function addZero(time) {
  time = time + ''
  if (time.length < 2) {
    return '0' + time
  }
  return time
}

export const formatDuring = function(mss) {
  if (!mss) {
    return addZero(0) + ' : ' + addZero(0)
  }
  let seconds = parseInt((mss / 1000) % 60)
  let minutes = parseInt(mss / 1000 / 60)
  return addZero(minutes) + ' : ' + addZero(seconds)
}

export const timestampToDate = function(timestamp) {
  let day = dayjs(timestamp)
  let year = day.get('year')
  let month = day.get('month') + 1
  let date = day.get('date')
  return year + '-' + month + '-' + date
}

export const timeToNow = function(timestamp) {
  let day = dayjs(timestamp)
  return day.toNow(true) + '前'
}
