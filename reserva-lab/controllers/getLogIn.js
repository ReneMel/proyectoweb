const db = require('../models/connection');

const getUser = (req,res)=>{
    const {
        user,
        password
    } = req.body;
    
    db.connection.any(`SELECT carnet, contra FROM usuario 
    WHERE carnet='${user}' AND contra='${password}';`)
    .then(Data=>{
        if (!Data[0]) {
            res.render('login',{
                err: {
                    bad: true,
                    msg: 'El usuario o contraseña incorrecto'
                }
            });
        }
        else {
            res.redirect('/admin/users');
        }
    })
    .catch(err=>{
        return res.status(400)
        .json({
            message: 'Something went wrong'
        });
    })
}

const getAllUser = async (req,res)=>{
    const user = await db.connection.any(`SELECT carnet, nombre, correo, tipo, rol, estado
    FROM usuario;`)
    .then(data=>{
        return res.status(200).json(data);
    })
}
const renderUserView = async (req,res)=>{
    res.render('adminSeeUser')
}

// const getUserById = async (req,res)=>{
//     const carnet = req.query.carnet;
    
//     const user = await db.connection.any(`SELECT carnet, nombre, correo, tipo, is_admin, estado
//     FROM usuario WHERE carnet='${carnet}';`);
//     //console.log(user);   
//     res.render('adminSeeUser', {user})
// }

const getUserById = async (req,res)=>{
    const carnet = req.query.carnet;
    
    const user = await db.connection.any(`SELECT carnet, nombre, correo, tipo, rol, estado
    FROM usuario WHERE carnet='${carnet}';`)
    .then((data)=>{
        return res.status(200).json(data);
    })
}

const updateUser = async (req,res)=>{
    const user = req.body;
    const carnet = req.query.carnet;

    const update = await db.connection.any(`UPDATE usuario SET nombre='${user.name}', contra='${user.pass}', correo='${user.email}', tipo='${user.type}' WHERE carnet='${carnet}';`)
    .catch(err=>{
        console.log(err);
    });
    const updateUser = await db.connection.any(`SELECT nombre, correo, tipo FROM usuario WHERE carnet='${carnet}';`)
    .then((data)=>{
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
    })
}



module.exports = {getUser,getAllUser,renderUserView,getUserById,updateUser}