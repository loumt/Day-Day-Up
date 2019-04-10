const db = require('./../models')
const BaseService = require('./BaseService.js')


class PermissionService extends BaseService {
  constructor() {
    super(db['Permission'])
  }
}

module.exports = new PermissionService()

