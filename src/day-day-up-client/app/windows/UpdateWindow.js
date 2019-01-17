/**
 * CreateBy loumt@sanlogic.com.
 */
'use strict';

const path = require('path');
const {BrowserWindow} = require('electron');
const electronLocalShortcut = require('electron-localshortcut');

let Common = require('./../common');

class SettingsWindow {
    constructor() {
        this.settingsWindow = null;
        this.createSettingsWindow();
    }

    createSettingsWindow() {
        this.settingsWindow = new BrowserWindow({
            width: Common.WINDOW_UPDATE_SIZE.width,
            height: Common.WINDOW_UPDATE_SIZE.height,
            show: false,
            resizable: false,
            fullscreenable: false,
            center: true,
            transparent:false,
            frame: false,
            autoHideMenuBar: true,
            alwaysOnTop: false,
            titleBarStyle: 'hidden',
        });
        this.initWindowEvents();
        this.initSettingsWindowShortcut();

        this.settingsWindow.loadURL(`file://${path.join(__dirname, './../client-views/update.html')}`);
    }

    initWindowEvents() {
        this.settingsWindow.on('close', () => {
            this.unregisterLocalShortCut();
            this.settingsWindow = null;
        });
    }

    show() {
        if (!this.settingsWindow) {
            this.createSettingsWindow();
        }
        this.settingsWindow.show();
        this.isShown = true;
    }

    hide() {
        this.settingsWindow.hide();
        this.isShown = false;
    }

    registerLocalShortcut() {
        electronLocalShortcut.register(this.settingsWindow, 'Esc', () => {
            this.settingsWindow.close();
        });
    }

    unregisterLocalShortCut() {
        electronLocalShortcut.unregisterAll(this.settingsWindow);
    }

    initSettingsWindowShortcut() {
        this.registerLocalShortcut();
    }
}

module.exports = SettingsWindow;
