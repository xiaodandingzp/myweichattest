// pages/login/login.js
const app = getApp();

Page({
  data: {

  },

  // 微信登录
  wechatLogin: function() {
    const that = this;

    // 1. 获取用户授权
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: function(res) {
        // 获取用户信息成功
        const userInfo = res.userInfo;

        // 2. 调用wx.login获取code
        wx.login({
          success: function(loginRes) {
            if (loginRes.code) {
              // 登录成功，保存用户信息
              // 实际项目中这里应该将code发送到服务器换取openid
              app.saveUserInfo({
                ...userInfo,
                code: loginRes.code
              });

              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1500
              });

              // 3. 登录成功后跳转到点单页
              setTimeout(function() {
                wx.redirectTo({
                  url: '/pages/order/order'
                });
              }, 1500);
            } else {
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              });
            }
          },
          fail: function() {
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            });
          }
        });
      },
      fail: function() {
        // 用户拒绝授权
        wx.showToast({
          title: '需要授权才能登录',
          icon: 'none'
        });
      }
    });
  },

  // 返回首页
  goBack: function() {
    wx.navigateBack({
      delta: 1
    });
  }
});
