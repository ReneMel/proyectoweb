var express = require('express');
var router = express.Router();

/* GET informes page*/
router.get('/', (req, res)=>{
    if(req.session.passport == undefined) {
        res.redirect('/login');
    }
    if(req.session.passport.user.rol) {
        res.render('informe')
    }
    else {
        res.redirect('/forbidden');
    }
});

module.exports = router;