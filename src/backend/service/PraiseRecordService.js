const BaseService =require('./BaseService')
const db = require('./../models')

class PraiseRecordService extends BaseService{
  constructor(){
    super(db['PraiseRecord'])
  }
}

module.exports = new PraiseRecordService()