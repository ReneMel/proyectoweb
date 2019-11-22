const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('./connection');
const hp = require('./helpers');

passport.use('local.signup', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req,username,password,done)=>{
    const {
        name,lastname,
        email,type
    } = req.body;

    const fullName = `${name} ${lastname}`;
    const truePass = await hp.helpers.encryptPassword(password);
    const newUser = {
        carnet: username,name: fullName,
        email: email,pass: truePass,
        role: false,state: true,
        type: 'estudiante'
    };
    
    const result = await db.connection.any(`INSERT INTO usuario
    VALUES($1,$2,$3,$4,$5,$6,$7);`, [newUser.carnet,newUser.name,newUser.email,
    newUser.pass,newUser.role,newUser.state,newUser.type])
    .catch(err=>{
        console.log(err);    
    })
    return done(null, newUser);
}));

passport.use('local.signin', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req,user,pass,done)=>{
    await db.connection.any('SELECT * FROM usuario WHERE carnet = $1',[user])
    .then(async data=>{
        if (!data[0]) {
            return done(null,false)
        }
        const user = data[0];
        const flag = await hp.helpers.matchPassword(pass, user.contra);
        delete user.contra;
        if (flag) {
            done(null,user);
        }
        else {
            done(null,false);   
        }
    })   
}));

passport.serializeUser((user,done)=>{
    done(null, user);
})

passport.deserializeUser(async (user,done)=>{
    const getUser = await db.connection.any(`SELECT * FROM usuario
    WHERE carnet = $1;`, [user.carnet]);
    userSession = getUser[0];
    delete userSession.contra;

    done(null,userSession);   
})