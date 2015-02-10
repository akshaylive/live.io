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
passportSocketIo = require("passport.socketio");

module.exports = function(){
    var exp = express();

    exp.listen = function(port){
        var server = http.createServer(this);
        var io = socketio.listen(server);

        /*
        io.use(passportSocketIo.authorize({
            cookieParser: cookieParser,
            key:         'connect.sid',       // the name of the cookie where express/connect stores its session_id
            secret:      config.sessionSecret,    // the session_secret to parse the cookie
            store:       sessionStore,        // we NEED to use a sessionstore. no memorystore please
            success:     onAuthorizeSuccess,  // *optional* callback on success - read more below
            fail:        onAuthorizeFail     // *optional* callback on fail/error - read more below
        }));
        */
        function onAuthorizeSuccess(data, accept){
            console.log('successful connection to socket.io'+data);
            accept(null, true);
        }
        function onAuthorizeFail(data, message, error, accept){
            if(error)
                throw new Error(message);
            console.log('failed connection to socket.io:', message);
            accept(null, false);
        }
        io.on('connection', function(socket){
            console.log('CONNECTED');
            console.log(socket.handshake);
            // on message, need to call app.handle ; req.url and req. method needs to be set.
            socket.on('request', function(data){
                console.log(data);
            });
        });

        this.set('socketio', io);
        server.listen(port);

        console.log("listening");
    };
    exp.server = exp;
    return exp;
};