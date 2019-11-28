const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../models/auth')
const calendarControl = require('../controllers/calendarController')

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  // if(req.session.passport == undefined) {
  //   res.redirect('/login');
  // }
  // else {
  //   res.render('index')
  // } 
  console.log(req.session);
  
  res.render('index')
});
router.get(`/Evento`,calendarControl.getEventoById)
router.get('/sp', calendarControl.getSoporteEventoById)
router.get('/add', calendarControl.addSolicitud)
router.get('/eByU', calendarControl.getEventbyUser)
router.get('/matBU',calendarControl.getMaterias)

router.post('/event', calendarControl.addSolicitud)
router.post('/',function(req,res,next){
    //console.log(req.body.Labo)
    opt=req.body.Labo

    res.redirect(`/?l=${opt}&e=${opt2}`)

});


module.exports = router;