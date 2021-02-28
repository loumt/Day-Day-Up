const {body, param, query, validationResult} = require('express-validator/check')
const _ = require('lodash')
const ErrorCode = require('./../constants/ErrorCode')

const JianShuService = require('./../service/JianShuService')

exports.one = [
  [
    param('id').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    try {
      let {id} = req.params
      let jianShu = await JianShuService.findById(id)
      return res.jsonOnSuccess(jianShu)
    } catch (err) {
      return res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }
  }
]
exports.create = [
  [
    body('title').exists(),
    body('author').exists(),
    body('href').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    try {
      let createModel = _.pick(req.body, ['title', 'author','href'])
      await JianShuService.create(createModel)
      res.jsonOnSuccess()
    } catch (err) {
      return res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }
  }
]

exports.list = [
  [
    query('length').exists(),
    query('offset').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }


    try {
      let {length, offset} = req.query
      let order = null, options = {}

      let articles = await JianShuService.findAll(parseInt(offset), parseInt(length), order, options)
      return res.jsonOnSuccess(articles)
    } catch (err) {
      return res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }
  }
]

exports.delete = [
  [
    param('id').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }

    try {
      let {id} = req.params

      await JianShuService.deleteById(id)
      res.jsonOnSuccess()
    } catch (err) {
      return res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }
  }
]