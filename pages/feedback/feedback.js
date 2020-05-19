// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs头部分类
    Tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ],
    // 用户上传的图片地址数据
    chooseImages: [],
    // 文本域内容
    textValue: ''
  },
  // 外网图片的路径数组
  UploadFile: [],
  // tabs栏点击切换事件
  handleItemChange(e) {
    const {index} = e.detail
    const {Tabs} = this.data
    Tabs.forEach(v => v.id === index ? v.isActive = true : v.isActive = false)
    this.setData({Tabs})
  },
  // 点击按钮上传图片功能
  handleChooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          // 拼接数组
          chooseImages: [...this.data.chooseImages, ...result.tempFilePaths]
        })
      }
    });
  },
  // 点击删除上传的图片
  handleRemoveImg(e) {
    // 获取索引
    const {index} = e.currentTarget.dataset
    // 获取图片地址数据
    const {chooseImages} = this.data
    // 根据索引删除图片
    chooseImages.splice(index, 1)
    // 更新数据
    this.setData({chooseImages})
  },
  // 获取文本域输入内容
  handleInput(e) {
    // 获取用户输入的内容
    let {value} = e.detail
    this.setData({
      textValue: value
    })
  },
  // 提交表单事件
  handleFormSubmit() {
    // 获取数据
    const {textValue, chooseImages} = this.data
    if (!textValue.trim()) {
      // 不合法
      wx.showToast({
        title: '文本内容不合法',
        mask: true
      });
      return
    }
    // 等待提示
    wx.showLoading({
      title: '正在上传中',
      mask: true
    });
    // 判断如果只发送文本
    if (chooseImages.length !== 0) {
      // 文件只能单个上传,所以循环数组
      chooseImages.forEach((v,i) => {
        // 上传图片到服务器,返回图片外网链接
        wx.uploadFile({
          // 图片要上传的地址
          url: 'http://img.coolcr.cn/index/api.html',
          // 被上传的文件路径
          filePath: v,
          // 上传的文件名称,后台来获取 file
          name: 'image',
          // 顺带的文本信息
          formData: {},
          success: (result)=>{
            let url = JSON.parse(result.data.url)
            this.UploadFile.push(url)
            // 所有的图片上传完毕才出发
            if (i === chooseImages.length - 1) {
              wx.hideLoading();
              // 发送请求到后台
              console.log('发送请求到后台');
              // 成功之后重置界面
              this.setData({
                chooseImages: [],
                textValue: ''
              })
              // 返回上一层页面
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    } else {
      wx.hideLoading();
      // 发送后台请求
      console.log('只是提交了文本!');
      // 返回上一层页面
      wx.navigateBack({
        delta: 1
      });
    }
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