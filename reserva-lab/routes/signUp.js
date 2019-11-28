var express = require('express');
var router = express.Router();
const supControler = require('../controllers/signUpController');
const passport = require('passport')
const {isNotLoggedIn} = require('../models/auth');

router.get('/', isNotLoggedIn, (req, res)=>{
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.render('signUp');
});
router.get('/career', supControler.getCareer);

router.post('/create', (req,res)=>{
    passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signUp'
    })(req,res);
})
module.exports = router;