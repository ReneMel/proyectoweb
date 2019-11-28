var express = require('express');
var router = express.Router();
const usersControl = require('../controllers/usersController');
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
router.get('/search', usersControl.getUserById)
router.get('/show', usersControl.getUserById);
router.get('/fill', usersControl.getAllUser);
router.get('/fillAdvanced', usersControl.getAttribute);
router.get('/showAdvanced', usersControl.getAdvancedUser)
router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/');
})
/*PUT*/
router.put('/edit', usersControl.updateUser);
router.put('/turn', usersControl.turnUser)

module.exports = router;