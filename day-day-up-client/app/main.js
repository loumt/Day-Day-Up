const {BrowserWindow, app, ipcMain, dialog, autoUpdater,Notification} = require('electron');
const path = require('path')
const MainWindow = require('./windows/MainWindow');
const pck = require('./../package.json');

class Main {
    constructor() {
        this.mainWindow = null;
        this.message = {
            error: '检查更新出错',
            checking: '正在检查更新……',
            updateAva: '下载更新成功',
            updateNotAva: '现在使用的就是最新版本，不用更新',
            downloaded: '最新版本已下载，将在重启程序后更新'
        };
    }

    init() {
        this.initApp();
        this.initIPC();
        this.startupEventHandle();
    }

    initApp() {
        app.setAppUserModelId(pck.appId);//你应该在自己的应用中使用 app.setAppUserModelId API 方法设置相同的 API和ID，不然 Windows 将不能正确地把你的应用固定在任务栏上。
        app.on('ready', () => {
            this.createMainWindow();
            this.initUpdates();
        });
        app.on('activate', () => {
            if (this.mainWindow == null) {
                this.createMainWindow();
            } else {
                this.mainWindow.show();
            }
        });
    };

    initIPC(){
        ipcMain.on('send-notification',(e,msg)=>{
            console.log('send notification');
            let notification = new Notification({
                title:'Title',
                body:'This is a notification!',
            })
            notification.show();
        })
    }

    createMainWindow() {
        this.mainWindow = new MainWindow();
    }

    startupEventHandle() {
        if (require('electron-squirrel-startup')) {
            console.log('electron-squirrel-startup....');
            return;
        }

        var handleStartupEvent = function () {
            if (process.platform !== 'win32') {
                console.log('Not a win env!!!');
                return false;
            }
            var squirrelCommand = process.argv[1];
            switch (squirrelCommand) {
                case '--squirrel-install':
                case '--squirrel-updated':
                    install();
                    return true;
                case '--squirrel-uninstall':
                    uninstall();
                    app.quit();
                    return true;
                case '--squirrel-obsolete':
                    app.quit();
                    return true;
            }

            // 安装
            function install() {
                var cp = require('child_process');
                var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
                var target = path.basename(process.execPath);
                var child = cp.spawn(updateDotExe, ["--createShortcut", target], {detached: true});
                child.on('close', function (code) {
                    app.quit();
                });
            }

            // 卸载
            function uninstall() {
                var cp = require('child_process');
                var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
                var target = path.basename(process.execPath);
                var child = cp.spawn(updateDotExe, ["--removeShortcut", target], {detached: true});
                child.on('close', function (code) {
                    app.quit();
                });
            }
        };
        if (handleStartupEvent()) {
            return;
        }
    }

    initUpdates() {
        let message = {
            error: '检查更新出错',
            checking: '正在检查更新……',
            updateAva: '检测到新版本，正在下载……',
            updateNotAva: '现在使用的就是最新版本，不用更新',
        };
        const server = 'server';
        const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
        autoUpdater.setFeedURL(feed);

        autoUpdater.on('error', function (error) {
            this.sendUpdateMessage(message.error)
        });
        autoUpdater.on('checking-for-update', function () {
            this.sendUpdateMessage(message.checking)
        });
        autoUpdater.on('update-available', function (info) {
            this.sendUpdateMessage(message.updateAva)
        });
        autoUpdater.on('update-not-available', function (info) {
            this.sendUpdateMessage(message.updateNotAva)
        });
        // 更新下载进度事件
        autoUpdater.on('download-progress', function (progressObj) {
            this.sendUpdateMessage('downloadProgress', progressObj)
        })
        autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
            ipcMain.on('isUpdateNow', (e, arg) => {
                console.log(arguments);
                console.log("开始更新");
                //some code here to handle event
                autoUpdater.quitAndInstall();
            });
            this.sendUpdateMessage('isUpdateNow')
        });
        ipcMain.on("checkForUpdate", () => {
            //执行自动更新检查
            autoUpdater.checkForUpdates();
        })
    }
    sendUpdateMessage(text) {
        BrowserWindow.getFocusedWebContents().send('message', text)
    }
}

new Main().init();