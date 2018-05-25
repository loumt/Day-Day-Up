var express = require('express');
var router = express.Router();

const RoleController = require('./../controllers/RoleController')


router.get('/list',RoleController.list);
router.get('/:id',RoleController.find);
router.post('/create',RoleController.create);
router.post('/delete',RoleController.delete);

module.exports = router;
