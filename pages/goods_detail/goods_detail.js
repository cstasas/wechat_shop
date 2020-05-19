// pages/goods_detail/goods_detail.js
import { request } from '../../request/promise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据
    goodsObj: {},
    // 商品是否被收藏
    isCollect: false
  },
  // 商品全部数据
  Goods: {},
  // 商品收藏功能
  // 1. 页面onshow的时候,加载缓存中商品收藏的数组
  // 2. 判断当前商品是不是被收藏 如果被收藏改变图标,否则无
  // 3. 点击商品收藏按钮 判断缓存有没有该商品 如果有就删除,没有就添加到缓存中
  onShow: function () {
    let Pages = getCurrentPages();
    let {options} = Pages[Pages.length - 1]
    // console.log(options);
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    // console.log(id);
    const { data: res } = await request({url: '/goods/detail', data: {goods_id}})
    // console.log(res);
    this.Goods = res.message
    // 获取缓存中商品收藏的数组
    const collect = wx.getStorageSync('collect') || [];
    // 判断商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.Goods.goods_id)
    this.setData({
      goodsObj: {
        pics:res.message.pics,
        goods_price:res.message.goods_price,
        goods_name:res.message.goods_name,
        // iphone手机部分不支持webp格式,用正则匹配下
        goods_introduce:res.message.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollect
    })
  },

  // 点击图片放大功能
  handlePreviewImage(e) {
    // console.log(e);
    const urls = this.Goods.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    // console.log(current);
    wx.previewImage({
      current,
      urls
    });
  },

  // 添加购物车功能
  handleCartsAdd() {
    // 获取购物车的缓存数据,为数组格式
    let cart = wx.getStorageSync('cart') || []
    // 判断当前的商品是否已经存在缓存中
    let index = cart.findIndex(v => v.goods_id === this.Goods.goods_id)
    // 已经存在,修改商品数据
    if (index === -1) {
      // 说明不存在,等于第一次添加
      this.Goods.num = 1
      // 默认商品为选中状态
      this.Goods.checked = true
      cart.push(this.Goods)
    } else {
      // 如果已经存在 就++
      cart[index].num++
    }
    // 把购物车重新添加到缓存中
    wx.setStorageSync('cart', cart)
    // 弹出提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防止用户手抖,频繁点击
      mask: true
    });
  },

  // 商品收藏功能
  handleCollect() {
    let isCollect = false
    // 获取缓存商品收藏数组
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.Goods.goods_id)
    if (index !== -1) {
      // 说明商品在缓存里面
      collect.splice(index, 1)
      isCollect = false
      // 弹窗提示
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true
      });
    } else {
      collect.push(this.Goods)
      isCollect = true
      // 弹窗提示
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 把isCollect更新到Data中
    this.setData({isCollect})
    // 再把数据添加到缓存中
    wx.setStorageSync('collect', collect);
  }
})