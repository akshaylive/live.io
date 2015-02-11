/**
 * Unit tests for live.io
 *
 * Created by Akshaya Shanbhogue on 2/10/2015.
 */
var should = require('chai').should(),
    live = require('../index'),
    http = require('http');

describe('#check if socket routing works', function() {
    var session = require('express-session');
    var store = new session.MemoryStore();
    var app = new live({
        store: store,
        sessionSecret: 'emosewAsI',
        key: 'yahskA'
    });
    app.listen(3000);

    it('routes socket requests to socket route', function(){
        var calledCount = 0;

        app.route('/').socket(function(req, res, next){
            calledCount++;
            next();
        }, function(req, res, next){
            calledCount++;
            next();
        });
        app.route('/').all(function(req, res, next){
            calledCount++;
            next();
        }, function(req, res, next){
            calledCount++;
        });

        app.handle({
            url: '/',
            method: 'socket',
            headers: {
                cookies: ""
            }
        }, {
            setHeader: function(header){} // Dummy set header method
        });
        calledCount.should.equal(4);
    });
    var data = {data:"testDataLoremIpsumStuff"};
    it('should connect to passport-socketio seamlessly', function(done){
        var socket = require('socket.io-client')('http://localhost:3000/');
        app.route('customMessage').socket(function(req, res){
            req.body.should.eql(data);
            done();
        });
        socket.on('connect', function(){
            socket.emit('customMessage', data);
        });
        this.timeout(1000);
    });
    // TODO when route starts with / it causes header problem.
    // TODO authentication checks
});