// pages/order_01/order.js
import { request } from '../../request/promise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  // 全部订单数据
  orders: [], 
  // tabs头部分类
  Tabs: [
    {
      id: 0,
      value: '全部',
      isActive: true
    },
    {
      id: 1,
      value: '待付款',
      isActive: false
    },
    {
      id: 2,
      value: '待发货',
      isActive: false
    },
    {
      id: 3,
      value: '退款/退货',
      isActive: false
    }
  ]
  },
  // tabs栏点击切换事件
  handleItemChange(e) {
    const {index} = e.detail
    this.getTabsToggle(index)
    // 切换的时候要重新发送请求得到对应的数据
    this.getOrders(index + 1)
  },
  // 封装点击切换函数
  getTabsToggle(index) {
    const {Tabs} = this.data
    Tabs.forEach(v => v.id === index ? v.isActive = true : v.isActive = false)
    this.setData({Tabs})
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
    // 获取页面栈
    const page = getCurrentPages();
    // 拿到type值
    const {type} = page[page.length - 1].options
    // 发送请求之前先判断下缓存中有没有token值
    // 没有企业账号,测试不了
    // const token = wx.getStorageSync('token');
    // if (!token) {
    //   wx.navigateTo({
    //     // 跳转到授权页面
    //     url: '../order/order'
    //   });
    // }
    // 对应的tab栏
    this.getTabsToggle(type - 1)
    // 开始发送请求
    this.getOrders(type)
  },

  // 获取历史订单的请求
  async getOrders(type) {
    const {orders} = await request({url: '/my/orders/all', data: {type}})
    this.setData({
      // create_time": 1564731518 时间的处理方法
      orders: orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleDateString())}))
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