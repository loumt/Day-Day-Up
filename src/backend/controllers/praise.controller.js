const {param, body, query, validationResult} = require('express-validator/check')
const _ = require('lodash')
const ErrorCode = require('./../constants/ErrorCode')
const PraiseRecordService = require('./../service/PraiseRecordService')

exports.count = [
  [
    query('articleId').optional().isInt().toInt()
  ],
  async (req,res,next)=>{
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_ILLEGAL);
    }

    try{
      let {articleId} = req.query
      let {id} = req.session.user

      let options = {article_user_id: id}
      if(articleId){
        options.article_id = articleId
      }

      let count = await PraiseRecordService.count(options)
      res.jsonOnSuccess({count})
    }catch(err){
      next(err)
    }

  }
]