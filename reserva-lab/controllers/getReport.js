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

    /*await db.connection.any(`SELECT s.id as "Número de solicitud", s.fecha_solicitud as "Fecha de solicitud",
     s.fecha_inicio as "Fecha de reserva", CONCAT('de ', s.hora_inicio, ' a ', s.hora_fin) as "Duración", 
     s.estado as "Estado de solicitud", l.nombre as "Laboratorio solicitado", m.nombre as "Materia", u.nombre as "Responsable"
    FROM ((solicitud s INNER JOIN laboratorio l ON s.codigo_laboratorio = l.codigo)
    INNER JOIN materia m ON s.codigo_materia = m.codigo)
    INNER JOIN usuario u ON s.responsable_carnet = u.carnet
    WHERE s.hora_inicio = $1 AND s.hora_fin = $2 AND l.nombre = $3 AND m.nombre = $4 AND s.estado = $5 
    AND s.responsable_carnet = $6 AND s.fecha_solicitud = $7 AND s.fecha_inicio = $8;
    `,[horaIni,horaFin,nombreLab,nombreMat,estadoSol,carnetResponsable,fechaSol,fechaIni])*/
    await db.connection.any(`SELECT s.$1~ as "Número de solicitud", s.$2~ as "Fecha de solicitud", s.$3~ as "Fecha de reserva",
    CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duración", s.$6~ as "Estado de solicitud", l.$7~ as "Laboratorio solicitado",
    m.$7~ as "Materia", u.$7~ as "Responsable"
    FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
    INNER JOIN $12~ m ON s.$13~ = m.$11~)
    INNER JOIN $14~ u ON s.$15~ = u.$16~
    WHERE s.$3~ = $24 AND s.$2~ = $23 AND s.$4~ = $17 AND s.$5~ = $18 
    AND l.$7~ = $19 AND m.$7~ = $20 AND s.$6~ = $21 AND s.$15~ = $22;`
    ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaIni,horaFin,nombreLab,nombreMat,estadoSol,carnetResponsable,fechaSol,fechaIni])
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
