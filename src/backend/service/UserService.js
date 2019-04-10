const BaseService = require('./BaseService.js')
const db = require('./../models')

class UserService extends BaseService{
    constructor(){
        super(db['User'])
    }

}

module.exports = new UserService();