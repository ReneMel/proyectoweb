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
    const user = await db.connection.any(`SELECT u.carnet, u.nombre, u.correo, u.tipo, u.rol, u.estado, c.nombre as Carrera_Materia
    FROM usuario u INNER JOIN estudiante e
    ON u.carnet = e.carnet_estudiante INNER JOIN carrera c
    ON e.carrera_codigo = c.codigo
    UNION 
    SELECT u.carnet, u.nombre, u.correo, u.tipo, u.rol, u.estado, m.nombre Carrera_Materia
    FROM usuario u INNER JOIN docente d
    ON u.carnet = d.carnet_docente INNER JOIN imparte i 
    ON d.carnet_docente = i.carnet_docente INNER JOIN materia m
    ON m.codigo = i.codigo_materia
    UNION
    SELECT u.carnet, u.nombre, u.correo, u.tipo, u.rol, u.estado, 'N/A'
    FROM usuario u INNER JOIN soporte s
    ON u.carnet = s.carnet_soporte`)
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
    
    const user = await db.connection.any(`SELECT u.carnet, u.nombre, u.correo, u.tipo, u.rol, u.estado, c.nombre as Carrera_Materia
    FROM usuario u INNER JOIN estudiante e
    ON u.carnet = e.carnet_estudiante INNER JOIN carrera c
    ON e.carrera_codigo = c.codigo
    WHERE u.carnet = '${carnet}' 
    UNION 
    SELECT u.carnet, u.nombre, u.correo, u.tipo, u.rol, u.estado, m.nombre Carrera_Materia
    FROM usuario u INNER JOIN docente d
    ON u.carnet = d.carnet_docente INNER JOIN imparte i 
    ON d.carnet_docente = i.carnet_docente INNER JOIN materia m
    ON m.codigo = i.codigo_materia
    WHERE u.carnet = '${carnet}'
    UNION
    SELECT u.carnet, u.nombre, u.correo, u.tipo, u.rol, u.estado,'N/A'
    FROM usuario u INNER JOIN soporte s
    ON u.carnet = s.carnet_soporte
    WHERE u.carnet = '${carnet}'`)
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

const getAttribute = async (req,res)=>{
    const flag = req.query.career;

    if(flag) {
        const career = await db.connection.any(`SELECT nombre carrera
        FROM carrera;`)
        .then(async data=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else {
        const subject = await db.connection.any(`SELECT nombre materia
        FROM materia;`)
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

}

const getAdvancedUser = async (req,res)=>{
    const type = req.query.type;
    let state = req.query.state;
    if (state == 'activado') {
        state = true;
    }
    else {
        state = false;
    }

    if (type == 'estudiante') {
        await db.connection.any(`SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, c.$2~ carrera
        FROM $7~ a INNER JOIN $8~ b
        ON a.$1~ = b.$9~ INNER JOIN $10~ c
        ON b.$11~ = c.$12~
        WHERE a.$6~ = ${state};`, ['carnet','nombre','correo','tipo','rol','estado','usuario',
        'estudiante','carnet_estudiante','carrera','carrera_codigo','codigo'])
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })        
    }
    else if (type == 'docente') {
        
    }
    else {
        
    }

    /*SELECT u.carnet, u.nombre, u.correo, u.tipo, u.rol, u.estado, c.nombre carrera
    FROM usuario u INNER JOIN estudiante e
    ON u.carnet = e.carnet_estudiante INNER JOIN carrera c
    ON e.carrera_codigo = c.codigo;*/ 
}


module.exports = {
    getUser,
    getAllUser,
    renderUserView,
    getUserById,
    updateUser,
    getAttribute,
    getAdvancedUser
}