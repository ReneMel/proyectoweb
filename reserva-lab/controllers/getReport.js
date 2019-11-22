const db = require('../models/connection');

const renderReportView = async (req,res)=>{
    res.render('informe')
}

const getAdvancedReport = async (req,res)=>{
    const fechaSol = req.query.fechaSol;
    const fechaIni = req.query.fechaIni;
    const horaIni = req.query.horaIni;
    const horaFin = req.query.horaFin;
    const nombreLab = req.query.nombreLab;
    const estadoSol = req.query.estadoSol;
    const nombreMat = req.query.nombreMat;
    const carnetResponsable = req.query.carnetResponsable;

    await db.connection.any(`SELECT s.id as "Número de solicitud", s.fecha_solicitud as "Fecha de solicitud", s.fecha_inicio as "Fecha de reserva", CONCAT('de ', s.hora_inicio, ' a ', s.hora_fin) as "Duración", s.estado as "Estado de solicitud", l.nombre as "Laboratorio solicitado", m.nombre as "Materia", u.nombre as "Responsable"
    FROM ((solicitud s INNER JOIN laboratorio l ON s.codigo_laboratorio = l.codigo)
    INNER JOIN materia m ON s.codigo_materia = m.codigo)
    INNER JOIN usuario u ON s.responsable_carnet = u.carnet
    WHERE s.fecha_inicio = $2 AND s.fecha_solicitud = $1 AND s.hora_inicio = $3 AND s.hora_fin = $4 AND l.nombre = $5 AND s.estado = $6 AND m.nombre = $7 AND s.responsable_carnet = $8;
    `,[fechaSol,fechaIni,horaIni,horaFin,nombreLab,estadoSol,nombreMat,carnetResponsable])
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        
    })
}

module.exports = {
    renderReportView,
    getAdvancedReport
}
