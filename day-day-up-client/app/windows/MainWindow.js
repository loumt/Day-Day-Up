"use strict";
const { app, BrowserWindow } = require('electron');
const Common = require('./../common');
const path = require('path')


class MainWindow {
    constructor() {
        this.createWindow();
        this.initWindowEvents();
        this.initWindowWebContent();
    }


    createWindow() {
        this.mainWindow = new BrowserWindow({
            title: Common.TITLE,
            width:Common.WINDOW.width,
            height:Common.WINDOW.height,
            resizable: true,
            center: true,
            show: Common.WINDOW.show,
            frame: Common.WINDOW.frame,
            autoHideMenuBar: true,
            icon: path.join(__dirname, './../assets/main-client-icon-32.ico'),
            titleBarStyle: 'hidden-inset',
            webPreferences: {
                javascript: true,
                plugins: true,
                nodeIntegration: true,
                webSecurity: false,
                // preload: path.join(__dirname, '../../inject/preload.js'),
            },
        });

    }

    loadURL(url) {
        this.mainWindow.loadURL(url);
    }

    show() {
        this.mainWindow.show();
        this.mainWindow.focus();
    }

    hide() {
        this.mainWindow.hide();
    }

    initWindowWebContent() {
        // this.mainWindow.webContents.setUserAgent(Common.USER_AGENT);
        this.loadURL(`file://${path.join(__dirname, './../views/index.html')}`)
        if (Common.DEBUG_MODE) {
            this.mainWindow.webContents.openDevTools();
        }

    }

    initWindowEvents() {
        this.mainWindow.on('close', (e) => {
            app.exit(0);
        });
        this.mainWindow.on('show', () => {
            console.log('show');
        });
    }

    getWindow(){
        return this.mainWindow;
    }
}

module.exports = MainWindow;