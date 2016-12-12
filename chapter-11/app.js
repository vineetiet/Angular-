/**Digest go over and set up watchers is only triggered
 when the original event from our event queue is 
 angular aware, it knows about the digest cycle and 
 kicks it off as part of as part of process.
but what about code that is not inside our angular
application and affects the value that is inside 
in our angular app, that's why $digest and $apply
come into play  **/

/** Digest cycle does not get triggered automatically 
if the events are unaware of Angular
Solution: 
	1) call $digest after your custom code
	2) Wrap your custom code inside of $apply
	3) Find Angular specific service that handles 
	   the same functionality, e.g: $timeout, it already
	   angular aware.
**/

(function(){

	angular.module('CounterApp', [])
	.controller('CounterController', CounterController);

	CounterController.$inject = ['$scope', '$timeout'];
	function CounterController($scope, $timeout){

		$scope.counter = 0;

		$scope.upCounter = function(){
			$timeout(function(){
				$scope.counter++;
				console.log("Counter incremented");
			}, 2000);
		};

		// $scope.upCounter = function(){
		// 	setTimeout(function(){
		// 		$scope.$apply(function(){ //digest wil be called automatically
		// 			$scope.counter++;
		// 			console.log("Counter incremented");
		// 		});
				
		// 		}, 2000);
			

		/**  this method is not being called inside
		the Angular context so the digest cycle 
		know how to kick off at all. In order to
		kick it off we can do ourself, $scope.$digest()**/
		// $scope.upCounter = function(){
		// 	setTimeout(function(){
		// 		$scope.counter++;
		// 		console.log("Counter incremented");
		// 		$scope.$digest(); 
		/** digest cycle will be 
				click off and watcher for this counter look
				 for the counter variable whether it got changed. **/
			//}, 2000);
			
		//}

	}

})();