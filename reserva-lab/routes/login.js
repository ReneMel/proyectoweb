var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET login page*/
router.get('/', (req, res)=>{
    res.render('login');
});

router.post('/signin', (req,res)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/users',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res);
});

module.exports = router;