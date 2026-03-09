// pages/index/index.js
const app = getApp();

Page({
  data: {

  },

  onShow: function() {
    // 每次显示页面时检查登录状态
    app.checkLoginStatus();
  },

  // 点击去点单按钮
  goToOrder: function() {
    // 判断是否已登录
    if (!app.globalData.isLoggedIn) {
      // 未登录，跳转登录页
      wx.navigateTo({
        url: '/pages/login/login'
      });
    } else {
      // 已登录，跳转点单页
      wx.navigateTo({
        url: '/pages/order/order'
      });
    }
  }
});
