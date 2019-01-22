const {body,query, param, validationResult} = require('express-validator/check')
const _ = require('lodash')
const ErrorCode = require('./../constants/ErrorCode')
const RankRecordService = require('./../service/RankRecordService')


exports.one = [
  [
    param('rankrecordId').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {rankrecordId} = req.params
    let rankRecord = await RankRecordService.findById(rankrecordId)
    return res.jsonOnSuccess(rankRecord)
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
    let {length, offset} = req.query
    let order = null, options = null
    let rankRecords = await RankRecordService.findAll(offset, length, order, options)
    return res.jsonOnSuccess(rankRecords)
  }
]
