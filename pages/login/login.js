// pages/login/login.js
Page({
  handleGetUserInfo(e) {
    // 获取用户登陆的信息
    const {userInfo} = e.detail
    // 存储到缓存中
    wx.setStorageSync('userInfo', userInfo);
    // 返回上一页
    wx.navigateBack({
      delta: 1
    });
  }
})