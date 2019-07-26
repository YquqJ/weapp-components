//app.js

const _systemInfo = wx.getSystemInfoSync()
const _barHeight = _systemInfo.statusBarHeight
const _screenHeight = _systemInfo.screenHeight
const _ratio = _systemInfo.screenWidth / 750

App({

  onLaunch: function() {
    // this.getTheme()
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log('小程序自动更新最新版本' + res.hasUpdate);
    })
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
    })
  },

  globalData: {
    theme: 0, //主题编号
    _ratio, //屏幕比率
    barHeight: _barHeight, //顶上状态栏高度
    totalHeight: 90 * _ratio + _barHeight, //navbar及状态栏所占高度
    pageHeight: _screenHeight - 90 * _ratio - _barHeight, //屏幕高度-navbar所占高度
  },
})