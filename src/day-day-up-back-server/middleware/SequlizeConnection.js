const Sequelize = require('sequelize');
const {EventEmitter} = require('events')

const personalConfig = require('./../config/mysql');


const DafaultMysqlConfig = {
  username: 'root',
  password: 'root',
  options: {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}

class SequlizeConnection extends EventEmitter {
  constructor(config) {

    super();
    // 配置项
    this.options = {}
    Object.assign(this.options, DafaultMysqlConfig, config)

    //连接
    this.connect();

    //验证
    this.validate();
  }

  connect() {
    this.sequelize = new Sequelize(this.options.database, this.options.username, this.options.password, this.options.options);
  }


  validate() {
    let success = () => {
      console.log('数据库连接成功.')
      this.emit('success');
    }
    let error = (err) => {
      switch (err.original.code) {
        case 'ER_ACCESS_DENIED_ERROR':
          console.warn('数据库验证失败,请检测用户名密码是否正确.')
          break
        case 'ER_BAD_DB_ERROR':
          console.warn('数据库错误(请检测数据库是否存在).')
          break
        case 'ECONNREFUSED':
          console.warn('数据库连接异常.')
          break
        default:
          console.log(err.name, err.original.code);
          break
      }
      this.emit('error');
    }

    this.sequelize.authenticate().then(success).catch(error)
  }

  disconnect(){
    return this.sequelize.close()
  }

  getOptions() {
    return this.options;
  }

  getSequelize() {
    return this.sequelize;
  }
}

const initErrorHandler = (tableName, err) => {
  console.error(`${tableName} INIT ERROR :  \n \t INIT ERROR: ${err['original']['code']}=> ${err['original']['sqlMessage']} \n`)
}


const sequlizeConnection = new SequlizeConnection(personalConfig)
const sequlize = sequlizeConnection.getSequelize();

module.exports = {
  sequlizeConnection: sequlizeConnection,
  sequlize: sequlize,
  initErrorHandler: initErrorHandler
}
