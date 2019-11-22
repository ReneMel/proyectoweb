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

        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
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
}

module.exports = {
    renderReportView,
    getAdvancedReport
}
