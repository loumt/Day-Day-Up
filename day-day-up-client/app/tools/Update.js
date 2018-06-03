'use strict';
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const {EventEmitter} = require('events')
const config = require('./../config/server')
const UPDATE_CONFIG = require('./../config/update')
const isDev = require('electron-is-dev');
const _ = require('lodash');
const FsTools = require('./FsTools')

/**
 * Server(config.server):
 * version file:{static}/version.json
 * ---------
 * version.json
 * {
 *  "v1.0.1":{
        "version":"v1.0.1",//版本信息
        "publisher": "loumt@sanlogic.com",//发布人
        "date":"2018-05-27 11:25:52",//发布时间
        "detail":["remark1","remark2",....],//版本更新
        "files":["111","",""]//更新文件{such as ['app/index.css','style/222.css'....] or ['all'] or ['css'/'js'/'images']}
  }
 * }
 * ---------
 */

//更新对象
let updateSingleton = null;

/**
 * 更新中间件
 */
class Update extends EventEmitter {
    constructor() {
        super();
        this.fileInSuccessUpdateNum = 0;
        this.totalUpdateFileNum = 0;
        this.updateToVersion = '';
        this.server = config.server;
    }

    static parseVersion(v1) {
        let v2 = v1.replace('v', '').replace('V', '').split('.').join('');
        if (!v2) {
            return 100;
        }
        return parseInt(v2);
    }

    /**
     * 获取更新对象
     */
    static getInstance() {
        if (!updateSingleton) {
            updateSingleton = new Update();
        }
        return updateSingleton;
    }

    /**
     * 获取当前版本
     */
    static getCurrentVersion() {
        let version = JSON.parse(fs.readFileSync('./version.json', 'utf8'));
        return version ? version['currentVersion'] : '未知版本'
    }


    /**
     * 获取最新版本
     */
    static getLastestVersion() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: UPDATE_CONFIG.update_server + '/versions/version.json',
                responseType: 'json'
            }).then(res => {
                let lastestVersion = res.data['current-version'];
                resolve(lastestVersion)
            }).catch(e => {
                reject(e)
            });
        });
    }

    /**
     * 获取版本信息及是否更新
     *
     */
    static getVersionInfo() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: UPDATE_CONFIG.update_server + UPDATE_CONFIG.server_version_params_file,
                responseType: 'json'
            }).then(res => {
                let result = {};
                result['lastestVersionInfo'] = res.data[res.data['current-version']];
                result['lastestVersion'] = res.data['current-version'];
                result['currentVersion'] = Update.getCurrentVersion();
                result['isUpdate'] = Update.comparedVersions(result['currentVersion'], result['lastestVersion']);
                resolve(result)
            }).catch(e => {
                reject(e)
            });
        });
    }

    /**
     * 是否需要更新
     * @param currentVersion
     * @param lastestVersion
     */
    static comparedVersions(currentVersion, lastestVersion) {
        return Update.parseVersion(lastestVersion) > Update.parseVersion(currentVersion);
    }


    /**
     * 更新
     */
    update() {
        //获取最新版本
        let versionInfoPromise = Update.getVersionInfo();
        versionInfoPromise.then((versionInfo) => {

            //获取服务器上最新的版本
            let lastestVersionInfo = versionInfo['lastestVersionInfo'];

            let version = lastestVersionInfo['version'];
            let files = lastestVersionInfo['files']
            let date = lastestVersionInfo['date']
            let detail = lastestVersionInfo['detail']
            let publisher = lastestVersionInfo['publisher']

            this.updateToVersion = version;
            console.log(`******************************`);
            console.log(`****version : ${version}******`);
            console.log(`****date    :    ${date}******`);
            console.log(`****detail  :  ${detail}******`);
            console.log(`******************************`);

            //判断运行环境
            console.log('isDev :' + isDev);

            //文件个数
            let sum = 0;
            for(let type in files){
                sum += files[type].length;
            }
            this.totalUpdateFileNum = sum;
            this.emit('total',sum)

            //更新文件
            for (let fileType in files) {
                switch (fileType) {
                    case 'static':
                        this.staticHandler(files[fileType]);
                        break;
                    case 'views':
                        this.viewHandler(files[fileType]);
                        break;
                    default:
                        console.log('unsurpport!');
                        break;
                }
            }
        })
    }

    staticHandler(staticFiles) {
        if (!staticFiles && staticFiles.length === 0) {
            return;
        }
        //设置下载路径
        let fileTo = path.join(__dirname, '../../public');
        staticFiles.forEach(item => {
            let fileDm = {}
            fileDm['from'] = UPDATE_CONFIG.update_server + '/versions' + '/' + item;
            fileDm['to'] = path.join(fileTo, item)

            // updateFiles.push(fileDm);
            this.downloadFiles(fileDm)
        })

        // console.log(updateFiles);
    }

    viewHandler(viewFiles) {
        if (!viewFiles && viewFiles.length === 0) {
            return;
        }

        //设置下载路径
        let fileTo = path.join(__dirname, '..');
        viewFiles.forEach(item => {
            let fileDm = {}
            fileDm['from'] = UPDATE_CONFIG.update_server + '/versions' + '/' + item;
            fileDm['to'] = path.join(fileTo, item)
            this.downloadFiles(fileDm)
        })
    }

    /**
     * 检查更新(deprecation)
     * @param thisVersion {v1.0.0}
     */
    checkVersion() {
        //获取当前版本
        this.thisVersion = this.localVersion();
        if (!this.localVersion) {
            return this.emit('error', '本地版本获取失败,请重新更新');
        }

        this.emit('local-version', this.thisVersion)
        console.log('Local App Version:' + this.thisVersion);

        //作为版本比较,100
        this.versionNum = this.parseVersion(this.thisVersion);

        axios({
            method: 'get',
            url: UPDATE_CONFIG.update_server + '/versions/version.json',
            responseType: 'json'
        }).then(res => {
            let data = this.versionsInServer = res.data;
            console.log(res.data);
            this.versionNumsInServer = [];

            for (let v in data) {
                this.versionNumsInServer.push(this.parseVersion(v));
            }
            this.emit('server-versions', this.versionsInServer)
        }).catch(e => {
            this.emit('error', '发现版本错误');
            console.log(e);
        });
    }


    downloadFiles({from:url,to:projectLocation}) {
        let options = {
            method: 'get',
            url: url,
            responseType: 'stream'
        }
        axios(options)
            .then(response => {
                let fileStream = response.data;

                response.data.on('end', () => {
                    this.fileInSuccessUpdateNum ++;
                    this.emit('end')
                })
                response.data.on('close', () => {
                })
                FsTools.mkdirsSync(path.dirname(projectLocation))
                fileStream.pipe(fs.createWriteStream(projectLocation))
            }).catch(e => {
            console.log(e);
        });
    }


    /**
     * 设置/获取 当前版本号
     * @param version
     */
    localVersion(version) {
        let file = path.join('./', 'version.json');
        if (version) {
            let v = {};
            v['currentVersion'] = version;
            let str = JSON.stringify(v)
            fs.writeFileSync(file, str);
        } else {
            let localVersion = JSON.parse(fs.readFileSync('./version.json', 'utf8'));
            return localVersion['currentVersion'];
        }
    }

    /**
     * 获取当前下载完成百分比
     */
    getUpdatePercent(){
        let percent = parseFloat(this.fileInSuccessUpdateNum/this.totalUpdateFileNum) * 100 ;

        if(percent === 100){
            this.localVersion(this.updateToVersion);
        }

        return percent+'%'
    }

}

module.exports = Update;
