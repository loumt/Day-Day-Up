const BaseService = require('./BaseService.js')
const db = require('./../models')

class RUserArticleService extends BaseService{
  constructor(){
    super(db['RUserArticle'])
  }

}

module.exports = new RUserArticleService();