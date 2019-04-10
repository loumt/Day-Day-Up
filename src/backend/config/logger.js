
const logFolder = process.platform === 'win32' ?  './../log' : '/var/logs/day-day-up-log'

module.exports = {
  appenders: {
    console: { type: 'console' },
    access: {
      category: "access",
      type: "dateFile",
      filename: `${logFolder}/access.log`,//您要写入日志文件的路径
      alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
      //compress : true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: "-yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8'//default "utf-8"，文件的编码
    },
    system: {
      type: 'dateFile',
      filename: `${logFolder}/system.log`,
      maxLogSize: 10,
      // backups : 3,//default value = 5.当文件内容超过文件存储空间时，备份文件的数量
      //compress : true,//default false.是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
      encoding: 'utf-8',//default "utf-8"，文件的编码
    },
    database: {
      type: 'file',
      filename: `${logFolder}/database.log`,
      encoding: 'utf-8'
    }
  },
  categories: {
    default: {
      appenders: ['console'], level: 'debug'
    },
    system: {
      appenders: ['system','console'], level: 'debug'
    },
    access: {
      appenders: ['access','console'], level: 'debug'
    },
    database: {
      appenders: ['database'], level: 'debug'
    }
  }
}
