var express = require('express');
var router = express.Router();

/*GET where admin can see all users*/
router.get('/', (req, res)=>{
    res.render('adminSeeUser');
    //res.send('Hello!');
});

module.exports = router;