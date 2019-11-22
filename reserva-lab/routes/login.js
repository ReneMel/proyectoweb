var express = require('express');
var router = express.Router();
const passport = require('passport')
const {isNotLoggedIn} = require('../models/auth');

/* GET login page*/
router.get('/', isNotLoggedIn, (req, res)=>{
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.render('login');
});

router.post('/signin', (req,res)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/calendar',
        failureRedirect: '/login'
    })(req,res);
});

module.exports = router;