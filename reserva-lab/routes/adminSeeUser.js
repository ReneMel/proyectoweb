var express = require('express');
var router = express.Router();
const getLogIn = require('../controllers/getLogIn');

/*GET where admin can see all users*/
router.get('/', getLogIn.getAllUser);
router.get('/search', getLogIn.getUserById)
module.exports = router;