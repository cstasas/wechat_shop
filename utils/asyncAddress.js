export const getSetting = () => {
  return new Promise((resolve, reject) => {
    // 获取用户授权状态
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    // 获取用户地址
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const openSetting = () => {
  return new Promise((resolve, reject) => {
    // 诱导用户打开权限
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    // 用户弹窗提示
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    // 消息提示框
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const login = () => {
  return new Promise((resolve, reject) => {
    // 消息提示框
    wx.login({
      timeout:10000,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    // 微信支付请求
    wx.requestPayment({
      ...pay,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });

  })
}