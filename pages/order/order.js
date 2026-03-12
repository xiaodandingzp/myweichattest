// pages/order/order.js
const app = getApp();

Page({
  data: {
    products: [], // 商品列表
    totalPrice: 0, // 总价
    cartVisible: false // 购物车半窗是否显示
  },

  onLoad: function (options) {
    this.fetchProducts();
  },

  // 获取商品数据
  fetchProducts: function () {
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + '/products',
      method: 'GET',
      success: function (res) {
        if (res.data) {
          // 为每个商品添加count属性
          const products = res.data.map(item => ({
            ...item,
            count: 0
          }));
          that.setData({
            products: products
          });
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '获取商品失败： ' + err.errMsg,
          icon: 'none'
        });
        console.error(err);
      }
    });
  },

  // 增加商品数量
  addCount: function (e) {
    const index = e.currentTarget.dataset.index;
    const products = this.data.products;
    products[index].count += 1;
    this.setData({
      products: products
    });
    this.calculateTotalPrice();
  },

  // 减少商品数量
  minusCount: function (e) {
    const index = e.currentTarget.dataset.index;
    const products = this.data.products;
    if (products[index].count > 0) {
      products[index].count -= 1;
      this.setData({
        products: products
      });
      this.calculateTotalPrice();
    }
  },

  // 计算总价
  calculateTotalPrice: function () {
    const products = this.data.products;
    let total = 0;
    products.forEach(item => {
      total += item.price * item.count;
    });
    this.setData({
      totalPrice: total
    });
  },

  // 点击购物车，显示半窗
  toggleCart: function () {
    this.setData({
      cartVisible: !this.data.cartVisible
    });
  },

  // 购物车中增加数量
  cartAddCount: function (e) {
    const index = e.currentTarget.dataset.index;
    const products = this.data.products;
    products[index].count += 1;
    this.setData({
      products: products
    });
    this.calculateTotalPrice();
  },

  // 购物车中减少数量
  cartMinusCount: function (e) {
    const index = e.currentTarget.dataset.index;
    const products = this.data.products;
    if (products[index].count > 0) {
      products[index].count -= 1;
      this.setData({
        products: products
      });
      this.calculateTotalPrice();
    }
  },

  // 去结算
  goToSettle: function () {
    wx.showToast({
      title: '去结算待实现',
      icon: 'none'
    });
  }
});
