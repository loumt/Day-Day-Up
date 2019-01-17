const Sequelize = require('sequelize');
const {EventEmitter} = require('events')

const personalConfig = require('./../config/mysql');


const DafaultMysqlConfig = {
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    dialect: 'mysql'
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
        this.sequelize = new Sequelize(this.options);
    }


    validate() {
        let success = ()=>{
            console.log('数据库连接成功.')
            this.emit('success');
        }
        let error = (err)=>{
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

    getOptions(){
        return this.options;
    }

    getSequelize(){
        return this.sequelize;
    }
}


const sequlizeConnection = new SequlizeConnection(personalConfig)
const sequlize = sequlizeConnection.getSequelize();

module.exports = {
    sequlizeConnection:sequlizeConnection,
    sequlize:sequlize
}
