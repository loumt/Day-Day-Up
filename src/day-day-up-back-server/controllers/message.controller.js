const ErrorCode = require('./../constants/ErrorCode')
const {body, param, query, validationResult} = require('express-validator/check')
const MessageService = require('./../service/MessageService')
const _ = require('lodash')

exports.one = [
  [
    param('messageId').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    try {
      let {messageId} = req.params
      let message = await MessageService.findById(messageId)
      return res.jsonOnSuccess(message)
    } catch (err) {
      return res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }
  }
]
exports.create = [
  [
    body('content').exists(),
    body('type').exists(),
    body('to_user_id').exists().toInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    try {
      //c_user_id
      let {id} = req.session.user

      let createModel = {
        to_user_id: req.body.to_user_id,
        content: req.body.content,
        type: req.body.type,
        from_user_id: id,
        ctime: new Date(),
        rtime: new Date()
      }
      await MessageService.create(createModel)
      res.jsonOnSuccess()
    } catch (err) {
      return res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }
  }
]

exports.list = [
  [
    query('length').exists(),
    query('offset').exists(),
    query('type').exists().isString()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }

    try {
      let {length, offset, type} = req.query
      let order = null, options = {type: parseInt(type)}
      let articles = await MessageService.findAll(parseInt(offset), parseInt(length), order, options)
      return res.jsonOnSuccess(articles)
    } catch (err) {
      return res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }
  }
]

exports.delete = [
  [
    param('messageId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }

    try {
      let {messageId} = req.params

      await MessageService.deleteById(messageId)
      res.jsonOnSuccess()
    } catch (err) {
      return res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }
  }
]