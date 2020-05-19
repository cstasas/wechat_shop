// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from '../../utils/asyncAddress.js'
import { request } from '../../request/promise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户的收货地址
    address: {},
    // 购物车数据
    cart: [],
    // 总商品数量
    totalNum: 0,
    // 总商品价格
    totalPrice: 0
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
    // 从缓存中拿到收货地址数据
    const address = wx.getStorageSync('address');
    // 从缓存中拿到购物车的商品数据
    let cart = wx.getStorageSync('cart') || [];
    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked)
    // 如果全部选中状态计算商品数量跟价格
    let totalNum = 0
    let totalPrice = 0
    cart.forEach(v => {
        totalNum += v.num 
        totalPrice += v.goods_price * v.num
    })
    this.setData({
      cart,
      address,
      totalNum,
      totalPrice
    })
  },
  // 点击按钮,发起支付请求
  async handlePay() {
    try {
      // 获取用户的token值
      const token = wx.getStorageSync('token');
      // 判断是否有token值
      if (!token) {
        // 如果没有,则诱导用户去获取授权
        wx.navigateTo({
          url: '../order/order'
        });
        return
      }
      // 准备创建订单
      // 需要发送的请求头参数
      // const header = {Authorization: token}
      // 需要发送的请求体参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.address.all
      let goods = []
      // 获取购物车数据
      const {cart} = this.data
      cart.forEach(v => goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        }))
      // 设置发送请求对象
      const paramsObj = {order_price, consignee_addr, goods}
      // 发送创建订单的请求
      const {order_number} = await request({url: '/my/orders/create', data: paramsObj, method: 'post'})
      // 获取支付参数
      const {pay} = await request({url: '/my/orders/req_unifiedorder', data: order_number, method: 'post'})
      // 发起微信支付请求
      await requestPayment(pay)
      // 查看订单状态
      const res = await request({url: '/my/orders/chkOrder', data: order_number, method: 'post'})
      // 弹窗成功提示
      await showToast({title: '支付成功'})
      // 移除购物车已经支付的数据,因为上面的cart是已经过滤后选中的,所以从缓存中拿到完整的
      let newCart = wx.getStorageSync('cart');
      newCart = newCart.filter(v => !v.checked)
      wx.setStorageSync('cart', newCart);
      // 支付成功之后跳转到订单界面
      wx.navigateTo({
        url: '../order/order'
      });
    } catch (error) {
      // 弹窗失败提示
      await showToast({title: '支付失败'})
      console.log(error);
    }
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