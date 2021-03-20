import request from './instance.js'
import md5 from 'js-md5'
function getTime() {
  let timestamp = new Date().getTime()
  return '?timestamp=' + timestamp
}
/**
 * @description: 登陆请求
 * @param {string} phone 登陆网易云手机号
 * @param {String} pwd 密码
 */
export const login = (phone, pwd) => {
  return request.post(
    '/login/cellphone' + getTime(),
    { phone: phone, md5_password: md5(pwd) },
    {
      timeout: 10000
    }
  )
}
