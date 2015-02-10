LivE.io
=========

Live.io combines the power of the new Express 4.0, socket.io and passport! Empower your sockets!

## Installation

  npm install live.io --save

## Usage

  replace require('express') with require('live.io')

  Add your socket route using the socket method.
  app.route('/').socket(function(req, res){
    // req.body contains socket data
    // res.emit can emit data to socket.
    // res.json is a helper method to return json data.
  });

## Tests

  grunt test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release