const {body, param, query, validationResult} = require('express-validator/check')
const _ = require('lodash')
const {Op} = require('sequelize')
const ErrorCode = require('./../constants/ErrorCode')
const ArticleConstants = require('./../constants/Article.Constants')
const ArticleService = require('./../service/ArticleService')

exports.one = [
  [
    param('articleId').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {articleId} = req.params
    let articles = await ArticleService.findById(articleId)
    return res.jsonOnSuccess(articles)
  }
]
exports.create = [
  [
    body('title').exists(),
    body('sub_title').exists(),
    body('content').exists(),
    body('type').exists().toInt().isInt(),
    body('description').exists(),
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let createModel = {date: new Date()}
    let {title, sub_title, content, type = ArticleConstants.ORIGINAL.TYPE, description} = req.body
    await ArticleService.create(_.assign(createModel, {title, sub_title, content, type, description}))
    res.jsonOnSuccess()
  }
]

exports.update = [
  [
    param('articleId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {articleId} = req.params
    let updateOptions = {}
    let updateField = ['title', 'sub_title', 'content', 'type', 'description']

    updateField.forEach(field => {
      if (field in req.body) {
        updateOptions[field] = req.body[field]
      }
    })
    await ArticleService.updateById(articleId, updateOptions)
    res.jsonOnSuccess()
  }
]

exports.list = [
  [
    query('length').exists(),
    query('offset').exists(),
    query('title').isString()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {length, offset, title} = req.query
    let order = null, options = null
    options.title = {[ Op.like ]: `${title}`}
    let articles = await ArticleService.findAll(offset, length, order, options)
    return res.jsonOnSuccess(articles)
  }
]

exports.delete = [
  [
    param('articleId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {articleId} = req.params

    await ArticleService.deleteById(articleId)
    res.jsonOnSuccess()
  }
]