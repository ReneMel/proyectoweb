const db = require('../models/connection');
const hp = require('../models/helpers');

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
    const user = await db.connection.any(`SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, c.$2~ carrera_materia
    FROM $7~ a INNER JOIN $8~ b
    ON a.$1~ = b.$9~ INNER JOIN $10~ c
    ON b.$11~ = c.$12~
    UNION
    SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, d.$2~ carrera_materia
    FROM $7~ a INNER JOIN $13~ b
    ON a.$1~ = b.$14~ INNER JOIN $15~ c
    ON c.$14~ = b.$14~ INNER JOIN $16~ d
    ON c.$17~ = d.$12~
    UNION
    SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, 'N/A'
    FROM $7~ a INNER JOIN $18~ b
    ON a.$1~ = b.$19~`,['carnet','nombre','correo','tipo','rol','estado','usuario','estudiante',
    'carnet_estudiante','carrera','carrera_codigo','codigo', 'docente','carnet_docente',
    'imparte','materia','codigo_materia','soporte','carnet_soporte'])
    .then(data=>{
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
    })

    /*        await db.connection.any(`SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, c.$2~ carrera_materia
        FROM $7~ a INNER JOIN $8~ b
        ON a.$1~ = b.$9~ INNER JOIN $10~ c
        ON b.$11~ = c.$12~
        WHERE a.$6~ = ${state}
        UNION
        SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, d.$2~ carrera_materia
        FROM $7~ a INNER JOIN $13~ b
        ON a.$1~ = b.$14~ INNER JOIN $15~ c
        ON c.$14~ = b.$14~ INNER JOIN $16~ d
        ON c.$17~ = d.$12~
        WHERE a.$6~ = ${state}
        UNION
        SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, 'N/A'
        FROM $7~ a INNER JOIN $18~ b
        ON a.$1~ = b.$19~
        WHERE a.$6~ = ${state}`,['carnet','nombre','correo','tipo','rol','estado','usuario','estudiante',
        'carnet_estudiante','carrera','carrera_codigo','codigo', 'docente','carnet_docente',
        'imparte','materia','codigo_materia','soporte','carnet_soporte'])*/
}
const renderUserView = async (req,res)=>{
    //console.log(req.session.passport);
    
    // if(req.session.passport == undefined || req.session.passport.user == undefined) {
    //     res.redirect('/login');
    // }
    // else if(req.session.passport.user.rol) {
    //     res.render('adminSeeUser')
    // }
    // else {
    //     res.redirect('/forbidden');
    // }
}
const getUserById = async (req,res)=>{
    const carnet = req.query.carnet;
    
    const user = await db.connection.any(`SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, c.$2~ carrera_materia
    FROM $7~ a INNER JOIN $8~ b
    ON a.$1~ = b.$9~ INNER JOIN $10~ c
    ON b.$11~ = c.$12~
    WHERE a.$1~ = '${carnet}' 
    UNION 
    SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, d.$2~ carrera_materia
    FROM $7~ a INNER JOIN $13~ b
    ON a.$1~ = b.$14~ INNER JOIN $15~ c
    ON c.$14~ = b.$14~ INNER JOIN $16~ d
    ON c.$17~ = d.$12~
    WHERE a.$1~ = '${carnet}'
    UNION
    SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, 'N/A'
    FROM $7~ a INNER JOIN $18~ b
    ON a.$1~ = b.$19~
    WHERE a.$1~ = '${carnet}'`,['carnet','nombre','correo','tipo','rol','estado','usuario','estudiante',
    'carnet_estudiante','carrera','carrera_codigo','codigo', 'docente','carnet_docente',
    'imparte','materia','codigo_materia','soporte','carnet_soporte'])
    .then((data)=>{
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
    })
}
const updateUser = async (req,res)=>{
    const user = req.body;
    const carnet = req.query.carnet;
    
    const update = await db.connection.any(`UPDATE usuario SET nombre=$1, 
    contra=$2, correo=$3, tipo=$4 
    WHERE carnet=$5;`,[user.name,user.pass,user.email,user.type,carnet])
    .catch(err=>{
        console.log(err);
    });
    const updateUser = await db.connection.any(`SELECT $1~, $2~, $3~ 
    FROM $4~ WHERE $5~ = '${carnet}';`,['nombre','correo','tipo','usuario','carnet'])
    .then((data)=>{
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
    })
}
const turnUser = async (req,res)=>{
    const carnet = req.query.carnet;
    const state = JSON.parse(req.query.state);

    const update = await db.connection.any(`UPDATE usuario SET estado = $1
    WHERE carnet = $2`, [state,carnet])
    .catch(err=>{
        console.log(err);
    })
    const updateUser = await db.connection.any(`SELECT $1~ FROM $2~ 
    WHERE $3~ ='${carnet}';`,['estado','usuario', 'carnet'])
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
        const career = await db.connection.any(`SELECT $1~ carrera
        FROM $2~;`, ['nombre','carrera'])
        .then(async data=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else {
        const subject = await db.connection.any(`SELECT $1~ materia
        FROM $2~;`, ['nombre','materia'])
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
    let subject = req.query.subject;
    let career = req.query.career;
    
    if (state == 'todos') {
        state = 'a.estado'
    }
    else if (state == 'activado') {
        state = true;
    }
    else {
        state = false;
    }
    if (career == 'todas') {
        career = 'c.nombre';
    }
    else {
        career = `'${career}'`;
    }
    if (subject == 'todas') {
        subject = 'd.nombre';
    }
    else {
        subject = `'${subject}'`;
    }

    if (type == 'estudiante') {
        await db.connection.any(`SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, c.$2~ carrera_materia
        FROM $7~ a INNER JOIN $8~ b
        ON a.$1~ = b.$9~ INNER JOIN $10~ c
        ON b.$11~ = c.$12~
        WHERE a.$6~ = ${state} AND c.$2~ = ${career};`, ['carnet','nombre','correo','tipo','rol','estado','usuario','estudiante',
        'carnet_estudiante','carrera','carrera_codigo','codigo'])
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (type == 'docente') {
        await db.connection.any(`SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, d.$2~ carrera_materia
        FROM $7~ a INNER JOIN $8~ b
        ON a.$1~ = b.$9~ INNER JOIN $10~ c
        ON c.$9~ = b.$9~ INNER JOIN $11~ d
        ON c.$12~ = d.$13~
        WHERE a.$6~ = ${state} AND d.$2~ = ${subject};`, ['carnet','nombre','correo','tipo','rol','estado',
        'usuario','docente','carnet_docente','imparte','materia','codigo_materia',
        'codigo'])
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    } 
    else if(type == 'soporte') {
        await db.connection.any(`SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, 'N/A' carrera_materia
        FROM $7~ a INNER JOIN $8~ b
        ON a.$1~ = b.$9~
        WHERE a.$6~ = ${state}`, ['carnet','nombre','correo','tipo','rol','estado',
        'usuario','soporte','carnet_soporte'])
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })   
    }
    else {
        await db.connection.any(`SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, c.$2~ carrera_materia
        FROM $7~ a INNER JOIN $8~ b
        ON a.$1~ = b.$9~ INNER JOIN $10~ c
        ON b.$11~ = c.$12~
        WHERE a.$6~ = ${state}
        UNION
        SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, d.$2~ carrera_materia
        FROM $7~ a INNER JOIN $13~ b
        ON a.$1~ = b.$14~ INNER JOIN $15~ c
        ON c.$14~ = b.$14~ INNER JOIN $16~ d
        ON c.$17~ = d.$12~
        WHERE a.$6~ = ${state}
        UNION
        SELECT a.$1~, a.$2~, a.$3~, a.$4~, a.$5~, a.$6~, 'N/A'
        FROM $7~ a INNER JOIN $18~ b
        ON a.$1~ = b.$19~
        WHERE a.$6~ = ${state}`,['carnet','nombre','correo','tipo','rol','estado','usuario','estudiante',
        'carnet_estudiante','carrera','carrera_codigo','codigo', 'docente','carnet_docente',
        'imparte','materia','codigo_materia','soporte','carnet_soporte'])
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })  
    }
}

module.exports = {
    getUser,
    getAllUser,
    renderUserView,
    getUserById,
    updateUser,
    getAttribute,
    getAdvancedUser,
    turnUser
}
