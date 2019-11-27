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
    await hp.helpers.encryptPassword(user.pass)
    .then( async pass=>{
        const update = await db.connection.any(`UPDATE usuario SET nombre=$1, 
        contra=$2, correo=$3 
        WHERE carnet=$4;`,[user.name,pass,user.email,carnet])
        .catch(err=>{
            console.log(err);
        });
        const updateUser = await db.connection.any(`SELECT $1~, $2~
        FROM $3~ WHERE $4~ = '${carnet}';`,['nombre','correo','usuario','carnet'])
        .then((data)=>{
            return res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    });
    
    // const update = await db.connection.any(`UPDATE usuario SET nombre=$1, 
    // contra=$2, correo=$3 
    // WHERE carnet=$4;`,[user.name,truePass,user.email,carnet])
    // .catch(err=>{
    //     console.log(err);
    // });
    // const updateUser = await db.connection.any(`SELECT $1~, $2~
    // FROM $3~ WHERE $4~ = '${carnet}';`,['nombre','correo','usuario','carnet'])
    // .then((data)=>{
    //     return res.status(200).json(data);
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
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
const getSoporteEventoById= async(req,res)=>{
    const opt = req.query.Labo;
    if(opt==0){
        const event = await db.connection.any('select concat($1,m.codigo_laboratorio,$3)as title, concat(m.fecha_inicio,$2,m.hora_inicio)as start, concat(m.fecha_fin,$2,m.hora_fin)as end from mantenimiento as m ;',['Labo-0','T', ': Mantenimiento'])
        .then(data=>{
            //console.log(data)
            return res.status(200).json(data);
            
        })
        .catch(err=>{
            return res.status(400)
            .json({
                message: 'Something went wrong'
            });
        })
    }
    else {
        const event = await db.connection.any(`select concat($1,m.codigo_laboratorio,$4)as title, concat(m.fecha_inicio,$2,m.hora_inicio)as start, concat(m.fecha_fin,$2,m.hora_fin)as end from mantenimiento as m where m.codigo_laboratorio=$3 ;`,['Labo-0','T', opt,': Mantenimiento'])
        .then(data=>{
            return res.status(200).json(data);
        })
        .catch(err=>{
            return res.status(400)
            .json({
                message: 'Something went wrong'
            });
        })
    }
}
const getEventoById = async (req, res)=>{
    const opt = req.query.Labo;
    if (opt==0){
        const event = await db.connection.any('select concat($1,s.codigo_laboratorio,$5,m.nombre)as title, concat(s.fecha_inicio,$2,s.hora_inicio) as start, concat(s.fecha_fin,$3,s.hora_fin) as end from solicitud as s, materia as m where estado = $4  and m.codigo=s.codigo_materia;', ['Labo-0','T','T','confirmada',': '])
        .then(data => {
            //console.log('DATA:', data);
            return res.status(200).json(data); // print and send data;
        })
    .catch(err=>{
        return res.status(400)
        .json({
            message: 'Something went wrong'
        });
    })
    }
    else {
        const event = await db.connection.any(`select concat($1,s.codigo_laboratorio,$6,m.nombre)as title,
                                             concat(s.fecha_inicio,$2,s.hora_inicio) as start, 
                                             concat(s.fecha_fin,$3,s.hora_fin) as end from solicitud as s,
                                             materia as m where estado = $4 and codigo_laboratorio= $5 
                                             and m.codigo=s.codigo_materia;`, 
                                             ['Labo-0','T','T','confirmado', opt,': '])
        .then(data => {
            //console.log('DATA:', data);
            return res.status(200).json(data); // print and send data;
        })
    .catch(err=>{
        return res.status(400)
        .json({
            message: 'Something went wrong'
        });
    })
    }
}

const getEventbyUser= async(req,res)=>{
    const carnet = req.user.carnet  //req.session.passport.carnet;
    const event = await db.connection.any(`
    select concat($1,s.codigo_laboratorio,$2,m.nombre)as title, 
                     concat(s.fecha_inicio,$3,s.hora_inicio) as start, concat(s.fecha_fin,$3,s.hora_fin) as end  
                     from solicitud as s, materia as m where s.responsable_carnet= $4 and m.codigo=s.codigo_materia and s.estado=$5;`,
                 ['Labo-0',': ','T', carnet,'pendiente'])
    .then(data => {
        //console.log('DATA:', data);
        return res.status(200).json(data); // print and send data;
    })
    .catch(err=>{
    return res.status(400)
    .json({
        message: 'Something went wrong'
    });
})
}

const getMaterias = async(req,res)=>{
    const carnet =  req.user.carnet;
    console.log(req.user.carnet);
    
    const typeuser = 'estudiante' //req.session.passport.user.tipo
    if(typeuser=='estudiante'){
        const event = await db.connection.any(`select m.nombre, m.codigo from materia as m left join materiaxcarrera as mc on mc.codigo_materia=m.codigo 
        left join carrera as c on c.codigo=mc.codigo_carrera left join estudiante as e 
        on e.carrera_codigo=c.codigo where e.carnet_estudiante=$1`, [carnet])
        .then(data => {
        //console.log('DATA:', data);
        return res.status(200).json(data); // print and send data;
        })
        .catch(err=>{
        return res.status(400)
        .json({
        message: 'Something went wrong'
        });
        })
    }else {
        console.log('data');
        
        
    }
}
/*
    -revise data del form
    -vea eventos y compare duplicados con estado C
        si: insert solicitud
        no: aler();



*/ 
const addSolicitud= async(req, res)=>{
    const inic= req.body.dateinic
    const fin= req.body.dateFin
    const hinic= req.body.hinic
    const hfin = req.body.hfin
    const labo= req.body.labosolicitud
    const mat= req.body.materias
    const equipo = req.body.equipo
    const estado = 'pendiente'
    const carnet = req.user.carnet
    
    
    console.log(inic);
    console.log(fin);
    console.log(hinic);
    console.log(hfin);
    console.log(labo);
    console.log(mat)
    console.log(equipo);
    
    
    
    const add= await db.connection.any(`
    insert into solicitud(equipo,fecha_inicio,fecha_fin,hora_inicio,hora_fin,fecha_solicitud,estado,responsable_carnet,codigo_laboratorio, codigo_materia)
    values($1,$2,$3,$4,$5,'2019-11-24',$6,$7,$8,$9)`,[equipo,inic,fin,hinic,hfin,estado,carnet,labo,mat])
    .then(data=>{
        res.redirect('/calendar')
    })
    .catch(err=>{
        console.log(err);
        return res.status(400).json(err)
    })
}

module.exports = {
    getUser,
    getAllUser,
    renderUserView,
    getUserById,
    updateUser,
    getAttribute,
    getAdvancedUser,
    turnUser, 
    getEventoById,
    getSoporteEventoById,
    getEventbyUser,
    getMaterias,
    addSolicitud
}
