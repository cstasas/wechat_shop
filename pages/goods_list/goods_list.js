// pages/goods_list/goods_list.js
import { request } from '../../request/promise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs头部分类
    Tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    // 商品列表数据
    goodsList: []
  },
  // 接口需要发送请求的参数
  queryInfo: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 页面总页数
  goodsPageNum: 1,

  // 获取商品列表数据
  async getGoodsList() {
    const {data: res} = await request({url: '/goods/search', data: this.queryInfo})
    // console.log(res);
    const total = res.message.total
    // console.log(total);
    // Math.ceil 向上取整
    this.goodsPageNum = Math.ceil(total / this.queryInfo.pagesize)
    // console.log(this.goodsPageNum);
    this.setData({
      goodsList: [...this.data.goodsList, ...res.message.goods]
    })

    // 停止当前页面下拉刷新动作
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.queryInfo.cid = options.cid || ''
    this.queryInfo.query = options.query || ''
    this.getGoodsList()
  },
  // 鼠标点击tab栏切换事件
  handleItemChange(e) {
    // console.log(e);
    const {index} = e.detail
    // console.log(index);
    let {Tabs} = this.data
    Tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      Tabs
    })
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
    // 清空数组列表
    this.setData({
      goodsList: []
    })
    // 页码初始化为1
    this.queryInfo.pagenum = 1
    // 重新发送请求
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('页面触底了');
    if (this.queryInfo.pagenum >= this.goodsPageNum) {
      // console.log('当前已经没有下一页了');
      wx.showToast({title: '没有下一页数据'});
    } else {
      this.queryInfo.pagenum++
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})