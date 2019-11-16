var express = require('express');
var router = express.Router();
var getMethods = require('../controllers/getMethods')
var db = require('../models/connection')

/* GET login page*/
router.get('/', (req, res)=>{
    res.render('login', {
        err: {
            bad:false
        }
    });
    //res.send('Hello!');
});

router.post('/', (req,res)=>{
    let user = req.body.user;
    let pass = req.body.password;
    
    db.connection.any(`SELECT codigo, denominacion FROM proyecto WHERE codigo='${user}'`)
    .then((Data)=>{
        console.log(!Data[0]? 'y' : 'n');
        
        if (!Data[0]) {
            res.render('login',{
                err: {
                    bad: true,
                    msg: 'El usuario o contraseña es incorrecto'
                }
            });
            
        }
        else {
            res.render('admin/users')
        }
    })
    .catch(err=>{
        return res.status(400)
        .json({
            message: 'Something went wrong'
        });
    })

})

//router.get('/:user', getMethods.getUser)
//router.post();
// const getUser = (req,res)=>{
//     let user = req.params.user;
//     db.connection('SELECT codigo, denominacion FROM proyecto')
//     .then((Data)=>{
//         console.log(Data);
        
//         res.status(200)
//         .json({
//             status: 'Success'
//         });
//     })
//     .catch(err=>{
//         return
//     })
// }

module.exports = router;