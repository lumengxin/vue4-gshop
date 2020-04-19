/* 
接口请求函数的模块
函数的返回值：promise对象
*/
import ajax from './ajax'

// 端口不同，存在跨域：1.服务器端设置成允许；2.反向代理，绕过浏览器
// const BASE_URL = 'http://localhost:3000'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
// export function getAddress() {}
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)

// 2、获取食品分类列表
export const reqFoodCategory = () => ajax(BASE_URL + '/index_category')

// 3、根据经纬度获取商铺列表 (或者{longitude, latitude})
export const reqShopList = (longitude, latitude) =>
  ajax(BASE_URL + '/shops', { longitude, latitude })
// export const getShopList = (longi, lati) => ajax('/shops', {longitude: longi, latitude: lati})

// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) =>
  ajax(BASE_URL + '/search_shops', { geohash, keyword })

// 5、获取一次性验证码

// 6、用户名密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) =>
  ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')

// 7、发送短信验证码
export const reqSendCode = phone => ajax(BASE_URL + '/sendcode', { phone })

// 8、手机号验证码登陆
export const reqSmsLogin = ({ phone, code }) =>
  ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')

// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

// 10、用户登出
export const reqLoginOut = () => ajax(BASE_URL + '/logout')

/* ajax请求mockjs模拟数据 */
// export function reqShopInfo() {
//   ajax('/info')
// }
export const reqShopInfo = () => ajax('/info')

export const reqShopRatings = () => ajax('/ratings')

export const reqShopGoods = () => ajax('/goods')
