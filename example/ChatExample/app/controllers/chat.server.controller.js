'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

exports.message = function(req, res){
    // send data
    // TODO filter the message. XSS potential here.
    var toSend = {
        user: req.user.displayName,
        message: req.body.message
    }
    var socketio = req.app.get('socketio');
    socketio.sockets.emit('message', toSend);
    // emit an event for all connected clients
}
