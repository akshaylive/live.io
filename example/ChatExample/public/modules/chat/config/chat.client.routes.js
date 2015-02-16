'use strict';

//Setting up route
angular.module('chat').config(['$stateProvider',
	function($stateProvider) {
		// Chat state routing
		$stateProvider.
		state('chat', {
			url: '/chat',
			templateUrl: 'modules/chat/views/chat.client.view.html'
		});
	}
]);