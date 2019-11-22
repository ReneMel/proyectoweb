const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const {isLoggedIn} = require('../models/auth')

var GetLogIn = require('../controllers/getLogIn')
//const eventos= GetLogIn.getEvents()
let opt=0
let opt2='c'



/* GET home page. */
router.get('/calendar', isLoggedIn, function(req, res, next) {
  // if(req.session.passport == undefined) {
  //   res.redirect('/login');
  // }
  // else {
  //   res.render('index')
  // } 
  res.render('index')
});

router.get(`/Evento`,GetLogIn.getEventoById)

router.post('/calendar',function(req,res,next){
    //console.log(req.body.Labo)
    opt=req.body.Labo

    res.redirect(`/calendar?l=${opt}&e=${opt2}`)

  });

router.get('/sp', GetLogIn.getSoporteEventoById)

module.exports = router;
