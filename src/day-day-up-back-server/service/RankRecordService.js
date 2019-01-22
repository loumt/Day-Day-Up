const db = require('./../models')
const BaseService = require('./BaseService.js')


class RankRecordService extends BaseService {
  constructor() {
    super(db['RankRecord'])
  }
}

module.exports = new RankRecordService()

