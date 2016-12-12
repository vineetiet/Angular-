(function(){

	angular.module('MsgApp', [])
	.controller('MsgController', MsgController)
	.filter('loves',LovesFilter);
	MsgController.$inject = ['$scope', 'lovesFilter']; //filter is going to appended Filter 

	function MsgController($scope, lovesFilter){

		$scope.stateOfBeing = "hungry";
		$scope.sayMessage = function(){

			var msg = "Vineet likes to eat food";
			return msg;
		};

		$scope.sayLovesMessage = function(){

			var msg = "Vineet likes to eat food";
			msg = lovesFilter(msg);
			return msg;
		};

		$scope.feedVineet = function(){

			$scope.stateOfBeing = "fed";
		};
	}

	function LovesFilter(){

		return function(input){

			input = input || "";  // input exist or not, if it's not there then assign empty string.
			input = input.replace("likes", "loves");
			return input;
		}
	}

})();