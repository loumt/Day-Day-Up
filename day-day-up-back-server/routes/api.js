var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json({success:true,data:'API Success!'})
});

router.post('/test', function(req, res, next) {

    let {update} = req.body
    let updateDatas = []

    let data = JSON.parse(update);

    console.log(typeof data);

    switch (typeof data) {
        case 'object':
            updateDatas.push(data)
            break
        case 'string':
            updateDatas = JSON.parse(data)
        default:
            return res.jsonOnError(errors.PARAMETER_LOST)
    }

    res.status(200).json({success:true,data:'API Success!'})
});

module.exports = router;
