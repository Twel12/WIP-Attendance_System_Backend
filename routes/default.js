const express = require('express')
const router = express.Router();
const app=express();
const fs= require('fs');
const path = require('path');
const defaultController=require('./../controllers/defaultController')

router.route("/")
    .get(defaultController);

module.exports = router;