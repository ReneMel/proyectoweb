var express = require('express');
var router = express.Router();
const getReport = require('../controllers/getReport');

/*GET*/
router.get('/',getReport.renderReportView);
router.get('/advancedRequest', getReport.getAdvancedReport)

module.exports = router;