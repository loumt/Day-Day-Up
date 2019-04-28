const BaseService = require('./BaseService')
const db = require('./../models')


class JianShuService extends BaseService {
  constructor() {
    super(db['JianShu'])
  }
}


module.exports = new JianShuService()