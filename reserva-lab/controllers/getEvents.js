const db = require('../models/connection');

const getEvents =()=>{
    const event =db.connection.any('select concat($1,s.codigo_laboratorio)as title, concat(s.fecha_inicio,$2,s.hora_inicio) as start, concat(s.fecha_fin,$3,s.hora_fin) as end from solicitud as s where estado = $4 ;', ['Labo','T','T','confirmado'])
    .then(data => {
        //console.log('DATA:', data);
        return data; // print and send data;
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
    });     
}

module.exports(getEvents)