//index.js
//获取应用实例
const app = getApp()

//Page Object
Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数据
    navigatorList: [],
    // 楼层数据
    floorList: []
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList()
    this.getNavigtorList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    wx:wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.log(result);
        this.setData({
          swiperList: result.data.message
        })
      },
    })
  },
  // 获取分类导航数据
  getNavigtorList() {
    wx:wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      success: (result) => {
        // console.log(result);
        this.setData({
          navigatorList: result.data.message
        })
      },
    })
  },
  // 获取楼层数据
  getFloorList() {
    wx:wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      success: (result) => {
        // console.log(result);
        this.setData({
          floorList: result.data.message
        })
      },
    })
  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});