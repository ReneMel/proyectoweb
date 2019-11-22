var express = require('express');
var router = express.Router();
const getLogIn = require('../controllers/getLogIn');
const {isLoggedIn} = require('../models/auth');

/*GET*/
router.get('/', isLoggedIn, (req,res)=>{
    if (req.session.passport.user.rol) {
        res.render('adminSeeUser');    
    }
    else {
        res.redirect('/forbidden')
    }
    
}); //getLogIn.renderUserView
router.get('/search', getLogIn.getUserById)
router.get('/show', getLogIn.getUserById);
router.get('/fill', getLogIn.getAllUser);
router.get('/fillAdvanced', getLogIn.getAttribute);
router.get('/showAdvanced', getLogIn.getAdvancedUser)
router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/login');
})
/*PUT*/
router.put('/edit', getLogIn.updateUser);
router.put('/turn', getLogIn.turnUser)

module.exports = router;