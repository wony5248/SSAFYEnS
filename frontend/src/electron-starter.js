const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createWindow () {
  // 브라우저 창을 생성합니다.
  const win = new BrowserWindow({
    width: 585,
    height: 325,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(startUrl);
}

app.whenReady().then(createWindow)

// 모든 윈도우가 닫히면 종료된다.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})