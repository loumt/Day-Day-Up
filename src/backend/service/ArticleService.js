const BaseService =require('./BaseService')
const db = require('./../models')

class ArticleService extends BaseService{
  constructor(){
    super(db['Article'])
  }
}

module.exports = new ArticleService()