(function(){

	'use strict';
	angular.module('MsgApp', [])
	.controller('MsgController', MsgController);

	MsgController.$inject = ['$scope', '$filter'];
	function MsgController($scope, $filter){

		$scope.name = "Vineet";
		$scope.stateOfBeing="hungry";
		$scope.cookieCost= .45;

		$scope.sayMessage = function(){

			var msg = "Vineet like to eat food";
			var output = $filter('uppercase')(msg);
			return output;
		};

		$scope.feedVineet = function(){
			$scope.stateOfBeing = "fed";
		};
	};


})();