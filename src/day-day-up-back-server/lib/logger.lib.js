const log4js = require('log4js')
const loggerConfig = require('./../config/logger')

log4js.configure(loggerConfig);

module.exports = {
  access: ()=>{
    return log4js.connectLogger(
      log4js.getLogger('access'),
      { level: 'auto', format: ':method :url :status :response-time ms' }
    )
  },
  system: ()=>{
    return log4js.getLogger('system');
  },
  database: ()=>{
    return log4js.getLogger('databse')
  }
}