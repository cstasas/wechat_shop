// pages/search/search.js
import { request } from "../../request/promise.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品搜索的数据
    goods: [],
    // 用户输入的数据
    value: '',
    // 取消按钮隐藏显示
    isFocus: false
  },
  // 防抖动定时器
  timeID: -1,
  // 用户输入文本框触发事件
  handleInput(e) {
    // 获取用户输入的文本值
    const {value} = e.detail
    // 判断合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        value: '',
        isFocus: false
      })
      // 不合法
      return
    }
    // 合法之后让取消按钮显示
    this.setData({
      isFocus: true
    })
    // 清除定时器
    clearTimeout(this.timeID)
    // 防止抖动
    this.timeID = setTimeout(() => {
      // 发送请求,获取数据
      this.qsearch(value)
    }, 1000)
  },
  // 获取商品搜索请求数据
  async qsearch(query) {
    const res = await request({url: '/goods/qsearch', data: {query}})
    this.setData({
      goods: res.data.message
    })
  },
  // 点击取消按钮触发的事件
  handleButton() {
    this.setData({
      goods: [],
      value: '',
      isFocus: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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