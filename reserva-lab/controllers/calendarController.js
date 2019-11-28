const db = require('../models/connection');

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
    getEventoById,
    getSoporteEventoById,
    getEventbyUser,
    getMaterias,
    addSolicitud
}