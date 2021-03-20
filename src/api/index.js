// 统一出口
import * as userApi from './service/users'
import * as api from './service/api'
export default { ...userApi, ...api }
