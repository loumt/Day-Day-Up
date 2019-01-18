const db = require('./../models')
const BaseService = require('BaseService')


class RankRecordService extends BaseService {
  constructor() {
    super(db['RankRecord'])
  }
}

module.exports = RankRecordService()

