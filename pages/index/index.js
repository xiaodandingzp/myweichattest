// pages/index/index.js
const app = getApp();

Page({
  data: {

  },

  onShow: function () {
  },

  // 点击去点单按钮
  goToOrder: function () {
    // 判断是否已登录
    console.log('zpppppppppppppp isLoggedIn:', app.globalData.isLoggedIn);
    if (app.globalData.isLoggedIn) {
      console.log('已登录，跳转到点单页面');
      wx.navigateTo({
        url: '/pages/order/order'
      });
      return
    }
    const token = wx.getStorageSync('token');

    if (!token) {
      // 没有token，调用登录接口
      this.doLogin();
      return;
    }

    // 有token，验证用户信息
    this.verifyLogin(token);
  },

  // 验证登录状态（与我的页面逻辑一致）
  verifyLogin: function (token) {
    const that = this;
    wx.request({
      url: 'http://8.163.25.65:5000/userinfo',
      method: 'GET',
      header: {
        'Authorization': token
      },
      success: function (res) {
        console.log('zppppppppp verifyLogin res:', res)
        if (res.data && res.data.username) {
          // 用户信息有效，已登录
          app.globalData.isLoggedIn = true;
          app.globalData.userInfo = { username: res.data.username };

          // 跳转点单页
          wx.navigateTo({
            url: '/pages/order/order'
          });
        } else {
          // 用户信息无效，调用登录接口
          that.doLogin();
        }
      },
      fail: function (err) {
        // 请求失败，调用登录接口
        that.doLogin();
      }
    });
  },

  // 执行登录
  doLogin: function () {
    const that = this;
    const appid = 'wxac11632839fbd162';

    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          wx.request({
            url: 'http://8.163.25.65:5000/login',
            method: 'POST',
            timeout: 5000,
            data: {
              code: loginRes.code,
              appid: appid
            },
            success: function (res) {
              if (res.data.token) {
                // 登录成功，保存token和用户信息
                app.saveToken(res.data.token);
                app.saveUserInfo({ username: res.data.username });

                // 跳转点单页
                wx.navigateTo({
                  url: '/pages/order/order'
                });
              } else if (res.data.error) {
                // 登录失败，显示错误信息
                wx.showToast({
                  title: res.data.error,
                  icon: 'none'
                });
              }
            },
            fail: function (err) {
              wx.showToast({
                title: '接口访问超时',
                icon: 'none'
              });
            }
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  }
});
