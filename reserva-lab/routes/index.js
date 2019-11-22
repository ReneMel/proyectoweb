const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

var GetLogIn = require('../controllers/getLogIn')
//const eventos= GetLogIn.getEvents()
let opt=0
let opt2='c'

router.get('/eByU', GetLogIn.getEventbyUser)
router.get('/matBU',GetLogIn.getMaterias)

/* GET home page. */
router.get('/calendar', function(req, res, next) {

  res.render('index')
})
router.get(`/Evento`,GetLogIn.getEventoById)

router.post('/calendar',function(req,res,next){
    //console.log(req.body.Labo)
    opt=req.body.Labo

    res.redirect(`/calendar?l=${opt}&e=${opt2}`)

  });

router.get('/sp', GetLogIn.getSoporteEventoById)

router.get('/add', GetLogIn.AddEvents)
module.exports = router;
