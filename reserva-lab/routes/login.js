var express = require('express');
var router = express.Router();
var getLogIn = require('../controllers/getLogIn')

/* GET login page*/
router.get('/', (req, res)=>{
    res.render('login', {
        err: {
            bad: false
        }
    });
});

router.post('/', getLogIn.getUser);

module.exports = router;