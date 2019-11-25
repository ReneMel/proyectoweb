const db = require('../models/connection');

const getCareer = async (req,res,next)=>{
    await db.connection.any('SELECT $1~, $2~ FROM $3~;', ['codigo','nombre','carrera'])
    .then(data=>{
        return res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        
        //next(err);
    })
}


module.exports = {getCareer}