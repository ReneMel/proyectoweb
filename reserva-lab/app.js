var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
//const flash =  require('connect-flash');
const session = require('express-session');

var indexRouter = require('./routes/index');
var logIn = require('./routes/login');
var adminSeeUser = require('./routes/adminSeeUser');
var usersRouter = require('./routes/users');
var informe = require('./routes/informe');
var signUp = require('./routes/signUp');
var forbidden = require('./routes/forbidden');

// initialization
var app = express();
require('./models/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'NoTime_NoRoom2',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use(flash());
//app.use(session({cookie: { maxAge: 60000 }}));

// app.all('/', (req,res)=>{
//   req.flash('test', 'it worked');
//   res.redirect('/test');
// })

// app.all('/test', function(req, res){
//   res.send(JSON.stringify(req.flash('test')));
// });

app.use('/', indexRouter);
app.use('/login', logIn);
app.use('/signUp', signUp);
app.use('/users', adminSeeUser);
//app.use('/admin/users', adminSeeUser);
//app.use('/users', usersRouter);
app.use('/informe', informe);
app.use('/forbidden', forbidden);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
