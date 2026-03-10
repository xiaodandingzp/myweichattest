// pages/login/login.js
const app = getApp();

Page({
  data: {

  },

  // 微信登录
  wechatLogin: function () {
    const that = this;
    const appid = 'wxac11632839fbd162';

    // 调用wx.login获取code
    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          // 调用登录接口
          wx.request({
            url: 'http://8.163.25.65:5000/login',
            method: 'POST',
            timeout: 5000,
            data: {
              code: loginRes.code,
              appid: appid
            },
            success: function (res) {
              console.log(`zpppppppp login res: ${res.data}`);
              if (res.data.token) {
                // 登录成功，保存token和用户信息
                app.saveToken(res.data.token);
                app.saveUserInfo({ username: res.data.username });

                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1500
                });

                // 登录成功后跳转到点单页
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/order/order'
                  });
                }, 1500);
              } else if (res.data.error) {
                // 登录失败，显示错误信息
                wx.showToast({
                  title: res.data.error,
                  icon: 'none'
                });
              }
            },
            fail: function (err) {
              console.log(`zpppppppp login error: ${err}`);
              wx.showToast({
                title: '接口访问超时',
                icon: 'none'
              });
            }
          });
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
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
  },

  // 返回首页
  goBack: function () {
    wx.navigateBack({
      delta: 1
    });
  }
});
