"use strict";
const _ = require('lodash')
const ErrorCode = require('./../constants/ErrorCode')

module.exports = (req, res, next) => {

    res.jsonOnSuccess = function (object) {
        res.status(200)
        let rs = {success: true}
        if (object) {
            rs = Object.assign(rs, object);
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

    next();
}