
const UserService = require('./../service/UserService')


class UserController{}

/**
 * 查询单个用户信息
 * @param req
 * @param res
 * @param next
 */
UserController.find = (req,res,next)=>{
    let {id:userId} = req.params
    UserService.findById(userId).then(user=>{
        res.jsonOnSuccess(user)
    }).catch(e=>{
        res.jsonOnError()
    })
}

/**
 * 用户列表
 * @param req
 * @param res
 * @param next
 */
UserController.list = (req,res,next)=>{
    UserService.findAll().then(queryResult=>{
        res.jsonOnSuccess(queryResult)
    }).catch(e=>{
        res.jsonOnError()
    })
}

/**
 * 创建用户
 * @param req
 * @param res
 * @param next
 */
UserController.create = (req,res,next)=>{
    let {username,password,realname,phone} = req.body

    let user = {
        username:username,
        password:password,
        realname:realname,
        phone:phone
    }
    console.log(user);

    UserService.create(user).then(()=>{
        res.jsonOnSuccess()
    }).catch(e=>{
        res.jsonOnError()
    })
}

/**
 * 删除用户
 * @param req
 * @param res
 * @param next
 */
UserController.delete = (req,res,next)=>{
    let {ids} = req.body

    let deleteIds = ids.split(',')

    UserService.deleteByIds(deleteIds).then(()=>{
        res.jsonOnSuccess()
    }).catch(e=>{
        res.jsonOnError()
    })
}

module.exports = UserController



