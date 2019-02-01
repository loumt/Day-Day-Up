import { app, BrowserWindow } from 'electron'
import electronShortCut from 'electron-localshortcut'
// import store from './../renderer/store'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 450,
    useContentSize: true,
    width: 300,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: false,
    maximizable: false,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
    app.exit(0)
  })


  electronShortCut.register(mainWindow, 'Esc', (p1,p2) => {
    mainWindow.close()
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  mainWindow.close()
  app.exit(0)
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})