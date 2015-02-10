/**
 * Combine Express, Socket and Passport
 *
 * Created by Akshaya Shanbhogue on 2/10/2015.
 */
var http = require('http');
if(http.METHODS) {
    // TODO - check if socket already exists
    http.METHODS.push('socket');
}
else {
    http.METHODS= [
        'get',
        'post',
        'put',
        'head',
        'delete',
        'socket', // ADDED NEW METHOD "socket"
        'options',
        'trace',
        'copy',
        'lock',
        'mkcol',
        'move',
        'purge',
        'propfind',
        'proppatch',
        'unlock',
        'report',
        'mkactivity',
        'checkout',
        'merge',
        'm-search',
        'notify',
        'subscribe',
        'unsubscribe',
        'patch',
        'search',
        'connect'
    ];
}


express = require("express");
socketio = require("socket.io");
passportio = require("passport.socketio");

module.exports = express;
