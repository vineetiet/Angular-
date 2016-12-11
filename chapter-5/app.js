
//Expression in Angular
(function(){
	'use strict';
	angular.module('MsgApp', [])
	.controller('MsgController', MsgController);

	MsgController.$inject = ['$scope'];
	function MsgController($scope){
		$scope.name = "vineet";
		$scope.stateOfBeing = "hungry";

		$scope.sayMessage = function(){
			return "Vineet likes to eat snacks";
		};

		$scope.feedVineet = function(){
			$scope.stateOfBeing = "fed";
		};
	}
})();