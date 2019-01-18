const db = require('./../models')
const BaseService = require('BaseService')


class PermissionService extends BaseService {
  constructor() {
    super(db['Permission'])
  }
}

module.exports = PermissionService()

