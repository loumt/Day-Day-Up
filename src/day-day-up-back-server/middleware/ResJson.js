"use strict";
const _ = require('lodash')
const ErrorCode = require('./../constants/ErrorCode')

module.exports = function(){
  return (req, res, next) => {

    res.jsonOnSuccess = function (object) {
      res.status(200)
      let rs = {success: true}
      if (object) {
        switch (typeof object) {
          case 'number':
          case 'string':
            rs.message = object;
            break;
          case 'object':
            rs.data = object
            break;
          default:
            break;
        }
      }
      res.json(rs)
    }

    res.jsonOnError = function (error) {
      res.status(500);

      if (_.includes(ErrorCode, error)) {
        res.json(error)
      } else {
        res.json(ErrorCode.SYSTEM_ERROR)
      }
    }

    res.jsonOn404 = function (message) {
      res.status(404)

      if(message){
        res.json(message)
      }
    }

    next();
  }
}