LivE.io
=========

Live.io combines the power of the new Express 4.0, socket.io and passport! Empower your sockets!

## Installation

    npm install live.io --save

## Usage

  replace require('express') with require('live.io')
  Initialization params -
  1. sessionSecret - your express-session secret. Required field.
  2. store - session store. Defaults to MemoryStore of express-session package.
  3. cookieParser - your custom cookie-parser. Defaults to cookie-parser package.
  4. Secure - If you use https, wss combo, you can pass your https options. If you use secure, socket-io will be secure-only.

    var app = live({
      sessionSecret: sessionSecret,
      store: sessionStore,
      cookieParser: cookieParser,
        secure: {
          key: privateKey,
          cert: certificate
        }
    });

  Add your socket route using the socket method.

    app.route('/').socket(function(req, res){
      // req.body contains socket data
      // res.emit can emit data to socket.
      // res.json is a helper method to return json data. This will be implemented in the next release.
    });

## Events
  Special events include 'connect' and 'disconnect' while routing.
  
    app.route('connect').socket(function(req, res){
        // do stuff on connection.
    });

    app.route('disconnect').socket(function(req, res){
       // do stuff on connection.
    });
## Tests

    grunt test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release
