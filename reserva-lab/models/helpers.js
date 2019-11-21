const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password)=>{
    const saltRounds = 10;
    const hashPass = await new Promise((resolve,reject)=>{
        bcrypt.hash(password,saltRounds,(err,hash)=>{
            if (err) {
                reject(err);
            }
            else {
                resolve(hash)
            }
        })
    });
    return hashPass;    
}

helpers.matchPassword = async (password, savedPassword)=>{
    const compared = await new Promise((resolve,reject)=>{
        bcrypt.compare(password,savedPassword,(err,isMatch)=>{
            if(err) {
                reject(err)
            }
            else {
                resolve(isMatch);
            }
        });
    });
    return compared;
}

module.exports = {helpers}