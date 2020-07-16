//index.js
const app = getApp()

Page({
  data: {
    user:[],
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function(options) {
    if (app.globalData.finshed) {
      this.setData({
        user:app.globalData.userinfo
      })
    }else{
      this.login()
    }
  },

  onGetUserInfo: function(e) {
      this.login()
  },

  login:function(){
    var that = this
      app.userInfo().then((res) => {
        console.log('11')
        that.setData({
          user:res
        })
    });
  }

})
