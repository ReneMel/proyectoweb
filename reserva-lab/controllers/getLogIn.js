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


const getEvents =()=>{
    const event =db.connection.any('select concat($1,s.codigo_laboratorio)as title, concat(s.fecha_inicio,$2,s.hora_inicio) as start, concat(s.fecha_fin,$3,s.hora_fin) as end from solicitud as s where estado = $4 ;', ['Labo','T','T','confirmado'])
    .then(data => {
        //console.log('DATA:', data);
        return data; // print and send data;
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
    });
    return event;
}
const getEventos = async (req,res)=>{
    const user = await db.connection.any('select concat($1,s.codigo_laboratorio)as title, concat(s.fecha_inicio,$2,s.hora_inicio) as start, concat(s.fecha_fin,$3,s.hora_fin) as end from solicitud as s where estado = $4 ;', ['Labo','T','T','confirmado'])
    .then(data => {
        //console.log('DATA:', data);
        return res.status(200).json(data); // print and send data;
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
    });

}

module.exports = {getUser,getEvents, getEventos}