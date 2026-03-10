// pages/mine/mine.js
const app = getApp();

Page({
  data: {
    username: app.globalData.userInfo ? app.globalData.userInfo.username : '',
    isLoggedIn: app.globalData.isLoggedIn,
  },

  onShow: function () {
    this.setData({
      username: app.globalData.userInfo ? app.globalData.userInfo.username : '',
      isLoggedIn: app.globalData.isLoggedIn,
    });
  },
});
