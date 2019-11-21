var express = require('express');
var router = express.Router();
const passport = require('passport')

router.get('/', (req, res)=>{
    res.render('signUp');
});

router.post('/create', (req,res)=>{
    passport.authenticate('local.signup', {
        successRedirect: '/login',
        failureRedirect: '/',
        failureFlash: true
    })(req,res);
})
module.exports = router;