'use strict'
var express = require('express');
let apiRoutes = require("./routes/routes.js")
var sessionController = require('./controllers/sessionController');
var http = require('http');
var socketIO;

var app = express();

var port = process.env.PORT || 443;

var server = http.createServer(app);

var secIO = require('socket.io')(server);

server.listen(port, function() {
	console.log('socket server running on '+port+' port');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "'GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', apiRoutes);

secIO.on('connection', function(socket) {
    socketIO = socket;
    socketIO.on('userLogOut', function(data){
        secIO.emit("logOutUser", data);
    });
    socketIO.on('loginUser', function(data){
        sessionController.addNewUser(data);
        secIO.emit("newUserLogin", sessionController.recoverUsers());
    });
    socketIO.on('StatusUser', function(data){
        secIO.emit("refreshUsers", data);
        sessionController.refreshUserPosition(data);
    });
    socketIO.on('publicChat', function(data) {
        secIO.sockets.emit('publicChatResponses', data);
    });
    socketIO.on('privateChat', function(data) {
        secIO.sockets.emit(data.receiver, data);
    });
    socketIO.on('sendLogOutUser', function(data){
        secIO.emit("logOutUser", data);
        sessionController.removeUser(data);
    });
});

sessionController.expireSessions(secIO);