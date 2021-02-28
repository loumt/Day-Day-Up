const BaseService = require('./BaseService')
const db = require('./../models')


class ReSouService extends BaseService {
  constructor() {
    super(db['ReSou'])
  }
}


module.exports = new ReSouService()