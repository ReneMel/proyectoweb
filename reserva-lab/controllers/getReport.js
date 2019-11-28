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

    if(fechaSol){
        console.log(fechaSol);
        
        console.log('Hola esto no funciona');
    }
    else{
        nombreLab = null;
        console.log('Hola esto funciona');
    }

    if(fechaIni && fechaSol && horaIni && horaFin && nombreLab && nombreMat && carnetResponsable && (estadoSol != 'todas')) {
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
    else if (!fechaIni && !fechaSol && !horaIni && !horaFin && !nombreLab && !nombreMat && !carnetResponsable && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet'])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (!fechaIni && !fechaSol && !horaIni && !horaFin && !nombreLab && !nombreMat && !carnetResponsable && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && (!fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni])
        .then(data=>{
            res.status(200).json(data);     
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && (!fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$6~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,estadoSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$2~ = $17;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && (!horaIni) && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$2~ = $17 AND s.$6~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaSol,estadoSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$4~ = $17;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaIni])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$4~ = $17 AND s.$6~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaIni,estadoSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$5~ = $17;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaFin])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$5~ = $17 AND s.$6~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaFin,estadoSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE l.$7~ = $17;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE l.$7~ = $17 AND s.$6~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',nombreLab,estadoSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && nombreMat && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE m.$7~ = $17;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && nombreMat && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE m.$7~ = $17 AND s.$6~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',nombreMat,estadoSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && (!nombreMat) && carnetResponsable && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$15~ = $17;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && (!nombreMat) && carnetResponsable && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$15~ = $17 AND s.$6~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',carnetResponsable,estadoSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && (!horaIni) && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$2~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,fechaSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && (!horaIni) && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$6~ = $18 AND s.$2~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,estadoSol,fechaSol])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && horaIni && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$2~ = $18 AND s.$4~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,fechaSol,horaIni])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && horaIni && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$6~ = $18 AND s.$2~ = $19 AND s.$4~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,estadoSol,fechaSol,horaIni])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && horaIni && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$2~ = $18 AND s.$4~ = $19 AND s.$5~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,fechaSol,horaIni,horaFin])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && horaIni && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$6~ = $18 AND s.$2~ = $19 AND s.$4~ = $20 AND s.$5~ = $21;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,estadoSol,fechaSol,horaIni,horaFin])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && horaIni && horaFin && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$2~ = $18 AND s.$4~ = $19 AND s.$5~ = $20 AND l.$7~ = $21;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,fechaSol,horaIni,horaFin,nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && horaIni && horaFin && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$6~ = $18 AND s.$2~ = $19 AND s.$4~ = $20 AND s.$5~ = $21 AND l.$7~ = $22;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,estadoSol,fechaSol,horaIni,horaFin,nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && horaIni && horaFin && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$2~ = $18 AND s.$4~ = $19 AND s.$5~ = $20 AND l.$7~ = $21 AND m.$7~ = $22;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,fechaSol,horaIni,horaFin,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if (fechaIni && fechaSol && horaIni && horaFin && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$3~ = $17 AND s.$6~ = $18 AND s.$2~ = $19 AND s.$4~ = $20 AND s.$5~ = $21 AND l.$7~ = $22 AND m.$7~ = $23;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaIni,estadoSol,fechaSol,horaIni,horaFin,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$2~ = $17 AND s.$4~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaSol,horaIni])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && (!horaFin) && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$2~ = $18 AND s.$4~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,fechaSol,horaIni])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$2~ = $17 AND s.$4~ = $18 AND s.$5~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaSol,horaIni,horaFin])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$2~ = $18 AND s.$4~ = $19 AND s.$5~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,fechaSol,horaIni,horaFin])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && horaFin && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$2~ = $17 AND s.$4~ = $18 AND s.$5~ = $19 AND l.$7~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaSol,horaIni,horaFin,nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$2~ = $18 AND s.$4~ = $19 AND s.$5~ = $20 AND l.$7~ = $21;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,fechaSol,horaIni,horaFin,nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && horaFin && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$2~ = $17 AND s.$4~ = $18 AND s.$5~ = $19 AND l.$7~ = $20 AND m.$7~ = $21;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaSol,horaIni,horaFin,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && horaFin && (!nombreLab) && nombreMat && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$2~ = $18 AND s.$4~ = $19 AND s.$5~ = $20 AND l.$7~ = $21 AND m.$7~ = $22;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,fechaSol,horaIni,horaFin,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && horaFin && nombreLab && nombreMat && carnetResponsable && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$2~ = $17 AND s.$4~ = $18 AND s.$5~ = $19 AND l.$7~ = $20 AND m.$7~ = $21 AND s.$15~ = $22;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',fechaSol,horaIni,horaFin,nombreLab,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && fechaSol && horaIni && horaFin && (!nombreLab) && nombreMat && carnetResponsable && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$2~ = $18 AND s.$4~ = $19 AND s.$5~ = $20 AND l.$7~ = $21 AND m.$7~ = $22 AND s.$15~ = $23;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,fechaSol,horaIni,horaFin,nombreLab,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$4~ = $17 AND s.$5~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaIni,horaFin])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && horaFin && (!nombreLab) && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$4~ = $18 AND s.$5~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,horaIni,horaFin])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && horaFin && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$4~ = $17 AND s.$5~ = $18 AND l.$7~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaIni,horaFin,nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && horaFin && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$4~ = $18 AND s.$5~ = $19 AND l.$7~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,horaIni,horaFin,nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && horaFin && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$4~ = $17 AND s.$5~ = $18 AND l.$7~ = $19 AND m.$7~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaIni,horaFin,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && horaFin && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$4~ = $18 AND s.$5~ = $19 AND l.$7~ = $20 AND m.$7~ = $21;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,horaIni,horaFin,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && horaFin && nombreLab && nombreMat && carnetResponsable && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$4~ = $17 AND s.$5~ = $18 AND l.$7~ = $19 AND m.$7~ = $20 AND s.$15~ = $21;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaIni,horaFin,nombreLab,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && horaIni && horaFin && nombreLab && nombreMat && carnetResponsable && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$4~ = $18 AND s.$5~ = $19 AND l.$7~ = $20 AND m.$7~ = $21 AND s.$15~ = $22;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,horaIni,horaFin,nombreLab,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && horaFin && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$5~ = $17 AND l.$7~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaFin,nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && horaFin && nombreLab && (!nombreMat) && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$5~ = $18 AND l.$7~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,horaFin,nombreLab])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && horaFin && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$5~ = $17 AND l.$7~ = $18 AND m.$7~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaFin,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && horaFin && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$5~ = $18 AND l.$7~ = $19 AND m.$7~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,horaFin,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && horaFin && nombreLab && nombreMat && carnetResponsable && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$5~ = $17 AND l.$7~ = $18 AND m.$7~ = $19 AND s.$15~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',horaFin,nombreLab,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && horaFin && nombreLab && nombreMat && carnetResponsable && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND s.$5~ = $18 AND l.$7~ = $19 AND m.$7~ = $20 AND s.$15~ = $21;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,horaFin,nombreLab,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE l.$7~ = $17 AND m.$7~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && nombreLab && nombreMat && (!carnetResponsable) && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND l.$7~ = $18 AND m.$7~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,nombreLab,nombreMat])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && nombreLab && nombreMat && carnetResponsable && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE l.$7~ = $17 AND m.$7~ = $18 AND s.$15~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',nombreLab,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && nombreLab && nombreMat && carnetResponsable && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND l.$7~ = $18 AND m.$7~ = $19 AND s.$15~ = $20;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,nombreLab,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && nombreMat && carnetResponsable && (estadoSol == 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE m.$7~ = $17 AND s.$15~ = $18;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else if ((!fechaIni) && (!fechaSol) && (!horaIni) && (!horaFin) && (!nombreLab) && nombreMat && carnetResponsable && (estadoSol != 'todas')) {
        await db.connection.any(`SELECT s.$1~ as "No_de_solicitud", s.$2~ as "Fecha_de_solicitud", s.$3~ as "Fecha_de_reserva",
        CONCAT('de ', s.$4~, ' a ', s.$5~) as "Duracion", s.$6~ as "Estado_de_solicitud", l.$7~ as "Laboratorio_solicitado",
        m.$7~ as "Materia", u.$7~ as "Responsable"
        FROM (($8~ s INNER JOIN $9~ l ON s.$10~ = l.$11~)
        INNER JOIN $12~ m ON s.$13~ = m.$11~)
        INNER JOIN $14~ u ON s.$15~ = u.$16~
        WHERE s.$6~ = $17 AND m.$7~ = $18 AND s.$15~ = $19;`
        ,['id','fecha_solicitud','fecha_inicio','hora_inicio','hora_fin','estado','nombre','solicitud','laboratorio','codigo_laboratorio','codigo','materia','codigo_materia','usuario','responsable_carnet','carnet',estadoSol,nombreMat,carnetResponsable])
        .then(data=>{        
            res.status(200).json(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

}

module.exports = {
    renderReportView,
    getAdvancedReport
}
