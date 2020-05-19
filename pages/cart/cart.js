// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncAddress.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户的收货地址
    address: {},
    // 购物车数据
    cart: [],
    // 全选按钮
    allChecked: false,
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
    this.getAllGoods(cart)
    this.setData({address})
  },

  // 点击添加收货地址
  async handleChooseAddress() {
    // console.log('点我');
    // 获取用户对小程序所授权地址的状态 authSetting scope.address
    // wx.getSetting({
    //   success: (result)=>{
    //     // console.log(result)
    //     // 获取权限状态
    //     // 发现一些属性名很怪异的,就用[]里面放字符串来获取属性值
    //     const scope = result.authSetting['scope.address']
    //     // console.log(scope);
    //     if (scope === true || scope === undefined) {
    //       // 可以获取地址了
    //       wx.chooseAddress({
    //         success: (result1)=>{
    //           console.log(result1)
    //         }
    //       });
    //     } else {
    //       // 用户以前拒绝过权限,先诱导用户打开授权页面
    //       wx.openSetting({
    //         success: (result2)=>{
    //           // 可以获取地址了
    //           wx.chooseAddress({
    //             success: (result3)=>{
    //               console.log(result3)
    //             }
    //           });
    //         }
    //       });
    //     }
    //   }
    // });

    // 代码封装简化改造
    try {
      // 1.获取权限状态
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting['scope.address']
      // 2.可以获取地址了
      if (scopeAddress === false) {
        await openSetting()
      }
      // 4. 调用收货地址的API
      const address = await chooseAddress()
      // 添加一个完整的收货地址,放到对象中
      address.all = address.provinceName + address.cityName + address.countyName +  address.detailInfo
      // console.log(res2);
      // 4. 存入到缓存当中
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  },

  // 商品的选中事件
  handleItemChange(e) {
    // 获取要修改的商品ID
    const goods_id = e.currentTarget.dataset.id
    // console.log(goods_id);
    // 获取购物车数据
    let {cart} = this.data
    // 根据商品ID查找索引
    const index = cart.findIndex(v => v.goods_id === goods_id)
    // 根据索引修改数组中的checked
    cart[index].checked = !cart[index].checked
    // 重新加载全选合总商品数量总价格
    this.getAllGoods(cart)
  },
  // 封装获取全选和总商品数量总价格
  getAllGoods(cart) {
    // 通过数组every方法判断是否选中
    // let allChecked = cart.length !== 0 ? cart.every(v => v.checked) : false
    let allChecked = true
    // 如果全部选中状态计算商品数量跟价格
    let totalNum = 0
    let totalPrice = 0
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num 
        totalPrice += v.goods_price * v.num
      } else {
        allChecked = false
      }
    })
    // 判断下数组为空的选中状态
    allChecked = cart.length !== 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    // 重新赋给data和缓存中的数据
    wx.setStorageSync('cart', cart);
  },

  // 商品全选反选
  handleAllChange() {
    // 获取购物车的数据
    let {cart, allChecked} = this.data
    // 取反
    allChecked = !allChecked
    // 循环数组让按钮状态 = 全选的状态
    cart.forEach(v => v.checked = allChecked)
    // 重新加载全选和商品数量跟价格
    this.getAllGoods(cart)
  },

  // 商品数量的增加与减少
  async handleNumEdit(e) {
    // 接收传递过来的数据
    const {id, opraction} = e.currentTarget.dataset
    // 获取购物车数据
    let {cart} = this.data
    // 查找商品索引
    const index = cart.findIndex(v => v.goods_id === id)
    // 判断当前商品数量为1以后再点减号就提示删除
    if (cart[index].num === 1 && opraction === -1) {
      // 弹窗提示
      const res = await showModal({content:'你确定要删除当前商品吗?'})
      if (res.confirm) {
        cart.splice(index, 1)
        // 重新加载全选和商品数量跟价格
        this.getAllGoods(cart)
      }
    } else {
      // 根据opraction的值判断是增加还是减少
      cart[index].num += opraction
      // 重新加载全选和商品数量跟价格
      this.getAllGoods(cart)
    }
  },
  // 结算按钮点击事件
  async handlePay() {
    // 拿到数据
    let {address, totalNum} = this.data
    // 判断有没有填写地址
    if (!address.userName) {
      return await showToast({title: '请填写你的收获地址'})
    }
    // 判断购物车有没有商品
    if (totalNum === 0) {
      return await showToast({title: '请先在购物车中添加商品'})
    }
    // 上面两个条件都符合的话,执行下一步操作
    wx.navigateTo({
      url: '../pay/pay'
    })
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