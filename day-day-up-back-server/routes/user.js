var express = require('express');
var router = express.Router();

const UserController = require('./../controllers/UserController')


router.get('/list',UserController.list);
router.get('/:id',UserController.find);
router.post('/create',UserController.create);
router.post('/delete',UserController.delete);

module.exports = router;
