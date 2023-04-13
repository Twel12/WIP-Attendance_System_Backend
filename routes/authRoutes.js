const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router();

router.post('/signup', authController.signup)
    .post('/auth', authController.auth)

module.exports = router;