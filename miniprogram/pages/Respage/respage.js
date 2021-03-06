// pages/Respage/respage.js
const app = getApp();
Page({

  data: {
    res_id: '',//所跳转的餐厅id=全局变量的dishID
    res_info:{},
    res_dishes: []
  },

  onLoad: function (options) {
    this.res_id = app.globalData.resID.toString();
    console.log(this.res_id);
    this.getBasicInfo();
    this.getAllDishes();
  },

  onShow: function () {

  },

  getAllDishes: function () {
    //从dishes表中查找出属于该餐厅的所有商品
    let that = this;
    const db = wx.cloud.database()
    db.collection('dishes')
      .where({
        own_of_res_id: that.res_id,
      })
      .get()
      .then(res => {
        that.setData({
          res_dishes: res.data
        })
      })
  },
  getBasicInfo: function () {
    //从restaurants表中获取该餐厅的基本信息
    let that=this;
    const db = wx.cloud.database()
    db.collection('restaurants')
      .where({
        _id: that.res_id, 
      })
      .get()
      .then(res => {
        that.setData({
          res_info: res.data[0]
        })
  })
  },// end getBasicInfo
  clickDish: function (e) {
    //从餐厅页面选择的菜品的id赋值给全局变量，并跳转至菜品页面
    app.globalData.dishID=e.currentTarget.dataset.link_id;
    console.log('clickDish id', app.globalData.dishID);
  }

})