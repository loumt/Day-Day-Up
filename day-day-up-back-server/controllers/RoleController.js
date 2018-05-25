
const RoleService = require('./../service/RoleService')


class RoleController{}

/**
 * 查询单个角色信息
 * @param req
 * @param res
 * @param next
 */
RoleController.find = (req,res,next)=>{
    let {id:roleId} = req.params
    RoleService.findById(roleId).then(role=>{
        res.jsonOnSuccess(role)
    }).catch(e=>{
        res.jsonOnError()
    })
}

/**
 * 角色列表
 * @param req
 * @param res
 * @param next
 */
RoleController.list = (req,res,next)=>{
    RoleService.findAll().then(queryResult=>{
        res.jsonOnSuccess(queryResult)
    }).catch(e=>{
        res.jsonOnError()
    })
}

/**
 * 创建角色
 * @param req
 * @param res
 * @param next
 */
RoleController.create = (req,res,next)=>{
    let {role,description} = req.body

    let user = {
        role:role,
        description:description
    }
    RoleService.create(user).then(()=>{
        res.jsonOnSuccess()
    }).catch(e=>{
        res.jsonOnError()
    })
}

/**
 * 删除角色
 * @param req
 * @param res
 * @param next
 */
RoleController.delete = (req,res,next)=>{
    let {ids} = req.body

    let deleteIds = ids.split(',')

    RoleService.deleteByIds(deleteIds).then(()=>{
        res.jsonOnSuccess()
    }).catch(e=>{
        res.jsonOnError()
    })
}

module.exports = RoleController



