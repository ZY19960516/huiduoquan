// import http from '../../utils/http'

//获取应用实例
// const app = getApp()

Page({
  data: {
    url: ''
  },
  onLoad (options) {
    const url = decodeURIComponent(options.url)
    const title = options.title
    console.log(url,'url=========');
    this.setData({ url })
    wx.setNavigationBarTitle({ title })
  }
})