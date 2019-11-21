const db = require('../models/connection');


const getUser = (req,res)=>{
    let user = req.body.user;
    let pass = req.body.password;
    
    db.connection.any(`SELECT carnet, contra FROM usuario 
    WHERE carnet='${user}' AND contra='${pass}'`)
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
        const event = await db.connection.any('select concat($1,s.codigo_laboratorio,$5,m.nombre)as title, concat(s.fecha_inicio,$2,s.hora_inicio) as start, concat(s.fecha_fin,$3,s.hora_fin) as end from solicitud as s, materia as m where estado = $4  and m.codigo=s.codigo_materia;', ['Labo-0','T','T','confirmado',': '])
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
        const event = await db.connection.any('	select concat($1,s.codigo_laboratorio,$6,m.nombre)as title, concat(s.fecha_inicio,$2,s.hora_inicio) as start, concat(s.fecha_fin,$3,s.hora_fin) as end from solicitud as s, materia as m where estado = $4 and codigo_laboratorio= $5 and m.codigo=s.codigo_materia;', ['Labo-0','T','T','confirmado', opt,': '])
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

module.exports = {getUser, getEventoById,getSoporteEventoById }