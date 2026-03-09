// app.js
App({
  onLaunch() {
    // 小程序启动时检查登录状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLoggedIn = true;
    } else {
      this.globalData.isLoggedIn = false;
    }
  },

  // 保存用户登录信息
  saveUserInfo(userInfo) {
    wx.setStorageSync('userInfo', userInfo);
    this.globalData.userInfo = userInfo;
    this.globalData.isLoggedIn = true;
  },

  // 退出登录
  logout() {
    wx.removeStorageSync('userInfo');
    this.globalData.userInfo = null;
    this.globalData.isLoggedIn = false;
  },

  // 全局数据
  globalData: {
    userInfo: null,
    isLoggedIn: false
  }
})
