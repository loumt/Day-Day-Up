import { app, BrowserWindow,ipcMain} from 'electron'
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
    show: false,
    resizable: false,
    alwaysOnTop: true,
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

  mainWindow.on('ready-to-show',()=>{
    mainWindow.show()
  })

  electronShortCut.register(mainWindow, 'Esc', () => {
    mainWindow.close()
  });

  ipcMain.on('showErrorModel' , (e,message)=>{
    console.log(message)
  })
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
