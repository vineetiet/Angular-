/** ng-model : two way binding.
	{{ lastName }} : one way binding 
	goal is reduce the number of watchers 
	{{ ::fullName }} : one time binding 
	 We should use this when we no need watcher 
	 to watch this property everytime. Like the 
	 Full Name which hardly change**/

	 /**
		2-ways binding(ng-mode) means:
			-Listners for change on input automatically
			set up by angular updates prop value on $scope.
			- Direct update to prop value automatically updated in UI
		1-way binding:
			- Direct update to prop value automatically updated in UI.

		1-time binding: 
			- ({{:: prop}}) means: initialized value of prop is automatically updated in UI
			- Watcher for prop is removed, so UI never again gets updated.
	 **/

	 (function(){

	 	'use strict';

	 	angular.module('BindApp', [])
	.controller('BindingController', BindingController);

		BindingController.$inject = ['$scope'];
	 	function BindingController($scope){
	 		$scope.firstName = "Vineet";
	 		//$scope.fullName = ""; // watcher aleardy initilized.. and one time watcher, remove watcher.

	 		//no of watcher in digest cycle.
	 		$scope.showNumberOfWatchers = function(){

	 			console.log("# of watcher:", $scope.$$watchersCount);

	 		};

	 		$scope.setFullName = function(){
	 			$scope.fullName = $scope.firstName + " "+ "Gupta";
	 		};

	 		$scope.logFirstName = function(){
	 			console.log("First name is : ", $scope.firstName);
	 		};

	 		$scope.logFullName = function(){
	 			console.log("Full name is : ", $scope.fullName);
	 		};

	 	}

	 })();