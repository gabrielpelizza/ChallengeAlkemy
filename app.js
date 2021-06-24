require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

let moviesRouter = require('./routes/movies');
let charactersRouter = require('./routes/characters');
let genresRouter = require('./routes/genres');
let authRouter = require('./routes/auth');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movies', moviesRouter);
app.use('/characters', charactersRouter);
app.use('/genres', genresRouter);
app.use('/auth/',authRouter)

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
