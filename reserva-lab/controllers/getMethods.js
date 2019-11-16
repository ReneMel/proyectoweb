const db = require('../models/connection');

const getUser = (req,res)=>{
    let user = req.params.user;
    db.connection('SELECT codigo, denominacion FROM proyecto')
    .then((Data)=>{
        console.log(Data);
        
        res.status(200)
        .json({
            status: 'Success'
        });
    })
    .catch(err=>{
        return
    })
}

// function getU(req, res, next){
//     db.connection.any('SELECT codigo, denominacion FROM proyecto').then(function(data){
//         res.status(200)
//         .json({
//             status:'success',
//             data: data,
//             message: 'Retrieved list'
//         });
//     })
//     .catch(err=>{
//         return res.status(404)
//         .json({
//             message: 'Not found'
//         });
//     })
// }

module.exports = {
    getUser
}