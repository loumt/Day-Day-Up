"use strict";

module.exports = (req,res,next)=>{

    res.jsonOnSuccess = function(object){
        res.status(200)
        let rs = {success:true}
        if(object){
            rs = Object.assign(rs,object);
        }
        res.json(rs)
    }

    res.jsonOnError = function(){
        res.status(500);
        res.json({success:false,message:'操作失败'})
    }

    next();
}