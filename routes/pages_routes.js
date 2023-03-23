const express = require('express');
const router = express.Router();
const logInMDW = require('../Middleware/loggedIn');
const logout = require('../controllers/logout');

router.get('/',logInMDW,(req,res)=>{
    if(req.user){res.render('index',{status: 'LoggedIn', user: req.user});}
    else{res.render('index',{status: 'Not LoggedIN', user:'null'});}
});
router.route('/register').get((req,res)=>{
    res.sendFile('register.html',{root: './public'});
});
router.route('/login').get((req,res)=>{
    res.sendFile('login.html',{root: './public'});
});
router.route('/logout').get(logout);

module.exports = router;