var express = require('express');
var router = express.Router();

router.get('/', (req,res)=>{
    if(req.session.passport == undefined) {
        res.redirect('/login');
    }
    else {
        res.render('forbidden');
    }
})

module.exports = router;