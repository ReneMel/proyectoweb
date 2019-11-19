var express = require('express');
var router = express.Router();
const getLogIn = require('../controllers/getLogIn');

/*GET*/
router.get('/', getLogIn.renderUserView);
router.get('/search', getLogIn.getUserById)
router.get('/show', getLogIn.getUserById);
router.get('/fill', getLogIn.getAllUser);
/*PUT*/
router.put('/edit', getLogIn.updateUser);

module.exports = router;