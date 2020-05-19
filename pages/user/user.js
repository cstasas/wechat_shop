// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户登陆的数据
    userInfo: {},
    // 用户收藏的商品数量
    collectNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 拿到缓存中存放的用户数据
    const userInfo = wx.getStorageSync('userInfo');
    // 拿到用户商品收藏数据
    const collect = wx.getStorageSync('collect');
    // 放到data中
    this.setData({
      userInfo,
      collectNum: collect.length
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})