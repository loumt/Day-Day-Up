const {body, query, param, validationResult} = require('express-validator/check')
const _ = require('lodash')
const ErrorCode = require('./../constants/ErrorCode')
const RoleService = require('./../service/RoleService')

exports.one = [
  [
    param('roleId').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {roleId} = req.params
    let roles = await RoleService.findById(roleId)
    return res.jsonOnSuccess(roles)
  }
]

exports.create = [
  [
    body('name').exists(),
    body('description').exists(),
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {userId} = req.session
    await RoleService.create(_.assign({ctime: new Date(), cuid: userId}, _.pick(req.body, ['name', 'description'])))
    res.jsonOnSuccess()
  }
]

exports.update = [
  [
    param('roleId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {roleId} = req.params
    let updateOptions = {}
    let updateField = ['name', 'description']

    updateField.forEach(field => {
      if (field in req.body) {
        updateOptions[field] = req.body[field]
      }
    })
    await RoleService.updateById(roleId, updateOptions)
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
    let {length, offset} = req.query
    let order = null, options = null
    let roles = await RoleService.findAll(offset, length, order, options)
    return res.jsonOnSuccess(roles)
  }
]

exports.delete = [
  [
    param('roleId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {roleId} = req.params

    await RoleService.deleteById(roleId)
    res.jsonOnSuccess()
  }
]
