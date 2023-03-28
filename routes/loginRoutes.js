const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router();

router.post('/signup', authController.signup)
    .get('/auth', authController.auth)

module.exports = router;