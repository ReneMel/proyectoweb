const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const {isLoggedIn} = require('../models/auth')
const getReport = require('../controllers/getReport');

var GetLogIn = require('../controllers/getLogIn')
//const eventos= GetLogIn.getEvents()
let opt=0
let opt2='c'

router.get('/eByU', GetLogIn.getEventbyUser)
router.get('/matBU',GetLogIn.getMaterias)

/* GET home page. */
router.get('/calendar', isLoggedIn, function(req, res, next) {
  console.log(req.session.passport.user.rol);
  if(req.session.passport.user.rol==true){ 
      res.render('CalendarAdmin')
  } else {
    res.render('CalendarDefault')
  }
  
  
});

router.get(`/Evento`,GetLogIn.getEventoById)

router.post('/calendar',function(req,res,next){
    //console.log(req.body.Labo)
    opt=req.body.Labo

    res.redirect(`/calendar?l=${opt}&e=${opt2}`)

  });

router.get('/sp', GetLogIn.getSoporteEventoById)

router.post('/event', GetLogIn.addSolicitud)

router.put('/u', GetLogIn.updateEstado)

//router.get('/add', GetLogIn.addSolicitud)
module.exports = router;
