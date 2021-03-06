﻿
/**
 * Module dependencies.
 */

var express = require('express');
var request = require('request');
var routes = require('./routes');
var data = require('./routes/data');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(logErrors);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/contact', routes.index);
app.get('/district', data.district);
app.get('/boundary', data.districts);
app.get('/search', routes.search);
app.post('/search', routes.searchpost);
app.get('/search/:zip', data.zipcode);
app.get('/reps/:state/:district', data.legislators);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
