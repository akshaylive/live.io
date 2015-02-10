/**
 * Unit tests for live.io
 *
 * Created by Akshaya Shanbhogue on 2/10/2015.
 */
var should = require('chai').should(),
    live = require('../index');

describe('#check if socket routing works', function() {
    it('routes socket requests to socket route', function(){
        var app = new live();
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
            method: 'socket'
        }, {
            setHeader: function(){}
        });
        calledCount.should.equal(4);
    });

});