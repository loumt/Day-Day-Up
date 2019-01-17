/**
 * CreateBy loumt@sanlogic.com.
 */
'use strict'
const path =require('path')
const fs =require('fs')
const {Menu, Tray,nativeImage} = require('electron');
const version = require('./../../version.json').currentVersion;


class TrapClient {
    constructor(mainWindow, settingWindow,updateWindow) {
        this.mainWindow = mainWindow;
        this.settingWindow = settingWindow;
        this.updateWindow = updateWindow;
        this.createTray();
    }

    buildMenuTemplate(){
        let menus = [];

        menus.push({
            label: `版本:${version}`,
            enabled:false
        });

        menus.push({
            label: '服务配置',
            click: () => {
                if (this.mainWindow.show()) {
                    this.showSettingWindow();
                } else {
                    this.mainWindow.show();
                    this.showSettingWindow();
                }
            }
        });

        menus.push({
            label: '检查更新',
            click: () => {
                if (this.mainWindow.show()) {
                    this.showUpdateWindow();
                } else {
                    this.mainWindow.show();
                    this.showUpdateWindow();
                }
            }
        });
        menus.push({ label: '立即退出',
            click: () => {
                this.mainWindow.close();
            }});

        return menus;
    }

    createTray() {
        let image = nativeImage.createFromPath(path.join(__dirname,'./../assets/icon.png'))
        image.setTemplateImage(true);

        this.tray = new Tray(image)
        const contextMenu = Menu.buildFromTemplate(this.buildMenuTemplate())
        this.tray.setToolTip('Cloud App');
        this.tray.setContextMenu(contextMenu);
    }

    destory(){
        this.tray.destory();
    }

    showSettingWindow() {
        this.settingWindow.show();
    }

    showUpdateWindow() {
        this.updateWindow.show();
    }
}

module.exports = TrapClient;