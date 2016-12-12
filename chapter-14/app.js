/**
	Array has a special function called filter
		-create new array where each item satisfies some
		condition of the comparision function passed into the
		filter function.

		- Angular has a special filter called 'filter' 
			- provided a string as 1st argument, it will
			filter array it's applied to, matching all string 
			items against the provided one.
			-ng-repeat="item in collection | filter:searchString"
**/
(function(){

	'use strict';
	var shoppingList = ["Milk","Donuts","Cookies","Peanuts","Pepto"];

	
	angular.module('ShoppingListApp',[])
	.controller('ShoppingListController',ShoppingListController);

	ShoppingListController.$inject = ['$scope'];
	function ShoppingListController($scope){

		$scope.shoppingList = shoppingList;
	}

})();