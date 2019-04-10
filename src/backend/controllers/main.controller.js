
const {body, param, query, validationResult} = require('express-validator/check')
const _ = require('lodash')
const {Op} = require('sequelize')
const ErrorCode = require('./../constants/ErrorCode')
const MessageConstant = require('./../constants/Message.Constant')

const UserService = require('./../service/UserService')
const MessageService = require('./../service/MessageService')
const PraiseRecordService = require('./../service/PraiseRecordService')


exports.get = [
  [],
  async (req,res,next)=>{
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.jsonOnError(ErrorCode.PARAMETER_ILLEGAL);
    }

    try{
      let {id: userId} = req.session.user

      //User Info
      let User = await UserService.findById(userId);

      //普通对话
      let readDiscussCount = await MessageService.count({type: MessageConstant.DISCUSS_MESSAGE , rtime: { $ne : null } })
      let unReadDiscussCount = await MessageService.count({type: MessageConstant.DISCUSS_MESSAGE , rtime: { $eq : null } })

      //系统消息
      let readSysCount = await MessageService.count({type: MessageConstant.SYSTEM_MESSAGE , rtime: { $ne : null } })
      let unReadSysCount = await MessageService.count({type: MessageConstant.SYSTEM_MESSAGE , rtime: { $eq : null } })

      //Care对话
      let readCareCount = await MessageService.count({type: MessageConstant.CARE_MESSAGE , rtime: { $ne : null } })
      let unReadCareCount = await MessageService.count({type: MessageConstant.CARE_MESSAGE , rtime: { $eq : null } })

      //点赞
      let praiseCount = await PraiseRecordService.count({article_user_id: userId})

      let resultModel = {
        user: User,
        discussMessage: {
          unread: unReadDiscussCount,
          read: readDiscussCount
        },
        sysMessage: {
          unread: unReadSysCount,
          read: readSysCount
        },
        careMessage: {
          unread: unReadCareCount,
          read: readCareCount
        },
        praise: praiseCount
      }
      // res.jsonOnSuccess(resultModel)
      res.jsonOnError(ErrorCode.SYSTEM_ERROR)
    }catch(err){
      next(err)
    }
  }
]