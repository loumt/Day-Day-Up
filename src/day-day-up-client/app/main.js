const {BrowserWindow, app, ipcMain} = require('electron');
const path = require('path')
const MainWindow = require('./windows/MainWindow');
const SettingWindow = require('./windows/SettingWindow');
const UpdateWindow = require('./windows/UpdateWindow');
const TrayWindow = require('./windows/TrayWindow');
const pck = require('./../package.json');
const Update = require('./tools/Update')

class Main {
    constructor() {
        this.mainWindow = null;
    }

    init() {
        this.initApp();
        this.initIPC();
        // this.initUpdateEvent();
    }

    initApp() {
        app.setAppUserModelId(pck.appId);//你应该在自己的应用中使用 app.setAppUserModelId API 方法设置相同的 API和ID，不然 Windows 将不能正确地把你的应用固定在任务栏上。

        app.on('open-file',()=>{
            console.log('open file.....')
        })

        app.on('ready', () => {
            this.createMainWindow();
            this.createSettingWindow();
            this.createUpdateWindow();
            this.createTrap();
        });
        app.on('activate', () => {
            if (this.mainWindow == null) {
                this.createMainWindow();
            } else {
                this.mainWindow.show();
            }
        });
    };

    initIPC() {
        this.initVersionIpc();
    }

    /**
     * 初始化version ipc
     */
    initVersionIpc() {
        ipcMain.on('current-version', (e) => {
            e.returnValue = Update.getCurrentVersion()
        })
        ipcMain.on('lastest-version', (e) => {
            Update.getLastestVersion().then((lastestVersion) => {
                e.returnValue = lastestVersion
            }).catch(e => {
                e.returnValue = '获取失败'
            })
        })
        ipcMain.on('version', (e) => {
            Update.getVersionInfo().then((versionInfo) => {
                console.dir(versionInfo)
                e.returnValue = versionInfo
            }).catch(e => {
                e.returnValue = '获取失败'
            })
        })
        ipcMain.on('update', (e) => {
            let update = Update.getInstance();
            update.on('out', (msg) => {
                console.log(msg);
            })
            update.on('error', (msg) => {
                console.log(msg);
            })
            update.on('success', (e) => {
                console.log('success');
            })
            //文件总数
            update.on('total', (total) => {
                console.log(`Total : ${total}`);
            })
            //文件下载完成时，向前台发送下载进度百分比
            update.on('end', () => {
                BrowserWindow.getFocusedWindow().webContents.send('update-progress', update.getUpdatePercent())
            })

            update.update();
        })
    }


    // initUpdateEvent(){
    //     Update.on('server-versions',(versions)=>{
    //         BrowserWindow.getFocusedWindow().webContents.send('server-versions',versions)
    //     })
    //     Update.on('error',(msg)=>{
    //         BrowserWindow.getFocusedWindow().webContents.send('error',msg)
    //     })
    //     Update.on('local-version',(lv)=>{
    //         BrowserWindow.getFocusedWindow().webContents.send('local-version',lv)
    //     })
    // }

    createMainWindow() {
        this.mainWindow = new MainWindow();
    }

    createSettingWindow() {
        this.settingWindow = new SettingWindow();
    }

    createUpdateWindow() {
        this.updateWindow = new UpdateWindow();
    }

    createTrap() {
        this.tray = new TrayWindow(this.mainWindow, this.settingWindow, this.updateWindow);
    }
}

new Main().init();