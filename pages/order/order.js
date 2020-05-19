import { login } from '../../utils/asyncAddress.js'
import { request } from '../../request/promise.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 获取token需要发送的数据
      const {encryptedData, rawData, iv, signature} = e.detail
      // 获取登录凭证
      const {code} = await login()
      // 设置发送参数的对象
      const paramsObj = {encryptedData, rawData, iv, signature, code}
      // 发送获取token的请求
      const {token} = await request({url: '/users/wxlogin', data: paramsObj, method: 'post'})
      // 把token存入到缓存中
      wx.setStorageSync('token', token);
      // 跳转到上一页
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})