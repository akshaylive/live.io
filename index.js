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
        'socket', // ADDED NEW METHOD 'socket'
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


var express = require('express'),
    socketio = require('socket.io'),
    passport = require('passport'),
    passportSocketIo = require('passport.socketio'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');


module.exports = function(options){
    var options = options || {}
        , key = options.name || options.key || 'connect.sid'
        , store = options.store || new session.MemoryStore
        , liveCookieParser = options.cookieParser || cookieParser
        , sessionSecret = options.sessionSecret || '';

    var exp = express();

    // Express MongoDB session storage
    exp.use(session({
        saveUninitialized: true,
        resave: true,
        secret: sessionSecret,
        store: store
    }));

    // use passport session
    exp.use(passport.initialize());
    exp.use(passport.session());

    exp.listen = function(port){
        var server = http.createServer(this);
        var io = socketio.listen(server);

        io.use(passportSocketIo.authorize({
            cookieParser: liveCookieParser,
            key:         key,       // the name of the cookie where express/connect stores its session_id
            secret:      sessionSecret,    // the session_secret to parse the cookie
            store:       store,        // we NEED to use a sessionstore. no memorystore please
            success:     onAuthorizeSuccess,  // *optional* callback on success - read more below
            fail:        onAuthorizeFail     // *optional* callback on fail/error - read more below
        }));

        function onAuthorizeSuccess(data, accept){
            accept(null, true);
        }
        function onAuthorizeFail(data, message, error, accept){
            if(error)
                throw new Error(message);
            accept(null, false);
        }

        function makeRequestResponse(req,res){
            req.method = "socket";
            req.app = exp;
            req.isAuthenticated = function(){
                if(req.user && req.user.logged_in!==false)
                    return true;
                return false;
            }
            res.status = function(stat){
                // NO-OP/PASS-THROUGH
                res.status = stat;
                return res;
            };
            res.send = function(a){
                if(typeof a=="object" && !a.status){
                    a.status = res.status;
                }
                // send data with event "data"
                res.emit('data', a);
                return res;
            }
            res.setHeader = function(key, val){
                // TODO
            }
            res.json = res.send;
        }

        var router = require('socket.io-events')();
        router.on('*', function (sock, args, next) {
            var name = args.shift(), msg = args.shift();
            var req = sock.sock.client.request;

            makeRequestResponse(req,sock.sock);
            req.url = name;
            req.body = msg;

            exp.handle(req, sock.sock);
            next();
        });
        io.use(router);

        io.sockets.on('connection', function (socket) {
            var req = socket.client.request;

            makeRequestResponse(req,req.res | socket);
            req.url = 'connect';
            exp.handle(req, req.res);

            socket.on('disconnect', function(){
                var req = socket.client.request;
                makeRequestResponse(req,req.res | socket);
                req.url = 'disconnect';
                exp.handle(req, req.res);
            });
        });

        this.set('socketio', io);
        server.listen(port);
    };
    exp.set('server', exp);
    return exp;
};
