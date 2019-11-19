var express = require('express');
var router = express.Router();
const getLogIn = require('../controllers/getLogIn');

/*GET where admin can see all users*/
router.get('/', getLogIn.getAllUser);
router.get('/search', getLogIn.getUserById)
router.get('/show', getLogIn.getUserById);
//router.get('/edit', getLogIn.getUserById);
router.put('/edit', getLogIn.updateUser);
module.exports = router;