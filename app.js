// 全局常量 - 服务器地址
const BASE_URL = 'http://8.163.25.65:5000';

// app.js
App({
  onLaunch() {
    // 小程序启动时检查登录状态
    this.checkLoginAndFetchUserInfo();
  },

  // 检查登录状态并获取用户信息
  checkLoginAndFetchUserInfo: function () {
    const token = wx.getStorageSync('token');

    if (!token) {
      // 没有token，显示未登录
      this.globalData.userInfo = null;
      return;
    }

    // 有token，请求用户信息
    this.fetchUserInfo(token);
  },

  // 检查登录状态（供其他页面调用）
  checkLoginStatus: function () {
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.token = token;
    } else {
      this.globalData.token = null;
      this.globalData.isLoggedIn = false;
    }
  },

  // 请求用户信息
  fetchUserInfo: function (token) {
    const that = this;
    wx.request({
      url: BASE_URL + '/userinfo',
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: function (res) {
        let username = '';

        console.log('zpppppppppppp getUserInfo:', res.data);
        // 解析返回的JSON字符串
        if (res.data) {
          const userInfo = res.data;
          if (userInfo.username) {
            username = userInfo.username;
            that.globalData.token = token;
            that.globalData.isLoggedIn = true;
            that.globalData.userInfo = { username: username };
          } else {
            that.globalData.isLoggedIn = false;
            that.globalData.userInfo = null;
          }
        }
      },
      fail: function (err) {
        console.log('zpppppppppppp getUserInfo error:', err);
        that.globalData.isLoggedIn = false;
        that.globalData.userInfo = null;
      }
    });
  },

  // 保存token
  saveToken(token) {
    wx.setStorageSync('token', token);
    this.globalData.token = token;
    this.globalData.isLoggedIn = true;
  },

  // 保存用户信息
  saveUserInfo(userInfo) {
    // wx.setStorageSync('userInfo', userInfo);
    this.globalData.userInfo = userInfo;
  },

  // 退出登录
  logout() {
    wx.removeStorageSync('token');
    wx.removeStorageSync('userInfo');
    this.globalData.token = null;
    this.globalData.userInfo = null;
    this.globalData.isLoggedIn = false;
  },

  // 全局数据
  globalData: {
    baseUrl: BASE_URL,
    token: null,
    userInfo: null,
    isLoggedIn: false
  }
})
