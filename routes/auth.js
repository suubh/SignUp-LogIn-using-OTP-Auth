const express = require('express');
const router = express.Router();

const {register,signup,verify,login} = require("../controllers/auth")    //Getting our signout method from controller


// router.get('/signup',signup);
router.post('/login',login);
router.post('/signup',signup);
router.post('/register',register);
router.post('/verify',verify);

module.exports = router;
