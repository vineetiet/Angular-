
//setup the watcher manually
//watch should never have inside the controller becuase controller has already has a mechanism
// to set up watchers for us
// when ever any changes, digest loop is fired and identfy the changes and then second time
// its fired to make sure everything is fine (over come of the dirty check) (no other property
 // triggered to make the first change.)
 //Digest cycle: running digest loops until all watchers report that nothing has changed.
 //			- Dirty checking (any watcher is no longer is dirty)
 //Several ways to set up watchers: 
 //		- $scope.$watch - don't do this in a controller.
 //		- {{someProp}} - it alone sets up watcher.
 //		- input element - <input ... ng-model="someProp">
 // only applies to things done inside of the Angular context
 // digest cycle should be inside the angular context
(function(){
	'use strict';

	angular.module('CounterApp', [])
	.controller('CounterController', CounterController);

	CounterController.$inject = ['$scope'];

	function CounterController($scope){

		$scope.onceCounter = 0;
		$scope.counter = 0;
		$scope.name ="vineet";

		$scope.showNumberOfWatchers = function(){

			console.log("# of watchers: ",$scope.$$watchersCount);

		};

		$scope.countOnce = function(){

			$scope.onceCounter = 1;
		};

		$scope.upCounter = function(){
			$scope.counter++;

		};

		//instead of giving the real property (onceCounter), will give it a 
		                //function, this function suppose to return the name of the property 
		                // to watch. Which means everytime through the loop the digest cycle
		                //wants to figureout what property is that and execute it so that we can 
		                // catch the digest loop going through all these watchers.
		  $scope.$watch(function(){
		  	console.log("Digest loop fired");
		  }) 
		// $scope.$watch('onceCounter', function(newValue, oldValue){

		// 	console.log("onceCounter old  value: ", oldValue);
		// 	console.log("onceCounter new value: ", newValue); 	

		// });

		// $scope.$watch('counter', function(newValue, oldValue){

		// 	console.log("counter old value: ", oldValue);
		// 	console.log("counter new value: ", newValue); 	

		// });
	}

})();