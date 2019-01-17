const BaseService =require('./BaseService')
const db = require('./../models')

class UserService extends BaseService{
    constructor(){
        super(db['User'],db['RUserRole'])
    }

}

module.exports = new UserService();