const express = require('express');
const router = express.Router();
const passport = require('passport')
const {isNotLoggedIn} = require('../models/auth');


router.get('/', isNotLoggedIn, (req, res)=>{
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.render('login');
});

router.post('/signin', (req,res)=>{
  passport.authenticate('local.signin', {
      successRedirect: '/calendar',
      failureRedirect: '/'
  })(req,res);
});


module.exports = router;
