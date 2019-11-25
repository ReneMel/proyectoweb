const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('./connection');
const hp = require('./helpers');

passport.use('local.signup', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req,username,password,done)=>{
    console.log(req.body);
    
    const {
        name,lastname,
        email,career
    } = req.body;
    
    const fullName = `${name} ${lastname}`;
    const truePass = await hp.helpers.encryptPassword(password);
    const newUser = {
        carnet: username,name: fullName,
        email: email,pass: truePass,
        role: false,state: true,
        type: 'estudiante'
    };
    
    await db.connection.any(`SELECT to_json(codigo) codigo
    FROM carrera WHERE nombre =  $1`, [career])
    .then(async data=>{
        const code = data[0].codigo;
        db.connection.tx(task=>{
            return task.batch([
                task.none(`SET CONSTRAINTS fk_estudiante_usuario DEFERRED;`),
                task.none(`SET CONSTRAINTS fk_estudiante_carrera DEFERRED;`),
                
                task.none(`INSERT INTO estudiante 
                VALUES($1,$2)`, [newUser.carnet,code]),

                task.none(`INSERT INTO usuario
                VALUES($1,$2,$3,$4,$5,$6,$7);`, [newUser.carnet,newUser.name,newUser.email,
                newUser.pass,newUser.role,newUser.state,newUser.type])
                
            ]);
        })
        .then(data=>{
            console.log('Exito');
            return done(null, newUser);
            
        })
        .catch(err=>{
            console.log('ERROR: ' + err);
            
        })
    })
    .catch(err=>{
        console.log(err);
    })
    
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
    WHERE carnet = $1;`, [user.carnet])
    .catch(err=>{
        console.log(err);
        
    });
    userSession = getUser[0];
    delete userSession.contra;

    done(null,userSession);   
})