var express = require('express');
var router = express.Router();
const passport = require('passport')
const {isNotLoggedIn} = require('../models/auth');

router.get('/', isNotLoggedIn, (req, res)=>{
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.render('signUp');
});

router.post('/create', (req,res)=>{
    passport.authenticate('local.signup', {
        successRedirect: '/login',
        failureRedirect: '/'
    })(req,res);
})
module.exports = router;