const db = require('../models/connection');

const renderReportView = async (req,res)=>{
    res.render('informe')
}

const getAdvancedReport = async (req,res)=>{
    let fechaSol = req.query.fechaSol;
    let fechaIni = req.query.fechaIni;
    let horaIni = req.query.horaIni;
    let horaFin = req.query.horaFin;
    let nombreLab = req.query.nombreLab;
    let estadoSol = req.query.estadoSol;
    let nombreMat = req.query.nombreMat;
    let carnetResponsable = req.query.carnetResponsable;

    console.log(fechaSol);

    await db.connection.any(`SELECT s.id as "Número de solicitud", s.fecha_solicitud as "Fecha de solicitud",
     s.fecha_inicio as "Fecha de reserva", CONCAT('de ', s.hora_inicio, ' a ', s.hora_fin) as "Duración", 
     s.estado as "Estado de solicitud", l.nombre as "Laboratorio solicitado", m.nombre as "Materia", u.nombre as "Responsable"
    FROM ((solicitud s INNER JOIN laboratorio l ON s.codigo_laboratorio = l.codigo)
    INNER JOIN materia m ON s.codigo_materia = m.codigo)
    INNER JOIN usuario u ON s.responsable_carnet = u.carnet
    WHERE s.hora_inicio = $1 AND s.hora_fin = $2 AND l.nombre = $3 AND m.nombre = $4 AND s.estado = $5 
    AND s.responsable_carnet = $6 AND s.fecha_solicitud = $7 AND s.fecha_inicio = $8;
    `,[horaIni,horaFin,nombreLab,nombreMat,estadoSol,carnetResponsable,fechaSol,fechaIni])
    .then(data=>{        
        res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
    })
    console.log(fechaSol);
}

module.exports = {
    renderReportView,
    getAdvancedReport
}
