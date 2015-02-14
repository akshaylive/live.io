'use strict';

module.exports = function(app) {
	var chat = require('../../app/controllers/chat.server.controller');
	var users = require('../../app/controllers/users.server.controller');

	// do things during connection or disconnection
	// app.route('connect').socket();
	// app.route('disconnect').socket();

	app.route('message').socket(
		users.requiresLogin,
		chat.message
	);
};
