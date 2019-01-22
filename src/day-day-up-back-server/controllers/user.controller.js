const {body, query, param, validationResult} = require('express-validator/check')
const _ = require('lodash')
const {Op} = require('sequelize')
const ErrorCode = require('./../constants/ErrorCode')
const UserService = require('./../service/UserService')
const MD5 = require('md5')

exports.one = [
  [
    param('userId').exists()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {userId} = req.params
    let user = await UserService.findById(userId)
    return res.jsonOnSuccess(user)
  }
]

exports.create = [
  [
    body('username').exists(),
    body('password').exists(),
    body('nickname').exists(),
    body('realname'),
    body('phone'),
    body('qq'),
    body('email'),
    body('birthday'),
    body('icon'),
    body('disabled').toInt().isInt(),
    body('description').exists(),
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {userId} = req.session
    let encodePassoword = MD5(req.body.password)
    let code = MD5(req.body.username)
    await UserService.create(_.assign({ctime: new Date(), cuid: userId}, {
      code,
      password: encodePassoword
    }, _.pick(req.body, ['username', 'nickname', 'realname', 'phone', 'qq', 'email', 'birthday', 'icon', 'disabled'])))
    res.jsonOnSuccess()
  }
]

exports.update = [
  [
    param('userId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {userId} = req.params
    let updateOptions = {}
    let updateField = ['password', 'nickname', 'realname', 'phone', 'qq', 'email', 'birthday', 'disabled']

    updateField.forEach(field => {
      if (field in req.body) {
        if (field === 'password') {
          updateOptions[field] = MD5(req.body[field])
        } else {
          updateOptions[field] = req.body[field]
        }
      }
    })
    await UserService.updateById(userId, updateOptions)
    res.jsonOnSuccess()
  }
]

exports.list = [
  [
    query('length').exists(),
    query('offset').exists(),
    query('username').optional().isString()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {length, offset, username} = req.query
    let order = null, options = {[Op.like]: `%${username}%`}
    let user = await UserService.findAll(offset, length, order, options)
    return res.jsonOnSuccess(user)
  }
]

exports.delete = [
  [
    param('userId').toInt().isInt()
  ],
  async (req, res, next) => {
    let validateResult = validationResult(req)
    if (!validateResult.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_LOST)
    }
    let {userId} = req.params
    await UserService.deleteById(userId)
    res.jsonOnSuccess()
  }
]
