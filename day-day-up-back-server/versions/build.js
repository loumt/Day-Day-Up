"use strict";
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const chalk = require('chalk');
const _ = require('lodash');
const rm = require('rimraf')
const {EventEmitter} = require('events');
const dateformat = require('dateformat');


/**
 * 打包配置   node version/build.js --v=1.0.0 --d=app,desk,*.js,*.css --a=loumt --m=Detail
 * @type {{originPckJsonPath: string, originStaticPath: string, outPutStaticPath: string, outPutVersionPath: string, log: boolean, clear: boolean}}
 */
const defaultConfig = {
    //package.json文件
    originPckJsonPath: path.join(__filename, '../../', 'package.json'),
    //原资源文件位置
    originStaticPath: path.join(__filename, '../../public'),
    //版本资源文件所在目录
    outPutStaticPath: path.join(__filename, '../../versions'),
    //版本定义文件
    outPutVersionPath: path.join(__filename, '../../versions', 'version.json'),
    //输出信息
    log: true,
    //清空旧版本('outPutStaticPath'目录下所有文件,除了build.js)
    clear: true
}


class OutInfo {
    constructor() {
    }

}


class Build {
    constructor(options) {
        this.options = options;
        this.originStaticPath = options['originStaticPath'];
        this.outPutStaticPath = options['outPutStaticPath'];
        this.outPutVersionPath = options['outPutVersionPath'];
        this.originPckJsonPath = options['originPckJsonPath'];
        this.log = options['log'];
        this.clear = options['clear'];

        this.exec();
    }

    //遍历文件
    each(folder) {
        let paths = [];
        let files = fs.readdirSync(folder)
        files.forEach(file => {
            let filePath = path.join(folder, file)
            if (fs.statSync(filePath).isDirectory()) {
                paths = paths.concat(this.each(filePath))
            } else {
                // console.log(filePath);
                if (fs.existsSync(filePath)) {
                    paths.push(filePath);
                }
            }
        })
        return paths;
    }

    info(msg) {
        if (this.log) {
            console.log(chalk.yellow(msg))
        }
    }

    error(msg) {
        if (this.log) {
            console.log(chalk.red(msg))
        }
    }

    mkdir(fd) {
        if (fs.existsSync(fd)) {
            return true;
        } else {
            if (this.mkdir(path.dirname(fd))) {
                fs.mkdirSync(fd);
                return true;
            }
        }
    }

    copy(src, dst) {
        fs.createReadStream(src).pipe(fs.createWriteStream(dst))
    }

    generate(file) {

        if (!fs.existsSync(file)) {
            return;
        }

        //计算原文件相对位置
        let baseFile = path.relative(this.originStaticPath, file);

        //计算输出文件位置
        let targetFile = path.join(this.outPutStaticPath, baseFile)

        //检测输出文件文件夹是否存在，不存在即创建
        if (!fs.existsSync(path.dirname(targetFile))) {
            this.mkdir(path.dirname(targetFile))
        }

        //复制相关文件
        this.copy(file, targetFile)

        this.info(`[build]\t ${file} -> ${targetFile}`);
    }

    regex(params) {
        // let params = process.argv.splice(2);
        let folders = [];
        let patterns = [];
        let version = '';
        let author = '';
        let detail = '';
        params.forEach(param => {
            if (param.indexOf('--') === -1 || param.indexOf('=') === -1) {
                throw new Error(`Parameters error ! ${param}, for example --version=1.5.0`)
            }
            let cfg = param.split('=');
            switch (cfg[0]) {
                case '--d':
                    cfg[1].split(',').forEach(f => {
                        if (f.indexOf('*') !== -1)
                            patterns.push(f.replace('*', ''))
                        else
                            folders.push(f)
                    })
                    break;
                case '--v':
                    // version = cfg[1] //1.5.0
                    this.version= 'v' + cfg[1]
                    break;
                case '--a':
                    this.author = cfg[1];
                case '--m':
                    this.detail = cfg[1];
                default:
                    break;
            }

        })
        return {folders: folders, patterns: patterns};
    }

    emptyOutput(fileOrFolder) {
        return new Promise((resolve, reject) => {
            rm(path.join(this.outPutStaticPath, fileOrFolder), err => {
                if (err) {
                    reject(err);
                }
                resolve()
            })
        })
    }

    generateVersionJson(files) {
        let versionObj = {};
        let {version, author, description} = require(this.originPckJsonPath);
        versionObj['version'] = this.version || version || 'v1.0.0';
        versionObj['publisher'] =this.author ||  author || 'not author';
        versionObj['detail'] =this.detail ||  description || 'not description';
        versionObj['date'] = dateformat(new Date(), 'yyyy-MM-dd HH:mm:ss')
        versionObj['files'] = {}
        versionObj['files']['static'] = [];

        files.forEach(file => {
            let relativePath = path.relative(this.originStaticPath, file);
            versionObj['files']['static'].push(relativePath)
        })
        // console.dir(versionObj);
        let versionJsonObj = {}
        versionJsonObj["current-version"] = versionObj['version'];
        versionJsonObj[versionObj['version']] = versionObj;
        fs.writeFileSync(this.outPutVersionPath, JSON.stringify(versionJsonObj))
    }

    exec() {
        let params = process.argv;
        assert(Array.isArray(params), 'Parameters is not Safety!')
        assert(params.length > 1, 'Parameters is not Safety! Must special One Params!')

        //打包的文件
        let parameter = this.regex(params.splice(2));
        let folders = parameter['folders'];
        let patterns = parameter['patterns'];

        //显示打包文件
        this.info(`Get Folder or Pattern Regex : ${JSON.stringify(folders)} | ${JSON.stringify(patterns)}`)

        if (!fs.existsSync(this.originStaticPath)) {
            return this.error('Origin Static File Directory Is Not Exist!')
        }

        //文件清空
        let removeTask = fs.readdirSync(this.outPutStaticPath).map(item => {
            if (!this.clear || item === path.basename(__filename)) {
                return;
            }
            return this.emptyOutput(item);
        })


        Promise.all(removeTask).then(rst => {

            //检索需要打包的文件
            let files = [];

            folders.forEach(folder => {
                let folderPath = path.join(this.originStaticPath, folder);
                if (!fs.existsSync(folderPath)) {
                    return this.error(`${folderPath} not exist!`);
                }
                files = files.concat(this.each(folderPath))
            })

            fs.readdirSync(this.originStaticPath).forEach(f=>{
                // if(){}
                if(_.includes(patterns,path.extname(f))){
                    files.push(path.join(this.originStaticPath,f));
                }
            })


            //生成版本资源文件
            this.info(`start generate files : ${files.length}`);

            files.forEach(item => {
                this.generate(item);
            })

            //生成版本对比文件
            this.generateVersionJson(files);
        }).catch(e => {
            this.error('Build Error!')
            this.error(e)
        })

    }
}

new Build(defaultConfig);
