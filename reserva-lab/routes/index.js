const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

var GetLogIn = require('../controllers/getLogIn')
//const eventos= GetLogIn.getEvents()



/* GET home page. */
router.get('/', function(req, res, next) {
  //res.sendFile('/views/index.html', { root: '.' })
  
  //res.write(GetLogIn.getEvents)
  res.render('index')
  /*
  res.status(200).json(
    [   {
      title: 'Labo3',
      start: '2019-11-18T10:00:00',
      end: '2019-11-18T12:00:00'
    },
    {
      title: 'Labo3',
      start: '2019-11-19T10:00:00',
      end: '2019-11-19T12:00:00'
    }]
  )
  });*/
/*
  router.get('/json', function(req, res, next) {
    console.log(eventos)
    console.log('Respuesta', respuesta)
    res.status(200).json(
      [   {
        title: 'Labo3',
        start: '2019-11-18T10:00:00',
        end: '2019-11-18T12:00:00'
      },
      {
        title: 'Labo3',
        start: '2019-11-19T10:00:00',
        end: '2019-11-19T12:00:00'
      }]
    )
    });*/
  })

  router.get('/json', GetLogIn.getEventos);

module.exports = router;
