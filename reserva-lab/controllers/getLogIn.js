const db = require('../models/connection');

const getUser = (req,res)=>{
    let user = req.body.user;
    let pass = req.body.password;
    
    db.connection.any(`SELECT codigo, denominacion FROM proyecto WHERE codigo='${user}'`)
    .then((Data)=>{
        if (!Data[0]) {
            res.render('login',{
                err: {
                    bad: true,
                    msg: 'El usuario o contraseña incorrecto'
                }
            });
        }
        else {
            /*Deberia de direccionar al usuario a la pagina principal*/
            res.status(200)
            .json({
                status: 'Succesful',
                user: Data[0].codigo,
                password: Data[0].denominacion
            });
        }
    })
    .catch(err=>{
        return res.status(400)
        .json({
            message: 'Something went wrong'
        });
    })
}

module.exports = {getUser}