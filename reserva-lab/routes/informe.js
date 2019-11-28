var express = require('express');
var router = express.Router();
const getReport = require('../controllers/getReport');

/*GET*/
router.get('/',getReport.renderReportView);
router.get('/advancedRequest', getReport.getAdvancedReport);
const {isLoggedIn} = require('../models/auth')

/* GET informes page*/
router.get('/', isLoggedIn,(req, res)=>{
    if(req.session.passport.user.rol) {
        res.render('informe')
    }
    else {
        res.redirect('/forbidden');
    }
});

module.exports = router;