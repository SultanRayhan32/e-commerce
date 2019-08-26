const express = require('express');
const router = express.Router();
const { auth_controller } = require('../controllers')

router.post('/register' ,  auth_controller.Register )
router.post('/login' ,  auth_controller.Login )

module.exports = router
