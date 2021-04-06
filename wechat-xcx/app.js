
//app.js

App({
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        env: 'tengxunyun-6gfsiiipf3b35832',
        traceUser: true,
      })
    }
    this.overShare()
    this.globalData = {}
  },
  overShare: function () {
    //监听路由切换
    //间接实现全局设置分享内容
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1]
      if (view && view.__route__ != 'pages/detail/detail') {
        view.onShareAppMessage = function () {
          //你的分享配置
          return {
            title: '美团饿了么拼多多大额红包，每日可领！',
            path: '/pages/index/index',
            imageUrl : 'https://upload-images.jianshu.io/upload_images/302100-d28345a30e3c51c7.png',
            imageUrl : 'https://upload-images.jianshu.io/upload_images/302100-d28345a30e3c51c7.png',
          };
        }
      }
    })
  }
})
