var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('../models/auth')

router.get('/', isLoggedIn, (req,res)=>{
    // if(req.session.passport == undefined) {
    //     res.redirect('/login');
    // }
    // else {
    //     res.render('forbidden');
    // }
    res.render('forbidden')
})

module.exports = router;