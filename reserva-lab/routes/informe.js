var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const getReport = require('../controllers/getReport');

/*GET*/
router.get('/',getReport.renderReportView);
router.get('/advancedRequest', getReport.getAdvancedReport);
=======
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
>>>>>>> e3da987e1c2c2970a4cc399ce471b0c3986a1771

module.exports = router;