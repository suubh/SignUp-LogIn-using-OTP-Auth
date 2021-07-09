//Using express.router and not app.get() etc..

const express = require('express');
const router = express.Router();

const {signout,signup} = require("../controllers/auth")    //Getting our signout method from controller


// router.get('/signup',signup);
router.post('/signup',signup);

module.exports = router;
