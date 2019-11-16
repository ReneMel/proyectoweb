var express = require('express');
var router = express.Router();

/* GET informes page*/
router.get('/', (req, res)=>{
    res.render('informe');
});

module.exports = router;