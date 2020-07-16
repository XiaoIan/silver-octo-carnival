//app.js
App({
  onLaunch: function () {
    //注册云环境
    wx.cloud.init({
      env: 'spacel',
      traceUser: true,
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //获取设备信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.systemInfo.windowHeight = e.screenHeight;
        this.globalData.systemInfo.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.systemInfo.Custom = capsule;
          this.globalData.systemInfo.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.systemInfo.CustomBar = e.statusBarHeight + 50;
        }
        //获取内容页面高度(适用于自定义导航栏)
        this.globalData.systemInfo.bobyTop = this.globalData.systemInfo.windowHeight - this.globalData.systemInfo.StatusBar - this.globalData.systemInfo.CustomBar
        this.globalData.systemInfo.brand = e.brand
        this.globalData.systemInfo.model = e.model
        this.globalData.systemInfo.language = e.language
        this.globalData.systemInfo.safeArea = e.safeArea
      }
    })

    // 获取用户登陆凭证
    wx.login({
      success: res => {
          this.globalData.userInfo.openid = res.code
      }
    })
  },

  userInfo:function(){
    console.log("22")
    var that = this;
    return new Promise(function(resolve, reject) {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success(res) {
                  console.log('33')
                  that.globalData.userInfo.name = res.userInfo.nickName
                  that.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                  that.globalData.userInfo.area = res.userInfo.city
                  that.globalData.finshed = true
                  resolve(that.globalData.userInfo)
                },
                fail: function () {
                  wx.redirectTo({
                    url: 'pages/index/index',
                  })
                }
              })
            }
          }
        })
      }
    )
  },



  //全局参数 建议进入缓存，在pages中使用前判断取值if(!e){function}
  globalData:{
    userInfo:{
      openid:'',
      name:'',
      avatarUrl:'./user-unlogin.png',
      sex:'',
      birthDate:'',
      phone:'',
      mail:'',
      password:'',
      area:'',
      profile:''
    },
    systemInfo:{
      brand:'', //品牌
      model:'', //型号
      language:'zh_CN',
      windowHeight:724,
      StatusBar:20,
      CustomBar: 60,
      //胶囊栏
      Custom:{
        bottom: 56,
        height: 32,
        left: 223,
        right: 310,
        top: 24,
        width: 87,
      },
      //内容页面top
      bobyTop:80,
      //安全区域
      safeArea:{
        bottom: 568,
        height: 548,
        left: 0,
        right: 320,
        top: 20,
        width: 320,
      },
    },
    //user信息获取标志
    finshed:false
  }
})
