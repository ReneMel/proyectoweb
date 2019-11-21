var express = require('express');
var router = express.Router();
const getLogIn = require('../controllers/getLogIn');

/*GET*/
router.get('/', getLogIn.renderUserView);
router.get('/search', getLogIn.getUserById)
router.get('/show', getLogIn.getUserById);
router.get('/fill', getLogIn.getAllUser);
router.get('/fillAdvanced', getLogIn.getAttribute);
router.get('/showAdvanced', getLogIn.getAdvancedUser)
/*PUT*/
router.put('/edit', getLogIn.updateUser);
router.put('/turn', getLogIn.turnUser)

module.exports = router;