const BaseService = require('./BaseService.js')
const db = require('./../models')

class RoleService extends BaseService{
    constructor(){
        super(db['Role'])
    }
}

module.exports = new RoleService();