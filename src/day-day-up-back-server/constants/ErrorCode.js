"use strict";

/**
 * 100 system error
 * 101-199 detail with system error
 *
 *
 * 201-399 通用型错误
 *
 *
 * 400  用户
 * 401-499
 *
 * 500
 * 501-599
 */
module.exports = {
    'SYSTEM_ERROR':{
        code:100,
        message:'System Error!'
    },
    'SYSTEM_BROKE':{
        code:101,
        message:'System is Broke!'
    },
    'SYSTEM_SHUT_DOWN':{
        code:102,
        message:'System is Shut Down!'
    },
    'SYSTEM_OVER_RUN':{
        code:103,
        message:'System Over Run!'
    },


    'MUST_LOGIN':{
        code:200,
        message:'You Must Login!'
    },
    'PARAMETER_LOST':{
        code:201,
        message:'Parameter Is Lost!'
    },
    'VALIDATION_FAILS':{
        code:202,
        message:'Validation Fails!'
    },
    'YOU_MUST_BE_MANAGER':{
        code:203,
        message:'You Must Be a Manager!'
    },
    'NO_PERMISSION':{
        code:204,
        message:'No Permission!'
    },
    'CHECK_YOU_INFO':{
        code:205,
        message:'Check Your Info!'
    },
    'NOT_PERMISSION_IN_VISITORS':{
        code:206,
        message:'Visitors is not Permission do this!'
    },
    'FORMAT_ERROR':{
        code:206,
        message:'Format Error!'
    },

    'USER_CANT_DELETE':{
        code:400,
        message:'This User cant delete!'
    },
    'USER_IS_DISABLED':{
        code:401,
        message:'This user is disabled!'
    },
    'USER_IS_NOT_MANAGER':{
        code:402,
        message:'THis user is not a manager!'
    },
    'USER_IS_NO_PERMISSION':{
        code:403,
        message:'THis user is no permission do this!'
    }
}
