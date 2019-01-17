const BaseService =require('./BaseService')
const db = require('./../models')

class RoleService extends BaseService{
    constructor(){
        super(db['Role'],db['RUserRole'])
    }


}

module.exports = new RoleService();