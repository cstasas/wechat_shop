export const request =  (params) => {
  // 定义一个发送请求的变量
  let ajaxTime = 0
  return new Promise((resolve, reject) => {
    // 封装请求头,并判断
    let header = {...params.header}
    if (params.url.includes('/my/')) {
      // 拼接header 带上token
      header['Authorization'] = wx.getStorageSync('token');
    }

    ajaxTime++
    // 显示数据加载提示框
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    
    const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...params,
      header: header,
      url: baseURL + params.url,
      success: (result) => {
        resolve(result)
      },
      fali: (err) => {
        reject(err)
      },
      complete:() => {
        ajaxTime--
        if (ajaxTime === 0) {
          // 隐藏加载中显示
          wx.hideLoading()
        }
      }
    })
  })
}