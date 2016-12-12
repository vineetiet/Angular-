//Custom filter.
/**

To create a custom filter, 
 a) Define filter factory function.
 b) Register filter factory function with module.
 c) To use custom filter in Javascript :
 		- inject filter function registerNameFilter into controller
 d) To use in HTML: no need to inject into controller.
 		- {{expression | regsiteredName}}
 e) Extra arguments can be supplied to the filter function
 		- otherwise, steps are the same for registration & injection
 f) To use in HTML with extra arguments
 		- {{expression | registeredName: arg1: arg2}}
 g) Filters can be chained.
 		-{{expression | filterOne | filterTwo}}

**/

(function(){

	angular.module('MsgApp', [])
	.controller('MsgController', MsgController)
	.filter('loves',LovesFilter)
	.filter('truth', TruthFilter);
	MsgController.$inject = ['$scope', 'lovesFilter']; //filter is going to appended Filter 

	// Since we are using LovesFilter inside the HTML only in the controller method we do not need to inject
	//LovesFilter inside the controller.

	function MsgController($scope, lovesFilter){

		$scope.stateOfBeing = "hungry";
		$scope.sayMessage = function(){

			var msg = "Vineet likes to eat food";
			return msg;
		};

		$scope.sayLovesMessage = function(){

			var msg = "Vineet likes to eat healthy food";
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

	function TruthFilter(){

		return function(input, target, replace){

			input = input || "";  // input exist or not, if it's not there then assign empty string.
			input = input.replace(target, replace);
			return input;
		}
	}

})();