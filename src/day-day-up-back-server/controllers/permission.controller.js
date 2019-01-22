const {param, body, query, validationResult} = require('express-validator/check')
const _ = require('lodash')
const ErrorCode = require('./../constants/ErrorCode')
const PermissionService = require('./../service/PermissionService')


exports.one = [
  [
    param('permissionId').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {permissionId} = req.params
    let permission = await PermissionService.findById(permissionId)
    return res.jsonOnSuccess(permission)
  }
]


exports.create = [
  [
    body('code').exists(),
    body('description').exists(),
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    await PermissionService.create(_.pick(req.body, ['code', 'description']))
    res.jsonOnSuccess()
  }
]


exports.update = [
  [
    param('permissionId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {permissionId} = req.params
    let updateOptions = {}
    let updateField = ['description']

    updateField.forEach(field => {
      if (field in req.body) {
        updateOptions[field] = req.body[field]
      }
    })
    await PermissionService.updateById(permissionId, updateOptions)
    res.jsonOnSuccess()
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
    let permissions = await PermissionService.findAll(offset, length, order, options)
    return res.jsonOnSuccess(permissions)
  }
]


exports.delete = [
  [
    param('permissionId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {permissionId} = req.params

    await PermissionService.deleteById(permissionId)
    res.jsonOnSuccess()
  }
]