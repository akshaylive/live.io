'use strict';

angular.module('chat').controller('ChatController', ['$scope', 'Socket',
	function($scope, Socket) {
		$scope.messages = [];
		$scope.connect = function(){
			Socket.on('message', function(message){
				$scope.messages.push(message)
			})
		}

		$scope.message = '';
		$scope.sendMessage = function(){
			// SEND $scope.message to server using socket.io
			Socket.emit('message', {
				message: $scope.message
			});
		}
	}
]);
