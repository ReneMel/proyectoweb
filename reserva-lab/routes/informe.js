var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('../models/auth')

/* GET informes page*/
router.get('/', isLoggedIn,(req, res)=>{
    
    // if(req.session.passport == undefined) {
    //     res.redirect('/login');
    // }
    // if(req.session.passport.user.rol) {
    //     res.render('informe')
    // }
    // else {
    //     res.redirect('/forbidden');
    // }
    res.render('informe');
});

module.exports = router;