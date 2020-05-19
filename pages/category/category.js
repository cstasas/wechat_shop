// pages/category/category.js
import { request } from '../../request/promise.js'
// 引入runtime.js
// const regeneratorRuntime = require('../../utils/runtime.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧列表数据
    leftCateList: [],
    // 右侧列表数据
    rightCateList: [],
    // 菜单被选中的索引
    currentIndex: 0,
    // 右侧滚动条位置
    scrollTop: 0
  },

  // 商品列表全部数据
  cateList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储中的数据
    const cates = wx.getStorageSync("cates")

    // 判断如果不存在重新加载,如果存在并且数据没有过期那么使用旧数据
    if (!cates) {
      this.getCateList()
    } else {
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCateList()
      } else {
        // console.log(cates);
        this.cateList = cates.data
        let leftCateList = this.cateList.map(v => v.cat_name)
        let rightCateList = this.cateList[0].children
        this.setData({
          leftCateList,
          rightCateList
        })
      }
    }
  },

  // 获取商品分类数据
  async getCateList() {
    // request({url: '/categories'}).then((result) => {
    //   // console.log(result);
    //   this.cateList = result.data.message

    //   // 把接受的数据存储到本地中
    //   wx.setStorageSync("cates", {time: Date.now(), data: this.cateList})

    //   // console.log(this.cateList);
    //   let leftCateList = this.cateList.map(v => v.cat_name)
    //   let rightCateList = this.cateList[0].children
    //   this.setData({
    //     leftCateList,
    //     rightCateList
    //   })
    // })
    const res = await request({url: '/categories'})
    // console.log(res);
    this.cateList = res.data.message

    // 把接受的数据存储到本地中
    wx.setStorageSync("cates", {time: Date.now(), data: this.cateList})

    // console.log(this.cateList);
    let leftCateList = this.cateList.map(v => v.cat_name)
    let rightCateList = this.cateList[0].children
    this.setData({
      leftCateList,
      rightCateList
    })
  },

  // 左侧菜单点击事件
  handleMenu(e) {
    // console.log(e);
    const {index} = e.currentTarget.dataset
    let rightCateList = this.cateList[index].children
    this.setData({
      currentIndex: index,
      rightCateList,
      scrollTop: 0
    })
  }
})